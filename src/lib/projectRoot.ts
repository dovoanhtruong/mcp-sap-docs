import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let root = process.cwd();

while (root.includes('dist') || !fs.existsSync(path.join(root, 'package.json'))) {
  if (root === path.dirname(root)) {
    break;
  }
  root = path.dirname(root);
}

if (!fs.existsSync(path.join(root, 'package.json'))) {
  root = path.resolve(__dirname, "../../..");
}

export const PROJECT_ROOT = root;
