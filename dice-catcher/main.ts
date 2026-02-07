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
import {
  loadTexture,
  unloadTexture,
} from "@adamduehansen/raylib-bindings/r-textures";
import ComponentManager from "./component-manager.ts";
import { GraphicComponent, PositionComponent } from "./component.ts";
import GraphicSystem from "./graphic-system.ts";
import Entity from "./entity.ts";

const componentManager = new ComponentManager();
const graphicSystem = new GraphicSystem(componentManager);

initWindow({
  title: "Dice Catcher",
  width: 1152,
  height: 648,
});

const backgroundTexture = loadTexture("./assets/GemBg.png");
const diceTexture = loadTexture("./assets/Dice.png");

const background = new Entity(1);
componentManager.addComponent(background, new PositionComponent(-100, -300));
componentManager.addComponent(
  background,
  new GraphicComponent(backgroundTexture),
);

const entities = [background];

setTargetFPS(60);

while (windowShouldClose() === false) {
  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();
  clearBackground(RayWhite);
  graphicSystem.draw(entities);
  endDrawing();
}

unloadTexture(diceTexture);
unloadTexture(backgroundTexture);

closeWindow();
