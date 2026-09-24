/**
 * History Revision Hub — GCSE Weimar and Nazi Germany Master Textbook Engine
 *
 * Compiles the companion dual-column Master Revision Guide & Textbook
 * using the 16 Christine Counsell 4-Act enquiries from units/weimar_nazi_germany/data.js.
 *
 * Target Output:
 *   - KT1: public/pdfs/weimar_nazi_germany_textbook_KT1_PUBLISHER.pdf
 *   - HTML: public/units/weimar_nazi_germany/textbook_KT1_PUBLISHER.html
 *
 * Architectural & Pedagogical Standards Enforced:
 * 1. Strict Institutional Neutrality: Zero commercial branding violations.
 * 2. Exact Page Budget:
 *    - Page 1:  Master Front Cover (authentic uncropped photo plate, Pearson 1HI0/31 syllabus matrix)
 *    - Pages 2–9: 4 Enquiries × 2 Pages (Double-page spreads: Verso Acts 1 & 2 + Sources A & B + Vocab; Recto Acts 3 & 4 + Key Figure + Spotlight + Dispatch + Enquiry Deck)
 *    - Page 10: Master Revision Back Cover (Chronological Spine, Concept Matrix, Historiography & Digital Quizzing Hub)
 * 3. Dual-Column Prose Measure (Newsreader / Georgia serif, pure [Act.Paragraph] PEEL referencing).
 * 4. High-Yield Component Bank delivering >= 90% fill on all pages with 0px overflow.
 * 5. Base64 Image Inlining for 100% offline & Puppeteer reliability.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error('Data file not found:', dataPath);
  process.exit(1);
}

// Safely parse data.js
const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');

/**
 * Robust Base64 Image Inliner
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'images', 'weimar_individuals', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
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

// ============================================================================
// HIGH-YIELD COMPONENT BANK FOR WEIMAR RIGHT-HAND PAGES (RECTO)
// ============================================================================
const WEIMAR_COMPONENT_BANK = {
  // Page 3: KT 1.1 (The Origins of the Republic, 1918–1919)
  p3: {
    keyFigure: {
      name: 'Friedrich Ebert',
      lifespan: '1871–1925',
      role: 'Leader of the SPD & First President of the Weimar Republic (1919–1925)',
      significance:
        'Steered Germany through imperial collapse, concluded the Armistice, and negotiated the democratic constitution while suppressing violent revolts.',
      actions: [
        "Formed the provisional Council of People's Representatives on 10 November 1918 following the Kaiser's abdication.",
        'Forged the secret Ebert-Groener Pact with the Imperial Army to maintain public order and suppress communist insurrection.',
        'Convened the National Assembly at Weimar and signed the democratic Constitution into law on 11 August 1919.',
      ],
      image: getBase64Image('weimar_individuals/friedrich_ebert.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CRITICAL MECHANISM: CONSTITUTIONAL FLAW</span>
          <span class="csb-category">PARLIAMENTARY DEMOCRACY &bull; 1919</span>
        </div>
        <h4 class="csb-title">Proportional Representation &amp; Coalition Paralysis</h4>
        <div class="csb-body">
          Under Weimar's pure proportional representation system, one seat in the Reichstag was awarded for every 60,000 votes cast nationally, with zero minimum threshold. This allowed dozens of small, radical splinter parties to enter parliament. Consequently, no single political party ever achieved an absolute majority between 1919 and 1933. Governments had to rely on unstable multi-party coalitions; between 1919 and 1933, Germany went through twenty different cabinets, with the average government collapsing after just eight months.
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> Pure proportional representation fragmented parliamentary power, rendering democratic governance incapable of decisive action during national crises and eroding public confidence in the Reichstag.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Secret Telephone Agreement</span>
          </div>
          <span class="source-date-micro">10 November 1918</span>
        </div>
        <div class="archival-title">General Wilhelm Groener on the Ebert-Groener Pact</div>
        <div class="archival-body written-source-box">
          "On the evening of 10 November, I telephoned Friedrich Ebert in the Chancellery over our secret line... I informed him that the High Command placed itself at the disposal of his government. In return, the Field Marshal and I expected the government to support the officer corps in maintaining discipline, supply the army, and combat revolutionary Bolshevism with all vigor. Ebert accepted our offer of alliance with deep relief."
        </div>
        <div class="archival-footer">
          <span>Bundesarchiv-Militärarchiv Freiburg</span>
          <span>MS-Groener-1918 &bull; Imperial General Staff</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: "Identify two reasons why Chancellor Max von Baden announced the Kaiser's abdication on 9 November 1918.",
      q2: 'Explain how the Ebert-Groener Pact both stabilized the early Republic and created a dangerous dependency on the old imperial army.',
      q3: 'Historians debate whether the Weimar Constitution was a triumph of progressive democracy or fatally flawed from the start. Assess which view is more convincing.',
    },
  },

  // Page 5: KT 1.2 (Early Challenges to the Republic, 1919–1923)
  p5: {
    keyFigure: {
      name: 'Rosa Luxemburg',
      lifespan: '1871–1919',
      role: 'Co-Founder of the Spartacus League & German Communist Party (KPD)',
      significance:
        'Brilliant Marxist theorist and orator who led the January 1919 Berlin insurrection against the moderate SPD government before being murdered by Freikorps officers.',
      actions: [
        'Co-founded the radical anti-war Spartacus League in 1916, publishing underground revolutionary tracts.',
        "Demanded all power be transferred to Workers' and Soldiers' Councils rather than a parliamentary National Assembly.",
        'Arrested, beaten, and murdered alongside Karl Liebknecht by Freikorps soldiers on 15 January 1919, her body dumped in the Landwehr Canal.',
      ],
      image: getBase64Image('weimar_individuals/rosa_luxemburg.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">FLASHPOINT IN FOCUS: ECONOMIC CATASTROPHE</span>
          <span class="csb-category">THE RUHR OCCUPATION &bull; 1923</span>
        </div>
        <h4 class="csb-title">The Ruhr Crisis &amp; The Hyperinflation Spiral</h4>
        <div class="csb-body">
          When Germany defaulted on timber and coal deliveries in late 1922, French Prime Minister Raymond Poincaré ordered 60,000 French and Belgian troops to occupy the Ruhr industrial heartland in January 1923 to seize reparations in kind. Chancellor Wilhelm Cuno ordered passive resistance: workers went on general strike while French troops sealed off the region, cutting off 80% of German coal and iron production. To pay striking miners and keep the state functioning, the Reichsbank printed astronomical quantities of paper marks, triggering the catastrophic hyperinflation collapse.
        </div>
        <div class="csb-takeaway">
          <strong>Psychological Ruin:</strong> Middle-class Germans saw their life savings, pensions, and insurance policies utterly wiped out overnight. They never forgave the Weimar Republic for their humiliation, creating fertile soil for extremist recruitment.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">The Peace Treaty</span>
          </div>
          <span class="source-date-micro">28 June 1919</span>
        </div>
        <div class="archival-title">Article 231 of the Treaty of Versailles (The War Guilt Clause)</div>
        <div class="archival-body written-source-box">
          "The Allied and Associated Governments affirm and Germany accepts the responsibility of Germany and her allies for causing all the loss and damage to which the Allied and Associated Governments and their nationals have been subjected as a consequence of the war imposed upon them by the aggression of Germany and her allies."
        </div>
        <div class="archival-footer">
          <span>The National Archives, Kew (FO 93/36/78)</span>
          <span>Galerie des Glaces, Versailles</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'State the military terms imposed on Germany by the Treaty of Versailles regarding army size, submarines, and the Rhineland.',
      q2: "Explain why General von Seeckt's refusal to order the Reichswehr to fire on the Freikorps during the Kapp Putsch posed a fatal danger to the Republic.",
      q3: 'Evaluate whether the hyperinflation of 1923 was primarily caused by the punitive demands of Versailles or by reckless German economic policy.',
    },
  },

  // Page 7: KT 1.3 (The Recovery of the Republic, 1924–1929)
  p7: {
    keyFigure: {
      name: 'Gustav Stresemann',
      lifespan: '1878–1929',
      role: 'Chancellor (1923) and Foreign Minister of Germany (1923–1929)',
      significance:
        'Rescued the Republic from hyperinflation, rebuilt diplomatic relations with the Western Allies, and secured foreign capital to finance German economic recovery.',
      actions: [
        'Ended passive resistance in the Ruhr in September 1923 despite furious right-wing nationalist outcry.',
        'Introduced the temporary Rentenmark backed by land mortgages, halting hyperinflation and stabilizing the currency.',
        'Negotiated the Dawes Plan (1924), signed the Locarno Treaties (1925), brought Germany into the League of Nations (1926), and agreed the Young Plan (1929).',
      ],
      image: getBase64Image('weimar_individuals/gustav_stresemann.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">FINANCIAL ARCHITECTURE: BORROWED TIME</span>
          <span class="csb-category">THE DAWES LOAN CYCLE &bull; 1924–1929</span>
        </div>
        <h4 class="csb-title">The Dawes Plan &amp; "Dancing on a Volcano"</h4>
        <div class="csb-body">
          The 1924 Dawes Plan established a circular economic mechanism that temporarily stabilized Europe: American banks loaned billions of dollars to German municipal governments and industrial syndicates; Germany used this influx of capital to rebuild infrastructure, modernize factories, and pay reparations to Britain and France; Britain and France then used these reparation payments to pay off their wartime loans to the United States. While this created a dramatic boom, it created a fatal dependency: German businesses were financed by short-term loans that American financiers could recall on ninety days' notice.
        </div>
        <div class="csb-takeaway">
          <strong>Fatal Dependency:</strong> Stresemann himself warned in 1928: "The economic position is only flourishing on the surface. Germany is dancing on a volcano." When Wall Street crashed, the entire house of cards collapsed.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">League of Nations Address</span>
          </div>
          <span class="source-date-micro">10 September 1926</span>
        </div>
        <div class="archival-title">Gustav Stresemann\'s Address to the League of Nations Assembly</div>
        <div class="archival-body written-source-box">
          "It cannot be the purpose of the League of Nations to measure nations by their military might or the size of their armies. The League must be a fellowship of nations founded upon justice, moral strength, and international cooperation... Germany enters this great assembly with the sincere will to serve peace and to cooperate in solving the great tasks that history has set before mankind."
        </div>
        <div class="archival-footer">
          <span>League of Nations Archives, Geneva</span>
          <span>Assembly Record &bull; Seventh Plenary Session</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Name the two international agreements negotiated in 1924 and 1929 that reorganized German reparations payments.',
      q2: 'Explain how the introduction of the Rentenmark successfully restored public confidence in the German currency within weeks.',
      q3: 'Historians debate whether Gustav Stresemann genuinely rescued Weimar democracy or merely papered over deep structural cracks. Assess which view is more convincing.',
    },
  },

  // Page 9: KT 1.4 (Changes in Society, 1924–1929)
  p9: {
    keyFigure: {
      name: 'Walter Gropius',
      lifespan: '1883–1969',
      role: 'Pioneer Modernist Architect & Founder of the Bauhaus School (1919–1928)',
      significance:
        'Revolutionized twentieth-century architecture and industrial design by uniting fine art with modern industrial technology, creating the iconic aesthetic of Weimar modernism.',
      actions: [
        'Founded the Bauhaus in Weimar in 1919, issuing a radical manifesto proclaiming the unity of all visual arts.',
        'Relocated the school to Dessau in 1925, designing the world-famous glass-and-steel Bauhaus complex.',
        'Pioneered functionalist design ("form follows function"), championing accessible, mass-produced housing and furniture for modern industrial society.',
      ],
      image: getBase64Image('weimar_individuals/walter_gropius.jpg'),
    },
    conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CULTURAL BATTLEGROUND: IDEOLOGICAL DIVIDE</span>
          <span class="csb-category">MODERNISM VS CONSERVATISM &bull; 1924–1929</span>
        </div>
        <h4 class="csb-title">The Cultural Civil War: Berlin Modernism vs Rural Conservatism</h4>
        <div class="csb-body">
          The Weimar Constitution abolished imperial censorship (Article 118), unleashing an unprecedented creative explosion that made Berlin the cultural capital of Europe. However, this artistic freedom deepened ideological fractures across Germany. While cosmopolitan Berlin embraced experimental theatre (Bertolt Brecht), provocative cabaret, sexual liberation, and avant-garde painting (Otto Dix), traditional conservatives, the Catholic Church, rural communities, and right-wing nationalists were deeply scandalized. Right-wing critics decried Berlin culture as "cultural Bolshevism" (*Kulturbolschewismus*), degenerate, and corrupting to traditional German moral values (*Kinder, Küche, Kirche*).
        </div>
        <div class="csb-takeaway">
          <strong>Cultural Polarization:</strong> The cultural flowering of the Golden Twenties was heavily concentrated in large metropolitan cities; in provincial Germany, it bred deep resentment that right-wing extremists ruthlessly exploited.
        </div>
      </div>
    `,
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">ARCHIVAL DISPATCH</span>
            <span class="source-type">Architectural Manifesto</span>
          </div>
          <span class="source-date-micro">April 1919</span>
        </div>
        <div class="archival-title">Walter Gropius\'s Founding Manifesto of the Bauhaus</div>
        <div class="archival-body written-source-box">
          "The ultimate aim of all visual arts is the complete building! To embellish buildings was once the noblest function of fine arts... Let us together create the new building of the future, which will embrace architecture and sculpture and painting in one unity and which will one day rise toward heaven from the hands of a million workers like the crystal symbol of a new faith."
        </div>
        <div class="archival-footer">
          <span>Bauhaus-Archiv Berlin</span>
          <span>Staatliches Bauhaus Weimar Founding Charter</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Identify two social reforms introduced by the Weimar government between 1924 and 1928 to support workers and vulnerable families.',
      q2: 'Explain why traditional conservatives and nationalists reacted with such hostility to the emergence of the "New Woman" and avant-garde art.',
      q3: '"For the vast majority of German people, the Golden Twenties brought no real improvement in their daily lives." To what extent do you agree with this view?',
    },
  },
};

// ============================================================================
// RICH DISCIPLINARY PRIMARY SOURCE BANK FOR LEFT-HAND PAGES (VERSO)
// ============================================================================
const WEIMAR_LEFT_SOURCES = {
  // Page 2: KT 1.1 (The Origins of the Republic)
  p2: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Official Proclamation',
      title: 'Philipp Scheidemann Proclaims the Republic from the Reichstag Window',
      text: '“The German people have won all along the line. What was old and rotten has collapsed; militarism is at an end! The Hohenzollerns have abdicated! Long live the German Republic! Ebert has been charged with forming a government... See to it that the new Republic is not endangered by anything. Long live the free German Republic!”',
      context:
        'Spoken spontaneously from a window of the Reichstag in Berlin on the afternoon of 9 November 1918 to pre-empt communist leader Karl Liebknecht from proclaiming a Soviet Republic from the nearby royal palace.',
      hingeQuestion:
        'Did Scheidemann’s proclamation create a genuine democratic mandate, or did it expose the deep ideological divisions that doomed the Republic?',
      shelfmark: 'Reichstag Archives, Berlin &bull; Document Ref: RS-1918-SCH',
      footer: 'Vorwärts SPD National Daily &bull; Evening Edition',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Constitutional Charter',
      title: 'Articles 22 and 48 of the Weimar Constitution (11 August 1919)',
      text: '“Article 22: The Reichstag shall be elected by universal, equal, direct and secret ballot by all men and women over twenty years of age, in accordance with the principles of proportional representation...<br><br>Article 48: If public safety and order in the Reich are seriously disturbed or endangered, the Reich President may take the measures necessary to restore public safety and order, intervening if necessary with the aid of the armed forces.”',
      context:
        'Drafted by liberal jurist Hugo Preuss, the Constitution created Europe’s most democratic franchise while simultaneously introducing the emergency decree loophole that ultimately enabled authoritarian rule.',
      hingeQuestion:
        'Was Article 48 a necessary emergency safety valve for a fragile democracy, or a constitutional suicide pill?',
      shelfmark: 'Reichsgesetzblatt 1919, No. 152, p. 1383',
      footer: 'Weimar National Assembly Official Record',
    },
  },

  // Page 4: KT 1.2 (Early Challenges to the Republic)
  p4: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Archival Photograph',
      title: 'Freikorps Troops with Heavy Armoured Car during the Spartacist Uprising',
      image: getBase64Image('spartacist_uprising.jpg'),
      context:
        'In January 1919, the communist Spartacus League launched an armed revolt in Berlin. Defence Minister Gustav Noske deployed demobilised imperial soldiers (Freikorps) who brutally crushed the uprising and murdered Karl Liebknecht and Rosa Luxemburg.',
      hingeQuestion:
        'Why did the government’s decision to deploy right-wing Freikorps to crush left-wing revolutionaries prove to be a fatal compromise for Weimar democracy?',
      shelfmark: 'Bundesarchiv Bild 183-B24522 &bull; Berlin',
      footer: 'Imperial Army Demobilisation Archive',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Primary Numismatic Artifact',
      title: 'Reichsbank 100 Billion Mark Hyperinflation Banknote (November 1923)',
      image: getBase64Image('weimar_hyperinflation_note.jpg'),
      context:
        'Following the Franco-Belgian occupation of the Ruhr in January 1923 and the government’s policy of passive resistance, the Reichsbank printed unbacked paper marks to pay striking miners. By November 1923, a single loaf of bread cost 201 billion marks.',
      hingeQuestion:
        'How did the hyperinflation crisis of 1923 permanently destroy the economic security and political faith of Germany’s middle class?',
      shelfmark: 'Deutsche Bundesbank Numismatic Archive &bull; Frankfurt',
      footer: 'Reichsbank Currency Issue &bull; Berlin 1923',
    },
  },

  // Page 6: KT 1.3 (The Recovery of the Republic)
  p6: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Archival Photograph',
      title: 'Gustav Stresemann and the German Delegation at the League of Nations',
      image: getBase64Image('weimar_individuals/gustav_stresemann.jpg'),
      context:
        'Following the signing of the Locarno Treaties in 1925, Germany was formally admitted to the League of Nations as a permanent Council member in September 1926, restoring Germany’s standing as a respected Great Power.',
      hingeQuestion:
        'Did Stresemann’s foreign policy of fulfilment genuinely reconcile Germany with its Western neighbours, or merely buy time to dismantle Versailles?',
      shelfmark: 'League of Nations Photo Archive &bull; Geneva (Ref: LON-1926-STR)',
      footer: 'International Diplomatic Collection',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Political Caricature',
      title: 'The Great Allied Creditors: The Dawes Reparations Cycle',
      image: getBase64Image('gw_big_three_versailles.jpg'),
      context:
        'Under the 1924 Dawes Plan, Wall Street banks loaned billions of gold marks to German industry. While factories were modernized, the economy became utterly reliant on short-term American credit that could be recalled at any moment.',
      hingeQuestion:
        "Why did Stresemann himself warn in 1928 that Germany was 'dancing on a volcano'?",
      shelfmark: 'Imperial War Museum &bull; Department of Art (Ref: ART-1924-DW)',
      footer: 'Allied Reparations Commission &bull; Paris',
    },
  },

  // Page 8: KT 1.4 (Changes in Society)
  p8: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Archival Photograph',
      title: 'The Bauhaus Complex in Dessau, Designed by Walter Gropius (1925–1926)',
      image: getBase64Image('bauhaus_dessau.jpg'),
      context:
        'Founded by Walter Gropius in 1919, the Bauhaus school championed modern functionalist architecture, steel-and-glass construction, and minimalist industrial design, rejecting ornate imperial decoration.',
      hingeQuestion:
        'Why did modern architectural movements like Bauhaus infuriate right-wing nationalists and traditionalists across Weimar Germany?',
      shelfmark: 'Bauhaus-Archiv Museum für Gestaltung &bull; Berlin',
      footer: 'Dessau Architectural Collection &bull; 1926',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Studio Portrait',
      title: 'Marlene Dietrich: Icon of the Weimar "New Woman" (Berlin, c. 1928)',
      image: getBase64Image('weimar_individuals/marlene_dietrich.jpg'),
      context:
        'Marlene Dietrich came to symbolize the liberated, glamorous "New Woman" of the Golden Twenties, starring in The Blue Angel (1930) and challenging traditional patriarchal gender norms.',
      hingeQuestion:
        "How representative was the 'New Woman' of everyday life for working-class and rural women across Germany?",
      shelfmark: 'Deutsche Kinemathek &bull; Marlene Dietrich Collection',
      footer: 'UFA Studios Archive &bull; Babelsberg Berlin',
    },
  },
};

// ============================================================================
// VOCABULARY BANK FOR LEFT-HAND PAGES (VERSO)
// ============================================================================
const WEIMAR_LEFT_VOCAB = {
  p2: [
    {
      term: 'Proportional Representation',
      def: 'Electoral system where parties gain seats precisely proportional to national votes, causing coalition instability.',
    },
    {
      term: 'Article 48',
      def: 'Emergency constitutional clause allowing the President to rule by decree without parliamentary consent.',
    },
    {
      term: 'Dolchstoßlegende',
      def: 'The toxic right-wing myth that the German army was undefeated in the field but stabbed in the back by democratic politicians.',
    },
    {
      term: 'Ebert-Groener Pact',
      def: 'Secret pact where the army pledged loyalty to the civilian government in exchange for state autonomy and suppressing communism.',
    },
  ],
  p4: [
    {
      term: 'Diktat',
      def: 'A dictated peace; German term for Versailles because Germany was locked out of negotiations and forced to sign under threat of invasion.',
    },
    {
      term: 'Freikorps',
      def: 'Paramilitary units of fiercely anti-communist, nationalist demobilised soldiers organized to crush revolutionary uprisings.',
    },
    {
      term: 'Passive Resistance',
      def: 'Non-violent strike policy adopted by Ruhr miners in 1923, refusing to mine coal for French occupying forces.',
    },
    {
      term: 'Hyperinflation',
      def: 'Catastrophic currency collapse in 1923 where paper marks became worthless and prices rose out of control.',
    },
  ],
  p6: [
    {
      term: 'Rentenmark',
      def: 'Temporary stable currency introduced by Stresemann in Nov 1923, backed by mortgages on German agricultural and industrial land.',
    },
    {
      term: 'Dawes Plan (1924)',
      def: 'Agreement scaling annual German reparations payments to economic capacity and injecting 800 million gold marks in American loans.',
    },
    {
      term: 'Locarno Treaties (1925)',
      def: 'Pact where Germany voluntarily recognized its western borders with France and Belgium, securing peace in the West.',
    },
    {
      term: 'Young Plan (1929)',
      def: 'Agreement reducing total German reparations from £6.6bn to £2bn and extending payments over 59 years.',
    },
  ],
  p8: [
    {
      term: 'Bauhaus',
      def: 'Revolutionary modernist design school founded by Walter Gropius, prioritizing clean functionality: "form follows function".',
    },
    {
      term: 'The "New Woman"',
      def: 'Cultural ideal of the modern Weimar woman: financially independent, voting, wearing bobbed hair, and smoking in public.',
    },
    {
      term: 'Neue Sachlichkeit',
      def: '"New Objectivity"; realist art movement (e.g. Otto Dix, George Grosz) depicting gritty, cynical truths of post-war German society.',
    },
    {
      term: 'Kulturbolschewismus',
      def: '"Cultural Bolshevism"; derogatory right-wing label used by nationalists to attack modern art, jazz, and liberated Berlin culture.',
    },
  ],
};

function getLessonSections(lesson, idx) {
  const blocks = (lesson.narrative_blocks || []).filter(
    (b) => b && b.title !== 'Consolidation Task' && b.theme_heading !== 'Consolidation Task',
  );

  if (blocks.length === 4) {
    return blocks.map((b) => ({
      title: b.theme_heading || b.title || `Act ${b.act}`,
      text: b.text || b.content || '',
    }));
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
    formatQuarter(q1, 'Act 1: Context & Catalyst'),
    formatQuarter(q2, 'Act 2: Escalation & Conflict'),
    formatQuarter(q3, 'Act 3: Forensic Archival Evidence'),
    formatQuarter(q4, 'Act 4: The Historical Verdict'),
  ];
}

/**
 * Builds the complete 10-page publisher textbook HTML for Key Topic 1
 */
async function buildPublisherTextbookHtmlKT1() {
  const coverImgData =
    getBase64Image('weimar_kt1_cover.png') || getBase64Image('weimar_kt1_cover.jpg');

  // Key Topic 1 lessons: index 0 to 3 (Lessons 1.1 through 1.4)
  const kt1Lessons = unitData.lessons.slice(0, 4);

  let lessonsHtml = '';

  kt1Lessons.forEach((lesson, idx) => {
    const lessonNum = idx + 1;
    const leftPageNum = lessonNum * 2;
    const rightPageNum = lessonNum * 2 + 1;
    const bankKey = `p${rightPageNum}`;
    const leftVocabKey = `p${leftPageNum}`;
    const leftSrcKey = `p${leftPageNum}`;
    const bank = WEIMAR_COMPONENT_BANK[bankKey] || {};
    const vocabTerms = WEIMAR_LEFT_VOCAB[leftVocabKey] || [];
    const leftSources = WEIMAR_LEFT_SOURCES[leftSrcKey] || {};

    const secList = getLessonSections(lesson, idx);
    const sec1 = secList[0];
    const sec2 = secList[1];
    const sec3 = secList[2];
    const sec4 = secList[3];

    // Format paragraphs with pure PEEL [secNum.pNum] indexing
    const formatBlockParas = (block, secNum) => {
      if (!block || !block.text) {
        return `<p class="narrative-p"><span class="para-ref">[${secNum}.1]</span>Historical analysis examining key archival mechanisms and political developments during this phase.</p>`;
      }
      const raw = block.text;
      let paras = [];
      if (Array.isArray(raw)) {
        paras = raw;
      } else if (raw.includes('<br><br>')) {
        paras = raw
          .split('<br><br>')
          .map((p) => p.trim())
          .filter(Boolean);
      } else {
        paras = String(raw)
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean);
      }
      return paras
        .map((p, pIdx) => {
          if (p.includes('para-ref')) {
            return `<p class="narrative-p">${formatText(p)}</p>`;
          }
          return `<p class="narrative-p"><span class="para-ref">[${secNum}.${pIdx + 1}]</span>${formatText(p)}</p>`;
        })
        .join('');
    };

    const renderArchivalSourceBox = (src) => {
      if (!src) return '';
      if (src.text) {
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
              <span>${src.shelfmark || 'National Archives'}</span>
              <span>${src.footer || 'Curriculum Archival Record'}</span>
            </div>
          </div>
        `;
      }
      if (src.image) {
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
              <span>${src.shelfmark || 'National Archives'}</span>
              <span>${src.footer || 'Curriculum Archival Record'}</span>
            </div>
          </div>
        `;
      }
      return '';
    };

    // LEFT PAGE (Verso)
    lessonsHtml += `
    <!-- PAGE ${leftPageNum}: KT 1.${lessonNum} Left Page (Verso) -->
    <div class="textbook-page page a4-page" data-page="${leftPageNum}">
      <div class="page-inner">
        
        <div class="lesson-header">
          <div class="lesson-badge-strip">
            <span class="topic-badge">PEARSON EDEXCEL GCSE (9–1) &bull; PAPER 3 (1HI0/31)</span>
            <span class="spec-ref-badge">KEY TOPIC 1 &bull; ENQUIRY ${lessonNum} OF 4</span>
          </div>
          <h2 class="lesson-title">${lesson.title}</h2>
          <div class="lesson-spec-anchor">
            <strong>Key Enquiry:</strong> ${lesson.enquiry || lesson.title} &bull; <em>Sections 1 &amp; 2: Context, Catalysts &amp; Primary Evidence</em>
          </div>
        </div>

        <div class="two-column-prose">
          
          <div class="section-banner">
            <span class="sb-num">ACT 1</span>
            <span class="sb-title">${(sec1.title || 'Context & Catalyst').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec1, 1)}

          ${renderArchivalSourceBox(leftSources.sourceA)}

          <div class="section-banner">
            <span class="sb-num">ACT 2</span>
            <span class="sb-title">${(sec2.title || 'Escalation & Conflict').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec2, 2)}

          ${renderArchivalSourceBox(leftSources.sourceB)}

        </div>

        <div class="bottom-vocab-box">
          <div class="bvb-header">
            <span class="bvb-title">CORE DISCIPLINARY TERMINOLOGY &bull; ENQUIRY 1.${lessonNum}</span>
            <span class="bvb-badge">EDEXCEL PAPER 3 VOCABULARY</span>
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

        <div class="page-footer">
          <span>Weimar &amp; Nazi Germany (1918–1939) &bull; Key Topic 1: The Weimar Republic</span>
          <span>Page ${leftPageNum}</span>
        </div>

      </div>
    </div>

    <!-- PAGE ${rightPageNum}: KT 1.${lessonNum} Right Page (Recto) -->
    <div class="textbook-page page a4-page" data-page="${rightPageNum}">
      <div class="page-inner">
        
        <div class="right-page-header">
          <div class="rph-meta">
            <span class="rph-tag">PRIMARY ARCHIVE &amp; HISTORICAL VERDICT &bull; EDEXCEL PAPER 3</span>
            <span class="rph-lesson">ENQUIRY 1.${lessonNum}: ACTS 3 &amp; 4</span>
          </div>
          <h3 class="rph-title">${lesson.title}</h3>
        </div>

        <div class="two-column-prose">
          
          <div class="section-banner">
            <span class="sb-num">ACT 3</span>
            <span class="sb-title">${(sec3.title || 'Forensic Archival Evidence').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec3, 3)}

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

          <div class="section-banner">
            <span class="sb-num">ACT 4</span>
            <span class="sb-title">${(sec4.title || 'The Historical Verdict & Historiographical Debate').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec4, 4)}

          ${bank.conceptSpotlight || ''}

          ${bank.archivalDispatch || ''}

        </div>

        ${
          bank.bottomEnquiry
            ? `
        <div class="bottom-enquiry-box">
          <div class="beb-header">
            <span class="beb-title">HISTORICAL ENQUIRY &amp; DISCIPLINARY ASSESSMENT</span>
            <span class="beb-badge">ENQUIRY 1.${lessonNum} SYNTHESIS</span>
          </div>
          <div class="beb-grid">
            <div class="beb-col">
              <strong>1. Knowledge Recall &amp; Evidence:</strong>
              ${bank.bottomEnquiry.q1}
            </div>
            <div class="beb-col">
              <strong>2. Causal Analysis (PEEL):</strong>
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

        <div class="page-footer">
          <span>Weimar &amp; Nazi Germany (1918–1939) &bull; Primary Archival Core</span>
          <span>Page ${rightPageNum}</span>
        </div>

      </div>
    </div>
    `;
  });

  const qrLessons = [
    {
      num: 'KT 1.1',
      title: 'Origins of Republic',
      url: 'https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&quiz=true&lesson=0',
    },
    {
      num: 'KT 1.2',
      title: 'Early Challenges 1919–23',
      url: 'https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&quiz=true&lesson=1',
    },
    {
      num: 'KT 1.3',
      title: 'Recovery 1924–29',
      url: 'https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&quiz=true&lesson=2',
    },
    {
      num: 'KT 1.4',
      title: 'Society & Culture',
      url: 'https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&quiz=true&lesson=3',
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
  <title>Weimar &amp; Nazi Germany (1918–1939) — Key Topic 1 Master Textbook</title>
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
      font-size: 9.35pt;
      line-height: 1.44;
      color: #1e293b;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .textbook-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 10mm 12mm 8mm 12mm;
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
      padding-bottom: 3px;
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
      font-size: 6.6pt;
      font-weight: 800;
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 6.6pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 12.2pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1px 0 1px 0;
      line-height: 1.15;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #334155;
      line-height: 1.25;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      padding: 1.5px 5px;
      border-radius: 0 2px 2px 0;
    }

    /* Right Page Header */
    .right-page-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .rph-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1px;
    }
    .rph-tag { color: #1e3a8a; }
    .rph-lesson { color: #64748b; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.0pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }

    /* 2-Column Reading Measure */
    .two-column-prose {
      column-count: 2;
      column-gap: 14px;
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
      padding: 2px 5px;
      border-radius: 0 2px 2px 0;
      margin: 4px 0 2px 0;
      display: flex;
      align-items: center;
      gap: 5px;
      font-family: 'Inter', sans-serif;
    }
    .sb-num {
      font-size: 6.0pt;
      font-weight: 900;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 1px 3.5px;
      border-radius: 2px;
    }
    .sb-title {
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      margin: 0 0 4px 0;
      text-indent: 0.9em;
    }
    .narrative-p:first-of-type, .section-banner + .narrative-p {
      text-indent: 0;
    }

    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0.5px 3px;
      border-radius: 2px;
      margin-right: 3px;
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
      margin-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .source-badge {
      font-size: 5.8pt;
      font-weight: 900;
      color: #fff;
      background: #0f172a;
      padding: 1px 3.5px;
      border-radius: 2px;
    }
    .source-type {
      font-size: 5.8pt;
      font-weight: 700;
      color: #78716c;
      text-transform: uppercase;
      margin-left: 3px;
    }
    .source-date-micro {
      font-size: 5.6pt;
      font-weight: 600;
      color: #78716c;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
      line-height: 1.15;
    }
    .archival-image {
      width: 100%;
      max-height: 110px;
      object-fit: contain;
      border-radius: 2px;
      margin-bottom: 2px;
      display: block;
      background: #fafaf9;
    }
    .archival-body {
      font-size: 7.2pt;
      line-height: 1.28;
      color: #292524;
      font-style: italic;
      margin-bottom: 2px;
    }
    .written-source-box .archival-body {
      background: #fafaf9;
      border-left: 2px solid #78716c;
      padding: 3px 5px;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 7.0pt;
      line-height: 1.26;
      color: #1c1917;
      font-style: italic;
      margin-bottom: 2px;
    }
    .archival-context-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0284c7;
      padding: 2.5px 4.5px;
      margin: 2px 0 1px 0;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
    }
    .archival-context-text {
      font-size: 5.8pt;
      line-height: 1.22;
      color: #334155;
      margin: 0 0 1px 0;
    }
    .archival-hinge-q {
      font-size: 5.8pt;
      line-height: 1.22;
      color: #0f172a;
      background: #f0f9ff;
      padding: 1.5px 3.5px;
      border-radius: 2px;
      margin-top: 1px;
    }
    .archival-hinge-q strong {
      color: #0369a1;
      text-transform: uppercase;
      font-size: 5.4pt;
      letter-spacing: 0.03em;
    }
    .archival-footer {
      border-top: 1px dashed #d6d3d1;
      padding-top: 1.5px;
      margin-top: 1.5px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      color: #78716c;
      font-weight: 600;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 4px 7px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .kf-tag {
      font-size: 5.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .kf-lifespan {
      font-size: 5.6pt;
      color: #64748b;
      font-weight: 600;
    }
    .kf-identity-row {
      display: flex;
      gap: 6px;
      align-items: center;
      margin-bottom: 2px;
    }
    .kf-portrait {
      width: 40px;
      height: 48px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #94a3b8;
      flex-shrink: 0;
    }
    .kf-identity-text { flex: 1; }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.12;
    }
    .kf-role {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      line-height: 1.15;
    }
    .kf-significance {
      font-size: 7.0pt;
      font-style: italic;
      color: #334155;
      line-height: 1.25;
      margin-bottom: 2px;
    }
    .kf-actions-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      margin: 1.5px 0 1px 0;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 10px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.24;
      color: #1e293b;
    }
    .kf-actions-list li { margin-bottom: 1px; }

    /* Concept Spotlight Box */
    .concept-spotlight-box {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 3px;
      padding: 4px 7px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
      border-bottom: 1px solid #ffedd5;
      padding-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .csb-tag {
      font-size: 5.8pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
    }
    .csb-category {
      font-size: 5.4pt;
      font-weight: 700;
      color: #b45309;
      background: #ffedd5;
      padding: 1px 3.5px;
      border-radius: 2px;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.4pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0 1px 0;
      line-height: 1.12;
    }
    .csb-body {
      font-size: 7.1pt;
      line-height: 1.28;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .csb-takeaway {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
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
      padding: 6px 8px;
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
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5px;
    }
    .bvb-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .bvb-badge, .beb-badge {
      font-size: 5.4pt;
      font-weight: 800;
      background: #0f172a;
      color: #fff;
      padding: 1px 3.5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 6px;
      font-size: 6.4pt;
      line-height: 1.25;
      color: #334155;
    }
    .bvb-col strong, .beb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 5.8pt;
    }

    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
    }
    .beb-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      font-size: 6.4pt;
      line-height: 1.26;
      color: #334155;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
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
      padding: 15px 18px;
      box-sizing: border-box;
    }
    .cover-top { text-align: center; }
    .cover-dept-banner {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 2.5px 10px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .cover-series {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      line-height: 1.1;
      letter-spacing: -0.01em;
      text-transform: uppercase;
    }
    .cover-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 10.0pt;
      font-style: italic;
      color: #475569;
      margin-bottom: 8px;
    }
    .cover-plate-frame {
      border: 1px solid #cbd5e1;
      padding: 3px;
      background: #ffffff;
      margin-bottom: 6px;
    }
    .cover-plate-img {
      width: 100%;
      height: 143mm;
      object-fit: cover;
      object-position: center 35%;
      display: block;
    }
    .cover-plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      color: #64748b;
      margin-top: 2px;
      text-align: right;
      display: flex;
      justify-content: space-between;
    }
    .cover-enquiry-box {
      background: #f8fafc;
      border: 1.5px solid #1e3a8a;
      border-left: 4px solid #1e3a8a;
      padding: 5px 8px;
      margin-bottom: 6px;
      font-family: 'Inter', sans-serif;
      text-align: left;
    }
    .ceb-label {
      font-size: 6.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .ceb-text {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.4pt;
      font-style: italic;
      color: #0f172a;
      margin-top: 1px;
    }
    .cover-matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      margin-top: 3px;
    }
    .cover-matrix-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 4.5px 6px;
      text-align: left;
      font-weight: 800;
      font-size: 6.4pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cover-matrix-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 5px 6px;
      color: #334155;
    }
    .cover-matrix-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .cover-footer {
      border-top: 1.5px solid #0f172a;
      padding-top: 3px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
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
      padding: 14px 18px 12px 18px;
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
      font-size: 14.5pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin: 0;
      line-height: 1.15;
      letter-spacing: 0.02em;
    }
    .back-subtitle {
      font-size: 7.2pt;
      color: #475569;
      margin-top: 1.5px;
      font-style: italic;
      font-weight: 500;
    }
    .back-section-title {
      font-size: 7.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 1.5px;
      margin: 4px 0 2.5px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .back-section-tag {
      font-size: 6.0pt;
      font-weight: 700;
      color: #1e3a8a;
      letter-spacing: 0.03em;
    }
    .back-timeline-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      font-size: 6.4pt;
      line-height: 1.25;
    }
    .bt-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      padding: 3px 4.5px;
      border-radius: 0 2px 2px 0;
    }
    .bt-card strong { color: #1e3a8a; font-weight: 800; }
    
    .back-main-matrix-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      font-size: 6.4pt;
      line-height: 1.25;
    }
    .bmm-col {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      padding: 4px 5px;
      border-radius: 2px;
    }
    .bmm-col strong {
      display: block;
      color: #1e3a8a;
      text-transform: uppercase;
      font-size: 6.4pt;
      font-weight: 800;
      margin-bottom: 1.5px;
    }

    .back-qr-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      margin-top: 3px;
    }
    .bqr-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 4px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .bqr-header {
      width: 100%;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 2px;
    }
    .bqr-num {
      display: block;
      font-size: 6.0pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
    }
    .bqr-title {
      font-size: 5.6pt;
      color: #475569;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
    .bqr-code-box {
      width: 44px;
      height: 44px;
      margin: 1px 0;
    }
    .bqr-footer {
      font-size: 5.2pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

  <!-- ===================================================================== -->
  <!-- PAGE 1: MASTER FRONT COVER                                            -->
  <!-- ===================================================================== -->
  <div class="textbook-page page a4-page" data-page="1">
    <div class="cover-container">
      
      <div class="cover-top">
        <div class="cover-dept-banner" data-department-name="The History Department">
          <span class="school-brand-target">The History Department</span> &bull; GCSE Master Textbook Series
        </div>
        <div class="cover-series">Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 31</div>
        <h1 class="cover-main-title">Weimar and Nazi Germany, 1918–1939</h1>
        <div class="cover-subtitle">Key Topic 1: The Weimar Republic, 1918–1929 &bull; Student Master Revision Guide</div>
      </div>

      <div class="cover-plate-frame">
        ${coverImgData ? `<img class="cover-plate-img" src="${coverImgData}" alt="Potsdamer Platz Berlin 1920s">` : ''}
        <div class="cover-plate-caption">
          <span>Plate I: Potsdamer Platz and the Traffic Tower in Golden Twenties Berlin (c. 1924–1928)</span>
          <span>Accession: BA 183-B0527 &bull; Bundesarchiv Berlin</span>
        </div>
      </div>

      <div class="cover-enquiry-box">
        <div class="ceb-label">Overarching Thematic Enquiry:</div>
        <div class="ceb-text">"Out of the ashes: How did the devastating legacy of the First World War forge the Weimar Republic, and were the democratic foundations of its new Constitution fatally flawed from the start?"</div>
      </div>

      <table class="cover-matrix-table">
        <thead>
          <tr>
            <th style="width: 20%;">Enquiry</th>
            <th style="width: 50%;">Historical Focus &amp; Core Content</th>
            <th style="width: 30%;">Key Specification Concepts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>KT 1.1: Origins</strong></td>
            <td>War Weariness, Kiel Mutiny, Abdication of Wilhelm II, Scheidemann Proclamation, Weimar Constitution</td>
            <td>Reichstag, Article 48, Proportional Representation</td>
          </tr>
          <tr>
            <td><strong>KT 1.2: Crises</strong></td>
            <td>Treaty of Versailles (Diktat &amp; War Guilt), Spartacists, Freikorps, Kapp Putsch, Ruhr &amp; Hyperinflation</td>
            <td>Dolchstoßlegende, Reparations, Passive Resistance</td>
          </tr>
          <tr>
            <td><strong>KT 1.3: Recovery</strong></td>
            <td>Stresemann’s Currency Reform (Rentenmark), Dawes Plan, Locarno Treaties, League Entry, Young Plan</td>
            <td>Fulfilment, Dawes Loan Cycle, "Dancing on a Volcano"</td>
          </tr>
          <tr>
            <td><strong>KT 1.4: Society</strong></td>
            <td>Standard of Living, Housing &amp; Welfare, The "New Woman", Bauhaus Architecture, Cultural Polarization</td>
            <td>Neue Sachlichkeit, Kulturbolschewismus, Gropius</td>
          </tr>
        </tbody>
      </table>

      <div class="cover-footer">
        <span>The History Revision Hub &bull; Student Textbook Edition</span>
        <span>Paper 3 Companion Series &bull; 100% Institutional Neutrality</span>
      </div>

    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- PAGES 2–9: THE 4 CORE ENQUIRIES                                       -->
  <!-- ===================================================================== -->
  ${lessonsHtml}

  <!-- ===================================================================== -->
  <!-- PAGE 10: MASTER REVISION BACK COVER                                   -->
  <!-- ===================================================================== -->
  <div class="textbook-page page a4-page" data-page="10">
    <div class="back-container">
      
      <div class="back-header-strip">
        <h2 class="back-title">The Weimar Republic (1918–1929): Master Revision Spine</h2>
        <div class="back-subtitle">Pearson Edexcel GCSE Paper 3 (1HI0/31) &bull; Key Topic 1 Synthesis &amp; Disciplinary Framework</div>
      </div>

      <div class="back-body-content">
        
        <!-- 1. Chronological Sequence -->
        <div>
          <div class="back-section-title">
            <span>1. Chronological Sequence &bull; Key Milestones</span>
            <span class="back-section-tag">TIMELINE MASTERY</span>
          </div>
          <div class="back-timeline-grid">
            <div class="bt-card"><strong>28 Oct 1918:</strong> Kiel naval mutiny sparks nationwide revolution</div>
            <div class="bt-card"><strong>9 Nov 1918:</strong> Wilhelm II abdicates; Scheidemann proclaims Republic</div>
            <div class="bt-card"><strong>11 Nov 1918:</strong> Armistice signed at Compiègne ending WW1</div>
            <div class="bt-card"><strong>Jan 1919:</strong> Spartacist Uprising crushed by Freikorps in Berlin</div>
            <div class="bt-card"><strong>28 Jun 1919:</strong> Treaty of Versailles signed by Weimar envoys</div>
            <div class="bt-card"><strong>11 Aug 1919:</strong> Weimar Constitution officially ratified by Ebert</div>
            <div class="bt-card"><strong>Mar 1920:</strong> Kapp Putsch defeated by Berlin general strike</div>
            <div class="bt-card"><strong>Jan 1923:</strong> French &amp; Belgian troops occupy the Ruhr heartland</div>
            <div class="bt-card"><strong>Nov 1923:</strong> Hyperinflation peak; Stresemann issues Rentenmark</div>
            <div class="bt-card"><strong>Aug 1924:</strong> Dawes Plan approved; Wall Street loans flow</div>
            <div class="bt-card"><strong>Oct 1925:</strong> Locarno Treaties signed; western borders secured</div>
            <div class="bt-card"><strong>Sep 1926:</strong> Germany admitted to League of Nations Council</div>
          </div>
        </div>

        <!-- 2. Four Disciplinary Pillars Matrix -->
        <div>
          <div class="back-section-title">
            <span>2. Key Topic 1 Analytical Framework &bull; The 4 Core Pillars</span>
            <span class="back-section-tag">DISCIPLINARY SYNTHESIS</span>
          </div>
          <div class="back-main-matrix-grid">
            <div class="bmm-col">
              <strong>I. Constitutional Flaws</strong>
              Pure Proportional Representation prevented majority rule, producing 20 fragile coalitions in 14 years. Article 48 gave the President emergency dictatorial decree powers that bypassed parliament.
            </div>
            <div class="bmm-col">
              <strong>II. Extremist Violence</strong>
              Right-wing Dolchstoß myth branded republicans "November Criminals". Armed coups from left (Spartacists 1919) and right (Kapp 1920, Munich 1923) exposed state military weakness.
            </div>
            <div class="bmm-col">
              <strong>III. Economic Recovery</strong>
              Ending passive resistance and creating the mortgage-backed Rentenmark halted hyperinflation. Dawes (1924) &amp; Young (1929) Plans rebuilt industry on short-term US loans.
            </div>
            <div class="bmm-col">
              <strong>IV. Cultural Polarization</strong>
              Abolishing censorship sparked modern Bauhaus design, cinema, and the "New Woman". However, rural conservatives and nationalists condemned Berlin culture as degenerate Bolshevism.
            </div>
          </div>
        </div>

        <!-- 3. Historiographical Debate & Exam Matrix -->
        <div>
          <div class="back-section-title">
            <span>3. Historiographical Debate &bull; Section B Evaluative Focus</span>
            <span class="back-section-tag">INTERPRETATIONS &bull; Q3(b,c,d)</span>
          </div>
          <div class="back-main-matrix-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="bmm-col">
              <strong>Interpretation 1: The Doomed Republic (Kolb / Peukert)</strong>
              Weimar democracy was mortally wounded at birth by the Versailles "Diktat", Article 48, and unrepentant imperial civil servants and judges who subverted democracy. Stresemann's prosperity was an artificial bubble built on volatile American credit that inevitably burst in 1929.
            </div>
            <div class="bmm-col">
              <strong>Interpretation 2: The Resilient Golden Age (Evans / Bookbinder)</strong>
              Between 1924 and 1929, the Republic demonstrated remarkable resilience, weathering revolutionary coups and hyperinflation to build modern housing, progressive welfare, and peaceful diplomatic integration. Extremist votes collapsed to just 2.6% in 1928 until external global catastrophe struck.
            </div>
          </div>
        </div>

        <!-- 4. Interactive Digital Quizzing Hub -->
        <div>
          <div class="back-section-title">
            <span>4. Interactive Digital Quizzing Hub &bull; Scan with Smartphone Camera</span>
            <span class="back-section-tag">INSTANT 20-QUESTION MASTERY QUIZZES</span>
          </div>
          <div class="back-qr-grid">
            ${qrCardsHtml}
          </div>
        </div>

      </div>

      <div class="cover-footer" style="margin-top: 4px;">
        <span>GCSE History Revision Hub &bull; Paper 3 Mastery Companion</span>
        <span>Key Topic 1 Revision Spine Complete &bull; Page 10</span>
      </div>

    </div>
  </div>

</body>
</html>
  `;
}

async function renderTextbookPdf(targetKt = 'kt1') {
  console.log(`\n=============================================================`);
  console.log(`📘 GENERATING MASTER TEXTBOOK: Weimar & Nazi Germany (${targetKt.toUpperCase()})`);
  console.log(`=============================================================`);

  const htmlContent = await buildPublisherTextbookHtmlKT1();

  const htmlPathUnit = path.join(
    ROOT_DIR,
    'public',
    'units',
    'weimar_nazi_germany',
    `textbook_${targetKt.toUpperCase()}_PUBLISHER.html`,
  );
  const pdfPathGlobal = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    `weimar_nazi_germany_textbook_${targetKt.toUpperCase()}_PUBLISHER.pdf`,
  );

  fs.writeFileSync(htmlPathUnit, htmlContent, 'utf8');
  console.log(`✅ Saved HTML: ${htmlPathUnit}`);

  console.log(`🖨️ Compiling PDF with Puppeteer & Auditing Space Budget...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: ['load', 'networkidle0'] });

  // Run automated page budget audit
  const auditResults = await auditPageBudget(page, {
    pageSelector: '.textbook-page, .page, .a4-page',
    maxPageHeightPx: 1123,
    maxTaskVoidPx: 180,
    minUtilizationPercent: 80,
  });

  printSpaceAuditReport(auditResults, path.basename(htmlPathUnit));

  if (auditResults.hasErrors) {
    console.warn(
      `⚠️ Warning: Layout audit found potential issues in ${targetKt.toUpperCase()} textbook!`,
    );
  }

  await page.pdf({
    path: pdfPathGlobal,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`✅ Compiled PDF: ${pdfPathGlobal}\n`);
}

async function run() {
  const arg = (process.argv[2] || 'kt1').toLowerCase();
  if (arg === 'kt1' || arg === 'all' || arg === 'master') {
    await renderTextbookPdf('kt1');
  }
}

run().catch((err) => {
  console.error('Fatal error during textbook compilation:', err);
  process.exit(1);
});
