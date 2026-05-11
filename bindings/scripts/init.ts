import { resolve } from "@std/path";

async function dirExists(path: string): Promise<boolean> {
  try {
    await Deno.lstat(path);
    return true;
  } catch {
    return false;
  }
}

console.log("Deno Raylib bindings: init project");

const projectName = prompt("Project name:");

// TODO: Check for empty or only whitespace name

if (projectName === null) {
  console.log("Project name cannot be null");
  Deno.exit();
}

const projectDir = resolve(Deno.cwd(), projectName);

if (await dirExists(projectDir)) {
  console.log("Project already exists");
  Deno.exit();
}

console.log("-> Creating project at", `"${projectDir}"`);
await Deno.mkdir(projectDir);

console.log('-> Creating "deno.json"');
const denoFileContent = `{
  "tasks": {
    "start": "deno run --allow-ffi main.ts"
  },
  "imports": {
    "@adamduehansen/raylib-bindings": "jsr:@adamduehansen/raylib-bindings"
  }
}
`;
await Deno.writeTextFile(resolve(projectDir, "deno.json"), denoFileContent);

console.log('-> Creating "main.ts"');
const mainFileContent = `import {
  beginDrawing,
  clearBackground,
  closeWindow,
  endDrawing,
  initWindow,
  LightGray,
  setTargetFPS,
  White,
  windowShouldClose,
} from "@adamduehansen/raylib-bindings/r-core";
import { drawText } from "@adamduehansen/raylib-bindings/r-text";

initWindow({
  width: 800,
  height: 450,
  title: "${projectName}",
});

setTargetFPS(60);

while (windowShouldClose() === false) {
  beginDrawing();
  clearBackground(White);

  drawText({
    text: "Hello, World",
    posX: 190,
    posY: 200,
    fontSize: 20,
    color: LightGray,
  });

  endDrawing();
}

closeWindow();
`;
await Deno.writeTextFile(resolve(projectDir, "main.ts"), mainFileContent);

console.log("Fetching binaries");
await Deno.mkdir(resolve(projectDir, "tmp"));

const response = await fetch(
  "https://github.com/raysan5/raylib/releases/download/5.5/raylib-5.5_linux_amd64.tar.gz",
);

if (!response.ok) {
  throw new Error(`Download failed: ${response.status} ${response.statusText}`);
}

const bytes = new Uint8Array(await response.arrayBuffer());
const archivePath = resolve(projectDir, "tmp", "raylib-5.5_linux_amd64.tar.gz");
await Deno.writeFile(archivePath, bytes);

console.log("Done!");
console.log();
console.log("Next steps:");
console.log("-> cd", projectName);
console.log("-> deno install");
console.log("-> deno run starts");
