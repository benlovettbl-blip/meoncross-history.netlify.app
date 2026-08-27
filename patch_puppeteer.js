const fs = require('fs');
let c = fs.readFileSync('export_pdfs.js', 'utf8');
c = c.replace(/puppeteer\.launch\(\{\s*headless:\s*'new'\s*\}\)/, "puppeteer.launch({ headless: 'new', protocolTimeout: 300000, timeout: 120000 })");
fs.writeFileSync('export_pdfs.js', c);
