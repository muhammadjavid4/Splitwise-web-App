// import { useEffect, useState } from "react";
// import api from "../../services/axios";

// export default function ActivityLog({ groupId }) {
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadActivities = async (signal) => {
//     try {
//       setLoading(true);

//       const res = await api.get(
//         `/activity/group/${groupId}`,
//         { signal }
//       );

//       setActivities(res.data.activities || []);
//     } catch (err) {
//       if (err.name !== "CanceledError") {
//         console.error(err);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const controller = new AbortController();

//     loadActivities(controller.signal);

//     return () => controller.abort(); // 🔥 cleanup
//   }, [groupId]);

//   if (loading) {
//     return (
//       <p className="text-slate-400">
//         Loading activity...
//       </p>
//     );
//   }

//   if (activities.length === 0) {
//     return (
//       <p className="text-slate-500 text-sm">
//         No activity yet
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-3">
//       {activities.map((a) => (
//         <div
//           key={a.id}
//           className="bg-slate-800/60 border border-slate-700 rounded-lg p-3"
//         >
//           <p className="text-sm text-slate-200">
//             {a.message}
//           </p>

//           <p className="text-xs text-slate-500 mt-1">
//             {new Date(a.created_at).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }


import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export default function ActivityLog({ groupId }) {

  // ✅ TanStack Query
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ["activity-log", groupId],

    queryFn: async () => {
      const res = await api.get(`/activity/group/${groupId}`);
      return res.data.activities || [];
    },

    // 🔥 optional refresh every 20s
    refetchInterval: 20000,
  });

  if (isLoading) {
    return (
      <p className="text-slate-400">
        Loading activity...
      </p>
    );
  }

  if (activities.length === 0) {
    return (
      <p className="text-slate-500 text-sm">
        No activity yet
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((a) => (
        <div
          key={a.id}
          className="bg-slate-800/60 border border-slate-700 rounded-lg p-3"
        >
          <p className="text-sm text-slate-200">
            {a.message}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            {new Date(a.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
