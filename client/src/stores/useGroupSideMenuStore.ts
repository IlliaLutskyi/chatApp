import { create } from "zustand";

type initialStates = {
  currentOption: string;
};
type actions = {
  setCurrentOption: (option: string) => void;
};
const initialStates: initialStates = {
  currentOption: "default",
};
const useGroupSideMenuStore = create<initialStates & actions>((set) => ({
  ...initialStates,
  setCurrentOption: (option) => set(() => ({ currentOption: option })),
}));
export default useGroupSideMenuStore;
