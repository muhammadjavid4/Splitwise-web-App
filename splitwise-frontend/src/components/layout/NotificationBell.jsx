// import { useEffect, useState } from "react";
// import { FiBell } from "react-icons/fi";
// import api from "../../services/axios";

// export default function NotificationBell({ onClick }) {
//   const [count, setCount] = useState(0);

//   const loadCount = async () => {
//     try {
//       const res = await api.get("/notifications/unread-count");
//       setCount(res.data.count || 0);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadCount();
//   }, []);

//   return (
//     <button
//       onClick={onClick}
//       className="relative p-2 rounded-lg
//                  text-slate-300 hover:text-white
//                  hover:bg-white/5 transition"
//     >
//       <FiBell size={20} />

//       {count > 0 && (
//         <span
//           className="absolute -top-1 -right-1
//                      bg-red-500 text-white
//                      text-[10px] font-bold
//                      rounded-full min-w-[18px] h-[18px]
//                      flex items-center justify-center"
//         >
//           {count}
//         </span>
//       )}
//     </button>
//   );
// }


import { FiBell } from "react-icons/fi";
import api from "@/services/axios";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function NotificationBell({ onClick }) {
  // ✅ TanStack Query
  const { data } = useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: async () => {
      const res = await api.get("/notifications/unread-count");
      return res.data.count || 0;
    },

    // 🔥 optional refresh every 30s (nice UX)
    refetchInterval: 30000,
  });

  const count = data || 0;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative"
    >
      <FiBell size={20} />

      {count > 0 && (
        <span
          className="absolute -top-1 -right-1
                     bg-red-500 text-white
                     text-[10px] font-bold
                     rounded-full min-w-[18px] h-[18px]
                     flex items-center justify-center"
        >
          {count}
        </span>
      )}
    </Button>
  );
}

