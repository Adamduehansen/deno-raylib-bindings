import Entity from "./entity.ts";
import { Sprite } from "./graphics.ts";
import { vec } from "./math.ts";
import { White } from "./r-core.ts";
import { drawTexturePro } from "./r-textures.ts";
import Scene from "./scene.ts";

export default abstract class ScreenElement extends Entity {
  override render(scene: Scene): void {
    const currentGraphic = this.graphicsMap.get(
      this.currentGraphicKey,
    ) as Sprite;
    if (currentGraphic === undefined) {
      return;
    }

    drawTexturePro({
      texture: currentGraphic.image.resource!,
      tint: White,
      rotation: 0,
      source: currentGraphic.sourceView,
      dest: {
        x: this.position.x,
        y: this.position.y,
        height: currentGraphic.sourceView.height * scene.currentCamera.zoom,
        width: currentGraphic.sourceView.width * scene.currentCamera.zoom,
      },
      origin: vec(0, 0),
    });
  }
}
