import { Entity, Scene, vec } from "@adamduehansen/engine";
import {
  drawTextEx,
  getFontDefault,
  measureText,
} from "@adamduehansen/raylib-bindings/r-text";
import { DarkGray } from "@adamduehansen/raylib-bindings/r-core";

export default class InstructionsMessage extends Entity {
  constructor() {
    super();
  }

  override onInitialize(scene: Scene): void {
    this.pos = vec(scene.game.width / 2, scene.game.height / 2 - 100);
  }

  override onDraw(): void {
    const font = getFontDefault();

    const welcomeMessageText = "Welcome to Arkanoid!";
    const welcomeMessageFontSize = 64;
    const welcomeMessageLength = measureText(
      welcomeMessageText,
      welcomeMessageFontSize,
    );
    drawTextEx({
      text: welcomeMessageText,
      font: font,
      fontSize: welcomeMessageFontSize,
      position: vec(this.pos.x - welcomeMessageLength / 2, this.pos.y),
      spacing: 7,
      tint: DarkGray,
    });

    const pressStartMessageText = "Press space to start";
    const pressStartMessageFontSize = 42;
    const pressStartMessageLength = measureText(
      pressStartMessageText,
      pressStartMessageFontSize,
    );
    drawTextEx({
      text: pressStartMessageText,
      font: font,
      fontSize: pressStartMessageFontSize,
      position: vec(this.pos.x - pressStartMessageLength / 2, this.pos.y + 100),
      spacing: 7,
      tint: DarkGray,
    });
  }
}
