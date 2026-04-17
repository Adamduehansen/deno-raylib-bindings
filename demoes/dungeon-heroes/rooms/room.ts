import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import { EntityCollection } from "../core/entity-collection.ts";
import { Entity } from "../core/entity.ts";
import { SpriteSheet } from "../core/sprite-sheet.ts";
import { Sprite } from "../core/sprite.ts";
import { Ghost } from "../ghost/ghost.ts";
import { Player } from "../player/player.ts";
import { Resources } from "../resources.ts";

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

interface RoomObject {
  type: string;
  x: number;
  y: number;
}

export abstract class Room {
  readonly entityCollection = new EntityCollection();
  readonly player?: Player;

  constructor(
    readonly width: number,
    readonly height: number,
    readonly roomObjects: RoomObject[],
  ) {
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
            x: colIndex,
            y: rowIndex,
          },
        });
        this.entityCollection.add(floorTile);
      }
    }

    // Add top and bottom walls
    for (let index = 0; index < this.width; index++) {
      const topWall = new Entity({
        sprite: SPRITE_SHEET.getSprite(4, 3),
        position: {
          x: index,
          y: -1,
        },
      });
      this.entityCollection.add(topWall);

      const ceiling = new Entity({
        sprite: SPRITE_SHEET.getSprite(2, 0),
        position: {
          x: index,
          y: -1 * 2,
        },
      });
      this.entityCollection.add(ceiling);

      const bottomWall = new Entity({
        sprite: SPRITE_SHEET.getSprite(2, 2),
        position: {
          x: index,
          y: this.height,
        },
      });
      this.entityCollection.add(bottomWall);
    }

    // Add top and bottom walls
    for (let index = 0; index < this.height; index++) {
      const leftWall = new Entity({
        sprite: SPRITE_SHEET.getSprite(1, 1),
        position: {
          x: -1,
          y: index,
        },
      });
      this.entityCollection.add(leftWall);

      const rightWall = new Entity({
        sprite: SPRITE_SHEET.getSprite(3, 1),
        position: {
          x: this.width,
          y: index,
        },
      });
      this.entityCollection.add(rightWall);
    }

    const bottomRightCorner = new Entity({
      sprite: SPRITE_SHEET.getSprite(1, 2),
      position: {
        x: -1,
        y: this.height,
      },
    });
    this.entityCollection.add(bottomRightCorner);

    const bottomLeftCorner = new Entity({
      sprite: SPRITE_SHEET.getSprite(3, 2),
      position: {
        x: this.width,
        y: this.height,
      },
    });
    this.entityCollection.add(bottomLeftCorner);

    const topLeftCeiling = new Entity({
      sprite: SPRITE_SHEET.getSprite(1, 0),
      position: {
        x: -1,
        y: -1 * 2,
      },
    });
    this.entityCollection.add(topLeftCeiling);

    const topLeftWall = new Entity({
      sprite: SPRITE_SHEET.getSprite(1, 1),
      position: {
        x: -1,
        y: -1,
      },
    });
    this.entityCollection.add(topLeftWall);

    const topRightCeiling = new Entity({
      sprite: SPRITE_SHEET.getSprite(3, 0),
      position: {
        x: this.width,
        y: -1 * 2,
      },
    });
    this.entityCollection.add(topRightCeiling);

    const topRightWall = new Entity({
      sprite: SPRITE_SHEET.getSprite(3, 1),
      position: {
        x: this.width,
        y: -1,
      },
    });
    this.entityCollection.add(topRightWall);

    // Add objects
    for (const object of roomObjects) {
      switch (object.type) {
        case "GHOST": {
          const ghost = new Ghost({
            level: this,
            position: {
              x: object.x,
              y: object.y,
            },
          });
          this.entityCollection.add(ghost);
          break;
        }
        case "PLAYER": {
          const player = new Player({
            position: {
              x: object.x,
              y: object.y,
            },
            level: this,
          });
          this.player = player;
          this.entityCollection.add(player);
          break;
        }
      }
    }
  }

  canMoveToPosition(position: RaylibVector): boolean {
    if (position.x >= this.width) {
      return false;
    }

    if (position.x < 0) {
      return false;
    }

    if (position.y < 0) {
      return false;
    }

    if (position.y >= this.height) {
      return false;
    }

    return true;
  }
}
