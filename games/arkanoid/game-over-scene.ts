import { Scene } from "@src/scene.ts";
import { Text } from "@src/entity.ts";
import {
  Gray,
  isKeyPressed,
  KeyEnter,
  measureText,
} from "../../raylib-bindings.ts";
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

  override initialize(): void {
    this.#gameOverText.pos = vec(
      this.game!.width / 2 - measureText(this.#gameOverText.text, 20) / 2,
      this.game!.height / 2 - 50,
    );
  }

  override update(): void {
    if (isKeyPressed(KeyEnter)) {
      this.game?.goToScene("game");
    }
  }
}
