import { Gray, isKeyPressed, KeyEnter } from "../../raylib-bindings.ts";
import { Scene, SceneContext } from "@src/scene.ts";
import { Text } from "@src/entity.ts";
import { vec } from "@src/math.ts";

export class GameOverScene extends Scene {
  #gameOverText = new Text("PRESS [ENTER] TO PLAY AGAIN", {
    color: Gray,
    fontSize: 30,
    pos: vec(0, 0),
  });

  override initialize({ game }: SceneContext): void {
    this.entityManager.add(this.#gameOverText);
    this.#gameOverText.pos = vec(game.width / 2, game.height / 2);
  }

  override update(context: SceneContext): void {
    super.update(context);

    if (isKeyPressed(KeyEnter)) {
      context.game.goToScene("game");
    }
  }
}
