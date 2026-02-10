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
import ComponentManager from "./ecs/component-manager.ts";
import { TimerComponent } from "./ecs/component.ts";
import GraphicSystem from "./ecs/graphic-system.ts";
import Entity from "./ecs/entity.ts";
import TimerSystem from "./ecs/timer-system.ts";
import TransformSystem from "./ecs/transform-system.ts";
import Background from "./entities/background.ts";
import Dice from "./entities/dice.ts";
import Resources from "./resources.ts";

let entityId = 0;

const componentManager = new ComponentManager();
const graphicSystem = new GraphicSystem(componentManager);
const timerSystem = new TimerSystem(componentManager);
const fallSystem = new TransformSystem(componentManager);

initWindow({
  title: "Dice Catcher",
  width: 1152,
  height: 648,
});

Resources.diceTexure.load();
Resources.backgroundTexture.load();

const entities: Entity[] = [];

const background = new Background(entityId++, componentManager);
entities.push(background);

const diceSpawner = new Entity(entityId++, componentManager);
componentManager.addComponent(
  diceSpawner,
  new TimerComponent({
    ms: 2000,
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
