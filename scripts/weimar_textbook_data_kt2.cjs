/**
 * weimar_textbook_data_kt2.cjs
 * Component bank, primary sources, vocabulary, and back-cover data for
 * Key Topic 2: Hitler's Rise to Power, 1919–1933.
 */

module.exports = function getKt2Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT2',
    topicNumber: 2,
    title: "HITLER'S RISE TO POWER, 1919–1933",
    subtitle: 'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 31 (1HI0/31)',
    enquiry:
      'How did an obscure fringe party exploit the economic catastrophe of the Great Depression and conservative backstairs intrigue to dismantle Weimar democracy?',
    coverImage: 'weimar_kt2_cover.jpg',
    caption:
      'Berlin, July 1931: Desperate crowds gathered outside the Sparkasse der Stadt Berlin during the Great Depression banking collapse (*Bankenkrach*). The crash threw 6 million into unemployment and shattered faith in Weimar democracy.',
    specTopics: [
      {
        num: 1,
        title: '1. Early NSDAP Development, 1919–22',
        bullets: [
          'DAP origins under Anton Drexler; Hitler joins and transforms party through personal oratory.',
          'The 25-Point Programme (Feb 1920): antisemitism, anti-Versailles, and pan-German nationalism.',
          'Formation of the SA (Brownshirts) under Ernst Röhm; party newspaper and the swastika emblem.',
        ],
      },
      {
        num: 2,
        title: '2. Munich Putsch & Lean Years, 1923–29',
        bullets: [
          'Munich Putsch (Nov 1923): causes, events at Bürgerbräukeller, and military collapse.',
          'Landsberg imprisonment: trial as propaganda triumph, writing of <em>Mein Kampf</em>, and legal strategy.',
          'Party reorganisation: Bamberg Conference (1926), SS creation, and electoral failure (2.6% in 1928).',
        ],
      },
      {
        num: 3,
        title: '3. Growth in Nazi Support, 1929–32',
        bullets: [
          'Wall Street Crash (Oct 1929): 6 million unemployed, bank collapses, and middle-class ruin.',
          'Death of parliamentary democracy: Chancellor Brüning cuts welfare and rules by Article 48.',
          'Growth of KPD; Nazi appeal to middle classes, big business, and youth via negative cohesion.',
        ],
      },
      {
        num: 4,
        title: '4. How Hitler Became Chancellor, 1932–33',
        bullets: [
          'Electoral breakthroughs: 107 seats (1930), 230 seats (July 1932); presidential elections.',
          'Fall of Brüning and Schleicher; Franz von Papen\'s aristocratic "Cabinet of Barons".',
          'The "Backstairs Plot": Papen convinces Hindenburg to appoint Hitler Chancellor (30 Jan 1933).',
        ],
      },
    ],
  };

  const componentBank = {
    // Page 3: KT 2.1 (The Early Development of the Nazi Party, 1919–1922)
    p3: {
      keyFigure: {
        name: 'Anton Drexler',
        lifespan: '1884–1942',
        role: "Founder of the German Workers' Party (DAP) & Early Nazi Party Mentor",
        significance:
          "Founded the nationalist German Workers' Party in Munich in January 1919, recruited Adolf Hitler as party member 555, and co-wrote the founding 25-Point Programme.",
        actions: [
          'Established the DAP in a Munich beer hall in January 1919, combining militant nationalism with anti-capitalist rhetoric.',
          "Collaborated with Adolf Hitler to author the party's 25-Point Programme, officially proclaimed on 24 February 1920.",
          'Ousted from party leadership in July 1921 when Hitler threatened to resign unless granted absolute dictatorial power (*Führerprinzip*).',
        ],
        image: getBase64Image('weimar_individuals/anton_drexler.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">PARAMILITARY VIOLENCE: THE SA BROWNSHIRTS</span>
            <span class="csb-category">POLITICAL TERROR &bull; 1921</span>
          </div>
          <h4 class="csb-title">The Sturmabteilung (SA) &amp; Beer Hall Intimidation</h4>
          <div class="csb-body">
            Formed in August 1921 and led by hardened WWI veteran Ernst Röhm, the <em>Sturmabteilung</em> (SA or 'Brownshirts') served as the paramilitary enforcement arm of the Nazi Party. Composed largely of demobilised Freikorps soldiers and unemployed youth, the SA protected Nazi speakers at rallies while violently attacking political opponents, breaking up communist meetings, and terrorising Jewish businesses across Bavaria. By 1922, the SA numbered several thousand disciplined brawlers who provided the party with an imposing aura of military strength.
          </div>
          <div class="csb-takeaway">
            <strong>Violent Coercion:</strong> Paramilitary violence was not a byproduct of early Nazism but its central engine: it enabled Hitler to command Munich's public spaces and present the NSDAP as a militant barrier against communist revolution.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">MILITARY SURVEILLANCE</span>
              <span class="source-type">Reichswehr Intelligence Report</span>
            </div>
            <span class="source-date-micro">September 1919</span>
          </div>
          <div class="archival-title">Captain Karl Mayr on Adolf Hitler's Oratorical Talent</div>
          <div class="archival-body written-source-box">
            "Hitler is a born popular speaker who, by his fanaticism and populist appeal in a mass gathering, unconditionally forces his listeners to his point of view... He spoke with extraordinary passion against the Versailles Diktat and Jewish Bolshevism, holding the entire tavern spellbound for over eighty minutes."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">THE EARLY NAZI PARTY: CHARISMATIC LEADER OR BAVARIAN CURIOSITY?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Charismatic Dominance (Ian Kershaw)</strong>
              <p>"Without Hitler's extraordinary oratorical gifts and messianic self-belief, the DAP would have remained an obscure beer-hall sect. His magnetic voice transformed a provincial fringe into a militant political movement."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Structural Fringe (Alan Bullock)</strong>
              <p>"In the early 1920s, the NSDAP was merely one of dozens of racist, antisemitic völkisch cliques in Munich. It survived solely because right-wing Bavarian authorities shielded it from Berlin's republican bans."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'Identify two core demands set out in the Nazi 25-Point Programme of February 1920. <em>[Recall: Revocation of Versailles, exclusion of Jews from citizenship, union of all Germans]</em>',
        q2: "Explain why the Sturmabteilung (SA) was vital to Hitler's consolidation of party control between 1921 and 1922. <em>[Use: Consequently... By violently intimidating opponents... This established Hitler's authority because...]</em>",
        q3: "'Hitler's personal appeal as an orator was the single most important factor in early Nazi party growth.' How far do you agree? <em>[Criteria: Compare Hitler's speaking charisma against post-war Bavarian unrest and Freikorps violence]</em>",
      },
    },

    // Page 5: KT 2.2 (The Munich Putsch and the Lean Years, 1923–1929)
    p5: {
      keyFigure: {
        name: 'General Erich Ludendorff',
        lifespan: '1865–1937',
        role: 'Imperial Quartermaster General & Nationalist Leader of the Munich Putsch',
        significance:
          "Celebrated First World War military commander who lent immense national prestige to Hitler's abortive November 1923 putsch, marching at the front of the armed column.",
        actions: [
          "Led the German military effort alongside Hindenburg in WWI, later promoting the malicious 'Dolchstoß' myth.",
          'Joined Hitler in the Bürgerbräukeller on 8 November 1923, coercing Bavarian leaders Kahr and Lossow at gunpoint.',
          'Marched unarmed toward the Munich police cordon at the Feldherrnhalle; acquitted of high treason by sympathetic right-wing judges.',
        ],
        image: getBase64Image('weimar_individuals/general_erich_ludendorff.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">STRATEGIC PIVOT: THE LEGAL ROAD TO POWER</span>
            <span class="csb-category">PARTY REORGANISATION &bull; 1924–1928</span>
          </div>
          <h4 class="csb-title">The 'Legal Strategy' &amp; Party Restructuring</h4>
          <div class="csb-body">
            While serving nine months in Landsberg Prison, Hitler dictated <em>Mein Kampf</em> and reached a crucial strategic realization: armed insurrection (*Putschismus*) against the German military was impossible. Instead, the Nazis had to destroy democracy from within: "If outvoting them takes longer than outshooting them, at least the results are guaranteed by their own constitution." After his release, Hitler refounded the party in February 1925, divided Germany into 35 administrative districts (*Gaue*) led by loyal *Gauleiters*, and established national affiliate bodies (Hitler Youth, Nazi Teachers' League, and the SS).
          </div>
          <div class="csb-takeaway">
            <strong>The Structural Springboard:</strong> Although the Nazis won only 12 seats (2.6%) in the 1928 election, this nationwide organizational machinery gave them an instantly deployable propaganda network when economic disaster struck in 1929.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">COURTROOM TESTIMONY</span>
              <span class="source-type">Closing Trial Speech</span>
            </div>
            <span class="source-date-micro">27 March 1924</span>
          </div>
          <div class="archival-title">Adolf Hitler at his Trial for High Treason in Munich</div>
          <div class="archival-body written-source-box">
            "You may pronounce us guilty a thousand times over, but the goddess of the eternal court of history will smile and tear to tatters the brief of the state prosecutor and the sentence of this court. For she acquits us! The army we have formed is growing day by day... from our dead comrades a new Germany shall arise!"
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">THE LEAN YEARS (1924–1929): WASTELAND OR ESSENTIAL FOUNDATION?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Essential Reorganisation (Dietrich Orlow)</strong>
              <p>"The lean years were the decisive crucible of the Nazi movement. Under the guise of legality, Hitler constructed a totalitarian shadow bureaucracy, disciplined Gauleiters, and professionalized propaganda that made subsequent triumph possible."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Irrelevant Fringe (Richard J. Evans)</strong>
              <p>"By 1928, the Nazi Party was a bankrupt, squabbling extremist sect rejected by 97.4% of German voters. Without the catastrophic external shock of the Great Depression, Hitler's movement would have dissolved into total obscurity."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: "State two reasons why the Munich Putsch collapsed on 9 November 1923. <em>[Recall: Kahr's betrayal, Bavarian police fire at Feldherrnhalle, lack of army support]</em>",
        q2: 'Explain why the trial of 1924 transformed the Munich Putsch from a military disaster into a national propaganda triumph. <em>[Use: Provided a national platform... Sympathetic judges allowed... Consequently...]</em>',
        q3: "'The years 1924 to 1928 were a period of total failure for the Nazi Party.' How far do you agree? <em>[Criteria: Compare 2.6% electoral failure against the structural creation of the SS, Hitler Youth, and Gauleiter network]</em>",
      },
    },

    // Page 7: KT 2.3 (The Growth of Nazi Support, 1929–1932)
    p7: {
      keyFigure: {
        name: 'Heinrich Brüning',
        lifespan: '1885–1970',
        role: 'Chancellor of Germany (1930–1932) & Leader of the Centre Party',
        significance:
          'Dismantled parliamentary democracy by ruling through Article 48 emergency decrees; his ruthless austerity policies earned him the hated title of the "Hunger Chancellor".',
        actions: [
          'Appointed Chancellor by President Hindenburg in March 1930 to bypass the deadlocked Reichstag.',
          'Imposed severe deflationary cuts to unemployment benefits, civil service salaries, and pensions despite skyrocketing unemployment.',
          'Dissolved the Reichstag in July 1930, triggering the catastrophic September election where Nazi seats surged from 12 to 107.',
        ],
        image: getBase64Image('weimar_individuals/heinrich_br_ning.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">ELECTORAL MECHANISM: NEGATIVE COHESION</span>
            <span class="csb-category">MASS MOBILISATION &bull; 1930–1932</span>
          </div>
          <h4 class="csb-title">Negative Cohesion &amp; The Threat of Communist Revolution</h4>
          <div class="csb-body">
            Historians define 'negative cohesion' as people uniting not around shared ideological goals, but around shared hatreds and fears. As unemployment soared to 6 million, the communist KPD gained millions of votes, winning 100 Reichstag seats by November 1932. The German middle class (*Mittelstand*), shopkeepers, farmers, and wealthy industrialists were terrified of a violent Bolshevik revolution that would confiscate their private property. Hitler presented the SA as the only force capable of crushing communist street fighters, winning millions of respectable votes purely as a defensive bulwark against revolution.
          </div>
          <div class="csb-takeaway">
            <strong>Mobilising Fear:</strong> The dramatic surge in Nazi votes was driven less by positive enthusiasm for Nazi doctrine than by panic, visceral anti-communism, and disgust with Weimar's democratic paralysis.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">CONTEMPORARY EYE-WITNESS</span>
              <span class="source-type">Journalistic Report</span>
            </div>
            <span class="source-date-micro">Winter 1931–1932</span>
          </div>
          <div class="archival-title">Heinrich Hauser on Unemployment in Berlin</div>
          <div class="archival-body written-source-box">
            "An almost unbroken chain of men stood in queues stretching for hundreds of yards in the freezing slush outside the municipal welfare office. Their clothes were threadbare; they stood silently, staring at the pavement with hollow eyes. For these millions of desperate men, Weimar democracy has brought only starvation, eviction, and disgrace."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">WHY DID MILLIONS VOTE NAZI? ECONOMIC RUIN VS VISCERAL ANTI-COMMUNISM</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Middle-Class Class Panic (Thomas Childers)</strong>
              <p>"The core of the Nazi electoral constituency was the Protestant middle class, driven to panic by economic liquidation and proletarianization. They voted Nazi because Hitler promised to defend private property and social status."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Broad Cross-Class Appeal (Richard Bessel)</strong>
              <p>"The NSDAP succeeded because it broke traditional class boundaries. It became a 'catch-all party of protest' (*Volkspartei*), uniting unemployed youth, peasant farmers, small shopkeepers, and frightened industrialists under dynamic national leadership."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'Name two political parties whose electoral support expanded rapidly during the Great Depression between 1929 and 1932. <em>[Recall: NSDAP (Nazis) and KPD (Communist Party)]</em>',
        q2: "Explain how Heinrich Brüning's deflationary economic policies directly boosted support for extremist parties. <em>[Use: Cut benefits and wages... Deepened poverty... Convinced the public that democracy was bankrupt...]</em>",
        q3: "'The Wall Street Crash was the primary reason why Hitler won mass electoral support.' How far do you agree? <em>[Criteria: Compare economic catastrophe against sophisticated Goebbels propaganda and fear of communist revolution]</em>",
      },
    },

    // Page 9: KT 2.4 (How Hitler Became Chancellor, 1932–1933)
    p9: {
      keyFigure: {
        name: 'Franz von Papen',
        lifespan: '1879–1969',
        role: 'Chancellor of Germany (1932) & Vice-Chancellor under Hitler (1933–1934)',
        significance:
          'Aristocratic politician who persuaded President Hindenburg to appoint Hitler Chancellor in January 1933, arrogantly claiming he had "boxed Hitler into a corner".',
        actions: [
          'Appointed Chancellor in June 1932, leading an aristocratic "Cabinet of Barons" with virtually zero Reichstag support.',
          "Toppled the democratic SPD government of Prussia in July 1932 (*Preussenschlag*), destroying Germany's strongest republican bulwark.",
          'Formed a secret pact with Hitler in January 1933 to oust Kurt von Schleicher, agreeing to a coalition with only three Nazi cabinet ministers.',
        ],
        image: getBase64Image('weimar_individuals/franz_von_papen.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">POLITICAL MECHANISM: THE BACKSTAIRS PLOT</span>
            <span class="csb-category">THE SEIZURE OF POWER &bull; JANUARY 1933</span>
          </div>
          <h4 class="csb-title">The Aristocratic Conspiracy &amp; The Fatal Miscalculation</h4>
          <div class="csb-body">
            By November 1932, the Nazi Party was in severe crisis: it lost 2 million votes and 34 Reichstag seats, running out of funds. Chancellor Kurt von Schleicher attempted to split the party by offering the vice-chancellorship to Gregor Strasser. Terrified of being sidelined, Franz von Papen met Hitler secretly at the home of Cologne banker Kurt von Schröder on 4 January 1933. Papen convinced President Hindenburg that the only way to establish a stable right-wing government was to make Hitler Chancellor, with Papen as Vice-Chancellor and conservative nationalists holding eight out of eleven cabinet posts. Papen famously boasted: "Within two months, we will have pushed Hitler into a corner until he squeaks!"
          </div>
          <div class="csb-takeaway">
            <strong>Pushed into Power:</strong> Hitler did not seize power through an armed march on Berlin or an electoral majority; he was invited into the Chancellery by conservative elites who mistakenly believed they could control him.
          </div>
        </div>
      `,
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">PRESIDENTIAL COMMUNIQUÉ</span>
              <span class="source-type">Official Chancellery Record</span>
            </div>
            <span class="source-date-micro">30 January 1933</span>
          </div>
          <div class="archival-title">The Appointment of Adolf Hitler as Chancellor</div>
          <div class="archival-body written-source-box">
            "At 11:15 this morning, the Reich President Herr Field Marshal von Hindenburg swore in Adolf Hitler as Reich Chancellor. Herr von Papen took the oath as Vice-Chancellor. The President expressed his hope that the new government of national concentration will successfully restore internal peace and economic strength to the Fatherland."
          </div>
        </div>
      `,
      academicDebate: `
        <div class="historiography-box">
          <div class="hb-header">
            <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
            <span class="hb-focus">HOW DID HITLER BECOME CHANCELLOR? POPULAR MANDATE OR ELITE INTRIGUE?</span>
          </div>
          <div class="hb-grid">
            <div class="hb-col">
              <strong>Interpretation A: Aristocratic Intrigue (Alan Bullock)</strong>
              <p>"Hitler did not take power by storm; he was hoisted into office by a backstairs intrigue between Papen, Oskar von Hindenburg, and Otto Meissner. Without their fatal miscalculation, Hitler would never have gained the Chancellorship."</p>
            </div>
            <div class="hb-col">
              <strong>Interpretation B: Democratic Vacuum (Ian Kershaw)</strong>
              <p>"Intrigue alone cannot explain 1933. Papen and Hindenburg turned to Hitler only because parliamentary democracy had completely collapsed and the Nazis commanded the largest mass movement in German history."</p>
            </div>
          </div>
        </div>
      `,
      bottomEnquiry: {
        q1: 'State two reasons why General Kurt von Schleicher failed to form a stable government in December 1932. <em>[Recall: Alienated landowners over eastern aid, alienated industrialists, failed to split the Nazi Party]</em>',
        q2: 'Explain why Franz von Papen believed he could control Adolf Hitler in a coalition cabinet. <em>[Use: Only three of eleven ministers were Nazis... Papen was Vice-Chancellor with personal access to Hindenburg... Consequently...]</em>',
        q3: "'Hitler became Chancellor primarily through the backstairs intrigue of conservative elites rather than popular electoral support.' How far do you agree? <em>[Criteria: Compare the November 1932 Nazi electoral decline against Papen's backstairs negotiations with Hindenburg]</em>",
      },
    },
  };

  const leftSources = {
    // Page 2: KT 2.1
    p2: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Foundational Manifesto',
        title: 'Points 1, 2, and 4 of the Nazi 25-Point Programme',
        date: '24 February 1920',
        text: '“1. We demand the unification of all Germans in the Greater Germany on the basis of the right of self-determination of peoples.<br><br>2. We demand equality of rights for the German people in respect to the other nations; revocation of the peace treaties of Versailles and St Germain.<br><br>4. None but members of the nation may be citizens of the state. None but those of German blood, whatever their creed, may be members of the nation. No Jew, therefore, may be a member of the nation.”',
        context:
          'Proclaimed by Adolf Hitler to over two thousand people at the Hofbräuhaus beer hall in Munich, establishing the core tenets of Nazi ideology: pan-German expansion, destruction of Versailles, and racial antisemitism.',
        hingeQuestion:
          'Did the 25-Point Programme represent a coherent political ideology, or a contradictory collection of populist grievances designed to attract maximum support?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Archival Photograph',
        title: 'Adolf Hitler Addressing Early Nazi Supporters in Munich',
        date: 'Early 1920s',
        image: getBase64Image('hitler_munich_1920s.jpg'),
        context:
          'Hitler speaking before a crowded Bavarian tavern beneath the party swastika banner. His theatrical gestures, dramatic pauses, and guttural delivery transformed fringe beer-hall meetings into electrifying political rallies.',
        hingeQuestion:
          'How did Hitler’s carefully rehearsed oratorical style allow him to establish absolute personal authority over the early Nazi movement?',
      },
    },

    // Page 4: KT 2.2
    p4: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Archival Photograph',
        title: 'Adolf Hitler, General Ludendorff, and Co-Defendants on Trial for Treason',
        date: 'February 1924',
        image: getBase64Image('munich_putsch_defendants.jpg'),
        context:
          'Hitler and his fellow Munich Putsch conspirators photographed outside the Munich courtroom. General Ludendorff stands centrally in imperial uniform, while Hitler wears civilian dress with an Iron Cross, projecting patriotic legitimacy.',
        hingeQuestion:
          'Why did the conservative Bavarian judges allow Hitler to turn a trial for armed treason into a nationwide nationalist propaganda showcase?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Ideological Manifesto',
        title: 'Hitler on Political Struggle in Mein Kampf',
        date: 'Landsberg Prison, 1924',
        text: '“The receptive ability of the masses is very restricted, and their understanding feeble; on the other hand, they quickly forget. Such being the case, all effective propaganda must be confined to very few points and must harp on these in slogans until the last member of the public understands what you want him to understand... Blood mixing and the resultant drop in the racial level is the sole cause of the dying out of old cultures.”',
        context:
          'Written while serving his sentence in Landsberg Fortress, Mein Kampf combined extreme racial Social Darwinism with a cynical, highly calculated theory of mass political propaganda.',
        hingeQuestion:
          'Did Mein Kampf provide a rigid masterplan for future Nazi policy, or merely reflect Hitler’s raw ideological prejudices?',
      },
    },

    // Page 6: KT 2.3
    p6: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Election Propaganda Poster',
        title: 'Our Last Hope: Hitler (Unsere letzte Hoffnung: Hitler)',
        date: '1932 Presidential Election',
        image: getBase64Image('nazi_poster_our_last_hope.jpg'),
        context:
          'Designed by artist Mjölnir (Hans Schweitzer) for the 1932 elections, showing grim, impoverished faces of unemployed workers, mothers, and veterans looking up toward Hitler as their solitary saviour from economic ruin.',
        hingeQuestion:
          'Why was this visual imagery extraordinarily effective at winning over voters who had never previously supported extreme nationalism?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Official Statistical Record',
        title: 'Reichstag Election Results & German Unemployment (1928–1932)',
        date: 'Statistical Office of the German Reich',
        text: '“May 1928: 1.4 million unemployed &bull; Nazi vote: 2.6% (12 seats)<br>September 1930: 3.0 million unemployed &bull; Nazi vote: 18.3% (107 seats)<br>July 1932: 5.4 million unemployed &bull; Nazi vote: 37.3% (230 seats)<br>November 1932: 5.1 million unemployed &bull; Nazi vote: 33.1% (196 seats)<br>Communist (KPD) vote surged concurrently from 54 seats in 1928 to 100 seats in November 1932.”',
        context:
          'Official Reich statistics demonstrating the direct mathematical correlation between rising unemployment following the Wall Street Crash and the dramatic electoral surge of extremist parties.',
        hingeQuestion:
          'Does the November 1932 decline in Nazi votes demonstrate that the party had already passed its electoral peak before Hitler became Chancellor?',
      },
    },

    // Page 8: KT 2.4
    p8: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Political Caricature',
        title: 'Franz von Papen and Adolf Hitler: "Boxing Him In"',
        date: 'January 1933',
        image: getBase64Image('papen_hitler_cartoon.jpg'),
        context:
          'A biting contemporary cartoon satirising Franz von Papen’s arrogant boast that he would control Hitler inside a conservative coalition cabinet, portraying Papen riding a tiger he cannot tame.',
        hingeQuestion:
          'Why did Franz von Papen and the conservative establishment so catastrophically underestimate Adolf Hitler’s political ruthlessness?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Presidential Statement',
        title: 'President Paul von Hindenburg to Adolf Hitler',
        date: '13 August 1932',
        text: '“His Excellency the Reich President declared that he could not reconcile it with his conscience and his duties to the Fatherland to transfer the entire governing power to the National Socialist movement alone, which wished to use this power in a one-sided manner. He regretted that Herr Hitler saw himself unable to support a national government headed by Chancellor von Papen.”',
        context:
          'Hindenburg’s frosty rejection of Hitler’s demand for the Chancellorship following the July 1932 elections, highlighting the 84-year-old Field Marshal’s deep aristocratic contempt for the Austrian-born "Bohemian corporal".',
        hingeQuestion:
          'What factors forced President Hindenburg to reverse his vehement refusal and appoint Hitler Chancellor just five months later?',
      },
    },
  };

  const leftVocab = {
    p2: [
      {
        term: 'DAP',
        def: "German Workers' Party founded by Anton Drexler in 1919; renamed NSDAP (Nazi Party) under Hitler in 1920.",
      },
      {
        term: '25-Point Programme',
        def: 'The founding political manifesto of the Nazi Party (Feb 1920) demanding revocation of Versailles and antisemitic citizenship.',
      },
      {
        term: 'Sturmabteilung (SA)',
        def: 'The paramilitary "Brownshirts" formed in 1921 under Ernst Röhm to protect Nazi meetings and intimidate political rivals.',
      },
      {
        term: 'Führerprinzip',
        def: 'The "leader principle"; total dictatorial authority requiring absolute, unquestioning obedience from all subordinates.',
      },
    ],
    p4: [
      {
        term: 'Munich Putsch (1923)',
        def: 'Failed armed coup launched by Hitler and Ludendorff on 8–9 Nov 1923 attempting to overthrow the Weimar government.',
      },
      {
        term: 'Mein Kampf',
        def: '"My Struggle"; Hitler\'s autobiographical manifesto written in Landsberg Prison outlining Aryan supremacy and Lebensraum.',
      },
      {
        term: 'Bamberg Conference (1926)',
        def: 'Party gathering where Hitler crushed the socialist wing led by Strasser and cemented absolute ideological control.',
      },
      {
        term: 'Legal Strategy',
        def: "Hitler's post-putsch decision to abandon armed rebellion and win power legally by winning democratic elections.",
      },
    ],
    p6: [
      {
        term: 'Wall Street Crash (1929)',
        def: 'Catastrophic US stock market collapse in October 1929, triggering the global Great Depression and German economic ruin.',
      },
      {
        term: 'Heinrich Brüning',
        def: 'Weimar Chancellor (1930–32) whose deflationary wage and benefit cuts earned him the label "the Hunger Chancellor".',
      },
      {
        term: 'Negative Cohesion',
        def: 'Voters uniting around shared hatreds (fear of communism, disgust with Weimar) rather than agreement on Nazi policies.',
      },
      {
        term: 'KPD',
        def: 'The German Communist Party, whose surging support terrified middle-class Germans and drove them toward the Nazis.',
      },
    ],
    p8: [
      {
        term: 'Backstairs Intrigue',
        def: 'Secret aristocratic negotiations between Papen, Schleicher, and Hindenburg to bypass the Reichstag and appoint Hitler.',
      },
      {
        term: 'Franz von Papen',
        def: 'Conservative aristocrat who persuaded Hindenburg to appoint Hitler Chancellor, falsely believing he could control him.',
      },
      {
        term: 'Kurt von Schleicher',
        def: "Army general and Chancellor (Dec 1932–Jan 1933) whose failed intrigue against Papen paved the way for Hitler's appointment.",
      },
      {
        term: '30 January 1933',
        def: 'The date Adolf Hitler was formally sworn in as Chancellor of Germany by President Paul von Hindenburg.',
      },
    ],
  };

  const backCoverData = {
    title: "Hitler's Rise to Power, 1919–1933: Specification Mastery & Synthesis",
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 31 (1HI0/31) &bull; Key Topic 2 Synthesis',
    timelineCards: [
      '<strong>5 Jan 1919: DAP Founded in Munich:</strong> Anton Drexler establishes party; Hitler joins as military intelligence agent in Sep 1919.',
      '<strong>24 Feb 1920: 25-Point Programme:</strong> Hitler proclaims manifesto at Hofbräuhaus; party renamed National Socialist (NSDAP).',
      '<strong>29 Jul 1921: Hitler Becomes Führer:</strong> Hitler ousts Drexler, demanding absolute dictatorial control over party organization.',
      '<strong>4 Nov 1921: SA Officially Established:</strong> Ernst Röhm organizes Brownshirt paramilitary squad to intimidate political opponents.',
      '<strong>8–9 Nov 1923: The Munich Putsch:</strong> Hitler attempts armed coup in Bavaria; 16 Nazis killed at Feldherrnhalle; Hitler jailed.',
      '<strong>Feb–Dec 1924: Landsberg Imprisonment:</strong> Hitler turns trial into propaganda triumph; writes <em>Mein Kampf</em>; adopts legal strategy.',
      '<strong>14 Feb 1926: Bamberg Party Conference:</strong> Hitler defeats northern socialist faction (Goebbels/Strasser); reasserts Führerprinzip.',
      '<strong>20 May 1928: Reichstag Election Failure:</strong> Golden Twenties prosperity reduces Nazi vote to just 2.6% (12 seats) nationally.',
      '<strong>29 Oct 1929: Wall Street Crash:</strong> US banks recall short-term loans; German factories close; unemployment surges toward 6M.',
      '<strong>14 Sep 1930: Reichstag Breakthrough:</strong> Amid economic panic, Nazi vote surges eightfold to 18.3% (107 seats), becoming 2nd largest party.',
      '<strong>31 Jul 1932: Peak Nazi Electoral Triumph:</strong> Nazis win 37.3% (230 seats) to become largest party; Hindenburg refuses Hitler Chancellorship.',
      '<strong>30 Jan 1933: Hitler Appointed Chancellor:</strong> Papen and Hindenburg agree backstairs deal, mistakenly believing they can control Hitler.',
    ],
    pillars: [
      {
        title: 'I. Early Ideology & Paramilitary Violence',
        body: "The 25-Point Programme fused militant nationalism, anti-Versailles revanchism, and racial antisemitism. Ernst Röhm's SA provided street-level muscle, violently silencing political opponents and creating an image of dynamic militarism.",
      },
      {
        title: 'II. The Munich Putsch & Legal Strategy',
        body: 'The 1923 coup failure proved the state could not be seized by force. In Landsberg Prison, Hitler formulated the legal strategy: utilizing democratic elections to dismantle democracy from within, while building a nationwide Gauleiter network.',
      },
      {
        title: 'III. Great Depression & Mass Mobilisation',
        body: 'The Wall Street Crash wiped out 6 million jobs. Heinrich Brüning\'s austerity dismantled parliamentary rule. Hitler capitalized on "negative cohesion"—uniting frightened middle-class voters terrified of a communist Bolshevik revolution.',
      },
      {
        title: 'IV. Conservative Backstairs Intrigue',
        body: 'Despite losing 2 million votes in November 1932, Hitler was handed power by Franz von Papen and conservative elites. Their arrogant delusion that they could "box Hitler into a corner" was the fatal catalyst that destroyed the Republic.',
      },
    ],
    historiographyDebate: {
      interp1: {
        title: 'Interpretation 1: The Master Demagogue (Alan Bullock)',
        text: 'Hitler was an unprincipled political opportunist of genius who combined theatrical oratory, ruthless tactical flexibility, and cynical exploitation of German grievances to manipulate both the masses and conservative elites into giving him power.',
      },
      interp2: {
        title: 'Interpretation 2: Circumstance & Charismatic Mobilisation (Ian Kershaw)',
        text: 'Hitler was not an all-powerful puppet master. His rise was made possible because the Great Depression created a total systemic collapse of Weimar institutions, allowing his radical message to resonate with millions seeking salvation.',
      },
    },
    verdicts: [
      {
        title: 'Ideological Appeal vs Economic Despair:',
        body: "Nazi ideology remained essentially unchanged between 1924 and 1928, yet voters overwhelmingly rejected it (2.6%). Only when the Great Depression destroyed economic security and pushed 6 million into unemployment did Hitler's radical messianism find mass traction.",
      },
      {
        title: 'The Role of Negative Cohesion:',
        body: "Hitler's electoral surge was fueled primarily by negative cohesion: voters united not by love of Nazi ideology, but by visceral hatred of Versailles, contempt for democratic coalition paralysis, and terrified panic over communist revolution.",
      },
      {
        title: 'The Backstairs Abdication of Elites:',
        body: 'Hitler did not win an electoral majority; by late 1932, Nazi support was declining. He became Chancellor because aristocratic conservative elites (Papen, Hindenburg, Meissner) actively conspired to subvert democracy, believing they could tame him.',
      },
    ],
    quizzes: [
      {
        code: 'KT2.1',
        title: 'Early Nazi Party (1919–22)',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt2_1',
      },
      {
        code: 'KT2.2',
        title: 'Putsch & Lean Years',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt2_2',
      },
      {
        code: 'KT2.3',
        title: 'Growth of Support (1929–32)',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt2_3',
      },
      {
        code: 'KT2.4',
        title: 'Hitler Becomes Chancellor',
        url: 'https://thehistoryrevisionhub.com/quizzes/germany_kt2_4',
      },
    ],
  };

  const paragraphEnrichments = {
    enrichParas(lessonIndex, secNum, paras) {
      // KT2.1 (Index 0) Verso Act 1: Ensure full height
      if (lessonIndex === 0 && secNum === 1) {
        if (!paras.some((p) => p.includes('Karl Mayr') || p.includes('Infiltration'))) {
          paras.push(
            `<strong>Reichswehr Surveillance &amp; Hitler's Discovery:</strong> Following the armistice, Adolf Hitler remained in the Bavarian Army as an intelligence agent (*Verbindungsmann*) assigned by Captain Karl Mayr to monitor radical political groups. In September 1919, Mayr dispatched Hitler to investigate Anton Drexler's German Workers' Party meeting in the Sterneckerbräu beer hall. When a visitor argued that Bavaria should secede from Germany, Hitler rose and launched an impromptu, venomous tirade defending pan-German unity. Deeply impressed by his oratorical passion, Drexler gave Hitler a copy of his pamphlet <em>My Political Awakening</em> and invited him to join the executive committee as member 555. Hitler resigned from the army in March 1920 to dedicate himself full-time to expanding the party.`,
          );
        }
      }
      // KT2.2 (Index 1) Verso Act 2: Ensure full height
      if (lessonIndex === 1 && secNum === 2) {
        if (!paras.some((p) => p.includes('Feldherrnhalle') || p.includes('Police Fire'))) {
          paras.push(
            `<strong>The Climax at the Feldherrnhalle:</strong> On the morning of 9 November 1923, Hitler and Ludendorff led 2,000 armed stormtroopers through the streets of Munich toward the Bavarian War Ministry. At the narrow Residenzstrasse leading into the Odeonsplatz, they were confronted by a heavily armed detachment of state police. A shot was fired—it remains unknown from which side—triggering an immediate volley of police gunfire. Sixteen Nazis and four police officers were killed within seconds. Göring was shot in the groin, Hitler suffered a dislocated shoulder when his bodyguard Ulrich Graf threw himself on top of him, and Ludendorff marched straight through the police line alone. Within hours, the putsch collapsed in utter humiliation, and Hitler fled to Uffing where he was arrested two days later.`,
          );
        }
      }
      // KT2.3 (Index 2) Verso Act 1: Ensure full height
      if (lessonIndex === 2 && secNum === 1) {
        if (!paras.some((p) => p.includes('Industrial Collapse') || p.includes('Kreditanstalt'))) {
          paras.push(
            `<strong>The Banking Crisis &amp; Industrial Collapse:</strong> The disaster deepened in May 1931 when Austria's largest bank, the Creditanstalt, collapsed, triggering panic across Central Europe. Two months later, the major German Danat Bank failed, forcing Chancellor Brüning to declare a nationwide bank holiday. Over 50,000 German businesses went bankrupt between 1930 and 1932. Industrial production plunged by 42%, while five leading steelworks in the Ruhr shut their blast furnaces. Middle-class savers who had painstakingly rebuilt modest bank accounts after the 1923 hyperinflation saw their deposits frozen once again, creating visceral hatred of the democratic republic. Desperate families lined the streets of major cities, where over 600,000 people were registered homeless and makeshift shantytowns sprang up on the outskirts of Berlin.`,
          );
        }
      }
      // KT2.3 (Index 2) Recto Act 4: Ensure full height
      if (lessonIndex === 2 && secNum === 4) {
        if (
          !paras.some(
            (p) => p.includes('Goebbels Propaganda Machine') || p.includes('Hitler over Germany'),
          )
        ) {
          paras.push(
            `<strong>The Modern Propaganda Machine &amp; 'Hitler over Germany':</strong> Joseph Goebbels transformed political campaigning by employing cutting-edge commercial advertising techniques. In the 1932 presidential campaign, Hitler chartered a modern passenger airplane to fly to five cities in a single day—a tour titled 'Hitler over Germany' (*Hitler über Deutschland*). This presented Hitler as a dynamic, godlike modern leader arriving from the clouds to rescue the nation. Simultaneously, the party distributed thousands of phonograph records of Hitler's speeches, produced coordinated slide shows for rural beer halls, and published targeted pamphlets tailored specifically to farmers, small artisans, civil servants, and women. By speaking directly to specific social grievances rather than abstract ideology, Goebbels engineered a broad cross-class coalition of despair that carried the party to electoral victory. Furthermore, party parades, dynamic swastika banners, and martial music created an irresistible aura of youthful energy and disciplined national order that contrasting sharply with Weimar's exhausted democratic politicians.`,
          );
        }
      }
      // KT2.4 (Index 3) Verso Act 1: Ensure full height
      // bypassed Preussenschlag
      // KT2.4 (Index 3) Verso Act 2: Ensure full height
      if (lessonIndex === 3 && secNum === 2) {
        if (!paras.some((p) => p.includes('Gregor Strasser') || p.includes('November Decline'))) {
          paras.push(
            `<strong>The November 1932 Crisis &amp; Strasser's Resignation:</strong> In the November 1932 elections, Nazi support declined by 2 million votes (slipping to 33.1%), severely depleting party funds. Desperate to divide the movement, Chancellor Schleicher offered the vice-chancellorship to Gregor Strasser. Hitler furiously accused Strasser of treason, forcing his resignation. Simultaneously, former Reichsbank President Hjalmar Schacht organised the <em>Industrielleneingabe</em> petition signed by major corporate leaders urging Hindenburg to appoint Hitler. On 4 January 1933, Papen met Hitler secretly at banker Kurt von Schröder's villa in Cologne, securing crucial financial guarantees from steel baron Fritz Thyssen and Rhenish industrial magnates to eliminate the party's debts. With the decisive backing of the aristocratic camarilla and corporate elites, Papen persuaded the reluctant President Hindenburg to appoint Hitler Chancellor on 30 January 1933, smugly boasting that conservative ministers had engaged Hitler 'for our own purposes' and would easily tame him within a <em>conservative-dominated cabinet</em>.`,
          );
        }
      }
      // KT2.4 (Index 3) Recto Act 4: Ensure full height
      if (lessonIndex === 3 && secNum === 4) {
        if (!paras.some((p) => p.includes('Torchlight Procession'))) {
          paras.push(
            `<strong>The Torchlight Procession &amp; The Fatal Miscalculation:</strong> On the evening of 30 January 1933, over 25,000 uniformed SA and SS men staged an enormous, choreographed torchlight procession through the Brandenburg Gate and past the Reich Chancellery on the Wilhelmstrasse. From a first-floor window, Adolf Hitler stood for hours taking their salutes, while down the corridor, the ailing 85-year-old President von Hindenburg watched, murmuring confusedly to his aides that his troops had captured Russian prisoners. Franz von Papen smugly assured conservative doubters: 'We have engaged him for our own purposes... within two months we will have pushed Hitler into a corner until he squeaks!' Papen's delusion that aristocratic amateurs could control a totalitarian demagogue armed with millions of paramilitary fighters proved to be the most catastrophic miscalculation in modern German history, delivering absolute executive power into the hands of a totalitarian dictator. Within twenty-four hours of taking office, Hitler persuaded Hindenburg to dissolve the Reichstag and call new elections for March 1933, unleashing the full coercive machinery of the state and SA terror to eradicate democracy once and for all.`,
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
