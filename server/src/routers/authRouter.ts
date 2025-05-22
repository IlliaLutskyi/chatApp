import express from "express";
import signup from "../services/auth/signup";
import login from "../services/auth/login";
import getProfile from "@/services/user/getProfile";
import passport from "passport";
import issueGoogleToken from "@/services/auth/issueGoogleToken";
import logout from "@/services/auth/logout";

const authRouter = express.Router();

authRouter.get("/auth/google", passport.authenticate("google"));
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONT_END_ORIGIN}/login`,
  }),
  issueGoogleToken
);
authRouter.get("/auth/isAuthenticated", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
    if (err || !user) {
      return res.json({ isAuthenticated: false });
    }
    res.json({ isAuthenticated: true });
  })(req, res, next);
});

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);

export default authRouter;
