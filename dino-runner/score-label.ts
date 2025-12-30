import { Entity, Scene, vec } from "@adamduehansen/engine";
import { drawText } from "@adamduehansen/raylib-bindings/r-text";
import { DarkGray } from "@adamduehansen/raylib-bindings/r-core";

export default class ScoreLabel extends Entity {
  score = 0;
  highscore = 0;

  override initialize(scene: Scene): void {
    this.pos = vec(5, 2);

    scene.events.on("game_waiting", () => {
      this.score = 0;
    });

    scene.events.on("new_highscore", (highscore) => {
      if (typeof highscore !== "number") {
        return;
      }

      this.highscore = highscore;
    });
  }

  override draw(): void {
    drawText({
      color: DarkGray,
      fontSize: 20,
      posX: this.pos.x,
      posY: this.pos.y,
      text: `Score: ${Math.floor(this.score)}`,
    });

    drawText({
      color: DarkGray,
      fontSize: 20,
      posX: this.pos.x,
      posY: this.pos.y + 20,
      text: `Highscore: ${Math.floor(this.highscore)}`,
    });
  }
}
