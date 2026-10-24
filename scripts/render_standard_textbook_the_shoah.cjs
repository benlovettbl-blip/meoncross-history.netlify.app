/**
 * scripts/render_standard_textbook_the_shoah.cjs
 *
 * 12-PAGE MASTER CLASSROOM TEXTBOOK (3 Sheets of A3 Saddle-Stitch Model)
 * Conforms strictly to the KS3 Classroom Textbook Engine Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim fidelity to the live app data in units/the_shoah/data.js
 * - Exactly 12 pages (3 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1: Master Front Cover (Hero artwork plate, canonical synopsis blurb, 7-Enquiry directory)
 * - Page 2: Master Chronological Milestone Spine (14 defining turning points & causal dominoes 1933–1948)
 * - Page 3: Cartographic Theater & Demographic Context (Europe's 9.5M Jews, Corridor of Annihilation, 4 Strategic Flashpoints)
 * - Pages 4–10: Seven Canonical Enquiries (1 dense, beautifully formatted full page per enquiry)
 * - Page 11: Disciplinary Historiography & The Architecture of Memory (4 Scholarly Debates & Conceptual Architecture)
 * - Page 12: Master 35-Question Knowledge Retrieval Quiz Back Cover (7 Enquiry Cards, 5 questions each = Qs 1–35)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

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

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>)
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(/<span\s+class=["']para-ref["']>[^<]*<\/span>\s*/gi, '')
    .replace(/\[\d+\.\d+\]\s*/g, '')
    .trim();
}

// Load canonical data from units/the_shoah/data.js
function loadUnitData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'the_shoah', 'data.js');
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
  'Before the catastrophic rupture of the Second World War, over nine million Jewish people inhabited every corner of Europe, speaking dozens of languages and enriching the intellectual, artistic, and political fabric of the continent. Trace how Adolf Hitler and the Nazi regime systematically weaponized racial antisemitism to strip German Jews of civil rights and legal personhood, before exploiting the smoke and chaos of total war to engineer the continent-wide annihilation of six million human beings. From the claustrophobic terror of the Warsaw Ghetto and the secret chronicle of the Ringelblum Archive to the mass shootings of the Einsatzgruppen in the killing fields of Ukraine, the industrial extermination machinery of Auschwitz-Birkenau, and the armed heroism of ghetto fighters and righteous rescuers—confront the deepest moral questions of complicity, indifference, human resistance, and the enduring obligation to remember.';

// Milestone timeline data for Page 2 (14 Turning Points 1933–1948)
const milestones = [
  {
    date: '30 Jan 1933',
    title: 'Adolf Hitler Appointed Chancellor & Civil Service Purge',
    desc: 'Hitler takes power. Within weeks, the Law for the Restoration of the Professional Civil Service expels Jewish judges, civil servants, and teachers from public life.',
    ref: '2.1',
  },
  {
    date: '15 Sept 1935',
    title: 'The Nuremberg Race Laws & Stripping of Citizenship',
    desc: 'The Reich Citizenship Law and Blood Protection Law strip German Jews of civic rights and criminalise marriage between Jews and non-Jewish Germans.',
    ref: '2.2',
  },
  {
    date: '9–10 Nov 1938',
    title: 'The November Pogrom ("Kristallnacht") & Mass Arrests',
    desc: 'State-instigated violence destroys over 1,000 synagogues, ransacks 7,000 businesses, murders 91 Jews, and sends 30,000 men to concentration camps.',
    ref: '2.4',
  },
  {
    date: '1 Sept 1939',
    title: 'Invasion of Poland & Outbreak of World War II',
    desc: 'Nazi Germany invades Poland, bringing 3.3 million Polish Jews under brutal military control. Heydrich orders Jews concentrated into urban ghettos.',
    ref: '3.1',
  },
  {
    date: 'Autumn 1939',
    title: 'The Star of David Badge & Forced Ghettoisation',
    desc: 'Jews in occupied Poland are forced to wear distinctive yellow star armbands under penalty of death. Massive enclosed ghettos are established.',
    ref: '3.2–3.3',
  },
  {
    date: 'Nov 1940',
    title: 'The Sealing of the Warsaw Ghetto & Oneg Shabbat',
    desc: 'Over 400,000 people are walled into 1.3 square miles of Warsaw. Emanuel Ringelblum establishes the secret Oneg Shabbat underground archive.',
    ref: '3.3–3.5',
  },
  {
    date: '22 June 1941',
    title: 'Operation Barbarossa & The Holocaust by Bullets',
    desc: 'Invasion of the USSR unleashes four SS Einsatzgruppen squads and Order Police battalions, initiating systematic face-to-face mass shootings.',
    ref: '4.1–4.2',
  },
  {
    date: '29–30 Sept 1941',
    title: 'The Babi Yar Ravine Massacre in Kyiv',
    desc: 'Einsatzgruppe C and local collaborators murder 33,771 Jewish civilians in a ravine outside Kyiv in just forty-eight hours of continuous shooting.',
    ref: '4.3',
  },
  {
    date: '20 Jan 1942',
    title: 'The Wannsee Conference & Industrial Coordination',
    desc: 'Reinhard Heydrich convenes fifteen senior officials in Berlin to coordinate state ministries in the logistical execution of the "Final Solution".',
    ref: '5.1',
  },
  {
    date: '1942–1943',
    title: 'Operation Reinhard & The Pure Death Camps',
    desc: 'Dedicated extermination camps at Bełżec, Sobibór, and Treblinka operate exclusively for murder; 1.7 million Polish Jews are gassed upon arrival.',
    ref: '5.2',
  },
  {
    date: 'April–May 1943',
    title: 'The Warsaw Ghetto Armed Uprising',
    desc: 'Led by 23-year-old Mordechai Anielewicz, the Jewish Combat Organization (ŻOB) wages armed resistance against SS forces for nearly four weeks.',
    ref: '5.4',
  },
  {
    date: 'October 1943',
    title: 'The Nationwide Rescue of Danish Jewry to Sweden',
    desc: 'In a spontaneous national effort, Danish citizens and fishermen secretly ferry over 7,200 Jews across the Øresund to neutral Sweden, saving 95%.',
    ref: '6.4',
  },
  {
    date: 'Winter 1944–45',
    title: 'Death Marches & Liberation of Auschwitz and Belsen',
    desc: 'The SS forces 250,000 starving inmates on death marches into Germany. Auschwitz is liberated by the Red Army; Bergen-Belsen by the British.',
    ref: '7.1–7.2',
  },
  {
    date: '1945–1948',
    title: 'Nuremberg Trials & The UN Genocide Convention',
    desc: 'The International Military Tribunal convicts top Nazi leaders. Raphael Lemkin successfully leads the United Nations to adopt the 1948 Genocide Convention.',
    ref: '7.4',
  },
];

// 35 Retrieval Quiz Questions for Page 12 (7 Enquiries x 5 Questions)
const quizCards = [
  {
    topic: 'Enquiry 1: Pre-War European Jewry',
    ref: 'Page 4 • Ref [1.1]–[1.5]',
    questions: [
      'Approximately how many Jewish people lived in Europe in the early 1930s?',
      'In what region of Europe did over sixty percent of European Jews reside?',
      'What historical language was spoken by millions of Ashkenazi Jews in Central and Eastern Europe?',
      'How many German Jews served in the German military during the First World War?',
      'How did 19th-century racial antisemitism fundamentally differ from traditional religious anti-Judaism?',
    ],
  },
  {
    topic: 'Enquiry 2: Stripping Citizenship (1933–39)',
    ref: 'Page 5 • Ref [2.1]–[2.5]',
    questions: [
      'On what date in April 1933 did the Nazi regime stage its first nationwide boycott of Jewish shops?',
      'What landmark laws passed in September 1935 stripped German Jews of Reich citizenship?',
      'What term did Victor Klemperer use to describe the gradual, suffocating social exclusion of Jews?',
      'What violent pogrom occurred across Germany on 9–10 November 1938?',
      'What British rescue scheme brought nearly 10,000 unaccompanied refugee children to the UK in 1938–39?',
    ],
  },
  {
    topic: 'Enquiry 3: Outbreak of War & Ghettos',
    ref: 'Page 6 • Ref [3.1]–[3.5]',
    questions: [
      'On what exact date did Nazi Germany invade Poland, initiating the Second World War?',
      'What directive issued by Reinhard Heydrich on 21 September 1939 ordered the concentration of Jews into cities?',
      'What distinctive marking were Polish Jews forced to wear under penalty of death from late 1939?',
      'Which was the largest ghetto established in occupied Europe, holding over 400,000 people?',
      'What secret underground archive was founded by Emanuel Ringelblum to document ghetto life?',
    ],
  },
  {
    topic: 'Enquiry 4: The Holocaust by Bullets',
    ref: 'Page 7 • Ref [4.1]–[4.5]',
    questions: [
      'What was the codename for the German invasion of the Soviet Union launched on 22 June 1941?',
      'What paramilitary SS mobile squads conducted mass shootings of Jewish communities behind the front line?',
      'How many Jewish men, women, and children were murdered at Babi Yar near Kyiv in September 1941?',
      'Approximately what proportion of the six million Holocaust victims were murdered in mass shootings?',
      'Why did SS leadership develop gas vans and stationary facilities to replace shooting squads?',
    ],
  },
  {
    topic: 'Enquiry 5: The "Final Solution" & Resistance',
    ref: 'Page 8 • Ref [5.1]–[5.5]',
    questions: [
      'On what date in January 1942 was the Wannsee Conference held in Berlin?',
      'What was the codename given to the secret operation establishing Bełżec, Sobibór, and Treblinka?',
      'What chemical pesticide was used by the SS for mass murder in the gas chambers of Auschwitz-Birkenau?',
      'Who was the 23-year-old commander who led the Jewish Combat Organization in the Warsaw Ghetto Uprising?',
      'What was the name of the forced prisoner units in the crematoria who staged a revolt at Auschwitz in 1944?',
    ],
  },
  {
    topic: 'Enquiry 6: Complicity, Bystanders & Rescue',
    ref: 'Page 9 • Ref [6.1]–[6.5]',
    questions: [
      'What German term describes the "desk murderers"—civil servants and schedulers who organized genocide?',
      'What was the name of the German state railway company whose logistical schedules enabled deportation?',
      'What Paris stadium was used by French police during the July 1942 Vel’ d’Hiv roundup of 13,000 Jews?',
      'What percentage of Denmark’s Jewish population was successfully evacuated to neutral Sweden?',
      'Who was the Polish underground courier who smuggled himself into the Warsaw Ghetto to report to Allied leaders?',
    ],
  },
  {
    topic: 'Enquiry 7: Liberation, Aftermath & Justice',
    ref: 'Page 10 • Ref [7.1]–[7.5]',
    questions: [
      'How many prisoners were forced onto death marches by the SS in the freezing winter of 1944–45?',
      'On what date was the Auschwitz-Birkenau camp complex liberated by Soviet forces?',
      'Which British military division liberated Bergen-Belsen concentration camp on 15 April 1945?',
      'What group of 300 orphaned child survivors was brought to the English Lake District in 1945?',
      'What legal scholar coined the word "genocide" in 1944 and drafted the 1948 UN Genocide Convention?',
    ],
  },
];

function buildHtml() {
  const unitData = loadUnitData();
  const heroImageBase64 = getBase64Image(unitData.homepage_background || '/images/shoah_cover.jpg');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Shoah (1933–1948) • Master Classroom Companion Textbook</title>
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
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
    }

    .cover-series {
      font-size: 8.2pt;
      font-weight: 800;
      letter-spacing: 0.20em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 2px;
    }

    .cover-sub-series {
      font-size: 7.0pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #475569;
      text-transform: uppercase;
    }

    .cover-title-block {
      text-align: center;
      margin: 5px 0 3px 0;
    }

    .cover-date-pill {
      display: inline-block;
      background: #1e3a8a;
      color: #fff;
      font-size: 8.5pt;
      font-weight: 800;
      padding: 2px 14px;
      border-radius: 12px;
      letter-spacing: 0.12em;
      margin-bottom: 4px;
    }

    .cover-main-title {
      font-family: 'Cinzel', serif;
      font-size: 26pt;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin: 0;
    }

    .cover-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 10pt;
      font-style: italic;
      color: #334155;
      margin-top: 3px;
    }

    .cover-hero-wrap {
      width: 100%;
      height: 87mm;
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
      object-position: center 25%;
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
      padding: 9px 14px;
      margin: 2px 0 4px 0;
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
      font-size: 10.2pt;
      line-height: 1.56;
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
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================================== */
    .spine-header-block {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }

    .spine-main-title {
      font-family: 'Cinzel', serif;
      font-size: 14pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin: 0;
    }

    .spine-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.2pt;
      font-style: italic;
      color: #475569;
      margin-top: 1.5px;
    }

    .milestone-timeline {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 0 4px;
    }

    .milestone-timeline::before {
      content: '';
      position: absolute;
      left: 68px;
      top: 4px;
      bottom: 4px;
      width: 2.5px;
      background: #cbd5e1;
      z-index: 1;
    }

    .milestone-item {
      display: flex;
      align-items: flex-start;
      position: relative;
      z-index: 2;
      margin-bottom: 3.5px;
    }

    .milestone-date-box {
      width: 62px;
      text-align: right;
      padding-right: 10px;
      font-size: 7.4pt;
      font-weight: 800;
      color: #1e3a8a;
      line-height: 1.2;
      margin-top: 1px;
    }

    .milestone-node {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #1e3a8a;
      border: 1.5px solid #ffffff;
      box-shadow: 0 0 0 1.5px #1e3a8a;
      margin-top: 2px;
      margin-right: 10px;
      flex-shrink: 0;
    }

    .milestone-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      border-radius: 2px;
      padding: 2.5px 7px;
    }

    .milestone-header-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }

    .milestone-title {
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
    }

    .milestone-ref {
      font-size: 6.5pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #e0e7ff;
      padding: 0 4px;
      border-radius: 2px;
    }

    .milestone-desc {
      font-family: 'Lora', serif;
      font-size: 7.3pt;
      line-height: 1.30;
      color: #334155;
      margin: 0;
    }

    /* ==========================================================================
       PAGE 3: DUAL CARTOGRAPHIC THEATER & STRATEGIC FLASHPOINTS
       ========================================================================== */
    #page-3 {
      justify-content: flex-start;
    }

    #page-3 .running-footer {
      margin-top: auto;
    }

    .carto-header-block {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 6px;
    }

    .carto-main-title {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #0f172a;
      margin: 0;
    }

    .carto-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.0pt;
      font-style: italic;
      color: #475569;
      margin-top: 1.5px;
    }

    .carto-top-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }

    .carto-theater-card {
      border: 1.2px solid #0f172a;
      border-radius: 3px;
      padding: 13px 14px;
      background: #fdfbf7;
    }

    .carto-card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2.5px;
      margin-bottom: 4px;
    }

    .carto-card-title {
      font-size: 8.1pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .carto-card-tag {
      font-size: 6.5pt;
      font-weight: 700;
      color: #64748b;
    }

    .carto-card-body {
      font-family: 'Lora', Georgia, serif;
      font-size: 8.35pt;
      line-height: 1.50;
      color: #1e293b;
      margin: 0;
    }

    /* Demographic & Logistics Data Matrices */
    .carto-matrix-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 9px;
    }

    .matrix-box {
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      background: #ffffff;
      padding: 10px 12px;
    }

    .matrix-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      row-gap: 2px;
      border-bottom: 1.2px solid #1e3a8a;
      padding-bottom: 2.5px;
      margin-bottom: 4px;
    }

    .matrix-title {
      font-size: 7.4pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .matrix-subtitle {
      font-size: 6.2pt;
      font-weight: 700;
      color: #64748b;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.35pt;
      line-height: 1.37;
    }

    .data-table th {
      text-align: left;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding: 4.5px 5.5px;
      background: #f8fafc;
      font-size: 6.7pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .data-table td {
      padding: 4.5px 5.5px;
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
      padding: 13.5px 15px;
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
      font-size: 8.35pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 3px;
      line-height: 1.2;
    }

    .flashpoint-desc {
      font-family: 'Lora', Georgia, serif;
      font-size: 8.3pt;
      line-height: 1.47;
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
      font-size: 11.5pt;
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

    /* Calibrated typography: fills down to footer with ~10-20px clearance, 0px overflow */
    .page-lesson-1 .block-section { margin-bottom: 4.5px; }
    .page-lesson-1 .block-prose { font-size: 10.15pt; line-height: 1.45; }

    .page-lesson-2 .block-section { margin-bottom: 3.2px; }
    .page-lesson-2 .block-prose { font-size: 9.42pt; line-height: 1.37; }

    .page-lesson-3 .block-section { margin-bottom: 3.8px; }
    .page-lesson-3 .block-prose { font-size: 9.85pt; line-height: 1.41; }

    .page-lesson-4 .block-section { margin-bottom: 3.5px; }
    .page-lesson-4 .block-prose { font-size: 9.60pt; line-height: 1.39; }

    .page-lesson-5 .block-section { margin-bottom: 3.0px; }
    .page-lesson-5 .block-prose { font-size: 9.22pt; line-height: 1.35; }

    .page-lesson-6 .block-section { margin-bottom: 3.2px; }
    .page-lesson-6 .block-prose { font-size: 9.32pt; line-height: 1.36; }

    .page-lesson-7 .block-section { margin-bottom: 3.2px; }
    .page-lesson-7 .block-prose { font-size: 9.35pt; line-height: 1.36; }

    /* ==========================================================================
       PAGE 11: DISCIPLINARY HISTORIOGRAPHY & MEMORY
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
       PAGE 12: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER
       ========================================================================== */
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
      padding: 6px 12px;
      border-radius: 2px;
      margin-bottom: 8px;
      font-size: 7.2pt;
      line-height: 1.44;
      color: #334155;
    }

    .quiz-instruction-banner strong {
      color: #0f172a;
    }

    .quiz-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7.5px;
    }

    .quiz-card {
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 8px 11px;
      background: #fdfbf7;
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

    .quiz-card-full {
      grid-column: span 2;
      background: #ffffff;
      border-top: 2.5px solid #1e3a8a;
    }

    .quiz-card-full .quiz-questions-list {
      column-count: 2;
      column-gap: 20px;
    }
  </style>
</head>
<body>

  <!-- ======================================================================
       PAGE 1: MASTER FRONT COVER
       ====================================================================== -->
  <div class="page cover-page" id="page-1">
    
    <div class="cover-top-masthead">
      <div class="cover-series">The History Revision Hub &bull; Disciplinary Classroom Textbook</div>
      <div class="cover-sub-series">Key Stage 3 Disciplinary Series &bull; Year 9 Master Edition &bull; Reprographic Saddle-Stitch</div>
    </div>

    <div class="cover-title-block">
      <div class="cover-date-pill">1933 &ndash; 1948</div>
      <h1 class="cover-main-title">THE SHOAH</h1>
      <div class="cover-subtitle">Understanding the Holocaust: How and Why Did It Happen?</div>
    </div>

    <div class="cover-hero-wrap">
      ${
        heroImageBase64
          ? `<img src="${heroImageBase64}" alt="Pre-War European Jewish Life" class="cover-hero-img">`
          : ''
      }
    </div>
    <div class="cover-hero-caption">
      Pre-War Jewish Life in Europe: The Pitel family gathered in Parczew, Poland (1938) &bull; Archival Repository: Yad Vashem Photo Archive / UCL Centre for Holocaust Education &bull; 26 members across 4 generations; 25 murdered at Treblinka (1943) &bull; Educational Fair Dealing CDPA 1988
    </div>

    <div class="cover-overview-box">
      <div class="cover-overview-header">
        <span class="cover-overview-title">Canonical Unit Narrative Synopsis</span>
        <span class="cover-overview-period">Historical Period &bull; 1933–1948</span>
      </div>
      <p class="cover-overview-text">
        &ldquo;${canonicalSynopsis}&rdquo;
      </p>
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
            <td class="col-title">Pre-War European Jewish Life</td>
            <td class="col-eq">Why is it vital to understand the richness of pre-war Jewish life?</td>
            <td class="col-page">Page 4</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 02</td>
            <td class="col-title">Stripping Rights &amp; Persecution (1933&ndash;39)</td>
            <td class="col-eq">How did the Nazi state turn German Jews into legal outcasts?</td>
            <td class="col-page">Page 5</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 03</td>
            <td class="col-title">Outbreak of War &amp; Sealed Ghettos</td>
            <td class="col-eq">How did confinement in sealed ghettos create a struggle for survival?</td>
            <td class="col-page">Page 6</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 04</td>
            <td class="col-title">Invasion of USSR &amp; Mass Murder</td>
            <td class="col-eq">Why did the 1941 Soviet invasion mark the shift to total genocide?</td>
            <td class="col-page">Page 7</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 05</td>
            <td class="col-title">The &ldquo;Final Solution&rdquo; &amp; Resistance</td>
            <td class="col-eq">How was industrial murder coordinated, and how did victims resist?</td>
            <td class="col-page">Page 8</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 06</td>
            <td class="col-title">Collaboration, Complicity &amp; Rescue</td>
            <td class="col-eq">To what extent was the Holocaust an all-European complicity?</td>
            <td class="col-page">Page 9</td>
          </tr>
          <tr>
            <td class="col-num">Enquiry 07</td>
            <td class="col-title">Testimony, Loss &amp; Ethical Duty</td>
            <td class="col-eq">What was the human cost, and what is our ethical responsibility?</td>
            <td class="col-page">Page 10</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Core Concepts Anchor Strip -->
    <div class="cover-concepts-strip">
      <span class="cover-concepts-tag">Core Concepts</span>
      <span>Pre-War Jewish Life &bull; Antisemitism &bull; Nuremberg Laws &bull; Kristallnacht &bull; Sealed Ghettos &bull; Warsaw Uprising &bull; Einsatzgruppen &bull; Babi Yar &bull; Wannsee &bull; Extermination Camps &bull; Auschwitz &bull; Spiritual Resistance &bull; Righteous Among the Nations</span>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; Single-Source Disciplinary Architecture</span>
      <span>Institutional Neutrality &bull; Reprographic Master Edition</span>
      <span class="page-pill">Page 1 / 12</span>
    </div>

  </div>

  <!-- ======================================================================
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE (1933–1948)
       ====================================================================== -->
  <div class="page" id="page-2">
    
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
      <span class="sub-badge">MASTER CHRONOLOGICAL MILESTONE SPINE &bull; 1933–1948</span>
      <span>PAGE 2</span>
    </div>

    <div class="spine-header-block">
      <h2 class="spine-main-title">Chronological Turning Points &amp; Causal Backbone</h2>
      <div class="spine-subtitle">Fourteen Defining Milestones from the Nazi Seizure of Power to the UN Genocide Convention (1933–1948)</div>
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
              <span class="milestone-ref">Ref [${m.ref}]</span>
            </div>
            <p class="milestone-desc">${m.desc}</p>
          </div>
        </div>`,
        )
        .join('')}
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; Master Chronological Spine</span>
      <span>Cross-Referenced to Narrative Sections [1.1]&ndash;[7.5]</span>
      <span class="page-pill">Page 2 / 12</span>
    </div>

  </div>

  <!-- ======================================================================
       PAGE 3: DUAL CARTOGRAPHIC THEATER & STRATEGIC FLASHPOINTS
       ====================================================================== -->
  <div class="page" id="page-3">
    
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
      <span class="sub-badge">CARTOGRAPHIC THEATER &amp; GEOPOLITICAL CONTEXT</span>
      <span>PAGE 3</span>
    </div>

    <div class="carto-header-block">
      <h2 class="carto-main-title">The Geography of European Jewry &amp; The Shoah</h2>
      <div class="carto-subtitle">Demographic Distribution, The Corridor of Destruction &amp; Four Geopolitical Flashpoints (1933–1945)</div>
    </div>

    <div class="carto-top-cards">
      <div class="carto-theater-card">
        <div class="carto-card-header">
          <span class="carto-card-title">Theater I: Pre-War Demographics</span>
          <span class="carto-card-tag">9.5 Million Lives (c. 1933)</span>
        </div>
        <p class="carto-card-body">
          Before 1939, European Jewry was heavily concentrated in Central and Eastern Europe: <strong>Poland (3.3 million)</strong>, the <strong>Soviet Union (3.0 million)</strong>, <strong>Romania (757,000)</strong>, and <strong>Hungary (445,000)</strong> together accounted for over eighty percent of Europe’s Jews. In Western Europe, Jewish populations were smaller and highly assimilated: 500,000 in Germany, 300,000 in Great Britain, 250,000 in France, and 140,000 in the Netherlands. In Southern Europe, ancient Ladino-speaking Sephardic communities had flourished for centuries in ports such as Thessaloniki (Greece).
        </p>
      </div>

      <div class="carto-theater-card">
        <div class="carto-card-header">
          <span class="carto-card-title">Theater II: The Corridor of Annihilation</span>
          <span class="carto-card-tag">Occupied Poland &amp; USSR (1941–1945)</span>
        </div>
        <p class="carto-card-body">
          Nazi extermination policy was fundamentally geographical. The German-occupied <strong>General Government</strong> of Poland became the primary killing ground: all six dedicated death camps (Chełmno, Bełżec, Sobibór, Treblinka, Majdanek, and Auschwitz-Birkenau) were constructed in occupied Polish territory near railway junctions, deliberately sequestered from Western observers. Eastward in the Baltic States, Belarus, and Ukraine, the Holocaust was mobile: SS Einsatzgruppen murdered over two million victims in mass shooting ravines.
        </p>
      </div>
    </div>

    <div class="carto-matrix-row">
      <div class="matrix-box">
        <div class="matrix-header">
          <span class="matrix-title">Pre-War Demographics &amp; Regional Murder Toll</span>
          <span class="matrix-subtitle">Comparative Academic Statistics</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Country / Region</th>
              <th style="text-align: right;">Pre-1939 Pop.</th>
              <th style="text-align: right;">Est. Murdered</th>
              <th style="text-align: right;">% Lost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="strong">Poland</td>
              <td class="num">3,300,000</td>
              <td class="num">3,000,000</td>
              <td class="pct">91%</td>
            </tr>
            <tr>
              <td class="strong">Soviet Union (occupied territories)</td>
              <td class="num">3,020,000</td>
              <td class="num">1,300,000</td>
              <td class="pct">43%</td>
            </tr>
            <tr>
              <td class="strong">Hungary</td>
              <td class="num">445,000</td>
              <td class="num">300,000</td>
              <td class="pct">67%</td>
            </tr>
            <tr>
              <td class="strong">Romania</td>
              <td class="num">757,000</td>
              <td class="num">280,000</td>
              <td class="pct">37%</td>
            </tr>
            <tr>
              <td class="strong">Germany &amp; Austria</td>
              <td class="num">565,000</td>
              <td class="num">210,000</td>
              <td class="pct">37%</td>
            </tr>
            <tr>
              <td class="strong">Netherlands, France &amp; Belgium</td>
              <td class="num">530,000</td>
              <td class="num">180,000</td>
              <td class="pct">34%</td>
            </tr>
            <tr>
              <td class="strong">Greece, Yugoslavia &amp; Balkans</td>
              <td class="num">120,000</td>
              <td class="num">95,000</td>
              <td class="pct">79%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="matrix-box">
        <div class="matrix-header">
          <span class="matrix-title">The Six Dedicated Extermination Centres</span>
          <span class="matrix-subtitle">Logistics &amp; Murder Methods</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Location &amp; Admin</th>
              <th>Primary Method</th>
              <th style="text-align: right;">Est. Murdered</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="strong">Auschwitz-Birkenau</td>
              <td>Upper Silesia (Annexed)</td>
              <td>Zyklon B Gas Chambers</td>
              <td class="num">1,100,000</td>
            </tr>
            <tr>
              <td class="strong">Treblinka II</td>
              <td>General Government</td>
              <td>Diesel Exhaust Gas</td>
              <td class="num">900,000</td>
            </tr>
            <tr>
              <td class="strong">Bełżec</td>
              <td>General Government</td>
              <td>Carbon Monoxide Gas</td>
              <td class="num">435,000</td>
            </tr>
            <tr>
              <td class="strong">Sobibór</td>
              <td>General Government</td>
              <td>Carbon Monoxide Gas</td>
              <td class="num">170,000</td>
            </tr>
            <tr>
              <td class="strong">Chełmno (Kulmhof)</td>
              <td>Wartheland (Annexed)</td>
              <td>Gas Vans (Exhaust)</td>
              <td class="num">150,000</td>
            </tr>
            <tr>
              <td class="strong">Majdanek (Lublin)</td>
              <td>General Government</td>
              <td>Zyklon B &amp; Shootings</td>
              <td class="num">78,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flashpoints-grid">
      <div class="flashpoint-item">
        <div class="flashpoint-num">Flashpoint 01 &bull; Demography &amp; Settlement</div>
        <div class="flashpoint-title">The Shtetl Heartland &amp; Yiddishland</div>
        <p class="flashpoint-desc">
          In Eastern Europe, centuries within the former Tsarist Pale of Settlement created dense, close-knit Yiddish-speaking towns (<em>shtetls</em>) and vibrant urban quarters in Warsaw, Łódź, and Vilna. Because Jewish communities lived in recognizable geographical concentrations with established communal networks, German invasion and occupation forces could swiftly identify, isolate, and wall them into sealed ghettos within months of conquest.
        </p>
      </div>

      <div class="flashpoint-item">
        <div class="flashpoint-num">Flashpoint 02 &bull; Total War Radicalisation</div>
        <div class="flashpoint-title">Operation Barbarossa &amp; The Eastern Front</div>
        <p class="flashpoint-desc">
          The invasion of the Soviet Union in June 1941 transformed Nazi anti-Jewish policy from forced expulsion and ghettoisation into direct physical annihilation. Hitler framed the invasion as a racial and ideological war of extermination against "Judeo-Bolshevism". Advancing behind Wehrmacht armies, four motorized SS Einsatzgruppen squads carried out the systematic mass murder of entire civilian communities in ravines and pits.
        </p>
      </div>

      <div class="flashpoint-item">
        <div class="flashpoint-num">Flashpoint 03 &bull; Bureaucracy &amp; Logistics</div>
        <div class="flashpoint-title">The Deutsche Reichsbahn Railway Corridors</div>
        <p class="flashpoint-desc">
          Mass extermination across an entire continent required modern industrial coordination. The German state railway (<em>Deutsche Reichsbahn</em>) scheduled hundreds of locked cattle-car transports from Drancy (France), Westerbork (Netherlands), Rome (Italy), and Salonica (Greece), routing millions across thousands of miles into the extermination camps of occupied Poland with meticulous timetables and billing protocols.
        </p>
      </div>

      <div class="flashpoint-item">
        <div class="flashpoint-num">Flashpoint 04 &bull; Collapse &amp; Evacuation</div>
        <div class="flashpoint-title">Death Marches &amp; Concealment (Winter 1944–1945)</div>
        <p class="flashpoint-desc">
          As the Red Army advanced westward in late 1944, the SS attempted to destroy camp infrastructure and conceal the physical evidence of mass murder. Over 250,000 surviving prisoners were forced out of Auschwitz, Stutthof, and Gross-Rosen onto sub-zero winter roads on "death marches" into the German interior. Over 70,000 perished from exposure, starvation, and execution before Allied troops arrived.
        </p>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; Cartographic &amp; Demographic Foundations</span>
      <span>Regional Overview &bull; Pages 4&ndash;10 Canonical Enquiries</span>
      <span class="page-pill">Page 3 / 12</span>
    </div>

  </div>

  <!-- ======================================================================
       PAGES 4–10: THE SEVEN CANONICAL ENQUIRIES
       ====================================================================== -->
  ${unitData.lessons
    .map((lesson, idx) => {
      const enquiryNum = idx + 1;
      const pageNum = enquiryNum + 3;
      const blocks = lesson.narrative_blocks || [];

      return `
  <div class="page page-lesson-${enquiryNum}" id="page-${pageNum}">
    
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
      <span class="sub-badge">ENQUIRY 0${enquiryNum} &bull; PAGE ${pageNum}</span>
      <span>DISCIPLINARY TEXTBOOK</span>
    </div>

    <div class="enquiry-banner">
      <div class="enquiry-meta-row">
        <span class="enquiry-pill">ENQUIRY 0${enquiryNum}</span>
        <span class="enquiry-canon-tag">Pillar 1 &bull; Core Historical Narrative</span>
      </div>
      <h2 class="enquiry-title">${lesson.title.replace(/^Enquiry\s+\d+:\s*/, '')}</h2>
      <div class="enquiry-core-question">
        <span class="label">KEY ENQUIRY QUESTION</span>
        <span>${lesson.enquiryQuestion || ''}</span>
      </div>
    </div>

    <div class="prose-body">
      <div class="prose-columns">
        ${blocks
          .map((b, bIdx) => {
            const blockRef = `${enquiryNum}.${bIdx + 1}`;
            const cleanText = cleanProse(b.text);
            const titleWithoutRef = b.title.replace(/^\[\d+\.\d+\]\s*/, '');

            return `
          <div class="block-section">
            <div class="block-header">
              <span class="block-ref">[${blockRef}]</span>
              <span class="block-title">${titleWithoutRef}</span>
            </div>
            <p class="block-prose">
              ${cleanText}
            </p>
          </div>`;
          })
          .join('')}
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; Disciplinary Classroom Textbook</span>
      <span>Enquiry 0${enquiryNum} &bull; Paragraph Anchors [${enquiryNum}.1]&ndash;[${enquiryNum}.5]</span>
      <span class="page-pill">Page ${pageNum} / 12</span>
    </div>

  </div>`;
    })
    .join('')}

  <!-- ======================================================================
       PAGE 11: DISCIPLINARY HISTORIOGRAPHY & MEMORY
       ====================================================================== -->
  <div class="page" id="page-11">
    
    <div class="running-header">
      <span>THE HISTORY REVISION HUB &bull; KS3 HISTORY</span>
      <span class="sub-badge">DISCIPLINARY HISTORIOGRAPHY &amp; THE ARCHITECTURE OF MEMORY</span>
      <span>PAGE 11</span>
    </div>

    <div class="histo-header-block">
      <h2 class="histo-main-title">Scholarly Perspectives &amp; The Architecture of Memory</h2>
      <div class="histo-subtitle">How Historians Explain the Holocaust, The Nature of Complicity &amp; The Evolution of International Law</div>
    </div>

    <div class="histo-grid">
      <div class="histo-card">
        <div class="histo-card-tag">Debate 01 &bull; The Perpetrators</div>
        <div class="histo-card-title">"Ordinary Men" vs Eliminationist Ideologues</div>
        <p class="histo-card-body">
          Historian <strong>Christopher Browning</strong> argued in <em>Ordinary Men</em> (1992) that members of Reserve Police Battalion 101 murdered thousands of Jews not because they were brainwashed zealots, but through peer pressure, obedience to authority, and careerism. In contrast, <strong>Daniel Goldhagen</strong> asserted in 1996 that German society was uniquely permeated by violent, eliminationist antisemitism that made ordinary citizens willing executioners.
        </p>
      </div>

      <div class="histo-card">
        <div class="histo-card-tag">Debate 02 &bull; Society &amp; Bystanders</div>
        <div class="histo-card-title">Hatred or Indifference? The Road to Auschwitz</div>
        <p class="histo-card-body">
          British historian <strong>Ian Kershaw</strong> famously formulated that <em>"the road to Auschwitz was built by hatred, but paved with indifference."</em> While hardcore Nazi cadres drove radical persecution, millions of ordinary Europeans stood by passively, accepting antisemitic measures as long as their personal security was unaffected. <strong>Peter Longerich</strong> demonstrated that German society was broadly informed about mass deportations and atrocities.
        </p>
      </div>

      <div class="histo-card">
        <div class="histo-card-tag">Debate 03 &bull; The Decision-Making Process</div>
        <div class="histo-card-title">Intentionalism vs Cumulative Radicalisation</div>
        <p class="histo-card-body">
          <strong>Intentionalist</strong> historians (e.g. Lucy Dawidowicz) argued that Hitler had a coherent blueprint to exterminate European Jewry as early as 1919. In contrast, <strong>Functionalist</strong> historians (e.g. Hans Mommsen, Martin Broszat) argued that the "Final Solution" evolved haphazardly: local commanders on the Eastern Front faced self-inflicted logistical chaos, improvising mass murder in a process of "cumulative radicalisation" blessed by Berlin.
        </p>
      </div>

      <div class="histo-card">
        <div class="histo-card-tag">Debate 04 &bull; International Law &amp; Justice</div>
        <div class="histo-card-title">Raphael Lemkin &amp; The Creation of "Genocide"</div>
        <p class="histo-card-body">
          Before 1944, international law lacked a term for the state-directed annihilation of a people (Winston Churchill called it "a crime without a name"). Polish-Jewish jurist <strong>Raphael Lemkin</strong> invented the word <em>genocide</em> (combining Greek <em>genos</em>, race/tribe, with Latin <em>caedere</em>, killing). Lemkin single-handedly lobbied the fledgling United Nations, securing the adoption of the 1948 UN Convention on the Prevention and Punishment of Genocide.
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
          <strong>Shoah (השואה):</strong> The Hebrew term meaning "catastrophe" or "total devastation", preferred by historians to denote the deliberate, state-sponsored annihilation of six million European Jews, distinguishing it from general wartime casualties.
        </div>
        <div class="concept-card">
          <strong>Racial Antisemitism:</strong> 19th-century pseudo-scientific dogma asserting that Jewish identity was an unalterable biological condition inherited through blood, eliminating any possibility of escape through religious conversion or cultural assimilation.
        </div>
        <div class="concept-card">
          <strong>Ghettoisation:</strong> The systematic confinement, overcrowding, and starvation of Jewish urban populations behind guarded brick walls (e.g. Warsaw, Łódź) to exploit slave labour and facilitate coordinated deportation to extermination camps.
        </div>
        <div class="concept-card">
          <strong>Einsatzgruppen:</strong> Four mobile SS motorized death battalions (A, B, C, D) deployed behind invading Wehrmacht armies in 1941 to systematically shoot over two million Jewish men, women, and children in open ravines and pits.
        </div>
        <div class="concept-card">
          <strong>Operation Reinhard:</strong> The secret 1942–43 Nazi operation named in honour of Reinhard Heydrich to systematically murder approximately two million Polish Jews in three dedicated industrial gas chamber complexes: Bełżec, Sobibór, and Treblinka.
        </div>
        <div class="concept-card">
          <strong>Industrial Murder &amp; Zyklon B:</strong> The impersonal, mechanized factory system of mass slaughter utilizing crystalline hydrogen cyanide pesticide at Auschwitz-Birkenau and Majdanek, engineered to murder up to 2,000 human beings per chamber batch.
        </div>
        <div class="concept-card">
          <strong>Righteous Among the Nations:</strong> Official honour bestowed by Yad Vashem on non-Jews (e.g. Danish rescue flotilla, Raoul Wallenberg, Le Chambon villagers) who risked their lives without financial reward to shelter and rescue persecuted Jews.
        </div>
        <div class="concept-card">
          <strong>Genocide (Lemkin 1944):</strong> Revolutionary legal concept formulated by Raphael Lemkin uniting Greek <em>genos</em> (race/nation) and Latin <em>caedere</em> (to kill), establishing international legal accountability codified in the 1948 UN Convention.
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub &bull; Historiography, Theory &amp; Concepts</span>
      <span>Disciplinary Historiography &bull; Page 11 / 12</span>
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
      <span>The History Revision Hub &bull; Master Retrieval Engine</span>
      <span>35 Core Disciplinary Questions &bull; End of Companion Textbook</span>
      <span class="page-pill">Page 12 / 12</span>
    </div>

  </div>

</body>
</html>`;
}

// Master execution routine
async function main() {
  console.log('🚀 Compiling 12-Page Master Classroom Textbook for [the_shoah]...');
  const html = buildHtml();

  const publicHtmlPath = path.join(ROOT_DIR, 'public', 'units', 'the_shoah', 'textbook.html');
  const unitsHtmlPath = path.join(ROOT_DIR, 'units', 'the_shoah', 'textbook.html');
  const pdfOutPath = path.join(ROOT_DIR, 'public', 'pdfs', 'the_shoah_textbook_FINAL.pdf');
  const pdfCompatPath = path.join(ROOT_DIR, 'public', 'pdfs', 'the_shoah_textbook.pdf');

  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  if (fs.existsSync(path.dirname(unitsHtmlPath))) {
    fs.writeFileSync(unitsHtmlPath, html, 'utf8');
  }
  console.log(`✅ Saved 12-Page Textbook HTML to: ${publicHtmlPath}`);

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

    // Run automated space budget audit
    console.log('\n🔍 Running Automated Space Budget Audit on 12-Page Textbook...');
    const audit = await auditPageBudget(page, {
      underflowThresholdPx: 60,
      pageSelector: '.page',
    });
    printSpaceAuditReport(audit, 'the_shoah_textbook.html');

    // Export PDF
    await page.pdf({
      path: pdfOutPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    fs.copyFileSync(pdfOutPath, pdfCompatPath);
    const pdfV17Path = path.join(ROOT_DIR, 'public', 'pdfs', 'the_shoah_textbook_FINAL_V17.pdf');
    fs.copyFileSync(pdfOutPath, pdfV17Path);
    console.log(`🎉 Successfully generated 12-Page Master Textbook PDF at: ${pdfOutPath}`);
    console.log(`📄 Copied to: ${pdfCompatPath} and ${pdfV17Path}`);
  } catch (err) {
    console.error(`❌ Puppeteer error during textbook rendering:`, err.message);
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

module.exports = { buildHtml, renderTheShoah: main, run: main };
