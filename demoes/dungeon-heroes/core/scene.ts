import { EntityCollection } from "./entity-collection.ts";
import { TiledMapResource } from "./resource/tiled-map-resource.ts";
import { Camera } from "./camera.ts";
import { LOG_DEBUG, traceLog } from "@adamduehansen/raylib-bindings/r-core";
import { SpriteSheet } from "./sprite-sheet.ts";
import { Entity } from "./entity.ts";

export class Scene {
  readonly camera = new Camera();
  readonly entities = new EntityCollection();

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

    for (const layer of tiledMapResource.layers) {
      traceLog(LOG_DEBUG, "Adding layer:", `"${layer.name}"`);
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
  }
}
