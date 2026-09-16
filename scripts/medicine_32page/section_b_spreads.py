"""
section_b_spreads.py
Renders Pages 2 to 17: Section B Spreads 1 through 8.
All essays strictly feature 6 lines per paragraph.
"""

def render_spread_1():
    """Pages 2 & 3: Medieval Medicine (c1250–c1500)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 2: SECTION B — MEDIEVAL MEDICINE (Q3 & FULL Q4 18 LINES) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Medieval Medicine (c1250–c1500) · Question 3 (Similarity) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · c1250–c1500</span>
            </div>

            <!-- Q3: Similarity -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill past">Edexcel June 2019</span>
                        Explain one way in which ideas about the cause of illness in the Medieval period (c1250–c1500) were similar to ideas about the cause of illness in the Renaissance (c1500–c1700).
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Four Humours</span>
                            <span class="scaffold-pill">Miasma (Bad Air)</span>
                            <span class="scaffold-pill">Galen / Hippocrates</span>
                            <span class="scaffold-pill">1348 Black Death</span>
                            <span class="scaffold-pill">1665 Great Plague</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>One clear similarity was...</em><br>
                            • <em>In the medieval period, physicians believed...</em><br>
                            • <em>Similarly, in the Renaissance...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"One similarity was that both eras believed miasma caused disease; in 1348 people carried sweet herbs to purify bad air, and in 1665 doctors still wore beak masks stuffed with aromatic herbs to ward off the plague."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x6 = 18 Lines) -->
            <div class="question-container" style="margin-top: 3.5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill unexamined">Unexamined Spec Target</span>
                        Explain why there was so little change in medical treatments in Medieval England between c1250 and c1500.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• The Christian Church</strong> &nbsp;&nbsp;
                    <strong>• The continuing influence of Galen and Hippocrates</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Church Dogma</span>
                            <span class="scaffold-pill">Galen Monotheism</span>
                            <span class="scaffold-pill">Dissection Bans</span>
                            <span class="scaffold-pill">Roger Bacon Jailed</span>
                            <span class="scaffold-pill">Bleeding &amp; Purging</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>A primary obstacle to progress was...</em><br>
                            • <em>The Church enforced this by...</em><br>
                            • <em>Consequently, treatments remained...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> The Catholic Church &rarr; <strong>Para 2:</strong> Galen's Unchallenged Authority &rarr; <strong>Para 3:</strong> Lack of Scientific Tech.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: The Influence of the Christian Church (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Galen's Enduring Authority &amp; Humeral Orthodoxy (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — Social Hierarchy &amp; Lack of Scientific Instruments</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 2 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 3: SECTION B — MEDIEVAL MEDICINE (FULL-PAGE Q5/6 ESSAY)  -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>Medieval Medicine (c1250–c1500) · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · c1250–c1500 Essay</span>
            </div>

            <!-- Q5/Q6: Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        'Belief in the Theory of the Four Humours was the most important reason why people failed to treat the Black Death successfully in 1348–49.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Bloodletting and purging (Opposites)</strong> &nbsp;&nbsp;
                    <strong>• Religious explanations and flagellants</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: Four Humours</span> Phlebotomy, purging, hot/cold herbs; weakened patients.<br>
                            <span class="scaffold-pill">Side B: Religion/Miasma</span> God's punishment, flagellation, bad air, sweet herbs.<br>
                            <span class="scaffold-pill">Side C: Filth &amp; Rats</span> Fleas on black rats (Yersinia pestis); total ignorance of microbes.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>On the one hand, humeral theory...</em><br>
                            • <em>However, religious fatalism was more damaging...</em><br>
                            • <em>Crucially, the decisive factor was...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Weigh the <strong>scale of influence</strong>: Did humeral theory fail patients more, or did religious fatalism prevent municipal sanitation?
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Four Humours Bleeding &amp; Purging)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — Religious Explanations, God's Wrath &amp; Flagellants</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — Miasma, Bad Air &amp; Complete Lack of Germ Knowledge</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Which Factor Was Most Decisive?)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Renaissance Medicine (c1500–c1700)</span>
            <span>Page 3 of 32</span>
        </div>
    </div>
    '''

def render_spread_2():
    """Pages 4 & 5: Renaissance Medicine (c1500–c1700)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 4: SECTION B — THE RENAISSANCE (Q3 & FULL Q4 18 LINES)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>The Medical Renaissance (c1500–c1700) · Question 3 (Difference) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · c1500–c1700</span>
            </div>

            <!-- Q3: Difference -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill past">Edexcel June 2018</span>
                        Explain one way in which the response of authorities to the Great Plague (1665) was different from the response of authorities to the Black Death (1348).
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">1348 Black Death</span> No quarantine; church-led prayer; King street order.<br>
                            <span class="scaffold-pill">1665 Great Plague</span> Mayor quarantine; red crosses &amp; watchmen; searchers; mass pits.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Contrast Connectives</span>
                        <div class="scaffold-content">
                            • <em>One clear difference in response was...</em><br>
                            • <em>In 1348, authorities were largely powerless...</em><br>
                            • <em>In contrast, by 1665 the Lord Mayor enforced...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"In contrast to 1348 when authorities took little organized action, by 1665 the Mayor of London enforced systematic quarantine, locking infected families in their homes with red crosses painted on doors and watchmen outside."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x6 = 18 Lines) -->
            <div class="question-container" style="margin-top: 3.5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill past">Edexcel June 2022</span>
                        Explain why there was rapid change in anatomical understanding in the period c1500–c1700.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Andreas Vesalius and The Fabric of the Human Body (1543)</strong> &nbsp;&nbsp;
                    <strong>• The invention of the movable-type printing press (c1450s)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Vesalius (300+ Galen Errors)</span>
                            <span class="scaffold-pill">Human Dissection</span>
                            <span class="scaffold-pill">Movable Type Print</span>
                            <span class="scaffold-pill">William Harvey (1628 Heart)</span>
                            <span class="scaffold-pill">Mechanical Pumps</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>A decisive breakthrough came when...</em><br>
                            • <em>By directly dissecting human corpses, Vesalius...</em><br>
                            • <em>The printing press multiplied this impact by...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> Vesalius &amp; Direct Dissection &rarr; <strong>Para 2:</strong> The Printing Press &amp; Spread of Texts &rarr; <strong>Para 3:</strong> Harvey &amp; Circulation.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: Andreas Vesalius &amp; Empirical Human Dissection (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: The Printing Press &amp; Scientific Standardization (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — William Harvey &amp; Mechanical Heart Circulation (1628)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 4 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 5: SECTION B — THE RENAISSANCE (FULL-PAGE Q5/6 ESSAY)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>The Medical Renaissance (c1500–c1700) · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · c1500–c1700 Essay</span>
            </div>

            <!-- Q5/Q6: Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill specimen">Sample Assessment Material</span>
                        'Thomas Sydenham's work was the most significant turning point in medical care between c1500 and c1700.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• Thomas Sydenham and bedside clinical observation (Observationes Medicae, 1676)</strong> &nbsp;&nbsp;
                    <strong>• The Royal Society and its scientific motto 'Nullius in verba' (1660)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: Sydenham</span> Grouped diseases by symptoms; rejected individual humours; cinchona bark for malaria.<br>
                            <span class="scaffold-pill">Side B: Royal Society</span> Peer review; scientific journal (Philosophical Transactions); empirical method.<br>
                            <span class="scaffold-pill">Side C: Anatomy Titans</span> Vesalius (1543) and Harvey (1628); dismantled Galenic dogma.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>Sydenham was revolutionary because...</em><br>
                            • <em>However, the Royal Society provided institutional scale...</em><br>
                            • <em>Yet neither transformed ordinary patient survival because...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Distinguish between <strong>clinical observation at the bedside</strong> (Sydenham) vs <strong>theoretical anatomy</strong> (Harvey/Vesalius) vs <strong>treatments</strong> (persisting humours).
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Thomas Sydenham &amp; Observation)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — The Royal Society &amp; Institutional Empirical Science</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — Vesalius, Harvey &amp; The Overthrow of Galen</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Theory vs Everyday Practice)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for 18th &amp; 19th Century Surgery (c1700–c1900)</span>
            <span>Page 5 of 32</span>
        </div>
    </div>
    '''

def render_spread_3():
    """Pages 6 & 7: 18th & 19th Century Surgery (c1700–c1900)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 6: SECTION B — 18TH/19TH C SURGERY (Q3 & Q4 18 LINES)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>18th &amp; 19th Century Surgery (c1700–c1900) · Question 3 (Difference) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · c1700–c1900</span>
            </div>

            <!-- Q3: Difference -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Explain one way in which surgical procedures in the 18th century were different from surgical procedures in the late 19th century.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">18th C Surgery</span> Speed-focused (Liston 28s); conscious; apron pus; cautery iron.<br>
                            <span class="scaffold-pill">Late 19th C Surgery</span> Anaesthesia (chloroform); antiseptic carbolic spray (Lister); aseptic gowns/gloves.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Contrast Connectives</span>
                        <div class="scaffold-content">
                            • <em>A fundamental difference lay in...</em><br>
                            • <em>In the 18th century, speed was paramount because...</em><br>
                            • <em>In contrast, by the 1890s surgeons operated...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"One major difference was the control of infection: in the 18th century, surgeons operated in blood-stained frock coats with unsterilized tools, whereas by the late 19th century, Joseph Lister's carbolic acid spray and aseptic autoclaves eliminated bacteria."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x6 = 18 Lines) -->
            <div class="question-container" style="margin-top: 3.5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill past">Edexcel June 2023</span>
                        Explain why there was rapid change in surgical treatments in Britain between 1840 and 1900.
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• James Simpson and chloroform (1847)</strong> &nbsp;&nbsp;
                    <strong>• Joseph Lister and carbolic acid (1867)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">James Simpson (1847)</span>
                            <span class="scaffold-pill">Queen Victoria (1853)</span>
                            <span class="scaffold-pill">Joseph Lister (Carbolic)</span>
                            <span class="scaffold-pill">Aseptic Surgery (1890s)</span>
                            <span class="scaffold-pill">Steam Autoclaves</span>
                            <span class="scaffold-pill">Catgut Ligatures</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>The breakthrough of anaesthesia allowed...</em><br>
                            • <em>However, longer operations triggered the 'Black Period' until...</em><br>
                            • <em>Ultimately, aseptic methods ensured...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> Simpson &amp; Chloroform (Pain) &rarr; <strong>Para 2:</strong> Lister &amp; Carbolic Acid (Infection) &rarr; <strong>Para 3:</strong> Aseptic Surgery &amp; Ligatures.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: James Simpson &amp; The Conquest of Pain (Anaesthesia) (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Joseph Lister &amp; Antiseptic Surgery (Defeating Infection) (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — Aseptic Surgery (Steam Autoclaves, Rubber Gloves &amp; Gowns)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 6 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 7: SECTION B — 18TH/19TH C SURGERY (FULL-PAGE Q5/6 ESSAY)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>18th &amp; 19th Century Medicine · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · c1700–c1900 Essay</span>
            </div>

            <!-- Q5/Q6: Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill past">Edexcel November 2020</span>
                        'Pasteur's publication of the Germ Theory in 1861 was the most important turning point in the treatment of illness in the period c1700–present.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• The Public Health Act of 1875</strong> &nbsp;&nbsp;
                    <strong>• The development of penicillin (1928–1940s)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: Germ Theory</span> Ended spontaneous generation; Koch identified microbes; antiseptic surgery.<br>
                            <span class="scaffold-pill">Side B: 1875 Public Health</span> Compulsory clean water, sewers, street cleaning; mass preventative impact.<br>
                            <span class="scaffold-pill">Side C: Penicillin</span> Fleming (1928), Florey &amp; Chain (1941); first mass cure for internal bacterial infection.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>While Germ Theory provided the scientific cause...</em><br>
                            • <em>Nevertheless, it did not immediately cure patients until...</em><br>
                            • <em>Therefore, the practical turning point was...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Distinguish between <strong>theoretical understanding</strong> (identifying microbes) vs <strong>practical treatment</strong> (curing patients with antibiotics).
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (Pasteur's Germ Theory &amp; Koch)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — The 1875 Public Health Act &amp; Municipal Sanitation (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — 20th Century Antibiotics (Fleming, Florey &amp; Chain) (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Lab Science vs Mass Public Survival)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for 18th &amp; 19th Century Public Health &amp; Cholera</span>
            <span>Page 7 of 32</span>
        </div>
    </div>
    '''

def render_spread_4():
    """Pages 8 & 9: 18th & 19th Century Public Health & Cholera (NEW SPREAD)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 8: SECTION B — 19TH C PUBLIC HEALTH (Q3 & Q4 18 LINES)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>18th &amp; 19th Century Public Health · Question 3 (Similarity) &amp; Question 4 (Explain Why)</p>
                </div>
                <span class="header-tag">Section B · Public Health</span>
            </div>

            <!-- Q3: Similarity -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">3</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Explain one way in which the Public Health Act of 1848 was similar to the Public Health Act of 1875.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">1848 Act</span> General Board of Health; town councils permitted to set up local boards; clean water.<br>
                            <span class="scaffold-pill">1875 Act</span> Compulsory clean water, sewers, medical officers, street lighting, food inspectors.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 28%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>One clear similarity was...</em><br>
                            • <em>Both acts aimed to tackle urban filth by...</em><br>
                            • <em>Similarly, each statute empowered councils to...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 40%;">
                        <span class="scaffold-label">Model Sentence / Answer Guide (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <em>"One clear similarity was that both statutes recognized the duty of government to improve sanitation; both the 1848 and 1875 Acts provided local authorities with the legal powers to supply clean water and manage sewer systems to reduce epidemic disease."</em>
                        </div>
                    </div>
                </div>

                ${renderLines(5, '7.2mm')}
            </div>

            <!-- Q4: Explain Why (Complete with 3x6 = 18 Lines) -->
            <div class="question-container" style="margin-top: 3.5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">4</span>
                        <span class="exam-provenance-pill past">Edexcel June 2021</span>
                        Explain why there was a major change in government action on public health in the second half of the nineteenth century (1850–1900).
                    </div>
                    <span class="q-marks">[12]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• John Snow and the Broad Street pump (1854)</strong> &nbsp;&nbsp;
                    <strong>• The Public Health Act of 1875</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Factor Bank (AO1)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">John Snow (1854 Cholera)</span>
                            <span class="scaffold-pill">Great Stink (1858)</span>
                            <span class="scaffold-pill">Bazalgette Sewers</span>
                            <span class="scaffold-pill">1867 Reform Act</span>
                            <span class="scaffold-pill">Pasteur Germ Theory 1861</span>
                            <span class="scaffold-pill">Compulsory 1875 Act</span>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Causal Connectives</span>
                        <div class="scaffold-content">
                            • <em>Scientific proof defeated miasma when...</em><br>
                            • <em>Crucially, the extension of the vote in 1867 meant...</em><br>
                            • <em>Consequently, laissez-faire was abandoned for...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">3 P-E-E Paragraph Plan</span>
                        <div class="scaffold-content">
                            <strong>Para 1:</strong> John Snow &amp; Water Contamination &rarr; <strong>Para 2:</strong> Compulsory 1875 Legislation &rarr; <strong>Para 3:</strong> 1867 Enfranchisement &amp; Bazalgette.
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Paragraph 1: John Snow &amp; The Disproof of Miasma (Stimulus 1)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: The Public Health Act of 1875 &amp; The End of Laissez-Faire (Stimulus 2)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Own Knowledge — Working-Class Enfranchisement (1867) &amp; Bazalgette's Sewers</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 5/6 Statement Essay (Full Page)</span>
            <span>Page 8 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 9: SECTION B — 19TH C PUBLIC HEALTH (FULL-PAGE Q5/6 ESSAY)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Medicine in Britain, c1250–present</h2>
                    <p>18th &amp; 19th Century Public Health · Question 5/6 Statement Essay (16+4 Marks)</p>
                </div>
                <span class="header-tag">Section B · Public Health Essay</span>
            </div>

            <!-- Q5/Q6: Statement Essay -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">5 / 6</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        'John Snow's investigation of cholera in 1854 was the main reason why public health improved in nineteenth-century Britain.' How far do you agree? Explain your answer.
                    </div>
                    <span class="q-marks">[16+4]</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer: &nbsp;
                    <strong>• The Broad Street pump investigation (1854)</strong> &nbsp;&nbsp;
                    <strong>• Joseph Bazalgette and the London sewer network (1858–1875)</strong> &nbsp;&nbsp;
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 38%;">
                        <span class="scaffold-label">Argument Bank (AO1/AO2)</span>
                        <div class="scaffold-content">
                            <span class="scaffold-pill">Side A: John Snow</span> Spot map; removed pump handle; proved waterborne contagion before Germ Theory.<br>
                            <span class="scaffold-pill">Side B: Bazalgette</span> 1,100 miles of street sewers; 82 miles of intercepting sewers; Great Stink 1858.<br>
                            <span class="scaffold-pill">Side C: State Action</span> Edwin Chadwick's 1842 report; 1875 Act making clean water and sewer checks mandatory.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 32%;">
                        <span class="scaffold-label">Evaluative Connectives</span>
                        <div class="scaffold-content">
                            • <em>Snow provided the decisive medical proof...</em><br>
                            • <em>However, evidence was useless without massive civil engineering...</em><br>
                            • <em>Ultimately, statutory government coercion was decisive because...</em>
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 30%;">
                        <span class="scaffold-label">Criteria-Led Judgement</span>
                        <div class="scaffold-content">
                            Weigh <strong>epidemiological evidence</strong> (Snow) vs <strong>physical infrastructure</strong> (Bazalgette) vs <strong>national enforcement</strong> (1875 Act).
                        </div>
                    </div>
                </div>

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5px;">Introduction &amp; Paragraph 1: Agree with Named Factor (John Snow's Broad Street Investigation)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 2: Counter-Factor — Joseph Bazalgette &amp; Civil Engineering (London Sewers)</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Paragraph 3: Alternative Factor — Chadwick's 1842 Report &amp; The Compulsory 1875 Act</div>
                ${renderLines(6, '6.4mm')}

                <div style="font-size: 7.1pt; font-weight: 800; text-transform: uppercase; margin-top: 2.5px; margin-bottom: 1.5px;">Conclusion: Supported Final Judgement (Criteria: Scientific Proof vs Statutory Enforcement)</div>
                ${renderLines(6, '6.4mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Modern Britain: Penicillin &amp; NHS (Pages 10–11)</span>
            <span>Page 9 of 32</span>
        </div>
    </div>
    '''
