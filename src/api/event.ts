import { httpClient } from './http/httpClient.ts';
import type { Event } from '../types/event.ts';
import { AxiosError } from 'axios';
import EventError from '../errors/EventError.ts';

const getMyAllEventsApi = async (tripId: number): Promise<Event[]> => {
  try {
    const { data } = await httpClient.get<Event[]>(`/event/all/${tripId}`);
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? error.message;
      throw new EventError(message, status);
    }
    throw new EventError('An unknown error occurred', 500);
  }
};

export { getMyAllEventsApi };
