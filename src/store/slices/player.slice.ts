import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface IPlayerState {
  isPlay: boolean;
  playFrom: number;
}

const initialState: IPlayerState = {
  isPlay: false,
  playFrom: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    togglePlayerStatus: (state) => {
      state.isPlay = !state.isPlay;
    },

    setPlayFrom: (state, action: PayloadAction<number>) => {
      state.playFrom = action.payload;
      if (!state.isPlay) {
        state.isPlay = true;
      }
    },
  },
});

export const getPlayFrom = (store: RootState) => store.playerReducer.playFrom;
export const getPlayerStatus = (store: RootState) => store.playerReducer.isPlay;

export const { togglePlayerStatus, setPlayFrom } = playerSlice.actions;

export default playerSlice.reducer;
