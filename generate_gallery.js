const fs = require('fs');
const path = require('path');

const dataPath = path.join('c:\\Projects\\meoncross-history.netlify.app', 'early_modern_world', 'data.js');

let f = fs.readFileSync(dataPath, 'utf8');
let jsonStr = f.substring(f.indexOf('export const unitData = ') + 24);
jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(';') > -1 ? jsonStr.lastIndexOf(';') : jsonStr.length);
let unit = eval('(' + jsonStr + ')');

let html = '<html><body style="font-family:sans-serif; padding:20px;"><h1>Image Audit</h1>'; 

unit.lessons.forEach(l => { 
    html += '<h2>' + l.title + '</h2>'; 
    if (l.narrative_blocks) {
        l.narrative_blocks.forEach(b => { 
            if (b.image) {
                html += '<div style="margin-bottom:20px; border:1px solid #ccc; padding:10px;">';
                html += '<img src=".' + b.image + '" style="max-width:300px"/><br/>';
                html += '<b>File:</b> ' + b.image + '<br/>';
                html += '<b>Caption:</b> ' + (b.image_caption || 'None') + '<br/>';
                html += '<b>Alt:</b> ' + (b.image_alt || 'None');
                html += '</div>';
            }
            if (b.images) {
                b.images.forEach(img => {
                    html += '<div style="margin-bottom:20px; border:1px solid #ccc; padding:10px;">';
                    html += '<img src=".' + img.src + '" style="max-width:300px"/><br/>';
                    html += '<b>File:</b> ' + img.src + '<br/>';
                    html += '<b>Caption:</b> ' + (img.caption || 'None') + '<br/>';
                    html += '<b>Alt:</b> ' + (img.alt || 'None');
                    html += '</div>';
                });
            }
        }); 
    }
}); 
html += '</body></html>'; 
fs.writeFileSync('public/audit_gallery.html', html);
console.log("Gallery created.");
