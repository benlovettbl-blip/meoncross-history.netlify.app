/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/great_war (KS3 Year 9: Causes of the Great War, 1871–1914)
 * Output: public/units/great_war/pupil_workbook.html
 * PDF:    public/pdfs/great_war_pupil_workbook.pdf (and aliases)
 *
 * Gold Standard Publisher Architecture (Monarchy Gold Standard):
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
    path.join(ROOT_DIR, 'units', 'great_war', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'great_war', 'assets', path.basename(clean)),
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
// 5 BESPOKE CAUSES OF THE GREAT WAR ENQUIRY CONFIGURATIONS
// Monarchy Gold Standard Architecture (Spine Left, Rotating Skills Right)
// ============================================================================
const enquiryConfigs = [
  {
    lessonNum: 1,
    id: 'lesson_1',
    title: 'Enquiry 1: German Unification, Franco-Prussian War & Bismarck (1871–1890)',
    enquiryQuestion:
      'How did the creation of the German Empire and the seizure of Alsace-Lorraine permanently rupture European peace?',
    specAnchor:
      '1815 Congress of Vienna balance of power; Prussian military reforms & Krupp industrial steel; Otto von Bismarck’s Realpolitik and "Iron & Blood" statecraft; Franco-Prussian War (1870–71) & proclamation at Versailles; Treaty of Frankfurt, 5 billion franc indemnity & annexation of Alsace-Lorraine; French national "Revanche"; Bismarckian diplomacy to isolate France and avoid a two-front war.',
    stages: [
      {
        step: 1,
        date: '1862–1866',
        paraRef: '[1.1]',
        questionHeading: 'What enabled Prussia to overturn the 1815 balance of power?',
        bullets: [
          '39 Separate German States',
          'Bismarck’s Blood & Iron Speech',
          'Deadly Krupp Steel Guns',
        ],
        focusClue:
          'How did Prussian military technology, rail networks, and Realpolitik shatter the old fragmented German Confederation?',
      },
      {
        step: 2,
        date: '1870–1871',
        paraRef: '[1.2]',
        questionHeading: 'How was the German Empire proclaimed at Versailles in 1871?',
        bullets: [
          'French Emperor Captured at Sedan',
          'German Empire Crowned at Versailles',
          'Prussia Dominates Europe',
        ],
        focusClue:
          'Why did crowning Kaiser Wilhelm I inside France’s historic royal palace deliberately humiliate French national pride?',
      },
      {
        step: 3,
        date: 'May 1871',
        paraRef: '[1.3]',
        questionHeading: 'Why did the annexation of Alsace-Lorraine shatter peace?',
        bullets: [
          'French Forced to Pay 5 Billion',
          'Losing Coal and Iron Land',
          'Hatred Between France and Germany',
        ],
        focusClue:
          'How did seizing mineral-rich border provinces guarantee an unbridgeable diplomatic gulf between France and Germany?',
      },
      {
        step: 4,
        date: '1871–1889',
        paraRef: '[1.4]',
        questionHeading: 'In what ways did French "Revanche" shape patriotic culture?',
        bullets: [
          'Classroom Maps Veiled in Black',
          'Dreaming of French Revenge',
          'Army Conscription for Boys',
        ],
        focusClue:
          'Why did generations of French schoolchildren grow up viewing the recovery of the lost provinces as a sacred patriotic duty?',
      },
      {
        step: 5,
        date: '1871–1890',
        paraRef: '[1.5]',
        questionHeading: "Evaluate how Bismarck's diplomacy isolated the French Republic.",
        bullets: [
          'Secret Deal with Russia',
          'Fear of War on Two Fronts',
          'Keeping France Isolated',
        ],
        focusClue:
          'Why was preventing a simultaneous military encirclement by France and Russia Bismarck’s supreme strategic obsession?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between <strong>Realpolitik</strong> (practical, ruthless statecraft based on national self-interest and military strength) and <strong>Revanche</strong> (the deep-seated French national desire for vengeance and the recovery of Alsace-Lorraine):',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      badge: 'EXTENDED WRITING PRACTICE',
      examStem:
        'Explain why the creation of the German Empire in 1871 created long-term instability in Europe. [12 marks]',
      stimulus: ['The annexation of Alsace-Lorraine', 'Bismarck’s dread of a two-front war'],
      connectives:
        'A decisive factor was... &bull; This led directly to... &bull; Furthermore... &bull; In consequence of this... &bull; Ultimately, this meant that...',
      wordBank:
        'Otto von Bismarck &bull; Realpolitik &bull; Blood and Iron &bull; Hall of Mirrors &bull; Treaty of Frankfurt &bull; Alsace-Lorraine &bull; Revanche &bull; Balance of Power &bull; Two-Front War',
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 1 (1871 Proclamation of the German Empire at Versailles) using dual-coding symbols and key dates.',
    },
    leftPageQuip:
      'In 1871, Bismarck crowned Wilhelm I inside the Hall of Mirrors at Versailles, deliberately inflicting a deep wound on French national pride.',
    rightPageQuip:
      'French classrooms veiled maps of Alsace-Lorraine in black crepe, conditioning generations of schoolboys for inevitable revenge.',
  },
  {
    lessonNum: 2,
    id: 'lesson_2',
    title: 'Enquiry 2: Imperial Rivalry, the Scramble for Africa & the Moroccan Crises (1884–1911)',
    enquiryQuestion:
      'How did imperial ambition in Africa and Kaiser Wilhelm II’s "Weltpolitik" bring European powers to the brink of war?',
    specAnchor:
      'Scramble for Africa (1881–1914); Berlin West Africa Conference (1884–85) and rules of effective occupation; Kaiser Wilhelm II dismisses Bismarck (1890) and demands Germany’s "place in the sun"; Weltpolitik ("World Policy"); First Moroccan Crisis & Kaiser’s landing at Tangier (1905); Algeciras Conference (1906); Second Moroccan Crisis & gunboat Panther at Agadir (1911); Mansion House speech; consolidation of the Anglo-French Entente Cordiale.',
    stages: [
      {
        step: 1,
        date: '1884–1885',
        paraRef: '[2.1]',
        questionHeading: 'Why did European empires carve up Africa in the 1880s Scramble?',
        bullets: [
          'Carving Up African Land',
          'Rubber, Copper & Mineral Riches',
          'Rules Made at Berlin Meeting',
        ],
        focusClue:
          'How did Bismarck use the Berlin Conference to establish rules of "effective occupation" to prevent European wars over colonies?',
      },
      {
        step: 2,
        date: '1890–1897',
        paraRef: '[2.2]',
        questionHeading: 'Explain why Wilhelm II launched "Weltpolitik" in the 1890s.',
        bullets: [
          'Kaiser Sacks Old Bismarck',
          'Demanding a Place in the Sun',
          'Building a German Empire',
        ],
        focusClue:
          'Why did Wilhelm II abandon Bismarck’s cautious European balance in favor of an aggressive worldwide imperial presence?',
      },
      {
        step: 3,
        date: 'March 1905',
        paraRef: '[2.3]',
        questionHeading: 'What happened when the Kaiser landed at Tangier in 1905?',
        bullets: [
          'Kaiser Rides White Horse',
          'Testing Britain and France',
          'Promising to Protect Morocco',
        ],
        focusClue:
          'How did the Kaiser attempt to humiliate France and shatter the 1904 Entente Cordiale, and why did it backfire?',
      },
      {
        step: 4,
        date: '1906',
        paraRef: '[2.4]',
        questionHeading: 'To what extent did the 1906 Algeciras Conference isolate Germany?',
        bullets: [
          'Germany Defeated in Vote',
          'Britain Backs Up France',
          'Fearing Being Surrounded',
        ],
        focusClue:
          'Why did twelve nations vote with France, leaving Germany bitter, isolated, and increasingly convinced of hostile encirclement?',
      },
      {
        step: 5,
        date: 'July 1911',
        paraRef: '[2.5]',
        questionHeading: 'Why did the gunboat Panther at Agadir bring Europe close to war?',
        bullets: [
          'Gunboat Sent to Bully France',
          'Lloyd George Issues Warning',
          'Britain and France Plan for War',
        ],
        focusClue:
          'How did sending a warship to Morocco lead David Lloyd George to issue a stern public warning and trigger joint military planning?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between <strong>Weltpolitik</strong> (Kaiser Wilhelm II’s aggressive world policy demanding a global German colonial empire) and <strong>Gunboat Diplomacy</strong> (using military naval warships to intimidate rival governments into surrendering territory):',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question:
          'Describe two features of the 1911 Agadir Crisis (Second Moroccan Crisis). [4 marks]',
      },
      partB: {
        tariff: 'Question 2: Explain One Consequence [4 marks &bull; 5 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain one consequence of the Moroccan Crises for relations between Great Britain and France. [4 marks]',
        stimulus: ['The 1906 Algeciras Conference', 'The 1911 Mansion House Speech'],
        connectives:
          'A decisive consequence was... &bull; This happened because... &bull; As a direct result... &bull; Consequently, this led to... &bull; Ultimately, this meant that...',
        wordBank:
          'Kaiser Wilhelm II &bull; Weltpolitik &bull; Tangier (1905) &bull; Algeciras Conference &bull; Panther at Agadir (1911) &bull; David Lloyd George &bull; Mansion House Speech &bull; Entente Cordiale',
      },
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 3 (The Berlin Conference) and Milestone 7 (The Panther at Agadir) using dual-coding sketches and dates.',
    },
    leftPageQuip:
      'The Berlin Conference of 1884–85 carved up the African continent with rulers and pencils, completely ignoring indigenous cultures and borders.',
    rightPageQuip:
      'Sending the gunboat Panther to Agadir was meant to bully France; instead, it cemented Britain and France into unified military defense.',
  },
  {
    lessonNum: 3,
    id: 'lesson_3',
    title: 'Enquiry 3: The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)',
    enquiryQuestion:
      'Why did a battleship building contest destroy Anglo-German relations and reset naval supremacy?',
    specAnchor:
      'Britain’s island dependence on maritime trade; the Two-Power Standard; Admiral Alfred von Tirpitz and the German Naval Laws (1898, 1900); Tirpitz’s "Risk Theory"; Admiral Sir John Fisher and naval revolution; launch of HMS Dreadnought (1906); 1909 British naval panic ("We want eight and we won’t wait!"); economic costs and super-dreadnoughts; failure of the 1912 Haldane Mission.',
    stages: [
      {
        step: 1,
        date: '1889–1897',
        paraRef: '[3.1]',
        questionHeading: "Why was naval supremacy vital for Great Britain's survival?",
        bullets: [
          'Britain Surrounded by Sea',
          'Food Brought by Ships',
          'Fleet Twice as Big as Rivals',
        ],
        focusClue:
          'Why did Britain require a fleet equal to the next two navies combined, and why was any threat to the North Sea intolerable?',
      },
      {
        step: 2,
        date: '1898–1900',
        paraRef: '[3.2]',
        questionHeading: 'How did Tirpitz\'s "Risk Theory" plan to challenge the Royal Navy?',
        bullets: [
          'Tirpitz Plans High Seas Fleet',
          'Building Warships in North Sea',
          'Threatening British Waters',
        ],
        focusClue:
          'How did Tirpitz calculate that building a lethal German battlefleet in the North Sea would force Britain into diplomatic concessions?',
      },
      {
        step: 3,
        date: 'February 1906',
        paraRef: '[3.3]',
        questionHeading: 'Why did HMS Dreadnought reset naval supremacy to zero?',
        bullets: [
          'Ten Huge 12-Inch Guns',
          'Fast Steam Turbine Engines',
          'Old Battleships Now Useless',
        ],
        focusClue:
          'Why did Admiral Fisher’s revolutionary warship wipe out Britain’s enormous numerical advantage over other navies?',
      },
      {
        step: 4,
        date: '1909',
        paraRef: '[3.4]',
        questionHeading: 'What triggered the 1909 British naval panic ("We want eight")?',
        bullets: [
          'Fearing Secret German Docks',
          'Newspaper Headlines Cause Panic',
          'Building Eight Battleships',
        ],
        focusClue:
          'How did newspaper headlines and patriotic paranoia compel the British Liberal government to double its battleship construction budget?',
      },
      {
        step: 5,
        date: '1912–1914',
        paraRef: '[3.5]',
        questionHeading: 'Evaluate why the 1912 Haldane Mission failed to stop the arms race.',
        bullets: [
          'Talks in Berlin Fail',
          'Germany Refuses to Stop Building',
          'Royal Navy Ships Guard North Sea',
        ],
        focusClue:
          'Why did Germany’s refusal to halt naval expansion drive Britain to redeploy its Mediterranean fleet to the North Sea in partnership with France?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between the <strong>Two-Power Standard</strong> (Britain’s statutory doctrine that its navy must equal the combined strength of the next two largest navies) and <strong>Risk Theory</strong> (Admiral Tirpitz’s calculation that a powerful German battlefleet would deter Britain from risking war):',
    rightPage: {
      type: 'interpretations',
      tariff: 'Question 3: Historiographical Analysis [8 marks &bull; 10 mins]',
      badge: 'HISTORIOGRAPHICAL ANALYSIS',
      interpretation1: {
        author: 'Professor Paul Kennedy &bull; The Rise of Anglo-German Antagonism',
        text: '“The naval race was the single most dangerous element in pre-1914 European diplomacy. For Britain, naval supremacy was not a luxury; it was the foundation of national survival and empire. When Germany began massing battleships directly across the North Sea, it transformed what had been friendly commercial relations into bitter existential suspicion. British leaders concluded that a German battlefleet could only be designed for one purpose: to destroy British naval power and dominate Europe.”',
      },
      interpretation2: {
        author: 'Professor Christopher Clark &bull; The Sleepwalkers',
        text: '“Historians have greatly exaggerated the fatal impact of the naval race. By 1912, the battleship race was effectively over: Germany had abandoned the contest to concentrate resources on its land army, while Britain retained an insurmountable dreadnought lead. What ultimately triggered the catastrophe was not steel battleships in the North Sea, but unstable ethnic nationalism, crumbling imperial frontiers, and fatal alliance commitments in the volatile Balkan peninsula.”',
      },
      questionB:
        'Study Interpretations 1 and 2. How do they differ about the causes of the Anglo-German naval arms race? [4 marks]',
      questionC:
        'Suggest one reason why Interpretations 1 and 2 differ about the causes of the naval arms race. [4 marks]',
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 6 (1906 Launch of HMS Dreadnought) using dual-coding symbols, gun turrets, and turbine funnels.',
    },
    leftPageQuip:
      'HMS Dreadnought possessed ten 12-inch guns and turbine engines, rendering every battleship on earth instantly obsolete on 10 February 1906.',
    rightPageQuip:
      'In 1909, British public dread of secret German dockyard construction forced Parliament to build eight super-dreadnoughts instead of four.',
  },
  {
    lessonNum: 4,
    id: 'lesson_4',
    title: 'Enquiry 4: The Alliance Systems & the Balkan Powder Keg (1879–1913)',
    enquiryQuestion:
      'Did European military alliances protect continental peace or guarantee a domino-effect catastrophe?',
    specAnchor:
      'The Dual Alliance (1879) and Triple Alliance (1882); Franco-Russian Military Alliance (1894); Entente Cordiale (1904) and Anglo-Russian Convention (1907) creating the Triple Entente; decay of the Ottoman Empire; Pan-Slavic nationalism; Austrian annexation of Bosnia-Herzegovina (1908); Russian diplomatic humiliation; Balkan Wars (1912–13); Serbia as a grave threat to the Austro-Hungarian Empire.',
    stages: [
      {
        step: 1,
        date: '1879–1882',
        paraRef: '[4.1]',
        questionHeading: "How did Bismarck's Dual Alliance create a Central European bloc?",
        bullets: [
          'Germany Backs Austria',
          'Italy Joins the Triple Alliance',
          'Promise of Help Against Russia',
        ],
        focusClue:
          'Why did Germany and Austria-Hungary pledge to defend each other if attacked by Russia, and how did Italy join the bloc?',
      },
      {
        step: 2,
        date: '1894–1907',
        paraRef: '[4.2]',
        questionHeading: 'Explain why the 1894 Franco-Russian Alliance broke isolation.',
        bullets: [
          'French Money Helps Russia',
          'Britain and France Shake Hands',
          'Triple Entente Formed',
        ],
        focusClue:
          'How did democratic Britain, republican France, and autocratic Tsarist Russia unite to counterbalance German military dominance?',
      },
      {
        step: 3,
        date: '1900–1908',
        paraRef: '[4.3]',
        questionHeading: 'Why was south-eastern Europe known as the "Balkan Powder Keg"?',
        bullets: [
          'Ottoman Empire Falling Apart',
          'Slavic Peoples Want Freedom',
          'Austria Clashes with Russia',
        ],
        focusClue:
          'How did the collapse of Ottoman authority create a dangerous power vacuum that both Austria and Russia sought to control?',
      },
      {
        step: 4,
        date: 'October 1908',
        paraRef: '[4.4]',
        questionHeading: 'What were the consequences of the 1908 Bosnian Annexation Crisis?',
        bullets: [
          'Austria Grabs Bosnia',
          'Serbian Fury at Land Grab',
          'Russia Forced to Back Down',
        ],
        focusClue:
          'Why did being forced to back down under German military threats convince Russia never to retreat in the Balkans again?',
      },
      {
        step: 5,
        date: '1912–1913',
        paraRef: '[4.5]',
        questionHeading: 'To what extent did the 1912–13 Balkan Wars embolden Serbia?',
        bullets: [
          'Serbia Wins Two Wars',
          'Double the Land and Army',
          'Austria Plans to Crush Serbia',
        ],
        focusClue:
          'Why did Austro-Hungarian generals in Vienna conclude that Serbia must be militarily crushed before its Slavic nationalism tore the empire apart?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between the <strong>Triple Alliance</strong> (Germany, Austria-Hungary, and Italy) and the <strong>Triple Entente</strong> (Great Britain, France, and Russia), highlighting why these competing blocs turned local crises into continental tripwires:',
    rightPage: {
      type: 'equal_split',
      partA: {
        tariff: 'Question 1: Narrative Account [8 marks &bull; 10 mins]',
        badge: 'PART A &bull; NARRATIVE',
        question:
          'Write a narrative account analysing how crises in the Balkans between 1908 and 1913 increased European tension. [8 marks]',
        stimulus: ['The Bosnian Annexation Crisis (1908)', 'The Balkan Wars (1912–1913)'],
        connectives:
          'Initially... &bull; This led directly to... &bull; Following this... &bull; Consequently... &bull; As an outcome of this...',
        wordBank:
          'Balkan Powder Keg &bull; Bosnia-Herzegovina &bull; Pan-Slavism &bull; Tsar Nicholas II &bull; Franz Joseph &bull; Greater Serbia &bull; Balkan Wars &bull; pre-emptive war',
      },
      partB: {
        tariff: 'Question 2: Explain Importance [8 marks &bull; 10 mins]',
        badge: 'PART B &bull; IMPORTANCE',
        question:
          'Explain the importance of the alliance systems for relations between European great powers before 1914. [8 marks]',
        stimulus: ['The Triple Alliance (1882)', 'The Triple Entente (1907)'],
        connectives:
          'A decisive factor was... &bull; This was important because... &bull; Furthermore... &bull; As a direct result... &bull; Ultimately, this meant that...',
        wordBank:
          'Dual Alliance &bull; Triple Alliance &bull; Franco-Russian Alliance &bull; Entente Cordiale &bull; Triple Entente &bull; Balance of Power &bull; Encirclement &bull; Domino Effect',
      },
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 4 (Bismarck Dismissed) and Milestone 7 (Bosnian Crisis) using dual-coding symbols and dates.',
    },
    leftPageQuip:
      'The European alliance system was designed to deter war through mutual balance; instead, it acted like a string of linked dynamite.',
    rightPageQuip:
      'When Austria annexed Bosnia in 1908, Russia was forced to back down under German threats, vowing never to be humiliated in the Balkans again.',
  },
  {
    lessonNum: 5,
    id: 'lesson_5',
    title: 'Enquiry 5: The July Crisis: Sarajevo to the Outbreak of War (June–August 1914)',
    enquiryQuestion:
      'Why did a single assassination in Sarajevo ignite thirty-seven days of diplomatic madness and world war?',
    specAnchor:
      'Archduke Franz Ferdinand inspects Sarajevo (28 June 1914); Young Bosnia and Gavrilo Princip; the Black Hand (Unity or Death) and Apis; the assassination at the Latin Bridge; Kaiser Wilhelm II issues the "Blank Cheque" (5 July); the Austro-Hungarian Ultimatum (23 July); Russian general mobilization (30 July); the Schlieffen Plan; German invasion of neutral Belgium; Britain issues an ultimatum and declares war (4 August 1914).',
    stages: [
      {
        step: 1,
        date: '28 June 1914',
        paraRef: '[5.1]',
        questionHeading:
          'What motivated the Black Hand to assassinate Franz Ferdinand in Sarajevo?',
        bullets: [
          'Open-Top Car in Sarajevo',
          'Wrong Turn at the Sandwich Shop',
          'Gavrilo Princip Fires Two Shots',
        ],
        focusClue:
          'How did a wrong turn outside Schiller’s Delicatessen beside the Latin Bridge place the Archduke directly before 19-year-old Gavrilo Princip?',
      },
      {
        step: 2,
        date: '5 July 1914',
        paraRef: '[5.2]',
        questionHeading: 'How did Germany\'s "Blank Cheque" escalate the regional crisis?',
        bullets: [
          'Kaiser Promises Total Support',
          'Blank Cheque Given to Austria',
          'Ready to Attack Serbia',
        ],
        focusClue:
          'Why did Austrian leaders wait to attack Serbia until Germany promised total military support even if Russia intervened?',
      },
      {
        step: 3,
        date: '23–25 July 1914',
        paraRef: '[5.3]',
        questionHeading: 'Explain why Austria’s Ten-Point Ultimatum made war inevitable.',
        bullets: [
          'Harsh Ten-Point Demands',
          'Demanding Austrian Police in Belgrade',
          'Shelling Serbia from the River',
        ],
        focusClue:
          'How did Austria draft terms that violated Serbian national sovereignty, and why did Austria declare war despite Serbia accepting eight points?',
      },
      {
        step: 4,
        date: '29–31 July 1914',
        paraRef: '[5.4]',
        questionHeading:
          'In what ways did rigid railway mobilisation schedules trigger the domino effect?',
        bullets: [
          'Russian Millions Call Up to War',
          'Soldiers Boarding Trains',
          'Clock Ticking for Generals',
        ],
        focusClue:
          'Why did military mobilisations rely on rigid railroad schedules that generals claimed could not be halted without risking total defeat?',
      },
      {
        step: 5,
        date: '1–4 August 1914',
        paraRef: '[5.5]',
        questionHeading:
          'What forced Great Britain to declare war following the invasion of Belgium?',
        bullets: [
          'German Troops March into Belgium',
          'Scrap of Paper Treaty Broken',
          'Britain Enters the War at Midnight',
        ],
        focusClue:
          'How did Germany’s plan to defeat France in six weeks by marching through neutral Belgium force Britain to honour its treaty pledge?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between the <strong>Blank Cheque</strong> (Germany’s unconditional guarantee of military backing to Austria) and the <strong>Schlieffen Plan</strong> (Germany’s rigid military timetable to rapidly defeat France by invading through neutral Belgium):',
    rightPage: {
      type: 'single_12',
      tariff: 'Question 5: Evaluative Statement Essay [12 marks &bull; 15 mins]',
      badge: 'SYNOPTIC HISTORICAL VERDICT',
      examStem:
        '“The main cause of the First World War was alliance rivalries.” How far do you agree? Explain your answer. [12 marks]',
      stimulus: [
        'The Triple Alliance and Triple Entente rivalries',
        'The assassination of Archduke Franz Ferdinand',
      ],
      connectives:
        'On one hand, it can be argued that... &bull; A decisive factor supporting this is... &bull; On the other hand... &bull; An alternative argument is that... &bull; In the final analysis...',
      wordBank:
        'Alliance Rivalries &bull; Triple Alliance &bull; Triple Entente &bull; Balance of Power &bull; Franz Ferdinand &bull; Blank Cheque &bull; Sarajevo &bull; Schlieffen Plan &bull; Neutrality of Belgium',
      timelineMissionTitle: 'Living Timeline Mission',
      timelineMission:
        'Turn to Centrefold (Pages 8–9). Complete Milestone 8 (28 June 1914 Sarajevo Assassination) using dual-coding symbols, motorcar, and Latin Bridge.',
    },
    leftPageQuip:
      'A wrong turn by Franz Ferdinand’s chauffeur outside Schiller’s Delicatessen brought the Archduke face to face with Gavrilo Princip.',
    rightPageQuip:
      'On 4 August 1914, Britain went to war to uphold the 1839 Treaty of London, defending Belgian neutrality against German invasion.',
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
            YEAR 9 &bull; CAUSES OF THE GREAT WAR: 1871–1914
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

function renderRightPage(cfg, pageNum) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const rp = cfg.rightPage;

  if (rp.type === 'single_12') {
    // 12-MARK CAUSAL / EVALUATIVE ESSAY WRITING (MATCHING CROWN GOLD STANDARD)
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
    // DUAL HISTORIOGRAPHICAL INTERPRETATIONS WRITING (MATCHING CROWN GOLD STANDARD)
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
    // EQUAL-SPLIT ROTATING SKILLS WRITING (E.G. TWO 8-MARK QUESTIONS WITH 14 LINES EACH)
    const partA = rp.partA || {};
    const partB = rp.partB || {};

    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • EQUAL SPLIT WRITING [8 MARKS + 8 MARKS] -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- PART A: QUESTION 1 [8 MARKS] -->
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
          General Notes
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
function compileGreatWarWorkbook() {
  const coverImgBase64 =
    getBase64Image('public/images/great_war_cover.jpg') ||
    getBase64Image('images/great_war_cover.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Causes of the Great War (1871–1914) Pupil Workbook</title>
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
  <!-- PAGE 1: FRONT COVER (STANDARDIZED MONARCHY GOLD STANDARD)            -->
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
            ORIGINS OF THE FIRST WORLD WAR &bull; 1871–1914
          </div>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 15pt; font-weight: 900; margin: 0; line-height: 1.15; letter-spacing: 0.3px;">
            Causes of the Great War (1871–1914)
          </h1>
          <div style="font-family: 'Georgia', serif; font-size: 8.5pt; font-style: italic; color: #e2e8f0; margin-top: 2px;">
            From Bismarckian Unification &amp; Imperial Rivalry to the Guns of August 1914
          </div>
        </div>
        <div style="text-align: right; border-left: 1.5px solid rgba(255,255,255,0.25); padding-left: 12px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #ffffff;">5 ENQUIRIES</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #93c5fd; text-transform: uppercase;">16-Page Standard</div>
        </div>
      </div>

      <!-- Curated Primary Source Feature Plate: HMS Dreadnought (80mm Frame) -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 6px;">
        <div style="display: grid; grid-template-columns: 142mm 1fr; background: #ffffff;">
          <!-- Primary Photograph Image -->
          <div style="height: 80mm; background: #0f172a; position: relative;">
            <img src="${coverImgBase64}" style="width: 100%; height: 80mm; object-fit: cover; object-position: center; display: block;" alt="Primary Source: HMS Dreadnought">
            <div style="position: absolute; bottom: 8px; left: 6px; background: rgba(15, 40, 78, 0.88); color: #ffffff; padding: 2px 6px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; letter-spacing: 0.4px;">
              PRIMARY PHOTOGRAPH &bull; PORTSMOUTH (c. 1906–1907)
            </div>
          </div>

          <!-- Academic Source Provenance & Context Deck -->
          <div style="padding: 6px 8px; display: flex; flex-direction: column; justify-content: space-between; border-left: 1.5px solid #0f284e; background: #ffffff;">
            <!-- 1. Metadata Label -->
            <div style="border-bottom: 1.2px solid #0f284e; padding-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
                PRIMARY EVIDENCE &bull; NAVAL REVOLUTION
              </span>
            </div>

            <!-- 2. Source Title -->
            <div>
              <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #0f284e; line-height: 1.2;">
                HMS Dreadnought at Sea (1906)
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #475569; margin-top: 1px;">
                Royal Navy Photographic Archives
              </div>
            </div>

            <!-- 3. Archival Description -->
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.22; color: #1e293b;">
              Launched in February 1906 by the British Admiralty, HMS Dreadnought carried ten 12-inch guns and turbine engines, rendering all existing battleships instantly obsolete and resetting the global naval race to zero.
            </div>

            <!-- 4. Historical Significance -->
            <div style="font-family: 'Inter', sans-serif; font-size: 6.3pt; color: #1e293b; line-height: 1.18; background: #f0f4f9; border-left: 2.2px solid #0f284e; padding: 2px 5px;">
              <strong style="text-transform: uppercase; color: #0f284e;">Significance:</strong> The naval arms race transformed Anglo-German trading partners into suspicious military rivals, driving Britain into the Triple Entente with France and Russia.
            </div>

            <!-- 5. Targeted Hinge Question -->
            <div style="background: #ffffff; border: 1.2px solid #0f284e; border-radius: 3px; padding: 2px 5px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">Hinge Question:</span>
              <div style="font-family: 'Georgia', serif; font-size: 6.6pt; font-style: italic; color: #1e293b; line-height: 1.15; margin-top: 1px;">
                Did the launch of HMS Dreadnought protect British imperial security, or did it dangerously erase Britain's established naval advantage?
              </div>
            </div>
          </div>
        </div>

        <!-- Curatorial Strip directly below the grid -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #ffffff; padding: 2.5px 8px; border-top: 1.2px solid #0f284e; background: #0f284e;">
          <span><strong>Vessel Type:</strong> Royal Navy All-Big-Gun Battleship &bull; Steam Turbine Propulsion &bull; 17,900 Tons</span>
          <span style="font-weight: 800; color: #93c5fd; letter-spacing: 0.3px;">PORTSMOUTH DOCKYARD &bull; PENNANT 01</span>
        </div>
      </div>

      <!-- Strategy Overview & Workbook Blueprint -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 6px 8px; background: #f0f4f9; margin: 4px 0 7px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
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
            Targeted extended writing on each right page: causal explanation essays, feature drills, narrative accounts, and contrasting interpretations.
          </div>
        </div>
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; color: #0f284e;">
            3. Centrefold Living Timeline &amp; Notes
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.8pt; line-height: 1.2; color: #1e293b; margin-top: 1px;">
            Centrefold Living Timeline dual-coding sketchpads (pp. 8–9) and dedicated lined notes &amp; essay planning spreads (pp. 14–15).
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
              <td style="padding: 18px 8px; border-right: 1.2px solid #cbd5e1;">
                <div style="font-size: 8.2pt; font-weight: 800; color: #0f284e; line-height: 1.25;">
                  Enquiry 1: German Unification, Franco-Prussian War &amp; Bismarck (1871–1890)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  How did the creation of the German Empire and the seizure of Alsace-Lorraine permanently rupture European peace?
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
                  Enquiry 2: Imperial Rivalry, the Scramble for Africa &amp; the Moroccan Crises (1884–1911)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  How did imperial ambition in Africa and Kaiser Wilhelm II’s "Weltpolitik" bring European powers to the brink of war?
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
                  Enquiry 3: The Anglo-German Naval Arms Race &amp; HMS Dreadnought (1898–1914)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Why did a battleship building contest destroy Anglo-German relations and reset naval supremacy?
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
                  Enquiry 4: The Alliance Systems &amp; the Balkan Powder Keg (1879–1913)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Did European military alliances protect continental peace or guarantee a domino-effect catastrophe?
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
                  Enquiry 5: The July Crisis: Sarajevo to the Outbreak of War (June–August 1914)
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.2pt; font-style: italic; color: #334155; margin-top: 1px; line-height: 1.15;">
                  Why did a single assassination in Sarajevo ignite thirty-seven days of diplomatic madness and world war?
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

      ${renderFooterStrip(1, 'In 1871, the German Empire had a population of 41 million; by 1914, it had surged to 68 million industrial powerhouses.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: ENQUIRY 1 (GERMAN UNIFICATION, FRANCO-PRUSSIAN & BISMARCK)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[0], 2);
  html += renderRightPage(enquiryConfigs[0], 3);

  // ====================================================================
  // PAGES 4–5: ENQUIRY 2 (IMPERIAL RIVALRY & MOROCCAN CRISES)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[1], 4);
  html += renderRightPage(enquiryConfigs[1], 5);

  // ====================================================================
  // PAGES 6–7: ENQUIRY 3 (ANGLO-GERMAN NAVAL ARMS RACE & DREADNOUGHT)
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
            Living Timeline &bull; Part 1: Unification, Imperialism &amp; Dreadnoughts (1871–1906)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 1: 1871 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1871 &bull; Proclamation of the German Empire at Versailles
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Inside the Hall of Mirrors at Versailles, Prussian King Wilhelm I is crowned German Emperor. Bismarck unites 39 states into a dominant military giant, permanently shattering the 1815 balance of power.
          </p>
        </div>

        <!-- Milestone 2: 1871 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1871 &bull; Treaty of Frankfurt &amp; Seizure of Alsace-Lorraine
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            France signs the Treaty of Frankfurt, ceding mineral-rich Alsace-Lorraine and paying a 5 billion franc indemnity. French national "Revanche" is born, permanently poisoning Franco-German relations.
          </p>
        </div>

        <!-- Milestone 3: 1884–1885 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1884–1885 &bull; The Berlin Conference &amp; The Scramble for Africa
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Bismarck hosts European empires in Berlin to carve up Africa under rules of "effective occupation", triggering a furious race for colonial territories, raw materials, and imperial prestige.
          </p>
        </div>

        <!-- Milestone 4: 1890 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1890 &bull; Kaiser Wilhelm II Dismisses Bismarck &amp; Abandons Russia
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2/4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Wilhelm II dismisses Chancellor Bismarck ("Dropping the Pilot") and allows the Reinsurance Treaty with Russia to lapse, opening the door for the 1894 Franco-Russian Alliance and encirclement.
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
            Living Timeline &bull; Part 2: Crises, Alliances &amp; Outbreak of War (1905–1914)
          </h2>
        </div>

        <div style="border: 1px solid #0f284e; border-radius: 3px; background: #f0f4f9; padding: 3px 6px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #1e293b;">
          <strong style="color: #0f284e;">Living Timeline Dual-Coding Protocol:</strong> Complete each milestone sketchpad using dual-coding (combining visual storytelling symbols, causal arrows, and dates) to master the chronological spine across the centre-fold.
        </div>
      </div>

      <!-- 4 Milestones with Open Drawing Area Across Full A4 Page -->
      <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
        
        <!-- Milestone 5: 1905 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1905 &bull; The First Moroccan Crisis &amp; Tangier Landing
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Kaiser Wilhelm II lands at Tangier to disrupt French control of Morocco and test the Entente Cordiale; the 1906 Algeciras Conference humiliates Germany, leaving Berlin bitter and isolated.
          </p>
        </div>

        <!-- Milestone 6: 1906 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1906 &bull; Launch of HMS Dreadnought &amp; Naval Arms Race
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            The Royal Navy launches HMS Dreadnought, making all previous battleships instantly obsolete. Admiral Tirpitz accelerates German naval laws, sparking an intense battleship building contest in the North Sea.
          </p>
        </div>

        <!-- Milestone 7: 1911 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              1911 &bull; The Panther at Agadir (Second Moroccan Crisis)
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Germany sends the gunboat Panther to Agadir, prompting David Lloyd George’s Mansion House warning. Britain and France initiate secret joint military and naval conversations, cementing their alliance.
          </p>
        </div>

        <!-- Milestone 8: 28 June 1914 -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 9.0pt; color: #0f284e;">
              28 June 1914 &bull; The Sarajevo Assassination &amp; Outbreak of War
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #000000; margin: 0; line-height: 1.25;">
            Gavrilo Princip assassinates Archduke Franz Ferdinand in Sarajevo. Germany grants Austria-Hungary the "Blank Cheque", setting off a chain reaction of mobilizations that plunges Europe into world war.
          </p>
        </div>

      </div>

      ${renderFooterStrip(9, 'Between 1871 and 1914, European peace was eroded by imperial ambition, naval rivalry, rigid alliances, and thirty-seven days of diplomatic crisis.', 16)}
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 10–11: ENQUIRY 4 (THE ALLIANCE SYSTEMS & BALKAN POWDER KEG)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[3], 10);
  html += renderRightPage(enquiryConfigs[3], 11);

  // ====================================================================
  // PAGES 12–13: ENQUIRY 5 (THE JULY CRISIS & SARAJEVO OUTBREAK)
  // ====================================================================
  html += renderSpinePage(enquiryConfigs[4], 12);
  html += renderRightPage(enquiryConfigs[4], 13);

  // ====================================================================
  // PAGES 14–15: DEDICATED LINED NOTES PAGES (MATCHING CROWN GOLD STANDARD)
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
              Recalls key historical facts; describes basic pre-war crises using guided sentence starters.
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
              Identifies reasons for events; begins to describe causes of alliance friction, naval rivalry, and the July Crisis.
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
              Explains multiple causes &amp; consequences; writes structured causal paragraphs linking M-A-I-N factors with precise evidence.
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
              Analyses causal interaction; evaluates competing historical interpretations and weighs counter-arguments with detailed evidence.
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
              Sustained, nuanced evaluative judgement; synthesises short-term trigger crises against long-term structural imperial forces across 1871–1914.
            </div>
            <div style="margin-top: 4px; font-size: 6.4pt; font-style: italic; border-top: 1px dashed #93c5fd; padding-top: 2px; color: #1e293b;">
              <strong style="color: #0f284e;">Focus:</strong> Nuanced synoptic judgements.
            </div>
          </div>
        </div>
      </div>

      <!-- Streamlined KS3 Marking Grid (Low-Friction & Periodic Marking Standard) -->
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
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 1: German Unification, Franco-Prussian &amp; Bismarck</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Causal Analysis: Why did the German Empire create instability?</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 2: Imperial Rivalry &amp; Moroccan Crises</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Feature Drill &amp; Consequence of Weltpolitik</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 3: Naval Arms Race &amp; HMS Dreadnought</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Contrasting Interpretations: Causes of Naval Race</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 4: Alliance Systems &amp; Balkan Powder Keg</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Narrative Account &amp; Importance of Alliances</div>
              </td>
              <td style="padding: 21px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 21px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 21px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 21px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.5pt; color: #0f284e;">Enquiry 5: The July Crisis &amp; Sarajevo Outbreak</div>
                <div style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Evaluative Essay: Causes of General European War</div>
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
                'https://the-history-revision-hub.netlify.app/?unit=great_war&lesson=' +
                targetLesson +
                '&quiz=true';
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Unification 1871',
                'Morocco & Africa',
                'Dreadnought Race',
                'Alliances & Balkans',
                'Sarajevo 1914',
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
    'Rendering 16-Page A4 Pupil Workbook (Monarchy Gold Standard): Causes of the Great War (1871–1914)...',
  );

  const html = compileGreatWarWorkbook();

  // Save HTML targets
  const outHtmlPublic = path.join(ROOT_DIR, 'public', 'units', 'great_war', 'pupil_workbook.html');
  const outHtmlUnits = path.join(ROOT_DIR, 'units', 'great_war', 'pupil_workbook.html');

  fs.writeFileSync(outHtmlPublic, html, 'utf8');
  console.log(`[OK] HTML written to: ${outHtmlPublic}`);

  if (fs.existsSync(path.dirname(outHtmlUnits))) {
    fs.writeFileSync(outHtmlUnits, html, 'utf8');
    console.log(`[OK] HTML mirrored to: ${outHtmlUnits}`);
  }

  // Compile PDF via Puppeteer
  console.log('Launching Puppeteer to generate high-resolution print PDF...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const outPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_pupil_workbook.pdf');
  const outPdf16pPath = path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_16p_workbook.pdf');
  const outPdfV17Path = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'great_war_pupil_workbook_FINAL_V17.pdf',
  );
  const outPdfV2Path = path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_pupil_workbook_V2.pdf');

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
  compileGreatWarWorkbook,
  enquiryConfigs,
  lessonConfigs: enquiryConfigs,
};
