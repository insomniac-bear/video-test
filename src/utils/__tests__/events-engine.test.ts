import { describe, expect, test } from 'vitest';
import { EventsEngine } from '../events-engine';

const MOCK_EVENTS = [
  {
    'timestamp': 6.16,
    'duration': 0.83,
    'zone': {
      'left': 113.29959866169601,
      'top': 195.3639952425215,
      'width': 126.18979937751924,
      'height': 46.23090211142281,
    },
  },
  {
    'timestamp': 8.434188048109025,
    'duration': 2.353994481738384,
    'zone': {
      'left': 1099.895966407068,
      'top': 572.6672494578761,
      'width': 40.89906403403258,
      'height': 44.814811542528766,
    },
  },
  {
    'timestamp': 9.25450789771043,
    'duration': 1.449604306639548,
    'zone': {
      'left': 103.63359084429018,
      'top': 165.41791105668187,
      'width': 47.880414044409406,
      'height': 40.955832410831114,
    },
  },
  {
    'timestamp': 15.529546751184933,
    'duration': 1.3402958120480153,
    'zone': {
      'left': 1040.8751008302945,
      'top': 704.3886186744919,
      'width': 39.79305729119351,
      'height': 12.375677824361343,
    },
  },
];

describe('Testing EventsEngine', () => {
  test('.getActiveEvents() must return empty array, if you dont add not once event', () => {
    const myEvents = new EventsEngine(MOCK_EVENTS);
    expect(myEvents.getActiveEvents()).toStrictEqual([]);
  });

  test('.addEvents() dont add duplicate events', () => {
    const myEvents = new EventsEngine(MOCK_EVENTS);
    myEvents.addEvents(6.16);
    myEvents.addEvents(6.16);
    expect(myEvents.getActiveEvents()).toStrictEqual([MOCK_EVENTS[0]]);
  });

  test('.addEvents() must add all events, which started before timestamp and will end after timestamp', () => {
    const myEvents = new EventsEngine(MOCK_EVENTS);
    myEvents.addEvents(9.3);
    expect(myEvents.getActiveEvents().length).toBe(2);
  });

  test('.removeEvents() must delete all active events, which ended before timestamp', () => {
    const myEvents = new EventsEngine(MOCK_EVENTS);
    myEvents.addEvents(6.16);
    myEvents.removeEvent(8);
    expect(myEvents.getActiveEvents()).toStrictEqual([]);
  });

  test('.getRemoveEvents() must return all removed events', () => {
    const myEvents = new EventsEngine(MOCK_EVENTS);
    myEvents.addEvents(6.16);
    myEvents.removeEvent(8);
    expect(myEvents.getRemovedEvents()).toStrictEqual([MOCK_EVENTS[0]]);
  });

  test('.clearRemoveEvents() must clear all removed items', () => {
    const myEvents = new EventsEngine(MOCK_EVENTS);
    myEvents.addEvents(6.16);
    myEvents.removeEvent(8);
    myEvents.clearRemovedEvents();
    expect(myEvents.getRemovedEvents()).toStrictEqual([]);
  });
});
