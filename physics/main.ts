// import { Game, Scene } from "@adamduehansen/engine";
// import {
//   getFrameTime,
//   getMousePosition,
//   isMouseButtonDown,
//   isMouseButtonUp,
//   MouseButtonLeft,
//   MouseButtonRight,
//   RayWhite,
//   Red,
// } from "@adamduehansen/raylib-bindings/r-core";
// import { drawRectangleRec } from "@adamduehansen/raylib-bindings/r-shapes";

// class MainScene extends Scene {
//   private _mousePos = [0, 0];
//   private _mouseDownLeft = false;
//   private _mouseDownRight = false;

//   override update(): void {
//     super.update();

//     const deltaTime = getFrameTime();
//     const mouse = getMousePosition();
//     this._mousePos = [mouse.x, mouse.y];
//     console.log(this._mousePos);

//     if (isMouseButtonDown(MouseButtonLeft)) {
//       this._mouseDownLeft = true;
//     }
//     if (isMouseButtonUp(MouseButtonLeft)) {
//       this._mouseDownLeft = false;
//     }

//     if (isMouseButtonDown(MouseButtonRight)) {
//       this._mouseDownRight = true;
//     }

//     if (isMouseButtonUp(MouseButtonRight)) {
//       this._mouseDownRight = false;
//     }

//     console.log(this._mouseDownLeft, this._mouseDownRight);
//   }

//   override draw(): void {
//     super.draw();

//     drawRectangleRec({
//       color: Red,
//       rectangle: {
//         x: 20,
//         y: 40,
//         height: 50,
//         width: 50,
//       },
//     });
//   }

//   override onKeyPress(key: number): void {
//     console.log(key);
//   }
// }

// const game = new Game({
//   title: "Physic",
//   height: 720,
//   width: 1280,
//   targetFps: 60,
//   scenes: {
//     "main-scene": new MainScene(),
//   },
//   background: RayWhite,
// });
// game.init();
// game.run();
// game.close();

import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  getFrameTime,
  initWindow,
  RayWhite,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import Simulation from "./simulation.ts";

initWindow({
  title: "Physic",
  width: 1200,
  height: 720,
});

setTargetFPS(60);

const simulation = new Simulation();

while (windowShouldClose() === false) {
  const deltaTime = getFrameTime();

  simulation.update(deltaTime);

  beginDrawing();

  clearBackground(RayWhite);

  simulation.draw();

  endDrawing();
}

closeWindow();
