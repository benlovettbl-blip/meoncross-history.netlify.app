const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'exam_guide_content.js');
let content = fs.readFileSync(filePath, 'utf8');

const newMiddleEastGuide = `export const middleEastGuide = \`
<div class="exam-guide-section" style="margin-bottom: 60px;">
  \${buildHeader('Period Study: Conflict in the Middle East', 'fa-globe', '#b91c1c')}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section is a fast-paced assessment of your historical knowledge and analytical skills. You have exactly <strong>50 minutes</strong> to complete this section, which is worth <strong>32 marks</strong> in total.</em></p>

  \${buildCard(
    'Q1(a) & 1(b): Explain One Consequence',
    '4 Marks (2x2)', '5 mins',
    'AO1/AO2 (Knowledge & Analysis of Consequence)',
    'The 3-Step PEE Formula',
    '<div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">P</span> Point: State one clear, valid consequence</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">E</span> Evidence: Provide precise, specific knowledge</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">E</span> Explanation: Use causal language (e.g., "This directly resulted in...")</div></div>',
    [
      'Describing what happened <em>after</em> the event instead of what happened <em>as a direct result</em>.',
      'Listing multiple consequences instead of focusing on one.',
      'Repeating the same consequence across 1(a) and 1(b).'
    ],
    [
      'Is this exactly one highly focused paragraph?',
      'Did I include precise names, dates, or figures as evidence?',
      'Are there explicit causal connectives linking the evidence to the consequence?'
    ]
  )}

  \${buildCard(
    'Q2: Analytical Narrative',
    '8 Marks', '15 mins',
    'AO1/AO2 (Knowledge & Sequence/Causation)',
    'Chronological Linkage Chain',
    '<div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 1</span> The Beginning: Earliest event</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 2</span> The Middle: Causal link to event 2</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 3</span> The End: Culminating outcome</div></div>',
    [
      'Failing to introduce an independent development (only using stimulus points).',
      'Writing a descriptive story without explaining how one event led to the next.',
      'Jumping back and forth chronologically.'
    ],
    [
      'Are there exactly three connected paragraphs?',
      'Does every paragraph open with an explicit causal connective?',
      'Have I included at least one major development from my own knowledge?'
    ]
  )}

  \${buildCard(
    'Q3: Explain the Importance',
    '16 Marks (2x8)', '25 mins',
    'AO1/AO2 (Knowledge & Analysis of Significance)',
    'The "X Linked to Y" Model',
    '<div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 1</span> Short-Term/Immediate Importance</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 2</span> Long-Term/Strategic Importance</div></div>',
    [
      'Describing what the event/person did without explaining <em>why</em> it was important.',
      'Not explicitly answering "what difference did this make?".'
    ],
    [
      'Did I write exactly two analytical paragraphs for each of the two topics?',
      'Did I include analytical language like "This was highly important for X because..."?',
      'Does my second paragraph end with a strong summary statement about long-term significance?'
    ]
  )}

  <div class="exam-guide-topic" style="background: #f8fafc; border: 2px dashed #94a3b8; border-radius: 12px; padding: 30px; margin-bottom: 35px;">
    <h3 style="color: #334155; font-family: \\'Outfit\\', sans-serif; font-size: 1.5rem; font-weight: 700; margin-top: 0; margin-bottom: 20px;"><i class="fa-solid fa-lightbulb" style="color: #eab308; margin-right: 10px;"></i> Top Tips & Common Pitfalls for the Middle East</h3>
    <ul style="list-style: none; padding: 0; margin: 0; font-size: 1rem; color: #475569; line-height: 1.8;">
      <li style="margin-bottom: 15px;"><strong style="color: #0f172a;">Own the Timeline:</strong> Memorize the exact years of key conflicts to ensure you stay within the precise date range of narrative or importance questions.</li>
      <li style="margin-bottom: 15px;"><strong style="color: #0f172a;">Master the Cold War Proxy Context:</strong> Show the examiner you understand the international dimension. Explain how the US and Soviet Union provided weapons, funding, or diplomatic pressure to advance their interests.</li>
      <li style="margin-bottom: 15px;"><strong style="color: #0f172a;">Use Precise Tier-3 Terminology:</strong> Weave specific historical terms into your explanations (e.g., Mandate, Fedayeen, Intifada, Shuttle Diplomacy, Sovereignty).</li>
      <li style="margin-bottom: 15px;"><strong style="color: #b91c1c;">The "Nasser vs. Sadat" Confusion:</strong> Do not confuse these two Egyptian presidents. Nasser (1954-1970) is key to Suez and the Six-Day War. Sadat (1970-1981) is key to the Yom Kippur War and Camp David.</li>
    </ul>
  </div>
</div>
\`;
`;

const startIdx = content.indexOf('export const middleEastGuide =');
const endIdx = content.indexOf('export const weimarGuide =');

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + newMiddleEastGuide + '\\n' + content.substring(endIdx);
  fs.writeFileSync(filePath, content);
  console.log('Successfully updated middleEastGuide');
} else {
  console.log('Could not find middleEastGuide or weimarGuide boundaries');
}
