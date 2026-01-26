import Material from "./material.ts";
import Shape from "./shapes/shape.ts";
import { add, scale, Vector2 } from "./vector2.ts";

export default class RigidBody {
  invertMass: number;
  forceAccumilator: Vector2;
  velocity: Vector2;
  material: Material;
  isKinematic = false;

  constructor(readonly shape: Shape, readonly mass: number = 1) {
    if (mass > 0) {
      this.invertMass = 1 / mass;
    } else {
      this.mass = 0;
      this.invertMass = 0;
      this.isKinematic = true;
    }

    this.forceAccumilator = new Vector2(0, 0);
    this.velocity = new Vector2(0, 0);
    this.material = new Material();
  }

  addForce(force: Vector2): void {
    this.forceAccumilator.add(force);
  }

  addVelocity(velocity: Vector2): void {
    this.velocity.add(velocity);
  }

  getVelocity(): Vector2 {
    return this.velocity;
  }

  setVelocity(velocity: Vector2): void {
    this.velocity = velocity.copy();
  }

  update(deltaTime: number) {
    this.integrate(deltaTime);

    this.velocity.scale(0.99);
    this.forceAccumilator = new Vector2(0, 0);
  }

  integrate(deltaTime: number) {
    this.semiImplicitEuler(deltaTime);
  }

  semiImplicitEuler(deltaTime: number): void {
    const acceleration = scale(this.forceAccumilator, this.invertMass);
    this.velocity = add(this.velocity, scale(acceleration, deltaTime));
    const deltaPosition = scale(this.velocity, deltaTime);
    this.shape.move(deltaPosition);
  }

  forwardEuler(deltaTime: number): void {
    const acceleration = scale(this.forceAccumilator, this.invertMass);
    const deltaPosition = scale(this.velocity, deltaTime);
    this.shape.move(deltaPosition);
    this.velocity = add(this.velocity, scale(acceleration, deltaTime));
  }

  midPointMethod(deltaTime: number): void {
    const acceleration = scale(this.forceAccumilator, this.invertMass);
    const halfAcceleration = scale(acceleration, 0.5);
    this.velocity = add(this.velocity, scale(halfAcceleration, deltaTime));
    const deltaPosition = scale(this.velocity, deltaTime);
    this.shape.move(deltaPosition);
    this.velocity = add(this.velocity, scale(halfAcceleration, deltaTime));
  }

  rungeKutta4(deltaTime: number) {
    const computeAcceleration = (force: Vector2, invMass: number) =>
      scale(force, invMass);

    // Compute k1
    let acceleration = computeAcceleration(
      this.forceAccumilator,
      this.invertMass,
    );
    const k1 = scale(acceleration, deltaTime);

    // Compute k2
    let tempForce = add(this.forceAccumilator, scale(k1, 0.5));
    acceleration = computeAcceleration(tempForce, this.invertMass);
    const k2 = scale(acceleration, deltaTime);

    // Compute k3
    tempForce = add(this.forceAccumilator, scale(k2, 0.5));
    acceleration = computeAcceleration(tempForce, this.invertMass);
    const k3 = scale(acceleration, deltaTime);

    // Compute k4
    tempForce = add(this.forceAccumilator, scale(k3, 0.5));
    acceleration = computeAcceleration(tempForce, this.invertMass);
    const k4 = scale(acceleration, deltaTime);

    // Combine to get the new velocity
    // ((k2 x 2) + k1) + (k3 x 2) + k4) / 6
    // (k1 + 2xk2 + 2xk3 + k4) / 6
    const deltaVelocity = scale(
      add(add(k1, scale(k2, 2)), add(scale(k3, 2), k4)),
      1 / 6,
    );
    this.velocity = add(this.velocity, deltaVelocity);

    const deltaPosition = scale(this.velocity, deltaTime);
    this.shape.move(deltaPosition);
  }

  getShape(): Shape {
    return this.shape;
  }

  log() {
    console.log(
      "Force: x = " + this.forceAccumilator.x + " y = " +
        this.forceAccumilator.y,
    );
    console.log("Velocity: x = " + this.velocity.x + " y = " + this.velocity.y);
  }
}
