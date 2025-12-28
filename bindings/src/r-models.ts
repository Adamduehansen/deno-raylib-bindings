/**
 * Includes bindings for functions in the {@link https://www.raylib.com/cheatsheet/cheatsheet.html#pmodels|rmodels module}.
 *
 * @module
 */

import { raylib } from "./raylib-bindings.ts";

// ----------------------------------------------------------------------------
// Basic geometric 3D shapes drawing functions
// ----------------------------------------------------------------------------

/**
 * Draw a grid (centered at (0, 0, 0)).
 */
export function drawGrid(slices: number, spacing: number): void {
  raylib.symbols.DrawGrid(slices, spacing);
}
