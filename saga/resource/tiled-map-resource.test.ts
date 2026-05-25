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
  assertEquals(tiledMapResource.tileLayers.length, 2);
  for (let index = 0; index < tiledMapResource.tileLayers.length; index++) {
    const layer = tiledMapResource.tileLayers[index];
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
  assertEquals(tiledMapResource.tileLayers[0].visible, true);
  assertEquals(tiledMapResource.tileLayers[1].visible, false);
  assertEquals(tiledMapResource.tileLayers[1].properties["solid"].type, "bool");
  assertEquals(
    tiledMapResource.tileLayers[1].properties["solid"].value,
    "true",
  );

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

Deno.test("should parse object layers", () => {
  // Arrange
  const tiledMapResource = new TiledMapResource(
    "./core/_test-assets/object-layer-test-map.tmx",
  );

  // Act
  tiledMapResource.load();
  const objectLayer1 = tiledMapResource.objectLayers.at(0);
  const objectLayer2 = tiledMapResource.objectLayers.at(1);

  // Assert
  assertEquals(objectLayer1?.id, "2");
  assertEquals(objectLayer1?.name, "Object Layer 1");
  assertEquals(objectLayer1?.objects.at(0)?.id, "1");
  assertEquals(objectLayer1?.objects.at(0)?.x, "16");
  assertEquals(objectLayer1?.objects.at(0)?.y, "16");
  assertEquals(objectLayer1?.objects.at(0)?.type, "point");

  assertEquals(objectLayer2?.id, "3");
  assertEquals(objectLayer2?.name, "Object Layer 2");
  assertEquals(objectLayer2?.objects.at(0)?.id, "2");
  assertEquals(objectLayer2?.objects.at(0)?.x, "0");
  assertEquals(objectLayer2?.objects.at(0)?.y, "0");
  assertEquals(objectLayer2?.objects.at(0)?.type, "point");
  assertEquals(objectLayer2?.objects.at(1)?.id, "4");
  assertEquals(objectLayer2?.objects.at(1)?.x, "32");
  assertEquals(objectLayer2?.objects.at(1)?.y, "0");
  assertEquals(objectLayer2?.objects.at(1)?.type, "ellipse");
});
