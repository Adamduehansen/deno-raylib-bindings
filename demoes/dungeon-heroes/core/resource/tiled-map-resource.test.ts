import { assertEquals } from "@std/assert/equals";
import { TiledMapResource } from "./tiled-map-resource.ts";

Deno.test("should add entity to collection", () => {
  // Arrange
  const tiledMapResource = new TiledMapResource("./assets/test-map.tmx");

  // Act
  tiledMapResource.load();

  // Assert
  assertEquals(tiledMapResource.width, 10);
  assertEquals(tiledMapResource.height, 5);
  assertEquals(tiledMapResource.layers.length, 2);
  for (let index = 0; index < tiledMapResource.layers.length; index++) {
    const layer = tiledMapResource.layers[index];
    assertEquals(layer.name, `Tile Layer ${index + 1}`);
    assertEquals(layer.width, 10);
    assertEquals(layer.height, 5);
    assertEquals(layer.data.encoding, "csv");
  }
});
