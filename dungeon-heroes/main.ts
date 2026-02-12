import { LOG_INFO, traceLog } from "@adamduehansen/raylib-bindings/r-core";
import GameContext from "./saga/game-context.ts";
import Game from "./saga/game.ts";
import { Entity } from "./saga/entity.ts";

class Hero extends Entity {
  override update(): void {
    traceLog(LOG_INFO, "Hero updated");
  }
}

class DungeonHeroes extends GameContext {
  override onInitialize(): void {
    traceLog(LOG_INFO, "Game initialized!");

    const hero = new Hero();
    this.entityCollection.add(hero);
  }

  override onUpdate(): void {
    traceLog(LOG_INFO, "Game update");
  }
}

using game = new Game(new DungeonHeroes());
game.start();
