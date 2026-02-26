import api from "../../services/axios";

// 🔔 get all notifications
export const getMyNotificationsApi = () =>
  api.get("/notifications");

// 🔴 unread count
export const getUnreadCountApi = () =>
  api.get("/notifications/unread-count");

// ✅ mark as read
export const markNotificationReadApi = (id) =>
  api.put(`/notifications/${id}/read`);
