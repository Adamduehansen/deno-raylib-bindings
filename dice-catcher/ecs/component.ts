import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";
import {
  getFrameTime,
  RaylibTexture,
  White,
} from "@adamduehansen/raylib-bindings/r-core";

export abstract class Component {}

export class TransformComponent implements Component {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public rotation = 0,
  ) {}
}

export class VelocityComponent implements Component {
  constructor(public dx: number = 0, public dy: number = 0) {}
}

export class RotationComponent implements Component {
  constructor(public rotation: number) {}
}

export class GraphicComponent implements Component {
  constructor(readonly texture: RaylibTexture) {}

  draw(pos: { x: number; y: number }, rotation: number): void {
    drawTexturePro({
      texture: this.texture,
      source: {
        x: 0,
        y: 0,
        width: this.texture.width,
        height: this.texture.height,
      },
      dest: {
        x: pos.x,
        y: pos.y,
        width: this.texture.width,
        height: this.texture.height,
      },
      origin: {
        x: this.texture.width / 2,
        y: this.texture.height / 2,
      },
      rotation: rotation ?? 0,
      tint: White,
    });
  }
}

interface Options {
  ms: number;
  callback: () => void;
}

export class TimerComponent implements Component {
  private _ms: number;
  private _callback: () => void;
  private elapsed: number = 0;

  constructor(options: Options) {
    this._ms = options.ms / 1000;
    this._callback = options.callback;
  }

  update(): void {
    this.elapsed += getFrameTime();

    if (this.elapsed > this._ms) {
      this._callback();
      this.elapsed = 0;
    }
  }
}

export class OffscreenComponent implements Component {}
