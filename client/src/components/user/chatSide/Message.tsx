import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useUserStore from "../../../stores/useUserStore";
import { Message as TMessage } from "../../../types/Message";
import OptimizedImage from "../../common/OptimizedImage";
import useSelectionModeStore from "../../../stores/useSelectionModeStore";
import MessageActions from "./MessageActions";
import { useEffect, useRef, useState } from "react";

const MotionBox = motion(Box);
type props = {
  message: TMessage;
};
const Message = ({ message }: props) => {
  const user = useUserStore((state) => state.user);
  const setSelectionMode = useSelectionModeStore((store) => store.setIsOn);
  const [IsOpen, setIsOpen] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  function clickOutside(e: MouseEvent) {
    if (!messageRef?.current?.contains(e.target as HTMLElement))
      setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  return (
    <MotionBox
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      key={message.id}
      id="message"
      ref={messageRef}
      onClick={() => setIsOpen(!IsOpen)}
      className={`${
        message.userId === user?.id ? "self-end  " : "self-start"
      } relative flex gap-3 items-center`}
    >
      <Box className="self-end">
        <OptimizedImage
          className="w-8 h-8 rounded-full"
          alt="image"
          path={message.user?.image || ""}
        />
      </Box>

      <Box className="flex flex-col gap-1 min-w-[200px] bg-white !text-2xl p-3 rounded-2xl">
        <Box className="flex  gap-2 w-full items-center">
          <Typography
            className="text-center !font-bold !text-sm"
            fontFamily={"cursive"}
          >
            {message.userId === user?.id ? "You" : message.user?.name}
          </Typography>
        </Box>

        <Box>
          {message.image ? (
            <Box className="flex flex-col justify-center items-center gap-2">
              <OptimizedImage
                path={message.image}
                alt="image"
                className="w-[200px]  rounded-md"
              />
              <Typography className="text-center" fontFamily={"cursive"}>
                {message?.content}
              </Typography>
              <Typography
                className="self-end !text-xs"
                onClick={() => {
                  if (user?.id === message.userId) {
                    setSelectionMode(true);
                  }
                }}
              >
                {new Date(message.createdAt).toTimeString().split(" ")[0]}
              </Typography>
            </Box>
          ) : (
            <Box className="flex flex-col justify-center items-center gap-2">
              <Typography className="text-center" fontFamily={"cursive"}>
                {message?.content}
              </Typography>

              <Typography
                className="self-end !text-xs"
                onClick={() => {
                  if (user?.id === message.userId) {
                    setSelectionMode(true);
                  }
                }}
              >
                {new Date(message.createdAt).toTimeString().split(" ")[0]}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {message.userId == user?.id && (
        <MessageActions isOpen={IsOpen} message={message} />
      )}
    </MotionBox>
  );
};

export default Message;
