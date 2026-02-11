import { useState } from "react";
import {
  getGroupMembersApi,
  removeMemberApi,
  deleteGroupApi,
  transferAdminApi,
  leaveGroupApi,
} from "./group.api";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

import AddMemberModal from "./AddMemberModal";
import ExpenseList from "../expenses/ExpenseList";
import AddExpense from "../expenses/AddExpense";
import GroupBalance from "../balance/GroupBalance";
import useUserStore from "../../store/user.store";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GroupMembers({ group, onUpdated }) {
  const user = useUserStore((s) => s.user);
  const isAdmin = group.role === "admin";
  const queryClient = useQueryClient();

  const [showAdd, setShowAdd] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [newAdminId, setNewAdminId] = useState("");

  const { data: members = [], isLoading } = useQuery({
    queryKey: queryKeys.groupMembers(group.id),
    queryFn: async () => {
      const res = await getGroupMembersApi(group.id);
      return (res.data.members || []).map((m) => ({
        ...m,
        uid: Number(m.user_id),
      }));
    },
    enabled: !!group.id,
  });

  const removeMember = useMutation({
    mutationFn: async (uid) => {
      if (!uid) {
        throw new Error("User ID is required");
      }
      return await removeMemberApi(group.id, uid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.groupMembers(group.id),
      });
      toast.success("Member removed successfully");
      onUpdated?.();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove member");
    },
  });

  const deleteGroup = useMutation({
    mutationFn: () => deleteGroupApi(group.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups });
      toast.success("Group deleted successfully");
      onUpdated?.();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete group");
    },
  });

  const leaveGroup = useMutation({
    mutationFn: () => leaveGroupApi(group.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups });
      toast.success("Left group successfully");
      onUpdated?.();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to leave group");
    },
  });

  const transferAdmin = useMutation({
    mutationFn: async () => {
      if (!newAdminId) {
        throw new Error("Please select a member first");
      }
      return await transferAdminApi(group.id, {
        newAdminId: Number(newAdminId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups });
      queryClient.invalidateQueries({
        queryKey: queryKeys.groupMembers(group.id),
      });
      setShowTransfer(false);
      setNewAdminId("");
      toast.success("Admin transferred successfully");
      onUpdated?.();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to transfer admin");
    },
  });

  const handleRemoveMember = (uid) => {
    if (window.confirm("Remove this member from group?")) {
      removeMember.mutate(uid);
    }
  };

  const handleDeleteGroup = () => {
    if (window.confirm("Delete this group permanently? This cannot be undone!")) {
      deleteGroup.mutate();
    }
  };

  const handleLeaveGroup = () => {
    if (window.confirm("Leave this group?")) {
      leaveGroup.mutate();
    }
  };

  const handleTransferAdmin = () => {
    if (!newAdminId) {
      toast.error("Please select a member first");
      return;
    }
    if (window.confirm("Transfer admin role to this member?")) {
      transferAdmin.mutate();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-cyan-400">{group.name}</h2>

        <div className="flex gap-3">
          {isAdmin ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTransfer(true)}
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
              >
                Transfer Admin
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={handleDeleteGroup}
                disabled={deleteGroup.isPending}
              >
                {deleteGroup.isPending ? "Deleting..." : "Delete Group"}
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="destructive"
              onClick={handleLeaveGroup}
              disabled={leaveGroup.isPending}
            >
              {leaveGroup.isPending ? "Leaving..." : "Leave Group"}
            </Button>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg text-white">Members</h3>

          {isAdmin && (
            <Button size="sm" onClick={() => setShowAdd(true)}>
              + Add Member
            </Button>
          )}
        </div>

        {isLoading ? (
          <p className="text-slate-400">Loading members...</p>
        ) : members.length === 0 ? (
          <p className="text-slate-400">No members found</p>
        ) : (
          <div className="space-y-2">
            {members.map((m) => (
              <div
                key={m.uid}
                className="flex justify-between items-center bg-slate-800 px-4 py-3 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    {m.name || m.email}
                  </span>
                  {m.uid === user.id && (
                    <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                      You
                    </span>
                  )}
                  {m.role === "admin" && (
                    <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </div>

                {isAdmin && m.uid !== user.id && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => handleRemoveMember(m.uid)}
                    disabled={removeMember.isPending}
                  >
                    {removeMember.isPending ? "Removing..." : "Remove"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg text-white">Expenses</h3>

          <Button size="sm" onClick={() => setShowExpense(true)}>
            + Add Expense
          </Button>
        </div>

        <ExpenseList groupId={group.id} />
      </div>

      <GroupBalance groupId={group.id} />

      {showAdd && (
        <AddMemberModal
          groupId={group.id}
          onClose={() => setShowAdd(false)}
          onAdded={() => {
            queryClient.invalidateQueries({
              queryKey: queryKeys.groupMembers(group.id),
            });
            setShowAdd(false);
            toast.success("Member added successfully");
          }}
        />
      )}

      {showExpense && (
        <AddExpense
          groupId={group.id}
          onClose={() => setShowExpense(false)}
          onAdded={() => {
            setShowExpense(false);
            toast.success("Expense added successfully");
          }}
        />
      )}

      <Dialog open={showTransfer} onOpenChange={setShowTransfer}>
        <DialogContent className="sm:max-w-sm bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>Transfer Admin Role</DialogTitle>
            <DialogDescription className="text-slate-400">
              Select a member to transfer admin rights. You will become a regular member.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Select value={newAdminId} onValueChange={setNewAdminId}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue placeholder="Select member" />
              </SelectTrigger>

              <SelectContent className="bg-slate-800 border-slate-700">
                {members
                  .filter((m) => m.uid !== user.id)
                  .map((m) => (
                    <SelectItem
                      key={m.uid}
                      value={String(m.uid)}
                      className="text-white hover:bg-slate-700"
                    >
                      {m.name || m.email}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowTransfer(false);
                  setNewAdminId("");
                }}
                disabled={transferAdmin.isPending}
              >
                Cancel
              </Button>

              <Button
                onClick={handleTransferAdmin}
                disabled={transferAdmin.isPending || !newAdminId}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                {transferAdmin.isPending ? "Transferring..." : "Transfer Admin"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
