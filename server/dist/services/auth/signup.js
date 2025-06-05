import bcrypt from "bcrypt";
import prisma from "../../lib/db";
async function signup(req, res) {
    const { name, password, email, phone_number } = req.body;
    try {
        if (!name || !email || !password || !phone_number) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const passwordHash = await bcrypt.hash(password, 12);
        await prisma.user.create({
            data: {
                name,
                email,
                phoneNumber: phone_number,
                password: passwordHash,
            },
        });
        res.status(201).json({ message: "You were successfully signed up" });
    }
    catch (err) {
        res.status(500).json({
            message: "Could not register you",
        });
    }
}
export default signup;
