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
  'Meoncross School History Department & The History Boys · Mr B. Lovett & Mr J. Garrett (Leaders) · Dr Kirkup & Mrs Lushey',
  {
    x: 0.5,
    y: 0.47,
    w: 9.0,
    h: 0.28,
    fontSize: 10.5,
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
      text: '• 06:15 departure from Meoncross School.\n• Essex Farm ADS (John McCrae dugout).\n• Yorkshire Trench & Langemarck Cemetery.\n• Evening: Check-in & 2-course dinner at hostel.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    {
      text: 'Day 2: Passchendaele & Menin Gate\n',
      options: { bold: true, color: '0F172A', fontSize: 9.5 },
    },
    {
      text: '• Vancouver Corner & Hooge Crater trenches.\n• Supermarket lunch stop in the Salient.\n• Tyne Cot (finding our village fallen).\n• 2-course hostel dinner before 20:00 Last Post.\n\n',
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
      text: '• Thu Day 1: Bring packed lunch from home.\n• Buffet breakfasts at hostel (Fri & Sat mornings).\n• 2-course dinners served on-site at Peace Village.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    { text: 'Spending Money (Euros):\n', options: { bold: true, color: '0F172A', fontSize: 9.5 } },
    {
      text: '• Pupils need €30 to €40 in cash (Euros).\n• Used for supermarket lunch stops on Friday and Saturday, chocolates & souvenirs.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    { text: 'Accommodation & Rooming:\n', options: { bold: true, color: '0F172A', fontSize: 9.5 } },
    {
      text: '• Peace Village Hostel, Heuvelland.\n• Ensuite rooms (4-7 pupils, bunk beds).\n• Rooming organized in ~2 weeks with friend nominations. Staff on same corridors.',
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
      text: '• Sturdy walking boots / waterproof shoes.\n• Waterproof hooded rain jacket & warm fleece.\n• Warm hat & gloves (vital for evening ceremony!).\n• Casual clothes for evenings (no formal wear).\n• 1 medium holdall/case + 1 small daypack.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    { text: 'Travel Documents & Tech:\n', options: { bold: true, color: '0F172A', fontSize: 9.5 } },
    {
      text: '• Passports & GHIC: Collected tonight!\n• Mobiles collected in staff bag each evening.\n• UK-to-EU 2-pin plug adapter for chargers.\n\n',
      options: { color: '334155', fontSize: 8.5 },
    },
    {
      text: 'Required Forms to Return:\n',
      options: { bold: true, color: '0F172A', fontSize: 9.5 },
    },
    {
      text: '• Code of Conduct Agreement (by Fri 25 Sep).',
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

// Bottom Bar: QR Code & App Access
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

s1.addText('INTERACTIVE DIGITAL FIELD GUIDE:  meoncross-history.netlify.app', {
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
  'Scan QR or visit URL to explore full 3-day itinerary, poetry anthology, historical dossiers & cemetery maps',
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
    { text: '• Casual Clothes: ', options: { bold: true } },
    { text: 'Practical, comfortable clothing for downtime at hostel. No restaurant wear.\n' },
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
    { text: '• Valid UK Passport & GHIC/EHIC: ', options: { bold: true } },
    { text: 'Collected in advance tonight at briefing by Mr Lovett!\n' },
    { text: '• Travel Adapter: ', options: { bold: true } },
    { text: 'Standard European 2-pin adapter for phone charging.\n' },
    { text: '• Mobile Phone Policy: ', options: { bold: true } },
    { text: 'Permitted by day; collected in dedicated staff phone bag each evening at curfew.' },
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
    { text: '€30–€40 in cash for Friday & Saturday supermarket lunches & souvenirs.\n' },
    { text: '• Accommodation & Rooming: ', options: { bold: true } },
    { text: 'Peace Village Hostel (4-7 per room, bunk beds). Organized in ~2 weeks.\n' },
    { text: '• Forms Return Deadline: ', options: { bold: true } },
    { text: 'Code of Conduct Agreement due Friday 25th September.' },
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
  'Expedition Staff: Mr Ben Lovett & Mr James Garrett (Tour Leaders) · Dr Kirkup & Mrs Lushey (Accompanying Staff)',
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
      text: '"How did three sons from one coastal Hampshire family answer the call across Gallipoli, Arras, and the Somme—and how did six young men from our quiet village come to rest upon the ramparts and mud of Flanders?"',
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
