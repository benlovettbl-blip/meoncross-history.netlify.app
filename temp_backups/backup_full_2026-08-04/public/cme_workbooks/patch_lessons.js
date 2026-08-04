const fs = require('fs');

let content = fs.readFileSync('src/lessons.js', 'utf8');

// Normalize line endings to \n for stable string matching
content = content.replace(/\r\n/g, '\n');

// 1. Update isCoreMode definition
const oldIsCoreMode = "const isCoreMode = (state.studyLevel === 'core' && subtopicId === 'subtopic_1_1');";
const newIsCoreMode = "const isCoreMode = (state.studyLevel === 'core');";

if (content.includes(oldIsCoreMode)) {
  content = content.replace(oldIsCoreMode, newIsCoreMode);
  console.log('✓ Replaced isCoreMode definition');
} else {
  console.error('✗ Could not find old isCoreMode definition!');
}

// 2. Update scaffolded practice html block
// We search for a unique portion of the old scaffolded practice block
const oldPracticeStart = "  let vaultHtml = '';\n  let formulaHtml = '';\n  let scaffoldedPracticeHtml = '';\n  if (isCoreMode) {";
const oldPracticeEnd = "    `;\n  }";

const startIndex = content.indexOf(oldPracticeStart);
const endIndex = content.indexOf(oldPracticeEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const oldPracticeBlock = content.substring(startIndex, endIndex + oldPracticeEnd.length);
  
  const newPracticeBlock = `  let vaultHtml = '';
  let formulaHtml = '';
  let scaffoldedPracticeHtml = '';
  if (isCoreMode && data.scaffoldedPractice) {
    const sp = data.scaffoldedPractice;
    let formulaTitle = '';
    let formulaSteps = [];
    if (sp.questionType === 'consequence') {
      formulaTitle = 'Grade 4 Formula: How to write a 4-Mark Consequence';
      formulaSteps = [
        \`<strong>Point (1 Mark):</strong> Clearly state the consequence. (e.g., <em>"One consequence was..."</em>)\`,
        \`<strong>Evidence (1 Mark):</strong> Add specific facts, dates, or statistics.\`,
        \`<strong>Explain (2 Marks):</strong> Explain what this led to or meant.\`
      ];
    } else if (sp.questionType === 'narrative') {
      formulaTitle = 'Grade 4 Formula: How to write a Narrative Account Paragraph';
      formulaSteps = [
        \`<strong>Beginning (Point):</strong> State the first key event or cause of the sequence.\`,
        \`<strong>Middle (Evidence/Link):</strong> Add specific details and link it to the next event.\`,
        \`<strong>End (Explain/Outcome):</strong> Explain the final outcome or result.\`
      ];
    } else if (sp.questionType === 'importance') {
      formulaTitle = 'Grade 4 Formula: How to write an Importance Paragraph';
      formulaSteps = [
        \`<strong>Point (1 Mark):</strong> State one reason why the factor/event was important.\`,
        \`<strong>Evidence (1 Mark):</strong> Support this with specific historical facts and details.\`,
        \`<strong>Explain (2 Marks):</strong> Explain how this impacted the wider outcome or course of events.\`
      ];
    }

    formulaHtml = \`
      <div style="background: rgba(16, 185, 129, 0.03); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: var(--border-radius-sm); padding: 14px 16px; margin-bottom: 18px; font-size: 0.88rem; line-height: 1.45; border-left: 4px solid var(--success); box-shadow: var(--shadow-sm); text-align: left;">
        <strong style="color: var(--success); font-family: var(--font-heading); display: flex; margin-bottom: 6px; font-size: 0.95rem; justify-content: flex-start; align-items: center; gap: 6px;">
          <i class="fa-solid fa-graduation-cap"></i> \${formulaTitle}
        </strong>
        <p style="margin: 0 0 8px 0; color: var(--text-main);">To write a strong paragraph, select these three parts in order:</p>
        <ol style="margin: 0; padding-left: 20px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
          \${formulaSteps.map(step => \`<li>\${step}</li>\`).join('')}
        </ol>
      </div>
    \`;

    const stepsKeys = ['point', 'evidence', 'explain'];
    const stepTitles = {
      point: sp.questionType === 'narrative' ? 'Select the Beginning (Part 1)' : 'Select the Point (1 Mark)',
      evidence: sp.questionType === 'narrative' ? 'Select the Middle / Link (Part 2)' : 'Select the Evidence (1 Mark)',
      explain: sp.questionType === 'narrative' ? 'Select the End / Result (Part 3)' : 'Select the Explanation (2 Marks)'
    };

    let stepsBlocksHtml = '';
    stepsKeys.forEach((key, idx) => {
      const stepData = sp.steps[key];
      const isFirst = idx === 0;
      const opacity = isFirst ? '1' : '0.5';
      const pointerEvents = isFirst ? 'auto' : 'none';

      let optionsHtml = '';
      stepData.options.forEach((opt, optIdx) => {
        optionsHtml += \`
          <button class="scaffold-option-btn" data-step="\${key}" data-correct="\${opt.correct}" data-idx="\${optIdx}" style="width: 100%; text-align: left; background: var(--bg-card); border: 1px solid var(--border-glass); color: var(--text-main); padding: 12px 16px; border-radius: var(--border-radius-sm); cursor: pointer; transition: all var(--transition-fast) ease; font-size: 0.85rem;">
            \${opt.text}
          </button>
        \`;
      });

      stepsBlocksHtml += \`
        <div class="scaffold-step-block" data-step="\${key}" style="opacity: \${opacity}; pointer-events: \${pointerEvents}; transition: opacity 0.3s;">
          <h4 style="margin: 0 0 10px 0; font-size: 0.92rem; color: var(--text-main); font-family: var(--font-heading); display: flex; align-items: center; gap: 8px;">
            <span style="background: var(--primary); color: #fff; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;">\${idx + 1}</span>
            \${stepTitles[key]}
          </h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            \${optionsHtml}
          </div>
        </div>
      \`;
    });

    const questionTypeBadge = sp.questionType.charAt(0).toUpperCase() + sp.questionType.slice(1);

    scaffoldedPracticeHtml = \`
      <div class="mastery-card scaffold-practice-card" style="max-width: 800px; margin: 0 auto 24px auto; border-left: 4px solid var(--primary); background: rgba(168, 85, 247, 0.01); text-align: left;">
        <h3 class="mastery-card-title" style="display: flex; align-items: center; gap: 8px; border: none; margin-bottom: 6px;">
          <i class="fa-solid fa-cubes" style="color: var(--primary);"></i> 🛠️ Scaffolded Practice: \${questionTypeBadge} Paragraph Builder
        </h3>
        <p style="font-style: italic; margin-top: 0; margin-bottom: 20px; color: var(--text-muted); font-size: 0.85rem;">
          Build a model answer to the exam question below by selecting the correct blocks in order.
        </p>
        
        <div style="background: rgba(0, 0, 0, 0.15); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); padding: 16px; margin-bottom: 20px;">
          <strong style="color: var(--accent); display: block; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">Exam Question:</strong>
          <span style="font-size: 1.05rem; font-weight: 700; color: var(--text-main);">\${sp.questionText}</span>
        </div>

        <div class="scaffold-steps-container" style="display: flex; flex-direction: column; gap: 20px;">
          \${stepsBlocksHtml}
        </div>

        <!-- Feedback & Preview Area -->
        <div class="scaffold-feedback-area" style="margin-top: 20px; display: none;">
          <div class="scaffold-model-preview-card" style="background: rgba(34, 197, 94, 0.02); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: var(--border-radius-sm); padding: 16px; margin-bottom: 16px;">
            <strong style="color: var(--success); display: block; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 8px;">Model Answer Preview:</strong>
            <p id="scaffold-preview-text" style="margin: 0; font-size: 0.95rem; line-height: 1.5; color: var(--text-main); font-style: italic;"></p>
          </div>
          
          <div class="scaffold-success-feedback" style="display: none; padding: 16px; background: rgba(34, 197, 94, 0.05); border-left: 4px solid var(--success); border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;">
            <strong style="color: var(--success); display: block; font-size: 1rem; margin-bottom: 6px;">✓ Paragraph Completed Successfully! (+10 XP)</strong>
            <p style="margin: 0 0 10px 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.45;">
              <strong>Examiner Commentary:</strong> \${sp.commentary}
            </p>
          </div>
        </div>
      </div>
    \`;
  }`;

  content = content.replace(oldPracticeBlock, newPracticeBlock);
  console.log('✓ Replaced scaffolded practice and formula block');
} else {
  console.error('✗ Could not find old practice block indexes!');
}

// 3. Update level selector html and core support html block
const oldSelectorStart = "  let levelSelectorHtml = '';\n  let coreSupportHtml = '';\n  if (subtopicId === 'subtopic_1_1') {";
const oldSelectorEnd = "      `;\n    }\n  }";

const startSelIndex = content.indexOf(oldSelectorStart);
const endSelIndex = content.indexOf(oldSelectorEnd, startSelIndex);

if (startSelIndex !== -1 && endSelIndex !== -1) {
  const oldSelectorBlock = content.substring(startSelIndex, endSelIndex + oldSelectorEnd.length);

  const newSelectorBlock = `  let levelSelectorHtml = '';
  let coreSupportHtml = '';
  const isCore = state.studyLevel === 'core';
  levelSelectorHtml = \`
    <div class="study-level-selector" style="display: flex; background: rgba(0, 0, 0, 0.15); border: 1px solid var(--border-glass); padding: 4px; border-radius: 20px; width: fit-content; margin: 0 auto 24px auto; gap: 4px; box-shadow: var(--shadow-sm); position: relative; z-index: 10;">
      <button class="level-toggle-btn \${isCore ? 'active' : ''}" data-level="core" style="border: none; background: \${isCore ? 'var(--primary)' : 'transparent'}; color: \${isCore ? 'var(--text-inverse)' : 'var(--text-muted)'}; font-weight: 700; font-size: 0.82rem; padding: 8px 18px; border-radius: 16px; cursor: pointer; transition: all var(--transition-fast); display: inline-flex; align-items: center; gap: 6px; box-shadow: \${isCore ? 'var(--shadow-primary)' : 'none'};">
        <i class="fa-solid fa-graduation-cap"></i> Core Lesson
      </button>
      <button class="level-toggle-btn \${!isCore ? 'active' : ''}" data-level="mastery" style="border: none; background: \${!isCore ? 'var(--primary)' : 'transparent'}; color: \${!isCore ? 'var(--text-inverse)' : 'var(--text-muted)'}; font-weight: 700; font-size: 0.82rem; padding: 8px 18px; border-radius: 16px; cursor: pointer; transition: all var(--transition-fast); display: inline-flex; align-items: center; gap: 6px; box-shadow: \${!isCore ? 'var(--shadow-primary)' : 'none'};">
        <i class="fa-solid fa-trophy"></i> Mastery
      </button>
    </div>
  \`;

  if (isCoreMode && data.coreSupport) {
    const cs = data.coreSupport;
    let vocabListHtml = '';
    if (cs.vocab && cs.vocab.length > 0) {
      const vocabItems = cs.vocab.map(v => \`
        <li><strong>\${v.word}:</strong> \${v.definition}</li>
      \`).join('');
      vocabListHtml = \`
        <div class="mastery-card core-vocab-card" style="margin: 0; padding: 20px; border-left: 4px solid var(--secondary); background: rgba(6, 182, 212, 0.02); text-align: left;">
          <h4 style="margin: 0 0 12px 0; font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: var(--secondary); display: flex; align-items: center; gap: 8px; justify-content: flex-start;">
            <i class="fa-solid fa-key"></i> Key Vocabulary Definitions
          </h4>
          <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 0.88rem; line-height: 1.45;">
            \${vocabItems}
          </ul>
        </div>
      \`;
    }

    let timelineListHtml = '';
    if (cs.timeline && cs.timeline.length > 0) {
      const timelineItems = cs.timeline.map(t => \`
        <div style="position: relative;">
          <span style="position: absolute; left: -19px; top: 3px; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.25);"></span>
          <strong style="color: var(--accent);">\${t.date}:</strong> <strong>\${t.event}</strong>. \${t.description}
        </div>
      \`).join('');
      timelineListHtml = \`
        <div class="mastery-card core-timeline-card" style="margin: 0; padding: 20px; border-left: 4px solid var(--accent); background: rgba(244, 63, 94, 0.02); text-align: left;">
          <h4 style="margin: 0 0 12px 0; font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: var(--accent); display: flex; align-items: center; gap: 8px; justify-content: flex-start;">
            <i class="fa-solid fa-clock-rotate-left"></i> Core Timeline
          </h4>
          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.88rem; line-height: 1.4; position: relative; padding-left: 14px; border-left: 2px solid var(--border-glass);">
            \${timelineItems}
          </div>
        </div>
      \`;
    }

    coreSupportHtml = \`
      <div class="core-support-container" style="max-width: 800px; margin: 0 auto 24px auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        \${vocabListHtml}
        \${timelineListHtml}
      </div>
    \`;
  }`;

  content = content.replace(oldSelectorBlock, newSelectorBlock);
  console.log('✓ Replaced level selector and core support block');
} else {
  console.error('✗ Could not find old selector block indexes!');
}

// Convert line endings back to CRLF (standard in this Windows repository)
content = content.replace(/\n/g, '\r\n');

fs.writeFileSync('src/lessons.js', content, 'utf8');
console.log('✓ Successfully wrote lessons.js updates!');
