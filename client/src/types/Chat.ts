import { Message } from "./Message";
import { User } from "./User";

export type Chat = {
  id: number;
  userId: number;
  createdAt: string;
  private: boolean;
  image: string | null;
  users: User[];
  title: string;
  messages: Message[];
};
