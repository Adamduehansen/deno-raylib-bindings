import CollisionManifold from "./collision-manifold.ts";
import Circle from "./shapes/circle.ts";
import Polygon from "./shapes/polygon.ts";
import { add, scale, sub, Vector2 } from "./vector2.ts";

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

  static polygonVsPolygon(
    shapPolygonA: Polygon,
    shapePolygonB: Polygon,
  ): CollisionManifold | null {
    let resultingContact = null;

    const contactPolyA = this.getContactPoint(shapPolygonA, shapePolygonB);
    if (contactPolyA === null) {
      return null;
    }

    const contactPolyB = this.getContactPoint(shapePolygonB, shapPolygonA);
    if (contactPolyB === null) {
      return null;
    }

    if (contactPolyA.depth < contactPolyB.depth) {
      resultingContact = new CollisionManifold(
        contactPolyA.depth,
        contactPolyA.normal,
        contactPolyA.penetrationPoint,
      );
    } else {
      resultingContact = new CollisionManifold(
        contactPolyB.depth,
        scale(contactPolyB.normal, -1),
        contactPolyB.penetrationPoint,
      );
    }

    return resultingContact;
  }

  static getContactPoint(
    shapePolygonA: Polygon,
    shapePolygonB: Polygon,
  ): CollisionManifold | null {
    let contact = null;
    let minumumPentrationDepth = Number.MAX_VALUE;

    for (let i = 0; i < shapePolygonA.normals.length; i++) {
      const pointOnEdge = shapePolygonA.vertices[i];
      const normalOnEdge = shapePolygonA.normals[i];

      const supportPoint = this.findSupportPoint(
        normalOnEdge,
        pointOnEdge,
        shapePolygonB.vertices,
      );
      if (supportPoint === null) {
        return null;
      }
      if (supportPoint.penetrationDepth < minumumPentrationDepth) {
        minumumPentrationDepth = supportPoint.penetrationDepth;
        contact = new CollisionManifold(
          minumumPentrationDepth,
          normalOnEdge,
          supportPoint.vertex,
        );
      }
    }

    return contact;
  }

  static findSupportPoint(
    normalOnEdge: Vector2,
    pointOnEdge: Vector2,
    otherPolygonVertices: Vector2[],
  ): SupportPoint | null {
    let currentDeepestPenetration = 0;
    let supportPoint = null;

    for (let i = 0; i < otherPolygonVertices.length; i++) {
      const vertices = otherPolygonVertices[i];
      const verticesToPointEdge = sub(vertices, pointOnEdge);
      const penetrationDepth = verticesToPointEdge.dot(scale(normalOnEdge, -1));

      if (penetrationDepth > currentDeepestPenetration) {
        currentDeepestPenetration = penetrationDepth;
        supportPoint = new SupportPoint(vertices, currentDeepestPenetration);
      }
    }

    return supportPoint;
  }
}

class SupportPoint {
  constructor(public vertex: Vector2, public penetrationDepth: number) {}
}
