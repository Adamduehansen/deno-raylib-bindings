import TextureResource from "./core/image-resource.ts";

export const Resources = {
  wizard: new TextureResource(
    "./assets/tiny-dungeon-assets/Tiles/tile_0084.png",
  ),
  knight: new TextureResource(
    "./assets/tiny-dungeon-assets/Tiles/tile_0097.png",
  ),
  ghost: new TextureResource(
    "./assets/tiny-dungeon-assets/Tiles/tile_0121.png",
  ),
  tilemap: new TextureResource(
    "./assets/tiny-dungeon-assets/Tilemap/tilemap.png",
  ),
  // startTile: new TiledMapResource("./resources/start-tile.tmx"),
} as const;
