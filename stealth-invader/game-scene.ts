import { Scene, Sprite } from "@adamduehansen/saga";
import { Player } from "./player.ts";
import { Resources } from "./resources.ts";

export class GameScene extends Scene {
  player?: Player;

  constructor() {
    super();
  }

  override init(): void {
    this.player = new Player({
      position: { x: 100, y: 100 },
    });
    this.entities.add(this.player);
  }
}
