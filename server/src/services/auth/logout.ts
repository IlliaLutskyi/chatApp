import { Request, Response } from "express";

function logout(req: Request, res: Response) {
  res
    .clearCookie("token", { httpOnly: true })
    .json({ message: "You was logged out successfully" });
  return;
}
export default logout;
