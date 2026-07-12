import fs from 'fs';

let dataJs = fs.readFileSync('cme_new/data.js', 'utf8');

// The replacement was: `<img src="assets/${diag.id}.svg" class="svg-diagram" style="max-width: 100%; border-radius: 8px;" alt="${diag.id}">`
// We need to change `"assets/...` to `\\"assets/...` because data.js wraps it in double quotes.
// Let's replace the raw double quotes inside these img tags.

dataJs = dataJs.replace(/<img src="assets\/([^"]+)\.svg" class="svg-diagram" style="max-width: 100%; border-radius: 8px;" alt="([^"]+)">/g, 
  '<img src=\\"assets/$1.svg\\" class=\\"svg-diagram\\" style=\\"max-width: 100%; border-radius: 8px;\\" alt=\\"$2\\">');

// Also fix the HTML table replacements from build_diagrams.mjs
dataJs = dataJs.replace(/<table class="table-auto w-full mt-4 text-left border-collapse" style="background-color: white; border: 1px solid #ddd;">/g, 
  '<table class=\\"table-auto w-full mt-4 text-left border-collapse\\" style=\\"background-color: white; border: 1px solid #ddd;\\">');
dataJs = dataJs.replace(/<caption style="font-weight: bold; padding: 10px; background-color: #f8f9fa; border: 1px solid #ddd; border-bottom: none;">/g, 
  '<caption style=\\"font-weight: bold; padding: 10px; background-color: #f8f9fa; border: 1px solid #ddd; border-bottom: none;\\">');
dataJs = dataJs.replace(/<tr style="background-color: #e9ecef;">/g, '<tr style=\\"background-color: #e9ecef;\\">');
dataJs = dataJs.replace(/<th style="padding: 10px; border: 1px solid #ddd;">/g, '<th style=\\"padding: 10px; border: 1px solid #ddd;\\">');
dataJs = dataJs.replace(/<td style="padding: 10px; border: 1px solid #ddd; vertical-align: top;">/g, '<td style=\\"padding: 10px; border: 1px solid #ddd; vertical-align: top;\\">');
dataJs = dataJs.replace(/class="info-box"/g, 'class=\\"info-box\\"');

// The div list from build_remaining_diagrams.mjs
dataJs = dataJs.replace(/<div style="background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">/g, 
  '<div style=\\"background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;\\">');
dataJs = dataJs.replace(/<h3 style="margin-top: 0; color: #333; text-align: center;">/g, 
  '<h3 style=\\"margin-top: 0; color: #333; text-align: center;\\">');
dataJs = dataJs.replace(/<ol style="line-height: 1.6; margin-bottom: 0;">/g, 
  '<ol style=\\"line-height: 1.6; margin-bottom: 0;\\">');
dataJs = dataJs.replace(/<ul style="line-height: 1.6; margin-bottom: 0; list-style-type: none; padding-left: 0;">/g, 
  '<ul style=\\"line-height: 1.6; margin-bottom: 0; list-style-type: none; padding-left: 0;\\">');

fs.writeFileSync('cme_new/data.js', dataJs);
console.log('Fixed quotes in data.js');
