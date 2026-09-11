const fs = require('fs');
const path = require('path');

const srcDir = '/Users/mutegekicliffagaba/.gemini/antigravity/brain/58f36e72-7a12-456d-996c-0837d036c53c/';
const dstDir = path.join(__dirname, 'assets', 'images');

const mapping = {
  'hero_young_wombs_1788112117837.jpg': 'hero.jpg',
  'javi_hub_space_1788112136653.jpg': 'javi_hub.jpg',
  'periods_dignity_edu_1788112164405.jpg': 'periods.jpg',
  'community_advocacy_1788112193473.jpg': 'community.jpg'
};

for (const [srcName, dstName] of Object.entries(mapping)) {
  const srcPath = path.join(srcDir, srcName);
  const dstPath = path.join(dstDir, dstName);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`Copied ${srcName} -> ${dstName}`);
  }
}

console.log('Done copying images');
