import express from "express";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import userRouter from "./routers/userRouter";
import "@/auth/JwtStrategy";
import "@/auth/GoogleStrategy";
import "@/lib/cloudinary";
import chatRouter from "./routers/chatRouter";
import setupSocket from "./socket";
import messageRouter from "./routers/messageRouter";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

app.use(cors({ origin: process.env.FRONT_END_ORIGIN, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(passport.initialize());

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.use("/messages", messageRouter);

setupSocket(server);

server.listen(port, () => console.log(`Server is running on port ${port}`));
