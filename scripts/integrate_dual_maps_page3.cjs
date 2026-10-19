const fs = require('fs');
const path = require('path');

// 1. Update cme_unified_textbook_data.cjs
const dataPath = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');
let dataCode = fs.readFileSync(dataPath, 'utf8');

const flashpointsData = `  "mapRegionalImage": "/images/middle_east_map_cia_reference.jpg",
  "mapIsraelImage": "/images/cme_1967_occupied_territories_cia_map.png",
  "captionRegional": "Regional Pan-Arab Arena • The Levant, Persian Gulf oil corridors & Red Sea maritime routes.",
  "captionIsrael": "The Conquered Territories • 1949 Green Line, West Bank, Gaza Strip, Golan Heights & Sinai frontier.",
  "flashpoints": [
    {
      "badge": "FLASHPOINT 01",
      "title": "The Golan Heights & Syrian Escarpment",
      "text": "Rising 1,000 metres above the Sea of Galilee, the Golan Syrian military artillery vantage point routinely shelled Israeli agricultural kibbutzim below. Syrian engineering attempts to divert the Jordan River headwaters (Banias) triggered pre-war dogfights. In June 1967, Israeli forces scaled the fortified escarpment, seizing the plateau to eliminate artillery threats and establish early-warning listening posts overlooking Damascus."
    },
    {
      "badge": "FLASHPOINT 02",
      "title": "The Straits of Tiran & Sharm el-Sheikh",
      "text": "The narrow maritime bottleneck at the mouth of the Gulf of Aqaba controlled maritime access to Israel's southern port of Eilat—vital for oil shipments from Iran. In October 1956 and May 1967, Egyptian President Nasser blockaded the straits from gun batteries at Sharm el-Sheikh. Israel declared the maritime blockade an unambiguous act of war (casus belli), launching immediate preemptive military campaigns in response."
    },
    {
      "badge": "FLASHPOINT 03",
      "title": "The West Bank & Mountain Aquifers",
      "text": "Mandatory Palestine's central mountain spine dominates Israel's narrow coastal plain, which narrows to a mere 14 kilometres between Tel Aviv and the Green Line. Conquered in 1967 from Jordan, the West Bank provided critical military strategic depth. Crucially, the western and northeastern mountain aquifers supplied over 25% of Israel's freshwater, making territorial control an existential economic and strategic imperative."
    },
    {
      "badge": "FLASHPOINT 04",
      "title": "The Suez Canal & Sinai Desert Buffer",
      "text": "The 150-kilometre-wide arid Sinai desert formed a vital strategic buffer zone between Egypt and the Israeli heartland. Following the 1967 conquest, Israel constructed the fortified Bar-Lev Line along the canal bank. The canal's closure from 1967 to 1975 disrupted global oil trade, while the 1979 Egyptian-Israeli peace treaty demilitarised the Sinai under international observation, exchanging strategic depth for diplomatic peace."
    }
  ],`;

dataCode = dataCode.replace(
  /"mapImage":\s*"[^"]*",\s*"caption":\s*"[^"]*",/,
  flashpointsData.trim(),
);

fs.writeFileSync(dataPath, dataCode, 'utf8');
console.log('Updated THEATER_MAP_CONFIG in cme_unified_textbook_data.cjs!');

// 2. Update render_standard_textbook_cme_unified.cjs
const renderPath = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let renderCode = fs.readFileSync(renderPath, 'utf8');

// Replace image loading and Page 3 generator
renderCode = renderCode.replace(
  `  const mapImgData = getBase64Image(DATA.THEATER_MAP_CONFIG.mapImage) || DATA.THEATER_MAP_CONFIG.mapImage;`,
  `  const mapRegionalData = getBase64Image(DATA.THEATER_MAP_CONFIG.mapRegionalImage) || DATA.THEATER_MAP_CONFIG.mapRegionalImage;
  const mapIsraelData = getBase64Image(DATA.THEATER_MAP_CONFIG.mapIsraelImage) || DATA.THEATER_MAP_CONFIG.mapIsraelImage;`,
);

// Replace Page 3 generator
const oldPage3Gen = `  // 3. SPECIFICATION BLUEPRINT (Page 3)
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

const newPage3Gen = `  // 3. FLASHPOINTS (Page 3)
  const flashpointsHtml = (DATA.THEATER_MAP_CONFIG.flashpoints || []).map((f) => {
    return \`
      <div class="fp-card">
        <div class="fp-header">
          <span class="fp-badge">\${f.badge}</span>
          <h3 class="fp-title">\${f.title}</h3>
        </div>
        <p class="fp-text">\${f.text}</p>
      </div>
    \`;
  }).join('');`;

renderCode = renderCode.replace(oldPage3Gen, newPage3Gen);

// Replace Page 3 template inside HTML
const oldPage3Template = `    <!-- =========================================================
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

const newPage3Template = `    <!-- =========================================================
         PAGE 3: DUAL CARTOGRAPHIC THEATER & 4 STRATEGIC FLASHPOINTS
         ========================================================= -->
    <div class="a4-page textbook-page page-3-dual-maps" data-page="3" id="page-3">
      <header class="page-running-header">
        <span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995)</span>
        <span class="rh-right">GEOPOLITICAL THEATER ATLAS &bull; REGIONAL &amp; LOCAL PERSPECTIVES</span>
      </header>

      <div class="map-header-strip">
        <div>
          <h2>The Geopolitical Theater: Dual Cartographic Perspectives</h2>
          <p>Regional Middle Eastern Theater &amp; Israel with the Occupied Territories (1948&ndash;1995)</p>
        </div>
        <span class="spine-badge">Strategic Atlas</span>
      </div>

      <!-- DUAL MAP PLATES ROW -->
      <div class="dual-maps-row">
        
        <!-- MAP 1: REGIONAL MIDDLE EAST -->
        <div class="dual-map-card">
          <div class="dual-map-header">
            <span class="dual-map-badge">MAP 1: REGIONAL THEATER</span>
            <span class="dual-map-title">The Middle East &amp; Surrounding Arab States</span>
          </div>
          <div class="dual-map-img-box">
            <img src="\${mapRegionalData}" alt="Middle East Regional Map" />
          </div>
          <div class="dual-map-caption">
            <strong>Strategic Overview:</strong> Pan-Arab alliance frontiers, Persian Gulf oil corridors, and Red Sea maritime chokepoints.
          </div>
        </div>

        <!-- MAP 2: ISRAEL & OCCUPIED TERRITORIES -->
        <div class="dual-map-card">
          <div class="dual-map-header">
            <span class="dual-map-badge">MAP 2: CONFLICT CORRIDOR</span>
            <span class="dual-map-title">Israel &amp; The Occupied Territories</span>
          </div>
          <div class="dual-map-img-box">
            <img src="\${mapIsraelData}" alt="Israel and the Occupied Territories Map" />
          </div>
          <div class="dual-map-caption">
            <strong>Territorial Core:</strong> 1949 Green Line, West Bank, Gaza Strip, Golan Heights, and the Sinai border.
          </div>
        </div>

      </div>

      <!-- STRATEGIC FLASHPOINTS SECTION -->
      <div class="flashpoints-section">
        <div class="flashpoints-section-header">
          <h3>Four Defining Strategic Geopolitical Flashpoints</h3>
          <span>Topography, Maritime Chokepoints &amp; Strategic Depth</span>
        </div>
        <div class="flashpoints-grid">
          \${flashpointsHtml}
        </div>
      </div>

      <footer class="page-running-footer">
        <span>Conflict in the Middle East (1945&ndash;1995) &bull; Geopolitical &amp; Spatial Analysis</span>
        <span class="page-num">3</span>
      </footer>
    </div>`;

renderCode = renderCode.replace(oldPage3Template, newPage3Template);

// Replace CSS for Page 3
const oldPage3Css = `    .map-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 2mm;
      margin-bottom: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .map-header-strip h2 {
      font-family: var(--font-display);
      font-size: 13pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .map-header-strip p {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }
    .map-plate-frame {
      border: 1.2px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
      background: #ffffff;
      margin-bottom: 2.5mm;
      flex-shrink: 0;
    }
    .map-plate-img-box {
      width: 100%;
      height: 82mm;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
    }
    .map-plate-img-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .map-plate-caption {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-style: italic;
      color: #64748b;
      padding: 3px 8px;
      background: #f1f5f9;
      border-top: 1px solid #e2e8f0;
      text-align: center;
    }
    .kt-overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 3mm;
      flex: 1;
    }
    .kt-spec-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-top: 3.5px solid #1e3a8a;
      border-radius: 4px;
      padding: 6px 9px;
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
      font-size: 6.8pt;
      font-weight: 800;
      color: #ffffff;
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.05em;
    }
    .kt-spec-date {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 700;
      color: #64748b;
    }
    .kt-spec-title {
      font-family: var(--font-display);
      font-size: 10.5pt;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 4px;
    }
    .kt-spec-units {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1;
    }
    .kt-spec-unit {
      background: #f8fafc;
      border-left: 2.5px solid #cbd5e1;
      padding: 3px 6px;
      border-radius: 2px;
    }
    .kt-unit-code {
      font-family: var(--font-sans);
      font-size: 7.6pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1.5px;
    }
    .kt-unit-desc {
      font-family: var(--font-body);
      font-size: 8.6pt;
      line-height: 1.28;
      color: #334155;
    }
    .kt-spec-geo {
      background: #f1f5f9;
      border: 1px dashed #cbd5e1;
      border-radius: 2px;
      padding: 3.5px 6px;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      line-height: 1.25;
      color: #475569;
      margin-top: 4px;
    }`;

const newPage3Css = `    .page-3-dual-maps {
      justify-content: flex-start;
      gap: 0;
    }
    .map-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 2mm;
      margin-bottom: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .map-header-strip h2 {
      font-family: var(--font-display);
      font-size: 12.5pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .map-header-strip p {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }
    .dual-maps-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5mm;
      margin-bottom: 3mm;
    }
    .dual-map-card {
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .dual-map-header {
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid var(--crimson-accent);
    }
    .dual-map-badge {
      font-family: var(--font-sans);
      font-size: 6pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--crimson-accent);
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .dual-map-title {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: #f1f5f9;
    }
    .dual-map-img-box {
      width: 100%;
      height: 98mm;
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .dual-map-img-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .dual-map-caption {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      line-height: 1.25;
      color: #475569;
      background: #f1f5f9;
      padding: 3px 6px;
      border-top: 1px solid #e2e8f0;
    }
    .flashpoints-section {
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-radius: 4px;
      padding: 4px 8px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 2mm;
    }
    .flashpoints-section-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1.5px solid var(--navy-deep);
      padding-bottom: 2px;
      margin-bottom: 3px;
    }
    .flashpoints-section-header h3 {
      font-family: var(--font-display);
      font-size: 9.5pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .flashpoints-section-header span {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 700;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .flashpoints-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5mm;
      flex: 1;
      align-content: space-around;
    }
    .fp-card {
      background: #f8fafc;
      border-left: 2.5px solid var(--crimson-accent);
      border-top: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      border-radius: 2px;
      padding: 3px 6px;
    }
    .fp-header {
      display: flex;
      align-items: baseline;
      gap: 5px;
      margin-bottom: 1.5px;
    }
    .fp-badge {
      font-family: var(--font-sans);
      font-size: 5.8pt;
      font-weight: 800;
      color: #ffffff;
      background: #b45309;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .fp-title {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: #7c2d12;
      line-height: 1.15;
    }
    .fp-text {
      font-family: var(--font-body);
      font-size: 7.4pt;
      line-height: 1.28;
      color: #334155;
      text-align: justify;
    }`;

renderCode = renderCode.replace(oldPage3Css, newPage3Css);

// Replace autoFitKeyTopicCards with autoFitPage3Flashpoints
const autoFitFlashpointsCode = `    function autoFitPage3Flashpoints() {
      const p3 = document.querySelector('#page-3');
      if (!p3) return;
      const texts = Array.from(p3.querySelectorAll('.fp-text'));
      if (!texts.length) return;
      
      let bestFs = 7.0;
      for (let fs = 7.0; fs <= 8.8; fs += 0.1) {
        texts.forEach(t => {
          t.style.fontSize = fs.toFixed(1) + 'pt';
          t.style.lineHeight = '1.28';
        });
        if (p3.scrollHeight <= p3.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }
      texts.forEach(t => {
        t.style.fontSize = bestFs.toFixed(1) + 'pt';
        t.style.lineHeight = '1.28';
      });
      return bestFs;
    }`;

renderCode = renderCode.replace(
  /function autoFitKeyTopicCards\(\) \{[\s\S]*?return bestFs;\s*\}/,
  autoFitFlashpointsCode.trim(),
);
renderCode = renderCode.replace(/autoFitKeyTopicCards/g, 'autoFitPage3Flashpoints');

fs.writeFileSync(renderPath, renderCode, 'utf8');
console.log(
  'Successfully integrated Dual Maps and Strategic Flashpoints into Page 3 of render_standard_textbook_cme_unified.cjs!',
);
