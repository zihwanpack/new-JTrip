import type { Cost } from './cost.ts';
import type { SuccessResponse } from './defaultResponse.ts';

export type Event = {
  id: number;
  tripId: number;
  eventName: string;
  location: string;
  startDate: string;
  endDate: string;
  cost: Cost[];
};

export type GetMyAllEventsResponse = SuccessResponse<Event[]>;
