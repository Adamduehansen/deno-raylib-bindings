import { SpriteSheet } from "@src/graphics.ts";
import { Resources } from "./resources.ts";
import ScreenElement from "@src/screen-element.ts";

const spriteSheet = SpriteSheet.fromImage(Resources.spriteSheet, {
  columns: 16,
  rows: 10,
  spriteHeight: 8,
  spriteWidth: 8,
  spacing: {
    x: 1,
    y: 1,
  },
});

export default class Health extends ScreenElement {
  constructor() {
    super();

    this.addGraphic("heart-full", spriteSheet.getSprite(6, 6));
    this.addGraphic("heart-empty", spriteSheet.getSprite(4, 6));
    this.useGraphic("heart-full");
  }
}
