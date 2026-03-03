import { RaylibVector, White } from "@adamduehansen/raylib-bindings/r-core";
import ComponentManager from "./component-manager.ts";
import { GraphicComponent, TransformComponent } from "./components.ts";
import { Entity } from "./entity.ts";
import { Resources } from "./resources.ts";
import { ImageResource } from "./resource.ts";
import { Sprite } from "./graphic.ts";

interface ActorArgs {
  imageResource: ImageResource;
  position: RaylibVector;
}

export default class EntityFactory {
  constructor(readonly componentManager: ComponentManager) {}

  createActor(args: ActorArgs): Entity {
    const entity = new Entity();
    const sprite: Sprite = {
      image: args.imageResource,
      source: {
        x: 0,
        y: 0,
        width: args.imageResource.texture?.width ?? 0,
        height: args.imageResource.texture?.height ?? 0,
      },
      dest: {
        x: args.position.x,
        y: args.position.y,
        width: args.imageResource.texture?.width ?? 0,
        height: args.imageResource.texture?.height ?? 0,
      },
      color: White,
      type: "sprite",
    };
    const graphicComponent = new GraphicComponent(sprite);
    this.componentManager.add(entity, graphicComponent);
    this.componentManager.add(entity, new TransformComponent(args.position));
    return entity;
  }

  createWizard(pos: RaylibVector): Entity {
    const piece = this.createActor({
      position: pos,
      imageResource: Resources.wizard,
    });
    return piece;
  }

  createKnight(pos: RaylibVector): Entity {
    const piece = this.createActor({
      position: pos,
      imageResource: Resources.knight,
    });
    return piece;
  }
}
