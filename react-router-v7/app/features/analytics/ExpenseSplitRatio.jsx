import { useEffect, useState, useMemo } from "react";
import axios from "../../services/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#22d3ee",
  "#6366f1",
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#a855f7",
  "#e11d48",
  "#0ea5e9",
  "#14b8a6",
  "#f97316",
  "#8b5cf6",
  "#84cc16",
];

export default function ExpenseSplitRatio({ groupId }) {
  const [expenses, setExpenses] = useState([]);
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
      console.error("Error fetching split ratio:", error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const chartData = useMemo(() => {
    if (!expenses.length) return [];

    const contribution = {};

    expenses.forEach((expense) => {
      const payer = expense.paid_by_name || expense.paid_by; 
      contribution[payer] =
        (contribution[payer] || 0) + Number(expense.amount);
    });

    const total = Object.values(contribution).reduce(
      (sum, val) => sum + val,
      0
    );

    return Object.keys(contribution).map((name) => ({
      name,
      value: contribution[name],
      percent: ((contribution[name] / total) * 100).toFixed(1),
    }));
  }, [expenses]);

  if (loading) {
    return (
      <div className="text-center text-slate-400 py-10">
        Loading split ratio...
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="text-center text-slate-400 py-10">
        No expense data available
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

      <h2 className="text-lg font-semibold text-white mb-6">
        Expense Contribution Ratio
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={80}
            outerRadius={130}
            paddingAngle={3}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name, props) => [
              `₹${value} (${props.payload.percent}%)`,
              name,
            ]}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}