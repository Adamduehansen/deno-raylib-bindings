import { Scene } from "@adamduehansen/saga";
import { Player } from "./player.ts";

export class GameScene extends Scene {
  player?: Player;

  constructor() {
    super();
  }

  override init(): void {
    this.player = new Player();
    this.entities.add(this.player);
  }
}
