import editProfile from "@/services/user/editProfile";
import { uploader } from "@/lib/uploader";
import express from "express";
import passport from "passport";
const userRouter = express.Router();
userRouter.get("/getProfile", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.status(200).json({ user: req.user });
    return;
});
userRouter.patch("/editProfile", passport.authenticate("jwt", { session: false }), uploader.single("image"), editProfile);
export default userRouter;
