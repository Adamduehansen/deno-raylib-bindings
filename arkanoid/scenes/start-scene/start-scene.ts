import { KeySpace } from "@adamduehansen/raylib-bindings/r-core";
import { Game, Scene } from "@adamduehansen/engine";
import InstructionsMessage from "./instructions-message.ts";

export default class StartScene extends Scene {
  override onInitialize(game: Game): void {
    super.onInitialize(game);

    this.entities.add(new InstructionsMessage());
  }

  override onKeyPress(key: number, scene: Scene): void {
    if (key !== KeySpace) {
      return;
    }

    scene.game.goToScene("level-1");
  }
}
