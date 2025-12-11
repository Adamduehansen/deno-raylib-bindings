import Entity from "@src/entity.ts";
import spriteSheet from "./spriteSheet.ts";
import { RectangleBody } from "@src/body.ts";

export default class Orc extends Entity {
  constructor() {
    super();

    this.useGraphic(spriteSheet.getSprite(11, 0));

    this.body = new RectangleBody(8, 8);
  }
}
