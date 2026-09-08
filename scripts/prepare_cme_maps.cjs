const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processAllMaps() {
  console.log('=== Preparing Complete CME Maps Suite ===');

  // =========================================================================
  // 1. MAP 1: REGIONAL MIDDLE EAST OVERVIEW
  // =========================================================================
  const meMapPath = path.join(__dirname, '../public/images/middle_east_map.png');
  const meAnswersPath = path.join(__dirname, '../public/images/middle_east_map_answers.png');

  // Wipe Kurdistan text completely with white
  const meCleanOverlay = Buffer.from(`
    <svg width="2919" height="2631">
      <rect x="1050" y="380" width="520" height="100" fill="#ffffff" />
    </svg>
  `);

  const cleanMeBuffer = await sharp(fs.readFileSync(meMapPath))
    .composite([{ input: meCleanOverlay, top: 0, left: 0 }])
    .png()
    .toBuffer();

  // Save pristine blank Middle East map for pupil workbook
  fs.writeFileSync(meMapPath, cleanMeBuffer);
  console.log(
    '✅ 1A: Cleaned public/images/middle_east_map.png (pristine blank map for workbooks).',
  );

  // Generate ultra-crisp labeled reference map for textbook
  const meLabelsSvg = Buffer.from(`
    <svg width="2919" height="2631" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="meDiagonalHatch" width="22" height="22" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="22" stroke="#dc2626" stroke-width="4.5" opacity="0.75" />
        </pattern>
        <filter id="meShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.15" />
        </filter>
        <filter id="meGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood flood-color="#ffffff" result="glow-color" flood-opacity="0.95"/>
          <feMorphology operator="dilate" radius="3.5" in="SourceAlpha" result="dilated"/>
          <feComposite in="glow-color" in2="dilated" operator="in" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <style>
        .me-country { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; font-size: 58px; font-weight: 900; fill: #0f172a; letter-spacing: 2.5px; text-anchor: middle; }
        .me-water { font-family: 'Georgia', 'Times New Roman', serif; font-size: 46px; font-style: italic; font-weight: bold; fill: #0369a1; text-anchor: middle; }
        .me-choke { font-family: 'Inter', Arial, sans-serif; font-size: 34px; font-weight: 800; fill: #b91c1c; text-anchor: middle; }
        .me-capital { font-family: 'Inter', Arial, sans-serif; font-size: 32px; font-weight: 700; fill: #334155; }
        .me-leader { stroke: #0f172a; stroke-width: 3.5; stroke-dasharray: 6,4; fill: none; }
        .me-callout { stroke: #b91c1c; stroke-width: 4; fill: none; }
      </style>

      <!-- Accurate Sinai Peninsula Shading (1967 Occupied Territory) -->
      <polygon points="620,1070 720,1050 780,1310 740,1470 620,1070" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5" opacity="0.85" />
      <polygon points="620,1070 720,1050 780,1310 740,1470 620,1070" fill="url(#meDiagonalHatch)" opacity="0.8" />

      <!-- Countries -->
      <!-- Egypt -->
      <text x="380" y="1470" class="me-country" filter="url(#meGlow)">EGYPT</text>
      <!-- Cairo -->
      <circle cx="475" cy="1185" r="11" fill="#dc2626" stroke="#ffffff" stroke-width="3"/>
      <text x="500" y="1195" class="me-capital" filter="url(#meGlow)">Cairo ★</text>

      <!-- Israel -->
      <line x1="735" y1="945" x2="630" y2="880" class="me-leader" />
      <text x="610" y="870" class="me-country" style="fill: #1d4ed8; font-size: 52px;" filter="url(#meGlow)">ISRAEL</text>
      <circle cx="740" cy="980" r="10" fill="#dc2626" stroke="#ffffff" stroke-width="3"/>
      <text x="760" y="990" class="me-capital" style="font-weight: 800; font-size: 30px;" filter="url(#meGlow)">Jerusalem ★</text>
      <circle cx="725" cy="945" r="8" fill="#0f172a" stroke="#ffffff" stroke-width="2"/>
      <text x="580" y="945" class="me-capital" style="font-size: 28px;" filter="url(#meGlow)">Tel Aviv</text>

      <!-- West Bank Callout -->
      <line x1="755" y1="950" x2="850" y2="920" class="me-leader" />
      <text x="860" y="925" class="me-capital" style="font-weight: 800; fill: #b91c1c; font-size: 30px;" filter="url(#meGlow)">West Bank (1967)</text>

      <!-- Gaza Strip Callout -->
      <line x1="705" y1="1025" x2="580" y2="1055" class="me-leader" />
      <text x="570" y="1065" class="me-capital" style="font-weight: 800; fill: #b91c1c; font-size: 30px; text-anchor: end;" filter="url(#meGlow)">Gaza Strip (1967)</text>

      <!-- Golan Heights Callout -->
      <line x1="770" y1="840" x2="870" y2="810" class="me-leader" />
      <text x="880" y="815" class="me-capital" style="font-weight: 800; fill: #b91c1c; font-size: 30px;" filter="url(#meGlow)">Golan Heights (1967)</text>

      <!-- Jordan -->
      <text x="960" y="1120" class="me-country" filter="url(#meGlow)">JORDAN</text>
      <circle cx="950" cy="980" r="9" fill="#dc2626" stroke="#ffffff" stroke-width="2.5"/>
      <text x="965" y="990" class="me-capital" filter="url(#meGlow)">Amman ★</text>

      <!-- Lebanon -->
      <text x="780" y="740" class="me-country" style="font-size: 44px;" filter="url(#meGlow)">LEBANON</text>
      <circle cx="750" cy="785" r="8" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
      <text x="635" y="790" class="me-capital" style="font-size: 28px;" filter="url(#meGlow)">Beirut ★</text>

      <!-- Syria -->
      <text x="1080" y="700" class="me-country" filter="url(#meGlow)">SYRIA</text>
      <circle cx="965" cy="835" r="9" fill="#dc2626" stroke="#ffffff" stroke-width="2.5"/>
      <text x="980" y="845" class="me-capital" filter="url(#meGlow)">Damascus ★</text>

      <!-- Iraq -->
      <text x="1450" y="900" class="me-country" filter="url(#meGlow)">IRAQ</text>
      <circle cx="1520" cy="940" r="10" fill="#dc2626" stroke="#ffffff" stroke-width="2.5"/>
      <text x="1540" y="950" class="me-capital" filter="url(#meGlow)">Baghdad ★</text>

      <!-- Iran -->
      <text x="2200" y="900" class="me-country" filter="url(#meGlow)">IRAN</text>

      <!-- Saudi Arabia -->
      <text x="1550" y="1750" class="me-country" style="font-size: 72px; letter-spacing: 4px;" filter="url(#meGlow)">SAUDI ARABIA</text>
      <circle cx="1780" cy="1590" r="10" fill="#dc2626" stroke="#ffffff" stroke-width="2.5"/>
      <text x="1800" y="1600" class="me-capital" filter="url(#meGlow)">Riyadh ★</text>

      <!-- Turkey -->
      <text x="750" y="240" class="me-country" style="fill: #475569;" filter="url(#meGlow)">TURKEY</text>

      <!-- Waterways & Maritime Chokepoints -->
      <text x="350" y="650" class="me-water" style="font-size: 58px;" filter="url(#meGlow)">Mediterranean Sea</text>

      <!-- Suez Canal -->
      <line x1="590" y1="1060" x2="470" y2="1010" class="me-callout" />
      <rect x="250" y="980" width="220" height="52" rx="8" fill="#ffffff" stroke="#b91c1c" stroke-width="2.5" />
      <text x="360" y="1017" class="me-choke">Suez Canal</text>

      <!-- Sinai Peninsula Label -->
      <text x="690" y="1220" class="me-capital" style="font-size: 38px; font-weight: 900; fill: #b91c1c; text-anchor: middle;" filter="url(#meGlow)">Sinai Peninsula</text>
      <text x="690" y="1260" class="me-capital" style="font-size: 26px; font-weight: 700; font-style: italic; fill: #b91c1c; text-anchor: middle;" filter="url(#meGlow)">(Occupied by Israel 1967-82)</text>

      <!-- Straits of Tiran -->
      <line x1="770" y1="1470" x2="880" y2="1490" class="me-callout" />
      <rect x="880" y="1465" width="290" height="52" rx="8" fill="#ffffff" stroke="#b91c1c" stroke-width="2.5" />
      <text x="1025" y="1502" class="me-choke">Straits of Tiran</text>

      <!-- Gulf of Aqaba & Gulf of Suez -->
      <text x="860" y="1320" class="me-water" style="font-size: 32px;" filter="url(#meGlow)">Gulf of Aqaba</text>
      <text x="590" y="1340" class="me-water" style="font-size: 32px;" filter="url(#meGlow)">Gulf of Suez</text>

      <!-- Red Sea -->
      <text x="1080" y="2000" class="me-water" style="font-size: 64px; letter-spacing: 3px;" filter="url(#meGlow)">Red Sea</text>

      <!-- Persian Gulf -->
      <text x="2150" y="1450" class="me-water" style="font-size: 52px;" filter="url(#meGlow)">Persian (Arabian) Gulf</text>

      <!-- Map Legend Box -->
      <g transform="translate(2160, 2140)">
        <rect width="700" height="440" rx="16" fill="#ffffff" stroke="#0f172a" stroke-width="4" filter="url(#meShadow)" />
        <text x="350" y="55" font-family="'Inter', sans-serif" font-size="32" font-weight="900" fill="#0f172a" text-anchor="middle" letter-spacing="1">MAP REFERENCE KEY</text>
        <line x1="30" y1="75" x2="670" y2="75" stroke="#cbd5e1" stroke-width="2" />
        
        <rect x="40" y="110" width="38" height="26" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
        <text x="100" y="130" font-family="'Inter', sans-serif" font-size="26" font-weight="700" fill="#0f172a">Sovereign State (e.g. Egypt, Syria)</text>

        <rect x="40" y="165" width="38" height="26" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
        <line x1="40" y1="165" x2="78" y2="191" stroke="#dc2626" stroke-width="2"/>
        <text x="100" y="185" font-family="'Inter', sans-serif" font-size="26" font-weight="700" fill="#b91c1c">Territories Occupied in 1967 War</text>

        <rect x="40" y="220" width="38" height="26" fill="#ffffff" stroke="#b91c1c" stroke-width="2.5"/>
        <text x="100" y="240" font-family="'Inter', sans-serif" font-size="26" font-weight="700" fill="#b91c1c">Strategic Maritime Chokepoint</text>

        <circle cx="59" cy="285" r="11" fill="#dc2626" stroke="#ffffff" stroke-width="2.5"/>
        <text x="100" y="295" font-family="'Inter', sans-serif" font-size="26" font-weight="700" fill="#334155">National Capital (★)</text>

        <text x="40" y="375" font-family="'Inter', sans-serif" font-size="23" font-style="italic" fill="#64748b">Edexcel GCSE History (Paper 2): Conflict in the Middle East</text>
      </g>
    </svg>
  `);

  const meAnswersBuffer = await sharp(cleanMeBuffer)
    .composite([{ input: meLabelsSvg, top: 0, left: 0 }])
    .png()
    .toBuffer();

  fs.writeFileSync(meAnswersPath, meAnswersBuffer);
  console.log(
    '✅ 1B: Generated public/images/middle_east_map_answers.png (crisp labeled reference map for textbook).',
  );

  // =========================================================================
  // 2. MAP 2: ZOOMED-IN ISRAEL & THE OCCUPIED TERRITORIES
  // =========================================================================
  const zoomedMapPath = path.join(__dirname, '../public/images/israel_zoomed_map.png');
  const zoomedAnswersPath = path.join(__dirname, '../public/images/israel_zoomed_map_answers.png');

  const zoomedInputBuf = fs.readFileSync(zoomedMapPath);
  const rawZoomed = await sharp(zoomedInputBuf).raw().toBuffer({ resolveWithObject: true });
  const zData = Buffer.from(rawZoomed.data);
  const zWidth = rawZoomed.info.width;
  const zHeight = rawZoomed.info.height;

  // Clean the 'Israel' text in top-left ocean
  for (let y = 50; y <= 110; y++) {
    for (let x = 45; x <= 185; x++) {
      const idx = (y * zWidth + x) * 3;
      zData[idx] = 191;
      zData[idx + 1] = 232;
      zData[idx + 2] = 255;
    }
  }

  // Save pristine blank zoomed map for workbooks
  const cleanZoomedPng = await sharp(zData, {
    raw: { width: zWidth, height: zHeight, channels: 3 },
  })
    .png()
    .toBuffer();
  fs.writeFileSync(zoomedMapPath, cleanZoomedPng);
  console.log(
    '✅ 2A: Saved public/images/israel_zoomed_map.png (pristine blank map for workbooks).',
  );

  // Exact pixel-perfect flood fill for Occupied Territories on the answers map:
  const answersData = Buffer.from(zData);

  // 1. West Bank Flood Fill: Seed point (440, 380)
  const wbVisited = new Uint8Array(zWidth * zHeight);
  const wbQueue = [440 + 380 * zWidth];
  wbVisited[440 + 380 * zWidth] = 1;
  while (wbQueue.length > 0) {
    const idx = wbQueue.pop();
    const x = idx % zWidth;
    const y = Math.floor(idx / zWidth);

    // Apply red diagonal hatch / fill
    const isHatch = (x + y) % 10 < 3;
    if (isHatch) {
      answersData[idx * 3] = 220;
      answersData[idx * 3 + 1] = 38;
      answersData[idx * 3 + 2] = 38;
    } else {
      answersData[idx * 3] = 254;
      answersData[idx * 3 + 1] = 226;
      answersData[idx * 3 + 2] = 226;
    }

    for (const n of [idx - 1, idx + 1, idx - zWidth, idx + zWidth]) {
      if (n >= 0 && n < zWidth * zHeight && !wbVisited[n]) {
        if (
          answersData[n * 3] > 180 &&
          answersData[n * 3 + 1] > 180 &&
          answersData[n * 3 + 2] > 180
        ) {
          wbVisited[n] = 1;
          wbQueue.push(n);
        }
      }
    }
  }

  // 2. Gaza Strip Flood Fill: Seed point (270, 540), bounded to x in [220..305], y in [505..600]
  const gazaVisited = new Uint8Array(zWidth * zHeight);
  const gazaQueue = [[270, 540]];
  gazaVisited[270 + 540 * zWidth] = 1;
  while (gazaQueue.length > 0) {
    const [x, y] = gazaQueue.pop();
    const idx = y * zWidth + x;

    const isHatch = (x + y) % 10 < 3;
    if (isHatch) {
      answersData[idx * 3] = 220;
      answersData[idx * 3 + 1] = 38;
      answersData[idx * 3 + 2] = 38;
    } else {
      answersData[idx * 3] = 254;
      answersData[idx * 3 + 1] = 226;
      answersData[idx * 3 + 2] = 226;
    }

    for (const [dx, dy] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 220 && nx <= 305 && ny >= 505 && ny <= 600) {
        const n = nx + ny * zWidth;
        if (!gazaVisited[n] && answersData[n * 3] > 180) {
          gazaVisited[n] = 1;
          gazaQueue.push([nx, ny]);
        }
      }
    }
  }

  // 3. Golan Heights Flood Fill: Seed point (540, 90), bounded to x in [500..590], y in [30..150]
  const golanVisited = new Uint8Array(zWidth * zHeight);
  const golanQueue = [[540, 90]];
  golanVisited[540 + 90 * zWidth] = 1;
  while (golanQueue.length > 0) {
    const [x, y] = golanQueue.pop();
    const idx = y * zWidth + x;

    const isHatch = (x + y) % 10 < 3;
    if (isHatch) {
      answersData[idx * 3] = 220;
      answersData[idx * 3 + 1] = 38;
      answersData[idx * 3 + 2] = 38;
    } else {
      answersData[idx * 3] = 254;
      answersData[idx * 3 + 1] = 226;
      answersData[idx * 3 + 2] = 226;
    }

    for (const [dx, dy] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 500 && nx <= 590 && ny >= 30 && ny <= 150) {
        const n = nx + ny * zWidth;
        if (!golanVisited[n] && answersData[n * 3] > 180) {
          golanVisited[n] = 1;
          golanQueue.push([nx, ny]);
        }
      }
    }
  }

  // Overlay labels, callout boxes, and legend for the Zoomed Reference Map
  const zoomedLabelsSvg = Buffer.from(`
    <svg width="794" height="1123" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="zGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood flood-color="#ffffff" result="glow-color" flood-opacity="0.95"/>
          <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="dilated"/>
          <feComposite in="glow-color" in2="dilated" operator="in" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="zShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.12" />
        </filter>
      </defs>

      <style>
        .zc-name { font-family: 'Inter', Arial, sans-serif; font-size: 22px; font-weight: 900; fill: #1e293b; letter-spacing: 1.5px; text-anchor: middle; }
        .zw-name { font-family: 'Georgia', serif; font-size: 16px; font-style: italic; font-weight: bold; fill: #0369a1; text-anchor: middle; }
        .z-callout-t { font-family: 'Inter', Arial, sans-serif; font-size: 13.5px; font-weight: 800; fill: #991b1b; }
        .z-callout-s { font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 600; font-style: italic; fill: #b91c1c; }
        .z-line { stroke: #b91c1c; stroke-width: 2; stroke-dasharray: 4,3; fill: none; }
      </style>

      <!-- Neighbouring Countries -->
      <text x="470" y="42" class="zc-name" filter="url(#zGlow)">LEBANON</text>
      <text x="690" y="160" class="zc-name" filter="url(#zGlow)">SYRIA</text>
      <text x="680" y="480" class="zc-name" filter="url(#zGlow)">JORDAN</text>
      <text x="180" y="780" class="zc-name" filter="url(#zGlow)">EGYPT</text>
      <text x="180" y="805" style="font-family:'Inter',sans-serif; font-size: 13px; font-weight: 700; fill: #475569; text-anchor: middle;" filter="url(#zGlow)">(Sinai Peninsula)</text>

      <!-- State of Israel Title on territory -->
      <text x="345" y="240" class="zc-name" style="fill: #1d4ed8; font-size: 24px;" filter="url(#zGlow)">ISRAEL</text>
      <text x="345" y="262" style="font-family:'Inter',sans-serif; font-size: 12px; font-weight: 700; font-style: italic; fill: #1e40af; text-anchor: middle;" filter="url(#zGlow)">(Pre-1967 Territory)</text>

      <!-- Water Bodies -->
      <text x="110" y="320" class="zw-name" style="font-size: 20px;" filter="url(#zGlow)">Mediterranean<br/>Sea</text>
      <text x="525" y="195" class="zw-name" style="font-size: 13px;" filter="url(#zGlow)">Sea of Galilee</text>
      <text x="600" y="365" class="zw-name" style="font-size: 14px;" filter="url(#zGlow)">River Jordan</text>
      <text x="575" y="490" class="zw-name" style="font-size: 14px;" filter="url(#zGlow)">Dead Sea</text>
      <text x="365" y="1090" class="zw-name" style="font-size: 14px;" filter="url(#zGlow)">Gulf of Aqaba</text>

      <!-- Golan Heights Callout -->
      <line x1="545" y1="95" x2="630" y2="70" class="z-line" />
      <rect x="625" y="45" width="155" height="44" rx="6" fill="#ffffff" stroke="#dc2626" stroke-width="1.5" filter="url(#zShadow)"/>
      <text x="635" y="64" class="z-callout-t">Golan Heights</text>
      <text x="635" y="80" class="z-callout-s">Captured from Syria (1967)</text>

      <!-- West Bank Callout -->
      <line x1="475" y1="360" x2="630" y2="310" class="z-line" />
      <rect x="625" y="285" width="155" height="44" rx="6" fill="#ffffff" stroke="#dc2626" stroke-width="1.5" filter="url(#zShadow)"/>
      <text x="635" y="304" class="z-callout-t">West Bank</text>
      <text x="635" y="320" class="z-callout-s">Captured from Jordan (1967)</text>

      <!-- Gaza Strip Callout -->
      <line x1="260" y1="550" x2="180" y2="550" class="z-line" />
      <rect x="25" y="528" width="155" height="44" rx="6" fill="#ffffff" stroke="#dc2626" stroke-width="1.5" filter="url(#zShadow)"/>
      <text x="35" y="547" class="z-callout-t">Gaza Strip</text>
      <text x="35" y="563" class="z-callout-s">Captured from Egypt (1967)</text>

      <!-- Jerusalem Star and Marker -->
      <circle cx="437" cy="425" r="5.5" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
      <text x="448" y="430" font-family="'Inter', Arial, sans-serif" font-size="14.5" font-weight="900" fill="#0f172a" filter="url(#zGlow)">Jerusalem ★</text>

      <!-- Reference Map Legend Card in ocean -->
      <g transform="translate(38, 38)">
        <rect width="260" height="200" rx="10" fill="#ffffff" stroke="#1e3a8a" stroke-width="2" filter="url(#zShadow)" />
        <text x="130" y="25" font-family="'Inter', sans-serif" font-size="13" font-weight="900" fill="#1e3a8a" text-anchor="middle">ISRAEL &amp; OCCUPIED ZONES</text>
        <line x1="15" y1="34" x2="245" y2="34" stroke="#e2e8f0" stroke-width="1.5" />

        <rect x="18" y="48" width="20" height="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
        <text x="46" y="60" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#0f172a">State of Israel (Pre-1967)</text>

        <rect x="18" y="74" width="20" height="14" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
        <line x1="18" y1="74" x2="38" y2="88" stroke="#dc2626" stroke-width="1.5"/>
        <text x="46" y="86" font-family="'Inter', sans-serif" font-size="11" font-weight="800" fill="#dc2626">Occupied Territories (1967):</text>

        <text x="46" y="104" font-family="'Inter', sans-serif" font-size="10" fill="#64748b">• West Bank (from Jordan)</text>
        <text x="46" y="120" font-family="'Inter', sans-serif" font-size="10" fill="#64748b">• Gaza Strip (from Egypt)</text>
        <text x="46" y="136" font-family="'Inter', sans-serif" font-size="10" fill="#64748b">• Golan Heights (from Syria)</text>

        <circle cx="28" cy="158" r="5" fill="#dc2626" stroke="#ffffff" stroke-width="1.5"/>
        <text x="46" y="162" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#0f172a">Jerusalem (Contested City ★)</text>

        <text x="15" y="186" font-family="'Inter', sans-serif" font-size="8.5" font-style="italic" fill="#94a3b8">Edexcel GCSE History: Conflict in Middle East</text>
      </g>
    </svg>
  `);

  const answersBuffer = await sharp(answersData, {
    raw: { width: zWidth, height: zHeight, channels: 3 },
  })
    .composite([{ input: zoomedLabelsSvg, top: 0, left: 0 }])
    .png()
    .toBuffer();

  fs.writeFileSync(zoomedAnswersPath, answersBuffer);
  console.log(
    '✅ 2B: Generated public/images/israel_zoomed_map_answers.png (pixel-perfect shaded reference map).',
  );

  // Copy 1967 Six Day War Map into public/units/cme_new/assets/ and public/images/
  if (fs.existsSync('scratch/test_1967.png')) {
    fs.copyFileSync(
      'scratch/test_1967.png',
      'public/units/cme_new/assets/palestine_1967_six_day_war_map.png',
    );
    fs.copyFileSync('scratch/test_1967.png', 'public/images/palestine_1967_six_day_war_map.png');
    console.log(
      '✅ 2C: Saved authentic palestine_1967_six_day_war_map.png for macro textbook reference.',
    );
  }

  console.log('=== All CME Maps successfully prepared! ===');
}

processAllMaps().catch((err) => {
  console.error('Fatal error in processAllMaps:', err);
  process.exit(1);
});
