import { Component } from "./component.ts";
import Entity from "./entity.ts";

export default class ComponentManager {
  private _components: Map<Function, Component[]> = new Map();
  private _entitiesForComponents: Map<Function, Map<number, number>> =
    new Map();

  addComponent(entity: Entity, component: Component): void {
    const componentType = component.constructor;

    // Initialize storage for component if not already present.
    if (this._components.has(componentType) === false) {
      this._components.set(componentType, []);
      this._entitiesForComponents.set(componentType, new Map());
    }

    const existingComponents = this._components.get(componentType)!;
    const index = existingComponents.length;
    existingComponents.push(component);

    const entitiesForComponent = this._entitiesForComponents.get(
      componentType,
    )!;
    entitiesForComponent.set(entity.id, index);
  }

  getComponent<T extends Component>(
    entity: Entity,
    componentType: new (...args: any[]) => T,
  ): T | null {
    const entityMap = this._entitiesForComponents.get(componentType);
    if (entityMap === undefined) {
      return null;
    }

    const componentIndex = entityMap.get(entity.id);
    if (componentIndex === undefined) {
      return null;
    }

    const componentPool = this._components.get(componentType) as T[];
    return componentPool[componentIndex] || null;
  }

  hasComponent(
    entity: Entity,
    componentType: Function,
  ): boolean {
    const entityMap = this._entitiesForComponents.get(componentType);
    return entityMap ? entityMap.has(entity.id) : false;
  }

  removeComponent(entity: Entity, componentType: Function): void {
    const entitiesForComponent = this._entitiesForComponents.get(componentType);
    if (entitiesForComponent === undefined) {
      return;
    }

    entitiesForComponent.delete(entity.id);
  }
}
