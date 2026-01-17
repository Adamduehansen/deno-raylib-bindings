import CollisionManifold from "./collision-manifold.ts";
import Circle from "./shapes/circle.ts";
import { add, scale, sub } from "./vector2.ts";

export class CollisionDetection {
  static circleVsCircle(
    circleA: Circle,
    circleB: Circle,
  ): CollisionManifold | null {
    const centroidA = circleA.getCentroid();
    const centroidB = circleB.getCentroid();

    const direction = sub(centroidB, centroidA);
    const circleARadious = circleA.getRadius();
    const circleBRadious = circleB.getRadius();

    const sumRadius = circleARadious + circleBRadious;

    if (direction.length2() < sumRadius * sumRadius) {
      const directionLength = direction.length();
      const penetrationNormal = scale(direction, 1 / directionLength);
      const penetrationDepth = directionLength - sumRadius;
      const penetrationPoint = add(
        centroidA,
        scale(penetrationNormal, circleARadious),
      );

      return new CollisionManifold(
        penetrationDepth * -1,
        penetrationNormal,
        penetrationPoint,
      );
    } else {
      return null;
    }

    // if (direction.length() < circleARadious + circleBRadious) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}
