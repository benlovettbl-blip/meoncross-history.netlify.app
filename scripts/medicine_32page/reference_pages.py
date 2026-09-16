"""
reference_pages.py
Contains Pages 30, 31, and 32:
- Page 30: Western Front Primary Source Provenance Typology & Utility Matrix
- Page 31: Official 2026 Pearson Edexcel Examining Masterclass
- Page 32: Back Cover — Full-Page Pearson Edexcel Specification Audit & Revision Checklist
"""

def render_reference_pages():
    """Pages 30, 31, and 32: Archival Reference, Examiner Masterclass, and Spec Audit"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 30: REFERENCE — PRIMARY SOURCE PROVENANCE TYPOLOGY MATRIX-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The British Sector of the Western Front, 1914–18</h2>
                    <p>Archival Reference Shelf · Primary Source Provenance Typology &amp; Utility Matrix</p>
                </div>
                <span class="header-tag">Archival Reference · Page 30</span>
            </div>

            <!-- Introductory Briefing Box -->
            <div class="examiner-card" style="margin-bottom: 4px;">
                <div class="examiner-card-title">
                    <span>ARCHIVAL PROVENANCE PROTOCOL: EVALUATING HISTORICAL EVIDENCE</span>
                    <span>Edexcel Specification Option 11</span>
                </div>
                <div style="font-size: 7pt; line-height: 1.3;">
                    In Question 2(a) [8 Marks] and Question 2(b) [4 Marks], examiners require candidates to evaluate sources in historical context using <strong>Nature, Origin, and Purpose (NOP)</strong>. Never dismiss a source as "biased" or "useless". Instead, explain how its specific archival context dictates what it can and cannot reveal about medical treatments, casualty logistics, and conditions.
                </div>
            </div>

            <!-- 6-Row Archival Typology Matrix Table -->
            <table class="matrix-table" style="width: 100%; border-collapse: collapse; font-size: 6.9pt; line-height: 1.25; margin-bottom: 4px;">
                <thead>
                    <tr style="background: #000000; color: #ffffff;">
                        <th style="width: 17%; padding: 3px 5px; border: 1px solid #000000; text-align: left;">Source Typology &amp; Example</th>
                        <th style="width: 18%; padding: 3px 5px; border: 1px solid #000000; text-align: left;">Archival Purpose (Motive)</th>
                        <th style="width: 32%; padding: 3px 5px; border: 1px solid #000000; text-align: left;">Core Historical Strengths (High Utility)</th>
                        <th style="width: 33%; padding: 3px 5px; border: 1px solid #000000; text-align: left;">Evaluative Limitations &amp; Blind Spots</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #f8fafc;">
                            <strong>RAMC Unit War Diaries</strong><br>
                            <span style="font-size: 6.2pt; color: #334155;">e.g. Field Ambulance &amp; CCS Logs (TNA: WO 95)</span>
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            Official daily operational record written by commanding medical officers for War Office command.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Extremely reliable for precise casualty counts, arrival times, and logistical bottlenecks.<br>
                            • Records official movements, equipment shortages, and structural reorganizations.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Downplays panic, panic-induced errors, or administrative failure to protect military reputation.<br>
                            • Omits visceral individual soldier suffering and personal emotional reactions.
                        </td>
                    </tr>
                    <tr style="background: #fafafa;">
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #f1f5f9;">
                            <strong>Hospital Admission Books</strong><br>
                            <span style="font-size: 6.2pt; color: #334155;">e.g. Medical Records (TNA: MH 106)</span>
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            Statistical and administrative ledger tracking individual admissions, wound types, treatments, and discharges.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Unmatched empirical accuracy for tracking specific wounds (gunshot, shrapnel, gas, trench foot).<br>
                            • Verifies survival rates and average length of stay across different hospitals.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Purely administrative; provides zero narrative explanation of clinical methods or surgical challenges.<br>
                            • Incomplete during chaotic mass offensives (e.g. Somme Day 1).
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #f8fafc;">
                            <strong>Personal Wartime Letters &amp; Diaries</strong><br>
                            <span style="font-size: 6.2pt; color: #334155;">e.g. VAD Nurses, Chaplains &amp; Stretcher-Bearers</span>
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            Private, uninhibited personal reflection or communication with family back home in Britain.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Invaluable eyewitness evidence of ward atmosphere, physical exhaustion, and grim sensory details.<br>
                            • Reveals true feelings of staff facing horrific mutilations and freezing conditions.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Subject to military postal censorship (letters often avoided depressing facts to spare relatives).<br>
                            • Highly localized to one specific aid post or ward; lacks broad statistical perspective.
                        </td>
                    </tr>
                    <tr style="background: #fafafa;">
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #f1f5f9;">
                            <strong>Official Trench Photographs</strong><br>
                            <span style="font-size: 6.2pt; color: #334155;">e.g. Imperial War Museums (IWM Q Series)</span>
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            Official visual record taken by British official war photographers (e.g. John Warwick Brooke) for public release.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Verifiable primary visual evidence of medical machinery, uniform condition, mud terrain, and stretcher gear.<br>
                            • Depicts layout of advanced dressing stations and ambulance trains.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Heavily staged and curated for propaganda; never depicted dying men, amputations, or catastrophic failure.<br>
                            • Camera shutter speeds could not capture real-time battlefield chaos.
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #f8fafc;">
                            <strong>Professional Medical Journals</strong><br>
                            <span style="font-size: 6.2pt; color: #334155;">e.g. The Lancet &amp; British Medical Journal (1914–18)</span>
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            Scientific exchange among senior surgeons and bacteriologists to evaluate clinical techniques and trial results.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Rigorous scientific descriptions of innovations (Carrel-Dakin method, Thomas splint, stored blood).<br>
                            • Provides precise clinical trial data and comparative mortality statistics.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Authors often had professional egos and exaggerated the success of their proprietary techniques.<br>
                            • Reflects cutting-edge hospital practice rather than standard frontline trench realities.
                        </td>
                    </tr>
                    <tr style="background: #fafafa;">
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px; background: #f1f5f9;">
                            <strong>Post-War Memoirs &amp; Oral Testimonies</strong><br>
                            <span style="font-size: 6.2pt; color: #334155;">e.g. Published Books (1920s–1980s)</span>
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            Retrospective recollection written years or decades after the war for historical remembrance or commercial publication.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Free from wartime censorship; candid commentary on military incompetence and medical disasters.<br>
                            • Reflective overview of the entire conflict and psychological impact.
                        </td>
                        <td style="border: 1px solid #cbd5e1; padding: 3px 5px;">
                            • Vulnerable to memory fade, hindsight bias, and dramatic exaggeration for reader entertainment.<br>
                            • Often conflates different battles or repeats popular post-war myths.
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Applied Exam Strategy Box -->
            <div style="border: 1.2px solid #000000; background: #ffffff; padding: 4px 6px; border-radius: 2px;">
                <div style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; margin-bottom: 2px;">
                    HOW TO APPLY THIS MATRIX IN QUESTION 2(a) SOURCE UTILITY [8 MARKS]:
                </div>
                <div style="font-size: 6.8pt; line-height: 1.3;">
                    When answering Q2(a), link the <strong>nature of the source</strong> directly to the specific enquiry. For example: <em>"Because Source A is an official RAMC Field Ambulance war diary (WO 95), its operational nature makes it exceptionally useful for establishing the exact delays caused by the Passchendaele mud; however, its official purpose means it omits the emotional despair recorded in private nursing memoirs like Source B."</em>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Examiner Masterclass (Page 31)</span>
            <span>Page 30 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 31: REFERENCE — OFFICIAL 2026 EXAMINER MASTERCLASS       -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A &amp; Section B Examination Mastery</h2>
                    <p>Official 2026 Pearson Edexcel Examining Masterclass · Option 11 Examiner Protocols</p>
                </div>
                <span class="header-tag">Examiner Masterclass · Page 31</span>
            </div>

            <!-- 4 Senior Examiner Command Panels -->
            <div style="display: flex; flex-direction: column; gap: 4.5px;">
                <!-- Panel 1: The "Dealt vs Felt" Fatal Exam Trap -->
                <div class="examiner-card">
                    <div class="examiner-card-title">
                        <span>1. THE "DEALT VS FELT" EXAM TRAP (SECTION A)</span>
                        <span>Common Level 1/2 Pitfall</span>
                    </div>
                    <div style="font-size: 7pt; line-height: 1.3;">
                        <strong>The Examiner Warning:</strong> Every year, thousands of students lose half the available marks in Section A because they write about how soldiers <em>felt</em> in the trenches (mud, fear, rats, lice, miserable food) rather than how the RAMC <em>dealt</em> with injuries, treatments, and medical logistics.<br>
                        <strong>The Golden Rule:</strong> The historic environment specification is titled <em>"Injuries, treatment and the trenches."</em> Always keep your sentences anchored to medical interventions: triage systems, Thomas splints, mobile X-rays, debridement, Carrel-Dakin antiseptic irrigation, citrated blood transfusions, and specialized evacuation transport.
                    </div>
                </div>

                <!-- Panel 2: The 3-Aspect Rule for Question 4 -->
                <div class="examiner-card">
                    <div class="examiner-card-title">
                        <span>2. THE 3-ASPECT RULE FOR QUESTION 4 [12 MARKS]</span>
                        <span>Section B Analytical Architecture</span>
                    </div>
                    <div style="font-size: 7pt; line-height: 1.3;">
                        <strong>The Examiner Warning:</strong> Edexcel mark schemes explicitly state that candidate responses relying <em>only</em> on the two printed stimulus points cannot achieve Level 4 (maximum 8/12 marks). You MUST introduce relevant own knowledge.<br>
                        <strong>The Golden Rule:</strong> Structure every 12-mark answer into exactly <strong>3 P-E-E paragraphs (3 distinct aspects)</strong>:
                        <ul style="margin: 2px 0 2px 14px; padding: 0;">
                            <li><strong>Paragraph 1 (6 lines):</strong> Stimulus Point 1 + deep factual explanation + analytical causal link.</li>
                            <li><strong>Paragraph 2 (6 lines):</strong> Stimulus Point 2 + deep factual explanation + analytical causal link.</li>
                            <li><strong>Paragraph 3 (6 lines):</strong> Independent Own Knowledge Factor (e.g. enfranchisement, Royal Society, corn steep liquor).</li>
                        </ul>
                    </div>
                </div>

                <!-- Panel 3: Question 2(a) Comparative Synthesis -->
                <div class="examiner-card">
                    <div class="examiner-card-title">
                        <span>3. QUESTION 2(a) [8 MARKS]: COMPARATIVE SYNTHESIS &amp; MUTUAL UTILITY</span>
                        <span>Section A Source Enquiry</span>
                    </div>
                    <div style="font-size: 7pt; line-height: 1.3;">
                        <strong>The Examiner Warning:</strong> Candidates who evaluate Source A and Source B in complete isolation without ever comparing them struggle to reach the top of Level 3.<br>
                        <strong>The Golden Rule:</strong> Always follow the <strong>C-O-P Formula</strong> (Content, Own Knowledge, Provenance) for both sources, and finish Paragraph 2 with a <strong>synthesis judgement</strong>: explain how Source A and Source B are <em>mutually supportive</em> or how one source provides the essential context missing from the other (e.g. an official war diary confirms the operational scale, while a nurse's diary reveals the human ward reality).
                    </div>
                </div>

                <!-- Panel 4: Question 2(b) 4-Part Follow-Up Algorithm -->
                <div class="examiner-card">
                    <div class="examiner-card-title">
                        <span>4. QUESTION 2(b) [4 MARKS]: THE PERFECT 4/4 FOLLOW-UP ALGORITHM</span>
                        <span>Section A Follow-Up Enquiry</span>
                    </div>
                    <div style="font-size: 7pt; line-height: 1.3;">
                        <strong>The 4-Step Algorithm:</strong>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 2px; font-size: 6.8pt;">
                            <tr style="border-bottom: 1px solid #cbd5e1;">
                                <td style="width: 25%; font-weight: 800; padding: 1.5px 0;">1. Detail in Source:</td>
                                <td style="padding: 1.5px 0;">Quote a short, precise phrase from the text (e.g. <em>"pipes freeze entirely... strictly ration the water"</em>).</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #cbd5e1;">
                                <td style="width: 25%; font-weight: 800; padding: 1.5px 0;">2. Question to Ask:</td>
                                <td style="padding: 1.5px 0;">Must directly investigate the quote (e.g. <em>"How did freezing winter temperatures affect patient mortality at Base Hospitals?"</em>).</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #cbd5e1;">
                                <td style="width: 25%; font-weight: 800; padding: 1.5px 0;">3. Type of Source:</td>
                                <td style="padding: 1.5px 0;">Name a realistic historical document: <strong>National Archives RAMC Base Hospital War Diary</strong> or <strong>Casualty Admission Book</strong>. NEVER write "the internet" or "a history textbook".</td>
                            </tr>
                            <tr>
                                <td style="width: 25%; font-weight: 800; padding: 1.5px 0;">4. How it Helps:</td>
                                <td style="padding: 1.5px 0;">Explain how the source answers the specific question (e.g. <em>"It would provide official mortality statistics and medical logs recording hypothermia cases during winter 1917."</em>).</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Specification Audit (Page 32)</span>
            <span>Page 31 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 32: BACK COVER — FULL-PAGE WORD-FOR-WORD SPECIFICATION   -->
    <!-- ============================================================= -->
    <div class="page">
        <div class="spec-audit-container">
            <div class="spec-audit-header">
                <div>
                    <span class="spec-audit-title">Pearson Edexcel GCSE (9–1) History · Option 11 Specification Audit</span>
                    <div style="font-size: 6.8pt; color: #334155; font-style: italic; margin-top: 1px;">Official Word-for-Word Syllabus Content · Medicine in Britain, c1250–present &amp; Western Front, 1914–18</div>
                </div>
                <div style="font-size: 7pt; font-weight: 700; border: 1px solid #000; padding: 1.5px 5px; background: #f8fafc;">
                    Tick [ ✓ ] once mastered
                </div>
            </div>

            <div class="spec-audit-grid">
                <!-- Column 1: Section B Units 1 & 2 -->
                <div class="spec-audit-col">
                    <div class="spec-col-banner">SECTION B: THEMATIC STUDY (1)</div>
                    
                    <div class="spec-unit-box">
                        <div class="spec-unit-title">Unit 1: c1250–c1500: Medicine in Medieval England</div>
                        
                        <div class="spec-sub-title">Ideas about the cause of disease and illness:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Supernatural and religious explanations of the cause of disease.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Rational explanations: Theory of Four Humours and miasma theory.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">The continuing medical influence of Galen in England.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Approaches to prevention and treatment:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Religious actions, bloodletting, purging, purifying the air.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Roles of physician, apothecary, barber surgeon, hospitals &amp; home remedies.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Case Study:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Dealing with the Black Death, 1348–49:</strong> treatments and prevention.</span>
                            </li>
                        </ul>
                    </div>

                    <div class="spec-unit-box" style="margin-top: 5px;">
                        <div class="spec-unit-title">Unit 2: c1500–c1700: The Medical Renaissance</div>
                        
                        <div class="spec-sub-title">Ideas about the cause of disease and illness:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Continuity and change; scientific observation (Thomas Sydenham).</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Impact of printing press and the work of the Royal Society.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Approaches to prevention and treatment:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Continuity and change in care; hospitals and community herbalists.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Anatomical training and the influence of Vesalius.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Case Studies:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>William Harvey:</strong> circulation of the blood.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Great Plague (1665):</strong> treatments and attempts to prevent spread.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Column 2: Section B Units 3 & 4 -->
                <div class="spec-audit-col">
                    <div class="spec-col-banner">SECTION B: THEMATIC STUDY (2)</div>
                    
                    <div class="spec-unit-box">
                        <div class="spec-unit-title">Unit 3: c1700–c1900: 18th &amp; 19th Century Britain</div>
                        
                        <div class="spec-sub-title">Ideas about the cause of disease and illness:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Pasteur's Germ Theory (1861) and its influence; Robert Koch's bacteriology.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Approaches to prevention and treatment:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Surgical improvements: Simpson (chloroform), Lister (carbolic), asepsis.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Hospital care and nursing reform: Florence Nightingale.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Public Health Acts of 1848 and 1875; municipal sanitation.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Case Studies:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>Edward Jenner:</strong> smallpox vaccination.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text"><strong>John Snow:</strong> Broad Street cholera pump (1854).</span>
                            </li>
                        </ul>
                    </div>

                    <div class="spec-unit-box" style="margin-top: 5px;">
                        <div class="spec-unit-title">Unit 4: c1900–present: Modern Medicine</div>
                        
                        <div class="spec-sub-title">Ideas about the cause of disease and illness:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Genetics and DNA (Watson, Crick, Franklin); Human Genome Project.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Lifestyle factors: smoking (Doll &amp; Hill), diet, alcohol.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Advanced diagnostic physics: X-rays, CT scans, MRI, blood testing.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Approaches to prevention and treatment:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Magic bullets (Salvarsan 606, Prontosil) &amp; antibiotics (Penicillin).</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">High-tech surgery: transplants, keyhole surgery, prosthetics.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">State healthcare: National Health Service (1948) &amp; vaccination campaigns.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Government lifestyle legislation: Clean Air Acts, smoking bans.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Column 3: Section A Western Front -->
                <div class="spec-audit-col">
                    <div class="spec-col-banner">SECTION A: HISTORIC ENVIRONMENT</div>
                    
                    <div class="spec-unit-box">
                        <div class="spec-unit-title">The British Sector of the Western Front, 1914–18</div>
                        
                        <div class="spec-sub-title">Context &amp; Theatre of War:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Ypres salient, the Somme, Arras chalk tunnels, Cambrai.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Trench system: front, support, communication trenches, terrain &amp; mud.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Transport problems: stretcher-bearers, motor ambulances, trains, barges.</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Injuries, Illnesses &amp; Treatments:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Illnesses: trench foot, trench fever (body lice), shell shock (NYDN).</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Weapons effects: shrapnel wounds, bullet wounds, gas (chlorine, phosgene, mustard).</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Infection: gas gangrene, tetanus, debridement, Carrel-Dakin method.</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Fracture treatment: Hugh Owen Thomas splint (mortality dropped 80% to 20%).</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Medical technology: mobile X-ray vans (locating shrapnel/bullets).</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Blood transfusions: sodium citrate (Hustin), glucose storage (Rous/Turner), Robertson's Cambrai blood bank (1917).</span>
                            </li>
                        </ul>

                        <div class="spec-sub-title">Chain of Evacuation:</div>
                        <ul class="spec-points-list">
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Regimental Aid Posts (RAP)</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Advanced &amp; Main Dressing Stations (Field Ambulance)</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Casualty Clearing Stations (CCS) — triage &amp; emergency surgery</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Base Hospitals — specialist surgery &amp; convalescence</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Underground hospital at Arras (Thompson's Cave: 700 beds)</span>
                            </li>
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">Medical personnel: RAMC, FANY, QAIMNS, VAD nurses</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">End of Option 11 Master Specification Audit</span>
            <span>Page 32 of 32</span>
        </div>
    </div>
    '''
