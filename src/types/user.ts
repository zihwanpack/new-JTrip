export type Provider = 'google' | 'kakao' | 'naver';

export type User = {
  id: string;
  provider: Provider;
  email: string;
  userImage: string;
  nickname: string;
  userMemo: string;
  createdAt: string;
  createdBy?: string;
};
