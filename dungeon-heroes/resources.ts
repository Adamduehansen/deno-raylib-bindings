import { TextureResource, TiledMapResource } from "./resource.ts";

export const Resources = {
  wizard: new TextureResource("./assets/Tiles/tile_0084.png"),
  knight: new TextureResource("./assets/Tiles/tile_0097.png"),
  startTile: new TiledMapResource("./resources/start-tile.tmx"),
} as const;
