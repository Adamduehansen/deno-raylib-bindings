import { Blue, Gray } from "@adamduehansen/raylib-bindings/r-core";
import DrawUtils from "./utils/draw-utils.ts";
import { add, scale, Vector2 } from "./vector2.ts";

export default class CollisionManifold {
  constructor(
    public depth: number,
    public normal: Vector2,
    public penetrationPoint: Vector2,
  ) {
  }

  resolveCollision(): unknown {
  }

  positionalCorrection(): unknown {
  }

  draw(): void {
    const startPoint = add(
      this.penetrationPoint,
      scale(this.normal, this.depth * -1),
    );

    DrawUtils.drawArrow(startPoint, this.penetrationPoint, Blue);
    DrawUtils.drawPoint(this.penetrationPoint, 3, Gray);
  }
}
