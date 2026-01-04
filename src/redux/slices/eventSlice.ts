import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createEventApi,
  deleteEventApi,
  getEventDetailApi,
  getMyAllEventsApi,
} from '../../api/event.ts';
import type { CreateEventRequest, Event } from '../../types/event.ts';

export const fetchAllEvents = createAsyncThunk<
  Event[],
  { tripId: number },
  { rejectValue: string }
>('events/fetchAllEvents', async ({ tripId }, { rejectWithValue }) => {
  try {
    return await getMyAllEventsApi({ tripId });
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const fetchEventDetail = createAsyncThunk<Event, { id: number }, { rejectValue: string }>(
  'events/fetchEventDetail',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getEventDetailApi({ id });
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);

export const deleteEvent = createAsyncThunk<null, { id: number }, { rejectValue: string }>(
  'events/deleteEvent',
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteEventApi({ id });
      return null;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);

export const createEvent = createAsyncThunk<Event, CreateEventRequest, { rejectValue: string }>(
  'events/createEvent',
  async (event, { rejectWithValue }) => {
    try {
      return await createEventApi(event);
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);
export interface EventState {
  eventDetail: Event | null;
  allEvents: Event[];
  deleteEvent: Event | null;
  createEvent: Event | null;

  isAllEventsLoading: boolean;
  isEventDetailLoading: boolean;
  isDeleteEventLoading: boolean;
  isCreateEventLoading: boolean;

  allEventsError: string | null;
  eventDetailError: string | null;
  deleteEventError: string | null;
  createEventError: string | null;
}

const initialState: EventState = {
  eventDetail: null,
  allEvents: [],
  deleteEvent: null,
  createEvent: null,

  isAllEventsLoading: false,
  isEventDetailLoading: false,
  isDeleteEventLoading: false,
  isCreateEventLoading: false,

  allEventsError: null,
  eventDetailError: null,
  deleteEventError: null,
  createEventError: null,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    clearEventDetail: (state) => {
      state.eventDetail = null;
      state.eventDetailError = null;
    },

    resetEventState: () => initialState,
  },
  extraReducers: (builder) => {
    // 이벤트 전체 조회
    builder.addCase(fetchAllEvents.fulfilled, (state, action) => {
      state.allEvents = action.payload;
      state.isAllEventsLoading = false;
    });
    builder.addCase(fetchAllEvents.rejected, (state, action) => {
      state.isAllEventsLoading = false;
      state.allEventsError = action.payload ?? null;
    });
    builder.addCase(fetchAllEvents.pending, (state) => {
      state.isAllEventsLoading = true;
    });
    // 이벤트 상세 조회
    builder.addCase(fetchEventDetail.fulfilled, (state, action) => {
      state.eventDetail = action.payload;
      state.isEventDetailLoading = false;
    });
    builder.addCase(fetchEventDetail.rejected, (state, action) => {
      state.isEventDetailLoading = false;
      state.eventDetailError = action.payload ?? null;
    });
    builder.addCase(fetchEventDetail.pending, (state) => {
      state.isEventDetailLoading = true;
    });
    // 이벤트 삭제
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.deleteEvent = action.payload;
      state.isDeleteEventLoading = false;
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.isDeleteEventLoading = false;
      state.deleteEventError = action.payload ?? null;
    });
    // 이벤트 생성
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.createEvent = action.payload;
      state.isCreateEventLoading = false;
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.isCreateEventLoading = false;
      state.createEventError = action.payload ?? null;
    });
    builder.addCase(createEvent.pending, (state) => {
      state.isCreateEventLoading = true;
    });
  },
});

export const { clearEventDetail, resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
