const fs = require('fs');
const path = require('path');

const appDataDirs = [
  process.env.APPDATA, // Roaming
  process.env.LOCALAPPDATA // Local
];

appDataDirs.forEach(baseDir => {
  if (!baseDir) return;
  const searchInDir = path.join(baseDir, 'gcloud');
  if (fs.existsSync(searchInDir)) {
    console.log(`Found gcloud dir: ${searchInDir}`);
  }
  // Let's do a quick search in the base directory for any file containing credentials or tokens
  try {
    const files = fs.readdirSync(baseDir);
    files.forEach(file => {
      if (file.toLowerCase().includes('credentials') || file.toLowerCase().includes('tokens') || file.toLowerCase().includes('client_secret')) {
        console.log(`Found in AppData: ${path.join(baseDir, file)}`);
      }
    });
  } catch (e) {}
});
