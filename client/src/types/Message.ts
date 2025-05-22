import { Chat } from "./Chat";
import { User } from "./User";

export type Message = {
  id: number;
  chatId: number;
  userId: number;
  user?: User;
  chat?: Chat;
  type: "text" | "file" | "media";
  content: string;
  image?: string;
  createdAt: string;
};
