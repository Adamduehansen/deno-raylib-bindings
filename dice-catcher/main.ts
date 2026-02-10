import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import ComponentManager from "./component-manager.ts";
import { TimerComponent } from "./component.ts";
import GraphicSystem from "./graphic-system.ts";
import Entity from "./entity.ts";
import TimerSystem from "./timer-system.ts";
import FallSystem from "./fall-system.ts";
import Background from "./background.ts";
import Dice from "./dice.ts";
import Resources from "./resources.ts";

let entityId = 0;

const componentManager = new ComponentManager();
const graphicSystem = new GraphicSystem(componentManager);
const timerSystem = new TimerSystem(componentManager);
const fallSystem = new FallSystem(componentManager);

initWindow({
  title: "Dice Catcher",
  width: 1152,
  height: 648,
});

Resources.diceTexure.load();
Resources.backgroundTexture.load();

let entities: Entity[] = [];

const background = new Background(entityId++, componentManager);
entities.push(background);

const diceSpawner = new Entity(entityId++);
componentManager.addComponent(
  diceSpawner,
  new TimerComponent({
    ms: 1000,
    callback: () => {
      const dice = new Dice(entityId++, componentManager);
      entities.push(dice);
    },
  }),
);
entities.push(diceSpawner);

setTargetFPS(60);

while (windowShouldClose() === false) {
  timerSystem.update(entities);
  fallSystem.update(entities);

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();
  clearBackground(RayWhite);
  graphicSystem.draw(entities);
  drawFPS(0, 0);
  endDrawing();
}

Resources.diceTexure.unload();
Resources.backgroundTexture.unload();

closeWindow();
