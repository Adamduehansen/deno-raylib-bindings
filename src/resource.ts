import { loadSound, RaylibSound, unloadSound } from "./r-audio.ts";
import { RaylibTexture } from "./r-core.ts";
import { loadTexture, unloadTexture } from "./r-textures.ts";

abstract class Resource<T = unknown> {
  resource?: T;

  constructor(public readonly path: string) {}

  abstract load(): void;
  abstract unload(): void;
}

export class Image extends Resource<RaylibTexture> {
  load(): void {
    this.resource = loadTexture(this.path);
  }

  unload(): void {
    if (this.resource === undefined) {
      console.warn("Attempted to unload Texture but was not loaded.");
      return;
    }

    unloadTexture(this.resource);
  }
}

export class Sound extends Resource<RaylibSound> {
  load(): void {
    this.resource = loadSound(this.path);
  }

  unload(): void {
    if (this.resource === undefined) {
      console.warn("Attempted to unload Sound but was not loaded.");
      return;
    }

    unloadSound(this.resource);
  }
}

export class ResourceManager {
  private _resource: Resource[];

  constructor(resources: Resource[]) {
    this._resource = resources;
  }

  load(): void {
    for (const resource of this._resource) {
      resource.load();
    }
  }

  unload(): void {
    for (const resource of this._resource) {
      resource.unload();
    }
  }
}
