import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ExpenseList from "../expenses/ExpenseList";
import AddExpense from "../expenses/AddExpense";
import GroupBalance from "../balance/GroupBalance";
import GroupList from "../groups/GroupList";
import toast from "react-hot-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GroupDetails() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [showAdd, setShowAdd] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 hover:text-cyan-400 mb-4 transition"
        >
          ← Back
        </button>

        <Card className="mb-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
          <CardContent className="p-6">
            <h2 className="text-sm uppercase text-cyan-400 mb-3">
              Group Balance
            </h2>

            <GroupBalance key={refresh} groupId={groupId} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <Card className="bg-slate-900 border-slate-800 h-full">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Your Groups
                </h3>

                <GroupList
                  key={refresh}
                  onSelect={() => {}}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card className="bg-slate-900 border-slate-800 h-full">
              <CardContent className="p-5">

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Expenses
                    </h3>
                    <p className="text-xs text-slate-400">
                      Each expense shows who paid
                    </p>
                  </div>

                  <Button onClick={() => setShowAdd(true)}>
                    + Add Expense
                  </Button>
                </div>

                {/* LIST */}
                <div className="max-h-[65vh] overflow-y-auto pr-2 custom-scroll">
                  <ExpenseList key={refresh} groupId={groupId} />
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showAdd && (
        <AddExpense
          groupId={groupId}
          onClose={() => setShowAdd(false)}
          onAdded={() => {
            setRefresh(!refresh);
            setShowAdd(false);
            toast.success("Expense added successfully");
          }}
        />
      )}

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.4);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
