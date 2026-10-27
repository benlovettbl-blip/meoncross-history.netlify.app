/**
 * scripts/master_companion_data/weimar_companion_data.cjs
 * Universal 16-Page Master Knowledge Retrieval Companion Data
 * Unit: Weimar and Nazi Germany, 1918–1939 (Paper 3, Option 31)
 */

const { WEIMAR_PEARSON_QUIZ_BANK } = require('../weimar_pearson_quiz_bank.cjs');

const ENQUIRY_DEFS = [
  {
    num: 1,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.1',
    title: 'Origins of the Republic & The Weimar Constitution (1918–1919)',
    focus: 'Kiel Mutiny, abdication of Kaiser Wilhelm II, Ebert-Groener Pact, universal franchise & Article 48',
    warning: 'Fatal Examiner Trap: Proportional Representation did not destroy Weimar alone; its flaw was producing weak coalitions unable to agree during crises, forcing Chancellors to rely on Article 48 presidential decrees.',
    quote: '"Kiel mutineers marched on Berlin; the Kaiser fled on 9 November: master the revolutionary baseline."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[0].questions[0], // Kiel mutiny
      WEIMAR_PEARSON_QUIZ_BANK[0].questions[1], // Kaiser abdication
      WEIMAR_PEARSON_QUIZ_BANK[0].questions[2], // Armistice
      WEIMAR_PEARSON_QUIZ_BANK[0].questions[3], // Ebert-Groener pact
      WEIMAR_PEARSON_QUIZ_BANK[0].questions[4], // Proportional Representation
      WEIMAR_PEARSON_QUIZ_BANK[0].questions[5], // Voting age 20
      WEIMAR_PEARSON_QUIZ_BANK[0].questions[6], // Article 48
      WEIMAR_PEARSON_QUIZ_BANK[0].questions[7], // First President Ebert
      {
        q: 'Why was the National Assembly forced to meet in the small town of Weimar rather than Berlin in February 1919?',
        a: 'Violent street fighting and communist unrest in Berlin',
        exp: 'Berlin was too dangerous following the Spartacist Uprising, forcing politicians to draft the constitution in peaceful Weimar.'
      },
      {
        q: 'What fundamental civil right was guaranteed to all German citizens in the new Weimar Constitution?',
        a: 'Freedom of speech, assembly, and religious belief',
        exp: 'Replaced imperial autocracy with one of the most progressive and democratic bills of rights in Europe.'
      }
    ]
  },
  {
    num: 2,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.2',
    title: 'Treaty of Versailles, Political Rebellions & The 1923 Crises',
    focus: 'Article 231 War Guilt, £6.6bn reparations, Dolchstoss myth, Spartacist/Kapp uprisings & Ruhr hyperinflation',
    warning: 'Fatal Examiner Trap: Conflating the Spartacist Uprising (Left-wing Communists, Jan 1919) with the Kapp Putsch (Right-wing Freikorps, March 1920). Never mix up their leadership or political ideologies.',
    quote: '"Diktat, Dolchstoss, and £6.6bn reparations: understand why the republic carried a mortal birth defect."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[1].questions[0], // Diktat
      WEIMAR_PEARSON_QUIZ_BANK[1].questions[1], // Article 231
      WEIMAR_PEARSON_QUIZ_BANK[1].questions[2], // £6.6bn reparations
      WEIMAR_PEARSON_QUIZ_BANK[1].questions[3], // Dolchstoss stab in back
      WEIMAR_PEARSON_QUIZ_BANK[1].questions[4], // Spartacist leaders Liebknecht & Luxemburg
      WEIMAR_PEARSON_QUIZ_BANK[1].questions[5], // Kapp Putsch Wolfgang Kapp
      WEIMAR_PEARSON_QUIZ_BANK[1].questions[6], // Ruhr invasion Jan 1923
      WEIMAR_PEARSON_QUIZ_BANK[1].questions[7], // Passive resistance
      {
        q: 'Why did the Weimar government’s policy of passive resistance directly trigger hyperinflation in 1923?',
        a: 'The government printed billions of paper marks to pay striking Ruhr workers',
        exp: 'Printing unbacked money caused the currency to collapse; by November 1923 a loaf of bread cost 201 billion marks.'
      },
      {
        q: 'Which social group suffered the greatest permanent financial catastrophe during the 1923 hyperinflation?',
        a: 'The middle classes with fixed incomes, pensions, and bank savings',
        exp: 'Lifetime cash savings were completely wiped out, destroying middle-class faith in parliamentary democracy.'
      }
    ]
  },
  {
    num: 3,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.3',
    title: 'Stresemann’s Recovery & Social Changes (1924–1929)',
    focus: 'Rentenmark, Dawes Plan (800m marks), Locarno Pact, League of Nations, Bauhaus & the New Woman',
    warning: 'Fatal Examiner Trap: Believing Weimar recovery was completely secure. Stresemann himself warned Germany was "dancing on a volcano" because recovery relied on short-term US loans that could be recalled at any time.',
    quote: '"Stresemann warned Germany was dancing on a volcano: US loans brought golden years, but fragile foundation."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[2].questions[0], // Rentenmark Nov 1923
      WEIMAR_PEARSON_QUIZ_BANK[2].questions[1], // Dawes Plan 1924
      WEIMAR_PEARSON_QUIZ_BANK[2].questions[2], // Locarno Pact 1925
      WEIMAR_PEARSON_QUIZ_BANK[2].questions[3], // League of Nations 1926
      WEIMAR_PEARSON_QUIZ_BANK[2].questions[4], // Young Plan 1929
      WEIMAR_PEARSON_QUIZ_BANK[3].questions[0], // Real wages rise 10%
      WEIMAR_PEARSON_QUIZ_BANK[3].questions[1], // 1927 Unemployment Insurance Act
      WEIMAR_PEARSON_QUIZ_BANK[3].questions[3], // The New Woman (Neue Frau)
      WEIMAR_PEARSON_QUIZ_BANK[3].questions[4], // Bauhaus architectural movement
      WEIMAR_PEARSON_QUIZ_BANK[3].questions[5], // Otto Dix & George Grosz Neue Sachlichkeit
    ]
  },
  {
    num: 4,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.1',
    title: 'Early Nazi Party & The Munich Putsch (1919–1924)',
    focus: 'DAP to NSDAP, Anton Drexler, 25-Point Programme, Ernst Rohm’s SA, Munich Putsch & Landsberg Prison',
    warning: 'Fatal Examiner Trap: Writing that the Munich Putsch was a success. Militarily it was a fiasco (16 Nazis shot). Its true significance was propaganda at trial and Hitler\'s shift to the "legal strategy" in Mein Kampf.',
    quote: '"DAP to NSDAP: Drexler\'s 25 points and Rohm\'s Brownshirts gave Hitler an ideological and street army."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[4].questions[0], // German Workers' Party DAP
      WEIMAR_PEARSON_QUIZ_BANK[4].questions[1], // 25-Point Programme Feb 1920
      WEIMAR_PEARSON_QUIZ_BANK[4].questions[2], // NSDAP swastika
      WEIMAR_PEARSON_QUIZ_BANK[4].questions[3], // SA Brownshirts 1921
      WEIMAR_PEARSON_QUIZ_BANK[4].questions[4], // Ernst Rohm
      WEIMAR_PEARSON_QUIZ_BANK[5].questions[0], // Munich Beer Hall Putsch 8 Nov 1923
      WEIMAR_PEARSON_QUIZ_BANK[5].questions[1], // Gustav von Kahr betrayal
      WEIMAR_PEARSON_QUIZ_BANK[5].questions[2], // 16 Nazis killed at Feldherrnhalle
      WEIMAR_PEARSON_QUIZ_BANK[5].questions[3], // 5-year sentence (served 9 months)
      WEIMAR_PEARSON_QUIZ_BANK[5].questions[4], // Mein Kampf in Landsberg Prison
    ]
  },
  {
    num: 5,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.2',
    title: 'The Lean Years & Growth in Nazi Support (1924–1932)',
    focus: '1926 Bamberg Conference, legal strategy, Wall Street Crash (Oct 1929), 6m unemployed & Bruning’s austerity',
    warning: 'Fatal Examiner Trap: Stating the Nazis won power in the 1920s. In May 1928 they won only 12 Reichstag seats (2.6%). Only mass unemployment after October 1929 turned them into a major national party.',
    quote: '"Wall Street crashed and 6 million lost work: Bruning cut budgets while Goebbels promised Work and Bread."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[5].questions[5], // Bamberg Conference 1926
      WEIMAR_PEARSON_QUIZ_BANK[5].questions[6], // 12 Reichstag seats May 1928
      WEIMAR_PEARSON_QUIZ_BANK[6].questions[0], // Wall Street Crash Oct 1929
      WEIMAR_PEARSON_QUIZ_BANK[6].questions[1], // 6.1 million unemployed Jan 1933
      WEIMAR_PEARSON_QUIZ_BANK[6].questions[2], // Chancellor Heinrich Bruning
      WEIMAR_PEARSON_QUIZ_BANK[6].questions[3], // Article 48 rise
      WEIMAR_PEARSON_QUIZ_BANK[6].questions[4], // 107 seats Sep 1930
      WEIMAR_PEARSON_QUIZ_BANK[6].questions[5], // 230 seats Jul 1932 (37.3%)
      WEIMAR_PEARSON_QUIZ_BANK[6].questions[6], // "Work and Bread" (Arbeit und Brot)
      WEIMAR_PEARSON_QUIZ_BANK[6].questions[7], // Fear of KPD Communism among middle class
    ]
  },
  {
    num: 6,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.3',
    title: 'Political Intrigue & Hitler Appointed Chancellor (1932–1933)',
    focus: 'Fall of Bruning, Franz von Papen, Kurt von Schleicher, Hindenburg’s backstairs intrigue & 30 Jan 1933',
    warning: 'Fatal Examiner Trap: Claiming Hitler seized power by armed coup or won an outright majority. He was legally appointed Chancellor in a conservative backstairs conspiracy by Papen and Hindenburg who thought they could control him.',
    quote: '"Papen thought he boxed Hitler in; Hindenburg signed on 30 January 1933: legal appointment killed democracy."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[7].questions[0], // Hindenburg defeats Hitler April 1932
      WEIMAR_PEARSON_QUIZ_BANK[7].questions[1], // Bruning dismissed May 1932
      WEIMAR_PEARSON_QUIZ_BANK[7].questions[2], // Franz von Papen "Cabinet of Barons"
      WEIMAR_PEARSON_QUIZ_BANK[7].questions[3], // July 1932 peak 230 seats
      WEIMAR_PEARSON_QUIZ_BANK[7].questions[4], // Nov 1932 loss of 2 million votes (196 seats)
      WEIMAR_PEARSON_QUIZ_BANK[7].questions[5], // Kurt von Schleicher Dec 1932
      WEIMAR_PEARSON_QUIZ_BANK[7].questions[6], // Papen secret deal with Hindenburg Jan 1933
      WEIMAR_PEARSON_QUIZ_BANK[7].questions[7], // 30 January 1933 appointment
      {
        q: 'How many non-Nazi conservative ministers were placed in Hitler’s initial 11-man cabinet on 30 January 1933?',
        a: 'Eight non-Nazi ministers (with only 3 Nazis in cabinet)',
        exp: 'Led Papen to boast to Hindenburg that "we have boxed Hitler in" and would make him "squeak like a mouse".'
      },
      {
        q: 'Which vital cabinet post did Hermann Goering receive, giving the Nazis control over Prussia’s police force?',
        a: 'Minister of the Interior for Prussia',
        exp: 'Allowed Goering to recruit 50,000 SA men as auxiliary police to legally harass socialist and communist opponents.'
      }
    ]
  },
  {
    num: 7,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.1',
    title: 'Creation of the Dictatorship (1933–1934)',
    focus: 'Reichstag Fire, Decree for Protection of People & State, Enabling Act, Gleichschaltung & Night of the Long Knives',
    warning: 'Fatal Examiner Trap: Confusing the Reichstag Fire Decree (Feb 1933, suspended civil liberties) with the Enabling Act (March 1933, gave Hitler power to pass laws without parliament). Both were vital stepping stones.',
    quote: '"Reichstag Fire to Enabling Act: Gleichschaltung crushed unions and parties; the Fuhrer oath bound the army."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[8].questions[0], // Reichstag Fire 27 Feb 1933
      WEIMAR_PEARSON_QUIZ_BANK[8].questions[1], // Marinus van der Lubbe
      WEIMAR_PEARSON_QUIZ_BANK[8].questions[2], // Decree for Protection of People and State
      WEIMAR_PEARSON_QUIZ_BANK[8].questions[3], // Enabling Act 23 March 1933 (444 to 94)
      WEIMAR_PEARSON_QUIZ_BANK[8].questions[4], // Trade unions banned 2 May 1933 (DAF created)
      WEIMAR_PEARSON_QUIZ_BANK[8].questions[5], // All rival parties banned 14 July 1933
      WEIMAR_PEARSON_QUIZ_BANK[8].questions[6], // Night of the Long Knives 30 June 1934
      WEIMAR_PEARSON_QUIZ_BANK[8].questions[7], // Ernst Rohm executed
      {
        q: 'On 2 August 1934, what title did Hitler assume following the death of President Hindenburg?',
        a: 'Fuhrer and Reich Chancellor',
        exp: 'Merged the offices of Chancellor and President, abolishing the Weimar constitution and making himself supreme autocrat.'
      },
      {
        q: 'What personal oath did all soldiers in the German army swear on 2 August 1934?',
        a: 'An oath of unconditional loyalty to Adolf Hitler personally',
        exp: 'Bound the military directly to Hitler rather than the German state, ensuring the armed forces could not depose him.'
      }
    ]
  },
  {
    num: 8,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.2',
    title: 'The Police State & Control of the Law (1933–1939)',
    focus: 'SS (Schutzstaffel), Heinrich Himmler, SD, Reinhard Heydrich, Gestapo, People’s Court & Dachau camp',
    warning: 'Fatal Examiner Trap: Believing the Gestapo had agents on every street corner. In reality, the Gestapo was remarkably small; it relied overwhelmingly on voluntary denunciations from ordinary German citizens settling personal grudges.',
    quote: '"Gestapo terror, Dachau wire, and Himmler\'s SS: the police state enforced obedience through fear and denunciation."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[9].questions[0], // SS Heinrich Himmler
      WEIMAR_PEARSON_QUIZ_BANK[9].questions[1], // SD Reinhard Heydrich 1931
      WEIMAR_PEARSON_QUIZ_BANK[9].questions[2], // Gestapo Secret State Police
      WEIMAR_PEARSON_QUIZ_BANK[9].questions[3], // First concentration camp Dachau March 1933
      WEIMAR_PEARSON_QUIZ_BANK[9].questions[4], // People's Court (Volksgerichtshof) 1934
      WEIMAR_PEARSON_QUIZ_BANK[9].questions[5], // Roland Freisler
      {
        q: 'What legal power did the Gestapo possess that allowed them to arrest citizens without trial?',
        a: 'Protective custody (Schutzhaft)',
        exp: 'Citizens could be imprisoned indefinitely in concentration camps without trial, warrants, or legal representation.'
      },
      {
        q: 'What professional organisation were all German judges and lawyers forced to join under Gleichschaltung?',
        a: 'The National Socialist League for the Maintenance of the Law (BNSDJ)',
        exp: 'Ensured judges prioritized Nazi ideology and racial purity above impartial legal justice in every court ruling.'
      },
      WEIMAR_PEARSON_QUIZ_BANK[9].questions[6], // Concordat with Catholic Church July 1933
      WEIMAR_PEARSON_QUIZ_BANK[9].questions[7], // Reich Church Ludwig Muller
    ]
  },
  {
    num: 9,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.3',
    title: 'Propaganda, Censorship & Controlling Attitudes (1933–1939)',
    focus: 'Joseph Goebbels, Reich Ministry of Public Enlightenment, Volksempfanger radio, rallies & Berlin Olympics',
    warning: 'Fatal Examiner Trap: Describing Nazi propaganda as crude posters only. Goebbels understood that subtle censorship of newspapers, cheap mass radios, architecture, and film (Triumph of the Will) were far more persuasive.',
    quote: '"Volksempfanger radios, Speer\'s Nuremberg lights, and 1936 Olympics: Goebbels orchestrated total public mind."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[10].questions[0], // Joseph Goebbels Minister of Propaganda
      WEIMAR_PEARSON_QUIZ_BANK[10].questions[1], // Reich Chamber of Culture (Reichskulturkammer)
      WEIMAR_PEARSON_QUIZ_BANK[10].questions[2], // Volksempfanger People's Receiver radio
      WEIMAR_PEARSON_QUIZ_BANK[10].questions[3], // 70% radio ownership by 1939
      WEIMAR_PEARSON_QUIZ_BANK[10].questions[4], // May 1933 book burning in Berlin
      WEIMAR_PEARSON_QUIZ_BANK[10].questions[5], // Annual Nuremberg Rallies
      WEIMAR_PEARSON_QUIZ_BANK[10].questions[6], // 1936 Berlin Olympics propaganda
      WEIMAR_PEARSON_QUIZ_BANK[10].questions[7], // Jesse Owens wins 4 gold medals
      {
        q: 'Which famous German film director produced the iconic Nazi propaganda documentary Triumph of the Will (1935)?',
        a: 'Leni Riefenstahl',
        exp: 'Used innovative aerial photography and dramatic angles to glorify Hitler as an all-powerful, god-like leader.'
      },
      {
        q: 'What daily official directive did the Ministry of Propaganda issue to German newspaper editors?',
        a: 'The Daily Press Directive (Tagesparole)',
        exp: 'Dictated the exact front-page headlines, banned stories, and approved editorial slants across all German newspapers.'
      }
    ]
  },
  {
    num: 10,
    kt: 'Key Topic 4',
    topicCode: 'KT 4.1',
    title: 'Opposition, Resistance & Conformity (1933–1939)',
    focus: 'Edelweiss Pirates, Swing Youth, Confessing Church, Martin Niemoller, Bishop Galen & Georg Elser',
    warning: 'Fatal Examiner Trap: Exaggerating youth resistance. The Edelweiss Pirates and Swing Youth were anti-authoritarian counter-cultural groups; they were never a coordinated, nationwide political attempt to overthrow the regime.',
    quote: '"Edelweiss Pirates camped and Swing Youth danced; Bishop Galen protested: evaluate the reality of resistance."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[11].questions[0], // Edelweiss Pirates (Edelweisspiraten)
      WEIMAR_PEARSON_QUIZ_BANK[11].questions[1], // Swing Youth (Swingjugend)
      WEIMAR_PEARSON_QUIZ_BANK[11].questions[2], // Confessing Church Pastor Martin Niemoller
      WEIMAR_PEARSON_QUIZ_BANK[11].questions[3], // Mit brennender Sorge papal encyclical 1937
      WEIMAR_PEARSON_QUIZ_BANK[11].questions[4], // Bishop Clemens August von Galen
      WEIMAR_PEARSON_QUIZ_BANK[11].questions[5], // Georg Elser Burgerbraukeller Nov 1939
      WEIMAR_PEARSON_QUIZ_BANK[11].questions[6], // Red Flag underground KPD leaflets
      WEIMAR_PEARSON_QUIZ_BANK[11].questions[7], // General Beck 1938 military conspiracy
      {
        q: 'Which symbol did working-class youth in the Edelweiss Pirates wear on their clothing to signal non-conformity?',
        a: 'A white Edelweiss flower badge',
        exp: 'Used to identify fellow rebels who beat up Hitler Youth patrols, skipped school, and sang banned hiking songs.'
      },
      {
        q: 'In which concentration camp was Pastor Martin Niemoller imprisoned for opposing Nazi control of Protestant churches?',
        a: 'Sachsenhausen and Dachau concentration camps',
        exp: 'Kept in solitary confinement from 1938 to 1945 as Hitler’s "personal prisoner" after refusing to stop preaching.'
      }
    ]
  },
  {
    num: 11,
    kt: 'Key Topic 4',
    topicCode: 'KT 4.2',
    title: 'Nazi Policies towards Women and Young People (1933–1939)',
    focus: 'Kinder, Kuche, Kirche, Law for Encouragement of Marriage, Mother\'s Cross, school curriculum & Hitler Youth',
    warning: 'Fatal Examiner Trap: Failing to recognize Nazi policy reversal on women after 1937. Initial policy forced women out of jobs, but rearmament after 1937 created severe labor shortages, forcing women back into factories.',
    quote: '"Kinder, Kuche, Kirche and Mother\'s Cross: by 1937 rearmament compelled millions of women back into factories."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[12].questions[0], // Kinder, Kuche, Kirche (Children, Kitchen, Church)
      WEIMAR_PEARSON_QUIZ_BANK[12].questions[1], // Law for the Encouragement of Marriage 1933 (1,000 mark loan)
      WEIMAR_PEARSON_QUIZ_BANK[12].questions[2], // 250 marks loan deduction per child
      WEIMAR_PEARSON_QUIZ_BANK[12].questions[3], // Cross of Honour of the German Mother (Mother's Cross)
      WEIMAR_PEARSON_QUIZ_BANK[12].questions[5], // Lebensborn (Fountain of Life) 1935
      WEIMAR_PEARSON_QUIZ_BANK[13].questions[0], // Bernhard Rust Minister of Education
      WEIMAR_PEARSON_QUIZ_BANK[13].questions[1], // Two hours daily PE
      WEIMAR_PEARSON_QUIZ_BANK[13].questions[2], // Racial science (Rassenkunde)
      WEIMAR_PEARSON_QUIZ_BANK[13].questions[3], // Hitler Youth (Hitlerjugend) for boys
      WEIMAR_PEARSON_QUIZ_BANK[13].questions[4], // League of German Girls (BDM)
    ]
  },
  {
    num: 12,
    kt: 'Key Topic 4',
    topicCode: 'KT 4.3',
    title: 'Economy, Standard of Living & Persecution of Minorities (1933–1939)',
    focus: 'RAD public works, Autobahns, DAF, KdF, invisible unemployment, Nuremberg Laws (1935) & Kristallnacht (1938)',
    warning: 'Fatal Examiner Trap: Believing "invisible unemployment" meant real prosperity. True unemployment was concealed by excluding women, Jews, unmarried men in RAD, and political prisoners from official counts.',
    quote: '"Autobahns, RAD spades, and KdF cruise ships: invisible unemployment concealed long hours and military economy."',
    questions: [
      WEIMAR_PEARSON_QUIZ_BANK[14].questions[0], // National Labour Service RAD 1935
      WEIMAR_PEARSON_QUIZ_BANK[14].questions[1], // Autobahn motorway network 7,000km
      WEIMAR_PEARSON_QUIZ_BANK[14].questions[2], // Invisible unemployment exclusions
      WEIMAR_PEARSON_QUIZ_BANK[14].questions[4], // Strength Through Joy (KdF) leisure
      WEIMAR_PEARSON_QUIZ_BANK[14].questions[5], // Beauty of Labour (SdA) canteen improvements
      WEIMAR_PEARSON_QUIZ_BANK[15].questions[0], // 1 April 1933 nationwide boycott of Jewish businesses
      WEIMAR_PEARSON_QUIZ_BANK[15].questions[1], // Nuremberg Laws Sep 1935 (Reich Citizenship Act)
      WEIMAR_PEARSON_QUIZ_BANK[15].questions[2], // Law for Protection of German Blood and Honour
      WEIMAR_PEARSON_QUIZ_BANK[15].questions[4], // Kristallnacht (Night of Broken Glass) 9-10 Nov 1938
      WEIMAR_PEARSON_QUIZ_BANK[15].questions[5], // 1 billion mark fine imposed on German Jewish community
    ]
  }
];

const WEIMAR_ENQUIRY_QUESTIONS = [
  "How did military defeat and revolution lead to the creation of the Weimar Constitution in 1918–19?",
  "Why was the Weimar Republic plunged into crisis between 1919 and 1923?",
  "To what extent did Stresemann achieve economic recovery and international stability between 1924 and 1929?",
  "How did Hitler transform the DAP into the NSDAP and why did the 1923 Munich Putsch fail?",
  "Why were the years 1924–1929 'lean years' for the NSDAP despite party reorganisation?",
  "How did the Great Depression and political intrigue propel Hitler into the Chancellorship by January 1933?",
  "How did Hitler dismantle democracy and establish a totalitarian dictatorship between 1933 and 1934?",
  "How effectively did the SS, SD, Gestapo, and courts enforce Nazi control over the German people?",
  "How did Goebbels use propaganda, censorship, and spectacle to control German culture and thought?",
  "To what extent was there opposition and resistance to Nazi rule, and why was it limited?",
  "How did Nazi policies attempt to control and reshape the roles of women and young people?",
  "How did the Nazi regime manage the economy and escalate the persecution of minorities between 1933 and 1939?"
];

const WEIMAR_MILESTONES = [
  // 1. KT 1.1
  [
    { date: 'Oct 1918', title: 'Kiel Naval Mutiny' },
    { date: '9 Nov 1918', title: 'Kaiser Abdicates' },
    { date: '11 Nov 1918', title: 'Armistice Signed' },
    { date: 'Feb 1919', title: 'Weimar Assembly' },
    { date: 'Aug 1919', title: 'Constitution Signed' },
  ],
  // 2. KT 1.2
  [
    { date: 'Jan 1919', title: 'Spartacist Uprising' },
    { date: 'Jun 1919', title: 'Treaty of Versailles' },
    { date: 'Mar 1920', title: 'Kapp Putsch' },
    { date: 'Jan 1923', title: 'Ruhr Invasion' },
    { date: 'Nov 1923', title: 'Peak Hyperinflation' },
  ],
  // 3. KT 1.3
  [
    { date: 'Nov 1923', title: 'Rentenmark Issued' },
    { date: 'Aug 1924', title: 'Dawes Plan Signed' },
    { date: 'Dec 1925', title: 'Locarno Treaties' },
    { date: 'Sep 1926', title: 'League of Nations' },
    { date: 'Jun 1929', title: 'Young Plan Agreed' },
  ],
  // 4. KT 2.1
  [
    { date: 'Jan 1919', title: 'Drexler Founds DAP' },
    { date: 'Feb 1920', title: '25-Point Programme' },
    { date: 'Aug 1921', title: 'SA Brownshirts' },
    { date: 'Nov 1923', title: 'Munich Putsch Fails' },
    { date: 'Feb 1924', title: 'Hitler Trial & Prison' },
  ],
  // 5. KT 2.2
  [
    { date: 'Feb 1926', title: 'Bamberg Conference' },
    { date: 'May 1928', title: '12 Seats (2.6%)' },
    { date: 'Oct 1929', title: 'Wall Street Crash' },
    { date: 'Sep 1930', title: '107 Seats Surge' },
    { date: 'Jul 1932', title: '230 Seats Peak' },
  ],
  // 6. KT 2.3
  [
    { date: 'Apr 1932', title: 'Hindenburg Re-elected' },
    { date: 'May 1932', title: 'Brüning Resigns' },
    { date: 'Nov 1932', title: 'Nazi Vote Drops' },
    { date: 'Jan 1933', title: 'Papen-Hitler Pact' },
    { date: '30 Jan 1933', title: 'Hitler Chancellor' },
  ],
  // 7. KT 3.1
  [
    { date: '27 Feb 1933', title: 'Reichstag Fire' },
    { date: '28 Feb 1933', title: 'Emergency Decree' },
    { date: '23 Mar 1933', title: 'Enabling Act Passed' },
    { date: 'May–Jul 1933', title: 'Parties & Unions Banned' },
    { date: '30 Jun 1934', title: 'Long Knives Purge' },
  ],
  // 8. KT 3.2
  [
    { date: 'Mar 1933', title: 'Dachau Camp Opens' },
    { date: 'Jul 1933', title: 'Catholic Concordat' },
    { date: 'Aug 1934', title: 'Army Swears Oath' },
    { date: '1934', title: 'People’s Court Set Up' },
    { date: '1936', title: 'Himmler Chief of Police' },
  ],
  // 9. KT 3.3
  [
    { date: 'Mar 1933', title: 'Goebbels Ministry' },
    { date: 'May 1933', title: 'Berlin Book Burning' },
    { date: 'Sep 1933', title: 'Reich Chamber Culture' },
    { date: '1934–38', title: 'Nuremberg Rallies' },
    { date: 'Aug 1936', title: 'Berlin Olympic Games' },
  ],
  // 10. KT 4.1
  [
    { date: '1934', title: 'Confessing Church Set Up' },
    { date: '1937', title: 'Pope Condemns Nazis' },
    { date: '1937', title: 'Niemöller Arrested' },
    { date: '1938', title: 'Beck Army Conspiracy' },
    { date: 'Nov 1939', title: 'Elser Bomb Plot' },
  ],
  // 11. KT 4.2
  [
    { date: '1933', title: 'Marriage Loans Law' },
    { date: '1934', title: 'Mother’s Cross Introduced' },
    { date: '1936', title: 'Hitler Youth Law' },
    { date: '1937', title: 'Women Recalled to Work' },
    { date: '1939', title: 'Youth Made Compulsory' },
  ],
  // 12. KT 4.3
  [
    { date: 'Apr 1933', title: 'Boycott of Jewish Shops' },
    { date: '1933–35', title: 'Autobahns & RAD Conscription' },
    { date: 'Sep 1935', title: 'Nuremberg Race Laws' },
    { date: '1936', title: 'Four-Year Plan Autarky' },
    { date: 'Nov 1938', title: 'Kristallnacht Pogrom' },
  ],
];

const enquiries = ENQUIRY_DEFS.map((enq, idx) => ({
  number: enq.num,
  keyTopic: enq.kt,
  topicCode: enq.topicCode,
  title: enq.title,
  focus: enq.focus,
  enquiryQuestion: WEIMAR_ENQUIRY_QUESTIONS[idx] || enq.title,
  examinerWarning: enq.warning,
  footerQuote: enq.quote,
  milestones: WEIMAR_MILESTONES[idx] || [],
  questions: enq.questions.slice(0, 8).map((q, qIdx) => ({
    num: qIdx + 1,
    q: q.q,
    a: q.a,
    exp: q.exp
  }))
}));

module.exports = {
  unitId: 'weimar',
  unitTitle: 'Weimar and Nazi Germany, 1918–1939',
  paperCode: 'Pearson Edexcel GCSE (9–1) History • Paper 3: Modern Depth Study (Option 31)',
  heroImage: 'images/hitler_hindenburg_1933.jpg',
  heroCaption: "Source A: Chancellor Adolf Hitler bowing to President Paul von Hindenburg at the Garrison Church in Potsdam on the 'Day of Potsdam' (21 March 1933). German Federal Archives (Bundesarchiv Bild 183-S38324).",
  enquiries: enquiries,
  bankPages: [
    { title: 'Enquiries 1–4: Key Topic 1 Foundations', startQ: 1, endQ: 32, pageNum: 14 },
    { title: 'Enquiries 5–8: Key Topics 2 & 3 Dictatorship', startQ: 33, endQ: 64, pageNum: 15 },
    { title: 'Enquiries 9–12: Key Topics 3 & 4 Police State & Society', startQ: 65, endQ: 96, pageNum: 16 }
  ]
};
