import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import updateStatus from "./services/user/updateStatus";
import sendMessages from "./services/message/sendMessages";
import deleteMessage from "./services/message/deleteMessage";
import saveMessage from "./services/message/saveMessage";
import retrieveToken from "./utils/retrieveToken";
import editMessage from "./services/message/editMessage";
function setupSocket(server) {
    const io = new Server(server, {
        cors: { origin: process.env.FRONT_END_ORIGIN, credentials: true },
    });
    io.use(async (socket, next) => {
        try {
            const token = retrieveToken(socket, next);
            if (!token)
                return next(new Error("unauthorized"));
            const user = await jwt.verify(token, process.env.JWT_SECRET);
            socket.user = user;
            next();
        }
        catch (err) {
            next(err instanceof Error ? err : new Error("unauthorized"));
        }
    });
    io.on("connect", async (socket) => {
        let chatId = null;
        const user = socket.user;
        await updateStatus(user.id, "Online");
        socket.on("connectToRoom", async (id) => {
            chatId = Number(id);
            const roomName = `chat_${chatId}`;
            socket.join(roomName);
            socket.emit("message", await sendMessages(chatId));
        });
        socket.on("deleteMessages", async (messages) => {
            await deleteMessage(messages);
            io.to(`chat_${chatId}`).emit("message", await sendMessages(chatId));
        });
        socket.on("editMessage", async (message) => {
            await editMessage(message.id, message.content);
            io.to(`chat_${chatId}`).emit("message", await sendMessages(chatId));
        });
        socket.on("message", async (message) => {
            if (chatId === null)
                return;
            if (message.type === "file") {
                await saveMessage({
                    image: message.url,
                    message: message.message,
                    type: message.type,
                    chatId,
                    userId: user.id,
                });
            }
            else {
                await saveMessage({
                    message: message.message,
                    type: message.type,
                    chatId,
                    userId: user.id,
                });
            }
            const roomName = `chat_${chatId}`;
            io.to(roomName).emit("message", await sendMessages(chatId));
        });
        socket.on("disconnect", async () => {
            await updateStatus(user.id, "Offline");
        });
    });
}
export default setupSocket;
