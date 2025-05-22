import { Box, Typography } from "@mui/material";
import { Chat } from "../../../types/Chat";
import OptimizedImage from "../../common/OptimizedImage";
import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { useSearchParams } from "react-router";
type props = {
  chats: Chat[];
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};
const Hints = ({ chats, keyword, setKeyword }: props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [_searchParams, setSearchParams] = useSearchParams();
  const mutation = useMutation({
    mutationFn: async (chatId: number) => {
      const data = await api.patch(`/chats/goToChat/${chatId}`, null, {
        withCredentials: true,
      });
      return data.data.message as string;
    },
    onSuccess: async (_data, chatId: number) => {
      setSearchParams({ chat: String(chatId) });
      await queryClient.invalidateQueries({ queryKey: ["chats"] });
      return;
    },
  });
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (containerRef.current && !containerRef.current.contains(target)) {
      containerRef.current.style.display = "none";
    }
    return;
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  if (keyword === "") return <></>;
  return (
    <Box
      className="absolute w-full flex flex-col gap-2 bg-white p-4"
      ref={containerRef}
    >
      {chats.map((chat) => (
        <Box
          key={chat.id}
          className="flex  gap-4 items-center z-40 hover:bg-black/40 p-2 duration-200 rounded-xs"
          onClick={() => {
            mutation.mutate(chat.id);
            setKeyword("");
          }}
        >
          <OptimizedImage
            path={chat.image || ""}
            alt={chat.title || ""}
            className="w-8 h-8 rounded-full"
          />
          <Typography>{chat.title}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Hints;
