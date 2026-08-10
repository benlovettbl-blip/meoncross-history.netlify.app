const fs = require('fs');

const path = 'public/units/early_modern_world/data.js';
let content = fs.readFileSync(path, 'utf8');

const target = `        },
        {
          "title": "Vocabulary Check: Building Empires",`;

const replacement = `        },
        {
          "title": "Analyzing Source F",
          "image": "/images/global_canton.jpg",
          "image_alt": "View of the Thirteen Factories in Canton (c. 1800)",
          "source_letter": "F",
          "tasks": [
            {
              "type": "comprehension",
              "question": "Based on Source F, how does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s?",
              "model_answer": "It shows that Europeans did not dominate trade; instead, they were forced into small, heavily regulated zones (the Thirteen Factories) by the powerful Chinese Emperor, showing that Asian empires held the true economic power and dictated the terms of trade."
            }
          ]
        },
        {
          "title": "Vocabulary Check: Building Empires",`;

content = content.replace(target, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully injected Canton source into Lesson 3!');
