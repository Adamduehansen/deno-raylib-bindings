import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { TiledMapResource } from "../core/resource/tiled-map-resource.ts";
import { Scene } from "../core/scene.ts";
import { SpriteSheet } from "../core/sprite-sheet.ts";
import { Player } from "../entities/player/player.ts";
import { Tile } from "../entities/tile.ts";
import Tp from "../entities/tp.ts";
import { Resources } from "../resources.ts";
import { FollowEntityStrategy } from "../core/camera.ts";
import { Vector } from "../core/vector.ts";

export class GameScene extends Scene {
  player?: Player;

  constructor() {
    super();

    this.camera.zoom = 3;
  }

  override init(): void {
    this.addTiledMap(Resources.room1);

    this.events.on("add_map", () => {
      this.addTiledMap(Resources.room2, {
        x: -Resources.room2.width * Resources.room2.tileWidth,
        y: 0,
      });
    });

    this.camera.strategy = new FollowEntityStrategy(this.player!);
  }

  canMoveToPosition(nextPosition: RaylibVector) {
    const solidTileAtNextPosition = this.entities.find((entity) =>
      entity instanceof Tile &&
      entity.solid &&
      entity.position.x === nextPosition.x &&
      entity.position.y === nextPosition.y
    );
    if (solidTileAtNextPosition !== undefined) {
      return false;
    }

    return true;
  }

  addTiledMap(
    tiledMapResource: TiledMapResource,
    position = Vector.zero,
  ): void {
    this.logger.debug(
      "SCENE:",
      "Adding Tiled map:",
      `"${tiledMapResource.name}"`,
    );

    const texture = tiledMapResource.textures[0];

    const spritesheet = new SpriteSheet(texture, {
      grid: {
        columns: 12,
        rows: 11,
        spriteHeight: 16,
        spriteWidth: 16,
      },
      spacing: {
        margin: {
          x: 0,
          y: 0,
        },
      },
    });

    for (const layer of tiledMapResource.tileLayers) {
      this.logger.debug(
        "SCENE:",
        "Adding tile layer:",
        `"${layer.name}"`,
      );
      const rows = layer.data.content.split("\n").filter((row) => row !== "");
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const spriteIndexes = rows[rowIndex].split(",");
        for (let colIndex = 0; colIndex < spriteIndexes.length; colIndex++) {
          const element = spriteIndexes[colIndex];
          if (element === "0" || element === "") {
            continue;
          }

          const x = (Number(element) % spritesheet.options.grid.columns) - 1;
          const y = Math.floor((Number(element) - 1) / 12);

          const sprite = spritesheet.getSprite(x, y);

          const entity = new Tile({
            sprite: sprite,
            position: {
              x: position.x + sprite.width * colIndex,
              y: position.y + sprite.height * rowIndex,
            },
            solid: Boolean(layer.properties["solid"]?.value),
          });
          this.entities.add(entity);
        }
      }
    }

    for (const layer of tiledMapResource.objectLayers) {
      this.logger.debug(
        "SCENE:",
        "Adding object layer:",
        `"${layer.name}"`,
      );
      for (const object of layer.objects) {
        if (object.name === "player") {
          this.logger.debug("SCENE:", "Spawning player");
          const player = new Player({
            scene: this,
            position: {
              x: Number(object.x),
              y: Number(object.y),
            },
          });
          this.entities.add(player);
          this.player = player;
        } else if (object.name === "tp") {
          this.logger.debug("Scene", "Spawning tp");
          const tp = new Tp({
            position: {
              x: Number(object.x),
              y: Number(object.y),
            },
            destination: object.properties["destination"].value,
          });
          this.entities.add(tp);
        }
      }
    }
  }
}
