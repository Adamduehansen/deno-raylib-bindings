import Scene from "@src/scene.ts";
import Game from "@src/game.ts";
import Player from "./player.ts";
import Health from "./health.ts";
import { vec } from "@src/math.ts";
import level from "./level.txt" with { type: "text" };
import spriteSheet from "./spriteSheet.ts";
import Entity from "@src/entity.ts";
import { RectangleBody } from "@src/body.ts";
import Orc from "./orc.ts";

const PLAYER_MAX_LIFE = 6;

class EntityFactory {
  static get(spriteId: string, args: {
    x: number;
    y: number;
  }): Entity | null {
    const spriteIndex = parseInt(spriteId) - 1;
    const x = spriteIndex % spriteSheet.columns;
    const y = Math.floor(spriteIndex / spriteSheet.columns);
    const sprite = spriteSheet.getSprite(x, y);

    if (spriteId === "0") {
      return null;
    }

    const entity = new Entity();
    entity.useGraphic(sprite);
    if (spriteId === "70" || spriteId === "69") {
      entity.body = null;
    } else {
      if (spriteId === "17" || spriteId === "20") {
        entity.body = new RectangleBody(1, 8);
      } else {
        entity.body = new RectangleBody(8, 8);
      }
    }
    entity.position = vec(args.x, args.y);
    return entity;
  }
}

export default class LevelScene extends Scene {
  private _playerLife = PLAYER_MAX_LIFE;
  private _player = new Player();

  override onInitialize(game: Game): void {
    const health1 = new Health();
    health1.position = vec(0 + 32, 32);
    const health2 = new Health();
    health2.position = vec(8 * 4 + 32, 32);
    const health3 = new Health();
    health3.position = vec(8 * 8 + 32, 32);

    this.entityManager.add(health1);
    this.entityManager.add(health2);
    this.entityManager.add(health3);

    this.camera = {
      target: {
        x: this._player.position.x,
        y: this._player.position.y,
      },
      offset: {
        x: game.window.width / 2,
        y: game.window.height / 2,
      },
      rotation: 0,
      zoom: 4,
    };

    this._parseLevel(level);

    const orc = new Orc();
    orc.position = vec(64, 32);
    this.entityManager.add(orc);

    this._player.position = vec(16, 16);
    this.entityManager.add(this._player);
  }

  private _parseLevel(levelText: string): void {
    const rows = levelText.split("\n");
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      const columns = row.split(",");
      for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
        const entity = EntityFactory.get(columns[columnIndex], {
          x: columnIndex * spriteSheet.spriteWidth,
          y: rowIndex * spriteSheet.spriteHeight,
        });

        if (entity === null) {
          continue;
        }

        this.entityManager.add(entity);
      }
    }
  }

  override onUpdate(game: Game): void {
    super.onUpdate(game);

    this.camera.target = {
      x: this._player.position.x,
      y: this._player.position.y,
    };
  }
}
