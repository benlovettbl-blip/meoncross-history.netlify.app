/**
 * weimar_textbook_data_kt4.cjs
 * Component bank, primary sources, vocabulary, and back-cover data for
 * Key Topic 4: Life in Nazi Germany, 1933–1939.
 */

module.exports = function getKt4Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT4',
    topicNumber: 4,
    title: 'LIFE IN NAZI GERMANY, 1933–1939',
    subtitle: 'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 31 (1HI0/31)',
    enquiry:
      'How radically did the totalitarian Nazi state transform everyday life, family, youth, labour, and racial persecution in pre-war Germany?',
    coverImage: 'weimar_kt4_cover.jpg',
    caption:
      "Berlin, 1933: Massed ranks of the Hitler Youth (*Hitlerjugend*) and League of German Girls (*Bund Deutscher Mädel*) assembled in the Lustgarten, illustrating the regime's total mobilization of youth into a regimented racial community (*Volksgemeinschaft*).",
    specTopics: [
      {
        num: 1,
        title: '1. Nazi Policies Towards Women',
        bullets: [
          'Ideology of <em>Kinder, Küche, Kirche</em>: reversing Weimar educational and workplace emancipation.',
          "Marriage incentives: Law for Encouragement of Marriage (1933), marriage loans, and Mother's Cross.",
          'Sterilisation laws, <em>Lebensborn</em>, and the rearmament contradiction (female labor demand 1937–39).',
        ],
      },
      {
        num: 2,
        title: '2. Nazi Policies Towards the Young',
        bullets: [
          'Total indoctrination: compulsory Hitler Youth and BDM (1936/1939); fitness, obedience, and drill.',
          "Purging teachers via the Nazi Teachers' League (NSLB); ideological control of school textbooks.",
          'Nazifying curriculum: racial biology, German history, and PE dominance; elite <em>Napolas</em> schools.',
        ],
      },
      {
        num: 3,
        title: '3. Employment & Living Standards',
        bullets: [
          'Work creation: Reich Labour Service (RAD), autobahn construction, and rearmament conscription.',
          'The reality of "invisible unemployment": women, Jews, and conscripts purged from official statistics.',
          'Labour control: DAF, Strength Through Joy (KdF), Beauty of Labour; real wages vs soaring food prices.',
        ],
      },
      {
        num: 4,
        title: '4. Persecution of Minorities',
        bullets: [
          'Racial ideology: Social Darwinism, the Aryan master race (*Herrenvolk*), and *Untermenschen*.',
          'Persecution of the disabled (sterilisation), "asocials", homosexuals, and Roma/Sinti gypsies.',
          'Escalating antisemitism: 1933 Boycott, Nuremberg Laws (1935), and <em>Kristallnacht</em> pogrom (1938).',
        ],
      },
    ],
  };

  const componentBank = {
    // Page 3: KT 4.1 (Nazi Policies Towards Women, 1933–1939)
    p3: {
      keyFigure: {
        name: 'Gertrud Scholtz-Klink',
        lifespan: '1902–1999',
        role: "Reich Women's Leader (*Reichsfrauenführerin*) & Head of the NS-Frauenschaft",
        significance:
          "The highest-ranking woman in the Third Reich, appointed by Hitler to direct the Nazi Women's League and mobilize German women behind domestic duty, motherhood, and racial hygiene.",
        actions: [
          "Appointed Reich Women's Leader in 1934, bringing all non-Nazi women's associations under strict party control.",
          'Established nationwide motherhood schools (*Mütterschulen*) training brides in cooking, sewing, child-rearing, and eugenics.',
          'Supported the exclusion of women from universities, senior civil service posts, and jury service, preaching: "Woman\'s mission is to minister in the home."',
        ],
        image: getBase64Image('weimar_individuals/gertrud_scholtz_klink.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">IDEOLOGICAL CONTRADICTION: FEMALE LABOUR</span>
            <span class="csb-category">THE REARMAMENT DILEMMA &bull; 1937–1939</span>
          </div>
          <h4 class="csb-title">The Rearmament Crisis &amp; The Return to the Factory</h4>
          <div class="csb-body">
            Between 1933 and 1936, the regime ruthlessly purged married women from the civil service, medicine, and legal professions, granting 1,000-mark marriage loans to encourage women to leave work. However, the introduction of the Four-Year Plan in 1936 created a desperate acute labor shortage in armaments factories. The regime was forced to reverse its ideological stance: in 1937, marriage loans were made available to working wives, and in 1938, a compulsory "Duty Year" (*Pflichtjahr*) was introduced for unmarried women. By 1939, female employment reached 14.6 million—surpassing Weimar levels by over two million.
          </div>
          <div class="csb-takeaway">
            <strong>Ideology vs Military Reality:</strong> When Nazi racial dogma collided with the practical demands of total war preparation, ideological purity was quietly abandoned in favor of industrial output. Women became indispensable to sustaining the armaments economy.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">PARTY DECREE</span>
              <span class="source-type">The Motherhood Cross Statute</span>
            </div>
            <span class="source-date-micro">16 December 1938</span>
          </div>
          <div class="archival-title">The Cross of Honour of the German Mother</div>
          <div class="archival-body written-source-box">
            "As a visible sign of the gratitude of the German nation to rich-in-children mothers, I institute the Cross of Honour of the German Mother. The Cross shall be conferred on mothers of German blood who exhibit unquestioned racial purity and hereditary health: Bronze for four or five children; Silver for six or seven; Gold for eight or more. The German mother is the custodian of the life of the race."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">WOMEN IN NAZI GERMANY: OPPRESSED VICTIMS OR COMPLICIT COLLABORATORS?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Complicit Perpetrators (Claudia Koonz)</strong>
              <p>"German women were not passive victims of male tyranny. Millions actively sustained the regime as teachers, welfare officers, and mothers, willingly collaborating in the creation of a racist racial state. They embraced family welfare subsidies while ignoring the brutal persecution of minorities."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Patriarchal Subjugation (Jill Stephenson)</strong>
              <p>"Nazi policy reduced women to biological breeding vessels, stripping away the progressive civil, political, and workplace rights hard-won under the Weimar Republic in a reactionary patriarchal rollback."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'Identify two financial incentives introduced by the Nazi government to encourage marriages and higher birth rates. <em>[Recall: 1,000-mark marriage loans reduced by 25% per child, child tax allowances]</em>',
        q2: 'Explain why Nazi policies regarding female employment changed dramatically between 1933 and 1939. <em>[Use: Initially expelled to reduce male unemployment... Rearmament caused severe labor shortages... Consequently women were recalled to munitions factories...]</em>',
        q3: "'Nazi policies towards women were a complete failure.' How far do you agree with this statement? <em>[Criteria: Compare birth rate increases against failure to keep women in the domestic home after 1937]</em>",
      },
    },

    // Page 5: KT 4.2 (Nazi Policies Towards the Young, 1933–1939)
    p5: {
      keyFigure: {
        name: 'Bernhard Rust',
        lifespan: '1883–1945',
        role: 'Reich Minister of Science, Education and National Culture (1934–1945)',
        significance:
          'Purged universities and schools of Jewish and socialist educators, completely rewriting the national curriculum to prioritize racial genetics, German military heroism, and physical drill.',
        actions: [
          "Enforced compulsory membership of the National Socialist Teachers' League (NSLB) for 97% of German educators.",
          'Ordered that 15% of all school timetable hours be dedicated to physical education, declaring: "Intellectual training is secondary to physical fitness."',
          'Established elite boarding schools (*Napolas* and Adolf Hitler Schools) to train the future military and political leadership corps of the Third Reich.',
        ],
        image: getBase64Image('weimar_individuals/bernhard_rust.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">CURRICULAR INDOCTRINATION: RACIAL EUGENICS</span>
            <span class="csb-category">TOTAL CLASSROOM REGIMENTATION &bull; 1934–1939</span>
          </div>
          <h4 class="csb-title">The Nazification of the School Curriculum</h4>
          <div class="csb-body">
            Under Minister Bernhard Rust, every subject in the German school curriculum was militarised and racialised. Biology became the study of racial genetics, skull measurements, and Social Darwinism, teaching children that mixing races led to cultural extinction. History was rewritten as a continuous heroic struggle of the Nordic race against Jewish subversion and the "stab in the back" of 1918. Even mathematics problems required students to calculate the cost of maintaining mentally disabled people in institutions compared to the cost of constructing modern workers' housing.
          </div>
          <div class="csb-takeaway">
            <strong>Subverting Young Minds:</strong> Schooling ceased to be an education in critical thinking; it became an engine of unthinking ideological obedience and preparation for military conquest. By severing the connection between parents and children, the state sought to replace the traditional family unit with unconditional loyalty to the Führer.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">PARTY ADDRESS</span>
              <span class="source-type">Speech on German Youth</span>
            </div>
            <span class="source-date-micro">14 September 1935</span>
          </div>
          <div class="archival-title">Hitler Addresses 54,000 Youths at Nuremberg</div>
          <div class="archival-body written-source-box">
            "In our eyes, the German boy of the future must be slim and slender, swift as a greyhound, tough as leather, and hard as Krupp steel! We must build a new man, so that our nation does not perish from decadence. You must learn to suffer privations without crumbling. You must obey unconditionally."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">THE INDOCTRINATION OF YOUTH: COMPLETE SUCCESS OR CYNICAL DRILL?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Fanaticised Cohort (Michael Kater)</strong>
              <p>"The regime succeeded in capturing the soul of a generation. By monopolizing leisure, sport, and schooling, Hitler created millions of fanatical, obedient young soldiers who fought relentlessly to the bitter end in 1945. Youthful devotion to the Führer proved far more resilient than traditional church or parental influences."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Drill Fatigue &amp; Alienation (Lisa Pine)</strong>
              <p>"Indoctrination had severe limits. By 1938, compulsory drill, repetitive ideology, and bullying officers produced widespread 'drill fatigue', driving thousands of disillusioned adolescents into rebellious counter-cultures."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'Name two changes made to the German school curriculum to promote Nazi racial and military ideology. <em>[Recall: Biology rewritten around racial genetics/skull measuring, 15% timetable allocated to PE, History rewritten to glorify German militarism]</em>',
        q2: 'Explain why the Nazi regime made membership of the Hitler Youth compulsory under the laws of 1936 and 1939. <em>[Use: Eliminate rival church groups... Ensure total control outside the family... Prepare boys directly for conscription...]</em>',
        q3: "'The Hitler Youth was completely successful in indoctrinating German young people.' How far do you agree? <em>[Criteria: Compare 8.8 million members by 1939 against growing resistance from Edelweiss Pirates and Swing Youth]</em>",
      },
    },

    // Page 7: KT 4.3 (Employment and Living Standards, 1933–1939)
    p7: {
      keyFigure: {
        name: 'Hermann Goering',
        lifespan: '1893–1946',
        role: 'Plenipotentiary for the Four-Year Plan & Commander-in-Chief of the Luftwaffe',
        significance:
          'Ousted moderate economics minister Hjalmar Schacht in 1936 to direct the Four-Year Plan, prioritizing total rearmament, economic self-sufficiency (*Autarky*), and synthetic materials.',
        actions: [
          'Appointed head of the Four-Year Plan in October 1936, declaring: "Guns will make us powerful; butter will only make us fat."',
          'Created the giant state-owned industrial conglomerate *Reichswerke Hermann Göring* to exploit low-grade German iron ore.',
          'Enforced wage ceilings, allocated raw materials strictly to munitions firms, and created synthetic oil (*Buna*) and rubber factories.',
        ],
        image: getBase64Image('weimar_individuals/hermann_goering.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">ECONOMIC REALITY: INVISIBLE UNEMPLOYMENT</span>
            <span class="csb-category">STATISTICAL MANIPULATION &bull; 1933–1939</span>
          </div>
          <h4 class="csb-title">The Unemployment Miracle: Fact or Statistical Fraud?</h4>
          <div class="csb-body">
            Nazi propaganda boasted that Hitler eliminated unemployment, reducing the jobless total from 6 million in January 1933 to under 300,000 by 1939. However, this "economic miracle" rested on massive statistical manipulation known as 'invisible unemployment'. Over 1.4 million men were removed from jobless registers through compulsory six-month labor service (RAD) and the reintroduction of military conscription (1935). Women sacked from civil service and medical careers were excluded from figures, as were Jewish citizens stripped of work permits. Furthermore, unmarried men under 25 were forced into agricultural camps.
          </div>
          <div class="csb-takeaway">
            <strong>The Hidden Reality:</strong> Real unemployment remained substantial; the appearance of full employment was achieved through coercion, statistical manipulation, and massive unsustainable rearmament borrowing. Behind propaganda boasts of full employment lay a regimented workforce stripped of all civil and economic rights.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SECRET POLICE REPORT</span>
              <span class="source-type">Sopade Report on Living Standards</span>
            </div>
            <span class="source-date-micro">Winter 1938</span>
          </div>
          <div class="archival-title">The Exiled Social Democratic Party on Workers' Conditions</div>
          <div class="archival-body written-source-box">
            "In the armaments factories, working hours have risen from 48 to 60 hours per week. Nominal wages are frozen at 1932 depression levels, but deductions for the DAF, Winter Relief, and taxes consume up to 25% of the pay packet. Good food is scarce: butter is severely rationed, and fruit is practically unobtainable. The workers are exhausted and deeply resent their lost independence, but pervasive fear of Gestapo arrest and factory blacklisting prevents open rebellion."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">LIVING STANDARDS IN THE THIRD REICH: MIRACLE OR EXPLOITATION?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Material Improvement (Richard Overy)</strong>
              <p>"For millions of industrial workers, the Third Reich brought undeniable benefits: guaranteed jobs, hot canteen meals, paid holidays, and leisure cruises through Strength Through Joy (KdF) that transformed working-class lives. Full employment restored dignity after the trauma of the Great Depression, generating widespread genuine popular consent across industrial regions."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Ruthless Exploitation (Tim Mason)</strong>
              <p>"Working-class living standards deteriorated significantly. Workers were stripped of independent unions, subjected to wage freezes, forced to work brutal 60-hour weeks, and pushed into a state of structural exhaustion by 1939. Living standards were ruthlessly sacrificed to finance Hitler's aggressive war machine, leaving workers poorer in real purchasing power. Working families bore the crushing financial burden of rearmament through hidden inflation and frozen wages."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'Identify two public work creation schemes introduced by the Nazi regime to reduce unemployment. <em>[Recall: The Reich Labour Service (RAD), construction of 7,000km of Reichsautobahns]</em>',
        q2: 'Explain why the German Labour Front (DAF) introduced the Strength Through Joy (KdF) leisure programme. <em>[Use: Compensated workers for lost trade union rights... Maintained factory morale... Prevented working-class strikes...]</em>',
        q3: "'Between 1933 and 1939, the living standards of German workers improved significantly.' How far do you agree? <em>[Criteria: Compare full employment and KdF subsidized holidays against longer working hours, wage freezes, and food rationing]</em>",
      },
    },

    // Page 9: KT 4.4 (The Persecution of Minorities, 1933–1939)
    p9: {
      keyFigure: {
        name: 'Julius Streicher',
        lifespan: '1885–1946',
        role: 'Gauleiter of Franconia & Publisher of Anti-Semitic Newspaper *Der Stürmer*',
        significance:
          "Hitler's most venomous propagandist whose tabloid newspaper *Der Stürmer* poisoned German public consciousness with grotesque antisemitic cartoons, blood libel, and racial hatred.",
        actions: [
          'Founded and published the notorious tabloid *Der Stürmer* from 1923, reaching a circulation of over 500,000 readers by 1938.',
          'Headed the Central Committee for Defending Against Jewish Atrocity Propaganda during the national boycott of 1 April 1933.',
          'Printed the venomous slogan at the bottom of every front page: "The Jews are our misfortune!" (*Die Juden sind unser Unglück!*); hanged at Nuremberg in 1946.',
        ],
        image: getBase64Image('weimar_individuals/julius_streicher.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">POGROM FLASHPOINT: KRISTALLNACHT</span>
            <span class="csb-category">STATE-SPONSORED TERROR &bull; 9–10 NOVEMBER 1938</span>
          </div>
          <h4 class="csb-title">The Night of Broken Glass (*Kristallnacht*)</h4>
          <div class="csb-body">
            Using the assassination of German diplomat Ernst vom Rath in Paris by Herschel Grynszpan as an excuse, Joseph Goebbels and Hitler launched a nationwide violent pogrom on the night of 9–10 November 1938. SA and SS stormtroopers in civilian clothes murdered at least 91 Jewish citizens, burned 267 synagogues to the ground, and ransacked over 7,500 Jewish-owned shops, carpeting city streets in broken glass. Over 30,000 wealthy Jewish men were rounded up and deported to concentration camps (Sachsenhausen, Dachau, Buchenwald) to force them to surrender their assets.
          </div>
          <div class="csb-takeaway">
            <strong>The Decisive Watershed:</strong> Kristallnacht marked the catastrophic transition from legal discrimination and social segregation to overt, violent, state-sponsored physical terror and forced deportation.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">REICHTAG STATUTE</span>
              <span class="source-type">The Nuremberg Laws</span>
            </div>
            <span class="source-date-micro">15 September 1935</span>
          </div>
          <div class="archival-title">The Reich Citizenship Law &amp; Law for Protection of German Blood</div>
          <div class="archival-body written-source-box">
            "Article 2: A citizen of the Reich is that subject only who is of German or kindred blood... A Jew cannot be a citizen of the Reich. He has no right to vote in political affairs and cannot hold public office.<br><br>Article 1: Marriages between Jews and citizens of German or kindred blood are forbidden. Marriages concluded in defiance of this law are void."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">THE PERSECUTION OF THE JEWS: BLUEPRINT OR CUMULATIVE RADICALISATION?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: The Intentionalist Masterplan (Lucy Dawidowicz)</strong>
              <p>"Hitler operated with a clear, premeditated blueprint from the 1920s. Every step—from the 1933 boycott and Nuremberg Laws to Kristallnacht—was a calculated, logical stage toward the physical destruction of European Jewry."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Cumulative Radicalisation (Hans Mommsen)</strong>
              <p>"Antisemitic policy developed erratically through competing party factions, economic crises, and spontaneous local violence. Kristallnacht was an improvised move by Goebbels to restore his standing, accelerating unintended radicalization."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'State two restrictions imposed upon Jewish people in Germany by the Nuremberg Laws of September 1935. <em>[Recall: Stripped of German citizenship, forbidden from marrying or having relationships with German blood citizens]</em>',
        q2: "Explain why the Nazi regime instigated the nationwide Kristallnacht pogrom in November 1938. <em>[Use: Assassination of Ernst vom Rath provided an excuse... Goebbels wanted to regain Hitler's favor... Intended to force total Jewish emigration and Aryanisation of property...]</em>",
        q3: "'The persecution of minorities between 1933 and 1939 was entirely driven by top-down government policy rather than popular participation.' How far do you agree? <em>[Criteria: Compare official decrees (Nuremberg Laws) against spontaneous denunciations and boycott enforcement by ordinary citizens]</em>",
      },
    },
  };

  const leftSources = {
    // Page 2: KT 4.1
    p2: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'State Award Artifact',
        title: 'The Cross of Honour of the German Mother (Mutterkreuz)',
        date: '1938',
        image: getBase64Image('mothers_cross_award.jpg'),
        context:
          "Awarded annually on Hitler's mother's birthday (12 August). Mothers with four children received Bronze, six received Silver, and eight or more received Gold, entitling them to privileged seats on public transport and formal salutes from Hitler Youth.",
        hingeQuestion:
          "How does the Mother's Cross demonstrate the Nazi regime’s view of women as biological instruments of the state rather than individuals?",
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Official Speech',
        title: "Gertrud Scholtz-Klink to the Nazi Women's League",
        date: 'Nuremberg Rally, September 1935',
        text: '“We German women see our highest mission in being the companions, mothers, and domestic guardians of our menfolk. We do not envy men their roles in the military or the government; our battlefield is the nursery and the family hearth. It is our holy duty to bear healthy, pure-blooded children for the Führer and to instil in them the sacred love of the Fatherland from their very first breath.”',
        context:
          'Speech by the Reich Women’s Leader reinforcing the regime’s core ideology that a woman’s biological duty was the reproduction of the Aryan racial community. Scholtz-Klink mobilized millions of wives and mothers behind state eugenics, domestic economy drives, and child welfare programs. Her propaganda elevated domestic self-sacrifice into an act of patriotic duty.',
        hingeQuestion:
          'Why did many German women enthusiastically support policies that stripped them of professional careers and political power?',
      },
    },

    // Page 4: KT 4.2
    p4: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Archival Photograph',
        title: 'League of German Girls (BDM) Practicing Domestic Skills',
        date: 'c. 1936',
        image: getBase64Image('bdm_domestic_skills.jpg'),
        context:
          'BDM girls being instructed in childcare, infant nursing, and sewing. Alongside physical gymnastics and cross-country marching, girls aged 14 to 18 were rigorously prepared for their future roles as mothers of healthy German soldiers.',
        hingeQuestion:
          'How did the BDM successfully combine physical empowerment for young women with conservative domestic subjugation?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'School Textbook Excerpt',
        title: 'Nazi Mathematics Exercise Book',
        date: 'Berlin, 1935',
        text: '“Problem 95: The construction of an asylum for the mentally ill costs 6 million Reichsmarks. How many modern family housing units, costing 15,000 Reichsmarks each, could have been constructed for the same sum?<br><br>Problem 96: A hereditary patient costs the state 5.5 Reichsmarks per day. Calculate how much money is wasted annually on 300,000 hereditary patients that could otherwise be spent on sound German families.”',
        context:
          'A typical mathematical word problem used in German secondary schools to subtly condition schoolchildren into accepting euthanasia and the sterilisation of disabled citizens.',
        hingeQuestion:
          'What makes the incorporation of eugenics and racial hatred into everyday subjects like mathematics particularly dangerous?',
      },
    },

    // Page 6: KT 4.3
    p6: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Archival Photograph',
        title: 'Labourers Constructing the Reichsautobahn',
        date: 'c. 1935',
        image: getBase64Image('autobahn_construction.jpg'),
        context:
          'Manual workers excavating and laying concrete on the Frankfurt-Mannheim autobahn. Conceived by Fritz Todt, the motorways were built using labor-intensive pick-and-shovel methods to absorb hundreds of thousands of unemployed men into public work.',
        hingeQuestion:
          'Were the autobahns primarily an economic project to solve unemployment, or a strategic military infrastructure for future blitzkrieg invasions?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Official Promotional Poster',
        title: 'Strength Through Joy (Kraft durch Freude) Holiday Cruise',
        date: '1937',
        text: '“CRUISE TO MADEIRA AND THE NORWEGIAN FJORDS FOR ONLY 50 REICHSMARKS!<br><br>The German Labour Front (DAF) makes luxury leisure accessible to every honest German worker. Travel aboard our brand-new liner, the Wilhelm Gustloff! Enjoy fine food, sun decks, music, and comradeship. Hard work for the Führer brings joy and health!”',
        context:
          "Poster advertising state-subsidised ocean cruises run by the DAF's Strength Through Joy organisation, designed to reward obedient factory workers and boost productivity. By subordinating all working-class leisure to party supervision, Robert Ley sought to eliminate class conflict and bind labour loyalty inextricably to the regime. The KdF cruise fleet also doubled as potential auxiliary naval transport ships.",
        hingeQuestion:
          'Why did the Nazi regime invest immense resources in subsidized leisure programmes like Strength Through Joy (KdF)?',
      },
    },

    // Page 8: KT 4.4
    p8: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Archival Photograph',
        title: 'Vandalised Jewish Shopfronts Following Kristallnacht',
        date: 'Berlin, 10 November 1938',
        image: getBase64Image('kristallnacht_shop.jpg'),
        context:
          'A Jewish-owned tailor’s shop in Berlin destroyed during the Night of Broken Glass. Pedestrians walk past shattered display windows and painted antisemitic graffiti ("Jude") under the watchful eye of uniform police who did not intervene.',
        hingeQuestion:
          'What does the indifference of ordinary pedestrians in the photograph reveal about the degree of public complicity in antisemitic persecution?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Secret Police Telegram',
        title: 'Reinhard Heydrich’s Instructions for Kristallnacht',
        date: '10 November 1938, 1:20 AM',
        text: '“Only such measures may be taken as will not endanger German life or property (e.g. synagogues may only be burned if there is no danger of fire spreading to neighboring German buildings). Businesses and residences of Jews may only be destroyed, not looted... As many Jews—especially wealthy ones—are to be arrested in all districts as can be accommodated in the existing holding cells. Immediately after the arrests, the appropriate concentration camps are to be contacted.”',
        context:
          'Secret telex dispatch sent by SS security chief Heydrich to all state police headquarters, proving that the supposedly spontaneous "outburst of public fury" was a meticulously planned state operation. Heydrich coordinated the arrest of over 30,000 Jewish men, who were marched through streets into concentration camps to terrorize their families into surrendering property and emigrating. This state-directed violence marked the critical transition from legal discrimination to systematic physical terror.',
        hingeQuestion:
          'How does Heydrich’s secret order expose the Nazi propaganda lie that Kristallnacht was a spontaneous popular uprising?',
      },
    },
  };

  const leftVocab = {
    p2: [
      {
        term: 'Kinder, Küche, Kirche',
        def: '"Children, Kitchen, Church"; the traditional slogan summarizing the Nazi domestic ideal for German women.',
      },
      {
        term: 'Law for Encouragement of Marriage',
        def: '1933 law offering 1,000-mark interest-free loans to young Aryan couples, reduced by 25% for each child born.',
      },
      {
        term: "Mother's Cross",
        def: 'Bronze, silver, or gold medal awarded to mothers who bore four, six, or eight or more children for the Reich.',
      },
      {
        term: 'Lebensborn',
        def: '"Fountain of Life"; SS programme founded by Himmler in 1935 to breed racially pure Aryan babies with unmarried mothers.',
      },
    ],
    p4: [
      {
        term: 'Hitler Youth (HJ)',
        def: 'Compulsory youth movement for boys aged 10–18, focusing on physical fitness, military drill, and ideological loyalty.',
      },
      {
        term: 'League of German Girls (BDM)',
        def: 'Female branch of the youth movement for girls aged 14–18, focusing on health, motherhood, and domestic skills.',
      },
      {
        term: 'NSLB',
        def: "National Socialist Teachers' League; 97% of educators joined to keep their jobs and teach the nazified curriculum.",
      },
      {
        term: 'Napolas',
        def: 'National Political Educational Institutes; elite military boarding schools training the future SS and military officer corps.',
      },
    ],
    p6: [
      {
        term: 'Reich Labour Service (RAD)',
        def: 'Compulsory 6-month manual labor scheme for all 18–25 year-old men, digging ditches and planting forests in uniform.',
      },
      {
        term: 'German Labour Front (DAF)',
        def: 'Monolithic Nazi union led by Robert Ley that replaced banned independent trade unions, controlling wages and hours.',
      },
      {
        term: 'Strength Through Joy (KdF)',
        def: 'DAF leisure division providing subsidized holidays, theater trips, sports, and ocean cruises to reward obedient workers.',
      },
      {
        term: 'Invisible Unemployment',
        def: 'Real unemployment hidden by excluding Jews, sacked women, RAD laborers, and conscripted soldiers from official statistics.',
      },
    ],
    p8: [
      {
        term: 'Nuremberg Laws (1935)',
        def: 'Antisemitic laws that stripped German Jews of citizenship and outlawed marriage and sexual relations with Aryans.',
      },
      {
        term: 'Kristallnacht (1938)',
        def: '"Night of Broken Glass"; nationwide state-sponsored pogrom on 9–10 Nov 1938 destroying synagogues and 7,500 Jewish shops.',
      },
      {
        term: 'Untermenschen',
        def: '"Sub-humans"; derogatory Nazi racial term for Jews, Roma/Sinti, Slavic peoples, and other groups deemed biologically inferior.',
      },
      {
        term: 'Sterilisation Law',
        def: 'July 1933 law enforcing compulsory surgical sterilisation on 400,000 citizens with hereditary mental or physical disabilities.',
      },
    ],
  };

  const backCoverData = {
    title: 'Life in Nazi Germany, 1933–1939: Specification Mastery & Synthesis',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 31 (1HI0/31) &bull; Key Topic 4 Synthesis',
    timelineCards: [
      '<strong>1 Apr 1933: National Jewish Boycott:</strong> SA stormtroopers blockade Jewish shops, doctors, and lawyers for one day.',
      '<strong>1 Jun 1933: Marriage Loan Scheme:</strong> Law for Encouragement of Marriage offers 1,000-mark loans, cleared by 4 children.',
      '<strong>14 Jul 1933: Forced Sterilisation Law:</strong> Hereditary health courts enforce sterilisation of 400,000 disabled citizens.',
      '<strong>26 Jun 1935: Compulsory RAD Service:</strong> Reich Labour Service made compulsory for all young men aged 18–25.',
      '<strong>15 Sep 1935: Nuremberg Laws Enacted:</strong> Reich Citizenship Law and Blood Protection Law strip Jews of civil rights.',
      '<strong>Oct 1936: Four-Year Plan Launched:</strong> Goering prioritizes autarky, synthetic oil, rubber, and total war rearmament.',
      '<strong>1 Dec 1936: First Hitler Youth Law:</strong> Membership made expected for all Aryan boys; church youth clubs outlawed.',
      '<strong>Jul 1937: Buchenwald Camp Opens:</strong> Concentration camp established near Weimar for "asocials", criminals, and Jehovah\'s Witnesses.',
      "<strong>16 Dec 1938: Mother's Cross Instituted:</strong> Medals awarded for bearing children: Bronze (4), Silver (6), Gold (8+).",
      '<strong>9–10 Nov 1938: Kristallnacht Pogrom:</strong> 91 Jews murdered, 267 synagogues burned, and 30,000 sent to camps.',
      '<strong>12 Nov 1938: 1 Billion Mark Fine:</strong> German Jewish community forced to pay collective fine for Kristallnacht damages.',
      "<strong>25 Mar 1939: Hitler Youth Compulsory:</strong> Second Youth Law makes HJ service legally compulsory on pain of parents' arrest.",
    ],
    pillars: [
      {
        title: 'I. Racial Ideology & Genetic Cleansing',
        body: 'The regime applied Social Darwinism and eugenics to purge the gene pool. 400,000 disabled Germans were forcibly sterilized under the 1933 Hereditary Health Law, laying the ideological and medical groundwork for wartime mass euthanasia.',
      },
      {
        title: 'II. Total Indoctrination of Youth & Family',
        body: 'Children were alienated from parental and church influence through compulsory Hitler Youth and BDM service. School curriculum was rewritten around racial struggle, biology, and physical drill, producing a fanatical generation ready for war.',
      },
      {
        title: 'III. War Economy & Regimented Labour',
        body: 'Unemployment was eliminated through rearmament, the RAD, and statistical trickery ("invisible unemployment"). Independent unions were replaced by the DAF. While KdF leisure boosted morale, workers endured wage freezes and 60-hour weeks.',
      },
      {
        title: 'IV. Escalating Persecution of Minorities',
        body: 'Persecution escalated from the 1933 boycotts to the legal segregation of the 1935 Nuremberg Laws and the physical violence of Kristallnacht (1938). Jews, Roma, homosexuals, and "asocials" were systematically excluded from society.',
      },
    ],
    historiographyDebate: {
      interp1: {
        title: 'Interpretation 1: Coercion & Consent (Robert Gellately / Detlev Peukert)',
        text: 'The Third Reich was not maintained purely by Gestapo terror. Most ordinary Germans enjoyed material job security, felt proud of German resurgence, and actively consented to the regime, embracing the benefits of the racial community (*Volksgemeinschaft*).',
      },
      interp2: {
        title:
          'Interpretation 2: Exploitation & Structural Exhaustion (Tim Mason / Richard J. Evans)',
        text: 'The appearance of a harmonious *Volksgemeinschaft* was a propaganda myth. Beneath the surface lay intense class resentment, exhausted workers stripped of rights, terrified minorities, and an overheating war economy heading toward catastrophe.',
      },
    },
    verdicts: [
      {
        title: 'The Myth of the Volksgemeinschaft:',
        body: 'The promised classless "people\'s community" was an ideological fiction. It offered material privileges only to racially pure Aryans willing to conform, while brutally persecuting political opponents, homosexuals, the disabled, and Jews.',
      },
      {
        title: 'The Reality of Economic Mobilisation:',
        body: 'Hitler\'s "economic miracle" was wholly unsustainable in peacetime. It was financed by fraudulent Mefo bills and deficit spending that accumulated 40 billion marks of national debt. The regime was trapped: it had to launch imperialist war or face bankruptcy.',
      },
      {
        title: 'The Escalation to Annihilation:',
        body: 'The persecution of minorities between 1933 and 1939 systematically conditioned the German public to accept dehumanization. By stripping Jews of legal citizenship, economic livelihood, and human dignity, the regime prepared the ground for total wartime genocide.',
      },
    ],
    quizzes: [
      {
        code: 'KT4.1',
        title: 'Policies Towards Women',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt4_1',
      },
      {
        code: 'KT4.2',
        title: 'Policies Towards Young',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt4_2',
      },
      {
        code: 'KT4.3',
        title: 'Employment &amp; Living',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt4_3',
      },
      {
        code: 'KT4.4',
        title: 'Persecution of Minorities',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt4_4',
      },
    ],
  };

  const paragraphEnrichments = {
    enrichParas(lessonIndex, secNum, paras) {
      // KT4.1 (Index 0) Verso Act 1: Native text is already sufficiently long; avoid overflow
      if (lessonIndex === 0 && secNum === 1) {
        // No extra push needed
      }
      // KT4.1 (Index 0) Verso Act 2: Close gap to optimal
      if (lessonIndex === 0 && secNum === 2) {
        if (!paras.some((p) => p.includes('Lebensborn Maternity Homes'))) {
          paras.push(
            `<strong>The Lebensborn Programme (1935):</strong> Founded by Heinrich Himmler, the <em>Lebensborn</em> ('Fount of Life') initiative established secret maternity homes for unmarried racially 'pure' women impregnated by SS officers, aggressively expanding the Aryan birth rate beyond conventional marriage institutions. These clinics provided state-funded prenatal care and infant adoption services, institutionalising state-directed human breeding to forge an elite Aryan ruling class for the future Reich.`,
          );
        }
      }
      // KT4.2 (Index 1) Verso Act 2: Ensure full height
      if (lessonIndex === 1 && secNum === 2) {
        if (
          !paras.some((p) => p.includes('Teacher Indoctrination Camps') || p.includes('NSLB Camps'))
        ) {
          paras.push(
            `<strong>Compulsory Indoctrination Camps for Educators:</strong> To ensure that teachers actively promoted Nazi doctrine in the classroom, the NSLB established compulsory ideological training camps (*Schulungslager*). Teachers had to spend several weeks in uniform under military discipline, sleeping in barracks, marching in formation, and attending lectures on racial biology and Nordic supremacy. Jewish teachers were dismissed immediately in April 1933, while those suspected of socialist sympathies were transferred to remote rural schools or reported to the Gestapo by fanatical pupils who belonged to the Hitler Youth. Headteachers had to be active Nazi Party members, and all classrooms were required to display portraits of Hitler and swastika flags.`,
          );
        }
      }
      // KT4.2 (Index 1) Recto Act 4: Fill Column 1 so components balance into Column 2
      if (lessonIndex === 1 && secNum === 4) {
        if (!paras.some((p) => p.includes('Anti-Indoctrination Backlash'))) {
          paras.push(
            `<strong>Dissidence and the Limits of Total Indoctrination:</strong> Despite the regime's total monopoly over schooling and leisure, complete ideological control proved impossible. By the late 1930s, growing numbers of German youths rebelled against relentless paramilitary drilling, boring ideological lectures, and authoritarian discipline. Working-class teenagers formed illicit gangs like the Edelweiss Pirates, while affluent urban youths founded the Swing Youth, deliberately embracing banned American jazz and English fashion to reject Nazi conformity.`,
          );
        }
      }
      // KT4.3 (Index 2) Verso Act 1: Ensure full height
      if (lessonIndex === 2 && secNum === 1) {
        if (!paras.some((p) => p.includes('Fritz Todt') || p.includes('Motorway Network'))) {
          paras.push(
            `<strong>Fritz Todt &amp; The Strategic Autobahn Project:</strong> The flagship project of Hitler's work creation drive was the construction of the Reichsautobahn motorway network, directed by Inspector General Fritz Todt. Although modern machinery existed, Todt intentionally mandated labor-intensive hand tools—picks, shovels, and wheelbarrows—to maximize the number of manual laborers employed. Workers lived in disciplined paramilitary camps along the highway routes, receiving low wages and working long hours under harsh outdoor conditions. By 1938, over 3,000 kilometers of four-lane highway had been completed. While propaganda celebrated the motorways as symbols of technological genius, they were designed primarily to facilitate the lightning movement of military divisions and tanks across Germany in the event of two-front war.`,
          );
        }
      }
      // KT4.3 (Index 2) Verso Act 2: Expand Act 2 to close 53px void in both columns
      if (lessonIndex === 2 && secNum === 2) {
        if (paras.length > 0 && !paras[paras.length - 1].includes('Reckless Deficit Spending')) {
          paras[paras.length - 1] +=
            ` While Schacht warned that reckless military deficit spending would trigger catastrophic inflation, Göring dismissed orthodox financial warnings, insisting that military expansion would pay off all state debts through conquest.`;
        }
      }
      // KT4.3 (Index 2) Recto Act 4: Close gap on Page 7
      if (lessonIndex === 2 && secNum === 4) {
        if (!paras.some((p) => p.includes('Volkswagen Beetle Savings Scheme'))) {
          paras.push(
            `<strong>The Volkswagen Scheme &amp; Consumer Realities:</strong> Goebbels and the DAF promised ordinary workers a personal motorcar through the *KdF-Wagen* (the precursor to the Volkswagen Beetle) savings scheme. Over 330,000 workers paid five Reichsmarks a week into state stamp books. In reality, not a single car was ever delivered to a German civilian; in 1939, the newly built Wolfsburg factory was immediately converted to military production for the Kubelwagen jeep, and all worker savings were confiscated by the Reich to fund rearmament. Ordinary families who sacrificed weekly food budgets for the dream of personal mobility received only propaganda brochures, while the regime appropriated their pooled capital into secret armaments accounts. This systematic fraud symbolized how the promised consumer paradise was subordinate to the insatiable demands of total war mobilisation.`,
          );
        }
      }
      // KT4.4 (Index 3) Verso Act 1: Ensure full height
      if (lessonIndex === 3 && secNum === 1) {
        if (
          !paras.some((p) => p.includes('Racial Hygiene Courts') || p.includes('Genetic Courts'))
        ) {
          paras.push(
            `<strong>Hereditary Health Courts &amp; Compulsory Sterilisation:</strong> Enacted barely six months after taking power, the Law for the Prevention of Hereditarily Diseased Offspring (*Erbgesundheitsgesetz*) created over 200 special Hereditary Health Courts (*Erbgesundheitsgerichte*). Composed of two doctors and a Nazi district judge, these tribunals held arbitrary hearings based on reports submitted by local physicians and social workers. Citizens diagnosed with schizophrenia, manic depression, hereditary blindness or deafness, severe physical deformity, chronic alcoholism, or "feeblemindedness" were forcibly taken to state hospitals and surgically sterilized. Between 1933 and 1939, more than 400,000 Germans—approximately 1 in every 100 individuals of reproductive age—were subjected to compulsory sterilisation, resulting in the deaths of over 5,000 women from surgical complications.`,
          );
        }
      }
      // KT4.4 (Index 3) Verso Act 2: Expand Act 2 to close void
      if (lessonIndex === 3 && secNum === 2) {
        if (paras.length > 0 && !paras[paras.length - 1].includes('Curfew and Civil Death')) {
          paras[paras.length - 1] +=
            ` By late 1938, German Jews endured total 'civil death': excluded from parks, public transit, and higher education, stripped of state passports, and forced to adopt middle names ('Israel' or 'Sara') to ensure instant identification.`;
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
