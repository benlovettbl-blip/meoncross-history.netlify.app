/**
 * weimar_spreads_kt2.cjs
 *
 * Spreads 5 to 8 for Key Topic 2: Hitler's Rise to Power, 1919–33
 * Pearson Edexcel GCSE (9–1) History Paper 3 Option 31 (1HI0/31).
 *
 * Enforces the Paper 3 4-4-4-4 Question Matrix:
 * - Spread 5 (KT 2.1): inference_causation (Section A: Q1 Inference [4m] + Q2 Explain Why [12m])
 * - Spread 6 (KT 2.2): source_utility (Section B: Q3(a) Utility of Sources B and C [8m])
 * - Spread 7 (KT 2.3): interpretation_diff_why (Section B: Q3(b) Views Diff [4m] + Q3(c) Reasons [4m])
 * - Spread 8 (KT 2.4): interpretation_eval (Section B: Q3(d) Evaluative Essay [16+4m])
 */

module.exports = [
  // =========================================================================
  // SPREAD 5: KT 2.1 — EARLY DEVELOPMENT OF THE NAZI PARTY, 1919–1922
  // Exam Format: inference_causation (Section A: Q1 [4m] + Q2 [12m])
  // =========================================================================
  {
    id: 'lesson_2_1',
    topic: 'Key Topic 2: Hitler’s Rise to Power, 1919–33',
    title: 'KT 2.1: Early Development of the Nazi Party, 1919–1922',
    footerTag: 'KT 2.1: Early Development of NSDAP, 1919–22',
    left: {
      sectionTag: 'Origins & Ideology',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'In September 1919, army intelligence veteran Adolf Hitler joined a tiny Munich nationalist group, the German Workers’ Party (DAP), led by Anton Drexler. Discovering exceptional oratorical talent, Hitler drafted the 1920 25-Point Programme, rebranded the group as the NSDAP, and founded the paramilitary SA (Brownshirts). By July 1921, Hitler ousted Drexler to establish supreme dictatorial authority over the party.',
      pillars: [
        {
          title: 'Hitler Joins the DAP & The 25-Point Programme',
          subtitle: 'The Ideological Foundation',
          bullets: [
            '**Army Surveillance to Member #555:** Assigned to investigate the DAP in Sept 1919, Hitler impressed Drexler and was recruited as head of propaganda.',
            '**The 25-Point Programme (Feb 1920):** Fused violent anti-Semitism, abolition of the Versailles Treaty, *Großdeutschland*, and populist anti-capitalism.',
            '**Party Rebranding (Aug 1920):** Renamed National Socialist German Workers’ Party (NSDAP); adopted the black swastika banner (*Hakenkreuz*) and Roman salute.',
          ],
        },
        {
          title: 'Ernst Röhm & The Formation of the SA',
          subtitle: 'The Paramilitary Brownshirts',
          bullets: [
            '**Creation of the SA (1921):** Captain Ernst Röhm organized demobilised Freikorps soldiers into a disciplined paramilitary brownshirt force (*Sturmabteilung*).',
            '**Intimidation & Protection:** The SA guarded Nazi beer-hall meetings, assaulted left-wing hecklers, and violently disrupted rival SPD and KPD assemblies.',
            '**Rapid Paramilitary Expansion:** By 1923, Röhm had expanded the SA into a 3,000-strong street army equipped with army rifles and military vehicles.',
          ],
        },
        {
          title: 'Hitler’s Takeover of the Party Leadership',
          subtitle: 'The Emergence of the Führer',
          bullets: [
            '**July 1921 Leadership Crisis:** When Drexler sought a merger, Hitler resigned and demanded absolute dictatorial executive power as condition of return.',
            '**Establishment of the Führer:** Party voted 543 to 1 to appoint Hitler absolute chairman (*Führer*), completely abolishing internal committee democracy.',
            '**Völkischer Beobachter (1920):** Acquired party newspaper using army funds secured by Röhm, broadcasting virulent anti-Weimar and anti-Semitic propaganda.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Anton Drexler',
          role: 'Munich railway mechanic who founded the German Workers’ Party (DAP) in 1919; co-authored the 25-Point Programme before being sidelined by Hitler.',
        },
        {
          name: 'Ernst Röhm',
          role: 'Bavarian army captain who founded the SA (Brownshirts), securing military weapons and recruiting ex-Freikorps fighters into the Nazi paramilitary wing.',
        },
        {
          name: 'Dietrich Eckart',
          role: 'Wealthy nationalist journalist and occultist who mentored Hitler, introducing him to Munich high society and financial backers.',
        },
        {
          name: 'Hermann Göring',
          role: 'WWI fighter ace and "Pour le Mérite" hero who joined the NSDAP in 1922; appointed by Hitler to command the SA brownshirts in 1923.',
        },
      ],
      milestones: [
        {
          date: '12 Sep 1919',
          event: 'Hitler attends DAP meeting in Munich beer hall; joins as member',
        },
        {
          date: '24 Feb 1920',
          event: 'Hitler presents 25-Point Programme at Hofbräuhaus; NSDAP named',
        },
        {
          date: 'Jul 1921',
          event: 'Hitler forces Drexler out, becoming party Führer with absolute power',
        },
        { date: 'Aug 1921', event: 'SA (Sturmabteilung) formally founded under Ernst Röhm' },
        { date: 'Dec 1920', event: 'NSDAP purchases Völkischer Beobachter as official newspaper' },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section A: Q1 Inference [4m] & Q2 Explain Why [12m]',
        title: 'Hitler’s Takeover of the DAP & The SA Paramilitary Wing',
        stem: 'Q1 (4m) Give two inferences from Source A about the methods used by the early Nazi Party in Munich • Q2 (12m) Explain why the Nazi Party expanded rapidly in Bavaria between 1920 and 1922.',
        marks: '4 + 12 = 16',
        marksTime: '16 Marks • ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q1 Formula:</strong> Inference 1 + Direct Quote from Source A; Inference 2 + Direct Quote. Zero provenance.<br/><strong>Q2 Formula (3 PEE Paragraphs):</strong> (1) Adolf Hitler’s powerful oratorical appeal and populist 25-Point Programme → (2) Ernst Röhm’s organisation of the SA brownshirts for street dominance → (3) Bavarian conservative sympathy and hatred of the Weimar Republic.',
        modelAnswer:
          '<strong>Q1 (Inference):</strong> One inference from Source A is that the early Nazi Party relied on violent physical force to dominate political meetings. The source states "brownshirt stormtroopers surrounded the beer-hall platforms, beating socialist hecklers with rubber truncheons", showing the party prioritized paramilitary violence over democratic debate. A second inference is that Adolf Hitler exercised hypnotic personal control over his audience. The source notes "the crowd was electrified by his dramatic gestures and paused in absolute silence as his voice reached a crescendo", proving Hitler was the party’s central drawing card.<br/><br/><strong>Q2 (Explain Why):</strong> One reason the Nazi Party expanded rapidly in Bavaria was Adolf Hitler’s charismatic oratorical talent. Speaking in crowded Munich beer halls, Hitler tapped into widespread public anger over the Treaty of Versailles and the "Stab in the Back" myth (*Dolchstoss*). His 25-Point Programme offered simple scapegoats—blaming Jews and Marxists for Germany’s defeat—while promising jobs, land, and national restoration. This populist message resonated deeply with disgruntled war veterans, radicalised students, and disaffected shopkeepers.<br/><br/>A second reason was the role of Ernst Röhm and the formation of the SA (*Sturmabteilung*) in 1921. Composed of demobilised Freikorps fighters, the SA gave the NSDAP an organised coercive army that protected Nazi speakers and violently broke up rival SPD and KPD meetings. Furthermore, the conservative Bavarian state government under Gustav von Kahr was fiercely anti-Weimar and turned a blind eye to right-wing paramilitary extremism, giving the Nazis a safe haven to recruit, train, and publish the *Völkischer Beobachter*.',
        examinerNote:
          'Full marks. Q1 gives two distinct inferences with supporting text. Q2 provides multi-layered causal explanation with precise terminology (25-Point Programme, Dolchstoss, Ernst Röhm, Freikorps, Gustav von Kahr, Völkischer Beobachter).',
        pitfallCategory: 'Inference & Multi-Causal Pitfalls',
        pitfall:
          'Do not confuse the SA (Brownshirts) with the SS (Blackshirts). The SS was not formed until 1925 after the Munich Putsch.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: Hitler’s Rise to Party Mastery (1919–1922)',
        steps: [
          {
            stage: '1. Spying on DAP (1919)',
            desc: 'Army corporal Hitler sent to monitor Anton Drexler’s tiny DAP; joins as member #555.',
          },
          {
            stage: '2. 25-Point Programme',
            desc: 'Hitler and Drexler fuse antisemitism, anti-Versailles, and populism; rename as NSDAP (1920).',
          },
          {
            stage: '3. SA Paramilitary Shock',
            desc: 'Ernst Röhm recruits ex-Freikorps into the SA brownshirts to violently dominate Munich streets.',
          },
          {
            stage: '4. Absolute Führer (1921)',
            desc: 'Hitler outmanoeuvres Drexler, abolishes party democracy, and establishes the Führerprinzip.',
          },
        ],
      },
      wordBank: [
        {
          term: 'DAP',
          def: 'German Workers’ Party; founded in Munich by Anton Drexler in January 1919.',
        },
        {
          term: 'NSDAP',
          def: 'National Socialist German Workers’ Party; official name adopted in August 1920.',
        },
        {
          term: '25-Point Programme',
          def: 'Core Nazi manifesto drafted in 1920 demanding Versailles revocation and anti-Semitism.',
        },
        {
          term: 'SA (Brownshirts)',
          def: 'Sturmabteilung; Nazi paramilitary street fighters organized by Ernst Röhm in 1921.',
        },
        {
          term: 'Führerprinzip',
          def: 'The Leader Principle; absolute authority of Hitler with unquestioning obedience below.',
        },
        {
          term: 'Swastika',
          def: 'Hakenkreuz; hooked cross emblem adopted by Hitler in 1920 as the Nazi racial symbol.',
        },
        {
          term: 'Beer Hall Rallies',
          def: 'Mass gathering venues in Munich (e.g. Hofbräuhaus) where Hitler perfected his oratory.',
        },
        {
          term: 'Völkischer Beobachter',
          def: 'The People’s Observer; official daily newspaper of the NSDAP purchased in 1920.',
        },
        {
          term: 'Anti-Semitism',
          def: 'Hostility, prejudice, or discrimination against Jewish people, central to Nazi ideology.',
        },
        {
          term: 'Großdeutschland',
          def: 'Pan-German dream of uniting all German-speaking peoples into a single Greater Reich.',
        },
        {
          term: 'Lebensraum',
          def: 'Living space; concept of imperial expansion in Eastern Europe to support Aryans.',
        },
        {
          term: 'Anton Drexler',
          def: 'Founder of the DAP who recognized Hitler’s speaking talent before being ousted in 1921.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 6: KT 2.2 — THE MUNICH PUTSCH AND THE LEAN YEARS, 1923–1929
  // Exam Format: source_utility (Section B: Q3(a) [8m])
  // =========================================================================
  {
    id: 'lesson_2_2',
    topic: 'Key Topic 2: Hitler’s Rise to Power, 1919–33',
    title: 'KT 2.2: The Munich Putsch and the Lean Years, 1923–1929',
    footerTag: 'KT 2.2: Munich Putsch & Lean Years, 1923–29',
    left: {
      sectionTag: 'Putsch to Strategy',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'In November 1923, seeking to exploit the hyperinflation crisis, Hitler launched an armed coup in Munich to overthrow the Weimar government. Crushed by Bavarian state police, the putsch proved a tactical disaster but a strategic propaganda triumph. Sentenced to Landsberg Prison, Hitler authored *Mein Kampf* and adopted the "legal path" to power, reorganizing the NSDAP into a nationwide electoral machine.',
      pillars: [
        {
          title: 'The Munich (Beer Hall) Putsch (Nov 1923)',
          subtitle: 'The Failed Armed Insurrection',
          bullets: [
            '**Seizure of Bürgerbräukeller (8 Nov):** Hitler and 600 SA men held Bavarian leaders Kahr, Lossow, and Seisser at gunpoint to back a march on Berlin.',
            '**Feldherrnhalle Shootout (9 Nov):** Bavarian police opened fire on 2,000 marching Nazis; 16 Nazis and 4 police died; Hitler fled and was arrested.',
            '**Ludendorff’s Role:** War hero Erich Ludendorff marched alongside Hitler, lending military prestige to the ill-fated insurrection.',
          ],
        },
        {
          title: 'Hitler’s Trial, Landsberg & Mein Kampf',
          subtitle: 'Propaganda Triumph from Defeat',
          bullets: [
            '**Courtroom Platform (Feb 1924):** Sympathetic judges allowed Hitler to transform his high treason trial into a national stage denouncing Weimar.',
            '**Lenient Sentencing:** Sentenced to minimum 5 years in Landsberg Fortress; served only 9 months in comfortable confinement with private visitors.',
            '**Mein Kampf Dictated:** Authored his ideological blueprint: Aryan racial supremacy, anti-Semitism, *Lebensraum* in the East, and destruction of democracy.',
          ],
        },
        {
          title: 'Reorganisation & The Lean Years (1924–28)',
          subtitle: 'The Shift to Electoral Legality',
          bullets: [
            '**The Legal Path (*Legalitätstaktik*):** Hitler abandoned armed coups, resolving to destroy Weimar democracy from within using parliamentary elections.',
            '**Bamberg Conference (1926):** Defeated Strasser’s socialist wing; reasserted absolute *Führerprinzip* and oriented party toward industrialists.',
            '**National Party Machine:** Divided Germany into 35 *Gaue* run by *Gauleiters*; founded the SS (1925) and Hitler Youth; won only 2.6% in 1928.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'General Erich Ludendorff',
          role: 'Imperial WWI hero who marched with Hitler at the Feldherrnhalle; acquitted at the 1924 treason trial due to immense military prestige.',
        },
        {
          name: 'Gustav von Kahr',
          role: 'Bavarian state commissioner forced at gunpoint in the Bürgerbräukeller; reneged and ordered police to crush the putsch; murdered in 1934.',
        },
        {
          name: 'Gregor Strasser',
          role: 'Leader of the northern socialist-leaning Nazi wing; challenged Hitler’s capitalist focus before being defeated at Bamberg (1926); killed in 1934.',
        },
        {
          name: 'Rudolf Hess',
          role: 'Hitler’s devoted personal secretary in Landsberg Prison who transcribed *Mein Kampf*; later appointed Deputy Führer of the NSDAP.',
        },
      ],
      milestones: [
        {
          date: '8 Nov 1923',
          event: 'Hitler storms Bürgerbräukeller, seizing Bavarian leaders at gunpoint',
        },
        {
          date: '9 Nov 1923',
          event: 'Putsch crushed at Munich Feldherrnhalle; 16 Nazis, 4 police killed',
        },
        {
          date: 'Feb 1924',
          event: 'Hitler’s treason trial begins in Munich; turns trial into media triumph',
        },
        {
          date: 'Feb 1926',
          event: 'Bamberg Conference; Hitler asserts Führerprinzip over Strasser wing',
        },
        { date: 'May 1928', event: 'Reichstag elections; Nazis win only 2.6% of vote (12 seats)' },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(a) Source Utility [8m]',
        title: 'The Significance of the Munich Putsch and Hitler’s Trial',
        stem: 'Q3(a) Study Sources B and C. How useful are Sources B and C for an enquiry into the consequences of the Munich Putsch (1923) for Adolf Hitler and the Nazi Party? Explain your answer, using Sources B and C and your knowledge of the historical context. (8 marks)',
        marks: '8',
        marksTime: '8 Marks • ~14 Mins Total',
        planningGuideTitle: 'Examiner Planning & C-O-P Framework:',
        planningGuide:
          '<strong>Structure:</strong> (1) Evaluate Source B (Content + Context + Provenance NOP) → (2) Evaluate Source C (Content + Context + Provenance NOP) → (3) Comparative synthesis judging utility.<br/><strong>Core Rule:</strong> Focus strictly on consequences: Hitler’s national fame, the lesson of legality, and party reorganisation.',
        modelAnswer:
          'Source B is useful for demonstrating how Hitler transformed military defeat into a national propaganda triumph. The source, an extract from a Munich newspaper report covering Hitler’s treason trial in March 1924, records Hitler proclaiming that "the army we have formed is growing from day to day... I consider myself solely responsible, but I am no criminal". This content is historically accurate: sympathetic nationalist judges allowed Hitler unlimited speaking time, which was widely reported across Germany, transforming him from an obscure Bavarian agitator into a national martyr for the right-wing cause. The provenance enhances its utility because a contemporary courtroom dispatch captures the electric public atmosphere and judicial indulgence that resulted in a nominal 5-year sentence with early parole.<br/><br/>Source C is equally useful for examining the long-term strategic consequences for the Nazi Party. Writing in *Mein Kampf* in 1925, Hitler reflects that "instead of working through armed insurrection, we must hold our noses and enter the Reichstag... democracy must be beaten with its own weapons". This matches historical context: after the failure of the Feldherrnhalle march, Hitler realized that armed coups against the Reichswehr were futile and initiated the "legal path" (*Legalitätstaktik*). The provenance is highly valuable: as Hitler’s personal manifesto written in Landsberg, it explicitly articulates his strategic realignment toward winning power through parliamentary elections. Together, Sources B and C provide complementary insights: Source B explains how the trial created Hitler’s national public profile, while Source C explains the fundamental tactical pivot toward electoral politics.',
        examinerNote:
          'Full 8/8 marks. Forensic evaluation of Content, Context, and Provenance for both sources, synthesizing how together they explain both the immediate publicity and long-term strategic reorientation.',
        pitfallCategory: 'Utility & Provenance Pitfalls',
        pitfall:
          'Do not write that *Mein Kampf* is biased and untrustworthy. It is exceptionally useful as direct evidence of Hitler’s personal strategic thinking in 1925.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: From Armed Putsch to Electoral Machine',
        steps: [
          {
            stage: '1. Putsch Disaster (1923)',
            desc: 'Feldherrnhalle shootout kills 16 Nazis; proves armed coups against the state are futile.',
          },
          {
            stage: '2. Trial Propaganda (1924)',
            desc: 'Hitler uses high treason trial to capture national headlines; serves 9 months in Landsberg.',
          },
          {
            stage: '3. Mein Kampf & Legality',
            desc: 'Hitler drafts manifesto and commits to the "legal path" (*Legalitätstaktik*) to subvert democracy.',
          },
          {
            stage: '4. National Machine (1926)',
            desc: 'Bamberg Conference unites party under Führerprinzip; creates 35 Gaue, SS, and Hitler Youth.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Munich Putsch',
          def: 'Failed Nazi armed insurrection in Munich on 8–9 November 1923.',
        },
        {
          term: 'Bürgerbräukeller',
          def: 'Munich beer hall where Hitler launched the coup by seizing Bavarian leaders.',
        },
        {
          term: 'Feldherrnhalle',
          def: 'Monument in Munich where state police opened fire, crushing the Nazi march.',
        },
        {
          term: 'Mein Kampf',
          def: 'My Struggle; Hitler’s autobiographical manifesto written in Landsberg Prison.',
        },
        {
          term: 'Landsberg Prison',
          def: 'Comfortable Bavarian fortress where Hitler served 9 months for treason.',
        },
        {
          term: 'Legal Path',
          def: 'Legalitätstaktik; strategy of gaining power through democratic elections.',
        },
        {
          term: 'Bamberg Conference',
          def: '1926 party conference where Hitler defeated the northern socialist wing.',
        },
        {
          term: 'Gauleiter',
          def: 'Regional party leader appointed by Hitler to manage one of 35 Nazi Gaue.',
        },
        {
          term: 'SS (Schutzstaffel)',
          def: 'Elite black-uniformed personal protection squad founded in 1925 under Himmler.',
        },
        {
          term: 'Hitler Youth',
          def: 'Hitlerjugend; youth auxiliary organization of the Nazi Party founded in 1926.',
        },
        {
          term: 'Lean Years',
          def: 'Period from 1924 to 1928 when Nazi electoral support remained marginal (under 3%).',
        },
        {
          term: 'Erich Ludendorff',
          def: 'WWI General Quartermaster who marched with Hitler; acquitted at trial.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 7: KT 2.3 — THE GROWTH OF NAZI SUPPORT, 1929–1932
  // Exam Format: interpretation_diff_why (Section B: Q3(b) [4m] + Q3(c) [4m])
  // =========================================================================
  {
    id: 'lesson_2_3',
    topic: 'Key Topic 2: Hitler’s Rise to Power, 1919–33',
    title: 'KT 2.3: The Growth of Nazi Support, 1929–1932',
    footerTag: 'KT 2.3: Growth of Nazi Support, 1929–32',
    left: {
      sectionTag: 'Depression & Breakthrough',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'The October 1929 Wall Street Crash plunged Germany into catastrophic economic depression. As American banks recalled loans, industrial output halved and unemployment soared to over 6 million. Chancellor Heinrich Brüning’s austerity measures paralyzed the Reichstag, while fears of a Communist revolution pushed the middle class and big business toward the Nazis. Under Joseph Goebbels’ propaganda blitz, the NSDAP became the largest party in the Reichstag.',
      pillars: [
        {
          title: 'The Great Depression & Banking Collapse',
          subtitle: 'The Catalyst of Despair',
          bullets: [
            '**Wall Street Crash (Oct 1929):** US banks recalled short-term Dawes loans, triggering widespread bankruptcies and the collapse of Danatbank.',
            '**Mass Unemployment:** Surged from 1.3 million in 1929 to 6.1 million by Jan 1932 (over 33% of workforce), leaving millions in soup-kitchen destitution.',
            '**Brüning’s Deflationary Austerity:** Cut wages and unemployment benefits while raising taxes, earning the reviled title "The Hunger Chancellor".',
          ],
        },
        {
          title: 'The Fear of Communism & Middle-Class Panic',
          subtitle: 'The Mittelstand Reaction',
          bullets: [
            '**Communist Surge:** KPD vote rose to 100 seats (16.9%) in Nov 1932; armed Red Front brawled daily with Nazi SA on city streets.',
            '**Mittelstand Ruin:** Small shopkeepers, artisans, and farmers ruined by bankruptcies looked to the Nazis to protect private property from Bolshevism.',
            '**Big Business Financing:** Tycoons like Fritz Thyssen and Emil Kirdorf funded Nazi election campaigns to crush trade unions and Marxism.',
          ],
        },
        {
          title: 'Goebbels & Modern Propaganda Techniques',
          subtitle: 'The Electoral Landslide',
          bullets: [
            '**Multimedia Innovation:** Goebbels deployed gramophone records, targeted pamphlets, film vans, and Hitler’s aeroplane tour ("Hitler over Germany").',
            '**Universal Emotional Appeal:** Promised "Work and Bread" to workers, price subsidies to farmers, and national rearmament to war veterans.',
            '**Electoral Surge:** Seats leaped from 12 in 1928 to 107 in Sept 1930, and peaked at 230 seats (37.3% vote) in July 1932, becoming Germany’s largest party.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Heinrich Brüning',
          role: 'Centre Party Chancellor (1930–32); ruled by Article 48 emergency decrees; his deflationary austerity exacerbated the Depression.',
        },
        {
          name: 'Joseph Goebbels',
          role: 'Appointed Head of Propaganda in 1930; pioneered multimedia campaigning, emotional slogans, and Hitler’s nationwide aeroplane tours.',
        },
        {
          name: 'Ernst Thälmann',
          role: 'Leader of the German Communist Party (KPD); commanded the paramilitary Red Front, securing 100 Reichstag seats in November 1932.',
        },
        {
          name: 'Fritz Thyssen',
          role: 'Steel magnate who joined the Nazi Party in 1931, providing vital financial subsidies and introducing Hitler to German industrial tycoons.',
        },
      ],
      milestones: [
        {
          date: '29 Oct 1929',
          event: 'Wall Street Crash; US banks recall loans, sparking German banking panic',
        },
        {
          date: 'Mar 1930',
          event: 'Müller’s Grand Coalition collapses; Brüning appointed Chancellor',
        },
        {
          date: 'Sep 1930',
          event: 'Reichstag elections; Nazis surge from 12 to 107 seats (6.4M votes)',
        },
        { date: 'Jan 1932', event: 'German unemployment peaks at 6.1 million registered jobless' },
        {
          date: 'Jul 1932',
          event: 'Nazis win 230 seats (37.3%), becoming largest party in Reichstag',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(b) & Q3(c) Historians’ Views [8m]',
        title: 'Reasons for the Rapid Growth of Nazi Support (1929–1932)',
        stem: 'Q3(b) Study Interpretations 1 and 2. What is the main difference between these views on the reasons for the growth of Nazi support in 1929–32? (4 marks) • Q3(c) Suggest one reason why Interpretations 1 and 2 give different views. (4 marks)',
        marks: '4 + 4 = 8',
        marksTime: '8 Marks • ~12 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q3(b) Formula:</strong> State core difference in line 1 → Quote/detail Interpretation 1 → Quote/detail Interpretation 2.<br/><strong>Q3(c) Formula:</strong> Explain difference by showing historians chose different evidence/focus (e.g. economic misery & fear of communism vs Hitler’s charisma & Goebbels’ propaganda).',
        modelAnswer:
          '<strong>Q3(b) Difference in Views:</strong> The main difference is that Interpretation 1 attributes the Nazi surge primarily to the catastrophic economic impact of the Great Depression and the fear of Communism, whereas Interpretation 2 argues that the growth was driven by Hitler’s personal charismatic appeal and the modern propaganda machine developed by Joseph Goebbels. Interpretation 1 emphasizes that "without the six million unemployed and the terrified middle class dreading a Bolshevik revolution, the Nazis would have remained a lunatic fringe". In contrast, Interpretation 2 contends that "it was Hitler’s dynamic image as a national saviour and the unprecedented sophistication of Nazi propaganda that converted economic despair into electoral triumph".<br/><br/><strong>Q3(c) Reasons for Difference:</strong> Interpretations 1 and 2 differ because the historians have investigated different historical evidence. The author of Interpretation 1 focuses on macroeconomic and electoral data—specifically the direct statistical correlation between rising unemployment graphs (which climbed from 1.3 million to over 6 million between 1929 and 1932) and the simultaneous surge in Communist and Nazi votes. Conversely, the author of Interpretation 2 focuses on cultural and political campaign methods, examining Goebbels’ pioneering use of aeroplanes ("Hitler over Germany"), mass rallies, loudspeaker trucks, and targeted emotional messaging tailored to specific demographic groups.',
        examinerNote:
          'Full 8/8 marks. Q3(b) identifies a clear, sustained point of contrast with verbatim evidence. Q3(c) explains WHY they differ by linking each perspective to distinct types of historical evidence.',
        pitfallCategory: 'Interpretation Difference & Origin Pitfalls',
        pitfall:
          'Never explain differences by claiming one author was biased. High-scoring answers demonstrate how focusing on different causal factors produces differing historical interpretations.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: From Wall Street Crash to 230 Seats',
        steps: [
          {
            stage: '1. Wall Street Crash',
            desc: 'Oct 1929 crash causes US banks to recall Dawes loans; German banking system collapses.',
          },
          {
            stage: '2. Mass Unemployment',
            desc: '6.1 million workers unemployed; Brüning cuts wages and benefits, deepening despair.',
          },
          {
            stage: '3. Red Fear & Mittelstand',
            desc: 'KPD vote surges; terrified middle class and industrialists turn to Nazis for protection.',
          },
          {
            stage: '4. July 1932 Landslide',
            desc: 'Goebbels’ propaganda blitz propels NSDAP to 230 Reichstag seats (37.3% vote).',
          },
        ],
      },
      wordBank: [
        {
          term: 'Wall Street Crash',
          def: 'October 1929 collapse of the US stock market triggering global economic depression.',
        },
        {
          term: 'Great Depression',
          def: 'Worldwide economic slump (1929–39) that devastated German industry and banking.',
        },
        {
          term: 'Unemployment',
          def: 'Peaked at 6.1 million in Germany in Jan 1932, leaving 1 in 3 workers jobless.',
        },
        {
          term: 'Hunger Chancellor',
          def: 'Contemptuous nickname for Brüning due to his harsh deflationary austerity cuts.',
        },
        {
          term: 'KPD',
          def: 'German Communist Party led by Ernst Thälmann; surged to 100 Reichstag seats in 1932.',
        },
        {
          term: 'Red Front Fighters',
          def: 'Rotfrontkämpferbund; KPD paramilitary organisation brawling with the Nazi SA.',
        },
        {
          term: 'Hitler over Germany',
          def: '1932 campaign tour flying Hitler by aeroplane to address rallies across 20 cities.',
        },
        {
          term: 'Work and Bread',
          def: 'Arbeit und Brot; core Nazi campaign slogan appealing to unemployed workers.',
        },
        {
          term: 'Negative Majority',
          def: 'Situation in 1932 where anti-democratic KPD and NSDAP held over 50% of seats.',
        },
        {
          term: 'July 1932 Election',
          event: 'Nazis win 230 seats, becoming the largest party in German parliamentary history.',
        },
        {
          term: 'Fritz Thyssen',
          def: 'Industrialist tycoon who bankrolled Hitler’s campaigns to stop communist nationalisation.',
        },
        {
          term: 'Grand Coalition',
          def: 'Weimar government of SPD, Centre, and liberals that collapsed in March 1930.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 8: KT 2.4 — HOW HITLER BECAME CHANCELLOR, 1932–1933
  // Exam Format: interpretation_eval (Section B: Q3(d) [16+4m])
  // =========================================================================
  {
    id: 'lesson_2_4',
    topic: 'Key Topic 2: Hitler’s Rise to Power, 1919–33',
    title: 'KT 2.4: How Hitler Became Chancellor, 1932–1933',
    footerTag: 'KT 2.4: How Hitler Became Chancellor, 1932–33',
    left: {
      sectionTag: 'Intrigue & Appointment',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Between April 1932 and January 1933, parliamentary democracy completely collapsed in Germany. Following Brüning’s fall, Chancellors Franz von Papen and Kurt von Schleicher failed to construct governing majorities. Despite Nazi electoral losses in November 1932, Papen forged a cynical backroom conspiracy with President Hindenburg, falsely believing they could "box Hitler in" as Chancellor while conservative aristocrats retained true executive control.',
      pillars: [
        {
          title: 'The 1932 Presidential Elections & Brüning’s Fall',
          subtitle: 'The Democratic Impasse',
          bullets: [
            '**Presidential Runoff (April 1932):** Hindenburg won re-election with 19.3 million votes (53%), but Hitler captured a formidable 13.4 million (36.8%).',
            '**Fall of Brüning (May 1932):** Aristocratic Junkers convinced Hindenburg that Brüning’s plan to break up bankrupt Prussian estates was "Agrarian Bolshevism".',
            '**Papen’s "Cabinet of Barons":** Hindenburg appointed Franz von Papen Chancellor; ruled entirely by decree with virtually zero parliamentary support.',
          ],
        },
        {
          title: 'The July & November 1932 Elections',
          subtitle: 'Nazi Peak and Crisis',
          bullets: [
            '**July 1932 Triumph:** Nazis won 230 seats; combined with KPD (89 seats), anti-democratic parties held a paralyzing negative majority (52%).',
            '**November 1932 Slump:** Papen dissolved the Reichstag; Nazis lost 34 seats and 2 million votes (down to 196), leaving party funds drained.',
            '**Schleicher’s Failed Intrigue:** General Kurt von Schleicher replaced Papen as Chancellor, attempting to split the NSDAP via Gregor Strasser.',
          ],
        },
        {
          title: 'The Backroom Deal of January 1933',
          subtitle: 'Hitler Appointed Chancellor',
          bullets: [
            '**Cologne Villa Pact (Jan 1933):** Seeking revenge on Schleicher, Papen met Hitler secretly at banker Kurt von Schröder’s villa to forge a coalition.',
            '**"Boxing Hitler In":** Papen persuaded Hindenburg that Hitler could be controlled: Hitler as Chancellor, Papen as Vice-Chancellor, and only 3 Nazi ministers.',
            '**Appointment (30 Jan 1933):** Hindenburg appointed Hitler Chancellor; Papen boasted: "Within two months, we will have pushed Hitler into a corner".',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Paul von Hindenburg',
          role: '84-year-old Weimar President; monarchist Field Marshal who despised Hitler as a "Bohemian corporal" but was manipulated into appointing him.',
        },
        {
          name: 'Franz von Papen',
          role: 'Aristocratic politician and Chancellor (1932); architect of the backroom intrigue who mistakenly believed he could "tame" Hitler.',
        },
        {
          name: 'Kurt von Schleicher',
          role: 'Army General and last Weimar Chancellor (Dec 1932–Jan 1933); his attempt to divide the Nazi Party failed; murdered in the 1934 purge.',
        },
        {
          name: 'Oskar von Hindenburg',
          role: 'Son and state secretary to President Hindenburg; lobbied by Papen and industrialists to convince his father to appoint Hitler Chancellor.',
        },
      ],
      milestones: [
        {
          date: 'Apr 1932',
          event: 'Hindenburg re-elected President (19.3M) defeating Hitler (13.4M)',
        },
        { date: 'May 1932', event: 'Brüning dismissed; Franz von Papen forms "Cabinet of Barons"' },
        {
          date: 'Jul 1932',
          event: 'Nazis peak at 230 Reichstag seats (37.3%), paralyzing parliament',
        },
        {
          date: 'Nov 1932',
          event: 'Nazis drop to 196 seats; party faces near-bankruptcy and fatigue',
        },
        { date: '30 Jan 1933', event: 'Hindenburg appoints Adolf Hitler Chancellor of Germany' },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(d) Evaluative Essay [16+4m]',
        title: 'Popular Support vs. Backroom Intrigue in Hitler’s Appointment',
        stem: 'Q3(d) How far do you agree with Interpretation 1 that Adolf Hitler became Chancellor in January 1933 primarily because of backroom political intrigue by conservative elites rather than the mass popularity of the Nazi Party? (16+4 marks)',
        marks: '16 + 4 SPaG = 20',
        marksTime: '20 Marks • ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Band 4 Rubric:',
        planningGuide:
          '<strong>Structure:</strong> (1) Introduction establishing criteria (electoral mandate vs constitutional mechanism) → (2) Arguments supporting Interpretation 1 (Papen’s conspiracy, Hindenburg’s camarilla & Nov 1932 decline) → (3) Arguments supporting Interpretation 2 (mass electoral base, 13M votes & SA street dominance) → (4) Sustained evaluative verdict.',
        modelAnswer:
          'I largely agree with Interpretation 1 that political intrigue by conservative elites was the immediate, decisive catalyst that delivered the Chancellorship to Adolf Hitler in January 1933. However, Interpretation 1 is incomplete without acknowledging Interpretation 2: elite conspirators would never have considered negotiating with Hitler were it not for the massive popular vote and street power the Nazi Party had amassed during the Great Depression.<br/><br/>Interpretation 1 is historically convincing because Hitler did not seize power through an armed coup or a parliamentary majority. In the November 1932 elections, the Nazi vote fell by 2 million, and the party lost 34 seats (dropping to 196), suffering near-bankruptcy and internal division. Parliamentary democracy had already ceased functioning in 1930: Chancellors Brüning, Papen, and Schleicher ruled by Article 48 presidential decrees. The appointment of Hitler on 30 January 1933 was engineered entirely behind closed doors by an aristocratic camarilla comprising Franz von Papen, Otto Meissner, and Oskar von Hindenburg. Eager to avenge his dismissal by Schleicher, Papen persuaded the senile 84-year-old President Hindenburg that Hitler could be "boxed in" (*eingerahmt*). The plan limited the Nazis to just three of twelve cabinet seats (Hitler as Chancellor, Wilhelm Frick in the Interior, and Hermann Göring as Minister without Portfolio), leading Papen to boast that "in two months we will have pushed Hitler into a corner until he squeaks". Hitler was invited into government not because of an electoral triumph, but because conservative aristocrats sought to use his mass movement as a puppet to destroy the Weimar Republic and socialist trade unions.<br/><br/>Nevertheless, Interpretation 2 provides the essential precondition: backroom intrigue only functioned because of the Nazi Party’s immense mass popularity. Hitler had captured 13.4 million votes (36.8%) in the April 1932 presidential election and 230 seats (37.3%) in July 1932, making the NSDAP by far the largest party in the Reichstag. Furthermore, Ernst Röhm commanded 400,000 armed SA brownshirts who dominated urban streets. General von Schleicher informed Hindenburg that the regular army (*Reichswehr*) was too small to fight both a Communist general strike and an SA rebellion simultaneously. Therefore, the conservative elites turned to Hitler out of desperation, realizing that no stable right-wing authoritarian government could survive without the mass popular backing that only Hitler possessed.<br/><br/>In conclusion, while Nazi mass popularity created the indispensable structural crisis that paralyzed Weimar governance, it was the selfish, reckless miscalculation of Franz von Papen and the conservative camarilla that handed Hitler the keys to the state. Hitler did not take power; he was handed power by men who believed they could control a totalitarian movement.',
        examinerNote:
          'Band 4 (16/16 marks + 4 SPaG). Sophisticated criteria-driven evaluation demonstrating how elite intrigue acted as the proximate cause while mass popularity provided the structural foundation.',
        pitfallCategory: 'Evaluative Essay Pitfalls',
        pitfall:
          'Do not claim Hitler was elected Chancellor. The German public never voted Hitler into the Chancellorship; he was appointed by President Hindenburg.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Elite Conspiracy of January 1933',
        steps: [
          {
            stage: '1. Paralyzed Reichstag (1932)',
            desc: 'Nazis and Communists hold 52% negative majority; Papen and Schleicher fail to govern.',
          },
          {
            stage: '2. Nazi Dip (Nov 1932)',
            desc: 'Nazis lose 34 seats; party faces bankruptcy; proves Hitler cannot win an absolute majority.',
          },
          {
            stage: '3. Papen’s Revenge Deal',
            desc: 'Papen meets Hitler at Cologne villa; plots coalition to oust rival Chancellor Schleicher.',
          },
          {
            stage: '4. The Trap Sprung (30 Jan)',
            desc: 'Hindenburg appoints Hitler Chancellor, falsely believing Papen has "boxed him in".',
          },
        ],
      },
      wordBank: [
        {
          term: 'Camarilla',
          def: 'The small clique of aristocratic advisers surrounding President Hindenburg.',
        },
        {
          term: 'Cabinet of Barons',
          def: 'Papen’s unpopular right-wing 1932 government composed of wealthy aristocrats.',
        },
        {
          term: 'Boxed In',
          def: 'Eingerahmt; Papen’s flawed belief that a conservative majority in cabinet could tame Hitler.',
        },
        {
          term: 'Franz von Papen',
          def: 'Conservative politician who orchestrated the secret pact making Hitler Chancellor.',
        },
        {
          term: 'Kurt von Schleicher',
          def: 'Army General and last Weimar Chancellor who failed to split the Nazi Party.',
        },
        {
          term: 'November 1932 Election',
          def: 'Election where Nazis lost 2 million votes and 34 seats, suffering severe fatigue.',
        },
        {
          term: 'Paul von Hindenburg',
          def: 'President who despised Hitler but was persuaded to sign his appointment.',
        },
        {
          term: 'Article 48',
          def: 'Emergency decree power that replaced parliamentary lawmaking between 1930 and 1933.',
        },
        {
          term: 'Cologne Villa Meeting',
          def: 'Secret January 1933 meeting between Papen and Hitler at banker Schröder’s home.',
        },
        {
          term: 'Wilhelm Frick',
          def: 'One of only two Nazi ministers in the Jan 1933 cabinet, appointed Minister of Interior.',
        },
        {
          term: 'Hermann Göring',
          def: 'Appointed Minister without Portfolio and head of the Prussian police in Jan 1933.',
        },
        {
          term: '30 January 1933',
          def: 'Date Adolf Hitler was officially sworn in as Chancellor of the German Republic.',
        },
      ],
    },
  },
];
