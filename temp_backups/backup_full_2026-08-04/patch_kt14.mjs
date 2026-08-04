import fs from 'fs';
import { unitData } from './eee/data.js';

const lesson = unitData.lessons.find(l => l.id === 'lesson_1_4');

if (lesson) {
    if (!lesson.exam_practice || !Array.isArray(lesson.exam_practice)) {
        lesson.exam_practice = [];
    }

    lesson.exam_practice.push({
        question: "Describe one feature of the threat posed by Mary, Queen of Scots when she arrived in England in 1568. (2 marks)\nDescribe one feature of the threat posed by Mary, Queen of Scots when she arrived in England in 1568. (2 marks)",
        hint: "Remember the new Edexcel specification asks this as two separate 2-mark questions: 'Describe one feature...' twice. Identify a feature (1 mark) and add supporting detail (1 mark).",
        model_answer: "**Feature 1:**\nOne feature of the threat posed by Mary was her strong claim to the English throne. (1)\nAs Henry VIII's great-niece, many English Catholics believed she was the legitimate queen instead of Elizabeth, who they viewed as illegitimate. (1)\n\n**Feature 2:**\nAnother feature was her presence as a figurehead for Catholic plots. (1)\nHer arrival in 1568 gave disgruntled English Catholics a viable alternative to rally around, significantly increasing the risk of domestic rebellion. (1)"
    });

    lesson.exam_practice.push({
        question: "Explain why Mary, Queen of Scots' arrival in England in 1568 caused problems for Elizabeth. (12 marks)",
        hint: "This is a 12-mark question.\n\nYou may use the following in your answer:\n- Mary's claim to the English throne\n- The Catholic threat\n\nYou must also use information of your own.",
        model_answer: "Mary's arrival in 1568 caused problems primarily because she provided a viable Catholic alternative to Elizabeth's rule. Since the Pope and many English Catholics did not recognise Henry VIII's marriage to Anne Boleyn, they viewed Elizabeth as illegitimate and Mary as the rightful queen. Consequently, Mary immediately became a figurehead for Catholic plots, increasing the risk of rebellion.\n\nSecondly, Mary's arrival created an impossible diplomatic dilemma. If Elizabeth helped Mary regain the Scottish throne, she would anger the Scottish Protestant lords who were currently allied with England. If she handed Mary over to them, she would be endorsing the overthrow of a fellow anointed monarch. However, keeping her imprisoned in England meant she remained a constant focus for conspirators.\n\nFinally, the situation was worsened by the context of the recent 1559 Religious Settlement. Elizabeth's fragile religious peace was threatened by having a Catholic monarch on English soil, as it encouraged Catholic nobles, particularly in the North, to believe that a Catholic restoration was genuinely possible."
    });

    const newFileContent = `export const unitData = ${JSON.stringify(unitData, null, 4)};\n`;
    fs.writeFileSync('eee/data.js', newFileContent);
    console.log("Injected KT1.4 questions successfully!");
} else {
    console.log("Could not find lesson_1_4");
}
