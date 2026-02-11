import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import GroupList from "@/features/groups/GroupList";
import CreateGroup from "@/features/groups/CreateGroup";
import GroupMembers from "@/features/groups/GroupMembers";
import useUserStore from "@/store/user.store";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const user = useUserStore((s) => s.user);

  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const resetDashboard = () => {
    setSelectedGroup(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar onDashboardClick={resetDashboard} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10 space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Hello, {user?.name || "User"} 👋
          </h1>

          <p className="text-slate-400">
            Welcome back! Manage your groups and expenses here.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Your Groups
          </h2>

          <Button
            onClick={() => setShowModal(true)}
            className="rounded-xl"
          >
            + New Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GroupList
            selectedGroupId={selectedGroup?.id}
            onSelect={(group) => setSelectedGroup(group)}
          />

          <div className="md:col-span-2">
            <motion.div
              key={selectedGroup?.id || "empty"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {selectedGroup ? (
                <GroupMembers
                  group={selectedGroup}
                  onUpdated={() => {
                    setSelectedGroup(null);
                  }}
                />
              ) : (
                <Card className="h-full border-slate-800 bg-slate-900">
                  <CardContent className="flex flex-col items-center justify-center h-[320px] text-center space-y-3">
                    <div className="text-5xl">👥</div>

                    <p className="text-lg font-semibold text-white">
                      No group selected
                    </p>

                    <p className="text-sm text-slate-400">
                      Choose a group from the left panel to view
                      members, expenses and balance.
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
        {showModal && (
          <CreateGroup onClose={() => setShowModal(false)} />
        )}
      </div>
    </>
  );
}
