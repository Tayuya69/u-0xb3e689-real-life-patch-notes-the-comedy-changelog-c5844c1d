// SPDX-License-Identifier: MIT
// Real-Life Patch Notes: The Comedy Changelog
// Deterministically writes the one-line patch-note entry to /output/entry.txt.
// No randomness, no network, no input.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "v4.2.0: fixed a bug where the stomach only growled during silent meetings.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write read-back verification: re-read /output/entry.txt and assert
// it is exactly the entry line (74 code points, one line, within 160 chars).
import { readFileSync } from "node:fs";
const written = readFileSync("/output/entry.txt", "utf8");
const EXPECTED =
  "v4.2.0: fixed a bug where the stomach only growled during silent meetings.";
if (written !== EXPECTED) {
  throw new Error("verification failed: /output/entry.txt does not match the entry line");
}
if ([...written].length !== 74) {
  throw new Error("verification failed: entry is not 74 code points");
}
if (written.split("\n").length !== 1) {
  throw new Error("verification failed: entry is not a single line");
}
if ([...written].length < 1 || [...written].length > 160) {
  throw new Error("verification failed: entry length outside 1-160 characters");
}
console.log("verification passed: entry is exactly 74 code points, one line, within 160 chars");
