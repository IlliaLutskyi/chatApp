import { create } from "zustand";

type initialStates = {
  isOpen: boolean;
};
type actions = {
  toggle: (state?: boolean) => void;
};
const initialStates: initialStates = {
  isOpen: false,
};
const useAddMemberStore = create<initialStates & actions>((set) => ({
  ...initialStates,
  toggle: (state) =>
    set((states) => ({
      isOpen: typeof state === "boolean" ? state : !states.isOpen,
    })),
}));
export default useAddMemberStore;
