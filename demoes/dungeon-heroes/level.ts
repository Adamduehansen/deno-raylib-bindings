import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { vector2Scale } from "@adamduehansen/raylib-bindings/r-math";
import { Entity } from "./core/entity.ts";
import { EntityCollection } from "./core/entity-collection.ts";
import { SpriteSheet } from "./core/sprite-sheet.ts";
import { Sprite } from "./core/sprite.ts";
import { Resources } from "./resources.ts";
import demoLevel from "./levels/demo.json" with { type: "json" };
import { Ghost } from "./ghost.ts";

const SPRITE_SHEET = new SpriteSheet(Resources.tilemap, {
  grid: {
    spriteHeight: 16,
    spriteWidth: 16,
    rows: 11,
    columns: 12,
  },
  spacing: {
    margin: {
      x: 1,
      y: 1,
    },
  },
});

const TILE_SIZE = 16;

export class DemoLevel {
  width: number;
  height: number;
  playerSpawn: RaylibVector;

  constructor() {
    this.width = demoLevel.width;
    this.height = demoLevel.height;

    const playerSpawn = demoLevel.objects.find((object) =>
      object.type === "PLAYER"
    );
    if (playerSpawn === undefined) {
      throw new Error("No player spawn position found in the level");
    }
    this.playerSpawn = vector2Scale(playerSpawn, TILE_SIZE);
  }

  canMoveToPosition(position: RaylibVector): boolean {
    const levelPosition = vector2Scale(position, 1 / TILE_SIZE);
    if (levelPosition.x >= this.width) {
      return false;
    }

    if (levelPosition.x < 0) {
      return false;
    }

    if (levelPosition.y < 0) {
      return false;
    }

    if (levelPosition.y >= this.height) {
      return false;
    }

    return true;
  }

  addLevelEntitiesToCollection(entityCollection: EntityCollection): void {
    // Add floor
    for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
      for (let colIndex = 0; colIndex < this.width; colIndex++) {
        let sprite: Sprite;
        if (rowIndex === 0) {
          sprite = SPRITE_SHEET.getSprite(2, 4);
        } else {
          sprite = SPRITE_SHEET.getSprite(0, 4);
        }

        const floorTile = new Entity({
          sprite: sprite,
          position: {
            x: colIndex * TILE_SIZE,
            y: rowIndex * TILE_SIZE,
          },
        });
        entityCollection.add(floorTile);
      }
    }

    // Add top and bottom walls
    for (let index = 0; index < this.width; index++) {
      const topWall = new Entity({
        sprite: SPRITE_SHEET.getSprite(4, 3),
        position: {
          x: index * TILE_SIZE,
          y: -TILE_SIZE,
        },
      });
      entityCollection.add(topWall);

      const ceiling = new Entity({
        sprite: SPRITE_SHEET.getSprite(2, 0),
        position: {
          x: index * TILE_SIZE,
          y: -TILE_SIZE * 2,
        },
      });
      entityCollection.add(ceiling);

      const bottomWall = new Entity({
        sprite: SPRITE_SHEET.getSprite(2, 2),
        position: {
          x: index * TILE_SIZE,
          y: this.height * TILE_SIZE,
        },
      });
      entityCollection.add(bottomWall);
    }

    // Add top and bottom walls
    for (let index = 0; index < this.height; index++) {
      const leftWall = new Entity({
        sprite: SPRITE_SHEET.getSprite(1, 1),
        position: {
          x: -TILE_SIZE,
          y: index * TILE_SIZE,
        },
      });
      entityCollection.add(leftWall);

      const rightWall = new Entity({
        sprite: SPRITE_SHEET.getSprite(3, 1),
        position: {
          x: this.width * TILE_SIZE,
          y: index * TILE_SIZE,
        },
      });
      entityCollection.add(rightWall);
    }

    const bottomRightCorner = new Entity({
      sprite: SPRITE_SHEET.getSprite(1, 2),
      position: {
        x: -TILE_SIZE,
        y: this.height * TILE_SIZE,
      },
    });
    entityCollection.add(bottomRightCorner);

    const bottomLeftCorner = new Entity({
      sprite: SPRITE_SHEET.getSprite(3, 2),
      position: {
        x: this.width * TILE_SIZE,
        y: this.height * TILE_SIZE,
      },
    });
    entityCollection.add(bottomLeftCorner);

    const topLeftCeiling = new Entity({
      sprite: SPRITE_SHEET.getSprite(1, 0),
      position: {
        x: -TILE_SIZE,
        y: -TILE_SIZE * 2,
      },
    });
    entityCollection.add(topLeftCeiling);

    const topLeftWall = new Entity({
      sprite: SPRITE_SHEET.getSprite(1, 1),
      position: {
        x: -TILE_SIZE,
        y: -TILE_SIZE,
      },
    });
    entityCollection.add(topLeftWall);

    const topRightCeiling = new Entity({
      sprite: SPRITE_SHEET.getSprite(3, 0),
      position: {
        x: this.width * TILE_SIZE,
        y: -TILE_SIZE * 2,
      },
    });
    entityCollection.add(topRightCeiling);

    const topRightWall = new Entity({
      sprite: SPRITE_SHEET.getSprite(3, 1),
      position: {
        x: this.width * TILE_SIZE,
        y: -TILE_SIZE,
      },
    });
    entityCollection.add(topRightWall);

    // Add objects
    for (const object of demoLevel.objects) {
      switch (object.type) {
        case "GHOST": {
          const ghost = new Ghost({
            x: object.x * TILE_SIZE,
            y: object.y * TILE_SIZE,
          });
          entityCollection.add(ghost);
        }
      }
    }
  }
}
