import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './slices/tripSlice.ts';
import eventReducer from './slices/eventSlice.ts';
import userReducer from './slices/userSlice.ts';

export const store = configureStore({
  reducer: { trip: tripReducer, event: eventReducer, user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
