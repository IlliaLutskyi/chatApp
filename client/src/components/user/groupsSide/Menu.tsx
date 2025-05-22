import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

import useGroupSideMenuStore from "../../../stores/useGroupSideMenuStore";
import useUserStore from "../../../stores/useUserStore";
const ProfileMenu = () => {
  const user = useUserStore((store) => store.user);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [open, setOpen] = useState(false);
  const setCurrentOption = useGroupSideMenuStore(
    (store) => store.setCurrentOption
  );

  return (
    <>
      <Box>
        <Button
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(e.currentTarget);
            setOpen(true);
          }}
          sx={{ color: "white" }}
        >
          <SettingsIcon />
        </Button>
      </Box>
      <Menu
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        className="flex flex-col gap-2"
        onClose={() => {
          setOpen(false);
          setAnchorEl(undefined);
        }}
      >
        <MenuItem className="flex gap-8 !m-2 ">
          <Avatar src={user?.image ? user.image : ""} />
          <Typography className="!font-bold !text-lg">{user?.name}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setCurrentOption("profile")}>
          <Typography className="!mx-auto">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => setCurrentOption("create_group")}>
          <Typography className="!mx-auto">Create new group</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
