/**
 * Includes bindings for functions in the {@link https://www.raylib.com/cheatsheet/cheatsheet.html#pshapes|rshapes module}.
 *
 * @module
 */

import {
  type Color,
  type RaylibVector,
  toRaylibColor,
  toRaylibVector2,
} from "./r-core.ts";
import { raylib } from "./raylib-bindings.ts";

export interface RaylibRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function toRaylibRectangle(rec: RaylibRectangle): BufferSource {
  return new Float32Array([rec.x, rec.y, rec.width, rec.height]);
}

// ----------------------------------------------------------------------------
// Basic shapes drawing functions
// ----------------------------------------------------------------------------

/**
 * Draw a color-filled circle
 */
export function drawCircle(args: {
  centerX: number;
  centerY: number;
  radius: number;
  color: Color;
}): void {
  raylib.symbols.DrawCircle(
    args.centerX,
    args.centerY,
    args.radius,
    toRaylibColor(args.color),
  );
}

/**
 * Draw circle outline (Vector version)
 */
export function drawCircleLinesV(args: {
  center: RaylibVector;
  radius: number;
  color: Color;
}): void {
  raylib.symbols.DrawCircleLinesV(
    toRaylibVector2(args.center),
    args.radius,
    toRaylibColor(args.color),
  );
}

/**
 * Draw a color-filled circle (Vector version)
 */
export function drawCircleV(args: {
  center: RaylibVector;
  radius: number;
  color: Color;
}): void {
  raylib.symbols.DrawCircleV(
    toRaylibVector2(args.center),
    args.radius,
    toRaylibColor(args.color),
  );
}

/**
 * Draw a line.
 */
export function drawLine(args: {
  startPosX: number;
  startPosY: number;
  endPosX: number;
  endPosY: number;
  color: Color;
}): void {
  raylib.symbols.DrawLine(
    args.startPosX,
    args.startPosY,
    args.endPosX,
    args.endPosY,
    toRaylibColor(args.color),
  );
}

/**
 * Draw a color-filled rectangle.
 */
export function drawRectangle(args: {
  posX: number;
  posY: number;
  width: number;
  height: number;
  color: Color;
}): void {
  raylib.symbols.DrawRectangle(
    args.posX,
    args.posY,
    args.width,
    args.height,
    toRaylibColor(args.color),
  );
}

/**
 * Draw rectangle outline.
 */
export function drawRectangleLines(args: {
  posX: number;
  posY: number;
  width: number;
  height: number;
  color: Color;
}): void {
  raylib.symbols.DrawRectangleLines(
    args.posX,
    args.posY,
    args.width,
    args.height,
    toRaylibColor(args.color),
  );
}

/**
 * Draw a color-filled rectangle.
 */
export function drawRectangleRec(args: {
  rectangle: RaylibRectangle;
  color: Color;
}): void {
  raylib.symbols.DrawRectangleRec(
    toRaylibRectangle(args.rectangle),
    toRaylibColor(args.color),
  );
}

/**
 * Draw a color-filled rectangle (Vector version).
 */
export function drawRectangleV(args: {
  position: RaylibVector;
  size: RaylibVector;
  color: Color;
}): void {
  raylib.symbols.DrawRectangleV(
    toRaylibVector2(args.position),
    toRaylibVector2(args.size),
    toRaylibColor(args.color),
  );
}

/**
 * Draw rectangle outline with extended parameters.
 */
export function drawRectangleLinesEx(args: {
  rec: RaylibRectangle;
  lineThick: number;
  color: Color;
}): void {
  return raylib.symbols.DrawRectangleLinesEx(
    toRaylibRectangle(args.rec),
    args.lineThick,
    toRaylibColor(args.color),
  );
}

// ----------------------------------------------------------------------------
// Basic shapes collision detection functions.
// ----------------------------------------------------------------------------

/**
 * Check collision between two rectangles.
 */
export function checkCollisionRecs(
  rec1: RaylibRectangle,
  rec2: RaylibRectangle,
): boolean {
  return raylib.symbols.CheckCollisionRecs(
    toRaylibRectangle(rec1),
    toRaylibRectangle(rec2),
  );
}

/**
 * Check collision between circle and rectangle.
 */
export function checkCollisionCircleRec(
  center: RaylibVector,
  radius: number,
  rectangle: RaylibRectangle,
): boolean {
  return raylib.symbols.CheckCollisionCircleRec(
    toRaylibVector2(center),
    radius,
    toRaylibRectangle(rectangle),
  );
}
