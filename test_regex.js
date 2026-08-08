const unitData = {
    key_individuals: [{name: "Sultan Mehmed II"}],
    lessons: []
};

let vocabDict = {
    "Sultan Mehmed II": "Captured Constantinople in 1453."
};

let seenTerms = new Set();
const highlightGlossary = (text) => {
    if (!text || typeof text !== 'string') return text || '';
    if (Object.keys(vocabDict).length === 0) return text;
    let processedText = text;
    const sortedTerms = Object.keys(vocabDict).sort((a,b) => b.length - a.length);
    for (const term of sortedTerms) {
        const def = vocabDict[term];
        if (!def || typeof def !== 'string') continue;
        if (!seenTerms.has(term)) {
        // Regex matches HTML tags OR the specific term word boundary
        const regex = new RegExp(`(<[^>]+>)|\\b(${term})\\b`, 'gi');
        let matchedTerm = false;
        
        processedText = processedText.replace(regex, (match, htmlTag, word) => {
            if (htmlTag) return htmlTag; // Skip and preserve anything already in an HTML tag
            if (word) {
            matchedTerm = true;
            return `<span class="vocab-word" data-definition="${def.replace(/"/g, '&quot;')}">${word}</span>`;
            }
            return match;
        });
        
        if (matchedTerm) {
            seenTerms.add(term);
        }
        }
    }
    return processedText;
};

const blockText = "it was the military machine of 21-year-old [Key Individual: Sultan Mehmed II] of the Ottoman Empire.";

let window = { seenKeyIndividuals: new Set() };

// 1. Add inline Key Individual links FIRST
let contentStr = blockText.replace(/\[Key Individual:\s*([^\]]+)\]/gi, (match, name) => {
    const hasPerson = unitData && unitData.key_individuals && unitData.key_individuals.some(p => p.name && p.name.toLowerCase() === name.toLowerCase());
    if (!hasPerson) {
        return name;
    }
    if (window.seenKeyIndividuals && window.seenKeyIndividuals.has(name)) {
        return name;
    }
    if (window.seenKeyIndividuals) window.seenKeyIndividuals.add(name);
    return `<a href="javascript:void(0)" class="key-individual-inline-link no-print" onclick="window.jumpToKeyIndividual('${name}')" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer; padding: 2px 6px; font-size: 0.95em; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; vertical-align: baseline;"><i class="fa-solid fa-id-card-clip"></i> ${name}</a><span class="print-only" style="display:none; font-weight:bold;">${name}</span>`;
});

// 2. Add Glossary highlighting SECOND (it will skip the <a> tags we just made)
contentStr = highlightGlossary(contentStr);

console.log(contentStr);
