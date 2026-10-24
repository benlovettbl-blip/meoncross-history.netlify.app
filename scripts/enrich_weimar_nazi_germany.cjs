const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'weimar_nazi_germany', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'weimar_nazi_germany.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const WEIMAR_PEDAGOGY = {
  // LESSON 1.1: Origins of the Republic (1918–1919)
  lesson_1_1: [
    {
      match: /Kiel|Sailors/i,
      hinge_question:
        'Why did the mutiny of sailors at Kiel prove far more fatal to the Kaiser’s regime than military defeats on the Western Front?',
      discussion_ideas: [
        'Domestic Collapse of Military Authority: When admirals ordered a suicidal final naval assault against the Royal Navy, sailors refused orders, arrested their officers, and raised red flags; this insubordination instantly shattered the military command hierarchy inside Germany, proving the Kaiser could no longer enforce discipline in his armed forces.',
        "Spreading Revolutionary Fire Across Industrial Cities: Mutineers quickly formed Sailors' and Workers' Councils (Räte) that spread like wildfire to Hamburg, Hanover, and Munich; by seizing control of civilian city councils and railway hubs, the mutiny transformed a frontline military stalemate into an unstoppable domestic revolution that forced Kaiser Wilhelm II to abdicate within days.",
      ],
    },
    {
      match: /Armed Workers|German Revolution/i,
      hinge_question:
        'How does Source B illustrate why Friedrich Ebert felt compelled to make a secret alliance with the imperial military leadership to maintain public order?',
      discussion_ideas: [
        "The photograph shows armed civilian revolutionaries and radicalized soldiers holding rifles atop barricades in Berlin streets, threatening to mount a Bolshevik-style communist revolution similar to Russia's in 1917. Lacking loyal police forces to restore civil order and prevent civil war, new Chancellor Friedrich Ebert made the secret Ebert-Groener Pact with General Wilhelm Groener on 10 November 1918: the imperial army agreed to defend the moderate democratic government in exchange for Ebert guaranteeing the army's autonomy and suppressing left-wing uprisings.",
      ],
    },
    {
      match: /Weimar|National Assembly/i,
      hinge_question:
        'Why did holding the National Assembly in the quiet cultural town of Weimar symbolize both the democratic hopes and the physical vulnerability of the new republic?',
      discussion_ideas: [
        'Physical Vulnerability to Urban Violence in Berlin: The newly elected delegates could not safely meet in the capital because Berlin was paralyzed by violent street fighting, Spartacist communist barricades, and Freikorps gunfire; retreating 150 miles south to the provincial theatre town of Weimar was a humiliating admission that the new government could not control its own capital city.',
        'Symbolic Connection to Enlightenment Humanism: Weimar was the historic home of Goethe and Schiller, embodying German classical literature, enlightenment, and European high culture; convening there was intended to signal to the victorious Allies that Germany had rejected Prussian militarism in favor of progressive constitutional democracy.',
      ],
    },
  ],

  // LESSON 1.2: Early Challenges to the Republic (1919–1923)
  lesson_1_2: [
    {
      match: /Stab in the Back|Dolchstoßlegende/i,
      hinge_question:
        "Why was the 'Stab in the Back' myth so politically toxic for the long-term legitimacy of the Weimar democracy?",
      discussion_ideas: [
        "Absolving the Imperial Military Leadership: Field Marshals Hindenburg and Ludendorff fabricated the claim that the German army was 'undefeated in the field' and had been stabbed in the back by unpatriotic socialists, trade unionists, and Jews on the home front; this diverted public blame away from the high command's actual military exhaustion in 1918 and cast the new democratic politicians as traitors ('November Criminals').",
        "Permanently Undermining Democratic Legitimacy: By branding the Weimar Republic's founding leaders as traitors who surrendered a winnable war and accepted the hated Treaty of Versailles, the myth convinced millions of conservative nationalists and veterans that the democracy was born of treason, providing fertile ground for right-wing paramilitaries and Hitler’s rhetoric.",
      ],
    },
    {
      match: /Kapp Putsch|Freikorps/i,
      hinge_question:
        'What does General von Seeckt’s refusal to order the regular army to fire on the Freikorps reveal about the loyalty of the German military to the Weimar Republic?',
      discussion_ideas: [
        "When civil servant Wolfgang Kapp and the Erhardt Naval Brigade marched into Berlin to overthrow the government, Army Commander General Hans von Seeckt coldly told President Ebert that 'Reichswehr does not fire on Reichswehr'. This refusal proved that the regular German military hierarchy felt zero personal loyalty to the constitutional democratic republic; the army operated as a semi-independent 'state within a state', tolerating the civilian government only when it served military interests and refusing to defend it against right-wing nationalist comrades.",
      ],
    },
    {
      match: /Trillion|Hyperinflation|Banknote/i,
      hinge_question:
        'Why did the complete wipeout of middle-class savings during the 1923 hyperinflation prove more politically damaging to the Weimar Republic than the military surrender of 1918?',
      discussion_ideas: [
        'Catastrophic Destruction of Middle-Class Security: Printing astronomical banknote denominations destroyed the value of life savings, war bonds, fixed pensions, and insurance policies; while industrial barons paid off bank debts with worthless paper and workers negotiated daily cash wages, thrifty middle-class citizens (the Mittelstand) were reduced to abject poverty overnight, bartering heirlooms for food.',
        'Permanent Alienation from Democratic Values: Hardworking middle-class families felt deeply humiliated that years of thrift and civic duty were wiped out by government mismanagement; traumatized by financial ruin, they permanently lost faith in democratic Weimar institutions and became receptive to radical extremist promises of order, retribution, and dictatorship.',
      ],
    },
  ],

  // LESSON 1.3: The Recovery of the Republic (1924–1929)
  lesson_1_3: [
    {
      match: /Rentenmark|Currency Collapse/i,
      hinge_question:
        'Why was introducing a currency backed by physical land assets (the Rentenmark) so crucial in restoring public trust in German money?',
      discussion_ideas: [
        'Following hyperinflation, the German public completely rejected fiat paper currency printed without backing. Newly appointed Chancellor Gustav Stresemann and currency commissioner Hjalmar Schacht abolished the worthless Old Mark and introduced the temporary Rentenmark, backing its value with a legal mortgage over German agricultural and industrial land. By strictly capping the total money supply to 3.2 billion Rentenmarks and establishing a fixed exchange rate (one Rentenmark = one trillion old marks), they restored psychological confidence, stopped the printing presses, and stabilized domestic consumer prices within weeks.',
      ],
    },
    {
      match: /Locarno/i,
      hinge_question:
        'Why did right-wing nationalists accuse Stresemann of betrayal for signing the Locarno Treaties, even though they restored Germany’s standing as a great power?',
      discussion_ideas: [
        'Nationalist Rage at Accepting the Western Border: The Locarno Pact formally reaffirmed Germany’s western borders with France and Belgium and accepted the permanent demilitarization of the Rhineland; right-wing nationalists (like Alfred Hugenberg and the Nazi Party) branded this treason, claiming Stresemann had voluntarily surrendered Alsace-Lorraine and endorsed the hated Treaty of Versailles.',
        "Stresemann's Realpolitik of Revisionism: In reality, Stresemann’s strategy of 'fulfilment' (Erfüllungspolitik) was brilliantly calculating: by reassuring Britain and France in the west, he ended Germany's international isolation, secured French troop withdrawal from the Ruhr, and deliberately left Germany's eastern borders (with Poland and Czechoslovakia) open to future diplomatic revision.",
      ],
    },
    {
      match: /League of Nations/i,
      hinge_question:
        'How did Germany’s permanent seat on the League of Nations Council prove that Stresemann’s peaceful diplomatic strategy achieved more than violent confrontation?',
      discussion_ideas: [
        'Germany’s admission to the League of Nations as a permanent council member—possessing full veto power alongside Britain, France, and Italy—officially ended its status as an international pariah and vanquished enemy. By demonstrating that Germany was a trusted, equal great power through peaceful multilateral diplomacy rather than futile armed rebellion, Stresemann was able to negotiate the Young Plan (reducing reparations by 20%) and secure early Allied military withdrawal from the Rhineland by 1930.',
      ],
    },
  ],

  // LESSON 1.4: Changes in Society (1924–1929)
  lesson_1_4: [
    {
      match: /New Woman/i,
      hinge_question:
        "To what extent did the fashionable image of the 'New Woman' represent the lived reality of ordinary German women outside the capital city of Berlin?",
      discussion_ideas: [
        'Urban Emancipation in Weimar Metropolis: The Weimar Constitution granted women equal voting rights (Article 109), and in vibrant cities like Berlin, young single women celebrated newfound independence: working as stenographers and shop clerks, wearing short bobbed hair, smoking in public, and enjoying independent social nightlife.',
        "Conservative Provincial Reality and Social Backlash: Outside cosmopolitan Berlin, traditional patriarchal structures remained deeply entrenched: the vast majority of rural and provincial women remained unpaid domestic homemakers or agricultural workers, while conservative churches and nationalists furiously condemned the 'New Woman' as an immoral, decadent threat to traditional family life and German birth rates.",
      ],
    },
    {
      match: /Bauhaus/i,
      hinge_question:
        'Why did modern, functionalist architecture like the Bauhaus movement become such an intense political battleground in Weimar Germany?',
      discussion_ideas: [
        "Radical Rejection of Imperial Ornamentation: Founded by Walter Gropius, the Bauhaus championed 'form follows function' using steel frames, reinforced concrete, and expansive glass curtain walls; to progressive Weimar modernists, this functionalist aesthetic represented democratic equality, socialist hygiene, and liberation from pretentious 19th-century imperial ornamentation.",
        "Nationalist Condemnation of 'Cultural Bolshevism': Conservative nationalists and right-wing reactionaries loathed the flat roofs and stark geometric designs, denouncing them as un-German, 'cultural Bolshevik', and degenerate; when right-wing councils took power in Dessau in 1932, they immediately terminated municipal funding and forced the school to close.",
      ],
    },
    {
      match: /Modernist Culture|Golden Twenties/i,
      hinge_question:
        'How did the explosion of artistic freedom in Weimar Berlin contribute to deeper cultural and political divisions across Germany?',
      discussion_ideas: [
        'Pioneering Avant-Garde Expressionism and Satire: The abolition of imperial censorship fostered unprecedented creative daring: artists like Otto Dix and George Grosz produced biting visual satires exposing military corruption and bourgeois greed, while Brechtian political theatre and cabaret challenged conventional morality and authority.',
        "Fueling the Conservative Moral Panic: For conservative, religious, and rural Germans, Berlin was seen as a degenerate 'Babylon' of vice, promiscuity, and cultural decay; this intense moral disgust was ruthlessly exploited by the Nazi Party, which promised to cleanse Germany of 'degenerate art' (Entartete Kunst) and restore traditional Germanic values.",
      ],
    },
  ],

  // LESSON 2.1: Early Development of Nazi Party (1919–1922)
  lesson_2_1: [
    {
      match: /Drexler/i,
      hinge_question:
        'How did Anton Drexler’s original nationalist-socialist ideas provide the ideological springboard for Adolf Hitler’s political career?',
      discussion_ideas: [
        'Anton Drexler, a Munich railway mechanic, formed the DAP to combine intense pan-German nationalism and anti-Semitism with working-class anti-capitalist rhetoric. Sent as an army spy to investigate the group in September 1919, Hitler recognized that Drexler’s synthesis of nationalism and socialism provided the exact formula to win German workers away from Marxist communism; joining as member #55, Hitler rapidly took over party propaganda and redesigned the movement around his own dynamic public speaking.',
      ],
    },
    {
      match: /25-Point/i,
      hinge_question:
        'How did the 25-Point Programme cleverly combine nationalist foreign policy demands with anti-capitalist promises to attract working-class support?',
      discussion_ideas: [
        'Radical Nationalist Foreign Policy: Points 1, 2, and 4 demanded the union of all Germans into a Greater Germany (Grossdeutschland), the immediate revocation of the Versailles and Saint-Germain peace treaties, land and colonies (Lebensraum), and the total denial of citizenship to Jewish people.',
        'Populist Economic and Socialist Pledges: To appeal to impoverished workers, points 11 to 14 demanded the abolition of unearned incomes, the nationalization of commercial trusts, profit-sharing in heavy industry, and the confiscation of wartime war-profiteering wealth, presenting the party as a radical alternative to both capitalism and communism.',
      ],
    },
    {
      match: /Beer Hall|Hitler Addressing/i,
      hinge_question:
        'Why was Adolf Hitler’s oratorical style so decisive in enabling him to demand absolute dictatorial leadership (Führerprinzip) over the Nazi Party by July 1921?',
      discussion_ideas: [
        'Hitler transformed traditional political lectures into hypnotic, theatrical mass spectacles: arriving deliberately late to heighten tension, speaking softly before building into frenzied, sweat-drenched climaxes with theatrical hand gestures, he tapped into the visceral anger of war veterans, hyperinflated savers, and disaffected youths. Because party membership and revenue depended entirely on Hitler’s unique ability to pack beer halls and generate publicity, he threatened to resign in July 1921 unless the committee ousted Drexler and granted him absolute, dictatorial authority as party chairman.',
      ],
    },
  ],

  // LESSON 2.2: Munich Putsch and Lean Years (1923–1929)
  lesson_2_2: [
    {
      match: /Munich Putsch Treason Trial|Defendants/i,
      hinge_question:
        'How did the sympathetic attitude of the right-wing Munich judiciary turn Hitler’s military failure into a propaganda triumph?',
      discussion_ideas: [
        'Turning the Courtroom into a National Stage: Rather than treating Hitler as a dangerous armed traitor, the right-wing judges allowed him unlimited speaking time to cross-examine prosecution witnesses and deliver fiery, patriotic speeches accusing the Weimar government of high treason; reported verbatim in newspapers across Germany, the trial transformed a local Bavarian rebel into a famous national hero.',
        'Ludicrously Lenient Sentencing: Despite high treason carrying a mandatory capital sentence or life imprisonment, Hitler was awarded the minimum sentence of five years in comfortable Landsberg Castle with early parole eligibility, while General Ludendorff was acquitted entirely, showing the judicial system’s deep prejudice against the democratic republic.',
      ],
    },
    {
      match: /Landsberg|Mein Kampf/i,
      hinge_question:
        "How did Hitler’s imprisonment in Landsberg lead directly to the change in Nazi strategy towards the 'Legal Path to Power'?",
      discussion_ideas: [
        "The bloody failure of the Munich Putsch at the Odeonsplatz taught Hitler that armed coups against the German military and police were impossible. In Landsberg, while dictating Mein Kampf to Rudolf Hess, Hitler resolved upon the 'Legal Path to Power' (Legalitätstaktik): the Nazi Party would hold its nose, enter democratic Reichstag elections, establish nationwide party infrastructure, and use the constitution’s democratic machinery to destroy democracy from within ('We will outvote them rather than outshoot them').",
      ],
    },
  ],

  // LESSON 2.3: Growth of Nazi Support (1929–1932)
  lesson_2_3: [
    {
      match: /Labour Exchange|Great Depression/i,
      hinge_question:
        'Why did Chancellor Brüning’s austerity policies (cutting wages and unemployment benefits) drive millions of desperate Germans towards extremist parties?',
      discussion_ideas: [
        'Deepening Economic Misery and Destitution: Facing catastrophic unemployment reaching 6 million by 1932, Chancellor Heinrich Brüning feared renewed inflation and dogmatically balanced the budget by raising taxes, slashing civil service salaries, and cutting unemployment relief; this orthodox deflationary policy collapsed consumer spending and pushed millions of working-class families into starvation.',
        'The Death of Parliamentary Democracy: Lacking a Reichstag majority to pass his austerity budgets, Brüning ruled by presidential emergency decree under Article 48, establishing authoritarian rule and convincing the electorate that parliamentary democracy was dead, driving voters to the communist KPD and Nazi NSDAP.',
      ],
    },
    {
      match: /Our Last Hope|Election Poster/i,
      hinge_question:
        "How did Joseph Goebbels use emotional, non-specific slogans like 'Our Last Hope' to appeal across class divisions during the Depression?",
      discussion_ideas: [
        "Designed by Mjölnir (Hans Schweitzer), the poster features haunting, haggard faces of unemployed workers, downcast fathers, and impoverished mothers staring desperately into the darkness beneath the stark white text 'Our Last Hope: Hitler'. By deliberately omitting specific, controversial economic policies, Goebbels elevated Hitler above divisive party squabbles, presenting him as a messianic national savior who would unify all social classes into a classless 'People's Community' (Volksgemeinschaft) and restore bread and work.",
      ],
    },
  ],

  // LESSON 2.4: How Hitler Became Chancellor (1932–1933)
  lesson_2_4: [
    {
      match: /Shrewd Move|Papen and Hitler/i,
      hinge_question:
        "Why did Franz von Papen’s boast that 'Within two months we will have pushed Hitler so far into a corner that he will squeak' prove to be such a catastrophic miscalculation?",
      discussion_ideas: [
        "Arrogant Aristocratic Illusion of Control: Von Papen believed his conservative clique could exploit Hitler's mass popular following while keeping him safely shackled: the cabinet contained only three Nazis out of eleven ministers, with Papen as Vice-Chancellor holding the right to attend every meeting between Hitler and President Hindenburg.",
        'Underestimating the Revolutionary Power of the Nazi Apparatus: Papen failed to grasp that the two Nazi ministers held the critical levers of executive coercion: Wilhelm Frick controlled the Reich Ministry of the Interior, while Hermann Göring controlled the Prussian Police; by deputizing 50,000 SA stormtroopers as auxiliary police, Hitler took physical control of the state, utterly marginalizing the conservative aristocracy within weeks.',
      ],
    },
    {
      match: /Hindenburg and.*Hitler|30 January 1933/i,
      hinge_question:
        'How did Hitler use the traditional prestige of Field Marshal von Hindenburg to make his new government appear respectable to the German army and middle classes?',
      discussion_ideas: [
        'The photograph of the frail 85-year-old aristocratic Field Marshal standing in imperial military regalia alongside Chancellor Hitler in formal civilian top hat and tails was calculated propaganda. It cloaked the radical, violent Nazi movement in the venerable mantle of Prussian monarchist tradition, reassuring conservative army generals, big business industrialists, and civil servants that Hitler was a disciplined, patriotic leader working under the supervision of Germany’s greatest war hero rather than a dangerous revolutionary.',
      ],
    },
  ],

  // LESSON 3.1: Creation of a Dictatorship (1933–1934)
  lesson_3_1: [
    {
      match: /Reichstag Fire/i,
      hinge_question:
        'Why did the Reichstag Fire provide Adolf Hitler with the ideal pretext to dismantle civil liberties and eliminate the German Communist Party?',
      discussion_ideas: [
        'Fabricating an Imminent Communist Coup: Catching Dutch communist Marinus van der Lubbe at the scene allowed Hitler and Göring to claim the fire was the signal for a nationwide armed Bolshevik uprising; terrifying President Hindenburg into action, Hitler persuaded him to sign the Reichstag Fire Decree on 28 February 1933.',
        'Permanent Suspension of Constitutional Civil Rights: The decree permanently suspended fundamental Weimar constitutional rights—freedom of speech, press, assembly, habeas corpus, and privacy of communications; this authorized the police and SA to arrest 4,000 communist leaders, shut down opposition newspapers, and outlaw the KPD days before the March Reichstag elections.',
      ],
    },
    {
      match: /Enabling Act|Kroll Opera House/i,
      hinge_question:
        'How did the physical presence of armed SA and SS stormtroopers inside the debating chamber ensure the passage of the Enabling Act?',
      discussion_ideas: [
        "Meeting in the temporary Kroll Opera House draped in colossal swastika banners, parliamentary deputies were forced to walk through gauntlets of armed SA and SS troopers chanting 'Full powers, or else fire and murder!'. With 81 communist deputies already banned or imprisoned, and Center Party leader Ludwig Kaas intimidated into voting in favor after false promises on Catholic schools, the atmosphere of terror ensured the two-thirds constitutional majority (444 to 94), legally transferring all legislative power from the Reichstag to Hitler's cabinet for four years and creating a legal dictatorship.",
      ],
    },
  ],

  // LESSON 3.2: Police State and Religion (1933–1939)
  lesson_3_2: [
    {
      match: /Dachau/i,
      hinge_question:
        'Why was the establishment of concentration camps like Dachau in 1933 so essential for terrorizing ordinary German citizens into conformity?',
      discussion_ideas: [
        "Extra-Judicial Elimination of Political Dissidents: Established by Heinrich Himmler in March 1933, Dachau bypassed normal judicial courts, judges, and lawyers; political prisoners (communists, Social Democrats, and trade union organizers) were held in indefinite 'protective custody' (Schutzhaft) under brutal SS guard, destroying any organized underground political opposition.",
        "Psychological Intimidation of the General Public: The existence and brutality of Dachau was publicized intentionally in local newspapers as a chilling warning to ordinary Germans; the phrase 'Be quiet or you will end up in Dachau' created pervasive self-censorship, deterring dissent or workplace resistance.",
      ],
    },
    {
      match: /Reichskonkordat/i,
      hinge_question:
        'How did the Reichskonkordat provide Hitler with international respectability while effectively neutralizing political Catholic opposition within Germany?',
      discussion_ideas: [
        "International Diplomatic Legitimacy: Signed by Vice-Chancellor Franz von Papen and Cardinal Pacelli (later Pope Pius XII), the concordat was the Nazi government's first major international bilateral treaty; it granted Hitler vital global prestige, indicating to the world that the Catholic Church recognized his regime as a legitimate moral authority.",
        'Neutralization of Domestic Political Catholicism: In exchange for Hitler promising to guarantee Catholic religious services and youth schooling, the Vatican ordered German bishops to depoliticize: Catholic priests were forbidden from political activity, and the Catholic Center Party (Zentrum) disbanded voluntarily, eliminating the last major organized non-Nazi political party in Germany.',
      ],
    },
  ],

  // LESSON 3.3: Controlling and Influencing Attitudes (1933–1939)
  lesson_3_3: [
    {
      match: /People’s Receiver|Volksempfänger/i,
      hinge_question:
        'Why did Joseph Goebbels consider the cheap People’s Receiver radio to be the most vital instrument of propaganda in the modern totalitarian state?',
      discussion_ideas: [
        'Priced affordably at just 76 Reichsmarks (two weeks’ average wage) and mass-produced with government subsidies, the Volksempfänger VE301 brought Nazi propaganda directly into living rooms across Germany. Crucially, the radio was engineered with short-range reception designed specifically to block foreign broadcasts like the BBC; by 1939, over 70% of German households owned one (the highest percentage in the world), enabling Goebbels to beam Hitler’s speeches simultaneously into factories, cafes, and homes, creating a captive national audience for total ideological indoctrination.',
      ],
    },
    {
      match: /Nuremberg.*Zeppelin|Zeppelin Field/i,
      hinge_question:
        "How did Albert Speer’s 'Cathedral of Light' and vast choreographed rallies create a psychological sense of invincible collective power?",
      discussion_ideas: [
        "Architectural and Visual Subordination of the Individual: Speer lined the colossal Zeppelin Field stadium with 152 anti-aircraft searchlights pointing vertically into the night sky, creating a glowing 'Cathedral of Light' reaching 20,000 feet; standing amidst 200,000 identically marching party members with thousands of blood-red banners, the individual citizen felt small, powerless, and completely absorbed into the unified collective will of the nation.",
        'Cult of the Infallible Führer: Dramatic theatrical staging—entering in silence before roaring cheers, ascending high marble podiums under blinding spotlights, accompanied by Wagnerian fanfares—elevated Hitler to a semi-divine messiah, reinforcing the Führerprinzip and absolute psychological obedience to his command.',
      ],
    },
    {
      match: /Jesse Owens/i,
      hinge_question:
        'How did Jesse Owens’ four gold medals publicly undermine Adolf Hitler’s propaganda narrative of Aryan physical and biological superiority?',
      discussion_ideas: [
        "Hitler and Goebbels spent millions constructing the monumental 100,000-seat Berlin Olympic Stadium to showcase the athletic, physical, and biological superiority of the blonde, blue-eyed 'Aryan master race' before the international press. African American sprinter and long jumper Jesse Owens shattered this racial myth by winning four gold medals (100m, 200m, 4x100m, and long jump) and setting world records, while earning roaring, standing ovations from the German public; Owens' undeniable athletic dominance humiliated Nazi racial pseudoscientists on their own global stage.",
      ],
    },
  ],

  // LESSON 3.4: Opposition, Resistance and Conformity (1933–1939)
  lesson_3_4: [
    {
      match: /Edelweiss Pirates/i,
      hinge_question:
        'Why did working-class youth rebellion like the Edelweiss Pirates alarm the Gestapo far more than quiet discontent among older adults?',
      discussion_ideas: [
        'Active Defiance of Totalitarian Monopolies: The Edelweiss Pirates (such as the Navajos in Cologne) openly defied the compulsory Hitler Youth: wearing distinct clothing (checkered shirts, white socks, and edelweiss metal pins), beating up Hitler Youth patrols, hiking in the countryside, and singing forbidden parodies of Nazi anthems, showing that the regime had failed to achieve total control over the minds of working-class teenagers.',
        "Escalation to Subversive Resistance During Wartime: Unlike older adults whose dissent was passive, teenage groups engaged in active sabotage: painting anti-Hitler graffiti ('Down with Hitler!'), distributing Allied propaganda leaflets, and sheltering army deserters, prompting the Gestapo to publicly execute 13 ringleaders (including 16-year-old Barthel Schink) in Cologne in 1944.",
      ],
    },
    {
      match: /Galen/i,
      hinge_question:
        'Why was the Nazi regime afraid to execute Bishop von Galen, even when he openly attacked government euthanasia policies from the pulpit?',
      discussion_ideas: [
        "In the summer of 1941, the Catholic Bishop of Münster delivered three thunderous sermons condemning the secret Nazi 'Aktion T4' euthanasia programme that was murdering mentally disabled and physically handicapped German patients. Although Goebbels and Bormann were furious, they advised Hitler that executing or arresting the aristocratic and immensely popular bishop during wartime would alienate millions of devout Catholic soldiers and workers across the industrial Rhineland and Westphalia, severely damaging domestic morale; instead, Hitler secretly halted the official T4 gas-chamber killings and deferred vengeance against the Catholic Church until after final victory.",
      ],
    },
  ],

  // LESSON 4.1: Nazi Policies Towards Women (1933–1939)
  lesson_4_1: [
    {
      match: /Domestic Ideal|Aryan Motherhood/i,
      hinge_question:
        'How did Nazi propaganda enforce traditional gender roles to reverse the social and professional gains made by women during the Weimar Republic?',
      discussion_ideas: [
        "The 'Kinder, Küche, Kirche' Ideological Directive: Posters depicted healthy, unvarnished Aryan women dressed in traditional peasant dresses nursing multiple children in rural domestic settings; propaganda systematically attacked Weimar female emancipation, banning women from wearing makeup, smoking in public, or dieting, insisting that a woman’s biological duty was the domestic sphere: children, kitchen, and church.",
        'Exclusion from Professions and Public Life: The regime purged women from the civil service, judiciary, medicine, and university faculty positions; through Marriage Loans (1,000 marks provided the wife left employment), the state used financial engineering to return women to domestic home life.',
      ],
    },
    {
      match: /Mutterkreuz|Mother’s Cross/i,
      hinge_question:
        'Why did the Nazi regime award military-style medals like the Mother’s Cross to encourage high birth rates among racially acceptable families?',
      discussion_ideas: [
        "Instituted on Hitler’s mother’s birthday in 1938, the Cross of Honour was awarded annually in Bronze (4–5 children), Silver (6–7 children), and Gold (8+ children) to racially pure Aryan mothers. By elevating maternal childbirth into the civilian equivalent of a soldier's battlefield bravery ('The field of battle for women is the home'), the regime conferred enormous social prestige: members of the Hitler Youth were required to salute cross-bearers on the street, and recipients received preferred seating on trains, boosting births to populate future armies for European conquest.",
      ],
    },
  ],

  // LESSON 4.2: Nazi Policies Towards the Young (1933–1939)
  lesson_4_2: [
    {
      match: /Hitler Youth Boys|119-5592-14A/i,
      hinge_question:
        'How did the Hitler Youth combine outdoor adventure with military drills to prepare young boys for future conscription in the German army?',
      discussion_ideas: [
        "Paramilitary Regimentation and Weapons Training: Boys wore khaki uniforms, swore personal blood oaths to Adolf Hitler, marched in formation with brass daggers inscribed with 'Blood and Honour', and practiced live rifle marksmanship, trench digging, and grenade throwing, ensuring they were thoroughly militarized before formal army conscription.",
        "Physical Hardening and Anti-Intellectual Indoctrination: Hitler demanded that German youth be 'as tough as leather, as swift as greyhounds, and as hard as Krupp steel'; rigorous cross-country endurance hikes and survival camping replaced intellectual critical thinking with blind obedience, physical toughness, and devotion to the Führer.",
      ],
    },
    {
      match: /Bund Deutscher Mädel|BDM/i,
      hinge_question:
        'Why did the Nazi regime place such intense emphasis on physical fitness and outdoor gymnastics for young girls in the BDM?',
      discussion_ideas: [
        'The BDM emphasized synchronised callisthenics, athletic gymnastics, and outdoor hikes rather than academic studies because the Nazi racial philosophy viewed female fitness strictly through a biological lens: strong, broad-hipped, healthy bodies were essential to ensure smooth, unassisted childbirth and produce resilient offspring for the Aryan race. Furthermore, synchronised mass gymnastics fostered collective uniformity and unquestioning submission to state discipline over individual identity.',
      ],
    },
  ],

  // LESSON 4.3: Employment and Living Standards (1933–1939)
  lesson_4_3: [
    {
      match: /Reichsautobahn|Autobahn/i,
      hinge_question:
        'How did the Autobahn construction programme serve both as a powerful domestic propaganda victory and a strategic military asset?',
      discussion_ideas: [
        "Domestic Propaganda Miracle of Full Employment: Photographs of thousands of muscle-bound German workers digging the dual-carriageway motorways with shovels and wheelbarrows were promoted by Goebbels as the 'Miracle of the Autobahn', proving that Hitler had conquered mass unemployment and restored national pride while Western democracies remained crippled by depression.",
        'Strategic Military Asset for Two-Front Mobilization: The dual-lane concrete highways were engineered for warfare: designed with wide gentle curves, bridges capable of supporting 50-ton tanks, and auxiliary runways, they were intended to allow the German army to rapidly transport military motorized divisions and artillery between the Western and Eastern fronts without relying on bottlenecked railway junctions.',
      ],
    },
    {
      match: /Strength Through Joy|KdF/i,
      hinge_question:
        'How did Robert Ley use leisure perks like KdF cruises and the Volkswagen scheme to compensate German workers for the loss of free trade unions and wage controls?',
      discussion_ideas: [
        "Rewarding Docility with Luxury Privileges: In May 1933, the regime abolished independent trade unions, banned strikes, and froze wages; through the German Labour Front's (DAF) 'Strength Through Joy' (KdF) department, Robert Ley compensated workers with heavily subsidized concert tickets, cinema visits, sporting facilities, and luxury Mediterranean ocean cruises previously affordable only to the wealthy elite.",
        "The Volkswagen Savings Deception: The KdF promoted the 'People’s Car' (Volkswagen Beetle), encouraging hundreds of thousands of workers to contribute 5 Reichsmarks a week in savings stamps to own an automobile; in reality, zero consumer cars were ever delivered, and the factories were converted to manufacture Kübelwagen military vehicles when war broke out.",
      ],
    },
  ],

  // LESSON 4.4: The Persecution of Minorities (1933–1939)
  lesson_4_4: [
    {
      match: /Anti-Jewish Boycott|1 April 1933/i,
      hinge_question:
        'Why did the Nazi government launch the boycott of Jewish businesses on 1 April 1933, and why did they call it off after only one day?',
      discussion_ideas: [
        'Appeasing Radical SA Stormtroopers: Following Hitler’s appointment, radical SA rank-and-file members demanded immediate street violence and looting against Jewish department stores; the nationwide Saturday boycott was orchestrated by Goebbels as an official state outlet to demonstrate anti-Semitic resolve while projecting disciplined state power.',
        'Fear of International Sanctions and Economic Backlash: The boycott caused immediate international outrage, prompting British and American Jewish and trade organizations to threaten counter-boycotts of German exported industrial goods; fearing that an economic retaliation would wreck Germany’s fragile financial recovery, Hitler called off the boycott after 24 hours.',
      ],
    },
    {
      match: /Nuremberg Laws|Racial Classification Chart/i,
      hinge_question:
        'How did the Nuremberg Laws fundamentally transform anti-Semitism from social prejudice into inescapable, pseudoscientific state law?',
      discussion_ideas: [
        "Announced at the 1935 Nuremberg Rally, the Reich Citizenship Law and the Law for the Protection of German Blood and German Honour stripped German Jews of their citizenship, voting rights, and legal protection, while criminalizing marriage or sexual relations between Jews and Germans. By publishing official genealogical classification charts defining Jewish identity biologically based on the religion of one's grandparents (e.g., Mischlinge), the regime made anti-Semitism inescapable: religious conversion to Christianity no longer offered sanctuary, as discrimination was now rooted in biological and racial heredity under the authority of criminal law.",
      ],
    },
    {
      match: /Kristallnacht|Shattered Jewish Shopfront/i,
      hinge_question:
        'Why did Kristallnacht represent a critical turning point in the Nazi persecution of Jewish people, shifting from legal discrimination to organized state violence?',
      discussion_ideas: [
        'Transition to Unchecked Public Physical Violence: Triggered by the assassination of diplomat Ernst vom Rath in Paris, Goebbels unleashed the SA and SS in coordinated nationwide pogroms: over 1,400 synagogues were torched, 7,500 Jewish shops looted, at least 91 Jews murdered, and 30,000 Jewish men sent to concentration camps, marking the end of covert or purely legal discrimination.',
        'State Economic Plunder and Forced Emigration: The regime fined the German Jewish community one billion Reichsmarks for the damage, confiscated insurance payouts, and enacted decrees excluding Jews from economic life (barring them from running businesses, practicing professions, or attending public schools), signaling to German Jews that their physical survival required immediate flight from the country.',
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Loading units/weimar_nazi_germany/data.js...');
  const mod = await import(pathToFileURL(dataJsPath).href);
  const unitData = mod.unitData || mod.default || mod;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = WEIMAR_PEDAGOGY[l.id];
    if (!rules) return;

    console.log(`\nWiring ${l.id} (${l.title})...`);

    function matchRule(s) {
      const textToMatch = [s.title, s.id, s.caption, s.source_context].filter(Boolean).join(' ');
      return rules.find((r) => r.match.test(textToMatch));
    }

    // 1. Update l.sources
    (l.sources || []).forEach((s, idx) => {
      const rule = matchRule(s);
      if (rule) {
        s.hinge_question = rule.hinge_question;
        s.discussion_ideas = rule.discussion_ideas;
        totalSourcesUpdated++;
        console.log(
          `  ✅ [l.sources ${idx}] "${s.title}" -> ${rule.discussion_ideas.length} idea(s)`,
        );
      } else {
        console.warn(`  ⚠️ [l.sources ${idx}] No match for: "${s.title}" (id=${s.id})`);
      }
    });

    // 2. Update narrative_blocks
    (l.narrative_blocks || []).forEach((b, idx) => {
      if (b.source) {
        const rule = matchRule(b.source);
        if (rule) {
          b.source.hinge_question = rule.hinge_question;
          b.source.discussion_ideas = rule.discussion_ideas;
          totalNarrativeUpdated++;
          console.log(
            `  ✅ [narrative ${idx}] "${b.source.title}" -> ${rule.discussion_ideas.length} idea(s)`,
          );
        } else {
          console.warn(
            `  ⚠️ [narrative ${idx}] No match for: "${b.source.title}" (id=${b.source.id})`,
          );
        }
      }
    });
  });

  console.log(
    `\n🎉 Total sources updated across Weimar: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/weimar_nazi_germany/data.js
  const jsContent =
    'export const unitData = ' +
    JSON.stringify(unitData, null, 2) +
    ';\nexport default unitData;\n';
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/weimar_nazi_germany/data.js');

  // 2. Write to public/data/weimar_nazi_germany.json
  const pubData = { id: 'weimar_nazi_germany', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully updated public/data/weimar_nazi_germany.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.weimar_nazi_germany) {
      db.weimar_nazi_germany.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated weimar_nazi_germany in public/database.json');
    }
  }

  console.log('\n🏁 Completed Weimar and Nazi Germany enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
