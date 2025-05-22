import jwt from "jsonwebtoken";
export async function issueToken(id: number) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "10d",
  });
}
