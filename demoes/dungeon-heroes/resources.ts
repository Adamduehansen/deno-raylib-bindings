import TextureResource from "./core/resource/image-resource.ts";
import { TiledMapResource } from "./core/resource/tiled-map-resource.ts";

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
  startTile: new TiledMapResource("./resources/room-1.tmx"),
} as const;
