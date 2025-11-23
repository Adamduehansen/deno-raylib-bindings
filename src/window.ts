import { raylib } from "./raylib-bindings.ts";

const cEncoder = new TextEncoder();
function toCString(str: string): BufferSource {
  return cEncoder.encode(`${str}\0`);
}

/**
 * Close window and unload OpenGL context.
 */
export function closeWindow(): void {
  raylib.symbols.CloseWindow();
}

/**
 * Toggle window state: fullscreen/windowed, resizes monitor to match window
 * resolution.
 */
export function toggleFullScreen(): void {
  raylib.symbols.ToggleFullscreen();
}

/**
 * Get current monitor where window is placed.
 */
export function getCurrentMonitor(): number {
  return raylib.symbols.GetCurrentMonitor();
}

/**
 * Get specified monitor width (current video mode used by monitor).
 */
export function getMonitorWidth(monitor: number): number {
  return raylib.symbols.GetMonitorWidth(monitor);
}

/**
 * Get specified monitor height (current video mode used by monitor).
 */
export function getMonitorHeight(monitor: number): number {
  return raylib.symbols.GetMonitorHeight(monitor);
}

/**
 * Get current screen width.
 */
export function getScreenWidth(): number {
  return raylib.symbols.GetScreenWidth();
}

/**
 * Get current screen height.
 */
export function getScreenHeight(): number {
  return raylib.symbols.GetScreenHeight();
}

/**
 * Initialize window and OpenGL context.
 */
export function initWindow(options: {
  width: number;
  height: number;
  title: string;
}): void {
  raylib.symbols.InitWindow(
    options.width,
    options.height,
    toCString(options.title),
  );
}

/**
 * Check if window is currently fullscreen.
 */
export function isWindowFullScreen(): boolean {
  return raylib.symbols.IsWindowFullscreen();
}

/**
 * Set window dimensions.
 */
export function setWindowSize(width: number, height: number): void {
  raylib.symbols.SetWindowSize(width, height);
}

/**
 * Check if application should close (KEY_ESCAPE pressed or windows close icon
 * clicked).
 */
export function windowShouldClose(): boolean {
  return raylib.symbols.WindowShouldClose();
}
