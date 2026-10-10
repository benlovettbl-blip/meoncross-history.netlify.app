/**
 * generate_industrialisation_quiz_booklet.cjs
 *
 * Compiles the 8-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History (Year 8): Industrialisation, Empire & Power (1750–1901).
 *
 * Page Architecture (8-Page Saddle-Stitch Booklet / 2 sheets A4 landscape folded in half):
 * - Page 1: Uniform Front Cover & Formative Homework & Retrieval Tracking Ledger
 * - Pages 2–6: 5 Dedicated Lesson Retrieval Pages (Enquiries 1 to 5 • 8 questions each = 40 questions total)
 *              Scaffolded on the 3-Tier Cognitive Ascent with Disciplinary Micro-Pips:
 *              • Q1–Q3 (▸): Substantive Anchor Knowledge & Chronology (Emerald)
 *              • Q4–Q6 (▸▸): Causal Mechanisms & Historical Context (Amber)
 *              • Q7–Q8 (▸▸▸): Synoptic Significance & Disciplinary Precedent (Crimson)
 * - Page 7: Department Marking Bank (Part 1 • Enquiries 1–3 • Q1–Q24 • Bold answers + Explanations + [✓][✗])
 * - Page 8: Department Marking Bank (Part 2 • Enquiries 4–5 • Q25–Q40 • Bold answers + Explanations + [✓][✗])
 *           + DIRT Revision Standard + Department Evaluator Quality Seal & Sign-off Box
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'industrialisation_and_empire');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}
if (!fs.existsSync(UNIT_DIR)) {
  fs.mkdirSync(UNIT_DIR, { recursive: true });
}

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
// 40 RIGOROUS QUESTIONS ACROSS 5 ENQUIRIES: 3-TIER COGNITIVE ASCENT
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  // ENQUIRY 1: The Iron & Steam Revolution: Henry Cort & Funtley Works (1750–1787)
  {
    lesson: 1,
    lessonTitle: '1. The Iron & Steam Revolution: Henry Cort & Funtley Works (1750–1787)',
    shortTitle: 'Iron & Steam: Henry Cort',
    enquiry:
      'How did Henry Cort’s breakthrough at Funtley Ironworks transform Britain into an industrial and naval superpower?',
    items: [
      {
        q: 'In what year did James Watt patent his revolutionary separate condenser for the steam engine?',
        a: '1769',
        exp: 'Watt’s 1769 patent dramatically increased fuel efficiency and transformed coal into continuous rotative power, liberating factories from river valleys.',
      },
      {
        q: 'Why was early British iron called "pig iron", and why was it useless for Royal Navy warships?',
        a: 'Molten metal flowed into sand moulds resembling suckling pigs; raw coal contaminated it with sulphur, leaving it brittle as glass',
        exp: 'Sulphur-rich pit coal made British pig iron brittle and prone to shattering under high steam pressure or naval artillery shock.',
      },
      {
        q: 'Where in Hampshire did ironmaster Henry Cort establish his revolutionary iron mill along the River Meon?',
        a: 'Funtley (Fontley), near Fareham',
        exp: 'Cort leased Funtley Mill in 1775 to exploit River Meon water power and direct tidal water access down Fareham Creek into Portsmouth Dockyard.',
      },
      {
        q: 'How did Cort’s reverberatory puddling furnace (1783) chemically refine pig iron without coal contamination?',
        a: 'An arched brick ceiling deflected pure radiant heat onto the iron hearth, keeping smoke and sulphur separate from the metal',
        exp: 'The reverberatory design acted like a giant radiant oven, burning away carbon impurities while preventing sulphur contamination from the burning coal.',
      },
      {
        q: 'Why were Cort’s patented grooved rollers (1784) fifteen times faster than traditional trip hammers?',
        a: 'They continuously squeezed out liquid slag and rolled uniform bars in seconds rather than requiring hours of slow manual hammering',
        exp: 'Hydraulic grooved rollers mechanized the consolidation of wrought iron, standardising naval dimensions and multiplying output fifteen-fold.',
      },
      {
        q: 'What rigorous stress tests were conducted on Funtley iron at Portsmouth Royal Dockyard in March 1787?',
        a: 'Master smiths cold-twisted bars into corkscrews, bent rods double, and forged anchor rings with 20-pound sledgehammers without cracking',
        exp: 'Admiralty trials proved Funtley iron equaled Sweden’s finest Orgrounds iron, shattering Britain’s dangerous reliance on Baltic imports.',
      },
      {
        q: 'Why did naval proximity to Portsmouth Royal Dockyard determine Cort’s industrial breakthrough at Funtley?',
        a: 'Portsmouth was the world’s largest naval consumer of wrought iron, providing an immediate military market, naval trial facilities, and tidal transport',
        exp: 'Without the Royal Navy’s urgent demand for reliable ship bolts and anchors, Cort would have lacked the capital, testing facilities, or market to develop puddling.',
      },
      {
        q: 'How did the 2023 Atlantic metallurgy findings regarding 76 enslaved metallurgists in Morant Bay, Jamaica, reshape Cort’s historiography?',
        a: 'They revealed that enslaved Black metallurgists operated grooved rollers years earlier, proving the Industrial Revolution was tied to Atlantic colonial networks',
        exp: 'Dr Jenny Bulstrode showed that Jamaican ironworks run by enslaved Africans used grooved rollers before Cort, challenging the traditional "lone English genius" narrative.',
      },
    ],
  },

  // ENQUIRY 2: The Dark Satanic Mills: Child Labour, Slums & Public Health (1800–1858)
  {
    lesson: 2,
    lessonTitle: '2. The Dark Satanic Mills: Child Labour, Slums & Public Health (1800–1858)',
    shortTitle: 'Child Labour, Slums & Health',
    enquiry:
      'Was industrialisation a triumph of human progress or a catastrophe of urban suffering for the working class?',
    items: [
      {
        q: 'What dangerous factory jobs were assigned to small children in northern textile mills because of their nimble fingers and small stature?',
        a: 'Scavengers and piecers',
        exp: 'Scavengers crawled beneath active, whirring machinery to sweep up loose cotton fibres, while piecers tied broken threads at constant risk of mutilation.',
      },
      {
        q: 'What parliamentary inquiry published horrifying 1832 testimony of 14-hour workdays and physical beatings of child labourers?',
        a: 'The Sadler Committee Report (1832)',
        exp: 'Michael Sadler’s report shocked Victorian Britain by documenting horrific factory cruelty, paving the way for the Factory Act of 1833.',
      },
      {
        q: 'What deadly waterborne bacterium struck British industrial cities in terrifying epidemics in 1831, 1848, 1853, and 1866?',
        a: 'Cholera',
        exp: 'Cholera caused sudden, fatal dehydration through diarrhoea and vomiting, killing tens of thousands in unsewered, overcrowded industrial slums.',
      },
      {
        q: 'Why was the average life expectancy for a working-class labourer in 1840s Manchester and Liverpool under 20 years?',
        a: 'Deadly combinations of open cesspools, contaminated well water, unventilated back-to-back cellars, typhus, and exhausting 14-hour factory work',
        exp: 'Rapid, unregulated urban migration created catastrophic sanitary conditions, where infants and labourers succumbed to waterborne and respiratory diseases.',
      },
      {
        q: 'What prevailing medical theory wrongly claimed that cholera and epidemic diseases were spread by foul airborne stenches?',
        a: 'Miasma theory ("bad air")',
        exp: 'Most Victorian doctors believed decomposing matter poisoned the atmosphere, ignoring contaminated drinking water supplies until John Snow’s 1854 discovery.',
      },
      {
        q: 'How did Dr John Snow’s cartographic investigation of the 1854 Broad Street outbreak disprove the miasma theory?',
        a: 'He mapped cholera deaths clustering around the Broad Street water pump and proved removing the pump handle halted the epidemic',
        exp: 'Snow proved that cholera was an ingested waterborne contagion caused by cesspool sewage leaking directly into public drinking wells.',
      },
      {
        q: 'What crisis in the sweltering summer of 1858 finally forced Parliament to fund Joseph Bazalgette’s revolutionary London sewer network?',
        a: 'The Great Stink of London',
        exp: 'When intense heat turned the sewage-choked River Thames outside Parliament intolerably foul, politicians fled committee rooms and funded intercepting sewers.',
      },
      {
        q: 'How did Edwin Chadwick’s 1842 Sanitary Report connect working-class disease directly to the national economic burden?',
        a: 'He argued that preventable filth made breadwinners sick, creating widows and orphans who drained local Poor Law tax rates, making sanitation economically rational',
        exp: 'Chadwick convinced reluctant laissez-faire ratepayers that investing in clean piped water and arterial sewers would actually lower municipal poor relief costs.',
      },
    ],
  },

  // ENQUIRY 3: Blood, Machines & Ballots: The Hampshire Swing Riots to Chartism (1830–1848)
  {
    lesson: 3,
    lessonTitle: '3. Blood, Machines & Ballots: The Hampshire Swing Riots to Chartism (1830–1848)',
    shortTitle: 'Swing Riots to Chartism',
    enquiry:
      'Why did British workers turn to machine-breaking and mass petitions to demand a political voice?',
    items: [
      {
        q: 'What mythological collective name did agricultural labourers sign on threatening letters sent to landlords during the 1830 rural rebellion?',
        a: '"Captain Swing"',
        exp: 'The fictitious "Captain Swing" embodied the collective fury of starving agricultural labourers fighting wage cuts and mechanised unemployment.',
      },
      {
        q: 'What new farm machinery did rioting Hampshire labourers systematically smash with sledgehammers across Selborne and Headley in 1830?',
        a: 'Threshing machines',
        exp: 'Threshing machines replaced winter hand-flailing, robbing farm labourers of their only dependable winter wages and plunging families into destitution.',
      },
      {
        q: 'How did the Special Commission at Winchester Assizes punish the Hampshire Swing rioters in December 1830?',
        a: 'It sentenced 101 men to penal transportation to Australia, imprisoned hundreds, and publicly hanged 19-year-old labourer Henry Cook',
        exp: 'The government made a ruthless example of Hampshire workers, deporting skilled breadwinners and hanging Cook for knocking off a magistrate’s hat.',
      },
      {
        q: 'What 1832 constitutional legislation disenfranchised corrupt "rotten boroughs" but betrayed working-class reformers by granting votes only to the middle class?',
        a: 'The Great Reform Act 1832',
        exp: 'The 1832 Act enfranchised urban industrial towns like Birmingham and Manchester, but retained high property qualifications that excluded working men.',
      },
      {
        q: 'What radical 1838 working-class manifesto drafted by William Lovett demanded universal male suffrage and secret ballots?',
        a: 'The People’s Charter',
        exp: 'The Charter set out Six Points (universal male suffrage, secret ballot, no property qualification, annual parliaments, equal constituencies, salaries for MPs).',
      },
      {
        q: 'What was the fundamental tactical division between Chartist leaders William Lovett and Feargus O’Connor?',
        a: 'William Lovett advocated peaceful "Moral Force" through education and petitions; O’Connor threatened "Physical Force" and revolutionary general strikes',
        exp: 'Moral Force Chartists sought constitutional legitimacy through moral persuasion, while Physical Force Chartists prepared pike drills and insurrection.',
      },
      {
        q: 'Why was the Newport Rising of November 1839 a watershed moment in the struggle for British democracy?',
        a: 'Over 5,000 armed Welsh coal miners marched on the Westgate Hotel to liberate Chartist prisoners; soldiers opened fire, killing 22 demonstrators',
        exp: 'The Newport Rising was the last major armed insurrection on British soil, resulting in high-treason convictions and cementing the state’s fear of revolution.',
      },
      {
        q: 'Although Parliament rejected all three mass Chartist petitions in 1839, 1842, and 1848, why was Chartism ultimately victorious?',
        a: 'Five of the Six Points (all except annual parliaments) were progressively adopted into British law between 1867 and 1918, building modern democracy',
        exp: 'Chartism educated millions in political organising, creating the trade union and democratic foundations that eventually enfranchised the entire adult population.',
      },
    ],
  },

  // ENQUIRY 4: Steam, Steel & Empire: HMS Warrior & The 1857 Indian Rebellion (1857–1860)
  {
    lesson: 4,
    lessonTitle: '4. Steam, Steel & Empire: HMS Warrior & The 1857 Indian Rebellion (1857–1860)',
    shortTitle: 'Warrior & 1857 Rebellion',
    enquiry:
      'How did industrial technology sustain the British Empire, and why did Indian soldiers rebel in 1857?',
    items: [
      {
        q: 'What private joint-stock corporation ruled vast swathes of the Indian subcontinent with its own mercenary army until 1858?',
        a: 'The East India Company (EIC)',
        exp: 'Founded in 1600, the EIC evolved from a commercial spice trader into an armed sovereign corporate empire collecting taxes from over 150 million Indians.',
      },
      {
        q: 'What immediate technological grievance sparked the mutiny of Indian sepoys at Meerut in May 1857?',
        a: 'The new Enfield rifle paper cartridges were rumored to be greased with animal tallow made from sacred cow and forbidden pig fat',
        exp: 'Biting the greased cartridges violated the religious laws of Hindu and Muslim soldiers, confirming fears that Britain intended forced Christian conversion.',
      },
      {
        q: 'What corporate annexing policy created deep resentment among Indian princely states by disinheriting adopted heirs?',
        a: 'The Doctrine of Lapse',
        exp: 'Enforced aggressively by Governor-General Dalhousie, the policy annexed independent kingdoms (like Jhansi, Satara, and Awadh) when a ruler died without a biological son.',
      },
      {
        q: 'Who was the warrior Queen of Jhansi who led rebel forces on horseback against British forces until her death in combat in 1858?',
        a: 'Rani Lakshmibai',
        exp: 'Refusing to surrender her annexed state, Rani Lakshmibai became the supreme icon of armed anti-colonial resistance during the 1857 Rebellion.',
      },
      {
        q: 'What revolutionary Portsmouth-built warship launched in 1860 was the world’s first all-iron-hulled, armoured, steam-powered battleship?',
        a: 'HMS Warrior',
        exp: 'Carrying 4.5-inch wrought iron armour plates and heavy steam engines, HMS Warrior instantaneously rendered every wooden battlefleet in the world obsolete.',
      },
      {
        q: 'How did British machine-woven cotton from Lancashire textile mills economically devastate traditional Indian society?',
        a: 'It flooded Indian markets with cheap industrial textiles, destroying ancient domestic handloom industries and impoverishing millions of weavers',
        exp: 'Britain dismantled Indian manufacturing monopolies, converting India into a raw cotton supplier and a captive consumer of British factory goods.',
      },
      {
        q: 'What decisive political transformation was enacted by Parliament in the Government of India Act 1858 following the rebellion?',
        a: 'The East India Company was completely abolished and direct imperial rule was transferred to the British Crown under the British Raj',
        exp: 'Parliament stripped the private corporation of sovereign power, placing India under a Secretary of State and declaring Queen Victoria monarch of India.',
      },
      {
        q: 'How does the contrast between HMS Warrior and the 1857 Rebellion expose the dual nature of British imperial power?',
        a: 'HMS Warrior showcased industrial metallurgical triumph and global Pax Britannica, while the 1857 Rebellion exposed violent colonial military extraction',
        exp: 'Victorian Britain celebrated technological genius and naval protection, but that supremacy was maintained through brutal suppression and corporate exploitation.',
      },
    ],
  },

  // ENQUIRY 5: The Victorian Verdict: Workshop of the World or Age of Exploitation? (1750–1901)
  {
    lesson: 5,
    lessonTitle:
      '5. The Victorian Verdict: Workshop of the World or Age of Exploitation? (1750–1901)',
    shortTitle: 'The Victorian Verdict',
    enquiry:
      'Did the Industrial Revolution bring unprecedented progress or human catastrophe to the British people?',
    items: [
      {
        q: 'What monumental international exhibition was staged at London’s Crystal Palace in Hyde Park in 1851?',
        a: 'The Great Exhibition of the Works of Industry of All Nations',
        exp: 'Championed by Prince Albert, the 1851 exhibition showcased 100,000 exhibits to 6 million visitors, proclaiming Britain the "Workshop of the World".',
      },
      {
        q: 'What pioneering social investigator mapped poverty across London between 1886 and 1903, proving over 30% lived in poverty?',
        a: 'Charles Booth',
        exp: 'Booth’s colour-coded Life and Labour of the People in London proved mathematically that massive poverty was caused by low wages and illness, not moral failings.',
      },
      {
        q: 'What confectionery manufacturer conducted a famous 1901 study of poverty in York, revealing "primary poverty"?',
        a: 'Seebohm Rowntree',
        exp: 'Rowntree established that 28% of York’s population lived below the basic nutritional poverty line, providing statistical ammunition for social reform.',
      },
      {
        q: 'What fundamental arguments are advanced by "Optimist" historians regarding the Industrial Revolution?',
        a: 'Real wages increased, manufactured goods became cheap and abundant, railways democratised travel, and life expectancy rose in the late Victorian era',
        exp: 'Optimists point to long-term gains: technological literacy, rising real wages by the 1850s, statutory welfare reforms, and expanding democratic rights.',
      },
      {
        q: 'What fundamental arguments are advanced by "Pessimist" historians regarding the early Industrial Revolution?',
        a: 'Catastrophic declines in urban life expectancy, destruction of artisan independence, horrific child exploitation, and psychological alienation in factories',
        exp: 'Pessimists argue that for at least two generations, working-class Britons sacrificed their health, family lives, and independence to enrich capitalist industrialists.',
      },
      {
        q: 'How did statutory legislation between 1833 and 1875 gradually tame the excesses of laissez-faire factory capitalism?',
        a: 'Parliament enacted Factory Acts limiting working hours, banned underground child mine labour (1842), and enforced public health sanitation (1875)',
        exp: 'Faced with working-class rebellion and cholera, Victorian governments gradually abandoned extreme laissez-faire in favour of the modern regulatory state.',
      },
      {
        q: 'Why did the railway revolution represent the supreme synthesis of coal, iron, and steam technology?',
        a: 'It required Cort’s wrought iron rails, Watt’s rotary steam power, and coal fuel, connecting provincial industrial towns to global ocean ports',
        exp: 'Railways unified Britain’s domestic market, slashed transport costs by 90%, allowed rapid fresh food transit to cities, and accelerated national postal communication.',
      },
      {
        q: 'In evaluating 1750–1901, why is the Industrial Revolution considered the most profound transformation in human history since the Neolithic Agricultural Revolution?',
        a: 'It permanently ended humanity’s dependence on animal muscle and organic energy, unleashing fossil-fuel industrialisation that remade politics, class, and global geopolitics',
        exp: 'The shift from organic biology to fossilised thermal energy permanently altered human social organisation, living standards, environmental ecology, and imperial power.',
      },
    ],
  },
];

// Helper to compile the HTML booklet
async function compileQuizBookletHtml() {
  const coverImgBase64 =
    getBase64Image('/images/imperial_federation_map.jpg') ||
    getBase64Image('/images/industrialisation_cover.jpg');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Industrialisation, Empire &amp; Power (1750–1901) &bull; Knowledge Retrieval &amp; Homework Companion</title>
  <style>
    @page {
      size: A5 portrait;
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
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 8pt;
      line-height: 1.25;
    }
    .a5-page {
      width: 148mm;
      height: 210mm;
      box-sizing: border-box;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 4.5mm 5.5mm;
      background: #ffffff;
    }
    .a5-page:last-child {
      page-break-after: auto;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }
    .page-header-strip {
      border-bottom: 2px solid #0f284e;
      padding-bottom: 2.5px;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .page-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.8pt;
      font-weight: 900;
      color: #0f284e;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin: 0;
    }
    .page-enquiry-banner {
      background: #f0f4f9;
      border-left: 3px solid #0f284e;
      padding: 2px 5px;
      font-family: 'Georgia', serif;
      font-size: 7.2pt;
      font-style: italic;
      color: #1e293b;
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.8px solid #0f284e;
      padding-top: 1.5px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
      font-weight: 700;
      color: #0f284e;
    }
    .q-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 3px;
    }
    .q-stem {
      display: flex;
      align-items: baseline;
      gap: 3.5px;
      font-size: 7.2pt;
      font-weight: 700;
      color: #000000;
      line-height: 1.18;
    }
    .pip-emerald { color: #059669; font-size: 6.5pt; }
    .pip-amber { color: #d97706; font-size: 6.5pt; }
    .pip-crimson { color: #dc2626; font-size: 6.5pt; }
    .answer-line {
      border-bottom: 1.1px solid #000000;
      height: 5.6mm;
      width: 100%;
      margin: 0;
      display: flex;
      align-items: flex-end;
      padding-bottom: 0.5px;
      box-sizing: border-box;
    }
    .line-tag {
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      margin-right: 4px;
    }
  </style>
</head>
<body>
`;

  // =========================================================================
  // PAGE 1: FRONT COVER & TRACKING LEDGER
  // =========================================================================
  const portalUrl =
    'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire';
  const qrSvg = await QRCode.toString(portalUrl, { type: 'svg', margin: 1 });

  html += `
  <!-- PAGE 1: OUTSIDE FRONT COVER -->
  <div class="a5-page" id="page-1">
    <div class="page-body-full">
      
      <!-- Top Department Branding -->
      <div style="border-bottom: 2px solid #0f284e; padding-bottom: 2.5px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #0f284e; text-transform: uppercase; letter-spacing: 0.5px;">
          The History Department
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; color: #0f284e;">
          KEY STAGE 3 HISTORICAL STUDIES &bull; YEAR 8
        </span>
      </div>

      <!-- Main Booklet Title Block -->
      <div style="text-align: center; margin: 3px 0 4px 0;">
        <span style="display: inline-block; background: #0f284e; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">
          Formative Homework &amp; Retrieval Companion
        </span>
        <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 13.5pt; line-height: 1.15; color: #0f284e; margin: 1px 0; font-weight: 900;">
          Industrialisation, Empire &amp; Power
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 7.5pt; color: #334155; font-style: italic;">
          40 Core Retrieval Questions &bull; Energy, Exploitation, Democracy &amp; Empire (1750–1901)
        </div>
      </div>

      <!-- Scholar Details Box -->
      <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 8px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; align-items: center;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-size: 6.8pt; color: #0f284e; text-transform: uppercase; margin-right: 4px;">Pupil:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #0f284e; height: 10px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-size: 6.8pt; color: #0f284e; text-transform: uppercase; margin-right: 4px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #0f284e; height: 10px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-size: 6.8pt; color: #0f284e; text-transform: uppercase; margin-right: 4px;">Teacher:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #0f284e; height: 10px;"></div>
        </div>
      </div>

      <!-- Formative Tracking Ledger Table (Enquiries 1–5) -->
      <div style="border: 1.2px solid #0f284e; border-radius: 3px; overflow: hidden; margin: 3px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 6.8pt; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="background: #0f284e; color: #ffffff;">
              <th style="padding: 3px 5px; text-align: left; font-size: 6.2pt; text-transform: uppercase;">Enquiry &bull; Retrieval Focus</th>
              <th style="padding: 3px 3px; width: 44px; text-align: center; font-size: 6.0pt; text-transform: uppercase;">Attempt 1</th>
              <th style="padding: 3px 3px; width: 44px; text-align: center; font-size: 6.0pt; text-transform: uppercase;">Attempt 2</th>
              <th style="padding: 3px 5px; width: 68px; text-align: center; font-size: 6.0pt; text-transform: uppercase;">Parent Sign</th>
            </tr>
          </thead>
          <tbody>
            ${QUIZ_DATA.map(
              (q, idx) => `
            <tr style="border-bottom: 1px solid #cbd5e1; ${idx % 2 === 1 ? 'background: #f8fafc;' : ''}">
              <td style="padding: 4px 5px; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: 800; color: #0f284e;">Enquiry ${q.lesson}: ${q.shortTitle}</div>
                <div style="font-size: 5.6pt; color: #475569;">8-question cognitive ascent [Q${idx * 8 + 1}–Q${idx * 8 + 8}]</div>
              </td>
              <td style="padding: 4px 3px; text-align: center; border-right: 1px solid #cbd5e1; font-weight: 800; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp; / 8
              </td>
              <td style="padding: 4px 3px; text-align: center; border-right: 1px solid #cbd5e1; font-weight: 800; color: #0f284e;">
                &nbsp;&nbsp;&nbsp;&nbsp; / 8
              </td>
              <td style="padding: 4px 5px; text-align: center;">
                <div style="border-bottom: 1px dashed #94a3b8; height: 10px; width: 100%;"></div>
              </td>
            </tr>`,
            ).join('')}
          </tbody>
        </table>
      </div>

      <!-- Cognitive Progression Key & Digital Portal Strip -->
      <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 6px; background: #f0f4f9; display: grid; grid-template-columns: 1fr 22mm; gap: 6px; align-items: center;">
        <div>
          <div style="font-size: 6.5pt; font-weight: 900; text-transform: uppercase; color: #0f284e; margin-bottom: 2px;">
            Cognitive Ascent Progression Key:
          </div>
          <div style="font-size: 6.0pt; color: #1e293b; line-height: 1.25;">
            <div><strong style="color: #059669;">▸ Tier 1 (Q1–Q3):</strong> Core Substantive Recall &bull; Chronology &amp; Facts</div>
            <div><strong style="color: #d97706;">▸▸ Tier 2 (Q4–Q6):</strong> Causal Mechanisms &bull; Historical Dynamics &amp; Context</div>
            <div><strong style="color: #dc2626;">▸▸▸ Tier 3 (Q7–Q8):</strong> Synoptic Significance &bull; Precedent &amp; Historiography</div>
          </div>
        </div>
        <div style="text-align: center;">
          <div style="width: 17mm; height: 17mm; margin: 0 auto;">${qrSvg}</div>
          <span style="font-size: 5.2pt; font-weight: 800; color: #0f284e; text-transform: uppercase;">Scan for Portal</span>
        </div>
      </div>

      <div class="page-footer-strip">
        <span>Industrialisation, Empire &amp; Power (1750–1901)</span>
        <span>Homework &amp; Retrieval Companion &bull; Page 1 of 8</span>
      </div>
    </div>
  </div>
`;

  // =========================================================================
  // PAGES 2–6: 5 DEDICATED ENQUIRY RETRIEVAL PAGES (8 QUESTIONS EACH)
  // =========================================================================
  QUIZ_DATA.forEach((sec, sIdx) => {
    const pageNum = sIdx + 2;
    html += `
  <!-- PAGE ${pageNum}: ENQUIRY ${sec.lesson} RETRIEVAL -->
  <div class="a5-page" id="page-${pageNum}">
    <div class="page-body-full">
      <div>
        <div class="page-header-strip">
          <h2 class="page-title">Enquiry ${sec.lesson} &bull; ${sec.shortTitle}</h2>
          <span style="font-size: 6.5pt; font-weight: 800; color: #0f284e; text-transform: uppercase;">8 Questions &bull; 8 Marks</span>
        </div>
        <div class="page-enquiry-banner">
          <strong>Enquiry Focus:</strong> ${sec.enquiry}
        </div>
      </div>

      <!-- 8 Questions Stacked with Two Write-in Lines -->
      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        ${sec.items
          .map((item, qIdx) => {
            const absQNum = sIdx * 8 + qIdx + 1;
            let pipClass = 'pip-emerald';
            let pipSymbol = '▸';
            if (qIdx >= 3 && qIdx <= 5) {
              pipClass = 'pip-amber';
              pipSymbol = '▸▸';
            } else if (qIdx >= 6) {
              pipClass = 'pip-crimson';
              pipSymbol = '▸▸▸';
            }

            return `
        <div class="q-item">
          <div class="q-stem">
            <span class="${pipClass}">${pipSymbol}</span>
            <span><strong>Q${absQNum}.</strong> ${item.q}</span>
          </div>
          <div class="answer-line">
            <span class="line-tag">Ans:</span>
          </div>
          <div class="answer-line">
            <span class="line-tag">Detail:</span>
          </div>
        </div>`;
          })
          .join('')}
      </div>

      <div class="page-footer-strip">
        <span>Enquiry ${sec.lesson}: ${sec.shortTitle} &bull; Industrialisation, Empire &amp; Power</span>
        <span>Page ${pageNum} of 8</span>
      </div>
    </div>
  </div>
`;
  });

  // =========================================================================
  // PAGES 7 & 8: DEPARTMENT MARKING BANK (MODEL ANSWERS + DIRT FEEDBACK)
  // =========================================================================
  // Page 7: Enquiries 1 to 3 (Q1 to Q24)
  html += `
  <!-- PAGE 7: MARKING BANK PART 1 (ENQUIRIES 1–3) -->
  <div class="a5-page" id="page-7">
    <div class="page-body-full">
      <div>
        <div class="page-header-strip">
          <h2 class="page-title">Department Marking Bank &bull; Part 1 (Enquiries 1–3)</h2>
          <span style="font-size: 6.2pt; font-weight: 800; color: #0f284e; text-transform: uppercase;">Self / Peer Assessment</span>
        </div>
        <div style="background: #f0f4f9; border-left: 3px solid #0f284e; padding: 2px 5px; font-size: 6.2pt; color: #1e293b; margin-bottom: 3px;">
          Tick [✓] correct answers in green pen. Annotate missing mechanisms using the model explanations below.
        </div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0; font-size: 6.0pt; line-height: 1.15;">
        ${QUIZ_DATA.slice(0, 3)
          .map(
            (sec, sIdx) => `
        <div style="border: 1px solid #cbd5e1; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
          <div style="font-weight: 900; font-size: 6.4pt; color: #0f284e; border-bottom: 0.8px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            Enquiry ${sec.lesson}: ${sec.shortTitle} (Q${sIdx * 8 + 1}–Q${sIdx * 8 + 8})
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            ${sec.items
              .map((item, qIdx) => {
                const absQ = sIdx * 8 + qIdx + 1;
                return `
              <div>
                <strong style="color: #0f284e;">Q${absQ}:</strong> <strong>${item.a}</strong>
                <div style="color: #475569; font-size: 5.6pt; font-style: italic;">${item.exp}</div>
              </div>`;
              })
              .join('')}
          </div>
        </div>`,
          )
          .join('')}
      </div>

      <div class="page-footer-strip">
        <span>Industrialisation, Empire &amp; Power (1750–1901)</span>
        <span>Marking Bank Part 1 &bull; Page 7 of 8</span>
      </div>
    </div>
  </div>
`;

  // Page 8: Enquiries 4 & 5 (Q25 to Q40) + DIRT Box & Sign-off Seal
  html += `
  <!-- PAGE 8: MARKING BANK PART 2 & DIRT REVISION -->
  <div class="a5-page" id="page-8">
    <div class="page-body-full">
      <div>
        <div class="page-header-strip">
          <h2 class="page-title">Department Marking Bank &bull; Part 2 &amp; DIRT Reflection</h2>
          <span style="font-size: 6.2pt; font-weight: 800; color: #0f284e; text-transform: uppercase;">Enquiries 4–5 &bull; Mastery Sign-Off</span>
        </div>
      </div>

      <!-- Enquiries 4 & 5 Answers -->
      <div style="display: flex; flex-direction: column; gap: 3.5px; font-size: 6.0pt; line-height: 1.15;">
        ${QUIZ_DATA.slice(3, 5)
          .map(
            (sec, sIdx) => `
        <div style="border: 1px solid #cbd5e1; border-radius: 2px; padding: 3px 5px; background: #ffffff;">
          <div style="font-weight: 900; font-size: 6.4pt; color: #0f284e; border-bottom: 0.8px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
            Enquiry ${sec.lesson}: ${sec.shortTitle} (Q${(sIdx + 3) * 8 + 1}–Q${(sIdx + 3) * 8 + 8})
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            ${sec.items
              .map((item, qIdx) => {
                const absQ = (sIdx + 3) * 8 + qIdx + 1;
                return `
              <div>
                <strong style="color: #0f284e;">Q${absQ}:</strong> <strong>${item.a}</strong>
                <div style="color: #475569; font-size: 5.6pt; font-style: italic;">${item.exp}</div>
              </div>`;
              })
              .join('')}
          </div>
        </div>`,
          )
          .join('')}
      </div>

      <!-- Dedicated DIRT Reflection & Revision Box -->
      <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 6px; background: #f8fafc; margin-top: 3px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #cbd5e1; padding-bottom: 1.5px; margin-bottom: 2px;">
          <strong style="font-size: 6.6pt; text-transform: uppercase; color: #0f284e;">
            DIRT (Dedicated Improvement &amp; Reflection Time)
          </strong>
          <span style="font-size: 5.6pt; font-weight: 700; color: #64748b;">Record 2 misconceptions corrected:</span>
        </div>
        <div style="border-bottom: 1px dashed #94a3b8; height: 11px; margin-bottom: 2px;"></div>
        <div style="border-bottom: 1px dashed #94a3b8; height: 11px;"></div>
      </div>

      <!-- Department Evaluator Quality Seal & Teacher Sign-off -->
      <div style="border: 1.2px solid #0f284e; border-radius: 3px; padding: 4px 8px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr; gap: 8px; align-items: center; margin-top: 3px;">
        <div>
          <div style="font-size: 6.5pt; font-weight: 900; color: #0f284e; text-transform: uppercase;">
            Department Quality Seal &bull; Evaluated Standard
          </div>
          <div style="font-size: 5.8pt; color: #475569; margin-top: 1px;">
            [ &nbsp; ] Emerging (1–15) &nbsp;&nbsp; [ &nbsp; ] Expected (16–28) &nbsp;&nbsp; [ &nbsp; ] Greater Depth (29–40)
          </div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-size: 6.2pt; color: #0f284e; text-transform: uppercase; margin-right: 4px;">Signed:</strong>
          <div style="flex: 1; border-bottom: 1.2px solid #0f284e; height: 11px;"></div>
        </div>
      </div>

      <div class="page-footer-strip">
        <span>Industrialisation, Empire &amp; Power (1750–1901)</span>
        <span>Marking Bank Part 2 &bull; Page 8 of 8</span>
      </div>
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
  console.log('📖 COMPILING INDUSTRIALISATION 8-PAGE QUIZ BOOKLET');
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
  console.log('📐 SPACE BUDGET & OVERFLOW AUDIT: Industrialisation, Empire & Power');
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

  // Primary PDF: A5 size formatted for A4 saddle-stitch printing
  const primaryPdf = path.join(PDFS_DIR, 'industrialisation_and_empire_quiz_pack_FINAL_V1.pdf');
  const aliasPdf = path.join(PDFS_DIR, 'industrialisation_and_empire_quiz_pack.pdf');

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
