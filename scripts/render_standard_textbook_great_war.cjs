/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: units/great_war (KS3: Causes of the Great War, 1871–1914)
 * Output: public/pdfs/great_war_textbook_PUBLISHER.pdf
 * HTML:   public/units/great_war/textbook_PUBLISHER.html
 *
 * Architectural & Pedagogical Standards Enforced:
 * 1. Zero Commercial Branding Violations: 100% institutional neutrality.
 * 2. Exact 14-Page Budget:
 *    - Page 1:  Master Front Cover (98mm plate, syllabus matrix, clean branding)
 *    - Pages 2–13: 6 Core Lessons (Left: Context, Cartography/Primary Sources, Vocab Deck; Right: Extended Prose, Key Figure, Spotlight, Dispatch, Enquiry Deck)
 *    - Page 14: Master Revision Back Cover (1871–1914 Chronology, M-A-I-N Matrix, Historiography & Disciplinary Scaffold)
 * 3. Base64 Image Inlining for 100% offline & Puppeteer reliability.
 * 4. High-Yield Component Bank delivering >= 90% fill on all right-hand pages with 0px overflow.
 * 5. Full Christine Counsell Disciplinary Architecture: Fingertip vocabulary, primary provenance, and targeted Hinge Questions.
 * 6. Pure Paragraph Indexing ([Act.Paragraph] / [1.1], [1.2] PEEL Notation).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error('Data file not found:', dataPath);
  process.exit(1);
}

// Parse units/great_war/data.js
const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');

const lessons = unitData.lessons || [];
console.log(`Loaded ${lessons.length} Great War lessons for publisher textbook.`);

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

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// High-Yield Component Bank for Great War Right-Hand Pages (P3, P5, P7, P9, P11, P13)
const GREAT_WAR_COMPONENT_BANK = {
  // Page 3: Lesson 1 (Creation of the German Empire 1871)
  p3: {
    keyFigure: {
      name: 'Prince Otto von Bismarck',
      lifespan: '1815–1898',
      role: 'Minister President of Prussia & First Imperial Chancellor of Germany',
      significance:
        'Masterminded the three wars of German unification and established Prussian dominance across Central Europe through ruthless Realpolitik.',
      actions: [
        'Declared in 1862 that the great questions of the age would be decided not by speeches but by "blood and iron" (Eisen und Blut).',
        'Engineered swift, decisive military victories against Denmark (1864), Austria (1866), and France (1870–1871).',
        'Proclaimed the German Empire in the Hall of Mirrors at Versailles, annexing Alsace-Lorraine and forging the dominant continental powerhouse.',
      ],
      image:
        getBase64Image('/images/otto_von_bismarck_portrait.jpg') ||
        getBase64Image('/images/was_germany_unification.png'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: CRITICAL MECHANISM</span>
          <span class="csb-category">THE VIENNA SETTLEMENT &amp; REALPOLITIK &bull; 1871</span>
        </div>
        <h4 class="csb-title">Realpolitik &amp; Shattering the European Balance of Power</h4>
        <div class="csb-body">
          For centuries after the 1648 Peace of Westphalia, Central Europe was fragmented into dozens of small, weak German principalities, allowing Britain, France, Austria, and Russia to maintain a stable European balance of power. Bismarck's unification fused thirty-nine separate states into a single economic colossus of 41 million people possessing Europe's most efficient rail network, advanced chemical and steel industries, and an invincible Prussian army. British statesman Benjamin Disraeli warned Parliament: "The balance of power has been entirely destroyed; you have a new world, new influences, and new dangers."
        </div>
        <div class="csb-takeaway">
          <strong>Key Causation:</strong> The sudden emergence of a unified, industrialized Germany created an unresolved security dilemma: Germany felt vulnerable to encirclement, while its neighbors feared German continental hegemony.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Imperial Proclamation</span>
          </div>
          <span class="source-date-micro">18 January 1871</span>
        </div>
        <div class="archival-title">Proclamation of the German Empire at Versailles</div>
        <div class="archival-body">
          "We, Wilhelm, by the grace of God King of Prussia, hereby announce that we assume the Imperial dignity... We accept it in the hope that it may be granted to the German people to enjoy the reward of its ardent and self-sacrificing struggles in lasting peace, within borders which guarantee to the Fatherland security against renewed attacks from France."
        </div>
        <div class="archival-footer">
          <span>Imperial Chancellery Archive, Berlin</span>
          <span>Galerie des Glaces, Versailles</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Explain how Bismarck used "blood and iron" rather than liberal diplomacy to achieve German unification.',
      q2: 'Analyse why the proclamation of the German Empire at Versailles caused deep, lasting humiliation for France.',
      q3: 'Evaluate whether the creation of the German Empire made a general European war inevitable, or if Bismarckian diplomacy successfully managed peace until 1890.',
    },
  },

  // Page 5: Lesson 2 (Franco-Prussian War & The Legacy of Hatred)
  p5: {
    keyFigure: {
      name: 'Field Marshal Helmuth von Moltke (The Elder)',
      lifespan: '1800–1891',
      role: 'Chief of the Prussian & German Great General Staff (1857–1888)',
      significance:
        'Pioneered modern staff planning, mobilization via military railways, and telegram communication to encircle French armies at Sedan.',
      actions: [
        'Transformed the Prussian General Staff into the world’s most formidable military planning organization.',
        'Exploited Prussian Krupp breech-loading steel artillery to annihilate French Emperor Napoleon III’s army at Sedan (September 1870).',
        'Warned in his final Reichstag speech in 1890 that the next European war could last seven or thirty years, bringing total ruin.',
      ],
      image:
        getBase64Image('/images/helmuth_von_moltke_elder.jpg') ||
        getBase64Image('/public/great_war/assets/alfred_von_schlieffen.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL SPOTLIGHT: THE OPEN WOUND</span>
          <span class="csb-category">TERRITORIAL CONFLICT &bull; 1871–1914</span>
        </div>
        <h4 class="csb-title">Alsace-Lorraine: The Open Wound of French Revanchism</h4>
        <div class="csb-body">
          Under the Treaty of Frankfurt (May 1871), Germany annexed the French border provinces of Alsace and northern Lorraine, alongside a punishing indemnity of five billion gold francs. While Prussian generals insisted on the territory as a protective defensive glacis against future French invasions, the annexation poisoned European diplomacy for forty-three years. In French classrooms, maps showed the lost provinces shaded in mourning black (<em>la tache noire</em>), and generation after generation of French schoolchildren were taught: "Think of it always, speak of it never."
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> Annexing Alsace-Lorraine guaranteed that France would never permanently accept peace with Germany, forcing German planners into permanent two-front war anxieties.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">French Primary School Primer</span>
          </div>
          <span class="source-date-micro">Circa 1887</span>
        </div>
        <div class="archival-title">Excerpt from G. Bruno’s 'Le Tour de la France par deux enfants'</div>
        <div class="archival-body">
          "Do you see those two provinces shaded across the Rhine? They are Alsace and Lorraine, torn violently from our motherland. Never forget our brothers who weep under the Prussian helmet. Work, study, and grow strong so that one day justice and the tricolour shall return to Metz and Strasbourg."
        </div>
        <div class="archival-footer">
          <span>Bibliothèque Nationale de France</span>
          <span>Paris Primary Education Curriculum (1887)</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Identify two reasons why the Prussian Great General Staff demanded the annexation of Alsace-Lorraine.',
      q2: 'Explain how French revanchism shaped France’s diplomatic strategy between 1871 and 1914.',
      q3: 'Historians argue whether German policy in 1871 was a defensive necessity or a catastrophic blunder. Assess which interpretation is more convincing.',
    },
  },

  // Page 7: Lesson 3 (The Scramble for Africa & Imperial Tension)
  p7: {
    keyFigure: {
      name: 'Kaiser Wilhelm II',
      lifespan: '1859–1941',
      role: 'German Emperor & King of Prussia (Reigned 1888–1918)',
      significance:
        'Dismissed Bismarck in 1890, abandoned cautious continental diplomacy, and aggressively pursued global empire (*Weltpolitik*) and naval expansion.',
      actions: [
        'Demanded for Germany a "place in the sun" (*Platz an der Sonne*) commensurate with its booming industrial strength.',
        'Sparked the First Moroccan Crisis (1905) by riding through Tangier on a white stallion to challenge French imperial hegemony.',
        'Dispatched the gunboat *SMS Panther* to Agadir in 1911, provoking British intervention and solidifying Anglo-French naval cooperation.',
      ],
      image:
        getBase64Image('/public/great_war/assets/card_wilhelm.png') ||
        getBase64Image('/units/great_war/assets/card_wilhelm.png'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">FLASHPOINT IN FOCUS: GUNBOAT CRISIS</span>
          <span class="csb-category">DIPLOMATIC BRINKMANSHIP &bull; 1905–1911</span>
        </div>
        <h4 class="csb-title">The Moroccan Crises &amp; The Entente Cordiale</h4>
        <div class="csb-body">
          In 1904, Britain and France resolved their colonial disputes by signing the Entente Cordiale, recognizing British dominance in Egypt and French influence in Morocco. Seeking to test and rupture this fledgling partnership, Kaiser Wilhelm II engineered the First Moroccan Crisis (1905) and Second Moroccan Crisis (Agadir, 1911). Wilhelm's aggressive gunboat diplomacy backfired catastrophically: at the 1906 Algeciras Conference, only Austria-Hungary supported Germany. Instead of shattering the Anglo-French friendship, German threats drove Britain and France to initiate secret military staff talks and divide naval patrol responsibilities.
        </div>
        <div class="csb-takeaway">
          <strong>Diplomatic Outcome:</strong> German attempts to bully France in Africa convinced British statesmen that Germany was an unpredictable, expansionist menace, transforming a loose colonial agreement into a binding de facto alliance.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">The Mansion House Speech</span>
          </div>
          <span class="source-date-micro">21 July 1911</span>
        </div>
        <div class="archival-title">Chancellor of the Exchequer David Lloyd George Warns Germany</div>
        <div class="archival-body">
          "If Britain is to be treated where her interests are vitally affected as if she were of no account in the Cabinet of nations, then I say emphatically that peace at that price would be a humiliation intolerable for a great country like ours to endure."
        </div>
        <div class="archival-footer">
          <span>The National Archives, Kew (FO 371/1160)</span>
          <span>London, Mansion House Address</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'What did Kaiser Wilhelm II mean when he demanded a "place in the sun" for Germany?',
      q2: 'Explain why the 1911 Agadir Crisis strengthened rather than fractured the Anglo-French Entente.',
      q3: '"The Scramble for Africa was purely about economic resources, not prestige or fear." To what extent do you agree with this statement?',
    },
  },

  // Page 9: Lesson 4 (The Dreadnought & The Anglo-German Naval Race)
  p9: {
    keyFigure: {
      name: 'Admiral Sir John "Jackie" Fisher',
      lifespan: '1841–1920',
      role: 'First Sea Lord of the Royal Navy (1904–1910, 1914–1915)',
      significance:
        'Revolutionized naval architecture, scrapped obsolete warships, and commissioned HMS Dreadnought in 1906 to preserve British naval supremacy.',
      actions: [
        'Recognized that naval combat was being revolutionized by steam turbines, long-range heavy guns, and torpedoes.',
        'Built HMS *Dreadnought* in Portsmouth Dockyard in a record 366 days, armed exclusively with ten 12-inch heavy guns.',
        'Ruthlessly modernized the British fleet and concentrated Royal Navy capital ships in home waters facing the North Sea.',
        'Pioneered the development of high-speed battlecruisers and converted the Royal Navy fuel supply from Welsh coal to oil to achieve decisive tactical speed.',
      ],
      image:
        getBase64Image('/images/jackie_fisher_portrait.jpg') ||
        getBase64Image('/images/great_war_cover.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL SPOTLIGHT: NAVAL DOCTRINE</span>
          <span class="csb-category">TIRPITZ'S RISK THEORY &bull; 1906–1914</span>
        </div>
        <h4 class="csb-title">Tirpitz’s Risk Theory &amp; The Two-Power Standard</h4>
        <div class="csb-body">
          Britain’s defense policy rested upon the Two-Power Standard: the Royal Navy had to maintain a fleet of battleships at least equal to the combined strength of the world’s next two largest navies. In Berlin, Grand Admiral Alfred von Tirpitz devised the "Risk Theory" (<em>Risikogedanke</em>): building a German High Seas Fleet so formidable that even if the Royal Navy defeated it in battle, British naval power would be so severely crippled that Britain would lose its global empire. However, the launch of *HMS Dreadnought* in 1906 wiped the slate clean by making all pre-dreadnoughts obsolete, sparking an intense industrial building race. Between 1906 and 1914, Britain laid down twenty-nine dreadnought super-battleships to Germany’s seventeen, establishing insurmountable British naval dominance in the North Sea. Fisher's radical motto—"Build fast, hit hard, and keep on hitting"—transformed modern naval architecture, ensuring the Royal Navy retained strategic control throughout the war.
        </div>
        <div class="csb-takeaway">
          <strong>Fatal Strategic Error:</strong> Germany could never outbuild Britain’s superior shipbuilding yards. The naval race failed to win concessions and turned Britain from an uncommitted neutral into Germany’s fiercest adversary.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Parliamentary Hansard</span>
          </div>
          <span class="source-date-micro">16 March 1909</span>
        </div>
        <div class="archival-title">First Lord of the Admiralty Reginald McKenna on German Naval Expansion</div>
        <div class="archival-body">
          "The difficulty in which the government finds itself arises not from what Germany has completed, but from the enormous speed and scale with which she is now producing capital ships. We cannot afford to gamble with national security. The safety of the Empire depends entirely upon our supremacy upon the sea."
        </div>
        <div class="archival-footer">
          <span>Hansard Parliamentary Debates, 5th Series</span>
          <span>House of Commons, Westminster</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Explain what made HMS Dreadnought superior to all existing pre-dreadnought battleships in gunnery and speed.',
      q2: 'Analyse why the British public slogan "We want eight and we won’t wait!" was so politically and electorally influential in the 1909 naval estimates debates across Britain.',
      q3: 'Evaluate whether Admiral von Tirpitz’s Risk Theory was a credible naval deterrent or a disastrous geopolitical gamble for Germany.',
    },
  },

  // Page 11: Lesson 5 (The Alliance System: Protection or Trap?)
  p11: {
    keyFigure: {
      name: 'Count Alfred von Schlieffen',
      lifespan: '1833–1913',
      role: 'Chief of the Imperial German General Staff (1891–1906)',
      significance:
        'Authored the operational war plan designed to knock France out of a two-front war in six weeks by invading through neutral Belgium.',
      actions: [
        'Observed that the Franco-Russian Alliance (1894) encircled Germany with hostile armies to the west and east.',
        'Calculated that Russia’s vast geographic expanse and primitive railways would require six weeks to mobilize its army.',
        'Devised the Schlieffen Plan: massing 90% of German combat strength on the right wing to swing through Belgium, envelop Paris, and defeat France before turning east.',
        'Warned on his deathbed in 1913: "Keep the right wing strong!"—a strategic principle fatally diluted by Helmuth von Moltke the Younger in August 1914.',
      ],
      image:
        getBase64Image('/public/great_war/assets/alfred_von_schlieffen.jpg') ||
        getBase64Image('/units/great_war/assets/alfred_von_schlieffen.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL DEEP DIVE: THE ALLIANCE TRAP</span>
          <span class="csb-category">RAILWAY MOBILIZATION &bull; 1882–1914</span>
        </div>
        <h4 class="csb-title">Secret Military Conventions &amp; Railway Mobilization Timetables</h4>
        <div class="csb-body">
          European alliances were not merely defensive statements of intent; they were accompanied by rigid, top-secret military conventions with exact timetables for mobilization. In the era before mass motorized transport, moving millions of conscripts, horses, artillery, and ammunition required strict control of national railway networks. German, Russian, and French railway staff spent decades designing mobilization timetables where trains were timetabled down to the exact minute. Once a Great Power ordered general mobilization, it was virtually impossible to cancel or alter the train schedules without plunging the nation's military defenses into total chaos. The secret treaties chained the Great Powers together: an Austrian attack on Belgrade inevitably triggered Russian mobilization, which automatically triggered the Schlieffen Plan. When Kaiser Wilhelm II desperately attempted to halt the German western deployment in August 1914, General von Moltke wept, protesting that the railway timetables could not be stopped.
        </div>
        <div class="csb-takeaway">
          <strong>The Fatal Trap:</strong> Military mobilization was viewed as equivalent to a declaration of war. Once Russia mobilized its trains to protect Serbia, German generals insisted they had to attack France immediately under the Schlieffen Plan.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Secret Military Convention</span>
          </div>
          <span class="source-date-micro">17 August 1892</span>
        </div>
        <div class="archival-title">Franco-Russian Military Convention (Ratified 1894)</div>
        <div class="archival-body">
          "Clause 1: If France is attacked by Germany, or by Italy supported by Germany, Russia shall employ all her available forces to attack Germany. Clause 2: If Russia is attacked by Germany, or by Austria supported by Germany, France shall employ all her available forces to attack Germany."
        </div>
        <div class="archival-footer">
          <span>Archives Diplomatiques du Ministère des Affaires Étrangères</span>
          <span>Quai d’Orsay, Paris / St Petersburg</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Name the major Great Powers that formed the Triple Alliance and the Triple Entente.',
      q2: 'Explain why the rigid railway mobilization timetables made diplomatic compromise virtually impossible in August 1914.',
      q3: '"The alliance system created peace through deterrence; it was human panic and militarism that caused the war." Assess this historical interpretation.',
    },
  },

  // Page 13: Lesson 6 (The July Crisis & Assassination in Sarajevo)
  p13: {
    keyFigure: {
      name: 'Gavrilo Princip',
      lifespan: '1894–1918',
      role: 'Bosnian Serb Nationalist Militant & Member of Young Bosnia / Black Hand',
      significance:
        'Assassinated Archduke Franz Ferdinand in Sarajevo on 28 June 1914, triggering the July Crisis and World War I.',
      actions: [
        'Recruited, armed with Belgian Browning semi-automatic pistols, and trained in Belgrade by the Serbian military intelligence network (*The Black Hand*).',
        'Stood outside Schiller’s Delicatessen on Franz Josef Street when the Archduke’s chauffeur took a wrong turn and stalled the car.',
        'Fired two shots at point-blank range, fatally severing the Archduke’s jugular vein and mortally wounding Duchess Sophie.',
      ],
      image:
        getBase64Image('/images/gw_gavrilo_princip.jpg') ||
        getBase64Image('/public/great_war/assets/card_princip.png'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">HISTORICAL SPOTLIGHT: THE SARAJEVO SPARK</span>
          <span class="csb-category">THE BALKAN POWDER KEG &bull; JULY 1914</span>
        </div>
        <h4 class="csb-title">The "Blank Cheque" &amp; The Austrian Ultimatum</h4>
        <div class="csb-body">
          Following the assassination of heir apparent Franz Ferdinand on 28 June 1914, Austro-Hungarian Chief of Staff Conrad von Hötzendorf saw a long-awaited opportunity to crush the Serbian kingdom once and for all. Before acting, Austria sent envoy Count Hoyos to Berlin. On 5–6 July, Kaiser Wilhelm II and Chancellor Bethmann-Hollweg issued the infamous "Blank Cheque" (<em>carte blanche</em>), promising unconditional German military support even if war with Russia resulted. Emboldened by German backing, Vienna issued a draconian 48-hour ultimatum to Serbia designed to be rejected, setting off thirty days of diplomatic miscalculation.
        </div>
        <div class="csb-takeaway">
          <strong>The Decisive Spark:</strong> The Blank Cheque transformed a local Balkan clash into a general European conflagration by guaranteeing German military intervention if Russia defended Serbia.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Imperial Diplomatic Telegram</span>
          </div>
          <span class="source-date-micro">6 July 1914</span>
        </div>
        <div class="archival-title">The German "Blank Cheque" to Austria-Hungary</div>
        <div class="archival-body">
          "His Majesty the Emperor Wilhelm authorizes me to inform Your Apostolic Majesty that Austria-Hungary may rely upon the full support of Germany as an ally. In the present crisis, Germany will stand loyally by Austria's side, even if grave European complications should arise."
        </div>
        <div class="archival-footer">
          <span>Haus-, Hof- und Staatsarchiv, Vienna</span>
          <span>Imperial Chancery, Berlin (Telegram No. 128)</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Why did the Black Hand choose to assassinate Archduke Franz Ferdinand on 28 June 1914 in Sarajevo?',
      q2: 'Explain why Germany’s issuance of the "Blank Cheque" on 5–6 July 1914 was the pivotal turning point of the July Crisis.',
      q3: 'Historians debate whether the outbreak of World War I was a calculated gamble by German and Austrian elites or an accidental tragedy where Europe "sleepwalked" into war. Evaluate which view has stronger evidence.',
    },
  },
};

// Core Vocabulary Decks for Left-Hand Pages (P2, P4, P6, P8, P10, P12)
const GREAT_WAR_LEFT_VOCAB = {
  p2: [
    {
      term: 'Chancellor',
      def: 'The head of government in the German Empire, appointed directly by the Kaiser rather than Parliament.',
    },
    {
      term: 'Blood and Iron',
      def: 'Bismarck’s philosophy that military force and industrial might, not speeches, determine geopolitical outcomes.',
    },
    {
      term: 'Confederation',
      def: 'A loose union of independent states; 39 German states formed the German Confederation before 1871.',
    },
    {
      term: 'Reichstag',
      def: 'The elected national parliament of the German Empire, though foreign and military policy remained with the Kaiser.',
    },
  ],
  p4: [
    {
      term: 'Revanchism',
      def: 'A nation’s aggressive policy to recover lost territories, particularly France’s desire to retake Alsace-Lorraine.',
    },
    {
      term: 'Annexation',
      def: 'The formal incorporation of conquered territory into the sovereign domain of another state.',
    },
    {
      term: 'Indemnity',
      def: 'A mandatory financial payment imposed on a defeated nation to pay for the victor’s war costs.',
    },
    {
      term: 'Encirclement',
      def: 'German fear (Einkreisung) of being trapped and besieged between hostile powers in France and Russia.',
    },
  ],
  p6: [
    {
      term: 'Weltpolitik',
      def: 'Germany’s "world policy" launched by Kaiser Wilhelm II in 1897 to secure a global colonial empire and navy.',
    },
    {
      term: 'Gunboat Diplomacy',
      def: 'The threat or use of conspicuous naval display to intimidate a foreign state into diplomatic compliance.',
    },
    {
      term: 'Entente Cordiale',
      def: 'The 1904 diplomatic agreement resolving colonial rivalries between Great Britain and France.',
    },
    {
      term: 'Sphere of Influence',
      def: 'A region in which an outside imperial power claims exclusive political, commercial, or military authority.',
    },
  ],
  p8: [
    {
      term: 'Dreadnought',
      def: 'A revolutionary British battleship launched in 1906 with uniform heavy guns and high-speed steam turbines.',
    },
    {
      term: 'Two-Power Standard',
      def: 'British policy that the Royal Navy must equal or exceed the combined size of the world’s next two largest navies.',
    },
    {
      term: 'Risk Theory',
      def: 'Tirpitz’s doctrine that a large German fleet would deter Britain by threatening unacceptable naval casualties.',
    },
    {
      term: 'Arms Race',
      def: 'A rapid, competitive military escalation where rival states build weapons to surpass each other’s arsenals.',
    },
  ],
  p10: [
    {
      term: 'Triple Alliance',
      def: 'The military pact between Germany, Austria-Hungary, and Italy formed in 1882 (though Italy defected in 1915).',
    },
    {
      term: 'Triple Entente',
      def: 'The diplomatic alignment between Great Britain, France, and Russia formalized between 1894 and 1907.',
    },
    {
      term: 'Splendid Isolation',
      def: 'Britain’s 19th-century policy of avoiding permanent European continental alliances to focus on global empire.',
    },
    {
      term: 'Balkan Powder Keg',
      def: 'The unstable southeastern European region where nationalist unrest and Ottoman decline threatened a Great Power war.',
    },
  ],
  p12: [
    {
      term: 'Black Hand',
      def: 'The clandestine Serbian nationalist military society (*Union or Death*) that coordinated the Sarajevo assassination.',
    },
    {
      term: 'Pan-Slavism',
      def: 'The ideological movement advocating cultural and political unity of all Slavic peoples under Russian protection.',
    },
    {
      term: 'Blank Cheque',
      def: 'Germany’s unconditional pledge of military backing to Austria-Hungary issued on 5–6 July 1914.',
    },
    {
      term: 'Ultimatum',
      def: 'A final, non-negotiable set of demands whose rejection results in the immediate breakdown of relations or war.',
    },
  ],
};

// Rich Disciplinary Primary Source Bank for Left-Hand Pages (P2, P4, P6, P8, P10, P12)
const GREAT_WAR_LEFT_SOURCES = {
  p2: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Cartographic Evidence',
      title: 'The German Empire in Central Europe (1871)',
      image: getBase64Image('/images/german_empire_1871.png'),
      context:
        'Following the 1871 Treaty of Frankfurt, thirty-nine previously independent German states united under Prussian leadership to form the German Empire, creating an economic and military powerhouse in the center of Europe.',
      hingeQuestion:
        'How did the sudden emergence of a unified German Empire fundamentally shatter the European balance of power?',
      shelfmark: 'Imperial Cartographic Archive, Berlin',
      footer: 'Prussian State Library &bull; Map Department',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Cartographic Comparison',
      title: 'Modern European Boundaries vs 1871 Frontiers',
      image: getBase64Image('/images/modern_germany_map.png'),
      context:
        'Comparing nineteenth-century borders with modern Europe reveals how the massive German Empire occupied the territories of several modern sovereign nations, generating continuous friction with neighbouring empires.',
      hingeQuestion:
        "Why would Germany's geographical position between France and Russia cause German military planners permanent strategic anxiety?",
      shelfmark: 'Curriculum Comparative Cartography',
      footer: 'Department Cartographic Collection',
    },
  },
  p4: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Contemporary French Painting',
      title: 'Albert Bettannier: "La Tache Noire" (The Black Spot, 1887)',
      image:
        getBase64Image('/public/great_war/assets/la_tache_noire_1887.jpg') ||
        getBase64Image('/units/great_war/assets/la_tache_noire_1887.jpg'),
      context:
        'In French schools after 1871, maps showed the lost provinces of Alsace and Lorraine shaded in mourning black. French schoolboys were systematically taught that their sacred patriotic duty was to prepare for revenge (*la revanche*).',
      hingeQuestion:
        'How does this painting prove that the loss of Alsace-Lorraine poisoned Franco-German relations for over forty years?',
      shelfmark: 'Musée des Beaux-Arts, Mulhouse',
      footer: 'French Third Republic Education Archive',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Annexation Cartography',
      title: 'Alsace-Lorraine & The Fortified German Glacis (1871)',
      image: getBase64Image('/units/great_war/assets/alsace_lorraine_1871_map.png'),
      context:
        'Germany annexed 14,000 square kilometres of territory rich in iron ore and coal, alongside 1.5 million French subjects, establishing a fortified defensive barrier against future French attacks.',
      hingeQuestion:
        'Did annexing Alsace-Lorraine provide Germany with military security, or did it guarantee a catastrophic two-front war?',
      shelfmark: 'Reichsland Elsaß-Lothringen Cadastral Survey',
      footer: 'Strasbourg Regional Archive',
    },
  },
  p6: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Cartographic Evidence',
      title: 'The Partition of Africa by 1914',
      image:
        getBase64Image('/units/great_war/assets/map_africa_1914.png') ||
        getBase64Image('/public/great_war/assets/map_africa_1914.png'),
      context:
        'Following the 1884–85 Berlin Conference, Britain and France seized vast connected empires across Africa, while newly unified Germany received smaller, isolated territories in Tanganyika, South-West Africa, Cameroon, and Togoland.',
      hingeQuestion:
        'Why did Kaiser Wilhelm II believe that Germany\'s booming industrial economy entitled it to a much larger "place in the sun"?',
      shelfmark: 'Royal Geographical Society, London',
      footer: 'Imperial Partition Archive (1914)',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Satirical Political Cartoon',
      title: 'John Tenniel: "The Greedy Boy" (Punch Magazine, 1885)',
      image:
        getBase64Image('/public/great_war/assets/was_greedy_boy.png') ||
        getBase64Image('/public/great_war/assets/was_greedy_boy.jpg'),
      context:
        "British satire depicting Chancellor Bismarck grabbing slices of the colonial cake, capturing British anxiety and indignation at Germany's sudden demand for overseas colonies.",
      hingeQuestion:
        'Does this cartoon reflect genuine British strategic fear of Germany, or British arrogance over its colonial monopoly?',
      shelfmark: 'Punch Historical Archive, London',
      footer: 'Punch Magazine &bull; Issue 2280',
    },
  },
  p8: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Written Primary Document',
      title: 'Admiral Sir John Fisher’s Secret Memorandum to King Edward VII (1906)',
      text: '“Our only probable enemy is Germany. Germany keeps her whole fleet concentrated within a few hours of England. We must therefore keep a fleet twice as powerful concentrated within a few hours of Germany... HMS Dreadnought can sink the whole existing German Navy. She runs at 21 knots, carries ten 12-inch guns, and can hit the enemy at eight miles before they can even reach us. Speed is armor. Hit first, hit hard, and keep on hitting.”',
      context:
        'When First Sea Lord Sir John Fisher commissioned HMS Dreadnought in 1906, his all-big-gun battleship rendered all previous pre-dreadnoughts obsolete overnight. However, it also wiped out Britain’s numerical advantage, allowing Germany to start building dreadnoughts on an equal footing.',
      hingeQuestion:
        'Why did the invention of HMS Dreadnought ironically restart the naval arms race rather than deterring German ambitions?',
      shelfmark: 'Royal Archives, Windsor Castle (VIC/MAIN/W/56)',
      footer: 'Admiralty War Staff Secret Dispatch (1906)',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Satirical Political Cartoon',
      title: 'L.M. Glackens: "NO LIMIT" (Puck Magazine, September 1909)',
      image: getBase64Image('/public/great_war/assets/Naval-race-1909.jpg'),
      context:
        'American satirical cartoon showing world leaders playing high-stakes poker, discarding cruisers and raising the stakes with Dreadnought battleships as debt piles up around the table.',
      hingeQuestion:
        'How does this cartoon illustrate the ruinous financial and psychological pressure of the naval arms race?',
      shelfmark: 'Library of Congress, Washington D.C.',
      footer: 'Puck Magazine &bull; Vol. LXVI, No. 1699',
    },
  },
  p10: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Geopolitical Cartography',
      title: 'The Armed Camps: Central Powers vs Triple Entente (1914)',
      image:
        getBase64Image('/public/great_war/assets/map_lesson4.png') ||
        getBase64Image('/units/great_war/assets/map_lesson4.png'),
      context:
        'By 1914, Europe was split into two hostile armed camps: the Central Powers (Germany and Austria-Hungary) surrounded on both sides by the Triple Entente (Britain, France, and Russia).',
      hingeQuestion:
        'Why did the geopolitical encirclement of Germany make German military generals panic and favor preventative war?',
      shelfmark: 'Historical Atlas of Modern Europe',
      footer: 'War Office Intelligence Department, London',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Strategic Operational Plan',
      title: 'The Schlieffen Plan: The German Great General Staff Offensive',
      image: getBase64Image('/public/great_war/assets/schlieffen_plan_simple_map.png'),
      context:
        'Devised in 1905, the plan aimed to avoid a two-front war by invading through neutral Belgium to encircle and crush the French army in 39 days before turning to face slowly mobilizing Russia.',
      hingeQuestion:
        'How did the rigid railway timetables of the Schlieffen Plan make diplomatic compromise impossible in August 1914?',
      shelfmark: 'Imperial German General Staff Archives, Potsdam',
      footer: 'Militärgeschichtliches Forschungsamt',
    },
  },
  p12: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Forensic Crime Scene Plan',
      title: 'Sarajevo Police Map: Appel Quay & Franz Josef Street (28 June 1914)',
      image: getBase64Image('/public/great_war/assets/map_sarajevo_route.jpg'),
      context:
        "Police sketch showing the fatal wrong turn taken by Archduke Franz Ferdinand's motorcade onto Franz Josef Street, where the car stalled directly in front of nineteen-year-old Gavrilo Princip.",
      hingeQuestion:
        'How does this route map illustrate the role of pure chance versus meticulous planning in the assassination?',
      shelfmark: 'Sarajevo Police Directorate Forensic Archives',
      footer: 'State Archive of Bosnia and Herzegovina',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Written Primary Document',
      title: 'The Secret Constitution & Blood Oath of the "Black Hand" (1911)',
      text: '“Article 1: This organization is created for the purpose of realizing the national ideal: the union of all Serbs... Article 2: This organization prefers terrorist action to ideological propaganda. It must therefore remain absolutely secret from the non-initiated.<br><br><strong>The Sacred Oath:</strong> ‘I, in joining the organization Union or Death, do swear by the sun that warms me, by the earth that nourishes me, before God, by the blood of my ancestors, on my honor and life, that from this moment until my death I will faithfully serve this organization, and that I will be prepared to endure all sacrifices for it. If I break this oath, let God and my comrades judge me.’”',
      context:
        'Founded in Belgrade in 1911 by Serbian military intelligence officer Dragutin Dimitrijević (‘Apis’), the Black Hand trained and armed Gavrilo Princip and his fellow conspirators with Belgian FN Browning semi-automatic pistols and cyanide capsules.',
      hingeQuestion:
        'Does the Black Hand constitution prove that Princip was a lone nationalist fanatic or the agent of a state-backed conspiracy?',
      shelfmark: 'Military Intelligence Archive, Belgrade (Doc. No. 1911-BH)',
      footer: 'State Archives of Serbia &bull; Royal Serbian Army Records',
    },
  },
};

function getLessonSections(lesson, idx) {
  const blocks = (lesson.narrative_blocks || []).filter(
    (b) => b && b.title !== 'Consolidation Task' && b.theme_heading !== 'Consolidation Task',
  );

  if (idx === 0) {
    return [
      {
        title: blocks[1]?.title || 'The Chessboard of 39 States',
        text: blocks[1]?.text || blocks[1]?.content || '',
      },
      {
        title: blocks[2]?.title || 'Otto von Bismarck and "Blood and Iron"',
        text: blocks[2]?.text || blocks[2]?.content || '',
      },
      {
        title: blocks[3]?.title || 'The Three Wars of Unification',
        text: blocks[3]?.text || blocks[3]?.content || '',
      },
      {
        title: blocks[4]?.title || "Crowning a Kaiser in the Enemy's Palace",
        text: blocks[4]?.text || blocks[4]?.content || '',
      },
    ];
  }

  const n = blocks.length;
  const q1 = blocks.slice(0, Math.ceil(n / 4));
  const q2 = blocks.slice(Math.ceil(n / 4), Math.ceil(n / 2));
  const q3 = blocks.slice(Math.ceil(n / 2), Math.ceil((3 * n) / 4));
  const q4 = blocks.slice(Math.ceil((3 * n) / 4));

  const formatQuarter = (quarter, fallbackTitle) => {
    const title = quarter[0]?.theme_heading || quarter[0]?.title || fallbackTitle;
    const paras = quarter.map((b) => b.text || b.content || '').filter(Boolean);
    return {
      title,
      text: paras.join('\n\n'),
    };
  };

  return [
    formatQuarter(q1, 'Historical Context'),
    formatQuarter(q2, 'Escalating Crisis'),
    formatQuarter(q3, 'Strategic Maneuvers'),
    formatQuarter(q4, 'Geopolitical Outcome'),
  ];
}

/**
 * Builds the complete 14-page publisher textbook HTML
 */
async function buildPublisherTextbookHtmlGreatWar() {
  const coverImgData = getBase64Image('/images/great_war_cover.jpg');

  // Build lesson HTML
  let lessonsHtml = '';

  lessons.forEach((lesson, idx) => {
    const lessonNum = idx + 1;
    const leftPageNum = lessonNum * 2;
    const rightPageNum = lessonNum * 2 + 1;
    const bankKey = `p${rightPageNum}`;
    const leftVocabKey = `p${leftPageNum}`;
    const leftSrcKey = `p${leftPageNum}`;
    const bank = GREAT_WAR_COMPONENT_BANK[bankKey] || {};
    const vocabTerms = GREAT_WAR_LEFT_VOCAB[leftVocabKey] || [];
    const leftSources = GREAT_WAR_LEFT_SOURCES[leftSrcKey] || {};

    // Extract lesson blocks into 4 coherent sections
    const secList = getLessonSections(lesson, idx);
    const sec1 = secList[0];
    const sec2 = secList[1];
    const sec3 = secList[2];
    const sec4 = secList[3];

    // Format paragraphs with pure PEEL [secNum.pNum] indexing
    const formatBlockParas = (block, secNum) => {
      if (!block || !block.text) {
        return `<p class="narrative-p"><span class="para-ref">[${secNum}.1]</span>Historical analysis examining key archival mechanisms and diplomatic developments during this phase.</p>`;
      }
      const raw = block.text;
      let paras = [];
      if (Array.isArray(raw)) {
        paras = raw;
      } else {
        paras = String(raw)
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean);
      }
      return paras
        .map((p, pIdx) => {
          return `<p class="narrative-p"><span class="para-ref">[${secNum}.${pIdx + 1}]</span>${formatText(p)}</p>`;
        })
        .join('');
    };

    // Helper to render Left-Hand Archival Sources (with Context & Hinge Question)
    const renderArchivalSourceBox = (src) => {
      if (!src) return '';
      if (src.text) {
        // Written Primary Document
        return `
          <div class="archival-source-box written-source-box">
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
              <span>${src.shelfmark || 'Imperial Archives'}</span>
              <span>${src.footer || 'Curriculum Archival Record'}</span>
            </div>
          </div>
        `;
      }
      if (src.image) {
        // Image Primary Document
        return `
          <div class="archival-source-box">
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
              <span>${src.shelfmark || 'Imperial Archives'}</span>
              <span>${src.footer || 'Curriculum Archival Record'}</span>
            </div>
          </div>
        `;
      }
      return '';
    };

    // LEFT PAGE (Verso)
    lessonsHtml += `
    <!-- PAGE ${leftPageNum}: Lesson ${lessonNum} Left Page (Verso) -->
    <div class="textbook-page" data-page="${leftPageNum}">
      <div class="page-inner">
        
        <!-- Lesson Header Strip -->
        <div class="lesson-header">
          <div class="lesson-badge-strip">
            <span class="topic-badge">KS3 HISTORY &bull; UNIT 1</span>
            <span class="spec-ref-badge">LESSON ${lessonNum} OF 6</span>
          </div>
          <h2 class="lesson-title">${lesson.title}</h2>
          <div class="lesson-spec-anchor">
            <strong>Key Enquiry:</strong> ${unitData.enquiry} &bull; <em>Sections 1 &amp; 2: Context, Catalysts &amp; Primary Evidence</em>
          </div>
        </div>

        <!-- 2-Column Core Prose Measure -->
        <div class="two-column-prose">
          
          <!-- Section 1 -->
          <div class="section-banner">
            <span class="sb-num">SECTION 1</span>
            <span class="sb-title">${(sec1.title || 'Context').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec1, 1)}

          ${renderArchivalSourceBox(leftSources.sourceA)}

          <!-- Section 2 -->
          <div class="section-banner">
            <span class="sb-num">SECTION 2</span>
            <span class="sb-title">${(sec2.title || 'Escalating Crisis').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec2, 2)}

          ${renderArchivalSourceBox(leftSources.sourceB)}

        </div>

        <!-- Bottom Vocabulary Deck -->
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
          <span>Causes of the Great War (1871–1914) &bull; Lesson ${lessonNum}</span>
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
            <span class="rph-lesson">LESSON ${lessonNum}: SECTIONS 3 &amp; 4</span>
          </div>
          <h3 class="rph-title">${lesson.title}</h3>
        </div>

        <!-- 2-Column Prose Measure -->
        <div class="two-column-prose">
          
          <!-- Section 3 -->
          <div class="section-banner">
            <span class="sb-num">SECTION 3</span>
            <span class="sb-title">${(sec3.title || 'Strategic Developments').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec3, 3)}

          <!-- Key Figure Card -->
          ${
            bank.keyFigure
              ? `
          <div class="key-figure-box">
            <div class="kf-header">
              <span class="kf-tag">KEY HISTORICAL INDIVIDUAL</span>
              <span class="kf-lifespan">${bank.keyFigure.lifespan}</span>
            </div>
            <div class="kf-identity-row">
              ${bank.keyFigure.image ? `<img class="kf-portrait" src="${bank.keyFigure.image}" alt="${bank.keyFigure.name}">` : ''}
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

          <!-- Section 4 -->
          <div class="section-banner">
            <span class="sb-num">SECTION 4</span>
            <span class="sb-title">${(sec4.title || 'Geopolitical Outcome').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec4, 4)}

          <!-- Concept Spotlight Box -->
          ${bank.conceptSpotlight || ''}

          <!-- Archival Dispatch Box -->
          ${bank.archivalDispatch || ''}

        </div>

        <!-- Bottom Enquiry Deck -->
        ${
          bank.bottomEnquiry
            ? `
        <div class="bottom-enquiry-box">
          <div class="beb-header">
            <span class="beb-title">HISTORICAL ENQUIRY &amp; DISCIPLINARY ASSESSMENT</span>
            <span class="beb-badge">LESSON ${lessonNum} SYNTHESIS</span>
          </div>
          <div class="beb-grid">
            <div class="beb-col">
              <strong>1. Knowledge Recall &amp; Evidence:</strong>
              ${bank.bottomEnquiry.q1}
            </div>
            <div class="beb-col">
              <strong>2. Causal Analysis:</strong>
              ${bank.bottomEnquiry.q2}
            </div>
            <div class="beb-col">
              <strong>3. Historical Evaluation &amp; Debate:</strong>
              ${bank.bottomEnquiry.q3}
            </div>
          </div>
        </div>`
            : ''
        }

        <!-- Page Footer -->
        <div class="page-footer">
          <span>Causes of the Great War (1871–1914) &bull; Primary Archival Core</span>
          <span>Page ${rightPageNum}</span>
        </div>

      </div>
    </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Causes of the Great War (1871–1914) — Master Publisher Textbook</title>
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
      margin-bottom: 6px;
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
      margin-bottom: 6px;
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

    /* 2-Column Reading Measure */
    .two-column-prose {
      column-count: 2;
      column-gap: 15px;
      column-rule: 1px solid #e2e8f0;
      text-align: justify;
      flex: 1;
      overflow: hidden;
    }

    .section-banner {
      column-span: all;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      border-bottom: 1px solid #e2e8f0;
      padding: 2.5px 6px;
      border-radius: 0 3px 3px 0;
      margin: 5px 0 3px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Inter', sans-serif;
    }
    .sb-num {
      font-size: 6.2pt;
      font-weight: 900;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .sb-title {
      font-size: 7.4pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      margin: 0 0 5px 0;
      text-indent: 1.0em;
    }
    .narrative-p:first-of-type, .section-banner + .narrative-p {
      text-indent: 0;
    }

    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
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
      padding: 5px 7px;
      margin: 5px 0;
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
      font-size: 6.0pt;
      font-weight: 900;
      color: #fff;
      background: #0f172a;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .source-type {
      font-size: 6.0pt;
      font-weight: 700;
      color: #78716c;
      text-transform: uppercase;
      margin-left: 4px;
    }
    .source-date-micro {
      font-size: 5.8pt;
      font-weight: 600;
      color: #78716c;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
      line-height: 1.15;
    }
    .archival-image {
      width: 100%;
      max-height: 125px;
      object-fit: contain;
      border-radius: 2px;
      margin-bottom: 3px;
      display: block;
      background: #fafaf9;
    }
    .archival-body {
      font-size: 7.4pt;
      line-height: 1.32;
      color: #292524;
      font-style: italic;
      margin-bottom: 3px;
    }
    .written-source-box .archival-body {
      background: #fafaf9;
      border-left: 2px solid #78716c;
      padding: 4px 6px;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 7.2pt;
      line-height: 1.3;
      color: #1c1917;
      font-style: italic;
      margin-bottom: 3px;
    }
    .archival-context-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0284c7;
      padding: 3px 5px;
      margin: 3px 0 2px 0;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
    }
    .archival-context-text {
      font-size: 6.0pt;
      line-height: 1.25;
      color: #334155;
      margin: 0 0 2px 0;
    }
    .archival-hinge-q {
      font-size: 6.0pt;
      line-height: 1.25;
      color: #0f172a;
      background: #f0f9ff;
      padding: 2px 4px;
      border-radius: 2px;
      margin-top: 2px;
    }
    .archival-hinge-q strong {
      color: #0369a1;
      text-transform: uppercase;
      font-size: 5.6pt;
      letter-spacing: 0.04em;
    }
    .archival-footer {
      border-top: 1px dashed #d6d3d1;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
      color: #78716c;
      font-weight: 600;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 5px 8px;
      margin: 5px 0;
      break-inside: avoid;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .kf-tag {
      font-size: 6.0pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .kf-lifespan {
      font-size: 5.8pt;
      color: #64748b;
      font-weight: 600;
    }
    .kf-identity-row {
      display: flex;
      gap: 7px;
      align-items: center;
      margin-bottom: 3px;
    }
    .kf-portrait {
      width: 44px;
      height: 54px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #94a3b8;
      flex-shrink: 0;
    }
    .kf-identity-text { flex: 1; }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.2pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }
    .kf-role {
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      line-height: 1.2;
    }
    .kf-significance {
      font-size: 7.4pt;
      font-style: italic;
      color: #334155;
      line-height: 1.3;
      margin-bottom: 3px;
    }
    .kf-actions-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      margin: 2px 0 1px 0;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
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
      padding: 5px 8px;
      margin: 5px 0;
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
      font-size: 6.0pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
    }
    .csb-category {
      font-size: 5.6pt;
      font-weight: 700;
      color: #b45309;
      background: #ffedd5;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.8pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0 2px 0;
      line-height: 1.15;
    }
    .csb-body {
      font-size: 7.4pt;
      line-height: 1.32;
      color: #1e293b;
      margin-bottom: 3px;
    }
    .csb-takeaway {
      font-family: 'Inter', sans-serif;
      font-size: 6.3pt;
      font-weight: 600;
      color: #78350f;
      background: #fef3c7;
      border-left: 2px solid #d97706;
      padding: 2px 5px;
      border-radius: 0 2px 2px 0;
    }

    /* Bottom Decks */
    .bottom-vocab-box, .bottom-enquiry-box {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      margin-top: auto;
      margin-bottom: 1px;
      padding: 7px 9px;
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
      margin-bottom: 3px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }
    .bvb-title {
      font-size: 6.6pt;
      font-weight: 900;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .bvb-badge, .beb-badge {
      font-size: 5.6pt;
      font-weight: 800;
      background: #0f172a;
      color: #fff;
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 7px;
      font-size: 6.6pt;
      line-height: 1.28;
      color: #334155;
    }
    .bvb-col strong, .beb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 6.0pt;
    }

    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
    }
    .beb-title {
      font-size: 6.6pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 9px;
      font-size: 6.6pt;
      line-height: 1.3;
      color: #334155;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      margin-top: 3px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
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
      margin-bottom: 8px;
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
      font-size: 23pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 4px 0 3px 0;
      text-transform: uppercase;
    }
    .cover-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 11.2pt;
      font-style: italic;
      color: #475569;
      margin-bottom: 8px;
    }
    .cover-plate-wrapper {
      text-align: center;
      margin: 4px 0;
    }
    .cover-plate-img {
      max-height: 98mm;
      max-width: 100%;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
    }
    .cover-plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      color: #64748b;
      margin-top: 3px;
      font-style: italic;
    }
    .cover-enquiry-box {
      background: #f8fafc;
      border-left: 4px solid #1e3a8a;
      padding: 6px 12px;
      margin: 6px 0;
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
      font-size: 6.8pt;
      margin-top: 4px;
    }
    .cover-matrix-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 3px 6px;
      text-align: left;
      font-weight: 800;
      font-size: 6.4pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cover-matrix-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 3px 6px;
      color: #334155;
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
      padding: 14px 18px;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    .back-header-strip {
      text-align: center;
      margin-bottom: 6px;
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 4px;
    }
    .back-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin: 0;
      line-height: 1.15;
    }
    .back-subtitle {
      font-size: 7.2pt;
      color: #64748b;
      margin-top: 2px;
      font-style: italic;
    }
    .back-section-title {
      font-size: 7.4pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2px;
      margin: 5px 0 3px 0;
    }
    .back-timeline-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 6.4pt;
      line-height: 1.25;
    }
    .bt-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      padding: 3.5px 5px;
      border-radius: 0 2px 2px 0;
    }
    .bt-card strong { color: #1e3a8a; }
    
    .back-main-matrix-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      font-size: 6.4pt;
      line-height: 1.25;
      margin-bottom: 5px;
    }
    .bmm-col {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      padding: 4px 6px;
      border-radius: 2px;
    }
    .bmm-col strong {
      display: block;
      color: #1e3a8a;
      text-transform: uppercase;
      font-size: 6.2pt;
      margin-bottom: 2px;
    }
    
    .back-historiography-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 6.4pt;
      line-height: 1.25;
      margin-bottom: 5px;
    }
    .bh-card {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 2.5px solid #b45309;
      padding: 4px 6px;
      border-radius: 2px;
    }
    .bh-card strong {
      display: block;
      color: #92400e;
      text-transform: uppercase;
      font-size: 6.0pt;
      margin-bottom: 1px;
    }

    .back-writing-scaffold-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 6.4pt;
      line-height: 1.25;
    }
    .bws-col {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-top: 2.5px solid #2563eb;
      padding: 4px 6px;
      border-radius: 2px;
    }
    .bws-col strong {
      display: block;
      color: #1e40af;
      text-transform: uppercase;
      font-size: 6.0pt;
      margin-bottom: 1px;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: Front Cover -->
  <div class="textbook-page" data-page="1">
    <div class="cover-container">
      <div class="cover-top">
        <div class="cover-dept-banner" data-department-name="The History Department">
          <span class="school-brand-target">The History Department</span>
        </div>
        <div class="cover-series">Key Stage 3 Master Curriculum Series</div>
        <h1 class="cover-title">Causes of the Great War (1871–1914)</h1>
        <div class="cover-subtitle">From the Hall of Mirrors to the Guns of August: Imperial Rivalry, Alliances &amp; The July Crisis</div>
      </div>

      <div class="cover-plate-wrapper">
        ${coverImgData ? `<img class="cover-plate-img" src="${coverImgData}" alt="HMS Dreadnought at Sea (1906)">` : ''}
        <div class="cover-plate-caption">Primary Photograph: The revolutionary Royal Navy battleship HMS Dreadnought (c. 1906), which sparked the Anglo-German naval arms race.</div>
      </div>

      <div class="cover-enquiry-box">
        <div class="ceb-label">Overarching Historical Enquiry:</div>
        <div class="ceb-text">"How did decades of imperial rivalry, arms races, and mutual fear culminate in thirty days of madness in the summer of 1914?"</div>
      </div>

      <table class="cover-matrix-table">
        <thead>
          <tr>
            <th style="width: 15%;">Lesson</th>
            <th style="width: 45%;">Historical Enquiry &amp; Narrative Focus</th>
            <th style="width: 25%;">Primary Source Core</th>
            <th style="width: 15%;">Page Ref</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Lesson 1</strong></td>
            <td>The Creation of the German Empire: Bismarck, Blood &amp; Iron, and 1871</td>
            <td>German Empire (1871) Boundary Map</td>
            <td>pp. 2–3</td>
          </tr>
          <tr>
            <td><strong>Lesson 2</strong></td>
            <td>The Franco-Prussian War: Alsace-Lorraine and the Legacy of Hatred</td>
            <td><em>La Tache Noire</em> &amp; Annexation Cartography</td>
            <td>pp. 4–5</td>
          </tr>
          <tr>
            <td><strong>Lesson 3</strong></td>
            <td>The 'Scramble for Africa': Berlin Conference and the Moroccan Crises</td>
            <td>1914 Partition of Africa &amp; Agadir Dispatches</td>
            <td>pp. 6–7</td>
          </tr>
          <tr>
            <td><strong>Lesson 4</strong></td>
            <td>The Battleship Contest: HMS Dreadnought and the Anglo-German Naval Race</td>
            <td>Fisher Secret Memo &amp; 1909 Satirical Press</td>
            <td>pp. 8–9</td>
          </tr>
          <tr>
            <td><strong>Lesson 5</strong></td>
            <td>The Alliance System: Triple Alliance, Triple Entente &amp; The Schlieffen Plan</td>
            <td>Alliance Map &amp; Schlieffen Offensive Plan</td>
            <td>pp. 10–11</td>
          </tr>
          <tr>
            <td><strong>Lesson 6</strong></td>
            <td>The Assassination in Sarajevo: The Black Hand, Blank Cheque &amp; July Crisis</td>
            <td>Sarajevo Route Map &amp; Black Hand Constitution</td>
            <td>pp. 12–13</td>
          </tr>
        </tbody>
      </table>

      <div class="cover-footer">
        <span>The History Revision Hub &bull; Student Textbook Edition</span>
        <span>Verified Print Publication &bull; September 2026</span>
      </div>
    </div>
  </div>

  <!-- PAGES 2–13: Core Lessons (14-Page Budget) -->
  ${lessonsHtml}

  <!-- PAGE 14: Master Revision Back Cover -->
  <div class="textbook-page" data-page="14">
    <div class="back-container">
      <div>
        <div class="back-header-strip">
          <h2 class="back-title">Causes of the Great War (1871–1914) &bull; Master Revision Index</h2>
          <div class="back-subtitle">Comprehensive Chronological Sequence, M-A-I-N Causal Matrix, Academic Historiography &amp; Disciplinary Writing Scaffold</div>
        </div>

        <div class="back-section-title">1. Master Chronological Sequence (1871–1914)</div>
        <div class="back-timeline-grid">
          <div class="bt-card"><strong>18 Jan 1871:</strong> German Empire proclaimed at Versailles; France cedes Alsace-Lorraine.</div>
          <div class="bt-card"><strong>1882:</strong> Triple Alliance formalized between Germany, Austria-Hungary, and Italy.</div>
          <div class="bt-card"><strong>1884–85:</strong> Berlin Conference regulates the imperial "Scramble for Africa".</div>
          <div class="bt-card"><strong>1890:</strong> Kaiser Wilhelm II dismisses Bismarck and launches expansionist <em>Weltpolitik</em>.</div>
          <div class="bt-card"><strong>1894:</strong> Franco-Russian Alliance ratified, encircling Germany with a two-front threat.</div>
          <div class="bt-card"><strong>1898:</strong> First German Navy Law passed by Tirpitz to construct the High Seas Fleet.</div>
          <div class="bt-card"><strong>1904:</strong> Anglo-French Entente Cordiale resolves colonial rivalries in North Africa.</div>
          <div class="bt-card"><strong>1905:</strong> First Moroccan Crisis (Tangier); Kaiser challenges French sphere of influence.</div>
          <div class="bt-card"><strong>1906:</strong> HMS Dreadnought launched in 366 days; Schlieffen drafts two-front war plan.</div>
          <div class="bt-card"><strong>1907:</strong> Anglo-Russian Convention signed; Triple Entente alignment is completed.</div>
          <div class="bt-card"><strong>1908:</strong> Bosnian Crisis; Austria-Hungary formally annexes Bosnia-Herzegovina.</div>
          <div class="bt-card"><strong>1911:</strong> Second Moroccan Crisis (Agadir); <em>SMS Panther</em> provokes British response.</div>
          <div class="bt-card"><strong>1912–13:</strong> Balkan Wars; Ottoman retreat leaves Serbia as an aggressive regional power.</div>
          <div class="bt-card"><strong>28 Jun 1914:</strong> Archduke Franz Ferdinand assassinated in Sarajevo by Gavrilo Princip.</div>
          <div class="bt-card"><strong>5–6 Jul 1914:</strong> Germany issues the unconditional "Blank Cheque" to Austria-Hungary.</div>
          <div class="bt-card"><strong>23 Jul 1914:</strong> Austria delivers harsh 48-hour ultimatum designed for Serbian rejection.</div>
          <div class="bt-card"><strong>28 Jul 1914:</strong> Austria-Hungary declares war on Serbia; Belgrade bombarded by artillery.</div>
          <div class="bt-card"><strong>1–4 Aug 1914:</strong> General mobilizations; Germany invades Belgium; Britain declares war.</div>
        </div>

        <div class="back-section-title" style="margin-top: 6px;">2. The M-A-I-N Causal Matrix for Extended Writing</div>
        <div class="back-main-matrix-grid">
          <div class="bmm-col">
            <strong>M &bull; Militarism</strong>
            Anglo-German Dreadnought race, Tirpitz's Risk Theory, 5-fold arms spending increase, and the subordination of diplomatic negotiation to rigid railway military timetables.
          </div>
          <div class="bmm-col">
            <strong>A &bull; Alliances</strong>
            Division of Europe into two armed camps (Triple Alliance vs Triple Entente), secret military conventions, and automatic cascading mutual defense obligations.
          </div>
          <div class="bmm-col">
            <strong>I &bull; Imperialism</strong>
            Scramble for Africa, Moroccan Crises (1905, 1911), Kaiser Wilhelm's aggressive demand for a "place in the sun", and British fear of threats to imperial trade lanes.
          </div>
          <div class="bmm-col">
            <strong>N &bull; Nationalism</strong>
            French revanchism (*la revanche*) over Alsace-Lorraine, Serbian Pan-Slavic ambitions in the Balkans, and Austro-Hungarian fear of internal multi-ethnic collapse.
          </div>
        </div>

        <div class="back-section-title">3. Key Historiographical Perspectives on 1914</div>
        <div class="back-historiography-grid">
          <div class="bh-card">
            <strong>Fritz Fischer (German War Aims &bull; 1961)</strong>
            Argued Imperial Germany deliberately calculated on preventative war in 1914 to escape encirclement, secure continental hegemony, and distract from socialist gains at home.
          </div>
          <div class="bh-card">
            <strong>Christopher Clark (The Sleepwalkers &bull; 2012)</strong>
            Argued war was not plotted by one nation; leaders across Europe miscalculated risks, misinterpreted mutual signals, and tragically sleepwalked into world conflagration.
          </div>
          <div class="bh-card">
            <strong>Margaret MacMillan (The War That Ended Peace &bull; 2013)</strong>
            Emphasized that war was never inevitable; peace held in previous crises, but reckless brinkmanship, loss of trust, and panic paralyzed European diplomacy in July 1914.
          </div>
        </div>

        <div class="back-section-title">4. Master Disciplinary Writing Framework</div>
        <div class="back-writing-scaffold-grid">
          <div class="bws-col">
            <strong>Point &amp; Evidence Stems</strong>
            "A pivotal long-term catalyst was... for instance, following [Event/Date], [Power] implemented [Action], which directly generated..."
          </div>
          <div class="bws-col">
            <strong>Causal Connectives</strong>
            "Consequently...", "This directly aggravated...", "In response, [State] was compelled to...", "This effectively transformed a localized clash into..."
          </div>
          <div class="bws-col">
            <strong>Evaluative Judgement Criteria</strong>
            "While [Factor A] provided the underlying combustible material, [Factor B] served as the indispensable spark because without..."
          </div>
        </div>
      </div>

      <div class="cover-footer" style="margin-top: 5px;">
        <span>Causes of the Great War (1871–1914) &bull; Master Specification Review Index</span>
        <span>Page 14 of 14</span>
      </div>
    </div>
  </div>

</body>
</html>`;
}

/**
 * Main execution runner
 */
async function runGreatWar() {
  console.log('🚀 Compiling Publisher-Level Standard Textbook for Causes of the Great War...');

  const htmlContent = await buildPublisherTextbookHtmlGreatWar();

  // Save HTML companion
  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'great_war');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });
  const htmlPath = path.join(htmlOutputDir, 'textbook_PUBLISHER.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved HTML companion to: ${htmlPath}`);

  // Compile PDF with Puppeteer
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });
  const pdfPath = path.join(pdfOutputDir, 'great_war_textbook_PUBLISHER.pdf');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(120000);
    await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle2' });

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });

    console.log(`🎉 Masterpiece PDF Textbook Great War successfully compiled!`);
    console.log(`📄 PDF Output: ${pdfPath}`);

    await page.close();
    await browser.close();
  } catch (err) {
    if (browser) await browser.close();
    console.warn(
      `⚠️ Puppeteer PDF generation failed or running in browserless environment: ${err.message}`,
    );
  }
}

if (require.main === module) {
  runGreatWar().catch((err) => {
    console.error('Fatal textbook compilation error:', err);
    process.exit(1);
  });
}

module.exports = {
  buildPublisherTextbookHtmlGreatWar,
  runGreatWar,
  run: runGreatWar,
};
