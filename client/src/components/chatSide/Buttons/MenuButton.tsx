import { Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useChatSideMenuStore from "../../../stores/useChatSideMenuStore";
const MenuButton = () => {
  const { setCurrentOption, toggle: openMenu } = useChatSideMenuStore(
    (store) => store
  );

  return (
    <Button
      className="!text-white"
      onClick={() => {
        openMenu(true);
        setCurrentOption("default");
      }}
    >
      <MoreVertIcon />
    </Button>
  );
};

export default MenuButton;
