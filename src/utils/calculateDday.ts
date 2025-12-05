import dayjs from 'dayjs';

export const calculateDday = (targetDate: string): number => {
  const today = dayjs().startOf('day');
  const target = dayjs(targetDate).startOf('day');
  return target.diff(today, 'day');
};
