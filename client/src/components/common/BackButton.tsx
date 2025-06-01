import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useChatSideMenuStore from "../../stores/useChatSideMenuStore";
type props = {
  onClick?: () => void;
};
const BackButton = ({ onClick = () => {} }: props) => {
  return (
    <Button variant="text" onClick={onClick}>
      <ArrowBackIcon />
    </Button>
  );
};

export default BackButton;
