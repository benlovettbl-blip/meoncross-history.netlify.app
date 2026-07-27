const fs = require('fs');

async function processUnit(unitId) {
    const dataPath = `c:/Projects/meoncross-history.netlify.app/${unitId === 'cme_new' ? 'public/units/cme_new' : unitId}/data.js`;
    if (!fs.existsSync(dataPath)) {
        return;
    }

    const mod = await import('file://' + dataPath + '?update=' + Date.now());
    const data = mod.unitData;
    let modified = false;

    // 1. Gather all lesson images
    const images = [];
    data.lessons.forEach(l => {
        if (l.primary_source && l.primary_source.src && l.primary_source.caption) {
            images.push({ src: l.primary_source.src, caption: l.primary_source.caption });
        }
        if (l.sources) {
            l.sources.forEach(s => {
                if (s.src && s.caption) {
                    images.push({ src: s.src, caption: s.caption });
                }
            });
        }
    });

    if (images.length === 0) return;

    // Helper to tokenize and strip stop words
    const stopWords = new Set(['the', 'and', 'in', 'of', 'to', 'a', 'is', 'for', 'on', 'with', 'by', 'during', 'an', 'at']);
    function getTokens(str) {
        return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w));
    }

    const usedImages = new Set();

    function injectImages(events) {
        events.forEach(evt => {
            if (evt.image) return; // Already has an image (e.g., from key individuals)

            const evtText = (evt.title || '') + ' ' + (evt.text || '') + ' ' + (evt.description || '');
            const evtTokens = getTokens(evtText);

            let bestMatch = null;
            let maxScore = 0;

            images.forEach(img => {
                if (usedImages.has(img.src)) return;
                const imgTokens = getTokens(img.caption);
                let score = 0;
                imgTokens.forEach(t => {
                    if (evtTokens.includes(t)) score++;
                });

                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = img;
                }
            });

            // If we have a reasonable match (e.g., at least 1 overlapping meaningful word)
            if (bestMatch && maxScore >= 1) {
                evt.image = bestMatch.src;
                evt.image_caption = bestMatch.caption;
                usedImages.add(bestMatch.src);
                modified = true;
            }
        });
    }

    if (data.timeline) {
        if (data.timeline.length > 0 && data.timeline[0].events) {
            data.timeline.forEach(group => injectImages(group.events));
        } else {
            injectImages(data.timeline);
        }
    }

    if (modified) {
        const fileContent = fs.readFileSync(dataPath, 'utf-8');
        const jsonStr = JSON.stringify(data, null, 2);
        
        let newContent = '';
        if (fileContent.includes('export const unitData =')) {
             newContent = fileContent.replace(/export const unitData = [\s\S]*;/, 'export const unitData = ' + jsonStr + ';');
             newContent = newContent.replace(/"mock_exams": \{\}/g, '"mock_exams": mock_exams');
        } else {
             newContent = `export const unitData = ${jsonStr};`;
        }

        fs.writeFileSync(dataPath, newContent, 'utf-8');
        console.log(`Injected visuals for ${unitId}!`);
    }
}

async function main() {
    await processUnit('cme_new');
    await processUnit('edexcel_medicine');
}
main();
