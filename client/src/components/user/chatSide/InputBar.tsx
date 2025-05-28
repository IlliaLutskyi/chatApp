import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../../../lib/io";
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SelectedFile from "./SelectedFile";
import { getUrl } from "../../../utils/getUrl";
const InputBar = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");

  async function sendMessage() {
    if (file && url) {
      socket.emit("message", {
        message,
        url,
        type: "file",
      });
      setMessage("");
      setFile(undefined);
      setUrl("");
    } else {
      if (!message) return;
      socket.emit("message", { message, type: "text" });
      setMessage("");
    }
  }
  return (
    <>
      <SelectedFile setUrl={setUrl} url={url} alt={file?.name} />
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
          <Box>
            <label htmlFor="file">
              <Button component="span" variant="contained">
                <UploadFileIcon />
              </Button>
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={async (e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                  setUrl(await getUrl(e.target.files[0]));
                }
              }}
            />
          </Box>
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
