const fs = require('fs');
const path = require('path');

const publicWorksheetsDir = path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets');
const unitsWorksheetsDir = path.join(__dirname, '..', 'units', 'ks2_ww2', 'worksheets');

// Shared Landscape CSS to inject into both stylesheets
const landscapeCss = `
    /* A4 LANDSCAPE CRAFT SHEET (SHEET 3) */
    .worksheet-page.landscape-page {
      width: 297mm;
      height: 210mm;
      padding: 6.5mm 8.5mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #ffffff;
      page-break-after: always;
      break-after: page;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      margin: 15mm auto;
    }

    @media print {
      .worksheet-page.landscape-page {
        page: landscape-sheet;
        box-shadow: none !important;
        margin: 0;
      }
    }

    @page landscape-sheet {
      size: A4 landscape;
      margin: 0;
    }

    .landscape-cutline {
      width: 100%;
      height: 100%;
      border: 1.5px dashed var(--cut-guide);
      border-radius: 6px;
      padding: 4mm 6mm;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #ffffff;
      box-sizing: border-box;
      justify-content: space-between;
    }

    /* GIANT FULL-PAGE A4 LANDSCAPE SUITCASE */
    .giant-suitcase-frame {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      margin-top: 1.5mm;
      margin-bottom: 1.5mm;
      position: relative;
    }

    .giant-suitcase-shell {
      flex: 1;
      border: 2.8px solid #78350f;
      border-radius: 10px;
      background: #fdfbf7;
      box-shadow: inset 0 0 15px rgba(120, 53, 15, 0.05), 0 3px 8px rgba(0,0,0,0.06);
      position: relative;
      padding: 4mm 5mm;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .giant-suitcase-handle {
      position: absolute;
      top: -5.5mm;
      left: 50%;
      transform: translateX(-50%);
      width: 58mm;
      height: 5.5mm;
      border: 3.5px solid #78350f;
      border-bottom: none;
      border-radius: 6px 6px 0 0;
      background: #d97706;
      box-shadow: 0 -1px 3px rgba(0,0,0,0.15);
    }

    .giant-brass-clasp {
      position: absolute;
      top: -3mm;
      width: 12mm;
      height: 6mm;
      background: #f59e0b;
      border: 1.5px solid #78350f;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .giant-brass-clasp.left { left: 45mm; }
    .giant-brass-clasp.right { right: 45mm; }

    .giant-corner-bracket {
      position: absolute;
      width: 14mm;
      height: 14mm;
      border: 2.5px solid #78350f;
      background: #d97706;
      border-radius: 3px;
    }
    .giant-corner-bracket.tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
    .giant-corner-bracket.tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
    .giant-corner-bracket.bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
    .giant-corner-bracket.br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

    .giant-compartments-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 3mm;
      flex: 1;
      min-height: 0;
      box-sizing: border-box;
    }

    .giant-compartment-box {
      border: 1.5px dashed #b45309;
      border-radius: 6px;
      background: #ffffff;
      padding: 2.5mm 3mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      box-sizing: border-box;
    }

    .compartment-header-tag {
      font-size: 7.2pt;
      font-weight: 800;
      color: #78350f;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1.2px solid #fed7aa;
      padding-bottom: 1.2mm;
      margin-bottom: 1mm;
      text-align: center;
    }

    .compartment-drawing-canvas {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px dotted #e2e8f0;
      border-radius: 4px;
      background: #fafaf9;
      margin-bottom: 1.5mm;
      position: relative;
    }

    .compartment-item-rule {
      border-top: 1.2px dashed #94a3b8;
      padding-top: 1mm;
      font-size: 6.8pt;
      font-weight: 700;
      color: var(--navy-deep);
      display: flex;
      align-items: baseline;
      gap: 3px;
    }
    .compartment-item-rule .line {
      flex: 1;
      border-bottom: 1.2px solid var(--navy-deep);
      height: 3mm;
    }

    /* FULL WIDTH EXPANDED WRITTEN LEDGER (SHEET 2) */
    .expanded-written-ledger {
      display: flex;
      flex-direction: column;
      gap: 1.8mm;
      flex: 1;
      min-height: 0;
    }

    .expanded-ledger-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 3.8px solid var(--navy-primary);
      border-radius: 4px;
      padding: 1.8mm 3mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      min-height: 0;
    }

    .expanded-ledger-title {
      font-size: 7.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .expanded-ledger-prompt {
      font-size: 7.0pt;
      font-style: italic;
      color: var(--ink-muted);
      margin-top: 0.4mm;
      margin-bottom: 0.8mm;
    }

    .expanded-ledger-rule {
      border-bottom: 1.2px dashed #94a3b8;
      min-height: 7.8mm;
      flex: 1;
    }
`;

console.log(
  '🚀 Upgrading Lesson 2 & Lesson 3 Worksheets with Full A4 Landscape Suitcases and Expansive Writing Lines...',
);

// ==========================================
// 1. UPGRADE LESSON 2 (BRITISH EVACUEE)
// ==========================================
function upgradeLesson2(baseDir) {
  const filePath = path.join(baseDir, 'lesson_02_evacuation_worksheet.html');
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf8');

  // Ensure landscape CSS is in <style>
  if (!html.includes('.worksheet-page.landscape-page')) {
    html = html.replace('</style>', `${landscapeCss}\n</style>`);
  }

  // Upgrade Sheet 2 Task 3: Replace cramped 2-column packing grid with full-width expanded written ledger
  const sheet2Task3Replacement = `
      <!-- Task 3: The Evacuee Packing Record & Reasoning (Full Width) -->
      <div class="task-card-expand p2-task3" style="flex: 1.35;">
        <div class="task-header">
          <span class="task-num-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Task 3: Historical Inquiry • What Did a British Evacuee Pack &amp; Why?
          </span>
          <span class="task-tag">Historical Empathy &amp; Reasoning</span>
        </div>
        
        <p style="font-size: 7.2pt; color: #475569; margin-bottom: 1.5mm; font-style: italic;">
          Explain why each of these 5 items was considered essential by parents and government billeting officers for a child travelling alone to the countryside (Refer to your full-page suitcase drawing on Sheet 3):
        </p>

        <div class="expanded-written-ledger">
          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>1. Warm Winter Overcoat &amp; Sturdy Walking Shoes</span>
              <span style="font-size: 6.4pt; color: #0369a1; font-weight: 700;">WEATHER &amp; DURABILITY</span>
            </div>
            <p class="expanded-ledger-prompt">Why was durable, warm country clothing essential for city children arriving in rural villages?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>

          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>2. Cardboard Gas Mask Box &amp; Pinned Coat Luggage Label</span>
              <span style="font-size: 6.4pt; color: #b45309; font-weight: 700;">SAFETY &amp; IDENTITY</span>
            </div>
            <p class="expanded-ledger-prompt">Why did teachers strictly inspect that luggage labels were securely tied to coat buttons before boarding?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>

          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>3. Government Food Ration Book &amp; National Identity Card</span>
              <span style="font-size: 6.4pt; color: #166534; font-weight: 700;">DAILY SUSTENANCE</span>
            </div>
            <p class="expanded-ledger-prompt">Why was it impossible for a foster family to feed an evacuee without handing over their official ration coupons?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>

          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>4. Personal Wash Kit: Toothbrush, Comb, Soap &amp; Face Flannel</span>
              <span style="font-size: 6.4pt; color: #4338ca; font-weight: 700;">HYGIENE &amp; HEALTH</span>
            </div>
            <p class="expanded-ledger-prompt">Why did the Ministry of Health urge parents to pack a complete washing kit for every child?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>

          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>5. Comfort Keepsake: Family Photograph, Teddy Bear, or Favourite Book</span>
              <span style="font-size: 6.4pt; color: #be123c; font-weight: 700;">EMOTIONAL RESILIENCE</span>
            </div>
            <p class="expanded-ledger-prompt">How did packing one cherished comfort item help a 10-year-old cope with homesickness on their first night?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>
        </div>
      </div>
  `;

  // Replace Task 3 in Sheet 2
  const task3Regex = /<!-- Task 3: The Evacuee's Suitcase[\s\S]*?<!-- Task 4: Thinking Heads/;
  if (task3Regex.test(html)) {
    html = html.replace(
      task3Regex,
      `${sheet2Task3Replacement}\n\n      <!-- Task 4: Thinking Heads`,
    );
  }

  // Append Sheet 3 (Dedicated A4 Landscape Suitcase Craft Sheet)
  const sheet3Html = `
  <!-- ========================================================
       PAGE 3: A4 LANDSCAPE DEDICATED SUITCASE CRAFT SHEET (SHEET 3)
       ======================================================== -->
  <div class="worksheet-page landscape-page" id="sheet-page-3">
    <div class="exercise-book-cutline landscape-cutline">
      <div class="cut-indicator">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
        ✂️ Cut along dashed outer border to paste neatly across an exercise book double-page spread!
      </div>

      <!-- Masthead -->
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">KS2 CRAFT ACTIVITY</span>
          <span class="brand-text">The History Revision Hub • Key Stage 2 World War II Companion</span>
        </div>
        <div class="student-fields">
          <div class="field-item">Name: <span class="field-line" style="width: 32mm;"></span></div>
          <div class="field-item">Date: <span class="field-line short"></span></div>
          <div class="field-item" style="font-weight: 800; color: #1e3a8a;">LESSON 02 • Sheet 3 (A4 Landscape)</div>
        </div>
      </div>

      <!-- Enquiry Title Banner -->
      <div class="enquiry-banner">
        <div class="enquiry-title-group">
          <h1>THE BRITISH EVACUEE'S PACKING SUITCASE • OPERATION PIED PIPER (1939)</h1>
          <p class="enquiry-question">Key Enquiry Dilemma: You are being evacuated from London to rural Devon. Draw, color, and label the 5 essential items you are packing in your vintage suitcase below.</p>
        </div>
        <div class="lesson-badge">
          LESSON 02<br><span>SUITCASE CRAFT</span>
        </div>
      </div>

      <!-- Giant A4 Landscape Suitcase Canvas -->
      <div class="giant-suitcase-frame">
        <div class="giant-suitcase-shell">
          <div class="giant-suitcase-handle"></div>
          <div class="giant-brass-clasp left"></div>
          <div class="giant-brass-clasp right"></div>
          <div class="giant-corner-bracket tl"></div>
          <div class="giant-corner-bracket tr"></div>
          <div class="giant-corner-bracket bl"></div>
          <div class="giant-corner-bracket br"></div>

          <!-- Hanging Evacuee Luggage Label Plate -->
          <div style="position: absolute; top: -4.5mm; left: 22mm; width: 35mm; height: 15mm; background: #fef3c7; border: 1.2px solid #b45309; border-radius: 3px; padding: 1mm 2mm; font-size: 5.4pt; color: #78350f; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 5;">
            <div style="font-weight: 800; text-align: center; border-bottom: 1px solid #d97706; padding-bottom: 0.5mm; margin-bottom: 0.5mm;">L.C.C. EVACUATION TAG</div>
            <div>NAME: _________________</div>
            <div>DESTINATION: DEVON</div>
          </div>

          <!-- 5 Compartments Grid -->
          <div class="giant-compartments-grid">
            <!-- Compartment 1 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[1] WARM CLOTHING &amp; COAT</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>

            <!-- Compartment 2 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[2] GAS MASK BOX &amp; ID</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><path d="M9 16c1.5 1 4.5 1 6 0"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>

            <!-- Compartment 3 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[3] RATION BOOK &amp; DOCUMENTS</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>

            <!-- Compartment 4 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[4] WASH KIT &amp; SLIPPERS</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><path d="M7 21h10a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM12 3v4"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>

            <!-- Compartment 5 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[5] COMFORT KEEPSAKE</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sheet-footer">
        <span>The History Revision Hub • KS2 History Exercise Book Series</span>
        <span>LESSON 02 • Sheet 3 of 3 (A4 Landscape Cut-Out Craft Sheet)</span>
      </div>
    </div>
  </div>
  `;

  // If sheet-page-3 does not exist yet, append it before </body>
  if (!html.includes('id="sheet-page-3"')) {
    html = html.replace('</body>', `${sheet3Html}\n</body>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(
    `✅ Upgraded Lesson 2 worksheet: ${path.relative(path.join(__dirname, '..'), filePath)}`,
  );
}

// ==========================================
// 2. UPGRADE LESSON 3 (KINDERTRANSPORT)
// ==========================================
function upgradeLesson3(baseDir) {
  const filePath = path.join(baseDir, 'lesson_03_kindertransport_worksheet.html');
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf8');

  // Ensure landscape CSS is in <style>
  if (!html.includes('.worksheet-page.landscape-page')) {
    html = html.replace('</style>', `${landscapeCss}\n</style>`);
  }

  // Upgrade Sheet 2 Task 3: Replace cramped 2-column suitcase task with full-width expanded refugee dilemma ledger
  const sheet2Task3Replacement = `
      <!-- Task 3: The Kindertransport Refugee Dilemma Ledger (Full Width) -->
      <div class="task-card-expand p2-task3" style="flex: 1.35;">
        <div class="task-header">
          <span class="task-num-title">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Task 3: Historical Inquiry • The Kindertransport Packing Dilemma &amp; Heartbreak
          </span>
          <span class="task-tag" style="background:#fef3c7; color:#b45309;">Historical Empathy &amp; Dilemma</span>
        </div>
        
        <p style="font-size: 7.2pt; color: #475569; margin-bottom: 1.5mm; font-style: italic;">
          Strict Nazi regulations permitted each child to bring only <strong>ONE small suitcase</strong> (no valuables, no money over 10 Marks). Explain what was packed and why each choice was emotionally heartbreaking (Refer to your full-page refugee suitcase drawing on Sheet 3):
        </p>

        <div class="expanded-written-ledger">
          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>1. Family Photograph Album &amp; Handwritten Letters from Parents</span>
              <span style="font-size: 6.4pt; color: #be123c; font-weight: 700;">SACRED MEMORY</span>
            </div>
            <p class="expanded-ledger-prompt">Why was a family photograph often the single most precious and heartbreaking possession a child carried?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>

          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>2. German-English Pocket Phrasebook &amp; Translation Dictionary</span>
              <span style="font-size: 6.4pt; color: #0369a1; font-weight: 700;">SURVIVAL &amp; LANGUAGE</span>
            </div>
            <p class="expanded-ledger-prompt">Why was carrying a phrasebook vital for a 9-year-old child arriving alone in London speaking zero English?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>

          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>3. Warm Woollen Winter Coat, Underclothing &amp; Sturdy Walking Shoes</span>
              <span style="font-size: 6.4pt; color: #166534; font-weight: 700;">PRACTICAL NECESSITY</span>
            </div>
            <p class="expanded-ledger-prompt">Why did parents pack warm, durable clothing knowing they might not be able to send parcels later?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>

          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>4. Small Religious or Cultural Keepsake (e.g. Rosary Beads or Prayer Book)</span>
              <span style="font-size: 6.4pt; color: #b45309; font-weight: 700;">HERITAGE &amp; IDENTITY</span>
            </div>
            <p class="expanded-ledger-prompt">Why did Vera pack rosary beads given to her by her nanny before boarding the train in Prague?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>

          <div class="expanded-ledger-card">
            <div class="expanded-ledger-title">
              <span>5. Farewell Gift from a Childhood Friend (e.g. Carved Wooden Heart from Arnošt)</span>
              <span style="font-size: 6.4pt; color: #4338ca; font-weight: 700;">FRIENDSHIP &amp; FAREWELL</span>
            </div>
            <p class="expanded-ledger-prompt">How did packing a small keepsake from a friend help a child remember their pre-war childhood?</p>
            <div class="expanded-ledger-rule"></div>
            <div class="expanded-ledger-rule"></div>
          </div>
        </div>
      </div>
  `;

  // Replace Task 3 in Sheet 2
  const task3Regex =
    /<!-- Task 3: The Famous HET Suitcase Activity[\s\S]*?<!-- Task 4: Thinking Heads/;
  if (task3Regex.test(html)) {
    html = html.replace(
      task3Regex,
      `${sheet2Task3Replacement}\n\n      <!-- Task 4: Thinking Heads`,
    );
  }

  // Append Sheet 3 (Dedicated A4 Landscape Kindertransport Suitcase Craft Sheet)
  const sheet3Html = `
  <!-- ========================================================
       PAGE 3: A4 LANDSCAPE KINDERTRANSPORT SUITCASE CRAFT SHEET (SHEET 3)
       ======================================================== -->
  <div class="worksheet-page landscape-page" id="sheet-page-3">
    <div class="exercise-book-cutline landscape-cutline">
      <div class="cut-indicator">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
        ✂️ Cut along dashed outer border to paste neatly across an exercise book double-page spread!
      </div>

      <!-- Masthead -->
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">KS2 CRAFT ACTIVITY</span>
          <span class="brand-text">The History Revision Hub • Key Stage 2 World War II Companion</span>
        </div>
        <div class="student-fields">
          <div class="field-item">Name: <span class="field-line" style="width: 32mm;"></span></div>
          <div class="field-item">Date: <span class="field-line short"></span></div>
          <div class="field-item" style="font-weight: 800; color: #1e3a8a;">LESSON 03 • Sheet 3 (A4 Landscape)</div>
        </div>
      </div>

      <!-- Enquiry Title Banner -->
      <div class="enquiry-banner">
        <div class="enquiry-title-group">
          <h1>THE KINDERTRANSPORT REFUGEE SUITCASE • VERA'S JOURNEY (1938–1939)</h1>
          <p class="enquiry-question">Key Enquiry Dilemma: Strict Nazi Regulation: Each child was allowed only ONE suitcase. No valuables. No money over 10 Marks. Draw and label the 5 most precious items you would pack to remember your family.</p>
        </div>
        <div class="lesson-badge">
          LESSON 03<br><span>SUITCASE CRAFT</span>
        </div>
      </div>

      <!-- Giant A4 Landscape Suitcase Canvas -->
      <div class="giant-suitcase-frame">
        <div class="giant-suitcase-shell">
          <div class="giant-suitcase-handle"></div>
          <div class="giant-brass-clasp left"></div>
          <div class="giant-brass-clasp right"></div>
          <div class="giant-corner-bracket tl"></div>
          <div class="giant-corner-bracket tr"></div>
          <div class="giant-corner-bracket bl"></div>
          <div class="giant-corner-bracket br"></div>

          <!-- Official Gestapo Customs Border Stamp & Refugee Neck Tag -->
          <div style="position: absolute; top: -4.5mm; left: 22mm; width: 38mm; height: 15mm; background: #fee2e2; border: 1.2px solid #b91c1c; border-radius: 3px; padding: 1mm 2mm; font-size: 5.4pt; color: #991b1b; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 5;">
            <div style="font-weight: 800; text-align: center; border-bottom: 1px solid #f87171; padding-bottom: 0.5mm; margin-bottom: 0.5mm;">PRAG-HBF • GESTAPO ZUGELASSEN</div>
            <div>REFUGEE NO.: 8434 (VERA)</div>
            <div>DESTINATION: LIVERPOOL ST</div>
          </div>

          <!-- 5 Compartments Grid -->
          <div class="giant-compartments-grid">
            <!-- Compartment 1 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[1] FAMILY PHOTOS &amp; PARENTS</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>

            <!-- Compartment 2 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[2] WARM WINTER CLOTHES</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>

            <!-- Compartment 3 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[3] PHRASEBOOK / DICTIONARY</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>

            <!-- Compartment 4 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[4] SACRED / CULTURAL KEEPSAKE</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M8 10h8"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>

            <!-- Compartment 5 -->
            <div class="giant-compartment-box">
              <div class="compartment-header-tag">[5] FAREWELL GIFT FROM FRIEND</div>
              <div class="compartment-drawing-canvas">
                <div style="opacity: 0.25; text-align: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.8"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  <div style="font-size: 6pt; font-weight: 700; color: #78350f; margin-top: 3px;">DRAW ITEM HERE</div>
                </div>
              </div>
              <div class="compartment-item-rule">
                Item: <span class="line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sheet-footer">
        <span>The History Revision Hub • KS2 History Exercise Book Series</span>
        <span>LESSON 03 • Sheet 3 of 3 (A4 Landscape Cut-Out Craft Sheet)</span>
      </div>
    </div>
  </div>
  `;

  // If sheet-page-3 does not exist yet, append it before </body>
  if (!html.includes('id="sheet-page-3"')) {
    html = html.replace('</body>', `${sheet3Html}\n</body>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(
    `✅ Upgraded Lesson 3 worksheet: ${path.relative(path.join(__dirname, '..'), filePath)}`,
  );
}

// Execute on both directories
[publicWorksheetsDir, unitsWorksheetsDir].forEach((dir) => {
  upgradeLesson2(dir);
  upgradeLesson3(dir);
});

console.log('🎉 Done upgrading Lesson 2 and Lesson 3 worksheets!');
