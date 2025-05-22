import { Box, Typography } from "@mui/material";
import InputBar from "./InputBar";
import { lazy, Suspense } from "react";
import { Chat } from "../../../types/Chat";
import ChatNav from "./ChatNav";
const ChatSettings = lazy(() => import("./ChatSettings"));
const Messages = lazy(() => import("./Messages"));

type props = {
  chat: Chat | undefined;
};
const ChatMenu = ({ chat }: props) => {
  return (
    <Box className="flex flex-col w-full h-full overflow-y-auto" id="scrollBar">
      <ChatNav chat={chat} />
      <Suspense
        fallback={<Typography className="!text-white">Loading...</Typography>}
      >
        <Messages />
        <InputBar />
        <ChatSettings chat={chat} />
      </Suspense>
    </Box>
  );
};

export default ChatMenu;
