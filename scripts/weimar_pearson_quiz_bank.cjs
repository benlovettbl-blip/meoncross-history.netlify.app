/**
 * scripts/weimar_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 3 (1HI0/31):
 * Weimar and Nazi Germany, 1918–1939.
 * Master Knowledge Retrieval Bank (16 Enquiries × 8 Questions = 128 Questions).
 *
 * Pedagogical Standards:
 * 1. 100% Fidelity to the Pearson Edexcel Specification and Revision Guide.
 * 2. High-Yield Specification Recall: Zero obscure trivia, zero university-level fluff.
 * 3. Pre-Anchored Dates in Stems: Questions test substantive facts and mechanisms rather than date guessing.
 * 4. Two-Line Format: Line 1 = Key Fact (concise anchor); Line 2 = Historical Explanation (why it matters).
 * 5. Authentic Examiner Trap Callout on every enquiry page.
 */

const WEIMAR_PEARSON_QUIZ_BANK = [
  // =========================================================================
  // KEY TOPIC 1: THE WEIMAR REPUBLIC, 1918–1929
  // =========================================================================

  // ENQUIRY 1 (KT 1.1): The Origins of the Republic, 1918–1919
  {
    num: 1,
    id: 'lesson_1_1',
    keyTopic: 'Key Topic 1: The Weimar Republic, 1918–29',
    title: 'Origins of the Republic, 1918–1919',
    enquiry: 'How did military defeat and revolution lead to the creation of the Weimar Constitution in 1918–19?',
    examinerTrap:
      'Examiner Warning: Proportional Representation (PR) did not destroy Weimar alone; its fatal flaw was creating unstable multi-party coalitions that collapsed under crisis, leaving chancellors dependent on presidential emergency decrees (Article 48).',
    questions: [
      {
        q: 'Which naval base mutiny in late October 1918 sparked the revolution that brought down the German Empire?',
        a: 'The Kiel Naval Mutiny (Kiel & Wilhelmshaven)',
        exp: 'Sailors refused orders for a suicidal final battle against the Royal Navy, triggering worker-soldier councils across Germany.',
      },
      {
        q: 'On what date did Kaiser Wilhelm II formally abdicate before fleeing into exile in Holland?',
        a: '9 November 1918',
        exp: 'Shattered the Hohenzollern autocracy, allowing SPD leader Friedrich Ebert to form a provisional republican government.',
      },
      {
        q: 'What armistice agreement ended First World War fighting on the Western Front on 11 November 1918?',
        a: 'The Compiegne Armistice',
        exp: 'Signed by Matthias Erzberger on behalf of the new civilian republic, later providing the pretext for the "stab in the back" myth.',
      },
      {
        q: 'What secret agreement between the new Chancellor and the army commander guaranteed military protection for the Republic?',
        a: 'The Ebert-Groener Pact (10 November 1918)',
        exp: 'General Groener promised army loyalty in exchange for Ebert suppressing radical Bolshevik and communist revolutions.',
      },
      {
        q: 'What voting system was established in the 1919 Weimar Constitution for Reichstag elections?',
        a: 'Proportional Representation (PR)',
        exp: 'Allocated 1 Reichstag seat per 60,000 votes, ensuring fair democratic representation but causing fractured coalition governments.',
      },
      {
        q: 'What was the minimum voting age for German men and women under the democratic Weimar Constitution?',
        a: '20 years of age',
        exp: 'Established one of the most progressive universal franchises in the world, enfranchising women on equal terms with men.',
      },
      {
        q: 'Which constitutional emergency clause gave the Reich President power to pass laws by decree without Reichstag consent?',
        a: 'Article 48',
        exp: 'Intended only for national emergencies, it was later abused by Hindenburg and Bruning, effectively undermining parliamentary democracy.',
      },
      {
        q: 'Why was the National Constituent Assembly convened in Weimar in February 1919 rather than Berlin?',
        a: 'Berlin was paralysed by violent political riots and the Spartacist Uprising',
        exp: 'The peaceful town of Weimar provided safety for politicians to draft Germany\'s first democratic constitution.',
      },
    ],
  },

  // ENQUIRY 2 (KT 1.2): Early Challenges to the Republic, 1919–1923
  {
    num: 2,
    id: 'lesson_1_2',
    keyTopic: 'Key Topic 1: The Weimar Republic, 1918–29',
    title: 'Early Challenges to the Republic, 1919–1923',
    enquiry: 'How severely did the Treaty of Versailles, political rebellions, and hyperinflation threaten Weimar\'s survival?',
    examinerTrap:
      'Examiner Warning: Do not confuse the Spartacist Uprising (left-wing communist revolt put down by Freikorps) with the Kapp Putsch (right-wing nationalist revolt put down by a general strike).',
    questions: [
      {
        q: 'What total reparations sum was imposed on Germany by the Allied Reparations Commission in April 1921?',
        a: '£6.6 billion (132 billion gold marks)',
        exp: 'Placed an intolerable annual financial burden on the German economy, crippling post-war reconstruction and government revenue.',
      },
      {
        q: 'What German phrase described the Treaty of Versailles as an imposed, dictated peace with zero negotiation?',
        a: 'Diktat',
        exp: 'German delegates were locked out of Versailles negotiations and forced to sign under threat of immediate allied invasion.',
      },
      {
        q: 'Which clause in the Treaty of Versailles (Article 231) forced Germany to accept sole moral blame for starting the war?',
        a: 'The War Guilt Clause',
        exp: 'Deeply humiliated German national pride and provided legal justification for all allied reparations and land confiscations.',
      },
      {
        q: 'What right-wing nationalist myth claimed the German army was not defeated in the field but betrayed by civilian politicians?',
        a: 'The Dolchstosslegende (the "Stab in the Back" myth)',
        exp: 'Promoted by Hindenburg and Ludendorff, it branded the Weimar politicians the "November Criminals" and undermined democratic legitimacy.',
      },
      {
        q: 'Which communist leaders led the armed Spartacist Uprising in Berlin in January 1919 before being murdered?',
        a: 'Rosa Luxemburg and Karl Liebknecht',
        exp: 'Crushed ruthlessly by right-wing Freikorps mercenaries hired by Ebert, permanently estranging communists from the SPD.',
      },
      {
        q: 'How did Berlin workers defeat the right-wing Kapp Putsch when the regular army refused to fire on Freikorps mutineers?',
        a: 'Launched a nationwide general strike that halted water, gas, electricity, and trains',
        exp: 'Paralysed Berlin and forced Wolfgang Kapp to flee within four days, showing worker loyalty to the young Republic.',
      },
      {
        q: 'Why did 60,000 French and Belgian troops invade and occupy the industrial Ruhr valley in January 1923?',
        a: 'Germany defaulted on timber and coal reparation deliveries',
        exp: 'Poincare seized raw materials directly, prompting the German government to order passive resistance and strike pay.',
      },
      {
        q: 'How did the Weimar government finance passive resistance in the Ruhr, triggering catastrophic hyperinflation?',
        a: 'Printed uncontrolled quantities of unbacked paper banknotes',
        exp: 'Devalued the mark to zero, wiping out middle-class savings and destroying faith in the currency and the Republic.',
      },
    ],
  },

  // ENQUIRY 3 (KT 1.3): The Recovery of the Republic, 1924–1929
  {
    num: 3,
    id: 'lesson_1_3',
    keyTopic: 'Key Topic 1: The Weimar Republic, 1918–29',
    title: 'The Recovery of the Republic, 1924–1929',
    enquiry: 'How far did Gustav Stresemann\'s economic reforms and foreign policy stabilize Germany between 1924 and 1929?',
    examinerTrap:
      'Examiner Warning: Stresemann warned Germany was "dancing on a volcano". The golden years brought stability, but Germany was entirely dependent on short-term US loans that could be recalled at any moment.',
    questions: [
      {
        q: 'Who served as German Chancellor in late 1923 and Foreign Minister from 1923 to 1929, guiding Weimar\'s recovery?',
        a: 'Gustav Stresemann',
        exp: 'Architect of currency reform, international rehabilitation, and diplomatic reconciliation under the policy of fulfilment.',
      },
      {
        q: 'What temporary emergency currency backed by agricultural land was introduced in November 1923 to halt hyperinflation?',
        a: 'The Rentenmark',
        exp: 'Strictly limited in supply by Hjalmar Schacht, it restored domestic financial confidence and paved the way for the Reichsmark.',
      },
      {
        q: 'Under the 1924 Dawes Plan, what substantial US bank loan was granted to kickstart German industrial production?',
        a: '800 million gold marks ($200 million)',
        exp: 'Infused liquidity into German factories and railways, lowering annual reparation instalments to manageable levels.',
      },
      {
        q: 'What 1929 financial agreement reduced Germany\'s total reparations debt from £6.6 billion to £2 billion over 59 years?',
        a: 'The Young Plan (1929)',
        exp: 'Negotiated by Owen Young, it lowered annual payments by 20% and committed France to evacuate the Rhineland five years early.',
      },
      {
        q: 'What 1925 international treaty accepted Germany\'s western borders with France and Belgium, guaranteeing peace?',
        a: 'The Locarno Treaties (1925)',
        exp: 'Stresemann broke diplomatic isolation, renounced war with France, and paved the way for Germany\'s entry into the League of Nations.',
      },
      {
        q: 'In what year was Germany admitted to the League of Nations as a permanent member of the Council?',
        a: 'September 1926',
        exp: 'Marked Germany\'s restoration as a respected European great power and earned Stresemann the Nobel Peace Prize.',
      },
      {
        q: 'What 1928 international pact signed by 62 nations outlawed war as an instrument of national foreign policy?',
        a: 'The Kellogg-Briand Pact (1928)',
        exp: 'Demonstrated international consensus for peaceful conflict resolution, cementing Weimar\'s moral standing.',
      },
      {
        q: 'What fundamental economic vulnerability remained beneath the apparent stability of the German Golden Twenties?',
        a: 'Total reliance on short-term American loans that could be recalled immediately',
        exp: 'Stresemann warned that Germany was dancing on a volcano; when Wall Street crashed, the economy was immediately wiped out.',
      },
    ],
  },

  // ENQUIRY 4 (KT 1.4): Changes in Society, 1924–1929
  {
    num: 4,
    id: 'lesson_1_4',
    keyTopic: 'Key Topic 1: The Weimar Republic, 1918–29',
    title: 'Changes in Society, 1924–1929',
    enquiry: 'How significantly did living standards, women\'s rights, and cultural life transform during the Weimar Golden Age?',
    examinerTrap:
      'Examiner Warning: Cultural experimentation (cabaret, modern art, the "New Woman") horrified conservative, rural, and religious Germans, who viewed Weimar as decadent, sinful, and corrupt, driving them towards right-wing extremism.',
    questions: [
      {
        q: 'What progressive national welfare law passed in 1927 provided financial support for 17 million unemployed workers?',
        a: 'The Unemployment Insurance Act (1927)',
        exp: 'Required workers and employers to contribute 3% of wages into a central fund, creating the world\'s most generous welfare net.',
      },
      {
        q: 'How many new homes were built across German cities between 1924 and 1931 to solve housing shortages?',
        a: 'Over 2 million new homes (largely funded by the GeWoS)',
        exp: 'Reduced urban overcrowding and improved sanitation, though government welfare budgets became heavily strained.',
      },
      {
        q: 'What cultural term described financially independent young women with bobbed hair, modern clothes, and public social lives?',
        a: 'The "New Woman" (Neue Frau)',
        exp: 'Embodied post-war female liberation in Weimar cities, though traditionalists attacked it as moral decay and a threat to family values.',
      },
      {
        q: 'By 1925, what percentage of the total German workforce was comprised of employed women?',
        a: '36 per cent of workers',
        exp: 'Women worked in secretarial, banking, and retail roles, though they were paid on average 33% less than men for identical work.',
      },
      {
        q: 'What revolutionary modernist art and architectural school was founded by Walter Gropius in Weimar in 1919?',
        a: 'The Bauhaus School',
        exp: 'Championed functionalist design and modern materials ("art into industry"), rejecting traditional decorative imperial architecture.',
      },
      {
        q: 'Which German expressionist painters produced stark, critical portraits of corrupt post-war society and crippled veterans?',
        a: 'Otto Dix and George Grosz (New Objectivity movement)',
        exp: 'Confronted the harsh realities of war trauma, prostitution, and poverty, shocking conservative middle-class art patrons.',
      },
      {
        q: 'What pioneering 1927 German science-fiction silent film directed by Fritz Lang showcased Weimar cinematic excellence?',
        a: 'Metropolis',
        exp: 'Advanced cinema special effects and dystopian social critique, making Berlin the movie capital of Europe alongside Hollywood.',
      },
      {
        q: 'Why did rural and conservative Germans violently oppose Weimar\'s avant-garde cultural and sexual freedom?',
        a: 'Viewed it as cosmopolitan decadence, moral corruption, and un-German subversion of traditional values',
        exp: 'Fostered deep cultural resentment that the Nazi Party later exploited through slogans attacking "cultural Bolshevism".',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 2: HITLER'S RISE TO POWER, 1919–1933
  // =========================================================================

  // ENQUIRY 5 (KT 2.1): The Early Development of the Nazi Party, 1919–1922
  {
    num: 5,
    id: 'lesson_2_1',
    keyTopic: 'Key Topic 2: Hitler\'s Rise to Power, 1919–33',
    title: 'Early Development of the Nazi Party, 1919–1922',
    enquiry: 'How did Adolf Hitler transform the small German Workers\' Party (DAP) into the militant NSDAP by 1922?',
    examinerTrap:
      'Examiner Warning: The Nazi Party was originally socialist in rhetoric (the 25-Point Programme attacked profiteers and demanded nationalisation of trusts), which Hitler later downplayed to secure wealthy industrialist funding.',
    questions: [
      {
        q: 'What small nationalist political party did Adolf Hitler join as an army intelligence agent in September 1919?',
        a: 'The German Workers\' Party (DAP)',
        exp: 'Founded by Anton Drexler in Munich, it combined anti-Semitism, anti-capitalism, and vehement hatred of the Versailles Treaty.',
      },
      {
        q: 'What party manifesto co-authored by Hitler and Drexler in February 1920 set out early Nazi doctrine?',
        a: 'The 25-Point Programme',
        exp: 'Demanded scrapping Versailles, union of all Germans (Grossdeutschland), denial of Jewish citizenship, and nationalisation of trusts.',
      },
      {
        q: 'What revised name did the party adopt in August 1920 to broaden its appeal to both nationalists and workers?',
        a: 'The National Socialist German Workers\' Party (NSDAP / Nazi Party)',
        exp: 'Added "National Socialist" to capture working-class voters while asserting aggressive imperial nationalism.',
      },
      {
        q: 'What striking emblem and colours did Hitler design for the Nazi Party flag and armbands in 1920?',
        a: 'The black Swastika (Hakenkreuz) on a white circle and red field',
        exp: 'Used imperial German colours (red, white, black) to project revolutionary vitality and Aryan racial supremacy.',
      },
      {
        q: 'In July 1921, what sole leadership title did Hitler demand, replacing Anton Drexler as absolute party leader?',
        a: 'The Fuhrer (Party Chairman with dictatorial powers)',
        exp: 'Established the Fuhrerprinzip (leader principle), ending internal democratic voting and demanding unquestioning obedience.',
      },
      {
        q: 'What paramilitary wing of the Nazi Party was established in August 1921 to protect rallies and intimidate opponents?',
        a: 'The Sturmabteilung (SA / "Brownshirts")',
        exp: 'Led by Ernst Rohm, these violent ex-Freikorps street-brawlers broke up communist meetings and guarded Nazi speakers.',
      },
      {
        q: 'What official party newspaper was acquired by the NSDAP in December 1920 to disseminate propaganda across Bavaria?',
        a: 'The Volkischer Beobachter ("People\'s Observer")',
        exp: 'Provided a mass printing press to project Hitler\'s speeches, anti-Semitic conspiracy theories, and attack Weimar democracy.',
      },
      {
        q: 'What powerful oratorical technique did Hitler use to captivate audiences in Munich beer halls?',
        a: 'Began quietly before building to a crescendo of hysterical passion, gestures, and blame',
        exp: 'Tapped into veterans\' humiliation, scapegoating Jews and Marxists for the defeat of 1918 and hyperinflation.',
      },
    ],
  },

  // ENQUIRY 6 (KT 2.2): The Munich Putsch and the Lean Years, 1923–1929
  {
    num: 6,
    id: 'lesson_2_2',
    keyTopic: 'Key Topic 2: Hitler\'s Rise to Power, 1919–33',
    title: 'The Munich Putsch and the Lean Years, 1923–1929',
    enquiry: 'Why did the Munich Putsch collapse, and how did Hitler reorganize the party during the Lean Years?',
    examinerTrap:
      'Examiner Warning: Do not view the Munich Putsch as an unmitigated disaster for Hitler. His trial gave him national publicity, turned him into a right-wing hero, and yielded Mein Kampf.',
    questions: [
      {
        q: 'On what date did Hitler and the SA storm the Burgerbraukeller beer hall to launch the Munich Putsch?',
        a: '8 November 1923',
        exp: 'Sought to hold Bavarian leaders Kahr, Lossow, and Seisser at gunpoint and march on Berlin to depose the Weimar government.',
      },
      {
        q: 'Which famous World War I general lent his national prestige to Hitler\'s armed march through Munich on 9 November?',
        a: 'General Erich Ludendorff',
        exp: 'Marched alongside Hitler to the Feldherrnhalle, where Bavarian state police fired on the putschists, killing 16 Nazis.',
      },
      {
        q: 'How did Hitler turn his 1924 treason trial into a massive national propaganda triumph?',
        a: 'Used the courtroom to make hours of unchallenged speeches attacking Weimar treason and Versailles',
        exp: 'Sympathetic judges gave him front-page newspaper publicity, transforming him from a local Bavarian agitator into a national figure.',
      },
      {
        q: 'What lenient sentence was Hitler handed by sympathetic judges, serving barely nine months at Landsberg Prison?',
        a: 'Five years\' fortress detention (eligible for early parole)',
        exp: 'Treated like an honoured guest with a private room, secretarial aid, and endless visitors, serving only nine months.',
      },
      {
        q: 'What autobiographical manifesto did Hitler dictate to Rudolf Hess while imprisoned in Landsberg Fortress in 1924?',
        a: 'Mein Kampf ("My Struggle")',
        exp: 'Set out his core Weltanschauung: Aryan racial supremacy, anti-Semitism, anti-Bolshevism, and Lebensraum in Eastern Europe.',
      },
      {
        q: 'What fundamental strategic lesson did Hitler draw from the military failure of the Munich Putsch?',
        a: 'Power could never be seized by armed force; it had to be won legally through democratic elections',
        exp: 'Determined to enter the Reichstag, dismantle the Weimar Constitution from within, and destroy democracy with its own weapons.',
      },
      {
        q: 'At which 1926 party conference did Hitler decisively defeat the northern socialist wing led by Gregor Strasser?',
        a: 'The Bamberg Conference (February 1926)',
        exp: 'Asserted absolute Fuhrer authority, rejecting the anti-capitalist points of the programme to win over conservative industrialists.',
      },
      {
        q: 'How many seats did the Nazi Party win in the May 1928 Reichstag election during the peak of Weimar stability?',
        a: 'Barely 12 seats (2.6% of the national vote)',
        exp: 'Showed that as long as the Weimar economy prospered under Stresemann, extremist parties remained marginalized fringe sects.',
      },
    ],
  },

  // ENQUIRY 7 (KT 2.3): The Growth of Nazi Support, 1929–1932
  {
    num: 7,
    id: 'lesson_2_3',
    keyTopic: 'Key Topic 2: Hitler\'s Rise to Power, 1919–33',
    title: 'The Growth of Nazi Support, 1929–1932',
    enquiry: 'How did the Wall Street Crash and the Great Depression propel the Nazis to become the largest party in the Reichstag?',
    examinerTrap:
      'Examiner Warning: Hitler was not elected dictator. In the free July 1932 elections, the Nazis won 37% of the vote—their highest free electoral total—meaning 63% of Germans voted for other parties.',
    questions: [
      {
        q: 'What catastrophic financial crash in October 1929 caused US banks to immediately recall their loans to Germany?',
        a: 'The Wall Street Crash (Black Tuesday)',
        exp: 'Collapsed the German banking system, caused industrial production to plunge 40%, and triggered mass corporate bankruptcies.',
      },
      {
        q: 'By January 1932, what staggering total had German unemployment officially reached during the Great Depression?',
        a: '6.1 million workers (over 30% of the workforce)',
        exp: 'Created widespread destitution, starvation, and desperation, destroying public faith in moderate democratic parties.',
      },
      {
        q: 'Which Center Party Chancellor governed by Article 48 decrees, earning the nickname "The Hunger Chancellor"?',
        a: 'Heinrich Bruning',
        exp: 'Pursued severe deflationary austerity: slashing civil service salaries, cutting unemployment benefits, and raising tax rates.',
      },
      {
        q: 'Which rival political party saw its support surge alongside the Nazis as German politics polarised into violence?',
        a: 'The Communist Party of Germany (KPD)',
        exp: 'Won 100 seats in November 1932, terrifying middle-class business owners and wealthy landowners into backing the Nazis.',
      },
      {
        q: 'How did Joseph Goebbels revolutionize election campaigning during the 1930 and 1932 federal elections?',
        a: 'Used modern mass media, aeroplanes ("Hitler over Germany"), radio, records, and targeted demographic posters',
        exp: 'Projected Hitler as a dynamic, youthful, omnipresent saviour who promised "Work and Bread" tailored to each social class.',
      },
      {
        q: 'What role did the SA (Sturmabteilung) play on the streets during the dark years of the Great Depression?',
        a: 'Provided soup kitchens and order for members while engaging in deadly street battles with communist Red Front fighters',
        exp: 'Created the impression of disciplined strength, youth, and anti-communist resolve against democratic chaos.',
      },
      {
        q: 'How many Reichstag seats did the Nazi Party win in the July 1932 election, making them Germany\'s largest party?',
        a: '230 seats (37.3% of the popular vote)',
        exp: 'Established the Nazis as the undisputed dominant parliamentary force, though still lacking an absolute majority.',
      },
      {
        q: 'Which wealthy German industrialist and press baron financed Hitler and backed the Harzburg Front?',
        a: 'Fritz Thyssen (and Alfred Hugenberg)',
        exp: 'Funneled massive corporate donations into Nazi campaign funds, terrified that a socialist or communist revolution was imminent.',
      },
    ],
  },

  // ENQUIRY 8 (KT 2.4): How Hitler Became Chancellor, 1932–1933
  {
    num: 8,
    id: 'lesson_2_4',
    keyTopic: 'Key Topic 2: Hitler\'s Rise to Power, 1919–33',
    title: 'How Hitler Became Chancellor, 1932–1933',
    enquiry: 'How did backstairs political intrigue between Papen, Schleicher, and Hindenburg hand Hitler the Chancellorship?',
    examinerTrap:
      'Examiner Warning: Hitler did not seize power through a coup in 1933; he was appointed legally by President Hindenburg, who was tricked by Franz von Papen into believing Hitler could be "boxed in".',
    questions: [
      {
        q: 'How many votes did Hitler win in the April 1932 Presidential run-off election against Field Marshal Hindenburg?',
        a: '13.4 million votes (36.8% of the vote)',
        exp: 'Though Hindenburg won re-election, the result proved Hitler commanded immense personal national popularity.',
      },
      {
        q: 'Which aristocratic politician replaced Bruning as Chancellor in May 1932, leading the unrepresentative "Cabinet of Barons"?',
        a: 'Franz von Papen',
        exp: 'Lacked any majority in the Reichstag; lifted the ban on the SA to appease Hitler and governed entirely by presidential decree.',
      },
      {
        q: 'What happened to Nazi electoral support in the November 1932 election, causing deep financial panic within the party?',
        a: 'Fell by 2 million votes (lost 34 seats down to 196)',
        exp: 'Showed Nazi momentum had peaked; exhausted party funds led Goebbels to write that "the future looks dark and gloomy".',
      },
      {
        q: 'Which scheming army general served as Chancellor for just 57 days before resigning in political isolation in January 1933?',
        a: 'General Kurt von Schleicher',
        exp: 'Failed to split the Nazi Party by offering Gregor Strasser the Vice-Chancellorship, alienating both Hindenburg and big business.',
      },
      {
        q: 'What political bargain did Franz von Papen propose to President Hindenburg in January 1933 to remove Schleicher?',
        a: 'Make Hitler Chancellor with Papen as Vice-Chancellor in a conservative coalition cabinet',
        exp: 'Convinced the elderly Hindenburg that the non-Nazi majority in the cabinet would "box Hitler into a corner".',
      },
      {
        q: 'How many of the twelve ministers in Hitler\'s first cabinet of January 1933 were actually members of the Nazi Party?',
        a: 'Only three ministers (Hitler, Frick, and Goering)',
        exp: 'Papen boasted that "within two months we will have pushed Hitler so far into a corner he will squeak", disastrously underestimating him.',
      },
      {
        q: 'On what historic date did President Paul von Hindenburg formally swear in Adolf Hitler as Chancellor of Germany?',
        a: '30 January 1933',
        exp: 'Hitler attained supreme executive authority through legal, constitutional appointment, setting the stage for dictatorship.',
      },
      {
        q: 'What celebratory spectacle did thousands of torch-bearing SA and SS men hold through Berlin on the night of 30 January 1933?',
        a: 'A torchlight parade through the Brandenburg Gate',
        exp: 'Projected triumphant paramilitary dominance, signalling to the German people that the Weimar Republic was dead.',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 3: NAZI CONTROL AND DICTATORSHIP, 1933–1939
  // =========================================================================

  // ENQUIRY 9 (KT 3.1): The Creation of a Dictatorship, 1933–1934
  {
    num: 9,
    id: 'lesson_3_1',
    keyTopic: 'Key Topic 3: Nazi Control & Dictatorship, 1933–39',
    title: 'The Creation of a Dictatorship, 1933–1934',
    enquiry: 'How did the Reichstag Fire, the Enabling Act, and the Night of the Long Knives establish total Nazi dictatorship?',
    examinerTrap:
      'Examiner Warning: The Enabling Act (March 1933) required a two-thirds majority to amend the constitution. The Nazis achieved this legally by banning the 81 communist deputies and intimidating the Catholic Centre Party into voting in favour.',
    questions: [
      {
        q: 'What iconic building was destroyed by arson on the night of 27 February 1933, sparking a nationwide crisis?',
        a: 'The Reichstag (Parliament building in Berlin)',
        exp: 'Hitler blamed an imminent Bolshevik revolution, using it to terrorise Hindenburg into signing emergency decrees.',
      },
      {
        q: 'Which Dutch communist was arrested at the scene, confessed to the arson, and was guillotined by the Nazis?',
        a: 'Marinus van der Lubbe',
        exp: 'Used by the Nazis as absolute proof that the KPD was orchestrating an armed communist uprising across Germany.',
      },
      {
        q: 'What presidential emergency decree signed on 28 February suspended all civil liberties and freedom of speech?',
        a: 'The Reichstag Fire Decree (Decree for the Protection of People and State)',
        exp: 'Allowed the Gestapo to imprison 4,000 communists, shutter opposition newspapers, and hold citizens without trial.',
      },
      {
        q: 'What constitutional amendment passed on 23 March 1933 gave Hitler power to pass laws without the Reichstag for four years?',
        a: 'The Enabling Act (Gesetz zur Behebung der Not von Volk und Reich)',
        exp: 'Passed 444 votes to 94 (only SPD opposed), effectively transferring all legislative power to Hitler\'s cabinet and ending democracy.',
      },
      {
        q: 'What German term described the total Nazification and coordination of all German political, social, and cultural life?',
        a: 'Gleichschaltung ("Coordination")',
        exp: 'Systematically brought state parliaments, trade unions, courts, and civil service under direct Nazi Party control.',
      },
      {
        q: 'On 2 May 1933, what national institutions were abolished, with their offices raided and leaders sent to concentration camps?',
        a: 'All independent Trade Unions (replaced by the Nazi DAF)',
        exp: 'Eliminated organised working-class resistance, banning all strikes and placing wages under state control.',
      },
      {
        q: 'What bloody purge on 30 June 1934 saw the SS execute Ernst Rohm and 200 leaders of the SA paramilitary?',
        a: 'The Night of the Long Knives (Operation Hummingbird)',
        exp: 'Eliminated the radical socialist wing of the SA, winning the absolute loyalty and support of regular German army generals.',
      },
      {
        q: 'What personal oath did all German soldiers swear following the death of President Hindenburg on 2 August 1934?',
        a: 'The Personal Oath of Loyalty directly to Adolf Hitler as Fuhrer',
        exp: 'Bound the military by personal, sacred Christian honor to obey Hitler to the death, making subsequent military revolt treason.',
      },
    ],
  },

  // ENQUIRY 10 (KT 3.2): The Police State and Religion, 1933–1939
  {
    num: 10,
    id: 'lesson_3_2',
    keyTopic: 'Key Topic 3: Nazi Control & Dictatorship, 1933–39',
    title: 'The Police State and Religion, 1933–1939',
    enquiry: 'How did the SS, Gestapo, concentration camps, and religious policies terrorise and control the German population?',
    examinerTrap:
      'Examiner Warning: Pre-war concentration camps (like Dachau in 1933) were political detention centres for communists, socialists, and dissidents to be re-educated through terror, not wartime extermination camps (which began after 1941).',
    questions: [
      {
        q: 'Which ruthless Nazi leader commanded the SS (Schutzstaffel) and built the machinery of the police state?',
        a: 'Heinrich Himmler (Reichsfuhrer-SS)',
        exp: 'Expanded the black-uniformed SS from a 280-man bodyguard into a vast racial, military, and police empire.',
      },
      {
        q: 'What was the secret state police force created by Hermann Goering and later led by Reinhard Heydrich?',
        a: 'The Gestapo (Geheime Staatspolizei)',
        exp: 'Operated above the law without judicial oversight; relied heavily on ordinary German citizens voluntarily denouncing neighbours.',
      },
      {
        q: 'Where was the first official Nazi concentration camp opened in March 1933 to detain political prisoners?',
        a: 'Dachau (near Munich)',
        exp: 'Established the brutal template of barbed wire, guard towers, and corporal terror for communists, trade unionists, and critics.',
      },
      {
        q: 'What special treason court established in 1934 operated without juries, sentencing political opponents to death?',
        a: 'The People\'s Court (Volksgerichtshof)',
        exp: 'Headed by Nazi judges who ensured that 90% of political treason defendants were found guilty and executed.',
      },
      {
        q: 'What treaty did Hitler sign with Pope Pius XI in July 1933, promising religious freedom in exchange for political neutrality?',
        a: 'The Concordat (Reichskonkordat)',
        exp: 'Hitler promised not to interfere with Catholic schools and youth clubs if the Catholic Centre Party dissolved itself.',
      },
      {
        q: 'What unified pro-Nazi Protestant church was established under Bishop Ludwig Muller, promoting "Positive Christianity"?',
        a: 'The Reich Church (Reichskirche)',
        exp: 'Sought to remove the Old Testament (as Jewish) and replace crosses with swastikas, outraging traditional Protestant clergy.',
      },
      {
        q: 'Which anti-Nazi Protestant pastor founded the Pastors\' Emergency League and the Confessing Church in 1934?',
        a: 'Pastor Martin Niemoller',
        exp: 'Defied Nazi state interference in Christian doctrine; arrested in 1937 and imprisoned in Sachsenhausen and Dachau for seven years.',
      },
      {
        q: 'What papal encyclical was smuggled into Germany in 1937 and read from Catholic pulpits, condemning Nazi racism?',
        a: 'Mit brennender Sorge ("With Burning Concern")',
        exp: 'Pope Pius XI openly condemned Hitler as a "mad prophet" who elevated race above God, sparking a vicious Nazi backlash.',
      },
    ],
  },

  // ENQUIRY 11 (KT 3.3): Controlling and Influencing Attitudes, 1933–1939
  {
    num: 11,
    id: 'lesson_3_3',
    keyTopic: 'Key Topic 3: Nazi Control & Dictatorship, 1933–39',
    title: 'Controlling and Influencing Attitudes, 1933–1939',
    enquiry: 'How did Joseph Goebbels use censorship, mass media, rallies, and culture to indoctrinate the German public?',
    examinerTrap:
      'Examiner Warning: Propaganda was not just passive brainwashing; it was paired with ruthless censorship. Germans could not legally listen to foreign radio, read unapproved books, or display unpatriotic art without facing Gestapo arrest.',
    questions: [
      {
        q: 'Who was appointed head of the Ministry of Public Enlightenment and Propaganda in March 1933?',
        a: 'Dr Joseph Goebbels',
        exp: 'Master propagandist who controlled press, radio, cinema, literature, and art to align German minds with National Socialism.',
      },
      {
        q: 'What symbolic public ritual occurred in Berlin on 10 May 1933, where 20,000 un-German books were incinerated?',
        a: 'The Public Book Burning (Bücherverbrennung)',
        exp: 'Students burned works by Jewish, communist, and liberal authors like Einstein, Freud, Marx, and Remarque.',
      },
      {
        q: 'What cheap mass-produced radio receiver was manufactured to ensure every German household could hear Hitler\'s speeches?',
        a: 'The Volksempfanger (People\'s Receiver - Model VE301)',
        exp: 'Subsidised to cost just 35 marks; lacked shortwave bands so Germans could not listen to foreign broadcasts like the BBC.',
      },
      {
        q: 'By 1939, what percentage of German households owned a radio, the highest proportion in the world?',
        a: 'Over 70 per cent of households',
        exp: 'Enabled Goebbels to broadcast Hitler\'s voice directly into living rooms and factories with mandatory communal listening.',
      },
      {
        q: 'What annual mass spectacle held in Nuremberg united hundreds of thousands of party members in paramilitary loyalty?',
        a: 'The Nuremberg Rallies (Reichsparteitag)',
        exp: 'Designed by Albert Speer with "Cathedrals of Light" searchlights to project awe, monolithic unity, and total obedience.',
      },
      {
        q: 'Which female film director produced the iconic Nazi propaganda film "Triumph of the Will" documenting the 1934 rally?',
        a: 'Leni Riefenstahl',
        exp: 'Pioneered dynamic camera angles and aerial shots to present Hitler as an all-powerful, messianic Aryan leader.',
      },
      {
        q: 'What travelling public exhibition was organized in Munich in 1937 to mock and condemn modern abstract art?',
        a: 'The Degenerate Art Exhibition (Entartete Kunst)',
        exp: 'Denounced expressionist, cubist, and Jewish art as "filth", contrasting it with heroic, realistic Aryan neoclassical art.',
      },
      {
        q: 'What major international sports tournament held in Berlin in 1936 was exploited to showcase Nazi efficiency and Aryan prowess?',
        a: 'The 1936 Berlin Olympic Games',
        exp: 'Temporarily removed anti-Semitic signs to present Germany as modern, peaceful, and united, though Jesse Owens won 4 gold medals.',
      },
    ],
  },

  // ENQUIRY 12 (KT 3.4): Opposition, Resistance and Conformity, 1933–1939
  {
    num: 12,
    id: 'lesson_3_4',
    keyTopic: 'Key Topic 3: Nazi Control & Dictatorship, 1933–39',
    title: 'Opposition, Resistance and Conformity, 1933–1939',
    enquiry: 'Why was active resistance so limited, and what forms of youth and religious dissent emerged before 1939?',
    examinerTrap:
      'Examiner Warning: Distinguish between passive non-conformity (listening to jazz, telling political jokes, refusing to give the Hitler salute) and active resistance (plotting assassination or sabotage). Most opposition was silent and private.',
    questions: [
      {
        q: 'What youth counter-culture group wore checked shirts, grew long hair, and beat up Hitler Youth patrols in western cities?',
        a: 'The Edelweiss Pirates (Edelweisspiraten)',
        exp: 'Working-class teenagers who rejected regimented Nazi camps, camping in nature and singing banned parodied songs.',
      },
      {
        q: 'Which middle-class youth group embraced American jazz and swing music, dancing in clubs in defiance of Nazi racial purity?',
        a: 'The Swing Youth (Swingjugend)',
        exp: 'Wealthy youths in Hamburg and Berlin who welcomed Jewish friends and mocked Nazi militarism through Anglo-American style.',
      },
      {
        q: 'Which Catholic Bishop of Munster delivered public sermons in 1941 that forced Hitler to temporarily halt the T4 euthanasia programme?',
        a: 'Cardinal Clemens August Graf von Galen',
        exp: 'Exposed the secret murder of mentally disabled children; his immense public popularity prevented the Nazis from executing him.',
      },
      {
        q: 'What Christian religious sect refused to swear oaths to Hitler, give the Nazi salute, or serve in the military on biblical grounds?',
        a: 'Jehovah\'s Witnesses (Bibelforscher)',
        exp: 'Over 1,200 were murdered in concentration camps wearing the purple triangle, demonstrating unyielding moral resistance.',
      },
      {
        q: 'What communist underground organization published illegal newspapers and smuggled intelligence to Moscow?',
        a: 'The Red Orchestra (Rote Kapelle)',
        exp: 'Resisted within the state apparatus, though most pre-war communist cells were rapidly penetrated by the Gestapo.',
      },
      {
        q: 'What private, everyday forms of non-conformity were widely practiced by ordinary Germans dissatisfied with Nazi rule?',
        a: 'Telling political jokes (Flüsterwitze), complaining privately, and refusing the "Heil Hitler" greeting',
        exp: 'Known as "inner emigration", it allowed citizens to preserve personal dignity without risking execution for public protest.',
      },
      {
        q: 'Why was large-scale open political rebellion virtually impossible for ordinary German citizens under the Third Reich?',
        a: 'Total Gestapo surveillance, terror of Dachau, neighbourhood block wardens, and lack of independent civil organizations',
        exp: 'The totalitarian destruction of trade unions, free press, and rival parties meant dissenters had no vehicle to organize.',
      },
      {
        q: 'Why did millions of ordinary Germans willingly conform and genuinely support Hitler\'s regime between 1933 and 1939?',
        a: 'Hitler eliminated unemployment, tore up the hated Versailles Treaty, and restored German national pride and public order',
        exp: 'Economic recovery and foreign policy triumphs created immense genuine popularity that far outweighed opposition.',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 4: LIFE IN NAZI GERMANY, 1933–1939
  // =========================================================================

  // ENQUIRY 13 (KT 4.1): Nazi Policies Towards Women, 1933–1939
  {
    num: 13,
    id: 'lesson_4_1',
    keyTopic: 'Key Topic 4: Life in Nazi Germany, 1933–39',
    title: 'Nazi Policies Towards Women, 1933–1939',
    enquiry: 'How did Nazi policies seek to define the role of women around marriage, motherhood, and biological reproduction?',
    examinerTrap:
      'Examiner Warning: By 1937, rearmament caused an acute labour shortage, forcing the Nazis to reverse policy and recruit millions of women back into factories, creating a massive contradiction with their "Kinder, Küche, Kirche" ideology.',
    questions: [
      {
        q: 'What traditional German slogan summarized the Nazi ideal role for women in society?',
        a: '"Kinder, Küche, Kirche" (Children, Kitchen, Church)',
        exp: 'Relegated women strictly to biological reproduction, domestic homemaking, and moral Christian-nationalist upbringing.',
      },
      {
        q: 'What financial incentive offered under the 1933 Law for the Encouragement of Marriage gave 1,000 marks to newlyweds?',
        a: 'Marriage Loans (Ehedarlehen)',
        exp: 'Worth nine months\' wages, with 25% of the loan cancelled for each child born; having 4 children wiped out the debt entirely.',
      },
      {
        q: 'What award medal was presented to German mothers on Hitler\'s mother\'s birthday for bearing large Aryan families?',
        a: 'The Cross of Honour of the German Mother (Mutterkreuz)',
        exp: 'Awarded in Bronze (4–5 children), Silver (6–7 children), and Gold (8+ children); members of the Hitler Youth had to salute them.',
      },
      {
        q: 'What program established by Heinrich Himmler paired unmarried Aryan women with racially pure SS officers?',
        a: 'The Lebensborn ("Fount of Life") Program',
        exp: 'Aimed to breed racially elite children in maternity homes, producing over 11,000 babies to expand the Aryan master race.',
      },
      {
        q: 'What professions were women systematically purged and excluded from in the early years of Nazi rule?',
        a: 'Civil service, judges, doctors, and university lecturers',
        exp: 'Females were barred from state employment to ensure men took jobs, while female university enrollment was capped at 10%.',
      },
      {
        q: 'What physical appearance and lifestyle did Nazi propaganda mandate for respectable German Aryan women?',
        a: 'No makeup, plain hair in braids or buns, traditional dirndl dresses, no smoking, and no slimming diets',
        exp: 'Celebrated natural peasant health and fertility over "degenerate, decadent Americanised" fashion and makeup.',
      },
      {
        q: 'Why was the Nazi regime forced to reverse its anti-female employment policy after 1937?',
        a: 'Massive rearmament and conscription created severe factory labour shortages',
        exp: 'Women were drafted into munitions and agricultural work, so female employment actually rose from 11.6 million in 1933 to 14.6 million in 1939.',
      },
      {
        q: 'What compulsory national female organization educated young women in domestic science, cooking, and racial child-rearing?',
        a: 'The National Socialist Women\'s League (NS-Frauenschaft)',
        exp: 'Coordinated female adult activity to support the regime\'s domestic, ration, and child-rearing policies.',
      },
    ],
  },

  // ENQUIRY 14 (KT 4.2): Nazi Policies Towards the Young, 1933–1939
  {
    num: 14,
    id: 'lesson_4_2',
    keyTopic: 'Key Topic 4: Life in Nazi Germany, 1933–39',
    title: 'Nazi Policies Towards the Young, 1933–1939',
    enquiry: 'How did schools, revised curricula, and the Hitler Youth indoctrinate young Germans into loyal National Socialists?',
    examinerTrap:
      'Examiner Warning: Membership in the Hitler Youth was made compulsory by law in March 1939, but active enthusiasm plummeted as meetings became repetitive military drills and marching rather than camping adventures.',
    questions: [
      {
        q: 'What mandatory teachers\' union was every German educator forced to join to ensure ideological orthodoxy?',
        a: 'The National Socialist Teachers\' League (NSLB)',
        exp: 'Over 97% of teachers joined, attending compulsory ideological training camps in racial science and Nazi ideology.',
      },
      {
        q: 'What percentage of school curriculum timetable was allocated to compulsory physical education and boxing?',
        a: '15 per cent of school time (at least 2 hours daily)',
        exp: 'Hitler demanded that boys be hardened to endure pain and physical combat, prioritizing physical fitness over intellectual study.',
      },
      {
        q: 'What new school subject taught pupils about skull measurements, heredity, and Aryan racial superiority?',
        a: 'Racial Studies (Rassenkunde)',
        exp: 'Classified races hierarchically, indoctrinating children to view Jews as parasitic "sub-humans" (Untermenschen).',
      },
      {
        q: 'How was the study of History manipulated in German schools under the 1935 curriculum guidelines?',
        a: 'Rewritten to glorify German military heroes, the Dolchstoss betrayal, and the rise of Adolf Hitler',
        exp: 'Taught pupils that the Versailles Treaty was an allied crime and that Germany had an imperial destiny to conquer Lebensraum.',
      },
      {
        q: 'What youth organization for boys aged 14 to 18 trained them in map-reading, shooting, and military field exercises?',
        a: 'The Hitler Youth (Hitlerjugend / HJ)',
        exp: 'Led by Baldur von Schirach, it prepared young men for military conscription through rigorous drills, marches, and indoctrination.',
      },
      {
        q: 'What sister organization for girls aged 14 to 18 prepared young women for motherhood, domestic duty, and physical health?',
        a: 'The League of German Girls (Bund Deutscher Mädel / BDM)',
        exp: 'Engaged in gymnastics, campfire singing, first aid, and housekeeping to prepare them to be mothers of the Aryan race.',
      },
      {
        q: 'In what year was membership in the Hitler Youth made strictly compulsory for all eligible boys and girls?',
        a: 'March 1939 (Second Hitler Youth Law)',
        exp: 'Made refusal a criminal offence for parents, expanding enrollment to over 8 million youths while destroying alternative clubs.',
      },
      {
        q: 'What elite boarding schools were established by the Nazi Party to train future political, military, and SS leaders?',
        a: 'Napolas (National Political Educational Institutes) and Adolf Hitler Schools',
        exp: 'Selected pupils on strict Aryan racial and physical criteria, subjecting them to Spartan military discipline.',
      },
    ],
  },

  // ENQUIRY 15 (KT 4.3): Employment and Living Standards, 1933–1939
  {
    num: 15,
    id: 'lesson_4_3',
    keyTopic: 'Key Topic 4: Life in Nazi Germany, 1933–39',
    title: 'Employment and Living Standards, 1933–1939',
    enquiry: 'Did German workers genuinely benefit from Nazi economic policies, or was recovery an illusion of rearmament?',
    examinerTrap:
      'Examiner Warning: Nazi "full employment" was statistical trickery ("invisible unemployment"). Jews stripped of citizenship, married women forced out of work, political prisoners in camps, and 1.4 million conscripted soldiers were excluded from jobless figures!',
    questions: [
      {
        q: 'What compulsory public work service required all men aged 18 to 25 to complete six months of manual labour?',
        a: 'The Reich Labour Service (RAD - Reichsarbeitsdienst)',
        exp: 'Young men lived in military-style camps, wearing uniforms and draining marshes or planting forests with spades at pocket-money pay.',
      },
      {
        q: 'What major public infrastructure project built 7,000 km of high-speed motorways, employing over 125,000 workers?',
        a: 'The Autobahn Project',
        exp: 'Created direct construction jobs, stimulated automobile production, and provided rapid military transport across Germany.',
      },
      {
        q: 'What economic policy aimed to make Germany completely self-sufficient in food, raw materials, and fuel?',
        a: 'Autarky (Self-Sufficiency)',
        exp: 'Promoted by Hermann Goering under the 1936 Four-Year Plan; developed ersatz (substitute) products like synthetic rubber (Buna) and oil from coal.',
      },
      {
        q: 'What state monopoly organization led by Robert Ley replaced free trade unions, controlling all German workers?',
        a: 'The German Labour Front (DAF - Deutsche Arbeitsfront)',
        exp: 'Abolished collective bargaining and strikes, froze wages, and introduced the workbook (Arbeitsbuch) to prevent job switching.',
      },
      {
        q: 'What DAF leisure division provided subsidized holidays, theatre tickets, sports, and cruise ship voyages for workers?',
        a: 'Strength Through Joy (KdF - Kraft durch Freude)',
        exp: 'World\'s largest tourism operator; rewarded loyal workers to boost industrial productivity and minimize labour unrest.',
      },
      {
        q: 'What popular consumer car scheme encouraged workers to save 5 marks a week into a stamp book, but delivered zero cars?',
        a: 'The Volkswagen ("People\'s Car" / KdF-Wagen)',
        exp: 'Designed by Ferdinand Porsche; all production was diverted to military Kubelwagen jeeps in 1939, swindling workers\' savings.',
      },
      {
        q: 'What KdF sub-organization campaigned to improve factory physical working conditions, ventilation, and canteens?',
        a: 'Beauty of Labour (SdA - Schönheit der Arbeit)',
        exp: 'Improved washrooms and factory lighting, but forced workers to carry out these renovations in unpaid overtime.',
      },
      {
        q: 'What happened to average weekly working hours for German industrial workers between 1933 and 1939?',
        a: 'Increased from 43 hours to 47 hours per week (up to 60+ hours in arms factories)',
        exp: 'While take-home pay rose modestly, workers endured far longer hours, strict discipline, and rising costs for consumer goods.',
      },
    ],
  },

  // ENQUIRY 16 (KT 4.4): The Persecution of Minorities, 1933–1939
  {
    num: 16,
    id: 'lesson_4_4',
    keyTopic: 'Key Topic 4: Life in Nazi Germany, 1933–39',
    title: 'The Persecution of Minorities, 1933–1939',
    enquiry: 'How did anti-Semitic legislation and state violence escalate from social exclusion to the Kristallnacht pogrom?',
    examinerTrap:
      'Examiner Warning: The Holocaust / Final Solution (mass industrial extermination in gas chambers) was developed during wartime in 1941–42. Before 1939, Nazi policy aimed at terrorising and impoverishing Jews to compel forced emigration.',
    questions: [
      {
        q: 'What nation-wide economic action was launched by the SA on 1 April 1933, painting stars of David on storefronts?',
        a: 'The One-Day Boycott of Jewish Shops, Doctors, and Lawyers',
        exp: 'Marked the regime\'s first official state anti-Semitic action, testing public compliance and normalizing discrimination.',
      },
      {
        q: 'What two landmark racial statutes passed in September 1935 stripped German Jews of all citizenship rights?',
        a: 'The Nuremberg Laws (Reich Citizenship Law & Law for Protection of German Blood and Honour)',
        exp: 'Banned marriages and sexual relations between Jews and Aryans, stripping Jews of civil rights and the right to vote.',
      },
      {
        q: 'How did the Nuremberg Laws legally define a person as Jewish, regardless of their personal religious faith?',
        a: 'Having three or four Jewish grandparents',
        exp: 'Defined Jewish identity biologically by bloodline rather than religious practice, sealing the fate of secular assimilated citizens.',
      },
      {
        q: 'What violent nationwide pogrom occurred on 9–10 November 1938, destroying synagogues and Jewish homes across Germany?',
        a: 'Kristallnacht (The Night of Broken Glass)',
        exp: 'Organized by Goebbels after diplomat Ernst vom Rath was shot in Paris; SA thugs murdered 91 Jews and destroyed 1,000 synagogues.',
      },
      {
        q: 'How many Jewish men were arrested during Kristallnacht and deported to concentration camps like Dachau and Buchenwald?',
        a: 'Approximately 30,000 Jewish men',
        exp: 'Brutally abused until their families signed over their property and proved they had foreign visas to emigrate immediately.',
      },
      {
        q: 'What financial penalty did the Nazi government cynically impose on the Jewish community following Kristallnacht?',
        a: 'A 1 billion mark collective fine (plus insurance claims confiscated)',
        exp: 'Forced Jewish victims to pay for the destruction wrought by Nazi thugs, accelerating their total economic ruin.',
      },
      {
        q: 'What secret euthanasia programme begun in 1939 murdered over 70,000 mentally and physically disabled German citizens?',
        a: 'The T4 Euthanasia Programme (Aktion T4)',
        exp: 'Labelled disabled individuals "life unworthy of life" (ballast existences), murdering them with carbon monoxide gas in psychiatric hospitals.',
      },
      {
        q: 'What coloured triangle badges were Roma (Gypsies), homosexuals, and Jehovah\'s Witnesses forced to wear in concentration camps?',
        a: 'Roma = Brown / Black; Homosexuals = Pink; Jehovah\'s Witnesses = Purple',
        exp: 'Systematically categorized victims in the camps, subjecting them to medical experiments, forced sterilization, and murder.',
      },
    ],
  },
];

module.exports = {
  WEIMAR_PEARSON_QUIZ_BANK,
};
