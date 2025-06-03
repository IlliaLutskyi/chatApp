import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BackspaceIcon from "@mui/icons-material/Backspace";
import useSelectionModeStore from "../../stores/useSelectionModeStore";
import { socket } from "@/lib/io";
import { toast } from "sonner";

const SelectionModeBar = () => {
  const { setIsOn, setSelectedMessages, selectedMessages } =
    useSelectionModeStore((state) => state);

  function handleDelete() {
    if (selectedMessages.length === 0) return;
    socket.emit("deleteMessages", selectedMessages);
    toast.success(
      `${
        selectedMessages.length > 1 ? "Messages" : "Message"
      } deleted successfully`
    );
    setIsOn(false);
    setSelectedMessages([]);
  }
  return (
    <Box className="flex gap-2 items-center w-1/2  justify-between mx-auto my-10 bg-white p-4 rounded-lg ">
      <Button
        variant="contained"
        className="hover:scale-105"
        onClick={() => {
          setIsOn(false);
          setSelectedMessages([]);
        }}
      >
        <BackspaceIcon />
      </Button>

      <Button
        variant="contained"
        color="error"
        className="hover:scale-105"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
};

export default SelectionModeBar;
