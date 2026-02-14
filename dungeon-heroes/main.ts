import GameContext from "./saga/game-context.ts";
import Game from "./saga/game.ts";
import { Entity } from "./saga/entity.ts";
import GraphicSystem from "./saga/graphic-system.ts";
import System from "./saga/system.ts";
import { TextureResource } from "./saga/resource.ts";
import { drawTexturePro } from "@adamduehansen/raylib-bindings/r-textures";
import { White } from "@adamduehansen/raylib-bindings/r-core";

const Resources = {
  wizard: new TextureResource("./assets/Tiles/tile_0084.png"),
} as const;

class Wizard extends Entity {
  constructor() {
    super();
  }

  override update(): void {
    if (Resources.wizard.texture === undefined) {
      return;
    }

    const { texture } = Resources.wizard;

    drawTexturePro({
      texture: texture,
      source: {
        x: 0,
        y: 0,
        width: texture.width,
        height: texture.height,
      },
      dest: {
        x: 100,
        y: 100,
        width: texture.width,
        height: texture.height,
      },
      origin: {
        x: texture.width / 2,
        y: texture.height / 2,
      },
      rotation: 0,
      tint: White,
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
  }

  override getSystems(): System[] {
    return [new GraphicSystem(this)];
  }
}

using game = new Game(new DungeonHeroes());
game.start();
