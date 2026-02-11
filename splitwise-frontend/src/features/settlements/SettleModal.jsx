import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettleModal({ open, onClose, data, onConfirm }) {
  const [amount, setAmount] = useState(data?.amount || 0);
  const [method, setMethod] = useState("cash");
  const [upiOpened, setUpiOpened] = useState(false);

  // 🔥 Reset modal state when opened
  useEffect(() => {
    if (open) {
      setAmount(data?.amount || 0);
      setMethod("cash");
      setUpiOpened(false);
    }
  }, [open, data]);

  // ✅ UPI Intent
  const openUpiIntent = ({ name, amount }) => {
    const upiUrl = `upi://pay?pa=demo@upi&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=INR`;

    window.location.href = upiUrl;
    setUpiOpened(true);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            Settle with{" "}
            <span className="text-cyan-400">{data.to}</span>
          </DialogTitle>
        </DialogHeader>

        <Input
          type="number"
          max={data.amount}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white"
        />

        <Select
          value={method}
          onValueChange={(val) => {
            setMethod(val);
            setUpiOpened(false);
          }}
        >
          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>

          <SelectContent className="bg-slate-900 border-slate-800 text-white">
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="UPI">UPI / Online</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex justify-end gap-3 mt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          {method === "cash" && (
            <Button
              onClick={() =>
                onConfirm({
                  amount: Number(amount),
                  method: "cash",
                })
              }
            >
              Pay ₹{amount}
            </Button>
          )}

          {method === "UPI" && !upiOpened && (
            <Button
              onClick={() =>
                openUpiIntent({
                  name: data.to,
                  amount,
                })
              }
            >
              Pay via UPI
            </Button>
          )}
        </div>

        {method === "UPI" && upiOpened && (
          <Button
            className="w-full mt-4"
            onClick={() =>
              onConfirm({
                amount: Number(amount),
                method: "UPI",
              })
            }
          >
            Mark as Paid
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
