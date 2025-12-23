export type SuccessResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type ErrorResponse = {
  isSuccess: false;
  code: string;
  message: string;
  result: null;
};
