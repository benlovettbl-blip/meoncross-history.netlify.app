import fs from 'fs';

let content = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');

// Regex to remove the entire dummy video block
const regex = /"video":\s*\{\s*"type":\s*"youtube",\s*"url":\s*"https:\/\/www\.youtube-nocookie\.com\/embed\/YOUR_VIDEO_ID\?rel=0&modestbranding=1",[^}]+\},\s*/g;

content = content.replace(regex, '');

fs.writeFileSync('weimar_nazi_germany/data.js', content, 'utf8');
console.log('Cleaned dummy videos.');
