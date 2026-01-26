import {
  isKeyDown,
  KeyA,
  KeyD,
  KeyDown,
  KeyLeft,
  KeyRight,
  KeyS,
  KeyUp,
  KeyW,
} from "@adamduehansen/raylib-bindings/r-core";
import { scale, sub, Vector2 } from "./vector2.ts";
import Circle from "./shapes/circle.ts";
import CollisionManifold from "./collision-manifold.ts";
import RigidBody from "./rigidbody.ts";
import { CollisionDetection } from "./collision-detection.ts";
import Rectangle from "./shapes/rectangle.ts";

export default class Simulation {
  collistionManifold: CollisionManifold | null = null;
  rigidBodies: RigidBody[] = [];
  gravity = new Vector2(0, 100);

  constructor(readonly worldSize: Vector2) {
    this.createBoundary();

    this.rigidBodies.push(
      new RigidBody(new Rectangle(new Vector2(300, 300), 200, 100), 60),
    );
    this.rigidBodies.push(
      new RigidBody(new Rectangle(new Vector2(400, 450), 200, 100), 20),
    );
    this.rigidBodies.push(
      new RigidBody(new Rectangle(new Vector2(200, 0), 200, 100), 20),
    );
    this.rigidBodies.push(
      new RigidBody(new Circle(new Vector2(900, 300), 60), 100),
    );
  }

  createBoundary() {
    this.rigidBodies.push(
      new RigidBody(
        new Rectangle(
          new Vector2(this.worldSize.x / 2, -50),
          this.worldSize.x,
          100,
        ),
        0,
      ),
    );
    this.rigidBodies.push(
      new RigidBody(
        new Rectangle(
          new Vector2(this.worldSize.x / 2, this.worldSize.y + 50),
          this.worldSize.x,
          100,
        ),
        0,
      ),
    );
    this.rigidBodies.push(
      new RigidBody(
        new Rectangle(
          new Vector2(-50, this.worldSize.y / 2),
          100,
          this.worldSize.y,
        ),
        0,
      ),
    );
    this.rigidBodies.push(
      new RigidBody(
        new Rectangle(
          new Vector2(this.worldSize.x + 50, this.worldSize.y / 2),
          100,
          this.worldSize.y,
        ),
        0,
      ),
    );
  }

  update(deltaTime: number): void {
    // Handle input
    // ------------------------------------------------------------------------
    const force = 5000;
    const length = this.rigidBodies.length;
    if (isKeyDown(KeyD)) {
      this.rigidBodies[length - 2].addForce(new Vector2(force, 0));
    } else if (isKeyDown(KeyA)) {
      this.rigidBodies[length - 2].addForce(new Vector2(-force, 0));
    }
    if (isKeyDown(KeyS)) {
      this.rigidBodies[length - 2].addForce(new Vector2(0, force));
    } else if (isKeyDown(KeyW)) {
      this.rigidBodies[length - 2].addForce(new Vector2(0, -force));
    }
    // if (isKeyDown(KeyE)) {
    //   this.rigidBodies[0].rotate(rotateRadians);
    // } else if (isKeyDown(KeyQ)) {
    //   this.rigidBodies[0].rotate(-rotateRadians);
    // }

    if (isKeyDown(KeyRight)) {
      this.rigidBodies[length - 1].addForce(new Vector2(force, 0));
    } else if (isKeyDown(KeyLeft)) {
      this.rigidBodies[length - 1].addForce(new Vector2(-force, 0));
    }
    if (isKeyDown(KeyDown)) {
      this.rigidBodies[length - 1].addForce(new Vector2(0, force));
    } else if (isKeyDown(KeyUp)) {
      this.rigidBodies[length - 1].addForce(new Vector2(0, -force));
    }

    // if (isKeyDown(KeyPeriod)) {
    //   this.rigidBodies[1].rotate(rotateRadians);
    // } else if (isKeyDown(KeyComma)) {
    //   this.rigidBodies[1].rotate(-rotateRadians);
    // }

    // Update rigid bodies.
    // ------------------------------------------------------------------------
    for (let i = 0; i < this.rigidBodies.length; i++) {
      this.rigidBodies[i].update(deltaTime);

      // F = gravity *
      const gravitationalForce = scale(this.gravity, this.rigidBodies[i].mass);
      this.rigidBodies[i].addForce(gravitationalForce);
    }

    for (let i = 0; i < this.rigidBodies.length; i++) {
      for (let j = 0; j < this.rigidBodies.length; j++) {
        if (i !== j) {
          const rigiA = this.rigidBodies[i];
          const rigiB = this.rigidBodies[j];
          const collisionManifold = CollisionDetection.checkCollisions(
            rigiA,
            rigiB,
          );
          if (collisionManifold !== null) {
            collisionManifold.positionalCorrection();
            collisionManifold.resolveCollision();
          }
        }
      }
    }
  }

  draw(): void {
    for (let i = 0; i < this.rigidBodies.length; i++) {
      this.rigidBodies[i].getShape().draw();
    }

    if (this.collistionManifold !== null) {
      this.collistionManifold.draw();
    }
  }
}
