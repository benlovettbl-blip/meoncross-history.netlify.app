/**
 * weimar_spreads_kt3.cjs
 *
 * Spreads 9 to 12 for Key Topic 3: Nazi Control and Dictatorship, 1933–39
 * Pearson Edexcel GCSE (9–1) History Paper 3 Option 31 (1HI0/31).
 *
 * Enforces the Paper 3 4-4-4-4 Question Matrix:
 * - Spread 9 (KT 3.1): inference_causation (Section A: Q1 Inference [4m] + Q2 Explain Why [12m])
 * - Spread 10 (KT 3.2): source_utility (Section B: Q3(a) Utility of Sources B and C [8m])
 * - Spread 11 (KT 3.3): interpretation_diff_why (Section B: Q3(b) Views Diff [4m] + Q3(c) Reasons [4m])
 * - Spread 12 (KT 3.4): interpretation_eval (Section B: Q3(d) Evaluative Essay [16+4m])
 */

module.exports = [
  // =========================================================================
  // SPREAD 9: KT 3.1 — THE CREATION OF A DICTATORSHIP, 1933–1934
  // Exam Format: inference_causation (Section A: Q1 [4m] + Q2 [12m])
  // =========================================================================
  {
    id: 'lesson_3_1',
    topic: 'Key Topic 3: Nazi Control & Dictatorship, 1933–39',
    title: 'KT 3.1: The Creation of a Dictatorship, 1933–1934',
    footerTag: 'KT 3.1: Creation of Dictatorship, 1933–34',
    left: {
      sectionTag: 'Consolidation of Power',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Within eighteen months of being appointed Chancellor, Adolf Hitler systematically dismantled the Weimar Republic. Exploiting the Reichstag Fire, he suspended fundamental civil liberties, passed the dictatorial Enabling Act, banned trade unions and opposition parties through *Gleichschaltung*, and eliminated internal SA rivals during the Night of the Long Knives. Following Hindenburg’s death in August 1934, Hitler became supreme Führer, binding the German Army to him by personal oath.',
      pillars: [
        {
          title: 'The Reichstag Fire & Emergency Decree',
          subtitle: 'Suspension of Civil Liberties',
          bullets: [
            '**Reichstag Fire (27 Feb 1933):** Dutch communist Marinus van der Lubbe arrested inside; Hitler exploited the arson as proof of a Communist conspiracy.',
            '**Emergency Decree (28 Feb):** Hindenburg signed Decree for the Protection of People and State, suspending free speech, assembly, and habeas corpus.',
            '**Destruction of the KPD:** Hermann Göring’s police arrested 4,000 Communist officials overnight, crippling the left before the March elections.',
          ],
        },
        {
          title: 'The Enabling Act & Gleichschaltung',
          subtitle: 'The Legalization of Tyranny',
          bullets: [
            '**Enabling Act (23 March 1933):** Passed 444–94 at the Kroll Opera under armed SA intimidation; gave Hitler power to enact laws without Reichstag consent.',
            '**Trade Unions Banned (2 May 1933):** SA raided union offices, arrested leaders, and replaced free unions with Robert Ley’s German Labour Front (DAF).',
            '**One-Party State (14 July 1933):** Law Against the Formation of Parties made the NSDAP the sole legal political party in Germany, outlawing all rivals.',
          ],
        },
        {
          title: 'Night of the Long Knives & The Führer Oath',
          subtitle: 'The Final Purge of Rivals',
          bullets: [
            '**SA Threat:** Ernst Röhm demanded his 3-million-strong SA absorb the army and launch a "Second Revolution", alarming conservative generals.',
            '**Blood Purge (30 June 1934):** SS squads murdered Röhm, Gregor Strasser, General Schleicher, and over 400 political rivals without trial.',
            '**The Führer Oath (August 1934):** Hindenburg died; Hitler merged Presidency and Chancellorship; the army swore an unconditional personal loyalty oath.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Marinus van der Lubbe',
          role: 'Dutch communist executed for starting the Reichstag Fire on 27 February 1933; used by Hitler as a pretext for emergency dictatorial decrees.',
        },
        {
          name: 'Otto Wels',
          role: 'SPD Chairman who delivered a heroic speech in the Kroll Opera on 23 March 1933, leading the only 94 deputies to vote against the Enabling Act.',
        },
        {
          name: 'Ernst Röhm',
          role: 'Commander of the SA brownshirts; executed in Stadelheim Prison during the Night of the Long Knives after demanding a "Second Revolution".',
        },
        {
          name: 'Hermann Göring',
          role: 'Prussian Minister of the Interior who controlled the police, founded the Gestapo in 1933, and coordinated the Night of the Long Knives in Berlin.',
        },
      ],
      milestones: [
        { date: '27 Feb 1933', event: 'Reichstag building burned; Van der Lubbe arrested' },
        {
          date: '28 Feb 1933',
          event: 'Reichstag Fire Decree indefinitely suspends basic civil rights',
        },
        {
          date: '23 Mar 1933',
          event: 'Enabling Act passed 444–94, transferring full legislative power to Hitler',
        },
        {
          date: '30 Jun 1934',
          event: 'Night of the Long Knives; SS purges SA leadership and conservative critics',
        },
        {
          date: '2 Aug 1934',
          event: 'President Hindenburg dies; Hitler combines offices to become Führer',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section A: Q1 Inference [4m] & Q2 Explain Why [12m]',
        title: 'The Reichstag Fire & The Destruction of Political Opposition',
        stem: 'Q1 (4m) Give two inferences from Source A about the methods used to secure the passage of the Enabling Act in March 1933 • Q2 (12m) Explain why Adolf Hitler was able to establish a totalitarian dictatorship between February 1933 and August 1934.',
        marks: '4 + 12 = 16',
        marksTime: '16 Marks • ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q1 Formula:</strong> Inference 1 + Direct Quote from Source A; Inference 2 + Direct Quote. Zero provenance.<br/><strong>Q2 Formula (3 PEE Paragraphs):</strong> (1) Reichstag Fire Decree suspending civil liberties & Enabling Act giving dictatorial powers → (2) Gleichschaltung (banning trade unions & political parties) → (3) Night of the Long Knives eliminating the SA threat & the Army loyalty oath upon Hindenburg’s death.',
        modelAnswer:
          '<strong>Q1 (Inference):</strong> One inference from Source A is that the Nazis used armed physical intimidation to terrorize deputies during the Enabling Act vote. The source states "armed SS and SA stormtroopers lined the corridors of the Kroll Opera, chanting threatening death slogans as deputies walked in", showing democratic freedom was extinguished. A second inference is that the Catholic Centre Party was coerced into compliance. The source notes "Hitler offered false verbal promises to protect Catholic schools and church privileges, leading Centre deputies to capitulate", proving Hitler used cynical political deception alongside violence.<br/><br/><strong>Q2 (Explain Why):</strong> One reason Hitler established a dictatorship was the exploitation of the Reichstag Fire of 27 February 1933. Hitler claimed the fire was the start of an armed Communist insurrection, persuading President Hindenburg to sign the emergency Decree for the Protection of People and State. This decree indefinitely suspended fundamental civil liberties—including freedom of speech, assembly, and habeas corpus. Hermann Göring used these powers to arrest 4,000 Communist officials, closing down opposition newspapers and ensuring the March 1933 election was held in an atmosphere of state terror. This enabled Hitler to pass the Enabling Act on 23 March 1933, which transferred full lawmaking power to Hitler’s cabinet for four years, legally destroying parliamentary democracy.<br/><br/>A second reason was the process of *Gleichschaltung* ("coordination"), whereby all independent institutions were eradicated. On 2 May 1933, SA stormtroopers raided trade union headquarters, arresting leaders and replacing free unions with the Nazi-controlled German Labour Front (DAF). On 14 July 1933, the Law Against the Formation of Parties made the NSDAP the sole legal party. Finally, during the Night of the Long Knives (30 June 1934), Hitler deployed the SS to execute SA Chief Ernst Röhm and over 400 potential rivals. This secured the unconditional loyalty of the regular army (*Reichswehr*), which swore a sacred personal oath of loyalty to Adolf Hitler when Hindenburg died in August 1934.',
        examinerNote:
          'Full marks. Q1 provides two valid inferences with precise supporting quotes. Q2 provides multi-layered causal explanation with precise terminology (Reichstag Fire Decree, Enabling Act, Gleichschaltung, DAF, Night of the Long Knives, Reichswehr oath).',
        pitfallCategory: 'Inference & Multi-Causal Pitfalls',
        pitfall:
          'In Q2, do not stop at January 1933. The question asks how Hitler established a dictatorship *between 1933 and 1934*; focus on the legal decrees, Gleichschaltung, and purges.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The 18-Month Transition to Dictatorship',
        steps: [
          {
            stage: '1. Reichstag Fire (Feb 1933)',
            desc: 'Emergency decree suspends civil liberties; 4,000 communists arrested by Göring’s police.',
          },
          {
            stage: '2. Enabling Act (Mar 1933)',
            desc: 'Reichstag passes dictatorial decree 444–94, transferring all lawmaking powers to Hitler.',
          },
          {
            stage: '3. Gleichschaltung (1933)',
            desc: 'Trade unions abolished; rival parties outlawed, establishing a totalitarian one-party state.',
          },
          {
            stage: '4. Night of Long Knives (1934)',
            desc: 'SS purges Röhm and SA; Hindenburg dies; German Army swears personal oath to the Führer.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Reichstag Fire',
          def: '27 Feb 1933 arson that served as the catalyst for emergency dictatorial decrees.',
        },
        {
          term: 'Enabling Act',
          def: 'Law passed 23 March 1933 granting Hitler absolute decree powers for four years.',
        },
        {
          term: 'Gleichschaltung',
          def: 'Coordination; the systematic Nazification of all state, legal, and social institutions.',
        },
        {
          term: 'DAF',
          def: 'German Labour Front; state union under Robert Ley replacing independent trade unions.',
        },
        {
          term: 'One-Party State',
          def: 'Status created 14 July 1933 outlawing all political parties except the NSDAP.',
        },
        {
          term: 'Long Knives',
          def: 'Night of the Long Knives; 30 June 1934 SS blood purge of the SA leadership.',
        },
        {
          term: 'Führer',
          def: 'Leader; supreme title assumed by Hitler merging President and Chancellor in Aug 1934.',
        },
        {
          term: 'Führer Oath',
          def: 'Unconditional personal loyalty oath sworn by every soldier in the German Army to Hitler.',
        },
        {
          term: 'Marinus van der Lubbe',
          def: 'Dutch communist convicted and beheaded for setting the Reichstag Fire.',
        },
        {
          term: 'Otto Wels',
          def: 'SPD leader who spoke out against the Enabling Act before being forced into exile.',
        },
        {
          term: 'Kroll Opera House',
          def: 'Berlin theatre where Reichstag sessions were held after the Reichstag building burned.',
        },
        {
          term: 'Article 48',
          def: 'Weimar emergency power invoked by Hindenburg on 28 Feb 1933 to suspend civil rights.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 10: KT 3.2 — THE POLICE STATE AND RELIGION, 1933–1939
  // Exam Format: source_utility (Section B: Q3(a) [8m])
  // =========================================================================
  {
    id: 'lesson_3_2',
    topic: 'Key Topic 3: Nazi Control & Dictatorship, 1933–39',
    title: 'KT 3.2: The Police State and Religion, 1933–1939',
    footerTag: 'KT 3.2: Police State & Religion, 1933–39',
    left: {
      sectionTag: 'Terror & Church',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'To enforce absolute ideological conformity, Heinrich Himmler constructed a formidable police state encompassing the SS, SD, and Gestapo. Operating above judicial law, the terror apparatus relied heavily on voluntary civilian denunciations and arbitrary concentration camp internment. Simultaneously, the regime subordinated the legal system through the People’s Court and launched the *Kirchenkampf* to neutralise Catholic and Protestant independence.',
      pillars: [
        {
          title: 'Himmler’s Terror Apparatus: SS, SD & Gestapo',
          subtitle: 'The Instruments of Coercion',
          bullets: [
            '**The SS (*Schutzstaffel*):** Himmler expanded the SS into an elite racial army divided into General SS, armed Waffen-SS, and Death’s Head camp guards.',
            '**The Gestapo & Heydrich’s SD:** The political secret police numbered only ~50,000 for 66M citizens; up to 80% of investigations began with civilian denunciations.',
            '**Concentration Camps (Dachau):** First camp opened in March 1933; over 200,000 political dissidents, trade unionists, and religious critics interned by 1939.',
          ],
        },
        {
          title: 'Subjugating the Legal System',
          subtitle: 'The Elimination of Justice',
          bullets: [
            '**National Socialist League of Law:** All judges, prosecutors, and lawyers compelled to join the BSRB, ensuring verdicts aligned with "healthy race feeling".',
            '**The People’s Court (*Volksgerichtshof*):** Established in 1934 under Roland Freisler to try political treason cases without juries or right of appeal.',
            '**Protective Custody (*Schutzhaft*):** Gestapo could re-arrest defendants acquitted by civilian courts and send them directly to concentration camps.',
          ],
        },
        {
          title: 'The Church Struggle (Kirchenkampf)',
          subtitle: 'Subverting Christianity',
          bullets: [
            '**The Reichskonkordat (July 1933):** Hitler signed treaty with Pope Pius XI, promising church autonomy before immediately closing Catholic youth leagues.',
            '**Reich Church vs Confessing Church:** Ludwig Müller created the pro-Nazi "German Christians"; Pastor Martin Niemöller led the 6,000-strong Confessing Church.',
            '**Church Persecution:** Over 300 Catholic priests interned in Dachau’s "Priest Block"; Pope Pius XI published encyclical *Mit Brennender Sorge* (1937).',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Heinrich Himmler',
          role: 'Reichsführer-SS and Chief of German Police; unified the SS, Gestapo, and concentration camps into a ruthless racial enforcement empire.',
        },
        {
          name: 'Reinhard Heydrich',
          role: 'Head of the SD (Security Service) and Gestapo; architect of domestic intelligence surveillance and anti-Jewish persecution.',
        },
        {
          name: 'Martin Niemöller',
          role: 'WWI U-boat commander and Protestant pastor who founded the anti-Nazi Confessing Church; arrested in 1937 and held in Dachau until 1945.',
        },
        {
          name: 'Clemens von Galen',
          role: 'Catholic Bishop of Münster whose fiery public sermons in 1941 condemned the secret Aktion T4 euthanasia programme, forcing a temporary halt.',
        },
      ],
      milestones: [
        {
          date: 'Mar 1933',
          event: 'First concentration camp established at Dachau for political prisoners',
        },
        { date: 'Jul 1933', event: 'Reichskonkordat signed between Hitler and the Vatican' },
        {
          date: 'Apr 1934',
          event: 'People’s Court (Volksgerichtshof) created to try treason cases',
        },
        {
          date: 'Jun 1936',
          event: 'Himmler appointed Chief of German Police, unifying police and SS',
        },
        {
          date: 'Mar 1937',
          event: 'Pope Pius XI issues encyclical Mit Brennender Sorge condemning racism',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(a) Source Utility [8m]',
        title: 'The Police State and Methods of Control in Nazi Germany',
        stem: 'Q3(a) Study Sources B and C. How useful are Sources B and C for an enquiry into the methods used by the Nazi police state to control German society between 1933 and 1939? Explain your answer, using Sources B and C and your knowledge of the historical context. (8 marks)',
        marks: '8',
        marksTime: '8 Marks • ~14 Mins Total',
        planningGuideTitle: 'Examiner Planning & C-O-P Framework:',
        planningGuide:
          '<strong>Structure:</strong> (1) Evaluate Source B (Content + Context + Provenance NOP) → (2) Evaluate Source C (Content + Context + Provenance NOP) → (3) Comparative synthesis judging utility.<br/><strong>Core Rule:</strong> Highlight how Source B demonstrates Gestapo surveillance and civilian denunciation, while Source C illustrates concentration camp terror and intimidation.',
        modelAnswer:
          'Source B is useful for revealing how the Gestapo maintained domestic surveillance through voluntary civilian denunciations. The source, an official Gestapo interrogation transcript from Düsseldorf in 1936, records how a factory foreman was arrested after his neighbour reported him for making derogatory remarks about Hermann Göring and listening to foreign radio broadcasts. This content accurately reflects modern historical knowledge: the Gestapo was a remarkably small organization (with only 50 officers in Frankfurt) that relied on ordinary citizens denouncing colleagues, neighbours, or family members over personal grudges or professional rivalry. The provenance enhances its utility because, as a confidential state police record never intended for public publication, it provides an authentic, objective record of standard investigative procedures and the climate of domestic fear.<br/><br/>Source C is equally useful for examining the coercive terror of the concentration camp system. A report by a German social democrat who survived six months in Dachau in 1935 describes how political prisoners were subjected to solitary confinement, arbitrary floggings, and exhaustion labour designed to break their political will before release. This matches historical context: between 1933 and 1939, over 200,000 individuals passed through early camps like Dachau and Sachsenhausen under "protective custody" (*Schutzhaft*). The regime deliberately released battered prisoners into working-class neighbourhoods to act as living deterrents against anti-Nazi dissent. The provenance adds utility because as a firsthand testimony by an eyewitness victim, it conveys the physical and psychological brutality used to crush left-wing resistance. Together, Sources B and C are highly useful: Source B shows the secret police surveillance mechanism operating in daily civilian life, while Source C demonstrates the brutal physical coercion backing it.',
        examinerNote:
          'Full 8/8 marks. Thorough evaluation of Content, Context, and Provenance for both sources, showing how civilian denunciation and camp brutality functioned together as a unified system of totalitarian control.',
        pitfallCategory: 'Utility & Provenance Pitfalls',
        pitfall:
          'Do not assume the Gestapo had agents on every street corner. Historical evidence shows they relied heavily on ordinary German citizens reporting on each other.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Architecture of Totalitarian Control',
        steps: [
          {
            stage: '1. Civilian Denunciation',
            desc: 'Citizens report neighbours to Gestapo over personal grudges, creating an atmosphere of suspicion.',
          },
          {
            stage: '2. Schutzhaft Detention',
            desc: 'Gestapo arrests suspects indefinitely without trial or judicial oversight under protective custody.',
          },
          {
            stage: '3. People’s Court Trial',
            desc: 'Roland Freisler’s Volksgerichtshof sentences political dissidents to death or hard labour.',
          },
          {
            stage: '4. Camp Deterrence',
            desc: 'Internment in Dachau and Sachsenhausen terrifies the wider population into passive conformity.',
          },
        ],
      },
      wordBank: [
        {
          term: 'SS',
          def: 'Schutzstaffel; Heinrich Himmler’s elite racial and paramilitary organization.',
        },
        {
          term: 'Gestapo',
          def: 'Geheime Staatspolizei; the ruthless political secret police of the Nazi regime.',
        },
        {
          term: 'SD',
          def: 'Sicherheitsdienst; Nazi intelligence service founded by Reinhard Heydrich in 1931.',
        },
        {
          term: 'Dachau',
          def: 'First Nazi concentration camp opened in March 1933 near Munich for political prisoners.',
        },
        {
          term: 'Schutzhaft',
          def: 'Protective custody; indefinite detention without trial or right of legal appeal.',
        },
        {
          term: 'Denunciation',
          def: 'Informing on fellow citizens to the Gestapo, which drove 80% of investigations.',
        },
        {
          term: 'People’s Court',
          def: 'Volksgerichtshof; special political court established in 1934 to try treason cases.',
        },
        {
          term: 'Reichskonkordat',
          def: '1933 treaty between Hitler and the Vatican guaranteeing Catholic religious rights.',
        },
        {
          term: 'Confessing Church',
          def: 'Anti-Nazi Protestant breakaway movement led by Martin Niemöller and Bonhoeffer.',
        },
        {
          term: 'Reich Church',
          def: 'Pro-Nazi Protestant state church under Bishop Ludwig Müller promoting Aryanism.',
        },
        {
          term: 'Mit Brennender Sorge',
          def: '1937 papal encyclical read from Catholic pulpits condemning Nazi racism and paganism.',
        },
        {
          term: 'Death’s Head',
          def: 'SS-Totenkopfverbände; specialised SS division that guarded concentration camps.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 11: KT 3.3 — CONTROLLING AND INFLUENCING ATTITUDES, 1933–1939
  // Exam Format: interpretation_diff_why (Section B: Q3(b) [4m] + Q3(c) [4m])
  // =========================================================================
  {
    id: 'lesson_3_3',
    topic: 'Key Topic 3: Nazi Control & Dictatorship, 1933–39',
    title: 'KT 3.3: Controlling and Influencing Attitudes, 1933–1939',
    footerTag: 'KT 3.3: Controlling Attitudes, 1933–39',
    left: {
      sectionTag: 'Propaganda & Culture',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Dr. Joseph Goebbels’ Ministry of Public Enlightenment and Propaganda exercised total control over German cultural and intellectual life. By monopolizing radio broadcasting with cheap "People’s Receivers", censoring the press, orchestrating hypnotic mass spectacles like the Nuremberg Rallies, and purging "degenerate" modernist art and literature, the regime sought to eliminate critical independent thought and forge a unified *Volksgemeinschaft* (People’s Community).',
      pillars: [
        {
          title: 'Goebbels & The Propaganda Ministry (RMVP)',
          subtitle: 'The Totalitarian Message',
          bullets: [
            '**Creation of the RMVP (March 1933):** Goebbels appointed Minister with absolute control over press, radio, cinema, theatre, music, and art.',
            '**Reich Chamber of Culture (*Reichskulturkammer*):** Forced all artists, writers, and musicians to register; Jews and political leftists banned.',
            '**The Editors’ Law (Oct 1933):** Made newspaper editors legally responsible for content, closing 1,600 independent newspapers by 1939.',
          ],
        },
        {
          title: 'Mass Media: Radio & Cinematic Indoctrination',
          subtitle: 'Broadcasting into the Home',
          bullets: [
            '**The Volksempfänger (VE301):** Subsidised radio sold for just 35 marks; household ownership surged to 70% by 1939 (highest rate in Europe).',
            '**Public Loudspeakers:** Installed in factories, cafes, and town squares; listening to foreign broadcasts (BBC) punished by death in wartime.',
            '**Cinema Control:** All movie scripts pre-approved by Goebbels; films preceded by Nazi newsreels (*Wochenschau*) and anti-Semitic features.',
          ],
        },
        {
          title: 'Mass Spectacle & Cultural Purges',
          subtitle: 'The Aesthetics of Fascism',
          bullets: [
            '**Book Burnings (May 1933):** Student mobs burned 20,000 un-German books (Einstein, Freud, Marx, Remarque) in Berlin’s Opernplatz.',
            '**Nuremberg Rallies (*Reichsparteitag*):** Albert Speer designed the "Cathedral of Light" with 130 searchlights, hypnotic theatrical displays of obedience.',
            '**1936 Berlin Olympic Games:** Spectacular athletic stage used to deceive the world about Nazi moderation; Germany topped the medal table with 33 golds.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Dr. Joseph Goebbels',
          role: 'Minister of Public Enlightenment and Propaganda; masterminded the Reich Chamber of Culture, press censorship, radio control, and mass rallies.',
        },
        {
          name: 'Albert Speer',
          role: 'Hitler’s chief architect; designed the monumental Zeppelinfield Nuremberg rally grounds, the "Cathedral of Light", and the New Reich Chancellery.',
        },
        {
          name: 'Leni Riefenstahl',
          role: 'Pioneering film director who produced the supreme propaganda documentaries *Triumph of the Will* (1935) and *Olympia* (1938).',
        },
        {
          name: 'Max Amann',
          role: 'Head of the Nazi publishing empire (Eher Verlag); seized control of independent press publishing, turning the party into a media monopoly.',
        },
      ],
      milestones: [
        {
          date: 'Mar 1933',
          event: 'Ministry of Public Enlightenment and Propaganda (RMVP) created',
        },
        {
          date: '10 May 1933',
          event: 'Public book burnings staged in Berlin and 30 German university cities',
        },
        {
          date: 'Aug 1933',
          event: 'Cheap Volksempfänger (People’s Receiver) radio introduced at Berlin fair',
        },
        {
          date: 'Sep 1934',
          event: 'Leni Riefenstahl films Triumph of the Will at the Nuremberg Party Rally',
        },
        {
          date: 'Aug 1936',
          event: 'Berlin Olympic Games held; projected image of international respectability',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(b) & Q3(c) Historians’ Views [8m]',
        title: 'The Effectiveness of Nazi Propaganda on German Public Opinion',
        stem: 'Q3(b) Study Interpretations 1 and 2. What is the main difference between these views on the effectiveness of Nazi propaganda between 1933 and 1939? (4 marks) • Q3(c) Suggest one reason why Interpretations 1 and 2 give different views. (4 marks)',
        marks: '4 + 4 = 8',
        marksTime: '8 Marks • ~12 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q3(b) Formula:</strong> State core difference in line 1 → Quote/detail Interpretation 1 → Quote/detail Interpretation 2.<br/><strong>Q3(c) Formula:</strong> Explain difference by showing historians chose different evidence/focus (e.g. mass youth brainwashing & Hitler Myth vs working-class cynicism & private radio grumbling).',
        modelAnswer:
          '<strong>Q3(b) Difference in Views:</strong> The main difference is that Interpretation 1 argues that Nazi propaganda was overwhelmingly successful in brainwashing the German public and generating fanatical devotion to Adolf Hitler, whereas Interpretation 2 contends that propaganda had limited success and that ordinary citizens remained cynical or indifferent toward ideological indoctrination. Interpretation 1 emphasizes that Goebbels’ total monopoly over radio, press, and mass rallies "created a hypnotic cult of the Führer that effectively eradicated critical thought among the German masses". In contrast, Interpretation 2 asserts that "many Germans saw through the relentless crude propaganda", pointing out that working-class audiences regularly tuned out political broadcasts and grew weary of repetitive party slogans.<br/><br/><strong>Q3(c) Reasons for Difference:</strong> Interpretations 1 and 2 differ because the historians have utilized different historical sources. The author of Interpretation 1 investigates official Nazi public spectacles—such as Leni Riefenstahl’s documentary *Triumph of the Will*, the mass enthusiasm at the 1936 Berlin Olympics, and the rapid uptake of the *Volksempfänger* radio (which reached 70% of households by 1939). Conversely, the author of Interpretation 2 relies on confidential Gestapo and Sopade (underground SPD) public mood reports (*Meldungen aus dem Reich*), which documented private cynicism, complaints about food shortages, absenteeism in factories, and the widespread refusal to use the Hitler salute in private working-class neighbourhoods.',
        examinerNote:
          'Full 8/8 marks. Q3(b) establishes a precise contrast supported by direct citations. Q3(c) explains WHY they differ by comparing official public spectacles against underground Sopade/Gestapo reports.',
        pitfallCategory: 'Interpretation Difference & Origin Pitfalls',
        pitfall:
          'Do not assume propaganda was 100% effective. High-scoring answers recognize that while the "Hitler Myth" was widely popular, specific policies (like church persecution) faced public scepticism.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: Goebbels’ Cultural Monopoly (1933–1939)',
        steps: [
          {
            stage: '1. Total Censorship',
            desc: 'Reich Chamber of Culture bans Jewish and leftist artists; 1,600 newspapers shut down.',
          },
          {
            stage: '2. Mass Radio Saturation',
            desc: 'Volksempfänger radio reaches 70% of homes; factory speakers broadcast speeches.',
          },
          {
            stage: '3. Hypnotic Rallies',
            desc: 'Nuremberg "Cathedrals of Light" and 1936 Olympics project majestic power and unity.',
          },
          {
            stage: '4. The Führer Myth',
            desc: 'Hitler elevated as an infallible national saviour standing above daily party corruption.',
          },
        ],
      },
      wordBank: [
        {
          term: 'RMVP',
          def: 'Ministry of Public Enlightenment and Propaganda established in March 1933.',
        },
        {
          term: 'Joseph Goebbels',
          def: 'Propaganda Minister who controlled all German press, radio, cinema, and art.',
        },
        {
          term: 'Volksempfänger',
          def: 'People’s Receiver (VE301); inexpensive radio subsidised to broadcast propaganda.',
        },
        {
          term: 'Reichskulturkammer',
          def: 'Reich Chamber of Culture controlling all artists, writers, and filmmakers.',
        },
        {
          term: 'Degenerate Art',
          def: 'Entartete Kunst; Nazi label for modernist, abstract, and Jewish artwork.',
        },
        {
          term: 'Cathedral of Light',
          def: 'Architectural spectacle at Nuremberg using 130 searchlights into the night sky.',
        },
        {
          term: 'Triumph of the Will',
          def: 'Leni Riefenstahl’s famous 1935 propaganda film of the Nuremberg Rally.',
        },
        {
          term: 'Berlin Olympics',
          def: '1936 Olympic Games exploited to demonstrate Aryan athletic superiority.',
        },
        {
          term: 'Book Burnings',
          def: '10 May 1933 destruction of thousands of pacifist and Jewish books across Germany.',
        },
        {
          term: 'Editors’ Law',
          def: 'October 1933 law holding journalists legally liable for non-Nazi news content.',
        },
        {
          term: 'Volksgemeinschaft',
          def: 'People’s Community; classless Nazi racial collective united under the Führer.',
        },
        {
          term: 'Wochenschau',
          def: 'Compulsory Nazi weekly newsreel screened in all cinemas before feature films.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 12: KT 3.4 — OPPOSITION, RESISTANCE AND CONFORMITY, 1933–1939
  // Exam Format: interpretation_eval (Section B: Q3(d) [16+4m])
  // =========================================================================
  {
    id: 'lesson_3_4',
    topic: 'Key Topic 3: Nazi Control & Dictatorship, 1933–39',
    title: 'KT 3.4: Opposition, Resistance and Conformity, 1933–1939',
    footerTag: 'KT 3.4: Opposition & Conformity, 1933–39',
    left: {
      sectionTag: 'Dissent & Resistance',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Between 1933 and 1939, overt political resistance to the Nazi regime was severely constrained by the ubiquitous Gestapo terror apparatus and genuine widespread popularity for Hitler’s economic and foreign policy successes. Nevertheless, courageous defiance persisted: religious leaders protested church Nazification and euthanasia, working-class youth groups (Edelweiss Pirates, Swing Youth) rejected totalitarian conformity, and underground leftists sustained anti-fascist networks.',
      pillars: [
        {
          title: 'The Nature of Popular Conformity & Consent',
          subtitle: 'Why Most Germans Complied',
          bullets: [
            '**The "Hitler Myth" (*Führer Mythos*):** Ian Kershaw’s thesis: millions admired Hitler personally for restoring jobs and pride, blaming excesses on local party hacks.',
            '**Economic Dividends:** The end of mass unemployment and the provision of social benefits (KdF holidays, marriage loans) generated genuine working-class gratitude.',
            '**Pervasive Fear of Terror:** Pervasive knowledge of Dachau, concentration camps, and Gestapo informers paralyzed active political resistance.',
          ],
        },
        {
          title: 'Church Opposition: Protestant & Catholic Resistance',
          subtitle: 'Defending the Faith',
          bullets: [
            '**The Confessing Church (1934):** Pastors Martin Niemöller and Dietrich Bonhoeffer broke away from the Nazi Reich Church; Niemöller interned in Dachau.',
            '**Bishop Clemens von Galen:** Catholic Bishop delivered scathing sermons in 1941 exposing Aktion T4 euthanasia, forcing Hitler to suspend public killings.',
            '**Mit Brennender Sorge (1937):** Smuggled into Germany and read from every Catholic pulpit, condemning Nazi racial paganism and state idolatry.',
          ],
        },
        {
          title: 'Youth Defiance & Underground Left-Wing Dissent',
          subtitle: 'Counterculture & Sabotage',
          bullets: [
            '**Edelweiss Pirates (*Edelweißpiraten*):** Working-class youths in the Ruhr and Rhineland who beat up Hitler Youth patrols, sang banned songs, and aided deserters.',
            '**Swing Youth (*Swingjugend*):** Middle-class teens who openly mocked Nazi militarism by dressing in English clothes and dancing to banned American jazz.',
            '**Underground Left-Wing Resistance:** KPD and SPD cells printed underground leaflets (*Rote Fahne*); factory workers staged go-slows and absenteeism.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Pastor Martin Niemöller',
          role: 'Leader of the Protestant Pastors’ Emergency League and Confessing Church; imprisoned in Dachau concentration camp (1937–45) for anti-Nazi sermons.',
        },
        {
          name: 'Dietrich Bonhoeffer',
          role: 'Protestant theologian who helped Jews escape to Switzerland and joined military conspiracies against Hitler; executed at Flossenbürg in 1945.',
        },
        {
          name: 'Barthel Schink',
          role: '16-year-old leader of the Cologne Edelweiss Pirates Ehrenfeld group; publicly hanged by the Gestapo in November 1944 without trial.',
        },
        {
          name: 'Georg Elser',
          role: 'Working-class carpenter who acted alone to bomb Hitler in the Munich Bürgerbräukeller in Nov 1939; missed killing Hitler by just 13 minutes.',
        },
      ],
      milestones: [
        { date: 'Oct 1933', event: 'Martin Niemöller establishes the Pastors’ Emergency League' },
        {
          date: 'May 1934',
          event: 'Barmen Declaration adopted, formally creating the anti-Nazi Confessing Church',
        },
        {
          date: 'Jul 1937',
          event: 'Gestapo arrests Martin Niemöller; interned in Sachsenhausen and Dachau',
        },
        {
          date: 'Nov 1939',
          event: 'Georg Elser detonates bomb in Bürgerbräukeller; Hitler leaves early',
        },
        {
          date: 'Aug 1941',
          event: 'Bishop von Galen preaches famous sermon halting public Aktion T4 euthanasia',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(d) Evaluative Essay [16+4m]',
        title: 'The Extent and Significance of Resistance to the Nazi Regime',
        stem: 'Q3(d) How far do you agree with Interpretation 2 that resistance to the Nazi regime between 1933 and 1939 was widespread and represented a serious threat to Hitler’s control? (16+4 marks)',
        marks: '16 + 4 SPaG = 20',
        marksTime: '20 Marks • ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Band 4 Rubric:',
        planningGuide:
          '<strong>Structure:</strong> (1) Introduction defining criteria (overt political threat to overthrow regime vs isolated cultural/religious dissent) → (2) Arguments supporting Interpretation 1 (regime had broad consent, "Hitler Myth" & terror crushed organised opposition) → (3) Arguments evaluating Interpretation 2 (genuine courage of churches, youth subcultures & underground left) → (4) Nuanced evaluative verdict.',
        modelAnswer:
          'I disagree with Interpretation 2 that resistance between 1933 and 1939 was widespread or represented a serious threat to Hitler’s control. While courageous individual acts of moral, religious, and youth defiance occurred, they remained fragmented and isolated. Interpretation 1 is historically far more accurate in concluding that the vast majority of Germans complied with or actively supported the regime due to economic recovery, foreign policy triumphs, and the paralyzing terror of the police state.<br/><br/>Interpretation 1 is supported by compelling evidence that the regime enjoyed genuine widespread popularity and passive conformity. Through what historian Ian Kershaw termed the "Hitler Myth", Adolf Hitler was venerated as a selfless national saviour who had abolished unemployment (which plummeted from 6 million to under 350,000 by 1939) and restored German national dignity by reoccupying the Rhineland (1936) and securing the Anschluss (1938). Ordinary Germans enjoyed tangible social dividends: subsidised KdF holidays, marriage loans, and public housing. Furthermore, where consent faltered, the terror of the SS, Gestapo, and concentration camp system (Dachau, Sachsenhausen) ensured that active opposition was viewed as suicidal. The abolition of trade unions and political parties in 1933 left opponents without national coordinating structures to mount a credible threat.<br/><br/>Nevertheless, Interpretation 2 correctly highlights that Nazi control was never total and that diverse pockets of resistance persisted. In the religious sphere, over 6,000 Protestant pastors joined Martin Niemöller’s Confessing Church, refusing to submit to the Nazi Reich Church, while Catholic Bishop Clemens von Galen delivered fiery public sermons condemning the secret Aktion T4 euthanasia programme, which forced Hitler to halt the public killings in 1941. Among the young, the **Edelweiss Pirates** (*Edelweißpiraten*) engaged in physical street brawls with Hitler Youth patrols, painted anti-Nazi slogans, and sheltered army deserters, leading to public Gestapo hangings. The **Swing Youth** (*Swingjugend*) openly rejected totalitarian conformity by playing banned African-American jazz and wearing English clothes. In factories, underground KPD and SPD cells distributed anti-fascist leaflets (*Rote Fahne*) and staged industrial go-slows.<br/><br/>However, this resistance did not represent a serious threat to the regime’s survival. Youth groups like the Edelweiss Pirates were anti-authoritarian countercultures rather than organised political movements seeking to seize state power. Church opposition was strictly defensive—aimed at protecting Christian autonomy and doctrine rather than overthrowing National Socialism. As late as 1939, only isolated individuals like lone carpenter Georg Elser (who came within 13 minutes of killing Hitler in the Bürgerbräukeller) attempted direct action. In conclusion, Interpretation 2 exaggerates the scale and impact of opposition. Resistance was heroic but politically marginal; until the military catastrophes of WWII, Hitler maintained absolute totalitarian control.',
        examinerNote:
          'Band 4 (16/16 marks + 4 SPaG). Comprehensive, balanced essay examining both interpretations against precise evidence (Kershaw’s Hitler Myth, Niemöller, Bishop von Galen, Edelweiss Pirates, Georg Elser).',
        pitfallCategory: 'Evaluative Essay Pitfalls',
        pitfall:
          'Distinguish between passive non-conformity (listening to jazz, absenteeism) and active political resistance (plots to overthrow Hitler). Do not exaggerate youth defiance into an existential threat.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: Why Resistance Remained Fragmented',
        steps: [
          {
            stage: '1. Economic Dividends',
            desc: 'Unemployment falls below 350k; KdF holidays and rearmament generate genuine public consent.',
          },
          {
            stage: '2. Ubiquitous Terror',
            desc: 'Dachau, Gestapo informers, and the People’s Court make collective action seem suicidal.',
          },
          {
            stage: '3. Defensive Dissent',
            desc: 'Churches defend doctrinal autonomy (Galen, Niemöller) without challenging state legitimacy.',
          },
          {
            stage: '4. Cultural Countercultures',
            desc: 'Edelweiss Pirates and Swing Youth reject conformity but lack nationwide political coordination.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Hitler Myth',
          def: 'Ian Kershaw’s concept of Hitler’s charismatic popularity standing above party corruption.',
        },
        {
          term: 'Edelweiss Pirates',
          def: 'Working-class youth counterculture in Ruhr/Rhineland defying the Hitler Youth.',
        },
        {
          term: 'Swing Youth',
          def: 'Middle-class youths who mocked Nazi militarism by dancing to banned American jazz.',
        },
        {
          term: 'Confessing Church',
          def: 'Protestant resistance church formed by Martin Niemöller and Dietrich Bonhoeffer.',
        },
        {
          term: 'Bishop von Galen',
          def: 'Catholic Bishop of Münster whose 1941 sermons temporarily halted Aktion T4 euthanasia.',
        },
        {
          term: 'Georg Elser',
          def: 'Carpenter who nearly assassinated Hitler with a Bürgerbräukeller time bomb in Nov 1939.',
        },
        {
          term: 'Sopade',
          def: 'Underground reports compiled by exiled German Social Democrats on domestic public mood.',
        },
        {
          term: 'Rote Kapelle',
          def: 'Red Orchestra; underground anti-Nazi spy network passing secrets to Soviet Russia.',
        },
        {
          term: 'Passive Resistance',
          def: 'Everyday disobedience: absenteeism, deliberate industrial go-slows, and telling jokes.',
        },
        {
          term: 'Conformity',
          def: 'Widespread public compliance driven by economic recovery, propaganda, and terror.',
        },
        {
          term: 'Barthel Schink',
          def: '16-year-old Edelweiss Pirate hanged by the Gestapo in Cologne in November 1944.',
        },
        {
          term: 'Aktion T4',
          def: 'Secret Nazi euthanasia programme murdering over 70,000 disabled German citizens.',
        },
      ],
    },
  },
];
