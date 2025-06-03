import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../lib/api";
import { Chat } from "../../types/Chat";
import { User } from "../../types/User";
import { useEffect } from "react";
import useChatSideMenuStore from "../../stores/useChatSideMenuStore";
import Chat_Info from "./Chat_Info";
import EditChat from "./EditChat";

const MotionBox = motion.create(Box);
type props = {
  chat: Chat | undefined;
};
const ChatSettings = ({ chat }: props) => {
  const { currentOption, isOpen } = useChatSideMenuStore((store) => store);
  const [searchParams] = useSearchParams();
  const { data: members, refetch } = useQuery({
    queryFn: async () => {
      const data = await api.get(
        `/chats/getMembers/${searchParams.get("chat")}`,
        {
          withCredentials: true,
        }
      );
      return data.data.members as { user: User; role: "admin" | "guest" }[];
    },
    queryKey: ["chatMembers", searchParams.get("chat")],
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    enabled: isOpen,
  });
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, []);
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          key="chatSettings"
          className="absolute top-0 right-0 sm:w-1/2 md:w-1/4 w-1/2 h-full bg-stone-800"
        >
          {currentOption === "default" && (
            <Chat_Info chat={chat} members={members} />
          )}
          {currentOption === "edit_chat" && <EditChat chat={chat} />}
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default ChatSettings;
