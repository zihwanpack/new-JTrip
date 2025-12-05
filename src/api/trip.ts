import { httpClient } from './http/httpClient.ts';
import type { Trip } from '../types/trip.ts';
import TripError from '../errors/TripError.ts';
import { AxiosError } from 'axios';

export const getMyAllTripsApi = async (id: string): Promise<Trip[]> => {
  try {
    const { data } = await httpClient.get<Trip[]>(`/trips/user/${id}`);
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? error.message;
      throw new TripError(message, status);
    }
    throw new TripError('An unknown error occurred', 500);
  }
};
