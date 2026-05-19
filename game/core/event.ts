type EventHandler = (data?: unknown) => void;

export class Events {
  private _eventMap: Map<string, EventHandler[]> = new Map();

  on(eventName: string, handler: () => void): void {
    const currentHandlers = this._eventMap.getOrInsert(eventName, []);
    const updatedHandlers = [...currentHandlers, handler];
    this._eventMap.set(eventName, updatedHandlers);
  }

  emit(eventName: string, data?: unknown): void {
    if (this._eventMap.has(eventName) === false) {
      console.error("No handlers for event:", eventName);
      return;
    }

    const handlers = this._eventMap.get(eventName)!;
    for (const handler of handlers) {
      handler();
    }
  }

  remove(): void {}
}
