const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'early_modern_world', 'data.js');
let content = fs.readFileSync(targetFile, 'utf8');

// Extract JSON
let jsonStr = content.substring(content.indexOf('{'));
jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf('}') + 1);
let data = JSON.parse(jsonStr);

// Define specific reflection questions
const specificQuestions = {
    "lesson_1": {
        text: "Lesson Reflection: Looking at the state of the world in 1450, why might a historian argue that Europe was actually on the periphery of global power rather than at its center?",
        model: "A strong answer should reference the immense wealth of the Ming Dynasty in China, the military dominance of the Ottoman Empire, or the vast riches of African kingdoms like Mali or Benin, contrasting these with the relative poverty, isolation, and basic agricultural lifestyle of European peasants."
    },
    "lesson_2": {
        text: "Lesson Reflection: To what extent did the Protestant Reformation act as the primary catalyst for European expansion and global exploration during the 16th century?",
        model: "A strong answer should explain how the religious schism created fierce competition between Catholic nations (like Spain/Portugal) and Protestant nations (like England/Netherlands), driving them to seek new wealth, resources, and converts globally to fund their religious wars in Europe."
    },
    "lesson_3": {
        text: "Lesson Reflection: Based on the early encounters between Europeans and indigenous populations, how did initial trade relationships gradually transform into systems of imperial control and exploitation?",
        model: "A strong answer should trace the shift from initial mutually beneficial trading (e.g., European merchants relying on local rulers) to violent conquest, establishing fortified trading posts, exploiting local rivalries, and eventually imposing direct colonial administration as European technological and military power grew."
    },
    "lesson_4": {
        text: "Lesson Reflection: Considering the English Civil War and the rise of transatlantic trade, did political ideology or economic ambition play a greater role in shifting the balance of power in Britain?",
        model: "A strong answer could argue either way, provided it references the ideological battle between the Divine Right of Kings and Parliament's demand for liberties, while also acknowledging how the massive influx of wealth from the Atlantic trade empowered a new merchant class who demanded a greater say in government."
    },
    "lesson_5": {
        text: "Lesson Reflection: In what ways did enslaved Africans maintain their agency and resist the brutal dehumanization of the Transatlantic Slave Trade, both physically and culturally?",
        model: "A strong answer should provide specific examples of physical resistance (such as shipboard mutinies or escaping to form Maroon communities) alongside cultural resistance (such as preserving African religious practices, music, language, and forging new community bonds despite being stripped of their identities)."
    },
    "lesson_6": {
        text: "Lesson Reflection: Synthesizing everything you have learned in this unit, which development between 1450 and 1750 had the most profound impact on shaping the 'modern' world we live in today?",
        model: "A strong answer should select one major theme (e.g., the printing press accelerating knowledge, the Atlantic slave trade establishing global capitalism, or the shift of power from kings to parliaments) and justify why this specific change laid the foundational structures of the modern world."
    }
};

data.lessons.forEach(lesson => {
    // 1. Calculate the qNum for the reflection task
    let qCount = 0;
    if (lesson.primary_source && lesson.primary_source.question) qCount++;
    if (lesson.do_now) {
        if (lesson.do_now.type === 'timeline' && lesson.do_now.prediction_question) qCount++;
        else if (lesson.do_now.type === 'questions') qCount += lesson.do_now.items.length;
    }
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach(block => {
            if (block.tasks) qCount += block.tasks.length;
        });
    }

    const reflectionQNum = qCount + 1;
    const reflectionData = specificQuestions[lesson.id];

    if (!lesson.tasks) lesson.tasks = [];
    
    // Remove the old generic capstone
    lesson.tasks = lesson.tasks.filter(t => !t.text || !t.text.includes('Capstone Synthesis'));

    if (reflectionData) {
        lesson.tasks.push({
            qNum: reflectionQNum,
            text: reflectionData.text,
            model: reflectionData.model
        });
    }
});

const finalContent = "export const unitData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(targetFile, finalContent);
console.log("Successfully replaced capstone tasks with specific questions and assigned correct qNums.");
