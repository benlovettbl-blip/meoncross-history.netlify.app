const fs = require('fs');

function checkTransparency(filepath) {
  try {
    const buf = fs.readFileSync(filepath);
    // PNG signature check
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      // Find IDAT or loop through PNG structure to find if it has an alpha channel
      // Alternatively, let's parse the color type in IHDR
      // Color type is at byte 25
      const colorType = buf[25];
      console.log('Color Type:', colorType);
      // Color Type 6 is RGBA, 4 is Grayscale + Alpha
      return colorType === 6 || colorType === 4;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}

console.log('Is transparent PNG?', checkTransparency('C:/Users/fives/.gemini/antigravity/brain/6afc17fc-c4f8-4208-91bb-00957afe130a/media__1780839566599.png'));
