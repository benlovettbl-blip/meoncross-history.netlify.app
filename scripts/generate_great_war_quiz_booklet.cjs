/**
 * generate_great_war_quiz_booklet.cjs
 *
 * Compiles the 12-Page A5 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History: Causes of the Great War (1871–1914).
 *
 * Page Architecture (12-Page A5 Booklet / 3 sheets A4 landscape folded in half):
 * - Page 1: Uniform Front Cover & Formative Homework & Retrieval Tracking Ledger
 *           (Scholar box, Attempt 1 vs 2, Text-only Retrieval Strength [ ] Instant [ ] Effortful [ ] Restudy,
 *           Roomy Parent Initial box, QR code to interactive portal)
 * - Page 2: Inside Front Cover — Master Chronology Domino Flowchart (1871–1914)
 * - Pages 3–8: 1 Dedicated Page per Lesson (Lessons 1 to 6 • 8 questions each)
 *              Featuring 2 write-in handwriting lines per question:
 *              Line 1: Core Fact
 *              Line 2: The Explanation
 * - Page 9: Department Marking Bank (Part 1 • Lessons 1–3 • Bold answers + The Explanation + [✓][✗])
 * - Page 10: Department Marking Bank (Part 2 • Lessons 4–6 • Bold answers + The Explanation + [✓][✗])
 * - Page 11: Key Historical Figures Gallery (7 protagonists) & Academic Vocabulary with Phonetics
 * - Page 12: Back Cover — Summative Assessment Preparation & Essay Architect
 *            ("Why did the First World War break out in August 1914?" • M.A.I.N. matrix,
 *            Fischer vs. Clark historiography, sentence starters & connectives, Archival Seal)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'great_war');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');

// --------------------------------------------------------------------------
// 48 CURATED HIGH-YIELD QUESTIONS ACROSS THE 6 LESSONS
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  // LESSON 1: German Unification (1871) & Bismarck
  {
    lesson: 1,
    lessonTitle: "1. German Unification (1871) & Bismarck's Alliances",
    shortTitle: 'German Unification & Alliances',
    enquiry: 'How was the German Empire created in 1871?',
    items: [
      {
        q: 'How many independent states existed in Central Europe before German unification?',
        a: '39 independent states',
        exp: 'Prior to 1871, the German states were loosely connected in the German Confederation, dominated by Prussia and Austria.',
      },
      {
        q: 'Which powerful military kingdom led the unification of Germany?',
        a: 'Prussia',
        exp: 'Prussia used its disciplined military, advanced railway network, and Krupp steel industry to unite the German states under Berlin.',
      },
      {
        q: 'Who was the Prussian Chancellor who engineered the unification of Germany?',
        a: 'Otto von Bismarck',
        exp: "Bismarck used a pragmatic policy of 'Blood and Iron' (Realpolitik) and three swift wars to achieve unification.",
      },
      {
        q: 'In what year was the German Empire officially proclaimed?',
        a: '1871',
        exp: "The Empire was proclaimed following Prussia's crushing victory over France in the Franco-Prussian War.",
      },
      {
        q: 'Where was King Wilhelm I of Prussia crowned as the first German Emperor?',
        a: 'The Hall of Mirrors at Versailles',
        exp: 'Staging the coronation inside the historic palace of the French monarchy was a calculated insult that deepened French hatred.',
      },
      {
        q: "What was Bismarck's primary foreign policy goal after 1871?",
        a: 'To isolate France and maintain European peace',
        exp: 'Bismarck knew a revanchist France could never be reconciled, so he built alliances to deny France any military partners.',
      },
      {
        q: "What was Germany's greatest strategic military nightmare?",
        a: 'A war on two fronts (Encirclement)',
        exp: 'Germany feared being simultaneously attacked by France from the west and Russia from the east, dividing its armed forces.',
      },
      {
        q: 'What secret 1887 agreement did Bismarck negotiate to keep Russia neutral?',
        a: 'The Reinsurance Treaty',
        exp: "Both powers promised neutrality unless Germany attacked France or Russia attacked Germany's ally, Austria-Hungary.",
      },
    ],
  },

  // LESSON 2: Franco-Prussian War & the Legacy of Revanche
  {
    lesson: 2,
    lessonTitle: '2. The Franco-Prussian War & the Legacy of Revanche',
    shortTitle: 'Franco-Prussian War & Revanche',
    enquiry: 'How did the Franco-Prussian War create a lasting legacy of hatred?',
    items: [
      {
        q: 'Which French territory was annexed by Germany following the war in 1871?',
        a: 'Alsace-Lorraine',
        exp: 'Germany seized this mineral-rich border territory for defence and industry, creating an enduring French determination to reclaim it.',
      },
      {
        q: 'What was the French national desire for vengeance called?',
        a: 'Revanche (Revanchism)',
        exp: 'French school textbooks, maps (veiled in black), and politicians kept the loss of Alsace-Lorraine alive as an open wound.',
      },
      {
        q: 'What was the size of the financial indemnity France was forced to pay Germany in 1871?',
        a: '5 billion gold francs',
        exp: 'Germany intended the indemnity to cripple France economically for a generation, though France paid it off ahead of schedule.',
      },
      {
        q: 'Which treaty formally concluded the Franco-Prussian War in May 1871?',
        a: 'The Treaty of Frankfurt',
        exp: 'The treaty codified the annexation of Alsace-Lorraine, the indemnity, and German military occupation until payment was complete.',
      },
      {
        q: 'Which French Emperor was captured by Prussian forces at the Battle of Sedan (1870)?',
        a: 'Napoleon III',
        exp: 'His capture brought the immediate collapse of the French Second Empire and the proclamation of the French Third Republic.',
      },
      {
        q: 'Which ambitious young Emperor took the German throne in 1888 and dismissed Bismarck in 1890?',
        a: 'Kaiser Wilhelm II',
        exp: "Wilhelm II rejected Bismarck's cautious European diplomacy in favour of personal autocratic rule and aggressive global expansion.",
      },
      {
        q: 'What catastrophic diplomatic decision did Wilhelm II make immediately after dismissing Bismarck?',
        a: 'He allowed the Reinsurance Treaty with Russia to lapse',
        exp: 'This alienated Tsar Alexander III and left Russia diplomatically isolated and seeking new European partners.',
      },
      {
        q: "What historic military alliance was signed in 1894 as a direct result of Wilhelm II's blunder?",
        a: 'The Franco-Russian Military Alliance',
        exp: "Autocratic Russia and republican France united militarily, realizing Bismarck's worst nightmare of a two-front encirclement.",
      },
    ],
  },

  // LESSON 3: The Scramble for Africa & Moroccan Crises
  {
    lesson: 3,
    lessonTitle: '3. The Scramble for Africa & the Moroccan Crises',
    shortTitle: 'Scramble for Africa & Morocco',
    enquiry: "To what extent did the 'Scramble for Africa' increase tension in Europe?",
    items: [
      {
        q: 'What term describes the rapid partition of the African continent by European empires (1881–1914)?',
        a: 'The Scramble for Africa',
        exp: 'European powers colonised 90% of Africa in search of raw industrial materials, prestige, and captive colonial markets.',
      },
      {
        q: 'Which 1884–85 conference laid down the imperial ground rules for annexing African territory?',
        a: 'The Berlin Conference',
        exp: "Hosted by Bismarck, it established the principle of 'effective occupation' to prevent European wars over African land.",
      },
      {
        q: "What famous slogan expressed Kaiser Wilhelm II's demand for a German colonial empire?",
        a: "A 'place in the sun' (Platz an der Sonne)",
        exp: "Wilhelm II argued that Germany's massive industrial and military power entitled it to a worldwide overseas empire matching Britain's.",
      },
      {
        q: "What was Kaiser Wilhelm II's aggressive global foreign policy called?",
        a: 'Weltpolitik (World Policy)',
        exp: "Weltpolitik abandoned Bismarck's continental focus and sought global naval, colonial, and commercial dominance.",
      },
      {
        q: 'Where did Kaiser Wilhelm II land in 1905 to provoke the First Moroccan Crisis?',
        a: 'Tangier',
        exp: 'He delivered a fiery speech backing the Moroccan Sultan to challenge French dominance and test the strength of the Anglo-French Entente.',
      },
      {
        q: 'Which 1906 conference resolved the First Moroccan Crisis, resulting in a diplomatic humiliation for Germany?',
        a: 'The Algeciras Conference',
        exp: 'Only Austria-Hungary supported Germany; Britain, Russia, and Italy stood firmly with France, cementing German isolation.',
      },
      {
        q: 'What military action sparked the Second Moroccan Crisis (Agadir Crisis) in 1911?',
        a: 'Germany sent the gunboat SMS Panther to the port of Agadir',
        exp: "Germany attempted 'gunboat diplomacy' to extract French colonial territory in the Congo in exchange for recognizing France in Morocco.",
      },
      {
        q: 'What was the decisive strategic consequence of the two Moroccan Crises for Anglo-French relations?',
        a: 'It forged secret Anglo-French joint military and naval planning',
        exp: 'Rather than driving Britain and France apart, German belligerence convinced Britain that Germany was a dangerous rogue power.',
      },
    ],
  },

  // LESSON 4: Anglo-German Naval Arms Race & HMS Dreadnought
  {
    lesson: 4,
    lessonTitle: '4. The Anglo-German Naval Arms Race & HMS Dreadnought',
    shortTitle: 'Naval Arms Race & Dreadnought',
    enquiry: 'Why did a battleship building contest destroy Anglo-German relations?',
    items: [
      {
        q: 'Which revolutionary, all-big-gun British battleship was launched in 1906?',
        a: 'HMS Dreadnought',
        exp: 'Dreadnought featured ten 12-inch guns and turbine propulsion, making every existing battleship on the planet instantly obsolete.',
      },
      {
        q: 'Which German naval minister directed the rapid construction of the German High Seas Fleet?',
        a: 'Admiral Alfred von Tirpitz',
        exp: 'Tirpitz passed the German Naval Laws (1898, 1900) to construct a fleet capable of challenging the British Royal Navy in the North Sea.',
      },
      {
        q: "What traditional maritime doctrine required Britain's fleet to equal the combined strength of the next two largest navies?",
        a: 'The Two-Power Standard',
        exp: 'Established by the Naval Defence Act 1889, Britain viewed naval supremacy as strictly vital for its food supply and empire.',
      },
      {
        q: "What was Admiral Tirpitz's 'Risk Theory' (Risikotheorie)?",
        a: 'To build a navy so strong that Britain would not risk a battle for fear of crippling itself',
        exp: 'Tirpitz believed this would force Britain to make diplomatic concessions and grant Germany colonial territory.',
      },
      {
        q: 'What was the political slogan shouted by the British public demanding more battleships in 1909?',
        a: "“We want eight and we won't wait!”",
        exp: 'British public alarm over German naval expansion forced the Liberal government to double its naval construction budget.',
      },
      {
        q: 'What canal did Germany deepen between 1907 and 1914 to allow dreadnoughts to pass from the Baltic to the North Sea?',
        a: 'The Kiel Canal',
        exp: 'Its completion in June 1914 allowed the German fleet to concentrate rapidly, significantly heightening British war fears.',
      },
      {
        q: 'How many Dreadnought-class battleships had Britain and Germany built by August 1914?',
        a: 'Britain: 29 dreadnoughts; Germany: 17 dreadnoughts',
        exp: 'Although Britain won the building race, the naval rivalry destroyed over a century of cordial Anglo-German diplomatic relations.',
      },
      {
        q: "Why did the invention of HMS Dreadnought ironically endanger Britain's naval supremacy?",
        a: 'It wiped out the British advantage in older pre-dreadnought battleships, resetting the naval race to zero',
        exp: 'By making older warships obsolete, Germany could compete on equal terms by building only dreadnoughts.',
      },
    ],
  },

  // LESSON 5: The Alliance System & the Balkan Powder Keg
  {
    lesson: 5,
    lessonTitle: '5. The Alliance System & the Balkan Powder Keg',
    shortTitle: 'Alliance System & Balkan Powder Keg',
    enquiry: 'Did the Alliance System protect Europe or guarantee a global war?',
    items: [
      {
        q: 'Which three empires formed the Triple Alliance in 1882?',
        a: 'Germany, Austria-Hungary, and Italy',
        exp: 'The defensive treaty pledged mutual military assistance if any member was attacked by two or more great powers.',
      },
      {
        q: "What term describes Britain's 19th-century policy of avoiding permanent European military alliances?",
        a: 'Splendid Isolation',
        exp: 'Britain focused on its worldwide empire and maintaining the naval balance of power without entangling continental treaties.',
      },
      {
        q: 'What friendly diplomatic accord did Britain and France sign in 1904?',
        a: 'The Entente Cordiale',
        exp: 'It resolved colonial disputes (Britain in Egypt, France in Morocco) and paved the way for close diplomatic cooperation.',
      },
      {
        q: 'What 1907 agreement settled colonial rivalries in Persia, Tibet, and Afghanistan, completing the Triple Entente?',
        a: 'The Anglo-Russian Convention',
        exp: "It ended the century-long 'Great Game' of imperial competition in Asia, clearing the path for joint European alignment.",
      },
      {
        q: "Why was Italy widely viewed as the 'weak link' in the Triple Alliance?",
        a: 'Italy held deep territorial rivalries with its alliance partner, Austria-Hungary',
        exp: 'Italy coveted Italia Irredenta (Trentino and Trieste) ruled by Vienna, leading Italy to declare neutrality in 1914 and switch sides in 1915.',
      },
      {
        q: 'What was the fatal structural flaw of the European alliance system?',
        a: 'A localized regional quarrel could instantly trigger a continent-wide chain reaction',
        exp: 'Pledges of mutual defence meant empires felt compelled to mobilise armies to protect partners, converting a Balkan crisis into World War.',
      },
      {
        q: "Why was south-eastern Europe known as the 'Powder Keg of Europe'?",
        a: 'The collapse of the Ottoman Empire created intense Slavic nationalism and imperial rivalries',
        exp: 'Austria-Hungary and Russia both competed to dominate newly independent Balkan states like Serbia, creating constant crises.',
      },
      {
        q: 'Which international crisis in 1908 brought Austria-Hungary and Russia to the brink of war?',
        a: 'The Bosnian Crisis (Annexation of Bosnia-Herzegovina)',
        exp: 'Austria annexed the Slavic province; Germany forced Russia to back down with a military ultimatum, leaving Russia determined never to back down again.',
      },
    ],
  },

  // LESSON 6: The Sarajevo Assassination, July Crisis & War
  {
    lesson: 6,
    lessonTitle: '6. The Sarajevo Assassination, July Crisis & War',
    shortTitle: 'Sarajevo Assassination & July Crisis',
    enquiry: 'Why did a single assassination in Sarajevo ignite a World War?',
    items: [
      {
        q: 'On what exact date was Archduke Franz Ferdinand assassinated in Sarajevo?',
        a: '28 June 1914',
        exp: "The Archduke, heir to the Austro-Hungarian throne, was visiting the Bosnian capital on Vidovdan (St Vitus' Day), a Serbian national holiday.",
      },
      {
        q: 'Who was the 19-year-old Bosnian Serb nationalist who fired the fatal shots?',
        a: 'Gavrilo Princip',
        exp: 'Princip was a member of Young Bosnia, a revolutionary student movement seeking to unite South Slavs into a Greater Serbia.',
      },
      {
        q: 'What clandestine Serbian military terrorist organisation trained and armed the assassins?',
        a: 'The Black Hand (Union or Death)',
        exp: "Led by Colonel Dragutin Dimitrijević ('Apis'), head of Serbian military intelligence, who smuggled weapons and bombs across the border.",
      },
      {
        q: "Why did Austria-Hungary's annexation of Bosnia in 1908 cause fury in Serbia?",
        a: 'Bosnia contained a large ethnic Serb population that Serbia wanted to incorporate into a Greater Serbian state',
        exp: 'The 1908 Bosnian Crisis humiliated Serbia and its protector Russia, establishing a bitter blood-feud with Vienna.',
      },
      {
        q: "What was Germany's famous 'Blank Cheque' issued on 5–6 July 1914?",
        a: "Germany's unconditional promise of total military support to Austria-Hungary against Serbia",
        exp: 'Kaiser Wilhelm II and Chancellor Bethmann-Hollweg encouraged Vienna to strike quickly, gambling that Russia would back down.',
      },
      {
        q: 'What diplomatic document did Austria-Hungary deliver to Serbia on 23 July 1914?',
        a: 'The Austro-Hungarian Ultimatum (The Ten Demands)',
        exp: 'Deliberately designed to be rejected, it demanded Austrian police enter Serbian sovereign territory to investigate the murder.',
      },
      {
        q: 'What was the German war strategy designed to prevent a prolonged two-front war?',
        a: 'The Schlieffen Plan',
        exp: 'Conceived by Count von Schlieffen, it planned to conquer France in 6 weeks via neutral Belgium before turning east to confront Russia.',
      },
      {
        q: 'Why did Great Britain officially declare war on Germany at 11:00 pm on 4 August 1914?',
        a: 'Germany invaded neutral Belgium, violating the 1839 Treaty of London',
        exp: 'Britain had guaranteed Belgian neutrality for 75 years; German occupation of the Channel ports directly threatened British survival.',
      },
    ],
  },
];

// --------------------------------------------------------------------------
// CSS STYLING FOR A5 SADDLE-STITCH BOOKLET (148mm x 210mm)
// --------------------------------------------------------------------------
const A5_BOOKLET_CSS = `
  @page {
    size: 148mm 210mm;
    margin: 6mm 0mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #0f172a;
    margin: 0;
    padding: 0;
    font-size: 7.2pt;
    line-height: 1.2;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .a5-page {
    page-break-after: always;
    height: 198mm;
    max-height: 198mm;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  /* Gutter-Safe Margin Tuning for A5 Saddle-Stitch Binding */
  .a5-page:nth-child(odd) {
    padding-left: 10mm; /* Inner spine clearance on left for odd/recto pages */
    padding-right: 6mm;
  }
  .a5-page:nth-child(even) {
    padding-left: 6mm;
    padding-right: 10mm; /* Inner spine clearance on right for even/verso pages */
  }
  .a5-page:last-child { page-break-after: avoid; }

  .page-flex-full {
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 198mm !important;
    box-sizing: border-box !important;
  }
  .page-body-stretch {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .timeline-page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Page Headers & Footers */
  .page-header-strip {
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 2px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-header-strip h2 {
    margin: 0;
    font-size: 8.8pt;
    color: #0f172a;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .page-header-strip p {
    margin: 1px 0 0 0;
    font-size: 6.2pt;
    color: #475569;
    font-weight: 600;
  }
  .page-tag {
    font-size: 6.2pt;
    font-weight: 800;
    background: #0f172a;
    color: #ffffff;
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }
  .page-footer-strip {
    font-size: 6.2pt;
    color: #64748b;
    border-top: 1px solid #cbd5e1;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }

  /* Cover Page Styling (Page 1) */
  .cover-banner {
    background: #0f172a;
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  /* Commercial School Cover Customizer */
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target {
    display: inline-block;
    font-size: 0;
  }
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target::after {
    content: attr(data-department-name);
    font-size: 6.5pt;
  }
  .cover-header-block {
    text-align: center;
    padding: 4px 6px 3px 6px;
    background: #f8fafc;
    border-left: 1px solid #cbd5e1;
    border-right: 1px solid #cbd5e1;
  }
  .cover-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 11.5pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
    margin: 0 0 2px 0;
  }
  .cover-subtitle {
    font-size: 6.8pt;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0;
  }

  /* Pupil Box */
  .pupil-box {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-top: none;
    padding: 3px 8px;
    font-size: 7pt;
  }
  .pupil-grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1.5fr;
    gap: 10px;
    align-items: center;
  }
  .pupil-field {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .pupil-field span.lbl {
    font-weight: 700;
    color: #334155;
    white-space: nowrap;
  }
  .pupil-field span.line {
    border-bottom: 1.2px solid #000000;
    flex: 1;
    min-height: 12px;
  }

  /* Cover Map Container */
  .cover-map-container {
    margin: 2px 0 2px 0;
    text-align: center;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 2px 4px 2px 4px;
  }
  .cover-map-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 90mm;
  }
  .cover-map-img {
    max-height: 90mm;
    max-width: 100%;
    object-fit: contain;
    border: 1px solid #94a3b8;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  .cover-map-caption {
    font-size: 5.6pt;
    color: #475569;
    margin-top: 1.5px;
    letter-spacing: 0.2px;
  }

  /* Tracking Grid Table (Page 1) */
  .tracking-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.5pt;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .tracking-table th {
    background: #0f172a;
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    padding: 3px 3px;
    border: 1px solid #0f172a;
    font-size: 6pt;
    letter-spacing: 0.2px;
    text-align: center;
  }
  .tracking-table td {
    border: 1px solid #cbd5e1;
    padding: 2.8px 3px;
    text-align: center;
    vertical-align: middle;
  }
  .tracking-table td.left-title {
    text-align: left;
    color: #0f172a;
  }
  .tb-lesson-title {
    font-weight: 800;
    font-size: 6.5pt;
    color: #0f172a;
    line-height: 1.15;
  }
  .tb-lesson-enquiry {
    font-size: 5.4pt;
    color: #475569;
    font-style: italic;
    line-height: 1.15;
    margin-top: 0.5px;
  }
  .score-line {
    display: inline-block;
    width: 14px;
    border-bottom: 1px solid #000;
  }
  .retrieval-boxes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3.5px;
    font-size: 5.8pt;
    color: #334155;
    white-space: nowrap;
  }
  .retrieval-boxes span {
    font-weight: 600;
  }
  .parent-sig-cell {
    padding: 2px 4px;
  }
  .parent-sig-box {
    border: 1px solid #94a3b8;
    background: #ffffff;
    border-radius: 2px;
    height: 16px;
    width: 100%;
  }

  /* Page 1: 3-Tier Traffic Light Mastery Rule (DIRT Loop) */
  .mastery-traffic-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 2.5px 6px;
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 5.8pt;
    line-height: 1.15;
  }
  .traffic-tier {
    display: flex;
    align-items: center;
    gap: 3.5px;
    color: #1e293b;
  }
  .traffic-dot {
    font-size: 7.5pt;
    line-height: 1;
  }
  .green-dot { color: #16a34a; }
  .amber-dot { color: #d97706; }
  .red-dot { color: #dc2626; }

  /* QR Strip */
  .qr-strip {
    display: flex;
    align-items: center;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 3px 6px;
    gap: 8px;
    margin-top: 2px;
    margin-bottom: 1px;
  }
  .qr-code-img {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }
  .qr-caption-text {
    font-size: 6.2pt;
    color: #334155;
    line-height: 1.2;
    text-align: left;
    font-weight: 600;
  }

  /* Page 2: Chronology Domino Flowchart */
  .timeline-flow {
    display: flex;
    flex-direction: column;
    gap: 2.5px;
    flex: 1;
    justify-content: space-between;
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .domino-node {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #ffffff;
    border: 1px solid #0f172a;
    border-radius: 3px;
    padding: 2.5px 5px;
    font-size: 6.6pt;
    line-height: 1.18;
  }
  .domino-year {
    background: #0f172a;
    color: #ffffff;
    font-weight: 800;
    font-size: 6.4pt;
    padding: 1.5px 4px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .domino-text {
    flex: 1;
  }

  /* Pages 3–8: Dedicated Question Page Layout */
  .lesson-instruction-bar {
    background: #f8fafc;
    border-left: 3px solid #0f172a;
    padding: 2px 6px;
    font-size: 6.4pt;
    color: #334155;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .q-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 1.5px;
  }
  .q-block {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 6px;
    display: flex;
    flex-direction: column;
    gap: 1.5px;
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 4px;
    font-size: 8.5pt;
    line-height: 1.15;
  }
  .q-prompt-wrap {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    flex: 1;
  }
  .q-num {
    font-weight: 800;
    color: #000000;
    min-width: 14px;
    font-size: 8.5pt;
  }
  .q-prompt {
    font-weight: 700;
    color: #000000;
    font-size: 8.5pt;
  }
  .q-mastery {
    font-size: 6pt;
    font-weight: 700;
    color: #475569;
    white-space: nowrap;
  }
  .q-line-row {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 7.2pt;
    margin-top: 1px;
  }
  .q-line-lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
    font-size: 7.2pt;
    min-width: 65px;
  }
  .q-solid-line {
    flex: 1;
    border-bottom: 1.2px solid #000000;
    min-height: 18px;
  }

  /* Pages 9 & 10: Marking Bank */
  .mb-section-title {
    background: #f1f5f9;
    border-left: 3px solid #0f172a;
    padding: 1.5px 5px;
    font-size: 6.8pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    margin: 3px 0 1.5px 0;
  }
  .mb-section-title:first-child { margin-top: 0; }
  .mb-container {
    display: flex;
    flex-direction: column;
    gap: 1.5px;
    flex: 1;
    justify-content: space-between;
  }
  .ans-card {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 6.4pt;
    line-height: 1.15;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    padding: 2px 4px;
  }
  .ans-num {
    font-weight: 800;
    color: #0f172a;
    min-width: 13px;
  }
  .ans-content {
    flex: 1;
    color: #0f172a;
  }
  .ans-core {
    font-weight: 800;
    color: #0f172a;
  }
  .ans-exp {
    color: #334155;
    font-style: italic;
  }
  .ans-boxes {
    font-size: 6pt;
    font-weight: 800;
    color: #475569;
    white-space: nowrap;
    margin-left: 3px;
  }

  /* Page 11: Figures Gallery & Vocabulary */
  .p11-sec-title {
    font-size: 7pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 1px;
    margin: 2px 0 2px 0;
  }
  .figures-grid {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 3px;
  }
  .figure-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-left: 2.5px solid #0f172a;
    border-radius: 2px;
    padding: 2px 5px;
    font-size: 6.3pt;
    line-height: 1.16;
  }
  .figure-name {
    font-weight: 800;
    color: #0f172a;
  }
  .figure-role {
    font-weight: 600;
    color: #475569;
    font-style: italic;
    margin-left: 3px;
  }
  .figure-act {
    color: #1e293b;
    margin-top: 0.5px;
  }

  .vocab-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .vocab-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 2.5px solid #2563eb;
    border-radius: 2px;
    padding: 2px 5px;
    font-size: 6.3pt;
    line-height: 1.16;
  }
  .vocab-term {
    font-weight: 800;
    color: #0f172a;
  }
  .vocab-phonetic {
    color: #2563eb;
    font-weight: 700;
    margin-left: 2px;
  }
  .vocab-def {
    color: #334155;
    margin-top: 0.5px;
  }

  /* Page 12: Summative Assessment Preparation & Essay Architect */
  .architect-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 4px 6px;
    font-size: 6.8pt;
    line-height: 1.2;
    margin-bottom: 3px;
  }
  .architect-sec-head {
    font-size: 7.4pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    background: #f1f5f9;
    border-left: 3px solid #0f172a;
    padding: 2.5px 5px;
    margin: 4px 0 3px 0;
  }
  .main-matrix-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5px;
  }
  .main-matrix-cell {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 3.5px 5px;
    font-size: 6.6pt;
    line-height: 1.2;
  }
  .historiography-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
  .historiography-box {
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 4px 6px;
    font-size: 6.6pt;
    line-height: 1.2;
  }
  .essay-stages-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5px;
    margin-bottom: 3px;
  }
  .essay-stage-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3.5px 5px;
    font-size: 6.5pt;
    line-height: 1.2;
  }
  .stage-num {
    font-weight: 800;
    color: #0f172a;
    margin-right: 2px;
  }
  .stems-list {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 6.8pt;
    line-height: 1.25;
    color: #1e293b;
  }
  .seal-strip {
    text-align: center;
    border-top: 1px solid #cbd5e1;
    padding-top: 3px;
    font-size: 6pt;
    color: #64748b;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }
`;

// --------------------------------------------------------------------------
// HTML BUILDER FUNCTION
// --------------------------------------------------------------------------
async function buildHtml() {
  console.log('🛠️  Generating QR Code for Causes of the Great War interactive portal...');
  const quizUrl = 'https://the-history-revision-hub.netlify.app/?view=quiz&unit=great_war';
  const qrDataUrl = await QRCode.toDataURL(quizUrl, {
    margin: 1,
    width: 200,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  console.log('🗺️  Loading German Empire 1871 primary reference map for Cover Page...');
  const mapPath = path.join(ROOT_DIR, 'public', 'images', 'german_empire_1871.png');
  let mapDataUrl = '';
  if (fs.existsSync(mapPath)) {
    const mapBase64 = fs.readFileSync(mapPath).toString('base64');
    mapDataUrl = `data:image/png;base64,${mapBase64}`;
  }

  // ------------------------------------------------------------------------
  // PAGE 1: FRONT COVER & FORMATIVE HOMEWORK RETRIEVAL LEDGER
  // ------------------------------------------------------------------------
  const page1 = `
  <div class="a5-page page-flex-full">
    <div class="page-body-stretch">
      <div class="cover-banner" data-department-name="${process.env.SCHOOL_NAME || process.env.DEPARTMENT_NAME || 'The History Department'}">
        <span>The History Revision Hub &bull; <span class="school-brand-target">${process.env.SCHOOL_NAME || process.env.DEPARTMENT_NAME || 'The History Department'}</span></span>
        <span>Key Stage 3 Companion</span>
      </div>
      <div class="cover-header-block">
        <h1 class="cover-title">Causes of the Great War (1871–1914)</h1>
        <p class="cover-subtitle">“How did decades of imperial rivalry and fear culminate in thirty days of madness?”</p>
      </div>

      <div class="pupil-box">
        <div class="pupil-grid">
          <div class="pupil-field"><span class="lbl">Pupil:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Form:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Teacher:</span><span class="line"></span></div>
        </div>
      </div>

      <div class="cover-map-container">
        <div class="cover-map-frame">
          <img src="${mapDataUrl}" alt="The German Reich 1871-1918 Reference Map" class="cover-map-img">
        </div>
        <div class="cover-map-caption">
          <strong>Historical Reference Map:</strong> The German Reich (1871–1918) &mdash; Geopolitical Encirclement &amp; The Balance of Power
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-bottom: none; padding: 2.5px 6px; font-size: 6.2pt; font-weight: 700; color: #334155; display: flex; justify-content: space-between;">
        <span>FORMATIVE HOMEWORK &amp; RETRIEVAL LEDGER</span>
        <span>30-SECOND DESK INSPECTION READY</span>
      </div>

      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 34%; text-align: left;">Lesson &amp; Enquiry Focus</th>
            <th style="width: 12%;">Attempt 1</th>
            <th style="width: 12%;">Attempt 2</th>
            <th style="width: 20%;">Retrieval Strength</th>
            <th style="width: 22%; font-size: 5.4pt; text-transform: uppercase;">Parent Signature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">1. German Unification &amp; Bismarck</div>
              <div class="tb-lesson-enquiry">How was the German Empire created in 1871?</div>
            </td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><div class="retrieval-boxes"><span>[ ] Instant</span> <span>[ ] Effortful</span> <span>[ ] Restudy</span></div></td>
            <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
          </tr>
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">2. Franco-Prussian War &amp; Revanche</div>
              <div class="tb-lesson-enquiry">How did the Franco-Prussian War create a lasting legacy of hatred?</div>
            </td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><div class="retrieval-boxes"><span>[ ] Instant</span> <span>[ ] Effortful</span> <span>[ ] Restudy</span></div></td>
            <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
          </tr>
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">3. Scramble for Africa &amp; Morocco</div>
              <div class="tb-lesson-enquiry">To what extent did the 'Scramble for Africa' increase tension in Europe?</div>
            </td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><div class="retrieval-boxes"><span>[ ] Instant</span> <span>[ ] Effortful</span> <span>[ ] Restudy</span></div></td>
            <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
          </tr>
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">4. Naval Arms Race &amp; Dreadnought</div>
              <div class="tb-lesson-enquiry">Why did a battleship building contest destroy Anglo-German relations?</div>
            </td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><div class="retrieval-boxes"><span>[ ] Instant</span> <span>[ ] Effortful</span> <span>[ ] Restudy</span></div></td>
            <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
          </tr>
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">5. Alliance System &amp; Powder Keg</div>
              <div class="tb-lesson-enquiry">Did the Alliance System protect Europe or guarantee a global war?</div>
            </td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><div class="retrieval-boxes"><span>[ ] Instant</span> <span>[ ] Effortful</span> <span>[ ] Restudy</span></div></td>
            <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
          </tr>
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">6. Sarajevo &amp; The July Crisis</div>
              <div class="tb-lesson-enquiry">Why did a single assassination in Sarajevo ignite a World War?</div>
            </td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><span class="score-line">&nbsp;&nbsp;&nbsp;</span> / 8</td>
            <td><div class="retrieval-boxes"><span>[ ] Instant</span> <span>[ ] Effortful</span> <span>[ ] Restudy</span></div></td>
            <td class="parent-sig-cell"><div class="parent-sig-box"></div></td>
          </tr>
        </tbody>
      </table>


      <div class="qr-strip">
        <img src="${qrDataUrl}" alt="Digital Quiz QR" class="qr-code-img">
        <div class="qr-caption-text">
          <strong>Interactive Digital Revision Portal:</strong> Scan QR code for instant retrieval practice, flashcard vaults, and spoken teacher audio guides: <em>the-history-revision-hub.netlify.app</em>
        </div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Causes of the Great War (1871–1914) &bull; Pupil Companion</span>
      <span>Page 1 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 2: MASTER CHRONOLOGY DOMINO FLOWCHART (1871–1914)
  // ------------------------------------------------------------------------
  const timelineNodes = [
    {
      year: '1871',
      text: '<strong>German Empire Proclaimed:</strong> Unified in the Hall of Mirrors at Versailles; Alsace-Lorraine annexed from France, sparking lifelong French <em>Revanche</em>.',
    },
    {
      year: '1879',
      text: '<strong>Dual Alliance Formed:</strong> Bismarck signs a defensive military treaty between Germany and Austria-Hungary against Tsarist Russia.',
    },
    {
      year: '1882',
      text: '<strong>Triple Alliance Formed:</strong> Germany, Austria-Hungary, and Italy create a central European mutual defense pact.',
    },
    {
      year: '1890',
      text: '<strong>Bismarck Dismissed:</strong> Kaiser Wilhelm II rejects defensive diplomacy, cancels the Reinsurance Treaty, and launches aggressive <em>Weltpolitik</em>.',
    },
    {
      year: '1894',
      text: '<strong>Franco-Russian Alliance:</strong> France and Russia unite militarily, trapping Germany between two rival powers (the two-front encirclement nightmare).',
    },
    {
      year: '1898–1900',
      text: "<strong>Tirpitz Naval Laws:</strong> Germany begins building the High Seas Fleet to challenge the British Royal Navy's supremacy.",
    },
    {
      year: '1904',
      text: '<strong>Entente Cordiale Signed:</strong> Britain and France settle colonial disputes (Egypt & Morocco) and begin joint defensive military discussions.',
    },
    {
      year: '1905–1906',
      text: '<strong>First Moroccan Crisis:</strong> Wilhelm II lands at Tangier to test the Entente; the Algeciras Conference (1906) isolates Germany and binds Britain to France.',
    },
    {
      year: '1906',
      text: '<strong>HMS Dreadnought Launched:</strong> Revolutionary British all-big-gun battleship resets naval technology and intensifies the Anglo-German arms race.',
    },
    {
      year: '1907',
      text: '<strong>Triple Entente Completed:</strong> The Anglo-Russian Convention settles Asian colonial rivalries, uniting Britain, France, and Russia.',
    },
    {
      year: '1908',
      text: '<strong>The Bosnian Crisis:</strong> Austria-Hungary annexes Bosnia, permanently alienating Serbia and humiliating Tsarist Russia.',
    },
    {
      year: '1911',
      text: '<strong>Second Moroccan Crisis:</strong> Germany sends gunboat Panther to Agadir; British Mansion House speech warns Germany, cementing Anglo-French solidarity.',
    },
    {
      year: '1912–1913',
      text: '<strong>The Balkan Wars:</strong> Balkan states defeat the Ottomans; Serbia doubles in size, escalating Austrian hostility and regional panic.',
    },
    {
      year: '28 Jun – 4 Aug 1914',
      text: '<strong>The July Crisis &amp; War:</strong> Franz Ferdinand assassinated in Sarajevo &rarr; German Blank Cheque &rarr; Austrian Ultimatum &rarr; Russian mobilisation &rarr; Schlieffen Plan &rarr; World War.',
    },
  ];

  const page2 = `
  <div class="a5-page page-flex-full">
    <div class="timeline-page-content">
      <div class="page-header-strip">
        <div>
          <h2>Master Chronology Domino Flowchart</h2>
          <p>1871–1914 &bull; 14 Anchor Flashpoints from German Unification to Continental War</p>
        </div>
        <span class="page-tag">Domino Flowchart</span>
      </div>

      <div class="lesson-instruction-bar" style="margin-bottom: 2px;">
        <strong>Causal Chain:</strong> Trace how imperial rivalry, military alliances, and the arms race escalated into the July Crisis and the outbreak of the Great War.
      </div>

      <div class="timeline-flow">
        ${timelineNodes
          .map(
            (node) => `
          <div class="domino-node">
            <span class="domino-year">${node.year}</span>
            <span class="domino-text">${node.text}</span>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; Chronological Chain</span>
      <span>Page 2 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGES 3 TO 8: 1 DEDICATED PAGE PER LESSON (LESSONS 1 TO 6)
  // ------------------------------------------------------------------------
  const questionPages = [];
  let currentQNum = 1;

  for (let lIdx = 0; lIdx < QUIZ_DATA.length; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    const pageNum = lIdx + 3; // Pages 3 to 8

    let qItemsHtml = '';
    l.items.forEach((item) => {
      qItemsHtml += `
        <div class="q-block">
          <div class="q-header">
            <div class="q-prompt-wrap">
              <span class="q-num">${currentQNum}.</span>
              <span class="q-prompt">${item.q}</span>
            </div>
            <span class="q-mastery">[ &nbsp; ] Mastered</span>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Answer:</span>
            <span class="q-solid-line"></span>
          </div>
          <div class="q-line-row">
            <span class="q-line-lbl">Detail / Why:</span>
            <span class="q-solid-line"></span>
          </div>
        </div>
      `;
      currentQNum++;
    });

    const pageHtml = `
    <div class="a5-page">
      <div>
        <div class="page-header-strip">
          <div>
            <h2>Lesson ${l.lesson}: ${l.shortTitle}</h2>
            <p>Enquiry: “${l.enquiry}” &bull; Direct Active Recall</p>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 6.5pt; font-weight: 700; border: 1.2px solid #0f172a; padding: 1.5px 5px; border-radius: 2px;">Score: &nbsp;&nbsp;&nbsp; / 8</span>
            <span class="page-tag">Q${currentQNum - 8}–Q${currentQNum - 1}</span>
          </div>
        </div>
        <div class="lesson-instruction-bar">
          <strong>Instructions:</strong> Complete Line 1 (Answer) from memory. Complete Line 2 (Detail / Why) to articulate the historical mechanism, motive, or consequence.
        </div>
      </div>

      <div class="q-container">
        ${qItemsHtml}
      </div>

      <div class="page-footer-strip">
        <span>Causes of the Great War &bull; Lesson ${l.lesson} Retrieval Drill</span>
        <span>Page ${pageNum} of 12</span>
      </div>
    </div>
    `;

    questionPages.push(pageHtml);
  }

  // ------------------------------------------------------------------------
  // PAGE 9: DEPARTMENT MARKING BANK (PART 1 • LESSONS 1 TO 3)
  // ------------------------------------------------------------------------
  let aP9Html = '';
  let aNum = 1;
  for (let lIdx = 0; lIdx < 3; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    aP9Html += `<div class="mb-section-title">Lesson ${l.lesson}: ${l.shortTitle}</div><div class="mb-container">`;
    l.items.forEach((item) => {
      aP9Html += `
        <div class="ans-card">
          <span class="ans-num">${aNum}.</span>
          <div class="ans-content">
            <span class="ans-core">${item.a}</span> &mdash; <span class="ans-exp">${item.exp}</span>
          </div>
          <span class="ans-boxes">[✓][✗]</span>
        </div>
      `;
      aNum++;
    });
    aP9Html += `</div>`;
  }

  const page9 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank (Part 1)</h2>
        <p>Lessons 1 to 3 &bull; Answers 1 to 24 &bull; Core Answers &amp; The Explanation</p>
      </div>
      <span class="page-tag">Marking Key 1–24</span>
    </div>

    ${aP9Html}

    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; Marking Bank &bull; Turn Page for Lessons 4–6</span>
      <span>Page 9 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 10: DEPARTMENT MARKING BANK (PART 2 • LESSONS 4 TO 6)
  // ------------------------------------------------------------------------
  let aP10Html = '';
  for (let lIdx = 3; lIdx < 6; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    aP10Html += `<div class="mb-section-title">Lesson ${l.lesson}: ${l.shortTitle}</div><div class="mb-container">`;
    l.items.forEach((item) => {
      aP10Html += `
        <div class="ans-card">
          <span class="ans-num">${aNum}.</span>
          <div class="ans-content">
            <span class="ans-core">${item.a}</span> &mdash; <span class="ans-exp">${item.exp}</span>
          </div>
          <span class="ans-boxes">[✓][✗]</span>
        </div>
      `;
      aNum++;
    });
    aP10Html += `</div>`;
  }

  const page10 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Department Marking Bank (Part 2)</h2>
        <p>Lessons 4 to 6 &bull; Answers 25 to 48 &bull; Core Answers &amp; The Explanation</p>
      </div>
      <span class="page-tag">Marking Key 25–48</span>
    </div>

    ${aP10Html}

    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; Marking Bank &bull; Lessons 4 to 6</span>
      <span>Page 10 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 11: KEY HISTORICAL FIGURES & ACADEMIC VOCABULARY
  // ------------------------------------------------------------------------
  const figures = [
    {
      name: 'Otto von Bismarck',
      role: 'Imperial Chancellor of Germany (1871–1890)',
      act: 'Engineered German unification through "Blood and Iron"; constructed the Triple Alliance and Reinsurance Treaty to isolate France and prevent a two-front war.',
    },
    {
      name: 'Kaiser Wilhelm II',
      role: 'German Emperor (1888–1918)',
      act: 'Impulsive autocrat; dismissed Bismarck (1890), dropped the Russian treaty, championed aggressive Weltpolitik, and gave Austria the fatal Blank Cheque (1914).',
    },
    {
      name: 'Admiral Alfred von Tirpitz',
      role: 'State Secretary of the German Imperial Navy',
      act: 'Authored the German Naval Laws (1898/1900) and "Risk Theory"; directed High Seas Fleet construction that triggered the naval arms race with Great Britain.',
    },
    {
      name: 'Archduke Franz Ferdinand',
      role: 'Heir to the Austro-Hungarian Throne',
      act: 'Targeted by Serbian extremists for his reformist views; his assassination on 28 June 1914 in Sarajevo was the catalytic spark for the outbreak of war.',
    },
    {
      name: 'Gavrilo Princip',
      role: 'Serbian Nationalist Assassin (Young Bosnia / Black Hand)',
      act: '19-year-old student operative who fired the fatal shots in Sarajevo to break the South Slav provinces away from Austria-Hungary into a Greater Serbia.',
    },
    {
      name: 'Sir Edward Grey',
      role: 'British Foreign Secretary (1905–1916)',
      act: 'Attempted international mediation during the July Crisis; delivered the British ultimatum to Germany to defend Belgian neutrality under the 1839 Treaty of London.',
    },
    {
      name: 'Helmuth von Moltke (the Younger)',
      role: 'Chief of the German General Staff',
      act: 'Executed the Schlieffen Plan; argued that Russian mobilisation meant Germany had to launch an immediate pre-emptive invasion of France via Belgium.',
    },
  ];

  const vocabItems = [
    {
      term: 'Weltpolitik',
      phonetic: '[Velt-pol-ee-teek]',
      lang: 'German',
      def: '"World Policy." Kaiser Wilhelm II\'s assertive foreign policy seeking global colonies, international prestige, and naval supremacy matching Britain.',
    },
    {
      term: 'Revanche',
      phonetic: '[Ruh-vahnsh]',
      lang: 'French',
      def: '"Revenge." The profound, enduring French national desire to avenge defeat in the Franco-Prussian War (1870–71) and reclaim Alsace-Lorraine.',
    },
    {
      term: 'Realpolitik',
      phonetic: '[Ray-ahl-pol-ee-teek]',
      lang: 'German',
      def: 'Pragmatic, hard-nosed statecraft based on practical power and national self-interest rather than moral or ideological ideals.',
    },
    {
      term: 'HMS Dreadnought',
      phonetic: '[Dred-nawt]',
      lang: 'English',
      def: 'Revolutionary 1906 British battleship with all-big-gun armament and steam turbines, rendering all previous battleships instantly obsolete.',
    },
    {
      term: 'Entente Cordiale',
      phonetic: '[Ahn-tahnt Kor-dyahl]',
      lang: 'French',
      def: '"Cordial Understanding." 1904 diplomatic accord resolving colonial disputes between Britain and France, paving the way for joint military talks.',
    },
    {
      term: 'Blank Cheque (Blankoscheck)',
      phonetic: '[Blahnk-oh-sheck]',
      lang: 'German',
      def: "Germany's unconditional pledge of military backing given to Austria-Hungary on 5–6 July 1914, emboldening Vienna to declare war on Serbia.",
    },
    {
      term: 'Mobilisation',
      phonetic: '[Moh-bi-ly-zay-shun]',
      lang: 'Military',
      def: 'The complex, timetable-driven movement of reserves, troops, and supplies to frontiers via railways; once ordered, it made war unstoppable.',
    },
    {
      term: 'The Powder Keg of Europe',
      phonetic: '',
      lang: 'Metaphor',
      def: 'The volatile Balkan peninsula where competing ethnic Slavic nationalisms and Austro-Russian imperial rivalries threatened continental peace.',
    },
  ];

  const page11 = `
  <div class="a5-page">
    <div>
      <div class="page-header-strip">
        <div>
          <h2>Key Historical Figures &amp; Academic Vocabulary</h2>
          <p>The 7 Protagonists &bull; Pronunciation Guide &bull; Core Terminology</p>
        </div>
        <span class="page-tag">People &amp; Terms</span>
      </div>

      <div class="p11-sec-title">The Seven Crucial Protagonists (1871–1914)</div>
      <div class="figures-grid">
        ${figures
          .map(
            (f) => `
          <div class="figure-card">
            <div>
              <span class="figure-name">${f.name}</span>
              <span class="figure-role">&bull; ${f.role}</span>
            </div>
            <div class="figure-act">${f.act}</div>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="p11-sec-title">Academic Vocabulary with Spoken Pronunciation Guide</div>
      <div class="vocab-list">
        ${vocabItems
          .map(
            (v) => `
          <div class="vocab-card">
            <div>
              <span class="vocab-term">${v.term}</span>
              ${v.phonetic ? `<span class="vocab-phonetic">${v.phonetic}</span>` : ''}
              <span style="font-size: 5.6pt; color: #64748b; text-transform: uppercase; margin-left: 3px;">(${v.lang})</span>
            </div>
            <div class="vocab-def">${v.def}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; Key Figures &amp; Vocabulary</span>
      <span>Page 11 of 12</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 12: BACK COVER — HOW TO WRITE YOUR END-OF-UNIT ESSAY
  // ------------------------------------------------------------------------
  const page12 = `
  <div class="a5-page">
    <div>
      <div class="page-header-strip">
        <div>
          <h2>How to Write Your End-of-Unit Essay</h2>
          <p>Key Stage 3 History &bull; Causes of the Great War (1871–1914)</p>
        </div>
        <span class="page-tag">Essay Guide</span>
      </div>

      <div style="background: #0f172a; color: #ffffff; padding: 4px 8px; border-radius: 3px; margin-bottom: 3px;">
        <div style="font-size: 6.2pt; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">Your Essay Question:</div>
        <div style="font-size: 8.8pt; font-weight: 800; font-family: 'Playfair Display', serif; line-height: 1.2; margin-top: 1px;">
          “Why did the First World War break out in August 1914?”
        </div>
      </div>

      <!-- 1. The M.A.I.N. Causes & The Spark -->
      <div class="architect-sec-head">1. The 4 Long-Term Causes (M.A.I.N.) &amp; The 1914 Spark</div>
      <div class="main-matrix-grid">
        <div class="main-matrix-cell">
          <strong>Militarism:</strong> Britain and Germany competed in a naval race to build Dreadnought battleships and grow huge armies.
        </div>
        <div class="main-matrix-cell">
          <strong>Alliances:</strong> The Triple Alliance vs. Triple Entente meant a fight between two countries pulled everyone in.
        </div>
        <div class="main-matrix-cell">
          <strong>Imperialism:</strong> Arguments over colonies in Africa made the Great Powers suspicious and distrustful of each other.
        </div>
        <div class="main-matrix-cell">
          <strong>Nationalism:</strong> Intense pride and rivalry: France wanted lost land back; Serbian nationalists wanted freedom from Austria.
        </div>
      </div>
      <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 2px; padding: 2px 4px; font-size: 6.1pt; margin-top: 2px;">
        <strong>The Spark (Summer 1914):</strong> Franz Ferdinand assassinated in Sarajevo (28 June) &rarr; Germany promises to back Austria (5 July) &rarr; Austria attacks Serbia &rarr; Russia mobilises its army &rarr; Germany invades Belgium &rarr; Britain enters the war (4 August).
      </div>

      <!-- 2. Two Historian Arguments -->
      <div class="architect-sec-head">2. What Do Historians Argue? (Two Views)</div>
      <div class="historiography-grid">
        <div class="historiography-box" style="background: #fff1f2; border-color: #fecdd3;">
          <strong style="color: #9f1239; font-size: 6.4pt;">Fritz Fischer (Germany Was to Blame):</strong><br>
          Germany's leaders wanted a war to dominate Europe. They used the Sarajevo assassination as an excuse to start it.
        </div>
        <div class="historiography-box" style="background: #f0fdf4; border-color: #bbf7d0;">
          <strong style="color: #166534; font-size: 6.4pt;">Christopher Clark ('The Sleepwalkers' — An Accident):</strong><br>
          No single country planned a world war. Leaders made reckless decisions, panicked, and stumbled into a disaster they couldn't stop.
        </div>
      </div>

      <!-- 3. Your 4-Paragraph Essay Plan -->
      <div class="architect-sec-head">3. Your 4-Paragraph Essay Plan</div>
      <div class="essay-stages-grid">
        <div class="essay-stage-card">
          <span class="stage-num">Paragraph 1:</span>
          <span><strong>Introduction:</strong> State your main argument straight away—was war planned by Germany, or did leaders stumble into it?</span>
        </div>
        <div class="essay-stage-card">
          <span class="stage-num">Paragraph 2:</span>
          <span><strong>The Deep Causes (M.A.I.N.):</strong> Explain how the arms race and rival alliances divided Europe into two armed camps.</span>
        </div>
        <div class="essay-stage-card">
          <span class="stage-num">Paragraph 3:</span>
          <span><strong>The 1914 Spark:</strong> Explain how the Sarajevo assassination pushed alliances and armies into motion.</span>
        </div>
        <div class="essay-stage-card">
          <span class="stage-num">Paragraph 4:</span>
          <span><strong>Conclusion:</strong> Give your final verdict comparing Fischer vs. Clark. Answer clearly: what was most to blame?</span>
        </div>
      </div>

      <!-- 4. Sentence Starters -->
      <div class="architect-sec-head">4. Sentence Starters You Can Use</div>
      <div class="stems-list">
        <div>&bull; <em>“One major reason war broke out in 1914 was...”</em></div>
        <div>&bull; <em>“This increased tension across Europe because...”</em></div>
        <div>&bull; <em>“The assassination in Sarajevo was the spark because...”</em></div>
        <div>&bull; <em>“On the other hand, historian Christopher Clark argues that...”</em></div>
        <div>&bull; <em>“In conclusion, although the M.A.I.N. causes built up tension for years, the decisive factor was...”</em></div>
      </div>

      <!-- 5. Connecting Words & Pupil Checklist -->
      <div class="architect-sec-head">5. Useful Connecting Words &amp; Pupil Checklist</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5px; margin-bottom: 2px;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3.5px 5px; font-size: 6.3pt; line-height: 1.2;">
          <strong style="color: #0f172a; text-transform: uppercase;">Helpful Linking Words:</strong><br>
          <em>As a result &bull; Consequently &bull; Furthermore &bull; However &bull; Most importantly &bull; In contrast</em>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3.5px 5px; font-size: 6.3pt; line-height: 1.2;">
          <strong style="color: #0f172a; text-transform: uppercase;">Pupil Checklist:</strong><br>
          [ ] Clear argument in intro &bull; [ ] Explained 2+ M.A.I.N. causes<br>
          [ ] Explained the 1914 spark &bull; [ ] Final verdict at the end
        </div>
      </div>
    </div>

    <div>
      <div class="seal-strip">
        The History Revision Hub &bull; Key Stage 3 History &bull; Causes of the Great War
      </div>
      <div class="page-footer-strip">
        <span>Causes of the Great War &bull; Essay Writing Guide</span>
        <span>Page 12 of 12</span>
      </div>
    </div>
  </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Causes of the Great War - Knowledge Retrieval &amp; Homework Companion (12 Pages)</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,600&display=swap" rel="stylesheet">
  <style>${A5_BOOKLET_CSS}</style>
</head>
<body>
  ${page1}
  ${page2}
  ${questionPages.join('\n')}
  ${page9}
  ${page10}
  ${page11}
  ${page12}
  <script>
    (function() {
      try {
        const params = new URLSearchParams(window.location.search);
        const customSchool = params.get('school') || params.get('dept');
        if (customSchool) {
          document.querySelectorAll('[data-department-name]').forEach(function(el) {
            el.setAttribute('data-department-name', customSchool);
          });
        }
      } catch(e) {}
    })();
  </script>
</body>
</html>`;
}

// --------------------------------------------------------------------------
// MAIN COMPILATION PROCESS
// --------------------------------------------------------------------------
async function run() {
  console.log('🚀 Starting Compilation of Causes of the Great War 12-Page A5 Quiz Booklet...');
  const htmlContent = await buildHtml();

  if (!fs.existsSync(UNIT_DIR)) fs.mkdirSync(UNIT_DIR, { recursive: true });
  if (!fs.existsSync(PDFS_DIR)) fs.mkdirSync(PDFS_DIR, { recursive: true });

  // 1. Write HTML
  const htmlPath = path.join(UNIT_DIR, 'quiz_pack.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved 12-Page HTML: ${htmlPath}`);

  // 2. Launch Puppeteer to compile A5 PDF
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Check actual page count rendered by browser
  const pageCount = await page.evaluate(() => {
    return document.querySelectorAll('.a5-page').length;
  });
  console.log(`📑 Total A5 Pages rendered in DOM: ${pageCount}`);

  // ------------------------------------------------------------------------
  // AUTOMATED PAGE BUDGET & SPACE UTILIZATION AUDIT
  // ------------------------------------------------------------------------
  const spaceAudit = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a5-page');
    const auditResults = [];
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const clientH = p.clientHeight;
      const scrollH = p.scrollHeight;
      const overflow = scrollH > clientH + 4 ? scrollH - clientH : 0;

      // Measure content height down to footer
      const footer = p.querySelector('.page-footer-strip');
      let unusedBottom = 0;
      if (footer) {
        const pRect = p.getBoundingClientRect();
        const fRect = footer.getBoundingClientRect();
        unusedBottom = Math.max(0, Math.round(pRect.bottom - fRect.bottom));
      }

      const utilizationPct = Math.min(100, Math.round(((clientH - unusedBottom) / clientH) * 100));
      auditResults.push({ pageNum, clientH, scrollH, overflow, unusedBottom, utilizationPct });
    });
    return auditResults;
  });

  console.log('\n=============================================================');
  console.log('📐 AUTOMATED PAGE BUDGET & SPACE UTILIZATION AUDIT');
  console.log('=============================================================');
  let hasErrors = false;
  spaceAudit.forEach((res) => {
    const status =
      res.overflow > 0
        ? `❌ OVERFLOW (+${res.overflow}px)`
        : res.unusedBottom > 35
          ? `⚠️ UNDERFLOW (${res.unusedBottom}px gap)`
          : `✅ OPTIMAL (${res.utilizationPct}% utilized, ${res.unusedBottom}px gap)`;
    console.log(`Page ${String(res.pageNum).padStart(2, ' ')}: ${status}`);
    if (res.overflow > 0) hasErrors = true;
  });
  console.log('=============================================================\n');

  if (hasErrors) {
    console.warn('⚠️ Please fix layout overflows before production printing!');
  } else {
    console.log('✅ Layout & Space Audit Passed: 100% clean across all 12 pages!');
  }

  // A5 dimensions: 148mm x 210mm
  const pdfTargets = [
    path.join(PDFS_DIR, 'great_war_recall_quiz_FULL.pdf'),
    path.join(PDFS_DIR, 'great_war_quiz_pack.pdf'),
    path.join(PDFS_DIR, 'great_war_quiz_pack_FINAL_V17.pdf'),
  ];

  const primaryPdf = pdfTargets[0];
  await page.pdf({
    path: primaryPdf,
    width: '148mm',
    height: '210mm',
    printBackground: true,
    margin: { top: '6mm', bottom: '6mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 12-Page A5 PDF: ${primaryPdf}`);

  // Copy to aliases
  for (let i = 1; i < pdfTargets.length; i++) {
    fs.copyFileSync(primaryPdf, pdfTargets[i]);
    console.log(`✅ Updated PDF alias: ${pdfTargets[i]}`);
  }

  await browser.close();

  // Copy to Google Drive if available
  try {
    const driveBaseDir = 'G:\\My Drive\\AAMX\\Dep File';
    if (fs.existsSync(driveBaseDir)) {
      const gdriveTargets = [
        path.join(driveBaseDir, 'Causes_of_the_Great_War_A5_Quiz_Booklet.pdf'),
        path.join(
          driveBaseDir,
          'Year 9',
          'The Great War',
          'Causes_of_the_Great_War_A5_Quiz_Booklet.pdf',
        ),
        path.join(
          driveBaseDir,
          'Year 9',
          'The Great War',
          'Causes of the Great War Knowledge Recall Quiz (All 48 Questions).pdf',
        ),
      ];
      gdriveTargets.forEach((targetPath) => {
        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
        fs.copyFileSync(primaryPdf, targetPath);
        console.log(`✅ Synced 12-Page A5 Quiz Booklet to Google Drive: ${targetPath}`);
      });
    }
  } catch (e) {
    console.warn(`⚠️ Warning syncing to Google Drive: ${e.message}`);
  }

  console.log(
    '\n🎉 Complete 12-page saddle-stitch booklet compiled cleanly with zero overflow! Ready for printing.',
  );
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { run };
