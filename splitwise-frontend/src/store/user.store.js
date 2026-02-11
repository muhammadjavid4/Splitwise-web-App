import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  isAuth: false,

  login: (user, token) =>
    set({ user, token, isAuth: true }),

  logout: () =>
    set({ user: null, token: null, isAuth: false }),
}));

export default useUserStore;
