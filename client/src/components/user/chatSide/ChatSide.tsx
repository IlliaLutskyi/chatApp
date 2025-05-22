import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { Chat } from "../../../types/Chat";
import { api } from "../../../lib/api";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import ChatMenu from "./ChatMenu";

const MotionBox = motion(Box);
const ChatSide = () => {
  const [searchParams] = useSearchParams();
  const { data, isSuccess } = useQuery({
    queryFn: async () => {
      const data = await api.get(`/chats/getChat/${searchParams.get("chat")}`, {
        withCredentials: true,
      });
      return data.data.chat as Chat;
    },
    queryKey: ["chat", searchParams.get("chat")],
  });

  if (!searchParams.get("chat")) return <></>;

  return (
    <>
      {isSuccess && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ChatMenu chat={data} />
        </MotionBox>
      )}
    </>
  );
};

export default ChatSide;
