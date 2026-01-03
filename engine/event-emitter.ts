type EventMap = Record<string, unknown>;
type EventKey<T extends EventMap> = string & keyof T;
type EventHandler<EventKey> = (data?: EventKey) => void;

export class EventEmitter<
  TEventMap extends EventMap = Record<string, unknown>,
> {
  private readonly _eventMap = new Map<
    keyof TEventMap,
    EventHandler<unknown>[]
  >();

  emit<TEventName extends EventKey<TEventMap>>(
    event: TEventName,
    data?: TEventMap[TEventName],
  ): void;
  emit(event: string, data?: unknown): void;
  emit<TEvent extends EventKey<TEventMap>>(
    event: TEvent | string,
    data?: TEventMap[TEvent] | unknown,
  ) {
    const handlers = this._eventMap.get(event);
    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      handler(data);
    }
  }

  on<TEvent extends EventKey<TEventMap>>(
    event: TEvent,
    handler: EventHandler<TEventMap[TEvent]>,
  ): void;
  on(event: string, handler: EventHandler<unknown>): void;
  on<TEvent extends EventKey<TEventMap>>(
    event: TEvent | string,
    handler: EventHandler<TEventMap[TEvent]> | EventHandler<unknown>,
  ) {
    let handlers = this._eventMap.get(event);
    if (handlers === undefined) {
      handlers = [];
      this._eventMap.set(event, handlers);
    }

    handlers.push(handler as EventHandler<unknown>);
  }
}
