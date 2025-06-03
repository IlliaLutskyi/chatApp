import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { useSearchParams } from "react-router";

const LeaveChatButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await api.patch(`/chats/leaveChat/${searchParams.get("chat")}`, null, {
        withCredentials: true,
      });
      return;
    },
    async onSuccess() {
      await query.invalidateQueries({ queryKey: ["chats"] });
      return setSearchParams({ chat: "" });
    },
  });
  return (
    <Button
      startIcon={<LogoutIcon />}
      variant="outlined"
      color="error"
      className="self-center !mt-auto"
      onClick={() => mutation.mutate()}
    >
      Leave chat
    </Button>
  );
};

export default LeaveChatButton;
