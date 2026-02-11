import { Button } from "@/components/ui/button";

export default function DetailedBalance({
  youOwe = [],
  youGet = [],
  onSettle,
}) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">

      {/* 🔴 YOU OWE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-3 text-red-400">
          You Owe
        </h3>

        {youOwe.length === 0 ? (
          <p className="text-slate-400 text-sm">
            You owe nothing 🎉
          </p>
        ) : (
          <ul className="space-y-3">
            {youOwe.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-slate-800/60 rounded-lg px-4 py-2"
              >
                <span className="text-slate-200">
                  To <span className="font-medium">{item.to}</span>
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-red-400">
                    ₹{item.amount}
                  </span>

                  {/* ✅ SHADCN BUTTON (SAFE) */}
                  {onSettle && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onSettle(item)}
                    >
                      Settle
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🟢 YOU GET */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-3 text-green-400">
          You Get
        </h3>

        {youGet.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No one owes you 😌
          </p>
        ) : (
          <ul className="space-y-3">
            {youGet.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-slate-800/60 rounded-lg px-4 py-2"
              >
                <span className="text-slate-200">
                  From <span className="font-medium">{item.from}</span>
                </span>

                <span className="font-semibold text-green-400">
                  ₹{item.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
