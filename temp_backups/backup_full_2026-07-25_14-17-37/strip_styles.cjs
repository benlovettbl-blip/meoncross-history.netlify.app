const fs = require('fs');
const path = require('path');

const getDirs = src => fs.readdirSync(src, {withFileTypes: true})
  .filter(d => d.isDirectory() && !d.name.startsWith('.'))
  .map(d => d.name);

const units = getDirs('./').filter(d => fs.existsSync(path.join(d, 'index.html')) && fs.existsSync(path.join(d, 'app.js')));

for (const unit of units) {
  const indexPath = path.join(unit, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Remove all <style> blocks
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
  
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log(`Stripped inline styles from ${unit}/index.html`);
}
