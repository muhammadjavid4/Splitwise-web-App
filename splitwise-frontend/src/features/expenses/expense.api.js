import api from "../../services/axios";

// export const getGroupExpensesApi = (groupId) =>
//   api.get(`/expense/group/${groupId}`);
export const getGroupExpensesApi = (groupId) =>
  api.get(`/expense/group/${groupId}?t=${Date.now()}`);


export const createExpenseApi = (data) =>
  api.post("/expense", data);

export const updateExpenseApi = (expenseId, data) =>
  api.put(`/expense/${expenseId}`, data);

export const deleteExpenseApi = (expenseId) =>
  api.delete(`/expense/${expenseId}`);