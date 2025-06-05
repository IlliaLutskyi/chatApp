import prisma from "@/lib/db";
import { getImageString } from "@/utils/getImageString";
async function editProfile(req, res) {
    const image = req.file;
    const { name, phone_number } = req.body;
    const userId = req.user && "id" in req.user ? req.user.id : null;
    let imageUrl = null;
    try {
        if (image) {
            imageUrl = getImageString(image);
        }
        if (imageUrl) {
            await prisma.user.update({
                where: { id: Number(userId) },
                data: {
                    name,
                    phoneNumber: phone_number,
                    image: imageUrl,
                },
            });
        }
        else {
            await prisma.user.update({
                where: { id: Number(userId) },
                data: {
                    name,
                    phoneNumber: phone_number,
                },
            });
        }
        res.status(200).json({ message: "Profile updated successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Could not update profile" });
        return;
    }
}
export default editProfile;
