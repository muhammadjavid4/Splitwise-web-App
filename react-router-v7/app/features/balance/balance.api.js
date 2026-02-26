import api from "../../services/axios";

// export const getGroupBalanceApi = (groupId) =>
//   api.get(`/balance/group/${groupId}`);
export const getGroupBalanceApi = (groupId) =>
  api.get(`/balance/group/${groupId}?t=${Date.now()}`);
