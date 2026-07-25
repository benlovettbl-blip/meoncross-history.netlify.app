const fs = require('fs');

function getPngSize(filepath) {
  try {
    const buf = fs.readFileSync(filepath);
    // check signature
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      const w = buf.readInt32BE(16);
      const h = buf.readInt32BE(20);
      return { type: 'PNG', w, h };
    }
    return { type: 'Not a PNG' };
  } catch (e) {
    return { error: e.message };
  }
}
console.log('media__1780839566599.png:', getPngSize('C:/Users/fives/.gemini/antigravity/brain/6afc17fc-c4f8-4208-91bb-00957afe130a/media__1780839566599.png'));
