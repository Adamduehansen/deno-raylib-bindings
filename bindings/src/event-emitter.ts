type EventMap = Record<string, ((data?: unknown) => void)[]>;

export class EventEmitter {
  private readonly _eventMap: EventMap = {};

  emit(event: string, data?: unknown) {
    if (this._eventMap[event] === undefined) {
      return;
    }

    for (const handler of this._eventMap[event]) {
      handler(data);
    }
  }

  on(event: string, handler: (data: unknown) => void) {
    if (this._eventMap[event] === undefined) {
      this._eventMap[event] = [];
    }

    this._eventMap[event].push(handler);
  }
}
