/**
 * weimar_textbook_data_kt1.cjs
 * Component bank, primary sources, vocabulary, and back-cover data for
 * Key Topic 1: The Weimar Republic, 1918–1929.
 */

module.exports = function getKt1Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT1',
    topicNumber: 1,
    title: 'The Weimar Republic, 1918–1929',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 31 (1HI0/31) &bull; Key Topic 1 Synthesis',
    enquiry:
      'To what extent did the Weimar Republic recover from the devastating crises of 1919–1923, and was its apparent stability in the "Golden Twenties" an illusion?',
    coverImage: 'weimar_kt1_cover.png',
    caption:
      'Plate I: Potsdamer Platz and the Traffic Tower in Golden Twenties Berlin (c. 1924–1928)',
    specTopics: [
      {
        num: 1,
        title: '1. Origins of Republic, 1918–19',
        bullets: [
          'Legacy of WW1: abdication of Kaiser, armistice and revolution, 1918–19.',
          'Setting up of Weimar Republic: National Assembly and new constitution.',
          'Strengths and weaknesses of new constitution (Proportional Representation, Article 48).',
        ],
      },
      {
        num: 2,
        title: '2. Early Challenges, 1919–23',
        bullets: [
          'Reasons for unpopularity: stab in the back (<em>Dolchstoßlegende</em>) and Versailles Treaty.',
          'Political challenges: Spartacist Uprising, Kapp Putsch, and political assassinations.',
          'Economic challenges: French occupation of Ruhr (1923), causes and effects of hyperinflation.',
        ],
      },
      {
        num: 3,
        title: '3. Recovery of Republic, 1924–29',
        bullets: [
          'Economic recovery: Stresemann, Rentenmark, Dawes Plan (1924), US loans, Young Plan (1929).',
          'Foreign policy: Locarno Treaties (1925), League of Nations (1926), Kellogg-Briand (1928).',
          'Impact on domestic political stability and reduced extremist support.',
        ],
      },
      {
        num: 4,
        title: '4. Changes in Society, 1924–29',
        bullets: [
          'Standard of living: changes in wages, housing, and 1927 unemployment insurance.',
          "Position of women: politics (voting, deputies), work (double-earners), leisure ('New Woman').",
          'Cultural changes: developments in architecture (Bauhaus), art (<em>Neue Sachlichkeit</em>), and cinema.',
        ],
      },
    ],
  };

  const WEIMAR_COMPONENT_BANK = {
    // Page 3: KT 1.1 (The Origins of the Republic, 1918–1919)
    p3: {
      keyFigure: {
        name: 'Friedrich Ebert',
        lifespan: '1871–1925',
        role: 'Leader of the SPD & First President of the Weimar Republic (1919–1925)',
        significance:
          'Steered Germany through imperial collapse, concluded the Armistice, and negotiated the democratic constitution while suppressing violent revolts.',
        actions: [
          "Formed the provisional Council of People's Representatives on 10 November 1918 following the Kaiser's abdication.",
          'Forged the secret Ebert-Groener Pact with the Imperial Army to maintain public order and suppress communist insurrection.',
          'Convened the National Assembly at Weimar and signed the democratic Constitution into law on 11 August 1919.',
        ],
        image: getBase64Image('weimar_individuals/friedrich_ebert.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CRITICAL MECHANISM: CONSTITUTIONAL FLAW</span>
          <span class="csb-category">PARLIAMENTARY DEMOCRACY &bull; 1919</span>
        </div>
        <h4 class="csb-title">Proportional Representation &amp; Coalition Paralysis</h4>
        <div class="csb-body">
          Under Weimar's pure proportional representation system, one seat in the Reichstag was awarded for every 60,000 votes cast nationally, with zero minimum threshold. This allowed dozens of small, radical splinter parties to enter parliament. Consequently, no single political party ever achieved an absolute majority between 1919 and 1933. Governments had to rely on unstable multi-party coalitions; between 1919 and 1933, Germany went through twenty different cabinets, with the average government collapsing after just eight months.
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> Pure proportional representation fragmented parliamentary power, rendering democratic governance incapable of decisive action during national crises and eroding public confidence in the Reichstag.
        </div>
      </div>
    `,
      archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">HISTORICAL EVIDENCE</span>
            <span class="source-type">Secret Telephone Agreement</span>
          </div>
          <span class="source-date-micro">10 November 1918</span>
        </div>
        <div class="archival-title">General Wilhelm Groener on the Ebert-Groener Pact</div>
        <div class="archival-body written-source-box">
          "On the evening of 10 November, I telephoned Friedrich Ebert in the Chancellery over our secret line... I informed him that the High Command placed itself at the disposal of his government. In return, the Field Marshal and I expected the government to support the officer corps in maintaining discipline, supply the army, and combat revolutionary Bolshevism with all vigor. Ebert accepted our offer of alliance with deep relief."
        </div>
      </div>
    `,
      academicDebate: `
      <div class="historiography-box">
        <div class="hb-header">
          <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
          <span class="hb-focus">WAS WEIMAR DOOMED FROM BIRTH?</span>
        </div>
        <div class="hb-grid">
          <div class="hb-col">
            <strong>Interpretation A: Structural Fatalism (Eberhard Kolb)</strong>
            <p>"Weimar democracy was crippled from its inception. Pure proportional representation guaranteed fragmented coalitions, while Article 48 planted a constitutional dictatorship mechanism that fatally compromised democratic governance."</p>
          </div>
          <div class="hb-col">
            <strong>Interpretation B: Elite Sabotage (Richard J. Evans)</strong>
            <p>"The constitution was a remarkably progressive charter. Its vulnerability stemmed not from legal text, but because conservative civil servants, judges, and military commanders remained in power, actively sabotaging democratic legitimacy."</p>
          </div>
        </div>
      </div>
    `,
      bottomEnquiry: {
        q1: "Identify two reasons why Chancellor Max von Baden announced the Kaiser's abdication on 9 November 1918. <em>[Recall: Kiel naval mutiny, British naval blockade, Allied refusal to negotiate with autocracy]</em>",
        q2: 'Explain why the Ebert-Groener Pact created a dangerous dependency on the imperial officer corps. <em>[Use causal connectives: Consequently... In return for... This undermined democratic control because...]</em>',
        q3: "'The Weimar Constitution was a masterpiece of progressive democracy, not a flawed document.' How far do you agree? <em>[Criteria: Compare universal franchise vs Article 48 emergency powers]</em>",
      },
    },

    // Page 5: KT 1.2 (Early Challenges to the Republic, 1919–1923)
    p5: {
      keyFigure: {
        name: 'Rosa Luxemburg',
        lifespan: '1871–1919',
        role: 'Co-Founder of the Spartacus League & German Communist Party (KPD)',
        significance:
          'Brilliant Marxist theorist and orator who led the January 1919 Berlin insurrection against the moderate SPD government before being murdered by Freikorps officers.',
        actions: [
          'Co-founded the radical anti-war Spartacus League in 1916, publishing underground revolutionary tracts.',
          "Demanded all power be transferred to Workers' and Soldiers' Councils rather than a parliamentary National Assembly.",
          'Arrested, beaten, and murdered alongside Karl Liebknecht by Freikorps soldiers on 15 January 1919, her body dumped in the Landwehr Canal.',
        ],
        image: getBase64Image('weimar_individuals/rosa_luxemburg.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">FLASHPOINT IN FOCUS: ECONOMIC CATASTROPHE</span>
          <span class="csb-category">THE RUHR OCCUPATION &bull; 1923</span>
        </div>
        <h4 class="csb-title">The Ruhr Crisis &amp; The Hyperinflation Spiral</h4>
        <div class="csb-body">
          When Germany defaulted on timber and coal deliveries in late 1922, French Prime Minister Raymond Poincaré ordered 60,000 French and Belgian troops to occupy the Ruhr industrial heartland in January 1923 to seize reparations in kind. Chancellor Wilhelm Cuno ordered passive resistance: workers went on general strike while French troops sealed off the region, cutting off 80% of German coal and iron production. To pay striking miners and keep the state functioning, the Reichsbank printed astronomical quantities of paper marks, triggering the catastrophic hyperinflation collapse.
        </div>
        <div class="csb-takeaway">
          <strong>Psychological Ruin:</strong> Middle-class Germans saw their life savings, pensions, and insurance policies utterly wiped out overnight. They never forgave the Weimar Republic for their humiliation, creating fertile soil for extremist recruitment.
        </div>
      </div>
    `,
      archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">HISTORICAL EVIDENCE</span>
            <span class="source-type">The Peace Treaty</span>
          </div>
          <span class="source-date-micro">28 June 1919</span>
        </div>
        <div class="archival-title">Article 231 of the Treaty of Versailles (The War Guilt Clause)</div>
        <div class="archival-body written-source-box">
          "The Allied and Associated Governments affirm and Germany accepts the responsibility of Germany and her allies for causing all the loss and damage to which the Allied and Associated Governments and their nationals have been subjected as a consequence of the war imposed upon them by the aggression of Germany and her allies."
        </div>
      </div>
    `,
      academicDebate: `
      <div class="historiography-box">
        <div class="hb-header">
          <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
          <span class="hb-focus">THE TRAUMA OF 1923: PERMANENT SCAR OR RESILIENCE?</span>
        </div>
        <div class="hb-grid">
          <div class="hb-col">
            <strong>Interpretation A: Middle-Class Alienation (Detlev Peukert)</strong>
            <p>"Hyperinflation destroyed the moral foundation of the Republic. Middle-class citizens whose savings evaporated felt utterly betrayed by democracy, creating deep cynicism that made them fertile ground for later radicalization."</p>
          </div>
          <div class="hb-col">
            <strong>Interpretation B: Institutional Resilience (Mary Fulbrook)</strong>
            <p>"Despite extreme crises—Ruhr occupation, hyperinflation, and armed rebellions from left and right—the Republic did not collapse in 1923. The decisive introduction of the Rentenmark proved the state possessed vital resilience."</p>
          </div>
        </div>
      </div>
    `,
      bottomEnquiry: {
        q1: 'State two military terms imposed on Germany by the Treaty of Versailles. <em>[Recall: 100,000 army limit, 6 battleships, demilitarised Rhineland, zero air force]</em>',
        q2: "Explain why General von Seeckt's declaration that 'Reichswehr does not fire on Reichswehr' exposed the fatal vulnerability of the Republic. <em>[Use: This demonstrated that... Consequently...]</em>",
        q3: 'Assess whether the hyperinflation of 1923 was primarily caused by Versailles reparations or by reckless government spending. <em>[Weigh: Passive resistance funding vs London ultimatum]</em>',
      },
    },

    // Page 7: KT 1.3 (The Recovery of the Republic, 1924–1929)
    p7: {
      keyFigure: {
        name: 'Gustav Stresemann',
        lifespan: '1878–1929',
        role: 'Chancellor (1923) and Foreign Minister of Germany (1923–1929)',
        significance:
          'Rescued the Republic from hyperinflation, rebuilt diplomatic relations with the Western Allies, and secured foreign capital to finance German economic recovery.',
        actions: [
          'Ended passive resistance in the Ruhr in September 1923 despite furious right-wing nationalist outcry.',
          'Introduced the temporary Rentenmark backed by land mortgages, halting hyperinflation and stabilizing the currency.',
          'Negotiated the Dawes Plan (1924), signed the Locarno Treaties (1925), brought Germany into the League of Nations (1926), and agreed the Young Plan (1929).',
        ],
        image: getBase64Image('weimar_individuals/gustav_stresemann.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">FINANCIAL ARCHITECTURE: BORROWED TIME</span>
          <span class="csb-category">THE DAWES LOAN CYCLE &bull; 1924–1929</span>
        </div>
        <h4 class="csb-title">The Dawes Plan &amp; "Dancing on a Volcano"</h4>
        <div class="csb-body">
          The 1924 Dawes Plan established a circular economic mechanism that temporarily stabilized Europe: American banks loaned billions of dollars to German municipal governments and industrial syndicates; Germany used this influx of capital to rebuild infrastructure, modernize factories, and pay reparations to Britain and France; Britain and France then used these reparation payments to pay off their wartime loans to the United States. While this created a dramatic boom, it created a fatal dependency: German businesses were financed by short-term loans that American financiers could recall on ninety days' notice.
        </div>
        <div class="csb-takeaway">
          <strong>Fatal Dependency:</strong> Stresemann himself warned in 1928: "The economic position is only flourishing on the surface. Germany is dancing on a volcano." When Wall Street crashed, the entire house of cards collapsed.
        </div>
      </div>
    `,
      archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">HISTORICAL EVIDENCE</span>
            <span class="source-type">League of Nations Address</span>
          </div>
          <span class="source-date-micro">10 September 1926</span>
        </div>
        <div class="archival-title">Gustav Stresemann\'s Address to the League of Nations Assembly</div>
        <div class="archival-body written-source-box">
          "It cannot be the purpose of the League of Nations to measure nations by their military might or the size of their armies. The League must be a fellowship of nations founded upon justice, moral strength, and international cooperation... Germany enters this great assembly with the sincere will to serve peace and to cooperate in solving the great tasks that history has set before mankind."
        </div>
      </div>
    `,
      academicDebate: `
      <div class="historiography-box">
        <div class="hb-header">
          <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
          <span class="hb-focus">STRESEMANN: EUROPEAN STATESMAN OR REVISIONIST?</span>
        </div>
        <div class="hb-grid">
          <div class="hb-col">
            <strong>Interpretation A: Multi-Lateral Peacemaker (Jonathan Wright)</strong>
            <p>"Stresemann was a visionary European statesman who understood that Germany’s revival depended on international reconciliation. Locarno and the League represented sincere efforts to integrate Germany into a peaceful West."</p>
          </div>
          <div class="hb-col">
            <strong>Interpretation B: Tactical Nationalist (A.J.P. Taylor)</strong>
            <p>"Stresemann’s 'policy of fulfilment' was merely a shrewd manoeuvre to liberate the Rhineland and dismantle Versailles without war. Meanwhile, funding recovery through fragile US loans left Germany dancing on a financial volcano."</p>
          </div>
        </div>
      </div>
    `,
      bottomEnquiry: {
        q1: 'Identify the two international agreements (1924 and 1929) that restructured German reparations payments. <em>[Recall: Dawes Plan and Young Plan terms]</em>',
        q2: 'Explain how the Rentenmark successfully restored public confidence in German currency within weeks. <em>[Use: Backed by mortgage bonds... Supply strictly limited to 3.2bn... Consequently...]</em>',
        q3: "'Gustav Stresemann was the saviour of the Weimar Republic.' How far do you agree with this interpretation? <em>[Criteria: Compare diplomatic rehabilitation against economic debt dependency]</em>",
      },
    },

    // Page 9: KT 1.4 (Changes in Society, 1924–1929)
    p9: {
      keyFigure: {
        name: 'Walter Gropius',
        lifespan: '1883–1969',
        role: 'Pioneer Modernist Architect & Founder of the Bauhaus School (1919–1928)',
        significance:
          'Revolutionized modern architecture and industrial design by uniting fine art with modern industrial technology, creating the iconic Weimar aesthetic.',
        actions: [
          'Founded the Bauhaus in 1919 and designed the iconic glass-and-steel Dessau complex in 1925.',
          'Pioneered functionalist design ("form follows function"), championing accessible, mass-produced housing and furniture for modern industrial society.',
        ],
        image: getBase64Image('weimar_individuals/walter_gropius.jpg'),
      },
      archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">PRIMARY PLATE</span>
            <span class="source-type">Bauhaus Dessau &bull; 1926</span>
          </div>
          <span class="source-date-micro">Architectural Plate</span>
        </div>
        <div class="archival-title">The Bauhaus Complex in Dessau, Designed by Walter Gropius</div>
        <img class="archival-image" src="${getBase64Image('bauhaus_dessau.jpg')}" alt="Bauhaus Dessau">
        <div class="archival-context-box">
          <p class="archival-context-text">Gropius designed the Dessau complex with steel frames and continuous glass curtain walls, embodying modern functionalism.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>Why did modern functionalist design provoke such intense hostility from traditional nationalists?</em></div>
        </div>
      </div>
    `,
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">POLARIZATION: KULTURBOLSCHEWISMUS</span>
            <span class="csb-category">THE CULTURAL BACKLASH &bull; 1924–1929</span>
          </div>
          <h4 class="csb-title">The Nationalist War on 'Cultural Bolshevism'</h4>
          <div class="csb-body">
            While international visitors celebrated Berlin as the glittering capital of modernism, provincial and conservative Germans viewed Weimar culture with visceral horror. Traditionalists, the Catholic and Protestant churches, and right-wing nationalist groups (such as the DNVP and NSDAP) denounced modern art, cabaret, Bauhaus functionalism, and women's liberation as <em>Kulturbolschewismus</em> ("Cultural Bolshevism")—a degenerate conspiracy allegedly orchestrated by communists and Jews to destroy German moral values. In 1926, the Reichstag passed the 'Law to Protect Youth from Trash and Smut' to censor modern literature and art.
          </div>
          <div class="csb-takeaway">
            <strong>The Cultural Schism:</strong> Weimar culture did not unite the nation; it created an irreconcilable chasm between cosmopolitan, progressive Berlin and traditional, conservative rural Germany that right-wing extremists exploited to delegitimize the Republic.
          </div>
        </div>
      `,
      academicDebate: `
      <div class="historiography-box">
        <div class="hb-header">
          <span class="hb-tag">HISTORIOGRAPHICAL DEBATE</span>
          <span class="hb-focus">WEIMAR CULTURE: GOLDEN AGE OR DANGEROUS DIVIDE?</span>
        </div>
        <div class="hb-grid">
          <div class="hb-col">
            <strong>Interpretation A: Cultural Renaissance (Peter Gay)</strong>
            <p>"The Weimar era was a magnificent explosion of modernism and human liberation. Freedom from imperial censorship enabled unprecedented breakthroughs in Bauhaus architecture, expressionist art, and social emancipation."</p>
          </div>
          <div class="hb-col">
            <strong>Interpretation B: Polarizing Alienation (Gordon Craig)</strong>
            <p>"Avant-garde Berlin culture was an isolated phenomenon that horrified conservative, rural Germany. By flouting traditional morality, it fueled nationalist rage against 'cultural Bolshevism', directly aiding Nazi propaganda."</p>
          </div>
        </div>
      </div>
    `,
      bottomEnquiry: {
        q1: 'Identify two social reforms introduced by the Weimar government between 1924 and 1928 to support workers and vulnerable families. <em>[Recall: 1927 Unemployment Insurance Act, municipal housing]</em>',
        q2: "Explain why traditional conservatives and nationalists reacted with such hostility to the emergence of the 'New Woman'. <em>[Use: Challenged traditional family roles... Stigmatised as double-earners...]</em>",
        q3: "'For the vast majority of German citizens, the Golden Twenties brought no real improvement in their daily lives.' To what extent do you agree? <em>[Weigh: Industrial wage rises vs peasant farm debt and middle-class resentment]</em>",
      },
    },
  };

  // ============================================================================
  // RICH DISCIPLINARY PRIMARY SOURCE BANK FOR LEFT-HAND PAGES (VERSO)
  // ============================================================================

  const WEIMAR_LEFT_SOURCES = {
    // Page 2: KT 1.1 (The Origins of the Republic)
    p2: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Official Proclamation',
        title: 'Philipp Scheidemann Proclaims the Republic from the Reichstag Window',
        date: '9 November 1918',
        text: '“The German people have won all along the line. What was old and rotten has collapsed; militarism is at an end! The Hohenzollerns have abdicated! Long live the German Republic! Ebert has been charged with forming a government... See to it that the new Republic is not endangered by anything. Long live the free German Republic!”',
        context:
          'Spoken spontaneously from a window of the Reichstag in Berlin on the afternoon of 9 November 1918 to pre-empt communist leader Karl Liebknecht from proclaiming a Soviet Republic from the nearby royal palace.',
        hingeQuestion:
          'Did Scheidemann’s proclamation create a genuine democratic mandate, or did it expose the deep ideological divisions that doomed the Republic?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Constitutional Charter',
        title: 'Articles 22 and 48 of the Weimar Constitution',
        date: '11 August 1919',
        text: '“Article 22: The Reichstag shall be elected by universal, equal, direct and secret ballot by all men and women over twenty years of age, in accordance with the principles of proportional representation...<br><br>Article 48: If public safety and order in the Reich are seriously disturbed or endangered, the Reich President may take the measures necessary to restore public safety and order, intervening if necessary with the aid of the armed forces.”',
        context:
          'Drafted by liberal jurist Hugo Preuss, the Constitution created Europe’s most democratic franchise while simultaneously introducing the emergency decree loophole that ultimately enabled authoritarian rule.',
        hingeQuestion:
          'Was Article 48 a necessary emergency safety valve for a fragile democracy, or a constitutional suicide pill?',
      },
    },

    // Page 4: KT 1.2 (Early Challenges to the Republic)
    p4: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Archival Photograph',
        title: 'Government Machine-Gun Post on the Brandenburg Gate (Spartacist Uprising)',
        date: 'January 1919',
        image: getBase64Image('spartacist_uprising.jpg'),
        context:
          'In January 1919, the communist Spartacus League launched an armed revolt in Berlin. Government troops and Freikorps units set up machine-gun positions behind the Quadriga atop the Brandenburg Gate to defend the government district before ruthlessly crushing the uprising and murdering Karl Liebknecht and Rosa Luxemburg.',
        hingeQuestion:
          'Why did the government’s decision to deploy right-wing Freikorps to crush left-wing revolutionaries prove to be a fatal compromise for Weimar democracy?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Archival Photograph',
        title: 'Stacks of Devalued Paper Currency in a Berlin Bank (1923)',
        date: 'Autumn 1923',
        image: getBase64Image('weimar_hyperinflation_note.jpg'),
        context:
          'Following the Franco-Belgian occupation of the Ruhr in January 1923 and the government’s policy of passive resistance, the Reichsbank printed unbacked paper marks day and night. Here, bank clerks sit behind head-high stacks of bundled notes as a single loaf of bread rose to over 200 billion marks.',
        hingeQuestion:
          'How did the hyperinflation crisis of 1923 permanently destroy the economic security and political faith of Germany’s middle class?',
      },
    },

    // Page 6: KT 1.3 (The Recovery of the Republic)
    p6: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Private Correspondence',
        title: 'Gustav Stresemann on the Fragility of the Economic Recovery',
        date: 'September 1928',
        text: '“Our economic recovery is only flourishing on the surface. Germany is, in fact, dancing on a volcano. If our American creditors should ever decide to call in their short-term loans, a very large section of our industrial and commercial economy will collapse immediately.”',
        context:
          'From a private letter written by Foreign Minister Gustav Stresemann in autumn 1928, candidly acknowledging that Weimar’s apparent golden prosperity was dangerously vulnerable to any sudden recall of Wall Street credit.',
        hingeQuestion:
          "Why did Stresemann privately describe Germany's economic position as 'dancing on a volcano' despite rising industrial output?",
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Press Analysis',
        title: 'German Financial Press on Industrial Modernisation and the Dawes Plan',
        date: 'Late 1928',
        text: '“Our national economy has finally achieved genuine stability. Through the Dawes Plan and massive American investment, our factories have been modernized with advanced assembly-line techniques, causing industrial production to soar. Support for extremist parties has collapsed, proving that our citizens are contented and that the Republic is finally safe.”',
        context:
          'Article published in a leading German commercial daily newspaper celebrating five years of economic recovery under currency stabilisation, industrial rationalisation, and foreign capital inflows.',
        hingeQuestion:
          'How does Source B’s optimistic assessment of German industrial stability directly contradict Stresemann’s warning in Source A?',
      },
    },

    // Page 8: KT 1.4 (Changes in Society)
    p8: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Official Statistical Record',
        title: 'Reichstag Report on the 1927 Unemployment Insurance Act & War Pensions',
        date: '16 July 1927',
        text: '“Under the Reich Law of 16 July 1927, compulsory unemployment insurance is established for 17.2 million industrial and clerical workers, funded equally by employers and employees... In addition, the Reich Treasury continues to disburse pensions to 1,537,000 disabled war veterans, 533,000 war widows, and 1,192,000 orphans from the 1914–1918 war.”',
        context:
          'While the 1927 Act established Europe’s most advanced social safety net, the fixed financial burden severely restricted the government’s fiscal manoeuvrability when mass unemployment struck in 1929.',
        hingeQuestion:
          'Was the Weimar welfare system a triumph of progressive social justice or an unsustainable economic gamble?',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Constitutional Charter',
        title: 'Article 109 of the Weimar Constitution',
        date: '11 August 1919',
        text: '“All Germans are equal before the law. Men and women have, in principle, the same fundamental civic rights and duties. Marriage is based on the equality of the sexes and the preservation of the family... All exceptional provisions against female civil servants are abolished.”',
        context:
          'Article 109 established legal equality and women’s suffrage for the first time in German history, yet traditional conservative attitudes and economic backlash continued to limit female advancement in practice.',
        hingeQuestion:
          "Why did formal constitutional equality fail to eliminate the social stigma of working women as 'double-earners'?",
      },
    },
  };

  // ============================================================================
  // VOCABULARY BANK FOR LEFT-HAND PAGES (VERSO)
  // ============================================================================

  const WEIMAR_LEFT_VOCAB = {
    p2: [
      {
        term: 'Proportional Representation',
        def: 'Electoral system where parties gain seats precisely proportional to national votes, causing coalition instability.',
      },
      {
        term: 'Article 48',
        def: 'Emergency constitutional clause allowing the President to rule by decree without parliamentary consent.',
      },
      {
        term: 'Dolchstoßlegende',
        def: 'The toxic right-wing myth that the German army was undefeated in the field but stabbed in the back by democratic politicians.',
      },
      {
        term: 'Ebert-Groener Pact',
        def: 'Secret pact where the army pledged loyalty to the civilian government in exchange for state autonomy and suppressing communism.',
      },
    ],
    p4: [
      {
        term: 'Diktat',
        def: 'A dictated peace; German term for Versailles because Germany was locked out of negotiations and forced to sign under threat of invasion.',
      },
      {
        term: 'Freikorps',
        def: 'Paramilitary units of fiercely anti-communist, nationalist demobilised soldiers organized to crush revolutionary uprisings.',
      },
      {
        term: 'Passive Resistance',
        def: 'Non-violent strike policy adopted by Ruhr miners in 1923, refusing to mine coal for French occupying forces.',
      },
      {
        term: 'Hyperinflation',
        def: 'Catastrophic currency collapse in 1923 where paper marks became worthless and prices rose out of control.',
      },
    ],
    p6: [
      {
        term: 'Rentenmark',
        def: 'Temporary stable currency introduced by Stresemann in Nov 1923, backed by mortgages on German agricultural and industrial land.',
      },
      {
        term: 'Dawes Plan (1924)',
        def: 'Agreement scaling annual German reparations payments to economic capacity and injecting 800 million gold marks in American loans.',
      },
      {
        term: 'Locarno Treaties (1925)',
        def: 'Pact where Germany voluntarily recognized its western borders with France and Belgium, securing peace in the West.',
      },
      {
        term: 'Young Plan (1929)',
        def: 'Agreement reducing total German reparations from £6.6bn to £2bn and extending payments over 59 years.',
      },
    ],
    p8: [
      {
        term: 'Bauhaus',
        def: 'Revolutionary modernist design school founded by Walter Gropius, prioritizing clean functionality: "form follows function".',
      },
      {
        term: 'The "New Woman"',
        def: 'Cultural ideal of the modern Weimar woman: financially independent, voting, wearing bobbed hair, and smoking in public.',
      },
      {
        term: 'Neue Sachlichkeit',
        def: '"New Objectivity"; realist art movement (e.g. Otto Dix, George Grosz) depicting gritty, cynical truths of post-war German society.',
      },
      {
        term: 'Kulturbolschewismus',
        def: '"Cultural Bolshevism"; derogatory right-wing label used by nationalists to attack modern art, jazz, and liberated Berlin culture.',
      },
    ],
  };

  const backCoverData = {
    timeline: [
      {
        date: '28 Oct 1918',
        title: 'Kiel Naval Mutiny',
        body: "Sailors refuse suicidal attack; sparks nationwide revolution and soldiers' councils.",
      },
      {
        date: '9 Nov 1918',
        title: 'Abdication of Wilhelm II',
        body: 'Kaiser flees to Holland; Scheidemann proclaims Republic to pre-empt communism.',
      },
      {
        date: '11 Nov 1918',
        title: 'Armistice Signed',
        body: "Matthias Erzberger signs surrender at Compiègne; fuels right-wing 'Dolchstoß' myth.",
      },
      {
        date: '15 Jan 1919',
        title: 'Spartacist Revolt Crushed',
        body: 'Freikorps crush Berlin uprising; Rosa Luxemburg &amp; Karl Liebknecht murdered.',
      },
      {
        date: '28 Jun 1919',
        title: 'Versailles Treaty Signed',
        body: "Weimar envoys forced to sign 'Diktat'; loses 13% land, 100k army limit, £6.6bn bill.",
      },
      {
        date: '11 Aug 1919',
        title: 'Weimar Constitution Enacted',
        body: 'Progressive democracy ratified; introduces Proportional Representation &amp; Article 48.',
      },
      {
        date: 'Mar 1920',
        title: 'The Kapp Putsch',
        body: "12,000 Freikorps seize Berlin; army refuses to fire; defeated by general workers' strike.",
      },
      {
        date: 'Jan 1923',
        title: 'Occupation of the Ruhr',
        body: '60,000 French/Belgian troops seize industry; passive resistance triggers hyperinflation.',
      },
      {
        date: 'Nov 1923',
        title: 'Rentenmark Currency Reform',
        body: 'Stresemann halts passive resistance; mortgage-backed currency restores stability.',
      },
      {
        date: 'Aug 1924',
        title: 'The Dawes Plan',
        body: 'Scales reparations to capacity; US banks loan 800m gold marks to revive German industry.',
      },
      {
        date: 'Oct 1925',
        title: 'The Locarno Treaties',
        body: 'Germany voluntarily accepts western borders with France/Belgium; secures European peace.',
      },
      {
        date: 'Sep 1926',
        title: 'League of Nations Entry',
        body: 'Germany admitted to League Council as a permanent Great Power; ends diplomatic isolation.',
      },
    ],
    pillars: [
      {
        title: 'I. Constitutional Flaws',
        body: 'Pure Proportional Representation (1 seat per 60k votes) prevented majorities, producing 20 fragile coalitions in 14 years. Article 48 allowed the President to rule by decree, creating a fatal dictatorial loophole.',
      },
      {
        title: 'II. Extremist Violence',
        body: 'Right-wing Dolchstoß myth branded republicans "November Criminals". Armed coups from left (Spartacists 1919) and right (Kapp 1920, Munich 1923) exposed state dependence on unloyal imperial soldiers.',
      },
      {
        title: 'III. Economic Recovery',
        body: 'Halting passive resistance and issuing the Rentenmark halted hyperinflation. Dawes (1924) &amp; Young (1929) Plans rebuilt industry on American credit—creating what Stresemann called "dancing on a volcano".',
      },
      {
        title: 'IV. Cultural Polarization',
        body: 'Abolishing censorship unleashed avant-garde Bauhaus design, cinema, and the liberated "New Woman". However, provincial conservatives fiercely condemned Berlin culture as "cultural Bolshevism".',
      },
    ],
    historiographyDebate: {
      interp1: {
        title: 'Interpretation 1: The Doomed Republic (Kolb / Peukert)',
        text: "Weimar democracy was mortally wounded at birth by Versailles, Article 48, and unrepentant imperial civil servants and judges who subverted democracy. Stresemann's prosperity was an artificial bubble built on volatile US loans that inevitably burst in 1929.",
      },
      interp2: {
        title: 'Interpretation 2: The Resilient Golden Age (Evans / Bookbinder)',
        text: 'Between 1924 and 1929, the Republic demonstrated remarkable resilience, weathering revolutionary coups and hyperinflation to build modern housing, progressive welfare, and peaceful diplomatic integration. Extremist votes collapsed to just 2.6% in 1928.',
      },
    },
    verdicts: [
      {
        title: 'Democracy on Trial:',
        body: 'The Republic demonstrated surprising resilience in overcoming the 1919–1923 existential crises. By 1928, moderate coalition parties won 73% of the vote, and political assassinations had ceased. However, PR prevented stable parliamentary majorities, and Article 48 established a fatal habit of executive rule.',
      },
      {
        title: 'Economic Illusion:',
        body: 'Industrial output surpassed 1913 levels by 1928, and real wages rose steadily. Yet prosperity was an illusion financed by volatile American short-term loans. When Gustav Stresemann warned that Germany was "dancing on a volcano", he correctly foresaw that any US credit contraction would trigger catastrophic collapse.',
      },
      {
        title: 'Social &amp; Diplomatic Legacy:',
        body: "The Locarno Treaties and entry into the League of Nations restored Germany's great power status without firing a single shot. However, the psychological trauma of 1923 hyperinflation and conservative fury against modern Berlin culture left deep societal divisions that right-wing extremists would readily exploit.",
      },
    ],
    quizzes: [
      {
        code: 'KT 1.1',
        title: 'Origins of Republic',
        url: 'https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&quiz=true&lesson=0',
      },
      {
        code: 'KT 1.2',
        title: 'Early Challenges 1919–23',
        url: 'https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&quiz=true&lesson=1',
      },
      {
        code: 'KT 1.3',
        title: 'Recovery 1924–29',
        url: 'https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&quiz=true&lesson=2',
      },
      {
        code: 'KT 1.4',
        title: 'Society & Culture',
        url: 'https://the-history-revision-hub.netlify.app/?unit=weimar_nazi_germany&quiz=true&lesson=3',
      },
    ],
  };

  const paragraphEnrichments = {
    enrichParas(lessonIndex, secNum, paras) {
      // =========================================================================
      // PEDAGOGICAL CONTENT ENRICHMENT: ELIMINATE PROSE VOIDS (Page Budget Guard)
      // =========================================================================

      // Page 3 (KT1.1 Recto Act 3): Add concise paragraph [3.2] on the Democratic Transition
      if (lessonIndex === 0 && secNum === 3) {
        if (
          !paras.some(
            (p) =>
              p.includes("Council of People's Representatives") ||
              p.includes('Democratic Transition'),
          )
        ) {
          paras.push(
            `<strong>The Democratic Transition &amp; Elections of January 1919:</strong> Friedrich Ebert formed the Council of People's Representatives, declared an armistice, and scheduled national elections for 19 January 1919. Despite radical communist boycotts, 30 million Germans voted—an extraordinary 83% turnout providing an overwhelming democratic mandate for the National Assembly to convene at Weimar.`,
          );
        }
      }

      // Page 3 (KT1.1 Recto Act 4): Add concise paragraphs on the National Assembly at Weimar
      if (lessonIndex === 0 && secNum === 4) {
        if (
          !paras.some(
            (p) => p.includes('National Assembly at Weimar') || p.includes('Democratic Compromise'),
          )
        ) {
          paras.push(
            `<strong>The National Assembly at Weimar &amp; The Democratic Compromise:</strong> Meeting in the peaceful cultural city of Weimar to escape Berlin's street riots, delegates drafted Germany's first parliamentary constitution. Ratified on 11 August 1919, the document balanced progressive universal suffrage with traditional federal structures, establishing a republic amid revolutionary turmoil.`,
          );
        }
        if (
          !paras.some((p) => p.includes('Hugo Preuss') || p.includes('Constitutional Architecture'))
        ) {
          paras.push(
            `<strong>Constitutional Architecture &amp; The Preuss Compromise:</strong> Lead architect Hugo Preuss sought to dismantle imperial Prussian dominance, though conservative delegates successfully preserved traditional regional prerogatives.`,
          );
        }
      }

      // Page 4 (KT1.2 Verso Act 1): Enrich with diplomatic outrage & economic amputation
      if (lessonIndex === 1 && secNum === 1) {
        if (
          !paras.some((p) => p.includes('Brockdorff-Rantzau') || p.includes('Economic Amputation'))
        ) {
          paras.push(
            `<strong>The Diplomatic Outrage &amp; Economic Amputation:</strong> When the treaty draft was presented at Versailles on 7 May 1919, Foreign Minister Count Ulrich von Brockdorff-Rantzau fiercely declared: "We know the impact of the hate that faces us here... The demand that we alone should confess to war guilt is an outrage." Beyond territorial amputations, Germany lost 75% of its zinc and iron ore deposits in Upper Silesia and Lorraine, 26% of coal production, and 15% of agricultural output. Stripped of merchant shipping, overseas colonies, and economic resources, the infant republic was plunged into chronic fiscal instability.`,
          );
        }
        if (
          !paras.some((p) => p.includes('Dolchstoßlegende') || p.includes('November Criminals'))
        ) {
          paras.push(
            `<strong>The Stab-in-the-Back Myth (<em>Dolchstoßlegende</em>):</strong> Right-wing nationalists and imperial military commanders deliberately deflected blame for the catastrophe by claiming the army had been 'stabbed in the back' by democratic politicians on the home front. By signing the treaty under the threat of Allied invasion, Weimar's leaders were permanently branded the 'November Criminals' (*Novemberverbrecher*), saddling the regime with an intractable crisis of political legitimacy.`,
          );
        }
      }

      // Page 4 (KT1.2 Verso Act 2): Filter out Right-Wing Terrorism paragraph from Act 2 (covered in Act 3)
      if (lessonIndex === 1 && secNum === 2) {
        paras = paras.filter(
          (p) => !p.includes('Right-Wing Terrorism') && !p.includes('376 political assassinations'),
        );
      }

      // Page 5 (KT1.2 Recto Act 3): Add concise paragraphs on Judicial Bias & Rathenau
      if (lessonIndex === 1 && secNum === 3) {
        if (!paras.some((p) => p.includes('Judicial Bias') || p.includes('Organisation Consul'))) {
          paras.push(
            `<strong>Judicial Bias &amp; The Wave of Right-Wing Assassinations:</strong> Between 1919 and 1922, right-wing terrorist death squads (such as Organisation Consul) committed 376 political murders, assassinating Finance Minister Matthias Erzberger and Foreign Minister Walther Rathenau. Weimar judges demonstrated blatant political bias: right-wing murderers served an average of four months in prison, while left-wing offenders faced life imprisonment or execution, fatally compromising judicial legitimacy.`,
          );
        }
        if (
          !paras.some(
            (p) => p.includes('Rathenau Assassination') || p.includes('Republic Protection Act'),
          )
        ) {
          paras.push(
            `<strong>National Outrage &amp; Republic Protection Act:</strong> Rathenau's murder provoked mass grief, driving 700,000 citizens into Berlin's streets. Chancellor Joseph Wirth enacted the Law for the Protection of the Republic to dissolve extremist leagues, but nationalist regional courts continually undermined its enforcement.`,
          );
        }
      }

      // Page 5 (KT1.2 Recto Act 4): Filter out Munich Putsch preview and add barter economy paragraph
      if (lessonIndex === 1 && secNum === 4) {
        paras = paras.filter((p) => !p.includes('Inflation King') && !p.includes('Munich Putsch'));
        if (
          !paras.some((p) => p.includes('Barter Economy') || p.includes('Wheelbarrows of Cash'))
        ) {
          paras.push(
            `<strong>The Barter Economy &amp; Everyday Chaos:</strong> By late 1923, money lost all function: workers were paid twice daily in wheelbarrows of cash to purchase bread before prices doubled by lunchtime. Commerce reverted to crude bartering of coal, shoes, and sausages.`,
          );
        }
      }

      // Page 6 (KT1.3 Verso Act 1): Add paragraph [1.3] on Stresemann's Policy of Fulfilment & Locarno
      if (lessonIndex === 2 && secNum === 1) {
        if (
          !paras.some((p) => p.includes('Policy of Fulfilment') || p.includes('Erfüllungspolitik'))
        ) {
          paras.push(
            `<strong>Stresemann's Policy of Fulfilment (<em>Erfüllungspolitik</em>):</strong> Stresemann recognised that Germany could not overturn Versailles through military defiance. Instead, he pioneered a pragmatic foreign policy of 'fulfilment': by scrupulously honouring treaty obligations, he won the trust of Britain and the US. At the 1924 London Conference, he secured the evacuation of Franco-Belgian occupation troops from the Ruhr. By appointing Dr Hjalmar Schacht to head the Reichsbank under the 1924 Bank Act, Stresemann anchored the new Reichsmark to gold and guaranteed strict central bank independence.`,
          );
        }
        if (
          !paras.some(
            (p) =>
              p.includes('Rentenmark Miracle') || p.includes('mortgage on all German agricultural'),
          )
        ) {
          paras.push(
            `<strong>The Rentenmark Miracle &amp; Currency Stabilization:</strong> In November 1923, Stresemann appointed currency commissioner Hjalmar Schacht to introduce the Rentenmark, backed by a mortgage on all German agricultural and industrial land. By strictly limiting the money supply to 3.2 billion Rentenmarks, Schacht restored public confidence, permanently ending hyperinflation. In August 1924, the permanent Reichsmark backed by gold reserves replaced it under the Dawes Plan reforms.`,
          );
        }
        if (!paras.some((p) => p.includes('Locarno Treaties') || p.includes('League of Nations'))) {
          paras.push(
            `<strong>The Locarno Treaties (1925) &amp; League of Nations (1926):</strong> Stresemann's crowning diplomatic triumphs restored Germany as an equal Great Power. In the 1925 Locarno Treaties, Germany voluntarily accepted its western frontiers with France and Belgium, securing peace in Western Europe and winning the 1926 Nobel Peace Prize. In September 1926, Germany was formally admitted to the League of Nations as a permanent Council member, ending its post-war diplomatic isolation.`,
          );
        }
      }

      // Page 6 (KT1.3 Verso Act 2): Add paragraph [2.3] on Young Plan & US Credit Fragility
      if (lessonIndex === 2 && secNum === 2) {
        if (!paras.some((p) => p.includes('Young Plan') || p.includes('Liberty Law'))) {
          paras.push(
            `<strong>The Young Plan (1929) &amp; The 'Liberty Law' Nationalist Backlash:</strong> Chaired by American industrialist Owen D. Young, the 1929 agreement reduced total German reparations from £6.6 billion to £2 billion, lowered annual payments, and extended the timetable to 1988 while securing the complete withdrawal of Allied occupation troops from the Rhineland five years ahead of schedule. However, right-wing nationalists led by Alfred Hugenberg and Adolf Hitler fiercely denounced the plan, mobilising press networks to campaign against the 'enslavement of German grandchildren'.`,
          );
        }
        if (
          !paras.some((p) => p.includes('Dancing on a Volcano') || p.includes('American Credit'))
        ) {
          paras.push(
            `<strong>Dancing on a Volcano: The Fragility of American Loans:</strong> Beneath the surface of prosperity lay acute economic vulnerability. Germany borrowed nearly 25 billion marks from Wall Street between 1924 and 1929, largely in callable short-term loans. While cities built schools and parks, Germany ran a constant trade deficit, and agriculture remained in severe depression. Stresemann himself issued a prophetic warning in late 1928: "Germany is dancing on a volcano. If American short-term loans are called in, our entire economy will collapse."`,
          );
        }
      }

      // Page 7 (KT1.3 Recto Act 3): Add foreign policy achievements
      if (lessonIndex === 2 && secNum === 3) {
        if (!paras.some((p) => p.includes('Treaty of Berlin') || p.includes('Eastern Frontiers'))) {
          paras.push(
            `<strong>The Treaty of Berlin (1926) &amp; Eastern Foreign Policy:</strong> While securing peace in the west via Locarno, Stresemann deliberately refused to guarantee Germany's eastern borders with Poland and Czechoslovakia. To maintain diplomatic leverage against Britain and France, he signed the Treaty of Berlin in April 1926 with the Soviet Union, reaffirming mutual neutrality and covert military cooperation initiated under the 1922 Rapallo Pact.`,
          );
        }
        if (!paras.some((p) => p.includes('Kellogg-Briand') || p.includes('Outlawing War'))) {
          paras.push(
            `<strong>The Kellogg-Briand Pact (1928) &amp; Diplomatic Reintegration:</strong> In 1928, Germany was among the first nations to sign the Kellogg-Briand Pact, renouncing war as an instrument of national policy. Stresemann's diplomatic prestige secured the early withdrawal of Allied military oversight commissions, restoring German sovereignty and international respectability.`,
          );
        }
      }

      // Page 7 (KT1.3 Recto Act 4): Add structural vulnerabilities paragraph
      if (lessonIndex === 2 && secNum === 4) {
        if (
          !paras.some(
            (p) =>
              p.includes('Agricultural Depression') || p.includes('Structural Vulnerabilities'),
          )
        ) {
          paras.push(
            `<strong>Structural Flaws: Agriculture &amp; Unemployment:</strong> German agriculture entered deep depression from 1927 due to falling grain prices, fueling rural discontent. Crucially, even during the peak boom of 1928–29, unemployment never dropped below 1.3 million workers.`,
          );
        }
      }

      // Page 8 (KT1.4 Verso Act 1): Enrich paragraph [1.2] with municipal housing & welfare
      if (lessonIndex === 3 && secNum === 1) {
        if (!paras.some((p) => p.includes('Municipal Housing') || p.includes('GEHAG'))) {
          paras.push(
            `<strong>Municipal Housing &amp; Progressive Social Welfare:</strong> Between 1924 and 1931, municipal building associations such as GEHAG constructed more than two million high-quality modern homes with electric lighting and indoor plumbing, significantly reducing overcrowding and tuberculosis in working-class districts. In 1927, the Reichstag passed the landmark Unemployment Insurance Act, providing contributory benefits to over 17 million workers—the most comprehensive social safety net in Europe.`,
          );
        }
      }

      // Page 8 (KT1.4 Verso Act 2): Add patriarchal backlash against 'double-earners'
      if (lessonIndex === 3 && secNum === 2) {
        if (!paras.some((p) => p.includes('Double-Earners') || p.includes('Doppelverdiener'))) {
          paras.push(
            `<strong>The Patriarchal Backlash &amp; 'Double-Earners' (<em>Doppelverdiener</em>):</strong> Despite constitutional protections under Article 109, women encountered fierce institutional resistance. Conservative political parties, the Catholic and Lutheran churches, and the national civil service association fiercely attacked married working women as 'double-earners' (*Doppelverdiener*) who were accused of stealing jobs from demobilised war veterans. By 1932, Chancellor Heinrich Brüning passed emergency decrees enabling the dismissal of married female civil servants if their husbands were employed. Outside cosmopolitan Berlin, traditional patriarchal expectations remained deeply entrenched: the vast majority of provincial women remained full-time domestic homemakers, while abortion remained heavily criminalised under Section 218.`,
          );
        }
      }

      // Page 9 (KT1.4 Recto Act 3): Streamline Literature & Theatre paragraph to fit with Bauhaus image + Walter Gropius card
      if (lessonIndex === 3 && secNum === 3) {
        paras = paras.map((p) => {
          if (p.includes('All Quiet on the Western Front')) {
            return p
              .replace(
                /<br\s*\/?>\s*<strong>Literature and Theatre<\/strong>[\s\S]*$/i,
                '\n\n<strong>Literature &amp; Theatre:</strong> Erich Maria Remarque published <em>All Quiet on the Western Front</em> (1929), challenging militarist heroic myths, while avant-garde playwrights developed <em>Zeittheater</em> to dramatise contemporary political conflicts.',
              )
              .replace(
                /<strong>Literature and Theatre<\/strong>[\s\S]*$/i,
                '<strong>Literature &amp; Theatre:</strong> Erich Maria Remarque published <em>All Quiet on the Western Front</em> (1929), challenging militarist heroic myths, while avant-garde playwrights developed <em>Zeittheater</em> to dramatise contemporary political conflicts.',
              );
          }
          return p;
        });
      }

      return paras;
    },
  };

  return {
    coverConfig,
    componentBank: WEIMAR_COMPONENT_BANK,
    leftSources: WEIMAR_LEFT_SOURCES,
    leftVocab: WEIMAR_LEFT_VOCAB,
    backCoverData,
    paragraphEnrichments,
  };
};
