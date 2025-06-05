import prisma from "@/lib/db";
import passport from "passport";
import { Strategy as JwtStrategy, } from "passport-jwt";
const cookieExtractor = (req) => {
    const token = req.cookies.token;
    return token;
};
const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
};
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
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
    }
    catch (err) {
        return done(err, false);
    }
}));
