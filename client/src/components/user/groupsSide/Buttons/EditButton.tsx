import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useGroupSideMenuStore from "../../../../stores/useGroupSideMenuStore";

const EditButton = () => {
  const setCurrentOption = useGroupSideMenuStore(
    (store) => store.setCurrentOption
  );
  return (
    <Button onClick={() => setCurrentOption("edit_profile")}>
      <EditIcon className="!text-white" />
    </Button>
  );
};

export default EditButton;
