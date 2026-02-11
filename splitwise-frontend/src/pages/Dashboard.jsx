// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // 🔥 MISSING IMPORT
// import Navbar from "../components/layout/Navbar";
// import GroupList from "../features/groups/GroupList";
// import CreateGroup from "../features/groups/CreateGroup";

// export default function Dashboard() {
//   const navigate = useNavigate(); // 🔥 MISSING HOOK
//   const [showModal, setShowModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Your Groups</h1>
//           <button
//             onClick={() => setShowModal(true)}
//             className="px-5 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
//           >
//             + New Group
//           </button>
//         </div>

//         <GroupList
//           key={refresh}
//           onSelect={(group) => navigate(`/groups/${group.id}`)}
//         />

//         {showModal && (
//           <CreateGroup
//             onClose={() => setShowModal(false)}
//             onCreated={() => setRefresh(!refresh)}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// import { useState } from "react";
// import Navbar from "../components/layout/Navbar";
// import GroupList from "../features/groups/GroupList";
// import CreateGroup from "../features/groups/CreateGroup";
// import GroupMembers from "../features/groups/GroupMembers";

// export default function Dashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   return (
//     <>
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Your Groups</h1>

//           <button
//             onClick={() => setShowModal(true)}
//             className="px-5 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
//           >
//             + New Group
//           </button>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT: GROUP LIST */}
//           <GroupList
//             key={refresh}
//             onSelect={(group) => setSelectedGroup(group)}
//           />

//           {/* RIGHT: GROUP DETAILS */}
//           <div className="lg:col-span-2">
//             {selectedGroup ? (
//               <GroupMembers
//                 group={selectedGroup}
//                 onUpdated={() => {
//                   setRefresh(!refresh);
//                   setSelectedGroup(null);
//                 }}
//               />
//             ) : (
//               <div className="h-full flex items-center justify-center
//                               border border-dashed border-slate-700
//                               rounded-2xl text-slate-500">
//                 Select a group to see details 👈
//               </div>
//             )}
//           </div>
//         </div>

//         {/* CREATE GROUP MODAL */}
//         {showModal && (
//           <CreateGroup
//             onClose={() => setShowModal(false)}
//             onCreated={() => {
//               setRefresh(!refresh);
//               setShowModal(false);
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// Main Code hai a mat 

// import { useState } from "react";
// import Navbar from "../components/layout/Navbar";
// import GroupList from "../features/groups/GroupList";
// import CreateGroup from "../features/groups/CreateGroup";
// import GroupMembers from "../features/groups/GroupMembers";

// export default function Dashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   // 🔥 THIS IS THE FIX
//   const resetDashboard = () => {
//     setSelectedGroup(null);
//   };

//   return (
//     <>
//       {/* 🔥 PASS RESET FUNCTION */}
//       <Navbar onDashboardClick={resetDashboard} />

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Your Groups</h1>

//           <button
//             onClick={() => setShowModal(true)}
//             className="px-5 py-2 bg-cyan-500 text-black rounded-xl font-semibold"
//           >
//             + New Group
//           </button>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT: GROUP LIST */}
//           <GroupList
//             key={refresh}
//             onSelect={(group) => setSelectedGroup(group)}
//           />

//           {/* RIGHT: GROUP DETAILS */}
//           <div className="lg:col-span-2">
//             {selectedGroup ? (
//               <GroupMembers
//                 group={selectedGroup}
//                 onUpdated={() => {
//                   setRefresh(!refresh);
//                   setSelectedGroup(null);
//                 }}
//               />
//             ) : (
//               <div className="h-full flex items-center justify-center
//                               border border-dashed border-slate-700
//                               rounded-2xl text-slate-500">
//                 Select a group to see details 👈
//               </div>
//             )}
//           </div>
//         </div>

//         {/* CREATE GROUP MODAL */}
//         {showModal && (
//           <CreateGroup
//             onClose={() => setShowModal(false)}
//             onCreated={() => {
//               setRefresh(!refresh);
//               setShowModal(false);
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// import { useState } from "react";
// import Navbar from "../components/layout/Navbar";
// import GroupList from "../features/groups/GroupList";
// import CreateGroup from "../features/groups/CreateGroup";
// import GroupMembers from "../features/groups/GroupMembers";
// import useUserStore from "../store/user.store";
// import { toast } from "react-hot-toast";

// export default function Dashboard() {
//   const user = useUserStore((s) => s.user);
//   const [showModal, setShowModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const resetDashboard = () => {
//     setSelectedGroup(null);
//   };

//   return (
//     <>
//       <Navbar onDashboardClick={resetDashboard} />
//       {/* <button onClick={() => toast.success("Hello")}>
//   Click
// </button> */}

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* WELCOME MESSAGE */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">
//             Hello, {user?.name || "User"}! 👋
//           </h1>
//           <p className="text-slate-400">
//             Welcome back! Manage your groups and expenses here.
//           </p>
//         </div>

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Your Groups</h2>

//           <button
//             onClick={() => setShowModal(true)}
//             className="px-5 py-2 bg-cyan-500 text-black rounded-xl font-semibold hover:bg-cyan-400 transition"
//           >
//             + New Group
//           </button>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT: GROUP LIST */}
//           <GroupList
//             key={refresh}
//             onSelect={(group) => setSelectedGroup(group)}
//           />

//           {/* RIGHT: GROUP DETAILS */}
//           <div className="lg:col-span-2">
//             {selectedGroup ? (
//               <GroupMembers
//                 group={selectedGroup}
//                 onUpdated={() => {
//                   setRefresh(!refresh);
//                   setSelectedGroup(null);
//                 }}
//               />
//             ) : (
//               <div className="h-full flex items-center justify-center
//                               border border-dashed border-slate-700
//                               rounded-2xl text-slate-500">
//                 Select a group to see details 👈
//               </div>
//             )}
//           </div>
//         </div>

//         {/* CREATE GROUP MODAL */}
//         {showModal && (
//           <CreateGroup
//             onClose={() => setShowModal(false)}
//             onCreated={() => {
//               setRefresh(!refresh);
//               setShowModal(false);
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }


// import { useState } from "react";
// import Navbar from "@/components/layout/Navbar";
// import GroupList from "@/features/groups/GroupList";
// import CreateGroup from "@/features/groups/CreateGroup";
// import GroupMembers from "@/features/groups/GroupMembers";
// import useUserStore from "@/store/user.store";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// export default function Dashboard() {
//   const user = useUserStore((s) => s.user);

//   const [showModal, setShowModal] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const resetDashboard = () => {
//     setSelectedGroup(null);
//   };

//   return (
//     <>
//       <Navbar onDashboardClick={resetDashboard} />

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* ✅ WELCOME */}
//         <div className="mb-10 space-y-1">
//           <h1 className="text-4xl font-bold tracking-tight">
//             Hello, {user?.name || "User"} 👋
//           </h1>
//           <p className="text-muted-foreground">
//             Welcome back! Manage your groups and expenses here.
//           </p>
//         </div>

//         {/* ✅ HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Your Groups</h2>

//           <Button
//             onClick={() => setShowModal(true)}
//             className="rounded-xl"
//           >
//             + New Group
//           </Button>
//         </div>

//         {/* ✅ CONTENT GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT */}
//           <GroupList
//             key={refresh}
//             onSelect={(group) => setSelectedGroup(group)}
//           />

//           {/* RIGHT */}
//           <div className="lg:col-span-2">
//             {selectedGroup ? (
//               <GroupMembers
//                 group={selectedGroup}
//                 onUpdated={() => {
//                   setRefresh(!refresh);
//                   setSelectedGroup(null);
//                 }}
//               />
//             ) : (
//               <Card className="h-full border-dashed">
//                 <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground">
//                   Select a group to see details 👈
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>

//         {/* ✅ CREATE GROUP MODAL */}
//         {showModal && (
//           <CreateGroup
//             onClose={() => setShowModal(false)}
//             onCreated={() => {
//               setRefresh(!refresh);
//               setShowModal(false);
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// }


// import { useState } from "react";
// import Navbar from "@/components/layout/Navbar";
// import GroupList from "@/features/groups/GroupList";
// import CreateGroup from "@/features/groups/CreateGroup";
// import GroupMembers from "@/features/groups/GroupMembers";
// import useUserStore from "@/store/user.store";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// export default function Dashboard() {
//   const user = useUserStore((s) => s.user);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const resetDashboard = () => {
//     setSelectedGroup(null);
//   };

//   return (
//     <>
//       <Navbar onDashboardClick={resetDashboard} />

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* 👋 WELCOME */}
//         <div className="mb-10 space-y-1">
//           <h1 className="text-4xl font-bold tracking-tight">
//             Hello, {user?.name || "User"} 👋
//           </h1>
//           <p className="text-muted-foreground">
//             Welcome back! Manage your groups and expenses here.
//           </p>
//         </div>

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Your Groups</h2>

//           <Button
//             onClick={() => setShowModal(true)}
//             className="rounded-xl"
//           >
//             + New Group
//           </Button>
//         </div>

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT */}
//           <GroupList
//             onSelect={(group) => setSelectedGroup(group)}
//           />

//           {/* RIGHT */}
//           <div className="lg:col-span-2">
//             {selectedGroup ? (
//               <GroupMembers
//                 group={selectedGroup}
//                 onUpdated={() => {
//                   // 🔥 TanStack invalidateQueries handle karega refresh
//                   setSelectedGroup(null);
//                 }}
//               />
//             ) : (
//               <Card className="h-full border-dashed bg-slate-900 border-slate-800 text-white">
//                 <CardContent className="flex items-center justify-center h-[300px] text-slate-400">
//                   Select a group to see details 👈
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>

//         {/* CREATE GROUP */}
//         {showModal && (
//           <CreateGroup
//             onClose={() => setShowModal(false)}
//           />
//         )}
//       </div>
//     </>
//   );
// }

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

  // ✅ Reset dashboard + scroll top
  const resetDashboard = () => {
    setSelectedGroup(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar onDashboardClick={resetDashboard} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 👋 WELCOME */}
        <div className="mb-10 space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Hello, {user?.name || "User"} 👋
          </h1>

          <p className="text-slate-400">
            Welcome back! Manage your groups and expenses here.
          </p>
        </div>

        {/* HEADER */}
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

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT — GROUP LIST */}
          <GroupList
            selectedGroupId={selectedGroup?.id}
            onSelect={(group) => setSelectedGroup(group)}
          />

          {/* RIGHT — DETAILS PANEL */}
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

        {/* CREATE GROUP MODAL */}
        {showModal && (
          <CreateGroup onClose={() => setShowModal(false)} />
        )}
      </div>
    </>
  );
}
