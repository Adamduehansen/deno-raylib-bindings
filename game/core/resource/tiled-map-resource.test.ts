import { assertEquals } from "@std/assert/equals";
import { TiledMapResource } from "./tiled-map-resource.ts";

Deno.test("Should parse map data", () => {
  // Arrange
  const tiledMapResource = new TiledMapResource(
    "./core/_test-assets/layers-test-map.tmx",
  );

  // Act
  tiledMapResource.load();

  // Assert
  assertEquals(tiledMapResource.width, 10);
  assertEquals(tiledMapResource.height, 5);

  tiledMapResource.unload();
});

Deno.test("Should parse layer data", () => {
  // Arrange
  const tiledMapResource = new TiledMapResource(
    "./core/_test-assets/layers-test-map.tmx",
  );

  // Act
  tiledMapResource.load();

  // Assert
  assertEquals(tiledMapResource.layers.length, 2);
  for (let index = 0; index < tiledMapResource.layers.length; index++) {
    const layer = tiledMapResource.layers[index];
    assertEquals(layer.name, `Tile Layer ${index + 1}`);
    assertEquals(layer.width, 10);
    assertEquals(layer.height, 5);
    assertEquals(layer.data.encoding, "csv");
    assertEquals(
      layer.data.content,
      `
0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0
`,
    );
  }
  assertEquals(tiledMapResource.layers[0].visible, true);
  assertEquals(tiledMapResource.layers[1].visible, false);
  assertEquals(tiledMapResource.layers[1].properties["solid"].type, "bool");
  assertEquals(tiledMapResource.layers[1].properties["solid"].value, "true");

  tiledMapResource.unload();
});

Deno.test("should parse tileset", () => {
  // Arrange
  const tiledMapResource = new TiledMapResource(
    "./core/_test-assets/tileset-test.tmx",
  );

  // Act
  tiledMapResource.load();

  const { tilesets } = tiledMapResource;
  const [tileset1] = tilesets;

  // Assert
  assertEquals(tilesets.length, 2);
  assertEquals(tileset1.tileset.spacing, 1);
  assertEquals(tileset1.source, "tileset-separated.tsx");
  assertEquals(tileset1.firstGid, 1);
  assertEquals(
    tileset1.tileset.image.source,
    "../../assets/tiny-dungeon-assets/Tilemap/tilemap.png",
  );
  assertEquals(tileset1.tileset.image.height, 186);
  assertEquals(tileset1.tileset.image.width, 203);

  tiledMapResource.unload();
});
