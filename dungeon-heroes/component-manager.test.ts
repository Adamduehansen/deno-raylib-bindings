import { assertEquals, assertFalse } from "@std/assert";
import { Entity } from "./entity.ts";
import ComponentManager from "./component-manager.ts";
import { Component } from "./components.ts";

Deno.test("should add component for entity", () => {
  // Arrange
  class TestComponent implements Component {}
  const entity = new Entity();
  const componentManager = new ComponentManager();

  // Act
  const testComponent = new TestComponent();
  componentManager.add(entity, testComponent);

  // Assert
  assertEquals(componentManager.has(entity, TestComponent), true);
  assertEquals(componentManager.get(entity, TestComponent), testComponent);
});

Deno.test("should return null for component that does not exist", () => {
  // Arrange
  class TestComponent implements Component {}
  const entity = new Entity();
  const componentManager = new ComponentManager();

  // Act
  const hasComponent = componentManager.has(entity, TestComponent);
  const testComponent = componentManager.get(entity, TestComponent);

  // Assert
  assertFalse(hasComponent);
  assertEquals(testComponent, null);
});

// TODO: add tests for remove.
