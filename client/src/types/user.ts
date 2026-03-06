export type User = {
  id: number;
  email: string;
  username: string;
  avatar: string | null;
  isPro: boolean;
  token?: string;
};