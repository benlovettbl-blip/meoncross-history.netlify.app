import fs from 'fs';

function patchUnit(unit) {
    const filePath = `${unit}/data.js`;
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
    let data = JSON.parse(jsonStr);

    let patched = false;

    data.lessons.forEach((lesson, lIdx) => {
        if (!lesson.narrative_blocks) return;

        // Collect all missing sources in this lesson
        let missingSources = new Set();
        lesson.narrative_blocks.forEach((block, bIdx) => {
            if (block.tasks) {
                block.tasks.forEach(t => {
                    const taskText = t.q || t.question || t.text || '';
                    const match = taskText.match(/Source [A-Z]/g);
                    if (match) {
                        match.forEach(src => {
                            let found = false;
                            lesson.narrative_blocks.forEach(b => {
                                const bAlt = b.image_alt || '';
                                const bTitle = b.title || '';
                                const bText = b.text || '';
                                if (bText.includes(src) || bAlt.includes(src) || bTitle.includes(src)) found = true;
                            });
                            if (!found) missingSources.add({ src, bIdx });
                        });
                    }
                });
            }
        });

        // Patch them
        missingSources.forEach(({ src, bIdx }) => {
            // First, try to apply it to the block where the task is
            const block = lesson.narrative_blocks[bIdx];
            if (block.image && block.image_alt && !block.image_alt.includes(src)) {
                if (src === 'Source U') {
                    // special case for typo
                    block.image_alt = 'Source A: ' + block.image_alt;
                    block.tasks.forEach(t => { if (t.text) t.text = t.text.replace('Source U', 'Source A'); });
                    console.log(`[PATCH] ${unit} L${lIdx+1} B${bIdx}: Fixed typo Source U -> Source A`);
                } else {
                    block.image_alt = src + ': ' + block.image_alt;
                    console.log(`[PATCH] ${unit} L${lIdx+1} B${bIdx}: Added ${src} to image_alt`);
                }
                patched = true;
            } else if (bIdx - 1 >= 0 && lesson.narrative_blocks[bIdx-1].image && lesson.narrative_blocks[bIdx-1].image_alt) {
                // Try the previous block if the current one has no image
                const prevBlock = lesson.narrative_blocks[bIdx-1];
                if (!prevBlock.image_alt.includes(src)) {
                    prevBlock.image_alt = src + ': ' + prevBlock.image_alt;
                    console.log(`[PATCH] ${unit} L${lIdx+1} B${bIdx-1}: Added ${src} to image_alt`);
                    patched = true;
                }
            } else {
                // If no image, try adding to the text
                block.text = `<strong>${src}:</strong> ` + (block.text || '');
                console.log(`[PATCH] ${unit} L${lIdx+1} B${bIdx}: Added ${src} to text`);
                patched = true;
            }
        });
    });

    if (patched) {
        const outStr = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n';
        fs.writeFileSync(filePath, outStr);
    }
}

['early_modern_world', 'industrialisation_and_empire'].forEach(patchUnit);
console.log('Patching complete');
