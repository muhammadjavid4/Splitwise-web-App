import { useState } from "react";
import {
  getGroupExpensesApi,
  deleteExpenseApi,
  updateExpenseApi,
} from "./expense.api";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

import useUserStore from "@/store/user.store";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function ExpenseList({ groupId }) {
  const user = useUserStore((s) => s.user);
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
  });

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: queryKeys.expenses(groupId),
    queryFn: async () => {
      const res = await getGroupExpensesApi(groupId);
      return res.data.expenses || [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateExpenseApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses(groupId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.balance(groupId),
      });
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses(groupId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.balance(groupId),
      });
    },
  });

  if (!user) return null;

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setEditForm({
      description: exp.description,
      amount: exp.amount,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ description: "", amount: "" });
  };

  const saveEdit = (expenseId) => {
    if (!editForm.description || !editForm.amount) {
      alert("Fill description and amount!");
      return;
    }

    updateMutation.mutate({
      id: expenseId,
      data: editForm,
    });
  };

  const deleteExpense = (expenseId) => {
    if (!confirm("Delete this expense?")) return;
    deleteMutation.mutate(expenseId);
  };

  if (isLoading) {
    return <p className="text-slate-400 mt-4">Loading expenses...</p>;
  }

  return (
    <div className="space-y-3">
      {expenses.map((exp) => {
        const isOwner = Number(exp.paid_by_id) === Number(user.id);
        const isEditing = editingId === exp.id;

        return (
          <div
            key={exp.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
          >
            {isEditing ? (
              <div className="space-y-3">
                <input
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />

                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, amount: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => saveEdit(exp.id)}
                  >
                    Save
                  </Button>

                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-slate-700 text-white"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                {/* LEFT */}
                <div>
                  <h3 className="font-semibold text-white">
                    {exp.description}
                  </h3>

                  <p className="text-sm text-slate-400">
                    Amount: ₹{exp.amount}
                  </p>

                  <p className="text-xs text-slate-400">
                    Paid by{" "}
                    <span className="text-cyan-400 font-medium">
                      {exp.paid_by_name ||
                        exp.paid_by?.name ||
                        `User #${exp.paid_by_id}`}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {isOwner && (
                    <>
                      <button
                        onClick={() => startEdit(exp)}
                        className="text-slate-400 hover:text-cyan-400"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <FiTrash2 />
                      </button>
                    </>
                  )}

                  <span className="text-cyan-400 font-bold">
                    ₹{exp.amount}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
