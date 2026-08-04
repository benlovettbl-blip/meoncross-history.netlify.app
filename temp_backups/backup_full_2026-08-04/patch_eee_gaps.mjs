import fs from 'fs';
import { unitData } from './eee/data.js';

function addQuestion(lessonId, qObj) {
    let lesson = unitData.lessons.find(l => l.id === lessonId);
    if (!lesson) {
        console.error("Could not find lesson:", lessonId);
        return;
    }
    if (!lesson.exam_practice || !Array.isArray(lesson.exam_practice)) {
        lesson.exam_practice = [];
    }
    lesson.exam_practice.push(qObj);
    console.log(`Added question to ${lessonId}`);
}

// 1. KT3.2 (Poverty)
addQuestion('lesson_3_2', {
    question: "Explain why poverty increased in early Elizabethan England. (12 marks)",
    hint: "This is a 12-mark question.\n\nYou may use the following in your answer:\n- Population growth\n- Enclosure\n\nYou must also use information of your own.",
    model_answer: "Poverty increased significantly in Elizabethan England primarily due to population growth. The population rose from around 3 million in 1551 to over 4 million by 1601. This meant there was a greater demand for food, clothes, and housing, which drove up prices (inflation). At the same time, because there was a surplus of workers, wages fell, making it incredibly difficult for the poorest to afford basic necessities.\n\nSecondly, changes in farming practices, specifically enclosure, worsened the situation. Landlords began enclosing common land to farm profitable sheep instead of growing crops. This meant ordinary villagers lost their traditional rights to graze animals or gather firewood. Furthermore, sheep farming required far fewer labourers than growing crops, leading to massive rural unemployment and forcing many to become vagabonds travelling to towns in search of work.\n\nFinally, the collapse of traditional support systems contributed to the crisis. Before 1536, monasteries had provided food, shelter, and medical care for the poor. Following the Dissolution of the Monasteries under Henry VIII, this vital safety net disappeared, leaving the sick and elderly destitute and entirely reliant on inadequate local parish charity."
});

// 2. KT1.3 (Challenge to the religious settlement) - 12 Mark
addQuestion('lesson_1_3', {
    question: "Explain why the Puritans challenged Elizabeth's religious settlement in the years 1559–69. (12 marks)",
    hint: "This is a 12-mark question.\n\nYou may use the following in your answer:\n- Vestments\n- The Crucifix controversy\n\nYou must also use information of your own.",
    model_answer: "The Puritans challenged the Religious Settlement because they believed it was an ungodly compromise that retained too many Catholic features. As strict, radical Protestants, they wanted a 'pure' church based entirely on the Bible, and were angry that Elizabeth's 1559 settlement included compromises to appease Catholics, such as the ambiguous wording in the Communion service.\n\nA specific reason for their challenge was the controversy over vestments. The Royal Injunctions ordered clergy to wear special vestments (the surplice). Puritans strongly objected to this, arguing that priests should wear simple, plain clothing, as elaborate vestments incorrectly suggested that priests were somehow magically closer to God than ordinary people. This led to a standoff in 1566 where 37 Puritan priests in London refused to wear them and were sacked.\n\nFinally, Puritans challenged the settlement over the use of crucifixes. Elizabeth wanted a crucifix in every church to maintain a familiar look for her Catholic subjects. However, Puritans viewed crucifixes as 'idols' and idolatry, which was strictly forbidden in the Bible. Some Puritan bishops threatened to resign rather than enforce the rule, forcing Elizabeth to back down as she could not afford to lose her most educated Protestant leaders."
});

// 3. KT1.3 (Challenge to the religious settlement) - 4 Mark
addQuestion('lesson_1_3', {
    question: "Describe one feature of the Puritan challenge to the religious settlement. (2 marks)\nDescribe one feature of the Puritan challenge to the religious settlement. (2 marks)",
    hint: "Remember the new Edexcel specification asks this as two separate 2-mark questions: 'Describe one feature...' twice. Identify a feature (1 mark) and add supporting detail (1 mark).",
    model_answer: "**Feature 1:**\nOne feature of the Puritan challenge was the Crucifix Controversy. (1)\nPuritan bishops threatened to resign because Elizabeth ordered a crucifix to be placed in every church, which Puritans viewed as sinful idolatry. (1)\n\n**Feature 2:**\nAnother feature was the Vestment Controversy of 1566. (1)\nMany Puritan priests refused to wear the special Catholic-style vestments ordered by Elizabeth, resulting in 37 London priests losing their jobs. (1)"
});

// 4. KT3.4 (Raleigh and Virginia)
addQuestion('lesson_3_4', {
    question: "Explain why the English attempts to colonise Virginia in the 1580s failed. (12 marks)",
    hint: "This is a 12-mark question.\n\nYou may use the following in your answer:\n- Native American resistance\n- Lack of supplies\n\nYou must also use information of your own.",
    model_answer: "The English attempts to colonise Virginia ultimately failed because of deteriorating relations with the Native American populations. Although initially welcoming, the Algonquian people, led by Chief Wingina, became increasingly hostile. This was because the English colonists, suffering from food shortages, constantly demanded food and resources, which angered the natives. Following violence and the spread of deadly European diseases, the colonists could no longer rely on the natives for survival, crippling the settlement.\n\nSecondly, a severe lack of supplies doomed the colony from the start. The voyage itself was disastrous; the flagship 'Tiger' hit a sandbank upon arrival in 1585, which ruined the majority of their food seeds and gunpowder. Because they arrived too late in the year to plant new crops, they immediately faced starvation and were utterly dependent on supply ships from England, which were dangerously delayed.\n\nFinally, the colonists themselves were poorly chosen for the harsh reality of building a settlement. Many were soldiers or wealthy gentlemen who expected to find instant gold, rather than farmers willing to do the grueling manual labour required to grow crops and build shelters. This lack of relevant skills meant the colony was never self-sufficient and collapsed under the harsh conditions."
});

const newFileContent = `export const unitData = ${JSON.stringify(unitData, null, 4)};\n`;
fs.writeFileSync('eee/data.js', newFileContent);
console.log("All missing questions injected successfully!");
