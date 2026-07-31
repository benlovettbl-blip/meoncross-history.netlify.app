const fs = require('fs');
const path = require('path');

const elizabethGuideStr = `
export const elizabethGuide = \`
<div class="exam-guide-section" style="margin-bottom: 60px;">
  \${buildHeader('Paper 2: Early Elizabethan England, 1558-88', 'fa-chess-queen', '#7c3aed')}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section assesses your knowledge of Elizabeth's reign. You have <strong>55 minutes</strong> to complete this section, which is worth 20% of your total GCSE.</em></p>

  \${buildCard(
    'Question 1(a) & 1(b): Describe One Feature...',
    '4 Marks (2x2)', '5 mins',
    'AO1 (Demonstrate knowledge and understanding of key features)',
    'The 2-Mark Triage Formula',
    '<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap; margin-top: 10px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; font-weight: 500;">[Sentence 1: State feature clearly]</div><div style="color: #38bdf8; font-size: 1.2rem;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; font-weight: 500;">[Sentence 2: Add specific context]</div></div>',
    [
      '<strong>The "Paragraph" Trap:</strong> Writing a massive paragraph. Examiners want this surgical: identify the feature, then add a further detail to provide context.',
      '<strong>Double-Dipping:</strong> Giving two features for 1(a). The format has changed! You now only need <em>one</em> feature for 1(a), and a completely different <em>one</em> feature for 1(b).',
      '<strong>Vague Statements:</strong> Listing a feature without any specific historical evidence (e.g., naming William Cecil or a specific year) to back it up.'
    ],
    [
      'Did I state one clear, valid feature per question?',
      'Did I immediately follow it up with a specific supporting fact or piece of contextual evidence?',
      'Is my answer exactly two sentences long?'
    ]
  )}

  \${buildCard(
    'Question 2: Explain Why...',
    '12 Marks', '20 mins',
    'AO1 & AO2 (Knowledge and Analysis of Causation)',
    'The Three-Causal-Pillars Layout',
    '<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;"><div style="display: flex; justify-content: space-between; align-items: center; background: rgba(56, 189, 248, 0.1); padding: 10px 15px; border-radius: 8px; border-left: 4px solid #38bdf8;"><strong>Paragraph 1:</strong> Stimulus Point A</div><div style="display: flex; justify-content: space-between; align-items: center; background: rgba(56, 189, 248, 0.1); padding: 10px 15px; border-radius: 8px; border-left: 4px solid #38bdf8;"><strong>Paragraph 2:</strong> Stimulus Point B</div><div style="display: flex; justify-content: space-between; align-items: center; background: rgba(124, 58, 237, 0.1); padding: 10px 15px; border-radius: 8px; border-left: 4px solid #7c3aed;"><strong>Paragraph 3:</strong> <em>Your Own Knowledge</em></div></div>',
    [
      '<strong>Storytelling Mode:</strong> Just describing what happened (the narrative) instead of explaining <em>why</em> the event happened. You must analyse causation.',
      '<strong>Forgetting Own Knowledge:</strong> Only using the two stimulus points provided. If you don\\'t add a third distinct factor of your own, your marks are heavily capped.',
      '<strong>Missing the "So What?":</strong> Failing to link the end of your paragraph explicitly back to the question.'
    ],
    [
      'Did I use a PEEL structure (Point, Evidence, Explanation, Link) for every paragraph?',
      'Are there three distinct paragraphs covering three separate causes/factors?',
      'Did I definitely include a third piece of "own knowledge" not given in the prompt?',
      'Does every paragraph directly answer <em>why</em> this specific factor caused the outcome in the question?'
    ]
  )}

  \${buildCard(
    'Question 3 (or 4): Evaluate the Statement...',
    '16 Marks', '30 mins',
    'AO1 & AO2 (Evaluate significance/change)',
    'The Grade 9 Judgment Arc',
    '<div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;"><div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px;">⚖️ <strong>Intro:</strong> State your overall judgement</div><div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px;">👍 <strong>Para 1:</strong> Evidence supporting the statement</div><div style="background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 6px;">👎 <strong>Para 2 & 3:</strong> Counter-arguments / Alternative factors</div><div style="background: rgba(245, 158, 11, 0.15); padding: 8px 12px; border-radius: 6px; border-left: 4px solid #f59e0b;">🏆 <strong>Conclusion:</strong> The "Killer" Judgement using criteria</div></div>',
    [
      '<strong>Sitting on the Fence:</strong> You must make a clear judgement on how far you agree. Do not just say "I agree and disagree".',
      '<strong>The Hollow Judgement:</strong> Giving an overall judgement but leaving your justification asserted or insecure, without applying valid criteria.',
      '<strong>Ignoring the Alternatives:</strong> Failing to provide counter-arguments. You must think about both sides of the argument.'
    ],
    [
      'Did I decide on the criteria for my judgement <em>before</em> I started writing?',
      'Have I balanced the essay by looking at factors that support the statement and factors that challenge it?',
      'Does my conclusion weigh the factors up using clear criteria (e.g., short-term trigger vs. long-term existential threat)?',
      'Have I demonstrated wide-ranging knowledge with highly specific dates, names, and statistics?'
    ]
  )}
</div>
\`;
`;

// 1. Update src/exam_guide_content.js
let examGuidePath = path.join(__dirname, 'src', 'exam_guide_content.js');
let examGuide = fs.readFileSync(examGuidePath, 'utf8');
if (!examGuide.includes('elizabethGuide')) {
  fs.writeFileSync(examGuidePath, examGuide.trim() + '\n\n' + elizabethGuideStr, 'utf8');
  console.log('Appended to src/exam_guide_content.js');
}

// 2. Update src/core_app.js
let coreAppPath = path.join(__dirname, 'src', 'core_app.js');
let coreApp = fs.readFileSync(coreAppPath, 'utf8');

const importRegex = /import \{([^}]+)\} from '\.\/exam_guide_content\.js';/;
coreApp = coreApp.replace(importRegex, (match, p1) => {
  if (!p1.includes('elizabethGuide')) {
    return "import {" + p1 + ", elizabethGuide} from './exam_guide_content.js';";
  }
  return match;
});

const insertionRegex = /\} else if \(unitData\.title && \(unitData\.title\.toLowerCase\(\)\.includes\('weimar'\) \|\| unitData\.title\.toLowerCase\(\)\.includes\('germany'\)\)\) \{[\s\S]*?\}\s*else \{/g;
coreApp = coreApp.replace(insertionRegex, (match) => {
  if (match.includes('elizabeth')) return match;
  return match.replace(/}\\s*else \\{/, `} else if (unitData.title && unitData.title.toLowerCase().includes('elizabeth')) {
      contentHtml = \\\`
        <div class="welcome-banner" style="background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #ddd6fe; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 2</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          \${elizabethGuide}
        </div>
      \\\`;
    } else {`);
});

fs.writeFileSync(coreAppPath, coreApp, 'utf8');
console.log('Updated src/core_app.js');
