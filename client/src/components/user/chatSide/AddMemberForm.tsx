import { useForm } from "react-hook-form";
import useAddMemberStore from "../../../stores/useAddMemberStore";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import Input from "../../common/Input";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

const FormSchema = z.object({
  phone_number: z.string().min(1, "Phone number is required"),
});
type Form = z.infer<typeof FormSchema>;

const AddMemberForm = () => {
  const { handleSubmit, register, formState } = useForm<Form>({
    resolver: zodResolver(FormSchema),
  });
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const toggle = useAddMemberStore((store) => store.toggle);
  const mutation = useMutation({
    async mutationFn(formData: Form) {
      const data = await api.patch(
        "/chats/addMember",
        { ...formData, chat_id: searchParams.get("chat") },
        {
          withCredentials: true,
        }
      );
      return data.data.message as string;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["chatMembers", searchParams.get("chat")],
      });
      toast.success("Member added successfully");
      return toggle(false);
    },
    onError(err) {
      if (axios.isAxiosError(err))
        return toast.error(err.response?.data.message);
    },
  });
  const FormRef = useRef<HTMLFormElement>(null);
  const isOpen = useAddMemberStore((store) => store.isOpen);
  function hadnleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (target.id === "anchor") return;
    if (!FormRef.current?.contains(target)) return toggle(false);
  }
  useEffect(() => {
    document.addEventListener("click", hadnleClickOutside);
    return () => {
      document.removeEventListener("click", hadnleClickOutside);
    };
  }, []);
  function onSubmit(data: Form) {
    mutation.mutate(data);
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.form
          key="form"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] p-8 w-1/3 bg-white rounded-lg z-10"
          ref={FormRef}
        >
          <Typography className="!font-bold !text-xl text-center mb-2">
            Invite member
          </Typography>

          <Input
            register={register}
            field="phone_number"
            className="bg-black !text-white "
            placeholder="Enter friend's phone number"
            error={formState.errors.phone_number?.message}
          />
          <Button
            type="submit"
            variant="contained"
            className="self-end hover:scale-105"
          >
            Add
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default AddMemberForm;
