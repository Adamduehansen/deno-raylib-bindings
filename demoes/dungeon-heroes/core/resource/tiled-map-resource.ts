import { parse as parseXml, XmlNode, type XmlElement } from "@std/xml";
import { Resource } from "./resource.ts";

interface LayerProperty {
  type: string;
  value: string;
}

type LayerProperties = Record<string, LayerProperty>;

interface LayerData {
  encoding: string;
  content: string;
}

interface Layer {
  name: string;
  width: number;
  height: number;
  data: LayerData;
  visible: boolean;
  properties: LayerProperties;
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

  unload(): void {
    // TODO: unload textures!
  }

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
        const visibleAttr = Number(attributes["visible"]);
        return {
          name: attributes["name"],
          data: this._parseLayerData(children),
          height: Number(attributes["height"]),
          width: Number(attributes["width"]),
          visible: isNaN(visibleAttr) ? true : Boolean(Number(visibleAttr)),
          properties: this._parseLayerProperties(children),
        };
      })
      .toArray();
  }

  private _parseLayerProperties(xmlNodes: readonly XmlNode[]): LayerProperties {
    const propertiesElement = xmlNodes.find(
      (xmlNode) =>
        xmlNode.type === "element" && xmlNode.name.raw === "properties",
    ) as XmlElement;

    if (propertiesElement === undefined) {
      return {};
    }

    const propertyElements = propertiesElement.children.filter(
      (xmlNode) => xmlNode.type === "element",
    );

    return propertyElements.reduce<LayerProperties>((properties, xmlNode) => {
      const { name, type, value } = xmlNode.attributes;

      properties[name] = {
        type: type,
        value: value,
      };

      return properties;
    }, {});
  }

  private _parseLayerData(xmlNodes: readonly XmlNode[]): LayerData {
    const dataElement = xmlNodes.find(
      (xmlNode) => xmlNode.type === "element" && xmlNode.name.raw === "data",
    ) as XmlElement;

    if (dataElement === undefined) {
      throw new Error("Data element is missing!");
    }

    const content = dataElement.children.find(
      (xmlNode) => xmlNode.type === "text",
    );

    return {
      encoding: dataElement.attributes["encoding"],
      content: content?.text ?? "",
    };
  }
}
