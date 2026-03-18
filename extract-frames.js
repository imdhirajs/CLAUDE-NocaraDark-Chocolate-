const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

const input = path.resolve(__dirname, 'Chocolate 1.mp4');
const outputDir = path.resolve(__dirname, 'public/frames');
const output = path.join(outputDir, 'frame_%04d.webp');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames at 24fps...');
console.log('Input:', input);
console.log('Output:', output);

execSync(
  `"${ffmpegPath}" -i "${input}" -vf fps=24 -quality 80 "${output}"`,
  { stdio: 'inherit' }
);

const frames = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp'));
console.log(`\nDone! Extracted ${frames.length} frames to public/frames/`);
