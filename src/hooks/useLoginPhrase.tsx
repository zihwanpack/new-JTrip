import { useEffect, useState } from 'react';

const phrases = ['누구나', 'J처럼', '여행하기'];
const PHRASE_INTERVAL = 2000; // 2초마다 변경 (원하는 대로 조절 가능)

export const useIntroPhrase = (): string => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, PHRASE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return phrases[index];
};
