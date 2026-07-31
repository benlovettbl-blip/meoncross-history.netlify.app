const fs = require('fs');
const path = require('path');

console.log('\n🤖 Running AI Heading Healing scan...');

try {
    const dbPath = path.join(__dirname, '..', 'database.json');
    if (!fs.existsSync(dbPath)) {
        console.log('Database not found. Skipping AI healing.');
        process.exit(0);
    }
    
    const db = require(dbPath);
    let brokenCount = 0;

    Object.keys(db).forEach(unitKey => {
        const unit = db[unitKey].data;
        if (!unit || !unit.lessons) return;
        
        unit.lessons.forEach((lesson, lessonIndex) => {
            if (!lesson.narrative) return;
            lesson.narrative.forEach((block, blockIndex) => {
                if (block.heading) {
                    const h = block.heading.trim().toLowerCase();
                    if (h.endsWith(' and') || h.endsWith(' the') || h.endsWith(' of') || h.endsWith(' a')) {
                        brokenCount++;
                        console.log(`  [Warning] Potentially broken heading in ${unitKey} (Lesson ${lessonIndex + 1}): "${block.heading}"`);
                    }
                }
            });
        });
    });

    if (brokenCount === 0) {
        console.log('✅ AI Heading Healing: No broken headings found.');
    } else {
        console.log(`⚠️ Found ${brokenCount} broken headings. (AI API integration pending to auto-fix these).`);
    }
} catch (e) {
    console.error('Failed to run AI healing script:', e.message);
}
console.log('');
