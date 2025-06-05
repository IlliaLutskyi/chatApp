import prisma from "@/lib/db";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ["profile", "email"],
    callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, cb) => {
    const emails = profile.emails;
    const name = profile.displayName;
    const image = profile.photos ? profile.photos[0].value : null;
    try {
        if (!emails)
            return cb(null, false, { message: "Could not extract email" });
        const existingUser = await prisma.user.update({
            where: {
                email: emails[0].value,
            },
            data: {
                image,
            },
        });
        if (!existingUser) {
            const user = await prisma.user.create({
                data: {
                    name,
                    email: emails[0].value,
                    image,
                    phoneNumber: "",
                },
            });
            return cb(null, user);
        }
        cb(null, existingUser);
    }
    catch (err) {
        cb(err, false);
    }
}));
