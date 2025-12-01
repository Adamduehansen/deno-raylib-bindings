import { vec } from "@src/math.ts";
import Entity, { Beholder, Floor, Player, Wall } from "./entity.ts";
import {
  beginMode2D,
  Camera,
  endMode2D,
  getScreenHeight,
  getScreenWidth,
  Vector,
} from "@src/r-core.ts";

type LevelLayout = EntityKey[][];

type EntityKey = "w" | "f" | "p" | "b";

class EntityFactory {
  get(
    entityKey: EntityKey,
    position: Vector,
  ): Entity | never {
    switch (entityKey) {
      case "w":
        return new Wall({
          position: position,
        });
      case "f":
        return new Floor({
          position: position,
        });
      case "p":
        return new Player({
          position: position,
        });
      case "b":
        return new Beholder({
          position: position,
        });
    }
  }
}

abstract class Level {
  private _entities: Entity[];
  private _entityFactory = new EntityFactory();
  private _camera: Camera;

  constructor(layout: LevelLayout) {
    this._entities = this._parseLayout(layout);

    const player = this._entities.find((entity) => entity.name === "player")!;
    this._camera = {
      target: {
        x: player.position.x,
        y: player.position.y,
      },
      offset: {
        x: getScreenWidth() / 2,
        y: getScreenHeight() / 2,
      },
      rotation: 0,
      zoom: 4,
    };
  }

  update(): void {
    for (const entity of this._entities) {
      entity.update();
    }

    const player = this._entities.find((entity) => entity.name === "player")!;
    this._camera.target = {
      x: player.position.x,
      y: player.position.y,
    };
  }

  render(): void {
    beginMode2D(this._camera);

    for (const entity of this._entities) {
      entity.render();
    }

    endMode2D();
  }

  private _parseLayout(levelLayout: LevelLayout): Entity[] {
    const entities: Entity[] = [];
    for (let rowIndex = 0; rowIndex < levelLayout.length; rowIndex++) {
      const row = levelLayout[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const key = row[columnIndex];
        entities.push(
          this._entityFactory.get(key, vec(columnIndex * 8, rowIndex * 8)),
        );
      }
    }

    return entities.toSorted((entityA, entityB) => entityA.z - entityB.z);
  }
}

export class Level1 extends Level {
  constructor() {
    super([
      ["w", "w", "w", "w", "w", "w", "w"],
      ["w", "f", "f", "f", "f", "f", "w"],
      ["w", "f", "p", "f", "f", "f", "w"],
      ["w", "f", "f", "f", "f", "f", "w"],
      ["w", "f", "f", "f", "b", "f", "w"],
      ["w", "f", "f", "f", "f", "f", "w"],
      ["w", "w", "w", "w", "w", "w", "w"],
    ]);
  }
}
