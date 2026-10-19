const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Load the authentic UK vector base
const ukBasePath = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'ks2_ww2',
  'assets',
  'comparison',
  'uk_base.svg',
);
let ukBase = fs.readFileSync(ukBasePath, 'utf8');

// Extract inner elements
const innerMatch = ukBase.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
if (!innerMatch) {
  console.error('Failed to extract inner SVG');
  process.exit(1);
}
let innerSvg = innerMatch[1];

// Clean up sea and land colours for a warm, premium, child-friendly palette
innerSvg = innerSvg.replace(/fill="#C6ECFF"/g, 'fill="#e8f4fc"');
innerSvg = innerSvg.replace(/fill="#FFFEE3"/g, 'fill="#fefcf8"');
innerSvg = innerSvg.replace(/fill="#E0E0E0"/g, 'fill="#e2e8f0"');
innerSvg = innerSvg.replace(/stroke="#666666"/g, 'stroke="#94a3b8"');

// Create the enriched KS2 Evacuation Map SVG
const ks2EvacSvg = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     viewBox="270 540 615 790" width="1230" height="1580" style="background: #e8f4fc; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  
  <defs>
    <!-- Arrow Marker for Evacuation Train Routes -->
    <marker id="train-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#1e3a8a"/>
    </marker>
    <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- 1. BASE GEOGRAPHY (Mainland, Coastlines, Borders) -->
  ${innerSvg}

  <!-- 2. SAFE RECEPTION AREAS (Green Countryside Zones - Semi-Transparent Overlays) -->
  <!-- A: Rural Wales (Reception Haven) -->
  <path d="M 435 925 C 470 915 515 925 515 980 C 510 1040 470 1065 440 1055 C 420 1035 415 975 435 925 Z" 
        fill="#22c55e" fill-opacity="0.26" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="6,4"/>

  <!-- B: Devon, Cornwall & Somerset (South-West Reception Haven) -->
  <path d="M 370 1190 C 430 1150 510 1140 550 1180 C 530 1220 450 1240 370 1230 C 350 1220 350 1200 370 1190 Z" 
        fill="#22c55e" fill-opacity="0.26" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="6,4"/>

  <!-- C: Yorkshire Dales & Lake District (Northern Reception Haven) -->
  <path d="M 520 680 C 560 670 630 710 630 770 C 600 810 530 800 500 760 C 490 710 510 690 520 680 Z" 
        fill="#22c55e" fill-opacity="0.26" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="6,4"/>

  <!-- 3. EVACUATION DANGER ZONES (Red Target City Circles & Glowing Halos) -->

  <!-- London (The Primary Evacuation Zone) -->
  <circle cx="695" cy="1070" r="32" fill="#ef4444" fill-opacity="0.25" stroke="#dc2626" stroke-width="2"/>
  <circle cx="695" cy="1070" r="8" fill="#dc2626" stroke="#ffffff" stroke-width="2.5"/>

  <!-- Birmingham & Black Country -->
  <circle cx="585" cy="970" r="22" fill="#ef4444" fill-opacity="0.25" stroke="#dc2626" stroke-width="2"/>
  <circle cx="585" cy="970" r="7" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>

  <!-- Manchester & Salford -->
  <circle cx="575" cy="855" r="20" fill="#ef4444" fill-opacity="0.25" stroke="#dc2626" stroke-width="2"/>
  <circle cx="575" cy="855" r="6.5" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>

  <!-- Liverpool & Merseyside -->
  <circle cx="525" cy="860" r="20" fill="#ef4444" fill-opacity="0.25" stroke="#dc2626" stroke-width="2"/>
  <circle cx="525" cy="860" r="6.5" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>

  <!-- Newcastle & Gateshead -->
  <circle cx="615" cy="705" r="20" fill="#ef4444" fill-opacity="0.25" stroke="#dc2626" stroke-width="2"/>
  <circle cx="615" cy="705" r="6.5" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>

  <!-- Portsmouth & Southampton (Naval Dockyards) -->
  <circle cx="635" cy="1150" r="20" fill="#ef4444" fill-opacity="0.25" stroke="#dc2626" stroke-width="2"/>
  <circle cx="635" cy="1150" r="6.5" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>

  <!-- 4. MAJOR EVACUATION RAILWAY JOURNEYS (Bold Navy Dashed Arrows) -->

  <!-- Route 1: London -> Devon & Cornwall (Great Western Railway) -->
  <path d="M 680 1080 C 610 1130 540 1160 460 1180" 
        fill="none" stroke="#1e3a8a" stroke-width="3.5" stroke-dasharray="8,4" marker-end="url(#train-arrow)"/>

  <!-- Route 2: London -> South & West Wales (GWR via Severn Tunnel) -->
  <path d="M 670 1060 C 590 1040 520 1020 460 1000" 
        fill="none" stroke="#1e3a8a" stroke-width="3.5" stroke-dasharray="8,4" marker-end="url(#train-arrow)"/>

  <!-- Route 3: Birmingham -> Mid Wales -->
  <path d="M 565 970 C 520 970 480 970 455 970" 
        fill="none" stroke="#1e3a8a" stroke-width="3.2" stroke-dasharray="7,3.5" marker-end="url(#train-arrow)"/>

  <!-- Route 4: Manchester & Liverpool -> North Wales & Lake District -->
  <path d="M 545 845 C 530 810 525 780 525 745" 
        fill="none" stroke="#1e3a8a" stroke-width="3.2" stroke-dasharray="7,3.5" marker-end="url(#train-arrow)"/>

  <!-- Route 5: Newcastle -> Yorkshire Dales & Rural North -->
  <path d="M 615 720 C 605 745 590 760 575 775" 
        fill="none" stroke="#1e3a8a" stroke-width="3" stroke-dasharray="6,3" marker-end="url(#train-arrow)"/>

  <!-- 5. CITY & REGION LABELS (High Legibility with Drop Shadow & Contrast Badges) -->

  <!-- London Badge -->
  <g transform="translate(695, 1070)" filter="url(#soft-shadow)">
    <rect x="-38" y="14" width="76" height="24" rx="4" fill="#1e293b" stroke="#dc2626" stroke-width="1.5"/>
    <text x="0" y="30" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">LONDON</text>
    <text x="0" y="47" font-size="9" font-weight="700" fill="#991b1b" text-anchor="middle">800,000 Evacuees</text>
  </g>

  <!-- Birmingham Badge -->
  <g transform="translate(585, 970)" filter="url(#soft-shadow)">
    <rect x="-44" y="-32" width="88" height="20" rx="4" fill="#ffffff" stroke="#dc2626" stroke-width="1.2"/>
    <text x="0" y="-18" font-size="10.5" font-weight="800" fill="#991b1b" text-anchor="middle">Birmingham</text>
  </g>

  <!-- Liverpool & Manchester Badges -->
  <g transform="translate(525, 860)" filter="url(#soft-shadow)">
    <rect x="-35" y="12" width="70" height="19" rx="3" fill="#ffffff" stroke="#dc2626" stroke-width="1.2"/>
    <text x="0" y="25.5" font-size="10" font-weight="800" fill="#991b1b" text-anchor="middle">Liverpool</text>
  </g>
  <g transform="translate(575, 855)" filter="url(#soft-shadow)">
    <rect x="-42" y="-28" width="84" height="19" rx="3" fill="#ffffff" stroke="#dc2626" stroke-width="1.2"/>
    <text x="0" y="-14.5" font-size="10" font-weight="800" fill="#991b1b" text-anchor="middle">Manchester</text>
  </g>

  <!-- Newcastle Badge -->
  <g transform="translate(615, 705)" filter="url(#soft-shadow)">
    <rect x="-38" y="-28" width="76" height="19" rx="3" fill="#ffffff" stroke="#dc2626" stroke-width="1.2"/>
    <text x="0" y="-14.5" font-size="10" font-weight="800" fill="#991b1b" text-anchor="middle">Newcastle</text>
  </g>

  <!-- Portsmouth / Southampton Badge -->
  <g transform="translate(635, 1150)" filter="url(#soft-shadow)">
    <rect x="-55" y="14" width="110" height="19" rx="3" fill="#ffffff" stroke="#dc2626" stroke-width="1.2"/>
    <text x="0" y="27.5" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">Portsmouth / S'ton</text>
  </g>

  <!-- GREEN RECEPTION REGION CALLOUTS -->
  <!-- Rural Wales -->
  <g transform="translate(450, 960)" filter="url(#soft-shadow)">
    <rect x="-50" y="-14" width="100" height="34" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>
    <text x="0" y="0" font-size="11.5" font-weight="800" fill="#15803d" text-anchor="middle" letter-spacing="0.5">RURAL WALES</text>
    <text x="0" y="14" font-size="8.5" font-weight="700" fill="#166534" text-anchor="middle">Safe Countryside Haven</text>
  </g>

  <!-- Devon & Cornwall -->
  <g transform="translate(420, 1205)" filter="url(#soft-shadow)">
    <rect x="-65" y="-14" width="130" height="34" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>
    <text x="0" y="0" font-size="11.5" font-weight="800" fill="#15803d" text-anchor="middle" letter-spacing="0.5">DEVON &amp; CORNWALL</text>
    <text x="0" y="14" font-size="8.5" font-weight="700" fill="#166534" text-anchor="middle">Farms, Orchards &amp; Coast</text>
  </g>

  <!-- Lake District & Yorkshire Dales -->
  <g transform="translate(560, 745)" filter="url(#soft-shadow)">
    <rect x="-60" y="-14" width="120" height="34" rx="5" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.8"/>
    <text x="0" y="0" font-size="11" font-weight="800" fill="#15803d" text-anchor="middle" letter-spacing="0.5">YORKSHIRE DALES</text>
    <text x="0" y="14" font-size="8.5" font-weight="700" fill="#166534" text-anchor="middle">&amp; Lake District Havens</text>
  </g>

  <!-- SEAS LABELS -->
  <text x="800" y="850" font-size="16" font-weight="800" fill="#0284c7" letter-spacing="4" opacity="0.6" font-style="italic">NORTH SEA</text>
  <text x="360" y="870" font-size="14" font-weight="800" fill="#0284c7" letter-spacing="3" opacity="0.6" font-style="italic">IRISH SEA</text>
  <text x="640" y="1290" font-size="15" font-weight="800" fill="#0284c7" letter-spacing="4" opacity="0.6" font-style="italic">ENGLISH CHANNEL</text>

  <!-- 6. TOP EDUCATIONAL MASTHEAD BANNER -->
  <g transform="translate(285, 555)" filter="url(#soft-shadow)">
    <rect width="365" height="74" rx="6" fill="#ffffff" stroke="#1e3a8a" stroke-width="2"/>
    <rect x="0" y="0" width="7" height="74" rx="3" fill="#1e3a8a"/>
    <text x="18" y="24" font-family="'Cinzel', Georgia, serif" font-size="15" font-weight="900" fill="#0f172a" letter-spacing="0.8">OPERATION PIED PIPER (1939)</text>
    <text x="18" y="44" font-size="11.5" font-weight="800" fill="#b45309">Where Did 1.5 Million Children Go?</text>
    <text x="18" y="62" font-size="9" font-weight="600" fill="#475569">Ministry of Health Scheme • 1–3 September 1939</text>
  </g>

  <!-- 7. CHILD-FRIENDLY MAP KEY (LEGEND) -->
  <g transform="translate(275, 1030)" filter="url(#soft-shadow)">
    <rect width="170" height="152" rx="6" fill="#ffffff" stroke="#334155" stroke-width="1.8"/>
    <text x="12" y="22" font-size="10.5" font-weight="900" fill="#0f172a" text-transform="uppercase" letter-spacing="0.8">Map Key (What to Look For)</text>
    <line x1="12" y1="28" x2="158" y2="28" stroke="#e2e8f0" stroke-width="1"/>
    
    <!-- Red Zone Swatch -->
    <circle cx="21" cy="45" r="7" fill="#ef4444" stroke="#dc2626" stroke-width="1.5"/>
    <text x="34" y="47" font-size="9.2" font-weight="800" fill="#991b1b">Evacuation Cities</text>
    <text x="34" y="58" font-size="7.8" font-weight="600" fill="#64748b">Danger from air bombs</text>

    <!-- Green Zone Swatch -->
    <rect x="14" y="72" width="14" height="14" rx="3" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
    <text x="34" y="81" font-size="9.2" font-weight="800" fill="#166534">Reception Areas</text>
    <text x="34" y="92" font-size="7.8" font-weight="600" fill="#64748b">Safe rural countryside</text>

    <!-- Train Arrow Swatch -->
    <line x1="14" y1="112" x2="28" y2="112" stroke="#1e3a8a" stroke-width="3" stroke-dasharray="4,2"/>
    <polygon points="28,112 24,109 24,115" fill="#1e3a8a"/>
    <text x="34" y="114" font-size="9.2" font-weight="800" fill="#1e3a8a">Evacuation Train Line</text>
    <text x="34" y="125" font-size="7.8" font-weight="600" fill="#64748b">Children moved west &amp; north</text>

    <!-- Neutral Note -->
    <text x="12" y="142" font-size="7.5" font-weight="600" fill="#94a3b8" font-style="italic">Source: Ministry of Health (1939)</text>
  </g>

  <!-- 8. COMPASS ROSE -->
  <g transform="translate(830, 615)">
    <circle cx="0" cy="0" r="26" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" filter="url(#soft-shadow)"/>
    <polygon points="0,-22 4,-5 22,0 4,5 0,22 -4,5 -22,0 -4,-5" fill="#cbd5e1"/>
    <polygon points="0,-22 0,0 4,-5" fill="#1e3a8a"/>
    <polygon points="0,22 0,0 -4,5" fill="#475569"/>
    <polygon points="22,0 0,0 4,5" fill="#475569"/>
    <polygon points="-22,0 0,0 -4,-5" fill="#475569"/>
    <text x="0" y="-26" font-size="9.5" font-weight="900" fill="#1e3a8a" text-anchor="middle">N</text>
  </g>

  <!-- 9. REPROGRAPHIC CITATION STAMP -->
  <rect x="270" y="1310" width="615" height="20" fill="#ffffff" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1"/>
  <text x="577" y="1323" font-size="8" font-weight="700" fill="#64748b" text-anchor="middle">
    The History Revision Hub • KS2 Cartographic Archive • Certified for Classroom Reprographics (Ref: TNA HMSO / MH 102)
  </text>
</svg>`;

// Save the new SVG
const outputSvgPath = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'ks2_ww2',
  'assets',
  'evacuation_map_ks2_pupil.svg',
);
fs.writeFileSync(outputSvgPath, ks2EvacSvg, 'utf8');

// Render high-res PNG and JPG
const outputPngPath = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'ks2_ww2',
  'assets',
  'evacuation_map_ks2_pupil.png',
);
const outputJpgPath = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'ks2_ww2',
  'assets',
  'evacuation_map_ks2_pupil.jpg',
);
const legacyJpgPath = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'ks2_ww2',
  'assets',
  'evacuation_map_1939.jpg',
);

async function render() {
  await sharp(Buffer.from(ks2EvacSvg)).png({ quality: 100 }).toFile(outputPngPath);
  console.log('✅ Rendered high-res PNG at:', outputPngPath);

  await sharp(outputPngPath).jpeg({ quality: 95 }).toFile(outputJpgPath);
  console.log('✅ Rendered high-res JPG at:', outputJpgPath);

  // Overwrite the legacy file so all current links display the new map
  await sharp(outputPngPath).jpeg({ quality: 95 }).toFile(legacyJpgPath);
  console.log('✅ Overwritten legacy file at:', legacyJpgPath);
}

render().catch(console.error);
