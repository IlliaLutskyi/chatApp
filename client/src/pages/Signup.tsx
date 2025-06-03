import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/common/Input";
import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import { toast } from "sonner";

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password has to contain at least 6 characters"),
  phone_number: z.string().min(1, "Phone number is required"),
});
type User = z.infer<typeof UserSchema>;

const Signup = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const mutation = useMutation({
    async mutationFn(user: User) {
      const data = await api.post("/signup", user);
      return data.data.message as string;
    },
    onSuccess() {
      toast.success("Signup successful");
      return navigate("/login");
    },
    onError(err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    },
  });

  async function onSubmit(user: User) {
    mutation.mutate(user);
  }

  return (
    <form
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="w-[300px] mx-auto my-[2rem] flex flex-col gap-4"
    >
      <Typography sx={{ fontSize: "2rem", textAlign: "center" }}>
        Sign up
      </Typography>

      <Input
        register={register}
        id="name"
        field={"name"}
        label="Name"
        placeholder="name"
        labelClassName="!text-xs"
        error={formState.errors.name?.message}
        className="bg-white shadow-lg w-full"
      />
      <Input
        register={register}
        id="email"
        field={"email"}
        label="Email"
        placeholder="email"
        labelClassName="!text-xs"
        error={formState.errors.email?.message}
        className="bg-white shadow-lg w-full"
      />
      <Input
        register={register}
        id="password"
        field={"password"}
        type="password"
        label="Password"
        labelClassName="!text-xs"
        placeholder="password"
        error={formState.errors.password?.message}
        className="bg-white shadow-lg w-full"
      />
      <Input
        register={register}
        id="phone_number"
        field={"phone_number"}
        label="Phone number"
        labelClassName="!text-xs"
        placeholder="phone number"
        error={formState.errors.phone_number?.message}
        className="bg-white shadow-lg w-full"
      />
      <Button
        variant="contained"
        type="submit"
        className="self-end"
        disabled={mutation.isPending}
      >
        Submit
      </Button>
      <Box>
        <Typography sx={{ textAlign: "center", fontSize: "0.9rem" }}>
          Already have an account{" "}
          <Link to="/login" className="text-blue-300">
            login
          </Link>
        </Typography>
      </Box>
      <Box className="relative border-t-[1px] border-black pt-4 flex flex-col justify-center">
        <Typography className="absolute top-[-20px] left-1/2 bg-white p-2 translate-x-[-50%]">
          or
        </Typography>
        <Button
          variant="contained"
          className="m-4"
          disabled={mutation.isPending}
          startIcon={<GoogleIcon />}
          onClick={() => {
            window.location.href = "http://localhost:3000/auth/google";
          }}
        >
          Sign up with google
        </Button>
      </Box>
    </form>
  );
};

export default Signup;
