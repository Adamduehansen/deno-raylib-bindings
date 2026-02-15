import GameContext from "./saga/game-context.ts";
import Game from "./saga/game.ts";
import { Entity } from "./saga/entity.ts";
import GraphicSystem from "./saga/graphic-system.ts";
import System from "./saga/system.ts";
import { TextureResource } from "./saga/resource.ts";

const Resources = {
  wizard: new TextureResource("./assets/Tiles/tile_0084.png"),
  knight: new TextureResource("./assets/Tiles/tile_0097.png"),
} as const;

class Wizard extends Entity {
  constructor() {
    super({
      textureResource: Resources.wizard,
    });
  }
}

class Knight extends Entity {
  constructor() {
    super({
      textureResource: Resources.knight,
    });
  }
}

class DungeonHeroes extends GameContext {
  constructor() {
    super({
      title: "Dungeon Heroes",
      width: 1280,
      height: 720,
      resources: Resources,
    });
  }

  override onInitialize(): void {
    this.logger.info("Game initialized!");

    const hero = new Wizard();
    this.entityCollection.add(hero);

    const knight = new Knight();
    this.entityCollection.add(knight);
  }

  override getSystems(): System[] {
    return [new GraphicSystem(this)];
  }
}

using game = new Game(new DungeonHeroes());
game.start();
