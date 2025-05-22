import { Button } from "@mui/material";
import useAddMemberStore from "../../../../stores/useAddMemberStore";
import AddIcon from "@mui/icons-material/Add";

const AddMemberButton = () => {
  const toggle = useAddMemberStore((store) => store.toggle);

  return (
    <Button
      variant="text"
      className="!rounded-lg !text-sm"
      onClick={() => toggle(true)}
      id="anchor"
    >
      <AddIcon /> add member
    </Button>
  );
};

export default AddMemberButton;
