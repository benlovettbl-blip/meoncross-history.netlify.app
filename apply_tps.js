const fs = require('fs');

const path = 'public/units/edexcel_medicine/data.js';
let content = fs.readFileSync(path, 'utf8');

// Using a simple regex to find lessons and their titles
let unitData;
try {
    const dataContent = content.replace('export const unitData = ', 'module.exports = ');
    fs.writeFileSync('temp_data_write.js', dataContent);
    unitData = require('./temp_data_write.js');
} catch (e) {
    console.error(e);
}

const replacementMap = {
    'lesson_1_1': "Think-Pair-Share: Which explanation for illness would a medieval peasant find most convincing—God's punishment or the Four Humours? Discuss your reasoning.",
    'lesson_1_2': "Think-Pair-Share: If you were sick in 1300, would you rather be treated by a Barber Surgeon or an Apothecary? Justify your choice.",
    'lesson_1_3': "Think-Pair-Share: Why did the Church's response to the Black Death fail to stop the spread of the plague? Discuss what this reveals about medieval understanding of disease.",
    'lesson_2_1': "Think-Pair-Share: Why did doctors continue to use the Four Humours even after Vesalius proved Galen's anatomy was wrong?",
    'lesson_2_2': "Think-Pair-Share: Based on what we have studied, did the medical Renaissance actually benefit the average sick person? Discuss with your partner.",
    'lesson_2_3': "Think-Pair-Share: Compare the government response to the Great Plague of 1665 with the Black Death of 1348. What was the most significant difference?",
    'lesson_3_1': "Think-Pair-Share: Which was more important for accepting Germ Theory: Pasteur's scientific experiments, or Koch's ability to identify specific microbes?",
    'lesson_3_2': "Think-Pair-Share: Why did the government finally abandon 'laissez-faire' and pass the 1875 Public Health Act? Discuss the main driving factor.",
    'lesson_3_3': "Think-Pair-Share: Who faced more opposition to their ideas—Edward Jenner (vaccination) or John Snow (cholera)? Why?",
    'lesson_4_1': "Think-Pair-Share: How did the discovery of DNA finally solve the mysteries of disease that the Four Humours and Germ Theory could not?",
    'lesson_4_2': "Think-Pair-Share: What is the most significant challenge facing the NHS today compared to when it was founded in 1948?",
    'lesson_4_3': "Think-Pair-Share: Would Penicillin have been mass-produced without the outbreak of the Second World War? Discuss the role of war in medical progress.",
    'lesson_4_4': "Think-Pair-Share: Why was the government so slow to act on the link between smoking and lung cancer in the 1950s?",
    'lesson_5_1': "Think-Pair-Share: How did the terrain and structure of the trench system make medical treatment more difficult than in previous wars?",
    'lesson_5_2': "Think-Pair-Share: Which was the deadlier threat in the trenches: enemy artillery or the environment (e.g. trench foot, mud)? Justify your answer.",
    'lesson_5_3': "Think-Pair-Share: Why were gas attacks so psychologically terrifying for soldiers, even if artillery caused more physical casualties?",
    'lesson_5_4': "Think-Pair-Share: What was the most critical stage in the Chain of Evacuation for ensuring a soldier's survival? Discuss your reasoning.",
    'lesson_5_5': "Think-Pair-Share: Which Western Front innovation had the greatest impact on medicine after the war—blood transfusions, plastic surgery, or mobile X-rays?"
};

const genericText = "Think-Pair-Share: Based on the events we have studied in this lesson, what do you think was the most significant turning point or consequence? Discuss your reasoning with your partner.";

if (unitData && unitData.lessons) {
    unitData.lessons.forEach(lesson => {
        if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(block => {
                if (block.tasks) {
                    block.tasks.forEach(task => {
                        if (task.question === genericText && replacementMap[lesson.id]) {
                            task.question = replacementMap[lesson.id];
                        }
                    });
                }
            });
        }
    });
    
    const newContent = "export const unitData = " + JSON.stringify(unitData, null, 2) + ";";
    fs.writeFileSync(path, newContent);
    console.log("Successfully updated data.js");
} else {
    console.log("Failed to parse unitData");
}
