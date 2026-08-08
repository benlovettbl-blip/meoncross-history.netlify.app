const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'public/units');
const unitDirs = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

const aliases = {
    "Prof. Peter Frankopan": ["Professor Peter Frankopan", "Prof. Peter Frankopan", "Peter Frankopan"],
    "Dr. Geoffrey Parker": ["Dr. Geoffrey Parker", "Geoffrey Parker"],
    "Sir John Seeley": ["Sir John Seeley", "John Seeley"],
    "Prof. Shashi Tharoor": ["Professor Shashi Tharoor", "Prof. Shashi Tharoor", "Shashi Tharoor"],
    "Prof. Christopher Hill": ["Professor Christopher Hill", "Prof. Christopher Hill", "Christopher Hill"],
    "Prof. Eric Williams": ["Professor Eric Williams", "Prof. Eric Williams", "Eric Williams"],
    "Reginald Coupland": ["Reginald Coupland"],
    "Prof. Roy Porter": ["Professor Roy Porter", "Prof. Roy Porter", "Roy Porter"],
    "Prof. J.C.D. Clark": ["Professor J.C.D. Clark", "Prof. J.C.D. Clark", "J.C.D. Clark"],
    "Admiral Zheng He": ["Admiral Zheng He", "Zheng He"],
    "King Charles I": ["King Charles I", "Charles I"],
    "King Charles II": ["King Charles II", "Charles II"],
    "Sir Walter Raleigh": ["Sir Walter Raleigh", "Walter Raleigh"],
    "Mary, Queen of Scots": ["Mary, Queen of Scots", "Mary Stuart"],
    "King James I": ["King James I", "James I"],
    "Henry Fielding": ["Henry Fielding"],
    "Robert Clive": ["Robert Clive"],
    "William Wilberforce": ["William Wilberforce", "Wilberforce"],
    "Toussaint Louverture": ["Toussaint Louverture", "Toussaint"],
    "Olaudah Equiano": ["Olaudah Equiano", "Equiano"],
    "Chief Powhatan": ["Chief Powhatan", "Powhatan", "Wahunsenacawh"],
    "Emperor Jahangir": ["Emperor Jahangir", "Jahangir"],
    "Sir Thomas Roe": ["Sir Thomas Roe", "Thomas Roe"],
    "Nanny of the Maroons": ["Nanny of the Maroons", "Queen Nanny"]
};

for (const dir of unitDirs) {
    const dataPath = path.join(unitsDir, dir, 'data.js');
    if (!fs.existsSync(dataPath)) continue;
    
    let raw = fs.readFileSync(dataPath, 'utf8');
    const match = raw.match(/export const unitData = ([\s\S]+)/);
    if (!match) continue;
    let dataStr = match[1];
    if (dataStr.endsWith(';')) dataStr = dataStr.slice(0, -1);
    if (dataStr.endsWith(';\n')) dataStr = dataStr.slice(0, -2);
    
    let data;
    try {
        data = eval('(' + dataStr + ')');
    } catch(e) {
        console.error("Failed to parse " + dir + ": " + e);
        continue;
    }
    
    if (!data.key_individuals || data.key_individuals.length === 0) continue;
    
    // First, strip out ALL raw HTML links with jumpToKeyIndividual
    function stripRawLinks(obj) {
        if (typeof obj === 'string') {
            return obj.replace(/<a[^>]*jumpToKeyIndividual\('([^']+)'\)[^>]*>(.*?)<\/a>/g, "$2");
        }
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) obj[i] = stripRawLinks(obj[i]);
            return obj;
        }
        if (obj !== null && typeof obj === 'object') {
            for (let k in obj) {
                obj[k] = stripRawLinks(obj[k]);
            }
        }
        return obj;
    }
    data = stripRawLinks(data);
    
    // Now, apply the [Key Individual: Name] tag globally for the first occurrence
    let linkedIndividuals = new Set();
    
    const searchTerms = [];
    for (const person of data.key_individuals) {
        const pNames = aliases[person.name] ? aliases[person.name] : [person.name];
        for (const pName of pNames) {
            searchTerms.push({ search: pName, official: person.name, len: pName.length });
        }
    }
    // Sort by length descending so "King Charles I" matches before "Charles I"
    searchTerms.sort((a, b) => b.len - a.len);

    function applyTags(obj) {
        if (typeof obj === 'string') {
            let newStr = obj;
            for (const term of searchTerms) {
                if (linkedIndividuals.has(term.official)) continue;
                
                // Don't match if it's already inside [Key Individual: ...]
                // and avoid matching inside HTML attributes (like alt="...")
                // We'll use a simple regex replacing the whole word
                const regex = new RegExp(`(?<!\\[Key Individual:\\s*)(?<!alt=".*?)\\b(${term.search})\\b`, 'i');
                const m = newStr.match(regex);
                if (m) {
                    newStr = newStr.replace(regex, `[Key Individual: ${term.official}]`);
                    linkedIndividuals.add(term.official);
                }
            }
            return newStr;
        }
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                obj[i] = applyTags(obj[i]);
            }
            return obj;
        }
        if (obj !== null && typeof obj === 'object') {
            for (let k in obj) {
                if (['text', 'description', 'content', 'model_answer', 'question', 'image_context', 'image_caption'].includes(k) || (typeof obj[k] === 'string' && obj[k].length > 50)) {
                    obj[k] = applyTags(obj[k]);
                } else if (typeof obj[k] === 'object') {
                    obj[k] = applyTags(obj[k]);
                }
            }
        }
        return obj;
    }
    
    if (data.lessons) {
        for (let lesson of data.lessons) {
            applyTags(lesson);
        }
    }
    
    const output = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(dataPath, output, 'utf8');
    
    // Also copy to root folder if it exists
    const rootPath = path.join(__dirname, dir, 'data.js');
    if (fs.existsSync(rootPath)) {
        fs.writeFileSync(rootPath, output, 'utf8');
    }
    
    console.log(`Updated ${dir} - Linked ${linkedIndividuals.size} individuals.`);
}

console.log("Done linking individuals across all units.");
