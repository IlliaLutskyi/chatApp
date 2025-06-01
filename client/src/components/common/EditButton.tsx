import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
type props = {
  onClick?: () => void;
};

const EditButton = ({ onClick = () => {} }: props) => {
  return (
    <Button onClick={onClick}>
      <EditIcon className="!text-white" />
    </Button>
  );
};

export default EditButton;
