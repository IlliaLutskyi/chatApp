import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import useChatSettingsStore from "../../stores/useChatSettingsStore";
type props = {
  onClick?: () => void;
};
const CloseButton = ({ onClick = () => {} }: props) => {
  return (
    <Button onClick={onClick} className="self-start">
      <ArrowBackIcon />
    </Button>
  );
};

export default CloseButton;
