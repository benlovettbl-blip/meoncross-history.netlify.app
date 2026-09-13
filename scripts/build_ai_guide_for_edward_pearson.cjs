const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  AlignmentType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
} = require('docx');

// Output directories
const adminDir = path.join(__dirname, '..', 'admin_internal');
if (!fs.existsSync(adminDir)) fs.mkdirSync(adminDir, { recursive: true });

const docxPath = path.join(adminDir, 'AI_Guide_for_Family_Military_Historians_Edward_Pearson.docx');
const htmlPath = path.join(adminDir, 'AI_Guide_for_Family_Military_Historians_Edward_Pearson.html');
const pdfPath = path.join(adminDir, 'AI_Guide_for_Family_Military_Historians_Edward_Pearson.pdf');

console.log('Generating AI Research Guide for Edward Pearson (John)...');

// Helper for docx table borders
const thinBorder = {
  style: BorderStyle.SINGLE,
  size: 4,
  color: 'CBD5E1',
};

const calloutBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: '1E3A8A' },
};

const warningCalloutBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: 'B45309' },
};

const successCalloutBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: '15803D' },
};

function createCallout(paragraphs, borderType = calloutBorders, bgColor = 'F8FAFC') {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: borderType,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            shading: { fill: bgColor },
            margins: { top: 140, bottom: 140, left: 200, right: 160 },
            children: paragraphs,
          }),
        ],
      }),
    ],
  });
}

function p(text, opts = {}) {
  const {
    bold = false,
    italic = false,
    size = 22,
    color = '334155',
    spaceBefore = 80,
    spaceAfter = 80,
    align = AlignmentType.LEFT,
  } = opts;

  return new Paragraph({
    alignment: align,
    spacing: { before: spaceBefore, after: spaceAfter, line: 276 },
    children: [
      new TextRun({
        text,
        bold,
        italic,
        size,
        color,
        font: 'Segoe UI',
      }),
    ],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 32,
        color: '1E3A8A',
        font: 'Georgia',
      }),
    ],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 100 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26,
        color: '0F172A',
        font: 'Georgia',
      }),
    ],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 80 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        color: 'B45309',
        font: 'Segoe UI',
      }),
    ],
  });
}

function bullet(text, boldPrefix = '') {
  const runs = [];
  if (boldPrefix) {
    runs.push(
      new TextRun({
        text: boldPrefix + ' ',
        bold: true,
        size: 22,
        color: '1E293B',
        font: 'Segoe UI',
      }),
    );
  }
  runs.push(
    new TextRun({
      text,
      size: 22,
      color: '334155',
      font: 'Segoe UI',
    }),
  );

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 40, line: 260 },
    children: runs,
  });
}

// ----------------------------------------------------
// BUILD WORD DOCUMENT (.DOCX)
// ----------------------------------------------------
async function buildDocx() {
  const doc = new Document({
    creator: 'Benjamin Lovett, Head of History, Meoncross School',
    title: 'AI for the Family Military Historian',
    description:
      'A practical guide to digital archive mining, AI methods, and verification pitfalls, based on the research of 2nd Lieutenant Ernest Edward Crummack MC DCM.',
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Meoncross School History Department · Family Military Research Series',
                    size: 16,
                    color: '94A3B8',
                    font: 'Segoe UI',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.SPACE_BETWEEN,
                children: [
                  new TextRun({
                    text: '2nd Lt Ernest Crummack MC DCM · Case Study & AI Methodology',
                    size: 16,
                    color: '94A3B8',
                    font: 'Segoe UI',
                  }),
                  new TextRun({
                    text: ' | Page ',
                    size: 16,
                    color: '94A3B8',
                    font: 'Segoe UI',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: '94A3B8',
                    font: 'Segoe UI',
                  }),
                  new TextRun({
                    text: ' of ',
                    size: 16,
                    color: '94A3B8',
                    font: 'Segoe UI',
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: '94A3B8',
                    font: 'Segoe UI',
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // Header / Title Block
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({
                text: 'MEONCROSS SCHOOL HISTORY DEPARTMENT',
                bold: true,
                size: 20,
                color: 'B45309',
                font: 'Segoe UI',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 40, after: 120 },
            children: [
              new TextRun({
                text: 'AI for the Family Military Historian',
                bold: true,
                size: 40,
                color: '1E3A8A',
                font: 'Georgia',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 200 },
            children: [
              new TextRun({
                text: 'Archival Mining, Digital Paleography, Verification Guardrails, and How to Avoid AI Embellishment',
                italic: true,
                size: 22,
                color: '475569',
                font: 'Georgia',
              }),
            ],
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: thinBorder,
              bottom: thinBorder,
              left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
              right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
              insideH: thinBorder,
              insideV: { style: BorderStyle.NONE, size: 0, color: 'auto' },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9' },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [p('Prepared For:', { bold: true, size: 18, color: '1E3A8A' })],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p(
                        'Edward Pearson ("John") — Grandfather of Aby (Year 10) & Crummack Family Historian',
                        { size: 18, bold: true },
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9' },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [p('Author:', { bold: true, size: 18, color: '1E3A8A' })],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p(
                        'Benjamin Lovett — Head of History, Meoncross School (ben.lovett@meoncross.co.uk)',
                        { size: 18 },
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9' },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [p('Case Study:', { bold: true, size: 18, color: '1E3A8A' })],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p(
                        '2nd Lieutenant Ernest Edward Crummack MC, DCM (1885–1958), 1/5th & 6th Bn York & Lancaster Regt',
                        { size: 18 },
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9' },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [p('Date:', { bold: true, size: 18, color: '1E3A8A' })],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p('September 2026 · Ypres & Somme Battlefield Study Expedition', {
                        size: 18,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          p('', { spaceAfter: 160 }),

          // SECTION 1: EXECUTIVE WELCOME & PURPOSE
          h1('1. Introduction & Executive Welcome'),
          p('Dear John (Edward),', { bold: true, size: 22, color: '1E293B' }),
          p(
            'When Harriet passed on your email and kind words regarding the 2nd Lieutenant Ernest Crummack dossier, I was absolutely delighted. As a history teacher, discovering a pupil with such an extraordinary direct family link to the Western Front—and with a grandfather who has spent decades conducting genuine, rigorous archival research—is nothing short of a goldmine for our classroom.',
          ),
          p(
            'You mentioned in your email that you have recently begun experimenting with Artificial Intelligence (AI) as a research tool, but that you have run into frustrating hurdles where the software makes assumptions, conflates different people, or invents details that simply aren’t in the records. I want to tell you straight away: you are completely right. AI is a remarkable research assistant, but unless it is bound by strict guardrails, it has an innate habit of behaving like an over-enthusiastic novelist rather than a disciplined military historian.',
          ),
          p(
            'This guide has been written specifically for you ahead of our meeting after school. In it, I share the entire "behind-the-scenes" journey of how we built Ernest’s interactive dossier on the Meoncross History platform. It documents:',
          ),
          bullet(
            'How we used your foundational research notes as the bedrock for digital discovery.',
            '•',
          ),
          bullet(
            'How digital tools allowed us to retrieve the original 1916 and 1919 London Gazette state papers in seconds.',
            '•',
          ),
          bullet(
            'How we triangulated your Siegfried Sassoon discovery against autograph manuscripts at Cambridge University Library.',
            '•',
          ),
          bullet(
            'An honest, warts-and-all autopsy of three specific errors the AI made during our build, why it made them, and how we caught and corrected them.',
            '•',
          ),
          bullet(
            'A practical, ready-to-use "Prompting Toolkit" containing battle-tested instructions you can copy and paste into ChatGPT, Claude, or Gemini for your own future research.',
            '•',
          ),

          // SECTION 2: THE FOUNDATIONAL LEADS
          h1('2. Phase 1: The Human Foundation — John’s Research Leads'),
          p(
            'The first golden rule of AI in historical research is: Garbage In, Garbage Out. AI cannot discover anything out of thin air. It requires high-quality primary anchors provided by human historians. The foundation of Ernest’s digital dossier came entirely from your meticulous family scholarship.',
          ),
          p('The crucial primary anchors you provided included:'),
          bullet(
            'Ernest enlisted at Rotherham Drill Hall on 2 September 1914 as Private 2423 in the 1/5th York & Lancaster Regiment, a moment witnessed by his 6-year-old son Ted.',
            '1. Enlistment & Regimental Identity:',
          ),
          bullet(
            'He was awarded the Distinguished Conduct Medal (DCM) for rescuing a stricken officer in No Man’s Land on the Somme in July 1916, plus the Imperial Russian Order of St George.',
            '2. The Somme Gallantry:',
          ),
          bullet(
            'The War Office clerks made a critical clerical error, misprinting his surname as "Crummock" with an ‘o’ in the London Gazette, which defeated standard search engines for decades.',
            '3. The "Smoking Gun" Clerical Typo:',
          ),
          bullet(
            'That the officer he rescued was 2nd Lt Marcus Goodall, son of the Canon of Rotherham, and the beloved friend of war poet Siegfried Sassoon.',
            '4. The Sassoon Connection:',
          ),
          bullet(
            'Commissioned on 30 January 1918 as a 2nd Lieutenant in the 1/4th (Territorial) Bn, but attached in practice to the 6th (Service) Battalion at Canal du Nord, winning the Military Cross.',
            '5. Officer Commissioning & 1918 MC:',
          ),
          bullet(
            'Surviving postcards confirming he stayed at Hôtel Ypriana by the Menin Gate and visited Albert on an interwar battlefield tour, before passing away peacefully in Dinnington in 1958 at age 73.',
            '6. Post-War Legacy:',
          ),
          p(
            'Without these anchors, no AI system in the world could have found Ernest. Your work provided the coordinates that made targeted digital mining possible.',
          ),

          // SECTION 3: DIGITAL ARCHIVE MINING & THE GAZETTES
          h1('3. Phase 2: Digital Archive Mining — How We Extracted the London Gazettes'),
          p(
            'In traditional military research, finding a specific citation in the London Gazette often meant hours of scrolling through physical microfilm reels or bound leather volumes at the British Library or National Archives in Kew. Today, official state archives are digitized, but search algorithms frequently fail if you search by a soldier’s correct name when a clerk made a typo in 1916.',
          ),
          p(
            'Here is the exact digital process we used on Friday morning (11 September) to locate and extract the authentic wartime state papers:',
          ),

          h2('The 1916 DCM Citation (Supplement 29760, 22 September 1916, Page 9291)'),
          p(
            'Using your clue regarding the misprint "Crummock" and service number #2423, we queried the official British Government National Archives portal at thegazette.co.uk:',
          ),
          bullet(
            'Search Query: We searched the Gazette military archives using the Boolean string: "2423" AND "York and Lanc" within the date range September 1916.',
            'Step 1 (Querying):',
          ),
          bullet(
            'Instant Match: The archive returned The London Gazette, Supplement 29760, published on 22 September 1916.',
            'Step 2 (Hit):',
          ),
          bullet(
            'Archival Extraction: We downloaded the official high-resolution government archive PDF of Page 9291, located Ernest in the right-hand column, and cropped his exact entry:',
            'Step 3 (Extraction):',
          ),

          createCallout([
            p(
              '“2423 L./Sjt. E. E. Crummock, York & Lanc. R. — For conspicuous gallantry in carrying wounded under fire, both by day and night. On one occasion he rendered very gallant service with his machine gun.”',
              { italic: true, bold: true, color: '1E3A8A' },
            ),
            p('— The London Gazette, Supplement 29760 (22 September 1916, Page 9291)', {
              size: 18,
              color: '64748B',
            }),
          ]),

          bullet(
            'Pedagogical Visual Card: We combined the cropped entry with the official masthead of the London Gazette to generate an interactive citation card (gazette_dcm_1916_citation_card.jpg) with a zoomable modal so our GCSE pupils can inspect the original 1916 typography.',
            'Step 4 (Pupil Presentation):',
          ),

          h2('The 1919 Military Cross Citation (Supplement 31480, 30 July 1919, Page 9725)'),
          p(
            'For his 1918 commissioning and Military Cross, we targeted the post-war gallantry supplements for the Canal du Nord crossing (September–October 1918):',
          ),
          bullet(
            'Search Query: "Ernest Edward Crummack" AND "Military Cross" AND "Canal du Nord".',
            'Step 1 (Querying):',
          ),
          bullet(
            'Document Discovery: The search retrieved The London Gazette, Supplement 31480, published 30 July 1919.',
            'Step 2 (Hit):',
          ),
          bullet(
            'Archival Extraction: We extracted Page 9725 (london_gazette_mc_page_1919.jpg) and cropped the complete combat narrative:',
            'Step 3 (Extraction):',
          ),

          createCallout([
            p(
              '“2nd/Lt. Ernest Edward Crummack, D.C.M., 4th Bn., Y. and L. R., T.F., attd. 6th Bn. Near Epinoy on September 27th, 1918, he and two men crossed the Canal du Nord under cover of our rifle fire, and drove a party of the enemy southwards into the hands of another platoon. This operation completed the work done by another officer and his men further down the canal. The combined work of both was responsible for clearing the east bank of the canal, and so allowing the attack of the division to carry on without interruption. Lt. Crummack was badly wounded on October 1st, leading the men through uncut wire. Through the whole operation he set a fine example of pluck and daring to his men.”',
              { italic: true, bold: true, color: '0F172A' },
            ),
            p('— The London Gazette, Supplement 31480 (30 July 1919, Page 9725)', {
              size: 18,
              color: '64748B',
            }),
          ]),

          // SECTION 4: TRIANGULATION & SASSOON
          h1('4. Phase 3: Forensic Triangulation — The Sassoon & Goodall Discovery'),
          p(
            'Under British War Office censorship regulations during the Great War, gallantry citations deliberately withheld the names of rescued casualties to protect officer privacy and prevent German intelligence from assessing command attrition. As a result, Ernest’s DCM citation only stated: "carrying wounded under fire".',
          ),
          p(
            'Your archival research achieved what few professional historians manage: you proved the exact identity of the rescued officer. To build an airtight academic case on our school platform, we used digital cross-referencing to triangulate four independent primary records:',
          ),
          bullet(
            'Recorded that only one subaltern was wounded cutting enemy wire during the trench raid on the night of 3–4 July 1916 along Mill Road.',
            '1. 1/5th Battalion War Diary (July 1916):',
          ),
          bullet(
            'Frontline diary of Pte Walter Hutchinson (stretcher-bearer), who recorded an officer staggering back into the trench at 10 am saying Captain Goodall was badly wounded and requesting stretchers.',
            '2. Eyewitness Field Diary:',
          ),
          bullet(
            'Contains the explicit biographical tribute: "He was wounded as he cut the enemy wire along with another man... He was rescued by Lance Sergeant E.E. Crummock [Crummack] who was awarded the Distinguished Conduct Medal for his work in rescuing wounded men that day."',
            '3. Hazelwood School Roll of Honour:',
          ),
          bullet(
            'Confirms 2nd Lt Marcus Herbert Goodall succumbed to his wounds on 14 July 1916 at the 3rd/44th Casualty Clearing Station at Puchevillers.',
            '4. CWGC Casualty Returns:',
          ),

          h2('Digital Paleography: Siegfried Sassoon’s Autograph Notebook'),
          p(
            'To elevate this from a local interest story to a national literary case study, we accessed the digital archives of Cambridge University Library (MS Add.9852/1/7, f. 38r), which preserves Siegfried Sassoon’s actual pocket trench notebook. We transcribed the working manuscript of his poem "Elegy: for M.G. (Marcus Goodall)" and built interactive forensic paleography hotspots showing Sassoon’s real-time revisions under fire:',
          ),
          bullet(
            'Sassoon crossed out "Orange" and substituted "Yellow" in line 6 to capture the fragile colours of an English summer garden.',
            'Hotspot 1 (Visual Imagery):',
          ),
          bullet(
            'In line 10, he crossed out "Following &" and inserted "Thinning & whirling & subsiding" to depict dying thoughts dissipating like smoke.',
            'Hotspot 2 (Psychological Trauma):',
          ),
          bullet(
            'In line 11, he altered "Poor victim" to "Sad victim", rejecting pity in favour of tragic dignity.',
            'Hotspot 3 (Moral Weight):',
          ),
          bullet(
            'In line 21, he struck out "wet clay" and substituted "dead clay" beneath.',
            'Hotspot 4 (Sensory Realism):',
          ),
          p(
            'By pairing Sassoon’s poetry with Sergeant Crummack’s physical courage, our pupils learn that soldiers were not passive victims of war, but active agents of profound moral comradeship.',
          ),

          // SECTION 5: THE THREE ERRORS AUTOPSY
          h1('5. Phase 4: Behind the Curtain — An Autopsy of Three AI Errors We Caught'),
          p(
            'Now we come to the most important part of this guide for your own research: Why does AI make mistakes, and how can you spot them?',
          ),
          p(
            'In the course of developing this unit, our AI assistant attempted to introduce three significant errors. A human teacher had to intervene each time to catch and eradicate them. Studying these real examples will protect you from falling into similar traps in your own work.',
          ),

          h2('Error 1: The "False Attribution & Narrative Conflation" Trap'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY WROTE:', { bold: true, color: 'B45309' }),
              p(
                '“Great-grandfather Ted Crummack recounted that his father made an emotional pilgrimage back to France in the 1930s, visiting the Menin Gate and staying at the Hôtel Ypriana...”',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'Ted Crummack (Aby’s great-grandfather, born 1908) remembered standing in the Rotherham Drill Hall in 1914 as a six-year-old and remembered Canon Goodall visiting their house. He NEVER recounted the interwar tour. The tour is known strictly because three physical postcards survived in Ernest’s personal possession (Menin Gate, Hôtel Ypriana, and Albert).',
              ),
              p('WHY THE AI DID IT:', { bold: true, color: '1E3A8A' }),
              p(
                'Large Language Models are probabilistic predictive engines designed to write smooth, coherent prose. If you feed an AI two distinct pieces of family lore (Fact A: Ted remembered 1914; Fact B: Ernest took a tour evidenced by postcards), the model hates disconnected facts. It will naturally "glue" them together by falsely attributing the postcards to Ted’s memory to make a neat story.',
              ),
              p('THE LESSON FOR JOHN:', { bold: true, color: '0F172A' }),
              p(
                'Never let AI decide who told a story. Always demand: "Separate oral testimonies from physical artifact evidence into distinct headings."',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h2('Error 2: The "Dramatic Embellishment / Romantic Fluff" Trap'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY WROTE:', { bold: true, color: 'B45309' }),
              p(
                'The AI described the interwar tour as “an emotional pilgrimage back to France to quietly pay homage to the comrades who never came home”. Later, on the Canal du Nord map, it invented a description claiming “the 2/4th York & Lancasters were pinned down by severe Maxim fire from cellar positions... Crummack led a bombing dash through heavy sweeps, killed the enemy crew, and captured the gun”.',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'There is zero primary evidence describing Ernest’s internal emotional state on that tour—it was simply a battlefield tour. And the London Gazette citation makes no mention of cellars, bombing dashes, or capturing machine-gun crews; it states he crossed the canal with two men under rifle fire and drove enemy soldiers south into another platoon.',
              ),
              p('WHY THE AI DID IT:', { bold: true, color: '1E3A8A' }),
              p(
                'AI models are trained on millions of popular novels, war movies, and sensationalist magazine articles. Their default "creative temperature" prompts them to fill gaps with Hollywood cliches (“bombing dashes”, “emotional pilgrimages”, “cellar bunkers”).',
              ),
              p('THE LESSON FOR JOHN:', { bold: true, color: '0F172A' }),
              p(
                'Instruct the AI to adopt an "Archival Juridical Register": "State strictly what is physically written on the record. Never extrapolate internal feelings, emotions, or cinematic combat choreography."',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h2('Error 3: The "Macro-Map Sector Drift" Trap'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY WROTE:', { bold: true, color: 'B45309' }),
              p(
                'On our tactical battle map of the Canal du Nord (Map 13), the AI placed Pin 1 at Sains-lez-Marquion and Lock 3.',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'Sains-lez-Marquion and Lock 3 were in the 1st Canadian Division sector. Ernest was attached to the 6th Battalion, York & Lancaster Regiment, which was part of the 32nd Brigade in the 11th (Northern) Division. His official citation explicitly says: "Near Epinoy on September 27th, 1918". On the map, Epinoy is located several miles to the north-east in the British XVII Corps sector!',
              ),
              p('WHY THE AI DID IT:', { bold: true, color: '1E3A8A' }),
              p(
                'In the vast majority of historical literature, the Battle of Canal du Nord is celebrated for the famous Canadian Corps breakthrough at Sains-lez-Marquion and Bourlon Wood. The AI suffered from "statistical gravity": it latched onto the most famous location associated with the battle name, completely ignoring the specific battalion order of battle.',
              ),
              p('THE LESSON FOR JOHN:', { bold: true, color: '0F172A' }),
              p(
                'Always verify military geography through the rigid Order of Battle (ORBAT) chain: Division -> Brigade -> Battalion. Never accept an AI’s battle location without checking which corps sector that specific unit held on that date.',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          // SECTION 6: THE HISTORIAN'S PROMPT TOOLKIT
          h1('6. Phase 5: The Historian’s Practical AI Prompting Toolkit'),
          p(
            'To help you get the best possible results when using tools like ChatGPT, Claude, or Google Gemini for your own historical research, I have prepared five battle-tested prompt templates. You can copy and paste these directly into your AI chat window and insert your own family details.',
          ),

          h3('Prompt 1: The "Strict Archival Extraction" Prompt (Prevents Embellishment)'),
          createCallout(
            [
              p(
                '“Act as an academic military archivist. I am going to paste notes and primary source excerpts regarding [INSERT SOLDIER NAME, REGIMENT, DATES]. Your task is to organize this into a chronological biographical timeline.',
                { italic: true, size: 20 },
              ),
              p(
                'CRITICAL RULES:\n1. Do NOT invent, assume, or extrapolate any details not explicitly present in my notes.\n2. Do NOT infer emotional states, personal feelings, or motives.\n3. Clearly distinguish between oral family memories and physical documentary evidence (e.g. medals, service papers, postcards).\n4. If there is an ambiguity or gap in the record, flag it with [UNKNOWN / REQUIRES VERIFICATION] rather than guessing.\n\nHere is my data: [PASTE YOUR RAW NOTES]”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Prompt 2: The "Military Acronym & Casualty Record Decoder" Prompt'),
          createCallout(
            [
              p(
                '“Act as a British Army military historian specializing in the First World War. I am examining a soldier’s service record / medal index card / casualty return. Please decode and explain the following wartime abbreviations, giving their full military meaning and historical context:',
                { italic: true, size: 20 },
              ),
              p(
                '[PASTE ABBREVIATIONS, e.g., "SW Leg", "GSW Chest", "3/44 CCS", "148 Bde", "49 Div", "TF", "attd", "DOW"]\n\nExplain: What physical medical or organizational pathway did this soldier go through based on these terms?”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Prompt 3: The "Battalion War Diary Synthesizer" Prompt'),
          createCallout(
            [
              p(
                '“I have a transcription [or photo] of a page from the Battalion War Diary for [INSERT BATTALION, e.g., 1/5th York and Lancaster Regiment] covering [INSERT DATES].',
                { italic: true, size: 20 },
              ),
              p(
                'Please summarize this diary entry in a structured table containing:\n- Date & Time\n- Trench Map Grid Reference / Location\n- Weather & Ground Conditions\n- Operational Summary (trench raids, gas attacks, relief, working parties)\n- Recorded Casualties (Officers & Other Ranks: Killed, Wounded, Missing)\n- Key Names Mentioned\n\nDo not add any outside historical commentary; summarize ONLY what the adjutant wrote in the diary.”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Prompt 4: The "London Gazette & Typo Hunter" Prompt'),
          createCallout(
            [
              p(
                '“I am searching for a British soldier’s medal citation in The London Gazette archives between 1914 and 1920. His name was [INSERT NAME], service number [INSERT NUMBER], and regiment [INSERT REGIMENT].',
                { italic: true, size: 20 },
              ),
              p(
                'Because War Office clerks frequently introduced spelling errors and OCR scans can misread Victorian fonts, please generate:\n1. A list of likely phonetic or typographical spelling variations for this surname.\n2. Three targeted search strings I can use in the London Gazette search engine combining service number, battalion, and wildcards.\n3. The likely date window for gazetting based on the date of his combat action [INSERT DATE OF ACTION].”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Prompt 5: The "Order of Battle (ORBAT) Sector Verifier" Prompt'),
          createCallout(
            [
              p(
                '“I want to verify the exact operational command hierarchy for [INSERT BATTALION, e.g., 6th Battalion, York & Lancaster Regiment] during the Battle of [INSERT BATTLE, e.g., Canal du Nord] on [INSERT DATE, e.g., 27 September 1918].',
                { italic: true, size: 20 },
              ),
              p(
                'Please provide:\n1. The Brigade, Division, and Corps this battalion belonged to on that date.\n2. Their geographic attack sector (which British or Allied army they were under, and neighboring divisions on their left and right).\n3. Any known objective lines (e.g. Red Line, Green Line, or named villages like Epinoy or Marquion).\n\nProvide citations to official British military histories or divisional histories.”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          // SECTION 7: RECOMMENDED ONLINE PORTALS
          h1('7. Recommended Digital Portals for Great War Research'),
          p(
            'These are the most reliable, free primary source repositories available online today:',
          ),
          bullet(
            'Official state newspaper of record. Search for DCM, MM, MC, and officer commissions. Always search by service number first if the surname fails.',
            '1. The London Gazette (thegazette.co.uk):',
          ),
          bullet(
            'Search records in series WO 95 (Battalion War Diaries), WO 339/WO 374 (Officer Service Files), and WO 363/364 (Burnt Records & Unburnt Service Papers).',
            '2. The National Archives Discovery (discovery.nationalarchives.gov.uk):',
          ),
          bullet(
            'World-class, high-resolution digitized British trench maps of France and Belgium overlaid with modern Google satellite imagery with an interactive transparency slider.',
            '3. National Library of Scotland Trench Maps (maps.nls.uk/geo/explore):',
          ),
          bullet(
            'Search burial plots, cemetery registers, and original "Graves Concentration" field returns showing where bodies were originally recovered.',
            '4. Commonwealth War Graves Commission (cwgc.org):',
          ),
          bullet(
            'Imperial War Museums digital permanent archive connecting photographs, service sheets, and family memorabilia.',
            '5. Lives of the First World War (IWM / livesofthefirstworldwar.iwm.org.uk):',
          ),

          // SECTION 8: CLOSING REMARKS
          h1('8. Conclusion & Looking Forward to Our Meeting'),
          p(
            'John, your work on Ernest Edward Crummack represents the absolute finest tradition of British family history: patient, rigorous, grounded in primary evidence, and driven by love and remembrance for those who went before us.',
          ),
          p(
            'When we meet after school, I would love to sit down with you and show you Ernest’s interactive dossier live on the smartboard. We can explore the high-resolution London Gazette citation cards, examine Siegfried Sassoon’s manuscript, and test out some of these AI search workflows together.',
          ),
          p(
            'If you have any further original photographs, letters, or the surviving postcards from his 1930s battlefield tour, we would be honoured to scan and digitize them so that Aby and generations of Meoncross pupils can continue to learn from 2nd Lieutenant Crummack’s remarkable courage.',
          ),
          p('With warmest regards and deepest respect,'),
          p('Benjamin Lovett', { bold: true, color: '1E3A8A' }),
          p('Head of History, Meoncross School\nben.lovett@meoncross.co.uk'),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(docxPath, buffer);
  console.log(`✅ Word Document generated successfully: ${docxPath}`);
}

// ----------------------------------------------------
// BUILD COMPANION HTML & PDF
// ----------------------------------------------------
async function buildHtmlAndPdf() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AI for the Family Military Historian — Edward Pearson Guide</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');
    
    @page {
      size: A4;
      margin: 20mm 18mm 20mm 18mm;
      @bottom-right {
        content: counter(page) " of " counter(pages);
      }
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #334155;
      line-height: 1.65;
      font-size: 10.5pt;
      margin: 0;
      padding: 30px;
      background: #ffffff;
    }

    .header-block {
      text-align: center;
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 20px;
      margin-bottom: 25px;
    }

    .sub-dept {
      font-size: 9pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #b45309;
      margin-bottom: 6px;
    }

    h1.doc-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24pt;
      color: #1e3a8a;
      margin: 0 0 8px 0;
      font-weight: 700;
    }

    .doc-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.5pt;
      font-style: italic;
      color: #475569;
      margin: 0 0 15px 0;
    }

    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0 25px 0;
      font-size: 9pt;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }

    .meta-table td {
      padding: 6px 12px;
      border-bottom: 1px solid #e2e8f0;
    }

    .meta-label {
      font-weight: 700;
      color: #1e3a8a;
      width: 22%;
      background: #f1f5f9;
    }

    h2.section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14pt;
      color: #1e3a8a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 5px;
      margin-top: 25px;
      margin-bottom: 12px;
      page-break-after: avoid;
    }

    h3.sub-section-title {
      font-size: 11pt;
      color: #0f172a;
      margin-top: 18px;
      margin-bottom: 8px;
      font-weight: 700;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 10px 0;
    }

    ul {
      margin: 0 0 12px 0;
      padding-left: 20px;
    }

    li {
      margin-bottom: 5px;
    }

    .callout {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 5px solid #1e3a8a;
      border-radius: 6px;
      padding: 12px 16px;
      margin: 14px 0;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }

    .callout.warning {
      background: #fffbeb;
      border-color: #fde68a;
      border-left-color: #b45309;
    }

    .callout.success {
      background: #f0fdf4;
      border-color: #bbf7d0;
      border-left-color: #15803d;
    }

    .callout-title {
      font-weight: 700;
      text-transform: uppercase;
      font-size: 8pt;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
      display: block;
    }

    .callout.warning .callout-title { color: #b45309; }
    .callout .callout-title { color: #1e3a8a; }

    .prompt-box {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-left: 5px solid #3b82f6;
      border-radius: 6px;
      padding: 12px 14px;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 8.8pt;
      line-height: 1.5;
      color: #1e293b;
      margin: 12px 0;
      white-space: pre-wrap;
      page-break-inside: avoid;
    }

    .footer-signoff {
      margin-top: 30px;
      border-top: 1px solid #e2e8f0;
      padding-top: 15px;
      font-size: 9.5pt;
      color: #475569;
    }
  </style>
</head>
<body>

  <div class="header-block">
    <div class="sub-dept">Meoncross School History Department · Family Military Research Series</div>
    <h1 class="doc-title">AI for the Family Military Historian</h1>
    <div class="doc-subtitle">Archival Mining, Digital Paleography, Verification Guardrails, and How to Avoid AI Embellishment</div>
  </div>

  <table class="meta-table">
    <tr>
      <td class="meta-label">Prepared For:</td>
      <td><strong>Edward Pearson ("John")</strong> — Grandfather of Aby (Year 10) &amp; Crummack Family Historian</td>
    </tr>
    <tr>
      <td class="meta-label">Author:</td>
      <td><strong>Benjamin Lovett</strong> — Head of History, Meoncross School (ben.lovett@meoncross.co.uk)</td>
    </tr>
    <tr>
      <td class="meta-label">Case Study:</td>
      <td><strong>2nd Lieutenant Ernest Edward Crummack MC, DCM</strong> (1885–1958), 1/5th &amp; 6th Bn York &amp; Lancaster Regt</td>
    </tr>
    <tr>
      <td class="meta-label">Date:</td>
      <td>September 2026 · Ypres &amp; Somme Battlefield Study Expedition</td>
    </tr>
  </table>

  <h2 class="section-title">1. Introduction &amp; Executive Welcome</h2>
  <p><strong>Dear John (Edward),</strong></p>
  <p>When Harriet passed on your email and kind words regarding the 2nd Lieutenant Ernest Crummack dossier, I was absolutely thrilled. As a history teacher, discovering a pupil with such an extraordinary direct family link to the Western Front—and with a grandfather who has spent decades conducting genuine, rigorous archival research—is an absolute privilege for our school.</p>
  <p>You mentioned that you have recently begun experimenting with Artificial Intelligence (AI) as a research tool, but that you have run into frustrating hurdles where the software assumes relationships, links incorrect names, or invents historical details that simply aren’t in the records. I want to tell you straight away: <strong>your instinct is 100% correct</strong>. AI is a remarkable research assistant, but unless it is bound by strict guardrails, it has an innate tendency to behave like an over-enthusiastic novelist rather than a disciplined military historian.</p>
  <p>This guide has been prepared specifically for you ahead of our meeting after school. In it, I share the complete "behind-the-scenes" journey of how we built Ernest’s interactive dossier on the Meoncross History platform, including an honest review of where the AI stumbled and tried to invent things, and how you can use targeted prompts to prevent that in your own research.</p>

  <h2 class="section-title">2. Phase 1: The Human Foundation — John’s Research Leads</h2>
  <p>The first golden rule of AI in historical research is: <em>Garbage In, Garbage Out</em>. AI cannot discover anything out of thin air. It requires high-quality primary anchors provided by human historians. The foundation of Ernest’s digital dossier came entirely from your meticulous family scholarship:</p>
  <ul>
    <li><strong>Enlistment &amp; Regimental Identity:</strong> Ernest enlisted at Rotherham Drill Hall on 2 September 1914 as Private 2423 in the 1/5th York &amp; Lancaster Regiment, witnessed by his 6-year-old son Ted.</li>
    <li><strong>Somme Gallantry:</strong> Awarded the Distinguished Conduct Medal (DCM) for rescuing a stricken officer in No Man’s Land on the Somme in July 1916, plus the Imperial Russian Order of St George.</li>
    <li><strong>The Clerical Typo Clue:</strong> War Office clerks misprinted his surname as "Crummock" with an ‘o’ in the London Gazette, which defeated standard search engines for decades.</li>
    <li><strong>The Sassoon Connection:</strong> The rescued officer was 2nd Lt Marcus Goodall, son of the Canon of Rotherham and close friend of poet Siegfried Sassoon.</li>
    <li><strong>1918 Commissioning &amp; MC:</strong> Commissioned on 30 January 1918 as 2nd Lieutenant in the 1/4th (Territorial) Bn, but attached in practice to the 6th (Service) Battalion at Canal du Nord, winning the Military Cross.</li>
    <li><strong>Post-War Legacy:</strong> Surviving postcards confirming his interwar tour (Menin Gate, Hôtel Ypriana, Albert), and his passing in Dinnington in 1958 at age 73.</li>
  </ul>

  <h2 class="section-title">3. Phase 2: Digital Archive Mining — Extracting the London Gazettes</h2>
  <p>In traditional military research, finding a specific citation in the London Gazette meant hours of scrolling through physical microfilm reels. Today, official state papers are digitized at <code>thegazette.co.uk</code>, but search algorithms frequently fail if you search by a soldier’s correct name when a clerk made a typo in 1916.</p>
  
  <h3 class="sub-section-title">The 1916 DCM Citation (Supplement 29760, 22 September 1916, Page 9291)</h3>
  <p>Using your clue regarding the misprint "Crummock" and service number #2423, we queried the official British Government National Archives portal:</p>
  <ul>
    <li><strong>Boolean Search:</strong> We searched <code>"2423" AND "York and Lanc"</code> in September 1916.</li>
    <li><strong>Instant Match:</strong> The system retrieved Supplement 29760.</li>
    <li><strong>Archival Extraction:</strong> We downloaded the official archive PDF of Page 9291 and cropped Ernest's verbatim entry:</li>
  </ul>

  <div class="callout">
    <span class="callout-title">The London Gazette · Supplement 29760 (22 Sept 1916, p. 9291)</span>
    <em>“2423 L./Sjt. E. E. Crummock, York &amp; Lanc. R. — For conspicuous gallantry in carrying wounded under fire, both by day and night. On one occasion he rendered very gallant service with his machine gun.”</em>
  </div>

  <h3 class="sub-section-title">The 1919 Military Cross Citation (Supplement 31480, 30 July 1919, Page 9725)</h3>
  <p>For his 1918 commissioning and Military Cross, we targeted the post-war gallantry supplements for the Canal du Nord crossing:</p>
  <ul>
    <li><strong>Targeted Search:</strong> <code>"Ernest Edward Crummack" AND "Military Cross" AND "Canal du Nord"</code>.</li>
    <li><strong>Document Discovery:</strong> Retrieved Supplement 31480 (30 July 1919).</li>
    <li><strong>Verbatim Combat Narrative:</strong></li>
  </ul>

  <div class="callout">
    <span class="callout-title">The London Gazette · Supplement 31480 (30 July 1919, p. 9725)</span>
    <em>“2nd/Lt. Ernest Edward Crummack, D.C.M., 4th Bn., Y. and L. R., T.F., attd. 6th Bn. Near Epinoy on September 27th, 1918, he and two men crossed the Canal du Nord under cover of our rifle fire, and drove a party of the enemy southwards into the hands of another platoon. This operation completed the work done by another officer and his men further down the canal. The combined work of both was responsible for clearing the east bank of the canal, and so allowing the attack of the division to carry on without interruption. Lt. Crummack was badly wounded on October 1st, leading the men through uncut wire. Through the whole operation he set a fine example of pluck and daring to his men.”</em>
  </div>

  <h2 class="section-title">4. Phase 3: Forensic Triangulation — The Sassoon &amp; Goodall Discovery</h2>
  <p>Under British War Office censorship regulations, gallantry citations withheld casualty names. As a result, Ernest’s DCM citation only stated: "carrying wounded under fire". Your research proved the identity of the wounded officer. We corroborated this across four independent primary records:</p>
  <ul>
    <li><strong>1/5th Battalion War Diary:</strong> Confirmed only one subaltern was wounded on the wire during the raid on 3–4 July 1916 along Mill Road.</li>
    <li><strong>Eyewitness Field Diary:</strong> Private Walter Hutchinson (stretcher-bearer) recorded an officer staggering back into the trench at 10 am requesting stretchers for Captain Goodall.</li>
    <li><strong>Hazelwood School Roll of Honour:</strong> Explicitly states: <em>“He was rescued by Lance Sergeant E.E. Crummock [Crummack] who was awarded the Distinguished Conduct Medal for his work in rescuing wounded men that day.”</em></li>
    <li><strong>Cambridge University Library (MS Add.9852/1/7):</strong> Siegfried Sassoon’s pocket trench notebook, where he wrote <em>“Elegy: for M.G. (Marcus Goodall)”</em>. We built an interactive forensic paleography loupe showing Sassoon’s live ink revisions (e.g. altering "Poor victim" to "Sad victim", and "wet clay" to "dead clay").</li>
  </ul>

  <h2 class="section-title">5. Phase 4: Behind the Curtain — Three Real AI Errors We Caught</h2>
  <p>In developing this unit, our AI assistant attempted to introduce three significant errors. Studying these real examples will protect you from falling into similar traps in your own research:</p>

  <div class="callout warning">
    <span class="callout-title">Error 1: The False Attribution &amp; Conflation Trap</span>
    <p><strong>What the AI wrote:</strong> <em>“Great-grandfather Ted Crummack recounted that his father made an emotional pilgrimage back to France in the 1930s, visiting the Menin Gate...”</em></p>
    <p><strong>The Reality:</strong> Ted Crummack (born 1908) remembered 1914 Drill Hall and Canon Goodall’s visit. He NEVER recounted the interwar tour. The tour is known strictly from three physical postcards found in Ernest’s collection (Menin Gate, Hôtel Ypriana, Albert).</p>
    <p><strong>Why AI does this:</strong> Language models hate disconnected facts. If given two separate family memories, the model "glues" them together into a smooth story by falsely attributing the postcards to Ted.</p>
    <p><strong>The Lesson:</strong> Never let AI decide who told a story. Always demand: <em>“Separate oral testimonies from physical artifact evidence into distinct headings.”</em></p>
  </div>

  <div class="callout warning">
    <span class="callout-title">Error 2: The Dramatic Embellishment / Romantic Fluff Trap</span>
    <p><strong>What the AI wrote:</strong> The AI converted 3 postcards into <em>“an emotional pilgrimage to quietly pay homage to fallen comrades”</em>, and on the battle map invented <em>“a bombing dash against cellar positions and sunken road embankments”</em>.</p>
    <p><strong>The Reality:</strong> The postcards do not record internal emotional states, and the Gazette citation mentions neither cellars nor bombing dashes.</p>
    <p><strong>Why AI does this:</strong> AI models are trained on historical fiction and TV dramas. Their default setting adds cinematic flair.</p>
    <p><strong>The Lesson:</strong> Instruct the AI: <em>“State strictly what is physically written on the record. Never extrapolate internal feelings, emotions, or cinematic combat choreography.”</em></p>
  </div>

  <div class="callout warning">
    <span class="callout-title">Error 3: The Macro-Map Sector Drift Trap</span>
    <p><strong>What the AI wrote:</strong> On the Canal du Nord battle map, the AI placed Pin 1 at Sains-lez-Marquion and Lock 3.</p>
    <p><strong>The Reality:</strong> Sains-lez-Marquion was in the 1st Canadian Division sector. Ernest was attached to the 6th York &amp; Lancasters (11th Northern Division), which attacked miles to the north towards Epinoy.</p>
    <p><strong>Why AI does this:</strong> The AI latched onto the most famous location associated with "Canal du Nord 1918" (the Canadian crossing), ignoring the specific battalion’s Order of Battle.</p>
    <p><strong>The Lesson:</strong> Always verify military geography through the rigid chain: Division → Brigade → Battalion.</p>
  </div>

  <h2 class="section-title">6. Phase 5: The Historian’s Practical AI Prompting Toolkit</h2>
  <p>Copy and paste these battle-tested prompts directly into ChatGPT, Claude, or Gemini:</p>

  <h3 class="sub-section-title">Prompt 1: Strict Archival Fact-Extraction (Prevents Hallucinations)</h3>
  <div class="prompt-box">Act as an academic military archivist. I am going to paste notes and primary source excerpts regarding [INSERT SOLDIER NAME, REGIMENT, DATES]. Your task is to organize this into a chronological biographical timeline.

CRITICAL RULES:
1. Do NOT invent, assume, or extrapolate any details not explicitly present in my notes.
2. Do NOT infer emotional states, personal feelings, or motives.
3. Clearly distinguish between oral family memories and physical documentary evidence (e.g. medals, service papers, postcards).
4. If there is an ambiguity or gap in the record, flag it with [UNKNOWN / REQUIRES VERIFICATION] rather than guessing.

Here is my data: [PASTE YOUR RAW NOTES]</div>

  <h3 class="sub-section-title">Prompt 2: Military Acronym &amp; Casualty Record Decoder</h3>
  <div class="prompt-box">Act as a British Army military historian specializing in the First World War. I am examining a soldier’s service record / medal index card / casualty return. Please decode and explain the following wartime abbreviations, giving their full military meaning and historical context:

[PASTE ABBREVIATIONS, e.g., "SW Leg", "GSW Chest", "3/44 CCS", "148 Bde", "49 Div", "TF", "attd", "DOW"]

Explain: What physical medical or organizational pathway did this soldier go through based on these terms?</div>

  <h3 class="sub-section-title">Prompt 3: Battalion War Diary Synthesizer</h3>
  <div class="prompt-box">I have a transcription [or photo] of a page from the Battalion War Diary for [INSERT BATTALION] covering [INSERT DATES].

Please summarize this diary entry in a structured table containing:
- Date &amp; Time
- Trench Map Grid Reference / Location
- Weather &amp; Ground Conditions
- Operational Summary (trench raids, gas attacks, relief, working parties)
- Recorded Casualties (Officers &amp; Other Ranks: Killed, Wounded, Missing)
- Key Names Mentioned

Do not add any outside historical commentary; summarize ONLY what the adjutant wrote in the diary.</div>

  <h3 class="sub-section-title">Prompt 4: London Gazette &amp; Typo Generator</h3>
  <div class="prompt-box">I am searching for a British soldier’s medal citation in The London Gazette archives between 1914 and 1920. His name was [INSERT NAME], service number [INSERT NUMBER], and regiment [INSERT REGIMENT].

Because War Office clerks frequently introduced spelling errors and OCR scans can misread Victorian fonts, please generate:
1. A list of likely phonetic or typographical spelling variations for this surname.
2. Three targeted search strings I can use in the London Gazette search engine combining service number, battalion, and wildcards.
3. The likely date window for gazetting based on the date of his combat action [INSERT DATE OF ACTION].</div>

  <h3 class="sub-section-title">Prompt 5: Order of Battle (ORBAT) Sector Verifier</h3>
  <div class="prompt-box">I want to verify the exact operational command hierarchy for [INSERT BATTALION] during the Battle of [INSERT BATTLE] on [INSERT DATE].

Please provide:
1. The Brigade, Division, and Corps this battalion belonged to on that date.
2. Their geographic attack sector (which British or Allied army they were under, and neighboring divisions on their left and right).
3. Any known objective lines (e.g. Red Line, Green Line, or named villages like Epinoy or Marquion).

Provide citations to official British military histories or divisional histories.</div>

  <h2 class="section-title">7. Recommended Online Portals for Great War Research</h2>
  <ul>
    <li><strong>The London Gazette (thegazette.co.uk):</strong> Official state newspaper of record. Search for DCM, MM, MC, and commissions. Search by service number if name fails.</li>
    <li><strong>The National Archives Discovery (discovery.nationalarchives.gov.uk):</strong> Search series WO 95 (War Diaries) and WO 339/374 (Officer Service Files).</li>
    <li><strong>National Library of Scotland Trench Maps (maps.nls.uk/geo/explore):</strong> High-resolution WWI trench maps overlaid on modern Google satellite imagery with an interactive transparency slider.</li>
    <li><strong>Commonwealth War Graves Commission (cwgc.org):</strong> Cemetery registers and original Graves Concentration returns.</li>
    <li><strong>Lives of the First World War (IWM):</strong> Permanent digital archive of Great War servicemen and women.</li>
  </ul>

  <div class="footer-signoff">
    <p><strong>Looking Forward to Our Meeting</strong></p>
    <p>John, your research on Ernest represents the very best of British family scholarship. When we meet after school, I look forward to demonstrating these tools live on our smartboard and exploring any further postcards or letters you would like us to preserve for Aby and Meoncross pupils.</p>
    <p>With warmest regards,<br>
    <strong>Benjamin Lovett</strong><br>
    Head of History, Meoncross School (ben.lovett@meoncross.co.uk)</p>
  </div>

</body>
</html>`;

  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ HTML Document generated: ${htmlPath}`);

  // Compile PDF via Puppeteer
  console.log('Launching Puppeteer to compile printable PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: {
      top: '18mm',
      bottom: '18mm',
      left: '16mm',
      right: '16mm',
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate:
      '<div style="font-size: 8pt; color: #94a3b8; width: 100%; text-align: right; padding-right: 18mm;">Meoncross School History Department · Family Military Research Guide</div>',
    footerTemplate:
      '<div style="font-size: 8pt; color: #94a3b8; width: 100%; text-align: center; padding-top: 5px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
  });

  await browser.close();
  console.log(`✅ PDF Document compiled: ${pdfPath}`);
}

async function main() {
  await buildDocx();
  await buildHtmlAndPdf();
  console.log('\n🎉 ALL ASSETS GENERATED CLEANLY:');
  console.log(`1. Word Document: ${docxPath}`);
  console.log(`2. Printable PDF: ${pdfPath}`);
  console.log(`3. Clean HTML:    ${htmlPath}`);
}

main().catch((err) => {
  console.error('Error generating guide:', err);
  process.exit(1);
});
