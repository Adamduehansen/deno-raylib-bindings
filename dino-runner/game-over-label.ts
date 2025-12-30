import { Entity, vec } from "@adamduehansen/engine";
import {
  DarkGray,
  getScreenWidth,
} from "@adamduehansen/raylib-bindings/r-core";
import {
  drawTextEx,
  getFontDefault,
  measureText,
} from "@adamduehansen/raylib-bindings/r-text";
import { Scene } from "../engine/scene.ts";

const text = "Game over";

export default class GameOverLabel extends Entity {
  override initialize(scene: Scene): void {
    super.initialize(scene);

    this.hide = true;

    scene.events.on("game_ended", () => {
      this.hide = false;
    });

    scene.events.on("game_waiting", () => {
      this.hide = true;
    });
  }

  override draw(): void {
    drawTextEx({
      text: text,
      fontSize: 32,
      tint: DarkGray,
      spacing: 1,
      font: getFontDefault(),
      position: vec(getScreenWidth() / 2 - measureText(text, 32) / 2, 0),
    });
  }
}
