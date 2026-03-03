import { useParams } from "react-router";
import Navbar from "../../components/layout/Navbar";
import ExpenseTrendChart from "./ExpenseTrendChart";
import ExpenseSplitRatio from "./ExpenseSplitRatio";

export default function GroupAnalytics() {
    const { groupId } = useParams();

    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Expense Analytics
                </h2>

                <ExpenseTrendChart groupId={groupId} />
            </div>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <ExpenseSplitRatio groupId={groupId} />
            </div>
        </div>
    );
}