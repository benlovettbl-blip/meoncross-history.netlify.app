const fs = require('fs');

const dataStr = fs.readFileSync('great_war_part2/data.js', 'utf8');
const jsonStr = dataStr.substring(dataStr.indexOf('{'));
// It has a trailing semicolon or something? 
// Let's strip the trailing semicolon if it exists.
let cleanedJsonStr = jsonStr.trim();
if (cleanedJsonStr.endsWith(';')) {
    cleanedJsonStr = cleanedJsonStr.slice(0, -1);
}

const data = JSON.parse(cleanedJsonStr);

const countWords = (str) => {
    if (!str) return 0;
    // Remove HTML tags
    const plain = str.replace(/<[^>]*>?/gm, ' ');
    // Count words
    const words = plain.split(/\s+/).filter(w => w.length > 0);
    return words.length;
};

data.lessons.forEach(l => {
    let words = 0;
    if (l.narrative_blocks) {
        l.narrative_blocks.forEach(b => {
            words += countWords(b.title);
            words += countWords(b.text);
            if (b.tasks) {
                b.tasks.forEach(t => {
                    words += countWords(t.text);
                    words += countWords(t.model);
                });
            }
        });
    }
    console.log(`${l.id}: ${words} words`);
});
