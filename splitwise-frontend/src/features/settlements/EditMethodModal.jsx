import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

export default function EditMethodModal({
  open,
  onClose,
  settlement,
  onSave,
}) {
  const [method, setMethod] = useState(settlement?.method || "cash");

  useEffect(() => {
    setMethod(settlement?.method || "cash");
  }, [settlement]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Edit Payment Method</DialogTitle>
        </DialogHeader>

        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>

          <SelectContent className="bg-slate-900 border-slate-800 text-white">
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="UPI">UPI / Online</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={() => onSave(method)}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
