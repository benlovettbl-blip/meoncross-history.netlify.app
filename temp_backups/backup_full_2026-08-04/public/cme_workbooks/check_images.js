const fs = require('fs');
const path = require('path');

const portraitsDir = path.join(__dirname, '..', 'public', 'assets', 'sources', 'portraits');
const otherDir = path.join(__dirname, '..', 'public', 'assets', 'sources');

function checkImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`MISSING: ${filePath}`);
    return false;
  }
  const stats = fs.statSync(filePath);
  if (stats.size === 0) {
    console.log(`EMPTY FILE: ${filePath}`);
    return false;
  }
  
  // Read first 4 bytes to check magic numbers
  const buffer = Buffer.alloc(4);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buffer, 0, 4, 0);
  fs.closeSync(fd);
  
  const hex = buffer.toString('hex');
  let format = 'unknown';
  if (hex.startsWith('ffd8ff')) {
    format = 'jpeg';
  } else if (hex.startsWith('89504e47')) {
    format = 'png';
  } else if (hex.startsWith('47494638')) {
    format = 'gif';
  } else if (buffer.toString('utf8', 0, 4) === 'RIFF') {
    format = 'webp/riff';
  } else if (hex.startsWith('3c737667') || hex.startsWith('3c3f786d')) {
    format = 'svg';
  }
  
  if (format === 'unknown') {
    console.log(`INVALID FORMAT (${hex}): ${filePath} (Size: ${stats.size} bytes)`);
    return false;
  }
  
  console.log(`OK [${format}]: ${path.basename(filePath)} (${stats.size} bytes)`);
  return true;
}

console.log("Checking portraits...");
if (fs.existsSync(portraitsDir)) {
  const files = fs.readdirSync(portraitsDir);
  files.forEach(f => checkImage(path.join(portraitsDir, f)));
} else {
  console.log("Portraits directory does not exist!");
}

console.log("\nChecking other source images...");
if (fs.existsSync(otherDir)) {
  const files = fs.readdirSync(otherDir);
  files.forEach(f => {
    const fullPath = path.join(otherDir, f);
    if (fs.statSync(fullPath).isFile()) {
      checkImage(fullPath);
    }
  });
}
