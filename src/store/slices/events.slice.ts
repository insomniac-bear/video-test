import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TTimestamp } from '../types/timestamp';
import type { RootState } from '..';

interface IEventsState {
  activeEvents: TTimestamp[];
  removedEvents: TTimestamp[];
}

const initialState: IEventsState = {
  activeEvents: [],
  removedEvents: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvents: (state, action: PayloadAction<TTimestamp[]>) => {
      state.activeEvents = action.payload;
    },

    addRemoved: (state, action: PayloadAction<TTimestamp[]>) => {
      state.removedEvents = action.payload;
    },

    clearRemoved: (state) => {
      state.removedEvents = [];
    },
  },
});

export const getActiveEvents = (store: RootState) =>
  store.eventsReducer.activeEvents;
export const getRemovedEvents = (store: RootState) =>
  store.eventsReducer.removedEvents;

export const { addEvents, addRemoved, clearRemoved } = eventsSlice.actions;

export default eventsSlice.reducer;
