import { Avatar, Box, Typography } from "@mui/material";
import { Chat } from "../../../types/Chat";

import AddMemberForm from "./AddMemberForm";

import AddMemberButton from "./Buttons/AddMemberButton";
import MenuButton from "./Buttons/MenuButton";
type props = {
  chat: Chat | undefined;
};
const ChatNav = ({ chat }: props) => {
  if (!chat) return <></>;
  return (
    <Box className="flex justify-between bg-stone-900 p-2">
      <Box className="flex gap-4 items-center">
        <Avatar src={chat.image ? chat.image : ""}>
          {chat.title.slice(0, 3)}
        </Avatar>
        <Typography className="!text-white !text-lg">{chat.title}</Typography>
      </Box>
      <Box className="flex gap-4 items-center">
        <AddMemberButton />
        <MenuButton />
      </Box>
      <AddMemberForm />
    </Box>
  );
};

export default ChatNav;
