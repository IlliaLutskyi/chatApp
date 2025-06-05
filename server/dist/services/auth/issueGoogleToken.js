import { issueToken } from "@/utils/issueToken";
async function issueGoogleToken(req, res) {
    const userId = req.user && "id" in req.user ? req.user.id : null;
    try {
        if (!userId) {
            res.status(404).json({ message: "User was not found" });
            return;
        }
        const token = await issueToken(userId);
        res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 60 * 24 * 10,
        });
        res.redirect(`${process.env.FRONT_END_ORIGIN}/`);
        return;
    }
    catch (err) {
        res.status(500).json({
            message: "Could not generate jwt token",
        });
        return;
    }
}
export default issueGoogleToken;
