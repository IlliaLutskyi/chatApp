import { Box } from "@mui/material";

import useGroupSideMenuStore from "../../stores/useGroupSideMenuStore";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import CreateChatForm from "./CreateChatForm";
import Groups from "./Groups";

const GroupsSide = () => {
  const currentOption = useGroupSideMenuStore((store) => store.currentOption);

  return (
    <>
      <Box className="bg-stone-900 h-full">
        {currentOption === "default" && <Groups />}
        {currentOption === "profile" && <Profile />}
        {currentOption === "edit_profile" && <EditProfile />}
        {currentOption === "create_group" && <CreateChatForm />}
      </Box>
    </>
  );
};

export default GroupsSide;
