import { Box, Typography } from "@mui/material";
import { Message } from "../../../types/Message";
import { socket } from "../../../lib/io";
import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import useUserStore from "../../../stores/useUserStore";
import OptimizedImage from "../../common/OptimizedImage";
const MotionBox = motion(Box);
const Messages = () => {
  const [messages, setMessages] = useState<Message[]>();
  const [searchParams] = useSearchParams();
  const scrollToRef = useRef<HTMLDivElement>(null);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const getMessages = (messages: Message[]) => {
      setMessages(messages);
      if (scrollToRef.current) {
        setTimeout(() => {
          scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };
    socket.emit("chatId", searchParams.get("chat"));
    socket.on("message", getMessages);
    return () => {
      socket.off("message", getMessages);
    };
  }, [searchParams]);

  return (
    <Box
      className="flex flex-col gap-4 p-10 overflow-y-auto h-[400px] flex-grow-1  !text-9xl"
      id="scrollBar"
    >
      {messages?.map((message) => (
        <MotionBox
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`${
            message.userId === user?.id ? "self-end  " : "self-start"
          } flex gap-3 items-center`}
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
                </Box>
              ) : (
                <Typography className="text-center" fontFamily={"cursive"}>
                  {message?.content}
                </Typography>
              )}
            </Box>
          </Box>
        </MotionBox>
      ))}
      <div ref={scrollToRef}></div>
    </Box>
  );
};

export default Messages;
