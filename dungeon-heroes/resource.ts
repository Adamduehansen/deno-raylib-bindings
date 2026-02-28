import * as path from "@std/path";
import { parse, XmlElement } from "@std/xml";
import {
  loadTexture,
  unloadTexture,
} from "@adamduehansen/raylib-bindings/r-textures";
import {
  LOG_ERROR,
  RaylibTexture,
  traceLog,
} from "@adamduehansen/raylib-bindings/r-core";

export type ResourceMap = Record<string, Resource>;

export interface Resource {
  load(): void;
  unload(): void;
}

export class TextureResource implements Resource {
  texture?: RaylibTexture;

  constructor(readonly path: string) {}

  load(): void {
    this.texture = loadTexture(this.path);
  }

  unload(): void {
    if (this.texture === undefined) {
      console.error(
        "Cannot unload texture that is not loaded. Path",
        this.path,
      );
      return;
    }

    unloadTexture(this.texture);
  }
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
  private readonly _sourceTextures: RaylibTexture[] = [];
  /**
   * The path to the directory that contains the tiled map.
   */
  private readonly _dirOfTiledMap: string;

  readonly tilesets: readonly TiledMapTileset[] = [];

  constructor(readonly pathToTiledMap: string) {
    const tiledMapXml = Deno.readTextFileSync(pathToTiledMap);
    this._dirOfTiledMap = path.dirname(pathToTiledMap);

    const doc = parse(tiledMapXml, { ignoreWhitespace: true });
    this.tilesets = this._parseTilesets(doc.root);
  }

  load(): void {
    for (const tileset of this.tilesets) {
      this._sourceTextures.push(loadTexture(tileset.image.source));
    }
  }

  unload(): void {
    for (const texture of this._sourceTextures) {
      unloadTexture(texture);
    }
  }

  private _parseTilesets(map: XmlElement): TiledMapTileset[] {
    return map.children.reduce((tilesets, child): TiledMapTileset[] => {
      if (child.type !== "element" || child.name.raw !== "tileset") {
        return tilesets;
      }

      const tilesetSource = child.attributes.source;
      const pathToTileset = path.resolve(this._dirOfTiledMap, tilesetSource);
      const tilesetXml = Deno.readTextFileSync(pathToTileset);
      const doc = parse(tilesetXml);
      const image = doc.root.children.find((child) =>
        child.type === "element" && child.name.raw === "image"
      );

      if (image === undefined) {
        traceLog(LOG_ERROR, "Tileset had no image element:", pathToTileset);
        return tilesets;
      }

      const sourceAttribute = image.type === "element"
        ? image.attributes.source
        : undefined;

      if (sourceAttribute === undefined) {
        traceLog(
          LOG_ERROR,
          "Tileset image has no source attribute:",
          pathToTileset,
        );
        return tilesets;
      }

      const pathToTilemapSource = path.resolve(
        this._dirOfTiledMap,
        sourceAttribute,
      );

      return [...tilesets, {
        firstGid: child.attributes.firstgid,
        source: tilesetSource,
        image: {
          source: pathToTilemapSource,
        },
      }];
    }, []);
  }
}
