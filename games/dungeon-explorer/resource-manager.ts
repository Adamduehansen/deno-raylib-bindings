import { loadTexture, unloadTexture } from "@src/r-textures.ts";
import { Texture } from "@src/r-core.ts";

export default class ResourceManager {
  static #instance: ResourceManager;

  #resources: Map<string, Texture> = new Map<string, Texture>();

  private constructor() {
  }

  load(key: string, path: string): void {
    const texture = loadTexture(path);
    this.#resources.set(key, texture);
  }

  get(key: string): Texture {
    const resource = this.#resources.get(key);
    if (resource === undefined) {
      throw new Error(`Coule not get resource "${key}". Is it loaded?`);
    }

    return resource;
  }

  unload(): void {
    for (const texture of this.#resources.values()) {
      unloadTexture(texture);
    }
  }

  static getInstance(): ResourceManager {
    if (this.#instance === undefined) {
      this.#instance = new ResourceManager();
    }

    return this.#instance;
  }
}
