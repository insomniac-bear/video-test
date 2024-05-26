import { describe, expect, test } from 'vitest';
import eventsSliceReducer, { addEvents, addRemoved, clearRemoved } from '../events.slice';
import type { TTimestamp } from '../../types/timestamp';

const MOCK_EVENT: TTimestamp = {
  timestamp: 6.16,
  duration: 0.83,
  zone: {
    left: 113.29959866169601,
    top: 195.3639952425215,
    width: 126.18979937751924,
    height: 46.23090211142281,
  },
};

describe('Tests for eventsSlice', () => {
  const initialPlayerState = {
    activeEvents: [],
    removedEvents: [],
  };

  test('add active event', () => {
    const newState = eventsSliceReducer(initialPlayerState, addEvents([MOCK_EVENT]));
    const { activeEvents } = newState;

    expect(activeEvents).toStrictEqual([MOCK_EVENT]);
  });

  test('add removed event', () => {
    const newState = eventsSliceReducer(initialPlayerState, addRemoved([MOCK_EVENT]));
    const { removedEvents } = newState;

    expect(removedEvents).toStrictEqual([MOCK_EVENT]);

    const stateAfterRemoved = eventsSliceReducer(initialPlayerState, clearRemoved());
    const { removedEvents: clearedEvents } = stateAfterRemoved;
    expect(clearedEvents).toStrictEqual([]);

  });
});
