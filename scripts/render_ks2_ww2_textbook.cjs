/**
 * scripts/render_ks2_ww2_textbook.cjs
 *
 * 24-PAGE MASTER CLASSROOM TEXTBOOK (6 Sheets of A3 Saddle-Stitch Model)
 * Unit: Key Stage 2 World War II & The Home Front (1939–1945)
 *
 * Reprographic Quality Standards:
 * - 100% Verbatim fidelity to live narrative in units/ks2_ww2/data.js
 * - Exactly 24 pages (6 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1: Master Front Cover (Hero plate, archival caption, dramatic synopsis, 10-Enquiry directory)
 * - Page 2: Master Chronological Milestone Spine (12 defining turning points 1938–1945)
 * - Page 3: Dual Cartographic Theater (Home Front Evacuation Map + European Theater Map + 4 Flashpoints)
 * - Pages 4–23: 10 Double-Page Spreads (Enquiries 1–10: Verso + Recto)
 *     Verso: Enquiry Banner, Key Enquiry Question, Act 1 & 2 prose, Primary Source A, Think & Discuss card
 *     Recto: Decisive Mechanism banner, Act 3 prose, Primary Source B, Key Vocabulary, Historical Context, Quick Retrieval Strip
 * - Page 24: Master 40-Question Knowledge Retrieval Quiz Back Cover (10 Topic Cards)
 * - Strict School Anonymity: "The History Revision Hub", zero school names or identifiers.
 * - Prioritises enlarged, legible KS2 typography (Lora serif, 11.2pt, 1.50 line height).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI
function getBase64Image(relativePath) {
  try {
    if (!relativePath) return null;
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2', 'assets', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'units', 'ks2_ww2', 'assets', path.basename(cleanPath)),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.svg'
              ? 'image/svg+xml'
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

// Helper to inspect local image pixel dimensions and aspect ratio
function getImageDimensions(relativePath) {
  try {
    if (!relativePath)
      return { width: 800, height: 600, ratio: 1.33, isPortrait: false, isSquare: false };
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2', 'assets', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'units', 'ks2_ww2', 'assets', path.basename(cleanPath)),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const buf = fs.readFileSync(cand);
        // PNG Header
        if (buf[0] === 0x89 && buf[1] === 0x50) {
          const w = buf.readUInt32BE(16);
          const h = buf.readUInt32BE(20);
          return {
            width: w,
            height: h,
            ratio: w / h,
            isPortrait: h > w,
            isSquare: Math.abs(w - h) < 50,
          };
        }
        // JPEG Header
        if (buf[0] === 0xff && buf[1] === 0xd8) {
          let offset = 2;
          while (offset < buf.length) {
            if (buf[offset] !== 0xff) break;
            const marker = buf[offset + 1];
            if (marker === 0xc0 || marker === 0xc2) {
              const h = buf.readUInt16BE(offset + 5);
              const w = buf.readUInt16BE(offset + 7);
              return {
                width: w,
                height: h,
                ratio: w / h,
                isPortrait: h > w,
                isSquare: Math.abs(w - h) < 50,
              };
            }
            const len = buf.readUInt16BE(offset + 2);
            offset += 2 + len;
          }
        }
      }
    }
  } catch (e) {}
  return { width: 800, height: 600, ratio: 1.33, isPortrait: false, isSquare: false };
}

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>)
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(/<span\s+class=["']para-ref["']>[^<]*<\/span>\s*/gi, '')
    .replace(/\[\d+\.\d+\]\s*/g, '')
    .trim();
}

// Load canonical data from units/ks2_ww2/data.js
function loadUnitData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'ks2_ww2', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw = raw
    .replace(/^const unitData\s*=\s*/, '')
    .replace(/export default[\s\S]*$/, '')
    .trim();
  if (raw.endsWith(';')) raw = raw.slice(0, -1);
  return JSON.parse(raw);
}

// Page 1 Dramatic Overview Synopsis
const canonicalOverviewP1 =
  'Between 1939 and 1945, the Second World War touched every aspect of daily life across Great Britain. From the sudden sounding of air raid sirens and the compulsory fitting of 38 million gas masks, to the poignant exodus of 1.5 million young evacuees clutching cardboard suitcases and brown luggage tags, the civilian population stood on the front line of modern conflict.';

const canonicalOverviewP2 =
  'Discover how ordinary families sheltered through 57 consecutive nights of bombing during the Blitz, dug flowerbeds into vegetable allotments for Victory, and worked around the clock in factories and fields. Experience the humanitarian rescue of 10,000 child refugees on the Kindertransport, the secret genius of Alan Turing’s codebreakers at Bletchley Park, and the euphoric street celebrations of VE Day.';

// Page 2 Chronological Milestone Spine (12 Defining Turning Points)
const milestones = [
  {
    date: 'Nov 1938',
    title: 'The Kindertransport Begins & Prague Rescue Network',
    desc: 'Following Kristallnacht, the British Parliament permits 10,000 unaccompanied refugee children. Nicholas Winton and Trevor Chadwick organise rescue trains from Prague.',
    ref: 'Ref [3.1, 9.1]',
  },
  {
    date: '1 Sept 1939',
    title: 'Operation Pied Piper: 1.5 Million Civilians Evacuated',
    desc: 'In three days, British railways move nearly 1.5 million school children, mothers, and teachers from target cities to rural host families with luggage tags pinned to their coats.',
    ref: 'Ref [2.1–2.2]',
  },
  {
    date: '3 Sept 1939',
    title: 'Britain Enters World War II & ARP Blackout Imposed',
    desc: 'Chamberlain announces war on wireless radios. 38 million gas masks are distributed in cardboard boxes, and strict nightly blackouts plunge cities into darkness.',
    ref: 'Ref [1.1–1.3]',
  },
  {
    date: 'May 1940',
    title: 'Churchill Becomes Prime Minister & Dunkirk Evacuation',
    desc: 'Winston Churchill leads a wartime coalition government. Over 338,000 Allied troops are saved from Dunkirk beaches by a flotilla of naval ships and civilian "Little Ships".',
    ref: 'Ref [4.1]',
  },
  {
    date: 'July–Oct 1940',
    title: 'The Battle of Britain & Fighter Command Defense',
    desc: 'RAF pilots in Spitfires and Hurricanes thwart the Luftwaffe above southern England, forcing Hitler to indefinitely postpone Operation Sea Lion, the planned invasion.',
    ref: 'Ref [4.1, 6.3]',
  },
  {
    date: 'Sept 1940–May 1941',
    title: 'The Blitz Bombardment of London & Industrial Hubs',
    desc: 'German bombers strike London for 57 consecutive nights and devastate industrial centres like Coventry. Families rely on corrugated Anderson shelters and Tube station platforms.',
    ref: 'Ref [4.1–4.3]',
  },
  {
    date: 'Jan 1940–1941',
    title: 'Food Rationing Commences & Dig for Victory Campaign',
    desc: 'To counteract Atlantic U-boat blockades, the Ministry of Food introduces ration books. The Ministry of Agriculture converts parks, lawns, and gardens into vegetable plots.',
    ref: 'Ref [5.1–5.3]',
  },
  {
    date: 'Dec 1941',
    title: 'Conscription of Women for War Work & Land Army Surge',
    desc: 'Britain becomes the first nation to conscript women. Over 80,000 join the Women’s Land Army, while hundreds of thousands enter aircraft factories and munitions works.',
    ref: 'Ref [6.1–6.3]',
  },
  {
    date: '1941–1943',
    title: 'Turning the Tide: Turing’s Bombe & Ultra Intelligence',
    desc: 'At Bletchley Park, Alan Turing and a predominantly female workforce operate electromechanical Bombes, breaking German Enigma military codes and shortening the war.',
    ref: 'Ref [8.1–8.3]',
  },
  {
    date: '6 June 1944',
    title: 'D-Day: Allied Amphibious Landings in Normandy',
    desc: 'Operation Overlord launches the liberation of Western Europe. British, American, and Canadian forces breach Hitler’s Atlantic Wall, beginning the final march toward Berlin.',
    ref: 'Ref [10.1]',
  },
  {
    date: '8 May 1945',
    title: 'VE Day: Victory in Europe & Jubilant Street Celebrations',
    desc: 'Churchill declares peace in Europe. Millions celebrate with street parties, Union Jack bunting, and bonfires, remembering the six years of sacrifice and loss.',
    ref: 'Ref [10.1–10.2]',
  },
  {
    date: '1945–Present',
    title: 'Post-War Reconstruction, NHS Founding & Remembrance',
    desc: 'Post-war Britain establishes the National Health Service (1948) and modern welfare safety net, enshrining annual November Remembrance at the Cenotaph and local memorials.',
    ref: 'Ref [10.3]',
  },
];

// Page 3 Four Defining Strategic Flashpoints
const flashpoints = [
  {
    badge: 'FLASHPOINT 01',
    title: 'The English Channel & The White Cliffs',
    mechanism: 'Defensive Moat & Maritime Air Chokepoint',
    text: 'The 21-mile Dover Strait served as Britain’s natural defense moat. In summer 1940, German forces occupied the French coast, preparing Operation Sea Lion. Denying the Luftwaffe air superiority over this maritime chokepoint in the Battle of Britain prevented invasion and kept Britain in the war.',
    consequence:
      'Key Consequence: Forced Hitler to abandon invasion plans, preserving Britain as the vital launchpad for eventual Allied European liberation.',
  },
  {
    badge: 'FLASHPOINT 02',
    title: 'The Atlantic Lifeline & Western Approaches',
    mechanism: 'Supply Convoys & Submarine Warfare',
    text: 'As an island importing 70% of its food and vital petroleum, Britain faced starvation from German U-boat "wolf packs". The Western Approaches into Liverpool and Glasgow formed an essential shipping corridor. Protecting merchant convoys made Dig for Victory and rationing indispensable.',
    consequence:
      'Key Consequence: Civilian rationing and home agriculture directly determined whether Britain had enough shipping tonnage to survive.',
  },
  {
    badge: 'FLASHPOINT 03',
    title: 'The London Docks & Industrial Heartland',
    mechanism: 'Strategic Targets & Civilian Bombardment',
    text: 'German air offensives concentrated on East London’s Thames docks, shipyards, and manufacturing centers like Birmingham and Coventry. Striking civilian neighborhoods was designed to shatter British morale and paralyze weapons manufacturing, compelling mass civil defense adaptations.',
    consequence:
      'Key Consequence: Communities united through volunteer ARP services, blackout discipline, and bomb shelters, sustaining factory output.',
  },
  {
    badge: 'FLASHPOINT 04',
    title: 'Rural Reception Havens & Bletchley Park',
    mechanism: 'Strategic Dispersal & Ultra Intelligence',
    text: 'The English countryside provided crucial strategic depth far from bomber trajectories. Rural counties welcomed 1.5 million urban evacuees during Operation Pied Piper, while the secluded country estate of Bletchley Park in Buckinghamshire housed the secret codebreaking headquarters.',
    consequence:
      'Key Consequence: Spatial isolation kept Turing’s Bombe machines secret, decrypting Enigma radio traffic and shortening the war by years.',
  },
];

// Definitive Archival Source A Type Classifications
const SOURCE_A_TYPES = [
  'Primary Historical Photograph (1939)',
  'Primary Historical Photograph (1939)',
  'Primary Historical Photograph (1939)',
  'Primary Historical Photograph (1940)',
  'Primary Wartime Poster (1940)',
  'Primary Historical Photograph (1941)',
  'Primary Historical Photograph (1938)',
  'Primary Artifact Photograph (1940)',
  'Primary Historical Photograph (1939)',
  'Primary Historical Photograph (1945)',
];

// Distinct Enquiry Subtitles ensuring zero verbatim phrasing duplication with the Key Enquiry Question
const DISTINCT_SUBTITLES = [
  "Chamberlain's Broadcast, 38 Million Gas Masks & Nightly Blackout Precautions",
  'Mass Civilian Dispersal, The Railway Exodus & The Rural Billeting Lottery',
  'Parliamentary Sanctuary, Continental Train Corridors & Foster Family Care',
  'Luftwaffe Aerial Bombardment, Subterranean Platform Shelters & Civil Defense',
  'Merchant Navy Lifelines, Fair Food Shares & Dig for Victory Allotments',
  'National Conscription, Industrial Munitions Shifts & Rural Agricultural Service',
  'Diverse Family Traditions, Everyday Culture & The Systematic Stripping of Citizenship',
  "Station X, Alan Turing's Mathematical Breakthrough & The Enigma Rotors",
  'Nicholas Winton, Trevor Chadwick & The Prague Rescue Network',
  'The Declaration of European Peace, Street Celebrations & Post-War Renewal',
];

// Secondary Sources & Historical Context configurations for Recto pages (De-duplicated)
const RECTO_EDITORIAL = [
  {
    lessonIndex: 0,
    mechanism: 'TOTAL CIVILIAN MOBILISATION & AIR RAID PRECAUTIONS',
    bannerTag: 'The British Home Front (1939)',
    sourceB: {
      type: 'Primary Artifact (1939)',
      badge: 'CIVILIAN RESPIRATOR',
      image: '/units/ks2_ww2/assets/gas_mask_box_1939.jpg',
      caption:
        'The standard civilian rubber gas mask respirator with cylindrical charcoal filter canister, issued free to every citizen in September 1939.',
      citation: 'Imperial War Museum Collection • Primary Home Front Artifact',
      provenance: 'Imperial War Museum Collection',
      observations: [
        'Heavy molded black rubber facepiece designed to seal airtight around the cheeks and chin.',
        'Metal screw-in cylindrical canister containing compressed active charcoal and fibrous filter layers.',
        'Over 38 million civilian respirators produced in three standard sizes (adult, child, and baby).',
      ],
    },
    contextTitle: 'Home Front Historical Context',
    contextText:
      'During the first months of conflict, over 1.4 million civilians enlisted in home defence services. Local wardens patrolled neighbourhood streets in total darkness, blowing warning whistles and enforcing strict blackout discipline so no stray beam could guide enemy bombers.',
  },
  {
    lessonIndex: 1,
    mechanism: 'MASS CIVIC DISPERSAL & STRATEGIC EVACUATION',
    bannerTag: 'Operation Pied Piper (1939–1940)',
    sourceB: {
      type: 'Primary Artifact (1939)',
      badge: 'EVACUEE TRANSIT RECORD',
      image: '/units/ks2_ww2/assets/evacuee_luggage_tag.jpg',
      caption:
        'Standard printed luggage tag pinned to every evacuee’s lapel with name, school, and destination.',
      citation: 'The National Archives • Evacuation Collection',
      provenance: 'The National Archives Collection',
      observations: [
        'Printed on durable brown manila card with a reinforced metal eyelet and string loop for pinning to coats.',
        "Features pre-printed spaces for Child's Name, Home Borough, School Code, and Billeting Address.",
        'Served as the child’s sole official identification during the vast railway dispersal across Britain.',
      ],
    },
    contextTitle: 'Evacuation Historical Context',
    contextText:
      'Between 1 and 3 September 1939, British railways transported 1,473,000 evacuees without a single fatal accident. It remains the largest coordinated movement of civilians in British history, exposing stark urban and rural differences.',
  },
  {
    lessonIndex: 2,
    mechanism: 'HUMANITARIAN REFUGE & CIVIC SPONSORSHIP',
    bannerTag: 'The Kindertransport Network (1938–1939)',
    sourceB: {
      type: 'Primary Document (1939)',
      badge: 'PASSPORT & VISA PERMIT',
      image: '/units/ks2_ww2/assets/vera_passport_1939.jpg',
      caption:
        'Vera Schaufeld’s primary German passport stamped with the discriminatory red "J" and British transit visa permits.',
      citation: 'Holocaust Educational Trust & Kindertransport Archive',
      provenance: 'Holocaust Educational Trust Archive',
      observations: [
        'Official travel document stamped with a large red letter "J" to enforce Nazi discriminatory decrees.',
        'Contains purple transit visa stamps from Dutch border officials at Bentheim and British officers at Harwich.',
        'Granted temporary entry to Britain under strict conditions: unaccompanied, under 17, and with verified shelter.',
      ],
    },
    contextTitle: 'Kindertransport Historical Context',
    contextText:
      'The British government agreed to permit unaccompanied child refugees under 17, provided British families or charities guaranteed a £50 bond (worth over £3,500 today) for each child’s support. Over 10,000 children were saved.',
  },
  {
    lessonIndex: 3,
    mechanism: 'CIVIL DEFENSE RESILIENCE & COLLECTIVE SOLIDARITY',
    bannerTag: 'The London Blitz & Industrial Cities (1940–1941)',
    sourceB: {
      type: 'Primary Photograph (1940)',
      badge: 'SHELTER PHOTOGRAPHIC RECORD',
      image: '/units/ks2_ww2/assets/tube_station_shelter_1940.jpg',
      caption:
        'Thousands of Londoners sheltering overnight on Underground tube station platforms during night bombing.',
      citation: 'Imperial War Museum • The Blitz Photographic Collection',
      provenance: 'Imperial War Museum Photographic Archive',
      observations: [
        'Dozens of families camped side-by-side along curved concrete platform edges just inches from train tracks.',
        'Shows improvised bedding made from heavy overcoats, folded blankets, and parcels carried down during alerts.',
        'Captures how ordinary citizens turned subterranean transport networks into communal nighttime dormitories.',
      ],
    },
    contextTitle: 'Air Raid Defense Historical Context',
    contextText:
      'During the Blitz, 43,000 British civilians were killed and more than a million homes damaged or destroyed. Yet, factory production recovered rapidly, and public resolve proved that aerial bombardment could not break Britain’s will.',
  },
  {
    lessonIndex: 4,
    mechanism: 'ECONOMIC PLANNED CONSUMPTION & SELF-SUFFICIENCY',
    bannerTag: 'The Atlantic Lifeline & Ministry of Food',
    sourceB: {
      type: 'Primary Artifact (1940)',
      badge: 'OFFICIAL RATIONING ARTIFACT',
      image: '/units/ks2_ww2/assets/ration_book_coupons_1940.jpg',
      caption:
        'General Ration Book and clothing coupon sheets issued to every citizen by the Ministry of Food.',
      citation: 'The National Archives • Ministry of Food Collection',
      provenance: 'The National Archives Collection',
      observations: [
        'Grid of numbered paper coupons printed on thin newsprint to prevent forgery and control consumption.',
        'Distinct coloured sections allocated points for butcher meat, dairy fats, granulated sugar, and tea.',
        'Shop assistants clipped matching squares with metal scissors; purchases without coupons were strictly illegal.',
      ],
    },
    contextTitle: 'Rationing & Agriculture Context',
    contextText:
      'The Ministry of Agriculture turned 1.4 million private flower gardens, school playing fields, and parks into vegetable allotments. Domestic potato production surged by 100%, and Britain reduced shipping import reliance by over 50%.',
  },
  {
    lessonIndex: 5,
    mechanism: 'GENDER MOBILISATION & INDUSTRIAL WAR WORK',
    bannerTag: 'The Women’s Land Army & Munitions (1941–1945)',
    sourceB: {
      type: 'Primary Poster (1941)',
      badge: 'WARTIME RECRUITMENT POSTER',
      image: '/units/ks2_ww2/assets/land_army_poster_1941.jpg',
      caption:
        'Recruitment poster: "For a healthy, happy job join the Women’s Land Army", calling women to farm work.',
      citation: 'Imperial War Museum • Wartime Recruitment Posters',
      provenance: 'Imperial War Museum Art Collection',
      observations: [
        'Colourful lithograph poster presenting rural agricultural work as an invigorating and patriotic duty.',
        'Depicts the official working uniform: knitted emerald sweater, fawn corduroy breeches, and tall boots.',
        'Features the timber fence, rolling fields, and grazing sheep to contrast healthy outdoors with factory fumes.',
      ],
    },
    contextTitle: 'Women’s War Service Context',
    contextText:
      'In December 1941, Britain introduced national service conscription for unmarried women aged 20 to 30. While vast numbers entered aircraft manufacturing and heavy engineering, thousands of Land Girls maintained domestic food supplies, keeping farms productive despite wartime labour shortages.',
  },
  {
    lessonIndex: 6,
    mechanism: 'LEGAL PERSECUTION & STATE-SPONSORED DISCRIMINATION',
    bannerTag: 'Central Europe & The Shoah (1933–1938)',
    sourceB: {
      type: 'Primary Document (1938)',
      badge: 'MINISTERIAL STATUTORY DECREE',
      image: '/units/ks2_ww2/assets/school_ban_decree_november_1938.png',
      caption:
        'Reich Education Ministry decree notice issued on 15 November 1938 officially barring Jewish pupils from German classrooms.',
      citation:
        'Reich Ministry of Education Decree Archive (15 Nov 1938) & The History Revision Hub',
      provenance: 'Reich Ministry of Education Decree Archive',
      observations: [
        'Official Reich Ministry ministerial circular terminating the education of all Jewish pupils in public schools.',
        'Part of a deliberate legal apparatus that segregated classrooms and stripped away basic civil rights.',
        'The immediate educational expulsion prompted British parliamentarians to open the emergency refugee scheme.',
      ],
    },
    contextTitle: 'Civil Rights Erosion Context',
    contextText:
      'The Nazi regime did not strip rights overnight; they introduced over 400 separate laws, decrees, and regulations between 1933 and 1938. By gradually excluding Jewish citizens from schools, parks, and professions, the state isolated minorities.',
  },
  {
    lessonIndex: 7,
    mechanism: 'SIGNALS INTELLIGENCE & MATHEMATICAL CRYPTANALYSIS',
    bannerTag: 'Station X & Ultra Intelligence (1939–1945)',
    sourceB: {
      type: 'Primary Artifact (1940)',
      badge: 'DECRYPTION APPARATUS ARTIFACT',
      image: '/units/ks2_ww2/assets/bombe_bletchley_park.jpg',
      caption:
        'The Turing-Welchman Bombe electromechanical machine used to decode German Enigma radio messages.',
      citation: 'Bletchley Park Trust Archive',
      provenance: 'Bletchley Park Trust Archive',
      observations: [
        'Enormous electromechanical cabinet measuring six feet tall, housing 36 sets of three revolving drum rotors.',
        'Each red-and-gold rotor spun rapidly to simulate the cryptographic scrambling of German military ciphers.',
        'Connected by miles of internal colored cable harnesses, maintained with machine oil by female WRNS operators.',
      ],
    },
    contextTitle: 'Cryptanalysis Historical Context',
    contextText:
      'By 1944, over 9,000 people worked at Bletchley Park, nearly 75% of them women who operated the electromechanical Bombe machines and filed intercepted decrypts. Ultra intelligence shortened the war in Europe by two to three years.',
  },
  {
    lessonIndex: 8,
    mechanism: 'INDIVIDUAL MORAL AGENCY & RESCUE NETWORKS',
    bannerTag: 'The Prague & London Rescue Chain (1938–1939)',
    sourceB: {
      type: 'Primary Archive (1939)',
      badge: 'HISTORICAL SCRAPBOOK LEDGER',
      image: '/units/ks2_ww2/assets/nicky_scrapbook_transport_list.jpg',
      caption:
        'A page from Nicholas Winton’s secret scrapbook listing names, birth dates, and British foster sponsors.',
      citation: 'Yad Vashem / Winton Family Archive',
      provenance: 'Winton Family Private Archive',
      observations: [
        'Meticulous leather-bound ledger recording children’s names, birth dates, travel tags, and host family details.',
        'Pasted with black-and-white passport portraits so British foster parents could identify children upon arrival.',
        'Compiled by hand in Prague hotel rooms during the winter of 1938–1939, recording 669 successful evacuations.',
      ],
    },
    contextTitle: 'Moral Courage Historical Context',
    contextText:
      'Nicholas Winton, Trevor Chadwick, Doreen Warriner, and their network worked against time in Prague, arranging railway transit permits, forged visas, and British foster sponsors for 669 children before borders were sealed.',
  },
  {
    lessonIndex: 9,
    mechanism: 'CIVIC COMMEMORATION & WELFARE RECONSTRUCTION',
    bannerTag: 'Victory in Europe & Post-War Legacy (1945)',
    sourceB: {
      type: 'Primary Photograph (1945)',
      badge: 'COMMEMORATIVE PHOTOGRAPH',
      image: '/units/ks2_ww2/assets/ve_day_children_table_1945.jpg',
      caption:
        'A close-up of celebratory street party tables lined with Union Jack bunting in a bombed London street, 1945.',
      citation: 'Imperial War Museum • VE Day Collection',
      provenance: 'Imperial War Museum VE Day Archive',
      observations: [
        'Long wooden trestle tables set out directly along the cobbled roadway amidst blitzed terrace houses.',
        'Draped with white tablecloths, handmade paper decorations, and miniature British Union Jack flags.',
        'Neighbours pooled their accumulated sugar and dried egg rations to bake celebratory buns for local children.',
      ],
    },
    contextTitle: 'Post-War Legacy Historical Context',
    contextText:
      'VE Day marked the conclusion of six years of armed conflict across Europe, greeted by jubilant neighbourhood parties and tolling church bells. The wartime coalition government’s 1942 Beveridge Report laid the blueprint for a comprehensive post-war welfare state and universal medical protection.',
  },
];

function buildHtml() {
  const unitData = loadUnitData();
  const heroImageBase64 = getBase64Image('/units/ks2_ww2/assets/evacuees_railway_1939.jpg');
  const mapEvacBase64 = getBase64Image('/units/ks2_ww2/assets/evacuation_map_ks2_pupil.png');
  const mapKinderBase64 = getBase64Image('/units/ks2_ww2/assets/kindertransport_route_map.jpg');
  const mapBlitzBase64 = getBase64Image('/units/ks2_ww2/assets/blitz_targets_map.jpg');
  const mapAtlanticBase64 = getBase64Image('/units/ks2_ww2/assets/atlantic_lifeline_map.jpg');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>World War II & The Home Front (1939–1945) • Master Classroom Textbook</title>
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
      background: #475569;
      font-family: 'Inter', -apple-system, sans-serif;
      color: #0f172a;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      background: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10mm 14mm 8mm 14mm;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      page-break-after: always;
      page-break-inside: avoid;
    }

    @media print {
      body {
        background: #ffffff;
        gap: 0;
      }
      .page {
        margin: 0;
        box-shadow: none;
      }
    }

    /* Common Running Header & Footer */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 5px;
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.08em;
      flex-shrink: 0;
    }

    .running-header .sub-badge {
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.04em;
    }

    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 2.5px;
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7pt;
      color: #64748b;
      flex-shrink: 0;
    }

    .running-footer .page-pill {
      background: #0f172a;
      color: #ffffff;
      font-weight: 800;
      padding: 1px 7px;
      border-radius: 2px;
      font-size: 7pt;
    }

    /* Common Typography */
    .prose-text {
      font-family: 'Lora', Georgia, serif;
      font-size: 11.2pt;
      line-height: 1.50;
      color: #1e293b;
      text-align: justify;
      margin: 0 0 6px 0;
    }

    .prose-text strong {
      color: #0f172a;
      font-weight: 700;
    }

    .act-header {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin: 4px 0 2px 0;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .act-num {
      color: #1e3a8a;
      font-size: 8.4pt;
      font-weight: 800;
      letter-spacing: 0.02em;
    }

    /* 2-Column Content Grid */
    .content-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      flex: 1;
      min-height: 0;
    }

    /* ==========================================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================================== */
    .cover-top-masthead {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 4px;
    }

    .cover-series {
      font-size: 8.5pt;
      font-weight: 800;
      letter-spacing: 0.20em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 2px;
    }

    .cover-sub-series {
      font-size: 7pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #475569;
      text-transform: uppercase;
    }

    .cover-title-block {
      text-align: center;
      margin: 2px 0 3px 0;
    }

    .cover-date-pill {
      display: inline-block;
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7.5pt;
      font-weight: 800;
      padding: 1.5px 12px;
      border-radius: 12px;
      letter-spacing: 0.10em;
      margin-bottom: 2px;
    }

    .cover-main-title {
      font-family: 'Cinzel', serif;
      font-size: 21pt;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: 0.03em;
      color: #0f172a;
      margin: 0;
    }

    .cover-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.2pt;
      font-style: italic;
      color: #334155;
      margin-top: 1.5px;
    }

    .cover-overarching-box {
      display: inline-block;
      background: #eff6ff;
      border: 1.5px solid #3b82f6;
      border-radius: 4px;
      padding: 3px 14px;
      margin-top: 3px;
      text-align: center;
      max-width: 90%;
    }

    .cover-overarching-label {
      display: block;
      font-size: 6.6pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: #1e3a8a;
      margin-bottom: 1px;
    }

    .cover-overarching-question {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.5pt;
      font-style: italic;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
    }

    .cover-hero-wrap {
      width: 100%;
      height: 46mm;
      border: 1.5px solid #0f172a;
      position: relative;
      background: #0f172a;
      margin: 2px 0 2px 0;
      border-radius: 3px;
      overflow: hidden;
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
      margin: 1px 0 2px 0;
    }

    .cover-overview-box {
      background: #fdfbf7;
      border: 1.5px solid #d4c5b2;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 4px;
      padding: 5px 10px;
      margin: 2px 0 4px 0;
    }

    .cover-overview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }

    .cover-overview-title {
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #1e3a8a;
    }

    .cover-overview-period {
      font-size: 6.8pt;
      font-weight: 800;
      color: #78350f;
    }

    .cover-overview-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.0pt;
      line-height: 1.40;
      color: #1e293b;
      margin: 0 0 2px 0;
      text-align: justify;
    }

    .cover-overview-text:last-child {
      margin-bottom: 0;
    }

    .cover-directory {
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      padding: 6px 12px 6px 12px;
      background: #ffffff;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      box-sizing: border-box;
    }

    .cover-directory-heading {
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: #0f172a;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
    }

    .cover-directory-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 5px 16px;
      flex: 1;
      align-content: space-between;
      width: 100%;
      box-sizing: border-box;
    }

    .directory-card-v2 {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-width: 0;
      border-bottom: 1px dotted #cbd5e1;
      padding-bottom: 3.5px;
      box-sizing: border-box;
    }

    .dir-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5px;
      min-width: 0;
    }

    .dir-card-pill {
      font-size: 6.5pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    .dir-card-pages {
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    .dir-card-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.4pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.20;
      white-space: normal;
      overflow: visible;
      margin-bottom: 1.5px;
    }

    .dir-card-question {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      color: #1e3a8a;
      font-size: 7.0pt;
      line-height: 1.25;
      white-space: normal;
      overflow: visible;
    }

    /* ==========================================================================
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================================== */
    .spine-header-block {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
      flex-shrink: 0;
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
      font-size: 8.5pt;
      font-style: italic;
      color: #475569;
      margin-top: 2px;
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
      top: 6px;
      bottom: 6px;
      width: 2.5px;
      background: #cbd5e1;
      z-index: 1;
    }

    .milestone-item {
      display: flex;
      align-items: flex-start;
      position: relative;
      z-index: 2;
      margin-bottom: 4px;
    }

    .milestone-date-box {
      width: 60px;
      text-align: right;
      padding-right: 12px;
      font-size: 7.6pt;
      font-weight: 800;
      color: #1e3a8a;
      line-height: 1.2;
      margin-top: 1px;
      flex-shrink: 0;
    }

    .milestone-node {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #1e3a8a;
      border: 2px solid #ffffff;
      box-shadow: 0 0 0 1.5px #1e3a8a;
      margin-top: 2.5px;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .milestone-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #1e3a8a;
      border-radius: 3px;
      padding: 3.5px 8px;
    }

    .milestone-top-row {
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      margin-bottom: 1px;
    }

    .milestone-title {
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
    }

    .milestone-desc {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.8pt;
      line-height: 1.35;
      color: #334155;
      margin: 0;
      text-align: justify;
    }

    /* ==========================================================================
       PAGE 3: DEDICATED CARTOGRAPHIC ATLAS (4-MAP HISTORICAL GRID)
       ========================================================================== */
    .map-header-strip {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-shrink: 0;
    }

    .map-header-strip h2 {
      font-family: 'Cinzel', serif;
      font-size: 13pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }

    .map-header-strip p {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.2pt;
      font-style: italic;
      color: #475569;
      margin: 1px 0 0 0;
    }

    .atlas-maps-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 7px 10px;
      flex: 1;
      min-height: 0;
    }

    .atlas-map-card {
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      background: #f8fafc;
      padding: 5px 7px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
      box-sizing: border-box;
    }

    .atlas-map-header {
      margin-bottom: 2.5px;
      flex-shrink: 0;
    }

    .atlas-map-title-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }

    .atlas-map-badge {
      font-size: 6.4pt;
      font-weight: 800;
      color: #ffffff;
      background: #1e3a8a;
      padding: 1px 5px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .atlas-map-title {
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      white-space: normal;
      line-height: 1.2;
    }

    .atlas-map-img-box {
      width: 100%;
      flex: 1;
      min-height: 0;
      border: 1px solid #cbd5e1;
      border-radius: 2.5px;
      overflow: hidden;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
    }

    .atlas-map-img-box img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }

    .atlas-map-caption {
      font-size: 6.6pt;
      line-height: 1.30;
      color: #334155;
      margin-top: 3px;
      flex-shrink: 0;
    }

    .atlas-map-caption strong {
      color: #0f172a;
    }

    /* ==========================================================================
       PAGES 4–23: 10 DOUBLE-PAGE SPREADS (VERSO & RECTO)
       ========================================================================== */
    /* Verso (Left Page) Specifics */
    .verso-banner {
      margin-bottom: 5px;
      flex-shrink: 0;
    }

    .enquiry-pill {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 2.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 2px;
    }

    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 13.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 1px 0;
      line-height: 1.15;
    }

    .enquiry-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.8pt;
      font-style: italic;
      color: #475569;
      margin: 0 0 4px 0;
    }

    .enquiry-question-card {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 3.5px solid #1e3a8a;
      padding: 3px 8px;
      border-radius: 3px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .enquiry-question-label {
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    .enquiry-question-text {
      font-family: 'Playfair Display', serif;
      font-size: 8.8pt;
      font-style: italic;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    /* Primary Source Card (Verso) */
    .source-card {
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      background: #f8fafc;
      padding: 5px 6.5px;
      margin-top: 4px;
      display: flex;
      flex-direction: column;
    }

    .source-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
    }

    .source-letter-tag {
      background: #0f172a;
      color: #ffffff;
      font-size: 6.6pt;
      font-weight: 800;
      padding: 1px 4.5px;
      border-radius: 2px;
      text-transform: uppercase;
    }

    .source-type-tag {
      font-size: 6.5pt;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
    }

    .source-img-wrap {
      width: 100%;
      height: 58mm;
      border: 1px solid #475569;
      border-radius: 2.5px;
      overflow: hidden;
      margin-bottom: 3px;
      background: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .source-img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }

    .source-caption {
      font-size: 6.8pt;
      line-height: 1.30;
      color: #334155;
      font-style: italic;
      margin: 0;
    }

    .source-citation {
      font-size: 6.2pt;
      color: #64748b;
      font-style: normal;
      margin-top: 1.5px;
    }

    /* Think & Discuss Card (Verso) - Pedagogical Hinge Card without printed answers */
    .discuss-card {
      background: #fefce8;
      border: 1.5px solid #fef08a;
      border-left: 3.5px solid #ca8a04;
      border-radius: 3.5px;
      padding: 6px 9px;
      margin-top: 5px;
    }

    .discuss-header {
      font-size: 7.4pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 3.5px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .discuss-hinge {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.8pt;
      font-weight: 700;
      color: #1e293b;
      line-height: 1.36;
      margin: 0;
    }

    /* Recto (Right Page) Specifics */
    .recto-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }

    .recto-content-top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 5px;
    }

    /* Full-Width Straddle Source B Card (Recto) */
    .recto-straddle-card {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      padding: 5px 8px;
      margin-bottom: 5px;
      display: flex;
      flex-direction: column;
    }

    .straddle-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3.5px;
      padding-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
    }

    .straddle-body {
      display: flex;
      gap: 10px;
      align-items: stretch;
    }

    .straddle-img-wrap {
      height: 56mm;
      border: 1px solid #475569;
      border-radius: 2.5px;
      overflow: hidden;
      background: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .straddle-img-wrap.landscape {
      width: 90mm;
    }

    .straddle-img-wrap.portrait {
      width: 48mm;
    }

    .straddle-img-wrap.square {
      width: 58mm;
    }

    .straddle-img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }

    .straddle-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
    }

    .straddle-caption {
      font-size: 7.2pt;
      line-height: 1.32;
      color: #1e293b;
      margin: 0 0 3px 0;
    }

    .straddle-observations-box {
      background: #f1f5f9;
      border-left: 2.5px solid #2563eb;
      padding: 3px 6px;
      border-radius: 2px;
      margin-bottom: 3px;
    }

    .straddle-obs-title {
      font-size: 6.6pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 2px;
    }

    .straddle-obs-list {
      margin: 0;
      padding-left: 12px;
      font-size: 6.6pt;
      line-height: 1.28;
      color: #334155;
    }

    .straddle-obs-list li {
      margin-bottom: 1.5px;
    }

    .straddle-citation {
      font-size: 6.2pt;
      color: #64748b;
      font-style: normal;
      margin-top: 1px;
    }

    .recto-theme-pill,
    .recto-mechanism-pill {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 800;
      padding: 1.5px 7px;
      border-radius: 3px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* Vocabulary Box */
    .vocab-box {
      border: 1.5px solid #e2e8f0;
      border-radius: 4px;
      background: #fdfbf7;
      padding: 6px 9px;
      margin-bottom: 5px;
    }

    .vocab-title {
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .vocab-item {
      font-size: 7.6pt;
      line-height: 1.32;
      color: #334155;
      margin-bottom: 3.5px;
    }

    .vocab-term {
      font-weight: 800;
      color: #1e3a8a;
    }

    .recto-context-box {
      background: #f1f5f9;
      border: 1.5px solid #cbd5e1;
      border-radius: 4px;
      padding: 6px 8px;
      font-size: 7.4pt;
      line-height: 1.36;
      color: #334155;
    }

    /* Bottom Quick Retrieval Strip */
    .retrieval-strip {
      background: #f8fafc;
      border: 1.5px solid #0f172a;
      border-radius: 4px;
      padding: 6px 10px;
      margin-top: 6px;
      flex-shrink: 0;
    }

    .retrieval-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 4px;
    }

    .retrieval-title {
      font-size: 7.4pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .retrieval-tagline {
      font-size: 6.5pt;
      color: #64748b;
      font-weight: 600;
    }

    .retrieval-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5px 12px;
    }

    .retrieval-q-item {
      font-size: 7.6pt;
      line-height: 1.30;
      color: #1e293b;
    }

    .retrieval-q-num {
      font-weight: 800;
      color: #1e3a8a;
    }

    .retrieval-options {
      color: #64748b;
      font-size: 6.8pt;
      margin-top: 1px;
    }

    /* Page-specific balance overrides */
    #page-21 .recto-content-top {
      margin-bottom: 3px;
    }
    #page-21 .prose-text {
      font-size: 10.75pt;
      line-height: 1.45;
    }
    #page-21 .recto-straddle-card {
      margin-bottom: 3px;
      padding: 4px 7px;
    }
    #page-21 .straddle-img-wrap {
      height: 45mm;
    }
    #page-21 .retrieval-strip {
      margin-top: 4px;
      padding: 4px 8px;
    }

    /* ==========================================================================
       PAGE 24: MASTER RETRIEVAL QUIZ BACK COVER
       ========================================================================== */
    .quiz-page-header {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }

    .quiz-page-title {
      font-family: 'Cinzel', serif;
      font-size: 14.5pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      letter-spacing: 0.04em;
    }

    .quiz-page-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.5pt;
      font-style: italic;
      color: #475569;
      margin-top: 1px;
    }

    .quiz-instructions-banner {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-radius: 4px;
      padding: 4px 10px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #1e3a8a;
      flex-shrink: 0;
    }

    .quiz-grid-10cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 12px;
      flex: 1;
    }

    .quiz-card {
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-radius: 3.5px;
      padding: 4px 7px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 2px;
      box-sizing: border-box;
    }

    .quiz-card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 2px;
      gap: 6px;
    }

    .quiz-card-topic {
      font-size: 6.8pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      line-height: 1.20;
      white-space: normal;
      overflow: visible;
    }

    .quiz-card-ref {
      font-size: 6.2pt;
      font-weight: 700;
      color: #1e3a8a;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .quiz-card-list {
      display: flex;
      flex-direction: column;
      gap: 2.5px;
    }

    .quiz-card-q {
      font-size: 7.1pt;
      line-height: 1.26;
      color: #1e293b;
    }

    .quiz-card-q strong {
      color: #1e3a8a;
    }
  </style>
</head>
<body>

  <!-- ========================================================================
       PAGE 1: MASTER FRONT COVER
       ======================================================================== -->
  <div class="page" id="page-1">
    <div class="cover-top-masthead">
      <div class="cover-series">THE HISTORY REVISION HUB • HISTORICAL ENQUIRY SERIES</div>
      <div class="cover-sub-series">KEY STAGE 2 MASTER CLASSROOM TEXTBOOK • 1939–1945</div>
    </div>

    <div class="cover-title-block">
      <span class="cover-date-pill">1939–1945 • COMPLETE NARRATIVE &amp; EVIDENCE ANTHOLOGY</span>
      <h1 class="cover-main-title">World War II &amp; The Home Front</h1>
      <div class="cover-subtitle">Civilian Mobilisation, Operation Pied Piper, The Blitz, Resistance &amp; Post-War Legacy</div>
      <div class="cover-overarching-box">
        <span class="cover-overarching-label">OVERARCHING HISTORICAL ENQUIRY</span>
        <div class="cover-overarching-question">&ldquo;How did World War II transform children's lives in Britain and Europe?&rdquo;</div>
      </div>
    </div>

    <div class="cover-hero-wrap">
      <img class="cover-hero-img" src="${heroImageBase64 || ''}" alt="British school children evacuees 1939" />
    </div>
    <div class="cover-hero-caption">
      Children from London evacuated to the English countryside during Operation Pied Piper, September 1939 (The National Archives).
    </div>

    <div class="cover-overview-box">
      <div class="cover-overview-header">
        <span class="cover-overview-title">📖 THE STORY OF THE HOME FRONT • HISTORICAL OVERVIEW</span>
        <span class="cover-overview-period">1939–1945</span>
      </div>
      <p class="cover-overview-text">${canonicalOverviewP1}</p>
      <p class="cover-overview-text">${canonicalOverviewP2}</p>
    </div>

    <div class="cover-directory">
      <div class="cover-directory-heading">
        <span>THE TEN HISTORICAL ENQUIRIES • WHAT WILL WE INVESTIGATE?</span>
        <span>SCHEME OF LEARNING • DOUBLE-PAGE SPREADS (PP. 4–23)</span>
      </div>
      <div class="cover-directory-grid">
        ${unitData.lessons
          .map((l, idx) => {
            const numPill = (idx + 1 < 10 ? '0' : '') + (idx + 1);
            const cleanTitle = l.title.replace(/^Enquiry \d+:\s*/i, '');
            const pageSpan = `pp. ${4 + idx * 2}–${5 + idx * 2}`;
            return `
          <div class="directory-card-v2">
            <div class="dir-card-header">
              <span class="dir-card-pill">ENQUIRY ${numPill}</span>
              <span class="dir-card-pages">${pageSpan}</span>
            </div>
            <div class="dir-card-title">${cleanTitle}</div>
            <div class="dir-card-question">&ldquo;${l.enquiryQuestion}&rdquo;</div>
          </div>
        `;
          })
          .join('')}
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • 24-Page Saddle-Stitch Classroom Anthology</span>
      <span class="page-pill">Page 1</span>
    </div>
  </div>

  <!-- ========================================================================
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE
       ======================================================================== -->
  <div class="page" id="page-2">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 HISTORY</span>
      <span class="sub-badge">MASTER CHRONOLOGICAL MILESTONE SPINE &nbsp;|&nbsp; 1938–1945</span>
    </div>

    <div class="spine-header-block">
      <h2 class="spine-main-title">The Chronological Milestone Spine (1938–1945)</h2>
      <div class="spine-subtitle">Twelve Decisive Turning Points, Causal Links &amp; Defining Home Front Milestones</div>
    </div>

    <div class="milestone-timeline">
      ${milestones
        .map(
          (m) => `
        <div class="milestone-item">
          <div class="milestone-date-box">${m.date}</div>
          <div class="milestone-node"></div>
          <div class="milestone-content">
            <div class="milestone-top-row">
              <span class="milestone-title">${m.title}</span>
            </div>
            <p class="milestone-desc">${m.desc}</p>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • Fifteen Landmark Milestones of the Conflict</span>
      <span class="page-pill">Page 2</span>
    </div>
  </div>

  <!-- ========================================================================
       PAGE 3: DEDICATED CARTOGRAPHIC ATLAS (4-MAP HISTORICAL GRID)
       ======================================================================== -->
  <div class="page" id="page-3">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 HISTORY</span>
      <span class="sub-badge">HISTORICAL ATLAS &amp; GEOGRAPHICAL PERSPECTIVES &nbsp;|&nbsp; 1938–1945</span>
    </div>

    <div class="map-header-strip">
      <div>
        <h2>Wartime Geography &amp; Historical Maps (1938–1945)</h2>
        <p>Four Primary Cartographic Records of Evacuation, Rescue, Bombing &amp; Convoys</p>
      </div>
      <span style="font-size: 7.2pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase;">Historical Atlas</span>
    </div>

    <div class="atlas-maps-grid">
      <!-- MAP 1: BRITISH HOME FRONT EVACUATION -->
      <div class="atlas-map-card">
        <div class="atlas-map-header">
          <div class="atlas-map-title-wrap">
            <span class="atlas-map-badge">MAP 1</span>
            <span class="atlas-map-title">British Evacuation &amp; Reception Zones (1939)</span>
          </div>
        </div>
        <div class="atlas-map-img-box">
          <img src="${mapEvacBase64 || ''}" alt="British Evacuation Map 1939" />
        </div>
        <div class="atlas-map-caption">
          <strong>Operation Pied Piper:</strong> Urban evacuation zones (London, Birmingham, Manchester, Liverpool) and rural reception havens (Wales, Devon, Cornwall, East Anglia).
        </div>
      </div>

      <!-- MAP 2: KINDERTRANSPORT EUROPEAN LIFELINES -->
      <div class="atlas-map-card">
        <div class="atlas-map-header">
          <div class="atlas-map-title-wrap">
            <span class="atlas-map-badge">MAP 2</span>
            <span class="atlas-map-title">The Kindertransport European Lifelines (1938–1939)</span>
          </div>
        </div>
        <div class="atlas-map-img-box">
          <img src="${mapKinderBase64 || ''}" alt="Kindertransport Route Map" />
        </div>
        <div class="atlas-map-caption">
          <strong>Continental Lifelines:</strong> Railway corridors from Prague, Vienna, and Berlin across Germany and the Netherlands to Hook of Holland ferry, Harwich, and London.
        </div>
      </div>

      <!-- MAP 3: THE LONDON BLITZ BOMB DENSITY -->
      <div class="atlas-map-card">
        <div class="atlas-map-header">
          <div class="atlas-map-title-wrap">
            <span class="atlas-map-badge">MAP 3</span>
            <span class="atlas-map-title">Density of Bombing: London Region (1940–1941)</span>
          </div>
        </div>
        <div class="atlas-map-img-box">
          <img src="${mapBlitzBase64 || ''}" alt="London Blitz Bomb Density Map" />
        </div>
        <div class="atlas-map-caption">
          <strong>Ministry of Home Security Plot:</strong> Official archival survey of bomb strikes. Dark red zones along Thames docks sustained up to 256 high-explosive bombs per sq km.
        </div>
      </div>

      <!-- MAP 4: ATLANTIC SHIPPING CONVOYS -->
      <div class="atlas-map-card">
        <div class="atlas-map-header">
          <div class="atlas-map-title-wrap">
            <span class="atlas-map-badge">MAP 4</span>
            <span class="atlas-map-title">The Atlantic Lifeline &amp; Supply Convoys (1939–1945)</span>
          </div>
        </div>
        <div class="atlas-map-img-box">
          <img src="${mapAtlanticBase64 || ''}" alt="Battle of the Atlantic Lifeline Map" />
        </div>
        <div class="atlas-map-caption">
          <strong>Transatlantic Lifeline:</strong> Merchant shipping routes supplying 70% of Britain's food and fuel, guarded by Allied escorts against German submarine wolf packs.
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • Strategic Geography &amp; Wartime Topography</span>
      <span class="page-pill">Page 3</span>
    </div>
  </div>

  <!-- ========================================================================
       PAGES 4–23: 10 DOUBLE-PAGE SPREADS (ENQUIRIES 1–10)
       ======================================================================== -->
  ${unitData.lessons
    .map((lesson, idx) => {
      const versoPageNum = 4 + idx * 2;
      const rectoPageNum = 5 + idx * 2;
      const enquiryNumStr = (idx + 1 < 10 ? '0' : '') + (idx + 1);

      const b1 = lesson.narrative_blocks[0];
      const b2 = lesson.narrative_blocks[1];
      const b3 = lesson.narrative_blocks[2];

      const sourceA = b1.source;
      const imgABase64 = getBase64Image(sourceA.image);
      const sourceADims = getImageDimensions(sourceA.image);
      const sourceAType = SOURCE_A_TYPES[idx] || sourceA.type || 'Primary Historical Photograph';

      const rectoMeta = RECTO_EDITORIAL[idx];
      const imgBBase64 = getBase64Image(rectoMeta.sourceB.image);
      const sourceBDims = getImageDimensions(rectoMeta.sourceB.image);

      return `
    <!-- VERSO: PAGE ${versoPageNum} (ENQUIRY ${enquiryNumStr} • PART I) -->
    <div class="page" id="page-${versoPageNum}">
      <div class="running-header">
        <span>THE HISTORY REVISION HUB • KEY STAGE 2 HISTORY</span>
        <span>Enquiry ${enquiryNumStr} • Part I &nbsp;|&nbsp; Page ${versoPageNum}</span>
      </div>

      <div class="verso-banner">
        <span class="enquiry-pill">ENQUIRY ${enquiryNumStr} • HISTORICAL INVESTIGATION</span>
        <h2 class="enquiry-title">${lesson.title.replace(/^Enquiry \d+:\s*/i, '')}</h2>
        <div class="enquiry-subtitle">${DISTINCT_SUBTITLES[idx] || lesson.subtitle}</div>
        <div class="enquiry-question-card">
          <span class="enquiry-question-label">Key Enquiry Question:</span>
          <span class="enquiry-question-text">&ldquo;${lesson.enquiryQuestion}&rdquo;</span>
        </div>
      </div>

      <div class="content-grid-2col">
        <!-- Col 1: Act 1 Prose + Source A -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="act-header" style="margin-top: 0;">
              <span class="act-num">[${idx + 1}.1]</span>
              <span>${b1.title}</span>
            </div>
            <p class="prose-text">${cleanProse(b1.text)}</p>
          </div>

          <!-- Primary Source Card in Col 1 -->
          <div class="source-card">
            <div class="source-header-row">
              <span class="source-letter-tag">Source A</span>
              <span class="source-type-tag">${sourceAType}</span>
            </div>
            <div class="source-img-wrap ${sourceADims.isPortrait ? 'portrait' : 'landscape'}">
              <img class="source-img" src="${imgABase64 || ''}" alt="${sourceA.caption || 'Historical source'}" />
            </div>
            <p class="source-caption">${sourceA.caption || ''}</p>
            <div class="source-citation">${sourceA.citation || ''}</div>
          </div>
        </div>

        <!-- Col 2: Act 2 Prose + Think & Discuss (Clean Hinge Question - Zero Answers Given!) -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="act-header" style="margin-top: 0;">
              <span class="act-num">[${idx + 1}.2]</span>
              <span>${b2.title}</span>
            </div>
            <p class="prose-text">${cleanProse(b2.text)}</p>
          </div>

          <!-- Think & Discuss Card in Col 2 (Zero bullet answers, zero protocol clutter!) -->
          <div class="discuss-card">
            <div class="discuss-header">
              <span>💭 THINK &amp; DISCUSS</span>
            </div>
            <div class="discuss-hinge">${sourceA.hinge_question || ''}</div>
          </div>
        </div>
      </div>

      <div class="running-footer">
        <span>World War II &amp; The Home Front (1939–1945) • Key Stage 2 Historical Enquiry</span>
        <span class="page-pill">Page ${versoPageNum}</span>
      </div>
    </div>

    <!-- RECTO: PAGE ${rectoPageNum} (ENQUIRY ${enquiryNumStr} • PART II) -->
    <div class="page" id="page-${rectoPageNum}">
      <div class="running-header">
        <span>WORLD WAR II &amp; THE HOME FRONT (1939–1945)</span>
        <span>Enquiry ${enquiryNumStr} • Part II &nbsp;|&nbsp; Page ${rectoPageNum}</span>
      </div>

      <div class="recto-banner">
        <span class="recto-theme-pill">DECISIVE HISTORICAL MECHANISM</span>
        <span style="font-size: 7.4pt; color: #1e3a8a; font-weight: 800; text-transform: uppercase;">${rectoMeta.mechanism}</span>
      </div>

      <!-- Top Section: 2-Column Grid (Act 3 Narrative & Vocabulary/Context) -->
      <div class="recto-content-top">
        <!-- Col 1: Act 3 Prose -->
        <div>
          <div class="act-header" style="margin-top: 0;">
            <span class="act-num">[${idx + 1}.3]</span>
            <span>${b3.title}</span>
          </div>
          <p class="prose-text" style="margin-bottom: 0;">${cleanProse(b3.text)}</p>
        </div>

        <!-- Col 2: Key Vocabulary + Historical Context Card -->
        <div>
          <div class="vocab-box" style="margin-bottom: 4px;">
            <div class="vocab-title">
              <span>📖 Key Enquiry Vocabulary</span>
            </div>
            ${(lesson.vocab || [])
              .map(
                (v) => `
              <div class="vocab-item">
                <span class="vocab-term">${v.term}:</span> ${v.definition}
              </div>
            `,
              )
              .join('')}
          </div>

          <div class="recto-context-box">
            <strong style="color: #0f172a; text-transform: uppercase; font-size: 7pt; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">${rectoMeta.contextTitle}</strong>
            ${rectoMeta.contextText}
          </div>
        </div>
      </div>

      <!-- Middle Section: Full-Width Straddle Primary Source B Card -->
      <div class="recto-straddle-card">
        <div class="straddle-header-row">
          <div style="display: flex; align-items: center; gap: 5px;">
            <span class="source-letter-tag">Source B</span>
            <span class="source-type-tag">${rectoMeta.sourceB.type}</span>
          </div>
          <span style="font-size: 6.4pt; color: #475569; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;">${rectoMeta.sourceB.badge || 'PRIMARY ARCHIVAL EVIDENCE'}</span>
        </div>
        <div class="straddle-body">
          <div class="straddle-img-wrap ${sourceBDims.isPortrait ? 'portrait' : sourceBDims.isSquare ? 'square' : 'landscape'}">
            <img class="straddle-img" src="${imgBBase64 || ''}" alt="${rectoMeta.sourceB.caption}" />
          </div>
          <div class="straddle-info">
            <p class="straddle-caption">${rectoMeta.sourceB.caption}</p>
            <div class="straddle-observations-box">
              <div class="straddle-obs-title">Archival Source Analysis • Key Visual Features:</div>
              <ul class="straddle-obs-list">
                ${(rectoMeta.sourceB.observations || []).map((obs) => `<li>${obs}</li>`).join('')}
              </ul>
            </div>
            <div class="straddle-citation">${rectoMeta.sourceB.citation}</div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Quick Retrieval Strip Across Bottom -->
      <div class="retrieval-strip">
        <div class="retrieval-header-row">
          <span class="retrieval-title">Check Your Understanding • Quick Retrieval</span>
          <span class="retrieval-tagline">Test recall with a partner • Answers verified in narrative above</span>
        </div>
        <div class="retrieval-grid">
          ${(lesson.quiz || [])
            .map(
              (q, qIdx) => `
            <div class="retrieval-q-item">
              <span class="retrieval-q-num">Q${qIdx + 1}.</span> <strong>${q.q}</strong>
              <div class="retrieval-options">
                ${q.options.map((opt, oIdx) => `[${String.fromCharCode(65 + oIdx)}] ${opt}`).join(' &nbsp;•&nbsp; ')}
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <div class="running-footer">
        <span>The History Revision Hub • Master Classroom Anthology</span>
        <span class="page-pill">Page ${rectoPageNum}</span>
      </div>
    </div>
    `;
    })
    .join('')}

  <!-- ========================================================================
       PAGE 24: MASTER KNOWLEDGE RETRIEVAL QUIZ BACK COVER
       ======================================================================== -->
  <div class="page" id="page-24">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 HISTORY</span>
      <span class="sub-badge">MASTER KNOWLEDGE RETRIEVAL &nbsp;|&nbsp; 40 ESSENTIAL QUESTIONS</span>
    </div>

    <div class="quiz-page-header">
      <h2 class="quiz-page-title">Master Knowledge Retrieval Quiz</h2>
      <div class="quiz-page-subtitle">Forty Core Recall Questions Across All Ten Home Front Enquiries</div>
    </div>

    <div class="quiz-instructions-banner">
      <span><strong>PARTNER QUIZ &amp; INDEPENDENT RECALL:</strong> Close all preceding pages. Work independently or test a revision partner orally.</span>
      <span><strong>Answers verified on pp. 4–23</strong></span>
    </div>

    <div class="quiz-grid-10cards">
      ${unitData.lessons
        .map((lesson, idx) => {
          const cleanTopic = lesson.title.replace(/^Enquiry \d+:\s*/i, '');
          return `
        <div class="quiz-card">
          <div class="quiz-card-header">
            <span class="quiz-card-topic">Enquiry ${idx + 1}: ${cleanTopic}</span>
            <span class="quiz-card-ref">pp. ${4 + idx * 2}–${5 + idx * 2} • [${idx + 1}.1–${idx + 1}.6]</span>
          </div>
          <div class="quiz-card-list">
            ${lesson.quiz
              .map(
                (q, qIdx) => `
              <div class="quiz-card-q">
                <strong>Q${idx * 4 + qIdx + 1}.</strong> ${q.q}
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      `;
        })
        .join('')}
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • Forty Essential Recall Questions &amp; Final Assessment</span>
      <span class="page-pill">Page 24</span>
    </div>
  </div>

  <script>
    // Automated Typography & Space-Budget Engine for KS2 WW2 24-Page Textbook Standard
    function autoFitCoverEnquiries() {
      const p1 = document.querySelector('#page-1');
      const dir = document.querySelector('#page-1 .cover-directory');
      const footer = document.querySelector('#page-1 .running-footer');
      const cards = Array.from(document.querySelectorAll('#page-1 .directory-card-v2'));
      const titles = Array.from(document.querySelectorAll('#page-1 .dir-card-title'));
      const questions = Array.from(document.querySelectorAll('#page-1 .dir-card-question'));
      if (!p1 || !dir || !footer || !cards.length) return;

      const footerTop = footer.getBoundingClientRect().top;
      let bestFs = 6.8;

      for (let fs = 6.4; fs <= 8.6; fs += 0.1) {
        titles.forEach(t => {
          t.style.fontSize = (fs + 1.2).toFixed(1) + 'pt';
        });
        questions.forEach(q => {
          q.style.fontSize = fs.toFixed(1) + 'pt';
          q.style.lineHeight = (fs * 0.16 + 0.16).toFixed(2);
        });

        const dirBottom = dir.getBoundingClientRect().bottom;
        if (dirBottom <= footerTop - 5 && p1.scrollHeight <= p1.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }

      titles.forEach(t => {
        t.style.fontSize = (bestFs + 1.2).toFixed(1) + 'pt';
      });
      questions.forEach(q => {
        q.style.fontSize = bestFs.toFixed(1) + 'pt';
        q.style.lineHeight = (bestFs * 0.16 + 0.16).toFixed(2);
      });
      return bestFs;
    }

    function autoFitSpreadTypography() {
      document.querySelectorAll('.page').forEach(page => {
        const pageId = page.id || '';
        const m = pageId.match(/^page-(\d+)$/);
        if (!m) return;
        const pageNum = parseInt(m[1], 10);
        if (pageNum < 4 || pageNum > 23) return;

        const footer = page.querySelector('.running-footer');
        if (!footer) return;
        const footerTop = footer.getBoundingClientRect().top;
        const paragraphs = Array.from(page.querySelectorAll('.prose-text'));
        if (!paragraphs.length) return;

        let currentFs = parseFloat(window.getComputedStyle(paragraphs[0]).fontSize) * 0.75;
        let iterations = 0;

        // Downscale if overflow
        while (page.scrollHeight > page.clientHeight && currentFs > 8.8 && iterations < 30) {
          currentFs -= 0.15;
          paragraphs.forEach(p => {
            p.style.fontSize = currentFs.toFixed(2) + 'pt';
            p.style.lineHeight = (1.30 + currentFs * 0.015).toFixed(2);
          });
          iterations++;
        }

        // Upscale if underfilled
        const lastEl = page.querySelector('.retrieval-strip') || page.querySelector('.discuss-card') || paragraphs[paragraphs.length - 1];
        let clearance = footerTop - (lastEl ? lastEl.getBoundingClientRect().bottom : footerTop);

        if (clearance > 22 && page.scrollHeight <= page.clientHeight) {
          let bestUpFs = currentFs;
          for (let testFs = currentFs; testFs <= 12.0; testFs += 0.15) {
            paragraphs.forEach(p => {
              p.style.fontSize = testFs.toFixed(2) + 'pt';
              p.style.lineHeight = (1.30 + testFs * 0.015).toFixed(2);
            });
            const newClearance = footerTop - (lastEl ? lastEl.getBoundingClientRect().bottom : footerTop);
            if (page.scrollHeight <= page.clientHeight && newClearance >= 5) {
              bestUpFs = testFs;
            } else {
              break;
            }
          }
          paragraphs.forEach(p => {
            p.style.fontSize = bestUpFs.toFixed(2) + 'pt';
            p.style.lineHeight = (1.30 + bestUpFs * 0.015).toFixed(2);
          });
        }
      });
    }

    function autoFitQuizTypography() {
      const p24 = document.querySelector('#page-24');
      const footer = document.querySelector('#page-24 .running-footer');
      const cards = Array.from(document.querySelectorAll('#page-24 .quiz-card'));
      const questions = Array.from(document.querySelectorAll('#page-24 .quiz-card-q'));
      if (!p24 || !footer || !cards.length) return;

      const footerTop = footer.getBoundingClientRect().top;
      let currentFs = 7.1;

      // Downscale if overflow
      while (p24.scrollHeight > p24.clientHeight && currentFs > 5.8) {
        currentFs -= 0.1;
        questions.forEach(q => {
          q.style.fontSize = currentFs.toFixed(2) + 'pt';
          q.style.lineHeight = (currentFs * 0.17 + 0.05).toFixed(2);
        });
      }

      // Upscale if underfilled
      const grid = document.querySelector('#page-24 .quiz-grid-10cards');
      if (grid) {
        const gridBottom = grid.getBoundingClientRect().bottom;
        const clearance = footerTop - gridBottom;
        if (clearance > 15 && p24.scrollHeight <= p24.clientHeight) {
          for (let testFs = currentFs; testFs <= 7.8; testFs += 0.1) {
            questions.forEach(q => {
              q.style.fontSize = testFs.toFixed(2) + 'pt';
              q.style.lineHeight = (testFs * 0.17 + 0.05).toFixed(2);
            });
            const newClearance = footerTop - grid.getBoundingClientRect().bottom;
            if (p24.scrollHeight <= p24.clientHeight && newClearance >= 4) {
              currentFs = testFs;
            } else {
              break;
            }
          }
          questions.forEach(q => {
            q.style.fontSize = currentFs.toFixed(2) + 'pt';
            q.style.lineHeight = (currentFs * 0.17 + 0.05).toFixed(2);
          });
        }
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      autoFitCoverEnquiries();
      autoFitSpreadTypography();
      autoFitQuizTypography();
    });

    window.autoFitCoverEnquiries = autoFitCoverEnquiries;
    window.autoFitSpreadTypography = autoFitSpreadTypography;
    window.autoFitQuizTypography = autoFitQuizTypography;
  </script>
</body>
</html>`;
}

async function renderTextbook() {
  console.log('Building 24-Page Master Classroom Textbook HTML for KS2 WWII...');
  const html = buildHtml();

  const outHtmlPublic = path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2', 'textbook.html');
  const outHtmlUnits = path.join(ROOT_DIR, 'units', 'ks2_ww2', 'textbook.html');
  fs.writeFileSync(outHtmlPublic, html, 'utf8');
  fs.writeFileSync(outHtmlUnits, html, 'utf8');
  console.log(`Saved HTML to:\n  -> ${outHtmlPublic}\n  -> ${outHtmlUnits}`);

  const chromePath = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  ].find((p) => p && fs.existsSync(p));

  console.log('Launching Puppeteer with executable:', chromePath || 'default');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.goto('file:///' + outHtmlPublic.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  // Execute dynamic auto-fit engine
  await page.evaluate(() => {
    if (window.autoFitCoverEnquiries) window.autoFitCoverEnquiries();
    if (window.autoFitSpreadTypography) window.autoFitSpreadTypography();
    if (window.autoFitQuizTypography) window.autoFitQuizTypography();
  });

  // Capture calibrated HTML and write back to disk
  const calibratedHtml = await page.content();
  fs.writeFileSync(outHtmlPublic, calibratedHtml, 'utf8');
  fs.writeFileSync(outHtmlUnits, calibratedHtml, 'utf8');

  // Run DOM budget audit across all 24 pages
  console.log('\n--- EXECUTING AUTOMATED PAGE-BUDGET AUDIT ACROSS ALL 24 PAGES ---');
  const auditReport = await auditPageBudget(page, {
    pageSelector: '.page',
    maxGapAboveFooterPx: 25,
    underflowThresholdPx: 40,
    minUtilizationPct: 85,
  });

  printSpaceAuditReport(auditReport);

  // Measure precise scrollHeight vs clientHeight per page
  const pageMetrics = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    return pages.map((el, i) => {
      const sh = el.scrollHeight;
      const ch = el.clientHeight;
      const overflow = sh - ch;
      return { pageNum: i + 1, id: el.id, scrollHeight: sh, clientHeight: ch, overflow };
    });
  });

  console.log('\n--- DETAILED PER-PAGE OVERFLOW METRICS ---');
  let hasOverflow = false;
  pageMetrics.forEach((m) => {
    const status = m.overflow <= 2 ? '✅ FIT' : '❌ OVERFLOW';
    if (m.overflow > 2) hasOverflow = true;
    console.log(
      `  Page ${m.pageNum.toString().padStart(2, ' ')} (${m.id}): scrollHeight=${m.scrollHeight}, clientHeight=${m.clientHeight}, overflow=${m.overflow}px -> ${status}`,
    );
  });

  // Capture preview screenshots of selected key pages
  console.log('\nCapturing multi-page preview screenshots...');
  const keyPages = [1, 2, 3, 4, 5, 7, 9, 10, 12, 14, 15, 19, 21, 24];
  for (const pNum of keyPages) {
    const pageEl = await page.$(`#page-${pNum}`);
    if (pageEl) {
      const snapPath = path.join(ROOT_DIR, 'scratch', `ks2_ww2_textbook_p${pNum}.png`);
      await pageEl.screenshot({ path: snapPath });
      console.log(`  -> Captured Page ${pNum} preview: scratch/ks2_ww2_textbook_p${pNum}.png`);
    }
  }

  // Compile print-ready PDF
  console.log('\nCompiling print-ready PDF...');
  const pdfOutDir = path.join(ROOT_DIR, 'public', 'pdfs', 'ks2_ww2');
  if (!fs.existsSync(pdfOutDir)) fs.mkdirSync(pdfOutDir, { recursive: true });

  const pdfFinalV1 = path.join(ROOT_DIR, 'public', 'pdfs', 'ks2_ww2_textbook_FINAL_V1.pdf');
  const pdfUnitAlias = path.join(pdfOutDir, 'ks2_ww2_textbook.pdf');

  await page.pdf({
    path: pdfFinalV1,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  fs.copyFileSync(pdfFinalV1, pdfUnitAlias);
  console.log(`Saved print-ready PDF to:\n  -> ${pdfFinalV1}\n  -> ${pdfUnitAlias}`);

  await browser.close();

  if (hasOverflow) {
    console.error('\n⚠️ WARNING: Some pages experienced overflow. Layout adjustments required!');
  } else {
    console.log('\n🎉 ALL 24 PAGES CONFORM TO ZERO-OVERFLOW SADDLE-STITCH ARCHITECTURE!');
  }
}

renderTextbook().catch((err) => {
  console.error('Render failed:', err);
  process.exit(1);
});
