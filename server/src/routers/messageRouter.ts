import { uploader } from "@/lib/uploader";
import sendFile from "@/services/message/sendFile";
import express from "express";
import passport from "passport";
const messageRouter = express.Router();
messageRouter.patch(
  "/sendFile",
  passport.authenticate("jwt", { session: false }),
  uploader.single("file"),
  sendFile
);
export default messageRouter;
