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
// 5 Dedicated Great War Enquiry Configurations (1914–1919)
// Gold-Standard Christine Counsell 5-Act Standard (Matching Monarchy & Medieval)
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1_enlistment',
    title: 'Enquiry 1: 1914 & The Rush to the Colours',
    enquiryQuestion:
      'Why were young British men so desperate to volunteer for the slaughter of 1914?',
    specAnchor:
      'Lack of peacetime conscription; Lord Kitchener’s recruitment campaign; moral outrage over the invasion of neutral Belgium; Pals Battalions (Pompey Pals); economic poverty & the King’s Shilling; propaganda posters & White Feather shame.',
    stages: [
      {
        step: 1,
        date: 'Aug 1914',
        paraRef: '[1.1–1.2]',
        questionHeading:
          'What forced Britain to launch Kitchener’s urgent call for 500,000 volunteers?',
        bullets: ['No Conscription', 'BEF Just 120,000 Men', 'Kitchener’s Dire Call'],
        focusClue:
          'How did Britain’s lack of peacetime conscription force the government into a massive voluntary advertising campaign?',
      },
      {
        step: 2,
        date: 'Aug–Sept 1914',
        paraRef: '[2.1–2.2]',
        questionHeading:
          'How did the invasion of Belgium spark genuine moral outrage and civic duty?',
        bullets: ['1839 Treaty of London', 'German Atrocities', 'Crusade for Law'],
        focusClue:
          'Why did British volunteers view the war as a righteous crusade to defend international law and neutral Belgium?',
      },
      {
        step: 3,
        date: 'Sept 1914',
        paraRef: '[3.1–3.2]',
        questionHeading:
          'Why did workplace camaraderie and local pride drive the formation of Pals Battalions?',
        bullets: [
          'Pals Battalions Formed',
          'Pompey Pals (14th/15th Hants)',
          'Fight Alongside Mates',
        ],
        focusClue:
          'How did recruiting men from the same factories, offices, and football clubs encourage immediate mass enlistment?',
      },
      {
        step: 4,
        date: 'Autumn 1914',
        paraRef: '[4.1–4.2]',
        questionHeading:
          'In what ways did poverty, adventure, and the King’s Shilling lure young recruits?',
        bullets: ['Regular Pay & Food', 'Escape Factory Drudgery', 'Over by Christmas'],
        focusClue:
          'Why did guaranteed daily meals, clean uniforms, and the promise of adventure appeal to impoverished Edwardian youths?',
      },
      {
        step: 5,
        date: 'Late 1914',
        paraRef: '[5.1–5.2]',
        questionHeading:
          'How did state propaganda and social coercion make refusal to enlist unbearable?',
        bullets: ['Kitchener Finger Poster', 'White Feather Movement', 'Unbearable Social Shame'],
        focusClue:
          'How did visual advertising and patriotic shaming make staying at home morally unbearable for eligible young men?',
      },
    ],
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      examStem:
        'Explain why young British men volunteered in such massive numbers in the autumn of 1914. [12 marks]',
      stimulus: [
        'The moral outrage surrounding the German invasion of Belgium (1914)',
        'The creation of civic Pals Battalions (e.g. Pompey Pals)',
      ],
      connectives:
        'One primary reason why young men volunteered was... &bull; This encouraged enlistment because... &bull; Furthermore, social pressure such as the White Feather movement... &bull; Crucially, the camaraderie of civic Pals Battalions ensured that... &bull; Consequently, in the autumn of 1914...',
      wordBank:
        'Pals Battalions &bull; Lord Kitchener &bull; Treaty of London &bull; Pompey Pals &bull; King’s Shilling &bull; White Feather &bull; voluntary enlistment &bull; civic patriotism &bull; 750,000 recruits',
      timelineMissionTitle: 'Centrefold Sketch Challenges 1 &amp; 3',
      timelineMission:
        '<strong>Milestone 1 (August 1914):</strong> Turn to Centrefold (Pages 8–9). Sketch Lord Kitchener’s pointing finger and the massive voluntary recruitment queues outside town halls [👉 pointing finger &bull; 📜 enlistment papers &bull; 🚶‍♂️ queue of volunteers].',
    },
    leftPageQuip:
      'In August and September 1914 alone, over 750,000 British men volunteered—creating the largest citizen army in British history.',
    rightPageQuip:
      'The Pompey Pals (14th & 15th Battalions, Hampshire Regiment) were formed by local Portsmouth and Fareham dockers, clerks, and sportsmen.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2_trenches',
    title: 'Enquiry 2: Trench Warfare & The Haig Controversy (1915–1916)',
    enquiryQuestion:
      'Did British military generals make trench slaughter worse, or was Haig trapped in an industrial learning curve?',
    specAnchor:
      'Stalemate on the Western Front; trench system architecture; machine guns & artillery dominance; Battle of the Somme (1 July 1916); General Sir Douglas Haig debate ("Butcher of the Somme" vs modernising general).',
    stages: [
      {
        step: 1,
        date: 'Autumn 1914',
        paraRef: '[1.1–1.2]',
        questionHeading:
          'What forced armies underground into a 400-mile line of industrial stalemate?',
        bullets: ['Race to the Sea', 'Artillery Dominance', '400-Mile Trench Line'],
        focusClue:
          'Why did modern industrial firepower make open infantry movements impossible, establishing the 400-mile Western Front?',
      },
      {
        step: 2,
        date: '1915',
        paraRef: '[2.1–2.2]',
        questionHeading:
          'How was the three-tier trench system constructed, traversed, and defended?',
        bullets: ['Fire, Support & Reserve', 'Zig-Zag Traverse Design', 'Barbed Wire Belts'],
        focusClue:
          'Why were trenches dug in zig-zags with deep underground dugouts rather than straight defensive lines?',
      },
      {
        step: 3,
        date: '1915–1916',
        paraRef: '[3.1–3.2]',
        questionHeading:
          'What lethal physical and psychological trauma did infantry endure in the mud?',
        bullets: ['Trench Foot & Gangrene', 'Corpses, Lice & Rats', 'Shell Shock Trauma'],
        focusClue:
          'How did waterlogged clay, relentless shelling, and rotting corpses destroy soldiers’ physical and psychological health?',
      },
      {
        step: 4,
        date: '1 July 1916',
        paraRef: '[4.1–4.2]',
        questionHeading:
          'Why did the First Day of the Somme become the bloodiest disaster in British history?',
        bullets: ['7-Day Bombardment Fails', 'German Bunkers Intact', '57,470 Casualties Day 1'],
        focusClue:
          'Why did the 1.5 million-shell artillery bombardment fail to cut German barbed wire or destroy underground concrete dugouts?',
      },
      {
        step: 5,
        date: '1916–1918',
        paraRef: '[5.1–5.2]',
        questionHeading:
          'Was Sir Douglas Haig a callous "butcher" or a commander learning total war?',
        bullets: ['Lions Led by Donkeys', 'Industrial Learning Curve', 'Allied Victory in 1918'],
        focusClue:
          'Did Haig needlessly slaughter a generation of young men, or did he systematically master combined-arms warfare to win in 1918?',
      },
    ],
    rightPage: {
      type: 'two_part',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question:
          'Describe two features of the trench defensive systems on the Western Front. [4 marks]',
        stems:
          'Feature 1: One key feature was... &bull; Detail: Specifically, this meant that... &bull; Feature 2: A second key feature was... &bull; Detail: This was designed to...',
      },
      partB: {
        tariff: 'Question 2: Explain Why [8 marks &bull; 10 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain why the First Day of the Somme (1 July 1916) resulted in catastrophic British casualties. [8 marks]',
        stimulus: [
          'The failure of the 7-day artillery bombardment to cut German barbed wire',
          'German soldiers sheltering in deep underground concrete dugouts',
        ],
        connectives:
          'The primary cause of the catastrophic casualties was... &bull; This proved fatal for advancing infantry because... &bull; Furthermore, German machine-gunners were able to... &bull; Consequently, on 1 July 1916...',
        wordBank:
          'General Sir Douglas Haig &bull; 7-day bombardment &bull; uncut barbed wire &bull; concrete dugouts &bull; Spandau Maxim machine guns &bull; No Man’s Land &bull; 57,470 casualties',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenges 2 &amp; 3',
      timelineMission:
        '<strong>Milestone 3 (1 July 1916 &bull; The Somme):</strong> Turn to Centrefold (Pages 8–9). Sketch the German concrete machine-gun redoubt firing across uncut wire at the advancing Pals Battalions [🧱 concrete bunker &bull; ⚙️ Maxim gun &bull; 🕸️ barbed wire].',
    },
    leftPageQuip:
      'On 1 July 1916, the British Army suffered 57,470 casualties—including 19,240 dead—the bloodiest single day in British military history.',
    rightPageQuip:
      'Historians remain divided over Douglas Haig: 1960s critics labelled him a "butcher", while modern scholars view him as a commander mastering an unprecedented technological revolution.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3_empire',
    title: 'Enquiry 3: Global Empire & The Forgotten Fronts (1914–1918)',
    enquiryQuestion:
      'Why were the military contributions of 4 million colonial troops and labourers marginalized in postwar British memory?',
    specAnchor:
      'Global reach of the British Empire; 1.5 million Indian soldiers on the Western Front and in Mesopotamia; West India Regiment and King’s African Rifles; Chinese Labour Corps; Gallipoli campaign and ANZAC identity; systemic imperial racial hierarchies and commemorative erasure.',
    stages: [
      {
        step: 1,
        date: '1914',
        paraRef: '[1.1–1.2]',
        questionHeading:
          'Why was Britain completely dependent on mobilising 4 million imperial subjects?',
        bullets: ['Imperial War Cabinet', 'Global Manpower Pool', 'Dominions & Crown Colonies'],
        focusClue:
          'Why was Britain completely dependent on its global empire to supply troops, wheat, oil, and merchant ships?',
      },
      {
        step: 2,
        date: '1914–1915',
        paraRef: '[2.1–2.2]',
        questionHeading:
          'How crucially did 1.5 million Indian soldiers save the crumbling Allied line at Ypres?',
        bullets: ['Lahore & Meerut Divisions', 'First Battle of Ypres', 'Khadadad Khan VC'],
        focusClue:
          'How did Indian infantry and cavalry prevent a catastrophic British collapse in the freezing mud of Flanders in 1914?',
      },
      {
        step: 3,
        date: '1915',
        paraRef: '[3.1–3.2]',
        questionHeading:
          'Why did the catastrophe of Gallipoli forge national identity for Australia and New Zealand?',
        bullets: [
          'Dardanelles Disaster',
          'Mustafa Kemal & Turkish Defence',
          'Birth of ANZAC Legend',
        ],
        focusClue:
          'Why did the bloody failure at Anzac Cove become the foundation myth of Australian and New Zealand independence?',
      },
      {
        step: 4,
        date: '1916–1918',
        paraRef: '[4.1–4.2]',
        questionHeading:
          'In what ways did the Chinese Labour Corps and African Pioneers sustain Allied logistics?',
        bullets: [
          '140,000 Chinese Workers',
          'Carrier Corps in East Africa',
          'Brutal Racial Segregation',
        ],
        focusClue:
          'How did non-white labour battalions keep guns firing under deadly conditions while facing strict racial curfews?',
      },
      {
        step: 5,
        date: 'Post-1918',
        paraRef: '[5.1–5.2]',
        questionHeading:
          'Why were non-white colonial soldiers denied equal pensions, medals, and remembrance?',
        bullets: ['Imperial Colour Bar', 'Mass Graves in Africa', 'Deliberate Erasure from Memory'],
        focusClue:
          'Why did the Imperial War Graves Commission deliberately refuse individual marked headstones for black African and Asian troops?',
      },
    ],
    rightPage: {
      type: 'interpretations',
      tariff: 'Question 3(b) &amp; 3(c): Contrasting Interpretations [8 marks &bull; 10 mins]',
      interpretation1: {
        author: 'Lord Curzon, British War Cabinet Minister, Speech at the Royal Albert Hall (1917)',
        text: '“The Indian Army and the troops from our dominions have rushed forward with magnificent devotion to defend the King-Emperor. Side by side with their British brothers-in-arms, they have shed their blood on the plains of Flanders, Gallipoli, and Egypt. This imperial brotherhood proves that the British Empire is held together not by force, but by mutual love, loyalty, and common sacrifice.”',
      },
      interpretation2: {
        author: 'David Olusoga, Modern British Historian, The World’s War (2014)',
        text: '“Over four million non-white men were mobilised as combatants and labourers by Britain. Yet their treatment was defined by systemic racism. Black and Asian soldiers were barred from becoming officers, paid a fraction of British wages, and subjected to brutal floggings. After 1918, the Imperial War Graves Commission deliberately refused to give African dead individual headstones. Their sacrifice was whitewashed from British national memory.”',
      },
      questionB:
        'Question 3(b): Explain how Interpretations 1 and 2 differ about the experiences of colonial troops in the Great War. [4 marks]',
      stemsB:
        'Interpretation 1 emphasizes that colonial troops were treated with... &bull; In contrast, Interpretation 2 argues that their service was characterized by... &bull; Specifically, Interpretation 1 claims... whereas Interpretation 2 reveals...',
      questionC:
        'Question 3(c): Suggest one reason why Interpretations 1 and 2 differ about the role of empire soldiers. [4 marks]',
      stemsC:
        'One reason why the interpretations differ is because the authors have different perspectives and purposes. Lord Curzon was a wartime imperial minister whose purpose was to... &bull; On the other hand, David Olusoga is a modern historian using declassified military records to...',
      timelineMissionTitle: 'Centrefold Sketch Challenges 2 &amp; 5',
      timelineMission:
        '<strong>Milestone 2 (April 1915 &bull; Gallipoli &amp; Empire):</strong> Turn to Centrefold (Pages 8–9). In Milestone 2, sketch Indian cavalry and ANZAC troops landing under Turkish fire on the steep cliffs of Gallipoli [🌊 landing boat &bull; ⛰️ rugged cliffs &bull; 👳‍♂️ Indian turban &amp; slouch hat].',
    },
    leftPageQuip:
      'Over 1.5 million Indian soldiers served in the Great War; Sepoy Khadadad Khan was the first South Asian recipient of the Victoria Cross.',
    rightPageQuip:
      'The 2019 Unremembered Report confirmed that over 100,000 African and Indian casualties were deliberately denied individual marked graves by imperial officials.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4_home_front',
    title: 'Enquiry 4: The Home Front & Women’s Total War (1914–1918)',
    enquiryQuestion:
      'How far did the First World War transform the British state and daily life on the Home Front?',
    specAnchor:
      'Total war concept; Defence of the Realm Act (DORA); blackout, censorship, pub hours, licensing; introduction of military conscription (1916); 1 million women in munitions ("Canary Girls") and transport; food shortages and German U-boat blockade; German Zeppelin air raids on civilians.',
    stages: [
      {
        step: 1,
        date: 'Aug 1914',
        paraRef: '[1.1–1.2]',
        questionHeading:
          'In what ways did DORA grant the British state unprecedented authoritarian control?',
        bullets: ['Defence of the Realm Act', 'Strict Press Censorship', 'Curfews & Watered Beer'],
        focusClue:
          'How did DORA transform Britain from a laissez-faire liberal state into a strictly controlled wartime command economy?',
      },
      {
        step: 2,
        date: '1915–1916',
        paraRef: '[2.1–2.2]',
        questionHeading:
          'What forced David Lloyd George to nationalise munitions factories in 1915?',
        bullets: [
          'Daily Mail Shell Scandal',
          'Ministry of Munitions',
          'State-Run National Shell Factories',
        ],
        focusClue:
          'Why did severe ammunition shortages on the Western Front compel the state to seize control of private industrial production?',
      },
      {
        step: 3,
        date: 'Jan 1916',
        paraRef: '[3.1–3.2]',
        questionHeading:
          'Why did catastrophic frontline casualties force Britain to impose conscription in 1916?',
        bullets: ['Somme Demands Reserves', 'Military Service Act 1916', 'Conscientious Objectors'],
        focusClue:
          'Why was the introduction of conscription for all men aged 18–41 the most radical infringement on personal liberty in British history?',
      },
      {
        step: 4,
        date: '1916–1918',
        paraRef: '[4.1–4.2]',
        questionHeading:
          'How did 1 million "Canary Girls" transform industrial production despite toxic hazards?',
        bullets: ['Toxic TNT Jaundice', 'Silvertown Explosion (1917)', '80% of British Munitions'],
        focusClue:
          'What lethal industrial dangers did women face manufacturing explosives, and how did their work permanently reshape female gender roles?',
      },
      {
        step: 5,
        date: '1917–1918',
        paraRef: '[5.1–5.2]',
        questionHeading:
          'Why did unrestricted German submarine warfare push Britain to the brink of starvation?',
        bullets: [
          'U-Boats Sink Merchant Fleet',
          'Only 6 Weeks Food Left',
          'Sugar & Meat Ration Books',
        ],
        focusClue:
          'How did German submarine warfare bring Britain within weeks of starvation, forcing the compulsory rationing of sugar, butter, and meat?',
      },
    ],
    rightPage: {
      type: 'equal_split',
      partA: {
        tariff: 'Question 2: Narrative Account [8 marks &bull; 10 mins]',
        badge: 'PART A &bull; NARRATIVE',
        question:
          'Write a narrative account analysing the key events leading from the Shell Crisis of 1915 to the introduction of compulsory conscription in 1916. [8 marks]',
        stimulus: [
          'The 1915 Shell Crisis and the Daily Mail headlines',
          'The passing of the Military Service Act in January 1916',
        ],
        connectives:
          'The crisis began in May 1915 when... &bull; This led to immediate political consequences because... &bull; In response, David Lloyd George established... &bull; Crucially, by late 1915 the voluntary system failed to... &bull; Consequently, in January 1916 Parliament passed...',
        wordBank:
          'Shell Crisis &bull; David Lloyd George &bull; Ministry of Munitions &bull; Lord Derby Scheme &bull; Military Service Act (1916) &bull; Conscription',
      },
      partB: {
        tariff: 'Question 3: Explain Importance [8 marks &bull; 10 mins]',
        badge: 'PART B &bull; IMPORTANCE',
        question:
          'Explain the importance of female munitions workers to the British war effort in the period 1915–1918. [8 marks]',
        stimulus: [
          'The production of 80% of all British weaponry and shells',
          'The dangerous working conditions and toxic jaundice ("Canary Girls")',
        ],
        connectives:
          'The primary importance of women munitions workers was... &bull; This was vital to the frontlines because... &bull; Furthermore, their courage under toxic conditions... &bull; In the long term, their contribution proved that...',
        wordBank:
          'Canary Girls &bull; TNT poisoning &bull; Silvertown explosion &bull; Ministry of Munitions &bull; Representation of the People Act 1918',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenges 4 &amp; 5',
      timelineMission:
        '<strong>Milestone 5 (1916–1917 &bull; Home Front):</strong> Turn to Centrefold (Pages 8–9). Sketch a factory of "Canary Girls" loading heavy artillery shells beside a queue of women holding 1918 rationing books [🏭 munitions factory &bull; 💣 artillery shell &bull; 📕 ration book].',
    },
    leftPageQuip:
      'Under DORA, it was illegal to buy rounds of drinks in pubs, feed bread to pigeons, ring church bells, or fly a kite in Britain.',
    rightPageQuip:
      'Over 1 million women entered the wartime workforce; in January 1917, the Silvertown munitions factory in London exploded, killing 73 people and devastating 70,000 properties.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5_versailles',
    title: 'Enquiry 5: 1918–1919 & The Treaty of Versailles',
    enquiryQuestion:
      'Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?',
    specAnchor:
      'Armistice of 11 November 1918; Paris Peace Conference; Big Three conflicting aims (Clemenceau, Lloyd George, Wilson); terms of the Treaty of Versailles (GARGLE: Article 231 War Guilt, £6.6bn reparations, military caps, Polish Corridor, Rhineland demilitarisation); Keynes’ "Carthaginian Peace" warning; Will Dyson’s "1940 Class" cartoon; League of Nations creation; modern revisionist debate on Allied enforcement.',
    stages: [
      {
        step: 1,
        date: '11 Nov 1918',
        paraRef: '[1.1–1.2]',
        questionHeading:
          'What forced the German military to concede defeat and accept the Armistice in 1918?',
        bullets: [
          'Kiel Mutiny & Revolution',
          'Kaiser Abdicates to Holland',
          'Armistice in Compiègne Wagon',
        ],
        focusClue:
          'Why did the British naval blockade and the Allied Hundred Days Offensive break the German Army’s will to fight?',
      },
      {
        step: 2,
        date: 'Jan–June 1919',
        paraRef: '[2.1–2.2]',
        questionHeading:
          'How did conflicting national motives divide Clemenceau, Lloyd George, and Wilson?',
        bullets: [
          'Clemenceau Demands Revenge',
          'Wilson’s 14 Points & League',
          'Lloyd George’s Compromise',
        ],
        focusClue:
          'Why did French desires to permanently disarm Germany clash with American idealism and British trade interests?',
      },
      {
        step: 3,
        date: '28 June 1919',
        paraRef: '[3.1–3.2]',
        questionHeading:
          'Why did Germans across all political parties denounce the Treaty terms as an unjust "Diktat"?',
        bullets: [
          'Article 231 "War Guilt"',
          '£6.6 Billion Reparations',
          '100,000 Army Cap & Land Cuts',
        ],
        focusClue:
          'Why did Germans across all political parties denounce the Treaty of Versailles as an unjust and humiliating "Diktat"?',
      },
      {
        step: 4,
        date: 'June–Dec 1919',
        paraRef: '[4.1–4.2]',
        questionHeading:
          'How did Article 231, Keynes’ warning, and Will Dyson’s cartoon predict future catastrophe?',
        bullets: [
          'Article 231 Moral Condemnation',
          'Keynes: "Carthaginian Peace"',
          'Dyson: "1940 Class" Weeps',
        ],
        focusClue:
          'How did contemporary critics like Keynes and Dyson predict that punishing Germany economically would breed a second war in 1939?',
      },
      {
        step: 5,
        date: '1920–1939',
        paraRef: '[5.1–5.2]',
        questionHeading:
          'The Historical Verdict: Was Versailles an impossibly harsh peace or an unenforced compromise?',
        bullets: [
          'Traditional: Created Hitler',
          'MacMillan: Germany Stayed Intact',
          'Fatal Failure of Enforcement',
        ],
        focusClue:
          'Did the Treaty of Versailles directly cause World War II, or did the fatal flaw lie in the Allies’ failure to enforce its terms?',
      },
    ],
    rightPage: {
      type: 'single_12',
      tariff: 'Question 5: Evaluative Statement Essay [12 marks &bull; 15 mins]',
      examStem:
        '‘The Treaty of Versailles was so harsh that it made another European war inevitable.’ How far do you agree with this statement? [12 marks]',
      stimulus: [
        'Article 231 (War Guilt) and £6.6 billion reparations',
        'The establishment of the League of Nations and the principle of self-determination',
      ],
      structureStrip: [
        {
          col: '1. PUNITIVE TERMS & RESENTMENT',
          text: 'Explain how Article 231, £6.6bn reparations, lost coal territories (Saar/Silesia), and the 100,000-man army cap created toxic German resentment and economic chaos.',
        },
        {
          col: '2. COUNTER-ARGUMENT: RESTRAINTS & IDEALS',
          text: 'Explain that the treaty preserved German national unity, created democratic states in Eastern Europe, and established the League of Nations to resolve disputes peacefully.',
        },
        {
          col: '3. COMPARATIVE VERDICT',
          text: 'Weigh whether the flaw was the treaty’s severity or the failure of Britain and France to enforce its terms when Hitler challenged it in the 1930s.',
        },
      ],
      connectives:
        'To a large extent I agree that the Treaty of Versailles made another war inevitable because... &bull; In particular, Article 231 and reparations caused... &bull; On the other hand, defenders of the settlement argue that... &bull; Furthermore, the creation of the League of Nations... &bull; In conclusion, the fatal weakness of Versailles was not just its harshness, but...',
      wordBank:
        'Article 231 (War Guilt) &bull; £6.6 billion reparations &bull; Diktat &bull; Georges Clemenceau &bull; Woodrow Wilson &bull; David Lloyd George &bull; League of Nations &bull; Rhineland demilitarisation &bull; Polish Corridor &bull; GARGLE',
      timelineMissionTitle: 'Centrefold Sketch Challenge 7',
      timelineMission:
        '<strong>Milestone 7 (28 June 1919 &bull; Hall of Mirrors):</strong> Turn to Centrefold (Pages 8–9). Sketch the Allied leaders seated along the long table inside the Hall of Mirrors forcing the German envoys to sign Versailles [🏛️ mirrors &bull; 📜 treaty quill &bull; 🎖️ Allied generals].',
    },
    leftPageQuip:
      'Marshal Ferdinand Foch famously declared of the Treaty of Versailles: ‘This is not peace. It is an armistice for twenty years.’ Exactly twenty years later, in 1939, World War II began.',
    rightPageQuip:
      'John Maynard Keynes resigned from the British peace delegation in protest, warning that impoverishing Germany would drag Europe into economic catastrophe.',
  },
];

// ============================================================================
// HELPER RENDERERS
// ============================================================================
function renderNotesPage(pageNum, quip) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const ruledRows = Array(26)
    .fill(
      '<div class="lined-row"><div class="lined-margin-cell"></div><div class="lined-content-cell"></div></div>',
    )
    .join('');

  return `
  <!-- PAGE ${pageNum}: DEDICATED LINED NOTES PAGE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f284e; font-weight: 900;">
            ${pageNum === 14 ? 'The Great War: Historical Enquiry &amp; Causal Notes' : 'The Great War: Extended Writing &amp; Essay Planning'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">
            ${pageNum === 14 ? 'KNOWLEDGE REPERTOIRE' : 'WRITING PRACTICE'}
          </span>
        </div>
      </div>

      <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 2.5px 6px; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b;">
        <strong style="color: #0f284e;">Scholar Note-Taking Protocol:</strong> Record key causal factors, primary source evidence, historiographical debates, and structured essay plans in this ruled portfolio.
      </div>

      <div class="lined-page-grid">
        ${ruledRows}
      </div>

      ${renderFooterStrip(pageNum, quip, 16)}
    </div>
  </div>`;
}

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
// LEFT PAGE RENDERER: 5-STAGE CHRONOLOGICAL INQUIRY SPINE
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
            YEAR 9 &bull; THE GREAT WAR: 1914–1919
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

      ${renderFooterStrip(pageNum, cfg.leftPageQuip, 16)}
    </div>
  </div>`;
}

// ============================================================================
// RIGHT PAGE RENDERER: ROTATING DISCIPLINARY SKILLS WRITING
// ============================================================================
function renderRightPage(cfg, pageNum) {
  const rp = cfg.rightPage;
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';

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
          Extended Writing Practice
        </span>
      </div>

      <!-- Question Stem & Stimulus Box -->
      <div style="border: 1px solid #0f284e; border-left: 3.5px solid #0f284e; border-radius: 3px; padding: 5px 8px; background: #f0f4f9; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #0f284e; margin-bottom: 3px; line-height: 1.25;">
          ${rp.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #1e293b;">
          <strong style="color: #0f284e;">Stimulus:</strong>
          <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #ffffff;">${rp.stimulus[0]}</span>
          <span style="border: 1px solid #0f284e; padding: 1px 6px; border-radius: 2px; font-weight: 700; color: #0f284e; background: #ffffff;">${rp.stimulus[1]}</span>
          <span style="font-style: italic; color: #475569;">(You must also use information of your own)</span>
        </div>
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

      <!-- Ruled Task Lines for Extended Writing -->
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
    const stemsB = rp.stemsB || '';
    const stemsC = rp.stemsC || '';

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

      <!-- Task B: Question 3(b) -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px; flex: 1.15; display: flex; flex-direction: column; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e;">
            ${rp.questionB}
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            PART B
          </span>
        </div>
        ${stemsB ? `<div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22; margin-bottom: 3px;"><strong style="color: #0f284e;">Sentence Stems:</strong> <span style="color: #1e293b;">${stemsB}</span></div>` : ''}
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(14).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>
      </div>

      <!-- Task C: Question 3(c) -->
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
          ${stemsC ? `<div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22; margin-bottom: 3px;"><strong style="color: #0f284e;">Scaffolded Sentence Stems:</strong> <span style="color: #1e293b;">${stemsC}</span></div>` : ''}
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
    // EQUAL-SPLIT ROTATING SKILLS WRITING (E.G. TWO 8-MARK QUESTIONS)
    const partA = rp.partA || {};
    const partB = rp.partB || {};

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • EQUAL SPLIT WRITING [8 MARKS + 8 MARKS] -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: QUESTION 2 NARRATIVE ACCOUNT [8 MARKS] -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px; flex: 1; display: flex; flex-direction: column; min-height: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 9.6pt; color: #0f284e; margin: 0; font-weight: 800;">
            ${partA.tariff || 'Question 1: Structured Writing [8 marks]'}
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
        ${
          partA.connectives || partA.wordBank || partA.stems
            ? `
        <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22;">
          ${partA.connectives ? `<div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partA.connectives}</em></div>` : ''}
          ${partA.stems ? `<div><strong style="color: #0f284e;">Sentence Stems:</strong> <span style="color: #1e293b;">${partA.stems}</span></div>` : ''}
          ${partA.wordBank ? `<div style="margin-top: 1.5px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partA.wordBank}</span></div>` : ''}
        </div>`
            : ''
        }
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0;">
          ${Array(14).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>
      </div>

      <!-- PART B: QUESTION 3 EXPLAIN IMPORTANCE [8 MARKS] -->
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
          ${
            partB.connectives || partB.wordBank || partB.stems
              ? `
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #f0f4f9; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22;">
            ${partB.connectives ? `<div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partB.connectives}</em></div>` : ''}
            ${partB.stems ? `<div><strong style="color: #0f284e;">Sentence Stems:</strong> <span style="color: #1e293b;">${partB.stems}</span></div>` : ''}
            ${partB.wordBank ? `<div style="margin-top: 1.5px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partB.wordBank}</span></div>` : ''}
          </div>`
              : ''
          }
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
      
      <!-- PART A: SHORT-FORM DISCIPLINARY PRACTICE [4 MARKS] -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 4px; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
            ${partA.tariff || 'Question 1: Disciplinary Drill'}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            ${partA.badge || 'DISCIPLINARY DRILL'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0;">
          ${partA.question || ''}
        </p>
        ${partA.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #475569; margin-bottom: 2px;">${partA.hint}</div>` : ''}
        ${partA.stems ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 700; margin-bottom: 2px; color: #1e293b;"><strong style="color: #0f284e;">Sentence Stems:</strong> ${partA.stems}</div>` : ''}
        ${partA.connectives ? `<div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; background: #f0f4f9; padding: 2px 5px; border-radius: 2px; margin-bottom: 2px;"><strong style="color: #0f284e;">Connectives:</strong> ${partA.connectives}</div>` : ''}
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
          ${partB.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #475569; margin-bottom: 2px;">${partB.hint}</div>` : ''}
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
          ${
            partB.connectives || partB.stems || partB.wordBank
              ? `
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 4px 7px; background: #f0f4f9; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.24;">
            ${partB.connectives ? `<div><strong style="color: #0f284e;">Analytical Connectives:</strong> <em style="color: #1e293b;">${partB.connectives}</em></div>` : ''}
            ${partB.stems ? `<div><strong style="color: #0f284e;">Sentence Stems:</strong> <span style="color: #1e293b;">${partB.stems}</span></div>` : ''}
            ${partB.wordBank ? `<div style="margin-top: 2px;"><strong style="color: #0f284e;">Key Terms:</strong> <span style="color: #1e293b;">${partB.wordBank}</span></div>` : ''}
          </div>`
              : ''
          }
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

// ============================================================================
// MAIN COMPILATION FUNCTION
// ============================================================================
function compileGreatWarPart2Workbook() {
  const coverImgBase64 =
    getBase64Image('public/images/versailles_signing_1919_orpen.jpg') ||
    getBase64Image('images/versailles_signing_1919_orpen.jpg') ||
    getBase64Image('public/images/bg_great_war_part2.jpg') ||
    getBase64Image('images/bg_great_war_part2.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Great War (1914–1919) Pupil Workbook</title>
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
      border-right: 1.2px solid #000000;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding-left: 1mm;
      padding-right: 0.5mm;
      box-sizing: border-box;
    }
    .lined-content-cell {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 6px;
      box-sizing: border-box;
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
          Year 9 Enquiry &bull; 1914–1919
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; line-height: 1.15; color: #0f284e; margin: 2px 0 3px 0; font-weight: 900;">
          The Great War: 1914–1919
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 10pt; color: #334155; font-style: italic; font-weight: 600;">
          Industrial Slaughter, Global Sacrifice, Total War &amp; The Flawed Peace
        </div>
      </div>

      <!-- Prominent Primary Visual Source Centerpiece (Side-by-Side Layout) -->
      <div style="margin: 2px 0 5px 0; border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="display: grid; grid-template-columns: 80mm 1fr; background: #ffffff;">
          <!-- Left: Full Visual Canvas (Unclipped Orpen Painting) -->
          <div style="background: #f8fafc; border-right: 1.5px solid #0f284e; display: flex; justify-content: center; align-items: center; padding: 3px 4px;">
            <img src="${coverImgBase64}" alt="Sir William Orpen, The Signing of Peace in the Hall of Mirrors, Versailles (28 June 1919)" style="height: 98mm; width: auto; max-width: 100%; object-fit: contain; display: block; margin: 0 auto; border: 1.2px solid #0f284e; border-radius: 2px; box-shadow: 0 2px 6px rgba(15,40,78,0.22);">
          </div>

          <!-- Right: Visual Analysis & Historical Context for Year 9 -->
          <div style="padding: 4px 8px 4px 8px; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; box-sizing: border-box;">
            <!-- 1. Header: Authentic Artwork Title & Artist -->
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Playfair Display', serif; font-size: 8.5pt; font-weight: 900; color: #0f284e; letter-spacing: 0.2px;">
                The Signing of Peace in the Hall of Mirrors, Versailles (28 June 1919)
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #475569;">
                Sir William Orpen (1878–1931)
              </span>
            </div>

            <!-- 2. Historical Context -->
            <p style="font-family: 'Georgia', serif; font-size: 7.2pt; line-height: 1.24; color: #1e293b; margin: 1px 0;">
              On 28 June 1919, exactly five years after the assassination of Archduke Franz Ferdinand, Allied statesmen gathered in the Hall of Mirrors at Versailles to impose peace upon defeated Germany:
            </p>

            <!-- 3. Four Core Historical Features -->
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <div style="border-left: 2.2px solid #0f284e; padding-left: 5px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e;">1. The Big Three &amp; Conflicting Agendas:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Seated at the centre are Woodrow Wilson (League of Nations), Georges Clemenceau (disarmament and reparations), and David Lloyd George (imperial compromise).
                </div>
              </div>
              <div style="border-left: 2.2px solid #0f284e; padding-left: 5px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e;">2. The Imposition of the Diktat:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  In the foreground, German envoys Johannes Bell and Hermann Müller sign Article 231 (War Guilt) and £6.6bn in reparations without negotiation under naval blockade.
                </div>
              </div>
              <div style="border-left: 2.2px solid #0f284e; padding-left: 5px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e;">3. Global Imperial Representation:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Flanked behind the leaders stand imperial dignitaries—including the Maharaja of Bikaner—symbolising over 4 million colonial troops who sustained Allied victory.
                </div>
              </div>
              <div style="border-left: 2.2px solid #0f284e; padding-left: 5px;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; text-transform: uppercase; color: #0f284e;">4. The Seeds of Future Conflict:</strong>
                <div style="font-family: 'Georgia', serif; font-size: 6.6pt; line-height: 1.15; color: #222222;">
                  Above, the ceiling proclaims ‘Le Roy Gouverne’ (‘The King Governs’), foreshadowing Marshal Foch’s warning: ‘This is not peace. It is an armistice for twenty years.’
                </div>
              </div>
            </div>

            <!-- 4. Three-Pillar Key Concepts Matrix -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3px; padding-top: 2px; border-top: 1px solid #cbd5e1;">
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 4px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.1pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">The Big Three</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.1pt; line-height: 1.12; color: #1e293b; margin-top: 1px;">Wilson, Clemenceau, Lloyd George.</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 4px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.1pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">German Envoys</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.1pt; line-height: 1.12; color: #1e293b; margin-top: 1px;">Signing Article 231 (War Guilt).</div>
              </div>
              <div style="border: 1px solid #0f284e; border-radius: 2px; padding: 2px 4px; background: #f0f4f9;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.1pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Hall of Mirrors</div>
                <div style="font-family: 'Georgia', serif; font-size: 6.1pt; line-height: 1.12; color: #1e293b; margin-top: 1px;">1871 German Empire reversed.</div>
              </div>
            </div>

            <!-- 5. Significance Anchor (Authentic, No "Disciplinary") -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.3pt; color: #1e293b; line-height: 1.18; background: #f0f4f9; border-left: 2.2px solid #0f284e; padding: 2px 5px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Significance:</strong> The Treaty of Versailles formally concluded the Great War, dismantled four European empires, and created the economic and territorial grievances that paved the road to the Second World War.
            </div>

            <!-- 6. Targeted Hinge Question (Authentic, No "Disciplinary", No "Historical Evaluation" badge) -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 2px 5px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Hinge Question:</span>
              <div style="font-family: 'Georgia', serif; font-size: 6.6pt; font-style: italic; color: #1e293b; line-height: 1.15; margin-top: 1px;">
                Did the Allied peacemakers at Versailles make another war inevitable through excessive severity, or was the fatal weakness their failure to enforce the treaty’s military terms when challenged in the 1930s?
              </div>
            </div>
          </div>
        </div>

        <!-- Curatorial Strip directly below the grid -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #ffffff; padding: 2.5px 8px; border-top: 1.2px solid #0f284e; background: #0f284e;">
          <span><strong>Medium &amp; Provenance:</strong> Oil on canvas (152.4 &times; 127 cm) &bull; Official War Art Commission</span>
          <span style="font-weight: 800; color: #93c5fd; letter-spacing: 0.3px;">IMPERIAL WAR MUSEUM, LONDON &bull; ART 2856</span>
        </div>
      </div>

      <!-- Strategy Overview & Workbook Blueprint -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 4px 8px; background: #f0f4f9; margin: 2px 0 5px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            1. Chronological Spines [Enquiries 1–5]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Structured chronological note-taking on each left page: 5 causal stages guiding pupil understanding as the teacher narrates the history.
          </div>
        </div>
        <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            2. Writing Practice [4m, 8m, 12m]
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Targeted extended writing on each right page: structured feature drills, historiographical interpretations, narrative accounts, and analytical causation essays.
          </div>
        </div>
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            3. Centrefold Living Timeline &amp; Essays
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Centrefold Living Timeline dual-coding sketchpads (pp. 8–9) and 5 dedicated enquiry spreads covering 1914–1919.
          </div>
        </div>
      </div>

      <!-- Course Specification Curriculum Tracking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin: 2px 0 2px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #0f284e; background: #0f284e;">
              <th style="padding: 5px 8px; text-align: left; font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Course Specification &bull; Key Enquiry Sequence
              </th>
              <th style="padding: 5px 4px; width: 60px; text-align: center; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-right: 1.2px solid rgba(255,255,255,0.25); color: #ffffff;">
                Learnt
              </th>
              <th style="padding: 5px 4px; width: 60px; text-align: center; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
                Revised
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 7.5px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 1: 1914 &amp; The Rush to the Colours
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
              <td style="padding: 7.5px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 2: Trench Warfare &amp; The Haig Controversy (1915–1916)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Did British military generals make trench slaughter worse, or was Haig trapped in an industrial learning curve?
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
              <td style="padding: 7.5px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 3: Global Empire &amp; The Forgotten Fronts (1914–1918)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Why were the military contributions of 4 million colonial troops and labourers marginalized in postwar British memory?
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
              <td style="padding: 7.5px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 4: The Home Front &amp; Women’s Total War (1914–1918)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  How far did the First World War transform the British state, introduce conscription, and mobilise women into industrial citizenship?
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
              <td style="padding: 7.5px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 5: The Treaty of Versailles &amp; The Flawed Peace (1918–1919)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Was the Treaty of Versailles an impossibly harsh peace that made another war inevitable, or an unenforced compromise?
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

      ${renderFooterStrip(1, 'In 1914, Britain was the only major European power without peacetime conscription, relying entirely on voluntary enlistment.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (1914 & RUSH TO THE COLOURS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (TRENCH WARFARE & HAIG)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (GLOBAL EMPIRE & FORGOTTEN FRONTS)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[2], 6);
  html += renderRightPage(enquiryConfigs[2], 7);

  // ====================================================================
  // PAGES 8–9: THE LIVING TIMELINE IN THE EXACT PHYSICAL CENTREFOLD!
  // ====================================================================
  html += `
  <!-- PAGE 8: LIVING TIMELINE PART 1 (MILESTONES 1–4) -->
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
            Following the German invasion of Belgium, Lord Kitchener issues his iconic recruiting appeal; over 750,000 volunteers enlist in eight weeks, creating the civic Pals Battalions across Britain.
          </p>
        </div>

        <!-- Milestone 2: April 1915 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              April 1915 &bull; The Gallipoli Landings &amp; ANZAC Mobilisation
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            British, French, Indian, and Australian/New Zealand (ANZAC) forces land on the Gallipoli peninsula to knock the Ottoman Empire out of the war; eight months of bloody stalemate forge Australian national consciousness.
          </p>
        </div>

        <!-- Milestone 3: 1 July 1916 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1 July 1916 &bull; The First Day on the Somme &amp; Destruction of the Pals
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Following a seven-day artillery bombardment, 100,000 British infantry assault intact German wire; 19,240 men are killed in hours, devastating entire towns and wiping out civic volunteer battalions.
          </p>
        </div>

        <!-- Milestone 4: September 1916 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              September 1916 &bull; First Tank Deployment at Flers-Courcelette
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Britain unveils the Mark I tank on the Somme, driving over trenches and crushing barbed wire; while mechanically unreliable, it inaugurates modern combined-arms armoured warfare.
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
            Living Timeline &bull; Part 2: Conscription, Total War &amp; The Flawed Peace (1916–1923)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1916–1917 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1916–1917 &bull; Conscription, "Canary Girls" &amp; Total War Mobilisation
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Parliament enforces military conscription for all eligible men while 1 million women enter munitions factories ("Canary Girls") and transport; German U-boat attacks bring Britain within weeks of starvation.
          </p>
        </div>

        <!-- Milestone 6: 1917–1918 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1917–1918 &bull; Global Empire Mobilisation &amp; 4 Million Troops
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Over 1.5 million Indian soldiers and hundreds of thousands of African, Caribbean, and Dominion troops fight across Europe, Africa, and the Middle East, sustaining the Allied war effort.
          </p>
        </div>

        <!-- Milestone 7: 11 November 1918 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              11 November 1918 &bull; The Hundred Days Offensive &amp; Armistice
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Allied combined-arms offensives break the Hindenburg Line; facing revolution and starvation at home, Germany signs the Armistice in Marshal Foch’s railway carriage, ending active combat.
          </p>
        </div>

        <!-- Milestone 8: 28 June 1919 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              28 June 1919 &bull; The Signing of the Treaty of Versailles
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            In the Hall of Mirrors at Versailles, Allied powers force Germany to accept Article 231 (War Guilt), pay £6.6 billion in reparations, and surrender 13% of its European territory, creating a fragile peace.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'Between 1914 and 1919, the Great War destroyed historic empires and fundamentally remade the political map of Europe.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (THE HOME FRONT & WOMEN'S TOTAL WAR)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (THE POSTWAR SETTLEMENT: VERSAILLES & MANDATES)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[4], 12);
  html += renderRightPage(enquiryConfigs[4], 13);

  // ====================================================================
  // PAGES 14–15: DEDICATED LINED NOTES & ESSAY PORTFOLIO
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
  // PAGE 16: OUTSIDE BACK COVER (PROGRESS LEDGER + 5 QR CODES)
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

      <!-- KS3 History Progress Pathways & Descriptors (Year 9 Standards) -->
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
              Recalls key facts of the Great War; describes basic trench conditions and Home Front changes using guided starters.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Add precise dates &amp; key military vocabulary.
            </div>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Emerging+ (3)
              </div>
              Identifies reasons for events; begins to explain why men volunteered, how tactics evolved, and why peace proved fragile.
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
              Explains multiple causes and consequences; writes structured causal paragraphs on Haig, Empire mobilization, and Versailles.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 2px; color: #475569;">
              <strong style="color: #0f284e;">Focus:</strong> Connect military, imperial, and domestic factors.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Expected+ (6–7)
              </div>
              Analyses historical significance; evaluates competing historical interpretations (Haig, Empire memory) with detailed primary evidence.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Sustained historiographical criteria.
            </div>
          </div>
          <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px; background: #f0f4f9; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 900; border-bottom: 1px solid #0f284e; padding-bottom: 2px; margin-bottom: 3px; font-size: 7.2pt; text-transform: uppercase; color: #0f284e;">
                Greater Depth (8–9)
              </div>
              Sustained, nuanced evaluative judgements; synthesises total war mobilization, geopolitical consequence, and modern historical legacies.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Nuanced synoptic judgements.
            </div>
          </div>
        </div>
      </div>

      <!-- Streamlined KS3 Marking Grid (6 Enquiries) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 8pt;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff;">
              <th style="padding: 5px 4px; width: 10%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.2pt; text-transform: uppercase; color: #ffffff;">Date</th>
              <th style="padding: 5px 8px; width: 43%; text-align: left; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.2pt; text-transform: uppercase; color: #ffffff;">Enquiry &bull; Assessment Focus</th>
              <th style="padding: 5px 6px; width: 17%; text-align: center; border-right: 1px solid rgba(255,255,255,0.25); font-size: 7.2pt; text-transform: uppercase; color: #ffffff;">KS3 Level / Effort</th>
              <th style="padding: 5px 8px; width: 30%; text-align: left; font-size: 7.2pt; text-transform: uppercase; color: #ffffff;">Teacher Comment / Spellings</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 1: 1914 &amp; Rush to Colours</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Causal Explanation: Why did men rush to volunteer?</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 2: Trench Warfare &amp; Haig</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Feature Description &amp; Somme Source Follow-Up</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 3: Global Empire &amp; Memory</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Contrasting Interpretations: Empire Troops</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 4: Home Front &amp; Women</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Narrative Account &amp; Importance of Munitionettes</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 5: Versailles &amp; The Flawed Peace</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Evaluative Essay: Was Versailles Inevitably Fatal?</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="background: #ffffff; border-top: 1.5px solid #0f284e;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Teacher-Designated Assessment Task</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Synoptic End-of-Unit Assessment &amp; Revision Target</div>
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
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f284e; background: #f0f4f9; padding: 2.5px 6px; margin-bottom: 4px; border-radius: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; color: #0f284e;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">
            ONLINE RECALL
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; text-align: center;">
          ${enquiryConfigs
            .map((cfg, idx) => {
              const quizUrl =
                'https://the-history-revision-hub.netlify.app/?unit=great_war_part2&lesson=' +
                idx +
                '&quiz=true';
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Rush to Colours',
                'Trench &amp; Haig',
                'Global Empire',
                'Home Front',
                'Versailles 1919',
              ];
              return (
                '<div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">Enquiry ' +
                cfg.lessonNum +
                '</div>' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 6pt; font-weight: 700; color: #475569; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">' +
                shortLabels[idx] +
                '</div>' +
                '<div style="width: 24.5mm; height: 24.5mm; margin: 0 auto 2px auto;">' +
                qrSvg +
                '</div>' +
                '<span style="font-family: \'Inter\', sans-serif; font-size: 5.8pt; font-weight: 800; text-transform: uppercase; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px; margin-bottom: 2px;">Scan to Quiz</span>' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 7.2pt; font-weight: 900; color: #0f284e; margin-top: 1px; white-space: nowrap;">Score: [ &nbsp;&nbsp; <strong>/ 10</strong> ]</div>' +
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
    'Rendering 16-Page A4 Pupil Workbook (Christine Counsell Standard): The Great War: 1914–1919...',
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
  const outPdf16pPath = path.join(pdfDir, 'great_war_part2_16p_workbook.pdf');
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

  // Mirror to aliases
  fs.copyFileSync(outPdfPath, outPdf16pPath);
  fs.copyFileSync(outPdfPath, outPdfV17Path);

  await browser.close();
  console.log(`[OK] PDF successfully compiled: ${outPdfPath}`);
  console.log(`[OK] 16P PDF alias compiled: ${outPdf16pPath}`);
  console.log(`[OK] V17 PDF alias compiled: ${outPdfV17Path}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during workbook compilation:', err);
    process.exit(1);
  });
}

module.exports = {
  compileGreatWarPart2Workbook,
  enquiryConfigs,
  lessonConfigs: enquiryConfigs,
};
