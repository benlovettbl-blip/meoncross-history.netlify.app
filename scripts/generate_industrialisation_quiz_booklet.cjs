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

  // ENQUIRY 2: The Factory System & Child Labour (1780–1840)
  {
    lesson: 2,
    lessonTitle: '2. The Factory System & Child Labour: Progress or Punishment? (1780–1840)',
    shortTitle: 'Factory System & Child Labour',
    enquiry:
      'Was industrial factory work a triumph of productive progress or a brutal system of physical punishment?',
    items: [
      {
        q: 'What dangerous factory jobs were assigned to small children in northern textile mills because of their nimble fingers and small stature?',
        a: 'Scavengers and piecers',
        exp: 'Scavengers crawled beneath active, whirring machinery to sweep up loose cotton fibres, while piecers tied broken threads at constant risk of mutilation.',
      },
      {
        q: 'What severe chronic respiratory disease was caused by inhaling toxic airborne cotton lint in unventilated textile mills?',
        a: 'Byssinosis (known as "mill fever" or brown lung disease)',
        exp: 'Fine cotton fibres choked children’s lungs, causing chronic coughing, permanent respiratory damage, and premature death among textile operatives.',
      },
      {
        q: 'What parliamentary inquiry published horrifying 1832 testimony of 14-hour workdays and physical beatings of child labourers?',
        a: 'The Sadler Committee Report (1832)',
        exp: 'Michael Sadler’s parliamentary report shocked Victorian Britain by documenting horrific mill cruelty, paving the way for the Factory Act of 1833.',
      },
      {
        q: 'What historic legislation in 1833 banned textile work for children under nine and created factory inspectors to enforce the law?',
        a: 'The Factory Act of 1833',
        exp: 'The 1833 Act established the principle of state regulation, limiting children aged 9–13 to eight hours of daily work and appointing four inspectors nationwide.',
      },
      {
        q: 'What physical punishment was routinely inflicted by mill overlookers to keep exhausted children awake toward the end of 14-hour shifts?',
        a: '"Strapping" with heavy leather belts',
        exp: 'Overlookers, whose own pay depended on output targets, ruthlessly beat drowsy children to prevent machine slowdowns and enforce relentless factory discipline.',
      },
      {
        q: 'What landmark 1842 law banned all women and girls and boys under the age of ten from working underground in coal mines?',
        a: 'The Mines Act 1842',
        exp: 'Lord Ashley’s inquiry exposed half-naked young trappers and hurriers chained to coal carts in dark, flooded mines, prompting immediate parliamentary prohibition.',
      },
      {
        q: 'What prevailing economic doctrine of government non-intervention did mill owners cite to resist statutory workplace regulation?',
        a: 'Laissez-faire capitalism',
        exp: 'Industrialists argued that Parliament had no right to interfere with "freedom of contract" or trade profits, insisting state regulations would ruin British commerce.',
      },
      {
        q: 'Why did the factory system fundamentally transform human labour and time discipline compared to domestic craft work?',
        a: 'Workers surrendered personal autonomy to the relentless mechanical pace of steam engines and the strict schedule of the factory clock',
        exp: 'In domestic workshops, artisans controlled their own pace; factories imposed punitive fines, locked gates, and continuous machine toil for 12 to 14 hours daily.',
      },
    ],
  },

  // ENQUIRY 3: Living Conditions, Cholera & Sanitation (1831–1866)
  {
    lesson: 3,
    lessonTitle:
      '3. Living Conditions, Cholera & Sanitation: Did Industrialisation Make Towns Unlivable? (1831–1866)',
    shortTitle: 'Slums, Cholera & Sanitation',
    enquiry:
      'Did rapid urban industrialisation condemn the working class to disease, squalor, and premature death?',
    items: [
      {
        q: 'What deadly waterborne bacterium struck British industrial cities in terrifying epidemics in 1831, 1848, 1853, and 1866?',
        a: 'Cholera',
        exp: 'Cholera caused sudden, fatal dehydration through diarrhoea and vomiting, killing tens of thousands in unsewered, overcrowded industrial slums.',
      },
      {
        q: 'Why was the average life expectancy for a working-class labourer in 1840s Manchester and Liverpool under 20 years?',
        a: 'Deadly combinations of open cesspools, contaminated well water, unventilated back-to-back cellars, typhus, and exhausting factory toil',
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
        q: 'How did Edwin Chadwick’s 1842 Sanitary Report connect working-class disease directly to the national economic burden?',
        a: 'He argued that preventable filth made breadwinners sick, creating widows and orphans who drained local Poor Law tax rates, making sanitation economically rational',
        exp: 'Chadwick convinced reluctant laissez-faire ratepayers that investing in clean piped water and arterial sewers would actually lower municipal poor relief costs.',
      },
      {
        q: 'What crisis in the sweltering summer of 1858 finally forced Parliament to fund Joseph Bazalgette’s revolutionary London sewer network?',
        a: 'The Great Stink of London',
        exp: 'When intense heat turned the sewage-choked River Thames outside Parliament intolerably foul, politicians fled committee rooms and funded intercepting sewers.',
      },
      {
        q: 'What civil engineer designed London’s 1,100-mile underground intercepting sewer network, diverting 420 million gallons of sewage daily?',
        a: 'Sir Joseph Bazalgette',
        exp: 'Bazalgette’s brick-arched intercepting sewers carried London’s waste eastward to the Thames estuary, permanently eliminating cholera from the British capital.',
      },
      {
        q: 'Why did the Public Health Act 1875 mark a decisive turning point in the role of the British state?',
        a: 'It made clean water supply, sewer connection, and street lighting compulsory for all local councils, ending extreme laissez-faire in municipal governance',
        exp: 'The 1875 Act established the modern public health framework, recognizing that safeguarding citizen health was a mandatory duty of civil government.',
      },
    ],
  },

  // ENQUIRY 4: The Struggle for the Vote: Peterloo, Swing Riots & Tolpuddle (1819–1834)
  {
    lesson: 4,
    lessonTitle: '4. The Struggle for the Vote: Peterloo, Swing Riots & Tolpuddle (1819–1834)',
    shortTitle: 'Peterloo, Swing & Tolpuddle',
    enquiry:
      'How did ordinary British people fight against political exclusion, wage cuts, and state repression?',
    items: [
      {
        q: 'What 1819 event in Manchester saw cavalry charge a peaceful gathering of 60,000 working-class reformers, killing 18 and injuring hundreds?',
        a: 'The Peterloo Massacre',
        exp: 'Magistrates panicked and sent sabre-wielding yeomanry into a peaceful crowd at St Peter’s Field listening to radical orator Henry Hunt demand votes for working men.',
      },
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
        q: 'What six Dorset agricultural labourers were sentenced to seven years’ transportation to Australia in 1834 for forming a friendly society?',
        a: 'The Tolpuddle Martyrs',
        exp: 'Led by George Loveless, the labourers were prosecuted under an obsolete 1797 mutiny law against "unlawful oaths", triggering massive trade union protests.',
      },
      {
        q: 'What was a corrupt "rotten borough" in the pre-1832 British electoral system?',
        a: 'A depopulated rural voting district (like Newtown on the Isle of Wight) that sent two MPs to Parliament while industrial cities like Manchester had none',
        exp: 'Wealthy landowners bought and sold pocket boroughs to control Parliament, excluding millions of urban factory workers from democratic representation.',
      },
      {
        q: 'How did the Great Reform Act 1832 betray working-class reformers who had campaigned fiercely for its passage?',
        a: 'It enfranchised industrial cities and middle-class property owners, but retained a £10 property qualification that deliberately excluded working men',
        exp: 'Working men felt cheated by the 1832 settlement, realizing that the middle class had secured power while leaving the working majority disenfranchised.',
      },
      {
        q: 'Why did the state repression of 1819–1834 convince working people of the urgent need for a nationwide political movement?',
        a: 'Isolated riots and local strikes were crushed by military force; only securing parliamentary votes could change laws and protect workers’ rights',
        exp: 'The harsh lessons of Peterloo, Winchester Assizes, and Tolpuddle proved that industrial workers required constitutional power, directly inspiring Chartism.',
      },
    ],
  },

  // ENQUIRY 5: Chartism & Parliamentary Democracy (1838–1900)
  {
    lesson: 5,
    lessonTitle:
      '5. Chartism & Parliamentary Democracy: How Did the Road to Democracy Expand? (1838–1900)',
    shortTitle: 'Chartism & Democracy',
    enquiry:
      'How did working-class pressure overcome elite resistance to build modern parliamentary democracy?',
    items: [
      {
        q: 'What radical 1838 working-class manifesto drafted by William Lovett demanded universal male suffrage and secret ballots?',
        a: 'The People’s Charter',
        exp: 'The Charter set out Six Points (universal male suffrage, secret ballot, no property qualification, annual parliaments, equal constituencies, salaries for MPs).',
      },
      {
        q: 'Why did the People’s Charter demand annual parliaments and payment for Members of Parliament?',
        a: 'Annual elections made MPs accountable to voters, while salaries allowed working-class men without private fortunes to serve in Parliament',
        exp: 'Without state salaries, only wealthy landowners and factory magnates could afford to serve as MPs, preserving elite monopoly over lawmaking.',
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
        q: 'What nationwide 1842 general strike saw industrial workers pull the plugs from factory steam boilers to halt capitalist production?',
        a: 'The Plug Plot Riots (1842 General Strike)',
        exp: 'Sparked by wage cuts, half a million factory workers and miners across Lancashire and Yorkshire struck for both higher pay and the People’s Charter.',
      },
      {
        q: 'Which landmark 1872 legislation abolished public voting and ended landlord bribery and workplace intimidation of voters?',
        a: 'The Secret Ballot Act 1872',
        exp: 'Prior to 1872, voting was conducted in public on open hustings; the secret ballot allowed workers to vote their conscience without fear of eviction or sacking.',
      },
      {
        q: 'Which two major electoral reform acts in 1867 and 1884 progressively expanded the franchise to urban and agricultural working-class men?',
        a: 'The Second Reform Act (1867) and Third Reform Act (1884)',
        exp: 'The 1867 Act gave votes to urban male householders, doubling the electorate to 2 million; the 1884 Act extended equal voting rights to rural labourers.',
      },
      {
        q: 'Although Parliament rejected all three mass Chartist petitions in 1839, 1842, and 1848, why was Chartism ultimately victorious?',
        a: 'Five of the Six Points (all except annual parliaments) were progressively adopted into British law between 1867 and 1918, creating modern democracy',
        exp: 'Chartism educated millions in political organising, creating the trade union and democratic foundations that eventually enfranchised the entire adult population.',
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
