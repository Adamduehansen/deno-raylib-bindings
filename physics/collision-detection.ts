import Circle from "./shapes/circle.ts";
import { sub } from "./vector2.ts";

export class CollisionDetection {
  static circleVsCircle(circleA: Circle, circleB: Circle): boolean {
    const centroidA = circleA.getCentroid();
    const centroidB = circleB.getCentroid();

    const direction = sub(centroidA, centroidB);
    const circleARadious = circleA.getRadius();
    const circleBRadious = circleB.getRadius();

    const sumRadius = circleARadious + circleBRadious;

    if (direction.length2() < sumRadius * sumRadius) {
      return true;
    } else {
      return false;
    }

    // if (direction.length() < circleARadious + circleBRadious) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
}
