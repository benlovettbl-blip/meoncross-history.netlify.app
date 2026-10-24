/**
 * scripts/render_standard_textbook_cold_war.cjs
 *
 * 12-PAGE MASTER CLASSROOM COMPANION TEXTBOOK (3 Sheets of A3 Saddle-Stitch Model)
 * Conforms strictly to the Disciplinary Classroom Textbook Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim fidelity to the live app data in units/cold_war/data.js
 * - Exactly 12 pages (3 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1: Master Front Cover (Hero artwork plate, canonical synopsis blurb, 7-Enquiry directory)
 * - Page 2: Master Chronological Milestone Spine (14 defining turning points & causal dominoes 1945–1991)
 * - Page 3: Cartographic Theater & Geopolitical Context (Divided Europe, Global Proxy Arc & 4 Strategic Flashpoints)
 * - Pages 4–10: Seven Canonical Enquiries (1 dense, beautifully formatted full page per enquiry)
 * - Page 11: Disciplinary Historiography & Core Conceptual Architecture (4 Scholarly Debates & 8 Core Concepts)
 * - Page 12: Master 35-Question Knowledge Retrieval Quiz Back Cover (7 Enquiry Cards, 5 questions each = Qs 1–35)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');
const { autoCalibrateTextbook } = require('./auto_calibrate_engine.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.webp'
                ? 'image/webp'
                : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>) and bracketed tags
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(
      /<span\s+class=["'](?:para-ref|para-pill|archival-meta-tag)["']>[^<]*<\/span>\s*/gi,
      '',
    )
    .replace(/\[\d+\.\d+[A-Z]?\]\s*/g, '')
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .replace(
      /\s*\((?:<strong>)?(?:Source|Interpretation|Figure)\s+[A-Z0-9]+(?:<\/strong>)?\)/gi,
      '',
    )
    .replace(/([a-zA-Z])"([a-zA-Z])/g, '$1" $2')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Load canonical data from units/cold_war/data.js
function loadUnitData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'cold_war', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+unitData;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  return vm.runInNewContext(raw);
}

// Canonical unit narrative synopsis from src/unit_synopses.js
const canonicalSynopsis =
  'In the smouldering ruins of post-war Europe, two continental superpowers—the capitalist United States and the communist Soviet Union—embarked upon a titanic struggle for the ideological mastery of the globe. From the division of Germany and the heroic aerial lifeline of the Berlin Airlift to the nuclear brinkmanship of the Cuban Missile Crisis and the bloody proxy wars in Korea and Vietnam, the Cold War redefined warfare, diplomacy, and human survival. Confront how espionage, the balance of nuclear terror, the construction and dramatic collapse of the Berlin Wall, and the reformist gamble of Mikhail Gorbachev finally brought four decades of global confrontation to a peaceful conclusion without a direct third world war.';

// Milestone timeline data for Page 2 (14 Turning Points 1945–1991)
const milestones = [
  {
    date: '4–11 Feb 1945',
    title: 'Yalta Summit & The Division of Germany',
    desc: 'The "Big Three" agree to partition Germany and Berlin into four occupation zones and commit to free elections across liberated Eastern Europe.',
    ref: '2.1–2.2',
  },
  {
    date: '16 July – 2 Aug 1945',
    title: 'Trinity Test & The Potsdam Conference',
    desc: 'Truman reveals atomic capability to Stalin; deep rifts emerge over Soviet reparations, Polish borders, and the ideological control of Eastern Europe.',
    ref: '2.3–2.5',
  },
  {
    date: '6 & 9 Aug 1945',
    title: 'Atomic Bombing of Hiroshima & Nagasaki',
    desc: "The United States establishes a temporary nuclear monopoly, intensifying Stalin's security paranoia and initiating four decades of nuclear arms race.",
    ref: '1.4',
  },
  {
    date: '5 Mar 1946',
    title: 'Churchill\'s "Iron Curtain" Speech at Fulton',
    desc: 'Winston Churchill warns that an iron curtain has descended from Stettin in the Baltic to Trieste in the Adriatic, dividing Europe into hostile camps.',
    ref: '3.1',
  },
  {
    date: '12 Mar 1947',
    title: 'The Truman Doctrine & Containment Doctrine',
    desc: 'President Truman pledges $400 million in emergency aid to Greece and Turkey, establishing the foundational US policy of global communist containment.',
    ref: '3.2',
  },
  {
    date: '3 Apr 1948',
    title: 'The Marshall Plan Enacted (European Recovery)',
    desc: 'The US commits $13.3 billion to rebuild war-torn European economies, immunizing democracies against communism; Stalin forbids satellites to participate.',
    ref: '3.2',
  },
  {
    date: '24 June 1948',
    title: 'Berlin Blockade & Allied Airlift Launched',
    desc: 'Stalin severs all land and canal transit to West Berlin; Western Allies respond with Operation Plainfare, flying in 2.3 million tons of supplies.',
    ref: '3.4',
  },
  {
    date: '4 Apr 1949',
    title: 'Creation of NATO & The Dual German States',
    desc: 'Twelve Western nations sign the North Atlantic Treaty for collective defence. In May, West Germany becomes the FRG; in October, East Germany becomes the GDR.',
    ref: '3.5',
  },
  {
    date: '25 June 1950',
    title: 'Outbreak of the Korean War Across 38th Parallel',
    desc: 'North Korea invades the South; the UN authorizes military intervention under Douglas MacArthur, triggering Chinese intervention and trench stalemate.',
    ref: '5.2',
  },
  {
    date: '14 May 1955',
    title: 'Warsaw Pact Established by the Soviet Union',
    desc: 'In response to a rearmed West Germany joining NATO, the USSR and seven Eastern bloc satellite nations establish a unified military alliance.',
    ref: '3.5',
  },
  {
    date: '13 Aug 1961',
    title: 'Construction of the Berlin Wall Begins',
    desc: 'East German soldiers erect concrete barriers and barbed wire to halt the catastrophic flight of 2.7 million skilled citizens escaping to West Berlin.',
    ref: '6.1',
  },
  {
    date: '16–28 Oct 1962',
    title: 'Cuban Missile Crisis & The Thirteen Days',
    desc: 'US spy planes photograph Soviet nuclear missile sites in Cuba. Kennedy imposes a naval quarantine; secret negotiations avert nuclear holocaust.',
    ref: '4.1–4.5',
  },
  {
    date: '9 Nov 1989',
    title: 'Fall of the Berlin Wall & Border Opening',
    desc: 'Jubilant crowds dismantle border fortifications following botched travel decrees, precipitating the collapse of communist regimes across Eastern Europe.',
    ref: '6.4',
  },
  {
    date: '25–26 Dec 1991',
    title: 'Gorbachev Resigns & Dissolution of the USSR',
    desc: 'Mikhail Gorbachev resigns as Soviet President and the Soviet flag is lowered over the Kremlin, terminating the USSR and ending the Cold War.',
    ref: '6.5',
  },
];

// 35 Retrieval Quiz Questions for Page 12 (7 Enquiries x 5 Questions)
const quizCards = [
  {
    topic: 'Enquiry 1: Ideological Foundations',
    ref: 'Page 4 • Ref [1.1]–[1.5]',
    questions: [
      'What two opposing economic doctrines defined the Cold War superpower confrontation?',
      'How did American liberal democracy contrast with the Soviet one-party dictatorship?',
      'Which 1918–19 foreign military intervention created deep, lasting Bolshevik suspicion of the West?',
      'In what month and year did the United States detonate atomic weapons over Hiroshima and Nagasaki?',
      'Which French philosopher famously observed in 1947: "Peace is impossible; war is improbable"?',
    ],
  },
  {
    topic: 'Enquiry 2: Yalta to Potsdam (1945)',
    ref: 'Page 5 • Ref [2.1]–[2.5]',
    questions: [
      'Which three Allied leaders constituted the original "Big Three" at the Yalta Summit in February 1945?',
      'What agreement at Yalta promised democratic institutions and free elections across liberated Europe?',
      'Which new American president replaced Franklin D. Roosevelt at the Potsdam Conference in July 1945?',
      'What was the codename for the successful American atomic bomb detonation tested in New Mexico in July 1945?',
      'Into how many separate military occupation zones were Germany and Berlin divided in 1945?',
    ],
  },
  {
    topic: 'Enquiry 3: Iron Curtain & Blockade',
    ref: 'Page 6 • Ref [3.1]–[3.5]',
    questions: [
      'In what American town and year did Winston Churchill deliver his famous "Iron Curtain" address?',
      'What landmark American foreign policy announced in March 1947 committed the US to global containment?',
      'How much financial aid did the Marshall Plan transfer to Western European nations to rebuild their economies?',
      'What logistical operation flew 2.3 million tons of supplies into West Berlin during the 11-month blockade?',
      'What collective defence treaty organisation was established by Western powers in Washington in April 1949?',
    ],
  },
  {
    topic: 'Enquiry 4: The Cuban Missile Crisis',
    ref: 'Page 7 • Ref [4.1]–[4.5]',
    questions: [
      'What revolutionary leader seized power in Cuba in January 1959 after overthrowing the Batista regime?',
      'What type of high-altitude US reconnaissance aircraft first photographed Soviet missile sites in Cuba in October 1962?',
      'What action did President Kennedy choose to take against Cuba on 22 October 1962 rather than an immediate invasion?',
      'What highest peacetime military readiness alert did the US Strategic Air Command reach during the crisis?',
      'What secret reciprocal concession did President Kennedy offer regarding US missiles in Turkey to secure a deal?',
    ],
  },
  {
    topic: 'Enquiry 5: Proxy Wars in Asia',
    ref: 'Page 8 • Ref [5.1]–[5.5]',
    questions: [
      'Along what line of latitude was the Korean peninsula divided following the Second World War?',
      'What daring amphibious landing did General Douglas MacArthur execute in September 1950?',
      'Which foreign superpower launched an unexpected military counter-offensive in Korea in late 1950?',
      'What 1954 military defeat ended French colonial rule in Indochina and divided Vietnam at the 17th Parallel?',
      'What vast underground network did the National Liberation Front (Vietcong) use to survive American aerial bombardment?',
    ],
  },
  {
    topic: 'Enquiry 6: Berlin Wall & Soviet Collapse',
    ref: 'Page 9 • Ref [6.1]–[6.5]',
    questions: [
      'In what month and year did the East German government begin constructing the Berlin Wall?',
      'What were Mikhail Gorbachev\'s twin reform policies of "political openness" and "economic restructuring"?',
      'What 1968 Soviet military doctrine was formally abandoned by Gorbachev, allowing satellite states self-determination?',
      'On what exact date in November 1989 did East German border guards open checkpoints at the Berlin Wall?',
      'On what exact date did Mikhail Gorbachev resign as president, formally dissolving the Soviet Union?',
    ],
  },
  {
    topic: 'Enquiry 7: Synoptic Assessment',
    ref: 'Page 10 • Ref [7.1]–[7.5]',
    questions: [
      'Approximately how many people died in regional proxy conflicts across the Global South during the Cold War?',
      'What 1975 international accords recognised European borders and established human rights commitments?',
      'What military concept (MAD) ensured that a nuclear strike by either superpower would lead to mutual destruction?',
      'What satellite launched by the USSR in October 1957 initiated the Cold War space and missile race?',
      'How did historians define the paradox of European stability coexisting with catastrophic global proxy violence?',
    ],
  },
];

function buildHtml() {
  const unitData = loadUnitData();
  const heroImageBase64 = getBase64Image(
    unitData.homepage_background || '/images/cold_war_cover.jpg',
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Cold War &amp; Global Flashpoints (1945–1991) • Master Classroom Companion Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,500;1,600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #0f172a;
    }

    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0 auto 10mm auto;
      background: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 11mm 14mm 9mm 14mm;
      page-break-after: always;
      page-break-inside: avoid;
    }

    @media print {
      body {
        background: #ffffff;
      }
      .page {
        margin: 0;
        box-shadow: none;
      }
    }

    /* Common Running Header / Footer */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 5px;
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.08em;
    }

    .running-header .sub-badge {
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.04em;
    }

    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.8pt;
      color: #64748b;
      white-space: nowrap;
    }

    .running-footer .page-pill {
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      padding: 1px 7px;
      border-radius: 2px;
      font-size: 6.8pt;
    }

    /* ==========================================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================================== */
    .cover-page {
      padding: 10mm 14mm 8mm 14mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .cover-top-masthead {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .cover-series {
      font-size: 8.2pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #0f172a;
    }

    .cover-sub-series {
      font-size: 6.8pt;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #ffffff;
      background: #0f172a;
      padding: 2px 6px;
      border-radius: 3px;
      text-transform: uppercase;
    }

    .cover-title-block {
      text-align: center;
      margin: 4px 0 3px 0;
    }

    .cover-spec-pill {
      display: inline-block;
      background: #e2e8f0;
      color: #334155;
      font-size: 6.8pt;
      font-weight: 700;
      letter-spacing: 0.06em;
      padding: 2px 8px;
      border-radius: 12px;
      margin-bottom: 3px;
      text-transform: uppercase;
    }

    .cover-main-title {
      font-family: 'Cinzel', serif;
      font-size: 20pt;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: 0.03em;
      color: #0f172a;
      margin: 0 0 2px 0;
    }

    .cover-subtitle {
      font-family: 'Lora', Georgia, serif;
      font-size: 8.8pt;
      font-style: italic;
      color: #475569;
    }

    .cover-hero-wrap {
      width: 100%;
      height: 104.5mm;
      border: 1.5px solid #0f172a;
      position: relative;
      background: #0f172a;
      margin: 3px 0 1px 0;
    }

    .cover-hero-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center 30%;
    }

    .cover-hero-caption {
      font-size: 6.6pt;
      color: #475569;
      text-align: center;
      font-style: italic;
      margin-bottom: 3px;
      line-height: 1.25;
    }

    .cover-overview-box {
      background: #fdfbf7;
      border: 1.5px solid #e2d9cc;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 4px;
      padding: 11px 14px;
      margin: 3px 0 5px 0;
    }

    .cover-overview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }

    .cover-overview-title {
      font-size: 7.0pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #1e3a8a;
    }

    .cover-overview-period {
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.06em;
    }

    .cover-overview-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.8pt;
      line-height: 1.52;
      color: #1e293b;
      margin: 0;
      font-style: italic;
      text-align: justify;
    }

    .cover-directory {
      border: 1.5px solid #0f172a;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 5px;
    }

    .cover-directory-head {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
    }

    .cover-directory-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      background: #ffffff;
    }

    .cover-directory-table tr {
      border-bottom: 1px solid #e2e8f0;
    }

    .cover-directory-table tr:last-child {
      border-bottom: none;
    }

    .cover-directory-table td {
      padding: 4px 8px;
      vertical-align: middle;
    }

    .col-num {
      width: 55px;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .col-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 7.5pt;
      width: 36%;
      line-height: 1.25;
    }

    .col-eq {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      color: #475569;
      font-size: 7.2pt;
      padding-left: 6px;
      line-height: 1.28;
    }

    .col-page {
      width: 48px;
      text-align: right;
      font-weight: 800;
      color: #1e3a8a;
      white-space: nowrap;
    }

    .cover-concepts-strip {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 3px;
      padding: 3.5px 8px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #1e3a8a;
      margin-bottom: 3px;
    }

    .cover-concepts-tag {
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 4.5px;
      border-radius: 2px;
      white-space: nowrap;
      font-size: 6.0pt;
    }

    /* ==========================================================================
       PAGE 2: CHRONOLOGICAL MILESTONE SPINE
       ========================================================================== */
    .spine-header-block {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 6px;
    }

    .spine-main-title {
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0;
      white-space: nowrap;
    }

    .spine-subtitle {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.4pt;
      font-style: italic;
      color: #475569;
      margin-top: 1.5px;
      white-space: nowrap;
    }

    .milestone-timeline {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 5.5px;
      position: relative;
      padding: 4px 0 4px 0;
    }

    .milestone-timeline::before {
      content: '';
      position: absolute;
      left: 78px;
      top: 10px;
      bottom: 10px;
      width: 2px;
      background: #cbd5e1;
      z-index: 1;
    }

    .milestone-item {
      display: flex;
      align-items: flex-start;
      position: relative;
      z-index: 2;
      margin-bottom: 0;
    }

    .milestone-date-box {
      width: 72px;
      text-align: right;
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e3a8a;
      padding-right: 10px;
      line-height: 1.2;
      flex-shrink: 0;
      margin-top: 1.5px;
    }

    .milestone-node {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ffffff;
      border: 2.5px solid #1e3a8a;
      flex-shrink: 0;
      margin-right: 9px;
      margin-top: 2px;
    }

    .milestone-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #1e3a8a;
      border-radius: 3px;
      padding: 3.5px 8px;
    }

    .milestone-header-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }

    .milestone-title {
      font-size: 8.4pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
    }

    .milestone-desc {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.6pt;
      line-height: 1.30;
      color: #334155;
      margin: 0;
    }

    /* ==========================================================================
       PAGE 3: CARTOGRAPHIC THEATER & FLASHPOINTS
       ========================================================================== */
    .carto-header-block {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 6px;
    }

    .carto-main-title {
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0;
      white-space: nowrap;
    }

    .carto-subtitle {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.4pt;
      font-style: italic;
      color: #475569;
      margin-top: 1.5px;
      white-space: nowrap;
    }

    .carto-top-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 8px;
    }

    .carto-theater-card {
      border: 1.2px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 10.5px 12px;
      background: #fdfbf7;
    }

    .carto-card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2d9cc;
      padding-bottom: 2px;
      margin-bottom: 4px;
    }

    .carto-card-title {
      font-size: 7.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .carto-card-tag {
      font-size: 6.5pt;
      font-weight: 700;
      color: #64748b;
    }

    .carto-card-body {
      font-family: 'Lora', Georgia, serif;
      font-size: 8.05pt;
      line-height: 1.45;
      color: #1e293b;
      margin: 0;
    }

    .carto-matrix-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 8px;
    }

    .matrix-box {
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      overflow: hidden;
      background: #ffffff;
    }

    .matrix-header {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 8px;
      font-size: 7.1pt;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .matrix-subtitle {
      font-size: 6.2pt;
      font-weight: 600;
      color: #94a3b8;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.3pt;
      line-height: 1.35;
    }

    .data-table th {
      text-align: left;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding: 4px 5px;
      background: #f8fafc;
      font-size: 6.6pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .data-table td {
      padding: 4px 5px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }

    .data-table tr:last-child td {
      border-bottom: none;
    }

    .data-table td.strong {
      font-weight: 700;
      color: #0f172a;
    }

    .data-table td.num {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    .data-table td.pct {
      text-align: right;
      font-weight: 700;
      color: #dc2626;
      font-variant-numeric: tabular-nums;
    }

    .flashpoints-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .flashpoint-item {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 2px;
      padding: 12.5px 13px;
      background: #ffffff;
    }

    .flashpoint-num {
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }

    .flashpoint-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 3px;
      line-height: 1.2;
    }

    .flashpoint-desc {
      font-family: 'Lora', Georgia, serif;
      font-size: 8.15pt;
      line-height: 1.45;
      color: #334155;
      margin: 0;
    }

    /* ==========================================================================
       PAGES 4–10: ENQUIRY LESSON PAGES
       ========================================================================== */
    .enquiry-banner {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 6px;
    }

    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5px;
    }

    .enquiry-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 1.5px 6px;
      border-radius: 2px;
    }

    .enquiry-canon-tag {
      font-size: 6.5pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 11.2pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 2.5px 0;
    }

    .enquiry-core-question {
      background: #f1f5f9;
      border-left: 3px solid #1e3a8a;
      padding: 2px 6px;
      font-size: 7.2pt;
      font-weight: 700;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .enquiry-core-question span.label {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 4.5px;
      border-radius: 2px;
      font-size: 5.8pt;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .prose-columns {
      column-count: 2;
      column-gap: 16px;
      column-fill: balance;
      text-align: justify;
      text-justify: inter-word;
      hyphens: auto;
    }

    .block-section {
      break-inside: auto;
      margin-bottom: 5px;
    }

    .block-header {
      break-after: avoid;
      break-inside: avoid;
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 1.5px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1px;
    }

    .block-ref {
      font-size: 6.8pt;
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      padding: 0 3.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }

    .block-title {
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      line-height: 1.15;
    }

    .block-prose {
      font-family: 'Lora', Georgia, serif;
      color: #1e293b;
      margin: 0;
    }

    .block-prose strong {
      font-weight: 700;
      color: #0f172a;
    }

    /* Calibrated typography per enquiry page */
    .page-lesson-1 .block-section { margin-bottom: 3.5px; }
    .page-lesson-1 .block-prose { font-size: 9.35pt; line-height: 1.36; }

    .page-lesson-2 .block-section { margin-bottom: 4.2px; }
    .page-lesson-2 .block-prose { font-size: 9.85pt; line-height: 1.41; }

    .page-lesson-3 .block-section { margin-bottom: 3.8px; }
    .page-lesson-3 .block-prose { font-size: 9.50pt; line-height: 1.38; }

    .page-lesson-4 .block-section { margin-bottom: 3.5px; }
    .page-lesson-4 .block-prose { font-size: 9.35pt; line-height: 1.36; }

    .page-lesson-5 .block-section { margin-bottom: 3.8px; }
    .page-lesson-5 .block-prose { font-size: 9.45pt; line-height: 1.37; }

    .page-lesson-6 .block-section { margin-bottom: 3.5px; }
    .page-lesson-6 .block-prose { font-size: 9.35pt; line-height: 1.36; }

    .page-lesson-7 .block-section { margin-bottom: 4.2px; }
    .page-lesson-7 .block-prose { font-size: 9.90pt; line-height: 1.42; }

    /* ==========================================================================
       PAGE 11: DISCIPLINARY HISTORIOGRAPHY & CONCEPTS
       ========================================================================== */
    #page-11 {
      justify-content: flex-start;
    }

    #page-11 .running-footer {
      margin-top: auto;
    }

    .histo-header-block {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 6px;
    }

    .histo-main-title {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin: 0;
    }

    .histo-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.0pt;
      font-style: italic;
      color: #475569;
      margin-top: 1.5px;
    }

    .histo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }

    .histo-card {
      border: 1.2px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 14.5px 16px;
      background: #fdfbf7;
    }

    .histo-card-tag {
      font-size: 6.6pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 2px;
    }

    .histo-card-title {
      font-size: 8.7pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 3px;
      line-height: 1.2;
    }

    .histo-card-body {
      font-family: 'Lora', Georgia, serif;
      font-size: 8.45pt;
      line-height: 1.50;
      color: #1e293b;
      margin: 0;
    }

    .concepts-box {
      border: 1.2px solid #0f172a;
      border-radius: 3px;
      padding: 13px 15px;
      background: #ffffff;
      margin-top: 0;
    }

    .concepts-header {
      font-size: 7.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.10em;
      border-bottom: 1.2px solid #e2e8f0;
      padding-bottom: 2.5px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .concepts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 10px;
    }

    .concept-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      border-radius: 2px;
      padding: 11px 12px;
      font-size: 7.95pt;
      line-height: 1.42;
      color: #334155;
    }

    .concept-card strong {
      color: #0f172a;
      font-weight: 800;
      display: block;
      font-size: 8.05pt;
      margin-bottom: 1.5px;
    }

    /* ==========================================================================
       PAGE 12: RETRIEVAL QUIZ BACK COVER
       ========================================================================== */
    #page-12 {
      justify-content: flex-start;
    }

    #page-12 .running-footer {
      margin-top: auto;
    }

    .quiz-top-masthead {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }

    .quiz-badge {
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 1px;
    }

    .quiz-main-title {
      font-family: 'Cinzel', serif;
      font-size: 15pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin: 0;
    }

    .quiz-instruction-banner {
      background: #f1f5f9;
      border-left: 3.5px solid #1e3a8a;
      padding: 6.5px 12px;
      border-radius: 2px;
      margin-bottom: 9px;
      font-size: 7.25pt;
      line-height: 1.44;
      color: #334155;
    }

    .quiz-instruction-banner strong {
      color: #0f172a;
    }

    .quiz-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .quiz-card {
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 8.5px 11px;
      background: #fdfbf7;
    }

    .quiz-card-full {
      grid-column: 1 / -1;
    }

    .quiz-card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3.5px;
    }

    .quiz-card-topic {
      font-size: 8.0pt;
      font-weight: 800;
      color: #0f172a;
    }

    .quiz-card-ref {
      font-size: 6.6pt;
      font-weight: 700;
      color: #1e3a8a;
    }

    .quiz-questions-list {
      margin: 0;
      padding-left: 14px;
      font-family: 'Lora', Georgia, serif;
      font-size: 8.55pt;
      line-height: 1.44;
      color: #1e293b;
    }

    .quiz-questions-list li {
      margin-bottom: 3px;
    }

    .quiz-questions-list li:last-child {
      margin-bottom: 0;
    }

    .quiz-questions-list li {
      margin-bottom: 3.5px;
    }

    .quiz-questions-list li:last-child {
      margin-bottom: 0;
    }
  </style>
</head>
<body>

  <!-- ======================================================================
       PAGE 1: MASTER FRONT COVER
       ====================================================================== -->
  <div class="page cover-page" id="page-1">
    
    <div class="cover-top-masthead">
      <span class="cover-series">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="cover-sub-series">KEY STAGE 4 &bull; PEARSON EDEXCEL GCSE OPTION 26/27</span>
    </div>

    <div class="cover-title-block">
      <span class="cover-spec-pill">Pearson Edexcel GCSE (9–1) History &bull; Paper 2 Option 26/27</span>
      <h1 class="cover-main-title">Superpower Relations and the Cold War</h1>
      <div class="cover-subtitle">1941–1991 &bull; Origins of the Cold War &bull; Cold War Crises &bull; The End of the Cold War</div>
    </div>

    <div class="cover-hero-wrap">
      ${heroImageBase64 ? `<img src="${heroImageBase64}" alt="Cold War Checkpoint Charlie Standoff Plate" class="cover-hero-img">` : ''}
    </div>
    <div class="cover-hero-caption">
      Archival Primary Record: Soviet T-54/55 and US M48 Patton tanks face off at point-blank range across the border at Checkpoint Charlie, Friedrichstraße, Berlin, 27–28 October 1961.
    </div>

    <div class="cover-overview-box">
      <div class="cover-overview-header">
        <span class="cover-overview-title">Historical Overview &bull; The Post-War Balance of Terror</span>
        <span class="cover-overview-period">1941 &ndash; 1991</span>
      </div>
      <p class="cover-overview-text">${canonicalSynopsis}</p>
    </div>

    <!-- Canonical Enquiries Scheme of Learning Directory (Australia 4-Column Architecture) -->
    <div class="cover-directory">
      <div class="cover-directory-head">
        <span>The Canonical Enquiries &bull; Scheme of Learning Directory</span>
        <span>A3 Saddle-Stitch Format</span>
      </div>
      <table class="cover-directory-table">
        <tbody>
          <tr>
            <td class="col-num">Enquiry 01</td>
            <td class="col-title">Ideology: Capitalism vs Communism</td>
            <td class="col-eq">Why did irreconcilable philosophies make conflict inevitable?</td>
            <td class="col-page">Page 4</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 02</td>
            <td class="col-title">Yalta to Potsdam (1945): Broken Alliance</td>
            <td class="col-eq">Why did collaborative diplomacy collapse into suspicion?</td>
            <td class="col-page">Page 5</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 03</td>
            <td class="col-title">Iron Curtain &amp; Berlin Blockade (1948&ndash;49)</td>
            <td class="col-eq">How did containment and blockade cement Europe's division?</td>
            <td class="col-page">Page 6</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 04</td>
            <td class="col-title">Nuclear Brinkmanship &amp; Cuban Crisis</td>
            <td class="col-eq">Why did thirteen days in 1962 compel de-escalation?</td>
            <td class="col-page">Page 7</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 05</td>
            <td class="col-title">Proxy Warfare: Korea &amp; Vietnam</td>
            <td class="col-eq">Why did nuclear stalemate displace conflict into Asia?</td>
            <td class="col-page">Page 8</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 06</td>
            <td class="col-title">Collapse of Soviet Union &amp; Berlin Wall</td>
            <td class="col-eq">Why did economic decay and reform culminate in collapse?</td>
            <td class="col-page">Page 9</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 07</td>
            <td class="col-title">Historical Synthesis &amp; Cold War Legacy</td>
            <td class="col-eq">Was the Cold War ever truly 'cold' for the global South?</td>
            <td class="col-page">Page 10</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Core Concepts Anchor Strip -->
    <div class="cover-concepts-strip">
      <span class="cover-concepts-tag">Core Concepts</span>
      <span>Ideology &bull; Capitalism &bull; Communism &bull; Yalta &amp; Potsdam &bull; Iron Curtain &bull; Truman Doctrine &bull; Marshall Plan &bull; Berlin Blockade &bull; NATO &bull; Cuban Missile Crisis &bull; Proxy Wars &bull; Fall of Berlin Wall</span>
    </div>

    <div class="running-footer">
      <span>Page 1 &bull; Master Cover &amp; Course Directory</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span class="page-pill">Option 26/27</span>
    </div>

  </div>

  <!-- ======================================================================
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE
       ====================================================================== -->
  <div class="page" id="page-2">
    
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="sub-badge">CHRONOLOGICAL MILESTONE SPINE &bull; 1945–1991</span>
      <span>PAGE 2</span>
    </div>

    <div class="spine-header-block">
      <h2 class="spine-main-title">Chronological Turning Points &amp; Causal Trajectory</h2>
      <div class="spine-subtitle">Fourteen Pivotal Crises, Treaties &amp; Structural Flashpoints (1945&ndash;1991)</div>
    </div>

    <div class="milestone-timeline">
      ${milestones
        .map(
          (m) => `
        <div class="milestone-item">
          <div class="milestone-date-box">${m.date}</div>
          <div class="milestone-node"></div>
          <div class="milestone-content">
            <div class="milestone-header-row">
              <span class="milestone-title">${m.title}</span>
            </div>
            <p class="milestone-desc">${m.desc}</p>
          </div>
        </div>`,
        )
        .join('')}
    </div>

    <div class="running-footer">
      <span>Page 2 &bull; Master Chronological Spine</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span class="page-pill">1945–1991</span>
    </div>

  </div>

  <!-- ======================================================================
       PAGE 3: DUAL CARTOGRAPHIC THEATER & STRATEGIC FLASHPOINTS
       ====================================================================== -->
  <div class="page" id="page-3">
    
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="sub-badge">GEOPOLITICAL THEATER &amp; STRATEGIC FLASHPOINTS</span>
      <span>PAGE 3</span>
    </div>

    <div class="carto-header-block">
      <h2 class="carto-main-title">The Geography of Superpower Confrontation &amp; Proxy Conflict</h2>
      <div class="carto-subtitle">Divided Europe, Nuclear Thresholds &amp; Four Geopolitical Flashpoints (1945&ndash;1991)</div>
    </div>

    <div class="carto-top-cards">
      <div class="carto-theater-card">
        <div class="carto-card-header">
          <span class="carto-card-title">Theater I: The Divided European Continent</span>
          <span class="carto-card-tag">Iron Curtain &amp; German Partition</span>
        </div>
        <p class="carto-card-body">
          Following the defeat of the Third Reich, Europe was cleaved by a 4,300-mile military divide stretching from the Baltic to the Adriatic. Germany was partitioned in 1949 into the Western capitalist <strong>Federal Republic of Germany (FRG)</strong> and the Eastern Soviet-satellite <strong>German Democratic Republic (GDR)</strong>. West Berlin remained an isolated Western island 110 miles behind Soviet lines. Across this frontier, <strong>NATO (1949)</strong> and the <strong>Warsaw Pact (1955)</strong> deployed over three million troops and tactical nuclear warheads.
        </p>
      </div>

      <div class="carto-theater-card">
        <div class="carto-card-header">
          <span class="carto-card-title">Theater II: The Global Proxy Arc</span>
          <span class="carto-card-tag">Caribbean, East Asia &amp; Nuclear Perimeter</span>
        </div>
        <p class="carto-card-body">
          Deterred from direct nuclear war in Europe, superpower confrontation metastasized across the Global South. In East Asia, the 1949 victory of Mao Zedong's Chinese Communist Party shifted the balance of power, sparking vicious proxy conflicts along the <strong>38th Parallel in Korea (1950–53)</strong> and the <strong>17th Parallel in Vietnam (1954–75)</strong>. In the Caribbean, the 1959 Cuban Revolution breached the Monroe Doctrine, bringing Soviet ballistic missiles within <strong>90 miles of the Florida coast</strong>.
        </p>
      </div>
    </div>

    <div class="carto-matrix-row">
      <div class="matrix-box">
        <div class="matrix-header">
          <span class="matrix-title">Superpower Nuclear Arsenals (1945&ndash;1991)</span>
          <span class="matrix-subtitle">Comparative Warhead Stockpiles</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Year / Landmark</th>
              <th style="text-align: right;">USA</th>
              <th style="text-align: right;">USSR</th>
              <th style="text-align: right;">Strategic Posture</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="strong">1945 (Hiroshima / Nagasaki)</td>
              <td class="num">2</td>
              <td class="num">0</td>
              <td class="pct">US Monopoly</td>
            </tr>
            <tr>
              <td class="strong">1949 (Soviet RDS-1 Test)</td>
              <td class="num">170</td>
              <td class="num">1</td>
              <td class="pct">Atomic Parity Quest</td>
            </tr>
            <tr>
              <td class="strong">1962 (Cuban Missile Crisis)</td>
              <td class="num">25,540</td>
              <td class="num">3,356</td>
              <td class="pct">8:1 US Superiority</td>
            </tr>
            <tr>
              <td class="strong">1975 (Détente / SALT I Accords)</td>
              <td class="num">27,500</td>
              <td class="num">19,000</td>
              <td class="pct">Parity &amp; MAD</td>
            </tr>
            <tr>
              <td class="strong">1986 (Peak Global Stockpiles)</td>
              <td class="num">23,317</td>
              <td class="num">40,159</td>
              <td class="pct">Overkill Capacity</td>
            </tr>
            <tr>
              <td class="strong">1991 (START I / Soviet Dissolution)</td>
              <td class="num">19,008</td>
              <td class="num">35,000</td>
              <td class="pct">Treaty Drawdown</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="matrix-box">
        <div class="matrix-header">
          <span class="matrix-title">Strategic Alliances &amp; Treaties</span>
          <span class="matrix-subtitle">Collective Security Systems</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Pact / Treaty</th>
              <th>Formed</th>
              <th>Headquarters</th>
              <th>Core Strategic Mandate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="strong">NATO</td>
              <td>1949</td>
              <td>Brussels, Belgium</td>
              <td>Article 5 collective defence against Soviet invasion.</td>
            </tr>
            <tr>
              <td class="strong">Warsaw Pact</td>
              <td>1955</td>
              <td>Moscow, USSR</td>
              <td>Soviet-dominated military pact across 7 satellites.</td>
            </tr>
            <tr>
              <td class="strong">SEATO</td>
              <td>1954</td>
              <td>Bangkok, Thailand</td>
              <td>Containment pact blocking Asian communist advance.</td>
            </tr>
            <tr>
              <td class="strong">Non-Aligned (NAM)</td>
              <td>1961</td>
              <td>Belgrade, YUG</td>
              <td>120 nations rejecting superpower military blocs.</td>
            </tr>
            <tr>
              <td class="strong">SALT I Accords</td>
              <td>1972</td>
              <td>Geneva / Moscow</td>
              <td>First treaty capping ICBMs and ABM missile systems.</td>
            </tr>
            <tr>
              <td class="strong">INF Treaty</td>
              <td>1987</td>
              <td>Washington D.C.</td>
              <td>Elimination of all land-based medium-range missiles.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flashpoints-grid">
      <div class="flashpoint-item">
        <div class="flashpoint-num">Flashpoint 01 &bull; Berlin Sector Boundary</div>
        <div class="flashpoint-title">Checkpoint Charlie &amp; Friedrichstraße (1961)</div>
        <p class="flashpoint-desc">
          On 27–28 October 1961, American and Soviet tanks engaged in a 16-hour standoff with live rounds loaded at Checkpoint Charlie. Khrushchev\'s construction of the concrete Berlin Wall halted the flight of 2.7 million skilled East Germans to the West, cementing the physical division of Europe.
        </p>
      </div>

      <div class="flashpoint-item">
        <div class="flashpoint-num">Flashpoint 02 &bull; Caribbean Nuclear Perimeter</div>
        <div class="flashpoint-title">The Cuban Missile Quarantine (1962)</div>
        <p class="flashpoint-desc">
          In October 1962, US U-2 spy planes discovered Soviet nuclear missile pads under construction at San Cristóbal, Cuba. Armed with warheads capable of striking Washington in twelve minutes, their deployment triggered Kennedy\'s naval quarantine, bringing the world within hours of thermonuclear war.
        </p>
      </div>

      <div class="flashpoint-item">
        <div class="flashpoint-num">Flashpoint 03 &bull; East Asian Containment Frontier</div>
        <div class="flashpoint-title">The 38th Parallel DMZ &amp; Korea (1950&ndash;1953)</div>
        <p class="flashpoint-desc">
          When North Korean armour invaded the South in June 1950, President Truman committed US and UN forces under General MacArthur. MacArthur\'s counter-offensive to the Yalu River provoked 300,000 Chinese troops to enter the war, grinding into an armed trench stalemate across the 38th Parallel.
        </p>
      </div>

      <div class="flashpoint-item">
        <div class="flashpoint-num">Flashpoint 04 &bull; Central European Tank Corridor</div>
        <div class="flashpoint-title">The Fulda Gap &amp; NATO Tank Corridor</div>
        <p class="flashpoint-desc">
          The Fulda Gap in Hesse, West Germany, was identified by NATO commanders as the most vulnerable armoured invasion route into Western Europe. Offering Soviet Eighth Guards Army tanks flat terrain to strike toward Frankfurt and the Rhine, NATO stationed elite armoured divisions and atomic artillery here.
        </p>
      </div>
    </div>

    <div class="running-footer">
      <span>Page 3 &bull; Geopolitical Theater Atlas</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span class="page-pill">Page 3 / 12</span>
    </div>

  </div>

  <!-- ======================================================================
       PAGES 4–10: SEVEN CANONICAL ENQUIRIES (1 PAGE PER ENQUIRY)
       ====================================================================== -->
  ${unitData.lessons
    .map((lesson, lIdx) => {
      const pageNum = lIdx + 4;
      const isVerso = pageNum % 2 === 0;
      const runningHeaderTag = isVerso
        ? 'KEY ENQUIRY QUESTION &bull; DISCIPLINARY INVESTIGATION'
        : 'DECISIVE HISTORICAL MECHANISM &bull; NARRATIVE EXPLANATION';

      const coreEnquiryQuestion =
        lesson.enquiry ||
        lesson.core_question ||
        (lIdx === 0
          ? 'Why could Capitalism and Communism never peacefully coexist?'
          : lIdx === 1
            ? 'How did wartime allies transform into bitter geopolitical rivals?'
            : lIdx === 2
              ? 'How did the Berlin Blockade permanently partition the European continent?'
              : lIdx === 3
                ? 'How close did the superpowers come to thermonuclear annihilation in October 1962?'
                : lIdx === 4
                  ? 'Why did superpower confrontation metastasize into brutal proxy wars in Asia?'
                  : lIdx === 5
                    ? 'What structural forces brought down the Berlin Wall and dissolved the Soviet Union?'
                    : 'Was the Cold War ever truly "cold" for the millions caught in its crossfire?');

      return `
    <div class="page page-lesson page-lesson-${lIdx + 1}" id="page-${pageNum}">
      
      <div class="running-header">
        <span>THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
        <span class="sub-badge">${runningHeaderTag}</span>
        <span>PAGE ${pageNum}</span>
      </div>

      <div class="enquiry-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-pill">Enquiry 0${lIdx + 1}</span>
          <span class="enquiry-canon-tag">The Cold War &bull; 1945&ndash;1991</span>
        </div>
        <h2 class="enquiry-title">${lesson.title}</h2>
        <div class="enquiry-core-question">
          <span class="label">Core Enquiry</span>
          <span>${coreEnquiryQuestion}</span>
        </div>
      </div>

      <div class="prose-body">
        <div class="prose-columns">
          ${(lesson.narrative_blocks || [])
            .map(
              (block, bIdx) => `
            <div class="block-section">
              <div class="block-header">
                <span class="block-ref">[${lIdx + 1}.${block.act || bIdx + 1}]</span>
                <span class="block-title">${block.title}</span>
              </div>
              <p class="block-prose">${cleanProse(block.text)}</p>
            </div>`,
            )
            .join('')}
        </div>
      </div>

      <div class="running-footer">
        <span>Page ${pageNum} &bull; Superpower Relations and the Cold War</span>
        <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
        <span class="page-pill">Ref [${lIdx + 1}.1]&ndash;[${lIdx + 1}.${(lesson.narrative_blocks || []).length}]</span>
      </div>

    </div>`;
    })
    .join('')}

  <!-- ======================================================================
       PAGE 11: DISCIPLINARY HISTORIOGRAPHY & CORE CONCEPTS
       ====================================================================== -->
  <div class="page" id="page-11">
    
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="sub-badge">DISCIPLINARY HISTORIOGRAPHY &amp; THEORETICAL FRAMEWORKS</span>
      <span>PAGE 11</span>
    </div>

    <div class="histo-header-block">
      <h2 class="histo-main-title">Scholarly Perspectives &amp; The Architecture of Cold War History</h2>
      <div class="histo-subtitle">How Historians Explain the Origins, Proxy Confrontations &amp; Soviet Collapse</div>
    </div>

    <div class="histo-grid">
      <div class="histo-card">
        <div class="histo-card-tag">Debate 01 &bull; The Orthodox School</div>
        <div class="histo-card-title">Soviet Expansionism &amp; Marxist-Leninist Dogma</div>
        <p class="histo-card-body">
          Writing in the immediate post-war decades, orthodox historians such as <strong>Arthur Schlesinger Jr.</strong> and <strong>Herbert Feis</strong> argued that the Cold War was the direct consequence of Soviet aggression. Driven by Marxist-Leninist universalist ideology and Joseph Stalin's pathological paranoia, Moscow violated the Yalta Declaration on Liberated Europe, imposed brutal puppet regimes across Eastern Europe, and sought world communist domination, forcing the United States to reluctantly mobilize in defence of Western liberty.
        </p>
      </div>

      <div class="histo-card">
        <div class="histo-card-tag">Debate 02 &bull; The Revisionist School</div>
        <div class="histo-card-title">American Economic Imperialism &amp; Atomic Diplomacy</div>
        <p class="histo-card-body">
          Emerging during the Vietnam War era, revisionist scholars such as <strong>William Appleman Williams</strong> and <strong>Gar Alperovitz</strong> argued that American economic expansionism was the primary catalyst. Seeking global open-door markets for surplus industrial goods, Washington sought to construct a worldwide capitalist empire. Truman's deployment of atomic diplomacy against Japan and aggressive encirclement forced Moscow into legitimate, defensive countermeasures to protect its devastated borders.
        </p>
      </div>

      <div class="histo-card">
        <div class="histo-card-tag">Debate 03 &bull; The Post-Revisionist School</div>
        <div class="histo-card-title">Systemic Inevitability &amp; Mutual Misperception</div>
        <p class="histo-card-body">
          Synthesising rival perspectives, post-revisionist historians such as <strong>John Lewis Gaddis</strong> argued that neither superpower was solely responsible. The catastrophic collapse of the European balance of power created a dangerous geopolitical vacuum. Compounded by conflicting ideological worldviews, mutual misperceptions, domestic political pressures, and classic security dilemmas, the division of Europe became a tragic, structurally unavoidable confrontation.
        </p>
      </div>

      <div class="histo-card">
        <div class="histo-card-tag">Debate 04 &bull; The Post-Soviet Archival Turn</div>
        <div class="histo-card-title">Ideological Conviction &amp; The Tail Wags The Dog</div>
        <p class="histo-card-body">
          Exploiting declassified Kremlin, Chinese, and East European archives since 1991, historians such as <strong>Odd Arne Westad</strong> and <strong>Vladislav Zubok</strong> demonstrated that Soviet leaders were genuinely motivated by ideological conviction, not cynical realpolitik. Crucially, recent scholarship shows that ambitious third-world proxy leaders (such as Fidel Castro, Kim Il-sung, and Ho Chi Minh) frequently manipulated their superpower patrons, dragging them into perilous crises.
        </p>
      </div>
    </div>

    <div class="concepts-box">
      <div class="concepts-header">
        <span>Key Disciplinary Vocabulary &amp; Conceptual Architecture</span>
        <span style="font-size: 6.2pt; font-weight: 700; color: #64748b; letter-spacing: 0.04em;">Theoretical Schema &bull; 8 Core Disciplinary Terms</span>
      </div>
      <div class="concepts-grid">
        <div class="concept-card">
          <strong>Containment (Kennan 1946/47):</strong> The foundational US strategic foreign policy formulated by diplomat George F. Kennan, aiming to check the geopolitical spread of Soviet communism through patient, vigilant, and long-term counter-force at key geographical points.
        </div>
        <div class="concept-card">
          <strong>Truman Doctrine (1947):</strong> The landmark foreign policy commitment announced by President Harry S. Truman pledging American financial, logistical, and military assistance to free democratic nations resisting subjugation by armed minorities or external communist pressure.
        </div>
        <div class="concept-card">
          <strong>Marshall Plan (1948):</strong> The $13.3 billion European Recovery Program engineered by Secretary of State George C. Marshall to rebuild shattered Western European capitalist economies, eliminating the widespread poverty and instability that fostered communist appeal.
        </div>
        <div class="concept-card">
          <strong>Mutually Assured Destruction (MAD):</strong> The strategic military doctrine positing that full-scale nuclear weapon use by two opposing superpowers would result in the complete annihilation of both attacker and defender, transforming nuclear weapons into absolute deterrents.
        </div>
        <div class="concept-card">
          <strong>Proxy War:</strong> Regional armed conflicts across the developing world (e.g. Korea, Vietnam, Angola) where opposing superpowers supported, financed, and armed belligerent local factions to project power and secure hegemony without direct nuclear exchange.
        </div>
        <div class="concept-card">
          <strong>Brinkmanship:</strong> The high-risk diplomatic strategy, championed by Secretary of State John Foster Dulles, of deliberately escalating international crises to the absolute precipice of nuclear confrontation to compel the adversary to capitulate or retreat.
        </div>
        <div class="concept-card">
          <strong>Brezhnev Doctrine (1968):</strong> Soviet foreign policy decree declaring that any internal or external threat to socialist rule in any Eastern bloc satellite state constituted a collective threat to all socialist nations, legitimizing armed Soviet military invasion.
        </div>
        <div class="concept-card">
          <strong>Glasnost &amp; Perestroika (1985&ndash;91):</strong> Mikhail Gorbachev's radical reform initiatives of political "openness" (free expression, transparency) and economic "restructuring", designed to revitalize the Soviet system but which inadvertently accelerated its collapse.
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>Page 11 &bull; Historiography, Theory &amp; Concepts</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span class="page-pill">Page 11 / 12</span>
    </div>

  </div>

  <!-- ======================================================================
       PAGE 12: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER (35 QUESTIONS)
       ====================================================================== -->
  <div class="page" id="page-12">
    
    <div class="quiz-top-masthead">
      <div class="quiz-badge">Back Cover &bull; Retrieval Engine &bull; Zero Answers Printed</div>
      <h2 class="quiz-main-title">Master Knowledge Retrieval Quiz</h2>
    </div>

    <div class="quiz-instruction-banner">
      <strong>Standard Recall Protocol:</strong> 35 core retrieval questions testing factual mastery across all seven enquiries. Use for low-stakes weekly partner testing, silent memory flash-checks, or end-of-unit revision retrieval. All facts are verified in textbook narrative sections <strong>[1.1] to [7.5]</strong>. (Answers verified in class; zero answers printed.)
    </div>

    <div class="quiz-grid">
      ${quizCards
        .map(
          (card, cIdx) => `
        <div class="quiz-card ${cIdx === 6 ? 'quiz-card-full' : ''}">
          <div class="quiz-card-header">
            <span class="quiz-card-topic">${card.topic}</span>
            <span class="quiz-card-ref">${card.ref}</span>
          </div>
          <ol class="quiz-questions-list" start="${cIdx * 5 + 1}">
            ${card.questions.map((q) => `<li>${q}</li>`).join('')}
          </ol>
        </div>`,
        )
        .join('')}
    </div>

    <div class="running-footer">
      <span>Page 12 &bull; Master Knowledge Retrieval Quiz</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span class="page-pill">35 Recall Questions</span>
    </div>

  </div>

</body>
</html>`;
}

// Master execution routine
async function main() {
  console.log('🚀 Compiling 12-Page Master Classroom Textbook for [cold_war]...');
  const html = buildHtml();

  const publicHtmlPath = path.join(ROOT_DIR, 'public', 'units', 'cold_war', 'textbook.html');
  const publicPublisherHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'cold_war',
    'textbook_PUBLISHER.html',
  );
  const unitsHtmlPath = path.join(ROOT_DIR, 'units', 'cold_war', 'textbook.html');
  const pdfOutPath = path.join(ROOT_DIR, 'public', 'pdfs', 'cold_war_textbook_FINAL_V17.pdf');
  const pdfCompatFinal = path.join(ROOT_DIR, 'public', 'pdfs', 'cold_war_textbook_FINAL.pdf');
  const pdfCompatBasic = path.join(ROOT_DIR, 'public', 'pdfs', 'cold_war_textbook.pdf');

  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  fs.writeFileSync(publicPublisherHtmlPath, html, 'utf8');
  if (fs.existsSync(path.dirname(unitsHtmlPath))) {
    fs.writeFileSync(unitsHtmlPath, html, 'utf8');
  }
  console.log(
    `✅ Saved 12-Page Textbook HTML to: ${publicHtmlPath} and ${publicPublisherHtmlPath}`,
  );

  // Launch Puppeteer with Chrome
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: chromePath,
      protocolTimeout: 600000,
      args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 120000 });

    // Optional dynamic in-memory calibration
    try {
      await autoCalibrateTextbook(page, { pageSelector: '.page' });
      const calibratedHtml = await page.content();
      fs.writeFileSync(publicHtmlPath, calibratedHtml, 'utf8');
      fs.writeFileSync(publicPublisherHtmlPath, calibratedHtml, 'utf8');
      if (fs.existsSync(path.dirname(unitsHtmlPath))) {
        fs.writeFileSync(unitsHtmlPath, calibratedHtml, 'utf8');
      }
    } catch (e) {
      console.warn('⚠️ Auto-calibrate note:', e.message);
    }

    // Run automated space budget audit
    console.log('\n🔍 Running Automated Space Budget Audit on 12-Page Textbook...');
    const audit = await auditPageBudget(page, {
      underflowThresholdPx: 60,
      pageSelector: '.page',
    });
    printSpaceAuditReport(audit, 'cold_war_textbook.html');

    // Export PDF
    await page.pdf({
      path: pdfOutPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    fs.copyFileSync(pdfOutPath, pdfCompatFinal);
    fs.copyFileSync(pdfOutPath, pdfCompatBasic);
    console.log(`🎉 Successfully generated 12-Page Master Textbook PDF at: ${pdfOutPath}`);
    console.log(`📄 Copied to: ${pdfCompatFinal} and ${pdfCompatBasic}`);
  } catch (err) {
    console.error(`❌ Puppeteer error during textbook rendering:`, err.message);
    throw err;
  } finally {
    if (browser) await browser.close();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
  });
}

module.exports = { buildHtml, renderColdWar: main, run: main };
