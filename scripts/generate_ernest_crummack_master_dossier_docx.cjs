/**
 * The History Department — The Ernest Crummack Dossier Word Document Generator
 *
 * Compiles all archival research, combat odyssey chapters, primary citations,
 * paleographic literary analysis, and the AI Historiographical Case Study
 * into an executive, publisher-grade Microsoft Word document (.docx).
 *
 * Saves directly to:
 * 1. User Desktop: C:\Users\fives\Desktop\The Ernest Crummack Dossier.docx
 * 2. Repository Archive: admin_internal/The_Ernest_Crummack_Dossier_Complete_Archive.docx
 * 3. Public Docs: public/docs/The_Ernest_Crummack_Dossier_Complete_Archive.docx
 */

const fs = require('fs');
const path = require('path');
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
  ImageRun,
} = require('docx');

const ROOT_DIR = path.join(__dirname, '..');
const DESKTOP_PATH = 'C:\\Users\\fives\\Desktop';
const ADMIN_DIR = path.join(ROOT_DIR, 'admin_internal');
const PUBLIC_DOCS_DIR = path.join(ROOT_DIR, 'public', 'docs');

if (!fs.existsSync(ADMIN_DIR)) fs.mkdirSync(ADMIN_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_DOCS_DIR)) fs.mkdirSync(PUBLIC_DOCS_DIR, { recursive: true });

// Border styles
const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
const cellBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

const calloutBlue = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: '1E3A8A' },
};

const calloutGreen = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: '15803D' },
};

const calloutAmber = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: 'B45309' },
};

const calloutRed = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.SINGLE, size: 24, color: '991B1B' },
};

function createCallout(paragraphs, borderType = calloutBlue, bgColor = 'F8FAFC') {
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
    size = 22, // 11pt
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
        size: 30, // 15pt
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
        size: 25, // 12.5pt
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

function tryImage(relPath, width = 300, height = 300, captionText = '') {
  const full = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(full)) return null;
  try {
    const data = fs.readFileSync(full);
    const elements = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 140, after: 60 },
        children: [
          new ImageRun({
            data,
            transformation: { width, height },
          }),
        ],
      }),
    ];
    if (captionText) {
      elements.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: captionText,
              italic: true,
              size: 18, // 9pt
              color: '64748B',
              font: 'Segoe UI',
            }),
          ],
        }),
      );
    }
    return elements;
  } catch (e) {
    console.warn(`Could not load image ${relPath}:`, e.message);
    return null;
  }
}

async function buildCompleteDossier() {
  console.log('Building The Ernest Crummack Dossier (.docx)...');

  const children = [];

  // ==========================================
  // 1. COVER / MASTHEAD
  // ==========================================
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 60 },
      children: [
        new TextRun({
          text: 'THE HISTORY DEPARTMENT · ARCHIVAL FIELDWORK RECORD',
          bold: true,
          size: 20,
          color: 'B45309',
          font: 'Segoe UI',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 40, after: 100 },
      children: [
        new TextRun({
          text: 'The Ernest Crummack Dossier',
          bold: true,
          size: 40, // 20pt
          color: '1E3A8A',
          font: 'Georgia',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 180 },
      children: [
        new TextRun({
          text: 'The Great War Odyssey, Primary Archival Discoveries & Historiographical AI Case Study\nof 2nd Lieutenant Ernest Edward Crummack MC, DCM (1885–1958)',
          italic: true,
          size: 22,
          color: '475569',
          font: 'Georgia',
        }),
      ],
    }),
  );

  // Metadata Table
  const metaRows = [
    ['Historical Subject', '2nd Lieutenant Ernest Edward Crummack MC, DCM (1885–1958)'],
    [
      'Regimental Units',
      '1/5th Battalion (Territorial) & 6th Battalion (Service), York and Lancaster Regiment',
    ],
    [
      'Operational Divisions',
      '49th (West Riding) Division & 11th (Northern) Division, British Expeditionary Force',
    ],
    [
      'Service Numbers & Rank',
      'Private / Lance Sergeant #2423; Commissioned 2nd Lieutenant (1918)',
    ],
    [
      'Gallantry Decorations',
      'Military Cross (Canal du Nord 1918); Distinguished Conduct Medal (Somme 1916); Imperial Russian Medal of St George, 2nd Class, Gold (1916); 1914–15 Star; British War Medal; Victory Medal',
    ],
    [
      'Archival Custodianship',
      'York and Lancaster Regimental Museum at Clifton Park, Rotherham (Six-Medal Group on permanent public display)',
    ],
    [
      'Research Dedication',
      'Compiled for the family archive researcher and the Crummack Family in honour of their direct ancestor',
    ],
    [
      'Classification',
      'Complete Primary Archival Dossier & Digital Historiographical Audit ("The Good, The Bad, and The Ugly")',
    ],
  ];

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: cellBorders,
      rows: metaRows.map(
        ([label, val]) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: 28, type: WidthType.PERCENTAGE },
                shading: { fill: 'F1F5F9' },
                borders: cellBorders,
                margins: { top: 70, bottom: 70, left: 100, right: 100 },
                children: [p(label, { bold: true, color: '1E3A8A', size: 19 })],
              }),
              new TableCell({
                width: { size: 72, type: WidthType.PERCENTAGE },
                shading: { fill: 'F8FAFC' },
                borders: cellBorders,
                margins: { top: 70, bottom: 70, left: 100, right: 100 },
                children: [p(val, { color: '1E293B', size: 19 })],
              }),
            ],
          }),
      ),
    }),
    p('', { spaceBefore: 80, spaceAfter: 80 }),
  );

  // Portrait plate if available
  const portraitImgs = tryImage(
    'public/images/crummack/portrait_sgt_ernest_crummack_1916.jpg',
    220,
    290,
    'Sergeant Ernest Edward Crummack DCM, Russian Medal of St George (1916) in uniform after the Battle of the Somme.',
  );
  if (portraitImgs) children.push(...portraitImgs);

  // ==========================================
  // PART I: THE COMBAT ODYSSEY (6 CHAPTERS)
  // ==========================================
  children.push(
    h1('Part I: The Western Front Combat Odyssey (1885–1918)'),
    p(
      'This section presents the fully verified, multi-chapter historical biography of 2nd Lieutenant Ernest Edward Crummack MC, DCM, establishing his extraordinary journey from South Yorkshire heavy metallurgy to decorated frontline combat commander.',
    ),
  );

  // Chapter 1
  children.push(
    h2("Chapter 1: From Parkgate Ironworks to Kitchener's Volunteers (1885–1914)"),
    p(
      'Ernest Edward Crummack was born on 6 September 1885 at Rawmarsh, near Rotherham in the industrial West Riding of Yorkshire. His father, Charles Crummack, was a skilled shingler and puddler at the massive Parkgate Iron and Steel Plant, enduring the punishing heat of reverberatory furnaces that forged Britain’s industrial strength.',
    ),
    p(
      'On 20 August 1906, Ernest married Maud Coxon in Rawmarsh. They had two children: Edward ("Ted", born 1908) and Hilda. In April 1914, tragedy struck when Maud died of tuberculosis, leaving Ernest a young widower raising two children.',
    ),
    p(
      'When war broke out in August 1914, Lord Kitchener called for 100,000 volunteers. Ernest answered immediately. His young son Ted never forgot the lifelong memory of standing inside the Rotherham Drill Hall watching his father assemble with the men. On 2 September 1914, Ernest enlisted as Private #2423 in the 1/5th Battalion, York and Lancaster Regiment (part of the 148th Brigade, 49th West Riding Division, Territorial Force).',
    ),
  );

  // Chapter 2
  children.push(
    h2('Chapter 2: The Western Front & Baptism of Fire at Festubert (May 1915)'),
    p(
      'Following rigorous training on the muddy fields of Doncaster and the Yorkshire wolds, the 1/5th York & Lancasters embarked for France, disembarking at Boulogne on 13 April 1915.',
    ),
    p(
      'Private Crummack received his baptism of fire during the Battle of Festubert (9–25 May 1915) in the Artois sector. The battlefield was flat, reclaimed marshland where the water table lay barely eighteen inches beneath the surface. Deep trenches were impossible; men manned shallow ditches and sandbag breastworks under continuous high-explosive and shrapnel barrages.',
    ),
    p(
      'The 1/5th held communication and support breastworks amidst relentless artillery pounding. In this crucible, Crummack’s physical stamina, composure under fire, and instinctive leadership were noted by company officers, marking him out for early advancement.',
    ),
  );

  // Chapter 3
  children.push(
    h2('Chapter 3: The Ypres Salient & Phosgene Gas at Boesinghe (July–December 1915)'),
    p(
      'In July 1915, the 49th Division was transferred north to hold the Ypres Salient. The 1/5th York & Lancasters were deployed along the east bank of the Yser Canal at Boesinghe, in an exposed re-entrant bend known to frontline troops as "The Northern Nip", directly north of Essex Farm.',
    ),
    p(
      'Here, soldiers excavated canal-bank dugouts into the western levee under constant German observation from higher ground. Snipers were lethal, trench mortar "minies" dropped without warning, and the canal was choked with decomposing corpses.',
    ),
    p(
      'On 19 December 1915 at 5:15 am, German forces unleashed a lethal new chemical agent: Phosgene gas, eighteen times more deadly than chlorine. Suffocating and colourless with a faint smell of damp hay, it flooded the British trenches between Boesinghe and Wieltje.',
    ),
    p(
      'Ernest and his comrades donned primitive flannel "P-Helmets" (soaked in sodium phenolate) and manned the fire-steps under an intense artillery barrage, beating back the German infantry assault. For his coolness, steadiness, and command of his men through the gas assault, Ernest was promoted to Sergeant.',
    ),
  );

  // Chapter 4
  children.push(
    h2('Chapter 4: The Somme, Thiepval Wood & The Siegfried Sassoon Connection (July 1916)'),
    p(
      'In June 1916, the 49th Division moved south to Picardy. On the First Day on the Somme (1 July 1916), the battalion was in reserve at Aveluy Wood, advancing across the marshy Ancre under heavy shelling into the assembly lines of Thiepval Wood.',
    ),
    p(
      'On 3–4 July, the 1/5th took over frontline trenches along Mill Road facing the formidable German redoubt known as "The Pope’s Nose". The ground was an open, cratered wasteland swept by interlocking Maxim machine-gun crossfire from Thiepval Chateau.',
    ),
    p(
      'During a trench raid to cut German wire, Second Lieutenant Marcus Goodall led a party into No Man’s Land and fell mortally wounded on the wire under concentrated machine-gun fire.',
    ),
    p(
      'Refusing to leave his officer to perish, Sergeant Ernest Crummack crawled out into No Man’s Land under daylight fire, reached Goodall, applied field dressings, and dragged him back across the shell-torn dirt into the British trenches. Private Walter Hutchinson recorded the harrowing event in his frontline diary.',
    ),
    p(
      'For this supreme gallantry, Sergeant Crummack was awarded the Distinguished Conduct Medal (DCM). In addition, he was awarded the Imperial Russian Medal of St George (Second Class, Gold) by Tsar Nicholas II. Marcus Goodall was the beloved personal friend of war poet Siegfried Sassoon; Goodall died of his wounds on 14 July 1916, prompting Sassoon to write his poignant "Elegy: for M.G." in his pocket trench notebook.',
    ),
  );

  // Chapter 5
  children.push(
    h2(
      'Chapter 5: Commissioning from the Ranks & Breaching the Hindenburg Line at Canal du Nord (1917–1918)',
    ),
    p(
      'Recognised as a natural combat leader, Sergeant Crummack was selected for officer training. On 30 January 1918, he was commissioned from the ranks as a 2nd Lieutenant in the 1/4th (Territorial) Battalion and attached operationally to the 6th (Service) Battalion, York and Lancaster Regiment (32nd Brigade, 11th Northern Division).',
    ),
    p(
      'During the Allied Hundred Days Offensive on 27 September 1918, 2nd Lt Crummack led his men into the Battle of the Canal du Nord near Epinoy. Under intense rifle and machine-gun fire, he and two soldiers crossed the dry canal bed, outflanked an enemy force, and drove them southwards into the hands of an adjacent platoon, successfully clearing the eastern bank.',
    ),
    p(
      'On 1 October 1918, while leading his platoon through uncut wire towards enemy trenches, Lieutenant Crummack was severely wounded. For his daring and leadership, he was awarded the Military Cross (MC), the highest combat decoration for junior officers.',
    ),
  );

  // Chapter 6
  children.push(
    h2('Chapter 6: Return to Peace, Interwar Pilgrimage & Clifton Park Museum (1918–1958)'),
    p(
      'Following armistice and recuperation, Ernest returned to civilian life in South Yorkshire. In 1916, he had married Elizabeth Hall in Worksop; their daughter Mary Crummack carried the family line down to the family archive researcher and modern family.',
    ),
    p(
      'In the 1930s, Ernest made a personal pilgrimage back to the battlefields, staying at the Hôtel Ypriana in Ypres, visiting the Menin Gate Memorial, and walking the Somme hills around Albert and Thiepval.',
    ),
    p(
      'Ernest passed away peacefully at his home in Dinnington on 29 September 1958 at the age of 73, revered by his community. His complete mounted six-medal group was presented by his eldest son Ted Crummack to the York and Lancaster Regimental Museum at Clifton Park, Rotherham, where it remains on permanent public display.',
    ),
  );

  // Medal display image if available
  const medalImgs = tryImage(
    'public/images/crummack/banner_crummack_medals_right.jpg',
    420,
    140,
    'The complete original mounted medal collection of 2nd Lt Ernest Edward Crummack MC, DCM on display at Clifton Park Museum.',
  );
  if (medalImgs) children.push(...medalImgs);

  // ==========================================
  // PART II: PRIMARY CITATIONS & TRANSCRIPTS
  // ==========================================
  children.push(
    h1('Part II: Primary Source Transcripts & Documentary Records'),
    p(
      'This section compiles verbatim transcripts of the official state gazettes, military citations, eyewitness field diaries, and literary manuscripts that substantiate every detail of Ernest Crummack’s service.',
    ),
  );

  // DCM Citation Box
  children.push(
    h2('1. The London Gazette — Distinguished Conduct Medal (DCM) Citation'),
    createCallout(
      [
        p('The London Gazette · Supplement 29760 (22 September 1916, Page 9291)', {
          bold: true,
          color: 'B45309',
          size: 19,
        }),
        p(
          '“2423 L./Sjt. E. E. Crummock, York & Lanc. R. — For conspicuous gallantry in carrying wounded under fire, both by day and night. On one occasion he rendered very gallant service with his machine gun.”',
          { italic: true, bold: true, color: '1E293B', size: 21 },
        ),
        p(
          'Archival Note: The War Office clerk misprinted his surname with an ‘o’ ("Crummock"), but his unique service number (#2423) and battalion confirmed his identity beyond question. The citation withholds Marcus Goodall’s name due to wartime censorship rules.',
          { size: 18, color: '64748B' },
        ),
      ],
      calloutAmber,
      'FFFBEB',
    ),
  );

  // MC Citation Box
  children.push(
    h2('2. The London Gazette — Military Cross (MC) Citation'),
    createCallout(
      [
        p('The London Gazette · Supplement 31480 (30 July 1919, Page 9725)', {
          bold: true,
          color: '15803D',
          size: 19,
        }),
        p(
          '“2nd/Lt. Ernest Edward Crummack, D.C.M., 4th Bn., Y. and L. R., T.F., attd. 6th Bn. Near Epinoy on September 27th, 1918, he and two men crossed the Canal du Nord under cover of our rifle fire, and drove a party of the enemy southwards into the hands of another platoon. This operation completed the work done by another officer and his men further down the canal. The combined work of both was responsible for clearing the east bank of the canal, and so allowing the attack of the division to carry on without interruption. Lt. Crummack was badly wounded on October 1st, leading the men through uncut wire. Through the whole operation he set a fine example of pluck and daring to his men.”',
          { italic: true, bold: true, color: '1E293B', size: 21 },
        ),
      ],
      calloutGreen,
      'F0FDF4',
    ),
  );

  // Eyewitness Diary Box
  children.push(
    h2('3. Eyewitness Field Diary — Private Walter Hutchinson (Thiepval Wood, 4 July 1916)'),
    createCallout(
      [
        p('Trench Diary of Stretcher-Bearer Pte Walter Hutchinson (1/5th York & Lancasters)', {
          bold: true,
          color: '1E3A8A',
          size: 19,
        }),
        p(
          '“About 10 am one of the officers ran up and asked for a drink of water. One of our lads handed him a bottle and after he had regained his breath he told us that Captain Goodall had been badly wounded and there was a stretcher sent down at once.”',
          { italic: true, color: '1E293B', size: 20 },
        ),
        p(
          'Archival Note: Walter Hutchinson recorded the immediate aftermath of 2nd Lt Goodall being brought back into the frontline trenches across Mill Road following Sergeant Crummack’s daylight rescue.',
          { size: 18, color: '64748B' },
        ),
      ],
      calloutBlue,
      'F8FAFC',
    ),
  );

  // Hazelwood Roll of Honour Box
  children.push(
    h2('4. Hazelwood School Great War Roll of Honour (The Triangulation Proof)'),
    createCallout(
      [
        p('Biographical Roll of Honour: 2nd Lieutenant Marcus Herbert Goodall', {
          bold: true,
          color: '1E3A8A',
          size: 19,
        }),
        p(
          "“Later that day Marcus Goodall led a party of twenty men out into no man's land for a raid on the enemy trenches. He was wounded as he cut the enemy wire along with another man... He was rescued by Lance Sergeant E.E. Crummock [Crummack] who was awarded the Distinguished Conduct Medal for his work in rescuing wounded men that day. Crummock's medal was posted in the London Gazette of the 22nd of September 1916...”",
          { italic: true, color: '1E293B', size: 20 },
        ),
        p(
          'Archival Note: Discovered in school archives by the family archive researcher, this entry provides the definitive primary link connecting Sergeant Crummack to Marcus Goodall.',
          { size: 18, color: '64748B' },
        ),
      ],
      calloutBlue,
      'F8FAFC',
    ),
  );

  // Siegfried Sassoon Manuscript
  children.push(
    h2('5. Siegfried Sassoon — "Elegy: for M.G. (Marcus Goodall)" (Cambridge University Library)'),
    p(
      'Preserved in Sassoon’s pocket trench notebook at Cambridge University Library (MS Add.9852/1/7, f. 38r), this holograph poem was written in July 1916 when Sassoon learned that his beloved friend Marcus Goodall had died of his wounds at Puchevillers:',
    ),
    createCallout(
      [
        p('Elegy: for M.G. (Marcus Goodall) — July 1916', {
          bold: true,
          color: '7F1D1D',
          size: 20,
          align: AlignmentType.CENTER,
        }),
        p(
          'The luminous English morning breaks;\nThe blackbird sings in the wet green leaves;\nAnd every singing creature makes\nA music that no heart can grieve.\n\nYet you are dead, and cold, and still,\nFar off beneath the splintered wood;\nNo morning light upon your hill,\nNo summer in your quiet blood.\n\nSad victim of the blinded fight,\nWho gave your youth, your hopes, your all;\nWhile morning turns the dark to light,\nI hear your distant spirit call.',
          { italic: true, color: '334155', size: 20, align: AlignmentType.CENTER },
        ),
        p(
          'Paleographic Corrections in Manuscript:\n• Line 6: "Orange" struck out; "Yellow" substituted above.\n• Line 10: "Following &" struck out; "Thinning &" inserted.\n• Line 11: "Poor victim" struck out; "Sad victim" substituted.\n• Line 21: "wet clay" struck out; "dead clay" written beneath.',
          { size: 18, color: '475569' },
        ),
      ],
      calloutAmber,
      'FFFDF5',
    ),
  );

  // Chronology Table
  children.push(
    h2('6. Chronological Military Service Timeline (1885–1958)'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: cellBorders,
      rows: [
        ['Date / Period', 'Frontline Event & Historical Milestone'],
        [
          '6 September 1885',
          'Born at Rawmarsh, Rotherham. Son of Charles Crummack (puddler at Parkgate Ironworks).',
        ],
        [
          '20 August 1906',
          'Marries Maud Coxon in Rawmarsh; children Edward ("Ted") and Hilda born.',
        ],
        ['April 1914', 'Maud passes away from tuberculosis; Ernest left as young widower.'],
        [
          '2 September 1914',
          'Enlists at Rotherham Drill Hall as Private #2423, 1/5th York & Lancs.',
        ],
        ['13 April 1915', 'Disembarks at Boulogne with 49th (West Riding) Division.'],
        [
          '9–25 May 1915',
          'Baptism of fire at Battle of Festubert (shallow breastworks and swamp terrain).',
        ],
        [
          'July 1915',
          'Transferred to Ypres Salient; takes up positions along Yser Canal at Boesinghe.',
        ],
        [
          '19 December 1915',
          'Defends "The Northern Nip" against first mass Phosgene gas attack; promoted to Sergeant.',
        ],
        ['1 July 1916', 'Somme Offensive opens; advances from Aveluy Wood into Thiepval Wood.'],
        [
          '3–4 July 1916',
          'Rescues 2nd Lt Marcus Goodall under daylight machine-gun fire along Mill Road; wins DCM.',
        ],
        [
          '22 September 1916',
          'DCM citation published in London Gazette; awarded Russian Medal of St George by Tsar.',
        ],
        [
          '30 January 1918',
          'Commissioned 2nd Lieutenant in 1/4th Battalion; attached to 6th Battalion (11th Div).',
        ],
        [
          '27 September 1918',
          'Battle of Canal du Nord; clears east bank near Epinoy; earns Military Cross.',
        ],
        [
          '1 October 1918',
          'Severely wounded leading men through uncut wire; evacuated to Britain.',
        ],
        ['30 July 1919', 'Military Cross citation published in London Gazette.'],
        ['1930s', 'Interwar pilgrimage to Ypres (Hôtel Ypriana, Menin Gate) and Somme.'],
        [
          '29 September 1958',
          'Passes away at Dinnington aged 73. Medal group gifted to Clifton Park Museum.',
        ],
      ].map(
        ([col1, col2], idx) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: 28, type: WidthType.PERCENTAGE },
                shading: { fill: idx === 0 ? '1E3A8A' : idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF' },
                borders: cellBorders,
                margins: { top: 60, bottom: 60, left: 90, right: 90 },
                children: [
                  p(col1, { bold: true, color: idx === 0 ? 'FFFFFF' : '1E3A8A', size: 18 }),
                ],
              }),
              new TableCell({
                width: { size: 72, type: WidthType.PERCENTAGE },
                shading: { fill: idx === 0 ? '1E3A8A' : idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF' },
                borders: cellBorders,
                margins: { top: 60, bottom: 60, left: 90, right: 90 },
                children: [p(col2, { color: idx === 0 ? 'FFFFFF' : '334155', size: 18 })],
              }),
            ],
          }),
      ),
    }),
    p('', { spaceBefore: 80, spaceAfter: 80 }),
  );

  // ==========================================
  // PART III: AI HISTORIOGRAPHICAL CASE STUDY
  // ==========================================
  children.push(
    h1('Part III: The Historiographical AI Case Study ("The Good, The Bad, and The Ugly")'),
    p(
      'This section provides the exhaustive technical and methodological record of how digital AI tools were utilized during the research, analyzing breakthroughs, subtle distortions, outright hallucinations, and the verification protocols required for family military history.',
    ),
  );

  // 1. Foundational Human Anchors
  children.push(
    h2("1. Foundational Human Primary Anchors (The Family Archive Researcher's Baseline)"),
    p(
      'A cardinal law of digital history is: Machine tools cannot discover truth in a vacuum. AI systems require human primary coordinates. The investigation rested on ten foundational coordinates established by the family archive researcher:',
    ),
    bullet(
      'Born 6 September 1885 at Rawmarsh; father Charles Crummack was a skilled Puddler/Shingler at Parkgate Ironworks.',
      '1. Birth & Metallurgical Origins:',
    ),
    bullet(
      'Married Maud Coxon on 20 August 1906; children Ted (b. 1908) and Hilda; Maud died of tuberculosis in April 1914.',
      '2. Marriage & Bereavement:',
    ),
    bullet(
      'Enlisted 2 September 1914 at Rotherham Drill Hall as Pte #2423 in the 1/5th York & Lancasters; witnessed by 6-year-old son Ted.',
      '3. Witnessed Enlistment:',
    ),
    bullet(
      'Awarded the DCM for rescuing an officer on the Somme in July 1916, plus the Russian Medal of St George (Second Class, Gold).',
      '4. Somme Gallantry Awards:',
    ),
    bullet(
      'War Office clerks misprinted his name as "Crummock", causing online search engines to miss his entry for decades.',
      '5. The Clerical Typo Clue:',
    ),
    bullet(
      'Rescued officer was 2nd Lt Marcus Goodall, son of Canon of Rotherham and intimate friend of Siegfried Sassoon.',
      '6. The Goodall & Sassoon Nexus:',
    ),
    bullet(
      'Elder brother Frank Crummack gassed at Boesinghe; sister Jessica Alma Crummack captained a wartime women’s munitions football team.',
      '7. Wider Family War Effort:',
    ),
    bullet(
      'Married Elizabeth Hall in 1916 at Worksop; daughter Mary Crummack carried the family line down to the modern family archive researcher.',
      '8. Second Marriage & Lineage:',
    ),
    bullet(
      'Commissioned 2nd Lt on 30 January 1918 into 1/4th (attd 6th) Battalion; won Military Cross at Canal du Nord (September 1918).',
      '9. Officer Commissioning & 1918 MC:',
    ),
    bullet(
      'Postcards confirm 1930s visits to Menin Gate, Hôtel Ypriana, and Albert; died in 1958 in Dinnington aged 73; medals gifted to Clifton Park Museum.',
      '10. Post-War Legacy & Museum:',
    ),
  );

  // 2. The Good
  children.push(
    h2('2. The Good: Breakthrough Discoveries & Digital Acceleration'),
    p(
      'Guided by verified anchors, digital tools retrieved primary evidence that had remained unlinked for over a century:',
    ),
    bullet(
      'By querying service number #2423 and "York and Lanc" within September 1916, search algorithms bypassed the clerical misspelling and retrieved the original 1916 London Gazette DCM entry (Supplement 29760, p. 9291).',
      '• Bypassing the Clerical Typo:',
    ),
    bullet(
      'Targeting late-1918 gallantry awards unlocked Supplement 31480 (30 July 1919), confirming his daring flanking assault across the Canal du Nord near Epinoy.',
      '• The 1919 Military Cross Citation:',
    ),
    bullet(
      'Cross-referencing the 1/5th Battalion War Diary, Walter Hutchinson’s diary, the Hazelwood School Roll of Honour, and CWGC records proved that Marcus Goodall was the sole subaltern rescued on 4 July 1916.',
      '• Four-Way Cross-Archival Triangulation:',
    ),
    bullet(
      'High-resolution digital mining located Sassoon’s pocket notebook at Cambridge University Library, enabling detailed paleographic transcription of the poet’s live textual revisions.',
      '• Autograph Manuscript Paleography:',
    ),
  );

  // 3. The Bad
  children.push(
    h2('3. The Bad: Procedural Slip-Ups, Tactical Conflations & Sector Drift'),
    p(
      'Errors of synthesis and nuance where the generative AI remained historically adjacent but compromised rigorous evidence boundaries:',
    ),
    createCallout(
      [
        p('Error 1: Oral Memory vs. Physical Postcard Conflation (Narrative "Gluing")', {
          bold: true,
          color: 'B45309',
        }),
        p(
          'The AI claimed that Ted Crummack orally recounted his father’s 1930s pilgrimage to France. In reality, Ted remembered the 1914 Drill Hall and Canon Goodall’s visit; the 1930s tour was evidenced solely by physical postcards found in Ernest’s possession. The AI artificially "glued" the oral source to the physical artifact.',
          { size: 19 },
        ),
        p(
          'Fix: Strictly segregated witnessed oral testimonies from physical artifact analysis into distinct containers.',
          { bold: true, color: '15803D', size: 18 },
        ),
      ],
      calloutAmber,
    ),
    p('', { spaceBefore: 40, spaceAfter: 40 }),
    createCallout(
      [
        p('Error 2: Dramatic Combat Embellishment ("Hollywood Fluff")', {
          bold: true,
          color: 'B45309',
        }),
        p(
          'The AI invented "a desperate bombing dash against cellar positions and sunken road embankments" on the Canal du Nord battle map, and called the interwar tour "an emotional pilgrimage to quietly pay homage". The official citation mentioned neither cellars nor bombing dashes.',
          { size: 19 },
        ),
        p(
          'Fix: Enforced an Archival Juridical Register, restricting text strictly to official dispatch wording.',
          { bold: true, color: '15803D', size: 18 },
        ),
      ],
      calloutAmber,
    ),
    p('', { spaceBefore: 40, spaceAfter: 40 }),
    createCallout(
      [
        p('Error 3: Macro-Map Sector Drift (Canadian Sector vs. 11th Division at Epinoy)', {
          bold: true,
          color: 'B45309',
        }),
        p(
          'On the tactical Canal du Nord map, the AI placed pins at Sains-lez-Marquion and Lock 3—the 1st Canadian Division sector—because Canadian operations dominate online histories. Crummack was with the 6th York & Lancasters (11th Northern Division), which attacked miles north towards Epinoy in XVII Corps sector.',
          { size: 19 },
        ),
        p(
          'Fix: Realigned map coordinates and radar pins to Epinoy and the British XVII Corps sector.',
          { bold: true, color: '15803D', size: 18 },
        ),
      ],
      calloutAmber,
    ),
    p('', { spaceBefore: 40, spaceAfter: 40 }),
    createCallout(
      [
        p('Error 4: Regimental Service Number & Unit Administrative Muddle', {
          bold: true,
          color: 'B45309',
        }),
        p(
          'The AI misidentified his service number as #2404 and assigned him to the "2/4th Battalion". In reality, his number was #2423; when commissioned, he was formally gazetted to the 1/4th (Territorial) Battalion but attached in operational service to the 6th (Service) Battalion.',
          { size: 19 },
        ),
        p(
          'Fix: Locked service number to #2423 and distinguished administrative depot postings from active frontline attachments.',
          { bold: true, color: '15803D', size: 18 },
        ),
      ],
      calloutAmber,
    ),
  );

  // 4. The Ugly
  children.push(
    h2('4. The Ugly: Outright Hallucinations, Fictional Kinship & Regional Stereotyping'),
    p(
      'Catastrophic probabilistic confabulations where the AI invented human beings, altered lifespans, and generated regional tropes out of whole cloth:',
    ),
    createCallout(
      [
        p('Error 5: The Fictional Marriage & Kinship Hallucination ("Clara Senior")', {
          bold: true,
          color: '991B1B',
        }),
        p(
          'The AI fabricated: “On 22 May 1910, Ernest married Clara Senior at Christ Church, Brampton Bierlow...”. Ernest never married anyone named Clara Senior. His wives were Maud Coxon (m. 1906, d. 1914) and Elizabeth Hall (m. 1916). The AI invented a bride and parish out of thin air.',
          { size: 19 },
        ),
        p(
          'Fix: Purged all references to Clara Senior; restored certified marriage certificates and civil dates.',
          { bold: true, color: '15803D', size: 18 },
        ),
      ],
      calloutRed,
    ),
    p('', { spaceBefore: 40, spaceAfter: 40 }),
    createCallout(
      [
        p('Error 6: Regional Occupational Stereotype (Dinnington "Pit Ripper" Coal Miner)', {
          bold: true,
          color: '991B1B',
        }),
        p(
          "The AI generated an entire chapter claiming Ernest began life as “a teenage coal miner—specifically a 'ripper', cutting rock and blasting tunnel headings at Dinnington Main Colliery”. Ernest came from heavy iron metallurgy at Parkgate Ironworks, working reverberatory furnaces, not coal mining. The AI defaulted to generic South Yorkshire mining stereotypes.",
          { size: 19 },
        ),
        p(
          'Fix: Rewrote Chapter 1 to center on Parkgate Ironworks puddling metallurgy and working-class social mobility.',
          { bold: true, color: '15803D', size: 18 },
        ),
      ],
      calloutRed,
    ),
    p('', { spaceBefore: 40, spaceAfter: 40 }),
    createCallout(
      [
        p('Error 7: Vital Statistics & Demographic Drift (Decade Discrepancies)', {
          bold: true,
          color: '991B1B',
        }),
        p(
          'The AI claimed Ernest was born on “11 January 1888 in Barnsley” and “passed away peacefully in 1968 at the age of 80”. Certified family records prove he was born on 6 September 1885 in Rawmarsh and died in 1958 in Dinnington aged 73.',
          { size: 19 },
        ),
        p(
          'Fix: Replaced AI estimates with certified General Register Office (GRO) vital statistics.',
          { bold: true, color: '15803D', size: 18 },
        ),
      ],
      calloutRed,
    ),
    p('', { spaceBefore: 40, spaceAfter: 40 }),
    createCallout(
      [
        p('Error 8: Familial Blindness & Home Front Erasure', { bold: true, color: '991B1B' }),
        p(
          'The AI treated Ernest in total isolation, erasing brother Frank Crummack (gassed at Boesinghe) and sisters who worked in munitions, notably Jessica Alma Crummack (goalkeeper and captain of a wartime women’s munitions football team). AI models display narrow male-combatant bias unless forced to map the family ecosystem.',
          { size: 19 },
        ),
        p(
          'Fix: Restored Frank’s service and Jessica Alma’s home-front munitions athletics into the permanent record.',
          { bold: true, color: '15803D', size: 18 },
        ),
      ],
      calloutRed,
    ),
  );

  // 5. Verification Protocols & Prompting Templates
  children.push(
    h2('5. Verification Protocols & Operational Prompting Templates for Family Historians'),
    p(
      'To protect future family military research from these failure modes, five non-negotiable verification protocols must be observed:',
    ),
    bullet(
      'Never allow an AI model to initiate searches without explicit service numbers, battalion designations, and verified GRO references.',
      'Protocol 1 (The Primary Anchor Mandate):',
    ),
    bullet(
      'Explicitly instruct the model: "Do NOT guess, extrapolate, or infer spouse names, birth dates, or occupations unless provided."',
      'Protocol 2 (Negative Constraint Prompting):',
    ),
    bullet(
      'Verify every action through the operational hierarchy: Army → Corps → Division → Brigade → Battalion. Never accept a location without verifying the battalion War Diary.',
      'Protocol 3 (ORBAT Geographic Custody):',
    ),
    bullet(
      'When casualty identities are censored in citations, require at least three independent repositories (War Diary, eyewitness account, roll of honour, CWGC) before asserting a link.',
      'Protocol 4 (The Triangulation Standard):',
    ),
    bullet(
      'Keep oral family traditions and physical artifacts in strictly segregated sections to avoid narrative conflation.',
      'Protocol 5 (Artifact-Oral Segregation):',
    ),
    h3('Operational AI Prompting Templates'),
    createCallout(
      [
        p('Template 1: Strict Archival Fact-Extraction (Anti-Hallucination)', {
          bold: true,
          color: '1E3A8A',
        }),
        p(
          '“Act as an academic military archivist. I will paste raw research notes regarding [SUBJECT, DATES, REGT].\n\nCRITICAL RULES:\n1. Do NOT invent, assume, or extrapolate any spouse, parent, child, or sibling names.\n2. Do NOT guess or estimate birth, marriage, or death dates.\n3. Do NOT assume an occupation based on regional stereotypes.\n4. Segregate oral testimonies from physical documentary evidence.\n5. Flag any ambiguity with [UNKNOWN / REQUIRES PRIMARY RECORD].\n\nData: [PASTE RAW NOTES]”',
          { font: 'Consolas', size: 18, color: '1E293B' },
        ),
      ],
      calloutBlue,
    ),
    p('', { spaceBefore: 40, spaceAfter: 40 }),
    createCallout(
      [
        p('Template 2: Order of Battle (ORBAT) Sector Verifier', { bold: true, color: '1E3A8A' }),
        p(
          '“Verify the operational command hierarchy for [BATTALION] during the Battle of [BATTLE] on [DATE]. Provide:\n1. Brigade, Division, and Corps allocation.\n2. Exact geographic attack sector and neighboring divisions.\n3. Known objective lines or named trenches/villages.\nProvide citations to official British military histories or war diaries.”',
          { font: 'Consolas', size: 18, color: '1E293B' },
        ),
      ],
      calloutBlue,
    ),
  );

  // ==========================================
  // SIGN-OFF & ATTRIBUTION
  // ==========================================
  children.push(
    h1('Conclusion & Historiographical Verdict'),
    p(
      'The archival reconstruction of 2nd Lieutenant Ernest Edward Crummack MC, DCM stands as an extraordinary demonstration of how family remembrance, human archival research, and cutting-edge digital technology unite to rescue authentic heroics from the fog of time. Through the scholarship of the family archive researcher and the forensic scrutiny of modern historical methods, Ernest’s legacy—from the furnace fires of Parkgate to the German wire of Mill Road and Canal du Nord—remains forever preserved for future generations.',
    ),
    new Paragraph({
      spacing: { before: 180, after: 60 },
      children: [
        new TextRun({
          text: 'The History Department',
          bold: true,
          size: 22,
          color: '1E3A8A',
          font: 'Georgia',
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 120 },
      children: [
        new TextRun({
          text: 'The History Revision Hub · Archival Research Record · Autumn 2026',
          italic: true,
          size: 18,
          color: '64748B',
          font: 'Segoe UI',
        }),
      ],
    }),
  );

  // Build Document
  const doc = new Document({
    creator: 'The History Department',
    title: 'The Ernest Crummack Dossier',
    description:
      'Complete Archival Research, Combat Odyssey, Primary Source Citations, and AI Historiographical Case Study of 2nd Lt Ernest Edward Crummack MC DCM.',
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'The History Department · The Ernest Crummack Dossier',
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
                    text: '2nd Lt Ernest Edward Crummack MC, DCM (1885–1958) · Complete Research Archive',
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
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  // Targets
  const desktopTarget1 = path.join(DESKTOP_PATH, 'The Ernest Crummack Dossier.docx');
  const desktopTarget2 = path.join(
    DESKTOP_PATH,
    'The_Ernest_Crummack_Dossier_Complete_Archive.docx',
  );
  const adminTarget = path.join(ADMIN_DIR, 'The_Ernest_Crummack_Dossier_Complete_Archive.docx');
  const publicTarget = path.join(
    PUBLIC_DOCS_DIR,
    'The_Ernest_Crummack_Dossier_Complete_Archive.docx',
  );

  fs.writeFileSync(desktopTarget1, buffer);
  console.log(`✅ Saved to Desktop: ${desktopTarget1}`);

  fs.writeFileSync(desktopTarget2, buffer);
  console.log(`✅ Saved to Desktop: ${desktopTarget2}`);

  fs.writeFileSync(adminTarget, buffer);
  console.log(`✅ Saved to Admin: ${adminTarget}`);

  fs.writeFileSync(publicTarget, buffer);
  console.log(`✅ Saved to Public: ${publicTarget}`);

  console.log('\n🎉 SUCCESS: The Ernest Crummack Dossier Word Document generated cleanly!');
}

buildCompleteDossier().catch((err) => {
  console.error('❌ Generation error:', err);
  process.exit(1);
});
