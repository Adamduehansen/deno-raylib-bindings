import { ImageResource, TiledMapResource } from "./resource.ts";

export const Resources = {
  wizard: new ImageResource("./assets/Tiles/tile_0084.png"),
  knight: new ImageResource("./assets/Tiles/tile_0097.png"),
  startTile: new TiledMapResource("./resources/start-tile.tmx"),
} as const;
