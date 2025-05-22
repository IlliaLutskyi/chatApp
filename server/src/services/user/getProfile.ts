import type { Request, Response } from "express";

async function getProfile(req: Request, res: Response) {
  const user = req.user;
  res.status(200).json({ user });
  return;
}

export default getProfile;
