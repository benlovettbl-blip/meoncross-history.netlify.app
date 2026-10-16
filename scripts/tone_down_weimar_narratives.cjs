/**
 * scripts/tone_down_weimar_narratives.cjs
 *
 * Tones down narrative paragraph lengths across all 16 lessons of Weimar and Nazi Germany (1918–1939)
 * to match the lean, high-yield Christine Counsell standard (~50–65 words per decimal paragraph,
 * ~105–125 words per block, ~550–600 words per lesson total).
 *
 * Preserves:
 * - 5 Christine Counsell Acts per lesson
 * - Exact decimal paragraph badges ([1.1]–[5.2])
 * - High-yield spec details (dates, statistics, named figures, treaties)
 * - Source A visual residency and archival references
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'data.js');

const raw = require(dataJsPath);
const unitData = raw.default || raw.unitData || raw;

const TONED_NARRATIVES = {
  // =========================================================================
  // KEY TOPIC 1: THE WEIMAR REPUBLIC, 1918–1929
  // =========================================================================
  lesson_1_1: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> By autumn 1918, Imperial Germany faced total military and economic collapse. Four years of total war had tripled national debt to 150 billion marks, with two million soldiers dead. On the home front, the British naval blockade caused severe starvation: over 750,000 civilians died during the "Turnip Winter." Generals Hindenburg and Ludendorff warned the Kaiser that the war was lost.<br><br><span class="para-ref">[1.2]</span> The breaking point occurred in late October 1918. When naval commanders ordered a suicidal sortie against the British fleet, sailors at Wilhelmshaven and Kiel mutinied. Refusing to die for a lost cause, sailors and workers established revolutionary councils across major cities. Military discipline broke down completely, and the Kaiser’s authority evaporated.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> By early November 1918, revolutionary general strikes brought Berlin to a standstill. Soldiers refused to fire upon marching workers. Recognizing that US President Wilson would not negotiate with an imperial autocrat, Chancellor Prince Max of Baden announced the Kaiser’s abdication on 9 November without Wilhelm’s consent.<br><br><span class="para-ref">[2.2]</span> Abandoned by his generals, Kaiser Wilhelm II fled into Dutch exile on 10 November. Inside the Reichstag, Social Democrat (SPD) leader Philipp Scheidemann rushed to a window and proclaimed a democratic republic. His hasty announcement pre-empted communist leader Karl Liebknecht, who was preparing to declare a Soviet-style communist state.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> SPD leader <strong>Friedrich Ebert</strong> took office as Chancellor, heading a six-man provisional cabinet. On 11 November 1918, German delegates signed the <strong>Armistice</strong> in France, ending the First World War under humiliating surrender terms, including forfeiting all submarines and heavy artillery.<br><br><span class="para-ref">[3.2]</span> Facing armed street militias (<span class="archival-meta-tag">Source A</span>), Ebert concluded the secret <strong>Ebert-Groener Pact</strong> with the army leadership. General Groener promised military loyalty to restore civil order, provided Ebert defended the army from communist revolution and preserved the imperial officer corps.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> In January 1919, national elections saw an 83% turnout, with moderate pro-democracy parties winning 76% of Reichstag seats. Because street fighting raged in Berlin following the Spartacist Uprising, the 421 delegates convened in the peaceful cultural town of <strong>Weimar</strong> on 6 February 1919.<br><br><span class="para-ref">[4.2]</span> Meeting inside the German National Theatre, the assembly elected Friedrich Ebert as President. Under liberal lawyer Hugo Preuss, the assembly spent six months drafting a modern democratic constitution designed to replace imperial autocracy with transparent parliamentary government.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> Passed in August 1919, the <strong>Weimar Constitution</strong> created a progressive democracy. It gave all men and women over twenty the vote, protected free speech and religious liberty, and made the Chancellor accountable to an elected <em>Reichstag</em>. The President was elected every seven years.<br><br><span class="para-ref">[5.2]</span> However, the constitution contained fatal flaws. <strong>Proportional Representation</strong> allowed twenty-eight tiny splinter parties to gain seats, preventing single-party majorities and forcing twenty weak coalition cabinets between 1919 and 1933. Furthermore, <strong>Article 48</strong> allowed the President to rule by decree in emergencies, creating a dictatorial loophole.',
    },
  ],

  lesson_1_2: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> In May 1919, the German delegation arrived at Versailles expecting a negotiated peace based on Woodrow Wilson’s Fourteen Points. Instead, they were barred from talks and handed a non-negotiable <strong>Diktat</strong> (<span class="archival-meta-tag">Source A</span>). If Germany refused to sign within five days, Allied armies would invade.<br><br><span class="para-ref">[1.2]</span> The territorial losses were crippling: Germany lost 13% of its European territory, 12% of its population, 16% of its coalfields, and 48% of its iron ore. Alsace-Lorraine was returned to France, the "Polish Corridor" severed East Prussia from Germany, and all overseas colonies were confiscated.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> The military terms stripped Germany of its defensive capacity. The army was slashed to 100,000 volunteers, with conscription abolished. The General Staff was banned, armored tanks, military aircraft, and submarines were outlawed, and the navy was restricted to six small battleships.<br><br><span class="para-ref">[2.2]</span> In addition, the western borderland of the Rhineland was permanently demilitarised and occupied by Allied troops. Stripped of heavy armaments and strategic fortifications, Germany felt defenseless against potential invasions by hostile European neighbours.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> Financial clauses provoked fury across Germany. Under <strong>Article 231 (The War Guilt Clause)</strong>, Germany was forced to accept sole moral responsibility for causing the war. This legal clause provided the Allied justification for demanding astronomical financial reparations.<br><br><span class="para-ref">[3.2]</span> In 1921, the Allied Reparations Commission fixed the total compensation bill at <strong>£6.6 billion</strong> (132 billion gold marks), payable in annual instalments of £100 million. Economists like John Maynard Keynes warned that these impossible demands would impoverish Central Europe and poison international relations.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> National humiliation spawned the dangerous <strong>Dolchstoßlegende</strong> ("stab-in-the-back" myth). Military commanders Hindenburg and Ludendorff claimed the German army was "undefeated in the field" and was betrayed from behind by socialist, liberal, and Jewish politicians in Berlin.<br><br><span class="para-ref">[4.2]</span> Right-wing nationalists branded the republican ministers who signed the armistice and treaty the <strong>"November Criminals."</strong> This corrosive myth permanently alienated military officers, judges, and conservative civil servants from the Weimar democracy.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> The treaty inflicted permanent geopolitical scars. The division of Germany by the Polish Corridor created lasting friction with Poland, while banning union with Austria (<em>Anschluss</em>) left millions of German-speakers outside the republic’s borders.<br><br><span class="para-ref">[5.2]</span> Rather than pacifying Europe, Versailles created an enduring grievance that extremists exploited for twenty years. By linking the new democracy directly to national shame and economic ruin, the treaty critically weakened Weimar’s foundations from its first days.',
    },
  ],

  lesson_1_3: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> In January 1919, left-wing revolutionaries launched the <strong>Spartacist Uprising</strong> in Berlin. Led by Rosa Luxemburg and Karl Liebknecht, 100,000 workers seized newspaper offices and government buildings, aiming to establish a communist council republic modeled on Russia.<br><br><span class="para-ref">[1.2]</span> Lacking army troops, Chancellor Ebert deployed the <strong>Freikorps</strong>—paramilitary units of demobilized nationalist soldiers. Armed with machine guns, the Freikorps brutally crushed the uprising, executing Liebknecht and Luxemburg without trial, creating permanent hatred between socialists and communists.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> Right-wing paramilitaries soon turned against the republic. In March 1920, when the government attempted to disband the Erhardt naval brigade under Versailles terms, 5,000 Freikorps troops marched on Berlin in the <strong>Kapp Putsch</strong>, installing civil servant Wolfgang Kapp as Chancellor.<br><br><span class="para-ref">[2.2]</span> Army Chief General von Seeckt refused to defend the government, stating: "Reichswehr does not fire on Reichswehr." Ebert fled to Stuttgart and called a nationwide general strike. Millions of workers cut off water, gas, and rail, collapsing the putsch within four days.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> In January 1923, after Germany missed coal deliveries, 60,000 French and Belgian troops marched into the industrial <strong>Ruhr Valley</strong>, seizing factories, steel mills, and railways to extract reparations by force.<br><br><span class="para-ref">[3.2]</span> The government ordered <strong>passive resistance</strong>: two million miners and railwaymen went on strike while the government paid their wages. French troops responded brutally, killing 132 civilians and expelling 150,000 residents from their homes, paralyzing Germany’s industrial heartland.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> To pay striking Ruhr workers and replace lost tax revenue, the government printed trillions of paper marks. This uncontrolled printing triggered catastrophic <strong>hyperinflation</strong>: by November 1923, a loaf of bread cost 201 billion marks (<span class="archival-meta-tag">Source A</span>).<br><br><span class="para-ref">[4.2]</span> Money lost all practical value; workers carried wages in wheelbarrows, while restaurants changed menu prices hourly. While industrialists paid off mortgage debts with worthless paper, the thrifty middle classes saw their life savings completely erased.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> Hyperinflation created clear economic winners and losers. Industrialists and mortgage-holders easily cleared debts, while farmers sold produce for barter. Conversely, pensioners, war widows, and middle-class savers on fixed incomes were plunged into destitution.<br><br><span class="para-ref">[5.2]</span> The psychological devastation was permanent. The German middle class felt betrayed by democracy, losing faith in republican institutions and becoming receptive to extremist promises of national revival and economic vengeance.',
    },
  ],

  lesson_1_4: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> In August 1923, President Ebert appointed <strong>Gustav Stresemann</strong> as Chancellor. Recognizing that Germany was disintegrating under hyperinflation, Stresemann ended passive resistance in the Ruhr, opening the path to negotiations with France.<br><br><span class="para-ref">[1.2]</span> In November 1923, financial commissioner Hjalmar Schacht destroyed the old marks and issued the <strong>Rentenmark</strong>, backed by mortgages on German agricultural and industrial land. Exchanged at one Rentenmark for one trillion old marks, the stable currency halted hyperinflation overnight.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> In 1924, Stresemann negotiated the <strong>Dawes Plan</strong> with American banker Charles Dawes. Annual reparations payments were reduced to £50 million, and US financiers agreed to loan Germany 800 million gold marks to rebuild infrastructure.<br><br><span class="para-ref">[2.2]</span> In 1929, the <strong>Young Plan</strong> cut reparations from £6.6 billion to £2 billion, extending payment across fifty-nine years. However, right-wing nationalists attacked the agreement for committing future generations to pay Allied debts.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> In foreign diplomacy, Stresemann pursued reconciliation. Under the 1925 <strong>Locarno Pact</strong>, Germany voluntarily guaranteed its western borders with France and Belgium, reassuring European powers and leading to Allied evacuation of the Rhineland.<br><br><span class="para-ref">[3.2]</span> Diplomatic reintegration followed: Germany entered the <strong>League of Nations</strong> with a permanent council seat in 1926, and signed the 1928 Kellogg-Briand Pact renouncing war. Stresemann was awarded the Nobel Peace Prize.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> In the arts, the Weimar era fostered an avant-garde cultural revolution. Berlin became the creative capital of Europe, celebrated for modernist literature, satirical theatre, and Fritz Lang’s cinema masterpiece <em>Metropolis</em>.<br><br><span class="para-ref">[4.2]</span> Walter Gropius founded the <strong>Bauhaus</strong> school of architecture in Dessau (<span class="archival-meta-tag">Source A</span>), championing functional geometric design. Meanwhile, expressionist painters Otto Dix and George Grosz produced unflinching satirical portraits of postwar German society.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> Industrial workers experienced tangible gains: real wages rose by 12% in 1928, and the 1927 Unemployment Insurance Act provided sickness and job benefits to 16.4 million employees. Over two million modern homes were constructed.<br><br><span class="para-ref">[5.2]</span> However, recovery rested on precarious foundations. As Stresemann warned before his death in 1929, Germany was "dancing on a volcano": economic growth relied entirely on short-term US loans that could be recalled at any moment.',
    },
  ],

  // =========================================================================
  // KEY TOPIC 2: HITLER’S RISE TO POWER, 1919–1933
  // =========================================================================
  lesson_2_1: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> In September 1919, army intelligence sent Corporal <strong>Adolf Hitler</strong> to investigate the tiny <strong>German Workers’ Party (DAP)</strong> in a Munich beer cellar. Founded by railway mechanic Anton Drexler (<span class="archival-meta-tag">Source A</span>), the party had just forty members.<br><br><span class="para-ref">[1.2]</span> When a speaker suggested Bavarian independence, Hitler delivered a fiery nationalist response that impressed Drexler. Given Drexler’s pamphlet, Hitler joined the executive committee as member 555, quickly taking charge of party propaganda.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> In February 1920, Hitler and Drexler drafted the party’s core <strong>Twenty-Five Point Programme</strong>. The manifesto combined fierce nationalism, antisemitism, and anti-capitalism, demanding the destruction of the Versailles Treaty and union with Austria.<br><br><span class="para-ref">[2.2]</span> In 1920, the group rebranded as the <strong>National Socialist German Workers’ Party (NSDAP)</strong>, adopting the swastika emblem and purchasing the <em>Völkischer Beobachter</em> newspaper to broadcast their radical message.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> In July 1921, Hitler challenged Drexler for the party leadership, threatening to resign unless granted dictatorial authority. Members voted overwhelmingly to install Hitler as party chairman under the supreme <strong>Führerprinzip</strong>.<br><br><span class="para-ref">[3.2]</span> Hitler’s magnetic oratorical technique packed Munich beer cellars. Speaking without notes, he began quietly before building to frenzied climaxes, blaming Versailles, communists, and Jews for all of Germany’s misfortunes.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> In August 1921, Hitler established the party’s paramilitary wing: the <strong>Sturmabteilung (SA)</strong>, or Brownshirts. Recruited largely from violent ex-Freikorps veterans, the SA was led by Ernst Röhm.<br><br><span class="para-ref">[4.2]</span> The brownshirt stormtroopers performed three essential tasks: guarding Nazi meetings, distributing propaganda leaflets, and violently breaking up rival communist and social democratic rallies in the streets.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> By late 1922, the NSDAP had expanded to 20,000 members, emerging as the dominant radical right-wing force in Bavaria. The party secured financial backing from wealthy Munich nationalists and aristocratic sympathisers.<br><br><span class="para-ref">[5.2]</span> However, outside Bavaria, the party remained an obscure fringe movement with zero national influence. Hitler realized he needed an audacious political stroke to seize national attention.',
    },
  ],

  lesson_2_2: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> By autumn 1923, hyperinflation and the French occupation of the Ruhr pushed Germany to the brink of civil war. Stresemann’s ending of passive resistance enraged Bavarian nationalists, who saw it as cowardly capitulation.<br><br><span class="para-ref">[1.2]</span> Inspired by Mussolini’s 1922 March on Rome, Hitler decided to launch a coup from Munich. With the backing of First World War hero General Ludendorff, Hitler planned to seize Bavaria’s government before marching on Berlin.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> On the evening of 8 November 1923, Bavarian leader Gustav von Kahr addressed 3,000 businessmen in Munich’s Bürgerbräukeller. Hitler and 600 SA stormtroopers surrounded the hall, firing a pistol into the ceiling.<br><br><span class="para-ref">[2.2]</span> Forcing Kahr into a back room at gunpoint, Hitler demanded his support for the national revolution. When Ludendorff endorsed the putsch, Kahr reluctantly agreed, but promptly warned the state police once released.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> At noon on 9 November 1923, Hitler and Ludendorff led 2,000 armed Nazis toward Munich’s central square. At the Residenzstraße, police opened fire: sixteen Nazis and four police officers were killed.<br><br><span class="para-ref">[3.2]</span> Ludendorff marched calmly through the gunfire, but Hitler dislocated his shoulder and fled by car. Two days later, Hitler was arrested at a friend’s country house, and the Nazi Party was banned.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> Hitler’s trial in February 1924 proved a propaganda masterstroke (<span class="archival-meta-tag">Source A</span>). Sympathetic judges gave him unlimited speaking time to denounce the Weimar Republic, transforming his treason trial into a national stage.<br><br><span class="para-ref">[4.2]</span> Sentenced to a lenient five years at Landsberg Fortress, Hitler served just nine months. There he dictated <strong>Mein Kampf</strong> to Rudolf Hess, outlining his ideas on racial hierarchy, <em>Lebensraum</em>, and the total destruction of democracy.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> Released in December 1924, Hitler relaunched the party at the 1926 Bamberg Conference, establishing tight control. He organized the party into regional branches (<em>Gaue</em>) and founded the elite <strong>SS</strong> bodyguard.<br><br><span class="para-ref">[5.2]</span> Yet between 1924 and 1929—the "Lean Years"—prosperity under Stresemann sidelined extremism: the Nazis won just twelve Reichstag seats (2.6%) in the 1928 national election.',
    },
  ],

  lesson_2_3: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> In October 1929, the Wall Street stock market crashed, plunging the global economy into depression. American banks abruptly recalled their 90-day Dawes Plan loans, draining Germany of investment capital.<br><br><span class="para-ref">[1.2]</span> Without credit, 50,000 German businesses went bankrupt, and major institutions like Danatbank collapsed. By 1932, German industrial production fell by 40%, throwing millions of factory workers out of work.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> Unemployment soared from 1.3 million in 1929 to over six million by early 1932. One in three German workers was jobless, with millions surviving on meager municipal breadlines and soup kitchens.<br><br><span class="para-ref">[2.2]</span> Chancellor Heinrich Brüning slashed welfare payments and raised taxes, earning the title "The Hunger Chancellor." Unable to secure parliamentary majorities, Brüning relied entirely on President Hindenburg’s Article 48 emergency decrees.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> As democratic institutions faltered, voters deserted moderate parties for radicals. The Communist Party (KPD) surged to 100 seats in 1932, terrifying middle-class business owners and wealthy landowners.<br><br><span class="para-ref">[3.2]</span> Hitler presented the Nazis as the sole bulwark against communist revolution. Propagandist Joseph Goebbels produced modern campaigns, chartering aircraft ("Hitler over Germany") to address multiple mass rallies daily.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> Nazi propaganda targeted specific grievances with tailored appeals (<span class="archival-meta-tag">Source A</span>). Farmers were promised agricultural price protection, while small shopkeepers were promised curbs on big Jewish-owned department stores.<br><br><span class="para-ref">[4.2]</span> Crucially, the 400,000-strong SA gave an impression of disciplined order amidst economic chaos, staging torchlight parades and violently brawling with communist Red Front fighters in working-class neighborhoods.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> The breakthrough came in the July 1932 election: the NSDAP won 230 seats (37.3%), becoming the largest party in the Reichstag. Hitler had transformed a fringe group into a mass electoral force.<br><br><span class="para-ref">[5.2]</span> With the Reichstag paralyzed by extremist factions, normal parliamentary governance ended. Hitler demanded the chancellorship, but President Hindenburg refused, calling him a "bohemian corporal."',
    },
  ],

  lesson_2_4: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> In the November 1932 election, the Nazi vote declined by two million votes, dropping from 230 to 196 seats. Campaign costs had exhausted party funds, and Goebbels wrote of gloom in his diary.<br><br><span class="para-ref">[1.2]</span> Organization leader Gregor Strasser urged Hitler to compromise and join a coalition government. Furious at what he viewed as betrayal, Hitler purged Strasser, leaving the party command unified around his leadership.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> In December 1932, Hindenburg appointed General Kurt von Schleicher as Chancellor. Schleicher attempted to split the Nazi Party by offering Strasser the vice-chancellorship, but the plot collapsed.<br><br><span class="para-ref">[2.2]</span> Schleicher then alienated rich Prussian landowners by proposing to redistribute bankrupt estates to unemployed workers. Hindenburg, himself a wealthy Prussian landowner, withdrew his presidential confidence.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> Ousted Chancellor Franz von Papen sought revenge against Schleicher. Papen formed a secret alliance with Hitler, meeting secretly in Cologne with bankers and industrial magnates.<br><br><span class="para-ref">[3.2]</span> Papen persuaded Hindenburg that appointing Hitler Chancellor was the only way to secure a conservative Reichstag majority, boasting that he would box Hitler in: "Within two months, we will have pushed Hitler into a corner until he squeals!"',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> The conservative elites engineered a coalition where Nazis held only three of twelve cabinet posts: Hitler as Chancellor, Wilhelm Frick as Interior Minister, and Hermann Göring as Prussian minister.<br><br><span class="para-ref">[4.2]</span> British political cartoonists captured this fatal miscalculation (<span class="archival-meta-tag">Source A</span>), showing Papen attempting to tame an uncontrollable predator. The conservative establishment mistakenly believed traditional cabinet procedures would restrain Hitler.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> On <strong>30 January 1933</strong>, President Hindenburg formally swore in Adolf Hitler as Chancellor of the German Republic. That evening, 25,000 uniformed SA men staged a triumphant torchlight parade through the Brandenburg Gate.<br><br><span class="para-ref">[5.2]</span> Hitler had achieved power legally through constitutional appointment. However, his conservative partners had gravely underestimated him: within months, Hitler used state power to dismantle the Weimar Republic entirely.',
    },
  ],

  // =========================================================================
  // KEY TOPIC 3: NAZI CONTROL AND DICTATORSHIP, 1933–1939
  // =========================================================================
  lesson_3_1: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> On 27 February 1933, six days before national elections, the Reichstag building in Berlin burned down (<span class="archival-meta-tag">Source A</span>). Police arrested Dutch communist Marinus van der Lubbe at the scene with matches.<br><br><span class="para-ref">[1.2]</span> Hitler seized on the fire to proclaim a communist conspiracy. The next day, Hindenburg signed the <strong>Reichstag Fire Decree</strong>, suspending civil liberties, freedom of speech, and privacy, enabling the arrest of 4,000 communists.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> In the 5 March election, the Nazis secured 43.9% of the vote. On 23 March 1933, the Reichstag convened in the Kroll Opera House to debate the fateful <strong>Enabling Act</strong>.<br><br><span class="para-ref">[2.2]</span> With SA stormtroopers chanting intimidation in the corridors and communist deputies jailed, the Centre Party backed the measure. Passing by 444 votes to 94, the act allowed Hitler to enact laws without parliamentary or presidential approval.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> Hitler implemented <strong>Gleichschaltung</strong> (co-ordination) to bring German society under total Nazi control. On 2 May 1933, SA squads ransacked trade union offices, arresting leaders and replacing independent unions with the state-run DAF.<br><br><span class="para-ref">[3.2]</span> On 14 July 1933, the regime banned all other political parties, declaring the NSDAP the sole legal party. Regional state parliaments were abolished in January 1934, centralizing authority under Berlin.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> SA Chief Ernst Röhm demanded that his three-million-man paramilitary absorb the regular army, alarming conservative generals and industrial magnates who threatened to convince Hindenburg to declare martial law.<br><br><span class="para-ref">[4.2]</span> On the <strong>Night of the Long Knives</strong> (30 June 1934), SS squads executed Röhm, senior SA leaders, and political rivals including General Schleicher and Gregor Strasser, killing over four hundred opponents.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> When the eighty-seven-year-old Hindenburg died on 2 August 1934, Hitler combined the offices of President and Chancellor, declaring himself <strong>Führer and Reich Chancellor</strong>.<br><br><span class="para-ref">[5.2]</span> That same day, every soldier in the German armed forces swore a mandatory personal oath of unconditional obedience to Adolf Hitler himself, cementing the totalitarian dictatorship.',
    },
  ],

  lesson_3_2: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> The core instrument of terror was Heinrich Himmler’s <strong>Schutzstaffel (SS)</strong>. Expanded from a small bodyguard into an ideological empire of 240,000 men, the SS operated Death’s Head units guarding concentration camps.<br><br><span class="para-ref">[1.2]</span> In March 1933, Himmler opened the first concentration camp at <strong>Dachau</strong> near Munich (<span class="archival-meta-tag">Source A</span>). Holding prisoners in "protective custody" without trial, camps subjected political opponents and trade unionists to brutal forced labor.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> Founded in 1933 by Göring and placed under Reinhard Heydrich, the <strong>Gestapo</strong> (secret state police) operated above the law, tapping telephones, intercepting post, and torturing suspects in secret cells.<br><br><span class="para-ref">[2.2]</span> Despite its terrifying reputation, the Gestapo was small, with only 30,000 officers nationwide. It relied extensively on voluntary denunciations by ordinary citizens reporting neighbours and colleagues to settle private grudges.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> The justice system was brought under strict Nazi control. All judges were forced to join the National Socialist League for the Maintenance of Law, swearing oaths to enforce Nazi racial principles over statutory law.<br><br><span class="para-ref">[3.2]</span> In 1934, Hitler set up the <strong>People’s Court</strong> (<em>Volksgerichtshof</em>) to try treason cases. Presided over by fanatical judges like Roland Freisler, the court operated without juries, handing down thousands of death sentences.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> In July 1933, Hitler signed a <strong>Concordat</strong> with Pope Pius XI, promising to protect Catholic schools and youth organizations if the Church stayed out of politics. The regime broke the treaty almost immediately.<br><br><span class="para-ref">[4.2]</span> In 1937, Pope Pius XI issued the encyclical <em>Mit brennender Sorge</em> ("With Burning Anxiety"), condemning Nazi racial idolatry. The regime retaliated by closing Catholic youth clubs and arresting hundreds of priests.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> Protestant churches were pressured into joining the state-sponsored <strong>Reich Church</strong> under pro-Nazi bishop Ludwig Müller, which removed the Old Testament and banned pastors of Jewish descent.<br><br><span class="para-ref">[5.2]</span> In response, Pastor Martin Niemöller and Dietrich Bonhoeffer founded the rival <strong>Confessing Church</strong> to defend traditional doctrine. Niemöller was arrested in 1937 and imprisoned in Dachau until 1945.',
    },
  ],

  lesson_3_3: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> In March 1933, Hitler created the <strong>Ministry of Public Enlightenment and Propaganda</strong>, appointing Dr. Joseph Goebbels. Goebbels declared his goal: to coordinate national culture until the German people surrendered completely.<br><br><span class="para-ref">[1.2]</span> The <strong>Reich Chamber of Culture</strong> controlled seven artistic disciplines: press, radio, cinema, theatre, music, literature, and art. All artists had to join their respective chamber; Jews and critics were excluded, barring them from working.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> On 10 May 1933, Nazi students staged massive public <strong>book burnings</strong> in university cities across Germany. In Berlin’s Opernplatz, 20,000 books by Einstein, Marx, and Freud were destroyed on bonfires.<br><br><span class="para-ref">[2.2]</span> The press was heavily censored under the 1933 Editorial Law: editors were legally liable for content, opposition newspapers were banned, and the official Nazi daily <em>Völkischer Beobachter</em> dictated the news.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> Goebbels recognized the persuasive power of radio. The regime subsidized the cheap <strong>People’s Receiver</strong> (<em>Volksempfänger</em>), expanding household ownership to 70% by 1939—the highest rate in the world.<br><br><span class="para-ref">[3.2]</span> Factory work was interrupted and street loudspeakers broadcast Hitler’s speeches. In cinema, all films required Goebbels’s approval, and cinemas were forced to show official newsreels alongside feature films.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> Annual <strong>Nuremberg Rallies</strong> staged spectacular displays of power (<span class="archival-meta-tag">Source A</span>). Architect Albert Speer created the "Cathedral of Light" using 130 anti-aircraft searchlights, surrounding 200,000 chanting party members.<br><br><span class="para-ref">[4.2]</span> Modernist art was condemned as "degenerate art" (<em>Entartete Kunst</em>). In 1937, the regime staged a Degenerate Art Exhibition in Munich, ridiculing abstract paintings, while promoting realistic neoclassical sculpture of Aryan bodies.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> The <strong>1936 Berlin Olympics</strong> provided an international propaganda showcase. The regime constructed a 100,000-seat stadium and temporarily took down anti-Jewish street signs to project an image of an efficient, modern nation.<br><br><span class="para-ref">[5.2]</span> However, African-American athlete Jesse Owens undermined Nazi racial theories by winning four gold medals, though Goebbels’s propaganda machine carefully framed Germany’s overall medal table victory as proof of Aryan superiority.',
    },
  ],

  lesson_3_4: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> Between 1933 and 1939, open active resistance was rare. Most Germans conformed to the dictatorship, motivated not only by terror, but by genuine pride in falling unemployment, modern autobahns, and foreign policy triumphs.<br><br><span class="para-ref">[1.2]</span> However, historians identify widespread private dissatisfaction: everyday grumbling (<em>Meckern</em>) over meat shortages and corrupt local officials. Many adopted the "two worlds" coping strategy: giving public Nazi salutes while criticizing policy privately.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> Working-class youth formed the <strong>Edelweiss Pirates</strong>, rejecting Hitler Youth regimentation. They wore checked shirts, hiked in the countryside, and attacked Hitler Youth patrols in cities like Cologne and Essen.<br><br><span class="para-ref">[2.2]</span> They chalked subversive slogans on walls (<span class="archival-meta-tag">Source A</span>) and listened to banned American jazz music. During the war, the regime cracked down ruthlessly, publicly hanging twelve Cologne Pirates in November 1944.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> Middle-class teenagers in Hamburg and Berlin formed the <strong>Swing Youth</strong>. They grew long hair, wore British tweed jackets, gathered in secret dance clubs, and played American jazz and swing music.<br><br><span class="para-ref">[3.2]</span> Heinrich Himmler viewed their defiance as moral treason, ordering police to send ringleaders to concentration camps for forced labor and military haircuts to eradicate decadent Anglo-American influences.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> Church opposition was voiced by courageous individuals. Catholic Bishop Clemens August Graf von Galen delivered fiery sermons protesting Gestapo terror and the secret euthanasia of disabled people.<br><br><span class="para-ref">[4.2]</span> In the Protestant church, Martin Niemöller and Dietrich Bonhoeffer organized the Confessing Church. Although public protests slowed the euthanasia programme, religious resistance focused primarily on defending church doctrine rather than overthrowing Hitler.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> Conservative military officers plotted to remove Hitler when his aggressive foreign policy threatened European war in 1938. Army Chief General Ludwig Beck organized the <strong>Oster Conspiracy</strong> to arrest Hitler during the Czechoslovakian crisis.<br><br><span class="para-ref">[5.2]</span> However, when British Prime Minister Neville Chamberlain conceded the Sudetenland at Munich, Hitler secured a bloodless triumph, shattering the plotters’ momentum and solidifying Hitler’s hold over the military command.',
    },
  ],

  // =========================================================================
  // KEY TOPIC 4: LIFE IN NAZI GERMANY, 1933–1939
  // =========================================================================
  lesson_4_1: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> Nazi ideology promoted a patriarchal view of women, rejecting Weimar emancipation as decadent. Hitler declared: "The world of the man is the state; the world of woman is her husband, family, and home." The regime championed <strong>Kinder, Küche, Kirche</strong>.<br><br><span class="para-ref">[1.2]</span> From 1933, women were purged from public professional life: female doctors, civil servants, and judges were dismissed, female lawyers barred from practice, and university enrollment for women strictly capped at 10%.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> To increase the Aryan birth rate, the regime introduced the <strong>Law for the Encouragement of Marriage</strong> in 1933. Newlyweds received a 1,000-mark interest-free loan; for each child born, 25% of the loan was permanently forgiven.<br><br><span class="para-ref">[2.2]</span> Contraception and abortion were made illegal, and healthy Aryan women were awarded the <strong>Cross of Honour of the German Mother</strong> (<span class="archival-meta-tag">Source A</span>): bronze for four children, silver for six, and gold for eight or more.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> In 1935, Himmler founded the secret <strong>Lebensborn</strong> (Fountain of Life) programme. Originally providing maternity homes for wives of SS officers, it expanded to arrange meetings between single women and SS men to produce racially pure children.<br><br><span class="para-ref">[3.2]</span> Over 8,000 children were born in Lebensborn homes, where babies were christened in SS rituals under daggers, demonstrating the regime’s view of women as biological instruments of the state.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> Women were organized into compulsory state leagues: the <strong>National Socialist Women’s League</strong> (NS-Frauenschaft) and German Women’s Enterprise, teaching domestic economy, healthy cookery, and racial hygiene.<br><br><span class="para-ref">[4.2]</span> The regime dictated personal appearance: women were urged to wear modest traditional dirndls, style hair in plain braids or buns, avoid cosmetics and trousers, and abstain from smoking or dieting to preserve fertility.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> When rapid rearmament caused industrial labor shortages after 1937, the regime faced a contradiction: needing women workers in factories while telling them to stay home. A compulsory "Duty Year" was introduced for unmarried women.<br><br><span class="para-ref">[5.2]</span> By 1939, female employment had actually risen from 11.6 million in 1933 to 14.6 million, proving that war preparation forced the regime to compromise its ideological domestic dogmas.',
    },
  ],

  lesson_4_2: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> Hitler recognized that the Thousand-Year Reich depended on capturing young minds. Led by Baldur von Schirach, boys progressed from <em>Pimpfe</em> (ages 6–10) to <em>Jungvolk</em> (ages 10–14) and into the <strong>Hitler Youth</strong> (HJ, ages 14–18).<br><br><span class="para-ref">[1.2]</span> In 1936, membership was made compulsory, expanding to 7.2 million by 1939. Boyhood activities revolved around military preparation: route marches with heavy packs, trench digging, and rifle target practice.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> Girls joined the <em>Jungmädel</em> (ages 10–14) and the <strong>League of German Girls</strong> (BDM, ages 14–18) (<span class="archival-meta-tag">Source A</span>). Activities combined physical fitness, gymnastics, and camping with domestic training.<br><br><span class="para-ref">[2.2]</span> Girls learned infant care, needlework, and racial selection. At age seventeen, girls entered the <em>Faith and Beauty</em> society, preparing them to manage households and raise children in accordance with Nazi ideology.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> The school curriculum was thoroughly Nazified. All teachers were forced to join the National Socialist Teachers’ League, swearing personal loyalty to Hitler, while Jewish teachers were dismissed.<br><br><span class="para-ref">[3.2]</span> History was rewritten to praise Germanic heroes and condemn Versailles; Biology taught racial hierarchy and eugenics; and Mathematics calculated the cost of maintaining disabled patients versus building bombers.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> Physical education dominated school timetables, taking up 15% of the day. Boys engaged in boxing and stamina sports to produce hardened soldiers, while girls practiced gymnastics for motherhood.<br><br><span class="para-ref">[4.2]</span> Elite training academies—Adolf Hitler Schools and Napolas (National Political Educational Institutes)—recruited racially pure boys for rigorous military discipline to produce future SS leaders.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> Indoctrination achieved significant success: millions of German youths developed fanatical loyalty to Hitler, often reporting parents who criticized the regime to the Gestapo.<br><br><span class="para-ref">[5.2]</span> However, academic standards dropped sharply as sport replaced scholarship, while alienated teenagers rebelled, forming underground groups like the Edelweiss Pirates and Swing Youth.',
    },
  ],

  lesson_4_3: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> When Hitler took power in 1933, six million Germans were unemployed. On 2 May 1933, the regime raided trade union offices, abolishing independent unions and replacing them with the <strong>German Labour Front (DAF)</strong> under Dr. Robert Ley.<br><br><span class="para-ref">[1.2]</span> DAF membership was practically compulsory, reaching 22 million workers. Strikes were outlawed, wages were frozen, and every worker was issued a Work Book (<em>Arbeitsbuch</em>), without which they could not change jobs.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> In 1935, the regime made the <strong>Reich Labour Service (RAD)</strong> compulsory for all men aged 18 to 25, requiring six months of manual service living in tent camps under military discipline.<br><br><span class="para-ref">[2.2]</span> Workers drained marshes, planted forests, and built 7,000 km of dual-carriageway <strong>Autobahnen</strong> (<span class="archival-meta-tag">Source A</span>). The scheme slashed official unemployment numbers while creating infrastructure to move military divisions rapidly.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> Conscription was reintroduced in 1935, expanding the army from 100,000 to 1.4 million men by 1939. Massive rearmament stimulated heavy industry, filling order books for steel mills and munitions factories.<br><br><span class="para-ref">[3.2]</span> In 1936, Hermann Göring launched the <strong>Four-Year Plan</strong> to achieve economic self-sufficiency (<strong>Autarky</strong>), producing synthetic rubber, oil, and textiles to ensure Germany could survive a wartime naval blockade.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> To maintain worker morale, Ley founded <strong>Strength Through Joy</strong> (<em>Kraft durch Freude</em>, or KdF). The organization provided subsidized holidays, theatre tickets, and Mediterranean cruises for millions of industrial workers.<br><br><span class="para-ref">[4.2]</span> The regime introduced the <strong>Volkswagen Beetle</strong> savings scheme: workers saved 5 marks a week in stamp booklets to purchase a family car. Over 300,000 participated, though factories produced military vehicles instead, delivering no civilian cars.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> By 1939, official unemployment had plummeted to 300,000, creating an appearance of economic prosperity. However, historians highlight "invisible unemployment": Jews, dismissed women, and RAD conscripts were excluded from official figures.<br><br><span class="para-ref">[5.2]</span> Furthermore, while total earnings rose, the average working week lengthened from 43 to 47 hours, food prices increased, and the Four-Year Plan accumulated massive deficits, leaving the economy dependent on conquest to avoid bankruptcy.',
    },
  ],

  lesson_4_4: [
    {
      act: 1,
      text: '<span class="para-ref">[1.1]</span> Nazi ideology was rooted in Social Darwinism: Germans were portrayed as the Aryan "master race" (<em>Herrenvolk</em>), while Slavs, Roma, and Jews were classified as sub-humans (<em>Untermenschen</em>) or racial parasites.<br><br><span class="para-ref">[1.2]</span> On 1 April 1933, the regime staged a national <strong>boycott of Jewish shops and businesses</strong>, with SA men painting yellow Stars of David on windows. One week later, the Civil Service Law dismissed all Jewish judges, civil servants, and teachers.',
    },
    {
      act: 2,
      text: '<span class="para-ref">[2.1]</span> In September 1935, the regime enacted the <strong>Nuremberg Laws</strong>. The Reich Citizenship Law stripped Jews of German citizenship, making them stateless subjects without voting rights or passport protections.<br><br><span class="para-ref">[2.2]</span> The Law for the Protection of German Blood and German Honour outlawed marriages and sexual relations between Jews and German citizens. Being Jewish was defined biologically: anyone with three or four Jewish grandparents was legally Jewish.',
    },
    {
      act: 3,
      text: '<span class="para-ref">[3.1]</span> On 9–10 November 1938, the regime staged the <strong>Kristallnacht</strong> (Night of Broken Glass) pogrom following the assassination of a German diplomat in Paris by a young Polish Jew.<br><br><span class="para-ref">[3.2]</span> SA stormtroopers destroyed over 1,000 synagogues, ransacked 7,500 Jewish businesses (<span class="archival-meta-tag">Source A</span>), and murdered 91 Jews. Over 20,000 Jewish men were sent to concentration camps, and the Jewish community was fined one billion marks for the damage.',
    },
    {
      act: 4,
      text: '<span class="para-ref">[4.1]</span> Following Kristallnacht, persecution accelerated. In November 1938, Jewish children were banned from attending state schools, and in 1939, Jews were forced to surrender gold and jewellery and had their passports stamped with a red "J".<br><br><span class="para-ref">[4.2]</span> Men were forced to add "Israel" and women "Sara" to their official names. In 1939, the Reich Central Office for Jewish Emigration was created under Reinhard Heydrich to forcibly deport Jews from Germany.',
    },
    {
      act: 5,
      text: '<span class="para-ref">[5.1]</span> Other minority groups suffered brutal persecution. In 1933, the Sterilization Law forced the surgical sterilization of 400,000 individuals with hereditary illnesses, including schizophrenia, epilepsy, and blindness.<br><br><span class="para-ref">[5.2]</span> In 1939, the secret <strong>Aktion T4</strong> euthanasia programme began, murdering over 70,000 mentally and physically disabled children and adults with carbon monoxide gas in psychiatric hospitals, prefiguring the Holocaust.',
    },
  ],
};

function applyTonedDownNarratives() {
  console.log(`\n======================================================`);
  console.log(`📉 TONING DOWN WEIMAR NARRATIVE PARAGRAPH LENGTHS`);
  console.log(`======================================================`);

  let modifiedCount = 0;

  unitData.lessons.forEach((l) => {
    const toned = TONED_NARRATIVES[l.id];
    if (!toned) {
      console.warn(`⚠️ Warning: No toned narrative found for ${l.id}`);
      return;
    }

    if (!Array.isArray(l.narrative_blocks) || l.narrative_blocks.length !== 5) {
      console.error(`❌ Lesson ${l.id} does not have 5 narrative blocks!`);
      return;
    }

    toned.forEach((t, idx) => {
      const b = l.narrative_blocks[idx];
      b.text = t.text;
    });

    const wordCounts = l.narrative_blocks.map(
      (b) =>
        (b.text || '')
          .replace(/<[^>]+>/g, ' ')
          .split(/\s+/)
          .filter(Boolean).length,
    );
    const totalWords = wordCounts.reduce((a, b) => a + b, 0);
    console.log(`✅ ${l.id}: 5 blocks, words: [${wordCounts.join(', ')}] = ${totalWords} total`);
    modifiedCount++;
  });

  const exportCode = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
  fs.writeFileSync(dataJsPath, exportCode, 'utf8');
  console.log(`\n🎉 Successfully updated ${modifiedCount} lessons in ${dataJsPath}!`);
}

applyTonedDownNarratives();
