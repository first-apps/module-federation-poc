import { create } from "zustand";

export const useAuth = create((set) => ({
  data: null,
  isAuthenticated: false,
  isInitialized: false,
  setData: (data) => set({ data, isAuthenticated: true }),
}));
