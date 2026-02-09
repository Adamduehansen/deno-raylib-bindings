import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  getScreenWidth,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import {
  loadTexture,
  unloadTexture,
} from "@adamduehansen/raylib-bindings/r-textures";
import ComponentManager from "./component-manager.ts";
import {
  GraphicComponent,
  PositionComponent,
  TimerComponent,
  VelocityComponent,
} from "./component.ts";
import GraphicSystem from "./graphic-system.ts";
import Entity from "./entity.ts";
import TimerSystem from "./timer-system.ts";
import FallSystem from "./fall-system.ts";

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

const backgroundTexture = loadTexture("./assets/GemBg.png");
const diceTexture = loadTexture("./assets/Dice.png");

let entities: Entity[] = [];

const background = new Entity(entityId++);
componentManager.addComponent(background, new PositionComponent(-100, -300));
componentManager.addComponent(
  background,
  new GraphicComponent(backgroundTexture),
);
entities.push(background);

componentManager.removeComponent(background, GraphicComponent);
componentManager.removeComponent(background, PositionComponent);
entities = entities.filter((entity) => entity.id === background.id);

const diceSpawner = new Entity(entityId++);
componentManager.addComponent(
  diceSpawner,
  new TimerComponent({
    ms: 1000,
    callback: () => {
      const dice = new Entity(entityId++);
      const spawnX = Math.floor(Math.random() * getScreenWidth());
      componentManager.addComponent(dice, new PositionComponent(spawnX, -80));
      componentManager.addComponent(dice, new VelocityComponent(0, 2));
      componentManager.addComponent(dice, new GraphicComponent(diceTexture));
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

unloadTexture(diceTexture);
unloadTexture(backgroundTexture);

closeWindow();
