import { useState } from "react";
import { createExpenseApi } from "./expense.api";
import useUserStore from "@/store/user.store";

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

export default function AddExpense({ groupId, onClose }) {
  const user = useUserStore((s) => s.user);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    description: "",
    amount: "",
  });

  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: createExpenseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses(groupId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.balance(groupId),
      });

      onClose();
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Failed to add expense");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    mutate({
      groupId,
      description: form.description,
      amount: Number(form.amount),
      paidBy: user.id,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Description (e.g. Dinner)"
            className="mb-4 bg-slate-800 border-slate-700 text-white"
            required
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Amount"
            className="mb-6 bg-slate-800 border-slate-700 text-white"
            required
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
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
