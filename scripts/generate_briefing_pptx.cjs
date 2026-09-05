const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '../public/briefings');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, 'ypres_2026_parent_briefing.pptx');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches
pptx.author = 'Mr Ben Lovett & Mr James Garrett';
pptx.company = 'Meoncross School & The History Boys';
pptx.title = 'Ypres 1914-1918 Battlefield Expedition - Parental Briefing';

const QR_PATH = path.join(__dirname, '../public/images/tour_app_qr.png');
const TABLET_PATH = path.join(__dirname, '../public/images/stubbington_memorial_2.jpg');
const LOWRY_PATH = path.join(__dirname, '../public/images/lowry_william.png');

// ==========================================
// SLIDE 1: THE MASTER BRIEFING DASHBOARD
// ==========================================
const s1 = pptx.addSlide();
s1.background = { color: 'F8FAFC' };

// Top Banner
s1.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 10,
  h: 1.15,
  fill: { color: '0F172A' },
});

s1.addText('YPRES 1914–1918: REMEMBRANCE, SACRIFICE & LOCAL HERITAGE', {
  x: 0.5,
  y: 0.12,
  w: 9.0,
  h: 0.35,
  fontSize: 18,
  fontFace: 'Georgia',
  color: 'F1F5F9',
  bold: true,
  letterSpacing: 1,
});

s1.addText(
  'Meoncross School History Department & The History Boys  ·  Mr Ben Lovett & Mr James Garrett',
  {
    x: 0.5,
    y: 0.47,
    w: 9.0,
    h: 0.28,
    fontSize: 11,
    fontFace: 'Arial',
    color: 'F59E0B',
    bold: true,
  },
);

s1.addText(
  'Thursday 1st October – Saturday 3rd October 2026   |   Expedition Base: Peace Village Hostel, Flanders',
  {
    x: 0.5,
    y: 0.77,
    w: 9.0,
    h: 0.25,
    fontSize: 10,
    fontFace: 'Arial',
    color: '94A3B8',
  },
);

// Card 1: Itinerary & Local Heritage (Left Column)
s1.addShape(pptx.ShapeType.roundRect, {
  x: 0.4,
  y: 1.35,
  w: 2.9,
  h: 3.65,
  r: 0.1,
  fill: { color: 'FFFFFF' },
  line: { color: 'CBD5E1', width: 1 },
});
s1.addShape(pptx.ShapeType.rect, {
  x: 0.4,
  y: 1.35,
  w: 2.9,
  h: 0.4,
  fill: { color: '1E3A8A' },
});
s1.addText('1. 3-DAY EXPEDITION ITINERARY', {
  x: 0.5,
  y: 1.42,
  w: 2.7,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: 'FFFFFF',
  bold: true,
});

s1.addText(
  [
    {
      text: 'Day 1: North Salient & Medical Triage\n',
      options: { bold: true, color: '0F172A', fontSize: 9.5 },
    },
    {
      text: '• 06:15 departure from Meoncross School.\n• Essex Farm ADS (John McCrae dugout).\n• Yorkshire Trench & Langemarck Cemetery.\n• Evening: Check-in & 2-course group dinner.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    {
      text: 'Day 2: Passchendaele & Menin Gate\n',
      options: { bold: true, color: '0F172A', fontSize: 9.5 },
    },
    {
      text: '• Vancouver Corner & Hooge Crater trenches.\n• Tyne Cot (finding our village fallen).\n• 20:00 Menin Gate Last Post & wreath laying.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    {
      text: 'Day 3: Ypres Town & Journey Home\n',
      options: { bold: true, color: '0F172A', fontSize: 9.5 },
    },
    {
      text: '• In Flanders Fields Museum (Cloth Hall).\n• Ramparts Walk & Talbot House (Poperinge).\n• Supermarket lunch stop & return approx 20:30.',
      options: { color: '334155', fontSize: 8.5 },
    },
  ],
  {
    x: 0.55,
    y: 1.85,
    w: 2.6,
    h: 3.05,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.05,
  },
);

// Card 2: Food, Money & Rooming (Center Column)
s1.addShape(pptx.ShapeType.roundRect, {
  x: 3.55,
  y: 1.35,
  w: 2.9,
  h: 3.65,
  r: 0.1,
  fill: { color: 'FFFFFF' },
  line: { color: 'CBD5E1', width: 1 },
});
s1.addShape(pptx.ShapeType.rect, {
  x: 3.55,
  y: 1.35,
  w: 2.9,
  h: 0.4,
  fill: { color: 'B45309' },
});
s1.addText('2. FOOD, MONEY & ROOMING', {
  x: 3.65,
  y: 1.42,
  w: 2.7,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: 'FFFFFF',
  bold: true,
});

s1.addText(
  [
    {
      text: 'Catering & Meals Provided:\n',
      options: { bold: true, color: '0F172A', fontSize: 9.5 },
    },
    {
      text: '• Thursday Day 1: Pupils MUST bring a packed lunch & coach snacks from home.\n• Full hot breakfast included (Fri & Sat mornings).\n• 2-course evening group dinners (Thu & Fri).\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    { text: 'Spending Money (Euros):\n', options: { bold: true, color: '0F172A', fontSize: 9.5 } },
    {
      text: '• Pupils need €20 to €30 in cash.\n• Used for supermarket lunch stops on Friday and Saturday (sandwiches/drinks) and souvenirs.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    { text: 'Accommodation & Rooming:\n', options: { bold: true, color: '0F172A', fontSize: 9.5 } },
    {
      text: '• Peace Village Hostel, Heuvelland.\n• En-suite rooms (3-4 pupils). Safe & secure.\n• Rooming process begins in TWO WEEKS with student preference forms. Staff room checks.',
      options: { color: '334155', fontSize: 8.5 },
    },
  ],
  {
    x: 3.7,
    y: 1.85,
    w: 2.6,
    h: 3.05,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.05,
  },
);

// Card 3: Kit Checklist & Action Items (Right Column)
s1.addShape(pptx.ShapeType.roundRect, {
  x: 6.7,
  y: 1.35,
  w: 2.9,
  h: 3.65,
  r: 0.1,
  fill: { color: 'FFFFFF' },
  line: { color: 'CBD5E1', width: 1 },
});
s1.addShape(pptx.ShapeType.rect, {
  x: 6.7,
  y: 1.35,
  w: 2.9,
  h: 0.4,
  fill: { color: '15803D' },
});
s1.addText('3. ESSENTIAL KIT & NEXT STEPS', {
  x: 6.8,
  y: 1.42,
  w: 2.7,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: 'FFFFFF',
  bold: true,
});

s1.addText(
  [
    {
      text: 'Essential Packing (Autumn in Flanders):\n',
      options: { bold: true, color: '0F172A', fontSize: 9.5 },
    },
    {
      text: '• Sturdy walking boots / waterproof shoes.\n• Waterproof hooded rain jacket & warm fleece.\n• Warm hat & gloves (vital for evening ceremony!).\n• Change of socks & casual clothes for dinner.\n• 1 medium holdall/case + 1 small daypack.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    { text: 'Travel Documents & Tech:\n', options: { bold: true, color: '0F172A', fontSize: 9.5 } },
    {
      text: '• Valid UK Passport (3+ months validity).\n• GHIC / EHIC health insurance card.\n• UK-to-EU 2-pin plug adapter for chargers.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    {
      text: 'Required Forms to Return:\n',
      options: { bold: true, color: '0F172A', fontSize: 9.5 },
    },
    {
      text: '• Code of Conduct Agreement.\n• Medical & Dietary Needs confirmation form.',
      options: { color: '334155', fontSize: 8.5 },
    },
  ],
  {
    x: 6.85,
    y: 1.85,
    w: 2.6,
    h: 3.05,
    fontFace: 'Arial',
    lineSpacingMultiple: 1.05,
  },
);

// Bottom Bar: QR Code & Live App Access
s1.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 5.1,
  w: 10,
  h: 0.525,
  fill: { color: '0F172A' },
});

if (fs.existsSync(QR_PATH)) {
  s1.addImage({ path: QR_PATH, x: 0.5, y: 5.12, w: 0.48, h: 0.48 });
}

s1.addText('LIVE INTERACTIVE FIELD GUIDE & APP:  meoncross-history.netlify.app', {
  x: 1.1,
  y: 5.16,
  w: 6.0,
  h: 0.2,
  fontSize: 10.5,
  fontFace: 'Arial',
  color: 'FFFFFF',
  bold: true,
});

s1.addText(
  'Scan QR or visit URL to view full 3-day itinerary, poetry anthology, audio guides & live family photo updates',
  {
    x: 1.1,
    y: 5.34,
    w: 7.2,
    h: 0.18,
    fontSize: 8.5,
    fontFace: 'Arial',
    color: '94A3B8',
  },
);

s1.addText('Emergency School Base: +44 1329 288339', {
  x: 7.3,
  y: 5.25,
  w: 2.5,
  h: 0.22,
  fontSize: 9,
  fontFace: 'Arial',
  color: 'F59E0B',
  bold: true,
  align: 'right',
});

// ==========================================
// SLIDE 2: COMPREHENSIVE KIT & LOGISTICS
// ==========================================
const s2 = pptx.addSlide();
s2.background = { color: 'F8FAFC' };

s2.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.9,
  fill: { color: '0F172A' },
});
s2.addText('DETAILED PACKING LIST & PRACTICAL CHECKLIST', {
  x: 0.6,
  y: 0.15,
  w: 8.8,
  h: 0.35,
  fontSize: 16,
  fontFace: 'Georgia',
  color: 'F1F5F9',
  bold: true,
});
s2.addText(
  'Preparation advice for autumn weather in the Flanders Salient · Meoncross History Department',
  {
    x: 0.6,
    y: 0.5,
    w: 8.8,
    h: 0.25,
    fontSize: 10,
    fontFace: 'Arial',
    color: 'F59E0B',
    bold: true,
  },
);

// 4 Box Grid
const boxWidth = 4.3;
const boxHeight = 1.95;

// Box 1: Footwear & Outerwear
s2.addShape(pptx.ShapeType.roundRect, {
  x: 0.6,
  y: 1.05,
  w: boxWidth,
  h: boxHeight,
  r: 0.08,
  fill: { color: 'FFFFFF' },
  line: { color: 'CBD5E1', width: 1 },
});
s2.addText('🥾 FOOTWEAR & WEATHER PROTECTION', {
  x: 0.8,
  y: 1.15,
  w: 3.9,
  h: 0.25,
  fontSize: 11,
  fontFace: 'Arial',
  color: '1E3A8A',
  bold: true,
});
s2.addText(
  [
    { text: '• Walking Boots / Shoes: ', options: { bold: true } },
    { text: 'Must be sturdy, comfortable & broken-in. Flanders mud can be slippery.\n' },
    { text: '• Waterproof Raincoat: ', options: { bold: true } },
    { text: 'Windproof with hood. We tour regardless of light rain.\n' },
    { text: '• Warm Fleece / Mid-layer: ', options: { bold: true } },
    { text: 'Temperatures drop quickly on exposed ridges.\n' },
    { text: '• Hat & Gloves: ', options: { bold: true } },
    { text: 'Crucial for standing still during the 8:00 PM Menin Gate ceremony.' },
  ],
  {
    x: 0.8,
    y: 1.42,
    w: 3.9,
    h: 1.45,
    fontSize: 9,
    fontFace: 'Arial',
    color: '334155',
    lineSpacingMultiple: 1.08,
  },
);

// Box 2: Luggage & Daily Bags
s2.addShape(pptx.ShapeType.roundRect, {
  x: 5.1,
  y: 1.05,
  w: boxWidth,
  h: boxHeight,
  r: 0.08,
  fill: { color: 'FFFFFF' },
  line: { color: 'CBD5E1', width: 1 },
});
s2.addText('🎒 LUGGAGE & DAYPACK RULES', {
  x: 5.3,
  y: 1.15,
  w: 3.9,
  h: 0.25,
  fontSize: 11,
  fontFace: 'Arial',
  color: 'B45309',
  bold: true,
});
s2.addText(
  [
    { text: '• 1 Main Holdall / Medium Suitcase: ', options: { bold: true } },
    { text: 'Goes underneath in coach hold until arrival at hostel.\n' },
    { text: '• 1 Small Daypack: ', options: { bold: true } },
    {
      text: 'Stays with student on coach. Contains waterproofs, water bottle, Day 1 packed lunch & phone.\n',
    },
    { text: '• Evening Clothes: ', options: { bold: true } },
    { text: 'Casual, clean clothing for restaurant dinners.\n' },
    { text: '• Nightwear & Washbag: ', options: { bold: true } },
    { text: 'Towel, toothbrush, roll-on deodorant (no aerosols).' },
  ],
  {
    x: 5.3,
    y: 1.42,
    w: 3.9,
    h: 1.45,
    fontSize: 9,
    fontFace: 'Arial',
    color: '334155',
    lineSpacingMultiple: 1.08,
  },
);

// Box 3: Documents, Health & Tech
s2.addShape(pptx.ShapeType.roundRect, {
  x: 0.6,
  y: 3.15,
  w: boxWidth,
  h: boxHeight,
  r: 0.08,
  fill: { color: 'FFFFFF' },
  line: { color: 'CBD5E1', width: 1 },
});
s2.addText('📄 DOCUMENTS, HEALTH & ELECTRONICS', {
  x: 0.8,
  y: 3.25,
  w: 3.9,
  h: 0.25,
  fontSize: 11,
  fontFace: 'Arial',
  color: '15803D',
  bold: true,
});
s2.addText(
  [
    { text: '• Valid UK Passport: ', options: { bold: true } },
    { text: 'Must have at least 3 months validity beyond 3rd Oct 2026.\n' },
    { text: '• GHIC / Valid EHIC Card: ', options: { bold: true } },
    { text: 'Essential for reciprocal medical coverage in Belgium.\n' },
    { text: '• Travel Adapter: ', options: { bold: true } },
    { text: 'Standard European 2-pin adapter for phone charging.\n' },
    { text: '• Mobile Phone Policy: ', options: { bold: true } },
    { text: 'Permitted for camera, web app & parent calls. Silent at memorials.' },
  ],
  {
    x: 0.8,
    y: 3.52,
    w: 3.9,
    h: 1.45,
    fontSize: 9,
    fontFace: 'Arial',
    color: '334155',
    lineSpacingMultiple: 1.08,
  },
);

// Box 4: Catering, Cash & Timeline
s2.addShape(pptx.ShapeType.roundRect, {
  x: 5.1,
  y: 3.15,
  w: boxWidth,
  h: boxHeight,
  r: 0.08,
  fill: { color: 'FFFFFF' },
  line: { color: 'CBD5E1', width: 1 },
});
s2.addText('💶 CATERING, MONEY & NEXT DATES', {
  x: 5.3,
  y: 3.25,
  w: 3.9,
  h: 0.25,
  fontSize: 11,
  fontFace: 'Arial',
  color: '0F172A',
  bold: true,
});
s2.addText(
  [
    { text: '• Thursday Packed Lunch: ', options: { bold: true } },
    { text: 'Bring from home with disposable drinks/snacks.\n' },
    { text: '• Spending Money: ', options: { bold: true } },
    { text: '€20–€30 in cash for Friday & Saturday supermarket lunches.\n' },
    { text: '• Rooming Preference Forms: ', options: { bold: true } },
    { text: 'Distributed in school in 2 weeks. 3-4 pupils per en-suite room.\n' },
    { text: '• Forms Return Deadline: ', options: { bold: true } },
    { text: 'Code of Conduct & Medical form due Friday 25th September.' },
  ],
  {
    x: 5.3,
    y: 3.52,
    w: 3.9,
    h: 1.45,
    fontSize: 9,
    fontFace: 'Arial',
    color: '334155',
    lineSpacingMultiple: 1.08,
  },
);

// Slide 2 Footer
s2.addText(
  'Joint Expedition Leadership: Mr Ben Lovett (Meoncross School) & Mr James Garrett (The History Boys)',
  {
    x: 0.6,
    y: 5.25,
    w: 8.8,
    h: 0.25,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: '64748B',
    align: 'center',
    italic: true,
  },
);

// ==========================================
// SLIDE 3: LOCAL HEROES & THE MISSION
// ==========================================
const s3 = pptx.addSlide();
s3.background = { color: 'F8FAFC' };

s3.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.9,
  fill: { color: '0F172A' },
});
s3.addText('OUR LOCAL MISSION: TRACING THE VILLAGE FALLEN', {
  x: 0.6,
  y: 0.15,
  w: 8.8,
  h: 0.35,
  fontSize: 16,
  fontFace: 'Georgia',
  color: 'F1F5F9',
  bold: true,
});
s3.addText('From Holy Rood Church and the Stubbington Lychgate to the Memorial Walls of Flanders', {
  x: 0.6,
  y: 0.5,
  w: 8.8,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: 'F59E0B',
  bold: true,
});

// Left Column: The Lowry Story
s3.addShape(pptx.ShapeType.roundRect, {
  x: 0.6,
  y: 1.1,
  w: 4.8,
  h: 4.0,
  r: 0.08,
  fill: { color: 'FFFFFF' },
  line: { color: 'CBD5E1', width: 1 },
});
s3.addText('THE LOWRY BROTHERS: A FAMILY SACRIFICE', {
  x: 0.8,
  y: 1.25,
  w: 4.4,
  h: 0.3,
  fontSize: 12,
  fontFace: 'Georgia',
  color: '1E3A8A',
  bold: true,
});
s3.addText(
  [
    {
      text: 'Three brothers from Manor Way Grange in Lee-on-the-Solent, all carved side-by-side on the Stubbington war memorial:\n\n',
    },
    { text: '• 2nd Lt William "Harper" Lowry (25): ', options: { bold: true, color: '0F172A' } },
    { text: 'Fell 4 June 1915 at Gully Ravine (Gallipoli). Commemorated on Helles Memorial.\n' },
    { text: '• Capt Cyril "Patrick" Lowry (20): ', options: { bold: true, color: '0F172A' } },
    { text: 'Fell 25 March 1918 defending the Somme crossings. Pozières Memorial.\n' },
    {
      text: '• Lt Col Auriol "Eric" Lowry, DSO, MC (25): ',
      options: { bold: true, color: '0F172A' },
    },
    {
      text: 'Commanded 2nd West Yorkshires, fought at Westhoek Ridge near Ypres. Fell 23 September 1918.\n\n',
    },
    { text: 'The Key Question We Ask Our Pupils:\n', options: { bold: true, color: 'B45309' } },
    {
      text: '"How did three young brothers from one Lee-on-the-Solent family find their resting places scattered across the battlefields of Europe and Turkey?"',
      options: { italic: true },
    },
  ],
  {
    x: 0.8,
    y: 1.6,
    w: 4.4,
    h: 3.3,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: '334155',
    lineSpacingMultiple: 1.1,
  },
);

// Right Column: Field Mission & Web App
s3.addShape(pptx.ShapeType.roundRect, {
  x: 5.6,
  y: 1.1,
  w: 3.8,
  h: 4.0,
  r: 0.08,
  fill: { color: 'FFFFFF' },
  line: { color: 'CBD5E1', width: 1 },
});
s3.addText('ON-SITE FIELD INVESTIGATIONS', {
  x: 5.8,
  y: 1.25,
  w: 3.4,
  h: 0.3,
  fontSize: 12,
  fontFace: 'Georgia',
  color: '15803D',
  bold: true,
});

s3.addText(
  [
    {
      text: 'Pupils will not just be tourists; they are historians carrying local history into the field:\n\n',
    },
    { text: '• Menin Gate Panel 35: ', options: { bold: true, color: '0F172A' } },
    {
      text: "Locating Pte Thomas Franklin (Chark) & Pte William Ayling (Stubbington baker's boy).\n",
    },
    { text: '• Tyne Cot Panels 88-90: ', options: { bold: true, color: '0F172A' } },
    {
      text: 'Touching the names of Pte Sydney Muckett, Pte Arthur Rye, and LCpl Archibald Ward.\n',
    },
    { text: '• Tyne Cot Panels 14-17: ', options: { bold: true, color: '0F172A' } },
    { text: 'Pte Charles Warland (son of Lee-on-the-Solent Golf Club secretary).\n\n' },
    { text: 'Follow the Expedition Online:\n', options: { bold: true, color: '1E3A8A' } },
    {
      text: 'meoncross-history.netlify.app\nFeaturing 16 battlefield poems, teacher guides, interactive maps & live parent photo stream.',
    },
  ],
  {
    x: 5.8,
    y: 1.6,
    w: 3.4,
    h: 3.3,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: '334155',
    lineSpacingMultiple: 1.1,
  },
);

pptx
  .writeFile({ fileName: outputPath })
  .then((fileName) => {
    console.log(`✅ PowerPoint created successfully at: ${fileName}`);
  })
  .catch((err) => {
    console.error('❌ Error creating PowerPoint:', err);
  });
