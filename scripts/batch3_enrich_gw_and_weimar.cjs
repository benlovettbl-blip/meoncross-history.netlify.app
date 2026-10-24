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

function updateUnit(unitId, updateFn) {
  const jsPath = path.resolve(__dirname, `../units/${unitId}/data.js`);
  const pubJsonPath = path.resolve(__dirname, `../public/data/${unitId}.json`);
  const dataJsonPath = path.resolve(__dirname, `../data/${unitId}.json`);

  delete require.cache[require.resolve(jsPath)];
  const mod = require(jsPath);
  const data = mod.default || mod.unitData || mod;

  updateFn(data);

  // Sort each lesson's videos by duration shortest-to-longest
  data.lessons.forEach((l) => {
    if (Array.isArray(l.video)) {
      l.video.sort((a, b) => parseDurationSecs(a.duration) - parseDurationSecs(b.duration));
    }
  });

  // Write JS
  const jsContent = `const unitData = ${JSON.stringify(data, null, 2)};\n\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(jsPath, jsContent, 'utf8');

  // Write JSON
  fs.writeFileSync(pubJsonPath, JSON.stringify(data, null, 2), 'utf8');
  if (fs.existsSync(dataJsonPath)) {
    fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2), 'utf8');
  }
  console.log(`✅ Successfully updated ${unitId}`);
}

// 1. great_war (19 clips)
const gwPedagogy = {
  // Lesson 1: German Unification & Franco-Prussian War
  'German Unification and Empire - History in 5 Minutes': {
    task: 'How did Otto von Bismarck use the three wars of unification and the proclamation of the German Empire in 1871 to transform the European balance of power?',
    answer:
      'Otto von Bismarck used calculated diplomacy and Prussian military supremacy across three short wars—against Denmark (1864), Austria (1866), and France (1870–71)—to unite thirty-nine independent German states under the Prussian Hohenzollern monarchy. The proclamation of the unified German Empire in the Hall of Mirrors at Versailles on 18 January 1871 created a dominant industrial and military powerhouse in the heart of Europe, permanently shattering the old diplomatic balance of power established at the Congress of Vienna.',
  },
  'The Franco Prussian War - History Matters (Short Animated Documentary)': {
    task: "How did the Ems Telegram provoke France into war, and why did the loss of Alsace-Lorraine create permanent French 'revanchism'?",
    answer:
      "Bismarck deliberately edited the Ems Telegram to make it appear that King Wilhelm I of Prussia and the French ambassador had insulted one another, baiting Emperor Napoleon III into declaring war in July 1870. Prussia's rapid mobilization encircled the French army at Sedan, toppled the French Empire, and forced France to surrender the rich industrial border provinces of Alsace and Lorraine in the 1871 Treaty of Frankfurt, creating an enduring desire for national revenge ('revanchism') that made Franco-German reconciliation impossible.",
  },
  'The Great War: What Made Germany So Successful Before World War 1?': {
    task: 'What underlying industrial, demographic, and military factors enabled Imperial Germany to surpass its European rivals by 1900?',
    answer:
      "By 1900, Germany's rapid industrialisation saw its steel and coal production surpass Britain's, driven by advanced technological education, chemical synthesis, and extensive railway networks designed for rapid military mobilization. German population surged from 41 million in 1871 to 68 million by 1914, providing a vast pool of conscripts led by the elite Prussian General Staff. This economic and military dynamism created profound anxiety in Britain and France regarding German continental hegemony.",
  },
  'How Prussia Ended The French Empire: Franco-Prussian War | Animated History': {
    task: 'How did modern Prussian railway deployment and Krupp breech-loading artillery lead to the catastrophic French defeat at Sedan in September 1870?',
    answer:
      "Prussia's Chief of the General Staff, Helmuth von Moltke, utilized precision railway scheduling to deploy over 300,000 soldiers to the border weeks before France had assembled its reserves. In the field, Prussian Krupp cast-steel, breech-loading rifled artillery outranged French muzzle-loaders, allowing the Prussians to rain devastating shellfire onto French positions from beyond rifle range, trapping Napoleon III at Sedan and forcing the unconditional surrender of 100,000 French troops.",
  },

  // Lesson 2: Imperial Rivalry & Scramble for Africa
  "What was the 'Scramble for Africa'? - BBC What's New": {
    task: 'What was the purpose of the 1884 Berlin Conference, and how did European powers divide the African continent?',
    answer:
      "Convened by Otto von Bismarck, the 1884–85 Berlin Conference established the principle of 'effective occupation', requiring European empires to physically establish administrative and military control before claiming African lands. In the ensuing scramble, European powers carved up Africa with arbitrary straight-line borders, ignoring Indigenous kingdoms and ethnic divisions, so that by 1914 Europeans controlled roughly 90% of the continent compared to barely 10% in 1870.",
  },
  'The Scramble for Africa Explained: Imperialism, Empire, and the Road to World War I': {
    task: 'How did imperial friction in Africa, particularly during the First (1905) and Second (1911) Moroccan Crises, solidify Anglo-French diplomatic cooperation?',
    answer:
      "Kaiser Wilhelm II attempted to shatter the newly formed 1904 Entente Cordiale by challenging French influence in Morocco—landing at Tangier in 1905 and sending the gunboat SMS Panther to Agadir in 1911. However, Germany's aggressive gunboat diplomacy backfired completely: rather than driving a wedge between London and Paris, Britain strongly backed France at the Algeciras Conference and during the Agadir Crisis (Lloyd George's Mansion House speech), solidifying secret Anglo-French joint military and naval planning against Germany.",
  },
  'Powder Keg: Europe 1900 to 1914 | Historical Documentary | Lucasfilm': {
    task: "How did Weltpolitik ('world policy') and the quest for 'a place in the sun' push Imperial Germany into diplomatic isolation by 1914?",
    answer:
      "After dismissing Bismarck in 1890, Kaiser Wilhelm II abandoned cautious continental diplomacy in favour of 'Weltpolitik', demanding that Germany acquire overseas colonies, expand global naval power, and secure 'a place in the sun' commensurate with its industrial might. This aggressive foreign policy alarmed Britain, France, and Russia, driving rival empires to resolve their colonial disputes (such as the 1898 Fashoda Crisis and 1907 Anglo-Russian Convention) and encircling Germany within an opposing diplomatic bloc.",
  },

  // Lesson 3: Anglo-German Naval Arms Race
  '14th June 1900: Anglo-German naval arms race triggered by the Second German Naval Law': {
    task: "How did Admiral von Tirpitz's 1900 Second Naval Law and his 'Risk Fleet' theory directly challenge British naval supremacy?",
    answer:
      "Under the guidance of Admiral Alfred von Tirpitz, the Second German Naval Law doubled the size of the High Seas Fleet to 38 battleships, aimed directly at challenging the Royal Navy in the North Sea. Tirpitz operated on the 'Risk Fleet' (Risikoflotte) theory, arguing that a powerful German battlefleet would force Britain to grant diplomatic concessions worldwide because engaging Germany would leave Britain too weak to fight other naval powers. Instead, Britain viewed the German buildup as a direct existential threat to its island security.",
  },
  'Anglo-German Dreadnought Arms Race - Anything you can build I can build better!': {
    task: 'Why did the launch of HMS Dreadnought in 1906 revolutionize naval warfare and reset the naval arms race to zero?',
    answer:
      "Commissioned by First Sea Lord Admiral Sir John Fisher, HMS Dreadnought made all existing battleships obsolete overnight: powered by steam turbines, it was the fastest capital ship in the world (21 knots) and featured an unprecedented 'all-big-gun' armament of ten 12-inch rifled guns that could deliver devastating broadsides at over ten miles. Paradoxically, by rendering older pre-dreadnought battleships obsolete, Britain wiped out its own vast numerical naval superiority, enabling Germany to compete on equal footing in building dreadnought-class warships.",
  },
  'Anglo-German Relations and the Naval Race': {
    task: "How did domestic public pressure and tabloid jingoism ('We want eight and we won't wait!') force the British government into massive naval expenditure by 1909?",
    answer:
      "When naval intelligence revealed in 1908 that German shipyards were stockpiling armor plate and speeding up dreadnought construction, public and parliamentary panic erupted in Britain. Conservative MPs and popular newspapers stoked fierce jingoistic hysteria, coining the famous slogan 'We want eight and we won't wait!'. Facing public fury, the Liberal government bowed to pressure, abandoning plans for social welfare spending to authorize the construction of eight super-dreadnoughts in 1909 alone, securing an unassailable 29-to-19 dreadnought lead by August 1914.",
  },

  // Lesson 4: Alliance Systems & Balkan Powder Keg
  'Tinderbox Europe - From Balkan Troubles to World War I | Prelude to WW1': {
    task: "Why were the Balkans known as the 'Powder Keg of Europe', and how did the 1908 Bosnian Crisis bring Russia and Austria-Hungary to the brink of war?",
    answer:
      "The Balkans were unstable due to the crumbling Ottoman Empire ('the Sick Man of Europe') and competing ethnic nationalisms—especially Serbian ambition to unite Slavic peoples into a 'Greater Serbia'. When Austria-Hungary formally annexed Bosnia-Herzegovina in 1908, Serbia and Russia reacted with outrage. Germany delivered an ultimatum threatening military intervention alongside Austria, forcing a militarily unready Russia to back down in humiliation, vowing never to retreat from a Balkan confrontation again.",
  },
  'How did WW1 Start? | Causes of the First World War': {
    task: "How did the interlocking 'MAIN' causes—Militarism, Alliances, Imperialism, and Nationalism—create a fragile continental system by 1914?",
    answer:
      'By 1914, all four MAIN factors intertwined fatally: Militarism created mass conscript armies, lethal weapons technology, and rigid railway mobilization timetables; Alliances locked Europe into two armed camps (Triple Entente vs Triple Alliance), ensuring a local conflict would escalate; Imperialism provoked international distrust through overseas crises in Africa and Asia; and Nationalism fuelled explosive ethnic tensions in the Austro-Hungarian Empire while generating aggressive popular jingoism across European capitals.',
  },
  '6 Key Steps to World War One': {
    task: 'What six decisive diplomatic and geopolitical steps between 1879 and 1914 locked the European powers into opposing coalitions?',
    answer:
      "The six steps were: (1) The 1879 Dual Alliance between Germany and Austria-Hungary; (2) The 1894 Franco-Russian Alliance breaking Germany's encirclement protection; (3) The 1898–1912 Anglo-German Naval Arms Race; (4) The 1904 Entente Cordiale and 1907 Triple Entente; (5) The 1908 Bosnian Annexation Crisis and 1912–13 Balkan Wars; and (6) The 1914 July Crisis following the Sarajevo assassination, which activated the mutual defence clauses.",
  },
  'Europe Prior to World War I: Alliances and Enemies | Prelude to WW1': {
    task: 'How did the mutual defence obligations of the Triple Alliance and Triple Entente eliminate diplomatic flexibility during an international crisis?',
    answer:
      'The alliance networks bound sovereign powers to collective security pacts: Germany was committed to defending Austria-Hungary, France was contractually obligated to declare war if Russia was attacked, and Russia felt bound by honour and Pan-Slavism to protect Serbia. These rigid treaties removed room for diplomatic manoeuvre: statesmen realized that if a regional clash occurred between Austria and Serbia, alliance treaties would automatically pull Germany, Russia, France, and Britain into a continental conflagration.',
  },
  'History File: The Approach of War': {
    task: "How did rigid military mobilization timetables (like Germany's Schlieffen Plan) prevent diplomats from negotiating a peaceful settlement in late July 1914?",
    answer:
      'Military planning in 1914 was dictated by strict railway schedules: the German Schlieffen Plan relied on knocking France out in six weeks before slowly mobilizing Russia could attack from the east. Once Tsar Nicholas II ordered general Russian mobilization on 30 July, German generals insisted they could not wait for diplomatic talks, because every hour lost risked a two-front war. Mobilization thus became synonymous with war, removing decision-making power from diplomats and placing it in the hands of military staff timetables.',
  },

  // Lesson 5: The July Crisis & Outbreak of War
  'How the Assassination of Archduke Franz Ferdinand Unfolded with Dan Snow': {
    task: 'What sequence of errors and chance encounters on 28 June 1914 enabled Gavrilo Princip to assassinate Archduke Franz Ferdinand in Sarajevo?',
    answer:
      "After an initial grenade thrown by Nedeljko Čabrinović bounced off the imperial motorcade and wounded bystanders, the Archduke visited the wounded at the hospital. However, his motorcade driver was not informed of a route alteration and turned down Franz Josef Street. When the car stopped to reverse, it halted directly in front of Schiller's delicatessen, where nineteen-year-old Gavrilo Princip was standing; Princip stepped forward and fired two point-blank pistol shots, mortally wounding Franz Ferdinand and his pregnant wife Sophie.",
  },
  'The Bullet that Started WWI': {
    task: "What were the political aims of the 'Black Hand' terrorist group, and why did Austria-Hungary use the assassination to issue an impossible ultimatum to Serbia?",
    answer:
      "The 'Black Hand' (Unification or Death), led by Serbian military intelligence officer Dragutin Dimitrijević ('Apis'), sought to liberate South Slav provinces from Austro-Hungarian rule to forge a unified Yugoslav state. Austro-Hungarian leaders seized upon the Sarajevo murder as a pretext to crush Serbian nationalism permanently: backed by Germany's unconditional 'Blank Cheque' on 5 July, Vienna issued a 48-hour ultimatum containing ten severe demands designed to be rejected, using Serbia's partial refusal to declare war on 28 July 1914.",
  },
  'Britain and the Start of WW1 | Learning Zone (BBC Two)': {
    task: 'Why did the German invasion of neutral Belgium under the Schlieffen Plan compel Great Britain to enter the war on 4 August 1914?',
    answer:
      "Britain had guaranteed Belgian neutrality and independence in the 1839 Treaty of London. When Germany demanded unhindered passage for its armies to bypass French border fortresses and invaded Belgium on 4 August, Britain issued an ultimatum demanding German withdrawal. When the Kaiser's government dismissed the treaty as a mere 'scrap of paper' and refused to withdraw, Britain declared war at 11:00 pm, motivated both by treaty obligations and the strategic necessity of preventing a hostile German superpower from controlling the English Channel ports.",
  },
  'Days That Shook the World: Assassination of Archduke Franz Ferdinand': {
    task: 'How did the failure of Austrian security precautions during the imperial visit to Sarajevo expose the royal couple to fatal danger?',
    answer:
      "Austrian authorities chose 28 June—St Vitus's Day (Vidovdan), a sacred day of Serbian national memory commemorating the 1389 Battle of Kosovo—for an official royal inspection, provoking intense nationalist outrage. Despite intelligence warnings of assassination plots, Austrian security was shockingly lax: the local governor Oskar Potiorek refused to deploy thousands of troops along the route, the motorcade route was openly published in morning newspapers, and the royal couple travelled in an unarmoured open-topped car with minimal police protection.",
  },
};

updateUnit('great_war', (data) => {
  data.lessons.forEach((l) => {
    (l.video || []).forEach((v) => {
      if (gwPedagogy[v.title]) {
        v.viewing_task = gwPedagogy[v.title].task;
        v.model_answer = gwPedagogy[v.title].answer;
      }
    });
  });
});

// 2. weimar_nazi_germany (32 clips)
const weimarPedagogy = {
  // Lesson 1
  '[STARTER HOOK] Twentieth Century History: The German Revolution & The Armistice (1918)': {
    task: "How did the Kiel naval mutiny and domestic collapse force Kaiser Wilhelm II to abdicate on 9 November 1918, and why did the 'stab-in-the-back' myth emerge?",
    answer:
      "By late October 1918, German military collapse was imminent. When naval commanders ordered a suicidal sortie against the Royal Navy, sailors at Kiel mutinied, sparking workers' and soldiers' councils across Germany. With Berlin gripped by general strikes, Kaiser Wilhelm II abdicated and fled to Holland on 9 November, allowing SPD leader Friedrich Ebert to proclaim a democratic republic. Field Marshal Hindenburg and nationalist generals quickly claimed that the undefeated army had been 'stabbed in the back' (Dolchstoßlegende) on the home front by socialists, pacifists, and Jews ('November Criminals') who signed the 11 November Armistice.",
  },
  '[ENQUIRY EVIDENCE] History File: The Treaty of Versailles & The "Diktat" (1919)': {
    task: "What punitive territorial, military, and financial terms were imposed on Germany in the Treaty of Versailles, and why was it universally condemned as a 'Diktat'?",
    answer:
      "Signed under threat of Allied invasion on 28 June 1919, Versailles stripped Germany of 13% of its European territory (Alsace-Lorraine to France, Eupen-Malmedy to Belgium, the Polish Corridor to Poland, and all overseas colonies). Militarily, the army was capped at 100,000 volunteers, conscription was abolished, tanks, warplanes, and submarines were banned, and the Rhineland was demilitarised. Financially, Article 231 (the War Guilt Clause) forced Germany to accept total blame, saddling the new republic with astronomical reparations of £6.6 billion (132 billion gold marks), which Germans universally condemned as an dictated peace ('Diktat').",
  },

  // Lesson 2
  '[STARTER HOOK] BBC Two: The Freikorps & Political Violence (1919–1920)': {
    task: 'Why did Friedrich Ebert rely on the right-wing Freikorps to crush the Spartacist Uprising in January 1919, and what threat did the Freikorps pose during the 1920 Kapp Putsch?',
    answer:
      "In January 1919, the Communist Spartacist League (led by Karl Liebknecht and Rosa Luxemburg) launched an armed revolution to overthrow Ebert's government. Lacking regular troops, Defence Minister Noske deployed the Freikorps—heavily armed, demobilised nationalist soldiers who brutally suppressed the uprising and murdered Luxemburg and Liebknecht. However, the Freikorps' loyalty was temporary: when the government attempted to disband them in March 1920 under Versailles terms, 5,000 Freikorps troops marched on Berlin under Wolfgang Kapp, forcing the government to flee and demonstrating that the German army would not defend the republic ('Troops do not fire on troops').",
  },
  '[PRIMARY EVIDENCE] History File: The 1923 Crisis – Ruhr Occupation & Hyperinflation (19 mins 0 secs)':
    {
      task: 'How did the French invasion of the Ruhr in January 1923 trigger catastrophic hyperinflation, and which social classes suffered the greatest economic ruin?',
      answer:
        "When Germany defaulted on reparations deliveries in late 1922, 60,000 French and Belgian troops occupied the industrial Ruhr valley to seize coal and timber. The Weimar government called for 'passive resistance' (general strike) while paying striking workers by running state printing presses day and night. Flooding the market with unbacked paper currency caused the mark's value to collapse completely (a loaf of bread reached 201 billion marks in November 1923). While industrialists with heavy debts paid them off cheaply, the patriotic middle classes (Mittelstand), pensioners, and savers saw their life savings, war bonds, and pensions utterly wiped out, alienating them permanently from democratic Weimar institutions.",
    },

  // Lesson 3
  '[STARTER HOOK] Gustav Stresemann: The Rentenmark, Dawes Plan & Locarno Pact (1924–1929) (19 mins 0 secs)':
    {
      task: "What diplomatic and economic measures did Gustav Stresemann implement between 1923 and 1929 to stabilize Germany's economy and restore international status?",
      answer:
        "As Chancellor and Foreign Minister, Gustav Stresemann ended passive resistance, burned the worthless marks, and introduced the Rentenmark (backed by agricultural land and industrial gold). In 1924, he negotiated the Dawes Plan, securing an 800 million mark loan from US financiers and scaling annual reparations to Germany's economic capacity. Diplomatically, Stresemann signed the 1925 Locarno Treaties guaranteeing Germany's western borders, brought Germany into the League of Nations with a permanent council seat in 1926, and negotiated the 1929 Young Plan, which reduced total reparations to £2 billion and scheduled Allied evacuation of the Rhineland.",
    },
  "[ENQUIRY EVIDENCE] Weimar's Golden Years: Economic Recovery & The Illusion of Stability (48 mins 0 secs)":
    {
      task: "Why did Stresemann famously warn that Germany was 'dancing on a volcano', and what fundamental economic vulnerabilities remained beneath Weimar's Golden Twenties?",
      answer:
        "Stresemann recognized that Weimar's apparent prosperity was fundamentally fragile because it was funded almost entirely by short-term American loans. If Wall Street recalled those loans, the German economy would collapse instantly. Furthermore, German agriculture was in deep recession throughout the 1920s due to falling global grain prices, small businesses struggled against high interest rates, unemployment never dipped below 1.3 million, and political coalitions remained unstable, with radical parties (Nazis and Communists) quietly preparing for the next inevitable crisis.",
    },

  // Lesson 4
  '[STARTER HOOK] The History Teacher: Changes for Workers, Women and Culture in the 1920s (6 mins 12 secs)':
    {
      task: 'What social gains were achieved by German workers and women under the Weimar Constitution, and why did conservative traditionalists react with hostility?',
      answer:
        "Under the Weimar Republic, industrial workers gained an eight-hour working day, legal recognition of trade unions, expanded state health insurance, and over two million modern social housing apartments built by local councils. Women gained full voting rights (Article 109), equality in education, and emerged as the financially independent 'New Woman' (neue Frau) with bobbed hair, modern fashion, and professional careers. However, traditionalists, the Catholic Church, and right-wing nationalists condemned these changes as moral decadence that destroyed traditional family values and promoted Americanized materialism.",
    },
  '[ENQUIRY EVIDENCE] Weimar Culture & Architecture: Bauhaus, Expressionism & The Cabarets (48 mins 0 secs)':
    {
      task: 'How did Weimar avant-garde movements like the Bauhaus school, Neue Sachlichkeit painting, and Berlin cabaret culture challenge traditional German values?',
      answer:
        "Weimar culture flourished under unrestricted democratic freedom: Walter Gropius founded the Bauhaus school of architecture, rejecting ornate imperial decoration in favour of sleek, functional modernist design ('form follows function'). Painters like Otto Dix and George Grosz created brutally honest 'New Objectivity' (Neue Sachlichkeit) art depicting scarred war veterans, greedy industrialists, and urban poverty. In Berlin, world-famous cabarets explored satirical political critique and sexual freedom. Right-wing conservatives denounced this flourishing as 'degenerate art' (Entartete Kunst) that poisoned traditional German culture.",
    },

  // Lesson 5
  "[STARTER HOOK] BBC Two: The Early Nazi Party – Anton Drexler, The DAP & Hitler's Oratory (5 mins 20 secs)":
    {
      task: "How did Adolf Hitler transform Anton Drexler's tiny German Workers' Party (DAP) into the National Socialist German Workers' Party (NSDAP) by 1921?",
      answer:
        "Hitler joined the tiny 54-member German Workers' Party (DAP) in Munich in September 1919 as an army intelligence agent, but quickly discovered his magnetic gift for public oratory. In February 1920, Hitler and Drexler announced the 25-Point Programme combining virulent anti-Semitism, anti-capitalism, and hatred of Versailles. Hitler renamed the party the NSDAP, adopted the striking red banner with the black swastika emblem, purchased the newspaper Völkischer Beobachter, and ousted Drexler in July 1921 to become party chairman with dictatorial authority under the Führerprinzip.",
    },
  '[ENQUIRY EVIDENCE] BBC Two: Rise of the Nazis – Ernst Röhm & The Stormtroopers (SA) (6 mins 15 secs)':
    {
      task: "What role did Ernst Röhm and the Sturmabteilung (SA 'Brownshirts') play in enforcing Nazi power on the streets of Bavaria between 1921 and 1923?",
      answer:
        "Founded in 1921 under ex-soldier Ernst Röhm, the Sturmabteilung (SA) recruited bitter First World War veterans and Freikorps fighters. Dressed in surplus colonial brown shirts, the SA served as Hitler's paramilitary bodyguards, marched in disciplined formations through city streets to project masculine order, distributed propaganda, and used violent intimidation to physically disrupt rival socialist and communist meetings and beat up political opponents, establishing the street violence that characterised the Weimar Republic.",
    },

  // Lesson 6
  '[STARTER HOOK] BBC Two: The Munich Beer Hall Putsch (8–9 November 1923) (5 mins 10 secs)': {
    task: 'Why did Hitler and General Ludendorff launch the Munich Putsch in November 1923, and why did their attempt to march on Berlin collapse in bloody failure?',
    answer:
      "Capitalizing on public outrage over hyperinflation and the end of passive resistance in the Ruhr, Hitler sought to emulate Mussolini's 1922 March on Rome. On 8 November 1923, 600 SA men surrounded Munich's Bürgerbräukeller beer hall, where Bavarian leaders Gustav von Kahr and Otto von Lossow were speaking. At gunpoint, Hitler forced them to support a national coup. However, once released, Kahr alerted Bavarian police and military garrisons. When Hitler and Ludendorff led 2,000 armed SA marchers into central Munich the next morning, police opened fire at the Odeonsplatz, killing 16 Nazis and crushing the rebellion.",
  },
  '[PRIMARY EVIDENCE] BBC Two: Hitler at Landsberg Prison, Mein Kampf & The Legal Strategy (5 mins 30 secs)':
    {
      task: 'How did Hitler turn his 1924 trial for high treason into a propaganda triumph, and what strategic lessons did he learn while imprisoned in Landsberg?',
      answer:
        "Facing charges of high treason, Hitler used the courtroom as a national loudspeaker, presenting himself as a selfless German patriot defending the Fatherland against the treasonous 'November Criminals'. Sympathetic right-wing judges granted him a lenient minimum sentence of five years, of which he served only nine months in comfortable conditions at Landsberg Castle. While in prison, he dictated Mein Kampf (setting out Lebensraum, Aryan supremacy, and anti-Semitism) and concluded that armed revolution was futile: to destroy Weimar democracy, the Nazis had to 'hold our noses and enter the Reichstag' to win power legally through elections.",
    },

  // Lesson 7
  '[STARTER HOOK] History File: The Wall Street Crash & The Surge in Nazi Support (1929–1932) (20 mins 0 secs)':
    {
      task: 'How did the October 1929 Wall Street Crash plunge Germany into mass unemployment, and why did this crisis destroy support for moderate democratic parties?',
      answer:
        'The collapse of the New York stock exchange triggered an immediate recall of American short-term loans under the Dawes Plan, bankrupting major German banks (such as the Danatbank) and shuttering factories. By winter 1932, German unemployment soared past six million (over 30% of the workforce). When Chancellor Heinrich Brüning slashed public spending, unemployment benefits, and pensions while ruling by presidential emergency decree (Article 48), the German public lost faith in democracy. Desperate voters abandoned moderate centrist parties and turned to radical extremes: the Communists for working-class salvation, and the Nazis for national restoration.',
    },
  '[ENQUIRY EVIDENCE] BBC Two: Rise of the Nazis – Goebbels\' Propaganda & "Work and Bread" (6 mins 15 secs)':
    {
      task: "How did Joseph Goebbels use modern electioneering techniques and the slogan 'Work and Bread' to make the NSDAP the largest party in the Reichstag by July 1932?",
      answer:
        "Appointed Reich Propaganda Leader in 1930, Joseph Goebbels pioneered modern political marketing: he tailored specific messages to target groups (promising farmers agricultural subsidies, the middle class protection against communism, and small shopkeepers protection against department stores). He utilized innovative technology, flying Hitler across Germany in an airplane ('Hitler Over Germany') to address multiple mass rallies in a single day. Goebbels saturated cities with millions of striking posters, gramophone records, and the simple, compelling economic promise 'Arbeit und Brot' (Work and Bread), driving the Nazi vote to 37.3% (230 seats) in July 1932.",
    },

  // Lesson 8
  '[STARTER HOOK] BBC Two: Rise of the Nazis – Political Intrigue: Papen, Schleicher & Hindenburg (7 mins 10 secs)':
    {
      task: "How did the conservative backroom conspiracy between Franz von Papen, General Kurt von Schleicher, and President Hindenburg pave the way for Hitler's appointment as Chancellor?",
      answer:
        "Weimar democracy collapsed into backroom intrigue as aristocratic elites tried to bypass the Reichstag. When General Kurt von Schleicher ousted Franz von Papen as Chancellor in December 1932, Papen sought revenge by secretly meeting Hitler in Cologne. Papen proposed a coalition government where Hitler would serve as Chancellor, with Papen as Vice-Chancellor and only two other Nazis in the cabinet (Frick and Göring). Papen foolishly persuaded the senile 85-year-old President Hindenburg that the conservative majority would control Hitler, famously boasting: 'In two months' time, we will have pushed Hitler so far into a corner that he will squeak!'.",
    },
  '[PRIMARY EVIDENCE] BBC Two: 30 January 1933 – Hitler Appointed Chancellor & The Torchlight Parade (5 mins 45 secs)':
    {
      task: 'What occurred on 30 January 1933 when Hitler was officially sworn in as Chancellor, and how was this moment commemorated by the SA?',
      answer:
        "On the morning of 30 January 1933, President Hindenburg formally appointed Adolf Hitler Chancellor of Germany at the head of a Nazi-Nationalist coalition. That evening, Joseph Goebbels orchestrated a massive propaganda spectacle: 25,000 uniformed SA stormtroopers carrying flaming torches marched in military columns down Berlin's Unter den Linden and through the Brandenburg Gate, singing Nazi anthems past the window of the Reich Chancellery where Hitler and Hindenburg looked on. This dramatic parade symbolized the end of the democratic republic and the dawn of the Third Reich.",
    },

  // Lesson 9
  '[STARTER HOOK] BBC Two: The Reichstag Fire (27 Feb 1933) & The Enabling Act (24 March 1933) (6 mins 45 secs)':
    {
      task: 'How did Hitler exploit the Reichstag Fire of 27 February 1933 and the subsequent Enabling Act to eliminate parliamentary democracy in Germany?',
      answer:
        'When Dutch communist Marinus van der Lubbe was caught at the burning Reichstag on 27 February 1933, Hitler claimed it was the start of an armed communist coup. He persuaded Hindenburg to sign the Emergency Decree for the Protection of People and State, suspending basic civil rights, freedom of speech, assembly, and press, allowing the arrest of 4,000 communists. Following the March election, Hitler held the Reichstag vote on the Enabling Act at the Kroll Opera House, surrounded by intimidating armed SA men. The act passed 444 to 94 (with only the SPD voting against), giving Hitler the legal power to pass laws without parliamentary consent for four years.',
    },
  '[ENQUIRY EVIDENCE] BBC Two: The Night of the Long Knives (30 June 1934) & Death of Hindenburg (6 mins 20 secs)':
    {
      task: "Why did Hitler order the execution of Ernst Röhm and the SA leadership during the Night of the Long Knives, and what followed Hindenburg's death in August 1934?",
      answer:
        "By summer 1934, Ernst Röhm demanded that his 3-million-strong SA absorb the traditional German Army (Reichswehr) and launch a 'second socialist revolution'. Threatened by Röhm's radicalism, the conservative generals and big industrialists demanded that Hitler rein in the SA. On 30 June 1934 (the Night of the Long Knives), Himmler's SS purged and murdered Röhm and roughly 200 top SA leaders and political rivals (including Schleicher). When President Hindenburg died on 2 August 1934, Hitler merged the offices of Chancellor and President to declare himself 'Führer and Reich Chancellor', and every soldier in the German Army swore a sacred personal oath of unconditional obedience directly to Adolf Hitler.",
    },

  // Lesson 10
  '[STARTER HOOK] BBC Two: The SS, The Gestapo & The Nazi Terror Apparatus (6 mins 10 secs)': {
    task: "How did Heinrich Himmler's SS and Reinhard Heydrich's Gestapo enforce terror and conformity across German society?",
    answer:
      "The Nazi terror state operated through three coordinated police wings under Heinrich Himmler: the Schutzstaffel (SS), which expanded from Hitler's black-shirted bodyguard into an elite racial army that administered the concentration camp system; the Gestapo (Secret State Police), headed by Reinhard Heydrich, which operated with total legal immunity to tap phones, intercept mail, and arrest political suspects under 'protective custody' (Schutzhaft); and the SD (Sicherheitsdienst), which ran domestic intelligence surveillance. In practice, the Gestapo was remarkably small, relying primarily on voluntary denunciations submitted by ordinary German citizens against their neighbours.",
  },
  '[ENQUIRY EVIDENCE] BBC Two: Dachau Concentration Camp (1933) & Nazi Policy on Religion (5 mins 40 secs)':
    {
      task: 'How did the establishment of Dachau concentration camp and Nazi religious policies attempt to eliminate institutional opposition?',
      answer:
        "Opened in March 1933 under SS control, Dachau served as the prototype concentration camp for political opponents—initially holding communists, socialists, and trade unionists subjected to hard labour, brutality, and ideological 're-education'. Regarding religion, Hitler sought to neutralize the churches: in July 1933 he signed the Reichskonkordat with the Vatican, promising to protect Catholic schools and youth groups in exchange for political neutrality. When the Nazis violated these promises, Protestant pastors like Martin Niemöller formed the breakaway Confessing Church to oppose state interference, leading to Niemöller's arrest and imprisonment in Sachsenhausen and Dachau.",
    },

  // Lesson 11
  '[STARTER HOOK] BBC Two: Joseph Goebbels, Propaganda & The "Führer Myth" (5 mins 30 secs)': {
    task: "How did Joseph Goebbels' Ministry of Propaganda use modern media, radio, and the 'Führer Myth' to control German public opinion?",
    answer:
      "The Reich Ministry of Public Enlightenment and Propaganda placed all culture, press, radio, art, and cinema under strict totalitarian control. Goebbels subsidized the mass production of the cheap 'People's Receiver' radio (Volksempfänger 301), ensuring over 70% of German households owned one by 1939—the highest radio ownership in the world—broadcasting Nazi speeches into homes and factories while banning foreign radio broadcasts. Goebbels cultivated the 'Führer Myth', presenting Hitler not as a partisan politician, but as a superhuman, infallible, and selfless national saviour who worked day and night for the German people.",
  },
  '[ENQUIRY EVIDENCE] BBC Two: The 1936 Berlin Olympic Games & Nazi Propaganda Spectacle (6 mins 0 secs)':
    {
      task: 'How did the Nazi regime use the 1936 Berlin Olympics as an international propaganda showcase, and how did Jesse Owens challenge Nazi racial dogma?',
      answer:
        "Hitler used the August 1936 Berlin Olympic Games to present Nazi Germany as a modern, prosperous, and peaceful nation to the international press. Anti-Semitic signs ('Jews Not Wanted') were temporarily removed from Berlin streets, the city was cleaned, and filmmaker Leni Riefenstahl deployed pioneering cinematic techniques to film Olympia. However, Nazi Aryan racial supremacy theories were publicly discredited on the track by African-American athlete Jesse Owens, who won four gold medals (100m, 200m, 4x100m relay, long jump), receiving thunderous ovations from ordinary German spectators.",
    },

  // Lesson 12
  '[STARTER HOOK] History File: Youth Resistance – The Edelweiss Pirates & The Swing Youth (19 mins 0 secs)':
    {
      task: 'How did the Edelweiss Pirates and the Swing Youth rebel against mandatory Nazi conformity in the late 1930s?',
      answer:
        "Non-conformist youth rebelled against the regimented militarism of the Hitler Youth: the working-class Edelweiss Pirates (Edelweisspiraten) wore casual clothes (checked shirts, edelweiss flower badges), camped in the countryside, sang parodies of Nazi songs, beat up Hitler Youth patrols, and scrawled anti-Nazi graffiti on walls. In contrast, the middle-class 'Swing Youth' (Swingjugend) rebelled culturally by listening to banned American jazz and swing music (condemned as 'Negro music' by Goebbels), growing long hair, wearing English tweed jackets, and dancing in underground clubs.",
    },
  '[ENQUIRY EVIDENCE] BBC Two: Religious & Military Dissent – Niemöller, Bonhoeffer & Galen (5 mins 40 secs)':
    {
      task: 'What forms of moral and religious resistance were mounted by Christian leaders like Martin Niemöller, Dietrich Bonhoeffer, and Bishop Clemens August von Galen?',
      answer:
        "Religious dissenters stood up against Nazi totalitarian control: Protestant Pastor Martin Niemöller founded the Pastors' Emergency League and Confessing Church in 1934 to defend Christian theology against Nazi 'German Christian' pagan heresy, spending 1937–1945 in concentration camps. Theologian Dietrich Bonhoeffer joined the military counter-intelligence (Abwehr) resistance network, helping Jews escape and participating in plots to assassinate Hitler. In 1941, Catholic Bishop Clemens August von Galen delivered outspoken public sermons exposing and condemning the secret Nazi euthanasia programme (Aktion T4) for disabled individuals, forcing Hitler to suspend the public murders.",
    },

  // Lesson 13
  '[STARTER HOOK] The History Teacher: Life for Women: Weimar and Nazi Germany (6 mins 6 secs)': {
    task: "How did Nazi policy reverse the Weimar ideal of the 'New Woman', and what incentives were introduced to increase the Aryan birth rate?",
    answer:
      "The Nazi regime firmly rejected the Weimar ideal of the modern, emancipated woman, demanding women adhere to the traditional domestic sphere: 'Kinder, Küche, Kirche' (Children, Kitchen, Church). The Law for the Encouragement of Marriage (June 1933) offered newly married Aryan couples interest-free state loans of 1,000 marks, with 250 marks forgiven for each child born. Women were banned from professional careers in the civil service, judiciary, and medical fields, and discouraged from wearing makeup, smoking, or wearing trousers in public.",
  },
  "[ENQUIRY EVIDENCE] History File: The Mother's Cross, Lebensborn & Women's Exclusion (19 mins 0 secs)":
    {
      task: 'How did the Honour Cross of the German Mother and the Lebensborn programme treat motherhood as a vital service to the state?',
      answer:
        "The regime institutionalized childbearing as a military duty: the Honour Cross of the German Mother (Ehrenkreuz der Deutschen Mutter) was awarded annually on Hitler's mother's birthday (12 August) in Bronze (4–5 children), Silver (6–7 children), and Gold (8 or more children), entitling mothers to special privileges such as Hitler Youth members saluting them in public and seat preference on buses. To further expand the master race, SS leader Heinrich Himmler established the Lebensborn programme in 1935, creating maternity homes where racially 'pure' unmarried women were paired with SS officers to breed children for the Reich.",
    },

  // Lesson 14
  '[STARTER HOOK] History File: Indoctrination in Schools & The Nazi Curriculum (19 mins 0 secs)': {
    task: "How did the National Socialist Teachers' League transform the German school curriculum to indoctrinate youth into Nazi racial ideology?",
    answer:
      "Education was completely subordinated to racial indoctrination: all teachers were forced to join the National Socialist Teachers' League (NSLB) and swear an oath to Hitler. School textbooks were rewritten to emphasize German military heroism and the 'stab-in-the-back' myth; Biology was converted into racial theory (Rassenkunde), teaching pupils how to classify skulls, noses, and hair to identify 'Aryan' and 'subhuman' racial types; Maths problems calculated the costs of caring for hereditary disabled patients versus building bombers; and Physical Education was increased to occupy 15% of the timetable to prepare boys for military service.",
  },
  '[PRIMARY ARCHIVE] BBC Two: The Hitler Youth (HJ) & League of German Girls (BDM) (5 mins 30 secs)':
    {
      task: 'How did mandatory membership in the Hitler Youth (HJ) and League of German Girls (BDM) prepare boys for the military and girls for motherhood?',
      answer:
        'Under the Hitler Youth Law of 1936 (made strictly compulsory in 1939), all independent youth clubs were banned, bringing 8 million children into Nazi organisations. Boys aged 14–18 joined the Hitler Youth (Hitlerjugend), participating in weekend camping marches, map-reading, obstacle courses, and small-bore rifle firing to cultivate toughness and blind obedience for future military enlistment. Girls joined the League of German Girls (Bund Deutscher Mädel), engaging in rhythmic gymnastics, health walks, and intensive home economics training (cooking, sewing, infant care) to condition them for duty as prolific Aryan mothers.',
    },

  // Lesson 15
  '[STARTER HOOK] History File: The Economic Miracle – The RAD, Autobahns & Rearmament (19 mins 0 secs)':
    {
      task: 'What public works and rearmament programmes did Hitler implement to reduce unemployment from six million in 1933 to zero by 1939, and how were statistics manipulated?',
      answer:
        "Hitler tackled unemployment through state-funded public works schemes, including the National Labour Service (RAD, compulsory for men aged 18–25 to work on forestry and agriculture) and the construction of 4,000 miles of Autobahn motorways. Crucially, from 1935, massive rearmament and the reintroduction of military conscription absorbed millions into arms factories and the Wehrmacht. However, official unemployment drops concealed 'invisible unemployment': Jews, married women forced out of jobs, political prisoners in concentration camps, and men conscripted into the RAD were deliberately excluded from unemployment registers.",
    },
  '[ENQUIRY EVIDENCE] History File: Workers Under the Nazi Regime – The DAF, KdF & Volkswagen (19 mins 0 secs)':
    {
      task: "How did Robert Ley's German Labour Front (DAF) and 'Strength Through Joy' (KdF) compensate workers for the loss of free trade unions and lower real wages?",
      answer:
        "On 2 May 1933, the Nazis seized trade union offices, arrested union leaders, and replaced independent trade unions with Robert Ley's German Labour Front (DAF), banning strikes and fixing wage rates. To maintain worker contentment despite rising working hours (rising to 47 hours a week) and stagnant real wages, Ley established 'Strength Through Joy' (Kraft durch Freude, KdF), offering subsidized theatre trips, hiking holidays, and luxury Mediterranean cruises. The KdF also promoted the famous Volkswagen Beetle savings stamp scheme (5 marks a week), though no civilian ever received a car before the factory switched entirely to military production.",
    },

  // Lesson 16
  '[STARTER HOOK] History File: Nazi Racial Ideology, The 1933 Boycott & Nuremberg Laws (1935) (19 mins 0 secs)':
    {
      task: 'How did the 1933 anti-Jewish boycott and the 1935 Nuremberg Laws systematically strip German Jews of legal, political, and social equality?',
      answer:
        'Nazi racial policy commenced with state-sanctioned economic exclusion: on 1 April 1933, the SA organized a nationwide boycott of Jewish shops, doctors, and lawyers, followed by the Law for the Restoration of the Professional Civil Service expelling Jews from public employment. In September 1935, the Nuremberg Laws codified biological anti-Semitism into constitutional law: the Reich Citizenship Law stripped Jews of German citizenship, reducing them to disenfranchised state subjects, while the Law for the Protection of German Blood and Honour outlawed marriage and sexual relations between Jews and German citizens.',
    },
  '[PRIMARY ARCHIVE] BBC Two: Kristallnacht – The Night of Broken Glass (9–10 November 1938) (6 mins 45 secs)':
    {
      task: 'Why was Kristallnacht (9–10 November 1938) a catastrophic turning point in the Nazi persecution of German Jews, and what were its consequences?',
      answer:
        "Kristallnacht ('Night of Broken Glass') marked the transition from legal discrimination to organized physical violence. Exploiting the assassination of German diplomat Ernst vom Rath in Paris by seventeen-year-old Herschel Grynszpan, Joseph Goebbels unleashed the SA and SS in coordinated nationwide pogroms: over 1,400 synagogues were burned, 7,500 Jewish-owned businesses destroyed, 91 Jews murdered, and 30,000 Jewish men arrested and deported to concentration camps. The Nazi regime then forced the German Jewish community to pay a punitive one-billion-mark fine and completely excluded Jews from commercial and school life.",
    },
};

updateUnit('weimar_nazi_germany', (data) => {
  data.lessons.forEach((l) => {
    (l.video || []).forEach((v) => {
      if (weimarPedagogy[v.title]) {
        v.viewing_task = weimarPedagogy[v.title].task;
        v.model_answer = weimarPedagogy[v.title].answer;
      }
    });
  });
});

console.log('🎉 Successfully completed Batch 3 updates for great_war and weimar_nazi_germany!');
