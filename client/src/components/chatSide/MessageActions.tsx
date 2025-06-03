import useSelectedMessageStore from "@/stores/useSelectedMessageStore";
import { Message } from "@/types/Message";
import { Box, Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
const MotionBox = motion.create(Box);
type props = {
  isOpen: boolean;
  message: Message;
};
const MessageActions = ({ isOpen, message }: props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setSelectedMessages = useSelectedMessageStore(
    (state) => state.setSelectedMessage
  );
  const showSelectedMessage = useSelectedMessageStore((state) => state.setIsOn);
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          ref={containerRef}
          className="absolute top-0 right-0 translate-y-[-50%]  bg-black text-white  p-2 rounded-lg flex gap-2 items-center"
        >
          <Button
            variant="text"
            onClick={() => {
              setSelectedMessages(message);
              showSelectedMessage(true);
            }}
          >
            Edit
          </Button>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default MessageActions;
