import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ko';
dayjs.extend(isSameOrBefore);
dayjs.locale('ko');

export const getDateRange = (start: string, end: string) => {
  const dates: dayjs.Dayjs[] = [];
  let current = dayjs(start);
  const last = dayjs(end);

  while (current.isSameOrBefore(last, 'day')) {
    dates.push(current);
    current = current.add(1, 'day');
  }

  return dates;
};
