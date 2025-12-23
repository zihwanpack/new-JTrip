import { authenticatedClient } from './client/authenticatedClient.ts';
import type { Event, GetMyAllEventsResponse } from '../types/event.ts';
import { EventError } from '../errors/customErrors.ts';
import { requestHandler } from './util/requestHandler.ts';

export const getMyAllEventsApi = async (tripId: number): Promise<Event[]> => {
  return requestHandler(
    () => authenticatedClient.get<GetMyAllEventsResponse>(`/event/all/${tripId}`),
    EventError
  );
};
