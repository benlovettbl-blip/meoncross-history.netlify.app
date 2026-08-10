const fs = require('fs');

const path = 'public/units/early_modern_world/data.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove Lesson 1 Source B block
const lesson1SourceB = `        {
          "title": "Analyzing Source B",
          "image": "/images/global_canton.jpg",
          "image_alt": "View of the Thirteen Factories in Canton (c. 1800)",
          "source_letter": "B",
          "tasks": [
            {
              "type": "comprehension",
              "question": "Based on Source B, how does the reality of the Thirteen Factories in Canton challenge the idea that Europeans dominated global trade in the 1700s?",
              "model_answer": "It shows that Europeans did not dominate trade; instead, they were forced into small, heavily regulated zones (the Thirteen Factories) by the powerful Chinese Emperor, showing that Asian empires held the true economic power and dictated the terms of trade."
            }
          ]
        },
`;
content = content.replace(lesson1SourceB, '');

// 2. Lesson 2: Move sorting task from Block 0 to end (create a new block or append to last block)
const sortingTaskStr = `            {
              "type": "sorting",
              "text": "Chronological Sort: Number these events from 1 to 4 in the order they happened.",
              "events": [
                "The Spanish Armada is defeated by the English fleet and bad weather.",
                "Martin Luther pins his 95 Theses to the door, beginning the Protestant Reformation.",
                "Francis Drake circumnavigates the globe and raids Spanish treasure ships.",
                "The Pope splits the 'New World' between Spain and Portugal."
              ]
            },
`;
content = content.replace(sortingTaskStr, '');

// Append it to the Side Quest block tasks in Lesson 2
const l2EndTarget = `              "model_answer": "Textbooks often focus on the heroic, patriotic narrative of exploration and victory, rather than the grim, unglamorous suffering of ordinary sailors."
            }
          ],
          "source_letter": "F"`;
const l2EndReplace = `              "model_answer": "Textbooks often focus on the heroic, patriotic narrative of exploration and victory, rather than the grim, unglamorous suffering of ordinary sailors."
            },
${sortingTaskStr.trimEnd()}
          ],
          "source_letter": "F"`;
content = content.replace(l2EndTarget, l2EndReplace);


// 3. Lesson 7: Move Queen Nanny drawing from Block 7 to Block 0
const drawingTaskStr = `            {
              "type": "drawing",
              "text": "Visual Mapping: Sketch a visual representation of Queen Nanny’s hidden mountain stronghold and how it helped the Maroons resist the British.",
              "lines": 10
            }
`;
// Wait, is there a comma after it or before it?
// Let's remove it and any leading/trailing commas carefully
content = content.replace(/,\s*\{\s*"type": "drawing",\s*"text": "Visual Mapping: Sketch a visual representation of Queen Nanny’s hidden mountain stronghold and how it helped the Maroons resist the British.",\s*"lines": 10\s*\}/, '');

// Insert it into Block 0 of Lesson 7
const l7Block0Target = `              "model_answer": "Queen Nanny's successful armed rebellion challenges the myth that enslaved people were passive victims waiting for white European abolitionists to free them, proving instead that African resistance was active, organized, and capable of forcing imperial powers into treaties."
            }
          ],`;
const l7Block0Replace = `              "model_answer": "Queen Nanny's successful armed rebellion challenges the myth that enslaved people were passive victims waiting for white European abolitionists to free them, proving instead that African resistance was active, organized, and capable of forcing imperial powers into treaties."
            },
            {
              "type": "drawing",
              "text": "Visual Mapping: Sketch a visual representation of Queen Nanny’s hidden mountain stronghold and how it helped the Maroons resist the British.",
              "lines": 10
            }
          ],`;
content = content.replace(l7Block0Target, l7Block0Replace);


// 4. Lesson 8: Move table planner from Block 3 to Block 9
const plannerTaskRegex = /\{\s*"type": "table_planner",\s*"text": "Assessment Planner: Structure your argument before you write your final essay.",\s*"columns": \[\s*"Point \(Your claim\)",\s*"Evidence \(Historical facts\)",\s*"Explanation \(Why this matters\)"\s*\],\s*"rows": 3\s*\},\s*/;
content = content.replace(plannerTaskRegex, '');

const l8Block9Target = `            {
              "type": "spectrum_mapper",
              "text": "Map these historical realities onto the spectrum below to plan your argument.",`;
const l8Block9Replace = `            {
              "type": "table_planner",
              "text": "Assessment Planner: Structure your argument before you write your final essay.",
              "columns": [
                "Point (Your claim)",
                "Evidence (Historical facts)",
                "Explanation (Why this matters)"
              ],
              "rows": 3
            },
            {
              "type": "spectrum_mapper",
              "text": "Map these historical realities onto the spectrum below to plan your argument.",`;
content = content.replace(l8Block9Target, l8Block9Replace);


fs.writeFileSync(path, content, 'utf8');
console.log('Successfully re-ordered tasks!');
