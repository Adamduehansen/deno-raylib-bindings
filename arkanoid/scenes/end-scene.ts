import { KeySpace } from "@adamduehansen/raylib-bindings/r-core";
import { Game, Scene } from "@adamduehansen/engine";
import GameOverLabel from "../entities/game-over-label.ts";

export class EndScene extends Scene {
  private readonly _gameOverLabel = new GameOverLabel();

  override initialize(game: Game): void {
    super.initialize(game);
    this.entities.add(this._gameOverLabel);
  }

  override onKeyPress(key: number, scene: Scene): void {
    if (key !== KeySpace) {
      return;
    }

    scene.game?.goToScene("game-scene");
  }
}
