import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  getFrameTime,
  Green,
  initWindow,
  isKeyDown,
  KeyA,
  KeyD,
  KeyS,
  KeyW,
  RayWhite,
  Red,
  setTargetFPS,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import {
  drawCircleV,
  drawRectangleV,
} from "@adamduehansen/raylib-bindings/r-shapes";

class Component {}

class PositionComponent implements Component {
  constructor(public x: number = 0, public y: number = 0) {}
}

class VelocityComponent implements Component {
  constructor(public dx: number = 0, public dy: number = 0) {}
}

class GraphicComponent implements Component {
  constructor(readonly graphics: Graphic) {}

  draw(pos: { x: number; y: number }): void {
    this.graphics.draw(pos.x, pos.y);
  }
}

interface Graphic {
  draw(x: number, y: number): void;
}

class RectangleGraphic implements Graphic {
  draw(x: number, y: number): void {
    drawRectangleV({
      color: Red,
      position: {
        x: x,
        y: y,
      },
      size: {
        x: 100,
        y: 100,
      },
    });
  }
}

class CircleGraphic implements Graphic {
  draw(x: number, y: number): void {
    drawCircleV({
      center: {
        x: x,
        y: y,
      },
      color: Green,
      radius: 100,
    });
  }
}

class Entity {
  constructor(public readonly id: number) {}
}

class ComponentManager {
  private components: Map<(Function), any[]> = new Map();
  private componentMaps: Map<(Function), Map<number, number>> = new Map();

  addComponent<T extends Component>(entity: Entity, component: T): void {
    const componentType = component.constructor;

    // Initialize storage if needed
    if (!this.components.has(componentType)) {
      this.components.set(componentType, []);
      this.componentMaps.set(componentType, new Map());
    }

    // Add to component pool
    const componentPool = this.components.get(componentType)!;
    const index = componentPool.length;
    componentPool.push(component);

    // Map entity to component
    const entityMap = this.componentMaps.get(componentType)!;
    entityMap.set(entity.id, index);
  }

  getComponent<T extends Component>(
    entity: Entity,
    componentType: new (...args: any[]) => T,
  ): T | null {
    const entityMap = this.componentMaps.get(componentType);
    if (!entityMap) return null;

    const componentIndex = entityMap.get(entity.id);
    if (componentIndex === undefined) return null;

    const componentPool = this.components.get(componentType) as T[];
    return componentPool[componentIndex] || null;
  }

  hasComponent<T extends Component>(
    entity: Entity,
    componentType: new (...args: any[]) => T,
  ): boolean {
    const entityMap = this.componentMaps.get(componentType);
    return entityMap ? entityMap.has(entity.id) : false;
  }
}

class MovementSystem {
  constructor(private componentManager: ComponentManager) {}

  update(entities: Entity[]): void {
    for (const entity of entities) {
      // Only process entities that have both Position and Velocity components
      if (
        this.componentManager.hasComponent(entity, PositionComponent) &&
        this.componentManager.hasComponent(entity, VelocityComponent)
      ) {
        const position = this.componentManager.getComponent(
          entity,
          PositionComponent,
        );
        const velocity = this.componentManager.getComponent(
          entity,
          VelocityComponent,
        );

        if (position !== null && velocity !== null) {
          position.x += velocity.dx * getFrameTime();
          position.y += velocity.dy * getFrameTime();
        }
      }
    }
  }
}

class GraphicSystem {
  constructor(private componentManager: ComponentManager) {}

  draw(entities: Entity[]): void {
    for (const entity of entities) {
      if (!this.componentManager.hasComponent(entity, GraphicComponent)) {
        continue;
      }

      const position = this.componentManager.getComponent(
        entity,
        PositionComponent,
      );

      const graphics = this.componentManager.getComponent(
        entity,
        GraphicComponent,
      );
      if (graphics === null || position === null) {
        continue;
      }

      graphics.draw(position);
    }
  }
}

const componentManager = new ComponentManager();
const movementSystem = new MovementSystem(componentManager);
const graphicSystem = new GraphicSystem(componentManager);

const player = new Entity(1);
componentManager.addComponent(player, new PositionComponent(10, 20));
componentManager.addComponent(player, new VelocityComponent(0, 0));
componentManager.addComponent(
  player,
  new GraphicComponent(new RectangleGraphic()),
);

const enemy = new Entity(2);
componentManager.addComponent(enemy, new PositionComponent(300, 200));
componentManager.addComponent(enemy, new GraphicComponent(new CircleGraphic()));

// Usage
const entities = [player, enemy];

initWindow({
  title: "Entity Component system",
  width: 800,
  height: 450,
});

setTargetFPS(60);

const playerSpeed = 200;

while (windowShouldClose() === false) {
  // Input handling

  // player.update()
  const playerVel = componentManager.getComponent(player, VelocityComponent);
  if (playerVel !== null) {
    if (isKeyDown(KeyD)) {
      playerVel.dx = playerSpeed;
    } else if (isKeyDown(KeyA)) {
      playerVel.dx = -playerSpeed;
    } else {
      playerVel.dx = 0;
    }

    if (isKeyDown(KeyS)) {
      playerVel.dy = playerSpeed;
    } else if (isKeyDown(KeyW)) {
      playerVel.dy = -playerSpeed;
    } else {
      playerVel.dy = 0;
    }
  }

  // Update
  // --------------------------------------------------------------------------
  movementSystem.update(entities);

  // Draw
  // --------------------------------------------------------------------------
  beginDrawing();
  clearBackground(RayWhite);
  graphicSystem.draw(entities);
  endDrawing();
}

closeWindow();
