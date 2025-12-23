import { Entity } from "@adamduehansen/engine";
import { drawText } from "@adamduehansen/raylib-bindings/r-text";
import { DarkGray } from "@adamduehansen/raylib-bindings/r-core";

export default class ScoreLabel extends Entity {
  score = 0;

  override draw(): void {
    drawText({
      color: DarkGray,
      fontSize: 20,
      posX: this.pos.x,
      posY: this.pos.y,
      text: `Score: ${Math.floor(this.score)}`,
    });
  }
}
