import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import LogoutButton from "../auth/LogoutButton";
import PhoneIcon from "@mui/icons-material/Phone";
import useUserStore from "../../stores/useUserStore";
import EditButton from "../common/EditButton";
import useGroupSideMenuStore from "@/stores/useGroupSideMenuStore";
import BackButton from "../common/BackButton";

const MotionBox = motion.create(Box);
const Profile = () => {
  const user = useUserStore((store) => store.user);
  const setCurrentOption = useGroupSideMenuStore(
    (store) => store.setCurrentOption
  );
  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-rows-[auto] "
      >
        <Box className="flex gap-2 m-2 justify-between">
          <Box className="flex gap-2 items-center">
            <BackButton onClick={() => setCurrentOption("default")} />
            <Typography className="!text-white !text-sm">Settings</Typography>
          </Box>

          <Box className="flex items-center">
            <EditButton onClick={() => setCurrentOption("edit_profile")} />
            <LogoutButton />
          </Box>
        </Box>

        <Box
          className={
            "flex flex-col items-start justify-end p-4 !text-white !text-center !bg-cover !bg-center !bg-no-repeat h-[200px]"
          }
          sx={{ background: user?.image ? `url(${user.image})` : undefined }}
        >
          <Box>
            <Typography className="text-start !text-xl">
              {user?.email}
            </Typography>
            <Typography className="text-start !text-xl">
              {user?.name}
            </Typography>
          </Box>
        </Box>

        <Box className="flex gap-8 bg-white p-4">
          <PhoneIcon />
          <Typography>{user?.phoneNumber}</Typography>
        </Box>
      </MotionBox>
    </AnimatePresence>
  );
};

export default Profile;
