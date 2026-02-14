import GameContext from "./saga/game-context.ts";
import Game from "./saga/game.ts";
import { Entity } from "./saga/entity.ts";
import GraphicSystem from "./saga/graphic-system.ts";
import System from "./saga/system.ts";

class Hero extends Entity {
  override update(): void {
  }
}

class DungeonHeroes extends GameContext {
  constructor() {
    super({
      title: "Dungeon Heroes",
      width: 1280,
      height: 720,
    });
  }

  override onInitialize(): void {
    this.logger.info("Game initialized!");

    const hero = new Hero();
    this.entityCollection.add(hero);
  }

  override getSystems(): System[] {
    return [new GraphicSystem(this)];
  }
}

using game = new Game(new DungeonHeroes());
game.start();
