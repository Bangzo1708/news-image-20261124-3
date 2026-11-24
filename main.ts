// news-image-20261124 — entry for "Sum up 24 November's world news in one image".
//
// The entry image (entry.png, 1024x1024 JPEG) is a six-panel poster of
// Tuesday 24 November 2026, built from news reported that day:
//   1. Ukraine sinks the Russian corvette Merkury off Benghazi, Libya
//      (seven naval drones, confirmed by President Zelensky).
//   2. Nvidia reinstates Jensen Huang as CEO; shares jump 31%, S&P 500 +4.7%.
//   3. Tankers hit mines in the Strait of Hormuz; Iran vows to confront
//      the US naval blockade.
//   4. Israeli strikes in Gaza kill Hamas security chief Naeem Abu Nahel.
//   5. NATO sends an AWACS surveillance aircraft to Poland after Russian
//      missiles landed there.
//   6. Pakistan's Zeeshan Ali is set to become the first foreign astronaut
//      on China's Tiangong space station.
// This program simply copies the bundled image to the output directory.
// It uses only the Node standard library, reads no network, and writes the
// exact same bytes on every run.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Gate guard: the competition allows at most 1 MiB (1048576 bytes).
// Fail loudly instead of submitting an oversized image.
const size = statSync(target).size;
if (size > 1048576) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}
console.log(`wrote ${target} (${size} bytes)`);
