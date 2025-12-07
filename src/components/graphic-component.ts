import Graphic from "../graphics.ts";
import Component from "./component.ts";

export default class GraphicsComponent extends Component {
  private _graphicsMap = new Map<string, Graphic>();

  private _currentGraphicKey?: string;

  add(key: string, graphic: Graphic) {
    this._graphicsMap.set(key, graphic);
  }

  render(): void {
    const currentGraphic = this._graphicsMap.get(this._currentGraphicKey ?? "");
    if (currentGraphic === undefined) {
      return;
    }

    currentGraphic.render(this.owner.pos);
  }

  use(key: string): void {
    this._currentGraphicKey = key;
  }
}
