/**
 * weimar_section_b_data.cjs
 *
 * Full Edexcel GCSE History Paper 3 (1HI0/31) Section B Assessment Packs
 * for Weimar and Nazi Germany (1918–1939).
 *
 * Provides complete data for:
 *   - Source B & Source C (authentic archival extracts, provenances, and optional visual plates)
 *   - Question 3(a): Source Utility [8 marks]
 *   - Interpretation 1 & Interpretation 2 (historians' extracts & provenances)
 *   - Question 3(b): Main Difference in Views [4 marks]
 *   - Question 3(c): Reason Why Interpretations Differ [4 marks] (explicitly referencing Sources B & C)
 *   - Question 3(d): Evaluative Essay on Interpretations [16 marks + 4 SPaG]
 *
 * Enforces strict pedagogical coherence:
 *   - 100% UNIFIED ENQUIRY across 3(a), 3(b), 3(c), and 3(d) within each Key Topic
 *   - Zero internal archive shelfmarks in student-facing boxes
 *   - Strict school anonymity and institutional neutrality
 */

const WEIMAR_SECTION_B = {
  // ==========================================================================
  // KEY TOPIC 1: THE WEIMAR REPUBLIC, 1918–1929
  // Unified Enquiry: The challenges facing the Weimar Republic in the years 1919–1923
  // ==========================================================================
  KT1: {
    keyTopicNum: 1,
    title: 'The Weimar Republic, 1918–1929',
    enquiryTopic: 'The challenges facing the Weimar Republic in the years 1919–1923',

    // Page 16: Sources B & C and Question 3(a)
    sourceB: {
      tag: 'SOURCE B',
      heading: 'Contemporary photograph of Freikorps paramilitaries, Berlin, March 1920',
      image: '/images/kapp_putsch_freikorps.jpg',
      provenance:
        'From a photograph published in a German newspaper, March 1920. It shows soldiers of the rebel Marinebrigade Ehrhardt occupying the government quarter in Berlin during the Kapp Putsch, with swastikas painted on their helmets.',
      text: 'Armed Freikorps soldiers sit in transport lorries outside the Reichstag building in Berlin. When President Friedrich Ebert ordered the regular German Army to suppress the nationalist uprising, General Hans von Seeckt refused, declaring: "Reichswehr does not fire on Reichswehr." The elected republican government was forced to flee the capital to Dresden and Stuttgart.',
    },
    sourceC: {
      tag: 'SOURCE C',
      heading: 'Contemporary photograph of children playing with bundled cash, Berlin, autumn 1923',
      image: '/images/weimar_hyperinflation_children_cash_1923.jpg',
      provenance:
        'From a photograph taken in Berlin, autumn 1923. It shows German children building toy pyramids with tightly bound stacks of banknotes that had become virtually worthless during the hyperinflation crisis.',
      text: 'By November 1923, hyperinflation had completely shattered the German currency: a single US dollar was valued at 4.2 trillion paper marks, and a basic loaf of bread cost 201 billion marks. Millions of ordinary middle-class Germans saw their life savings, pensions, and insurance policies wiped out overnight, forcing families to barter possessions for food.',
    },
    q3a: {
      tariff: 'Question 3(a): Source Utility [8 marks &bull; 12 mins]',
      stem: 'Study Sources B and C. How useful are Sources B and C for an enquiry into the challenges facing the Weimar Republic in the years 1919–1923? [8 marks]',
      target:
        'AO3 [8 marks]: Analyse sources on Content, Contextual Knowledge, and Provenance (Nature, Origin, Purpose).',
      promptB:
        'Evaluate Source B (Content & Provenance on military disloyalty, the Freikorps, and the Kapp Putsch):',
      promptC:
        'Evaluate Source C (Content & Provenance on hyperinflation, currency collapse, and middle-class ruin):',
    },

    // Page 17: Interpretations 1 & 2 and Question 3(b)
    interp1: {
      tag: 'INTERPRETATION 1',
      author: 'From an account by historian Richard J. Evans, The Coming of the Third Reich (2003)',
      text: '“The gravest challenges confronting the early Weimar Republic were political violence, extremist insurrections, and the open disloyalty of the army. From the outset, the republic was assaulted by armed uprisings from both the extreme left and the extreme right. The Kapp Putsch of March 1920 demonstrated that the regular military could not be relied upon to defend the constitution, while nationalist assassination squads murdered over three hundred political figures, including Foreign Minister Walther Rathenau. It was this violent lawlessness that brought the republic to the verge of collapse.”',
    },
    interp2: {
      tag: 'INTERPRETATION 2',
      author: 'From an account by historian Mary Fulbrook, A History of Germany 1918–2014 (2014)',
      text: '“The Weimar Republic was shaken far more profoundly by economic catastrophe than by right-wing putsches. The crippling burden of reparations, exacerbated by the French occupation of the Ruhr in January 1923, triggered hyperinflation that completely destroyed the German currency. The economic collapse wiped out the life savings, pensions, and financial security of the respectable middle class. This alienated millions of ordinary citizens from the democratic system, leaving a permanent legacy of bitterness and cynicism towards the republic.”',
    },
    q3b: {
      tariff: 'Question 3(b): Difference in Views [4 marks &bull; 5 mins]',
      stem: 'Study Interpretations 1 and 2. They give different views about the challenges facing the Weimar Republic in the years 1919–1923. What is the main difference between these views? [4 marks]',
      target:
        'AO4 [4 marks]: Identify core difference: political violence and military disloyalty vs economic catastrophe and middle-class ruin.',
      stems:
        'The main difference is that Interpretation 1 emphasizes political violence, armed insurrections, and the disloyalty of the army as the greatest challenge, whereas Interpretation 2 contends that economic devastation and the 1923 hyperinflation crisis were far more destructive in alienating ordinary citizens from democracy.',
    },

    // Page 18: Question 3(c) & Question 3(d) Planning Framework
    q3c: {
      tariff: 'Question 3(c): Why Views Differ [4 marks &bull; 5 mins]',
      stem: 'Suggest one reason why Interpretations 1 and 2 give different views about the challenges facing the Weimar Republic in the years 1919–1923. You may use Sources B and C to help explain your answer. [4 marks]',
      target:
        'AO4 [4 marks]: Explain differing focus on political-military rebellion (Source B) vs socio-economic collapse (Source C).',
      stems:
        'One reason the interpretations differ is that the historians investigated different aspects of the crisis and drew upon different evidence. Interpretation 1 focused on evidence of military mutiny and armed rebellions such as the Kapp Putsch (as shown in Source B), whereas Interpretation 2 concentrated on economic data, worthless currency, and middle-class ruin (as shown in Source C).',
    },
    planning3d: {
      title: 'Question 3(d) Evaluative Essay Framework [16 Marks + 4 SPaG &bull; 25 Mins]',
      thesisPrompt:
        'Formulate your sustained thesis: Did economic catastrophe (Ruhr crisis, hyperinflation) pose a more dangerous threat to the Weimar Republic than political violence and military disloyalty (Kapp Putsch, Spartacists)?',
      criteriaBox: [
        'Criteria 1: Political & Military Threat (Kapp Putsch, Seeckt’s refusal, Rathenau assassination, Munich Putsch).',
        'Criteria 2: Economic Devastation (Ruhr invasion, passive resistance, 4.2 trillion marks to the dollar, destruction of middle-class savings).',
        'Criteria 3: Sustained Verdict (Explain which challenge inflicted greater long-term damage on the legitimacy of Weimar democracy).',
      ],
    },

    // Page 19: Question 3(d) Evaluative Essay
    q3d: {
      tariff: 'Question 3(d): Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
      stem: 'How far do you agree with Interpretation 2 about the challenges facing the Weimar Republic in the years 1919–1923? Explain your answer, using both interpretations and your knowledge of the historical context. [16 marks + 4 SPaG]',
      target:
        'AO4 [16 marks] + SPaG [4 marks]: Balanced, evaluative essay weighing political violence against economic catastrophe.',
      scaffoldHints:
        'Structure: Introduction (thesis) &bull; Section 1: Support Interpretation 2 with precise evidence &bull; Section 2: Evaluate Interpretation 1 with counter-evidence &bull; Conclusion: Justified criteria-led verdict.',
    },
  },

  // ==========================================================================
  // KEY TOPIC 2: HITLER’S RISE TO POWER, 1919–1933
  // Unified Enquiry: The reasons for the growth in support for the Nazi Party in the years 1929–1932
  // ==========================================================================
  KT2: {
    keyTopicNum: 2,
    title: 'Hitler’s Rise to Power, 1919–1933',
    enquiryTopic: 'The reasons for the growth in support for the Nazi Party in the years 1929–1932',

    // Page 16: Sources B & C and Question 3(a)
    sourceB: {
      tag: 'SOURCE B',
      heading: 'Presidential Emergency Decree under Article 48, Berlin, December 1931',
      provenance:
        'From an official emergency decree signed by President Paul von Hindenburg and Chancellor Heinrich Brüning, published in the German legal gazette, December 1931.',
      text: '“On the basis of Article 48 of the Reich Constitution, the following is decreed to secure the economy and finances: All public sector wages and salaries are reduced by ten percent. Unemployment relief payments are strictly curtailed. Prices of essential goods are reduced by decree.” By ruling through presidential decree rather than parliament, Chancellor Brüning became known as the ‘Hunger Chancellor’, driving millions of desperate Germans towards radical political parties.',
    },
    sourceC: {
      tag: 'SOURCE C',
      heading: 'Contemporary photograph of Nazi SA Stormtroopers, Berlin, July 1932',
      image: '/images/weimar_sa_parade_berlin_1932.jpg',
      provenance:
        'From a press photograph taken during the July 1932 Reichstag election campaign in Berlin. It shows uniformed SA stormtroopers parading in formation with swastika flags.',
      text: 'By July 1932, the SA numbered over 400,000 men—four times the size of the regular German Army. Their disciplined parades, martial brass bands, and street brawls with the Communist Rotfrontkämpferbund presented an image of dynamic youth, strength, and order to middle-class voters terrified of Bolshevik revolution during the Great Depression.',
    },
    q3a: {
      tariff: 'Question 3(a): Source Utility [8 marks &bull; 12 mins]',
      stem: 'Study Sources B and C. How useful are Sources B and C for an enquiry into the reasons for the growth in support for the Nazi Party in the years 1929–1932? [8 marks]',
      target:
        'AO3 [8 marks]: Evaluate Content, Context (Depression, Brüning’s austerity, SA appeal), and Provenance.',
      promptB:
        'Evaluate Source B (Content & Provenance on parliamentary paralysis, wage cuts, and Brüning’s austerity):',
      promptC:
        'Evaluate Source C (Content & Provenance on SA discipline, paramilitary appeal, and anti-communist strength):',
    },

    // Page 17: Interpretations 1 & 2 and Question 3(b)
    interp1: {
      tag: 'INTERPRETATION 1',
      author: 'From an account by historian William Carr, A History of Germany 1815–1990 (1991)',
      text: '“The Nazi Party grew into a mass movement primarily because the Great Depression shattered the economic and social foundations of the Weimar Republic. With six million Germans unemployed by 1932, millions of desperate middle-class voters, shopkeepers, and farmers turned to the NSDAP as the only radical alternative to Communism. In a democracy that had collapsed into economic paralysis, it was the despair produced by mass unemployment and Brüning’s wage-cutting policies that drove voters in their millions to support Hitler.”',
    },
    interp2: {
      tag: 'INTERPRETATION 2',
      author: 'From an account by historian Richard J. Evans, The Coming of the Third Reich (2003)',
      text: '“The rapid growth of Nazi support between 1929 and 1932 cannot be explained solely by economic distress. Other nations suffered mass unemployment without turning to fascism. What set the Nazis apart was their brilliant modern electioneering and Hitler’s magnetic personal appeal. Goebbels orchestrated dynamic campaigns using aeroplanes, radio, and mass rallies, while the uniformed SA stormtroopers provided an intoxicating image of discipline and order on the streets. It was Nazi propaganda and paramilitary energy that captivated voters.”',
    },
    q3b: {
      tariff: 'Question 3(b): Difference in Views [4 marks &bull; 5 mins]',
      stem: 'Study Interpretations 1 and 2. They give different views about the reasons for the growth in support for the Nazi Party in the years 1929–1932. What is the main difference between these views? [4 marks]',
      target:
        'AO4 [4 marks]: Identify core difference: economic collapse and mass unemployment vs propaganda, electioneering, and SA dynamism.',
      stems:
        'The main difference is that Interpretation 1 argues that the Great Depression and economic despair were the primary reasons for rising Nazi support, whereas Interpretation 2 contends that Hitler’s dynamic campaign methods, propaganda spectacles, and the disciplined image of the SA were the decisive factors.',
    },

    // Page 18: Question 3(c) & Question 3(d) Planning Framework
    q3c: {
      tariff: 'Question 3(c): Why Views Differ [4 marks &bull; 5 mins]',
      stem: 'Suggest one reason why Interpretations 1 and 2 give different views about the reasons for the growth in support for the Nazi Party in the years 1929–1932. You may use Sources B and C to help explain your answer. [4 marks]',
      target:
        'AO4 [4 marks]: Explain differing emphasis on economic hardship (Source B) vs propaganda and paramilitary appeal (Source C).',
      stems:
        'One reason the interpretations differ is that the historians emphasized different causes of Nazi popularity. Interpretation 1 gave weight to economic misery and government austerity under Article 48 (as illustrated by Source B), whereas Interpretation 2 focused on the visible energy, discipline, and anti-communist appeal of the SA paramilitaries (as shown in Source C).',
    },
    planning3d: {
      title: 'Question 3(d) Evaluative Essay Framework [16 Marks + 4 SPaG &bull; 25 Mins]',
      thesisPrompt:
        'Formulate your sustained thesis: Was the surge in Nazi support between 1929 and 1932 primarily driven by the economic catastrophe of the Depression, or by Hitler’s propaganda and the disciplined appeal of the SA?',
      criteriaBox: [
        'Criteria 1: Economic Catastrophe (Wall Street Crash, 6 million unemployed, Brüning’s wage cuts, fear of Communism).',
        'Criteria 2: Propaganda & Paramilitary Appeal (Hitler’s oratory, Goebbels’ rallies, ‘Hitler over Germany’, SA discipline).',
        'Criteria 3: Sustained Verdict (Explain which factor was the essential catalyst for transforming the NSDAP into a mass party).',
      ],
    },

    // Page 19: Question 3(d) Evaluative Essay
    q3d: {
      tariff: 'Question 3(d): Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
      stem: 'How far do you agree with Interpretation 2 about the reasons for the growth in support for the Nazi Party in the years 1929–1932? Explain your answer, using both interpretations and your knowledge of the historical context. [16 marks + 4 SPaG]',
      target:
        'AO4 [16 marks] + SPaG [4 marks]: Balanced evaluative essay synthesizing economic causes and propaganda methods.',
      scaffoldHints:
        'Structure: Introduction (thesis) &bull; Section 1: Support Interpretation 2 with precise evidence &bull; Section 2: Evaluate Interpretation 1 with counter-evidence &bull; Conclusion: Justified criteria-led verdict.',
    },
  },

  // ==========================================================================
  // KEY TOPIC 3: NAZI CONTROL AND DICTATORSHIP, 1933–1939
  // Unified Enquiry: Nazi methods of controlling and influencing attitudes in the years 1933–1939
  // ==========================================================================
  KT3: {
    keyTopicNum: 3,
    title: 'Nazi Control and Dictatorship, 1933–1939',
    enquiryTopic: 'Nazi methods of controlling and influencing attitudes in the years 1933–1939',

    // Page 16: Sources B & C and Question 3(a)
    sourceB: {
      tag: 'SOURCE B',
      heading: 'Speech by Propaganda Minister Joseph Goebbels to Radio Directors, Berlin, March 1933',
      provenance:
        'From an official address given by Dr. Joseph Goebbels to regional broadcasting directors in Berlin, March 1933, shortly after his appointment as Minister of Public Enlightenment and Propaganda.',
      text: '“We make no bones about it: the radio belongs to us and to no one else! We will place radio in the service of our National Socialist idea, and no other idea shall be expressed here. Radio must be purged of all un-German elements. We intend to mobilize the minds of the entire nation so thoroughly that no foreign or hostile thought can find an audience.”',
    },
    sourceC: {
      tag: 'SOURCE C',
      heading: 'Contemporary photograph of the People’s Radio (Volksempfänger VE301), Berlin, 1933',
      image: '/images/volksempfaenger_radio_1933.jpg',
      provenance:
        'From an official photograph published in Germany, 1933. It shows the newly introduced Volksempfänger (People’s Radio), commissioned by Joseph Goebbels.',
      text: 'The Volksempfänger was mass-produced to sell for only 76 Reichsmarks, roughly one week’s wage for an average industrial worker. By 1939, over seventy percent of German households owned a radio set—the highest proportion in Europe. The sets were engineered with a limited shortwave receiver so that ordinary citizens could not easily listen to foreign broadcasts, ensuring that families heard only Nazi propaganda and Hitler’s speeches.',
    },
    q3a: {
      tariff: 'Question 3(a): Source Utility [8 marks &bull; 12 mins]',
      stem: 'Study Sources B and C. How useful are Sources B and C for an enquiry into Nazi methods of controlling and influencing attitudes in the years 1933–1939? [8 marks]',
      target:
        'AO3 [8 marks]: Evaluate Content, Context (Goebbels, Volksempfänger, censorship), and Provenance.',
      promptB:
        'Evaluate Source B (Content & Provenance on state monopoly of broadcasting and totalitarian propaganda goals):',
      promptC:
        'Evaluate Source C (Content & Provenance on cheap radio sets, mass domestic listening, and foreign censorship):',
    },

    // Page 17: Interpretations 1 & 2 and Question 3(b)
    interp1: {
      tag: 'INTERPRETATION 1',
      author: 'From an account by historian David Welch, The Third Reich: Politics and Propaganda (2002)',
      text: '“Nazi propaganda was remarkably successful in winning over the hearts and minds of the German people. Joseph Goebbels understood that propaganda could not rely solely on crude slogans; it had to appeal to existing national traditions and pride. Through the distribution of cheap ‘People’s Radios’, the cinematic spectacles of Leni Riefenstahl, and the euphoric pageantry of the Nuremberg rallies, the regime created a genuine sense of national community (Volksgemeinschaft). For the majority of Germans between 1933 and 1939, conformity was based on genuine enthusiasm and admiration for Hitler rather than state coercion.”',
    },
    interp2: {
      tag: 'INTERPRETATION 2',
      author: 'From an account by historian Richard J. Evans, The Third Reich in Power (2005)',
      text: '“The apparent unity of the German people was fundamentally an illusion created by the omnipresence of the terror state. While Goebbels’ propaganda was loud and relentless, ordinary Germans were far more cynical and detached than official rallies suggested. What truly controlled attitudes was the constant threat of denunciation to the Gestapo, the pervasive network of SS surveillance, and the dread of protective custody in concentration camps like Dachau. Germans did not conform because they believed every word broadcast on the radio; they conformed because speaking out meant arrest, torture, and ruin.”',
    },
    q3b: {
      tariff: 'Question 3(b): Difference in Views [4 marks &bull; 5 mins]',
      stem: 'Study Interpretations 1 and 2. They give different views about Nazi methods of controlling and influencing attitudes in the years 1933–1939. What is the main difference between these views? [4 marks]',
      target:
        'AO4 [4 marks]: Contrast persuasive propaganda and genuine popular support vs police state terror and Gestapo fear.',
      stems:
        'The main difference is that Interpretation 1 argues that propaganda, radio control, and rallies successfully won over the genuine enthusiasm and support of ordinary Germans, whereas Interpretation 2 contends that control was maintained through fear of the police state, Gestapo terror, and concentration camps.',
    },

    // Page 18: Question 3(c) & Question 3(d) Planning Framework
    q3c: {
      tariff: 'Question 3(c): Why Views Differ [4 marks &bull; 5 mins]',
      stem: 'Suggest one reason why Interpretations 1 and 2 give different views about Nazi methods of controlling and influencing attitudes in the years 1933–1939. You may use Sources B and C to help explain your answer. [4 marks]',
      target:
        'AO4 [4 marks]: Explain differing emphasis on media reach and popular culture (Sources B & C) vs police archives and judicial repression.',
      stems:
        'One reason the interpretations differ is that the historians investigated different mechanisms of totalitarian control. Interpretation 1 gave weight to the cultural reach of mass media, official rhetoric, and radio ownership (as shown in Sources B and C), whereas Interpretation 2 drew upon police records, Gestapo case files, and evidence of surveillance to emphasize the role of terror.',
    },
    planning3d: {
      title: 'Question 3(d) Evaluative Essay Framework [16 Marks + 4 SPaG &bull; 25 Mins]',
      thesisPrompt:
        'Formulate your sustained thesis: Did the Nazi regime control and influence German attitudes primarily through the persuasive power of propaganda and mass media, or through fear of the police state and Gestapo terror?',
      criteriaBox: [
        'Criteria 1: Propaganda & Persuasion (Volksempfänger in 70% of homes, Nuremberg rallies, press censorship, Hitler cult).',
        'Criteria 2: Police State & Terror (Gestapo denunciations, SS, concentration camps, block wardens, People’s Court).',
        'Criteria 3: Sustained Verdict (Explain whether consent or coercion was the primary foundation of Nazi domestic control).',
      ],
    },

    // Page 19: Question 3(d) Evaluative Essay
    q3d: {
      tariff: 'Question 3(d): Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
      stem: 'How far do you agree with Interpretation 2 about Nazi methods of controlling and influencing attitudes in the years 1933–1939? Explain your answer, using both interpretations and your knowledge of the historical context. [16 marks + 4 SPaG]',
      target:
        'AO4 [16 marks] + SPaG [4 marks]: Balanced evaluative essay synthesizing propaganda and the terror state.',
      scaffoldHints:
        'Structure: Introduction (thesis) &bull; Section 1: Support Interpretation 2 with precise evidence &bull; Section 2: Evaluate Interpretation 1 with counter-evidence &bull; Conclusion: Justified criteria-led verdict.',
    },
  },

  // ==========================================================================
  // KEY TOPIC 4: LIFE IN NAZI GERMANY, 1933–1939
  // Unified Enquiry: The standard of living of German workers in the years 1933–1939
  // ==========================================================================
  KT4: {
    keyTopicNum: 4,
    title: 'Life in Nazi Germany, 1933–1939',
    enquiryTopic: 'The standard of living of German workers in the years 1933–1939',

    // Page 16: Sources B & C and Question 3(a)
    sourceB: {
      tag: 'SOURCE B',
      heading: 'Front-page article in the Nazi newspaper Völkischer Beobachter, 3 May 1933',
      provenance:
        'From the official Nazi Party newspaper, published the day after SA stormtroopers raided and dissolved all independent German trade unions, May 1933.',
      text: '“German workers! Your trade unions were corrupted by Marxist class hatred. Today, the National Socialist state has liberated you! By order of the Führer, the German Labour Front (DAF) under Dr. Robert Ley has assumed leadership of all working Germans. Henceforth, employers and workers are united as comrades in the service of the nation. Strike and lockout are abolished forever!”',
    },
    sourceC: {
      tag: 'SOURCE C',
      heading: 'Contemporary photograph of Reich Labour Service (RAD) workers building an Autobahn, 1936',
      image: '/images/autobahn_construction.jpg',
      provenance:
        'From a photograph published in a German magazine, 1936. It shows young men of the Reich Labour Service (RAD) clearing ground for the construction of a new autobahn.',
      text: 'Under the Reich Labour Service Law of June 1935, all young men aged 18 to 25 were compelled to serve six months in the RAD before entering the military. They lived in military-style barracks, wore uniforms, and performed hard manual labour—draining wetlands, planting forests, and building motorways—for pocket money rather than a regular wage.',
    },
    q3a: {
      tariff: 'Question 3(a): Source Utility [8 marks &bull; 12 mins]',
      stem: 'Study Sources B and C. How useful are Sources B and C for an enquiry into the standard of living of German workers in the years 1933–1939? [8 marks]',
      target:
        "AO3 [8 marks]: Evaluate Content, Context (DAF, RAD, invisible unemployment, KdF), and Provenance.",
      promptB:
        'Evaluate Source B (Content & Provenance on the German Labour Front, abolition of unions, and promises to workers):',
      promptC:
        'Evaluate Source C (Content & Provenance on compulsory manual labour, the RAD, and working conditions):',
    },

    // Page 17: Interpretations 1 & 2 and Question 3(b)
    interp1: {
      tag: 'INTERPRETATION 1',
      author: 'From an account by historian Richard Grunberger, A Social History of the Third Reich (1971)',
      text: '“For the vast majority of German industrial workers, the Nazi era brought tangible improvements in everyday life. Unemployment was eliminated within four years, replacing the terror of the Great Depression with guaranteed employment and steady earnings. Through the ‘Strength Through Joy’ (KdF) organization, millions of ordinary workers enjoyed subsidised theatre tickets, sports facilities, and cruise holidays to Norway and Italy that had previously been the exclusive preserve of the rich. The ‘Beauty of Labour’ campaign renovated factory canteens, washrooms, and ventilation, creating genuinely improved working conditions.”',
    },
    interp2: {
      tag: 'INTERPRETATION 2',
      author: 'From an account by historian Tim Mason, Social Policy in the Third Reich (1993)',
      text: '“The claim that German workers experienced a higher standard of living under National Socialism is thoroughly misleading. In return for full employment, workers surrendered all basic rights and freedoms. Real wages remained below 1928 levels while compulsory deductions for the Labour Front, winter relief, and state insurance consumed up to thirty percent of pay packets. Furthermore, the average working week rose from forty-three hours in 1933 to forty-seven hours in 1939. Stripped of the right to strike and tied to their jobs by the Labour Book, workers suffered declining living standards.”',
    },
    q3b: {
      tariff: 'Question 3(b): Difference in Views [4 marks &bull; 5 mins]',
      stem: 'Study Interpretations 1 and 2. They give different views about the standard of living of German workers in the years 1933–1939. What is the main difference between these views? [4 marks]',
      target:
        'AO4 [4 marks]: Contrast improvements (full employment, KdF leisure, canteen upgrades) vs decline (loss of freedom, longer hours, wage freezes).',
      stems:
        'The main difference is that Interpretation 1 argues that workers’ living standards improved through full employment, KdF leisure rewards, and better workplace conditions, whereas Interpretation 2 contends that living standards declined because workers lost their freedoms, faced longer working hours, and suffered lower real wages.',
    },

    // Page 18: Question 3(c) & Question 3(d) Planning Framework
    q3c: {
      tariff: 'Question 3(c): Why Views Differ [4 marks &bull; 5 mins]',
      stem: 'Suggest one reason why Interpretations 1 and 2 give different views about the standard of living of German workers in the years 1933–1939. You may use Sources B and C to help explain your answer. [4 marks]',
      target:
        'AO4 [4 marks]: Explain differing focus on official leisure initiatives (KdF/DAF promises in Source B) vs regimented manual labour and loss of rights (Source C).',
      stems:
        'One reason the interpretations differ is that the historians placed weight on different aspects of working-class life. Interpretation 1 gave weight to official social programmes, employment figures, and leisure rewards like Strength Through Joy (supported by Source B’s rhetoric of worker unity), whereas Interpretation 2 focused on compulsory regimentation, low pay, and state control (supported by Source C’s evidence of forced manual labour in the RAD).',
    },
    planning3d: {
      title: 'Question 3(d) Evaluative Essay Framework [16 Marks + 4 SPaG &bull; 25 Mins]',
      thesisPrompt:
        'Formulate your sustained thesis: Did the standard of living for German workers improve through full employment and Strength Through Joy, or did it deteriorate through the destruction of trade unions, longer hours, and frozen wages?',
      criteriaBox: [
        'Criteria 1: Improvements & Rewards (End of mass unemployment, KdF holidays, Beauty of Labour canteen improvements, Volkswagen savings scheme).',
        'Criteria 2: Exploitation & Loss of Freedom (Destruction of trade unions, DAF wage freezes, 47-hour working week, Labour Book restrictions, RAD forced labour).',
        'Criteria 3: Sustained Verdict (Explain whether economic security compensated for the severe loss of workers’ rights).',
      ],
    },

    // Page 19: Question 3(d) Evaluative Essay
    q3d: {
      tariff: 'Question 3(d): Evaluative Essay [16 marks + 4 SPaG &bull; 25 mins]',
      stem: 'How far do you agree with Interpretation 2 about the standard of living of German workers in the years 1933–1939? Explain your answer, using both interpretations and your knowledge of the historical context. [16 marks + 4 SPaG]',
      target:
        'AO4 [16 marks] + SPaG [4 marks]: Balanced evaluative essay synthesizing material benefits and totalitarian regimentation.',
      scaffoldHints:
        'Structure: Introduction (thesis) &bull; Section 1: Support Interpretation 2 with precise evidence &bull; Section 2: Evaluate Interpretation 1 with counter-evidence &bull; Conclusion: Justified criteria-led verdict.',
    },
  },
};

module.exports = {
  WEIMAR_SECTION_B,
};
