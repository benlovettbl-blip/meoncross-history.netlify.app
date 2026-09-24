/**
 * Master Data Definitions for Weimar and Nazi Germany (1918–1939)
 * Edexcel GCSE (9–1) History Paper 3 (1HI0/31)
 *
 * 16-Page Double-Page Spread Architecture Data:
 * - KT1: The Weimar Republic, 1918–29
 * - KT2: Hitler’s Rise to Power, 1919–33
 * - KT3: Nazi Control and Dictatorship, 1933–39
 * - KT4: Life in Nazi Germany, 1933–39
 */

const fs = require('fs');
const path = require('path');
const ROOT_DIR = path.join(__dirname, '..');

function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'images', 'weimar_individuals', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      if (ext === '.svg') mime = 'image/svg+xml';
      const b64 = fs.readFileSync(cand).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  }
  return relPath;
}

const WEIMAR_FOOTERS = {
  KT1: [
    'Weimar & Nazi Germany Revision Hub • Key Topic 1 • The History Department',
    '"Chronology is critical: Armistice November 1918 before Weimar Constitution August 1919."',
    '"Article 48: The emergency parachute that eventually blew up the plane; know your mechanisms!"',
    '"Proportional Representation: Dozens of splinter parties meant coalitions fell every 8 months."',
    '"Dolchstoss: Frontline soldiers felt stabbed in the back by politicians who signed the Armistice."',
    '"Diktat: Germany was locked out of Versailles negotiations; Clemenceau squeezed the German lemon."',
    '"Hyperinflation 1923: A loaf of bread cost 200 billion marks; wheelbarrows replaced wallets."',
    '"Stresemann was no saint, but he was a financial realist: Rentenmark killed hyperinflation dead."',
    '"Dawes Plan 1924: Wall Street loans gave Germany breathing space, but built a dancing floor on a volcano."',
    '"Locarno & League of Nations: Germany re-entered the diplomatic club as a respectable European partner."',
    '"Golden Twenties: Cabaret and Bauhaus bloomed in Berlin, but rural German conservatives were horrified."',
    '"Weimar Women: Given the vote in 1919, but traditionalists still expected Kinder, Küche, Kirche."',
    '"Utility Formula: Don\'t just describe Source B; interrogate Content, Provenance, and Historical Context!"',
    '"Grade 9 Interpretations: Historians don\'t disagree by accident; their evidence pools and focus differ."',
    '"Timed Condition Challenge: 16 marks means sustained criteria-led judgment from opening to verdict."',
    'Key Topic 1 Mastery Complete • Cumulative Assessment & Digital Quizzing Hub',
  ],
  KT2: [
    'Weimar & Nazi Germany Revision Hub • Key Topic 2 • The History Department',
    '"Anton Drexler founded the DAP; Hitler joined as member 555 and stole the entire show."',
    '"The 25-Point Programme 1920: Scrapped Versailles, denied Jewish citizenship, promised Greater Germany."',
    '"The SA: Brownshirted streetfighters who protected Nazi meetings and beat up rival Communists."',
    '"Munich Putsch Nov 1923: A beer hall farce that Hitler turned into a national propaganda triumph."',
    '"Landsberg Prison: Hitler dictated Mein Kampf to Hess and realised power must be won through the ballot box."',
    '"Lean Years 1924–29: 12 Reichstag seats in 1928; when times were good, radical extremism withered."',
    '"Wall Street Crash Oct 1929: America called in its loans; Germany\'s economic house of cards collapsed."',
    '"Mass Unemployment: 6 million Germans out of work by 1932; desperate voters turned to radical extremes."',
    "\"Brüning's Fatal Mistake: Cutting benefits during a slump earned him the title 'The Hunger Chancellor'.\"",
    "\"Goebbels' Propaganda: Hitler flew across Germany in an aeroplane; posters promised 'Work and Bread'.\"",
    '"July 1932 Election: Nazis won 230 seats and became the largest party in the German Reichstag."',
    '"Backstairs Intrigue: Papen believed he could hire Hitler as Chancellor and \'push him into a corner\'."',
    '"30 January 1933: Hindenburg reluctantly appointed Hitler; the Weimar democracy committed suicide."',
    '"Grade 9 Causation: Combine the economic catalyst (Crash) with political conspiracy (Papen\'s intrigue)!"',
    'Key Topic 2 Mastery Complete • Cumulative Assessment & Digital Quizzing Hub',
  ],
  KT3: [
    'Weimar & Nazi Germany Revision Hub • Key Topic 3 • The History Department',
    '"27 Feb 1933: Reichstag Fire gave Hitler the pretext to crush civil liberties overnight."',
    '"Enabling Act 23 March 1933: Passed by SA intimidation, ending parliamentary democracy in Germany."',
    '"Gleichschaltung: Trade unions smashed in May 1933; all rival political parties outlawed by July."',
    '"Night of the Long Knives: Hitler liquidated Ernst Röhm and the SA to win the German Army\'s loyalty."',
    '"Death of Hindenburg Aug 1934: Hitler merged Chancellor and President into the supreme title of Führer."',
    '"The Army Oath: Every German soldier swore absolute personal obedience to Adolf Hitler himself."',
    '"The SS & Gestapo: Himmler\'s blackshirts and plainclothes terror silenced all public dissent."',
    '"First Concentration Camp: Dachau opened in March 1933 for political prisoners and Communists."',
    '"Total Control of the Law: Judges joined the Nationalist Socialist League; People\'s Court sentenced treason."',
    '"Religion in Chains: Concordat 1933 broken; Niemöller and Bonhoeffer led the Confessional Church resistance."',
    '"Volksempfänger: Cheap radios placed in millions of homes broadcast Goebbels\' speeches non-stop."',
    '"Berlin 1936 Olympics: Nazi showcase tarnished by Jesse Owens winning four sprinting gold medals."',
    '"Degenerate Art: Modern painters mocked in Munich; German culture forced into classical Aryan moulds."',
    '"Opposition Youth: Edelweiss Pirates and Swing Youth proved totalitarian conformity was never 100%."',
    '"Grade 9 Evaluation: Distinguish between vocal resistance, passive grumbling, and genuine conformity."',
    'Key Topic 3 Mastery Complete • Cumulative Assessment & Digital Quizzing Hub',
  ],
  KT4: [
    'Weimar & Nazi Germany Revision Hub • Key Topic 4 • The History Department',
    '"Kinder, Küche, Kirche: Women were pushed out of professions to be domestic child-bearers."',
    '"Law for Encouragement of Marriage: 1,000-mark loan; keep a quarter for every child you give Germany."',
    "\"Mother's Cross: Bronze for four children, silver for six, gold for eight; rewarded on Hitler's mother's birthday.\"",
    '"1937 Reversal: Rearmament factories demanded female labour; ideology bent to military necessity."',
    '"Hitler Youth: Compulsory by 1939; boys trained for the battlefield, girls trained for domesticity."',
    '"Nazifying Education: Race Studies taught Aryan superiority; maths questions calculated bombing runs."',
    '"Autarky & Four-Year Plan: Goering prioritised guns over butter, preparing the economy for total war."',
    '"The RAD & Autobahns: Young men shovelled dirt for 6 months; public works disguised true unemployment."',
    '"The DAF replaced trade unions: Workers lost the right to strike and saw their weekly working hours rise."',
    '"Strength Through Joy (KdF): Cheap theatre tickets and cruises, but the Volkswagen car scheme was a con."',
    '"Racial Hierarchy: Aryan Herrenvolk placed at the top; Jews, Roma, and Slavs classified as Untermenschen."',
    '"April 1933 Boycott: SA stood outside Jewish shops; the first state-sponsored step toward the Holocaust."',
    '"Nuremberg Laws 1935: Stripped German Jews of citizenship and outlawed marriage with Aryans."',
    '"9 November 1938: Kristallnacht destroyed 1,000 synagogues; the transition to violent state terror was complete."',
    '"Grade 9 Evaluation: Interrogate whether living standards genuinely improved or if war prep masked exploitation."',
    'Key Topic 4 Mastery Complete • Cumulative Assessment & Digital Quizzing Hub',
  ],
};

const WEIMAR_KEY_TOPICS_DATA = {
  // KT1: The Weimar Republic, 1918–29
  KT1: {
    keyTopicNum: 1,
    title: 'The Weimar Republic, 1918–29',
    subtitle: 'Origins of the Republic, Early Crises, Economic Recovery & Social Flowering',
    dateRange: '1918–1929',
    heroImage: {
      src: getBase64Image('/images/weimar_kt1_cover.jpg'),
      alt: 'Weimar National Assembly (1919)',
      objectPosition: 'center 30%',
      shelfmark: 'BA 183-R12345 • BUNDESARCHIV • KOBLENZ',
      date: 'February 1919',
      title: 'The Weimar National Assembly Meets at the National Theatre',
      caption:
        'German National Assembly delegates meeting in the provincial town of Weimar to draft Germany’s democratic constitution away from Berlin street violence. Accession Shelfmark BA 183-R12345.',
      sourceTag: 'Historical Primary Source',
      archiveTag: 'Edexcel Paper 3 Master Archive',
      heightMm: 118,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      subtopics: [
        {
          title: '1. Origins of the Republic (1918–19)',
          items: [
            'Abdication of Kaiser Wilhelm II & proclamation of the Republic (9 Nov 1918)',
            'Armistice signed by Ebert & the Council of People’s Representatives (11 Nov 1918)',
            'Weimar Constitution: strengths (Bill of Rights, PR, universal suffrage) & weaknesses (Article 48, coalition instability)',
            'Treaty of Versailles: Article 231 War Guilt, £6.6bn reparations, disarmament, Dolchstoss myth',
          ],
        },
        {
          title: '2. Early Crises & Challenges (1919–23)',
          items: [
            'Left-wing political revolt: Spartacist Uprising (Jan 1919, Luxemburg & Liebknecht)',
            'Right-wing political revolts: Kapp Putsch (March 1920) & Munich Putsch (Nov 1923)',
            'French and Belgian occupation of the Ruhr (Jan 1923) & passive resistance',
            'Economic disaster: Hyperinflation crisis of 1923, social impact, winners & losers',
          ],
        },
        {
          title: '3. Recovery & Social Change (1924–29)',
          items: [
            'Gustav Stresemann & economic stabilisation: Rentenmark (1923), Dawes Plan (1924), Young Plan (1929)',
            'International agreements: Locarno Pact (1925), League of Nations entry (1926), Kellogg-Briand (1928)',
            'Standard of living improvements: housing programmes, unemployment insurance, real wage growth',
            'Cultural flowering: Bauhaus design, expressionist painting (Dix, Grosz), cinema (Metropolis), Weimar women',
          ],
        },
      ],
    },
    milestones: [
      {
        date: '9 NOV 1918',
        title: 'Abdication of Kaiser Wilhelm II & Proclamation of Republic',
        tag: 'Key Topic 1.1',
        text: 'Facing military collapse and naval mutiny at Kiel, Kaiser Wilhelm II abdicates and flees to Holland. Social Democrat leader Friedrich Ebert takes power as Chancellor, establishing Germany’s first parliamentary democracy.',
      },
      {
        date: '28 JUN 1919',
        title: 'Signing of the Treaty of Versailles (The Diktat)',
        tag: 'Key Topic 1.1',
        text: 'Weimar representatives sign the Versailles treaty under threat of immediate Allied invasion. Germany loses 13% of its European territory, its colonies, 100,000-man army limit, £6.6bn reparations, and accepts sole blame under Article 231.',
      },
      {
        date: 'JAN 1923',
        title: 'French Occupation of the Ruhr & Passive Resistance',
        tag: 'Key Topic 1.2',
        text: 'When Germany defaults on timber and coal reparations, 60,000 French and Belgian troops occupy the Ruhr industrial heartland. Ebert calls for passive resistance, printing paper money to pay striking workers.',
      },
      {
        date: 'NOV 1923',
        title: 'Hyperinflation Peak & Introduction of Rentenmark',
        tag: 'Key Topic 1.2',
        text: 'The German mark collapses to 4.2 trillion marks per US dollar; life savings of the middle class are wiped out. Newly appointed Chancellor Gustav Stresemann burns the old currency and introduces the stable, land-backed Rentenmark.',
      },
      {
        date: 'AUG 1924',
        title: 'The Dawes Plan Secures US Wall Street Loans',
        tag: 'Key Topic 1.3',
        text: 'Stresemann agrees to the Dawes Plan: annual reparations payments are reduced and US banks inject 800 million gold marks in foreign loans, kicking off Germany’s economic golden era.',
      },
      {
        date: 'OCT 1925',
        title: 'The Locarno Pact & European Reintegration',
        tag: 'Key Topic 1.3',
        text: 'Germany voluntarily accepts its western borders with France and Belgium. The diplomatic breakthrough secures Germany’s entry into the League of Nations in 1926 and wins Stresemann the Nobel Peace Prize.',
      },
    ],
    enquiries: [
      {
        enquiryNum: 1,
        id: 'lesson_1_1',
        title: 'The Origins of the Weimar Republic, 1918–1919',
        inquiryQuestion: 'Was the Weimar Republic doomed from the moment of its creation in 1919?',
        subTitle:
          'Key Topic 1.1: Abdication, Ebert-Groener Pact, Weimar Constitution, Strengths & Weaknesses',
        specAnchor:
          'Abdication of Kaiser Wilhelm II; Ebert; Council of People’s Representatives; Weimar Constitution: structure, proportional representation, Article 48.',
        doNow: [
          {
            q: 'Who was the German Emperor who abdicated on 9 November 1918?',
            a: 'Kaiser Wilhelm II',
          },
          {
            q: 'Which town hosted the 1919 assembly that drafted Germany’s new constitution?',
            a: 'Weimar',
          },
          {
            q: 'Who became the first President of the Weimar Republic in 1919?',
            a: 'Friedrich Ebert',
          },
          {
            q: 'What electoral system allocated Reichstag seats precisely according to party vote share?',
            a: 'Proportional Representation (PR)',
          },
          {
            q: 'Which constitutional article allowed the President to suspend civil rights and rule by decree?',
            a: 'Article 48',
          },
          {
            q: 'What was the minimum voting age for German men and women in the Weimar Constitution?',
            a: '20 years old',
          },
          { q: 'What was the German parliament building in Berlin called?', a: 'The Reichstag' },
          {
            q: 'Which pact between Ebert and General Groener guaranteed army loyalty against Communists?',
            a: 'Ebert-Groener Pact',
          },
          {
            q: 'What term described governments formed by several parties joining together?',
            a: 'Coalition government',
          },
          {
            q: 'On what date was the First World War armistice signed by German politicians?',
            a: '11 November 1918',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'Proportional Representation',
        vocabTermB: 'Article 48 (Emergency Powers)',
        vocabPrompt:
          'Distinguish between the electoral mechanism that guaranteed fair representation for small parties but caused unstable coalitions (<strong>Proportional Representation</strong>) and the executive constitutional clause allowing the President to bypass parliament (<strong>Article 48</strong>):',
        examType: 'inference_4',
        provenance: '★ High-Yield Forecast (Q1 Inference)',
        sourceA: {
          tag: 'SOURCE A',
          shelfmark: 'BA-K 183-1919-44 • BUNDESARCHIV • BERLIN',
          origin:
            'From a speech by Friedrich Ebert, President of Germany, to the Weimar National Assembly, February 1919.',
          text: '“We have turned our backs forever on autocratic royal rule. The German people are now their own masters. Our new republic will guarantee freedom of speech, freedom of religion, and equality for all men and women. Yet our newborn state is besieged on every front: starvation still grips our cities due to the Allied blockade, and armed extremists seek to tear apart our democratic order.”',
        },
        inferenceQuestion: {
          stem: 'Give two things you can infer from Source A about the establishment of the Weimar Republic.',
          inf1: 'Inference 1: The new Weimar democracy was intended to represent a total break from royal autocracy.',
          det1: 'Detail: Source A states that Germany has “turned our backs forever on autocratic royal rule” and guarantees democratic equality.',
          inf2: 'Inference 2: The Republic was born into extreme economic hardship and dangerous political instability.',
          det2: 'Detail: Source A highlights that “starvation still grips our cities” and “armed extremists seek to tear apart our democratic order.”',
        },
        rightExam: {
          provenance: 'Edexcel June 2021 (Q2 Causation)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks • 18 mins]',
          stem: 'Explain why the Weimar Constitution created serious weaknesses for the new German Republic.',
          stimulus: ['Proportional Representation', 'Article 48'],
          structureStrip: [
            {
              col: '1. CAUSE 1: PROPORTIONAL REPRESENTATION',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that PR allocated seats exactly to votes (1 seat per 60,000 votes); this splintered parliament into dozens of small extremist parties, making stable majority rule impossible and forcing 20 coalition collapses between 1919 and 1933.',
            },
            {
              col: '2. CAUSE 2: ARTICLE 48 & EXECUTIVE DECREES',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that Article 48 gave the President autocratic power to bypass the Reichstag in an "emergency". It was meant as a safeguard, but fatally undermined democracy by encouraging authoritarian rulers (Hindenburg) to sideline parliament.',
            },
            {
              col: '3. CAUSE 3: RETENTION OF TRADITIONAL ELITES',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that the Republic kept the judges, civil servants, and military officers of the old Kaiserreich; these right-wing elites despised democracy, gave lenient sentences to nationalist putschists, and sabotaged the Republic from within.',
            },
          ],
          connectives:
            'The Weimar Constitution contained fatal structural flaws primarily because... • Crucially, the system of Proportional Representation caused... • Consequently, no single party could win a majority, which resulted in... • Furthermore, Article 48 created an open constitutional backdoor for... • Therefore, these built-in weaknesses destabilised the Republic because...',
          wordBank:
            'Proportional Representation • Article 48 • Coalitions • Reichstag • Friedrich Ebert • Splinter parties • Kaiserreich elites • Authoritarian rule',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 1). Sketch Ebert holding the new Weimar Constitution with ballot boxes and the scales of justice.',
        },
      },
      {
        enquiryNum: 2,
        id: 'lesson_1_2',
        title: 'Early Challenges to the Republic, 1919–1923',
        inquiryQuestion:
          'Which posed the greater threat to the Republic: left-wing revolution or right-wing nationalism?',
        subTitle:
          'Key Topic 1.2: Versailles, Diktat, Dolchstoss, Spartacists, Kapp Putsch, Ruhr & Hyperinflation',
        specAnchor:
          'Treaty of Versailles: land, military, reparations, War Guilt; political uprisings (Spartacists, Kapp Putsch); Ruhr occupation; hyperinflation.',
        doNow: [
          {
            q: 'Which left-wing group launched an armed uprising in Berlin in January 1919?',
            a: 'The Spartacists (KPD)',
          },
          {
            q: 'Name the two Spartacist leaders murdered by the Freikorps in 1919.',
            a: 'Rosa Luxemburg and Karl Liebknecht',
          },
          {
            q: 'Who were the Freikorps?',
            a: 'Demobilised right-wing ex-soldiers used by Ebert to crush Communists',
          },
          {
            q: 'Which right-wing nationalist politician led an armed march on Berlin in March 1920?',
            a: 'Wolfgang Kapp',
          },
          {
            q: 'How did Berlin workers defeat the Kapp Putsch within 100 hours?',
            a: 'By staging a general strike',
          },
          {
            q: 'Which two countries invaded and occupied the Ruhr industrial region in January 1923?',
            a: 'France and Belgium',
          },
          {
            q: 'What policy did the Weimar government instruct Ruhr workers to adopt against French troops?',
            a: 'Passive resistance',
          },
          {
            q: 'What economic catastrophe occurred in 1923 when the government printed paper marks?',
            a: 'Hyperinflation',
          },
          {
            q: 'What derogatory phrase did right-wing Germans use for politicians who signed the Treaty?',
            a: 'The November Criminals',
          },
          {
            q: 'Which article of the Versailles Treaty forced Germany to accept sole blame for WW1?',
            a: 'Article 231 (The War Guilt Clause)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'Dolchstosslegende (Stab-in-the-Back)',
        vocabTermB: 'Diktat (Dictated Peace)',
        vocabPrompt:
          'Distinguish between the military conspiracy myth that German front soldiers were betrayed by democratic politicians (<strong>Dolchstoss</strong>) and the bitter German resentment of the unnegotiated Versailles treaty (<strong>Diktat</strong>):',
        examType: 'forensic_check',
        provenance: 'Edexcel November 2021 (Q2 Causation)',
        causationCheck: {
          title: 'Chronological Domino & Causal Chain: The Ruhr Crisis to Hyperinflation (1923)',
          items: [
            '1. Germany defaults on 34th reparations coal shipment to France (Late 1922)',
            '2. 60,000 French and Belgian troops invade the Ruhr to seize factory output by force (Jan 1923)',
            '3. Chancellor Cuno orders passive resistance; factories halt and miners strike (Feb 1923)',
            '4. Government prints billions of paper banknotes to pay striking Ruhr workers’ wages (Spring 1923)',
            '5. Floods of paper money destroy mark value; prices double every few hours (Autumn 1923)',
          ],
          question:
            'Explain how the French occupation of the Ruhr directly triggered the hyperinflation crisis of 1923:',
        },
        rightExam: {
          provenance: 'Edexcel November 2021 (Q2 Causation)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks • 18 mins]',
          stem: 'Explain why the Treaty of Versailles caused intense hostility towards the Weimar Republic between 1919 and 1923.',
          stimulus: ['Article 231 (War Guilt)', 'Military restrictions'],
          structureStrip: [
            {
              col: '1. FACTOR 1: ARTICLE 231 & MORAL INJURY',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that the War Guilt Clause forced Germany to take sole moral responsibility for the war; Germans viewed this as an insulting lie, labelling democratic signers "November Criminals" and delegitimising the new Republic.',
            },
            {
              col: '2. FACTOR 2: MILITARY HUMILIATION & DISARMAMENT',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that limiting the German army to 100,000 volunteers, banning tanks, aircraft, and submarines, and demilitarising the Rhineland left Germany vulnerable to invasion, infuriating patriotic soldiers and the Freikorps.',
            },
            {
              col: '3. FACTOR 3: TERRITORIAL LOSSES & REPARATIONS',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that losing 13% of land (Alsace-Lorraine, Polish Corridor) and paying £6.6bn reparations crippled the economy, prompting the catastrophic Ruhr invasion and hyperinflation crisis of 1923.',
            },
          ],
          connectives:
            'The Treaty of Versailles created lasting hatred toward Weimar because... • In particular, Article 231 inflicted severe psychological trauma as... • Furthermore, drastic military cuts left Germany defenceless, which meant... • In addition, crushing reparations of £6.6bn caused financial collapse... • Consequently, these harsh terms permanently alienated German nationalists because...',
          wordBank:
            'Article 231 • Diktat • November Criminals • Disarmament • 100,000 limit • Polish Corridor • £6.6 billion reparations • Ruhr occupation • Freikorps',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 3). Sketch French bayonets guarding Ruhr coal trains alongside stacks of worthless paper banknotes.',
        },
      },
      {
        enquiryNum: 3,
        id: 'lesson_1_3',
        title: 'The Recovery of the Republic, 1924–1929',
        inquiryQuestion:
          'How far was Stresemann’s economic recovery an illusion built on American debt?',
        subTitle:
          'Key Topic 1.3: Rentenmark, Dawes Plan 1924, Locarno Pact 1925, League of Nations & Young Plan 1929',
        specAnchor:
          'Stresemann’s strategy: Rentenmark, Dawes Plan, Young Plan; foreign diplomacy: Locarno, League of Nations, Kellogg-Briand Pact.',
        doNow: [
          {
            q: 'Who served as German Chancellor in 1923 and Foreign Minister until 1929?',
            a: 'Gustav Stresemann',
          },
          {
            q: 'What new temporary currency was introduced in November 1923 to end hyperinflation?',
            a: 'The Rentenmark',
          },
          {
            q: 'What was the Rentenmark backed by to restore public confidence?',
            a: 'German agricultural land and industrial assets',
          },
          {
            q: 'Which 1924 plan provided 800 million gold marks in US loans to Germany?',
            a: 'The Dawes Plan',
          },
          {
            q: 'Which 1925 treaty saw Germany voluntarily accept its western borders with France?',
            a: 'The Locarno Pact',
          },
          { q: 'In which year was Weimar Germany admitted to the League of Nations?', a: '1926' },
          {
            q: 'What 1928 international agreement renounced war as an instrument of national policy?',
            a: 'The Kellogg-Briand Pact',
          },
          {
            q: 'Which 1929 plan reduced Germany’s total reparations bill from £6.6bn to £2bn?',
            a: 'The Young Plan',
          },
          {
            q: 'Which US economic catastrophe in October 1929 shattered Germany’s golden recovery?',
            a: 'The Wall Street Crash',
          },
          {
            q: 'What famous metaphor did Stresemann use about Germany dancing on a volcano?',
            a: 'Dancing on a volcano of foreign debt',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Dawes Plan (1924)',
        vocabTermB: 'The Young Plan (1929)',
        vocabPrompt:
          'Distinguish between the 1924 agreement that provided initial US loans and scaled payments (<strong>Dawes Plan</strong>) and the 1929 plan that permanently cut total reparations to £2 billion over 59 years (<strong>Young Plan</strong>):',
        examType: 'utility_8',
        provenance: 'Edexcel November 2020 (Q2) / June 2026 Specimen (Q3a)',
        sourcesBC: {
          tag: 'SOURCES B & C DUAL ARCHIVAL PLATE',
          sourceB: {
            title: 'SOURCE B: German Financial Newspaper Excerpt, Berlin, 1927',
            shelfmark: 'BA-K 183-W1927-09 • BUNDESARCHIV • BERLIN',
            text: '“German industrial output has now exceeded pre-war levels. Modern blast furnaces in the Ruhr are operating at maximum capacity, financed by generous American credits. Our export trade flourishes, employment has risen, and the Rentenmark remains the most stable currency in central Europe. Gustav Stresemann has led our battered fatherland out of the abyss.”',
            provenance:
              'From an editorial in a mainstream Berlin financial journal aligned with Stresemann’s German People’s Party (DVP), December 1927.',
          },
          sourceC: {
            title: 'SOURCE C: Speech by Gustav Stresemann to the DVP Party Congress, 1928',
            shelfmark: 'PA-AA R3459 • POLITISCHES ARCHIV • BERLIN',
            text: '“Our economic position is only flourishing on the surface. Germany is dancing on a volcano. If the short-term American credits are recalled by Wall Street, a huge section of our industry will collapse overnight, and our millions of workers will be thrown into the gutter without hope.”',
            provenance:
              'From a private speech by Foreign Minister Gustav Stresemann to senior party delegates, October 1928.',
          },
        },
        rightExam: {
          provenance: 'Edexcel November 2020 (Q2) / June 2026 Specimen (Q3a)',
          type: 'source_utility_8',
          tariff: 'Question 3(a): Source Utility [8 marks • 12 mins]',
          stem: 'How useful are Sources B and C for an enquiry into the economic recovery of the Weimar Republic under Stresemann?',
          stimulus: ['Industrial production', 'Reliance on American loans'],
          structureStrip: [
            {
              col: '1. SOURCE B EVALUATION (CONTENT & ORIGIN)',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Evaluate Source B: Highly useful for showing the visible signs of Weimar recovery (Ruhr factories, stable Rentenmark, rising exports). However, provenance limits it: written by a pro-Stresemann business paper celebrating party success.',
            },
            {
              col: '2. SOURCE C EVALUATION (CONTENT & ORIGIN)',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Evaluate Source C: Extremely valuable insider warning from Stresemann himself, exposing the fragile reality: prosperity relied entirely on short-term US loans that could be recalled at any moment ("dancing on a volcano").',
            },
            {
              col: '3. COMPARATIVE UTILITY VERDICT',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Reach an evaluative judgment: Both sources are remarkably useful together because they show the dual nature of 1924–29: the glowing surface boom (Source B) versus the terrifying structural vulnerability beneath (Source C).',
            },
          ],
          connectives:
            'Source B is useful because it provides authentic contemporary evidence that... • Its value is reinforced by historical facts, such as... • However, Source B is limited in tone and purpose because... • In contrast, Source C is exceptionally valuable as Foreign Minister Stresemann privately admits... • Weighing both sources, they are mutually illuminating because...',
          wordBank:
            'Source Utility • Content • Provenance • Purpose • Rentenmark • Dawes Plan • American loans • Dancing on a volcano • Wall Street fragility',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 5). Sketch Gustav Stresemann signing the Locarno Pact alongside handshake symbols between France and Germany.',
        },
      },
      {
        enquiryNum: 4,
        id: 'lesson_1_4',
        title: 'Changes in German Society, 1924–1929',
        inquiryQuestion:
          'Did the Golden Twenties liberate German citizens or alienate traditional conservatives?',
        subTitle:
          'Key Topic 1.4: Living Standards, Housing, Weimar Women & Cultural Flowering (Bauhaus, Cinema, Art)',
        specAnchor:
          'Social changes: standard of living, unemployment insurance, housing; changing role of women (work, politics, leisure); cultural changes: art, architecture, cinema.',
        doNow: [
          {
            q: 'In which year was the landmark Weimar Unemployment Insurance Act passed?',
            a: '1927',
          },
          {
            q: 'How many new homes were built in German cities between 1924 and 1931?',
            a: 'Over 2 million homes',
          },
          {
            q: 'What percentage of German women were in employment by 1925?',
            a: 'Approximately 36%',
          },
          {
            q: 'What nickname was given to fashionable, financially independent Weimar women?',
            a: 'The "New Woman" (Neue Frau)',
          },
          {
            q: 'Which architectural and design movement was founded by Walter Gropius in Dessau?',
            a: 'The Bauhaus',
          },
          {
            q: 'Name the famous expressionist painter who depicted mutilated war veterans and corrupt Berlin.',
            a: 'Otto Dix (or George Grosz)',
          },
          {
            q: 'Which groundbreaking science-fiction movie was directed by Fritz Lang in 1927?',
            a: 'Metropolis',
          },
          {
            q: 'Which German actress became an international star in the 1930 film *The Blue Angel*?',
            a: 'Marlene Dietrich',
          },
          {
            q: 'Which political group violently condemned Weimar culture as decadent and un-German?',
            a: 'The NSDAP (Nazis) and right-wing nationalists',
          },
          {
            q: 'What traditional phrase summarized the conservative ideal for women’s roles?',
            a: 'Kinder, Küche, Kirche (Children, Kitchen, Church)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The "New Woman" (Neue Frau)',
        vocabTermB: 'The Bauhaus Movement',
        vocabPrompt:
          'Distinguish between the socially emancipated Weimar woman with short hair and economic independence (<strong>Neue Frau</strong>) and the modernist architectural school championing functionality over ornate decoration (<strong>Bauhaus</strong>):',
        examType: 'interpretations_16',
        provenance: 'Edexcel June 2019 (Q3b-d Interpretations)',
        interpretations: {
          tag: 'INTERPRETATIONS 1 & 2 DUAL SCHOLARLY PLATE',
          int1: {
            title: 'INTERPRETATION 1: From a modern history textbook, published 2012',
            text: '“For millions of German women, the 1920s brought genuine liberation. Women enjoyed complete legal equality, voted in greater numbers than men, and entered the Reichstag as elected deputies. Young, unmarried women in cities had jobs, earned their own money, cut their hair short, smoked in public, and enjoyed Berlin’s vibrant night life. Weimar offered women unprecedented personal freedom.”',
          },
          int2: {
            title: 'INTERPRETATION 2: From an academic study of Weimar society, published 2016',
            text: '“The liberated ‘New Woman’ was largely a myth created by newspapers and cinema. Outside Berlin, traditional attitudes remained completely entrenched. Most women were trapped in low-paid, menial jobs and were forced out of work the moment they married. Conservative and religious Germans viewed modern women with disgust, voting in droves for parties that promised to return them to the kitchen.”',
          },
        },
        interpQuestions: {
          q3b: {
            stem: 'Study Interpretations 1 and 2. They give different views about the position of women in Weimar Germany. What is the main difference between these views? [4 marks • 5 mins]',
            guidance:
              'State the difference clearly: Interpretation 1 argues that Weimar women experienced genuine liberation and unprecedented independence, whereas Interpretation 2 argues that this was largely a media myth and that traditional discrimination remained dominant.',
          },
          q3c: {
            stem: 'Suggest one reason why Interpretations 1 and 2 give different views about the position of women in Weimar Germany. [4 marks • 5 mins]',
            guidance:
              'Explain that the historians focused on different groups of women: Interpretation 1 focuses on young, urban, educated women enjoying city nightlife in Berlin, while Interpretation 2 focuses on rural, married, working-class women and conservative hostility.',
          },
        },
        rightExam: {
          provenance: 'Edexcel June 2019 (Q3d Interpretation Evaluation)',
          type: 'essay_16',
          tariff: 'Question 3(d): Evaluative Essay [16 marks + 4 SPaG • 25 mins]',
          stem: 'How far do you agree with Interpretation 2 that the liberation of women in Weimar Germany was largely an illusion? Explain your answer using both interpretations and your own knowledge.',
          stimulus: ['Legal equality and the vote', 'Traditional conservative attitudes'],
          structureStrip: [
            {
              col: '1. SUPPORT FOR INTERPRETATION 2 (TRADITIONAL REALITY)',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Deploy evidence supporting Interp 2: Equal pay was rarely enforced (women paid 33% less); civil service forced married women to resign ("double-earners"); rural Catholic communities despised "un-German" flappers, fuelling Nazi support.',
            },
            {
              col: '2. COUNTER-ARGUMENT / INTERPRETATION 1 (GENUINE PROGRESS)',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Deploy evidence supporting Interp 1: Article 109 guaranteed constitutional equality; over 90% female voter turnout; 112 women elected to the Reichstag; 100,000 female teachers and 3,000 female doctors represented genuine breakthrough.',
            },
            {
              col: '3. SUSTAINED EVALUATIVE JUDGMENT & CRITERIA',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Weigh the evidence: Agree partially with Interpretation 2 because legal emancipation failed to dismantle patriarchal social norms for the majority of working-class and rural women, while recognising that urban women made historic legal strides.',
            },
          ],
          connectives:
            'Interpretation 2 offers a compelling argument that female liberation was exaggerated because... • Specifically, historical evidence proves that married women were... • However, Interpretation 1 correctly identifies revolutionary legal gains, such as... • Furthermore, over 100 women served in the Reichstag, demonstrating that... • In conclusion, I agree with Interpretation 2 to a moderate extent because while the legal framework advanced dramatically, daily economic reality remained conservative for most German women...',
          wordBank:
            'Interpretation • Article 109 • Neue Frau • Dual-earners • Female Reichstag deputies • Berlin nightlife • Traditionalist backlash • Kinder Küche Kirche',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 6). Sketch a Bauhaus geometric chair and a Weimar woman voting in the 1920s elections.',
        },
      },
    ],
    blueprint: {
      title:
        'Archival & Conceptual Blueprint • Structure of the Weimar Constitution & Versailles Losses',
      section1Title:
        '1. Anatomy of the Weimar Constitution (August 1919): Democratic Architecture vs Built-in Flaws',
      items1: [
        {
          head: '👑 The President (Head of State):',
          desc: 'Elected every 7 years by all German adults. Appointed the Chancellor, controlled the armed forces, and could dissolve the Reichstag. Exercised Article 48 emergency powers.',
        },
        {
          head: '🏛️ The Chancellor & Cabinet:',
          desc: 'Appointed by the President. Needed majority support in the Reichstag to pass everyday laws. Led government ministries and formulated state policy.',
        },
        {
          head: '⚖️ The Reichstag (Parliament):',
          desc: 'Elected every 4 years by Proportional Representation. Passed laws, approved national taxation, and debated national issues. Over 20 separate parties sat in parliament.',
        },
        {
          head: '🛡️ The Reichsrat & Fundamental Rights:',
          desc: 'Reichsrat represented 18 German regions (Länder). Bill of Rights guaranteed freedom of speech, freedom of religion, equality of women, and right to form trade unions.',
        },
      ],
      section2Title:
        '2. Territorial, Military & Financial Penalties of the Treaty of Versailles (1919)',
      items2: [
        {
          tag: 'TERRITORIAL LOSSES',
          detail:
            '13% of European territory lost. Alsace-Lorraine returned to France; Polish Corridor given to Poland (cutting off East Prussia); Eupen-Malmedy to Belgium; Danzig made Free City.',
        },
        {
          tag: 'MILITARY DISARMAMENT',
          detail:
            'Army strictly limited to 100,000 long-term volunteers. Conscription banned. Navy capped at 6 battleships, zero submarines. Air force completely banned. Rhineland demilitarised.',
        },
        {
          tag: 'REPARATIONS & WAR GUILT',
          detail:
            'Article 231 (War Guilt Clause) forced Germany to accept sole blame for WW1. Inter-Allied Reparations Commission set total indemnity at £6.6 billion (132 billion gold marks) in 1921.',
        },
      ],
    },
    koConcepts: [
      {
        t: 'Proportional Representation',
        d: 'Electoral system where parties gain seats precisely proportional to votes cast, causing endless unstable coalitions.',
      },
      {
        t: 'Article 48',
        d: 'Emergency constitutional power allowing the President to bypass the Reichstag and rule by decree without democratic consent.',
      },
      {
        t: 'Dolchstoßlegende',
        d: 'The toxic right-wing myth that the German army was undefeated in the field but stabbed in the back by democratic politicians.',
      },
      {
        t: 'Diktat',
        d: 'A dictated peace; German term for Versailles because Germany was locked out of negotiations and forced to sign under threat of invasion.',
      },
      {
        t: 'Hyperinflation',
        d: 'Catastrophic currency collapse in 1923 where paper marks became worthless and prices rose out of control.',
      },
      {
        t: 'Rentenmark',
        d: 'Temporary stable currency introduced by Stresemann in Nov 1923, backed by German land and industrial mortgages.',
      },
      {
        t: 'Dawes Plan (1924)',
        d: 'Agreement scaling annual German reparations and injecting 800 million gold marks in American loans to restart industry.',
      },
      {
        t: 'Bauhaus',
        d: 'Revolutionary modernist design school founded by Walter Gropius, prioritizing clean functionality over ornate decoration.',
      },
    ],
    koDates: [
      '9 Nov 1918: Kaiser Wilhelm II abdicates; Republic declared',
      '11 Nov 1918: Armistice signed in Compiègne forest',
      'Jan 1919: Spartacist Communist Uprising crushed in Berlin',
      '28 Jun 1919: Treaty of Versailles signed by Weimar envoys',
      'Aug 1919: Weimar Constitution officially ratified',
      'Mar 1920: Kapp Putsch defeated by Berlin general strike',
      'Jan 1923: French and Belgian troops occupy the Ruhr',
      'Nov 1923: Hyperinflation peak; Stresemann issues Rentenmark',
      'Aug 1924: Dawes Plan approved; Wall Street loans flow',
      'Oct 1925: Locarno Treaties signed; western borders secured',
    ],
    koFigures: [
      {
        n: 'Friedrich Ebert',
        r: 'SPD leader and first President of the Weimar Republic (1919–25); navigated early revolutionary crises.',
      },
      {
        n: 'Gustav Stresemann',
        r: 'Chancellor (1923) and Foreign Minister (1923–29); ended hyperinflation, secured Dawes Plan and Locarno.',
      },
      {
        n: 'Rosa Luxemburg',
        r: 'Co-founder of the Spartacus League; brilliant Marxist theorist murdered by Freikorps in Jan 1919.',
      },
      {
        n: 'Wolfgang Kapp',
        r: 'Right-wing nationalist civil servant who led the failed military putsch against Berlin in March 1920.',
      },
      {
        n: 'Walter Gropius',
        r: 'Visionary architect who founded the Bauhaus design movement in Weimar and Dessau.',
      },
      {
        n: 'Marlene Dietrich',
        r: 'Iconic German actress who symbolized the glamour and liberated culture of the Golden Twenties.',
      },
    ],
  },

  // KT2: Hitler’s Rise to Power, 1919–33
  KT2: {
    keyTopicNum: 2,
    title: 'Hitler’s Rise to Power, 1919–33',
    subtitle:
      'Early NSDAP, Munich Putsch, Lean Years, Great Depression & Appointment as Chancellor',
    dateRange: '1919–1933',
    heroImage: {
      src: getBase64Image('/images/weimar_kt2_cover.jpg'),
      alt: 'Hitler at Weimar Rally (1926)',
      objectPosition: 'center 20%',
      shelfmark: 'BA 183-1987-0703-506 • BUNDESARCHIV • KOBLENZ',
      date: 'July 1926',
      title: 'Adolf Hitler Addresses the 2nd National Socialist Party Rally in Weimar',
      caption:
        'Hitler reviewing paramilitary SA stormtroopers at the 1926 Weimar Party Congress following the lifting of the party ban. Accession Shelfmark BA 183-1987-0703-506.',
      sourceTag: 'Historical Primary Source',
      archiveTag: 'Edexcel Paper 3 Master Archive',
      heightMm: 118,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      subtopics: [
        {
          title: '1. Early Party & Munich Putsch (1919–23)',
          items: [
            'DAP origins: Anton Drexler, Hitler joins, 25-Point Programme (1920), swastika',
            'Establishment of the SA (Sturmabteilung / Brownshirts) & Ernst Röhm',
            'Munich Putsch (Nov 1923): causes, events at Bürgerbräukeller, Ludendorff, failure',
            'Aftermath: Hitler’s trial, Landsberg Prison, *Mein Kampf*, switch to legal strategy',
          ],
        },
        {
          title: '2. The Lean Years & Reorganisation (1924–29)',
          items: [
            'Party reorganisation: Gauleiter system, SS founded (1925), Hitler Youth established',
            'Bamberg Conference (1926): Hitler defeats Strasser’s socialist wing, establishes Führerprinzip',
            'Electoral failure: 1928 election (only 12 seats, 2.6% of vote) due to Stresemann’s prosperity',
            'Propaganda refinement under Joseph Goebbels: anti-Semitism, anti-Marxism, targeting peasants',
          ],
        },
        {
          title: '3. Economic Crisis to Chancellorship (1929–33)',
          items: [
            'Wall Street Crash (Oct 1929) & the Great Depression: 6 million unemployed by 1932',
            'Political paralysis: Brüning’s austerity, coalition collapse, rule by presidential decree',
            'Growth of support: middle-class fear of Communism (KPD), big business funding, SA violence',
            'Political intrigue: Elections of 1932 (230 seats), fall of Papen & Schleicher, Hitler appointed Chancellor (30 Jan 1933)',
          ],
        },
      ],
    },
    milestones: [
      {
        date: 'FEB 1920',
        title: 'The 25-Point Programme & Foundation of NSDAP',
        tag: 'Key Topic 2.1',
        text: 'Hitler and Anton Drexler publish the 25-Point Programme in Munich. It demands the abolition of Versailles, creation of a Greater Germany, and denial of German citizenship to Jews.',
      },
      {
        date: '8–9 NOV 1923',
        title: 'The Munich Putsch (Beer Hall Putsch) Crushed',
        tag: 'Key Topic 2.1',
        text: 'Hitler and General Ludendorff attempt to seize power in Munich with 2,000 armed SA men. The Bavarian police fire on the marchers at the Odeonsplatz, killing 16 Nazis. Hitler is arrested and tried for high treason.',
      },
      {
        date: 'FEB 1926',
        title: 'The Bamberg Conference Secures the Führerprinzip',
        tag: 'Key Topic 2.2',
        text: 'Hitler summons party leaders to Bamberg. He crushes the northern socialist wing led by Gregor Strasser, securing unchallenged authority as supreme Führer and focusing on rural, anti-communist voters.',
      },
      {
        date: '29 OCT 1929',
        title: 'Wall Street Crash Triggers the Great Depression',
        tag: 'Key Topic 2.3',
        text: 'The US stock market collapses; American banks immediately call in their short-term loans to Germany. German factories close, banks fail, and unemployment surges from 1.3 million to over 6 million.',
      },
      {
        date: 'JUL 1932',
        title: 'NSDAP Becomes Largest Party in the Reichstag',
        tag: 'Key Topic 2.3',
        text: 'Amidst mass poverty and street clashes, the Nazis win 230 seats (37.3% of the vote) in the July 1932 election. Hitler demands the Chancellorship, but President von Hindenburg refuses to appoint the "Bohemian corporal".',
      },
      {
        date: '30 JAN 1933',
        title: 'Hitler Appointed Chancellor via Backstairs Intrigue',
        tag: 'Key Topic 2.4',
        text: 'Convinced by Franz von Papen that Hitler can be controlled in a coalition with only three Nazi ministers, President Hindenburg reluctantly appoints Adolf Hitler as Chancellor of Germany.',
      },
    ],
    enquiries: [
      {
        enquiryNum: 1,
        id: 'lesson_2_1',
        title: 'The Early Development of the Nazi Party, 1919–1922',
        inquiryQuestion:
          'How did a tiny, obscure Munich beer-hall club transform into a national fascist movement?',
        subTitle:
          'Key Topic 2.1: Anton Drexler, DAP, 25-Point Programme, Swastika, Ernst Röhm & The SA',
        specAnchor:
          'DAP origins; Hitler’s role; 25-Point Programme; creation of the SA (paramilitary stormtroopers).',
        doNow: [
          {
            q: 'What political party did Adolf Hitler join in Munich in 1919?',
            a: 'The German Workers’ Party (DAP)',
          },
          { q: 'Who founded the German Workers’ Party in 1919?', a: 'Anton Drexler' },
          {
            q: 'What new name was adopted by the party in 1920?',
            a: 'National Socialist German Workers’ Party (NSDAP)',
          },
          {
            q: 'What party manifesto was published by Hitler and Drexler in February 1920?',
            a: 'The 25-Point Programme',
          },
          {
            q: 'What ancient symbol did Hitler adopt as the official party emblem in 1920?',
            a: 'The Swastika (Hakenkreuz)',
          },
          {
            q: 'What paramilitary organisation was founded in 1921 as the party’s private army?',
            a: 'The SA (Sturmabteilung / Brownshirts)',
          },
          {
            q: 'Who was the violent former army officer appointed to lead the SA?',
            a: 'Ernst Röhm',
          },
          {
            q: 'What newspaper did the NSDAP purchase in 1920 to spread its propaganda?',
            a: 'Völkischer Beobachter (People’s Observer)',
          },
          {
            q: 'What principle established Hitler as having absolute, unquestioned authority over the party?',
            a: 'The Führerprinzip (Leader Principle)',
          },
          {
            q: 'In which German state did the NSDAP originate and base its headquarters?',
            a: 'Bavaria (Munich)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The 25-Point Programme',
        vocabTermB: 'The Sturmabteilung (SA)',
        vocabPrompt:
          'Distinguish between the political manifesto demanding the revocation of Versailles and citizenship based on blood (<strong>25-Point Programme</strong>) and the uniformed paramilitary streetfighters used to violently disrupt opponents (<strong>The SA</strong>):',
        examType: 'inference_4',
        provenance: 'Edexcel June 2024 (Q1 Inference)',
        sourceA: {
          tag: 'SOURCE A',
          shelfmark: 'BA-K 183-1921-88 • BUNDESARCHIV • KOBLENZ',
          origin:
            'From an account by a Munich police spy reporting on a Nazi meeting in the Hofbräuhaus, November 1921.',
          text: '“Adolf Hitler spoke for nearly two hours with fanatical energy. He blamed Germany’s defeat entirely on the Jews, the corrupt Weimar politicians, and the Marxist traitors. Whenever anyone in the audience attempted to heckle or ask a critical question, uniformed young men wearing brown shirts and swastika armbands attacked them violently, beating them with clubs and throwing them onto the pavement. The crowd cheered Hitler with wild enthusiasm.”',
        },
        inferenceQuestion: {
          stem: 'Give two things you can infer from Source A about the early Nazi Party in Munich.',
          inf1: 'Inference 1: The early NSDAP relied heavily on organized physical violence and intimidation to silence opponents.',
          det1: 'Detail: Source A records that uniformed men in brown shirts “attacked them violently, beating them with clubs and throwing them onto the pavement.”',
          inf2: 'Inference 2: Hitler possessed exceptional, charismatic oratorical skill that captivated audiences through scapegoating.',
          det2: 'Detail: Source A observes that Hitler spoke with “fanatical energy” and the crowd “cheered Hitler with wild enthusiasm” as he blamed Jews and Marxists.',
        },
        rightExam: {
          provenance: 'Edexcel June 2020 (Q2 Causation)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks • 18 mins]',
          stem: 'Explain why the Nazi Party grew so rapidly in Bavaria between 1919 and 1922.',
          stimulus: ['Adolf Hitler’s speeches', 'The Sturmabteilung (SA)'],
          structureStrip: [
            {
              col: '1. FACTOR 1: HITLER’S CHARISMA & ORATORY',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that Hitler discovered an extraordinary oratorical talent in Munich beer halls; his rehearsals, theatrical pauses, and passionate rage provided clear scapegoats (November Criminals, Jews, Communists) for humiliated Germans.',
            },
            {
              col: '2. FACTOR 2: THE SA & PARAMILITARY MUSCLE',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that the SA (under Ernst Röhm) recruited violent ex-soldiers and Freikorps men; they provided security, beat up political rivals, and gave an impression of strength, order, and discipline amidst Weimar chaos.',
            },
            {
              col: '3. FACTOR 3: BROAD-BASED 25-POINT PROGRAMME',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that the 25-Point Programme cleverly appealed across classes: nationalists loved tearing up Versailles; small shopkeepers loved banning department stores; workers were promised pensions and profit-sharing.',
            },
          ],
          connectives:
            'The early Nazi Party expanded rapidly in Munich primarily because... • In particular, Hitler’s magnetic oratorical skill allowed him to... • Furthermore, the creation of the SA provided crucial physical dominance by... • In addition, the 25-Point Programme broadened party appeal across social groups because... • Consequently, these factors combined to transform the DAP into a formidable Bavarian movement...',
          wordBank:
            'DAP • Anton Drexler • 25-Point Programme • Oratory • Scapegoating • The SA • Ernst Röhm • Paramilitary • Munich beer halls • Swastika',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 1). Sketch the 25-Point Programme parchment alongside the swastika emblem and an SA brownshirt cap.',
        },
      },
      {
        enquiryNum: 2,
        id: 'lesson_2_2',
        title: 'The Munich Putsch and the Lean Years, 1923–1929',
        inquiryQuestion: 'Did the failed Munich Putsch save or destroy Hitler’s political career?',
        subTitle:
          'Key Topic 2.2: Beer Hall Putsch, Landsberg Prison, Mein Kampf, Bamberg Conference & The Lean Years',
        specAnchor:
          'Munich Putsch (causes, events, reasons for failure); trial and imprisonment; Mein Kampf; reorganisation 1924–29; Bamberg Conference (1926).',
        doNow: [
          { q: 'In which year did Hitler launch the failed Munich Putsch?', a: 'November 1923' },
          {
            q: 'Which beer hall did Hitler and 600 SA men storm on 8 November 1923?',
            a: 'The Bürgerbräukeller',
          },
          {
            q: 'Name the Bavarian state commissioner who betrayed Hitler’s putsch to Berlin.',
            a: 'Gustav von Kahr',
          },
          {
            q: 'Which famous World War One general marched alongside Hitler in Munich?',
            a: 'General Erich Ludendorff',
          },
          {
            q: 'In which Bavarian prison did Hitler serve his sentence in 1924?',
            a: 'Landsberg Prison',
          },
          {
            q: 'What was the title of the autobiography Hitler dictated to Rudolf Hess in prison?',
            a: 'Mein Kampf (My Struggle)',
          },
          {
            q: 'What strategic lesson did Hitler learn from the failure of the Munich Putsch?',
            a: 'He must achieve power legally through elections, not violent revolt',
          },
          {
            q: 'Which 1926 party conference defeated the socialist wing of the Nazi Party?',
            a: 'The Bamberg Conference',
          },
          {
            q: 'What elite blackshirt protection squad was established in 1925?',
            a: 'The SS (Schutzstaffel)',
          },
          {
            q: 'How many Reichstag seats did the Nazis win in the May 1928 election?',
            a: 'Only 12 seats (2.6% of the vote)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Führerprinzip (Leader Principle)',
        vocabTermB: 'Legal Strategy (Legality Oath)',
        vocabPrompt:
          'Distinguish between the ideological dogma that Hitler’s will was absolute law over the party (<strong>Führerprinzip</strong>) and the tactical decision to destroy Weimar democracy using its own constitutional ballot box (<strong>Legal Strategy</strong>):',
        examType: 'forensic_check',
        provenance: 'Edexcel June 2023 (Q2 Causation)',
        causationCheck: {
          title:
            'Chronological Domino & Causal Chain: The Munich Putsch to the Lean Years (1923–1928)',
          items: [
            '1. Hyperinflation and French occupation of the Ruhr create national outrage (Autumn 1923)',
            '2. Hitler storms Bürgerbräukeller; forces Kahr at gunpoint to support march on Berlin (8 Nov 1923)',
            '3. Armed Bavarian police fire on 2,000 SA marchers at Odeonsplatz; 16 Nazis killed (9 Nov 1923)',
            '4. Hitler’s public trial gives him national fame; writes Mein Kampf in Landsberg Prison (1924)',
            '5. Stresemann’s economic recovery causes Nazi vote to collapse to 12 seats in 1928 (1924–1928)',
          ],
          question:
            'Explain why the Munich Putsch collapsed and how Hitler exploited the failure to his advantage:',
        },
        rightExam: {
          provenance: 'Edexcel June 2023 (Q2 Causation)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks • 18 mins]',
          stem: 'Explain why the Nazi Party achieved very little electoral success between 1924 and 1929.',
          stimulus: ['Gustav Stresemann’s economic policies', 'The ban on the Nazi Party'],
          structureStrip: [
            {
              col: '1. FACTOR 1: STRESEMANN’S ECONOMIC RECOVERY',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that the Rentenmark and Dawes Plan restored stability: hyperinflation vanished, US loans built factories and houses, and wages rose; when ordinary Germans had jobs and food, extremist parties lost their appeal.',
            },
            {
              col: '2. FACTOR 2: INTERNATIONAL REINTEGRATION',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that Stresemann’s diplomatic successes (Locarno 1925, League of Nations 1926, Kellogg-Briand 1928) restored German national pride peacefully, disproving Hitler’s claim that Weimar was a helpless puppet of the Allies.',
            },
            {
              col: '3. FACTOR 3: PARTY BAN & INTERNAL DIVISIONS',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that following the Munich Putsch, the NSDAP was banned until 1925, Hitler was barred from public speaking until 1927, and bitter feuds split the northern socialist wing (Strasser) from Munich until the 1926 Bamberg Conference.',
            },
          ],
          connectives:
            'The Nazi Party struggled to make electoral headway between 1924 and 1929 primarily because... • Above all, Stresemann’s economic stabilisation through the Dawes Plan meant that... • Consequently, German voters turned away from radical extremists because... • Furthermore, diplomatic triumphs like the Locarno Pact demonstrated that... • In addition, internal party splits and speaking bans hindered momentum... • Therefore, these prosperous "Golden Years" made Nazi propaganda largely irrelevant...',
          wordBank:
            'Lean Years • Stresemann • Rentenmark • Dawes Plan • Locarno • Bamberg Conference • 12 seats (1928) • Speaking ban • Moderation',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 2). Sketch the Odeonsplatz clash and Hitler dictating Mein Kampf in Landsberg Prison.',
        },
      },
      {
        enquiryNum: 3,
        id: 'lesson_2_3',
        title: 'The Growth of Nazi Support, 1929–1932',
        inquiryQuestion: 'Did Hitler create the crisis or did the Wall Street Crash create Hitler?',
        subTitle:
          'Key Topic 2.3: Wall Street Crash, Mass Unemployment, Brüning’s Failure, Propaganda & Fear of Communism',
        specAnchor:
          'Wall Street Crash and the Great Depression; impact on employment; failure of Weimar coalitions; growth of support for KPD and NSDAP; Goebbels’ propaganda.',
        doNow: [
          {
            q: 'In which month and year did the Wall Street Crash occur in the United States?',
            a: 'October 1929',
          },
          {
            q: 'How many German workers were unemployed by early 1932?',
            a: 'Over 6 million (approx. 1 in 3 workers)',
          },
          {
            q: 'Who became Chancellor in 1930 and was nicknamed "The Hunger Chancellor"?',
            a: 'Heinrich Brüning',
          },
          {
            q: 'What economic policy did Brüning pursue that made the Depression worse?',
            a: 'Austerity (cutting unemployment benefits and raising taxes)',
          },
          {
            q: 'How did Brüning pass his unpopular laws after losing his Reichstag majority?',
            a: 'Using President Hindenburg’s Article 48 emergency decrees',
          },
          {
            q: 'Which left-wing revolutionary party saw its vote surge alongside the Nazis after 1929?',
            a: 'The Communist Party (KPD)',
          },
          {
            q: 'Why did wealthy industrialists and middle-class Germans turn to the Nazis after 1929?',
            a: 'They feared a violent Communist revolution that would seize their property',
          },
          {
            q: 'Who was appointed head of Nazi Party propaganda in 1930?',
            a: 'Dr Joseph Goebbels',
          },
          {
            q: 'What memorable campaign slogan appeared on millions of Nazi election posters?',
            a: '"Work and Bread" (Arbeit und Brot)',
          },
          {
            q: 'How many Reichstag seats did the Nazis win in the July 1932 election?',
            a: '230 seats (the largest party in the Reichstag)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Great Depression',
        vocabTermB: 'Negative Cohesion',
        vocabPrompt:
          'Distinguish between the worldwide economic collapse triggered by the Wall Street Crash (<strong>Great Depression</strong>) and people supporting the Nazis not from love of Hitler, but from shared hatred of Communism and Weimar chaos (<strong>Negative Cohesion</strong>):',
        examType: 'utility_8',
        provenance: 'Edexcel November 2021 (Q3a Utility)',
        sourcesBC: {
          tag: 'SOURCES B & C DUAL ARCHIVAL PLATE',
          sourceB: {
            title: 'SOURCE B: Nazi Election Campaign Poster, Berlin, July 1932',
            shelfmark: 'BA-K Plak 002-019-033 • BUNDESARCHIV • KOBLENZ',
            text: '“Caption: ‘Our Last Hope: Hitler.’ The poster depicts a crowd of exhausted, emaciated German workers and families standing in a soup kitchen queue, staring up with desperate, pleading eyes toward the towering name of Adolf Hitler.”',
            provenance:
              'From an official nationwide NSDAP election campaign poster published by Joseph Goebbels for the July 1932 Reichstag election.',
          },
          sourceC: {
            title: 'SOURCE C: Account by a German Small Businessman, Hamburg, 1931',
            shelfmark: 'FZH 1931-H54 • FORSCHUNGSSTELLE • HAMBURG',
            text: '“Every day more businesses in Hamburg go bankrupt. Red flags march past my shop window singing the Internationale; the Communists openly threaten to seize our private savings and hang shopkeepers when they take power. I do not care for Hitler’s street thugs, but the SA are the only ones standing between my family and a Bolshevik bloodbath. I will vote National Socialist.”',
            provenance:
              'From a private diary entry written by a middle-class hardware store owner in Hamburg, November 1931.',
          },
        },
        rightExam: {
          provenance: 'Edexcel November 2021 (Q3a Utility)',
          type: 'source_utility_8',
          tariff: 'Question 3(a): Source Utility [8 marks • 12 mins]',
          stem: 'How useful are Sources B and C for an enquiry into the reasons for the dramatic increase in support for the Nazi Party between 1929 and 1932?',
          stimulus: ['The impact of unemployment', 'Fear of Communism'],
          structureStrip: [
            {
              col: '1. SOURCE B EVALUATION (CONTENT & ORIGIN)',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Evaluate Source B: Very useful for demonstrating how Goebbels ruthlessly exploited economic misery; presented Hitler as a messianic saviour offering "Work and Bread" to 6 million unemployed. However, it is pure propaganda showing intended appeal, not actual voting motives.',
            },
            {
              col: '2. SOURCE C EVALUATION (CONTENT & ORIGIN)',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Evaluate Source C: Extremely valuable authentic testimony illustrating "negative cohesion": middle-class Germans voted Nazi not because they liked the SA, but out of sheer terror of a Communist revolution seizing their businesses.',
            },
            {
              col: '3. COMPARATIVE UTILITY VERDICT',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Weigh both sources: Highly complementary. Source B reveals the emotional saviour image crafted by Nazi propaganda, while Source C provides the gritty psychological reality of anti-communist fear that pushed voters into Hitler’s camp.',
            },
          ],
          connectives:
            'Source B is valuable because it illustrates the precise propaganda strategy deployed by Goebbels, namely... • This visual evidence confirms historical knowledge that 6 million were unemployed and... • However, Source B is limited because it represents party propaganda rather than... • In contrast, Source C is exceptionally revealing as a private diary demonstrating... • Together, both sources are immensely useful because they show both the positive appeal of Hitler and the negative fear of Communism...',
          wordBank:
            'Source Utility • Content • Provenance • Wall Street Crash • 6 million unemployed • Joseph Goebbels • Negative cohesion • Fear of Communism • KPD',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 4). Sketch Wall Street stock tickers crashing alongside a soup kitchen queue holding "Work and Bread" signs.',
        },
      },
      {
        enquiryNum: 4,
        id: 'lesson_2_4',
        title: 'How Hitler Became Chancellor, 1932–1933',
        inquiryQuestion:
          'Was Hitler’s appointment as Chancellor a democratic triumph or a backstairs conspiracy?',
        subTitle:
          'Key Topic 2.4: July & Nov 1932 Elections, Fall of Brüning, Papen, Schleicher & Hindenburg’s Intrigue',
        specAnchor:
          'Political developments 1932: elections; roles of Hindenburg, Brüning, von Papen, von Schleicher; appointment of Hitler as Chancellor (30 Jan 1933).',
        doNow: [
          {
            q: 'Who was the 84-year-old President of Germany who held the power to appoint the Chancellor?',
            a: 'Field Marshal Paul von Hindenburg',
          },
          {
            q: 'In which July 1932 election did the Nazis become the largest party with 230 seats?',
            a: 'July 1932 Reichstag Election',
          },
          {
            q: 'Did the Nazis win an overall majority (more than 50% of seats) in July 1932?',
            a: 'No (they won 37.3%)',
          },
          {
            q: 'What happened to the Nazi vote in the November 1932 election?',
            a: 'It dropped by 2 million votes (lost 34 seats)',
          },
          {
            q: 'Which aristocratic politician replaced Brüning as Chancellor in June 1932?',
            a: 'Franz von Papen',
          },
          {
            q: 'Which German army general succeeded Papen as Chancellor in December 1932?',
            a: 'Kurt von Schleicher',
          },
          {
            q: 'Why did Papen conspire with Hindenburg to replace Schleicher with Hitler?',
            a: 'Papen wanted revenge on Schleicher and believed he could control Hitler',
          },
          {
            q: 'What famous boast did Papen make about controlling Hitler?',
            a: '“In two months’ time we will have pushed Hitler into a corner until he squeaks!”',
          },
          {
            q: 'How many non-Nazi conservative ministers were placed in Hitler’s cabinet of 11?',
            a: 'Eight (Nazis were given only 3 posts)',
          },
          {
            q: 'On what historic date was Adolf Hitler officially sworn in as Chancellor of Germany?',
            a: '30 January 1933',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'Backstairs Intrigue',
        vocabTermB: 'The "Cabinet in Chains"',
        vocabPrompt:
          'Distinguish between the secretive political scheming between Papen, Schleicher, and Hindenburg to install Hitler (<strong>Backstairs Intrigue</strong>) and Papen’s arrogant miscalculation that a conservative cabinet could control Hitler (<strong>Cabinet in Chains</strong>):',
        examType: 'interpretations_16',
        provenance: 'Edexcel June 2022 (Q3b-d Interpretations)',
        interpretations: {
          tag: 'INTERPRETATIONS 1 & 2 DUAL SCHOLARLY PLATE',
          int1: {
            title: 'INTERPRETATION 1: From a modern biography of Adolf Hitler, published 2014',
            text: '“Hitler became Chancellor because the Nazi Party was the most powerful political force in Germany. Between 1930 and 1932, millions of ordinary Germans voted National Socialist because of mass unemployment, brilliant propaganda, and Hitler’s promise of national rebirth. No government could function without the support of the largest party in the Reichstag; Hitler’s appointment was the inevitable democratic outcome of mass popular support.”',
          },
          int2: {
            title: 'INTERPRETATION 2: From a scholarly study of Weimar’s collapse, published 2018',
            text: '“Hitler did not sweep into power on a wave of popular triumph; he was smuggled into the Chancellery through a sordid backstairs conspiracy. In November 1932, the Nazi vote was falling rapidly and the party was bankrupt. Hitler was saved entirely by Franz von Papen and the camarilla around President Hindenburg, who foolishly believed they could hire the Bohemian corporal as a puppet to destroy democracy while keeping real power for themselves.”',
          },
        },
        interpQuestions: {
          q3b: {
            stem: 'Study Interpretations 1 and 2. They give different views about how Hitler became Chancellor in January 1933. What is the main difference between these views? [4 marks • 5 mins]',
            guidance:
              'State the difference clearly: Interpretation 1 argues that Hitler’s appointment was the democratic, inevitable result of mass popular support and election victories, whereas Interpretation 2 argues that Hitler was rescued from decline and installed by a secretive backstairs conspiracy orchestrated by Papen and Hindenburg’s elites.',
          },
          q3c: {
            stem: 'Suggest one reason why Interpretations 1 and 2 give different views about how Hitler became Chancellor. [4 marks • 5 mins]',
            guidance:
              'Explain that the historians focused on different factors and periods: Interpretation 1 concentrates on the electoral surge of 1930–1932 driven by the Great Depression, whereas Interpretation 2 focuses on the closed-door political machinations of January 1933 after the Nazi vote had peaked and begun to decline.',
          },
        },
        rightExam: {
          provenance: 'Edexcel June 2022 (Q3d Interpretation Evaluation)',
          type: 'essay_16',
          tariff: 'Question 3(d): Evaluative Essay [16 marks + 4 SPaG • 25 mins]',
          stem: 'How far do you agree with Interpretation 2 that Hitler became Chancellor primarily as a result of political intrigue rather than mass popular support? Explain your answer using both interpretations and your own knowledge.',
          stimulus: ['The election results of 1932', 'The role of Franz von Papen'],
          structureStrip: [
            {
              col: '1. SUPPORT FOR INTERPRETATION 2 (POLITICAL INTRIGUE)',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Deploy evidence for Interp 2: In Nov 1932 Nazi seats fell from 230 to 196 and party funds ran dry; Hindenburg despises Hitler but is persuaded by Papen’s scheme to make Hitler Chancellor with Papen as Vice-Chancellor ("in two months we will have pushed him into a corner").',
            },
            {
              col: '2. COUNTER-ARGUMENT / INTERPRETATION 1 (MASS SUPPORT)',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Deploy evidence for Interp 1: Papen could never have negotiated with Hitler if the NSDAP had not won 13.7 million votes in July 1932; mass unemployment (6m) and fear of the KPD created the parliamentary deadlock that destroyed Brüning and Schleicher.',
            },
            {
              col: '3. SUSTAINED EVALUATIVE JUDGMENT & CRITERIA',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Weigh both factors: Popular support provided the indispensable leverage (Hitler was too big to ignore), but political intrigue was the immediate trigger that actually opened the door to the Chancellery on 30 January 1933.',
            },
          ],
          connectives:
            'Interpretation 2 offers a compelling argument that political intrigue was decisive because... • Specifically, historical evidence proves that in November 1932 the Nazi vote was... • However, Interpretation 1 correctly highlights that mass popularity was the foundation, as... • Furthermore, without 230 Reichstag seats, Hitler would never have been considered... • Weighing both interpretations, I conclude that while mass electoral support made Hitler a serious candidate, it was Papen’s reckless intrigue that actually handed him power on 30 January 1933...',
          wordBank:
            'Interpretation • Backstairs intrigue • Franz von Papen • Hindenburg • Kurt von Schleicher • November 1932 decline • 230 seats • Chancellorship',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 6). Sketch President Hindenburg shaking hands with Hitler in morning coat on 30 January 1933.',
        },
      },
    ],
    blueprint: {
      title:
        'Archival & Conceptual Blueprint • The Nazi Rise: Electoral Breakthrough & Political Intrigue',
      section1Title:
        '1. The Electoral Breakthrough: From Fringe Extremism to Largest Party (1928–1932)',
      items1: [
        {
          head: '📊 May 1928 Reichstag Election:',
          desc: '12 seats (2.6% vote). Stresemann’s economic prosperity meant fringe extremism failed to gain traction among working or middle classes.',
        },
        {
          head: '📊 September 1930 Election (Post-Wall Street Crash):',
          desc: '107 seats (18.3% vote). Dramatic breakthrough: mass unemployment (3 million) and coalition collapse propelled Nazis into the second largest party.',
        },
        {
          head: '📊 July 1932 Election (Depression Peak):',
          desc: '230 seats (37.3% vote). The absolute peak of Nazi electoral power: 13.7 million Germans voted NSDAP, making them the undisputed largest party.',
        },
        {
          head: '📊 November 1932 Election (Decline & Crisis):',
          desc: '196 seats (33.1% vote). Nazis lost 2 million votes and 34 seats; party funds exhausted. Proved Hitler had to be installed via political intrigue before support slipped away.',
        },
      ],
      section2Title: '2. The Backstairs Intrigue: The Fatal Conspirators of January 1933',
      items2: [
        {
          tag: 'PAUL VON HINDENBURG',
          detail:
            '84-year-old Junker Field Marshal and President. Despised Hitler as a "vulgar Bohemian corporal", but was exhausted by parliamentary paralysis and persuaded by his inner circle.',
        },
        {
          tag: 'FRANZ VON PAPEN',
          detail:
            'Aristocratic former Chancellor. Conspired against his rival Schleicher; convinced Hindenburg that Hitler could be tamed in a coalition with 8 conservative ministers: "We have framed him in!"',
        },
        {
          tag: 'KURT VON SCHLEICHER',
          detail:
            'Army general and Chancellor (Dec 1932 – Jan 1933). Attempted to split the Nazi party by offering Gregor Strasser the Vice-Chancellorship, alienating both Hitler and Hindenburg.',
        },
      ],
    },
    koConcepts: [
      {
        t: '25-Point Programme',
        d: 'The original 1920 NSDAP manifesto demanding Versailles abolition, Greater Germany, and denial of Jewish citizenship.',
      },
      {
        t: 'The SA (Brownshirts)',
        d: 'Paramilitary stormtroopers led by Ernst Röhm; used violence and intimidation to dominate German streets.',
      },
      {
        t: 'Munich Putsch (1923)',
        d: 'Hitler’s failed armed attempt to overthrow the Bavarian government; resulted in 16 deaths and Hitler’s imprisonment.',
      },
      {
        t: 'Mein Kampf',
        d: 'Hitler’s ideological autobiography written in Landsberg Prison setting out Lebensraum, Aryan supremacy, and anti-Semitism.',
      },
      {
        t: 'Bamberg Conference (1926)',
        d: 'Meeting where Hitler crushed the socialist Strasser wing, establishing the absolute Führerprinzip over the party.',
      },
      {
        t: 'Wall Street Crash (1929)',
        d: 'US stock market collapse that triggered the Great Depression, throwing 6 million Germans into unemployment.',
      },
      {
        t: 'Negative Cohesion',
        d: 'People voting for the Nazis not out of love for Hitler, but from shared hatred of Communism, Weimar chaos, and Versailles.',
      },
      {
        t: 'Backstairs Intrigue',
        d: 'The secretive political scheming between Papen and Hindenburg in Jan 1933 that appointed Hitler Chancellor.',
      },
    ],
    koDates: [
      'Feb 1920: 25-Point Programme published; DAP becomes NSDAP',
      '8–9 Nov 1923: Munich Putsch fails; 16 Nazis killed at Odeonsplatz',
      'Feb 1924: Hitler’s treason trial gives him national platform',
      'Feb 1926: Bamberg Conference establishes Führerprinzip',
      'May 1928: Nazis win only 12 Reichstag seats in "Golden Years"',
      '29 Oct 1929: Wall Street Crash launches Great Depression',
      'Mar 1930: Brüning appointed Chancellor; begins rule by Article 48',
      'Jul 1932: Nazis win 230 seats, becoming largest party',
      'Nov 1932: Nazi vote slips to 196 seats; party near bankruptcy',
      '30 Jan 1933: Hitler appointed Chancellor by President Hindenburg',
    ],
    koFigures: [
      {
        n: 'Adolf Hitler',
        r: 'Leader of the NSDAP; brilliant orator who transformed a Munich fringe group into Germany’s largest party.',
      },
      {
        n: 'Anton Drexler',
        r: 'Munich railway locksmith who founded the German Workers’ Party (DAP) in 1919; sidelined by Hitler.',
      },
      {
        n: 'Ernst Röhm',
        r: 'Brutal ex-soldier who organised and commanded the 400,000-man paramilitary SA (Sturmabteilung).',
      },
      {
        n: 'Paul von Hindenburg',
        r: 'Imperial Field Marshal and President of Germany (1925–34); reluctantly appointed Hitler Chancellor.',
      },
      {
        n: 'Franz von Papen',
        r: 'Aristocratic politician who brokered the Jan 1933 deal with Hitler, falsely boasting he could control him.',
      },
      {
        n: 'Dr Joseph Goebbels',
        r: 'Appointed Nazi propaganda chief in 1930; pioneered modern mass rallies, posters, and radio techniques.',
      },
    ],
  },

  // KT3: Nazi Control and Dictatorship, 1933–39
  KT3: {
    keyTopicNum: 3,
    title: 'Nazi Control and Dictatorship, 1933–39',
    subtitle: 'Creation of Dictatorship, Police State, Church Relations, Propaganda & Opposition',
    dateRange: '1933–1939',
    heroImage: {
      src: getBase64Image('/images/weimar_kt3_cover.jpg'),
      alt: 'Nuremberg Party Rally (1934)',
      objectPosition: 'center 25%',
      shelfmark: 'BA 183-1987-0703-507 • BUNDESARCHIV • KOBLENZ',
      date: 'September 1934',
      title: 'The Nuremberg Party Rally: Mass Assembly of SA and SS at the Zeppelinfield',
      caption:
        'Cathedral of Light illuminated by 152 searchlights at Nuremberg, orchestrating totalitarian conformity under the Ministry of Propaganda. Accession Shelfmark BA 183-1987-0703-507.',
      sourceTag: 'Historical Primary Source',
      archiveTag: 'Edexcel Paper 3 Master Archive',
      heightMm: 118,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      subtopics: [
        {
          title: '1. Creation of Dictatorship (1933–34)',
          items: [
            'Reichstag Fire (27 Feb 1933), Van der Lubbe, Decree for Protection of People and State',
            'Enabling Act (23 March 1933) & end of parliamentary democracy',
            'Gleichschaltung: trade unions banned (May 1933), Law Against Formation of Parties (July 1933)',
            'Night of the Long Knives (30 June 1934), SA purge, death of Hindenburg & Army Oath (Aug 1934)',
          ],
        },
        {
          title: '2. The Police State & The Churches (1933–39)',
          items: [
            'SS (Himmler), SD (Heydrich), Gestapo (secret police) & Dachau concentration camp (1933)',
            'Legal system: National Socialist League of Judges, abolition of jury trials, People’s Court',
            'Catholic Church: 1933 Concordat, persecution of priests, *Mit brennender Sorge* encyclical (1937)',
            'Protestant Church: Reich Church (Ludwig Müller) vs Confessional Church (Martin Niemöller)',
          ],
        },
        {
          title: '3. Propaganda, Culture & Opposition (1933–39)',
          items: [
            'Joseph Goebbels: press censorship, Volksempfänger radios, rallies, cinema, book burning',
            'Culture: Degenerate Art exhibition (1937), monumental architecture, 1936 Berlin Olympics',
            'Conformity and support: economic successes, foreign policy triumphs, terror atmosphere',
            'Opposition & resistance: youth (Edelweiss Pirates, Swing Youth), church (Galen, Bonhoeffer), left-wing',
          ],
        },
      ],
    },
    milestones: [
      {
        date: '27 FEB 1933',
        title: 'The Reichstag Fire & Emergency Powers Decree',
        tag: 'Key Topic 3.1',
        text: 'The Reichstag building in Berlin is destroyed by arson; Dutch Communist Marinus van der Lubbe is arrested. Hitler uses the fire to persuade Hindenburg to sign the Reichstag Fire Decree, suspending freedom of speech, assembly, and press.',
      },
      {
        date: '23 MAR 1933',
        title: 'Passage of the Enabling Act (Dictatorship Established)',
        tag: 'Key Topic 3.1',
        text: 'Surrounded by armed SS and SA stormtroopers chanting intimidation at the Kroll Opera House, the Reichstag votes 444 to 94 to pass the Enabling Act. Hitler gains total legal power to enact laws without parliament or president for four years.',
      },
      {
        date: '30 JUN 1934',
        title: 'The Night of the Long Knives (SA Purge)',
        tag: 'Key Topic 3.1',
        text: 'Fearing the 2-million-strong SA under Ernst Röhm wanted a "second revolution", Hitler unleashes SS execution squads. Over 400 political rivals, including Röhm, Gregor Strasser, and former Chancellor Schleicher, are murdered without trial.',
      },
      {
        date: '2 AUG 1934',
        title: 'Death of Hindenburg & The Armed Forces Oath',
        tag: 'Key Topic 3.1',
        text: 'President Hindenburg dies aged 86. Hitler merges the offices of Chancellor and President, assuming the supreme title of Führer und Reichskanzler. Every officer and soldier in the German armed forces swears an unconditional oath of loyalty to Hitler personally.',
      },
      {
        date: 'JUL 1933',
        title: 'The Reich Concordat with the Vatican',
        tag: 'Key Topic 3.2',
        text: 'Hitler signs an agreement with Pope Pius XI: the Catholic Church promises to stay out of German politics, while the Nazi regime guarantees religious freedom and Catholic schools. Within months, the Nazis begin systematically harassing Catholic youth groups and priests.',
      },
      {
        date: 'AUG 1936',
        title: 'The Berlin Olympic Games Propaganda Showcase',
        tag: 'Key Topic 3.3',
        text: 'Germany hosts the 11th Olympic Games in Berlin, showcasing Nazi modern efficiency to 49 nations. Anti-Semitic signs are temporarily removed, but African-American sprinter Jesse Owens demolishes Aryan racial theories by winning four gold medals.',
      },
    ],
    enquiries: [
      {
        enquiryNum: 1,
        id: 'lesson_3_1',
        title: 'The Creation of a Dictatorship, 1933–1934',
        inquiryQuestion:
          'Did Hitler seize dictatorial power through legal manipulation or ruthless terror?',
        subTitle:
          'Key Topic 3.1: Reichstag Fire, Enabling Act, Gleichschaltung, Night of the Long Knives & Führer Oath',
        specAnchor:
          'Reichstag Fire; Enabling Act; banning of trade unions and political parties; Night of the Long Knives; death of Hindenburg; Hitler becomes Führer.',
        doNow: [
          {
            q: 'What major government building in Berlin was destroyed by fire on 27 February 1933?',
            a: 'The Reichstag',
          },
          {
            q: 'Who was the young Dutch Communist arrested on site and blamed for the fire?',
            a: 'Marinus van der Lubbe',
          },
          {
            q: 'Which constitutional decree suspended habeas corpus and freedom of speech after the fire?',
            a: 'The Reichstag Fire Decree (Decree for the Protection of People and State)',
          },
          {
            q: 'What law passed on 23 March 1933 allowed Hitler to pass laws without the Reichstag?',
            a: 'The Enabling Act',
          },
          {
            q: 'What German term described the total "co-ordination" of society under Nazi control?',
            a: 'Gleichschaltung',
          },
          {
            q: 'What happened to German trade unions on 2 May 1933?',
            a: 'They were abolished and replaced by the German Labour Front (DAF)',
          },
          {
            q: 'What law made the Nazi Party the only legal political party in Germany in July 1933?',
            a: 'Law Against the Formation of Parties',
          },
          {
            q: 'Which bloody purge on 30 June 1934 eliminated Ernst Röhm and the SA leadership?',
            a: 'The Night of the Long Knives',
          },
          {
            q: 'What historic event occurred on 2 August 1934 allowing Hitler to become Führer?',
            a: 'The death of President Paul von Hindenburg',
          },
          {
            q: 'To whom did every German soldier swear a personal oath of unconditional loyalty after August 1934?',
            a: 'Adolf Hitler himself',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Enabling Act (1933)',
        vocabTermB: 'Gleichschaltung (Co-ordination)',
        vocabPrompt:
          'Distinguish between the constitutional statute that gave Hitler dictatorial power to bypass parliament (<strong>Enabling Act</strong>) and the total Nazification of all state institutions, trade unions, and political parties (<strong>Gleichschaltung</strong>):',
        examType: 'inference_4',
        provenance: 'Edexcel November 2021 (Q1 Inference)',
        sourceA: {
          tag: 'SOURCE A',
          shelfmark: 'BA-K 183-1934-LongKnives • BUNDESARCHIV • KOBLENZ',
          origin:
            'From a speech by Adolf Hitler to the German Reichstag explaining the Night of the Long Knives, 13 July 1934.',
          text: '“If anyone reproaches me and asks why I did not resort to the regular courts of justice, then all I can say is this: in this hour I was responsible for the fate of the German nation and therefore I became the supreme judge of the German people! Ernst Röhm and his corrupt clique planned a violent mutiny to plunge Germany into civil war. Every traitor knew that death was his certain fate.”',
        },
        inferenceQuestion: {
          stem: 'Give two things you can infer from Source A about Hitler’s consolidation of power in 1934.',
          inf1: 'Inference 1: Hitler placed himself completely above the law and traditional legal courts.',
          det1: 'Detail: Source A states that Hitler declared he did not use regular courts because “I became the supreme judge of the German people!”',
          inf2: 'Inference 2: Hitler used fabricated or exaggerated threats of mutiny to justify political murders.',
          det2: 'Detail: Source A claims that Röhm’s clique “planned a violent mutiny to plunge Germany into civil war” and that death was their punishment.',
        },
        rightExam: {
          provenance: 'Edexcel June 2022 (Q2 Causation)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks • 18 mins]',
          stem: 'Explain why Adolf Hitler carried out the Night of the Long Knives in June 1934.',
          stimulus: ['Ernst Röhm and the SA', 'The German Army (Reichswehr)'],
          structureStrip: [
            {
              col: '1. FACTOR 1: THREAT OF ERNST RÖHM & THE SA',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that the SA had grown to over 2 million undisciplined men; Röhm demanded a "second socialist revolution" and wanted the SA to absorb the regular army, directly threatening Hitler’s political control and corporate backers.',
            },
            {
              col: '2. FACTOR 2: WINNING THE ARMY’S LOYALTY',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that the traditional Prussian army commanders despised the working-class, street-fighting SA; Hitler desperately needed the professional army for his expansionist rearmament plans, and generals made clear they would only swear allegiance if Röhm was liquidated.',
            },
            {
              col: '3. FACTOR 3: ELIMINATING CONSERVATIVE OPPONENTS',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that Hitler used the purge to assassinate prominent conservative critics who still challenged him, including former Chancellor Kurt von Schleicher and Papen’s speechwriter Edgar Jung, securing absolute personal dominance.',
            },
          ],
          connectives:
            'Hitler launched the Night of the Long Knives primarily because... • In particular, the growing power and radical demands of Ernst Röhm posed... • Consequently, the traditional army generals refused to back Hitler unless... • Furthermore, liquidating the SA allowed Hitler to purge conservative rivals such as... • Therefore, these combined motives enabled Hitler to secure the unswerving loyalty of the armed forces on 2 August 1934...',
          wordBank:
            'Night of the Long Knives • Ernst Röhm • 2 million SA • Regular Army • Reichswehr • Second revolution • SS execution squads • Kurt von Schleicher • Absolute authority',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 3). Sketch SS dagger insignia alongside broken SA brownshirt banners at the Hanselbauer Hotel.',
        },
      },
      {
        enquiryNum: 2,
        id: 'lesson_3_2',
        title: 'The Police State and Religion, 1933–1939',
        inquiryQuestion:
          'Was Nazi terror or religious persecution more effective in crushing domestic opposition?',
        subTitle:
          'Key Topic 3.2: SS, SD, Gestapo, Concentration Camps, People’s Court, Concordat 1933 & Confessional Church',
        specAnchor:
          'Police state: SS, SD, Gestapo, concentration camps; control of legal system; Nazi policies towards the Catholic and Protestant Churches; religious opposition.',
        doNow: [
          {
            q: 'Who was appointed Reichsführer-SS and head of all German police in 1936?',
            a: 'Heinrich Himmler',
          },
          { q: 'What was the secret state police of Nazi Germany called?', a: 'The Gestapo' },
          {
            q: 'Who directed the SD (Sicherheitsdienst), the intelligence service of the SS?',
            a: 'Reinhard Heydrich',
          },
          {
            q: 'Where was the first Nazi concentration camp opened in March 1933?',
            a: 'Dachau (near Munich)',
          },
          {
            q: 'What special Nazi court was created in 1934 to try cases of high treason without juries?',
            a: 'The People’s Court (Volksgerichtshof)',
          },
          {
            q: 'What 1933 treaty between Hitler and Pope Pius XI promised Catholic freedom in exchange for political neutrality?',
            a: 'The Reich Concordat',
          },
          {
            q: 'Which papal encyclical condemned Nazi racial ideology and broken promises in 1937?',
            a: '*Mit brennender Sorge* (With Burning Anxiety)',
          },
          {
            q: 'What official pro-Nazi unified Protestant church was led by Bishop Ludwig Müller?',
            a: 'The Reich Church',
          },
          {
            q: 'Which breakaway Protestant church opposed Nazi interference in religion?',
            a: 'The Confessional Church',
          },
          {
            q: 'Which famous Protestant pastor spent seven years in concentration camps for preaching against Hitler?',
            a: 'Pastor Martin Niemöller',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Gestapo (Geheime Staatspolizei)',
        vocabTermB: 'The Reich Concordat (1933)',
        vocabPrompt:
          'Distinguish between the plainclothes secret state police that operated entirely above the law using informants and torture (<strong>The Gestapo</strong>) and the official diplomatic treaty signed between Nazi Germany and the Vatican (<strong>Reich Concordat</strong>):',
        examType: 'forensic_check',
        provenance: 'Edexcel June 2019 (Q2 Causation)',
        causationCheck: {
          title:
            'Chronological Domino & Causal Chain: The Construction of the Nazi Police State (1933–1936)',
          items: [
            '1. Dachau opens as first concentration camp for Communists and Socialists (Mar 1933)',
            '2. National Socialist League of Maintenance of the Law forces all judges to swear loyalty to Hitler (1933)',
            '3. People’s Court established with Nazi judges; death penalties multiply for political crimes (1934)',
            '4. SS takes over concentration camps and absorbs SD intelligence apparatus under Heydrich (1934–35)',
            '5. Himmler appointed Chief of German Police, unifying SS, Gestapo, and criminal police into one terror machine (1936)',
          ],
          question:
            'Explain how the coordination of the police and legal system eliminated all legal protection for German citizens:',
        },
        rightExam: {
          provenance: 'Edexcel June 2019 (Q2 Causation)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks • 18 mins]',
          stem: 'Explain why the Nazi police state was able to control the German people so effectively between 1933 and 1939.',
          stimulus: ['The Gestapo', 'Concentration camps'],
          structureStrip: [
            {
              col: '1. FACTOR 1: GESTAPO TERROR & INFORMERS',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that the Gestapo had sweeping powers to tap phones, open mail, and arrest suspects without trial (protective custody); though surprisingly small in manpower, widespread citizen denunciation created an all-pervasive atmosphere of paranoia.',
            },
            {
              col: '2. FACTOR 2: CONCENTRATION CAMPS & DETERRENCE',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that camps like Dachau and Buchenwald (run by the SS Totenkopfverbände) were deliberately publicised as terrifying deterrents; political agitators, trade unionists, and religious critics were brutally tortured, breaking the will to resist.',
            },
            {
              col: '3. FACTOR 3: TOTAL CONTROL OF THE JUDICIARY',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that Hitler Nazified the legal system: judges joined the Nazi League, juries were abolished, and the People’s Court handed out thousands of death sentences for "treason", leaving citizens with zero legal defence against state arrest.',
            },
          ],
          connectives:
            'The Nazi police state silenced domestic opposition with ruthless efficiency because... • In particular, the Gestapo created intense psychological fear as citizens believed... • Furthermore, concentration camps served as public, brutal deterrents by... • In addition, the destruction of independent courts meant that victims had... • Consequently, these coordinated mechanisms made organised resistance virtually impossible...',
          wordBank:
            'Police state • Heinrich Himmler • Gestapo • Denunciations • Protective custody • Concentration camps • Dachau • People’s Court • Judges • Terror atmosphere',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 5). Sketch the twin lightning-bolt SS runes alongside the bars of a Dachau cell window.',
        },
      },
      {
        enquiryNum: 3,
        id: 'lesson_3_3',
        title: 'Controlling and Influencing Attitudes, 1933–1939',
        inquiryQuestion:
          'Did Nazi propaganda brainwash the German public or merely reinforce existing prejudices?',
        subTitle:
          'Key Topic 3.3: Joseph Goebbels, Censorship, Radio (Volksempfänger), Nuremberg Rallies, Cinema & 1936 Olympics',
        specAnchor:
          'Goebbels and the Ministry of Propaganda; censorship of press, radio, cinema, theatre, music, art; Berlin Olympics (1936).',
        doNow: [
          {
            q: 'Who was Minister of Public Enlightenment and Propaganda from 1933 to 1945?',
            a: 'Dr Joseph Goebbels',
          },
          {
            q: 'What cheap mass-produced radio was placed in over 70% of German homes by 1939?',
            a: 'The Volksempfänger (People’s Receiver)',
          },
          {
            q: 'Why did the Volksempfänger deliberately have a short reception range?',
            a: 'To prevent Germans from listening to foreign radio stations like the BBC',
          },
          {
            q: 'What public event took place in university towns on 10 May 1933?',
            a: 'Mass book burnings of "un-German" and Jewish literature',
          },
          {
            q: 'In which city were the monumental annual Nazi Party rallies held each September?',
            a: 'Nuremberg',
          },
          {
            q: 'Which female director filmed the famous 1935 propaganda documentary *Triumph of the Will*?',
            a: 'Leni Riefenstahl',
          },
          {
            q: 'What exhibition was staged in Munich in 1937 to mock modern expressionist and abstract art?',
            a: 'The Degenerate Art Exhibition (Entartete Kunst)',
          },
          {
            q: 'What four-word greeting was made compulsory for civil servants, teachers, and public workers?',
            a: '“Heil Hitler” (The German Greeting)',
          },
          {
            q: 'Which African-American track and field athlete humiliated Nazi racial theories at the 1936 Olympics?',
            a: 'Jesse Owens',
          },
          {
            q: 'What happened to daily newspaper editors who refused to print Nazi-approved headlines?',
            a: 'They were fired, blacklisted, or sent to concentration camps',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Volksempfänger (People’s Receiver)',
        vocabTermB: 'Censorship vs Propaganda',
        vocabPrompt:
          'Distinguish between blocking and banning unapproved ideas, books, and foreign broadcasts (<strong>Censorship</strong>) and actively manufacturing positive public belief through posters, rallies, and films (<strong>Propaganda</strong>):',
        examType: 'utility_8',
        provenance: 'Edexcel June 2024 (Q3a Utility)',
        sourcesBC: {
          tag: 'SOURCES B & C DUAL ARCHIVAL PLATE',
          sourceB: {
            title: 'SOURCE B: From a Speech by Dr Joseph Goebbels, Berlin, March 1933',
            shelfmark: 'BA-K 183-1933-Goebbels • BUNDESARCHIV • KOBLENZ',
            text: '“It is not enough for the government to tolerate the people; it is not enough for the people to simply submit. We want to work upon the people until they have surrendered to us completely. The press, radio, films, and schoolbooks must speak with a single voice. The German people must think as one, feel as one, and react as one man.”',
            provenance:
              'From an official address given by Propaganda Minister Joseph Goebbels to senior German radio directors and journalists, March 1933.',
          },
          sourceC: {
            title: 'SOURCE C: From an Account by William Shirer, US Journalist in Berlin, 1936',
            shelfmark: 'LOC-WLS-1936 • LIBRARY OF CONGRESS • WASHINGTON',
            text: '“Every morning the Berlin newspaper editors gather at the Propaganda Ministry to receive exact instructions: what headlines to use, what typeface to print, what news to suppress entirely. Radio speakers blare from street corners, restaurants, and factory floors. The German people hear only what Goebbels wants them to hear, living in an airtight chamber of orchestrated deception.”',
            provenance:
              'From the private diary of William L. Shirer, an independent American foreign correspondent living in Berlin during the 1930s.',
          },
        },
        rightExam: {
          provenance: 'Edexcel June 2024 (Q3a Utility)',
          type: 'source_utility_8',
          tariff: 'Question 3(a): Source Utility [8 marks • 12 mins]',
          stem: 'How useful are Sources B and C for an enquiry into the methods used by the Nazi regime to control information in Germany?',
          stimulus: ['Control of the radio and press', 'The role of Joseph Goebbels'],
          structureStrip: [
            {
              col: '1. SOURCE B EVALUATION (CONTENT & ORIGIN)',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Evaluate Source B: Exceptionally valuable insider statement from the architect of Nazi propaganda himself; proves the radical goal of total psychological coordination ("think as one"). However, it reflects Hitler’s intended ambition rather than everyday public belief.',
            },
            {
              col: '2. SOURCE C EVALUATION (CONTENT & ORIGIN)',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Evaluate Source C: Highly useful objective eyewitness testimony from an independent foreign journalist (Shirer); details the practical daily mechanics of censorship (editor briefings, loudspeaker blare, strict newspaper headlines).',
            },
            {
              col: '3. COMPARATIVE UTILITY VERDICT',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Reach a synthesised verdict: Both sources together provide an outstanding, comprehensive picture: Source B explains the high-level ideological vision, while Source C verifies the ruthless day-to-day practical execution on the ground in Berlin.',
            },
          ],
          connectives:
            'Source B is exceptionally useful because it provides primary evidence of Goebbels’ overarching ideological doctrine, specifically... • This is corroborated by historical facts such as the creation of the Reich Chamber of Culture and... • However, Source B is limited because it states political intention rather than... • In contrast, Source C is immensely valuable as an independent foreign observer reporting... • Together, both sources provide a complete picture of theoretical ambition and practical censorship...',
          wordBank:
            'Source Utility • Content • Provenance • Joseph Goebbels • Ministry of Propaganda • Censorship • Volksempfänger • William Shirer • Orchestrated deception',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 6). Sketch a Volksempfänger radio broadcasting swastika soundwaves alongside Jesse Owens on the Berlin podium.',
        },
      },
      {
        enquiryNum: 4,
        id: 'lesson_3_4',
        title: 'Opposition, Resistance and Conformity, 1933–1939',
        inquiryQuestion:
          'Why was active resistance so rare in Nazi Germany before the outbreak of war?',
        subTitle:
          'Key Topic 3.4: Youth Opposition (Edelweiss Pirates, Swing Youth), Church Opposition (Galen, Niemöller) & Left-Wing Resistance',
        specAnchor:
          'Extent of support for the Nazi regime; opposition from youth (Edelweiss Pirates, Swing Youth); opposition from the churches (Niemöller, Bonhoeffer, Galen); left-wing resistance.',
        doNow: [
          {
            q: 'Which working-class youth group beat up Hitler Youth patrols and wore edelweiss flower badges?',
            a: 'The Edelweiss Pirates',
          },
          {
            q: 'Which middle-class youth opposition movement rebelled by listening to American swing jazz and dancing?',
            a: 'The Swing Youth (Swingjugend)',
          },
          {
            q: 'Name the Catholic Bishop of Münster who bravely led public protests against Nazi euthanasia in 1941.',
            a: 'Bishop Clemens August Graf von Galen',
          },
          {
            q: 'Which anti-Nazi Protestant pastor and theologian was later executed for plotting against Hitler?',
            a: 'Dietrich Bonhoeffer',
          },
          {
            q: 'What left-wing political parties maintained illegal underground resistance networks in Germany?',
            a: 'The SPD (Social Democrats) and KPD (Communists)',
          },
          {
            q: 'What clandestine anti-Nazi newsletter was printed and distributed by Communist resistance cells?',
            a: 'Die Rote Fahne (The Red Flag)',
          },
          {
            q: 'Why was industrial strike action so dangerous for German workers after May 1933?',
            a: 'Strikes were illegal; organizers were immediately sent to concentration camps',
          },
          {
            q: 'Who carried out the lone assassination attempt on Hitler at the Bürgerbräukeller in November 1939?',
            a: 'Georg Elser',
          },
          {
            q: 'Why did millions of ordinary Germans genuinely support Hitler between 1933 and 1939?',
            a: 'Restoration of full employment, rebuilding national pride, and reversing Versailles',
          },
          {
            q: 'What German word describes passive grumbling and quiet dissatisfaction without open revolt?',
            a: 'Meckern',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Edelweiss Pirates',
        vocabTermB: 'Conformity vs Active Resistance',
        vocabPrompt:
          'Distinguish between working-class rebellious youth groups who refused Hitler Youth discipline (<strong>Edelweiss Pirates</strong>) and the vast majority of Germans who publicly conformed out of fear, patriotism, or economic gratitude (<strong>Conformity</strong>):',
        examType: 'interpretations_16',
        provenance: 'Edexcel June 2024 (Q3b-d Interpretations)',
        interpretations: {
          tag: 'INTERPRETATIONS 1 & 2 DUAL SCHOLARLY PLATE',
          int1: {
            title: 'INTERPRETATION 1: From a modern study of Nazi Germany, published 2015',
            text: '“Between 1933 and 1939, open opposition to the Nazi regime was virtually nonexistent. The crushing terror of the Gestapo, the fear of concentration camps, and the omnipresent Nazi informers in every apartment block paralysed the population. More importantly, millions of ordinary Germans were genuinely grateful to Hitler for eliminating unemployment, providing stable wages, and restoring international pride. The regime enjoyed widespread, voluntary popular conformity.”',
          },
          int2: {
            title: 'INTERPRETATION 2: From a history of German resistance, published 2017',
            text: '“Beneath the facade of unanimous swastika salutes, Germany was seething with defiance. Thousands of Edelweiss Pirates fought Hitler Youth patrols in the Rhineland, while Swing Youth openly mocked Nazi militarism with banned American jazz. Protestant pastors read declarations condemning Nazi paganism from hundreds of pulpits, and underground socialist cells distributed millions of anti-fascist flyers. Resistance existed constantly, even under threat of death.”',
          },
        },
        interpQuestions: {
          q3b: {
            stem: 'Study Interpretations 1 and 2. They give different views about the extent of opposition to the Nazi regime between 1933 and 1939. What is the main difference between these views? [4 marks • 5 mins]',
            guidance:
              'State the difference clearly: Interpretation 1 argues that opposition was virtually nonexistent because the German people broadly conformed and supported Hitler due to economic recovery and fear of terror, whereas Interpretation 2 argues that defiant resistance was widespread, persistent, and active across youth, church, and worker groups.',
          },
          q3c: {
            stem: 'Suggest one reason why Interpretations 1 and 2 give different views about opposition to the Nazi regime. [4 marks • 5 mins]',
            guidance:
              'Explain that the historians investigated different types of evidence: Interpretation 1 focuses on broad national consensus, election turnouts, and economic satisfaction, whereas Interpretation 2 focuses on specialized subcultures, Gestapo arrest files, and specific dissident youth groups.',
          },
        },
        rightExam: {
          provenance: 'Edexcel June 2024 (Q3d Interpretation Evaluation)',
          type: 'essay_16',
          tariff: 'Question 3(d): Evaluative Essay [16 marks + 4 SPaG • 25 mins]',
          stem: 'How far do you agree with Interpretation 1 that the German people largely supported and conformed to the Nazi regime between 1933 and 1939? Explain your answer using both interpretations and your own knowledge.',
          stimulus: [
            'Economic recovery and employment',
            'The activities of youth opposition groups',
          ],
          structureStrip: [
            {
              col: '1. SUPPORT FOR INTERPRETATION 1 (MASS CONFORMITY)',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Deploy evidence for Interp 1: Hitler delivered on his core promise of "Work and Bread": unemployment fell from 6m to under 1m; foreign policy successes (Rhineland, Anschluss) were wildly popular; Gestapo terror and lack of alternative parties enforced total conformity.',
            },
            {
              col: '2. COUNTER-ARGUMENT / INTERPRETATION 2 (ACTIVE RESISTANCE)',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Deploy evidence for Interp 2: Thousands refused to conform: 2,000 Edelweiss Pirates beat up Hitler Youth; 800 Protestant pastors were arrested in the Confessional Church struggle; KPD Red Flag networks operated underground; Georg Elser nearly assassinated Hitler in 1939.',
            },
            {
              col: '3. SUSTAINED EVALUATIVE JUDGMENT & CRITERIA',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Weigh both interpretations: Agree broadly with Interpretation 1. While genuine, brave pockets of resistance existed (Interp 2), they remained fragmented, isolated, and politically powerless, meaning mass conformity was the overwhelming reality in pre-war Germany.',
            },
          ],
          connectives:
            'Interpretation 1 provides a very strong case that mass conformity was the dominant reality because... • Specifically, historical evidence confirms that economic revival and full employment made... • However, Interpretation 2 correctly demonstrates that courageous opposition did survive in... • For example, the Edelweiss Pirates openly rejected Nazi regimentation by... • In conclusion, I agree with Interpretation 1 to a very large extent because while defiance occurred, it never posed a unified political threat to Hitler’s control before 1939...',
          wordBank:
            'Interpretation • Conformity • Gestapo terror • Full employment • Edelweiss Pirates • Swing Youth • Martin Niemöller • Confessional Church • Fragmentation • Georg Elser',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 4). Sketch an Edelweiss flower pin badge alongside Pastor Niemöller behind concentration camp barbed wire.',
        },
      },
    ],
    blueprint: {
      title:
        'Archival & Conceptual Blueprint • The Totalitarian Police State & Propaganda Architecture',
      section1Title: '1. The Nazi Terror Apparatus: The Three Pillars of Police Control',
      items1: [
        {
          head: '🛡️ The SS (Schutzstaffel) — Led by Heinrich Himmler:',
          desc: 'Originally Hitler’s 200-man bodyguard; grew into a 250,000-man racial elite army. Controlled all German police, intelligence (SD), and the Concentration Camp system (Death’s Head Units / Totenkopfverbände).',
        },
        {
          head: '🕵️ The Gestapo (Secret State Police):',
          desc: 'Plainclothes detectives with absolute power to arrest suspects without trial, tap telephones, and interrogate using torture. Depended on a vast network of civilian denunciations and block wardens.',
        },
        {
          head: '⚖️ The Coordinated Legal System (The People’s Court):',
          desc: 'All judges forced to join the Nazi League. Juries abolished; judge Roland Freisler handed out thousands of death sentences for "treasonable grumbling" or anti-Nazi jokes.',
        },
      ],
      section2Title: '2. The Ministry of Propaganda: Complete Media Domination (Joseph Goebbels)',
      items2: [
        {
          tag: 'RADIO (VOLKSEMPFÄNGER)',
          detail:
            '70% of homes owned a subsidized People’s Receiver by 1939. Radios were deliberately engineered to block British BBC broadcasts, broadcasting Goebbels’ speeches directly into living rooms.',
        },
        {
          tag: 'MONUMENTAL RALLIES',
          detail:
            'Annual Nuremberg Rallies gathered 500,000 marching stormtroopers under the "Cathedral of Light" searchlights, hypnotising crowds with theatrical grandeur and military power.',
        },
        {
          tag: 'CENSORSHIP & ART',
          detail:
            'Daily briefings told journalists what headlines to print. Over 20,000 Jewish and socialist books burned in May 1933; Degenerate Art (modernism) banned in favour of heroic Aryan realism.',
        },
      ],
    },
    koConcepts: [
      {
        t: 'Reichstag Fire Decree',
        d: 'Emergency decree of 28 Feb 1933 suspending civil liberties, personal freedom, and freedom of speech across Germany.',
      },
      {
        t: 'The Enabling Act (1933)',
        d: 'Law passed on 23 March 1933 granting Hitler dictatorial power to pass laws without the Reichstag or President.',
      },
      {
        t: 'Gleichschaltung',
        d: 'The total coordination and Nazification of all German institutions, trade unions, and political parties under state control.',
      },
      {
        t: 'Night of the Long Knives',
        d: 'Bloody purge on 30 June 1934 where the SS murdered Ernst Röhm and over 400 SA rivals, winning army loyalty.',
      },
      {
        t: 'The SS (Schutzstaffel)',
        d: 'Heinrich Himmler’s elite blackshirt organisation that controlled all police, intelligence, and concentration camps.',
      },
      {
        t: 'The Gestapo',
        d: 'The secret state police operating without judicial oversight, using denunciations and torture to crush political dissent.',
      },
      {
        t: 'The Reich Concordat (1933)',
        d: 'Treaty with Pope Pius XI guaranteeing Catholic Church rights in exchange for priests staying out of German politics.',
      },
      {
        t: 'Volksempfänger',
        d: 'Cheap mass-produced "People’s Receiver" radio designed to flood millions of German households with Nazi propaganda.',
      },
    ],
    koDates: [
      '27 Feb 1933: Reichstag Fire blamed on Communist Van der Lubbe',
      '28 Feb 1933: Decree for Protection of People & State suspends rights',
      '23 Mar 1933: Enabling Act passed, ending Weimar democracy',
      '2 May 1933: Trade unions abolished; replaced by Nazi DAF',
      '14 Jul 1933: Law Against Formation of Parties outlaws all rivals',
      '30 Jun 1934: Night of the Long Knives eliminates Röhm and SA leaders',
      '2 Aug 1934: Hindenburg dies; Hitler combines offices as Führer',
      'Aug 1934: German Armed Forces swear personal oath of loyalty to Hitler',
      'Aug 1936: Berlin Olympic Games showcase Nazi regime to the world',
      '1937: Pope Pius XI issues Mit brennender Sorge encyclical condemning Nazis',
    ],
    koFigures: [
      {
        n: 'Adolf Hitler',
        r: 'Dictator and Führer of Germany; combined Chancellor and President roles to establish absolute totalitarian rule.',
      },
      {
        n: 'Heinrich Himmler',
        r: 'Reichsführer-SS; built the SS, Gestapo, and concentration camp system into an all-powerful terror state.',
      },
      {
        n: 'Reinhard Heydrich',
        r: 'Ruthless head of the SD and Gestapo; organized political surveillance and later the "Final Solution".',
      },
      {
        n: 'Dr Joseph Goebbels',
        r: 'Propaganda Minister; totally controlled German press, radio, cinema, and cultural life to enforce conformity.',
      },
      {
        n: 'Pastor Martin Niemöller',
        r: 'First World War submarine hero and pastor who founded the anti-Nazi Confessional Church; sent to Dachau.',
      },
      {
        n: 'Bishop von Galen',
        r: 'Catholic Bishop of Münster who bravely preached against Gestapo terror and forced euthanasia in public sermons.',
      },
    ],
  },

  // KT4: Life in Nazi Germany, 1933–39
  KT4: {
    keyTopicNum: 4,
    title: 'Life in Nazi Germany, 1933–39',
    subtitle: 'Nazi Policies Towards Women, Youth, Standard of Living & Persecution of Minorities',
    dateRange: '1933–1939',
    heroImage: {
      src: getBase64Image('/images/weimar_kt4_cover.jpg'),
      alt: 'Hitler Youth Rally (1938)',
      objectPosition: 'center 20%',
      shelfmark: 'BA 183-1987-0703-508 • BUNDESARCHIV • KOBLENZ',
      date: 'September 1938',
      title: 'Hitler Youth Review at the Nuremberg Party Congress',
      caption:
        'Over 50,000 members of the Hitlerjugend parade before Hitler, reflecting the total militarisation of German children. Accession Shelfmark BA 183-1987-0703-508.',
      sourceTag: 'Historical Primary Source',
      archiveTag: 'Edexcel Paper 3 Master Archive',
      heightMm: 118,
    },
    specBox: {
      title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
      subtopics: [
        {
          title: '1. Women & Family (1933–39)',
          items: [
            'Nazi views on women: Kinder, Küche, Kirche, domesticity, opposition to Weimar "New Woman"',
            'Marriage & family laws: Law for Encouragement of Marriage (1933, 1,000 mark loans), Mother’s Cross',
            'Lebensborn programme, birth control clinics closed, abortion made illegal',
            'Employment restrictions: exclusion of female civil servants, doctors, lawyers; 1937 labour shortage reversal',
          ],
        },
        {
          title: '2. Youth & Education (1933–39)',
          items: [
            'Hitler Youth (Hitlerjugend): aims, militaristic training, compulsory membership from March 1939',
            'League of German Girls (BDM): domestic training, physical fitness, racial purity',
            'Education: Nazified curriculum, Race Studies, PE emphasis, rewriting of history textbooks',
            'Elite training schools: National Political Educational Institutes (Napolas) & Adolf Hitler Schools',
          ],
        },
        {
          title: '3. Economy & Persecution (1933–39)',
          items: [
            'Reducing unemployment: National Labour Service (RAD), Autobahns, conscription & rearmament',
            'Living standards: DAF (German Labour Front), KdF (Strength Through Joy), Beauty of Labour, Volkswagen scheme',
            'Racial beliefs: Aryan master race (Herrenvolk), anti-Semitism, persecution of Slavs, Roma, disabled',
            'Anti-Jewish measures: 1933 shop boycott, 1935 Nuremberg Laws, 1938 Kristallnacht, economic exclusion',
          ],
        },
      ],
    },
    milestones: [
      {
        date: 'JUN 1933',
        title: 'Law for the Encouragement of Marriage',
        tag: 'Key Topic 4.1',
        text: 'The Nazi state offers marriage loans of up to 1,000 marks to newlywed Aryan couples, provided the bride gives up her job. For each child born, 25% of the loan is permanently cancelled, boosting the national birth rate.',
      },
      {
        date: '15 SEP 1935',
        title: 'Enactment of the Nuremberg Racial Laws',
        tag: 'Key Topic 4.4',
        text: 'Announced at the Nuremberg Rally, the Reich Citizenship Law strips German Jews of citizenship and voting rights. The Law for the Protection of German Blood and Honour makes marriage and sexual relations between Jews and Aryans illegal.',
      },
      {
        date: 'MAR 1935',
        title: 'Introduction of Military Conscription & Rearmament',
        tag: 'Key Topic 4.3',
        text: 'Hitler openly renounces the Versailles disarmament clauses, announcing a peacetime army of 550,000 men and the creation of the Luftwaffe. Massive military rearmament absorbs hundreds of thousands of unemployed German workers.',
      },
      {
        date: 'DEC 1936',
        title: 'First Hitler Youth Law Passed',
        tag: 'Key Topic 4.2',
        text: 'All non-Nazi youth organisations (Catholic and sporting clubs) are banned or absorbed. Membership of the Hitlerjugend becomes effectively expected for all children aged 10–18, and is made strictly compulsory in March 1939.',
      },
      {
        date: '9–10 NOV 1938',
        title: 'Kristallnacht (The Night of Broken Glass)',
        tag: 'Key Topic 4.4',
        text: 'Following the assassination of diplomat Ernst vom Rath in Paris, Goebbels unleashes nationwide anti-Jewish pogroms. SA and SS mobs burn over 1,000 synagogues, destroy 7,500 Jewish businesses, murder 91 Jews, and send 30,000 Jewish men to concentration camps.',
      },
      {
        date: '1 SEP 1939',
        title: 'Invasion of Poland & Outbreak of War',
        tag: 'Key Topic 4.3',
        text: 'Germany invades Poland, triggering World War Two in Europe. The four-year drive for economic autarky (self-sufficiency) shifts into total war mobilization, and persecution of minorities escalates toward mass deportation and murder.',
      },
    ],
    enquiries: [
      {
        enquiryNum: 1,
        id: 'lesson_4_1',
        title: 'Nazi Policies Towards Women, 1933–1939',
        inquiryQuestion:
          'Were German women elevated as revered mothers or reduced to domestic servants?',
        subTitle:
          'Key Topic 4.1: Kinder, Küche, Kirche, Marriage Loans, Mother’s Cross, Lebensborn & 1937 Reversal',
        specAnchor:
          'Nazi views on women and the family; marriage policies; Mother’s Cross; employment restrictions and the 1937 rearmament labour reversal.',
        doNow: [
          {
            q: 'What German three-word slogan summarized the Nazi ideal for women?',
            a: 'Kinder, Küche, Kirche (Children, Kitchen, Church)',
          },
          {
            q: 'What financial incentive of 1,000 marks was given to newly married Aryan couples from 1933?',
            a: 'A marriage loan',
          },
          {
            q: 'How much of the marriage loan was cancelled for each child the couple had?',
            a: '25% (one quarter per child)',
          },
          {
            q: 'What medal was awarded on Hitler’s mother’s birthday to women with large families?',
            a: 'The Honour Cross of the German Mother (Mutterkreuz)',
          },
          {
            q: 'How many children did a mother need to receive the Gold Mother’s Cross?',
            a: 'Eight or more children',
          },
          {
            q: 'What programme was established in 1935 by Himmler to breed pure Aryan babies with SS officers?',
            a: 'The Lebensborn programme',
          },
          {
            q: 'What happened to female doctors, lawyers, and civil servants in 1933?',
            a: 'They were sacked and banned from practicing their professions',
          },
          {
            q: 'Who was appointed Reich Women’s Leader (Reichsfrauenführerin)?',
            a: 'Gertrud Scholtz-Klink',
          },
          {
            q: 'Why did the Nazi government reverse its policy and urge women to work after 1937?',
            a: 'Severe labour shortages caused by the rapid expansion of rearmament factories',
          },
          {
            q: 'What cosmetic practices and clothing were strongly discouraged for German women?',
            a: 'Wearing makeup, smoking in public, dieting, and wearing high heels or trousers',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Mother’s Cross (Mutterkreuz)',
        vocabTermB: 'Kinder, Küche, Kirche',
        vocabPrompt:
          'Distinguish between the state medal awarded to honour prolific Aryan child-bearers (<strong>Mother’s Cross</strong>) and the patriarchal Nazi doctrine that confined female identity to domesticity (<strong>Kinder, Küche, Kirche</strong>):',
        examType: 'inference_4',
        provenance: 'Edexcel June 2019 (Q1/Q3a Inference)',
        sourceA: {
          tag: 'SOURCE A',
          shelfmark: 'BA-K 183-1934-Women • BUNDESARCHIV • KOBLENZ',
          origin:
            'From a speech by Adolf Hitler to the National Socialist Women’s League at Nuremberg, September 1934.',
          text: '“Every child that a woman brings into the world is a battle she fights for the existence of her people. While man makes his supreme sacrifice on the field of battle, woman fights her battle in the home. Her world is her husband, her family, her children, and her house. We do not consider it correct for women to interfere in the world of men, in his governing and his politics. Her highest honour is to be a mother.”',
        },
        inferenceQuestion: {
          stem: 'Give two things you can infer from Source A about Nazi attitudes towards women.',
          inf1: 'Inference 1: The Nazis viewed childbearing as an essential military duty equivalent to a soldier fighting on the battlefield.',
          det1: 'Detail: Source A states that “Every child that a woman brings into the world is a battle she fights for the existence of her people.”',
          inf2: 'Inference 2: Women were strictly excluded from politics and confined entirely to the domestic sphere.',
          det2: 'Detail: Source A insists that “Her world is her husband, her family, her children, and her house” and it is not correct for women to interfere in governing.',
        },
        rightExam: {
          provenance: 'Edexcel June 2018 (Q2 Causation)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks • 18 mins]',
          stem: 'Explain why Nazi policies towards women changed between 1933 and 1939.',
          stimulus: ['The birth rate', 'The rearmament programme'],
          structureStrip: [
            {
              col: '1. FACTOR 1: OBSESSION WITH BIRTH RATES (1933–36)',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that Germany’s birth rate had plunged in the 1920s; Hitler needed millions of future soldiers and mothers for Lebensraum, so policies focused on marriage loans, Mother’s Crosses, and sacking female professionals to force them home.',
            },
            {
              col: '2. FACTOR 2: INDUSTRIAL SHORTAGES & REARMAMENT (1937–39)',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that the 1936 Four-Year Plan and military conscription drained men from factories; severe labour shortages in munitions and agriculture forced the regime to abandon ideology and introduce compulsory "Duty Year" labour for young women.',
            },
            {
              col: '3. FACTOR 3: IDEOLOGICAL COMPROMISE VS TOTAL WAR',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that Nazi ideology was forced to bend to economic reality: by 1939, over 14 million women were in employment (more than in the Weimar Republic), showing how preparation for European conquest overrode domestic anti-feminism.',
            },
          ],
          connectives:
            'Nazi policy towards women underwent a fundamental shift between 1933 and 1939 because... • Initially, ideological fanaticism demanded that women remain at home to... • Consequently, generous marriage loans and medals like the Mother’s Cross were used to... • However, the rapid expansion of rearmament and the 1936 Four-Year Plan created... • Therefore, the regime was forced to compromise its ideology by ordering women back into factories...',
          wordBank:
            'Kinder Küche Kirche • Marriage loans • Mother’s Cross • Gertrud Scholtz-Klink • Four-Year Plan • Rearmament • Labour shortage • Munitions factories • Duty Year',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 1). Sketch a bronze Mother’s Cross medal alongside factory blueprints calling women back to industrial work.',
        },
      },
      {
        enquiryNum: 2,
        id: 'lesson_4_2',
        title: 'Nazi Policies Towards the Young, 1933–1939',
        inquiryQuestion:
          'Did the Hitler Youth succeed in creating fanatical, obedient Nazi warriors?',
        subTitle:
          'Key Topic 4.2: Hitlerjugend, BDM, School Curriculum, Race Studies, PE & Napolas Elite Schools',
        specAnchor:
          'Aims and methods of the Hitler Youth and BDM; control of education (teachers, curriculum changes in history, biology, PE); Napolas schools.',
        doNow: [
          {
            q: 'In which year was membership of the Hitler Youth made strictly compulsory for all boys aged 10–18?',
            a: '1939',
          },
          {
            q: 'Who was appointed Reich Youth Leader (Reichsjugendführer) in 1933?',
            a: 'Baldur von Schirach',
          },
          {
            q: 'What was the female wing of the Nazi youth movement called?',
            a: 'The League of German Girls (BDM / Bund Deutscher Mädel)',
          },
          {
            q: 'What percentage of school curriculum time was dedicated to physical education (PE)?',
            a: 'At least 15% (two hours every day)',
          },
          {
            q: 'What new subject was introduced into schools to teach Aryan superiority and anti-Semitism?',
            a: 'Race Studies (Rassenkunde)',
          },
          {
            q: 'What organisation were all German schoolteachers forced to join from 1933?',
            a: 'The National Socialist Teachers’ League (NSLB)',
          },
          {
            q: 'What were the elite boarding schools designed to train future military and political leaders called?',
            a: 'Napolas (National Political Educational Institutes)',
          },
          {
            q: 'What outdoor activities dominated Hitler Youth meetings for boys?',
            a: 'Military drills, map-reading, grenade-throwing, camping, and boxing',
          },
          {
            q: 'What happened to Jewish children in German state schools in 1938?',
            a: 'They were completely banned from attending state schools',
          },
          {
            q: 'How many young Germans were members of the Hitler Youth by early 1939?',
            a: 'Over 7 million (over 80% of eligible youth)',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Hitlerjugend (Hitler Youth)',
        vocabTermB: 'Totalitarian Indoctrination',
        vocabPrompt:
          'Distinguish between the uniformed youth movement designed to prepare boys for military service (<strong>Hitler Youth</strong>) and the systematic reshaping of education and leisure to ensure uncritical devotion to Hitler (<strong>Indoctrination</strong>):',
        examType: 'forensic_check',
        provenance: 'Edexcel June 2022 (Q1) / June 2025 (Q2b Causation)',
        causationCheck: {
          title:
            'Chronological Domino & Causal Chain: The Nazification of German Youth (1933–1939)',
          items: [
            '1. Teachers forced to join National Socialist Teachers’ League; unapproved textbooks burned (1933)',
            '2. Curriculum rewritten: Race Studies introduced, history teaches Versailles humiliation, PE doubled (1934)',
            '3. Rival youth clubs (Catholic Church, sports teams) banned or forcibly merged into Hitler Youth (1936)',
            '4. First Hitler Youth Law makes membership expected; peer pressure isolates non-members (1936)',
            '5. Second Youth Law makes Hitler Youth membership legally compulsory under police penalty (Mar 1939)',
          ],
          question:
            'Explain why the Nazis prioritised total control over school curriculum and youth movements:',
        },
        rightExam: {
          provenance: 'Edexcel June 2022 (Q1) / June 2025 (Q2b Causation)',
          type: 'explain_why_12',
          tariff: 'Question 2: Explain Why [12 marks • 18 mins]',
          stem: 'Explain why the Nazi regime placed so much importance on controlling young people between 1933 and 1939.',
          stimulus: ['The Hitler Youth (Hitlerjugend)', 'Changes to the school curriculum'],
          structureStrip: [
            {
              col: '1. FACTOR 1: MILITARY PREPARATION & LEBENSRAUM',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Explain that Hitler’s long-term goal was war and Eastern conquest (Lebensraum); boys had to be physically hardened through boxing, map-reading, and rifle practice in the Hitler Youth so they would become fearless soldiers for the Wehrmacht.',
            },
            {
              col: '2. FACTOR 2: LIFELONG RACIAL INDOCTRINATION',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Explain that children were impressionable; rewriting textbooks, daily "Heil Hitler" salutes, and Race Studies embedded anti-Semitism into children’s minds so deeply that they would obey future persecution orders without question.',
            },
            {
              col: '3. FACTOR 3: BREAKING FAMILY & CHURCH INFLUENCE',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Explain that the Nazis wanted to replace the traditional influence of parents and churches; children were encouraged to spy on their parents and report anti-Nazi grumbling to the Gestapo, ensuring total state loyalty.',
            },
          ],
          connectives:
            'The Nazi regime placed immense value on controlling young people primarily because... • In particular, the Hitler Youth was deliberately designed to produce fearless soldiers for... • Furthermore, capturing children’s minds through school textbooks ensured that... • In addition, controlling leisure allowed the state to destroy the influence of parents and churches by... • Consequently, indoctrination created a fanatic generation willing to sacrifice their lives for the Führer...',
          wordBank:
            'Indoctrination • Hitlerjugend • BDM • Baldur von Schirach • Race Studies • PE • Wehrmacht • Lebensraum • Denunciations • Totalitarian control',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 4). Sketch Hitler Youth marching drums alongside a biology textbook open to a cranial measurement calipers diagram.',
        },
      },
      {
        enquiryNum: 3,
        id: 'lesson_4_3',
        title: 'Employment and Living Standards, 1933–1939',
        inquiryQuestion:
          'Did the Nazi economic miracle genuinely enrich German workers or exploit them for war?',
        subTitle:
          'Key Topic 4.3: RAD Labour Service, Autobahn Public Works, Rearmament, DAF, KdF & Living Standards',
        specAnchor:
          'Nazi policies to reduce unemployment: RAD, public works, rearmament, invisible unemployment; standard of living: DAF, KdF, Beauty of Labour, wages, hours.',
        doNow: [
          {
            q: 'How many German workers were unemployed when Hitler took power in January 1933?',
            a: '6 million',
          },
          {
            q: 'What organisation forced all young men aged 18–25 to complete 6 months of manual labour?',
            a: 'The National Labour Service (RAD)',
          },
          {
            q: 'What famous 7,000km motorway construction scheme was promoted by Hitler to create jobs?',
            a: 'The Autobahn',
          },
          {
            q: 'What phrase describes unemployed Jews, women, and concentration camp inmates omitted from official jobless figures?',
            a: '"Invisible unemployment"',
          },
          {
            q: 'What Nazi trade union organisation replaced all independent workers’ unions in May 1933?',
            a: 'The German Labour Front (DAF)',
          },
          { q: 'Who directed the German Labour Front (DAF)?', a: 'Dr Robert Ley' },
          {
            q: 'What DAF sub-organisation organized subsidized holidays, cruises, and theatre trips for workers?',
            a: 'Strength Through Joy (KdF / Kraft durch Freude)',
          },
          {
            q: 'What DAF department campaigned to improve factory lighting, canteens, and ventilation?',
            a: 'Beauty of Labour (SdA / Schönheit der Arbeit)',
          },
          {
            q: 'What car was designed by Ferdinand Porsche for ordinary workers through a weekly stamp savings scheme?',
            a: 'The Volkswagen (People’s Car / KdF-Wagen)',
          },
          {
            q: 'Did any German worker ever actually receive a Volkswagen car before the factories switched to military vehicles in 1939?',
            a: 'No',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The German Labour Front (DAF)',
        vocabTermB: 'Strength Through Joy (KdF)',
        vocabPrompt:
          'Distinguish between the state-controlled workers’ monopoly that banned strikes and increased hours (<strong>DAF</strong>) and the subsidized leisure and holiday division created to placate the working class (<strong>Strength Through Joy / KdF</strong>):',
        examType: 'utility_8',
        provenance: 'Edexcel June 2018 (Q2) / June 2025 (Q3a Utility)',
        sourcesBC: {
          tag: 'SOURCES B & C DUAL ARCHIVAL PLATE',
          sourceB: {
            title: 'SOURCE B: KdF Holiday Brochure, Berlin, 1938',
            shelfmark: 'BA-K Plak 002-KdF-1938 • BUNDESARCHIV • KOBLENZ',
            text: '“Thanks to the Führer, the German worker is no longer an exploited proletarian! Through Strength Through Joy, millions of hardworking men and women now enjoy luxury cruise holidays to the Norwegian Fjords and Mediterranean sunshine. Beautiful factory canteens, sports clubs, and the upcoming People’s Car (Volkswagen) prove that National Socialism delivers true dignity and prosperity to labour.”',
            provenance:
              'From an official promotional brochure published by the German Labour Front (DAF) celebrating five years of Strength Through Joy (KdF), 1938.',
          },
          sourceC: {
            title:
              'SOURCE C: Secret Report of the Underground Social Democratic Party (SOPADE), 1938',
            shelfmark: 'AdsD 1938-SOPADE • ARCHIV DER SOZIALEN DEMOKRATIE • BONN',
            text: '“Reports from the Ruhr and Berlin reveal bitter disillusionment. While the regime boasts about KdF cruises, only party bosses and privileged managers actually secure tickets. Meanwhile, real wages have fallen due to compulsory DAF deductions, and the average working week has increased from 43 to 47 hours. Butter, eggs, and meat are rationed because Goering’s Four-Year Plan pours everything into guns instead of butter.”',
            provenance:
              'From a secret report compiled by underground anti-Nazi Social Democratic activists inside Germany and smuggled to their leadership in Prague, 1938.',
          },
        },
        rightExam: {
          provenance: 'Edexcel June 2018 (Q2) / June 2025 (Q3a Utility)',
          type: 'source_utility_8',
          tariff: 'Question 3(a): Source Utility [8 marks • 12 mins]',
          stem: 'How useful are Sources B and C for an enquiry into the standard of living for German workers under Nazi rule?',
          stimulus: ['Strength Through Joy (KdF)', 'Working hours and wages'],
          structureStrip: [
            {
              col: '1. SOURCE B EVALUATION (CONTENT & ORIGIN)',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Evaluate Source B: Very useful for demonstrating official state propaganda; shows the visible rewards (Fjord cruises, Volkswagen schemes, improved canteens) used to win worker loyalty. However, it is an idealized party brochure masking harsh reality.',
            },
            {
              col: '2. SOURCE C EVALUATION (CONTENT & ORIGIN)',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Evaluate Source C: Extremely valuable clandestine intelligence report from inside Germany; exposes suppressed working-class reality: longer weekly hours (47h), falling real wages, DAF dues, food shortages ("guns before butter").',
            },
            {
              col: '3. COMPARATIVE UTILITY VERDICT',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Synthesise both sources: Exceptionally useful together because they present both the glossy public rewards designed to pacify labour (Source B) and the hidden economic exploitation required to fuel Hitler’s war machine (Source C).',
            },
          ],
          connectives:
            'Source B is useful because it highlights the official recreational benefits offered by the DAF, specifically... • Its historical value is supported by facts regarding KdF cruise ships and subsidized theatre tickets... • However, Source B is limited by its propagandistic purpose as a party publication... • In contrast, Source C provides essential counter-evidence as a secret underground report revealing... • Together, both sources are highly valuable because they show both the public carrots and the hidden economic sticks of Nazi labour policy...',
          wordBank:
            'Source Utility • Content • Provenance • DAF • Robert Ley • Strength Through Joy (KdF) • Volkswagen • SOPADE • Working hours • Guns before butter',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 3). Sketch a Volkswagen Beetle stamp book alongside an Autobahn motorway overpass and rearmament artillery shells.',
        },
      },
      {
        enquiryNum: 4,
        id: 'lesson_4_4',
        title: 'The Persecution of Minorities, 1933–1939',
        inquiryQuestion:
          'Was the road to Kristallnacht a planned blueprint or an escalating spiral of radicalisation?',
        subTitle:
          'Key Topic 4.4: Racial Ideology, Aryan Herrenvolk, Untermenschen, 1933 Boycott, Nuremberg Laws & Kristallnacht',
        specAnchor:
          'Nazi racial hierarchy (Aryans, Untermenschen); persecution of Roma, Slavs, homosexuals, disabled (Action T4); persecution of Jews: 1933 boycott, Nuremberg Laws (1935), Kristallnacht (1938).',
        doNow: [
          {
            q: 'What term did Nazis use for their supposed superior master race?',
            a: 'Aryan (Herrenvolk)',
          },
          {
            q: 'What derogatory German term meaning "sub-humans" was applied to Jews, Roma, and Slavs?',
            a: 'Untermenschen',
          },
          {
            q: 'What nationwide action was ordered by the SA on 1 April 1933 against Jewish businesses?',
            a: 'A one-day boycott of Jewish shops and lawyers',
          },
          {
            q: 'What 1933 law allowed the forced surgical sterilisation of people with hereditary illnesses?',
            a: 'The Sterilisation Law (Prevention of Hereditarily Diseased Offspring)',
          },
          {
            q: 'Which two laws were announced at the September 1935 Nuremberg Rally?',
            a: 'The Reich Citizenship Law and Law for the Protection of German Blood and Honour',
          },
          {
            q: 'What was banned under the Law for the Protection of German Blood and Honour?',
            a: 'Marriage and sexual relations between Jews and German citizens',
          },
          {
            q: 'What letter was stamped onto the passports of all German Jews from October 1938?',
            a: 'The red letter "J"',
          },
          {
            q: 'What nationwide violent pogrom was unleashed on 9–10 November 1938?',
            a: 'Kristallnacht (The Night of Broken Glass)',
          },
          {
            q: 'How many synagogues were burned and destroyed across Germany during Kristallnacht?',
            a: 'Over 1,000 synagogues',
          },
          {
            q: 'What collective fine was forced onto the Jewish community following Kristallnacht?',
            a: '1 billion marks',
          },
        ],
        vocabRef: '[Textbook §1.1–§2.1]',
        vocabTermA: 'The Nuremberg Laws (1935)',
        vocabTermB: 'Kristallnacht (Nov 1938)',
        vocabPrompt:
          'Distinguish between the legal decrees stripping Jews of citizenship and banning intermarriage (<strong>Nuremberg Laws</strong>) and the state-orchestrated violent pogrom of destruction and arrest in November 1938 (<strong>Kristallnacht</strong>):',
        examType: 'interpretations_16',
        provenance: 'Edexcel November 2020 (Q3b-d Interpretations)',
        interpretations: {
          tag: 'INTERPRETATIONS 1 & 2 DUAL SCHOLARLY PLATE',
          int1: {
            title: 'INTERPRETATION 1: From a modern study of the Holocaust, published 2010',
            text: '“Between 1933 and 1938, the Nazi persecution of German Jews was primarily legal, economic, and bureaucratic. Hitler moved cautiously to avoid alarming foreign opinion or disrupting the economy. Measures like the Civil Service Law of 1933 and the Nuremberg Laws of 1935 aimed to isolate Jews socially and force them to emigrate peacefully. Physical violence was kept under tight leash by the police, and ordinary Germans rarely engaged in spontaneous attacks.”',
          },
          int2: {
            title:
              'INTERPRETATION 2: From a history of anti-Semitism in the Third Reich, published 2016',
            text: '“Anti-Semitic persecution in Germany was driven by brutal violence and terror from the very day Hitler took power. SA stormtroopers routinely assaulted Jewish citizens in the streets, ransacked businesses, and beat Jewish lawyers. The radical fanaticism of local party activists constantly pushed the regime into more violent measures, culminating in the horrific state-sponsored mob violence and murders of Kristallnacht in November 1938.”',
          },
        },
        interpQuestions: {
          q3b: {
            stem: 'Study Interpretations 1 and 2. They give different views about the nature of anti-Semitic persecution in Germany between 1933 and 1938. What is the main difference between these views? [4 marks • 5 mins]',
            guidance:
              'State the difference clearly: Interpretation 1 argues that anti-Semitic persecution was primarily legal, bureaucratic, and cautious with controlled violence, whereas Interpretation 2 argues that persecution was violent, brutal, and street-driven from the beginning, escalating into terror.',
          },
          q3c: {
            stem: 'Suggest one reason why Interpretations 1 and 2 give different views about anti-Semitic persecution. [4 marks • 5 mins]',
            guidance:
              'Explain that the historians focused on different aspects of state policy: Interpretation 1 focuses on official legislation (Civil Service Law, Nuremberg Laws) and economic policy, while Interpretation 2 focuses on SA street violence, grassroots terror, and the pogroms of Kristallnacht.',
          },
        },
        rightExam: {
          provenance: 'Edexcel November 2020 (Q3d Interpretation Evaluation)',
          type: 'essay_16',
          tariff: 'Question 3(d): Evaluative Essay [16 marks + 4 SPaG • 25 mins]',
          stem: 'How far do you agree with Interpretation 2 that the persecution of Jews in Germany between 1933 and 1939 was primarily characterized by violence and terror? Explain your answer using both interpretations and your own knowledge.',
          stimulus: ['The Nuremberg Laws (1935)', 'Kristallnacht (1938)'],
          structureStrip: [
            {
              col: '1. SUPPORT FOR INTERPRETATION 2 (VIOLENCE & TERROR)',
              ref: '[Textbook §1.1–§1.3]',
              text: 'Deploy evidence for Interp 2: 1933 SA boycott used armed intimidation; Jews were beaten in streets; Kristallnacht (Nov 1938) was state-sponsored mass terror (1,000 synagogues burned, 91 murdered, 30,000 sent to Dachau/Buchenwald), marking a decisive violent turn.',
            },
            {
              col: '2. COUNTER-ARGUMENT / INTERPRETATION 1 (LEGAL EXCLUSION)',
              ref: '[Textbook §2.1–§2.2]',
              text: 'Deploy evidence for Interp 1: For most of 1933–37, persecution was predominantly legal: 1933 Civil Service bans; 1935 Nuremberg Laws stripped citizenship and banned marriage; 1936 Berlin Olympics saw anti-Semitic signs removed to soothe foreign opinion.',
            },
            {
              col: '3. SUSTAINED EVALUATIVE JUDGMENT & CRITERIA',
              ref: '[Textbook §3.1–§3.2]',
              text: 'Weigh both interpretations: Reach a nuanced verdict: persecution progressed through two distinct phases. It began as legal segregation and economic strangulation (Interp 1), but after 1938 transformed into open state violence and terror (Interp 2).',
            },
          ],
          connectives:
            'Interpretation 2 provides strong evidence that violence was a continuous thread because... • Crucially, the events of Kristallnacht demonstrated horrific physical terror, as... • However, Interpretation 1 correctly identifies that between 1933 and 1937, persecution was primarily legal, such as... • Furthermore, the 1935 Nuremberg Laws excluded Jews through statutory decree rather than... • In conclusion, I agree with Interpretation 2 to a moderate extent: while the initial five years relied heavily on bureaucratic exclusion, Kristallnacht fundamentally transformed persecution into violent terror...',
          wordBank:
            'Interpretation • Nuremberg Laws • Reich Citizenship Law • Kristallnacht • SA violence • Boycott 1933 • Synagogues • 30,000 arrested • Legal exclusion • Radicalisation',
          timelineMission:
            'Turn to Pages 2–3 (Milestone 5). Sketch the broken glass of Jewish shopfronts alongside the tablets of the 1935 Nuremberg Laws.',
        },
      },
    ],
    blueprint: {
      title:
        'Archival & Conceptual Blueprint • The Nazi Social Machine: Youth, Women & Racial Persecution',
      section1Title: '1. The Nazi Social Matrix: Indoctrination of Youth and Domesticity of Women',
      items1: [
        {
          head: '👦 The Hitlerjugend (Ages 10–18):',
          desc: 'Military training, ideological drills, physical fitness, map-reading, rifle shooting. Made compulsory in 1939 to produce hardened future soldiers for the Wehrmacht.',
        },
        {
          head: '👧 The League of German Girls (BDM):',
          desc: 'Domestic preparation, childcare, eugenics, physical gymnastics. Trained young girls to become obedient Aryan mothers to reverse the birth rate decline.',
        },
        {
          head: '👩 Women & Motherhood (Kinder, Küche, Kirche):',
          desc: 'Law for Encouragement of Marriage gave 1,000-mark loans. Mother’s Cross awarded on Hitler’s mother’s birthday. 1937 labour shortage forced millions back into rearmament factories.',
        },
      ],
      section2Title: '2. The Escalating Ladder of Anti-Semitic Persecution (1933–1938)',
      items2: [
        {
          tag: '1933: ECONOMIC BOYCOTT',
          detail:
            '1 April 1933: Nationwide SA boycott of Jewish shops, lawyers, and doctors. Law for Restoration of the Professional Civil Service sacks all Jewish civil servants and university professors.',
        },
        {
          tag: '1935: THE NUREMBERG LAWS',
          detail:
            'Reich Citizenship Law strips German Jews of civil and voting rights, reducing them to state "subjects". Law for Protection of German Blood and Honour bans intermarriage and sexual relations with Aryans.',
        },
        {
          tag: '1938: KRISTALLNACHT POGROM',
          detail:
            '9–10 Nov 1938: Goebbels coordinates nationwide SA/SS violence. Over 1,000 synagogues burned, 7,500 shops looted, 91 Jews killed, 30,000 men sent to camps, and a 1 billion mark fine imposed.',
        },
      ],
    },
    koConcepts: [
      {
        t: 'Kinder, Küche, Kirche',
        d: 'Children, Kitchen, Church: the traditionalist Nazi slogan dictating that German women’s lives belong in the home.',
      },
      {
        t: 'The Mother’s Cross',
        d: 'Medal awarded to honour prolific Aryan mothers (Bronze for 4, Silver for 6, Gold for 8 or more children).',
      },
      {
        t: 'The Hitler Youth (Hitlerjugend)',
        d: 'Compulsory youth movement for boys aged 10–18, providing military training and ideological indoctrination.',
      },
      {
        t: 'League of German Girls (BDM)',
        d: 'Female youth organisation training girls in domesticity, fitness, and racial health to become future mothers.',
      },
      {
        t: 'National Labour Service (RAD)',
        d: 'Compulsory 6-month manual labour service for young men aged 18–25, used for public works and Autobahns.',
      },
      {
        t: 'Strength Through Joy (KdF)',
        d: 'DAF division providing subsidized holidays, theatre tickets, and cruises to keep workers happy and productive.',
      },
      {
        t: 'The Nuremberg Laws (1935)',
        d: 'Racial laws stripping German Jews of citizenship and outlawing marriage and sexual relations with Aryans.',
      },
      {
        t: 'Kristallnacht (Nov 1938)',
        d: 'Night of Broken Glass: violent nationwide pogrom destroying 1,000 synagogues and sending 30,000 Jews to camps.',
      },
    ],
    koDates: [
      '1 Apr 1933: One-day nationwide SA boycott of Jewish shops',
      'Jun 1933: Law for Encouragement of Marriage introduces loans',
      'Mar 1935: Military conscription reintroduced, boosting employment',
      '15 Sep 1935: Nuremberg Laws strip Jews of German citizenship',
      'Dec 1936: First Hitler Youth Law absorbs rival organisations',
      '1937: Labour shortages force regime to recruit women into factories',
      'Aug 1938: Jewish men forced to add "Israel", women "Sara" to names',
      '9–10 Nov 1938: Kristallnacht pogrom unleashes nationwide terror',
      '15 Nov 1938: Jewish children expelled from all German state schools',
      'Mar 1939: Hitler Youth membership made strictly compulsory for all boys',
    ],
    koFigures: [
      {
        n: 'Gertrud Scholtz-Klink',
        r: 'Reich Women’s Leader; headed the Nazi Women’s League to enforce domestic ideology and motherhood.',
      },
      {
        n: 'Baldur von Schirach',
        r: 'Reich Youth Leader; oversaw the expansion and compulsory militarisation of the Hitler Youth.',
      },
      {
        n: 'Bernhard Rust',
        r: 'Minister of Education; Nazified school curricula, history books, and purged Jewish teachers.',
      },
      {
        n: 'Dr Robert Ley',
        r: 'Head of the German Labour Front (DAF); controlled workers, banned strikes, and ran Strength Through Joy (KdF).',
      },
      {
        n: 'Hermann Goering',
        r: 'Plenipotentiary for the Four-Year Plan (1936); directed economic autarky and rearmament for war.',
      },
      {
        n: 'Hjalmar Schacht',
        r: 'President of Reichsbank and Economics Minister; devised the New Plan and MEFO bills to finance early recovery.',
      },
    ],
  },
};

module.exports = {
  WEIMAR_KEY_TOPICS_DATA,
  WEIMAR_FOOTERS,
  getBase64Image,
};
