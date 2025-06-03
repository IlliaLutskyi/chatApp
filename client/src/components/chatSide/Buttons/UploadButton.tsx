import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

type props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const UploadButton = ({ onChange }: props) => {
  return (
    <>
      <label htmlFor="file">
        <Button component="span" variant="contained">
          <UploadFileIcon />
        </Button>
      </label>
      <input type="file" id="file" className="hidden" onChange={onChange} />;
    </>
  );
};

export default UploadButton;
