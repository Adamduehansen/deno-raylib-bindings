import { parse as parseXml, XmlNode, type XmlElement } from "@std/xml";
import { Resource } from "./resource.ts";

interface LayerData {
  encoding: string;
}

interface Layer {
  name: string;
  width: number;
  height: number;
  data: LayerData;
}

export class TiledMapResource implements Resource {
  private _path: string;

  private _width: number = 0;
  private _height: number = 0;
  private _layers: Layer[] = [];

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get layers(): readonly Layer[] {
    return this._layers;
  }

  constructor(path: string) {
    this._path = path;
  }

  load(): void {
    const { root: map } = parseXml(this._getTiledMapContent());
    this._width = Number(map.attributes["width"]);
    this._height = Number(map.attributes["height"]);
    this._layers = this._parseLayers(map);
  }

  unload(): void {}

  private _getTiledMapContent(): string {
    try {
      return Deno.readTextFileSync(this._path);
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        throw new Error(`Could not read Tiled map at: ${this._path}`);
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(`Unknown error: ${error}`);
      }
    }
  }

  private _parseLayers(map: XmlElement): Layer[] {
    return Iterator.from(map.children)
      .filter((xmlNode) => xmlNode.type === "element")
      .filter((xmlElement) => xmlElement.name.raw === "layer")
      .map(({ attributes, children }): Layer => {
        return {
          name: attributes["name"],
          width: Number(attributes["width"]),
          height: Number(attributes["height"]),
          data: this._parseLayerData(children),
        };
      })
      .toArray();
  }

  private _parseLayerData(xmlNode: readonly XmlNode[]): LayerData {
    const dataElement = xmlNode.find(
      (xmlNode) => xmlNode.type === "element" && xmlNode.name.raw === "data",
    ) as XmlElement;

    if (dataElement === undefined) {
      throw new Error("Data element is missing!");
    }

    return {
      encoding: dataElement.attributes["encoding"],
    };
  }
}
