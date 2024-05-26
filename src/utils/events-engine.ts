import type { TTimestamp } from '../store/types/timestamp';

export class EventsEngine {
  private eventsList: TTimestamp[];
  private activeEvents: Map<number, TTimestamp>;
  private removedEvents: TTimestamp[];

  constructor(eventsList: TTimestamp[]) {
    this.eventsList = eventsList;
    this.activeEvents = new Map();
    this.removedEvents = [];
  }

  private addEvent(event: TTimestamp) {
    if (this.activeEvents.has(event.timestamp + event.duration)) {
      return false;
    }

    this.activeEvents.set(event.timestamp + event.duration, event);
    return true;
  }

  public addEvents(timestamp: number) {
    let countOfAdded = 0;
    for (let i = 0; i < this.eventsList.length; i++) {
      if (timestamp < this.eventsList[i].timestamp) {
        return countOfAdded;
      }

      if (
        timestamp >= this.eventsList[i].timestamp &&
        timestamp <= this.eventsList[i].duration + this.eventsList[i].timestamp
      ) {
        const isAdded = this.addEvent(this.eventsList[i]);
        countOfAdded += isAdded ? 1 : 0;
      }
    }
    return countOfAdded;
  }

  public removeEvent(timestamp: number) {
    let countOfDelete = 0;
    for (const key of this.activeEvents.keys()) {
      const removedItem = this.activeEvents.get(key);
      if (removedItem) {
        if (key < timestamp || removedItem.timestamp > timestamp) {
          if (this.removedEvents) {
            this.removedEvents = [...this.removedEvents, removedItem];
          }
          this.activeEvents.delete(key);
          countOfDelete++;
        }
      }
    }
    return countOfDelete;
  }

  public getRemovedEvents() {
    return this.removedEvents;
  }

  public clearRemovedEvents() {
    this.removedEvents = [];
  }

  public getActiveEvents() {
    const activeEvents = [];
    for (const value of this.activeEvents.values()) {
      activeEvents.push(value);
    }
    return activeEvents;
  }
}
