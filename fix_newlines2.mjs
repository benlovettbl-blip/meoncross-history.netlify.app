import fs from 'fs';

let dataJs = fs.readFileSync('cme_new/data.js', 'utf8');

// Find any double quoted string value that has physical newlines in it.
// Actually, let's just find the exact block and replace it since we know exactly where it is.
dataJs = dataJs.replace(/"\n<div style=\\"background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;\\">\n  <h3 style=\\"margin-top: 0; color: #333; text-align: center;\\">SPECIFICATION STUDY MAP: KEY TOPIC 2.1<\/h3>([\s\S]*?)<\/div>"/g, (match) => {
  return match.replace(/\n/g, '\\n').replace(/"\\n<div/, '"<div');
});

dataJs = dataJs.replace(/"\n<div style=\\"background-color: #f8f9fa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px;\\">\n  <h3 style=\\"margin-top: 0; color: #333; text-align: center;\\">THE MAY 1967 CASCADE: CHRONOLOGY OF CRISIS<\/h3>([\s\S]*?)<\/div>"/g, (match) => {
  return match.replace(/\n/g, '\\n').replace(/"\\n<div/, '"<div');
});

// Fix tables too
dataJs = dataJs.replace(/"\n<table([\s\S]*?)<\/table>"/g, (match) => {
  return match.replace(/\n/g, '\\n').replace(/"\\n<table/, '"<table');
});

fs.writeFileSync('cme_new/data.js', dataJs);
console.log('Fixed newlines in data.js');
