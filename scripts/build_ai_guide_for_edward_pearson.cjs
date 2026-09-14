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

const docxPath = path.join(adminDir, 'Research_Dossier_and_AI_Case_Study_Ernest_Crummack.docx');
const htmlPath = path.join(adminDir, 'Research_Dossier_and_AI_Case_Study_Ernest_Crummack.html');
const pdfPath = path.join(adminDir, 'Research_Dossier_and_AI_Case_Study_Ernest_Crummack.pdf');

// Also maintain legacy paths for backward compatibility
const legacyDocxPath = path.join(
  adminDir,
  'AI_Guide_for_Family_Military_Historians_Edward_Pearson.docx',
);
const legacyHtmlPath = path.join(
  adminDir,
  'AI_Guide_for_Family_Military_Historians_Edward_Pearson.html',
);
const legacyPdfPath = path.join(
  adminDir,
  'AI_Guide_for_Family_Military_Historians_Edward_Pearson.pdf',
);

console.log(
  'Generating Departmental Research Dossier & AI Case Study ("The Good, The Bad, and The Ugly")...',
);

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

const successCalloutBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: '15803D' },
};

const warningCalloutBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: 'B45309' },
};

const dangerCalloutBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: '991B1B' },
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
        size: 30,
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
        size: 25,
        color: '0F172A',
        font: 'Georgia',
      }),
    ],
  });
}

function h3(text, color = 'B45309') {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 80 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        color: color,
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
    creator: 'Meoncross School History Department',
    title: 'Research Dossier & AI Case Study: 2nd Lt Ernest Edward Crummack MC DCM',
    description:
      'A technical record of primary archival discovery, AI research capabilities, identified errors, root cause analysis, and verification protocols structured around The Good, The Bad, and The Ugly.',
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Meoncross History Department · Research Dossier & AI Case Study',
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
                    text: '2nd Lt Ernest Edward Crummack MC DCM · "The Good, The Bad, and The Ugly" Audit',
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
          // Institutional Header Block
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({
                text: 'MEONCROSS SCHOOL HISTORY DEPARTMENT · ARCHIVAL RESEARCH DOSSIER',
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
                text: 'Research Dossier & AI Case Study',
                bold: true,
                size: 38,
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
                text: 'Reconstructing 2nd Lieutenant Ernest Edward Crummack MC, DCM (1885–1958):\nPrimary Archival Discovery, AI Capabilities, Research Errors, and "The Good, The Bad, and The Ugly" Historiographical Audit',
                italic: true,
                size: 21,
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
                    width: { size: 28, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9' },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p('Document Classification:', { bold: true, size: 18, color: '1E3A8A' }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 72, type: WidthType.PERCENTAGE },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p(
                        'Departmental Research Record & AI Historiographical Audit ("The Good, The Bad, and The Ugly")',
                        {
                          size: 18,
                          bold: true,
                        },
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 28, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9' },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [p('Historical Subject:', { bold: true, size: 18, color: '1E3A8A' })],
                  }),
                  new TableCell({
                    width: { size: 72, type: WidthType.PERCENTAGE },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p(
                        '2nd Lieutenant Ernest Edward Crummack MC, DCM (1885–1958) · 1/5th & 6th Bn York & Lancaster Regt',
                        { size: 18 },
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 28, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9' },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p('Institutional Context:', { bold: true, size: 18, color: '1E3A8A' }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 72, type: WidthType.PERCENTAGE },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p('Meoncross School GCSE Battlefield Study Expedition 2026 (Ypres & Somme)', {
                        size: 18,
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 28, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9' },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p('Research Contributors:', { bold: true, size: 18, color: '1E3A8A' }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 72, type: WidthType.PERCENTAGE },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p(
                        'Benjamin Lovett (Head of History) & John Pearson (Family Military Historian)',
                        { size: 18 },
                      ),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 28, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9' },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [p('Date of Record:', { bold: true, size: 18, color: '1E3A8A' })],
                  }),
                  new TableCell({
                    width: { size: 72, type: WidthType.PERCENTAGE },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [
                      p('September 2026 · Compiled at Meoncross School, Stubbington, Hampshire', {
                        size: 18,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          p('', { spaceAfter: 160 }),

          // SECTION 1: EXECUTIVE SUMMARY & THE TRIPARTITE AUDIT FRAMEWORK
          h1('1. Executive Summary & The Tripartite Audit Framework'),
          p(
            'This dossier provides an exhaustive technical and methodological record of the archival reconstruction of 2nd Lieutenant Ernest Edward Crummack MC, DCM (1885–1958). Conducted by the Meoncross School History Department ahead of the 2026 GCSE Ypres and Somme Battlefield Study Expedition, the project set out to investigate the direct Great War ancestry of a Year 10 pupil and family.',
          ),
          p(
            'The research combined two distinct investigative layers: decades of foundational human scholarship conducted by military historian John Pearson, and high-velocity digital mining executed via modern Artificial Intelligence (AI) and digitised state repositories.',
          ),
          p(
            'To evaluate the utility and perils of AI in historical inquiry with complete methodological honesty, this report structures its findings around the tripartite framework of The Good, The Bad, and The Ugly:',
          ),
          bullet(
            'High-velocity digital acceleration, bypassing human clerical typos via Boolean operators, instant retrieval of British Government London Gazette dispatches, 4-way cross-archival triangulation of censored casualties (2nd Lt Marcus Goodall), and paleographic transcription of Siegfried Sassoon’s trench notebook.',
            '• The Good (Breakthrough Discoveries):',
          ),
          bullet(
            'Procedural slip-ups and subtle tactical distortions where the AI remained historically plausible but breached rigorous method: narrative "gluing" of oral memory to physical postcards, cinematic "Hollywood" combat embellishments, administrative unit muddles, and macro-map sector drift placing Crummack in the Canadian sector at Sains-lez-Marquion instead of 11th Division at Epinoy.',
            '• The Bad (Procedural Slip-Ups & Sector Drift):',
          ),
          bullet(
            'Catastrophic generative confabulations where the AI, when missing primary records, actively fabricated reality from whole cloth: inventing a fictional wife ("Clara Senior") and parish wedding, fabricating an entire underground coal-mining career as a Dinnington "pit ripper" based on regional stereotyping (erasing his true iron puddling heritage at Parkgate Ironworks), drifting birth and death dates by entire decades, and erasing the wider family war effort.',
            '• The Ugly (Outright Hallucinations & Regional Stereotyping):',
          ),

          // SECTION 2: THE HUMAN FOUNDATION
          h1('2. Foundational Primary Clues (The Human Baseline)'),
          p(
            'A foundational law of historiography in the digital age is: Machine tools cannot discover truth in a vacuum. AI systems require primary coordinates established by human researchers. The investigation began with ten precise primary anchors provided from John Pearson’s multi-decade family archive:',
          ),
          bullet(
            'Ernest Edward Crummack was born on 6 September 1885 at Rawmarsh, near Rotherham. His father, Charles Crummack, was a skilled Shingler/Puddler working the reverberatory furnaces at Parkgate Iron and Steel Plant.',
            '1. Birth & Heavy Industry Origins:',
          ),
          bullet(
            'Ernest married Maud Coxon in Rawmarsh on 20 August 1906. They had two children: Edward ("Ted", born 1908) and Hilda. Maud tragically died of tuberculosis in April 1914, leaving Ernest a widower prior to mobilization.',
            '2. First Marriage & Family Loss:',
          ),
          bullet(
            'Ernest enlisted on 2 September 1914 at Rotherham Drill Hall as Private #2423 in the 1/5th Battalion, York & Lancaster Regiment (148th Bde, 49th West Riding Div), an event witnessed in person by his 6-year-old son Ted.',
            '3. Witnessed Enlistment Record:',
          ),
          bullet(
            'Awarded the Distinguished Conduct Medal (DCM) for rescuing a wounded officer in No Man’s Land on the Somme in July 1916, alongside the Imperial Russian Medal of St George (Second Class, Gold).',
            '4. Somme Gallantry Decorations:',
          ),
          bullet(
            'Crucial research clue: British War Office clerks misprinted his surname as "Crummock" with an ‘o’ in the London Gazette, causing search engines to miss his entry for decades.',
            '5. The Clerical Typo Clue:',
          ),
          bullet(
            'The rescued officer was 2nd Lt Marcus Goodall, son of the Canon of Rotherham and intimate friend of famed war poet Siegfried Sassoon. Canon Goodall visited Ernest after the war to express gratitude.',
            '6. The Goodall & Sassoon Nexus:',
          ),
          bullet(
            'Elder brother Frank Crummack served in the 1/5th York & Lancasters and was invalided out following the Boesinghe gas attack; sisters worked in munitions factories, notably Jessica Alma Crummack, Captain and Goalkeeper of a wartime women’s football team.',
            '7. Wider Family War Effort:',
          ),
          bullet(
            'Ernest married Elizabeth Hall in 1916 at Worksop. Their eldest child, Mary Crummack (John Pearson’s mother), carried the family’s direct DNA and lineage down to family historian John Pearson and the modern family.',
            '8. Second Marriage & Lineage:',
          ),
          bullet(
            'Commissioned on 30 January 1918 into the 1/4th (Territorial) Bn, but attached in operational service to the 6th (Service) Battalion, winning the Military Cross at the Canal du Nord in September 1918.',
            '9. Officer Commissioning & 1918 MC:',
          ),
          bullet(
            'Surviving interwar postcards confirm Ernest visited the Menin Gate, stayed at the Hôtel Ypriana in Ypres, and visited Albert on the Somme, before passing away peacefully in Dinnington in 1958 at age 73. His complete mounted six-medal group was presented many decades ago by his eldest son Ted Crummack to the York and Lancaster Regimental Museum at Clifton Park, Rotherham, where it remains permanently preserved.',
            '10. Interwar Legacy, Passing & Regimental Museum:',
          ),

          // SECTION 3: THE GOOD
          h1('3. The Good: Breakthrough Discoveries & Digital Acceleration'),
          p(
            'Guided by these foundational anchors, digital tools and targeted database mining unlocked authentic primary documents that had remained unlinked for over a century. Here AI and digital tools operated at their highest potential:',
          ),

          h2('1. The 1916 London Gazette DCM State Paper Extraction (Defeating the Clerical Typo)'),
          p(
            'Standard queries for "Ernest Crummack" in online archives yielded zero results due to the War Office spelling error. By utilizing Boolean operators targeting his service number and regiment—query: ("2423" AND "York and Lanc") within September 1916—the system instantly bypassed the typo and located the original wartime gazetting:',
          ),
          createCallout(
            [
              p(
                '“2423 L./Sjt. E. E. Crummock, York & Lanc. R. — For conspicuous gallantry in carrying wounded under fire, both by day and night. On one occasion he rendered very gallant service with his machine gun.”',
                { italic: true, bold: true, color: '15803D' },
              ),
              p('— The London Gazette, Supplement 29760 (22 September 1916, Page 9291)', {
                size: 18,
                color: '64748B',
              }),
            ],
            successCalloutBorders,
            'F0FDF4',
          ),
          p(
            'The high-resolution government archive PDF was extracted, the exact entry isolated, and an authenticated primary citation card was built for the school platform.',
          ),

          h2('2. The 1919 Military Cross Citation Extraction (Canal du Nord at Epinoy)'),
          p(
            'Targeting post-war gallantry awards for late-1918 actions ("Ernest Edward Crummack" AND "Military Cross" AND "Canal du Nord") retrieved Supplement 31480, published on 30 July 1919:',
          ),
          createCallout(
            [
              p(
                '“2nd/Lt. Ernest Edward Crummack, D.C.M., 4th Bn., Y. and L. R., T.F., attd. 6th Bn. Near Epinoy on September 27th, 1918, he and two men crossed the Canal du Nord under cover of our rifle fire, and drove a party of the enemy southwards into the hands of another platoon. This operation completed the work done by another officer and his men further down the canal. The combined work of both was responsible for clearing the east bank of the canal, and so allowing the attack of the division to carry on without interruption. Lt. Crummack was badly wounded on October 1st, leading the men through uncut wire. Through the whole operation he set a fine example of pluck and daring to his men.”',
                { italic: true, bold: true, color: '0F172A' },
              ),
              p('— The London Gazette, Supplement 31480 (30 July 1919, Page 9725)', {
                size: 18,
                color: '64748B',
              }),
            ],
            successCalloutBorders,
            'F0FDF4',
          ),

          h2('3. Forensic Triangulation: Proving the Identity of 2nd Lt Marcus Goodall'),
          p(
            'Under strict British wartime censorship, gallantry citations routinely omitted the names of rescued officers to prevent enemy intelligence from gauging command casualties. John Pearson had hypothesized that the rescued casualty was 2nd Lt Marcus Goodall. The research pipeline cross-referenced four independent repositories to prove this link beyond academic doubt:',
          ),
          bullet(
            'Recorded that only one officer was wounded while cutting enemy wire during the raid on 3–4 July 1916 along Mill Road.',
            'A. 1/5th Battalion War Diary (July 1916):',
          ),
          bullet(
            'Pte Walter Hutchinson recorded an officer staggering into the trench at 10 am stating that Captain Goodall had been badly wounded and requesting stretchers.',
            'B. Eyewitness Field Diary:',
          ),
          bullet(
            'Preserved the definitive biographical record: "He was wounded as he cut the enemy wire along with another man... He was rescued by Lance Sergeant E.E. Crummock [Crummack] who was awarded the Distinguished Conduct Medal for his work in rescuing wounded men that day."',
            'C. Hazelwood School Great War Roll of Honour:',
          ),
          bullet(
            'Confirmed 2nd Lt Marcus Herbert Goodall succumbed to his wounds on 14 July 1916 at the 3rd/44th Casualty Clearing Station at Puchevillers.',
            'D. Commonwealth War Graves Commission:',
          ),

          h2('4. Autograph Manuscript Paleography at Cambridge University Library'),
          p(
            'The investigation located Siegfried Sassoon’s pocket trench notebook at Cambridge University Library (MS Add.9852/1/7, f. 38r). Written near the frontlines in July 1916, Sassoon’s manuscript of "Elegy: for M.G. (Marcus Goodall)" was transcribed, and digital forensic hotspots were constructed to examine live manuscript corrections ("Orange" struck out for "Yellow", "Poor victim" struck out for "Sad victim", "wet clay" struck out for "dead clay").',
          ),

          // SECTION 4: THE BAD
          h1('4. The Bad: Procedural Slip-Ups, Tactical Conflations & Sector Drift'),
          p(
            'The category of "The Bad" comprises subtle methodological slippages, narrative shortcuts, and geographic displacements. In these instances, the AI remained superficially plausible and historically adjacent, but compromised rigorous evidence boundaries:',
          ),

          h3('Error 1: Oral Memory vs. Physical Artifact Conflation (Narrative "Gluing")'),
          createCallout(
            [
              p('AI INVENTED CLAIM:', { bold: true, color: 'B45309' }),
              p(
                '“Great-grandfather Ted Crummack recounted that his father made an emotional pilgrimage back to France in the 1930s, visiting the Menin Gate and staying at the Hôtel Ypriana...”',
                { italic: true },
              ),
              p('DOCUMENTED HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'Ted Crummack (born 1908) remembered the 1914 Drill Hall and Canon Goodall’s post-war visit. He never recounted the interwar tour. The tour is known strictly from three physical postcards found in Ernest’s personal possession (Menin Gate, Hôtel Ypriana, Albert).',
              ),
              p('ROOT CAUSE ANALYSIS:', { bold: true, color: '1E3A8A' }),
              p(
                'Narrative gluing. Language models strive for seamless prose; presented with two disconnected facts, the AI artificially fused them into a single fictional oral monologue.',
              ),
              p('HOW IT WAS FIXED:', { bold: true, color: '0F172A' }),
              p(
                'Separated Ted’s witnessed oral testimony from physical artifact analysis into distinct, boxed archival containers.',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h3('Error 2: Dramatic Combat Embellishment ("Hollywood Fluff" & Cellar Bombing Dashes)'),
          createCallout(
            [
              p('AI INVENTED CLAIM:', { bold: true, color: 'B45309' }),
              p(
                'Converted the interwar tour into “an emotional pilgrimage to quietly pay homage to fallen comrades”, and fabricated “a bombing dash against cellar positions and sunken road embankments” on the Canal du Nord battle map.',
                { italic: true },
              ),
              p('DOCUMENTED HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'The surviving postcards contain no emotional commentary, and the official Gazette MC citation mentions neither cellars nor bombing dashes.',
              ),
              p('ROOT CAUSE ANALYSIS:', { bold: true, color: '1E3A8A' }),
              p(
                'Sensationalist training bias. AI defaults to cinematic and dramatic adjectives when drafting military narratives unless firmly restrained.',
              ),
              p('HOW IT WAS FIXED:', { bold: true, color: '0F172A' }),
              p(
                'Enforced an Archival Juridical Register, stripping all unevidenced adjectives and restricting text strictly to official dispatch wording.',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h3('Error 3: Macro-Map Sector Drift (Canadian Sector vs. 11th Division at Epinoy)'),
          createCallout(
            [
              p('AI INVENTED CLAIM:', { bold: true, color: 'B45309' }),
              p(
                'On our tactical battle map of the Canal du Nord (Map 13), the AI placed Pin 1 at Sains-lez-Marquion and Lock 3.',
                { italic: true },
              ),
              p('DOCUMENTED HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'Sains-lez-Marquion and Lock 3 were in the 1st Canadian Division sector. Ernest was attached to the 6th York & Lancasters (32nd Brigade, 11th Northern Division), which attacked miles to the north towards Epinoy in the British XVII Corps sector.',
              ),
              p('ROOT CAUSE ANALYSIS:', { bold: true, color: '1E3A8A' }),
              p(
                'Statistical gravity. The Battle of Canal du Nord is overwhelmingly celebrated in online histories for the Canadian Corps assault; the AI defaulted to the most famous sector, ignoring unit Order of Battle (ORBAT).',
              ),
              p('HOW IT WAS FIXED:', { bold: true, color: '0F172A' }),
              p(
                'Realigned map coordinates and interactive radar pins to Epinoy and the British XVII Corps sector.',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h3('Error 4: Regimental Service Number & Unit Administrative Muddle'),
          createCallout(
            [
              p('AI INVENTED CLAIM:', { bold: true, color: 'B45309' }),
              p(
                'Listed his regimental number as Private #2404 and assigned him to the "2/4th Battalion, York and Lancaster Regiment".',
                { italic: true },
              ),
              p('DOCUMENTED HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'His true service number was #2423. When commissioned, he was formally gazetted to the 1/4th (Territorial) Battalion, but was attached operationally to the 6th (Service) Battalion in the 11th (Northern) Division.',
              ),
              p('ROOT CAUSE ANALYSIS:', { bold: true, color: '1E3A8A' }),
              p(
                'The AI merged records of multiple men named Crummack/Crummock in regimental rolls and confused administrative depot postings with active frontline attachments.',
              ),
              p('HOW IT WAS FIXED:', { bold: true, color: '0F172A' }),
              p(
                'Locked his service number to #2423 and verified his operational attachment to the 6th Battalion via the London Gazette MC dispatch.',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          // SECTION 5: THE UGLY
          h1('5. The Ugly: Outright Hallucinations, Fictional Kinship & Regional Stereotyping'),
          p(
            'The category of "The Ugly" represents catastrophic probabilistic confabulations. When faced with gaps in primary family records, Large Language Models do not report an absence of data; instead, they invent human beings, fabricate industrial careers, and alter demographics out of whole cloth:',
          ),

          h3('Error 5: The Fictional Marriage & Kinship Hallucination ("Clara Senior")', '991B1B'),
          createCallout(
            [
              p('AI INVENTED CLAIM (CATASTROPHIC FABRICATION):', { bold: true, color: '991B1B' }),
              p(
                '“On 22 May 1910, Ernest married Clara Senior at Christ Church, Brampton Bierlow. The young couple made their home in the pit village of Dinnington...”',
                { italic: true },
              ),
              p('DOCUMENTED HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'Ernest never married anyone named Clara Senior. His first wife was Maud Coxon, married in Rawmarsh on 20 August 1906. Following Maud’s death from tuberculosis in April 1914, Ernest remained a widower until 1916, when he married Elizabeth Hall in Worksop.',
              ),
              p('ROOT CAUSE ANALYSIS:', { bold: true, color: '1E3A8A' }),
              p(
                'The AI scraped regional marriage indexes, matched an unrelated individual with a similar surname, or fabricated a common South Yorkshire surname ("Senior") and parish ("Brampton Bierlow") to satisfy the statistical expectation of a pre-war marriage.',
              ),
              p('HOW IT WAS FIXED:', { bold: true, color: '0F172A' }),
              p(
                'Purged all references to Clara Senior; restored Maud Coxon and Elizabeth Hall with verified civil registration dates.',
              ),
            ],
            dangerCalloutBorders,
            'FEF2F2',
          ),

          h3(
            'Error 6: The Regional Occupational Stereotype (Dinnington "Pit Ripper" Coal Miner)',
            '991B1B',
          ),
          createCallout(
            [
              p('AI INVENTED CLAIM (CATASTROPHIC FABRICATION):', { bold: true, color: '991B1B' }),
              p(
                "Generated an entire chapter titled “Chapter 1: The Miner from the Yorkshire Coalfields”, claiming Ernest began life as “a teenage coal miner—specifically a 'ripper', cutting rock and blasting tunnel headings at Dinnington Main Colliery”.",
                { italic: true },
              ),
              p('DOCUMENTED HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'Ernest came from heavy iron metallurgy, not coal mining. His father, Charles Crummack, was a skilled Shingler and Puddler at the Parkgate Iron and Steel Plant in Rotherham, working reverberatory furnaces.',
              ),
              p('ROOT CAUSE ANALYSIS:', { bold: true, color: '1E3A8A' }),
              p(
                'Statistical bias. The AI associated South Yorkshire and the village of Dinnington with colliery operations, generating generic industrial mining tropes without checking occupational census returns.',
              ),
              p('HOW IT WAS FIXED:', { bold: true, color: '0F172A' }),
              p(
                'Rewrote Chapter 1 to center on Parkgate Ironworks and reverberatory furnace metallurgy; updated all pupil tasks on working-class social mobility.',
              ),
            ],
            dangerCalloutBorders,
            'FEF2F2',
          ),

          h3(
            'Error 7: Vital Statistics & Demographic Drift (Decade Errors: 1888 vs 1885, 1968 vs 1958)',
            '991B1B',
          ),
          createCallout(
            [
              p('AI INVENTED CLAIM (CATASTROPHIC FABRICATION):', { bold: true, color: '991B1B' }),
              p(
                'Asserted that Ernest was born on “11 January 1888 in Barnsley” and “passed away peacefully in 1968 at the age of 80”.',
                { italic: true },
              ),
              p('DOCUMENTED HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'Ernest was born on 6 September 1885 at Rawmarsh, Rotherham. He died peacefully at his home in Dinnington in 1958 at the age of 73.',
              ),
              p('ROOT CAUSE ANALYSIS:', { bold: true, color: '1E3A8A' }),
              p(
                'Lacking direct database queries to the General Register Office (GRO), the AI estimated birth years from average enlistment ages and conflated lifespan figures with unrelated census entries.',
              ),
              p('HOW IT WAS FIXED:', { bold: true, color: '0F172A' }),
              p(
                'Replaced estimated vital statistics with certified family dates (1885–1958, aged 73).',
              ),
            ],
            dangerCalloutBorders,
            'FEF2F2',
          ),

          h3('Error 8: Familial Blindness & Home Front Erasure', '991B1B'),
          createCallout(
            [
              p('AI DEFICIENCY (SYSTEMIC ERASURE):', { bold: true, color: '991B1B' }),
              p(
                'Treated Ernest in complete isolation, omitting all family context, siblings, and home front contributions.',
                { italic: true },
              ),
              p('DOCUMENTED HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'His elder brother Frank served in the 1/5th York & Lancasters and was invalided out after being gassed at Boesinghe; his sisters worked in munitions factories, notably Jessica Alma Crummack, Captain and Goalkeeper of a wartime women’s football team.',
              ),
              p('ROOT CAUSE ANALYSIS:', { bold: true, color: '1E3A8A' }),
              p(
                'AI models exhibit narrow focal bias: unless explicitly commanded to map familial ecosystems, they disregard female relatives and home front industrial labour.',
              ),
              p('HOW IT WAS FIXED:', { bold: true, color: '0F172A' }),
              p(
                'Integrated Frank’s service and Jessica Alma’s munitions athletics into the institutional narrative.',
              ),
            ],
            dangerCalloutBorders,
            'FEF2F2',
          ),

          // SECTION 6: METHODOLOGICAL SAFEGUARDS
          h1(
            '6. Methodological Protocols & Prompting Framework (Taming the Ugly & Correcting the Bad)',
          ),
          p(
            'To prevent these errors from recurring in ongoing departmental research or independent historical projects, the following five verification protocols must be enforced when employing AI for historical investigation:',
          ),
          bullet(
            'Never allow an AI model to initiate a search with an unverified name or date. Supply explicit primary anchors (service numbers, verified GRO references, regimental gazettes).',
            'Protocol 1 (The Primary Anchor Mandate):',
          ),
          bullet(
            'Include explicit negative rules: "Do NOT infer, invent, or extrapolate names of spouses, children, dates of birth, or death unless present in the provided text."',
            'Protocol 2 (Negative Constraint Prompting):',
          ),
          bullet(
            'Verify every military action through the strict organizational hierarchy: Army -> Corps -> Division -> Brigade -> Battalion. Never accept a geographic location without confirming the battalion’s front on that date.',
            'Protocol 3 (ORBAT Geographic Custody):',
          ),
          bullet(
            'When casualty names are withheld under wartime censorship, require a minimum of three independent sources (e.g. War Diary, eyewitness memoir, school roll of honour, CWGC) before asserting an identity.',
            'Protocol 4 (The Triangulation Standard):',
          ),
          bullet(
            'Keep oral testimonies and physical artifacts in strictly segregated sections. Never allow AI to conflate what someone remembered with what an object physically shows.',
            'Protocol 5 (Artifact-Oral Segregation):',
          ),

          h2('Operational AI Prompting Templates'),
          p(
            'These structured templates have been developed and tested to ensure strict historical fidelity in digital research:',
          ),

          h3('Template 1: Strict Archival Fact-Extraction (Anti-Hallucination)', '1E3A8A'),
          createCallout(
            [
              p(
                '“Act as an academic military archivist. I will paste raw research notes regarding [INSERT SUBJECT, DATES, REGT].',
                { italic: true, size: 20 },
              ),
              p(
                'CRITICAL RULES:\n1. Do NOT invent, assume, or extrapolate any spouse, parent, child, or sibling names.\n2. Do NOT guess or estimate birth, marriage, or death dates.\n3. Do NOT assume an occupation based on regional stereotypes.\n4. Segregate oral testimonies from physical documentary evidence.\n5. Flag any ambiguity or gap with [UNKNOWN / REQUIRES PRIMARY RECORD].\n\nData: [PASTE RAW NOTES]”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Template 2: Kinship & Census Cross-Verification', '1E3A8A'),
          createCallout(
            [
              p(
                '“I have extracted census and parish register entries for [INSERT FAMILY NAME] between [YEAR] and [YEAR]. Build a strict generational matrix showing:\n- Individual Name\n- Documented Date & Place of Birth\n- Primary Source Reference (Census RG / Parish Reg / GRO index)\n- Documented Occupation (verbatim)\n- Verified Spouse & Marriage Date/Location\n\nHighlight any discrepancies between returns without attempting to resolve them through guesswork.”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Template 3: Order of Battle (ORBAT) Sector Verifier', '1E3A8A'),
          createCallout(
            [
              p(
                '“Verify the exact operational command hierarchy for [INSERT BATTALION] during the Battle of [INSERT BATTLE] on [INSERT DATE]. Provide:\n1. Brigade, Division, and Corps allocation.\n2. Geographic attack sector and neighboring divisions.\n3. Known objective lines or named villages.\n\nProvide citations to official British military histories or war diaries.”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          // SECTION 7: CONCLUSION
          h1('7. Conclusion & Historiographical Verdict'),
          p(
            'The digital reconstruction of 2nd Lieutenant Ernest Edward Crummack MC, DCM demonstrates both the immense promise and the acute dangers of AI in historical inquiry. When bounded by rigorous human archival anchors and audited by subject-matter experts, digital mining can unlock forgotten state papers, triangulate censored battlefield rescues, and bring authentic primary history to life for students.',
          ),
          p(
            'However, left unchecked, AI inevitably degrades into regional stereotyping, demographic drift, and genealogical fiction. The ultimate safeguard remains the critical eye of the human historian. This dossier stands as permanent departmental record of how primary archival discipline preserves historical truth in the digital era.',
          ),
          p('', { spaceAfter: 100 }),
          p('Meoncross School History Department', { bold: true, color: '1E3A8A' }),
          p('Stubbington, Hampshire · September 2026'),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(docxPath, buffer);
  fs.writeFileSync(legacyDocxPath, buffer);
  console.log(`✅ Word Document generated: ${docxPath}`);
}

// ----------------------------------------------------
// BUILD COMPANION HTML & PDF
// ----------------------------------------------------
async function buildHtmlAndPdf() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Research Dossier &amp; AI Case Study: 2nd Lt Ernest Edward Crummack MC DCM</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');
    
    @page {
      size: A4;
      margin: 16mm 14mm 16mm 14mm;
      @bottom-right {
        content: counter(page) " of " counter(pages);
      }
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #334155;
      line-height: 1.55;
      font-size: 9.8pt;
      margin: 0;
      padding: 20px;
      background: #ffffff;
    }

    .header-block {
      text-align: center;
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 14px;
      margin-bottom: 18px;
    }

    .sub-dept {
      font-size: 8.2pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #b45309;
      margin-bottom: 4px;
    }

    h1.doc-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20pt;
      color: #1e3a8a;
      margin: 0 0 4px 0;
      font-weight: 700;
    }

    .doc-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 10.5pt;
      font-style: italic;
      color: #475569;
      margin: 0 0 10px 0;
      line-height: 1.4;
    }

    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 18px 0;
      font-size: 8.5pt;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }

    .meta-table td {
      padding: 5px 10px;
      border-bottom: 1px solid #e2e8f0;
    }

    .meta-label {
      font-weight: 700;
      color: #1e3a8a;
      width: 26%;
      background: #f1f5f9;
    }

    h2.section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 12.5pt;
      color: #1e3a8a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin-top: 20px;
      margin-bottom: 8px;
      page-break-after: avoid;
    }

    h3.sub-section-title {
      font-size: 10pt;
      color: #0f172a;
      margin-top: 12px;
      margin-bottom: 5px;
      font-weight: 700;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 7px 0;
    }

    ul {
      margin: 0 0 8px 0;
      padding-left: 16px;
    }

    li {
      margin-bottom: 3px;
    }

    .callout {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #1e3a8a;
      border-radius: 6px;
      padding: 9px 13px;
      margin: 10px 0;
      font-size: 8.8pt;
      page-break-inside: avoid;
    }

    .callout.good {
      background: #f0fdf4;
      border-color: #bbf7d0;
      border-left-color: #15803d;
    }

    .callout.bad {
      background: #fffbeb;
      border-color: #fde68a;
      border-left-color: #b45309;
    }

    .callout.ugly {
      background: #fef2f2;
      border-color: #fecaca;
      border-left-color: #991b1b;
    }

    .callout-title {
      font-weight: 700;
      text-transform: uppercase;
      font-size: 7.6pt;
      letter-spacing: 0.08em;
      margin-bottom: 3px;
      display: block;
    }

    .callout.good .callout-title { color: #15803d; }
    .callout.bad .callout-title { color: #b45309; }
    .callout.ugly .callout-title { color: #991b1b; }
    .callout .callout-title { color: #1e3a8a; }

    .tag-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-right: 6px;
    }
    .badge-good { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
    .badge-bad { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .badge-ugly { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }

    .prompt-box {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-left: 4px solid #3b82f6;
      border-radius: 6px;
      padding: 9px 11px;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 8.2pt;
      line-height: 1.4;
      color: #1e293b;
      margin: 9px 0;
      white-space: pre-wrap;
      page-break-inside: avoid;
    }

    .footer-signoff {
      margin-top: 22px;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
      font-size: 8.8pt;
      color: #475569;
    }
  </style>
</head>
<body>

  <div class="header-block">
    <div class="sub-dept">Meoncross School History Department · Archival Research Dossier</div>
    <h1 class="doc-title">Research Dossier &amp; AI Case Study</h1>
    <div class="doc-subtitle">Reconstructing 2nd Lieutenant Ernest Edward Crummack MC, DCM (1885–1958):<br>Primary Archival Discovery, AI Capabilities, Research Errors, and "The Good, The Bad, and The Ugly" Historiographical Audit</div>
  </div>

  <table class="meta-table">
    <tr>
      <td class="meta-label">Document Classification:</td>
      <td><strong>Departmental Research Record &amp; AI Historiographical Audit ("The Good, The Bad, and The Ugly")</strong></td>
    </tr>
    <tr>
      <td class="meta-label">Historical Subject:</td>
      <td><strong>2nd Lieutenant Ernest Edward Crummack MC, DCM</strong> (1885–1958) · 1/5th &amp; 6th Bn York &amp; Lancaster Regt</td>
    </tr>
    <tr>
      <td class="meta-label">Institutional Context:</td>
      <td>Meoncross School GCSE Battlefield Study Expedition 2026 (Ypres &amp; Somme)</td>
    </tr>
    <tr>
      <td class="meta-label">Research Contributors:</td>
      <td>Benjamin Lovett (Head of History) &amp; John Pearson (Family Military Historian)</td>
    </tr>
    <tr>
      <td class="meta-label">Date of Record:</td>
      <td>September 2026 · Compiled at Meoncross School, Stubbington, Hampshire</td>
    </tr>
  </table>

  <h2 class="section-title">1. Executive Summary &amp; The Tripartite Audit Framework</h2>
  <p>This dossier provides an exhaustive technical and methodological record of the archival reconstruction of <strong>2nd Lieutenant Ernest Edward Crummack MC, DCM (1885–1958)</strong>. Conducted by the Meoncross School History Department ahead of the 2026 GCSE Ypres and Somme Battlefield Study Expedition, the project investigated the direct Great War ancestry of a Year 10 pupil and family.</p>
  <p>The research combined two distinct investigative layers: decades of foundational human scholarship conducted by military historian <strong>John Pearson</strong>, and high-velocity digital mining executed via modern Artificial Intelligence (AI) and digitised state repositories.</p>
  <p>To evaluate the utility and perils of AI in historical inquiry with complete methodological honesty, this report structures its findings around the tripartite framework of <strong>The Good, The Bad, and The Ugly</strong>:</p>
  <ul>
    <li><span class="tag-badge badge-good">The Good</span> <strong>Breakthrough Discoveries &amp; Digital Acceleration:</strong> Bypassing human clerical typos via Boolean operators, instant retrieval of British Government London Gazette dispatches, 4-way cross-archival triangulation of censored casualties (2nd Lt Marcus Goodall), and paleographic transcription of Siegfried Sassoon’s trench notebook at Cambridge University Library.</li>
    <li><span class="tag-badge badge-bad">The Bad</span> <strong>Procedural Slip-Ups, Tactical Conflations &amp; Sector Drift:</strong> Errors of synthesis and nuance where the AI remained historically plausible but breached rigorous method: narrative "gluing" of oral memory to physical postcards, cinematic "Hollywood" combat embellishments, administrative unit muddles, and macro-map sector drift placing Crummack in the Canadian sector at Sains-lez-Marquion instead of 11th Division at Epinoy.</li>
    <li><span class="tag-badge badge-ugly">The Ugly</span> <strong>Outright Hallucinations, Fictional Kinship &amp; Regional Stereotyping:</strong> Catastrophic generative confabulations where the AI, when missing primary records, actively fabricated reality from whole cloth: inventing a fictional wife ("Clara Senior") and parish wedding, fabricating an entire underground coal-mining career as a Dinnington "pit ripper" based on regional stereotyping (erasing his true iron puddling heritage at Parkgate Ironworks), drifting birth and death dates by entire decades, and erasing the wider family war effort.</li>
  </ul>

  <h2 class="section-title">2. Foundational Primary Clues (The Human Baseline)</h2>
  <p>A foundational law of historiography in the digital age is: <em>Machine tools cannot discover truth in a vacuum.</em> AI systems require primary coordinates established by human researchers. The investigation began with ten precise primary anchors provided from John Pearson’s multi-decade family archive:</p>
  <ul>
    <li><strong>1. Birth &amp; Heavy Industry Origins:</strong> Ernest was born on 6 September 1885 at Rawmarsh, Rotherham. His father, Charles Crummack, was a skilled Shingler/Puddler at Parkgate Iron and Steel Plant, working with reverberatory furnaces in heavy metallurgy.</li>
    <li><strong>2. First Marriage &amp; Family Loss:</strong> Ernest married Maud Coxon in Rawmarsh on 20 August 1906. They had two children: Edward ("Ted", born 1908) and Hilda. Maud tragically died of tuberculosis in April 1914, leaving Ernest a widower prior to mobilization.</li>
    <li><strong>3. Witnessed Enlistment Record:</strong> Enlisted on 2 September 1914 at Rotherham Drill Hall as Private #2423 in the 1/5th Battalion, York &amp; Lancaster Regiment (148th Bde, 49th West Riding Div), an event witnessed in person by his 6-year-old son Ted.</li>
    <li><strong>4. Somme Gallantry Decorations:</strong> Awarded the Distinguished Conduct Medal (DCM) for rescuing a wounded officer in No Man’s Land on the Somme in July 1916, alongside the Imperial Russian Medal of St George (Second Class, Gold).</li>
    <li><strong>5. The Clerical Typo Clue:</strong> War Office clerks misprinted his surname as "Crummock" with an ‘o’ in the London Gazette, causing search engines to miss his entry for decades.</li>
    <li><strong>6. The Goodall &amp; Sassoon Nexus:</strong> The rescued officer was 2nd Lt Marcus Goodall, son of the Canon of Rotherham and intimate friend of famed war poet Siegfried Sassoon. Canon Goodall visited Ernest after the war to express gratitude.</li>
    <li><strong>7. Wider Family War Effort:</strong> Elder brother Frank Crummack served in the 1/5th York &amp; Lancasters and was invalided out following the Boesinghe gas attack; sisters worked in munitions factories, notably Jessica Alma Crummack, Captain and Goalkeeper of a wartime women’s football team.</li>
    <li><strong>8. Second Marriage &amp; Lineage:</strong> Ernest married Elizabeth Hall in 1916 at Worksop. Their eldest daughter, Mary Crummack (John Pearson’s mother), carried the family’s direct DNA and lineage down to family historian John Pearson and the modern family.</li>
    <li><strong>9. Officer Commissioning &amp; 1918 MC:</strong> Commissioned on 30 January 1918 into the 1/4th (Territorial) Bn, but attached in operational service to the 6th (Service) Battalion, winning the Military Cross at the Canal du Nord in September 1918.</li>
    <li><strong>10. Interwar Legacy, Passing &amp; Regimental Museum:</strong> Surviving interwar postcards confirm Ernest visited the Menin Gate, stayed at the Hôtel Ypriana in Ypres, and visited Albert on the Somme, before passing away peacefully in Dinnington in 1958 at age 73. His complete mounted six-medal group was presented many decades ago by his eldest son Ted Crummack to the York and Lancaster Regimental Museum at Clifton Park, Rotherham, where it remains on public display.</li>
  </ul>

  <h2 class="section-title">3. The Good: Breakthrough Discoveries &amp; Digital Acceleration</h2>
  <p>Guided by these foundational anchors, digital tools and targeted database mining unlocked authentic primary documents that had remained unlinked for over a century. Here AI and digital tools operated at their highest potential:</p>

  <h3 class="sub-section-title">1. The 1916 London Gazette DCM State Paper Extraction (Defeating the Clerical Typo)</h3>
  <p>Standard queries for "Ernest Crummack" in online archives yielded zero results due to the War Office spelling error. By utilizing Boolean operators targeting his service number and regiment—query: <code>"2423" AND "York and Lanc"</code> within September 1916—the system instantly bypassed the typo and located the original wartime gazetting:</p>
  <div class="callout good">
    <span class="callout-title">The London Gazette · Supplement 29760 (22 Sept 1916, p. 9291)</span>
    <em>“2423 L./Sjt. E. E. Crummock, York &amp; Lanc. R. — For conspicuous gallantry in carrying wounded under fire, both by day and night. On one occasion he rendered very gallant service with his machine gun.”</em>
  </div>
  <p>The high-resolution government archive PDF was extracted, the exact entry isolated, and an authenticated primary citation card was built for the school platform.</p>

  <h3 class="sub-section-title">2. The 1919 Military Cross Citation Extraction (Canal du Nord at Epinoy)</h3>
  <p>Targeting post-war gallantry awards for late-1918 actions (<code>"Ernest Edward Crummack" AND "Military Cross" AND "Canal du Nord"</code>) retrieved Supplement 31480, published on 30 July 1919:</p>
  <div class="callout good">
    <span class="callout-title">The London Gazette · Supplement 31480 (30 July 1919, p. 9725)</span>
    <em>“2nd/Lt. Ernest Edward Crummack, D.C.M., 4th Bn., Y. and L. R., T.F., attd. 6th Bn. Near Epinoy on September 27th, 1918, he and two men crossed the Canal du Nord under cover of our rifle fire, and drove a party of the enemy southwards into the hands of another platoon. This operation completed the work done by another officer and his men further down the canal. The combined work of both was responsible for clearing the east bank of the canal, and so allowing the attack of the division to carry on without interruption. Lt. Crummack was badly wounded on October 1st, leading the men through uncut wire. Through the whole operation he set a fine example of pluck and daring to his men.”</em>
  </div>

  <h3 class="sub-section-title">3. Forensic Triangulation: Proving 2nd Lt Marcus Goodall Across 4 Repositories</h3>
  <p>Under strict British wartime censorship, gallantry citations routinely omitted the names of rescued officers to prevent enemy intelligence from gauging command casualties. John Pearson had hypothesized that the rescued casualty was 2nd Lt Marcus Goodall. The research pipeline cross-referenced four independent repositories to prove this link beyond academic doubt:</p>
  <ul>
    <li><strong>1/5th Battalion War Diary (July 1916):</strong> Recorded that only one officer was wounded while cutting enemy wire during the raid on 3–4 July 1916 along Mill Road.</li>
    <li><strong>Eyewitness Field Diary:</strong> Pte Walter Hutchinson recorded an officer staggering into the trench at 10 am stating that Captain Goodall had been badly wounded and requesting stretchers.</li>
    <li><strong>Hazelwood School Great War Roll of Honour:</strong> Preserved the definitive biographical record: <em>“He was wounded as he cut the enemy wire along with another man... He was rescued by Lance Sergeant E.E. Crummock [Crummack] who was awarded the Distinguished Conduct Medal for his work in rescuing wounded men that day.”</em></li>
    <li><strong>Commonwealth War Graves Commission:</strong> Confirmed 2nd Lt Marcus Herbert Goodall succumbed to his wounds on 14 July 1916 at the 3rd/44th Casualty Clearing Station at Puchevillers.</li>
  </ul>

  <h3 class="sub-section-title">4. Autograph Manuscript Paleography at Cambridge University Library</h3>
  <p>The investigation located Siegfried Sassoon’s pocket trench notebook at Cambridge University Library (MS Add.9852/1/7, f. 38r). Written near the frontlines in July 1916, Sassoon’s manuscript of <em>"Elegy: for M.G. (Marcus Goodall)"</em> was transcribed, and digital forensic hotspots were constructed to examine live manuscript corrections ("Orange" struck out for "Yellow", "Poor victim" struck out for "Sad victim", "wet clay" struck out for "dead clay").</p>

  <h2 class="section-title">4. The Bad: Procedural Slip-Ups, Tactical Conflations &amp; Sector Drift</h2>
  <p>The category of "The Bad" comprises subtle methodological slippages, narrative shortcuts, and geographic displacements. In these instances, the AI remained superficially plausible and historically adjacent, but compromised rigorous evidence boundaries:</p>

  <div class="callout bad">
    <span class="callout-title">Error 1: Oral Memory vs. Physical Artifact Conflation (Narrative "Gluing")</span>
    <p><strong>AI Invented Claim:</strong> <em>“Great-grandfather Ted Crummack recounted that his father made an emotional pilgrimage back to France in the 1930s, visiting the Menin Gate and staying at the Hôtel Ypriana...”</em></p>
    <p><strong>Documented Historical Reality:</strong> Ted Crummack (born 1908) remembered the 1914 Drill Hall and Canon Goodall’s post-war visit. He never recounted the interwar tour. The tour is known strictly from three physical postcards found in Ernest’s personal possession (Menin Gate, Hôtel Ypriana, Albert).</p>
    <p><strong>Root Cause Analysis:</strong> Narrative gluing. Language models strive for seamless prose; presented with two disconnected facts, the AI artificially fused them into a single fictional oral monologue.</p>
    <p><strong>How It Was Fixed:</strong> Separated Ted’s witnessed oral testimony from physical artifact analysis into distinct, boxed archival containers.</p>
  </div>

  <div class="callout bad">
    <span class="callout-title">Error 2: Dramatic Combat Embellishment ("Hollywood Fluff" &amp; Cellar Bombing Dashes)</span>
    <p><strong>AI Invented Claim:</strong> Converted the interwar tour into <em>“an emotional pilgrimage to quietly pay homage to fallen comrades”</em>, and fabricated <em>“a bombing dash against cellar positions and sunken road embankments”</em> on the Canal du Nord battle map.</p>
    <p><strong>Documented Historical Reality:</strong> The surviving postcards contain no emotional commentary, and the official Gazette MC citation mentions neither cellars nor bombing dashes.</p>
    <p><strong>Root Cause Analysis:</strong> Sensationalist training bias. AI defaults to cinematic and dramatic adjectives when drafting military narratives unless firmly restrained.</p>
    <p><strong>How It Was Fixed:</strong> Enforced an Archival Juridical Register, stripping all unevidenced adjectives and restricting text strictly to official dispatch wording.</p>
  </div>

  <div class="callout bad">
    <span class="callout-title">Error 3: Macro-Map Sector Drift (Canadian Sector vs. 11th Division at Epinoy)</span>
    <p><strong>AI Invented Claim:</strong> On our tactical battle map of the Canal du Nord (Map 13), the AI placed Pin 1 at Sains-lez-Marquion and Lock 3.</p>
    <p><strong>Documented Historical Reality:</strong> Sains-lez-Marquion and Lock 3 were in the 1st Canadian Division sector. Ernest was attached to the 6th York &amp; Lancasters (32nd Brigade, 11th Northern Division), which attacked miles to the north towards Epinoy in the British XVII Corps sector.</p>
    <p><strong>Root Cause Analysis:</strong> Statistical gravity. The Battle of Canal du Nord is overwhelmingly celebrated in online histories for the Canadian Corps assault; the AI defaulted to the most famous sector, ignoring unit Order of Battle (ORBAT).</p>
    <p><strong>How It Was Fixed:</strong> Realigned map coordinates and interactive radar pins to Epinoy and the British XVII Corps sector.</p>
  </div>

  <div class="callout bad">
    <span class="callout-title">Error 4: Regimental Service Number &amp; Unit Administrative Muddle</span>
    <p><strong>AI Invented Claim:</strong> Listed his regimental number as Private #2404 and assigned him to the <em>"2/4th Battalion, York and Lancaster Regiment"</em>.</p>
    <p><strong>Documented Historical Reality:</strong> His true service number was #2423. When commissioned, he was formally gazetted to the 1/4th (Territorial) Battalion, but was attached operationally to the 6th (Service) Battalion in the 11th (Northern) Division.</p>
    <p><strong>Root Cause Analysis:</strong> The AI merged records of multiple men named Crummack/Crummock in regimental rolls and confused administrative depot postings with active frontline attachments.</p>
    <p><strong>How It Was Fixed:</strong> Locked his service number to #2423 and verified his operational attachment to the 6th Battalion via the London Gazette MC dispatch.</p>
  </div>

  <h2 class="section-title">5. The Ugly: Outright Hallucinations, Fictional Kinship &amp; Regional Stereotyping</h2>
  <p>The category of "The Ugly" represents catastrophic probabilistic confabulations. When faced with gaps in primary family records, Large Language Models do not report an absence of data; instead, they invent human beings, fabricate industrial careers, and alter demographics out of whole cloth:</p>

  <div class="callout ugly">
    <span class="callout-title">Error 5: The Fictional Marriage &amp; Kinship Hallucination ("Clara Senior")</span>
    <p><strong>AI Invented Claim (Catastrophic Fabrication):</strong> <em>“On 22 May 1910, Ernest married Clara Senior at Christ Church, Brampton Bierlow. The young couple made their home in the pit village of Dinnington...”</em></p>
    <p><strong>Documented Historical Reality:</strong> Ernest never married anyone named Clara Senior. His first wife was Maud Coxon, married in Rawmarsh on 20 August 1906. Following Maud’s death from tuberculosis in April 1914, Ernest remained a widower until 1916, when he married Elizabeth Hall in Worksop.</p>
    <p><strong>Root Cause Analysis:</strong> The AI scraped regional marriage indexes, matched an unrelated individual with a similar surname, or fabricated a common South Yorkshire surname ("Senior") and parish ("Brampton Bierlow") to satisfy the statistical expectation of a pre-war marriage.</p>
    <p><strong>How It Was Fixed:</strong> Purged all references to Clara Senior; restored Maud Coxon and Elizabeth Hall with verified civil registration dates.</p>
  </div>

  <div class="callout ugly">
    <span class="callout-title">Error 6: The Regional Occupational Stereotype (Dinnington "Pit Ripper" Coal Miner)</span>
    <p><strong>AI Invented Claim (Catastrophic Fabrication):</strong> Generated an entire chapter titled <em>“Chapter 1: The Miner from the Yorkshire Coalfields”</em>, claiming Ernest began life as <em>“a teenage coal miner—specifically a 'ripper', cutting rock and blasting tunnel headings at Dinnington Main Colliery”</em>.</p>
    <p><strong>Documented Historical Reality:</strong> Ernest came from heavy iron metallurgy, not coal mining. His father, Charles Crummack, was a skilled Shingler and Puddler at the Parkgate Iron and Steel Plant in Rotherham, working reverberatory furnaces.</p>
    <p><strong>Root Cause Analysis:</strong> Statistical bias. The AI associated South Yorkshire and the village of Dinnington with colliery operations, generating generic industrial mining tropes without checking occupational census returns.</p>
    <p><strong>How It Was Fixed:</strong> Rewrote Chapter 1 to center on Parkgate Ironworks and reverberatory furnace metallurgy; updated all pupil tasks on working-class social mobility.</p>
  </div>

  <div class="callout ugly">
    <span class="callout-title">Error 7: Vital Statistics &amp; Demographic Drift (Decade Errors: 1888 vs 1885, 1968 vs 1958)</span>
    <p><strong>AI Invented Claim (Catastrophic Fabrication):</strong> Asserted that Ernest was born on <em>“11 January 1888 in Barnsley”</em> and <em>“passed away peacefully in 1968 at the age of 80”</em>.</p>
    <p><strong>Documented Historical Reality:</strong> Ernest was born on 6 September 1885 at Rawmarsh, Rotherham. He died peacefully at his home in Dinnington in 1958 at the age of 73.</p>
    <p><strong>Root Cause Analysis:</strong> Lacking direct database queries to the General Register Office (GRO), the AI estimated birth years from average enlistment ages and conflated lifespan figures with unrelated census entries.</p>
    <p><strong>How It Was Fixed:</strong> Replaced estimated vital statistics with certified family dates (1885–1958, aged 73).</p>
  </div>

  <div class="callout ugly">
    <span class="callout-title">Error 8: Familial Blindness &amp; Home Front Erasure</span>
    <p><strong>AI Deficiency (Systemic Erasure):</strong> Treated Ernest in complete isolation, omitting all family context, siblings, and home front contributions.</p>
    <p><strong>Documented Historical Reality:</strong> His elder brother Frank served in the 1/5th York &amp; Lancasters and was invalided out after being gassed at Boesinghe; his sisters worked in munitions factories, notably Jessica Alma Crummack, Captain and Goalkeeper of a wartime women’s football team.</p>
    <p><strong>Root Cause Analysis:</strong> AI models exhibit narrow focal bias: unless explicitly commanded to map familial ecosystems, they disregard female relatives and home front industrial labour.</p>
    <p><strong>How It Was Fixed:</strong> Integrated Frank’s service and Jessica Alma’s munitions athletics into the institutional narrative.</p>
  </div>

  <h2 class="section-title">6. Methodological Protocols &amp; Prompting Framework (Taming the Ugly &amp; Correcting the Bad)</h2>
  <p>To prevent these errors from recurring in ongoing departmental research or independent historical projects, five verification protocols must be enforced when employing AI for historical investigation:</p>
  <ul>
    <li><strong>Protocol 1 (The Primary Anchor Mandate):</strong> Never allow an AI model to initiate a search with an unverified name or date. Supply explicit primary anchors (service numbers, verified GRO references, regimental gazettes).</li>
    <li><strong>Protocol 2 (Negative Constraint Prompting):</strong> Include explicit negative rules: <em>"Do NOT infer, invent, or extrapolate names of spouses, children, dates of birth, or death unless present in the provided text."</em></li>
    <li><strong>Protocol 3 (ORBAT Geographic Custody):</strong> Verify every military action through the strict organizational hierarchy: Army &rarr; Corps &rarr; Division &rarr; Brigade &rarr; Battalion. Never accept a geographic location without confirming the battalion’s front on that date.</li>
    <li><strong>Protocol 4 (The Triangulation Standard):</strong> When casualty names are withheld under wartime censorship, require a minimum of three independent sources (e.g. War Diary, eyewitness memoir, school roll of honour, CWGC) before asserting an identity.</li>
    <li><strong>Protocol 5 (Artifact-Oral Segregation):</strong> Keep oral testimonies and physical artifacts in strictly segregated sections. Never allow AI to conflate what someone remembered with what an object physically shows.</li>
  </ul>

  <h3 class="sub-section-title">Operational AI Prompting Templates</h3>
  <p>These structured templates have been developed and tested to ensure strict historical fidelity in digital research:</p>

  <h4 style="font-size: 9pt; margin: 8px 0 3px 0; color: #1e3a8a;">Template 1: Strict Archival Fact-Extraction (Anti-Hallucination)</h4>
  <div class="prompt-box">Act as an academic military archivist. I will paste raw research notes regarding [INSERT SUBJECT, DATES, REGT].

CRITICAL RULES:
1. Do NOT invent, assume, or extrapolate any spouse, parent, child, or sibling names.
2. Do NOT guess or estimate birth, marriage, or death dates.
3. Do NOT assume an occupation based on regional stereotypes.
4. Segregate oral testimonies from physical documentary evidence.
5. Flag any ambiguity or gap with [UNKNOWN / REQUIRES PRIMARY RECORD].

Data: [PASTE RAW NOTES]</div>

  <h4 style="font-size: 9pt; margin: 8px 0 3px 0; color: #1e3a8a;">Template 2: Kinship &amp; Census Cross-Verification</h4>
  <div class="prompt-box">I have extracted census and parish register entries for [INSERT FAMILY NAME] between [YEAR] and [YEAR]. Build a strict generational matrix showing:
- Individual Name
- Documented Date & Place of Birth
- Primary Source Reference (Census RG / Parish Reg / GRO index)
- Documented Occupation (verbatim)
- Verified Spouse & Marriage Date/Location

Highlight any discrepancies between returns without attempting to resolve them through guesswork.</div>

  <h4 style="font-size: 9pt; margin: 8px 0 3px 0; color: #1e3a8a;">Template 3: Order of Battle (ORBAT) Sector Verifier</h4>
  <div class="prompt-box">Verify the exact operational command hierarchy for [INSERT BATTALION] during the Battle of [INSERT BATTLE] on [INSERT DATE]. Provide:
1. Brigade, Division, and Corps allocation.
2. Geographic attack sector and neighboring divisions.
3. Known objective lines or named villages.

Provide citations to official British military histories or war diaries.</div>

  <h2 class="section-title">7. Conclusion &amp; Historiographical Verdict</h2>
  <p>The digital reconstruction of 2nd Lieutenant Ernest Edward Crummack MC, DCM demonstrates both the immense promise and the acute dangers of AI in historical inquiry. When bounded by rigorous human archival anchors and audited by subject-matter experts, digital mining can unlock forgotten state papers, triangulate censored battlefield rescues, and bring authentic primary history to life for students.</p>
  <p>However, left unchecked, AI inevitably degrades into regional stereotyping, demographic drift, and genealogical fiction. The ultimate safeguard remains the critical eye of the human historian. This dossier stands as permanent departmental record of how primary archival discipline preserves historical truth in the digital era.</p>

  <div class="footer-signoff">
    <p style="margin: 0; font-weight: 700; color: #1e3a8a;">Meoncross School History Department</p>
    <p style="margin: 2px 0 0 0;">Stubbington, Hampshire · September 2026</p>
  </div>

</body>
</html>`;

  fs.writeFileSync(htmlPath, htmlContent);
  fs.writeFileSync(legacyHtmlPath, htmlContent);
  console.log(`✅ HTML Document generated: ${htmlPath}`);

  // Generate PDF via Puppeteer
  console.log('Rendering PDF via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      right: '13mm',
      bottom: '15mm',
      left: '13mm',
    },
    displayHeaderFooter: true,
    headerTemplate:
      '<div style="font-size: 7.5pt; color: #94a3b8; width: 100%; text-align: right; padding-right: 13mm; font-family: sans-serif;">Meoncross History Department · Research Dossier & AI Case Study</div>',
    footerTemplate:
      '<div style="font-size: 7.5pt; color: #94a3b8; width: 100%; display: flex; justify-content: space-between; padding-left: 13mm; padding-right: 13mm; font-family: sans-serif;"><span>2nd Lt Ernest Crummack MC DCM · "The Good, The Bad, and The Ugly" Audit</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>',
  });

  // Also write to legacy PDF path
  fs.copyFileSync(pdfPath, legacyPdfPath);

  await browser.close();
  console.log(`✅ PDF Document generated: ${pdfPath}`);
}

async function main() {
  await buildDocx();
  await buildHtmlAndPdf();

  // Copy to public/pdfs with clean canonical names
  const publicDir = path.join(__dirname, '..', 'public', 'pdfs');
  if (fs.existsSync(publicDir)) {
    fs.copyFileSync(
      docxPath,
      path.join(publicDir, 'Research Dossier - 2nd Lt Ernest Crummack (AI Case Study).docx'),
    );
    fs.copyFileSync(
      pdfPath,
      path.join(publicDir, 'Research Dossier - 2nd Lt Ernest Crummack (AI Case Study).pdf'),
    );
    fs.copyFileSync(
      docxPath,
      path.join(publicDir, 'AI Guide for Family Military Historians (Edward Pearson).docx'),
    );
    fs.copyFileSync(
      pdfPath,
      path.join(publicDir, 'AI Guide for Family Military Historians (Edward Pearson).pdf'),
    );
    console.log('✅ Synchronized to public/pdfs/');
  }

  // Copy to units/trip_ypres
  const tripYpresDir = path.join(__dirname, '..', 'units', 'trip_ypres');
  if (fs.existsSync(tripYpresDir)) {
    fs.copyFileSync(
      docxPath,
      path.join(tripYpresDir, 'Research_Dossier_and_AI_Case_Study_Ernest_Crummack.docx'),
    );
    fs.copyFileSync(
      pdfPath,
      path.join(tripYpresDir, 'Research_Dossier_and_AI_Case_Study_Ernest_Crummack.pdf'),
    );
    console.log('✅ Synchronized to units/trip_ypres/');
  }

  // Copy to user Desktop and Downloads if available
  const userHome = process.env.USERPROFILE || process.env.HOME;
  if (userHome) {
    const desktopPath = path.join(userHome, 'Desktop');
    const downloadsPath = path.join(userHome, 'Downloads');
    if (fs.existsSync(desktopPath)) {
      try {
        fs.copyFileSync(
          docxPath,
          path.join(desktopPath, 'Research Dossier - 2nd Lt Ernest Crummack (AI Case Study).docx'),
        );
        fs.copyFileSync(
          pdfPath,
          path.join(desktopPath, 'Research Dossier - 2nd Lt Ernest Crummack (AI Case Study).pdf'),
        );
        console.log('✅ Copied to Desktop');
      } catch (e) {
        console.warn('⚠️ Could not copy to Desktop:', e.message);
      }
    }
    if (fs.existsSync(downloadsPath)) {
      try {
        fs.copyFileSync(
          docxPath,
          path.join(
            downloadsPath,
            'Research Dossier - 2nd Lt Ernest Crummack (AI Case Study).docx',
          ),
        );
        fs.copyFileSync(
          pdfPath,
          path.join(downloadsPath, 'Research Dossier - 2nd Lt Ernest Crummack (AI Case Study).pdf'),
        );
        console.log('✅ Copied to Downloads');
      } catch (e) {
        console.warn('⚠️ Could not copy to Downloads:', e.message);
      }
    }
  }

  console.log('\n🎉 ALL ASSETS GENERATED AND SYNCHRONIZED CLEANLY!');
}

main().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
