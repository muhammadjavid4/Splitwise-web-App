import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroupApi } from "./group.api";
import { queryKeys } from "@/lib/queryKeys";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateGroup({ onClose }) {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createGroupApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups });
      onClose();
    },
  });

  const handleCreate = () => {
    if (!name.trim()) return;
    mutate({ name });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>

          <Button onClick={handleCreate} disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
