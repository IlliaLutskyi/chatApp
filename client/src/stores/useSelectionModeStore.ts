import { create } from "zustand";

type initialStates = {
  isOn: boolean;
  selectedMessages: number[];
};
type actions = {
  setIsOn: (state: boolean) => void;
  setSelectedMessage: (message: number) => void;
  setSelectedMessages: (messages: number[]) => void;
};
const initialStates: initialStates = {
  isOn: false,
  selectedMessages: [],
};
const useSelectionModeStore = create<initialStates & actions>((set) => ({
  ...initialStates,
  setIsOn: (state) =>
    set(() => ({
      isOn: typeof state === "boolean" ? state : !initialStates.isOn,
    })),
  setSelectedMessage: (message) =>
    set((state) => ({
      selectedMessages: state.selectedMessages.includes(message)
        ? state.selectedMessages.filter((id) => id !== message)
        : [...state.selectedMessages, message],
    })),
  setSelectedMessages: (messages) =>
    set(() => ({ selectedMessages: messages })),
}));
export default useSelectionModeStore;
