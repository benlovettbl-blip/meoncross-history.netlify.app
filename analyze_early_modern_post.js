const fs = require('fs');

const dataContent = fs.readFileSync('early_modern_world/data.js', 'utf8');
const match = dataContent.match(/export const unitData = ([\s\S]+);/);
const unitData = eval('(' + match[1] + ')');

let report = [];

unitData.lessons.forEach((lesson, index) => {
    let sourceLetters = new Set();
    
    // Find sources by looking for 'source_letter'
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach(b => {
            if (b.source_letter) sourceLetters.add(b.source_letter);
        });
    }
    // also check lesson top-level if any
    if (lesson.sources) {
        lesson.sources.forEach((s, idx) => sourceLetters.add(String.fromCharCode(65 + idx)));
    }

    // Get a flat list of all text in questions/tasks to see if sources are mentioned
    let allTasksText = "";
    if (lesson.tasks) {
        lesson.tasks.forEach(t => {
            allTasksText += (t.text || '') + " " + (t.question || '') + " ";
            if (t.questions) t.questions.forEach(q => allTasksText += q.q + " ");
            if (t.events) allTasksText += t.events.join(" ");
            if (t.pairs) t.pairs.forEach(p => allTasksText += p.left + p.right);
            if (t.cloze_text) allTasksText += t.cloze_text;
        });
    }
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach(b => {
            if (b.tasks) b.tasks.forEach(t => allTasksText += (t.text || '') + " " + (t.question || '') + " ");
            if (b.hinge_question) allTasksText += (b.hinge_question.text || '') + (b.hinge_question.question || '');
            if (b.extended) allTasksText += (b.extended.question || '');
        });
    }
    if (lesson.extended) allTasksText += (lesson.extended.question || '');
    if (lesson.gcse_task) {
        if (lesson.gcse_task.tasks) lesson.gcse_task.tasks.forEach(t => allTasksText += t.text);
    }
    if (lesson.pair_share) allTasksText += (lesson.pair_share.prompt || '') + (lesson.pair_share.think || '');

    let unusedSources = [];
    sourceLetters.forEach(letter => {
        let regex = new RegExp(`Source[s]?\\s+[A-Z\\s]*${letter}`, 'i');
        if (!regex.test(allTasksText)) {
            unusedSources.push(letter);
        }
    });
    
    let hasTPS = allTasksText.includes("Think-Pair-Share") || (lesson.pair_share ? true : false);
    let taskTypes = new Set();
    if (lesson.tasks) lesson.tasks.forEach(t => taskTypes.add(t.type || 'text'));
    if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(b => {
        if (b.tasks) b.tasks.forEach(t => taskTypes.add(t.type || 'text'));
    });

    report.push({
        lessonNum: index + 1,
        title: lesson.title,
        sourceCount: sourceLetters.size,
        sources: Array.from(sourceLetters).join(", "),
        unusedSources: unusedSources.join(", "),
        hasTPS: taskTypes.has('think_pair_share') || hasTPS,
        taskTypes: Array.from(taskTypes).join(", ")
    });
});

console.log(JSON.stringify(report, null, 2));
