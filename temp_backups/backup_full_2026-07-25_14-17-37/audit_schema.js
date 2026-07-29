const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'public', 'units');
const units = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

let report = [];

units.forEach(unit => {
    const dataPath = path.join(unitsDir, unit, 'data.js');
    if (!fs.existsSync(dataPath)) {
        report.push(`[${unit}] WARNING: No data.js found.`);
        return;
    }

    let content = fs.readFileSync(dataPath, 'utf8');
    let jsonStr = content.replace(/^export const unitData = /m, '').replace(/;\s*$/, '');
    let data;
    try {
        data = JSON.parse(jsonStr);
    } catch (e) {
        report.push(`[${unit}] ERROR: Could not parse data.js as JSON.`);
        return;
    }

    if (!data.lessons) {
        report.push(`[${unit}] WARNING: No lessons found in data.`);
        return;
    }

    data.lessons.forEach((lesson, index) => {
        const prefix = `[${unit} -> Lesson ${index + 1}: ${lesson.title}]`;

        // Check historians_corner
        if (lesson.historians_corner) {
            const hc = lesson.historians_corner;
            if (!hc.title) report.push(`${prefix} Historian's Corner missing 'title'`);
            if (!hc.text && !(hc.author_context && hc.extract)) report.push(`${prefix} Historian's Corner missing 'text' (or 'author_context' + 'extract')`);
            // Check for old schema
            if (hc.quote) report.push(`${prefix} Historian's Corner is using old schema ('quote' instead of 'text')`);
            if (hc.topic) report.push(`${prefix} Historian's Corner is using old schema ('topic')`);
        }

        // Check pair_share
        if (lesson.pair_share) {
            const ps = lesson.pair_share;
            if (!ps.prompt) report.push(`${prefix} Think, Pair, Share missing 'prompt'`);
            if (!ps.think) report.push(`${prefix} Think, Pair, Share missing 'think'`);
            if (!ps.pair) report.push(`${prefix} Think, Pair, Share missing 'pair'`);
            if (!ps.share) report.push(`${prefix} Think, Pair, Share missing 'share'`);
            // Check for old schema
            if (ps.topic) report.push(`${prefix} Think, Pair, Share is using old schema ('topic' instead of 'prompt')`);
            if (ps.instructions) report.push(`${prefix} Think, Pair, Share is using old schema ('instructions' instead of 'pair')`);
        }

        // Check extended
        if (lesson.extended) {
            if (!lesson.extended.question) report.push(`${prefix} Extended Scholarship missing 'question'`);
        }

        // Check debate_prep
        if (lesson.debate_prep) {
            if (!lesson.debate_prep.question) report.push(`${prefix} Debate Prep missing 'question'`);
            if (!lesson.debate_prep.arguments_for) report.push(`${prefix} Debate Prep missing 'arguments_for'`);
            if (!lesson.debate_prep.arguments_against) report.push(`${prefix} Debate Prep missing 'arguments_against'`);
        }
    });
});

fs.writeFileSync('audit_report.txt', report.length > 0 ? report.join('\n') : 'All units are clean and have no schema gaps!');
console.log('Audit complete.');
