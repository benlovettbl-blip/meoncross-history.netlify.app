const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');

const DB_PATH = path.join(__dirname, '..', 'public', 'database.json');
const UNITS_DIR = path.join(__dirname, '..', 'public', 'units');

if (!fs.existsSync(DB_PATH)) {
    console.error("database.json not found!");
    process.exit(1);
}

const db = require(DB_PATH);

function generateDrawingTask(lesson, isKS4) {
    const narrativeText = (lesson.narrative || []).map(n => typeof n === 'string' ? n : (n.text || '')).join(' ').toLowerCase();
    
    if (isKS4) {
        if (narrativeText.includes('medicine') || narrativeText.includes('treatment') || narrativeText.includes('disease') || narrativeText.includes('surgery')) {
            return "Drawing Task: Draw a labeled schematic diagram illustrating the medical procedures, treatments, or chain of evacuation described.";
        }
        if (narrativeText.includes('government') || narrativeText.includes('constitution') || narrativeText.includes('election') || narrativeText.includes('parliament')) {
            return "Drawing Task: Create a flowchart showing the structure of the political system, constitution, or government discussed in this lesson.";
        }
        if (narrativeText.includes('tension') || narrativeText.includes('crisis') || narrativeText.includes('war') || narrativeText.includes('rebellion')) {
            return "Drawing Task: Create a visual metaphor or complex diagram representing the escalating political tensions and their consequences.";
        }
        return "Drawing Task: Draw an analytical diagram or flowchart summarizing the complex historical systems, policies, and events from this lesson.";
    } else {
        if (narrativeText.includes('battle') || narrativeText.includes('tactics') || narrativeText.includes('army') || narrativeText.includes('war')) {
            return "Drawing Task: Sketch a tactical map or diagram showing the battlefield maneuvers, troop movements, and strategies described.";
        }
        if (narrativeText.includes('castle') || narrativeText.includes('building') || narrativeText.includes('church') || narrativeText.includes('architecture')) {
            return "Drawing Task: Draw a detailed, labeled sketch of the physical structures and architecture mentioned in the narrative.";
        }
        if (narrativeText.includes('voyage') || narrativeText.includes('trade') || narrativeText.includes('empire') || narrativeText.includes('route')) {
            return "Drawing Task: Draw a spatial map illustrating the geographical routes, trade networks, or spatial geography covered in this lesson.";
        }
        if (narrativeText.includes('society') || narrativeText.includes('peasant') || narrativeText.includes('king') || narrativeText.includes('feudal')) {
            return "Drawing Task: Create a hierarchical diagram showing the social structure and relationships between different groups of people.";
        }
        return "Drawing Task: Create a diagram or map focusing on the spatial geography, physical structures, or key events relevant to this topic.";
    }
}

async function processCurriculum() {
    console.log("Starting Dual-Coding (Drawing Tasks) Injection...");
    let totalInjected = 0;

    for (const [unitId, unitPayload] of Object.entries(db)) {
        const unitData = unitPayload.data;
        if (!unitData || !unitData.lessons || unitData.lessons.length === 0) continue;

        const isKS4 = (unitData.title || '').toLowerCase().includes('gcse') || 
                      unitId === 'weimar_nazi_germany' || 
                      unitId === 'eee' || 
                      unitId === 'edexcel_medicine' ||
                      unitId === 'cold_war';
        
        const dataJsPath = path.join(UNITS_DIR, unitId, 'data.js');
        if (!fs.existsSync(dataJsPath)) {
            console.log(`[WARNING] Source data.js not found for ${unitId}`);
            continue;
        }

        let sourceCode = fs.readFileSync(dataJsPath, 'utf8');
        let ast;
        try {
            ast = acorn.parse(sourceCode, { ecmaVersion: 'latest', sourceType: 'module', ranges: true });
        } catch (e) {
            console.error(`[ERROR] Failed to parse AST for ${unitId}: ${e.message}`);
            continue;
        }

        // Find the 'lessons' array in AST
        let lessonsArrayNode = null;
        
        walk.simple(ast, {
            Property(node) {
                if (node.key && (node.key.name === 'lessons' || node.key.value === 'lessons') && node.value && node.value.type === 'ArrayExpression') {
                    lessonsArrayNode = node.value;
                }
            }
        });

        if (!lessonsArrayNode) {
            console.log(`[WARNING] Could not find 'lessons' array in AST for ${unitId}`);
            continue;
        }

        const modifications = [];

        unitData.lessons.forEach((lesson, lessonIdx) => {
            if (lesson.tasks && lesson.tasks.some(t => {
                const str = typeof t === 'string' ? t : (t.question || '');
                return str.startsWith('Drawing Task:');
            })) {
                return; // Already has a drawing task
            }

            const newTaskStr = generateDrawingTask(lesson, isKS4);
            
            // Find AST node for this lesson
            if (lessonIdx >= lessonsArrayNode.elements.length) return;
            const lessonNode = lessonsArrayNode.elements[lessonIdx];
            
            // Find 'tasks' property in lessonNode
            let tasksArrayNode = null;
            if (lessonNode.type === 'ObjectExpression') {
                for (const prop of lessonNode.properties) {
                    if (prop.key && prop.key.name === 'tasks' && prop.value && prop.value.type === 'ArrayExpression') {
                        tasksArrayNode = prop.value;
                        break;
                    }
                }
            }

            if (tasksArrayNode) {
                // Determine insertion point (just before the closing bracket of the tasks array)
                const elements = tasksArrayNode.elements;
                if (elements.length > 0) {
                    const lastElement = elements[elements.length - 1];
                    modifications.push({
                        pos: lastElement.end,
                        text: `,\n      "${newTaskStr}"`
                    });
                } else {
                    // Empty array
                    modifications.push({
                        pos: tasksArrayNode.start + 1,
                        text: `\n      "${newTaskStr}"\n    `
                    });
                }
            } else {
                // If tasks array doesn't exist, we must add it to the lesson object
                const props = lessonNode.properties;
                if (props.length > 0) {
                    const lastProp = props[props.length - 1];
                    modifications.push({
                        pos: lastProp.end,
                        text: `,\n      "tasks": [\n        "${newTaskStr}"\n      ]`
                    });
                }
            }
            totalInjected++;
        });

        if (modifications.length > 0) {
            // Apply modifications in reverse order so character indices don't shift
            modifications.sort((a, b) => b.pos - a.pos);
            for (const mod of modifications) {
                sourceCode = sourceCode.slice(0, mod.pos) + mod.text + sourceCode.slice(mod.pos);
            }
            fs.writeFileSync(dataJsPath, sourceCode, 'utf8');
            console.log(`[SUCCESS] Injected ${modifications.length} drawing tasks into ${unitId}/data.js`);
        } else {
            console.log(`[SKIP] No drawing tasks needed for ${unitId}`);
        }
    }

    console.log(`\n🎉 Process Complete! Total Drawing Tasks Injected: ${totalInjected}`);
    console.log(`Please run 'node build_database.cjs' to sync these changes to the master JSON.`);
}

processCurriculum();
