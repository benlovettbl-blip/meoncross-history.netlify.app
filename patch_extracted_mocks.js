const fs = require('fs');
const file = 'C:/Users/fives/.gemini/antigravity-ide/brain/1f9faa89-7f32-4037-a93a-b3731e9de1fe/scratch/extracted_mocks.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const fixMocks = (mocks) => {
    if (!mocks) return;
    mocks.forEach(m => {
        // Fix stimulus: remove asterisks and trim to 2 items
        if (m.stimulus && Array.isArray(m.stimulus)) {
            m.stimulus = m.stimulus.map(s => s.replace(/^\*\s*/, '').trim()).slice(0, 2);
        }
        
        // Remove italics asterisks in source_context
        if (m.source_context) {
            // Replace `*text*` with text
            m.source_context = m.source_context.replace(/\*([^*]+)\*/g, '$1');
        }
        
        // Add provenance translation for T4 poster in Mock 1 Section B
        if (m.id === 'mock1_sectionB') {
            const oldStr = 'Source C: An official Nazi propaganda poster, published by the Office of Racial Policy in 1938.';
            const newStr = 'Source C: An official Nazi propaganda poster, published by the Office of Racial Policy in 1938. The German text translates to: "60,000 Reichsmarks is what this person suffering from a hereditary defect costs the People\'s community during his lifetime. Fellow citizen, that is your money too."';
            m.source_context = m.source_context.replace(oldStr, newStr);
        }
        
        // Fix glitch in Mock 4 adapted2026
        if (m.source_context && m.source_context.includes('>tograph showing German citizens')) {
            m.source_context = m.source_context.replace(/>tograph showing German citizens in Berlin using a cart to transport massive baskets full of worthless paper currency\./, '>');
        }
    });
};

fixMocks(data.extractedMocks);
fixMocks(data.adapted2026);

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Fixed extracted_mocks.json');
