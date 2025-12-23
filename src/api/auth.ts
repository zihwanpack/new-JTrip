import { AuthError } from '../errors/customErrors.ts';
import type { GetUserResponse, LogoutResponse } from '../types/auth.ts';
import type { User } from '../types/user.ts';
import { authenticatedClient } from './client/authenticatedClient.ts';
import { unauthenticatedClient } from './client/unauthenticatedClient.ts';
import { requestHandler } from './util/requestHandler.ts';

export const getUserApi = async (): Promise<User> => {
  return requestHandler(() => authenticatedClient.get<GetUserResponse>('/auth/user'), AuthError);
};

export const logoutApi = async (): Promise<null> => {
  return requestHandler(
    () => unauthenticatedClient.post<LogoutResponse>('/auth/logout'),
    AuthError
  );
};
