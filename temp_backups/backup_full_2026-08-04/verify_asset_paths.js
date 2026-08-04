const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'public', 'database.json');
if (!fs.existsSync(dbPath)) {
    console.error('Database not found. Run build_database.cjs first.');
    process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
let errors = 0;

function checkPath(src, context) {
    if (!src || typeof src !== 'string') return;
    if (src.startsWith('http://') || src.startsWith('https://')) return;
    
    // Normalize path
    let cleanSrc = src;
    if (cleanSrc.startsWith('../')) {
        cleanSrc = cleanSrc.replace(/\.\.\//g, '');
    }
    if (cleanSrc.startsWith('/')) {
        cleanSrc = cleanSrc.substring(1);
    }

    const fullPath = path.join(__dirname, 'public', cleanSrc);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ CRITICAL ERROR: Broken image path found in ${context}. File not found: ${fullPath} (Raw src: ${src})`);
        errors++;
    }
}

console.log('🔍 Verifying all asset paths from database...');

for (const unitId of Object.keys(db)) {
    const unit = db[unitId];
    if (unit.homepage_background) checkPath(unit.homepage_background, `Unit ${unitId} homepage_background`);
    
    if (unit.key_individuals) {
        unit.key_individuals.forEach((ki, idx) => {
            if (ki.image) checkPath(ki.image, `Unit ${unitId} key_individuals[${idx}]`);
        });
    }

    if (unit.lessons) {
        unit.lessons.forEach((lesson, lIdx) => {
            const lContext = `Unit ${unitId} Lesson ${lIdx + 1} (${lesson.title})`;
            
            if (lesson.primary_source && lesson.primary_source.src) {
                checkPath(lesson.primary_source.src, `${lContext} primary_source`);
            }
            
            if (lesson.sources) {
                lesson.sources.forEach((s, sIdx) => {
                    if (s.src) checkPath(s.src, `${lContext} sources[${sIdx}]`);
                });
            }
            
            if (lesson.narrative_blocks) {
                lesson.narrative_blocks.forEach((nb, nbIdx) => {
                    if (nb.image) checkPath(nb.image, `${lContext} narrative_blocks[${nbIdx}]`);
                });
            }
            
            if (lesson.do_now && lesson.do_now.src) {
                checkPath(lesson.do_now.src, `${lContext} do_now.src`);
            }
        });
    }
}

if (errors > 0) {
    console.error(`\n🚨 Asset path verification failed! Found ${errors} broken path(s). Fix them before deploying.`);
    process.exit(1);
} else {
    console.log('✅ All asset paths verified successfully against public/ folder.');
}
