import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import ComponentManager from "./component-manager.ts";
import { GraphicComponent, TransformComponent } from "./components.ts";
import { Entity } from "./entity.ts";
import { Resources } from "./resources.ts";
import { ImageResource } from "./resource.ts";
import { Sprite } from "./graphic.ts";
import SpriteSheet from "./sprite-sheet.ts";

interface ActorArgs {
  imageResource: ImageResource;
  position: RaylibVector;
}

const spriteSheet = new SpriteSheet(Resources.tilemap, {
  grid: {
    rows: 11,
    columns: 12,
    spriteWidth: 16,
    spriteHeight: 16,
  },
  spacing: {
    margin: {
      x: 1,
      y: 1,
    },
  },
});

export default class EntityFactory {
  constructor(readonly componentManager: ComponentManager) {}

  createActor(args: ActorArgs): Entity {
    const entity = new Entity();
    const sprite = Sprite.fromImage(args.imageResource);
    const graphicComponent = new GraphicComponent(sprite);
    this.componentManager.add(entity, graphicComponent);
    this.componentManager.add(entity, new TransformComponent(args.position));
    return entity;
  }

  createWizard(position: RaylibVector): Entity {
    const piece = this.createActor({
      position: position,
      imageResource: Resources.wizard,
    });
    return piece;
  }

  createKnight(position: RaylibVector): Entity {
    const piece = this.createActor({
      position: position,
      imageResource: Resources.knight,
    });
    return piece;
  }

  createGhost(position: RaylibVector): Entity {
    const entity = new Entity();
    const sprite = spriteSheet.getSprite(0, 9);
    const graphicComponent = new GraphicComponent(sprite);
    this.componentManager.add(entity, graphicComponent);
    this.componentManager.add(entity, new TransformComponent(position));
    return entity;
  }

  createManaPotion(position: RaylibVector): Entity {
    const entity = new Entity();
    const sprite = spriteSheet.getSprite(8, 9);
    const graphicComponent = new GraphicComponent(sprite);
    this.componentManager.add(entity, graphicComponent);
    this.componentManager.add(entity, new TransformComponent(position));
    return entity;
  }

  createFloor(position: RaylibVector): Entity {
    const entity = new Entity();
    const sprite = spriteSheet.getSprite(0, 4);
    const graphicComponent = new GraphicComponent(sprite);
    this.componentManager.add(entity, graphicComponent);
    this.componentManager.add(entity, new TransformComponent(position));
    return entity;
  }
}
