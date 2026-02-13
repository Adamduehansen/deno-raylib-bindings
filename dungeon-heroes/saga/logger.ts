import { LOG_INFO, traceLog } from "@adamduehansen/raylib-bindings/r-core";

export default interface Logger {
  info(...logs: string[]): void;
}

export class DefaultLogger implements Logger {
  info(...logs: string[]): void {
    traceLog(LOG_INFO, ...logs);
  }
}
