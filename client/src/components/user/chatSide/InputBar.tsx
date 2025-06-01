import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../../../lib/io";
import { useEffect, useState } from "react";
import SelectedFile from "./SelectedFile";
import { getUrl } from "../../../utils/getUrl";
import SelectedMessage from "./SelectedMessage";
import useSelectedMessageStore from "@/stores/useSelectedMessageStore";
import UploadButton from "./Buttons/UploadButton";
const InputBar = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");

  const { selectedMessage, setSelectedMessage, setIsOn } =
    useSelectedMessageStore((store) => store);
  async function sendMessage() {
    if (selectedMessage?.id) {
      socket.emit("editMessage", { id: selectedMessage.id, content: message });
      setMessage("");
      setIsOn(false);
      setSelectedMessage(null);

      return;
    }
    if (file && url) {
      socket.emit("message", {
        message,
        url,
        type: "file",
      });
      setMessage("");
      setFile(undefined);
      setUrl("");
      return;
    }
    if (!message) return;
    socket.emit("message", { message, type: "text" });
    setMessage("");
  }
  useEffect(() => {
    setMessage(selectedMessage?.content || "");
  }, [selectedMessage]);
  return (
    <>
      <SelectedFile setUrl={setUrl} url={url} alt={file?.name} />
      <SelectedMessage />
      <Box className="flex items-center gap-4 bg-stone-900 p-2">
        <TextField
          className="w-full bg-white rounded-md "
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          value={message}
        />
        <Box className="flex gap-2">
          <UploadButton
            onChange={async (e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
                setUrl(await getUrl(e.target.files[0]));
              }
            }}
          />
          <Button
            className="hover:scale-105"
            variant="contained"
            onClick={sendMessage}
          >
            <SendIcon className="!text-white" />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default InputBar;
