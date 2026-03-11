import {
  closeWindow,
  // getScreenHeight,
  // getScreenWidth,
  initWindow,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import System from "./system.ts";
import DrawSystem from "./draw-system.ts";
import { EntityCollection } from "./entity-collection.ts";
import EntityFactory from "./entity-factory.ts";
import ComponentManager from "./component-manager.ts";
import { Resources } from "./resources.ts";
import Tile from "./tile.ts";
import { Entity } from "./entity.ts";
import { GraphicComponent, TransformComponent } from "./components.ts";
import SpriteSheet from "./sprite-sheet.ts";

initWindow({
  title: "Dungeon heroes",
  width: 1280,
  height: 720,
});

setTargetFPS(60);

for (const resource of Object.values(Resources)) {
  resource.load();
}

const componentManager = new ComponentManager();
const entityCollection = new EntityCollection();

const entityFactory = new EntityFactory(componentManager);

const systems: System[] = [new DrawSystem()];

// entityCollection.add(entityFactory.createWizard({ x: 0, y: 0 }));
// entityCollection.add(entityFactory.createKnight({ x: 200, y: 200 }));
// entityCollection.add(entityFactory.createGhost({ x: 100, y: 100 }));
// entityCollection.add(entityFactory.createManaPotion({ x: 150, y: 150 }));

const spriteSheet = new SpriteSheet(Resources.tilemap, {
  grid: {
    rows: 11,
    columns: 12,
    spriteWidth: 16,
    spriteHeight: 16,
  },
  spacing: {
    margin: {
      x: 1,
      y: 1,
    },
  },
});

const startTile = new Tile();
for (let rowIndex = 0; rowIndex < startTile.cells.length; rowIndex++) {
  const cellRow = startTile.cells[rowIndex];
  for (let columnIndex = 0; columnIndex < cellRow.length; columnIndex++) {
    const cell = cellRow[columnIndex];
    if (cell === 0) {
      continue;
    }

    const tileId = cell & 0x0FFFFFFF;
    const flippedHorizontally = (cell & 0x80000000) !== 0;
    const flippedVertically = (cell & 0x40000000) !== 0;

    const entity = new Entity();
    const transformComponent = new TransformComponent({
      x: columnIndex * 16,
      y: rowIndex * 16,
    });
    componentManager.add(entity, transformComponent);
    const shifted = tileId - 1;
    const spriteX = shifted % spriteSheet.options.grid.columns;
    const spriteY = Math.floor(
      shifted / spriteSheet.options.grid.columns,
    );
    const sprite = spriteSheet.getSprite(spriteX, spriteY);
    sprite.flipHorizontal = flippedHorizontally;
    sprite.flipVertically = flippedVertically;
    const graphicComponent = new GraphicComponent(sprite);
    componentManager.add(entity, graphicComponent);
    entityCollection.add(entity);
  }
}

// for (let i = 0; i < 4300; i++) {
//   const spawnX = Math.floor(Math.random() * getScreenWidth());
//   const spawnY = Math.floor(Math.random() * getScreenHeight());
//   const rand = Math.floor(Math.random() * 4);
//   if (rand === 0) {
//     entityCollection.add(entityFactory.createWizard({ x: spawnX, y: spawnY }));
//   } else if (rand === 1) {
//     entityCollection.add(entityFactory.createKnight({ x: spawnX, y: spawnY }));
//   } else if (rand === 2) {
//     entityCollection.add(entityFactory.createGhost({ x: spawnX, y: spawnY }));
//   } else if (rand === 3) {
//     entityCollection.add(
//       entityFactory.createManaPotion({ x: spawnX, y: spawnY }),
//     );
//   } else {
//     console.log("This wasnt expected!");
//   }
// }

while (windowShouldClose() === false) {
  for (const system of systems) {
    system.process(entityCollection, componentManager);
  }
}

for (const resource of Object.values(Resources)) {
  resource.unload();
}

closeWindow();
