import CollisionManifold from "./collision-manifold.ts";
import RigidBody from "./rigidbody.ts";
import Circle from "./shapes/circle.ts";
import Polygon from "./shapes/polygon.ts";
import Shape from "./shapes/shape.ts";
import MathHelper from "./utils/math-helper.ts";
import { add, scale, sub, Vector2 } from "./vector2.ts";

export class CollisionDetection {
  static checkCollisions(
    rigiA: RigidBody,
    rigiB: RigidBody,
  ): CollisionManifold | null {
    let collisionManifold = null;
    const shapeA = rigiA.shape;
    const shapeB = rigiB.shape;

    if (shapeA instanceof Circle && shapeB instanceof Circle) {
      collisionManifold = this.circleVsCircle(shapeA, shapeB);
    } else if (shapeA instanceof Polygon && shapeB instanceof Polygon) {
      collisionManifold = this.polygonVsPolygon(shapeA, shapeB);
    } else if (shapeA instanceof Circle && shapeB instanceof Polygon) {
      collisionManifold = this.circleVsPolygon(shapeA, shapeB);
    }

    if (collisionManifold !== null) {
      collisionManifold.rigiA = rigiA;
      collisionManifold.rigiB = rigiB;
    }

    return collisionManifold;
  }

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

  static circleVsPolygon(
    shapeCircle: Circle,
    shapePolygon: Polygon,
  ): CollisionManifold | null {
    const contact = this.cirleVsPolygonEdges(shapeCircle, shapePolygon);
    if (contact !== null) {
      return contact;
    } else {
      return this.circleVsPolygonCornes(shapeCircle, shapePolygon);
    }
  }

  static cirleVsPolygonEdges(
    shapeCircle: Circle,
    shapePolygon: Polygon,
  ): CollisionManifold | null {
    const verticesLength = shapePolygon.vertices.length;
    const circleCentroid = shapeCircle.centroid;
    let nearestEdgeVertix = null;
    let nearestEdgeNormal = null;

    for (let i = 0; i < verticesLength; i++) {
      const currVertix = shapePolygon.vertices[i];
      const currNormal = shapePolygon.normals[i];
      const nextVertix =
        shapePolygon.vertices[MathHelper.index(i + 1, verticesLength)];

      const vertToCirlce = sub(circleCentroid, currVertix);
      const dirToNext = sub(nextVertix, currVertix);
      const dirToNextLength = dirToNext.length();
      dirToNext.normalize();

      const circleDirToNextProjection = vertToCirlce.dot(dirToNext);
      const circleDirToNormalProjection = vertToCirlce.dot(currNormal);
      if (
        circleDirToNextProjection > 0 &&
        circleDirToNextProjection < dirToNextLength &&
        circleDirToNormalProjection >= 0
      ) {
        nearestEdgeNormal = currNormal;
        nearestEdgeVertix = currVertix;
      }
    }

    if (nearestEdgeNormal === null || nearestEdgeVertix === null) {
      return null;
    }

    const vertixToCircle = sub(circleCentroid, nearestEdgeVertix);
    const projectionToEdgeNormal = nearestEdgeNormal.dot(vertixToCircle);
    if (projectionToEdgeNormal - shapeCircle.radius < 0) {
      const penetrationDepth = projectionToEdgeNormal - shapeCircle.radius;
      const penetrationPoint = add(
        circleCentroid,
        scale(nearestEdgeNormal, shapeCircle.radius * -1),
      );
      return new CollisionManifold(
        penetrationDepth * -1,
        scale(nearestEdgeNormal, -1),
        penetrationPoint,
      );
    }

    return null;
  }

  static circleVsPolygonCornes(
    shapeCircle: Circle,
    shapePolygon: Polygon,
  ): CollisionManifold | null {
    const verticesLength = shapePolygon.vertices.length;
    for (let i = 0; i < verticesLength; i++) {
      const currVertex = shapePolygon.vertices[i];
      const dirToCentroidCircle = sub(currVertex, shapeCircle.centroid);
      if (
        dirToCentroidCircle.length2() < shapeCircle.radius * shapeCircle.radius
      ) {
        const penetrationDepth = shapeCircle.radius -
          dirToCentroidCircle.length();
        dirToCentroidCircle.normalize();
        return new CollisionManifold(
          penetrationDepth,
          dirToCentroidCircle,
          currVertex,
        );
      }
    }

    return null;
  }
}

class SupportPoint {
  constructor(public vertex: Vector2, public penetrationDepth: number) {}
}
