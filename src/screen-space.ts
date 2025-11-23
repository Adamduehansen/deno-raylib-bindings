import { toRaylibVector2, toVector, Vector } from "./math.ts";
import { raylib } from "./raylib-bindings.ts";

export interface Camera {
  target: Vector;
  offset: Vector;
  rotation: number;
  zoom: number;
}

export function toRaylibCamera2D(camera: Camera): BufferSource {
  return new Float32Array([
    camera.offset.x,
    camera.offset.y,
    camera.target.x,
    camera.target.y,
    camera.rotation,
    camera.zoom,
  ]);
}

export function getScreenToWorld2D(
  position: Vector,
  camera: Camera,
): Vector {
  return toVector(raylib.symbols.GetScreenToWorld2D(
    toRaylibVector2(position),
    toRaylibCamera2D(camera),
  ));
}
