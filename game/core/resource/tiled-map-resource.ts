import {
  parse as parseXml,
  XmlDocument,
  type XmlElement,
  XmlNode,
} from "@std/xml";
import { basename, dirname, resolve } from "@std/path";
import { isWindowReady } from "@adamduehansen/raylib-bindings/r-core";
import { Resource } from "./resource.ts";
import TextureResource from "./image-resource.ts";

interface LayerProperty {
  type: string;
  value: string;
}

type LayerProperties = Record<string, LayerProperty>;

interface LayerData {
  readonly encoding: string;
  readonly content: string;
}

class TilesetImage {
  readonly source: string;
  readonly width: number;
  readonly height: number;

  constructor({ attributes }: XmlElement) {
    this.source = attributes["source"];
    this.width = Number(attributes["width"]);
    this.height = Number(attributes["height"]);
  }
}

class Tileset {
  readonly name: string;
  readonly tileWidth: number;
  readonly tileHeight: number;
  readonly spacing: number;
  readonly columns: number;
  readonly tileCount: number;
  readonly image: TilesetImage;

  constructor(xmlDocument: XmlDocument) {
    const { root } = xmlDocument;
    const { attributes, children } = root;

    const image = children.find(
      (xmlNode) => xmlNode.type === "element" && xmlNode.name.raw === "image",
    ) as XmlElement;

    if (image === undefined) {
      throw new Error("Tilset does not hav an 'image' element!");
    }

    this.name = attributes["name"];
    this.tileWidth = Number(attributes["tilewidth"]);
    this.tileHeight = Number(attributes["tileheight"]);
    this.spacing = Number(attributes["spacing"]);
    this.columns = Number(attributes["tilecount"]);
    this.tileCount = Number(attributes["columns"]);
    this.image = new TilesetImage(image);
  }
}

class MapTileset {
  readonly tileset: Tileset;
  readonly firstGid: number;
  readonly source: string;

  constructor(xmlElement: XmlElement, mapPath: string) {
    const { attributes } = xmlElement;
    this.source = attributes["source"];
    this.firstGid = Number(attributes["firstgid"]);

    const resolvedPath = resolve(dirname(mapPath), this.source);
    const content = this._getSourceContent(resolvedPath);
    const tilesetXml = parseXml(content);
    this.tileset = new Tileset(tilesetXml);
  }

  private _getSourceContent(path: string): string {
    try {
      return Deno.readTextFileSync(path);
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        throw new Error(`Could not read source at: '${path}'`);
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(`Unknown error: ${error}`);
      }
    }
  }
}

class ObjectLayerObject {
  readonly id: string;
  readonly x: string;
  readonly y: string;
  readonly type: string;

  constructor(xmlElement: XmlElement) {
    this.id = xmlElement.attributes["id"];
    this.x = xmlElement.attributes["x"];
    this.y = xmlElement.attributes["y"];
    this.type = this._parseType(xmlElement);
  }

  private _parseType(xmlElement: XmlElement): string {
    const type = xmlElement.children.find((xmlNode) =>
      xmlNode.type === "element"
    );
    if (type === undefined) {
      throw new Error(
        "Error when parsing object layer. Could not find a type for object",
      );
    }
    return type.name.raw;
  }
}

class ObjectLayer {
  readonly id: string;
  readonly name: string;
  readonly objects: ObjectLayerObject[];

  constructor(xmlElement: XmlElement) {
    const { attributes } = xmlElement;
    this.id = attributes["id"];
    this.name = attributes["name"];

    this.objects = Iterator.from(xmlElement.children)
      .filter((xmlNode) => xmlNode.type === "element")
      .filter((xmlElement) => xmlElement.name.raw === "object")
      .map((xmlElement) => new ObjectLayerObject(xmlElement))
      .toArray();
  }
}

interface TileLayer {
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
  private _tilesets: MapTileset[] = [];
  private _tileLayers: TileLayer[] = [];
  private _objectLayers: ObjectLayer[] = [];
  private _textures: TextureResource[] = [];

  readonly name: string;

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get tilesets(): readonly MapTileset[] {
    return this._tilesets;
  }

  get tileLayers(): readonly TileLayer[] {
    return this._tileLayers;
  }

  get objectLayers(): readonly ObjectLayer[] {
    return this._objectLayers;
  }

  get textures(): readonly TextureResource[] {
    return this._textures;
  }

  constructor(path: string) {
    this._path = path;
    this.name = basename(this._path);
  }

  load(): void {
    const { root: map } = parseXml(this._getTiledMapContent());
    this._width = Number(map.attributes["width"]);
    this._height = Number(map.attributes["height"]);
    this._tileLayers = this._parseTileLayers(map);
    this._objectLayers = this._parseObjectLayers(map);
    this._tilesets = this._parseTilesets(map);

    if (isWindowReady()) {
      for (const { tileset } of this._tilesets) {
        const pathToTexture = resolve(
          dirname(this._path),
          tileset.image.source,
        );
        const textureResource = new TextureResource(pathToTexture);
        textureResource.load();
        this._textures.push(textureResource);
      }
    }
  }

  unload(): void {
    for (const texture of this._textures) {
      texture.unload();
    }
  }

  private _getTiledMapContent(): string {
    try {
      return Deno.readTextFileSync(this._path);
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        throw new Error(`Could not read Tiled map at: '${this._path}'`);
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(`Unknown error: ${error}`);
      }
    }
  }

  private _parseTilesets(map: XmlElement): MapTileset[] {
    return Iterator.from(map.children)
      .filter((xml) => xml.type === "element")
      .filter((xmlElement) => xmlElement.name.raw === "tileset")
      .map((xmlElement): MapTileset => {
        return new MapTileset(xmlElement, this._path);
      })
      .toArray();
  }

  private _parseTileLayers(map: XmlElement): TileLayer[] {
    return Iterator.from(map.children)
      .filter((xmlNode) => xmlNode.type === "element")
      .filter((xmlElement) => xmlElement.name.raw === "layer")
      .map(({ attributes, children }): TileLayer => {
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

  private _parseObjectLayers(map: XmlElement): ObjectLayer[] {
    return Iterator.from(map.children)
      .filter((xmlNode) => xmlNode.type === "element")
      .filter((xmlElement) => xmlElement.name.raw === "objectgroup")
      .map((xmlElement): ObjectLayer => new ObjectLayer(xmlElement))
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
