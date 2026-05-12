import { Resources } from "../resources.ts";
import { Room } from "./room.ts";

export class Room2 extends Room {
  constructor() {
    super();

    this.addTiledMap(Resources.room2);
  }
}
