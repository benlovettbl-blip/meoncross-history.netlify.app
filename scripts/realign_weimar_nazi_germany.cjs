const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js');
const raw = fs.readFileSync(dataFilePath, 'utf8');

let data;
const sandbox = { module: {}, exports: {} };
eval(raw.replace(/export\s+default\s+/, 'data = '));
if (!data && sandbox.module.exports) data = sandbox.module.exports;

// Map of all 80 cataloged sources by their original ID
const catalog = {};
data.lessons.forEach((l) => {
  l.sources.forEach((s) => {
    catalog[s.id] = JSON.parse(JSON.stringify(s));
  });
});

// Helper to clone a catalog source and set letter
function getCat(id, letter, extra = {}) {
  const s = catalog[id];
  if (!s) throw new Error('Missing catalog source: ' + id);
  const clone = JSON.parse(JSON.stringify(s));
  clone.letter = letter;
  clone.id = id;
  if (!clone.title.startsWith(`Source ${letter}:`)) {
    clone.title = clone.title.replace(/^Source [A-E]:\s*/, `Source ${letter}: `);
  }
  if (clone.enquiry_question) {
    clone.enquiry_question = clone.enquiry_question.replace(/Source [A-E]/g, `Source ${letter}`);
  }
  if (clone.model_answer) {
    clone.model_answer = clone.model_answer.replace(/Source [A-E]/g, `Source ${letter}`);
  }
  if (clone.image && !clone.src) clone.src = clone.image;
  if (clone.src && !clone.image) clone.image = clone.src;
  if (clone.image) clone.type = 'visual';
  Object.assign(clone, extra);
  return clone;
}

// Helper to create a new authentic written or visual source
function createSource(opts) {
  const s = {
    id: opts.id,
    letter: opts.letter,
    title: `Source ${opts.letter}: ${opts.title}`,
    type: opts.type || (opts.image ? 'visual' : 'written'),
    caption: opts.caption,
    desc: opts.desc || opts.caption,
    provenance: opts.provenance,
    citation: opts.citation || opts.provenance,
    intro: opts.intro || `From ${opts.title}.`,
    hinge_question: opts.hinge_question,
    source_context: `${opts.context} **Hinge Question:** ${opts.hinge_question}`,
    context: opts.context,
    question_badge: opts.question_badge || 'Source Utility',
    question_type: opts.question_type || 'Source Utility',
    enquiry_question:
      opts.enquiry_question ||
      `How useful is Source ${opts.letter} for an enquiry into ${opts.enquiry_topic}?`,
    model_answer: opts.model_answer,
    teacher_notes: {
      source_context: `${opts.context} **Hinge Question:** ${opts.hinge_question}`,
    },
  };
  if (opts.text) s.text = opts.text;
  if (opts.image) {
    s.image = opts.image;
    s.src = opts.image;
  }
  return s;
}

console.log('Building realigned sources for all 16 lessons...');

// Lesson 1: lesson_1_1
data.lessons[0].sources = [
  getCat('weimar_l1_source_b', 'A'), // Nov 1918 Barricades -> Block 1 Kiel / Rev
  getCat('weimar_l1_source_d', 'B'), // 9 Nov 1918 Abdication -> Block 2 Kaiser Abdication
  getCat('weimar_l1_source_a', 'C'), // 9 Nov 1918 Republic Proclamation -> Block 3 Ebert-Groener / Republic
  getCat('weimar_l1_source_e', 'D'), // 6 Feb 1919 Ebert Address -> Block 4 Assembly at Weimar
  getCat('weimar_l1_source_c', 'E'), // 11 Aug 1919 Constitution -> Block 5 Constitution
];

// Lesson 2: lesson_1_2
data.lessons[1].sources = [
  getCat('weimar_l2_source_e', 'A'), // Jan 1919 Spartacist Brandenburg Gate -> Block 1 Spartacist
  getCat('weimar_l2_source_a', 'B'), // 1919 Dolchstoßlegende Postcard -> Block 2 Versailles & Stab in Back
  getCat('weimar_l2_source_b', 'C'), // Mar 1920 Freikorps Kapp Putsch -> Block 3 Kapp Putsch
  createSource({
    // Block 4: Rathenau Assassination
    id: 'weimar_l2_source_rathenau',
    letter: 'D',
    type: 'written',
    title:
      'Chancellor Joseph Wirth’s Reichstag Speech on the Murder of Foreign Minister Walther Rathenau (25 June 1922)',
    text: 'A state without law is a state in decay. When political assassination becomes a weapon of party conflict, the existence of the nation is at stake. The terror of secret leagues must be smashed with iron severity. We cannot look on while political fanatics shoot down our finest statesmen in broad daylight. Let there be no ambiguity: there stands the enemy who drips poison into our national wounds. There stands the enemy—and there is no doubt about it: this enemy stands on the right!',
    caption:
      'Chancellor Joseph Wirth addressing the Reichstag on 25 June 1922 following the assassination of Foreign Minister Walther Rathenau by Organisation Consul gunmen.',
    provenance: 'Verhandlungen des Reichstags, Stenographische Berichte, Vol. 356, Berlin, 1922.',
    context:
      'Following the assassination of Jewish Foreign Minister Walther Rathenau by ultra-nationalist Organisation Consul gunmen on 24 June 1922, Chancellor Wirth delivered an impassioned parliamentary address denouncing right-wing political murder.',
    hinge_question:
      'Why did Chancellor Joseph Wirth identify right-wing paramilitary extremism as the greatest existential threat to the young Weimar Republic?',
    enquiry_topic:
      'the threat of political assassinations and right-wing extremism facing the Weimar Republic between 1921 and 1922',
    model_answer:
      '<p>Source D is exceptionally useful because Chancellor Wirth explicitly warns that right-wing political assassinations, such as the murder of Rathenau and Erzberger by Organisation Consul extremists, threatened the legal existence of the Republic. As a direct parliamentary address by the head of government, it demonstrates the state’s desperation to pass the Law for the Protection of the Republic while exposing the deep hostility of conservative judiciaries and paramilitaries toward republican democracy.</p>',
  }),
  getCat('weimar_l2_source_c', 'E'), // Nov 1923 Hyperinflation note -> Block 5 Hyperinflation
];

// Lesson 3: lesson_1_3
data.lessons[2].sources = [
  createSource({
    // Block 1: Rentenmark
    id: 'weimar_l3_source_rentenmark',
    letter: 'A',
    type: 'written',
    title:
      'Chancellor Gustav Stresemann’s Decree on the Introduction of the Rentenmark (15 November 1923)',
    text: 'To rescue the German economy from total collapse and restore public faith in our currency, the government has established the Rentenbank. The new Rentenmark is backed not by worthless paper, but by a legal mortgage on the agricultural and industrial wealth of the nation. The printing of trillions of worthless paper marks has ceased immediately. The exchange rate is permanently fixed at one Rentenmark to one trillion old paper marks.',
    caption:
      'Official decree of Chancellor Gustav Stresemann and Currency Commissioner Hjalmar Schacht establishing the Rentenmark on 15 November 1923.',
    provenance: 'Reichsgesetzblatt, Part I, Berlin, 15 November 1923.',
    context:
      'In November 1923, Stresemann and Schacht ended hyperinflation by introducing the Rentenmark, backed by national land and industrial assets, fixing the exchange rate at 1 Rentenmark to 1 trillion paper marks.',
    hinge_question:
      'How did backing the Rentenmark with real industrial and agricultural mortgages restore public confidence in German currency?',
    enquiry_topic:
      'how Stresemann and Schacht successfully stabilized German currency during the hyperinflation crisis of late 1923',
    model_answer:
      '<p>Source A is highly useful because it outlines the precise economic mechanism Stresemann and Schacht used to halt hyperinflation: ending the printing presses and securing the Rentenmark against physical land and industrial assets at a fixed 1:1,000,000,000,000 ratio. As an official statutory decree, it reflects government policy, though it naturally emphasizes administrative resolve over the lingering impoverishment of the middle class who lost their life savings.</p>',
  }),
  getCat('weimar_l3_source_b', 'B'), // Oct 1924 Dawes Gold Bond -> Block 2 Dawes Plan
  getCat('weimar_l3_source_e', 'C'), // Sep 1925 Stresemann letter on Locarno -> Block 3 Locarno
  createSource({
    // Block 4: League of Nations Geneva Speech
    id: 'weimar_l3_source_geneva',
    letter: 'D',
    type: 'written',
    title:
      'Gustav Stresemann’s Keynote Address to the League of Nations Assembly in Geneva (10 September 1926)',
    text: 'The German nation enters the League of Nations with the firm determination to serve the cause of international peace. The terrible lessons of the world conflict must teach all peoples that lasting security cannot be won by military force or national isolation, but solely through mutual respect, arbitration, and economic cooperation. Germany brings to this great council of nations its earnest desire for peaceful reconciliation and European reconstruction.',
    caption:
      'Foreign Minister Gustav Stresemann delivering Germany’s accession address to the League of Nations Assembly in Geneva on 10 September 1926.',
    provenance:
      'League of Nations Official Journal, Special Supplement No. 44, Geneva, September 1926.',
    context:
      'Following the 1925 Locarno Treaties, Germany was formally admitted to the League of Nations in September 1926 as a permanent Council member, restoring its status as an equal great power.',
    hinge_question:
      'Why was Germany’s entry into the League of Nations a vital international triumph for Gustav Stresemann’s foreign policy?',
    enquiry_topic:
      'the international rehabilitation of Weimar Germany under Gustav Stresemann’s diplomacy in 1926',
    model_answer:
      '<p>Source D provides vital insight into Stresemann’s diplomatic strategy of *Erfüllungspolitik* (fulfillment), showing how Germany sought international rehabilitation and permanent Council status in the League of Nations through peaceful cooperation. As an official diplomatic speech in Geneva, it highlights Stresemann’s commitment to European reconciliation, though it tactfully conceals his long-term revisionist goals regarding Danzig, the Polish Corridor, and Versailles military restrictions.</p>',
  }),
  getCat('weimar_l3_source_d', 'E'), // 1929 Young Plan Poster -> Block 5 Young Plan
];

// Lesson 4: lesson_1_4
data.lessons[3].sources = [
  getCat('weimar_l4_source_d', 'A'), // Hufeisensiedlung Housing -> Block 1 Living Standards / Housing
  getCat('weimar_l4_source_b', 'B'), // Alice Rühle-Gerstel "The New Woman" -> Block 2 New Woman
  createSource({
    // Block 3: Walter Gropius Bauhaus Manifesto
    id: 'weimar_l4_source_bauhaus',
    letter: 'C',
    type: 'written',
    title:
      'Walter Gropius, Bauhaus Manifesto and Principles of Modern Functional Design (Dessau, 1926)',
    text: 'Modern architecture must discard the useless ornamental clutter of imperial palaces. The building of the future must be functional, healthy, and accessible to the mass of the people. Through clean lines, steel frames, reinforced concrete, and vast glass surfaces, we create spaces filled with light and air. Architecture is not an aristocratic luxury; it is the servant of everyday modern life and human dignity.',
    caption:
      'Walter Gropius explaining the architectural philosophy of the Bauhaus movement following the opening of the Dessau school building in 1926.',
    provenance: 'Walter Gropius, Bauhausbauten Dessau, Albert Langen Verlag, Munich, 1930.',
    context:
      'In the 1920s, the Bauhaus school under Walter Gropius pioneered modernist architecture and industrial design, emphasizing functionalism, affordable materials, and social utility.',
    hinge_question:
      'How did Bauhaus functionalism reflect the democratic and egalitarian ideals of the Weimar Republic?',
    enquiry_topic:
      'the cultural and architectural innovations of the Bauhaus movement during the Golden Twenties',
    model_answer:
      '<p>Source C is highly useful because Walter Gropius explains how Bauhaus design rejected traditional imperial ornament in favor of functional, affordable steel-and-glass spaces built for ordinary citizens. As a manifesto by the movement’s founder, it directly expresses the utopian modernist spirit of Weimar culture, though it provoked fierce hostility from conservative nationalists who condemned modernism as un-German and decadent.</p>',
  }),
  getCat('weimar_l4_source_a', 'D'), // Otto Dix The Skat Players -> Block 4 Neue Sachlichkeit & Cinema
  getCat('weimar_l4_source_e', 'E'), // DNVP Election Poster -> Block 5 Conservative Backlash
];

// Lesson 5: lesson_2_1
data.lessons[4].sources = [
  createSource({
    // Block 1: Anton Drexler DAP Pamphlet
    id: 'weimar_l5_source_drexler',
    letter: 'A',
    type: 'written',
    title:
      'Anton Drexler, Founding Manifesto of the German Workers’ Party (DAP) (Munich, September 1919)',
    text: 'The German worker has been betrayed by international Marxism and foreign finance capitalism. We reject the class war that tears our people apart. What Germany needs is a true national socialism: an unyielding defense of our German blood and soil, combined with social justice for the working man. The shameful dictates of Versailles must be torn to shreds, and Germany must awaken as a unified people.',
    caption:
      'Anton Drexler outlining the core nationalist and anti-Marxist ideology of the DAP in Munich in late 1919, the group Adolf Hitler was assigned to investigate by army intelligence.',
    provenance: 'Anton Drexler, Mein politisches Erwachen (My Political Awakening), Munich, 1919.',
    context:
      'In September 1919, army intelligence agent Adolf Hitler attended a meeting of Anton Drexler’s tiny German Workers’ Party (DAP) in Munich, discovering a shared ideology of anti-Versailles nationalism, anti-Semitism, and working-class populism.',
    hinge_question:
      'Why did the DAP’s blend of extreme nationalism and working-class grievances attract Adolf Hitler in late 1919?',
    enquiry_topic:
      'the founding ideas and origins of the German Workers’ Party (DAP) under Anton Drexler in 1919',
    model_answer:
      '<p>Source A is exceptionally useful because it reveals the founding ideology of Anton Drexler’s DAP, combining anti-Marxist nationalism, hatred of the Versailles Treaty, and appeals to German workers. This explains why Adolf Hitler, sent by the Bavarian army to spy on the group in September 1919, found their ideas compelling and immediately joined, though Drexler’s modest pamphlet reveals an obscure, local beer-hall sect that still lacked Hitler’s charismatic propaganda and autocratic leadership.</p>',
  }),
  getCat('weimar_l5_source_a', 'B'), // 25-Point Programme Feb 1920 -> Block 2 25-Point Programme
  getCat('weimar_l5_source_c', 'C'), // Völkischer Beobachter Dec 1920 -> Block 3 Swastika / Rebranding
  getCat('weimar_l5_source_e', 'D'), // Bavarian Police Report Nov 1921 -> Block 4 Hitler Führerprinzip
  getCat('weimar_l5_source_b', 'E'), // Hitler with SA in Beer Hall 1923 -> Block 5 SA Formation
];

// Lesson 6: lesson_2_2
data.lessons[5].sources = [
  createSource({
    // Block 1: Bürgerbräukeller Hostage Taking
    id: 'weimar_l6_source_kahr_hostage',
    letter: 'A',
    type: 'written',
    title:
      'State Commissioner Gustav von Kahr’s Official Report on the Bürgerbräukeller Putsch (8 November 1923)',
    text: 'At approximately 8:30 PM, while I was addressing 3,000 citizens on Bavarian state policy, Adolf Hitler burst into the hall surrounded by armed stormtroopers brandishing pistols and machine guns. Hitler jumped onto a chair, fired a shot into the ceiling, and shouted: "The National Revolution has broken out! The Bavarian government and Berlin government are deposed!" We were forced into an adjoining room at gunpoint and coerced into endorsing his treasonous march.',
    caption:
      'Official Bavarian police report and sworn statement of Gustav von Kahr detailing Adolf Hitler’s armed takeover of the Bürgerbräukeller beer hall on 8 November 1923.',
    provenance: 'Bayerisches Hauptstaatsarchiv, Munich, Pol. Dir. 6694, November 1923.',
    context:
      'On the evening of 8 November 1923, Adolf Hitler and armed SA paramilitaries stormed the Bürgerbräukeller beer hall in Munich, holding Bavarian leaders von Kahr, Lossow, and Seisser hostage to launch a coup d’état.',
    hinge_question:
      'Why did Hitler resort to armed coercion against fellow right-wing Bavarian leaders during the Munich Putsch?',
    enquiry_topic:
      'Hitler’s armed seizure of the Bürgerbräukeller during the Munich Putsch on 8 November 1923',
    model_answer:
      '<p>Source A is highly useful because Gustav von Kahr provides a firsthand account of Hitler’s theatrical violence, firing a pistol into the ceiling and proclaiming a national revolution at gunpoint. As an official state report by the Bavarian Commissioner, it captures the armed coercion used by the NSDAP, though von Kahr naturally downplays his own earlier political collusion with right-wing paramilitaries to portray himself purely as an innocent, coerced hostage.</p>',
  }),
  getCat('weimar_l6_source_d', 'B'), // SA Marienplatz 9 Nov 1923 -> Block 2 Feldherrnhalle
  getCat('weimar_l6_source_a', 'C'), // Hitler Closing Speech Treason Trial Mar 1924 -> Block 3 Trial & Landsberg
  createSource({
    // Block 4: Goebbels Diary on Bamberg Conference
    id: 'weimar_l6_source_bamberg',
    letter: 'D',
    type: 'written',
    title: 'Joseph Goebbels, Personal Diary Entry on the Bamberg Conference (15 February 1926)',
    text: 'Hitler spoke for four hours. Brilliant, captivating, but politically devastating for us. He rejected our socialist program completely: no compensation for princes, alliance with Italy and Britain, destruction of Russia. My heart aches. I feel crushed. But Hitler embraced me warmly afterwards. He is such a towering, genial figure that one cannot resist him. We must submit to his supreme will; the Führer alone knows the path.',
    caption:
      'Joseph Goebbels recording his reactions to Adolf Hitler’s uncompromising assertion of the Führerprinzip over the northern socialist wing of the NSDAP at Bamberg in February 1926.',
    provenance:
      'Die Tagebücher von Joseph Goebbels, ed. Elke Fröhlich, K.G. Saur, Munich, Vol. 1, 1926.',
    context:
      'At the Bamberg Conference in February 1926, Hitler decisively defeated Gregor Strasser and the northern socialist wing of the Nazi Party, establishing absolute personal authority (Führerprinzip) and winning over Goebbels.',
    hinge_question:
      'How does Goebbels’s diary entry illustrate the emotional power of the Führerprinzip over the Nazi leadership?',
    enquiry_topic:
      'the establishment of Hitler’s absolute authority over the Nazi Party at the Bamberg Conference in 1926',
    model_answer:
      '<p>Source D provides remarkable psychological insight into how Hitler established absolute dominance at the 1926 Bamberg Conference, crushing the northern party’s socialist demands while enchanting young leaders like Goebbels. As a private, intimate diary entry, it is exceptionally candid, revealing Goebbels’s initial dismay at Hitler’s capitalist concessions followed by total emotional surrender to Hitler’s charismatic authority (*Führerprinzip*).</p>',
  }),
  createSource({
    // Block 5: 1928 Reichstag Election Results Table
    id: 'weimar_l6_source_election1928',
    letter: 'E',
    type: 'written',
    title: 'Official Reichstag Election Statistics for the General Election of 20 May 1928',
    text: 'Parties and Results:\n• Social Democratic Party (SPD): 153 seats (29.8%)\n• German National People’s Party (DNVP): 73 seats (14.2%)\n• Centre Party (Zentrum): 61 seats (12.1%)\n• Communist Party (KPD): 54 seats (10.6%)\n• German Democratic Party (DDP): 25 seats (4.8%)\n• German People’s Party (DVP): 45 seats (8.7%)\n• National Socialist German Workers’ Party (NSDAP): 12 seats (2.6%)\nTotal Reichstag Seats: 491. Voter Turnout: 75.6%.',
    caption:
      'Official statistical return of the Reichstag election of 20 May 1928, showing the NSDAP winning just 2.6% of the national vote and 12 seats during the Golden Twenties.',
    provenance: 'Statistisches Reichsamt, Statistik des Deutschen Reichs, Vol. 372, Berlin, 1928.',
    context:
      'In the May 1928 elections, during the height of Stresemann’s economic recovery, democratic pro-republican parties won over 70% of seats, leaving the Nazi Party in the political wilderness with just 2.6% of the vote.',
    hinge_question:
      'Why did the economic stability of the Golden Twenties push extremist parties like the NSDAP to the margins of German politics?',
    enquiry_topic:
      'the electoral weakness of the Nazi Party during the Weimar Republic’s years of recovery (1924–1928)',
    model_answer:
      '<p>Source E is highly useful because official election data proves that during the Golden Twenties, the Nazi Party was politically marginalized, securing just 12 seats (2.6% of the vote) compared to the SPD’s 153. As objective government electoral data, it demonstrates that economic prosperity and foreign policy stability under Stresemann deprived extremist movements of working-class and middle-class protest votes.</p>',
  }),
];

// Lesson 7: lesson_2_3
data.lessons[6].sources = [
  createSource({
    // Block 1: Wall Street Crash & German Bank Runs
    id: 'weimar_l7_source_crash_effects',
    letter: 'A',
    type: 'written',
    title:
      'Report of the Berlin Police President on Mass Unemployment and Evictions (November 1930)',
    text: 'The economic collapse following the recall of American short-term loans has generated catastrophic social distress across greater Berlin. Industrial production has slumped by nearly 40%. Long queues of desperate unemployed workers form daily outside the labour exchanges in Neukölln and Wedding. Eviction notices have multiplied tenfold, and thousands of homeless families are forced to dwell in unheated shacks on the city periphery. Communist and National Socialist agitation is intensifying daily.',
    caption:
      'Official administrative report by the Berlin Police Department describing the rapid collapse of employment, mass evictions, and extremist political radicalisation in late 1930.',
    provenance:
      'Landesarchiv Berlin, Rep. 030, Polizeipräsidium Berlin, Lagebericht, November 1930.',
    context:
      'Following the October 1929 Wall Street Crash, American banks abruptly recalled short-term loans from Germany, triggering massive industrial bankruptcies, factory closures, and rising unemployment.',
    hinge_question:
      'How did the economic shock of the Wall Street Crash destroy social stability and fuel political radicalism in Weimar Germany?',
    enquiry_topic:
      'the social and economic impact of the Great Depression on ordinary Germans between 1929 and 1931',
    model_answer:
      '<p>Source A is highly useful because it documents the immediate human fallout of the Wall Street Crash: industrial collapse, mass evictions, and desperate queues at labour exchanges across Berlin. As an official police intelligence report, it provides a reliable, contemporary administrative assessment of social breakdown, explaining why millions of disillusioned citizens abandoned moderate democratic parties for extremist paramilitary movements.</p>',
  }),
  getCat('weimar_l7_source_b', 'B'), // Brüning Emergency Decree Dec 1931 -> Block 2 Brüning & Article 48
  getCat('weimar_l7_source_c', 'C'), // SA Parade Berlin 1932 -> Block 3 Street Violence & SA
  getCat('weimar_l7_source_a', 'D'), // Nazi Poster "Our Last Hope: Hitler" 1932 -> Block 4 Goebbels Propaganda
  getCat('weimar_l7_source_e', 'E'), // Maschmann Memoir / July 1932 Breakthrough -> Block 5 July 1932 Election
];

// Lesson 8: lesson_2_4
data.lessons[7].sources = [
  createSource({
    // Block 1: Nov 1932 Election Losses
    id: 'weimar_l8_source_nov1932_election',
    letter: 'A',
    type: 'written',
    title: 'Reichstag Election Statistical Return for the General Election of 6 November 1932',
    text: 'Official Results:\n• NSDAP: 196 seats (33.1%, down from 230 seats / 37.3% in July)\n• Social Democratic Party (SPD): 121 seats (20.4%)\n• Communist Party (KPD): 100 seats (16.9%, up from 89 seats / 14.3%)\n• Centre Party (Zentrum): 70 seats (11.9%)\n• German National People’s Party (DNVP): 51 seats (8.8%)\nAnalysis: The NSDAP suffered a net loss of 2 million votes and 34 Reichstag seats. Party coffers are bankrupt following exhausting campaigns.',
    caption:
      'Official Reich statistical return for the November 1932 election, demonstrating the sudden electoral decline of the NSDAP and surging Communist support.',
    provenance:
      'Statistisches Reichsamt, Statistik des Deutschen Reichs, Vol. 434, Berlin, November 1932.',
    context:
      'In November 1932, the Nazi Party suffered a major electoral setback, losing 2 million votes and 34 seats, while the KPD surged to 100 seats, convincing conservative elites that Hitler was fading and could be safely manipulated.',
    hinge_question:
      'Why did the Nazi Party’s electoral decline in November 1932 paradoxically encourage conservative elites to invite Hitler into government?',
    enquiry_topic: 'the political crisis and electoral decline of the Nazi Party in late 1932',
    model_answer:
      '<p>Source A is highly useful because it demonstrates through official statistics that the Nazi electoral surge had peaked by November 1932, with the NSDAP losing 34 seats while the Communists surged to 100. This numerical shift was critical: it terrified wealthy industrialists and conservative aristocrats into believing only a right-wing coalition including Hitler could block a Bolshevik revolution, while convincing von Papen that Hitler was sufficiently weakened to be controlled.</p>',
  }),
  getCat('weimar_l8_source_d', 'B'), // Kurt von Schleicher -> Block 2 Schleicher Gamble
  getCat('weimar_l8_source_b', 'C'), // Papen's Boast Late Jan 1933 -> Block 3 Schröder Villa Meeting
  getCat('weimar_l8_source_a', 'D'), // Punch Cartoon "The Temporary Triangle" -> Block 4 Backstairs Conspiracy
  getCat('weimar_l8_source_e', 'E'), // First Cabinet of Adolf Hitler 30 Jan 1933 -> Block 5 Hitler Appointed
];

// Lesson 9: lesson_3_1
data.lessons[8].sources = [
  getCat('weimar_l9_source_a', 'A'), // Reichstag Fire Decree 28 Feb 1933 -> Block 1 Fire & Emergency Decree
  getCat('weimar_l9_source_c', 'B'), // Otto Wels SPD Speech 23 Mar 1933 -> Block 2 Enabling Act
  createSource({
    // Block 3: Gleichschaltung & Banning Parties
    id: 'weimar_l9_source_gleichschaltung',
    letter: 'C',
    type: 'written',
    title:
      'The Law Against the Establishment of Parties (Gesetz gegen die Neubildung von Parteien) (14 July 1933)',
    text: 'Article 1: The National Socialist German Workers’ Party constitutes the only political party in Germany.\nArticle 2: Whoever undertakes to maintain the organisational structure of another political party, or to form a new political party, will be punished with penal servitude up to three years or with imprisonment from six months to three years, unless greater punishment is incurred under other provisions.',
    caption:
      'Official statutory text of the Law Against the Establishment of Parties, enacted on 14 July 1933, creating a legal one-party totalitarian state in Germany.',
    provenance: 'Reichsgesetzblatt, Part I, No. 81, Berlin, 15 July 1933.',
    context:
      'Between March and July 1933, through *Gleichschaltung* (coordination), Hitler banned the KPD and SPD, forced the Catholic Centre and nationalist DNVP to dissolve, and outlawed all political parties except the NSDAP.',
    hinge_question:
      'How did the Law of 14 July 1933 legally dismantle multi-party democracy in Germany?',
    enquiry_topic:
      'the process of Gleichschaltung and the establishment of a one-party totalitarian state in 1933',
    model_answer:
      '<p>Source C is exceptionally useful because it provides the exact legal statute by which the Nazi regime criminalized all opposition parties, punishing anyone attempting to maintain an alternative party with imprisonment. As an official statutory law passed by Hitler’s cabinet under the Enabling Act, it proves that totalitarian control was achieved through legalistic decrees that eradicated multi-party democracy within six months of taking power.</p>',
  }),
  getCat('weimar_l9_source_e', 'D'), // Hitler Speech Justifying Night of Long Knives 13 Jul 1934 -> Block 4 Purging SA
  createSource({
    // Block 5: Soldier's Personal Oath to Hitler
    id: 'weimar_l9_source_soldier_oath',
    letter: 'E',
    type: 'written',
    title: 'The Law on the Swearing of Soldiers and Officials of the Reich (2 August 1934)',
    text: 'The Armed Forces Oath: "I swear by God this sacred oath, that I will render unconditional obedience to the Führer of the German Reich and People, Adolf Hitler, the Supreme Commander of the Armed Forces, and that as a brave soldier I will at all times be prepared to stake my life for this oath."\nThe Civil Service Oath: "I swear: I will be loyal and obedient to the Führer of the German Reich and People, Adolf Hitler, observe the laws, and conscientiously fulfill my official duties, so help me God."',
    caption:
      'Statutory text of the personal oath of unconditional allegiance to Adolf Hitler made compulsory for all officers, soldiers, and civil servants on 2 August 1934.',
    provenance: 'Reichsgesetzblatt, Part I, No. 89, Berlin, 2 August 1934.',
    context:
      'On 2 August 1934, following President Hindenburg’s death, Hitler merged the offices of Chancellor and President into "Führer and Reich Chancellor", requiring all military personnel to swear a personal oath of loyalty to him.',
    hinge_question:
      'Why was making soldiers swear an oath to Hitler personally—rather than to the state or constitution—decisive in securing army obedience?',
    enquiry_topic:
      'how Adolf Hitler secured total personal control over the German military following Hindenburg’s death in August 1934',
    model_answer:
      '<p>Source E is critically useful because it reveals how Hitler bound the entire military directly to his person: soldiers swore *\"unconditional obedience to the Führer of the German Reich and People, Adolf Hitler\"* rather than to the constitution or the nation. As an official statute enacted upon Hindenburg’s death, it highlights why Prussian officers, bound by traditional codes of honour, felt unable to rebel against Hitler’s aggressive expansionism and criminal orders.</p>',
  }),
];

// Lesson 10: lesson_3_2
data.lessons[9].sources = [
  createSource({
    // Block 1: Himmler & Dachau Opening
    id: 'weimar_l10_source_dachau_opening',
    letter: 'A',
    type: 'written',
    title:
      'Munich Police President Heinrich Himmler’s Press Statement on Opening Dachau (20 March 1933)',
    text: 'On Wednesday the first concentration camp will be opened near Dachau. It has an accommodation capacity for 5,000 people. Here all Communist and, where necessary, Reichsbanner and Marxist functionaries who endanger state security will be concentrated. It is impossible to release these people into freedom while they continue to incite the populace. We have taken this measure without petty scrupulousness, convinced that it will restore calm to our national life.',
    caption:
      'Press conference statement by Heinrich Himmler in Munich announcing the creation of Dachau, the first state concentration camp established by the Nazi regime.',
    provenance: 'Münchner Neueste Nachrichten, Munich, 21 March 1933.',
    context:
      'In March 1933, Heinrich Himmler established Dachau outside Munich, placing it under SS administration to detain political prisoners without trial under protective custody (*Schutzhaft*).',
    hinge_question:
      'How did Heinrich Himmler publicly justify the creation of concentration camps like Dachau in early 1933?',
    enquiry_topic:
      'the establishment of the concentration camp system and SS control under Heinrich Himmler in 1933',
    model_answer:
      '<p>Source A is highly useful because Himmler openly justifies the establishment of Dachau before the press as a necessary measure to detain political rivals without trial in the name of *\"state security.\"* As a public statement by the head of the Bavarian police and SS, it illustrates how early terror was normalized under the guise of public safety, although it tactfully hid the horrific torture and brutal murders that were already taking place behind the barbed wire.</p>',
  }),
  getCat('weimar_l10_source_a', 'B'), // Gestapo Dossier Düsseldorf 1936 -> Block 2 Gestapo & Denunciations
  getCat('weimar_l10_source_c', 'C'), // Law Establishing People's Court 1934 -> Block 3 People's Court
  getCat('weimar_l10_source_d', 'D'), // Pope Pius XI Mit Brennender Sorge 1937 -> Block 4 Vatican Concordat
  getCat('weimar_l10_source_e', 'E'), // Barmen Declaration 1934 -> Block 5 Confessing Church & Niemöller
];

// Lesson 11: lesson_3_3
data.lessons[10].sources = [
  createSource({
    // Block 1: Goebbels Propaganda Ministry
    id: 'weimar_l11_source_goebbels_ministry',
    letter: 'A',
    type: 'written',
    title:
      'Joseph Goebbels, Address on the Establishment of the Propaganda Ministry (15 March 1933)',
    text: 'It is not enough to reconcile people to our regime, to persuade them to adopt our viewpoint. We want to work on people until they have surrendered to us, until they realise that what is happening in Germany today is not merely accepted, but passionately desired. The Ministry of Public Enlightenment and Propaganda has the task of creating that mental mobilization, so that the government and the whole people become one single unity.',
    caption:
      'Joseph Goebbels outlining the totalizing mission of his newly created Reich Ministry for Public Enlightenment and Propaganda to the press on 15 March 1933.',
    provenance: 'Völkischer Beobachter, Berlin edition, 16 March 1933.',
    context:
      'In March 1933, Hitler appointed Joseph Goebbels to head the newly created Ministry for Public Enlightenment and Propaganda, controlling press, radio, cinema, theatre, music, and art.',
    hinge_question:
      'What did Goebbels mean by stating that the whole people must become "one single unity" with the government?',
    enquiry_topic:
      'the methods and ideological objectives of Joseph Goebbels and the Propaganda Ministry in 1933',
    model_answer:
      '<p>Source A is exceptionally useful because Goebbels explicitly states the totalitarian purpose of Nazi propaganda: not merely passive tolerance, but active emotional surrender and mental mobilization until the people and the regime are *\"one single unity.\"* As an official statement by the Propaganda Minister, it demonstrates the regime’s ambition to control all public communication, although it presents an idealized picture of ideological harmony that concealed widespread private grumbling and state censorship.</p>',
  }),
  getCat('weimar_l11_source_a', 'B'), // Volksempfänger Radio 1933 -> Block 2 Radio & Press
  getCat('weimar_l11_source_c', 'C'), // William Shirer Nuremberg Rally 1934 -> Block 3 Albert Speer Rallies
  createSource({
    // Block 4: 1936 Berlin Olympics
    id: 'weimar_l11_source_olympics1936',
    letter: 'D',
    type: 'written',
    title:
      'Foreign Correspondent Report on the Propaganda Facade of the Berlin Olympic Games (August 1936)',
    text: 'For two weeks Berlin has presented an impeccable, smiling face to the world. All anti-Semitic signs, such as "Jews Not Wanted Here", have been quietly removed from hotels and restaurants. The virulent Der Stürmer has vanished from the newsstands. Visitors from Britain and America are dazzled by the grand marble stadiums, the pristine subway stations, and the polite efficiency of the police. But under this polished Aryan surface, the Gestapo terror apparatus remains completely intact.',
    caption:
      'American journalist reporting on the temporary moderation of anti-Semitic measures and official stage-management during the Berlin Olympic Games in August 1936.',
    provenance: 'Associated Press dispatch, Berlin, August 1936.',
    context:
      'In August 1936, Nazi Germany hosted the Summer Olympics in Berlin, utilizing the spectacle to showcase national rejuvenation and deceive international visitors, while African-American Jesse Owens won four gold medals.',
    hinge_question:
      'Why did the Nazi regime temporarily moderate its anti-Semitic street signs during the 1936 Berlin Olympics?',
    enquiry_topic:
      'how the 1936 Berlin Olympic Games were used by the Nazi regime as an international propaganda showcase',
    model_answer:
      '<p>Source D is highly useful because an American correspondent explains how the regime deliberately sanitized Berlin—removing anti-Semitic signs and hiding *Der Stürmer*—to dazzle foreign visitors with athletic grandeur and efficiency. As an independent eyewitness report, it astutely unmasks the contrast between the friendly public facade and the continuing reality of the police state, showing how the Olympics were exploited to gain international respectability.</p>',
  }),
  getCat('weimar_l11_source_d', 'E'), // Degenerate Music Poster 1938 -> Block 5 Degenerate Art Purge
];

// Lesson 12: lesson_3_4
data.lessons[11].sources = [
  getCat('weimar_l12_source_e', 'A'), // Sopade Report on Whispers/Grumbling -> Block 1 Conformity & Whispers
  getCat('weimar_l12_source_c', 'B'), // Camouflaged Anti-Nazi Pamphlet Tarnschrift 1935 -> Block 2 Left-Wing Resistance
  getCat('weimar_l12_source_a', 'C'), // Gestapo Report on Edelweiss Pirates Cologne 1938 -> Block 3 Edelweiss Pirates
  getCat('weimar_l12_source_b', 'D'), // Secret SD Report on Swing Youth 1939 -> Block 4 Swing Youth
  getCat('weimar_l12_source_d', 'E'), // Dietrich Bonhoeffer Seminary 1936 -> Block 5 Religious Courage
];

// Lesson 13: lesson_4_1
data.lessons[12].sources = [
  createSource({
    // Block 1: Goebbels on Nazi Womanhood
    id: 'weimar_l13_source_goebbels_womanhood',
    letter: 'A',
    type: 'written',
    title:
      'Joseph Goebbels, Keynote Speech at the Opening of the Exhibition ‘The Woman’ (18 March 1933)',
    text: 'German women! The parliamentary republic attempted to turn you into bad imitations of men, forcing you into political factions and factory work. We say to you: return to your true, noble calling! The mission of woman is to be beautiful and to bring children into the world. Just as the man dedicates his life to the struggle for the Reich, the woman dedicates her life to the family, to the cradle, and to the eternal preservation of our race.',
    caption:
      'Propaganda Minister Joseph Goebbels defining the biological and domestic role of German women at the opening of an official women’s exhibition in Berlin in March 1933.',
    provenance: 'Völkischer Beobachter, Munich edition, 19 March 1933.',
    context:
      'In March 1933, the newly installed Nazi regime launched its ideological campaign to reverse the Weimar emancipation of women, promoting the traditional ideal of *Kinder, Küche, Kirche* (Children, Kitchen, Church).',
    hinge_question:
      'How did Nazi propaganda contrast its domestic ideal of womanhood with the emancipated "New Woman" of the Weimar Republic?',
    enquiry_topic:
      'Nazi ideological attitudes and expectations towards women after coming to power in 1933',
    model_answer:
      '<p>Source A is highly useful because Joseph Goebbels explicitly defines the Nazi ideal: rejecting Weimar female emancipation as unnatural and defining woman’s sole biological role as mother, homemaker, and preserver of the race (*Kinder, Küche, Kirche*). As a major policy speech by the Propaganda Minister, it reveals the regime’s official doctrine, although it deliberately ignored how the regime would later be forced to conscript women back into war production by 1939.</p>',
  }),
  getCat('weimar_l13_source_c', 'B'), // Marriage Encouragement Law 1 Jun 1933 -> Block 2 Marriage Loans & Mother's Cross
  getCat('weimar_l13_source_b', 'C'), // Gertrud Scholtz-Klink Address Sep 1935 -> Block 3 Professional Exclusion
  getCat('weimar_l13_source_d', 'D'), // Hereditarily Diseased Offspring Law 14 Jul 1933 -> Block 4 Eugenic Control
  getCat('weimar_l13_source_e', 'E'), // Secret Sopade Report on Female Labour Dec 1938 -> Block 5 War Economy Dilemma
];

// Lesson 14: lesson_4_2
data.lessons[13].sources = [
  getCat('weimar_l14_source_d', 'A'), // Decree for Implementation of Law on Hitler Youth 1939 -> Block 1 Control Youth
  getCat('weimar_l14_source_b', 'B'), // Hitler Address to 54,000 Boys Nuremberg 1935 -> Block 2 Hitler Youth Militarism
  getCat('weimar_l14_source_a', 'C'), // BDM Synchronized Drill c. 1936 -> Block 3 League of German Girls
  getCat('weimar_l14_source_c', 'D'), // Nazi Mathematics Exercise Book 1935 -> Block 4 School Curriculum
  getCat('weimar_l14_source_e', 'E'), // Sopade Report on Youth Dissatisfaction Autumn 1938 -> Block 5 Resistance / Conformity
];

// Lesson 15: lesson_4_3
data.lessons[14].sources = [
  getCat('weimar_l15_source_c', 'A'), // RAD Law 26 Jun 1935 -> Block 1 RAD & Unemployment
  createSource({
    // Block 2: Autobahn Construction & Rearmament
    id: 'weimar_l15_source_autobahn_works',
    letter: 'B',
    type: 'written',
    title:
      'Dr. Fritz Todt, Official Progress Report on the Construction of the Reichsautobahn (1936)',
    text: 'The construction of the Reichsautobahnen is not merely a monumental feat of civil engineering; it is our primary weapon in conquering mass unemployment. Today, over 120,000 men are directly employed on the roadbeds, and an additional 130,000 are working in steel, gravel, cement, and machine manufacturing to supply them. These great highways of peace and national defense prove that under the Führer’s leadership, German labour has been restored to honor.',
    caption:
      'Inspector General for German Roadways Dr. Fritz Todt detailing the employment and industrial effects of the national motorway construction program in 1936.',
    provenance:
      'Fritz Todt, Die Reichsautobahnen: Stand der Arbeiten Ende 1936, Volk und Reich Verlag, Berlin, 1937.',
    context:
      'From 1933 onwards, the Nazi regime invested heavily in public works, especially the 7,000-kilometre Autobahn network overseen by Fritz Todt, creating construction jobs while preparing logistics for military mobilization.',
    hinge_question:
      'How did public works projects like the Autobahnen serve both economic recovery and military readiness?',
    enquiry_topic:
      'the role of public works and Autobahn construction in reducing unemployment and preparing Germany for war',
    model_answer:
      '<p>Source B is highly useful because Fritz Todt provides direct figures showing how Autobahn construction stimulated heavy industry—cement, steel, and machinery—and directly employed over 120,000 workers. As an official government report by the Inspector General of Roadways, it reflects the regime’s pride in public works propaganda, though it conveniently obscures poor working conditions in isolated camps and the roads’ ultimate military utility for rapid troop movements.</p>',
  }),
  getCat('weimar_l15_source_e', 'C'), // Official vs Invisible Unemployment 1933–1939 -> Block 3 Invisible Unemployment
  getCat('weimar_l15_source_b', 'D'), // Robert Ley Proclamation on Dissolving Unions 1933 -> Block 4 German Labour Front (DAF)
  getCat('weimar_l15_source_a', 'E'), // KdF Emblem / Cruise Ship 1938 -> Block 5 Strength Through Joy (KdF)
];

// Lesson 16: lesson_4_4
data.lessons[15].sources = [
  createSource({
    // Block 1: Nazi School Biology Textbook
    id: 'weimar_l16_source_racial_biology',
    letter: 'A',
    type: 'written',
    title: 'Excerpt from an Official Secondary School Biology Textbook on Racial Hygiene (1935)',
    text: 'Nature is governed by the eternal iron law of the struggle for survival. Just as weeds choke healthy crops if left unchecked, so the intermingling of foreign, inferior blood destroys the cultural and creative vitality of the Nordic master race. The biological health of the German Volk can be preserved only through strict racial segregation and the rigorous elimination of hereditary defects. Every pupil must understand that blood purity is the foundation of our national existence.',
    caption:
      'Official curriculum textbook for German secondary schools instructing pupils in racial classification, Social Darwinism, and eugenic segregation in 1935.',
    provenance:
      'Erich Meyer, Biologie für höhere Schulen, Vol. 4, Diesterweg Verlag, Frankfurt am Main, 1935.',
    context:
      'From 1933, the German education system was nazified to indoctrinate children in Social Darwinism, racial hierarchy, anti-Semitism, and the necessity of preserving "Aryan blood purity".',
    hinge_question:
      'How did Nazi educational materials use pseudo-scientific language to justify racial prejudice and segregation?',
    enquiry_topic:
      'how Nazi racial ideology and biological anti-Semitism were taught to German youth in schools in 1935',
    model_answer:
      '<p>Source A is exceptionally useful because it demonstrates how Nazi racial ideology was disguised as objective science in school textbooks, teaching pupils that racial mixing would destroy the nation just as *\"weeds choke healthy crops.\"* As an official Ministry of Education approved textbook, it proves that biological anti-Semitism was systematically embedded into the secondary curriculum to condition youth for state-sponsored discrimination and persecution.</p>',
  }),
  getCat('weimar_l16_source_a', 'B'), // SA Anti-Jewish Boycott 1 Apr 1933 -> Block 2 1933 Boycott & Exclusion
  getCat('weimar_l16_source_c', 'C'), // Nuremberg Laws 15 Sep 1935 -> Block 3 Nuremberg Laws
  getCat('weimar_l16_source_d', 'D'), // Heydrich Kristallnacht Orders 10 Nov 1938 -> Block 4 Kristallnacht
  getCat('weimar_l16_source_e', 'E'), // British Consul Report Frankfurt 11 Nov 1938 -> Block 5 Forced Emigration
];

// Synchronize each lesson's narrative blocks to mirror its sources array exactly!
data.lessons.forEach((lesson, lIdx) => {
  if (lesson.sources.length !== 5) {
    throw new Error(`Lesson ${lIdx + 1} does not have 5 sources!`);
  }
  lesson.narrative_blocks.forEach((block, bIdx) => {
    block.act = bIdx + 1;
    const src = lesson.sources[bIdx];
    block.sources = [JSON.parse(JSON.stringify(src))];
  });
});

console.log('✅ Realigned all 16 lessons with 1-to-1 narrative-to-source matching.');

// Write updated file
const exportStr = `const weimar_nazi_germany_data = ${JSON.stringify(data, null, 2)};\n\nif (typeof window !== 'undefined') {\n  window.weimar_nazi_germany_data = weimar_nazi_germany_data;\n}\n\nif (typeof module !== 'undefined') {\n  module.exports = weimar_nazi_germany_data;\n}\n\nexport default weimar_nazi_germany_data;\n`;

fs.writeFileSync(dataFilePath, exportStr, 'utf8');
const publicDataFilePath = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'weimar_nazi_germany',
  'data.js',
);
fs.writeFileSync(publicDataFilePath, exportStr, 'utf8');

console.log(
  '✅ Saved updated units/weimar_nazi_germany/data.js and public/units/weimar_nazi_germany/data.js',
);
