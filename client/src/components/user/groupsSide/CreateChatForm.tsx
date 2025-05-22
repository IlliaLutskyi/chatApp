import { Box, Button, Typography } from "@mui/material";
import BackButton from "./Buttons/BackButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Input from "../../common/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import useGroupSideMenuStore from "../../../stores/useGroupSideMenuStore";
import { AnimatePresence, motion } from "framer-motion";
const MotionBox = motion(Box);
const GroupSchema = z.object({
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
type group = z.infer<typeof GroupSchema>;
const CreateChatForm = () => {
  const queryClient = new QueryClient();
  const { register, handleSubmit, formState, setValue } = useForm<group>({
    resolver: zodResolver(GroupSchema),
  });
  const setCurrentOption = useGroupSideMenuStore(
    (store) => store.setCurrentOption
  );
  const mutation = useMutation({
    async mutationFn(group: group) {
      const formData = new FormData();
      formData.append("title", group.title);
      if (group.image) formData.append("image", group.image);
      const data = await api.post("/chats/createChat", formData, {
        withCredentials: true,
      });
      return data.data.message as string;
    },
    async onSuccess() {
      await queryClient.refetchQueries({
        queryKey: ["groups"],
      });
      return setCurrentOption("default");
    },
    onError(err) {
      alert(err);
    },
  });
  async function onSubmit(group: group) {
    mutation.mutate(group);
  }
  return (
    <AnimatePresence>
      <MotionBox
        key={"createChat"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-rows-[auto] gap-2"
      >
        <Box className="flex  justify-between sm:gap-4 m-2">
          <Box className="flex gap-4 items-center">
            <BackButton toOption="default" />
            <Typography className="!text-white !text-lg">
              Create group
            </Typography>
          </Box>
        </Box>
        <Box>
          <form
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 m-4"
          >
            <Input
              field="title"
              register={register}
              label="Group name"
              labelClassName="!text-xs !text-white"
              placeholder="Group name"
              error={formState.errors.title?.message}
              className="bg-white text-black p-2"
            />
            <Input
              field="image"
              label="Group image"
              labelClassName="!text-xs !text-white"
              onChange={(e) => {
                setValue("image", e.target.files![0]);
              }}
              type="file"
              className="bg-white text-black p-2"
            />
            <Button
              type="submit"
              variant="contained"
              className="self-end"
              disabled={mutation.isPending}
            >
              Create
            </Button>
          </form>
        </Box>
      </MotionBox>
    </AnimatePresence>
  );
};

export default CreateChatForm;
