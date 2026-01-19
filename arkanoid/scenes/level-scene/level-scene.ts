import { Scene } from "@adamduehansen/engine";
import Paddle from "./paddle.ts";
import { Game } from "../../../engine/game.ts";

export default abstract class LevelScene extends Scene {
  readonly paddle = new Paddle();

  constructor() {
    super();
  }

  override onInitialize(game: Game): void {
    super.onInitialize(game);

    this.entities.add(this.paddle);
  }
}
