import fs from 'fs';

let content = fs.readFileSync('weimar_nazi_germany/data.js', 'utf8');

// The exact injected video strings (using regex to be safe with whitespace)
const regexes = [
    /"video":\s*\{\s*"type":\s*"youtube",\s*"url":\s*"https:\/\/www\.youtube\.com\/embed\/MQWdq-Q9Q24"[\s\S]*?"model_answer":\s*"[^"]+"\s*\},\s*/,
    /"video":\s*\{\s*"type":\s*"youtube",\s*"url":\s*"https:\/\/www\.youtube\.com\/embed\/CrzGlkI-W90"[\s\S]*?"model_answer":\s*"[^"]+"\s*\},\s*/,
    /"video":\s*\{\s*"type":\s*"youtube",\s*"url":\s*"https:\/\/www\.youtube\.com\/embed\/zr9KGQyhbD0"[\s\S]*?"model_answer":\s*"[^"]+"\s*\},\s*/,
    /"video":\s*\{\s*"type":\s*"youtube",\s*"url":\s*"https:\/\/www\.youtube\.com\/embed\/vO-_HXO7HwY"[\s\S]*?"model_answer":\s*"[^"]+"\s*\},\s*/
];

let removed = 0;
regexes.forEach((regex, i) => {
    if (regex.test(content)) {
        content = content.replace(regex, '');
        removed++;
        console.log(`Removed YouTube video ${i + 1}`);
    } else {
        console.log(`Could not find YouTube video ${i + 1}`);
    }
});

fs.writeFileSync('weimar_nazi_germany/data.js', content, 'utf8');
console.log(`Rollback complete. Removed ${removed} videos.`);
