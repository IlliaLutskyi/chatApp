import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../common/Input";
import { useForm } from "react-hook-form";
import { Chat } from "../../types/Chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router";
import BackButton from "../common/BackButton";
import { toast } from "sonner";
import useChatSideMenuStore from "@/stores/useChatSideMenuStore";

const chatSchema = z.object({
  title: z.string().min(1, "Group name is required"),
  image: z
    .instanceof(File)
    .refine(
      (file) =>
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/webp",
      "Only .png, .jpg, .jpeg and .webp formats allowed."
    )
    .optional(),
});
type formData = z.infer<typeof chatSchema>;
type props = {
  chat: Chat | undefined;
};

const EditChat = ({ chat }: props) => {
  const setCurrentOption = useChatSideMenuStore(
    (store) => store.setCurrentOption
  );
  const { register, handleSubmit, formState, setValue } = useForm<formData>({
    resolver: zodResolver(chatSchema),
  });
  const [searchParams] = useSearchParams();
  const query = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (edits: formData) => {
      const formData = new FormData();
      formData.append("title", edits.title);
      formData.append("chatId", searchParams.get("chat")!);
      if (edits.image) formData.append("image", edits.image);
      const data = await api.patch("/chats/editChat", formData, {
        withCredentials: true,
      });
      return data.data.message as string;
    },
    async onSuccess() {
      await query.invalidateQueries({
        queryKey: ["chat", searchParams.get("chat")],
      });
      await query.invalidateQueries({ queryKey: ["chats"] });
      return toast.success("Group edited successfully");
    },
    onError(err) {
      if (axios.isAxiosError(err))
        return toast.error(err.response?.data.message);
    },
  });
  function onSubmit(edits: formData) {
    mutation.mutate(edits);
  }
  return (
    <Box className="flex flex-col ">
      <Box className="my-2">
        <BackButton onClick={() => setCurrentOption("default")} />
      </Box>
      <form
        className="flex flex-col gap-2 mx-4"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          field="title"
          id="title"
          label="group name"
          labelClassName="!text-xs !text-white"
          register={register}
          error={formState.errors.title?.message}
          defaultValue={chat?.title}
          className="bg-white text-black "
        />
        <Input
          label="group image"
          id="image"
          type="file"
          labelClassName="!text-xs !text-white"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue("image", file);
            }
          }}
          className="bg-white text-black "
          error={formState.errors.image?.message}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={mutation.isPending}
          className="self-end"
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default EditChat;
