import { useEffect, useState } from 'react';
import { delay } from '../utils/delay.ts';

export const useMinimalLoading = (duration: number) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      await delay(duration);
      if (isMounted) setShowSkeleton(false);
    };
    run();

    return () => {
      isMounted = false;
    };
  }, [duration]);

  return showSkeleton;
};
