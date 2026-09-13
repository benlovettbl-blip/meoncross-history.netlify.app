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
            'When Harriet passed on your email regarding the 2nd Lieutenant Ernest Crummack dossier, I was absolutely delighted. As a history teacher, discovering a pupil with such an extraordinary direct family link to the Western Front—and with a grandfather who has spent decades conducting genuine, rigorous archival research—is an absolute privilege for our school.',
          ),
          p(
            'In her message, Harriet noted: "My Dad is particularly interested in your use of AI when researching as he has only started using this as a tool and is running into issues at times. Sometimes it assumes a relationship or links a name that isn\'t correct. I think it has with Ernest in places."',
          ),
          p(
            'And in your own email, you observed with sharp insight: "Where AI was invariably wrong was the detailed family history information. I found it interesting that this is where it let Ben down as well in the article about Ernest."',
          ),
          p(
            'You hit the nail squarely on the head. In our initial digital build of Ernest’s story, the AI assistant made several glaring errors about his family history—it invented a fictional marriage to a woman named "Clara Senior", changed his birth year to 1888, moved his birthplace to Barnsley, altered his death to 1968, and erroneously claimed he began life as an underground coal miner! Every single one of these errors stemmed from AI hallucination and regional stereotyping.',
          ),
          p(
            'This guide has been written specifically for you ahead of our meeting after school. In it, I provide a transparent, "behind-the-scenes" review of both the triumphs and the pitfalls of using AI for historical research:',
          ),
          bullet(
            'How your foundational research provided the essential human anchors that made digital discovery possible.',
            '•',
          ),
          bullet(
            'How we used your clues to extract the original 1916 and 1919 London Gazette state papers in seconds.',
            '•',
          ),
          bullet(
            'How we triangulated your Siegfried Sassoon discovery against autograph manuscripts at Cambridge University Library.',
            '•',
          ),
          bullet(
            'A complete, forensic autopsy of the FIVE family history errors the AI attempted to introduce (and how you caught them).',
            '•',
          ),
          bullet(
            'A review of the THREE military and tactical errors the AI made regarding the battlefield.',
            '•',
          ),
          bullet(
            'A practical, copy-and-paste "Prompting Toolkit" designed to prevent AI from inventing relatives, altering vital statistics, or romanticising historical records.',
            '•',
          ),

          // SECTION 2: THE FOUNDATIONAL LEADS
          h1('2. Phase 1: The Human Foundation — John’s Research Leads'),
          p(
            'The absolute first rule of digital history is: Garbage In, Garbage Out. AI has no consciousness and cannot discover historical facts on its own. It requires rigorous primary anchors established by human historians. The bedrock of Ernest’s digital dossier came entirely from your decades of archival work.',
          ),
          p('The crucial primary anchors you provided included:'),
          bullet(
            'Ernest was born on 6 September 1885 at Rawmarsh, Rotherham. His father, Charles Crummack, was a skilled Shingler/Puddler at Parkgate Iron and Steel Plant, working with reverberatory furnaces in heavy metallurgy.',
            '1. Birth & Heavy Industry Origins:',
          ),
          bullet(
            'Married Maud Coxon in Rawmarsh on 20 August 1906. Tragically, Maud died of tuberculosis in April 1914, leaving Ernest a widower with two young children: Edward ("Ted", born 1908) and Hilda.',
            '2. First Marriage & Family Tragedy:',
          ),
          bullet(
            'Enlisted at Rotherham Drill Hall on 2 September 1914 as Private #2423 in the 1/5th York & Lancaster Regiment, a moment vividly witnessed by his 6-year-old son Ted.',
            '3. Enlistment & Witnessed Oral History:',
          ),
          bullet(
            'Awarded the Distinguished Conduct Medal (DCM) for rescuing a stricken officer under heavy machine-gun fire in Thiepval Wood in July 1916, plus the Imperial Russian Order of St George (3rd Class).',
            '4. Somme Gallantry & Russian Award:',
          ),
          bullet(
            'War Office clerks misprinted his surname as "Crummock" with an ‘o’ in the London Gazette, which defeated standard search queries for generations.',
            '5. The "Smoking Gun" Clerical Typo:',
          ),
          bullet(
            'The rescued officer was 2nd Lt Marcus Goodall, son of the Canon of Rotherham, and beloved friend of war poet Siegfried Sassoon.',
            '6. The Sassoon & Goodall Connection:',
          ),
          bullet(
            'His elder brother Frank was also in the 1/5th York & Lancasters, but was invalided out after being gassed at Boesinghe; at least two sisters worked in munitions factories, notably Jessica Alma Crummack, Captain and Goalkeeper of a Ladies Munition Worker Football team.',
            '7. Broader Family War Effort:',
          ),
          bullet(
            'Ernest married Elizabeth Hall (John’s grandmother) in 1916 at Worksop.',
            '8. Second Marriage & Direct Lineage:',
          ),
          bullet(
            'Commissioned on 30 January 1918 into the 1/4th (Territorial) Bn, but in practice attached to and fighting with the 6th (Service) Battalion at Canal du Nord, winning the Military Cross.',
            '9. Officer Commissioning & 1918 MC:',
          ),
          bullet(
            'Surviving postcards confirming he stayed at Hôtel Ypriana by the Menin Gate and visited Albert on an interwar battlefield tour, before passing away peacefully in Dinnington in 1958 at age 73.',
            '10. Interwar Legacy & Passing:',
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
            'Pedagogical Visual Card: We combined the cropped entry with the official masthead of the London Gazette to generate an interactive citation card with a zoomable modal so our GCSE pupils can inspect the original 1916 typography.',
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
            'Archival Extraction: We extracted Page 9725 and cropped the complete combat narrative:',
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
            'Under British War Office censorship regulations, gallantry citations deliberately withheld casualty names. As a result, Ernest’s DCM citation only stated: "carrying wounded under fire".',
          ),
          p(
            'Your archival research achieved what few professional historians manage: you proved the exact identity of the rescued officer. To build an airtight academic case on our school platform, we triangulated four independent primary records:',
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

          // SECTION 5: THE COMPLETE AUTOPSY OF AI ERRORS
          h1('5. Phase 4: Behind the Curtain — An Autopsy of the AI Errors We Caught'),
          p(
            'Now we come to the most critical section of this guide: Why did the AI fail, and why did it make mistakes about the family history? Examining these errors will provide you with practical insight for your own research into the Youngs of Brancepeth.',
          ),

          h2(
            'Part A: The Five Family History & Biographical Errors (The Pitfalls John Identified)',
          ),
          p(
            'As you rightly observed, the AI’s most dangerous failures occurred in detailed family history. Large Language Models operate by predicting the most probable words based on broad internet data. When they lack exact records, they invent plausible-sounding details—a process known in computer science as "hallucination".',
          ),

          h3('Error A1: The Kinship & Marriage Hallucination ("Clara Senior")'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY INVENTED:', { bold: true, color: 'B45309' }),
              p(
                '“On 22 May 1910, Ernest married Clara Senior at Christ Church, Brampton Bierlow. The young couple made their home in the pit village of Dinnington...”',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY (JOHN’S RECORDS):', { bold: true, color: '15803D' }),
              p(
                'Ernest never married anyone named Clara Senior! His first wife was Maud Coxon, whom he married in Rawmarsh on 20 August 1906. After Maud died of tuberculosis in April 1914, Ernest remained a widower until 1916, when he married Elizabeth Hall (John’s grandmother) in Worksop.',
              ),
              p('WHY THE AI DID IT:', { bold: true, color: '1E3A8A' }),
              p(
                'The AI scraped regional Yorkshire marriage indexes and found a completely different man with a similar name, or simply manufactured a plausible Victorian name ("Clara Senior") and church ("Brampton Bierlow") to fill the narrative gap. AI assumes every soldier must have had a neat pre-war wedding.',
              ),
              p('THE LESSON FOR JOHN:', { bold: true, color: '0F172A' }),
              p(
                'Never permit AI to supply family members, spouses, or dates. Explicitly state: "Do NOT infer or generate names of spouses, parents, or children unless provided in my source data."',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h3('Error A2: Vital Statistics & Demographic Drift (Birth & Death Years)'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY INVENTED:', { bold: true, color: 'B45309' }),
              p(
                'The AI asserted that Ernest was born on “11 January 1888 in Barnsley” and “passed away peacefully in 1968 at the age of 80”.',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY (JOHN’S RECORDS):', { bold: true, color: '15803D' }),
              p(
                'Ernest was actually born on 6 September 1885 at Rawmarsh, Rotherham. He died peacefully at his home in Dinnington in 1958 at the age of 73.',
              ),
              p('WHY THE AI DID IT:', { bold: true, color: '1E3A8A' }),
              p(
                'Because AI models lack real-time access to original birth and death certificates, they extrapolate birth years from enlistment ages and guess lifespan averages. It confused Ernest with other individuals in the General Register Office index.',
              ),
              p('THE LESSON FOR JOHN:', { bold: true, color: '0F172A' }),
              p(
                'Always anchor vital statistics to primary documents (birth certificates, census returns, parish registers). Never allow an AI to estimate dates of birth or death.',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h3('Error A3: The Regional Stereotype Trap ("Yorkshire Coal Miner")'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY INVENTED:', { bold: true, color: 'B45309' }),
              p(
                "The AI authored an entire narrative chapter titled “Chapter 1: The Miner from the Yorkshire Coalfields”, claiming Ernest was “a teenage coal miner—specifically a 'ripper', blasting rock hundreds of feet underground at Dinnington Main Colliery”.",
                { italic: true },
              ),
              p('THE HISTORICAL REALITY (JOHN’S RECORDS):', { bold: true, color: '15803D' }),
              p(
                'Ernest came from a heavy metallurgy background, not coal mining. His father, Charles Crummack, was a skilled Shingler/Puddler working the intense reverberatory furnaces at the Parkgate Iron and Steel Plant in Rotherham.',
              ),
              p('WHY THE AI DID IT:', { bold: true, color: '1E3A8A' }),
              p(
                'This is classic "statistical stereotyping". The AI associated South Yorkshire and Dinnington with coal mining, and automatically drafted a generic mining backstory replete with atmospheric clichés ("descending into the pits", "blasting headings").',
              ),
              p('THE LESSON FOR JOHN:', { bold: true, color: '0F172A' }),
              p(
                "In your research into the Youngs of Brancepeth, the AI will likely try to turn them into coal miners because of County Durham's colliery reputation, when you already know they were Yeoman farmers before coal was discovered. Demand that AI state strictly the documented occupation from census returns.",
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h3('Error A4: Regimental Service Number & Battalion Misidentification'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY INVENTED:', { bold: true, color: 'B45309' }),
              p(
                'The AI listed his service number as Private #2404 and claimed his commissioning was in the "2/4th Battalion, York and Lancaster Regiment".',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY (JOHN’S RECORDS):', { bold: true, color: '15803D' }),
              p(
                'His true service number was #2423. On being commissioned, he was formally gazetted to the 1/4th (Territorial) Battalion, but in active combat was attached to and fought with the 6th (Service) Battalion—a Sheffield-raised unit.',
              ),
              p('WHY THE AI DID IT:', { bold: true, color: '1E3A8A' }),
              p(
                'The AI encountered conflicting search results for other soldiers named Crummack/Crummock in the York & Lancaster Regiment and merged their service numbers. It also struggled with the distinction between formal administrative postings (1/4th) and frontline operational attachments (6th).',
              ),
              p('THE LESSON FOR JOHN:', { bold: true, color: '0F172A' }),
              p(
                'Always verify a soldier’s unique service number across the Medal Index Card (MIC) and Medal Rolls (WO 329) at The National Archives.',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h3('Error A5: Omission of the Wider Family War Service'),
          createCallout(
            [
              p('WHAT THE AI INITIALLY OVERLOOKED:', { bold: true, color: 'B45309' }),
              p(
                'The AI treated Ernest as an isolated solitary soldier, completely ignoring the broader family context.',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY (JOHN’S RECORDS):', { bold: true, color: '15803D' }),
              p(
                'Ernest’s elder brother Frank was also serving in the 1/5th York & Lancasters and was invalided out after the Boesinghe gas attack. Meanwhile, at least two sisters worked in munitions factories—one of whom, Jessica Alma Crummack, was Captain and Goalkeeper of a Ladies Munition Worker Football team (a goalkeeping tradition running through John at Nottingham University to great-great-grandsons Abe and Bo).',
              ),
              p('WHY THE AI DID IT:', { bold: true, color: '1E3A8A' }),
              p(
                'AI models focus narrowly on the individual soldier specified in the prompt unless explicitly instructed to analyze home front contributions, sibling enlistments, and women’s wartime labour.',
              ),
              p('THE LESSON FOR JOHN:', { bold: true, color: '0F172A' }),
              p(
                'Prompt the AI specifically: "Cross-reference siblings and female relatives to capture munitions work, sibling military service, and home front experiences."',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h2('Part B: The Three Operational & Tactical Errors We Caught'),
          p(
            'In addition to the family history errors, the AI attempted three tactical and operational embellishments during the military mapping phase:',
          ),

          h3('Error B1: Oral Memory vs. Physical Postcards Conflation'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY WROTE:', { bold: true, color: 'B45309' }),
              p(
                '“Great-grandfather Ted Crummack recounted that his father made an emotional pilgrimage back to France in the 1930s, visiting the Menin Gate and staying at the Hôtel Ypriana...”',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'Ted Crummack (born 1908) remembered 1914 Drill Hall and Canon Goodall visiting their house. He NEVER recounted the interwar tour. The tour is known strictly because three physical postcards survived in Ernest’s personal possession (Menin Gate, Hôtel Ypriana, and Albert).',
              ),
              p('THE LESSON:', { bold: true, color: '0F172A' }),
              p(
                'Never let AI combine oral memory with physical artifact evidence. Separate them into distinct headings.',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h3('Error B2: Dramatic Combat Embellishment & Hollywood Fluff'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY WROTE:', { bold: true, color: 'B45309' }),
              p(
                'The AI converted 3 postcards into “an emotional pilgrimage to quietly pay homage to fallen comrades”, and invented “a bombing dash against cellar positions and sunken road embankments” on the Canal du Nord map.',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'The postcards do not record internal emotional states, and the official Gazette citation mentions neither cellars nor bombing dashes.',
              ),
              p('THE LESSON:', { bold: true, color: '0F172A' }),
              p(
                'Instruct the AI: “State strictly what is physically written on the record. Never extrapolate internal feelings, emotions, or cinematic combat choreography.”',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          h3('Error B3: Macro-Map Sector Drift (Canadian Sector vs. 11th Division)'),
          createCallout(
            [
              p('WHAT THE AI ORIGINALLY WROTE:', { bold: true, color: 'B45309' }),
              p(
                'On our tactical battle map of the Canal du Nord, the AI placed Pin 1 at Sains-lez-Marquion and Lock 3.',
                { italic: true },
              ),
              p('THE HISTORICAL REALITY:', { bold: true, color: '15803D' }),
              p(
                'Sains-lez-Marquion was in the 1st Canadian Division sector. Ernest was attached to the 6th York & Lancasters (11th Northern Division), which attacked miles to the north towards Epinoy in the British XVII Corps sector.',
              ),
              p('THE LESSON:', { bold: true, color: '0F172A' }),
              p(
                'Always verify military geography through the rigid chain: Division -> Brigade -> Battalion.',
              ),
            ],
            warningCalloutBorders,
            'FFFBEB',
          ),

          // SECTION 6: THE HISTORIAN'S PROMPT TOOLKIT
          h1('6. Phase 5: The Historian’s Practical AI Prompting Toolkit'),
          p(
            'To help you get the best possible results when researching the Youngs of Brancepeth or other family branches, here are six battle-tested prompt templates you can copy and paste directly into ChatGPT, Claude, or Google Gemini:',
          ),

          h3('Prompt 1: Strict Archival Extraction (Prevents Family Tree Hallucinations)'),
          createCallout(
            [
              p(
                '“Act as an academic genealogical archivist. I am going to paste my raw research notes regarding [INSERT NAME, DATES, LOCATIONS].',
                { italic: true, size: 20 },
              ),
              p(
                'CRITICAL RULES:\n1. Do NOT invent, assume, or extrapolate any spouse, parent, child, or sibling names not explicitly provided.\n2. Do NOT guess or estimate birth, marriage, or death dates.\n3. Do NOT assume an occupation based on regional stereotypes (e.g. do NOT assume coal mining in Durham/Yorkshire unless explicitly documented).\n4. Clearly separate oral family testimonies from physical documentary artifacts.\n5. If there is an ambiguity or gap, mark it with [UNKNOWN / REQUIRES PRIMARY RECORD] rather than guessing.\n\nHere is my data: [PASTE YOUR RAW NOTES]”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Prompt 2: Family Tree & Kinship Cross-Verification'),
          createCallout(
            [
              p(
                '“I have extracted census and parish register entries for [INSERT FAMILY NAME, e.g., The Youngs of Brancepeth] between [YEAR] and [YEAR].',
                { italic: true, size: 20 },
              ),
              p(
                'Please build a strict generational matrix showing:\n- Individual Name\n- Documented Date & Place of Birth\n- Primary Source Reference (Census RG number / Parish Reg / GRO index)\n- Documented Occupation (transcribed verbatim)\n- Verified Spouse & Marriage Date/Location\n\nHighlight any discrepancies between census returns (e.g. age variances or shifting birthplaces) without attempting to resolve them through guesswork.”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Prompt 3: Historical Occupational & Industrial Context Verifier'),
          createCallout(
            [
              p(
                '“Act as a British social and economic historian. I am researching ancestors who worked in [INSERT INDUSTRY / TRADE, e.g., Shingler/Puddler in Rotherham ironworks OR Yeoman Farmer in pre-coal Brancepeth, County Durham].',
                { italic: true, size: 20 },
              ),
              p(
                'Please explain:\n1. The exact technical nature of this trade or social status during [INSERT ERA, e.g., late 19th century].\n2. The daily working conditions, tools, and physical demands.\n3. The economic transition that occurred when heavy industry or coal mining expanded in this specific parish.\n\nGround your answer in academic economic history rather than generic folklore.”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Prompt 4: Military Acronym & Casualty Record Decoder'),
          createCallout(
            [
              p(
                '“Act as a British Army military historian specializing in the First World War. Please decode and explain the following wartime abbreviations from a soldier’s service record / medal index card:',
                { italic: true, size: 20 },
              ),
              p(
                '[PASTE ABBREVIATIONS, e.g., "SW Leg", "GSW Chest", "3/44 CCS", "148 Bde", "49 Div", "TF", "attd", "DOW"]\n\nExplain: What physical medical or organizational pathway did this soldier go through based on these entries?”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Prompt 5: The London Gazette & Typo Hunter'),
          createCallout(
            [
              p(
                '“I am searching for a British soldier’s medal citation in The London Gazette archives between 1914 and 1920. His name was [INSERT NAME], service number [INSERT NUMBER], and regiment [INSERT REGIMENT].',
                { italic: true, size: 20 },
              ),
              p(
                'Because War Office clerks frequently introduced spelling errors (such as Crummack -> Crummock) and OCR scans misread Victorian fonts, please generate:\n1. A list of likely phonetic or typographical spelling variations for this surname.\n2. Three targeted search strings I can use combining service number, regiment, and wildcards.\n3. The likely date window for gazetting based on the date of his combat action [INSERT DATE].”',
                { italic: true, size: 20 },
              ),
            ],
            calloutBorders,
            'F8FAFC',
          ),

          h3('Prompt 6: Order of Battle (ORBAT) Sector Verifier'),
          createCallout(
            [
              p(
                '“I want to verify the exact operational command hierarchy for [INSERT BATTALION, e.g., 6th Battalion, York & Lancaster Regiment] during the Battle of [INSERT BATTLE, e.g., Canal du Nord] on [INSERT DATE, e.g., 27 September 1918].',
                { italic: true, size: 20 },
              ),
              p(
                'Please provide:\n1. The Brigade, Division, and Corps this battalion belonged to on that date.\n2. Their geographic attack sector (which British or Allied army they were under, and neighboring divisions on their left and right).\n3. Any known objective lines or named villages (e.g. Epinoy, Sains-lez-Marquion, Mœuvres).\n\nProvide citations to official British divisional histories or war diaries.”',
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
            'John, your research into Ernest Edward Crummack represents the absolute finest tradition of British family history: patient, rigorous, grounded in primary evidence, and driven by deep respect for those who served.',
          ),
          p(
            'When we meet after school, I would love to sit down with you and show you Ernest’s interactive dossier live on our school screen. We can explore the high-resolution London Gazette citation cards, examine Siegfried Sassoon’s manuscript, and test out some of these AI search workflows together for your ongoing research into the Youngs of Brancepeth.',
          ),
          p(
            'If you have any further original photographs, letters, or the surviving postcards from his interwar battlefield tour, we would be honoured to scan and digitize them so that Aby and generations of Meoncross pupils can continue to learn from 2nd Lieutenant Crummack’s remarkable courage.',
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
      margin: 18mm 16mm 18mm 16mm;
      @bottom-right {
        content: counter(page) " of " counter(pages);
      }
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #334155;
      line-height: 1.6;
      font-size: 10pt;
      margin: 0;
      padding: 24px;
      background: #ffffff;
    }

    .header-block {
      text-align: center;
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }

    .sub-dept {
      font-size: 8.5pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #b45309;
      margin-bottom: 4px;
    }

    h1.doc-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22pt;
      color: #1e3a8a;
      margin: 0 0 6px 0;
      font-weight: 700;
    }

    .doc-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11pt;
      font-style: italic;
      color: #475569;
      margin: 0 0 12px 0;
    }

    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 20px 0;
      font-size: 8.8pt;
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
      width: 22%;
      background: #f1f5f9;
    }

    h2.section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13pt;
      color: #1e3a8a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 4px;
      margin-top: 22px;
      margin-bottom: 10px;
      page-break-after: avoid;
    }

    h3.sub-section-title {
      font-size: 10.5pt;
      color: #0f172a;
      margin-top: 14px;
      margin-bottom: 6px;
      font-weight: 700;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 8px 0;
    }

    ul {
      margin: 0 0 10px 0;
      padding-left: 18px;
    }

    li {
      margin-bottom: 4px;
    }

    .callout {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #1e3a8a;
      border-radius: 6px;
      padding: 10px 14px;
      margin: 12px 0;
      font-size: 9pt;
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
      font-size: 7.8pt;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
      display: block;
    }

    .callout.warning .callout-title { color: #b45309; }
    .callout .callout-title { color: #1e3a8a; }

    .prompt-box {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-left: 4px solid #3b82f6;
      border-radius: 6px;
      padding: 10px 12px;
      font-family: 'Consolas', 'Courier New', monospace;
      font-size: 8.5pt;
      line-height: 1.45;
      color: #1e293b;
      margin: 10px 0;
      white-space: pre-wrap;
      page-break-inside: avoid;
    }

    .footer-signoff {
      margin-top: 25px;
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
      font-size: 9pt;
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
  <p>When Harriet passed on your email regarding the 2nd Lieutenant Ernest Crummack dossier, I was absolutely thrilled. As a history teacher, discovering a pupil with such an extraordinary direct family link to the Western Front—and with a grandfather who has spent decades conducting genuine, rigorous archival research—is an absolute privilege for our school.</p>
  <p>In her message, Harriet noted: <em>"My Dad is particularly interested in your use of AI when researching as he has only started using this as a tool and is running into issues at times. Sometimes it assumes a relationship or links a name that isn't correct. I think it has with Ernest in places."</em></p>
  <p>And in your own email, you observed with sharp accuracy: <em>"Where AI was invariably wrong was the detailed family history information. I found it interesting that this is where it let Ben down as well in the article about Ernest."</em></p>
  <p>You hit the nail squarely on the head. In our initial digital build of Ernest’s story, the AI assistant made several glaring errors about his family history—it invented a fictional marriage to a woman named "Clara Senior", changed his birth year to 1888, moved his birthplace to Barnsley, altered his death to 1968, and erroneously claimed he began life as an underground coal miner! Every single one of these errors stemmed from AI hallucination and regional stereotyping.</p>
  <p>This guide has been prepared specifically for you ahead of our meeting after school. In it, I provide a transparent, "behind-the-scenes" review of both the triumphs and the pitfalls of using AI for historical research, with an honest breakdown of the exact family history errors we caught and how to prevent them in your future work.</p>

  <h2 class="section-title">2. Phase 1: The Human Foundation — John’s Research Leads</h2>
  <p>The absolute first rule of digital history is: <em>Garbage In, Garbage Out</em>. AI has no consciousness and cannot discover historical facts on its own. It requires rigorous primary anchors established by human historians. The bedrock of Ernest’s digital dossier came entirely from your decades of archival work:</p>
  <ul>
    <li><strong>Birth &amp; Heavy Industry Origins:</strong> Ernest was born on 6 September 1885 at Rawmarsh, Rotherham. His father, Charles Crummack, was a skilled Shingler/Puddler at Parkgate Iron and Steel Plant, working with reverberatory furnaces in heavy metallurgy.</li>
    <li><strong>First Marriage &amp; Family Tragedy:</strong> Married Maud Coxon in Rawmarsh on 20 August 1906. Tragically, Maud died of tuberculosis in April 1914, leaving Ernest a widower with two infant children: Edward ("Ted", born 1908) and Hilda.</li>
    <li><strong>Enlistment &amp; Witnessed Oral History:</strong> Enlisted at Rotherham Drill Hall on 2 September 1914 as Private #2423 in the 1/5th York &amp; Lancaster Regiment, a moment vividly witnessed by his 6-year-old son Ted.</li>
    <li><strong>Somme Gallantry &amp; Russian Award:</strong> Awarded the Distinguished Conduct Medal (DCM) for rescuing a stricken officer in No Man’s Land on the Somme in July 1916, plus the Imperial Russian Order of St George (3rd Class).</li>
    <li><strong>The Clerical Typo Clue:</strong> War Office clerks misprinted his surname as "Crummock" with an ‘o’ in the London Gazette, which defeated standard search queries for generations.</li>
    <li><strong>The Sassoon Connection:</strong> The rescued officer was 2nd Lt Marcus Goodall, son of the Canon of Rotherham and close friend of poet Siegfried Sassoon.</li>
    <li><strong>Broader Family War Effort:</strong> Elder brother Frank was also in the 1/5th York &amp; Lancasters, invalided out after being gassed at Boesinghe; at least two sisters worked in munitions factories, notably Jessica Alma Crummack, Captain and Goalkeeper of a Ladies Munition Worker Football team.</li>
    <li><strong>Second Marriage &amp; Direct Lineage:</strong> Ernest married Elizabeth Hall (John’s grandmother) in 1916 at Worksop.</li>
    <li><strong>1918 Commissioning &amp; MC:</strong> Commissioned on 30 January 1918 as 2nd Lieutenant into the 1/4th (Territorial) Bn, but in practice attached to and fighting with the 6th (Service) Battalion at Canal du Nord, winning the Military Cross.</li>
    <li><strong>Interwar Legacy &amp; Passing:</strong> Surviving postcards confirming his interwar tour (Menin Gate, Hôtel Ypriana, Albert), and his passing in Dinnington in 1958 at age 73.</li>
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

  <h2 class="section-title">5. Phase 4: Behind the Curtain — An Autopsy of the AI Errors We Caught</h2>
  <p>Now we come to the most critical section of this guide: <strong>Why did the AI fail, and why did it make mistakes about the family history?</strong> Examining these errors will provide you with practical insight for your own research into the Youngs of Brancepeth.</p>

  <h3 class="sub-section-title">Part A: The Five Family History &amp; Biographical Errors (The Pitfalls John Identified)</h3>
  <p>As you rightly observed, the AI’s most dangerous failures occurred in detailed family history. Large Language Models operate by predicting the most probable words based on broad internet patterns. When they lack exact records, they invent plausible-sounding details—a process known in computer science as "hallucination".</p>

  <div class="callout warning">
    <span class="callout-title">Error A1: The Kinship &amp; Marriage Hallucination ("Clara Senior")</span>
    <p><strong>What the AI originally invented:</strong> <em>“On 22 May 1910, Ernest married Clara Senior at Christ Church, Brampton Bierlow. The young couple made their home in the pit village of Dinnington...”</em></p>
    <p><strong>The Historical Reality (John’s Records):</strong> Ernest never married anyone named Clara Senior! His first wife was Maud Coxon, whom he married in Rawmarsh on 20 August 1906. After Maud died of tuberculosis in April 1914, Ernest remained a widower until 1916, when he married Elizabeth Hall (John’s grandmother) in Worksop.</p>
    <p><strong>Why AI does this:</strong> The AI scraped regional Yorkshire marriage indexes and found a completely different man with a similar name, or simply manufactured a plausible Victorian name ("Clara Senior") and church ("Brampton Bierlow") to fill the narrative gap. AI assumes every soldier must have had a neat pre-war wedding.</p>
    <p><strong>The Lesson for John:</strong> Never permit AI to supply family members, spouses, or dates. Explicitly state: <em>“Do NOT infer or generate names of spouses, parents, or children unless provided in my source data.”</em></p>
  </div>

  <div class="callout warning">
    <span class="callout-title">Error A2: Vital Statistics &amp; Demographic Drift (Birth &amp; Death Years)</span>
    <p><strong>What the AI originally invented:</strong> The AI asserted that Ernest was born on <em>“11 January 1888 in Barnsley”</em> and <em>“passed away peacefully in 1968 at the age of 80”</em>.</p>
    <p><strong>The Historical Reality (John’s Records):</strong> Ernest was actually born on 6 September 1885 at Rawmarsh, Rotherham. He died peacefully at his home in Dinnington in 1958 at the age of 73.</p>
    <p><strong>Why AI does this:</strong> Because AI models lack real-time access to original birth and death certificates, they extrapolate birth years from enlistment ages and guess lifespan averages. It confused Ernest with other individuals in the General Register Office index.</p>
    <p><strong>The Lesson for John:</strong> Always anchor vital statistics to primary documents (birth certificates, census returns, parish registers). Never allow an AI to estimate dates of birth or death.</p>
  </div>

  <div class="callout warning">
    <span class="callout-title">Error A3: The Regional Stereotype Trap ("Yorkshire Coal Miner")</span>
    <p><strong>What the AI originally invented:</strong> The AI authored an entire narrative chapter titled <em>“Chapter 1: The Miner from the Yorkshire Coalfields”</em>, claiming Ernest was <em>“a teenage coal miner—specifically a 'ripper', blasting rock hundreds of feet underground at Dinnington Main Colliery”</em>.</p>
    <p><strong>The Historical Reality (John’s Records):</strong> Ernest came from a heavy metallurgy background, not coal mining. His father, Charles Crummack, was a skilled Shingler/Puddler working the intense reverberatory furnaces at the Parkgate Iron and Steel Plant in Rotherham.</p>
    <p><strong>Why AI does this:</strong> This is classic "statistical stereotyping". The AI associated South Yorkshire and Dinnington with coal mining, and automatically drafted a generic mining backstory replete with atmospheric clichés ("descending into the pits", "blasting headings").</p>
    <p><strong>The Lesson for John:</strong> In your research into the Youngs of Brancepeth, the AI will likely try to turn them into coal miners because of County Durham's colliery reputation, when you already know they were Yeoman farmers before coal was discovered. Demand that AI state strictly the documented occupation from census returns.</p>
  </div>

  <div class="callout warning">
    <span class="callout-title">Error A4: Regimental Service Number &amp; Battalion Misidentification</span>
    <p><strong>What the AI originally invented:</strong> The AI listed his service number as Private #2404 and claimed his commissioning was in the "2/4th Battalion, York and Lancaster Regiment".</p>
    <p><strong>The Historical Reality (John’s Records):</strong> His true service number was #2423. On being commissioned, he was formally gazetted to the 1/4th (Territorial) Battalion, but in active combat was attached to and fought with the 6th (Service) Battalion—a Sheffield-raised unit.</p>
    <p><strong>Why AI does this:</strong> The AI encountered conflicting search results for other soldiers named Crummack/Crummock in the York &amp; Lancaster Regiment and merged their service numbers. It also struggled with the distinction between formal administrative postings (1/4th) and frontline operational attachments (6th).</p>
    <p><strong>The Lesson for John:</strong> Always verify a soldier’s unique service number across the Medal Index Card (MIC) and Medal Rolls (WO 329) at The National Archives.</p>
  </div>

  <div class="callout warning">
    <span class="callout-title">Error A5: Omission of the Wider Family War Service</span>
    <p><strong>What the AI initially overlooked:</strong> The AI treated Ernest as an isolated solitary soldier, completely ignoring the broader family context.</p>
    <p><strong>The Historical Reality (John’s Records):</strong> Ernest’s elder brother Frank was also serving in the 1/5th York &amp; Lancasters and was invalided out after the Boesinghe gas attack. Meanwhile, at least two sisters worked in munitions factories—one of whom, Jessica Alma Crummack, was Captain and Goalkeeper of a Ladies Munition Worker Football team (a goalkeeping tradition running through John at Nottingham University to great-great-grandsons Abe and Bo).</p>
    <p><strong>Why AI does this:</strong> AI models focus narrowly on the individual soldier specified in the prompt unless explicitly instructed to analyze home front contributions, sibling enlistments, and women’s wartime labour.</p>
    <p><strong>The Lesson for John:</strong> Prompt the AI specifically: <em>“Cross-reference siblings and female relatives to capture munitions work, sibling military service, and home front experiences.”</em></p>
  </div>

  <h3 class="sub-section-title">Part B: The Three Operational &amp; Tactical Errors We Caught</h3>
  <p>In addition to the family history errors, the AI attempted three tactical and operational embellishments during the military mapping phase:</p>

  <div class="callout warning">
    <span class="callout-title">Error B1: Oral Memory vs. Physical Postcards Conflation</span>
    <p><strong>What the AI wrote:</strong> <em>“Great-grandfather Ted Crummack recounted that his father made an emotional pilgrimage back to France in the 1930s, visiting the Menin Gate...”</em></p>
    <p><strong>The Reality:</strong> Ted Crummack (born 1908) remembered 1914 Drill Hall and Canon Goodall’s visit. He NEVER recounted the interwar tour. The tour is known strictly from three physical postcards found in Ernest’s collection (Menin Gate, Hôtel Ypriana, Albert).</p>
    <p><strong>The Lesson:</strong> Never let AI combine oral memory with physical artifact evidence. Separate them into distinct headings.</p>
  </div>

  <div class="callout warning">
    <span class="callout-title">Error B2: Dramatic Combat Embellishment &amp; Hollywood Fluff</span>
    <p><strong>What the AI wrote:</strong> The AI converted 3 postcards into <em>“an emotional pilgrimage to quietly pay homage to fallen comrades”</em>, and on the battle map invented <em>“a bombing dash against cellar positions and sunken road embankments”</em>.</p>
    <p><strong>The Reality:</strong> The postcards do not record internal emotional states, and the Gazette citation mentions neither cellars nor bombing dashes.</p>
    <p><strong>The Lesson:</strong> Instruct the AI: <em>“State strictly what is physically written on the record. Never extrapolate internal feelings, emotions, or cinematic combat choreography.”</em></p>
  </div>

  <div class="callout warning">
    <span class="callout-title">Error B3: Macro-Map Sector Drift (Canadian Sector vs. 11th Division)</span>
    <p><strong>What the AI wrote:</strong> On our tactical battle map of the Canal du Nord, the AI placed Pin 1 at Sains-lez-Marquion and Lock 3.</p>
    <p><strong>The Reality:</strong> Sains-lez-Marquion was in the 1st Canadian Division sector. Ernest was attached to the 6th York &amp; Lancasters (11th Northern Division), which attacked miles to the north towards Epinoy in the British XVII Corps sector.</p>
    <p><strong>The Lesson:</strong> Always verify military geography through the rigid chain: Division → Brigade → Battalion.</p>
  </div>

  <h2 class="section-title">6. Phase 5: The Historian’s Practical AI Prompting Toolkit</h2>
  <p>Copy and paste these battle-tested prompts directly into ChatGPT, Claude, or Gemini for your research into the Youngs of Brancepeth:</p>

  <h3 class="sub-section-title">Prompt 1: Strict Archival Extraction (Prevents Family Tree Hallucinations)</h3>
  <div class="prompt-box">Act as an academic genealogical archivist. I am going to paste my raw research notes regarding [INSERT NAME, DATES, LOCATIONS].

CRITICAL RULES:
1. Do NOT invent, assume, or extrapolate any spouse, parent, child, or sibling names not explicitly provided.
2. Do NOT guess or estimate birth, marriage, or death dates.
3. Do NOT assume an occupation based on regional stereotypes (e.g. do NOT assume coal mining in Durham/Yorkshire unless explicitly documented).
4. Clearly separate oral family testimonies from physical documentary artifacts.
5. If there is an ambiguity or gap, mark it with [UNKNOWN / REQUIRES PRIMARY RECORD] rather than guessing.

Here is my data: [PASTE YOUR RAW NOTES]</div>

  <h3 class="sub-section-title">Prompt 2: Family Tree &amp; Kinship Cross-Verification</h3>
  <div class="prompt-box">I have extracted census and parish register entries for [INSERT FAMILY NAME, e.g., The Youngs of Brancepeth] between [YEAR] and [YEAR].

Please build a strict generational matrix showing:
- Individual Name
- Documented Date & Place of Birth
- Primary Source Reference (Census RG number / Parish Reg / GRO index)
- Documented Occupation (transcribed verbatim)
- Verified Spouse & Marriage Date/Location

Highlight any discrepancies between census returns (e.g. age variances or shifting birthplaces) without attempting to resolve them through guesswork.</div>

  <h3 class="sub-section-title">Prompt 3: Historical Occupational &amp; Industrial Context Verifier</h3>
  <div class="prompt-box">Act as a British social and economic historian. I am researching ancestors who worked in [INSERT INDUSTRY / TRADE, e.g., Shingler/Puddler in Rotherham ironworks OR Yeoman Farmer in pre-coal Brancepeth, County Durham].

Please explain:
1. The exact technical nature of this trade or social status during [INSERT ERA, e.g., late 19th century].
2. The daily working conditions, tools, and physical demands.
3. The economic transition that occurred when heavy industry or coal mining expanded in this specific parish.

Ground your answer in academic economic history rather than generic folklore.</div>

  <h3 class="sub-section-title">Prompt 4: Military Acronym &amp; Casualty Record Decoder</h3>
  <div class="prompt-box">Act as a British Army military historian specializing in the First World War. Please decode and explain the following wartime abbreviations from a soldier’s service record / medal index card:

[PASTE ABBREVIATIONS, e.g., "SW Leg", "GSW Chest", "3/44 CCS", "148 Bde", "49 Div", "TF", "attd", "DOW"]

Explain: What physical medical or organizational pathway did this soldier go through based on these entries?</div>

  <h3 class="sub-section-title">Prompt 5: The London Gazette &amp; Typo Hunter</h3>
  <div class="prompt-box">I am searching for a British soldier’s medal citation in The London Gazette archives between 1914 and 1920. His name was [INSERT NAME], service number [INSERT NUMBER], and regiment [INSERT REGIMENT].

Because War Office clerks frequently introduced spelling errors (such as Crummack -> Crummock) and OCR scans misread Victorian fonts, please generate:
1. A list of likely phonetic or typographical spelling variations for this surname.
2. Three targeted search strings I can use combining service number, regiment, and wildcards.
3. The likely date window for gazetting based on the date of his combat action [INSERT DATE].</div>

  <h3 class="sub-section-title">Prompt 6: Order of Battle (ORBAT) Sector Verifier</h3>
  <div class="prompt-box">I want to verify the exact operational command hierarchy for [INSERT BATTALION, e.g., 6th Battalion, York & Lancaster Regiment] during the Battle of [INSERT BATTLE, e.g., Canal du Nord] on [INSERT DATE, e.g., 27 September 1918].

Please provide:
1. The Brigade, Division, and Corps this battalion belonged to on that date.
2. Their geographic attack sector (which British or Allied army they were under, and neighboring divisions on their left and right).
3. Any known objective lines or named villages (e.g. Epinoy, Sains-lez-Marquion, Mœuvres).

Provide citations to official British divisional histories or war diaries.</div>

  <h2 class="section-title">7. Recommended Digital Portals for Great War Research</h2>
  <p>These are the most reliable, free primary source repositories available online today:</p>
  <ul>
    <li><strong>The London Gazette (thegazette.co.uk):</strong> Official state newspaper of record. Search for DCM, MM, MC, and officer commissions. Always search by service number first if the surname fails.</li>
    <li><strong>The National Archives Discovery (discovery.nationalarchives.gov.uk):</strong> Search records in series WO 95 (Battalion War Diaries), WO 339/WO 374 (Officer Service Files), and WO 363/364 (Burnt Records &amp; Unburnt Service Papers).</li>
    <li><strong>National Library of Scotland Trench Maps (maps.nls.uk/geo/explore):</strong> World-class, high-resolution digitized British trench maps of France and Belgium overlaid with modern Google satellite imagery with an interactive transparency slider.</li>
    <li><strong>Commonwealth War Graves Commission (cwgc.org):</strong> Search burial plots, cemetery registers, and original "Graves Concentration" field returns showing where bodies were originally recovered.</li>
    <li><strong>Lives of the First World War (IWM / livesofthefirstworldwar.iwm.org.uk):</strong> Imperial War Museums digital permanent archive connecting photographs, service sheets, and family memorabilia.</li>
  </ul>

  <h2 class="section-title">8. Conclusion &amp; Looking Forward to Our Meeting</h2>
  <p>John, your research into Ernest Edward Crummack represents the absolute finest tradition of British family history: patient, rigorous, grounded in primary evidence, and driven by deep respect for those who served.</p>
  <p>When we meet after school, I would love to sit down with you and show you Ernest’s interactive dossier live on our school screen. We can explore the high-resolution London Gazette citation cards, examine Siegfried Sassoon’s manuscript, and test out some of these AI search workflows together for your ongoing research into the Youngs of Brancepeth.</p>
  <p>If you have any further original photographs, letters, or the surviving postcards from his interwar battlefield tour, we would be honoured to scan and digitize them so that Aby and generations of Meoncross pupils can continue to learn from 2nd Lieutenant Crummack’s remarkable courage.</p>

  <div class="footer-signoff">
    <p>With warmest regards and deepest respect,</p>
    <p style="font-weight: 700; color: #1e3a8a; margin-bottom: 2px;">Benjamin Lovett</p>
    <p style="margin: 0;">Head of History, Meoncross School<br><a href="mailto:ben.lovett@meoncross.co.uk" style="color: #2563eb; text-decoration: none;">ben.lovett@meoncross.co.uk</a></p>
  </div>

</body>
</html>`;

  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✅ HTML Document generated successfully: ${htmlPath}`);

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
      top: '16mm',
      right: '14mm',
      bottom: '16mm',
      left: '14mm',
    },
    displayHeaderFooter: true,
    headerTemplate:
      '<div style="font-size: 8pt; color: #94a3b8; width: 100%; text-align: right; padding-right: 14mm; font-family: sans-serif;">Meoncross School History Department · Family Military Research Series</div>',
    footerTemplate:
      '<div style="font-size: 8pt; color: #94a3b8; width: 100%; display: flex; justify-content: space-between; padding-left: 14mm; padding-right: 14mm; font-family: sans-serif;"><span>2nd Lt Ernest Crummack MC DCM · Case Study & AI Methodology</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>',
  });

  await browser.close();
  console.log(`✅ PDF Document generated successfully: ${pdfPath}`);
}

async function main() {
  await buildDocx();
  await buildHtmlAndPdf();
  console.log('\n🎉 ALL ASSETS GENERATED CLEANLY!');
}

main().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
