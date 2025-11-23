import { raylib } from "./raylib-bindings.ts";

export function drawGrid(slices: number, spacing: number): void {
  raylib.symbols.DrawGrid(slices, spacing);
}
