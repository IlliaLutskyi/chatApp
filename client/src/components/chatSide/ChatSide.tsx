import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { Chat } from "../../types/Chat";
import { api } from "../../lib/api";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ChatNav from "./ChatNav";
import { lazy, Suspense } from "react";
import InputBar from "./InputBar";
import useSelectionModeStore from "../../stores/useSelectionModeStore";
import SelectionMode from "./SelectionMode";
const ChatSettings = lazy(() => import("./ChatMenu"));
const Messages = lazy(() => import("./Messages"));

const MotionBox = motion.create(Box);
const ChatSide = () => {
  const [searchParams] = useSearchParams();
  const isSelectionModeOn = useSelectionModeStore((store) => store.isOn);
  const { data: chat, isSuccess } = useQuery({
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
          className="flex flex-col w-full h-full overflow-y-auto"
          id="scrollBar"
        >
          <ChatNav chat={chat} />
          <Suspense
            fallback={
              <Typography className="!text-white">Loading...</Typography>
            }
          >
            {!isSelectionModeOn ? (
              <>
                <Messages />
                <InputBar />
              </>
            ) : (
              <SelectionMode />
            )}
            <ChatSettings chat={chat} />
          </Suspense>
        </MotionBox>
      )}
    </>
  );
};

export default ChatSide;
