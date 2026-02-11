import { useState } from "react";
import {
  getGroupSettlementHistoryApi,
  undoSettlementApi,
  updateSettlementMethodApi,
} from "./settlement.api";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

import EditMethodModal from "./EditMethodModal";
import toast from "react-hot-toast";
import useUserStore from "../../store/user.store";

export default function SettlementHistory({
  groupId,
  isAdmin = false,
}) {
  const user = useUserStore((s) => s.user);
  const queryClient = useQueryClient();

  const [editOpen, setEditOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  const { data: settlements = [], isLoading } = useQuery({
    queryKey: queryKeys.settlements(groupId),
    queryFn: async () => {
      const res = await getGroupSettlementHistoryApi(groupId);
      return res.data.settlements || [];
    },
  });

  const undoSettlement = useMutation({
    mutationFn: undoSettlementApi,
    onSuccess: () => {
      toast.success("Settlement undone");

      queryClient.invalidateQueries({
        queryKey: queryKeys.settlements(groupId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.balance(groupId),
      });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Undo failed");
    },
  });

  const updateMethod = useMutation({
    mutationFn: ({ id, method }) =>
      updateSettlementMethodApi(id, method),

    onSuccess: () => {
      toast.success("Payment method updated");
      setEditOpen(false);
      setSelectedSettlement(null);

      queryClient.invalidateQueries({
        queryKey: queryKeys.settlements(groupId),
      });
    },
  });

  if (isLoading) {
    return (
      <p className="text-slate-400">
        Loading settlement history...
      </p>
    );
  }

  const visibleSettlements = settlements.filter(
    (s) => s.status === "completed"
  );

  if (visibleSettlements.length === 0) {
    return (
      <p className="text-slate-500 text-sm">
        No settlements yet 💸
      </p>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {visibleSettlements.map((s) => {
          const canEdit =
            isAdmin || s.created_by === user.id;

          return (
            <div
              key={s.id}
              className="bg-slate-800/60 border border-slate-700 rounded-xl p-4"
            >
              <p className="text-sm text-slate-200">
                <span className="font-medium">
                  {s.paid_by_name}
                </span>{" "}
                paid{" "}
                <span className="font-medium">
                  {s.paid_to_name}
                </span>
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {s.method || "cash"} •{" "}
                {new Date(s.created_at).toLocaleString()}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="font-semibold text-green-400">
                  ₹{s.amount}
                </p>

                <div className="flex gap-3">
                  {canEdit && (
                    <button
                      onClick={() => {
                        setSelectedSettlement(s);
                        setEditOpen(true);
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300"
                    >
                      Edit Method
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => undoSettlement.mutate(s.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Undo
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {editOpen && selectedSettlement && (
        <EditMethodModal
          open={editOpen}
          settlement={selectedSettlement}
          onClose={() => setEditOpen(false)}
          onSave={(method) =>
            updateMethod.mutate({
              id: selectedSettlement.id,
              method,
            })
          }
        />
      )}
    </>
  );
}
