const fs = require('fs');
let html = fs.readFileSync('cme_new/index.html', 'utf8');

html = html.replace(/<title>.*?<\/title>/, '<title>History Hub - Unit</title>');

// Change the app.js script tag to a unified router script
html = html.replace(/<script type="module" src="\.\/app\.js"><\/script>/, '<script type="module" src="/src/unit_router.js"></script>');

// Also fix any relative paths like href="../style.css" to href="/style.css"
html = html.replace(/href="\.\.\/style\.css"/g, 'href="/style.css"');
html = html.replace(/href="style\.css"/g, 'href="/style.css"');

fs.writeFileSync('unit.html', html, 'utf8');
console.log('Created unit.html');
