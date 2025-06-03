import { Avatar, Box, Typography } from "@mui/material";
import ProfileMenu from "./Menu";
import SearchBox from "./SearchBox";
import { useQuery } from "@tanstack/react-query";
import { Chat } from "../../types/Chat";
import { api } from "../../lib/api";
import { useSearchParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
const MotionBox = motion.create(Box);
const Groups = () => {
  const { data } = useQuery({
    queryFn: async () => {
      const data = await api.get(`/chats/getChats`, {
        withCredentials: true,
      });
      return data.data.chats as Chat[];
    },
    queryKey: ["chats"],
  });
  return (
    <AnimatePresence>
      <MotionBox
        key={"groups"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="flex gap-2 items-center m-2">
          <ProfileMenu />
          <SearchBox />
        </Box>
        <Box
          className="overflow-y-auto] flex flex-col gap-2 m-5"
          id="scrollBar"
        >
          {data?.map((group) => (
            <Group chat={group} />
          ))}
        </Box>
      </MotionBox>
    </AnimatePresence>
  );
};

type props = {
  chat: Chat;
};
const Group = ({ chat }: props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Box
      className={`flex items-center gap-5 p-2 rounded-2xl shadow-2xs hover:scale-105 ${
        searchParams.get("chat") === String(chat.id)
          ? "bg-white bg-opacity-50 !text-black"
          : "hover:bg-white hover:bg-opacity-50 hover:text-black"
      }  duration-400 text-white`}
      key={chat.id}
      onClick={() => setSearchParams({ chat: String(chat.id) })}
    >
      <Avatar src={chat.image ? chat.image : ""}>
        {chat.title.slice(0, 1)}
      </Avatar>
      <Typography>{chat.title}</Typography>
    </Box>
  );
};
export default Groups;
