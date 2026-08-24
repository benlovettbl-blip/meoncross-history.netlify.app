const fs = require('fs');
let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

// The Canton multiple-choice object
let qStr = `                {
                  "q": "How does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s?",
                  "options": [
                    "Europeans were forced to stay in small, confined trading posts",
                    "Europeans owned the entire city of Canton",
                    "The Chinese refused to trade entirely",
                    "Europeans had stronger armies than the Ming Emperor"
                  ]
                }`;

// Determine exactly how it's formatted in the file. Let's find the exact block via parsing.
let data;
eval('data = ' + content.replace('export default early_modern_world;', 'early_modern_world;').replace('const early_modern_world =', ''));

let questions = data.lessons[0].narrative_blocks[0].tasks[0].questions;
let extractedQuestion = null;

questions = questions.filter(q => {
    if (q.q && q.q.includes('Canton challenge')) {
        extractedQuestion = q;
        return false;
    }
    return true;
});

data.lessons[0].narrative_blocks[0].tasks[0].questions = questions;

// Now insert it into Block 2
data.lessons[0].narrative_blocks[2].tasks = [
    {
        type: "multiple_choice",
        question: "Knowledge Check: Global Power in 1450",
        questions: [ extractedQuestion ]
    }
];

// Instead of rewriting the whole JSON (which breaks formatting), let's use string manipulation based on our exact knowledge of the file.

let block2End = `closely watched by Chinese authorities."
        },`;
let newBlock2End = `closely watched by Chinese authorities.",
        "tasks": [
          {
            "type": "multiple_choice",
            "question": "Knowledge Check: Global Power in 1450",
            "questions": [
              {
                "q": "How does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s?",
                "options": [
                  "Europeans were forced to stay in small, confined trading posts",
                  "Europeans owned the entire city of Canton",
                  "The Chinese refused to trade entirely",
                  "Europeans had stronger armies than the Ming Emperor"
                ]
              }
            ]
          }
        ]
      },`;

// We also need to strip it from Block 0.
let b0Q = `,
                {
                  "q": "How does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s?",
                  "options": [
                    "Europeans were forced to stay in small, confined trading posts",
                    "Europeans owned the entire city of Canton",
                    "The Chinese refused to trade entirely",
                    "Europeans had stronger armies than the Ming Emperor"
                  ]
                }`;

content = content.replace(b0Q, '');
content = content.replace(block2End, newBlock2End);

fs.writeFileSync('early_modern_world/data.js', content);
console.log('Done!');
