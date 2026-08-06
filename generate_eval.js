const fs = require('fs');
const data = require('./early_modern_world/data.js').unitData;

let md = `# Early Modern World: Unit Evaluation\n\n`;

md += `## General Unit Aspects\n`;
md += `- **Front Cover / Tracker:** Cover image is '${data.cover_image}'. Cover sources: ${data.cover_sources ? data.cover_sources.length : 0}.\n`;
md += `- **Timeline:** ${data.timeline ? data.timeline.length : 0} events.\n\n`;

md += `## Lesson Breakdown\n\n`;

data.lessons.forEach((l, i) => {
    md += `### Lesson ${i+1}: ${l.title}\n`;
    
    let strengths = [];
    let weaknesses = [];
    let recs = [];
    
    if (l.teacher_notes) {
        strengths.push("Comprehensive Teacher Notes and objectives are present.");
    } else {
        weaknesses.push("Missing Teacher Notes (violates pedagogical rule).");
        recs.push("Automatically generate Teacher Notes with Hinge Questions.");
    }
    
    if (l.do_now) {
        strengths.push("Do Now task is present.");
    } else {
        weaknesses.push("Missing Do Now task.");
        recs.push("Add a recall-based Do Now task.");
    }
    
    let hasPlaceholder = false;
    let narrativeCount = l.narrative_blocks ? l.narrative_blocks.length : 0;
    
    if (l.narrative_blocks) {
        l.narrative_blocks.forEach(b => {
            if (b.text && (b.text.includes('placeholder') || b.text.includes('Lorem ipsum'))) hasPlaceholder = true;
            if (b.tasks) {
                b.tasks.forEach(t => {
                   if (t.model && (t.model.includes('placeholder') || t.model === '')) hasPlaceholder = true; 
                });
            }
        });
    }
    
    if (hasPlaceholder) {
        weaknesses.push("Contains empty placeholders in tasks/model answers or narrative text.");
        recs.push("Replace all placeholders with historically rigorous model answers and text.");
    } else {
        strengths.push(`Rich narrative content (${narrativeCount} blocks) with no placeholders detected.`);
    }

    if (l.assessment && l.assessment.question) {
        strengths.push(`Assessment question present: "${l.assessment.question.substring(0,50)}..."`);
    } else if (i === data.lessons.length - 1) {
        weaknesses.push("The final lesson (assessment lesson) lacks a dedicated assessment block/rubric.");
        recs.push("Build out a full formal assessment block (e.g. 16-mark essay with sentence starters) for this final lesson.");
    } else {
        recs.push("Consider adding a short plenary 'Hinge Question' assessment.");
    }

    md += `**Strengths:**\n`;
    strengths.forEach(s => md += `- ${s}\n`);
    md += `**Weaknesses:**\n`;
    weaknesses.forEach(w => md += `- ${w}\n`);
    md += `**Recommendations:**\n`;
    recs.forEach(r => md += `- ${r}\n`);
    md += `\n`;
});

fs.writeFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/e9cd051d-fec1-4d1c-a620-280dc27bce7d/evaluation_report.md', md);
console.log('Report generated at evaluation_report.md');
