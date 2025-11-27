import { httpClient } from './http/httpClient.ts';

export const getAuthedUser = async () => {
  const { data } = await httpClient.get('/auth/user');
  return data;
};

export const logoutApi = async () => {
  const { data } = await httpClient.post('/auth/logout');
  return data;
};
