import { Box, Typography } from "@mui/material";
import CloseButton from "../common/CloseButton";
import EditButton from "../common/EditButton";
import AdminPanel from "./AdminPanel";
import LeaveChatButton from "./Buttons/LeaveChatButton";
import { Chat } from "../../types/Chat";
import { User } from "../../types/User";
import useUserStore from "../../stores/useUserStore";
import OptimizedImage from "../common/OptimizedImage";
import useChatSideMenuStore from "@/stores/useChatSideMenuStore";

type props = {
  chat: Chat | undefined;
  members: { user: User; role: "admin" | "guest" }[] | undefined;
};
const Chat_Info = ({ chat, members }: props) => {
  const user = useUserStore((store) => store.user);
  const { setCurrentOption, toggle: closeMenu } = useChatSideMenuStore(
    (store) => store
  );
  return (
    <Box className="flex flex-col gap-2 !text-white h-full">
      <Box className="flex gap-4 items-center justify-between my-2">
        <CloseButton onClick={() => closeMenu(false)} />
        <EditButton onClick={() => setCurrentOption("edit_chat")} />
      </Box>

      <Box
        className="flex flex-col justify-end p-4 h-[200px] !bg-cover !bg-center !bg-no-repeat"
        sx={{ background: chat?.image ? `url(${chat?.image})` : "" }}
      >
        <Typography>{chat?.title}</Typography>
      </Box>

      <Box
        className="flex flex-col gap-2 overflow-y-scroll h-full mx-4 my-2"
        id="scrollBar"
      >
        <Typography className="text-center !text-xl">Members</Typography>
        <Box className="flex flex-col gap-2 ">
          {members?.map((member) => (
            <Member member={member} key={member.user.id} />
          ))}
        </Box>
      </Box>

      <Box>
        {members?.find((member) => member.user.id === user?.id)?.role ===
          "admin" && <AdminPanel />}
      </Box>

      <Box className="self-end m-4">
        <LeaveChatButton />
      </Box>
    </Box>
  );
};

const Member = ({
  member,
}: {
  member: { user: User; role: "admin" | "guest" };
}) => {
  const user = useUserStore((store) => store.user);
  return (
    <Box className="grid grid-cols-3 gap-[4rem] justify-center items-center">
      <Box className="flex gap-2 items-center ">
        <OptimizedImage
          path={member.user.image || ""}
          alt={member.user.name || ""}
          className="rounded-full w-8 h-8"
        />
        <Typography>
          {user?.id === member.user.id ? "You" : member.user.name}
        </Typography>
      </Box>
      <Box>
        <Typography
          className={`${
            member.user.status === "Online" ? "text-green-500" : "text-red-500"
          }`}
        >
          {member.user.status}
        </Typography>
      </Box>
      <Box>
        <Typography>{member.role}</Typography>
      </Box>
    </Box>
  );
};

export default Chat_Info;
