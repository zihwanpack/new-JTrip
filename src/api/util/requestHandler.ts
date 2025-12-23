import { AxiosError } from 'axios';

export const requestHandler = async <T>(
  request: () => Promise<{ data: { result: T } }>,
  ErrorClass: new (message: string, status: number) => Error
): Promise<T> => {
  try {
    const { data } = await request();
    return data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ErrorClass(
        error.response?.data?.message ?? error.message,
        error.response?.status ?? 500
      );
    }
    throw new ErrorClass('An unknown error occurred', 500);
  }
};
