import { describe, expect, test } from 'vitest';
import playerSliceReducer, { togglePlayerStatus, setPlayFrom } from '../player.slice';

describe('Tests for playerSlice', () => {
  const initialPlayerState = {
    isPlay: false,
    playFrom: 0,
    events: [],
  };

  test('toggle isPlay', () => {
    const newState = playerSliceReducer(initialPlayerState, togglePlayerStatus());
    const { isPlay } = newState;

    expect(isPlay).toBeTruthy();
  });

  test('set player start position', () => {
    const newState = playerSliceReducer(initialPlayerState, setPlayFrom(3));
    const { playFrom } = newState;

    expect(playFrom).toBe(3);
  });
});
