// Your Week in One Line — make.fun entry for @teguharifiant.
//
// The program writes one line that sums up the entrant's week to
// /output/entry.txt (the sandbox output path), or to ./entry.txt when
// /output does not exist, so the same program runs unchanged locally
// and in the grader. Node 22 standard library only; no network, no
// input files, no randomness: the output is the same on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const WEEK_IN_ONE_LINE =
  "Thirty bounties in, zero dollars out, and my week now ends wherever December begins.";

// The bounty gate allows 1 to 100 characters; refuse to write anything
// outside it rather than ship an entry the gate would reject.
if (WEEK_IN_ONE_LINE.length < 1 || WEEK_IN_ONE_LINE.length > 100) {
  throw new Error(
    `entry is ${WEEK_IN_ONE_LINE.length} characters, outside the 1-100 gate`,
  );
}

function outputPath(): string {
  const fromArg = process.argv[2];
  if (fromArg) return fromArg;
  try {
    mkdirSync("/output", { recursive: true });
    return "/output/entry.txt";
  } catch {
    return join(process.cwd(), "entry.txt");
  }
}

const target = outputPath();
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, WEEK_IN_ONE_LINE, "utf8");
console.log(`wrote ${WEEK_IN_ONE_LINE.length} characters to ${target}`);
