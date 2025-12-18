import { formatDateToYearMonth } from './formatDateToYearMonth.ts';

export const formatDateRange = (startDate: string, endDate: string) => {
  const startDateFormatted = formatDateToYearMonth(startDate);
  const endDateFormatted = formatDateToYearMonth(endDate);
  return `${startDateFormatted} ~ ${endDateFormatted}`;
};
