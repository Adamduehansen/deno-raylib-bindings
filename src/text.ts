import { Color, toRaylibColor } from "./color.ts";
import { Font, toRaylibFont } from "./font.ts";
import { toRaylibVector2, Vector } from "./math.ts";
import { raylib } from "./raylib-bindings.ts";

const cEncoder = new TextEncoder();
function toCString(str: string): BufferSource {
  return cEncoder.encode(`${str}\0`);
}

export function drawText(args: {
  text: string;
  posX: number;
  posY: number;
  fontSize: number;
  color: Color;
}): void {
  raylib.symbols.DrawText(
    toCString(args.text),
    args.posX,
    args.posY,
    args.fontSize,
    toRaylibColor(args.color),
  );
}

export function drawTextEx(args: {
  font: Font;
  text: string;
  position: Vector;
  fontSize: number;
  spacing: number;
  tint: Color;
}): void {
  raylib.symbols.DrawTextEx(
    toRaylibFont(args.font),
    toCString(args.text),
    toRaylibVector2(args.position),
    args.fontSize,
    args.spacing,
    toRaylibColor(args.tint),
  );
}
