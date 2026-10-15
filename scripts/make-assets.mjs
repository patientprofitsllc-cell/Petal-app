// Makes the App Store icon and the launch image from public/icon.svg.
//   npm run assets
// Output (read by `npx @capacitor/assets generate --ios` in the cloud build):
//   assets/icon-only.png   1024 x 1024, square, NO transparency
//   assets/splash.png      2732 x 2732, same pink as the icon
import { mkdirSync, readFileSync } from 'node:fs';
import sharp from 'sharp';

const BG = { r: 0xfc, g: 0xe7, b: 0xe6 };
mkdirSync('assets', { recursive: true });

// public/icon.svg has rounded corners (transparent). Apple wants a plain
// square and rounds it itself, so draw it with square corners.
const svg = readFileSync('public/icon.svg', 'utf8').replace(/rx="120"/, 'rx="0"');

const icon = await sharp(Buffer.from(svg), { density: 384 })
  .resize(1024, 1024)
  .flatten({ background: BG })
  .removeAlpha()
  .png()
  .toBuffer();
await sharp(icon).toFile('assets/icon-only.png');

const mark = await sharp(icon).resize(900, 900).toBuffer();
await sharp({
  create: { width: 2732, height: 2732, channels: 3, background: BG },
})
  .composite([{ input: mark, gravity: 'centre' }])
  .removeAlpha()
  .png()
  .toFile('assets/splash.png');

for (const f of ['assets/icon-only.png', 'assets/splash.png']) {
  const m = await sharp(f).metadata();
  if (m.hasAlpha || m.channels === 4) {
    console.error(`${f} has transparency. Apple rejects this.`);
    process.exit(1);
  }
  console.log(`${f}: ${m.width}x${m.height}, channels=${m.channels}, alpha=${m.hasAlpha}`);
}
