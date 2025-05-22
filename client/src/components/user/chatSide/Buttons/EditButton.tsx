import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useChatSideMenuStore from "../../../../stores/useChatSideMenuStore";

const EditButton = () => {
  const setCurrentOption = useChatSideMenuStore(
    (store) => store.setCurrentOption
  );
  return (
    <Button onClick={() => setCurrentOption("edit_chat")}>
      <EditIcon className="!text-white" />
    </Button>
  );
};

export default EditButton;
