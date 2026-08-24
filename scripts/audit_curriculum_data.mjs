import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Curriculum Data Auditor
 * Scans a unit's data.js file for structural glitches, orphaned blocks, and missing properties
 * to prevent empty boxes and broken layouts in the PDF generation pipeline.
 */

export async function auditUnit(unitId) {
    let warnings = [];
    
    // Check if this is a KS4 GCSE unit
    const isKS4 = ['edexcel_medicine', 'eee', 'weimar_nazi_germany'].includes(unitId);

    const unitPath = path.join(process.cwd(), 'public', 'units', unitId, 'data.js');
    if (!fs.existsSync(unitPath)) {
        console.error(`❌ Unit data not found at ${unitPath}`);
        return false;
    }

    let unitData;
    try {
        const module = await import(`file:///${unitPath.replace(/\\/g, '/')}`);
        unitData = module.unitData || module.default;
    } catch (e) {
        console.error(`❌ Failed to parse data.js for ${unitId}:`, e.message);
        return false;
    }


    console.log(`Auditing unit: ${unitId}`);

    unitData.lessons.forEach((lesson, lIdx) => {
        if (!lesson.narrative_blocks) return;

        lesson.narrative_blocks.forEach((block, bIdx) => {
            const loc = `Lesson ${lIdx + 1} ('${lesson.title || 'Untitled'}') -> Block ${bIdx}`;

            // 1. Check for empty tasks arrays (causes empty green boxes)
            if (block.tasks && Array.isArray(block.tasks) && block.tasks.length === 0) {
                warnings.push(`[EMPTY TASKS] ${loc}: Contains an empty 'tasks: []' array. This will render as an empty task box.`);
            }

            // 2. Check for missing task text
            if (block.tasks && Array.isArray(block.tasks)) {
                block.tasks.forEach((t, tIdx) => {
                    const text = t.q || t.question || t.text;
                    if (!text || text.trim() === '') {
                        warnings.push(`[MISSING TASK TEXT] ${loc} -> Task ${tIdx}: Task is missing 'question', 'q', or 'text' property.`);
                    }
                });
            }

            // 3. Check for orphaned / suspicious blocks
            // A block is suspicious if it has a title implying a task, but no tasks.
            if (block.title) {
                const titleLower = block.title.toLowerCase();
                if ((titleLower.includes('vocabulary') || titleLower.includes('do now') || titleLower.includes('task')) && 
                    (!block.tasks || block.tasks.length === 0)) {
                    warnings.push(`[ORPHANED TITLE] ${loc}: Title '${block.title}' suggests a task/activity, but no tasks are attached.`);
                }
            }

            // 4. Check for orphaned tiny text blocks
            // If a block has no title, no tasks, no image, no video, no HTML formatting, and very short text, it might be an orphaned fragment.
            // (We skip this check for KS4 units because they use tiny blocks for flashcards/glossary terms)
            const hasMedia = block.image_url || block.image || block.video_id || block.youtube_url;
            const hasTasks = block.tasks && block.tasks.length > 0;
            const textContent = block.text || '';
            
            if (!isKS4 && !block.title && !hasMedia && !hasTasks && textContent.length > 0 && textContent.length < 100) {
                 // Check if it's not just a standard subheading
                 if (!textContent.includes('<h') && !textContent.includes('<strong>')) {
                     warnings.push(`[SUSPICIOUS FRAGMENT] ${loc}: Very short text block with no media or tasks. Is this an orphaned fragment? Text: "${textContent.substring(0, 30)}..."`);
                 }
            }


            // 6. Check for empty HTML tags (missing names or missing details)
            const textFields = [block.title, block.text, block.image_caption];
            textFields.forEach(field => {
                if (field && (field.includes('<strong></strong>') || field.includes('<em></em>') || field.includes('<b></b>'))) {
                    warnings.push(`[EMPTY TAG] ${loc}: Contains an empty HTML tag (e.g. <strong></strong>), indicating missing data.`);
                }
            });

            // 5. Check for source mismatches (tasks asking about a 'Source X' that isn't labelled)
            if (hasTasks) {
                block.tasks.forEach((t, tIdx) => {
                    const taskText = t.q || t.question || t.text || '';
                    const sourceMatch = taskText.match(/Source [A-Z]/g);
                    if (sourceMatch) {
                        sourceMatch.forEach(src => {
                            // Verify this exact source exists SOMEWHERE in the current lesson
                            let sourceFoundInLesson = false;
                              lesson.narrative_blocks.forEach(b => {
                                  const bAlt = b.image_alt || '';
                                  const bTitle = b.title || '';
                                  const bText = b.text || '';
                                  const bSourceLetter = b.source_letter ? `Source ${b.source_letter}` : '';
                                  if (bText.includes(src) || bAlt.includes(src) || bTitle.includes(src) || bSourceLetter === src) {
                                      sourceFoundInLesson = true;
                                  }
                                  if (b.images && Array.isArray(b.images)) {
                                      b.images.forEach(img => {
                                          const imgAlt = img.alt || img.image_alt || '';
                                          const imgCaption = img.caption || img.image_caption || '';
                                          const imgLetter = img.source_letter ? `Source ${img.source_letter}` : '';
                                          if (imgAlt.includes(src) || imgCaption.includes(src) || imgLetter === src) {
                                              sourceFoundInLesson = true;
                                          }
                                      });
                                  }
                              });
                            
                            if (!sourceFoundInLesson) {
                                warnings.push(`[SOURCE MISMATCH] ${loc} -> Task ${tIdx}: Task references '${src}', but this source label is missing from the entire lesson.`);
                            }
                        });
                    }
                });
            }
        });

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
            let regex1 = new RegExp(`Source ${src.letter}\\b`, 'i');
            let regex2 = new RegExp(`Sources? (?:and |,|\\s)*[A-Z]*(?: and |, )*${src.letter}\\b`, 'i');
            let isExplicitlyMentioned = regex1.test(allQuestionsText) || regex2.test(allQuestionsText);

            if (!isExplicitlyMentioned) {
                if (src.isImagesArray && src.arrayLength > 1) {
                    warnings.push(`[ORPHANED SOURCE] Lesson ${lIdx + 1} -> Block ${src.blockIdx}: Source ${src.letter} is in an image array but never explicitly asked about in any task.`);
                } else if (!src.hasOwnTasks) {
                    warnings.push(`[ORPHANED SOURCE] Lesson ${lIdx + 1} -> Block ${src.blockIdx}: Source ${src.letter} is defined, but has no tasks attached to it and is never explicitly asked about.`);
                }
            }
        });
    });

    console.log(`\n🔍 --- Curriculum Audit Report: ${unitId} ---`);
    if (warnings.length === 0) {
        console.log(`✅ Passed! No structural glitches detected in ${unitId}.`);
        return true;
    } else {
        console.log(`⚠️  Found ${warnings.length} potential glitches:\n`);
        warnings.forEach(w => console.log(`  - ${w}`));
        console.log(`\n--------------------------------------------`);
        return false;
    }
}

// Allow running standalone from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const targetUnit = process.argv[2];
    if (targetUnit) {
        auditUnit(targetUnit);
    } else {
        console.log('Usage: node scripts/audit_curriculum_data.mjs <unit_id>');
    }
}
