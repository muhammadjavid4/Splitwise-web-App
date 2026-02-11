import { useQuery } from "@tanstack/react-query";
import { getMyGroupsApi, getGroupMembersApi } from "./group.api";
import { queryKeys } from "@/lib/queryKeys";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function GroupList({
  onSelect,
  selectedGroupId,
}) {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.groups,
    queryFn: async () => {
      const res = await getMyGroupsApi();
      const groupsData = res.data.groups || [];

      const enriched = await Promise.all(
        groupsData.map(async (g) => {
          try {
            const m = await getGroupMembersApi(g.id);
            return { ...g, members_count: m.data.members.length };
          } catch {
            return { ...g, members_count: 0 };
          }
        })
      );

      return enriched;
    },
  });

  const groups = data || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-slate-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!groups.length) {
    return (
      <div className="text-center text-slate-500 py-12">
        No groups yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((g) => {
        const isActive = selectedGroupId === g.id;

        return (
          <motion.div
            key={g.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
          >
            <Card
              onClick={() => onSelect?.(g)}
              className={`
                cursor-pointer transition-all
                bg-slate-950 border
                ${
                  isActive
                    ? "border-cyan-500 bg-cyan-500/5 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    : "border-slate-800 hover:border-cyan-500"
                }
              `}
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {g.name}
                  </h3>

                  {g.role === "admin" && (
                    <span className="text-xs px-2 py-1 bg-cyan-500 text-black rounded-full">
                      Admin
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-sm text-slate-400">
                  <span>Members</span>

                  <span className="font-medium text-white">
                    {g.members_count}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
