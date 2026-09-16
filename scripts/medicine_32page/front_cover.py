"""
front_cover.py
Renders Page 1: Front Cover & 32-Row Question Tracker.
"""

def render_page_1():
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 1: FRONT COVER & MASTER 32-ROW EXAM TRACKER TABLE        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="edexcel-banner">Pearson Edexcel GCSE (9–1)</div>

            <!-- Clean Exam Header Box with Time & Marks -->
            <div class="exam-header-box">
                <div class="exam-header-left">
                    <div class="exam-date">History · Paper 1: Thematic Study &amp; Historic Environment</div>
                    <div class="exam-time">Time: 1 hour 15 minutes (Full Mock Simulation / Guided Practice) · Total Marks: 52</div>
                    <div class="exam-subject">Medicine in Britain, c1250–present and The British Sector of the Western Front, 1914–18</div>
                    <div class="exam-booklet">Complete 32-Page Mastery Exam Compendium</div>
                    <div class="exam-subtopic">Option 11 · Section B (Thematic Study, c1250–present) &amp; Section A (Historic Environment, 1914–18)</div>
                </div>
                <div class="exam-header-right">
                    <div class="ref-label">Paper<br>reference</div>
                    <div class="ref-code">1HI0/11</div>
                </div>
            </div>

            <!-- Expanded 32-Row Master Assessment Tracker -->
            <div class="tracker-card">
                <div class="tracker-header">
                    <span class="tracker-title">Complete 32-Page Specification Practice Tracker &amp; Homework Audit</span>
                    <span class="tracker-sub">Track marks achieved across Section B (c1250–present) &amp; Section A (Western Front)</span>
                </div>
                <table class="tracker-table">
                    <thead>
                        <tr>
                            <th style="width: 22%;">HW Set / Due</th>
                            <th style="width: 17%;">Question &amp; Format</th>
                            <th style="width: 43%;">Specification Focus &amp; Historical Content</th>
                            <th style="width: 5%; text-align: center;">Page</th>
                            <th style="width: 5%; text-align: center;">Marks</th>
                            <th style="width: 8%; text-align: center;">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Section B: Medieval -->
                        <tr class="tracker-section-hdr"><td colspan="6">Section B: Medieval Medicine (c1250–c1500)</td></tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Similarity</span></td>
                            <td>Ideas about cause of illness (Medieval vs Renaissance continuity)</td>
                            <td class="page-cell">2</td><td class="marks-cell">4</td><td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Continuity in medical treatments in Medieval England (Church &amp; Galen)</td>
                            <td class="page-cell">2</td><td class="marks-cell">12</td><td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Theory of Four Humours as dominant medical foundation (c1250–c1500)</td>
                            <td class="page-cell">3</td><td class="marks-cell">16+4</td><td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: Renaissance -->
                        <tr class="tracker-section-hdr"><td colspan="6">Section B: Renaissance Medicine (c1500–c1700)</td></tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Difference</span></td>
                            <td>Responses to Black Death (1348) vs Great Plague (1665)</td>
                            <td class="page-cell">4</td><td class="marks-cell">4</td><td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Rapid change in anatomical understanding (Vesalius &amp; Printing Press)</td>
                            <td class="page-cell">4</td><td class="marks-cell">12</td><td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Thomas Sydenham's observation vs Royal Society vs Vesalius/Harvey</td>
                            <td class="page-cell">5</td><td class="marks-cell">16+4</td><td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: 18th & 19th C Surgery -->
                        <tr class="tracker-section-hdr"><td colspan="6">Section B: 18th &amp; 19th Century Surgery (c1700–c1900)</td></tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Difference</span></td>
                            <td>Surgery in 18th C vs late 19th C antiseptic operating theatres</td>
                            <td class="page-cell">6</td><td class="marks-cell">4</td><td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Rapid transformation in surgery 1840–1900 (Simpson, Lister, Asepsis)</td>
                            <td class="page-cell">6</td><td class="marks-cell">12</td><td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Pasteur's Germ Theory vs 1875 Public Health Act vs Antibiotics</td>
                            <td class="page-cell">7</td><td class="marks-cell">16+4</td><td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: 18th & 19th C Public Health (NEW) -->
                        <tr class="tracker-section-hdr"><td colspan="6">Section B: 18th &amp; 19th Century Public Health &amp; Cholera</td></tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Similarity</span></td>
                            <td>Public health legislation: 1848 Public Health Act vs 1875 Act</td>
                            <td class="page-cell">8</td><td class="marks-cell">4</td><td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Government involvement in public health 1850–1900 (Chadwick, Snow, 1875 Act)</td>
                            <td class="page-cell">8</td><td class="marks-cell">12</td><td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>John Snow's Broad Street cholera work vs 1875 Act vs Bazalgette's Sewers</td>
                            <td class="page-cell">9</td><td class="marks-cell">16+4</td><td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: Modern Britain -->
                        <tr class="tracker-section-hdr"><td colspan="6">Section B: Modern Britain: Antibiotics &amp; The NHS (c1900–present)</td></tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Difference</span></td>
                            <td>Early 20th C magic bullets (Salvarsan 606) vs modern antibiotics</td>
                            <td class="page-cell">10</td><td class="marks-cell">4</td><td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Mass production of penicillin 1938–45 (Florey, Chain, US Govt)</td>
                            <td class="page-cell">10</td><td class="marks-cell">12</td><td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Aneurin Bevan &amp; The NHS (1948) vs DNA Structure vs High-Tech Care</td>
                            <td class="page-cell">11</td><td class="marks-cell">16+4</td><td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: 21st C Science & Prevention (NEW) -->
                        <tr class="tracker-section-hdr"><td colspan="6">Section B: 21st Century Science, Genetics &amp; Prevention</td></tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Difference</span></td>
                            <td>19th C diagnostic methods vs 20th C imaging technology (CT/MRI)</td>
                            <td class="page-cell">12</td><td class="marks-cell">4</td><td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Rapid developments in disease prevention after 1900 (Vaccines &amp; Lifestyle)</td>
                            <td class="page-cell">12</td><td class="marks-cell">12</td><td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>DNA discovery (1953) vs Mass Penicillin vs Foundation of the NHS</td>
                            <td class="page-cell">13</td><td class="marks-cell">16+4</td><td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section B: Synoptic & Mastery -->
                        <tr class="tracker-section-hdr"><td colspan="6">Section B: Synoptic &amp; Cross-Period Thematic Mastery</td></tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 · Similarity</span></td>
                            <td>Government intervention: 1348 Black Death vs 1848 Cholera</td>
                            <td class="page-cell">14</td><td class="marks-cell">4</td><td class="score-cell">[ &nbsp; ] / 4</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q4 · Explain Why</span></td>
                            <td>Role of Science &amp; Technology across medicine c1250–present</td>
                            <td class="page-cell">14</td><td class="marks-cell">12</td><td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 · Statement Essay</span></td>
                            <td>Individual genius vs Government action in medical progress c1500–present</td>
                            <td class="page-cell">15</td><td class="marks-cell">16+4</td><td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q3 Mastery Lab</span></td>
                            <td>The 4-Mark Comparison Lab: 3 Cross-Period Pairing Drills</td>
                            <td class="page-cell">16</td><td class="marks-cell">12</td><td class="score-cell">[ &nbsp; ] / 12</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Q5/6 Paired Choice</span></td>
                            <td>Section B Timed Simulation: Paired Choice Strategy &amp; Live Mock</td>
                            <td class="page-cell">17</td><td class="marks-cell">16+4</td><td class="score-cell">[ &nbsp; ] / 20</td>
                        </tr>

                        <!-- Section A: Western Front Sets 1 to 4 -->
                        <tr class="tracker-section-hdr"><td colspan="6">Section A: The Western Front, 1914–18 (Historic Environment)</td></tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Set 1 · Features &amp; Q2b</span></td>
                            <td>Somme: Features of CCS/Field Amb. &amp; Transport Follow-up Grid</td>
                            <td class="page-cell">18</td><td class="marks-cell">8</td><td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Set 1 · Q2a Utility</span></td>
                            <td>Somme: Sources A &amp; B Utility (Rev. Davies vs Vera Brittain VAD)</td>
                            <td class="page-cell">19–20</td><td class="marks-cell">8</td><td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Set 2 · Features &amp; Q2b</span></td>
                            <td>Ypres: Features of Gas/Gangrene &amp; Passchendaele Stretcher Relays</td>
                            <td class="page-cell">21</td><td class="marks-cell">8</td><td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Set 2 · Q2a Utility</span></td>
                            <td>Ypres: Sources C &amp; D Utility (8th Field Amb. vs Sister Luard QAIMNS)</td>
                            <td class="page-cell">22–23</td><td class="marks-cell">8</td><td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Set 3 · Features &amp; Q2b</span></td>
                            <td>Arras: Thompson Cave Hospital, Carrel-Dakin &amp; Tunnel Record Grid</td>
                            <td class="page-cell">24</td><td class="marks-cell">8</td><td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Set 3 · Q2a Utility</span></td>
                            <td>Arras: Sources E &amp; F Utility (Major Myers RAMC vs IWM Tunnel Photo)</td>
                            <td class="page-cell">25–26</td><td class="marks-cell">8</td><td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Set 4 · Features &amp; Q2b</span></td>
                            <td>Cambrai: Blood Transfusion, Thomas Splint &amp; Medical Diary Follow-up</td>
                            <td class="page-cell">27</td><td class="marks-cell">8</td><td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Set: _________ &nbsp; Due: _________</td>
                            <td><span class="q-format-tag">Set 4 · Q2a Utility</span></td>
                            <td>Cambrai: Sources G &amp; H Utility (Capt. Robertson Blood vs Orderly Splint)</td>
                            <td class="page-cell">28–29</td><td class="marks-cell">8</td><td class="score-cell">[ &nbsp; ] / 8</td>
                        </tr>

                        <!-- Examiner Protocols & Spec Audit -->
                        <tr class="tracker-section-hdr"><td colspan="6">Reference &amp; Official Examiner Protocols</td></tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Independent Revision</td>
                            <td><span class="q-format-tag">Masterclass &amp; Matrix</span></td>
                            <td>Primary Source Provenance Typology (p. 30) &amp; Examiner Pitfalls (p. 31)</td>
                            <td class="page-cell">30–31</td><td class="marks-cell">—</td><td class="score-cell">MASTERED</td>
                        </tr>
                        <tr class="tracker-row">
                            <td class="hw-cell">Specification Mastery</td>
                            <td><span class="q-format-tag">Specification Audit</span></td>
                            <td>Word-for-word syllabus checklist covering Option 11 in its entirety</td>
                            <td class="page-cell">32</td><td class="marks-cell">—</td><td class="score-cell">AUDITED</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Section B: Medieval Medicine (c1250–c1500)</span>
            <span>Page 1 of 32</span>
        </div>
    </div>
    '''
