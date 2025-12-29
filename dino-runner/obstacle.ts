import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";
import { Entity, RectangleBody, Scene, vec } from "@adamduehansen/engine";
import { Black, Green } from "@adamduehansen/raylib-bindings/r-core";

export default class Obstacle extends Entity {
  constructor() {
    super();

    this.width = 20;
    this.height = 40;
    this.body = new RectangleBody(this, this.width, this.height);
    this.body.color = Black;
    this.name = "obstacle";
  }

  override initialize(scene: Scene): void {
    super.initialize(scene);

    this.vel.x = -250;
    this.pos.x = scene.game?.width ?? 0;
    this.pos.y = (scene.game?.height ?? 0) - 50;

    scene.events.on("game_ended", () => {
      this.vel = vec(0, 0);
    });
  }

  override draw(): void {
    const centerX = this.pos.x - this.width / 2;
    const centerY = this.pos.y - this.height / 2;

    drawRectangleRec({
      color: Green,
      rectangle: {
        x: centerX,
        y: centerY,
        height: this.height,
        width: this.width,
      },
    });
  }
}
