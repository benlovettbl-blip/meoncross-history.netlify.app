import fs from 'fs';

// 1. Update AGENTS.md
const agentsPath = 'c:/Projects/meoncross-history.netlify.app/.agents/AGENTS.md';
let agentsContent = fs.readFileSync(agentsPath, 'utf8');

const newRule = `
## Printed Workbook Timeline Tasks
Whenever generating or modifying the \`generate_worksheets.js\` Node script for printed A4 workbooks, if a lesson contains a \`do_now.type === "timeline"\`, you MUST render it as a 'Domino Flowchart'. The script must print the events inside randomly scattered/shuffled CSS boxes on the page. The instructions must tell the student to 'draw arrows connecting the events in the correct chronological and causal order'.
`;
if (!agentsContent.includes('Printed Workbook Timeline Tasks')) {
  fs.appendFileSync(agentsPath, newRule, 'utf8');
}

// 2. Update great_war/generate_worksheets.js
const gwPath = 'c:/Projects/meoncross-history.netlify.app/great_war/generate_worksheets.js';
let gwContent = fs.readFileSync(gwPath, 'utf8');

const oldTimelineBlock = `
    if (lesson.do_now.type === "timeline") {
      // Don't render interactive timeline on PDF, or maybe just list the events?
      html += \`<div class="do-now-box"><h3>Chronological Big Picture</h3>\`;
      lesson.do_now.events.forEach(ev => {
        html += \`<p><strong>\${ev.year}:</strong> \${ev.title} - <em>\${ev.detail}</em></p>\`;
      });
      if (lesson.do_now.prediction_question) {
        html += \`<div class="do-now-q"><strong>Q\${lesson.do_now.qNum}. \${lesson.do_now.prediction_question.replace('Predict: ', '').replace(/\\s*\\((P|Para\\s*)\\d+\\)/gi, '')}</strong></div>\`;
        html += \`<div class="task-lines-large"></div><div class="task-lines-large"></div>\`;
      }
      html += \`</div>\`;
    }
`.trim();

const newTimelineBlock = `
    if (lesson.do_now.type === "timeline") {
      html += \`<div class="do-now-box">
                 <h3>Chronological Domino Flowchart</h3>
                 <p style="font-style: italic; color: #555;"><strong>Task:</strong> The historical events below are out of order. Read them carefully, then use your pen to <strong>draw arrows connecting the boxes</strong> in the correct chronological and causal order (Event A ➔ Event B ➔ Event C...).</p>
                 <div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 20px;">\`;
                 
      // Shuffle the events
      let shuffledEvents = [...lesson.do_now.events];
      shuffledEvents.sort(() => Math.random() - 0.5);
      
      shuffledEvents.forEach((ev, idx) => {
        // Create scattered boxes by adding random margins and a solid border
        const margins = ["margin-top: 10px;", "margin-top: 30px;", "margin-bottom: 20px;", "margin-top: 0px;"];
        const m = margins[idx % margins.length];
        html += \`<div style="width: 45%; border: 2px solid #333; padding: 10px; box-sizing: border-box; background: #fff; \${m} box-shadow: 2px 2px 0px #aaa;">
                    <strong>\${ev.year}</strong><br>
                    <strong>\${ev.title}</strong><br>
                    <span style="font-size: 10pt;">\${ev.detail}</span>
                 </div>\`;
      });
      html += \`</div><div style="clear: both; margin-bottom: 20px;"></div>\`;

      if (lesson.do_now.prediction_question) {
        html += \`<div class="do-now-q" style="margin-top: 20px;"><strong>Q\${lesson.do_now.qNum}. \${lesson.do_now.prediction_question.replace('Predict: ', '').replace(/\\s*\\((P|Para\\s*)\\d+\\)/gi, '')}</strong></div>\`;
        html += \`<div class="task-lines-large"></div><div class="task-lines-large"></div>\`;
      }
      html += \`</div>\`;
    }
`.trim();

gwContent = gwContent.replace(oldTimelineBlock, newTimelineBlock);

fs.writeFileSync(gwPath, gwContent, 'utf8');
console.log("Successfully updated AGENTS.md and great_war/generate_worksheets.js");
