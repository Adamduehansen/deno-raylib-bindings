import {
  closeWindow,
  getScreenHeight,
  getScreenWidth,
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

entityCollection.add(entityFactory.createWizard({ x: 0, y: 0 }));
entityCollection.add(entityFactory.createKnight({ x: 200, y: 200 }));

for (let i = 0; i < 4500; i++) {
  const spawnX = Math.floor(Math.random() * getScreenWidth());
  const spawnY = Math.floor(Math.random() * getScreenHeight());
  entityCollection.add(entityFactory.createWizard({ x: spawnX, y: spawnY }));
}

while (windowShouldClose() === false) {
  for (const system of systems) {
    system.process(entityCollection, componentManager);
  }
}

for (const resource of Object.values(Resources)) {
  resource.unload();
}

closeWindow();
