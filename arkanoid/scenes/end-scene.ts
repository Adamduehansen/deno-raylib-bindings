import { Scene } from "@adamduehansen/engine";
import { drawText } from "@adamduehansen/raylib-bindings/r-text";
import { DarkGray } from "@adamduehansen/raylib-bindings/r-core";
import { Game } from "../../engine/game.ts";

export class EndScene extends Scene {
  override initialize(game: Game): Promise<void> {
    return Promise.resolve();
  }

  override update(): void {
  }

  override draw(): void {
    drawText({
      color: DarkGray,
      fontSize: 24,
      posX: 0,
      posY: 0,
      text: "Game over!",
    });
  }
}
