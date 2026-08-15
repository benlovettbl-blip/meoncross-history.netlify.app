import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Curriculum Data Auditor
 * Scans a unit's data.js file for structural glitches, orphaned blocks, and missing properties
 * to prevent empty boxes and broken layouts in the PDF generation pipeline.
 */

export async function auditUnit(unitId) {
    const unitPath = path.join(process.cwd(), unitId, 'data.js');
    if (!fs.existsSync(unitPath)) {
        console.error(`❌ Unit data not found at ${unitPath}`);
        return false;
    }

    let unitData;
    try {
        const module = await import(`file:///${unitPath.replace(/\\/g, '/')}`);
        unitData = module.unitData;
    } catch (e) {
        console.error(`❌ Failed to parse data.js for ${unitId}:`, e.message);
        return false;
    }

    let warnings = [];

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
            const hasMedia = block.image_url || block.image || block.video_id || block.youtube_url;
            const hasTasks = block.tasks && block.tasks.length > 0;
            const textContent = block.text || '';
            
            if (!block.title && !hasMedia && !hasTasks && textContent.length > 0 && textContent.length < 100) {
                 // Check if it's not just a standard subheading
                 if (!textContent.includes('<h') && !textContent.includes('<strong>')) {
                     warnings.push(`[SUSPICIOUS FRAGMENT] ${loc}: Very short text block with no media or tasks. Is this an orphaned fragment? Text: "${textContent.substring(0, 30)}..."`);
                 }
            }

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
                                if (bText.includes(src) || bAlt.includes(src) || bTitle.includes(src)) {
                                    sourceFoundInLesson = true;
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
