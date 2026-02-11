import { useState } from "react";
import { getGroupBalanceApi } from "./balance.api";
import { getGroupMembersApi } from "../groups/group.api";
import { settleUpApi } from "../settlements/settlement.api";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

import DetailedBalance from "./DetailedBalance";
import SettleModal from "../settlements/SettleModal";
import SettlementHistory from "../settlements/SettlementHistory";
import ActivityLog from "../activity/ActivityLog";

import toast from "react-hot-toast";
import useUserStore from "@/store/user.store";

export default function GroupBalance({ groupId }) {
  const user = useUserStore((s) => s.user);
  const queryClient = useQueryClient();

  const [settleOpen, setSettleOpen] = useState(false);
  const [selectedSettle, setSelectedSettle] = useState(null);

  const { data: membersData } = useQuery({
    queryKey: queryKeys.groupMembers(groupId),
    queryFn: async () => {
      const res = await getGroupMembersApi(Number(groupId));
      return res.data.members || [];
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.balance(groupId),
    queryFn: async () => {
      const res = await getGroupBalanceApi(Number(groupId));
      return res.data;
    },
  });

  const memberMap = {};
  let isAdmin = false;

  membersData?.forEach((m) => {
    memberMap[m.user_id] = m.name;

    if (m.user_id === user.id && m.role === "admin") {
      isAdmin = true;
    }
  });

  // 🔥 SETTLE MUTATION (TanStack)
  // const settleMutation = useMutation({
  //   mutationFn: settleUpApi,
  //   onSuccess: () => {
  //     toast.success("Settlement successful");

  //     queryClient.invalidateQueries({
  //       queryKey: queryKeys.balance(groupId),
  //     });

  //     queryClient.invalidateQueries({
  //       queryKey: queryKeys.expenses(groupId),
  //     });

  //     setSettleOpen(false);
  //     setSelectedSettle(null);
  //   },
  //   onError: (err) => {
  //     alert(err.response?.data?.message || "Settlement failed");
  //   },
  // });

const settleMutation = useMutation({
  mutationFn: settleUpApi,
  onSuccess: () => {
    toast.success("Settlement successful");

    queryClient.invalidateQueries({
      queryKey: queryKeys.balance(groupId),
    });

    queryClient.invalidateQueries({
      queryKey: queryKeys.expenses(groupId),
    });

    queryClient.invalidateQueries({
      queryKey: queryKeys.settlements(groupId),
    });

    queryClient.invalidateQueries({
      queryKey: ["activity-log", groupId],
    });

    setSettleOpen(false);
    setSelectedSettle(null);
  },
  onError: (err) => {
    alert(err.response?.data?.message || "Settlement failed");
  },
});


  if (isLoading) {
    return <p className="text-slate-400">Calculating balance...</p>;
  }

  if (!data) return null;

  const totalYouOwe = data.you_owe.reduce(
    (s, i) => s + Number(i.amount),
    0
  );

  const totalYouGet = data.you_get.reduce(
    (s, i) => s + Number(i.amount),
    0
  );

  const net = totalYouGet - totalYouOwe;

  const formattedYouOwe = data.you_owe.map((i) => ({
    to: memberMap[i.user_id],
    user_id: i.user_id,
    amount: Number(i.amount),
  }));

  const formattedYouGet = data.you_get.map((i) => ({
    from: memberMap[i.user_id],
    amount: Number(i.amount),
  }));


  const handleSettle = ({ amount, method }) => {
    if (!selectedSettle) return;

    settleMutation.mutate({
      groupId: Number(groupId),
      paidTo: selectedSettle.user_id,
      amount: Number(amount),
      method,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div>
          <p className="text-slate-400 text-sm">You Owe</p>
          <p className="text-lg font-bold text-red-400">
            ₹{totalYouOwe}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">You Get</p>
          <p className="text-lg font-bold text-green-400">
            ₹{totalYouGet}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Net</p>
          <p
            className={`text-lg font-bold ${
              net >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {net > 0 && "+"}₹{net}
          </p>
        </div>
      </div>

      <DetailedBalance
        youOwe={formattedYouOwe}
        youGet={formattedYouGet}
        onSettle={(item) => {
          setSelectedSettle(item);
          setSettleOpen(true);
        }}
      />

      {settleOpen && selectedSettle && (
        <SettleModal
          open={settleOpen}
          data={selectedSettle}
          onClose={() => setSettleOpen(false)}
          onConfirm={handleSettle}
        />
      )}

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3 text-cyan-400">
          Settlement History
        </h3>

        <SettlementHistory
          groupId={Number(groupId)}
          isAdmin={isAdmin}
        />
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3 text-purple-400">
          Activity
        </h3>

        <ActivityLog groupId={Number(groupId)} />
      </div>
    </div>
  );
}
