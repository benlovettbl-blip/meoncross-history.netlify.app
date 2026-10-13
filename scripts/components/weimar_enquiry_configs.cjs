/**
 * weimar_enquiry_configs.cjs
 * Comprehensive 16-Enquiry Configuration Bank for Weimar and Nazi Germany (1918–1939)
 *
 * Target: Pearson Edexcel GCSE (9–1) History • Paper 3 (1HI0/31)
 * Key Topics:
 *   - KT1: The Weimar Republic, 1918–1929 (Enquiries 1.1–1.4)
 *   - KT2: Hitler’s Rise to Power, 1919–1933 (Enquiries 2.1–2.4)
 *   - KT3: Nazi Control and Dictatorship, 1933–1939 (Enquiries 3.1–3.4)
 *   - KT4: Life in Nazi Germany, 1933–1939 (Enquiries 4.1–4.4)
 *
 * Standards Enforced:
 *   - 5-Stage Chronological Inquiry Spine per Enquiry
 *   - Spec-Anchored Concrete Triads (3 bullets per stage: concrete nouns + active verbs)
 *   - Zero Knowledge Giveaways in Accessible Writing Frames (purely structural connectives)
 *   - Zero-Echo Filter against Stage Titles and Date Badges
 *   - Strict School Anonymity & Commercial Neutrality
 */

const WEIMAR_ENQUIRY_CONFIGS = {
  // ==========================================================================
  // KEY TOPIC 1: THE WEIMAR REPUBLIC, 1918–1929
  // ==========================================================================
  KT1: [
    // ------------------------------------------------------------------------
    // ENQUIRY 1.1: ORIGINS OF THE REPUBLIC, 1918–1919
    // ------------------------------------------------------------------------
    {
      lessonIndex: 0,
      lessonNum: 1,
      id: 'lesson_1_1',
      keyTopicBadge: 'KEY TOPIC 1.1',
      title: 'KT1.1: The Origins of the Republic, 1918–1919',
      enquiryQuestion:
        'Why was the Weimar Republic established amidst military defeat and political chaos in 1918–1919?',
      specAnchor:
        'Origins of the Republic: WW1 legacy, abdication of the Kaiser, revolution and armistice; National Assembly and the new constitution; strengths and weaknesses of the constitution.',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why the Weimar Republic was established in Germany in 1918–1919. [12 marks]',
      stimulus: ['Military defeat in the First World War', 'The Kiel Mutiny and German Revolution'],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Reichstag &bull; Armistice &bull; Friedrich Ebert &bull; Kiel Mutiny &bull; Kaiser Wilhelm II &bull; Council of People’s Representatives &bull; Ebert-Groener Pact &bull; Proportional Representation &bull; Article 48',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 1.1). In the drawing box, sketch Philipp Scheidemann shouting from the Reichstag window alongside the Kaiser fleeing to Holland. Annotate why moderate politicians rushed to declare a democratic republic.',
      leftPageQuip:
        'November 1918: The Kaiser fled, the navy mutinied, and Ebert inherited a bankrupt nation with two million dead soldiers.',
      rightPageQuip:
        'Proportional representation sounded like perfect democracy until twenty-eight splinter parties turned parliament into a debating society.',
      linedLeftQuip:
        'The Ebert-Groener Pact: the socialist chancellor made a secret pact with the imperial army to crush communist insurrection.',
      linedRightQuip:
        "Explain the causal chain: naval blockade starvation led directly to naval mutiny, the Kaiser's abdication, and the emergency republic.",
      stages: [
        {
          dates: 'Oct–Nov 1918',
          title: 'Military Collapse & The Kiel Mutiny',
          bullets: [
            'Turnip Winter starvation in bread queues',
            'Sailors raising red flags on battleships',
            'General Ludendorff demanding immediate Allied truce',
          ],
          focusClue:
            'How did naval mutiny and civilian starvation force military leaders to surrender?',
        },
        {
          dates: '9 Nov 1918',
          title: 'Abdication of Kaiser Wilhelm II',
          bullets: [
            'Fleeing across border into Dutch exile',
            'Philipp Scheidemann shouting from Reichstag window',
            'General strike shutting down Berlin factories',
          ],
          focusClue:
            'Why did moderate Social Democrats rush to proclaim a republic before Communists did?',
        },
        {
          dates: '11 Nov 1918',
          title: "The Armistice & Council of People's Representatives",
          bullets: [
            'Signing ceasefire inside Compiègne railway carriage',
            'Friedrich Ebert forming six-man provisional cabinet',
            'Ebert-Groener telephone pact promising army protection',
          ],
          focusClue: 'Why did Ebert form a secret pact with the Imperial Army leadership?',
        },
        {
          dates: 'Jan–Feb 1919',
          title: 'The National Assembly at Weimar',
          bullets: [
            'Moving politicians away from violent capital',
            'Electing Friedrich Ebert as first president',
            'Drafting new democratic constitution in state theatre',
          ],
          focusClue: 'Why was the constitutional assembly held in Weimar rather than Berlin?',
        },
        {
          dates: 'Aug 1919',
          title: 'The Weimar Constitution: Architecture & Flaws',
          bullets: [
            'Universal voting rights for men and women',
            'Splinter parties multiplying under proportional representation',
            'Article 48 emergency decrees bypassing parliament',
          ],
          focusClue:
            'Why did proportional representation and Article 48 undermine constitutional stability?',
        },
      ],
      fourMark: {
        type: 'Inference',
        tariffLabel: 'Question 1: Inference from Source A [4 marks]',
        stem: 'Give two things you can infer from Source A about the condition of Germany in November 1918.',
        provenance: 'From an account by a British journalist in Berlin, November 1918.',
        sourceExcerpt:
          '"The streets are thronged with silent, emaciated crowds in threadbare coats. Men returning from the trenches sit on curbs selling matches, their faces yellow from starvation. Red flags hang from government windows, yet there is neither bread in the bakeries nor coal in the cellars."',
        hint: 'State your first deduction clearly with supporting quote, then your second deduction with supporting quote.',
        stems: 'What I can infer: ... • Details in Source A that tell me this: ...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 1.2: EARLY CHALLENGES TO THE WEIMAR REPUBLIC, 1919–1923
    // ------------------------------------------------------------------------
    {
      lessonIndex: 1,
      lessonNum: 2,
      id: 'lesson_1_2',
      keyTopicBadge: 'KEY TOPIC 1.2',
      title: 'KT1.2: The Early Challenges to the Weimar Republic, 1919–1923',
      enquiryQuestion:
        'Why was the Weimar Republic threatened by left- and right-wing uprisings in the years 1919–1923?',
      specAnchor:
        'Early Challenges: Dolchstoßlegende and Versailles; Spartacist Uprising and Kapp Putsch; political assassinations; French occupation of the Ruhr (1923) and hyperinflation.',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why there were challenges to the Weimar Republic from both the left and right in the years 1919–1923. [12 marks]',
      stimulus: ['The Treaty of Versailles (1919)', 'The Spartacist Uprising (1919)'],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Spartacists &bull; Freikorps &bull; Rosa Luxemburg &bull; Karl Liebknecht &bull; Diktat &bull; Dolchstoß &bull; Kapp Putsch &bull; General von Seeckt &bull; Walther Rathenau &bull; Ruhr occupation &bull; Hyperinflation',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 1.2). In the drawing box, sketch French troops confiscating German coal in the Ruhr alongside a wheelbarrow filled with worthless marks. Label how passive resistance triggered hyperinflation.',
      leftPageQuip:
        '1923: A loaf of bread cost 200 billion marks; workers collected wages in laundry baskets twice a day before prices doubled.',
      rightPageQuip:
        'General von Seeckt told Ebert: "The Reichswehr does not fire on the Reichswehr." The army defended democracy only when convenient.',
      linedLeftQuip:
        'Right-wing judges handed minimal sentences to nationalist assassins while executing left-wing rebel workers.',
      linedRightQuip:
        'Explain the twin crises: the Treaty of Versailles provided the nationalist grievance; the Ruhr occupation supplied the economic catastrophe.',
      stages: [
        {
          dates: 'Jan 1919',
          title: 'The Spartacist Uprising',
          bullets: [
            'Seizing Berlin newspaper offices and telegraph stations',
            'Rosa Luxemburg organizing Communist street barricades',
            'Freikorps ex-soldiers executing rebel leaders in park',
          ],
          focusClue:
            'Why did the government rely on right-wing paramilitaries to crush the Spartacists?',
        },
        {
          dates: '28 Jun 1919',
          title: 'The Treaty of Versailles (The Diktat)',
          bullets: [
            'War Guilt Article 231 fixing sole blame',
            'Demilitarising Rhineland border and capping troops',
            'Frontline soldiers claiming civilian backstab betrayal',
          ],
          focusClue:
            'How did the Versailles Treaty foster deep nationalist hatred of the Republic?',
        },
        {
          dates: 'Mar 1920',
          title: 'The Kapp Putsch',
          bullets: [
            'Marine Brigade Ehrhardt marching into capital',
            'General von Seeckt refusing to fire on troops',
            'Trade unionists staging massive citywide general strike',
          ],
          focusClue: 'Why did the army refuse to defend Ebert against the right-wing putsch?',
        },
        {
          dates: '1921–1922',
          title: 'Political Assassinations (Erzberger & Rathenau)',
          bullets: [
            'Consul Organisation gunning down armistice signatory',
            'Assassinating Jewish foreign minister in open motorcar',
            'Courts handing light sentences to nationalist killers',
          ],
          focusClue: 'How did judicial bias protect right-wing nationalist assassins?',
        },
        {
          dates: 'Jan–Nov 1923',
          title: 'Occupation of the Ruhr & Hyperinflation',
          bullets: [
            'Sixty thousand French troops occupying industrial valleys',
            'Calling passive resistance and halting coal trains',
            'Printing trillion-mark banknotes wiping out family savings',
          ],
          focusClue: 'How did passive resistance in the Ruhr trigger runaway hyperinflation?',
        },
      ],
      fourMark: {
        type: 'Inference',
        tariffLabel: 'Question 1: Inference from Source B [4 marks]',
        stem: 'Give two things you can infer from Source B about German public reactions to the Treaty of Versailles.',
        provenance:
          'From a front-page editorial in the German newspaper Deutsche Zeitung, 28 June 1919.',
        sourceExcerpt:
          '"Today in the Hall of Mirrors at Versailles, the disgraceful treaty is being signed. German honor is dragged through the dirt. Never forget the shame of this day! We shall educate our sons for revenge; the German people will reconquer their rightful place among nations."',
        hint: 'State your first deduction clearly with supporting quote, then your second deduction with supporting quote.',
        stems: 'What I can infer: ... • Details in Source B that tell me this: ...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 1.3: THE RECOVERY OF THE REPUBLIC, 1924–1929
    // ------------------------------------------------------------------------
    {
      lessonIndex: 2,
      lessonNum: 3,
      id: 'lesson_1_3',
      keyTopicBadge: 'KEY TOPIC 1.3',
      title: 'KT1.3: The Recovery of the Republic, 1924–1929',
      enquiryQuestion:
        'How far did Gustav Stresemann successfully resolve the economic and international crises of Weimar Germany?',
      specAnchor:
        'Recovery of the Republic: Stresemann; Rentenmark; Dawes Plan (1924), US loans, Young Plan (1929); Locarno Treaties (1925), League of Nations (1926), Kellogg-Briand (1928).',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why the German economy and international standing recovered in the years 1924–1929. [12 marks]',
      stimulus: ['The introduction of the Rentenmark', 'The Dawes Plan (1924)'],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Gustav Stresemann &bull; Rentenmark &bull; Reichsbank &bull; Charles Dawes &bull; Dawes Plan (1924) &bull; Wall Street loans &bull; Locarno Treaties (1925) &bull; League of Nations (1926) &bull; Kellogg-Briand Pact &bull; Young Plan (1929)',
      timelineMission:
        "Turn to Pages 2–3 (Key Topic 1.3). In the drawing box, sketch Gustav Stresemann signing the Locarno Pact alongside a bridge connecting Germany to the League of Nations. Label how diplomacy restored Germany's great power status.",
      leftPageQuip:
        'Stresemann was no saint, but he was a financial realist: the Rentenmark killed hyperinflation dead in under three months.',
      rightPageQuip:
        'The Dawes Plan: American loans gave Germany breathing space, but Stresemann warned Germany was dancing on a volcano.',
      linedLeftQuip:
        'Locarno 1925: Germany voluntarily guaranteed western borders with France and Belgium, earning Stresemann the Nobel Peace Prize.',
      linedRightQuip:
        'Explain the dual strategy: currency stabilisation restored domestic trust; diplomatic treaties ended international isolation.',
      stages: [
        {
          dates: 'Nov 1923',
          title: 'Stresemann & The Rentenmark Currency',
          bullets: [
            'Burning trillions of worthless old paper marks',
            'Mortgaging national agricultural land and factory assets',
            'Fixing stable exchange rate at 4.2 trillion to dollar',
          ],
          focusClue: 'How did the Rentenmark restore basic confidence in the monetary system?',
        },
        {
          dates: 'Apr–Aug 1924',
          title: 'The Dawes Plan & American Loans',
          bullets: [
            'Charles Dawes rescheduling annual indemnity instalments',
            'Wall Street bankers injecting eight hundred million gold marks',
            'Modernising chemical plants and municipal public works',
          ],
          focusClue:
            'Why did American loans provide temporary relief but leave Germany vulnerable?',
        },
        {
          dates: 'Oct 1925',
          title: 'The Locarno Treaties',
          bullets: [
            'Voluntarily accepting western frontiers with France and Belgium',
            'Keeping Rhineland border zone permanently demilitarised',
            'Winning joint Nobel Peace Prize in Oslo',
          ],
          focusClue: 'How did the Locarno Treaties break Germany’s post-war diplomatic isolation?',
        },
        {
          dates: 'Sep 1926',
          title: 'Entry into the League of Nations',
          bullets: [
            'Awarding permanent seat on Geneva governing council',
            'Restoring great power diplomatic status in Europe',
            'Stresemann delivering triumphant German address to assembly',
          ],
          focusClue: 'Why was admission to the League of Nations a major victory for Stresemann?',
        },
        {
          dates: '1928–1929',
          title: 'The Kellogg-Briand Pact & The Young Plan',
          bullets: [
            'Sixty-two countries outlawing war as national policy',
            'Owen Young reducing total indemnity to two billion pounds',
            'Alfred Hugenberg launching nationalist plebiscite campaign against debt',
          ],
          focusClue: 'Why did right-wing nationalists fiercely oppose the Young Plan?',
        },
      ],
      fourMark: {
        type: 'Difference',
        tariffLabel: 'Question 3(b): Difference in Views [4 marks]',
        stem: 'Study Interpretations 1 and 2. What is the main difference between the views on the extent of German economic recovery between 1924 and 1929?',
        provenance: 'From two modern historical analyses of the Weimar Republic.',
        sourceExcerpt:
          'Interpretation 1 stresses solid industrial expansion, foreign loans, and modern infrastructure. Interpretation 2 argues that recovery was superficial and built on fragile American short-term credit.',
        hint: 'State the core difference in views directly, then support with specific quotes or details from both interpretations.',
        stems:
          'The main difference is that Interpretation 1 argues that... whereas Interpretation 2 stresses that... Specifically, Interpretation 1 notes "..." while Interpretation 2 claims "..."',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 1.4: CHANGES IN SOCIETY, 1924–1929
    // ------------------------------------------------------------------------
    {
      lessonIndex: 3,
      lessonNum: 4,
      id: 'lesson_1_4',
      keyTopicBadge: 'KEY TOPIC 1.4',
      title: 'KT1.4: Changes in Society, 1924–1929',
      enquiryQuestion:
        'To what extent did culture, standard of living, and the position of women improve during the Golden Twenties?',
      specAnchor:
        'Changes in Society: living standards (wages, housing, unemployment insurance 1927); women in politics, work, and leisure; cultural flowering in architecture, art, and cinema.',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why there were significant cultural and social changes in Weimar Germany in the years 1924–1929. [12 marks]',
      stimulus: [
        "The growth of the 'New Woman'",
        'The Bauhaus movement in design and architecture',
      ],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Unemployment Insurance (1927) &bull; New Woman &bull; Weimar Constitution &bull; Walter Gropius &bull; Bauhaus &bull; Neue Sachlichkeit &bull; Otto Dix &bull; George Grosz &bull; Fritz Lang &bull; Metropolis &bull; UFA studios',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 1.4). In the drawing box, sketch a Bauhaus building alongside an Otto Dix portrait of Berlin cabaret life. Label how avant-garde culture divided urban radicals from rural conservatives.',
      leftPageQuip:
        'Bauhaus replaced Prussian columns with steel and glass, while Berlin cabarets shocked churchgoers across the countryside.',
      rightPageQuip:
        'Weimar women gained the vote in 1919 and entered professions, but traditionalists still expected Kinder, Küche, Kirche.',
      linedLeftQuip:
        'Otto Dix and George Grosz painted wounded veterans and corrupt profiteers, stripping the romantic gloss off imperial Germany.',
      linedRightQuip:
        'Explain the cultural polarization: liberal Berlin embraced modern emancipation while conservative provinces saw moral decay.',
      stages: [
        {
          dates: '1924–1928',
          title: 'Rising Wages & The Unemployment Insurance Act (1927)',
          bullets: [
            'Real wages rising by nine percent nationally',
            'Compulsory worker contributions funding sixteen million citizens',
            'Erecting municipal apartment blocks in urban centres',
          ],
          focusClue: 'How did welfare legislation and real wage growth raise living standards?',
        },
        {
          dates: '1924–1929',
          title: "The 'New Woman' in Politics & Work",
          bullets: [
            'Women taking ten percent of Reichstag seats',
            'Young female clerks earning independent secretarial wages',
            'Cutting bobbed haircuts and smoking in public cafes',
          ],
          focusClue:
            'Why did urban women experience new freedoms while traditional roles persisted?',
        },
        {
          dates: '1925–1929',
          title: 'The Bauhaus Movement & Modernist Architecture',
          bullets: [
            'Walter Gropius moving design school to Dessau',
            'Replacing ornate Prussian pillars with glass facades',
            'Designing steel tube chairs and functional apartment blocks',
          ],
          focusClue: 'How did the Bauhaus school embody modern functionalist design?',
        },
        {
          dates: '1924–1929',
          title: 'Expressionism & Neue Sachlichkeit Painting',
          bullets: [
            'Otto Dix painting wounded war veterans on sidewalks',
            'George Grosz satirising corrupt industrialists and bankers',
            'Exhibiting raw urban reality in public galleries',
          ],
          focusClue: 'Why did Neue Sachlichkeit painters reject traditional romantic art?',
        },
        {
          dates: '1926–1929',
          title: 'Golden Age Cinema & The Cultural Backlash',
          bullets: [
            'Fritz Lang directing science fiction epic Metropolis',
            'UFA film studios dominating European cinematic exports',
            'Conservative rural churchgoers condemning Berlin night clubs',
          ],
          focusClue: 'Why did conservative Germans view Berlin culture as degenerate?',
        },
      ],
      fourMark: {
        type: 'Reason',
        tariffLabel: 'Question 3(c): Reason for Difference [4 marks]',
        stem: 'Suggest one reason why Interpretations 1 and 2 give different views about social changes in the Weimar Republic during the 1920s.',
        provenance: 'From two historical studies examining social change in Weimar Germany.',
        sourceExcerpt:
          'Historian A focuses on urban Berlin, nightlife, and progressive women. Historian B focuses on small-town Germany, rural poverty, and religious conservatism.',
        hint: 'Explain how the historians drew on different evidence or had a different perspective (e.g. urban avant-garde vs rural traditionalism).',
        stems:
          'One reason they give different views is that the historians investigated different aspects of society. Interpretation 1 focuses on urban cities like Berlin where... whereas Interpretation 2 focuses on rural areas where...',
      },
    },
  ],

  // ==========================================================================
  // KEY TOPIC 2: HITLER’S RISE TO POWER, 1919–1933
  // ==========================================================================
  KT2: [
    // ------------------------------------------------------------------------
    // ENQUIRY 2.1: EARLY DEVELOPMENT OF THE NAZI PARTY, 1920–1922
    // ------------------------------------------------------------------------
    {
      lessonIndex: 0,
      lessonNum: 1,
      id: 'lesson_2_1',
      keyTopicBadge: 'KEY TOPIC 2.1',
      title: 'KT2.1: Early Development of the Nazi Party, 1920–1922',
      enquiryQuestion:
        'Why did the Nazi Party grow from an obscure fringe group into a notorious political force in Bavaria by 1922?',
      specAnchor:
        'Early Nazi Development: DAP origins under Drexler; Hitler joins and transforms party; 25-Point Programme (1920); SA formation (Brownshirts); party reorganisation and the swastika emblem.',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why the Nazi Party (NSDAP) developed rapidly in the years 1920–1922. [12 marks]',
      stimulus: [
        'Hitler’s personal oratory and speeches',
        'The creation of the SA (Sturmabteilung)',
      ],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Anton Drexler &bull; DAP &bull; 25-Point Programme (1920) &bull; NSDAP &bull; Völkischer Beobachter &bull; Swastika &bull; Führerprinzip &bull; Ernst Röhm &bull; Sturmabteilung (SA) &bull; Munich beer halls',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.1). In the drawing box, sketch a Munich beer hall meeting with stormtroopers guarding the doors and Hitler speaking from a table. Annotate how theatrical oratory and violence built party support.',
      leftPageQuip:
        "1919: Army spy Adolf Hitler was sent to investigate the German Workers' Party and ended up running the entire show.",
      rightPageQuip:
        'The 25-Point Programme promised to tear up Versailles, exclude Jewish citizens, and unite all Germans in a Greater Reich.',
      linedLeftQuip:
        "Ernst Röhm's SA provided the muscle: surplus brown tropical shirts, iron fist discipline, and street warfare against Communists.",
      linedRightQuip:
        "Explain the mechanics: Hitler's theatrical speeches drew crowds; the SA protected halls; party newspapers broadcast the message.",
      stages: [
        {
          dates: 'Sep 1919',
          title: "Anton Drexler & The German Workers' Party (DAP)",
          bullets: [
            'Army intelligence sending corporal to beer hall meeting',
            'Drexler handing pamphlet on national socialism',
            'Party card registered as member fifty-five',
          ],
          focusClue: 'How did military surveillance lead directly to party membership?',
        },
        {
          dates: 'Feb 1920',
          title: 'The 25-Point Programme',
          bullets: [
            'Drafting manifesto demanding abolition of Versailles terms',
            'Denying citizenship rights to Jewish residents',
            'Promising old age pensions and land redistribution',
          ],
          focusClue: 'How did the 25-Point Programme combine nationalist and socialist appeals?',
        },
        {
          dates: '1920–1921',
          title: 'Party Rebranding & The Swastika Banner',
          bullets: [
            'Adding National Socialist label to party name',
            'Purchasing Munich newspaper Völkischer Beobachter',
            'Designing black hooked cross inside white circle on red',
          ],
          focusClue: 'Why was visual branding crucial for attracting working-class recruits?',
        },
        {
          dates: 'Jul 1921',
          title: 'Hitler Takes Absolute Leadership (Führerprinzip)',
          bullets: [
            'Threatening total resignation unless granted dictatorial power',
            'Forcing Anton Drexler into honorary party chairman',
            'Rallying six thousand spectators in Munich beer cellars',
          ],
          focusClue: 'How did personal oratory secure complete dominance over party rivals?',
        },
        {
          dates: 'Aug 1921',
          title: 'Formation of the Sturmabteilung (SA)',
          bullets: [
            'Dressing ex-soldiers in surplus brown tropical shirts',
            'Ernst Röhm training street squads with clubs',
            'Beating rival Communist agitators outside beer halls',
          ],
          focusClue: 'What role did organized paramilitary violence play in protecting meetings?',
        },
      ],
      fourMark: {
        type: 'Inference',
        tariffLabel: 'Question 1: Inference from Source A [4 marks]',
        stem: "Give two things you can infer from Source A about Adolf Hitler's speechmaking in Munich beer halls in 1921.",
        provenance:
          'From the memoirs of a Munich resident who attended a Nazi rally in the Hofbräuhaus, November 1921.',
        sourceExcerpt:
          '"The hall was packed to suffocating point with workers, soldiers, and students. When Hitler stepped forward, dead silence fell. He began hoarsely, but within minutes his voice rose to a fanatical roar, gesticulating wildly. He named the guilty politicians who signed the Armistice, and the crowd jumped on chairs screaming approval."',
        hint: 'State your first deduction clearly with supporting quote, then your second deduction with supporting quote.',
        stems: 'What I can infer: ... • Details in Source A that tell me this: ...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 2.2: THE MUNICH PUTSCH AND THE LEAN YEARS, 1923–1929
    // ------------------------------------------------------------------------
    {
      lessonIndex: 1,
      lessonNum: 2,
      id: 'lesson_2_2',
      keyTopicBadge: 'KEY TOPIC 2.2',
      title: 'KT2.2: The Munich Putsch and the Lean Years, 1923–1929',
      enquiryQuestion:
        'Why did the Munich Putsch fail in 1923, and how did Hitler reorganise the Nazi Party during the Lean Years?',
      specAnchor:
        'Munich Putsch and Lean Years: Munich Putsch (1923); trial and Landsberg imprisonment; Mein Kampf; party reorganisation; Bamberg Conference (1926); electoral performance in 1928.',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        "Explain why the Nazi Party changed its strategy during the 'Lean Years' (1924–1929). [12 marks]",
      stimulus: ['The failure of the Munich Putsch (1923)', 'The Bamberg Conference (1926)'],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Bürgerbräukeller &bull; Gustav von Kahr &bull; General Ludendorff &bull; Landsberg Prison &bull; Mein Kampf &bull; Legal strategy (Ballot box) &bull; Bamberg Conference (1926) &bull; Gregor Strasser &bull; Schutzstaffel (SS) &bull; 1928 election (2.6%)',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.2). In the drawing box, sketch Hitler in his Landsberg cell dictating Mein Kampf alongside a ballot box. Annotate why Hitler abandoned violent armed coups in favor of democratic elections.',
      leftPageQuip:
        'November 1923: A beer hall pistol shot, a failed march on the Odeonsplatz, and sixteen dead stormtroopers. Coups were out; elections were in.',
      rightPageQuip:
        'In Landsberg Prison, Hitler dictated Mein Kampf to Hess and realised: "We must hold our noses and enter the Reichstag."',
      linedLeftQuip:
        'The Bamberg Conference 1926: Hitler crushed the northern socialist wing of Strasser and made the Führerprinzip absolute party law.',
      linedRightQuip:
        'Explain the strategic pivot: armed insurrection brought jail; democratic campaigning provided the path to constitutional power.',
      stages: [
        {
          dates: '8 Nov 1923',
          title: 'The Bürgerbräukeller Coup',
          bullets: [
            'Firing pistol shot into beer hall ceiling',
            'Forcing Bavarian state commissioners into private backroom',
            'General Ludendorff endorsing immediate march on Berlin',
          ],
          focusClue: 'How did the armed coup attempt to overthrow the Bavarian state?',
        },
        {
          dates: '9 Nov 1923',
          title: 'The Residenzstrasse Clash & Putsch Collapse',
          bullets: [
            'Two thousand brownshirts marching toward Odeonsplatz square',
            'State police firing volley down narrow street',
            'Sixteen stormtroopers dying as leaders scatter into hiding',
          ],
          focusClue: 'Why did the Bavarian police crush the march instead of defecting?',
        },
        {
          dates: 'Feb–Apr 1924',
          title: 'The Munich Treason Trial & Landsberg Prison',
          bullets: [
            'Turning court dock into national propaganda platform',
            'Sympathetic judges granting minimum five-year sentence',
            'Dictating Mein Kampf memoir to Rudolf Hess in cell',
          ],
          focusClue: 'How did the trial transform a humiliating defeat into a propaganda triumph?',
        },
        {
          dates: '1925–1926',
          title: 'The Bamberg Conference & The Legal Path to Power',
          bullets: [
            'Relaunching banned party after early December release',
            'Crushing northern socialist faction under Gregor Strasser',
            'Establishing SS blackshirts as personal armed bodyguard',
          ],
          focusClue: 'Why did the Führer demand absolute obedience and legal election tactics?',
        },
        {
          dates: 'May 1928',
          title: 'Electoral Failure in the Golden Twenties',
          bullets: [
            'Winning only twelve seats in parliamentary election',
            'Capturing two point six percent of national vote',
            'Stresemann economic prosperity draining extremist appeal',
          ],
          focusClue: 'Why did economic stability make radical nationalist propaganda ineffective?',
        },
      ],
      fourMark: {
        type: 'Inference',
        tariffLabel: 'Question 1: Inference from Source B [4 marks]',
        stem: 'Give two things you can infer from Source B about the Munich Putsch trial in 1924.',
        provenance:
          "From an article in a Munich newspaper reporting on Hitler's trial for high treason, March 1924.",
        sourceExcerpt:
          '"The judges listened in respectful silence as Hitler spoke for four hours without interruption. He boldly admitted trying to overthrow the Berlin government, claiming he acted as a patriot to save Germany from Marxism. The court seemed more like a political platform for the defendant than a hall of justice."',
        hint: 'State your first deduction clearly with supporting quote, then your second deduction with supporting quote.',
        stems: 'What I can infer: ... • Details in Source B that tell me this: ...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 2.3: GROWTH IN NAZI SUPPORT, 1929–1932
    // ------------------------------------------------------------------------
    {
      lessonIndex: 2,
      lessonNum: 3,
      id: 'lesson_2_3',
      keyTopicBadge: 'KEY TOPIC 2.3',
      title: 'KT2.3: The Growth in Support for the Nazis, 1929–1932',
      enquiryQuestion:
        'Why did support for the Nazi Party surge dramatically following the Wall Street Crash of 1929?',
      specAnchor:
        'Growth in Nazi Support: Wall Street Crash (1929) and economic depression; unemployment; Heinrich Brüning and Article 48; appeal to middle classes, youth, and workers; propaganda under Goebbels.',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why support for the Nazi Party increased in the years 1929–1932. [12 marks]',
      stimulus: [
        'The Wall Street Crash and mass unemployment',
        'Nazi propaganda under Joseph Goebbels',
      ],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Wall Street Crash (1929) &bull; Great Depression &bull; Six million unemployed &bull; Heinrich Brüning &bull; Hunger Chancellor &bull; Article 48 &bull; KPD surge &bull; Negative cohesion &bull; Joseph Goebbels &bull; July 1932 election (230 seats)',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.3). In the drawing box, sketch an unemployed worker in soup kitchen queues alongside a Nazi poster promising "Work and Bread". Annotate why desperate voters abandoned moderate democracy for radical extremes.',
      leftPageQuip:
        'October 1929: Wall Street crashed, American loans vanished overnight, and six million Germans found themselves on the streets.',
      rightPageQuip:
        'Brüning earned the title "The Hunger Chancellor" by cutting benefits during the worst depression in human history.',
      linedLeftQuip:
        'Goebbels flew Hitler across Germany by aeroplane, staging mass rallies with floodlights and gramophones that mesmerized crowds.',
      linedRightQuip:
        "Explain negative cohesion: Germans didn't agree on all Nazi policies, but they shared hatred of Versailles and fear of Communism.",
      stages: [
        {
          dates: 'Oct 1929',
          title: 'The Wall Street Crash & Economic Meltdown',
          bullets: [
            'American investors recalling ninety-day short-term loans',
            'German industrial output falling by forty percent',
            'Bank queues forming as Danatbank collapses in panic',
          ],
          focusClue: 'How did the American stock crash shatter Germany’s banking system?',
        },
        {
          dates: '1930–1932',
          title: 'Mass Unemployment & The "Hunger Chancellor"',
          bullets: [
            'Six million workers registering on jobless lists',
            'Heinrich Brüning slashing state unemployment benefits',
            'President Hindenburg signing sixty-six Article 48 decrees',
          ],
          focusClue: 'Why did Brüning’s austerity policies deepen economic misery?',
        },
        {
          dates: '1930–1932',
          title: 'The Communist Threat & Polarisation',
          bullets: [
            'Communist party winning seventy-seven seats in parliament',
            'Red Front Fighters clashing with brownshirts in streets',
            'Industrialists donating party funds out of Bolshevik fear',
          ],
          focusClue:
            'How did fear of a Communist revolution drive middle-class voters toward the Nazis?',
        },
        {
          dates: '1930–1932',
          title: 'Goebbels & Modern Propaganda Campaigns',
          bullets: [
            'Chartering private aeroplane for flights over Germany',
            'Plastering three-word posters promising work and bread',
            'Mass-producing gramophone records for household radios',
          ],
          focusClue:
            'What innovative propaganda methods created an impression of dynamic national movement?',
        },
        {
          dates: 'Jul 1932',
          title: 'The July Reichstag Breakthrough',
          bullets: [
            'Winning two hundred and thirty parliamentary seats',
            'Becoming largest party with thirty-seven percent vote',
            'Hindenburg refusing to appoint corporal as national chancellor',
          ],
          focusClue: 'Why did the Nazis become the largest party yet remain excluded from power?',
        },
      ],
      fourMark: {
        type: 'Difference',
        tariffLabel: 'Question 3(b): Difference in Views [4 marks]',
        stem: 'Study Interpretations 1 and 2. What is the main difference between the views on why people voted for the Nazi Party in the years 1929–1932?',
        provenance: 'From two modern historical accounts of the Great Depression in Germany.',
        sourceExcerpt:
          "Interpretation 1 stresses economic desperation, mass unemployment, and the destruction of the middle classes. Interpretation 2 highlights Goebbels' brilliant propaganda techniques, emotional appeal, and fear of Communism.",
        hint: 'State the core difference in views directly, then support with specific quotes or details from both interpretations.',
        stems:
          'The main difference is that Interpretation 1 stresses economic causes such as... whereas Interpretation 2 argues that political and propaganda factors were decisive because...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 2.4: HOW HITLER BECAME CHANCELLOR, 1932–1933
    // ------------------------------------------------------------------------
    {
      lessonIndex: 3,
      lessonNum: 4,
      id: 'lesson_2_4',
      keyTopicBadge: 'KEY TOPIC 2.4',
      title: 'KT2.4: How Hitler Became Chancellor, 1932–1933',
      enquiryQuestion: 'Why was Adolf Hitler appointed Chancellor of Germany on 30 January 1933?',
      specAnchor:
        "Hitler Becomes Chancellor: political developments in 1932; fall of Brüning and Schleicher; roles of Hindenburg and Franz von Papen; the 'backstairs intrigue'; appointment on 30 January 1933.",
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why Adolf Hitler was appointed Chancellor of Germany in January 1933. [12 marks]',
      stimulus: ['The political intrigue of Franz von Papen', 'The November 1932 election results'],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Franz von Papen &bull; Kurt von Schleicher &bull; Paul von Hindenburg &bull; November 1932 election &bull; Cabinet of Barons &bull; Backstairs plot &bull; Schroeder Villa &bull; 30 January 1933 &bull; Coalition &bull; Boxed into a corner',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 2.4). In the drawing box, sketch Franz von Papen whispering into aged President Hindenburg\'s ear as Hitler shakes hands on 30 January 1933. Annotate Papen\'s fateful boast: "In two months we will have pushed him into a corner!"',
      leftPageQuip:
        'November 1932: Nazi votes dropped by two million and the party was broke. Hitler was rescued not by voters, but by aristocratic plotters.',
      rightPageQuip:
        'Papen boasted: "Within two months, we will have pushed Hitler into a corner so hard he\'ll squeak." Famous last words.',
      linedLeftQuip:
        'Hindenburg despised the "Bohemian corporal," but Papen convinced him that an army-backed coalition could control the radicals.',
      linedRightQuip:
        "Explain the backstairs plot: conservative elites believed they could hire Hitler's mass street following while keeping real power for themselves.",
      stages: [
        {
          dates: 'Nov 1932',
          title: 'The Nazi Setback & Financial Exhaustion',
          bullets: [
            'Losing two million votes and thirty-four seats',
            'Party bank accounts emptied by endless election campaigns',
            'Gregor Strasser resigning over refusal to form coalition',
          ],
          focusClue: 'Why did the November 1932 election suggest Nazi momentum was fading?',
        },
        {
          dates: 'Dec 1932',
          title: 'General von Schleicher’s Failed Chancellor Gamble',
          bullets: [
            'Attempting to split socialist wing from party leadership',
            'Proposing land division of bankrupt Prussian aristocratic estates',
            'Conservative landowners turning aged president against general',
          ],
          focusClue: 'Why did Schleicher’s policies alienate powerful conservative barons?',
        },
        {
          dates: '4 Jan 1933',
          title: 'The Secret Schroeder Villa Meeting',
          bullets: [
            "Meeting secretly at Cologne banker's private residence",
            'Franz von Papen agreeing to share cabinet power',
            'Industrialists pledging to pay off mounting party debts',
          ],
          focusClue:
            'How did Papen’s personal rivalry with Schleicher lead to political collusion?',
        },
        {
          dates: '20–28 Jan 1933',
          title: 'The Backstairs Plot & Hindenburg’s Capitulation',
          bullets: [
            'Papen persuading president that radical leader can be boxed in',
            'Restricting cabinet to three party members out of eleven',
            'Junkers convincing marshal that only coalition can stop civil war',
          ],
          focusClue:
            'Why did conservative elites believe they could control and manipulate Hitler?',
        },
        {
          dates: '30 Jan 1933',
          title: 'Appointment as Chancellor & Torchlight Parade',
          bullets: [
            'Swearing constitutional oath before eighty-five-year-old president',
            'Twenty-five thousand stormtroopers marching through Brandenburg Gate',
            'Singing Horst Wessel anthem under blazing kerosene torches',
          ],
          focusClue:
            'How did the appointment mark both legal transition and triumphant celebration?',
        },
      ],
      fourMark: {
        type: 'Reason',
        tariffLabel: 'Question 3(c): Reason for Difference [4 marks]',
        stem: 'Suggest one reason why Interpretations 1 and 2 give different views on why Hitler was appointed Chancellor in January 1933.',
        provenance: "From two historical evaluations of Hitler's appointment.",
        sourceExcerpt:
          "Interpretation 1 focuses on backstairs intrigue, conservative miscalculation, and Papen's vanity. Interpretation 2 focuses on economic collapse, street violence, and the massive electoral mandate won by the Nazis.",
        hint: 'Explain how the historians placed different weight on long-term electoral strength versus short-term elite political plotting.',
        stems:
          'One reason the interpretations differ is that the historians emphasize different causes. Interpretation 1 gives weight to the short-term political intrigue of von Papen, who believed... whereas Interpretation 2 emphasizes the broad electoral appeal caused by the Great Depression, which made...',
      },
    },
  ],

  // ==========================================================================
  // KEY TOPIC 3: NAZI CONTROL AND DICTATORSHIP, 1933–1939
  // ==========================================================================
  KT3: [
    // ------------------------------------------------------------------------
    // ENQUIRY 3.1: THE CREATION OF A DICTATORSHIP, 1933–1934
    // ------------------------------------------------------------------------
    {
      lessonIndex: 0,
      lessonNum: 1,
      id: 'lesson_3_1',
      keyTopicBadge: 'KEY TOPIC 3.1',
      title: 'KT3.1: The Creation of a Dictatorship, 1933–1934',
      enquiryQuestion:
        'How did the Nazi regime eliminate all legal and political opposition between January 1933 and August 1934?',
      specAnchor:
        'Creation of Dictatorship: Reichstag Fire; Emergency Decree; Enabling Act (1933); Gleichschaltung (trade unions, political parties); Night of the Long Knives; death of Hindenburg and army oath.',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why the Nazi regime was able to establish a one-party dictatorship by August 1934. [12 marks]',
      stimulus: ['The Reichstag Fire (February 1933)', 'The Night of the Long Knives (June 1934)'],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Marinus van der Lubbe &bull; Reichstag Fire Decree &bull; Enabling Act (23 March 1933) &bull; Gleichschaltung &bull; German Labour Front (DAF) &bull; One-party state &bull; Night of the Long Knives &bull; Ernst Röhm &bull; Death of Hindenburg &bull; Armed forces oath',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 3.1). In the drawing box, sketch the burning Reichstag building alongside the SA badge of Ernst Röhm crossed out in red. Annotate how Hitler eliminated both external enemies and internal rivals.',
      leftPageQuip:
        'February 1933: Van der Lubbe set fire to the Reichstag; Hitler used it to snuff out constitutional freedom in twenty-four hours.',
      rightPageQuip:
        'The Enabling Act: SA stormtroopers lined the Kroll Opera House chanting: "Give us the law or face the fire!" Democracy committed suicide.',
      linedLeftQuip:
        "Night of the Long Knives: Hitler purged Ernst Röhm and the SA to win the German Army's loyalty, declaring himself supreme judge.",
      linedRightQuip:
        'Explain the consolidation: emergency decrees jailed Communists; the Enabling Act bypassed parliament; the army oath finalized total power.',
      stages: [
        {
          dates: '27 Feb 1933',
          title: 'The Reichstag Fire & Emergency Decree',
          bullets: [
            'Marinus van der Lubbe arrested inside burning parliamentary hall',
            'Suspending all civil liberties and freedom of press',
            'Imprisoning four thousand Communist deputies without court trial',
          ],
          focusClue: 'How was the arson used as a pretext to destroy constitutional rights?',
        },
        {
          dates: '23 Mar 1933',
          title: 'The Enabling Act',
          bullets: [
            'Surrounding Kroll Opera House with armed brownshirts',
            'Intimidating Catholic Centre Party into voting for decree',
            'Passing law granting four years of rule without parliament',
          ],
          focusClue: 'Why did the Enabling Act effectively end parliamentary democracy in Germany?',
        },
        {
          dates: 'May–Jul 1933',
          title: 'Gleichschaltung (Co-ordination of State & Society)',
          bullets: [
            'Stormtroopers smashing trade union offices on second of May',
            'Confiscating socialist assets and outlawing rival parties',
            'Declaring one-party state under July legal decree',
          ],
          focusClue: 'How did Gleichschaltung dismantle independent social and political bodies?',
        },
        {
          dates: '30 Jun 1934',
          title: 'The Night of the Long Knives',
          bullets: [
            'Dragging Ernst Röhm from Bavarian lakeside hotel bed',
            'Murdering four hundred stormtroopers and political opponents',
            'Army generals celebrating removal of rowdy street rival',
          ],
          focusClue: 'Why did the Führer purge his own paramilitary commanders?',
        },
        {
          dates: '2 Aug 1934',
          title: 'Death of Hindenburg & The Army Oath',
          bullets: [
            'Merging presidency and chancellorship into supreme dictator',
            'Every soldier swearing personal obedience to head of state',
            'Confirming absolute power with ninety percent plebiscite vote',
          ],
          focusClue: 'How did the military oath cement total control over the armed forces?',
        },
      ],
      fourMark: {
        type: 'Inference',
        tariffLabel: 'Question 1: Inference from Source A [4 marks]',
        stem: 'Give two things you can infer from Source A about the effect of the Reichstag Fire Decree on German political life.',
        provenance: 'From the diary of an anti-Nazi German schoolteacher, Berlin, 1 March 1933.',
        sourceExcerpt:
          '"A terrible pall of fear has fallen over the city since the fire. Last night, plainclothes police and armed SA broke into my neighbour\'s flat and dragged his son away without explanation. The telephone lines are tapped; newspapers carrying the slightest criticism are shut down. We speak only in whispers."',
        hint: 'State your first deduction clearly with supporting quote, then your second deduction with supporting quote.',
        stems: 'What I can infer: ... • Details in Source A that tell me this: ...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 3.2: THE POLICE STATE AND RELIGIOUS CONTROL
    // ------------------------------------------------------------------------
    {
      lessonIndex: 1,
      lessonNum: 2,
      id: 'lesson_3_2',
      keyTopicBadge: 'KEY TOPIC 3.2',
      title: 'KT3.2: The Police State and Religious Control',
      enquiryQuestion:
        'How effectively did the SS, Gestapo, courts, and religious policies terrorise and control the German population?',
      specAnchor:
        "Police State & Religion: SS, SD, and Gestapo; concentration camps (Dachau); legal system and People's Court; policies towards Catholic and Protestant churches; Confessing Church.",
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why the Nazi police state and control over the churches was effective in the years 1933–1939. [12 marks]',
      stimulus: ['The role of the Gestapo and SS', 'The Concordat with the Catholic Church (1933)'],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        "Heinrich Himmler &bull; Schutzstaffel (SS) &bull; Reinhard Heydrich &bull; Gestapo &bull; Dachau (1933) &bull; People's Court &bull; Concordat (1933) &bull; Reich Church &bull; Ludwig Müller &bull; Confessing Church &bull; Martin Niemöller",
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 3.2). In the drawing box, sketch a Gestapo interrogation file alongside a swastika placed on a church altar. Annotate how the regime combined secret terror with control over spiritual life.',
      leftPageQuip:
        'The Gestapo had fewer than 30,000 officers for 65 million Germans; it ran on thousands of voluntary denunciations from ordinary neighbours.',
      rightPageQuip:
        'Dachau opened in March 1933 for political prisoners; its razor wire was the ultimate deterrent against public protest.',
      linedLeftQuip:
        'Judges wore swastikas on their robes and sworn loyalty to the Führer; trial by jury was abolished for all political crimes.',
      linedRightQuip:
        'Explain the dual control: the SS and Gestapo crushed physical dissent; the Concordat and Reich Church attempted to control spiritual loyalty.',
      stages: [
        {
          dates: '1933–1934',
          title: 'Heinrich Himmler & The SS Empire',
          bullets: [
            'Expanding blackshirt protection squad into national force',
            'Opening first concentration camp at Dachau for Communists',
            'Enforcing strict Aryan racial ancestry checks for recruits',
          ],
          focusClue: 'How did the SS evolve into the regime’s ideological army and camp master?',
        },
        {
          dates: '1933–1939',
          title: 'The Gestapo & Network of Informers',
          bullets: [
            "Operating without uniforms under Reinhard Heydrich's command",
            'Interrogating suspects under protective custody arrest warrants',
            'Relying on civilian tip-offs from neighbours and postmen',
          ],
          focusClue:
            'Why did ordinary civilian denunciations make the secret police seem omnipresent?',
        },
        {
          dates: '1933–1934',
          title: "Nazifying the Legal System & People's Court",
          bullets: [
            'Forcing judges to join National Socialist League of jurists',
            'Abolishing jury trials for serious political offences',
            'Roland Freisler screaming treason sentences in special courts',
          ],
          focusClue: 'How did the abolition of independent courts undermine the rule of law?',
        },
        {
          dates: 'Jul 1933',
          title: 'The Catholic Concordat & Papal Resistance',
          bullets: [
            'Signing diplomatic treaty with Vatican representative Pacelli',
            'Banning Catholic Centre Party while guaranteeing religious schooling',
            'Pope Pius XI smuggling anti-Nazi encyclical into pulpits',
          ],
          focusClue:
            'Why did the regime violate the Concordat and persecute Catholic youth groups?',
        },
        {
          dates: '1933–1937',
          title: 'The Reich Church & The Confessional Resistance',
          bullets: [
            'Uniting twenty-eight Protestant churches under Ludwig Müller',
            'Placing swastika flags and Mein Kampf copies on altars',
            'Martin Niemöller leading Pastor Emergency League into arrest',
          ],
          focusClue: 'Why did the creation of the Reich Church spark theological rebellion?',
        },
      ],
      fourMark: {
        type: 'Inference',
        tariffLabel: 'Question 1: Inference from Source B [4 marks]',
        stem: 'Give two things you can infer from Source B about public fear of the Gestapo in Nazi Germany.',
        provenance:
          'From an interview with a German factory worker who lived in Essen during the 1930s.',
        sourceExcerpt:
          '"You never knew who was listening. The man at the next workbench might be a party block warden, or the woman sweeping the hallway might report you for not giving the Hitler salute. People vanished overnight into protective custody. You learned to keep your head down and look straight ahead."',
        hint: 'State your first deduction clearly with supporting quote, then your second deduction with supporting quote.',
        stems: 'What I can infer: ... • Details in Source B that tell me this: ...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 3.3: CONTROLLING ATTITUDES (PROPAGANDA & CULTURE)
    // ------------------------------------------------------------------------
    {
      lessonIndex: 2,
      lessonNum: 3,
      id: 'lesson_3_3',
      keyTopicBadge: 'KEY TOPIC 3.3',
      title: 'KT3.3: Controlling and Influencing Attitudes',
      enquiryQuestion:
        'How did Joseph Goebbels use censorship, mass media, spectacle, and cultural control to indoctrinate the German people?',
      specAnchor:
        'Controlling Attitudes: Goebbels and Propaganda Ministry; censorship of press, radio, literature; rallies and Berlin 1936 Olympics; Reich Chamber of Culture; art, architecture, music.',
      tariff: 'Section B: Question 3(a) • Utility of Sources B & C [8 Marks &bull; 12 Mins]',
      scoreMax: '8',
      examStem:
        'How useful are Sources B and C for an enquiry into Nazi methods of controlling and influencing attitudes in the years 1933–1939? [8 marks]',
      stimulus: [
        'The Ministry of Popular Enlightenment and Propaganda',
        'The Nuremberg Rallies and the 1936 Berlin Olympics',
      ],
      connectives:
        'Source B is useful because it reveals... &bull; From my own knowledge, this is accurate because... &bull; However, the provenance makes it valuable because... &bull; Similarly, Source C demonstrates that... &bull; In evaluating both, they are useful because...',
      wordBank:
        'Joseph Goebbels &bull; Propaganda Ministry &bull; Reich Chamber of Culture &bull; Volksempfänger &bull; Editorial Law (1933) &bull; Book burnings &bull; Nuremberg Rallies &bull; Cathedral of Light &bull; 1936 Berlin Olympics &bull; Degenerate Art',
      timelineMission:
        "Turn to Pages 2–3 (Key Topic 3.3). In the drawing box, sketch a Volksempfänger radio broadcasting Hitler's voice alongside the searchlights of the Nuremberg Cathedral of Light. Annotate how propaganda saturated daily life.",
      leftPageQuip:
        'May 1933: Students threw works by Marx, Freud, and Einstein into bonfires. "Where they burn books, they will ultimately burn people."',
      rightPageQuip:
        "The Volksempfänger cost just 35 marks; it lacked shortwave bands so Germans couldn't tune into foreign broadcasts.",
      linedLeftQuip:
        'The Nuremberg Rallies: 150 anti-aircraft searchlights created the Cathedral of Light, turning politics into religious theatre.',
      linedRightQuip:
        'Explain the total saturation: radio speeches at work, censored morning newspapers, and classical Aryan statues in city parks.',
      stages: [
        {
          dates: 'Mar–May 1933',
          title: 'Goebbels & The Reich Chamber of Culture',
          bullets: [
            'Creating Propaganda Ministry with seven specialized divisions',
            'Torching twenty thousand un-German books in university squares',
            'Requiring official licence for every professional journalist',
          ],
          focusClue: 'How did the Ministry enforce strict ideological conformity across all media?',
        },
        {
          dates: '1933–1939',
          title: 'Radio (Volksempfänger) & The Daily Press',
          bullets: [
            'Mass-producing cheap thirty-five-mark household receivers',
            'Broadcasting speeches through loudspeakers on factory floors',
            'Dictating daily front-page headlines at morning press conferences',
          ],
          focusClue: "Why was the affordable People's Receiver the most powerful propaganda tool?",
        },
        {
          dates: '1933–1938',
          title: 'Mass Rallies & The Cult of the Führer',
          bullets: [
            'Assembling hundreds of thousands at Zeppelin field in Nuremberg',
            'Lighting sky with hundred and fifty anti-aircraft searchlights',
            'Staging theatrical torchlight parades to celebrate national unity',
          ],
          focusClue: 'How did choreographed mass rallies overwhelm individual critical thought?',
        },
        {
          dates: 'Aug 1936',
          title: 'The Berlin Olympic Games Showcase',
          bullets: [
            'Building hundred-thousand-seat stadium decorated with swastikas',
            'Temporarily removing anti-Jewish street signs to deceive visitors',
            'Jesse Owens winning four sprinting gold medals on track',
          ],
          focusClue:
            'Why were the 1936 Olympics staged as an international showcase of Nazi success?',
        },
        {
          dates: '1937',
          title: 'Purging Culture: Degenerate Art vs Aryan Realism',
          bullets: [
            'Displaying modern paintings on crooked walls in Munich',
            'Banning jazz music and African-American syncopated rhythms',
            'Commissioning massive classical statues showing muscular Aryan bodies',
          ],
          focusClue: 'Why did the regime denounce modern artistic expression as degenerate?',
        },
      ],
      fourMark: {
        type: 'Difference',
        tariffLabel: 'Question 3(b): Difference in Views [4 marks]',
        stem: 'Study Interpretations 1 and 2. What is the main difference between the views on the effectiveness of Nazi propaganda?',
        provenance: 'From two historical analyses of Nazi propaganda and culture.',
        sourceExcerpt:
          'Interpretation 1 argues that propaganda brainwashed the German population into enthusiastic obedience. Interpretation 2 stresses that Germans grew cynical of repetitious speeches and simply conformed to avoid punishment.',
        hint: 'State the core difference in views directly, then support with specific quotes or details from both interpretations.',
        stems:
          'The main difference is that Interpretation 1 claims propaganda achieved total indoctrination because... whereas Interpretation 2 argues that people developed cynicism and only outwardly conformed because...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 3.4: OPPOSITION, RESISTANCE AND CONFORMITY
    // ------------------------------------------------------------------------
    {
      lessonIndex: 3,
      lessonNum: 4,
      id: 'lesson_3_4',
      keyTopicBadge: 'KEY TOPIC 3.4',
      title: 'KT3.4: Opposition, Resistance and Conformity',
      enquiryQuestion:
        'Why was active opposition to the Nazi regime so limited between 1933 and 1939, and how did youth and church groups resist?',
      specAnchor:
        'Opposition & Conformity: extent of support and conformity; worker and political underground opposition; youth groups (Edelweiss Pirates, Swing Youth); church resistance (Niemöller, Bonhoeffer, Galen).',
      tariff: 'Section B: Question 3(d) • Evaluative Assessment [16 Marks + 4 SPaG &bull; 25 Mins]',
      scoreMax: '16 (+4)',
      examStem:
        'How far do you agree with Interpretation 2 about opposition to the Nazi regime in the years 1933–1939? Explain your answer, using both interpretations and your knowledge of the historical context. [16 marks]',
      stimulus: [
        'Interpretation 1: Opposition was crushed and the majority actively conformed',
        'Interpretation 2: Genuine underground opposition persisted among youth and church groups',
      ],
      connectives:
        'To a large extent, Interpretation 1 is valid because... &bull; In particular, evidence shows that... &bull; On the other hand, Interpretation 2 rightly points out that... &bull; For instance, ... &bull; In conclusion, the more persuasive view is... because...',
      wordBank:
        'Conformity &bull; Gestapo fear &bull; KPD/SPD underground &bull; Rote Kapelle &bull; Edelweiss Pirates &bull; Swing Youth &bull; American jazz &bull; Martin Niemöller &bull; Dietrich Bonhoeffer &bull; Bishop Galen &bull; With Burning Concern (1937)',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 3.4). In the drawing box, sketch an Edelweiss flower badge alongside illegal jazz records of the Swing Youth. Annotate why young rebels rejected regimented Hitler Youth drills.',
      leftPageQuip:
        'The Edelweiss Pirates beat up Hitler Youth patrols and sang anti-Nazi songs; in Cologne, twelve were publicly hanged in 1944.',
      rightPageQuip:
        'The Swing Youth danced to banned American jazz in secret basements, mocking Aryan militarism with long hair and English coats.',
      linedLeftQuip:
        'Martin Niemöller spent eight years in concentration camps after declaring: "First they came for the socialists, and I did not speak out."',
      linedRightQuip:
        'Explain the distinction: active resistance was rare and dangerous, but passive non-conformity and grumbling were widespread.',
      stages: [
        {
          dates: '1933–1939',
          title: 'The Reality of Conformity & Everyday Grumbling',
          bullets: [
            'Delivering standard street greeting to avoid suspicion',
            'Benefiting from restored employment and autobahn public works',
            'Muttering jokes in private kitchens away from Gestapo ears',
          ],
          focusClue: 'Why did the majority of German citizens conform rather than openly resist?',
        },
        {
          dates: '1933–1938',
          title: "Left-Wing Underground Workers' Resistance",
          bullets: [
            'Printing illegal anti-fascist leaflets in hidden cellars',
            'Slowing down assembly lines and faking factory sickness',
            'Red Orchestra network smuggling industrial intelligence abroad',
          ],
          focusClue:
            'How did outlawed Communist and Socialist cells maintain clandestine resistance?',
        },
        {
          dates: '1936–1939',
          title: 'Youth Rebellion: The Edelweiss Pirates',
          bullets: [
            'Camping in wild countryside away from regimented drills',
            'Wearing metal flower badges and check shirts',
            'Beating up Hitler Youth patrols in dark alleys',
          ],
          focusClue: 'Why did working-class youth rebel against compulsory state youth movements?',
        },
        {
          dates: '1937–1939',
          title: 'Cultural Dissent: The Swing Youth',
          bullets: [
            'Playing illegal American jazz records in dance halls',
            'Growing long greasy hair and wearing English coats',
            'Gestapo raiding private basement parties in Hamburg',
          ],
          focusClue: 'How did middle-class youth use foreign music to reject Nazi conformity?',
        },
        {
          dates: '1937–1939',
          title: 'Religious Resistance: Niemöller & Galen',
          bullets: [
            'Martin Niemöller refusing to withdraw outspoken sermons',
            'Preaching to thousands before transfer to Sachsenhausen camp',
            'Bishop Galen preparing public protests against euthanasia killings',
          ],
          focusClue: 'Why did the regime hesitate to execute high-profile church critics?',
        },
      ],
      fourMark: {
        type: 'Reason',
        tariffLabel: 'Question 3(c): Reason for Difference [4 marks]',
        stem: 'Suggest one reason why Interpretations 1 and 2 give different views about opposition to the Nazi regime.',
        provenance: 'From two historical studies examining dissent in totalitarian Germany.',
        sourceExcerpt:
          'Historian 1 focuses on political party records, arrests, and the overwhelming conformity of the public. Historian 2 focuses on cultural youth rebellion, private diaries, and church sermons.',
        hint: 'Explain how the historians defined opposition differently (e.g. organized political revolt to overthrow Hitler vs non-conformist cultural rebellion).',
        stems:
          "One reason the interpretations differ is that the historians defined 'opposition' in different ways. Interpretation 1 defines opposition as organized political attempts to overthrow the regime, finding little evidence because... whereas Interpretation 2 includes cultural dissent and moral non-conformity such as...",
      },
    },
  ],

  // ==========================================================================
  // KEY TOPIC 4: LIFE IN NAZI GERMANY, 1933–1939
  // ==========================================================================
  KT4: [
    // ------------------------------------------------------------------------
    // ENQUIRY 4.1: NAZI POLICIES TOWARDS WOMEN
    // ------------------------------------------------------------------------
    {
      lessonIndex: 0,
      lessonNum: 1,
      id: 'lesson_4_1',
      keyTopicBadge: 'KEY TOPIC 4.1',
      title: 'KT4.1: Nazi Policies Towards Women',
      enquiryQuestion:
        'How and why did Nazi policies attempt to restrict women to traditional roles, and why did this policy reverse after 1937?',
      specAnchor:
        'Policies Towards Women: views on women and family; marriage laws and loans (1933); Mother’s Cross; Lebensborn; changes in employment (1933–37) and rearmament labor reversal (1937–39).',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why Nazi policies towards women changed in the years 1933–1939. [12 marks]',
      stimulus: [
        'The slogan Kinder, Küche, Kirche',
        'The demands of the rearmament economy after 1937',
      ],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Kinder, Küche, Kirche &bull; Law for Encouragement of Marriage (1933) &bull; Marriage loans &bull; Mother’s Cross (Bronze, Silver, Gold) &bull; Lebensborn &bull; Sterilisation law &bull; Duty Year &bull; Four-Year Plan &bull; Armaments industry &bull; Female conscription',
      timelineMission:
        "Turn to Pages 2–3 (Key Topic 4.1). In the drawing box, sketch a Mother's Cross medal alongside a woman working a lathe in a munitions factory. Annotate the contradiction between domestic ideology and military labour demands.",
      leftPageQuip:
        "The Mother's Cross: Bronze for four children, silver for six, gold for eight. Hitler Youth were ordered to salute gold medalists in the street.",
      rightPageQuip:
        '1933: Women were banned from professional jobs; by 1939, Goering was begging women to work in munitions factories.',
      linedLeftQuip:
        'Marriage loans gave 1,000 marks to newlyweds; for every child born, twenty-five percent of the debt was cancelled.',
      linedRightQuip:
        'Explain the ideological clash: Nazi racial theory demanded full-time mothers, but preparing for total war required female factory workers.',
      stages: [
        {
          dates: '1933',
          title: 'The Domestic Ideal: Kinder, Küche, Kirche',
          bullets: [
            'Banning female lawyers, doctors, and civil servants',
            'Reversing Weimar era educational and workplace gains',
            'Wearing plain unvarnished faces and braided traditional hair',
          ],
          focusClue: 'How did the regime attempt to remove women from public professions?',
        },
        {
          dates: 'Jun 1933',
          title: 'The Law for the Encouragement of Marriage',
          bullets: [
            'Offering thousand-mark interest-free vouchers to newlyweds',
            'Deducting twenty-five percent debt for each newborn infant',
            'Requiring bride to surrender permanent job upon wedding',
          ],
          focusClue:
            'How were financial loans used to encourage childbearing and lower unemployment?',
        },
        {
          dates: '1935–1938',
          title: "The Mother's Cross & Lebensborn Programme",
          bullets: [
            'Awarding gold medals for bearing eight or more children',
            'Hitler Youth required to salute medal-holders in street',
            'Establishing maternity homes for unmarried racially pure mothers',
          ],
          focusClue: 'How did honors and breeding centres aim to expand the Aryan population?',
        },
        {
          dates: '1933–1935',
          title: 'Forced Sterilisation & Eugenic Control',
          bullets: [
            'Enacting Law for Prevention of Hereditarily Diseased Offspring',
            'Sterilising three hundred thousand women with mental illnesses',
            'Barring couples with genetic disabilities from marriage licences',
          ],
          focusClue:
            'How did eugenics legislation enforce biological selection on German families?',
        },
        {
          dates: '1937–1939',
          title: 'Rearmament Demands & The Policy Reversal',
          bullets: [
            'Hermann Goering demanding female labour for munitions plants',
            'Compulsory Duty Year forcing unmarried girls into agriculture',
            'Seven million women working in factories by outbreak of war',
          ],
          focusClue:
            'Why did the Four-Year Plan force the regime to abandon its domestic ideology?',
        },
      ],
      fourMark: {
        type: 'Inference',
        tariffLabel: 'Question 1: Inference from Source A [4 marks]',
        stem: 'Give two things you can infer from Source A about Nazi propaganda aimed at German mothers.',
        provenance:
          'From an official Nazi propaganda booklet, The German Mother and Her Children, published in Berlin, 1936.',
        sourceExcerpt:
          '"The German woman does not long for the vote or the office desk. Her holy mission is the creation and preservation of the German family. She must be the source of strength for her husband and the teacher of heroic values to her sons, sending healthy soldiers to serve the Führer."',
        hint: 'State your first deduction clearly with supporting quote, then your second deduction with supporting quote.',
        stems: 'What I can infer: ... • Details in Source A that tell me this: ...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 4.2: NAZI POLICIES TOWARDS THE YOUNG
    // ------------------------------------------------------------------------
    {
      lessonIndex: 1,
      lessonNum: 2,
      id: 'lesson_4_2',
      keyTopicBadge: 'KEY TOPIC 4.2',
      title: 'KT4.2: Nazi Policies Towards the Young',
      enquiryQuestion:
        'How did the Nazi regime use schooling, teacher purges, and youth organisations to indoctrinate German children?',
      specAnchor:
        'Policies Towards the Young: Hitler Youth and League of German Girls (BDM); education policies (curriculum, textbooks); control of teachers (NSLB); elite schools (Napolas).',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why the Nazi regime placed such high importance on controlling the youth in the years 1933–1939. [12 marks]',
      stimulus: ['The Hitler Youth and BDM', 'Changes to the school curriculum'],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        "Hitler Youth (HJ) &bull; Baldur von Schirach &bull; League of German Girls (BDM) &bull; Compulsory membership (1939) &bull; Nazi Teachers' League (NSLB) &bull; Racial biology &bull; Physical education (15%) &bull; Adolf Hitler Schools &bull; Napolas &bull; Indoctrination",
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 4.2). In the drawing box, sketch a Hitler Youth boy practicing rifle shooting alongside a school mathematics textbook showing bombing trajectory calculations. Annotate how education was completely militarized.',
      leftPageQuip:
        'Hitler declared: "These boys and girls enter our organisations at ten, and they never get free again until their death."',
      rightPageQuip:
        'Maths problems asked pupils to calculate the cost of caring for the disabled; history taught that Aryans created all world civilization.',
      linedLeftQuip:
        "97% of teachers joined the Nazi Teachers' League; any teacher who refused to give the Hitler salute was sacked immediately.",
      linedRightQuip:
        'Explain the totalitarian design: classroom lessons built racial prejudice; weekend youth camps built military toughness.',
      stages: [
        {
          dates: '1933–1936',
          title: 'The Hitler Youth (Hitlerjugend) for Boys',
          bullets: [
            'Training boys in compass reading and trench warfare',
            'Marching on overnight hikes carrying heavy military packs',
            'Passing fitness tests before receiving official pocket knives',
          ],
          focusClue: 'How did the Hitler Youth prepare boys for future conscription and combat?',
        },
        {
          dates: '1933–1936',
          title: 'The League of German Girls (Bund Deutscher Mädel)',
          bullets: [
            'Exercising in blue skirts and white blouses outdoors',
            'Learning domestic cooking and infant hygiene skills',
            'Singing campfire folk songs celebrating racial community',
          ],
          focusClue: 'How did the BDM train adolescent girls for motherhood and domestic duty?',
        },
        {
          dates: '1936–1939',
          title: 'Compulsory Youth Membership & Resistance',
          bullets: [
            'Banning rival church youth groups and scout troops',
            'Passing law making youth service compulsory for all children',
            'Drafting eight million children into uniform by war outbreak',
          ],
          focusClue: 'Why did the regime make youth group attendance legally compulsory in 1939?',
        },
        {
          dates: '1933–1937',
          title: "Purging Teachers & The Nazi Teachers' League",
          bullets: [
            'Firing Jewish and politically unreliable educators from classrooms',
            'Ninety-seven percent of teachers joining national league',
            'Attending compulsory ideological camps during school holidays',
          ],
          focusClue:
            'How did the regime ensure that school teachers actively delivered propaganda?',
        },
        {
          dates: '1933–1939',
          title: 'Indoctrinating the Curriculum & Elite Schools',
          bullets: [
            'Allocating fifteen percent of timetable to physical fitness',
            'Calculating military bombing runs in mathematics word problems',
            'Establishing Napolas and Adolf Hitler boarding academies for leaders',
          ],
          focusClue:
            'How were academic subjects rewritten to reinforce racial theory and militarism?',
        },
      ],
      fourMark: {
        type: 'Inference',
        tariffLabel: 'Question 1: Inference from Source B [4 marks]',
        stem: 'Give two things you can infer from Source B about physical training in the Hitler Youth.',
        provenance: 'From an account by a former Hitler Youth member, written after the war.',
        sourceExcerpt:
          '"We were out in all weathers, marching twenty miles with sixty-pound packs until our boots were full of blood. Weaklings were ridiculed before the whole squad. Everything was competition: obstacle courses, wrestling, bayonet practice. They told us that German boys must be swift as greyhounds, tough as leather, and hard as Krupp steel."',
        hint: 'State your first deduction clearly with supporting quote, then your second deduction with supporting quote.',
        stems: 'What I can infer: ... • Details in Source B that tell me this: ...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 4.3: EMPLOYMENT AND LIVING STANDARDS
    // ------------------------------------------------------------------------
    {
      lessonIndex: 2,
      lessonNum: 3,
      id: 'lesson_4_3',
      keyTopicBadge: 'KEY TOPIC 4.3',
      title: 'KT4.3: Employment and Living Standards',
      enquiryQuestion:
        'Did the standard of living improve for German workers under Nazi rule between 1933 and 1939?',
      specAnchor:
        'Employment & Living Standards: reduction of unemployment (RAD, autobahns, rearmament, conscription); invisible unemployment; Labour Front (DAF), Strength Through Joy (KdF), Beauty of Labour (SdA); real wages vs cost of living.',
      tariff: 'Question 2: Explain Why [12 marks &bull; 15 mins]',
      scoreMax: '12',
      examStem:
        'Explain why the standard of living for German workers changed in the years 1933–1939. [12 marks]',
      stimulus: [
        'The German Labour Front (DAF) and KdF',
        'The impact of rearmament and public works',
      ],
      connectives:
        'One main reason was that... &bull; For example, ... &bull; This was important because... &bull; Another key factor was... &bull; In particular, ... &bull; Overall, the most decisive reason was... because...',
      wordBank:
        'Reich Labour Service (RAD) &bull; Autobahn &bull; Rearmament &bull; Military conscription (1935) &bull; Invisible unemployment &bull; German Labour Front (DAF) &bull; Robert Ley &bull; Strength Through Joy (KdF) &bull; Beauty of Labour (SdA) &bull; Volkswagen scheme',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 4.3). In the drawing box, sketch a worker shoveling on an autobahn construction site alongside a KdF cruise brochure. Annotate how full employment was paired with long hours and lost strike rights.',
      leftPageQuip:
        'Unemployment dropped from six million to zero on paper, but Jews, women, and conscripts were wiped off the official registers.',
      rightPageQuip:
        'The Volkswagen scheme: 330,000 workers paid five marks a week into stamp books, but not a single civilian ever received a car.',
      linedLeftQuip:
        'The DAF took over all trade unions: workers could not strike or change jobs without permission, and weekly hours jumped to 47.',
      linedRightQuip:
        'Explain the standard of living balance: steady wages and cheap theatre tickets on one hand; frozen pay and butter shortages on the other.',
      stages: [
        {
          dates: 'May 1933',
          title: 'Smashed Unions & The German Labour Front (DAF)',
          bullets: [
            'Arresting union bosses and seizing headquarters buildings',
            'Robert Ley establishing single compulsory state labour organisation',
            'Outlawing strikes and freezing basic hourly wages',
          ],
          focusClue: 'How did the DAF destroy independent collective bargaining for wages?',
        },
        {
          dates: '1933–1935',
          title: 'The Reich Labour Service (RAD) & Public Works',
          bullets: [
            'Sending young men to live in barracks for six months',
            'Shovelling dirt without machinery to build motorways',
            'Earning pocket money while wearing spade badge uniforms',
          ],
          focusClue:
            'How did public works and motorway construction artificially reduce jobless figures?',
        },
        {
          dates: '1935–1939',
          title: 'Conscription & "Invisible Unemployment"',
          bullets: [
            'Reintroducing military draft for half a million youths',
            'Excluding unmarried women and dismissed Jews from counts',
            'Arresting political opponents as asocials in workhouses',
          ],
          focusClue: 'Why was the Nazi claim of full employment statistically misleading?',
        },
        {
          dates: '1933–1939',
          title: 'Strength Through Joy (KdF) & Beauty of Labour (SdA)',
          bullets: [
            'Booking subsidized Mediterranean cruises for factory staff',
            'Saving five marks weekly toward stamp book for car',
            'Installing factory canteens and improved workshop ventilation',
          ],
          focusClue: 'How did leisure schemes compensate workers for lost political rights?',
        },
        {
          dates: '1936–1939',
          title: 'Four-Year Plan: Guns vs Butter Dilemma',
          bullets: [
            'Goering prioritizing steel factories over consumer goods',
            'Working hours climbing to forty-seven per week',
            'Rationing butter and meat while synthetic petrol developed',
          ],
          focusClue: 'How did total rearmament erode real worker purchasing power by 1939?',
        },
      ],
      fourMark: {
        type: 'Difference',
        tariffLabel: 'Question 3(b): Difference in Views [4 marks]',
        stem: 'Study Interpretations 1 and 2. What is the main difference between the views on living standards for German workers under Nazi rule?',
        provenance:
          'From two historical assessments of the German working class under the Third Reich.',
        sourceExcerpt:
          'Interpretation 1 stresses that workers benefited from full employment, stable wages, and KdF holidays. Interpretation 2 highlights that real wages fell, hours lengthened, trade union rights were abolished, and food prices rose sharply.',
        hint: 'State the core difference in views directly, then support with specific quotes or details from both interpretations.',
        stems:
          'The main difference is that Interpretation 1 argues living standards improved because of full employment and leisure schemes, whereas Interpretation 2 claims workers were exploited because real wages fell and working hours increased...',
      },
    },

    // ------------------------------------------------------------------------
    // ENQUIRY 4.4: THE PERSECUTION OF MINORITIES
    // ------------------------------------------------------------------------
    {
      lessonIndex: 3,
      lessonNum: 4,
      id: 'lesson_4_4',
      keyTopicBadge: 'KEY TOPIC 4.4',
      title: 'KT4.4: The Persecution of Minorities',
      enquiryQuestion:
        'How and why did Nazi persecution of Jews and other minority groups escalate between 1933 and 1939?',
      specAnchor:
        'Persecution of Minorities: racial hierarchy and Herrenvolk; persecution of disabled, Roma, and homosexuals; anti-Semitic measures (1933 boycott, 1935 Nuremberg Laws, 1938 Kristallnacht).',
      tariff: 'Section B: Question 3(d) • Evaluative Assessment [16 Marks + 4 SPaG &bull; 25 Mins]',
      scoreMax: '16 (+4)',
      examStem:
        'How far do you agree with Interpretation 2 about the persecution of minorities in Nazi Germany in the years 1933–1939? Explain your answer, using both interpretations and your knowledge of the historical context. [16 marks]',
      stimulus: [
        'Interpretation 1: Persecution escalated through gradual legal and economic exclusion',
        'Interpretation 2: State-directed violence and terror like Kristallnacht were the decisive turning points',
      ],
      connectives:
        'To a large extent, Interpretation 1 is valid because... &bull; In particular, evidence shows that... &bull; On the other hand, Interpretation 2 rightly points out that... &bull; For instance, ... &bull; In conclusion, the more persuasive view is... because...',
      wordBank:
        'Herrenvolk &bull; Untermenschen &bull; Social Darwinism &bull; 1933 Shop Boycott &bull; Nuremberg Laws (1935) &bull; Reich Citizenship Law &bull; Law for Protection of German Blood &bull; Kristallnacht (Nov 1938) &bull; Herschel Grynszpan &bull; Reinhard Heydrich &bull; One-billion-mark fine',
      timelineMission:
        'Turn to Pages 2–3 (Key Topic 4.4). In the drawing box, sketch a Jewish shopfront daubed with "Jude" alongside the burning synagogues of Kristallnacht. Annotate the escalation from economic boycotts to violent state pogroms.',
      leftPageQuip:
        '1935: The Nuremberg Laws stripped German Jews of citizenship and outlawed marriage with Aryans, reducing them to second-class subjects.',
      rightPageQuip:
        'November 1938: Kristallnacht saw 91 Jews murdered, 1,000 synagogues burned, and 30,000 men sent to camps; the community was then fined 1 billion marks.',
      linedLeftQuip:
        'Persecution was not limited to Jews: 300,000 disabled Germans were forcibly sterilised, while Roma and homosexuals were shipped to camps.',
      linedRightQuip:
        'Explain the causal progression: legal disenfranchisement in 1935 isolated the victims before state violence exploded in 1938.',
      stages: [
        {
          dates: '1933',
          title: 'Aryan Supremacy & The April Anti-Jewish Boycott',
          bullets: [
            'Placing Aryans atop biological hierarchy and others beneath',
            'Stormtroopers standing outside department stores with placards',
            'Excluding Jewish civil servants from government administrative posts',
          ],
          focusClue:
            'How did the regime initiate public state-sponsored antisemitic discrimination?',
        },
        {
          dates: 'Sep 1935',
          title: 'The Nuremberg Laws (Citizenship & Blood Protection)',
          bullets: [
            'Stripping German Jews of civil rights and passport vote',
            'Outlawing marriage and sexual relations with German blood',
            'Classifying citizens through grandfather parish baptism records',
          ],
          focusClue: 'Why did the Nuremberg Laws turn antisemitism into legal statute?',
        },
        {
          dates: '1933–1938',
          title: 'Persecution of Roma, Homosexuals & The Disabled',
          bullets: [
            'Deporting Roma into municipal camps on city outskirts',
            'Sending pink-triangle prisoners to concentration camp barracks',
            'Compulsorily sterilising patients diagnosed with schizophrenia',
          ],
          focusClue: 'How did racial hygiene theories target groups outside the racial community?',
        },
        {
          dates: '9–10 Nov 1938',
          title: 'Kristallnacht (The Night of Broken Glass)',
          bullets: [
            'Goebbels ordering SA in plain clothes into streets',
            'Shattering windows of seven thousand Jewish shops',
            'Burning thousand synagogues as police instructed to watch',
          ],
          focusClue:
            'How did the November pogrom mark a decisive shift toward violent state terror?',
        },
        {
          dates: '1938–1939',
          title: 'Economic Expropriation & Forced Emigration',
          bullets: [
            'Imposing one-billion-mark fine on community for damages',
            'Banning children from attending German state primary schools',
            'Central Office for Jewish Emigration expelling thousands penniless',
          ],
          focusClue:
            'How did the regime eliminate all remaining Jewish participation in economic life?',
        },
      ],
      fourMark: {
        type: 'Reason',
        tariffLabel: 'Question 3(c): Reason for Difference [4 marks]',
        stem: 'Suggest one reason why Interpretations 1 and 2 give different views on the events of Kristallnacht in November 1938.',
        provenance: 'From two historical studies analyzing the November 1938 pogrom.',
        sourceExcerpt:
          'Interpretation 1 focuses on Nazi propaganda depicting the pogrom as a spontaneous public reaction to the Paris assassination. Interpretation 2 focuses on confidential police orders and SS documents proving the violence was centrally organized.',
        hint: 'Explain how the historians relied on different types of evidence (e.g. public press reports vs confidential state telexes).',
        stems:
          'One reason the interpretations differ is that the historians used different types of sources. Interpretation 1 gave weight to public newspaper reports like the Völkischer Beobachter which claimed... whereas Interpretation 2 relied on secret police telexes from Heydrich which proved...',
      },
    },
  ],
};

module.exports = {
  WEIMAR_ENQUIRY_CONFIGS,
};
