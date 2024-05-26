import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TTimestamp } from '../types/timestamp';
import type { TFetchStatus } from '../types/fetch-status';
import type { RootState } from '..';

export interface ITimestampsState {
  currentTimeStamp: number;
  timestampsFetchedStatus: TFetchStatus;
  timestamps: TTimestamp[] | null;
}

const initialState: ITimestampsState = {
  currentTimeStamp: 0,
  timestampsFetchedStatus: 'idle',
  timestamps: null,
};

export const timestampsSlice = createSlice({
  name: 'timestamps',
  initialState,
  reducers: {
    fetchTimestamps: (state) => {
      state.timestampsFetchedStatus = 'pending';
    },

    putTimestamps: (state, action: PayloadAction<TTimestamp[]>) => {
      state.timestampsFetchedStatus = 'success';
      state.timestamps = action.payload;
    },
  },
});

export const getFetchedTimestampStatus = (store: RootState) =>
  store.timestampReducer.timestampsFetchedStatus;
export const getTimestamps = (store: RootState) =>
  store.timestampReducer.timestamps;

export const { fetchTimestamps, putTimestamps } = timestampsSlice.actions;

export default timestampsSlice.reducer;
