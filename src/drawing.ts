import { Color, toRaylibColor } from "./color.ts";
import { raylib } from "./raylib-bindings.ts";
import { Camera, toRaylibCamera2D } from "./screen-space.ts";

/**
 * Setup canvas (framebuffer) to start drawing.
 */
export function beginDrawing(): void {
  raylib.symbols.BeginDrawing();
}

/** */
export function beginMode2D(camera: Camera): void {
  return raylib.symbols.BeginMode2D(toRaylibCamera2D(camera));
}

/**
 * Set background color (framebuffer clear color).
 */
export function clearBackground(color: Color): void {
  raylib.symbols.ClearBackground(toRaylibColor(color));
}

/**
 * End canvas drawing and swap buffers (double buffering).
 */
export function endDrawing(): void {
  raylib.symbols.EndDrawing();
}

/**
 * Ends 2D mode with custom camera.
 */
export function endMode2D(): void {
  raylib.symbols.EndMode2D();
}
