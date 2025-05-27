import { Box } from "@mui/material";
import { socket } from "../../../lib/io";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import Message from "./Message";
import { Message as TMessage } from "../../../types/Message";

const Messages = () => {
  const [messages, setMessages] = useState<TMessage[]>();
  const [searchParams] = useSearchParams();
  const scrollToRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const getMessages = (messages: TMessage[]) => {
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
      className="flex flex-col gap-4 p-10 overflow-y-auto h-[400px] grow "
      id="scrollBar"
    >
      {messages?.map((message) => (
        <Message message={message} key={message.id} />
      ))}
      <div ref={scrollToRef} />
    </Box>
  );
};

export default Messages;
