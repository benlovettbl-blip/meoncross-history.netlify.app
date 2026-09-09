export function getStructureStrip(questionObj, marks, unitId = '') {
  const qText =
    (questionObj && (questionObj.question || questionObj.question_text || questionObj.text)) || '';
  const qType = (questionObj && (questionObj.type || '')).toLowerCase();
  const qNum = (questionObj && (questionObj.q_number || questionObj.number || '')).toUpperCase();

  // 1. Feature Question (2 Marks in Paper 1 Western Front Q1a/Q1b & Paper 2 Early Elizabethan England Q1a/Q1b)
  if (
    marks === 2 ||
    qType.includes('feature') ||
    /describe (?:one|two) feature/i.test(qText) ||
    ((qNum.startsWith('Q1(A)') || qNum.startsWith('Q1(B)')) &&
      (unitId === 'edexcel_medicine' || unitId === 'eee'))
  ) {
    return `<strong>2-Mark Feature Structure Strip:</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 1 Section A (Western Front) &amp; Paper 2 (Early Elizabethan England) specification format: 2 marks per feature question.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Feature Identification [1 Mark]:</strong> State one valid historical characteristic or feature clearly and accurately.</li>
  <li><strong>Supporting Detail [1 Mark]:</strong> Add specific factual evidence or contextual knowledge to develop the feature (e.g. measurements, medical procedures, equipment names, locations, dates, legislation).</li>
</ul>`;
  }

  // 2. Follow-Up Enquiry Question (4 Marks in Paper 1 Section A Western Front Q2b)
  if (
    qType.includes('follow') ||
    /follow up|how could you follow up/i.test(qText) ||
    (qNum.includes('2(B)') && unitId === 'edexcel_medicine')
  ) {
    return `<strong>4-Mark Follow-Up Enquiry Structure Strip (Edexcel Paper 1 Section A Q2b):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 1 (Western Front) Historic Environment 4-step enquiry method.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Detail in Source to Follow Up [1 Mark]:</strong> Select and quote or describe one specific historical detail from the source directly linked to the enquiry.</li>
  <li><strong>Question to Ask [1 Mark]:</strong> Pose a focused, precise historical question directly arising from that detail (not a vague or unrelated question).</li>
  <li><strong>Type of Source to Search [1 Mark]:</strong> Name a realistic, authentic contemporary primary record (e.g. RAMC war diary, casualty clearing station admission register, medical officer report, trench logbook). <em>Avoid general answers like 'the internet' or 'a history book'.</em></li>
  <li><strong>How this Source Would Help [1 Mark]:</strong> Explain specifically how the information in that named source would answer your question and deepen understanding of the enquiry.</li>
</ul>`;
  }

  // 3. Source Inference Question (4 Marks in Paper 3 Modern Depth Study Q1: Weimar & Nazi Germany / USA)
  if (
    qType.includes('inference') ||
    /give two things you can infer|infer from source/i.test(qText) ||
    ((qNum === 'Q1' || qNum === 'Q01') && (unitId === 'weimar_nazi_germany' || unitId === 'usa'))
  ) {
    return `<strong>4-Mark Source Inference Structure Strip (Edexcel Paper 3 Q1):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 3 (Weimar &amp; Nazi Germany / USA) Question 1 specification format: 4 marks for two inferences from contemporary Source A.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Inference 1 [2 Marks]:</strong> State what you can infer / work out from Source A [1 mark] + support with a direct quote or specific detail from the source [1 mark].</li>
  <li><strong>Inference 2 [2 Marks]:</strong> State a second distinct inference from Source A [1 mark] + support with a different direct quote or detail [1 mark].</li>
</ul>`;
  }

  // 4. Interpretation Difference Question (4 Marks in Paper 3 Modern Depth Study Q3b)
  if (
    qType.includes('interpretation-difference') ||
    qType.includes('interp_diff') ||
    /main difference between these views|difference between the views/i.test(qText) ||
    qNum.includes('3(B)')
  ) {
    return `<strong>4-Mark Interpretation Difference Structure Strip (Edexcel Paper 3 Q3b):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 3 (Modern Depth Study) Question 3(b) specification format.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Identify Main Difference [1–2 Marks]:</strong> Clearly state the overall contrasting viewpoints or emphasis of the two interpretations (e.g. Interpretation 1 portrays the development as popular/successful, whereas Interpretation 2 stresses repression/failure).</li>
  <li><strong>Evidence from Both Interpretations [3–4 Marks]:</strong> Quote or closely paraphrase specific evidence from Interpretation 1 [1m] and directly contrast it with specific evidence from Interpretation 2 [1m] to prove the difference.</li>
</ul>`;
  }

  // 5. Why Interpretations Differ Question (4 Marks in Paper 3 Modern Depth Study Q3c)
  if (
    qType.includes('interpretation-why') ||
    qType.includes('interp_why') ||
    /suggest (?:one )?reason why interpretations|reason why interpretations/i.test(qText) ||
    qNum.includes('3(C)')
  ) {
    return `<strong>4-Mark Why Interpretations Differ Structure Strip (Edexcel Paper 3 Q3c):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 3 (Modern Depth Study) Question 3(c) specification format.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Identify Valid Reason [1–2 Marks]:</strong> State one valid reason why the two historians arrived at different conclusions (e.g. they relied on different contemporary sources such as Source B vs Source C, or investigated different groups/regions/timeframes, or had different areas of historical emphasis).</li>
  <li><strong>Support with Context &amp; Sources [3–4 Marks]:</strong> Explain how this reason created the difference, linking directly to details in the interpretations and/or supporting Sources B and C.</li>
</ul>`;
  }

  // 6. 16-Mark Evaluative Interpretation Essay (+4 SPaG) (Paper 3 Modern Depth Study Q3d)
  if (
    marks === 16 &&
    (qType.includes('interpretation') || /interpretation 2/i.test(qText) || qNum.includes('3(D)'))
  ) {
    return `<strong>16-Mark Interpretation Evaluation Essay Structure Strip (Edexcel Paper 3 Q3d + 4 SPaG):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 3 (Modern Depth Study) Question 3(d): Evaluative essay evaluating Interpretation 2 using both interpretations and historical context.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Introduction:</strong> State the view given in Interpretation 2, contrast with Interpretation 1, and define your criteria for judging 'how far' you agree.</li>
  <li><strong>Paragraph 1 (Support Interpretation 2):</strong> Detail the view in Interpretation 2 &bull; Quote specific phrasing &bull; Support with detailed own historical knowledge confirming this viewpoint.</li>
  <li><strong>Paragraph 2 (Challenge Interpretation 2 / Support Interpretation 1):</strong> Detail the alternative view from Interpretation 1 &bull; Quote specific phrasing &bull; Support with own historical knowledge showing why this alternative perspective is valid.</li>
  <li><strong>Paragraph 3 (Weighing Historical Context):</strong> Assess the strength of both arguments using in-depth context (was one interpretation looking at short-term vs long-term, or different social groups?).</li>
  <li><strong>Conclusion &amp; Judgement:</strong> Provide a sustained, substantiated judgement explaining <em>which interpretation is more convincing</em> overall and why.</li>
</ul>`;
  }

  // 7. Consequence (4 Marks in Paper 2 Conflict in the Middle East)
  if (
    qType.includes('consequence') ||
    /explain (?:one|two) consequence/i.test(qText) ||
    ((qNum.includes('1(A)') || qNum.includes('1(B)')) && unitId === 'cme_new')
  ) {
    return `<strong>4-Mark Consequence Question Structure Strip:</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 2 specification format: Single direct consequence with detailed historical causation.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Identify &amp; State [1–2 Marks]:</strong> State one clear, historically accurate consequence directly resulting from the event. Name specific individuals, organizations, dates, or territories.</li>
  <li><strong>Explain with Evidence &amp; Causation [3–4 Marks]:</strong> Provide precise historical context and explain <em>how and why</em> this consequence occurred. Use explicit causal connectives (e.g. <em>'As a direct result...', 'This provoked...', 'Consequently...'</em>) to show the escalation or lasting impact.</li>
</ul>`;
  }

  // 8. Similarity / Difference Question (4 Marks in Paper 1 Section B Q3)
  if (
    qType.includes('similarity') ||
    (marks === 4 && (qType.includes('difference') || /similar|difference/i.test(qText))) ||
    (qNum === 'Q3' && unitId === 'edexcel_medicine')
  ) {
    return `<strong>4-Mark Similarity / Difference Structure Strip (Edexcel Paper 1 Section B Q3):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 1 Section B thematic comparison across time periods.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Identify Comparison [1–2 Marks]:</strong> State clearly one valid way in which the two periods/topics were similar or different.</li>
  <li><strong>Support with Evidence from Both Periods [3–4 Marks]:</strong> Provide specific, accurate historical knowledge from <em>both</em> periods to explain and justify the comparison.</li>
</ul>`;
  }

  // 9. Narrative Account (8 Marks in Paper 2 Q2)
  if (
    qType.includes('narrative') ||
    /narrative account/i.test(qText) ||
    (qNum === 'Q2' && unitId === 'cme_new')
  ) {
    return `<strong>8-Mark Narrative Account Structure Strip (Chronological &amp; Causal Flow):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 2 Period Study question format.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Beginning / Catalyst [2–3 Marks]:</strong> Establish the initial situation or starting cause with precise factual detail in correct chronological order.</li>
  <li><strong>Development / Turning Point [4–6 Marks]:</strong> Explain how events unfolded and transitioned, linking causes and effects using explicit connectives (<em>'This led to...', 'As a consequence of this reaction...'</em>).</li>
  <li><strong>Outcome / Resolution [7–8 Marks]:</strong> Explain the final consequence or situation reached at the end of the timeframe.</li>
  <li><strong>Mandatory Own Knowledge:</strong> Include accurate historical detail that goes beyond the two provided stimulus bullet points.</li>
</ul>`;
  }

  // 10. Importance Question (8 Marks in Paper 2 Q3)
  if (
    qType.includes('importance') ||
    /importance of/i.test(qText) ||
    ((qNum.includes('3(A)') || qNum.includes('3(B)')) && unitId === 'cme_new')
  ) {
    return `<strong>8-Mark Importance Question Structure Strip:</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 2 Period Study question format.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Reason 1 [4 Marks]:</strong> Identify a clear reason why the factor was significant + provide detailed contextual evidence + explain its specific impact on the specified issue.</li>
  <li><strong>Reason 2 [4 Marks]:</strong> Identify a second distinct reason why it was important + provide independent contextual knowledge + explain the broader or long-term consequence.</li>
</ul>`;
  }

  // 11. Source Utility Question (8 Marks in Paper 1 Q2a & Paper 3 Q3a)
  if (
    qType.includes('utility') ||
    qType.includes('how-useful') ||
    /how useful/i.test(qText) ||
    (marks === 8 && (qNum.includes('2(A)') || qNum.includes('3(A)')))
  ) {
    return `<strong>8-Mark Source Utility Structure Strip (Edexcel Paper 1 Q2a &amp; Paper 3 Q3a):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Assessing two contemporary sources for a specific historical enquiry using content, contextual knowledge, and provenance (Nature, Origin, Purpose).</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Source 1 Evaluation [4 Marks]:</strong> Assess content &amp; accuracy against own historical knowledge [2m] + evaluate Nature, Origin, Purpose (NOP) to explain usefulness/limitations for this specific enquiry [2m].</li>
  <li><strong>Source 2 Evaluation [4 Marks]:</strong> Assess content &amp; accuracy against own historical knowledge [2m] + evaluate Nature, Origin, Purpose (NOP) to explain usefulness/limitations for this specific enquiry [2m].</li>
  <li><strong>Judgement on Enquiry:</strong> Synthesise how the two sources complement each other for the specific historical enquiry.</li>
</ul>`;
  }

  // 12. 12-Mark 'Explain Why' Question (Causation)
  if (
    marks === 12 ||
    qType.includes('explain_why') ||
    qType.includes('causation') ||
    /explain why/i.test(qText)
  ) {
    return `<strong>12-Mark 'Explain Why' Structure Strip (PEEL):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 1 Q4, Paper 2 Q2 (Elizabeth), and Paper 3 Q2 causation question format.</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Cause 1 (Stimulus Point 1):</strong> Clear reason identified &bull; Specific dates/names &bull; Explain <em>how/why</em> this led to the outcome.</li>
  <li><strong>Cause 2 (Stimulus Point 2):</strong> Second cause &bull; Detailed supporting facts &bull; Explain relative importance.</li>
  <li><strong>Cause 3 (Own Knowledge — Mandatory!):</strong> Distinct cause not in stimulus &bull; Precise evidence &bull; Analytical link.</li>
  <li><strong>Synthesis Link:</strong> Explain how these causes interacted (e.g. underlying catalyst vs immediate trigger).</li>
</ul>`;
  }

  // 13. 16-Mark Essay Question (+4 SPaG)
  if (
    marks === 16 ||
    qType.includes('essay') ||
    qType.includes('judgement-essay') ||
    /how far do you agree|statement/i.test(qText)
  ) {
    return `<strong>16-Mark Essay Structure Strip (PEEL):</strong>
<div style="font-size: 0.9rem; margin-top: 4px; color: #475569; font-style: italic;">Edexcel Paper 1 Q5/6 and Paper 2 Q3 (Elizabeth) 16-mark evaluative essay format (+4 SPaG).</div>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Introduction:</strong> Define key concepts, outline criteria for evaluation, and state your provisional thesis.</li>
  <li><strong>Paragraph 1 (Stimulus Point 1):</strong> Point &bull; Precise contextual evidence &bull; Explain significance &bull; Link to thesis.</li>
  <li><strong>Paragraph 2 (Stimulus Point 2):</strong> Point &bull; Precise contextual evidence &bull; Direct comparison with paragraph 1.</li>
  <li><strong>Paragraph 3 (Own Knowledge Factor — Mandatory!):</strong> Point from outside the stimulus &bull; In-depth evidence &bull; Evaluative weight.</li>
  <li><strong>Conclusion:</strong> Sustained judgement directly answering 'How far do you agree?'. Explain relative weight of factors.</li>
</ul>`;
  }

  // Fallbacks by tariff
  if (marks === 4) {
    return `<strong>4-Mark Question Structure Strip:</strong>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Point 1 [2 Marks]:</strong> State first key point clearly + add specific supporting detail.</li>
  <li><strong>Point 2 [2 Marks]:</strong> State second key point clearly + add specific supporting detail.</li>
</ul>`;
  }

  if (marks === 8) {
    return `<strong>8-Mark Question Structure Strip:</strong>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li><strong>Section 1 [4 Marks]:</strong> First structured point with detailed contextual knowledge and clear analytical explanation.</li>
  <li><strong>Section 2 [4 Marks]:</strong> Second structured point with independent contextual knowledge and clear analytical explanation.</li>
</ul>`;
  }

  return `<strong>${marks}-Mark Question Structure Strip:</strong>
<ul style="padding-left: 20px; margin-top: 10px; line-height: 1.6;">
  <li>Focus directly on the question stem throughout your response.</li>
  <li>Support every analytical point with precise historical knowledge (dates, names, events).</li>
  <li>Explain the significance and impact to secure top-band marks.</li>
</ul>`;
}

export function renderExamPracticeZone(container, unitData, initialQuestion = null) {
  // 1. Flatten the exam_practice from lessons into a master list of questions
  let examBank = [];

  // Legacy support for older units (if any still exist)
  if (unitData.exam_blocks) {
    unitData.exam_blocks.forEach((block) => {
      block.questions.forEach((q) => {
        examBank.push({
          ...q,
          question: q.text || q.question, // unify
          blockTitle: block.title,
        });
      });
    });
  }

  // Modern support for 'exam_practice' within lessons
  if (unitData.lessons) {
    unitData.lessons.forEach((l) => {
      if (l.exam_practice) {
        let practices = [];
        if (Array.isArray(l.exam_practice)) {
          practices = l.exam_practice;
        } else if (l.exam_practice.questions) {
          // New structure: object with questions and stimulus
          practices = l.exam_practice.questions.map((q) => {
            return {
              ...q,
              stimulus: q.stimulus || l.exam_practice.stimulus, // inherit global stimulus if question doesn't have its own
            };
          });
        } else {
          // Single question object
          practices = [l.exam_practice];
        }

        practices.forEach((ep) => {
          let qText = ep.question || ep.text;
          if (!qText) return; // Skip if no question text
          let type = ep.type;
          if (!type) {
            if (qText.includes('12 marks')) type = '12-mark';
            else if (qText.includes('16 marks')) type = '16-mark';
            else if (
              qText.includes('2 marks') ||
              qText.includes('4 marks') ||
              qText.includes('8 marks')
            ) {
              let m = qText.match(/\((\d+) marks?\)/);
              type = m ? `${m[1]}-mark` : '4-mark';
            } else {
              type = 'Exam';
            }
          }
          let blockTitle = l.title || '';
          let ktPrefix = blockTitle.split(':')[0]; // e.g. "KT1.1"

          examBank.push({
            ...ep,
            question: qText,
            blockTitle: blockTitle,
            ktPrefix: ktPrefix,
            type: type,
          });
        });
      }
    });
  }

  let hasAnyAssessments =
    (unitData.assessments && unitData.assessments.length > 0) ||
    (unitData.lessons &&
      unitData.lessons.some((l) => (l.assessments && l.assessments.length > 0) || l.gcse_task));
  let hasMockExams = unitData.mock_exams && unitData.mock_exams.length > 0;
  if (examBank.length === 0 && !hasAnyAssessments && !hasMockExams) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px; background: #fff; border-radius: 12px; color: #64748b; font-size: 1.2rem;">
        <i class="fa-solid fa-file-circle-xmark fa-3x" style="margin-bottom:20px; color:#cbd5e1;"></i>
        <br>No assessments or exam questions found for this unit.
      </div>
    `;
    return;
  }

  // Extract unique types for the filter dropdown
  const uniqueTypes = [...new Set(examBank.map((q) => q.type).filter(Boolean))];

  const isKS3 = unitData.title && unitData.title.includes('KS3');

  if (isKS3) {
    // For KS3 units, we just list the assessments
    let assessmentsHtml = `
      <style>
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      <div class="epz-wrapper" style="max-width: 900px; margin: 0 auto; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.4); border-radius: 20px; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; position: relative;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #1e3a8a; margin-top: 0; margin-bottom: 30px;"><i class="fa-solid fa-pen-nib" style="color: #3b82f6;"></i> Unit Assessments</h2>
        <div style="display: flex; flex-direction: column; gap: 20px;">
    `;

    let ks3Assessments = [];
    if (unitData.assessments && Array.isArray(unitData.assessments)) {
      ks3Assessments.push(
        ...unitData.assessments.map((a) => ({ ...a, lessonTitle: 'End of Unit Assessment' })),
      );
    }
    if (unitData.lessons) {
      unitData.lessons.forEach((l) => {
        if (l.assessments) {
          l.assessments.forEach((a) => ks3Assessments.push({ ...a, lessonTitle: l.title }));
        } else if (l.gcse_task) {
          ks3Assessments.push({ ...l.gcse_task, lessonTitle: l.title });
        }
      });
    }

    if (ks3Assessments.length === 0) {
      assessmentsHtml += `<p style="color: #64748b; font-size: 1.1rem;">No assessments found for this unit.</p>`;
    } else {
      ks3Assessments.forEach((ass) => {
        let taskContent = ass.question || ass.text || ass.description || 'Assessment Task';
        if (ass.type === 'timeline' && ass.events) {
          taskContent +=
            `<ul style="margin-top: 15px; font-size: 1.1rem; color: #475569;">` +
            ass.events.map((e) => `<li><strong>${e.title}</strong>: ${e.detail}</li>`).join('') +
            `</ul>`;
        }
        assessmentsHtml += `
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 5px solid #3b82f6;">
            <div style="font-size: 0.9rem; font-weight: 700; color: #6366f1; text-transform: uppercase; margin-bottom: 10px;">${ass.lessonTitle}</div>
            <h3 style="margin-top: 0; color: #0f172a; font-size: 1.3rem; margin-bottom: 15px;">${ass.title && ass.lessonTitle !== 'End of Unit Assessment' ? ass.title + '<br>' : ''}${taskContent}</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${ass.hint ? `<button class="main-btn" onclick="alert('${ass.hint.replace(/'/g, "\\'")}')" style="background: #fef3c7; color: #d97706; border: 1px solid #fde68a; padding: 8px 16px; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-lightbulb"></i> Hint</button>` : ''}
              ${
                ass.model_answer
                  ? `<button class="main-btn" onclick="const a = this.nextElementSibling; a.style.display = a.style.display === 'none' ? 'block' : 'none';" style="background: #d1fae5; color: #059669; border: 1px solid #a7f3d0; padding: 8px 16px; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-star"></i> Show Model</button>
              <div style="display: none; width: 100%; margin-top: 15px; padding: 15px; background: #f0fdf4; border-left: 4px solid #10b981; color: #064e3b; border-radius: 0 8px 8px 0; white-space: pre-wrap;">${Array.isArray(ass.model_answer) ? ass.model_answer.join('\\n\\n') : ass.model_answer}</div>`
                  : ''
              }
            </div>
          </div>
        `;
      });
    }

    assessmentsHtml += `</div></div>`;
    container.innerHTML = assessmentsHtml;
    return;
  }

  // 2. Build the UI wrapper for KS4
  container.innerHTML = `
    <style>
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .epz-wrapper {
        max-width: 900px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.4);
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05);
        animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        position: relative;
        overflow: hidden;
      }
      .epz-title {
        font-family: 'Playfair Display', serif;
        font-size: 2.8rem;
        background: linear-gradient(135deg, #1e3a8a 0%, #4f46e5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        font-weight: 800;
        letter-spacing: -0.5px;
      }
      .epz-btn {
        transition: all 0.2s ease;
        transform: translateY(0);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .epz-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        filter: brightness(1.05);
      }
      .epz-btn:active {
        transform: translateY(1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .epz-select {
        transition: all 0.3s ease;
      }
      .epz-select:hover {
        border-color: #94a3b8 !important;
      }
      .epz-select:focus {
        outline: none;
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      }
      .epz-card {
        background: white;
        border-radius: 16px;
        padding: 30px;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
        border: 1px solid #f1f5f9;
        margin-top: 30px;
        position: relative;
        overflow: hidden;
      }
      .epz-card::after {
        content: '';
        position: absolute;
        top: 0; right: 0; width: 100px; height: 100px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
      }
      .epz-pill {
        padding: 8px 16px;
        border-radius: 20px;
        border: 2px solid #cbd5e1;
        background: white;
        color: #475569;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.95rem;
      }
      .epz-pill:hover {
        border-color: #3b82f6;
        color: #3b82f6;
      }
      .epz-pill.active {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }
    </style>
    
    <div class="epz-wrapper">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; gap: 20px; flex-wrap: wrap;">
        <div>
          <h1 class="epz-title"><i class="fa-solid fa-pen-nib" style="color: #3b82f6;"></i> Exam Practice Zone</h1>
          <p style="color: #64748b; font-size: 1.15rem; margin-top: 10px;">${examBank.length > 0 ? 'Select a question type or a specific past paper question to master.' : 'Download complete mock exams below.'}</p>
        </div>
        <button id="epz-back-btn" class="main-btn epz-btn" style="display: none; background: #f8fafc; color: #334155; border: 1px solid #cbd5e1; padding: 10px 20px; border-radius: 10px; font-weight: 600;"><i class="fa-solid fa-arrow-left"></i> Change Question</button>
      </div>

      <div id="epz-controls" ${examBank.length === 0 ? 'style="display:none;"' : ''}>
        <!-- Past Paper Trends & Overdue Radar Banner -->
        <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1.5px solid #bfdbfe; border-radius: 14px; padding: 14px 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #2563eb; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.05rem;">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <div style="font-weight: 800; color: #1e3a8a; font-size: 0.95rem;">2018–2026 Past Paper Matrix &amp; Overdue Topic Radar</div>
              <div style="font-size: 0.82rem; color: #1d4ed8;">Explore real exam questions, mark schemes, examiner report warnings, and syllabus gaps.</div>
            </div>
          </div>
          <button type="button" id="epz-btn-view-matrix" class="main-btn epz-btn" style="background: #1e40af; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-table-cells"></i> Open Question Matrix
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px; background: #f8fafc; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="font-weight: 700; color: #1e293b; font-size: 1.05rem; text-transform: uppercase; letter-spacing: 0.5px;">Target Question Type</label>
            <div id="epz-type-pills" style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button class="epz-pill active" data-type="all">📚 All Question Types</button>
              ${uniqueTypes.map((t) => `<button class="epz-pill" data-type="${t}">${t.charAt(0).toUpperCase() + t.slice(1)}</button>`).join('')}
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="font-weight: 700; color: #1e293b; font-size: 1.05rem; text-transform: uppercase; letter-spacing: 0.5px;">Or Select Specific Question</label>
            <select id="epz-specific-filter" class="epz-select" style="width: 100%; padding: 14px; border-radius: 10px; border: 2px solid #cbd5e1; font-size: 1.15rem; background: #ffffff; color: #1e293b; cursor: pointer;">
              <option value="random">🎲 Random Question (From Filters Above)</option>
            </select>
          </div>
          <button id="epz-generate-btn" class="main-btn epz-btn" style="background: linear-gradient(135deg, #3b82f6, #4f46e5); color: white; padding: 14px 28px; font-size: 1.15rem; flex-shrink: 0; border: none; border-radius: 10px; font-weight: 600;">
            <i class="fa-solid fa-bolt"></i> Generate Question
          </button>
        </div>
      </div>

      <div id="epz-question-display" style="display: none;" class="epz-card">
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px;">
          <div id="epz-q-meta" style="font-size: 0.95rem; font-weight: 800; color: #6366f1; text-transform: uppercase; letter-spacing: 1.5px; background: rgba(99, 102, 241, 0.1); padding: 6px 12px; border-radius: 8px;"></div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
            <div id="epz-timer-container" style="display: flex; align-items: center; gap: 12px; background: linear-gradient(135deg, #0f172a, #1e293b); color: white; padding: 10px 20px; border-radius: 25px; font-family: 'Courier New', monospace; font-size: 1.4rem; font-weight: bold; box-shadow: 0 4px 15px rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.1);">
              <i class="fa-solid fa-stopwatch" style="color: #38bdf8;"></i> <span id="epz-timer-display" style="letter-spacing: 2px;">00:00</span>
              <button id="epz-timer-toggle" style="background: rgba(255,255,255,0.1); border: none; color: white; cursor: pointer; padding: 6px 10px; border-radius: 50%; transition: background 0.2s;"><i class="fa-solid fa-play"></i></button>
            </div>
            <div id="epz-timer-presets" style="display: flex; gap: 6px; font-size: 0.75rem; flex-wrap: wrap; justify-content: flex-end;">
              <button type="button" id="epz-btn-reset-q" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 12px; padding: 2px 8px; cursor: pointer; font-weight: 600;" title="Reset timer to question marks">Question Tariff</button>
              <button type="button" id="epz-btn-add-5m" style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; border-radius: 12px; padding: 2px 8px; cursor: pointer; font-weight: 700;" title="Add 5 minutes extra time or planning time">+5m Extra</button>
              <button type="button" id="epz-btn-set-80m" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 12px; padding: 2px 8px; cursor: pointer; font-weight: 700;" title="Full 80m Paper 1 Clock with 25m Section A Chime">80m Exam</button>
              <button type="button" id="epz-btn-set-25m" style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a; border-radius: 12px; padding: 2px 8px; cursor: pointer; font-weight: 600;" title="25m Section A (Western Front)">25m Sec A</button>
              <button type="button" id="epz-btn-set-55m" style="background: #f3e8ff; color: #7e22ce; border: 1px solid #e9d5ff; border-radius: 12px; padding: 2px 8px; cursor: pointer; font-weight: 600;" title="55m Section B (Thematic Study)">55m Sec B</button>
            </div>
            <div id="epz-pacing-notice" style="display: none; font-size: 0.8rem; font-weight: 700; color: #b45309; background: #fef3c7; border: 1px solid #fde68a; padding: 4px 10px; border-radius: 6px; max-width: 320px; text-align: right;"></div>
          </div>
        </div>

        <h2 id="epz-q-text" style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #0f172a; margin-top: 0; line-height: 1.3; font-weight: 700;"></h2>
        <div id="epz-q-stimulus" style="font-size: 1.2rem; color: #475569; margin-top: 20px; font-style: italic; background: rgba(255,255,255,0.7); padding: 15px; border-radius: 8px; border-left: 4px solid #cbd5e1;"></div>
        
        <div id="epz-q-images" style="display: none; margin-top: 20px; display: flex; flex-wrap: wrap; gap: 10px;"></div>

        <div id="epz-q-provenance" style="display: none; margin-top: 15px; padding: 15px; background: #fef08a; border-left: 5px solid #ca8a04; color: #854d0e; font-size: 1.1rem; border-radius: 8px;"><i class="fa-solid fa-lightbulb"></i> <strong>Scaffolding:</strong> <span id="epz-q-provenance-text"></span></div>

        <div style="margin-top: 35px; display: flex; gap: 15px; flex-wrap: wrap;">
          <button id="epz-hint-btn" class="main-btn epz-btn" style="display: none; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 12px 24px; font-size: 1.1rem; border: none; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-lightbulb"></i> Structure Strip Hint</button>
          <button id="epz-wagoll-btn" class="main-btn epz-btn" style="display: none; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 24px; font-size: 1.1rem; border: none; border-radius: 8px; font-weight: 600;"><i class="fa-solid fa-star"></i> Show Model Answer</button>
        </div>

        <div id="epz-hint-panel" style="display: none; margin-top: 25px; padding: 25px; background: linear-gradient(to right, #fffbeb, #fef3c7); border-left: 5px solid #f59e0b; border-radius: 0 12px 12px 0; font-size: 1.15rem; color: #92400e; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.1);"></div>
        <div id="epz-wagoll-panel" style="display: none; margin-top: 25px; padding: 30px; background: linear-gradient(to right, #ecfdf5, #d1fae5); border-left: 5px solid #10b981; border-radius: 0 12px 12px 0; font-size: 1.15rem; color: #065f46; line-height: 1.8; white-space: pre-wrap; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.1);"></div>

      </div>
      
    </div>
  `;

  // 3. Logic State
  let currentQuestion = null;
  let timerInterval = null;
  let timeLeft = 0;
  let initialTimeLeft = 0;
  let questionTariffSeconds = 0;
  let timerRunning = false;

  const playPacingChime = (freq = 659.25, duration = 1.0) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio chime unavailable', e);
    }
  };

  const playDoublePacingChime = () => {
    playPacingChime(659.25, 0.7);
    setTimeout(() => playPacingChime(880, 1.2), 300);
  };

  // 4. Elements
  let currentSelectedType = 'all';
  const typePills = document.getElementById('epz-type-pills');
  const specificFilter = document.getElementById('epz-specific-filter');
  const generateBtn = document.getElementById('epz-generate-btn');
  const backBtn = document.getElementById('epz-back-btn');
  const displayArea = document.getElementById('epz-question-display');

  const qMeta = document.getElementById('epz-q-meta');
  const qText = document.getElementById('epz-q-text');
  const qStimulus = document.getElementById('epz-q-stimulus');
  const qImages = document.getElementById('epz-q-images');
  const qProv = document.getElementById('epz-q-provenance');
  const qProvText = document.getElementById('epz-q-provenance-text');

  const timerDisplay = document.getElementById('epz-timer-display');
  const timerToggle = document.getElementById('epz-timer-toggle');
  const pacingNotice = document.getElementById('epz-pacing-notice');
  const btnResetQ = document.getElementById('epz-btn-reset-q');
  const btnAdd5m = document.getElementById('epz-btn-add-5m');
  const btnSet80m = document.getElementById('epz-btn-set-80m');
  const btnSet25m = document.getElementById('epz-btn-set-25m');
  const btnSet55m = document.getElementById('epz-btn-set-55m');

  const hintBtn = document.getElementById('epz-hint-btn');
  const wagollBtn = document.getElementById('epz-wagoll-btn');
  const hintPanel = document.getElementById('epz-hint-panel');
  const wagollPanel = document.getElementById('epz-wagoll-panel');

  // Helpers
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const updateTimerDisplay = () => {
    timerDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 60) {
      timerDisplay.style.color = '#ef4444'; // Red for last minute
    } else {
      timerDisplay.style.color = 'white';
    }
  };

  const startTimer = () => {
    if (timerRunning) return;
    timerRunning = true;
    timerToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();

        // 25-Minute pacing chime when counting down from 80m (4800s, 3300s left)
        if (initialTimeLeft === 4800 && timeLeft === 3300) {
          playDoublePacingChime();
          if (pacingNotice) {
            pacingNotice.innerHTML =
              '🔔 <strong>25 Mins Elapsed:</strong> Section A complete! Move to Section B (55m left).';
            pacingNotice.style.display = 'block';
          }
        }
      } else {
        playDoublePacingChime();
        stopTimer();
        if (pacingNotice) {
          pacingNotice.innerHTML = "⏰ <strong>Time's up!</strong> Pens down.";
          pacingNotice.style.display = 'block';
        }
        alert("Time's up! Pens down!");
      }
    }, 1000);
  };

  const stopTimer = () => {
    timerRunning = false;
    timerToggle.innerHTML = '<i class="fa-solid fa-play"></i>';
    clearInterval(timerInterval);
  };

  const setTimerDuration = (seconds) => {
    stopTimer();
    timeLeft = seconds;
    initialTimeLeft = seconds;
    if (pacingNotice) pacingNotice.style.display = 'none';
    updateTimerDisplay();
  };

  if (btnResetQ) {
    btnResetQ.addEventListener('click', () =>
      setTimerDuration(
        questionTariffSeconds || (currentQuestion?.marks ? currentQuestion.marks * 90 : 600),
      ),
    );
  }
  if (btnAdd5m) {
    btnAdd5m.addEventListener('click', () => {
      timeLeft += 300;
      updateTimerDisplay();
    });
  }
  if (btnSet80m) {
    btnSet80m.addEventListener('click', () => setTimerDuration(4800)); // 80 mins
  }
  if (btnSet25m) {
    btnSet25m.addEventListener('click', () => setTimerDuration(1500)); // 25 mins
  }
  if (btnSet55m) {
    btnSet55m.addEventListener('click', () => setTimerDuration(3300)); // 55 mins
  }

  const populateSpecificQuestions = () => {
    const selectedType = currentSelectedType;
    let filteredBank = examBank;

    if (selectedType !== 'all') {
      filteredBank = filteredBank.filter((q) => q.type === selectedType);
    }

    // Preserve current selection if it still exists
    const currentVal = specificFilter.value;

    let html = '<option value="random">🎲 Random Question (From Filters Above)</option>';
    filteredBank.forEach((q) => {
      const originalIndex = examBank.indexOf(q);
      let typeIcon = '📄';
      let truncatedText = q.question.length > 75 ? q.question.substring(0, 75) + '...' : q.question;
      let prefix = q.ktPrefix ? `[${q.ktPrefix}] ` : '';
      html += `<option value="${originalIndex}">${typeIcon} ${prefix}${truncatedText}</option>`;
    });

    specificFilter.innerHTML = html;

    // Attempt to re-select
    if (currentVal !== 'random') {
      let optionExists = Array.from(specificFilter.options).some((opt) => opt.value === currentVal);
      if (optionExists) {
        specificFilter.value = currentVal;
      }
    }
  };

  // Interactions
  backBtn.addEventListener('click', () => {
    stopTimer();
    if (initialQuestion && initialQuestion.unitId && window.switchView) {
      window.switchView('mock-exams', initialQuestion.unitId);
      setTimeout(() => {
        const tabBtnTrend = document.getElementById('tab-btn-trend-radar');
        if (tabBtnTrend) {
          tabBtnTrend.click();
          if (initialQuestion.fromRadar) {
            setTimeout(() => {
              const radarTabBtn = document.querySelector('.etm-tab-btn[data-tab="radar"]');
              if (radarTabBtn) radarTabBtn.click();
            }, 100);
          }
        }
      }, 150);
    } else {
      const controls = document.getElementById('epz-controls');
      if (controls) controls.style.display = 'block';
      displayArea.style.display = 'none';
      backBtn.style.display = 'none';
    }
  });

  timerToggle.addEventListener('click', () => {
    if (timerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  hintBtn.addEventListener('click', () => {
    hintPanel.style.display = hintPanel.style.display === 'none' ? 'block' : 'none';
  });

  wagollBtn.addEventListener('click', () => {
    wagollPanel.style.display = wagollPanel.style.display === 'none' ? 'block' : 'none';
  });

  const btnViewMatrix = document.getElementById('epz-btn-view-matrix');
  if (btnViewMatrix) {
    btnViewMatrix.addEventListener('click', () => {
      const currentUnit = window.currentUnitId || unitData.id || 'edexcel_medicine';
      if (window.switchView) {
        window.switchView('mock-exams', currentUnit);
        setTimeout(() => {
          const tabBtnTrend = document.getElementById('tab-btn-trend-radar');
          if (tabBtnTrend) tabBtnTrend.click();
        }, 150);
      }
    });
  }

  if (typePills) {
    typePills.addEventListener('click', (e) => {
      if (e.target.classList.contains('epz-pill')) {
        // Update active class
        Array.from(typePills.children).forEach((btn) => btn.classList.remove('active'));
        e.target.classList.add('active');
        // Update state and refresh
        currentSelectedType = e.target.getAttribute('data-type');
        populateSpecificQuestions();
      }
    });
  }

  generateBtn.addEventListener('click', () => {
    const selectedSpecific = specificFilter ? specificFilter.value : 'random';

    if (selectedSpecific !== 'random') {
      currentQuestion = examBank[parseInt(selectedSpecific)];
    } else {
      const selectedType = currentSelectedType;
      let filteredBank = examBank;

      if (selectedType !== 'all') {
        filteredBank = filteredBank.filter((q) => q.type === selectedType);
      }

      if (filteredBank.length === 0) {
        alert('No questions found for this filter.');
        return;
      }

      // Pick random
      const randIndex = Math.floor(Math.random() * filteredBank.length);
      currentQuestion = filteredBank[randIndex];
    }

    // Reset UI
    stopTimer();
    const controls = document.getElementById('epz-controls');
    if (controls) controls.style.display = 'none';
    displayArea.style.display = 'block';
    backBtn.style.display = 'block';
    backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Change Question';
    hintPanel.style.display = 'none';
    wagollPanel.style.display = 'none';
    qImages.innerHTML = '';

    // Set Timer (approx 1.5 mins per mark)
    let marks =
      currentQuestion.marks || parseInt((currentQuestion.type || '0').replace(/[^0-9]/g, '')) || 0;
    let displayQText = currentQuestion.question || '';
    if (/describe two features of/i.test(displayQText)) {
      displayQText = displayQText.replace(/describe two features of/i, 'Describe one feature of');
      marks = 2;
    } else if (/explain two consequences of/i.test(displayQText)) {
      displayQText = displayQText.replace(
        /explain two consequences of/i,
        'Explain one consequence of',
      );
      marks = 4;
    } else if (
      currentQuestion.type === 'consequence' ||
      /explain (?:one|two) consequence/i.test(displayQText)
    ) {
      marks = 4;
    } else if (
      currentQuestion.type === 'feature' ||
      /describe (?:one|two) feature/i.test(displayQText)
    ) {
      marks = 2;
    }
    if (!marks) marks = 4;
    questionTariffSeconds = marks * 90; // 1.5 mins per mark
    setTimerDuration(questionTariffSeconds);

    qMeta.innerHTML = `<i class="fa-solid fa-book-open"></i> ${currentQuestion.blockTitle} &bull; ${currentQuestion.type || marks + '-mark'} Question`;
    qText.textContent = displayQText;

    if (currentQuestion.stimulus) {
      if (Array.isArray(currentQuestion.stimulus)) {
        qStimulus.innerHTML = currentQuestion.stimulus
          .map((stim) => {
            if (typeof stim === 'string') return stim;
            if (typeof stim === 'object') {
              return `<strong>${stim.title}</strong><br>${stim.content}`;
            }
            return '';
          })
          .join('<br><br>');
      } else {
        qStimulus.innerHTML = currentQuestion.stimulus;
      }
      qStimulus.style.display = 'block';
    } else {
      qStimulus.innerHTML = '';
      qStimulus.style.display = 'none';
    }

    // Handle images / sources
    if (currentQuestion.image) {
      qImages.style.display = 'flex';
      qImages.innerHTML += `<img src="${currentQuestion.image}" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">`;
    }

    if (currentQuestion.provenance_clue) {
      qProvText.textContent = currentQuestion.provenance_clue;
      qProv.style.display = 'block';
    } else {
      qProv.style.display = 'none';
    }

    hintBtn.style.display = 'block';
    if (currentQuestion.structure_strip || currentQuestion.scaffolding) {
      let strip = currentQuestion.structure_strip || currentQuestion.scaffolding;
      let stripHtml = `<strong>Scaffolding / Structure Strip:</strong><br><br>`;
      if (typeof strip === 'string') {
        stripHtml += strip.replace(/\\n/g, '<br>');
      } else if (Array.isArray(strip)) {
        stripHtml += `<ul style="padding-left: 20px;">${strip.map((s) => `<li>${s}</li>`).join('')}</ul>`;
      }
      hintPanel.innerHTML = stripHtml;
    } else {
      hintPanel.innerHTML = getStructureStrip(currentQuestion, marks, unitData ? unitData.id : '');
    }

    if (currentQuestion.model_answer) {
      wagollBtn.style.display = 'block';
      let ans = currentQuestion.model_answer;
      if (Array.isArray(ans)) ans = ans.join('<br><br>');
      wagollPanel.innerHTML = ans
        .replace(/\\n|\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    } else {
      wagollBtn.style.display = 'none';
    }
  });

  // Render legacy assessments container correctly
  const assessmentsContainer = document.createElement('div');
  assessmentsContainer.id = 'legacy-assessments';

  if (hasAnyAssessments) {
    // Logic for legacy assessments could go here.
    // But since we are extracting ALL exam_practice into examBank,
    // it handles both workflows cleanly now.
  }

  // Initialize specific questions list on load
  populateSpecificQuestions();

  // 5. Pre-load Initial Question if provided (e.g. from Past Paper Matrix)
  if (initialQuestion) {
    const controls = document.getElementById('epz-controls');
    if (controls) controls.style.display = 'none';
    displayArea.style.display = 'block';
    backBtn.style.display = 'block';
    backBtn.innerHTML = initialQuestion.fromRadar
      ? '<i class="fa-solid fa-arrow-left"></i> Return to Overdue Radar'
      : '<i class="fa-solid fa-arrow-left"></i> Return to Question Matrix';

    let rawQuestionText = initialQuestion.question_text || initialQuestion.question || '';
    let marks = initialQuestion.tariff || initialQuestion.marks || 16;

    // Normalization for modern Edexcel specifications:
    if (/describe two features of/i.test(rawQuestionText)) {
      rawQuestionText = rawQuestionText.replace(
        /describe two features of/i,
        'Describe one feature of',
      );
      marks = 2;
    } else if (/explain two consequences of/i.test(rawQuestionText)) {
      rawQuestionText = rawQuestionText.replace(
        /explain two consequences of/i,
        'Explain one consequence of',
      );
      marks = 4;
    } else if (
      initialQuestion.type === 'consequence' ||
      /explain (?:one|two) consequence/i.test(rawQuestionText)
    ) {
      marks = 4;
    } else if (
      initialQuestion.type === 'feature' ||
      /describe (?:one|two) feature/i.test(rawQuestionText)
    ) {
      marks = 2;
    }

    currentQuestion = {
      ...initialQuestion,
      question: rawQuestionText,
      blockTitle:
        initialQuestion.blockTitle ||
        `${initialQuestion.year ? initialQuestion.year + ' Past Paper' : ''} ${initialQuestion.q_number || ''}`.trim(),
      type: initialQuestion.type || `${marks}-mark`,
      marks: marks,
      stimulus: initialQuestion.stimulus,
      model_answer: initialQuestion.indicative_content || initialQuestion.model_answer,
      pitfall_warning: initialQuestion.pitfall_warning,
      provenance_clue: initialQuestion.provenance_clue,
    };

    // Set Timer duration based on tariff (1.5 mins per mark)
    questionTariffSeconds = marks * 90;
    setTimerDuration(questionTariffSeconds);

    qMeta.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${initialQuestion.year ? initialQuestion.year + ' Past Paper &bull; ' : ''}${initialQuestion.q_number ? initialQuestion.q_number + ' &bull; ' : ''}${marks} Marks (${marks * 1.5} Mins)`;
    qText.textContent = currentQuestion.question;

    if (currentQuestion.stimulus) {
      if (Array.isArray(currentQuestion.stimulus)) {
        qStimulus.innerHTML =
          `<strong>Stimulus Provided in Exam:</strong><br>` +
          currentQuestion.stimulus
            .map((stim) => {
              if (typeof stim === 'string') return `&bull; ${stim}`;
              if (typeof stim === 'object') {
                return `<strong>${stim.title || ''}</strong><br>${stim.content || ''}`;
              }
              return '';
            })
            .join('<br>');
      } else {
        qStimulus.innerHTML =
          `<strong>Stimulus Provided in Exam:</strong><br>` + currentQuestion.stimulus;
      }
      qStimulus.style.display = 'block';
    } else {
      qStimulus.innerHTML = '';
      qStimulus.style.display = 'none';
    }

    if (currentQuestion.pitfall_warning || currentQuestion.provenance_clue) {
      qProvText.innerHTML = `<strong>Pitfall Warning:</strong> ${currentQuestion.pitfall_warning || currentQuestion.provenance_clue}`;
      qProv.style.display = 'block';
    } else {
      qProv.style.display = 'none';
    }

    const stripHtml = getStructureStrip(currentQuestion, marks, initialQuestion.unitId || '');
    hintPanel.innerHTML = stripHtml;
    hintBtn.style.display = 'block';

    if (currentQuestion.model_answer) {
      wagollBtn.style.display = 'block';
      let ans = currentQuestion.model_answer;
      if (Array.isArray(ans)) {
        wagollPanel.innerHTML = `<strong>MARK SCHEME INDICATIVE CONTENT:</strong><br><br><ul style="padding-left: 20px; margin: 0; line-height: 1.6;">${ans.map((pt) => `<li style="margin-bottom: 8px;">${pt}</li>`).join('')}</ul>`;
      } else {
        wagollPanel.innerHTML =
          `<strong>MARK SCHEME INDICATIVE CONTENT:</strong><br><br>` + ans.replace(/\n/g, '<br>');
      }
    } else {
      wagollBtn.style.display = 'none';
    }
  }

  // Render Mock Exams Section
  if (unitData.mock_exams && unitData.mock_exams.length > 0) {
    const mocksHtml = `
      <div style="margin-top: 50px; background: #fff; padding: 30px; border-radius: 16px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: #1e293b; margin-top: 0; margin-bottom: 20px;">
          <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i> Printable Mock Exams
        </h2>
        <p style="color: #475569; font-size: 1.1rem; margin-bottom: 25px;">Generate completely copyright-free, print-ready PDF replicas of past papers.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
          ${unitData.mock_exams
            .map(
              (mock) => `
            <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; background: #f8fafc; display: flex; flex-direction: column;">
              <h3 style="margin-top: 0; color: #0f172a; font-size: 1.3rem;">${mock.title}</h3>
              ${
                mock.paper_reference || mock.time_minutes
                  ? `<p style="color: #64748b; font-size: 1rem; margin-bottom: 20px; flex-grow: 1;">
                ${mock.paper_reference ? `<strong>Paper Ref:</strong> ${mock.paper_reference}<br>` : ''}
                ${mock.time_minutes ? `<strong>Time:</strong> ${mock.time_minutes} minutes<br>` : ''}
                ${mock.total_marks ? `<strong>Marks:</strong> ${mock.total_marks} marks` : ''}
              </p>`
                  : '<div style="flex-grow: 1;"></div>'
              }
              <a href="units/${unitData.id || window.currentUnitId}/${mock.id}.html" target="_blank" class="main-btn epz-btn" style="display: block; text-align: center; text-decoration: none; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 20px; font-size: 1.1rem; border-radius: 8px; font-weight: 600; margin-bottom: 10px;">
                <i class="fa-solid fa-print"></i> Generate Printable PDF
              </a>
              ${
                mock.has_mark_scheme ||
                (mock.section_b &&
                  mock.section_b.questions &&
                  mock.section_b.questions.some(
                    (q) =>
                      q.model_answer ||
                      (q.type === 'either_or' && (q.q5?.model_answer || q.q6?.model_answer)),
                  )) ||
                (mock.questions &&
                  mock.questions.some(
                    (q) =>
                      q.model_answer ||
                      (q.type === 'essay_choice' && q.options?.some((opt) => opt.model_answer)),
                  ))
                  ? `
              <a href="units/${unitData.id || window.currentUnitId}/${mock.id}_mark_scheme.html" target="_blank" class="main-btn epz-btn" style="display: block; text-align: center; text-decoration: none; background: linear-gradient(135deg, #002855, #003b7a); color: white; padding: 12px 20px; font-size: 1.1rem; border-radius: 8px; font-weight: 600;">
                <i class="fa-solid fa-chalkboard-user"></i> Teacher Mark Scheme
              </a>
              `
                  : ''
              }
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    `;

    const wrapper = container.querySelector('.epz-wrapper');
    if (wrapper) {
      wrapper.insertAdjacentHTML('beforeend', mocksHtml);
    }
  }
}
