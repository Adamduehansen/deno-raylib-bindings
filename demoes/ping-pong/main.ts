import {
  closeWindow,
  getScreenHeight,
  getScreenWidth,
  initWindow,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import {
  Actor,
  ComponentManager,
  DrawSystem,
  EntityCollection,
  System,
} from "@adamduehansen/saga";

const PADDLE_HEIGHT = 200;
const PADDLE_WIDTH = 25;

class Player extends Actor {
  constructor() {
    super({
      x: getScreenWidth() - 100,
      y: getScreenHeight() / 2 - PADDLE_HEIGHT / 2,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    });
  }

  override update(): void {
    console.log("Updating the player");
  }
}

initWindow({
  title: "Ping pong",
  width: 1280,
  height: 720,
});

setTargetFPS(60);

const componentManager = new ComponentManager();
const entityCollection = new EntityCollection();
const systems: System[] = [new DrawSystem()];

const player = new Player();
componentManager.add(player, player.transform);
componentManager.add(player, player.graphic);
entityCollection.add(player);

while (windowShouldClose() === false) {
  for (const entity of entityCollection) {
    if (entity.update) {
      entity.update();
    }
  }
  for (const system of systems) {
    system.process(entityCollection, componentManager);
  }
}

closeWindow();
