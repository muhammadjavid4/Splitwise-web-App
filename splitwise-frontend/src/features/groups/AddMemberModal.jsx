import { useState } from "react";
import { addMemberApi } from "./group.api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddMemberModal({ groupId, onClose }) {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => addMemberApi(groupId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.groupMembers(groupId),
      });

      onClose();
    },

    onError: (err) => {
      setError(err.response?.data?.message || "Failed to add member");
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setError("");

    mutate({ email });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <form onSubmit={handleAdd}>
          <Input
            type="email"
            placeholder="User email"
            required
            className="mb-4 bg-slate-800 border-slate-700 text-white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button disabled={isPending}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
