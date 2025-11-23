import { raylib } from "./raylib-bindings.ts";

export interface Font {
  baseSize: number;
  glyphCount: number;
  glyphPadding: number;
  texture: number; // pointer or handle
  recs: number; // pointer
  glyphs: number; // pointer
}

export function toRaylibFont(font: Font) {
  return new Uint32Array([
    font.baseSize,
    font.glyphCount,
    font.glyphPadding,
    font.texture,
    font.recs,
    font.glyphs,
  ]);
}

export function getFontDefault(): Font {
  const font = raylib.symbols.GetFontDefault();

  return {
    baseSize: font[0],
    glyphCount: font[1],
    glyphPadding: font[2],
    texture: font[3],
    recs: font[4],
    glyphs: font[5],
  };
}
