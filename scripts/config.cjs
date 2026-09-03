const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

module.exports = {
  PATHS: {
    ROOT: ROOT_DIR,
    PUBLIC: path.join(ROOT_DIR, 'public'),
    UNITS: path.join(ROOT_DIR, 'public', 'units'),
    PDFS: path.join(ROOT_DIR, 'public', 'pdfs'),
    IMAGES: path.join(ROOT_DIR, 'public', 'images'),
    SCRIPTS: path.join(ROOT_DIR, 'scripts'),
    SRC: path.join(ROOT_DIR, 'src')
  }
};
