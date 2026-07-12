import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

// The new timelines mapping
const timelines = {
  1: [
    { title: "Jewish Insurgency", prompt: "Why did Jewish paramilitary groups target British forces?" },
    { title: "King David Hotel Bombing", prompt: "What was the impact of this attack on British morale?" },
    { title: "The Exodus Incident", prompt: "How did this event sway international opinion?" },
    { title: "UN Partition Plan (Res 181)", prompt: "What was the UN's proposed solution?" },
    { title: "Declaration of the State of Israel", prompt: "Who declared it and what was the immediate reaction?" }
  ],
  2: [
    { title: "The Arab Invasion", prompt: "Which nations attacked Israel immediately after its creation?" },
    { title: "First Truce", prompt: "How did Israel use the UN-brokered truce to its advantage?" },
    { title: "Deir Yassin Massacre", prompt: "What impact did this have on the Palestinian population?" },
    { title: "The Palestinian Exodus (Nakba)", prompt: "Why did 700,000 Palestinians become refugees?" },
    { title: "1949 Armistice Agreements", prompt: "What were the new borders established?" }
  ],
  3: [
    { title: "The Baghdad Pact", prompt: "Why did this Western alliance anger Nasser?" },
    { title: "Czech Arms Deal", prompt: "How did this shift the balance of power in the region?" },
    { title: "Nationalisation of the Suez Canal", prompt: "Why did Nasser take control of the canal?" },
    { title: "The Suez Crisis", prompt: "Who colluded to attack Egypt, and what was the outcome?" },
    { title: "Formation of the PLO", prompt: "What was the goal of the Palestine Liberation Organisation?" }
  ],
  4: [
    { title: "False Soviet Intelligence", prompt: "What incorrect information sparked the crisis?" },
    { title: "Closure of the Straits of Tiran", prompt: "Why was this considered an act of war by Israel?" },
    { title: "Operation Focus", prompt: "How did Israel achieve total air superiority?" },
    { title: "Capture of East Jerusalem", prompt: "What was the significance of taking the Old City?" },
    { title: "UN Resolution 242", prompt: "What 'land for peace' formula was proposed?" }
  ],
  5: [
    { title: "War of Attrition", prompt: "How did Egypt attempt to wear down Israeli forces?" },
    { title: "Rise of Yasser Arafat", prompt: "How did Arafat transform the PLO?" },
    { title: "Battle of Karameh", prompt: "Why was this a psychological victory for Fatah?" },
    { title: "Dawson's Field Hijackings", prompt: "How did the PFLP gain international attention?" },
    { title: "Black September", prompt: "Why did King Hussein expel the PLO from Jordan?" }
  ],
  6: [
    { title: "Sadat becomes President", prompt: "How did Anwar Sadat differ from Nasser?" },
    { title: "Expulsion of Soviet Advisors", prompt: "Why did Sadat distance Egypt from the USSR?" },
    { title: "The Yom Kippur Surprise Attack", prompt: "How did Egypt and Syria catch Israel off-guard?" },
    { title: "Crossing the Suez Canal", prompt: "How did Egypt breach the Bar Lev line?" },
    { title: "The Oil Weapon", prompt: "How did OPEC pressure Western nations?" }
  ],
  7: [
    { title: "Kissinger's Shuttle Diplomacy", prompt: "How did the US mediate post-war disengagement?" },
    { title: "Sadat's Visit to Jerusalem", prompt: "Why was this a historic breakthrough?" },
    { title: "The Camp David Accords", prompt: "What framework for peace was agreed upon?" },
    { title: "The Egypt-Israel Peace Treaty", prompt: "What did each side gain from the 1979 treaty?" },
    { title: "Assassination of Sadat", prompt: "Why was Sadat assassinated by Islamic extremists?" }
  ],
  8: [
    { title: "Arafat's UN Address", prompt: "What was the significance of the 'olive branch and freedom fighter's gun' speech?" },
    { title: "PLO Moves to Lebanon", prompt: "Why did southern Lebanon become known as 'Fatahland'?" },
    { title: "Israeli Invasion of Lebanon", prompt: "What were the objectives of Operation Peace for Galilee?" },
    { title: "Sabra and Shatila Massacre", prompt: "What happened, and what was the international reaction?" },
    { title: "Outbreak of the First Intifada", prompt: "What sparked the 1987 Palestinian uprising?" }
  ],
  9: [
    { title: "PLO Recognizes Israel", prompt: "What shift occurred in Arafat's policy in 1988?" },
    { title: "The Gulf War", prompt: "How did the PLO's support for Saddam Hussein affect its standing?" },
    { title: "The Madrid Conference", prompt: "Why was this conference a diplomatic milestone?" },
    { title: "The Oslo Accords", prompt: "What self-rule was granted to the Palestinians?" },
    { title: "Assassination of Yitzhak Rabin", prompt: "How did this tragic event impact the peace process?" }
  ]
};

// Replace narrative and tasks rendering logic
const oldLogicStart = "  // Render Narrative";
const oldLogicEnd = "  // Extended Scholarship";

if (!content.includes(oldLogicStart)) {
    console.error("Could not find Old Logic Start");
    process.exit(1);
}
if (!content.includes(oldLogicEnd)) {
    console.error("Could not find Old Logic End");
    process.exit(1);
}

const beforeOld = content.substring(0, content.indexOf(oldLogicStart));
const afterOld = content.substring(content.indexOf(oldLogicEnd));

let newLogic = \`
  // Render Interleaved Narrative Blocks & Tasks
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block, index) => {
      // Print the paragraph text
      if (block.text) {
        if (typeof block.text === 'string' && block.text.startsWith('"')) {
          html += \`<div style="font-weight: bold; margin: 15px 0; font-size: 13pt;">\${block.text.replace(/"/g, '')}</div>\`;
        } else {
          html += \`<p class="narrative-block">\${block.text}</p>\`;
        }
      }

      // If this block has tasks, print them immediately underneath
      if (block.tasks && block.tasks.length > 0) {
        html += \`<div class="task-box" style="margin-top: 15px;">\`;
        html += \`<h3 style="margin-top: 0; font-size: 14pt;">Knowledge Check</h3>\`;
        block.tasks.forEach(task => {
          let cleanTask = task.text.replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: )/, '').replace(/\\s*\\((P|Para\\s*)\\d+\\)/gi, '').replace(/\\s*\\(Ext P\\d+(-\\d+)?\\)/gi, '');
          html += \`<p style="margin-top:10px; font-weight: bold;">\${cleanTask}</p>\`;
          // Add 3 blank lines for writing
          html += \`<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>\`;
        });
        html += \`</div>\`;
      }
    });
  }

  // Identify Draw Tasks (if any remain)
  const drawTasks = lesson.draw_tasks || [];
  
  // Render Sources and append Draw Tasks immediately beneath them
  if (lesson.sources && lesson.sources.length > 0) {
    lesson.sources.forEach(source => {
      if(source.src) {
        let src = source.src.startsWith('../') || source.src.startsWith('http') ? source.src : \`../cme_new/\${source.src}\`;
        html += \`
          <div class="source-container" style="page-break-inside: avoid;">
            \${source.title ? \`<strong>\${source.title}</strong><br>\` : ''}
            <img src="\${src}" alt="Source">
            \${source.caption ? \`<div class="source-caption">\${source.caption}</div>\` : ''}
          </div>
        \`;
      }
    });
    
    // Append draw tasks right after the sources block
    if (drawTasks.length > 0) {
      drawTasks.forEach(task => {
        html += \`<div class="draw-task"><i class="fa-solid fa-pencil"></i> Source Task: \${task.text}</div>\`;
      });
    }
  }

\`;

const timelineMapStr = JSON.stringify(timelines);

let endingLogic = \`
  // Add Revision Timeline Page at the end of the lesson
  const timelinesMap = \${timelineMapStr};
  const events = timelinesMap[lessonIndex + 1];
  
  if (events && events.length > 0) {
    html += \`<div style="page-break-before: always;">
      <h2 style="text-align: center; font-size: 24pt; margin-bottom: 5px; color: #1a237e;">Revision Timeline</h2>
      <h3 style="text-align: center; font-size: 16pt; margin-top: 0; margin-bottom: 25px; font-weight: normal;">\${lesson.title}</h3>
      <p style="text-align: center; font-style: italic; margin-bottom: 40px; font-size: 12pt;">
        Map out the key events chronologically. Read the title and prompt to guide your summary.
      </p>
      
      <div style="margin: 0 auto; width: 85%; border-left: 4px solid #1a237e; padding-left: 40px; position: relative; padding-bottom: 20px;">
    \`;
    
    events.forEach(ev => {
      html += \`
        <div style="position: relative; margin-bottom: 40px; page-break-inside: avoid;">
          <!-- Node dot -->
          <div style="position: absolute; left: -50px; top: 0; width: 16px; height: 16px; background: #fff; border: 4px solid #1a237e; border-radius: 50%;"></div>
          
          <div style="background: #f8f9fa; border: 1px solid #ccc; border-radius: 8px; padding: 15px;">
            <div style="font-weight: bold; font-size: 14pt; margin-bottom: 8px;">\${ev.title}</div>
            <div style="font-style: italic; font-size: 11pt; color: #555; margin-bottom: 15px;">\${ev.prompt}</div>
            <div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>
          </div>
        </div>
      \`;
    });
    
    html += \`
      </div>
    </div>\`;
  }
\`;

// Let's inject the endingLogic right before the end of the lessons loop!
// The loop ends at line 227: `  }\n});`
// So we find the end of Historians Corner.
let endTagRegex = /  \/\/ Historians Corner[\\s\\S]*?  }/;
let match = afterOld.match(endTagRegex);

if (match) {
    let replacedAfterOld = afterOld.replace(endTagRegex, match[0] + "\n" + endingLogic);
    content = beforeOld + newLogic + replacedAfterOld;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully patched generate_worksheets.js with chunking and timelines!");
} else {
    console.error("Could not find the end tag regex in afterOld");
    process.exit(1);
}
