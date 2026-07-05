const fs = require('fs');
const path = require('path');

const wwwPath = path.join(__dirname, 'www');

// Clean or create the www directory
if (fs.existsSync(wwwPath)) {
  console.log('Cleaning existing www/ directory...');
  fs.rmSync(wwwPath, { recursive: true, force: true });
}

fs.mkdirSync(wwwPath, { recursive: true });
fs.mkdirSync(path.join(wwwPath, 'assets'), { recursive: true });

console.log('Copying web assets to www/...');
fs.copyFileSync('index.html', path.join(wwwPath, 'index.html'));
fs.copyFileSync('styles.css', path.join(wwwPath, 'styles.css'));
fs.copyFileSync('data.js', path.join(wwwPath, 'data.js'));
fs.copyFileSync('app.js', path.join(wwwPath, 'app.js'));
fs.copyFileSync(
  path.join('assets', 'data.json'),
  path.join(wwwPath, 'assets', 'data.json')
);
fs.copyFileSync(
  path.join('assets', 'fareham_chimney.png'),
  path.join(wwwPath, 'assets', 'fareham_chimney.png')
);

// Copy Font Awesome for offline support
const faSrcDir = path.join(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free');
if (fs.existsSync(faSrcDir)) {
  console.log('Copying Font Awesome assets for offline support...');
  const faDestDir = path.join(wwwPath, 'assets', 'fontawesome');
  fs.mkdirSync(faDestDir, { recursive: true });
  fs.mkdirSync(path.join(faDestDir, 'css'), { recursive: true });
  fs.mkdirSync(path.join(faDestDir, 'webfonts'), { recursive: true });

  fs.copyFileSync(
    path.join(faSrcDir, 'css', 'all.min.css'),
    path.join(faDestDir, 'css', 'all.min.css')
  );

  const webfonts = fs.readdirSync(path.join(faSrcDir, 'webfonts'));
  for (const fontFile of webfonts) {
    fs.copyFileSync(
      path.join(faSrcDir, 'webfonts', fontFile),
      path.join(faDestDir, 'webfonts', fontFile)
    );
  }
  console.log('Font Awesome assets copied successfully!');
} else {
  console.log('Warning: Font Awesome npm package not found in node_modules.');
}

console.log('Web directory synchronized successfully in www/!');
