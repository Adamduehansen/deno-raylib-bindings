import { Red } from "@adamduehansen/raylib-bindings/r-core";
import GameContext from "./saga/game-context.ts";
import Game from "./saga/game.ts";
import { RectangleGraphics, TextureGraphics } from "./saga/graphic.ts";
import { TextureResource } from "./saga/resource.ts";
import Sprite from "./saga/sprite.ts";

const Resources = {
  wizard: new TextureResource("./assets/Tiles/tile_0084.png"),
  knight: new TextureResource("./assets/Tiles/tile_0097.png"),
} as const;

class Wizard extends Sprite {
  constructor() {
    super({
      graphics: new TextureGraphics({
        textureResource: Resources.wizard,
      }),
      position: {
        x: 100,
        y: 100,
      },
    });
  }
}

class Knight extends Sprite {
  constructor() {
    super({
      graphics: new TextureGraphics({
        textureResource: Resources.knight,
      }),
      position: {
        x: 200,
        y: 200,
      },
    });
  }
}

class Tile extends Sprite {
  constructor() {
    super({
      graphics: new RectangleGraphics({
        width: 16,
        height: 16,
        color: Red,
      }),
      position: {
        x: 142,
        y: 142,
      },
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

    const tile = new Tile();
    this.entityCollection.add(tile);
  }
}

using game = new Game(new DungeonHeroes());
game.start();
