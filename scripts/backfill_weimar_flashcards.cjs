/**
 * scripts/backfill_weimar_flashcards.cjs
 *
 * Authors and injects high-yield flashcards (6-8 per lesson) for the 12 missing lessons
 * in Weimar & Nazi Germany (KT2, KT3, KT4: lesson_2_1 to lesson_4_4).
 */

const fs = require('fs');
const path = require('path');

const WEIMAR_FLASHCARDS = {
  lesson_2_1: [
    {
      term: "DAP (German Workers' Party)",
      definition:
        'A small, nationalist and antisemitic political party founded in Munich by Anton Drexler in January 1919, which Hitler joined in September 1919.',
      q: 'What was the DAP, and when was it founded?',
      a: "The German Workers' Party was a nationalist, antisemitic political party founded in Munich in January 1919 by Anton Drexler.",
    },
    {
      term: '25-Point Programme',
      definition:
        'The political manifesto of the NSDAP published in February 1920 by Drexler and Hitler, combining fierce nationalism, racial antisemitism, and socialist economic promises.',
      q: 'What was the 25-Point Programme of February 1920?',
      a: 'The political manifesto of the NSDAP combining fierce nationalism, the destruction of the Versailles Treaty, racial antisemitism, and socialist economic promises.',
    },
    {
      term: 'NSDAP',
      definition:
        "National Socialist German Workers' Party (Nationalsozialistische Deutsche Arbeiterpartei), renamed from the DAP in August 1920 to broaden its mass appeal.",
      q: 'What did NSDAP stand for, and when was the party renamed?',
      a: "National Socialist German Workers' Party; renamed in August 1920 to appeal to both nationalist and working-class Germans.",
    },
    {
      term: 'SA (Sturmabteilung / Brownshirts)',
      definition:
        'The paramilitary wing of the Nazi Party formed in August 1921, led by Ernst Röhm, used to intimidate political rivals and protect Nazi meetings.',
      q: 'Who were the SA, and what was their role in the early Nazi Party?',
      a: 'The paramilitary Brownshirts led by Ernst Röhm, used to intimidate political opponents (especially Communists) and guard Nazi meetings.',
    },
    {
      term: 'Führerprinzip',
      definition:
        "The 'leadership principle' established in the party in July 1921, demanding total, unquestioning obedience to Adolf Hitler as absolute leader.",
      q: 'What was the Führerprinzip?',
      a: 'The leadership principle placing total authority in Adolf Hitler, requiring complete obedience from all party members.',
    },
    {
      term: 'Völkischer Beobachter',
      definition:
        'The official Nazi Party newspaper purchased in December 1920 to spread party propaganda, antisemitism, and speeches across Bavaria.',
      q: 'What was the Völkischer Beobachter?',
      a: 'The official daily newspaper of the Nazi Party, used from December 1920 to spread propaganda and party ideology.',
    },
    {
      term: 'Swastika (Hakenkreuz)',
      definition:
        'The hooked cross adopted by Hitler in 1920 as the official emblem of the Nazi Party, symbolizing Aryan struggle and racial purity.',
      q: 'Why did the Nazi Party adopt the swastika emblem?',
      a: 'Adopted in 1920 as the official Nazi symbol representing the struggle for Aryan racial dominance.',
    },
  ],

  lesson_2_2: [
    {
      term: 'Munich Putsch (Beer Hall Putsch)',
      definition:
        "Hitler's failed armed insurrection on 8–9 November 1923 in Munich, attempting to overthrow the Bavarian government and march on Berlin.",
      q: 'What was the Munich Putsch of November 1923?',
      a: 'An armed insurrection by Hitler, Ludendorff, and the SA in Munich to overthrow the government, which was crushed by Bavarian police.',
    },
    {
      term: 'General Erich Ludendorff',
      definition:
        'A revered First World War military commander who allied with Hitler during the Munich Putsch to lend national legitimacy to the coup.',
      q: 'Who was General Erich Ludendorff, and why was he significant in 1923?',
      a: 'A famous WW1 general who partnered with Hitler during the Munich Putsch to give the insurrection military prestige.',
    },
    {
      term: 'Landsberg Prison',
      definition:
        'The comfortable Bavarian fortress where Hitler served just 9 months of a 5-year sentence for high treason following his 1924 trial.',
      q: 'What happened to Hitler at Landsberg Prison in 1924?',
      a: 'He served 9 months of a lenient 5-year sentence for high treason, using the time to dictate Mein Kampf to Rudolf Hess.',
    },
    {
      term: "Mein Kampf ('My Struggle')",
      definition:
        "Hitler's autobiographical ideological manifesto dictated in 1924, outlining his core beliefs: Lebensraum, Aryan racial supremacy, and anti-Bolshevism.",
      q: 'What key ideas were set out in Mein Kampf?',
      a: 'Aryan racial supremacy, antisemitism, the destruction of the Treaty of Versailles, and Lebensraum (living space in Eastern Europe).',
    },
    {
      term: 'Bamberg Conference (1926)',
      definition:
        'A crucial party congress where Hitler crushed the socialist, anti-capitalist northern faction led by Gregor Strasser and reasserted total control.',
      q: 'What was the significance of the 1926 Bamberg Conference?',
      a: 'Hitler defeated the northern socialist wing of the Nazi Party and established undisputed personal leadership (Führerprinzip).',
    },
    {
      term: 'SS (Schutzstaffel / Blackshirts)',
      definition:
        "Hitler's elite, fanatical personal bodyguard unit formed in 1925, commanded by Heinrich Himmler from 1929.",
      q: 'What was the SS, and who became its leader in 1929?',
      a: "An elite paramilitary protection squadron formed as Hitler's personal bodyguard, led by Heinrich Himmler from 1929.",
    },
    {
      term: 'Lean Years (1924–1929)',
      definition:
        "The period when the Nazi Party won minimal electoral success (just 2.6% of votes in May 1928) due to Weimar's economic recovery under Stresemann.",
      q: "Why were the years 1924–1929 known as the 'Lean Years' for the Nazis?",
      a: "Stresemann's economic recovery reduced public radicalism, leaving the Nazis with only 12 Reichstag seats (2.6%) in 1928.",
    },
  ],

  lesson_2_3: [
    {
      term: 'Wall Street Crash (October 1929)',
      definition:
        'The catastrophic collapse of the US stock market that triggered the worldwide Great Depression and led American banks to recall their loans to Germany.',
      q: 'How did the Wall Street Crash of October 1929 impact Germany?',
      a: 'US banks abruptly recalled short-term Dawes Plan loans, plunging the German banking system into crisis and causing mass unemployment.',
    },
    {
      term: 'Mass Unemployment (6 Million)',
      definition:
        'By January 1933, over 6 million German workers were officially registered as unemployed, creating widespread destitution and radicalizing voters.',
      q: 'How high did German unemployment rise by early 1933?',
      a: 'Over 6 million workers (nearly 33% of the workforce) were officially unemployed by January 1933.',
    },
    {
      term: "Heinrich Brüning ('The Hunger Chancellor')",
      definition:
        'The Centre Party Chancellor (1930–1932) who introduced deeply unpopular austerity measures, cut welfare benefits, and governed using Article 48.',
      q: "Why was Chancellor Heinrich Brüning nicknamed the 'Hunger Chancellor'?",
      a: 'He cut government spending, reduced unemployment benefits, and increased taxes during the depth of the Depression.',
    },
    {
      term: 'Article 48 Abuse',
      definition:
        'The emergency decree clause of the Weimar Constitution used 66 times in 1932 by Brüning and Hindenburg, effectively bypassing the democratic Reichstag.',
      q: 'How was Article 48 used during the Great Depression?',
      a: 'Because coalition governments collapsed, Chancellor Brüning relied on President Hindenburg to pass laws by presidential decree rather than Reichstag votes.',
    },
    {
      term: 'KPD (Communist Party of Germany)',
      definition:
        'The revolutionary Marxist party that won 100 Reichstag seats in November 1932, terrifying middle-class Germans and industrial capitalists.',
      q: 'Why did the growth of the KPD benefit the Nazi Party?',
      a: 'Fear of a violent Communist revolution drove terrified business owners, landowners, and the middle class into supporting the Nazis.',
    },
    {
      term: 'Negative Cohesion',
      definition:
        "Historian Richard Bessel's concept that people supported the Nazis not because of shared ideology, but out of shared hatred for Communism, democracy, and Versailles.",
      q: "What is meant by the historical concept of 'negative cohesion'?",
      a: 'Voters backed the Nazis not from genuine ideological belief, but because they shared common enemies: Communism, Weimar weakness, and Jews.',
    },
    {
      term: 'July 1932 Reichstag Election',
      definition:
        'The election in which the NSDAP became the largest party in the Reichstag, winning 230 seats (37.3% of the vote).',
      q: 'What was the result of the July 1932 Reichstag election for the Nazis?',
      a: 'The Nazis won 230 seats (37.3%), making them the largest political party in the Reichstag.',
    },
  ],

  lesson_2_4: [
    {
      term: 'President Paul von Hindenburg',
      definition:
        'The conservative, aristocratic WW1 Field Marshal who served as German President (1925–1934) and held the constitutional power to appoint the Chancellor.',
      q: "What role did President Paul von Hindenburg play in Hitler's appointment?",
      a: 'As President, Hindenburg held the constitutional power under Article 53 to appoint the Chancellor, finally yielding to Hitler on 30 January 1933.',
    },
    {
      term: 'Franz von Papen',
      definition:
        "Aristocratic Centre Party politician and Chancellor in 1932 who plotted with Hindenburg's camarilla to install Hitler as Chancellor in order to control him.",
      q: "What was Franz von Papen's plan regarding Hitler in January 1933?",
      a: "To make Hitler Chancellor with Papen as Vice-Chancellor, believing they could 'box him into a corner' and use him as a puppet.",
    },
    {
      term: 'Kurt von Schleicher',
      definition:
        'Army general and Chancellor (Dec 1932–Jan 1933) whose attempts to split the Nazi Party failed, leading to his dismissal and intense rivalry with Papen.',
      q: 'Why did Kurt von Schleicher fail as Chancellor in January 1933?',
      a: 'He failed to form a working majority in the Reichstag or divide the Nazis, leading Hindenburg to replace him with Hitler.',
    },
    {
      term: 'The Presidential Camarilla',
      definition:
        'A small inner circle of elite aristocratic advisers around Hindenburg, including his son Oskar and state secretary Otto Meissner, who manipulated appointments.',
      q: "What was the 'Camarilla' in Weimar Germany?",
      a: 'A small, unaccountable group of aristocratic advisers around President Hindenburg who orchestrated backstairs political intrigues.',
    },
    {
      term: '30 January 1933',
      definition:
        'The date Adolf Hitler was formally sworn in as Chancellor of Germany by President Hindenburg, leading a coalition cabinet with only 3 Nazi ministers.',
      q: 'What historic event occurred on 30 January 1933?',
      a: 'Adolf Hitler was formally appointed Chancellor of Germany by President Hindenburg at the head of a nationalist coalition government.',
    },
    {
      term: 'November 1932 Election Setback',
      definition:
        "The election where Nazi seats dropped from 230 to 196 (33.1%), leading Papen to mistakenly believe Hitler's momentum was fading and could be managed.",
      q: "Why was the November 1932 election significant for Hitler's strategy?",
      a: 'The Nazis lost 34 seats and funds ran low, convincing Papen and the elites that Hitler had peaked and was desperate enough to be controlled.',
    },
  ],

  lesson_3_1: [
    {
      term: 'Reichstag Fire (27 February 1933)',
      definition:
        'The arson destruction of the German parliament building, blamed on Dutch Communist Marinus van der Lubbe, used by Hitler to crush political opponents.',
      q: 'What was the Reichstag Fire of 27 February 1933?',
      a: 'An arson attack on the parliament building used by the Nazis as an emergency pretext to arrest Communists and suspend civil liberties.',
    },
    {
      term: 'Reichstag Fire Decree (28 February 1933)',
      definition:
        'Presidential emergency decree signed by Hindenburg that indefinitely suspended fundamental civil liberties, including freedom of speech, assembly, and the press.',
      q: 'What did the Reichstag Fire Decree of 28 February 1933 do?',
      a: 'It suspended fundamental civil rights, allowed indefinite detention without trial, and legalized Nazi censorship and police raids.',
    },
    {
      term: 'The Enabling Act (23 March 1933)',
      definition:
        'Constitutional amendment passed by the Reichstag (444 to 94 votes) granting Hitler the power to enact laws without Reichstag or Presidential approval for 4 years.',
      q: 'Why was the Enabling Act of March 1933 so decisive?',
      a: 'It gave Hitler the dictatorial power to pass laws without the Reichstag or President, dismantling constitutional democracy.',
    },
    {
      term: "Gleichschaltung ('Coordination')",
      definition:
        'The Nazi policy of forcibly bringing all German political, social, civic, and economic institutions under total Nazi control between 1933 and 1934.',
      q: 'What does the term Gleichschaltung mean?',
      a: "The systematic Nazi policy of 'coordination', forcing all state institutions, trade unions, and political parties under Nazi control.",
    },
    {
      term: 'Abolition of Trade Unions (2 May 1933)',
      definition:
        'SA and police seized trade union offices across Germany, arrested union leaders, and forced all workers into the Nazi-controlled German Labour Front (DAF).',
      q: 'How did the Nazis eliminate independent trade unions in May 1933?',
      a: 'They raided union headquarters on 2 May 1933, arrested union bosses, confiscated their funds, and replaced them with the DAF.',
    },
    {
      term: 'Night of the Long Knives (30 June 1934)',
      definition:
        "Hitler's purge of the SA leadership, executing Ernst Röhm and approximately 400 political rivals using the SS, securing the loyalty of the German regular army.",
      q: 'What was the Night of the Long Knives (June 1934)?',
      a: 'A violent purge where Hitler and the SS murdered Ernst Röhm and top SA commanders to win the total support of the German military.',
    },
    {
      term: 'Führer and Reich Chancellor (August 1934)',
      definition:
        "Following Hindenburg's death on 2 August 1934, Hitler merged the offices of Chancellor and President, requiring all soldiers to swear a personal oath of loyalty to him.",
      q: "How did Hitler become the absolute 'Führer' in August 1934?",
      a: "Upon President Hindenburg's death, Hitler combined the offices of President and Chancellor into one supreme title: Führer.",
    },
  ],

  lesson_3_2: [
    {
      term: 'Gestapo (Geheime Staatspolizei)',
      definition:
        'The Nazi secret state police, established by Hermann Göring in 1933 and led by Reinhard Heydrich, operating entirely outside the legal court system.',
      q: 'What was the Gestapo, and who commanded it?',
      a: 'The non-uniformed secret state police led by Reinhard Heydrich, operating without legal restraint to arrest and interrogate dissidents.',
    },
    {
      term: 'SD (Sicherheitsdienst)',
      definition:
        'The internal intelligence service of the SS founded in 1931 by Heinrich Himmler and run by Reinhard Heydrich to spy on party members and the public.',
      q: 'What was the role of the SD in Nazi Germany?',
      a: 'The security intelligence agency of the SS, responsible for gathering intelligence on political opponents and monitoring public morale.',
    },
    {
      term: 'Concentration Camps (Dachau)',
      definition:
        "Detention facilities for political prisoners established in March 1933 at Dachau near Munich, guarded by the SS-Totenkopfverbände (Death's Head units).",
      q: 'What was Dachau, opened in March 1933?',
      a: 'The first permanent Nazi concentration camp, established near Munich to detain and brutally re-educate political opponents.',
    },
    {
      term: "Schutzhaft ('Protective Custody')",
      definition:
        'A police procedure allowing the Gestapo to arrest and imprison individuals indefinitely in concentration camps without trial or legal representation.',
      q: 'What was Schutzhaft (protective custody)?',
      a: 'The legal power of the Gestapo to imprison citizens indefinitely without charge, trial, or access to a defense lawyer.',
    },
    {
      term: 'The Reich Concordat (July 1933)',
      definition:
        'An agreement between Hitler and Pope Pius XI: the Catholic Church promised to stay out of German politics, while Hitler promised to protect Catholic schools and worship.',
      q: 'What was agreed in the July 1933 Concordat between Hitler and the Pope?',
      a: 'The Catholic Church agreed not to interfere in politics; in return, Hitler promised religious freedom and protection for Catholic schools.',
    },
    {
      term: 'Reich Church & Ludwig Müller',
      definition:
        'The coordinated pro-Nazi Protestant church body created in 1933, led by Reich Bishop Ludwig Müller, attempting to merge Christianity with Nazi racialism.',
      q: 'What was the Reich Church, and who led it?',
      a: 'The unified Nazi-controlled Protestant church led by Ludwig Müller, which removed Jewish Old Testament texts and displayed swastikas.',
    },
    {
      term: 'Confessional Church & Martin Niemöller',
      definition:
        'A breakaway Protestant church established in 1934 by Pastor Martin Niemöller and Dietrich Bonhoeffer to resist state control and Nazi paganism.',
      q: 'Who was Martin Niemöller, and what was the Confessional Church?',
      a: 'A Protestant pastor who formed the Confessional Church in 1934 to oppose Nazi control over Christianity; he was sent to Dachau in 1938.',
    },
  ],

  lesson_3_3: [
    {
      term: 'Ministry of Public Enlightenment and Propaganda',
      definition:
        'The government ministry created in March 1933, led by Dr Joseph Goebbels, responsible for controlling all media, arts, radio, and culture in Germany.',
      q: 'Who led the Ministry of Public Enlightenment and Propaganda from 1933?',
      a: 'Dr Joseph Goebbels, who controlled all German newspapers, radio, cinema, theatre, music, and art to shape public attitudes.',
    },
    {
      term: "Volksempfänger (People's Receiver 301)",
      definition:
        'An affordable, mass-produced radio subsidized by the state, designed with limited short-wave range to prevent Germans from listening to foreign broadcasts.',
      q: 'What was the Volksempfänger, and why did Goebbels subsidize it?',
      a: 'An inexpensive radio owned by 70% of households by 1939, engineered so ordinary Germans could not tune into foreign stations.',
    },
    {
      term: 'Reich Chamber of Culture (Reichskulturkammer)',
      definition:
        'An umbrella organization established in September 1933 to enforce strict censorship across seven arts chambers: press, radio, literature, theatre, art, music, and film.',
      q: 'What was the Reich Chamber of Culture?',
      a: "Goebbels' regulatory agency that forced all creative artists, journalists, and musicians to register and produce only pro-Nazi works.",
    },
    {
      term: "Entartete Kunst ('Degenerate Art')",
      definition:
        "Modern, expressionist, abstract, or Jewish artwork banned by the Nazis as 'un-German' and exhibited in Munich in 1937 to be publicly ridiculed.",
      q: 'What was Entartete Kunst (Degenerate Art)?',
      a: 'Modernist and Jewish art, such as cubism and expressionism, banned by the Nazis and mocked in a 1937 Munich exhibition.',
    },
    {
      term: 'Nuremberg Rallies',
      definition:
        'Massive annual Nazi Party propaganda spectacles held every September in Nuremberg, utilizing giant searchlights, swastika banners, and military parades.',
      q: 'What was the purpose of the annual Nuremberg Rallies?',
      a: 'Massive annual propaganda rallies designed to display Nazi power, discipline, and unity, attended by hundreds of thousands of supporters.',
    },
    {
      term: 'Berlin Olympic Games (1936)',
      definition:
        'International sports showcase exploited by Goebbels to present a modern, prosperous, and civilized Germany to foreign visitors while temporarily downplaying antisemitism.',
      q: 'How did the Nazis exploit the 1936 Berlin Olympics?',
      a: 'They built a 100,000-seater stadium and paused overt antisemitism to impress international visitors with Nazi efficiency.',
    },
  ],

  lesson_3_4: [
    {
      term: 'Edelweiss Pirates (Edelweisspiraten)',
      definition:
        'A working-class youth rebellion movement in western cities who wore edelweiss badges, mocked the Hitler Youth, beat up Nazi patrols, and listened to forbidden music.',
      q: 'Who were the Edelweiss Pirates, and how did they resist the Nazis?',
      a: 'Working-class teenagers who wore check shirts and edelweiss flowers, skipped Hitler Youth drills, and beat up HJ members.',
    },
    {
      term: 'Swing Youth (Swingjugend)',
      definition:
        'Middle- and upper-class teenagers in cities like Hamburg and Berlin who rejected Nazi regimentation to listen to banned American jazz and swing music.',
      q: 'How did the Swing Youth resist Nazi social controls?',
      a: 'Middle-class teenagers who defied Nazi rules by dancing to illegal American swing and jazz music and dressing in English-style clothes.',
    },
    {
      term: 'Sopade Reports',
      definition:
        'Underground intelligence reports compiled by exiled Social Democratic Party (SPD) agents in Prague, documenting working-class discontent inside Nazi Germany.',
      q: 'What were the Sopade Reports?',
      a: 'Secret intelligence reports gathered by underground SPD networks describing public dissatisfaction, strikes, and grumbling inside Germany.',
    },
    {
      term: 'Passive Resistance',
      definition:
        "Non-violent opposition such as working slowly, feigning illness, telling anti-Hitler jokes, refusing the 'Heil Hitler' salute, or buying from Jewish shops.",
      q: 'Give examples of passive resistance in Nazi Germany.',
      a: 'Telling political jokes (flüsterwitze), refusing the Nazi salute, taking sick leave from factories, and listening to the BBC.',
    },
    {
      term: 'Bishop Clemens von Galen',
      definition:
        'The Catholic Bishop of Münster who openly spoke out against Nazi sterilisation and the secret Aktion T4 euthanasia programme from his pulpit.',
      q: 'Who was Bishop Clemens von Galen, and what did he protest?',
      a: 'The Catholic Bishop of Münster who publicly delivered brave sermons in 1941 condemning the Nazi secret euthanasia programme.',
    },
    {
      term: "Pastors' Emergency League (PEL)",
      definition:
        'An organization formed by Martin Niemöller in September 1933 to oppose the state-run Reich Church and protest the banning of Jewish converts from the ministry.',
      q: "What was the Pastors' Emergency League of 1933?",
      a: 'A group of 6,000 Christian ministers formed by Martin Niemöller to resist the Nazification of the Protestant Church.',
    },
  ],

  lesson_4_1: [
    {
      term: 'Kinder, Küche, Kirche',
      definition:
        "The core Nazi propaganda slogan ('Children, Kitchen, Church') defining a German woman's traditional, subordinate role in the Third Reich.",
      q: "What did the Nazi slogan 'Kinder, Küche, Kirche' mean?",
      a: 'Children, Kitchen, Church; the core propaganda doctrine prescribing that women should focus solely on domestic life and childbearing.',
    },
    {
      term: 'Law for the Encouragement of Marriage (1933)',
      definition:
        'A policy giving newlyweds a government loan of 1,000 Marks; for each child born, 250 Marks (25%) of the loan was wiped clean.',
      q: 'How did the 1933 Law for the Encouragement of Marriage promote births?',
      a: 'Provided marriage loans of 1,000 Marks; having four children completely cleared the loan repayment (25% off per child).',
    },
    {
      term: "The Mother's Cross (Mutterkreuz)",
      definition:
        "An annual medal awarded on 12 August (Hitler's mother's birthday): Bronze for 4–5 children, Silver for 6–7, and Gold for 8 or more children.",
      q: "What was the Mother's Cross, and what were its tiers?",
      a: 'A state medal rewarding motherhood: Bronze for 4–5 children, Silver for 6–7 children, and Gold for 8 or more children.',
    },
    {
      term: "Lebensborn ('Spring of Life')",
      definition:
        "A programme founded by Heinrich Himmler in 1935 encouraging racially 'pure' unmarried women to breed with SS officers in special maternity homes.",
      q: 'What was the Lebensborn programme founded in 1935?',
      a: 'An SS programme providing maternity homes for racially screened women to bear children fathered by SS men to increase the Aryan population.',
    },
    {
      term: 'Gertrud Scholtz-Klink',
      definition:
        'Appointed Reich Women’s Leader in 1934 to head the Deutsches Frauenwerk, coordinating all German women under Nazi domestic ideology.',
      q: 'Who was Gertrud Scholtz-Klink?',
      a: "The Reich Women's Leader who oversaw all female organizations and promoted Nazi domestic values across Germany.",
    },
    {
      term: 'Removal from the Professions',
      definition:
        'From 1933, female civil servants, doctors, and lawyers were dismissed from public service, and female university admissions were capped at 10%.',
      q: 'How did the Nazis limit female employment between 1933 and 1936?',
      a: 'They sacked female doctors, lawyers, and judges, banned married women from civil service jobs, and capped female university students at 10%.',
    },
  ],

  lesson_4_2: [
    {
      term: 'Hitler Youth (Hitlerjugend / HJ)',
      definition:
        'The compulsory Nazi youth organization for boys aged 14–18, designed to prepare young Germans for military service through drills, camping, and weapons training.',
      q: 'What was the purpose of the Hitler Youth (HJ)?',
      a: 'To indoctrinate boys aged 14–18 with Nazi ideology and train them for military service through rigorous physical and military drills.',
    },
    {
      term: 'League of German Girls (Bund Deutscher Mädel / BDM)',
      definition:
        'The sister organization to the Hitler Youth for girls aged 14–18, focusing on physical fitness, domestic crafts, and preparing for Aryan motherhood.',
      q: 'What was the role of the League of German Girls (BDM)?',
      a: 'To train teenage girls aged 14–18 in domestic duties, childcare, racial awareness, and physical fitness for motherhood.',
    },
    {
      term: 'Hitler Youth Law (1936 & 1939)',
      definition:
        'Legislation giving the Hitler Youth equal status to school in 1936, followed by a March 1939 law making membership strictly compulsory for all eligible 10–18 year olds.',
      q: 'When was Hitler Youth membership made compulsory?',
      a: 'In March 1939, membership was made compulsory for all eligible German boys and girls aged 10 to 18.',
    },
    {
      term: "National Socialist Teachers' League (NSLB)",
      definition:
        'The Nazi professional union that all teachers were forced to join by 1937, requiring them to take an oath of loyalty to Hitler and teach Nazi racial doctrines.',
      q: "What was the National Socialist Teachers' League (NSLB)?",
      a: "The mandatory teachers' union; by 1937, 97% of teachers joined, swearing loyalty oaths to Hitler and teaching Nazi curricula.",
    },
    {
      term: 'Curriculum Nazification',
      definition:
        'Schools prioritized Physical Education (15% of time), Eugenics (Race Studies), German History (stab-in-the-back myth), and militarized Mathematics.',
      q: 'How was the school curriculum altered under Nazi rule?',
      a: 'Schools emphasized PE, Eugenics (racial theory), German folklore, and military math problems, while sidelining academic subjects.',
    },
    {
      term: 'Adolf Hitler Schools & Napolas',
      definition:
        'Elite military boarding schools run by the SS and SA to train future military officers and political leaders under extreme physical and ideological discipline.',
      q: 'What were Napolas and Adolf Hitler Schools?',
      a: 'Elite boarding schools run by the SS to train selected boys as future military officers and Nazi political leaders.',
    },
  ],

  lesson_4_3: [
    {
      term: 'National Labour Service (RAD)',
      definition:
        'A public works scheme made compulsory in 1935 for all men aged 18–25 for 6 months, performing manual labour such as draining marshes and planting forests.',
      q: 'What was the RAD (National Labour Service)?',
      a: 'A compulsory scheme from 1935 forcing young men aged 18–25 to complete 6 months of manual labour in military-style camps.',
    },
    {
      term: 'Autobahn Construction',
      definition:
        'A massive public motorway construction scheme begun in September 1933, creating 7,000 kilometres of highway and employing over 125,000 workers directly.',
      q: 'How did Autobahn construction reduce unemployment in the 1930s?',
      a: 'It created thousands of construction jobs, stimulated the steel and concrete industries, and modernized German transport.',
    },
    {
      term: 'Invisible Unemployment',
      definition:
        'The official manipulation of unemployment statistics by excluding Jews, women who left jobs, political prisoners in camps, and men conscripted into the RAD.',
      q: "What was 'invisible unemployment' in Nazi Germany?",
      a: 'Unemployed people omitted from official statistics, such as Jews, dismissed married women, unmarried men in the RAD, and camp prisoners.',
    },
    {
      term: 'German Labour Front (DAF)',
      definition:
        "The monopolistic Nazi workers' organization run by Robert Ley that replaced trade unions, strictly controlling wages, working hours, and workbooks.",
      q: 'What was the DAF led by Robert Ley?',
      a: 'The single state trade union replacing all independent unions, controlling working hours, discipline, and banning all strikes.',
    },
    {
      term: 'Strength Through Joy (Kraft durch Freude / KdF)',
      definition:
        'A DAF sub-organization offering subsidized leisure activities, theatre tickets, sports events, and cheap cruise ship holidays to keep workers motivated.',
      q: 'What was Strength Through Joy (KdF)?',
      a: 'A DAF division offering subsidized holidays, cruises, theatre tickets, and sports to reward hardworking German workers.',
    },
    {
      term: 'Beauty of Labour (Schönheit der Arbeit / SdA)',
      definition:
        'A branch of the DAF aimed at improving factory working conditions, such as building cleaner canteens, better ventilation, and washing facilities (often built by workers unpaid).',
      q: 'What was the Beauty of Labour (SdA)?',
      a: 'An initiative to improve workplace conditions with better lighting and canteens, though workers often carried out improvements unpaid.',
    },
    {
      term: 'Autarky & The Four-Year Plan (1936)',
      definition:
        "Hermann Göring's economic plan to achieve complete national self-sufficiency (Autarky) and prepare the German economy and military for war within four years.",
      q: 'What was the goal of the 1936 Four-Year Plan led by Göring?',
      a: 'To achieve economic self-sufficiency (Autarky), expand synthetic fuel and rubber production, and prepare the military for war within four years.',
    },
  ],

  lesson_4_4: [
    {
      term: "Volksgemeinschaft ('People's Community')",
      definition:
        'The Nazi ideal of a racially unified, classless national community of pure Aryan Germans that excluded Jews, Roma, disabled people, and political dissidents.',
      q: 'What was the concept of the Volksgemeinschaft?',
      a: "A racially pure, classless German 'people's community' that strictly excluded non-Aryans, asocials, and biological minorities.",
    },
    {
      term: 'April 1933 Boycott',
      definition:
        'The first nationwide state-sponsored action against German Jews on 1 April 1933: a one-day boycott of Jewish-owned shops, doctors, and lawyers by the SA.',
      q: 'What occurred on 1 April 1933 in Nazi Germany?',
      a: 'A nationwide one-day boycott of Jewish shops, businesses, doctors, and lawyers enforced by the SA.',
    },
    {
      term: 'Nuremberg Laws (September 1935)',
      definition:
        'Antisemitic laws that stripped German Jews of citizenship (Reich Citizenship Law) and outlawed marriage and sexual relations between Jews and Aryans (Blood Protection Law).',
      q: 'What were the key provisions of the 1935 Nuremberg Laws?',
      a: 'Stripped Jews of German citizenship and civil rights, and banned marriages and sexual relations between Jews and non-Jewish Germans.',
    },
    {
      term: 'Kristallnacht (Night of Broken Glass, 9–10 November 1938)',
      definition:
        'A coordinated nationwide pogrom where the SA and SS burned over 1,000 synagogues, trashed 7,000 Jewish businesses, murdered 91 Jews, and sent 30,000 to concentration camps.',
      q: 'What happened during Kristallnacht on 9–10 November 1938?',
      a: 'A state-orchestrated pogrom that destroyed over 1,000 synagogues, wrecked 7,000 Jewish shops, killed 91 Jews, and sent 30,000 to camps.',
    },
    {
      term: 'Prevention of Hereditarily Diseased Offspring Law (1933)',
      definition:
        'A law allowing compulsory sterilisation of individuals with alleged genetic conditions (including mental illness, epilepsy, deafness, blindness, and alcoholism); ~400,000 were sterilised.',
      q: 'What was the 1933 Sterilisation Law?',
      a: 'A law legalizing the forced sterilisation of around 400,000 citizens diagnosed with alleged hereditary illnesses or disabilities.',
    },
    {
      term: 'Aktion T4 Euthanasia Programme',
      definition:
        'The clandestine Nazi programme begun in 1939 that murdered over 70,000 physically disabled and mentally ill German children and adults using carbon monoxide gas.',
      q: 'What was the secret Aktion T4 programme?',
      a: 'The secret Nazi euthanasia programme that murdered over 70,000 disabled and mentally ill Germans in specialised gas chambers.',
    },
    {
      term: 'Persecution of the Roma and Sinti',
      definition:
        "The racial categorization of Roma and Sinti as 'asocial' and 'racially inferior'; they were registered, subjected to forced sterilisation, and deported to camps.",
      q: 'How did the Nazis persecute the Roma and Sinti peoples?',
      a: 'They were classified as racially inferior, stripped of citizenship under the Nuremberg Laws, sterilised, and deported to camps.',
    },
  ],
};

function backfillWeimarFlashcards() {
  console.log('📦 Backfilling Weimar & Nazi Germany Flashcards (12 Lessons)...');
  const targetFiles = [
    path.join(__dirname, '..', 'public', 'data', 'weimar_nazi_germany.json'),
    path.join(__dirname, '..', 'data', 'weimar_nazi_germany.json'),
  ];

  let totalInjected = 0;

  targetFiles.forEach((fp) => {
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      const lessons = data.data?.lessons || data.lessons || [];

      lessons.forEach((l) => {
        if (WEIMAR_FLASHCARDS[l.id]) {
          l.flashcards = WEIMAR_FLASHCARDS[l.id];
          totalInjected += l.flashcards.length;
        }
      });

      fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✔ Injected flashcards into ${fp}`);
    }
  });

  // Also update units/weimar_nazi_germany/data.js
  const unitJs = path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js');
  if (fs.existsSync(unitJs)) {
    try {
      const pubData = JSON.parse(fs.readFileSync(targetFiles[0], 'utf8'));
      const unitObj = pubData.data || pubData;
      const jsContent = `export default ${JSON.stringify(unitObj, null, 2)};\n`;
      fs.writeFileSync(unitJs, jsContent, 'utf8');
      console.log(`  ✔ Injected flashcards into units/weimar_nazi_germany/data.js`);
    } catch (err) {
      console.warn(`  ⚠️ Could not update units/weimar_nazi_germany/data.js: ${err.message}`);
    }
  }

  console.log(
    `✅ Weimar & Nazi Germany: Injected ${totalInjected / 2} flashcards across 12 lessons.`,
  );
}

if (require.main === module) {
  backfillWeimarFlashcards();
}

module.exports = { backfillWeimarFlashcards, WEIMAR_FLASHCARDS };
