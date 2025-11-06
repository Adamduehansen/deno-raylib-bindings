import { Scene } from "@src/scene.ts";
import { Text } from "@src/entity.ts";
import {
  getScreenHeight,
  getScreenWidth,
  Gray,
  isKeyPressed,
  KeyEnter,
  measureText,
} from "../../raylib-bindings.ts";
import { vec } from "@src/math.ts";

export class GameOverScene extends Scene {
  constructor() {
    super();

    const text = "PRESS [ENTER] TO PLAY AGAIN";
    this.entityManager.add(
      new Text(text, {
        color: Gray,
        fontSize: 20,
        pos: vec(
          getScreenWidth() / 2 - measureText(text, 20) / 2,
          getScreenHeight() / 2 - 50,
        ),
      }),
    );
  }

  override update(): void {
    if (isKeyPressed(KeyEnter)) {
      this.eventEmitter.emit("goToGameScene");
    }
  }
}
