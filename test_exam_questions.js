const fs = require('fs');

const unitData = require('./edexcel_medicine/data.js');
let globalExamQNum = 1;

unitData.periods.forEach(period => {
    let periodLessons = period.lessons || [];
    periodLessons.forEach((lesson, i) => {
        let examQs = [];
        function checkAndAdd(obj, textProp) {
            if (obj && obj[textProp] && /\(\d+\s*marks?\)/i.test(obj[textProp])) {
                obj.examQNum = globalExamQNum++;
                examQs.push(obj[textProp]);
            }
        }

        if (lesson.primary_source) checkAndAdd(lesson.primary_source, 'question');
        if (lesson.sources) lesson.sources.forEach(s => checkAndAdd(s, 'question'));
        if (lesson.tasks) lesson.tasks.forEach(t => checkAndAdd(t, 'question'));
        if (lesson.historians_corner) checkAndAdd(lesson.historians_corner, 'stretch_question');
        if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(b => {
            if (b.tasks) b.tasks.forEach(t => checkAndAdd(t, 'question'));
            if (b.hinge_question) checkAndAdd(b.hinge_question, 'question');
            if (b.extended) checkAndAdd(b.extended, 'question');
        });
        if (lesson.extended) checkAndAdd(lesson.extended, 'question');
        if (lesson.gcse_task) checkAndAdd(lesson.gcse_task, 'topic');
        if (lesson.pair_share) checkAndAdd(lesson.pair_share, 'question');
        
        let epArray = lesson.exam_practice;
        if (lesson.exam_practice && !Array.isArray(lesson.exam_practice) && lesson.exam_practice.questions) {
            epArray = lesson.exam_practice.questions;
        }
        if (epArray && Array.isArray(epArray)) {
            epArray.forEach(ep => checkAndAdd(ep, 'question'));
        }

        if (examQs.length > 0) {
            console.log(`Lesson ${i+1}:`);
            examQs.forEach(q => console.log(`  ${q}`));
        }
    });
});
