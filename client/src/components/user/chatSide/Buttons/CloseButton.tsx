import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import useChatSettingsStore from "../../../../stores/useChatSettingsStore";
const CloseButton = () => {
  const toggle = useChatSettingsStore((store) => store.toggle);
  return (
    <Button onClick={() => toggle(false)} className="self-start">
      <ArrowBackIcon />
    </Button>
  );
};

export default CloseButton;
