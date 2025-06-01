import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import useSelectedMessageStore from "../../../stores/useSelectedMessageStore";

const MotionBox = motion(Box);
const SelectedMessage = () => {
  const { selectedMessage, setSelectedMessage, setIsOn, isOn } =
    useSelectedMessageStore((store) => store);

  return (
    <AnimatePresence>
      {isOn && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-4 items-center justify-between p-1 bg-stone-900 mx-4 my-2 rounded-lg"
        >
          <Typography className="!text-white">
            {selectedMessage?.content}
          </Typography>
          <Button
            variant="text"
            onClick={() => {
              setIsOn(false);
              setSelectedMessage(null);
            }}
          >
            <CloseIcon />
          </Button>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default SelectedMessage;
