const fs = require('fs');
const unitData = require('./edexcel_medicine/data.js');

let globalExamQNum = 1;
unitData.periods.forEach(period => {
    let periodLessons = period.lessons || [];
    periodLessons.forEach((l, i) => {
        let qs = [];
        function checkAndAdd(obj, textProp) {
            if (obj && obj[textProp] && /\(\d+\s*marks?\)/i.test(obj[textProp])) {
                qs.push(obj[textProp]);
            }
        }
        if (l.primary_source) checkAndAdd(l.primary_source, 'question');
        if (l.sources) l.sources.forEach(s => checkAndAdd(s, 'question'));
        if (l.tasks) l.tasks.forEach(t => checkAndAdd(t, 'question'));
        if (l.historians_corner) checkAndAdd(l.historians_corner, 'stretch_question');
        if (l.narrative_blocks) l.narrative_blocks.forEach(b => {
            if (b.tasks) b.tasks.forEach(t => checkAndAdd(t, 'question'));
            if (b.hinge_question) checkAndAdd(b.hinge_question, 'question');
            if (b.extended) checkAndAdd(b.extended, 'question');
        });
        if (l.extended) checkAndAdd(l.extended, 'question');
        if (l.gcse_task) checkAndAdd(l.gcse_task, 'topic');
        if (l.pair_share) checkAndAdd(l.pair_share, 'question');
        
        let epArray = l.exam_practice;
        if (l.exam_practice && !Array.isArray(l.exam_practice) && l.exam_practice.questions) {
            epArray = l.exam_practice.questions;
        }
        if (epArray && Array.isArray(epArray)) {
            epArray.forEach(ep => checkAndAdd(ep, 'question'));
        }
        console.log(`Lesson ${i+1}: ${l.title}`);
        qs.forEach((q, j) => console.log(`  - ${q}`));
    });
});
