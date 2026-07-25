
const buildHeader = (title, icon, color) => `
  <div style="display: flex; align-items: center; margin-bottom: 25px; border-bottom: 3px solid ${color}; padding-bottom: 10px;">
    <div style="background: ${color}; color: white; width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-right: 15px; box-shadow: 0 4px 10px ${color}40;">
      <i class="fa-solid ${icon}"></i>
    </div>
    <h2 style="color: ${color}; font-family: 'Outfit', sans-serif; font-size: 1.9rem; font-weight: 700; margin: 0;">${title}</h2>
  </div>
`;

const buildCard = (title, marks, time, objective, formulaTitle, formulaContent, redFlags, checklist) => `
  <div class="exam-guide-topic" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); padding: 30px; margin-bottom: 35px; transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 20px -5px rgba(0, 0, 0, 0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.05)';">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">
      <h3 style="color: #0f172a; font-family: 'Outfit', sans-serif; font-size: 1.5rem; font-weight: 700; margin: 0;">${title}</h3>
      <div style="display: flex; gap: 10px;">
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-star" style="color: #eab308;"></i> ${marks}</span>
        <span style="background: #f1f5f9; color: #475569; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px;"><i class="fa-regular fa-clock" style="color: #3b82f6;"></i> ${time}</span>
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
