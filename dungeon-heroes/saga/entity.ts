import { Component, ComponentCtor } from "./component.ts";

export class Entity {
  static CURRENT_MAX_ID = 1;

  readonly id = Entity.CURRENT_MAX_ID++;

  private _components = new Map<Function, Component>();

  addComponent<TComponent extends Component>(component: TComponent): void {
    this._components.set(component.constructor, component);
  }

  getComponent<TComponent extends Component>(
    component: ComponentCtor<TComponent>,
  ): TComponent | undefined {
    return this._components.get(component) as TComponent | undefined;
  }
}
