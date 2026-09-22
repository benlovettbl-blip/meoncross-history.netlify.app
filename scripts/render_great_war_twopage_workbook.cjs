/**
 * History Revision Hub — Master Two-Page Spread Pupil Workbook Engine
 *
 * Target: units/great_war (KS3 Year 9: Causes of the Great War, 1871–1914)
 * Output: public/units/great_war/pupil_workbook_v2.html
 * PDF:    public/pdfs/great_war_pupil_workbook_V2.pdf
 *
 * Architecture:
 * - 16-Page A4 Pupil Workbook Standard (Zero Disruption: Staged V2 edition)
 * - Page 1: Master Front Cover (Hero plate, enquiry question, pupil box, 6-lesson syllabus)
 * - Pages 2–3: Living Unit Timeline (1871–1914 Chronological Spine & Sketchpads + Causal Synthesis)
 * - Pages 4–15: 6 Bespoke Double-Page Enquiry Spreads:
 *     Left Page:  Prior-Recall Do Now (5 items), Fingertip Vocab, Forensic Bridge Task (with authentic images/diagrams)
 *     Right Page: Master Enquiry Question, 3-Column Structure Strip with Dotted Planning Lines,
 *                 Categorized Word Bank, PEEL Writing Strip, Ruled Writing Lines, Teacher Assessment DIRT
 * - Page 16: Master Back Cover (M-A-I-N Synthesis Matrix, Historiography, DIRT Progress Ledger, Chronology Challenge, Synoptic Planning)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'great_war', 'data_v2_4act.js');

if (!fs.existsSync(dataPath)) {
  console.error('❌ Data file not found:', dataPath);
  process.exit(1);
}

// Load 4-Act staged data
const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');

const lessons = unitData.lessons || [];
console.log(`Loaded ${lessons.length} Great War 4-Act lessons for V2 Workbook.`);

/**
 * Image helper (base64 data URI)
 */
function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'great_war', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'great_war', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      if (ext === '.svg') mime = 'image/svg+xml';
      const b64 = fs.readFileSync(cand).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  }
  return relPath;
}

// Bespoke pedagogical configurations for Great War 6 lessons
const lessonConfigs = [
  {
    // Lesson 0: Creation of German Empire (1871)
    skill: 'Causation & Diplomacy',
    enquiryQuestion:
      'Enquiry: Was the unification of Germany in 1871 primarily achieved through military force or diplomatic calculation?',
    doNow: [
      {
        q: 'What is meant by the "Balance of Power" in European diplomacy?',
        a: 'Equal power so no single nation dominates.',
      },
      {
        q: 'Name two major European empires that existed in 1870 before German unity.',
        a: 'British & Russian / Austrian empires.',
      },
      {
        q: 'Why did Britain historically fear a single nation dominating Europe?',
        a: 'Could build an invasion fleet and close Channel trade.',
      },
      {
        q: 'How did the Industrial Revolution change warfare in the 19th century?',
        a: 'Mass-produced steel artillery, rifles, and military railways.',
      },
      {
        q: 'What was the Zollverein, and which kingdom led it?',
        a: 'Prussian-led German customs union that excluded Austria.',
      },
    ],
    objectives: [
      'Understand how Prussia used economic dominance (the Zollverein) and military reform to eclipse Austria.',
      'Analyze how Bismarck orchestrated three short, decisive wars to achieve unification.',
      'Evaluate the geopolitical consequences of the proclamation at Versailles and the annexation of Alsace-Lorraine.',
    ],
    structureStrip: [
      {
        col: '1. MILITARY FORCE',
        prompt:
          'Prussian army reforms, Dreyse needle guns, and victories over Austria (1866) and France (1870).',
      },
      {
        col: '2. REALPOLITIK DIPLOMACY',
        prompt:
          'Bismarck isolating rivals, editing the Ems Telegram, and manipulating southern German nationalism.',
      },
      {
        col: '3. HISTORICAL JUDGMENT',
        prompt:
          'Weigh which factor was decisive: did military force forge unity, or did diplomacy direct the weapon?',
      },
    ],
    wordBank: {
      technical:
        'Realpolitik &bull; Blood and Iron (Eisen und Blut) &bull; Zollverein &bull; Ems Telegram &bull; indemnity',
      geopolitical:
        'Prussian hegemony &bull; Congress of Vienna &bull; balance of power &bull; Hall of Mirrors &bull; encirclement',
      connectives:
        'The decisive military catalyst was... &bull; From a diplomatic perspective... &bull; Crucially, Bismarck ensured that... &bull; Consequently, while force provided the weapon...',
    },
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between Bismarck’s ruthless, pragmatic <strong>Realpolitik</strong> (practical power and national interest) and democratic <strong>Liberalism</strong> (speeches and majority votes):',
    },
    bridgeTask: {
      type: 'source_annotation',
      title:
        'Task 4: Archival Interrogation & Annotation: Bismarck’s "Blood and Iron" Speech (1862)',
      sourceTitle:
        'Source A: Otto von Bismarck Addresses the Prussian Budget Commission (30 Sept 1862)',
      shelfmark: 'PRUSSIAN STATE ARCHIVES · PARLIAMENTARY PROCEEDINGS · BERLIN',
      sourceText:
        '“Prussia must concentrate and maintain its power for the favorable moment which has already been missed several times. Prussia’s borders according to the treaties of Vienna are not favorable to a healthy state life. Not through speeches and majority decisions will the great questions of the day be decided—that was the great mistake of 1848 and 1849—but by iron and blood (Eisen und Blut).”',
      provenance:
        'Speech by Minister-President Otto von Bismarck to the Budget Committee of the Prussian House of Representatives, Berlin, 1862.',
      annotations: [
        '① Underline: phrase proving Bismarck rejected parliamentary voting.',
        '② Circle: the treaty borders Bismarck declared "unfavorable" to Prussia.',
        '③ Box: the dual physical elements Bismarck believed decided history.',
      ],
      questionA:
        'What can a historian infer from Source A about why Bismarck rejected constitutional democracy in favor of autocratic military force?',
      questionB:
        'Explain how Bismarck’s statecraft between 1862 and 1871 proved that "iron and blood" was Prussian state policy rather than mere rhetoric:',
      clue: '<em>Low-Floor Clue:</em> Look at the words "not through speeches"—Bismarck was warning parliament that weapons and industry, not debates, build nations.',
      scholarsEdge:
        '★ Scholar’s Edge: How did Bismarck’s 1862 triumph over parliament embed militarism into the very constitution of the new German Empire?',
    },
  },
  {
    // Lesson 1: Franco-Prussian War & Alsace-Lorraine
    skill: 'Change & Continuity',
    enquiryQuestion:
      'Enquiry: How far was French revanche for the loss of Alsace-Lorraine the fundamental cause of European instability before 1914?',
    doNow: [
      {
        q: 'What famous phrase did Otto von Bismarck use in 1862 to describe how Germany would be unified?',
        a: '"By iron and blood" (Eisen und Blut).',
      },
      {
        q: 'Which economic customs union created by Prussia in 1834 excluded Austria?',
        a: 'The Zollverein.',
      },
      {
        q: 'In what grand French palace was King Wilhelm I proclaimed German Emperor in 1871?',
        a: 'The Hall of Mirrors at Versailles.',
      },
      {
        q: 'Why did the unification of Germany in 1871 shatter the traditional European balance of power?',
        a: 'Created a massive industrial superpower in central Europe.',
      },
      {
        q: 'Which two provinces did Germany annex from France in the 1871 Treaty of Frankfurt?',
        a: 'Alsace and Lorraine.',
      },
    ],
    objectives: [
      'Explain how the Hohenzollern crisis and the Ems Telegram provoked France into declaring war in 1870.',
      'Analyze the military catastrophe of Sedan and the traumatic Siege of Paris.',
      'Evaluate how "la revanche" and Bettannier’s "La Tache Noire" institutionalized anti-German sentiment in France.',
    ],
    structureStrip: [
      {
        col: '1. THE 1871 HUMILIATION',
        prompt:
          'The surrender at Sedan, the starvation siege of Paris, the crowning at Versailles, and 5-billion franc fine.',
      },
      {
        col: '2. REVANCHE & BORDER LOSS',
        prompt:
          'Loss of Alsace-Lorraine, school classroom indoctrination, and French determination to recover the provinces.',
      },
      {
        col: '3. EVALUATIVE JUDGMENT',
        prompt:
          'Was French revenge the primary danger, or did German fear of a two-front war cause greater European tension?',
      },
    ],
    wordBank: {
      technical:
        'La Revanche &bull; Annexation &bull; Ems Telegram &bull; Treaty of Frankfurt &bull; indemnity &bull; Sedan',
      geopolitical:
        'Lost Provinces (Provinces Perdues) &bull; Franco-Russian Alliance &bull; diplomatic isolation &bull; security dilemma',
      connectives:
        'The immediate trauma of 1871 was... &bull; This fostered a continuous culture of revanche because... &bull; Furthermore, the loss of Alsace-Lorraine... &bull; Ultimately, while revanche kept tension high...',
    },
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Revanche</em> and <em>Annexation</em>:',
      clozeText:
        'Following the Prussian victory in 1871, the German Empire enforced the direct [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] of Alsace-Lorraine, sparking a deep and permanent culture of [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] across French politics and education.',
      followUp:
        'Explain why Bismarck spent the next twenty years desperately trying to diplomatically isolate France:',
    },
    bridgeTask: {
      type: 'visual_source',
      title:
        'Task 4: Archival Interrogation: Albert Bettannier’s "The Black Stain" (La Tache Noire, 1887)',
      imgSrc: '/images/la_tache_noire_1887.jpg',
      imgCaption:
        'Primary Painting: La Tache Noire by Albert Bettannier (1887), Musée de la Cour d’Or, Metz.',
      sourceText:
        '“In French school classrooms after 1871, teachers pointed to maps where the lost provinces of Alsace and Lorraine were shaded in deep mourning violet or black. Boys wore military-style uniforms and were drilled in gymnastics and rifle handling, taught that their sacred duty was to reclaim the lost provinces.”',
      questionA:
        'Using the visual source and text, explain how French schools deliberately turned national grief into patriotic military conditioning:',
      questionB:
        'Explain why the loss of Alsace-Lorraine made a lasting diplomatic peace between France and Germany virtually impossible after 1871:',
      clue: '<em>Low-Floor Clue:</em> Look at the teacher pointing to the black patch on the map and the boy’s military cadet belt—education was used for war preparation.',
      scholarsEdge:
        '★ Scholar’s Edge: How did the French obsession with revanche push France into an unlikely military alliance with autocratic Tsarist Russia in 1894?',
    },
  },
  {
    // Lesson 2: The Scramble for Africa & Imperial Rivalry
    skill: 'Causation & Imperialism',
    enquiryQuestion:
      'Enquiry: Did colonial rivalry in Africa cause the First World War, or merely mirror existing European tensions?',
    doNow: [
      {
        q: 'Why did France desperately seek an alliance against Germany after 1871?',
        a: 'To end its diplomatic isolation and recover Alsace-Lorraine.',
      },
      {
        q: 'Which two countries signed the Dual Alliance in 1879?',
        a: 'Germany and Austria-Hungary.',
      },
      { q: 'In what year did Kaiser Wilhelm II dismiss Chancellor Bismarck?', a: '1890.' },
      {
        q: 'What new German foreign policy demanded an empire and a "Place in the Sun"?',
        a: 'Weltpolitik.',
      },
      {
        q: 'Which 1894 treaty finally broke France’s diplomatic isolation?',
        a: 'The Franco-Russian Military Convention.',
      },
    ],
    objectives: [
      'Understand how the Berlin Conference (1884–85) laid out rules for carving up Africa.',
      'Analyze Kaiser Wilhelm II’s aggressive Weltpolitik and German colonial jealousy.',
      'Evaluate how the First (1905) and Second (1911) Moroccan Crises strengthened Anglo-French military cooperation.',
    ],
    structureStrip: [
      {
        col: '1. IMPERIAL GREED & WELTPOLITIK',
        prompt:
          'Kaiser Wilhelm II’s demand for a "Place in the Sun", German envy of the British Empire, and railway expansion.',
      },
      {
        col: '2. THE MOROCCAN CRISES',
        prompt:
          'Tangier (1905) and Agadir (1911): German gunboat diplomacy backfiring and cementing the Anglo-French Entente.',
      },
      {
        col: '3. HISTORICAL JUDGMENT',
        prompt:
          'Did colonial clashes cause the war, or did they merely deepen distrust between already polarized alliances?',
      },
    ],
    wordBank: {
      technical:
        'Weltpolitik &bull; Scramble for Africa &bull; Berlin Conference (1884) &bull; Gunboat Diplomacy &bull; SMS Panther',
      geopolitical:
        'Place in the Sun &bull; Entente Cordiale &bull; Algeciras Conference &bull; Cape-to-Cairo &bull; imperial prestige',
      connectives:
        'The fundamental driver of imperial friction was... &bull; This escalated dangerously during the Agadir Crisis when... &bull; Instead of dividing Britain and France, German threats... &bull; Consequently, colonial rivalry...',
    },
    vocabTask: {
      type: 'mapping',
      termA: 'Weltpolitik',
      termB: 'Place in the Sun',
      prompt:
        'Write one historically accurate sentence connecting Kaiser Wilhelm II’s policy of <strong>Weltpolitik</strong> to Germany’s demand for a <strong>"Place in the Sun"</strong>:',
    },
    bridgeTask: {
      type: 'visual_map',
      title: 'Task 4: Forensic Cartographic Analysis: The Scramble for Africa (1914)',
      imgSrc: '/images/map_africa_1914.png',
      imgCaption:
        'Reference Map: European colonial partitions of Africa on the eve of war in 1914.',
      sourceText:
        '“By 1914, Britain controlled over 30% of Africa’s population, stretching from Cairo to the Cape, while France held massive territories in West Africa. Germany, arriving late to the imperial banquet, secured only scattered territories (Togo, Cameroon, German South-West Africa, German East Africa), fueling intense national resentment in Berlin.”',
      questionA:
        'Using the map and text, explain why German nationalists viewed the map of Africa in 1914 as humiliating proof of British and French encirclement:',
      questionB:
        'Explain why the 1911 Agadir Crisis ended in a total diplomatic defeat for Germany, bringing Britain and France closer together:',
      clue: '<em>Low-Floor Clue:</em> Compare the continuous British pink strip from Egypt to South Africa against the small, isolated German territories.',
      scholarsEdge:
        '★ Scholar’s Edge: Why did German colonial assertiveness in Africa paradoxically push Britain to abandon "Splendid Isolation" and sign naval agreements with France?',
    },
  },
  {
    // Lesson 3: HMS Dreadnought & The Naval Arms Race
    skill: 'Significance & Technological Change',
    enquiryQuestion:
      'Enquiry: Why did a battleship building contest destroy Anglo-German relations between 1906 and 1914?',
    doNow: [
      {
        q: 'What German foreign policy demanded an aggressive overseas empire?',
        a: 'Weltpolitik.',
      },
      {
        q: 'What German gunboat was sent to Morocco in 1911, triggering the Agadir Crisis?',
        a: 'SMS Panther.',
      },
      {
        q: 'What was the 1904 diplomatic agreement between Britain and France called?',
        a: 'The Entente Cordiale.',
      },
      {
        q: 'Why did the Moroccan Crises strengthen rather than weaken the Entente Cordiale?',
        a: 'Britain firmly backed France against German military bullying.',
      },
      {
        q: 'What was Britain’s naval policy of having a fleet larger than the next two navies combined?',
        a: 'The Two-Power Standard.',
      },
    ],
    objectives: [
      'Explain the principles of the British Two-Power Standard and Tirpitz’s "Risk Theory".',
      'Analyze the revolutionary technology of HMS Dreadnought and Admiral Fisher’s naval reforms.',
      'Evaluate how naval scare-mongering and public slogans ("We want eight and we won’t wait!") drove the arms race.',
    ],
    structureStrip: [
      {
        col: '1. DREADNOUGHT REVOLUTION',
        prompt:
          'All-big-gun armament, steam turbine speed, wiping out Britain’s older battleship advantage overnight.',
      },
      {
        col: '2. THE ARMS RACE ESCALATION',
        prompt:
          'Tirpitz’s Navy Laws, enlarging the Kiel Canal, public panic, and rival dreadnought construction.',
      },
      {
        col: '3. EVALUATIVE IMPACT',
        prompt:
          'Weigh how far the naval race made war inevitable: did it convince Britain that Germany intended to destroy the Empire?',
      },
    ],
    wordBank: {
      technical:
        'HMS Dreadnought &bull; Two-Power Standard &bull; Risk Theory (Risikogedanke) &bull; steam turbine &bull; 12-inch guns',
      geopolitical:
        'Naval mastery &bull; Admiral Jackie Fisher &bull; Admiral Alfred von Tirpitz &bull; Kiel Canal &bull; maritime blockade',
      connectives:
        'The launch of HMS Dreadnought was revolutionary because... &bull; However, this paradoxically harmed Britain by... &bull; In response, German naval construction... &bull; Consequently, the naval race poisoned diplomacy...',
    },
    vocabTask: {
      type: 'distinction',
      prompt:
        'Distinguish between Britain’s <strong>Two-Power Standard</strong> (Royal Navy equal to next two navies combined) and Admiral Tirpitz’s <strong>Risk Theory</strong> (German navy strong enough that attacking it would risk Britain’s supremacy):',
    },
    bridgeTask: {
      type: 'technical_table',
      title:
        'Task 4: Archival Interrogation: Fisher’s Confidential Memo & Technical Dreadnought Comparison',
      sourceTitle:
        'Source C: First Sea Lord Admiral Sir John Fisher, Confidential Admiralty Memorandum (Dec 1906)',
      shelfmark: 'BRITISH ADMIRALTY ARCHIVES · ADM 1/7892 · LONDON',
      sourceText:
        '“My principles are: Speed is armor. Hit first, hit hard, and keep on hitting... The Dreadnought has rendered all existing battleships obsolete. If Germany builds one, we must build two. The Empire floats upon the Royal Navy; if the navy is defeated, we are starved into surrender in three weeks.”',
      provenance:
        'Confidential memorandum by First Sea Lord Admiral Sir John Fisher to the British Cabinet, December 1906.',
      tableHeaders: [
        'Design Feature',
        'Pre-Dreadnought (HMS King Edward VII, 1903)',
        'HMS Dreadnought (1906 Breakthrough)',
      ],
      tableRows: [
        [
          'Main Armament',
          '4 × 12-inch heavy guns + mixed smaller calibres',
          '10 × 12-inch guns (all-big-gun uniform battery)',
        ],
        [
          'Broadside Firepower',
          '4 heavy shells per minute',
          '8 heavy shells per minute (2.5× destructive energy)',
        ],
        [
          'Propulsion & Speed',
          'Triple-expansion reciprocating steam (18 knots)',
          'Parsons steam turbines (21 knots top speed)',
        ],
        [
          'Strategic Effect',
          'Dominant over older fleets; vulnerable to speed',
          'Made all 150 battleships in the world obsolete overnight',
        ],
      ],
      questionA:
        'Using Fisher’s memorandum and the specifications table, explain why the launch of HMS Dreadnought was described as both a military masterpiece and a strategic nightmare for Britain:',
      questionB:
        'Explain why the German decision to widen the Kiel Canal and build dreadnoughts convinced the British public and government that Germany was preparing for war:',
      clue: '<em>Low-Floor Clue:</em> Notice the broadside firepower jumped from 4 to 8 heavy shells—any navy with dreadnoughts could destroy older ships from miles away.',
      scholarsEdge:
        '★ Scholar’s Edge: How did the naval race transform the Entente Cordiale from a friendly colonial agreement into a binding, de facto military alliance?',
    },
  },
  {
    // Lesson 4: The Alliance System & The Willy-Nicky Telegrams
    skill: 'Causation & The Diplomatic Web',
    enquiryQuestion:
      'Enquiry: Did the European alliance system protect peace or act as a doomsday machine for total war?',
    doNow: [
      {
        q: 'What revolutionary British battleship launched in 1906 triggered the naval arms race?',
        a: 'HMS Dreadnought.',
      },
      {
        q: 'What was the British naval rule that the Royal Navy must equal the next two navies combined?',
        a: 'The Two-Power Standard.',
      },
      {
        q: 'Which German admiral designed the German naval expansion based on his "Risk Theory"?',
        a: 'Admiral Alfred von Tirpitz.',
      },
      {
        q: 'What was the 1907 agreement that united Britain, France, and Russia called?',
        a: 'The Triple Entente.',
      },
      {
        q: 'Which three nations made up the Triple Alliance by 1914?',
        a: 'Germany, Austria-Hungary, and Italy.',
      },
    ],
    objectives: [
      'Explain the formation of the Dual Alliance (1879) and Triple Alliance (1882).',
      'Analyze why the lapse of the Reinsurance Treaty led directly to the Franco-Russian Alliance (1894).',
      'Evaluate how rigid railway mobilization timetables and interlocking treaties transformed a localized dispute into global war.',
    ],
    structureStrip: [
      {
        col: '1. INTENDED DETERRENCE',
        prompt:
          'Alliances designed to prevent attack: Bismarck isolating France, and the balance of fear keeping the peace.',
      },
      {
        col: '2. THE DOOMSDAY TRAP',
        prompt:
          'Secret clauses, blank cheques, rigid railway mobilization schedules, and the Schlieffen Plan.',
      },
      {
        col: '3. HISTORICAL JUDGMENT',
        prompt:
          'Did the alliance system make war inevitable, or did irresponsible political leadership trigger the catastrophe?',
      },
    ],
    wordBank: {
      technical:
        'Triple Alliance &bull; Triple Entente &bull; Deterrence &bull; Mobilisation &bull; Schlieffen Plan &bull; Willy-Nicky Telegrams',
      geopolitical:
        'Interlocking treaties &bull; Doomsday machine &bull; Pan-Slavism &bull; two-front war &bull; Blank Cheque',
      connectives:
        'European leaders believed large alliances would... &bull; However, secret military protocols ensured that... &bull; When Russia ordered general mobilization... &bull; Consequently, defensive pacts acted as...',
    },
    vocabTask: {
      type: 'cloze',
      prompt:
        'Complete the summary below using the terms <em>Deterrence</em> and <em>Mobilisation</em>:',
      clozeText:
        'European statesmen believed large defensive alliances would create [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] to prevent aggression; however, the rigid railway timetables of military [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] transformed defensive pacts into an unstoppable chain reaction.',
      followUp:
        'Explain why the German Schlieffen Plan made a diplomatic pause impossible once Russia mobilized:',
    },
    bridgeTask: {
      type: 'willy_nicky_telegrams',
      title:
        'Task 4: Archival Interrogation: The Desperate "Willy-Nicky" Telegrams (29–31 July 1914)',
      sourceATitle: 'TELEGRAM 1: CZAR NICHOLAS II TO KAISER WILHELM II (29 July, 1:00 am)',
      sourceAText:
        '“To try and avoid such a calamity as a European war, I beg you in the name of our old friendship to do what you can to stop your ally [Austria] from going too far. I foresee that very soon I shall be overwhelmed by the pressure brought upon me, and be forced to take extreme measures which will lead to war.”',
      sourceAShelfmark: 'RUSSIAN IMPERIAL FOREIGN ARCHIVE · ST PETERSBURG',
      sourceBTitle: 'TELEGRAM 2: KAISER WILHELM II TO CZAR NICHOLAS II (29 July, 6:30 pm)',
      sourceBText:
        '“I cannot consider Austria’s action against Serbia as an ‘ignoble’ war... In this action, Austria is defending her very existence. If you mobilize against Austria, my role as mediator will be endangered if not ruined. The whole weight of the decision lies on your shoulders now, who have to bear the responsibility for Peace or War.”',
      sourceBShelfmark: 'GERMAN IMPERIAL ARCHIVE · AUSWÄRTIGES AMT · BERLIN',
      annotations: [
        '① Underline: Nicholas II’s plea invoking their personal friendship.',
        '② Circle: the phrase showing Nicholas was pressured by his military generals.',
        '③ Box: Wilhelm’s warning that Russian mobilization would trigger war.',
      ],
      questionA:
        'What does the intimate, desperate tone of these telegrams reveal about the power of personal monarchical diplomacy versus the unstoppable momentum of military alliances in 1914?',
      questionB:
        'Explain why neither the Kaiser nor the Tsar was able to halt the countdown to war despite their mutual desire to avoid bloodshed:',
      clue: '<em>Low-Floor Clue:</em> Notice both cousins blame each other’s allies—the rigid alliance treaties meant once military mobilization started, emperors were prisoners of their generals.',
      scholarsEdge:
        '★ Scholar’s Edge: How does the Willy-Nicky exchange support Christopher Clark’s thesis in "The Sleepwalkers" that European rulers were blind to the trap their alliances had created?',
    },
  },
  {
    // Lesson 5: The Sarajevo Assassination & The Blank Cheque
    skill: 'Forensic Causation & The Spark',
    enquiryQuestion:
      'Enquiry: Was the outbreak of the First World War the result of a deliberate German plan or an accidental chain of miscalculations?',
    doNow: [
      {
        q: 'Which two European armed camps faced each other across Europe by 1914?',
        a: 'The Triple Alliance and Triple Entente.',
      },
      {
        q: 'What was the German war plan to defeat France first through Belgium called?',
        a: 'The Schlieffen Plan.',
      },
      {
        q: 'Which neutral country did Germany invade under the Schlieffen Plan in August 1914?',
        a: 'Belgium.',
      },
      {
        q: 'Which Balkan territory was annexed by Austria-Hungary in 1908, infuriating Serbia?',
        a: 'Bosnia and Herzegovina.',
      },
      {
        q: 'What was the secret Serbian nationalist society that armed Gavrilo Princip called?',
        a: 'The Black Hand (Crna Ruka).',
      },
    ],
    objectives: [
      'Explain why Archduke Franz Ferdinand was targeted by the Black Hand in Sarajevo on 28 June 1914.',
      'Analyze the fateful coincidences and wrong turns during the assassination on 28 June 1914.',
      'Evaluate the July Crisis, the German "Blank Cheque", and the domino effect of European mobilization.',
    ],
    structureStrip: [
      {
        col: '1. SARAJEVO & THE SPARK',
        prompt:
          'Franz Ferdinand’s visit on Vidovdan, the failed morning grenade, the fatal wrong turn into Franz Josef Street.',
      },
      {
        col: '2. THE BLANK CHEQUE & ESCALATION',
        prompt:
          'Kaiser Wilhelm II promising unconditional support to Austria, the Austrian Ultimatum, and Russian mobilization.',
      },
      {
        col: '3. HISTORICAL VERDICT',
        prompt:
          'Judge Fischer vs Clark: did Germany deliberately engineer war, or did all powers sleepwalk into disaster?',
      },
    ],
    wordBank: {
      technical:
        'Black Hand &bull; Gavrilo Princip &bull; Franz Josef Street &bull; Blank Cheque &bull; Austrian Ultimatum &bull; Schlieffen Plan',
      geopolitical:
        'Balkan Powder Keg &bull; Pan-Slavism &bull; Treaty of London (1839) &bull; Belgian neutrality &bull; Sleepwalkers',
      connectives:
        'The immediate catalyst was the fatal wrong turn which... &bull; However, this local crisis became global because Germany issued... &bull; Crucially, the Russian mobilization forced Germany to... &bull; Ultimately, while Princip fired the shots...',
    },
    vocabTask: {
      type: 'golden_sentence',
      prompt:
        'Write ONE grammatically sophisticated, historically accurate Golden Sentence connecting <strong>The Black Hand</strong> and the <strong>Blank Cheque</strong> using a causal conjunction (<em>because</em>, <em>although</em>, or <em>consequently</em>):',
      wordBank:
        'Assassination &bull; The Black Hand &bull; Franz Josef Street &bull; Blank Cheque &bull; Ultimatum &bull; July Crisis &bull; Mobilisation',
    },
    bridgeTask: {
      type: 'crime_scene_forensics',
      title:
        'Task 4: Forensic Crime Scene Investigation: The Wrong Turn at Schiller’s Delicatessen vs. The Blank Cheque',
      sourceATitle:
        'Source A: Sarajevo Police Forensic Plan — Appel Quay & Franz Josef Street (28 June 1914)',
      sourceAText:
        '“Motorcade Route Plan: The royal car traveled down Appel Quay. At the Latin Bridge, the lead car took an unauthorized right turn into Franz Josef Street. Governor Potiorek shouted: ‘Stop! That is the wrong way!’ The chauffeur braked and attempted to reverse, stalling the open Graf & Stift cabriolet directly in front of Schiller’s Delicatessen, five feet from Gavrilo Princip.”',
      sourceBTitle: 'Source B: The German "Blank Cheque" Telegram to Vienna (5 July 1914)',
      sourceBText:
        '“His Majesty the Kaiser authorizes me to inform your Government that Austria-Hungary may rely upon Germany’s full support, even if grave European complications should arise out of an action against Serbia. In this case, as in any other, Germany will stand faithfully by Austria’s side according to its alliance obligations.”',
      sourceBShelfmark:
        'GERMAN IMPERIAL CHANCELLERY · HOLLWEG TELEGRAM TO VIENNA · ARCHIVE REF 1914-7-5',
      questionA:
        'Forensic Route Analysis: Using the crime scene map and Source A, explain how pure human error and bizarre coincidence allowed Gavrilo Princip to assassinate the Archduke after the morning bomb plot had failed:',
      questionB:
        'The Blank Cheque Escalation: Using Source B, explain why Germany’s unconditional backing transformed an isolated Austrian-Serbian conflict into a global war:',
      clue: '<em>Low-Floor Clue:</em> Without the wrong turn, the car would never have stopped in front of Princip. Without the Blank Cheque, Austria would never have dared attack Serbia.',
      scholarsEdge:
        '★ Scholar’s Edge: How does the contrast between Source A (chance) and Source B (geopolitics) illustrate the historical debate between the "Great Man" theory and structural causation?',
    },
  },
];

/**
 * Builds the complete HTML for the 16-page Great War workbook
 */
function buildGreatWarTwoPageWorkbookHtml() {
  const coverImg = getBase64Image('/images/great_war_cover.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pupil Workbook - Causes of the Great War (Staged V2)</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&family=Special+Elite&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 9pt;
      line-height: 1.32;
      color: #1e293b;
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
      padding: 14px 16px;
      border: 1px solid #cbd5e1;
      outline: 3.5px double #0f172a;
      outline-offset: -7px;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .task-line {
      border-bottom: 1.2px solid #475569;
      height: 7.2mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px dotted #64748b;
      height: 4.8mm;
      width: 100%;
      box-sizing: border-box;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2px 7px;
      border-radius: 3px;
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #cbd5e1;
      font-weight: 700;
    }
  </style>
</head>
<body>
`;

  // ==========================================
  // PAGE 1: FRONT COVER (Recto, Right Page)
  // ==========================================
  html += `
  <div class="page page-container" id="page-1" style="justify-content: flex-start;">
    <!-- Institutional Header & Pupil Registration Strip -->
    <div style="margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
        <span class="school-brand-target" data-department-name="The History Department" style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 2px; color: #1e3a8a; font-weight: 800;">
          The History Department
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 700;">
          Year 9 History &bull; V2 Staged Edition
        </span>
      </div>

      <!-- Pupil Name & Class Box -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; background: #f8fafc; display: grid; grid-template-columns: 2.2fr 1fr; gap: 18px; align-items: center;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.8pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
      </div>
    </div>

    <!-- Main Title Block -->
    <div style="text-align: center; border-bottom: 1px solid #cbd5e1; padding: 2px 0 7px 0; margin-bottom: 8px;">
      <h1 style="font-family: 'Playfair Display', serif; font-size: 23pt; color: #0f172a; margin: 0 0 2px 0; text-transform: uppercase; letter-spacing: 1.5px; line-height: 1.15;">
        Causes of the Great War
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 9pt; color: #334155; font-weight: 600; letter-spacing: 0.5px;">
        Imperial Rivalry, the Arms Race &amp; The Thirty Days of Madness (1871–1914)
      </div>
    </div>

    <!-- Overarching Enquiry Box -->
    <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 8px 14px; background: #f8fafc; margin-bottom: 8px; text-align: center;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 1.8px; color: #1e3a8a; font-weight: 800; margin-bottom: 2px;">
        Overarching Historical Enquiry
      </div>
      <div style="font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; font-style: italic; font-weight: 600; line-height: 1.25;">
        “How did decades of imperial rivalry and fear culminate in thirty days of madness?”
      </div>
    </div>

    <!-- Hero Primary Plate -->
    <div style="border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 6px; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.04); margin-bottom: 8px;">
      <div style="width: 100%; height: 470px; border-radius: 4px; overflow: hidden; border: 1px solid #e2e8f0; background: #0f172a;">
        <img src="${coverImg}" style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;" alt="HMS Dreadnought at sea">
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; padding: 0 4px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b;">
        <span><strong>Primary Visual Plate:</strong> Royal Navy battleship <em>HMS Dreadnought</em> at sea (c. 1906–1907)</span>
        <span style="font-style: italic;">Imperial War Museum Photographic Archive</span>
      </div>
    </div>

    <!-- Curriculum Synopsis Box -->
    <div style="border: 1.2px solid #e2e8f0; border-radius: 5px; padding: 7px 11px; background: #fafaf9; margin-bottom: 8px;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; text-transform: uppercase; letter-spacing: 1px; color: #0f172a; font-weight: 800; margin-bottom: 2px;">
        Curriculum Synopsis &bull; The Powder Keg of Europe
      </div>
      <p style="font-family: 'Georgia', serif; font-size: 8.2pt; color: #334155; line-height: 1.4; margin: 0; text-align: justify;">
        For forty years following the 1871 unification of Germany, the European Great Powers preserved an uneasy armed peace through intricate alliances, imperial expansion, and massive dreadnought construction. In this master enquiry workbook, pupils investigate how long-term militarism, colonial jealousy in Africa, and rigid railway mobilisations transformed two pistol shots in Sarajevo into the unprecedented catastrophe of the First World War.
      </p>
    </div>

    <!-- 6 Core Enquiries Unit Syllabus Roadmap -->
    <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 9px; background: #f8fafc;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 800; margin-bottom: 4px;">
        The 6 Disciplinary Enquiries:
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L1:</strong> Creation of the German Empire (1871)</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L4:</strong> Dreadnought &amp; The Naval Arms Race</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L2:</strong> Franco-Prussian War &amp; Alsace-Lorraine</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L5:</strong> The Alliance System: Peace or Trap?</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L3:</strong> The Scramble for Africa &amp; Weltpolitik</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; padding: 2px 6px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; display: flex; align-items: center;"><strong style="color: #1e3a8a; margin-right: 5px; white-space: nowrap;">L6:</strong> Sarajevo &amp; The Thirty-Seven Days of Crisis</div>
      </div>
    </div>
  </div>
`;

  // ==========================================
  // PAGES 2–3: LIVING UNIT TIMELINE SPINE
  // ==========================================
  html += `
  <!-- PAGE 2: TIMELINE PART I (Facing Spread Left) -->
  <div class="page page-container" id="page-2">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 800;">
            Living Unit Timeline &bull; Part I: The Road to Armed Peace (1871–1904)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The European Balance of Power
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #1e3a8a; padding: 3px 8px; margin-bottom: 6px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Throughout this unit, sketch each historical milestone inside its dedicated frame. Add dates, flags, and causal arrows.</span>
        <span style="font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Left</span>
      </div>

      <!-- Timeline Nodes -->
      <div style="display: flex; flex-direction: column; gap: 7px;">
        <!-- Milestone 1: 1871 -->
        <div style="display: grid; grid-template-columns: 110px 1fr; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Hall of Mirrors / Pickelhaube helmet]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1871 Unification</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1871</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Proclamation of the German Empire at Versailles</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                Following the crushing defeat of Napoleon III at Sedan, King Wilhelm I of Prussia is proclaimed Kaiser in the French Hall of Mirrors at Versailles. Germany annexes Alsace-Lorraine and imposes a 5-billion franc fine, permanently alienating France and shattering the European balance of power.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 1 &amp; 2 &bull; Power shift to Berlin &bull; French territorial loss &bull; Bismarck's isolation policy
            </div>
          </div>
        </div>

        <!-- Milestone 2: 1882 -->
        <div style="display: grid; grid-template-columns: 110px 1fr; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Triple Alliance pact / 3 Eagle crests]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1882 Alliance</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1882</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Formation of the Triple Alliance</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                Bismarck forms a secret defensive military pact between Germany, Austria-Hungary, and Italy. Bismarck’s primary strategic objective is to keep France diplomatically isolated and deprived of continental allies, preventing any coalition from threatening Germany with a two-front war.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 5 &bull; The alliance system as a defensive deterrent &bull; Bismarck's diplomatic web
            </div>
          </div>
        </div>

        <!-- Milestone 3: 1890 -->
        <div style="display: grid; grid-template-columns: 110px 1fr; gap: 9px; align-items: stretch; border: 1.2px solid #0284c7; border-radius: 4px; padding: 5px 8px; background: #f0f9ff;">
          <div style="border: 1.2px dashed #0284c7; border-radius: 3px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #0284c7;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1; font-weight: 600;">
              [Sketch: Punch cartoon 'Dropping the Pilot']
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #0284c7;">
              <span>⌞</span><span>1890 Dismissal</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #0284c7; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1890</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Kaiser Wilhelm II Dismisses Bismarck: The Launch of Weltpolitik</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                The young, impetuous Kaiser Wilhelm II forces Bismarck to resign, abandons the secret Reinsurance Treaty with Russia, and embarks on <em>Weltpolitik</em>—demanding Germany's "Place in the Sun" through an aggressive global empire and a high-seas battle fleet. Russia immediately turns to France.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0369a1;">
              <strong>Key Enquiry Link:</strong> Lessons 3 &amp; 4 &bull; End of diplomatic caution &bull; Franco-Russian alliance (1894) &bull; Encirclement fear
            </div>
          </div>
        </div>

        <!-- Milestone 4: 1898–1904 -->
        <div style="display: grid; grid-template-columns: 110px 1fr; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Battleship guns / Entente handshake]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1904 Entente</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1898–04</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">German Naval Laws &amp; The Anglo-French Entente Cordiale</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                Admiral Tirpitz passes the German Navy Laws to build a fleet capable of challenging Britain. Alarmed by German naval expansion and imperial bluster, Great Britain abandons "Splendid Isolation" in 1904, signing the historic <em>Entente Cordiale</em> with France and resolving all colonial disputes.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 3 &amp; 5 &bull; Two-Power Standard &bull; Polarization of Europe into two armed camps
            </div>
          </div>
        </div>
      </div>

      <!-- Living Timeline Part I Synthesis Challenge -->
      <div style="border: 1.2px solid #1e3a8a; background: #f8fafc; border-radius: 4px; padding: 5px 9px; margin-top: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px;">
            Living Timeline Synthesis Challenge &bull; The Diplomatic Shift (1871–1904)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #475569;">Causal Linkage Check</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; margin-bottom: 3px; line-height: 1.3;">
          Explain how Kaiser Wilhelm II’s dismissal of Bismarck in 1890 and the launch of German naval expansion directly drove Great Britain and France into an unexpected alliance by 1904:
        </div>
        <div class="task-line-dotted" style="height: 5.2mm;"></div>
        <div class="task-line-dotted" style="height: 5.2mm;"></div>
      </div>
    </div>

    <!-- Colophon -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>The History Department &bull; Causes of the Great War</span>
      <span>Page 2 (Facing Spread Left)</span>
    </div>
  </div>

  <!-- PAGE 3: TIMELINE PART II (Facing Spread Right) -->
  <div class="page page-container" id="page-3">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 800;">
            Living Unit Timeline &bull; Part II: Crises &amp; The Spark (1905–1914)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 13.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The Escalation to Total War
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #1e3a8a; padding: 3px 8px; margin-bottom: 6px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Trace the countdown from the Dreadnought revolution to the Sarajevo assassination and Belgian invasion.</span>
        <span style="font-weight: 700; color: #1e3a8a; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Right</span>
      </div>

      <!-- Timeline Nodes -->
      <div style="display: flex; flex-direction: column; gap: 7px;">
        <!-- Milestone 5: 1906 -->
        <div style="display: grid; grid-template-columns: 1fr 110px; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1906</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Launch of HMS Dreadnought: The Naval Revolution</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                The Royal Navy launches <em>HMS Dreadnought</em> in Portsmouth. Powered by revolutionary steam turbines and mounting ten 12-inch guns, it renders every pre-existing battleship obsolete overnight. Germany immediately widens the Kiel Canal and begins building Nassau-class dreadnoughts.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 4 &bull; Naval arms race &bull; Public hysteria ("We want eight and we won't wait!")
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: Dreadnought 12-inch gun turret]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1906 Dreadnought</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 6: 1908–1911 -->
        <div style="display: grid; grid-template-columns: 1fr 110px; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">1908–11</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Bosnian Crisis &amp; The Agadir Incident</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                Austria-Hungary annexes Bosnia and Herzegovina in 1908, infuriating Serbia and humiliating Russia. In 1911, Germany sends the gunboat <em>Panther</em> to Morocco. Britain intervenes forcefully on France’s side, conducting secret joint military staff talks for European troop deployment.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 3 &amp; 5 &bull; The Balkan Powder Keg &bull; Serbian nationalist underground &bull; Panther gunboat
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: SMS Panther gunboat / Balkan map]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1911 Agadir</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 7: 28 June 1914 -->
        <div style="display: grid; grid-template-columns: 1fr 110px; gap: 9px; align-items: stretch; border: 1.4px solid #b91c1c; border-radius: 4px; padding: 5px 8px; background: #fffaf0;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #b91c1c; color: #ffffff; padding: 1px 6px; border-radius: 3px;">28 June 1914</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">Assassination of Archduke Franz Ferdinand in Sarajevo</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                Nineteen-year-old Bosnian Serb nationalist Gavrilo Princip shoots Archduke Franz Ferdinand and Sophie at point-blank range on Franz Josef Street. Princip is armed and trained by the clandestine Serbian military network, <em>The Black Hand</em>. The fatal wrong turn ignites the July Crisis.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #b91c1c;">
              <strong>Key Enquiry Link:</strong> Lesson 6 &bull; Fatal wrong turn &bull; FN Browning semi-automatic pistol &bull; Black Hand conspiracy
            </div>
          </div>
          <div style="border: 1.2px dashed #b91c1c; border-radius: 3px; background: #fef2f2; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #991b1b; font-weight: 700;">
              [Sketch: Browning pistol / Stalled open car]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #b91c1c;">
              <span>⌞</span><span>Sarajevo Spark</span><span>⌟</span>
            </div>
          </div>
        </div>

        <!-- Milestone 8: July–Aug 1914 -->
        <div style="display: grid; grid-template-columns: 1fr 110px; gap: 9px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; background: #1e3a8a; color: #ffffff; padding: 1px 6px; border-radius: 3px;">July–Aug 1914</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a;">The July Crisis &amp; The Outbreak of Total War</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 8pt; color: #334155; line-height: 1.35; margin: 0;">
                Backed by Germany’s "Blank Cheque", Austria-Hungary issues an ultimatum and declares war on Serbia. Russia mobilizes; Germany declares war on Russia and France, invading neutral Belgium under the Schlieffen Plan. Great Britain declares war on Germany on 4 August to defend the 1839 Treaty of London.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 6 &bull; The July Crisis Domino Sequence &bull; Treaty of London (1839) &bull; World War
            </div>
          </div>
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 36mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-style: italic;">
              [Sketch: 4 August declaration / Belgian border]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1914 World War</span><span>⌟</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Living Timeline Part II Synthesis Challenge -->
      <div style="border: 1.2px solid #b91c1c; background: #fffaf0; border-radius: 4px; padding: 5px 9px; margin-top: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #b91c1c; letter-spacing: 0.5px;">
            Living Timeline Synthesis Challenge &bull; The Escalation Dominoes
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 700; color: #991b1b;">Chain Reaction Check</span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #334155; margin-bottom: 3px; line-height: 1.3;">
          Explain how the combination of the German "Blank Cheque" (5 July) and rigid railway mobilization schedules turned an Austro-Serbian clash into a global war within 37 days:
        </div>
        <div class="task-line-dotted" style="height: 5.2mm;"></div>
        <div class="task-line-dotted" style="height: 5.2mm;"></div>
      </div>
    </div>

    <!-- Colophon -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
      <span>The History Department &bull; Causes of the Great War</span>
      <span>Page 3 (Facing Spread Right)</span>
    </div>
  </div>
`;

  // ==========================================
  // PAGES 4–15: 6 DOUBLE-PAGE SPREADS
  // ==========================================
  lessons.forEach((lesson, lIdx) => {
    const cfg = lessonConfigs[lIdx];
    const leftPageNum = lIdx * 2 + 4;
    const rightPageNum = lIdx * 2 + 5;

    // ----------------------------------------------------
    // LEFT PAGE (Verso, Even Page Number: 4, 6, 8, 10, 12, 14)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${leftPageNum}">
      <div>
        <!-- Lesson Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">
              Unit 9: Causes of the Great War &bull; Lesson ${lIdx + 1}
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              L${lIdx + 1}: ${lesson.title}
            </h2>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
            Evidence &amp; Skills Launch
          </span>
        </div>

        <!-- Learning Objectives -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">
            Core Learning Objectives:
          </strong>
          <ul style="margin: 0; padding-left: 15px; font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #334155; line-height: 1.3;">
    `;
    cfg.objectives.forEach((obj) => {
      html += `<li>${obj}</li>`;
    });
    html += `
          </ul>
        </div>

        <!-- Do Now Recall Strip (5 Questions, Score / 5) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; margin-bottom: 5px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.6px; color: #0f172a;">
              Do Now: Prior Knowledge Recall
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 800; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 1px 7px; border-radius: 3px;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px;">
    `;
    cfg.doNow.forEach((item, qIdx) => {
      html += `
            <div style="background: #fafaf9; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 4px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.2; color: #1e293b; margin-bottom: 2px;">
                <strong style="color: #1e3a8a;">Q${qIdx + 1}:</strong> ${item.q}
              </div>
              <div>
                <div class="task-line-dotted" style="height: 4.8mm;"></div>
                <div class="task-line-dotted" style="height: 4.8mm;"></div>
              </div>
            </div>
      `;
    });
    html += `
          </div>
        </div>

        <!-- Core Vocabulary Check -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 7px; margin-bottom: 5px; background: #fdfbf7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px;">
              Core Vocabulary &amp; Conceptual Precision
            </strong>
          </div>
    `;

    if (cfg.vocabTask.type === 'distinction') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155; margin-bottom: 2px; line-height: 1.25;">
            ${cfg.vocabTask.prompt}
          </div>
          <div class="task-line" style="height: 5.6mm;"></div>
          <div class="task-line" style="height: 5.6mm;"></div>
      `;
    } else if (cfg.vocabTask.type === 'cloze') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155; margin-bottom: 2px;">
            ${cfg.vocabTask.prompt}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 5px; margin-bottom: 2px; line-height: 1.25;">
            ${cfg.vocabTask.clozeText}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #475569;">
            <strong>Application:</strong> ${cfg.vocabTask.followUp}
          </div>
          <div class="task-line" style="height: 5.4mm;"></div>
          <div class="task-line" style="height: 5.4mm;"></div>
      `;
    } else if (cfg.vocabTask.type === 'mapping') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155; margin-bottom: 2px; line-height: 1.25;">
            ${cfg.vocabTask.prompt}
          </div>
          <div class="task-line" style="height: 5.6mm;"></div>
          <div class="task-line" style="height: 5.6mm;"></div>
      `;
    } else if (cfg.vocabTask.type === 'golden_sentence') {
      html += `
          <div style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155; margin-bottom: 2px; line-height: 1.25;">
            ${cfg.vocabTask.prompt}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.1pt; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; padding: 2px 5px; border-radius: 3px; margin-bottom: 2px;">
            <strong>Word Bank:</strong> ${cfg.vocabTask.wordBank}
          </div>
          <div class="task-line" style="height: 5.6mm;"></div>
          <div class="task-line" style="height: 5.6mm;"></div>
      `;
    }

    html += `
        </div>

        <!-- Task 4: Rich Archival Forensic Interrogation / Bridge Task -->
        <div style="border: 1.5px solid #0f172a; border-radius: 5px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #0f172a; padding-bottom: 2px; margin-bottom: 4px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #0f172a; text-transform: uppercase;">
              ${cfg.bridgeTask.title}
            </strong>
          </div>
    `;

    // Render bespoke Task 4 variants
    if (cfg.bridgeTask.type === 'source_annotation') {
      html += `
          <div style="border: 1.2px solid #cbd5e1; border-left: 4px solid #1e3a8a; background: #fffdfa; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a;">
                ${cfg.bridgeTask.sourceTitle}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 1px 5px; border-radius: 3px;">
                ${cfg.bridgeTask.shelfmark}
              </span>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 8.2pt; font-style: italic; color: #1e293b; line-height: 1.35; margin-bottom: 2px;">
              ${cfg.bridgeTask.sourceText}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #e2e8f0; padding-top: 2px;">
              <strong>Provenance:</strong> ${cfg.bridgeTask.provenance}
            </div>
          </div>

          <!-- Active Annotation Box -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; padding: 2px 6px; margin-bottom: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;">
              ✏️ Active Source Annotation Protocol:
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0c4a6e; line-height: 1.2;">
              <div>${cfg.bridgeTask.annotations[0]}</div>
              <div>${cfg.bridgeTask.annotations[1]}</div>
              <div>${cfg.bridgeTask.annotations[2]}</div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Historical Inference:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Contextual Explanation:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_source') {
      const b64Img = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fffdfa; margin-bottom: 4px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; overflow: hidden; background: #0f172a; height: 105px;">
              <img src="${b64Img}" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" alt="La Tache Noire">
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #b91c1c; text-transform: uppercase; margin-bottom: 1px;">
                  ${cfg.bridgeTask.imgCaption}
                </div>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #1e293b; line-height: 1.3; margin: 0;">
                  ${cfg.bridgeTask.sourceText}
                </p>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #e2e8f0; padding-top: 2px;">
                <strong>Archival Source:</strong> French Ministry of Public Instruction (1882 Education Law)
              </div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Visual Interrogation:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Geopolitical Consequence:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'visual_map') {
      const b64Map = getBase64Image(cfg.bridgeTask.imgSrc);
      html += `
          <div style="display: grid; grid-template-columns: 140px 1fr; gap: 8px; align-items: stretch; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fffdfa; margin-bottom: 4px;">
            <div style="border: 1px solid #cbd5e1; border-radius: 3px; overflow: hidden; background: #f8fafc; height: 105px;">
              <img src="${b64Map}" style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;" alt="Map of Africa 1914">
            </div>
            <div style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 1px;">
                  ${cfg.bridgeTask.imgCaption}
                </div>
                <p style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #1e293b; line-height: 1.3; margin: 0;">
                  ${cfg.bridgeTask.sourceText}
                </p>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; border-top: 1px dotted #e2e8f0; padding-top: 2px;">
                <strong>Cartographic Record:</strong> General Act of the Berlin Conference (1885)
              </div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Cartographic Inference:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Geopolitical Escalation:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'technical_table') {
      html += `
          <div style="border: 1.2px solid #cbd5e1; border-left: 4px solid #1e3a8a; background: #fffdfa; border-radius: 4px; padding: 4px 7px; margin-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a;">
                ${cfg.bridgeTask.sourceTitle}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #475569; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 1px 5px; border-radius: 3px;">
                ${cfg.bridgeTask.shelfmark}
              </span>
            </div>
            <div style="font-family: 'Georgia', serif; font-size: 7.9pt; font-style: italic; color: #1e293b; line-height: 1.3; margin-bottom: 2px;">
              ${cfg.bridgeTask.sourceText}
            </div>
          </div>

          <!-- Technical Comparison Table -->
          <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.1pt; margin-bottom: 4px; border: 1px solid #cbd5e1;">
            <thead>
              <tr style="background: #f1f5f9; color: #0f172a;">
                ${cfg.bridgeTask.tableHeaders.map((h, hi) => `<th style="padding: 3px 5px; text-align: left; border: 1px solid #cbd5e1; font-size: 7.2pt; width: ${hi === 0 ? '24%' : '38%'};">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${cfg.bridgeTask.tableRows
                .map(
                  (r) => `
                <tr>
                  <td style="padding: 2.5px 5px; font-weight: 700; border: 1px solid #cbd5e1; background: #fafaf9;">${r[0]}</td>
                  <td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">${r[1]}</td>
                  <td style="padding: 2.5px 5px; border: 1px solid #cbd5e1; background: #eff6ff; font-weight: 600;">${r[2]}</td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Technological Inference:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Strategic Escalation:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'willy_nicky_telegrams') {
      html += `
          <!-- Side-by-Side Telegrams Box -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px;">
            <div style="border: 1.2px solid #cbd5e1; border-left: 3px solid #1e3a8a; background: #f8fafc; padding: 4px 6px; border-radius: 3px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px;">
                <strong style="font-family: 'Special Elite', monospace; font-size: 7.2pt; color: #1e3a8a;">${cfg.bridgeTask.sourceATitle}</strong>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #1e293b; line-height: 1.25;">
                ${cfg.bridgeTask.sourceAText}
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; margin-top: 2px;">
                ${cfg.bridgeTask.sourceAShelfmark}
              </div>
            </div>

            <div style="border: 1.2px solid #cbd5e1; border-left: 3px solid #b91c1c; background: #fffaf0; padding: 4px 6px; border-radius: 3px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px;">
                <strong style="font-family: 'Special Elite', monospace; font-size: 7.2pt; color: #b91c1c;">${cfg.bridgeTask.sourceBTitle}</strong>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 7.6pt; font-style: italic; color: #1e293b; line-height: 1.25;">
                ${cfg.bridgeTask.sourceBText}
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; margin-top: 2px;">
                ${cfg.bridgeTask.sourceBShelfmark}
              </div>
            </div>
          </div>

          <!-- Active Telegraph Annotation Protocol -->
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; padding: 2px 6px; margin-bottom: 4px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;">
              ✏️ Active Telegraph Annotation Protocol:
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #0c4a6e; line-height: 1.2;">
              <div>${cfg.bridgeTask.annotations[0]}</div>
              <div>${cfg.bridgeTask.annotations[1]}</div>
              <div>${cfg.bridgeTask.annotations[2]}</div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Diplomatic Analysis:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Structural Inevitability:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    } else if (cfg.bridgeTask.type === 'crime_scene_forensics') {
      html += `
          <!-- Crime Scene Schematic + Blank Cheque Box -->
          <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 6px; margin-bottom: 4px;">
            <!-- SVG Crime Scene Route Map -->
            <div style="border: 1.2px solid #cbd5e1; border-radius: 3px; background: #fafaf9; padding: 4px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
                Forensic Route Schematic: Sarajevo (28 June 1914)
              </div>
              <!-- Vector Diagram of Franz Josef Street & Appel Quay -->
              <svg viewBox="0 0 280 110" style="width: 100%; height: 80px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 2px;">
                <!-- River Miljacka -->
                <rect x="0" y="80" width="280" height="30" fill="#e0f2fe" />
                <text x="10" y="98" font-family="Inter, sans-serif" font-size="8" fill="#0369a1" font-weight="bold">River Miljacka</text>
                <!-- Appel Quay -->
                <rect x="0" y="48" width="280" height="30" fill="#f1f5f9" stroke="#94a3b8" stroke-dasharray="2,2" />
                <text x="10" y="66" font-family="Inter, sans-serif" font-size="7.5" fill="#475569">Appel Quay (Original Motorcade Route)</text>
                <!-- Latin Bridge -->
                <rect x="145" y="48" width="22" height="62" fill="#cbd5e1" stroke="#475569" stroke-width="1.2" />
                <text x="156" y="95" font-family="Inter, sans-serif" font-size="6.5" fill="#0f172a" text-anchor="middle" transform="rotate(-90 156 95)">Latin Bridge</text>
                <!-- Franz Josef Street -->
                <rect x="145" y="0" width="22" height="48" fill="#fef3c7" stroke="#d97706" />
                <!-- Wrong Turn Arrow -->
                <path d="M 125 63 L 156 63 L 156 25" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arrow)" />
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
                  </marker>
                </defs>
                <!-- Schiller's Delicatessen -->
                <rect x="170" y="5" width="85" height="36" fill="#fef2f2" stroke="#b91c1c" stroke-width="1.2" rx="2" />
                <text x="212" y="20" font-family="Inter, sans-serif" font-size="6.5" fill="#991b1b" font-weight="bold" text-anchor="middle">Schiller's Deli</text>
                <text x="212" y="32" font-family="Inter, sans-serif" font-size="6" fill="#dc2626" text-anchor="middle">★ Princip Stood Here</text>
                <!-- Stalled Car Marker -->
                <circle cx="156" cy="22" r="5.5" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />
                <text x="156" y="25" font-family="Inter, sans-serif" font-size="7" fill="#ffffff" font-weight="bold" text-anchor="middle">✕</text>
                <text x="100" y="18" font-family="Inter, sans-serif" font-size="6.5" fill="#b91c1c" font-weight="bold">Fatal Wrong Turn</text>
              </svg>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; margin-top: 1px;">
                Chauffeur stalls car attempting to reverse outside Schiller's Delicatessen.
              </div>
            </div>

            <!-- Source B: Blank Cheque Box -->
            <div style="border: 1.2px solid #cbd5e1; border-left: 3px solid #b91c1c; background: #fffaf0; padding: 4px 6px; border-radius: 3px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #b91c1c; text-transform: uppercase; margin-bottom: 2px;">
                  ${cfg.bridgeTask.sourceBTitle}
                </div>
                <div style="font-family: 'Georgia', serif; font-size: 7.5pt; font-style: italic; color: #1e293b; line-height: 1.25;">
                  ${cfg.bridgeTask.sourceBText}
                </div>
              </div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; border-top: 1px dotted #cbd5e1; padding-top: 2px;">
                ${cfg.bridgeTask.sourceBShelfmark}
              </div>
            </div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">1. Forensic Route Analysis:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionA}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>

          <div style="margin-bottom: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a;">2. Geopolitical Escalation:</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #334155;">${cfg.bridgeTask.questionB}</span>
            <div class="task-line" style="height: 5.6mm;"></div>
            <div class="task-line" style="height: 5.6mm;"></div>
          </div>
      `;
    }

    // Clue & Scholar's Edge footer
    html += `
          <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; margin-top: 3px; display: flex; justify-content: space-between; font-family: 'Georgia', serif; font-size: 7.2pt;">
            <span style="color: #475569;">${cfg.bridgeTask.clue}</span>
            <span style="color: #1e3a8a; font-weight: bold;">${cfg.bridgeTask.scholarsEdge}</span>
          </div>
        </div>
      </div>

      <!-- Left Page Colophon -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
        <span>The History Department &bull; Causes of the Great War (V2 Staged)</span>
        <span>Page ${leftPageNum} (Facing Spread Left)</span>
      </div>
    </div>
    `;

    // ----------------------------------------------------
    // RIGHT PAGE (Recto, Odd Page Number: 5, 7, 9, 11, 13, 15)
    // ----------------------------------------------------
    html += `
    <div class="page page-container" id="page-${rightPageNum}">
      <div>
        <!-- Enquiry Question Header -->
        <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 800;">
              Historical Skill: ${cfg.skill}
            </div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 12.2pt; color: #0f172a; margin: 2px 0 0 0; line-height: 1.2;">
              ${cfg.enquiryQuestion}
            </h3>
          </div>
          <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe; flex-shrink: 0;">
            Extended Writing
          </span>
        </div>

        <!-- Bespoke Disciplinary Structure Strip (Active Student Planning Matrix with Dotted Lines) -->
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; margin-bottom: 4px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px; margin-bottom: 3px; display: flex; justify-content: space-between;">
            <span>Enquiry Planning Matrix: Map your 3 arguments before writing</span>
            <span style="color: #64748b; font-weight: 600;">Draft bullet points below &darr;</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
            ${cfg.structureStrip
              .map(
                (col) => `
              <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; background: #ffffff;">
                <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e3a8a; display: block; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">${col.col}</strong>
                <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; color: #475569; line-height: 1.2; display: block; margin-bottom: 2px;">${col.prompt}</span>
                <div class="task-line-dotted" style="height: 4.6mm;"></div>
                <div class="task-line-dotted" style="height: 4.6mm;"></div>
                <div class="task-line-dotted" style="height: 4.6mm;"></div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Categorized Word Bank & Causal Connectives -->
        <div style="border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; padding: 3px 7px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7pt; line-height: 1.3;">
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: center; margin-bottom: 1px;">
            <strong style="color: #1e3a8a; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.5px;">Technical Bank:</strong>
            <span style="color: #334155;">${cfg.wordBank.technical}</span>
          </div>
          <div style="display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: center; margin-bottom: 1px;">
            <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.5px;">Geopolitical Bank:</strong>
            <span style="color: #334155;">${cfg.wordBank.geopolitical}</span>
          </div>
          <div style="border-top: 1px dashed #cbd5e1; padding-top: 2px; display: grid; grid-template-columns: auto 1fr; gap: 6px; align-items: center;">
            <strong style="color: #b91c1c; text-transform: uppercase; font-size: 6.8pt; letter-spacing: 0.5px;">Causal Stems:</strong>
            <span style="color: #475569; font-style: italic;">${cfg.wordBank.connectives}</span>
          </div>
        </div>

        <!-- Disciplinary Writing Framework Strip (PEEL) -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 2px 7px; margin-bottom: 4px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #1e293b;">
          <span><strong style="color: #1e3a8a;">[P] Point:</strong> Clear thesis answering question.</span>
          <span><strong style="color: #1e3a8a;">[E] Evidence:</strong> Specific dates, treaties &amp; sources.</span>
          <span><strong style="color: #1e3a8a;">[E] Explanation:</strong> Causal mechanism explained.</span>
          <span><strong style="color: #1e3a8a;">[L] Link:</strong> Evaluate overall historical weight.</span>
        </div>

        <!-- Ruled Writing Lines (Precisely 13 lines at 7.2mm filling the page) -->
        <div class="auto-fill-writing-lines" data-line-height="7.2">
          ${Array(13).fill('<div class="task-line" style="height: 7.2mm;"></div>').join('')}
        </div>
      </div>

      <!-- Teacher Assessment & DIRT Footer -->
      <div style="margin-top: 4px;">
        <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; background: #f8fafc; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.5pt;">
            <span><strong style="color: #0f172a;">Mark:</strong> &nbsp; &nbsp; &nbsp; &nbsp; / 16</span>
            <span><strong style="color: #0f172a;">DOK Level:</strong> [ 1 &bull; 2 &bull; 3 &bull; 4 ]</span>
            <span><strong style="color: #0f172a;">Fingertip Vocab Used:</strong> [ Y &bull; N ]</span>
            <span style="font-weight: 700; color: #1e3a8a; text-transform: uppercase;">Teacher Assessment &bull; DIRT Target</span>
          </div>
          <div style="display: flex; align-items: center; margin-top: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; margin-right: 6px; white-space: nowrap;">DIRT Target:</strong>
            <div style="flex: 1; border-bottom: 1.2px dotted #94a3b8; height: 12px;"></div>
          </div>
        </div>

        <!-- Colophon -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8;">
          <span>Causes of the Great War &bull; Extended Writing Spread</span>
          <span>Page ${rightPageNum} (Facing Spread Right)</span>
        </div>
      </div>
    </div>
    `;
  });

  // ==========================================
  // PAGE 16: MASTER REVIEW & ASSESSMENT HUB
  // ==========================================
  html += `
  <div class="page page-container" id="page-16" style="justify-content: space-between;">
    <div>
      <!-- Header -->
      <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">
            The History Department &bull; Assessment &amp; Revision Synthesis
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; margin: 2px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px;">
            Causes of the Great War (1871–1914) &bull; Master Review
          </h2>
        </div>
        <span class="archival-badge" style="background: #eff6ff; color: #1e3a8a; border-color: #bfdbfe;">
          Unit Revision Hub
        </span>
      </div>

      <!-- M-A-I-N Long-Term Causes Matrix -->
      <div style="border: 1.2px solid #0f172a; border-radius: 5px; padding: 6px 9px; background: #f8fafc; margin-bottom: 6px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 4px;">
          The M-A-I-N Framework of Long-Term Causes:
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; padding: 3px 6px; background: #ffffff; border-radius: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e3a8a;">[M] MILITARISM</strong>
            <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; margin: 2px 0 0 0; line-height: 1.25;">
              The Anglo-German naval arms race (Dreadnoughts); rigid railway mobilization timetables (Schlieffen Plan); glorification of armed combat as national duty.
            </p>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; padding: 3px 6px; background: #ffffff; border-radius: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e3a8a;">[A] ALLIANCES</strong>
            <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; margin: 2px 0 0 0; line-height: 1.25;">
              The Triple Alliance (Germany, Austria-Hungary, Italy) vs. The Triple Entente (Britain, France, Russia). Intended as deterrence, but acted as a doomsday machine.
            </p>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; padding: 3px 6px; background: #ffffff; border-radius: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e3a8a;">[I] IMPERIALISM</strong>
            <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; margin: 2px 0 0 0; line-height: 1.25;">
              Kaiser Wilhelm II’s aggressive demand for a "Place in the Sun" (Weltpolitik); clashes over Morocco (Tangier 1905, Agadir 1911); partition of Africa.
            </p>
          </div>
          <div style="border: 1px solid #cbd5e1; border-left: 3px solid #1e3a8a; padding: 3px 6px; background: #ffffff; border-radius: 3px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #1e3a8a;">[N] NATIONALISM</strong>
            <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; margin: 2px 0 0 0; line-height: 1.25;">
              French desire for revanche over Alsace-Lorraine; Pan-Slavic nationalism in the Balkans; Serbian underground networks (The Black Hand).
            </p>
          </div>
        </div>
      </div>

      <!-- Historiographical Debate -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 6px 9px; background: #ffffff; margin-bottom: 6px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 3px;">
          Historiographical Debate: Who Was to Blame?
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #334155; line-height: 1.3;">
            <strong style="color: #b91c1c;">Fritz Fischer (1961):</strong> Argued that imperial Germany bore primary responsibility by deliberately provoking a European war via the "Blank Cheque" to break out of encirclement and achieve world power status.
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #334155; line-height: 1.3;">
            <strong style="color: #0369a1;">Christopher Clark (2012):</strong> Argued in <em>The Sleepwalkers</em> that all European powers shared blame. Leaders were blind to the catastrophic risks of their diplomatic maneuvers, sleepwalking into a tragedy none truly wanted.
          </div>
        </div>
      </div>

      <!-- Chronological Mastery Challenge (Matching Grid) -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 5px 9px; background: #fdfbf7; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a; text-transform: uppercase;">
            Chronological Mastery Challenge &bull; Match Event to Year:
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">Draw connecting lines</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; font-family: 'Inter', sans-serif; font-size: 7.1pt;">
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1871:</strong> German Empire proclaimed at Versailles</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1890:</strong> Bismarck dismissed; Reinsurance Treaty lapses</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1904:</strong> Entente Cordiale ends British isolation</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1906:</strong> HMS Dreadnought launched in Portsmouth</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 1911:</strong> SMS Panther sent to Agadir; crisis erupts</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 28 June 1914:</strong> Princip shoots Archduke in Sarajevo</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 5 July 1914:</strong> Germany gives Austria the "Blank Cheque"</div>
          <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 3px 5px; border-radius: 3px;"><strong>[ &nbsp; ] 4 Aug 1914:</strong> Britain declares war over Belgian neutrality</div>
        </div>
      </div>

      <!-- Pupil Assessment & DIRT Progress Ledger -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 9px; background: #ffffff; margin-bottom: 6px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 3px;">
          Pupil Assessment &amp; DIRT Progress Ledger
        </strong>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7.1pt; border: 1px solid #cbd5e1;">
          <thead>
            <tr style="background: #f1f5f9; color: #0f172a;">
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: left;">Lesson Enquiry</th>
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; width: 65px;">Do Now (/5)</th>
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; width: 65px;">Essay (/16)</th>
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: center; width: 85px;">DIRT Complete</th>
              <th style="padding: 2.5px 5px; border: 1px solid #cbd5e1; text-align: left;">Teacher Signature</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L1: German Empire Unification (1871)</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L2: Franco-Prussian War &amp; Alsace-Lorraine</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L3: The Scramble for Africa &amp; Weltpolitik</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L4: HMS Dreadnought &amp; Naval Arms Race</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L5: The Alliance System: Peace or Trap?</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
            <tr><td style="padding: 2.5px 5px; border: 1px solid #cbd5e1;">L6: Sarajevo Assassination &amp; July Crisis</td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1;"></td><td style="border: 1px solid #cbd5e1; text-align: center;">[ &nbsp; ]</td><td style="border: 1px solid #cbd5e1;"></td></tr>
          </tbody>
        </table>
      </div>

      <!-- Synoptic Final Verdict Planning Strip -->
      <div style="border: 1.2px solid #1e3a8a; border-radius: 4px; padding: 4px 8px; background: #f8fafc;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">
          Synoptic Master Enquiry Verdict: "How did decades of rivalry culminate in 30 days of madness?"
        </strong>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #334155; margin-bottom: 2px;">
          Draft your overall historical conclusion connecting long-term militarism (M-A-I-N) to the short-term July Crisis trigger:
        </div>
        <div class="task-line-dotted" style="height: 4.8mm;"></div>
        <div class="task-line-dotted" style="height: 4.8mm;"></div>
      </div>
    </div>

    <!-- Final Institutional Signoff -->
    <div style="border-top: 1px solid #cbd5e1; padding-top: 4px; text-align: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b;">
      <span>The History Revision Hub &bull; Year 9 Master Curriculum Series &bull; Staged 4-Act V2 Edition</span>
    </div>
  </div>
`;

  html += `
</body>
</html>
`;

  return html;
}

/**
 * Main rendering routine (HTML + Puppeteer PDF export)
 */
async function renderGreatWarTwoPageWorkbook() {
  console.log('🚀 Rendering Staged V2 Two-Page Workbook for Causes of the Great War...');
  const html = buildGreatWarTwoPageWorkbookHtml();

  // Write staged HTML file
  const outHtmlPath = path.join(ROOT_DIR, 'public', 'units', 'great_war', 'pupil_workbook_v2.html');
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  console.log(`✅ Staged HTML generated at: ${outHtmlPath}`);

  // Compile PDF via Puppeteer
  console.log('🖨️ Compiling PDF via Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

  const outPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', 'great_war_pupil_workbook_V2.pdf');
  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '12mm', left: '12mm', right: '12mm' },
  });

  await browser.close();
  const pdfStats = fs.statSync(outPdfPath);
  console.log(
    `🎉 Masterpiece Staged PDF successfully compiled: ${outPdfPath} (${(pdfStats.size / 1024).toFixed(1)} KB)`,
  );
}

if (require.main === module) {
  renderGreatWarTwoPageWorkbook().catch((err) => {
    console.error('❌ Error rendering Great War Two-Page Workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  buildGreatWarTwoPageWorkbookHtml,
  renderGreatWarTwoPageWorkbook,
  lessonConfigs,
};
