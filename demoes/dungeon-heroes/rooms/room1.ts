import { Scene } from "../core/scene.ts";
import { Resources } from "../resources.ts";

export class Room1 extends Scene {
  constructor() {
    super();

    this.addTiledMap(Resources.room1);
  }
}
