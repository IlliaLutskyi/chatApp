import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BackspaceIcon from "@mui/icons-material/Backspace";
import useSelectionModeStore from "../../../stores/useSelectionModeStore";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { toast } from "sonner";
import axios from "axios";

const SelectionModeBar = () => {
  const { setIsOn, isOn, setSelectedMessages, selectedMessages } =
    useSelectionModeStore((state) => state);
  const mutation = useMutation({
    mutationFn: async (messages: number[]) => {
      const data = await api.patch("/messages/deleteMessages", messages, {
        withCredentials: true,
      });
      return data.data.message as string;
    },
    onSuccess: () => {
      setIsOn(false);
      setSelectedMessages([]);
      return toast.success("Messages deleted");
    },
    onError: (err) => {
      if (axios.isAxiosError(err))
        return toast.error(err.response?.data.message);
    },
  });
  function handleDelete() {
    mutation.mutate(selectedMessages);
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
