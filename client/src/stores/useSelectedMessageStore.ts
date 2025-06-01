import { Message } from "@/types/Message";
import { create } from "zustand";

type initialStates = {
  isOn: boolean;
  selectedMessage: Message | null;
};
type actions = {
  setIsOn: (state: boolean) => void;
  setSelectedMessage: (message: Message | null) => void;
};
const initialStates: initialStates = {
  isOn: false,
  selectedMessage: null,
};
const useSelectedMessageStore = create<initialStates & actions>((set) => ({
  ...initialStates,
  setIsOn: (state) =>
    set(() => ({
      isOn: typeof state === "boolean" ? state : !initialStates.isOn,
    })),
  setSelectedMessage: (message) =>
    set(() => ({
      selectedMessage: message,
    })),
}));
export default useSelectedMessageStore;
