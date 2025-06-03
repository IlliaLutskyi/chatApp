import { Box, Button, Typography } from "@mui/material";
import Input from "../components/common/Input";
import GoogleIcon from "@mui/icons-material/Google";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import axios from "axios";
import { toast } from "sonner";

const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
});
type User = z.infer<typeof UserSchema>;

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const mutation = useMutation({
    async mutationFn(user: User) {
      const data = await api.post("/login", user, {
        withCredentials: true,
      });
      return data.data.message as string;
    },
    onSuccess() {
      toast.success("Login successful");
      return navigate("/", { replace: true });
    },
    onError(err) {
      if (axios.isAxiosError(err)) {
        return toast.error(err.response?.data.message);
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
      className="w-[300px] mx-auto my-[5rem] flex flex-col gap-4"
    >
      <Typography sx={{ fontSize: "2rem", textAlign: "center" }}>
        Log in
      </Typography>
      <Input
        register={register}
        id="email"
        label="Email"
        field={"email"}
        placeholder="email"
        sx={{ color: "black" }}
        labelClassName="!text-xs"
        error={formState.errors.email?.message}
        className="bg-white !text-black shadow-lg w-full"
      />
      <Input
        register={register}
        id="password"
        field={"password"}
        label="Password"
        labelClassName="!text-xs"
        placeholder="password"
        type="password"
        error={formState.errors.password?.message}
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
          Still does not have an account{" "}
          <Link to="/signup" className="text-blue-300">
            sign up
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

export default Login;
