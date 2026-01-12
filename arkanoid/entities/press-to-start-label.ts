import { Entity, vec } from "@adamduehansen/engine";
import {
  drawTextEx,
  getFontDefault,
  measureText,
} from "@adamduehansen/raylib-bindings/r-text";
import {
  DarkGray,
  getScreenHeight,
  getScreenWidth,
} from "@adamduehansen/raylib-bindings/r-core";
import { Scene } from "../../engine/scene.ts";

const TEXT = "Press space to start";
const SIZE = 32;

export default class PressToStartLabel extends Entity {
  constructor() {
    super();
    this.z = 10;
    this.name = "press-to-start-label";
  }

  override onInitialize(scene: Scene): void {
    const textLength = measureText(TEXT, SIZE);

    this.pos = vec(
      getScreenWidth() / 2 - textLength / 2,
      getScreenHeight() / 2,
    );

    scene.events.on("activate", () => {
      this.hide = true;
    });

    scene.events.on("activated", () => {
      this.hide = false;
    });
  }

  override onDraw(): void {
    drawTextEx({
      font: getFontDefault(),
      fontSize: SIZE,
      position: this.pos,
      spacing: 6,
      text: TEXT,
      tint: DarkGray,
    });
  }
}
