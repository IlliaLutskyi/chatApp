import prisma from "@/lib/db";

async function updateStatus(userId: number, status: "Online" | "Offline") {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status: status },
    });
  } catch (err) {
    console.log(err);
  }
}
export default updateStatus;
