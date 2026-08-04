
const buildHeader = (title, icon, color) => `
  <div style="display: flex; align-items: center; margin-bottom: 25px; border-bottom: 3px solid ${color}; padding-bottom: 10px;">
    <div style="background: ${color}; color: white; width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-right: 15px; box-shadow: 0 4px 10px ${color}40;">
      <i class="fa-solid ${icon}"></i>
    </div>
    <h2 style="color: ${color}; font-family: 'Outfit', sans-serif; font-size: 1.9rem; font-weight: 700; margin: 0;">${title}</h2>
  </div>
`;

const buildCard = (title, marks, time, objective, formulaTitle, formulaContent, redFlags, checklist) => {
  const cardId = 'card-' + Math.random().toString(36).substr(2, 9);
  const timeMatch = time.match(/(\d+)(?!.*\d)/);
  const defaultMinutes = timeMatch ? parseInt(timeMatch[1], 10) : 5;
  
  return `
  <div class="exam-guide-topic" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); padding: 30px; margin-bottom: 35px; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 20px -5px rgba(0, 0, 0, 0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.05)';">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">
      <h3 style="color: #0f172a; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; margin: 0;">${title}</h3>
      <div style="display: flex; gap: 10px; align-items: center;">
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-star" style="color: #eab308;"></i> ${marks}</span>
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-regular fa-clock" style="color: #3b82f6;"></i> ${time}</span>
        <button onclick="window.toggleExamTimer('${cardId}', ${defaultMinutes})" style="background: #e2e8f0; color: #475569; border: none; border-radius: 20px; padding: 6px 14px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;" onmouseover="this.style.background='#cbd5e1'" onmouseout="this.style.background='#e2e8f0'"><i class="fa-solid fa-stopwatch" style="color: #6366f1;"></i> Timer</button>
      </div>
    </div>
    
    <div id="timer-container-${cardId}" style="display: none; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 15px 20px; margin-bottom: 25px; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 15px;">
        <button onclick="window.adjustExamTimer('${cardId}', -1)" style="background: white; border: 1px solid #93c5fd; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #1d4ed8; transition: background 0.2s;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='white'"><i class="fa-solid fa-minus"></i></button>
        <div id="timer-display-${cardId}" style="font-family: 'Fira Code', monospace; font-size: 2rem; font-weight: bold; color: #1e3a8a; width: 110px; text-align: center;">${defaultMinutes}:00</div>
        <button onclick="window.adjustExamTimer('${cardId}', 1)" style="background: white; border: 1px solid #93c5fd; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #1d4ed8; transition: background 0.2s;" onmouseover="this.style.background='#dbeafe'" onmouseout="this.style.background='white'"><i class="fa-solid fa-plus"></i></button>
      </div>
      <div style="flex-grow: 1; margin: 0 25px; height: 8px; background: #dbeafe; border-radius: 4px; overflow: hidden; position: relative;">
        <div id="timer-progress-${cardId}" style="width: 100%; height: 100%; background: #3b82f6; transition: width 1s linear;"></div>
      </div>
      <div style="display: flex; gap: 10px;">
        <button id="timer-start-btn-${cardId}" onclick="window.startExamTimer('${cardId}')" style="background: #10b981; color: white; border: none; border-radius: 6px; padding: 8px 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'"><i class="fa-solid fa-play"></i> Start</button>
        <button onclick="window.resetExamTimer('${cardId}', ${defaultMinutes})" style="background: #64748b; color: white; border: none; border-radius: 6px; padding: 8px 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: background 0.2s;" onmouseover="this.style.background='#475569'" onmouseout="this.style.background='#64748b'"><i class="fa-solid fa-rotate-right"></i> Reset</button>
      </div>
    </div>
    
    <div style="background: #f8fafc; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin-bottom: 25px;">
      <span style="display: block; font-size: 0.85rem; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px;">Target Objective</span>
      <span style="color: #334155; font-weight: 500; font-size: 1.05rem;">${objective}</span>
    </div>
    
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #f8fafc; padding: 25px; border-radius: 10px; margin: 30px 0; font-family: 'Fira Code', monospace; position: relative; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
      <div style="position: absolute; top: -10px; right: -10px; color: rgba(255,255,255,0.03); font-size: 6rem;"><i class="fa-solid fa-code"></i></div>
      <strong style="color: #38bdf8; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 15px;"><i class="fa-solid fa-bolt" style="color: #fbbf24; margin-right: 8px;"></i> ${formulaTitle}</strong>
      <div style="font-size: 1rem; line-height: 1.8;">
        ${formulaContent}
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
      <div style="background: #fff5f5; border: 1px solid #fecaca; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #dc2626; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-triangle-exclamation" style="margin-right: 10px; font-size: 1.2rem;"></i> Examiner Red Flags</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #991b1b; line-height: 1.6;">
          ${redFlags.map(rf => `<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>${rf}</span></li>`).join('')}
        </ul>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #16a34a; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-check-double" style="margin-right: 10px; font-size: 1.2rem;"></i> Grade 9 Checklist</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #166534; line-height: 1.6;">
          ${checklist.map(cl => `<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>${cl}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
`;
};

export const sectionAGuide = `
<div class="exam-guide-section" style="margin-bottom: 60px;">
  ${buildHeader('Section A: The Historic Environment', 'fa-map-location-dot', '#1e40af')}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section assesses your knowledge of the historic environment of the Western Front and counts for 10% of your total GCSE.</em></p>

  ${buildCard(
    'Q1(a) & 1(b): Describe One Feature...',
    '4 Marks', '5 mins',
    'AO1 (Demonstrate knowledge and understanding of key features)',
    'The 2-Mark Triage Formula',
    '<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Sentence 1: State feature clearly]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Sentence 2: Add specific context]</div></div>',
    [
      '<strong>The Single-Sentence List:</strong> Naming a feature without elaboration (e.g., "One feature was gas attacks"). This only secures 1 mark.',
      '<strong>Vague Generalizations:</strong> Broad statements without precise historical vocabulary.',
      '<strong>"Too Much Detail":</strong> Writing a whole paragraph. Examiners award the 2 marks as soon as the feature and one detail are met. Excess writing wastes precious time.'
    ],
    [
      '<strong>Structural Separation:</strong> Have I written exactly two distinct sentences for 1(a) and two for 1(b)?',
      '<strong>First-Sentence Punch:</strong> Does my first sentence explicitly state one physical, technological, or administrative feature?',
      '<strong>Precise Contextual Anchor:</strong> Does my second sentence deploy named, specific historical data?',
      '<strong>Zero Overlap:</strong> Are my answers for 1(a) and 1(b) completely distinct?'
    ]
  )}

  ${buildCard(
    'Question 2(a): Source Utility',
    '8 Marks', '12-15 mins',
    'AO3 (Analyse, evaluate, and use sources to make substantiated judgements)',
    'The Grade 9 Utility Structure',
    '<div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">1</span> Enquiry-Focused Thesis</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">2</span> Source Paragraph (Content, Provenance, Context)</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">3</span> Explicit Utility Verdict (Do NOT compare)</div></div>',
    [
      '<strong>Generic Provenance Mnemonics:</strong> Using rote-learned checklists to make sweepingly dismissive statements (e.g., "Source A is a diary so it is biased/unreliable").',
      '<strong>The Comparison Trap:</strong> Wasting time comparing Source A and Source B. There are zero marks available for comparing.',
      '<strong>Simple Comprehension:</strong> Simply listing what the source "shows" or "says" without drawing historical inferences.'
    ],
    [
      '<strong>Enquiry Alignment:</strong> Does the first sentence of each paragraph state how useful that specific source is for the precise enquiry?',
      '<strong>Double-Source Balance:</strong> Have I given equal analytical weight to both sources?',
      '<strong>Inference from Content:</strong> Have I pulled a specific quote or visual detail and explicitly explained what it reveals?',
      '<strong>Provenance Deconstruction:</strong> Have I evaluated why the source was created, who created it, and when?',
      '<strong>Contextual Verification:</strong> Have I integrated independent historical knowledge?'
    ]
  )}

  ${buildCard(
    'Question 2(b): Source Follow-Up',
    '4 Marks', '5 mins',
    'AO3 (Formulate historical questions and plan a historical enquiry)',
    'The Enquiries Connection Map',
    '<div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;"><div style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.9rem;">1. Precise Source Detail</div><i class="fa-solid fa-arrow-right" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.9rem;">2. Broadening Question</div><i class="fa-solid fa-arrow-right" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.9rem;">3. Contemporary Source</div><i class="fa-solid fa-arrow-right" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.9rem;">4. How it Helps</div></div>',
    [
      '<strong>The "Unlinked" Chain:</strong> Proposing a follow-up question that has no logical connection to the physical quote selected in Box 1.',
      '<strong>Anachronistic Sources:</strong> Suggesting "interviews with soldiers," "the internet," or "textbooks." You must select a primary source.',
      '<strong>Circular Explanations:</strong> Writing "This would help answer my question because it would tell me what I want to know" in Box 4 receives 0 marks.'
    ],
    [
      '<strong>Box 1 (Detail):</strong> Have I copied a single, direct, and highly specific quote?',
      '<strong>Box 2 (Question):</strong> Is my question tightly focused on the detail in Box 1?',
      '<strong>Box 3 (Source Type):</strong> Have I suggested a highly specific, contemporary primary source? (e.g. RAMC medical diaries)',
      '<strong>Box 4 (How it Helps):</strong> Have I explained exactly what information my suggested source would contain?'
    ]
  )}
</div>
`;

export const sectionBGuide = `
<div class="exam-guide-section" style="margin-bottom: 60px;">
  ${buildHeader('Section B: Thematic Study (Medicine in Britain)', 'fa-book-medical', '#047857')}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section tests your understanding of change, continuity, and causation across 800 years of British medicine.</em></p>

  ${buildCard(
    'Question 3: Explain One Similarity or Difference...',
    '4 Marks', '5 mins',
    'AO2 (Analyse similarity and difference across historical periods)',
    'The Symmetrical Splicing Method',
    '<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Comparative Thesis]</div><i class="fa-solid fa-link" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Era 1: Context]</div><i class="fa-solid fa-scale-balanced" style="color: #38bdf8;"></i><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Era 2: Matching Context]</div></div>',
    [
      '<strong>The "Two-Story" Essay:</strong> Writing a block of facts about the first era, followed by a separate block about the second era without linking them is capped at 2 marks.',
      '<strong>Concept Slippage:</strong> If the question asks about prevention, do not write about treatment.',
      '<strong>Chronological Blunders:</strong> Placing key developments in the wrong century.'
    ],
    [
      '<strong>Immediate Comparison:</strong> Does my very first sentence make a direct comparison using a comparative connective?',
      '<strong>Symmetrical Alignment:</strong> Do the details I provide for Era 2 directly match the theme of Era 1?',
      '<strong>Single-Paragraph Splicing:</strong> Is my answer written as a single, cohesive paragraph?'
    ]
  )}

  ${buildCard(
    'Question 4: Explain Why... (Causation)',
    '12 Marks', '15-18 mins',
    'AO2 (Analyse causation) and AO1 (Demonstrate precise knowledge)',
    'The Three-Causal-Pillars Layout',
    '<div style="display: flex; flex-direction: column; gap: 8px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;"><div style="color: #94a3b8; font-style: italic;"><i class="fa-solid fa-ban"></i> No Introduction</div><div style="display: flex; gap: 10px; margin: 10px 0;"><div style="flex: 1; background: rgba(56, 189, 248, 0.2); border: 1px solid rgba(56, 189, 248, 0.4); text-align: center; padding: 10px; border-radius: 6px;">Para 1<br><small>Stimulus A</small></div><div style="flex: 1; background: rgba(56, 189, 248, 0.2); border: 1px solid rgba(56, 189, 248, 0.4); text-align: center; padding: 10px; border-radius: 6px;">Para 2<br><small>Stimulus B</small></div><div style="flex: 1; background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); text-align: center; padding: 10px; border-radius: 6px;">Para 3<br><small>Own Knowledge</small></div></div><div style="color: #94a3b8; font-style: italic;"><i class="fa-solid fa-ban"></i> No Conclusion</div></div>',
    [
      '<strong>The Stimulus Cap:</strong> Failing to introduce an independent third factor from your own knowledge caps your mark at 8/12.',
      '<strong>The Narrative Biography Trap:</strong> Writing a chronological story instead of explaining <em>why</em> their work led to rapid progress.'
    ],
    [
      '<strong>The Rule of Three:</strong> Have I structured my answer into exactly three separate paragraphs?',
      '<strong>Causal Topic Openers:</strong> Does the first sentence of each paragraph state a clear, analytical cause?',
      '<strong>Double Causal Connectives:</strong> Have I used the Edexcel Connective Chain ("Consequently...", "This meant that...") at least twice per paragraph?'
    ]
  )}

  ${buildCard(
    'Question 5 & 6: Evaluative Essay',
    '16+4 Marks', '25-30 mins',
    'AO2 (Evaluate significance/change) and AO1 (Wide-ranging knowledge)',
    'The Grade 9 Judgment Arc',
    '<div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; flex-wrap: wrap; gap: 15px;"><div style="text-align: center;"><div style="background: #3b82f6; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-bottom: 8px; font-weight: bold;">1</div><br>Intro<br><small style="color:#94a3b8">(Thesis & Criteria)</small></div><i class="fa-solid fa-chevron-right" style="color: #475569;"></i><div style="text-align: center;"><div style="background: #3b82f6; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-bottom: 8px; font-weight: bold;">2</div><br>FOR<br><small style="color:#94a3b8">(Given Factor)</small></div><i class="fa-solid fa-chevron-right" style="color: #475569;"></i><div style="text-align: center;"><div style="background: #10b981; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-bottom: 8px; font-weight: bold;">3</div><br>AGAINST<br><small style="color:#94a3b8">(Own Knowledge)</small></div><i class="fa-solid fa-chevron-right" style="color: #475569;"></i><div style="text-align: center;"><div style="background: #8b5cf6; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin-bottom: 8px; font-weight: bold;">4</div><br>Conclusion<br><small style="color:#94a3b8">(Apply Criteria)</small></div></div>',
    [
      '<strong>The One-Sided Argument:</strong> Failing to analyze alternative factors traps your essay at Level 2 (8 marks).',
      '<strong>"Fencing" Conclusions:</strong> Reaching a conclusion that simply states both sides were equally important.',
      '<strong>Concept Slippage:</strong> Treating "care" and "treatment" as identical.'
    ],
    [
      '<strong>Explicit Evaluation Criteria:</strong> Have I defined the historical criteria I will use to measure the statement?',
      '<strong>The Argument AGAINST:</strong> Have I evaluated alternative factors using my own knowledge?',
      '<strong>Substantiated Verdict:</strong> Have I explicitly applied the criteria established in my intro to justify which factor was most significant?',
      '<strong>SPaG:</strong> Have I capitalized proper nouns and correctly spelled specialist terms?'
    ]
  )}
</div>
`;

export const middleEastGuide = `
<div class="exam-guide-section" style="margin-bottom: 60px;">
  <div style="display: flex; align-items: center; margin-bottom: 25px; border-bottom: 3px solid #b91c1c; padding-bottom: 10px;">
    <div style="background: #b91c1c; color: white; width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-right: 15px; box-shadow: 0 4px 10px #b91c1c40;">
      <i class="fa-solid fa-globe"></i>
    </div>
    <h2 style="color: #b91c1c; font-family: 'Outfit', sans-serif; font-size: 1.9rem; font-weight: 700; margin: 0;">Period Study: Conflict in the Middle East</h2>
  </div>
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section is a fast-paced assessment of your historical knowledge and analytical skills. You have exactly <strong>50 minutes</strong> to complete this section, which is worth <strong>32 marks</strong> in total.</em></p>

  <div class="exam-guide-topic" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); padding: 30px; margin-bottom: 35px; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 20px -5px rgba(0, 0, 0, 0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.05)';">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">
      <h3 style="color: #0f172a; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; margin: 0;">Q1(a) & 1(b): Explain One Consequence</h3>
      <div style="display: flex; gap: 10px;">
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-star" style="color: #eab308;"></i> 4 Marks</span>
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-regular fa-clock" style="color: #3b82f6;"></i> 5 mins</span>
      </div>
    </div>
    
    <div style="background: #f8fafc; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin-bottom: 25px;">
      <span style="display: block; font-size: 0.85rem; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px;">Target Objective</span>
      <span style="color: #334155; font-weight: 500; font-size: 1.05rem;">AO1/AO2 (Knowledge & Analysis of Consequence)</span>
    </div>
    
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #f8fafc; padding: 25px; border-radius: 10px; margin: 30px 0; font-family: 'Fira Code', monospace; position: relative; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
      <div style="position: absolute; top: -10px; right: -10px; color: rgba(255,255,255,0.03); font-size: 6rem;"><i class="fa-solid fa-code"></i></div>
      <strong style="color: #38bdf8; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 15px;"><i class="fa-solid fa-bolt" style="color: #fbbf24; margin-right: 8px;"></i> The 3-Step PEE Formula</strong>
      <div style="font-size: 1rem; line-height: 1.8;">
        <div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">P</span> Point: State one clear, valid consequence</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">E</span> Evidence: Provide precise, specific knowledge</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">E</span> Explanation: Use causal language (e.g., "This directly resulted in...")</div></div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
      <div style="background: #fff5f5; border: 1px solid #fecaca; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #dc2626; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-triangle-exclamation" style="margin-right: 10px; font-size: 1.2rem;"></i> Examiner Red Flags</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #991b1b; line-height: 1.6;">
          <li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Describing what happened <em>after</em> the event instead of what happened <em>as a direct result</em>.</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Listing multiple consequences instead of focusing on one.</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Repeating the same consequence across 1(a) and 1(b).</span></li>
        </ul>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #16a34a; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-check-double" style="margin-right: 10px; font-size: 1.2rem;"></i> Grade 9 Checklist</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #166534; line-height: 1.6;">
          <li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Is this exactly one highly focused paragraph?</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Did I include precise names, dates, or figures as evidence?</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Are there explicit causal connectives linking the evidence to the consequence?</span></li>
        </ul>
      </div>
    </div>
  </div>


  <div class="exam-guide-topic" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); padding: 30px; margin-bottom: 35px; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 20px -5px rgba(0, 0, 0, 0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.05)';">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">
      <h3 style="color: #0f172a; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; margin: 0;">Q2: Analytical Narrative</h3>
      <div style="display: flex; gap: 10px;">
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-star" style="color: #eab308;"></i> 8 Marks</span>
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-regular fa-clock" style="color: #3b82f6;"></i> 15 mins</span>
      </div>
    </div>
    
    <div style="background: #f8fafc; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin-bottom: 25px;">
      <span style="display: block; font-size: 0.85rem; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px;">Target Objective</span>
      <span style="color: #334155; font-weight: 500; font-size: 1.05rem;">AO1/AO2 (Knowledge & Sequence/Causation)</span>
    </div>
    
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #f8fafc; padding: 25px; border-radius: 10px; margin: 30px 0; font-family: 'Fira Code', monospace; position: relative; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
      <div style="position: absolute; top: -10px; right: -10px; color: rgba(255,255,255,0.03); font-size: 6rem;"><i class="fa-solid fa-code"></i></div>
      <strong style="color: #38bdf8; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 15px;"><i class="fa-solid fa-bolt" style="color: #fbbf24; margin-right: 8px;"></i> Chronological Linkage Chain</strong>
      <div style="font-size: 1rem; line-height: 1.8;">
        <div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 1</span> The Beginning: Earliest event</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 2</span> The Middle: Causal link to event 2</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 3</span> The End: Culminating outcome</div></div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
      <div style="background: #fff5f5; border: 1px solid #fecaca; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #dc2626; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-triangle-exclamation" style="margin-right: 10px; font-size: 1.2rem;"></i> Examiner Red Flags</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #991b1b; line-height: 1.6;">
          <li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Failing to introduce an independent development (only using stimulus points).</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Writing a descriptive story without explaining how one event led to the next.</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Jumping back and forth chronologically.</span></li>
        </ul>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #16a34a; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-check-double" style="margin-right: 10px; font-size: 1.2rem;"></i> Grade 9 Checklist</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #166534; line-height: 1.6;">
          <li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Are there exactly three connected paragraphs?</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Does every paragraph open with an explicit causal connective?</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Have I included at least one major development from my own knowledge?</span></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="exam-guide-topic" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); padding: 30px; margin-bottom: 35px; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 20px -5px rgba(0, 0, 0, 0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.05)';">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">
      <h3 style="color: #0f172a; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; margin: 0;">Q3: Explain the Importance</h3>
      <div style="display: flex; gap: 10px;">
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-star" style="color: #eab308;"></i> 16 Marks (2x8)</span>
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-regular fa-clock" style="color: #3b82f6;"></i> 25 mins</span>
      </div>
    </div>
    
    <div style="background: #f8fafc; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin-bottom: 25px;">
      <span style="display: block; font-size: 0.85rem; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px;">Target Objective</span>
      <span style="color: #334155; font-weight: 500; font-size: 1.05rem;">AO1/AO2 (Knowledge & Analysis of Significance)</span>
    </div>
    
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #f8fafc; padding: 25px; border-radius: 10px; margin: 30px 0; font-family: 'Fira Code', monospace; position: relative; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
      <div style="position: absolute; top: -10px; right: -10px; color: rgba(255,255,255,0.03); font-size: 6rem;"><i class="fa-solid fa-code"></i></div>
      <strong style="color: #38bdf8; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 15px;"><i class="fa-solid fa-bolt" style="color: #fbbf24; margin-right: 8px;"></i> The "X Linked to Y" Model</strong>
      <div style="font-size: 1rem; line-height: 1.8;">
        <div style="display: flex; flex-direction: column; gap: 12px;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 1</span> Short-Term/Immediate Importance</div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px; display: flex; align-items: center;"><span style="color: #fbbf24; font-weight: bold; margin-right: 15px;">Para 2</span> Long-Term/Strategic Importance</div></div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
      <div style="background: #fff5f5; border: 1px solid #fecaca; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #dc2626; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-triangle-exclamation" style="margin-right: 10px; font-size: 1.2rem;"></i> Examiner Red Flags</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #991b1b; line-height: 1.6;">
          <li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Describing what the event/person did without explaining <em>why</em> it was important.</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-solid fa-xmark" style="color: #ef4444; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Not explicitly answering "what difference did this make?".</span></li>
        </ul>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h4 style="color: #16a34a; font-size: 1.1rem; margin-top: 0; margin-bottom: 15px; display: flex; align-items: center; font-family: 'Outfit', sans-serif;"><i class="fa-solid fa-check-double" style="margin-right: 10px; font-size: 1.2rem;"></i> Grade 9 Checklist</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem; color: #166534; line-height: 1.6;">
          <li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Did I write exactly two analytical paragraphs for each of the two topics?</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Did I include analytical language like "This was highly important for X because..."?</span></li>
<li style="margin-bottom: 12px; display: flex; align-items: flex-start;"><i class="fa-regular fa-square-check" style="color: #22c55e; margin-top: 4px; margin-right: 10px; flex-shrink: 0;"></i> <span>Does my second paragraph end with a strong summary statement about long-term significance?</span></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="exam-guide-topic" style="background: #f8fafc; border: 2px dashed #94a3b8; border-radius: 12px; padding: 30px; margin-bottom: 35px;">
    <h3 style="color: #334155; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; margin-top: 0; margin-bottom: 20px;"><i class="fa-solid fa-lightbulb" style="color: #eab308; margin-right: 10px;"></i> Top Tips & Common Pitfalls for the Middle East</h3>
    <ul style="list-style: none; padding: 0; margin: 0; font-size: 1rem; color: #475569; line-height: 1.8;">
      <li style="margin-bottom: 15px;"><strong style="color: #0f172a;">Own the Timeline:</strong> Memorize the exact years of key conflicts to ensure you stay within the precise date range of narrative or importance questions.</li>
      <li style="margin-bottom: 15px;"><strong style="color: #0f172a;">Master the Cold War Proxy Context:</strong> Show the examiner you understand the international dimension. Explain how the US and Soviet Union provided weapons, funding, or diplomatic pressure to advance their interests.</li>
      <li style="margin-bottom: 15px;"><strong style="color: #0f172a;">Use Precise Tier-3 Terminology:</strong> Weave specific historical terms into your explanations (e.g., Mandate, Fedayeen, Intifada, Shuttle Diplomacy, Sovereignty).</li>
      <li style="margin-bottom: 15px;"><strong style="color: #b91c1c;">The "Nasser vs. Sadat" Confusion:</strong> Do not confuse these two Egyptian presidents. Nasser (1954-1970) is key to Suez and the Six-Day War. Sadat (1970-1981) is key to the Yom Kippur War and Camp David.</li>
    </ul>
  </div>
</div>
`;

export const weimarGuide = `
<div class="exam-guide-section" style="margin-bottom: 60px;">
  ${buildHeader('Paper 3: Modern Depth Study (Weimar and Nazi Germany, 1918-39)', 'fa-landmark', '#0f172a')}
  <p style="font-size: 1.15rem; color: #475569; margin-bottom: 35px; line-height: 1.6; padding: 15px 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #cbd5e1;"><em>This section assesses your knowledge of Germany from 1918 to 1939 and your ability to evaluate sources and interpretations. You have <strong>1 hour 30 minutes</strong> to complete this section, which is worth 30% of your total GCSE.</em></p>

  ${buildCard(
    'Question 1: Give Two Things You Can Infer...',
    '4 Marks', '5-7 mins',
    'AO3 (Analyse sources to make inferences)',
    'The Inference Double-Punch',
    '<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Make an inference]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Quote the detail that proves it]</div></div>',
    [
      '<strong>Paraphrasing the Source:</strong> Just repeating what the source says without reading between the lines gets 0 marks for inference.',
      '<strong>Missing Quotes:</strong> Failing to provide a specific physical detail from the source to back up the inference.'
    ],
    [
      '<strong>Two Distinct Inferences:</strong> Have I made two completely different inferences?',
      '<strong>Direct Quotes:</strong> Have I included a specific quote or visual detail to support each inference?'
    ]
  )}

  ${buildCard(
    'Question 2: Explain Why...',
    '12 Marks', '20 mins',
    'AO1 (Knowledge & Understanding) and AO2 (Analysis of Causation)',
    'The 3-Aspect Causation Framework',
    '<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Introduce Cause]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Deploy Precise Detail]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Link with Causation Connective: "As a result..."]</div></div>',
    [
      '<strong>The Stimulus Ceiling (Max 8 Marks):</strong> Relying only on the two provided bullet points. You must introduce at least one distinct factor of your own knowledge to address three aspects of content and unlock Level 4.',
      '<strong>Descriptive/Narrative Drift:</strong> Describing what happened rather than explaining how or why the event directly caused the outcome.',
      '<strong>Prioritisation Waste:</strong> Trying to rank, balance, or link the causes in a conclusion. This question does not assess evaluation, so you get zero reward for doing so.'
    ],
    [
      '<strong>Three Aspects of Content:</strong> Have I written three well-developed paragraphs covering three distinct aspects of the topic?',
      '<strong>Causation Connectives:</strong> Does every paragraph end with an analytical link showing exactly how the cause led to the outcome?'
    ]
  )}

  ${buildCard(
    'Question 3(a): Evaluating Source Utility',
    '8 Marks', '15 mins',
    'AO3 (Analyse and evaluate source utility)',
    'The Utility Trio (Content + Provenance + Context)',
    '<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Analyse Source Content]</div><div style="color: #38bdf8;"><i class="fa-solid fa-plus"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[NOP: Nature/Origin/Purpose]</div><div style="color: #38bdf8;"><i class="fa-solid fa-plus"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Contextual Knowledge validation]</div></div>',
    [
      '<strong>Generic NOP:</strong> Stating basic comments like "it is biased because it is propaganda" or "it is a photograph so it is a snapshot." You must link specific provenance details directly to its utility.',
      '<strong>Missing Own Knowledge:</strong> Relying solely on source text analysis. Without deploying precise historical knowledge to validate or challenge the source, you are capped at Level 2 (max 5 marks).',
      '<strong>The Comparison Trap:</strong> Attempting to compare the sources or state which is more useful. There are no comparison marks—evaluate each source on its own merit.',
      '<strong>Focusing on What is Missing:</strong> Writing about what the source does not mention rather than evaluating the utility of what is actually there.'
    ],
    [
      '<strong>Both Sources Evaluated:</strong> Have I written equal-weight paragraphs for both Source B and Source C?',
      '<strong>Qualitative Contextual Knowledge:</strong> Have I used my own knowledge of Weimar/Nazi Germany to confirm, supplement, or challenge what the sources reveal?'
    ]
  )}

  ${buildCard(
    'Question 3(b): Identifying Differences',
    '4 Marks', '5-7 mins',
    'AO4 (Analyse interpretations to identify differences)',
    'The Interpretations Contrast',
    '<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[State overall view of Interpretation 1]</div><div style="color: #38bdf8;"><i class="fa-solid fa-code-compare"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[State contrasting view of Interpretation 2]</div></div>',
    [
      '<strong>Surface Details Only:</strong> Spotting minor differences in vocabulary or specific facts rather than identifying the fundamental, overall difference in the historians’ arguments (caps at Level 1, max 2 marks).',
      '<strong>Unsupported Assertions:</strong> Stating the overall difference but failing to back it up with direct quotes or clear paraphrased details from both interpretations.'
    ],
    [
      '<strong>Core Disagreement Identified:</strong> Did I identify the overall difference in view (e.g., economic vs. political, or positive vs. negative impact)?',
      '<strong>Evidence from Both:</strong> Have I quoted or referenced specific details from both Interpretation 1 and Interpretation 2?'
    ]
  )}

  ${buildCard(
    'Question 3(c): Explaining Reasons for Difference',
    '4 Marks', '5-7 mins',
    'AO4 (Analyse why interpretations differ)',
    'The Source-Weighting Explanation',
    '<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[State: Historians gave weight to different sources]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Link Int 1 to Source B details]</div><div style="color: #38bdf8;"><i class="fa-solid fa-and"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Link Int 2 to Source C details]</div></div>',
    [
      '<strong>Speculating on Historian Backgrounds:</strong> Attributing the difference to the date, title, or the nationality/bias of the authors. This is a primary source skill and gets 0 marks here as secondary work provenance is not assessed.',
      '<strong>Repeating the 3(b) Answer:</strong> Explaining what the difference is instead of explaining the process of how the historians arrived at different conclusions.',
      '<strong>Vague Source Linking:</strong> Mentioning that they used different sources but failing to use explicit details from both the sources and the interpretations to substantiate the claim.'
    ],
    [
      '<strong>Dual-Linking:</strong> Have I explicitly linked details from Interpretation 1 to Source B, and details from Interpretation 2 to Source C?',
      '<strong>Clear Analytical Reason:</strong> Did I start by stating a valid reason, such as the use of different primary evidence or a different thematic focus?'
    ]
  )}

  ${buildCard(
    'Question 3(d): Evaluating an Interpretation',
    '16 Marks + 4 SPaG', '30-35 mins',
    'AO4 (Analyse and evaluate interpretations)',
    'The Balanced Evaluation Scale',
    '<div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;"><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Analyse & Support Int 2 with Context]</div><div style="color: #38bdf8;"><i class="fa-solid fa-scale-balanced"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Challenge with Int 1 & Context]</div><div style="color: #38bdf8;"><i class="fa-solid fa-arrow-right-long"></i></div><div style="background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 6px;">[Sustained, reasoned judgement]</div></div>',
    [
      '<strong>The Straight Essay:</strong> Writing a general essay on the topic using only your own knowledge. You must evaluate the interpretations themselves; otherwise, you are capped at Level 2.',
      '<strong>Single-Interpretation Bias:</strong> Only evaluating Interpretation 2 and ignoring Interpretation 1. Failing to mention the alternative view automatically restricts the analysis strand to Level 1, capping the total mark at 9-10/16.',
      '<strong>The "Somewhat Agree" Fence-Sit:</strong> Simply listing pros and cons without a clear, reasoned criterion that leads to a robust, justified overall judgement.'
    ],
    [
      '<strong>How the View is Conveyed:</strong> Have I indicated how the historians’ views are conveyed (e.g., through their choice of tone, loaded language, emphasis, or omission of details) to unlock high Level 4?',
      '<strong>Specialist Terminology (SPaG):</strong> Have I used precise key terms (e.g., <em>Dolchstoss</em>, <em>Gleichschaltung</em>, <em>putsch</em>, <em>Diktat</em>, <em>Article 48</em>) to secure the 4 SPaG marks?'
    ]
  )}
</div>
`;
