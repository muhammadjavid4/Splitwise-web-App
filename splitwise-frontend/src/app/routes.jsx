import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ProtectedRoute from "../components/common/ProtectedRoute";
import GroupDetails from "../features/groups/GroupDetails";
import Notifications from "../pages/Notifications";



export default function AppRoutes() {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTECTED */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/groups/:groupId" element={<GroupDetails />} />
            </Route>
            <Route path="/notifications" element={<Notifications />} />
        </Routes>
    );
}
