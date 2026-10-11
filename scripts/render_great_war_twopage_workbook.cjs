/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/great_war (KS3 Year 9: Causes of the Great War, 1871–1914)
 * Output: public/units/great_war/pupil_workbook.html
 * PDF:    public/pdfs/great_war_pupil_workbook.pdf (and aliases)
 *
 * Gold Standard Publisher Architecture:
 * - 16-Page A4 Pupil Workbook Standard (Monarchy Gold Standard)
 * - Page 1: Master Front Cover with 120mm photo plate, pupil details strip, strategy overview, and 5-Enquiry Specification table
 * - Pages 2–7: Enquiries 1–3 (2-Page Spreads: 5-Stage Causal Narrative Left with [Act.Para] anchors, Disciplinary Writing Practice Right)
 * - Pages 8–9: Centrefold Living Timeline (8 Milestones across 2 pages with 38mm dual-coding sketchpads)
 * - Pages 10–13: Enquiries 4–5 (2-Page Spreads: 5-Stage Causal Narrative Left with [Act.Para] anchors, Disciplinary Writing Practice Right)
 * - Pages 14–15: Dedicated Knowledge Repertoire & Extended Writing Portfolio Spreads
 * - Page 16: Outside Back Cover (5-Enquiry Assessment Ledger, WWW/EBI dialogue, and 5 QR Revision Cards)
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
        paraRef: '[1.1–1.2]',
        questionHeading:
          'What enabled Prussia to overturn the 1815 Congress of Vienna balance of power?',
        bullets: ['39 German States', "Bismarck's Blood & Iron", 'Krupp Industrial Steel'],
        focusClue:
          'How did Prussian military technology, rail networks, and Realpolitik shatter the old fragmented German Confederation?',
      },
      {
        step: 2,
        date: '1870–1871',
        paraRef: '[1.3]',
        questionHeading:
          'How did the Franco-Prussian War culminate in the Hall of Mirrors at Versailles?',
        bullets: ['French Defeat at Sedan', 'Proclamation at Versailles', 'German Empire Born'],
        focusClue:
          'Why did crowning Kaiser Wilhelm I inside France’s historic royal palace deliberately humiliate French national pride?',
      },
      {
        step: 3,
        date: 'May 1871',
        paraRef: '[2.1]',
        questionHeading:
          'Why did the annexation of Alsace-Lorraine make permanent European peace impossible?',
        bullets: ['Treaty of Frankfurt', '5 Billion Franc Indemnity', 'Alsace-Lorraine Annexed'],
        focusClue:
          'How did seizing mineral-rich border provinces guarantee an unbridgeable diplomatic gulf between France and Germany?',
      },
      {
        step: 4,
        date: '1871–1889',
        paraRef: '[2.2–2.3]',
        questionHeading:
          'How did French "Revanche" transform classrooms, literature, and military culture?',
        bullets: ['Maps Veiled in Black', 'Cult of Lost Provinces', 'Compulsory Conscription'],
        focusClue:
          'Why did generations of French schoolchildren grow up viewing the recovery of the lost provinces as a sacred patriotic duty?',
      },
      {
        step: 5,
        date: '1871–1890',
        paraRef: '[2.3]',
        questionHeading:
          'How did Chancellor Bismarck manage European diplomacy to keep France isolated?',
        bullets: [
          'Diplomatic Isolation of France',
          'Reinsurance Treaty with Russia',
          'Dread of Two-Front War',
        ],
        focusClue:
          'Why was preventing a simultaneous military encirclement by France and Russia Bismarck’s supreme strategic obsession?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between <strong>Realpolitik</strong> (practical, ruthless statecraft based on national self-interest and military strength) and <strong>Revanche</strong> (the deep-seated French national desire for vengeance and the recovery of Alsace-Lorraine):',
    rightPage: {
      type: 'essay',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      badge: 'EXTENDED WRITING PRACTICE',
      question:
        'Explain why the creation of the German Empire in 1871 created long-term instability in Europe. [12 marks]',
      planningCols: [
        {
          col: '1. BALANCE OF POWER RUPTURED',
          prompt:
            'Krupp steel, 41m population, and the sudden emergence of a military colossus in central Europe.',
        },
        {
          col: '2. ALSACE-LORRAINE & REVANCHE',
          prompt:
            'Humiliation at Versailles, Treaty of Frankfurt, black-veiled classroom maps, and hatred of Germany.',
        },
        {
          col: '3. FEAR OF TWO-FRONT WAR',
          prompt:
            'Bismarckian alliance web, vulnerability to encirclement, and unstable great power diplomacy.',
        },
      ],
      stems:
        'A primary reason 1871 created instability was... &bull; Specifically, the annexation of Alsace-Lorraine caused... &bull; Furthermore, the sudden military giant overturned... &bull; Consequently, Bismarck was forced to... &bull; In conclusion, the 1871 settlement made long-term peace impossible because...',
      connectives:
        'A fundamental factor was... &bull; In consequence of this... &bull; This directly undermined... &bull; Crucially, this fostered a permanent desire for... &bull; Ultimately, this paved the way for...',
      wordBank:
        'Otto von Bismarck &bull; Realpolitik &bull; Blood and Iron &bull; Hall of Mirrors &bull; Treaty of Frankfurt &bull; Alsace-Lorraine &bull; Revanche &bull; Balance of Power &bull; Two-Front War',
      timelineMissionTitle: 'Centrefold Sketch Challenge 1',
      timelineMission:
        '<strong>Milestone 1 (18 January 1871 &bull; Proclamation at Versailles):</strong> Turn to Centrefold (Pages 8–9). Sketch Chancellor Otto von Bismarck in white uniform standing proudly before Kaiser Wilhelm I on the dais in the Hall of Mirrors [👑 Imperial Crown &bull; 🏰 Mirrored Hall &bull; ⚔️ Prussian Spiked Pickelhaube].',
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
        paraRef: '[3.1]',
        questionHeading:
          'Why did European powers carve up 90% of Africa in the rapid "Scramble for Africa"?',
        bullets: [
          'Berlin Conference (1884)',
          'Raw Materials & Trade Markets',
          'Imperial National Prestige',
        ],
        focusClue:
          'How did Bismarck use the Berlin Conference to establish rules of "effective occupation" to prevent European wars over colonies?',
      },
      {
        step: 2,
        date: '1890–1897',
        paraRef: '[3.2]',
        questionHeading:
          'How did Kaiser Wilhelm II’s "Weltpolitik" fundamentally transform German foreign policy?',
        bullets: ['Bismarck Dismissed (1890)', '"A Place in the Sun"', 'Global Colonial Ambition'],
        focusClue:
          'Why did Wilhelm II abandon Bismarck’s cautious European balance in favor of an aggressive worldwide imperial presence?',
      },
      {
        step: 3,
        date: 'March 1905',
        paraRef: '[3.3]',
        questionHeading:
          'Why did the Kaiser’s dramatic landing at Tangier spark the First Moroccan Crisis?',
        bullets: [
          'Tangier Port Speech',
          'Testing Anglo-French Entente',
          'Sultan’s Independence Backed',
        ],
        focusClue:
          'How did the Kaiser attempt to humiliate France and shatter the 1904 Entente Cordiale, and why did it backfire?',
      },
      {
        step: 4,
        date: '1906',
        paraRef: '[3.4]',
        questionHeading:
          'How did the Algeciras Conference result in a humiliating diplomatic defeat for Berlin?',
        bullets: [
          'Algeciras Conference',
          'Britain Firmly Backs France',
          'Germany Isolated (Austria Alone)',
        ],
        focusClue:
          'Why did twelve nations vote with France, leaving Germany bitter, isolated, and increasingly convinced of hostile encirclement?',
      },
      {
        step: 5,
        date: 'July 1911',
        paraRef: '[3.5]',
        questionHeading:
          'Why did gunboat diplomacy at Agadir push the European powers to the brink of general war?',
        bullets: [
          'Gunboat Panther at Agadir',
          'Mansion House Warning',
          'Secret Anglo-French Military Talks',
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
        stems:
          'Feature 1: One key feature of the Agadir Crisis was... &bull; Detail: Specifically, Germany dispatched the gunboat Panther to... &bull; Feature 2: A second key feature was... &bull; Detail: This escalated tensions because Britain viewed it as an attempt to...',
      },
      partB: {
        tariff: 'Question 2: Explain One Consequence [4 marks &bull; 5 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Explain one consequence of the Moroccan Crises for relations between Great Britain and France. [4 marks]',
        hint: 'Focus on how German diplomatic aggression at Tangier and Agadir drove Britain and France from friendly diplomatic agreement into binding joint naval and military planning.',
        stems:
          'One consequence of the Moroccan Crises was the dramatic deepening of Anglo-French military ties... &bull; Specifically, when Germany challenged French control of Morocco... &bull; Consequently, this united the two nations against German aggression because...',
        connectives:
          'A decisive consequence was... &bull; For example, during the 1906 Algeciras Conference... &bull; This directly resulted in... &bull; Consequently, secret military conversations...',
        wordBank:
          'Kaiser Wilhelm II &bull; Weltpolitik &bull; Tangier (1905) &bull; Algeciras Conference &bull; Panther at Agadir (1911) &bull; David Lloyd George &bull; Mansion House Speech &bull; Entente Cordiale',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenge 2',
      timelineMission:
        '<strong>Milestone 3 (1911 &bull; The Panther at Agadir):</strong> Turn to Centrefold (Pages 8–9). Sketch the German naval gunboat SMS Panther anchored menacingly in the Moroccan harbour with smoking cannon barrels pointing toward the shore [🚢 Gunboat Panther &bull; ⚓ Agadir Bay &bull; 💥 Naval Cannons].',
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
        paraRef: '[4.1]',
        questionHeading:
          'Why was unquestioned naval supremacy a matter of absolute national survival for Great Britain?',
        bullets: [
          'Two-Power Standard (1889)',
          'Island Nation Food Supplies',
          'Defending Global Maritime Empire',
        ],
        focusClue:
          'Why did Britain require a fleet equal to the next two navies combined, and why was any threat to the North Sea intolerable?',
      },
      {
        step: 2,
        date: '1898–1900',
        paraRef: '[4.2]',
        questionHeading:
          'How did Admiral Alfred von Tirpitz’s Naval Laws challenge the Royal Navy’s dominance?',
        bullets: [
          'German Naval Laws',
          'High Seas Fleet Construction',
          'Tirpitz’s "Risk Theory" (Risikotheorie)',
        ],
        focusClue:
          'How did Tirpitz calculate that building a lethal German battlefleet in the North Sea would force Britain into diplomatic concessions?',
      },
      {
        step: 3,
        date: 'February 1906',
        paraRef: '[4.3]',
        questionHeading:
          'How did HMS Dreadnought reset the worldwide naval balance of power to absolute zero?',
        bullets: [
          'All-Big-Gun Battleship',
          'Steam Turbine Propulsion',
          'Pre-Dreadnoughts Instantly Obsolete',
        ],
        focusClue:
          'Why did Admiral Fisher’s revolutionary warship wipe out Britain’s enormous numerical advantage over other navies?',
      },
      {
        step: 4,
        date: '1909',
        paraRef: '[4.4]',
        questionHeading:
          'Why did British public dread trigger the explosive 1909 "Naval Scare" building panic?',
        bullets: [
          '"We Want Eight & Won’t Wait!"',
          'Secret German Dockyard Rivalry',
          'Soaring Tax Burdens',
        ],
        focusClue:
          'How did newspaper headlines and patriotic paranoia compel the British Liberal government to double its battleship construction budget?',
      },
      {
        step: 5,
        date: '1912–1914',
        paraRef: '[4.5]',
        questionHeading:
          'Why did the failure of the 1912 Haldane Mission confirm irreversible military rivalry?',
        bullets: [
          'Lord Haldane in Berlin',
          'Germany Demands British Neutrality',
          'North Sea vs Mediterranean Accord',
        ],
        focusClue:
          'Why did Germany’s refusal to halt naval expansion drive Britain to redeploy its Mediterranean fleet to the North Sea in partnership with France?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between the <strong>Two-Power Standard</strong> (Britain’s statutory doctrine that its navy must equal the combined strength of the next two largest navies) and <strong>Risk Theory</strong> (Admiral Tirpitz’s calculation that a powerful German battlefleet would deter Britain from risking war):',
    rightPage: {
      type: 'interpretation',
      tariff: 'Question 3(b) & 3(c): Contrasting Interpretations [8 marks &bull; 10 mins]',
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
        'What is the main difference between Interpretation 1 and Interpretation 2 regarding the importance of the naval race in causing the First World War? [4 marks]',
      questionC:
        'Explain why Interpretations 1 and 2 differ on whether the naval race made the Great War inevitable. You may use Sources and your own knowledge. [4 marks]',
      stems:
        'The main difference is that Interpretation 1 views the naval race as the primary cause of existential British fear... &bull; In contrast, Interpretation 2 argues that by 1912 the naval race was over and land alliances were far more decisive... &bull; The historians differ because Kennedy focuses on British maritime security, whereas Clark emphasizes the Balkan crisis...',
      timelineMissionTitle: 'Centrefold Sketch Challenge 3',
      timelineMission:
        '<strong>Milestone 6 (10 February 1906 &bull; Launch of HMS Dreadnought):</strong> Turn to Centrefold (Pages 8–9). Sketch HMS Dreadnought cutting through rough ocean waves with its ten heavy 12-inch turrets and smoking turbine funnels [🚢 HMS Dreadnought &bull; 💥 12-inch Gun Turrets &bull; 🌊 North Sea Waves].',
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
        paraRef: '[5.1]',
        questionHeading:
          'How did Chancellor Bismarck construct the Triple Alliance to protect Central Europe?',
        bullets: [
          'Dual Alliance with Austria (1879)',
          'Italy Joins (1882)',
          'Mutual Military Assistance Pacts',
        ],
        focusClue:
          'Why did Germany and Austria-Hungary pledge to defend each other if attacked by Russia, and how did Italy join the bloc?',
      },
      {
        step: 2,
        date: '1894–1907',
        paraRef: '[5.2]',
        questionHeading:
          'How did fear of Germany forge the competing diplomatic bloc of the Triple Entente?',
        bullets: [
          'Franco-Russian Alliance (1894)',
          'Anglo-French Entente (1904)',
          'Anglo-Russian Convention (1907)',
        ],
        focusClue:
          'How did democratic Britain, republican France, and autocratic Tsarist Russia unite to counterbalance German military dominance?',
      },
      {
        step: 3,
        date: '1900–1908',
        paraRef: '[5.3]',
        questionHeading: 'Why was south-eastern Europe known as the volatile "Balkan Powder Keg"?',
        bullets: [
          'Ottoman Imperial Decline',
          'Pan-Slavic Nationalist Dreams',
          'Austro-Russian Strategic Rivalry',
        ],
        focusClue:
          'How did the collapse of Ottoman authority create a dangerous power vacuum that both Austria and Russia sought to control?',
      },
      {
        step: 4,
        date: 'October 1908',
        paraRef: '[5.4]',
        questionHeading:
          'Why was the Bosnian Crisis of 1908 a fatal rehearsal for the outbreak of war in 1914?',
        bullets: [
          'Bosnia-Herzegovina Annexed',
          'Serbian National Fury',
          'Russia Humiliated by German Ultimatum',
        ],
        focusClue:
          'Why did being forced to back down under German military threats convince Russia never to retreat in the Balkans again?',
      },
      {
        step: 5,
        date: '1912–1913',
        paraRef: '[5.5]',
        questionHeading:
          'How did the Balkan Wars double Serbian territory and terrify Austro-Hungarian leaders?',
        bullets: [
          'Balkan League Defeats Turks',
          'Serbian Territory & Army Doubles',
          'Austrian Pre-emptive War Urge',
        ],
        focusClue:
          'Why did Austro-Hungarian generals in Vienna conclude that Serbia must be militarily crushed before its Slavic nationalism tore the empire apart?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between the <strong>Triple Alliance</strong> (Germany, Austria-Hungary, and Italy) and the <strong>Triple Entente</strong> (Great Britain, France, and Russia), highlighting why these competing blocs turned local crises into continental tripwires:',
    rightPage: {
      type: 'split',
      partA: {
        tariff: 'Question 1: Describe Two Features [4 marks &bull; 5 mins]',
        badge: 'FEATURE DRILL',
        question: 'Describe two features of the 1908 Bosnian Crisis. [4 marks]',
        stems:
          'Feature 1: One key feature of the Bosnian Crisis was... &bull; Detail: Specifically, Austria-Hungary annexed Bosnia-Herzegovina, outraging... &bull; Feature 2: A second key feature was... &bull; Detail: When Germany threatened military intervention in support of Austria, Russia was forced to...',
      },
      partB: {
        tariff: 'Question 2: Narrative Account [8 marks &bull; 10 mins]',
        badge: 'STRUCTURED WRITING',
        question:
          'Write a narrative account analysing how crises in the Balkans between 1908 and 1913 increased European tension. You may use: (1) The Bosnian Crisis (1908), (2) The Balkan Wars (1912–1913). [8 marks]',
        hint: 'Structure your narrative chronologically: explain how the 1908 annexation humiliated Russia and enraged Serbia, how the Balkan Wars doubled Serbian territory and army size, and why Austrian generals concluded that pre-emptive war against Serbia was unavoidable.',
        stems:
          'The series of Balkan crises began in 1908 when Austria-Hungary formally annexed Bosnia-Herzegovina... &bull; This created intense fury in Serbia because... &bull; Furthermore, Russia was forced to back down under German ultimatum... &bull; Following this, the Balkan Wars of 1912–13 dramatically escalated tensions because... &bull; Consequently, by 1914 the Balkan Powder Keg was primed to explode...',
        connectives:
          'The initial catalyst occurred when... &bull; This directly triggered... &bull; In response to this humiliation... &bull; The situation deteriorated further when... &bull; As a direct consequence, the great powers...',
        wordBank:
          'Balkan Powder Keg &bull; Bosnia-Herzegovina &bull; Pan-Slavism &bull; Tsar Nicholas II &bull; Franz Joseph &bull; Greater Serbia &bull; Balkan Wars &bull; pre-emptive war &bull; military mobilisation',
      },
      timelineMissionTitle: 'Centrefold Sketch Challenge 4',
      timelineMission:
        '<strong>Milestone 7 (October 1908 &bull; The Bosnian Powder Keg):</strong> Turn to Centrefold (Pages 8–9). Sketch a wooden barrel marked "BALKAN POWDER KEG" with a burning Austrian spark fuse, surrounded by the rival flags of Austria, Serbia, and Russia [🛢️ Gunpowder Barrel &bull; 🧨 Burning Fuse &bull; 🏴 Balkan Flags].',
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
        paraRef: '[6.1–6.2]',
        questionHeading:
          'What happened when Archduke Franz Ferdinand visited Sarajevo on Vidovdan?',
        bullets: [
          'Heir to Austrian Throne Visits',
          'Black Hand Assassination Squad',
          'Princip Fires Fatal Shots',
        ],
        focusClue:
          'How did a wrong turn outside Schiller’s Delicatessen beside the Latin Bridge place the Archduke directly before 19-year-old Gavrilo Princip?',
      },
      {
        step: 2,
        date: '5 July 1914',
        paraRef: '[6.3]',
        questionHeading:
          'Why did Kaiser Wilhelm II’s "Blank Cheque" embolden Austria to risk European war?',
        bullets: [
          'Kaiser’s Unconditional Pledge',
          'Reckless Imperial Brinkmanship',
          'Crushing Serbia Planned',
        ],
        focusClue:
          'Why did Austrian leaders wait to attack Serbia until Germany promised total military support even if Russia intervened?',
      },
      {
        step: 3,
        date: '23–25 July 1914',
        paraRef: '[6.4]',
        questionHeading:
          'Why was the Austro-Hungarian Ten-Point Ultimatum deliberately designed to be rejected?',
        bullets: [
          'Ten Severe Demands',
          'Austrian Police Inside Serbia',
          'War Declared on Serbia (28 July)',
        ],
        focusClue:
          'How did Austria draft terms that violated Serbian national sovereignty, and why did Austria declare war despite Serbia accepting eight points?',
      },
      {
        step: 4,
        date: '29–31 July 1914',
        paraRef: '[6.5]',
        questionHeading:
          'How did inflexible railway timetables and Russian mobilisation trigger the domino effect?',
        bullets: [
          'Tsar Orders General Mobilisation',
          'Inflexible Train Timetables',
          'German Ultimatum to St Petersburg',
        ],
        focusClue:
          'Why did military mobilisations rely on rigid railroad schedules that generals claimed could not be halted without risking total defeat?',
      },
      {
        step: 5,
        date: '1–4 August 1914',
        paraRef: '[6.6]',
        questionHeading:
          'Why did the German Schlieffen Plan force Great Britain into the First World War?',
        bullets: [
          'Schlieffen Plan Invades Belgium',
          '1839 Treaty of London Broken',
          'Britain Enters War (4 August)',
        ],
        focusClue:
          'How did Germany’s plan to defeat France in six weeks by marching through neutral Belgium force Britain to honour its treaty pledge?',
      },
    ],
    vocabPrompt:
      'Explain the crucial distinction between the <strong>Blank Cheque</strong> (Germany’s unconditional guarantee of military backing to Austria) and the <strong>Schlieffen Plan</strong> (Germany’s rigid military timetable to rapidly defeat France by invading through neutral Belgium):',
    rightPage: {
      type: 'essay',
      tariff: 'Question 5: Evaluative Statement Essay [12 marks &bull; 15 mins]',
      badge: 'SYNOPTIC HISTORICAL VERDICT',
      question:
        '“The assassination of Archduke Franz Ferdinand was merely a pretext; the First World War was made inevitable by long-term imperial and alliance rivalries.” How far do you agree? [12 marks]',
      planningCols: [
        {
          col: '1. SARAJEVO & THE JULY CRISIS',
          prompt:
            'Princip’s shots, Austrian determination to crush Serbia, the Blank Cheque, and reckless brinkmanship.',
        },
        {
          col: '2. LONG-TERM M-A-I-N CAUSES',
          prompt:
            'Militarism & arms race, alliance dominoes, imperial clashes (Morocco), and violent nationalism.',
        },
        {
          col: '3. SUBSTANTIATED VERDICT',
          prompt:
            'Weigh whether war would have happened without the Sarajevo trigger, reaching a clear historical judgment.',
        },
      ],
      stems:
        'There is strong evidence that the Sarajevo assassination was merely a pretext... &bull; Specifically, Austrian leaders had long sought an excuse to crush Serbia because... &bull; Furthermore, long-term structural factors including the alliance system... &bull; However, it can also be argued that war was not inevitable because... &bull; In conclusion, the assassination served as the decisive trigger because without it...',
      connectives:
        'On one hand, it is clear that... &bull; For example, long-term rivalries such as... &bull; Conversely, the crisis escalated specifically because... &bull; Crucially, rigid mobilisation timetables meant that... &bull; In the final analysis...',
      wordBank:
        'Archduke Franz Ferdinand &bull; Gavrilo Princip &bull; Black Hand &bull; Blank Cheque &bull; Austro-Hungarian Ultimatum &bull; Mobilisation Timetables &bull; Schlieffen Plan &bull; Neutrality of Belgium &bull; M-A-I-N',
      timelineMissionTitle: 'Centrefold Sketch Challenge 5',
      timelineMission:
        '<strong>Milestone 8 (28 June 1914 &bull; Assassination in Sarajevo):</strong> Turn to Centrefold (Pages 8–9). Sketch the open-top Gräf & Stift motorcar halted beside the Latin Bridge outside Schiller’s Delicatessen, with 19-year-old Gavrilo Princip firing the fatal shots [🚗 Open Motorcar &bull; 🌉 Latin Bridge &bull; 💥 Pistol Muzzle Flash].',
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

  if (rp.type === 'essay') {
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • EXTENDED DISCIPLINARY WRITING -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Departmental Masthead -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 4px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
          ENQUIRY ${cfg.lessonNum} &bull; EXTENDED DISCIPLINARY WRITING
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #475569; letter-spacing: 0.3px;">
          GCSE HISTORY ASSESSMENT SKILLS
        </span>
      </div>

      <!-- Question Title Banner -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 9.8pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
          ${rp.badge}
        </span>
      </div>

      <div style="font-family: 'Playfair Display', serif; font-size: 8.8pt; font-weight: 800; color: #0f284e; margin-bottom: 4px; line-height: 1.22;">
        ${rp.question}
      </div>

      <!-- 3-Column Disciplinary Structure Strip -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; margin-bottom: 4px;">
        ${rp.planningCols
          .map(
            (col) => `
        <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 3px 5px; background: #f0f4f9;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; color: #0f284e; text-transform: uppercase; border-bottom: 0.8px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 1.5px;">
            ${col.col}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 6.5pt; color: #1e293b; line-height: 1.15;">
            ${col.prompt}
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- Sentence Stems & Connectives -->
      <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 2.5px 6px; background: #ffffff; margin-bottom: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.2; margin-bottom: 1.5px;">
          <strong style="color: #0f284e;">Scaffolded Sentence Stems:</strong> <span style="color: #1e293b;">${rp.stems}</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #475569; line-height: 1.18;">
          <strong style="color: #0f284e;">Analytical Connectives:</strong> ${rp.connectives}
        </div>
      </div>

      <!-- Word Bank Box -->
      <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 6px; background: #f8fafc; font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #334155; margin-bottom: 4px;">
        <strong style="color: #0f284e; text-transform: uppercase;">Essential Historical Vocabulary:</strong> ${rp.wordBank}
      </div>

      <!-- Ruled Lines for Extended Response (24 Full Width Lines) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 0; margin-bottom: 4px;">
        ${Array(24)
          .fill(
            '<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>',
          )
          .join('')}
      </div>

      <!-- Timeline Mission Box (Connecting back to Centrefold) -->
      <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
            🎨 ${rp.timelineMissionTitle || 'Centrefold Sketch Challenge'}
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
  } else if (rp.type === 'interpretation') {
    return `
  <!-- LESSON SPREAD: ${isEven ? 'LEFT PAGE (VERSO)' : 'RIGHT PAGE (RECTO)'} • HISTORIOGRAPHICAL DEBATE -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      
      <!-- Top Departmental Masthead -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 4px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
          ENQUIRY ${cfg.lessonNum} &bull; HISTORIOGRAPHICAL ANALYSIS
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #475569; letter-spacing: 0.3px;">
          EDEXCEL PAPER 3 ASSESSMENT SKILLS
        </span>
      </div>

      <!-- Question Title Banner -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 9.8pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${rp.tariff}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">
          ${rp.badge}
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
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 4px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin-bottom: 2px;">
          ${rp.questionB}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>

      <!-- Task C: Question 3(c) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin-bottom: 2px;">
            ${rp.questionC}
          </div>
          <div style="border: 1px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #f0f4f9; font-family: 'Inter', sans-serif; font-size: 6.7pt; line-height: 1.22; margin-bottom: 3px;">
            <strong style="color: #0f284e;">Scaffolded Sentence Stems:</strong> <span style="color: #1e293b;">${rp.stems}</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0; margin-bottom: 3px;">
          ${Array(7).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Centrefold Sketch Challenge'}
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
      
      <!-- Top Departmental Masthead -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 4px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
          ENQUIRY ${cfg.lessonNum} &bull; DISCIPLINARY WRITING PRACTICE
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #475569; letter-spacing: 0.3px;">
          ROTA OF HISTORICAL SKILLS
        </span>
      </div>

      <!-- PART A: SHORT-FORM DISCIPLINARY PRACTICE [4 MARKS] -->
      <div style="border-bottom: 1.5px solid #0f284e; padding-bottom: 4px; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
            ${partA.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
            ${partA.badge}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0;">
          ${partA.question}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 700; margin-bottom: 2px; color: #1e293b;">
          <strong style="color: #0f284e;">Sentence Stems:</strong> ${partA.stems}
        </div>
        <div class="ruled-lines-block">
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
          <div class="task-line"></div>
        </div>
      </div>

      <!-- PART B: EXTENDED PARAGRAPH PRACTICE [4 OR 8 MARKS] -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
            <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
              ${partB.tariff}
            </h2>
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; border: 1px solid #0f284e; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
              ${partB.badge}
            </span>
          </div>
          <p style="font-family: 'Playfair Display', serif; font-size: 8.2pt; font-weight: 800; color: #0f284e; margin: 0 0 2px 0;">
            ${partB.question}
          </p>
          ${partB.hint ? `<div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #475569; margin-bottom: 2px;">${partB.hint}</div>` : ''}
          ${partB.stems ? `<div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; font-weight: 700; margin-bottom: 2px; color: #1e293b;"><strong style="color: #0f284e;">Sentence Stems:</strong> ${partB.stems}</div>` : ''}
          ${partB.connectives ? `<div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.22; background: #f0f4f9; padding: 2px 5px; border-radius: 2px; margin-bottom: 2px;"><strong style="color: #0f284e;">Connectives:</strong> ${partB.connectives}</div>` : ''}
          ${partB.wordBank ? `<div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #334155; margin-bottom: 2px;"><strong style="color: #0f284e; text-transform: uppercase;">Essential Vocabulary:</strong> ${partB.wordBank}</div>` : ''}
        </div>

        <!-- Ruled Lines for Part B -->
        <div style="display: flex; flex-direction: column; gap: 0; flex: 1; min-height: 0; margin-bottom: 3px;">
          ${Array(7).fill('<div class="task-line" style="flex: 1; min-height: 0; border-bottom: 1.2px solid #000000; box-sizing: border-box; margin: 0;"></div>').join('')}
        </div>

        <!-- Timeline Mission Box -->
        <div style="border: 1.2px solid #0f284e; border-radius: 4px; padding: 3px 6px; background: #ffffff; margin-top: 2px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; border-bottom: 1px solid #0f284e; padding-bottom: 1.5px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.9pt; font-weight: 900; background: #0f284e; color: #ffffff; padding: 1.5px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.3px;">
              🎨 ${rp.timelineMissionTitle || 'Centrefold Sketch Challenge'}
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

function renderNotesPage(pageNum, quipText) {
  const isEven = pageNum % 2 === 0;
  const pageClass = isEven ? 'verso-page' : 'recto-page';
  const pageTitle =
    pageNum === 14
      ? 'The Causes of the Great War: Historical Enquiry & Causal Notes'
      : 'The Causes of the Great War: Extended Writing & Essay Planning';
  const tagText = pageNum === 14 ? 'KNOWLEDGE REPERTOIRE' : 'WRITING PRACTICE';

  return `
  <!-- SCHOLAR PORTFOLIO SPREAD: PAGE ${pageNum} -->
  <div class="page page-container ${pageClass}" id="page-${pageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Masthead -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f284e; padding-bottom: 2px; margin-bottom: 4px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
          SCHOLAR INDEPENDENT STUDY &bull; PAGE ${pageNum}
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #475569; letter-spacing: 0.3px;">
          YEAR 9 &bull; CAUSES OF THE GREAT WAR: 1871–1914
        </span>
      </div>

      <!-- Prominent Title Banner -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f284e; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10pt; color: #0f284e; margin: 0; font-weight: 800;">
          ${pageTitle}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">
          ${tagText}
        </span>
      </div>

      <!-- Scholar Guidance Strip -->
      <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; line-height: 1.25; background: #f0f4f9; border-left: 2.5px solid #0f284e; padding: 3px 6px; margin-bottom: 4px;">
        <strong style="color: #0f284e;">Scholar Note-Taking Protocol:</strong> Record structured evidence, comparative causal tables, key primary quotes, or plan your end-of-unit synoptic essays using the Cornell margins and ruled lines below.
      </div>

      <!-- Cornell Style Lined Grid -->
      <div style="flex: 1; display: grid; grid-template-columns: 52mm 1fr; gap: 8px; border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 2px; min-height: 0;">
        <!-- Left Margin: Key Cues / Flashcard Terms -->
        <div style="border-right: 1.2px dashed #0f284e; padding-right: 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; color: #0f284e; text-transform: uppercase; border-bottom: 1px solid #0f284e; padding-bottom: 1px; margin-bottom: 4px;">
            Cues &bull; Flashcard Terms
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px; font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #475569;">
            <div>&bull; Militarism &amp; Arms Race</div>
            <div>&bull; Alliance Dominoes</div>
            <div>&bull; Imperial Scramble</div>
            <div>&bull; Balkan Nationalism</div>
            <div>&bull; July Crisis Spark</div>
            <div>&bull; Primary Quotes / Stats</div>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6pt; font-style: italic; color: #64748b; margin-top: auto; border-top: 1px solid #cbd5e1; padding-top: 2px;">
            Write review cues here &uarr;
          </div>
        </div>

        <!-- Right Grid: Ruled Writing Lines (27 Full Lines) -->
        <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
          ${Array(27)
            .fill(
              '<div class="task-line" style="border-bottom: 1.2px solid #000000; height: 7.2mm; box-sizing: border-box; margin: 0;"></div>',
            )
            .join('')}
        </div>
      </div>

      ${renderFooterStrip(pageNum, quipText, 16)}
    </div>
  </div>`;
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
    }
    .ruled-lines-block {
      display: flex;
      flex-direction: column;
      gap: 0;
      margin-top: 2px;
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
  // PAGE 1: FRONT COVER (GCSE High Contrast & 120mm Primary Plate)
  // ====================================================================
  html += `
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 6px;">
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
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 7.5px 12px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
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

      <!-- Unit Title & Subtitle Banner -->
      <div style="background: #0f284e; color: #ffffff; border-radius: 4px; padding: 7.5px 12px; margin-bottom: 7px; display: flex; justify-content: space-between; align-items: center;">
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

      <!-- Curated Primary Source Feature Plate: HMS Dreadnought (120mm Frame) -->
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
              <td style="padding: 16px 8px; border-right: 1.2px solid #cbd5e1;">
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
              <td style="padding: 16px 8px; border-right: 1.2px solid #cbd5e1;">
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
              <td style="padding: 16px 8px; border-right: 1.2px solid #cbd5e1;">
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
              <td style="padding: 16px 8px; border-right: 1.2px solid #cbd5e1;">
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
              <td style="padding: 16px 8px; border-right: 1.2px solid #cbd5e1;">
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
  // PAGES 8–9: CENTREFOLD LIVING TIMELINE (1871–1914 PANORAMA)
  // ====================================================================
  html += `
  <!-- CENTREFOLD LIVING TIMELINE: SPREAD PART 1 (PAGE 8) -->
  <div class="page page-container verso-page" id="page-8" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Centrefold Header Strip -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 2px; margin-bottom: 4px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
          LIVING TIMELINE &bull; PART 1: UNIFICATION, IMPERIALISM &amp; DIPLOMACY (1871–1904)
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          PAGES 8–9 CENTREFOLD
        </span>
      </div>

      <!-- Chronological Milestones Grid (4 Rows) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 4px; min-height: 0;">
        
        <!-- Milestone 1: 18 January 1871 -->
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f284e;">
                18 January 1871 &bull; Proclamation of the German Empire at Versailles
              </strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; margin: 0; line-height: 1.2;">
            Inside the Hall of Mirrors at Versailles, Prussian King Wilhelm I is crowned German Emperor. Bismarck unites 39 states into a dominant military giant, rupturing the 1815 balance of power.
          </p>
          <div style="border: 1px dashed #0f284e; border-radius: 2px; height: 36mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #64748b;">
              ✏️ SKETCH CHALLENGE 1: Crowned Kaiser Wilhelm I &amp; Chancellor Bismarck in uniform in the Hall of Mirrors [👑 Imperial Crown &bull; 🏰 Mirrored Hall &bull; ⚔️ Pickelhaube Helmet]
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #94a3b8; text-align: right;">Dual-Coding Sketchpad &bull; Use fine ink or pencil</span>
          </div>
        </div>

        <!-- Milestone 2: 10 May 1871 -->
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f284e;">
                10 May 1871 &bull; Treaty of Frankfurt &amp; Seizure of Alsace-Lorraine
              </strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px;">Enquiry 1</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; margin: 0; line-height: 1.2;">
            France signs the Treaty of Frankfurt, ceding mineral-rich Alsace-Lorraine and paying a 5 billion franc indemnity. French national "Revanche" is born, permanently poisoning relations.
          </p>
          <div style="border: 1px dashed #0f284e; border-radius: 2px; height: 36mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #64748b;">
              ✏️ SKETCH CHALLENGE 2: French classroom map of Alsace-Lorraine veiled in black crepe [🗺️ Border Province Map &bull; ⬛ Black Mourning Veil &bull; 🏫 French Schoolchildren]
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #94a3b8; text-align: right;">Dual-Coding Sketchpad &bull; Use fine ink or pencil</span>
          </div>
        </div>

        <!-- Milestone 3: 1884–1885 -->
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f284e;">
                1884–1885 &bull; The Berlin West Africa Conference &amp; Colonial Partition
              </strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px;">Enquiry 2</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; margin: 0; line-height: 1.2;">
            Bismarck hosts European empires in Berlin to carve up the African continent under rules of "effective occupation", triggering the rapid Scramble for Africa and commercial friction.
          </p>
          <div style="border: 1px dashed #0f284e; border-radius: 2px; height: 36mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #64748b;">
              ✏️ SKETCH CHALLENGE 3: European diplomats carving an African continent cake with a knife [🎂 African Continent Cake &bull; 🔪 Carving Knife &bull; 👑 European Empires]
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #94a3b8; text-align: right;">Dual-Coding Sketchpad &bull; Use fine ink or pencil</span>
          </div>
        </div>

        <!-- Milestone 4: March 1890 -->
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f284e;">
                March 1890 &bull; Kaiser Wilhelm II Dismisses Bismarck &amp; Abandons Russia
              </strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px;">Enquiry 2/4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; margin: 0; line-height: 1.2;">
            Young Kaiser Wilhelm II forces Bismarck to resign ("Dropping the Pilot"). He allows the Reinsurance Treaty with Russia to lapse, opening the door for the 1894 Franco-Russian Alliance.
          </p>
          <div style="border: 1px dashed #0f284e; border-radius: 2px; height: 36mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #64748b;">
              ✏️ SKETCH CHALLENGE 4: Bismarck walking down the ship gangplank while Wilhelm II looks on ("Dropping the Pilot") [⚓ Imperial Ship &bull; 🚶 Bismarck Disembarking &bull; 👑 Wilhelm II]
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #94a3b8; text-align: right;">Dual-Coding Sketchpad &bull; Use fine ink or pencil</span>
          </div>
        </div>

      </div>

      ${renderFooterStrip(8, 'Between 1871 and 1890, Bismarck kept France isolated through complex alliances; Wilhelm II wrecked this system in a single decade.', 16)}
    </div>
  </div>

  <!-- CENTREFOLD LIVING TIMELINE: SPREAD PART 2 (PAGE 9) -->
  <div class="page page-container recto-page" id="page-9" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Centrefold Header Strip -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 2px; margin-bottom: 4px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #0f284e;">
          LIVING TIMELINE &bull; PART 2: ARMS RACE, BALKAN CRISES &amp; SARAJEVO (1905–1914)
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">
          PAGES 8–9 CENTREFOLD
        </span>
      </div>

      <!-- Chronological Milestones Grid (4 Rows) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 4px; min-height: 0;">
        
        <!-- Milestone 5: 1898–1900 -->
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f284e;">
                1898–1900 &bull; Admiral Tirpitz’s Naval Laws &amp; High Seas Fleet
              </strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; margin: 0; line-height: 1.2;">
            Germany passes the Naval Laws to construct a modern battlefleet under Tirpitz’s "Risk Theory". Britain views this direct challenge in the North Sea as an existential military threat.
          </p>
          <div style="border: 1px dashed #0f284e; border-radius: 2px; height: 36mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #64748b;">
              ✏️ SKETCH CHALLENGE 5: Admiral Tirpitz inspecting blueprints of battlecruisers in Kiel dockyard [🚢 Battleship Blueprint &bull; ⚓ Kiel Naval Yard &bull; 📐 Compass &amp; Ruler]
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #94a3b8; text-align: right;">Dual-Coding Sketchpad &bull; Use fine ink or pencil</span>
          </div>
        </div>

        <!-- Milestone 6: 10 February 1906 -->
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f284e;">
                10 February 1906 &bull; Launch of HMS Dreadnought at Portsmouth
              </strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px;">Enquiry 3</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; margin: 0; line-height: 1.2;">
            The Royal Navy launches the world’s first all-big-gun turbine battleship. It renders all earlier warships obsolete and triggers the fierce 1909 naval building race with Imperial Germany.
          </p>
          <div style="border: 1px dashed #0f284e; border-radius: 2px; height: 36mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #64748b;">
              ✏️ SKETCH CHALLENGE 6: HMS Dreadnought cutting through waves with 10 massive gun barrels firing [🚢 HMS Dreadnought &bull; 💥 12-Inch Turrets &bull; 🌊 White Sea Foam]
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #94a3b8; text-align: right;">Dual-Coding Sketchpad &bull; Use fine ink or pencil</span>
          </div>
        </div>

        <!-- Milestone 7: October 1908 -->
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f284e;">
                October 1908 &bull; The Bosnian Crisis &amp; Russian Humiliation
              </strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px;">Enquiry 4</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; margin: 0; line-height: 1.2;">
            Austria-Hungary annexes Bosnia-Herzegovina. Germany threatens war if Russia intervenes; humiliated, Russia backs down but vows to mobilize immediately in any future Balkan showdown.
          </p>
          <div style="border: 1px dashed #0f284e; border-radius: 2px; height: 36mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #64748b;">
              ✏️ SKETCH CHALLENGE 7: The Balkan Powder Keg with an Austrian spark fuse burning [🛢️ Gunpowder Barrel &bull; 🧨 Burning Spark Fuse &bull; ⚔️ Double-Headed Austrian Eagle]
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #94a3b8; text-align: right;">Dual-Coding Sketchpad &bull; Use fine ink or pencil</span>
          </div>
        </div>

        <!-- Milestone 8: 28 June 1914 -->
        <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 3px 6px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; color: #0f284e;">
                28 June 1914 &bull; The Assassination of Franz Ferdinand in Sarajevo
              </strong>
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; background: #0f284e; color: #ffffff; padding: 1px 4px; border-radius: 2px;">Enquiry 5</span>
          </div>
          <p style="font-family: 'Georgia', serif; font-size: 7.1pt; color: #1e293b; margin: 0; line-height: 1.2;">
            Bosnian Serb student Gavrilo Princip shoots Archduke Franz Ferdinand beside the Latin Bridge. Austria secures the German "Blank Cheque", setting off thirty-seven days of fatal escalation.
          </p>
          <div style="border: 1px dashed #0f284e; border-radius: 2px; height: 36mm; background: #fafafa; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px; margin-top: 2px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 700; color: #64748b;">
              ✏️ SKETCH CHALLENGE 8: Gavrilo Princip firing his pistol into the open Gräf &amp; Stift motorcar in Sarajevo [🚗 Open Tourer Car &bull; 🌉 Latin Bridge &bull; 💥 Smoking Pistol]
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.4pt; color: #94a3b8; text-align: right;">Dual-Coding Sketchpad &bull; Use fine ink or pencil</span>
          </div>
        </div>

      </div>

      ${renderFooterStrip(9, 'By August 1914, millions of soldiers were mobilised by railway timetables that no diplomat or monarch could stop.', 16)}
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
  // PAGES 14–15: DEDICATED SCHOLAR NOTES & ESSAY PLANNING PORTFOLIO
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
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Top Departmental Branding with Customizer Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f284e; padding-bottom: 4px; margin-bottom: 6px;">
        <div data-department-name="The History Department">
          <span style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 1px;">
            <span class="school-brand-target">The History Department</span>
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; color: #0f284e;">
          KEY STAGE 3 HISTORICAL STUDIES &bull; YEAR 9
        </div>
      </div>

      <!-- Pupil Progress & Marking Ledger Header -->
      <div style="background: #0f284e; color: #ffffff; border-radius: 4px; padding: 6px 12px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; font-weight: 900; margin: 0; line-height: 1.15;">
            Pupil Progress &amp; Formative Assessment Ledger
          </h2>
          <div style="font-family: 'Georgia', serif; font-size: 8.2pt; font-style: italic; color: #e2e8f0; margin-top: 1px;">
            Unit Tracking Record &bull; Causes of the Great War (1871–1914)
          </div>
        </div>
        <div style="text-align: right; border-left: 1.5px solid rgba(255,255,255,0.25); padding-left: 12px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 10pt; font-weight: 900; color: #ffffff;">5 ENQUIRIES</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #93c5fd; text-transform: uppercase;">Teacher Assessed</div>
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; padding: 6.5px 12px; background: #f8fafc; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0f284e; text-transform: uppercase; margin-right: 8px;">Target Grade:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #0f284e; height: 14px;"></div>
        </div>
      </div>

      <!-- 5-Enquiry Formative Marking Table -->
      <div style="border: 1.5px solid #0f284e; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.5px;">
              <th style="padding: 5px 6px; width: 44px; text-align: center; border-right: 1px solid rgba(255,255,255,0.25);">Enq</th>
              <th style="padding: 5px 8px; text-align: left; border-right: 1px solid rgba(255,255,255,0.25);">Key Disciplinary Enquiry &bull; Assessment Task</th>
              <th style="padding: 5px 6px; width: 68px; text-align: center; border-right: 1px solid rgba(255,255,255,0.25);">Score</th>
              <th style="padding: 5px 8px; width: 220px; text-align: left;">Teacher Signature &amp; Formative Target (EBI)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 27.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 27.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 1: German Unification, Franco-Prussian &amp; Bismarck</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">12m Causal Explanation: Rupture of European Balance</div>
              </td>
              <td style="padding: 27.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 27.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 27.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 27.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 2: Imperial Rivalry &amp; Moroccan Crises</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">4m Feature Drill (Agadir) + 4m Consequence (Entente)</div>
              </td>
              <td style="padding: 27.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 27.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 27.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 27.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 3: Naval Arms Race &amp; HMS Dreadnought</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">8m Contrasting Historiographical Interpretations (Q3b/c)</div>
              </td>
              <td style="padding: 27.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 27.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 27.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 27.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 4: Alliance Systems &amp; Balkan Powder Keg</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">4m Feature Drill (Bosnia) + 8m Narrative Account (1908–13)</div>
              </td>
              <td style="padding: 27.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 27.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 27.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 27.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Enquiry 5: The July Crisis &amp; Sarajevo Outbreak</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">12m Synoptic Evaluative Statement Essay (Pretext vs Reality)</div>
              </td>
              <td style="padding: 27.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 27.5px 8px; background: #ffffff;">&nbsp;</td>
            </tr>
            <tr style="background: #ffffff; border-top: 1.5px solid #0f284e;">
              <td style="padding: 27.5px 4px; border-right: 1px solid #cbd5e1; text-align: center;">&nbsp;</td>
              <td style="padding: 27.5px 8px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 900; font-size: 8.2pt; color: #0f284e;">Teacher-Designated Assessment Task</div>
                <div style="font-size: 7.2pt; color: #475569; margin-top: 1px;">Synoptic End-of-Unit Assessment &amp; Revision Target</div>
              </td>
              <td style="padding: 27.5px 6px; border-right: 1px solid #cbd5e1; text-align: center; vertical-align: middle;">
                &nbsp;
              </td>
              <td style="padding: 27.5px 8px; background: #ffffff;">&nbsp;</td>
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
                'https://the-history-revision-hub.netlify.app/?unit=great_war&lesson=' +
                idx +
                '&quiz=true';
              const qrSvg = generateQrSvg(quizUrl);
              const shortLabels = [
                'Unification 1871',
                'Morocco &amp; Africa',
                'Dreadnought Race',
                'Alliances &amp; Balkans',
                'Sarajevo 1914',
              ];
              return (
                '<div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 5px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; margin-bottom: 1px; color: #0f284e;">Enquiry ' +
                cfg.lessonNum +
                '</div>' +
                '<div style="font-family: \'Inter\', sans-serif; font-size: 6pt; font-weight: 700; color: #475569; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">' +
                shortLabels[idx] +
                '</div>' +
                '<div style="width: 26mm; height: 26mm; margin: 0 auto 2px auto;">' +
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
