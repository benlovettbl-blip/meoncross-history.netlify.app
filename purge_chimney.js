const fs = require('fs');
const path = require('path');

function purgeChimneyStuff(dir) {
  if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('www') || dir.includes('public')) {
    return; // skip these, we rebuild them
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      purgeChimneyStuff(fullPath);
    } else {
      if (fullPath.endsWith('.html') && !fullPath.includes('bundled_app.html')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        // Remove HTML block
        const containerRegex = /\s*<!--\s*Chimney Sweep Quote Container[\s\S]*?(?:<\/div>\s*<\/div>\s*<\/div>|\n\s*<!--\s*XP Level|\n\s*<div\s+style="display:\s*flex;\s*align-items:\s*center;\s*gap:\s*1\.5rem)/;
        
        // Let's use a simpler approach: finding the start and manually extracting it.
        let startIndex = content.indexOf('header-brand-quote-container');
        if (startIndex !== -1) {
          // Find the start of this div
          let divStart = content.lastIndexOf('<div', startIndex);
          // Look for preceding comments to remove them too
          let commentStart = content.lastIndexOf('<!-- Chimney', divStart);
          let removeStart = (commentStart !== -1 && (divStart - commentStart) < 200) ? commentStart : divStart;
          
          let openDivs = 0;
          let removeEnd = -1;
          for (let i = divStart; i < content.length; i++) {
            if (content.substr(i, 4) === '<div') openDivs++;
            if (content.substr(i, 5) === '</div') {
              openDivs--;
              if (openDivs === 0) {
                removeEnd = i + 6;
                break;
              }
            }
          }
          if (removeEnd !== -1) {
            content = content.substring(0, removeStart) + content.substring(removeEnd);
            modified = true;
          }
        }
        
        // sometimes there's a second one (e.g. firefly_embed)
        startIndex = content.indexOf('header-brand-quote-container');
        if (startIndex !== -1) {
            let divStart = content.lastIndexOf('<div', startIndex);
            let commentStart = content.lastIndexOf('<!-- Chimney', divStart);
            let removeStart = (commentStart !== -1 && (divStart - commentStart) < 200) ? commentStart : divStart;
            let openDivs = 0;
            let removeEnd = -1;
            for (let i = divStart; i < content.length; i++) {
              if (content.substr(i, 4) === '<div') openDivs++;
              if (content.substr(i, 5) === '</div') {
                openDivs--;
                if (openDivs === 0) {
                  removeEnd = i + 6;
                  break;
                }
              }
            }
            if (removeEnd !== -1) {
              content = content.substring(0, removeStart) + content.substring(removeEnd);
              modified = true;
            }
        }

        if (modified) {
          fs.writeFileSync(fullPath, content);
          console.log(`Patched HTML: ${fullPath}`);
        }
      }

      if (fullPath.endsWith('.js') && !fullPath.includes('app_fetched')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        const jsRemovals = [
          /const brandQuotes = \{[\s\S]*?\n  \};\n/g,
          /let currentQuoteIndex = 0;\n/g,
          /let currentQuoteLesson = 1;\n/g,
          /window\.updateChimneyQuoteForLesson = function\([\s\S]*?\n  \};\n/g,
          /window\.cycleBrandQuote = function\([\s\S]*?\n  \};\n/g,
          /updateChimneyQuoteForLesson\([^)]*\);?\n?/g,
          /const container = document\.getElementById\('header-brand-quote-container'\);[\s\S]*?\}\n/g
        ];

        for (const regex of jsRemovals) {
          if (regex.test(content)) {
            content = content.replace(regex, '');
            modified = true;
          }
        }

        // Handle specific case for usa/app.js or src/brand_config.js
        if (content.includes('header-brand-quote-container')) {
            content = content.replace(/const container = document\.getElementById\('header-brand-quote-container'\);[\s\S]*?\}\n/g, '');
            content = content.replace(/document\.getElementById\('header-brand-quote-container'\)[\s\S]*?\}[\s\S]*?\}/g, '');
            modified = true;
        }

        if (modified) {
          fs.writeFileSync(fullPath, content);
          console.log(`Patched JS: ${fullPath}`);
        }
      }

      if (fullPath.endsWith('.css') || fullPath.endsWith('.html')) { // Some CSS is in HTML style tags
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        // Strip CSS rules containing bouncy-chimney or header-brand-quote-container
        const cssRegex = /(\.[a-zA-Z0-9_-]*(?:header-brand-quote-container|bouncy-chimney)[^{]*\{[\s\S]*?\}(?:\n|$))/g;
        let oldContent;
        do {
            oldContent = content;
            content = content.replace(cssRegex, '');
        } while (content !== oldContent);
        
        if (content !== oldContent || content.includes('bouncy-chimney')) {
            modified = true;
        }

        if (modified) {
          fs.writeFileSync(fullPath, content);
          console.log(`Patched CSS/HTML style: ${fullPath}`);
        }
      }
    }
  }
}

purgeChimneyStuff(__dirname);
console.log('Purge complete');
