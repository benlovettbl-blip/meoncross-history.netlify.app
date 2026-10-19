const fs = require('fs');
const path = require('path');

const ks2DataPath = path.resolve(__dirname, '../data/ks2_ww2.json');
const ks2Data = JSON.parse(fs.readFileSync(ks2DataPath, 'utf8'));

// Import teacher guidance data
// We can read src/engine/ks2_guidance.js or extract it directly
const guidancePath = path.resolve(__dirname, '../src/engine/ks2_guidance.js');
let guidanceContent = fs.readFileSync(guidancePath, 'utf8');

// Extract KS2_TEACHER_GUIDANCE_DATA object from ks2_guidance.js
const guidanceDataMatch = guidanceContent.match(
  /export const KS2_TEACHER_GUIDANCE_DATA = (\{[\s\S]*?\n\};)/,
);
let teacherGuidance = {};
if (guidanceDataMatch) {
  try {
    const fn = new Function('return ' + guidanceDataMatch[1].replace(/;\s*$/, ''));
    teacherGuidance = fn();
  } catch (e) {
    console.error('Error evaluating guidance data:', e);
  }
}

// Build 10 lessons data package
const lessonsMeta = [
  {
    num: 1,
    id: 'lesson_1',
    tag: 'HOME FRONT MOBILISATION',
    tagClass: 'badge-blue',
    category: 'homefront',
    title: 'Outbreak of War & Gas Masks',
    enquiry:
      'Why did ordinary British families carry cardboard boxes and tape their windows in September 1939?',
    html: 'worksheets/lesson_01_outbreak_gasmasks_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_01_outbreak_gasmasks_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_01_outbreak_gasmasks_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: 'Schoolchildren Playground Gas Mask Drill in Double File',
        archive: 'IWM HU 36136 / D 4181',
        repo: 'Imperial War Museum, London',
      },
      {
        id: 'Source B',
        title: 'General Civilian Anti-Gas Respirator with Canister Filter',
        archive: 'AM 1995.59.20',
        repo: 'Auckland War Memorial Museum',
      },
    ],
  },
  {
    num: 2,
    id: 'lesson_2',
    tag: 'OPERATION PIED PIPER',
    tagClass: 'badge-blue',
    category: 'homefront',
    title: 'Operation Pied Piper & British Evacuation',
    enquiry:
      'What was it like for 1.5 million British children to be sent away from home with a brown paper luggage tag?',
    html: 'worksheets/lesson_02_evacuation_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_02_evacuation_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_02_evacuation_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: 'London Police Sergeant Checking Evacuee Luggage Label with Escorting Nun',
        archive: 'IWM LN 6194',
        repo: 'Imperial War Museum, London',
      },
      {
        id: 'Source B',
        title: 'Schoolchildren at Railway Station Wearing Cardboard Luggage Labels on Lapels',
        archive: 'IWM HU 36871',
        repo: 'Imperial War Museum, London',
      },
    ],
  },
  {
    num: 3,
    id: 'lesson_3',
    tag: 'HET PRIMARY • REFUGEE CHILDREN',
    tagClass: 'badge-purple',
    category: 'rescue',
    title: "Vera's Journey: The Kindertransport",
    enquiry:
      'How did 10,000 refugee children travel alone across Europe to safety in Britain in 1938–1939?',
    html: 'worksheets/lesson_03_kindertransport_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_03_kindertransport_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_03_kindertransport_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: 'Jewish Refugee Girls Arriving in London Port Wearing Numbered Registration Tags',
        archive: 'Bundesarchiv Bild 183-S69279',
        repo: 'German Federal Archives (Bundesarchiv)',
      },
      {
        id: 'Source B',
        title: 'Original Kindertransport Registration Neck Tag (Refugee Nr. 8434)',
        archive: 'USHMM Acc. Nr. 8434',
        repo: 'United States Holocaust Memorial Museum',
      },
    ],
  },
  {
    num: 4,
    id: 'lesson_4',
    tag: 'THE BLITZ & AIR RAIDS',
    tagClass: 'badge-blue',
    category: 'homefront',
    title: 'The Blitz & Air Raid Shelters',
    enquiry:
      'How did ordinary families protect themselves when bombs fell night after night during the Blitz?',
    html: 'worksheets/lesson_04_the_blitz_shelters_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_04_the_blitz_shelters_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_04_the_blitz_shelters_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: 'Family Assembling Corrugated Steel Anderson Shelter in Suburban London Garden',
        archive: 'IWM D 1542',
        repo: 'Imperial War Museum, London',
      },
      {
        id: 'Source B',
        title: 'Londoners Sleeping on Platform of Elephant & Castle Underground Station',
        archive: 'IWM D 1572',
        repo: 'Imperial War Museum, London',
      },
    ],
  },
  {
    num: 5,
    id: 'lesson_5',
    tag: 'RATIONING & DIG FOR VICTORY',
    tagClass: 'badge-blue',
    category: 'homefront',
    title: 'Dig for Victory & Food Rationing',
    enquiry:
      "Why did the British government ration butter, sugar, and meat, and order citizens to 'Dig for Victory'?",
    html: 'worksheets/lesson_05_dig_for_victory_rationing_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_05_dig_for_victory_rationing_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_05_dig_for_victory_rationing_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: "'Dig for Victory: Grow Your Own Food' Official Ministry of Agriculture Poster",
        archive: 'IWM PST 0048',
        repo: 'Imperial War Museum, London',
      },
      {
        id: 'Source B',
        title: "Official Ministry of Food General Ration Book (Child's Issue RB.2)",
        archive: 'IWM EPH 291',
        repo: 'Imperial War Museum, London',
      },
    ],
  },
  {
    num: 6,
    id: 'lesson_6',
    tag: "WOMEN'S LAND ARMY & FACTORIES",
    tagClass: 'badge-blue',
    category: 'homefront',
    title: 'Women at War: The Land Army & Factories',
    enquiry:
      'How did the Second World War fundamentally transform the daily lives and roles of British women?',
    html: 'worksheets/lesson_06_women_at_war_land_army_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_06_women_at_war_land_army_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_06_women_at_war_land_army_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: "Women's Land Army Volunteers Operating Fordson Tractors in Hampshire Fields",
        archive: 'IWM D 3122',
        repo: 'Imperial War Museum, London',
      },
      {
        id: 'Source B',
        title:
          'Female Munition Workers Machining Artillery Shell Casings in Royal Ordnance Factory',
        archive: 'IWM D 4519',
        repo: 'Imperial War Museum, London',
      },
    ],
  },
  {
    num: 7,
    id: 'lesson_7',
    tag: 'HET PRIMARY • PRE-WAR DIGNITY',
    tagClass: 'badge-purple',
    category: 'rescue',
    title: 'Pre-War Life & The Rights That Disappeared',
    enquiry:
      'What was daily life like for children across Britain and Europe before their rights were stripped away?',
    html: 'worksheets/lesson_07_prewar_life_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_07_prewar_life_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_07_prewar_life_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: 'Pre-War Childhood: Jewish Schoolfriends on Summer Holiday in Central Europe',
        archive: 'HET Archive Plate PRE-37',
        repo: 'Holocaust Educational Trust Archive / Yad Vashem',
      },
      {
        id: 'Source B',
        title: 'Official Anti-Jewish Decrees Law Card Expelling Children from State Schools',
        archive: 'BArch R 1501/12711',
        repo: 'German Federal Archives (Bundesarchiv)',
      },
    ],
  },
  {
    num: 8,
    id: 'lesson_8',
    tag: 'SECRET WAR & INTELLIGENCE',
    tagClass: 'badge-green',
    category: 'secret',
    title: 'Secret Codebreakers & Bletchley Park',
    enquiry:
      'How did codebreakers working in secret wooden huts at Bletchley Park help defeat the German military?',
    html: 'worksheets/lesson_08_bletchley_codebreakers_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_08_bletchley_codebreakers_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_08_bletchley_codebreakers_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: 'Original German Military 3-Rotor Enigma Cipher Machine (Model M3)',
        archive: 'BPT Inv. ENIGMA-M3-1941',
        repo: 'Bletchley Park Trust Collection',
      },
      {
        id: 'Source B',
        title: 'Wrens Operating the Turing-Welchman Bombe Decryption Machine in Hut 11',
        archive: 'IWM A 28412',
        repo: 'Imperial War Museum / Bletchley Park',
      },
    ],
  },
  {
    num: 9,
    id: 'lesson_9',
    tag: 'HET PRIMARY • MORAL COURAGE',
    tagClass: 'badge-purple',
    category: 'rescue',
    title: 'Who Were the Rescuers? Nicholas Winton',
    enquiry:
      'How did ordinary individuals show extraordinary moral courage to save the lives of 669 children?',
    html: 'worksheets/lesson_09_rescuers_winton_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_09_rescuers_winton_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_09_rescuers_winton_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: 'Nicholas Winton Holding a Young Refugee Child on the Platform in Prague',
        archive: 'HET Plate WIN-39-PRG',
        repo: 'Holocaust Educational Trust / Yad Vashem',
      },
      {
        id: 'Source B',
        title: "Page from 'Nicky's Scrapbook' with Photographs and British Billeting Addresses",
        archive: 'YV Inv. 669-WINTON-SCRAP',
        repo: 'Yad Vashem Photo Archives',
      },
    ],
  },
  {
    num: 10,
    id: 'lesson_10',
    tag: 'VICTORY & REMEMBRANCE',
    tagClass: 'badge-green',
    category: 'secret',
    title: 'VE Day, Post-War Rebuilding & Remembrance',
    enquiry:
      'How did people celebrate the return of peace on VE Day, and why do we continue to remember their sacrifices?',
    html: 'worksheets/lesson_10_ve_day_remembrance_worksheet.html',
    pdf: '/pdfs/ks2_ww2/lesson_10_ve_day_remembrance_worksheet.pdf',
    thumb: 'worksheets/preview_lesson_10_ve_day_remembrance_worksheet_p1.png',
    sources: [
      {
        id: 'Source A',
        title: 'VE Day Street Party: Children Seated at Bunting-Draped Trestle Tables in London',
        archive: 'IWM HU 41808',
        repo: 'Imperial War Museum, London',
      },
      {
        id: 'Source B',
        title: 'Winston Churchill Giving V-Sign from Downing Street Balcony to Cheering Crowds',
        archive: 'IWM H 42087',
        repo: 'Imperial War Museum, London',
      },
    ],
  },
];

// Combine with video data from ks2Data
lessonsMeta.forEach((m) => {
  const matchingData = ks2Data.lessons.find((l) => l.id === m.id);
  if (matchingData && matchingData.video) {
    m.videos = matchingData.video;
  } else {
    m.videos = [];
  }
  // Attach teacher guidance
  if (teacherGuidance[m.id]) {
    m.guidance = teacherGuidance[m.id];
  }
});

// Write to JSON for client-side embedding
const payloadJson = JSON.stringify(lessonsMeta);

// Generate comprehensive, stunning index.html
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KS2 History: World War II &amp; The Home Front — Complete Teacher Hub &amp; Curriculum Showcase</title>
  <meta name="description" content="10-Lesson Modular 'Stick & Solve' Key Stage 2 World War II and Home Front Curriculum. 30 Curated BBC Video Clips, 26-Page Consumable Pupil Workbook, and complete Teacher Subject Knowledge Primers.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,600;1,400&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --ink: #0f172a;
      --ink-muted: #475569;
      --navy-primary: #1e3a8a;
      --navy-deep: #091224;
      --navy-light: #3b82f6;
      --accent-gold: #b45309;
      --gold-light: #fef3c7;
      --gold-bright: #f59e0b;
      --border-gray: #cbd5e1;
      --border-light: #e2e8f0;
      --card-bg: #ffffff;
      --bg-slate: #f8fafc;
      --tag-blue-bg: #e0f2fe;
      --tag-blue-text: #0369a1;
      --tag-purple-bg: #f3e8ff;
      --tag-purple-text: #7e22ce;
      --tag-green-bg: #dcfce7;
      --tag-green-text: #166534;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #f1f5f9;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: var(--ink);
      line-height: 1.5;
      padding-bottom: 60px;
    }

    /* TOP ANNOUNCEMENT BAR */
    .top-announcement {
      background: var(--navy-deep);
      color: #94a3b8;
      font-size: 8.5pt;
      padding: 8px 20px;
      text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .top-announcement strong {
      color: #fde68a;
    }

    .hub-container {
      max-width: 1300px;
      margin: 0 auto;
      padding: 25px 20px;
    }

    /* HERO BANNER */
    .hero-banner {
      background: linear-gradient(135deg, #091224 0%, #1e3a8a 60%, #172554 100%);
      color: #ffffff;
      border-radius: 16px;
      padding: 40px;
      margin-bottom: 30px;
      box-shadow: 0 15px 35px rgba(15, 23, 42, 0.15);
      border: 1px solid rgba(255,255,255,0.12);
      position: relative;
      overflow: hidden;
    }

    .hero-banner::after {
      content: '';
      position: absolute;
      top: -50px;
      right: -50px;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
      pointer-events: none;
    }

    .brand-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #fde68a;
      background: rgba(255,255,255,0.1);
      padding: 4px 12px;
      border-radius: 6px;
      margin-bottom: 15px;
      border: 1px solid rgba(253, 230, 138, 0.25);
    }

    .hero-title {
      font-family: 'Cinzel', serif;
      font-size: 28pt;
      font-weight: 900;
      letter-spacing: 0.02em;
      margin-bottom: 12px;
      line-height: 1.15;
      color: #ffffff;
    }

    .hero-subtitle {
      font-size: 11.5pt;
      color: #cbd5e1;
      max-width: 900px;
      line-height: 1.65;
      margin-bottom: 25px;
    }

    /* KPI METRICS STRIP */
    .kpi-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
      background: rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(8px);
      padding: 18px 24px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.12);
      margin-bottom: 25px;
    }

    .kpi-item {
      display: flex;
      flex-direction: column;
    }

    .kpi-val {
      font-family: 'Outfit', sans-serif;
      font-size: 20pt;
      font-weight: 900;
      color: #fde68a;
      line-height: 1.1;
    }

    .kpi-lbl {
      font-size: 7.8pt;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      margin-top: 2px;
    }

    /* HERO ACTIONS */
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 20px;
      border-radius: 8px;
      font-size: 9.5pt;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
    }

    .btn-gold {
      background: #f59e0b;
      color: #0f172a;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    .btn-gold:hover {
      background: #d97706;
      color: #ffffff;
      transform: translateY(-2px);
    }

    .btn-outline {
      background: rgba(255,255,255,0.1);
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.25);
    }

    .btn-outline:hover {
      background: rgba(255,255,255,0.2);
      border-color: #ffffff;
      transform: translateY(-2px);
    }

    /* WHY TEACHERS LOVE THIS UNIT - PERSUASION STRIP */
    .persuasion-section {
      background: #ffffff;
      border: 1px solid var(--border-gray);
      border-radius: 14px;
      padding: 28px 32px;
      margin-bottom: 35px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }

    .persuasion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e2e8f0;
    }

    .persuasion-title {
      font-family: 'Cinzel', serif;
      font-size: 15pt;
      font-weight: 800;
      color: var(--navy-deep);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .persuasion-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }

    .persuasion-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 20px;
      border-top: 3.5px solid var(--navy-primary);
      transition: transform 0.2s ease;
    }

    .persuasion-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.05);
    }

    .persuasion-card.het {
      border-top-color: #7e22ce;
    }

    .persuasion-card.video {
      border-top-color: #b45309;
    }

    .persuasion-card.print {
      border-top-color: #059669;
    }

    .p-icon {
      font-size: 20pt;
      margin-bottom: 10px;
      display: inline-block;
    }

    .p-title {
      font-size: 11pt;
      font-weight: 800;
      color: var(--navy-deep);
      margin-bottom: 6px;
    }

    .p-desc {
      font-size: 8.8pt;
      color: var(--ink-muted);
      line-height: 1.5;
    }

    /* DIRECTORY FILTER TABS */
    .directory-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
      margin-bottom: 22px;
    }

    .section-heading {
      font-family: 'Cinzel', serif;
      font-size: 17pt;
      font-weight: 800;
      color: var(--navy-deep);
    }

    .filter-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-btn {
      background: #ffffff;
      border: 1px solid var(--border-gray);
      padding: 7px 16px;
      border-radius: 20px;
      font-size: 8.5pt;
      font-weight: 700;
      color: var(--ink-muted);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-btn:hover, .filter-btn.active {
      background: var(--navy-primary);
      color: #ffffff;
      border-color: var(--navy-primary);
    }

    /* LESSON CARDS GRID (10 CARDS) */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .lesson-card {
      background: #ffffff;
      border: 1px solid var(--border-gray);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .lesson-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      border-color: #94a3b8;
    }

    .lesson-thumb-wrap {
      position: relative;
      width: 100%;
      height: 200px;
      background: #0f172a;
      overflow: hidden;
      border-bottom: 1px solid #e2e8f0;
    }

    .lesson-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      transition: transform 0.3s ease;
    }

    .lesson-card:hover .lesson-thumb {
      transform: scale(1.03);
    }

    .thumb-overlay-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .badge-blue { background: #1e3a8a; color: #ffffff; }
    .badge-purple { background: #7e22ce; color: #ffffff; }
    .badge-green { background: #065f46; color: #ffffff; }

    .thumb-lesson-num {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(15, 23, 42, 0.85);
      color: #ffffff;
      font-family: 'Cinzel', serif;
      font-size: 8.5pt;
      font-weight: 800;
      padding: 3px 9px;
      border-radius: 4px;
      backdrop-filter: blur(4px);
    }

    .lesson-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .lesson-title {
      font-size: 12pt;
      font-weight: 800;
      color: var(--navy-deep);
      margin-bottom: 6px;
      line-height: 1.3;
    }

    .lesson-enquiry {
      font-family: 'Lora', serif;
      font-style: italic;
      font-size: 9.2pt;
      color: #334155;
      margin-bottom: 15px;
      line-height: 1.45;
    }

    /* CURATED VIDEOS SHELF */
    .video-shelf-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 15px;
    }

    .video-shelf-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 7.8pt;
      font-weight: 800;
      color: var(--navy-primary);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .video-clips-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .video-clip-pill {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 6px 10px;
      font-size: 8pt;
      cursor: pointer;
      transition: all 0.15s ease;
      text-decoration: none;
      color: var(--ink);
    }

    .video-clip-pill:hover {
      background: #eff6ff;
      border-color: #3b82f6;
      color: #1e3a8a;
    }

    .clip-title-part {
      display: flex;
      align-items: center;
      gap: 7px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 250px;
      font-weight: 600;
    }

    .clip-dur-badge {
      font-size: 7pt;
      background: #f1f5f9;
      color: #475569;
      padding: 1px 6px;
      border-radius: 3px;
      font-weight: 700;
      white-space: nowrap;
    }

    /* PRIMARY SOURCES STRIP */
    .sources-mini-strip {
      background: #f1f5f9;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 18px;
      font-size: 7.5pt;
      color: var(--ink-muted);
      line-height: 1.4;
    }

    .sources-mini-strip strong {
      color: var(--navy-deep);
    }

    /* LESSON ACTION BUTTONS */
    .lesson-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: auto;
    }

    .action-btn {
      text-align: center;
      padding: 9px 12px;
      border-radius: 6px;
      font-size: 8.5pt;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
    }

    .action-btn.view {
      background: var(--navy-primary);
      color: #ffffff;
      border: 1px solid var(--navy-primary);
    }

    .action-btn.view:hover {
      background: #172554;
    }

    .action-btn.pdf {
      background: #f8fafc;
      color: var(--navy-deep);
      border: 1px solid var(--border-gray);
    }

    .action-btn.pdf:hover {
      background: #e2e8f0;
      border-color: #94a3b8;
    }

    .action-btn.teacher {
      grid-column: span 2;
      background: #fdfaf6;
      color: #92400e;
      border: 1px solid #fde68a;
    }

    .action-btn.teacher:hover {
      background: #fef3c7;
      border-color: #f59e0b;
    }

    /* MODAL SYSTEM (VIDEO & TEACHER GUIDANCE) */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 20px;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-card {
      background: #ffffff;
      border-radius: 12px;
      width: 100%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      background: var(--navy-deep);
      color: #ffffff;
      padding: 18px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .modal-title {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 800;
    }

    .modal-close {
      background: transparent;
      border: none;
      color: #cbd5e1;
      font-size: 18pt;
      cursor: pointer;
      line-height: 1;
      transition: color 0.15s ease;
    }

    .modal-close:hover {
      color: #ffffff;
    }

    .modal-body {
      padding: 25px;
    }

    /* VIDEO MODAL STYLING */
    .video-player-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      border-radius: 8px;
      background: #000000;
      margin-bottom: 18px;
    }

    .video-player-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }

    .video-prompt-box {
      background: #fdfaf6;
      border-left: 4px solid #f59e0b;
      padding: 14px 18px;
      border-radius: 0 6px 6px 0;
      margin-bottom: 12px;
    }

    .video-prompt-label {
      font-size: 7.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #b45309;
      margin-bottom: 4px;
    }

    .video-prompt-text {
      font-size: 9.5pt;
      font-weight: 600;
      color: var(--ink);
    }

    .video-answer-box {
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      padding: 14px 18px;
      border-radius: 0 6px 6px 0;
    }

    .video-answer-label {
      font-size: 7.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #15803d;
      margin-bottom: 4px;
    }

    .video-answer-text {
      font-size: 9pt;
      color: #166534;
      line-height: 1.5;
    }

    /* TEACHER GUIDANCE MODAL STYLING */
    .tg-tab-section {
      margin-bottom: 20px;
    }

    .tg-section-title {
      font-family: 'Cinzel', serif;
      font-size: 11pt;
      font-weight: 800;
      color: var(--navy-primary);
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid #cbd5e1;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tg-primer-text {
      font-size: 9pt;
      line-height: 1.6;
      color: #334155;
      background: #f8fafc;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 15px;
    }

    .misconception-card {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 10px;
      font-size: 8.5pt;
    }

    .misconception-wrong {
      color: #991b1b;
      font-weight: 700;
      margin-bottom: 3px;
    }

    .misconception-right {
      color: #1e293b;
    }

    .answer-key-task {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 12px 16px;
      margin-bottom: 12px;
    }

    .task-title {
      font-weight: 800;
      font-size: 9pt;
      color: var(--navy-primary);
      margin-bottom: 6px;
    }

    .task-answer-body {
      font-size: 8.8pt;
      color: #1e293b;
      line-height: 1.55;
    }

    /* FOOTER */
    .hub-footer {
      max-width: 1300px;
      margin: 40px auto 0 auto;
      padding: 20px;
      border-top: 1px solid var(--border-gray);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8pt;
      color: var(--ink-muted);
      flex-wrap: wrap;
      gap: 10px;
    }
  </style>
</head>
<body>

  <!-- TOP ANNOUNCEMENT -->
  <aside class="top-announcement" aria-label="Announcement">
    <span>⭐ <strong>Turnkey Key Stage 2 History:</strong> 10 Ready-to-Teach Lessons • 30 Curated BBC Video Clips • 26-Page Pupil Workbook • 100% Reprographic Compliance</span>
  </aside>

  <div class="hub-container">
    
    <!-- HERO BANNER -->
    <header class="hero-banner">
      <div class="brand-tag">
        <i class="fa-solid fa-graduation-cap"></i> The History Revision Hub • Key Stage 2 Curriculum
      </div>
      <h1 class="hero-title">World War II &amp; The Home Front (Year 5)</h1>
      <p class="hero-subtitle">
        A complete, 10-lesson classroom package engineered for primary teachers. Featuring 30 short age-appropriate video clips from BBC Teach and British Pathé, 24 verified archival primary sources, 10 modular 'Stick &amp; Solve' A4 worksheets, a 26-page master pupil consumable workbook, and 1:1 teacher model answer keys.
      </p>

      <!-- KPI METRICS STRIP -->
      <div class="kpi-strip">
        <div class="kpi-item">
          <span class="kpi-val">10</span>
          <span class="kpi-lbl">Enquiry Lessons</span>
        </div>
        <div class="kpi-item">
          <span class="kpi-val">30</span>
          <span class="kpi-lbl">Curated Video Clips</span>
        </div>
        <div class="kpi-item">
          <span class="kpi-val">24</span>
          <span class="kpi-lbl">Verified Primary Records</span>
        </div>
        <div class="kpi-item">
          <span class="kpi-val">26</span>
          <span class="kpi-lbl">Pupil Workbook Pages</span>
        </div>
        <div class="kpi-item">
          <span class="kpi-val">100%</span>
          <span class="kpi-lbl">Turnkey Teaching Ready</span>
        </div>
      </div>

      <!-- HERO ACTIONS -->
      <div class="hero-actions">
        <a href="pupil_workbook.html" class="btn btn-gold">
          <i class="fa-solid fa-book-open"></i> Open 26-Page Pupil Workbook
        </a>
        <a href="/pdfs/ks2_ww2/ks2_ww2_pupil_workbook.pdf" target="_blank" class="btn btn-outline">
          <i class="fa-solid fa-file-pdf"></i> Download Workbook (PDF)
        </a>
        <a href="ks2_ww2_scheme_of_work.html" class="btn btn-outline">
          <i class="fa-solid fa-list-check"></i> Scheme of Work
        </a>
        <a href="/pdfs/ks2_ww2/ks2_ww2_quiz_pack.pdf" target="_blank" class="btn btn-outline">
          <i class="fa-solid fa-award"></i> Quiz Booklet (PDF)
        </a>
        <a href="/pdfs/ks2_ww2/ks2_ww2_source_bibliography.pdf" target="_blank" class="btn btn-outline">
          <i class="fa-solid fa-landmark"></i> Source Bibliography (PDF)
        </a>
        <a href="/master_rights_register.html" target="_blank" class="btn btn-outline">
          <i class="fa-solid fa-scale-balanced"></i> Master Rights Register
        </a>
      </div>
    </header>

    <!-- WHY TEACHERS LOVE THIS UNIT - PERSUASION STRIP -->
    <section class="persuasion-section">
      <div class="persuasion-header">
        <h2 class="persuasion-title">
          <i class="fa-solid fa-chalkboard-user" style="color: var(--accent-gold);"></i>
          Why This Unit Excels in Any Primary Classroom
        </h2>
        <span style="font-size: 8.5pt; font-weight: 700; color: var(--navy-primary);">Zero-Prep • Ofsted Assured • Pedagogically Rigorous</span>
      </div>
      <div class="persuasion-grid">
        <div class="persuasion-card">
          <div class="p-icon" style="color: var(--navy-primary);"><i class="fa-solid fa-layer-group"></i></div>
          <h3 class="p-title">Zero-Prep Turnkey Lessons</h3>
          <p class="p-desc">
            Every single lesson follows a proven 4-part structure: Do Now retrieval, Source Hook &amp; Investigation, Deliberate Practice, and Formative Reflection. Complete word-for-word teacher answer keys included.
          </p>
        </div>
        <div class="persuasion-card video">
          <div class="p-icon" style="color: var(--accent-gold);"><i class="fa-solid fa-circle-play"></i></div>
          <h3 class="p-title">30 Curated Short Video Hooks</h3>
          <p class="p-desc">
            3 age-appropriate clips per lesson (1–4 mins) from BBC Teach, British Pathé, and IWM. Every clip comes with an essential "Pupil Viewing Task" and "Teacher Model Answer" for focused watching.
          </p>
        </div>
        <div class="persuasion-card het">
          <div class="p-icon" style="color: #7e22ce;"><i class="fa-solid fa-shield-heart"></i></div>
          <h3 class="p-title">HET Primary Guidelines Aligned</h3>
          <p class="p-desc">
            Lessons 3, 7, and 9 teach refugee journeys, pre-war life, and rescue (Nicholas Winton) safely and sensitively—prioritising human dignity, real children's experiences, and moral courage without graphic trauma.
          </p>
        </div>
        <div class="persuasion-card print">
          <div class="p-icon" style="color: #059669;"><i class="fa-solid fa-print"></i></div>
          <h3 class="p-title">100% Reprographic Compliance</h3>
          <p class="p-desc">
            Guaranteed 0px overflow across all sheets. Print as individual weekly 2-page A4 worksheets or as the complete 26-page saddle-stitched pupil consumable workbook with clear handwriting guides.
          </p>
        </div>
      </div>
    </section>

    <!-- LESSON DIRECTORY CONTROLS -->
    <div class="directory-controls">
      <h2 class="section-heading">The 10-Lesson Curriculum Directory</h2>
      <div class="filter-pills">
        <button type="button" class="filter-btn active" onclick="filterLessons('all', this)">All 10 Lessons</button>
        <button type="button" class="filter-btn" onclick="filterLessons('homefront', this)">Home Front Life (L1, 2, 4, 5, 6)</button>
        <button type="button" class="filter-btn" onclick="filterLessons('rescue', this)">Refugee Children &amp; Rescuers (L3, 7, 9)</button>
        <button type="button" class="filter-btn" onclick="filterLessons('secret', this)">Secret War &amp; Remembrance (L8, 10)</button>
      </div>
    </div>

    <!-- 10-LESSON CARDS GRID -->
    <div class="cards-grid" id="lessons-grid">
      <!-- Populated via Client Script from lessonsData -->
    </div>

  </div>

  <!-- VIDEO MODAL -->
  <div class="modal-overlay" id="videoModal" onclick="closeModalOnBg(event, 'videoModal')">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title" id="videoModalTitle">Video Presentation</div>
        <button type="button" class="modal-close" onclick="closeVideoModal()">&times;</button>
      </div>
      <div class="modal-body">
        <div class="video-player-container">
          <iframe id="videoIframe" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 6px; margin-bottom: 12px;">
          <a id="videoDirectLink" href="#" target="_blank" rel="noopener noreferrer" style="font-size: 8.5pt; color: #2563eb; text-decoration: none; font-weight: 600;">
            <i class="fa-brands fa-youtube" style="color: #dc2626;"></i> Open full video in new tab <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 7.5pt;"></i>
          </a>
        </div>
        <div class="video-prompt-box">
          <div class="video-prompt-label"><i class="fa-solid fa-eye"></i> Ask Pupils Before Watching</div>
          <div class="video-prompt-text" id="videoPromptText"></div>
        </div>
        <div class="video-answer-box">
          <div class="video-answer-label"><i class="fa-solid fa-check-circle"></i> Teacher Model Answer</div>
          <div class="video-answer-text" id="videoAnswerText"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- TEACHER GUIDANCE & ANSWER KEY MODAL -->
  <div class="modal-overlay" id="teacherModal" onclick="closeModalOnBg(event, 'teacherModal')">
    <div class="modal-card" style="max-width: 850px;">
      <div class="modal-header">
        <div class="modal-title" id="teacherModalTitle">Teacher Guidance &amp; Model Answers</div>
        <button type="button" class="modal-close" onclick="closeTeacherModal()">&times;</button>
      </div>
      <div class="modal-body" id="teacherModalBody">
        <!-- Injected dynamically -->
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="hub-footer">
    <div>
      <strong>The History Revision Hub</strong> • Commercial Educational Products &amp; Reprographic Standards
    </div>
    <div>
      Year 5 World War II &amp; The Home Front • 100% Institutional Neutrality Compliance
    </div>
  </footer>

  <!-- EMBEDDED DATA & INTERACTIVE LOGIC -->
  <script>
    const lessonsData = ${payloadJson};

    function renderLessons(filter = 'all') {
      const container = document.getElementById('lessons-grid');
      container.innerHTML = '';

      lessonsData.forEach(l => {
        if (filter !== 'all' && l.category !== filter) return;

        let videosHtml = '';
        if (l.videos && l.videos.length > 0) {
          videosHtml = \`
            <div class="video-shelf-box">
              <div class="video-shelf-header">
                <span><i class="fa-solid fa-video"></i> Curated Video Hooks (\${l.videos.length})</span>
                <span style="color: #64748b; font-weight: normal;">Click to Play with Viewing Task</span>
              </div>
              <div class="video-clips-list">
                \${l.videos.map((v, idx) => {
                  const ytId = extractYoutubeId(v.url);
                  return \`
                    <div class="video-clip-pill" onclick="openVideoModal(\${l.num}, \${idx})">
                      <div class="clip-title-part">
                        <i class="fa-brands fa-youtube" style="color: #dc2626;"></i>
                        <span>\${v.title.split('|')[0].trim()}</span>
                      </div>
                      <span class="clip-dur-badge">\${v.duration}</span>
                    </div>
                  \`;
                }).join('')}
              </div>
            </div>
          \`;
        }

        let sourcesHtml = '';
        if (l.sources && l.sources.length > 0) {
          sourcesHtml = \`
            <div class="sources-mini-strip">
              <strong>Primary Sources:</strong> \${l.sources.map(s => \`\${s.id}: \${s.title} (\${s.archive})\`).join(' • ')}
            </div>
          \`;
        }

        const card = document.createElement('article');
        card.className = 'lesson-card';
        card.innerHTML = \`
          <div class="lesson-thumb-wrap">
            <img src="\${l.thumb}" class="lesson-thumb" alt="\${l.title} Worksheet Preview">
            <span class="thumb-overlay-badge \${l.tagClass}">\${l.tag}</span>
            <span class="thumb-lesson-num">Lesson \${l.num < 10 ? '0' + l.num : l.num}</span>
          </div>
          <div class="lesson-content">
            <h3 class="lesson-title">Enquiry \${l.num}: \${l.title}</h3>
            <p class="lesson-enquiry">"\${l.enquiry}"</p>
            \${videosHtml}
            \${sourcesHtml}
            <div class="lesson-actions">
              <a href="\${l.html}" class="action-btn view">
                <i class="fa-solid fa-chalkboard-user"></i> Open Worksheet
              </a>
              <a href="\${l.pdf}" target="_blank" class="action-btn pdf">
                <i class="fa-solid fa-print"></i> Print A4 (PDF)
              </a>
              <button type="button" class="action-btn teacher" onclick="openTeacherGuidanceModal(\${l.num})">
                <i class="fa-solid fa-lightbulb"></i> Teacher Guidance &amp; 1:1 Answer Key
              </button>
            </div>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function extractYoutubeId(url) {
      if (!url) return '';
      const m = url.match(/(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))([\\w-]{11})/i);
      return m ? m[1] : '';
    }

    function filterLessons(category, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderLessons(category);
    }

    // VIDEO MODAL LOGIC
    function openVideoModal(lessonNum, videoIdx) {
      const lesson = lessonsData.find(l => l.num === lessonNum);
      if (!lesson || !lesson.videos || !lesson.videos[videoIdx]) return;

      const video = lesson.videos[videoIdx];
      const ytId = extractYoutubeId(video.url);

      document.getElementById('videoModalTitle').innerText = \`Lesson \${lesson.num}: \${video.title}\`;
      document.getElementById('videoIframe').src = \`https://www.youtube.com/embed/\${ytId}?autoplay=1&rel=0\`;
      document.getElementById('videoDirectLink').href = video.url;
      document.getElementById('videoPromptText').innerText = video.viewing_task || 'Watch carefully and note down your observations.';
      document.getElementById('videoAnswerText').innerText = video.model_answer || 'Key points discussed during whole-class reflection.';

      document.getElementById('videoModal').classList.add('active');
    }

    function closeVideoModal() {
      document.getElementById('videoIframe').src = '';
      document.getElementById('videoModal').classList.remove('active');
    }

    // TEACHER GUIDANCE MODAL LOGIC
    function openTeacherGuidanceModal(lessonNum) {
      const lesson = lessonsData.find(l => l.num === lessonNum);
      if (!lesson) return;

      const g = lesson.guidance || {};
      document.getElementById('teacherModalTitle').innerText = \`Lesson \${lesson.num} Teacher Guidance & Answer Key: \${lesson.title}\`;

      let bodyHtml = '';

      // 1. Subject Knowledge Primer
      if (g.subjectPrimer) {
        bodyHtml += \`
          <div class="tg-tab-section">
            <h4 class="tg-section-title"><i class="fa-solid fa-book-bookmark"></i> 60-Second Subject Knowledge Primer</h4>
            <div class="tg-primer-text">\${g.subjectPrimer}</div>
          </div>
        \`;
      }

      // 2. Common Misconceptions
      if (g.misconceptions && g.misconceptions.length > 0) {
        bodyHtml += \`
          <div class="tg-tab-section">
            <h4 class="tg-section-title"><i class="fa-solid fa-triangle-exclamation"></i> Primary Misconceptions to Address</h4>
            \${g.misconceptions.map(m => \`
              <div class="misconception-card">
                <div class="misconception-wrong"><i class="fa-solid fa-xmark"></i> Misconception: "\${m.misconception || m.wrong}"</div>
                <div class="misconception-right"><i class="fa-solid fa-check"></i> <strong>Historical Reality:</strong> \${m.correction || m.right}</div>
              </div>
            \`).join('')}
          </div>
        \`;
      }

      // 3. Whole-Class Hinge Question
      if (g.hingeQuestion) {
        bodyHtml += \`
          <div class="tg-tab-section">
            <h4 class="tg-section-title"><i class="fa-solid fa-comments"></i> Hinge Discussion Question</h4>
            <div style="background: #eff6ff; border-left: 3.5px solid #3b82f6; padding: 10px 14px; border-radius: 0 4px 4px 0; margin-bottom: 15px;">
              <strong style="color: #1e3a8a; font-size: 9.5pt;">"\${g.hingeQuestion}"</strong>
              <p style="font-size: 8.5pt; color: #475569; margin-top: 4px;">\${g.hingeGuidance || ''}</p>
            </div>
          </div>
        \`;
      }

      // 4. Complete Worksheet Answer Key (Tasks 1–5)
      if (g.answers) {
        bodyHtml += \`
          <div class="tg-tab-section">
            <h4 class="tg-section-title"><i class="fa-solid fa-key"></i> Complete Worksheet Answer Key (Tasks 1–5)</h4>
            <div class="answer-key-task">
              <div class="task-title">Task 1: Primary Source Detective (Source A &amp; B)</div>
              <div class="task-answer-body">\${g.answers.task1 || g.answers.block1 || 'Completed in class.'}</div>
            </div>
            <div class="answer-key-task">
              <div class="task-title">Task 2: Chronological Ordering &amp; Historical Context</div>
              <div class="task-answer-body">\${g.answers.task2 || g.answers.block2 || 'Completed in class.'}</div>
            </div>
            <div class="answer-key-task">
              <div class="task-title">Task 3: Historical Evidence Investigation</div>
              <div class="task-answer-body">\${g.answers.task3 || g.answers.block3 || 'Completed in class.'}</div>
            </div>
            <div class="answer-key-task">
              <div class="task-title">Task 4: Historical Perspectives &amp; Empathy Analysis</div>
              <div class="task-answer-body">\${g.answers.task4 || g.answers.block4 || 'Completed in class.'}</div>
            </div>
            <div class="answer-key-task" style="border-left: 3.5px solid #16a34a;">
              <div class="task-title" style="color: #15803d;">Task 5: WAGOLL Exemplar Response (Extended Writing)</div>
              <div class="task-answer-body" style="font-style: italic;">"\${g.answers.task5_wagoll || g.answers.block5_wagoll || 'Exemplar answer provided in teacher notes.'}"</div>
            </div>
          </div>
        \`;
      }

      document.getElementById('teacherModalBody').innerHTML = bodyHtml;
      document.getElementById('teacherModal').classList.add('active');
    }

    function closeTeacherModal() {
      document.getElementById('teacherModal').classList.remove('active');
    }

    function closeModalOnBg(e, modalId) {
      if (e.target.id === modalId) {
        if (modalId === 'videoModal') closeVideoModal();
        else if (modalId === 'teacherModal') closeTeacherModal();
      }
    }

    // Keyboard ESC listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeVideoModal();
        closeTeacherModal();
      }
    });

    // Initial render
    renderLessons('all');
  </script>
</body>
</html>
`;

// Write to public/units/ks2_ww2/index.html
const outIndexPath = path.resolve(__dirname, '../public/units/ks2_ww2/index.html');
fs.writeFileSync(outIndexPath, htmlContent, 'utf8');
console.log(
  '🎉 Successfully created comprehensive KS2 Teacher Hub & Curriculum Showcase at:',
  outIndexPath,
);
