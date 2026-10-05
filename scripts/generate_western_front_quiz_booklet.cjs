/**
 * generate_western_front_quiz_booklet.cjs
 *
 * Compiles the Master 12-Page A4 Saddle-Stitch Knowledge Retrieval & Historic Environment Companion
 * for Pearson Edexcel GCSE (9–1) History Paper 1: Section A (1HI0/11)
 * The British Sector of the Western Front, 1914–1918: Injuries, Treatment and the Trenches.
 *
 * Strict Compliance:
 * - Institutional neutrality (The History Department / GCSE History Revision Hub)
 * - Zero AI educational jargon / authentic classroom standard
 * - 100% uniformity across all 6 lessons (12 Pearson Revision Guide questions per lesson = 72 questions)
 * - Publisher-grade typography & 0px dead space underflow budget
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const DRIVE_BASE = 'G:\\My Drive\\AAMX\\Dep File';

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// --------------------------------------------------------------------------
// QR CODE SVG HELPER
// --------------------------------------------------------------------------
function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

// --------------------------------------------------------------------------
// APPROVED AUTHENTIC CLASSROOM FOOTERS (12 PAGES)
// --------------------------------------------------------------------------
const APPROVED_FOOTERS = [
  'Western Front Master Retrieval Companion • Edexcel Paper 1 (Section A) • The History Department', // P1
  'Master Western Front Chronology & Chain of Evacuation Architecture • The History Department', // P2
  '"Holding the Ypres Salient guarded the Channel ports; the liquid mud made evacuation an ordeal."', // P3
  '"Whale oil and dry socks kept men on their feet; body lice spread 500,000 cases of trench fever."', // P4
  '"Fertilised manure soil bred lethal gas gangrene; the Brodie helmet cut fatal head wounds by 80%."', // P5
  '"From stretcher-bearers under fire to coastal Base Hospitals: master the four-stage chain of evacuation."', // P6
  '"The Thomas Splint transformed compound femur survival from 20% to 82%: understand wartime innovation."', // P7
  '"From Cambrai blood depots to Cushing and Gillies: surgical desperation drove modern clinical medicine."', // P8
  'Department Marking Bank • Lessons 1 to 3 • Self-Assessment & Green-Pen DIRT Review', // P9
  'Department Marking Bank • Lessons 4 to 6 • Self-Assessment & Green-Pen DIRT Review', // P10
  'Historic Environment Primary Sources Vault & Edexcel Q2(b) 4-Step Follow-Up Blueprint', // P11
  'Paper 1 Section A Examination Strategy: Feature Questions & Source Utility • Archival Standard', // P12
];

// --------------------------------------------------------------------------
// MASTER TIMELINE (14 KEY TURNING POINTS)
// --------------------------------------------------------------------------
const WESTERN_FRONT_TIMELINE = [
  {
    year: 'Oct–Nov 1914',
    title: 'First Battle of Ypres',
    text: 'BEF stops German advance to Channel ports; salient established; trench warfare begins.',
  },
  {
    year: 'Autumn 1914',
    title: 'Anti-Tetanus Serum Issued',
    text: 'Routine prophylactic injections administered to all wounded men, preventing fatal lockjaw.',
  },
  {
    year: 'Apr–May 1915',
    title: 'Second Battle of Ypres',
    text: 'Germans introduce chlorine poison gas; urine-soaked cotton pads used before gas masks.',
  },
  {
    year: 'April 1915',
    title: 'Mining at Hill 60',
    text: 'British tunnel deep under German positions in Ypres salient and detonate 5 massive mines.',
  },
  {
    year: 'July 1915',
    title: 'Hypo Helmet Gas Masks',
    text: 'First manufactured gas helmets issued; superseded in 1916 by the Small Box Respirator.',
  },
  {
    year: 'Autumn 1915',
    title: 'Brodie Helmets Issued',
    text: 'Steel helmets with wide brims replace cloth caps, reducing fatal head injuries by 80%.',
  },
  {
    year: 'Dec 1915',
    title: 'Thomas Splint Introduced',
    text: 'Robert Jones introduces traction splint to France; femur survival rate leaps from 20% to 82%.',
  },
  {
    year: '1 July 1916',
    title: 'First Day of the Somme',
    text: 'British suffer 57,000 casualties in one day; medical evacuation facilities overwhelmed.',
  },
  {
    year: 'April 1917',
    title: 'Battle of Arras & Cave Hospital',
    text: 'Underground hospital inside chalk quarries (Thompson’s Cave) treats 700 beds under shelter.',
  },
  {
    year: 'Jul–Nov 1917',
    title: 'Third Battle of Ypres (Passchendaele)',
    text: 'Constant rain and shelling turn clay into liquid swamp; men and mules drown in mud.',
  },
  {
    year: 'Nov 1917',
    title: 'Battle of Cambrai Blood Depot',
    text: 'Oswald Hope Robertson creates world’s first blood bank using stored universal Group O blood.',
  },
  {
    year: '1917',
    title: 'Queen’s Hospital, Sidcup',
    text: 'Harold Gillies opens specialist hospital for facial reconstructive surgery and tube pedicle grafts.',
  },
  {
    year: 'Spring 1918',
    title: 'German Spring Offensive',
    text: 'Mobile warfare resumes; forward Casualty Clearing Stations forced to evacuate rapidly.',
  },
  {
    year: '11 Nov 1918',
    title: 'The Armistice',
    text: 'Hostilities cease; over 113,000 RAMC personnel and 240,000 amputees complete wartime service.',
  },
];

// --------------------------------------------------------------------------
// CHAIN OF EVACUATION STAGES (PAGE 2 ARCHITECTURE)
// --------------------------------------------------------------------------
const EVACUATION_STAGES = [
  {
    stage: '1. Regimental Aid Post (RAP)',
    dist: 'Within 200m of front line',
    staff: 'Regimental Medical Officer & Stretcher-Bearers',
    role: 'Immediate emergency first aid (bandages, tourniquets, morphia). Patched up walking wounded to fight; stabilised serious casualties. No surgery performed.',
  },
  {
    stage: '2. Field Ambulance & Dressing Stations (ADS / MDS)',
    dist: '½ mile to 1 mile behind front',
    staff: 'RAMC Field Ambulance units, orderlies, nurses',
    role: 'Emergency triage and anti-tetanus injections. Located in abandoned farms or tents. Serious casualties loaded onto horse or motor ambulances for transport.',
  },
  {
    stage: '3. Casualty Clearing Station (CCS)',
    dist: '7 to 12 miles back (near railway lines)',
    staff: 'Specialist surgical teams, nurses (QAIMNS), mobile X-rays',
    role: 'The primary life-saving surgical unit. Triage into walking wounded, urgent surgery cases, and moribund. Emergency operations for gas gangrene and compound fractures.',
  },
  {
    stage: '4. Base Hospitals',
    dist: 'French coastal ports (Calais, Boulogne, Le Havre)',
    staff: 'Civilian specialists, surgical units, specialist wards',
    role: 'Long-term patient recovery, specialist treatment for head wounds, burns, and gas. Casualties evacuated by hospital ship to "Blighty" (Britain) for rehabilitation.',
  },
];

// --------------------------------------------------------------------------
// HTML BUILDER: 12-PAGE A4 SADDLE-STITCH BOOKLET
// --------------------------------------------------------------------------
const { WESTERN_FRONT_QUIZ_BANK } = require('./western_front_pearson_quiz_bank.cjs');

function buildHtml() {
  const qrSvg = generateQrSvg(
    'https://the-history-revision-hub.netlify.app/?unit=edexcel_medicine',
  );

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The British Sector of the Western Front, 1914–1918: Master Knowledge Retrieval & Historic Environment Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 6mm 8mm 5mm 8mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page-container {
      width: 100%;
      height: 1081px;
      max-height: 1081px;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      background: #ffffff;
    }
    .page-container:last-child {
      page-break-after: avoid;
    }

    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }

    .running-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: #0f172a;
    }

    .page-footer-strip {
      border-top: 1.5px solid #0f172a;
      padding-top: 2.5px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #334155;
    }
    .footer-quip { font-family: 'Georgia', serif; font-style: italic; color: #1e293b; }
    .footer-page-num { font-weight: 900; font-size: 7.5pt; color: #000000; }

    /* FRONT COVER STYLES */
    .cover-top-box {
      border: 1.5px solid #0f172a;
      padding: 7px 10px;
      background: #ffffff;
      border-radius: 2px;
      margin-bottom: 5px;
    }
    .cover-badge-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }
    .cover-badge {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 900;
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .cover-dept-name {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', serif;
      font-size: 15.5pt;
      font-weight: 900;
      line-height: 1.15;
      color: #000000;
      margin: 3px 0 2px 0;
      text-align: center;
    }
    .cover-sub-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.6pt;
      font-weight: 700;
      color: #334155;
      text-align: center;
      line-height: 1.25;
      margin-bottom: 3px;
    }

    .pupil-meta-strip {
      border: 1.2px solid #0f172a;
      background: #f8fafc;
      padding: 5px 10px;
      border-radius: 2px;
      display: grid;
      grid-template-columns: 1.6fr 1fr 1.2fr;
      gap: 12px;
      align-items: flex-end;
      margin-bottom: 5px;
      font-family: 'Inter', sans-serif;
      font-size: 8.4pt;
      font-weight: 700;
    }
    .pupil-field {
      display: flex;
      align-items: flex-end;
      gap: 6px;
    }
    .pupil-field-lbl {
      color: #0f172a;
      white-space: nowrap;
      font-weight: 800;
    }
    .pupil-line {
      flex: 1;
      border-bottom: 1.4px solid #000000;
      height: 6.8mm;
    }

    .tracker-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      margin-bottom: 5px;
    }
    .tracker-table th, .tracker-table td {
      border: 1.2px solid #0f172a;
      padding: 4px 6px;
    }
    .tracker-table th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      text-align: left;
      font-size: 7.6pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .tracker-table tr:nth-child(even) { background: #f8fafc; }

    .traffic-tier-box {
      border: 1.3px solid #0f172a;
      background: #f1f5f9;
      border-radius: 2px;
      padding: 5px 9px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 8.1pt;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .cover-protocol-box {
      border: 1.3px solid #0f172a;
      border-left: 5px solid #0f172a;
      border-radius: 2px;
      padding: 8px 12px;
      background: #ffffff;
      margin-bottom: 5px;
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      line-height: 1.42;
      color: #1e293b;
    }

    /* Page 2: Inside Front Cover Layout */
    .p2-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      flex: 1;
      margin: 2px 0;
    }
    .col-card {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .col-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.4pt;
      font-weight: 900;
      color: #ffffff;
      background: #0f172a;
      padding: 3px 6px;
      border-radius: 1px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 4px;
      text-align: center;
    }
    .timeline-node {
      border-left: 2.8px solid #0f172a;
      padding-left: 5px;
      margin-bottom: 3.5px;
      line-height: 1.18;
    }
    .t-year { font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; color: #000; }
    .t-title { font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; color: #0f172a; margin-left: 3px; }
    .t-desc { font-family: 'Georgia', serif; font-size: 6.9pt; color: #222; display: block; }

    .stage-card {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      background: #f8fafc;
      padding: 4px 6px;
      border-radius: 2px;
      margin-bottom: 4px;
      line-height: 1.2;
    }
    .stage-name { font-family: 'Inter', sans-serif; font-size: 8.0pt; font-weight: 900; color: #0f172a; }
    .stage-meta { font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 700; color: #475569; display: block; margin-top: 1px; }
    .stage-desc { font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; margin-top: 2px; }

    /* Lesson Question Pages (Pages 3–8) */
    .lesson-meta-bar {
      background: #f8fafc;
      border-left: 4px solid #0f172a;
      padding: 3px 8px;
      margin-bottom: 2px;
      border-top: 1px solid #cbd5e1;
      border-right: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
    }
    .lesson-meta-title { font-family: 'Playfair Display', serif; font-size: 10.4pt; font-weight: 900; color: #000000; margin: 0; line-height: 1.15; }
    .lesson-meta-enquiry { font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 700; color: #334155; margin-top: 1px; }

    .q-block {
      border: 1.1px solid #94a3b8;
      border-radius: 2px;
      padding: 2.8px 6px;
      margin-bottom: 2.2px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .q-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 5px;
      line-height: 1.18;
    }
    .q-prompt-wrap { display: flex; gap: 4px; flex: 1; }
    .q-num { font-family: 'Inter', sans-serif; font-size: 8.6pt; font-weight: 900; color: #000000; min-width: 16px; }
    .q-prompt { font-family: 'Georgia', serif; font-size: 8.6pt; font-weight: 700; color: #000000; line-height: 1.18; }
    .q-attempt { font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #475569; white-space: nowrap; }

    .q-line-row {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      margin-top: 0.5px;
    }
    .q-line-lbl {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      color: #000000;
      white-space: nowrap;
      min-width: 72px;
    }
    .q-solid-line {
      flex: 1;
      border-bottom: 1.3px solid #000000;
      height: 6.8mm;
    }

    /* Pages 9–10: Department Marking Bank */
    .mb-grid-3col {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5.5px;
      flex: 1;
      margin-top: 2px;
      height: 100%;
    }
    .mb-lesson-col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .mb-lesson-title {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 800;
      padding: 2.2px 5px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      border-radius: 1px;
      margin-bottom: 2px;
      text-align: center;
    }
    .ans-card {
      border: 1px solid #cbd5e1;
      border-left: 2.8px solid #0f172a;
      background: #f8fafc;
      border-radius: 2px;
      padding: 2.2px 4px;
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: 7.0pt;
      line-height: 1.16;
      margin-bottom: 1.5px;
    }
    .ans-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 3px;
    }
    .ans-num { font-family: 'Inter', sans-serif; font-weight: 900; color: #0f172a; font-size: 7.4pt; }
    .ans-core { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; font-size: 7.4pt; flex: 1; margin-left: 3px; }
    .ans-check { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; color: #475569; white-space: nowrap; }
    .ans-exp { color: #1e293b; font-family: 'Georgia', serif; font-style: italic; font-size: 6.8pt; line-height: 1.15; }

    /* Page 11: Sources & Follow-Up Blueprint */
    .source-vault-card {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      padding: 7px 10px;
      background: #ffffff;
      margin-bottom: 6px;
    }
    .card-title-bar {
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      font-weight: 900;
      color: #ffffff;
      background: #0f172a;
      padding: 3px 8px;
      border-radius: 1px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
    }
    .sources-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 10px;
      font-size: 7.4pt;
      line-height: 1.26;
    }
    .source-item {
      border-left: 3px solid #0f172a;
      padding-left: 6px;
      background: #f8fafc;
      padding-top: 3px;
      padding-bottom: 3px;
    }
    .source-item strong { font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #000; display: block; }

    .followup-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      margin-top: 4px;
    }
    .followup-table th, .followup-table td {
      border: 1.2px solid #0f172a;
      padding: 4px 6px;
      line-height: 1.24;
    }
    .followup-table th {
      background: #0f172a;
      color: #ffffff;
      font-size: 7.2pt;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-weight: 800;
    }
    .followup-table tr:nth-child(even) { background: #f8fafc; }

    /* Page 1: Specification Overview Card */
    .spec-overview-card {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      margin-bottom: 5px;
      overflow: hidden;
    }
    .spec-overview-title-bar {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      padding: 3.5px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .spec-three-pillars {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      padding: 5px 8px;
      background: #f8fafc;
      border-bottom: 1.2px solid #cbd5e1;
    }
    .spec-pillar-col {
      border-left: 2.8px solid #0f172a;
      padding-left: 5px;
      line-height: 1.22;
    }
    .pillar-label {
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 900;
      color: #0f172a;
      display: block;
      margin-bottom: 1px;
      text-transform: uppercase;
      letter-spacing: 0.2px;
    }
    .pillar-text {
      font-family: 'Georgia', serif;
      font-size: 7.0pt;
      color: #1e293b;
    }
    .exam-structure-strip {
      display: grid;
      grid-template-columns: 1.1fr 1.3fr 1.1fr;
      gap: 6px;
      padding: 4px 8px;
      background: #ffffff;
      align-items: center;
    }
    .exam-q-cell {
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      padding: 3px 6px;
      background: #f1f5f9;
      line-height: 1.18;
    }
    .eq-num {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 900;
      color: #0f172a;
      display: inline-block;
      margin-right: 4px;
    }
    .eq-type {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      color: #000000;
    }
    .eq-meta {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 700;
      color: #475569;
      display: block;
      margin-top: 1px;
    }

    /* Page 12: Section A Exam Strategy & Exemplar Models */
    .strategy-card {
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      padding: 5px 8px;
      background: #ffffff;
      margin-bottom: 3.5px;
    }
    .strat-card-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 900;
      color: #0f172a;
      border-bottom: 1.2px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 3px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      display: flex;
      justify-content: space-between;
    }
    .strat-body {
      font-family: 'Inter', sans-serif;
      font-size: 7.1pt;
      line-height: 1.25;
      color: #1e293b;
    }
    .model-box {
      background: #f8fafc;
      border-left: 3px solid #0f172a;
      padding: 3px 6px;
      margin-top: 2px;
      font-size: 6.9pt;
      line-height: 1.22;
      font-family: 'Georgia', serif;
    }
    .model-box strong { font-family: 'Inter', sans-serif; }
    .checklist-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 6.9pt;
      line-height: 1.22;
      background: #f1f5f9;
      padding: 3.5px 6px;
      border-radius: 2px;
      margin-top: 2px;
    }
    .check-item {
      display: flex;
      gap: 4px;
      align-items: flex-start;
    }
    .check-box-icon {
      font-weight: 900;
      color: #0f172a;
      min-width: 14px;
    }
    .distinction-grid-4col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 5px;
      margin-top: 2px;
    }
    .distinction-grid-6col {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      margin-top: 2px;
    }
    .dist-card {
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #0f172a;
      background: #f8fafc;
      padding: 3px 5px;
      border-radius: 1px;
      font-family: 'Inter', sans-serif;
      font-size: 6.7pt;
      line-height: 1.2;
    }
    .dist-card strong {
      display: block;
      color: #0f172a;
      font-size: 6.9pt;
      margin-bottom: 1px;
    }
  </style>
</head>
<body>
`;

  // ========================================================================
  // PAGE 1: FRONT COVER & HOMEWORK RETRIEVAL TRACKER
  // ========================================================================
  html += `
  <div class="page-container" id="page-1">
    <div class="page-body-full">
      <div class="running-header">
        <span>PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1: SECTION A (1HI0/11)</span>
        <span>HISTORIC ENVIRONMENT RETRIEVAL COMPANION</span>
      </div>

      <div class="cover-top-box">
        <div class="cover-badge-row">
          <span class="cover-badge">Paper 1: Section A Specialist Companion</span>
          <span class="cover-dept-name" data-department-name="The History Department">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <h1 class="cover-main-title">THE BRITISH SECTOR OF THE WESTERN FRONT, 1914–1918</h1>
        <div class="cover-sub-title">Injuries, Treatment and the Trenches &bull; Core Knowledge, Evacuation Architecture & Exam Strategy</div>
      </div>

      <!-- Clean Pupil Metadata Strip -->
      <div class="pupil-meta-strip">
        <div class="pupil-field">
          <span class="pupil-field-lbl">Name:</span>
          <div class="pupil-line"></div>
        </div>
        <div class="pupil-field">
          <span class="pupil-field-lbl">Class / Group:</span>
          <div class="pupil-line"></div>
        </div>
        <div class="pupil-field">
          <span class="pupil-field-lbl">Teacher:</span>
          <div class="pupil-line"></div>
        </div>
      </div>

      <!-- Edexcel Paper 1: Section A Specification Overview -->
      <div class="spec-overview-card">
        <div class="spec-overview-title-bar">
          <span>Edexcel Historic Environment Specification Overview (1HI0/11)</span>
          <span>16 Marks &bull; 10% GCSE Weighting</span>
        </div>
        <div class="spec-three-pillars">
          <div class="spec-pillar-col">
            <span class="pillar-label">1. Theatre of War &amp; Trenches</span>
            <div class="pillar-text">
              Key sectors: <strong>Ypres Salient</strong> (Hill 60, Passchendaele mud), <strong>Somme</strong> (chalk soil, July 1916 casualty crisis), <strong>Arras</strong> (chalk caves, underground hospital), <strong>Cambrai</strong> (artillery/tanks, blood depot). Trench layout: front line, support, reserve, communication, saps, and deep dugouts.
            </div>
          </div>
          <div class="spec-pillar-col">
            <span class="pillar-label">2. Illnesses, Weaponry &amp; Wounds</span>
            <div class="pillar-text">
              Environmental conditions: <strong>trench foot</strong> (whale oil, dry socks), <strong>trench fever</strong> (body lice, pyrexia), <strong>shell shock</strong> / NYDN. Weaponry: high-explosive artillery shells, machine gun fire, shrapnel bullets, and soil bacteria (gas gangrene / tetanus). Poison gas: <strong>chlorine, phosgene, mustard gas</strong>.
            </div>
          </div>
          <div class="spec-pillar-col">
            <span class="pillar-label">3. Evacuation Chain &amp; Innovations</span>
            <div class="pillar-text">
              Evacuation chain: <strong>RAP &rarr; ADS/MDS &rarr; CCS &rarr; Base Hospital</strong>. Medical corps: <strong>RAMC &amp; FANY</strong>. Treatment innovations: <strong>Thomas Splint</strong> (femur traction), <strong>Carrel-Dakin method</strong>, <strong>debridement</strong>, mobile X-rays, <strong>blood transfusions</strong> &amp; <strong>Robertson blood depot</strong>, neurosurgery (Cushing), and plastic reconstruction (Gillies).
            </div>
          </div>
        </div>

        <div class="exam-structure-strip">
          <div class="exam-q-cell">
            <span class="eq-num">Q1(a) &amp; Q1(b)</span>
            <span class="eq-type">Feature Questions</span>
            <span class="eq-meta">2m + 2m = 4 Marks &bull; ~6 Mins</span>
          </div>
          <div class="exam-q-cell">
            <span class="eq-num">Q2(a)</span>
            <span class="eq-type">Source Utility Enquiry</span>
            <span class="eq-meta">8 Marks &bull; ~14 Mins</span>
          </div>
          <div class="exam-q-cell">
            <span class="eq-num">Q2(b)</span>
            <span class="eq-type">4-Step Follow-Up Enquiry</span>
            <span class="eq-meta">4 Marks &bull; ~5 Mins</span>
          </div>
        </div>
      </div>

      <!-- 6-Lesson Homework & Spaced Retrieval Tracker -->
      <table class="tracker-table">
        <thead>
          <tr>
            <th style="width: 7%;">Lesson</th>
            <th style="width: 41%;">Historic Environment Topic Title</th>
            <th style="width: 12%; text-align: center;">1st Score (12)</th>
            <th style="width: 12%; text-align: center;">2nd Score (12)</th>
            <th style="width: 12%; text-align: center;">3rd Score (12)</th>
            <th style="width: 16%;">Identified DIRT Focus</th>
          </tr>
        </thead>
        <tbody>
          ${WESTERN_FRONT_QUIZ_BANK.map(
            (l) => `
          <tr>
            <td style="font-weight: 800; text-align: center;">L${l.num}</td>
            <td><strong>${l.title}</strong></td>
            <td style="text-align: center;">_____ / 12</td>
            <td style="text-align: center;">_____ / 12</td>
            <td style="text-align: center;">_____ / 12</td>
            <td style="font-size: 6.8pt; color: #64748b;">Q#: ____________</td>
          </tr>
          `,
          ).join('')}
        </tbody>
      </table>

      <!-- 8 Core Disciplinary Terms & Specification Glossary -->
      <div class="spec-overview-card" style="margin-bottom: 5px;">
        <div class="spec-overview-title-bar">
          <span>8 Core Disciplinary Terms &bull; Pearson Edexcel Specification Glossary</span>
          <span>Historic Environment Precision</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; padding: 4.5px 7px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2;">
          <div style="border-left: 2px solid #0f172a; padding-left: 4px;">
            <strong style="color: #0f172a; font-size: 7.0pt; display: block;">1. Ypres Salient</strong>
            Bulge in the line surrounded by Germans on 3 sides; subjected to converging artillery fire and waterlogged Passchendaele mud.
          </div>
          <div style="border-left: 2px solid #0f172a; padding-left: 4px;">
            <strong style="color: #0f172a; font-size: 7.0pt; display: block;">2. Gas Gangrene</strong>
            Anaerobic bacterial infection caused by soil bacteria (*Clostridium*) in deep, oxygen-deprived muscle wounds; produced foul gas.
          </div>
          <div style="border-left: 2px solid #0f172a; padding-left: 4px;">
            <strong style="color: #0f172a; font-size: 7.0pt; display: block;">3. Debridement</strong>
            Surgical cutting away of dead, infected tissue from jagged shrapnel wounds before stitching, preventing gangrenous spread.
          </div>
          <div style="border-left: 2px solid #0f172a; padding-left: 4px;">
            <strong style="color: #0f172a; font-size: 7.0pt; display: block;">4. Carrel-Dakin Method</strong>
            Continuous chemical irrigation using sterilised rubber tubes flushing sodium hypochlorite solution into deep wound pockets.
          </div>
          <div style="border-left: 2px solid #0f172a; padding-left: 4px;">
            <strong style="color: #0f172a; font-size: 7.0pt; display: block;">5. Thomas Splint</strong>
            Rigid metal traction splint introduced in 1915; prevented broken femur ends grinding together, lifting survival from 20% to 82%.
          </div>
          <div style="border-left: 2px solid #0f172a; padding-left: 4px;">
            <strong style="color: #0f172a; font-size: 7.0pt; display: block;">6. Sodium Citrate</strong>
            Anticoagulant chemical discovered by Richard Lewisohn in 1915, preventing blood clotting and enabling indirect blood storage.
          </div>
          <div style="border-left: 2px solid #0f172a; padding-left: 4px;">
            <strong style="color: #0f172a; font-size: 7.0pt; display: block;">7. Blood Depot (Cambrai)</strong>
            World's first blood bank created by Oswald Robertson in 1917, storing Universal Group O blood in iced bottles for rapid transfusions.
          </div>
          <div style="border-left: 2px solid #0f172a; padding-left: 4px;">
            <strong style="color: #0f172a; font-size: 7.0pt; display: block;">8. Triage Protocol</strong>
            Systematic sorting of casualties at CCS into three groups: walking wounded, urgent surgery cases, and moribund (fatal).
          </div>
        </div>
      </div>

      <!-- Traffic Light Bands -->
      <div class="traffic-tier-box">
        <span>🟢 <strong>Green (10–12/12):</strong> Secure Core Recall &bull; Ready for Feature &amp; Source Questions</span>
        <span>🟡 <strong>Amber (7–9/12):</strong> Effortful &bull; Green-Pen Review</span>
        <span>🔴 <strong>Red (0–6/12):</strong> Restudy Flashcards &amp; Re-attempt</span>
      </div>

      <!-- Section A Assessment Standards -->
      <div class="traffic-tier-box" style="margin-bottom: 5px; background: #ffffff;">
        <span>🎯 <strong>AO1 (Recall &amp; Detail):</strong> Accurate dates, casualty tallies &amp; medical terminology (traction, debridement, sodium citrate)</span>
        <span>🔍 <strong>AO3 (Source Interrogation):</strong> Content + Own Context + Provenance (Nature, Origin, Purpose &bull; never "just biased")</span>
      </div>

      <!-- Spaced Retrieval Protocol -->
      <div class="cover-protocol-box">
        <div style="font-weight: 900; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.3px;">Spaced Retrieval &amp; Green-Pen Review Protocol:</div>
        <div>&bull; <strong>1. Pure Recall Practice (10 Mins):</strong> Complete each weekly 12-question quiz from memory without looking at revision notes.</div>
        <div>&bull; <strong>2. Immediate Green-Pen Review:</strong> Turn to the <em>Department Marking Bank</em> (pages 9–10) and self-mark in green pen. Write out the full historical explanation for any incorrect answer.</div>
        <div>&bull; <strong>3. 7-Day Spaced Re-test:</strong> Re-attempt the 12 questions one week later. Record your 2nd score to verify retention into long-term memory.</div>
        <div>&bull; <strong>4. Section A Exam Application:</strong> Use your core factual knowledge to tackle the 2-mark feature questions and 4-mark follow-up enquiries on page 12.</div>
        <div>&bull; <strong>5. Diagnostic DIRT &amp; Flashcard Logging:</strong> Transfer any missed questions into your personal revision flashcards for daily Leitner box testing.</div>
      </div>

      <!-- QR & Portal Banner -->
      <div style="display: flex; gap: 12px; align-items: center; border: 1.3px solid #0f172a; padding: 6px 12px; border-radius: 2px; background: #ffffff;">
        <div style="width: 50px; height: 50px; flex-shrink: 0;">${qrSvg}</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.0pt; line-height: 1.34; color: #1e293b; flex: 1;">
          <strong>Interactive Leitner Quizzing & Digital Flashcards:</strong> Scan this QR code or access the Department Portal to practice all 72 Western Front questions interactively with automated spaced repetition and exam-level timing.
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">1/12</span>
        <span class="footer-quip">${APPROVED_FOOTERS[0]}</span>
      </div>
    </div>
  </div>
  `;

  // ========================================================================
  // PAGE 2: CHRONOLOGY & EVACUATION ARCHITECTURE
  // ========================================================================
  html += `
  <div class="page-container" id="page-2">
    <div class="page-body-full">
      <div class="running-header">
        <span>EDEXCEL PAPER 1: SECTION A &bull; WESTERN FRONT CHRONOLOGY & CHAIN OF EVACUATION</span>
        <span>KEY TURNING POINTS &bull; SYSTEM ARCHITECTURE</span>
      </div>

      <div class="p2-grid">
        <!-- Left: Key Chronology -->
        <div class="col-card">
          <div class="col-title">Western Front Chronology & Medical Milestones (1914–1918)</div>
          <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
            ${WESTERN_FRONT_TIMELINE.map(
              (item) => `
            <div class="timeline-node">
              <span class="t-year">${item.year}</span>:
              <span class="t-title">${item.title}</span>
              <span class="t-desc">${item.text}</span>
            </div>
            `,
            ).join('')}
          </div>
        </div>

        <!-- Right: 4-Stage Chain of Evacuation -->
        <div class="col-card">
          <div class="col-title">The 4-Stage Chain of Evacuation Architecture</div>
          <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
            ${EVACUATION_STAGES.map(
              (stg) => `
            <div class="stage-card">
              <div class="stage-name">${stg.stage}</div>
              <span class="stage-meta"><strong>Location:</strong> ${stg.dist} &bull; <strong>Personnel:</strong> ${stg.staff}</span>
              <div class="stage-desc">${stg.role}</div>
            </div>
            `,
            ).join('')}

            <div style="border: 1.2px dashed #0f172a; padding: 5px 8px; border-radius: 2px; background: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.26; color: #1e293b;">
              <strong>Key Exam Principle:</strong> The Chain of Evacuation was organized by <em>triage urgency</em>. Rapid forward surgery at the CCS was vital because gas gangrene killed within 24 hours. The Thomas Splint kept femoral fractures stable during transport, cutting deaths from 80% to 20%.
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">2/12</span>
        <span class="footer-quip">${APPROVED_FOOTERS[1]}</span>
      </div>
    </div>
  </div>
  `;

  // ========================================================================
  // PAGES 3 TO 8: LESSONS 1 TO 6 (100% UNIFORM RETRIEVAL COMPANIONS)
  // ========================================================================
  for (let pIdx = 0; pIdx < 6; pIdx++) {
    const lData = WESTERN_FRONT_QUIZ_BANK[pIdx];
    const pageNum = pIdx + 3; // Pages 3 to 8

    html += `
  <div class="page-container" id="page-${pageNum}">
    <div class="page-body-full">
      <div class="running-header">
        <span>PAPER 1: SECTION A &bull; LESSON ${pIdx + 1} RETRIEVAL COMPANION</span>
        <span>12 PRACTICE QUESTIONS &bull; HISTORIC ENVIRONMENT</span>
      </div>

      <div class="lesson-meta-bar">
        <h2 class="lesson-meta-title">Lesson ${pIdx + 1}: ${lData.title}</h2>
        <div class="lesson-meta-enquiry">Enquiry Question: ${lData.enquiry}</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
        ${lData.questions
          .map(
            (q, qIdx) => `
        <div class="q-block">
          <div class="q-header">
            <div class="q-prompt-wrap">
              <span class="q-num">${qIdx + 1}.</span>
              <span class="q-prompt">${q.q}</span>
            </div>
            <span class="q-attempt">[ 1st: ___ / 2nd: ___ ]</span>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Key Fact:</span>
            <div class="q-solid-line"></div>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Explanation:</span>
            <div class="q-solid-line"></div>
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">${pageNum}/12</span>
        <span class="footer-quip">${APPROVED_FOOTERS[pageNum - 1]}</span>
      </div>
    </div>
  </div>
    `;
  }

  // ========================================================================
  // PAGES 9 & 10: DEPARTMENT MARKING BANK (2 SPREADS OF 3 LESSONS)
  // ========================================================================
  const mbPageGroups = [
    { page: 9, title: 'Lessons 1 to 3: Geography, Environment & Trauma', lessons: [0, 1, 2] },
    { page: 10, title: 'Lessons 4 to 6: Evacuation, Surgery & Innovations', lessons: [3, 4, 5] },
  ];

  mbPageGroups.forEach((grp) => {
    html += `
  <div class="page-container" id="page-${grp.page}">
    <div class="page-body-full">
      <div class="running-header">
        <span>DEPARTMENT MARKING BANK &bull; ${grp.title.toUpperCase()}</span>
        <span>SELF-ASSESSMENT &bull; GREEN-PEN DIRT REVIEW</span>
      </div>

      <div class="mb-grid-3col">
        ${grp.lessons
          .map((lIdx) => {
            const lData = WESTERN_FRONT_QUIZ_BANK[lIdx];
            return `
          <div class="mb-lesson-col">
            <div class="mb-lesson-title">Lesson ${lIdx + 1}: ${lData.title.split(':')[0]}</div>
            ${lData.questions
              .map(
                (q, qIdx) => `
            <div class="ans-card">
              <div class="ans-header">
                <span class="ans-num">${qIdx + 1}.</span>
                <span class="ans-core">${q.a}</span>
                <span class="ans-check">[✓] [✗]</span>
              </div>
              <div class="ans-exp">${q.exp}</div>
            </div>
            `,
              )
              .join('')}
          </div>
          `;
          })
          .join('')}
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">${grp.page}/12</span>
        <span class="footer-quip">${APPROVED_FOOTERS[grp.page - 1]}</span>
      </div>
    </div>
  </div>
    `;
  });

  // ========================================================================
  // PAGE 11: HISTORIC ENVIRONMENT SOURCES & EDEXCEL Q2(B) BLUEPRINT
  // ========================================================================
  html += `
  <div class="page-container" id="page-11">
    <div class="page-body-full">
      <div class="running-header">
        <span>EDEXCEL PAPER 1: SECTION A &bull; HISTORIC ENVIRONMENT SOURCES VAULT</span>
        <span>SOURCE TYPES &bull; Q2(B) 4-STEP ENQUIRY BLUEPRINT</span>
      </div>

      <!-- Primary Sources Vault -->
      <div class="source-vault-card">
        <div class="card-title-bar">
          <span>Primary Historical Sources for Western Front Enquiries</span>
          <span>Edexcel Specification Types</span>
        </div>
        <div class="sources-grid">
          <div class="source-item">
            <strong>1. National Army Records & War Diaries</strong>
            Maintained daily by British Army units. Provides factual dates, battalion movements, casualty tallies, and battlefield conditions. Objective military records, though may understate defeats or panic.
          </div>
          <div class="source-item">
            <strong>2. Medical Officers' Day Books & RAMC Reports</strong>
            Detailed clinical accounts written by surgeons and Regimental Medical Officers at RAPs and CCS units. Extremely accurate regarding wound types, treatments, and shortages of supplies.
          </div>
          <div class="source-item">
            <strong>3. Hospital Admission Registers</strong>
            Log books recording patient names, ranks, wound classifications, dates admitted, and discharge/death status. Ideal for statistical enquiries into fracture survival or gas mortality rates.
          </div>
          <div class="source-item">
            <strong>4. Personal Memoirs & Soldiers' Letters / Diaries</strong>
            First-hand emotional accounts from soldiers, stretcher-bearers, and nurses. Rich in personal experience of pain, mud, and morale, but written from individual, subjective perspectives.
          </div>
          <div class="source-item">
            <strong>5. Official & Contemporary Photographs</strong>
            British official war photographers (e.g. Ernest Brooks). Shows physical trench layout, deep mud, and evacuation transport. May be staged for public morale or censored by authorities.
          </div>
          <div class="source-item">
            <strong>6. Red Cross & FANY Voluntary Archives</strong>
            Reports and logs kept by volunteer nurses and ambulance drivers. Highly useful for investigating the role of women, motor ambulance transport, and mobile bath units.
          </div>
        </div>
      </div>

      <!-- Q2(b) 4-Part Follow-Up Enquiry Formula -->
      <div class="source-vault-card" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div class="card-title-bar">
          <span>Official Edexcel 4-Mark Follow-Up Enquiry Protocol (Question 2b)</span>
          <span>4 Marks &bull; 100% Success Formula</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.34; color: #1e293b; margin-bottom: 4px;">
          Question 2(b) asks: <em>"How could you follow up Source X to find out more about [topic]?"</em> You MUST complete all four prompts with specific, historical precision. Generic source types like "the internet" or "a book" score 0 marks.
        </div>

        <table class="followup-table">
          <thead>
            <tr>
              <th style="width: 25%;">Edexcel Required Prompt</th>
              <th style="width: 45%;">Examiner Standard & Rule</th>
              <th style="width: 30%;">Exemplar Model Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Detail in Source that I would follow up</strong></td>
              <td>Quote one specific detail directly from the source that mentions medical problems or treatments.</td>
              <td><em>"The mud was up to our knees and the stretcher took four hours to reach the dressing station."</em></td>
            </tr>
            <tr>
              <td><strong>2. Question I would ask</strong></td>
              <td>Formulate a focused, analytical historical question directly linked to the quote above.</td>
              <td><em>"What was the average time taken for stretcher-bearers to evacuate wounded men to a CCS at Passchendaele?"</em></td>
            </tr>
            <tr>
              <td><strong>3. Type of source I would use</strong></td>
              <td>Name a precise contemporary historical record from the Western Front. Never say "Google" or "history book".</td>
              <td><em>"RAMC Field Ambulance War Diaries or Casualty Clearing Station Admission Registers from Third Ypres (1917)."</em></td>
            </tr>
            <tr>
              <td><strong>4. How this would help me find out more</strong></td>
              <td>Explain how this specific source answers the question asked in Step 2.</td>
              <td><em>"It would record the exact arrival times and casualty logs, proving whether delayed evacuation was widespread across the sector."</em></td>
            </tr>
          </tbody>
        </table>

        <div style="border: 1.2px solid #0f172a; background: #f8fafc; padding: 5px 8px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.24; margin-top: 4px;">
          <strong>Examiner Tip for 4/4 Marks:</strong> Ensure all four steps connect like links in a chain. Step 2 must ask about Step 1; Step 3 must be a real primary source type; Step 4 must state what data that source reveals to answer Step 2.
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">11/12</span>
        <span class="footer-quip">${APPROVED_FOOTERS[10]}</span>
      </div>
    </div>
  </div>
  `;

  // ========================================================================
  // PAGE 12: BACK COVER — SECTION A EXAMINATION STRATEGY
  // ========================================================================
  html += `
  <div class="page-container" id="page-12">
    <div class="page-body-full">
      <div class="running-header">
        <span>EDEXCEL PAPER 1: SECTION A &bull; EXAMINATION STRATEGY & EXAM ARCHITECT</span>
        <span>HISTORIC ENVIRONMENT &bull; MAXIMUM MARKS BLUEPRINT</span>
      </div>

      <!-- Section Overview Strip -->
      <div style="border: 1.4px solid #0f172a; padding: 5px 10px; background: #0f172a; color: #ffffff; border-radius: 2px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 3.5px; font-family: 'Inter', sans-serif;">
        <span style="font-size: 8.3pt; font-weight: 900; text-transform: uppercase;">Section A: 16 Marks &bull; Recommended Time: 25 Minutes</span>
        <span style="font-size: 7.4pt; font-weight: 700;">Q1(a) [2m] + Q1(b) [2m] + Q2(a) [8m] + Q2(b) [4m]</span>
      </div>

      <!-- 1. Feature Questions Card -->
      <div class="strategy-card">
        <div class="strat-card-title">
          <span>1. Questions 1(a) &amp; 1(b): Feature Questions [2m + 2m = 4 Marks &bull; ~6 Mins]</span>
          <span>AO1: Knowledge &amp; Understanding</span>
        </div>
        <div class="strat-body">
          <strong>Official Examiner Rule:</strong> Identify one valid feature [1 mark] and add precise, supporting historical detail [1 mark]. Feature questions appear <em>only</em> in Section A on Paper 1 (never in Section B). Keep responses to two concise sentences per question.
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-top: 2px;">
          <div class="model-box">
            <strong>Exemplar A (Feature of Trench Fever):</strong><br>
            <em>"One feature was that it was transmitted by body lice living in uniforms [1m]. This caused debilitating flu-like symptoms including high pyrexia and severe muscle pain, affecting over 500,000 men and requiring delousing stations [1m]."</em>
          </div>
          <div class="model-box">
            <strong>Exemplar B (Feature of Thomas Splint):</strong><br>
            <em>"One feature was that it held the broken leg in rigid traction [1m]. This prevented broken femur ends grinding together and severing the femoral artery during rough transport, reducing compound fracture deaths from 80% to 20% [1m]."</em>
          </div>
          <div class="model-box">
            <strong>Exemplar C (Feature of Underground Hospital at Arras):</strong><br>
            <em>"One feature was that it was built inside chalk quarries (Thompson's Cave) safe from artillery fire [1m]. It contained 700 hospital beds, operating theatres, running water, and electric lighting directly linked to front-line trenches [1m]."</em>
          </div>
          <div class="model-box">
            <strong>Exemplar D (Feature of Chlorine Poison Gas):</strong><br>
            <em>"One feature was that it was a lethal suffocating agent first deployed at Second Ypres in 1915 [1m]. It stripped the lining of the lungs, causing soldiers to choke on their own fluid; before gas masks, troops used urine-soaked pads [1m]."</em>
          </div>
        </div>
      </div>

      <!-- 2. Question 2(a): Source Utility Enquiry Card -->
      <div class="strategy-card">
        <div class="strat-card-title">
          <span>2. Question 2(a): Source Utility Enquiry [8 Marks &bull; ~14 Mins]</span>
          <span>AO3: Analysis &amp; Evaluation of Utility</span>
        </div>
        <div class="strat-body">
          <strong>The 3-Pillar Assessment Framework:</strong> You must evaluate <strong>both Source A and Source B</strong> using:
          (1) <em>Content:</em> quote and infer specific details useful for the enquiry;
          (2) <em>Own Knowledge:</em> validate or contextualise source content;
          (3) <em>Provenance (NOP):</em> analyze how nature, origin, and purpose affect its utility (never say a source is "useless" because of bias).
        </div>
        <div class="model-box" style="margin-top: 2.5px;">
          <strong>Complete Level 4 Model Answer (Enquiry into problems of treating wounded soldiers on the Western Front):</strong><br>
          <div style="margin-top: 1.5px;">
            <strong>&bull; Paragraph 1 (Source A - RAMC Surgeon Clinical Day Book, 1916 Somme):</strong> 
            <em>"Source A is useful because it directly describes the catastrophic surgical bottlenecks at a CCS: 'Surgeons operated without pause for 48 hours as hundreds of stretcher cases lined the corridors.' From my own knowledge, the British Army suffered 57,000 casualties on 1 July 1916 alone. Casualty Clearing Stations like Dernancourt were completely overwhelmed, forcing surgeons to perform rapid triage and operate under acute shortages of anaesthetics. The provenance enhances its utility because it is an official contemporary clinical log written by a serving RAMC surgeon, giving an accurate eyewitness record of medical supply crises, though it focuses exclusively on surgical cases rather than the walking wounded."</em>
          </div>
          <div style="margin-top: 1.5px;">
            <strong>&bull; Paragraph 2 (Source B - Stretcher-Bearer Memoir, 1917 Third Ypres):</strong> 
            <em>"Source B is useful because it reveals the transport delays in evacuating casualties: 'The liquid mud of Passchendaele was knee-deep; it took six exhausted bearers four hours to carry one stretcher.' From my own knowledge, heavy artillery destroyed the land drainage around Ypres, creating a waterlogged swamp. Delay in reaching the RAP or ADS allowed soil bacteria (Clostridium perfringens) to multiply in deep wounds, causing fatal gas gangrene. The provenance is useful because it is a first-hand account by a frontline stretcher-bearer, providing authentic evidence of the physical ordeal of evacuation, though written after the war with retrospective emotion."</em>
          </div>
          <div style="margin-top: 1.5px;">
            <strong>&bull; Paragraph 3 (Comparative Synthesis &amp; Verdict):</strong> 
            <em>"Together, both sources are highly useful and complement each other. Source A provides an institutional perspective on hospital surgical overload at the CCS stage, while Source B explains the physical battlefield obstacles that delayed evacuation at the front line. Neither source alone gives the full picture, but together they demonstrate that treatment failure was driven by impossible terrain combined with unmanageable casualty volumes."</em>
          </div>
        </div>
      </div>

      <!-- 3. Question 2(b): 4-Step Follow-Up Quick Blueprint -->
      <div class="strategy-card">
        <div class="strat-card-title">
          <span>3. Question 2(b): 4-Step Follow-Up Enquiry Formula [4 Marks &bull; ~5 Mins]</span>
          <span>AO3: Historical Investigation</span>
        </div>
        <div class="strat-body" style="margin-bottom: 2px;">
          You must link all 4 steps in an unbroken chain: Step 2 asks directly about the quote in Step 1; Step 3 names an authentic primary source; Step 4 explains what data that source reveals to answer Step 2.
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
          <div class="model-box">
            <strong>Worked Exemplar 1 (Enquiry into Gas Gangrene):</strong><br>
            &bull; <strong>Detail in Source:</strong> <em>"The lacerated wounds turned black and bubbled with foul gas within hours."</em><br>
            &bull; <strong>Question I would ask:</strong> <em>"What percentage of wounded men admitted to Casualty Clearing Stations developed gas gangrene in 1915?"</em><br>
            &bull; <strong>Type of source I would use:</strong> <em>"RAMC Casualty Clearing Station Admission and Discharge Registers from 1915."</em><br>
            &bull; <strong>How this helps:</strong> <em>"It would provide official clinical tallies of wound infections and amputations, proving whether gangrene was widespread."</em>
          </div>
          <div class="model-box">
            <strong>Worked Exemplar 2 (Enquiry into Evacuation Transport):</strong><br>
            &bull; <strong>Detail in Source:</strong> <em>"The motor ambulance broke down in shell craters and took five hours to reach the station."</em><br>
            &bull; <strong>Question I would ask:</strong> <em>"How reliable were motor ambulances compared to horse-drawn transport in the Ypres Salient?"</em><br>
            &bull; <strong>Type of source I would use:</strong> <em>"British Red Cross and FANY Motor Ambulance Convoy Logbooks from Third Ypres (1917)."</em><br>
            &bull; <strong>How this helps:</strong> <em>"It would record vehicle breakdown logs and transit times, showing whether terrain prevented effective motor transport."</em>
          </div>
        </div>
      </div>

      <!-- 4. Official Edexcel Marking Matrix & Grade Bands -->
      <div class="strategy-card">
        <div class="strat-card-title">
          <span>4. Official Edexcel Mark Scheme Matrix: Questions 2(a) &amp; 2(b)</span>
          <span>Targeting Level 4</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22;">
          <div style="border-left: 2.5px solid #0f172a; padding-left: 5px; background: #f8fafc;">
            <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Q2(a) Utility [8 Marks &bull; Levels 1–4]:</strong>
            &bull; <strong>Level 4 (7–8m):</strong> Evaluates BOTH sources thoroughly. Synthesises specific content, contextual knowledge, and sustained analysis of provenance (nature, origin, purpose) with a clear comparative verdict on utility.<br>
            &bull; <strong>Level 3 (5–6m):</strong> Evaluates both sources; deploys relevant knowledge; addresses provenance.<br>
            &bull; <strong>Level 2 (3–4m):</strong> Assesses content and knowledge. <em>Exam Cap: Evaluating only one source caps your answer at Level 2 (max 4/8 marks).</em>
          </div>
          <div style="border-left: 2.5px solid #0f172a; padding-left: 5px; background: #f8fafc;">
            <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Q2(b) Follow-Up [4 Marks &bull; 1 Mark per Step]:</strong>
            &bull; <strong>Step 1 (1m):</strong> Verbatim quote of a relevant factual detail from Source X.<br>
            &bull; <strong>Step 2 (1m):</strong> Specific historical enquiry question asking directly about that quoted detail.<br>
            &bull; <strong>Step 3 (1m):</strong> Authentic contemporary primary record named (e.g. <em>RAMC War Diaries</em>).<br>
            &bull; <strong>Step 4 (1m):</strong> Clear explanation of what historical data this source reveals to answer Step 2.
          </div>
        </div>
      </div>

      <!-- 5. Essential Western Front Medical Distinctions -->
      <div class="strategy-card">
        <div class="strat-card-title">
          <span>5. Essential Western Front Disciplinary &amp; Clinical Distinctions</span>
          <span>Examiner Precision</span>
        </div>
        <div class="distinction-grid-6col">
          <div class="dist-card">
            <strong>Antiseptic vs. Aseptic:</strong>
            Antiseptic kills germs in wounds (carbolic acid). Aseptic prevents germs entering operating theatres. Aseptic failed in 1914 because fertile soil bacteria were already embedded in shrapnel wounds before hospital admission.
          </div>
          <div class="dist-card">
            <strong>Debridement vs. Carrel-Dakin:</strong>
            Debridement is the mechanical cutting away of dead, infected tissue. Carrel-Dakin uses sterilized rubber tubes to flush sodium hypochlorite continuously into deep wound pockets to prevent anaerobic infection.
          </div>
          <div class="dist-card">
            <strong>Direct Transfusion vs. Blood Depot:</strong>
            1915 direct transfusion required donor-to-patient tubing (Rous &amp; Turner). 1917 Cambrai used sodium citrate &amp; glucose in refrigerated bottles (Oswald Robertson's blood bank) for rapid treatment of shock.
          </div>
          <div class="dist-card">
            <strong>RAMC vs. FANY Corps:</strong>
            RAMC (Royal Army Medical Corps) provided official military doctors, surgeons, orderlies, and stretcher-bearers. FANY (First Aid Nursing Yeomanry) provided voluntary female motor ambulance drivers and frontline aid.
          </div>
          <div class="dist-card">
            <strong>Shrapnel vs. High-Explosive Shells:</strong>
            Shrapnel shells exploded in mid-air spraying lead pellets and driving contaminated uniform cloth into flesh. High-explosive shells exploded on impact with massive blast concussions, causing compound fractures and traumatic amputations.
          </div>
          <div class="dist-card">
            <strong>Casualty Clearing Station vs. Base Hospital:</strong>
            CCS was the primary forward surgical unit (10–12 miles back) performing emergency triage and amputations. Base Hospitals (coastal ports) provided specialist long-term recovery and transport to "Blighty".
          </div>
        </div>
      </div>

      <!-- 6. Examiner Audit & Pitfall Prevention -->
      <div class="strategy-card" style="margin-bottom: 0;">
        <div class="strat-card-title">
          <span>6. Section A Examiner Checklist &amp; Trap Prevention</span>
          <span>Final Exam Audit</span>
        </div>
        <div class="checklist-grid">
          <div class="check-item"><span class="check-box-icon">[✓]</span> <div><strong>No Feature Questions in Section B:</strong> Feature questions appear ONLY in Section A. Never write 2-mark feature paragraphs for Paper 1 Section B!</div></div>
          <div class="check-item"><span class="check-box-icon">[✓]</span> <div><strong>No Vague Sources for Q2(b):</strong> Never write "a book", "a diary", or "the internet". Always specify the official military archive (e.g. <em>RAMC War Diaries</em>).</div></div>
          <div class="check-item"><span class="check-box-icon">[✓]</span> <div><strong>Utility is NOT Reliability:</strong> A biased propaganda poster or exaggerated memoir is still highly useful for studying British morale or attitudes.</div></div>
          <div class="check-item"><span class="check-box-icon">[✓]</span> <div><strong>Evaluate BOTH Sources in Q2(a):</strong> Failing to evaluate both Source A and Source B caps your mark at Level 2 (maximum 4/8 marks).</div></div>
          <div class="check-item"><span class="check-box-icon">[✓]</span> <div><strong>Feature Formula:</strong> Statement [1m] + Historical Elaboration [1m]. Never write essays for Q1(a) or Q1(b); 2 concise sentences earn full marks.</div></div>
          <div class="check-item"><span class="check-box-icon">[✓]</span> <div><strong>Comparative Judgment:</strong> In Q2(a), always conclude by comparing the relative strengths of the sources and how they complement each other.</div></div>
          <div class="check-item"><span class="check-box-icon">[✓]</span> <div><strong>Direct Quotes in Q2(b):</strong> Always quote directly from the source in Step 1. Inventions or generic summaries lose marks immediately.</div></div>
          <div class="check-item"><span class="check-box-icon">[✓]</span> <div><strong>Contextual Knowledge in Q2(a):</strong> Never just analyze the source words; deploy specific dates, statistics, and medical names to contextualise the excerpt.</div></div>
        </div>
      </div>

      <div class="page-footer-strip">
        <span class="footer-page-num">12/12</span>
        <span class="footer-quip">${APPROVED_FOOTERS[11]}</span>
      </div>
    </div>
  </div>
  `;

  html += `
</body>
</html>
  `;

  return html;
}

// --------------------------------------------------------------------------
// MAIN COMPILATION ENGINE (PUPPETEER + 0PX AUDIT)
// --------------------------------------------------------------------------
async function compilePdf() {
  console.log('🚀 Compiling Western Front Master Knowledge Retrieval Companion...');
  const html = buildHtml();

  const unitDir = path.join(ROOT_DIR, 'public', 'units', 'edexcel_medicine');
  if (!fs.existsSync(unitDir)) fs.mkdirSync(unitDir, { recursive: true });

  const htmlPath = path.join(unitDir, 'western_front_master_retrieval_companion.html');
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`✅ Saved HTML: ${htmlPath}`);

  console.log('🖨️ Launching Puppeteer to audit and compile Master 12-Page A4 PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Audit all 12 pages for 0px overflow
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page-container');
    const results = [];
    pages.forEach((p, idx) => {
      results.push({
        page: idx + 1,
        id: p.id,
        scrollHeight: p.scrollHeight,
        clientHeight: p.clientHeight,
        overflow: p.scrollHeight > p.clientHeight + 1,
      });
    });
    return results;
  });

  console.log('\n=============================================================');
  console.log('📐 AUTOMATED PAGE BUDGET & LAYOUT AUDIT: Western Front Companion');
  console.log('=============================================================');
  let hasErrors = false;
  auditResults.forEach((r) => {
    const status = r.overflow
      ? `❌ OVERFLOW (${r.scrollHeight}px > ${r.clientHeight}px)`
      : `✅ OPTIMAL (${r.scrollHeight}px <= ${r.clientHeight}px)`;
    console.log(`Page ${String(r.page).padStart(2, ' ')} (${r.id}): ${status}`);
    if (r.overflow) hasErrors = true;
  });
  console.log('=============================================================\n');

  const targetPdf = path.join(PDFS_DIR, 'Western_Front_Master_Knowledge_Retrieval_Companion.pdf');

  await page.pdf({
    path: targetPdf,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 12-Page A4 PDF: ${targetPdf}`);

  await browser.close();

  // Mirror to Google Drive Department File
  try {
    if (fs.existsSync(DRIVE_BASE)) {
      const gDriveTargets = [
        path.join(
          DRIVE_BASE,
          'Year 11 (GCSE)',
          'Paper 1 - Medicine Through Time',
          'Western Front Master Knowledge Retrieval Companion.pdf',
        ),
        path.join(
          DRIVE_BASE,
          '02. GCSE (Years 10-11)',
          'Paper 1 - Medicine Through Time',
          'Western Front Master Knowledge Retrieval Companion.pdf',
        ),
        path.join(DRIVE_BASE, 'pdfs', 'Western_Front_Master_Knowledge_Retrieval_Companion.pdf'),
      ];

      gDriveTargets.forEach((dest) => {
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(targetPdf, dest);
        console.log(`☁️ Synced to Google Drive Department File: ${dest}`);
      });
      console.log(
        '✅ Google Drive Department File updated with fresh 12-page Western Front companion.',
      );
    }
  } catch (err) {
    console.warn('⚠️ Warning: Google Drive sync issue:', err.message);
  }

  if (hasErrors) {
    console.warn(
      '⚠️ Some pages showed overflow during compilation. Please inspect audit table above.',
    );
  } else {
    console.log(
      '🎉 100% SUCCESS: All 12 pages compiled cleanly with 0px overflow! Ready for reprographics.',
    );
  }
}

if (require.main === module) {
  compilePdf().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { compilePdf };
