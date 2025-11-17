import {
  Gray,
  isKeyPressed,
  KeyEnter,
  measureText,
} from "../../raylib-bindings.ts";
import { Scene, SceneContext } from "@src/scene.ts";
import { Text } from "@src/entity.ts";
import { vec } from "@src/math.ts";

export class GameOverScene extends Scene {
  #gameOverText: Text;

  constructor() {
    super();

    const text = "PRESS [ENTER] TO PLAY AGAIN";
    this.#gameOverText = new Text(text, {
      color: Gray,
      fontSize: 20,
      pos: vec(0, 0),
    });
    this.entityManager.add(this.#gameOverText);
  }

  override initialize({ game }: SceneContext): void {
    this.#gameOverText.pos = vec(
      game.width / 2 - measureText(this.#gameOverText.text, 20) / 2,
      game.height / 2 - 50,
    );
  }

  override update(context: SceneContext): void {
    super.update(context);

    if (isKeyPressed(KeyEnter)) {
      context.game.goToScene("game");
    }
  }
}
