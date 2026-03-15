import {
  closeWindow,
  getScreenHeight,
  getScreenWidth,
  initWindow,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import {
  ComponentManager,
  DrawSystem,
  Entity,
  EntityCollection,
  GraphicComponent,
  Rectangle,
  System,
  TransformComponent,
} from "@adamduehansen/saga";

initWindow({
  title: "Ping pong",
  width: 1280,
  height: 720,
});

setTargetFPS(60);

const componentManager = new ComponentManager();
const entityCollection = new EntityCollection();
const systems: System[] = [new DrawSystem()];

const PADDLE_HEIGHT = 200;
const PADDLE_WIDTH = 25;

const player = new Entity();
componentManager.add(
  player,
  new TransformComponent({
    x: getScreenWidth() - 100,
    y: getScreenHeight() / 2 - PADDLE_HEIGHT / 2,
  }),
);
const graphicComponent = new GraphicComponent(
  new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT),
);
componentManager.add(player, graphicComponent);
entityCollection.add(player);

while (windowShouldClose() === false) {
  for (const system of systems) {
    system.process(entityCollection, componentManager);
  }
}

closeWindow();
