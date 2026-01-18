import type { DestinationKey } from "../../constants/tripImages.ts";
import type { TripFormValues } from "../../schemas/tripSchema.ts";
import type { Trip } from "../../types/trip.ts";


export const transformToRequest = (values: TripFormValues): Omit<Trip, 'id'> => {
  return {
    ...values,

    destinationType: values.destinationType as Trip['destinationType'],
    destination: values.destination as DestinationKey, 
  };
};


