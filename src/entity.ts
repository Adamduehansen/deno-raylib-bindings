import { type Color, drawText, Rectangle } from "../raylib-bindings.ts";
import { vec, type Vector } from "./math.ts";
import { Scene } from "./scene.ts";

interface EntityArgs {
  pos: Vector;
  width?: number;
  height?: number;
}

export abstract class Entity {
  pos: Vector;
  scene?: Scene;
  velocity: Vector;

  #body: Rectangle;

  get body(): Rectangle {
    return this.#body;
  }

  constructor(args: EntityArgs) {
    this.pos = args.pos;
    this.velocity = vec(0, 0);
    this.#body = {
      x: args.pos.x,
      y: args.pos.y,
      height: args.height ?? 0,
      width: args.width ?? 0,
    };
  }

  update(): void {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    this.#body = {
      x: this.pos.x,
      y: this.pos.y,
      width: this.body.width,
      height: this.body.height,
    };
  }

  initialize(): void {}

  abstract render(): void;
}

interface TextOptions {
  color: Color;
  fontSize: number;
  pos: Vector;
}

export class Text extends Entity {
  readonly text: string;
  readonly color: Color;
  readonly fontSize: number;

  constructor(text: string, options: TextOptions) {
    super({
      pos: options.pos,
    });
    this.text = text;
    this.color = options.color;
    this.fontSize = options.fontSize;
  }

  override render(): void {
    drawText({
      text: this.text,
      color: this.color,
      fontSize: this.fontSize,
      posX: this.pos.x,
      posY: this.pos.y,
    });
  }
}
