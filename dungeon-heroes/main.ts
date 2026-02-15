import GameContext from "./saga/game-context.ts";
import Game from "./saga/game.ts";
import { Graphics } from "./saga/graphic.ts";
import { TextureResource } from "./saga/resource.ts";
import Sprite from "./saga/sprite.ts";
import { Transform } from "./saga/transform.ts";

const Resources = {
  wizard: new TextureResource("./assets/Tiles/tile_0084.png"),
  knight: new TextureResource("./assets/Tiles/tile_0097.png"),
} as const;

class Wizard extends Sprite {
  constructor() {
    super({
      graphic: new Graphics({
        textureResource: Resources.wizard,
      }),
      transform: new Transform({
        x: 100,
        y: 100,
      }),
    });
  }
}

class Knight extends Sprite {
  constructor() {
    super({
      graphic: new Graphics({
        textureResource: Resources.knight,
      }),
      transform: new Transform({
        x: 200,
        y: 200,
      }),
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
}

using game = new Game(new DungeonHeroes());
game.start();
