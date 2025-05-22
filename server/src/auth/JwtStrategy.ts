import prisma from "@/lib/db";
import { Request } from "express";
import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
  StrategyOptions,
} from "passport-jwt";

type JwtPayload = {
  id: number;
};
type User = {
  id: number;
};
const cookieExtractor = (req: Request) => {
  const token = req.cookies.token;
  return token;
};
const opts: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET as string,
};
passport.use(
  new JwtStrategy(
    opts,
    async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: jwt_payload.id,
          },
          select: {
            name: true,
            email: true,
            image: true,
            password: false,
            phoneNumber: true,
            createdAt: true,
            id: true,
            updatedAt: true,
          },
        });
        if (!user)
          return done(null, false, { message: "You need to sign up first" });
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
