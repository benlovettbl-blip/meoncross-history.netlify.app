"""
section_b_spreads_part2.py
Contains Spreads 5, 6, 7, 8 for Section B (Pages 10 to 17).
Strictly follows 6 lines per paragraph across all essays.
"""

def render_spread_5():
    """Pages 10 & 11: Modern Britain: Antibiotics & The NHS (c1900–present)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 10: SECTION B — MODERN BRITAIN (Q3 & FULL Q4 18 LINES)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Medicine in Modern Britain (c1900–present) · Question 3 (Difference) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · c1900–present</span>
            </div>

            <!-- Q3: Difference -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill unexamined">Unexamined Spec Target</span>
                        Explain one way in which early twentieth-century 'magic bullets' were different from modern antibiotics.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Magic Bullets</span> Synthetic chemical dyes (Ehrlich's Salvarsan 606 in 1909 for syphilis; Domagk's Prontosil in 1932); targeted specific microbes but toxic.<br>
                            <span class="scaffold-pill">Antibiotics</span> Naturally occurring moulds/substances (Fleming 1928, Florey &amp; Chain 1940); destroyed bacterial cell walls safely.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Contrast Connectives</span>
                        <div class="scaffold-content">
                            • <em>One fundamental difference in treatment was...</em><br>
                            • <em>Early magic bullets were synthetic chemicals that...</em><br>
                            • <em>In sharp contrast, antibiotics were derived from living...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"Early magic bullets like Ehrlich's Salvarsan 606 (1909) were synthetic chemical dyes that attacked specific microbes like syphilis but were toxic in high doses, whereas modern antibiotics like penicillin were derived from living fungal mould and destroyed bacterial cell walls safely without poisoning healthy human tissue."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x6 = 18 Lines) -->
            <div class="question-container" style="margin-top: 4px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill past">Edexcel June 2021</span>
                        Explain why there was rapid progress in the development and mass production of penicillin in the years c1938–c1945.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Howard Florey and Ernst Chain at Oxford University</strong> &nbsp;&nbsp;
                    <strong>• US Government funding and the Second World War</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Florey &amp; Chain (1938–41)</span>
                            <span class="scaffold-pill">Mouse Trials (1940)</span>
                            <span class="scaffold-pill">Albert Alexander (1941)</span>
                            <span class="scaffold-pill">US War Production Board</span>
                            <span class="scaffold-pill">Corn Steep Liquor</span>
                            <span class="scaffold-pill">Deep Fermentation Tanks (1944)</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>The scientific catalyst was Florey and Chain's purification...</em><br>
                            • <em>However, British pharmaceutical firms lacked wartime capacity...</em><br>
                            • <em>Consequently, US wartime intervention unlocked mass production...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> Florey &amp; Chain's Purification &rarr; <strong>Para 2:</strong> US State Intervention &amp; Wartime Urgency &rarr; <strong>Para 3:</strong> Industrial Fermentation.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: Howard Florey, Ernst Chain &amp; Biochemical Purification (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: US Government Funding &amp; Wartime Military Urgency (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — Industrial Innovations (Corn Steep Liquor, Cantaloupe Strain &amp; Deep Fermentation)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 10 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 11: SECTION B — MODERN BRITAIN (FULL-PAGE Q5/6 ESSAY)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Medicine in Modern Britain (c1900–present) · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · c1900–present Essay</span>
            </div>

            <!-- Q5 / Q6 Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        'The creation of the National Health Service in 1948 was the most significant breakthrough in medical care between c1900 and the present.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Aneurin Bevan and the founding of the NHS (5 July 1948)</strong> &nbsp;&nbsp;
                    <strong>• The discovery of the structure of DNA by Watson, Crick and Franklin (1953)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: The NHS (1948)</span> Free at point of delivery; universal access; nationalized hospitals; ended two-tier care for working class.<br>
                            <span class="scaffold-pill">Side B: DNA &amp; Genetics</span> 1953 double helix; Human Genome Project; gene therapy and targeted oncological drugs.<br>
                            <span class="scaffold-pill">Side C: High-Tech Medicine</span> Advanced surgical techniques (hip replacements, organ transplants, keyhole surgery, dialysis).
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>The NHS revolutionized healthcare delivery by removing economic barriers...</em><br>
                            • <em>However, social access was meaningless without clinical cures...</em><br>
                            • <em>Ultimately, scientific breakthroughs like DNA were decisive because...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Weigh <strong>democratic social access</strong> (NHS ensuring everyone could consult a doctor) vs <strong>scientific capability</strong> (DNA and biotech discovering cures).
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Aneurin Bevan &amp; The Foundation of the NHS)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — Watson, Crick &amp; Franklin's Discovery of DNA Structure (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — High-Tech Surgical &amp; Pharmaceutical Breakthroughs (Organ Transplants &amp; Chemotherapy)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Democratic Social Access vs Clinical Cure)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for 21st Century Science, Genetics &amp; Prevention (Pages 12–13)</span>
            <span>Page 11 of 32</span>
        </div>
    </div>
    '''

def render_spread_6():
    """Pages 12 & 13: 21st Century Science, Genetics, High-Tech Prevention & Lifestyle (c1900–present)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 12: SECTION B — 21ST C SCIENCE (Q3 & FULL Q4 18 LINES)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>21st Century Science &amp; Prevention · Question 3 (Difference) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · 21st Century Science</span>
            </div>

            <!-- Q3: Difference -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill unexamined">Unexamined Spec Target</span>
                        Explain one way in which methods of diagnosing illness in the nineteenth century were different from methods of diagnosing illness in the modern era (c1900–present).
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">19th C Diagnosis</span> Relied on external physical symptoms, stethoscopes (Laennec), taking pulse, observing urine.<br>
                            <span class="scaffold-pill">Modern Diagnosis</span> High-tech medical physics: X-rays, CT scans, MRI, endoscopy, blood tests, and genetic DNA profiling.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Contrast Connectives</span>
                        <div class="scaffold-content">
                            • <em>One fundamental difference in diagnosis was...</em><br>
                            • <em>In the 19th century, doctors were restricted to external...</em><br>
                            • <em>In sharp contrast, modern clinical practice utilizes internal...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"In the 19th century diagnosis was restricted to external physical examination using stethoscopes and feeling the pulse, whereas modern doctors use advanced medical physics such as CT and MRI scans alongside genetic blood tests to diagnose disease internally with microscopic precision."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x6 = 18 Lines) -->
            <div class="question-container" style="margin-top: 4px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Explain why understanding of the causes of disease advanced rapidly after 1900.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• The discovery of the structure of DNA (1953)</strong> &nbsp;&nbsp;
                    <strong>• Research into lifestyle factors (e.g. Doll and Hill on smoking and lung cancer, 1950)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Watson, Crick &amp; Franklin 1953</span>
                            <span class="scaffold-pill">Human Genome Project (1990–2003)</span>
                            <span class="scaffold-pill">Doll &amp; Hill Smoking Link 1950</span>
                            <span class="scaffold-pill">Lifestyle Epidemiology</span>
                            <span class="scaffold-pill">Electron Microscopes (1931)</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>A revolutionary advance was the discovery of genetic coding...</em><br>
                            • <em>By uncovering DNA structure, scientists proved that disease...</em><br>
                            • <em>Furthermore, statistical epidemiology demonstrated that lifestyle...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> DNA Structure &amp; Hereditary Diseases &rarr; <strong>Para 2:</strong> Lifestyle Research (Doll &amp; Hill / Smoking) &rarr; <strong>Para 3:</strong> High-Tech Microscopy &amp; Virology.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: Genetics &amp; The Discovery of the Structure of DNA (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Statistical Epidemiology &amp; Lifestyle Causation (Doll &amp; Hill / Smoking) (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — Scientific Instrumentation (Electron Microscopes &amp; Virology)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 12 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 13: SECTION B — 21ST C SCIENCE (FULL-PAGE Q5/6 ESSAY)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>21st Century Science &amp; Prevention · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · 21st Century Essay</span>
            </div>

            <!-- Q5 / Q6 Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        'The discovery of the structure of DNA in 1953 was the most significant turning point in modern medicine (c1900–present).' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• The Human Genome Project (completed 2003)</strong> &nbsp;&nbsp;
                    <strong>• The development of mass-produced penicillin in the Second World War</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: DNA &amp; Genetics</span> Watson, Crick, Franklin; mapping human genetic blueprint; BRCA breast cancer gene screening; targeted chemotherapy.<br>
                            <span class="scaffold-pill">Side B: Antibiotics</span> Penicillin (Florey &amp; Chain); defeated lethal bacterial infections (pneumonia, sepsis); saved tens of millions.<br>
                            <span class="scaffold-pill">Side C: State Prevention</span> Mass immunization (polio, MMR); Clean Air Acts (1956); anti-smoking laws (2007 public smoking ban).
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>DNA provided the foundational scientific breakthrough of the century...</em><br>
                            • <em>However, penicillin had a far more immediate impact on mass survival...</em><br>
                            • <em>Consequently, while DNA holds future promise, antibiotics transformed...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Weigh <strong>immediate mortality reduction</strong> (penicillin curing acute infections) vs <strong>long-term structural understanding</strong> (DNA explaining incurable chronic conditions).
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (DNA Discovery &amp; Human Genome Project)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — Mass-Produced Antibiotics &amp; Eradication of Bacterial Killers (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — Government Public Health &amp; Preventative Legislation (Clean Air &amp; Smoking Bans)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Immediate Acute Survival vs Long-Term Genetic Mastery)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Synoptic &amp; Cross-Period Thematic Mastery (Pages 14–15)</span>
            <span>Page 13 of 32</span>
        </div>
    </div>
    '''

def render_spread_7():
    """Pages 14 & 15: Synoptic & Cross-Period Thematic Mastery"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 14: SECTION B — SYNOPTIC PRACTICE (Q3 & FULL Q4 18 L)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Synoptic &amp; Cross-Period Mastery · Question 3 (Similarity) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · Synoptic</span>
            </div>

            <!-- Q3: Similarity -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill past">Edexcel November 2020</span>
                        Explain one way in which the training of physicians in the Medieval period was similar to the training of physicians in the Renaissance period.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Medieval Training</span> Oxford &amp; Cambridge; book-learning from Galen &amp; Hippocrates; zero clinical dissection.<br>
                            <span class="scaffold-pill">Renaissance Training</span> Continued reading of classical texts; Royal College of Physicians licensing; slow adoption of Harvey.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Continuity Connectives</span>
                        <div class="scaffold-content">
                            • <em>One clear continuity in physician training was...</em><br>
                            • <em>In medieval universities, medical education was based on...</em><br>
                            • <em>Similarly, in the Renaissance, mainstream physicians still...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"In both eras, physician education was heavily theoretical based on classical books; medieval universities taught Galen's texts without dissection, and seventeenth-century medical schools still required doctors to master Galenic lectures before granting licensing."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x6 = 18 Lines) -->
            <div class="question-container" style="margin-top: 4px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Explain why the British Government abandoned its laissez-faire attitude towards public health in the nineteenth century.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Edwin Chadwick’s Report on the Sanitary Condition of the Labouring Population (1842)</strong> &nbsp;&nbsp;
                    <strong>• The Second Reform Act giving working-class men the vote (1867)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Chadwick Report 1842</span>
                            <span class="scaffold-pill">Broad Street Cholera 1854</span>
                            <span class="scaffold-pill">John Snow Water Pump</span>
                            <span class="scaffold-pill">1867 Reform Act (Working Votes)</span>
                            <span class="scaffold-pill">1875 Public Health Act</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>A primary catalyst was empirical statistical evidence...</em><br>
                            • <em>Chadwick proved that filthy living conditions caused economic loss...</em><br>
                            • <em>Politicians were forced to act when working-class men gained the vote...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> Chadwick's Report (Economic &amp; Health Evidence) &rarr; <strong>Para 2:</strong> Political Enfranchisement (1867 Reform Act) &rarr; <strong>Para 3:</strong> Snow &amp; Cholera.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: Edwin Chadwick &amp; The Economic Burden of Filth (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: The 1867 Reform Act &amp; Working-Class Political Pressure (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — John Snow, Broad Street (1854) &amp; Compulsory 1875 Legislation</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 14 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 15: SECTION B — SYNOPTIC PRACTICE (FULL-PAGE Q5/6 ESSAY) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Synoptic &amp; Cross-Period Mastery · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · Synoptic Essay</span>
            </div>

            <!-- Q5 / Q6 Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill unexamined">Unexamined Spec Target</span>
                        'Individual genius was more important than government action in improving medicine and public health between c1250 and the present.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• William Harvey and the circulation of the blood (1628)</strong> &nbsp;&nbsp;
                    <strong>• The Public Health Act of 1875</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: Individuals</span> Jenner, Simpson, Lister, Pasteur, Koch, Fleming; breakthroughs in clinical laboratory science.<br>
                            <span class="scaffold-pill">Side B: Government Action</span> 1875 Public Health Act, Clean Air Acts (1956), NHS (1948); statutory power &amp; funding.<br>
                            <span class="scaffold-pill">Side C: Synergy</span> Individuals discover cures, but government must enforce and fund mass delivery.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>Individuals were indispensable for initiating progress...</em><br>
                            • <em>However, individual ideas were impotent without state statutory power...</em><br>
                            • <em>The decisive factor across 750 years was the institutional transition...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Synthesize: Without individual science (Pasteur/Fleming), government had no solutions; but without government funding (US WWII/NHS), individuals could not mass-treat.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Individual Genius — Harvey, Jenner, Simpson)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — Government Action, Public Health Acts &amp; The Welfare State (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — War, Industrial Technology &amp; Mass Communications</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Scientific Discovery vs Statutory Enforcement)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Comparison Lab &amp; Live Simulation (Pages 16–17)</span>
            <span>Page 15 of 32</span>
        </div>
    </div>
    '''

def render_spread_8():
    """Pages 16 & 17: The 4-Mark Comparison Mastery Lab & Paired Choice Timed Live Simulation"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 16: SECTION B — THE 4-MARK COMPARISON MASTERY LAB        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>The 4-Mark Comparison Mastery Lab · Question 3 High-Yield Rapid-Fire Drills (AO1/AO2)</p>
                </div>
                <span class="header-tag">Mastery Lab · 3x Question 3</span>
            </div>

            <!-- Examiner Protocol Strip for Q3 -->
            <div class="examiner-card" style="margin-bottom: 4px;">
                <div class="examiner-card-title">
                    <span>SENIOR EXAMINER RULE: The 4-Mark Comparison Formula</span>
                    <span>1HI0/11 · Section B Q3 Protocol</span>
                </div>
                <div style="font-size: 7pt; line-height: 1.3;">
                    To score full <strong>4/4 Marks</strong> on Question 3: <strong>1.</strong> State 1 explicit similarity or difference in your opening sentence; <strong>2.</strong> Support with 1 precise historical fact from Period A; <strong>3.</strong> Support with 1 precise historical fact from Period B; <strong>4.</strong> Directly connect both with a comparative connective (<em>whereas, in contrast, similarly</em>). Do NOT write an essay—target 4 to 5 lines maximum!
                </div>
            </div>

            <!-- Drill 1: Similarity Drill -->
            <div class="lab-drill-box">
                <div class="lab-drill-header">
                    <div>
                        <span class="drill-num">DRILL 1 · SIMILARITY</span>
                        <strong>Ideas about Causes of Disease: Medieval England (c1250–c1500) vs Renaissance (c1500–c1700)</strong>
                    </div>
                    <span class="q-marks">[4]</span>
                </div>
                <div class="scaffold-content" style="margin-bottom: 2px;">
                    <span class="scaffold-pill">Core Hook: Miasma / Four Humours</span> <em>Model Stem: "One way in which ideas about causes of disease were similar was the continued belief in miasma; during the Black Death in 1348... similarly during the Great Plague in 1665..."</em>
                </div>
                ${renderLines(5, '6.2mm')}
            </div>

            <!-- Drill 2: Difference Drill -->
            <div class="lab-drill-box">
                <div class="lab-drill-header">
                    <div>
                        <span class="drill-num">DRILL 2 · DIFFERENCE</span>
                        <strong>Disease Prevention: Edward Jenner (1796) vs Louis Pasteur's Germ Theory Vaccines (1880s)</strong>
                    </div>
                    <span class="q-marks">[4]</span>
                </div>
                <div class="scaffold-content" style="margin-bottom: 2px;">
                    <span class="scaffold-pill">Core Hook: Empirical Observation vs Laboratory Science</span> <em>Model Stem: "One difference was that Jenner developed vaccination through empirical observation of cowpox without knowing germs caused disease, whereas Pasteur..."</em>
                </div>
                ${renderLines(5, '6.2mm')}
            </div>

            <!-- Drill 3: Difference Drill -->
            <div class="lab-drill-box">
                <div class="lab-drill-header">
                    <div>
                        <span class="drill-num">DRILL 3 · DIFFERENCE</span>
                        <strong>Hospital Care: Thirteenth-Century Monastic Hospitals vs Nineteenth-Century Nightingale Hospitals</strong>
                    </div>
                    <span class="q-marks">[4]</span>
                </div>
                <div class="scaffold-content" style="margin-bottom: 2px;">
                    <span class="scaffold-pill">Core Hook: Spiritual Care vs Clinical Cure &amp; Sanitation</span> <em>Model Stem: "One key difference was that 13th-century hospitals run by monks focused on spiritual care and rest for travelers, whereas 19th-century hospitals..."</em>
                </div>
                ${renderLines(5, '6.2mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Paired Choice Timed Live Simulation (Page 17)</span>
            <span>Page 16 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 17: SECTION B — PAIRED CHOICE TIMED LIVE SIMULATION       -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Paired Choice Timed Live Simulation · Question 5 OR Question 6 (16+4 Marks · Target: 25 Mins)</p>
                </div>
                <span class="header-tag">Timed Mock · Question 5 or 6</span>
            </div>

            <!-- Authentic Paired Choice Selector Card -->
            <div class="choice-container">
                <div class="choice-banner">
                    <span>EXAM INSTRUCTION: ANSWER EITHER QUESTION 5 OR QUESTION 6. DO NOT ANSWER BOTH.</span>
                    <span>TOTAL: 20 MARKS</span>
                </div>
                <div class="choice-grid">
                    <div class="choice-box">
                        <div class="choice-header">
                            <span class="choice-checkbox">[ &nbsp; ]</span>
                            <strong>OPTION A: QUESTION 5 (c1250–c1700)</strong>
                            <span class="exam-provenance-pill past">Edexcel June 2019</span>
                        </div>
                        <div class="choice-body">
                            'Attempts to prevent illness were completely ineffective between c1250 and c1700.' How far do you agree? Explain your answer.
                            <div style="font-size: 6.8pt; color: #334155; margin-top: 2px;">
                                Stimulus: • The Black Death (1348–49) &nbsp; • The Great Plague in London (1665) &nbsp; <em>(Plus own knowledge)</em>
                            </div>
                        </div>
                    </div>
                    <div class="choice-box">
                        <div class="choice-header">
                            <span class="choice-checkbox">[ &nbsp; ]</span>
                            <strong>OPTION B: QUESTION 6 (c1900–present)</strong>
                            <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        </div>
                        <div class="choice-body">
                            'Understanding of the causes of disease advanced more rapidly in the twentieth century than in any other period.' How far do you agree?
                            <div style="font-size: 6.8pt; color: #334155; margin-top: 2px;">
                                Stimulus: • Discovery of DNA (1953) &nbsp; • Research into lifestyle (Doll &amp; Hill, 1950) &nbsp; <em>(Plus own knowledge)</em>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Scaffold Prompt Strip -->
            <div class="scaffold-bar" style="margin-top: 3px; margin-bottom: 4px;">
                <div class="scaffold-col" style="width: 33%;">
                    <span class="scaffold-label">1. Criteria Judgement</span>
                    <div class="scaffold-content">State your explicit measurement criteria in your opening sentence (e.g. rate of scientific discovery vs real clinical impact).</div>
                </div>
                <div class="scaffold-col" style="width: 34%;">
                    <span class="scaffold-label">2. Balanced Argument</span>
                    <div class="scaffold-content">Devote 1 paragraph to agreeing with the named statement, and 2 paragraphs exploring alternative factors or periods.</div>
                </div>
                <div class="scaffold-col" style="width: 33%;">
                    <span class="scaffold-label">3. Level 4 Clincher</span>
                    <div class="scaffold-content">Your conclusion must resolve the tension: why was one factor ultimately more decisive than the others?</div>
                </div>
            </div>

            <!-- Student Essay Writing Lines: Exactly 24 Lines (4 Paragraphs x 6 Lines) -->
            <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Direct Engagement with Statement / Named Factor</div>
            ${renderLines(6, '6.4mm')}

            <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Counter-Argument / Second Stimulus Factor</div>
            ${renderLines(6, '6.4mm')}

            <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Independent Context Factor (Own Knowledge Beyond Stimulus Points)</div>
            ${renderLines(6, '6.4mm')}

            <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Conclusion: Justified Criteria-Led Final Judgement</div>
            ${renderLines(6, '6.4mm')}
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Section A: The Western Front (Pages 18–29)</span>
            <span>Page 17 of 32</span>
        </div>
    </div>
    '''
