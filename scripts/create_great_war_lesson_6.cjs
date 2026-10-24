/**
 * scripts/create_great_war_lesson_6.cjs
 *
 * Generates and injects Lesson 6: November Assessment Masterclass
 * into units/great_war/data.js and re-compiles public/database.json.
 * Streamlined specifically for lower-ability Year 9 pupils:
 * - Minimal extraneous text / high-clarity facts
 * - Strictly 3 developed PEEL paragraphs (NO conclusion)
 * - Model answer halved in length with clear [P]-[E]-[E]-[L] tags
 * - Zero confusing source analysis plates
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');

const lesson6Data = {
  id: 'lesson_6',
  title: 'November Assessment Masterclass: Why Did War Break Out in 1914?',
  enquiry: 'Why did war break out in 1914?',
  enquiryQuestion: 'Why did war break out in 1914?',
  subtitle:
    'Step-by-step PEEL Planning & Scaffolding Workshop: German Unification, Imperial Rivalry, Naval Arms Race, Alliances & Assassination',
  skill: 'Disciplinary Skill: Causal Explanation & Structured PEEL Synthesis',
  card_image: '/images/great_war_cover.jpg',
  card_position: 'center 45%',
  banner: '/images/great_war_cover.jpg',
  cover_image: '/images/great_war_cover.jpg',

  prologue:
    'Welcome to your Year 9 November Assessment Masterclass! In this workshop, you will prepare for your 30-minute formal assessment: "Why did war break out in 1914?". You will write three developed PEEL paragraphs choosing from four key historical catalysts: German unification, Imperial rivalry, the Naval arms race, or Alliances and the Sarajevo assassination. Remember: NO conclusion is needed for this question! Over your revision period, you are permitted to prepare ONE single sheet of A4 paper containing bullet points, mind maps, statistics, and dates to bring directly into the assessment room.',

  assessment_notice: {
    title: 'Year 9 November Formal Assessment Timetable & Rules',
    groups: [
      {
        set: 'Set 9Y',
        date: 'Monday 9th November',
        period: 'Formal Assessment (30 mins • 12 marks)',
      },
      {
        set: 'Set 9X',
        date: 'Thursday 12th November',
        period: 'Formal Assessment (30 mins • 12 marks)',
      },
    ],
    rules: [
      'You are permitted to bring ONE sheet of A4 lined paper with revision notes into the assessment.',
      'Notes MUST be in bullet points, timelines, or mind maps — strictly NO full continuous sentences or pre-written paragraphs.',
      'Write 3 developed PEEL paragraphs choosing 3 of the 4 key historical catalysts.',
      'Strictly 3 paragraphs — NO conclusion is required for this "Why" question!',
      'Total assessment time: 30 minutes (12 marks).',
    ],
  },

  margin_spine: [
    { year: '1871', label: 'Reason 1: German Unification' },
    { year: '1884–1911', label: 'Reason 2: Imperial Rivalry' },
    { year: '1898–1906', label: 'Reason 3: Naval Arms Race' },
    { year: '1879–1907', label: 'Reason 4a: Alliance Blocs' },
    { year: 'June 1914', label: 'Reason 4b: Sarajevo Assassination' },
  ],

  causal_domino_spine: {
    title: 'The Catalysts of the Great War (1871–1914)',
    subtitle:
      'How Decades of Imperial Tension, Militarism and Alliances Culminated in Global Conflict',
    stages: [
      {
        step: 1,
        para_ref: '[6.1]',
        date: '1871',
        title: 'Reason 1: German Unification & Alsace-Lorraine Seized',
        actor: 'Chancellor Otto von Bismarck & Kaiser Wilhelm I',
        tag: '🚩 NATIONALISM',
        trigger:
          'Prussia unites 39 independent states into the German Empire at Versailles and annexes Alsace-Lorraine from France.',
        connective:
          'Created a massive new military superpower in the heart of Europe and instilled a permanent French desire for revenge (Revanche).',
        question:
          'Why did German unification in 1871 permanently destabilise the European balance of power?',
      },
      {
        step: 2,
        para_ref: '[6.2]',
        date: '1884–1911',
        title: 'Reason 2: Imperial Rivalry & The Scramble for Africa',
        actor: 'Kaiser Wilhelm II & European Imperial Powers',
        tag: '🌍 IMPERIALISM',
        trigger:
          'European powers carved up Africa at the 1884 Berlin Conference; Wilhelm II launched Weltpolitik demanding Germany’s "place in the sun", sparking crises in Morocco (1905, 1911).',
        connective:
          'Drove Britain and France into a closer defensive alliance while isolating Germany and intensifying international paranoia.',
        question:
          'How did imperial ambitions in Africa poison diplomatic relations between Germany, France, and Britain?',
      },
      {
        step: 3,
        para_ref: '[6.3]',
        date: '1898–1906',
        title: 'Reason 3: Anglo-German Naval Race & HMS Dreadnought',
        actor: 'Admiral Tirpitz & Admiral Jackie Fisher',
        tag: '🎖️ MILITARISM',
        trigger:
          'Tirpitz passed Naval Laws to build 38 battleships; Britain launched the revolutionary all-big-gun HMS Dreadnought in 1906, resetting naval strength to zero.',
        connective:
          'Britain viewed Germany’s battlefleet as a direct threat to island survival and trade, ending British "Splendid Isolation".',
        question:
          'Why did the launch of HMS Dreadnought turn naval competition into an existential crisis?',
      },
      {
        step: 4,
        para_ref: '[6.4]',
        date: '1879–1907',
        title: 'Reason 4a: Division of Europe into Rival Armed Camps',
        actor: 'The Great Powers of Europe',
        tag: '🤝 ALLIANCES',
        trigger:
          'Europe split into two opposing blocs: Triple Alliance (Germany, Austria-Hungary, Italy) and Triple Entente (Britain, France, Russia).',
        connective:
          'Created an inflexible chain-reaction trap where any regional conflict would automatically drag all major powers into war.',
        question:
          'How did the alliance system ensure that a small dispute would escalate into a continent-wide war?',
      },
      {
        step: 5,
        para_ref: '[6.5]',
        date: '28 June 1914',
        title: 'Reason 4b: The Spark: Sarajevo Assassination & July Crisis',
        actor: 'Gavrilo Princip, Franz Ferdinand & Kaiser Wilhelm II',
        tag: '⚡ THE SPARK',
        trigger:
          'Serbian nationalist Gavrilo Princip shoots Archduke Franz Ferdinand; Germany gives Austria a "Blank Cheque", triggering mobilisations.',
        connective:
          'Rigid railway timetables and alliance obligations turned a local Balkan murder into an unstoppable world war within 37 days.',
        question:
          'Why did the assassination in Sarajevo trigger the immediate domino fall into global war?',
      },
    ],
  },

  teacher_notes: {
    primer:
      'This masterclass equips Year 9 students for their 30-minute formal written assessment: "Why did war break out in 1914?". Students select three developed reasons from four core curriculum strands: (1) German Unification and Bismarck; (2) Imperial Rivalry and the Scramble for Africa; (3) The Anglo-German Naval Arms Race and HMS Dreadnought; and (4) The Alliance System and the Sarajevo Assassination. Emphasize to lower-ability pupils that strictly 3 developed PEEL paragraphs are required with NO conclusion.',
    objectives: [
      {
        objective:
          'Select three developed historical reasons from the four assessment options and construct a compliant 1-page A4 revision notes sheet.',
        primer:
          'Direct students to paragraphs [6.2] through [6.5]. Emphasize that notes must be in bullet points, dates, and statistics only — no pre-drafted essays.',
        question:
          'What are the rules for your 1 sheet of A4 notes, and which three factors will you choose to explain?',
      },
      {
        objective:
          'Apply the PEEL technique (Point, Evidence, Explain, Link) with differentiated sentence frames to explain causation.',
        primer:
          'Review the color-coded PEEL models in the masterclass. Ensure pupils understand that the "Explain" step must show HOW the factor caused fear, suspicion, or military pressure leading to 1914.',
        question:
          'Why is explaining the causal mechanism (the "Because / Therefore" step) essential to securing top marks?',
      },
      {
        objective:
          'Structure 3 developed paragraphs within the 30-minute time constraint without wasting time on a conclusion.',
        primer:
          'Remind pupils that in a pure "Why" explanation question, marks are awarded for 3 detailed causal paragraphs. A conclusion is not required.',
        question: 'How will you divide your 30 minutes across the three paragraphs?',
      },
    ],
    source_context:
      'Contemporary archival records of the 1871 German Empire proclamation, the gunboat SMS Panther at Agadir, HMS Dreadnought, and the July Crisis illustrate how imperial ambition, naval rivalry, and rigid treaties triggered global conflict in 1914. Hinge Question: Which of the four catalysts made peaceful compromise impossible once Franz Ferdinand was assassinated?',
  },

  do_now: {
    title: 'Do Now: Retrieval from Prior Lessons',
    type: 'mixed',
    items: [
      {
        question: 'Who assassinated Archduke Franz Ferdinand on 28 June 1914 in Sarajevo?',
        answer: 'Gavrilo Princip (a member of the Serbian nationalist group the Black Hand).',
      },
      {
        question:
          'What unconditional pledge of military backing did Germany give Austria-Hungary on 5 July 1914?',
        answer:
          'The "Blank Cheque" (promising German support for whatever action Austria took against Serbia).',
      },
      {
        question:
          'What revolutionary British battleship launched in 1906 reset naval supremacy between Britain and Germany?',
        answer:
          'HMS Dreadnought (with 10 x 12-inch guns and steam turbines, making older warships obsolete).',
      },
      {
        question: 'Which three nations completed the Triple Entente alliance in 1907?',
        answer: 'Great Britain, France, and Tsarist Russia.',
      },
      {
        question:
          'Which two mineral-rich French border provinces were annexed by Germany following the Franco-Prussian War in 1871?',
        answer:
          'Alsace and Lorraine (creating deep French national desire for revenge, known as Revanche).',
      },
    ],
  },

  vocab: [
    {
      term: 'PEEL Technique',
      definition:
        'A 4-step paragraph structure for historical explanation: Point (topic factor), Evidence (precise facts & dates), Explain (cause-and-effect mechanism), Link (tie back to 1914).',
    },
    {
      term: 'M-A-I-N Causes',
      definition:
        'The four deep long-term causes of the First World War: Militarism, Alliances, Imperialism, and Nationalism.',
    },
    {
      term: 'Alsace-Lorraine',
      definition:
        'Mineral-rich French border province containing coal and iron ore, annexed by Germany in 1871, fueling French "Revanche".',
    },
    {
      term: 'Revanche',
      definition:
        'The deep French national desire for revenge against Germany and the liberation of the lost provinces of Alsace and Lorraine.',
    },
    {
      term: 'Weltpolitik',
      definition:
        'Kaiser Wilhelm II’s aggressive "world policy" launched in the 1890s, demanding a massive navy and a global empire ("a place in the sun").',
    },
    {
      term: 'Two-Power Standard',
      definition:
        'Britain’s official naval rule (Naval Defence Act 1889) that the Royal Navy must equal the combined strength of the next two largest navies.',
    },
    {
      term: 'HMS Dreadnought',
      definition:
        'Britain’s revolutionary 1906 battleship featuring ten 12-inch heavy guns and steam turbines, which made all previous battleships instantly obsolete.',
    },
    {
      term: 'Triple Alliance',
      definition:
        'The defensive military pact formed in 1882 between Germany, Austria-Hungary, and Italy.',
    },
    {
      term: 'Triple Entente',
      definition:
        'The diplomatic coalition formed in 1907 between Great Britain, France, and Tsarist Russia to counterbalance the Triple Alliance.',
    },
    {
      term: 'Blank Cheque',
      definition:
        'Kaiser Wilhelm II’s promise of unconditional German military support to Austria-Hungary in July 1914, emboldening Austria to declare war on Serbia.',
    },
  ],

  narrative_blocks: [
    {
      act: 1,
      title: 'Deconstructing the Question: "Why Did War Break Out in 1914?"',
      theme_heading: 'Deconstructing the Question: "Why Did War Break Out in 1914?"',
      text: `<span class="para-ref">[6.1]</span> In your formal November assessment, you will answer the central historical question: <strong>"Why did war break out in 1914?"</strong> [12 marks • 30 mins].<br><br>
      To score full marks, you need to write <strong>strictly three developed PEEL paragraphs</strong> choosing 3 of the 4 key historical factors below. <strong>NO conclusion is required!</strong><br>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin: 16px 0;">
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #ef4444; border-radius: 8px; padding: 12px 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
          <strong style="color: #991b1b; display: block; font-size: 0.95rem; margin-bottom: 4px;">1. German Unification (1871)</strong>
          <span style="font-size: 0.84rem; color: #475569; line-height: 1.4;">Bismarck unites Germany, crowns Kaiser at Versailles, takes Alsace-Lorraine; French <em>Revanche</em>.</span>
        </div>
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 12px 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
          <strong style="color: #92400e; display: block; font-size: 0.95rem; margin-bottom: 4px;">2. Imperial Rivalry &amp; Africa (1884–1911)</strong>
          <span style="font-size: 0.84rem; color: #475569; line-height: 1.4;">Scramble for Africa, Wilhelm II's <em>Weltpolitik</em> ("place in the sun"), Moroccan Crises (1905, 1911).</span>
        </div>
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 12px 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
          <strong style="color: #1e40af; display: block; font-size: 0.95rem; margin-bottom: 4px;">3. Naval Arms Race (1898–1914)</strong>
          <span style="font-size: 0.84rem; color: #475569; line-height: 1.4;">British Two-Power Standard, German Naval Laws, launch of HMS Dreadnought (1906).</span>
        </div>
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #10b981; border-radius: 8px; padding: 12px 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
          <strong style="color: #065f46; display: block; font-size: 0.95rem; margin-bottom: 4px;">4. Alliances &amp; Sarajevo (1879–1914)</strong>
          <span style="font-size: 0.84rem; color: #475569; line-height: 1.4;">Triple Alliance vs Triple Entente, Gavrilo Princip shoots Franz Ferdinand, Blank Cheque.</span>
        </div>
      </div>
      <br><strong>The 30-Minute Timing Strategy (3 Paragraphs • No Conclusion):</strong><br>
      • <strong>0–3 mins:</strong> Check your 1 sheet of A4 notes. Choose your 3 best factors.<br>
      • <strong>3–12 mins (9 mins):</strong> Write Paragraph 1 using PEEL.<br>
      • <strong>12–21 mins (9 mins):</strong> Write Paragraph 2 using PEEL.<br>
      • <strong>21–30 mins (9 mins):</strong> Write Paragraph 3 using PEEL. Use final minute to check facts and spelling.<br><br>
      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Assessment Gateway</span>
          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise the complete 1871–1914 Timeline?</strong>
        </div>
        <a href="/?view=lessons&unit=great_war" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Causes of the Great War Unit Homepage
        </a>
      </div>`,
    },
    {
      act: 2,
      title: 'Reason 1: German Unification, Bismarck & French Revanche (1871)',
      theme_heading: 'Reason 1: German Unification, Bismarck & French Revanche (1871)',
      text: `<span class="para-ref">[6.2]</span> In 1871, Prussian Minister-President <strong>Otto von Bismarck</strong> united thirty-nine independent German states into the German Empire after defeating France in the Franco-Prussian War. King Wilhelm I was crowned Kaiser in the French palace at Versailles. Under the 1871 <strong>Treaty of Frankfurt</strong>, Germany annexed the mineral-rich border province of <strong>Alsace-Lorraine</strong>.<br><br>
      This caused war in 1914 because it created permanent French <strong>"Revanche"</strong> (revenge) and created a massive new military and industrial superpower in Central Europe, leaving Germany terrified of encirclement by France and Russia.<br><br>
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #ef4444; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">
        <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 4px;">Ready-to-Copy A4 Revision Notes • Reason 1</span>
        <h4 style="margin: 8px 0 6px 0; color: #0f172a; font-size: 1rem;">Put these 4 bullet points on your 1 sheet of A4 paper:</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #334155; line-height: 1.6;">
          <li><strong>1871 Unification:</strong> Bismarck used "blood and iron" to unite 39 states into the German Empire under Kaiser Wilhelm I.</li>
          <li><strong>Treaty of Frankfurt:</strong> Germany seized mineral-rich <strong>Alsace-Lorraine</strong> and demanded 5 billion gold francs from France.</li>
          <li><strong>Balance of Power:</strong> Germany instantly became the dominant military and steel superpower in Central Europe.</li>
          <li><strong>French Revanche:</strong> France swore permanent revenge to reclaim Alsace-Lorraine, making lasting peace impossible.</li>
        </ul>
      </div>
      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span>
          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise German Unification &amp; Alsace-Lorraine?</strong>
        </div>
        <a href="/?view=lessons&unit=great_war&lesson=1" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 1: German Unification (1871–1890)
        </a>
      </div>`,
    },
    {
      act: 3,
      title: 'Reason 2: Imperial Rivalry & The Scramble for Africa (1884–1911)',
      theme_heading: 'Reason 2: Imperial Rivalry & The Scramble for Africa (1884–1911)',
      text: `<span class="para-ref">[6.3]</span> In the 1880s, European powers competed to conquer overseas colonies during the <strong>Scramble for Africa</strong> (carved up at the 1884 Berlin Conference). In 1890, Kaiser Wilhelm II launched <strong>Weltpolitik</strong> ("World Policy"), aggressively demanding Germany's overseas <strong>"place in the sun"</strong> equal to Britain and France.<br><br>
      This caused war in 1914 because Germany provoked two dangerous flashpoints in Morocco (landing at <strong>Tangier</strong> in 1905 and sending the gunboat <strong>SMS Panther</strong> to Agadir in 1911). Rather than dividing Britain and France, German aggression drove the two powers into secret military talks and a firm defensive alliance.<br><br>
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #f59e0b; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">
        <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px;">Ready-to-Copy A4 Revision Notes • Reason 2</span>
        <h4 style="margin: 8px 0 6px 0; color: #0f172a; font-size: 1rem;">Put these 4 bullet points on your 1 sheet of A4 paper:</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #334155; line-height: 1.6;">
          <li><strong>Scramble for Africa (1884):</strong> 1884 Berlin Conference partitioned Africa; Britain and France took the richest colonies.</li>
          <li><strong>Weltpolitik:</strong> Kaiser Wilhelm II demanded Germany's "place in the sun" through aggressive overseas empire building.</li>
          <li><strong>Moroccan Crises:</strong> Germany challenged French control at Tangier (1905) and sent the gunboat <em>SMS Panther</em> to Agadir (1911).</li>
          <li><strong>Strengthened Entente:</strong> German bullying backfired, uniting Britain and France into a firm defensive military partnership.</li>
        </ul>
      </div>
      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span>
          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise Imperial Rivalry &amp; Morocco?</strong>
        </div>
        <a href="/?view=lessons&unit=great_war&lesson=2" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 2: Imperialism &amp; Moroccan Crises (1884–1911)
        </a>
      </div>`,
    },
    {
      act: 4,
      title: 'Reason 3: The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)',
      theme_heading: 'Reason 3: The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)',
      text: `<span class="para-ref">[6.4]</span> As an island nation, Great Britain relied on absolute naval mastery for trade and survival, enforcing the <strong>Two-Power Standard</strong> (the Royal Navy must equal the next two biggest navies combined). In 1898, Admiral Alfred von Tirpitz passed the German Naval Laws to build 38 battleships directly facing Britain across the North Sea.<br><br>
      In 1906, Britain launched <strong>HMS Dreadnought</strong>, an all-big-gun battleship that made all older warships obsolete and reset the race to zero. Although Britain won the race (29 dreadnoughts to 17 by 1914), the building contest convinced Britain that Germany was a deadly threat to British survival.<br><br>
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #3b82f6; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">
        <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px;">Ready-to-Copy A4 Revision Notes • Reason 3</span>
        <h4 style="margin: 8px 0 6px 0; color: #0f172a; font-size: 1rem;">Put these 4 bullet points on your 1 sheet of A4 paper:</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #334155; line-height: 1.6;">
          <li><strong>Two-Power Standard:</strong> Britain’s 1889 rule that the Royal Navy must equal the next two biggest navies combined.</li>
          <li><strong>German Naval Laws (1898):</strong> Admiral Tirpitz built 38 battleships directly opposite Britain to challenge British naval supremacy.</li>
          <li><strong>HMS Dreadnought (1906):</strong> Revolutionary all-big-gun warship (10 x 12-inch guns) that reset the battleship race to zero.</li>
          <li><strong>Naval Panic &amp; Tension:</strong> Public chanted "We want eight and we won't wait!"; permanently destroyed friendly Anglo-German relations.</li>
        </ul>
      </div>
      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateway</span>
          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise the Naval Race &amp; Dreadnought?</strong>
        </div>
        <a href="/?view=lessons&unit=great_war&lesson=3" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 3: Naval Arms Race &amp; HMS Dreadnought (1898–1914)
        </a>
      </div>`,
    },
    {
      act: 5,
      title: 'Reason 4: Rival Alliances & The Sarajevo Assassination (1879–1914)',
      theme_heading: 'Reason 4: Rival Alliances & The Sarajevo Assassination (1879–1914)',
      text: `<span class="para-ref">[6.5]</span> By 1914, Europe was split into two hostile armed camps: the <strong>Triple Alliance</strong> (Germany, Austria-Hungary, Italy) and the <strong>Triple Entente</strong> (Britain, France, Russia). While designed to deter attack, the alliances created a lethal trap where an attack on one ally dragged all six into war.<br><br>
      On <strong>28 June 1914</strong>, Serbian nationalist <strong>Gavrilo Princip</strong> (Black Hand) assassinated Austrian Archduke <strong>Franz Ferdinand</strong> in Sarajevo. Germany gave Austria an unconditional <strong>"Blank Cheque"</strong> (5 July), causing Austria's attack on Serbia to trigger Russian, German, French, and British entry within six weeks.<br><br>
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #10b981; border-radius: 8px; padding: 14px 18px; margin: 16px 0;">
        <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 4px;">Ready-to-Copy A4 Revision Notes • Reason 4</span>
        <h4 style="margin: 8px 0 6px 0; color: #0f172a; font-size: 1rem;">Put these 4 bullet points on your 1 sheet of A4 paper:</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #334155; line-height: 1.6;">
          <li><strong>Two Armed Camps:</strong> Triple Alliance (Germany, Austria, Italy) vs Triple Entente (Britain, France, Russia) created a domino trap.</li>
          <li><strong>Sarajevo (28 June 1914):</strong> Gavrilo Princip (Black Hand) shot Archduke Franz Ferdinand and wife Sophie in Sarajevo.</li>
          <li><strong>German Blank Cheque (5 July):</strong> Kaiser promised unconditional backing to Austria-Hungary, leading Austria to invade Serbia.</li>
          <li><strong>Chain Reaction (Aug 1914):</strong> Russia mobilized; Germany enacted Schlieffen Plan through Belgium; Britain declared war (4 Aug).</li>
        </ul>
      </div>
      <div style="margin: 16px 0; padding: 14px 18px; background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="background: #1e40af; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">Revision Gateways</span>
          <strong style="margin-left: 8px; color: #1e3a8a; font-size: 0.95rem;">Need to revise Alliances or the July Crisis?</strong>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="/?view=lessons&unit=great_war&lesson=4" target="_blank" style="padding: 7px 15px; background: #2563eb; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 4: Alliances &amp; Balkans
          </a>
          <a href="/?view=lessons&unit=great_war&lesson=5" target="_blank" style="padding: 7px 15px; background: #1e40af; color: white; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Lesson 5: Sarajevo &amp; July Crisis
          </a>
        </div>
      </div>`,
    },
  ],

  tasks: [
    {
      id: 'gw_l6_assessment_masterclass',
      type: 'extended_writing',
      topic: 'November Assessment: Why Did War Break Out in 1914? [12 marks • 30 mins]',
      title: 'November Assessment: Why Did War Break Out in 1914? [12 marks • 30 mins]',
      question:
        'Why did war break out in 1914? Explain three reasons using the PEEL technique. [12 marks • 30 mins]',
      stimulus: [
        '1. German unification and Bismarck (1871)',
        '2. Imperial rivalry and the Scramble for Africa (1884–1911)',
        '3. Naval Arms race and HMS Dreadnought (1898–1914)',
        '4. Alliances and the Sarajevo assassination (1879–1914)',
      ],
      scaffolding: {
        guidance:
          'Choose THREE of the four reasons above. Write strictly three developed PEEL paragraphs (Point, Evidence, Explain, Link). NO conclusion is required for this "Why" question! You are allowed to use your ONE sheet of A4 revision notes (bullet points, mind maps, statistics, and dates only). Aim for approximately 9 minutes per paragraph.',
        structure_strip: [
          {
            col: '1. PARAGRAPH 1 (FIRST FACTOR)',
            prompt:
              'State your first factor clearly. Deploy 2–3 precise facts from your notes (e.g. 1871 Unification, Alsace-Lorraine, 5 billion francs). Explain HOW it created tension/fear. Link directly back to 1914.',
            starter: 'A primary reason explaining why war broke out in 1914 was [Factor 1]...',
          },
          {
            col: '2. PARAGRAPH 2 (SECOND FACTOR)',
            prompt:
              'State your second factor clearly. Deploy precise factual evidence (e.g. Two-Power Standard, 1898 Naval Laws, HMS Dreadnought 1906). Explain the causal mechanism. Link back to 1914.',
            starter: 'Furthermore, a second decisive factor that caused the war was [Factor 2]...',
          },
          {
            col: '3. PARAGRAPH 3 (THIRD FACTOR)',
            prompt:
              'State your third factor clearly. Detail factual evidence (e.g. Triple Alliance vs Triple Entente, Gavrilo Princip 28 June 1914, Blank Cheque). Explain the domino chain reaction. Link back to 1914.',
            starter:
              'Additionally, an essential reason explaining why war erupted was [Factor 3]...',
          },
        ],
      },
      hints: [
        'Point (P): Start each paragraph by stating your factor clearly: "A primary reason explaining why war broke out in 1914 was..."',
        'Evidence (E): Include specific facts, dates, and names from your 1 sheet of A4 notes: 1871, Alsace-Lorraine, 1884 Berlin Conference, Weltpolitik, HMS Dreadnought 1906, 28 June 1914, Gavrilo Princip, Blank Cheque.',
        'Explain (E): Use "Because / Therefore" to explain the mechanism: explain WHY this factor made a country feel threatened or compelled to mobilize.',
        'Link (L): Always end the paragraph by tying directly back to 1914: "Therefore, this contributed directly to war in 1914 because..."',
        'No Conclusion Needed: This is an explanation question. Full marks are awarded for 3 developed PEEL paragraphs. Do not waste time writing a conclusion!',
      ],
      model_answer:
        '<strong>[P - Point]</strong> A primary reason why war broke out in 1914 was German unification and the seizure of Alsace-Lorraine in 1871.<br><strong>[E - Evidence]</strong> Chancellor Otto von Bismarck used "blood and iron" to unite thirty-nine German states into a single empire, defeating France in the Franco-Prussian War and seizing the mineral-rich border province of Alsace-Lorraine under the 1871 Treaty of Frankfurt.<br><strong>[E - Explain]</strong> This created permanent French <em>"Revanche"</em> (revenge), while creating a massive new military superpower in Central Europe that left Germany constantly terrified of encirclement.<br><strong>[L - Link]</strong> Therefore, German unification caused war in 1914 because it made lasting peace between France and Germany impossible, ensuring France would mobilize against Germany the moment conflict erupted.<br><br><strong>[P - Point]</strong> Furthermore, a second decisive factor that caused the war was the Anglo-German naval arms race.<br><strong>[E - Evidence]</strong> Under the Two-Power Standard, Britain required a navy equal to the next two navies combined. When Germany passed Naval Laws to build 38 battleships, Britain launched the revolutionary all-big-gun HMS Dreadnought in 1906, resetting the naval race to zero.<br><strong>[E - Explain]</strong> Because Britain was an island nation relying on maritime trade for food, Germany’s High Seas Fleet was seen as an existential threat to British survival.<br><strong>[L - Link]</strong> Consequently, this contributed to war because it destroyed Anglo-German relations, ending British isolation and pushing Britain into a firm alliance with France and Russia.<br><br><strong>[P - Point]</strong> Additionally, a third decisive reason explaining why war broke out was the alliance system combined with the Sarajevo assassination.<br><strong>[E - Evidence]</strong> On 28 June 1914, Gavrilo Princip of the Black Hand shot Archduke Franz Ferdinand in Sarajevo. On 5 July, Germany gave Austria-Hungary an unconditional "Blank Cheque" of military backing to crush Serbia.<br><strong>[E - Explain]</strong> This transformed a local Balkan murder into a world war because Europe was divided into two armed camps (the Triple Alliance and Triple Entente), where an attack on one ally triggered the automatic domino mobilization of all.<br><strong>[L - Link]</strong> Therefore, alliances directly caused war in August 1914 because they trapped all five Great Powers into an unstoppable chain reaction from which none could escape.<br><br><em>(Note for Pupils: Notice how this model answer contains strictly 3 developed PEEL paragraphs. No conclusion is required for this 12-mark assessment!)</em>',
    },
  ],

  quick_quiz: [
    {
      question:
        'How many sovereign German states existed before Otto von Bismarck united Germany in 1871?',
      options: ['39 independent states', '12 states', '100 states', '4 states'],
      answer: '39 independent states',
      explanation:
        'Prior to 1871, Central Europe consisted of thirty-nine independent German states, led by Prussia and Austria.',
    },
    {
      question:
        'Which two French border provinces were annexed by Germany under the 1871 Treaty of Frankfurt?',
      options: [
        'Alsace and Lorraine',
        'Normandy and Brittany',
        'Flanders and Wallonia',
        'Bavaria and Saxony',
      ],
      answer: 'Alsace and Lorraine',
      explanation:
        'Germany annexed Alsace-Lorraine for its coal, iron, and textile industries, creating the French desire for "Revanche".',
    },
    {
      question:
        'What was Kaiser Wilhelm II’s aggressive foreign policy demanding an empire called?',
      options: [
        'Weltpolitik ("World Policy")',
        'Realpolitik',
        'Laissez-faire',
        'Splendid Isolation',
      ],
      answer: 'Weltpolitik ("World Policy")',
      explanation:
        'Wilhelm II launched Weltpolitik in the 1890s, demanding Germany’s "place in the sun" through colonial and naval expansion.',
    },
    {
      question:
        'In which North African country did Kaiser Wilhelm II trigger major crises in 1905 and 1911?',
      options: ['Morocco', 'Egypt', 'Sudan', 'South Africa'],
      answer: 'Morocco',
      explanation:
        'The Kaiser landed at Tangier (1905) and sent the gunboat Panther to Agadir (1911) to challenge French colonial dominance.',
    },
    {
      question:
        'What British naval policy decreed that the Royal Navy must equal the next two biggest navies combined?',
      options: [
        'The Two-Power Standard',
        'Splendid Isolation',
        'Risk Theory',
        'The Dreadnought Doctrine',
      ],
      answer: 'The Two-Power Standard',
      explanation:
        'The Naval Defence Act 1889 established the Two-Power Standard to guarantee British island survival and trade protection.',
    },
    {
      question:
        'In what year was the revolutionary British battleship HMS Dreadnought launched at Portsmouth?',
      options: ['1906', '1898', '1914', '1871'],
      answer: '1906',
      explanation:
        'HMS Dreadnought was launched in February 1906, armed with ten 12-inch guns and steam turbines.',
    },
    {
      question: 'Which three Great Powers formed the Triple Entente in 1907?',
      options: [
        'Great Britain, France, and Russia',
        'Germany, Austria-Hungary, and Italy',
        'Britain, Germany, and Belgium',
        'France, Russia, and Serbia',
      ],
      answer: 'Great Britain, France, and Russia',
      explanation:
        'Britain settled colonial disputes with France (1904) and Russia (1907) to complete the Triple Entente.',
    },
    {
      question: 'On what date was Archduke Franz Ferdinand assassinated in Sarajevo?',
      options: ['28 June 1914', '4 August 1914', '18 January 1871', '11 November 1918'],
      answer: '28 June 1914',
      explanation:
        'Nineteen-year-old Gavrilo Princip shot Franz Ferdinand and his wife Sophie on 28 June 1914 in Sarajevo.',
    },
    {
      question:
        'What was Germany’s promise of unconditional military backing to Austria-Hungary on 5 July 1914 called?',
      options: [
        'The "Blank Cheque"',
        'The Reinsurance Treaty',
        'The Schlieffen Plan',
        'The Dual Alliance',
      ],
      answer: 'The "Blank Cheque"',
      explanation:
        'Kaiser Wilhelm II gave Austria a "Blank Cheque", encouraging Austrian hawks to issue an impossible ultimatum to Serbia.',
    },
    {
      question: 'Is a conclusion required in your 30-minute Year 9 assessment?',
      options: [
        'NO — strictly 3 developed PEEL paragraphs only',
        'YES — a 2-page conclusion is mandatory',
        'YES — you must spend 15 minutes on a conclusion',
        'Only if you finish in the first 5 minutes',
      ],
      answer: 'NO — strictly 3 developed PEEL paragraphs only',
      explanation:
        'Full marks are awarded for 3 developed PEEL paragraphs. No conclusion is required for this 12-mark question.',
    },
  ],

  flashcards: [
    {
      q: 'What does PEEL stand for in historical writing?',
      a: 'Point (state factor), Evidence (deploy facts/dates), Explain (how it caused tension), Link (tie back to 1914).',
    },
    {
      q: 'Do you need to write a conclusion in this 30-minute assessment?',
      a: 'NO! Strictly three developed PEEL paragraphs are required. No conclusion is needed.',
    },
    {
      q: 'How did German Unification in 1871 create long-term tension?',
      a: 'Unified 39 states into a superpower and seized Alsace-Lorraine, creating permanent French "Revanche" (revenge).',
    },
    {
      q: 'How did Imperial Rivalry in Africa bring Europe closer to war?',
      a: 'Kaiser Wilhelm II demanded a "place in the sun" (Weltpolitik), provoking the 1905 and 1911 Moroccan Crises that drove Britain and France together.',
    },
    {
      q: 'Why did HMS Dreadnought in 1906 reset the naval arms race?',
      a: 'It was armed with ten 12-inch guns and steam turbines, making all older warships obsolete and forcing Britain and Germany into a direct building race.',
    },
    {
      q: 'What are the strict rules for your 1 sheet of A4 revision notes?',
      a: 'Bullet points, mind maps, dates, and statistics only. Strictly NO pre-written essays, full sentences, or drafted paragraphs allowed.',
    },
  ],

  exam_practice: {
    question:
      'Why did war break out in 1914? Explain three reasons using the PEEL technique. [12 marks • 30 mins]',
    type: '12-mark',
    marks: 12,
    stimulus: [
      '1. German unification and Bismarck (1871)',
      '2. Imperial rivalry and the Scramble for Africa (1884–1911)',
      '3. Naval Arms race and HMS Dreadnought (1898–1914)',
      '4. Alliances and the Sarajevo assassination (1879–1914)',
    ],
    hints: [
      'Choose 3 of the 4 factors. Write a developed PEEL paragraph for each (approx 9 mins per paragraph).',
      'Point: State your factor clearly using the question stem.',
      'Evidence: Include specific facts, dates, and names from your 1 sheet of A4 notes.',
      'Explain: Explain the causal mechanism: WHY did this factor create suspicion, fear, or military escalation?',
      'Link: Connect directly back to 1914.',
      'NO CONCLUSION: Full marks are awarded for 3 developed paragraphs. Do not write a conclusion!',
    ],
  },
};

// Also export quiz array alias for compatibility
lesson6Data.quiz = lesson6Data.quick_quiz;

console.log('Writing Lesson 6 into data.js...');

let content = fs.readFileSync(dataJsPath, 'utf8');

// Convert lesson6Data to formatted JSON
const lesson6Json = JSON.stringify(lesson6Data, null, 2);

// Find the end of lessons array in data.js
const targetLesson5End = `      prologue:
        'On 28 June 1914, nineteen-year-old Gavrilo Princip fired two fatal pistol shots into the carriage of Archduke Franz Ferdinand in Sarajevo. Within thirty-seven days, ultimatums, imperial mobilisations, and German troops marching into neutral Belgium plunged Europe into total war. Could the catastrophic July Crisis have been avoided, or was war unstoppable?',
    },
  ],
  quizPack: [`;

if (!content.includes(targetLesson5End)) {
  console.error('❌ Could not find exact lesson 5 end marker in data.js');
  process.exit(1);
}

content = content.replace(
  targetLesson5End,
  `      prologue:
        'On 28 June 1914, nineteen-year-old Gavrilo Princip fired two fatal pistol shots into the carriage of Archduke Franz Ferdinand in Sarajevo. Within thirty-seven days, ultimatums, imperial mobilisations, and German troops marching into neutral Belgium plunged Europe into total war. Could the catastrophic July Crisis have been avoided, or was war unstoppable?',
    },
${lesson6Json}
  ],
  quizPack: [`,
);

// Also check unitData.assessments at the bottom of data.js to insert the formal assessment at the top of assessments
const assessmentMarker = /"assessments":\s*\[\s*\n\s*\{/;
if (assessmentMarker.test(content)) {
  const formalAssessmentObj = {
    id: 'formal_november_assessment_1914',
    title: "Formal November Assessment: 'Why did war break out in 1914?' [12 marks • 30 mins]",
    type: 'extended_writing',
    description:
      'Choose 3 of the 4 key factors (German Unification, Imperial Rivalry, Naval Arms Race, Alliances & Assassination) and write 3 developed PEEL paragraphs. NO conclusion required. You may bring 1 side of A4 bullet-point revision notes.',
    dates: '9Y: Monday 9th November | 9X: Thursday 12th November',
    time_allowed: '30 minutes (12 marks)',
    lesson_link: '/?view=lessons&unit=great_war&lesson=6',
    hint: 'Focus on the 3 factors you know best. Use the PEEL structure for each paragraph and deploy specific dates, statistics, and names from your 1 sheet of A4 notes. No conclusion needed!',
    model_answer: lesson6Data.tasks[0].model_answer,
  };

  const formalAssessmentJson = JSON.stringify(formalAssessmentObj, null, 2);
  content = content.replace(assessmentMarker, `"assessments": [\n${formalAssessmentJson},\n    {`);
}

fs.writeFileSync(dataJsPath, content, 'utf8');
console.log('✅ Successfully injected streamlined Lesson 6 into units/great_war/data.js!');
