const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'render_standard_textbook_cme_unified.cjs');
let code = fs.readFileSync(targetFile, 'utf8');

// 1. Replace syllabus items mapping with ktCode
const oldSyllabus = `  const syllabusItemsHtml = DATA.ENQUIRIES.map((e) => {
    const startP = e.num * 2 + 2;
    const endP = startP + 1;
    return \`
      <div class="cover-enquiry-item">
        <span class="cover-enquiry-num">\${String(e.num).padStart(2, '0')}</span>
        <div class="cover-enquiry-text">
          <div class="cover-enquiry-top-row">
            <span class="cover-enquiry-title">\${e.title}</span>
            <span class="cover-enquiry-locator">pp. \${startP}&ndash;\${endP} &bull; Ref [\${e.num}.1]&ndash;[\${e.num}.4]</span>
          </div>
          <div class="cover-enquiry-question">\${e.enquiry}</div>
        </div>
      </div>
    \`;
  }).join('');`;

const newSyllabus = `  const syllabusItemsHtml = DATA.ENQUIRIES.map((e) => {
    const startP = e.num * 2 + 2;
    const endP = startP + 1;
    return \`
      <div class="cover-enquiry-item">
        <span class="cover-enquiry-num">\${e.ktCode || String(e.num).padStart(2, '0')}</span>
        <div class="cover-enquiry-text">
          <div class="cover-enquiry-top-row">
            <span class="cover-enquiry-title">\${e.title}</span>
            <span class="cover-enquiry-locator">pp. \${startP}&ndash;\${endP} &bull; [\${e.num}.1]&ndash;[\${e.num}.4]</span>
          </div>
          <div class="cover-enquiry-question">\${e.enquiry}</div>
        </div>
      </div>
    \`;
  }).join('');`;

code = code.replace(oldSyllabus, newSyllabus);

// 2. Replace flashpoints generation with specBlueprintHtml
const oldFlashpoints = `  // 3. FLASHPOINTS (Page 3)
  const flashpointsHtml = DATA.THEATER_MAP_CONFIG.flashpoints.map((f, idx) => {
    return \`
      <div class="flashpoint-card">
        <div class="flashpoint-header">
          <span class="fp-badge">FLASHPOINT 0\${idx + 1}</span>
          <h3 class="fp-title">\${f.title.replace(/^\\d+\\.\\s*/, '')}</h3>
        </div>
        <p class="fp-text">\${f.text}</p>
      </div>
    \`;
  }).join('');`;

const newBlueprint = `  // 3. SPECIFICATION BLUEPRINT (Page 3)
  const specBlueprintHtml = (DATA.THEATER_MAP_CONFIG.specBlueprint || []).map((kt) => {
    return \`
      <div class="kt-spec-card" style="border-top-color: \${kt.borderTop}">
        <div class="kt-spec-header">
          <span class="kt-spec-badge" style="background: \${kt.badgeBg}">\${kt.topicNum}</span>
          <span class="kt-spec-date">\${kt.dateRange}</span>
        </div>
        <div class="kt-spec-title" style="color: \${kt.color}">\${kt.title}</div>
        <div class="kt-spec-units">
          \${kt.units.map(u => \`
            <div class="kt-spec-unit">
              <div class="kt-unit-code">\${u.code}: \${u.title}</div>
              <div class="kt-unit-desc">\${u.desc}</div>
            </div>
          \`).join('')}
        </div>
        <div class="kt-spec-geo">
          <strong>Key Borders:</strong> \${kt.territorialSummary}
        </div>
      </div>
    \`;
  }).join('');`;

code = code.replace(oldFlashpoints, newBlueprint);

// 3. Replace cardConfigs for quiz
const oldCardConfigs = `  const cardConfigs = [
    { title: 'Origins, Mandate & 1948 War', badge: 'ENQUIRIES 01–02', locator: 'pp. 4–7 • Ref [1.1]–[2.4]' },
    { title: 'Nakba, Refugees & Suez Crisis', badge: 'ENQUIRIES 03–04', locator: 'pp. 8–11 • Ref [3.1]–[4.4]' },
    { title: 'Water Wars & Six-Day War', badge: 'ENQUIRIES 05–06', locator: 'pp. 12–15 • Ref [5.1]–[6.4]' },
    { title: 'Occupied Lands, PLO & Munich', badge: 'ENQUIRIES 07–08', locator: 'pp. 16–19 • Ref [7.1]–[8.4]' },
    { title: 'Yom Kippur War & Camp David', badge: 'ENQUIRIES 09–10', locator: 'pp. 20–23 • Ref [9.1]–[10.4]' },
    { title: 'Lebanon, Intifada & Oslo Accords', badge: 'ENQUIRIES 11–12', locator: 'pp. 24–27 • Ref [11.1]–[12.4]' }
  ];`;

const newCardConfigs = `  const cardConfigs = [
    { title: 'Mandate, Partition & 1948 War', badge: 'KT 1.0 & KT 1.1', locator: 'pp. 4–7 • Ref [1.1]–[2.4]' },
    { title: 'Nakba, IDF, US Aid & Suez Crisis', badge: 'KT 1.2 & KT 1.3', locator: 'pp. 8–11 • Ref [3.1]–[4.4]' },
    { title: 'Cairo Summit, Water & Six-Day War', badge: 'KT 2.1 & KT 2.2', locator: 'pp. 12–15 • Ref [5.1]–[6.4]' },
    { title: 'Conquered Lands, UN 242 & PLO', badge: 'KT 2.3 & KT 2.4', locator: 'pp. 16–19 • Ref [7.1]–[8.4]' },
    { title: 'Yom Kippur War & Camp David', badge: 'KT 2.5 & KT 3.1', locator: 'pp. 20–23 • Ref [9.1]–[10.4]' },
    { title: 'Lebanon, Intifada, Cold War & Oslo', badge: 'KT 3.2 & KT 3.3', locator: 'pp. 24–27 • Ref [11.1]–[12.4]' }
  ];`;

code = code.replace(oldCardConfigs, newCardConfigs);

// 4. Update Spreads templates for running header, verso banner, recto banner
code = code.replace(
  `<span class="rh-right">ENQUIRY \${String(num).padStart(2, '0')} &bull; PART I</span>`,
  `<span class="rh-right">\${enquiry.ktCode || ('ENQ ' + num)} &bull; PART I</span>`,
);
code = code.replace(
  `<span class="rh-right">ENQUIRY \${String(num).padStart(2, '0')} &bull; PART II</span>`,
  `<span class="rh-right">\${enquiry.ktCode || ('ENQ ' + num)} &bull; PART II</span>`,
);
code = code.replace(
  `<span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995)</span>`,
  `<span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995) &bull; \${enquiry.ktGroup || 'GCSE OPTION P5'}</span>`,
);
code = code.replace(
  `<span class="enquiry-badge">ENQUIRY \${String(num).padStart(2, '0')} &bull; GCSE OPTION P5</span>`,
  `<span class="enquiry-badge">\${enquiry.ktCode || ('ENQ ' + num)} &bull; ENQUIRY \${String(num).padStart(2, '0')} &bull; GCSE OPTION P5</span>`,
);
code = code.replace(
  `<span class="recto-part-tag">PART II: CLIMAX, TURNING POINTS &amp; HISTORICAL CONSEQUENCE</span>`,
  `<span class="recto-part-tag">\${enquiry.ktCode || ('ENQ ' + num)} PART II: CLIMAX, TURNING POINTS &amp; CONSEQUENCES</span>`,
);

// 5. Update Spine CSS for 15 items
code = code.replace(
  `    .spine-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      position: relative;
      z-index: 2;
    }`,
  `    .spine-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      position: relative;
      z-index: 2;
    }`,
);
code = code.replace(
  `    .spine-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid var(--navy-deep);
      border-radius: 3px;
      padding: 3.5px 8px;
    }`,
  `    .spine-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid var(--navy-deep);
      border-radius: 3px;
      padding: 2.2px 7px;
    }`,
);
code = code.replace(
  `    .spine-desc {
      font-family: var(--font-body);
      font-size: 7.4pt;
      line-height: 1.25;
      color: #334155;
    }`,
  `    .spine-desc {
      font-family: var(--font-body);
      font-size: 7.2pt;
      line-height: 1.22;
      color: #334155;
    }`,
);

// 6. Update Page 3 CSS: replace flashpoints CSS with kt-overview-grid CSS
const oldPage3Css = `    .flashpoints-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3mm;
      flex: 1;
    }
    .flashpoint-card {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-top: 2.5px solid #b45309;
      border-radius: 3px;
      padding: 7.5px 10.5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .flashpoint-header {
      display: flex;
      align-items: baseline;
      gap: 6px;
      border-bottom: 0.8px solid #fed7aa;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }
    .fp-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: #b45309;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .fp-title {
      font-family: var(--font-sans);
      font-size: 8.5pt;
      font-weight: 800;
      color: #7c2d12;
    }
    .fp-text {
      font-family: var(--font-body);
      font-size: 9.4pt;
      line-height: 1.46;
      color: #334155;
      text-align: justify;
    }`;

const newPage3Css = `    .kt-overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 3mm;
      flex: 1;
    }
    .kt-spec-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-top: 3px solid #1e3a8a;
      border-radius: 4px;
      padding: 5px 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .kt-spec-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }
    .kt-spec-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
      letter-spacing: 0.05em;
    }
    .kt-spec-date {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 700;
      color: #64748b;
    }
    .kt-spec-title {
      font-family: var(--font-display);
      font-size: 8.8pt;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 4px;
    }
    .kt-spec-units {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .kt-spec-unit {
      background: #f8fafc;
      border-left: 2px solid #cbd5e1;
      padding: 2.5px 5px;
      border-radius: 2px;
    }
    .kt-unit-code {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
    }
    .kt-unit-desc {
      font-family: var(--font-body);
      font-size: 7.2pt;
      line-height: 1.25;
      color: #334155;
    }
    .kt-spec-geo {
      background: #f1f5f9;
      border: 1px dashed #cbd5e1;
      border-radius: 2px;
      padding: 3px 5px;
      font-family: var(--font-sans);
      font-size: 6.2pt;
      line-height: 1.25;
      color: #475569;
      margin-top: 4px;
    }`;

code = code.replace(oldPage3Css, newPage3Css);

// Adjust map plate height on Page 3 from 96mm to 92mm
code = code.replace('height: 96mm;', 'height: 92mm;');

// 7. Update Page 3 HTML structure
const oldPage3Html = `    <!-- =========================================================
         PAGE 3: GEOPOLITICAL THEATER MAP & FLASHPOINTS
         ========================================================= -->
    <div class="a4-page textbook-page" data-page="3" id="page-3">
      <header class="page-running-header">
        <span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995)</span>
        <span class="rh-right">GEOPOLITICAL THEATER &amp; STRATEGIC FLASHPOINTS</span>
      </header>

      <div class="map-header-strip">
        <div>
          <h2>The Geopolitical Theater Map &amp; Flashpoints</h2>
          <p>Physical Topography, Maritime Chokepoints &amp; Territorial Origins of War</p>
        </div>
        <span class="spine-badge">Strategic Geography</span>
      </div>

      <div class="map-plate-frame">
        <div class="map-plate-img-box">
          <img src="\${mapImgData}" alt="Middle East Strategic Theater Map" />
        </div>
        <div class="map-plate-caption">\${DATA.THEATER_MAP_CONFIG.caption}</div>
      </div>

      <div class="flashpoints-grid">
        \${flashpointsHtml}
      </div>

      <footer class="page-running-footer">
        <span>Conflict in the Middle East (1945&ndash;1995) &bull; Spatial Analysis</span>
        <span class="page-num">3</span>
      </footer>
    </div>`;

const newPage3Html = `    <!-- =========================================================
         PAGE 3: THEATER MAP & SPECIFICATION BLUEPRINT
         ========================================================= -->
    <div class="a4-page textbook-page" data-page="3" id="page-3">
      <header class="page-running-header">
        <span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995)</span>
        <span class="rh-right">GEOPOLITICAL THEATER &amp; SPECIFICATION BLUEPRINT</span>
      </header>

      <div class="map-header-strip">
        <div>
          <h2>The Geopolitical Theater &amp; Specification Blueprint</h2>
          <p>Pearson Edexcel Option P5 Curriculum Architecture &amp; Territorial Benchmarks (1945&ndash;1995)</p>
        </div>
        <span class="spine-badge">Curriculum Architecture</span>
      </div>

      <div class="map-plate-frame">
        <div class="map-plate-img-box">
          <img src="\${mapImgData}" alt="Middle East Strategic Theater Map" />
        </div>
        <div class="map-plate-caption">\${DATA.THEATER_MAP_CONFIG.caption}</div>
      </div>

      <div class="kt-overview-grid">
        \${specBlueprintHtml}
      </div>

      <footer class="page-running-footer">
        <span>Conflict in the Middle East (1945&ndash;1995) &bull; Spatial &amp; Curriculum Analysis</span>
        <span class="page-num">3</span>
      </footer>
    </div>`;

code = code.replace(oldPage3Html, newPage3Html);

// 8. Update Cover syllabus header
code = code.replace(
  `<h2>Curriculum Enquiries in This Volume</h2>\n          <span>Chronological Syllabus Overview (Option P5)</span>`,
  `<h2>Pearson Edexcel Curriculum Architecture</h2>\n          <span>Option P5 Specification: Key Topics 1, 2 &amp; 3 (12 Core Enquiries)</span>`,
);

// 9. Update cover-enquiry-num font size and width
code = code.replace(
  `    .cover-enquiry-num {
      font-family: var(--font-sans);
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 1px 4px;
      border-radius: 2px;
      font-size: 6.2pt;
    }`,
  `    .cover-enquiry-num {
      font-family: var(--font-sans);
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 1px 4px;
      border-radius: 2px;
      font-size: 5.8pt;
      white-space: nowrap;
    }`,
);

fs.writeFileSync(targetFile, code, 'utf8');
console.log('Successfully updated render_standard_textbook_cme_unified.cjs!');
