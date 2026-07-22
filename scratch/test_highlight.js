const data = require('../public/data/edexcel_medicine.json');
const biographies = data.biographies;

const highlightIndividuals = (text) => {
    if (!biographies || biographies.length === 0) return text;
    let processedText = text;
    for (const person of biographies) {
        const regex = new RegExp(`\\b(${person.name})\\b`, 'i');
        if (regex.test(processedText)) {
            const img = person.image_url || null;
            processedText = processedText.replace(regex, `<span class="person-link" data-role="${person.role.replace(/"/g, '&quot;')}" data-bio="${person.bio.replace(/"/g, '&quot;')}">$1</span>`);
        }
    }
    return processedText;
};

try {
    data.data.lessons.forEach((lesson, index) => {
        if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(block => {
                let text = highlightIndividuals(block.text || '');
                let l4 = highlightIndividuals(block.level_4 || '');
            });
        }
    });
    console.log("SUCCESS");
} catch (e) {
    console.error("FAILED", e);
}
