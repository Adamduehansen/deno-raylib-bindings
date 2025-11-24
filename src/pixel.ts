import { Color, toRaylibColor } from "./r-core.ts";
import { raylib } from "./raylib-bindings.ts";

/**
 * Get color with alpha applied, alpha goes from 0.0f to 1.0f.
 */
export function fade(color: Color, alpha: number): Color {
  const result = raylib.symbols.Fade(toRaylibColor(color), alpha);
  return [result[0], result[1], result[2], result[3]];
}
