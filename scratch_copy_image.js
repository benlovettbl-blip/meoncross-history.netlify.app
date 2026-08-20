const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/fives/.gemini/antigravity-ide/brain/dbf3f22f-9e42-4487-8cf3-fa12bfec3af6/.user_uploaded';
const files = fs.readdirSync(srcDir);
const mediaFiles = files.filter(f => f.startsWith('media_') && (f.endsWith('.jpg') || f.endsWith('.png')));
mediaFiles.sort((a, b) => {
  return fs.statSync(path.join(srcDir, b)).mtimeMs - fs.statSync(path.join(srcDir, a)).mtimeMs;
});

if (mediaFiles.length > 0) {
  const latestFile = path.join(srcDir, mediaFiles[0]);
  const destFile = 'c:/Projects/meoncross-history.netlify.app/public/images/motte_and_bailey.jpg';
  fs.copyFileSync(latestFile, destFile);
  console.log(`Copied ${latestFile} to ${destFile}`);
} else {
  console.log('No media files found.');
}
