import { Blue, Gray } from "@adamduehansen/raylib-bindings/r-core";
import DrawUtils from "./utils/draw-utils.ts";
import { add, scale, sub, Vector2 } from "./vector2.ts";
import RigidBody from "./rigidbody.ts";

export default class CollisionManifold {
  rigiA?: RigidBody;
  rigiB?: RigidBody;

  constructor(
    public depth: number,
    public normal: Vector2,
    public penetrationPoint: Vector2,
  ) {
  }

  resolveCollision(): void {
    if (this.rigiB === undefined || this.rigiA === undefined) {
      return;
    }

    // Linear impulse
    const relativeVelocity = sub(this.rigiB.velocity, this.rigiA.velocity);
    const relativeVelocityAlongNormal = relativeVelocity.dot(this.normal);

    if (relativeVelocityAlongNormal > 0) {
      return;
    }

    if (this.rigiA.isKinematic && this.rigiB.isKinematic) {
      return;
    }

    const invMassSum = this.rigiA.invertMass + this.rigiB.invertMass;

    // const e = Math.min(this.rigiA.material.bounce, this.rigiB.material.bounce);
    const e = (2 * this.rigiA.material.bounce * this.rigiB.material.bounce) /
      (this.rigiA.material.bounce + this.rigiB.material.bounce);

    let j = -(1 + e) * relativeVelocityAlongNormal;
    j /= invMassSum;

    const impulseVector = scale(this.normal, j);
    const impulseVectorRigiA = scale(impulseVector, this.rigiA.invertMass * -1);
    const impulseVectorRigiB = scale(impulseVector, this.rigiB.invertMass);

    this.rigiA.velocity = add(this.rigiA.velocity, impulseVectorRigiA);
    this.rigiB.velocity = add(this.rigiB.velocity, impulseVectorRigiB);
  }

  positionalCorrection(): void {
    const correctionPercentage = 0.2;
    const amountToCorrect = this.depth /
      (this.rigiA?.invertMass + this.rigiB?.invertMass) * correctionPercentage;
    const correctionVector = scale(this.normal, amountToCorrect);

    const rigiAMovement = scale(correctionVector, this.rigiA?.invertMass * -1);
    const rigiBMovement = scale(correctionVector, this.rigiB.invertMass);

    if (this.rigiA?.isKinematic === false) {
      this.rigiA.getShape().move(rigiAMovement);
    }

    if (this.rigiB?.isKinematic === false) {
      this.rigiB.getShape().move(rigiBMovement);
    }
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
