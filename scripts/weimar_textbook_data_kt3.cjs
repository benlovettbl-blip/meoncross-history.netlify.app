/**
 * weimar_textbook_data_kt3.cjs
 * Component bank, primary sources, vocabulary, and back-cover data for
 * Key Topic 3: Nazi Control and Dictatorship, 1933–1939.
 */

module.exports = function getKt3Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT3',
    topicNumber: 3,
    title: 'NAZI CONTROL AND DICTATORSHIP, 1933–1939',
    subtitle: 'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 31 (1HI0/31)',
    enquiry:
      'How did the Nazi regime dismantle democratic institutions, construct an all-pervasive police state, and eliminate opposition between 1933 and 1939?',
    coverImage: 'weimar_kt3_cover.jpg',
    caption:
      "Nuremberg, September 1934 (Bundesarchiv Bild 102-16196): Massed formations of over 150,000 SA and SS troops assembled in the Luitpoldarena during the Reich Party Congress, demonstrating the totalitarian regime's staged theatrical power and total control.",
    specTopics: [
      {
        num: 1,
        title: '1. Creation of Dictatorship, 1933–34',
        bullets: [
          'Reichstag Fire (Feb 1933) and Emergency Decree; Enabling Act (Mar 1933).',
          '<em>Gleichschaltung</em>: crushing trade unions (May 1933) and banning all other parties (Jul 1933).',
          'Night of the Long Knives (Jun 1934); death of Hindenburg and the sacred army oath (Aug 1934).',
        ],
      },
      {
        num: 2,
        title: '2. Police State & Religion, 1933–39',
        bullets: [
          'Machinery of terror: SS, SD, Gestapo, and the establishment of concentration camps (Dachau 1933).',
          "Nazification of the legal system: People's Court (<em>Volksgerichtshof</em>) and abolition of jury trials.",
          'Controlling churches: Catholic Concordat (1933), Reich Church, and persecution of the Confessing Church.',
        ],
      },
      {
        num: 3,
        title: '3. Controlling Attitudes, 1933–39',
        bullets: [
          'Joseph Goebbels and Propaganda Ministry; censorship of press, radio (<em>Volksempfänger</em>), and literature.',
          'The "Hitler Myth" and mass mobilization: annual Nuremberg Rallies and the 1936 Berlin Olympic Games.',
          'Reich Chamber of Culture: banning "degenerate art" and enforcing monumental classical architecture.',
        ],
      },
      {
        num: 4,
        title: '4. Opposition & Conformity, 1933–39',
        bullets: [
          'The reality of conformity: economic rewards, propaganda saturation, and pervasive fear of denunciation.',
          'Underground political and worker resistance: KPD/SPD leaflets, sabotage, and absenteeism.',
          'Youth opposition (Edelweiss Pirates, Swing Youth); religious resistance (Niemöller, Bonhoeffer, Galen).',
        ],
      },
    ],
  };

  const componentBank = {
    // Page 3: KT 3.1 (The Creation of a Dictatorship, 1933–1934)
    p3: {
      keyFigure: {
        name: 'Ernst Röhm',
        lifespan: '1887–1934',
        role: 'Chief of Staff of the Sturmabteilung (SA) & Reich Minister without Portfolio',
        significance:
          'Commanded 3 million paramilitary Brownshirts and demanded a "Second Revolution" to absorb the German Army, prompting Hitler to execute him during the Night of the Long Knives.',
        actions: [
          'Expanded the SA from a Munich tavern brawl unit into a nationwide paramilitary force of over three million men by 1934.',
          'Demanded that the aristocratic Reichswehr army be merged into a revolutionary "people\'s militia" under his command.',
          "Arrested at Bad Wiessee on 30 June 1934 on Hitler's personal orders; shot in his cell at Munich's Stadelheim Prison after refusing suicide.",
        ],
        image: getBase64Image('weimar_individuals/ernst_r_hm.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">TOTALITARIAN MECHANISM: GLEICHSCHALTUNG</span>
            <span class="csb-category">INSTITUTIONAL COORDINATION &bull; 1933</span>
          </div>
          <h4 class="csb-title">Gleichschaltung &amp; The Destruction of Civil Society</h4>
          <div class="csb-body">
            <em>Gleichschaltung</em> ("coordination" or "bringing into line") was the systematic process by which the Nazi regime swallowed every independent institution in German society. On 2 May 1933, SA stormtroopers raided and ransacked trade union headquarters nationwide, arresting union leaders and replacing free unions with the state-run German Labour Front (DAF). On 14 July 1933, the Law Against the Formation of Parties decreed that the NSDAP was Germany's only legal political entity. Regional parliaments (*Länder*) were abolished, subordinating all state governments directly to Reich Governors (*Reichsstatthalter*).
          </div>
          <div class="csb-takeaway">
            <strong>The Vanishing of Alternatives:</strong> Within six months of taking power, Hitler dismantled all organized institutional opposition without encountering serious physical resistance from the German population.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">REICHTAG PROCEEDINGS</span>
              <span class="source-type">The Kroll Opera House Debate</span>
            </div>
            <span class="source-date-micro">23 March 1933</span>
          </div>
          <div class="archival-title">Otto Wels (SPD) Speaks Against the Enabling Act</div>
          <div class="archival-body written-source-box">
            "No Enabling Act gives you the power to extinguish ideas that are eternal and indestructible... In this historic hour, we German Social Democrats pledge ourselves to the principles of humanity, justice, freedom, and socialism. No law can give you the right to destroy the convictions of free men!"
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">THE CREATION OF THE DICTATORSHIP: LEGAL REVOLUTION OR LAWLESS TERROR?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: The Legal Pseudo-Revolution (Karl Dietrich Bracher)</strong>
              <p>"Hitler’s genius lay in subverting the constitution using its own legal instruments. The Enabling Act and Emergency Decrees provided a veneer of strict constitutional legality that paralyzed conservative opposition."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Terroristic Extralegal Seizure (Martin Broszat)</strong>
              <p>"Legality was purely a propaganda screen. Real power was established through sheer physical violence: 100,000 political opponents were beaten, rounded up, or murdered by the SA and SS in 1933, creating a lawless terror state."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'State two key powers conferred upon Adolf Hitler by the Enabling Act of 23 March 1933. <em>[Recall: Power to enact laws without Reichstag consent, power to deviate from the constitution]</em>',
        q2: 'Explain why the Night of the Long Knives was essential for Hitler to secure the unreserved loyalty of the German Army. <em>[Use: Eliminated the rival SA... Satisfied the conservative High Command... Led directly to the personal oath...]</em>',
        q3: "'The Reichstag Fire was the single most decisive turning point in Hitler's consolidation of dictatorship.' How far do you agree? <em>[Criteria: Compare the Reichstag Fire Decree against the Enabling Act and the death of Hindenburg]</em>",
      },
    },

    // Page 5: KT 3.2 (The Police State and Religion, 1933–1939)
    p5: {
      keyFigure: {
        name: 'Heinrich Himmler',
        lifespan: '1900–1945',
        role: 'Reichsführer-SS & Chief of the German Police',
        significance:
          'Constructed the formidable SS-police terror apparatus, assumed control over all concentration camps, and directed the systematic elimination of political, social, and racial enemies.',
        actions: [
          'Transformed the SS from a 280-man personal bodyguard into an elite racial army that supplanted the SA following the 1934 purge.',
          'Established Dachau, the first Nazi concentration camp, in March 1933 as a blueprint for state-sponsored terror.',
          'Appointed Chief of the German Police in June 1936, amalgamating the Gestapo, criminal police (Kripo), and the SS into a unified terror machine.',
        ],
        image: getBase64Image('weimar_individuals/heinrich_himmler.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">SURVEILLANCE MECHANISM: THE GESTAPO MYTH</span>
            <span class="csb-category">THE NATURE OF POLICE TERROR &bull; 1933–1939</span>
          </div>
          <h4 class="csb-title">The "Gestapo Myth": Omnipresent Terror vs Denunciation</h4>
          <div class="csb-body">
            Post-war mythology portrayed the Gestapo (*Geheime Staatspolizei*) as an all-seeing, omnipresent surveillance agency with spies on every street corner. In reality, the Gestapo was remarkably small: in major cities like Frankfurt (population 550,000), there were barely 40 Gestapo officers, and for the entire province of Lower Rhine (4 million people), only 281 officers existed. The secret police functioned primarily because ordinary German citizens voluntarily denounced their neighbours, colleagues, and spouses out of greed, petty jealousy, or ideological conformity. Over 80% of all Gestapo political investigations originated from voluntary civilian tip-offs.
          </div>
          <div class="csb-takeaway">
            <strong>Coercion and Consent:</strong> The police state relied as much on willing public complicity and self-policing as on raw state manpower, making total control exceptionally cheap to maintain.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">POLICE DIRECTIVE</span>
              <span class="source-type">Protective Custody Mandate</span>
            </div>
            <span class="source-date-micro">10 February 1936</span>
          </div>
          <div class="archival-title">Reinhard Heydrich on Gestapo Extra-Judicial Powers</div>
          <div class="archival-body written-source-box">
            "The duties of the Secret State Police comprise investigating and combating all tendencies dangerous to the State throughout Reich territory... Orders and administrative measures of the Gestapo are not subject to judicial review by the administrative courts. Protective custody (*Schutzhaft*) may be ordered indefinitely without warrant."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">THE NAZI POLICE STATE: OMNIPRESENT TERROR OR POPULAR COMPLICITY?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Reactive Surveillance &amp; Denunciation (Robert Gellately)</strong>
              <p>"The Gestapo did not need to spy on everybody because ordinary citizens did the work for them. The police state was heavily dependent on popular consent and spontaneous civilian denunciations."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Pervasive Intimidation &amp; Terror (Richard J. Evans)</strong>
              <p>"We must not underestimate the climate of raw fear. The known existence of concentration camps, arbitrary protective custody, and brutal interrogation methods intimidated millions into silence."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'Name two organisations that formed the core of the Nazi police and terror apparatus. <em>[Recall: Gestapo, SS (Schutzstaffel), SD (Sicherheitsdienst)]</em>',
        q2: "Explain how the Nazi regime subordinated judges and the court system to Party control between 1933 and 1936. <em>[Use: Established the People's Court (Volksgerichtshof)... Compulsory membership of the Nazi Lawyers' League... Removed judicial independence...]</em>",
        q3: "'The Nazi regime succeeded in neutralizing the Christian Churches as an effective source of opposition.' How far do you agree? <em>[Criteria: Compare the 1933 Concordat and Reich Church against the resistance of Martin Niemöller and the Confessing Church]</em>",
      },
    },

    // Page 7: KT 3.3 (Controlling and Influencing Attitudes, 1933–1939)
    p7: {
      keyFigure: {
        name: 'Joseph Goebbels',
        lifespan: '1897–1945',
        role: 'Reich Minister of Public Enlightenment and Propaganda',
        significance:
          'Masterminded the total nazification of German culture, media, and communications, orchestrating mass spectacles, radio ownership, and the all-pervasive "Hitler Myth".',
        actions: [
          'Created the Reich Chamber of Culture (*Reichskulturkammer*) in September 1933, purging Jewish and dissident artists, writers, and musicians.',
          "Subsidised production of the affordable *Volksempfänger* (People's Receiver), ensuring over 70% of households owned a radio by 1939.",
          'Staged the massive annual Nuremberg Party Rallies and transformed the 1936 Berlin Olympics into a global celebration of Nazi prestige.',
        ],
        image: getBase64Image('weimar_individuals/joseph_goebbels.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">PROPAGANDA CULT: DER FÜHRER-MYTHOS</span>
            <span class="csb-category">THE HITLER MYTH &bull; 1933–1939</span>
          </div>
          <h4 class="csb-title">The "Hitler Myth" &amp; The Deification of the Leader</h4>
          <div class="csb-body">
            Pioneered by Goebbels, the "Hitler Myth" (*Führer-Mythos*) separated Hitler personally from the daily corruption and brutality of the Nazi Party. Hitler was depicted as a selfless, infallible, almost messianic genius who sacrificed all personal happiness to work day and night for the Fatherland. When food shortages occurred, corruption was exposed, or SA thugs abused their authority, ordinary Germans frequently sighed: "If only the Führer knew about this, he would never allow it!" This deliberate psychological split allowed Hitler to maintain astronomical personal popularity even when the regime's policies caused widespread resentment.
          </div>
          <div class="csb-takeaway">
            <strong>Consensus Through Charisma:</strong> The Hitler Myth formed the central psychological glue holding the Third Reich together, binding millions of ordinary citizens emotionally to the dictatorship.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SPEECH EXCERPT</span>
              <span class="source-type">Address to Radio Directors</span>
            </div>
            <span class="source-date-micro">25 March 1933</span>
          </div>
          <div class="archival-title">Goebbels on the Modern Power of Radio Broadcasting</div>
          <div class="archival-body written-source-box">
            "I consider radio to be the most modern and the most crucial instrument of mass influence that exists anywhere. We do not intend to leave the radio to chance. It must be completely subordinated to the spiritual and political leadership of the State. It must become the primary drumbeat of our national revolution."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">NAZI PROPAGANDA: TOTAL INDOCTRINATION OR POPULAR CONCORD?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Seductive Indoctrination (David Welch)</strong>
              <p>"Goebbels’ genius was not crude brainwashing, but subtle alignment. Propaganda was overwhelmingly effective because it tapped into pre-existing German values: patriotism, social order, anti-communism, and traditional family duties."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Superficial Compliance (Ian Kershaw)</strong>
              <p>"Propaganda had distinct limits. While it successfully sustained the Hitler Myth, it failed utterly to build genuine enthusiasm for antisemitic boycotts, church persecutions, or Nazi economic austerity in everyday life."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'Identify two ways Joseph Goebbels used the radio to broadcast Nazi ideology into German homes. <em>[Recall: Mass production of cheap Volksempfänger, compulsory factory broadcasts, loudspeaker pillars in public squares]</em>',
        q2: 'Explain why the 1936 Berlin Olympic Games was a crucial propaganda showcase for the Nazi regime. <em>[Use: Presented an image of modern efficiency... Suspended anti-Jewish signs temporarily... Impressed foreign visitors...]</em>',
        q3: "'Propaganda was more effective than terror in securing the obedience of the German people.' How far do you agree? <em>[Criteria: Compare Goebbels' radio, film, and press control against the fear of Gestapo arrest and concentration camps]</em>",
      },
    },

    // Page 9: KT 3.4 (Opposition, Resistance and Conformity, 1933–1939)
    p9: {
      keyFigure: {
        name: 'Martin Niemöller',
        lifespan: '1892–1984',
        role: 'Protestant Pastor, Co-Founder of the Confessing Church & Political Prisoner',
        significance:
          'First World War submarine commander who became the outspoken spiritual leader of Protestant resistance against Nazi state interference, spending seven years in Sachsenhausen and Dachau.',
        actions: [
          "Founded the Pastors' Emergency League (*Pfarrernotbund*) in 1933 to resist the Aryan Paragraph in the Protestant Church.",
          'Co-founded the rebellious Confessing Church in 1934 alongside Dietrich Bonhoeffer, rejecting state control over theology.',
          'Arrested by the Gestapo in 1937 and held in solitary confinement in Dachau until 1945; author of the immortal poem "First they came...".',
        ],
        image: getBase64Image('weimar_individuals/martin_niem_ller.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">LONE-WOLF RESISTANCE: THE BÜRGERBRÄUKELLER BOMB</span>
            <span class="csb-category">ATTEMPTED ASSASSINATION &bull; 8 NOVEMBER 1939</span>
          </div>
          <h4 class="csb-title">Georg Elser &amp; The 8 November 1939 Assassination Attempt</h4>
          <div class="csb-body">
            While organized resistance groups were paralyzed by fear, Georg Elser, a humble carpenter and former communist voter, acted completely alone. Convinced that Hitler was driving Germany into catastrophic world war, Elser spent thirty nights hiding inside Munich's Bürgerbräukeller beer hall, painstakingly hollowing out a stone pillar behind the speaker's podium. He installed a sophisticated clockwork bomb set to detonate during Hitler's annual Putsch anniversary speech. However, due to heavy fog grounding his flight to Berlin, Hitler cut his speech short and left the hall thirteen minutes before the bomb exploded, killing eight people and demolishing the gallery.
          </div>
          <div class="csb-takeaway">
            <strong>The Solitary Hero:</strong> Elser came closer to assassinating Hitler before the war than any high-level army conspiracy, demonstrating that even an omnipresent totalitarian police state could not fully prevent solitary acts of principled defiance.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">GESTAPO DOSSIER</span>
              <span class="source-type">Interrogation Summary</span>
            </div>
            <span class="source-date-micro">November 1939</span>
          </div>
          <div class="archival-title">Georg Elser on his Motive for Assassinating Hitler</div>
          <div class="archival-body written-source-box">
            "I considered what might happen if Hitler was removed. I came to the conclusion that through his elimination, the working conditions of the working people would improve and that a war would be avoided. I did not want to cause destruction for its own sake, but only to prevent greater bloodshed."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">RESISTANCE IN NAZI GERMANY: HEROIC REVOLT OR MINOR NON-CONFORMITY?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Widespread Everyday Dissent (Detlev Peukert)</strong>
              <p>"Resistance was not confined to bomb plots. Millions engaged in 'everyday dissent' (*Resistenz*): telling political jokes, buying jazz records, absenteeism from factories, and helping persecuted neighbours."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Fragmented &amp; Ineffective Resistance (Ian Kershaw)</strong>
              <p>"Opposition was profoundly isolated and atomised. Most non-conformity was defensive and sectional, aimed at protecting personal hobbies or church autonomy rather than coordinating an effective national uprising to overthrow the Hitler dictatorship."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'Identify two youth groups that rebelled against Nazi regimentation between 1933 and 1939. <em>[Recall: The Edelweiss Pirates, the Swing Youth (Swingjugend)]</em>',
        q2: 'Explain why political resistance by the underground SPD and KPD proved largely ineffective before 1939. <em>[Use: Infiltration by Gestapo spies... Lack of cooperation between socialists and communists... Banishment to concentration camps...]</em>',
        q3: "'Between 1933 and 1939, opposition to the Nazi regime was minor and posed no real threat to Hitler's power.' How far do you agree? <em>[Criteria: Compare youth and church defiance against military plots and total lack of mass strikes]</em>",
      },
    },
  };

  const leftSources = {
    // Page 2: KT 3.1
    p2: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Archival Photograph',
        title: 'The Charred Shell of the Reichstag Debating Chamber',
        date: '28 February 1933',
        image: getBase64Image('reichstag_fire_ruins.jpg'),
        context:
          'On the evening of 27 February 1933, the Reichstag building in Berlin was engulfed in flames. Dutch communist Marinus van der Lubbe was found inside and arrested. Hitler immediately claimed the arson was the signal for a nationwide Bolshevik revolution.',
        hingeQuestion:
          'Did the Reichstag Fire provide Hitler with a genuine security crisis, or an orchestrated pretext to destroy German democracy?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Emergency Constitutional Decree',
        title: 'Article 1 of the Reichstag Fire Decree',
        date: '28 February 1933',
        text: '“Sections 114, 115, 117, 118, 123, 124 and 153 of the Constitution of the German Reich are suspended until further notice. Most importantly, restrictions on personal liberty, on the right of free expression of opinion, including freedom of the press, the right of assembly and association, and violations of the privacy of postal, telegraphic and telephonic communications, and warrants for house-searches... are permissible beyond the legal limits otherwise prescribed.”',
        context:
          'Signed by President Hindenburg under Article 48 the morning after the fire, this decree permanently stripped German citizens of basic civil liberties and formed the legal cornerstone of the Nazi police state.',
        hingeQuestion:
          'Why was the suspension of civil liberties under the Reichstag Fire Decree far more dangerous than the fire itself?',
      },
    },

    // Page 4: KT 3.2
    p4: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Archival Photograph',
        title: 'Adolf Hitler and President Paul von Hindenburg',
        date: 'Day of Potsdam, 21 March 1933',
        image: getBase64Image('hitler_hindenburg_1933.jpg'),
        context:
          'Hitler, dressed in formal morning coat, bowing reverently before the aged Field Marshal von Hindenburg at the Garrison Church in Potsdam. This ceremony deliberately forged a symbolic bridge between imperial Prussian militarism and the new Nazi regime.',
        hingeQuestion:
          'How did this visual display of reverence toward Hindenburg successfully reassure conservative elites and military leaders about Hitler’s intentions?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Eye-Witness Archival Testimony',
        title: 'Report from an Early Political Prisoner at Dachau',
        date: 'Summer 1933',
        text: '“Dachau was opened in March 1933 for political opponents—mostly communists, socialists, and trade unionists. Over the entrance stood the cynical iron slogan: <em>Arbeit Macht Frei</em> (Work Sets You Free). The SS guards maintained reign through arbitrary beatings, twenty-five lashes on the wooden trestle, and summary executions in the gravel pits. Knowledge of what happened at Dachau spread by whispered rumour across Munich, paralyzing all urge to protest.”',
        context:
          'Testimony describing the brutal discipline inside the Third Reich’s first concentration camp, established by Heinrich Himmler near Munich as a training ground for SS guards.',
        hingeQuestion:
          'Why was the public awareness of concentration camps like Dachau vital to enforcing conformity without requiring millions of police officers?',
      },
    },

    // Page 6: KT 3.3
    p6: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Official Party Dispatch',
        title: 'The Burning of "Un-German" Books on Berlin Opernplatz',
        date: '10 May 1933',
        text: "“At midnight, over 25,000 volumes of un-German books were thrown into the blazing bonfire by student stormtroopers. As each bundle was hurled into the flames, a speaker proclaimed: 'Against decadence and moral decay! For discipline and decency in the family and the State! I consign to the flames the writings of Karl Marx, Sigmund Freud, and Heinrich Mann!' Minister Goebbels addressed the crowd, declaring that the era of Jewish intellectualism had ended forever.”",
        context:
          'Orchestrated by the German Students’ Union and Goebbels’ ministry, nationwide book burnings physically purged modernist, pacifist, and Jewish literature from public university libraries.',
        hingeQuestion:
          'What does the public burning of books reveal about the regime’s view of intellectual freedom and the purpose of culture?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Contemporary Advertising Slogan',
        title: "The People's Receiver (Volksempfänger VE301)",
        date: '1933',
        text: "“ALL GERMANY HEARS THE FÜHRER ON THE PEOPLE'S RECEIVER!<br><br>The radio must belong to every German household. It costs only 76 Reichsmarks, payable in easy monthly instalments. The radio brings the words of our Leader directly to your family hearth. Remember: listening to foreign radio broadcasts is a crime against the security of the nation!”",
        context:
          'Promotional campaign for the mass-produced Volksempfänger radio, which had its tuning range strictly limited to German domestic frequencies to prevent citizens from hearing foreign news broadcasts.',
        hingeQuestion:
          'How did modern domestic technology allow the Nazi regime to penetrate the private lives and thoughts of ordinary citizens?',
      },
    },

    // Page 8: KT 3.4
    p8: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Primary Resistance Artifact',
        title: 'Edelweiss Pirates Anti-Nazi Wall Graffiti',
        date: '1938–1939',
        image: getBase64Image('edelweiss_pirates_graffiti.jpg'),
        context:
          'Graffiti scrawled on railway bridges and factory walls in the Ruhr and Rhineland by working-class youth who rejected Hitler Youth regimentation, singing banned songs and beating up Hitler Youth patrols.',
        hingeQuestion:
          'Did youth rebellion like that of the Edelweiss Pirates constitute genuine political resistance, or merely adolescent non-conformity?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Ecclesiastical Pastoral Letter',
        title: 'Bishop Clemens August Graf von Galen Condemns the Gestapo',
        date: 'Summer 1941 (referencing 1930s abuses)',
        text: '“None of us is certain, though he be the most innocent and conscientious citizen, that he may not any day be dragged out of his home, arrested without trial, and thrown into a concentration camp... I demand justice! The physical destruction of innocent people, whether insane or politically suspect, is a violation of the sacred law of God which no mortal authority may override!”',
        context:
          'Bishop von Galen of Münster openly attacked Gestapo terror and the T4 euthanasia programme from the pulpit. His sermons were so widely copied that the regime dared not execute him for fear of alienating Catholic soldiers.',
        hingeQuestion:
          'Why did the Nazi regime tolerate open defiance from high-ranking Catholic bishops while ruthlessly executing working-class resisters?',
      },
    },
  };

  const leftVocab = {
    p2: [
      {
        term: 'Reichstag Fire Decree',
        def: 'Emergency law passed 28 Feb 1933 indefinitely suspending personal liberty, freedom of speech, press, and assembly.',
      },
      {
        term: 'Enabling Act',
        def: 'Law passed 23 March 1933 giving Hitler power to make laws without Reichstag consent for 4 years, establishing dictatorship.',
      },
      {
        term: 'Gleichschaltung',
        def: '"Coordination"; the systematic nazification of all German political, social, and cultural institutions in 1933.',
      },
      {
        term: 'Night of the Long Knives',
        def: 'Purge of 30 June 1934 where Hitler had Ernst Röhm and over 85 SA leaders murdered by the SS to win army loyalty.',
      },
    ],
    p4: [
      {
        term: 'Gestapo',
        def: 'The Secret State Police (*Geheime Staatspolizei*), operating without judicial restraint to eliminate political opposition.',
      },
      {
        term: 'Schutzstaffel (SS)',
        def: 'The elite Nazi protection squad led by Himmler, responsible for running concentration camps and internal security.',
      },
      {
        term: "People's Court",
        def: '*Volksgerichtshof*; special Nazi court created in 1934 to try political treason cases with handpicked Nazi judges and no juries.',
      },
      {
        term: 'Concordat (1933)',
        def: 'Pact between Hitler and the Pope agreeing the Catholic Church would stay out of politics in exchange for religious freedom.',
      },
    ],
    p6: [
      {
        term: 'Joseph Goebbels',
        def: 'Minister of Propaganda and Enlightenment, controlling press, radio, cinema, literature, art, and public rallies.',
      },
      {
        term: 'Volksempfänger',
        def: 'Cheap, mass-produced "People\'s Receiver" radio pre-set to Nazi stations so all Germans could hear Hitler\'s speeches.',
      },
      {
        term: 'Reich Chamber of Culture',
        def: 'Nazi body headed by Goebbels requiring all artists, writers, and journalists to register; Jews and dissidents were excluded.',
      },
      {
        term: '1936 Berlin Olympics',
        def: 'International sports event used as a propaganda spectacular to present Germany as a modern, peaceful, and Aryan Great Power.',
      },
    ],
    p8: [
      {
        term: 'Edelweiss Pirates',
        def: 'Working-class youth groups in western Germany who dropped out of Hitler Youth, sang parody songs, and attacked Nazi patrols.',
      },
      {
        term: 'Swing Youth',
        def: 'Middle-class teenagers who defied Nazi rules by listening to banned American jazz, wearing English fashion, and dancing in clubs.',
      },
      {
        term: 'Confessing Church',
        def: 'Protestant movement formed by Niemöller and Bonhoeffer in 1934 opposing Nazi attempts to unify churches into a Reich Church.',
      },
      {
        term: 'Georg Elser',
        def: 'German carpenter who acted alone in attempting to assassinate Hitler with a concealed bomb in Munich in November 1939.',
      },
    ],
  };

  const backCoverData = {
    title: 'Nazi Control and Dictatorship, 1933–1939: Specification Mastery & Synthesis',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 31 (1HI0/31) &bull; Key Topic 3 Synthesis',
    timelineCards: [
      '<strong>27 Feb 1933: The Reichstag Fire:</strong> Dutch communist Van der Lubbe arrested; Hitler blames KPD and initiates mass arrests.',
      '<strong>28 Feb 1933: Reichstag Fire Decree:</strong> Civil liberties suspended; 4,000 communists jailed; police terror legalized.',
      '<strong>23 Mar 1933: Enabling Act Passed:</strong> Passed 444 to 94 in Kroll Opera House; grants Hitler dictatorial power to bypass Reichstag.',
      '<strong>2 May 1933: Trade Unions Banned:</strong> SA stormtroopers seize union offices; replaced by state German Labour Front (DAF).',
      '<strong>14 Jul 1933: One-Party State Enacted:</strong> Law Against Formation of Parties; NSDAP declared sole legal political movement.',
      '<strong>20 Jul 1933: Catholic Concordat Signed:</strong> Pope Pius XI signs pact with Hitler, neutralizing Catholic Centre Party political opposition.',
      '<strong>30 Jun 1934: Night of the Long Knives:</strong> SS murders Ernst Röhm, 85+ SA leaders, and Schleicher, securing military loyalty.',
      '<strong>2 Aug 1934: Death of Hindenburg:</strong> Hitler merges Chancellor and President offices, proclaiming himself <em>Führer und Reichskanzler</em>.',
      '<strong>19 Aug 1934: Sacred Army Oath:</strong> Reichswehr soldiers swear personal oath of unconditional obedience to Adolf Hitler.',
      "<strong>24 Apr 1934: People's Court Created:</strong> <em>Volksgerichtshof</em> created to try treason; eliminates right to fair trial and jury.",
      '<strong>17 Jun 1936: Himmler Appointed Police Chief:</strong> SS and Gestapo unified into a single centralized national terror apparatus.',
      '<strong>1–16 Aug 1936: Berlin Olympic Games:</strong> Spectacular propaganda display showcases Nazi efficiency and peaceful international standing.',
    ],
    pillars: [
      {
        title: 'I. Legal Revolution & Gleichschaltung',
        body: 'Hitler established dictatorship not by violent putsch, but through legal decrees. The Reichstag Fire Decree and Enabling Act provided constitutional cloaks for banning trade unions, political parties, and state parliaments within six months.',
      },
      {
        title: 'II. The SS-Police Terror Apparatus',
        body: 'Heinrich Himmler unified the SS, SD, and Gestapo into an extra-legal terror network. Unchecked by judicial review, the Gestapo used protective custody and concentration camps (Dachau) to deter dissent, aided by voluntary civilian denunciations.',
      },
      {
        title: 'III. Cultural Monopolisation & The Hitler Myth',
        body: 'Joseph Goebbels controlled every medium of expression via the Reich Chamber of Culture. The Volksempfänger brought radio into 70% of homes, while the "Hitler Myth" elevated Hitler above criticism as an infallible, selfless national saviour.',
      },
      {
        title: 'IV. Conformity & Fragmented Resistance',
        body: 'Most Germans conformed due to restored economic stability, foreign policy triumphs, and pervasive fear. Opposition (Edelweiss Pirates, Swing Youth, Confessing Church, Georg Elser) remained heroic but fragmented, failing to threaten the regime.',
      },
    ],
    historiographyDebate: {
      interp1: {
        title: 'Interpretation 1: The Totalitarian Police State (Bracher / Hildebrand)',
        text: "The Third Reich was a ruthless totalitarian dictatorship characterized by a rigid top-down command structure, omnipresent secret police surveillance, systematic media monopoly, and total subordination of all civil society to Hitler's will.",
      },
      interp2: {
        title: 'Interpretation 2: Polycracy & Structural Chaos (Mommsen / Broszat)',
        text: 'Hitler was a "weak dictator" presiding over a chaotic web of competing bureaucratic empires (SS, ministries, Gauleiters). Subordinates engaged in "working towards the Führer", driving cumulative radicalization without direct central coordination.',
      },
    },
    verdicts: [
      {
        title: 'The Dismantling of the Rule of Law:',
        body: "Hitler systematically replaced constitutional legality with arbitrary Führer decrees. The creation of the People's Court and the removal of judicial review meant that the state could detain, torture, and execute any citizen without legal recourse.",
      },
      {
        title: 'The Balance of Consent and Terror:',
        body: 'While concentration camps and Gestapo terror brutally neutralized political dissidents, millions of ordinary Germans actively consented to the regime because it restored full employment, rebuilt national pride, and promoted social order.',
      },
      {
        title: 'The Isolation of Resistance:',
        body: 'Pre-war resistance failed not because Germans lacked courage, but because the regime atomised society. Denunciations created profound mutual distrust, while the oath of loyalty bound the army, civil service, and judiciary inextricably to Hitler.',
      },
    ],
    quizzes: [
      {
        code: 'KT3.1',
        title: 'Creation of Dictatorship',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt3_1',
      },
      {
        code: 'KT3.2',
        title: 'Police State &amp; Religion',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt3_2',
      },
      {
        code: 'KT3.3',
        title: 'Controlling Attitudes',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt3_3',
      },
      {
        code: 'KT3.4',
        title: 'Opposition &amp; Resistance',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt3_4',
      },
    ],
  };

  const paragraphEnrichments = {
    enrichParas(lessonIndex, secNum, paras) {
      // Page 2 (KT3.1 Verso Act 2): Close void
      if (lessonIndex === 0 && secNum === 2) {
        if (!paras.some((p) => p.includes('Garrison Church Spectacle'))) {
          paras.push(
            `<strong>The Potsdam Garrison Church Spectacle &amp; Totalitarian State:</strong> On 21 March 1933, Goebbels staged the theatrical 'Potsdam Day' at the Garrison Church, where Hitler bowed before the aging President von Hindenburg above Frederick the Great's tomb, reassuring conservative traditionalists. Two days later at the Kroll Opera House, with armed stormtroopers chanting intimidatory death threats, the Reichstag passed the Enabling Act by 444 votes to 94. Hitler immediately unleashed <em>Gleichschaltung</em> ('coordination'): the civil service was purged of non-Aryans, state parliaments were dissolved, free trade unions were replaced by the German Labour Front, and by July 1933, all opposition parties were banned under the Law Against the Establishment of Parties, formally establishing the single-party Nazi dictatorship. Furthermore, the Reich Concordat signed with the Vatican in July 1933 eliminated the Catholic Centre Party, while the January 1934 Law for the Reconstruction of the Reich abolished all state parliaments, completing the total destruction of German federalism. By concentrating supreme legislative and administrative authority directly within the Reich Chancellery, Hitler dismantled regional autonomy and established an unchallengeable unitary dictatorship.`,
          );
        }
      }
      // Page 4 (KT3.2 Verso Act 2): Trim 115 chars so Source B fits in Column 2
      if (lessonIndex === 1 && secNum === 2) {
        if (!paras.some((p) => p.includes('Freisler Arbitrary Terror'))) {
          paras.push(
            `<strong>The People's Court &amp; Freisler Arbitrary Terror:</strong> In April 1934, Hitler established the People's Court (*Volksgerichtshof*) to handle political treason outside the constitutional judiciary. Defendants had no right to choose counsel, proceedings were secret, and verdicts could not be appealed. Chaired by the fanatical Roland Freisler, the court functioned purely as an instrument of terror, handing down over 5,000 death sentences for defeatist remarks or distributing anti-Nazi leaflets.`,
          );
        }
      }
      // Page 6 (KT3.3 Verso Act 2): Add 30 chars to close 39px void
      if (lessonIndex === 2 && secNum === 2) {
        if (!paras.some((p) => p.includes('Editorial Directives Regulated'))) {
          paras.push(
            `<strong>The Editorial Law (<em>Schriftleitergesetz</em>):</strong> In October 1933, Goebbels passed the Editorial Law, classifying all journalists as state servants required to prove Aryan ancestry and political loyalty. Every morning, the Propaganda Ministry issued secret daily directives dictating mandatory headlines, approved phraseology, and forbidden topics. Furthermore, the official Nazi publishing monopoly Eher Verlag acquired over 80% of German newspapers, purging independent editors and transforming the national press into an uncritical, heavily censored instrument of state propaganda.`,
          );
        }
      }
      // Page 7 (KT3.3 Recto Act 4): Add 30 chars to close 41px void
      if (lessonIndex === 2 && secNum === 4) {
        if (!paras.some((p) => p.includes('Sterile Cultural Monopoly'))) {
          paras.push(
            `<strong>The Reich Chamber of Culture &amp; Sterile Cultural Monopoly:</strong> Established in September 1933 under Joseph Goebbels, this overarching body regulated all aspects of German creative life through seven dedicated chambers: literature, press, radio, theatre, music, visual arts, and cinema. Membership was compulsory for any practising artist, writer, musician, or filmmaker. Non-Aryans, political dissidents, and modernists were summarily expelled, effectively barring them from exhibiting or earning a living. Over 2,500 leading intellectuals and writers—including Thomas Mann, Bertolt Brecht, and Albert Einstein—fled into foreign exile, creating an intellectual void dominated exclusively by neo-classical propaganda, anti-Semitic censorship, blood-and-soil agrarian mythologies, and military glorification.`,
          );
        }
      }
      // Page 8 (KT3.4 Verso Act 2): Calibrate Act 2 paragraphs so Source B fits cleanly at bottom of Column 2
      if (lessonIndex === 3 && secNum === 2) {
        paras = [
          `<strong>Advanced Analysis: Elite Army and Religious Resistance:</strong> Not all resistance came from underground working-class cells; critical opposition emerged from traditional institutional elites, high-ranking military commanders, and ecclesiastical leaders who possessed the administrative leverage to challenge Nazi totalitarian hegemony.`,
          `<strong>Elite Army Discontent:</strong> General Ludwig Beck, Chief of Staff of the German Army, actively opposed Hitler's aggressive expansionist foreign policy, fearing it would drag Germany into a catastrophic world war. In 1938, Beck resigned in protest and began covertly organising anti-Nazi military conspiracies with conservative diplomats and intelligence officers.`,
          `<strong>The Confessional Church &amp; Papal Encyclical:</strong> In 1934, Pastor Martin Niemöller and Dietrich Bonhoeffer founded the <strong>Confessional Church</strong> to defy Nazi control and the 'Aryan Paragraph' in religion. Despite the arrest of over 800 pastors, churchmen continued preaching against state paganism. In March 1937, Pope Pius XI issued the encyclical <em>'Mit brennender Sorge'</em> ('With Burning Anxiety'), smuggled into Germany and read from Catholic pulpits nationwide to openly condemn racial idolatry, neo-pagan state myths, and systematic Gestapo terror against believers. Protestant martyrs like Paul Schneider were tortured to death in Buchenwald for refusing to salute the swastika, proving that religious convictions represented an unbreakable barrier against absolute totalitarian control.`,
        ];
      }
      // Page 9 (KT3.4 Recto Act 4): Add 35 chars to close 47px void
      if (lessonIndex === 3 && secNum === 4) {
        if (!paras.some((p) => p.includes('Cologne Public Executions 1944'))) {
          paras.push(
            `<strong>The Escalation to Terror: Cologne Public Executions 1944:</strong> As wartime strain deepened from 1939 onwards, Nazi tolerance for non-conformist youth dissolved entirely. Heinrich Himmler ordered the Gestapo to ruthlessly crush any ideological defiance. In November 1944, thirteen members of the Ehrenfeld resistance group in Cologne—including six teenage Edelweiss Pirates—were publicly hanged without trial from railway girders before hundreds of horrified citizens. Despite this lethal brutality, arbitrary Gestapo arrests, and brutal concentration camp sentences, persistent youth non-conformity exposed the totalitarian regime's ultimate failure to indoctrinate, regiment, and subjugate the minds of the entire rising German generation. Their refusal to submit proved that ideological conformity remained an illusion even under total police terror.`,
          );
        }
      }
      return paras;
    },
  };

  return {
    coverConfig,
    componentBank,
    leftSources,
    leftVocab,
    backCoverData,
    paragraphEnrichments,
  };
};
