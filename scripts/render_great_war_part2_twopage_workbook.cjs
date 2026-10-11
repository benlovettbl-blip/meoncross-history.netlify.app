/**
 * History Revision Hub — Key Stage 3 Universal Publishing Engine
 *
 * Target: units/great_war_part2 (Year 9: The Great War, 1914–1919)
 * Output: public/units/great_war_part2/pupil_workbook.html
 * PDF:    public/pdfs/great_war_part2_pupil_workbook.pdf
 *
 * Gold-Standard Key Stage 3 16-Page Saddle-Stitch Architecture:
 * - Page 1: Publisher Front Cover with Department Customizer, Pupil Info, 103mm Artwork Plate & Syllabus Roadmap
 * - Pages 2–7: Enquiries 1, 2, 3 (2 pages each)
 *     * Left Page (Verso): 5-Stage Chronological Inquiry Spine with trigger factors (25mm) & ruled lines (~173mm) + Vocab Prompt (Zero "Do Now" tasks)
 *     * Right Page (Recto): Extended Disciplinary Writing & Assessment (3-col structure strip, connectives, word bank, ruled lines, Timeline Mission box & Teacher rubric)
 * - Pages 8–9: Centrefold Living Timeline Spread (Physical staple centre of 16-page booklet):
 *     * Page 8 (Verso): Living Timeline Part 1 (Milestones 1–4) with dual-coding sketchpads
 *     * Page 9 (Recto): Living Timeline Part 2 (Milestones 5–8) with dual-coding sketchpads
 * - Pages 10–15: Enquiries 4, 5, 6 (2 pages each, identical Verso spine + Recto writing architecture)
 * - Page 16: Outside Back Cover (KS3 Progress Descriptors, 6-Enquiry Teacher Marking Ledger & 6-Grid QR Quizzing Hub)
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
    path.join(ROOT_DIR, 'public', 'units', 'great_war_part2', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'great_war_part2', 'assets', path.basename(clean)),
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
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

// ============================================================================
// 6 Dedicated Great War Enquiry Configurations (1914–1919)
// Gold-Standard Christine Counsell 5-Stage Decimal Inquiry Architecture
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1_enlistment',
    title: 'Enquiry 1: The Rush to the Colours & Voluntary Enlistment (1914)',
    enquiryQuestion:
      'Why were young British men so desperate to volunteer for the slaughter of 1914?',
    specAnchor:
      'Lack of conscription; Lord Kitchener’s recruitment campaign; moral outrage over the German invasion of neutral Belgium ("Rape of Belgium"); workplace camaraderie & Pals Battalions (Pompey Pals); economic poverty & the King’s Shilling; propaganda posters & White Feather shame.',
    stages: [
      {
        step: 1,
        date: 'Aug 1914',
        questionHeading: 'Why did Britain rely on Kitchener’s call for 500,000 volunteers?',
        bullets: ['No Conscription', 'BEF Just 120,000 Men', 'Kitchener’s Dire Call'],
        focusClue:
          'How did Britain’s lack of peacetime conscription force the government into a massive voluntary advertising campaign?',
      },
      {
        step: 2,
        date: 'Aug–Sept 1914',
        questionHeading:
          'How did the "Rape of Belgium" spark genuine moral outrage and civic duty?',
        bullets: ['1839 Treaty of London', 'German Atrocities', 'Crusade for Law'],
        focusClue:
          'Why did British volunteers view the war as a righteous crusade to defend international law and neutral Belgium?',
      },
      {
        step: 3,
        date: 'Autumn 1914',
        questionHeading: 'How did Pals Battalions harness workplace and civic camaraderie?',
        bullets: ['Enlist & Serve Together', 'Pompey Pals Formed', 'Irresistible Peer Pride'],
        focusClue:
          'How did joining with workmates and sports teams transform military service into an exciting communal adventure?',
      },
      {
        step: 4,
        date: '1914–1915',
        questionHeading: 'Why was enlistment compelled by economic necessity and poverty?',
        bullets: ['No Peacetime Welfare', 'King’s Shilling (1s 2d/Day)', 'Separation Allowances'],
        focusClue:
          'Why did guaranteed pay, hot food, boots, and separation allowances attract working-class men from bleak civilian jobs?',
      },
      {
        step: 5,
        date: '1914–1915',
        questionHeading: 'How did propaganda posters and the White Feather weaponize shame?',
        bullets: ['Women Say GO!', 'Order of White Feather', 'Fear of Public Shame'],
        focusClue:
          'How did public shaming and emotional manipulation force young men as young as fifteen to lie about their age to enlist?',
      },
    ],
    vocabPrompt:
      'Define <strong>Pals Battalions</strong> and explain why local civic recruitment led to catastrophic community devastation after July 1916:',
    rightPage: {
      type: 'source_utility',
      tariff: 'Question 1: Dual-Source Utility & Enlistment Motivation [8 marks &bull; 10 mins]',
      question:
        'Study Sources A and B. How useful are Sources A and B for an enquiry into why British men volunteered to join the army in 1914? [8 marks]',
      sourceA: {
        title: 'Source A: Parliamentary Recruiting Committee Poster No. 75 (1915)',
        shelfmark: 'IMPERIAL WAR MUSEUM • LONDON • ART.IWM PST 2763',
        text: '“Women of Britain say—‘GO!’ Is your lad in uniform yet? If not, why not? Won’t you send him to defend your honour? There are women who would give their lives to bring their boys back from the front, but they sent them willingly.”',
        clue: 'Official government propaganda poster designed to use domestic emotional guilt and public shame to compel men into uniform.',
      },
      sourceB: {
        title: 'Source B: Diary of Private Arthur Green, Portsmouth Dockyard (August 1914)',
        shelfmark: 'HAMPSHIRE RECORD OFFICE • WINCHESTER • 42M78/P12',
        text: '“When the call came, four of us from the naval fitting shop marched straight down to the Town Hall to join the Pompey Pals. We feared being called slackers, but mostly we wanted to stick together with our mates. It felt like the greatest adventure of our lives.”',
        clue: 'Private personal diary written at the time; reveals genuine peer camaraderie and fear of social disgrace among local workers.',
      },
      matrix: [
        {
          col: '1. CONTENT & INFERENCE',
          text: 'Analyse what each source reveals about motives for enlisting (state moral guilt vs peer camaraderie and adventure).',
        },
        {
          col: '2. PROVENANCE & MOTIVE',
          text: 'Evaluate how origin and purpose (official recruitment propaganda vs private frontline diary) affects reliability.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Weigh which source provides a more authentic understanding of why ordinary British men flocked to the colours in 1914.',
        },
      ],
      connectives:
        'Source A is valuable for revealing how official propaganda weaponized... &bull; However, its utility is limited because as state propaganda it... &bull; In contrast, Source B provides authentic eyewitness evidence that... &bull; Furthermore, local Hampshire records show the Pompey Pals... &bull; On balance, both sources together are essential because...',
      wordBank:
        'Lord Kitchener &bull; Pals Battalions &bull; Pompey Pals &bull; Treaty of London &bull; White Feather campaign &bull; King’s Shilling &bull; British Expeditionary Force (BEF)',
      timelineMissionTitle: 'Centrefold Sketch Challenge 1',
      timelineMission:
        '<strong>Milestone 1 (The Rush to the Colours &bull; August 1914):</strong> Turn to Centrefold (Pages 8–9). In Milestone 1, sketch Lord Kitchener’s pointing recruitment finger, the Portsmouth Town Hall steps, or civilian volunteers enlisting in the Pompey Pals [👉 pointing finger &bull; 🏛️ town hall &bull; 🎖️ volunteer cap].',
    },
    leftPageQuip:
      'Over 750,000 men volunteered in the first eight weeks of the war; by late 1915, nearly 2.5 million had enlisted.',
    rightPageQuip:
      'The 14th and 15th Battalions of the Hampshire Regiment—the Pompey Pals—were almost wiped out on the Somme in 1916.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2_trenches_haig',
    title: 'Enquiry 2: Trench Warfare & The Haig Command Controversy (1915–1916)',
    enquiryQuestion: 'Did British military generals make the horror of trench warfare worse?',
    specAnchor:
      'Race to the Sea & establishment of 400-mile Western Front; defensive supremacy of machine guns (Maxim) and barbed wire; three-line trench network architecture; First Day on the Somme (57,470 casualties); historiographical debate: Alan Clark ("Lions Led by Donkeys") vs Gary Sheffield ("Tactical Learning Curve").',
    stages: [
      {
        step: 1,
        date: 'Autumn 1914',
        questionHeading: 'How did the "Race to the Sea" create a 400-mile continuous trench line?',
        bullets: ['Schlieffen Plan Fails', 'Race to Channel', 'Zero Open Flank'],
        focusClue:
          'Why did the exhaustion of mobile warfare force both armies to dig deep subterranean trenches from Switzerland to the sea?',
      },
      {
        step: 2,
        date: '1915–1916',
        questionHeading:
          'Why did machine guns and barbed wire give defense an insurmountable advantage?',
        bullets: ['Maxim Gun (500 rpm)', 'Dense Razor Wire', 'Cratered Wasteland'],
        focusClue:
          'Why was it virtually suicidal for attacking infantry to advance across open mud against interlocking machine-gun arcs?',
      },
      {
        step: 3,
        date: '1915–1916',
        questionHeading:
          'How was the three-line trench network engineered to withstand bombardment?',
        bullets: ['Zigzag Traverses', 'Dugouts (30ft Down)', 'Communication Lines'],
        focusClue:
          'How did firebays, traverses, concrete pillboxes, and communication trenches protect defenders from high-explosive artillery?',
      },
      {
        step: 4,
        date: '1 July 1916',
        questionHeading:
          'Why did the 1.5 million shell bombardment fail on the First Day of the Somme?',
        bullets: ['Shrapnel vs Bunkers', 'Uncut Barbed Wire', '57,470 Day 1 Losses'],
        focusClue:
          'Why did British artillery fail to cut German wire or destroy deep dugouts, condemning the Pals Battalions to slaughter?',
      },
      {
        step: 5,
        date: '1916–1918',
        questionHeading: 'Did Sir Douglas Haig undergo a modernizing "tactical learning curve"?',
        bullets: ['Creeping Barrages', 'All-Arms Warfare', 'Breaching Hindenburg'],
        focusClue:
          'Did Haig learn from early bloodbaths to pioneer combined-arms warfare integrating tanks, aircraft, and creeping barrages by 1918?',
      },
    ],
    vocabPrompt:
      'Define <strong>War of Attrition</strong> and explain why General Haig argued that wearing down the German army was the only path to victory:',
    rightPage: {
      type: 'interpretations',
      tariff: 'Question 2: Historical Interpretations Debate [12 marks &bull; 15 mins]',
      question:
        '“General Sir Douglas Haig was an incompetent butcher whose callous tactics caused needless slaughter at the Somme.” How far do you agree with this view? [12 marks]',
      interpretation1: {
        title: 'Interpretation 1: Alan Clark, The Donkeys (1961)',
        author: 'Alan Clark (British Military Historian & Politician)',
        text: '“British soldiers were lions led by donkeys. Haig was an unimaginative cavalryman living in distant luxury in French châteaux, completely out of touch with frontline slaughter. His stubborn refusal to adapt condemned 57,470 men to death or injury on 1 July 1916 alone.”',
      },
      interpretation2: {
        title: 'Interpretation 2: Prof. Gary Sheffield, Forgotten Victory (2001)',
        author: 'Prof. Gary Sheffield (Modern Military Historian)',
        text: "“Haig was neither a butcher nor a bungler. He was trapped in an unprecedented industrial war where defense dominated attack. The British Army underwent a massive 'Learning Curve'. By 1918, Haig had mastered combined-arms warfare—using tanks, creeping barrages, and aircraft to smash Germany.”",
      },
      structureStrip: [
        {
          col: '1. INTERPRETATION 1 (CLARK)',
          text: 'Explain the "Donkey" critique: detached châteaux generals, cavalry obsession, rigid tactics, and catastrophic Somme losses.',
        },
        {
          col: '2. INTERPRETATION 2 (SHEFFIELD)',
          text: 'Explain the "Learning Curve" defence: lack of frontline radio, relieving French Verdun, and mastering 1918 all-arms warfare.',
        },
        {
          col: '3. SUSTAINED HISTORICAL VERDICT',
          text: 'Weigh both interpretations: was Haig an inflexible butcher or a modernizing general fighting an unavoidable war of attrition?',
        },
      ],
      connectives:
        'Interpretation 1 presents a persuasive critique by highlighting... &bull; In particular, the catastrophic loss of 57,470 men on 1 July 1916 proves... &bull; In sharp contrast, Interpretation 2 argues that Haig was trapped by... &bull; Furthermore, Haig’s command of the 1918 Hundred Days Offensive demonstrates... &bull; On balance, I conclude that...',
      wordBank:
        'War of Attrition &bull; Creeping Barrage &bull; Maxim machine gun &bull; First Day of the Somme &bull; Lions Led by Donkeys &bull; Tactical Learning Curve &bull; All-Arms Warfare',
      timelineMissionTitle: 'Centrefold Sketch Challenge 2',
      timelineMission:
        '<strong>Milestones 4 &amp; 7 (The Somme &bull; 1916 &amp; All-Arms &bull; 1918):</strong> Turn to Centrefold (Pages 8–9). In Milestone 4, sketch uncut German barbed wire and Maxim guns; in Milestone 7, sketch a Mark V tank breaking the Hindenburg Line with creeping artillery [💥 artillery shell &bull; ⚙️ Mark V tank &bull; 🛡️ Hindenburg trench].',
    },
    leftPageQuip:
      'On 1 July 1916, the British Army suffered 57,470 casualties—the bloodiest single day in British military history.',
    rightPageQuip:
      'By autumn 1918, Haig’s forces captured 188,700 German prisoners and 2,840 artillery guns in the Hundred Days Offensive.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3_empire_troops',
    title: 'Enquiry 3: Global Empire & The Forgotten Fronts (1914–1918)',
    enquiryQuestion:
      'Why were the military contributions of 4 million colonial troops marginalized in British memory?',
    specAnchor:
      'Mobilisation of 1.5 million Indian troops; Sepoy Khudadad Khan at Hollebeke (first South Asian VC); British West Indies Regiment (BWIR) artillery logistics & Taranto revolt (1918); 140,000 Chinese Labour Corps (CLC); over 1 million African Carrier Corps; postwar racial segregation & white "Tommy" national myth.',
    stages: [
      {
        step: 1,
        date: 'Oct–Nov 1914',
        questionHeading:
          'How did 1.5 million Indian troops save the British frontline at First Ypres?',
        bullets: ['BEF Annihilation Threat', 'Indian Corps Deployed', 'Khudadad Khan VC'],
        focusClue:
          'Why was the rapid arrival of the Indian Expeditionary Force in autumn 1914 vital to stopping the German breakthrough to Channel ports?',
      },
      {
        step: 2,
        date: '1915–1918',
        questionHeading:
          'How did the British West Indies Regiment sustain artillery logistics under fire?',
        bullets: ['16,000 Caribbean Men', 'Hauling Heavy Shells', 'Barred from Combat'],
        focusClue:
          'Why were Caribbean volunteers restricted to dangerous non-combat ammunition loading, and why did they mutiny at Taranto in 1918?',
      },
      {
        step: 3,
        date: '1916–1918',
        questionHeading:
          'Why were 140,000 Chinese labourers vital to Western Front infrastructure?',
        bullets: ['Chinese Labour Corps', 'Railroads & Ordnance', '20,000 Died in France'],
        focusClue:
          'How did Chinese workers build railroads, unload ammunition ships, and clear unexploded poison gas shells under constant artillery fire?',
      },
      {
        step: 4,
        date: '1914–1918',
        questionHeading:
          'How did over 1 million African porters sustain the brutal East Africa campaign?',
        bullets: ['Carrier Corps Mobilised', 'Horrific Disease & Mud', 'Over 100,000 Dead'],
        focusClue:
          'Why was mechanical transport impossible in East Africa, and why did over 100,000 African carriers die without individual graves?',
      },
      {
        step: 5,
        date: '1919–1923',
        questionHeading:
          'Why did postwar imperial commemoration erase non-white colonial sacrifice?',
        bullets: ['White "Tommy" Myth', 'Unmarked Graves Policy', 'Denied Equal Pensions'],
        focusClue:
          'How did postwar imperial politics and the Imperial War Graves Commission systematically prioritize white dead over colonial soldiers?',
      },
    ],
    vocabPrompt:
      'Define <strong>Imperial Mobilisation</strong> and explain why the Western Front could not have survived without colonial manpower:',
    rightPage: {
      type: 'single_essay',
      tariff: 'Question 3: Disciplinary Extended Writing & Significance [8 marks &bull; 10 mins]',
      question:
        'Explain the historical significance of the British Empire’s colonial soldiers and labourers during the First World War. [8 marks]',
      structureStrip: [
        {
          col: '1. VITAL LOGISTICAL & BATTLEFIELD AID',
          text: 'Explain how 1.5 million Indian troops stabilized Ypres in 1914, while BWIR handled artillery shells and 140,000 Chinese labourers maintained supply lines.',
        },
        {
          col: '2. RACIAL DISCRIMINATION & CENSORSHIP',
          text: 'Explain the racial hierarchy: barring non-white troops from combat in Europe, censoring sepoy letters, and isolating wounded Indians behind gates.',
        },
        {
          col: '3. POSTWAR ERASURE & HISTORIOGRAPHY',
          text: 'Formulate your conclusion: why did postwar commemoration erase non-white troops to create a white national myth of the "Tommy", and why rewrite it?',
        },
      ],
      connectives:
        'The decisive contribution of the British Empire is proven by... &bull; Without the Indian Army at Ypres in 1914... &bull; In direct contrast to this vital sacrifice, colonial troops experienced... &bull; Consequently, postwar commemoration systematically erased... &bull; In conclusion, this marginalisation occurred because...',
      wordBank:
        'Sepoy Khudadad Khan &bull; British West Indies Regiment (BWIR) &bull; Chinese Labour Corps (CLC) &bull; Carrier Corps &bull; Taranto Mutiny &bull; Imperial War Graves Commission &bull; David Olusoga',
      timelineMissionTitle: 'Centrefold Sketch Challenge 3',
      timelineMission:
        '<strong>Milestone 2 (First Ypres &amp; The Indian Corps &bull; October 1914):</strong> Turn to Centrefold (Pages 8–9). In Milestone 2, sketch Sepoy Khudadad Khan firing his machine gun at Hollebeke or Indian sepoys arriving in Marseille [🎖️ Victoria Cross &bull; 👳 Sepoy turban &bull; 🚢 troopship at Marseille].',
    },
    leftPageQuip:
      'Sepoy Khudadad Khan was the first native South Asian soldier to be awarded the Victoria Cross, Britain’s highest military honour.',
    rightPageQuip:
      'Over 140,000 Chinese men served in the Chinese Labour Corps; thousands remained in France after 1918 to clear battlefields and dig war graves.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4_home_front',
    title: 'Enquiry 4: The Home Front & Women’s Total War (1914–1918)',
    enquiryQuestion:
      'How far did the First World War transform the British state and daily life on the Home Front?',
    specAnchor:
      'Defence of the Realm Act (DORA, 1914); press censorship, curfews & alcohol dilution; 1915 Shell Scandal & Lloyd George’s Ministry of Munitions; 1916 Military Service Act (conscription & conscientious objectors); 1 million "Canary Girls" in munitions; German U-boat blockade & 1918 food rationing; 1918 Representation of the People Act.',
    stages: [
      {
        step: 1,
        date: 'Aug 1914',
        questionHeading:
          'How did the Defence of the Realm Act (DORA) suspend peacetime civil liberties?',
        bullets: ['Arrest Without Warrant', 'Total Press Censorship', 'Curfews & Diluted Beer'],
        focusClue:
          'How did DORA give the British government unprecedented authoritarian control over speech, industry, and daily habits?',
      },
      {
        step: 2,
        date: 'May 1915',
        questionHeading:
          'How did the Shell Scandal force Lloyd George to create the Ministry of Munitions?',
        bullets: ['Artillery Shell Crisis', 'State Directs Factories', 'Total War Economy'],
        focusClue:
          'Why did a catastrophic shortage of high-explosive artillery shells force Britain to abandon laissez-faire capitalism for state direction?',
      },
      {
        step: 3,
        date: 'March 1916',
        questionHeading:
          'Why did the Military Service Act introduce conscription and persecute Objectors?',
        bullets: ['Universal Conscription', 'Military Tribunals', '16,000 Objectors Jailed'],
        focusClue:
          'Why did voluntary enlistment collapse after Somme casualties, and why were conscientious objectors subjected to brutal hard labour?',
      },
      {
        step: 4,
        date: '1915–1918',
        questionHeading:
          'How did 1 million women in munitions ("Canary Girls") transform industrial labour?',
        bullets: ['Toxic TNT Poisoning', 'High Wages (£5/Week)', 'Produced 76% Shells'],
        focusClue:
          'How did toxic TNT chemical poisoning and catastrophic factory explosions coexist with newfound female financial freedom?',
      },
      {
        step: 5,
        date: '1918',
        questionHeading:
          'How did German U-boats force food rationing and spur the 1918 Representation Act?',
        bullets: ['Compulsory Rationing', 'Women Over 30 Vote', 'All Working Men Vote'],
        focusClue:
          'Did Parliament enfranchise women in 1918 because of heroic war work, or because politicians feared a militant Suffragette revival?',
      },
    ],
    vocabPrompt:
      'Define <strong>Total War</strong> and explain how the British home front became as crucial to military victory as the battlefront:',
    rightPage: {
      type: 'single_essay',
      tariff:
        'Question 4: Extended Disciplinary Writing & Change vs Continuity [12 marks &bull; 15 mins]',
      question:
        '“The First World War permanently revolutionized the British state and liberated women.” How far do you agree with this statement? [12 marks]',
      structureStrip: [
        {
          col: '1. EXPANSION OF STATE POWER (DORA)',
          text: 'Explain how DORA, compulsory conscription (1916), press censorship, and food rationing (1918) permanently expanded state intervention.',
        },
        {
          col: '2. WOMEN’S MOBILISATION & SUFFRAGE',
          text: 'Explain female industrial agency: 1 million Canary Girls, financial independence, trade union membership, and the 1918 enfranchisement.',
        },
        {
          col: '3. SUSTAINED HISTORICAL VERDICT',
          text: 'Weigh whether change was permanent or temporary: were women pushed back into domestic service in 1919, or was British society forever transformed?',
        },
      ],
      connectives:
        'A compelling argument for revolutionary transformation is... &bull; In particular, state control reached unprecedented levels under DORA, which... &bull; Concurrently, women experienced profound economic emancipation when... &bull; However, this liberation was qualified by the fact that in 1919... &bull; In conclusion, the war transformed Britain by...',
      wordBank:
        'Total War &bull; Defence of the Realm Act (DORA) &bull; Canary Girls &bull; TNT poisoning &bull; Conscription (1916) &bull; Conscientious Objectors &bull; 1918 Representation of the People Act',
      timelineMissionTitle: 'Centrefold Sketch Challenge 4',
      timelineMission:
        '<strong>Milestones 3 &amp; 5 (Munitions &bull; 1915 &amp; Conscription &bull; 1916):</strong> Turn to Centrefold (Pages 8–9). In Milestone 3, sketch a female Canary Girl handling artillery shells; in Milestone 5, sketch a conscientious objector facing a tribunal [🧪 TNT munition shell &bull; 👩‍🔧 female factory worker &bull; ⚖️ military tribunal].',
    },
    leftPageQuip:
      'Female munitions workers were nicknamed "Canary Girls" because handling toxic TNT turned their skin and hair bright yellow.',
    rightPageQuip:
      'The 1918 Representation of the People Act gave the vote to women over 30 who owned property—and to all men over 21 regardless of property.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5_versailles',
    title: 'Enquiry 5: The Treaty of Versailles & The Flawed Peace (1919)',
    enquiryQuestion:
      'Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?',
    specAnchor:
      'The Paris Peace Conference & Big Three (Clemenceau, Lloyd George, Wilson); irreconcilable Allied war aims; German condemnation of the "Diktat"; GARGLE terms (Guilt, Armed forces, Reparations, German territory, League of Nations, Extra); Article 231 War Guilt Clause; £6.6 billion reparations; John Maynard Keynes & Will Dyson’s "1940 Class" warning.',
    stages: [
      {
        step: 1,
        date: 'Jan 1919',
        questionHeading:
          'Why did the Allied "Big Three" arrive at Paris with irreconcilable war aims?',
        bullets: ['Clemenceau Revenge', 'Wilson’s 14 Points', 'Lloyd George Moderation'],
        focusClue:
          'Why did French desire for military revenge clash fatally with Wilson’s idealistic League of Nations and British commercial interests?',
      },
      {
        step: 2,
        date: 'June 1919',
        questionHeading: 'Why did Germans condemn the Treaty of Versailles as an unjust Diktat?',
        bullets: ['Excluded from Talks', 'Naval Blockade Starvation', 'Forced Signing'],
        focusClue:
          'Why did the Allied refusal to allow German representatives into negotiations convince Germans that the peace was an illegitimate diktat?',
      },
      {
        step: 3,
        date: '28 June 1919',
        questionHeading:
          'How did Article 231 force Germany to accept sole moral blame for the war?',
        bullets: ['War Guilt Clause', 'Justified £6.6B Debts', 'National Humiliation'],
        focusClue:
          'How did forcing the new Weimar Republic to sign Article 231 create an enduring national trauma that right-wing nationalists exploited?',
      },
      {
        step: 4,
        date: '1919–1921',
        questionHeading: 'What territorial and military amputations were imposed under GARGLE?',
        bullets: ['13% Land & Colonies Lost', '100,000 Army Limit', 'Demilitarized Rhineland'],
        focusClue:
          'How did the loss of Alsace-Lorraine, the Polish Corridor, overseas colonies, and all heavy artillery cripple German sovereignty?',
      },
      {
        step: 5,
        date: '1919–1939',
        questionHeading: 'Was Versailles an unjust Carthaginian peace or an unenforced compromise?',
        bullets: ['Keynes Predicts Ruin', 'Will Dyson "1940 Class"', 'Allied Non-Enforcement'],
        focusClue:
          'Did the treaty cause WWII by being too harsh, or did it fail because Britain and France lacked the political resolve to enforce it?',
      },
    ],
    vocabPrompt:
      'Define <strong>Article 231 (War Guilt)</strong> and explain why it provoked such lasting political outrage across Germany:',
    rightPage: {
      type: 'single_essay',
      tariff: 'Question 5: Evaluative Statement & Causal Consequences [12 marks &bull; 15 mins]',
      question:
        '“The Treaty of Versailles was a fatally flawed settlement that made the outbreak of a second world war inevitable.” How far do you agree? [12 marks]',
      structureStrip: [
        {
          col: '1. ALLIED GRIEVANCES & FRENCH SECURITY',
          text: 'Explain Allied justifications: French devastation (1.4 million dead, ruined north), Belgian invasion, and the harsh German Brest-Litovsk precedent.',
        },
        {
          col: '2. GERMAN OUTRAGE AT THE "DIKTAT"',
          text: 'Explain German grievances: £6.6 billion reparations, 100,000 army limit, Polish Corridor, and the humiliation of Article 231 War Guilt.',
        },
        {
          col: '3. SUSTAINED HISTORICAL VERDICT',
          text: 'Evaluate: did Versailles cause WWII (Keynes / Dyson), or did peace fail because the Allies refused to enforce the treaty against Hitler in the 1930s (MacMillan)?',
        },
      ],
      connectives:
        'Allied statesmen justified harsh terms on the grounds that... &bull; Most controversially, Article 231 forced Germany to accept... &bull; Conversely, economic critics like Keynes warned that... &bull; Furthermore, cartoonist Will Dyson presciently depicted... &bull; Ultimately, I conclude that Versailles was...',
      wordBank:
        'Big Three &bull; Georges Clemenceau &bull; Woodrow Wilson &bull; David Lloyd George &bull; Diktat &bull; Article 231 (War Guilt) &bull; £6.6 billion reparations &bull; League of Nations &bull; Margaret MacMillan',
      timelineMissionTitle: 'Centrefold Sketch Challenge 5',
      timelineMission:
        '<strong>Milestones 7 &amp; 8 (Armistice &bull; 1918 &amp; Versailles &bull; 1919):</strong> Turn to Centrefold (Pages 8–9). In Milestone 7, sketch the Compiègne railway carriage where the 11 November Armistice was signed; in Milestone 8, sketch the Hall of Mirrors at Versailles [🕊️ peace dove &bull; 📜 Versailles treaty document &bull; 🏛️ Hall of Mirrors].',
    },
    leftPageQuip:
      'The cartoonist Will Dyson drew Clemenceau leaving Versailles saying: "Curious! I seem to hear a child weeping!"—the child was labelled "1940 Class".',
    rightPageQuip:
      'Economist John Maynard Keynes resigned from the British delegation in protest, warning that reparations would plunge Europe into economic catastrophe.',
  },
  {
    lessonNum: 6,
    id: 'lesson_6_middle_east_palestine',
    title: 'Enquiry 6: A Line in the Sand: Ottoman Collapse & Palestine (1915–1923)',
    enquiryQuestion:
      'How did the Great War dismantle the Ottoman Empire and create modern Middle Eastern conflict?',
    specAnchor:
      'Ottoman entry into WWI; threat to Suez Canal & Persian Gulf oil; McMahon-Hussein Correspondence (1915–16) promising Arab independence; secret Anglo-French Sykes-Picot Agreement (1916); Balfour Declaration (1917) supporting Jewish national home; League of Nations Class A Mandates; local mourning & Stubbington War Memorial (1922).',
    stages: [
      {
        step: 1,
        date: '1914–1915',
        questionHeading: 'Why did Ottoman entry threaten Britain’s imperial lifeline to India?',
        bullets: ['Suez Canal Threatened', 'Gallipoli Disaster (1915)', 'Persian Oil Fields'],
        focusClue:
          'How did Ottoman control of the Dardanelles and proximity to the Suez Canal threaten Britain’s vital maritime link to India?',
      },
      {
        step: 2,
        date: '1915–1916',
        questionHeading:
          'How did the McMahon-Hussein Correspondence promise an independent Arab kingdom?',
        bullets: ['Sharif Hussein of Mecca', 'Pledged Arab State', 'Great Arab Revolt'],
        focusClue:
          'Why did British High Commissioner McMahon promise Arabs independence across the Levant in exchange for revolting against the Turks?',
      },
      {
        step: 3,
        date: 'May 1916',
        questionHeading: 'Why did Britain and France sign the secret Sykes-Picot Agreement?',
        bullets: ['Secret Imperial Treaty', 'French Syria & UK Iraq', 'Brown Palestine Zone'],
        focusClue:
          'How did diplomats Mark Sykes and François Georges-Picot secretly carve up the Middle East into British and French colonial zones?',
      },
      {
        step: 4,
        date: 'Nov 1917',
        questionHeading:
          'Why did Foreign Secretary Arthur Balfour issue the Balfour Declaration for Palestine?',
        bullets: ['Jewish National Home', 'Zionist Diplomatic Aid', 'Ignored 90% Arab Majority'],
        focusClue:
          'Why did Britain promise Lord Rothschild support for a Jewish national home in Palestine without consulting the indigenous Arab population?',
      },
      {
        step: 5,
        date: '1920–1923',
        questionHeading:
          'How did the League of Nations Mandates formalize British and French imperial rule?',
        bullets: [
          'Class A Mandates Imposed',
          'Arab Betrayal & Revolts',
          'Roots of Modern Conflict',
        ],
        focusClue:
          'How did the Mandate system disguise traditional British and French colonial rule as temporary "international tutelage"?',
      },
    ],
    vocabPrompt:
      'Define <strong>The Mandate System</strong> and explain how it disguised ongoing Anglo-French colonial control as international tutelage:',
    rightPage: {
      type: 'source_utility',
      tariff:
        'Question 6: Dual-Source Utility & Conflicting Imperial Pledges [8 marks &bull; 10 mins]',
      question:
        'Study Sources A and B. How useful are Sources A and B for an enquiry into British wartime promises regarding the future of the Middle East? [8 marks]',
      sourceA: {
        title: 'Source A: The Secret Sykes-Picot Agreement (May 1916)',
        shelfmark: 'THE NATIONAL ARCHIVES • LONDON • CAB 42/14/12',
        text: '“That France and Great Britain are prepared to recognize and protect an independent Arab State... under the suzerainty of an Arab chief. That in area (A) France, and in area (B) Great Britain, shall have priority of right of pre-emption and of loans... and shall alone supply advisers... That in the brown area [Palestine] there shall be established an international administration.”',
        clue: 'Secret imperial treaty signed by Sir Mark Sykes and François Georges-Picot carving Ottoman Arab lands into British and French zones.',
      },
      sourceB: {
        title: 'Source B: The Balfour Declaration (2 November 1917)',
        shelfmark: 'THE BRITISH LIBRARY • LONDON • ADD MS 41178',
        text: '“Dear Lord Rothschild, I have much pleasure in conveying to you, on behalf of His Majesty’s Government, the following declaration of sympathy with Jewish Zionist aspirations... His Majesty’s Government view with favour the establishment in Palestine of a national home for the Jewish people, and will use their best endeavours to facilitate the achievement of this object...”',
        clue: 'Official public diplomatic letter from British Foreign Secretary Arthur Balfour to leading British Zionist peer Lord Walter Rothschild.',
      },
      matrix: [
        {
          col: '1. CONTENT & INFERENCE',
          text: 'Analyse what each source reveals about conflicting British pledges (secret imperial partition vs public support for a Jewish national home).',
        },
        {
          col: '2. PROVENANCE & MOTIVE',
          text: 'Evaluate how origin and purpose (secret treaty with France vs public diplomatic declaration to Zionists) affects historical reliability.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Reach a reasoned conclusion: which source is more useful for understanding why British wartime diplomacy created enduring Middle Eastern conflict?',
        },
      ],
      connectives:
        'Source A is valuable for revealing how Britain secretly plotted to... &bull; In contrast, Source B demonstrates a public commitment to... &bull; However, Source B notoriously referred to the 90% Arab population merely as... &bull; When cross-referenced with the McMahon-Hussein letters... &bull; On balance, both sources together expose the contradictory diplomacy that...',
      wordBank:
        'McMahon-Hussein Correspondence &bull; Sykes-Picot Agreement &bull; Balfour Declaration &bull; Sharif Hussein &bull; Lord Walter Rothschild &bull; Class A Mandates &bull; Imperial Partition',
      timelineMissionTitle: 'Centrefold Sketch Challenge 6',
      timelineMission:
        '<strong>Milestones 6 &amp; 8 (Balfour &bull; 1917 &amp; Local Mourning &bull; 1922):</strong> Turn to Centrefold (Pages 8–9). In Milestone 6, sketch the secret Sykes-Picot map line dividing the Levant; in Milestone 8, sketch the wooden Stubbington War Memorial shelter [🗺️ partitioned map &bull; ✉️ Balfour letter &bull; 🏛️ wooden memorial shelter].',
    },
    leftPageQuip:
      'The straight lines drawn across the desert by Mark Sykes and François Georges-Picot in 1916 created the modern borders of Iraq, Syria, Jordan, and Lebanon.',
    rightPageQuip:
      'In Stubbington, Hampshire, the unique wooden war memorial built over the village pump commemorates 67 local fallen, including VAD nurse Nita Madeline King.',
  },
];

// ============================================================================
// HELPER RENDERERS
// ============================================================================
function renderFooterStrip(pageNum, quip, totalPages = 16) {
  const isEven = pageNum % 2 === 0;
  if (isEven) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${pageNum}/${totalPages}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${quip}</span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${quip}</span>
        <span class="footer-page-num">${pageNum}/${totalPages}</span>
      </div>`;
  }
}

// ============================================================================
// LEFT PAGE RENDERER: 5-STAGE CHRONOLOGICAL INQUIRY SPINE (Zero "Do Now" Tasks)
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
                ${st.step}
              </span>
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
            YEAR 9 &bull; THE GREAT WAR (1914–1919)
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.8pt; color: #0f284e; margin: 1px 0 1px 0; font-weight: 900; line-height: 1.18;">
          ${cfg.enquiryQuestion}
        </h2>
      </div>

      <!-- Specification Focus Strip -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; padding: 2px 6px; background: #f0f4f9; margin-bottom: 2px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2; color: #1e293b;">
        <strong style="color: #0f284e;">Core Specification Focus:</strong> ${cfg.specAnchor}
      </div>

      <!-- Chronological Inquiry Spine & Note-Taking Canvas -->
      <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; margin-top: 1px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f284e; padding: 1px 0; margin-bottom: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
            Chronological Inquiry Spine &bull; Core Causal Narrative
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #475569;">
            Construct your causal explanation for each stage incorporating the core trigger terms
          </span>
        </div>

        <div style="display: flex; flex-direction: column; flex: 1; min-height: 0; gap: 0;">
          ${stagesHtml}
        </div>
      </div>

      <!-- Disciplinary Vocabulary Practice Strip at Bottom of Left Page -->
      <div style="border: 1.2px solid #0f284e; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-top: 2px; margin-bottom: 1px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            Disciplinary Vocabulary &bull; Historical Mastery
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #64748b; text-transform: uppercase;">
            Key Concept Application
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #1e293b; line-height: 1.2; margin-bottom: 2px;">
          ${cfg.vocabPrompt}
        </div>
        <div style="border-bottom: 1.2px solid #000000; height: 6.5mm; width: 100%;"></div>
        <div style="border-bottom: 1.2px solid #000000; height: 6.5mm; width: 100%;"></div>
      </div>

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: EXTENDED DISCIPLINARY WRITING & ASSESSMENT
// ============================================================================
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

  if (rp.type === 'source_utility') {
    // DUAL-SOURCE UTILITY (ENQUIRY 1 & ENQUIRY 6)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • DUAL-SOURCE UTILITY -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          Source Analysis
        </span>
      </div>

      <!-- Question Stem -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #f0f4f9; margin-bottom: 3px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
          ${rp.question}
        </div>
      </div>

      <!-- Dual Primary Sources Box Side-by-Side -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 3px;">
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 5px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #0f284e; padding-bottom: 1px; margin-bottom: 1.5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e;">
              Source A &bull; Primary Record
            </strong>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.5pt; line-height: 1.2; color: #1e293b; font-style: italic; margin-bottom: 1.5px;">
            ${rp.sourceA.text}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #475569; border-top: 0.8px dashed #cbd5e1; padding-top: 1px;">
            <strong>Provenance:</strong> ${rp.sourceA.clue}
          </div>
        </div>

        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 5px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #0f284e; padding-bottom: 1px; margin-bottom: 1.5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e;">
              Source B &bull; Primary Record
            </strong>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.5pt; line-height: 1.2; color: #1e293b; font-style: italic; margin-bottom: 1.5px;">
            ${rp.sourceB.text}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #475569; border-top: 0.8px dashed #cbd5e1; padding-top: 1px;">
            <strong>Provenance:</strong> ${rp.sourceB.clue}
          </div>
        </div>
      </div>

      <!-- 3-Column Disciplinary Structure Strip -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          ${rp.matrix
            .map(
              (m) => `
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; color: #0f284e; display: block; border-bottom: 0.8px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 1px;">
                ${m.col}
              </strong>
              <span style="font-family: 'Georgia', serif; font-size: 6.2pt; line-height: 1.18; color: #1e293b; display: block;">
                ${m.text}
              </span>
            </div>`,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #f0f4f9; margin-bottom: 3px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; display: block; color: #0f284e;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-style: italic; line-height: 1.18; display: block; color: #1e293b;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; display: block; color: #0f284e;">Word Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.18; display: block; color: #1e293b;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Writing Lines (Flex Filled) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; border-top: 1.2px solid #0f284e; margin-bottom: 3px;">
        ${Array(16).fill('<div class="task-line"></div>').join('\n        ')}
      </div>

      <!-- Centrefold Sketch Challenge Mission Box -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 2.5px 6px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e;">
            🎨 ${rp.timelineMissionTitle} &bull; Living Timeline Dual-Coding
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; color: #475569; text-transform: uppercase;">
            Turn to Centrefold (Pages 8–9)
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #1e293b; line-height: 1.2; margin-top: 1px;">
          ${rp.timelineMission}
        </div>
      </div>

      <!-- Teacher Feedback Strip -->
      <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; color: #0f284e;">
          Teacher Check &bull; Disciplinary Level:
        </span>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569;">
          <span>[ ] Emerging (1–3)</span>
          <span>[ ] Developing (4–5)</span>
          <span>[ ] Secure (6–7)</span>
          <span>[ ] Greater Depth (8–9)</span>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  }

  if (rp.type === 'interpretations') {
    // HISTORICAL INTERPRETATIONS (ENQUIRY 2)
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • HISTORICAL INTERPRETATIONS -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          Interpretations Debate
        </span>
      </div>

      <!-- Question Stem -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #f0f4f9; margin-bottom: 3px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
          ${rp.question}
        </div>
      </div>

      <!-- Dual Interpretations Side-by-Side -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 3px;">
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 5px; background: #f8fafc;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e; margin-bottom: 1.5px;">
            ${rp.interpretation1.title}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.5pt; line-height: 1.2; color: #1e293b; font-style: italic;">
            ${rp.interpretation1.text}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #64748b; margin-top: 1.5px;">
            &mdash; ${rp.interpretation1.author}
          </div>
        </div>

        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 5px; background: #f8fafc;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e; margin-bottom: 1.5px;">
            ${rp.interpretation2.title}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.5pt; line-height: 1.2; color: #1e293b; font-style: italic;">
            ${rp.interpretation2.text}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 700; color: #64748b; margin-top: 1.5px;">
            &mdash; ${rp.interpretation2.author}
          </div>
        </div>
      </div>

      <!-- 3-Column Disciplinary Structure Strip -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          ${rp.structureStrip
            .map(
              (s) => `
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; color: #0f284e; display: block; border-bottom: 0.8px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 1px;">
                ${s.col}
              </strong>
              <span style="font-family: 'Georgia', serif; font-size: 6.2pt; line-height: 1.18; color: #1e293b; display: block;">
                ${s.text}
              </span>
            </div>`,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #f0f4f9; margin-bottom: 3px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; display: block; color: #0f284e;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-style: italic; line-height: 1.18; display: block; color: #1e293b;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; display: block; color: #0f284e;">Word Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.18; display: block; color: #1e293b;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Writing Lines (Flex Filled) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; border-top: 1.2px solid #0f284e; margin-bottom: 3px;">
        ${Array(17).fill('<div class="task-line"></div>').join('\n        ')}
      </div>

      <!-- Centrefold Sketch Challenge Mission Box -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 2.5px 6px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e;">
            🎨 ${rp.timelineMissionTitle} &bull; Living Timeline Dual-Coding
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; color: #475569; text-transform: uppercase;">
            Turn to Centrefold (Pages 8–9)
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #1e293b; line-height: 1.2; margin-top: 1px;">
          ${rp.timelineMission}
        </div>
      </div>

      <!-- Teacher Feedback Strip -->
      <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; color: #0f284e;">
          Teacher Check &bull; Disciplinary Level:
        </span>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569;">
          <span>[ ] Emerging (1–3)</span>
          <span>[ ] Developing (4–5)</span>
          <span>[ ] Secure (6–7)</span>
          <span>[ ] Greater Depth (8–9)</span>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
  }

  // SINGLE EXTENDED ESSAY (ENQUIRIES 3, 4, 5)
  return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • EXTENDED DISCIPLINARY WRITING -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          Extended Disciplinary Writing
        </span>
      </div>

      <!-- Question Stem Box -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #f0f4f9; margin-bottom: 3px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
          ${rp.question}
        </div>
      </div>

      <!-- 3-Column Disciplinary Structure Strip -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 3px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          ${rp.structureStrip
            .map(
              (s) => `
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; color: #0f284e; display: block; border-bottom: 0.8px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 1px;">
                ${s.col}
              </strong>
              <span style="font-family: 'Georgia', serif; font-size: 6.2pt; line-height: 1.18; color: #1e293b; display: block;">
                ${s.text}
              </span>
            </div>`,
            )
            .join('')}
        </div>
      </div>

      <!-- Connectives & Key Vocabulary Bank -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #f0f4f9; margin-bottom: 3px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; display: block; color: #0f284e;">Analytical Connectives:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-style: italic; line-height: 1.18; display: block; color: #1e293b;">${rp.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; text-transform: uppercase; display: block; color: #0f284e;">Word Bank:</strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.18; display: block; color: #1e293b;">${rp.wordBank}</span>
        </div>
      </div>

      <!-- Ruled Writing Lines (Flex Filled) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0; border-top: 1.2px solid #0f284e; margin-bottom: 3px;">
        ${Array(20).fill('<div class="task-line"></div>').join('\n        ')}
      </div>

      <!-- Centrefold Sketch Challenge Mission Box -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 2.5px 6px; margin-bottom: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e;">
            🎨 ${rp.timelineMissionTitle} &bull; Living Timeline Dual-Coding
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; color: #475569; text-transform: uppercase;">
            Turn to Centrefold (Pages 8–9)
          </span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #1e293b; line-height: 1.2; margin-top: 1px;">
          ${rp.timelineMission}
        </div>
      </div>

      <!-- Teacher Feedback Strip -->
      <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; color: #0f284e;">
          Teacher Check &bull; Disciplinary Level:
        </span>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569;">
          <span>[ ] Emerging (1–3)</span>
          <span>[ ] Developing (4–5)</span>
          <span>[ ] Secure (6–7)</span>
          <span>[ ] Greater Depth (8–9)</span>
        </div>
      </div>

      ${renderFooterStrip(pageNum, cfg.rightPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// MAIN COMPILATION FUNCTION
// ============================================================================
function compileGreatWarPart2Workbook() {
  const coverImgBase64 =
    getBase64Image('/images/bg_great_war_part2.jpg') ||
    getBase64Image('/images/great_war_cover.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Great War (1914–1919) &bull; Pupil Workbook</title>
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
      background: #eaedf2;
      color: #000000;
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      line-height: 1.35;
    }
    .page, .page-container {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 4mm 6mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
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
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER (GCSE High-Contrast Standard)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          KEY STAGE 3 HISTORICAL STUDIES &bull; YEAR 9
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
      </div>

      <!-- Main Title Block -->
      <div style="text-align: center; margin: 2px 0 6px 0;">
        <div style="display: inline-block; border: 1.5px solid #0f284e; color: #ffffff; background: #0f284e; font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; padding: 2px 10px; border-radius: 3px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
          Year 9 Master Curriculum &bull; 1914–1919
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 21pt; line-height: 1.15; color: #0f284e; margin: 2px 0 3px 0; font-weight: 900;">
          The Great War: 1914–1919
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #334155; font-style: italic; font-weight: 600;">
          Industrial Slaughter, Global Sacrifice, Total War &amp; The Flawed Peace
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 70mm 1fr; background: #ffffff;">
          <!-- Left: Full Visual Canvas -->
          <div style="background: #fcfbf9; border-right: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 2px 3px;">
            <img src="${coverImgBase64}" alt="Great War Bookends: Sarajevo to Versailles" style="height: 103mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
          </div>
          <!-- Right: Visual Iconography & Historical Significance -->
          <div style="padding: 6px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e; letter-spacing: 0.5px;">
                Primary Visual Evidence &bull; Dual Bookends
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; color: #64748b;">
                Sarajevo (1914) to Versailles (1919)
              </span>
            </div>

            <!-- 2. Historical Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.5pt; line-height: 1.3; color: #1e293b; margin: 0;">
              The First World War transformed global civilisation in five violent years. The conflict began with an imperial assassination in the Balkans and concluded with a bitter diplomatic compromise in the Hall of Mirrors at Versailles:
            </p>

            <!-- 3. Four Core Analytical Features -->
            <div style="display: flex; flex-direction: column; gap: 3px;">
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">1. The Sarajevo Spark (June 1914):</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Gavrilo Princip’s fatal shot shattered peacetime Europe, igniting the Triple Entente and Triple Alliance into total war.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">2. Industrial Slaughter &amp; Attrition:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Machine guns, barbed wire, high-explosive artillery, and poison gas gave defensive forces an insurmountable advantage.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">3. Global Imperial Sacrifice:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Over 4 million colonial soldiers from India, the Caribbean, and Africa sustained the frontline under relentless fire.
                </div>
              </div>
              <div style="border-left: 2.5px solid #0f284e; padding-left: 6px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.1pt; text-transform: uppercase; color: #0f284e;">4. The Flawed Versailles Settlement:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 7pt; line-height: 1.22; color: #222222;">
                  Article 231 (War Guilt), reparations, and the secret Sykes-Picot carve-up of the Middle East sowed seeds of future global conflict.
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Analytical Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding-top: 3px; border-top: 1px solid #cbd5e1;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Total War</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">DORA, conscription &amp; 1 million Canary Girls.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Global Empire</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Sepoys at Ypres, BWIR shells &amp; CLC railways.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2.5px 5px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Flawed Peace</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.4pt; line-height: 1.15; color: #1e293b; margin-top: 1px;">Versailles Diktat, Sykes-Picot &amp; Mandates.</div>
              </div>
            </div>

            <!-- 5. Disciplinary Significance Anchor -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #1e293b; line-height: 1.25; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 2px 6px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Disciplinary Significance:</strong> The First World War was not merely a military stalemate of mud and trenches, but a global technological revolution that dismantled four historic empires and redrew the borders of Europe and the Middle East.
            </div>

            <!-- 6. Targeted Disciplinary Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Disciplinary Hinge Question:</span>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; color: #64748b; text-transform: uppercase;">Historical Evaluation</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 6.9pt; font-style: italic; color: #1e293b; line-height: 1.2; margin-top: 1px;">
                Did the Treaty of Versailles successfully resolve the underlying imperial rivalries of 1914, or did it guarantee that the conflict would reignite twenty years later?
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #ffffff; padding: 3px 8px; border-top: 1.5px solid #0f284e; background: #0f284e;">
          <span><strong>Primary Visual Evidence:</strong> <em>Sarajevo Assassination (1914) &amp; The Hall of Mirrors Peace Treaty (1919)</em></span>
          <span style="font-weight: 700; color: #93c5fd;">ARCHIVE RECORD &bull; IMPERIAL WAR MUSEUM / THE NATIONAL ARCHIVES</span>
        </div>
      </div>

      <!-- Disciplinary Strategy Overview & Workbook Blueprint -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 5px 8px; background: #f0f4f9; margin: 3px 0 6px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            1. Chronological Spines [Enquiries 1–6]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Structured chronological note-taking on each left page: 5 causal stages guiding pupil understanding as the teacher narrates the history.
          </div>
        </div>
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            2. Disciplinary Writing [8m &bull; 12m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Targeted extended writing on each right page: dual-source utility, interpretations debate, significance, and causation essays.
          </div>
        </div>
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            3. Centrefold Timeline [Pages 8–9]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Centrefold Living Timeline dual-coding sketchpads across the physical saddle stitch (pp. 8–9) with 8 milestone missions.
          </div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin: 3px 0 3px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #0f284e; background: #0f284e;">
              <th style="padding: 7px 10px; text-align: left; font-size: 8.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 7px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Learnt
              </th>
              <th style="padding: 7px 4px; width: 64px; text-align: center; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.2;">
                  Enquiry 1: The Rush to the Colours &amp; Voluntary Enlistment (1914)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Why were young British men so desperate to volunteer, and how did Pals Battalions and propaganda drive mass recruitment?
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
              <td style="padding: 7.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.2;">
                  Enquiry 2: Trench Warfare &amp; The Haig Command Controversy (1915–1916)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Did British generals make trench slaughter worse, or was Haig trapped in an unprecedented industrial learning curve?
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
              <td style="padding: 7.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.2;">
                  Enquiry 3: Global Empire &amp; The Forgotten Fronts (1914–1918)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Why were the military contributions of 4 million colonial soldiers and labourers marginalized in postwar British memory?
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
              <td style="padding: 7.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.2;">
                  Enquiry 4: The Home Front &amp; Women’s Total War (1914–1918)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  How did DORA, conscription, food rationing, and 1 million female munitions workers permanently expand state power?
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
              <td style="padding: 7.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.2;">
                  Enquiry 5: The Treaty of Versailles &amp; The Flawed Peace (1919)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Did the Treaty of Versailles solve the problems of 1914, or did Article 231 and reparations create the nightmares of 1939?
                </div>
              </td>
              <td style="text-align: center; vertical-align: middle; border-right: 1.2px solid #cbd5e1;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
              <td style="text-align: center; vertical-align: middle;">
                <div style="width: 14px; height: 14px; border: 1.5px solid #0f284e; border-radius: 2px; margin: 0 auto; background: #ffffff;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding: 7.5px 10px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.2;">
                  Enquiry 6: A Line in the Sand: Ottoman Collapse &amp; Palestine (1915–1923)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  How did contradictory British promises—Sykes-Picot vs Balfour Declaration—dismantle the Ottoman Empire and ignite modern conflict?
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

      ${renderFooterStrip(1, 'In 1914, Britain was the only major European combatant without peacetime conscription, relying entirely on voluntary enlistment.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (ENLISTMENT & PALS BATTALIONS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (TRENCH WARFARE & HAIG COMMAND CONTROVERSY)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (GLOBAL EMPIRE & FORGOTTEN FRONTS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[2], 6);
  html += renderRightPage(enquiryConfigs[2], 7);

  // ====================================================================
  // PAGES 8–9: LIVING TIMELINE (SADDLE STITCH CENTREFOLD)
  // ====================================================================
  html += `
  <!-- PAGE 8: LIVING TIMELINE PART 1 (MILESTONES 1–4: 1914–1916) -->
  <div class="page page-container verso-page" id="page-8" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 1: Enlistment, Empire Mobilisation &amp; The Somme (1914–1916)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: August 1914 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              August 1914 &bull; The Rush to the Colours &amp; Lord Kitchener’s Appeal
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Following the German invasion of neutral Belgium, Lord Kitchener issues his call for 500,000 volunteers; over 750,000 enlist in eight weeks as Hampshire dockers and clerks form the 14th and 15th "Pompey Pals" Battalions.
          </p>
        </div>

        <!-- Milestone 2: October 1914 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              October 1914 &bull; First Battle of Ypres &amp; Arrival of the Indian Corps
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            As the British Expeditionary Force faces annihilation in Flanders, 1.5 million Indian troops deploy to France; Sepoy Khudadad Khan wins the Victoria Cross at Hollebeke, plugging the Allied frontline at catastrophic cost.
          </p>
        </div>

        <!-- Milestone 3: May 1915 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              May 1915 &bull; The Shell Scandal &amp; Women’s Industrial Mobilisation
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Acute shortage of high-explosive artillery shells on the Western Front forces Lloyd George to establish the Ministry of Munitions; over 1 million women ("Canary Girls") enter factories to manufacture 76% of all British shells.
          </p>
        </div>

        <!-- Milestone 4: 1 July 1916 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1 July 1916 &bull; The First Day on the Somme &amp; Attrition Crisis
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Following an artillery bombardment of 1.5 million shells that fails to cut German wire, British infantry advance into interlocking machine-gun fire, suffering 57,470 casualties on day one and devastating civilian Pals Battalions.
          </p>
        </div>

      </div>

      ${renderFooterStrip(8, 'Centrefold timeline: Dual-coding sketches and dates turns narrative history into permanent long-term memory.', 16)}
    </div>
  </div>

  <!-- PAGE 9: LIVING TIMELINE PART 2 (MILESTONES 5–8: 1916–1922) -->
  <div class="page page-container recto-page" id="page-9" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 5px;">
          <h2 style="margin: 0; font-family: 'Inter', sans-serif; font-size: 11pt; color: #0f284e; text-transform: uppercase; font-weight: 900; letter-spacing: 0.5px;">
            Living Timeline &bull; Part 2: Conscription, The Middle East &amp; Versailles (1916–1922)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: March 1916 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              March 1916 &bull; The Military Service Act: Conscription &amp; DORA
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            As voluntary recruitment dries up after Somme losses, the government introduces compulsory military conscription for all men aged 18–41; 16,000 conscientious objectors face military tribunals and imprisonment under hard labour.
          </p>
        </div>

        <!-- Milestone 6: November 1917 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              November 1917 &bull; The Balfour Declaration &amp; Middle East Partition
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 6</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Foreign Secretary Arthur Balfour pledges British support for a "national home for the Jewish people" in Palestine, contradicting promises made to Sharif Hussein (1915) and secret imperial Sykes-Picot partition plans (1916).
          </p>
        </div>

        <!-- Milestone 7: Aug–Nov 1918 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              Aug–Nov 1918 &bull; The Hundred Days Offensive &amp; Armistice
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2 &amp; 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Following Germany’s failed Spring Offensive, Haig orchestrates all-arms combined warfare (tanks, creeping barrages, and aircraft) to breach the Hindenburg Line, forcing the German military collapse and the 11 November Armistice.
          </p>
        </div>

        <!-- Milestone 8: June 1919 & 1922 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              June 1919 &amp; 1922 &bull; The Treaty of Versailles &amp; Village Mourning
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 5 &amp; 6</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            The Allied Big Three impose Article 231 (War Guilt) and £6.6 billion reparations on Germany; across Britain, grieving communities erect memorials, such as Stubbington’s wooden shelter commemorating 67 local fallen.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'Between 1914 and 1919, the Great War destroyed four historic empires and fundamentally altered the social and political fabric of Britain.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (TOTAL WAR & HOME FRONT)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (TREATY OF VERSAILLES)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[4], 12);
  html += renderRightPage(enquiryConfigs[4], 13);

  // ====================================================================
  // PAGES 14–15: ENQUIRY 6 (DISMEMBERMENT OF OTTOMAN EMPIRE & PALESTINE)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[5], 14);
  html += renderRightPage(enquiryConfigs[5], 15);

  // ====================================================================
  // PAGE 16: OUTSIDE BACK COVER (PUPIL PROGRESS & ASSESSMENT RECORD)
  // ====================================================================
  html += `
  <!-- PAGE 16: OUTSIDE BACK COVER -->
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 0.5px;">
          The History Department &bull; Pupil Assessment Record
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #0f284e;">
          YEAR 9 &bull; KEY STAGE 3 STANDARDS
        </span>
      </div>

      <!-- Pupil Details & Target Level Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7.5px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1.3fr; gap: 14px; align-items: center; margin-bottom: 5px;">
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

      <!-- KS3 Mastery Level Descriptors (1–9 Scale) -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 5px 6px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e; margin-bottom: 3px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px;">
          Key Stage 3 Historical Mastery Framework &bull; Progression Descriptors
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.2;">
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 4.5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 2px; font-size: 7pt; text-transform: uppercase; color: #0f284e;">
                Emerging (1–2)
              </div>
              Recalls basic facts of 1914–1918; describes trench conditions and enlistment using guided sentence starters.
            </div>
            <div style="margin-top: 3px; font-size: 6.2pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 1px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Add dates &amp; key terms.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 4.5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 2px; font-size: 7pt; text-transform: uppercase; color: #0f284e;">
                Emerging+ (3)
              </div>
              Identifies causal factors; describes motives for enlistment, the Haig debate, and home front controls.
            </div>
            <div style="margin-top: 3px; font-size: 6.2pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 1px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Explain *why*, not just *what*.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 4.5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 2px; font-size: 7pt; text-transform: uppercase; color: #0f284e;">
                Expected (4–5)
              </div>
              Explains multiple causes and consequences; evaluates primary source utility using provenance, motive, and historical context.
            </div>
            <div style="margin-top: 3px; font-size: 6.2pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 1px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Connect multiple factors.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4.5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 2px; font-size: 7pt; text-transform: uppercase; color: #0f284e;">
                Expected+ (6–7)
              </div>
              Analyses competing historical interpretations (Clark vs Sheffield); evaluates colonial marginalisation and Versailles terms with precision.
            </div>
            <div style="margin-top: 3px; font-size: 6.2pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 1px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Sustained historical criteria.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4.5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 2px; font-size: 7pt; text-transform: uppercase; color: #0f284e;">
                Greater Depth (8–9)
              </div>
              Sustained, nuanced evaluative judgement; synthesises total war, geopolitical partition, imperial diplomacy, and long-term consequences.
            </div>
            <div style="margin-top: 3px; font-size: 6.2pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 1px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Nuanced synoptic judgements.
            </div>
          </div>
        </div>
      </div>

      <!-- Streamlined KS3 Marking Grid (All 6 Enquiries) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.8pt;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff;">
              <th style="padding: 6px 4px; width: 10%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.2pt; text-transform: uppercase; color: #ffffff;">Date</th>
              <th style="padding: 6px 8px; width: 44%; text-align: left; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.2pt; text-transform: uppercase; color: #ffffff;">Enquiry &bull; Assessment Focus</th>
              <th style="padding: 6px 6px; width: 16%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.2pt; text-transform: uppercase; color: #ffffff;">KS3 Level / Effort</th>
              <th style="padding: 6px 8px; width: 30%; text-align: left; font-size: 7.2pt; text-transform: uppercase; color: #ffffff;">Teacher Comment / Next Steps</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 22.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 22.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 1: Enlistment &amp; Pals Battalions</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Dual-Source Utility: Propaganda vs Authentic Diary</div>
              </td>
              <td style="padding: 22.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 22.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 22.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 22.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 2: Trench Warfare &amp; Haig Controversy</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Historical Interpretations: Clark vs Sheffield on the Somme</div>
              </td>
              <td style="padding: 22.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 22.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 22.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 22.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 3: Global Empire &amp; Forgotten Troops</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Historical Significance: Colonial Mobilisation &amp; Erasure</div>
              </td>
              <td style="padding: 22.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 22.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 22.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 22.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 4: Total War &amp; The Home Front</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Change &amp; Continuity: DORA, Conscription &amp; Canary Girls</div>
              </td>
              <td style="padding: 22.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 22.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 22.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 22.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 5: The Treaty of Versailles (1919)</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Causation &amp; Consequence: Was Versailles a Flawed Peace?</div>
              </td>
              <td style="padding: 22.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 22.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1.5px solid #0f284e; background: #ffffff;">
              <td style="padding: 22.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 22.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 6: Ottoman Collapse &amp; Palestine Mandate</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Dual-Source Utility: Sykes-Picot vs Balfour Declaration</div>
              </td>
              <td style="padding: 22.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 22.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="background: #f0f4f9;">
              <td style="padding: 22.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 22.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Living Timeline Portfolio &amp; Synoptic Assessment</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Pages 8–9 Milestone Dual-Coding &amp; Teacher Evaluative Mark</div>
              </td>
              <td style="padding: 22.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">&nbsp;</td>
              <td style="padding: 22.5px 8px; background: #f0f4f9;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Interactive Digital Quizzing Hub (All 6 Enquiries) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6px 6px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 2.5px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; color: #0f284e;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; text-align: center;">
          ${enquiryConfigs
            .map((cfg, idx) => {
              const quizUrl =
                'https://the-history-revision-hub.netlify.app/?unit=great_war_part2&lesson=' +
                idx +
                '&quiz=true';
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Enlistment',
                'Trench Horror',
                'Empire Troops',
                'Home Front',
                'Versailles',
                'Palestine',
              ];
              return (
                '<div data-qr-url="' +
                quizUrl +
                '" style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">Enquiry ' +
                cfg.lessonNum +
                '</div>' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 6.2pt; font-weight: 700; color: #475569; margin-bottom: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">' +
                shortLabels[idx] +
                '</div>' +
                '<div style="width: 24mm; height: 24mm; margin: 0 auto 1px auto;">' +
                qrSvg +
                '</div>' +
                '<span style="font-family: \'Inter\', sans-serif; font-size: 5.8pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px; margin-bottom: 1px;">Scan to Quiz</span>' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 7.5pt; font-weight: 900; color: #0f284e; margin-top: 1px; white-space: nowrap;">Score: [ &nbsp;<strong>/ 8</strong> ]</div>' +
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
</html>
`;

  return html;
}

// ============================================================================
// MAIN COMPILATION SCRIPT
// ============================================================================
async function main() {
  console.log(
    'Rendering 16-Page A4 Pupil Workbook (Key Stage 3 Standard): The Great War: 1914–1919...',
  );

  const outDir = path.join(ROOT_DIR, 'public', 'units', 'great_war_part2');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outHtmlPath = path.join(outDir, 'pupil_workbook.html');
  const html = compileGreatWarPart2Workbook();
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`[OK] HTML written to: ${outHtmlPath}`);

  // Mirror to units directory
  const altUnitsDir = path.join(ROOT_DIR, 'units', 'great_war_part2');
  if (fs.existsSync(altUnitsDir)) {
    fs.writeFileSync(path.join(altUnitsDir, 'pupil_workbook.html'), html, 'utf8');
    console.log(`[OK] HTML mirrored to: ${path.join(altUnitsDir, 'pupil_workbook.html')}`);
  }

  // Compile PDFs via Puppeteer
  const pdfDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }
  const outPdfPath = path.join(pdfDir, 'great_war_part2_pupil_workbook.pdf');
  const outPdfV17Path = path.join(pdfDir, 'great_war_part2_pupil_workbook_FINAL_V17.pdf');

  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Wait for web fonts to load
  await page.evaluateHandle('document.fonts.ready');

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

  // Mirror to FINAL_V17 alias
  fs.copyFileSync(outPdfPath, outPdfV17Path);

  await browser.close();
  console.log(`[OK] PDF successfully compiled: ${outPdfPath}`);
  console.log(`[OK] V17 PDF alias compiled: ${outPdfV17Path}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = {
  enquiryConfigs,
  lessonConfigs: enquiryConfigs,
  compileGreatWarPart2Workbook,
  buildGreatWarPart2TwoPageWorkbook: compileGreatWarPart2Workbook,
};
