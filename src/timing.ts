import { raylib } from "./raylib-bindings.ts";

/**
 * Set target FPS (maximum)
 */
export function setTargetFPS(fps: number): void {
  raylib.symbols.SetTargetFPS(fps);
}
