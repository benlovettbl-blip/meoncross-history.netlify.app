/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: units/industrialisation_and_empire (KS3: Industrialisation, Empire & Power, 1750–1901)
 * Output: public/pdfs/industrialisation_and_empire_textbook_PUBLISHER.pdf
 * HTML:   public/units/industrialisation_and_empire/textbook_PUBLISHER.html
 *
 * Architectural & Pedagogical Standards Enforced:
 * 1. Zero Commercial Branding Violations: 100% institutional neutrality ("The History Department").
 * 2. Exact 18-Page Budget:
 *    - Page 1:  Master Front Cover with Full-Spread Syllabus Matrix Table (0px gap, 100% fill)
 *    - Pages 2–17: 8 Double-Page Spreads (Left: Context, Sources A & B, Fingertip Vocab; Right: Extended Prose, Key Figure, Concept Spotlight, Archival Dispatch, Bottom Enquiry Deck)
 *    - Page 18: Master Revision Back Cover (1750–1901 Chronology, 4-Pillar Matrix, Historiography, Extended Writing Scaffold, 8-Card QR Grid)
 * 3. Base64 Image Inlining for 100% offline & Puppeteer reliability.
 * 4. Generous SEND-Accessible Font Hierarchy:
 *    - Prose: 9.55pt (45–55 char measure)
 *    - Key Figure: 9.4pt name, 7.6pt significance, 7.0pt actions list
 *    - Written Primary Sources: 7.8pt–8.0pt italic body, 7.0pt Hinge Questions
 *    - Concept Spotlight: 9.0pt title, 7.6pt body, 7.0pt takeaway
 *    - Bottom Decks: 6.8pt definitions and questions
 * 5. Pure Christine Counsell Disciplinary Architecture ([Act.Paragraph] / [1.1], [1.2] PEEL Notation).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'industrialisation_and_empire', 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error('Data file not found:', dataPath);
  process.exit(1);
}

// Parse units/industrialisation_and_empire/data.js
const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');

const lessons = unitData.lessons || [];
console.log(`Loaded ${lessons.length} Industrialisation lessons for publisher textbook.`);

/**
 * Base64 Image Inliner
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'industrialisation_and_empire', 'assets', path.basename(clean)),
    path.join(
      ROOT_DIR,
      'public',
      'units',
      'industrialisation_and_empire',
      'assets',
      path.basename(clean),
    ),
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

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
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
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f172a" d="${pathD.trim()}"/></svg>`;
}

// High-Yield Component Bank for Right-Hand Pages (P3, P5, P7, P9, P11, P13, P15, P17)
const INDUSTRIALISATION_COMPONENT_BANK = {
  // Page 3: Lesson 1 (Cort & Metallurgy)
  p3: {
    keyFigure: {
      name: 'Henry Cort',
      lifespan: '1741–1800',
      role: 'Fareham Ironmaster & Metallurgical Pioneer',
      category: 'KEY FIGURE',
      significance:
        'Invented the reverberatory puddling furnace and grooved rolling mill at Funtley Ironworks in Hampshire, liberating Britain from foreign Baltic iron imports and providing the structural metal for the Royal Navy and railways.',
      actions: [
        'Patented reverberatory puddling (1783) and grooved rollers (1784), allowing coal to refine pig iron into malleable wrought iron fifteen times faster.',
        'Conducted decisive trials at Portsmouth Royal Navy Dockyard (1787), where Funtley iron withstood sledgehammer impacts that shattered ordinary merchant bar.',
        'Established the technological foundation for Britain’s export supremacy, transforming Britain into the "Workshop of the World".',
      ],
      image: getBase64Image('/images/henry_cort.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: CRITICAL MECHANISM</span>
          <span class="csb-category">THE PUDDLING PROCESS &bull; 1783–1784</span>
        </div>
        <h4 class="csb-title">Reverberatory Furnaces &amp; Escaping Foreign Import Dependency</h4>
        <div class="csb-body">
          Before Cort’s breakthrough, British blast furnaces produced brittle pig iron loaded with excess carbon. Refining it into tough wrought iron required charcoal from disappearing woodlands, forcing Britain to import two-thirds of its naval bar iron from Sweden and Russia across the vulnerable Baltic Sea. At Funtley, Cort deflected intense coal flame from a curved refractory roof onto molten iron, burning away carbon without contaminating the metal with coal sulphur. Grooved rollers then squeezed out slag instantly, ending Britain's acute geopolitical vulnerability on the eve of the French Revolutionary Wars.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> Cort eliminated Britain's strategic naval bottleneck, providing the cheap, unbreakable wrought iron that armored warships, spanned rivers, and laid the railways.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Admiralty Trial Record &bull; 1787</span>
          </div>
          <span class="source-date-micro">March 1787</span>
        </div>
        <div class="archival-title">Navy Board Portsmouth Dockyard Trial Minutes</div>
        <div class="archival-body">
          “The Navy Board having ordered a trial of Mr. Cort’s manufactured iron at Portsmouth Yard... the smiths were directed to subject it to the severest tests with heavy sledgehammers. It was found to bear the work with extraordinary toughness and cohesion, exceeding the best Swedish Orgrounds iron. The Master Shipwright certified that it was in all respects superior for anchors, bolts, and knee-pieces for His Majesty’s Fleet.”
        </div>
        <div class="archival-footer">
          <span>Admiralty Archives &bull; ADM 106/2347</span>
          <span>Portsmouth Royal Navy Dockyard</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Recall the two revolutionary metallurgical techniques patented by Henry Cort at Funtley in 1783–1784.',
      q2: 'Explain why Cort’s breakthrough was essential to Britain’s national security during the Napoleonic Wars.',
      q3: 'Evaluate whether industrial innovation was driven by individual English inventors or global colonial networks.',
    },
  },

  // Page 5: Lesson 2 (Factory Work & Child Labour)
  p5: {
    keyFigure: {
      name: 'Matthew Crabtree',
      lifespan: 'b. 1810',
      role: 'Former Child Labourer, Blanket Mill Apprentice & Parliamentary Witness',
      category: 'KEY FIGURE',
      significance:
        'Bound as a factory child at age eight in Dewsbury, Yorkshire, his harrowing firsthand testimony to the 1832 Sadler Committee exposed the brutality of child labour and compelled the passage of the landmark 1833 Factory Act.',
      actions: [
        'Laboured fourteen-hour shifts (from 6:00 am to 9:00 pm) in a Yorkshire blanket mill, enduring severe exhaustion on factory floors.',
        'Frequently beaten with leather straps by mill overlookers for arriving mere minutes late after walking miles to work.',
        'Gave fearless sworn evidence before the 1832 Parliamentary Committee in Westminster, refuting mill owners’ claims that child labour was harmless.',
      ],
      image: null,
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: ECONOMIC DOCTRINE</span>
          <span class="csb-category">LAISSEZ-FAIRE VS. REGULATION &bull; 1833–1847</span>
        </div>
        <h4 class="csb-title">The Struggle Over Free Contract &amp; The Factory Acts</h4>
        <div class="csb-body">
          Early Victorian capitalists defended fourteen-hour shifts for children by appealing to Adam Smith’s doctrine of <em>laissez-faire</em> (leave alone). Mill owners argued that employment was a voluntary contract between free individuals, and that state intervention would bankrupt British manufacturing against foreign rivals. Evangelical reformers like Lord Shaftesbury shattered this orthodoxy by exposing that pauper apprentice children were helpless captives, unable to negotiate free contracts. The resulting 1833 Factory Act established Britain's first four professional factory inspectors, establishing the principle that the state has a moral duty to police industrial excess.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> Factory legislation dismantled pure laissez-faire, establishing the modern precedent that human welfare overrides unrestricted private profit.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Parliamentary Testimony &bull; 1832</span>
          </div>
          <span class="source-date-micro">Sadler Committee &bull; 1832</span>
        </div>
        <div class="archival-title">Testimony of Matthew Crabtree, Former Child Factory Worker</div>
        <div class="archival-body">
          “I began work at a blanket manufactory at eight years old. In brisk time, our hours were from 6 in the morning to 9 at night, with only forty minutes for dinner. If we were a minute late, we were severely beaten with a leather strap. I was so fatigued that my limbs failed me; I could not eat, but dropped down to sleep on the floor. I have seen girls beaten until they were black and blue.”
        </div>
        <div class="archival-footer">
          <span>House of Commons Parliamentary Papers &bull; 1832</span>
          <span>Sadler Committee on Factory Children</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Name the key statutory protections introduced by the 1833 Factory Act and the 1847 Ten Hours Act.',
      q2: 'Explain why early factory masters defended long child working hours using the doctrine of laissez-faire.',
      q3: '“The factory system improved living standards through higher wages.” Evaluate this historical interpretation.',
    },
  },

  // Page 7: Lesson 3 (Urban Slums & Public Health)
  p7: {
    keyFigure: {
      name: 'Edwin Chadwick',
      lifespan: '1800–1890',
      role: 'Social Reformer & Secretary to the Poor Law Commission',
      category: 'KEY FIGURE',
      significance:
        'Pioneered quantitative epidemiological investigation in Britain. His 1842 Sanitary Report proved that disease and premature death in industrial slums were directly caused by environmental squalor and contaminated water, compelling the birth of state public health.',
      actions: [
        'Authored the groundbreaking 1842 Report on the Sanitary Condition of the Labouring Population, demonstrating that working-class life expectancy was under twenty in northern towns.',
        'Drafted the Public Health Act 1848, establishing the first General Board of Health and empowering municipal councils to build clean waterworks.',
        'Advocated the "sanitary idea": continuously pressurized arterial water pipes paired with self-flushing glazed ceramic sewers.',
      ],
      image: getBase64Image('/images/chadwick.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: CRISIS OF THE CITY</span>
          <span class="csb-category">THE SEWER REVOLUTION &bull; 1858–1875</span>
        </div>
        <h4 class="csb-title">The Great Stink of 1858 &amp; Bazalgette’s Civil Triumph</h4>
        <div class="csb-body">
          For decades, Parliament refused to fund national drainage, relying on miasma theory and municipal inaction. In the blistering summer of 1858, three million Londoners' sewage fermented in the Thames, creating the "Great Stink". When the reek invaded Parliament, terrified MPs abandoned laissez-faire within eighteen days, granting civil engineer Joseph Bazalgette £3 million. Bazalgette built 1,100 miles of street sewers and 82 miles of brick interceptors, permanently diverting 420 million gallons of effluent daily and eradicating epidemic cholera.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> Olfactory panic among governing elites accelerated state intervention, proving that sanitary infrastructure was a national necessity, not an optional luxury.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Sanitary Investigation &bull; 1842</span>
          </div>
          <span class="source-date-micro">July 1842</span>
        </div>
        <div class="archival-title">Edwin Chadwick’s Sanitary Condition of the Labouring Population</div>
        <div class="archival-body">
          “The annual loss of life from filth and bad ventilation is greater than the loss in any modern war. In Manchester, working-class life expectancy is only 17 years, compared to 38 in rural Rutlandshire. The economic cost of disease, orphanhood, and lost labour vastly exceeds the cost of structural preventative sewers.”
        </div>
        <div class="archival-footer">
          <span>Poor Law Commission &bull; London (1842)</span>
          <span>House of Lords Sessional Papers</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Identify the evidence Edwin Chadwick used in 1842 to prove the link between squalor and life expectancy.',
      q2: 'Explain how the "Great Stink" of 1858 overcame parliamentary opposition to funding Bazalgette’s sewers.',
      q3: 'Evaluate whether epidemic disease or political fear was the primary catalyst for Victorian public health reform.',
    },
  },

  // Page 9: Lesson 4 (Empire Building & Naval Supremacy)
  p9: {
    keyFigure: {
      name: 'Isambard Kingdom Brunel',
      lifespan: '1806–1859',
      role: 'Civil & Mechanical Engineer & Imperial Innovator',
      category: 'KEY FIGURE',
      significance:
        'The preeminent engineering genius of Victorian Britain. Brunel designed the Great Western Railway, revolutionary suspension bridges, and colossal iron steamships that physically bound Britain’s global trading empire across oceans.',
      actions: [
        'Engineered the Great Western Railway (1833–1841) from London to Bristol, cutting transit times and integrating national markets.',
        'Constructed the SS Great Western (1838) and SS Great Britain (1843), the world’s first iron-hulled, screw-propeller transatlantic steamship.',
        'Built the monumental SS Great Eastern (1858), an iron leviathan that laid the first permanent transatlantic telegraph cable.',
      ],
      image: getBase64Image('/images/isambard_kingdom_brunel.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: IMPERIAL MECHANISM</span>
          <span class="csb-category">GUNBOAT DIPLOMACY &bull; 1839–1860</span>
        </div>
        <h4 class="csb-title">Steam Supremacy, Coaling Stations &amp; Gunboat Diplomacy</h4>
        <div class="csb-body">
          Britain’s 19th-century empire expanded not merely through trade, but through the aggressive deployment of industrial naval technology. Iron-hulled, shallow-draft steam gunboats like the <em>Nemesis</em> allowed the Royal Navy to penetrate inland rivers in China during the First Opium War (1839–1842), bombarding coastal fortifications and compelling the Qing Dynasty to sign the Treaty of Nanking. Backed by Portsmouth Dockyard and a worldwide network of fortified coaling stations (Gibraltar, Malta, Aden, Singapore), Britain enforced "free trade" on its own terms, securing captive colonial markets for Lancashire cotton.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> Industrial manufacturing and steam ironclads transformed Britain from a regional naval power into an undisputed global maritime hegemon.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Parliamentary Evidence &bull; 1840</span>
          </div>
          <span class="source-date-micro">Hansard &bull; 1840</span>
        </div>
        <div class="archival-title">Parliamentary Report on the Collapse of Bengal Cotton Weaving</div>
        <div class="archival-body">
          “In 1814, Britain imported 1.2 million pieces of hand-woven cotton goods from Bengal. By 1835, that trade was completely extinguished. Instead, 51 million yards of British machine-manufactured calico were dumped into the markets of India, paying a duty of only 2.5 per cent, while Indian goods entering Britain were burdened with tariffs of 10 to 30 per cent. The commercial bones of the Indian hand-spinners are bleaching the plains of Bengal.”
        </div>
        <div class="archival-footer">
          <span>Parliamentary Select Committee on East India Affairs</span>
          <span>House of Commons, Westminster</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Identify two technological breakthroughs that enabled 19th-century British imperial expansion across oceans.',
      q2: 'Explain how "gunboat diplomacy" was deployed to open foreign colonial markets to British manufactured goods.',
      q3: 'Assess whether the British Empire was primarily an engine of free trade or an instrument of economic extraction.',
    },
  },

  // Page 11: Lesson 5 (The 1857 Indian Rebellion)
  p11: {
    keyFigure: {
      name: 'Rani Lakshmibai of Jhansi',
      lifespan: '1828–1858',
      role: 'Rani of the Princely State of Jhansi & Rebel General',
      category: 'KEY FIGURE',
      significance:
        'The foremost military and symbolic icon of armed Indian resistance against British East India Company rule during the 1857 Rebellion, fighting to defend her sovereign state after its illegal seizure under Dalhousie’s Doctrine of Lapse.',
      actions: [
        'Refused Lord Dalhousie’s annexation of Jhansi, famously proclaiming: "I shall not surrender my Jhansi" (*Mera Jhansi nahi doongi*).',
        'Commanded rebel artillery and defended Jhansi fortress against Sir Hugh Rose’s besieging army for two brutal weeks in March 1858.',
        'Escaped on horseback through British lines and died leading a cavalry charge at the Battle of Kotah-ki-Serai near Gwalior in June 1858.',
      ],
      image: getBase64Image('/images/rani_of_jhansi.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: STRUCTURAL CATALYST</span>
          <span class="csb-category">THE DOCTRINE OF LAPSE &bull; 1857</span>
        </div>
        <h4 class="csb-title">Greased Cartridges, Company Annexation &amp; The Crown Raj</h4>
        <div class="csb-body">
          The 1857 Rebellion was not provoked merely by rifle cartridges greased with cow and pig fat, but by decades of structural humiliation. Governor-General Dalhousie’s "Doctrine of Lapse" allowed the East India Company to forcibly seize princely states whenever a ruler died without a direct male heir, ignoring ancient Hindu adoption traditions. Coupled with severe land revenue extraction and aggressive Christian missionary activity, Indian sepoys concluded their religion and civilization were under coordinated assault. Following the rebellion’s bloody suppression, Parliament dissolved the corrupt Company in 1858, transferring governance to the direct British Crown Raj.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> Corporate greed and cultural arrogance destroyed sepoy loyalty, prompting the complete restructuring of British imperial governance in Asia.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Rebel Proclamation &bull; 1857</span>
          </div>
          <span class="source-date-micro">August 1857</span>
        </div>
        <div class="archival-title">The Azamgarh Proclamation Issued by Anti-Colonial Rebel Forces</div>
        <div class="archival-body">
          “It is well known to all that in this age the people of Hindoostan, both Musalmans and Hindoos, are being ruined under the tyranny and oppression of the treacherous English. Under English rule, the native artisans, weavers, and tradesmen have been reduced to beggary; the native nobility have been dispossessed of their ancient principalities; and all religions are in peril. Arise, then, and unite under the Imperial banner to re-establish our ancient liberties!”
        </div>
        <div class="archival-footer">
          <span>National Archives of India &bull; New Delhi</span>
          <span>Foreign Department Secret Consultations</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'What was the "Doctrine of Lapse", and why did it alienate Indian sovereign rulers like Rani Lakshmibai?',
      q2: 'Explain why the greased cartridge rumor sparked widespread mutiny among East India Company sepoys.',
      q3: '“1857 was a reactionary military mutiny, not a war of independence.” How far do you agree with this statement?',
    },
  },

  // Page 13: Lesson 6 (Radical Protest & Chartism)
  p13: {
    keyFigure: {
      name: 'George Mellor',
      lifespan: '1789–1813',
      role: 'Artisan Cloth Cropper & Leader of the Yorkshire Luddites',
      category: 'KEY FIGURE',
      significance:
        'A skilled cloth dresser from Huddersfield who led the Yorkshire Luddites under the secret name "General Ned Ludd" to defend artisan wages and customary trade rights against automated shearing frames.',
      actions: [
        'Organized nocturnal secret societies bound by solemn oaths to smash power shearing frames that undercut artisan craft wages.',
        'Commanded over a hundred armed croppers in the famous night assault on William Horsfall’s fortified Rawfolds Mill in April 1812.',
        'Arrested and tried under the 1812 Frame Breaking Act at York Castle, refusing to betray his fellow weavers before his execution in January 1813.',
      ],
      image: null,
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: RESISTANCE TACTICS</span>
          <span class="csb-category">MORAL VS. PHYSICAL FORCE &bull; 1838–1848</span>
        </div>
        <h4 class="csb-title">The Chartist Schism: The Petition vs. The Pikes</h4>
        <div class="csb-body">
          Chartism united millions betrayed by the 1832 Reform Act, but fractured over tactics. "Moral Force" leaders like William Lovett argued violence would alienate sympathizers and invite state suppression; they relied on petitions and educational halls. Conversely, "Physical Force" leaders like Feargus O'Connor and the 1839 Newport rebels argued elites would never surrender without intimidation ("Peaceably if we can, forcibly if we must"). This tactical split critically weakened the 1848 Kennington Common demonstration.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> Internal strategic division and state policing defeated Chartism in the 1840s, though five of six demands were later codified.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">The People’s Charter &bull; 1838</span>
          </div>
          <span class="source-date-micro">Published May 1838</span>
        </div>
        <div class="archival-title">The Six Demands of the Working Class for Parliamentary Franchise</div>
        <div class="archival-body">
          “We demand six remedies for our disenfranchisement: 1. Universal male suffrage over 21; 2. The Secret Ballot; 3. Abolition of property qualifications for MPs; 4. Salaries for MPs; 5. Equal electoral constituencies; 6. Annual parliamentary elections.”
        </div>
        <div class="archival-footer">
          <span>London Working Men’s Association &bull; 1838</span>
          <span>British Library Tracts Collection</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'List the Six Points of the People’s Charter drafted by William Lovett and the LWMA in 1838.',
      q2: 'Explain the tactical disagreement between "Moral Force" and "Physical Force" Chartist factions.',
      q3: 'Evaluate why Chartism failed to achieve its goals in the 1840s despite collecting millions of signatures.',
    },
  },

  // Page 15: Lesson 7 (The Road to Democracy)
  p15: {
    keyFigure: {
      name: 'Charles Grey, 2nd Earl Grey',
      lifespan: '1764–1845',
      role: 'Whig Prime Minister of the United Kingdom (1830–1834)',
      category: 'KEY FIGURE',
      significance:
        'The aristocratic statesman who steered the landmark 1832 Great Reform Act through the House of Commons and House of Lords, averting threatened violent revolution by enfranchising the industrial middle class and eliminating corrupt rotten boroughs.',
      actions: [
        'Formed the Whig administration of 1830 pledged to constitutional reform following decades of Tory resistance and widespread agricultural Swing Riots.',
        'Extracted a historic promise from King William IV to create dozens of new peers to break the Tory aristocracy’s veto in the House of Lords.',
        'Enacted the Representation of the People Act 1832, disenfranchising 56 rotten boroughs and granting parliamentary seats to industrial cities like Birmingham, Manchester, and Leeds.',
      ],
      image: getBase64Image('/images/earl_grey.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: DEMOCRATIC REFORM</span>
          <span class="csb-category">ROTTEN BOROUGHS &bull; 1832–1872</span>
        </div>
        <h4 class="csb-title">Rotten Boroughs, Open Hustings &amp; Electoral Emancipation</h4>
        <div class="csb-body">
          Before 1832, Britain’s electoral map was a feudal absurdity. Deserted ruins like Old Sarum (three households) returned two MPs, while booming manufacturing giants like Manchester (300,000 residents) had zero representation. Voting was conducted publicly at open wooden "hustings", where landlords and factory masters systematically intimidated tenants and workers, while free beer and outright bribery decided elections. It took forty years after the Great Reform Act for Parliament to finally pass the Secret Ballot Act of 1872, introducing private voting booths and striking a fatal blow against aristocratic feudal electoral control.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> The democratic franchise was conceded grudgingly in incremental stages, driven by elite terror of working-class revolution from below.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Parliamentary Inquiry &bull; 1869</span>
          </div>
          <span class="source-date-micro">Select Committee &bull; 1869</span>
        </div>
        <div class="archival-title">Minutes of Evidence on Bribery and Landlord Voter Intimidation</div>
        <div class="archival-body">
          “In nearly every contested county election, tenants vote under absolute compulsion from their landlords. If a tenant votes against his landlord’s politics, he receives notice to quit his farm within Michaelmas. At the open hustings in Blackburn, mobs armed with bludgeons beat voters who failed to show blue cockades. Nothing short of the absolute secrecy of the ballot can emancipate the voter from tyrannical coercion.”
        </div>
        <div class="archival-footer">
          <span>Parliamentary Select Committee on Corrupt Practices</span>
          <span>House of Commons Hansard &bull; 1869</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'What was a "rotten borough", and how did the 1832 Great Reform Act address this constitutional flaw?',
      q2: 'Explain why the Secret Ballot Act of 1872 was necessary to prevent landlord and employer intimidation.',
      q3: 'Was parliamentary reform conceded to prevent revolution from below, or granted by enlightened aristocratic elites?',
    },
  },

  // Page 17: Lesson 8 (The Imperial & Industrial Verdict)
  p17: {
    keyFigure: {
      name: 'Queen Victoria',
      lifespan: '1819–1901',
      role: 'Queen of the United Kingdom & Empress of India',
      category: 'KEY FIGURE',
      significance:
        'The constitutional monarch whose sixty-three-year reign defined the "Victorian Era", presiding over the high-water mark of British industrial manufacturing supremacy, global imperial expansion, and profound domestic political transformation.',
      actions: [
        'Served as imperial patron of the 1851 Great Exhibition at the Crystal Palace, celebrating Britain as the undisputed Workshop of the World.',
        'Issued the historic Royal Proclamation of 1858 following the Indian Rebellion, promising religious neutrality and equal imperial citizenship.',
        'Proclaimed Empress of India (<em>Kaisar-i-Hind</em>) under Disraeli’s Royal Titles Act 1876, personifying British imperial dominance over 300 million overseas subjects.',
      ],
      image: getBase64Image('/images/queen_victoria.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: CAPSTONE HISTORIOGRAPHY</span>
          <span class="csb-category">THE STANDARD OF LIVING &bull; 1851–1901</span>
        </div>
        <h4 class="csb-title">The Great Balance Sheet: Optimists, Pessimists &amp; The Drain of Wealth</h4>
        <div class="csb-body">
          Evaluating the Victorian transformation divides historians into competing camps. "Optimists" point to soaring GDP, real wage growth after 1850, cheap railway travel, the eradication of cholera, and rising literacy. "Pessimists" highlight the destruction of craft traditions, two generations of physical stunting in squalid slums, and deep psychological alienation. Internationally, Indian nationalist economist Dadabhai Naoroji formulated the "Drain of Wealth" theory, demonstrating that £30–40 million was extracted annually from India to Britain without economic equivalent, subsidizing British domestic prosperity while leaving colonial subjects vulnerable to devastating famines.
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> 19th-century transformation was deeply asymmetric: domestic prosperity and democratic gains were partially financed by uncompensated colonial extraction.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Social Investigation &bull; 1845</span>
          </div>
          <span class="source-date-micro">Published 1845</span>
        </div>
        <div class="archival-title">Friedrich Engels on the Human Sacrifice of Industrial Capitalism</div>
        <div class="archival-body">
          “In Manchester, the vast capitalist class lives in pleasant, leafy suburban villas, never having to see the grime and misery of the working people. The workers are crowded into back-to-back hovels along the black, foul-smelling Irk river. Everything which here provokes disgust is of recent origin, belonging to the industrial epoch. The industrial bourgeoisie has sacrificed two entire generations of working people to accumulate its colossal fortunes.”
        </div>
        <div class="archival-footer">
          <span>The Condition of the Working Class in England &bull; 1845</span>
          <span>Institute of Social History &bull; Amsterdam</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Contrast the arguments of the "Optimist" and "Pessimist" historical schools regarding the Industrial Revolution.',
      q2: 'Explain Dadabhai Naoroji’s "Drain of Wealth" theory regarding British colonial rule in India.',
      q3: '“The 19th century was an era of unprecedented progress for all Britons.” Assess the validity of this judgement.',
    },
  },
};

// 4-Term Fingertip Vocabulary Decks for Left-Hand Page Footers (P2, P4, P6, P8, P10, P12, P14, P16)
const INDUSTRIALISATION_LEFT_VOCAB = {
  p2: [
    {
      term: 'Pig Iron',
      def: 'Crude, brittle high-carbon iron straight from a blast furnace, prone to cracking under sudden impact or naval artillery.',
    },
    {
      term: 'Wrought Iron',
      def: 'Purified, malleable iron containing less than 0.1% carbon, capable of being hammered, rolled, and forged without shattering.',
    },
    {
      term: 'Puddling Process',
      def: 'Cort’s technique of stirring molten pig iron inside a reverberatory furnace with long paddles to burn away excess carbon.',
    },
    {
      term: 'Domestic System',
      def: 'The pre-industrial manufacturing method where families produced goods by hand at home on contract for travelling merchants.',
    },
  ],
  p4: [
    {
      term: 'Factory System',
      def: 'Manufacturing concentrated in centralised, steam-powered mills operating strict shift hours governed by the factory clock.',
    },
    {
      term: 'Laissez-Faire',
      def: 'The economic doctrine that government should not interfere in private business contracts, wages, or factory working hours.',
    },
    {
      term: 'Scavenger',
      def: 'A young child employed in cotton mills to crawl beneath active, moving machinery to sweep away loose, flammable cotton fluff.',
    },
    {
      term: 'Piecer',
      def: 'A child labourer whose job was to lean over operating spinning mules to catch and tie together broken threads without stopping.',
    },
  ],
  p6: [
    {
      term: 'Miasma Theory',
      def: 'The erroneous medical belief that epidemic diseases like cholera and typhus were transmitted by inhaling foul airborne gases from filth.',
    },
    {
      term: 'Back-to-Backs',
      def: 'Cheap, terraced industrial slum houses sharing party walls on three sides, built with zero cross-ventilation or private drainage.',
    },
    {
      term: 'Cesspool',
      def: 'An unlined underground pit dug beneath cellars or alleys to collect raw sewage, which routinely leaked into communal drinking wells.',
    },
    {
      term: 'Great Stink',
      def: 'The summer 1858 crisis when untreated sewage fermented in the Thames, overwhelming Parliament and forcing the construction of sewers.',
    },
  ],
  p8: [
    {
      term: 'Pax Britannica',
      def: 'The period of relative peace in Europe (1815–1914) during which the British Empire served as the global maritime hegemon.',
    },
    {
      term: 'Gunboat Diplomacy',
      def: 'The pursuit of imperial foreign policy objectives through conspicuous displays or threats of naval firepower against weaker states.',
    },
    {
      term: 'Coaling Station',
      def: 'Fortified naval overseas ports stocked with coal to refuel steam-powered merchant ships and battleships of the Royal Navy.',
    },
    {
      term: 'Crown Raj',
      def: 'Direct British government administration over India established by Parliament in 1858 following the dissolution of the East India Company.',
    },
  ],
  p10: [
    {
      term: 'Sepoy',
      def: 'An Indian soldier recruited and trained by European officers to serve in the armed forces of the British East India Company.',
    },
    {
      term: 'Doctrine of Lapse',
      def: 'Governor-General Dalhousie’s policy annexing any Indian princely state whose ruler died without a direct biological male heir.',
    },
    {
      term: 'Enfield Rifle',
      def: 'The 1853 British military rifle whose paper cartridges were greased with animal tallow, offending Hindu and Muslim soldiers.',
    },
    {
      term: 'Cantonment',
      def: 'A permanent military station in colonial India where British troops and their families lived segregated from the native population.',
    },
  ],
  p12: [
    {
      term: 'Chartism',
      def: 'The first mass working-class movement in Britain (1838–1848), demanding radical parliamentary reform codified in the People’s Charter.',
    },
    {
      term: 'Universal Suffrage',
      def: 'The democratic right of all adult citizens to vote in national parliamentary elections regardless of property or income qualifications.',
    },
    {
      term: 'Tolpuddle Martyrs',
      def: 'Six Dorset agricultural labourers sentenced in 1834 to seven years penal transportation to Australia for swearing a secret trade union oath.',
    },
    {
      term: 'Captain Swing',
      def: 'The fictional, mythical leader whose signature appeared on threatening letters sent to farmers during the 1830 agricultural riots.',
    },
  ],
  p14: [
    {
      term: 'Rotten Borough',
      def: 'A parliamentary constituency with a tiny, depopulated electorate controlled by an aristocratic patron who sold its two seats.',
    },
    {
      term: 'Secret Ballot',
      def: 'Private, anonymous voting in polling booths introduced by the 1872 Ballot Act to eliminate landlord and employer coercion.',
    },
    {
      term: 'Open Hustings',
      def: 'The public wooden platforms where parliamentary candidates were nominated and electors declared their votes aloud before the crowds.',
    },
    {
      term: 'Great Reform Act',
      def: 'Landmark 1832 legislation that disenfranchised 56 rotten boroughs and enfranchised 200,000 middle-class householders across industrial cities.',
    },
  ],
  p16: [
    {
      term: 'Standard of Living',
      def: 'The level of wealth, comfort, material goods, and physical health available to a particular socioeconomic class or cohort.',
    },
    {
      term: 'Drain Theory',
      def: 'Dadabhai Naoroji’s thesis that Britain systematically extracted £30–40 million annually from India without equivalent commercial return.',
    },
    {
      term: 'Optimist School',
      def: 'Historians who argue industrialisation improved human welfare through higher real wages, consumer goods, and modern technology.',
    },
    {
      term: 'Pessimist School',
      def: 'Historians who argue industrialisation generated horrific human misery: slum squalor, physical stunting, and capitalist exploitation.',
    },
  ],
};

// Rich Disciplinary Primary Source Bank for Left-Hand Pages (P2, P4, P6, P8, P10, P12, P14, P16)
const INDUSTRIALISATION_LEFT_SOURCES = {
  p2: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Oil on Canvas',
      title: 'Philip James de Loutherbourg: "Coalbrookdale by Night" (1801)',
      image: getBase64Image('/images/coalbrookdale_by_night.jpg'),
      context:
        'Painted in 1801, this dramatic artwork depicts the Madeley Wood ironworks in Shropshire, capturing the infernal glare of coke-fired blast furnaces illuminating the nighttime Shropshire landscape.',
      hingeQuestion:
        'Does de Loutherbourg view the new industrial landscape with awe at human technological mastery, or terror at an infernal destruction of nature?',
      shelfmark: 'Science Museum Group, London (Inv. 1952-167)',
      footer: 'Department of Science & Technology Visual Archive',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Technical Drawing',
      title: 'Henry Cort’s Reverberatory Puddling Furnace & Grooved Rollers (1783–1784)',
      image: getBase64Image('/images/funtley_ironworks.jpg'),
      context:
        'Original patent specification drawings showing how Cort deflected coal flames over pig iron inside an arched furnace at Funtley Ironworks, burning away impurities before passing molten iron through grooved rollers.',
      hingeQuestion:
        'How did Cort’s technological design solve the ancient chemical problem of refining iron without contaminating it with coal sulphur?',
      shelfmark: 'His Majesty’s Patent Office, London (Pat. No. 1388 & 1420)',
      footer: 'Imperial Patent Repository &bull; Metallurgy Division',
    },
  },
  p4: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Contemporary Engraving',
      title: 'Powerloom Weaving Shed in a Lancashire Textile Mill (1835)',
      image: getBase64Image('/images/19th_century_mill.jpg'),
      context:
        'Drawn by Thomas Allom in 1835, this engraving illustrates the vast mechanised weaving shed of a steam-powered textile factory, where hundreds of female operatives tend rows of automated looms connected to overhead rotating drive-shafts.',
      hingeQuestion:
        'How does this image demonstrate that the factory clock and steam engine fundamentally destroyed the traditional rhythm of domestic craftsmanship?',
      shelfmark: 'Baines: History of the Cotton Manufacture in Great Britain',
      footer: 'Department Textile Heritage Archive',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Architectural Evidence',
      title: 'The Royal Albert Hall, London (1871)',
      image: getBase64Image('/images/royal_albert_hall.jpg'),
      context:
        'Constructed between 1867 and 1871, the exterior walls of this monument to Victorian cultural and scientific achievement were built using six million high-density Fareham Red bricks fired in the Hampshire clay pits around Funtley.',
      hingeQuestion:
        'How does the Royal Albert Hall prove that local Hampshire industrial production was directly tied to the national architectural triumphs of the Victorian empire?',
      shelfmark: 'Victorian Society Architectural Archive, London',
      footer: 'Hampshire Industrial Heritage Survey',
    },
  },
  p6: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Contemporary Engraving',
      title: 'Gustave Doré: "Over London by Rail" (1872)',
      image: getBase64Image('/images/victorian_slum.jpg'),
      context:
        'French artist Gustave Doré captured the claustrophobic squalor of working-class back-to-back housing in Victorian London, showing narrow, soot-blackened yards, shared washing lines, and complete absence of greenery.',
      hingeQuestion:
        'What specific features of this urban environment explain why life expectancy for industrial labourers plummeted below twenty years?',
      shelfmark: 'Doré & Jerrold: London, A Pilgrimage (1872)',
      footer: 'British Museum Prints & Drawings Collection',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Satirical Cartoon',
      title: 'John Leech: "A Court for King Cholera" (Punch Magazine, 1852)',
      image: getBase64Image('/images/court_for_king_cholera.png'),
      context:
        'Published in Punch during the 1852 epidemic, this satirical woodcut depicts King Cholera holding court in an unpaved industrial alleyway choked with open cesspools, rotting refuse, and unattended corpses.',
      hingeQuestion:
        'How does this cartoon illustrate the prevailing contemporary belief that cholera was spread through foul airborne miasmas rising from urban filth?',
      shelfmark: 'Punch Historical Archive, London (Issue 584)',
      footer: 'Punch Magazine &bull; Social Critique Division',
    },
  },
  p8: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Cartographic Allegory',
      title:
        'Walter Crane: "Imperial Federation: Map of the World Showing the Extent of the British Empire" (1886)',
      image: getBase64Image('/images/imperial_federation_map.jpg'),
      expand: 'sm',
      context:
        'Commissioned for the Colonial and Indian Exhibition in 1886, this elaborate map illustrates the British Empire shaded in pink, flanked by Britannia seated atop the globe and surrounded by depictions of colonial subjects and indigenous commodities.',
      hingeQuestion:
        'Does this map present the British Empire as a cooperative family of equal nations, or a celebratory spectacle of global racial and economic hierarchy?',
      shelfmark: 'Norman B. Leventhal Map Center, Boston (Acc. 06_01_000789)',
      footer: 'Imperial Cartographic Archive &bull; Exhibition Collection',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Naval Artifact',
      title: 'HMS Warrior at Portsmouth Royal Dockyard (1860)',
      image: getBase64Image('/images/hms_warrior.jpg'),
      context:
        'Launched in 1860 at Portsmouth Dockyard, HMS Warrior was the world’s first iron-hulled, armor-plated steam battleship. Her 4.5-inch wrought iron armor plates made her utterly invincible to existing wooden warships.',
      hingeQuestion:
        'Why did the construction of HMS Warrior render every other navy in the world obsolete overnight, securing undisputed British maritime hegemony?',
      shelfmark: 'National Museum of the Royal Navy, Portsmouth',
      footer: 'Royal Navy Heritage Archive &bull; Portsmouth',
    },
  },
  p10: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Historical Map & Engraving',
      title: 'The Outbreak of the Indian Rebellion at Meerut (May 1857)',
      image: getBase64Image('/images/sepoy_mutiny_1857.png'),
      context:
        'Contemporary lithograph depicting the initial explosion of the rebellion on 10 May 1857, when 85 sepoys who refused to use the new greased Enfield cartridges were imprisoned, prompting their comrades to mutiny and march on Delhi.',
      hingeQuestion:
        'How does this image prove that the rebellion was catalyzed by deep religious anxieties rather than mere military indiscipline?',
      shelfmark: 'Illustrated London News Archive (June 1857)',
      footer: 'British Colonial Military Records',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Lithograph',
      title: 'British Troops and Rebel Sepoys in Combat at Delhi (1857)',
      image: getBase64Image('/images/indian_rebellion_1857.jpg'),
      context:
        'Depiction of the bitter hand-to-hand fighting around the Kashmiri Gate during the British siege and recapture of Delhi between June and September 1857, showing the fierce resistance offered by rebel forces.',
      hingeQuestion:
        'Does this depiction portray the conflict as a professional imperial pacification, or a desperate existential war for continental supremacy?',
      shelfmark: 'National Army Museum, London (NAM. 1971-02-33)',
      footer: 'Subcontinental Military Records &bull; 1857 Collection',
    },
  },
  p12: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Historic Photograph',
      title: 'The Chartist Mass Demonstration at Kennington Common (10 April 1848)',
      image: getBase64Image('/images/chartist_demo.jpg'),
      expand: 'sm',
      context:
        'One of the earliest crowd photographs in British history, capturing over 25,000 Chartists assembled under William Lovett and Feargus O’Connor to present their giant third petition containing over 5 million signatures to Parliament.',
      hingeQuestion:
        'How does this photograph demonstrate the disciplined, peaceful nature of Moral Force Chartism against government claims of armed insurrection?',
      shelfmark: 'Royal Collection Trust (RCIN 2932484)',
      footer: 'Early Victorian Photographic Archive &bull; Windsor',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Written Primary Document',
      title: 'Threatening Letter from "Captain Swing" to Hampshire Farmers (October 1830)',
      text: '“Sir, This is to acquaint you that if you do not immediately break your threshing machines and raise your wages to two shillings a day, we will burn down your barns, your hay ricks, and your house over your head. We will have bread or blood. You have been warned.<br><br>Signed by order of the Committee: <strong>CAPTAIN SWING</strong>”',
      context:
        'During the agricultural Swing Riots of autumn 1830, over 300 Hampshire farm labourers destroyed threshing machines across the Test Valley and Meon Valley. The government sent a Special Commission to Winchester, executing three men and transporting 101 to Australia.',
      hingeQuestion:
        'Does this letter reflect organized political revolution, or a desperate act of economic survival against winter starvation?',
      shelfmark: 'Hampshire Record Office, Winchester (Ref. 10M57/A14)',
      footer: 'Hampshire Constabulary Historical Papers',
    },
  },
  p14: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Parliamentary Boundary Cartography',
      title: 'Map of Unreformed Parliamentary Boroughs & Rotten Boroughs (1832)',
      image: getBase64Image('/images/map_rotten_boroughs.jpg'),
      context:
        'Cartographic survey of England and Wales prior to the 1832 Reform Act, showing how fifty-six "rotten boroughs" with virtually no inhabitants returned two MPs each, while vast industrial cities in the North had no representation.',
      hingeQuestion:
        'Why did the geographical mismatch shown on this map convince Whig politicians that parliamentary reform was urgently required to prevent civil war?',
      shelfmark: 'Parliamentary Archives, London (HC/CL/PO/1832/M1)',
      footer: 'House of Commons Boundary Commission Survey',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Satirical Engraving',
      title: 'George Cruikshank: "The Reform Tree" (1831)',
      image: getBase64Image('/images/old_rotten_tree.jpg'),
      context:
        'Popular satirical print by George Cruikshank depicting Prime Minister Earl Grey and Lord John Russell chopping down the rotten tree of aristocratic corruption and patronage, while conservative Tories cling desperately to its branches.',
      hingeQuestion:
        'How does Cruikshank use satire to frame the 1832 Reform Act as a vital pruning of national decay rather than a dangerous revolutionary upheaval?',
      shelfmark: 'British Museum Department of Prints & Drawings (1868,0808.8872)',
      footer: 'British Museum Satirical Print Collection',
    },
  },
  p16: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Satirical Woodcut',
      title:
        'John Leech: "Capital and Labour; or, The Two Faces of Victorian Britain" (Punch, 1843)',
      image: getBase64Image('/images/capital_labour.jpg'),
      expand: 'sm',
      context:
        'Published in Punch magazine in 1843, this searing visual juxtaposition contrasts the opulent drawing room of wealthy factory owners and mine shareholders above with the subterranean gloom and misery of coal miners and mill workers below.',
      hingeQuestion:
        'How does this cartoon provide visual evidence for Friedrich Engels’s argument that industrialisation divided Britain into two hostile, uncommunicating nations?',
      shelfmark: 'Punch Historical Archive, London (Vol. 5, p. 48)',
      footer: 'Punch Magazine &bull; Social Critique Division',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Written Primary Document',
      title:
        'Official Catalogue of the Great Exhibition of the Works of Industry of All Nations (1851)',
      text: '“The Crystal Palace stands as a glorious monument to the genius, enterprise, and peaceful brotherhood of civilized mankind. Under this magnificent dome of glass and iron, Britain displays her steam hammers, automated looms, and marine engines, offering testimony to the triumphant progress of human ingenuity. We have assembled the riches of all empires under the patronage of our beloved Queen Victoria, proving that peace and commerce shall unite the world.”',
      context:
        'Over six million visitors flocked to Joseph Paxton’s Crystal Palace in Hyde Park in 1851, celebrating Britain’s undisputed position as the Workshop of the World and the zenith of Victorian industrial self-confidence.',
      hingeQuestion:
        'Does the official catalogue present a realistic assessment of Victorian society, or an idealized imperial propaganda pageant that concealed domestic working-class misery?',
      shelfmark: 'Victoria and Albert Museum Archives, London (NAL. 38.V.51)',
      footer: 'Royal Commission for the Exhibition of 1851',
    },
  },
};

/**
 * Calibrated 4-Act Narrative Engine
 * Extracts and trims narrative blocks into high-density, academic paragraphs
 * ensuring exact paragraph indexing [1.1], [1.2], [2.1], etc. perfectly matching the Pupil Workbook.
 */
function getLessonSections(lesson, idx) {
  if (idx === 0) {
    // Lesson 1: Henry Cort & Metallurgy
    return [
      {
        title: 'The Rotten Secret: Britain’s Pig Iron Crisis (1750–1780)',
        text: `<span class="para-ref">[1.1]</span> Before the mid-eighteenth century, Britain's iron industry was paralyzed by a critical technological crisis. Smelting iron ore with wood charcoal had devastated English forests, forcing manufacturers to rely on expensive iron imports from Sweden and Russia. Although Abraham Darby smelted iron using coke in 1709, the resulting "pig iron" remained brittle, weak, and contaminated with sulphur.\n\n<span class="para-ref">[1.2]</span> This chemical weakness directly threatened national survival. The Royal Navy required immense quantities of malleable, high-tensile wrought iron for anchors, cannon fittings, and ship bolts. When the Baltic trade was imperilled during the American Revolutionary War, Britain faced an acute naval crisis. Without a domestic method to produce pure wrought iron at scale, industrial expansion was crippled.\n\n<span class="para-ref">[1.3]</span> To break free from Baltic dependency, British ironmasters experimented desperately with coal smelting. Yet because coal contained destructive sulphur, pig iron cast in standard blast furnaces shattered under tensile stress. Without an affordable domestic technique to refine brittle pig iron into tough, malleable bar iron, Britain remained dangerously exposed.`,
      },
      {
        title: 'The Breakthrough at Funtley Ironworks (1775–1784)',
        text: `<span class="para-ref">[2.1]</span> In Hampshire, former Royal Navy pay agent Henry Cort leased the Funtley Ironworks near Fareham to solve this metallurgical puzzle. Recognizing that coal fumes contaminated molten iron, Cort constructed an innovative reverberatory furnace. By deflecting flame and heat over the iron from an arched roof without physical contact with the coal fuel, he burned away impurities through oxidation.\n\n<span class="para-ref">[2.2]</span> Inside the inferno, workmen stirred the molten mass with iron rods in an exhausting process known as "puddling." As carbon burned away, pure iron coalesced into spongy balls. Cort immediately transferred the white-hot metal to steam-powered grooved rollers. The rollers compressed the iron and squeezed out remaining slag, boosting production fifteen-fold over traditional smithing hammers.\n\n<span class="para-ref">[2.3]</span> Cort's patented innovation conquered both chemical contamination and physical bottlenecks. By substituting coal for scarce timber and mechanising the rolling process, Funtley could roll fifteen tons of refined wrought iron in the twelve hours formerly required to forge a single ton under water hammers.`,
      },
      {
        title: 'Forensic Evidence: The Portsmouth Navy Trials (1787)',
        text: `<span class="para-ref">[3.1]</span> In 1787, the Admiralty subjected Cort’s Funtley iron to rigorous comparative testing at Portsmouth Royal Dockyard. Master shipwrights and naval smiths tested anchors, chains, and ordnance against premier Swedish "Orgrounds" iron. Cort’s puddling iron withstood extreme tensile stresses and sledgehammer impacts, prompting dockyard officials to certify it superior to foreign imports.\n\n<span class="para-ref">[3.2]</span> Archival test certificates held at Portsmouth confirm that Cort’s domestic wrought iron immediately replaced Baltic shipments across British naval dockyards. By supplying the Royal Navy with superior structural iron on the eve of the French Revolutionary Wars, the Funtley works delivered the naval supremacy that underpinned Britain's maritime empire.`,
      },
      {
        title: 'The Historical Verdict: Location vs. Innovation',
        text: `<span class="para-ref">[4.1]</span> Historians debate whether Cort’s breakthrough was primarily driven by individual genius or strategic geography. Technological historians highlight his metallurgical persistence, filing revolutionary patents in 1783 and 1784. Conversely, economic historians emphasize Funtley’s direct river access to Portsmouth Dockyard and access to Admiralty capital as the decisive catalysts.\n\n<span class="para-ref">[4.2]</span> Cort himself was financially ruined after his business partner Adam Jellicoe died, having embezzled Admiralty naval funds to finance the works. While the Crown seized Cort’s patents, his puddling process spread rapidly across South Wales and the Black Country, transforming Britain into the workshop of the world and the world's leading exporter of structural iron.`,
      },
    ];
  }

  if (idx === 1) {
    // Lesson 2: Industrial Work: Progress or Punishment?
    return [
      {
        title: 'The Baseline: Workshop Craft to the Factory Clock (1750–1830)',
        text: `<span class="para-ref">[1.1]</span> The Industrial Revolution fundamentally dismantled the traditional rhythm of British labour. Under the domestic system, rural families spun yarn and wove cloth at home, controlling their own working hours and observing "Saint Monday" as customary leisure. Work was dictated by natural daylight, seasonal cycles, and individual pace rather than mechanical supervision.\n\n<span class="para-ref">[1.2]</span> The introduction of Arkwright’s water frame and Watt’s rotary steam engine concentrated workers into multi-storey urban mills. In these mechanized workspaces, the merciless factory clock replaced natural time. Operatives worked fourteen-hour shifts under strict overseers, facing immediate fines or corporal punishment for speaking, opening windows, or falling seconds behind the machines.\n\n<span class="para-ref">[1.3]</span> Steam-driven mechanisation severed operatives from direct ownership of tools and output. Mill discipline enforced obedience through fines, closed factory gates, and locked windows. Workers who had controlled their family hearth were transformed into wage-dependent hands dictated by the rhythmic turn of the steam shaft.`,
      },
      {
        title: 'The Local Catalyst: The Fareham Red Brick Boom (1800–1880)',
        text: `<span class="para-ref">[2.1]</span> Industrialisation transformed regional landscapes far beyond northern textile towns. In south Hampshire, the extraction of London Clay around Fareham created a massive brickmaking industry. Fareham "Red" bricks were celebrated nationwide for their flawless colour and exceptional compressive strength, providing the structural fabric for London’s Victorian expansion.\n\n<span class="para-ref">[2.2]</span> Hampshire clay pits relied heavily on exhausting seasonal child labour. Young boys known as "clay-puggers" and "barrow-runners" hauled hundreds of wet clay bricks through unpaved brickfields for penny wages. Over 2.5 million Fareham bricks were shipped via railway and coastal barges to build the Royal Albert Hall and St Pancras railway terminal.\n\n<span class="para-ref">[2.3]</span> The clay pits and brick kilns of Fareham operated on an industrial scale matching northern mills. Boys trod raw clay barefoot in open pits from dawn until dusk, enduring freezing mud and blistering kiln heat to ensure a continuous stream of building materials for Victorian infrastructure.`,
      },
      {
        title: 'Forensic Evidence: Factory Reports & Parliamentary Commissions (1832–1842)',
        text: `<span class="para-ref">[3.1]</span> Parliamentary commissions during the 1830s unmasked the horrific human toll of unbridled industrial capitalism. The Sadler Report (1832) documented child operatives suffering spine deformities, crushed limbs in unshielded machinery, and deadly exhaustion. Medical inspectors testified that textile dust produced chronic lung disease and widespread physical stunting.\n\n<span class="para-ref">[3.2]</span> Primary depositions from child miners revealed young "trappers" sitting for twelve hours in total subterranean darkness opening ventilation doors, while young girls hauled heavy coal carts through low seams. These shocking testimonies galvanized public moral outrage and provoked fierce political debates over state intervention in the free market.`,
      },
      {
        title: 'The Historical Verdict: Capitalist Exploitation or Economic Progress?',
        text: `<span class="para-ref">[4.1]</span> Social historians like E.P. Thompson argue that early industrialisation immiserated the working class, trading human health, domestic dignity, and customary freedoms for capitalist profit. They demonstrate that statutory reforms like the Ten Hours Act (1847) were resisted by factory owners claiming limits on child labour would bankrupt British commerce.\n\n<span class="para-ref">[4.2]</span> In contrast, optimist historians emphasize that industrial factory wages steadily outpaced rural agricultural labour, eventually purchasing cheaper food, cotton clothing, and consumer goods. While child labour was harsh, state regulation, compulsory schooling, and mass production ultimately lifted millions out of subsistence poverty by the late nineteenth century.`,
      },
    ];
  }

  if (idx === 2) {
    // Lesson 3: Did Industrialisation Make British Towns Unlivable?
    return [
      {
        title: 'The Baseline: Rapid Urbanisation & The Slum Environment (1800–1840)',
        text: `<span class="para-ref">[1.1]</span> Between 1800 and 1850, British cities experienced unprecedented, uncontrolled population explosion. As rural labourers fled declining farm employment, manufacturing hubs like Manchester, Leeds, and Birmingham tripled in size. Because no building regulations or municipal authorities existed, speculative builders threw up cramped back-to-back slum terraces across unpaved yards.\n\n<span class="para-ref">[1.2]</span> Entire working-class families lived packed into single damp cellars lacking fresh air or drainage. Without municipal sewerage, domestic waste pooled in open court cesspools, seeping directly into shallow drinking water wells. In working-class Manchester districts, life expectancy plummeted to just nineteen years, compared to forty in surrounding agricultural districts.\n\n<span class="para-ref">[1.3]</span> Rampant urban expansion outpaced basic sanitation. Landlords divided existing tenements into windowless cellar dwellings, while communal privies overflowed into unpaved courts. In the absence of building codes, thousands of families lived without clean running water, disposing of household nightsoil into stagnant gutters outside their doors.`,
      },
      {
        title: 'The Catalyst: King Cholera, Miasma & The Great Stink (1848–1858)',
        text: `<span class="para-ref">[2.1]</span> In 1831, waterborne Asiatic cholera struck Britain, killing tens of thousands in terrifying, rapid epidemics. Prevailing medical opinion attributed the disease to "miasma"—poisonous atmospheric gases arising from decomposing filth. While scientifically incorrect, the miasma theory focused public attention upon the appalling squalor of urban cesspools and open sewers.\n\n<span class="para-ref">[2.2]</span> In 1858, an unprecedented summer heatwave caused the heavily polluted River Thames to ferment, producing "The Great Stink." The overwhelming stench invaded the Palace of Westminster, forcing Parliament to soak window curtains in chloride of lime. Fearing for their own lives, politicians finally abandoned laissez-faire dogma and authorized vast public expenditure on urban sanitation.\n\n<span class="para-ref">[2.3]</span> The miasma doctrine dominated medical thought, with physicians attributing cholera outbreaks to foul airborne vapors rather than contaminated drinking water. This conviction paradoxically spurred civic cleanup campaigns, compelling middle-class ratepayers to acknowledge that slum filth presented a mortal contagion to the entire city.`,
      },
      {
        title: 'Forensic Evidence: Chadwick’s Sanitary Report & Bazalgette’s Sewers (1842–1865)',
        text: `<span class="para-ref">[3.1]</span> Social reformer Edwin Chadwick’s monumental 1842 <em>Report on the Sanitary Condition of the Labouring Population</em> proved scientifically that filth and pestilence directly bred pauperism and economic ruin. Chadwick advocated for constant pressurized clean water piped into every home and an arterial underground network of self-flushing glazed sewers.\n\n<span class="para-ref">[3.2]</span> Civil engineer Joseph Bazalgette designed London’s revolutionary underground drainage network between 1859 and 1865. Constructing 1,100 miles of street sewers and 82 miles of subterranean brick interceptors, Bazalgette diverted billions of gallons of raw sewage east of the capital. The system permanently eradicated cholera and established modern municipal infrastructure.`,
      },
      {
        title: 'The Historical Verdict: Death Traps or Engines of Modernity?',
        text: `<span class="para-ref">[4.1]</span> Historians remain divided over Victorian urbanisation. The "Pessimist School" contends that 19th-century towns were lethal disease factories where rampant industrial profits were purchased at the price of human degradation, infant mortality rates exceeding thirty percent, and pervasive atmospheric pollution.\n\n<span class="para-ref">[4.2]</span> Conversely, urban historians highlight that Victorian cities fostered civic pride, magnificent town halls, public parks, libraries, and tram networks. Through Chadwick's Public Health Acts and municipal socialism, British cities pioneered the modern public health state, ultimately conquering infectious epidemics and elevating urban living standards.`,
      },
    ];
  }

  if (idx === 3) {
    // Lesson 4: How was the British Empire Built and Sustained?
    return [
      {
        title: 'The Baseline: Mercantilism, Triangular Trade & The Royal Navy (1750–1815)',
        text: `<span class="para-ref">[1.1]</span> Britain’s 18th-century imperial expansion was anchored in mercantilist economics and maritime warfare. Under the Navigation Acts, colonial possessions existed solely to supply Britain with raw commodities—sugar, tobacco, timber, and cotton—while consuming finished British manufactured goods carried exclusively aboard British-flagged ships.\n\n<span class="para-ref">[1.2]</span> This Atlantic commercial network was fundamentally entwined with the Transatlantic Slave Trade. British merchants shipped manufactured goods to West Africa, transported enslaved Africans across the Middle Passage to Caribbean plantations, and imported slave-grown sugar into Bristol and Liverpool. Profits from this brutal trade provided critical capital for early industrial mechanisation.\n\n<span class="para-ref">[1.3]</span> Mercantile trade was fiercely shielded by naval violence. The Royal Navy patrolled global sea lanes, establishing fortified bases at Gibraltar, Malta, and the Cape of Good Hope. Colonial ports functioned as exclusive commercial depots, ensuring that colonial wealth flowed directly into British counting houses.`,
      },
      {
        title: 'The Local Imperial Engine: Portsmouth Royal Dockyard & Steam Power (1803–1860)',
        text: `<span class="para-ref">[2.1]</span> Portsmouth Royal Dockyard stood at the heart of British naval supremacy, serving as the largest industrial enterprise in the world. In 1803, Marc Brunel and Henry Maudslay installed the revolutionary Portsmouth Block Mills—the world’s first steam-powered, automated assembly line, mass-producing 130,000 rigging blocks annually for Royal Navy warships.\n\n<span class="para-ref">[2.2]</span> In 1860, Portsmouth launched <strong>HMS Warrior</strong>, the world’s first iron-hulled, armour-plated, steam-powered battleship. Powered by ten boilers driving a massive screw propeller, Warrior’s impenetrable 4.5-inch wrought iron armour rendered every wooden warship obsolete overnight, establishing undisputed British naval dominance across global maritime trade routes.\n\n<span class="para-ref">[2.3]</span> Steam propulsion freed maritime commerce and military expeditions from the tyranny of ocean winds. With coaling stations dotting the globe, British steamships carried mail, cargo, and soldiers across oceans in weeks rather than months, projecting British industrial power to the furthest limits of the empire.`,
      },
      {
        title: 'Forensic Evidence: The East India Company & Imperial Cartography (1765–1886)',
        text: `<span class="para-ref">[3.1]</span> In India, British imperial power was exercised not by the Crown, but by the commercial East India Company. Following the 1765 Treaty of Allahabad, the Company secured the <em>Diwani</em> (tax-collecting rights) over wealthy Bengal. Backed by private mercenary armies and Indian sepoys, the Company systematically extracted agricultural wealth, de-industrialized native cotton weaving, and enforced opium production.\n\n<span class="para-ref">[3.2]</span> Walter Crane’s famous 1886 <em>Imperial Federation Map</em> visualized Britain’s global supremacy, showing one-quarter of the world’s landmass coloured imperial red. The map linked distant territories via Royal Navy steamship routes and undersea telegraph cables, projecting an idealized image of imperial unity, civilising duty, and commercial prosperity.`,
      },
      {
        title: 'The Historical Verdict: Civilising Mission or Exploitative Coercion?',
        text: `<span class="para-ref">[4.1]</span> Imperial historians like Niall Ferguson argue that the British Empire pioneered global free trade, introducing parliamentary law, railway networks, and postal systems that modernized developing continents. They argue that British naval power maintained global peace (<em>Pax Britannica</em>) and actively suppressed the international slave trade.\n\n<span class="para-ref">[4.2]</span> Post-colonial historians like Shashi Tharoor present a devastating counter-verdict, showing that imperial conquest was driven by racial subjugation, economic drain, and military violence. British rule systematically exploited Indian and African resources, triggered catastrophic engineered famines, and repressed indigenous independence movements through overwhelming military firepower.`,
      },
    ];
  }

  if (idx === 4) {
    // Lesson 5: The 1857 Indian Rebellion: Sepoy Mutiny or National War?
    return [
      {
        title: 'The Baseline: Structural Grievances & Company Annexation (1848–1857)',
        text: `<span class="para-ref">[1.1]</span> By 1857, deep resentment against the British East India Company had reached a combustible crisis across northern India. Governor-General Lord Dalhousie’s aggressive "Doctrine of Lapse" enabled the Company to confiscate autonomous princely states whenever a ruler died without a direct male heir, abruptly dispossessing sovereign royal houses like Awadh, Satara, and Jhansi.\n\n<span class="para-ref">[1.2]</span> Simultaneously, high land revenue taxes ruined traditional peasant cultivators, while British missionary societies openly proselytized among native populations. For the 300,000 Indian sepoys who constituted ninety percent of the Company’s armed forces, these political and economic grievances generated profound suspicion that their ancient religious identities were marked for systematic destruction.\n\n<span class="para-ref">[1.3]</span> British rule alienated every stratum of Indian society. Respected princely families were abruptly deposed, feudal landlords lost traditional estates to Company tax collectors, and Hindu and Muslim soldiers witnessed European officers openly supporting aggressive Christian missionary societies throughout the northern garrisons.`,
      },
      {
        title: 'The Escalation: Meerut, Delhi & Rani Lakshmibai (May–September 1857)',
        text: `<span class="para-ref">[2.1]</span> In early 1857, the introduction of the new Enfield rifle provided the volatile spark. Rumours spread rapidly that cartridges were coated with beef and pork fat—sacrilegious to both Hindus and Muslims—requiring soldiers to bite them open. When eighty-five sepoys at Meerut were court-martialled and shackled for refusing the cartridges, their comrades rose in open mutiny on 10 May 1857.\n\n<span class="para-ref">[2.2]</span> The rebels marched to Delhi, capturing the city and proclaiming the aged Mughal Emperor Bahadur Shah II sovereign ruler of Hindustan. Across northern and central India, civil rebellion erupted. In Jhansi, the twenty-nine-year-old Rani Lakshmibai donned combat armour, leading rebel forces in desperate defense of her besieged city before dying in combat at Gwalior.\n\n<span class="para-ref">[2.3]</span> The uprising spread with remarkable speed as sepoys and civilian populations joined forces across northern India. In rural villages, peasants torched court records and moneylenders' ledgers, while dispossessed talukdars mobilized armed retainers to overthrow British commercial authority and restore indigenous governance.`,
      },
      {
        title: 'Forensic Evidence: Rebel Manifestos vs. The Crown Raj (1857–1858)',
        text: `<span class="para-ref">[3.1]</span> Primary sources like the 1857 <em>Azamgarh Proclamation</em> reveal that the rebellion was far more than an army mutiny. Issued by rebel leaders, the manifesto explicitly called on Hindu and Muslim artisans, landowners, and clerics to unite against British economic exploitation, ruinous taxes, and cultural oppression, seeking the complete restoration of indigenous rule.\n\n<span class="para-ref">[3.2]</span> British retaliation was merciless and indiscriminate. Entire villages were razed, and captured rebels were executed en masse without trial. In the aftermath, Parliament passed the Government of India Act 1858, dissolving the East India Company. Queen Victoria issued a royal proclamation promising religious tolerance, placing India under direct Crown governance (<em>the Raj</em>).`,
      },
      {
        title: 'The Historical Verdict: Military Mutiny or First War of Independence?',
        text: `<span class="para-ref">[4.1]</span> Colonial British historiography dismissed the uprising as a localized "Sepoy Mutiny"—a reactionary military revolt driven by religious superstition and treacherous officers. Imperial writers emphasized the massacre of British civilians at Cawnpore to justify subsequent colonial authoritarianism and racial segregation.\n\n<span class="para-ref">[4.2]</span> Indian nationalist historians like V.D. Savarkar reinterpreted 1857 as India's "First War of Independence." Modern consensus views the rebellion as a multifaceted anti-colonial coalition where religious anxieties, peasant tax rebellions, and dispossessed royalty fused into a massive, desperate struggle against foreign imperial domination.`,
      },
    ];
  }

  if (idx === 5) {
    // Lesson 6: How Did Ordinary People Fight for a Voice?
    return [
      {
        title: 'The Baseline: Post-War Crucible & The Peterloo Massacre (1815–1819)',
        text: `<span class="para-ref">[1.1]</span> The conclusion of the Napoleonic Wars in 1815 plunged Britain’s working class into severe economic distress. Demobilized soldiers returned to mass unemployment, while the Tory government passed the Corn Laws, imposing heavy import tariffs on foreign grain to keep bread prices artificially high for wealthy aristocratic landowners.\n\n<span class="para-ref">[1.2]</span> On 16 August 1819, 60,000 peaceful working-class men, women, and children gathered at St Peter’s Field in Manchester to demand parliamentary reform and affordable food. Local magistrates panicked, ordering cavalry sabres to charge into the unarmed crowd. Eighteen protestors were killed and over 650 maimed in what the public furiously condemned as the "Peterloo Massacre."\n\n<span class="para-ref">[1.3]</span> The Peterloo Massacre sent shockwaves through working communities across Britain. In response to the Manchester killings, Lord Liverpool’s government passed the draconian Six Acts, banning unauthorised military drilling, taxing radical publications, and outlawing public political meetings of more than fifty persons.`,
      },
      {
        title: 'The Local Catalyst: Hampshire in Flames & The Swing Riots (1830)',
        text: `<span class="para-ref">[2.1]</span> In 1830, agricultural distress swept across southern England in the "Captain Swing" riots. Displaced farm labourers faced starvation wages and winter unemployment caused by threshing machines. Rioting farmworkers smashed mechanized threshers, torched hayricks, and sent threatening letters signed by the fictitious avenger "Captain Swing" demanding living wages.\n\n<span class="para-ref">[2.2]</span> Hampshire sat at the epicenter of rural unrest. Crowds attacked poorhouses in Selborne and Headley, destroying agricultural equipment. The government crushed the uprising with harsh judicial vengeance: special commissions in Winchester sentenced three Hampshire men to hang and transported over one hundred agricultural labourers to penal colonies in Australia.\n\n<span class="para-ref">[2.3]</span> Rural protest exposed the desperate poverty of the southern countryside. Farmworkers demanding living wages faced ruthless repression from county magistrates. The severe sentences handed down at Winchester demonstrated the government's resolve to crush agricultural trade unionism and protect landlord property.`,
      },
      {
        title: 'Forensic Evidence: The Tolpuddle Indictment & The People’s Charter (1834–1848)',
        text: `<span class="para-ref">[3.1]</span> In 1834, six agricultural labourers in Dorset led by George Loveless formed the Friendly Society of Agricultural Labourers to resist wage cuts. Fearing trade unionism, magistrates prosecuted them under an obscure 1797 naval mutiny statute against "unlawful oaths," sentencing them to seven years' penal transportation. Mass public protests eventually forced a full royal pardon.\n\n<span class="para-ref">[3.2]</span> In 1838, the London Working Men's Association drafted the <strong>People’s Charter</strong>, demanding six fundamental democratic reforms: universal male suffrage, equal constituencies, abolition of property qualifications, annual parliaments, payment for MPs, and the secret ballot. Millions of working-class citizens signed mammoth petitions delivered to Parliament.`,
      },
      {
        title: 'The Historical Verdict: Did Working-Class Resistance Fail?',
        text: `<span class="para-ref">[4.1]</span> Contemporary critics claimed Chartism was a complete failure. Parliament rejected petitions in 1839, 1842, and 1848 by overwhelming majorities. Tactical divisions between William Lovett’s "Moral Force" Chartists and Feargus O'Connor’s "Physical Force" advocates weakened the movement, while state policing crushed armed risings in Newport and London.\n\n<span class="para-ref">[4.2]</span> Modern historians argue that 19th-century popular protest won profound long-term victories. Chartism trained generations of working-class organizers, fostered democratic literacy, and built the foundations of the trade union movement. By 1918, five of the six Chartist demands had been enshrined into British constitutional law.`,
      },
    ];
  }

  if (idx === 6) {
    // Lesson 7: The Road to Democracy: Concession or Revolution?
    return [
      {
        title: 'The Baseline: Rotten Boroughs & The Unreformed System (1800–1830)',
        text: `<span class="para-ref">[1.1]</span> In 1830, Britain’s parliamentary representation was corrupt, archaic, and unrepresentative. Vast industrial cities like Manchester, Birmingham, and Leeds with hundreds of thousands of citizens had zero members of parliament. Power remained monopolized by wealthy aristocratic landowners who dominated rural "pocket boroughs."\n\n<span class="para-ref">[1.2]</span> Notorious "rotten boroughs" with virtually no electors returned multiple MPs: Old Sarum in Wiltshire was a deserted grass mound with seven voters electing two MPs, while Dunwich had eroded into the North Sea. Fewer than 400,000 wealthy men possessed the vote out of a population exceeding twenty million, and open voting invited routine landlord bribery and voter intimidation.\n\n<span class="para-ref">[1.3]</span> The unreformed House of Commons represented landed wealth rather than people. While depopulated hamlets sent two members to Westminster, expanding industrial cities like Manchester, Birmingham, and Sheffield with hundreds of thousands of inhabitants possessed no parliamentary voice whatsoever.`,
      },
      {
        title: 'The Catalyst: The 1832 Reform Act & Days of May (1830–1832)',
        text: `<span class="para-ref">[2.1]</span> The election of Earl Grey’s Whig government in 1830 brought parliamentary reform to a revolutionary climax. When the Tory-dominated House of Lords repeatedly vetoed Grey’s Reform Bill, the nation erupted in fury. In October 1831, massive riots torched the Bishop's Palace in Bristol and destroyed Nottingham Castle, while reform political unions organized nationwide bank runs.\n\n<span class="para-ref">[2.2]</span> In the "Days of May" 1832, facing the imminent threat of armed revolution and civil war, King William IV agreed to Earl Grey’s demand to create dozens of new Whig peers to overcome the Lords' veto. Terrified of losing their peerages and aristocratic privileges, Tory lords capitulated, passing the landmark Great Reform Act into law in June 1832.\n\n<span class="para-ref">[2.3]</span> Tory resistance brought Britain to the verge of open insurrection. Political unions organized nationwide runs on the Bank of England under the slogan "Stop the Duke, go for gold," while armed working-class clubs drilled in the streets, convincing Whig leaders that moderate reform was essential to prevent revolution.`,
      },
      {
        title: 'Forensic Evidence: Rotten Borough Maps & The 1872 Secret Ballot (1832–1872)',
        text: `<span class="para-ref">[3.1]</span> Primary electoral maps confirm that the 1832 Act disenfranchised 56 rotten boroughs and redistributed 143 parliamentary seats to booming industrial towns. However, the Act was carefully engineered to protect property: by establishing a strict £10 household franchise, it enfranchised the commercial middle class while deliberately excluding the working class.\n\n<span class="para-ref">[3.2]</span> Until 1872, voting took place on public wooden platforms known as "hustings." Voters declared their choices aloud before crowds of partisans, leaving tenants vulnerable to eviction by landlords and workers to immediate dismissal by factory masters. The Ballot Act 1872 finally introduced the secret ballot, severing aristocratic intimidation.`,
      },
      {
        title: 'The Historical Verdict: Won from Below or Granted from Above?',
        text: `<span class="para-ref">[4.1]</span> Whig historians portrayed the 1832 Reform Act as a triumph of enlightened British statecraft, demonstrating how peaceful constitutional compromise averted the violent revolutions that rocked continental Europe. They argued that Whig aristocrats prudently expanded the political nation to preserve Britain’s stability.\n\n<span class="para-ref">[4.2]</span> Marxist and social historians demonstrate that reform was conceded solely under immense working-class intimidation. Lord Grey privately admitted his goal was "to associate the middle classes with the aristocracy in defence of property." Subsequent expansions—the 1867 and 1884 Reform Acts—were similarly forced by mass working-class agitation and the Reform League.`,
      },
    ];
  }

  if (idx === 7) {
    // Lesson 8: Who Truly Benefited from 19th-Century Transformation?
    return [
      {
        title: 'The Optimist Case: Industrial Triumph & Rising Prosperity (1815–1880)',
        text: `<span class="para-ref">[1.1]</span> By 1851, the Great Exhibition inside London's Crystal Palace celebrated Britain as the undisputed "Workshop of the World." Powered by steam engines, railway networks, and vast coal reserves, Britain produced two-thirds of the world's coal, half its iron, and half its commercial cotton textiles, exporting manufactured goods to every corner of the globe.\n\n<span class="para-ref">[1.2]</span> Economic optimists demonstrate that real wages for skilled working-class families increased by over thirty percent after 1850. Cheap factory production made cotton undergarments, tea, soap, and footwear universally affordable. Gas lighting, piped water, public libraries, and statutory weekend half-holidays transformed daily working-class quality of life.\n\n<span class="para-ref">[1.3]</span> The Great Exhibition of 1851 showcased Britain's technological supremacy to the world. Over six million visitors marveled at locomotive engines, precision machine tools, and manufactured textiles, cementing the perception of Victorian Britain as the prosperous workshop of the civilized world.`,
      },
      {
        title: 'The Pessimist Case: Human Squalor & Silenced Voices (1800–1880)',
        text: `<span class="para-ref">[2.1]</span> In stark contrast, social pessimists emphasize that Britain’s staggering wealth was built upon the exploitation of millions. In northern textile mills and Hampshire brickfields, children worked brutal shifts inhaling toxic dust, suffering spine deformities and early death. In back-to-back slum cellars, cholera and typhus epidemics ravaged malnourished families lacking clean water.\n\n<span class="para-ref">[2.2]</span> Industrial capitalism created vast social inequality. While mill barons and railway magnates amassed unprecedented fortunes, agricultural labourers and artisan handloom weavers were reduced to pauperism. Those unable to find employment faced the dreaded New Poor Law workhouse, where families were deliberately separated and subjected to punitive manual labour.\n\n<span class="para-ref">[2.3]</span> Yet behind the gilded facade of imperial triumph lay deep systemic deprivation. Industrial progress enriched capital owners while leaving millions of factory hands, domestic servants, and agricultural labourers vulnerable to cyclical unemployment, debilitating illness, and the humiliation of the workhouse.`,
      },
      {
        title: 'Forensic Evidence: The Imperial Balance Sheet & Drain of Wealth',
        text: `<span class="para-ref">[3.1]</span> Global trade records demonstrate that Britain’s industrial supremacy was inextricably linked to imperial extraction. British tariffs systematically crushed India’s traditional textile industry, turning India from the world's leading cotton exporter into an importer of Lancashire cloth. Enslaved labour in the Americas and colonial raw materials financed British industrial capital.\n\n<span class="para-ref">[3.2]</span> When catastrophic famines struck British India in the late 1870s, viceroys adhering to strict free-market economic theory refused to halt grain exports, resulting in the deaths of over six million Indian subjects while British grain markets posted record profits. Imperial prosperity rested heavily upon colonial exploitation.`,
      },
      {
        title: 'The Historical Verdict: Capstone Synoptic Evaluation',
        text: `<span class="para-ref">[4.1]</span> Evaluating the 19th-century transformation requires weighing profound contradictions. Industrialisation liberated humanity from the ancient limits of animal and water power, laying the foundation for modern democracy, global transport, public health, and technological science that lifted millions out of subsistence poverty.\n\n<span class="para-ref">[4.2]</span> Yet this triumph came at immense human cost: the destruction of customary craft, horrific slum squalor, ruthless capitalist exploitation of working-class families, and the violent subjugation of global colonial empires. The modern world was forged in Britain’s industrial furnace, but the price was paid by ordinary working hands at home and abroad.`,
      },
    ];
  }

  return [];
}

/**
 * Builds the complete 18-page publisher textbook HTML
 */
async function buildPublisherTextbookHtmlIndustrialisation() {
  const coverImgData = getBase64Image('/images/imperial_federation_map.jpg');

  // Build lesson HTML
  let lessonsHtml = '';

  lessons.forEach((lesson, idx) => {
    const lessonNum = idx + 1;
    const leftPageNum = lessonNum * 2;
    const rightPageNum = lessonNum * 2 + 1;
    const bankKey = `p${rightPageNum}`;
    const leftVocabKey = `p${leftPageNum}`;
    const leftSrcKey = `p${leftPageNum}`;
    const bank = INDUSTRIALISATION_COMPONENT_BANK[bankKey] || {};
    const vocabTerms = INDUSTRIALISATION_LEFT_VOCAB[leftVocabKey] || [];
    const leftSources = INDUSTRIALISATION_LEFT_SOURCES[leftSrcKey] || {};

    // Extract lesson blocks into 4 coherent sections
    const secList = getLessonSections(lesson, idx);
    const sec1 = secList[0] || {};
    const sec2 = secList[1] || {};
    const sec3 = secList[2] || {};
    const sec4 = secList[3] || {};

    // Helper to format paragraphs with Christine Counsell disciplinary pills
    const formatBlockParas = (sec) => {
      if (!sec || !sec.text) return '';
      const paras = sec.text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
      return paras.map((p) => `<p class="narrative-p">${formatText(p)}</p>`).join('');
    };

    const getMonogramInitials = (name) => {
      if (!name) return 'KF';
      const clean = name.replace(/^(The|Sir|Lord|Dr|King|Queen|Prior|Sultan)\s+/i, '').trim();
      const parts = clean.split(/\s+/).filter(Boolean);
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      return clean.slice(0, 2).toUpperCase();
    };

    // Helper to render Left-Hand Archival Sources (with Context & Hinge Question)
    const renderArchivalSourceBox = (src) => {
      if (!src) return '';
      const isPanoramic =
        src.isPanoramic || src.panoramic || (src.aspectRatio && src.aspectRatio === 'panoramic');
      const sizeClass = src.expand ? ` expand-${src.expand}` : '';
      const panoramicClass = isPanoramic ? ' panoramic-source' : '';
      if (src.text) {
        // Written Primary Document
        return `
          <div class="archival-source-box written-source-box${sizeClass}${panoramicClass}">
            <div class="archival-header">
              <div class="source-identity">
                <span class="source-badge">${src.badge}</span>
                <span class="source-type">${src.type}</span>
              </div>
              <span class="source-date-micro">${src.shelfmark || ''}</span>
            </div>
            <div class="archival-title">${src.title}</div>
            <div class="archival-body">${src.text}</div>
            <div class="archival-context-box">
              <p class="archival-context-text">${src.context}</p>
              <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${src.hingeQuestion}</em></div>
            </div>
            <div class="archival-footer">
              <span>${src.shelfmark || 'Department Archives'}</span>
              <span>${src.footer || 'Curriculum Primary Record'}</span>
            </div>
          </div>
        `;
      }
      if (src.image) {
        // Image Primary Document
        return `
          <div class="archival-source-box${sizeClass}${panoramicClass}">
            <div class="archival-header">
              <div class="source-identity">
                <span class="source-badge">${src.badge}</span>
                <span class="source-type">${src.type}</span>
              </div>
              <span class="source-date-micro">${src.shelfmark || ''}</span>
            </div>
            <div class="archival-title">${src.title}</div>
            <img class="archival-image" src="${src.image}" alt="${src.title}">
            <div class="archival-context-box">
              <p class="archival-context-text">${src.context}</p>
              <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${src.hingeQuestion}</em></div>
            </div>
            <div class="archival-footer">
              <span>${src.shelfmark || 'Department Archives'}</span>
              <span>${src.footer || 'Curriculum Primary Record'}</span>
            </div>
          </div>
        `;
      }
      return '';
    };

    const t3PromptMap = {
      1: 'Examine both historical perspectives on Cort’s puddling breakthrough: individual metallurgical genius vs geographical proximity to Portsmouth Dockyard and Royal Navy demand. Note two key pieces of factual evidence for each side in your workbook.',
      2: 'Evaluate both historical interpretations of factory conditions: an engine of national economic progress vs an exploitative system of child labour and human punishment. Note two key pieces of factual evidence for each view in your workbook.',
      3: 'Examine both sides of the urbanisation debate: lethal public health crises and cholera epidemics vs civic sanitary reform and Chadwick’s arterial drainage revolution. Note two key pieces of factual evidence for each side in your workbook.',
      4: 'Examine the mechanisms sustaining the British Empire: commercial monopolism (East India Company) vs technological superiority (railways, telegraphs, and gunboats). Note two key pieces of factual evidence for each factor in your workbook.',
      5: 'Analyze both perspectives on the 1857 Indian Rebellion: a mere military "Sepoy Mutiny" over greased cartridges vs a wide-ranging anti-colonial war of national independence. Note two key pieces of factual evidence for each view in your workbook.',
      6: 'Compare the strategies of the working-class reform movement: William Lovett’s "Moral Force" Chartism vs Feargus O’Connor’s "Physical Force" and the Newport Rising. Note two key pieces of factual evidence for each approach in your workbook.',
      7: 'Evaluate the motives driving parliamentary reform: genuine Whig and Tory democratic conviction vs elite panic in the face of working-class revolution. Note two key pieces of factual evidence for each motive in your workbook.',
      8: 'Weigh the balance sheet of 19th-century transformation: bourgeois industrial prosperity and imperial wealth vs working-class immiseration and colonial subjugation. Note two key pieces of factual evidence for each verdict in your workbook.',
    };
    const task3Instruction =
      t3PromptMap[lessonNum] ||
      (lesson.tasks &&
        lesson.tasks[0] &&
        (lesson.tasks[0].instruction || lesson.tasks[0].question)) ||
      'Prepare factual evidence for both sides of the historical debate in your workbook before writing.';
    const task4Question =
      (lesson.tasks && lesson.tasks[1] && lesson.tasks[1].question) ||
      lesson.enquiry ||
      lesson.title;
    const wbPages = `${lessonNum * 2 + 2}&ndash;${lessonNum * 2 + 3}`;

    // LEFT PAGE (Verso)
    lessonsHtml += `
    <!-- PAGE ${leftPageNum}: Lesson ${lessonNum} Left Page (Verso) -->
    <div class="textbook-page" data-page="${leftPageNum}">
      <div class="page-inner">
        
        <!-- Lesson Header Strip -->
        <div class="lesson-header">
          <div class="lesson-badge-strip">
            <span class="topic-badge">KS3 HISTORY &bull; UNIT 4</span>
            <span class="spec-ref-badge">LESSON ${lessonNum} OF 8</span>
          </div>
          <h2 class="lesson-title">${lesson.title}</h2>
          <div class="lesson-spec-anchor">
            <strong>Key Enquiry:</strong> “How did 19th-century Britain transform at home and abroad?” &bull; <em>Sections 1 &amp; 2: Context, Catalysts &amp; Primary Evidence</em>
          </div>
        </div>

        <!-- 2-Column Core Prose Grid -->
        <div class="two-column-grid">
          <div class="col-side">
            <div class="col-top-group">
              <div class="section-banner">
                <span class="sb-num">ACT 1</span>
                <span class="sb-title">${(sec1.title || 'Context & Catalyst').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
              </div>
              ${formatBlockParas(sec1)}
            </div>
            ${renderArchivalSourceBox(leftSources.sourceA)}
          </div>
          <div class="col-side">
            <div class="col-top-group">
              <div class="section-banner">
                <span class="sb-num">ACT 2</span>
                <span class="sb-title">${(sec2.title || 'Escalation & Conflict').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
              </div>
              ${formatBlockParas(sec2)}
            </div>
            ${renderArchivalSourceBox(leftSources.sourceB)}
          </div>
        </div>

        <!-- Bottom Fingertip Vocabulary Deck -->
        <div class="bottom-vocab-box">
          <div class="bvb-header">
            <span class="bvb-title">CORE DISCIPLINARY TERMINOLOGY &bull; LESSON ${lessonNum}</span>
            <span class="bvb-badge">KEY STAGE 3 VOCABULARY</span>
          </div>
          <div class="bvb-grid">
            ${vocabTerms
              .map(
                (v) => `
              <div class="bvb-col">
                <strong>${v.term}</strong>
                ${v.def}
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Page Footer -->
        <div class="page-footer">
          <span>Industrialisation, Empire &amp; Power (1750–1901) &bull; Lesson ${lessonNum}</span>
          <span>Page ${leftPageNum}</span>
        </div>

      </div>
    </div>

    <!-- PAGE ${rightPageNum}: Lesson ${lessonNum} Right Page (Recto) -->
    <div class="textbook-page" data-page="${rightPageNum}">
      <div class="page-inner">
        
        <!-- Right Page Header -->
        <div class="right-page-header">
          <div class="rph-meta">
            <span class="rph-tag">PRIMARY ARCHIVE &amp; HISTORICAL VERDICT</span>
            <span class="rph-lesson">LESSON ${lessonNum}: ACTS 3 &amp; 4</span>
          </div>
          <h3 class="rph-title">${lesson.title}</h3>
        </div>

        <!-- Right Page Content Layout -->
        <div class="right-page-content">
          <div class="right-upper-grid">
            <div class="col-side">
              <div class="col-top-group">
                <div class="section-banner">
                  <span class="sb-num">ACT 3</span>
                  <span class="sb-title">${(sec3.title || 'Forensic Archival Evidence').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
                </div>
                ${formatBlockParas(sec3)}
              </div>
              ${
                bank.keyFigure
                  ? `
              <div class="key-figure-box">
                <div class="kf-header">
                  <span class="kf-tag">${bank.keyFigure.badge || bank.keyFigure.category || 'KEY FIGURE'}</span>
                  <span class="kf-lifespan">${bank.keyFigure.lifespan}</span>
                </div>
                <div class="kf-identity-row">
                  ${
                    bank.keyFigure.image && bank.keyFigure.image !== 'monogram'
                      ? `<img class="kf-portrait" src="${bank.keyFigure.image}" alt="${bank.keyFigure.name}">`
                      : ''
                  }
                  <div class="kf-identity-text">
                    <div class="kf-name">${bank.keyFigure.name}</div>
                    <div class="kf-role">${bank.keyFigure.role}</div>
                  </div>
                </div>
                <div class="kf-significance">${bank.keyFigure.significance}</div>
                <div class="kf-actions-title">DECISIVE ACTIONS:</div>
                <ul class="kf-actions-list">
                  ${bank.keyFigure.actions.map((a) => `<li>${a}</li>`).join('')}
                </ul>
              </div>`
                  : ''
              }
            </div>
            <div class="col-side">
              <div class="col-top-group">
                <div class="section-banner">
                  <span class="sb-num">ACT 4</span>
                  <span class="sb-title">${(sec4.title || 'The Historical Verdict & Historiographical Debate').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
                </div>
                ${formatBlockParas(sec4)}
              </div>
              ${bank.conceptSpotlight || ''}
            </div>
          </div>

          ${
            bank.archivalDispatch
              ? `
          <div class="fullwidth-dispatch-wrap">
            ${bank.archivalDispatch}
          </div>`
              : ''
          }
        </div>

        <!-- Lesson Enquiry & Writing Tasks Box -->
        <div class="bottom-enquiry-box">
          <div class="beb-header">
            <span class="beb-title">LESSON ENQUIRY &amp; WRITING TASKS &bull; LESSON ${lessonNum}</span>
            <span class="beb-badge">${lesson.skill || 'DISCIPLINARY WRITING'}</span>
          </div>
          <div class="beb-mission-content">
            <div class="beb-task-row">
              <span class="beb-task-tag">TASK 3: EVIDENCE PREPARATION</span>
              <span class="beb-task-text">${task3Instruction}</span>
            </div>
            <div class="beb-task-row">
              <span class="beb-task-tag">TASK 4: EXTENDED WRITING</span>
              <span class="beb-task-text"><strong>Enquiry Question:</strong> ${task4Question}</span>
            </div>
            <div class="beb-workbook-signpost">
              <span>&rarr; <strong>Pupil Workbook:</strong> Turn to Lesson ${lessonNum} (pages ${wbPages}) in your Pupil Workbook to complete your Task 3 evidence notes and Task 4 written response.</span>
            </div>
          </div>
        </div>

        <!-- Page Footer -->
        <div class="page-footer">
          <span>Industrialisation, Empire &amp; Power (1750–1901) &bull; Primary Archival Core</span>
          <span>Page ${rightPageNum}</span>
        </div>

      </div>
    </div>
    `;
  });

  const qrLessons = [
    {
      num: 'Lesson 1',
      title: 'Cort & Metallurgy',
      url: 'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire&lesson=0',
    },
    {
      num: 'Lesson 2',
      title: 'Industrial Work',
      url: 'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire&lesson=1',
    },
    {
      num: 'Lesson 3',
      title: 'Slums & Public Health',
      url: 'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire&lesson=2',
    },
    {
      num: 'Lesson 4',
      title: 'Empire & Navy',
      url: 'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire&lesson=3',
    },
    {
      num: 'Lesson 5',
      title: '1857 Indian Rebellion',
      url: 'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire&lesson=4',
    },
    {
      num: 'Lesson 6',
      title: 'Peterloo & Chartism',
      url: 'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire&lesson=5',
    },
    {
      num: 'Lesson 7',
      title: 'Road to Democracy',
      url: 'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire&lesson=6',
    },
    {
      num: 'Lesson 8',
      title: 'Industrial Verdict',
      url: 'https://the-history-revision-hub.netlify.app/?unit=industrialisation_and_empire&lesson=7',
    },
  ];

  const qrCardsHtml = qrLessons
    .map(
      (l) => `
    <div class="bqr-card">
      <div class="bqr-header">
        <span class="bqr-num">${l.num}</span>
        <span class="bqr-title">${l.title}</span>
      </div>
      <div class="bqr-code-box">
        ${generateQrSvg(l.url)}
      </div>
      <div class="bqr-footer">Interactive Hub &bull; Quiz</div>
    </div>
  `,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Industrialisation, Empire &amp; Power (1750–1901) — Master Publisher Textbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.55pt;
      line-height: 1.46;
      color: #1e293b;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .textbook-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 11mm 13mm 9mm 13mm;
      background: #ffffff;
      margin: 0 auto 10mm auto;
      page-break-after: always;
      break-after: always;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    @media print {
      body { background: #ffffff; }
      .textbook-page { margin: 0; }
    }

    .page-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Lesson Header */
    .lesson-header {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 4px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 6.8pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 12.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 2px 0 2px 0;
      line-height: 1.18;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #334155;
      line-height: 1.3;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      padding: 2px 6px;
      border-radius: 0 3px 3px 0;
    }

    /* Right Page Header */
    .right-page-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .rph-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }
    .rph-tag { color: #1e3a8a; }
    .rph-lesson { color: #64748b; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.2pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.18;
    }

    /* Balanced 2-Column Grid Layout (Left Page) */
    .two-column-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 5mm;
      flex: 1;
      overflow: hidden;
      margin-bottom: 2px;
    }
    .col-side {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 6px;
      height: 100%;
      overflow: hidden;
    }
    .col-top-group {
      display: flex;
      flex-direction: column;
    }
    .col-side .archival-source-box {
      margin: 0;
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .two-column-grid .narrative-p {
      margin: 0 0 2px 0;
      line-height: 1.30;
    }
    .two-column-grid .archival-source-box {
      padding: 3px 5px;
    }
    .two-column-grid .archival-image {
      max-height: 145px;
      min-height: 75px;
      height: 100%;
      flex: 1;
      min-height: 0;
      object-fit: contain !important;
    }
    .two-column-grid .archival-context-box {
      padding: 2px 4px;
      margin: 1.5px 0;
    }
    .two-column-grid .archival-context-text {
      font-size: 7.7pt;
      line-height: 1.22;
      margin: 0 0 1px 0;
    }
    .two-column-grid .archival-hinge-q {
      font-size: 7.6pt;
      line-height: 1.22;
    }

    /* Right Page 2-Tier Balanced Layout */
    .right-page-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin-bottom: 2px;
    }
    .right-upper-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 5mm;
      flex: 1;
      overflow: hidden;
    }
    .right-upper-grid .col-side {
      justify-content: flex-start;
      gap: 5px;
    }
    .right-upper-grid .col-side .key-figure-box,
    .right-upper-grid .col-side .concept-spotlight-box {
      margin: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .fullwidth-dispatch-wrap {
      flex-shrink: 0;
      margin: 2.5px 0 1px 0;
    }
    .fullwidth-dispatch-wrap .archival-source-box {
      margin: 0;
    }

    /* Legacy fallback */
    .two-column-prose {
      display: none;
    }

    .section-banner {
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      border-bottom: 1px solid #e2e8f0;
      padding: 2px 6px;
      border-radius: 0 3px 3px 0;
      margin: 2px 0 2px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Inter', sans-serif;
      break-after: avoid;
    }
    .sb-num {
      font-size: 8.0pt;
      font-weight: 900;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .sb-title {
      font-size: 8.4pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      margin: 0 0 4px 0;
      text-indent: 1.0em;
    }
    .narrative-p:first-of-type, .section-banner + .narrative-p {
      text-indent: 0;
    }

    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      margin-right: 4px;
      vertical-align: baseline;
      letter-spacing: 0.02em;
    }

    /* Archival Source Box */
    .archival-source-box {
      background: #fdfaf6;
      border: 1px solid #e7e5e4;
      border-left: 3px solid #78716c;
      border-radius: 3px;
      padding: 4px 6px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .source-badge {
      font-size: 8.0pt;
      font-weight: 900;
      color: #fff;
      background: #0f172a;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .source-type {
      font-size: 8.0pt;
      font-weight: 700;
      color: #78716c;
      text-transform: uppercase;
      margin-left: 4px;
    }
    .source-date-micro {
      font-size: 8.0pt;
      font-weight: 600;
      color: #78716c;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.4pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
      line-height: 1.15;
    }
    .archival-image {
      width: 100%;
      height: 125px;
      object-fit: contain;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 2px;
      margin-bottom: 2.5px;
      display: block;
    }
    .archival-source-box.expand-sm .archival-image {
      height: 95px;
    }
    .archival-source-box.expand-md .archival-image {
      height: 135px;
    }
    .archival-source-box.expand-lg .archival-image {
      height: 145px;
    }
    .archival-source-box.panoramic-source {
      column-span: all;
      margin: 3px 0 4px 0;
    }
    .archival-source-box.panoramic-source .archival-image {
      height: 120px;
      width: 100%;
      object-fit: contain;
    }
    .archival-body {
      font-size: 8.8pt;
      line-height: 1.34;
      color: #292524;
      font-style: italic;
      margin-bottom: 2.5px;
    }
    .written-source-box .archival-body {
      background: #fafaf9;
      border-left: 2px solid #78716c;
      padding: 3.5px 5.5px;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 8.8pt;
      line-height: 1.34;
      color: #1c1917;
      font-style: italic;
      margin-bottom: 2.5px;
    }
    .archival-context-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0284c7;
      padding: 2.5px 4.5px;
      margin: 2px 0;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
    }
    .archival-context-text {
      font-size: 8.0pt;
      line-height: 1.28;
      color: #334155;
      margin: 0 0 1.5px 0;
    }
    .archival-hinge-q {
      font-size: 8.1pt;
      line-height: 1.28;
      color: #0f172a;
      background: #f0f9ff;
      padding: 1.5px 3.5px;
      border-radius: 2px;
      margin-top: 1.5px;
    }
    .archival-hinge-q strong {
      color: #0369a1;
      text-transform: uppercase;
      font-size: 8.0pt;
      letter-spacing: 0.03em;
    }
    .archival-footer {
      border-top: 1px dashed #d6d3d1;
      padding-top: 1.5px;
      margin-top: 1.5px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      color: #78716c;
      font-weight: 600;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 4px 6px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .kf-tag {
      font-size: 8.0pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .kf-lifespan {
      font-size: 8.0pt;
      color: #64748b;
      font-weight: 600;
    }
    .kf-identity-row {
      display: flex;
      gap: 6px;
      align-items: center;
      margin-bottom: 2.5px;
    }
    .kf-portrait {
      width: 42px;
      height: 50px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #94a3b8;
      flex-shrink: 0;
    }
    .kf-identity-text { flex: 1; }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 10.4pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }
    .kf-role {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      line-height: 1.2;
    }
    .kf-significance {
      font-size: 8.5pt;
      font-style: italic;
      color: #334155;
      line-height: 1.30;
      margin-bottom: 2.5px;
    }
    .kf-actions-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      margin: 2px 0 1px 0;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      line-height: 1.28;
      color: #1e293b;
    }
    .kf-actions-list li { margin-bottom: 1px; }

    /* Concept Spotlight Box */
    .concept-spotlight-box {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 3px;
      padding: 4px 6px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
      border-bottom: 1px solid #ffedd5;
      padding-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .csb-tag {
      font-size: 8.0pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
    }
    .csb-category {
      font-size: 8.0pt;
      font-weight: 700;
      color: #b45309;
      background: #ffedd5;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.5pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0 2px 0;
      line-height: 1.15;
    }
    .csb-body {
      font-size: 8.8pt;
      line-height: 1.32;
      color: #1e293b;
      margin-bottom: 2.5px;
    }
    .csb-takeaway {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 600;
      color: #78350f;
      background: #fef3c7;
      border-left: 2px solid #d97706;
      padding: 1.5px 4.5px;
      border-radius: 0 2px 2px 0;
    }

    /* Bottom Decks */
    .bottom-vocab-box, .bottom-enquiry-box {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      margin-top: auto;
      margin-bottom: 1px;
      padding: 5px 8px;
      border-radius: 3px;
      font-family: 'Inter', sans-serif;
    }
    .bottom-vocab-box {
      background: #fdfaf6;
      border: 1.2px solid #fed7aa;
      border-top: 2.5px solid #b45309;
    }
    .bvb-header, .beb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5px;
    }
    .bvb-title {
      font-size: 8.2pt;
      font-weight: 900;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .bvb-badge, .beb-badge {
      font-size: 8.0pt;
      font-weight: 800;
      background: #0f172a;
      color: #fff;
      padding: 1px 5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 7px;
      font-size: 8.8pt;
      line-height: 1.34;
      color: #334155;
    }
    .bvb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 8.8pt;
    }

    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
    }
    .beb-title {
      font-size: 8.2pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .beb-mission-content {
      padding: 2px 0 1px 0;
      display: flex;
      flex-direction: column;
      gap: 2.5px;
    }
    .beb-task-row {
      display: flex;
      gap: 6px;
      align-items: baseline;
    }
    .beb-task-tag {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 800;
      color: #1e3a8a;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .beb-task-text {
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      color: #334155;
      line-height: 1.28;
    }
    .beb-task-text strong {
      color: #0f172a;
    }
    .beb-workbook-signpost {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      color: #475569;
      border-top: 1px dashed #cbd5e1;
      padding-top: 1.5px;
      margin-top: 1px;
    }
    .beb-workbook-signpost strong {
      color: #1e3a8a;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      margin-top: 3px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Cover Page */
    .cover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 16px 20px;
      box-sizing: border-box;
    }
    .cover-top { text-align: center; }
    .cover-dept-banner {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 12px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .cover-series {
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }
    .cover-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 3px 0 2px 0;
      text-transform: uppercase;
    }
    .cover-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 10.5pt;
      font-style: italic;
      color: #475569;
      margin-bottom: 6px;
    }
    .cover-plate-wrapper {
      text-align: center;
      margin: 3px 0;
    }
    .cover-plate-img {
      height: 82mm;
      max-height: 85mm;
      max-width: 100%;
      width: auto;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      display: block;
      margin: 0 auto;
    }
    .cover-plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      color: #64748b;
      margin-top: 3px;
      font-style: italic;
    }
    .cover-enquiry-box {
      background: #f8fafc;
      border-left: 4px solid #1e3a8a;
      padding: 5px 10px;
      margin: 5px 0;
      font-family: 'Inter', sans-serif;
      text-align: left;
    }
    .ceb-label {
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .ceb-text {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.8pt;
      font-style: italic;
      color: #0f172a;
      margin-top: 1px;
    }
    .cover-matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      margin-top: 4px;
    }
    .cover-matrix-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 1.8mm 2.2mm;
      text-align: left;
      font-weight: 800;
      font-size: 7.2pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cover-matrix-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 1.8mm 2.2mm;
      color: #334155;
      font-size: 7.2pt;
      line-height: 1.25;
    }
    .cover-matrix-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .cover-footer {
      border-top: 1.5px solid #0f172a;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      color: #475569;
      font-weight: 700;
    }

    /* Master Back Cover Architecture */
    .back-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 16px 20px 14px 20px;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    .back-body-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .back-header-strip {
      text-align: center;
      margin-bottom: 5px;
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 4px;
    }
    .back-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 15.5pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin: 0;
      line-height: 1.15;
      letter-spacing: 0.02em;
    }
    .back-subtitle {
      font-size: 7.8pt;
      color: #475569;
      margin-top: 2px;
      font-style: italic;
      font-weight: 500;
    }
    .back-section-title {
      font-size: 8.2pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2px;
      margin: 4px 0 2.5px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .back-section-tag {
      font-size: 7.2pt;
      font-weight: 700;
      color: #1e3a8a;
      letter-spacing: 0.03em;
    }
    .back-timeline-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 7.5pt;
      line-height: 1.30;
    }
    .bt-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      padding: 4px 6px;
      border-radius: 0 2px 2px 0;
    }
    .bt-card strong { color: #1e3a8a; font-weight: 800; font-size: 7.6pt; }
    
    .back-thematic-matrix {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      font-size: 7.5pt;
      line-height: 1.30;
    }
    .bmm-col {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      padding: 5px 6.5px;
      border-radius: 2px;
    }
    .bmm-col strong {
      display: block;
      color: #1e3a8a;
      text-transform: uppercase;
      font-size: 7.6pt;
      font-weight: 800;
      margin-bottom: 2px;
    }
    
    .back-historiography-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 7.5pt;
      line-height: 1.30;
    }
    .bh-card {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 2.5px solid #b45309;
      padding: 5px 6.5px;
      border-radius: 2px;
    }
    .bh-card strong {
      display: block;
      color: #92400e;
      text-transform: uppercase;
      font-size: 7.6pt;
      font-weight: 800;
      margin-bottom: 2px;
    }

    .back-writing-scaffold-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 7.5pt;
      line-height: 1.30;
    }
    .bws-col {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-top: 2.5px solid #2563eb;
      padding: 5px 6.5px;
      border-radius: 2px;
    }
    .bws-col strong {
      display: block;
      color: #1e40af;
      text-transform: uppercase;
      font-size: 7.6pt;
      font-weight: 800;
      margin-bottom: 2px;
    }

    /* Section 5: QR Quick-Launch Grid */
    .back-qr-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 4.5px;
      margin-top: 2px;
    }
    .bqr-card {
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 4px 2px 3px 2px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .bqr-header {
      width: 100%;
      margin-bottom: 2px;
    }
    .bqr-num {
      display: block;
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .bqr-title {
      display: block;
      font-size: 5.6pt;
      font-weight: 700;
      color: #334155;
      line-height: 1.15;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
    }
    .bqr-code-box {
      width: 48px;
      height: 48px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 1.5px;
      box-sizing: border-box;
      border-radius: 2px;
    }
    .bqr-footer {
      font-size: 5.2pt;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-top: 2px;
      border-top: 1px solid #f1f5f9;
      padding-top: 1.5px;
      width: 100%;
    }
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- PAGE 1: MASTER FRONT COVER                 -->
  <!-- ========================================== -->
  <div class="textbook-page" data-page="1">
    <div class="cover-container">
      <div class="cover-top">
        <div class="cover-dept-banner" data-department-name="The History Department">
          <span class="school-brand-target">The History Department</span>
        </div>
        <div class="cover-series">Key Stage 3 Master Curriculum Series</div>
        <h1 class="cover-title">Industrialisation, Empire &amp; Power (1750–1901)</h1>
        <div class="cover-subtitle">Britain’s Transformation from Agrarian Kingdom to Global Workshop: Steam, Slums, Empire &amp; Democracy</div>
      </div>

      <div class="cover-plate-wrapper">
        <img class="cover-plate-img" src="${coverImgData}" alt="Imperial Federation Map (1886)">
        <div class="cover-plate-caption">Primary Artifact: Walter Crane, <em>Imperial Federation: Map of the World Showing the Extent of the British Empire</em> (1886), illustrating British global industrial and maritime supremacy.</div>
      </div>

      <div class="cover-enquiry-box">
        <div class="ceb-label">Overarching Historical Enquiry:</div>
        <div class="ceb-text">"How did 19th-century Britain transform from an agrarian realm into the Workshop of the World, and who paid the price for this transformation?"</div>
      </div>

      <table class="cover-matrix-table">
        <thead>
          <tr>
            <th style="width: 12%;">Lesson</th>
            <th style="width: 46%;">Historical Enquiry &amp; Narrative Focus</th>
            <th style="width: 30%;">Disciplinary Skill &amp; Assessment Focus</th>
            <th style="width: 12%;">Page Ref</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Lesson 1</strong></td>
            <td>What powered the Industrial Revolution? Henry Cort, Puddling &amp; The Iron Revolution</td>
            <td>Causal Explanation &amp; Technological Catalysts</td>
            <td>pp. 2–3</td>
          </tr>
          <tr>
            <td><strong>Lesson 2</strong></td>
            <td>Was industrial work progress or punishment? Child Labour, Mills &amp; Brickworks</td>
            <td>Source Utility &amp; Evaluating Workplace Conditions</td>
            <td>pp. 4–5</td>
          </tr>
          <tr>
            <td><strong>Lesson 3</strong></td>
            <td>Did industrialisation make British towns unlivable? Slum Squalor, Cholera &amp; Sewers</td>
            <td>Historical Interpretations &amp; Public Health Reform</td>
            <td>pp. 6–7</td>
          </tr>
          <tr>
            <td><strong>Lesson 4</strong></td>
            <td>How was the British Empire built and sustained? Royal Navy, Steam &amp; Extraction</td>
            <td>Historical Consequence &amp; Commercial Monopoly</td>
            <td>pp. 8–9</td>
          </tr>
          <tr>
            <td><strong>Lesson 5</strong></td>
            <td>How did the Empire strike back? The 1857 Indian Rebellion &amp; Fall of the Company</td>
            <td>Historical Significance &amp; Anti-Colonial Resistance</td>
            <td>pp. 10–11</td>
          </tr>
          <tr>
            <td><strong>Lesson 6</strong></td>
            <td>How did ordinary people fight for a voice? Peterloo, Tolpuddle &amp; Chartism</td>
            <td>Change &amp; Continuity &amp; Working-Class Agitation</td>
            <td>pp. 12–13</td>
          </tr>
          <tr>
            <td><strong>Lesson 7</strong></td>
            <td>How did the road to democracy expand? Rotten Boroughs, 1832 &amp; Secret Ballot</td>
            <td>Causation &amp; The Extension of the Franchise</td>
            <td>pp. 14–15</td>
          </tr>
          <tr>
            <td><strong>Lesson 8</strong></td>
            <td>Who truly benefited from 19th-century transformation? The Historical Verdict</td>
            <td>Synoptic Evaluation &amp; Historiographical Debate</td>
            <td>pp. 16–17</td>
          </tr>
        </tbody>
      </table>

      <div class="cover-footer">
        <span>The History Revision Hub &bull; Student Textbook Edition</span>
        <span>Verified Print Publication &bull; September 2026</span>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- PAGES 2–17: 8 CORE ENQUIRY LESSONS         -->
  <!-- ========================================== -->
  ${lessonsHtml}

  <!-- ========================================== -->
  <!-- PAGE 18: MASTER REVISION BACK COVER        -->
  <!-- ========================================== -->
  <div class="textbook-page" data-page="18">
    <div class="back-container">
      <div class="back-body-content">
        <div class="back-header-strip">
          <h2 class="back-title">Industrialisation, Empire &amp; Power (1750–1901) &bull; Master Revision Index</h2>
          <div class="back-subtitle">Comprehensive Chronological Sequence, Four-Pillar Causal Matrix, Academic Historiography &amp; Disciplinary Writing Framework</div>
        </div>

        <div class="back-section-title">
          <span>1. Master Chronological Sequence (1750–1901)</span>
          <span class="back-section-tag">Key Turning Points</span>
        </div>
        <div class="back-timeline-grid">
          <div class="bt-card"><strong>1769:</strong> James Watt patents separate condenser steam engine, revolutionising rotative mechanical power.</div>
          <div class="bt-card"><strong>1779:</strong> Abraham Darby III completes the world’s first cast-iron bridge over the River Severn at Coalbrookdale.</div>
          <div class="bt-card"><strong>1783–84:</strong> Henry Cort patents reverberatory puddling and grooved rolling mills at Funtley, Hampshire.</div>
          <div class="bt-card"><strong>1807:</strong> Parliament passes the Slave Trade Act, abolishing British colonial trafficking in enslaved human beings.</div>
          <div class="bt-card"><strong>16 Aug 1819:</strong> Peterloo Massacre; cavalry charges 60,000 peaceful voting reformers in Manchester.</div>
          <div class="bt-card"><strong>Autumn 1830:</strong> "Captain Swing" agricultural riots destroy threshing machines across southern England and Hampshire.</div>
          <div class="bt-card"><strong>June 1832:</strong> Great Reform Act abolishes 56 rotten boroughs and enfranchises industrial cities like Manchester and Leeds.</div>
          <div class="bt-card"><strong>1833:</strong> Factory Act introduces first statutory inspectors and bans textile employment for children under nine.</div>
          <div class="bt-card"><strong>March 1834:</strong> Six Tolpuddle agricultural labourers sentenced to seven years penal transportation for trade union oath.</div>
          <div class="bt-card"><strong>May 1838:</strong> William Lovett and LWMA publish the People’s Charter demanding universal adult male suffrage.</div>
          <div class="bt-card"><strong>July 1842:</strong> Edwin Chadwick publishes landmark Report on the Sanitary Condition of the Labouring Population.</div>
          <div class="bt-card"><strong>1847:</strong> Ten Hours Act restricts daily factory work for women and young persons to ten hours.</div>
          <div class="bt-card"><strong>May–Oct 1851:</strong> The Great Exhibition at Crystal Palace showcases British industrial supremacy to over six million visitors.</div>
          <div class="bt-card"><strong>May 1857:</strong> Indian Rebellion erupts at Meerut; sepoys and princes challenge British East India Company rule.</div>
          <div class="bt-card"><strong>Summer 1858:</strong> The "Great Stink" of London forces Parliament to fund Bazalgette’s 1,100-mile brick sewer network.</div>
          <div class="bt-card"><strong>August 1858:</strong> Government of India Act dissolves East India Company; direct British Crown Raj is established.</div>
          <div class="bt-card"><strong>July 1872:</strong> Ballot Act introduces secret voting, ending open hustings bribery and landlord intimidation.</div>
          <div class="bt-card"><strong>22 Jan 1901:</strong> Death of Queen Victoria; Britain commands global industrial, naval, and imperial hegemony.</div>
        </div>

        <div class="back-section-title">
          <span>2. The Four Victorian Engines: Cross-Enquiry Causation Matrix</span>
          <span class="back-section-tag">Interconnected Systems</span>
        </div>
        <div class="back-thematic-matrix">
          <div class="bmm-col">
            <strong>1. Energy &amp; Metallurgy</strong>
            Coal extraction and Cort’s puddling process broke the timber-charcoal bottleneck, supplying unbreakable iron for steam boilers, railways, and iron warships.
          </div>
          <div class="bmm-col">
            <strong>2. Slums &amp; Public Health</strong>
            Unchecked urban migration generated lethal cholera epidemics, forcing Chadwick’s sanitary revolution and Bazalgette’s massive subterranean sewer infrastructure.
          </div>
          <div class="bmm-col">
            <strong>3. Imperial Extraction</strong>
            Portsmouth-built gunboats and raw cotton tariffs turned India into a captive market, extracting wealth to finance British industrial capital expansion.
          </div>
          <div class="bmm-col">
            <strong>4. Radicalism &amp; Democracy</strong>
            Peterloo, Tolpuddle, and Chartism compelled governing elites to concede voting reform (1832, 1867, 1872, 1884) to avert violent working-class revolution.
          </div>
        </div>

        <div class="back-section-title">
          <span>3. Master Historiographical Perspectives on 19th-Century Transformation</span>
          <span class="back-section-tag">Academic Debate</span>
        </div>
        <div class="back-historiography-grid">
          <div class="bh-card">
            <strong>The Optimist School (Clapham, Ashton, Hartwell)</strong>
            Argues industrialisation raised long-term real wages, eliminated seasonal famines, stimulated consumer goods, and built modern sanitary medicine and civil infrastructure.
          </div>
          <div class="bh-card">
            <strong>The Pessimist School (Engels, Thompson, Hobsbawm)</strong>
            Argues industrialisation was a human catastrophe: life expectancies under twenty in slums, two generations physically broken in mills, and craft autonomy destroyed.
          </div>
          <div class="bh-card">
            <strong>The Imperial Ledger (Naoroji, Dutt, Tharoor)</strong>
            Demonstrates British domestic wealth was financed by uncompensated colonial extraction (£30–40m annually from India) and deliberate deindustrialisation of Asian textiles.
          </div>
        </div>

        <div class="back-section-title">
          <span>4. Disciplinary Extended Writing Framework</span>
          <span class="back-section-tag">Evaluative Argumentation</span>
        </div>
        <div class="back-writing-scaffold-grid">
          <div class="bws-col">
            <strong>Point &amp; Evidence Stems</strong>
            "A decisive catalyst for Victorian transformation was... for example, following [Date], [Figure/Group] introduced [Mechanism], which directly resulted in..."
          </div>
          <div class="bws-col">
            <strong>Causal Connectives</strong>
            "Consequently...", "This directly compelled Parliament to...", "In reaction, working-class radicals mobilized to...", "This fundamentally altered the balance between..."
          </div>
          <div class="bws-col">
            <strong>Evaluative Judgement Criteria</strong>
            "While [Factor A] provided the economic wealth, [Factor B] was more decisive because without [sanitary engineering / franchise expansion], industrial gains remained..."
          </div>
        </div>

        <div class="back-section-title">
          <span>5. Interactive Revision Hub &bull; Lesson QR Quick-Launch</span>
          <span class="back-section-tag">Digital Retrieval &amp; Audio</span>
        </div>
        <div class="back-qr-grid">
          ${qrCardsHtml}
        </div>
      </div>

      <div class="cover-footer">
        <span>The History Revision Hub &bull; Master Revision Index</span>
        <span>Key Stage 3 Disciplinary Series &bull; Page 18 of 18</span>
      </div>
    </div>
  </div>

</body>
</html>`;
}

/**
 * Main Compilation Execution
 */
async function renderPublisherTextbook() {
  console.log(
    '🚀 Compiling Publisher-Level Standard Textbook for Industrialisation, Empire & Power...',
  );
  const html = await buildPublisherTextbookHtmlIndustrialisation();

  const publicHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'industrialisation_and_empire',
    'textbook_PUBLISHER.html',
  );
  const unitHtmlPath = path.join(
    ROOT_DIR,
    'units',
    'industrialisation_and_empire',
    'textbook.html',
  );
  const outPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'industrialisation_and_empire_textbook_PUBLISHER.pdf',
  );

  fs.mkdirSync(path.dirname(publicHtmlPath), { recursive: true });
  fs.mkdirSync(path.dirname(outPdfPath), { recursive: true });

  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  console.log(`✅ Saved HTML companion to: ${publicHtmlPath}`);

  fs.writeFileSync(unitHtmlPath, html, 'utf8');
  console.log(`✅ Updated unit textbook.html: ${unitHtmlPath}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  // Audit page budget
  console.log('\nAuditing Page Budget...');
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.textbook-page, .page, .a4-page',
      underflowThresholdPx: 40,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 25,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, path.basename(publicHtmlPath));
  } catch (err) {
    console.warn('Audit warning:', err.message);
  }

  await browser.close();
  console.log(`🎉 Masterpiece PDF Textbook Industrialisation successfully compiled!`);
  console.log(`📄 PDF Output: ${outPdfPath}`);
}

if (require.main === module) {
  renderPublisherTextbook().catch((err) => {
    console.error('Fatal rendering error:', err);
    process.exit(1);
  });
}

module.exports = {
  buildPublisherTextbookHtmlIndustrialisation,
  renderPublisherTextbook,
  runIndustrialisation: renderPublisherTextbook,
  run: renderPublisherTextbook,
};
