/**
 * History Revision Hub — Assembly Presentation Generator
 *
 * Title: "Beyond the Single Story – Deep Roots of Black British History"
 * Standard: 16:9 Widescreen, Presentation-Ready, Complete Embedded Speaker Notes
 * Speakers: Pupil 1, Pupil 2, Pupil 3, Pupil 4
 */

const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches
pptx.author = 'The History Department';
pptx.company = 'The History Revision Hub';
pptx.title = 'Beyond the Single Story: Deep Roots of Black British History';

// Paths to authentic historical images
const IMG_DIR = path.join(__dirname, '..', 'public', 'images', 'assembly');
const IMG_BLANKE = path.join(IMG_DIR, 'john_blanke.jpg');
const IMG_BANGLE = path.join(IMG_DIR, 'ivory_bangle_lady_reconstruction.jpg');
const IMG_FLASK = path.join(IMG_DIR, 'ivory_bangle_blue_flask.jpg');
const IMG_MOODY = path.join(IMG_DIR, 'harold_moody_bust.jpg');
const IMG_WINDRUSH = path.join(IMG_DIR, 'empire_windrush.jpg');

// Color Palette
const C_NAVY_DARK = '0A0F1D';
const C_NAVY_SURFACE = '131D31';
const C_NAVY_BORDER = '233554';
const C_GOLD = 'F59E0B';
const C_GOLD_LIGHT = 'FDE68A';
const C_WHITE = 'FFFFFF';
const C_TEXT_MUTED = '94A3B8';
const C_TEXT_SOFT = 'CBD5E1';
const C_CARD_BG = '1E293B';
const C_PILL_BG = '2A1E0D';
const C_PILL_BORDER = '78350F';

// Helper for speaker notes
function formatSpeakerNote(speaker, speechText, cues = '') {
  let note = `========================================================\n`;
  note += `SPEAKER: ${speaker}\n`;
  note += `========================================================\n\n`;
  if (cues) {
    note += `[STAGE DIRECTIONS / CUES]\n${cues}\n\n`;
  }
  note += `[SCRIPT]\n"${speechText}"\n`;
  return note;
}

// =========================================================================
// SLIDE 1: MASTER TITLE SLIDE
// =========================================================================
const s1 = pptx.addSlide();
s1.background = { color: C_NAVY_DARK };

// Accent gold top strip
s1.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 10,
  h: 0.1,
  fill: { color: C_GOLD },
  line: { type: 'none' },
});

// Category Tag
s1.addText('WHOLE SCHOOL ASSEMBLY   •   BLACK BRITISH HISTORY', {
  x: 0.8,
  y: 0.8,
  w: 8.4,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  letterSpacing: 2,
});

// Main Title
s1.addText('BEYOND THE SINGLE STORY', {
  x: 0.8,
  y: 1.15,
  w: 8.4,
  h: 0.9,
  fontSize: 34,
  fontFace: 'Georgia',
  color: C_WHITE,
  bold: true,
});

// Subtitle
s1.addText('Deep Roots of Black British History: Roman York to the Modern Era', {
  x: 0.8,
  y: 2.1,
  w: 8.4,
  h: 0.5,
  fontSize: 16,
  fontFace: 'Arial',
  color: C_TEXT_SOFT,
});

// Decorative Divider
s1.addShape(pptx.ShapeType.line, {
  x: 0.8,
  y: 2.7,
  w: 8.4,
  h: 0,
  line: { color: C_GOLD, width: 2 },
});

// Overview / Core Message Card
s1.addShape(pptx.ShapeType.roundRect, {
  x: 0.8,
  y: 3.0,
  w: 8.4,
  h: 1.35,
  fill: { color: C_NAVY_SURFACE },
  line: { color: C_NAVY_BORDER, width: 1 },
  rectRadius: 0.08,
});

s1.addText('CORE ENQUIRY & ASSEMBLY MESSAGE', {
  x: 1.1,
  y: 3.15,
  w: 7.8,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  letterSpacing: 1.5,
});

s1.addText(
  'Black British history did not begin with the Windrush generation in 1948—it stretches back nearly two thousand years through the Roman Empire, Tudor royal courts, and the founding of modern Britain.',
  {
    x: 1.1,
    y: 3.45,
    w: 7.8,
    h: 0.75,
    fontSize: 12.5,
    fontFace: 'Georgia',
    color: C_WHITE,
    italic: true,
  },
);

// Presenter Badges Bar
const presenters = [
  { role: 'PUPIL 1', topic: 'Roman York (350 AD)', x: 0.8 },
  { role: 'PUPIL 2', topic: 'Tudor Courts (1511)', x: 2.95 },
  { role: 'PUPIL 3', topic: 'Civil Rights (1931)', x: 5.1 },
  { role: 'PUPIL 4', topic: 'Windrush Era (1948)', x: 7.25 },
];

presenters.forEach((p) => {
  s1.addShape(pptx.ShapeType.roundRect, {
    x: p.x,
    y: 4.6,
    w: 1.95,
    h: 0.7,
    fill: { color: C_NAVY_SURFACE },
    line: { color: C_NAVY_BORDER, width: 1 },
    rectRadius: 0.06,
  });
  s1.addText(p.role, {
    x: p.x,
    y: 4.68,
    w: 1.95,
    h: 0.25,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: C_GOLD,
    bold: true,
    align: 'center',
  });
  s1.addText(p.topic, {
    x: p.x,
    y: 4.93,
    w: 1.95,
    h: 0.28,
    fontSize: 8.5,
    fontFace: 'Arial',
    color: C_TEXT_MUTED,
    align: 'center',
  });
});

s1.addNotes(
  formatSpeakerNote(
    'PUPIL 1',
    'Good morning, everyone.\n\nWhen people talk about Black British history, many assume it begins in 1948 with the arrival of the Empire Windrush.\n\nWe often think of it as a relatively modern story. But history tells a very different tale. Black people have lived, worked, and shaped life on this island for nearly two thousand years.',
    'Advance to Slide 2 when introducing Roman York and the Ivory Bangle Lady.',
  ),
);

// =========================================================================
// SLIDE 2: THE IVORY BANGLE LADY (c. 350 AD)
// =========================================================================
const s2 = pptx.addSlide();
s2.background = { color: C_NAVY_DARK };

// Header Banner
s2.addText('ACT I: ROMAN BRITAIN   •   4th CENTURY YORK (EBORACUM)', {
  x: 0.6,
  y: 0.35,
  w: 8.8,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  letterSpacing: 1.5,
});

s2.addText('The Ivory Bangle Lady: High Status in Roman Britain', {
  x: 0.6,
  y: 0.6,
  w: 8.8,
  h: 0.45,
  fontSize: 22,
  fontFace: 'Georgia',
  color: C_WHITE,
  bold: true,
});

// Speaker Tag
s2.addShape(pptx.ShapeType.roundRect, {
  x: 7.9,
  y: 0.45,
  w: 1.5,
  h: 0.4,
  fill: { color: C_PILL_BG },
  line: { color: C_PILL_BORDER, width: 1 },
  rectRadius: 0.05,
});
s2.addText('Delivered by: Pupil 1', {
  x: 7.9,
  y: 0.48,
  w: 1.5,
  h: 0.3,
  fontSize: 8.5,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  align: 'center',
});

// Left Column: Historical Analysis (3 Cards)
const s2Cards = [
  {
    title: 'THE DISCOVERY (YORK, 1901)',
    desc: 'In 1901, archaeologists in York excavated a stone sarcophagus dating to c. 350 AD containing the skeleton of a wealthy high-status woman.',
  },
  {
    title: 'EXPENSIVE GRAVE GOODS',
    desc: 'Buried with luxury goods: an armlet carved from elephant ivory, jet bracelets, fine glass perfume bottles, beads, and a Christian bone mount.',
  },
  {
    title: 'FORENSIC & ISOTOPE ANALYSIS',
    desc: 'Modern facial reconstruction and chemical isotope analysis of her teeth prove she grew up in a warmer climate and was of North African descent.',
  },
];

s2Cards.forEach((c, idx) => {
  const yPos = 1.25 + idx * 1.05;
  s2.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: yPos,
    w: 4.8,
    h: 0.95,
    fill: { color: C_NAVY_SURFACE },
    line: { color: C_NAVY_BORDER, width: 1 },
    rectRadius: 0.06,
  });
  s2.addText(c.title, {
    x: 0.8,
    y: yPos + 0.1,
    w: 4.4,
    h: 0.22,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: C_GOLD,
    bold: true,
  });
  s2.addText(c.desc, {
    x: 0.8,
    y: yPos + 0.32,
    w: 4.4,
    h: 0.55,
    fontSize: 10,
    fontFace: 'Arial',
    color: C_TEXT_SOFT,
  });
});

// Bottom Historical Takeaway Banner
s2.addShape(pptx.ShapeType.roundRect, {
  x: 0.6,
  y: 4.5,
  w: 4.8,
  h: 0.8,
  fill: { color: C_CARD_BG },
  line: { color: C_GOLD, width: 1 },
  rectRadius: 0.06,
});
s2.addText('HISTORICAL SIGNIFICANCE:', {
  x: 0.8,
  y: 4.56,
  w: 4.4,
  h: 0.2,
  fontSize: 8.5,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
});
s2.addText(
  '"She was not enslaved or an outsider; she was a member of Roman Britain’s wealthy elite. Britain was multicultural long before it was even called Great Britain."',
  {
    x: 0.8,
    y: 4.75,
    w: 4.4,
    h: 0.5,
    fontSize: 9.5,
    fontFace: 'Georgia',
    color: C_WHITE,
    italic: true,
  },
);

// Right Column: Authentic Artifact Images
if (fs.existsSync(IMG_BANGLE)) {
  s2.addImage({
    path: IMG_BANGLE,
    x: 5.65,
    y: 1.25,
    w: 3.75,
    h: 1.5,
    rounding: true,
  });
  s2.addText('York Museums Trust: Elephant ivory armlet with rope pattern (c. 350 AD)', {
    x: 5.65,
    y: 2.77,
    w: 3.75,
    h: 0.22,
    fontSize: 7.5,
    fontFace: 'Arial',
    color: C_TEXT_MUTED,
    align: 'center',
  });
}

if (fs.existsSync(IMG_FLASK)) {
  s2.addImage({
    path: IMG_FLASK,
    x: 6.2,
    y: 3.05,
    w: 2.65,
    h: 1.75,
    rounding: true,
  });
  s2.addText('Roman blue glass perfume flask recovered from the York sarcophagus', {
    x: 5.65,
    y: 4.85,
    w: 3.75,
    h: 0.22,
    fontSize: 7.5,
    fontFace: 'Arial',
    color: C_TEXT_MUTED,
    align: 'center',
  });
}

s2.addNotes(
  formatSpeakerNote(
    'PUPIL 1',
    'Our first story takes us all the way back to the 4th century, to Roman Britain—in the city of York.\n\nIn 1901, archaeologists uncovered a stone sarcophagus containing the skeleton of a woman. Along with her remains were expensive bracelets made of jet and elephant ivory, glass perfume bottles, and fine jewellery.\n\nForensic analysis revealed she was of North African descent, and she lived in York around the year 350 AD. She became known as the Ivory Bangle Lady.\n\nShe wasn’t an enslaved person or an outsider; she was a wealthy, high-status member of Roman British society. Her presence proves that Britain was multicultural long before it was even called Great Britain.',
    'Hand handover to Pupil 2. Advance to Slide 3: John Blanke.',
  ),
);

// =========================================================================
// SLIDE 3: TUDOR ROYAL COURT – JOHN BLANKE (1511)
// =========================================================================
const s3 = pptx.addSlide();
s3.background = { color: C_NAVY_DARK };

s3.addText('ACT II: TUDOR ENGLAND   •   THE ROYAL COURT OF HENRY VII & HENRY VIII', {
  x: 0.6,
  y: 0.35,
  w: 8.8,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  letterSpacing: 1.5,
});

s3.addText('John Blanke: Royal Musician at the Heart of the Tudor Court', {
  x: 0.6,
  y: 0.6,
  w: 8.8,
  h: 0.45,
  fontSize: 22,
  fontFace: 'Georgia',
  color: C_WHITE,
  bold: true,
});

// Speaker Tag
s3.addShape(pptx.ShapeType.roundRect, {
  x: 7.9,
  y: 0.45,
  w: 1.5,
  h: 0.4,
  fill: { color: C_PILL_BG },
  line: { color: C_PILL_BORDER, width: 1 },
  rectRadius: 0.05,
});
s3.addText('Delivered by: Pupil 2', {
  x: 7.9,
  y: 0.48,
  w: 1.5,
  h: 0.3,
  fontSize: 8.5,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  align: 'center',
});

// Left Column: Historical Cards
const s3Cards = [
  {
    title: 'REGULAR ROYAL TRUMPETER',
    desc: 'John Blanke served as a retained court musician to both King Henry VII and King Henry VIII, performing at major state coronations and royal ceremonies.',
  },
  {
    title: 'WESTMINSTER TOURNAMENT ROLL (1511)',
    desc: 'Illustrated twice on the 60-foot illuminated royal vellum roll celebrating the birth of Henry VIII’s son, riding on horseback in royal Tudor livery.',
  },
  {
    title: 'THE SUCCESSFUL PAY PETITION',
    desc: 'Court warrants preserve his handwritten petition directly to King Henry VIII requesting a pay rise to eight pence a day—which the King signed and approved.',
  },
];

s3Cards.forEach((c, idx) => {
  const yPos = 1.25 + idx * 1.05;
  s3.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: yPos,
    w: 5.2,
    h: 0.95,
    fill: { color: C_NAVY_SURFACE },
    line: { color: C_NAVY_BORDER, width: 1 },
    rectRadius: 0.06,
  });
  s3.addText(c.title, {
    x: 0.8,
    y: yPos + 0.1,
    w: 4.8,
    h: 0.22,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: C_GOLD,
    bold: true,
  });
  s3.addText(c.desc, {
    x: 0.8,
    y: yPos + 0.32,
    w: 4.8,
    h: 0.55,
    fontSize: 10,
    fontFace: 'Arial',
    color: C_TEXT_SOFT,
  });
});

s3.addShape(pptx.ShapeType.roundRect, {
  x: 0.6,
  y: 4.5,
  w: 5.2,
  h: 0.8,
  fill: { color: C_CARD_BG },
  line: { color: C_GOLD, width: 1 },
  rectRadius: 0.06,
});
s3.addText('HISTORICAL SIGNIFICANCE:', {
  x: 0.8,
  y: 4.56,
  w: 4.8,
  h: 0.2,
  fontSize: 8.5,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
});
s3.addText(
  '"John Blanke was not an onlooker—he was a respected, skilled professional at the very centre of Tudor royal ceremony and spectacle."',
  {
    x: 0.8,
    y: 4.75,
    w: 4.8,
    h: 0.5,
    fontSize: 9.5,
    fontFace: 'Georgia',
    color: C_WHITE,
    italic: true,
  },
);

// Right Column: Image
if (fs.existsSync(IMG_BLANKE)) {
  s3.addImage({
    path: IMG_BLANKE,
    x: 6.1,
    y: 1.25,
    w: 3.3,
    h: 3.65,
    rounding: true,
  });
  s3.addText('College of Arms: John Blanke on the 1511 Westminster Tournament Roll', {
    x: 6.0,
    y: 4.95,
    w: 3.5,
    h: 0.25,
    fontSize: 7.5,
    fontFace: 'Arial',
    color: C_TEXT_MUTED,
    align: 'center',
  });
}

s3.addNotes(
  formatSpeakerNote(
    'PUPIL 2',
    "Move forward a thousand years to Tudor England, and we find another remarkable figure: John Blanke.\n\nJohn Blanke was a gifted musician who served as a regular trumpeter in the royal courts of both King Henry VII and King Henry VIII.\n\nWe don't just know about him from written records—we can actually see him. In 1511, Henry VIII held a massive tournament to celebrate the birth of a royal son. An illuminated 60-foot scroll called the Westminster Tournament Roll was created to document the occasion.\n\nTwice on that scroll, John Blanke is painted riding a horse, wearing royal Tudor livery and playing his trumpet alongside the other royal musicians.\n\nCourt records also show something fascinating about his character: he wrote a petition directly to King Henry VIII asking for a pay rise—and the King approved it.\n\nJohn Blanke was a respected professional at the very centre of royal court ceremony.",
    'Handover to Pupil 3. Advance to Slide 4: Dr. Harold Moody.',
  ),
);

// =========================================================================
// SLIDE 4: EARLY 20th CENTURY – DR. HAROLD MOODY (1904–1947)
// =========================================================================
const s4 = pptx.addSlide();
s4.background = { color: C_NAVY_DARK };

s4.addText('ACT III: EARLY 20th CENTURY   •   MEDICAL PIONEER & CIVIL RIGHTS LEADER', {
  x: 0.6,
  y: 0.35,
  w: 8.8,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  letterSpacing: 1.5,
});

s4.addText('Dr. Harold Moody: Fighting for Healthcare & Equality', {
  x: 0.6,
  y: 0.6,
  w: 8.8,
  h: 0.45,
  fontSize: 22,
  fontFace: 'Georgia',
  color: C_WHITE,
  bold: true,
});

// Speaker Tag
s4.addShape(pptx.ShapeType.roundRect, {
  x: 7.9,
  y: 0.45,
  w: 1.5,
  h: 0.4,
  fill: { color: C_PILL_BG },
  line: { color: C_PILL_BORDER, width: 1 },
  rectRadius: 0.05,
});
s4.addText('Delivered by: Pupil 3', {
  x: 7.9,
  y: 0.48,
  w: 1.5,
  h: 0.3,
  fontSize: 8.5,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  align: 'center',
});

// Left Column: Historical Cards
const s4Cards = [
  {
    title: 'ACADEMIC EXCELLENCE & BARRIERS (1904)',
    desc: 'Born in Jamaica, arrived in London in 1904 to study medicine at King’s College London. Graduated top of his class, yet hospital posts were denied due to racial prejudice.',
  },
  {
    title: 'COMMUNITY DOCTOR IN PECKHAM (1913)',
    desc: 'Refusing to give up, opened his own surgery in Peckham in 1913. Became beloved across south London for treating impoverished working-class families free of charge.',
  },
  {
    title: 'THE LEAGUE OF COLOURED PEOPLES (1931)',
    desc: 'Founded Britain’s first major civil rights organization in 1931. Campaigned relentlessly against racist housing bans and employment discrimination in military and civil services.',
  },
];

s4Cards.forEach((c, idx) => {
  const yPos = 1.25 + idx * 1.05;
  s4.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: yPos,
    w: 5.4,
    h: 0.95,
    fill: { color: C_NAVY_SURFACE },
    line: { color: C_NAVY_BORDER, width: 1 },
    rectRadius: 0.06,
  });
  s4.addText(c.title, {
    x: 0.8,
    y: yPos + 0.1,
    w: 5.0,
    h: 0.22,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: C_GOLD,
    bold: true,
  });
  s4.addText(c.desc, {
    x: 0.8,
    y: yPos + 0.32,
    w: 5.0,
    h: 0.55,
    fontSize: 10,
    fontFace: 'Arial',
    color: C_TEXT_SOFT,
  });
});

s4.addShape(pptx.ShapeType.roundRect, {
  x: 0.6,
  y: 4.5,
  w: 5.4,
  h: 0.8,
  fill: { color: C_CARD_BG },
  line: { color: C_GOLD, width: 1 },
  rectRadius: 0.06,
});
s4.addText('HISTORICAL SIGNIFICANCE:', {
  x: 0.8,
  y: 4.56,
  w: 5.0,
  h: 0.2,
  fontSize: 8.5,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
});
s4.addText(
  '"Dr. Moody campaigned tirelessly for decades, successfully overturning racial colour bars and laying the direct groundwork for Britain’s modern race relations laws."',
  {
    x: 0.8,
    y: 4.75,
    w: 5.0,
    h: 0.5,
    fontSize: 9.5,
    fontFace: 'Georgia',
    color: C_WHITE,
    italic: true,
  },
);

// Right Column: Image
if (fs.existsSync(IMG_MOODY)) {
  s4.addImage({
    path: IMG_MOODY,
    x: 6.3,
    y: 1.25,
    w: 3.1,
    h: 3.65,
    rounding: true,
  });
  s4.addText('National Portrait Gallery: Dr Harold Moody (1882–1947) by Ronald Moody', {
    x: 6.2,
    y: 4.95,
    w: 3.3,
    h: 0.25,
    fontSize: 7.5,
    fontFace: 'Arial',
    color: C_TEXT_MUTED,
    align: 'center',
  });
}

s4.addNotes(
  formatSpeakerNote(
    'PUPIL 3',
    "Fast-forward to London in the early 20th century, and meet Dr. Harold Moody.\n\nBorn in Jamaica, Harold arrived in Britain in 1904 to study medicine at King’s College London. He graduated top of his class and won numerous medical prizes.\n\nYet, when he applied for doctor roles in London hospitals, he was repeatedly turned down simply because of the colour of his skin.\n\nInstead of giving up, Dr. Moody opened his own private GP surgery in Peckham, South London, in 1913. He became beloved by the local community because he treated poor families for free when they couldn't afford medicine.\n\nIn 1931, seeing how Black people in Britain faced unfair barriers in finding jobs and renting homes, he founded the League of Coloured Peoples.\n\nDr. Moody campaigned tirelessly for decades, successfully challenging discriminatory housing policies and racist employment bans. He laid the direct groundwork for Britain’s modern race relations laws.",
    'Handover to Pupil 4. Advance to Slide 5: The Windrush Generation.',
  ),
);

// =========================================================================
// SLIDE 5: POST-WAR RECONSTRUCTION – THE WINDRUSH GENERATION (1948)
// =========================================================================
const s5 = pptx.addSlide();
s5.background = { color: C_NAVY_DARK };

s5.addText('ACT IV: POST-WAR BRITAIN   •   REBUILDING THE NATION (1948 ONWARDS)', {
  x: 0.6,
  y: 0.35,
  w: 8.8,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  letterSpacing: 1.5,
});

s5.addText('The Empire Windrush: Rebuilding Britain & Creating the NHS', {
  x: 0.6,
  y: 0.6,
  w: 8.8,
  h: 0.45,
  fontSize: 22,
  fontFace: 'Georgia',
  color: C_WHITE,
  bold: true,
});

// Speaker Tag
s5.addShape(pptx.ShapeType.roundRect, {
  x: 7.9,
  y: 0.45,
  w: 1.5,
  h: 0.4,
  fill: { color: C_PILL_BG },
  line: { color: C_PILL_BORDER, width: 1 },
  rectRadius: 0.05,
});
s5.addText('Delivered by: Pupil 4', {
  x: 7.9,
  y: 0.48,
  w: 1.5,
  h: 0.3,
  fontSize: 8.5,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  align: 'center',
});

// Left Column: Historical Cards
const s5Cards = [
  {
    title: 'THE CALL TO REBUILD (JUNE 1948)',
    desc: 'Facing severe post-war labour shortages and bomb devastation, the British government invited Commonwealth citizens to help rebuild industry, transport, and cities.',
  },
  {
    title: 'BACKBONE OF THE NEW NHS',
    desc: 'Arriving in the exact month the National Health Service was founded (July 1948), Caribbean men and women became the vital nurses, doctors, and staff powering our hospitals.',
  },
  {
    title: 'VIBRANT CULTURAL TRANSFORMATION',
    desc: 'Enriched British music, literature, art, and food, giving rise to celebrated global cultural institutions such as London’s Notting Hill Carnival.',
  },
];

s5Cards.forEach((c, idx) => {
  const yPos = 1.25 + idx * 1.05;
  s5.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: yPos,
    w: 4.8,
    h: 0.95,
    fill: { color: C_NAVY_SURFACE },
    line: { color: C_NAVY_BORDER, width: 1 },
    rectRadius: 0.06,
  });
  s5.addText(c.title, {
    x: 0.8,
    y: yPos + 0.1,
    w: 4.4,
    h: 0.22,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: C_GOLD,
    bold: true,
  });
  s5.addText(c.desc, {
    x: 0.8,
    y: yPos + 0.32,
    w: 4.4,
    h: 0.55,
    fontSize: 10,
    fontFace: 'Arial',
    color: C_TEXT_SOFT,
  });
});

s5.addShape(pptx.ShapeType.roundRect, {
  x: 0.6,
  y: 4.5,
  w: 4.8,
  h: 0.8,
  fill: { color: C_CARD_BG },
  line: { color: C_GOLD, width: 1 },
  rectRadius: 0.06,
});
s5.addText('HISTORICAL SIGNIFICANCE:', {
  x: 0.8,
  y: 4.56,
  w: 4.4,
  h: 0.2,
  fontSize: 8.5,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
});
s5.addText(
  '"They became the engine room of modern Britain. Their resilience and contribution shaped the public services and cultural life we all depend on every single day."',
  {
    x: 0.8,
    y: 4.75,
    w: 4.4,
    h: 0.5,
    fontSize: 9.5,
    fontFace: 'Georgia',
    color: C_WHITE,
    italic: true,
  },
);

// Right Column: Image
if (fs.existsSync(IMG_WINDRUSH)) {
  s5.addImage({
    path: IMG_WINDRUSH,
    x: 5.65,
    y: 1.45,
    w: 3.75,
    h: 2.7,
    rounding: true,
  });
  s5.addText('Imperial War Museum: HMT Empire Windrush arriving at Tilbury Docks, 22 June 1948', {
    x: 5.65,
    y: 4.25,
    w: 3.75,
    h: 0.35,
    fontSize: 7.5,
    fontFace: 'Arial',
    color: C_TEXT_MUTED,
    align: 'center',
  });
}

s5.addNotes(
  formatSpeakerNote(
    'PUPIL 4',
    'That brings us to 1948 and the Empire Windrush.\n\nAfter the Second World War, Britain was devastated by bombing and facing a massive shortage of workers to rebuild towns, run transport systems, and staff hospitals.\n\nThe British government invited citizens from across the Commonwealth to come and help rebuild the country. Hundreds of Caribbean men, women, and families answered that call.\n\nThey became the engine room of modern Britain. They drove the buses, laid the railway tracks, and became the backbone of our newly founded National Health Service.\n\nThey also enriched British music, literature, food, and culture, turning events like the Notting Hill Carnival into celebrations known across the world.\n\nTheir resilience and contribution shaped the public services we all depend on every single day.',
    'Handover to all 4 pupils for shared conclusion. Advance to Slide 6: Reflection.',
  ),
);

// =========================================================================
// SLIDE 6: CONCLUSION & REFLECTION – "HOW DEEP DO OUR SHARED ROOTS GO?"
// =========================================================================
const s6 = pptx.addSlide();
s6.background = { color: C_NAVY_DARK };

s6.addText('CONCLUSION & WHOLE SCHOOL REFLECTION', {
  x: 0.6,
  y: 0.35,
  w: 8.8,
  h: 0.25,
  fontSize: 10,
  fontFace: 'Arial',
  color: C_GOLD,
  bold: true,
  letterSpacing: 1.5,
});

s6.addText('"How Deep Do Our Shared Roots Go?"', {
  x: 0.6,
  y: 0.6,
  w: 8.8,
  h: 0.5,
  fontSize: 24,
  fontFace: 'Georgia',
  color: C_WHITE,
  bold: true,
});

// 4 Pupil Shared Conclusion Cards (2x2 Grid)
const conclusionCards = [
  {
    speaker: 'PUPIL 1',
    highlight: 'BELONGING & CONTINUITY',
    quote:
      '"History is not just about isolated dates; it is about belonging. Black history is not a separate topic tucked away for one month of the year—it is part of the deep, continuous story of Britain itself."',
    x: 0.6,
    y: 1.25,
  },
  {
    speaker: 'PUPIL 2',
    highlight: 'SHARED FOUNDATIONS',
    quote:
      '"As we head into our day, let\'s remember that Britain\'s story has always been built by people from diverse backgrounds working, creating, and standing together."',
    x: 5.15,
    y: 1.25,
  },
  {
    speaker: 'PUPIL 3',
    highlight: 'MOMENT OF PAUSE',
    quote:
      '"Take ten seconds of quiet now to reflect on how learning our full, shared history helps us build a stronger community today."',
    x: 0.6,
    y: 2.85,
  },
  {
    speaker: 'PUPIL 4',
    highlight: 'CLOSING THE ASSEMBLY',
    quote: '"Thank you for your attention. Have a great day, everyone."',
    x: 5.15,
    y: 2.85,
  },
];

conclusionCards.forEach((c) => {
  s6.addShape(pptx.ShapeType.roundRect, {
    x: c.x,
    y: c.y,
    w: 4.25,
    h: 1.45,
    fill: { color: C_NAVY_SURFACE },
    line: { color: C_NAVY_BORDER, width: 1 },
    rectRadius: 0.06,
  });

  // Speaker Badge
  s6.addText(c.speaker, {
    x: c.x + 0.2,
    y: c.y + 0.12,
    w: 1.2,
    h: 0.22,
    fontSize: 9,
    fontFace: 'Arial',
    color: C_GOLD,
    bold: true,
  });
  s6.addText(c.highlight, {
    x: c.x + 1.4,
    y: c.y + 0.12,
    w: 2.6,
    h: 0.22,
    fontSize: 8,
    fontFace: 'Arial',
    color: C_TEXT_MUTED,
    align: 'right',
  });

  s6.addText(c.quote, {
    x: c.x + 0.2,
    y: c.y + 0.38,
    w: 3.85,
    h: 0.95,
    fontSize: 10,
    fontFace: 'Georgia',
    color: C_TEXT_SOFT,
    italic: true,
  });
});

// Bottom 10-Second Reflection Banner
s6.addShape(pptx.ShapeType.roundRect, {
  x: 0.6,
  y: 4.5,
  w: 8.8,
  h: 0.75,
  fill: { color: C_PILL_BG },
  line: { color: C_GOLD, width: 1.5 },
  rectRadius: 0.06,
});

s6.addText('⏱️  WHOLE SCHOOL SILENCE: 10 SECONDS OF QUIET REFLECTION', {
  x: 0.8,
  y: 4.62,
  w: 8.4,
  h: 0.25,
  fontSize: 11,
  fontFace: 'Arial',
  color: C_GOLD_LIGHT,
  bold: true,
  align: 'center',
  letterSpacing: 1,
});
s6.addText(
  'Reflecting on 2,000 years of shared history and building a stronger school community together.',
  {
    x: 0.8,
    y: 4.9,
    w: 8.4,
    h: 0.25,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: C_TEXT_MUTED,
    align: 'center',
  },
);

s6.addNotes(
  `========================================================\n` +
    `SHARED CONCLUSION (ALL 4 PUPILS)\n` +
    `========================================================\n\n` +
    `PUPIL 1:\n"So why does this matter?\nBecause history is not just about isolated dates; it is about belonging.\nFrom the Roman streets of York to the Tudor royal court, and from a community doctor’s surgery in South London to the arrival of the Windrush—Black history is not a separate topic tucked away for one month of the year.\nIt is part of the deep, continuous story of Britain itself."\n\n` +
    `PUPIL 2:\n"As we head into our day, let's remember that Britain’s story has always been built by people from diverse backgrounds working, creating, and standing together."\n\n` +
    `PUPIL 3:\n"Take ten seconds of quiet now to reflect on how learning our full, shared history helps us build a stronger community today."\n\n` +
    `[PAUSE: 10 SECONDS OF SILENCE]\n\n` +
    `PUPIL 4:\n"Thank you for your attention. Have a great day, everyone."`,
);

// =========================================================================
// WRITE FILES
// =========================================================================
async function build() {
  const publicOut = path.join(__dirname, '..', 'public', 'assembly_beyond_the_single_story.pptx');
  const briefingsOut = path.join(
    __dirname,
    '..',
    'public',
    'briefings',
    'assembly_beyond_the_single_story.pptx',
  );
  const driveDir = 'G:\\My Drive\\AAMX\\Dep File\\Assemblies';
  const driveOut = path.join(driveDir, 'Beyond_the_Single_Story_Assembly.pptx');

  await pptx.writeFile({ fileName: publicOut });
  console.log(`✅ Saved presentation to: ${publicOut}`);

  fs.copyFileSync(publicOut, briefingsOut);
  console.log(`✅ Copied presentation to: ${briefingsOut}`);

  if (fs.existsSync(driveDir)) {
    fs.copyFileSync(publicOut, driveOut);
    console.log(`✅ Mirrored presentation to Google Drive Assemblies: ${driveOut}`);
    const oldMirror =
      'G:\\My Drive\\AAMX\\Dep File\\00_Department_Admin_and_Policies\\Beyond_the_Single_Story_Assembly.pptx';
    if (fs.existsSync(oldMirror)) {
      try {
        fs.unlinkSync(oldMirror);
      } catch (e) {}
    }
  }
}

build().catch((err) => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});
