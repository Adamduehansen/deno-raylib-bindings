import { parse, type XmlElement } from "@std/xml";
import * as path from "@std/path";
import {
  loadTexture,
  unloadTexture,
} from "@adamduehansen/raylib-bindings/r-textures";
import {
  LOG_ERROR,
  LOG_INFO,
  RaylibTexture,
  traceLog,
} from "@adamduehansen/raylib-bindings/r-core";
import { Resource } from "./resource.ts";

interface TiledMapLayer {
  id: number;
  name: string;
  width: number;
  height: number;
  data: number[][];
}

interface TiledMapImage {
  source: string;
}

interface TiledMapTileset {
  firstGid: string;
  source: string;
  image: TiledMapImage;
}

export class TiledMapResource implements Resource {
  private readonly _dirOfTiledMap: string;

  readonly sourceTextures = new Map<string, RaylibTexture>();
  readonly tilesets: TiledMapTileset[] = [];
  readonly layers: TiledMapLayer[] = [];

  constructor(readonly pathToTiledMap: string) {
    const tiledMapXml = Deno.readTextFileSync(pathToTiledMap);
    this._dirOfTiledMap = path.dirname(pathToTiledMap);

    const doc = parse(tiledMapXml, { ignoreWhitespace: true });
    for (const child of doc.root.children) {
      if (child.type !== "element") {
        continue;
      }

      switch (child.name.raw) {
        case "tileset": {
          this.tilesets.push(this._parseTileset(child));
          break;
        }
        case "layer": {
          this.layers.push(this._parseLayer(child));
          break;
        }
        default:
          traceLog(
            LOG_INFO,
            "[TiledMapResource]",
            "Unhandled element",
            child.name.raw,
          );
          break;
      }
    }
  }

  load(): void {
    for (const tileset of this.tilesets) {
      this.sourceTextures.set(
        tileset.source,
        loadTexture(tileset.image.source),
      );
    }
  }

  unload(): void {
    for (const texture of this.sourceTextures.values()) {
      unloadTexture(texture);
    }
  }

  private _parseTileset(tileset: XmlElement): TiledMapTileset {
    const tilesetSourceAttribute = tileset.attributes.source;
    const pathToTileset = path.resolve(
      this._dirOfTiledMap,
      tilesetSourceAttribute,
    );
    const tilesetXml = parse(Deno.readTextFileSync(pathToTileset));
    const imageElement = tilesetXml.root.children.find((child) =>
      child.type === "element" && child.name.raw === "image"
    );
    if (imageElement === undefined) {
      traceLog(LOG_ERROR, "Tileset had no image element:", pathToTileset);
      throw new Error();
    }

    const sourceAttribute = imageElement.type === "element"
      ? imageElement.attributes.source
      : undefined;
    if (sourceAttribute === undefined) {
      traceLog(
        LOG_ERROR,
        "Tileset image has no source attribute:",
        pathToTileset,
      );
      throw new Error();
    }
    const pathToTilesetSource = path.resolve(
      this._dirOfTiledMap,
      sourceAttribute,
    );
    return {
      firstGid: tileset.attributes.firstgid,
      source: tilesetSourceAttribute,
      image: {
        source: pathToTilesetSource,
      },
    };
  }

  private _parseLayer(layer: XmlElement): TiledMapLayer {
    const id = layer.attributes.id;
    const name = layer.attributes.name;
    const width = layer.attributes.width;
    const height = layer.attributes.height;

    const dataElement = layer.children.find((child) =>
      child.type === "element" && child.name.raw === "data"
    );

    if (dataElement?.type !== "element") {
      throw new Error();
    }

    const data = dataElement.children.at(0);
    if (data?.type !== "text") {
      throw new Error();
    }

    return {
      id: Number(id),
      name: name,
      width: Number(width),
      height: Number(height),
      data: data.text.split("\n").filter((row) => row !== "").map((row) =>
        row.split(",").map((id) => Number(id))
      ),
    };
  }
}
