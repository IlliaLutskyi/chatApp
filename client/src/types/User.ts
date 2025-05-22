export type User = {
  email: string;
  id: number;
  name: string;
  status: "Online" | "Offline";
  image: string | null;
  phoneNumber: string;
  created_at: string;
};
