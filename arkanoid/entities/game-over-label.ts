import { Entity, Scene, vec } from "@adamduehansen/engine";
import {
  drawTextEx,
  getFontDefault,
  measureText,
} from "@adamduehansen/raylib-bindings/r-text";
import { DarkGray } from "@adamduehansen/raylib-bindings/r-core";

const TEXT = "Game over!";

export default class GameOverLabel extends Entity {
  override update(scene: Scene): void {
    const textLength = measureText(TEXT, 32);
    this.pos = vec(
      scene.game!.width / 2 - textLength / 2,
      scene.game!.height / 2,
    );
  }

  override draw(): void {
    drawTextEx({
      font: getFontDefault(),
      fontSize: 32,
      position: this.pos,
      spacing: 1,
      text: TEXT,
      tint: DarkGray,
    });
  }
}
