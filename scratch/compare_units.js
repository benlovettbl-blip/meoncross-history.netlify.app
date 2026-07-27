const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/Projects/meoncross-history.netlify.app/public/database.json', 'utf8'));

const med = data.edexcel_medicine || {};
const cme = data.cme_new || {};

console.log("=== TOP LEVEL KEYS ===");
console.log("Medicine keys: ", Object.keys(med).join(', '));
console.log("Middle East keys: ", Object.keys(cme).join(', '));

function analyzeLessons(unitName, unitObj) {
    if (!unitObj.data) {
        console.log(`\n${unitName} has no .data!`);
        return;
    }
    const lessons = Object.values(unitObj.data);
    console.log(`\n=== ${unitName} LESSONS (${lessons.length}) ===`);
    const allKeys = new Set();
    let hasTeacherNotes = 0;
    let hasDoNow = 0;
    let hasObjectives = 0;
    let hasActivities = 0;
    let hasSections = 0;
    let hasModelAnswer = 0;
    let hasGamification = 0;
    let hasFlashcards = 0;
    let hasKeyIndividuals = 0;
    let hasVideos = 0;
    let hasImages = 0;
    
    lessons.forEach(l => {
        Object.keys(l).forEach(k => allKeys.add(k));
        if (l.teacher_notes) hasTeacherNotes++;
        if (l.do_now) hasDoNow++;
        if (l.objectives) hasObjectives++;
        if (l.activities) hasActivities++;
        if (l.sections) hasSections++;
        if (l.model_answer || l.model) hasModelAnswer++;
        if (l.xp || l.badges || l.gamification) hasGamification++;
        if (l.flashcards || l.quiz) hasFlashcards++;
        if (l.key_individuals) hasKeyIndividuals++;
        if (l.video || l.video_url || (l.media && l.media.video)) hasVideos++;
        if (l.image || l.image_url || l.cover_image) hasImages++;
    });
    
    console.log("Keys found across lessons: ", Array.from(allKeys).join(', '));
    console.log(`teacher_notes: ${hasTeacherNotes}/${lessons.length}`);
    console.log(`do_now: ${hasDoNow}/${lessons.length}`);
    console.log(`objectives: ${hasObjectives}/${lessons.length}`);
    console.log(`activities: ${hasActivities}/${lessons.length}`);
    console.log(`sections: ${hasSections}/${lessons.length}`);
    console.log(`model answers: ${hasModelAnswer}/${lessons.length}`);
    console.log(`gamification: ${hasGamification}/${lessons.length}`);
    console.log(`quizzes/flashcards: ${hasFlashcards}/${lessons.length}`);
    console.log(`key_individuals: ${hasKeyIndividuals}/${lessons.length}`);
    console.log(`videos: ${hasVideos}/${lessons.length}`);
    console.log(`images: ${hasImages}/${lessons.length}`);
    
    // Check what is inside sections
    if (hasSections > 0) {
        let sectionKeys = new Set();
        lessons.forEach(l => {
            if (l.sections) {
                l.sections.forEach(s => {
                    Object.keys(s).forEach(k => sectionKeys.add(k));
                });
            }
        });
        console.log("Section keys: ", Array.from(sectionKeys).join(', '));
    }
}

analyzeLessons("Medicine", med);
analyzeLessons("Middle East", cme);

console.log("\n=== COMPARING UNIT-LEVEL METADATA ===");
console.log("Medicine has biographies? ", !!med.biographies);
console.log("Middle East has biographies? ", !!cme.biographies);
console.log("Medicine has flashcards? ", !!med.flashcards);
console.log("Middle East has flashcards? ", !!cme.flashcards);
console.log("Medicine has timelines? ", !!med.timelines);
console.log("Middle East has timelines? ", !!cme.timelines);
console.log("Medicine has glossary? ", !!med.glossary);
console.log("Middle East has glossary? ", !!cme.glossary);

