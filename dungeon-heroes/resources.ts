import ImageResource from "./resources/image-resource.ts";

export const Resources = {
  wizard: new ImageResource("./assets/tiny-dungeon-assets/Tiles/tile_0084.png"),
  knight: new ImageResource("./assets/tiny-dungeon-assets/Tiles/tile_0097.png"),
  tilemap: new ImageResource(
    "./assets/tiny-dungeon-assets/Tilemap/tilemap.png",
  ),
  // startTile: new TiledMapResource("./resources/start-tile.tmx"),
} as const;
