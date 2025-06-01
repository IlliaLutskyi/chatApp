import { Box, Checkbox } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { Message as TMessage } from "../../../types/Message";
import { socket } from "../../../lib/io";
import Message from "./Message";
import useSelectionModeStore from "../../../stores/useSelectionModeStore";
import SelectionModeBar from "./SelectionModeBar";
import useUserStore from "../../../stores/useUserStore";

const SelectionMode = () => {
  const [searchParams] = useSearchParams();
  const scrollToRef = useRef<HTMLDivElement>(null);
  const user = useUserStore((state) => state.user);
  const { setSelectedMessage, selectedMessages, isOn } = useSelectionModeStore(
    (state) => state
  );
  const [messages, setMessages] = useState<TMessage[]>();
  useEffect(() => {
    const getMessages = (messages: TMessage[]) => {
      setMessages(messages);
      if (scrollToRef.current) {
        scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    socket.emit("chatId", searchParams.get("chat"));
    socket.on("message", getMessages);
    return () => {
      socket.off("message", getMessages);
    };
  }, [searchParams, isOn]);
  return (
    <Box>
      <Box
        className="flex flex-col gap-4 p-10 overflow-y-auto h-[400px]"
        id="scrollBar"
      >
        {messages?.map((message) => {
          if (message.userId !== user?.id) return null;
          return (
            <Box
              className={`flex gap-3 items-center justify-between ${
                selectedMessages.includes(message.id)
                  ? "bg-white/40 rounded-4xl"
                  : ""
              }`}
              onClick={() => {
                setSelectedMessage(message.id);
              }}
            >
              <Checkbox
                checked={selectedMessages.includes(message.id)}
                color="secondary"
              />
              <Message message={message} />
            </Box>
          );
        })}
        <div ref={scrollToRef} />
      </Box>
      <SelectionModeBar />
    </Box>
  );
};

export default SelectionMode;
