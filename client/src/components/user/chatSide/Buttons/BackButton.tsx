import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useChatSideMenuStore from "../../../../stores/useChatSideMenuStore";
type props = {
  option: string;
};
const BackButton = ({ option }: props) => {
  const setCurrentOption = useChatSideMenuStore(
    (store) => store.setCurrentOption
  );
  return (
    <Button variant="text" onClick={() => setCurrentOption(option)}>
      <ArrowBackIcon />
    </Button>
  );
};

export default BackButton;
