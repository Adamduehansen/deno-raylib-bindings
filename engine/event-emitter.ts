type EventHandler<TEventData> = (data?: TEventData) => void;

export class EventEmitter<
  TEventMap extends Record<string, unknown> = Record<string, unknown>,
> {
  private readonly _eventMap = new Map<
    keyof TEventMap,
    EventHandler<unknown>[]
  >();

  emit<TEvent extends keyof TEventMap>(
    event: TEvent,
    data?: TEventMap[TEvent],
  ): void;
  emit(event: string, data?: unknown): void;
  emit<TEvent extends keyof TEventMap>(
    event: TEvent | string,
    data?: TEventMap[TEvent] | unknown,
  ) {
    const handlers = this._eventMap.get(event as keyof TEventMap);
    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      (handler as EventHandler<TEventMap[TEvent]>)(data as any);
    }
  }

  on<TEvent extends keyof TEventMap>(
    event: TEvent,
    handler: EventHandler<TEventMap[TEvent]>,
  ): void;
  on(event: string, handler: EventHandler<unknown>): void;
  on<TEvent extends keyof TEventMap>(
    event: TEvent | string,
    handler: EventHandler<TEventMap[TEvent]> | EventHandler<unknown>,
  ) {
    let handlers = this._eventMap.get(event as keyof TEventMap);
    if (handlers === undefined) {
      handlers = [];
      this._eventMap.set(event as keyof TEventMap, handlers);
    }

    handlers.push(handler as EventHandler<unknown>);
  }
}
