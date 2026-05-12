import {
  LOG_DEBUG,
  RaylibVector,
  traceLog,
} from "@adamduehansen/raylib-bindings/r-core";
import { Entity } from "../core/entity.ts";
import { TiledMapResource } from "../core/resource/tiled-map-resource.ts";
import { Scene } from "../core/scene.ts";
import { SpriteSheet } from "../core/sprite-sheet.ts";
import { Player } from "../player/player.ts";

export class Room extends Scene {
  canMoveToPosition(nextPosition: RaylibVector) {
    return true;
  }

  addTiledMap(tiledMapResource: TiledMapResource): void {
    traceLog(
      LOG_DEBUG,
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
      traceLog(LOG_DEBUG, "SCENE:", "Adding tile layer:", `"${layer.name}"`);
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

          const entity = new Entity({
            sprite: sprite,
            position: {
              x: sprite.width * colIndex,
              y: sprite.height * rowIndex,
            },
          });
          this.entities.add(entity);
        }
      }
    }

    for (const layer of tiledMapResource.objectLayers) {
      traceLog(LOG_DEBUG, "SCENE:", "Adding object layer:", `"${layer.name}"`);
      for (const object of layer.objects) {
        if (object.name === "Player") {
          traceLog(LOG_DEBUG, "SCENE:", "Spawning player");
          const player = new Player({
            level: this,
            position: {
              x: Number(object.x),
              y: Number(object.y),
            },
          });
          this.entities.add(player);
        }
      }
    }
  }
}
