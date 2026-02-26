import api from "../../services/axios";

// 🔥 Get activity logs of a group
export const getGroupActivitiesApi = (groupId) =>
  api.get(`/activity/group/${groupId}`);
