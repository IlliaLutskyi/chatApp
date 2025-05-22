import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../../../lib/api";
import { Chat } from "../../../types/Chat";
import Hints from "./Hints";
import CloseIcon from "@mui/icons-material/Close";
const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const { data, isSuccess } = useQuery({
    queryFn: async ({ signal }) => {
      const data = await api.get(
        `/chats/searchChat?keyword=${keyword}&limit=5`,
        {
          withCredentials: true,
          signal,
        }
      );

      return data.data as { message: string; chats: Chat[] };
    },
    queryKey: ["search", keyword],
  });

  return (
    <Box className="relative">
      <FormControl variant="outlined" className="w-full">
        <OutlinedInput
          id="search"
          sx={{ color: "white", bgcolor: "black", borderRadius: "1rem" }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon className="text-white" />
            </InputAdornment>
          }
          endAdornment={
            keyword && (
              <InputAdornment position="end">
                <CloseIcon className="text-white " />
              </InputAdornment>
            )
          }
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for a group or a person"
        />
      </FormControl>
      {isSuccess && (
        <Hints chats={data.chats} keyword={keyword} setKeyword={setKeyword} />
      )}
    </Box>
  );
};

export default SearchBox;
