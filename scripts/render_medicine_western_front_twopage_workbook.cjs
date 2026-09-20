const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

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

// 16 APPROVED RISQUÉ / CHEEKY BLACKADDER-STYLE QUIPS
const quipList = [
  'The British Sector of the Western Front, 1914–1918 • The History Department', // Page 1
  'If you think your walk to period 1 is rough, try carrying a 14-stone sergeant through 4 miles of knee-deep Flanders clay.', // Page 2
  'Rule 1 of the Evacuation Chain: If the stretcher bearer drops you, do not complain—he has just dodged a 5.9-inch howitzer shell.', // Page 3
  'Welcome to Flanders: 500 square miles of fermented pig manure, liquid mud, and Germans with surprisingly accurate artillery.', // Page 4 (LOCKED)
  'Trench drainage tip: If your duckboards are floating, you are no longer in an infantry trench; you are commanding a submarine.', // Page 5
  'Whale oil smells like dead fish and regrets, but it beats having your toes amputated by an RAMC butcher with a bone-saw.', // Page 6
  "Body lice: The only creatures on the Western Front that didn't care about King, Kaiser, or your personal hygiene.", // Page 7
  'The Brodie helmet: Looks like an upside-down soup bowl, but prevents your skull from becoming one.', // Page 8
  'Chlorine gas: If it smells like rotten pineapple and bleaches the grass, do NOT inhale—unless you fancy drowning in your own lungs.', // Page 9
  "The Regimental Aid Post: 200 yards from the Kaiser's machine guns, lit by candle-ends, and smelling entirely of iodine and panic.", // Page 10
  'Motor ambulances: Guaranteed to break every uninjured bone in your body while rushing you to the Casualty Clearing Station.', // Page 11
  'The Thomas Splint: Before Robert Jones introduced it, an 80% chance of death; after Jones, an 80% chance of living to complain about the food.', // Page 12
  'Carrel-Dakin solution: If it burns like liquid fire and smells like a Victorian washhouse, congratulations—it is killing the gangrene.', // Page 13
  "Robertson's Blood Bank: Ice chests, sodium citrate, and refrigerated blood at Cambrai—proof that cold beer isn't the only thing worth chilling.", // Page 14
  'Harold Gillies at Sidcup: Turning shredded jaws into faces again with pedicle skin tubes, while patients politely pretended not to notice.', // Page 15
  'Western Front Spec Mastery complete: 16 marks in the bag, zero gangrene, and not a single complaint to the War Office.', // Page 16
];

function getFooterHtml(pageNum, totalPages = 16) {
  const quipText = quipList[pageNum - 1] || 'The British Sector of the Western Front, 1914–1918';
  return `
    <div class="page-footer-strip">
      <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;"><em>${quipText}</em></span>
      <span class="footer-page-num">${pageNum}/${totalPages}</span>
    </div>`;
}

// 6 DEDICATED LESSON CONFIGURATIONS
const wfConfigs = [
  {
    lessonIndex: 20,
    lessonNum: 1,
    id: 'lesson_5_1',
    title: 'KT5.1: The Theatre of War: The British Sector, Trench Geography & Battles',
    specAnchor:
      'The British sector of the Western Front: theatre of war and trench system (frontline, support, reserve, communication trenches); terrain, saps, and battleground sectors (Ypres, Somme, Arras, Cambrai).',
    q2a: {
      sourceLetter: 'A',
      stem: 'Study Source A on page 4. How useful is Source A for an enquiry into the defensive layout and design of the trench system on the Western Front? [4 marks]',
      provenanceClue:
        'Consider the nature of an official military aerial reconnaissance photograph taken by the Royal Flying Corps in 1917. What does an overhead view reveal about traverses, and what ground-level details does it omit?',
      stems:
        'Source A is useful for an enquiry into trench layout because it shows... &bull; In particular, the zig-zag traverse pattern was designed to... &bull; However, as an aerial photograph, it is limited because...',
    },
    q2b: {
      sourceLetter: 'B',
      detailPrompt: 'Detail in Source B that I would follow up:',
      questionPrompt: 'Question I would ask:',
      sourceTypePrompt: 'Type of source I would look for:',
      helpPrompt: 'How this might help answer my question:',
    },
  },
  {
    lessonIndex: 21,
    lessonNum: 2,
    id: 'lesson_5_2',
    title: 'KT5.2: The Trench Environment: Mud, Vermin & Non-Combat Illnesses',
    specAnchor:
      'Ill health arising from the trench environment: trench foot (pathology, prevention, whale oil); trench fever (body lice, delousing); dysentery (water chlorination, chloride of lime, latrines); underground shelters.',
    q2a: {
      sourceLetter: 'A',
      stem: 'Study Source A on page 6. How useful is Source A for an enquiry into the methods used by the British Army to prevent trench foot on the Western Front? [4 marks]',
      provenanceClue:
        'Consider the nature of an official British War Office photograph taken in 1916 showing the Cheshire Regiment. What does it reveal about supervised foot inspection routines, and why might an official photograph show clean conditions?',
      stems:
        'Source A is useful for investigating the prevention of trench foot because it depicts... &bull; This corroborates historical knowledge that soldiers were required to... &bull; However, the source is limited because it is an official photograph showing...',
    },
    q2b: {
      sourceLetter: 'B',
      detailPrompt: 'Detail in Source B that I would follow up:',
      questionPrompt: 'Question I would ask:',
      sourceTypePrompt: 'Type of source I would look for:',
      helpPrompt: 'How this might help answer my question:',
    },
  },
  {
    lessonIndex: 22,
    lessonNum: 3,
    id: 'lesson_5_3',
    title: 'KT5.3: Battlefield Trauma: High Explosive Shrapnel, Gas Attacks & Infection',
    specAnchor:
      'Wounds, injuries and diseases: high-explosive artillery shells, shrapnel fragments; infection (gas gangrene, Clostridium welchii, tetanus); head trauma and the Brodie helmet; nature of chemical gas attacks (chlorine, phosgene, mustard gas) and respirators.',
    q2a: {
      sourceLetter: 'B',
      stem: 'Study Source B on page 8. How useful is Source B for an enquiry into the methods used to protect British soldiers from poison gas attacks on the Western Front? [4 marks]',
      provenanceClue:
        'Consider the nature of an authentic British War Office Phenate-Hexamine (PH) helmet manufactured in 1915–1916. What physical chemical protection features does it display, and what combat limitations did flannel cloth helmets possess?',
      stems:
        'Source B is useful for investigating gas protection because it provides physical evidence of... &bull; The chemically treated flannel was designed to neutralize... &bull; However, as a standalone artifact, Source B does not show...',
    },
    q2b: {
      sourceLetter: 'A',
      detailPrompt: 'Detail in Source A that I would follow up:',
      questionPrompt: 'Question I would ask:',
      sourceTypePrompt: 'Type of source I would look for:',
      helpPrompt: 'How this might help answer my question:',
    },
  },
  {
    lessonIndex: 23,
    lessonNum: 4,
    id: 'lesson_5_4',
    title: 'KT5.4: The Chain of Evacuation: Stretcher Bearers, RAP, Dressing Stations & CCS',
    specAnchor:
      'The work of the RAMC and FANY: the Chain of Evacuation (stretcher bearers, Regimental Aid Posts, Field Ambulances and Dressing Stations, Casualty Clearing Stations, Base Hospitals); triage systems; transport methods (motor ambulances, ambulance trains, canal barges).',
    q2a: {
      sourceLetter: 'A',
      stem: 'Study Source A on page 10. How useful is Source A for an enquiry into the difficulties of evacuating wounded soldiers from the battlefield on the Western Front? [4 marks]',
      provenanceClue:
        'Consider the nature of an official British Army photograph taken by Lieutenant Ernest Brooks during the Third Battle of Ypres in 1917. What does it reveal about the physical mud and stretcher logistics, and what combat dangers are invisible?',
      stems:
        'Source A is useful for investigating evacuation difficulties because it shows... &bull; In the liquid mud of Passchendaele, carrying one stretcher required... &bull; However, as an isolated photograph, Source A cannot convey...',
    },
    q2b: {
      sourceLetter: 'B',
      detailPrompt: 'Detail in Source B that I would follow up:',
      questionPrompt: 'Question I would ask:',
      sourceTypePrompt: 'Type of source I would look for:',
      helpPrompt: 'How this might help answer my question:',
    },
  },
  {
    lessonIndex: 24,
    lessonNum: 5,
    id: 'lesson_5_5',
    title: 'KT5.5: Surgical Breakthroughs: The Thomas Splint, Wound Debridement & Mobile X-Rays',
    specAnchor:
      'Medical advances on the Western Front: the Thomas Splint (Hugh Owen Thomas, Robert Jones) reducing compound femur mortality; wound debridement and delayed primary closure; the Carrel-Dakin antiseptic irrigation method; mobile X-ray units and radiology.',
    q2a: {
      sourceLetter: 'A',
      stem: 'Study Source A on page 12. How useful is Source A for an enquiry into treatments for wounded soldiers with fractured bones on the Western Front? [4 marks]',
      provenanceClue:
        'Consider the nature of an instructional training photograph produced for the RAMC archive c.1916. What does it demonstrate about mechanical traction, and why might a staged instructional image differ from emergency frontline practice?',
      stems:
        'Source A is useful for investigating fracture treatments because it illustrates... &bull; The mechanical traction applied by the splint prevented... &bull; However, being an instructional training photo in a clean ward, it does not reflect...',
    },
    q2b: {
      sourceLetter: 'B',
      detailPrompt: 'Detail in Source B that I would follow up:',
      questionPrompt: 'Question I would ask:',
      sourceTypePrompt: 'Type of source I would look for:',
      helpPrompt: 'How this might help answer my question:',
    },
  },
  {
    lessonIndex: 25,
    lessonNum: 6,
    id: 'lesson_5_6',
    title: 'KT5.6: Lifesaving Innovations: Blood Storage, Brain Surgery & Plastic Reconstruction',
    specAnchor:
      'Medical advances on the Western Front: blood transfusions and storage (Landsteiner, Hustin, Rous and Turner, Captain Oswald Robertson and the Cambrai blood bank); specialized neurosurgery (Harvey Cushing); plastic and facial reconstruction (Harold Gillies, Queen’s Hospital Sidcup, tubed pedicle).',
    q2a: {
      sourceLetter: 'A',
      stem: 'Study Source A on page 14. How useful is Source A for an enquiry into advances in blood transfusion on the Western Front? [4 marks]',
      provenanceClue:
        'Consider the nature of an authentic surviving medical apparatus preserved in the RAMC Museum collection. What physical technology of blood storage in 1917 does it prove, and what clinical administration details does an artifact omit?',
      stems:
        'Source A is useful for investigating blood transfusion advances because it proves... &bull; Robertson’s use of sodium citrate and ice allowed blood to be... &bull; However, as a museum artifact, it does not provide clinical data on...',
    },
    q2b: {
      sourceLetter: 'B',
      detailPrompt: 'Detail in Source B that I would follow up:',
      questionPrompt: 'Question I would ask:',
      sourceTypePrompt: 'Type of source I would look for:',
      helpPrompt: 'How this might help answer my question:',
    },
  },
];

function buildWesternFrontTwoPageWorkbook(unitData, period) {
  const lessons = unitData.lessons;

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Topic 5: The British Sector of the Western Front Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 8mm 9mm 10mm 9mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.2pt;
      line-height: 1.28;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page, .page-container {
      width: 100%;
      height: 279mm;
      max-height: 279mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3mm 4mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .task-section {
      margin-bottom: 3px;
    }
    .task-line {
      border-bottom: 1.3px solid #000000;
      height: 6.8mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.1px dotted #000000;
      height: 6.0mm;
      width: 100%;
      box-sizing: border-box;
    }
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.5px solid #a0a0a0;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      line-height: 1.15;
      color: #444444;
    }
    .footer-quip {
      font-style: italic;
      color: #444444;
    }
    .footer-page-num {
      font-weight: 700;
      color: #000000;
    }
    .archival-box {
      border: 1.2px solid #000000;
      padding: 4px 6px;
      background: #ffffff;
      margin-bottom: 3px;
    }
    .archival-shelfmark {
      font-family: 'Inter', monospace;
      font-size: 6.2pt;
      font-weight: 700;
      border: 1px solid #000000;
      padding: 1px 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    /* Commercial School Brand Customizer */
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target::after {
      content: attr(data-department-name);
      font-size: 11pt !important;
      letter-spacing: 2px;
    }
  </style>
</head>
<body>
`;

  // ============================================================================
  // PAGE 1: COVER (Neutral Branding Standard)
  // ============================================================================
  const qrUrl =
    'https://history-revision-hub.netlify.app/?view=lessons&unit=edexcel_medicine&lesson=lesson_5_1';
  const qrSvg = generateQrSvg(qrUrl);

  html += `
  <div class="page" id="page-1">
    <div style="border: 2.5px solid #000000; padding: 7mm 8mm; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
      
      <!-- Top Brand Customizer Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 4px; text-align: center;" data-department-name="The History Department">
        <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 9.5pt; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase;">The History Department</span>
        <div style="font-family: 'Inter', sans-serif; font-size: 7pt; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 2px;">GCSE History (9–1) &bull; Paper 1: Thematic Study & Historic Environment</div>
      </div>

      <!-- Main Titles -->
      <div style="text-align: center; margin-top: 8px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; border: 1.2px solid #000000; display: inline-block; padding: 2px 10px; margin-bottom: 8px;">
          SECTION A: HISTORIC ENVIRONMENT &bull; 1914–1918
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; font-weight: 900; margin: 4px 0 2px 0; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.1;">
          The British Sector of the<br>Western Front, 1914–1918
        </h1>
        <div style="font-family: 'Playfair Display', serif; font-size: 11pt; font-style: italic; margin-bottom: 6px;">
          Injuries, Treatment and the Trenches &bull; 16-Page Master Study & Exam Workbook
        </div>
        <div style="width: 50mm; height: 1.5px; background: #000000; margin: 4px auto;"></div>
      </div>

      <!-- Hero Archival Image -->
      <div style="text-align: center; margin: 4px 0;">
        <img src="/units/edexcel_medicine/assets/authentic_western_front.jpg" alt="Western Front Stretcher Bearers in Mud" style="max-height: 82mm; max-width: 95%; object-fit: cover; border: 1.5px solid #000000; filter: grayscale(100%);">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; margin-top: 2px; color: #333333;">
          RAMC stretcher bearers carrying a severely wounded soldier through liquefied Flanders clay at Passchendaele, 1917 (Imperial War Museum Q 2757).
        </div>
      </div>

      <!-- Core Specification Grid -->
      <div style="border: 1.2px solid #000000; padding: 5px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.35; background: #ffffff;">
        <div style="font-weight: 800; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          Edexcel Paper 1 Section A Specification Modules (100% Exam Mastery)
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 10px;">
          <div>&bull; <strong>KT5.1:</strong> Trench System, Geography & Battles (Ypres, Somme, Arras, Cambrai)</div>
          <div>&bull; <strong>KT5.4:</strong> Chain of Evacuation (Bearers, RAP, ADS/MDS, CCS, Base Hospitals)</div>
          <div>&bull; <strong>KT5.2:</strong> Trench Environment (Trench Foot, Whale Oil, Lice, Fever, Dysentery)</div>
          <div>&bull; <strong>KT5.5:</strong> Surgical Breakthroughs (Thomas Splint, Debridement, Carrel-Dakin, X-Rays)</div>
          <div>&bull; <strong>KT5.3:</strong> Combat Trauma (High-Explosive Shrapnel, Gas Gangrene, Gas Helmets)</div>
          <div>&bull; <strong>KT5.6:</strong> Lifesaving Advances (Robertson Blood Depot, Cushing, Gillies Plastic Surgery)</div>
        </div>
      </div>

      <!-- Student Identification & Digital Portal Sync -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1.5px solid #000000; padding-top: 6px;">
        <div style="flex: 1; font-family: 'Inter', sans-serif; font-size: 7.8pt;">
          <div style="margin-bottom: 5px;"><strong>Candidate Name:</strong> <span style="display: inline-block; width: 55mm; border-bottom: 1.2px solid #000000;"></span></div>
          <div style="margin-bottom: 5px;"><strong>Target Grade:</strong> <span style="display: inline-block; width: 22mm; border-bottom: 1.2px solid #000000;"></span> &nbsp;&nbsp; <strong>Teacher / Class:</strong> <span style="display: inline-block; width: 35mm; border-bottom: 1.2px solid #000000;"></span></div>
          <div style="font-size: 6.8pt; color: #444444; margin-top: 3px;">
            Exam Rules: Section A accounts for 16 of the 52 marks on Paper 1 (Q1 Feature 4m + Q2a Utility 8m + Q2b Follow-up 4m).
          </div>
        </div>
        <div style="text-align: center; margin-left: 10px;">
          <div style="width: 18mm; height: 18mm; border: 1px solid #000000; padding: 1px; display: inline-block;">
            ${qrSvg}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 5.5pt; font-weight: 700; text-transform: uppercase; margin-top: 1px;">Scan for Audio & Interactive Models</div>
        </div>
      </div>

    </div>
    ${getFooterHtml(1)}
  </div>
  `;

  // ============================================================================
  // PAGES 2–3: LIVING SPREAD (Timeline Left + Evacuation Chain Right)
  // ============================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE (Dual-Coding Sketch/Write Missions) -->
  <div class="page" id="page-2">
    <div class="page-body-full">
      <div style="border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #000; padding: 1px 4px;">PAGES 2–3 SPREAD &bull; LEFT</span>
          <h2 style="font-size: 11.5pt; font-weight: 900; margin: 1px 0 0 0; text-transform: uppercase;">Western Front Living Timeline: 1914–1918</h2>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; text-align: right; color: #333;">Dual-Coding Synthesis: Complete all 6 chronological visual/textual missions</div>
      </div>

      <!-- 6 Timeline Milestones with Sketch/Write Box (Zero Clunky Outer Border, Pure Typography) -->
      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
        
        <!-- Milestone 1: 1914 -->
        <div style="border-left: 2px solid #000000; padding-left: 6px; margin-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800;">
            <span>1. OCT–NOV 1914: THE FIRST BATTLE OF YPRES & STATIC TRENCH WARFARE</span>
            <span style="border: 1px solid #000; padding: 0 3px;">KT5.1</span>
          </div>
          <div style="font-size: 6.8pt; line-height: 1.25; margin: 1px 0;">
            The mobile war ends; armies dig in from the Channel to Switzerland. British defend the low-lying Ypres Salient against German ridges.
          </div>
          <div style="display: flex; gap: 6px; margin-top: 1px;">
            <div style="flex: 1; border: 1px dashed #666; height: 16mm; padding: 2px; position: relative;">
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #555;">[SKETCH: Ypres Salient Bulge + Traverses]</span>
            </div>
            <div style="flex: 1.4; font-size: 6.6pt; line-height: 1.2;">
              <strong>Exam Synthesis:</strong> Why were frontline trenches dug in zig-zag traverses rather than straight lines?<br>
              <div class="task-line" style="height: 5.8mm;"></div>
              <div class="task-line" style="height: 5.8mm;"></div>
            </div>
          </div>
        </div>

        <!-- Milestone 2: 1915 -->
        <div style="border-left: 2px solid #000000; padding-left: 6px; margin-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800;">
            <span>2. 1915: CHLORINE GAS (2ND YPRES) & THE BRODIE STEEL HELMET</span>
            <span style="border: 1px solid #000; padding: 0 3px;">KT5.2 &bull; KT5.3</span>
          </div>
          <div style="font-size: 6.8pt; line-height: 1.25; margin: 1px 0;">
            First gas attack at 2nd Ypres (April 1915); troops improvise urine pads then PH helmets. John Brodie patents the pressed-steel helmet.
          </div>
          <div style="display: flex; gap: 6px; margin-top: 1px;">
            <div style="flex: 1; border: 1px dashed #666; height: 16mm; padding: 2px; position: relative;">
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #555;">[SKETCH: Brodie Helmet vs Shrapnel]</span>
            </div>
            <div style="flex: 1.4; font-size: 6.6pt; line-height: 1.2;">
              <strong>Exam Synthesis:</strong> How did the Brodie helmet slash fatal head wounds by an estimated 80%?<br>
              <div class="task-line" style="height: 5.8mm;"></div>
              <div class="task-line" style="height: 5.8mm;"></div>
            </div>
          </div>
        </div>

        <!-- Milestone 3: DEC 1915 -->
        <div style="border-left: 2px solid #000000; padding-left: 6px; margin-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800;">
            <span>3. DEC 1915: ROBERT JONES INTRODUCES THE THOMAS SPLINT</span>
            <span style="border: 1px solid #000; padding: 0 3px;">KT5.5</span>
          </div>
          <div style="font-size: 6.8pt; line-height: 1.25; margin: 1px 0;">
            Robert Jones deploys Hugh Owen Thomas’s splint to frontline aid posts, applying mechanical traction to broken femurs.
          </div>
          <div style="display: flex; gap: 6px; margin-top: 1px;">
            <div style="flex: 1; border: 1px dashed #666; height: 16mm; padding: 2px; position: relative;">
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #555;">[SKETCH: Thomas Splint Groin Ring & Traction]</span>
            </div>
            <div style="flex: 1.4; font-size: 6.6pt; line-height: 1.2;">
              <strong>Exam Synthesis:</strong> Why did continuous traction reduce compound fracture mortality from 80% to 20%?<br>
              <div class="task-line" style="height: 5.8mm;"></div>
              <div class="task-line" style="height: 5.8mm;"></div>
            </div>
          </div>
        </div>

        <!-- Milestone 4: 1916 -->
        <div style="border-left: 2px solid #000000; padding-left: 6px; margin-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800;">
            <span>4. JULY 1916: THE BATTLE OF THE SOMME & WOUND DEBRIDEMENT</span>
            <span style="border: 1px solid #000; padding: 0 3px;">KT5.1 &bull; KT5.5</span>
          </div>
          <div style="font-size: 6.8pt; line-height: 1.25; margin: 1px 0;">
            57,470 casualties on Day 1; CCSs overwhelmed. Surgeons master wound excision (debridement) and Carrel-Dakin bleach irrigation.
          </div>
          <div style="display: flex; gap: 6px; margin-top: 1px;">
            <div style="flex: 1; border: 1px dashed #666; height: 16mm; padding: 2px; position: relative;">
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #555;">[SKETCH: Carrel-Dakin Perforated Irrigation Tubes]</span>
            </div>
            <div style="flex: 1.4; font-size: 6.6pt; line-height: 1.2;">
              <strong>Exam Synthesis:</strong> Why did Carrel-Dakin solution have to be freshly made in labs every 6 hours?<br>
              <div class="task-line" style="height: 5.8mm;"></div>
              <div class="task-line" style="height: 5.8mm;"></div>
            </div>
          </div>
        </div>

        <!-- Milestone 5: 1917 -->
        <div style="border-left: 2px solid #000000; padding-left: 6px; margin-bottom: 2px;">
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800;">
            <span>5. 1917: ARRAS CHALK HOSPITAL & PASSCHENDAELE MUD CRISIS</span>
            <span style="border: 1px solid #000; padding: 0 3px;">KT5.1 &bull; KT5.4</span>
          </div>
          <div style="font-size: 6.8pt; line-height: 1.25; margin: 1px 0;">
            Thompson’s Cave under Arras shelters 700 hospital beds with electric lights; 3rd Ypres mud requires 6 bearers per stretcher.
          </div>
          <div style="display: flex; gap: 6px; margin-top: 1px;">
            <div style="flex: 1; border: 1px dashed #666; height: 16mm; padding: 2px; position: relative;">
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #555;">[SKETCH: Thompson's Cave Subterranean Hospital]</span>
            </div>
            <div style="flex: 1.4; font-size: 6.6pt; line-height: 1.2;">
              <strong>Exam Synthesis:</strong> How did the chalk geology of Arras contrast with the clay water table of Ypres?<br>
              <div class="task-line" style="height: 5.8mm;"></div>
              <div class="task-line" style="height: 5.8mm;"></div>
            </div>
          </div>
        </div>

        <!-- Milestone 6: NOV 1917 -->
        <div style="border-left: 2px solid #000000; padding-left: 6px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800;">
            <span>6. NOV 1917: OSWALD ROBERTSON’S BLOOD BANK & SIDCUR PLASTIC SURGERY</span>
            <span style="border: 1px solid #000; padding: 0 3px;">KT5.6</span>
          </div>
          <div style="font-size: 6.8pt; line-height: 1.25; margin: 1px 0;">
            Robertson uses citrate-glucose blood stored on ice at Cambrai; Gillies pioneers tubed pedicles at Queen's Hospital Sidcup.
          </div>
          <div style="display: flex; gap: 6px; margin-top: 1px;">
            <div style="flex: 1; border: 1px dashed #666; height: 16mm; padding: 2px; position: relative;">
              <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #555;">[SKETCH: Robertson Ice Chest / Gillies Tubed Pedicle]</span>
            </div>
            <div style="flex: 1.4; font-size: 6.6pt; line-height: 1.2;">
              <strong>Exam Synthesis:</strong> Why was citrate-glucose essential for keeping stored blood viable for up to 28 days?<br>
              <div class="task-line" style="height: 5.8mm;"></div>
              <div class="task-line" style="height: 5.8mm;"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    ${getFooterHtml(2)}
  </div>

  <!-- PAGE 3: THE EVACUATION CHAIN (Flowchart, Triage System & Private Henderson Case Study) -->
  <div class="page" id="page-3">
    <div class="page-body-full">
      <div style="border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #000; padding: 1px 4px;">PAGES 2–3 SPREAD &bull; RIGHT</span>
          <h2 style="font-size: 11.5pt; font-weight: 900; margin: 1px 0 0 0; text-transform: uppercase;">The Western Front Evacuation Chain</h2>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; text-align: right; color: #333;">RAMC & FANY Lifeline: From No Man’s Land to Base Hospital</div>
      </div>

      <!-- Flowchart Steps Grid -->
      <div style="border: 1.5px solid #000000; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 3px; text-align: center;">
          The 6 Sequential Stations of the Evacuation Chain
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
          
          <div style="border: 1px solid #000; padding: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">1. STRETCHER BEARERS</div>
            <div style="font-size: 6.2pt; color: #333;">Frontline & No Man’s Land</div>
            <div style="font-size: 6.4pt; margin-top: 2px;">
              &bull; 16 men per battalion of 1,000.<br>
              &bull; 4 to 6 bearers per stretcher in mud.<br>
              &bull; Apply first field dressing under fire.
            </div>
          </div>

          <div style="border: 1px solid #000; padding: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">2. REGIMENTAL AID POST (RAP)</div>
            <div style="font-size: 6.2pt; color: #333;">200–300 yards behind front line</div>
            <div style="font-size: 6.4pt; margin-top: 2px;">
              &bull; Located in communication trench/cellar.<br>
              &bull; RMO gives morphine & tetanus serum.<br>
              &bull; <em>Cannot perform major surgery.</em>
            </div>
          </div>

          <div style="border: 1px solid #000; padding: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">3. DRESSING STATIONS (ADS/MDS)</div>
            <div style="font-size: 6.2pt; color: #333;">1 to 3 miles behind front line</div>
            <div style="font-size: 6.4pt; margin-top: 2px;">
              &bull; Run by RAMC Field Ambulance.<br>
              &bull; Treat shock with sweet tea & blankets.<br>
              &bull; Sorts casualties for motor ambulance.
            </div>
          </div>

          <div style="border: 1px solid #000; padding: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">4. CASUALTY CLEARING STATION</div>
            <div style="font-size: 6.2pt; color: #333;">7 to 12 miles back (rail/canal)</div>
            <div style="font-size: 6.4pt; margin-top: 2px;">
              &bull; <strong>Surgical core:</strong> operating theatres & X-rays.<br>
              &bull; Female nurses (QAIMNS).<br>
              &bull; <strong>Triage:</strong> Walking, Immediate, Moribund.
            </div>
          </div>

          <div style="border: 1px solid #000; padding: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">5. BASE HOSPITALS</div>
            <div style="font-size: 6.2pt; color: #333;">Coastal ports (Boulogne/Calais)</div>
            <div style="font-size: 6.4pt; margin-top: 2px;">
              &bull; Large general/stationary hospitals.<br>
              &bull; Extended recovery & specialized care.<br>
              &bull; Linked by hospital trains & canal barges.
            </div>
          </div>

          <div style="border: 1px solid #000; padding: 3px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">6. "BLIGHTY" (BRITAIN)</div>
            <div style="font-size: 6.2pt; color: #333;">Hospital ships across Channel</div>
            <div style="font-size: 6.4pt; margin-top: 2px;">
              &bull; Queen’s Hospital Sidcup (Plastic surgery).<br>
              &bull; Roehampton (Amputee limb fitting).<br>
              &bull; Netley Hospital (Military psychiatry).
            </div>
          </div>

        </div>
      </div>

      <!-- Triage Classification Table & Transport Systems -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 3px;">
        
        <!-- Triage Tag System -->
        <div style="border: 1.2px solid #000; padding: 4px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
            RAMC TRIAGE CLASSIFICATION AT CCS
          </div>
          <div style="font-size: 6.4pt; line-height: 1.3;">
            <div style="margin-bottom: 2px;"><strong>&bull; WHITE TAG (Walking Wounded):</strong> Minor shrapnel cuts, superficial gas irritation. Cleaned, patched, and returned to the line within days.</div>
            <div style="margin-bottom: 2px;"><strong>&bull; RED TAG (Immediate Surgery):</strong> Compound fractures, abdominal hemorrhages, chest trauma with a viable chance of survival if operated on at once.</div>
            <div><strong>&bull; GREEN/NO TAG (The Moribund):</strong> Hopeless wounds (severe brain destruction, massive blood loss). Made comfortable with morphine until death.</div>
          </div>
        </div>

        <!-- Evacuation Transport Methods -->
        <div style="border: 1.2px solid #000; padding: 4px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
            TRANSPORT METHODS: HORSE, MOTOR & CANAL
          </div>
          <div style="font-size: 6.4pt; line-height: 1.3;">
            <div style="margin-bottom: 2px;"><strong>&bull; Horse Ambulances (1914):</strong> Slow, violent jolting over shell craters caused hemorrhagic shock and re-fractured bones.</div>
            <div style="margin-bottom: 2px;"><strong>&bull; Motor Ambulances & FANY (1915+):</strong> Faster transport; voluntary women drivers braved artillery to evacuate men from dressing stations.</div>
            <div><strong>&bull; RAMC Canal Barges:</strong> Smooth, vibration-free water transit along French canals, ideal for post-operative brain and abdominal trauma.</div>
          </div>
        </div>

      </div>

      <!-- Private Thomas Henderson Evacuation Case Study -->
      <div style="border: 1.5px solid #000000; padding: 4px 6px; background: #ffffff;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 3px; display: flex; justify-content: space-between;">
          <span>Forensic Patient Journey: Private Thomas Henderson (2nd Royal Scots)</span>
          <span style="font-weight: 400; font-style: italic;">Ypres Sector &bull; 14 September 1917</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px 8px; font-size: 6.4pt; line-height: 1.25;">
          <div><strong>08:15 Frontline:</strong> Struck by high-explosive shell shrapnel in trench. Shattered right femur (compound fracture); severe arterial bleed.</div>
          <div><strong>08:45 Stretcher Retrieval:</strong> 4 stretcher bearers carry him through flooded saps to the Regimental Aid Post dugout.</div>
          <div><strong>09:10 RAP First Aid:</strong> RMO fits Thomas Splint with windlass traction, injects 500 units anti-tetanus serum and 1/3 grain morphine.</div>
          <div><strong>11:30 ADS to CCS:</strong> Transported by FANY motor ambulance van 8 miles back to No. 46 Casualty Clearing Station.</div>
          <div><strong>13:00 CCS Triage:</strong> Classified Red Tag. Mobile X-ray locates 3 metal fragments. Surgeon debrides necrotic flesh; Carrel-Dakin tubes inserted.</div>
          <div><strong>Day 4 Base Hospital:</strong> Evacuated by heated RAMC canal barge to Boulogne; loaded on hospital ship for recovery in Blighty.</div>
        </div>
      </div>

    </div>
    ${getFooterHtml(3)}
  </div>
  `;

  // ============================================================================
  // PAGES 4–15: LESSONS 5.1 TO 5.6 (2 Pages per Lesson)
  // ============================================================================
  wfConfigs.forEach((cfg) => {
    const lesson = lessons[cfg.lessonIndex];
    const pageNumA = 4 + (cfg.lessonNum - 1) * 2;
    const pageNumB = pageNumA + 1;

    const sourceA = lesson.sources[0];
    const sourceB = lesson.sources[1];

    // PAGE A (Left Page): Spec + 5x Q1 Feature Drills + Vocab + Source A
    html += `
    <div class="page" id="page-${pageNumA}">
      <div class="page-body-full">
        
        <!-- Header -->
        <div style="border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #000; padding: 1px 4px;">KEY TOPIC 5 &bull; LESSON ${cfg.lessonNum} OF 6</span>
            <h2 style="font-size: 10.8pt; font-weight: 900; margin: 1px 0 0 0; text-transform: uppercase;">${lesson.title}</h2>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; text-align: right; color: #333;">Page A: Recall Drills & Primary Source A</div>
        </div>

        <!-- Spec Anchor -->
        <div style="border: 1px solid #000; padding: 2px 4px; font-family: 'Inter', sans-serif; font-size: 6.4pt; background: #ffffff; margin-bottom: 3px;">
          <strong>Specification Focus:</strong> ${cfg.specAnchor}
        </div>

        <!-- 5x Q1 "Describe One Feature" Retrieval Drills -->
        <div style="border: 1.2px solid #000000; padding: 3px 5px; background: #ffffff; margin-bottom: 3px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Edexcel Paper 1 Q1 Retrieval Drills: 5x "Describe One Feature of..." [2 marks each]</span>
            <span style="font-weight: 400; font-style: italic;">Mark Scheme: 1 mark feature + 1 mark detail</span>
          </div>
          
          ${lesson.do_now
            .map(
              (dn, idx) => `
          <div style="margin-bottom: 2px; font-size: 6.8pt; line-height: 1.2;">
            <div style="font-weight: 700; font-family: 'Inter', sans-serif;">${idx + 1}. ${dn.q}</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-top: 1px;">
              <div><strong>Feature:</strong> <span class="task-line" style="display: inline-block; width: 72%; height: 5mm; vertical-align: bottom;"></span></div>
              <div><strong>Detail:</strong> <span class="task-line" style="display: inline-block; width: 75%; height: 5mm; vertical-align: bottom;"></span></div>
            </div>
          </div>
          `,
            )
            .join('')}
        </div>

        <!-- Key Vocabulary Terms -->
        <div style="border: 1.2px solid #000000; padding: 3px 5px; background: #ffffff; margin-bottom: 3px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
            Key Historical Vocabulary & Forensic Definitions
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 8px; font-size: 6.4pt; line-height: 1.25;">
            ${lesson.vocab
              .slice(0, 4)
              .map(
                (v) => `
              <div><strong>&bull; ${v.term}:</strong> ${v.definition}</div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Archival Primary Source A -->
        <div class="archival-box" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; text-transform: uppercase;">${sourceA.title}</span>
            <span class="archival-shelfmark">${sourceA.id.replace(/_/g, '-').toUpperCase()}</span>
          </div>
          <div style="display: flex; gap: 6px;">
            <div style="flex: 1; text-align: center;">
              <img src="${sourceA.src}" alt="${sourceA.title}" style="max-height: 38mm; max-width: 100%; object-fit: contain; border: 1px solid #000; filter: grayscale(100%);">
              <div style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-style: italic; margin-top: 1px; color: #444;">${sourceA.caption}</div>
            </div>
            <div style="flex: 1.4; font-size: 6.5pt; line-height: 1.25; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <strong>Provenance:</strong> ${sourceA.provenance}<br>
                <strong>Context:</strong> ${sourceA.source_context}
              </div>
              <div style="border-top: 1px dashed #666; padding-top: 2px; margin-top: 2px; background: #f9f9f9; padding: 2px 4px;">
                <strong style="color: #000;">Hinge Question:</strong> ${sourceA.hinge_question}
              </div>
            </div>
          </div>
        </div>

      </div>
      ${getFooterHtml(pageNumA)}
    </div>

    <!-- PAGE B (Right Page): Source B + Q2a Utility + Q2b Follow-up Table -->
    <div class="page" id="page-${pageNumB}">
      <div class="page-body-full">
        
        <!-- Header -->
        <div style="border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #000; padding: 1px 4px;">KEY TOPIC 5 &bull; LESSON ${cfg.lessonNum} OF 6</span>
            <h2 style="font-size: 10.8pt; font-weight: 900; margin: 1px 0 0 0; text-transform: uppercase;">Exam Mastery: Section A (Western Front)</h2>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; text-align: right; color: #333;">Page B: Primary Source B & Paired Exam Practice</div>
        </div>

        <!-- Archival Primary Source B -->
        <div class="archival-box" style="margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; text-transform: uppercase;">${sourceB.title}</span>
            <span class="archival-shelfmark">${sourceB.id.replace(/_/g, '-').toUpperCase()}</span>
          </div>
          <div style="display: flex; gap: 6px;">
            <div style="flex: 1; text-align: center;">
              <img src="${sourceB.src}" alt="${sourceB.title}" style="max-height: 38mm; max-width: 100%; object-fit: contain; border: 1px solid #000; filter: grayscale(100%);">
              <div style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-style: italic; margin-top: 1px; color: #444;">${sourceB.caption}</div>
            </div>
            <div style="flex: 1.4; font-size: 6.5pt; line-height: 1.25; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <strong>Provenance:</strong> ${sourceB.provenance}<br>
                <strong>Context:</strong> ${sourceB.source_context}
              </div>
              <div style="border-top: 1px dashed #666; padding-top: 2px; margin-top: 2px; background: #f9f9f9; padding: 2px 4px;">
                <strong style="color: #000;">Hinge Question:</strong> ${sourceB.hinge_question}
              </div>
            </div>
          </div>
        </div>

        <!-- Question 2(a) [4 marks] Single-Source Utility -->
        <div style="border: 1.2px solid #000000; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Question 2(a): Single-Source Utility Assessment [4 marks &bull; 5 mins]</span>
            <span style="font-weight: 400; font-style: italic;">Edexcel Paper 1 Tariff</span>
          </div>
          <div style="font-size: 6.8pt; font-weight: 700; margin-bottom: 2px; font-family: 'Inter', sans-serif;">
            ${cfg.q2a.stem}
          </div>
          <div style="font-size: 6.2pt; line-height: 1.2; background: #f3f4f6; border-left: 2px solid #000; padding: 2px 4px; margin-bottom: 2px;">
            <strong>Provenance Clue:</strong> ${cfg.q2a.provenanceClue}
          </div>
          <div style="font-size: 6.2pt; color: #333; margin-bottom: 2px;">
            <em>Sentence Stems: ${cfg.q2a.stems}</em>
          </div>
          <div class="task-line" style="height: 6.2mm;"></div>
          <div class="task-line" style="height: 6.2mm;"></div>
          <div class="task-line" style="height: 6.2mm;"></div>
          <div class="task-line" style="height: 6.2mm;"></div>
        </div>

        <!-- Question 2(b) [4 marks] 4-Row Follow-Up Enquiry Table -->
        <div style="border: 1.2px solid #000000; padding: 4px 6px; background: #ffffff; margin-bottom: 0;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Question 2(b): Edexcel Follow-Up Enquiry Table [4 marks &bull; 5 mins]</span>
            <span style="font-weight: 400; font-style: italic;">Target: Source ${cfg.q2b.sourceLetter}</span>
          </div>
          <div style="font-size: 6.8pt; margin-bottom: 2px; font-family: 'Inter', sans-serif;">
            How could you follow up <strong>Source ${cfg.q2b.sourceLetter}</strong> to find out more about treatments or conditions on the Western Front?
          </div>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 6.4pt; font-family: 'Inter', sans-serif; border: 1px solid #000;">
            <tr>
              <td style="width: 38%; border: 1px solid #000; padding: 2px 4px; font-weight: 700; background: #f3f4f6;">Detail in Source ${cfg.q2b.sourceLetter} that I would follow up:</td>
              <td style="width: 62%; border: 1px solid #000; padding: 2px 4px;"><div class="task-line" style="height: 5.5mm; border-bottom: 1px solid #000;"></div></td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 2px 4px; font-weight: 700; background: #f3f4f6;">Question I would ask:</td>
              <td style="border: 1px solid #000; padding: 2px 4px;"><div class="task-line" style="height: 5.5mm; border-bottom: 1px solid #000;"></div></td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 2px 4px; font-weight: 700; background: #f3f4f6;">Type of source I would look for:</td>
              <td style="border: 1px solid #000; padding: 2px 4px;"><div class="task-line" style="height: 5.5mm; border-bottom: 1px solid #000;"></div></td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 2px 4px; font-weight: 700; background: #f3f4f6;">How this might help answer my question:</td>
              <td style="border: 1px solid #000; padding: 2px 4px;"><div class="task-line" style="height: 5.5mm; border-bottom: 1px solid #000;"></div></td>
            </tr>
          </table>
        </div>

      </div>
      ${getFooterHtml(pageNumB)}
    </div>
    `;
  });

  // ============================================================================
  // PAGE 16: COMPLETE 16-MARK MOCK EXAM PAPER & WWW/EBI PROGRESS TRACKER
  // ============================================================================
  html += `
  <div class="page" id="page-16">
    <div class="page-body-full">
      
      <!-- Top Exam Paper Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #000; padding: 1px 4px;">EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1 SECTION A</span>
          <h2 style="font-size: 11.5pt; font-weight: 900; margin: 1px 0 0 0; text-transform: uppercase;">Western Front 16-Mark Mock Exam Paper</h2>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-align: right;">Total: 16 Marks &bull; Time: 25 Mins</div>
      </div>

      <!-- Question 1: Feature Questions (4 marks) -->
      <div style="border: 1.2px solid #000000; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px; display: flex; justify-content: space-between;">
          <span>Question 1: Feature Questions [4 marks &bull; 5 mins]</span>
          <span style="font-weight: 400; font-style: italic;">Mark Scheme: 1 mark feature + 1 mark detail</span>
        </div>
        
        <div style="font-size: 6.8pt; line-height: 1.25; margin-bottom: 2px;">
          <strong>1(a) Describe one feature of the system of communication trenches on the Western Front. [2 marks]</strong>
          <div style="margin-top: 1px;">
            Feature: <span class="task-line" style="display: inline-block; width: 88%; height: 5.2mm; vertical-align: bottom;"></span><br>
            Detail: &nbsp;<span class="task-line" style="display: inline-block; width: 89%; height: 5.2mm; vertical-align: bottom;"></span>
          </div>
        </div>

        <div style="font-size: 6.8pt; line-height: 1.25; border-top: 1px dashed #aaa; padding-top: 2px; margin-top: 2px;">
          <strong>1(b) Describe one feature of the treatment for gas gangrene used at Casualty Clearing Stations. [2 marks]</strong>
          <div style="margin-top: 1px;">
            Feature: <span class="task-line" style="display: inline-block; width: 88%; height: 5.2mm; vertical-align: bottom;"></span><br>
            Detail: &nbsp;<span class="task-line" style="display: inline-block; width: 89%; height: 5.2mm; vertical-align: bottom;"></span>
          </div>
        </div>
      </div>

      <!-- Question 2(a): Source Utility (8 marks) -->
      <div style="border: 1.2px solid #000000; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px; display: flex; justify-content: space-between;">
          <span>Question 2(a): Source Utility [8 marks &bull; 10 mins]</span>
          <span style="font-weight: 400; font-style: italic;">Sources A and B on pages 14–15</span>
        </div>
        <div style="font-size: 6.8pt; font-family: 'Inter', sans-serif; font-weight: 700; margin-bottom: 2px;">
          Study Sources A and B on pages 14–15. How useful are Sources A and B for an enquiry into advances in blood transfusion and surgery on the Western Front? Explain your answer, using Sources A and B and your knowledge of the historical context. [8 marks]
        </div>
        <div class="task-line" style="height: 5.8mm;"></div>
        <div class="task-line" style="height: 5.8mm;"></div>
        <div class="task-line" style="height: 5.8mm;"></div>
        <div class="task-line" style="height: 5.8mm;"></div>
      </div>

      <!-- Question 2(b): Follow-Up Enquiry Table (4 marks) -->
      <div style="border: 1.2px solid #000000; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px; display: flex; justify-content: space-between;">
          <span>Question 2(b): Follow-Up Enquiry Table [4 marks &bull; 5 mins]</span>
          <span style="font-weight: 400; font-style: italic;">Target: Source B on page 15</span>
        </div>
        <div style="font-size: 6.6pt; margin-bottom: 2px; font-family: 'Inter', sans-serif;">
          Study Source B on page 15. How could you follow up Source B to find out more about the use of mobile X-ray units to treat wounded soldiers on the Western Front?
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 6.2pt; font-family: 'Inter', sans-serif; border: 1px solid #000;">
          <tr>
            <td style="width: 40%; border: 1px solid #000; padding: 2px 4px; font-weight: 700; background: #f3f4f6;">Detail in Source B that I would follow up:</td>
            <td style="width: 60%; border: 1px solid #000; padding: 2px 4px;"><div class="task-line" style="height: 5.0mm; border-bottom: 1px solid #000;"></div></td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 2px 4px; font-weight: 700; background: #f3f4f6;">Question I would ask:</td>
            <td style="border: 1px solid #000; padding: 2px 4px;"><div class="task-line" style="height: 5.0mm; border-bottom: 1px solid #000;"></div></td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 2px 4px; font-weight: 700; background: #f3f4f6;">Type of source I would look for:</td>
            <td style="border: 1px solid #000; padding: 2px 4px;"><div class="task-line" style="height: 5.0mm; border-bottom: 1px solid #000;"></div></td>
          </tr>
          <tr>
            <td style="border: 1px solid #000; padding: 2px 4px; font-weight: 700; background: #f3f4f6;">How this might help answer my question:</td>
            <td style="border: 1px solid #000; padding: 2px 4px;"><div class="task-line" style="height: 5.0mm; border-bottom: 1px solid #000;"></div></td>
          </tr>
        </table>
      </div>

      <!-- Teacher Feedback & Student Progress Tracker -->
      <div style="border: 1.5px solid #000000; padding: 4px 6px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 3px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase;">Teacher Assessment & Progress Tracker</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700;">Score: _____ / 16 &nbsp;&bull;&nbsp; Grade: _____</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 6.4pt; font-family: 'Inter', sans-serif;">
          <div>
            <strong>What Went Well (WWW):</strong><br>
            <div class="task-line" style="height: 5.2mm;"></div>
            <div class="task-line" style="height: 5.2mm;"></div>
          </div>
          <div>
            <strong>Even Better If (EBI):</strong><br>
            <div class="task-line" style="height: 5.2mm;"></div>
            <div class="task-line" style="height: 5.2mm;"></div>
          </div>
        </div>
        <div style="border-top: 1px dotted #888; margin-top: 3px; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.0pt; display: flex; justify-content: space-between; color: #444;">
          <span><strong>Grade Boundaries:</strong> Grade 9: 15–16 | Grade 7: 12–14 | Grade 5: 9–11 | Grade 4: 7–8</span>
          <span>Target achieved: [ &nbsp; ] Yes &nbsp; [ &nbsp; ] Working Towards</span>
        </div>
      </div>

    </div>
    ${getFooterHtml(16)}
  </div>
  `;

  html += `
</body>
</html>
`;

  return html;
}

module.exports = {
  buildWesternFrontTwoPageWorkbook,
};
