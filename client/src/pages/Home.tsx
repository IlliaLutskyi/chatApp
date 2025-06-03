import { Box } from "@mui/material";
import GroupsSide from "../components/groupsSide/GroupsSide";
import ChatSide from "../components/chatSide/ChatSide";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { User } from "../types/User";
import useUserStore from "../stores/useUserStore";
import { useEffect } from "react";
const Home = () => {
  const setUser = useUserStore((store) => store.setUser);
  const { data, isSuccess } = useQuery({
    queryFn: async () => {
      const data = await api.get(`/users/getProfile`, {
        withCredentials: true,
      });
      return data.data.user as User;
    },
    queryKey: ["user"],
  });
  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
  }, [data, isSuccess]);
  return (
    <Box className="relative grid sm:grid-cols-[1fr_2fr_auto] grid-cols-[1fr_1fr_auto] w-screen h-screen bg-[url('/images/bg1.jpg')]">
      <GroupsSide />
      <ChatSide />
    </Box>
  );
};

export default Home;
