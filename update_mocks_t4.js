const fs = require('fs');
const file = 'C:/Users/fives/.gemini/antigravity-ide/brain/1f9faa89-7f32-4037-a93a-b3731e9de1fe/scratch/extracted_mocks.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let asterisksCleaned = 0;
let t4Replaced = false;

const processMock = (m) => {
    if (m.source_context) {
        if (m.source_context.includes('**')) {
            m.source_context = m.source_context.replace(/\*\*/g, '');
            asterisksCleaned++;
        }
        
        if (m.id === 'mock1_sectionB') {
            const startStr = 'Source C: A description of an official Nazi propaganda poster';
            const endStr = 'Office of Racial Policy."*';
            
            const startIdx = m.source_context.indexOf(startStr);
            const endIdx = m.source_context.indexOf(endStr);
            
            if (startIdx !== -1 && endIdx !== -1) {
                const before = m.source_context.substring(0, startIdx);
                const after = m.source_context.substring(endIdx + endStr.length);
                m.source_context = before + `Source C: An official Nazi propaganda poster, published by the Office of Racial Policy in 1938.\n\n<img src="/images/t4_poster.jpg" alt="T4 propaganda poster showing cost of hereditary defects" style="max-width: 100%; height: auto; border: 1px solid #ccc; display: block; margin: 15px 0;">` + after;
                t4Replaced = true;
            }
        }
    }
};

data.extractedMocks.forEach(processMock);
data.adapted2026.forEach(processMock);

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log(`Asterisks cleaned in ${asterisksCleaned} items.`);
console.log(`T4 poster replaced: ${t4Replaced}`);
