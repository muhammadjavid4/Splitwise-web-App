import { useState } from "react";
import { updateExpenseApi } from "./expense.api";

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

export default function EditExpenseModal({ expense, onClose }) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    description: expense.description,
    amount: expense.amount,
  });

  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateExpenseApi(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses(expense.group_id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.balance(expense.group_id),
      });

      onClose();
    },

    onError: () => {
      setError("Failed to update expense");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      id: expense.id,
      data: {
        description: form.description,
        amount: Number(form.amount),
      },
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            className="mb-3 bg-slate-800 border-slate-700 text-white"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <Input
            type="number"
            className="mb-4 bg-slate-800 border-slate-700 text-white"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            required
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="javid"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
            <Button variant="javid">
              Test Button
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
