import { Vector } from "./r-core.ts";

/**
 * Creates a new {@linkcode Vector} from x and y.
 */
export function vec(x: number, y: number): Vector {
  return {
    x: x,
    y: y,
  };
}
