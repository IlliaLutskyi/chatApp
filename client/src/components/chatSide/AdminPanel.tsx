import { Box, Switch, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [searchParams] = useSearchParams();
  const [isPrivate, setIsPrivate] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["no-cache"],
    queryFn: async () => {
      const data = await api.get(
        `/chats/isPrivate/${searchParams.get("chat")}`,
        {
          withCredentials: true,
        }
      );

      return data.data.isPrivate as boolean;
    },
    staleTime: 0,
    gcTime: 0,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const data = await api.patch(
        `/chats/togglePrivate/${searchParams.get("chat")}`,
        null,
        { withCredentials: true }
      );

      return data.data.message as string;
    },
    onError: (err) =>
      axios.isAxiosError(err) && alert(err.response?.data.message),
  });

  useEffect(() => {
    if (isSuccess) {
      setIsPrivate(data);
    }
  }, [data, isSuccess]);

  return (
    <>
      {isSuccess && (
        <Box className="flex gap-2 justify-between items-center mt-auto mx-4">
          <Typography>Private</Typography>
          <Switch
            checked={isPrivate}
            onChange={() => {
              mutation.mutate();
              setIsPrivate(!isPrivate);
            }}
          />
        </Box>
      )}
    </>
  );
};

export default AdminPanel;
