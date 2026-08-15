import fs from 'fs';
['australia', 'cold_war', 'the_shoah'].forEach(unit => {
    let file = unit + '/data.js';
    let data = fs.readFileSync(file, 'utf8');
    data = data.replace(/"homepage_background":\s*".*?"/g, '"homepage_background": ""');
    fs.writeFileSync(file, data);
    console.log('Fixed', unit);
});
