import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useUserStore from "../../../stores/useUserStore";
import { Message as TMessage } from "../../../types/Message";
import OptimizedImage from "../../common/OptimizedImage";
import useSelectionModeStore from "../../../stores/useSelectionModeStore";

const MotionBox = motion(Box);
type props = {
  message: TMessage;
};
const Message = ({ message }: props) => {
  const user = useUserStore((state) => state.user);
  const setSelectionMode = useSelectionModeStore((store) => store.setIsOn);
  return (
    <MotionBox
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      key={message.id}
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
    </MotionBox>
  );
};

export default Message;
