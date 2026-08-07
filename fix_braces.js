const fs = require('fs');
let c = fs.readFileSync('src/core_app.js', 'utf8');

const regex = /html \+= extrasHtml;\r?\n\s*}\);\r?\n\s*html \+= \`<\/div>\`;\r?\n\s*}\r?\n\s*}\);/;

if (regex.test(c)) {
    c = c.replace(regex, `html += extrasHtml;\n        });\n        html += \`</div>\`;\n      }`);
    fs.writeFileSync('src/core_app.js', c);
    console.log("Fixed double });");
} else {
    console.log("Regex didn't match.");
}
