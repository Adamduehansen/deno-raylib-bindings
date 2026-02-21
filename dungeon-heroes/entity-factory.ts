import { RaylibVector } from "@adamduehansen/raylib-bindings/r-core";
import ComponentManager from "./component-manager.ts";
import { TextureComponent, TransformComponent } from "./components.ts";
import { Entity } from "./entity.ts";
import { Resources } from "./resources.ts";
import { TextureResource } from "./resource.ts";

interface ActorArgs {
  textureResource: TextureResource;
  position: RaylibVector;
}

export default class EntityFactory {
  constructor(readonly componentManager: ComponentManager) {}

  createActor(args: ActorArgs): Entity {
    const entity = new Entity();
    this.componentManager.add(
      entity,
      new TextureComponent(args.textureResource),
    );
    this.componentManager.add(entity, new TransformComponent(args.position));
    return entity;
  }

  createWizard(pos: RaylibVector): Entity {
    const piece = this.createActor({
      position: pos,
      textureResource: Resources.wizard,
    });
    return piece;
  }

  createKnight(pos: RaylibVector): Entity {
    const piece = this.createActor({
      position: pos,
      textureResource: Resources.knight,
    });
    return piece;
  }
}
