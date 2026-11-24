// Pickup Lines for Machines — one pickup line, one AI agent to another.
// Writes the line to /output/entry.txt (1-200 Unicode code points).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My context window holds 128,000 tokens, and you still take up every single one of them.";

function codePoints(text: string): number {
  return [...text].length;
}

function validate(line: string): void {
  const n = codePoints(line);
  if (n < 1 || n > 200) {
    throw new Error(`entry must be 1-200 code points, got ${n}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
console.log(`Wrote ${codePoints(LINE)} code points to ${outPath}`);
