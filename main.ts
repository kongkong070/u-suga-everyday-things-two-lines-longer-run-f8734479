// Everyday Things, Two Lines — entry program.
//
// Writes a two-line explanation to /output/entry.txt:
//   Line 1 explains one everyday thing (a toaster) to a 10-year-old in a
//   single vivid sentence built on an analogy.
//   Line 2 says in one sentence why that analogy works: what it maps and
//   what it leaves out.
//
// Gate (from RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 400
// characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "A toaster is like a tiny sunbed where a slice of bread lies down to get a tan until it turns golden brown.";

const LINE_2 =
  "It works because both use steady heat to turn something pale golden, but it leaves out that bread cannot hop off early, ask for shade, or wear sunscreen.";

export function buildEntry(): string {
  return `${LINE_1}\n${LINE_2}\n`;
}

export function validate(entry: string): void {
  if (typeof entry !== "string" || entry.length === 0) {
    throw new Error("entry is empty");
  }
  if (entry.length > 400) {
    throw new Error(`entry is ${entry.length} characters, over the 400 limit`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  const lines = entry.replace(/\n$/, "").split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  for (const [i, line] of lines.entries()) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      throw new Error(`line ${i + 1} is empty`);
    }
    const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    if (sentences.length !== 1) {
      throw new Error(`line ${i + 1} must be a single sentence, got ${sentences.length}`);
    }
  }
}

function main(): void {
  const entry = buildEntry();
  validate(entry);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Never remove the output directory itself: the grader may mount it.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
  console.log(`wrote ${entry.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
