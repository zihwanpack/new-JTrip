import { useState } from 'react';

export const useCreateAction = <T, R>(action: (data: T) => Promise<R>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (data: T): Promise<R> => {
    try {
      setIsLoading(true);
      setError(null);
      return await action(data);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
};
