"""
section_a_sets.py
Contains Section A Sets 1 through 4 (Pages 18 to 29):
- Set 1 (pp. 18–20): Somme (1916) & Evacuation Chain
- Set 2 (pp. 21–23): Ypres (1915/17) & Gas Warfare / Mud
- Set 3 (pp. 24–26): Arras Underground Hospital & Wound Infection (NEW)
- Set 4 (pp. 27–29): Cambrai Blood Depots & Trench System Injuries (NEW)
"""

def render_section_a_set_1():
    """Pages 18–20: Western Front Set 1 (Somme 1916 & Evacuation Chain)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 18: SECTION A — WESTERN FRONT SET 1 (Q1 & BLANK Q2b)     -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Questions 1(a), 1(b) (Features) &amp; Question 2(b) (Follow-Up)</p>
                </div>
                <span class="header-tag">Section A · Set 1</span>
            </div>

            <!-- Q1(a): Feature 1 -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (a)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2018</span>
                        Describe one feature of the work of Casualty Clearing Stations (CCS) on the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Located 7–12 miles behind frontline near railway lines; staffed by RAMC doctors and QAIMNS nurses; performed triage (walking wounded, urgent surgery, beyond help); did life-saving amputations.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State clear historical role in sentence 1 &rarr; <strong>Detail:</strong> Support with 1 precise fact, statistic, or procedure in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q1(b): Feature 2 -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (b)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2019</span>
                        Describe one feature of the use of the Thomas splint on the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Designed by Hugh Owen Thomas; applied at Regimental Aid Posts; rigid steel frame pulled leg straight to prevent bone ends grinding and cutting femoral artery; reduced fracture mortality from 80% to 20%.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State medical function in sentence 1 &rarr; <strong>Detail:</strong> Support with mortality drop (80% to 20%) or mechanical traction detail in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q2(b): 4-Part Follow-Up Grid (100% BLANK FOR STUDENT COMPLETION) -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (b)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2018</span>
                        Study Source B (on Page 19). How could you follow up Source B to find out more about the severe conditions faced by medical staff at Base Hospitals? Complete the table below.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <table class="follow-up-table">
                    <tr>
                        <td>Detail in Source B that I would follow up:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>Question I would ask:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>What type of source I would use:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>How this source would help me answer my question:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                </table>

                <div style="border: 1px solid #000000; background: #f8fafc; border-radius: 2px; padding: 3px 6px; font-size: 6.8pt; margin-top: 5px;">
                    <strong>Enquiry Verification Checklist:</strong> [ ] Direct quote from Source B selected; [ ] Question directly links to quote; [ ] Realistic historical source named (e.g. Base Hospital War Diary or RAMC inspection log); [ ] Clear purpose explained.
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 2(a) Source Utility (Sources A &amp; B)</span>
            <span>Page 18 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 19: SECTION A — WESTERN FRONT SET 1 (Q2a SOURCES & SCAFF)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Source Utility Enquiry (Sources A &amp; B)</p>
                </div>
                <span class="header-tag">Section A · Set 1</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (a)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2018</span>
                        Study Sources A and B. How useful are Sources A and B for an enquiry into the challenges of treating casualties on the Western Front? Explain your answer, using Sources A and B and your knowledge of the historical context.
                    </div>
                    <span class="q-marks">[8]</span>
                </div>

                <!-- Side-by-Side Archival Primary Source Display -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 5px;">
                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source A</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Somme CCS</span>
                        </div>
                        <div class="archival-source-body">
                            "The casualties have started to arrive... The volume of wounded men is overwhelming; every bed and stretcher is occupied, and men are fortunate just to find a spot on the bare ground. Many will pass away before surgery is possible. We have admitted over 1,500 casualties in twenty-four hours, and the stream has not stopped."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From the personal wartime diary of the Reverend Arthur Davies, an army chaplain stationed at a Casualty Clearing Station during the Battle of the Somme, July 1916.
                        </div>
                    </div>

                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source B</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Base Hospital</span>
                        </div>
                        <div class="archival-source-body">
                            "Our morning duties begin at 3.30 am! The freezing temperatures are unbearable. Icicles hang thick over ward windows. Even kettles, rubber hot water bottles, and sponges have frozen solid. The pipes freeze entirely, meaning we must strictly ration the water provided to the wounded."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From a private letter written by Edith Smith, a VAD (Voluntary Aid Detachment) nurse serving at a British Base Hospital near Boulogne, December 1917.
                        </div>
                    </div>
                </div>

                <!-- Provenance Clues Scaffolding Card (Per AGENTS.md Rule) -->
                <div class="provenance-card">
                    <strong style="text-transform: uppercase; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2.5px;">
                        Provenance Clues (Author, Audience, Motive) — Consider Before Writing:
                    </strong>
                    <div style="font-size: 6.8pt; line-height: 1.25;">
                        • <strong>Source A (Chaplain Davies):</strong> Eyewitness chaplain at a CCS during the peak of the Somme (July 1916). <em>Motive:</em> Private diary recording immediate emotional and physical strain of 1,500 casualties arriving; highly reliable for firsthand volume, though written under immense pressure without official statistics.<br>
                        • <strong>Source B (Edith Smith):</strong> Frontline VAD nurse writing a personal letter home from a Base Hospital in winter 1917. <em>Motive:</em> Candid description of extreme winter freezing and water rationing; highly useful for everyday environmental hardships, though localized to one coastal hospital.
                    </div>
                </div>

                <!-- C-O-P Examination Scaffold Bar -->
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 34%;">
                        <span class="scaffold-label">C — Content &amp; Quote</span>
                        <div class="scaffold-content">
                            Identify specific details (1,500 casualties, bare ground, frozen pipes, water rationing) and explain what they reveal about medical strain.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">O — Own Knowledge</span>
                        <div class="scaffold-content">
                            Corroborate with precise context: 57,000 casualties on Day 1 of Somme; CCS capacity was ~1,000; winter 1917 was coldest in 40 years.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">P — Provenance (NOP)</span>
                        <div class="scaffold-content">
                            Evaluate Nature (diary vs letter), Origin (eyewitness chaplain vs nurse), and Purpose. Weigh typicality vs limitations.
                        </div>
                    </div>
                </div>

                <!-- Paragraph 1: Source A Analysis directly on Page 19 -->
                <div class="utility-response-block" style="margin-top: 5px;">
                    <div class="utility-para-header">
                        <strong>Paragraph 1: Analysis of Source A (Content + Contextual Knowledge + Provenance)</strong>
                        <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                    </div>
                    <div class="starters-box">
                        <div class="starter-point"><strong>• Content Starter:</strong> <em>Source A is useful for an enquiry into casualty treatment because it shows that...</em></div>
                        <div class="starter-point"><strong>• Context Starter:</strong> <em>From my own historical knowledge, this is accurate because during the 1916 Somme offensive...</em></div>
                        <div class="starter-point"><strong>• Provenance Starter:</strong> <em>The utility of Source A is affected by its provenance because as an eyewitness chaplain's diary...</em></div>
                    </div>
                    ${renderLines(11, '7.2mm')}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Paragraph 2 (Source B Analysis &amp; Synthesis)</span>
            <span>Page 19 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 20: SECTION A — WESTERN FRONT SET 1 (Q2a FULL WRITING L) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Student Writing Response Lines</p>
                </div>
                <span class="header-tag">Section A · Set 1 Writing</span>
            </div>

            <!-- Full Page dedicated to Paragraph 2: Source B Analysis & Comparative Synthesis -->
            <div class="utility-response-block">
                <div class="utility-para-header">
                    <strong>Paragraph 2: Analysis of Source B &amp; Comparative Judgement (Content + Knowledge + Provenance)</strong>
                    <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                </div>
                <div class="starters-box">
                    <div class="starter-point"><strong>• Content Starter:</strong> <em>Source B is also useful because it highlights the severe environmental difficulties...</em></div>
                    <div class="starter-point"><strong>• Context Starter:</strong> <em>This is corroborated by historical evidence that Base Hospitals in winter 1917 faced...</em></div>
                    <div class="starter-point"><strong>• Provenance &amp; Synthesis:</strong> <em>As a personal letter home from a VAD nurse, the provenance... Overall, Source [A/B] is more useful because...</em></div>
                </div>
                ${renderLines(19, '7.2mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Western Front Set 2: Ypres (Pages 21–23)</span>
            <span>Page 20 of 32</span>
        </div>
    </div>
    '''

def render_section_a_set_2():
    """Pages 21–23: Western Front Set 2 (Ypres 1915/17 & Gas Warfare / Mud)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 21: SECTION A — WESTERN FRONT SET 2 (Q1 & BLANK Q2b)     -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Questions 1(a), 1(b) (Features) &amp; Question 2(b) (Follow-Up)</p>
                </div>
                <span class="header-tag">Section A · Set 2</span>
            </div>

            <!-- Q1(a): Feature 1 -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (a)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Describe one feature of mobile X-ray units used in the British sector of the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            6 mobile X-ray vans deployed by RAMC in British sector; located at CCS; transported X-ray tubes in padded vans; used to locate shrapnel and bullets inside flesh before surgery; tubes overheated quickly.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State diagnostic role in sentence 1 &rarr; <strong>Detail:</strong> Add specific technological detail (van transport, overheating tubes, or CCS location) in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q1(b): Feature 2 -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (b)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2022</span>
                        Describe one feature of trench fever on the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Caused by micro-organisms living in body lice feces; produced severe headaches, high fever, and disabling bone pain in shins; affected ~15% of men; led to bathhouses and steam delousing machines.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State lice cause or flu-like symptoms in sentence 1 &rarr; <strong>Detail:</strong> Add delousing stations or 15% casualty impact in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q2(b): 4-Part Follow-Up Grid (100% BLANK FOR STUDENT COMPLETION) -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (b)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Study this extract from an RAMC officer at Ypres (1915): <em>"The chlorine gas casualties stumbled in clutching their throats. We washed their blinded eyes with bicarbonate of soda solutions, but many died from asphyxiation."</em> How could you follow up this extract to find out more about treatments for gas attacks on the Western Front? Complete the table below.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <table class="follow-up-table">
                    <tr>
                        <td>Detail in extract that I would follow up:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>Question I would ask:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>What type of source I would use:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>How this source would help me answer my question:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                </table>

                <div style="border: 1px solid #000000; background: #f8fafc; border-radius: 2px; padding: 3px 6px; font-size: 6.8pt; margin-top: 5px;">
                    <strong>Enquiry Verification Checklist:</strong> [ ] Direct quote from gas extract selected; [ ] Focused clinical enquiry question; [ ] Official RAMC Casualty Admission Book or War Office Bulletin named; [ ] Precise evaluative purpose.
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 2(a) Set 2 (Sources C &amp; D)</span>
            <span>Page 21 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 22: SECTION A — WESTERN FRONT SET 2 (Q2a SOURCES & SCAFF)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Source Utility Enquiry (Sources C &amp; D)</p>
                </div>
                <span class="header-tag">Section A · Set 2</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (a)</span>
                        <span class="exam-provenance-pill past">Edexcel November 2020</span>
                        Study Sources C and D. How useful are Sources C and D for an enquiry into the transport and evacuation of wounded soldiers on the Western Front? Explain your answer, using Sources C and D and your knowledge of the historical context.
                    </div>
                    <span class="q-marks">[8]</span>
                </div>

                <!-- Side-by-Side Archival Primary Source Display -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 5px;">
                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source C</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Field Ambulance Log</span>
                        </div>
                        <div class="archival-source-body">
                            "The mud in the Ypres Salient makes stretcher bearing almost impossible. It takes four or six bearers to carry one stretcher through waist-deep slime. The wooden duckboards have been blasted away by German artillery. Yesterday it took our squad four hours to move two casualties just one mile back to the dressing station."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From the official war diary of a British RAMC Field Ambulance unit operating during the Third Battle of Ypres (Passchendaele), August 1917.
                        </div>
                    </div>

                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source D</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Ambulance Train Log</span>
                        </div>
                        <div class="archival-source-body">
                            "The ambulance train arrived at midnight carrying 400 lying cases directly from the clearing station. The train is fitted with sprung cots and electric lighting, but the stench of gangrene and damp uniforms is overpowering. Medical orderlies worked continuously dressing wounds and administering hot tea."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From the wartime journal of Sister Kate Luard, a nursing sister serving aboard British RAMC Ambulance Trains between the Somme and Base Hospitals at the French coast, 1916.
                        </div>
                    </div>
                </div>

                <!-- Provenance Clues Scaffolding Card (Per AGENTS.md Rule) -->
                <div class="provenance-card">
                    <strong style="text-transform: uppercase; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2.5px;">
                        Provenance Clues (Author, Audience, Motive) — Consider Before Writing:
                    </strong>
                    <div style="font-size: 6.8pt; line-height: 1.25;">
                        • <strong>Source C (RAMC Field Ambulance Diary):</strong> Official frontline operational log written by stretcher-bearer commanders at Passchendaele (1917). <em>Motive:</em> Recording military logistics and delay factors; highly factual regarding physical mud barriers, though focused strictly on frontline sector transport.<br>
                        • <strong>Source D (Sister Kate Luard Journal):</strong> Experienced nursing sister serving on specialized ambulance trains. <em>Motive:</em> Eyewitness clinical observation of intermediate evacuation between CCS and Base Hospitals; highly valuable for understanding rail medical care, though limited to train-borne patients.
                    </div>
                </div>

                <!-- C-O-P Examination Scaffold Bar -->
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 34%;">
                        <span class="scaffold-label">C — Content &amp; Quote</span>
                        <div class="scaffold-content">
                            Extract specific evidence (waist-deep slime, 4 hours for 1 mile, 400 cases on sprung cots, gangrene stench) and analyse logistical hurdles.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">O — Own Knowledge</span>
                        <div class="scaffold-content">
                            Integrate evacuation chain: RAP &rarr; Dressing Station &rarr; CCS &rarr; Ambulance Train &rarr; Base Hospital. Mention motor ambulances and canal barges.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">P — Provenance (NOP)</span>
                        <div class="scaffold-content">
                            Contrast operational field log (Source C) with clinical nursing journal (Source D). Weigh author authority and scope of evidence.
                        </div>
                    </div>
                </div>

                <!-- Paragraph 1: Source C Analysis directly on Page 22 -->
                <div class="utility-response-block" style="margin-top: 5px;">
                    <div class="utility-para-header">
                        <strong>Paragraph 1: Analysis of Source C (Content + Contextual Knowledge + Provenance)</strong>
                        <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                    </div>
                    <div class="starters-box">
                        <div class="starter-point"><strong>• Content Starter:</strong> <em>Source C is useful for an enquiry into frontline transport because it shows that...</em></div>
                        <div class="starter-point"><strong>• Context Starter:</strong> <em>From my own knowledge, this reflects the extreme conditions during Third Ypres (Passchendaele)...</em></div>
                        <div class="starter-point"><strong>• Provenance Starter:</strong> <em>The utility of Source C is influenced by its nature as an official RAMC Field Ambulance War Diary...</em></div>
                    </div>
                    ${renderLines(11, '7.2mm')}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Paragraph 2 (Source D Analysis &amp; Synthesis)</span>
            <span>Page 22 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 23: SECTION A — WESTERN FRONT SET 2 (Q2a FULL WRITING L) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Student Writing Response Lines</p>
                </div>
                <span class="header-tag">Section A · Set 2 Writing</span>
            </div>

            <!-- Full Page dedicated to Paragraph 2: Source D Analysis & Comparative Judgement -->
            <div class="utility-response-block">
                <div class="utility-para-header">
                    <strong>Paragraph 2: Analysis of Source D &amp; Comparative Judgement (Content + Knowledge + Provenance)</strong>
                    <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                </div>
                <div class="starters-box">
                    <div class="starter-point"><strong>• Content Starter:</strong> <em>Source D is also useful because it details the next stage of the evacuation chain...</em></div>
                    <div class="starter-point"><strong>• Context Starter:</strong> <em>Specifically, my knowledge confirms that specialized ambulance trains were vital because...</em></div>
                    <div class="starter-point"><strong>• Provenance &amp; Synthesis:</strong> <em>Sister Luard's firsthand clinical perspective makes this source... Overall, both sources are mutually useful because...</em></div>
                </div>
                ${renderLines(19, '7.2mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Western Front Set 3: Arras (Pages 24–26)</span>
            <span>Page 23 of 32</span>
        </div>
    </div>
    '''

def render_section_a_set_3():
    """Pages 24–26: Western Front Set 3 (Arras Underground Hospitals & Wound Infection)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 24: SECTION A — WESTERN FRONT SET 3 (Q1 & BLANK Q2b)     -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Questions 1(a), 1(b) (Features) &amp; Question 2(b) (Follow-Up)</p>
                </div>
                <span class="header-tag">Section A · Set 3</span>
            </div>

            <!-- Q1(a): Feature 1 -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (a)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Describe one feature of the underground hospital at Arras (Thompson’s Cave).
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Constructed in chalk quarries by New Zealand and British miners (1916–17); contained 700 beds, running piped water, electric lighting, and fully sterile surgical theatres; completely protected staff and patients from German artillery fire.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State underground location &amp; capacity in sentence 1 &rarr; <strong>Detail:</strong> Add technological infrastructure (electric dynamos, piped water, or shell protection) in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q1(b): Feature 2 -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (b)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2023</span>
                        Describe one feature of the Carrel-Dakin method for treating wound infections on the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Devised by Alexis Carrel and Henry Dakin (1915); sterilised sodium hypochlorite chemical solution flushed deep into wound through perforated rubber tubes; prevented gas gangrene and sepsis; solution had to be freshly prepared every 6 hours.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State chemical antiseptic action in sentence 1 &rarr; <strong>Detail:</strong> Describe continuous tube irrigation or fresh preparation requirement in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q2(b): 4-Part Follow-Up Grid (100% BLANK FOR STUDENT COMPLETION) -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (b)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Study Source F (on Page 25). How could you follow up Source F to find out more about how surgeons dealt with wound infections and gangrene during the Battle of Arras? Complete the table below.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <table class="follow-up-table">
                    <tr>
                        <td>Detail in Source F that I would follow up:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>Question I would ask:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>What type of source I would use:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>How this source would help me answer my question:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                </table>

                <div style="border: 1px solid #000000; background: #f8fafc; border-radius: 2px; padding: 3px 6px; font-size: 6.8pt; margin-top: 5px;">
                    <strong>Enquiry Verification Checklist:</strong> [ ] Quote on gangrene or surgical fatigue selected; [ ] Specific clinical question; [ ] Official RAMC Surgical Casebook or Medical Research Committee Report named; [ ] Clear purpose explained.
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 2(a) Set 3 (Sources E &amp; F)</span>
            <span>Page 24 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 25: SECTION A — WESTERN FRONT SET 3 (Q2a SOURCES & SCAFF)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Source Utility Enquiry (Sources E &amp; F)</p>
                </div>
                <span class="header-tag">Section A · Set 3</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (a)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Study Sources E and F. How useful are Sources E and F for an enquiry into the medical facilities available to treat wounded soldiers during the Battle of Arras (1917)? Explain your answer, using Sources E and F and your knowledge of the historical context.
                    </div>
                    <span class="q-marks">[8]</span>
                </div>

                <!-- Side-by-Side Archival Primary Source Display -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 5px;">
                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source E</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">RAMC Report (Arras)</span>
                        </div>
                        <div class="archival-source-body">
                            "The underground hospital in the chalk quarries of Thompson's Cave accommodates up to 700 stretcher cases. It is fitted with electric power dynamos providing light, running water, and fully equipped surgical theatres. This extensive network of chalk caves protects both medical officers and patients completely from heavy artillery bombardments, allowing continuous operations."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From an official medical inspection report by Major C. S. Myers, an RAMC consulting physician inspecting the underground tunnels at Arras, April 1917.
                        </div>
                    </div>

                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source F</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Frontline Memoir</span>
                        </div>
                        <div class="archival-source-body">
                            "The wounded men brought down into the chalk tunnels were coated in lime dust, gashed by shrapnel, and suffering terribly from gangrene. In the underground wards, surgical teams worked without pausing day or night under glaring electric bulbs while the earth overhead vibrated from artillery fire. The damp air and smell of disinfectants was suffocating."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From <em>The Forbidden Zone</em>, a published memoir by Staff Nurse Mary Borden, who operated an advanced surgical clearing unit near the Arras front in 1917.
                        </div>
                    </div>
                </div>

                <!-- Provenance Clues Scaffolding Card (Per AGENTS.md Rule) -->
                <div class="provenance-card">
                    <strong style="text-transform: uppercase; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2.5px;">
                        Provenance Clues (Author, Audience, Motive) — Consider Before Writing:
                    </strong>
                    <div style="font-size: 6.8pt; line-height: 1.25;">
                        • <strong>Source E (Major Myers Report):</strong> High-ranking RAMC officer writing an official inspection report on the Arras tunnel hospital in April 1917. <em>Motive:</em> Evaluating infrastructure and equipment for military commanders; highly reliable for capacity (700 beds), power dynamos, and physical safety, though focused on institutional success rather than clinical suffering.<br>
                        • <strong>Source F (Nurse Borden Memoir):</strong> Frontline surgical nurse writing an eyewitness literary memoir. <em>Motive:</em> Communicating the visceral sensory reality of treating gas gangrene and shrapnel wounds underground; deeply insightful for physical working conditions, though written with dramatic retrospection.
                    </div>
                </div>

                <!-- C-O-P Examination Scaffold Bar -->
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 34%;">
                        <span class="scaffold-label">C — Content &amp; Quote</span>
                        <div class="scaffold-content">
                            Identify specific details (700 beds, electric dynamos, underground safety, chalk dust, vibrating earth, suffocating damp) and explain medical impact.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">O — Own Knowledge</span>
                        <div class="scaffold-content">
                            Corroborate with historical context: New Zealand tunneling company created 800m of tunnels; Arras April 1917; Carrel-Dakin method used for gangrene.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">P — Provenance (NOP)</span>
                        <div class="scaffold-content">
                            Contrast official RAMC administrative report (Source E) with personal frontline surgical memoir (Source F). Synthesize mutual utility.
                        </div>
                    </div>
                </div>

                <!-- Paragraph 1: Source E Analysis directly on Page 25 -->
                <div class="utility-response-block" style="margin-top: 5px;">
                    <div class="utility-para-header">
                        <strong>Paragraph 1: Analysis of Source E (Content + Contextual Knowledge + Provenance)</strong>
                        <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                    </div>
                    <div class="starters-box">
                        <div class="starter-point"><strong>• Content Starter:</strong> <em>Source E is useful for an enquiry into medical facilities at Arras because it demonstrates...</em></div>
                        <div class="starter-point"><strong>• Context Starter:</strong> <em>From my historical knowledge, this accurately reflects the construction of Thompson's Cave where...</em></div>
                        <div class="starter-point"><strong>• Provenance Starter:</strong> <em>The utility of Source E is reinforced by Major Myers' position as an official RAMC inspector because...</em></div>
                    </div>
                    ${renderLines(11, '7.2mm')}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Paragraph 2 (Source F Analysis &amp; Synthesis)</span>
            <span>Page 25 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 26: SECTION A — WESTERN FRONT SET 3 (Q2a FULL WRITING L) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Student Writing Response Lines</p>
                </div>
                <span class="header-tag">Section A · Set 3 Writing</span>
            </div>

            <!-- Full Page dedicated to Paragraph 2: Source F Analysis & Comparative Synthesis -->
            <div class="utility-response-block">
                <div class="utility-para-header">
                    <strong>Paragraph 2: Analysis of Source F &amp; Comparative Judgement (Content + Knowledge + Provenance)</strong>
                    <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                </div>
                <div class="starters-box">
                    <div class="starter-point"><strong>• Content Starter:</strong> <em>Source F is also useful because it reveals the grim physical conditions inside the underground wards...</em></div>
                    <div class="starter-point"><strong>• Context Starter:</strong> <em>This is supported by evidence that frontline surgeons battled severe gas gangrene and sepsis using...</em></div>
                    <div class="starter-point"><strong>• Provenance &amp; Synthesis:</strong> <em>While Mary Borden writes from personal nursing experience, both sources combine effectively because...</em></div>
                </div>
                ${renderLines(19, '7.2mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Western Front Set 4: Cambrai (Pages 27–29)</span>
            <span>Page 26 of 32</span>
        </div>
    </div>
    '''

def render_section_a_set_4():
    """Pages 27–29: Western Front Set 4 (Cambrai Blood Depots & Trench Injuries)"""
    return '''
    <!-- ============================================================= -->
    <!-- PAGE 27: SECTION A — WESTERN FRONT SET 4 (Q1 & BLANK Q2b)     -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Questions 1(a), 1(b) (Features) &amp; Question 2(b) (Follow-Up)</p>
                </div>
                <span class="header-tag">Section A · Set 4</span>
            </div>

            <!-- Q1(a): Feature 1 -->
            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (a)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Describe one feature of blood transfusion and storage used at the Battle of Cambrai (1917).
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Captain Oswald Robertson established the first portable blood bank; universal Group O blood mixed with sodium citrate to prevent clotting and dextrose for energy; 22 units packed in ice and sawdust inside ammunition boxes.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State sodium citrate preservation or portable bank in sentence 1 &rarr; <strong>Detail:</strong> Add iced ammunition boxes or Cambrai 1917 trial in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q1(b): Feature 2 -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">1 (b)</span>
                        <span class="exam-provenance-pill past">Edexcel June 2021</span>
                        Describe one feature of trench foot in the British sector of the Western Front.
                    </div>
                    <span class="q-marks">[2]</span>
                </div>

                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 48%;">
                        <span class="scaffold-label">Key Knowledge (AO1)</span>
                        <div class="scaffold-content">
                            Caused by prolonged standing in waterlogged, freezing mud causing restricted blood circulation; led to gangrene and amputation; prevented by rubbing whale oil on feet, changing into dry socks twice daily, and the 'buddy system' of inspection.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 52%;">
                        <span class="scaffold-label">F-D Exam Formula</span>
                        <div class="scaffold-content">
                            <strong>Feature:</strong> State waterlogged mud cause or gangrene danger in sentence 1 &rarr; <strong>Detail:</strong> Add whale oil or dry socks prevention in sentence 2.
                        </div>
                    </div>
                </div>

                ${renderLines(3, '7.2mm')}
            </div>

            <!-- Q2(b): 4-Part Follow-Up Grid (100% BLANK FOR STUDENT COMPLETION) -->
            <div class="question-container" style="margin-top: 5px;">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (b)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Study Source G (on Page 28). How could you follow up Source G to find out more about the success of blood transfusions in treating wounded soldiers during the Battle of Cambrai? Complete the table below.
                    </div>
                    <span class="q-marks">[4]</span>
                </div>

                <table class="follow-up-table">
                    <tr>
                        <td>Detail in Source G that I would follow up:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>Question I would ask:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>What type of source I would use:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                    <tr>
                        <td>How this source would help me answer my question:</td>
                        <td>
                            ${renderLines(2, '7mm')}
                        </td>
                    </tr>
                </table>

                <div style="border: 1px solid #000000; background: #f8fafc; border-radius: 2px; padding: 3px 6px; font-size: 6.8pt; margin-top: 5px;">
                    <strong>Enquiry Verification Checklist:</strong> [ ] Direct quote on 11 transfused men selected; [ ] Focused clinical outcome question; [ ] Official Casualty Clearing Station No. 34 Admission Register or RAMC Surgical Journal named; [ ] Precise evaluative purpose.
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Question 2(a) Set 4 (Sources G &amp; H)</span>
            <span>Page 27 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 28: SECTION A — WESTERN FRONT SET 4 (Q2a SOURCES & SCAFF)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Source Utility Enquiry (Sources G &amp; H)</p>
                </div>
                <span class="header-tag">Section A · Set 4</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <div>
                        <span class="q-num">2 (a)</span>
                        <span class="exam-provenance-pill forecast">★ High-Yield Forecast</span>
                        Study Sources G and H. How useful are Sources G and H for an enquiry into new treatments for wound shock and blood loss on the Western Front? Explain your answer, using Sources G and H and your knowledge of the historical context.
                    </div>
                    <span class="q-marks">[8]</span>
                </div>

                <!-- Side-by-Side Archival Primary Source Display -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 5px;">
                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source G</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">BMJ Report (1918)</span>
                        </div>
                        <div class="archival-source-body">
                            "During the Cambrai offensive in November 1917, we established an advanced depot of preserved blood. Twenty-two units of universal donor Group O blood were collected in glass bottles containing sodium citrate and dextrose, kept packed in sawdust and ice within ammunition boxes. Eleven men suffering from extreme hemorrhage and surgical shock were transfused; nine recovered completely."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From a scientific paper by Captain Oswald Robertson (US Army Medical Officer attached to British CCS No. 34), published in the <em>British Medical Journal</em>, June 1918.
                        </div>
                    </div>

                    <div class="archival-source-box">
                        <div class="archival-source-title">
                            <span>Source H</span>
                            <span style="font-size: 6.6pt; font-family: 'Inter', sans-serif;">Orderly Memoir</span>
                        </div>
                        <div class="archival-source-body">
                            "Before preserved blood arrived, men bleeding heavily from severed femoral arteries or shattered limbs slipped rapidly into shock and death. When the medical officers began administering Robertson’s bottled blood, the transformation was astonishing—pale, dying boys literally regained colour in their lips and warmth in their skin within twenty minutes."
                        </div>
                        <div class="archival-source-footer">
                            <strong>Provenance:</strong> From the post-war memoir of Private Harold Devenish, an RAMC orderly serving at a Casualty Clearing Station near Cambrai in late 1917.
                        </div>
                    </div>
                </div>

                <!-- Provenance Clues Scaffolding Card (Per AGENTS.md Rule) -->
                <div class="provenance-card">
                    <strong style="text-transform: uppercase; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2.5px;">
                        Provenance Clues (Author, Audience, Motive) — Consider Before Writing:
                    </strong>
                    <div style="font-size: 6.8pt; line-height: 1.25;">
                        • <strong>Source G (Captain Robertson BMJ):</strong> Pioneering medical officer publishing scientific data in Britain's leading medical journal (1918). <em>Motive:</em> Demonstrating clinical efficacy of citrated blood to the medical community; provides precise scientific statistics (22 units, 11 transfusions, 9 recoveries), though written to promote his technique.<br>
                        • <strong>Source H (RAMC Orderly Devenish):</strong> Frontline RAMC orderly observing immediate patient reactions in the wards. <em>Motive:</em> Recording personal recollections of medical miracles; offers valuable eyewitness evidence of physiological recovery from shock, though written years later without clinical records.
                    </div>
                </div>

                <!-- C-O-P Examination Scaffold Bar -->
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="width: 34%;">
                        <span class="scaffold-label">C — Content &amp; Quote</span>
                        <div class="scaffold-content">
                            Extract specific facts (22 units preserved blood, sodium citrate, iced ammunition boxes, 9 of 11 recovered, regained colour in 20 mins) and evaluate treatment for shock.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">O — Own Knowledge</span>
                        <div class="scaffold-content">
                            Connect to Landsteiner (blood groups 1901), Hustin (sodium citrate 1914), and Rous &amp; Turner (glucose/dextrose 1916). Explain why shock was lethal before transfusion.
                        </div>
                    </div>
                    <div class="scaffold-col" style="width: 33%;">
                        <span class="scaffold-label">P — Provenance (NOP)</span>
                        <div class="scaffold-content">
                            Contrast scientific medical journal report (Source G) with nursing orderly's personal memoir (Source H). Weigh clinical data against visual observation.
                        </div>
                    </div>
                </div>

                <!-- Paragraph 1: Source G Analysis directly on Page 28 -->
                <div class="utility-response-block" style="margin-top: 5px;">
                    <div class="utility-para-header">
                        <strong>Paragraph 1: Analysis of Source G (Content + Contextual Knowledge + Provenance)</strong>
                        <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                    </div>
                    <div class="starters-box">
                        <div class="starter-point"><strong>• Content Starter:</strong> <em>Source G is useful for an enquiry into treatments for blood loss because it demonstrates that...</em></div>
                        <div class="starter-point"><strong>• Context Starter:</strong> <em>From my historical knowledge, Captain Robertson's work at Cambrai in 1917 was groundbreaking because...</em></div>
                        <div class="starter-point"><strong>• Provenance Starter:</strong> <em>The utility of Source G is elevated by its provenance as a British Medical Journal report because...</em></div>
                    </div>
                    ${renderLines(11, '7.2mm')}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Paragraph 2 (Source H Analysis &amp; Synthesis)</span>
            <span>Page 28 of 32</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 29: SECTION A — WESTERN FRONT SET 4 (Q2a FULL WRITING L) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: The Historic Environment</h2>
                    <p>The British Sector of the Western Front, 1914–18 · Question 2(a) Student Writing Response Lines</p>
                </div>
                <span class="header-tag">Section A · Set 4 Writing</span>
            </div>

            <!-- Full Page dedicated to Paragraph 2: Source H Analysis & Comparative Synthesis -->
            <div class="utility-response-block">
                <div class="utility-para-header">
                    <strong>Paragraph 2: Analysis of Source H &amp; Comparative Judgement (Content + Knowledge + Provenance)</strong>
                    <span style="font-size: 7pt; font-weight: 700;">[4 Marks]</span>
                </div>
                <div class="starters-box">
                    <div class="starter-point"><strong>• Content Starter:</strong> <em>Source H is also useful because it confirms the dramatic real-time clinical effect on soldiers in shock...</em></div>
                    <div class="starter-point"><strong>• Context Starter:</strong> <em>This is supported by evidence that rapid blood replacement raised blood pressure and prevented...</em></div>
                    <div class="starter-point"><strong>• Provenance &amp; Synthesis:</strong> <em>Private Devenish's eyewitness observations corroborate the BMJ data... Overall, both sources provide...</em></div>
                </div>
                ${renderLines(19, '7.2mm')}
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 11</span>
            <span class="turn-over">Turn Over for Western Front Primary Source Typology &amp; Utility Matrix (Page 30)</span>
            <span>Page 29 of 32</span>
        </div>
    </div>
    '''
