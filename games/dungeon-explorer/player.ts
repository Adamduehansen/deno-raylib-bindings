import Entity from "@src/entity.ts";
import Scene from "@src/scene.ts";
import { Resources } from "./resources.ts";
import { SpriteSheet } from "@src/graphics.ts";

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

export default class Player extends Entity {
  constructor() {
    super();

    this.graphics.add("player", spriteSheet.getSprite(4, 0));
    this.graphics.use("player");
  }

  override onInitialize(_scene: Scene): void {
    console.log("Initializing player");
  }
}
