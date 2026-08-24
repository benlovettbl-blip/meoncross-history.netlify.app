import fs from 'fs';

let content = fs.readFileSync('scripts/audit_curriculum_data.mjs', 'utf8');

const emptyTagLogic = `
            // 6. Check for empty HTML tags (missing names or missing details)
            const textFields = [block.title, block.text, block.image_caption];
            textFields.forEach(field => {
                if (field && (field.includes('<strong></strong>') || field.includes('<em></em>') || field.includes('<b></b>'))) {
                    warnings.push(\`[EMPTY TAG] \${loc}: Contains an empty HTML tag (e.g. <strong></strong>), indicating missing data.\`);
                }
            });
`;

content = content.replace('            // 5. Check for source mismatches', emptyTagLogic + '\n            // 5. Check for source mismatches');

const orphanSourceLogic = `
        // 7. Check for Orphaned Sources in the entire lesson
        let definedSources = [];
        let allQuestionsText = '';
        
        lesson.narrative_blocks.forEach((b, bIdx) => {
            const hasOwnTasks = !!(b.tasks && b.tasks.length > 0);
            
            if (b.source_letter) {
                definedSources.push({ letter: b.source_letter, blockIdx: bIdx, hasOwnTasks, isImagesArray: false });
            }
            if (b.images && Array.isArray(b.images)) {
                b.images.forEach(img => {
                    if (img.source_letter) {
                        definedSources.push({ letter: img.source_letter, blockIdx: bIdx, hasOwnTasks, isImagesArray: true, arrayLength: b.images.length });
                    }
                });
            }
            if (b.text) {
                let match = b.text.match(/Source ([A-Z])/g);
                if (match) {
                    match.forEach(m => {
                        let letter = m.replace('Source ', '');
                        definedSources.push({ letter, blockIdx: bIdx, hasOwnTasks, isInline: true });
                    });
                }
            }
            
            if (b.tasks) {
                b.tasks.forEach(t => {
                    allQuestionsText += (t.q || t.question || t.text || '') + ' ';
                });
            }
        });

        definedSources.forEach(src => {
            let regex1 = new RegExp(\`Source \${src.letter}\\\\b\`, 'i');
            let regex2 = new RegExp(\`Sources? (?:and |,|\\\\s)*[A-Z]*(?: and |, )*\${src.letter}\\\\b\`, 'i');
            let isExplicitlyMentioned = regex1.test(allQuestionsText) || regex2.test(allQuestionsText);

            if (!isExplicitlyMentioned) {
                if (src.isImagesArray && src.arrayLength > 1) {
                    warnings.push(\`[ORPHANED SOURCE] Lesson \${lIdx + 1} -> Block \${src.blockIdx}: Source \${src.letter} is in an image array but never explicitly asked about in any task.\`);
                } else if (!src.hasOwnTasks) {
                    warnings.push(\`[ORPHANED SOURCE] Lesson \${lIdx + 1} -> Block \${src.blockIdx}: Source \${src.letter} is defined, but has no tasks attached to it and is never explicitly asked about.\`);
                }
            }
        });
`;

content = content.replace('    });\n\n    console.log', orphanSourceLogic + '    });\n\n    console.log');

fs.writeFileSync('scripts/audit_curriculum_data.mjs', content);
console.log('Successfully updated audit script!');
