import { assertEquals } from "@std/assert";
import { type RaylibTexture } from "@adamduehansen/raylib-bindings/r-core";
import { EntityCollection } from "./entity-collection.ts";
import { Entity } from "./entity.ts";
import { Sprite } from "./sprite.ts";

const testTexture: RaylibTexture = {
  id: 0,
  format: 0,
  height: 16,
  width: 16,
  mipmaps: 0,
};

class TestEntity extends Entity {
  constructor() {
    super({
      sprite: new Sprite(testTexture),
      position: { x: 0, y: 0 },
    });
  }

  override update(): void {}
}

Deno.test("should add entity to collection", () => {
  // Arrange
  const entityCollection = new EntityCollection();

  // Act
  const testEntity = new TestEntity();
  entityCollection.add(testEntity);
  const entityInCollection = entityCollection.get(testEntity.id);

  // Assert
  assertEquals(entityCollection.length, 1);
  assertEquals(entityInCollection, testEntity);
});
