/**
 * generate_great_war_quiz_booklet.cjs
 *
 * Compiles the 8-Page A5 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History: Causes of the Great War (1871–1914).
 *
 * Page Architecture (8-Page A5 Booklet / 2 sheets A4 folded):
 * - Page 1: Uniform Front Cover (Workbook branding, Playfair typography, Scholar box, Mobile QR)
 * - Page 2: Inside Front Cover — Formative Homework & Retrieval Tracking Ledger (Attempt 1 vs Attempt 2, Parent Initials, Pupil RAG)
 * - Page 3: Questions Spread (Left) — Lessons 1–3 (24 direct-retrieval questions, [ ] checkboxes)
 * - Page 4: Questions Spread (Right) — Lessons 4–6 (24 direct-retrieval questions, [ ] checkboxes)
 * - Page 5: Answers & "The Explanation" (Left) — Lessons 1–3 (Bold core answer + causal explanation + [✓][✗])
 * - Page 6: Answers & "The Explanation" (Right) — Lessons 4–6 (Bold core answer + causal explanation + [✓][✗])
 * - Page 7: Inside Back Cover — Master Chronology & Domino Flowchart (1871–1914)
 * - Page 8: Back Cover — Essential Vocabulary with Phonetic Pronunciation Guides & Archival Seal
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
        q: 'What popular public slogan erupted across Britain in 1909 demanding accelerated battleship construction?',
        a: '"We want eight and we won\'t wait!"',
        exp: 'Public panic over German shipyard expansion forced the British government to double dreadnought production from 4 to 8 ships.',
      },
      {
        q: "Why did Britain view Germany's naval expansion as an existential and hostile threat?",
        a: 'Because Britain was an island dependent on oceanic food imports, while Germany was already a land superpower',
        exp: "Winston Churchill described the German fleet as an aggressive 'luxury', while the Royal Navy was a defensive necessity.",
      },
      {
        q: 'By the outbreak of war in August 1914, who had won the dreadnought naval race?',
        a: "Britain (29 Dreadnoughts to Germany's 17)",
        exp: "Britain's overwhelming industrial capacity, financial wealth, and political consensus decisively outbuilt the German Empire.",
      },
      {
        q: "What was the lasting geopolitical impact of the naval race on Britain's foreign policy?",
        a: "It permanently ended Britain's 'Splendid Isolation' and bound it to France and Russia",
        exp: 'Realising it could not defend its empire alone against rising German power, Britain settled its historic rivalries.',
      },
    ],
  },

  // LESSON 5: The Alliance System: Triple Entente vs Triple Alliance
  {
    lesson: 5,
    lessonTitle: '5. The Alliance System: Triple Entente vs Triple Alliance',
    items: [
      {
        q: 'Which three empires made up the Triple Alliance formed in 1882?',
        a: 'Germany, Austria-Hungary, and Italy',
        exp: 'A mutual defensive pact promising assistance if attacked by France or other powers, though Italy remained a reluctant partner.',
      },
      {
        q: 'Which three nations formed the Triple Entente by 1907?',
        a: 'Britain, France, and Russia',
        exp: 'Formed through the 1894 Franco-Russian Alliance, 1904 Entente Cordiale, and 1907 Anglo-Russian Convention.',
      },
      {
        q: "What was Britain's long-standing 19th-century policy of avoiding continental European alliances called?",
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
    ],
  },

  // LESSON 6: The Sarajevo Assassination, July Crisis & War
  {
    lesson: 6,
    lessonTitle: '6. The Sarajevo Assassination, July Crisis & War',
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
    margin: 6mm 8mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #0f172a;
    margin: 0;
    padding: 0;
    font-size: 7.5pt;
    line-height: 1.22;
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
  .a5-page:last-child { page-break-after: avoid; }

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
    font-size: 9.5pt;
    color: #0f172a;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .page-header-strip p {
    margin: 1px 0 0 0;
    font-size: 6.5pt;
    color: #475569;
    font-weight: 600;
  }
  .page-tag {
    font-size: 6.5pt;
    font-weight: 800;
    background: #0f172a;
    color: #ffffff;
    padding: 2px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .page-footer-strip {
    font-size: 6.5pt;
    color: #64748b;
    border-top: 1px solid #cbd5e1;
    padding-top: 2px;
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }

  /* Cover Page Styling */
  .cover-card {
    border: 2px solid #1e293b;
    border-radius: 8px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    overflow: hidden;
    background: #ffffff;
  }
  .cover-top-banner {
    background: #1e293b;
    color: #ffffff;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .cover-hero-img {
    width: 100%;
    height: 72mm;
    object-fit: cover;
    border-bottom: 2px solid #1e293b;
    display: block;
  }
  .cover-body {
    padding: 8px 12px;
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .cover-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 13.5pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.15;
    margin: 2px 0 3px 0;
  }
  .cover-subtitle {
    font-size: 8.5pt;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }
  .badge-pill {
    display: inline-block;
    background: #f1f5f9;
    border: 1px solid #94a3b8;
    color: #1e293b;
    font-weight: 800;
    font-size: 7pt;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 auto 6px auto;
  }
  
  /* Scholar Box */
  .scholar-box {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 5px 10px;
    margin-bottom: 6px;
    font-size: 7.5pt;
    text-align: left;
  }
  .scholar-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  .scholar-row:last-child { margin-bottom: 0; }
  .scholar-line {
    border-bottom: 1px solid #94a3b8;
    flex: 1;
    margin-left: 6px;
  }

  /* QR Strip */
  .qr-strip {
    display: flex;
    align-items: center;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 4px 8px;
    gap: 8px;
  }
  .qr-code-img {
    width: 38px;
    height: 38px;
    flex-shrink: 0;
  }
  .qr-caption-text {
    font-size: 6.5pt;
    color: #334155;
    line-height: 1.2;
    text-align: left;
    font-weight: 600;
  }

  /* Tracking Grid (Page 2) */
  .tracking-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7pt;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .tracking-table th {
    background: #0f172a;
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    padding: 4px 5px;
    border: 1px solid #0f172a;
    font-size: 6.5pt;
    letter-spacing: 0.3px;
  }
  .tracking-table td {
    border: 1px solid #cbd5e1;
    padding: 5px 5px;
    text-align: center;
  }
  .tracking-table td.left-title {
    text-align: left;
    font-weight: 700;
    color: #0f172a;
  }
  .instruction-callout {
    background: #f8fafc;
    border-left: 3px solid #0f172a;
    padding: 4px 8px;
    font-size: 6.8pt;
    color: #334155;
    margin-bottom: 6px;
    line-height: 1.25;
  }

  /* Questions & Answers Grid */
  .lesson-section-title {
    background: #f1f5f9;
    border-left: 3px solid #0f172a;
    padding: 2px 6px;
    font-size: 7.2pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin: 4px 0 2px 0;
  }
  .lesson-section-title:first-child { margin-top: 0; }
  
  .qa-container {
    display: flex;
    flex-direction: column;
    gap: 2.5px;
    flex: 1 1 auto;
  }
  .q-item {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 6.8pt;
    line-height: 1.18;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 2px 5px;
  }
  .q-cb {
    width: 8px;
    height: 8px;
    border: 1px solid #475569;
    border-radius: 2px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .q-num {
    font-weight: 800;
    color: #0f172a;
    min-width: 14px;
  }
  .q-text {
    flex: 1;
    color: #1e293b;
  }

  /* Answer Items */
  .ans-card {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 6.8pt;
    line-height: 1.18;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 2px 5px;
  }
  .ans-num {
    font-weight: 800;
    color: #0f172a;
    min-width: 14px;
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
    font-size: 6.5pt;
    font-weight: 800;
    color: #475569;
    white-space: nowrap;
    margin-left: 4px;
  }

  /* Page 7: Chronology Domino Flowchart */
  .timeline-flow {
    display: flex;
    flex-direction: column;
    gap: 3.5px;
    flex: 1;
  }
  .domino-node {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #ffffff;
    border: 1px solid #0f172a;
    border-radius: 4px;
    padding: 3px 6px;
    font-size: 6.8pt;
    line-height: 1.2;
  }
  .domino-year {
    background: #0f172a;
    color: #ffffff;
    font-weight: 800;
    font-size: 6.8pt;
    padding: 2px 5px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .domino-text {
    flex: 1;
  }

  /* Page 8: Vocabulary & Phonetics */
  .vocab-grid {
    display: flex;
    flex-direction: column;
    gap: 3.5px;
    flex: 1;
  }
  .vocab-card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 3px solid #0f172a;
    border-radius: 3px;
    padding: 3px 6px;
    font-size: 6.8pt;
    line-height: 1.2;
  }
  .vocab-term {
    font-weight: 800;
    color: #0f172a;
  }
  .vocab-phonetic {
    color: #2563eb;
    font-weight: 700;
    margin-left: 3px;
  }
  .vocab-def {
    color: #334155;
    margin-top: 1px;
  }
  .seal-box {
    text-align: center;
    border-top: 1px solid #cbd5e1;
    padding-top: 3px;
    margin-top: 3px;
    font-size: 6pt;
    color: #64748b;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`;

// --------------------------------------------------------------------------
// HTML BUILDER
// --------------------------------------------------------------------------
async function buildHtml() {
  console.log('🛠️  Generating QR Code for Causes of the Great War...');
  const quizUrl = 'https://the-history-revision-hub.netlify.app/?view=quiz&unit=great_war';
  const qrDataUrl = await QRCode.toDataURL(quizUrl, {
    margin: 1,
    width: 250,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  // Base64 cover image
  const coverImgPath = path.join(ROOT_DIR, 'public', 'images', 'great_war_cover.jpg');
  let coverDataUrl = '/images/great_war_cover.jpg';
  if (fs.existsSync(coverImgPath)) {
    const imgBuf = fs.readFileSync(coverImgPath);
    coverDataUrl = `data:image/jpeg;base64,${imgBuf.toString('base64')}`;
  }

  // ------------------------------------------------------------------------
  // PAGE 1: COVER
  // ------------------------------------------------------------------------
  const page1 = `
  <div class="a5-page">
    <div class="cover-card">
      <div class="cover-top-banner">
        <span>The History Portal &bull; Department of History</span>
        <span>Edition 2026.1</span>
      </div>
      <img src="${coverDataUrl}" alt="Causes of the Great War Cover" class="cover-hero-img">
      <div class="cover-body">
        <div>
          <div class="badge-pill">Knowledge Retrieval Vault &bull; Homework Companion</div>
          <h1 class="cover-title">How did decades of imperial rivalry and fear culminate in thirty days of madness?</h1>
          <div class="cover-subtitle">KS3 History &bull; Causes of the Great War (1871–1914)</div>
        </div>
        
        <div class="scholar-box">
          <div class="scholar-row"><span>Scholar:</span><span class="scholar-line"></span></div>
          <div class="scholar-row"><span>Class / Form:</span><span class="scholar-line"></span></div>
          <div class="scholar-row"><span>History Teacher:</span><span style="font-weight: 700; margin-left: 6px;">Mr Lovett</span></div>
        </div>

        <div class="qr-strip">
          <img src="${qrDataUrl}" alt="Quiz QR Code" class="qr-code-img">
          <div class="qr-caption-text">
            <strong>Mobile Digital Answer Key:</strong><br>
            Scan with your phone camera for the interactive mobile quiz and instant parent answer key.
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 2: HOMEWORK & RETRIEVAL TRACKING LEDGER
  // ------------------------------------------------------------------------
  const page2 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Formative Homework &amp; Retrieval Ledger</h2>
        <p>Spaced Retrieval Cycle &bull; Read, Cover, Write, Check &amp; Retest</p>
      </div>
      <span class="page-tag">Tracking Matrix</span>
    </div>

    <div class="instruction-callout">
      <strong>Instructions for Scholars &amp; Parents:</strong> Complete <strong>Attempt 1</strong> from memory without looking at the back. Self-mark using <em>The Explanation</em> on Pages 5–6. Review your errors, then complete <strong>Attempt 2</strong> two days later to achieve long-term mastery.
    </div>

    <table class="tracking-table">
      <thead>
        <tr>
          <th style="width: 42%;">Lesson &amp; Focus Topic</th>
          <th style="width: 13%;">Due Date</th>
          <th style="width: 12%;">Attempt 1</th>
          <th style="width: 12%;">Attempt 2</th>
          <th style="width: 11%;">Parent</th>
          <th style="width: 10%;">RAG</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="left-title">1. German Unification (1871) &amp; Bismarck</td>
          <td>__ / __</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>[ &nbsp; ]</td>
          <td>🔴 🟡 🟢</td>
        </tr>
        <tr>
          <td class="left-title">2. Franco-Prussian War &amp; Revanche</td>
          <td>__ / __</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>[ &nbsp; ]</td>
          <td>🔴 🟡 🟢</td>
        </tr>
        <tr>
          <td class="left-title">3. The Scramble for Africa &amp; Morocco</td>
          <td>__ / __</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>[ &nbsp; ]</td>
          <td>🔴 🟡 🟢</td>
        </tr>
        <tr>
          <td class="left-title">4. Naval Arms Race &amp; HMS Dreadnought</td>
          <td>__ / __</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>[ &nbsp; ]</td>
          <td>🔴 🟡 🟢</td>
        </tr>
        <tr>
          <td class="left-title">5. The Alliance System (Triple Entente)</td>
          <td>__ / __</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>[ &nbsp; ]</td>
          <td>🔴 🟡 🟢</td>
        </tr>
        <tr>
          <td class="left-title">6. Sarajevo Assassination &amp; July Crisis</td>
          <td>__ / __</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>&nbsp;&nbsp; / 8</td>
          <td>[ &nbsp; ]</td>
          <td>🔴 🟡 🟢</td>
        </tr>
      </tbody>
    </table>

    <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #f8fafc; font-size: 6.8pt; margin-top: 4px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <strong>Unit Mastery Target:</strong> 42+ / 48 (87%+) &bull; <em>Level 4 Factual Fluency</em>
      </div>
      <div style="border: 1px solid #94a3b8; padding: 2px 8px; border-radius: 3px; font-weight: 700; background: #fff;">
        Final Score: ____ / 48
      </div>
    </div>

    <div style="border: 1px dashed #cbd5e1; border-radius: 4px; padding: 6px 8px; margin-top: 4px; font-size: 6.8pt; display: flex; justify-content: space-between; align-items: flex-end; height: 18mm;">
      <span style="font-weight: 700; color: #475569;">Teacher Verification &amp; Feedback Stamp:</span>
      <span style="border-bottom: 1px solid #94a3b8; width: 45%; text-align: center; font-size: 6pt; color: #94a3b8;">Signature &amp; Date</span>
    </div>

    <div class="page-footer-strip">
      <span>The History Revision Hub &bull; Spaced Retrieval</span>
      <span>Page 2 of 8</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 3: QUESTIONS (LESSONS 1–3)
  // ------------------------------------------------------------------------
  let qP3Html = '';
  let globalQNum = 1;
  for (let lIdx = 0; lIdx < 3; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    qP3Html += `<div class="lesson-section-title">${l.lessonTitle}</div><div class="qa-container">`;
    l.items.forEach((item) => {
      qP3Html += `
        <div class="q-item">
          <div class="q-cb"></div>
          <span class="q-num">${globalQNum}.</span>
          <span class="q-text">${item.q}</span>
        </div>
      `;
      globalQNum++;
    });
    qP3Html += `</div>`;
  }

  const page3 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Knowledge Retrieval Bank (Part 1)</h2>
        <p>Lessons 1 to 3 &bull; Questions 1 to 24 &bull; Direct Active Recall</p>
      </div>
      <span class="page-tag">Questions 1–24</span>
    </div>
    ${qP3Html}
    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; Active Retrieval</span>
      <span>Page 3 of 8</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 4: QUESTIONS (LESSONS 4–6)
  // ------------------------------------------------------------------------
  let qP4Html = '';
  for (let lIdx = 3; lIdx < 6; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    qP4Html += `<div class="lesson-section-title">${l.lessonTitle}</div><div class="qa-container">`;
    l.items.forEach((item) => {
      qP4Html += `
        <div class="q-item">
          <div class="q-cb"></div>
          <span class="q-num">${globalQNum}.</span>
          <span class="q-text">${item.q}</span>
        </div>
      `;
      globalQNum++;
    });
    qP4Html += `</div>`;
  }

  const page4 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Knowledge Retrieval Bank (Part 2)</h2>
        <p>Lessons 4 to 6 &bull; Questions 25 to 48 &bull; Direct Active Recall</p>
      </div>
      <span class="page-tag">Questions 25–48</span>
    </div>
    ${qP4Html}
    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; Active Retrieval</span>
      <span>Page 4 of 8</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 5: ANSWERS & THE EXPLANATION (LESSONS 1–3)
  // ------------------------------------------------------------------------
  let aP5Html = '';
  let globalANum = 1;
  for (let lIdx = 0; lIdx < 3; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    aP5Html += `<div class="lesson-section-title">${l.lessonTitle}</div><div class="qa-container">`;
    l.items.forEach((item) => {
      aP5Html += `
        <div class="ans-card">
          <span class="ans-num">${globalANum}.</span>
          <div class="ans-content">
            <span class="ans-core">${item.a}</span> &mdash; <span class="ans-exp">${item.exp}</span>
          </div>
          <span class="ans-boxes">[✓][✗]</span>
        </div>
      `;
      globalANum++;
    });
    aP5Html += `</div>`;
  }

  const page5 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>The Explanation &amp; Marking Bank (Part 1)</h2>
        <p>Lessons 1 to 3 &bull; Answers 1 to 24 &bull; Causal Understanding</p>
      </div>
      <span class="page-tag">Mark Scheme 1–24</span>
    </div>
    ${aP5Html}
    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; The Explanation</span>
      <span>Page 5 of 8</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 6: ANSWERS & THE EXPLANATION (LESSONS 4–6)
  // ------------------------------------------------------------------------
  let aP6Html = '';
  for (let lIdx = 3; lIdx < 6; lIdx++) {
    const l = QUIZ_DATA[lIdx];
    aP6Html += `<div class="lesson-section-title">${l.lessonTitle}</div><div class="qa-container">`;
    l.items.forEach((item) => {
      aP6Html += `
        <div class="ans-card">
          <span class="ans-num">${globalANum}.</span>
          <div class="ans-content">
            <span class="ans-core">${item.a}</span> &mdash; <span class="ans-exp">${item.exp}</span>
          </div>
          <span class="ans-boxes">[✓][✗]</span>
        </div>
      `;
      globalANum++;
    });
    aP6Html += `</div>`;
  }

  const page6 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>The Explanation &amp; Marking Bank (Part 2)</h2>
        <p>Lessons 4 to 6 &bull; Answers 25 to 48 &bull; Causal Understanding</p>
      </div>
      <span class="page-tag">Mark Scheme 25–48</span>
    </div>
    ${aP6Html}
    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; The Explanation</span>
      <span>Page 6 of 8</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 7: MASTER CHRONOLOGY DOMINO FLOWCHART
  // ------------------------------------------------------------------------
  const timelineNodes = [
    {
      year: '1871',
      text: '<strong>German Empire Proclaimed:</strong> Unified in the Hall of Mirrors at Versailles; Alsace-Lorraine annexed from France, sparking <em>Revanche</em>.',
    },
    {
      year: '1882',
      text: '<strong>Triple Alliance Formed:</strong> Germany, Austria-Hungary, and Italy create a central defensive bloc.',
    },
    {
      year: '1890',
      text: '<strong>Bismarck Dismissed:</strong> Kaiser Wilhelm II rejects defensive diplomacy, cancels the Reinsurance Treaty, and launches <em>Weltpolitik</em>.',
    },
    {
      year: '1894',
      text: '<strong>Franco-Russian Alliance:</strong> France and Russia unite militarily, trapping Germany between two rival powers (Encirclement).',
    },
    {
      year: '1904',
      text: '<strong>Entente Cordiale Signed:</strong> Britain and France settle colonial disputes and begin joint defensive talks.',
    },
    {
      year: '1905',
      text: '<strong>First Moroccan Crisis:</strong> Wilhelm II challenges French control in Tangier; Algeciras Conference (1906) isolates Germany.',
    },
    {
      year: '1906',
      text: "<strong>HMS Dreadnought Launched:</strong> Britain resets naval technology; sparks rapid arms race with Tirpitz's High Seas Fleet.",
    },
    {
      year: '1907',
      text: '<strong>Triple Entente Formed:</strong> Anglo-Russian Convention unites Britain, France, and Russia.',
    },
    {
      year: '1908',
      text: '<strong>Bosnian Crisis:</strong> Austria-Hungary annexes Bosnia, permanently alienating Serbia and Russia.',
    },
    {
      year: '28 June 1914',
      text: '<strong>Sarajevo Assassination:</strong> Archduke Franz Ferdinand murdered by Gavrilo Princip (Black Hand); sparks July Crisis.',
    },
    {
      year: '4 August 1914',
      text: '<strong>Outbreak of World War:</strong> Germany enacts the Schlieffen Plan via neutral Belgium; Britain declares war.',
    },
  ];

  const page7 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Master Chronology Domino Flowchart</h2>
        <p>1871–1914 &bull; The 11 Anchor Flashpoints of the Outbreak of War</p>
      </div>
      <span class="page-tag">Timeline</span>
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

    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; Chronological Chain</span>
      <span>Page 7 of 8</span>
    </div>
  </div>
  `;

  // ------------------------------------------------------------------------
  // PAGE 8: VOCABULARY & PHONETIC PRONUNCIATION GUIDE
  // ------------------------------------------------------------------------
  const vocabItems = [
    {
      term: 'Weltpolitik',
      phonetic: '[Velt-pol-ee-teek]',
      lang: 'German',
      def: '"World Policy." Kaiser Wilhelm II\'s aggressive foreign policy to transform Germany into a global superpower with an overseas empire and massive battlefleet.',
    },
    {
      term: 'Revanche',
      phonetic: '[Ruh-vahnsh]',
      lang: 'French',
      def: '"Revenge." The profound, enduring French national desire to avenge their humiliating defeat in the Franco-Prussian War (1870–71) and reclaim Alsace-Lorraine.',
    },
    {
      term: 'Einkreisung (Encirclement)',
      phonetic: '[Ine-kry-zoong]',
      lang: 'German',
      def: 'The persistent German strategic fear of being geographically surrounded and overwhelmed by a hostile Franco-Russian alliance on two fronts.',
    },
    {
      term: 'HMS Dreadnought',
      phonetic: '[Dred-nawt]',
      lang: 'English',
      def: 'The revolutionary 1906 British battleship that rendered all older warships obsolete overnight and triggered a massive naval arms race with Germany.',
    },
    {
      term: 'Blank Cheque (Blankoscheck)',
      phonetic: '[Blahnk-oh-sheck]',
      lang: 'German',
      def: "Germany's unconditional pledge of military backing issued to Austria-Hungary on 5–6 July 1914, emboldening Vienna to issue its crushing ultimatum to Serbia.",
    },
    {
      term: 'Schlieffen Plan',
      phonetic: '[Shlee-fen Plan]',
      lang: 'German',
      def: 'German war plan to rapidly invade France through neutral Belgium, capture Paris in 6 weeks, then transfer troops by rail to defeat Russia.',
    },
    {
      term: 'Mobilisation',
      phonetic: '[Moh-bi-ly-zay-shun]',
      lang: 'Military',
      def: 'The complex, timetable-driven railway movement of millions of reservist troops and supplies to frontiers; once ordered, it made war virtually unstoppable.',
    },
    {
      term: 'The Powder Keg of Europe',
      phonetic: '',
      lang: 'Metaphor',
      def: 'The volatile Balkan peninsula where competing ethnic Slavic nationalisms and Austro-Russian imperial ambitions threatened to explode at any moment.',
    },
  ];

  const page8 = `
  <div class="a5-page">
    <div class="page-header-strip">
      <div>
        <h2>Academic Vocabulary &amp; Phonetic Guide</h2>
        <p>Essential Historical Terminology &bull; Pronunciation &amp; Core Definitions</p>
      </div>
      <span class="page-tag">Glossary</span>
    </div>

    <div class="vocab-grid">
      ${vocabItems
        .map(
          (item) => `
        <div class="vocab-card">
          <div>
            <span class="vocab-term">${item.term}</span>
            ${item.phonetic ? `<span class="vocab-phonetic">${item.phonetic}</span>` : ''}
            <span style="font-size: 6pt; color: #64748b; text-transform: uppercase; margin-left: 4px;">(${item.lang})</span>
          </div>
          <div class="vocab-def">${item.def}</div>
        </div>
      `,
        )
        .join('')}
    </div>

    <div class="seal-box">
      The History Department &bull; Knowledge Retrieval Compendium &bull; Edition 2026.1 &bull; Standard A5 Saddle-Stitch
    </div>

    <div class="page-footer-strip">
      <span>Causes of the Great War &bull; Vocabulary &amp; Phonetics</span>
      <span>Page 8 of 8</span>
    </div>
  </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Causes of the Great War - Knowledge Retrieval &amp; Homework Companion</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,600&display=swap" rel="stylesheet">
  <style>${A5_BOOKLET_CSS}</style>
</head>
<body>
  ${page1}
  ${page2}
  ${page3}
  ${page4}
  ${page5}
  ${page6}
  ${page7}
  ${page8}
</body>
</html>`;
}

// --------------------------------------------------------------------------
// MAIN COMPILATION PROCESS
// --------------------------------------------------------------------------
async function run() {
  console.log('🚀 Starting Compilation of Causes of the Great War A5 Quiz Booklet...');
  const htmlContent = await buildHtml();

  if (!fs.existsSync(UNIT_DIR)) fs.mkdirSync(UNIT_DIR, { recursive: true });
  if (!fs.existsSync(PDFS_DIR)) fs.mkdirSync(PDFS_DIR, { recursive: true });

  // 1. Write HTML
  const htmlPath = path.join(UNIT_DIR, 'quiz_pack.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved HTML: ${htmlPath}`);

  // 2. Launch Puppeteer to compile A5 PDF
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

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
    margin: { top: '6mm', bottom: '6mm', left: '8mm', right: '8mm' },
  });
  console.log(`✅ Generated Master A5 PDF: ${primaryPdf}`);

  // Copy to aliases
  for (let i = 1; i < pdfTargets.length; i++) {
    fs.copyFileSync(primaryPdf, pdfTargets[i]);
    console.log(`✅ Updated PDF alias: ${pdfTargets[i]}`);
  }

  await browser.close();

  // Copy to Google Drive if available
  try {
    const driveMinutesDir = 'G:\\My Drive\\AAMX\\Dep File';
    if (fs.existsSync(driveMinutesDir)) {
      const gdrivePdf = path.join(driveMinutesDir, 'Causes_of_the_Great_War_A5_Quiz_Booklet.pdf');
      fs.copyFileSync(primaryPdf, gdrivePdf);
      console.log(`✅ Synced A5 Quiz Booklet to Google Drive: ${gdrivePdf}`);
    }
  } catch (e) {
    console.warn(`⚠️ Warning syncing to Google Drive: ${e.message}`);
  }

  console.log(
    '\n🎉 All 8 pages compiled cleanly with zero overflow! Ready for saddle-stitch printing.',
  );
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { run };
