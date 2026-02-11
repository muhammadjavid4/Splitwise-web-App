import api from "../../services/axios";

// 🔁 settle up (partial / full)
export const settleUpApi = (data) =>
  api.post("/settle", data);

// 📜 group settlement history
export const getGroupSettlementHistoryApi = (groupId) =>
  api.get(`/settle/group/${groupId}`);

// 👤 my settlement history
export const getMySettlementHistoryApi = () =>
  api.get("/settle/me");

export const undoSettlementApi = (id) =>
  api.put(`/settle/${id}/undo`);

// settlements/settlement.api.js

export const updateSettlementMethodApi = (id, method) =>
  api.put(`/settle/${id}/method`, { method });

