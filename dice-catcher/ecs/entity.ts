import ComponentManager from "./component-manager.ts";
import { Component } from "./component.ts";

export default class Entity {
  private _componentManager: ComponentManager;

  constructor(readonly id: number, componentManger: ComponentManager) {
    this._componentManager = componentManger;
  }

  addComponent(componentType: Component): void {
    this._componentManager.addComponent(this, componentType);
  }
}
