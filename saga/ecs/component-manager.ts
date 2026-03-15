import { Component, ComponentCtor } from "./component.ts";
import type { Entity } from "./entity.ts";

export class ComponentManager {
  private readonly _components = new Map<ComponentCtor, Component[]>();
  private readonly _entitiesForComponent = new Map<
    ComponentCtor,
    // EntityID -> Pointer to component
    Map<number, number>
  >();

  add<T extends Component>(entity: Entity, component: T): void {
    const componentType = component.constructor as ComponentCtor;

    // Initialize an empty list for entity id if the component does not exist.
    if (this._components.has(componentType) === false) {
      this._components.set(componentType, []);
      this._entitiesForComponent.set(componentType, new Map());
    }

    // Add the component instance to the pool of instances for that component type.
    const componentPool = this._components.get(componentType)!;
    const indexOfNewComponent = componentPool.push(component) - 1;

    // Add a reference to the component on the entity in the entity pool.
    const entityPool = this._entitiesForComponent.get(componentType)!;
    entityPool.set(entity.id, indexOfNewComponent);
  }

  has(entity: Entity, componentType: ComponentCtor): boolean {
    const entityPool = this._entitiesForComponent.get(componentType);
    return entityPool !== undefined ? entityPool.has(entity.id) : false;
  }

  get<T extends Component>(
    entity: Entity,
    componentType: ComponentCtor<T>,
  ): T | null {
    // Get all the entities for the component type.
    const entityPool = this._entitiesForComponent.get(componentType);
    if (entityPool === undefined) {
      return null;
    }

    // Get the pointer to the component from the pool.
    const componentIndex = entityPool.get(entity.id);
    if (componentIndex === undefined) {
      return null;
    }

    // Get all the component instances of the component type.
    const componentPool = this._components.get(componentType);
    if (componentPool === undefined) {
      return null;
    }

    // Find the component instance.
    const component = componentPool.at(componentIndex);
    if (component === undefined) {
      return null;
    }

    return component as T;
  }
}
