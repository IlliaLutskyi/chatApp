import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async () => {
      await api.post("/logout", null, { withCredentials: true });
      return;
    },
    onSuccess() {
      return navigate("/login");
    },

    mutationKey: ["logout"],
  });

  return (
    <Button
      startIcon={<LogoutIcon />}
      variant="outlined"
      color="error"
      size="small"
      onClick={() => {
        mutation.mutate();
      }}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
