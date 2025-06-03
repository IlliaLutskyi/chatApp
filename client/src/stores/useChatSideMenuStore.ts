import { create } from "zustand";

type initialStates = {
  currentOption: string;
  isOpen: boolean;
};
type actions = {
  setCurrentOption: (option: string) => void;
  toggle: (state?: boolean) => void;
};
const initialStates: initialStates = {
  currentOption: "default",
  isOpen: false,
};
const useChatSideMenuStore = create<initialStates & actions>((set) => ({
  ...initialStates,
  setCurrentOption: (option) => set(() => ({ currentOption: option })),
  toggle: (state) =>
    set((states) => ({
      isOpen: typeof state === "boolean" ? state : !states.isOpen,
    })),
}));
export default useChatSideMenuStore;
