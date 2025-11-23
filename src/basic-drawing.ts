import { Color, toRaylibColor } from "./color.ts";
import { toRaylibVector2, Vector } from "./math.ts";
import { raylib } from "./raylib-bindings.ts";

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
 * Draw a color-filled circle (Vector version)
 */
export function drawCircleV(args: {
  center: Vector;
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
 * Draw circle outline (Vector version)
 */
export function drawCircleLinesV(args: {
  center: Vector;
  radius: number;
  color: Color;
}): void {
  raylib.symbols.DrawCircleLinesV(
    toRaylibVector2(args.center),
    args.radius,
    toRaylibColor(args.color),
  );
}
