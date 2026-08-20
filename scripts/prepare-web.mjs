import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(projectRoot, "dist");
const distIconsDir = path.join(distDir, "icons");

await mkdir(distIconsDir, { recursive: true });

const files = [
  ["index.html", "index.html"],
  ["manifest.webmanifest", "manifest.webmanifest"],
  ["service-worker.js", "service-worker.js"],
  ["icons/icon-192.png", "icons/icon-192.png"],
  ["icons/icon-512.png", "icons/icon-512.png"]
];

await Promise.all(
  files.map(([source, destination]) =>
    copyFile(path.join(projectRoot, source), path.join(distDir, destination))
  )
);

console.log("PWA-Dateien wurden für den nativen Build nach dist/ kopiert.");
