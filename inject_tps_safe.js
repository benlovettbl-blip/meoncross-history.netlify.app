const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = 'c:/Projects/meoncross-history.netlify.app';

const activeUnits = [
    { id: 'australia', src: 'public/units/australia/data.js' },
    { id: 'cme_new', src: 'public/units/cme_new/data.js' }, 
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
             file = path.join(rootDir, 'public', 'units', u.id, 'data.js');
             if (!fs.existsSync(file)) continue;
        }
        
        console.log(`Processing ${u.id}...`);
        let code = fs.readFileSync(file, 'utf8');
        let data;
        let prefix = '';
        let suffix = '';

        if (code.includes('module.exports =')) {
            prefix = 'module.exports = ';
            try {
                // Try to evaluate it
                const sandbox = { module: { exports: {} } };
                vm.createContext(sandbox);
                vm.runInContext(code, sandbox);
                data = sandbox.module.exports.unitData || sandbox.module.exports;
            } catch(e) {
                console.error(`Failed to parse ${u.id}:`, e.message); continue;
            }
        } else if (code.includes('export const unitData =')) {
            prefix = 'export const unitData = ';
            try {
                // Replace export to make it evaluatable
                let evaluatable = code.replace('export const unitData =', 'const unitData =');
                const sandbox = { unitData: null };
                vm.createContext(sandbox);
                vm.runInContext(evaluatable + '; this.unitData = unitData;', sandbox);
                data = sandbox.unitData;
            } catch(e) {
                console.error(`Failed to parse ${u.id}:`, e.message); continue;
            }
        } else if (code.includes('const unitData =')) {
            prefix = 'const unitData = ';
            try {
                const sandbox = { unitData: null };
                vm.createContext(sandbox);
                vm.runInContext(code + '; this.unitData = unitData;', sandbox);
                data = sandbox.unitData;
            } catch(e) {
                console.error(`Failed to parse ${u.id}:`, e.message); continue;
            }
        } else {
             console.error(`Unknown format for ${u.id}`);
             continue;
        }

        let injectedCount = 0;

        if (data && data.lessons) {
            processLessons(data.lessons);
        }
        if (data && data.workbooks) {
            data.workbooks.forEach(w => {
                if (w.lessons) processLessons(w.lessons);
            });
        }

        function processLessons(lessonsArr) {
            lessonsArr.forEach(l => {
                if (!l.narrative_blocks || l.narrative_blocks.length === 0) return;
                if (l.narrative_blocks.length === 1 && l.narrative_blocks[0].text && l.narrative_blocks[0].text.includes("Placeholder")) return;

                let hasTPS = false;
                l.narrative_blocks.forEach(b => {
                    if (b.tasks) {
                        b.tasks.forEach(t => {
                            if (t.type === 'think_pair_share') hasTPS = true;
                        });
                    }
                });

                if (!hasTPS) {
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
            let output = `const unitData = ${JSON.stringify(data, null, 2)};\n`;
            output += `if (typeof module !== 'undefined') {\n  module.exports = { unitData };\n}\n`;
            if (code.includes('export const unitData')) {
                output = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
            }
            fs.writeFileSync(file, output);
            console.log(`✅ Injected ${injectedCount} TPS tasks into ${u.id}.`);
        } else {
            console.log(`No injection needed for ${u.id}.`);
        }
    }
}

run().catch(console.error);
