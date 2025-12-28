type EventHandler<TEventData> = (data?: TEventData) => void;

export class EventEmitter<TEventMap extends Record<string, unknown>> {
  private readonly _eventMap = new Map<
    keyof TEventMap,
    EventHandler<unknown>[]
  >();

  emit<TEvent extends keyof TEventMap>(
    event: TEvent,
    data?: TEventMap[TEvent],
  ) {
    const handlers = this._eventMap.get(event);
    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      (handler as EventHandler<TEventMap[TEvent]>)(data);
    }
  }

  on<TEvent extends keyof TEventMap>(
    event: TEvent,
    handler: EventHandler<TEventMap[TEvent]>,
  ) {
    let handlers = this._eventMap.get(event);
    if (handlers === undefined) {
      handlers = [];
      this._eventMap.set(event, handlers);
    }

    handlers.push(handler as EventHandler<unknown>);
  }
}
