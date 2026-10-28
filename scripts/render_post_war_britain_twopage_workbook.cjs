/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/post_war_britain (KS3 Year 9: Rights, Protest, and Post-War Britain: 1900–Present)
 * Output: public/units/post_war_britain/pupil_workbook.html
 * PDF:    public/pdfs/post_war_britain_pupil_workbook.pdf (and aliases)
 *
 * Gold Standard Publisher Architecture:
 * - Exact 16-Page A4 Pupil Workbook Standard (4 A3 Folded Spreads)
 * - Strict School Anonymity: 0 prohibited school identifiers; 100% institutional neutrality
 * - Page 1:  Master Front Cover with 80mm authentic primary plate, pupil record card, syllabus overview, 5 Enquiries
 * - Pages 2–7: Enquiries 1–3 (2-Page Spreads: 5-Stage Causal Narrative Left with [Act.Para] anchors, Disciplinary Writing Right)
 * - Pages 8–9: Centrefold Living Timeline (8 Milestones across 2 pages with open sketchpads, matching Crown standard)
 * - Pages 10–13: Enquiries 4–5 (2-Page Spreads: 5-Stage Causal Narrative Left with [Act.Para] anchors, Disciplinary Writing Right)
 * - Pages 14–15: Dedicated Scholar Notes & Essay Planning Spreads (blank ruled lines with red margin for teacher use)
 * - Page 16: Outside Back Cover (Pupil details, KS3 pathways, 7-row marking grid, 5 QR retrieval cards)
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'post_war_britain', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'post_war_britain', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'images', 'post_war_britain', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
}

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
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f284e" d="${pathD.trim()}"/></svg>`;
}

function renderFooterStrip(pageNum, quipText, totalPages = 16) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quipText}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${quipText}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// ============================================================================
// 5 BESPOKE RIGHTS, PROTEST, AND POST-WAR BRITAIN ENQUIRY CONFIGURATIONS
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: Votes for Women: Suffragists vs Suffragettes (1897–1918)',
    enquiryQuestion:
      'Were the Suffragists or Suffragettes more effective in securing the vote for women?',
    specAnchor:
      'National Union of Women’s Suffrage Societies (NUWSS, 1897) & Millicent Fawcett; constitutional petitions, lobbying & peaceful marches; Women’s Social and Political Union (WSPU, 1903) & Emmeline Pankhurst; "Deeds, not words"; militant direct action, window-smashing, hunger strikes & force-feeding; "Cat and Mouse Act" (1913); Emily Wilding Davison at the Epsom Derby; First World War mobilization & "Canary Girls"; Representation of the People Act 1918.',
    stages: [
      {
        step: 1,
        date: '1897–1903',
        paraRef: '[1.1]',
        questionHeading: 'What principles guided Millicent Fawcett and the NUWSS?',
        bullets: [
          '50,000 Peaceful Members',
          'Petitions to Parliament',
          'Proving Women Mature Citizens',
        ],
        focusClue:
          'How did constitutional lobbying, mass petitions, and orderly public demonstrations demonstrate female political readiness to a sceptical male Parliament?',
      },
      {
        step: 2,
        date: '1903–1908',
        paraRef: '[1.2]',
        questionHeading: 'Why did Emmeline Pankhurst adopt "Deeds, not words" in 1903?',
        bullets: [
          'Frustrated by Stalled Bills',
          'Founding the Militant WSPU',
          'Direct Action and Headlines',
        ],
        focusClue:
          'Why did decades of polite constitutional petitions fail to force Liberal and Conservative cabinets into granting parliamentary time for female suffrage?',
      },
      {
        step: 3,
        date: '1909–1913',
        paraRef: '[1.3]',
        questionHeading: 'How did hunger strikes and the "Cat and Mouse Act" polarise Britain?',
        bullets: [
          'Suffragettes Hunger Strike',
          'Brutal Forced Tube Feeding',
          'Release and Re-arrest Law',
        ],
        focusClue:
          'Why did government force-feeding and the 1913 temporary discharge statute turn public sympathy towards imprisoned suffragette activists?',
      },
      {
        step: 4,
        date: 'June 1913',
        paraRef: '[1.4]',
        questionHeading: 'What was the historical impact of Emily Wilding Davison’s sacrifice?',
        bullets: [
          'King’s Horse at Epsom Derby',
          'Martyr for the Cause',
          'Global Newsreel Coverage',
        ],
        focusClue:
          'How did stepping in front of Anmer at the 1913 Derby transform Emily Davison into a militant martyr while intensifying establishment hostility?',
      },
      {
        step: 5,
        date: '1914–1918',
        paraRef: '[1.5]',
        questionHeading: 'How did total war mobilization secure the 1918 Act?',
        bullets: [
          '1.5 Million Women in Work',
          'Munitions "Canary Girls"',
          'Vote for Women Over 30',
        ],
        focusClue:
          'Why did women’s indispensable industrial and agricultural labour during the Great War shatter old anti-suffrage prejudices in Parliament?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between <strong>Suffragists</strong> (NUWSS, led by Millicent Fawcett using peaceful, constitutional petitions) and <strong>Suffragettes</strong> (WSPU, led by Emmeline Pankhurst using militant direct action under "Deeds, not words"):',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      badge: 'EXTENDED WRITING PRACTICE',
      examStem:
        'Explain why British women over the age of thirty were granted the parliamentary vote in 1918. [12 marks]',
      stimulus: [
        'The pre-war campaigning of the Suffragists and Suffragettes',
        'Women’s industrial and agricultural work during the First World War',
      ],
      connectives:
        'A decisive factor was... &bull; This led directly to... &bull; Furthermore... &bull; In consequence of this... &bull; Ultimately, this meant that...',
      wordBank:
        'Millicent Fawcett &bull; NUWSS &bull; Emmeline Pankhurst &bull; WSPU &bull; "Deeds, not words" &bull; Hunger Strikes &bull; Cat and Mouse Act &bull; Canary Girls &bull; Representation of the People Act 1918',
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 1 (1897 NUWSS) and Milestone 3 (1918 Representation of the People Act) using dual-coding symbols and dates.',
    },
    leftPageQuip:
      'Millicent Fawcett insisted that reason, patience, and peaceful petitions would eventually win the citadel of male parliamentary power.',
    rightPageQuip:
      'Over 1.5 million women entered factories during World War I; their sacrifice as "Canary Girls" shattered the claim that women were unfit for citizenship.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: 1945 & The Foundation of the Welfare State / NHS (1942–1951)',
    enquiryQuestion:
      'How did the aftermath of total war build the modern Welfare State and the National Health Service?',
    specAnchor:
      'Total war, evacuation & the Blitz transforming social attitudes; Sir William Beveridge’s 1942 report on Social Insurance & Allied Services; slaying the "Five Giants" (Want, Disease, Ignorance, Squalor, Idleness); social security "from the cradle to the grave"; July 1945 Labour landslide under Clement Attlee; National Insurance Act 1946 & National Assistance Act 1948; Minister of Health Aneurin Bevan; British Medical Association (BMA) resistance & compromise; opening of the NHS on 5 July 1948.',
    stages: [
      {
        step: 1,
        date: '1940–1942',
        paraRef: '[2.1]',
        questionHeading: 'How did evacuation and the Blitz alter British social attitudes?',
        bullets: [
          'Slum Malnutrition Exposed',
          'Rationing and Common Sacrifice',
          'Shared Ordeal of the Blitz',
        ],
        focusClue:
          'How did billeting inner-city children with affluent rural families shock Britain into recognising the true depth of urban poverty and illness?',
      },
      {
        step: 2,
        date: 'Dec 1942',
        paraRef: '[2.2]',
        questionHeading: 'Why did the 1942 Beveridge Report become a wartime sensation?',
        bullets: [
          '630,000 Copies Sold',
          'Slaying the Five Giants',
          'Cradle to Grave Security',
        ],
        focusClue:
          'Why did Beveridge’s promise to conquer Want, Disease, Ignorance, Squalor, and Idleness give wartime citizens a passionate vision to fight for?',
      },
      {
        step: 3,
        date: 'July 1945',
        paraRef: '[2.3]',
        questionHeading: 'Why did Clement Attlee defeat Winston Churchill in 1945?',
        bullets: [
          '146-Seat Labour Landslide',
          'Memories of 1930s Slump',
          'Pledge to Build Welfare State',
        ],
        focusClue:
          'Why did British voters distinguish between Churchill’s greatness as a military war leader and their determination never to return to 1930s poverty?',
      },
      {
        step: 4,
        date: '1946–1948',
        paraRef: '[2.4]',
        questionHeading: 'How did the 1946 and 1948 Acts create the welfare safety net?',
        bullets: [
          'Universal National Insurance',
          'Abolition of Poor Law Workhouses',
          'Unconditional State Safety Net',
        ],
        focusClue:
          'How did universal weekly insurance contributions replace the humiliating Victorian means tests and grim municipal workhouses?',
      },
      {
        step: 5,
        date: '5 July 1948',
        paraRef: '[2.5]',
        questionHeading: 'How did Aneurin Bevan overcome doctors to launch the NHS?',
        bullets: [
          'BMA Threatens Total Boycott',
          '"Stuffed Their Mouths with Gold"',
          'Free Healthcare for All',
        ],
        focusClue:
          'How did Bevan’s pragmatic compromise with hospital consultants enable Park Hospital, Davyhulme to open as the world’s first universal free health service?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between <strong>The Welfare State</strong> (universal state support protecting citizens against illness, poverty, and unemployment from cradle to grave) and <strong>Means Testing</strong> (humiliating pre-war investigations into family assets before granting minimal poor relief):',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question:
          'Describe two features of the 1942 Beveridge Report. [4 marks]',
      },
      partB: {
        tariff: 'Question 2: Explain One Consequence [4 marks &bull; 5 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain one consequence of the Second World War for the creation of the National Health Service in 1948. [4 marks]',
        stimulus: ['The experience of evacuation and rationing', 'The July 1945 general election landslide'],
        connectives:
          'A decisive consequence was... &bull; This happened because... &bull; As a direct result... &bull; Consequently, this led to... &bull; Ultimately, this meant that...',
        wordBank:
          'William Beveridge &bull; Five Giants &bull; Want & Disease &bull; Clement Attlee &bull; 1945 Landslide &bull; Aneurin Bevan &bull; British Medical Association &bull; 5 July 1948',
      },
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 4 (1942 Beveridge Report) and Milestone 5 (5 July 1948 NHS Foundation) using dual-coding sketches and dates.',
    },
    leftPageQuip:
      'William Beveridge identified the "Five Giants" blocking reconstruction: Want, Disease, Ignorance, Squalor, and Idleness.',
    rightPageQuip:
      'On 5 July 1948, Aneurin Bevan launched the NHS at Park Hospital, pioneering the principle that healthcare is a universal human right, not a commodity.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: The Windrush Generation & Post-War Commonwealth Migration (1948–1962)',
    enquiryQuestion:
      'Why did Britain invite Commonwealth citizens after 1945, and what challenges did they overcome?',
    specAnchor:
      'Post-war labour shortages in transport, construction & NHS; British Nationality Act 1948 & imperial citizenship rights; docking of HMT Empire Windrush (22 June 1948) with 492 passengers; skilled arrivals & Lord Kitchener’s calypso; rental "colour bar" ("No Irish, No Blacks, No Dogs"); financial exclusion & "Pardner" / "Susu" community banking; August 1958 Notting Hill riots & white Teddy Boy attacks; Claudia Jones, West Indian Gazette & 1959 Caribbean Carnival; Commonwealth Immigrants Act 1962.',
    stages: [
      {
        step: 1,
        date: '1945–1948',
        paraRef: '[3.1]',
        questionHeading: 'Why did post-war Britain face severe industrial labour shortages?',
        bullets: [
          'Bomb-Damaged Infrastructure',
          'Staff Needed for NHS & Rail',
          'Recruiting Commonwealth Workers',
        ],
        focusClue:
          'How did the twin challenges of rebuilding bombed cities and staffing the new NHS compel the British government to recruit across the Caribbean?',
      },
      {
        step: 2,
        date: '1948',
        paraRef: '[3.2]',
        questionHeading: 'What rights were created by the British Nationality Act 1948?',
        bullets: [
          'Citizens of UK and Colonies',
          'Unrestricted Right of Entry',
          'Equal British Subject Status',
        ],
        focusClue:
          'Why did Parliament grant all 800 million empire and Commonwealth subjects full legal citizenship and unrestricted freedom to work in the UK?',
      },
      {
        step: 3,
        date: '22 June 1948',
        paraRef: '[3.3]',
        questionHeading: 'What was the significance of HMT Empire Windrush docking at Tilbury?',
        bullets: [
          '492 Caribbean Pioneers Arrive',
          'Lord Kitchener Sings Calypso',
          'Nurses, Welders, RAF Veterans',
        ],
        focusClue:
          'Why did the docking of the converted troopship Windrush become the defining symbol of post-war multicultural Commonwealth migration?',
      },
      {
        step: 4,
        date: '1948–1958',
        paraRef: '[3.4]',
        questionHeading: 'What barriers did Caribbean arrivals encounter in housing and banks?',
        bullets: [
          'Signs: "No Blacks, No Dogs"',
          'Refused Bank Loans & Mortgages',
          'Cooperative "Pardner" Schemes',
        ],
        focusClue:
          'How did Caribbean migrants use rotating community savings circles ("Pardner") to buy homes when commercial British banks refused mortgages?',
      },
      {
        step: 5,
        date: '1958–1962',
        paraRef: '[3.5]',
        questionHeading: 'How did Claudia Jones respond to the 1958 Notting Hill riots?',
        bullets: [
          'Violent White "Teddy Boy" Attacks',
          'Founding West Indian Gazette',
          '1959 First Caribbean Carnival',
        ],
        focusClue:
          'Why did Claudia Jones organize an indoor Caribbean Carnival in January 1959 as a weapon of cultural unity and dignity after racial violence?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between <strong>Imperial Citizenship</strong> (conferred by the British Nationality Act 1948 granting full legal rights of entry and residence) and the <strong>Colour Bar</strong> (widespread unofficial discrimination by landlords, pubs, and employers against Black citizens):',
    rightPage: {
      type: 'interpretations',
      tariff: 'Question 3: Historiographical Interpretations [12 marks &bull; 15 mins]',
      badge: 'HISTORIOGRAPHICAL ANALYSIS',
      interpretation1: {
        author: 'Historian Peter Fryer, Staying Power: The History of Black People in Britain (1984)',
        text: '“The Windrush pioneers arrived with high hopes, believing they were returning to their ancestral Mother Country as proud British subjects. Instead, they were met with cold weather, squalid housing, and an open colour bar. Landlords slammed doors in their faces, and employers relegated skilled tradesmen to the most menial jobs. Yet through mutual-aid \'Pardner\' schemes, church fellowships, and sheer resilience, they built vibrant communities that enriched the cultural life of the nation.”',
      },
      interpretation2: {
        author: 'Sociologist Sheila Patterson, Dark Strangers: A Study of West Indians in London (1963)',
        text: '“Post-war British society was not intentionally hostile, but rather deeply insular and bewildered by sudden cultural diversity. The initial friction in housing and employment was primarily a clash of customs, dialects, and social expectations rather than systemic racial prejudice. Given time, full employment, and gradual assimilation into British working-class neighbourhoods, Commonwealth migrants would be absorbed harmoniously into the fabric of British life.”',
      },
      questionB:
        'Question 3(b): Study Interpretations 1 and 2. How do they differ about the reception faced by the Windrush Generation in post-war Britain? [4 marks]',
      questionC:
        'Question 3(c): Suggest one reason why Interpretations 1 and 2 give different views about the experiences of Caribbean migrants. [8 marks]',
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 6 (22 June 1948 Windrush Arrival) using dual-coding symbols, troopship, and Tilbury Docks.',
    },
    leftPageQuip:
      'The British Nationality Act 1948 granted 800 million colonial subjects the unrestricted legal right to live and work in the United Kingdom.',
    rightPageQuip:
      'Excluded from British banks, Caribbean arrivals pooled savings in cooperative "Pardner" circles to buy their own homes and build community security.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: The 1963 Bristol Bus Boycott & British Civil Rights (1963–1968)',
    enquiryQuestion:
      'How did community direct action during the 1963 Bristol Bus Boycott force Britain’s first Race Relations Acts?',
    specAnchor:
      'Racial discrimination legal in Britain prior to 1965; Bristol Omnibus Company & TGWU union enforcing an open "colour bar"; rejection of 18-year-old Guy Bailey in March 1963; Paul Stephenson, Roy Hackett & West Indian Development Council; inspiration of Rosa Parks & 1955 Montgomery Bus Boycott; 30 April 1963 passenger boycott launch; student marches & Tony Benn’s intervention; capitulation on 28 August 1963 & Raghbir Singh; Race Relations Act 1965 & Race Relations Act 1968.',
    stages: [
      {
        step: 1,
        date: 'Early 1963',
        paraRef: '[4.1]',
        questionHeading: 'Why did the Bristol Omnibus Company enforce an open colour bar?',
        bullets: [
          'No Black Drivers or Conductors',
          'Severe Shortage of 200 Staff',
          'Union Backs Discriminatory Ban',
        ],
        focusClue:
          'How did management and trade union shop stewards justify banning non-white workers from driving buses despite acute passenger delays?',
      },
      {
        step: 2,
        date: 'March 1963',
        paraRef: '[4.2]',
        questionHeading: 'What happened when Guy Bailey applied for a conductor post?',
        bullets: [
          'Qualified 18-Year-Old Applicant',
          'Depot Cancels Interview on Phone',
          'Direct Proof of Racial Ban',
        ],
        focusClue:
          'How did Paul Stephenson’s planned phone check catch company managers admitting openly that Bailey was rejected solely because he was Jamaican?',
      },
      {
        step: 3,
        date: '30 April 1963',
        paraRef: '[4.3]',
        questionHeading: 'How was the Bristol Bus Boycott organised and launched?',
        bullets: [
          'West Indian Development Council',
          'Inspired by US Montgomery Boycott',
          'Thousands Refuse to Ride Buses',
        ],
        focusClue:
          'How did Paul Stephenson and Roy Hackett adapt Martin Luther King Jr.’s non-violent direct action tactics to mobilise Bristol’s Caribbean community?',
      },
      {
        step: 4,
        date: 'May–Aug 1963',
        paraRef: '[4.4]',
        questionHeading: 'How did student marches and political pressure isolate the company?',
        bullets: [
          'Bristol Students March in Streets',
          'Tony Benn Backs the Boycott',
          'Harold Wilson Pledges Legislation',
        ],
        focusClue:
          'Why did cross-community solidarity from university students and prominent Labour MPs transform a local labour dispute into a national scandal?',
      },
      {
        step: 5,
        date: '1963–1968',
        paraRef: '[4.5]',
        questionHeading: 'How did victory lead directly to the 1965 and 1968 Race Relations Acts?',
        bullets: [
          'Colour Bar Ends 28 August 1963',
          'First Sikh Conductor Hired',
          'Statutory Bans on Discrimination',
        ],
        focusClue:
          'How did the boycott’s triumph convince Harold Wilson’s government that voluntary tolerance was insufficient and statutory anti-racism laws were required?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between the <strong>Colour Bar</strong> (unofficial but widespread commercial discrimination where employers and venues openly refused non-white citizens) and the <strong>Race Relations Act 1965</strong> (the first UK statute outlawing racial discrimination in public places):',
    rightPage: {
      type: 'equal_split',
      partA: {
        tariff: 'Question 1: Narrative Account [8 marks &bull; 10 mins]',
        badge: 'PART A &bull; NARRATIVE',
        question:
          'Write a narrative account analysing how the 1963 Bristol Bus Boycott led to the defeat of the company\'s colour bar. [8 marks]',
        stimulus: ['Guy Bailey’s cancelled job interview (March 1963)', 'The student protest marches and pickets (May 1963)'],
        connectives:
          'Initially... &bull; This led directly to... &bull; Following this... &bull; Consequently... &bull; As an outcome of this...',
        wordBank:
          'Bristol Omnibus Company &bull; Colour Bar &bull; Paul Stephenson &bull; Roy Hackett &bull; Guy Bailey &bull; West Indian Development Council &bull; Montgomery Boycott &bull; Tony Benn',
      },
      partB: {
        tariff: 'Question 2: Explain Importance [8 marks &bull; 10 mins]',
        badge: 'PART B &bull; IMPORTANCE',
        question:
          'Explain the importance of the 1963 Bristol Bus Boycott for the development of civil rights legislation in post-war Britain. [8 marks]',
        stimulus: ['The capitulation on 28 August 1963', 'Harold Wilson’s 1965 and 1968 Race Relations Acts'],
        connectives:
          'A decisive factor was... &bull; This was important because... &bull; Furthermore... &bull; As a direct result... &bull; Ultimately, this meant that...',
        wordBank:
          'Raghbir Singh &bull; Harold Wilson &bull; Race Relations Act 1965 &bull; Race Relations Act 1968 &bull; Discrimination in Employment &bull; Legal Protection &bull; Civil Rights Turning Point',
      },
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 7 (1963 Bristol Bus Boycott) using dual-coding symbols, Bristol bus, and equality banners.',
    },
    leftPageQuip:
      'On 28 August 1963—the same day Martin Luther King delivered "I Have a Dream"—the Bristol Omnibus Company announced the end of the colour bar.',
    rightPageQuip:
      'The Bristol Bus Boycott proved that civil rights in Britain required legal force, prompting the landmark Race Relations Acts of 1965 and 1968.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: The Cold War on the Home Front & Nuclear Culture (1950–1989)',
    enquiryQuestion:
      'How did nuclear anxiety and the shadow of the atomic bomb transform British popular culture and domestic life?',
    specAnchor:
      'Hiroshima legacy & British independent nuclear deterrent; atomic test Operation Hurricane (1952) & hydrogen bomb (1957); Campaign for Nuclear Disarmament (CND, 1958) & Bertrand Russell; Gerald Holtom’s peace symbol; annual 52-mile Aldermaston Marches; subterranean civil defence network & York Cold War Bunker (1961); Royal Observer Corps (ROC) & Bomb Power Indicators; Home Office "Four-Minute Warning" sirens; 1980 "Protect and Survive" booklet; Greenham Common Women’s Peace Camp (1981–1982).',
    stages: [
      {
        step: 1,
        date: '1947–1957',
        paraRef: '[5.1]',
        questionHeading: 'Why did Britain build an independent nuclear deterrent?',
        bullets: [
          'Operation Hurricane Atomic Test',
          '1957 Hydrogen Thermonuclear Bomb',
          'Not Relying Solely on the US',
        ],
        focusClue:
          'Why did Clement Attlee’s cabinet secretly decide that Britain must possess its own atomic weapons to remain a frontline Great Power?',
      },
      {
        step: 2,
        date: 'Feb 1958',
        paraRef: '[5.2]',
        questionHeading: 'How was the Campaign for Nuclear Disarmament (CND) formed?',
        bullets: [
          'Bertrand Russell & Canon Collins',
          'Gerald Holtom Semaphore Symbol',
          'Demanding Unilateral Disarmament',
        ],
        focusClue:
          'How did Gerald Holtom combine the semaphore letters for "N" and "D" inside a circle to create the universal peace symbol?',
      },
      {
        step: 3,
        date: '1958–1965',
        paraRef: '[5.3]',
        questionHeading: 'What made the annual 52-mile Aldermaston Marches so impactful?',
        bullets: [
          '52 Miles to Nuclear Laboratory',
          'Tens of Thousands Marching',
          'Youth Counter-Culture Born',
        ],
        focusClue:
          'Why did the Easter trek from Trafalgar Square to Berkshire forge a mass protest movement influencing British music, fashion, and politics?',
      },
      {
        step: 4,
        date: '1961',
        paraRef: '[5.4]',
        questionHeading: 'What was the secret purpose of the York Cold War Bunker?',
        bullets: [
          'Royal Observer Corps HQ',
          'Sealed Underground for 30 Days',
          'Plotting Bomb Fallout Plumes',
        ],
        focusClue:
          'How was the blast-proof bunker designed to enable sixty volunteers to survive nuclear strikes and triangulate bomb detonations with wall maps?',
      },
      {
        step: 5,
        date: '1980–1982',
        paraRef: '[5.5]',
        questionHeading: 'Why did "Protect and Survive" spark public ridicule and protest?',
        bullets: [
          'Four-Minute Warning Sirens',
          'Doors Packed with Sandbags',
          'Greenham Common "Embrace Base"',
        ],
        focusClue:
          'Why did advice to build domestic inner-core shelters convince activists that civil defence was a dangerous illusion, inspiring Greenham Common?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between <strong>Nuclear Deterrence</strong> (the doctrine that possessing catastrophic atomic weapons prevents hostile superpower attack) and <strong>Civil Defence</strong> (government shelters, sirens, and booklets attempting to mitigate civilian casualties during nuclear war):',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 5: Evaluative Statement Essay [12 marks &bull; 15 mins]',
      badge: 'SYNOPTIC HISTORICAL VERDICT',
      examStem:
        '“The fear of nuclear war completely transformed British domestic life and popular culture during the Cold War.” How far do you agree? Explain your answer. [12 marks]',
      stimulus: [
        'The Campaign for Nuclear Disarmament (CND) and Aldermaston Marches',
        'The York Cold War Bunker and "Protect and Survive"',
      ],
      connectives:
        'On one hand, it can be argued that... &bull; A decisive factor supporting this is... &bull; On the other hand... &bull; An alternative argument is that... &bull; In the final analysis...',
      wordBank:
        'Independent Deterrent &bull; CND &bull; Bertrand Russell &bull; Gerald Holtom &bull; Aldermaston Marches &bull; Royal Observer Corps &bull; York Bunker &bull; Four-Minute Warning &bull; Protect and Survive &bull; Greenham Common',
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 8 (1958–1982 CND & Greenham Common) using dual-coding symbols, peace symbol, and perimeter fence.',
    },
    leftPageQuip:
      'Artist Gerald Holtom designed the CND peace symbol in 1958 by combining the flag semaphore letters for "Nuclear" (N) and "Disarmament" (D).',
    rightPageQuip:
      'In December 1982, over 30,000 women joined hands to "Embrace the Base" at RAF Greenham Common, protesting against American nuclear cruise missiles.',
  },
];

// ============================================================================
// HELPER RENDERERS
// ============================================================================

function renderSpinePage(cfg, pageNum) {
  const stagesHtml = cfg.stages
    .map((st) => {
      const bulletsHtml = st.bullets
        .map(
          (b, idx) => `
            <div style="flex: 1; display: flex; align-items: center; padding: 0 2.5px; ${idx < 2 ? 'border-bottom: 0.8px solid #cbd5e1;' : ''}">
              <div style="display: flex; align-items: flex-start; gap: 2.5px; line-height: 1.15;">
                <span style="font-weight: 900; color: #0f284e; font-size: 5pt; line-height: 1.3;">&bull;</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 700; color: #0f284e; word-break: break-word;">${b}</span>
              </div>
            </div>`,
        )
        .join('');
      return `
        <div class="spine-stage-block" style="display: flex; flex-direction: column; flex: 1; min-height: 0; margin-bottom: 2.5px; border: 1.2px solid #0f284e; border-radius: 2px; overflow: hidden; background: #ffffff;">
          
          <!-- Full-Width Banner with Key Question Across Page -->
          <div class="stage-banner" style="background: #0f284e; color: #ffffff; padding: 2px 7px; display: flex; align-items: center; border-bottom: 1.2px solid #0f284e;">
            <div style="display: flex; align-items: center; gap: 6px; min-width: 0; flex: 1;">
              <span style="background: #ffffff; color: #0f284e; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 0.5px 5.5px; border-radius: 2px; white-space: nowrap;">
                Stage ${st.step}
              </span>
              ${st.paraRef ? `<span style="background: #1e3a8a; border: 0.8px solid #93c5fd; color: #ffffff; font-family: 'Inter', monospace; font-size: 6.8pt; font-weight: 800; padding: 0.5px 4.5px; border-radius: 2px; white-space: nowrap;">Text ${st.paraRef}</span>` : ''}
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #93c5fd; white-space: nowrap;">
                ${st.date}
              </span>
              <span style="color: #60a5fa; font-size: 7pt;">&bull;</span>
              <span style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${st.questionHeading}
              </span>
            </div>
          </div>

          <!-- Content Row: Left 3-Zone Trigger Spine (25mm) & Right Ruled Writing Lines (~173mm) -->
          <div style="display: flex; flex: 1; min-height: 0; align-items: stretch;">
            
            <div style="width: 25mm; flex-shrink: 0; background: #f0f4f9; display: flex; flex-direction: column; border-right: 1.2px solid #0f284e; box-sizing: border-box;">
              ${bulletsHtml}
            </div>

            <div style="flex: 1; display: flex; flex-direction: column; background: #ffffff; margin: 0; padding: 0;">
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
              <div style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box;"></div>
            </div>

          </div>
        </div>`;
    })
    .join('');

  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CHRONOLOGICAL INQUIRY SPINE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Lesson Header with Inquiry Question Title -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; background: #0f284e; color: #ffffff; border: 1.2px solid #0f284e; padding: 1px 6px; border-radius: 2px;">
            ENQUIRY ${cfg.lessonNum} &bull; LESSON NOTEBOOK
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #0f284e;">
            KEY STAGE 3 &bull; RIGHTS, PROTEST, AND POST-WAR BRITAIN: 1900–PRESENT
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f284e; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Specification Focus Strip -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; padding: 2px 6px; background: #f0f4f9; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.4pt; line-height: 1.2; color: #1e293b;">
        <strong style="color: #0f284e;">Core Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

function renderRightPage(cfg, pageNum) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const rp = cfg.rightPage;

  if (rp.type === 'single_12') {
    // 12-MARK CAUSAL / EVALUATIVE ESSAY WRITING
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • 12-MARK EXTENDED ESSAY -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          ${rp.badge || 'EXTENDED WRITING PRACTICE'}
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; border-radius: 3px; padding: 5px 8px; background: #f0f4f9; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #0f284e; margin-bottom: 3px; line-height: 1.25;">
          ${rp.examStem || rp.question}
        </div>
        ${
          rp.stimulus
            ? `
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #1e293b;">
          <strong style="color: #0f284e;">Stimulus:</strong>
          <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #475569;">(You must also use information of your own)</span>
        </div>`
            : ''
        }
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 2px; color: #0f284e;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-style: italic; line-height: 1.22; display: block; color: #1e293b;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; display: block; margin-bottom: 2px; color: #0f284e;">Key Vocabulary Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; display: block; color: #1e293b;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Task Lines for Extended Writing (25 Lines • Matching GCSE 7.8mm pitch) -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #222222; margin-bottom: 2px;">
        <strong style="color: #0f284e;">Task:</strong> Using the vocabulary and connectives above, write your analytical response below:
      </div>
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
        ${Array(25).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
      </div>

      <!-- Timeline Mission Box -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
            Turn to Centrefold &bull; Pages 8–9 &rarr;
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
          ${rp.timelineMission}
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else if (rp.type === 'interpretations') {
    // DUAL HISTORIOGRAPHICAL INTERPRETATIONS WRITING
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • CONTRASTING INTERPRETATIONS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          HISTORIOGRAPHICAL ANALYSIS
        </span>
      </div>

      <!-- Competing Historical Interpretations Box -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px;">
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 6px; background: #fdfbf7;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 1 &bull; ${rp.interpretation1.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.22;">
            ${rp.interpretation1.text}
          </div>
        </div>
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 6px; background: #f0f4f9;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            Interpretation 2 &bull; ${rp.interpretation2.author}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.22;">
            ${rp.interpretation2.text}
          </div>
        </div>
      </div>

      <!-- Task B: Question 3(b) (14 Lines) -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px; flex: 1.15; display: flex; flex-direction: column; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e;">
            ${rp.questionB}
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            PART B
          </span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(14).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>
      </div>

      <!-- Task C: Question 3(c) (12 Lines) -->
      <div style="flex: 1.15; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e;">
              ${rp.questionC}
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              PART C
            </span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0; margin-bottom: 3px;">
            ${Array(12).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
          </div>
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else if (rp.type === 'equal_split') {
    // TWO EQUAL-WEIGHT 8-MARK QUESTIONS (PART A + PART B)
    const partA = rp.partA || {};
    const partB = rp.partB || {};

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • DUAL 8-MARK SKILLS PRACTICE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: QUESTION 1 [8 MARKS] -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px; flex: 1.1; display: flex; flex-direction: column; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 9.6pt; color: #0f284e; margin: 0; font-weight: 800;">
            ${partA.tariff || 'Question 1: Narrative Account [8 marks]'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            ${partA.badge || 'PART A &bull; NARRATIVE'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0; line-height: 1.22;">
          ${partA.question || ''}
        </p>
        ${
          partA.stimulus
            ? `
        <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #1e293b; margin-bottom: 2.5px;">
          <strong style="color: #0f284e;">Stimulus:</strong>
          <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partA.stimulus[0]}</span>
          <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partA.stimulus[1]}</span>
        </div>`
            : ''
        }
        <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22;">
          ${partA.connectives ? `<div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partA.connectives}</em></div>` : ''}
          ${partA.wordBank ? `<div style="margin-top: 1.5px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partA.wordBank}</span></div>` : ''}
        </div>
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(14).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>
      </div>

      <!-- PART B: QUESTION 2 [8 MARKS] -->
      <div style="flex: 1.1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 9.6pt; color: #0f284e; margin: 0; font-weight: 800;">
              ${partB.tariff || 'Question 2: Structured Writing [8 marks]'}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              ${partB.badge || 'PART B &bull; IMPORTANCE'}
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0; line-height: 1.22;">
            ${partB.question || ''}
          </p>
          ${
            partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.0pt; color: #1e293b; margin-bottom: 2.5px;">
            <strong style="color: #0f284e;">Stimulus:</strong>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[0]}</span>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[1]}</span>
          </div>`
              : ''
          }
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22;">
            ${partB.connectives ? `<div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partB.connectives}</em></div>` : ''}
            ${partB.wordBank ? `<div style="margin-top: 1.5px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partB.wordBank}</span></div>` : ''}
          </div>
          <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0; margin-bottom: 3px;">
            ${Array(14).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
          </div>
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  } else {
    // TWO-PART ROTATING SKILLS WRITING (SPLIT: PART A + PART B)
    const partA = rp.partA || {};
    const partB = rp.partB || {};

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • ROTATING DISCIPLINARY SKILLS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: SHORT-FORM DISCIPLINARY PRACTICE [4 OR 8 MARKS] -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 4px; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
            ${partA.tariff || 'Question 1: Disciplinary Drill'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            ${partA.badge || 'FEATURE DRILL'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0;">
          ${partA.question || ''}
        </p>
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>

      <!-- PART B: EXTENDED SKILL WRITING [4, 8 OR 12 MARKS] -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
              ${partB.tariff || 'Question 2: Structured Writing'}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              ${partB.badge || 'STRUCTURED WRITING'}
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.4pt; font-weight: 800; color: #0f284e; margin: 0 0 3px 0; line-height: 1.25;">
            ${partB.question || ''}
          </p>
          ${
            partB.stimulus
              ? `
          <div style="display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b; margin-bottom: 3px;">
            <strong style="color: #0f284e;">Stimulus:</strong>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[0]}</span>
            <span style="border: 1px solid #0f284e; padding: 0.5px 5px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #f0f4f9;">${partB.stimulus[1]}</span>
          </div>`
              : ''
          }

          <!-- Connectives & Word Bank -->
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 4px 7px; background: #f0f4f9; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.24;">
            <div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partB.connectives}</em></div>
            <div style="margin-top: 2px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partB.wordBank}</span></div>
          </div>
        </div>

        <!-- Ruled Writing Lines (18 Lines • Matching GCSE 7.8mm pitch) -->
        <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 4px; flex: 1; min-height: 0;">
          ${Array(18).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Timeline Mission'}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f284e;">
              Turn to Centrefold &bull; Pages 8–9 &rarr;
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.9pt; color: #111111; line-height: 1.22;">
            ${rp.timelineMission}
          </div>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  }
}

function renderNotesPage(pageNum, quip) {
  if (pageNum === 14) {
    const ruledRows = Array(27)
      .fill(
        '<div class="lined-row"><div class="lined-margin-cell"></div><div class="lined-content-cell"></div></div>',
      )
      .join('');

    return `
  <!-- PAGE 14: GENERAL NOTES PAGE -->
  <div class="page page-container verso-page" id="page-14" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f284e; font-weight: 900;">
          General Notes &bull; Scholar Planning Space
        </h2>
      </div>

      <div class="lined-page-grid">
        ${ruledRows}
      </div>

      ${renderFooterStrip(14, quip, 16)}
    </div>
  </div>`;
  } else {
    const ruledRows = Array(29)
      .fill(
        '<div class="lined-row"><div class="lined-margin-cell"></div><div class="lined-content-cell"></div></div>',
      )
      .join('');

    return `
  <!-- PAGE 15: BLANK LINED PAGE (NO HEADING) -->
  <div class="page page-container recto-page" id="page-15" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div class="lined-page-grid" style="margin-top: 1mm;">
        ${ruledRows}
      </div>

      ${renderFooterStrip(15, quip, 16)}
    </div>
  </div>`;
  }
}

// ============================================================================
// MAIN COMPILATION FUNCTION
// ============================================================================
function compilePostWarBritainWorkbook() {
  const coverImgBase64 =
    getBase64Image('public/images/post_war_britain_cover.jpg') ||
    getBase64Image('images/post_war_britain_cover.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rights, Protest, and Post-War Britain (1900–Present) Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;1,6..72,400&family=Georgia:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 10mm 12mm 10mm;
    }
    body {
      font-family: 'Georgia', serif;
      font-size: 8.5pt;
      line-height: 1.32;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page, .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
    }
    .verso-page {
      padding: 4mm 6mm;
    }
    .recto-page {
      padding: 4mm 6mm;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .task-line {
      border-bottom: 1.2px solid #000000;
      height: 7.8mm;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }
    .ruled-lines-block {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin: 1px 0;
    }
    .lined-page-grid {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 2px 0 3px 0;
      border-top: 1.2px solid #000000;
    }
    .lined-row {
      display: flex;
      flex: 1;
      min-height: 0;
      border-bottom: 1.2px solid #000000;
      box-sizing: border-box;
    }
    .lined-margin-cell {
      width: 18mm;
      border-right: 1.2px solid #e11d48;
      box-sizing: border-box;
    }
    .lined-content-cell {
      flex: 1;
    }
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.8px solid #0f284e;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.15;
      color: #000000;
    }
    .footer-quip {
      font-style: italic;
      color: #475569;
      white-space: nowrap;
    }
    .footer-page-num {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      white-space: nowrap;
      color: #0f284e;
      font-size: 6.8pt;
      flex-shrink: 0;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page, .page-container { page-break-after: always; break-after: page; }
    }
  </style>
</head>
<body>

  <!-- ==================================================================== -->
  <!-- PAGE 1: FRONT COVER                                                  -->
  <!-- ==================================================================== -->
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 4px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          KEY STAGE 3 HISTORICAL STUDIES &bull; YEAR 9
        </div>
      </div>

      <!-- Pupil Record Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6.5px 12px; background: #f8fafc; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 4px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Unit Hero Header -->
      <div style="background: #0f284e; color: #ffffff; border-radius: 4px; padding: 8px 12px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #93c5fd; margin-bottom: 2px;">
            TWENTIETH-CENTURY BRITISH SOCIAL &amp; POLITICAL HISTORY &bull; 1900–PRESENT
          </div>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 15pt; font-weight: 900; margin: 0; line-height: 1.15; letter-spacing: 0.3px;">
            Rights, Protest, and Post-War Britain
          </h1>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; font-style: italic; color: #e2e8f0; margin-top: 2px;">
            From the Suffrage Campaign &amp; the Welfare State to Commonwealth Civil Rights and the Nuclear Age
          </div>
        </div>
        <div style="text-align: right; border-left: 1.5px solid rgba(255,255,255,0.25); padding-left: 12px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #ffffff;">5 ENQUIRIES</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #93c5fd; text-transform: uppercase;">16-Page Standard</div>
        </div>
      </div>

      <!-- Curated Primary Source Feature Plate: Festival of Britain 1951 (80mm Frame) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 6px;">
        <div style="display: grid; grid-template-columns: 142mm 1fr; background: #ffffff;">
          <!-- Primary Photograph / Artwork Image -->
          <div style="height: 80mm; background: #0f172a; position: relative;">
            <img src="${coverImgBase64}" style="width: 100%; height: 80mm; object-fit: contain; object-position: center; display: block; background: #eed7aa;" alt="Primary Source: 1951 Festival of Britain by Abram Games">
            <div style="position: absolute; bottom: 8px; left: 6px; background: rgba(15, 40, 78, 0.88); color: #ffffff; padding: 2px 6px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; letter-spacing: 0.4px;">
              PRIMARY ARTWORK &bull; SOUTH BANK EXHIBITION, LONDON (1951)
            </div>
          </div>

          <!-- Academic Source Provenance & Context Deck -->
          <div style="padding: 6px 8px; display: flex; flex-direction: column; justify-content: space-between; border-left: 1.5px solid #0f284e; background: #ffffff;">
            <!-- 1. Metadata Label -->
            <div style="border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
                PRIMARY EVIDENCE &bull; POST-WAR RENEWAL
              </span>
            </div>

            <!-- 2. Source Provenance Context -->
            <div style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.25; color: #1e293b; margin: 3px 0;">
              <strong>Historical Context:</strong> In the summer of 1951, a century after the 1851 Great Exhibition, Clement Attlee’s government opened the <strong>Festival of Britain</strong> on London’s bomb-damaged South Bank. Designed by graphic artist Abram Games, the iconic Britannia emblem symbolised national recovery, scientific modernity, and democratic pride rising from the ruins of total war.
            </div>

            <!-- 3. Key Inquiry Anchor -->
            <div style="background: #f0f4f9; border-left: 3px solid #0f284e; padding: 3px 5px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; color: #0f284e;">
              <strong>Central Enquiry:</strong> How did post-war reconstruction, the Welfare State, and Commonwealth migration fundamentally redefine what it meant to be British?
            </div>

            <!-- 4. Citation -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 2px;">
              <strong>Holding Archive:</strong> Victoria and Albert Museum / The National Archives, BT 26/1237. Official Festival Guide cover by Abram Games (1914–1996).
            </div>
          </div>
        </div>
      </div>

      <!-- Syllabus Progress Ledger (5 Enquiries) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 2px; flex: 1; display: flex; flex-direction: column;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; flex: 1;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff;">
              <th style="padding: 5px 8px; width: 78%; text-align: left; font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25);">
                Enquiry Directory &bull; Key Stage 3 Syllabus
              </th>
              <th style="padding: 5px 4px; width: 11%; text-align: center; font-size: 7.2pt; text-transform: uppercase; border-right: 1.2px solid rgba(255,255,255,0.25);">
                Notes
              </th>
              <th style="padding: 5px 4px; width: 11%; text-align: center; font-size: 7.2pt; text-transform: uppercase;">
                Mastery
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 1: Votes for Women: Suffragists vs Suffragettes (1897–1918)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Were the Suffragists or Suffragettes more effective in securing the vote for women?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 2: 1945 &amp; The Foundation of the Welfare State / NHS (1942–1951)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  How did the aftermath of total war build the modern Welfare State and the National Health Service?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 3: The Windrush Generation &amp; Post-War Commonwealth Migration (1948–1962)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Why did Britain invite Commonwealth citizens after 1945, and what challenges did they overcome?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 4: The 1963 Bristol Bus Boycott &amp; British Civil Rights (1963–1968)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  How did community direct action during the 1963 Bristol Bus Boycott force Britain’s first Race Relations Acts?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 18px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 5: The Cold War on the Home Front &amp; Nuclear Culture (1950–1989)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  How did nuclear anxiety and the shadow of the atomic bomb transform British popular culture and domestic life?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      ${renderFooterStrip(1, 'In 1948, the British Nationality Act recognized 800 million citizens of the British Empire as equal British subjects.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (VOTES FOR WOMEN: SUFFRAGISTS VS SUFFRAGETTES)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (THE WELFARE STATE & THE NHS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (THE WINDRUSH GENERATION & MIGRATION)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[2], 6);
  html += renderRightPage(enquiryConfigs[2], 7);

  // ====================================================================
  // PAGES 8–9: CENTREFOLD LIVING TIMELINE (MATCHING CROWN GOLD STANDARD)
  // ====================================================================
  html += `
  <!-- PAGE 8: LIVING TIMELINE PART 1 (MILESTONES 1–4) -->
  <div class="page page-container verso-page" id="page-8" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Suffrage, Total War &amp; The Welfare Settlement (1897–1945)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1897 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1897 &bull; Formation of the NUWSS &amp; Constitutional Suffrage
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Millicent Fawcett unites regional suffrage societies into the National Union of Women's Suffrage Societies (NUWSS). Campaigning with peaceful petitions, parliamentary lobbying, and mass marches, they prove female political maturity.
          </p>
        </div>

        <!-- Milestone 2: 1903–1913 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1903–1913 &bull; Formation of the WSPU &amp; The "Cat and Mouse Act"
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Emmeline Pankhurst founds the Women's Social and Political Union (WSPU) under "Deeds, not words". Suffragettes adopt militant civil disobedience, window-smashing, hunger strikes, and force-feeding under the 1913 Cat and Mouse Act.
          </p>
        </div>

        <!-- Milestone 3: 1918 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              Feb 1918 &bull; Representation of the People Act 1918
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Following the decisive mobilization of over 1.5 million women in munitions factories ("Canary Girls"), transport, and the Land Army during World War I, Parliament grants women over thirty meeting property criteria the right to vote.
          </p>
        </div>

        <!-- Milestone 4: Dec 1942 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              Dec 1942 &bull; The Beveridge Report &amp; Slaying the "Five Giants"
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Sir William Beveridge publishes his revolutionary blueprint on Social Insurance, selling over 630,000 copies. He pledges to conquer the Five Giants—Want, Disease, Ignorance, Squalor, and Idleness—"from the cradle to the grave".
          </p>
        </div>

      </div>

      ${renderFooterStrip(8, 'Centrefold timeline: Dual-coding sketches and dates turns narrative history into permanent long-term memory.', 16)}
    </div>
  </div>

  <!-- PAGE 9: LIVING TIMELINE PART 2 (MILESTONES 5–8) -->
  <div class="page page-container recto-page" id="page-9" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: The NHS, Windrush, Civil Rights &amp; Nuclear Age (1948–1982)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 5 July 1948 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              5 July 1948 &bull; Foundation of the National Health Service (NHS)
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Minister of Health Aneurin Bevan opens the NHS at Park Hospital, Davyhulme. Overcoming fierce BMA resistance by compromising with consultants, Bevan establishes healthcare funded by taxation and completely free at the point of delivery.
          </p>
        </div>

        <!-- Milestone 6: 22 June 1948 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              22 June 1948 &bull; Arrival of HMT Empire Windrush at Tilbury
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            The Empire Windrush docks carrying 492 Caribbean passengers invited to help reconstruct post-war Britain. Arriving as citizens under the British Nationality Act 1948, they confront the colour bar, building mutual-aid Pardner networks.
          </p>
        </div>

        <!-- Milestone 7: 1963 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1963 &bull; The Bristol Bus Boycott &amp; Race Relations Acts
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Paul Stephenson and Roy Hackett lead a four-month passenger boycott against the Bristol Omnibus Company's refusal to hire Black or Asian bus crews. Capitulation on 28 August 1963 paves the way for the Race Relations Acts of 1965 and 1968.
          </p>
        </div>

        <!-- Milestone 8: 1958–1982 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1958–1982 &bull; CND, Aldermaston Marches &amp; Greenham Common
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            The Campaign for Nuclear Disarmament (CND) launches the annual Aldermaston Marches, using Gerald Holtom's peace symbol. Nuclear anxiety inspires civil defence bunkers like York, while 30,000 women "Embrace the Base" at Greenham Common in 1982.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'Between 1900 and the late 20th century, British democracy was transformed by civic protest, the welfare settlement, and multi-ethnic community resilience.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (THE BRISTOL BUS BOYCOTT & CIVIL RIGHTS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (COLD WAR ON THE HOME FRONT & NUCLEAR CULTURE)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[4], 12);
  html += renderRightPage(enquiryConfigs[4], 13);

  // ====================================================================
  // PAGES 14–15: DEDICATED LINED NOTES PAGES
  // ====================================================================
  html += renderNotesPage(
    14,
    'Historical scholarship requires rigorous factual recall, primary evidence, and deep contextual grounding.',
  );
  html += renderNotesPage(
    15,
    'Extended writing synthesises causation, evaluates competing interpretations, and reaches a substantiated historical verdict.',
  );

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (PROGRESS LEDGER + 5 QR REVISION CARDS)
  // ====================================================================
  html += `
  <!-- PAGE 16: OUTSIDE BACK COVER -->
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11.5pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
          Key Stage 3 History &bull; Pupil Progress &amp; Assessment Record
        </h2>
      </div>

      <!-- Pupil Details & Target Level Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1.3fr; gap: 14px; align-items: center; margin-bottom: 5px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target KS3 Level:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px; text-align: center; font-weight: 900; color: #0f284e;"></div>
        </div>
      </div>

      <!-- KS3 History Progress Pathways & Descriptors -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 5px; font-family: 'Inter', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-size: 8pt; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            Key Stage 3 History Assessment Pathways &bull; Level Descriptors &amp; Criteria
          </strong>
          <span style="font-size: 7.2pt; font-weight: 800; color: #0f284e;">YEAR 9 STANDARDS</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; font-size: 7pt; line-height: 1.3;">
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging (1–2)
              </div>
              Recalls key historical facts; describes basic events (e.g. Suffragettes, Beveridge, Windrush) using guided starters.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Add dates &amp; key vocabulary.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging+ (3)
              </div>
              Identifies reasons for events; describes causes of social reforms, racial discrimination, and nuclear protest.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Explain *why*, not just *what*.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected (4–5)
              </div>
              Explains multiple causes &amp; consequences; writes structured causal paragraphs linking protest, state policy, and social change.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Rank and connect multiple causes.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected+ (6–7)
              </div>
              Analyses causal interaction; evaluates competing historical interpretations (e.g. Windrush reception) with precise evidence.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Sustained historical criteria.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Greater Depth (8–9)
              </div>
              Sustained, nuanced evaluative judgement; synthesises constitutional reform, grassroots civil rights direct action, and cultural changes.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Nuanced synoptic judgements.
            </div>
          </div>
        </div>
      </div>

      <!-- Streamlined KS3 Marking Grid -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff;">
              <th style="padding: 7px 4px; width: 10%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Date</th>
              <th style="padding: 7px 8px; width: 43%; text-align: left; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Enquiry &bull; Assessment Focus</th>
              <th style="padding: 7px 6px; width: 17%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">KS3 Level / Effort</th>
              <th style="padding: 7px 8px; width: 30%; text-align: left; font-size: 7.5pt; text-transform: uppercase; color: #ffffff;">Teacher Comment / Spellings</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 1: Votes for Women: Suffragists vs Suffragettes</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Causal Analysis: Why did women over thirty win the vote in 1918?</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: 1945 &amp; The Welfare State / NHS</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Feature Drill &amp; Consequence of Total War on Healthcare</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: The Windrush Generation &amp; Migration</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Contrasting Interpretations: Reception of Caribbean Migrants</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: The 1963 Bristol Bus Boycott</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Narrative Account &amp; Importance of Boycott for Civil Rights Acts</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: The Cold War on the Home Front</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Evaluative Essay: Impact of Nuclear Fear on British Domestic Life</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="background: #ffffff; border-top: 1.5px solid #0f284e;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Teacher-Designated Assessment Task</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Synoptic End-of-Unit Assessment &amp; Revision Target</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Interactive Digital Quizzing Hub -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 3px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; color: #0f284e;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; text-align: center;">
          ${enquiryConfigs
            .map((cfg, idx) => {
              const targetLesson = idx + 1;
              const quizUrl =
                'https://the-history-revision-hub.netlify.app/?unit=post_war_britain&lesson=' +
                targetLesson +
                '&quiz=true';
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Votes for Women',
                'Welfare State / NHS',
                'Windrush 1948',
                'Bristol Boycott',
                'Cold War Britain',
              ];
              return (
                '<div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">Enquiry ' +
                cfg.lessonNum +
                '</div>' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 6.5pt; font-weight: 700; color: #475569; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">' +
                shortLabels[idx] +
                '</div>' +
                '<div style="width: 24mm; height: 24mm; margin: 0 auto 2px auto;">' +
                qrSvg +
                '</div>' +
                '<span style="font-family: \'Inter\', sans-serif; font-size: 6.2pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; margin-bottom: 2px;">Scan to Quiz</span>' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 8.5pt; font-weight: 900; color: #0f284e; margin-top: 1px; white-space: nowrap;">Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 8</strong> ]</div>' +
                '</div>'
              );
            })
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(16, 'The History Revision Hub &bull; Master Saddle-Stitch Pupil Workbook Standard &bull; All Rights Reserved.', 16)}
    </div>
  </div>
`;

  html += `
</body>
</html>`;

  return html;
}

async function main() {
  console.log(
    'Rendering 16-Page A4 Pupil Workbook (Monarchy Gold Standard): Rights, Protest, and Post-War Britain (1900–Present)...',
  );

  const html = compilePostWarBritainWorkbook();

  // Save HTML targets
  const outHtmlPublic = path.join(ROOT_DIR, 'public', 'units', 'post_war_britain', 'pupil_workbook.html');
  const outHtmlUnits = path.join(ROOT_DIR, 'units', 'post_war_britain', 'pupil_workbook.html');

  fs.writeFileSync(outHtmlPublic, html, 'utf8');
  console.log(`[OK] HTML written to: ${outHtmlPublic}`);

  if (fs.existsSync(path.dirname(outHtmlUnits))) {
    fs.writeFileSync(outHtmlUnits, html, 'utf8');
    console.log(`[OK] HTML mirrored to: ${outHtmlUnits}`);
  }

  // Compile PDF via Puppeteer
  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Verify Page Count & Overflow in DOM
  const auditResults = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    return pages.map((p, idx) => {
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const diff = scrollH - clientH;
      return {
        page: idx + 1,
        overflow: diff > 2,
        diff,
        horizOverflow: p.scrollWidth > p.clientWidth + 2,
      };
    });
  });

  console.log(`Rendered exactly ${auditResults.length} pages.`);
  auditResults.forEach((r) => {
    console.log(
      `  Page ${r.page}: overflow=${r.overflow} (diff=${r.diff}px), horizOverflow=${r.horizOverflow}`,
    );
  });

  const overflows = auditResults.filter((r) => r.overflow);
  if (overflows.length > 0) {
    console.warn('WARNING: Pages with height overflows:', overflows);
  } else {
    console.log('✅ PERFECT: All 16 pages have 0px overflow and balanced layout!');
  }

  const outPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', 'post_war_britain_pupil_workbook.pdf');
  const outPdf16pPath = path.join(ROOT_DIR, 'public', 'pdfs', 'post_war_britain_16p_workbook.pdf');
  const outPdfV17Path = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'post_war_britain_pupil_workbook_FINAL_V17.pdf',
  );
  const outPdfV2Path = path.join(ROOT_DIR, 'public', 'pdfs', 'post_war_britain_pupil_workbook_V2.pdf');

  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  });

  // Mirror to aliases
  fs.copyFileSync(outPdfPath, outPdf16pPath);
  fs.copyFileSync(outPdfPath, outPdfV17Path);
  fs.copyFileSync(outPdfPath, outPdfV2Path);

  await browser.close();
  console.log(`[OK] PDF successfully compiled: ${outPdfPath}`);
  console.log(`[OK] 16P PDF alias compiled: ${outPdf16pPath}`);
  console.log(`[OK] V17 PDF alias compiled: ${outPdfV17Path}`);
  console.log(`[OK] V2 PDF alias compiled: ${outPdfV2Path}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = {
  compilePostWarBritainWorkbook,
  enquiryConfigs,
  lessonConfigs: enquiryConfigs,
};
