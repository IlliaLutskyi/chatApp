import prisma from "@/lib/db";

async function deleteMessage(id: number) {
  try {
    await prisma.message.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
export default deleteMessage;
