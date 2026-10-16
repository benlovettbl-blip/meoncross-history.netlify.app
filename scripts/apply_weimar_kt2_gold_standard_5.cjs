/**
 * History Revision Hub — Weimar and Nazi Germany, 1918–1939
 * Migration: Key Topic 2 (Hitler’s Rise to Power, 1919–1933) to 5-Act Gold Standard & Digital Spine Parity
 *
 * Converts Key Topic 2 lessons 2.1 through 2.4 in units/weimar_nazi_germany/data.js:
 * 1. Structures narrative_blocks into 5 chronological Acts ([1.1] to [5.2]).
 * 2. Maps authentic primary visual sources (Sources A, B) to their respective Acts.
 * 3. Injects 5-stage `workbook_stages` matching WEIMAR_ENQUIRY_CONFIGS.KT2.
 * 4. Injects 5-stage `causal_domino_spine` with domino triggers, consequences, actors, and tags.
 * 5. Aligns `timeline_anchor` to 5 stages.
 * 6. Updates `teacher_notes` with 5 structured objectives & hinge questions.
 */

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js');
const raw = require(dataFilePath);
const unitData = raw.default || raw;

console.log('Loaded weimar_nazi_germany unitData with', unitData.lessons.length, 'lessons.');

const KT2_5_ACT_DATA = {
  // --------------------------------------------------------------------------
  // LESSON 2.1: EARLY DEVELOPMENT OF THE NAZI PARTY, 1920–1922
  // --------------------------------------------------------------------------
  lesson_2_1: {
    teacher_notes: {
      primer:
        'This enquiry examines the transformation of an obscure Munich beer-cellar debating club into the aggressive, paramilitary National Socialist German Workers’ Party (NSDAP) between 1919 and 1922. Students analyze Anton Drexler’s founding of the DAP, Hitler’s recruitment and extraordinary oratorical appeal, the formulation of the 25-Point Programme, the strategic visual rebranding under the swastika emblem, Hitler’s seizure of absolute dictatorial control (Führerprinzip), and the institutionalization of street violence through Ernst Röhm’s Sturmabteilung (SA).',
      objectives: [
        {
          objective:
            'Explain how Adolf Hitler encountered and joined Anton Drexler’s German Workers’ Party (DAP) in 1919.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Anton Drexler). Emphasize that Hitler was deployed as an army intelligence agent (V-Mann) to monitor subversive political meetings in Munich before Drexler handed him his nationalist-anti-Semitic pamphlet.',
          question:
            'Why did the German army deploy undercover intelligence agents like Hitler to infiltrate political groups in postwar Munich?',
        },
        {
          objective:
            'Analyse how the 25-Point Programme combined extreme nationalism, virulent anti-Semitism, and populist socialist promises.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Examine the dual appeal of the February 1920 manifesto: repudiating the Treaty of Versailles and denying Jewish citizenship while promising old-age pensions and profit-sharing.',
          question:
            'How did the 25-Point Programme appeal simultaneously to radical nationalists, bitter war veterans, and disaffected working-class Germans?',
        },
        {
          objective:
            'Assess the impact of party rebranding and visual symbolism, specifically the swastika flag and Völkischer Beobachter newspaper.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Focus on how Hitler understood mass psychology, designing the striking red, white, and black swastika emblem to challenge the red flag of Marxism and purchasing a daily newspaper to propagate radical party doctrine.',
          question:
            'Why was visual branding through banners, uniforms, and print media essential for distinguishing the early NSDAP from rival Bavarian nationalist factions?',
        },
        {
          objective:
            'Examine how Hitler established absolute dictatorial authority (Führerprinzip) over the party in July 1921.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (Hitler addressing a Munich crowd). Contrast Drexler’s committee-based committee leadership with Hitler’s ultimatum of total resignation unless granted unquestioned dictatorial power.',
          question:
            'How did Hitler transform the internal governance of the party from a democratic committee into a personalized dictatorship?',
        },
        {
          objective:
            'Evaluate the formation and strategic role of the Sturmabteilung (SA) under Ernst Röhm in pioneering paramilitary street terror.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explain that the SA ("Brownshirts") functioned as political bouncers, intimidating rivals, breaking up communist meetings, and providing a dynamic spectacle of militarized discipline.',
          question:
            'How did the creation of the SA provide the Nazi Party with both physical defense and an aggressive political weapon on the streets of Munich?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Anton Drexler (1884–1942), Munich Toolmaker and Founder of the DAP. Archival portrait photograph of Anton Drexler, who established the German Workers’ Party in January 1919 with Karl Harrer before Hitler joined and seized leadership. Hinge Question: How does Source A illustrate the humble working-class roots from which the early DAP emerged before Hitler transformed it into a militarized mass movement?',
        'Source B':
          'Source B: Adolf Hitler Addressing a Munich Beer Hall Gathering in the Early 1920s. Contemporary German photograph depicting Adolf Hitler speaking animatedly on a raised wooden platform inside a crowded Munich beer cellar, surrounded by party banners and attentive listeners. Hinge Question: What features of Source B explain why contemporary observers described Hitler’s speeches as hypnotic and emotionally electrifying for disaffected veterans?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Anton Drexler & The German Workers’ Party (Sep 1919)',
        theme_heading: 'Act 1: Anton Drexler & The German Workers’ Party (Sep 1919)',
        source: {
          id: 'source_a_anton_drexler',
          letter: 'A',
          title: 'Source A: Anton Drexler (1884–1942), Founder of the DAP',
          src: '/images/anton_drexler.jpg',
          source: '/images/anton_drexler.jpg',
          image: '/images/anton_drexler.jpg',
          caption:
            'Anton Drexler, the Munich railway toolmaker who founded the German Workers’ Party (DAP) in January 1919 before Hitler joined and eclipsed him.',
          desc: 'Archival portrait photograph of DAP founder Anton Drexler.',
          provenance:
            'Archival photographic portrait of Anton Drexler, Munich, c. 1920. German Federal Archives (Bundesarchiv Bild 119-0268).',
          citation: 'Bundesarchiv Bild 119-0268, Anton Drexler portrait.',
          question:
            'How does Source A illustrate the humble working-class roots from which the early DAP emerged before Hitler transformed it into a militarized mass movement?',
          hinge_question:
            'How does Source A illustrate the humble working-class roots from which the early DAP emerged before Hitler transformed it into a militarized mass movement?',
          source_context:
            'Archival portrait photograph of Anton Drexler, who established the German Workers’ Party in January 1919 before Hitler joined and seized leadership. Hinge Question: How does Source A illustrate the humble working-class roots from which the early DAP emerged before Hitler transformed it into a militarized mass movement?',
          context:
            'Archival portrait photograph of Anton Drexler, who established the German Workers’ Party in January 1919.',
        },
        text: '<span class="para-ref">[1.1]</span> In the bitter aftermath of military defeat in 1919, Munich was a hotbed of political extremism. Following the violent suppression of the short-lived Bavarian Soviet Republic by Freikorps units, the imperial army garrison kept strict surveillance over radical political groups. In September 1919, an army intelligence officer instructed <strong>Corporal Adolf Hitler</strong>—a wounded, decorated First World War dispatch runner—to attend a gathering of the <strong>German Workers’ Party (DAP)</strong> in the Sterneckerbräu beer cellar. Founded in January 1919 by railway toolmaker <strong>Anton Drexler</strong> (<span class="archival-meta-tag">Source A</span>) and journalist Karl Harrer, the DAP was a tiny, impoverished committee with just forty members, possessing neither a coherent manifesto nor funds, but united by intense bitterness over the Versailles Diktat, anti-capitalism, and virulent anti-Semitism.<br><br><span class="para-ref">[1.2]</span> When a speaker at the meeting proposed that Bavaria should secede from Germany and join Austria, Hitler erupted in furious counter-argument, delivering an impassioned nationalist tirade that stunned the audience. Impressed by his oratorical power, Drexler handed Hitler a pamphlet entitled <em>My Political Awakening</em> and invited him to join the executive committee. Discharged from the army, Hitler accepted, registering as party member number 555 (the party began numbering at 500 to exaggerate its size). He was appointed head of propaganda, immediately recognizing the beer cellars as fertile ground for mobilizing angry, demobilized soldiers.',
      },
      {
        act: 2,
        title: 'Act 2: The 25-Point Programme (Feb 1920)',
        theme_heading: 'Act 2: The 25-Point Programme (Feb 1920)',
        text: '<span class="para-ref">[2.1]</span> Working closely with Anton Drexler, Hitler set about transforming the DAP into a dynamic political weapon with a comprehensive ideological platform. On 24 February 1920, at a public meeting of two thousand spectators in the festive hall of the Hofbräuhaus in Munich, Hitler publicly announced the party’s foundational manifesto: the <strong>25-Point Programme</strong>. This document was a calculated ideological hybrid designed to capture support across divided social classes, deliberately intertwining extreme Pan-German nationalism, anti-Semitism, and populist socialist guarantees.<br><br><span class="para-ref">[2.2]</span> On the nationalist flank, the programme demanded the total revocation of the Treaty of Versailles and the Treaty of Saint-Germain, the creation of a Greater Germany (<em>Großdeutschland</em>) uniting all ethnic Germans, and imperial territorial expansion (<em>Lebensraum</em>). Crucially, Point 4 declared that "None but those of German blood may be members of the nation. No Jew, therefore, may be a member of the nation," stripping Jewish Germans of citizenship, civil rights, and state employment. To attract working-class voters from the socialists, points 11 to 14 demanded the abolition of unearned income, the nationalization of commercial trusts, profit-sharing in heavy industries, and generous expansions of old-age state pensions.',
      },
      {
        act: 3,
        title: 'Act 3: Party Rebranding & The Swastika Banner (1920–1921)',
        theme_heading: 'Act 3: Party Rebranding & The Swastika Banner (1920–1921)',
        text: '<span class="para-ref">[3.1]</span> To widen the party’s public appeal beyond conservative circles, Hitler orchestrated a complete organizational rebranding in the spring of 1920. The DAP officially renamed itself the <strong>National Socialist German Workers’ Party (NSDAP)</strong>, commonly abbreviated as the Nazi Party. The addition of "National Socialist" was a deliberate propaganda tactic: "National" appealed to conservative patriots, militarists, and veterans, while "Socialist" was designed to tempt industrial workers away from the Marxist SPD and KPD.<br><br><span class="para-ref">[3.2]</span> Hitler also recognized that political movements required powerful visual symbols to command loyalty and project strength. In the summer of 1920, he personally designed the party emblem: a black hooked cross (<strong>swastika</strong>, or <em>Hakenkreuz</em>) tilted inside a white circle upon a brilliant red field. The colors were consciously chosen to evoke the imperial black-white-red flag of Bismarck’s Second Empire, while the dominant red background deliberately provoked and mocked communist rivals on street posters. In December 1920, utilizing loans secured from wealthy sympathizers and military contacts, the NSDAP purchased its own financially bankrupt Munich newspaper, the <strong><em>Völkischer Beobachter</em></strong> (People’s Observer), providing Hitler with a daily press megaphone to spread anti-republican conspiracy theories across Bavaria.',
      },
      {
        act: 4,
        title: 'Act 4: Hitler Takes Absolute Leadership (Führerprinzip) (Jul 1921)',
        theme_heading: 'Act 4: Hitler Takes Absolute Leadership (Führerprinzip) (Jul 1921)',
        source: {
          id: 'source_b_hitler_speech_1920s',
          letter: 'B',
          title: 'Source B: Adolf Hitler Addressing a Munich Beer Hall Gathering (1920s)',
          src: '/images/hitler_munich_1920s.jpg',
          source: '/images/hitler_munich_1920s.jpg',
          image: '/images/hitler_munich_1920s.jpg',
          caption:
            'Adolf Hitler speaking passionately inside a packed Munich beer hall in the early 1920s, demonstrating the theatrical gestures and rhetorical fury that secured his party dominance.',
          desc: 'Archival photograph of Adolf Hitler addressing a political gathering in Munich.',
          provenance:
            'Archival photograph of Adolf Hitler speaking in Munich, c. 1922. German Federal Archives (Bundesarchiv Bild 102-00444).',
          citation: 'Bundesarchiv Bild 102-00444, Hitler speaking in Munich.',
          question:
            'What features of Source B explain why contemporary observers described Hitler’s speeches as hypnotic and emotionally electrifying for disaffected veterans?',
          hinge_question:
            'What features of Source B explain why contemporary observers described Hitler’s speeches as hypnotic and emotionally electrifying for disaffected veterans?',
          source_context:
            'Archival photograph of Adolf Hitler speaking animatedly inside a packed Munich beer hall in the early 1920s. Hinge Question: What features of Source B explain why contemporary observers described Hitler’s speeches as hypnotic and emotionally electrifying for disaffected veterans?',
          context:
            'Archival photograph of Adolf Hitler speaking animatedly inside a packed Munich beer hall in the early 1920s.',
        },
        text: '<span class="para-ref">[4.1]</span> By mid-1921, Hitler was the undisputed star asset of the NSDAP. His speaking appearances regularly packed large beer halls with five to six thousand listeners (<span class="archival-meta-tag">Source B</span>), charging admission fees that filled the party’s coffers. Hitler’s speaking style was intensely theatrical: he would arrive late to heighten anticipation, begin speaking softly and hesitantly in a low guttural baritone, and gradually whip himself into a crescendo of raging theatrical fury, sweating profusely, waving his fists, and tapping directly into his audience’s humiliation and grievances.<br><br><span class="para-ref">[4.2]</span> In July 1921, while Hitler was visiting Berlin to establish contacts with northern nationalist groups, Anton Drexler and the executive committee attempted to merge the NSDAP with a rival socialist party to dilute Hitler’s growing power. Hitler rushed back to Munich and tendered his immediate resignation. Knowing that the party would collapse without its chief orator and financial draw, the committee capitulated completely. Hitler demanded absolute dictatorial authority: Drexler was demoted to honorary chairman, committee votes were abolished, and Hitler was crowned sole party chairman under the dictatorial <strong>Führerprinzip</strong> (Leader Principle), which declared that the leader’s will was superior to any law or vote.',
      },
      {
        act: 5,
        title: 'Act 5: Formation of the Sturmabteilung (SA) (Aug 1921)',
        theme_heading: 'Act 5: Formation of the Sturmabteilung (SA) (Aug 1921)',
        text: '<span class="para-ref">[5.1]</span> As the NSDAP’s provocative rallies escalated, political violence became commonplace. Communist and socialist agitators regularly invaded meetings to heckle and brawl. In August 1921, Hitler formalized his personal security squads into the <strong>Sturmabteilung (SA)</strong>, or Storm Division. Popularly known as the "Brownshirts" due to their surplus colonial tropical uniforms, the SA was composed primarily of aggressive ex-soldiers, unemployed youths, and Freikorps mercenaries who hungered for action and military discipline.<br><br><span class="para-ref">[5.2]</span> Under the leadership of <strong>Captain Ernst Röhm</strong>, a battle-scarred imperial officer with deep connections to the Bavarian military establishment, the SA functioned as the paramilitary muscle of the party. Equipped with clubs, brass knuckles, and leather coshes, they provided physical protection at Nazi rallies, ruthlessly beat opposition hecklers, and attacked left-wing newspaper offices. By 1922, the SA numbered several thousand men, marching through Bavarian towns in tight formation with swastika flags, giving the NSDAP an aura of unstoppable physical force while terrorizing its political opponents.',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: 'Sep 1919',
        title: "Anton Drexler & The German Workers' Party (DAP)",
        spec_focus: 'DAP origins under Anton Drexler; army surveillance; Hitler joining party.',
        focus_clue: 'How did military surveillance lead directly to party membership?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Army intelligence sending corporal to beer hall meeting',
          'Drexler handing pamphlet on national socialism',
          'Party card registered as member fifty-five',
        ],
        writing_frame: {
          connectives:
            'One key development was that... &bull; For example, this occurred when... &bull; This was significant because... &bull; Consequently, ...',
        },
      },
      {
        stage: 2,
        dates: 'Feb 1920',
        title: 'The 25-Point Programme',
        spec_focus:
          'The 25-Point Programme (1920); nationalist, anti-Semitic, and socialist points.',
        focus_clue: 'How did the 25-Point Programme combine nationalist and socialist appeals?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Drafting manifesto demanding abolition of Versailles terms',
          'Denying citizenship rights to Jewish residents',
          'Promising old age pensions and land redistribution',
        ],
        writing_frame: {
          connectives:
            'A crucial factor was that... &bull; Specifically, the manifesto insisted... &bull; This appealed to voters because... &bull; Furthermore, ...',
        },
      },
      {
        stage: 3,
        dates: '1920–1921',
        title: 'Party Rebranding & The Swastika Banner',
        spec_focus: 'Renaming to NSDAP; swastika emblem; Völkischer Beobachter newspaper.',
        focus_clue: 'Why was visual branding crucial for attracting working-class recruits?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Adding National Socialist label to party name',
          'Purchasing Munich newspaper Völkischer Beobachter',
          'Designing black hooked cross inside white circle on red',
        ],
        writing_frame: {
          connectives:
            'Another important step was... &bull; In particular, Hitler recognized that... &bull; This created an advantage because... &bull; In addition, ...',
        },
      },
      {
        stage: 4,
        dates: 'Jul 1921',
        title: 'Hitler Takes Absolute Leadership (Führerprinzip)',
        spec_focus: 'Führerprinzip; resignation ultimatum; eclipse of Anton Drexler.',
        focus_clue: 'How did personal oratory secure complete dominance over party rivals?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Threatening total resignation unless granted dictatorial power',
          'Forcing Anton Drexler into honorary party chairman',
          'Rallying six thousand spectators in Munich beer cellars',
        ],
        writing_frame: {
          connectives:
            'A turning point occurred when... &bull; For instance, Hitler demonstrated... &bull; This resulted in... &bull; As a consequence, ...',
        },
      },
      {
        stage: 5,
        dates: 'Aug 1921',
        title: 'Formation of the Sturmabteilung (SA)',
        spec_focus: 'SA formation; Ernst Röhm; brownshirts; paramilitary intimidation.',
        focus_clue: 'What role did organized paramilitary violence play in protecting meetings?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Dressing ex-soldiers in surplus brown tropical shirts',
          'Ernst Röhm training street squads with clubs',
          'Beating rival Communist agitators outside beer halls',
        ],
        writing_frame: {
          connectives:
            'Finally, a decisive element was... &bull; For example, the creation of... &bull; This was important because... &bull; Ultimately, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT2.1: Early Nazi Party Development & Paramilitary Growth (1919–1922)',
      subtitle: 'From Beer Hall Debating Club to Armed Munich Paramilitary Force',
      stages: [
        {
          step: 1,
          date: 'Sep 1919',
          para_ref: '[1.1–1.2]',
          title: "Anton Drexler & The German Workers' Party (DAP)",
          actor: 'Adolf Hitler & Anton Drexler',
          tag: '🍺 BEER CELLAR RECRUITMENT',
          trigger:
            'Army intelligence sent Corporal Hitler to monitor a 40-member nationalist debating club in Munich, where Drexler invited him to join after an impassioned speech.',
          desc: 'Army intelligence sent Corporal Hitler to monitor a 40-member nationalist debating club in Munich, where Drexler invited him to join after an impassioned speech.',
          connective:
            'Provided Hitler with an existing political base and platform, leading directly to the drafting of a radical new party manifesto.',
          question: 'How did military surveillance lead directly to party membership?',
        },
        {
          step: 2,
          date: 'Feb 1920',
          para_ref: '[2.1–2.2]',
          title: 'The 25-Point Programme',
          actor: 'Adolf Hitler & Party Committee',
          tag: '📜 HYBRID MANIFESTO',
          trigger:
            'Hitler and Drexler presented the 25-Point Programme to 2,000 spectators at the Hofbräuhaus, demanding Versailles revocation and racial citizenship laws.',
          desc: 'Hitler and Drexler presented the 25-Point Programme to 2,000 spectators at the Hofbräuhaus, demanding Versailles revocation and racial citizenship laws.',
          connective:
            'Combined radical nationalism, anti-Semitism, and socialist welfare promises, giving the party wide demographic appeal across Bavaria.',
          question: 'How did the 25-Point Programme combine nationalist and socialist appeals?',
        },
        {
          step: 3,
          date: '1920–1921',
          para_ref: '[3.1–3.2]',
          title: 'Party Rebranding & The Swastika Banner',
          actor: 'NSDAP Propaganda Division',
          tag: '🚩 SYMBOLIC INDOCTRINATION',
          trigger:
            'The party added "National Socialist" to become the NSDAP, adopted the red-white-black swastika emblem, and bought the Völkischer Beobachter newspaper.',
          desc: 'The party added "National Socialist" to become the NSDAP, adopted the red-white-black swastika emblem, and bought the Völkischer Beobachter newspaper.',
          connective:
            'Gave the party an instantly recognizable public brand and print megaphone, escalating public profile and party recruitment.',
          question: 'Why was visual branding crucial for attracting working-class recruits?',
        },
        {
          step: 4,
          date: 'Jul 1921',
          para_ref: '[4.1–4.2]',
          title: 'Hitler Takes Absolute Leadership (Führerprinzip)',
          actor: 'Adolf Hitler & Anton Drexler',
          tag: '👑 FÜHRERPRINZIP DICTATORSHIP',
          trigger:
            'Hitler threatened total resignation unless granted dictatorial authority, demoting Drexler and abolishing democratic committee voting.',
          desc: 'Hitler threatened total resignation unless granted dictatorial authority, demoting Drexler and abolishing democratic committee voting.',
          connective:
            'Transformed the party into an obedient personal autocracy driven entirely by Hitler’s oratorical will and radical agenda.',
          question: 'How did personal oratory secure complete dominance over party rivals?',
        },
        {
          step: 5,
          date: 'Aug 1921',
          para_ref: '[5.1–5.2]',
          title: 'Formation of the Sturmabteilung (SA)',
          actor: 'Ernst Röhm & Demobilized Freikorps',
          tag: '👊 PARAMILITARY BROWN-SHIRTS',
          trigger:
            'Hitler established the SA under Captain Ernst Röhm, dressing ex-soldiers in brown shirts to protect meetings and assault left-wing opponents.',
          desc: 'Hitler established the SA under Captain Ernst Röhm, dressing ex-soldiers in brown shirts to protect meetings and assault left-wing opponents.',
          connective:
            'Institutionalized political violence on the streets, turning the NSDAP into a feared regional paramilitary force ready for armed insurrection.',
          question: 'What role did organized paramilitary violence play in protecting meetings?',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // LESSON 2.2: THE MUNICH PUTSCH AND THE LEAN YEARS, 1923–1929
  // --------------------------------------------------------------------------
  lesson_2_2: {
    teacher_notes: {
      primer:
        'This enquiry examines the climactic failure of Hitler’s armed insurrection in November 1923 and the subsequent strategic reorganization of the NSDAP during the "Lean Years" (1924–1929). Students explore the immediate triggers of the Munich Putsch (Ruhr occupation, hyperinflation, and Bavarian nationalist plots), the dramatic storming of the Bürgerbräukeller and collapse at the Residenzstrasse, the February 1924 Munich Treason Trial that Hitler converted into a national propaganda triumph, his imprisonment at Landsberg and writing of Mein Kampf, the decisive Bamberg Conference of 1926 that established the Führerprinzip over northern socialist dissidents, and the party’s minimal electoral returns during Stresemann’s Golden Twenties.',
      objectives: [
        {
          objective:
            'Explain the causes and immediate execution of the Bürgerbräukeller armed putsch on 8 November 1923.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that hyperinflation, the ending of passive resistance in the Ruhr, and Mussolini’s March on Rome convinced Hitler that the time was ripe to seize power with the Bavarian Triumvirate.',
          question:
            'Why did Hitler believe November 1923 was the ideal moment to launch an armed insurrection against the Weimar Republic?',
        },
        {
          objective:
            'Analyse why the Munich Putsch collapsed in violent defeat on 9 November 1923 at the Odeonsplatz.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain that Kahr and Lossow reneged on their coerced support, alerting the armed Bavarian State Police who opened fire in the narrow Residenzstrasse, killing sixteen stormtroopers.',
          question:
            'Why did the Bavarian police and army leadership crush the Nazi march rather than defecting to Hitler’s insurrection?',
        },
        {
          objective:
            'Assess how Hitler converted the 1924 Munich Treason Trial and his Landsberg imprisonment into a propaganda triumph.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Putsch defendants on trial). Emphasize how sympathetic right-wing judges allowed Hitler to harangue the court for hours, securing nationwide newspaper coverage and a lenient minimum five-year sentence.',
          question:
            'How did Hitler transform a catastrophic military defeat and treason trial into a national political victory?',
        },
        {
          objective:
            'Examine how the Bamberg Conference of 1926 resolved internal party splits and established the legal strategy (Legality Principle).',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on Hitler’s defeat of Gregor Strasser’s northern socialist faction, establishing absolute Führer authority and committing the party to seeking power through Reichstag elections.',
          question:
            'Why was the resolution of the northern socialist challenge at the Bamberg Conference crucial for Nazi party unity?',
        },
        {
          objective:
            'Evaluate why the NSDAP suffered heavy electoral failure in the May 1928 Reichstag election despite internal reorganization.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explain that the party won just 12 seats (2.6% of the vote) because Gustav Stresemann’s economic stabilization drained extremist grievance among German voters.',
          question:
            'Why did the Nazi Party remain a minor fringe party on the national stage during Stresemann’s Golden Twenties?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: The Munich Putsch Defendants on Trial in Munich (February 1924). Official press photograph showing Adolf Hitler, General Erich Ludendorff, and fellow conspirators standing in their formal suits and imperial military uniforms during the Munich Treason Trial in early 1924. Hinge Question: How does the presence of General Ludendorff in full imperial uniform in Source A illustrate why the Bavarian judges treated Hitler with remarkable leniency?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Bürgerbräukeller Coup (8 Nov 1923)',
        theme_heading: 'Act 1: The Bürgerbräukeller Coup (8 Nov 1923)',
        text: '<span class="para-ref">[1.1]</span> By autumn 1923, the Weimar Republic was engulfed in existential catastrophe. The French occupation of the Ruhr and the apocalyptic hyperinflation crisis had destroyed middle-class savings and shattered public confidence in democratic governance. Furthermore, when Chancellor Gustav Stresemann called off passive resistance in September 1923, right-wing Bavarian nationalists were outraged, viewing the concession as another shameful capitulation. Inspired by Benito Mussolini’s successful 1922 March on Rome, Adolf Hitler believed the moment had arrived to overthrow the Weimar Republic by launching an armed march on Berlin from Munich.<br><br><span class="para-ref">[1.2]</span> On the evening of 8 November 1923, the Bavarian State Commissioner <strong>Gustav von Kahr</strong> was addressing three thousand businessmen inside the Bürgerbräukeller, a massive beer hall in Munich, alongside Army Commander General Otto von Lossow and State Police Chief Hans von Seisser. Suddenly, six hundred armed SA stormtroopers surrounded the hall, setting up a machine gun in the foyer. Hitler stormed onto the stage, fired a pistol shot into the plaster ceiling, and shouted: "The National Revolution has broken out! The hall is filled with six hundred armed men. The Bavarian government and Reich government are removed!" Forcing Kahr, Lossow, and Seisser into an adjoining side room at gunpoint, Hitler pressured them into supporting his march. When the revered First World War hero <strong>General Erich Ludendorff</strong> arrived and endorsed the putsch, the trio reluctantly agreed.',
      },
      {
        act: 2,
        title: 'Act 2: The Residenzstrasse Clash & Putsch Collapse (9 Nov 1923)',
        theme_heading: 'Act 2: The Residenzstrasse Clash & Putsch Collapse (9 Nov 1923)',
        text: '<span class="para-ref">[2.1]</span> Hitler’s triumph was fleeting. Leaving the beer hall to deal with clashes between stormtroopers and regular soldiers elsewhere in Munich, Hitler mistakenly left Ludendorff in charge. Kahr, Lossow, and Seisser easily tricked Ludendorff into letting them leave the beer hall to return to their families. Once free, they immediately reneged on their coerced promises, ordering the Bavarian State Police and regular military units to mobilize from surrounding garrisons to crush the treasonous uprising.<br><br><span class="para-ref">[2.2]</span> At midday on 9 November 1923, in a desperate bid to regain momentum, Hitler and Ludendorff led two thousand brownshirt stormtroopers on a march toward the centre of Munich, hoping the public and the armed forces would rally to their cause. As the column marched through the narrow Residenzstrasse toward the Odeonsplatz, they encountered a cordon of armed Bavarian State Police. Shots rang out—it remains disputed who fired first—and a lethal two-minute firefight erupted. Sixteen Nazis and four police officers were killed. Göring was shot in the groin and smuggled across the Austrian border; Hitler dislocated his shoulder as his bodyguard fell mortally wounded beside him, fleeing the scene in a yellow car. Ludendorff marched straight through the police lines unharmed and was arrested on the spot.',
      },
      {
        act: 3,
        title: 'Act 3: The Munich Treason Trial & Landsberg Prison (Feb–Apr 1924)',
        theme_heading: 'Act 3: The Munich Treason Trial & Landsberg Prison (Feb–Apr 1924)',
        source: {
          id: 'source_a_munich_putsch_defendants',
          letter: 'A',
          title: 'Source A: The Munich Putsch Defendants on Trial in Munich (February 1924)',
          src: '/images/munich_putsch_defendants.jpg',
          source: '/images/munich_putsch_defendants.jpg',
          image: '/images/munich_putsch_defendants.jpg',
          caption:
            'Adolf Hitler, General Erich Ludendorff, and fellow putsch conspirators standing in court during the Munich Treason Trial, early 1924.',
          desc: 'Archival courtroom photograph of Adolf Hitler and General Ludendorff on trial for high treason.',
          provenance:
            'Archival photograph of the Munich Treason Trial defendants, Munich, February 1924. German Federal Archives (Bundesarchiv Bild 102-00344A).',
          citation: 'Bundesarchiv Bild 102-00344A, Munich Putsch Trial.',
          question:
            'How does the presence of General Ludendorff in full imperial uniform in Source A illustrate why the Bavarian judges treated Hitler with remarkable leniency?',
          hinge_question:
            'How does the presence of General Ludendorff in full imperial uniform in Source A illustrate why the Bavarian judges treated Hitler with remarkable leniency?',
          source_context:
            'Official press photograph showing Adolf Hitler, General Erich Ludendorff, and fellow conspirators standing in their formal suits and imperial military uniforms during the Munich Treason Trial in early 1924. Hinge Question: How does the presence of General Ludendorff in full imperial uniform in Source A illustrate why the Bavarian judges treated Hitler with remarkable leniency?',
          context:
            'Official press photograph showing Adolf Hitler, General Erich Ludendorff, and fellow conspirators on trial for high treason in Munich, early 1924.',
        },
        text: '<span class="para-ref">[3.1]</span> Captured two days later hiding in the attic of Ernst Hanfstaengl’s lakeside villa in Uffing, Hitler was put on trial for high treason in February 1924 alongside Ludendorff and eight others (<span class="archival-meta-tag">Source A</span>). Under the Weimar constitution, high treason carried the death penalty or mandatory life imprisonment. However, the Bavarian judges, led by presiding judge Georg Neithardt, were deeply sympathetic to the right-wing nationalist cause. Instead of muzzling the defendant, Neithardt allowed Hitler to cross-examine state witnesses and deliver uninterrupted, hours-long political speeches attacking the "November Criminals," the Weimar Republic, and the Treaty of Versailles. National newspapers reported his testimony verbatim, transforming Hitler from a local Bavarian radical into a hero of the German nationalist right.<br><br><span class="para-ref">[3.2]</span> In April 1924, the court acquitted Ludendorff entirely and sentenced Hitler to the absolute minimum sentence: five years’ detention in <strong>Landsberg Fortress</strong>, with immediate eligibility for early parole. In Landsberg, Hitler lived in comfortable conditions: he had a spacious private room overlooking the gardens, received hundreds of visitors and floral gifts, wore his own clothes, and had his meals prepared by dedicated staff. During his nine months of confinement, Hitler dictated his political autobiography, <strong><em>Mein Kampf</em></strong> (My Struggle), to his loyal secretary Rudolf Hess, setting out his core ideological tenets: virulent anti-Semitism, the quest for <em>Lebensraum</em> in Eastern Europe, and the absolute necessity of the <em>Führerprinzip</em>.',
      },
      {
        act: 4,
        title: 'Act 4: The Bamberg Conference & The Legal Path to Power (1925–1926)',
        theme_heading: 'Act 4: The Bamberg Conference & The Legal Path to Power (1925–1926)',
        text: '<span class="para-ref">[4.1]</span> Hitler was released from Landsberg on 20 December 1924, having served just nine months. While he was incarcerated, the Nazi Party had splintered into squabbling factions and was banned across Germany. Crucially, Hitler had reached a profound tactical realization: the Weimar Republic could not be overthrown by violent armed coup because the regular German army (Reichswehr) and police were too powerful. In February 1925, having convinced the Bavarian Prime Minister Heinrich Held that the NSDAP would respect the law, Hitler formally relaunched the party at the Bürgerbräukeller, announcing a new strategy: the <strong>"Legality Principle"</strong> (<em>Legalitätsprinzip</em>). The Nazis would hold their noses, enter parliament, and destroy Weimar democracy from within using its own constitutional mechanisms.<br><br><span class="para-ref">[4.2]</span> However, a severe ideological split threatened the party. In northern and western Germany, party organizers led by brothers <strong>Gregor and Otto Strasser</strong> and a young Joseph Goebbels emphasized the "socialist" elements of the 25-Point Programme, advocating strikes, nationalization of banks, and anti-capitalism to win industrial workers. Hitler vehemently opposed this, fearing it would alienate wealthy conservative industrialists whose funding he required. In February 1926, Hitler convened the <strong>Bamberg Conference</strong> in Bavaria. Outmaneuvering the northern delegates with hours of fierce oratory, Hitler established that the 25-Point Programme was immutable and could not be altered, won Goebbels over to his personal allegiance, crushed the socialist faction, and solidified his unquestioned status as the supreme Führer. To guarantee personal protection independent of the unruly SA, Hitler also established the <strong>Schutzstaffel (SS)</strong> as an elite, black-uniformed personal bodyguard.',
      },
      {
        act: 5,
        title: 'Act 5: Electoral Failure in the Golden Twenties (May 1928)',
        theme_heading: 'Act 5: Electoral Failure in the Golden Twenties (May 1928)',
        text: '<span class="para-ref">[5.1]</span> Between 1925 and 1928, Hitler meticulously built a sophisticated national party apparatus. Germany was divided into thirty-five regional party districts (<em>Gaue</em>), each overseen by a loyal <em>Gauleiter</em> appointed directly by Hitler. The party established specialized affiliated organizations to penetrate civil society: the Hitler Youth for teenage boys, the Nazi Teachers’ League, the Nazi Doctors’ Association, and the Order of German Women. Party membership expanded steadily from 27,000 in 1925 to over 100,000 disciplined members by 1928, creating an efficient nationwide propaganda machine waiting for an opportunity to strike.<br><br><span class="para-ref">[5.2]</span> Yet despite this formidable organizational structure, the NSDAP remained a peripheral national electoral failure throughout the mid-1920s—a period known as the <strong>"Lean Years"</strong> (or wilderness years). In the Reichstag elections of May 1928, the Nazi Party won just <strong>12 seats</strong> out of 491, capturing a dismal <strong>2.6% of the national vote</strong> (down from 3% in December 1924). The explanation was straightforward: Foreign Minister Gustav Stresemann had restored currency stability, secured massive American loans under the Dawes Plan, ended diplomatic isolation via the Locarno Pact, and oversaw rising wages and unemployment insurance. As long as the Weimar Republic delivered economic prosperity and social stability, radical political extremism held virtually no appeal for the ordinary German electorate.',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: '8 Nov 1923',
        title: 'The Bürgerbräukeller Coup',
        spec_focus:
          'Munich Putsch causes; Ruhr crisis; storming the beer hall; Ludendorff involvement.',
        focus_clue: 'How did the armed coup attempt to overthrow the Bavarian state?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Firing pistol shot into beer hall ceiling',
          'Forcing Bavarian state commissioners into private backroom',
          'General Ludendorff endorsing immediate march on Berlin',
        ],
        writing_frame: {
          connectives:
            'One main cause was that... &bull; Specifically, this occurred when... &bull; This action was taken because... &bull; Consequently, ...',
        },
      },
      {
        stage: 2,
        dates: '9 Nov 1923',
        title: 'The Residenzstrasse Clash & Putsch Collapse',
        spec_focus: 'Failure of the putsch; police resistance; Residenzstrasse firefight; 16 dead.',
        focus_clue: 'Why did the Bavarian police crush the march instead of defecting?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Two thousand brownshirts marching toward Odeonsplatz square',
          'State police firing volley down narrow street',
          'Sixteen stormtroopers dying as leaders scatter into hiding',
        ],
        writing_frame: {
          connectives:
            'The putsch collapsed because... &bull; For example, when the marchers reached... &bull; This resulted in... &bull; As a consequence, ...',
        },
      },
      {
        stage: 3,
        dates: 'Feb–Apr 1924',
        title: 'The Munich Treason Trial & Landsberg Prison',
        spec_focus: 'Treason trial; propaganda victory; Landsberg imprisonment; Mein Kampf.',
        focus_clue: 'How did the trial transform a humiliating defeat into a propaganda triumph?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Turning court dock into national propaganda platform',
          'Sympathetic judges granting minimum five-year sentence',
          'Dictating Mein Kampf memoir to Rudolf Hess in cell',
        ],
        writing_frame: {
          connectives:
            'A decisive outcome was that... &bull; In particular, the trial allowed... &bull; This was important because... &bull; Furthermore, ...',
        },
      },
      {
        stage: 4,
        dates: '1925–1926',
        title: 'The Bamberg Conference & The Legal Path to Power',
        spec_focus: 'Party relaunch; Bamberg Conference (1926); defeat of Strasser; SS creation.',
        focus_clue: 'Why did the Führer demand absolute obedience and legal election tactics?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Relaunching banned party after early December release',
          'Crushing northern socialist faction under Gregor Strasser',
          'Establishing SS blackshirts as personal armed bodyguard',
        ],
        writing_frame: {
          connectives:
            'Another major development was... &bull; For instance, at Bamberg Hitler... &bull; This strategy changed because... &bull; As a result, ...',
        },
      },
      {
        stage: 5,
        dates: 'May 1928',
        title: 'Electoral Failure in the Golden Twenties',
        spec_focus: 'The Lean Years; May 1928 election (12 seats, 2.6%); Stresemann stability.',
        focus_clue: 'Why did economic stability make radical nationalist propaganda ineffective?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Winning only twelve seats in parliamentary election',
          'Capturing two point six percent of national vote',
          'Stresemann economic prosperity draining extremist appeal',
        ],
        writing_frame: {
          connectives:
            'Despite reorganization, the Nazis struggled because... &bull; For example, in 1928 they... &bull; This was largely due to... &bull; Overall, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT2.2: The Munich Putsch & The Lean Years (1923–1929)',
      subtitle: 'From Armed Fiasco to Legal Strategy and Organizational Mastery',
      stages: [
        {
          step: 1,
          date: '8 Nov 1923',
          para_ref: '[1.1–1.2]',
          title: 'The Bürgerbräukeller Coup',
          actor: 'Adolf Hitler, SA & General Ludendorff',
          tag: '🍺 ARMED BEER HALL INSURRECTION',
          trigger:
            'Hitler fired a pistol shot into the beer hall ceiling, forcing Bavarian leaders Kahr and Lossow at gunpoint to support an armed march on Berlin.',
          desc: 'Hitler fired a pistol shot into the beer hall ceiling, forcing Bavarian leaders Kahr and Lossow at gunpoint to support an armed march on Berlin.',
          connective:
            'Attempted to spark a right-wing national revolution, but collapsed when the released Bavarian leaders alerted state police forces.',
          question: 'How did the armed coup attempt to overthrow the Bavarian state?',
        },
        {
          step: 2,
          date: '9 Nov 1923',
          para_ref: '[2.1–2.2]',
          title: 'The Residenzstrasse Clash & Putsch Collapse',
          actor: 'Bavarian State Police & 2,000 Marchers',
          tag: '💥 ODEONSPLATZ BLOODBATH',
          trigger:
            'Police opened fire on 2,000 Nazi marchers in the narrow Residenzstrasse, killing sixteen stormtroopers and shattering the putsch.',
          desc: 'Police opened fire on 2,000 Nazi marchers in the narrow Residenzstrasse, killing sixteen stormtroopers and shattering the putsch.',
          connective:
            'Dispersed the armed uprising, leading to Hitler’s arrest, the banning of the party, and a high-profile treason trial.',
          question: 'Why did the Bavarian police crush the march instead of defecting?',
        },
        {
          step: 3,
          date: 'Feb–Apr 1924',
          para_ref: '[3.1–3.2]',
          title: 'The Munich Treason Trial & Landsberg Prison',
          actor: 'Adolf Hitler & Presiding Judge Neithardt',
          tag: '⚖️ LEGAL PLATFORM & MEIN KAMPF',
          trigger:
            'Sympathetic judges gave Hitler a platform to attack the Republic and a lenient five-year term, allowing him to dictate Mein Kampf in comfort.',
          desc: 'Sympathetic judges gave Hitler a platform to attack the Republic and a lenient five-year term, allowing him to dictate Mein Kampf in comfort.',
          connective:
            'Transformed Hitler into a national celebrity and convinced him to abandon violent coups in favor of democratic electoral subversion.',
          question: 'How did the trial transform a humiliating defeat into a propaganda triumph?',
        },
        {
          step: 4,
          date: '1925–1926',
          para_ref: '[4.1–4.2]',
          title: 'The Bamberg Conference & The Legal Path to Power',
          actor: 'Adolf Hitler, Gregor Strasser & Goebbels',
          tag: '👑 BAMBERG VICTORY & LEGAL STRATEGY',
          trigger:
            'Hitler crushed Gregor Strasser’s northern socialist faction at Bamberg, establishing the Führerprinzip and committing to winning power via Reichstag votes.',
          desc: 'Hitler crushed Gregor Strasser’s northern socialist faction at Bamberg, establishing the Führerprinzip and committing to winning power via Reichstag votes.',
          connective:
            'United the party under Hitler’s absolute leadership and laid the structural foundation for nationwide electoral mobilization.',
          question: 'Why did the Führer demand absolute obedience and legal election tactics?',
        },
        {
          step: 5,
          date: 'May 1928',
          para_ref: '[5.1–5.2]',
          title: 'Electoral Failure in the Golden Twenties',
          actor: 'German Electorate & Gustav Stresemann',
          tag: '📉 LEAN YEARS MARGINALIZATION',
          trigger:
            'The NSDAP won just 12 seats (2.6% of the vote) in May 1928 as Dawes Plan prosperity and Weimar social security neutralized political extremism.',
          desc: 'The NSDAP won just 12 seats (2.6% of the vote) in May 1928 as Dawes Plan prosperity and Weimar social security neutralized political extremism.',
          connective:
            'Left the reorganized party waiting as a disciplined fringe apparatus until the economic catastrophe of 1929 provided a mass grievance.',
          question: 'Why did economic stability make radical nationalist propaganda ineffective?',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // LESSON 2.3: THE GROWTH IN SUPPORT FOR THE NAZIS, 1929–1932
  // --------------------------------------------------------------------------
  lesson_2_3: {
    teacher_notes: {
      primer:
        'This enquiry examines the dramatic electoral explosion of the Nazi Party between 1929 and 1932 following the Great Depression. Students investigate the catastrophic impact of the Wall Street Crash and the collapse of American loans, the surge in German unemployment to six million, the political paralysis of democratic coalitions leading to Chancellor Heinrich Brüning’s austerity and reliance on Article 48 decrees ("Hunger Chancellor"), the polarising surge of the Communist Party (KPD) and how bourgeois fear of Bolshevism drove middle-class voters to Hitler ("negative cohesion"), Joseph Goebbels’ pioneering multimedia propaganda campaigns, and the historic breakthrough of July 1932 when the NSDAP won 230 seats to become Germany’s largest political party.',
      objectives: [
        {
          objective:
            'Explain how the October 1929 Wall Street Crash shattered Germany’s fragile banking and industrial system.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Highlight that the German economy was dangerously reliant on 90-day American short-term loans under the Dawes Plan; when Wall Street crashed, US banks recalled funds, causing 50,000 business bankruptcies and bank collapses.',
          question:
            'Why was the Weimar economy far more vulnerable to the Wall Street Crash than other European powers?',
        },
        {
          objective:
            'Analyse how mass unemployment and Chancellor Heinrich Brüning’s austerity destroyed democratic parliamentary governance.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain that Brüning slashed unemployment benefits and raised taxes while six million Germans were jobless, bypassing the deadlocked Reichstag by ruling through 66 presidential Article 48 decrees.',
          question:
            'Why did Heinrich Brüning’s austerity economic policies earn him the title of the "Hunger Chancellor"?',
        },
        {
          objective:
            'Assess how fear of a Communist revolution pushed the German middle classes and big business into supporting Hitler.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Introduce the concept of "negative cohesion"—voters supported Hitler not out of love for Nazi ideology, but out of desperate terror of communist street violence and property expropriation.',
          question:
            'How did the surge of the Communist Party (KPD) motivate wealthy industrialists and middle-class shopkeepers to back the Nazis?',
        },
        {
          objective:
            'Examine the innovative, modern propaganda techniques engineered by Joseph Goebbels across German society.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source A (Nazi election poster "Our Last Hope: Hitler"). Focus on Hitler’s airplane tours ("Hitler over Germany"), radio gramophone discs, cinema films, and targeted slogans promising "Work and Bread".',
          question:
            'How did Joseph Goebbels tailor Nazi propaganda messages to target the specific grievances of different social groups?',
        },
        {
          objective:
            'Evaluate the electoral breakthrough of July 1932 and why President Hindenburg initially refused to appoint Hitler as Chancellor.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explain that winning 230 seats (37.3%) made the Nazis the largest party in the Reichstag, but aristocratic President Hindenburg dismissed Hitler as a vulgar "Bohemian corporal."',
          question:
            'Why did President Hindenburg refuse to appoint Hitler as Chancellor in July 1932 despite the Nazis winning 230 seats?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Nazi Presidential Election Poster: "Our Last Hope: Hitler" (1932). Iconic 1932 Nazi election poster designed by Mjölnir (Hans Schweitzer), showing the desperate, gaunt faces of unemployed German workers and mothers beneath the bold slogan "Our Last Hope: Hitler" (Unsere letzte Hoffnung: Hitler). Hinge Question: How does the visual composition of Source A exploit the psychological despair of the Great Depression to present Hitler as an indispensable national saviour?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Wall Street Crash & Economic Meltdown (Oct 1929)',
        theme_heading: 'Act 1: The Wall Street Crash & Economic Meltdown (Oct 1929)',
        text: '<span class="para-ref">[1.1]</span> On 29 October 1929 ("Black Tuesday"), the United States stock market collapsed catastrophically. The Great Depression that followed struck Germany harder than any other European nation because the Weimar Republic’s economic recovery during the Golden Twenties had been funded almost entirely by short-term American loans under the 1924 Dawes Plan. As Gustav Stresemann had prophetically warned shortly before his sudden death in October 1929: "Germany is dancing on a volcano. If the short-term credits are called in, a large section of our economy will collapse."<br><br><span class="para-ref">[1.2]</span> Facing total domestic ruin, American financiers abruptly recalled their ninety-day short-term loans from German financial institutions. Germany had no capital reserves to pay them back. A catastrophic domino collapse swept through the banking sector: in July 1931, the giant Danatbank collapsed in panic, sparking runs on banks across the country where millions of citizens queued fruitlessly to retrieve their life savings. German industrial production plunged by forty percent between 1929 and 1932. Over 50,000 German companies went bankrupt, factories closed their gates, and international trade evaporated as foreign nations erected steep protectionist tariffs.',
      },
      {
        act: 2,
        title: 'Act 2: Mass Unemployment & The "Hunger Chancellor" (1930–1932)',
        theme_heading: 'Act 2: Mass Unemployment & The "Hunger Chancellor" (1930–1932)',
        text: '<span class="para-ref">[2.1]</span> The human cost of the economic collapse was devastating. German unemployment soared from 1.3 million in September 1929 to three million in 1930, 4.3 million in 1931, and peaked at a staggering <strong>six million in January 1932</strong>—representing roughly one in three working-age German adults. Millions of families were evicted from their homes, living in shantytowns on city outskirts, queueing at municipal soup kitchens, or wandering the streets begging. The state unemployment insurance scheme established in 1927 collapsed under the overwhelming financial strain.<br><br><span class="para-ref">[2.2]</span> In March 1930, the democratic coalition government led by SPD Chancellor Hermann Müller collapsed due to bitter disagreements over whether to raise taxes or cut unemployment benefits. President Paul von Hindenburg appointed Centre Party politician <strong>Heinrich Brüning</strong> as Chancellor. Facing a deadlocked parliament, Brüning implemented a ruthless orthodox deflationary policy: he slashed government expenditure, cut civil service salaries by up to twenty-three percent, cut unemployment payments, and increased income taxes. When the Reichstag voted against these harsh measures, Brüning dissolved parliament and ruled almost exclusively through <strong>Article 48 presidential emergency decrees</strong>. Hindenburg signed sixty-six emergency decrees in 1932 alone, compared to just five passed by the Reichstag. Brüning’s policies earned him the hated title of the <strong>"Hunger Chancellor,"</strong> alienating millions of voters and effectively destroying parliamentary democracy.',
      },
      {
        act: 3,
        title: 'Act 3: The Communist Threat & Polarisation (1930–1932)',
        theme_heading: 'Act 3: The Communist Threat & Polarisation (1930–1932)',
        text: '<span class="para-ref">[3.1]</span> As living standards plummeted, German politics became violently polarized. Desperate industrial workers turned in droves to the <strong>Communist Party (KPD)</strong>, which declared that the Depression proved the terminal crisis of global capitalism and promised a workers’ revolution modeled on the Soviet Union. In the September 1930 elections, the KPD captured seventy-seven seats; by November 1932, they won one hundred seats with 5.3 million votes. In major industrial cities like Berlin and Hamburg, the communist paramilitary wing, the Red Front Fighters (<em>Rotfrontkämpferbund</em>), engaged in bloody daily street battles against Nazi stormtroopers.<br><br><span class="para-ref">[3.2]</span> This surge in communist strength terrified Germany’s traditional middle classes (<em>Mittelstand</em>), small business owners, peasant farmers, and wealthy industrialists. Fearing that a Bolshevik revolution would expropriate their private property, abolish private enterprise, and destroy Christian religious traditions, they sought a powerful protector. Hitler capitalized brilliantly on this fear through the mechanism of <strong>negative cohesion</strong>: millions voted Nazi not because they loved party ideology, but because they shared a common hatred and terror of communism. Prominent industrial magnates—including steel baron Fritz Thyssen and media mogul Alfred Hugenberg—began funneling substantial financial donations into the NSDAP to bankroll its campaigns.',
      },
      {
        act: 4,
        title: 'Act 4: Goebbels & Modern Propaganda Campaigns (1930–1932)',
        theme_heading: 'Act 4: Goebbels & Modern Propaganda Campaigns (1930–1932)',
        source: {
          id: 'source_a_nazi_poster_our_last_hope',
          letter: 'A',
          title: 'Source A: Nazi Presidential Election Poster: "Our Last Hope: Hitler" (1932)',
          src: '/images/nazi_poster_our_last_hope.jpg',
          source: '/images/nazi_poster_our_last_hope.jpg',
          image: '/images/nazi_poster_our_last_hope.jpg',
          caption:
            'A 1932 Nazi election poster showing gaunt, desperate German workers beneath the slogan "Our Last Hope: Hitler", exploiting Great Depression suffering.',
          desc: 'Archival election poster by Hans Schweitzer (Mjölnir) for the 1932 presidential election.',
          provenance:
            'Original 1932 German election poster, Imperial War Museum / German Federal Archives collection.',
          citation: 'Bundesarchiv Plak 003-024-001, "Unsere letzte Hoffnung: Hitler", 1932.',
          question:
            'How does the visual composition of Source A exploit the psychological despair of the Great Depression to present Hitler as an indispensable national saviour?',
          hinge_question:
            'How does the visual composition of Source A exploit the psychological despair of the Great Depression to present Hitler as an indispensable national saviour?',
          source_context:
            'Iconic 1932 Nazi election poster designed by Mjölnir (Hans Schweitzer), showing the desperate, gaunt faces of unemployed German workers and mothers beneath the bold slogan "Our Last Hope: Hitler". Hinge Question: How does the visual composition of Source A exploit the psychological despair of the Great Depression to present Hitler as an indispensable national saviour?',
          context:
            'Iconic 1932 Nazi election poster showing desperate unemployed German workers and mothers beneath the bold slogan "Our Last Hope: Hitler".',
        },
        text: '<span class="para-ref">[4.1]</span> In 1930, Hitler appointed the brilliant, cynical <strong>Dr. Joseph Goebbels</strong> as head of party propaganda (<em>Reichspropagandaleiter</em>). Goebbels brought revolutionary marketing techniques to German politics. He understood that mass audiences were swayed by simple, repetitive emotional messages rather than complex intellectual arguments. The Nazis plastered every town with hundreds of thousands of striking, artistically sophisticated posters with punchy slogans: "Work and Bread" (<em>Arbeit und Brot</em>), "Freedom and Bread," and the famous 1932 image of starving, hollow-eyed workers titled <strong>"Our Last Hope: Hitler"</strong> (<span class="archival-meta-tag">Source A</span>).<br><br><span class="para-ref">[4.2]</span> Goebbels also harnessed cutting-edge technology. In the 1932 presidential campaign, the Nazis chartered a modern passenger airplane for the legendary tour <strong>"Hitler Over Germany"</strong> (<em>Hitler über Deutschland</em>), allowing Hitler to fly into five different major cities in a single day, addressing up to 200,000 spectators per stop like a god descending from the clouds. The party mass-produced phonograph records of Hitler’s speeches for household gramophones, screened campaign films in cinemas, and orchestrated theatrical evening torchlight parades with brass bands and thousands of marching SA men, projecting an irresistible image of youthful dynamism, strict discipline, and national rejuvenation.',
      },
      {
        act: 5,
        title: 'Act 5: The July 1932 Reichstag Breakthrough',
        theme_heading: 'Act 5: The July 1932 Reichstag Breakthrough',
        text: '<span class="para-ref">[5.1]</span> Goebbels’ relentless propaganda offensive yielded sensational electoral dividends. In the September 1930 elections, the NSDAP stunned the political world by leaping from 12 seats to 107 seats (18.3% of the vote), becoming the second-largest party overnight. In the presidential election of April 1932, Hitler challenged eighty-four-year-old Field Marshal von Hindenburg, winning a formidable 13.4 million votes (36.8%)—solidifying his stature as a genuine national statesman.<br><br><span class="para-ref">[5.2]</span> The climax arrived in the <strong>Reichstag elections of July 1932</strong>. Amidst widespread street fighting that saw over one hundred people killed in political clashes during the campaign, the Nazi Party won <strong>230 seats</strong>, capturing <strong>37.3% of the popular vote</strong>. For the first time, the NSDAP was by far the largest political party in the Reichstag, having gained 13.7 million votes. As leader of the largest parliamentary faction, Hitler marched into the presidential palace on 13 August 1932 and demanded that Hindenburg appoint him Chancellor with full emergency powers. However, the proud aristocratic Field Marshal despised the former corporal, bluntly rejecting his demand and telling Hitler he could only enter government as a subordinate Vice-Chancellor under Franz von Papen. Hitler refused to compromise, and political deadlock intensified.',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: 'Oct 1929',
        title: 'The Wall Street Crash & Economic Meltdown',
        spec_focus:
          'Wall Street Crash (1929); recall of US short-term loans; bank runs; Danatbank.',
        focus_clue: 'How did the American stock crash shatter Germany’s banking system?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'American investors recalling ninety-day short-term loans',
          'German industrial output falling by forty percent',
          'Bank queues forming as Danatbank collapses in panic',
        ],
        writing_frame: {
          connectives:
            'A primary catalyst was that... &bull; In particular, the crash caused... &bull; This damaged Germany because... &bull; As a result, ...',
        },
      },
      {
        stage: 2,
        dates: '1930–1932',
        title: 'Mass Unemployment & The "Hunger Chancellor"',
        spec_focus: 'Six million unemployed; Heinrich Brüning austerity; Article 48 decrees.',
        focus_clue: 'Why did Brüning’s austerity policies deepen economic misery?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Six million workers registering on jobless lists',
          'Heinrich Brüning slashing state unemployment benefits',
          'President Hindenburg signing sixty-six Article 48 decrees',
        ],
        writing_frame: {
          connectives:
            'This led directly to crisis because... &bull; For instance, unemployment rose to... &bull; Furthermore, Brüning responded by... &bull; Consequently, ...',
        },
      },
      {
        stage: 3,
        dates: '1930–1932',
        title: 'The Communist Threat & Polarisation',
        spec_focus: 'Rise of KPD; street violence; negative cohesion; middle-class fear.',
        focus_clue:
          'How did fear of a Communist revolution drive middle-class voters toward the Nazis?',
        para_ref: '[3.1–3.2]',
        bullets: [
          'Communist party winning seventy-seven seats in parliament',
          'Red Front Fighters clashing with brownshirts in streets',
          'Industrialists donating party funds out of Bolshevik fear',
        ],
        writing_frame: {
          connectives:
            'Another decisive factor was... &bull; Specifically, the growth of communism created... &bull; This pushed voters toward Hitler because... &bull; In addition, ...',
        },
      },
      {
        stage: 4,
        dates: '1930–1932',
        title: 'Goebbels & Modern Propaganda Campaigns',
        spec_focus:
          'Joseph Goebbels; "Hitler over Germany"; posters ("Work and Bread"); radio/cinema.',
        focus_clue:
          'What innovative propaganda methods created an impression of dynamic national movement?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Chartering private aeroplane for flights over Germany',
          'Plastering three-word posters promising work and bread',
          'Mass-producing gramophone records for household radios',
        ],
        writing_frame: {
          connectives:
            'A major development was the role of... &bull; For example, Goebbels pioneered... &bull; This was effective because... &bull; Therefore, ...',
        },
      },
      {
        stage: 5,
        dates: 'Jul 1932',
        title: 'The July Reichstag Breakthrough',
        spec_focus: 'July 1932 election (230 seats, 37.3%); largest party; Hindenburg refusal.',
        focus_clue: 'Why did the Nazis become the largest party yet remain excluded from power?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Winning two hundred and thirty parliamentary seats',
          'Becoming largest party with thirty-seven percent vote',
          'Hindenburg refusing to appoint corporal as national chancellor',
        ],
        writing_frame: {
          connectives:
            'The culmination of this growth was... &bull; In July 1932, the party achieved... &bull; However, power was delayed because... &bull; Overall, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT2.3: The Growth of Nazi Support (1929–1932)',
      subtitle: 'From Wall Street Crash to 230-Seat Reichstag Dominance',
      stages: [
        {
          step: 1,
          date: 'Oct 1929',
          para_ref: '[1.1–1.2]',
          title: 'The Wall Street Crash & Economic Meltdown',
          actor: 'American Banks & German Industry',
          tag: '📉 WALL STREET CRASH',
          trigger:
            'American banks recalled 90-day short-term loans, causing Danatbank to collapse and German industrial output to plummet by 40%.',
          desc: 'American banks recalled 90-day short-term loans, causing Danatbank to collapse and German industrial output to plummet by 40%.',
          connective:
            'Triggered widespread industrial bankruptcies and mass factory closures across Germany.',
          question: 'How did the American stock crash shatter Germany’s banking system?',
        },
        {
          step: 2,
          date: '1930–1932',
          para_ref: '[2.1–2.2]',
          title: 'Mass Unemployment & The "Hunger Chancellor"',
          actor: 'Heinrich Brüning & Six Million Unemployed',
          tag: '🥫 AUSTERITY & SIX MILLION JOBLESS',
          trigger:
            'Unemployment peaked at 6 million, while Chancellor Brüning slashed benefits and ruled via 66 Article 48 presidential decrees.',
          desc: 'Unemployment peaked at 6 million, while Chancellor Brüning slashed benefits and ruled via 66 Article 48 presidential decrees.',
          connective:
            'Destroyed public faith in democratic Weimar institutions and radicalized desperate working-class and middle-class voters.',
          question: 'Why did Brüning’s austerity policies deepen economic misery?',
        },
        {
          step: 3,
          date: '1930–1932',
          para_ref: '[3.1–3.2]',
          title: 'The Communist Threat & Polarisation',
          actor: 'KPD Red Front & Fearful Middle Class',
          tag: '🚩 NEGATIVE COHESION',
          trigger:
            'The Communist Party surged to 100 Reichstag seats, terrifying middle-class shopkeepers and wealthy industrialists into backing the Nazis as a bulwark.',
          desc: 'The Communist Party surged to 100 Reichstag seats, terrifying middle-class shopkeepers and wealthy industrialists into backing the Nazis as a bulwark.',
          connective:
            'Created "negative cohesion", mobilizing millions of anti-communist protest votes and business campaign donations for Hitler.',
          question:
            'How did fear of a Communist revolution drive middle-class voters toward the Nazis?',
        },
        {
          step: 4,
          date: '1930–1932',
          para_ref: '[4.1–4.2]',
          title: 'Goebbels & Modern Propaganda Campaigns',
          actor: 'Dr. Joseph Goebbels & NSDAP Machine',
          tag: '✈️ HITLER OVER GERMANY',
          trigger:
            'Goebbels launched airplane tours ("Hitler over Germany"), radio gramophone records, and posters promising "Work and Bread."',
          desc: 'Goebbels launched airplane tours ("Hitler over Germany"), radio gramophone records, and posters promising "Work and Bread."',
          connective:
            'Projected an irresistible aura of youthful energy, order, and national salvation that resonated with millions of suffering citizens.',
          question:
            'What innovative propaganda methods created an impression of dynamic national movement?',
        },
        {
          step: 5,
          date: 'Jul 1932',
          para_ref: '[5.1–5.2]',
          title: 'The July Reichstag Breakthrough',
          actor: 'Adolf Hitler & President Hindenburg',
          tag: '🏛️ 230-SEAT PLURALITY',
          trigger:
            'The Nazis won 230 seats (37.3%) to become the largest party in the Reichstag, though Hindenburg initially refused to appoint Hitler Chancellor.',
          desc: 'The Nazis won 230 seats (37.3%) to become the largest party in the Reichstag, though Hindenburg initially refused to appoint Hitler Chancellor.',
          connective:
            'Made parliamentary government impossible without Nazi participation, triggering the backstairs political intrigues of late 1932.',
          question: 'Why did the Nazis become the largest party yet remain excluded from power?',
        },
      ],
    },
  },

  // --------------------------------------------------------------------------
  // LESSON 2.4: HOW HITLER BECAME CHANCELLOR, 1932–1933
  // --------------------------------------------------------------------------
  lesson_2_4: {
    teacher_notes: {
      primer:
        'This enquiry examines the climactic political intrigues between July 1932 and January 1933 that culminated in Adolf Hitler being appointed Chancellor of Germany. Students analyze the November 1932 electoral setback and financial exhaustion of the NSDAP, General Kurt von Schleicher’s failed chancellorship and alienation of Prussian aristocratic landowners, Franz von Papen’s bitter rivalry and secret negotiations at Cologne banker Kurt von Schroeder’s villa, the fatal miscalculation of conservative elites ("boxed into a corner"), and President Paul von Hindenburg’s capitulation leading to Hitler’s legal swearing-in on 30 January 1933.',
      objectives: [
        {
          objective:
            'Explain why the November 1932 Reichstag election represented a dangerous setback and financial crisis for the NSDAP.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that the Nazis lost 2 million votes and 34 seats, party coffers were emptied by three national campaigns in nine months, and Gregor Strasser resigned after urging compromise.',
          question:
            'Why did contemporary observers in late 1932 believe that the Nazi electoral tide had finally peaked and was receding?',
        },
        {
          objective:
            'Analyse why General Kurt von Schleicher’s brief chancellorship alienated conservative Prussian landowners (Junkers).',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain Schleicher’s attempt to split the Nazi party and his proposal to break up bankrupt East Prussian aristocratic estates (Osthilfe scandal), which enraged President Hindenburg and wealthy landowners.',
          question:
            'How did General von Schleicher’s economic and agricultural proposals provoke aristocratic conservative opposition?',
        },
        {
          objective:
            'Assess how Franz von Papen and industrial financiers forged a secret alliance with Hitler at the Schroeder Villa in January 1933.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Detail the 4 January 1933 secret meeting at banker Kurt von Schroeder’s home in Cologne, where Papen sought revenge against Schleicher and industrialists agreed to clear Nazi debts in exchange for political influence.',
          question:
            'What mutual benefits did Franz von Papen and Adolf Hitler hope to gain from their secret meeting at the Schroeder Villa?',
        },
        {
          objective:
            'Examine the fatal miscalculation of the conservative political elites who believed they could control Hitler ("boxed in").',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source A (British political cartoon on Papen and Hitler). Emphasize Papen’s famous boast: "Within two months we will have pushed Hitler so far into a corner that he will squeak!"',
          question:
            'Why did Franz von Papen and the conservative establishment believe they could easily manipulate and control Hitler in cabinet?',
        },
        {
          objective:
            'Evaluate the significance of Hitler’s legal appointment as Chancellor on 30 January 1933 and the symbolic torchlight parade.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source B (Hitler and Hindenburg). Contrast Hitler’s legal constitutional swearing-in with the triumphalist evening torchlight parade of 25,000 stormtroopers through the Brandenburg Gate.',
          question:
            'How did Hitler’s appointment demonstrate both constitutional legality and the menacing threat of paramilitary revolution?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: British Political Cartoon on Franz von Papen and Adolf Hitler (January 1933). British cartoon commenting on the conservative elite’s backdoor intrigue to install Hitler as Chancellor, depicting Franz von Papen opening the door for Hitler while naively believing he can control the radical leader. Hinge Question: How does Source A capture the fundamental miscalculation of German conservative elites in believing they could tame Hitler?',
        'Source B':
          'Source B: Adolf Hitler and President Paul von Hindenburg (1933). Archival photograph of Chancellor Adolf Hitler bowing respectfully in morning dress to the towering, uniformed Field Marshal Paul von Hindenburg on the Day of Potsdam in March 1933. Hinge Question: How did Hitler’s public deference to President Hindenburg in Source B reassure traditional German conservatives while concealing his revolutionary totalitarian ambitions?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Nazi Setback & Financial Exhaustion (Nov 1932)',
        theme_heading: 'Act 1: The Nazi Setback & Financial Exhaustion (Nov 1932)',
        text: '<span class="para-ref">[1.1]</span> In the autumn of 1932, it appeared that the Nazi Party’s electoral surge had crested and begun to recede. Following Hitler’s refusal to serve as Vice-Chancellor under Franz von Papen, the Reichstag passed an overwhelming vote of no confidence against Papen’s government by 512 votes to 42. Papen dissolved parliament, triggering yet another national election in November 1932—the third major election within nine months. German voters were exhausted by relentless campaigning and violent street brawls. When the results were tallied on 6 November 1932, the NSDAP suffered a severe blow: they lost <strong>two million votes and thirty-four Reichstag seats</strong>, dropping from 230 seats to 196 (33.1%).<br><br><span class="para-ref">[1.2]</span> The setback triggered an acute internal crisis within the party. The party’s financial reserves were completely exhausted by the astronomical costs of printing posters, chartering aircraft, and maintaining thousands of full-time SA stormtroopers. Joseph Goebbels confided despairingly in his diary: "The future looks dark and gloomy; all prospects and hopes have completely vanished." Sensing impending disaster, <strong>Gregor Strasser</strong>, the party’s national organization leader, urged Hitler to abandon his "all-or-nothing" demand for the chancellorship and enter a coalition government with General Kurt von Schleicher. Furious at what he viewed as treacherous compromise, Hitler violently denounced Strasser, who resigned all his party posts in December 1932, leaving the party leadership deeply fractured.',
      },
      {
        act: 2,
        title: 'Act 2: General von Schleicher’s Failed Chancellor Gamble (Dec 1932)',
        theme_heading: 'Act 2: General von Schleicher’s Failed Chancellor Gamble (Dec 1932)',
        text: '<span class="para-ref">[2.1]</span> On 2 December 1932, President Hindenburg dismissed Papen and appointed <strong>General Kurt von Schleicher</strong>—the army’s chief political strategist—as Chancellor. Schleicher believed he could restore political stability by engineering a "cross-front" (<em>Querfront</em>) alliance uniting moderate trade unionists, the Centre Party, and the socialist wing of the Nazi Party under Gregor Strasser. However, Schleicher’s ambitious strategy collapsed almost immediately. Hitler ruthlessly reimposed absolute discipline over the NSDAP, preventing any Nazi deputies from joining the government, while left-wing trade unions deeply distrusted a military general.<br><br><span class="para-ref">[2.2]</span> Desperate to alleviate the economic depression, Schleicher then proposed a radical agricultural reform: dividing up bankrupt aristocratic estates in East Prussia and distributing the land to forty thousand unemployed families. This proposal provoked blind fury among the wealthy Prussian landowning nobility (the <strong>Junkers</strong>), who denounced Schleicher as an "Agrarian Bolshevik." Crucially, President Hindenburg was himself a Prussian Junker landowner whose family estate at Neudeck had been expanded using controversial state subsidies (the <em>Osthilfe</em> scandal). The aristocratic landowners surrounded the aged President, warning him that Schleicher was a dangerous socialist general who would ruin the traditional Prussian military and social order.',
      },
      {
        act: 3,
        title: 'Act 3: The Secret Schroeder Villa Meeting (4 Jan 1933)',
        theme_heading: 'Act 3: The Secret Schroeder Villa Meeting (4 Jan 1933)',
        text: '<span class="para-ref">[3.1]</span> Schleicher’s isolation provided the ousted Chancellor, <strong>Franz von Papen</strong>, with an irresistible opportunity for personal revenge. Papen was furious at Schleicher for deposing him and determined to regain power at any cost. On 4 January 1933, Papen met Adolf Hitler in secret at the private villa of the wealthy Cologne banker <strong>Kurt von Schroeder</strong>. Aware that the press was watching them, Hitler arrived in disguise, slipping into the banker’s residence under cover of darkness.<br><br><span class="para-ref">[3.2]</span> During their intense negotiations, Papen and Hitler reached a historic political pact. Papen proposed a coalition government in which Hitler would be appointed Chancellor, while Papen would serve as Vice-Chancellor with the special right to be present whenever Hitler met President Hindenburg. In exchange, industrialist friends of Schroeder and Thyssen agreed to pour substantial emergency funds into the Nazi Party to clear its catastrophic bank overdrafts. Hitler agreed to the proposal, recognizing that alliance with the aristocratic Papen provided the indispensable key to unlocking President Hindenburg’s approval.',
      },
      {
        act: 4,
        title: 'Act 4: The Backstairs Plot & Hindenburg’s Capitulation (20–28 Jan 1933)',
        theme_heading: 'Act 4: The Backstairs Plot & Hindenburg’s Capitulation (20–28 Jan 1933)',
        source: {
          id: 'source_a_papen_hitler_cartoon',
          letter: 'A',
          title: 'Source A: British Political Cartoon on Franz von Papen and Adolf Hitler (1933)',
          src: '/images/papen_hitler_cartoon.jpg',
          source: '/images/papen_hitler_cartoon.jpg',
          image: '/images/papen_hitler_cartoon.jpg',
          caption:
            'A 1933 political cartoon depicting Franz von Papen opening the door to power for Hitler while naively believing the radical Nazi leader could be controlled.',
          desc: 'Archival political cartoon illustrating the backdoor political intrigue of January 1933.',
          provenance:
            'British political cartoon published in the British press, early 1933, commenting on Papen’s coalition with Hitler.',
          citation: 'National Archival Press Collection, London, January 1933.',
          question:
            'How does Source A capture the fundamental miscalculation of German conservative elites in believing they could tame Hitler?',
          hinge_question:
            'How does Source A capture the fundamental miscalculation of German conservative elites in believing they could tame Hitler?',
          source_context:
            'British political cartoon commenting on the conservative elite’s backdoor intrigue to install Hitler as Chancellor, depicting Franz von Papen opening the door for Hitler while naively believing he can control the radical leader. Hinge Question: How does Source A capture the fundamental miscalculation of German conservative elites in believing they could tame Hitler?',
          context:
            'British political cartoon commenting on the conservative elite’s backdoor intrigue to install Hitler as Chancellor in January 1933.',
        },
        text: '<span class="para-ref">[4.1]</span> Between 20 and 28 January 1933, the final pieces of the "backstairs plot" fell into place. General von Schleicher, unable to secure a parliamentary majority, admitted defeat and formally tendered his resignation on 28 January. Papen immediately stepped into the breach, working tirelessly alongside Hindenburg’s influential son, Oskar von Hindenburg, and State Secretary Otto Meissner to persuade the eighty-five-year-old Field Marshal to overcome his deep personal disdain for Hitler.<br><br><span class="para-ref">[4.2]</span> Papen assured Hindenburg that the radical Nazi leader would be totally harmless and safely under control: out of eleven ministerial posts in the proposed cabinet, only three would be Nazis—Hitler as Chancellor, Wilhelm Frick as Minister of the Interior, and Hermann Göring as Minister without Portfolio. The remaining eight ministries would be held by conservative aristocrats, with Papen as Vice-Chancellor and the conservative Alfred Hugenberg controlling the Ministry of Economics (<span class="archival-meta-tag">Source A</span>). Papen arrogantly reassured skeptical conservative friends: "You are mistaken. We’ve engaged him for our own purposes... Within two months we will have pushed Hitler so far into a corner that he will squeak!" Trapped by political paralysis and fearing army intervention or civil war, Hindenburg capitulated.',
      },
      {
        act: 5,
        title: 'Act 5: Appointment as Chancellor & Torchlight Parade (30 Jan 1933)',
        theme_heading: 'Act 5: Appointment as Chancellor & Torchlight Parade (30 Jan 1933)',
        source: {
          id: 'source_b_hitler_hindenburg_1933',
          letter: 'B',
          title: 'Source B: Adolf Hitler and President Paul von Hindenburg (1933)',
          src: '/images/hitler_hindenburg_1933.jpg',
          source: '/images/hitler_hindenburg_1933.jpg',
          image: '/images/hitler_hindenburg_1933.jpg',
          caption:
            'Adolf Hitler bowing respectfully to the uniformed President Paul von Hindenburg in March 1933, projecting an image of traditional conservative legitimacy.',
          desc: 'Archival photograph of Chancellor Adolf Hitler and Field Marshal Paul von Hindenburg.',
          provenance:
            'Archival press photograph of Hitler and Hindenburg at the Day of Potsdam, March 1933. German Federal Archives (Bundesarchiv Bild 183-S38324).',
          citation: 'Bundesarchiv Bild 183-S38324, Hitler and Hindenburg, 1933.',
          question:
            'How did Hitler’s public deference to President Hindenburg in Source B reassure traditional German conservatives while concealing his revolutionary totalitarian ambitions?',
          hinge_question:
            'How did Hitler’s public deference to President Hindenburg in Source B reassure traditional German conservatives while concealing his revolutionary totalitarian ambitions?',
          source_context:
            'Archival photograph of Chancellor Adolf Hitler bowing respectfully in morning dress to the towering, uniformed Field Marshal Paul von Hindenburg in 1933. Hinge Question: How did Hitler’s public deference to President Hindenburg in Source B reassure traditional German conservatives while concealing his revolutionary totalitarian ambitions?',
          context:
            'Archival photograph of Chancellor Adolf Hitler bowing respectfully in morning dress to President Paul von Hindenburg in 1933.',
        },
        text: '<span class="para-ref">[5.1]</span> At noon on Monday, <strong>30 January 1933</strong>, Adolf Hitler entered the Presidential Palace in Berlin. Standing before President Hindenburg, he solemnly took the constitutional oath of office as Chancellor of the German Republic (<span class="archival-meta-tag">Source B</span>), swearing to uphold the Weimar Constitution and defend the laws of the German people. Hitler had arrived at supreme executive power through strictly legal, constitutional procedures—just as he had pledged after the failure of the Munich Putsch nine years earlier. The conservative elites believed they had boxed the vulgar agitator into a corner where he would serve their own interests.<br><br><span class="para-ref">[5.2]</span> That evening, the Nazis celebrated their triumph with a breathtaking display of paramilitary spectacle. From 7:00 PM until past midnight, twenty-five thousand uniform-clad SA and SS men, accompanied by military brass bands, marched in flawless formation through the iconic Brandenburg Gate and down the Wilhelmstrasse. Carrying blazing kerosene torches that illuminated the dark Berlin night, they sang the martial anthem <em>Horst-Wessel-Lied</em>. High above the street at an open window of the Reich Chancellery stood Hitler, his arm raised in the Roman salute, receiving the adulation of his marching legions. A few windows away, the aged, frail Field Marshal Hindenburg tapped his walking stick in time to the military marches, mistaking the stormtroopers for imperial soldiers returning from the Great War. Weimar democracy was dead; the Third Reich had begun.',
      },
    ],
    workbook_stages: [
      {
        stage: 1,
        dates: 'Nov 1932',
        title: 'The Nazi Setback & Financial Exhaustion',
        spec_focus:
          'November 1932 election (loss of 2m votes, 34 seats); financial crisis; Strasser rift.',
        focus_clue: 'Why did the November 1932 election suggest Nazi momentum was fading?',
        para_ref: '[1.1–1.2]',
        bullets: [
          'Losing two million votes and thirty-four seats',
          'Party bank accounts emptied by endless election campaigns',
          'Gregor Strasser resigning over refusal to form coalition',
        ],
        writing_frame: {
          connectives:
            'A significant crisis emerged when... &bull; For example, in November 1932 the Nazis... &bull; This created danger because... &bull; As a consequence, ...',
        },
      },
      {
        stage: 2,
        dates: 'Dec 1932',
        title: 'General von Schleicher’s Failed Chancellor Gamble',
        spec_focus:
          'Kurt von Schleicher chancellorship; Querfront attempt; Osthilfe scandal; Junker wrath.',
        focus_clue: 'Why did Schleicher’s policies alienate powerful conservative barons?',
        para_ref: '[2.1–2.2]',
        bullets: [
          'Attempting to split socialist wing from party leadership',
          'Proposing land division of bankrupt Prussian aristocratic estates',
          'Conservative landowners turning aged president against general',
        ],
        writing_frame: {
          connectives:
            'This situation deepened because... &bull; In particular, Schleicher attempted to... &bull; However, this failed because... &bull; Consequently, ...',
        },
      },
      {
        stage: 3,
        dates: '4 Jan 1933',
        title: 'The Secret Schroeder Villa Meeting',
        spec_focus: 'Papen-Hitler secret talks; Schroeder Villa, Cologne; industrialist funding.',
        focus_clue: 'How did Papen’s personal rivalry with Schleicher lead to political collusion?',
        para_ref: '[3.1–3.2]',
        bullets: [
          "Meeting secretly at Cologne banker's private residence",
          'Franz von Papen agreeing to share cabinet power',
          'Industrialists pledging to pay off mounting party debts',
        ],
        writing_frame: {
          connectives:
            'A decisive turning point occurred when... &bull; For instance, Papen and Hitler met at... &bull; This agreement was vital because... &bull; Furthermore, ...',
        },
      },
      {
        stage: 4,
        dates: '20–28 Jan 1933',
        title: 'The Backstairs Plot & Hindenburg’s Capitulation',
        spec_focus:
          'The backstairs intrigue; Papen "boxed into a corner" claim; Hindenburg persuasion.',
        focus_clue: 'Why did conservative elites believe they could control and manipulate Hitler?',
        para_ref: '[4.1–4.2]',
        bullets: [
          'Papen persuading president that radical leader can be boxed in',
          'Restricting cabinet to three party members out of eleven',
          'Junkers convincing marshal that only coalition can stop civil war',
        ],
        writing_frame: {
          connectives:
            'The final intrigue succeeded because... &bull; Specifically, Papen convinced Hindenburg that... &bull; This was a fatal miscalculation because... &bull; Therefore, ...',
        },
      },
      {
        stage: 5,
        dates: '30 Jan 1933',
        title: 'Appointment as Chancellor & Torchlight Parade',
        spec_focus:
          '30 January 1933 appointment; legal oath; evening torchlight parade; end of Weimar.',
        focus_clue:
          'How did the appointment mark both legal transition and triumphant celebration?',
        para_ref: '[5.1–5.2]',
        bullets: [
          'Swearing constitutional oath before eighty-five-year-old president',
          'Twenty-five thousand stormtroopers marching through Brandenburg Gate',
          'Singing Horst Wessel anthem under blazing kerosene torches',
        ],
        writing_frame: {
          connectives:
            'Ultimately, Hitler was appointed because... &bull; On 30 January 1933, he took... &bull; This event was historic because... &bull; In conclusion, ...',
        },
      },
    ],
    causal_domino_spine: {
      title: 'KT2.4: How Hitler Became Chancellor (1932–1933)',
      subtitle: 'From November Electoral Slump to Backstairs Intrigue and 30 January Appointment',
      stages: [
        {
          step: 1,
          date: 'Nov 1932',
          para_ref: '[1.1–1.2]',
          title: 'The Nazi Setback & Financial Exhaustion',
          actor: 'Adolf Hitler & Gregor Strasser',
          tag: '📉 NOVEMBER ELECTION SLUMP',
          trigger:
            'The Nazis lost 2 million votes and 34 seats in November 1932, emptying party bank accounts and prompting Gregor Strasser to resign in protest.',
          desc: 'The Nazis lost 2 million votes and 34 seats in November 1932, emptying party bank accounts and prompting Gregor Strasser to resign in protest.',
          connective:
            'Threatened the party with financial collapse, forcing Hitler to seek external aristocratic funding and political alliances.',
          question: 'Why did the November 1932 election suggest Nazi momentum was fading?',
        },
        {
          step: 2,
          date: 'Dec 1932',
          para_ref: '[2.1–2.2]',
          title: 'General von Schleicher’s Failed Chancellor Gamble',
          actor: 'General Kurt von Schleicher & Prussian Junkers',
          tag: '🌾 QUERFRONT COLLAPSE & JUNKER FURY',
          trigger:
            'Schleicher failed to split the Nazis and proposed redistributing bankrupt aristocratic Prussian estates, outraging Junker landowners and Hindenburg.',
          desc: 'Schleicher failed to split the Nazis and proposed redistributing bankrupt aristocratic Prussian estates, outraging Junker landowners and Hindenburg.',
          connective:
            'Isolated Schleicher completely, leaving the presidency desperate for an alternative right-wing government.',
          question: 'Why did Schleicher’s policies alienate powerful conservative barons?',
        },
        {
          step: 3,
          date: '4 Jan 1933',
          para_ref: '[3.1–3.2]',
          title: 'The Secret Schroeder Villa Meeting',
          actor: 'Franz von Papen, Adolf Hitler & Banker Schroeder',
          tag: '🤝 SECRET COLOGNE PACT',
          trigger:
            'Papen met Hitler secretly at banker Kurt von Schroeder’s villa in Cologne, agreeing to share power and securing industrialist cash to pay Nazi debts.',
          desc: 'Papen met Hitler secretly at banker Kurt von Schroeder’s villa in Cologne, agreeing to share power and securing industrialist cash to pay Nazi debts.',
          connective:
            'Forged the conservative-Nazi alliance that provided the political mechanism to overcome Hindenburg’s objections.',
          question: 'How did Papen’s personal rivalry with Schleicher lead to political collusion?',
        },
        {
          step: 4,
          date: '20–28 Jan 1933',
          para_ref: '[4.1–4.2]',
          title: 'The Backstairs Plot & Hindenburg’s Capitulation',
          actor: 'Franz von Papen & Paul von Hindenburg',
          tag: '🚪 "BOXED INTO A CORNER"',
          trigger:
            'Papen convinced Hindenburg that Hitler could be "boxed in" within a cabinet containing only three Nazis alongside eight traditional conservatives.',
          desc: 'Papen convinced Hindenburg that Hitler could be "boxed in" within a cabinet containing only three Nazis alongside eight traditional conservatives.',
          connective:
            'Overcame Hindenburg’s long-standing personal refusal to appoint Hitler, directly delivering executive power into Nazi hands.',
          question: 'Why did conservative elites believe they could control and manipulate Hitler?',
        },
        {
          step: 5,
          date: '30 Jan 1933',
          para_ref: '[5.1–5.2]',
          title: 'Appointment as Chancellor & Torchlight Parade',
          actor: 'Adolf Hitler & 25,000 Stormtroopers',
          tag: '🔥 30 JANUARY CHANCELLORSHIP',
          trigger:
            'Hitler took the constitutional oath before Hindenburg at noon, celebrated that night by 25,000 SA men marching with torches through the Brandenburg Gate.',
          desc: 'Hitler took the constitutional oath before Hindenburg at noon, celebrated that night by 25,000 SA men marching with torches through the Brandenburg Gate.',
          connective:
            'Marked the fatal constitutional transfer of state executive power to Adolf Hitler, sealing the collapse of the Weimar Republic.',
          question:
            'How did the appointment mark both legal transition and triumphant celebration?',
        },
      ],
    },
  },
};

for (let i = 4; i < 8; i++) {
  const lesson = unitData.lessons[i];
  const updateData = KT2_5_ACT_DATA[lesson.id];
  if (!updateData) continue;

  console.log(`\nTransforming ${lesson.id} (${lesson.title})...`);

  // 1. Apply 5 narrative_blocks
  lesson.narrative_blocks = updateData.narrative_blocks;
  console.log(`  - Applied 5 narrative blocks (${lesson.narrative_blocks.length} Acts).`);

  // 2. Apply workbook_stages
  lesson.workbook_stages = updateData.workbook_stages;
  console.log(`  - Aligned workbook_stages (${lesson.workbook_stages.length} stages).`);

  // 3. Apply causal_domino_spine
  lesson.causal_domino_spine = updateData.causal_domino_spine;
  console.log(
    `  - Aligned causal_domino_spine (${lesson.causal_domino_spine.stages.length} stages).`,
  );

  // 4. Update timeline_anchor
  lesson.timeline_anchor = updateData.causal_domino_spine.stages.map((st) => ({
    date: st.date,
    title: st.title,
    desc: st.trigger,
    para_ref: st.para_ref,
  }));
  console.log(`  - Aligned timeline_anchor (${lesson.timeline_anchor.length} anchors).`);

  // 5. Apply teacher_notes
  lesson.teacher_notes = updateData.teacher_notes;
  console.log(`  - Updated teacher_notes with 5 structured objectives & hinge questions.`);
}

const newFileContent =
  'const unitData = ' +
  JSON.stringify(unitData, null, 2) +
  ';\n\nexport default unitData;\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = unitData;\n}\n';
fs.writeFileSync(dataFilePath, newFileContent, 'utf8');

console.log(
  '\n✅ Successfully migrated Key Topic 2 (Hitler’s Rise to Power) to 5-Act Gold Standard in data.js!',
);
