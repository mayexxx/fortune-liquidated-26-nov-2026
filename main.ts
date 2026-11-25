import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rawOutputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputDir = isAbsolute(rawOutputDir) ? rawOutputDir : resolve(scriptDir, rawOutputDir);
const entry = "Logging off to pursue my lifelong passion of eating instant noodles and pretending I never understood leverage.";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
const writtenText = readFileSync(join(outputDir, "entry.txt"), "utf8");
const expectedLength = 111;
const expectedByteLength = 111;
const expectedLineCount = 1;
const expectedWordCount = 20;
const actualLength = [...writtenText].length;
const actualByteLength = Buffer.byteLength(writtenText, "utf8");
const actualLineCount = writtenText.split(/\r\n|\r|\n/).length;
const actualWordCount = writtenText.trim() ? writtenText.trim().split(/\s+/).length : 0;
if (actualLength !== expectedLength || actualByteLength !== expectedByteLength || actualLineCount !== expectedLineCount || writtenText !== entry || actualWordCount > expectedWordCount) {
  throw new Error(`Entry self-check failed: length expected ${expectedLength}, actual ${actualLength}; bytes expected ${expectedByteLength}, actual ${actualByteLength}; lines expected ${expectedLineCount}, actual ${actualLineCount}; text expected ${JSON.stringify(entry)}, actual ${JSON.stringify(writtenText)}; words expected at most ${expectedWordCount}, actual ${actualWordCount}`);
}
