import { Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useChatSettingsStore from "../../../../stores/useChatSettingsStore";
import useChatSideMenuStore from "../../../../stores/useChatSideMenuStore";
const MenuButton = () => {
  const toggleSettings = useChatSettingsStore((store) => store.toggle);
  const setCurrentOption = useChatSideMenuStore(
    (store) => store.setCurrentOption
  );

  return (
    <Button
      className="!text-white"
      onClick={() => {
        toggleSettings(true);
        setCurrentOption("default");
      }}
    >
      <MoreVertIcon />
    </Button>
  );
};

export default MenuButton;
