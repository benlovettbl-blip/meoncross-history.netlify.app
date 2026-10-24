/**
 * scripts/render_weimar_28page_master_textbook.cjs
 *
 * UNIFIED 28-PAGE PURE NARRATIVE CLASSROOM TEXTBOOK COMPILER
 * Option 31: Weimar and Nazi Germany, 1918–1939 (Pearson Edexcel GCSE 9–1)
 *
 * Conforms strictly to the Disciplinary History Classroom Textbook Standard & GCSE Master Engine:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim SSoT fidelity to units/weimar_nazi_germany/data.js narrative_blocks
 * - Exactly 28 pages (7 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1:  Master Front Cover (Hero artwork, archival caption, overview synopsis, 12-enquiry 2x6 directory)
 * - Page 2:  Master Chronological Milestone Spine (18 defining causal turning points, 1918–1939)
 * - Page 3:  Geopolitical Theater Atlas & 4 Strategic Flashpoints (Dual cartographic perspectives + 2x2 grid)
 * - Pages 4–27: 12 Canonical Disciplinary Enquiries across 12 flat double-page spreads (Verso + Recto)
 *   * Key Topic 1: The Weimar Republic 1918–1929 (Enquiries 1–3)
 *   * Key Topic 2: Hitler's Rise to Power, 1919–1933 (Enquiries 4–6)
 *   * Key Topic 3: Nazi Control and Dictatorship, 1933–1939 (Enquiries 7–9)
 *   * Key Topic 4: Life in Nazi Germany, 1933–1939 (Enquiries 10–12)
 * - Page 28: Master 60-Question Knowledge Retrieval Quiz Back Cover (6 topic cards x 10 questions)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 * - Automated in-browser auto-fit engines:
 *   * autoFitCoverBlurb()
 *   * autoFitCoverEnquiries()
 *   * autoFitPage3Flashpoints()
 *   * autoFitSpreadTypography()
 * - Automated reprographics audit via auditPageBudget() (0px overflow, < 25px footer void, >= 95% utilization)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  if (!relativePath) return '';
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
      path.join(
        ROOT_DIR,
        'public',
        'units',
        'weimar_nazi_germany',
        'assets',
        path.basename(cleanPath),
      ),
      path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'assets', path.basename(cleanPath)),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.webp'
                ? 'image/webp'
                : ext === '.svg'
                  ? 'image/svg+xml'
                  : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return relativePath;
  } catch (err) {
    return relativePath;
  }
}

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>) and bracketed tags
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(
      /<span\s+class=["'](?:para-ref|para-pill|archival-meta-tag)["']>[^<]*<\/span>\s*/gi,
      '',
    )
    .replace(/\[\d+\.\d+[A-Z]?\]\s*/g, '')
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .replace(
      /\s*\((?:<strong>)?(?:Source|Interpretation|Figure)\s+[A-Z0-9]+(?:<\/strong>)?\)/gi,
      '',
    )
    .replace(/([a-zA-Z])"([a-zA-Z])/g, '$1" $2')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Markdown bold and italics parser for clean prose typography
function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Load canonical unit data from units/weimar_nazi_germany/data.js
function loadWeimarData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+unitData;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  return vm.runInNewContext(raw);
}

// 18 Defining Causal Turning Points for Page 2 Milestone Spine (1918–1939)
const MILESTONE_SPINE = [
  {
    date: '9 Nov 1918',
    title: 'Abdication of the Kaiser & Proclamation of the Republic',
    desc: "Amid mutiny at Kiel and mass strikes, Prince Max of Baden announces the Kaiser's abdication; Philipp Scheidemann proclaims the German Republic to preempt a communist coup.",
    ref: '1.1',
  },
  {
    date: 'Jan 1919',
    title: 'The Spartacist Uprising Crushed in Berlin',
    desc: 'Left-wing revolutionaries Karl Liebknecht and Rosa Luxemburg lead an armed insurrection; Friedrich Ebert deploys right-wing Freikorps paramilitaries, murdering the leaders.',
    ref: '2.1',
  },
  {
    date: '28 Jun 1919',
    title: 'The Treaty of Versailles Signed in Hall of Mirrors',
    desc: 'German delegates submit to the punitive Versailles Diktat: losing 13% of European territory, 100,000 troop limit, Article 231 War Guilt, and £6.6 billion reparations.',
    ref: '1.3',
  },
  {
    date: '11 Aug 1919',
    title: 'Promulgation of the Democratic Weimar Constitution',
    desc: "The National Assembly adopts Germany's first parliamentary constitution: universal suffrage and proportional representation, alongside presidential emergency powers under Article 48.",
    ref: '1.2',
  },
  {
    date: 'Mar 1920',
    title: 'The Right-Wing Kapp Putsch Broken by General Strike',
    desc: 'Wolfgang Kapp and Freikorps units seize Berlin as the army refuses to fire; the government flees to Stuttgart, but a nationwide general strike paralyses and breaks the coup.',
    ref: '2.2',
  },
  {
    date: 'Jan 1923',
    title: 'French and Belgian Military Occupation of the Ruhr',
    desc: "Following missed telegraph pole and coal deliveries, 60,000 French and Belgian troops occupy Germany's industrial heartland; the government orders passive resistance.",
    ref: '2.3',
  },
  {
    date: 'Nov 1923',
    title: 'Peak of Hyperinflation & Introduction of Rentenmark',
    desc: 'Uncontrolled money printing reduces the Mark to trillions per dollar; Chancellor Gustav Stresemann halts passive resistance and introduces the land-backed Rentenmark.',
    ref: '2.4',
  },
  {
    date: '8–9 Nov 1923',
    title: "Hitler's Bürgerbräukeller Putsch Collapses in Munich",
    desc: 'Adolf Hitler and General Ludendorff attempt to seize Bavaria; Bavarian police open fire at the Feldherrnhalle, killing 16 Nazis; Hitler is arrested for high treason.',
    ref: '4.3',
  },
  {
    date: 'Aug 1924',
    title: 'The Dawes Plan Restructures Reparations & Secures US Loans',
    desc: 'Stresemann negotiates with American banker Charles Dawes: annual payments reduced, French troops evacuate the Ruhr, and 800 million marks in US loans flow to German industry.',
    ref: '3.1',
  },
  {
    date: 'Oct 1925',
    title: "The Locarno Treaties & Germany's Diplomatic Rehabilitation",
    desc: 'Germany voluntarily guarantees its western borders with France and Belgium; the pact restores international trust, leading to Germany entering the League of Nations in 1926.',
    ref: '3.2',
  },
  {
    date: 'Oct 1929',
    title: 'The Wall Street Crash Triggers Worldwide Depression',
    desc: 'The New York Stock Exchange collapses; American banks abruptly recall short-term loans, throwing German industry into bankruptcy and unemployment to 6.1 million by 1932.',
    ref: '5.2',
  },
  {
    date: 'Jul 1932',
    title: "The Nazi Party Becomes Germany's Largest Party (230 Seats)",
    desc: 'Exploiting mass poverty, communist street brawls, and brilliant Goebbels propaganda, the NSDAP wins 37.3% of the vote, making Hitler indispensable to any parliamentary coalition.',
    ref: '5.4',
  },
  {
    date: '30 Jan 1933',
    title: 'Adolf Hitler Appointed Chancellor by President Hindenburg',
    desc: 'Convinced by Franz von Papen that Hitler can be "framed in" with only two Nazi ministers, Field Marshal Hindenburg appoints Hitler Chancellor of a conservative coalition.',
    ref: '6.4',
  },
  {
    date: '27–28 Feb 1933',
    title: 'The Reichstag Fire & The Presidential Emergency Decree',
    desc: 'Following the burning of parliament, Hitler persuades Hindenburg to issue the Decree for the Protection of People and State, suspending all civil liberties and detaining communists.',
    ref: '7.1',
  },
  {
    date: '23 Mar 1933',
    title: 'The Enabling Act Passes in the Kroll Opera House',
    desc: "Intimidated by armed SA stormtroopers and with the KPD arrested, the Reichstag votes 444 to 94 to surrender legislative power to Hitler's cabinet, ending constitutional rule.",
    ref: '7.2',
  },
  {
    date: '30 Jun 1934',
    title: 'The Night of the Long Knives: SS Blood Purge of the SA',
    desc: 'Hitler eliminates Ernst Röhm and the radical SA leadership alongside conservative rivals like Schleicher; the regular army pledges a sacred personal oath of loyalty to Hitler.',
    ref: '7.3',
  },
  {
    date: '15 Sep 1935',
    title: 'The Nuremberg Laws Enact Biological Anti-Semitism',
    desc: 'The Reich Citizenship Law and Law for the Protection of German Blood and Honour strip German Jews of civil rights and criminalize interracial marriage and relationships.',
    ref: '12.2',
  },
  {
    date: '9–10 Nov 1938',
    title: 'Kristallnacht: State-Sponsored Anti-Jewish Pogrom',
    desc: 'Following the murder of a diplomat in Paris, Goebbels orchestrates nationwide violence: 267 synagogues burned, thousands of businesses destroyed, and 30,000 Jews sent to camps.',
    ref: '12.4',
  },
];

// 4 Strategic Geopolitical Flashpoints for Page 3 (2x2 Grid)
const STRATEGIC_FLASHPOINTS = [
  {
    badge: 'FLASHPOINT 1 &bull; WESTERN SECURITY & SOVEREIGNTY',
    title: 'The Demilitarised Rhineland & The Versailles Frontier',
    text: "Under Articles 42 to 44 of the Treaty of Versailles, the Rhineland was permanently demilitarised with a 50km exclusion zone on the river's eastern bank. Allied troops occupied the left bank until 1930. This strip exposed Germany's industrial core directly to French invasion, creating permanent diplomatic humiliation and strategic defenselessness until Hitler remilitarised it in March 1936.",
  },
  {
    badge: 'FLASHPOINT 2 &bull; TERRITORIAL AMPUTATION & DANZIG',
    title: 'The Polish Corridor & East Prussian Separation',
    text: 'To grant the reborn Polish state access to the Baltic Sea, the Treaty of Versailles severed East Prussia from the rest of Germany by creating the "Polish Corridor". The historic German port of Danzig became an international "Free City" overseen by the League of Nations. This amputation inflamed bitter revisionist resentment across the political spectrum, serving as Hitler\'s eventual casus belli for war in 1939.',
  },
  {
    badge: 'FLASHPOINT 3 &bull; ECONOMIC ENGINE & FOREIGN HOSTAGE',
    title: 'The Ruhr Industrial Heartland: Coal, Steel & Invasion',
    text: "Generating over 70% of Germany’s coal and steel, the Ruhr Valley was the industrial engine of the republic. In January 1923, after missed deliveries of timber and coal, 60,000 French and Belgian troops occupied the region to seize industrial output by force. The government's declaration of passive resistance and subsequent printing of banknotes triggered the catastrophic hyperinflation crisis.",
  },
  {
    badge: 'FLASHPOINT 4 &bull; COUNTER-REVOLUTIONARY SANCTUARY',
    title: 'Bavaria: The Conservative Bastion & NSDAP Birthplace',
    text: 'Following the bloody suppression of the 1919 Munich Soviet Republic by right-wing Freikorps, Bavaria established itself as an autonomous, conservative "cell of order" (Ordnungszelle) hostile to "Red Berlin". This defiant political shelter nurtured paramilitary leagues, shielded anti-republican conspirators, and allowed Adolf Hitler\'s NSDAP to organize its abortive 1923 Bürgerbräukeller Putsch.',
  },
];

// 12 Canonical Disciplinary Enquiries (3 per Key Topic, 12 Spreads, pp. 4–27)
const ENQUIRY_EDITORIAL = [
  // --- KEY TOPIC 1: THE WEIMAR REPUBLIC 1918–1929 (Enquiries 1–3) ---
  {
    num: 1,
    ktId: 'KT1',
    shortTitle: 'Birth of the Republic & The Versailles Trauma',
    versoSubtitle:
      'Part I: Abdication, German Revolution & The Democratic Constitution (1918–1919)',
    rectoSubtitle:
      'Part II: The Versailles Diktat, Reparations & The "Stab-in-the-Back" Myth (1919–1920)',
    enquiryQuestion:
      'How did the traumatic defeat of 1918 and the Versailles Diktat mortgage the legitimacy of the Weimar democracy from its inception?',
    decisiveMechanism:
      'Institutional Delegitimisation &bull; The "Stab-in-the-Back" Myth (Dolchstoßlegende)',
    lessonSourceA: 0, // lesson_1_1 (Origins)
    lessonSourceB: 1, // lesson_1_2 (Early Challenges)
    isPaired: true,
    versoBlockIndices: [0, 1], // Revolution/Ebert + Constitution
    rectoBlockIndices: [0, 1], // Versailles terms + Diktat/War Guilt/Dolchstoss
  },
  {
    num: 2,
    ktId: 'KT1',
    shortTitle: 'Paramilitary Insurrection & Hyperinflation Cataclysm',
    versoSubtitle:
      'Part I: Left and Right Insurrections: Spartacists, Freikorps & The Kapp Putsch (1919–1922)',
    rectoSubtitle:
      'Part II: The French Occupation of the Ruhr & The Complete Collapse of the Mark (1923)',
    enquiryQuestion:
      'Why did ideological political violence and economic collapse bring the fledgling Weimar Republic to the brink of dissolution in 1923?',
    decisiveMechanism:
      'Socio-Economic Dissolution &bull; Ruhr Occupation and the Ruin of Middle-Class Savings',
    lessonSourceA: 1, // lesson_1_2 (Early Challenges)
    lessonSourceB: 2, // lesson_1_3 (Crisis & Recovery)
    isPaired: true,
    versoBlockIndices: [2, 3], // Spartacist & Freikorps + Kapp Putsch & assassinations
    rectoBlockIndices: [0, 1], // Ruhr occupation + Hyperinflation collapse
  },
  {
    num: 3,
    ktId: 'KT1',
    shortTitle: "Stresemann's Golden Twenties & Cultural Transformation",
    versoSubtitle:
      'Part I: Currency Stabilisation, Dawes & Young Plans, Locarno & League Entry (1924–1929)',
    rectoSubtitle:
      'Part II: The "New Woman", Bauhaus Architecture, Modernist Cinema & Conservative Backlash',
    enquiryQuestion:
      'To what extent was the apparent economic recovery and cultural flowering of the Golden Twenties an illusion built on foreign credit?',
    decisiveMechanism:
      'Superficial Stabilisation &bull; American Loan Dependency and the Cultural Fault Lines',
    lessonSourceA: 2, // lesson_1_3 (Crisis & Recovery)
    lessonSourceB: 3, // lesson_1_4 (Changes in Society)
    isPaired: true,
    versoBlockIndices: [2, 3], // Rentenmark/Dawes + Locarno/League/Young
    rectoBlockIndices: [1, 2], // New Woman/Society + Bauhaus/Cinema/Backlash
  },

  // --- KEY TOPIC 2: HITLER'S RISE TO POWER 1919–1933 (Enquiries 4–6) ---
  {
    num: 4,
    ktId: 'KT2',
    shortTitle: 'Genesis of the Nazi Party & The Munich Putsch',
    versoSubtitle:
      'Part I: Anton Drexler, The 25-Point Programme, Swastika & The Sturmabteilung (1919–1922)',
    rectoSubtitle:
      'Part II: The Bürgerbräukeller Coup, Feldherrnhalle Defeat & Landsberg Treason Trial (1923–1924)',
    enquiryQuestion:
      'How did a catastrophic beer hall putsch in Bavaria transform Adolf Hitler into a national figurehead on the German radical right?',
    decisiveMechanism:
      'Propaganda Martyrdom &bull; Judicial Sympathy and the Invention of the "Führer" Cult',
    lessonSourceA: 4, // lesson_2_1 (Early NSDAP)
    lessonSourceB: 5, // lesson_2_2 (Munich Putsch)
    isPaired: true,
    versoBlockIndices: [0, 1], // Drexler/25-Point + Swastika/SA
    rectoBlockIndices: [0, 2], // Bürgerbräukeller/Feldherrnhalle + Landsberg/Mein Kampf
  },
  {
    num: 5,
    ktId: 'KT2',
    shortTitle: 'The Lean Years, Wall Street Crash & Electoral Surge',
    versoSubtitle:
      'Part I: The Bamberg Conference, Legal Strategy & The Electoral Wilderness (1924–1929)',
    rectoSubtitle:
      "Part II: The Depression Shock, Six Million Jobless, Brüning's Deflation & Electoral Breakthrough",
    enquiryQuestion:
      "Why did the economic paralysis of the Great Depression propel the NSDAP from the political fringes to Germany's largest party?",
    decisiveMechanism:
      'Systemic Crisis Mobilisation &bull; Mass Unemployment, Red Fear, and Modern Propaganda',
    lessonSourceA: 5, // lesson_2_2 (Munich Putsch/Lean Years)
    lessonSourceB: 6, // lesson_2_3 (Growth in Support)
    isPaired: true,
    versoBlockIndices: [3, 4], // Bamberg Conference + Lean Years 2.6%
    rectoBlockIndices: [1, 4], // Brüning Article 48/Unemployment + Goebbels/1932 230 seats
  },
  {
    num: 6,
    ktId: 'KT2',
    shortTitle: 'The Collapse of Democracy & Backstairs Intrigue',
    versoSubtitle:
      "Part I: Presidential Authoritarianism: Rule by Article 48 & Schleicher's Failure (1932)",
    rectoSubtitle:
      "Part II: Franz von Papen's Fatal Gamble, Hindenburg's Deal & Hitler Appointed Chancellor (1933)",
    enquiryQuestion:
      "To what extent was Hitler's appointment as Chancellor the product of aristocratic political intrigue rather than an electoral mandate?",
    decisiveMechanism:
      "Elite Miscalculation &bull; The Conservative Aristocracy's Fatal Illusion of Controlling Hitler",
    lessonSourceA: 7, // lesson_2_4 (How Hitler Became Chancellor)
    lessonSourceB: 7,
    isPaired: false,
    versoBlockIndices: [0, 1], // Strasser mutiny/bankruptcy + Schleicher failure
    rectoBlockIndices: [2, 3], // Papen secret meeting + Backstairs conspiracy/30 Jan 1933
  },

  // --- KEY TOPIC 3: NAZI CONTROL AND DICTATORSHIP 1933–1939 (Enquiries 7–9) ---
  {
    num: 7,
    ktId: 'KT3',
    shortTitle: 'The Elimination of Democracy & The Blood Purge',
    versoSubtitle:
      'Part I: The Reichstag Fire Decree, Enabling Act & Total Gleichschaltung (Feb–Jul 1933)',
    rectoSubtitle:
      "Part II: The Night of the Long Knives: Purging Röhm's SA & The Sacred Military Oath (1934)",
    enquiryQuestion:
      "How did Hitler systematically dismantle Germany's constitutional safeguards in eighteen months to establish absolute personal rule?",
    decisiveMechanism:
      'Totalitarian Gleichschaltung &bull; Emergency Decrees, Legalized Tyranny, and SS Murder',
    lessonSourceA: 8, // lesson_3_1 (Creation of Dictatorship)
    lessonSourceB: 8,
    isPaired: false,
    versoBlockIndices: [0, 1], // Reichstag fire + Enabling Act/Gleichschaltung
    rectoBlockIndices: [3, 4], // Night of Long Knives + Hindenburg death/Führer oath
  },
  {
    num: 8,
    ktId: 'KT3',
    shortTitle: 'The Machinery of Terror & The War on the Churches',
    versoSubtitle:
      "Part I: Heinrich Himmler's SS Empire, Gestapo Denunciations & The People's Court (1933–1939)",
    rectoSubtitle:
      'Part II: The Vatican Concordat, "Mit Brennender Sorge" & The Confessing Church Struggle',
    enquiryQuestion:
      'Did the Nazi police state maintain totalitarian dominance primarily through omnipotent terror or civilian complicity and church compromise?',
    decisiveMechanism:
      'Pervasive Surveillance & Repression &bull; Systematic Terror, Informers, and Religious Subversion',
    lessonSourceA: 9, // lesson_3_2 (Police State & Religion)
    lessonSourceB: 9,
    isPaired: false,
    versoBlockIndices: [0, 1], // SS/Concentration camps + Gestapo/People's Court
    rectoBlockIndices: [3, 4], // Concordat/Pius XI + Reich Church vs Niemöller
  },
  {
    num: 9,
    ktId: 'KT3',
    shortTitle: 'Mass Indoctrination, The Führer Cult & Defiance',
    versoSubtitle:
      "Part I: Goebbels' Enlightenment Ministry, The Volksempfänger, Nuremberg & 1936 Olympics",
    rectoSubtitle:
      'Part II: Everyday Conformity, Underground Left-Wing Couriers, Youth Defiance & Church Protest',
    enquiryQuestion:
      'How effective was the Nazi propaganda apparatus in manufacturing consent, and why did organized resistance prove so perilous?',
    decisiveMechanism:
      'Monopolistic Indoctrination &bull; Censorship, Grand Spectacle, and the Atomisation of Opposition',
    lessonSourceA: 10, // lesson_3_3 (Controlling Attitudes)
    lessonSourceB: 11, // lesson_3_4 (Opposition & Resistance)
    isPaired: true,
    versoBlockIndices: [0, 1], // Goebbels/Radio + Nuremberg Rallies/Olympics
    rectoBlockIndices: [1, 2], // Underground KPD/Socialists + Edelweiss Pirates/Swing Youth/Bonhoeffer
  },

  // --- KEY TOPIC 4: LIFE IN NAZI GERMANY 1933–1939 (Enquiries 10–12) ---
  {
    num: 10,
    ktId: 'KT4',
    shortTitle: 'Regulating Women & Total Indoctrination of Youth',
    versoSubtitle:
      "Part I: Kinder, Küche, Kirche: Marriage Loans, The Mother's Cross & Factory Labour Dilemmas",
    rectoSubtitle:
      'Part II: Total Control of the Young: Hitler Youth, League of German Girls & School Nazification',
    enquiryQuestion:
      'How completely did the Third Reich succeed in subverting family life, gender roles, and the minds of young Germans?',
    decisiveMechanism:
      'Totalitarian Social Engineering &bull; Monopolising Education, Leisure, and Biological Roles',
    lessonSourceA: 12, // lesson_4_1 (Women)
    lessonSourceB: 13, // lesson_4_2 (Young)
    isPaired: true,
    versoBlockIndices: [0, 1], // Ideal of Womanhood + Marriage Loans/Mother's Cross/Labour
    rectoBlockIndices: [1, 3], // Hitler Youth/BDM + School curriculum/Racial science
  },
  {
    num: 11,
    ktId: 'KT4',
    shortTitle: 'The Economic Illusion: Labour, Living Standards & Rearmament',
    versoSubtitle:
      'Part I: Conquering Joblessness: The RAD, Autobahnen, Rearmament & Invisible Unemployment',
    rectoSubtitle:
      'Part II: The DAF Labour Front, Strength Through Joy (KdF), The Volkswagen & Real Working Realities',
    enquiryQuestion:
      'Was the Nazi economic recovery a genuine triumph of social welfare or a predatory illusion sustained by rearmament and statistical manipulation?',
    decisiveMechanism:
      'Militarised Economic Mobilisation &bull; Suppressing Free Labour and Subordinating Living Standards to Total War',
    lessonSourceA: 14, // lesson_4_3 (Employment & Living Standards)
    lessonSourceB: 14,
    isPaired: false,
    versoBlockIndices: [0, 2], // RAD/Public Works/Autobahn + Invisible Unemployment
    rectoBlockIndices: [3, 4], // DAF/German Labour Front + KdF/Living standards reality
  },
  {
    num: 12,
    ktId: 'KT4',
    shortTitle: 'Racial Ideology, Anti-Semitic Escalation & Road to War',
    versoSubtitle:
      'Part I: Social Darwinism, Eugenic Sterilisation, 1933 Boycotts & The 1935 Nuremberg Laws',
    rectoSubtitle:
      'Part II: Kristallnacht (The Night of Broken Glass), Aryanisation, Forced Emigration & Eve of War',
    enquiryQuestion:
      'How did Nazi racial ideology escalate from legal exclusion and economic boycotts in 1933 to state-directed pogrom and mass deportation by 1938?',
    decisiveMechanism:
      'Cumulative Radicalisation &bull; The Bureaucratic Escalation from Legal Segregation to Violent Pogrom',
    lessonSourceA: 15, // lesson_4_4 (Persecution of Minorities)
    lessonSourceB: 15,
    isPaired: false,
    versoBlockIndices: [0, 2], // Social Darwinism/Sterilisation + Nuremberg Laws 1935
    rectoBlockIndices: [3, 4], // Kristallnacht 1938 + Forced emigration/Aryanisation/War brink
  },
];

// 60 Essential Recall Questions across 6 Topic Cards for Page 28 Master Quiz
const QUIZ_CARDS = [
  {
    topic: 'Card 1 &bull; The Weimar Republic & Early Crises (1918–1923)',
    pageRange: 'pp. 4–7 &bull; Ref [1.1]–[2.4]',
    questions: [
      'Who announced the abdication of Kaiser Wilhelm II on 9 November 1918?',
      'Which political leader proclaimed the German Republic from a window of the Reichstag building?',
      'What constitutional article gave the Weimar President emergency powers to rule without parliament?',
      'Which voting system was adopted for the Reichstag, leading to fragmented coalitions?',
      'State two key military terms imposed on Germany by the Treaty of Versailles.',
      'What was the sum of reparations fixed by the Inter-Allied Reparations Commission in 1921?',
      'Who were the two revolutionary leaders of the left-wing Spartacist Uprising in January 1919?',
      'Which right-wing paramilitary groups were used by Friedrich Ebert to crush left-wing revolts?',
      'Why did French and Belgian military forces invade and occupy the Ruhr Valley in January 1923?',
      'How did the Weimar government respond to the French occupation of the Ruhr, precipitating hyperinflation?',
    ],
  },
  {
    topic: 'Card 2 &bull; Recovery, Society & Culture in the Golden Twenties (1924–1929)',
    pageRange: 'pp. 8–9 &bull; Ref [3.1]–[3.4]',
    questions: [
      'What new temporary currency did Gustav Stresemann introduce in late 1923 to halt hyperinflation?',
      'Which 1924 international agreement restructured German reparations and provided American loans?',
      'What was the name of the 1929 plan that reduced total reparations to £2 billion and extended payments over 59 years?',
      "Which 1925 treaties guaranteed Germany's western frontiers with France and Belgium?",
      'In which year was Weimar Germany officially admitted into the League of Nations?',
      'Who succeeded Friedrich Ebert as President of the Weimar Republic in 1925?',
      'What German term was used to describe the liberated, emancipated young woman of the 1920s?',
      'Which famous modernist design school was established by Walter Gropius in 1919?',
      'Name one famous German expressionist artist associated with the "Neue Sachlichkeit" movement.',
      'Which film, released in 1927 and directed by Fritz Lang, epitomized Weimar cinematic innovation?',
    ],
  },
  {
    topic: "Card 3 &bull; Hitler's Rise & The Munich Putsch (1919–1929)",
    pageRange: 'pp. 10–13 &bull; Ref [4.1]–[5.2]',
    questions: [
      'What was the original name of the political party Adolf Hitler joined in September 1919?',
      "Who was the founder of the German Workers' Party (DAP) before Hitler took control?",
      "What political document, co-written by Hitler and Drexler in February 1920, outlined the party's core demands?",
      'What was the official name of the Nazi paramilitary stormtroopers established in 1921?',
      'Who served as the first leader of the SA (Sturmabteilung)?',
      'In which Munich beer hall did Hitler launch his abortive coup on the evening of 8 November 1923?',
      'Which famous First World War general accompanied Hitler during the Munich Putsch?',
      'At which Munich monument did Bavarian police open fire on marching Nazi stormtroopers?',
      'What book did Hitler dictate to Rudolf Hess while imprisoned in Landsberg Fortress in 1924?',
      'At which 1926 party conference did Hitler defeat the socialist wing led by Gregor Strasser?',
    ],
  },
  {
    topic: 'Card 4 &bull; The Great Depression & Backstairs Intrigue (1929–1933)',
    pageRange: 'pp. 12–15 &bull; Ref [5.3]–[6.4]',
    questions: [
      'In which month and year did the Wall Street Crash occur, initiating the Great Depression?',
      'To what figure did German unemployment officially rise by the winter of 1932?',
      'Which Chancellor earned the nickname "The Hunger Chancellor" for his deflationary cutbacks?',
      'How many seats did the Nazi Party win in the Reichstag elections of July 1932 to become the largest party?',
      'Who was appointed Chancellor in May 1932 following the dismissal of Heinrich Brüning?',
      "Which aristocratic political general served as Chancellor immediately before Hitler's appointment?",
      'At whose Cologne villa did Franz von Papen hold a secret meeting with Hitler in January 1933?',
      "What was Papen's famous boast regarding his ability to control Hitler in cabinet?",
      'On what exact date was Adolf Hitler officially sworn in as Chancellor of Germany?',
      'How many Nazis, including Hitler, were in the initial eleven-man cabinet formed in January 1933?',
    ],
  },
  {
    topic: 'Card 5 &bull; Dictatorship, Terror & Propaganda (1933–1939)',
    pageRange: 'pp. 16–21 &bull; Ref [7.1]–[9.4]',
    questions: [
      'Who was arrested and blamed for setting the Reichstag on fire on 27 February 1933?',
      'What emergency decree suspended all civil liberties immediately following the Reichstag Fire?',
      'What was the official title of the law passed on 23 March 1933 giving Hitler dictatorial power?',
      'What German term describes the systematic coordination of all aspects of society under Nazi control?',
      'On what date did the blood purge known as the "Night of the Long Knives" begin?',
      'Which SA Chief of Staff was assassinated by the SS during the Night of the Long Knives?',
      'Who served as Reichsführer-SS and head of the entire Nazi police apparatus from 1934?',
      "What was the official title of Joseph Goebbels' government ministry created in March 1933?",
      'What cheap, mass-produced radio receiver was introduced to beam Nazi broadcasts into homes?',
      'Which Catholic Bishop of Münster publicly condemned the Nazi T4 euthanasia program in 1941?',
    ],
  },
  {
    topic: 'Card 6 &bull; Life in Nazi Germany & Persecution of Minorities (1933–1939)',
    pageRange: 'pp. 22–27 &bull; Ref [10.1]–[12.4]',
    questions: [
      'What were the "three Ks" (in German or English) defining the traditional Nazi role for women?',
      'What financial incentive was offered to newly married couples under the Law for the Encouragement of Marriage?',
      'Which bronze, silver, or gold award was given to German mothers who gave birth to multiple children?',
      'What was the name of the Nazi youth organisation for girls aged 14 to 18?',
      'In which year was membership of the Hitler Youth made strictly compulsory for all eligible boys?',
      'What state organisation, led by Robert Ley, replaced independent trade unions in May 1933?',
      'What was the German name of the "Strength Through Joy" leisure organization for German workers?',
      'Which 1935 laws stripped German Jews of Reich citizenship and forbade marriages with Aryans?',
      'On what dates did the nationwide anti-Jewish pogrom known as Kristallnacht occur in November 1938?',
      'Approximately how many Jewish men were arrested and sent to concentration camps following Kristallnacht?',
    ],
  },
];

// Generate Inside Front Cover Specification Directory (Page 2) directly from specData (SSOT) or unitData
function generateInsideFrontCover(unitData) {
  let specData = null;
  try {
    const specCandidates = [
      path.join(ROOT_DIR, 'public', 'data', 'weimar_nazi_germany_spec.json'),
      path.join(ROOT_DIR, 'data', 'weimar_nazi_germany_spec.json'),
    ];
    for (const c of specCandidates) {
      if (fs.existsSync(c)) {
        specData = JSON.parse(fs.readFileSync(c, 'utf8'));
        break;
      }
    }
  } catch (e) {}

  // If specData has modular narrative blurbs defined per topic, render the 16-topic modular architecture
  if (
    specData &&
    specData.sections &&
    specData.sections.length > 0 &&
    specData.sections[0].topics &&
    specData.sections[0].topics[0].narrative_blurb
  ) {
    let html = '';
    specData.sections.forEach((sec, sIdx) => {
      const ktNum = sec.keyTopicNumber || sIdx + 1;
      const ktTitle = sec.title.replace(/^Key\s*Topic\s*\d+[:\-–—\s]*/i, '').trim();

      const rowsHtml = sec.topics
        .map((t, tIdx) => {
          const code = t.code || `KT ${ktNum}.${tIdx + 1}`;
          const title = t.title.replace(/^\d+\.\s*/, '').trim();
          const pages = t.spreads || '';
          const blurb = (t.narrative_blurb || '')
            .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

          return `
          <div class="inside-spec-row">
            <div class="isr-header">
              <div class="isr-left">
                <span class="isr-code">${code}</span>
                <span class="isr-question">${title}</span>
              </div>
              <span class="isr-pages">${pages}</span>
            </div>
            <p class="isr-blurb">${blurb}</p>
          </div>
        `;
        })
        .join('');

      html += `
        <div class="inside-kt-group">
          <div class="inside-kt-header">
            <span class="ikt-badge">KEY TOPIC ${ktNum}</span>
            <span class="ikt-title">${ktTitle.toUpperCase()}</span>
          </div>
          <div class="inside-kt-rows">
            ${rowsHtml}
          </div>
        </div>
      `;
    });
    return html;
  }

  const lessonPageMap = [
    'Spread 1 &bull; pp. 4–5', // 0: KT 1.1
    'Spreads 1–2 &bull; pp. 4–7', // 1: KT 1.2
    'Spreads 2–3 &bull; pp. 6–9', // 2: KT 1.3
    'Spread 3 &bull; pp. 8–9', // 3: KT 1.4
    'Spread 4 &bull; pp. 10–11', // 4: KT 2.1
    'Spreads 4–5 &bull; pp. 10–13', // 5: KT 2.2
    'Spread 5 &bull; pp. 12–13', // 6: KT 2.3
    'Spread 6 &bull; pp. 14–15', // 7: KT 2.4
    'Spread 7 &bull; pp. 16–17', // 8: KT 3.1
    'Spread 8 &bull; pp. 18–19', // 9: KT 3.2
    'Spreads 8–9 &bull; pp. 18–21', // 10: KT 3.3
    'Spread 9 &bull; pp. 20–21', // 11: KT 3.4
    'Spread 10 &bull; pp. 22–23', // 12: KT 4.1
    'Spread 10 &bull; pp. 22–23', // 13: KT 4.2
    'Spread 11 &bull; pp. 24–25', // 14: KT 4.3
    'Spread 12 &bull; pp. 26–27', // 15: KT 4.4
  ];

  const ktTitles = [
    'The Weimar Republic, 1918–1929',
    "Hitler's Rise to Power, 1919–1933",
    'Nazi Control and Dictatorship, 1933–1939',
    'Life in Nazi Germany, 1933–1939',
  ];

  let html = '';

  for (let kt = 0; kt < 4; kt++) {
    const ktLessons = unitData.lessons.slice(kt * 4, kt * 4 + 4);
    const rowsHtml = ktLessons
      .map((l, idx) => {
        const globalIdx = kt * 4 + idx;
        const codeMatch = l.title.match(/(?:KT|Key Topic\s*)\d+\.\d+/i);
        const code = codeMatch
          ? codeMatch[0].replace(/Key Topic\s*/i, 'KT ')
          : `KT ${kt + 1}.${idx + 1}`;
        const question = l.title.replace(/^(?:KT|Key Topic\s*)\d+\.\d+:\s*/i, '').trim();

        let blurb = '';
        if (l.specification_anchor) {
          blurb = l.specification_anchor.replace(/^[^:]+:\s*/i, '').trim();
        } else if (
          specData &&
          specData.sections &&
          specData.sections[kt] &&
          specData.sections[kt].topics &&
          specData.sections[kt].topics[idx]
        ) {
          const pts = specData.sections[kt].topics[idx].points || [];
          blurb = pts.map((p) => p.replace(/\*\*/g, '<strong>').replace(/\*/g, '')).join(' ');
        } else if (l.enquiry) {
          blurb = l.enquiry.split('.')[0] + '.';
        }

        const pages = lessonPageMap[globalIdx] || 'pp. 4–27';

        return `
        <div class="inside-spec-row">
          <div class="isr-header">
            <div class="isr-left">
              <span class="isr-code">${code}</span>
              <span class="isr-question">${question}</span>
            </div>
            <span class="isr-pages">${pages}</span>
          </div>
          <p class="isr-blurb">${blurb}</p>
        </div>
      `;
      })
      .join('');

    html += `
      <div class="inside-kt-group">
        <div class="inside-kt-header">
          <span class="ikt-badge">KEY TOPIC ${kt + 1}</span>
          <span class="ikt-title">${ktTitles[kt]}</span>
        </div>
        <div class="inside-kt-rows">
          ${rowsHtml}
        </div>
      </div>
    `;
  }

  return html;
}

// Master HTML Document Generator
function generateTextbookHtml(unitData) {
  // 1. INSIDE FRONT COVER (Page 2) Automated Specification Directory
  const insideCoverHtml = generateInsideFrontCover(unitData);

  // 2. MILESTONE SPINE (Page 2)
  const milestoneItemsHtml = MILESTONE_SPINE.map((m) => {
    return `
      <div class="spine-item">
        <div class="spine-date-badge">${m.date}</div>
        <div class="spine-dot"></div>
        <div class="spine-content">
          <div class="spine-title-row">
            <span class="spine-title">${m.title}</span>
          </div>
          <p class="spine-desc">${m.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  // 3. FLASHPOINTS (Page 3)
  const flashpointsHtml = STRATEGIC_FLASHPOINTS.map((f) => {
    return `
      <div class="fp-card">
        <div class="fp-header">
          <span class="fp-badge">${f.badge}</span>
          <h3 class="fp-title">${f.title}</h3>
        </div>
        <p class="fp-text">${f.text}</p>
      </div>
    `;
  }).join('');

  // 4. 12 ENQUIRY SPREADS (Pages 4–27)
  let spreadsHtml = '';

  ENQUIRY_EDITORIAL.forEach((config) => {
    const num = config.num;
    const versoPage = num * 2 + 2;
    const rectoPage = versoPage + 1;

    let versoBlocks = [];
    let rectoBlocks = [];

    const lessonA = unitData.lessons[config.lessonSourceA] || {};
    const lessonB = unitData.lessons[config.lessonSourceB] || {};

    const blocksA = (lessonA.narrative_blocks || []).filter((b) => b.text && b.text.trim());
    const blocksB = (lessonB.narrative_blocks || []).filter((b) => b.text && b.text.trim());

    if (config.isPaired) {
      // Lesson A feeds Verso; Lesson B feeds Recto
      const b1 = blocksA[config.versoBlockIndices[0]] || blocksA[0] || {};
      const b2 = blocksA[config.versoBlockIndices[1]] || blocksA[1] || {};
      const b3 = blocksB[config.rectoBlockIndices[0]] || blocksB[0] || {};
      const b4 = blocksB[config.rectoBlockIndices[1]] || blocksB[1] || {};

      versoBlocks = [
        {
          ref: `${num}.1`,
          date: b1.period || '1918–1924',
          title: cleanProse(b1.theme_heading || b1.title || 'Part I Foundations'),
          paras: cleanProse(b1.text)
            .split(/\n\s*\n|\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        },
        {
          ref: `${num}.2`,
          date: b2.period || '1919–1929',
          title: cleanProse(b2.theme_heading || b2.title || 'Part I Escalation'),
          paras: cleanProse(b2.text)
            .split(/\n\s*\n|\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        },
      ];

      rectoBlocks = [
        {
          ref: `${num}.3`,
          date: b3.period || '1923–1933',
          title: cleanProse(b3.theme_heading || b3.title || 'Part II Turning Point'),
          paras: cleanProse(b3.text)
            .split(/\n\s*\n|\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        },
        {
          ref: `${num}.4`,
          date: b4.period || '1929–1939',
          title: cleanProse(b4.theme_heading || b4.title || 'Part II Consequences'),
          paras: cleanProse(b4.text)
            .split(/\n\s*\n|\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        },
      ];
    } else {
      // Single lesson feeds both Verso and Recto
      const b1 = blocksA[config.versoBlockIndices[0]] || blocksA[0] || {};
      const b2 = blocksA[config.versoBlockIndices[1]] || blocksA[1] || {};
      const b3 = blocksA[config.rectoBlockIndices[0]] || blocksA[2] || {};
      const b4 = blocksA[config.rectoBlockIndices[1]] || blocksA[3] || {};

      versoBlocks = [
        {
          ref: `${num}.1`,
          date: b1.period || '1933–1934',
          title: cleanProse(b1.theme_heading || b1.title || 'Part I Foundations'),
          paras: cleanProse(b1.text)
            .split(/\n\s*\n|\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        },
        {
          ref: `${num}.2`,
          date: b2.period || '1933–1935',
          title: cleanProse(b2.theme_heading || b2.title || 'Part I Escalation'),
          paras: cleanProse(b2.text)
            .split(/\n\s*\n|\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        },
      ];

      rectoBlocks = [
        {
          ref: `${num}.3`,
          date: b3.period || '1934–1938',
          title: cleanProse(b3.theme_heading || b3.title || 'Part II Turning Point'),
          paras: cleanProse(b3.text)
            .split(/\n\s*\n|\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        },
        {
          ref: `${num}.4`,
          date: b4.period || '1936–1939',
          title: cleanProse(b4.theme_heading || b4.title || 'Part II Consequences'),
          paras: cleanProse(b4.text)
            .split(/\n\s*\n|\n/)
            .map((p) => p.trim())
            .filter(Boolean),
        },
      ];
    }

    function renderColumnProse(block) {
      const parasHtml = block.paras
        .map((p) => `<p class="prose-p">${formatMarkdown(p)}</p>`)
        .join('');
      return `
        <div class="prose-section">
          <div class="section-header">
            <span class="section-ref-pill">Ref [${block.ref}]</span>
            <span class="section-date-pill">${block.date}</span>
            <h3 class="section-title">${block.title}</h3>
          </div>
          <div class="section-body">
            ${parasHtml}
          </div>
        </div>
      `;
    }

    spreadsHtml += `
      <!-- SPREAD ${num}: VERSO (Page ${versoPage}) -->
      <div class="page verso-page" id="page-${versoPage}" data-page="${versoPage}">
        <div class="page-inner">
          <header class="spread-header verso-header">
            <div class="spread-header-top">
              <span class="spread-badge">ENQUIRY ${num} &bull; PART I</span>
              <span class="spread-subtitle">${config.versoSubtitle}</span>
            </div>
            <div class="spread-question-banner verso-q-banner">
              <span class="q-badge">KEY ENQUIRY QUESTION</span>
              <h2 class="spread-q-title">${config.enquiryQuestion}</h2>
            </div>
          </header>

          <main class="spread-body">
            <div class="spread-column col-left">
              ${renderColumnProse(versoBlocks[0])}
            </div>
            <div class="spread-column col-right">
              ${renderColumnProse(versoBlocks[1])}
            </div>
          </main>

          <footer class="page-footer">
            <span class="footer-left">Page ${versoPage} &bull; Weimar and Nazi Germany, 1918–1939</span>
            <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
            <span class="footer-right">Ref [${num}.1]–[${num}.2]</span>
          </footer>
        </div>
      </div>

      <!-- SPREAD ${num}: RECTO (Page ${rectoPage}) -->
      <div class="page recto-page" id="page-${rectoPage}" data-page="${rectoPage}">
        <div class="page-inner">
          <header class="spread-header recto-header">
            <div class="spread-header-top">
              <span class="spread-badge">ENQUIRY ${num} &bull; PART II</span>
              <span class="spread-subtitle">${config.rectoSubtitle}</span>
            </div>
            <div class="spread-question-banner recto-q-banner">
              <span class="q-badge">DECISIVE HISTORICAL MECHANISM</span>
              <h2 class="spread-q-title">${config.decisiveMechanism}</h2>
            </div>
          </header>

          <main class="spread-body">
            <div class="spread-column col-left">
              ${renderColumnProse(rectoBlocks[0])}
            </div>
            <div class="spread-column col-right">
              ${renderColumnProse(rectoBlocks[1])}
            </div>
          </main>

          <footer class="page-footer">
            <span class="footer-left">Ref [${num}.3]–[${num}.4]</span>
            <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
            <span class="footer-right">Weimar and Nazi Germany, 1918–1939 &bull; Page ${rectoPage}</span>
          </footer>
        </div>
      </div>
    `;
  });

  // 5. MASTER RETRIEVAL QUIZ (Page 28)
  const quizCardsHtml = QUIZ_CARDS.map((card) => {
    const qListHtml = card.questions
      .map(
        (q, qIdx) =>
          `<li><span class="q-num">${qIdx + 1}.</span> <span class="q-txt">${q}</span></li>`,
      )
      .join('');
    return `
      <div class="quiz-card">
        <div class="quiz-card-header">
          <h4 class="quiz-card-topic">${card.topic}</h4>
          <span class="quiz-card-loc">${card.pageRange}</span>
        </div>
        <ol class="quiz-card-list">
          ${qListHtml}
        </ol>
      </div>
    `;
  }).join('');

  const heroImageUri =
    getBase64Image('public/images/weimar_assembly_1919.jpg') ||
    getBase64Image('images/weimar_assembly_1919.jpg');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weimar and Nazi Germany, 1918–1939 &bull; 28-Page Master Classroom Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* MASTER RESET & STRICT PRINT GEOMETRY */
    :root {
      --font-display: 'Cinzel', serif;
      --font-body: 'Lora', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --navy-deep: #0f172a;
      --crimson-accent: #8b0000;
      --gold-royal: #c5a059;
      --blue-accent: #1e3a8a;
      --ink-primary: #0f172a;
      --ink-secondary: #334155;
      --ink-muted: #64748b;
      --border-soft: #cbd5e1;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    @page {
      size: 210mm 297mm;
      margin: 0;
    }

    html, body {
      width: 210mm;
      background: #f1f5f9;
      color: #0f172a;
      font-family: var(--font-body);
      font-size: 11.5pt;
      line-height: 1.58;
      -webkit-font-smoothing: antialiased;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      page-break-after: always;
      position: relative;
      background: #ffffff;
      overflow: hidden;
    }

    .page-inner {
      width: 100%;
      height: 100%;
      padding: 13mm 14mm 11mm 14mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    /* RUNNING HEADERS & FOOTERS */
    .page-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.8px solid #cbd5e1;
      padding-bottom: 2mm;
      margin-bottom: 2.8mm;
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: var(--ink-muted);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .page-running-footer {
      border-top: 0.8px solid #cbd5e1;
      padding-top: 2mm;
      margin-top: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 5.8pt;
      letter-spacing: 0.04em;
      color: var(--ink-muted);
      white-space: nowrap;
    }
    .page-footer {
      height: 18px;
      margin-top: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      font-size: 7.2pt;
      color: #64748b;
      font-family: 'Lora', Georgia, serif;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    /* ----------------------------------------------------
       PAGE 1: MASTER FRONT COVER
    ---------------------------------------------------- */
    .front-cover {
      background: linear-gradient(145deg, #0b1329 0%, #0f172a 50%, #1e293b 100%);
      color: #ffffff;
      padding: 10mm 15mm 8mm 15mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .cover-top-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 1.5mm;
      font-family: var(--font-sans);
    }
    .masthead-title {
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      color: #ffffff;
      text-transform: uppercase;
    }
    .masthead-badge {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      font-size: 6.2pt;
      font-weight: 700;
      padding: 1.5px 6px;
      border-radius: 2px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .cover-title-group {
      text-align: center;
      margin-top: 1.2mm;
      margin-bottom: 1.2mm;
    }
    .cover-spec-pill {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 1.5px 8px;
      border-radius: 12px;
      margin-bottom: 2px;
      text-transform: uppercase;
    }
    .cover-title-group h1 {
      font-family: var(--font-display);
      font-size: 19.5pt;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: 0.04em;
      line-height: 1.1;
      text-transform: uppercase;
      margin-bottom: 0.8mm;
    }
    .cover-title-group p {
      font-family: var(--font-body);
      font-style: italic;
      font-size: 8.8pt;
      color: #cbd5e1;
    }

    .cover-hero-artwork-frame {
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      overflow: hidden;
      background: #000000;
      margin-bottom: 3mm;
    }
    .cover-hero-img-box {
      width: 100%;
      height: 144mm;
      overflow: hidden;
    }
    .cover-hero-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }
    .cover-hero-caption {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      color: #94a3b8;
      background: #0b1329;
      padding: 3px 8px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-style: italic;
    }

    .cover-synopsis-card {
      background: #fdfbf7;
      color: #1e293b;
      border-left: 4px solid var(--blue-accent);
      border-radius: 4px;
      padding: 13px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      margin-bottom: 3.5mm;
    }
    .cover-synopsis-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2.5px;
    }
    .cover-synopsis-badge {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .cover-synopsis-tag {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: var(--crimson-accent);
      letter-spacing: 0.04em;
    }
    .cover-synopsis-body p {
      font-family: var(--font-body);
      font-size: 8.8pt;
      line-height: 1.50;
      color: #1e293b;
      margin-bottom: 5px;
      text-align: justify;
    }
    .cover-synopsis-body p:last-child {
      margin-bottom: 0;
    }

    .cover-curriculum-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      padding: 4.5px 12px;
      font-family: var(--font-sans);
      font-size: 6.0pt;
      color: #cbd5e1;
      white-space: nowrap;
      margin-bottom: 2.5mm;
    }
    .ccs-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ccs-code {
      font-weight: 800;
      color: #93c5fd;
      background: rgba(147, 197, 253, 0.15);
      padding: 1px 4px;
      border-radius: 2px;
    }
    .ccs-divider {
      color: rgba(255, 255, 255, 0.3);
    }
    .cover-footer-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 1.5mm;
      font-family: var(--font-sans);
      font-size: 5.4pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    /* ----------------------------------------------------
       PAGE 2: INSIDE FRONT COVER SPECIFICATION DIRECTORY
    ---------------------------------------------------- */
    .inside-cover-page {
      background: #ffffff;
      padding: 9.5mm 15mm 7.5mm 15mm !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3.5px;
    }
    .inside-cover-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.5mm;
      margin-bottom: 1.8mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .ichs-title-group h2 {
      font-family: var(--font-display);
      font-size: 11pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .ichs-title-group p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 1px;
      white-space: nowrap;
    }
    .ichs-badge {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .inside-cover-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3px;
      min-height: 0;
    }
    .inside-kt-group {
      margin-bottom: 0;
    }
    .inside-kt-group:last-child {
      margin-bottom: 0;
    }
    .inside-kt-header {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #0f172a;
      color: #ffffff;
      padding: 2.2px 7px;
      border-radius: 2px;
      margin-bottom: 1.5px;
    }
    .ikt-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      background: var(--crimson-accent);
      color: #ffffff;
      padding: 1.2px 5.0px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .ikt-title {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .inside-kt-rows {
      display: flex;
      flex-direction: column;
      gap: 1.8px;
    }
    .inside-spec-row {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.8px solid var(--blue-accent);
      padding: 2.6px 7px;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .isr-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .isr-left {
      display: flex;
      align-items: baseline;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }
    .isr-code {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--blue-accent);
      white-space: nowrap;
    }
    .isr-question {
      font-family: var(--font-sans);
      font-size: 7.8pt;
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .isr-pages {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: #64748b;
      white-space: nowrap;
      margin-left: 8px;
    }
    .isr-blurb {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      line-height: 1.25;
      color: #334155;
      margin: 0;
      text-align: justify;
      font-style: italic;
    }
    .isr-blurb strong {
      font-style: normal;
      font-weight: 700;
      color: #0f172a;
    }

    /* =========================================================
       PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================= */
    .spine-page {
      background: #ffffff;
      padding: 10mm 15mm 8mm 15mm !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .spine-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.8mm;
      margin-bottom: 2.2mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .shs-title-group h2 {
      font-family: var(--font-display);
      font-size: 11pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .shs-title-group p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
      white-space: nowrap;
    }
    .shs-badge {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .spine-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3.5px;
      position: relative;
      min-height: 0;
    }
    .spine-container::before {
      content: '';
      position: absolute;
      left: 19.5mm;
      top: 5px;
      bottom: 5px;
      width: 1.5px;
      background: #cbd5e1;
      z-index: 1;
    }
    .spine-item {
      display: flex;
      align-items: flex-start;
      gap: 7px;
      position: relative;
      z-index: 2;
    }
    .spine-date-badge {
      width: 18mm;
      text-align: right;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--crimson-accent);
      padding-top: 1.5px;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .spine-dot {
      width: 7px;
      height: 7px;
      background: #ffffff;
      border: 2px solid var(--navy-deep);
      border-radius: 50%;
      margin-top: 3.5px;
      flex-shrink: 0;
      box-shadow: 0 0 0 1.5px #ffffff;
    }
    .spine-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid var(--navy-deep);
      padding: 2.5px 8px;
      border-radius: 2px;
    }
    .spine-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }
    .spine-title {
      font-family: var(--font-sans);
      font-size: 7.6pt;
      font-weight: 800;
      color: #0f172a;
    }
    .spine-desc {
      font-family: var(--font-body);
      font-size: 7.0pt;
      line-height: 1.25;
      color: #334155;
      text-align: justify;
      margin: 0;
    }

    /* ----------------------------------------------------
       PAGES 4–27: 12 SPREADS (VERSO + RECTO)
    ---------------------------------------------------- */
    .spread-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 7px;
    }

    .spread-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2px;
    }

    .spread-badge {
      font-size: 7pt;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: #ffffff;
      background: #0f172a;
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
    }

    .spread-subtitle {
      font-size: 7.8pt;
      font-weight: 600;
      color: #475569;
      font-style: italic;
    }

    .spread-question-banner {
      background: #f8fafc;
      border-left: 3px solid #0f172a;
      padding: 3px 8px;
      border-radius: 0 3px 3px 0;
    }

    .q-badge {
      font-size: 5.6pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #64748b;
      text-transform: uppercase;
      display: block;
      margin-bottom: 1px;
    }

    .spread-q-title {
      font-family: 'Lora', Georgia, serif;
      font-size: 9pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
    }

    .spread-body {
      flex: 1;
      display: flex;
      gap: 16px;
      overflow: hidden;
    }

    .spread-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
    }

    .prose-section {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
    }

    .section-header {
      display: flex;
      align-items: baseline;
      gap: 6px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 5px;
    }

    .section-ref-pill {
      background: #e2e8f0;
      color: #0f172a;
      font-size: 6.5pt;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 2px;
      letter-spacing: 0.02em;
    }

    .section-date-pill {
      font-size: 6.8pt;
      font-style: italic;
      color: #64748b;
    }

    .section-title {
      font-size: 8.8pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.2;
      flex: 1;
    }

    .section-body {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .prose-p {
      text-align: justify;
      hyphens: auto;
      margin-bottom: 8px;
      font-size: 11pt;
      line-height: 1.54;
      text-indent: 0;
    }

    .prose-p:last-child {
      margin-bottom: 0;
    }

    /* ----------------------------------------------------
       PAGE 28: MASTER RETRIEVAL QUIZ (BACK COVER)
    ---------------------------------------------------- */
    .quiz-inner {
      padding: 11mm 14mm 10mm 14mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #f8fafc;
    }

    .quiz-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .quiz-title {
      font-family: 'Cinzel', serif;
      font-size: 13.5pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.05em;
    }

    .quiz-notice-banner {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-left: 3px solid #0f172a;
      border-radius: 3px;
      padding: 4px 8px;
      font-size: 7.2pt;
      color: #334155;
      margin-bottom: 6px;
      line-height: 1.35;
    }

    .quiz-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 12px;
    }

    .quiz-card {
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 5px 8px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .quiz-card-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }

    .quiz-card-topic {
      font-size: 7.2pt;
      font-weight: 700;
      color: #0f172a;
    }

    .quiz-card-loc {
      font-size: 6pt;
      color: #64748b;
      font-weight: 600;
    }

    .quiz-card-list {
      list-style: none;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .quiz-card-list li {
      font-size: 6.6pt;
      line-height: 1.25;
      color: #1e293b;
      display: flex;
      align-items: flex-start;
      gap: 3px;
      margin-bottom: 1px;
    }

    .quiz-card-list li:last-child {
      margin-bottom: 0;
    }

    .q-num {
      font-weight: 700;
      color: #0f172a;
      flex-shrink: 0;
    }

    .q-txt {
      flex: 1;
    }
  </style>
</head>
<body>

  <!-- ==========================================
       PAGE 1: MASTER FRONT COVER
  =========================================== -->
  <div class="page front-cover" id="page-1" data-page="1">
    <header class="cover-top-masthead">
      <span class="masthead-title">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="masthead-badge">KEY STAGE 4 &bull; PEARSON EDEXCEL GCSE OPTION 31</span>
    </header>

    <div class="cover-title-group">
      <span class="cover-spec-pill">Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 31</span>
      <h1>Weimar and Nazi Germany</h1>
      <p>1918–1939 &bull; The Weimar Republic &bull; Hitler's Rise to Power &bull; Nazi Dictatorship &bull; Life in Nazi Germany</p>
    </div>

    <div class="cover-hero-artwork-frame">
      <div class="cover-hero-img-box">
        <img src="${heroImageUri}" alt="German National Assembly at Weimar, 1919">
      </div>
      <div class="cover-hero-caption">
        Plate I: Delegates convene in the Court Theatre at Weimar to draft the constitution for Germany's first parliamentary democracy (February 1919). Bundesarchiv Bild 183-B0527-0001-020.
      </div>
    </div>

    <div class="cover-synopsis-card">
      <div class="cover-synopsis-header">
        <span class="cover-synopsis-badge">HISTORICAL OVERVIEW &bull; 1918–1939</span>
        <span class="cover-synopsis-tag">DEMOCRACY &amp; TOTALITARIANISM</span>
      </div>
      <div class="cover-synopsis-body" id="cover-synopsis-body">
        <p>
          Born from military collapse and revolution in November 1918, the Weimar Republic established Germany’s first parliamentary democracy. Yet its birth was violently contested by uprisings and burdened by the punitive Versailles Diktat. Surviving the hyperinflation cataclysm of 1923, the republic achieved a fragile golden era under Gustav Stresemann—underwritten by American loans—before the 1929 Wall Street Crash plunged Germany into economic ruin.
        </p>
        <p>
          With six million unemployed and parliament paralysed, the backstairs intrigue of conservative elites facilitated Adolf Hitler’s appointment as Chancellor in January 1933. Through the Reichstag fire decree, the Enabling Act, total Gleichschaltung, and the bloody purge of the SA, Hitler dismantled constitutional freedoms in eighteen months. This master textbook provides an authoritative 28-page narrative tracing Germany's descent into totalitarianism.
        </p>
      </div>
    </div>

    <div class="cover-curriculum-strip">
      <div class="ccs-item"><span class="ccs-code">KT 1</span><span class="ccs-text">The Weimar Republic (1918–29)</span></div>
      <div class="ccs-divider">&bull;</div>
      <div class="ccs-item"><span class="ccs-code">KT 2</span><span class="ccs-text">Hitler's Rise to Power (1919–33)</span></div>
      <div class="ccs-divider">&bull;</div>
      <div class="ccs-item"><span class="ccs-code">KT 3</span><span class="ccs-text">Nazi Control &amp; Dictatorship (1933–39)</span></div>
      <div class="ccs-divider">&bull;</div>
      <div class="ccs-item"><span class="ccs-code">KT 4</span><span class="ccs-text">Life in Nazi Germany (1933–39)</span></div>
    </div>

    <footer class="cover-footer-meta">
      <span>Page 1 &bull; Master Cover</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span>Course Specification &amp; Disciplinary Directory &bull; Inside Front Cover (p. 2)</span>
    </footer>
  </div>

  <!-- ==========================================
       PAGE 2: INSIDE FRONT COVER SPECIFICATION DIRECTORY
  =========================================== -->
  <div class="page inside-cover-page" id="page-2" data-page="2">
    <header class="page-running-header">
      <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="header-center">PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION 31</span>
      <span class="header-right">INSIDE FRONT COVER &bull; PAGE 2</span>
    </header>

    <div class="inside-cover-header-strip">
      <div class="ichs-title-group">
        <h2>COURSE SPECIFICATION &amp; DISCIPLINARY DIRECTORY</h2>
        <p>Full Syllabus Alignment Across All 16 Canonical Lessons (Key Topics 1–4) &bull; Option 31</p>
      </div>
      <span class="ichs-badge">Official Specification Alignment</span>
    </div>

    <div class="inside-cover-content">
      ${insideCoverHtml}
    </div>

    <footer class="page-running-footer">
      <span class="footer-left">Option 31: Weimar and Nazi Germany, 1918–39</span>
      <span class="footer-center">THE DISCIPLINARY HISTORY CLASSROOM TEXTBOOK &bull; SADDLE-STITCH REPROGRAPHICS COMPLIANT</span>
      <span class="footer-right"><span class="page-num">2</span></span>
    </footer>
  </div>

  <!-- ==========================================
       PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE
  =========================================== -->
  <div class="page spine-page" id="page-3" data-page="3">
    <header class="page-running-header">
      <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM</span>
      <span class="header-center">CHRONOLOGICAL MILESTONE SPINE &bull; 1918–1939</span>
      <span class="header-right">OPTION 31 &bull; PAGE 3</span>
    </header>

    <div class="spine-header-strip">
      <div class="shs-title-group">
        <h2>CHRONOLOGICAL MILESTONE SPINE &amp; TURNING POINTS</h2>
        <p>18 Defining Causal Turning Points Across All 16 Canonical Lessons &bull; Option 31</p>
      </div>
      <span class="shs-badge">Chronological Highway</span>
    </div>

    <div class="spine-container">
      ${milestoneItemsHtml}
    </div>

    <footer class="page-running-footer">
      <span class="footer-left">Option 31: Weimar and Nazi Germany, 1918–39</span>
      <span class="footer-center">THE DISCIPLINARY HISTORY CLASSROOM TEXTBOOK &bull; SADDLE-STITCH REPROGRAPHICS COMPLIANT</span>
      <span class="footer-right"><span class="page-num">3</span></span>
    </footer>
  </div>

  <!-- ==========================================
       PAGES 4–27: 12 CANONICAL ENQUIRY SPREADS
  =========================================== -->
  ${spreadsHtml}

  <!-- ==========================================
       PAGE 28: MASTER KNOWLEDGE RETRIEVAL QUIZ
  =========================================== -->
  <div class="page quiz-page" id="page-28" data-page="28">
    <div class="page-inner quiz-inner">
      <header class="quiz-header">
        <h2 class="quiz-title">MASTER KNOWLEDGE RETRIEVAL QUIZ &bull; 60 RECALL CHECKS</h2>
        <span class="masthead-badge">Cumulative GCSE Retrieval</span>
      </header>

      <div class="quiz-notice-banner">
        <strong>Partner Quiz or Solo Retrieval Practice:</strong> Test your core retention across all four Key Topics. Every question cross-references the paragraph text across Pages 4–27. Zero answers printed to enforce active retrieval practice.
      </div>

      <main class="quiz-grid" id="quiz-grid">
        ${quizCardsHtml}
      </main>

      <footer class="page-footer">
        <span class="footer-left">Page 28 &bull; Master Knowledge Retrieval Quiz</span>
        <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
        <span class="footer-right">60 Essential Curriculum Questions</span>
      </footer>
    </div>
  </div>

  <!-- IN-BROWSER AUTO-FIT ENGINES FOR 100% REPROGRAPHIC COMPLIANCE -->
  <script>
    function autoFitCoverSynopsis() {
      const page = document.querySelector('#page-1');
      const body = document.querySelector('#cover-synopsis-body');
      if (!page || !body) return;

      let fs = 8.5;
      while (page.scrollHeight > page.clientHeight && fs > 6.0) {
        fs -= 0.1;
        body.querySelectorAll('p').forEach(p => {
          p.style.fontSize = fs.toFixed(1) + 'pt';
          p.style.lineHeight = '1.38';
          p.style.marginBottom = '3px';
        });
      }
    }

    function autoFitInsideCoverDirectory() {
      const page = document.querySelector('#page-2');
      if (!page) return;
      const footer = page.querySelector('.page-running-footer') || page.querySelector('.page-footer');
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const blurbs = Array.from(page.querySelectorAll('.isr-blurb'));
      const questions = Array.from(page.querySelectorAll('.isr-question'));
      const rows = Array.from(page.querySelectorAll('.inside-spec-row'));

      function getLastBottom() {
        const lastRow = page.querySelector('.inside-kt-group:last-child .inside-spec-row:last-child');
        return lastRow ? lastRow.getBoundingClientRect().bottom : (footerTop - 20);
      }

      let fs = 6.5;
      let pad = 3.8;

      // 1. Scale down if overflowing or touching footer
      while ((page.scrollHeight > page.clientHeight || getLastBottom() > footerTop - 6) && fs > 4.6) {
        fs -= 0.1;
        pad = Math.max(1.5, pad - 0.1);
        blurbs.forEach(b => {
          b.style.fontSize = fs.toFixed(1) + 'pt';
          b.style.lineHeight = '1.24';
        });
        questions.forEach(q => q.style.fontSize = (fs + 1.2).toFixed(1) + 'pt');
        rows.forEach(r => {
          r.style.paddingTop = pad.toFixed(1) + 'px';
          r.style.paddingBottom = pad.toFixed(1) + 'px';
        });
      }

      // 2. Scale up if there is ample clearance to fill vertical space naturally
      let clearance = footerTop - getLastBottom();
      if (clearance > 12 && page.scrollHeight <= page.clientHeight) {
        let bestFs = fs;
        let bestPad = pad;
        for (let testFs = fs + 0.1; testFs <= 7.8; testFs += 0.1) {
          const testPad = pad + (testFs - fs) * 0.8;
          blurbs.forEach(b => {
            b.style.fontSize = testFs.toFixed(1) + 'pt';
            b.style.lineHeight = '1.28';
          });
          questions.forEach(q => q.style.fontSize = (testFs + 1.2).toFixed(1) + 'pt');
          rows.forEach(r => {
            r.style.paddingTop = testPad.toFixed(1) + 'px';
            r.style.paddingBottom = testPad.toFixed(1) + 'px';
          });

          if (getLastBottom() <= footerTop - 6 && page.scrollHeight <= page.clientHeight) {
            bestFs = testFs;
            bestPad = testPad;
          } else {
            break;
          }
        }
        blurbs.forEach(b => {
          b.style.fontSize = bestFs.toFixed(1) + 'pt';
          b.style.lineHeight = '1.28';
        });
        questions.forEach(q => q.style.fontSize = (bestFs + 1.2).toFixed(1) + 'pt');
        rows.forEach(r => {
          r.style.paddingTop = bestPad.toFixed(1) + 'px';
          r.style.paddingBottom = bestPad.toFixed(1) + 'px';
        });
      }
    }

    function autoFitPage3Milestones() {
      const page = document.querySelector('#page-3');
      if (!page) return;
      const spineContainer = page.querySelector('.spine-container');
      const footer = page.querySelector('.page-running-footer');
      const items = Array.from(page.querySelectorAll('.spine-item'));
      const descs = Array.from(page.querySelectorAll('.spine-desc'));
      const titles = Array.from(page.querySelectorAll('.spine-title'));
      const badges = Array.from(page.querySelectorAll('.spine-date-badge'));
      const contents = Array.from(page.querySelectorAll('.spine-content'));
      if (!spineContainer || !footer || !items.length) return;

      const footerTop = footer.getBoundingClientRect().top;
      function getLastBottom() {
        const last = page.querySelector('.spine-item:last-child');
        return last ? last.getBoundingClientRect().bottom : 0;
      }

      function apply(fs, gap, padY) {
        spineContainer.style.gap = gap.toFixed(1) + 'px';
        descs.forEach(d => {
          d.style.fontSize = fs.toFixed(1) + 'pt';
          d.style.lineHeight = '1.26';
        });
        titles.forEach(t => t.style.fontSize = (fs + 0.6).toFixed(1) + 'pt');
        badges.forEach(b => b.style.fontSize = (fs - 0.2).toFixed(1) + 'pt');
        contents.forEach(c => {
          c.style.paddingTop = padY.toFixed(1) + 'px';
          c.style.paddingBottom = padY.toFixed(1) + 'px';
        });
      }

      let fs = 6.8;
      let gap = 3.5;
      let padY = 2.5;
      apply(fs, gap, padY);

      // 1. Scale down if overflowing
      while ((page.scrollHeight > page.clientHeight || getLastBottom() > footerTop - 6) && fs > 5.2) {
        fs -= 0.1;
        gap = Math.max(1.8, gap - 0.15);
        padY = Math.max(1.2, padY - 0.1);
        apply(fs, gap, padY);
      }

      // 2. Scale up if room permits
      let clearance = footerTop - getLastBottom();
      if (clearance > 10 && page.scrollHeight <= page.clientHeight) {
        let bestFs = fs;
        let bestGap = gap;
        let bestPadY = padY;
        for (let testFs = fs + 0.1; testFs <= 8.2; testFs += 0.1) {
          const testGap = gap + (testFs - fs) * 0.8;
          const testPadY = padY + (testFs - fs) * 0.35;
          apply(testFs, testGap, testPadY);

          if (getLastBottom() <= footerTop - 8 && page.scrollHeight <= page.clientHeight) {
            bestFs = testFs;
            bestGap = testGap;
            bestPadY = testPadY;
          } else {
            break;
          }
        }
        apply(bestFs, bestGap, bestPadY);
      }
    }

    function autoFitSpreadTypography() {
      document.querySelectorAll('.spread-body').forEach(body => {
        const page = body.closest('.page');
        const footer = page ? page.querySelector('.page-footer') : null;
        if (!page) return;

        let attempts = 0;
        let pSize = 11.5;
        let pLine = 1.58;

        const checkOverflow = () => {
          const bodyOverflow = body.scrollHeight > body.clientHeight + 3;
          let footerOverlap = false;
          if (footer) {
            const bRect = body.getBoundingClientRect();
            const fRect = footer.getBoundingClientRect();
            if (bRect.bottom > fRect.top - 2) footerOverlap = true;
          }
          return bodyOverflow || footerOverlap;
        };

        while (checkOverflow() && attempts < 25 && pSize > 8.8) {
          pSize -= 0.15;
          pLine = Math.max(1.36, pLine - 0.015);
          body.querySelectorAll('.prose-p').forEach(p => {
            p.style.fontSize = pSize + 'pt';
            p.style.lineHeight = pLine;
            p.style.marginBottom = Math.max(3, pSize * 0.35) + 'px';
          });
          attempts++;
        }
      });
    }

    window.addEventListener('load', () => {
      autoFitCoverSynopsis();
      autoFitInsideCoverDirectory();
      autoFitPage3Milestones();
      autoFitSpreadTypography();
    });
  </script>
</body>
</html>`;
}

// Main execution function
async function main() {
  console.log('=== COMPILING WEIMAR AND NAZI GERMANY 28-PAGE MASTER CLASSROOM TEXTBOOK ===');
  const unitData = loadWeimarData();
  console.log(`Loaded unit data: "${unitData.title}" (${unitData.lessons.length} lessons)`);

  const htmlContent = generateTextbookHtml(unitData);

  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'weimar_nazi_germany');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });

  const htmlPath = path.join(htmlOutputDir, 'textbook_UNIFIED.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(
    `Saved unified textbook HTML: ${htmlPath} (${Math.round(htmlContent.length / 1024)} KB)`,
  );

  console.log('\nLaunching Puppeteer for reprographic audit and PDF rendering...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1697, deviceScaleFactor: 2 });

  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');

  // Run in-browser calibrators
  await page.evaluate(() => {
    if (typeof autoFitCoverSynopsis === 'function') autoFitCoverSynopsis();
    if (typeof autoFitInsideCoverDirectory === 'function') autoFitInsideCoverDirectory();
    if (typeof autoFitPage3Milestones === 'function') autoFitPage3Milestones();
    if (typeof autoFitSpreadTypography === 'function') autoFitSpreadTypography();
  });

  await new Promise((r) => setTimeout(r, 1200));

  // Reprographics Space Audit
  console.log('\nRunning Automated Reprographics Page Budget Audit...');
  const auditResults = await auditPageBudget(page, {
    maxPages: 28,
    exactPageCount: 28,
    footerVoidWarningThresholdPx: 45,
    pageSelector: '.page',
  });

  printSpaceAuditReport(auditResults, 'weimar_nazi_germany/textbook_UNIFIED.html');

  if (auditResults.hasErrors) {
    console.error('\n❌ REPROGRAPHIC COMPLIANCE FAILED!');
    await browser.close();
    process.exit(1);
  }

  console.log('\n✅ 100% REPROGRAPHIC COMPLIANCE CONFIRMED (0px overflow across all 28 pages).');

  // Render PDF
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });

  const pdfPath = path.join(pdfOutputDir, 'weimar_nazi_germany_textbook_UNIFIED_FINAL.pdf');
  const pdfPathLegacy = path.join(pdfOutputDir, 'weimar_textbook_UNIFIED.pdf');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  fs.copyFileSync(pdfPath, pdfPathLegacy);

  console.log(`\n📄 Generated PDF: ${pdfPath}`);
  console.log(`📄 Generated Legacy PDF: ${pdfPathLegacy}`);

  // Take previews of key pages for verification
  const previewDir = path.join(htmlOutputDir, 'previews', 'unified');
  if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir, { recursive: true });

  for (const pageNum of [1, 2, 3, 4, 5, 28]) {
    const pageEl = await page.$(`#page-${pageNum}`);
    if (pageEl) {
      const pPath = path.join(previewDir, `page_${pageNum}.png`);
      await pageEl.screenshot({ path: pPath });
      console.log(`📸 Captured Page ${pageNum} preview: ${pPath}`);
    }
  }

  await browser.close();
  console.log('\n🎉 WEIMAR AND NAZI GERMANY 28-PAGE MASTER TEXTBOOK COMPILED SUCCESSFULLY!');
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
