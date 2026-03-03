import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import ComponentManager from "./component-manager.ts";
import { GraphicComponent, TransformComponent } from "./components.ts";
import { Entity } from "./entity.ts";
import { Resources } from "./resources.ts";
import { ImageResource } from "./resource.ts";
import { GraphicFactory } from "./graphic.ts";

interface ActorArgs {
  imageResource: ImageResource;
  position: RaylibVector;
}

const graphicFactory = new GraphicFactory();

export default class EntityFactory {
  constructor(readonly componentManager: ComponentManager) {}

  createActor(args: ActorArgs): Entity {
    const entity = new Entity();
    const sprite = graphicFactory.createSprite({
      image: args.imageResource,
      source: {
        width: 16,
        height: 16,
      },
    });
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
