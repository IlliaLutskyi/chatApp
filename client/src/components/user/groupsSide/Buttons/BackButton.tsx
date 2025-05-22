import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useGroupSideMenuStore from "../../../../stores/useGroupSideMenuStore";
type props = {
  toOption: string;
};
const BackButton = ({ toOption }: props) => {
  const setCurrentOption = useGroupSideMenuStore(
    (store) => store.setCurrentOption
  );
  return (
    <Button onClick={() => setCurrentOption(toOption)}>
      <ArrowBackIcon />
    </Button>
  );
};

export default BackButton;
