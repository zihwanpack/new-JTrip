import { useEffect, useState } from 'react';

export const useFetch = <T, E = Error>(requestFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await requestFunction();
        setData(response);
      } catch (error) {
        setError(error as E);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [requestFunction]);

  return { data, error, isLoading };
};
