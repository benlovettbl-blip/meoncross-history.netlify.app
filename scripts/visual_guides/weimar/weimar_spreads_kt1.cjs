/**
 * weimar_spreads_kt1.cjs
 *
 * Spreads 1 to 4 for Key Topic 1: The Weimar Republic, 1918–29
 * Pearson Edexcel GCSE (9–1) History Paper 3 Option 31 (1HI0/31).
 *
 * Enforces the Paper 3 4-4-4-4 Question Matrix:
 * - Spread 1 (KT 1.1): inference_causation (Section A: Q1 Inference [4m] + Q2 Explain Why [12m])
 * - Spread 2 (KT 1.2): source_utility (Section B: Q3(a) Utility of Sources B and C [8m])
 * - Spread 3 (KT 1.3): interpretation_diff_why (Section B: Q3(b) Views Diff [4m] + Q3(c) Reasons [4m])
 * - Spread 4 (KT 1.4): interpretation_eval (Section B: Q3(d) Evaluative Essay [16+4m])
 */

module.exports = [
  // =========================================================================
  // SPREAD 1: KT 1.1 — THE ORIGINS OF THE REPUBLIC, 1918–1919
  // Exam Format: inference_causation (Section A: Q1 [4m] + Q2 [12m])
  // =========================================================================
  {
    id: 'lesson_1_1',
    topic: 'Key Topic 1: The Weimar Republic, 1918–29',
    title: 'KT 1.1: The Origins of the Republic, 1918–1919',
    footerTag: 'KT 1.1: Origins of the Republic, 1918–19',
    left: {
      sectionTag: 'Origins & Constitution',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'In November 1918, facing imminent military collapse on the Western Front, economic exhaustion from the Allied naval blockade, and widespread mutinies across major naval ports, Imperial Germany collapsed. Following the abdication of Kaiser Wilhelm II, moderate socialist Friedrich Ebert established a parliamentary republic. However, the nascent democracy was instantly compromised by the military’s "stab in the back" myth and structural constitutional vulnerabilities.',
      pillars: [
        {
          title: 'The Legacy of WWI & Military Collapse',
          subtitle: 'A Broken Empire',
          bullets: [
            '**Catastrophic Human & Financial Cost:** 2 million soldiers dead, 4.2 million wounded, and national debt tripling to 150 billion marks created severe social trauma.',
            '**Home Front Starvation:** The Allied naval blockade caused over 750,000 civilian deaths from malnutrition, culminating in the "Turnip Winter" of 1916–17.',
            '**Military Deception:** Generals Hindenburg and Ludendorff insisted on an armistice but shifted blame to civilian politicians to preserve army honour.',
          ],
        },
        {
          title: 'Revolution from Below & Abdication',
          subtitle: 'Kiel Mutiny to Republic',
          bullets: [
            '**Kiel Mutiny (Oct 1918):** Sailors ordered on a suicidal charge mutinied, sparking revolutionary Workers’ and Soldiers’ Councils across Germany.',
            '**General Strike in Berlin (9 Nov):** With the capital paralysed, Chancellor Max von Baden announced Kaiser Wilhelm II’s abdication without his consent.',
            '**Proclamation of Democracy:** SPD deputy Philipp Scheidemann declared the Republic to forestall Karl Liebknecht’s rival communist revolution.',
          ],
        },
        {
          title: 'The Weimar Constitution of 1919',
          subtitle: 'Progressive yet Fragile',
          bullets: [
            '**Democratic Breakthrough:** Universal suffrage at age 20, a comprehensive bill of fundamental rights, and an elected President and Reichstag.',
            '**Proportional Representation (PR):** Resulted in coalition instability (20 cabinets in 14 years), giving radical anti-democratic splinter groups a platform.',
            '**Article 48 Emergency Powers:** Granted the President dictatorial decree powers without parliamentary consent, creating a fatal authoritarian loophole.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Friedrich Ebert',
          role: 'SPD leader and first Weimar President (1919–25); stabilized the republic via the Ebert-Groener Pact and crushed communist uprisings.',
        },
        {
          name: 'Philipp Scheidemann',
          role: 'SPD leader who spontaneously proclaimed the German Republic from a Reichstag window on 9 November 1918; first Weimar Chancellor.',
        },
        {
          name: 'Hugo Preuss',
          role: 'Left-liberal lawyer who drafted the Weimar Constitution, designing a model democratic system compromised by Article 48 and PR.',
        },
        {
          name: 'General Wilhelm Groener',
          role: 'First Quartermaster General who pledged army loyalty to Ebert’s government in exchange for state autonomy and suppressing bolshevism.',
        },
      ],
      milestones: [
        { date: '28 Oct 1918', event: 'Kiel naval mutiny sparks nationwide revolution' },
        { date: '9 Nov 1918', event: 'Kaiser Wilhelm II abdicates; German Republic proclaimed' },
        { date: '11 Nov 1918', event: 'Matthias Erzberger signs Armistice ending WWI' },
        { date: '19 Jan 1919', event: 'Elections to Weimar National Assembly (76% moderate vote)' },
        { date: '11 Aug 1919', event: 'Weimar Constitution signed into law by President Ebert' },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section A: Q1 Inference [4m] & Q2 Explain Why [12m]',
        title: 'The Collapse of Imperial Germany & The Weimar Constitution',
        stem: 'Q1 (4m) Give two inferences from Source A about the German Revolution of 1918 • Q2 (12m) Explain why the Weimar Republic experienced severe political instability in 1919–20.',
        marks: '4 + 12 = 16',
        marksTime: '16 Marks • ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q1 Formula:</strong> Inference 1 + Direct Quote from Source A; Inference 2 + Direct Quote. Zero provenance.<br/><strong>Q2 Formula (3 PEE Paragraphs):</strong> (1) Resentment over the Treaty of Versailles & "Stab in the Back" myth → (2) Armed revolts from left (Spartacists) and right (Kapp Putsch) → (3) Structural flaws in the Constitution (Proportional Representation & Article 48).',
        modelAnswer:
          '<strong>Q1 (Inference):</strong> One inference from Source A is that the German Revolution was driven by war weariness and military insubordination. The source states "sailors at Kiel refused to obey suicidal battle orders and raised the red flag", showing discipline had completely broken down. A second inference is that civilian authorities lost control of Berlin. The source notes "mass strikes brought all municipal services to a standstill while soldiers refused to fire on demonstrators", proving imperial authority had evaporated.<br/><br/><strong>Q2 (Explain Why):</strong> One reason for political instability in 1919–20 was the widespread fury over the Treaty of Versailles and the "Stab in the Back" myth (*Dolchstosslegende*). Right-wing nationalists, demobilised soldiers, and military commanders blamed the newly formed civilian government for signing the Armistice and accepting Article 231 ("War Guilt"). Moderate ministers were branded the "November Criminals". This destroyed conservative legitimacy in the Republic from its inception.<br/><br/>A second reason was the armed violence from extremist political factions on both the left and right. In January 1919, the Communist Spartacist League attempted an armed coup in Berlin, forcing the government to deploy the Freikorps. This reliance on right-wing paramilitaries backfired in March 1920 when the Freikorps itself marched on Berlin in the Kapp Putsch, demonstrating that the regular army under General von Seeckt refused to defend the democratic state against right-wing insurrections.',
        examinerNote:
          'Full marks. Q1 gives two distinct, valid inferences with verbatim supporting quotes. Q2 provides two multi-layered causal paragraphs with precise terminology (Dolchstosslegende, Article 231, Spartacists, Freikorps, General von Seeckt).',
        pitfallCategory: 'Inference & Multi-Causal Pitfalls',
        pitfall:
          'In Q1, never evaluate provenance; state the inference directly. In Q2, avoid narrative storytelling: you must explain HOW each factor caused instability.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Birth of the Weimar Republic',
        steps: [
          {
            stage: '1. Naval Mutiny (Oct 1918)',
            desc: 'Kiel sailors revolt against suicidal orders; revolutionary councils seize major cities.',
          },
          {
            stage: '2. Kaiser Abdicates (Nov 1918)',
            desc: 'Max von Baden resigns; Ebert takes power and proclaims democratic republic.',
          },
          {
            stage: '3. Ebert-Groener Pact',
            desc: 'Army pledges loyalty to republic in exchange for crushing communist revolution.',
          },
          {
            stage: '4. Constitution Ratified (1919)',
            desc: 'Weimar assembly creates progressive democracy marred by PR coalitions and Article 48.',
          },
        ],
      },
      wordBank: [
        { term: 'Weimar Republic', def: 'The democratic government of Germany from 1919 to 1933.' },
        { term: 'Reichstag', def: 'The popularly elected national parliament of Germany.' },
        {
          term: 'Reichsrat',
          def: 'The upper parliamentary house representing Germany’s 18 regional states.',
        },
        {
          term: 'Proportional Rep',
          def: 'Electoral system where party seats equal vote proportion (60k votes/seat).',
        },
        {
          term: 'Article 48',
          def: 'Constitutional clause allowing the President to rule by emergency decree.',
        },
        {
          term: 'Coalition',
          def: 'A government formed by two or more parties due to lack of an absolute majority.',
        },
        {
          term: 'Ebert-Groener Pact',
          def: 'Secret pact ensuring army protection for the republic against the left.',
        },
        {
          term: 'Armistice',
          def: 'Agreement signed on 11 November 1918 halting hostilities in WWI.',
        },
        {
          term: 'November Criminals',
          def: 'Derogatory nationalist term for politicians who signed the Armistice.',
        },
        {
          term: 'Dolchstoss',
          def: 'The "Stab in the Back" myth claiming the army was betrayed by socialists.',
        },
        {
          term: 'Kiel Mutiny',
          def: 'Naval insurrection on 28 October 1918 that sparked the German Revolution.',
        },
        {
          term: 'Räte',
          def: 'Workers’ and Soldiers’ Councils formed across Germany in November 1918.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 2: KT 1.2 — THE EARLY CHALLENGES TO THE REPUBLIC, 1919–1923
  // Exam Format: source_utility (Section B: Q3(a) [8m])
  // =========================================================================
  {
    id: 'lesson_1_2',
    topic: 'Key Topic 1: The Weimar Republic, 1918–29',
    title: 'KT 1.2: Early Challenges to the Republic, 1919–1923',
    footerTag: 'KT 1.2: Early Challenges, 1919–23',
    left: {
      sectionTag: 'Crises & Extremism',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Between 1919 and 1923, the Weimar Republic faced near-continuous existential crises. The punitive terms of the Treaty of Versailles alienated millions of patriotic Germans, while armed rebellions erupted from both the radical left (Spartacists) and the militant right (Kapp Putsch). The crisis culminated in 1923 when the French invaded the Ruhr to extract overdue reparations, triggering passive resistance and hyperinflation that wiped out middle-class savings.',
      pillars: [
        {
          title: 'The Treaty of Versailles (June 1919)',
          subtitle: 'The Punitive Diktat',
          bullets: [
            '**Territorial & Colonial Amputations:** Lost 13% of European land (Alsace-Lorraine, Polish Corridor) and all overseas colonies, losing 6 million citizens.',
            '**Military Disarmament:** Army capped at 100,000 volunteers, conscription banned, Rhineland demilitarised, and navy limited to 6 small battleships.',
            '**Article 231 & Reparations:** Forced to accept sole war guilt, saddling the state with an astronomical £6.6 billion (132 billion gold marks) debt.',
          ],
        },
        {
          title: 'Armed Revolts from Left and Right',
          subtitle: 'Street Warfare & Paramilitaries',
          bullets: [
            '**Spartacist Uprising (Jan 1919):** Luxemburg and Liebknecht’s communist coup in Berlin brutally crushed by Noske’s Freikorps death squads.',
            '**Kapp Putsch (March 1920):** 12,000 Freikorps seized Berlin; collapsed only after a massive four-day workers’ general strike halted utilities.',
            '**Political Murders:** Right-wing squads assassinated 354 republicans (e.g. Erzberger, Rathenau); biased conservative judges convicted only one killer.',
          ],
        },
        {
          title: 'The 1923 Ruhr Occupation & Hyperinflation',
          subtitle: 'Economic Catastrophe',
          bullets: [
            '**French Occupation (Jan 1923):** 60,000 French and Belgian troops occupied the Ruhr industrial heartland after Germany defaulted on timber payments.',
            '**Passive Resistance:** Weimar ordered workers to strike while printing trillions of paper marks to pay wages without tax or gold backing.',
            '**Hyperinflation Ruin:** By November 1923, $1 USD equalled 4.2 trillion marks; middle-class savings and pensions were permanently vaporised.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Rosa Luxemburg',
          role: 'Co-founder of the Communist Spartacus League; brilliant Marxist theorist murdered by Freikorps soldiers during the January 1919 uprising.',
        },
        {
          name: 'Wolfgang Kapp',
          role: 'Right-wing civil servant who led the March 1920 Freikorps putsch in Berlin, fleeing to Sweden when a general strike crippled his regime.',
        },
        {
          name: 'Walther Rathenau',
          role: 'Weimar Foreign Minister who signed the 1922 Rapallo Treaty with the USSR; assassinated by right-wing Organization Consul terrorists.',
        },
        {
          name: 'Wilhelm Cuno',
          role: 'Chancellor in 1923 who ordered "passive resistance" against French troops in the Ruhr, unleashing runaway hyperinflation.',
        },
      ],
      milestones: [
        { date: 'Jan 1919', event: 'Spartacist Uprising crushed in Berlin; Luxemburg murdered' },
        { date: '28 Jun 1919', event: 'Treaty of Versailles signed in Hall of Mirrors' },
        { date: 'Mar 1920', event: 'Kapp Putsch occupies Berlin; collapsed by general strike' },
        { date: 'Jan 1923', event: 'French and Belgian troops march into the Ruhr basin' },
        {
          date: 'Nov 1923',
          event: 'Hyperinflation peaks; loaf of bread reaches 201 billion marks',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(a) Source Utility [8m]',
        title: 'The Impact of Hyperinflation on German Society in 1923',
        stem: 'Q3(a) Study Sources B and C. How useful are Sources B and C for an enquiry into the effects of hyperinflation on German society in 1923? Explain your answer, using Sources B and C and your knowledge of the historical context. (8 marks)',
        marks: '8',
        marksTime: '8 Marks • ~14 Mins Total',
        planningGuideTitle: 'Examiner Planning & C-O-P Framework:',
        planningGuide:
          '<strong>Structure:</strong> (1) Evaluate Source B for Content, Context & Provenance (COP) → (2) Evaluate Source C for Content, Context & Provenance (COP) → (3) Comparative synthesis judging utility.<br/><strong>Core Rule:</strong> Never dismiss a source as "biased"; explain what it is useful <em>for</em> given author perspective and historical context.',
        modelAnswer:
          'Source B is useful for showing the devastating impact of hyperinflation on the middle class (*Mittelstand*). The author, a Berlin schoolteacher, recounts that her life savings of 20,000 marks, accumulated over thirty years of work, became insufficient to buy a single loaf of bread or a tram ticket. This content accurately reflects the historical context of late 1923, when the mark depreciated so rapidly that wages had to be paid twice daily in wheelbarrows. The provenance adds utility because as a private diary entry, it offers an unembellished, firsthand account of the emotional panic and humiliation experienced by respectable bourgeois professionals who felt abandoned by the state.<br/><br/>Source C is equally useful because it illustrates who benefited from hyperinflation. A factory owner describes paying off a 5-million-mark bank mortgage on his machinery in autumn 1923 with paper notes equal to the price of a crate of matches. This matches historical knowledge: wealthy industrialists and property owners with fixed-interest debts cleared their liabilities completely, while landowners paid off mortgages with worthless paper currency. As a business correspondence letter, its purpose was practical financial reporting, giving it high reliability. Together, Sources B and C are highly useful: Source B reveals the catastrophic social ruination of salaried middle-class savers, while Source C reveals how large industrialists exploited the currency collapse.',
        examinerNote:
          'Level 3 (8/8 marks). Systematic evaluation of both sources examining Content, Context, and Origin/Purpose. Provenance is integrated to enhance utility rather than reject sources.',
        pitfallCategory: 'Utility & Provenance Pitfalls',
        pitfall:
          'Never write "Source B is biased and therefore useless". All historical sources are useful when cross-referenced with precise contextual knowledge.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Hyperinflation Catastrophe of 1923',
        steps: [
          {
            stage: '1. Reparations Default',
            desc: 'Germany misses timber deliveries; 60,000 French/Belgian troops occupy the Ruhr.',
          },
          {
            stage: '2. Passive Resistance',
            desc: 'Weimar orders general strike; prints unbacked banknotes to pay millions of striking workers.',
          },
          {
            stage: '3. Currency Collapse',
            desc: 'Supply of marks explodes while goods disappear; 1 USD soars to 4.2 trillion paper marks.',
          },
          {
            stage: '4. Middle Class Ruin',
            desc: 'Savings, pensions, and bonds wiped out; middle class permanently radicalized against Weimar.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Diktat',
          def: 'A dictated peace imposed without negotiation, as Versailles was viewed in Germany.',
        },
        {
          term: 'Article 231',
          def: 'The "War Guilt Clause" forcing Germany to accept sole moral blame for WWI.',
        },
        {
          term: 'Reparations',
          def: 'Compensation payments for war damage, fixed in 1921 at £6.6 billion.',
        },
        {
          term: 'Spartacists',
          def: 'Radical Marxist revolutionaries led by Luxemburg and Liebknecht.',
        },
        {
          term: 'Freikorps',
          def: 'Right-wing paramilitary units of demobilised soldiers used to crush leftists.',
        },
        {
          term: 'Kapp Putsch',
          def: 'Failed March 1920 right-wing military coup in Berlin led by Wolfgang Kapp.',
        },
        {
          term: 'Passive Resistance',
          def: 'Non-violent refusal to work or cooperate with French occupation troops in the Ruhr.',
        },
        {
          term: 'Hyperinflation',
          def: 'Extremely rapid and out-of-control currency devaluation and price inflation.',
        },
        {
          term: 'Mittelstand',
          def: 'The German middle class (shopkeepers, teachers, civil servants, small business owners).',
        },
        {
          term: 'Papiermark',
          def: 'The unbacked paper currency printed by Weimar that collapsed in 1923.',
        },
        {
          term: 'Demilitarised',
          def: 'Zone where military personnel, forts, and weapons are legally forbidden (Rhineland).',
        },
        {
          term: 'Rapallo Treaty',
          def: '1922 diplomatic pact between Weimar Germany and Soviet Russia restoring ties.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 3: KT 1.3 — THE RECOVERY OF THE REPUBLIC, 1924–1929
  // Exam Format: interpretation_diff_why (Section B: Q3(b) [4m] + Q3(c) [4m])
  // =========================================================================
  {
    id: 'lesson_1_3',
    topic: 'Key Topic 1: The Weimar Republic, 1918–29',
    title: 'KT 1.3: The Recovery of the Republic, 1924–1929',
    footerTag: 'KT 1.3: Recovery of the Republic, 1924–29',
    left: {
      sectionTag: 'Stresemann & Stability',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Between 1924 and 1929 (the "Golden Years"), Gustav Stresemann rescued Weimar Germany from economic ruin and international isolation. By introducing the Rentenmark, negotiating the Dawes Plan with the United States, and signing the 1925 Locarno Treaties, Stresemann restored economic growth and diplomatic respectability. However, the apparent prosperity was precarious, built upon short-term recallable American loans.',
      pillars: [
        {
          title: 'Stresemann’s Economic Miracle',
          subtitle: 'Currency & The Dawes Plan',
          bullets: [
            '**The Rentenmark (Nov 1923):** Hans Luther and Hjalmar Schacht created a temporary currency backed by agricultural land; replaced by gold Reichsmark in 1924.',
            '**Dawes Plan (1924):** US banker Charles Dawes scaled reparations to economic capacity; provided an initial 800 million gold mark loan to rebuild industry.',
            '**Industrial Modernisation:** US private loans totaling 25.5 billion marks revitalised railways, factories, and municipal public infrastructure.',
          ],
        },
        {
          title: 'Diplomatic Rehabilitation Abroad',
          subtitle: 'From Outcast to Great Power',
          bullets: [
            '**Locarno Treaties (1925):** Stresemann accepted Germany’s western borders with France and Belgium, securing the withdrawal of French troops from the Ruhr.',
            '**League of Nations (1926):** Germany admitted with a permanent Council seat, restoring its great power status on the international stage.',
            '**Kellogg-Briand Pact (1928):** Germany signed with 64 nations renouncing war; Stresemann won the 1926 Nobel Peace Prize alongside Aristide Briand.',
          ],
        },
        {
          title: 'The Young Plan & Fragile Foundations',
          subtitle: 'Dancing on a Volcano',
          bullets: [
            '**The Young Plan (1929):** Slashed total reparations to £2 billion and extended repayments across 59 years (to 1988), speeding Rhineland evacuation.',
            '**Right-Wing Backlash:** Nationalists and Hitler campaigned fiercely against the Young Plan, gaining valuable national media exposure via Hugenberg.',
            '**Underlying Vulnerabilities:** German agriculture plunged into recession from 1927; Stresemann warned prosperity depended on short-term US loans.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Gustav Stresemann',
          role: 'Chancellor in 1923 and Foreign Minister (1923–29); political architect of Weimar’s economic stabilisation and diplomatic rehabilitation.',
        },
        {
          name: 'Charles G. Dawes',
          role: 'US banker and Vice President who crafted the 1924 Dawes Plan, linking German economic recovery directly to American capital investment.',
        },
        {
          name: 'Hjalmar Schacht',
          role: 'Currency Commissioner and Reichsbank President who engineered the Rentenmark stabilization and managed foreign exchange reserves.',
        },
        {
          name: 'Paul von Hindenburg',
          role: 'Elected Weimar President in 1925 following Ebert’s death; conservative Field Marshal whose presidency reassured traditional nationalists.',
        },
      ],
      milestones: [
        { date: 'Nov 1923', event: 'Rentenmark introduced, abruptly halting hyperinflation' },
        { date: 'Aug 1924', event: 'Dawes Plan agreed; 800M gold mark loan and Ruhr evacuation' },
        { date: 'Oct 1925', event: 'Locarno Treaties guarantee western borders with France' },
        { date: 'Sep 1926', event: 'Germany admitted to League of Nations with permanent seat' },
        { date: 'Jun 1929', event: 'Young Plan slashes reparations debt to £2.0 billion' },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(b) & Q3(c) Historians’ Views [8m]',
        title: 'Historical Interpretations of the Stresemann Era (1924–1929)',
        stem: 'Q3(b) Study Interpretations 1 and 2. What is the main difference between these views on the recovery of the Weimar Republic in 1924–29? (4 marks) • Q3(c) Suggest one reason why Interpretations 1 and 2 give different views. (4 marks)',
        marks: '4 + 4 = 8',
        marksTime: '8 Marks • ~12 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q3(b) Formula:</strong> State core difference in line 1 → Quote/detail Interpretation 1 → Quote/detail Interpretation 2.<br/><strong>Q3(c) Formula:</strong> Explain difference by showing historians chose different evidence/focus (e.g. urban industrial boom vs agricultural crisis & debt dependence).',
        modelAnswer:
          '<strong>Q3(b) Difference in Views:</strong> The main difference is that Interpretation 1 views the period 1924–29 as a genuine era of economic stability and political consolidation, whereas Interpretation 2 argues the recovery was superficial and fundamentally unstable. Interpretation 1 highlights that Stresemann "successfully stabilised the currency, eliminated inflation, and restored German prestige through Locarno and the League of Nations", showing real progress. In contrast, Interpretation 2 asserts that "the prosperity was an illusion", emphasizing that Germany was dangerously reliant on recallable American loans that left the economy vulnerable to external shocks.<br/><br/><strong>Q3(c) Reasons for Difference:</strong> Interpretations 1 and 2 differ because the historians have focused on different aspects of Weimar society. The author of Interpretation 1 concentrates on diplomatic achievements and industrial production figures, which surpassed 1913 pre-war levels by 1928, alongside the defeat of extremist parties in the 1928 elections (where the Nazis won only 2.6% of votes). Conversely, the author of Interpretation 2 focuses on structural weaknesses, such as the persistent crisis in German agriculture from 1927, rising structural unemployment, and Stresemann’s own warning that Germany was "dancing on a volcano" of short-term foreign debt.',
        examinerNote:
          'Full 8/8 marks. Q3(b) provides a clear point of difference backed by direct citations. Q3(c) explains WHY they differ by linking each interpretation to distinct historical evidence rather than alleging bias.',
        pitfallCategory: 'Interpretation Difference & Origin Pitfalls',
        pitfall:
          'Never say "they differ because one author was German and one was British". You must show HOW their choice of historical evidence produced differing conclusions.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: Stresemann’s Stabilisation Mechanism',
        steps: [
          {
            stage: '1. Rentenmark (1923)',
            desc: 'New currency backed by industrial and agricultural land abruptly ends hyperinflation.',
          },
          {
            stage: '2. Dawes Plan (1924)',
            desc: 'Reparations restructured; $800M US gold loan jumpstarts industrial investment.',
          },
          {
            stage: '3. Locarno Pacts (1925)',
            desc: 'Western borders accepted; Germany enters League of Nations as a great power (1926).',
          },
          {
            stage: '4. Fragile Debt Trap',
            desc: '25.5B marks in short-term US loans leaves Weimar economy vulnerable to Wall Street shocks.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Rentenmark',
          def: 'Temporary currency issued in Nov 1923 backed by agricultural and industrial land.',
        },
        {
          term: 'Reichsmark',
          def: 'Permanent gold-backed German currency established in August 1924.',
        },
        {
          term: 'Dawes Plan',
          def: '1924 agreement restructuring reparations and injecting 800M gold marks in US loans.',
        },
        {
          term: 'Young Plan',
          def: '1929 pact cutting reparations to £2B and extending payments over 59 years.',
        },
        {
          term: 'Locarno Treaties',
          def: '1925 agreements accepting Germany’s western borders with France and Belgium.',
        },
        {
          term: 'League of Nations',
          def: 'International peacekeeping body that Germany joined as a Council member in 1926.',
        },
        {
          term: 'Kellogg-Briand',
          def: '1928 pact signed by 64 nations renouncing aggressive war as state policy.',
        },
        {
          term: 'Hindenburg',
          def: 'Field Marshal elected Weimar President in 1925, reassuring conservative elites.',
        },
        {
          term: 'Dancing on a Volcano',
          def: 'Stresemann’s famous metaphor warning of reliance on short-term US credit.',
        },
        {
          term: 'Foreign Investment',
          def: '25.5 billion marks in US private loans pumped into German factories and cities.',
        },
        {
          term: 'Agricultural Crisis',
          def: 'Severe recession in German farming from 1927 due to falling global grain prices.',
        },
        {
          term: 'Reichsbank',
          def: 'Germany’s central bank, reorganized under Hjalmar Schacht in 1924.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 4: KT 1.4 — CHANGES IN SOCIETY, 1924–1929
  // Exam Format: interpretation_eval (Section B: Q3(d) [16+4m])
  // =========================================================================
  {
    id: 'lesson_1_4',
    topic: 'Key Topic 1: The Weimar Republic, 1918–29',
    title: 'KT 1.4: Changes in Society, 1924–1929',
    footerTag: 'KT 1.4: Changes in Society, 1924–29',
    left: {
      sectionTag: 'Culture & Modernity',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'The mid-to-late 1920s witnessed profound social and cultural transformation across Germany. Real wages rose, public housing boomed, and the 1927 Unemployment Insurance Act provided a pioneering safety net. Women entered politics and the workplace as the "New Woman", while Berlin became the vibrant, experimental cultural capital of Europe through Bauhaus architecture, Expressionist art, and cabaret.',
      pillars: [
        {
          title: 'Standards of Living & Social Reforms',
          subtitle: 'Wages, Housing & Welfare',
          bullets: [
            '**Real Wage Increases:** Real wages rose by 33% from 1925 to 1928; average working hours fell from 50+ to 46 hours weekly, boosting worker living standards.',
            '**Municipal Housing Boom:** Over 2 million modern public apartments built between 1924 and 1931, dramatically reducing tuberculosis and urban squalor.',
            '**Unemployment Insurance Act (1927):** Established compulsory national safety net protecting 17 million workers with contributory benefits.',
          ],
        },
        {
          title: 'The "New Woman" & Gender Shifts',
          subtitle: 'Liberation vs Conservative Resistance',
          bullets: [
            '**Constitutional Suffrage:** Article 109 guaranteed equal rights; 112 women elected to Reichstag (1919–32), with female election turnout averaging 90%.',
            '**The "New Woman" (*Neue Frau*):** Short bobbed hair, modern fashion, smoking in public, and financial independence working in offices and shops.',
            '**Traditionalist Backlash:** Women earned 33% less than men; married female civil servants were condemned as "double-earners" and pressured to resign.',
          ],
        },
        {
          title: 'Cultural Golden Age & Expressionism',
          subtitle: 'Bauhaus, Art & Berlin Cabaret',
          bullets: [
            '**Bauhaus Architecture:** Walter Gropius championed functional modernist architecture ("form follows function"), rejecting imperial ornamentation.',
            '**Neue Sachlichkeit (New Objectivity):** Otto Dix and George Grosz painted raw, satirical masterpieces exposing war mutilation and societal decadence.',
            '**Cinema & Nightlife:** Fritz Lang’s *Metropolis* (1927) and Berlin cabaret clubs celebrated intellectual freedom, provoking conservative outrage.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Walter Gropius',
          role: 'Architect and founder of the Bauhaus design school in Weimar (1919); pioneered functionalist architecture using steel, glass, and concrete.',
        },
        {
          name: 'Otto Dix',
          role: 'Leading artist of the *Neue Sachlichkeit* movement; painted harrowing masterpieces exposing the horrific mutilation of WWI soldiers.',
        },
        {
          name: 'Fritz Lang',
          role: 'Pioneering Expressionist film director who created the sci-fi cinematic masterpiece *Metropolis* (1927) at the UFA studios in Babelsberg.',
        },
        {
          name: 'Marlene Dietrich',
          role: 'Iconic German actress who shot to international stardom in Josef von Sternberg’s film *The Blue Angel* (1930), embodying Weimar glamour.',
        },
      ],
      milestones: [
        { date: '1919', event: 'Walter Gropius founds the Bauhaus design school in Weimar' },
        {
          date: '1920',
          event: 'Robert Wiene directs Expressionist masterpiece The Cabinet of Dr. Caligari',
        },
        {
          date: '1927',
          event: 'Unemployment Insurance Act covers 17M workers; Metropolis released',
        },
        { date: '1928', event: 'Bertolt Brecht stages The Threepenny Opera in Berlin' },
        { date: '1929', event: 'Remarque publishes anti-war novel All Quiet on the Western Front' },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(d) Evaluative Essay [16+4m]',
        title: 'The Extent of Social and Cultural Transformation (1924–1929)',
        stem: 'Q3(d) How far do you agree with Interpretation 2 that the social and cultural changes of the Weimar Republic were an "urban illusion" that failed to transform the lives of the majority of German women? (16+4 marks)',
        marks: '16 + 4 SPaG = 20',
        marksTime: '20 Marks • ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Band 4 Rubric:',
        planningGuide:
          '<strong>Structure:</strong> (1) Introduction stating criteria (urban middle class vs rural working class) → (2) Arguments supporting Interpretation 2 (enduring inequalities & conservative backlash) → (3) Arguments supporting Interpretation 1 (genuine legal, political & occupational breakthroughs) → (4) Nuanced evaluative verdict.',
        modelAnswer:
          'I partially agree with Interpretation 2 that the "New Woman" was an urban concept that did not reflect the reality for the vast majority of German women, particularly in rural and working-class communities. However, Interpretation 2 overlooks the undeniable, permanent legal and political rights established by the Weimar Constitution that permanently altered women’s status in German public life.<br/><br/>Interpretation 2 is convincing because substantial traditional inequalities remained deeply entrenched. While Article 109 declared legal equality, women were still paid on average 33% less than men for identical work in factories and offices. Furthermore, outside metropolitan centres like Berlin, Frankfurt, and Hamburg, Germany remained deeply conservative and religious. Catholic and Protestant church leaders vehemently condemned the "New Woman", preaching that female identity belonged strictly within the family. Working-class women suffered the exhausting "double burden" of working long hours in domestic service or agriculture while carrying sole responsibility for housework and childcare. Married women civil servants were denounced as "double-earners" (*Doppelverdiener*) stealing jobs from male breadwinners.<br/><br/>Nevertheless, Interpretation 1 correctly identifies profound structural breakthroughs that cannot be dismissed as a mere illusion. The Weimar Republic granted German women universal suffrage at age 20 in 1918—years ahead of Britain and France. German women exercised this right enthusiastically, with voter turnout averaging 90%, and 112 women were elected to the Reichstag between 1919 and 1932. In urban areas, white-collar service expansion created 100,000 female teachers and 3,000 qualified female doctors by 1933. Financial independence allowed young women unprecedented freedom to attend cinemas, dance to American jazz, and make independent choices regarding marriage and birth control.<br/><br/>In conclusion, Interpretation 2 is accurate in arguing that the glamorous lifestyle of the "New Woman" was confined to an urban minority. However, Interpretation 1 is historically more valid regarding systemic legal and political empowerment. The transformation was real, but its deeply polarising nature created a conservative traditionalist backlash that right-wing nationalists and the Nazi Party would ruthlessly exploit after 1929.',
        examinerNote:
          'Band 4 (16/16 marks + 4 SPaG). Nuanced, criteria-driven evaluation balancing both interpretations against rich contextual knowledge (Article 109, 33% wage gap, 112 female Reichstag deputies, Doppelverdiener).',
        pitfallCategory: 'Evaluative Essay Pitfalls',
        pitfall:
          'Never write a one-sided essay. Band 4 requires evaluating BOTH interpretations in depth and concluding with sustained historical criteria.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: Social Modernisation & Traditionalist Backlash',
        steps: [
          {
            stage: '1. Constitutional Rights',
            desc: 'Article 109 grants universal suffrage and legal equality, electing 112 female Reichstag deputies.',
          },
          {
            stage: '2. White-Collar Jobs',
            desc: 'Service sector boom creates hundreds of thousands of jobs for women in offices and retail.',
          },
          {
            stage: '3. Cultural Explosion',
            desc: 'Bauhaus, Expressionist cinema, and Berlin cabaret challenge imperial conventions.',
          },
          {
            stage: '4. Conservative Anger',
            desc: 'Rural, church, and nationalist groups attack Weimar as decadent, funding Nazi opposition.',
          },
        ],
      },
      wordBank: [
        {
          term: 'New Woman',
          def: 'The modern, emancipated Weimar woman with bobbed hair, jobs, and social autonomy.',
        },
        {
          term: 'Bauhaus',
          def: 'Radical modernist architectural and design school founded by Walter Gropius in 1919.',
        },
        {
          term: 'Neue Sachlichkeit',
          def: 'New Objectivity art movement (Dix, Grosz) portraying raw post-war realities.',
        },
        {
          term: 'Cabaret',
          def: 'Provocative theatrical nightclub entertainment flourishing in 1920s Berlin.',
        },
        {
          term: 'Doppelverdiener',
          def: 'Derogatory term ("double-earners") for married women working outside the home.',
        },
        {
          term: 'Unemployment Act',
          def: '1927 social welfare statute providing benefits for 17 million workers.',
        },
        {
          term: 'Expressionism',
          def: 'Artistic and cinematic movement expressing inner emotional angst and distortion.',
        },
        {
          term: 'Metropolis',
          def: 'Fritz Lang’s landmark 1927 sci-fi film depicting urban industrial dystopia.',
        },
        {
          term: 'Article 109',
          def: 'Constitutional clause granting men and women fundamental equality before the law.',
        },
        {
          term: 'Real Wages',
          def: 'Income adjusted for inflation; rose by 33% in Germany between 1925 and 1928.',
        },
        {
          term: 'Horseshoe Estate',
          def: 'Modernist municipal public housing project built in Berlin by Bruno Taut.',
        },
        {
          term: 'Cultural Degeneracy',
          def: 'Conservative label condemning Weimar modernist culture as morally bankrupt.',
        },
      ],
    },
  },
];
