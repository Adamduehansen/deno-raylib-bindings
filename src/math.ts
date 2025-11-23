import { raylib } from "./raylib-bindings.ts";

export interface Vector {
  x: number;
  y: number;
}

/**
 * TODO
 */
export function clamp(value: number, min: number, max: number): number {
  return raylib.symbols.Clamp(value, min, max);
}

/**
 * TODO
 */
export function rlPushMatrix(): void {
  raylib.symbols.rlPushMatrix();
}

/**
 * TODO
 */
export function rlPopMatrix(): void {
  raylib.symbols.rlPopMatrix();
}

/**
 * TODO
 */
export function rlTranslatef(x: number, y: number, z: number): void {
  raylib.symbols.rlTranslatef(x, y, z);
}

/**
 * TODO
 */
export function rlRotatef(
  angle: number,
  x: number,
  y: number,
  z: number,
): void {
  raylib.symbols.rlRotatef(angle, x, y, z);
}

/**
 * Converts a {@linkcode Vector} to a Raylib vector2 struct.
 */
export function toRaylibVector2(vector: Vector): BufferSource {
  return new Float32Array([vector.x, vector.y]);
}

/**
 * TODO:
 */
export function toVector(buffer: Uint8Array): Vector {
  const view = new DataView(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength,
  );

  return {
    x: view.getFloat32(0, true),
    y: view.getFloat32(4, true),
  };
}

export function vec(x: number, y: number): Vector {
  return {
    x: x,
    y: y,
  };
}

/**
 * TODO:
 */
export function vector2Scale(vector: Vector, scale: number): Vector {
  return toVector(raylib.symbols.Vector2Scale(
    toRaylibVector2(vector),
    scale,
  ));
}

/**
 * TODO:
 */
export function vector2Add(vector2A: Vector, vector2B: Vector): Vector {
  return toVector(raylib.symbols.Vector2Add(
    toRaylibVector2(vector2A),
    toRaylibVector2(vector2B),
  ));
}
