import { Game } from "./game.ts";
import { Entity } from "@adamduehansen/engine";
import { Scene } from "./scene.ts";
import { drawCircleV } from "@adamduehansen/raylib-bindings/r-shapes";
import {
  Gray,
  isKeyDown,
  KeyA,
  KeyD,
  KeyE,
  KeyQ,
  KeyR,
  KeyS,
  KeyW,
} from "@adamduehansen/raylib-bindings/r-core";
import { vec } from "./vector.ts";
import { CircleBody } from "./physics.ts";

class Circle extends Entity {
  private _radius = 50;

  constructor() {
    super();
  }

  override onInitialize(_scene: Scene): void {
    this.body = new CircleBody(this.pos, this._radius);
  }

  override onDraw(): void {
    drawCircleV({
      center: this.pos,
      color: Gray,
      radius: this._radius,
    });
  }
}

class MainScene extends Scene {
  private _circle1 = new Circle();
  private _rectangle2 = new Circle();

  override onInitialize(_game: Game): void {
    this._circle1.pos = vec(100, 300);
    this._rectangle2.pos = vec(300, 300);

    this.entities.add(this._circle1);
    this.entities.add(this._rectangle2);
  }

  override onUpdate(): void {
    super.onUpdate();

    if (isKeyDown(KeyD)) {
      this._circle1.vel.x = 200;
    } else if (isKeyDown(KeyA)) {
      this._circle1.vel.x = -200;
    } else {
      this._circle1.vel.x = 0;
    }

    if (isKeyDown(KeyW)) {
      this._circle1.vel.y = -200;
    } else if (isKeyDown(KeyS)) {
      this._circle1.vel.y = 200;
    } else {
      this._circle1.vel.y = 0;
    }

    if (isKeyDown(KeyE)) {
      this._circle1.rotate(0.05);
    } else if (isKeyDown(KeyQ)) {
      this._circle1.rotate(-0.05);
    }
  }
}

const game = new Game({
  title: "Example",
  width: 800,
  height: 450,
  scenes: {
    "main": new MainScene(),
  },
});

game.init();

game.run();

game.close();
