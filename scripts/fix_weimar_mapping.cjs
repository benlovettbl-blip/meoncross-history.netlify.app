const fs = require('fs');
const path = require('path');

function parseDurationSecs(dur) {
  if (!dur) return 999999;
  let secs = 0;
  const hrMatch = dur.match(/(\d+)\s*hr/i);
  const minMatch = dur.match(/(\d+)\s*min/i);
  const secMatch = dur.match(/(\d+)\s*sec/i);
  if (hrMatch) secs += parseInt(hrMatch[1], 10) * 3600;
  if (minMatch) secs += parseInt(minMatch[1], 10) * 60;
  if (secMatch) secs += parseInt(secMatch[1], 10);
  return secs > 0 ? secs : 999999;
}

const weimarPedagogyByLesson = {
  // L1
  1: [
    {
      task: "How did the Kiel naval mutiny and domestic collapse force Kaiser Wilhelm II to abdicate on 9 November 1918, and why did the 'stab-in-the-back' myth emerge?",
      answer:
        "By late October 1918, German military collapse was imminent. When naval commanders ordered a suicidal sortie against the Royal Navy, sailors at Kiel mutinied, sparking workers' and soldiers' councils across Germany. With Berlin gripped by general strikes, Kaiser Wilhelm II abdicated and fled to Holland on 9 November, allowing SPD leader Friedrich Ebert to proclaim a democratic republic. Field Marshal Hindenburg and nationalist generals quickly claimed that the undefeated army had been 'stabbed in the back' (Dolchstoßlegende) on the home front by socialists, pacifists, and Jews ('November Criminals') who signed the 11 November Armistice.",
    },
    {
      task: "What punitive territorial, military, and financial terms were imposed on Germany in the Treaty of Versailles, and why was it universally condemned as a 'Diktat'?",
      answer:
        "Signed under threat of Allied invasion on 28 June 1919, Versailles stripped Germany of 13% of its European territory (Alsace-Lorraine to France, Eupen-Malmedy to Belgium, the Polish Corridor to Poland, and all overseas colonies). Militarily, the army was capped at 100,000 volunteers, conscription was abolished, tanks, warplanes, and submarines were banned, and the Rhineland was demilitarised. Financially, Article 231 (the War Guilt Clause) forced Germany to accept total blame, saddling the new republic with astronomical reparations of £6.6 billion (132 billion gold marks), which Germans universally condemned as an dictated peace ('Diktat').",
    },
  ],
  // L2
  2: [
    {
      task: 'Why did Friedrich Ebert rely on the right-wing Freikorps to crush the Spartacist Uprising in January 1919, and what threat did the Freikorps pose during the 1920 Kapp Putsch?',
      answer:
        "In January 1919, the Communist Spartacist League (led by Karl Liebknecht and Rosa Luxemburg) launched an armed revolution to overthrow Ebert's government. Lacking regular troops, Defence Minister Noske deployed the Freikorps—heavily armed, demobilised nationalist soldiers who brutally suppressed the uprising and murdered Luxemburg and Liebknecht. However, the Freikorps' loyalty was temporary: when the government attempted to disband them in March 1920 under Versailles terms, 5,000 Freikorps troops marched on Berlin under Wolfgang Kapp, forcing the government to flee and demonstrating that the German army would not defend the republic ('Troops do not fire on troops').",
    },
    {
      task: 'How did the French invasion of the Ruhr in January 1923 trigger catastrophic hyperinflation, and which social classes suffered the greatest economic ruin?',
      answer:
        "When Germany defaulted on reparations deliveries in late 1922, 60,000 French and Belgian troops occupied the industrial Ruhr valley to seize coal and timber. The Weimar government called for 'passive resistance' (general strike) while paying striking workers by running state printing presses day and night. Flooding the market with unbacked paper currency caused the mark's value to collapse completely (a loaf of bread reached 201 billion marks in November 1923). While industrialists with heavy debts paid them off cheaply, the patriotic middle classes (Mittelstand), pensioners, and savers saw their life savings, war bonds, and pensions utterly wiped out, alienating them permanently from democratic Weimar institutions.",
    },
  ],
  // L3
  3: [
    {
      task: "What diplomatic and economic measures did Gustav Stresemann implement between 1923 and 1929 to stabilize Germany's economy and restore international status?",
      answer:
        "As Chancellor and Foreign Minister, Gustav Stresemann ended passive resistance, burned the worthless marks, and introduced the Rentenmark (backed by agricultural land and industrial gold). In 1924, he negotiated the Dawes Plan, securing an 800 million mark loan from US financiers and scaling annual reparations to Germany's economic capacity. Diplomatically, Stresemann signed the 1925 Locarno Treaties guaranteeing Germany's western borders, brought Germany into the League of Nations with a permanent council seat in 1926, and negotiated the 1929 Young Plan, which reduced total reparations to £2 billion and scheduled Allied evacuation of the Rhineland.",
    },
    {
      task: "Why did Stresemann famously warn that Germany was 'dancing on a volcano', and what fundamental economic vulnerabilities remained beneath Weimar's Golden Twenties?",
      answer:
        "Stresemann recognized that Weimar's apparent prosperity was fundamentally fragile because it was funded almost entirely by short-term American loans. If Wall Street recalled those loans, the German economy would collapse instantly. Furthermore, German agriculture was in deep recession throughout the 1920s due to falling global grain prices, small businesses struggled against high interest rates, unemployment never dipped below 1.3 million, and political coalitions remained unstable, with radical parties (Nazis and Communists) quietly preparing for the next inevitable crisis.",
    },
  ],
  // L4
  4: [
    {
      task: 'What social gains were achieved by German workers and women under the Weimar Constitution, and why did conservative traditionalists react with hostility?',
      answer:
        "Under the Weimar Republic, industrial workers gained an eight-hour working day, legal recognition of trade unions, expanded state health insurance, and over two million modern social housing apartments built by local councils. Women gained full voting rights (Article 109), equality in education, and emerged as the financially independent 'New Woman' (neue Frau) with bobbed hair, modern fashion, and professional careers. However, traditionalists, the Catholic Church, and right-wing nationalists condemned these changes as moral decadence that destroyed traditional family values and promoted Americanized materialism.",
    },
    {
      task: 'How did Weimar avant-garde movements like the Bauhaus school, Neue Sachlichkeit painting, and Berlin cabaret culture challenge traditional German values?',
      answer:
        "Weimar culture flourished under unrestricted democratic freedom: Walter Gropius founded the Bauhaus school of architecture, rejecting ornate imperial decoration in favour of sleek, functional modernist design ('form follows function'). Painters like Otto Dix and George Grosz created brutally honest 'New Objectivity' (Neue Sachlichkeit) art depicting scarred war veterans, greedy industrialists, and urban poverty. In Berlin, world-famous cabarets explored satirical political critique and sexual freedom. Right-wing conservatives denounced this flourishing as 'degenerate art' (Entartete Kunst) that poisoned traditional German culture.",
    },
  ],
  // L5
  5: [
    {
      task: "How did Adolf Hitler transform Anton Drexler's tiny German Workers' Party (DAP) into the National Socialist German Workers' Party (NSDAP) by 1921?",
      answer:
        "Hitler joined the tiny 54-member German Workers' Party (DAP) in Munich in September 1919 as an army intelligence agent, but quickly discovered his magnetic gift for public oratory. In February 1920, Hitler and Drexler announced the 25-Point Programme combining virulent anti-Semitism, anti-capitalism, and hatred of Versailles. Hitler renamed the party the NSDAP, adopted the striking red banner with the black swastika emblem, purchased the newspaper Völkischer Beobachter, and ousted Drexler in July 1921 to become party chairman with dictatorial authority under the Führerprinzip.",
    },
    {
      task: "What role did Ernst Röhm and the Sturmabteilung (SA 'Brownshirts') play in enforcing Nazi power on the streets of Bavaria between 1921 and 1923?",
      answer:
        "Founded in 1921 under ex-soldier Ernst Röhm, the Sturmabteilung (SA) recruited bitter First World War veterans and Freikorps fighters. Dressed in surplus colonial brown shirts, the SA served as Hitler's paramilitary bodyguards, marched in disciplined formations through city streets to project masculine order, distributed propaganda, and used violent intimidation to physically disrupt rival socialist and communist meetings and beat up political opponents, establishing the street violence that characterised the Weimar Republic.",
    },
  ],
  // L6
  6: [
    {
      task: 'Why did Hitler and General Ludendorff launch the Munich Putsch in November 1923, and why did their attempt to march on Berlin collapse in bloody failure?',
      answer:
        "Capitalizing on public outrage over hyperinflation and the end of passive resistance in the Ruhr, Hitler sought to emulate Mussolini's 1922 March on Rome. On 8 November 1923, 600 SA men surrounded Munich's Bürgerbräukeller beer hall, where Bavarian leaders Gustav von Kahr and Otto von Lossow were speaking. At gunpoint, Hitler forced them to support a national coup. However, once released, Kahr alerted Bavarian police and military garrisons. When Hitler and Ludendorff led 2,000 armed SA marchers into central Munich the next morning, police opened fire at the Odeonsplatz, killing 16 Nazis and crushing the rebellion.",
    },
    {
      task: 'How did Hitler turn his 1924 trial for high treason into a propaganda triumph, and what strategic lessons did he learn while imprisoned in Landsberg?',
      answer:
        "Facing charges of high treason, Hitler used the courtroom as a national loudspeaker, presenting himself as a selfless German patriot defending the Fatherland against the treasonous 'November Criminals'. Sympathetic right-wing judges granted him a lenient minimum sentence of five years, of which he served only nine months in comfortable conditions at Landsberg Castle. While in prison, he dictated Mein Kampf (setting out Lebensraum, Aryan supremacy, and anti-Semitism) and concluded that armed revolution was futile: to destroy Weimar democracy, the Nazis had to 'hold our noses and enter the Reichstag' to win power legally through elections.",
    },
  ],
  // L7
  7: [
    {
      task: 'How did the October 1929 Wall Street Crash plunge Germany into mass unemployment, and why did this crisis destroy support for moderate democratic parties?',
      answer:
        'The collapse of the New York stock exchange triggered an immediate recall of American short-term loans under the Dawes Plan, bankrupting major German banks (such as the Danatbank) and shuttering factories. By winter 1932, German unemployment soared past six million (over 30% of the workforce). When Chancellor Heinrich Brüning slashed public spending, unemployment benefits, and pensions while ruling by presidential emergency decree (Article 48), the German public lost faith in democracy. Desperate voters abandoned moderate centrist parties and turned to radical extremes: the Communists for working-class salvation, and the Nazis for national restoration.',
    },
    {
      task: "How did Joseph Goebbels use modern electioneering techniques and the slogan 'Work and Bread' to make the NSDAP the largest party in the Reichstag by July 1932?",
      answer:
        "Appointed Reich Propaganda Leader in 1930, Joseph Goebbels pioneered modern political marketing: he tailored specific messages to target groups (promising farmers agricultural subsidies, the middle class protection against communism, and small shopkeepers protection against department stores). He utilized innovative technology, flying Hitler across Germany in an airplane ('Hitler Over Germany') to address multiple mass rallies in a single day. Goebbels saturated cities with millions of striking posters, gramophone records, and the simple, compelling economic promise 'Arbeit und Brot' (Work and Bread), driving the Nazi vote to 37.3% (230 seats) in July 1932.",
    },
  ],
  // L8
  8: [
    {
      task: "How did the conservative backroom conspiracy between Franz von Papen, General Kurt von Schleicher, and President Hindenburg pave the way for Hitler's appointment as Chancellor?",
      answer:
        "Weimar democracy collapsed into backroom intrigue as aristocratic elites tried to bypass the Reichstag. When General Kurt von Schleicher ousted Franz von Papen as Chancellor in December 1932, Papen sought revenge by secretly meeting Hitler in Cologne. Papen proposed a coalition government where Hitler would serve as Chancellor, with Papen as Vice-Chancellor and only two other Nazis in the cabinet (Frick and Göring). Papen foolishly persuaded the senile 85-year-old President Hindenburg that the conservative majority would control Hitler, famously boasting: 'In two months' time, we will have pushed Hitler so far into a corner that he will squeak!'.",
    },
    {
      task: 'What occurred on 30 January 1933 when Hitler was officially sworn in as Chancellor, and how was this moment commemorated by the SA?',
      answer:
        "On the morning of 30 January 1933, President Hindenburg formally appointed Adolf Hitler Chancellor of Germany at the head of a Nazi-Nationalist coalition. That evening, Joseph Goebbels orchestrated a massive propaganda spectacle: 25,000 uniformed SA stormtroopers carrying flaming torches marched in military columns down Berlin's Unter den Linden and through the Brandenburg Gate, singing Nazi anthems past the window of the Reich Chancellery where Hitler and Hindenburg looked on. This dramatic parade symbolized the end of the democratic republic and the dawn of the Third Reich.",
    },
  ],
  // L9
  9: [
    {
      task: 'How did Hitler exploit the Reichstag Fire of 27 February 1933 and the subsequent Enabling Act to eliminate parliamentary democracy in Germany?',
      answer:
        'When Dutch communist Marinus van der Lubbe was caught at the burning Reichstag on 27 February 1933, Hitler claimed it was the start of an armed communist coup. He persuaded Hindenburg to sign the Emergency Decree for the Protection of People and State, suspending basic civil rights, freedom of speech, assembly, and press, allowing the arrest of 4,000 communists. Following the March election, Hitler held the Reichstag vote on the Enabling Act at the Kroll Opera House, surrounded by intimidating armed SA men. The act passed 444 to 94 (with only the SPD voting against), giving Hitler the legal power to pass laws without parliamentary consent for four years.',
    },
    {
      task: "Why did Hitler order the execution of Ernst Röhm and the SA leadership during the Night of the Long Knives, and what followed Hindenburg's death in August 1934?",
      answer:
        "By summer 1934, Ernst Röhm demanded that his 3-million-strong SA absorb the traditional German Army (Reichswehr) and launch a 'second socialist revolution'. Threatened by Röhm's radicalism, the conservative generals and big industrialists demanded that Hitler rein in the SA. On 30 June 1934 (the Night of the Long Knives), Himmler's SS purged and murdered Röhm and roughly 200 top SA leaders and political rivals (including Schleicher). When President Hindenburg died on 2 August 1934, Hitler merged the offices of Chancellor and President to declare himself 'Führer and Reich Chancellor', and every soldier in the German Army swore a sacred personal oath of unconditional obedience directly to Adolf Hitler.",
    },
  ],
  // L10
  10: [
    {
      task: "How did Heinrich Himmler's SS and Reinhard Heydrich's Gestapo enforce terror and conformity across German society?",
      answer:
        "The Nazi terror state operated through three coordinated police wings under Heinrich Himmler: the Schutzstaffel (SS), which expanded from Hitler's black-shirted bodyguard into an elite racial army that administered the concentration camp system; the Gestapo (Secret State Police), headed by Reinhard Heydrich, which operated with total legal immunity to tap phones, intercept mail, and arrest political suspects under 'protective custody' (Schutzhaft); and the SD (Sicherheitsdienst), which ran domestic intelligence surveillance. In practice, the Gestapo was remarkably small, relying primarily on voluntary denunciations submitted by ordinary German citizens against their neighbours.",
    },
    {
      task: 'How did the establishment of Dachau concentration camp and Nazi religious policies attempt to eliminate institutional opposition?',
      answer:
        "Opened in March 1933 under SS control, Dachau served as the prototype concentration camp for political opponents—initially holding communists, socialists, and trade unionists subjected to hard labour, brutality, and ideological 're-education'. Regarding religion, Hitler sought to neutralize the churches: in July 1933 he signed the Reichskonkordat with the Vatican, promising to protect Catholic schools and youth groups in exchange for political neutrality. When the Nazis violated these promises, Protestant pastors like Martin Niemöller formed the breakaway Confessing Church to oppose state interference, leading to Niemöller's arrest and imprisonment in Sachsenhausen and Dachau.",
    },
  ],
  // L11
  11: [
    {
      task: "How did Joseph Goebbels' Ministry of Propaganda use modern media, radio, and the 'Führer Myth' to control German public opinion?",
      answer:
        "The Reich Ministry of Public Enlightenment and Propaganda placed all culture, press, radio, art, and cinema under strict totalitarian control. Goebbels subsidized the mass production of the cheap 'People's Receiver' radio (Volksempfänger 301), ensuring over 70% of German households owned one by 1939—the highest radio ownership in the world—broadcasting Nazi speeches into homes and factories while banning foreign radio broadcasts. Goebbels cultivated the 'Führer Myth', presenting Hitler not as a partisan politician, but as a superhuman, infallible, and selfless national saviour who worked day and night for the German people.",
    },
    {
      task: 'How did the Nazi regime use the 1936 Berlin Olympics as an international propaganda showcase, and how did Jesse Owens challenge Nazi racial dogma?',
      answer:
        "Hitler used the August 1936 Berlin Olympic Games to present Nazi Germany as a modern, prosperous, and peaceful nation to the international press. Anti-Semitic signs ('Jews Not Wanted') were temporarily removed from Berlin streets, the city was cleaned, and filmmaker Leni Riefenstahl deployed pioneering cinematic techniques to film Olympia. However, Nazi Aryan racial supremacy theories were publicly discredited on the track by African-American athlete Jesse Owens, who won four gold medals (100m, 200m, 4x100m relay, long jump), receiving thunderous ovations from ordinary German spectators.",
    },
  ],
  // L12
  12: [
    {
      task: 'How did the Edelweiss Pirates and the Swing Youth rebel against mandatory Nazi conformity in the late 1930s?',
      answer:
        "Non-conformist youth rebelled against the regimented militarism of the Hitler Youth: the working-class Edelweiss Pirates (Edelweisspiraten) wore casual clothes (checked shirts, edelweiss flower badges), camped in the countryside, sang parodies of Nazi songs, beat up Hitler Youth patrols, and scrawled anti-Nazi graffiti on walls. In contrast, the middle-class 'Swing Youth' (Swingjugend) rebelled culturally by listening to banned American jazz and swing music (condemned as 'Negro music' by Goebbels), growing long hair, wearing English tweed jackets, and dancing in underground clubs.",
    },
    {
      task: 'What forms of moral and religious resistance were mounted by Christian leaders like Martin Niemöller, Dietrich Bonhoeffer, and Bishop Clemens August von Galen?',
      answer:
        "Religious dissenters stood up against Nazi totalitarian control: Protestant Pastor Martin Niemöller founded the Pastors' Emergency League and Confessing Church in 1934 to defend Christian theology against Nazi 'German Christian' pagan heresy, spending 1937–1945 in concentration camps. Theologian Dietrich Bonhoeffer joined the military counter-intelligence (Abwehr) resistance network, helping Jews escape and participating in plots to assassinate Hitler. In 1941, Catholic Bishop Clemens August von Galen delivered outspoken public sermons exposing and condemning the secret Nazi euthanasia programme (Aktion T4) for disabled individuals, forcing Hitler to suspend the public murders.",
    },
  ],
  // L13
  13: [
    {
      task: "How did Nazi policy reverse the Weimar ideal of the 'New Woman', and what incentives were introduced to increase the Aryan birth rate?",
      answer:
        "The Nazi regime firmly rejected the Weimar ideal of the modern, emancipated woman, demanding women adhere to the traditional domestic sphere: 'Kinder, Küche, Kirche' (Children, Kitchen, Church). The Law for the Encouragement of Marriage (June 1933) offered newly married Aryan couples interest-free state loans of 1,000 marks, with 250 marks forgiven for each child born. Women were banned from professional careers in the civil service, judiciary, and medical fields, and discouraged from wearing makeup, smoking, or wearing trousers in public.",
    },
    {
      task: 'How did the Honour Cross of the German Mother and the Lebensborn programme treat motherhood as a vital service to the state?',
      answer:
        "The regime institutionalized childbearing as a military duty: the Honour Cross of the German Mother (Ehrenkreuz der Deutschen Mutter) was awarded annually on Hitler's mother's birthday (12 August) in Bronze (4–5 children), Silver (6–7 children), and Gold (8 or more children), entitling mothers to special privileges such as Hitler Youth members saluting them in public and seat preference on buses. To further expand the master race, SS leader Heinrich Himmler established the Lebensborn programme in 1935, creating maternity homes where racially 'pure' unmarried women were paired with SS officers to breed children for the Reich.",
    },
  ],
  // L14
  14: [
    {
      task: "How did the National Socialist Teachers' League transform the German school curriculum to indoctrinate youth into Nazi racial ideology?",
      answer:
        "Education was completely subordinated to racial indoctrination: all teachers were forced to join the National Socialist Teachers' League (NSLB) and swear an oath to Hitler. School textbooks were rewritten to emphasize German military heroism and the 'stab-in-the-back' myth; Biology was converted into racial theory (Rassenkunde), teaching pupils how to classify skulls, noses, and hair to identify 'Aryan' and 'subhuman' racial types; Maths problems calculated the costs of caring for hereditary disabled patients versus building bombers; and Physical Education was increased to occupy 15% of the timetable to prepare boys for military service.",
    },
    {
      task: 'How did mandatory membership in the Hitler Youth (HJ) and League of German Girls (BDM) prepare boys for the military and girls for motherhood?',
      answer:
        'Under the Hitler Youth Law of 1936 (made strictly compulsory in 1939), all independent youth clubs were banned, bringing 8 million children into Nazi organisations. Boys aged 14–18 joined the Hitler Youth (Hitlerjugend), participating in weekend camping marches, map-reading, obstacle courses, and small-bore rifle firing to cultivate toughness and blind obedience for future military enlistment. Girls joined the League of German Girls (Bund Deutscher Mädel), engaging in rhythmic gymnastics, health walks, and intensive home economics training (cooking, sewing, infant care) to condition them for duty as prolific Aryan mothers.',
    },
  ],
  // L15
  15: [
    {
      task: 'What public works and rearmament programmes did Hitler implement to reduce unemployment from six million in 1933 to zero by 1939, and how were statistics manipulated?',
      answer:
        "Hitler tackled unemployment through state-funded public works schemes, including the National Labour Service (RAD, compulsory for men aged 18–25 to work on forestry and agriculture) and the construction of 4,000 miles of Autobahn motorways. Crucially, from 1935, massive rearmament and the reintroduction of military conscription absorbed millions into arms factories and the Wehrmacht. However, official unemployment drops concealed 'invisible unemployment': Jews, married women forced out of jobs, political prisoners in concentration camps, and men conscripted into the RAD were deliberately excluded from unemployment registers.",
    },
    {
      task: "How did Robert Ley's German Labour Front (DAF) and 'Strength Through Joy' (KdF) compensate workers for the loss of free trade unions and lower real wages?",
      answer:
        "On 2 May 1933, the Nazis seized trade union offices, arrested union leaders, and replaced independent trade unions with Robert Ley's German Labour Front (DAF), banning strikes and fixing wage rates. To maintain worker contentment despite rising working hours (rising to 47 hours a week) and stagnant real wages, Ley established 'Strength Through Joy' (Kraft durch Freude, KdF), offering subsidized theatre trips, hiking holidays, and luxury Mediterranean cruises. The KdF also promoted the famous Volkswagen Beetle savings stamp scheme (5 marks a week), though no civilian ever received a car before the factory switched entirely to military production.",
    },
  ],
  // L16
  16: [
    {
      task: 'How did the 1933 anti-Jewish boycott and the 1935 Nuremberg Laws systematically strip German Jews of legal, political, and social equality?',
      answer:
        'Nazi racial policy commenced with state-sanctioned economic exclusion: on 1 April 1933, the SA organized a nationwide boycott of Jewish shops, doctors, and lawyers, followed by the Law for the Restoration of the Professional Civil Service expelling Jews from public employment. In September 1935, the Nuremberg Laws codified biological anti-Semitism into constitutional law: the Reich Citizenship Law stripped Jews of German citizenship, reducing them to disenfranchised state subjects, while the Law for the Protection of German Blood and Honour outlawed marriage and sexual relations between Jews and German citizens.',
    },
    {
      task: 'Why was Kristallnacht (9–10 November 1938) a catastrophic turning point in the Nazi persecution of German Jews, and what were its consequences?',
      answer:
        "Kristallnacht ('Night of Broken Glass') marked the transition from legal discrimination to organized physical violence. Exploiting the assassination of German diplomat Ernst vom Rath in Paris by seventeen-year-old Herschel Grynszpan, Joseph Goebbels unleashed the SA and SS in coordinated nationwide pogroms: over 1,400 synagogues were burned, 7,500 Jewish-owned businesses destroyed, 91 Jews murdered, and 30,000 Jewish men arrested and deported to concentration camps. The Nazi regime then forced the German Jewish community to pay a punitive one-billion-mark fine and completely excluded Jews from commercial and school life.",
    },
  ],
};

// Update weimar_nazi_germany
const jsPath = path.resolve(__dirname, '../units/weimar_nazi_germany/data.js');
const pubJsonPath = path.resolve(__dirname, '../public/data/weimar_nazi_germany.json');
const dataJsonPath = path.resolve(__dirname, '../data/weimar_nazi_germany.json');

delete require.cache[require.resolve(jsPath)];
const mod = require(jsPath);
const data = mod.default || mod.unitData || mod;

data.lessons.forEach((l, li) => {
  const pedList = weimarPedagogyByLesson[li + 1];
  if (pedList && l.video) {
    // Sort videos by duration first or assign matching pedagogy
    l.video.forEach((v, vi) => {
      // Find matching item by keyword in title
      let matched = null;
      if (v.title.includes('Twentieth Century History') || v.title.includes('German Revolution'))
        matched = pedList[0];
      else if (v.title.includes('Treaty of Versailles') || v.title.includes('Diktat'))
        matched = pedList[1];
      else if (v.title.includes('Freikorps') || v.title.includes('Political Violence'))
        matched = pedList[0];
      else if (v.title.includes('Ruhr Occupation') || v.title.includes('Hyperinflation'))
        matched = pedList[1];
      else if (v.title.includes('Stresemann') || v.title.includes('Dawes Plan'))
        matched = pedList[0];
      else if (v.title.includes('Golden Years') || v.title.includes('Illusion of Stability'))
        matched = pedList[1];
      else if (v.title.includes('Changes for Workers') || v.title.includes('Women and Culture'))
        matched = pedList[0];
      else if (v.title.includes('Weimar Culture') || v.title.includes('Bauhaus'))
        matched = pedList[1];
      else if (v.title.includes('Early Nazi Party') || v.title.includes('Anton Drexler'))
        matched = pedList[0];
      else if (v.title.includes('Ernst Röhm') || v.title.includes('Stormtroopers'))
        matched = pedList[1];
      else if (v.title.includes('Munich Beer Hall Putsch')) matched = pedList[0];
      else if (v.title.includes('Landsberg') || v.title.includes('Mein Kampf'))
        matched = pedList[1];
      else if (v.title.includes('Wall Street Crash')) matched = pedList[0];
      else if (v.title.includes('Work and Bread') || v.title.includes("Goebbels' Propaganda"))
        matched = pedList[1];
      else if (v.title.includes('Political Intrigue') || v.title.includes('Papen'))
        matched = pedList[0];
      else if (v.title.includes('30 January 1933') || v.title.includes('Torchlight Parade'))
        matched = pedList[1];
      else if (v.title.includes('Reichstag Fire') || v.title.includes('Enabling Act'))
        matched = pedList[0];
      else if (
        v.title.includes('Night of the Long Knives') ||
        v.title.includes('Death of Hindenburg')
      )
        matched = pedList[1];
      else if (v.title.includes('SS, The Gestapo') || v.title.includes('Terror Apparatus'))
        matched = pedList[0];
      else if (v.title.includes('Dachau') || v.title.includes('Religion')) matched = pedList[1];
      else if (v.title.includes('Joseph Goebbels, Propaganda') || v.title.includes('Führer Myth'))
        matched = pedList[0];
      else if (v.title.includes('1936 Berlin Olympic') || v.title.includes('Propaganda Spectacle'))
        matched = pedList[1];
      else if (v.title.includes('Edelweiss Pirates') || v.title.includes('Swing Youth'))
        matched = pedList[0];
      else if (
        v.title.includes('Niemöller') ||
        v.title.includes('Galen') ||
        v.title.includes('Bonhoeffer')
      )
        matched = pedList[1];
      else if (v.title.includes('Life for Women')) matched = pedList[0];
      else if (v.title.includes("Mother's Cross") || v.title.includes('Lebensborn'))
        matched = pedList[1];
      else if (v.title.includes('Indoctrination in Schools') || v.title.includes('Nazi Curriculum'))
        matched = pedList[0];
      else if (v.title.includes('Hitler Youth') || v.title.includes('League of German Girls'))
        matched = pedList[1];
      else if (v.title.includes('Economic Miracle') || v.title.includes('Autobahns'))
        matched = pedList[0];
      else if (v.title.includes('Workers Under the Nazi Regime') || v.title.includes('KdF'))
        matched = pedList[1];
      else if (v.title.includes('Racial Ideology') || v.title.includes('Nuremberg Laws'))
        matched = pedList[0];
      else if (v.title.includes('Kristallnacht')) matched = pedList[1];
      else matched = pedList[vi] || pedList[0];

      if (matched) {
        v.viewing_task = matched.task;
        v.model_answer = matched.answer;
      }
    });

    // Sort shortest-to-longest
    l.video.sort((a, b) => parseDurationSecs(a.duration) - parseDurationSecs(b.duration));
  }
});

// Write files
const jsContent = `const unitData = ${JSON.stringify(data, null, 2)};\n\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
fs.writeFileSync(jsPath, jsContent, 'utf8');
fs.writeFileSync(pubJsonPath, JSON.stringify(data, null, 2), 'utf8');
if (fs.existsSync(dataJsonPath)) {
  fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2), 'utf8');
}
console.log('✅ Successfully fixed and enriched all 32 clips in weimar_nazi_germany!');
