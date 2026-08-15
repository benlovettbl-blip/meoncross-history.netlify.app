import fs from 'fs';
import path from 'path';

const allDirs = fs.readdirSync('.', { withFileTypes: true })
    .filter(d => d.isDirectory() && fs.existsSync(path.join(d.name, 'data.js')))
    .map(d => d.name);

let totalReplaced = 0;

allDirs.forEach(unit => {
    const dataPath = path.join(unit, 'data.js');
    let content = fs.readFileSync(dataPath, 'utf8');
    
    // We want to match: [Key Individual: Simon Schama] or (Key individual: Simon Schama) or [Key individual Simon Schama]
    // The most robust regex for what we saw:
    // /\[Key Individual:\s*([^\]]+)\]/gi
    // /\(Key Individual:\s*([^\)]+)\)/gi

    let originalLength = content.length;

    // 1. Match bracketed [Key Individual: Name]
    content = content.replace(/\[Key [Ii]ndividual:\s*([^\]]+)\]/g, '$1');
    
    // 2. Match parenthesis (Key Individual: Name)
    content = content.replace(/\(Key [Ii]ndividual:\s*([^\)]+)\)/g, '$1');

    // 3. Just in case there are some without the colon, e.g. [Key Individual Simon Schama]
    content = content.replace(/\[Key [Ii]ndividual\s*([^\]]+)\]/g, '$1');

    if (content.length !== originalLength) {
        fs.writeFileSync(dataPath, content);
        console.log(`✅ Cleaned Key Individuals from ${unit}/data.js`);
        totalReplaced++;
    }
});

console.log(`\nDone! Cleaned Key Individual tags from ${totalReplaced} units.`);
