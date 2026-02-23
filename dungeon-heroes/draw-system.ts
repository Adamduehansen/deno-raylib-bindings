import {
  beginDrawing,
  beginMode2D,
  clearBackground,
  endDrawing,
  endMode2D,
  getScreenHeight,
  getScreenWidth,
  isKeyDown,
  KeyDown,
  KeyLeft,
  KeyRight,
  KeyUp,
  RaylibCamera,
  RaylibVector,
  RayWhite,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawFPS } from "@adamduehansen/raylib-bindings/r-text";
import System from "./system.ts";
import { EntityCollection } from "./entity-collection.ts";
import ComponentManager from "./component-manager.ts";
import { TextureComponent, TransformComponent } from "./components.ts";

class Camera {
  readonly raylibCamera: RaylibCamera;
  private _cameraTarget: RaylibVector = {
    x: 100,
    y: 100,
  };

  constructor() {
    this.raylibCamera = {
      target: this._cameraTarget,
      offset: {
        x: getScreenWidth() / 2,
        y: getScreenHeight() / 2,
      },
      rotation: 0,
      zoom: 2,
    };
  }

  update(): void {
    if (isKeyDown(KeyLeft)) {
      this._cameraTarget.x -= 5;
    } else if (isKeyDown(KeyRight)) {
      this._cameraTarget.x += 5;
    }

    if (isKeyDown(KeyUp)) {
      this._cameraTarget.y -= 5;
    } else if (isKeyDown(KeyDown)) {
      this._cameraTarget.y += 5;
    }
  }
}

export default class DrawSystem implements System {
  private _camera = new Camera();

  process(
    entityCollection: EntityCollection,
    componentManager: ComponentManager,
  ): void {
    // Update
    // ------------------------------------------------------------------------
    this._camera.update();

    // Drawing
    // ------------------------------------------------------------------------
    beginDrawing();

    clearBackground(RayWhite);

    beginMode2D(this._camera.raylibCamera);
    for (const entity of entityCollection) {
      const hasGraphic = componentManager.has(entity, TextureComponent);
      const hasTransform = componentManager.has(entity, TransformComponent);

      if (hasGraphic === false || hasTransform === false) {
        continue;
      }

      const graphic = componentManager.get(entity, TextureComponent)!;
      const transform = componentManager.get(entity, TransformComponent)!;
      graphic.draw(transform.position);
    }
    endMode2D();

    drawFPS(0, 0);

    endDrawing();
  }
}
