const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'great_war', 'app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

// 1. Glossary substitution function
// We need to inject this inside renderLesson, before rendering the narrative.
const glossaryInjection = `
      // Process narrative for glossary terms
      let flashcardDict = {};
      if (lesson.flashcards) {
        lesson.flashcards.forEach(fc => {
          flashcardDict[fc.term.toLowerCase()] = fc.definition;
        });
      }
      const highlightGlossary = (text) => {
        if (Object.keys(flashcardDict).length === 0) return text;
        let processedText = text;
        for (const [term, def] of Object.entries(flashcardDict)) {
          // simple word boundary replace
          const regex = new RegExp(\`\\\\b(\${term})\\\\b\`, 'gi');
          processedText = processedText.replace(regex, \`<span style="border-bottom: 1px dotted #1a237e; cursor: help; color: #1a237e; font-weight: 600;" title="\${def.replace(/"/g, '&quot;')}">$1</span>\`);
        }
        return processedText;
      };
`;

appContent = appContent.replace(
  /let pCounter = 1;/,
  glossaryInjection + '\n      let pCounter = 1;'
);

appContent = appContent.replace(
  /<p class="narrative-block" id="para-\$\{pCounter\}">\$\{para\}<\/p>/g,
  '<p class="narrative-block" id="para-${pCounter}">${highlightGlossary(para)}</p>'
);

// 2. Add Historian's Corner and GCSE Task rendering
// Find where the flashcards are rendered and insert before them
const endOfTasksRegex = /if \(lesson\.flashcards && lesson\.flashcards\.length > 0\)/;

const newSections = `
      // Historians Corner
      if (lesson.historians_corner) {
        html += \`<div class="tasks-section" style="margin-top: 40px; background: #f3e5f5; border: 2px solid #ce93d8; border-radius: 8px; padding: 20px;">
          <h3 style="color: #6a1b9a; margin-top: 0; border-bottom: 2px solid #e1bee7; padding-bottom: 10px;"><i class="fa-solid fa-book-journal-whills"></i> Historian's Corner: \${lesson.historians_corner.title}</h3>
          <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #4a148c;">\${lesson.historians_corner.text}</p>
        </div>\`;
      }

      // GCSE Cross-Source Analysis Task
      if (lesson.gcse_task) {
        html += \`<div class="tasks-section" style="margin-top: 40px; background: #e3f2fd; border: 2px solid #90caf9; border-radius: 8px; padding: 20px;">
          <h3 style="color: #1565c0; margin-top: 0; border-bottom: 2px solid #bbdefb; padding-bottom: 10px;"><i class="fa-solid fa-scale-balanced"></i> GCSE Cross-Source Analysis</h3>
          <p style="font-weight: bold; font-size: 1.1rem; color: #0d47a1;">How useful are Sources A and B for an enquiry into \${lesson.gcse_task.topic}?</p>
          
          <div style="display: flex; gap: 20px; margin-top: 20px;">
            <div style="flex: 1; background: white; padding: 15px; border-radius: 8px; border: 1px solid #90caf9;">
              <img src="../great_war/\${lesson.gcse_task.sources[0].src}" style="width: 100%; max-height: 250px; object-fit: contain; margin-bottom: 10px; border-radius: 4px;">
              <p style="margin:0; font-size: 0.9rem; font-weight: 600; color: #1565c0;">\${lesson.gcse_task.sources[0].title}</p>
            </div>
            <div style="flex: 1; background: white; padding: 15px; border-radius: 8px; border: 1px solid #90caf9; display: flex; flex-direction: column; justify-content: center;">
              <blockquote style="font-size: 1.1rem; font-style: italic; color: #475569; border-left: 4px solid #1565c0; padding-left: 15px; margin: 0 0 15px 0;">\${lesson.gcse_task.sources[1].text}</blockquote>
              <p style="margin:0; font-size: 0.9rem; font-weight: 600; color: #1565c0;">\${lesson.gcse_task.sources[1].title}</p>
            </div>
          </div>

          <h4 style="margin-top: 25px; color: #1565c0;">Source Evaluation Scaffolding</h4>
          <table style="width: 100%; border-collapse: collapse; background: white; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <thead>
              <tr style="background: #bbdefb; color: #0d47a1;">
                <th style="padding: 10px; border: 1px solid #90caf9; width: 10%;">Source</th>
                <th style="padding: 10px; border: 1px solid #90caf9; width: 30%;">N.O.P. (Nature, Origin, Purpose)</th>
                <th style="padding: 10px; border: 1px solid #90caf9; width: 30%;">Content (What it shows/says)</th>
                <th style="padding: 10px; border: 1px solid #90caf9; width: 30%;">Contextual Knowledge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 10px; border: 1px solid #90caf9; font-weight: bold; text-align: center;">A</td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #90caf9; font-weight: bold; text-align: center;">B</td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
                <td style="padding: 10px; border: 1px solid #90caf9;"><textarea class="student-answer-input" oninput="window.updateProgress()" style="width:100%; height:80px; border:none; resize:none; font-family:inherit;"></textarea></td>
              </tr>
            </tbody>
          </table>

          <h4 style="margin-top: 15px; color: #1565c0;">Final Written Evaluation</h4>
          <textarea class="student-answer-input" placeholder="Write your full evaluation here using the notes from your table above..." style="width: 100%; height: 150px; margin-top: 10px; padding: 10px; border: 1px solid #90caf9; border-radius: 6px; font-family: inherit; resize: vertical;" oninput="window.updateProgress()"></textarea>
          
          <div id="scaffold-model-gcse" class="scaffold-box model" style="display:none; margin-top:15px;">
            <i class="fa-solid fa-star"></i> <strong>Model Answer:</strong> \${lesson.gcse_task.model}
          </div>
        </div>\`;
      }

      if (lesson.flashcards && lesson.flashcards.length > 0)
`;

appContent = appContent.replace(endOfTasksRegex, newSections);

fs.writeFileSync(appPath, appContent);
console.log("Updated app.js with Historian's Corner, GCSE Tasks, and Glossary");
