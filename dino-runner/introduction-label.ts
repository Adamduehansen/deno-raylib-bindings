import { Entity, vec } from "@adamduehansen/engine";
import {
  drawTextEx,
  getFontDefault,
  measureText,
} from "@adamduehansen/raylib-bindings/r-text";
import {
  DarkGray,
  getScreenWidth,
} from "@adamduehansen/raylib-bindings/r-core";
import { Scene } from "../engine/scene.ts";

const text = "Press space to start";

export default class IntroductionLabel extends Entity {
  override initialize(scene: Scene): void {
    super.initialize(scene);

    scene.events.on("game_started", () => {
      this.hide = true;
    });

    scene.events.on("game_waiting", () => {
      this.hide = false;
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
