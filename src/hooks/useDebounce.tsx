import { useEffect, useState } from 'react';

export const useDebounce = <T,>(value: T, delay?: number): T => {
  const [Value, setValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setValue(value), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return Value;
};
