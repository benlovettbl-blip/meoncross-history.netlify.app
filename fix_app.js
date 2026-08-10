const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

const regex = /<div id="para-\$\{index \+ 1\}"[\s\S]*?<div class="para-number">\$\{index \+ 1\}<\/div>/g;

if (regex.test(code)) {
    code = code.replace(regex, (match) => {
        const replacement = '${(!block.text || !block.text.trim() || (typeof block.text === \'string\' && block.text.includes(\'side-quest-box\')) || (block.title && block.title.toLowerCase().includes(\'lesson reflection\'))) ? \'\' : \'<div class="para-number">\' + (index + 1) + \'</div>\'}';
        return match.replace('<div class="para-number">${index + 1}</div>', replacement);
    });
    fs.writeFileSync('src/core_app.js', code);
    console.log('Regex replace successful');
} else {
    console.log('Regex failed to match');
}
