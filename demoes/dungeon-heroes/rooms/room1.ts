import room1 from "./room1.json" with { type: "json" };
import { Room } from "./room.ts";

export class Room1 extends Room {
  constructor() {
    super(room1.width, room1.height, room1.objects);
  }
}
