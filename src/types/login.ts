import type { User } from './user.ts';
export interface AuthMeResponse {
  message: string;
  access_token: string;
  user: User;
}
