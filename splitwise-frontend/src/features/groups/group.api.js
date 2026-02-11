import api from "../../services/axios";

// // export const getMyGroupsApi = () =>
// //   api.get("/group/my");

// export const getMyGroupsApi = () =>
//   api.get(`/group/my?t=${Date.now()}`);


// export const createGroupApi = (data) =>
//   api.post("/group", data);

// export const getGroupMembersApi = (groupId) =>
//   api.get(`/group/${groupId}/members`);

// ✅ Get my groups
export const getMyGroupsApi = () =>
  api.get("/group/my");

// ✅ Create new group
export const createGroupApi = (data) =>
  api.post("/group", data);

// ✅ Get members of a group
export const getGroupMembersApi = (groupId) =>
  api.get(`/group/${groupId}/members`);

// ✅ Add member (ADMIN only)
export const addMemberApi = (groupId, data) =>
  api.post(`/group/${groupId}/members`, data);

// ✅ Remove member (ADMIN only)
export const removeMemberApi = (groupId, userId) =>
  api.delete(`/group/${groupId}/members/${userId}`);

// ✅ Leave group (NON-admin)
export const leaveGroupApi = (groupId) =>
  api.delete(`/group/${groupId}/leave`);

// ✅ Delete group (ADMIN only)
export const deleteGroupApi = (groupId) =>
  api.delete(`/group/${groupId}`);

// 🔁 ADMIN TRANSFER
export const transferAdminApi = (groupId, data) =>
  api.put(`/group/${groupId}/transfer-admin`, data);


