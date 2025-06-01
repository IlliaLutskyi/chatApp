import { Box, Button, Typography } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../../common/Input";
import useUserStore from "../../../stores/useUserStore";
import { useForm } from "react-hook-form";
import useGroupSideMenuStore from "../../../stores/useGroupSideMenuStore";
import { toast } from "sonner";
import axios from "axios";
import BackButton from "../../common/BackButton";

const MotionBox = motion(Box);

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
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
  phone_number: z.string().min(1, "Phone number is required"),
});

type user = z.infer<typeof UserSchema>;

const EditProfile = () => {
  const { register, handleSubmit, formState, setValue } = useForm<user>({
    resolver: zodResolver(UserSchema),
  });

  const user = useUserStore((store) => store.user);

  const query = useQueryClient();

  const setCurrentOption = useGroupSideMenuStore(
    (store) => store.setCurrentOption
  );

  const mutation = useMutation({
    async mutationFn(u: user) {
      const formData = new FormData();
      formData.append("name", u.name);
      formData.append("phone_number", u.phone_number);
      if (u.image) formData.append("image", u.image);
      const data = await api.patch("/users/editProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return data.data.message as string;
    },
    onError(err) {
      if (axios.isAxiosError(err))
        return toast.error(err.response?.data.message);
    },

    async onSuccess() {
      await query.invalidateQueries({ queryKey: ["user"], exact: true });
      toast.success("Profile edited successfully");
      return setCurrentOption("profile");
    },
  });

  function onSubmit(user: user) {
    mutation.mutate(user);
  }

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <Box className="flex gap-4 justify-between sm:gap-4 m-2">
          <Box className="flex gap-4 items-center">
            <BackButton onClick={() => setCurrentOption("profile")} />
            <Typography className="!text-white !text-lg">
              Edit profile
            </Typography>
          </Box>
        </Box>
        <form
          className="flex flex-col gap-2 m-4"
          encType="multipart/form-data"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Name"
            field="name"
            register={register}
            defaultValue={user?.name}
            labelClassName="!text-xs !text-white"
            error={formState.errors.name?.message}
            className="bg-white text-black p-2"
          />
          <Input
            label="Phone number"
            field="phone_number"
            register={register}
            labelClassName="!text-xs !text-white"
            defaultValue={user?.phoneNumber}
            error={formState.errors.phone_number?.message}
            className="bg-white text-black p-2"
          />
          <Input
            label="Image"
            type="file"
            labelClassName="!text-xs !text-white"
            className="bg-white text-black p-2"
            onChange={(e) => setValue("image", e.target.files![0])}
            error={formState.errors.image?.message}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
            className="self-end"
          >
            Save edits
          </Button>
        </form>
      </MotionBox>
    </AnimatePresence>
  );
};

export default EditProfile;
