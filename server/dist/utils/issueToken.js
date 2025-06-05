import jwt from "jsonwebtoken";
export async function issueToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "10d",
    });
}
