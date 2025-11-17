import { Gray, isKeyPressed, KeyEnter } from "../../raylib-bindings.ts";
import { Scene } from "@src/scene.ts";
import { Text } from "@src/entity.ts";
import { vec } from "@src/math.ts";
import { Game } from "@src/game.ts";

export class GameOverScene extends Scene {
  #gameOverText = new Text("PRESS [ENTER] TO PLAY AGAIN", {
    color: Gray,
    fontSize: 30,
    pos: vec(0, 0),
  });

  override initialize(game: Game): void {
    this.entityManager.add(this.#gameOverText);
    this.#gameOverText.pos = vec(game.width / 2, game.height / 2);
  }

  override update(game: Game): void {
    super.update(game);

    if (isKeyPressed(KeyEnter)) {
      game.goToScene("game");
    }
  }
}
