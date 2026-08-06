const fs = require('fs');
let dataStr = fs.readFileSync('early_modern_world/data.js', 'utf8');
const jsonStr = dataStr.replace('export const unitData = ', '').trim().replace(/;$/, '');
const unit = eval('(' + jsonStr + ')');

unit.lessons[5].narrative_blocks.push({
    title: "Final Assessment (16 marks)",
    text: "Using your essay plan above, you must now write your final synoptic essay answering the overarching unit enquiry. You will be graded on your ability to deploy specific historical facts, your analysis of 'modernity', and your ability to weigh up competing factors.",
    extended: {
        question: "Write an essay answering the question: How 'modern' was Britain by 1750? (16 marks)",
        scaffolding: [
            "Introduction: Define 'modernity' and outline your argument that Britain was a mix of modern finance/trade but deeply traditional social structures.",
            "Paragraph 1: Explain the ways Britain was modern (e.g., Bank of England 1694, Parliament, Global Trade).",
            "Paragraph 2: Explain the ways Britain was NOT modern (e.g., Bloody Code, Transatlantic Chattel Slavery, Women's lack of legal rights, extreme poverty).",
            "Conclusion: Summarise your final judgement on how 'modern' Britain truly was."
        ]
    }
});

const output = 'export const unitData = ' + JSON.stringify(unit, null, 2) + ';\n';
fs.writeFileSync('early_modern_world/data.js', output, 'utf8');
console.log('Added 16 mark assessment to Lesson 6.');
