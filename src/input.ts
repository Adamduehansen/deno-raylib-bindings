import { toVector, Vector } from "./math.ts";
import { raylib } from "./raylib-bindings.ts";

// Key constants
export const KeySpace = 32;
export const KeyOne = 49;
export const KeyTwo = 50;
export const KeyA = 65;
export const KeyD = 68;
export const KeyP = 80;
export const KeyR = 82;
export const KeyS = 83;
export const KeyW = 87;
export const KeyEnter = 257;
export const KeyRight = 262;
export const KeyLeft = 263;
export const KeyDown = 264;
export const KeyUp = 265;
export const KeyLeftAlt = 342;
export const KeyRightAlt = 346;

// Mouse constants
export const MouseButtonLeft = 0;

/**
 * Check if a mouse button is being pressed.
 */
export function isMouseButtonDown(key: number) {
  return raylib.symbols.IsMouseButtonDown(key);
}

/**
 * Get mouse delta between frames.
 */
export function getMouseDelta(): Vector {
  return toVector(raylib.symbols.GetMouseDelta());
}

/**
 * Get mouse position XY.
 */
export function getMousePosition(): Vector {
  return toVector(raylib.symbols.GetMousePosition());
}

/**
 * Get mouse wheel movement for X or Y, whichever is larger.
 */
export function getMouseWheelMove(): number {
  return raylib.symbols.GetMouseWheelMove();
}

/**
 * Get mouse position X.
 */
export function getMouseX(): number {
  return raylib.symbols.GetMouseX();
}

/**
 * Get mouse position Y.
 */
export function getMouseY(): number {
  return raylib.symbols.GetMouseY();
}

/**
 * Check if a key has been pressed once.
 */
export function isKeyPressed(key: number): boolean {
  return raylib.symbols.IsKeyPressed(key);
}

/**
 * Check if a key is being pressed.
 */
export function isKeyDown(key: number): boolean {
  return raylib.symbols.IsKeyDown(key);
}
