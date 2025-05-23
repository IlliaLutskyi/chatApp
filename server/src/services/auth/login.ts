import prisma from "@/lib/db";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { issueToken } from "@/utils/issueToken";
async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res
        .status(404)
        .json({ message: "User was not found, you need to sign up first" });
      return;
    }
    if (!user.password) {
      res.status(400).json({
        message:
          "Your email is linked to another provider(like google or github)",
      });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({
        message: "Password is incorrect",
      });
      return;
    }
    const token = await issueToken(user.id);

    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 10,
        httpOnly: true,
      })
      .json({ message: "You are logged in" });
    return;
  } catch (err) {
    res.status(500).json({
      message: "Server faild to log you in",
    });
    return;
  }
}

export default login;
