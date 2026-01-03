import { Game, Scene } from "@adamduehansen/engine";
import {
  getFrameTime,
  getMousePosition,
  isMouseButtonDown,
  isMouseButtonUp,
  MouseButtonLeft,
  MouseButtonRight,
  RayWhite,
  Red,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";

class Vector {
  private _length = 0;

  constructor(public x: number, public y: number) {}

  normalize(): void {
    this._length = this.length();
    this.x /= this._length;
    this.y /= this._length;
  }

  length2(): number {
    return this.x * this.x + this.y * this.y;
  }

  length(): number {
    return Math.sqrt(this.length2());
  }

  getNormal(): Vector {
    return new Vector(this.y, -this.x);
  }

  dot(vec: Vector): number {
    return this.x * vec.x + this.y * vec.y;
  }

  copy(): Vector {
    return new Vector(this.x, this.y);
  }

  add(vec: Vector): void {
    this.x += vec.x;
    this.y += vec.y;
  }

  sub(vec: Vector): void {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  scale(scalar: number): void {
    this.x *= scalar;
    this.y *= scalar;
  }

  cross(vec: Vector): number {
    return this.x * vec.x - this.y * vec.y;
  }

  log(): void {
    console.log("x: ", this.x, " - y: ", this.y);
  }
}

class MainScene extends Scene {
  private _mousePos = [0, 0];
  private _mouseDownLeft = false;
  private _mouseDownRight = false;

  override update(): void {
    super.update();

    const deltaTime = getFrameTime();
    const mouse = getMousePosition();
    this._mousePos = [mouse.x, mouse.y];
    console.log(this._mousePos);

    if (isMouseButtonDown(MouseButtonLeft)) {
      this._mouseDownLeft = true;
    }
    if (isMouseButtonUp(MouseButtonLeft)) {
      this._mouseDownLeft = false;
    }

    if (isMouseButtonDown(MouseButtonRight)) {
      this._mouseDownRight = true;
    }

    if (isMouseButtonUp(MouseButtonRight)) {
      this._mouseDownRight = false;
    }

    console.log(this._mouseDownLeft, this._mouseDownRight);
  }

  override draw(): void {
    super.draw();

    drawRectangleRec({
      color: Red,
      rectangle: {
        x: 20,
        y: 40,
        height: 50,
        width: 50,
      },
    });
  }

  override onKeyPress(key: number): void {
    console.log(key);
  }
}

const game = new Game({
  title: "Physic",
  height: 720,
  width: 1280,
  targetFps: 60,
  scenes: {
    "main-scene": new MainScene(),
  },
  background: RayWhite,
});
game.init();
game.run();
game.close();
