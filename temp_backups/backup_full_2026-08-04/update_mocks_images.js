const fs = require('fs');
const file = 'C:/Users/fives/.gemini/antigravity-ide/brain/1f9faa89-7f32-4037-a93a-b3731e9de1fe/scratch/extracted_mocks.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let bdmReplaced = false;
data.extractedMocks.forEach(m => {
    if (m.id === 'mock3_sectionB' && m.source_context) {
        const textToReplace = m.source_context.match(/Source B: A photograph showing members of the League of German Maidens.*?appears focused and happy\./s);
        if (textToReplace) {
            m.source_context = m.source_context.replace(
                textToReplace[0],
                `Source B: A photograph showing members of the League of German Maidens (BDM) practicing domestic skills in a specialized training center, 1937.**\n\n<img src="/images/bdm_domestic_skills.jpg" alt="BDM girls practicing domestic skills" style="max-width: 100%; height: auto; border: 1px solid #ccc; display: block; margin: 15px 0;">`
            );
            bdmReplaced = true;
        }
    }
});

let cartReplaced = false;
data.adapted2026.forEach(m => {
    if (m.source_context) {
        const textToReplace = m.source_context.match(/Source B: A 1923 photograph showing German citizens in Berlin using a cart.*?worthless\./s);
        if (textToReplace) {
            m.source_context = m.source_context.replace(
                textToReplace[0],
                `Source B: A 1923 photograph showing German citizens in Berlin using a cart to transport massive baskets of banknotes.**\n\n<img src="/images/weimar_hyperinflation_cart.jpg" alt="Hyperinflation cart full of banknotes" style="max-width: 100%; height: auto; border: 1px solid #ccc; display: block; margin: 15px 0;">`
            );
            cartReplaced = true;
        }
    }
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('BDM replaced:', bdmReplaced, 'Cart replaced:', cartReplaced);
