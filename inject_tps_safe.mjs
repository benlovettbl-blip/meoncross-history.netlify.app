import fs from 'fs';
import path from 'path';

const rootDir = 'c:/Projects/meoncross-history.netlify.app';

// The directories where the source data.js lives for these units:
// (Note: The source of truth for some is the root dir, for others it's public/units/)
const activeUnits = [
    { id: 'australia', src: 'public/units/australia/data.js' },
    { id: 'cme_new', src: 'cme_lesson1.json' }, // wait, what's cme_new? Let's check public/units
    { id: 'edexcel_medicine', src: 'edexcel_medicine/data.js' },
    { id: 'great_war', src: 'great_war/data.js' },
    { id: 'great_war_part2', src: 'great_war_part2/data.js' },
    { id: 'industrialisation_and_empire', src: 'industrialisation_and_empire/data.js' },
    { id: 'water_and_sanitation', src: 'water_and_sanitation/data.js' },
    { id: 'early_modern_world', src: 'early_modern_world/data.js' },
    { id: 'weimar_nazi_germany', src: 'weimar_nazi_germany/data.js' },
    { id: 'eee', src: 'eee/data.js' }
];

async function run() {
    for (const u of activeUnits) {
        let file = path.join(rootDir, u.src);
        if (!fs.existsSync(file)) {
             // Fallback to public/units
             file = path.join(rootDir, 'public', 'units', u.id, 'data.js');
             if (!fs.existsSync(file)) {
                 console.log(`Could not find data.js for ${u.id}`);
                 continue;
             }
        }
        
        console.log(`Processing ${u.id}...`);
        let code = fs.readFileSync(file, 'utf8');
        
        // Extract the JS object. We need to handle both `export const` and `const unitData =`
        let isExport = code.includes('export const unitData =');
        let jsonStr = code.replace(/export const unitData = /, '').replace(/const unitData = /, '').replace(/;\s*$/, '');
        
        let data;
        try {
            data = JSON.parse(jsonStr);
        } catch(e) {
            console.error(`Failed to parse ${u.id}: ${e.message.substring(0, 50)}`);
            continue;
        }

        let injectedCount = 0;

        if (data.lessons) {
            data.lessons.forEach(l => {
                // Skip empty/placeholder lessons
                if (!l.narrative_blocks || l.narrative_blocks.length === 0) return;
                if (l.narrative_blocks.length === 1 && l.narrative_blocks[0].text && l.narrative_blocks[0].text.includes("Placeholder")) return;

                // Check if TPS already exists anywhere in the lesson
                let hasTPS = false;
                l.narrative_blocks.forEach(b => {
                    if (b.tasks) {
                        b.tasks.forEach(t => {
                            if (t.type === 'think_pair_share') hasTPS = true;
                        });
                    }
                });

                if (!hasTPS) {
                    // Inject to the last narrative block
                    const lastBlock = l.narrative_blocks[l.narrative_blocks.length - 1];
                    if (!lastBlock.tasks) lastBlock.tasks = [];
                    
                    lastBlock.tasks.push({
                        "type": "think_pair_share",
                        "question": `Think-Pair-Share: Based on the events we have studied in this lesson, what do you think was the most significant turning point or consequence? Discuss your reasoning with your partner.`
                    });
                    injectedCount++;
                }
            });
        }

        if (injectedCount > 0) {
            let output = (isExport ? 'export const unitData = ' : 'const unitData = ') + JSON.stringify(data, null, 2) + ';\n';
            fs.writeFileSync(file, output);
            console.log(`✅ Injected ${injectedCount} TPS tasks into ${u.id}.`);
        } else {
            console.log(`No injection needed for ${u.id}.`);
        }
    }
}

run().catch(console.error);
