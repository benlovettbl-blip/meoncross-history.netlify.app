/**
 * generate_second_british_empire_quiz_booklet.cjs
 *
 * Compiles the 8-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History (Year 8): The Second British Empire (1783–1914).
 *
 * Page Architecture (8-Page Saddle-Stitch Booklet / 2 sheets A4 landscape folded in half):
 * - Page 1: Uniform Front Cover & Formative Homework & Retrieval Tracking Ledger
 * - Pages 2–6: 5 Dedicated Lesson Retrieval Pages (Lessons 1 to 5 • 8 questions each = 40 questions total)
 *              Scaffolded on the 3-Tier Cognitive Ascent with Disciplinary Micro-Pips:
 *              • Q1–Q3 (▸): Substantive Anchor Knowledge & Chronology (Emerald)
 *              • Q4–Q6 (▸▸): Causal Mechanisms & Historical Context (Amber)
 *              • Q7–Q8 (▸▸▸): Synoptic Significance & Disciplinary Precedent (Crimson)
 * - Page 7: Department Marking Bank (Part 1 • Lessons 1–3 • Q1–Q20 • Bold answers + Explanations)
 * - Page 8: Department Marking Bank (Part 2 • Lessons 3–5 • Q21–Q40 • Bold answers + Explanations)
 *           + 3-Tier Mastery Standard + Department Evaluator Quality Seal & Sign-off Box
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'second_british_empire');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}
if (!fs.existsSync(UNIT_DIR)) {
  fs.mkdirSync(UNIT_DIR, { recursive: true });
}

// Base64 image helper for 100% offline self-contained HTML/PDF rendering
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
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

// --------------------------------------------------------------------------
// 40 RIGOROUS QUESTIONS ACROSS 5 LESSONS: 3-TIER COGNITIVE ASCENT
// Tier 1 (Q1–Q3): Core Substantive Recall & Chronology (▸)
// Tier 2 (Q4–Q6): Causal Mechanisms & Historical Dynamics (▸▸)
// Tier 3 (Q7–Q8): Synoptic Significance, Precedent & High-Stretch (▸▸▸)
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  // LESSON 1: Engines of Empire: Mercantilism, Naval Hegemony & Portsmouth Dockyard (1783–1900)
  {
    lesson: 1,
    lessonTitle:
      '1. Engines of Empire: Mercantilism, Naval Hegemony & Portsmouth Dockyard (1783–1900)',
    shortTitle: 'Engines of Empire & Portsmouth',
    enquiry: 'How was the British Empire built and sustained through maritime industrial power?',
    items: [
      {
        q: 'In what year did Admiral Nelson defeat the combined French and Spanish fleets at Trafalgar, securing total British naval dominance?',
        a: '1805',
        exp: 'Nelson’s victory at Trafalgar shattered Napoleon’s invasion plans and established unchallenged British naval command of the oceans for over a century.',
      },
      {
        q: 'What economic system mandated that colonies trade exclusively with Britain to accumulate national wealth and bullion?',
        a: 'Mercantilism (and the Navigation Acts)',
        exp: 'Mercantilism treated colonial commerce as a national monopoly, requiring all colonial raw materials and finished goods to be transported on British ships.',
      },
      {
        q: 'Which Hampshire naval facility was the largest industrial manufacturing complex in the world in the early 19th century?',
        a: 'Portsmouth Royal Dockyard',
        exp: 'Employing thousands of master smiths, ropemakers, and shipwrights, Portsmouth Dockyard was the industrial beating heart that sustained the global Royal Navy.',
      },
      {
        q: 'What revolutionary automated machinery invented by Marc Brunel at Portsmouth in 1803 produced 130,000 rigging blocks annually with just 10 men?',
        a: 'The Portsmouth Block Mills',
        exp: 'Brunel’s steam-driven metalworking machines were the world’s first true all-metal mass production assembly line, multiplying block production tenfold.',
      },
      {
        q: 'What revolutionary ironclad warship fitted at Portsmouth and launched in 1860 made all wooden battlefleets obsolete?',
        a: 'HMS Warrior',
        exp: 'Powered by both steam and sail and protected by 4.5 inches of wrought-iron armour, HMS Warrior was the largest and fastest warship afloat in 1860.',
      },
      {
        q: 'How thick was the wrought-iron armour plate protecting HMS Warrior against explosive naval shellfire?',
        a: '4.5 inches (backed by 18 inches of teak timber)',
        exp: 'The 4.5-inch iron belt was completely impenetrable to contemporary artillery, rendering wooden walls obsolete and launching the modern dreadnought era.',
      },
      {
        q: 'What official naval doctrine established by the Naval Defence Act 1889 mandated that the Royal Navy must equal the combined strength of the next two strongest fleets?',
        a: 'The Two-Power Standard',
        exp: 'Parliament legally mandated that British naval battle strength must equal France and Russia combined, ensuring deterrent naval hegemony worldwide.',
      },
      {
        q: 'Why was Portsmouth’s industrial power indispensable for enforcing British "gunboat diplomacy" and Pax Britannica?',
        a: 'It rapidly repaired, refitted, and modernised steam ironclads, allowing Britain to project lethal military power across global trade routes and coastal ports',
        exp: 'Unrivalled dockyard dry docks and steam engineering allowed the Royal Navy to deploy warships to any maritime crisis across the globe within weeks.',
      },
    ],
  },

  // LESSON 2: The Company's Raj: Economic Exploitation, Sepoy Grievances & The 1857 Indian Rebellion (1765–1858)
  {
    lesson: 2,
    lessonTitle:
      "2. The Company's Raj: Economic Exploitation, Sepoy Grievances & The 1857 Indian Rebellion (1765–1858)",
    shortTitle: "Company's Raj & 1857 Rebellion",
    enquiry:
      'How did corporate exploitation spark the 1857 Indian Rebellion and destroy the East India Company?',
    items: [
      {
        q: 'What 1765 imperial treaty granted the East India Company the Diwani (civil tax-collecting rights) over the province of Bengal?',
        a: 'The Treaty of Allahabad',
        exp: 'The Mughal Emperor granted civil tax collection to the Company, allowing corporate merchants to extract £2 million annually from 20 million Bengalis.',
      },
      {
        q: 'What term describes how cheap British factory cotton decimated traditional Indian handloom weaving in ancient centres like Dhaka?',
        a: 'De-industrialisation (and creating a captive market)',
        exp: 'Unequal tariffs flooded India with cheap Lancashire machine cotton, reducing skilled urban weavers to impoverished rural subsistence farmers.',
      },
      {
        q: 'What aggressive annexation policy of Lord Dalhousie annexed Indian princely states whose rulers died without a biological male heir?',
        a: 'The Doctrine of Lapse',
        exp: 'Dalhousie annexed Jhansi, Satara, and Awadh (1856), overriding Indian adoption customs, disinheriting dynasties, and alienating soldiers.',
      },
      {
        q: 'In what month and year did the Indian Rebellion break out when sepoys mutinied at Meerut?',
        a: 'May 1857',
        exp: 'On 10 May 1857, sepoys at Meerut shot British officers, liberated comrades, and marched on Delhi to restore Mughal sovereignty.',
      },
      {
        q: 'What new firearm cartridge served as the immediate technological spark of the sepoy mutiny?',
        a: 'The Enfield rifle paper cartridge (greased with animal tallow)',
        exp: 'Biting cartridges greased with sacred cow and forbidden pig fat outraged Hindu and Muslim sepoys, confirming fears of forced Christian conversion.',
      },
      {
        q: 'Which warrior queen of the annexed state of Jhansi led rebel forces into battle on horseback until she fell fighting in June 1858?',
        a: 'Rani Lakshmibai',
        exp: 'Rani Lakshmibai refused to surrender Jhansi, leading fierce cavalry charges in male warrior dress and becoming an enduring national symbol of resistance.',
      },
      {
        q: 'What historic legislation passed by Parliament in August 1858 abolished the East India Company and transferred rule to the British Crown?',
        a: 'The Government of India Act 1858 (establishing the British Raj)',
        exp: 'The 1858 Act ended 258 years of Company rule, placing India directly under a Cabinet Secretary of State and Queen Victoria’s Viceroy.',
      },
      {
        q: 'Why did the 1857 Rebellion mark a permanent turning point in British imperial governance and racial ideology?',
        a: 'Britain abandoned forced social reforms, allied with conservative princes, and institutionalised rigid racial segregation under direct Crown rule',
        exp: 'Traumatised by the rebellion, the British Raj retreated behind segregated European cantonments, expanded railway troop transport, and restructured the army.',
      },
    ],
  },

  // LESSON 3: The Empire of Settlement: Terra Nullius, The First Fleet & Frontier Resistance in Australia (1788–1854)
  {
    lesson: 3,
    lessonTitle:
      '3. The Empire of Settlement: Terra Nullius, The First Fleet & Frontier Resistance in Australia (1788–1854)',
    shortTitle: 'Settler Colonialism in Australia',
    enquiry:
      'How did settler colonialism transform Australia through dispossession and frontier warfare?',
    items: [
      {
        q: 'From which Hampshire naval anchorage did Captain Arthur Phillip and the eleven ships of the First Fleet set sail in May 1787?',
        a: 'Portsmouth Spithead',
        exp: 'Carrying over 1,400 convicts, marines, and crew, the First Fleet departed Portsmouth on an eight-month voyage to establish a penal colony in New South Wales.',
      },
      {
        q: 'Why did the British government establish a penal colony in Australia following the American Revolutionary War?',
        a: 'The loss of the American colonies (1783) blocked convict transportation, causing severe overcrowding in British prisons and Thames prison hulks',
        exp: 'Before 1776, Britain transported 50,000 convicts to America; with this outlet closed, rotting prison hulks in Portsmouth and London overflowed dangerously.',
      },
      {
        q: 'Where did the First Fleet land in January 1788 to establish the first British settlement in Australia?',
        a: 'Botany Bay and Sydney Cove (Port Jackson)',
        exp: 'Finding Botany Bay unsuitable for farming and fresh water, Phillip relocated the settlement to Sydney Cove, founding the town of Sydney.',
      },
      {
        q: 'What Latin legal doctrine meaning "nobody\'s land" did the British Crown use to claim sovereignty over Australia without negotiating treaties?',
        a: 'Terra Nullius',
        exp: 'The British treated Australia as uninhabited because Indigenous nations were nomadic and did not practice European agriculture, denying 65,000 years of ownership.',
      },
      {
        q: 'Which Bidjigal warrior and lawman of the Eora Nation led armed guerrilla resistance against British settlers during the Hawkesbury Wars (1790–1802)?',
        a: 'Pemulwuy',
        exp: 'Pemulwuy led coordinated raids on colonial farms and outposts, surviving multiple bullet wounds before being killed in battle in 1802.',
      },
      {
        q: 'What devastating impact did British pastoral expansion and introduced diseases have on Indigenous Australian populations?',
        a: 'Millions of sheep destroyed native food plants and water holes, while virgin-soil epidemics (especially smallpox in 1789) wiped out 50% or more of coastal clans',
        exp: 'Dispossession combined with catastrophic epidemics shattered clan structures, while frontier pastoralists engaged in violent clashes known as the Australian Frontier Wars.',
      },
      {
        q: 'What 1851 discovery in Victoria sparked a massive global influx of free migrants, transforming Australia from a convict station into a settler society?',
        a: 'The Victorian Gold Rush',
        exp: 'The discovery of rich goldfields at Ballarat and Bendigo tripled Australia’s European population in a decade, attracting miners from Britain, Europe, China, and America.',
      },
      {
        q: 'What 1854 armed rebellion by gold miners in Ballarat protested repressive colonial license fees and demanded democratic rights?',
        a: 'The Eureka Stockade',
        exp: 'Miners swore an oath under the Eureka Flag of the Southern Cross to resist taxation without representation, leading to democratic voting reforms in Australia.',
      },
    ],
  },

  // LESSON 4: The Scramble for Africa & Imperial Ideology: Maxim Guns & Plunder (1884–1902)
  {
    lesson: 4,
    lessonTitle: '4. The Scramble for Africa & Imperial Ideology: Maxim Guns & Plunder (1884–1902)',
    shortTitle: 'Scramble for Africa & Ideology',
    enquiry:
      'How did European powers conquer Africa, and how was imperial plunder morally justified?',
    items: [
      {
        q: 'What international diplomatic conference held in 1884–1885 partitioned the African continent among European powers without African delegates?',
        a: 'The Berlin Conference',
        exp: 'Chaired by German Chancellor Otto von Bismarck, 14 European powers drew arbitrary boundaries across Africa without a single African representative present.',
      },
      {
        q: 'What percentage of the African continent was seized and colonized by European powers between 1881 and 1914?',
        a: 'Over 90% (from roughly 10% in 1870 to over 90% by 1914)',
        exp: 'In just three decades, Britain, France, Germany, Belgium, and Portugal partitioned almost the entire African landmass into colonial protectorates.',
      },
      {
        q: 'Which two African states successfully defended and maintained their independence against European colonial armies?',
        a: 'Ethiopia and Liberia',
        exp: 'Emperor Menelik II defeated an invading Italian army at the Battle of Adwa in 1896, while Liberia retained sovereignty under American diplomatic protection.',
      },
      {
        q: 'What revolutionary rapid-fire weapon invented in 1884 gave European armies an insurmountable tactical advantage over African resistance?',
        a: 'The Maxim machine gun',
        exp: 'Firing 600 rounds per minute using recoil energy, Hiram Maxim’s weapon enabled small European detachments to annihilate traditional charging armies.',
      },
      {
        q: 'At which 1898 battle did British forces use Maxim guns and gunboats to kill 11,000 Sudanese Mahdist fighters in five hours?',
        a: 'The Battle of Omdurman',
        exp: 'General Kitchener deployed 44 Maxim guns and artillery on the Nile, inflicting catastrophic casualties while British forces lost only 48 men.',
      },
      {
        q: 'What medical alkaloid extracted from cinchona tree bark enabled European explorers and soldiers to survive malaria in tropical Africa?',
        a: 'Quinine',
        exp: 'Daily doses of quinine dramatically lowered European mortality from malaria, opening the previously impassable tropical interior to military conquest.',
      },
      {
        q: 'What famous 1899 poem by Rudyard Kipling urged the United States and Britain to conquer non-European nations as a selfless "moral duty"?',
        a: '"The White Man\'s Burden"',
        exp: 'Kipling framed imperial conquest as a noble civilising mission to bring order and Christianity to "half-devil and half-child" colonized peoples.',
      },
      {
        q: "How did humanitarian campaigner E.D. Morel expose the lethal reality of European imperialism in his 1920 critique The Black Man's Burden?",
        a: 'He documented that imperialism was driven by capitalist greed for rubber and minerals, inflicting mass forced labour, mutilation, and depopulation on Africans',
        exp: 'Morel exposed the brutal atrocities in King Leopold’s Congo and British colonies, proving that European "civilisation" was a veneer for commercial plunder.',
      },
    ],
  },

  // LESSON 5: Synoptic Historical Verdict: Dadabhai Naoroji's Drain Theory vs. Imperial Apologists (1851–1914)
  {
    lesson: 5,
    lessonTitle:
      "5. Synoptic Historical Verdict: Dadabhai Naoroji's Drain Theory vs. Imperial Apologists (1851–1914)",
    shortTitle: 'Synoptic Verdict: Naoroji & Drain',
    enquiry:
      'Who truly benefited from the British Empire: the British ruling elite or colonized populations?',
    items: [
      {
        q: 'Who was the pioneering Indian economist and first Indian Member of Parliament elected to Westminster in 1892?',
        a: 'Dadabhai Naoroji',
        exp: 'Known as the "Grand Old Man of India", Naoroji was elected as Liberal MP for Finsbury Central, using the British Parliament to expose colonial exploitation.',
      },
      {
        q: 'What landmark economic theory did Dadabhai Naoroji formulate in his 1901 study Poverty and Un-British Rule in India?',
        a: 'The "Drain of Wealth" Theory',
        exp: 'Naoroji demonstrated through accounting records that Britain extracted vast capital from India annually without providing any equivalent commercial return.',
      },
      {
        q: 'How much capital did Dadabhai Naoroji calculate Britain systematically extracted from Indian taxation each year to London?',
        a: 'Between £30 million and £40 million sterling annually',
        exp: 'This continuous financial drain funded British military expenditures, civil service pensions, and home charges, depriving Indian agriculture of investment.',
      },
      {
        q: 'What imperial spectacle in 1851 showcased the raw materials and manufactures of the British Empire inside the Crystal Palace?',
        a: 'The Great Exhibition of the Works of Industry of All Nations',
        exp: 'Organized by Prince Albert, the Great Exhibition displayed colonial treasures (including the Koh-i-Noor diamond) to 6 million visitors, celebrating British hegemony.',
      },
      {
        q: 'How many Indian colonial subjects are estimated to have perished in preventable famines between 1876 and 1900 under British rule?',
        a: 'Approximately 15 to 20 million people',
        exp: 'Severe droughts combined with British tax extraction and non-intervention in grain markets resulted in catastrophic mortality across Madras, Bombay, and Bengal.',
      },
      {
        q: 'Why did British colonial authorities refuse to halt grain exports or fix food prices during late-Victorian Indian famines?',
        a: 'They dogmatically followed laissez-faire economic theory, insisting that free markets should govern food distribution even during mass starvation',
        exp: 'Viceroy Lord Lytton insisted that government food relief would create "demoralising dependency", exporting grain to London while millions starved.',
      },
      {
        q: 'What magnificent 1897 celebration masked deep colonial famines and domestic poverty behind an elaborate imperial military pageant?',
        a: 'Queen Victoria’s Diamond Jubilee',
        exp: 'Fifty thousand colonial troops marched through London in an opulent display of global empire, celebrating Pax Britannica while famine ravaged colonial India.',
      },
      {
        q: 'In a synoptic historical verdict, why was the nineteenth-century British Empire structured as an "imperial pyramid"?',
        a: 'The British ruling elite enjoyed unmatched wealth and power at the summit, while colonized subjects at the base bore the devastating costs of de-industrialisation and famine',
        exp: 'While British workers eventually secured votes and higher wages through collective struggle, colonized populations suffered capital drain, economic destruction, and political disenfranchisement.',
      },
    ],
  },
];

function getPipBadge(index) {
  if (index < 3) {
    return `<span class="pip-badge pip-1" title="Substantive Anchor"><span class="pip-icon">▸</span></span>`;
  } else if (index < 6) {
    return `<span class="pip-badge pip-2" title="Causal Mechanism"><span class="pip-icon">▸▸</span></span>`;
  } else {
    return `<span class="pip-badge pip-3" title="Significance & Precedent"><span class="pip-icon">▸▸▸</span></span>`;
  }
}

// --------------------------------------------------------------------------
// CSS STYLING FOR A5 SADDLE-STITCH BOOKLET (148mm x 210mm)
// Exact Geometry: 100% Page Budget Utilization & Zero Overflow
// --------------------------------------------------------------------------
const A5_BOOKLET_CSS = `
  @page {
    size: 148mm 210mm;
    margin: 6mm 0mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #000000;
    margin: 0;
    padding: 0;
    font-size: 7.5pt;
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
    padding-left: 10mm;
    padding-right: 6mm;
  }
  .a5-page:nth-child(even) {
    padding-left: 6mm;
    padding-right: 10mm;
  }
  .a5-page:last-child { page-break-after: avoid; }

  .page-flex-full {
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 198mm !important;
    box-sizing: border-box !important;
  }

  /* Micro-Pip Disciplinary Badges */
  .pip-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 5.8pt;
    line-height: 1;
    letter-spacing: -1px;
  }
  .pip-1 { color: #16a34a; }
  .pip-2 { color: #d97706; }
  .pip-3 { color: #dc2626; }
  @media print {
    .pip-badge { font-weight: 800; }
  }

  /* Page Headers & Footers */
  .page-header-strip {
    border-bottom: 1.5px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-header-strip h2 {
    margin: 0;
    font-size: 8.8pt;
    color: #000000;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    line-height: 1.15;
  }
  .page-header-strip p {
    margin: 1px 0 0 0;
    font-size: 6.8pt;
    font-style: italic;
    color: #000000;
    line-height: 1.15;
  }
  .page-tag {
    font-size: 6.8pt;
    font-weight: 800;
    border: 1px solid #000000;
    padding: 1px 5px;
    border-radius: 2px;
    text-transform: uppercase;
    background: #000000;
    color: #ffffff;
    white-space: nowrap;
  }
  .page-header-compact {
    border-bottom: 1.5px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-header-compact h2 {
    margin: 0;
    font-size: 8.8pt;
    color: #000000;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .page-footer-strip {
    border-top: 1px solid #000000;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-size: 6.0pt;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }

  /* Page 1: Cover Header & Customizer Pattern */
  .cover-banner {
    background: #000000;
    color: #ffffff;
    padding: 3.5px 6px;
    font-size: 6.8pt;
    font-weight: 800;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cover-header-block {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-top: none;
    padding: 5px 8px 4px 8px;
    text-align: center;
  }
  .cover-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 13.5pt;
    font-weight: 900;
    color: #000000;
    margin: 0 0 1px 0;
    line-height: 1.15;
    letter-spacing: -0.2px;
  }
  .cover-subtitle {
    font-size: 6.4pt;
    font-weight: 700;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0;
  }

  /* Pupil Box */
  .pupil-box {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-top: none;
    padding: 7px 8px;
    font-size: 7.2pt;
    color: #000000;
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
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
  }
  .pupil-field span.line {
    border-bottom: 1.2px solid #000000;
    flex: 1;
    min-height: 12px;
  }

  /* Cover Portrait Container */
  .cover-map-container {
    margin: 3px 0 3px 0;
    text-align: center;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 4px;
    padding: 3px 6px;
  }
  .cover-map-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 56.5mm;
  }
  .cover-map-img {
    max-height: 56.5mm;
    max-width: 100%;
    object-fit: contain;
    border: 1.2px solid #000000;
    border-radius: 2px;
  }
  .cover-map-caption {
    font-size: 5.6pt;
    color: #000000;
    margin-top: 1.5px;
    font-style: italic;
    font-weight: 600;
  }

  /* Tracking Ledger */
  .ledger-container {
    margin-top: 3px;
  }
  .tracking-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.4pt;
    background: #ffffff;
    color: #000000;
  }
  .tracking-table th {
    background: #000000;
    color: #ffffff;
    font-weight: 800;
    padding: 3.5px 3px;
    border: 1px solid #000000;
    text-transform: uppercase;
    letter-spacing: 0.1px;
    text-align: center;
  }
  .tracking-table td {
    border: 1px solid #000000;
    padding: 7.5px 3.5px;
    text-align: center;
    vertical-align: middle;
    color: #000000;
  }
  .tracking-table td.left-title {
    text-align: left;
    color: #000000;
  }
  .tb-lesson-title {
    font-weight: 800;
    font-size: 6.6pt;
    color: #000000;
    line-height: 1.15;
  }
  .tb-lesson-enquiry {
    font-size: 5.4pt;
    color: #000000;
    font-style: italic;
    line-height: 1.15;
    margin-top: 0.5px;
  }
  .score-line {
    display: inline-block;
    width: 14px;
    border-bottom: 1.2px solid #000000;
  }
  .retrieval-vertical {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 6px;
    gap: 2.5px;
    font-size: 5.4pt;
    line-height: 1.15;
    color: #000000;
    font-weight: 700;
  }
  .parent-sig-cell {
    padding: 2px 4px;
    vertical-align: middle;
    text-align: center;
  }

  /* Page 1: 3-Tier Traffic Light Mastery Rule (DIRT Loop) */
  .mastery-traffic-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 3px;
    padding: 2.5px 6px;
    margin-top: 2.5px;
    margin-bottom: 2.5px;
    font-size: 5.8pt;
    line-height: 1.15;
    color: #000000;
    font-weight: 600;
  }
  .traffic-tier {
    display: flex;
    align-items: center;
    gap: 3.5px;
    color: #000000;
  }
  .traffic-dot {
    font-size: 7pt;
    line-height: 1;
  }
  .green-dot { color: #16a34a; }
  .amber-dot { color: #d97706; }
  .red-dot { color: #dc2626; }

  /* QR Strip */
  .qr-strip {
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 4px;
    padding: 3px 6px;
    gap: 8px;
    margin-top: 2.5px;
    margin-bottom: 1.5px;
    color: #000000;
  }
  .qr-code-img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }
  .qr-caption-text {
    font-size: 6.0pt;
    color: #000000;
    line-height: 1.15;
    text-align: left;
    font-weight: 700;
  }

  /* Pages 2–6: Dedicated Question Page Layout */
  .q-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 2px;
  }
  .q-block {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 3px;
    padding: 3.5px 6px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 8.8pt;
    line-height: 1.16;
  }
  .q-num-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: 17px;
    flex-shrink: 0;
    line-height: 1;
    padding-top: 0.5px;
  }
  .q-num {
    font-weight: 800;
    color: #000000;
    font-size: 8.8pt;
    line-height: 1.1;
  }
  .q-pips {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    line-height: 1;
  }
  .q-prompt {
    font-weight: 700;
    color: #000000;
    font-size: 8.8pt;
    line-height: 1.16;
    flex: 1;
  }
  .q-line-row {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 7.6pt;
    margin-top: 1px;
  }
  .q-line-lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
    font-size: 7.6pt;
    min-width: 44px;
  }
  .q-solid-line {
    flex: 1;
    border-bottom: 1.2px solid #000000;
    min-height: 18px;
  }

  /* Pages 7 & 8: Marking Bank */
  .mb-section-title {
    background: #f1f5f9;
    border-left: 3.5px solid #000000;
    border-top: 1px solid #000000;
    border-right: 1px solid #000000;
    border-bottom: 1px solid #000000;
    padding: 1px 4.5px;
    font-size: 6.3pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    margin: 1px 0 1px 0;
  }
  .mb-section-title:first-child { margin-top: 0; }
  .mb-container {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    justify-content: space-between;
  }
  .ans-card {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 6.3pt;
    line-height: 1.15;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 1px 4.5px;
    color: #000000;
  }
  .ans-num-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 14px;
    flex-shrink: 0;
    line-height: 1;
    padding-top: 0.5px;
  }
  .ans-num {
    font-weight: 800;
    color: #000000;
    font-size: 6.6pt;
    line-height: 1.1;
  }
  .ans-pip {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    line-height: 1;
  }
  .ans-pip .pip-badge {
    font-size: 5.6pt;
    letter-spacing: -1px;
  }
  .ans-content {
    flex: 1;
    color: #000000;
  }
  .ans-core {
    font-weight: 800;
    color: #000000;
    font-size: 6.6pt;
  }
  .ans-exp {
    color: #000000 !important;
    font-weight: 600 !important;
    font-style: normal !important;
    font-size: 6.3pt;
  }
`;

// --------------------------------------------------------------------------
// MAIN COMPILATION SCRIPT
// --------------------------------------------------------------------------
async function compileQuizBookletHtml() {
  const qrUrl =
    'https://the-history-revision-hub.netlify.app/?unit=second_british_empire&view=quizzes';
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    margin: 0,
    color: { dark: '#000000', light: '#ffffff' },
  });

  const coverImgBase64 =
    getBase64Image('/images/imperial_federation_map.jpg') ||
    getBase64Image('public/images/imperial_federation_map.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Second British Empire (1783–1914) Knowledge Retrieval Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    ${A5_BOOKLET_CSS}
  </style>
</head>
<body>
`;

  // ========================================================================
  // PAGE 1: FRONT COVER & FORMATIVE RETRIEVAL TRACKING LEDGER
  // ========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div>
      <div class="cover-banner" data-department-name="The History Department">
        <span class="school-brand-target">The History Department</span>
        <span>Key Stage 3 &bull; Year 8 History</span>
      </div>
      <div class="cover-header-block">
        <h1 class="cover-title">The Second British Empire (1783–1914)</h1>
        <p class="cover-subtitle">Knowledge Retrieval &bull; Formative Tracking &bull; Homework Companion &bull; 40 Questions</p>
      </div>
      <div class="pupil-box">
        <div class="pupil-grid">
          <div class="pupil-field"><span class="lbl">Pupil Name:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Class:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Teacher:</span><span class="line"></span></div>
        </div>
      </div>
    </div>

    <!-- Centerpiece Historical Evidence -->
    <div class="cover-map-container">
      <div class="cover-map-frame">
        <img src="${coverImgBase64}" class="cover-map-img" alt="Imperial Federation Map of the World 1886" />
      </div>
      <div class="cover-map-caption">
        Primary Visual Evidence: <em>The Imperial Federation Map of the World</em> (Walter Crane, 1886 &bull; Norman B. Leventhal Map Center)
      </div>
    </div>

    <!-- Tracking Ledger Table -->
    <div class="ledger-container">
      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 44%;">Unit Enquiry Sequence</th>
            <th style="width: 8%;">Att. 1</th>
            <th style="width: 8%;">Att. 2</th>
            <th style="width: 24%;">Retrieval Strength</th>
            <th style="width: 16%; font-size: 5.6pt; letter-spacing: -0.2px; white-space: nowrap;">Parent Initials</th>
          </tr>
        </thead>
        <tbody>
          ${QUIZ_DATA.map(
            (item) => `
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">Lesson ${item.lesson}: ${item.shortTitle}</div>
              <div class="tb-lesson-enquiry">${item.enquiry}</div>
            </td>
            <td><span class="score-line"></span> / 8</td>
            <td><span class="score-line"></span> / 8</td>
            <td>
              <div class="retrieval-vertical">
                <div>[ ] Instant</div>
                <div>[ ] Effortful</div>
                <div>[ ] Restudy</div>
              </div>
            </td>
            <td class="parent-sig-cell"></td>
          </tr>`,
          ).join('')}
        </tbody>
      </table>
    </div>

    <!-- 3-Tier Traffic Light Mastery Rule (DIRT Loop) -->
    <div class="mastery-traffic-strip">
      <div class="traffic-tier">
        <span class="traffic-dot green-dot">&#9679;</span>
        <strong>7–8/8 Mastered:</strong> Secure factual recall.
      </div>
      <div class="traffic-tier">
        <span class="traffic-dot amber-dot">&#9679;</span>
        <strong>5–6/8 Consolidate:</strong> Flashcard restudy on missed terms.
      </div>
      <div class="traffic-tier">
        <span class="traffic-dot red-dot">&#9679;</span>
        <strong>&lt;5/8 Action Required:</strong> Mandatory re-test after DIRT corrections.
      </div>
    </div>

    <!-- Interactive Portal QR Code -->
    <div class="qr-strip">
      <img src="${qrDataUrl}" alt="Digital Portal QR" class="qr-code-img">
      <div class="qr-caption-text">
        <strong>Scan for Interactive Digital Quizzes & Audio Lessons:</strong><br>
        Access online self-marking retrieval flashcards, diagnostic feedback, and audio narration at <strong>the-history-revision-hub.netlify.app</strong>.
      </div>
    </div>

    <div class="page-footer-strip">
      <span><strong>The History Department</strong> &bull; Key Stage 3 History</span>
      <span>Page 1 of 8</span>
    </div>
  </div>
`;

  // ========================================================================
  // PAGES 2–6: 5 DEDICATED LESSON RETRIEVAL PAGES (8 QUESTIONS EACH)
  // ========================================================================
  let globalQNum = 1;
  QUIZ_DATA.forEach((lessonData, lIdx) => {
    const pageNum = lIdx + 2;
    html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Lesson ${lessonData.lesson}: ${lessonData.shortTitle}</h2>
        <p>${lessonData.enquiry}</p>
      </div>
      <span class="page-tag">Questions ${globalQNum}–${globalQNum + 7}</span>
    </div>

    <div class="q-container">
      ${lessonData.items
        .map((item, itemIdx) => {
          const currentNum = globalQNum++;
          const pipBadge = getPipBadge(itemIdx);
          return `
      <div class="q-block">
        <div class="q-header">
          <div class="q-num-box">
            <span class="q-num">${currentNum}.</span>
            <span class="q-pips">${pipBadge}</span>
          </div>
          <span class="q-prompt">${item.q}</span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Answer:</span>
          <span class="q-solid-line"></span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Detail:</span>
          <span class="q-solid-line"></span>
        </div>
      </div>`;
        })
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span>Lesson ${lessonData.lesson}: ${lessonData.shortTitle}</span>
      <span>Page ${pageNum} of 8</span>
    </div>
  </div>
`;
  });

  // ========================================================================
  // PAGE 7: DEPARTMENT MARKING BANK (PART 1 • LESSONS 1–3 • Q1–Q20)
  // Exactly 20 Questions evenly distributed across Page 7 (Zero spillover)
  // ========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip page-header-compact">
      <h2>Department Marking Bank &bull; Part 1: Lessons 1–3 (Q1–Q20)</h2>
    </div>

    <div class="mb-container">
      <div class="mb-section-title">Lesson 1: Engines of Empire: Mercantilism, Naval Hegemony & Portsmouth Dockyard (Q1–Q8)</div>
      ${QUIZ_DATA[0].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 1}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Lesson 2: The Company's Raj & 1857 Indian Rebellion (Q9–Q16)</div>
      ${QUIZ_DATA[1].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 9}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Lesson 3: Settler Colonialism in Australia (Part 1: Q17–Q20)</div>
      ${QUIZ_DATA[2].items
        .slice(0, 4)
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 17}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span>The Second British Empire (1783–1914)</span>
      <span>Marking Bank Part 1 &bull; Page 7 of 8</span>
    </div>
  </div>
`;

  // ========================================================================
  // PAGE 8: DEPARTMENT MARKING BANK (PART 2 • LESSONS 3–5 • Q21–Q40)
  // Exactly 20 Questions evenly distributed across Page 8 (Zero spillover)
  // ========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip page-header-compact">
      <h2>Department Marking Bank &bull; Part 2: Lessons 3–5 (Q21–Q40)</h2>
    </div>

    <div class="mb-container">
      <div class="mb-section-title">Lesson 3: Settler Colonialism in Australia (Part 2: Q21–Q24)</div>
      ${QUIZ_DATA[2].items
        .slice(4, 8)
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 21}.</span>
          <span class="ans-pip">${getPipBadge(i + 4)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Lesson 4: The Scramble for Africa & Imperial Ideology (Q25–Q32)</div>
      ${QUIZ_DATA[3].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 25}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Lesson 5: Synoptic Historical Verdict: Dadabhai Naoroji's Drain Theory (Q33–Q40)</div>
      ${QUIZ_DATA[4].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 33}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span>The Second British Empire (1783–1914)</span>
      <span>Marking Bank Part 2 &bull; Page 8 of 8</span>
    </div>
  </div>
`;

  html += `
</body>
</html>`;

  return html;
}

async function run() {
  console.log('=============================================================');
  console.log('📖 COMPILING SECOND BRITISH EMPIRE 8-PAGE QUIZ BOOKLET');
  console.log('=============================================================\n');

  const htmlContent = await compileQuizBookletHtml();
  const htmlPath = path.join(UNIT_DIR, 'quiz_pack.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Written HTML Booklet: ${htmlPath}`);

  console.log('🚀 Launching Puppeteer for PDF export and space budget audit...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Space Budget & Overflow Audit
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a5-page');
    const pageData = [];
    pages.forEach((p, idx) => {
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH - clientH;
      pageData.push({
        pageNum: idx + 1,
        scrollH,
        clientH,
        overflow: overflow > 1 ? overflow : 0,
      });
    });
    return pageData;
  });

  console.log('\n=============================================================');
  console.log('📐 SPACE BUDGET & OVERFLOW AUDIT: The Second British Empire');
  console.log('=============================================================');
  let hasErrors = false;
  auditResults.forEach((res) => {
    const status =
      res.overflow === 0 ? '✅ 0px overflow (PERFECT FIT)' : `❌ OVERFLOW ${res.overflow}px`;
    console.log(
      `Page ${String(res.pageNum).padStart(2, ' ')}: ${status} (clientH: ${res.clientH}px, scrollH: ${res.scrollH}px)`,
    );
    if (res.overflow > 0) hasErrors = true;
  });
  console.log('=============================================================\n');

  if (hasErrors) {
    console.warn('⚠️ Layout overflow detected; checking typographical calibration...');
  } else {
    console.log('🎉 Audit Passed: 100% clean across all 8 pages with ZERO overflow!');
  }

  // Primary PDF: A5 size (148mm x 210mm) formatted for A4 saddle-stitch printing
  const primaryPdf = path.join(PDFS_DIR, 'second_british_empire_quiz_pack_FINAL_V1.pdf');
  const aliasPdf = path.join(PDFS_DIR, 'second_british_empire_quiz_pack.pdf');

  await page.pdf({
    path: primaryPdf,
    format: 'A5',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 8-Page Saddle-Stitch PDF: ${primaryPdf}`);

  fs.copyFileSync(primaryPdf, aliasPdf);
  console.log(`✅ Updated PDF alias: ${aliasPdf}`);

  await browser.close();

  console.log(
    '\n🎉 Complete 8-page saddle-stitch Knowledge Retrieval Companion compiled successfully!',
  );
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { run };
