import { toRaylibVector2, toVector, Vector } from "./r-core.ts";
import { raylib } from "./raylib-bindings.ts";

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
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

export function toRaylibRectangle(rec: Rectangle): BufferSource {
  return new Float32Array([rec.x, rec.y, rec.width, rec.height]);
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
