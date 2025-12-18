import dayjs from 'dayjs';
import type { Event } from '../types/event.ts';

export const filteringEvents = (EventsData: Event[], selectedDate: string) => {
  return EventsData?.filter((event) => {
    if (!selectedDate) return true;

    const selected = dayjs(selectedDate);
    const start = dayjs(event.startDate);
    const end = dayjs(event.endDate);

    return (
      selected.isSame(start, 'day') ||
      selected.isSame(end, 'day') ||
      (selected.isAfter(start, 'day') && selected.isBefore(end, 'day'))
    );
  });
};
