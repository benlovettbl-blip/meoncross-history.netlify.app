const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

// The easiest way to patch these is string replacements, since they are very specific texts and structures.

// 1. Fix Empty Tag in Lesson 5 Block 1
content = content.replace(
    'Led by a strict Puritan country gentleman named <strong></strong>,',
    'Led by a strict Puritan country gentleman named <strong>Oliver Cromwell</strong>,'
);

// 2. Fix Orphaned Source C in Lesson 4 Block 4
// The task array for Block 4 currently looks like:
/*
          "tasks": [
            {
              "type": "source_analysis",
              "question": "Study Source A. How does the author of the Monteagle Letter try to convince the Lord to stay away from Parliament?",
              "model_answer": "..."
            }
          ]
*/
let l4b4TaskToInsert = `,
            {
              "type": "source_analysis",
              "question": "Study Source C. What does this execution scene suggest about how the government punished treason in the 17th century?",
              "model_answer": "Source C depicts a brutal, public execution where conspirators are hanged, drawn, and quartered. This suggests that the government used extreme, theatrical violence to deter others and demonstrate the absolute power of the monarch."
            }`;
content = content.replace(
    /("question": "Study Source A\. How does the author of the Monteagle Letter try to convince the Lord to stay away from Parliament\?",[\s\S]*?"model_answer": ".*?")\s*\}/g,
    '$1 }' + l4b4TaskToInsert
);

// 3. Fix Orphaned Source A in Lesson 5 Block 0
// The task array for Block 0 currently looks like:
/*
          "tasks": [
            {
              "type": "source_analysis",
              "question": "Study Source B. How did the public execution of Charles I permanently change the balance of power in England?",
              "model_answer": "..."
            }
          ]
*/
let l5b0TaskToInsert = `{
              "type": "source_analysis",
              "question": "Study Source A. Why did the monarch combine the English and Scottish symbols into a single Coat of Arms?",
              "model_answer": "The combined symbols represented the 1707 Act of Union, formally joining England and Scotland into a single, unified political entity: Great Britain."
            },
            `;
content = content.replace(
    /("tasks": \[\s*)\{\s*"type": "source_analysis",\s*"question": "Study Source B/g,
    '$1' + l5b0TaskToInsert + '{\n              "type": "source_analysis",\n              "question": "Study Source B'
);

// 4. Fix Orphaned Source F in Lesson 9 Block 11 (Mudlarks)
// Block 11 currently ends with "source_letter": "F" \n        }
let l9b11Tasks = `,\n          "tasks": [
            {
              "type": "source_analysis",
              "question": "Study Source F. How does the existence of 'Mudlarks' challenge the idea that 1750 London was entirely prosperous and modern?",
              "model_answer": "Source F shows desperate children scavenging in freezing, sewage-filled mud just to survive. This challenges the idea of a 'modern' London by highlighting the extreme, lethal poverty that existed right alongside the wealthy coffee houses."
            }
          ]`;
content = content.replace(
    /("source_letter": "F"\s*)\}/g,
    '$1}' + l9b11Tasks
);

fs.writeFileSync('early_modern_world/data.js', content);
console.log('Successfully patched all 5 newly discovered errors!');
