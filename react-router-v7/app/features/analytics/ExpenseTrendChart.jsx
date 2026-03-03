// import { useEffect, useState } from "react";
// import axios from "../../services/axios";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function ExpenseTrendChart({ groupId }) {
//   const [expenses, setExpenses] = useState([]);
//   const [filter, setFilter] = useState("daily");

//   useEffect(() => {
//     fetchExpenses();
//   }, [groupId]);

//   const fetchExpenses = async () => {
//     const res = await axios.get(`/expense/group/${groupId}`);
//     console.log(res.data);
//     setExpenses(res.data);
//   };

//   const processData = () => {
//     const grouped = {};

//     expenses.forEach((expense) => {
//       const date = new Date(expense.createdAt);

//       let key;

//       if (filter === "daily") {
//         key = date.toLocaleDateString();
//       } else if (filter === "weekly") {
//         const firstDay = new Date(date);
//         firstDay.setDate(date.getDate() - date.getDay());
//         key = firstDay.toLocaleDateString();
//       } else {
//         key = `${date.getMonth() + 1}-${date.getFullYear()}`;
//       }

//       grouped[key] = (grouped[key] || 0) + expense.amount;
//     });

//     return Object.keys(grouped).map((key) => ({
//       date: key,
//       total: grouped[key],
//     }));
//   };

//   return (
//     <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setFilter("daily")}
//           className={`px-4 py-2 rounded ${
//             filter === "daily" ? "bg-cyan-500" : "bg-slate-800"
//           }`}
//         >
//           Daily
//         </button>

//         <button
//           onClick={() => setFilter("weekly")}
//           className={`px-4 py-2 rounded ${
//             filter === "weekly" ? "bg-cyan-500" : "bg-slate-800"
//           }`}
//         >
//           Weekly
//         </button>

//         <button
//           onClick={() => setFilter("monthly")}
//           className={`px-4 py-2 rounded ${
//             filter === "monthly" ? "bg-cyan-500" : "bg-slate-800"
//           }`}
//         >
//           Monthly
//         </button>
//       </div>

//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={processData()}>
//           <CartesianGrid stroke="#334155" />
//           <XAxis dataKey="date" stroke="#94a3b8" />
//           <YAxis stroke="#94a3b8" />
//           <Tooltip />
//           <Line type="monotone" dataKey="total" stroke="#22d3ee" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "../../services/axios";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function ExpenseTrendChart({ groupId }) {
//   const [expenses, setExpenses] = useState([]);
//   const [filter, setFilter] = useState("daily");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchExpenses();
//   }, [groupId]);

//   const fetchExpenses = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/expense/group/${groupId}`);

//       setExpenses(res.data.expenses || []);
//     } catch (error) {
//       console.error("Error fetching expenses:", error);
//       setExpenses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const processData = () => {
//     if (!Array.isArray(expenses)) return [];

//     const grouped = {};

//     expenses.forEach((expense) => {
//       const date = new Date(expense.created_at);

//       let key;

//       if (filter === "daily") {
//         key = date.toLocaleDateString();
//       } 
//       else if (filter === "weekly") {
//         const firstDay = new Date(date);
//         firstDay.setDate(date.getDate() - date.getDay());
//         key = firstDay.toLocaleDateString();
//       } 
//       else {
//         key = `${date.getMonth() + 1}-${date.getFullYear()}`;
//       }

//       grouped[key] =
//         (grouped[key] || 0) + Number(expense.amount);
//     });

//     // Convert object → sorted array
//     return Object.keys(grouped)
//       .sort((a, b) => new Date(a) - new Date(b))
//       .map((key) => ({
//         date: key,
//         total: grouped[key],
//       }));
//   };

//   if (loading) {
//     return (
//       <div className="text-center text-slate-400 py-10">
//         Loading analytics...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

//       {/* Filter Buttons */}
//       <div className="flex gap-4 mb-6">
//         {["daily", "weekly", "monthly"].map((type) => (
//           <button
//             key={type}
//             onClick={() => setFilter(type)}
//             className={`px-4 py-2 rounded capitalize ${
//               filter === type ? "bg-cyan-500" : "bg-slate-800"
//             }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       {/* Chart */}
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={processData()}>
//           <CartesianGrid stroke="#334155" />
//           <XAxis dataKey="date" stroke="#94a3b8" />
//           <YAxis stroke="#94a3b8" />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="total"
//             stroke="#22d3ee"
//             strokeWidth={3}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


// import { useEffect, useState, useMemo } from "react";
// import axios from "../../services/axios";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function ExpenseTrendChart({ groupId }) {
//   const [expenses, setExpenses] = useState([]);
//   const [filter, setFilter] = useState("daily");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (groupId) fetchExpenses();
//   }, [groupId]);

//   const fetchExpenses = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/expense/group/${groupId}`);
//       setExpenses(Array.isArray(res.data.expenses) ? res.data.expenses : []);
//     } catch (error) {
//       console.error("Error fetching expenses:", error);
//       setExpenses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const normalize = (date) => {
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);
//     return d;
//   };

//   const formatDate = (date) => {
//     const d = normalize(date);
//     const y = d.getFullYear();
//     const m = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${y}-${m}-${day}`;
//   };

//   const getWeekStart = (date) => {
//     const d = normalize(date);
//     const day = d.getDay();
//     const diff = d.getDate() - day + (day === 0 ? -6 : 1);
//     d.setDate(diff);
//     return d;
//   };

//   const getWeekEnd = (date) => {
//     const start = getWeekStart(date);
//     const end = new Date(start);
//     end.setDate(start.getDate() + 6);
//     return end;
//   };

//   const chartData = useMemo(() => {
//     if (!expenses.length) return [];

//     const grouped = {};

//     // GROUPING
//     expenses.forEach((expense) => {
//       const date = normalize(expense.created_at);
//       let key;

//       if (filter === "daily") {
//         key = formatDate(date);
//       } 
//       else if (filter === "weekly") {
//         // group by week start
//         key = formatDate(getWeekStart(date));
//       } 
//       else {
//         const month = String(date.getMonth() + 1).padStart(2, "0");
//         key = `${date.getFullYear()}-${month}`;
//       }

//       grouped[key] = (grouped[key] || 0) + Number(expense.amount);
//     });

//     const earliest = normalize(
//       new Date(Math.min(...expenses.map((e) => new Date(e.created_at))))
//     );

//     const today = normalize(new Date());

//     let current =
//       filter === "weekly"
//         ? getWeekStart(earliest)
//         : new Date(earliest);

//     const result = [];

//     while (current <= today) {
//       let key;
//       let label;

//       if (filter === "daily") {
//         key = formatDate(current);
//         label = key;
//         current.setDate(current.getDate() + 1);
//       } 
//       else if (filter === "weekly") {
//         const weekStart = new Date(current);
//         const weekEnd = getWeekEnd(current);

//         key = formatDate(weekStart);

//         // 🔥 show week END date on graph
//         label = formatDate(weekEnd);

//         current.setDate(current.getDate() + 7);
//       } 
//       else {
//         const month = String(current.getMonth() + 1).padStart(2, "0");
//         key = `${current.getFullYear()}-${month}`;
//         label = key;
//         current.setMonth(current.getMonth() + 1);
//       }

//       result.push({
//         key,
//         date: label,
//         total: grouped[key] || 0,
//       });
//     }

//     return result;
//   }, [expenses, filter]);

//   if (loading) {
//     return (
//       <div className="text-center text-slate-400 py-10">
//         Loading analytics...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
//       <div className="flex gap-4 mb-6">
//         {["daily", "weekly", "monthly"].map((type) => (
//           <button
//             key={type}
//             onClick={() => setFilter(type)}
//             className={`px-4 py-2 rounded capitalize transition ${
//               filter === type
//                 ? "bg-cyan-500 text-white"
//                 : "bg-slate-800 text-slate-300 hover:bg-slate-700"
//             }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       {chartData.length === 0 ? (
//         <div className="text-center text-slate-400 py-10">
//           No expense data available
//         </div>
//       ) : (
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={chartData}>
//             <CartesianGrid stroke="#334155" />

//             <XAxis
//               dataKey="date"
//               stroke="#94a3b8"
//               tick={{ fontSize: 12 }}
//               interval="preserveStartEnd"
//             />

//             <YAxis stroke="#94a3b8" />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#0f172a",
//                 border: "1px solid #334155",
//               }}
//             />

//             <Line
//               type="monotone"
//               dataKey="total"
//               stroke="#22d3ee"
//               strokeWidth={3}
//               dot={{ r: 4 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState, useMemo } from "react";
// import axios from "../../services/axios";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function ExpenseTrendChart({ groupId }) {
//   const [expenses, setExpenses] = useState([]);
//   const [filter, setFilter] = useState("daily");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (groupId) fetchExpenses();
//   }, [groupId]);

//   const fetchExpenses = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/expense/group/${groupId}`);
//       setExpenses(Array.isArray(res.data.expenses) ? res.data.expenses : []);
//     } catch (error) {
//       console.error("Error fetching expenses:", error);
//       setExpenses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const normalize = (date) => {
//     const d = new Date(date);
//     d.setHours(0, 0, 0, 0);
//     return d;
//   };

//   const formatDate = (date) => {
//     const d = normalize(date);
//     return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
//       d.getDate()
//     ).padStart(2, "0")}`;
//   };

//   const formatShort = (date) => {
//     const d = normalize(date);
//     return d.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//     });
//   };

//   const getWeekStart = (date) => {
//     const d = normalize(date);
//     const day = d.getDay();
//     const diff = d.getDate() - day + (day === 0 ? -6 : 1);
//     d.setDate(diff);
//     return d;
//   };

//   const getWeekEnd = (date) => {
//     const start = getWeekStart(date);
//     const end = new Date(start);
//     end.setDate(start.getDate() + 6);
//     return end;
//   };

//   const chartData = useMemo(() => {
//     if (!expenses.length) return [];

//     const grouped = {};

//     expenses.forEach((expense) => {
//       const date = normalize(expense.created_at);
//       let key;

//       if (filter === "daily") {
//         key = formatDate(date);
//       } 
//       else if (filter === "weekly") {
//         key = formatDate(getWeekStart(date));
//       } 
//       else {
//         const month = String(date.getMonth() + 1).padStart(2, "0");
//         key = `${date.getFullYear()}-${month}`;
//       }

//       grouped[key] = (grouped[key] || 0) + Number(expense.amount);
//     });

//     const earliest = normalize(
//       new Date(Math.min(...expenses.map((e) => new Date(e.created_at))))
//     );

//     const today = normalize(new Date());

//     let current =
//       filter === "weekly"
//         ? getWeekStart(earliest)
//         : new Date(earliest);

//     const result = [];

//     while (current <= today) {
//       let key;
//       let label;

//       if (filter === "daily") {
//         key = formatDate(current);
//         label = key;
//         current.setDate(current.getDate() + 1);
//       } 
//       else if (filter === "weekly") {
//         const weekStart = new Date(current);
//         const weekEnd = getWeekEnd(current);

//         key = formatDate(weekStart);
//         label = formatShort(weekEnd);

//         current.setDate(current.getDate() + 7);
//       } 
//       else {
//         const month = String(current.getMonth() + 1).padStart(2, "0");
//         key = `${current.getFullYear()}-${month}`;
//         label = key;
//         current.setMonth(current.getMonth() + 1);
//       }

//       result.push({
//         key,
//         date: label,
//         total: grouped[key] || 0,
//       });
//     }

//     return result;
//   }, [expenses, filter]);

//   if (loading) {
//     return (
//       <div className="text-center text-slate-400 py-10">
//         Loading analytics...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
//       <div className="flex gap-4 mb-6">
//         {["daily", "weekly", "monthly"].map((type) => (
//           <button
//             key={type}
//             onClick={() => setFilter(type)}
//             className={`px-4 py-2 rounded capitalize transition ${
//               filter === type
//                 ? "bg-cyan-500 text-white"
//                 : "bg-slate-800 text-slate-300 hover:bg-slate-700"
//             }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       {chartData.length === 0 ? (
//         <div className="text-center text-slate-400 py-10">
//           No expense data available
//         </div>
//       ) : (
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={chartData}>
//             <CartesianGrid stroke="#334155" />

//             <XAxis
//               dataKey="date"
//               stroke="#94a3b8"
//               interval={filter === "daily" ? "auto" : 0}
//               minTickGap={filter === "daily" ? 20 : 10}
//               angle={filter === "daily" ? -45 : 0}
//               textAnchor={filter === "daily" ? "end" : "middle"}
//               height={filter === "daily" ? 60 : 30}
//             //   padding={{ left: 20, right: 20 }}
//             />

//             <YAxis stroke="#94a3b8" />

//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#0f172a",
//                 border: "1px solid #334155",
//               }}
//             />

//             <Line
//               type="monotone"
//               dataKey="total"
//               stroke="#22d3ee"
//               strokeWidth={3}
//               dot={{ r: 4 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState, useMemo } from "react";
// import axios from "../../services/axios";
// import {
//     LineChart,
//     Line,
//     CartesianGrid,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";

// export default function ExpenseTrendChart({ groupId }) {
//     const [expenses, setExpenses] = useState([]);
//     const [filter, setFilter] = useState("daily");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (groupId) fetchExpenses();
//     }, [groupId]);

//     const fetchExpenses = async () => {
//         try {
//             setLoading(true);
//             const res = await axios.get(`/expense/group/${groupId}`);
//             setExpenses(Array.isArray(res.data.expenses) ? res.data.expenses : []);
//         } catch (error) {
//             console.error("Error fetching expenses:", error);
//             setExpenses([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const normalize = (date) => {
//         const d = new Date(date);
//         d.setHours(0, 0, 0, 0);
//         return d;
//     };

//     const formatDate = (date) => {
//         const d = normalize(date);
//         return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
//             d.getDate()
//         ).padStart(2, "0")}`;
//     };

//     const formatShort = (date) => {
//         const d = normalize(date);
//         return d.toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "short",
//         });
//     };

//     const getWeekStart = (date) => {
//         const d = normalize(date);
//         const day = d.getDay();
//         const diff = d.getDate() - day + (day === 0 ? -6 : 1);
//         d.setDate(diff);
//         return d;
//     };

//     const getWeekEnd = (date) => {
//         const start = getWeekStart(date);
//         const end = new Date(start);
//         end.setDate(start.getDate() + 6);
//         return end;
//     };

//     const chartData = useMemo(() => {
//         if (!expenses.length) return [];

//         const grouped = {};

//         expenses.forEach((expense) => {
//             const date = normalize(expense.created_at);
//             let key;

//             if (filter === "daily") {
//                 key = formatDate(date);
//             }
//             else if (filter === "weekly") {
//                 key = formatDate(getWeekStart(date));
//             }
//             else {
//                 const monthStart = new Date(date);
//                 monthStart.setDate(1);
//                 key = formatDate(monthStart);
//             }

//             grouped[key] = (grouped[key] || 0) + Number(expense.amount);
//         });

//         const earliest = normalize(
//             new Date(Math.min(...expenses.map((e) => new Date(e.created_at))))
//         );

//         const today = normalize(new Date());

//         let current =
//             filter === "weekly"
//                 ? getWeekStart(earliest)
//                 : new Date(earliest);

//         const result = [];

//         // 🔥 FIX FOR MONTHLY
//         let endDate = today;
//         if (filter === "monthly") {
//             endDate = new Date(today);
//             endDate.setDate(1); // force to month start
//         }

//         while (current <= endDate) {
//             let key;
//             let label;

//             if (filter === "daily") {
//                 key = formatDate(current);
//                 label = key;
//                 current.setDate(current.getDate() + 1);
//             }
//             else if (filter === "weekly") {
//                 const weekStart = new Date(current);
//                 const weekEnd = getWeekEnd(current);

//                 key = formatDate(weekStart);
//                 label = formatShort(weekEnd);

//                 current.setDate(current.getDate() + 7);
//             }
//             else {
//                 current.setDate(1);

//                 key = formatDate(current);
//                 label = key;

//                 current.setMonth(current.getMonth() + 1);
//             }

//             result.push({
//                 key,
//                 date: label,
//                 total: grouped[key] || 0,
//             });
//         }

//         return result;
//     }, [expenses, filter]);

//     if (loading) {
//         return (
//             <div className="text-center text-slate-400 py-10">
//                 Loading analytics...
//             </div>
//         );
//     }

//     return (
//         <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
//             <div className="flex gap-4 mb-6">
//                 {["daily", "weekly", "monthly"].map((type) => (
//                     <button
//                         key={type}
//                         onClick={() => setFilter(type)}
//                         className={`px-4 py-2 rounded capitalize transition ${filter === type
//                                 ? "bg-cyan-500 text-white"
//                                 : "bg-slate-800 text-slate-300 hover:bg-slate-700"
//                             }`}
//                     >
//                         {type}
//                     </button>
//                 ))}
//             </div>

//             {chartData.length === 0 ? (
//                 <div className="text-center text-slate-400 py-10">
//                     No expense data available
//                 </div>
//             ) : (
//                 <ResponsiveContainer width="100%" height={400}>
//                     <LineChart data={chartData}>
//                         <CartesianGrid stroke="#334155" />
//                         {/* <XAxis dataKey="date" stroke="#94a3b8" /> */}
//                         <XAxis
//                             dataKey="date"
//                             stroke="#94a3b8"
//                             interval={filter === "daily" ? 0 : "auto"}   // important
//                             angle={filter === "daily" ? -45 : 0}
//                             textAnchor={filter === "daily" ? "end" : "middle"}
//                             height={filter === "daily" ? 60 : 30}
//                             minTickGap={filter === "daily" ? 5 : 20}
//                         />
//                         <YAxis 
//                         stroke="#94a3b8"
//                          />
//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: "#0f172a",
//                                 border: "1px solid #334155",
//                             }}
//                         />
//                         <Line
//                             type="monotone"
//                             dataKey="total"
//                             stroke="#22d3ee"
//                             strokeWidth={3}
//                             dot={{ r: 4 }}
//                         />
//                     </LineChart>
//                 </ResponsiveContainer>
//             )}
//         </div>
//     );
// }






import { useEffect, useState, useMemo } from "react";
import axios from "../../services/axios";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function ExpenseTrendChart({ groupId }) {
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState("daily");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (groupId) fetchExpenses();
    }, [groupId]);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/expense/group/${groupId}`);
            setExpenses(Array.isArray(res.data.expenses) ? res.data.expenses : []);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setExpenses([]);
        } finally {
            setLoading(false);
        }
    };

    const normalize = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const formatDate = (date) => {
        const d = normalize(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
        ).padStart(2, "0")}`;
    };

    const formatShort = (date) => {
        const d = normalize(date);
        return d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });
    };

    const getWeekStart = (date) => {
        const d = normalize(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setDate(diff);
        return d;
    };

    const getWeekEnd = (date) => {
        const start = getWeekStart(date);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return end;
    };

    const chartData = useMemo(() => {
        if (!expenses.length) return [];

        const grouped = {};

        expenses.forEach((expense) => {
            const date = normalize(expense.created_at);
            let key;

            if (filter === "daily") {
                key = formatDate(date);
            }
            else if (filter === "weekly") {
                key = formatDate(getWeekStart(date));
            }
            else {
                const monthStart = new Date(date);
                monthStart.setDate(1);
                key = formatDate(monthStart);
            }

            grouped[key] = (grouped[key] || 0) + Number(expense.amount);
        });

        const earliest = normalize(
            new Date(Math.min(...expenses.map((e) => new Date(e.created_at))))
        );

        const today = normalize(new Date());

        let current =
            filter === "weekly"
                ? getWeekStart(earliest)
                : new Date(earliest);

        const result = [];

        let endDate = today;
        if (filter === "monthly") {
            endDate = new Date(today);
            endDate.setDate(1);
        }

        while (current <= endDate) {
            let key;
            let label;

            if (filter === "daily") {
                key = formatDate(current);
                label = key;
                current.setDate(current.getDate() + 1);
            }
            else if (filter === "weekly") {
                const weekStart = new Date(current);
                const weekEnd = getWeekEnd(current);

                key = formatDate(weekStart);
                label = formatShort(weekEnd);

                current.setDate(current.getDate() + 7);
            }
            else {
                current.setDate(1);

                key = formatDate(current);
                label = key;

                current.setMonth(current.getMonth() + 1);
            }

            result.push({
                key,
                date: label,
                total: grouped[key] || 0,
            });
        }

        if (result.length > 0 && result[0].total !== 0) {
            result.unshift({
                key: "start-zero",
                date: "",
                total: 0,
            });
        }

        return result;
    }, [expenses, filter]);

    if (loading) {
        return (
            <div className="text-center text-slate-400 py-10">
                Loading analytics...
            </div>
        );
    }

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <div className="flex gap-4 mb-6">
                {["daily", "weekly", "monthly"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded capitalize transition ${
                            filter === type
                                ? "bg-cyan-500 text-white"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {chartData.length === 0 ? (
                <div className="text-center text-slate-400 py-10">
                    No expense data available
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid stroke="#334155" />
                        <XAxis
                            dataKey="date"
                            stroke="#94a3b8"
                            interval={filter === "daily" ? 0 : "auto"}
                            angle={filter === "daily" ? -45 : 0}
                            textAnchor={filter === "daily" ? "end" : "middle"}
                            height={filter === "daily" ? 60 : 30}
                            minTickGap={filter === "daily" ? 5 : 20}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            domain={[0, "auto"]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #334155",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#22d3ee"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}