import { create } from "zustand";
import { User } from "../types/User";

type initialStates = {
  user: User | null;
};
type actions = {
  setUser: (user: User) => void;
};
const initialStates: initialStates = {
  user: null,
};
const useUserStore = create<initialStates & actions>((set) => ({
  ...initialStates,
  setUser: (user) => set(() => ({ user })),
}));
export default useUserStore;
