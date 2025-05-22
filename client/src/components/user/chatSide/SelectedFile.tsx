import { Box, Button } from "@mui/material";
import OptimizedImage from "../../common/OptimizedImage";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
const MotionBox = motion(Box);
type props = {
  url: string;

  alt: string | undefined;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};
const SelectedFile = ({ url, alt, setUrl }: props) => {
  return (
    <AnimatePresence>
      {url && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-4 items-center justify-between bg-stone-900 mx-4 my-2 rounded-lg"
        >
          <OptimizedImage
            path={url}
            alt={alt ? alt : ""}
            className="w-[100px] h-[50px] rounded-lg "
          />
          <Button variant="text" onClick={() => setUrl("")}>
            <CloseIcon />
          </Button>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default SelectedFile;
