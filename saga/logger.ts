import {
  LOG_DEBUG,
  LOG_INFO,
  setTraceLogLevel,
  traceLog,
} from "@adamduehansen/raylib-bindings/r-core";
import { GameContext } from "./game-context.ts";

export class Logger {
  private static _instance?: Logger;

  private constructor() {
    setTraceLogLevel(GameContext.isDebug ? LOG_DEBUG : LOG_INFO);
  }

  static getInstance(): Logger {
    if (this._instance === undefined) {
      this._instance = new Logger();
    }

    return this._instance;
  }

  info(...str: string[]): void {
    traceLog(LOG_INFO, ...str);
  }

  debug(...str: string[]): void {
    traceLog(LOG_DEBUG, ...str);
  }
}
