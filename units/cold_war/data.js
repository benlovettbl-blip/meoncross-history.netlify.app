/**
 * units/cold_war/data.js
 *
 * Full Disciplinary Curriculum Data & Single Source of Truth (SSoT)
 * The Cold War & Global Flashpoints, 1945–1991
 *
 * Conforms strictly to the Disciplinary Classroom Textbook Standard:
 * - Full Christine Counsell 5-Act narrative blocks for all 7 enquiries
 * - Spaced retrieval Do Now starters with zero self-testing
 * - Comprehensive key individuals and disciplinary terminology banks
 * - 100% Institutional Neutrality under "The History Revision Hub"
 */

const unitData = {
  id: 'cold_war',
  title: 'The Cold War & Global Flashpoints (1945–1991)',
  enquiry:
    'Superpower Relations and the Cold War: How did ideological rivalry divide the globe on the brink of nuclear destruction?',
  period: '1945 – 1991',
  edition: '2026.1',
  key_individuals: [
    {
      name: 'Joseph Stalin',
      role: 'General Secretary of the Communist Party of the Soviet Union (1922–1953)',
      bio: 'Soviet dictator who transformed the USSR into an industrial and nuclear superpower. Built an expansive buffer zone of communist satellite states across Eastern Europe following the defeat of Nazi Germany, sparking the Cold War.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Harry S. Truman',
      role: '33rd President of the United States (1945–1953)',
      bio: 'US President who ordered the atomic bombing of Japan, adopted the policy of containment against Soviet expansionism (the Truman Doctrine), and authorized the massive Marshall Plan and Berlin Airlift.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Winston Churchill',
      role: 'British Prime Minister (1940–1945, 1951–1955)',
      bio: 'Wartime leader of Great Britain who negotiated at Yalta and warned the world in his March 1946 Fulton address that an "Iron Curtain" had descended across Europe, dividing the continent into hostile camps.',
      image: '/images/default_person.svg',
    },
    {
      name: 'George F. Kennan',
      role: 'US Diplomat & Soviet Expert',
      bio: 'Author of the influential 1946 "Long Telegram" and the "Mr. X" article in Foreign Affairs, which formulated the strategic doctrine of "containment" to resist Soviet ideological and territorial expansion.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Nikita Khrushchev',
      role: 'First Secretary of the Communist Party of the Soviet Union (1953–1964)',
      bio: 'Soviet leader who denounced Stalin in 1956, championed "peaceful coexistence", ordered the construction of the Berlin Wall in 1961, and placed nuclear missiles in Cuba in 1962, triggering the Cuban Missile Crisis.',
      image: '/images/default_person.svg',
    },
    {
      name: 'John F. Kennedy',
      role: '35th President of the United States (1961–1963)',
      bio: 'US President during the height of the Cold War. Successfully confronted Soviet nuclear brinkmanship during the Cuban Missile Crisis using a naval quarantine, and delivered his iconic "Ich bin ein Berliner" speech.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Fidel Castro',
      role: 'Prime Minister and President of Cuba (1959–2008)',
      bio: 'Revolutionary leader who overthrew the US-backed Batista regime in 1959, nationalized American commercial assets, aligned Cuba with the Soviet Union, and survived the CIA-sponsored Bay of Pigs invasion.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Mao Zedong',
      role: 'Chairman of the Chinese Communist Party (1949–1976)',
      bio: 'Leader who established the People’s Republic of China in October 1949. Deployed hundreds of thousands of Chinese "volunteers" into the Korean War in 1950, permanently shifting Cold War rivalry into Asia.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Kim Il-sung',
      role: 'Supreme Leader of North Korea (1948–1994)',
      bio: 'Communist ruler who established the Democratic People’s Republic of Korea and launched the June 1950 surprise invasion across the 38th Parallel with Soviet equipment, triggering the Korean War.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Ho Chi Minh',
      role: 'President of the Democratic Republic of Vietnam (1945–1969)',
      bio: 'Vietnamese nationalist and communist revolutionary leader whose Viet Minh forces defeated the French at Dien Bien Phu (1954) and whose resilience sustained the North Vietnamese war effort against the United States.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Richard Nixon',
      role: '37th President of the United States (1969–1974)',
      bio: 'Pursued the policy of "détente" with the USSR and established diplomatic relations with Communist China in 1972. Signed the Strategic Arms Limitation Treaty (SALT I) with Leonid Brezhnev.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Leonid Brezhnev',
      role: 'General Secretary of the Soviet Communist Party (1964–1982)',
      bio: 'Soviet leader who formulated the "Brezhnev Doctrine" to justify crushing the 1968 Prague Spring, achieved nuclear parity with the US, and ordered the disastrous 1979 Soviet invasion of Afghanistan.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Ronald Reagan',
      role: '40th President of the United States (1981–1989)',
      bio: 'US President who branded the USSR the "evil empire", accelerated military spending, proposed the Strategic Defense Initiative ("Star Wars"), and negotiated historic nuclear arms cuts with Mikhail Gorbachev.',
      image: '/images/default_person.svg',
    },
    {
      name: 'Mikhail Gorbachev',
      role: 'Last General Secretary and President of the Soviet Union (1985–1991)',
      bio: 'Visionary reformer who introduced "Glasnost" (openness) and "Perestroika" (restructuring), renounced the Brezhnev Doctrine, negotiated the INF Treaty, and oversaw the peaceful collapse of the Berlin Wall and the USSR.',
      image: '/images/default_person.svg',
    },
  ],
  terminology: [
    {
      term: 'Cold War',
      definition:
        'A state of extreme geopolitical hostility and ideological rivalry between the US and USSR (1945–1991) characterized by proxy wars, espionage, and nuclear arms race without direct military conflict.',
    },
    {
      term: 'Capitalism',
      definition:
        'An economic and political system based on private ownership of industry, free-market competition, profit motive, and multi-party democratic government.',
    },
    {
      term: 'Communism',
      definition:
        'A Marxist-Leninist system based on state ownership of all industry and land, elimination of private property, wealth redistribution, and single-party authoritarian rule.',
    },
    {
      term: 'Containment',
      definition:
        'The core US foreign policy doctrine formulated by George Kennan in 1946 aimed at blocking the global spread of Soviet communist influence through economic and military aid.',
    },
    {
      term: 'Truman Doctrine',
      definition:
        'President Truman’s March 1947 declaration pledging American military and financial assistance to any nation resisting subjugation by armed communist minorities or outside pressure.',
    },
    {
      term: 'Marshall Plan',
      definition:
        'A massive US economic aid initiative (1948–1952) providing $13 billion to rebuild war-torn Western European economies, successfully containing communist electoral appeals.',
    },
    {
      term: 'Iron Curtain',
      definition:
        'Metaphor coined by Winston Churchill in 1946 describing the physical and ideological barrier separating democratic Western Europe from Soviet-dominated Eastern Europe.',
    },
    {
      term: 'Berlin Airlift',
      definition:
        'Western Allied operation (1948–49) flying 2.3 million tons of supplies to 2.5 million West Berliners over eleven months, defeating Stalin’s illegal land blockade.',
    },
    {
      term: 'NATO',
      definition:
        'North Atlantic Treaty Organization; military alliance established in April 1949 where Western democratic nations pledged mutual military defense against Soviet aggression.',
    },
    {
      term: 'Warsaw Pact',
      definition:
        'A military mutual defense treaty established in 1955 by the Soviet Union and seven Eastern European satellite states in response to West Germany joining NATO.',
    },
    {
      term: 'Brinkmanship',
      definition:
        'The practice of pushing dangerous geopolitical disputes to the very verge of active nuclear war in order to compel the opposing superpower to back down.',
    },
    {
      term: 'Mutually Assured Destruction (MAD)',
      definition:
        'Military doctrine holding that because both superpowers possessed survivable second-strike nuclear arsenals, any nuclear exchange would result in total mutual annihilation.',
    },
    {
      term: 'Proxy War',
      definition:
        'A regional armed conflict where opposing superpowers support, fund, and arm rival local factions instead of engaging in direct military combat with each other.',
    },
    {
      term: 'Domino Theory',
      definition:
        'The geopolitical theory that if one nation fell to communism, neighbouring countries would inevitably collapse like a row of falling dominoes.',
    },
    {
      term: 'Détente',
      definition:
        'The period of easing geopolitical tensions and diplomatic cooperation between the US and USSR during the 1970s, resulting in the SALT I arms limitation treaties.',
    },
    {
      term: 'Glasnost',
      definition:
        'Mikhail Gorbachev’s policy of "openness" introduced in 1985, allowing freedom of the press, public debate, and criticism of historical Soviet state corruption.',
    },
    {
      term: 'Perestroika',
      definition:
        'Gorbachev’s policy of "restructuring" aimed at decentralizing Soviet economic control, introducing limited private enterprise and market efficiency.',
    },
    {
      term: 'Brezhnev Doctrine',
      definition:
        'Soviet policy declared in 1968 stating that Moscow had the right to intervene militarily in any communist state where socialist rule was threatened; renounced by Gorbachev in 1989.',
    },
  ],
  lessons: [
    {
      id: 'lesson_1',
      title: 'Ideological Clash: Why could Capitalism and Communism never peacefully coexist?',
      enquiryQuestion:
        'Why did irreconcilable economic and political philosophies make conflict between the USA and USSR inevitable after 1945?',
      card_image: '/images/cold_war_jfk_khrushchev_1961.jpg',
      card_position: 'center 25%',
      prologue:
        'In 1945, the defeat of Nazi Germany left two superpowers dominating the globe: capitalist America and communist Russia. Washington championed democracy, free markets, and individual liberty; Moscow demanded classless socialism and state control. Why was genuine, lasting peace between these two irreconcilable political ideologies impossible from the very beginning?',
      do_now: {
        title: 'Do Now: Retrieval from the Second World War & Interwar World',
        type: 'mixed',
        items: [
          {
            question:
              'Which military alliance fought together to defeat Nazi Germany, fascist Italy, and Imperial Japan in 1945?',
            answer: 'The Grand Alliance (Britain, the United States, and the Soviet Union)',
          },
          {
            question:
              "What political and economic revolution in October 1917 overthrew the Russian Provisional Government and established the world's first communist state?",
            answer: 'The Bolshevik Revolution (led by Vladimir Lenin)',
          },
          {
            question:
              'What was the name of the secret British-American project that successfully developed the first atomic weapons in 1945?',
            answer: 'The Manhattan Project',
          },
          {
            question:
              'Which 1939 non-aggression pact between Hitler and Stalin shocked the democratic world before Germany invaded Poland?',
            answer: 'The Nazi-Soviet Pact (Molotov-Ribbentrop Pact)',
          },
        ],
      },
      narrative_blocks: [
        {
          act: 1,
          title: 'Incompatible Worldviews: Free Market Capitalism vs Command Socialism',
          text: '<span class="para-ref">[1.1]</span> In the aftermath of the Second World War, the global balance of power was shattered. The great European empires of Britain, France, and Germany were bankrupt and devastated, leaving two continental titans standing supreme: the <strong>United States of America</strong> and the <strong>Union of Soviet Socialist Republics (USSR)</strong>. Yet their temporary wartime marriage of convenience against Adolf Hitler concealed profound, irreconcilable ideological hostility. The United States championed <strong>free-market capitalism</strong>, an economic doctrine rooted in private enterprise, the profit motive, freedom of contract, and minimal state interference in commerce. For Americans, the right to acquire private property and trade freely was synonymous with human liberty itself. In stark contrast, the Soviet Union was organized upon <strong>Marxist-Leninist socialism</strong>: private property was outlawed, all banks, factories, and agricultural land were owned by the collective state, and production was directed by central state planners in Moscow to eliminate capitalist class exploitation.',
        },
        {
          act: 2,
          title: 'Political Systems: Multi-Party Democracy vs Bolshevik Dictatorship',
          text: '<span class="para-ref">[1.2]</span> This fundamental economic divergence was mirrored by totally opposing political philosophies. The United States was a <strong>constitutional liberal democracy</strong> founded upon universal suffrage, competing multi-party elections, a free press, religious liberty, and the rule of law guaranteed by an independent judiciary. American political culture viewed any concentration of absolute state authority as tyranny. Conversely, the USSR was a <strong>totalitarian one-party dictatorship</strong> governed exclusively by the Communist Party of the Soviet Union (CPSU). Vladimir Lenin and Joseph Stalin taught that bourgeois parliamentary democracy was a fraudulent facade designed by wealthy capitalists to deceive the working class. True working-class freedom required the "dictatorship of the proletariat", enforced by a ruthlessly disciplined vanguard party. All political opposition was banned, independent trade unions were crushed, media was subjected to total state censorship, and state terror was maintained by the secret police (the NKVD, later the KGB).',
        },
        {
          act: 3,
          title: 'Historical Grievances: 1917 Intervention, Appeasement & The Nazi-Soviet Pact',
          text: '<span class="para-ref">[1.3]</span> The mutual suspicion that poisoned superpower relations was not born in 1945, but was rooted in decades of historical betrayal. Following the <strong>Bolshevik Revolution of 1917</strong>, Western powers—including the United States, Britain, and France—dispatched expeditionary armies to Russia to fight alongside anti-communist "White" forces, attempting to strangle the fledgling Bolshevik regime in its cradle. Soviet leaders never forgot this foreign invasion. Throughout the 1930s, Stalin remained deeply convinced that Western capitalist powers were deliberately encouraging Nazi Germany to expand eastward to destroy the USSR, a suspicion seemingly confirmed by Britain and France appeasing Hitler at Munich in 1938. In turn, Western democracies were horrified in August 1939 when Stalin signed the cynical <strong>Nazi-Soviet Pact</strong> with Hitler, partitioning Poland and supplying the German war machine with grain and oil while London fought alone against the Luftwaffe.',
        },
        {
          act: 4,
          title: 'The Nuclear Monopoly & The Emerging Balance of Terror',
          text: "<span class=\"para-ref\">[1.4]</span> The technological climax of the Second World War fundamentally transformed the stakes of this ideological rivalry. On 16 July 1945, American scientists successfully detonated the world's first atomic weapon in the New Mexico desert. When President Harry S. Truman deployed two atomic bombs against Hiroshima and Nagasaki in August 1945, killing over 150,000 people and forcing Japan's surrender, the United States established a temporary <strong>nuclear monopoly</strong>. Stalin interpreted Truman's possession of the atomic bomb not merely as a weapon to end the Pacific War, but as an explicit instrument of atomic blackmail designed to intimidate Moscow and roll back Soviet influence in Europe. Stalin immediately ordered Soviet physicists to work day and night to develop an atomic bomb, triggering a four-decade <strong>nuclear arms race</strong> where both nations stockpiled thousands of thermonuclear warheads capable of extinguishing human civilization.",
        },
        {
          act: 5,
          title: 'The Historical Verdict: Geopolitical Vacuum in a Ruined Europe',
          text: '<span class="para-ref">[1.5]</span> By the end of 1945, the historic European states system that had governed world affairs since the Renaissance was dead. In its place stood an artificial, polarized continent divided between two military leviathans whose forces met along the River Elbe in Germany. The Cold War was not caused by a simple diplomatic misunderstanding or personal animosity between leaders; it was an existential, systemic confrontation between two universalist, messianic ideologies that each believed the other was historically doomed. As the French philosopher Raymond Aron famously observed, the post-war world was defined by a terrifying new geopolitical reality: <em>"Peace is impossible; war is improbable."</em> Across this fractured landscape, the superpowers embarked on an unprecedented ideological war for the future of humanity.',
        },
      ],
    },
    {
      id: 'lesson_2',
      title: 'Yalta to Potsdam (1945): How did wartime allies become bitter rivals?',
      enquiryQuestion:
        'Why did the collaborative diplomacy of Yalta collapse into open suspicion and division at Potsdam within five months?',
      card_image: '/images/yalta_conference_1945.jpg',
      card_position: 'center 30%',
      prologue:
        'In early 1945, Churchill, Roosevelt, and Stalin met at Yalta, smiling for cameras as they carved up postwar Europe. But by the Potsdam conference in July, mistrust was toxic. With the American atomic bomb revealed and Soviet armies occupying Poland, the Grand Alliance fractured. How did wartime allies become bitter rivals?',
      do_now: {
        title: 'Do Now: Retrieval from Lesson 1 (Ideological Clash)',
        type: 'mixed',
        items: [
          {
            question:
              'What was the fundamental difference between the capitalist and communist views of private property?',
            answer:
              'Capitalism holds private property as an essential human right; Communism abolishes private property in favour of state ownership.',
          },
          {
            question:
              'Why did Soviet leaders distrust Western nations following the 1917 Bolshevik Revolution?',
            answer:
              'Western powers (including the US, Britain, and France) sent troops into Russia to support White armies trying to overthrow the Bolshevik government.',
          },
          {
            question:
              'What weapon deployed by the US in August 1945 gave Washington a temporary monopoly of ultimate military force?',
            answer: 'The Atomic Bomb',
          },
          {
            question:
              'Which Soviet secret police agency enforced ideological loyalty and crushed political opposition inside the USSR?',
            answer: 'The NKVD (later the KGB)',
          },
        ],
      },
      narrative_blocks: [
        {
          act: 1,
          title: "The Yalta Summit (February 1945): The Big Three's Fragile Consensus",
          text: '<span class="para-ref">[2.1]</span> In February 1945, with Nazi Germany collapsing under simultaneous Allied offensives, the "Big Three" leaders—US President <strong>Franklin D. Roosevelt</strong>, British Prime Minister <strong>Winston Churchill</strong>, and Soviet Premier <strong>Joseph Stalin</strong>—convened at the Crimean resort of Yalta. Meeting in the Livadia Palace, the leaders sought to design the architecture of the post-war world. On the surface, the conference was a triumph of pragmatic wartime diplomacy. The Big Three agreed that defeated Germany would be unconditionally disarmed, demilitarized, and partitioned into <strong>four occupation zones</strong> administered by Britain, the US, the USSR, and France. Berlin, although situated 100 miles deep within the Soviet occupation zone, would likewise be divided into four administrative sectors governed by an Allied Control Council.',
        },
        {
          act: 2,
          title: 'The Polish Question & The Declaration on Liberated Europe',
          text: '<span class="para-ref">[2.2]</span> Beneath this cordial surface lay deep, irreconcilable disagreements over the fate of Eastern Europe, particularly Poland. Britain had declared war in September 1939 to protect Polish sovereignty; Churchill insisted that Poland must regain genuine independence. However, the Soviet Union had lost over 27 million citizens repelling Hitler\'s invasion; Stalin was fanatically determined that Poland must never again serve as a geographic corridor for German invasion. Stalin demanded that the Soviet-Polish border be shifted westward to the Curzon Line, compensating Poland with German territory along the Oder-Neisse rivers. To preserve allied unity, Roosevelt brokered a vague compromise: Stalin signed the <strong>Declaration on Liberated Europe</strong>, pledging to permit "free and unfettered elections" across all liberated territories. In private, Stalin had no intention of allowing hostile anti-communist governments on Russia\'s borders.',
        },
        {
          act: 3,
          title: 'Changing of the Guard: Truman, Attlee, and Stalin at Potsdam (July 1945)',
          text: '<span class="para-ref">[2.3]</span> When the Allied leaders reconvened at Potsdam outside ruined Berlin in July 1945, the international political landscape had transformed completely. Franklin D. Roosevelt had died suddenly of a cerebral hemorrhage in April, replaced by Vice President <strong>Harry S. Truman</strong>—a blunt, pugnacious Midwesterner who viewed Soviet behavior through a lens of profound moral suspicion. Midway through the conference, Winston Churchill was voted out of office in a British general election, replaced by Labour Prime Minister <strong>Clement Attlee</strong>. Stalin alone remained from the original wartime triumvirate. By July 1945, the common enemy that had bound the Grand Alliance together—Nazi Germany—was utterly destroyed. Without Hitler as a uniting threat, the ideological chasm between East and West opened with explosive force.',
        },
        {
          act: 4,
          title: "The Trinity Test & Truman's Atomic Diplomatic Leverage",
          text: '<span class="para-ref">[2.4]</span> On the eve of the Potsdam conference, on 16 July 1945, Truman received a coded telegram confirming the successful detonation of the Trinity nuclear test in New Mexico. Armed with the knowledge that the United States now possessed the atomic bomb, Truman\'s diplomatic posture hardened dramatically. He resolved to abandon Roosevelt\'s conciliatory approach and adopt an "iron fist" towards Soviet demands. During a break in negotiations on 24 July, Truman casually approached Stalin and remarked that the United States possessed "a new weapon of unusual destructive force." Stalin nodded politely, urging Truman to make "good use of it against the Japanese." In reality, Soviet espionage agents in the Manhattan Project had kept Moscow fully informed of American nuclear progress; Stalin immediately dispatched urgent orders to speed up the Soviet bomb project.',
        },
        {
          act: 5,
          title: 'Reparations and the Division of Germany: The Grand Alliance Dies',
          text: '<span class="para-ref">[2.5]</span> The primary point of contention at Potsdam was post-war German reparations. Having suffered catastrophic industrial devastation, Stalin demanded $20 billion in German reparations, with $10 billion delivered directly to the USSR from the western industrial zones. Truman and British Foreign Secretary Ernest Bevin fiercely refused, recalling how excessive reparations had crippled the Weimar Republic after 1919 and paved the way for Hitler. A fragile compromise was struck: each occupying power would extract reparations primarily from its own occupation zone, with the Soviets receiving an additional percentage of industrial machinery from the western zones in exchange for food shipments. In reality, this agreement laid the groundwork for the permanent economic and political partition of Germany. The Grand Alliance was dead, replaced by suspicion, fear, and hostile confrontation.',
        },
      ],
    },
    {
      id: 'lesson_3',
      title: 'The Iron Curtain & The Berlin Blockade (1948–1949): The first flashpoint.',
      enquiryQuestion:
        "How did Western containment and Stalin's land blockade of Berlin in 1948 cement the permanent division of Europe into armed blocs?",
      card_image: '/images/berlin_airlift_c54_tempelhof.jpg',
      card_position: 'center center',
      prologue:
        "In 1946, Churchill warned that an 'Iron Curtain' had descended across Europe. In 1948, Stalin severed all road and rail access to West Berlin, attempting to starve the Allied enclave into submission. Western pilots responded with the heroic Berlin Airlift. How did divided Berlin become the Cold War’s dangerous frontline?",
      do_now: {
        title: 'Do Now: Retrieval from Lesson 2 (Yalta to Potsdam)',
        type: 'mixed',
        items: [
          {
            question:
              'Into how many temporary military occupation zones was Germany divided at Yalta and Potsdam?',
            answer:
              'Four zones (administered by Britain, the United States, France, and the Soviet Union)',
          },
          {
            question:
              'Which US President replaced Franklin D. Roosevelt in April 1945 and adopted a much tougher stance towards Stalin at Potsdam?',
            answer: 'Harry S. Truman',
          },
          {
            question:
              'What international declaration did Stalin sign at Yalta, promising free elections across Eastern Europe?',
            answer: 'The Declaration on Liberated Europe',
          },
          {
            question:
              'Why was the geographic location of Berlin a unique source of vulnerability for the Western Allies?',
            answer:
              'Berlin was located 100 miles deep inside the Soviet occupation zone of eastern Germany.',
          },
        ],
      },
      narrative_blocks: [
        {
          act: 1,
          title: "Churchill's Fulton Speech: The Descent of the Iron Curtain (1946)",
          text: '<span class="para-ref">[3.1]</span> Between 1945 and 1947, the Red Army established a stranglehold across Eastern Europe. Using what Hungarian communist Mátyás Rákosi termed <strong>"salami tactics"</strong>—slicing away non-communist political parties piece by piece through rigged elections, intimidation, and secret police murder—Stalin installed obedient puppet regimes in Poland, Romania, Bulgaria, Hungary, and Albania. In March 1946, Winston Churchill traveled to Westminster College in Fulton, Missouri, to deliver his seminal "Sinews of Peace" address with President Truman seated beside him. Churchill warned the world in stark, unforgettable terms: <em>"From Stettin in the Baltic to Trieste in the Adriatic, an iron curtain has descended across the Continent."</em> Behind this line, ancient capitals were subjected to Soviet control, crushing democratic liberties. Stalin furiously denounced Churchill in the Soviet press, branding him a warmonger comparable to Adolf Hitler.',
        },
        {
          act: 2,
          title: 'The Truman Doctrine & Marshall Plan: The Strategy of Containment (1947)',
          text: '<span class="para-ref">[3.2]</span> In early 1947, Britain informed Washington that it was bankrupt and could no longer provide military aid to royalist forces fighting communist guerrillas in the Greek Civil War, or protect Turkey from Soviet naval demands. On 12 March 1947, President Truman addressed a joint session of Congress to announce a revolutionary departure in American foreign policy: the <strong>Truman Doctrine</strong>. Truman pledged that the United States would provide financial and military aid to "free peoples who are resisting attempted subjugation by armed minorities or by outside pressures." To back this commitment with economic muscle, Secretary of State George Marshall announced the <strong>Marshall Plan</strong> in June 1947, offering over $13 billion in economic aid to rebuild shattered European economies. Truman recognized that poverty and social desperation were the breeding grounds of communism; American economic aid eliminated that threat across Western Europe.',
        },
        {
          act: 3,
          title: 'Soviet Salami Tactics & Cominform: Consolidating Eastern Europe',
          text: '<span class="para-ref">[3.3]</span> Stalin interpreted the Marshall Plan as an act of American economic imperialism, designed to create an anti-Soviet military coalition and undermine Soviet influence. Moscow banned all Eastern European satellite nations, including Poland and Czechoslovakia, from accepting a single dollar of Marshall aid. In September 1947, Stalin established the <strong>Cominform</strong> (Communist Information Bureau) to coordinate communist parties across Europe and enforce rigid ideological obedience to Moscow. Any lingering hopes for Eastern European democracy were violently extinguished in February 1948 during the <strong>Prague Coup</strong>, when Czech communists seized complete power, and pro-Western Foreign Minister Jan Masaryk fell to his death from a government window. Europe was now completely polarized into two hostile economic and ideological blocs.',
        },
        {
          act: 4,
          title: 'The Berlin Blockade & Operation Vittles: The 11-Month Airlift (1948–49)',
          text: '<span class="para-ref">[3.4]</span> The first catastrophic military showdown of the Cold War erupted over the divided city of Berlin. Frustrated by Soviet obstructionism, the Western Allies merged their occupation zones in 1948 to create a unified economic entity (Trizonia) and introduced a stable new currency, the <strong>Deutsche Mark</strong>, to revive economic growth. Furious that the Western currency was undermining the East German economy, Stalin resolved to force the Allies out of Berlin. On 24 June 1948, Soviet forces severed all road, rail, and canal routes connecting West Germany to West Berlin, cutting off electricity, food, and fuel to 2.5 million civilians. Instead of surrendering or invading by land, Truman launched the <strong>Berlin Airlift</strong> (Operation Vittles). For 324 days, American and British transport planes flew through narrow air corridors around the clock, landing a plane every 90 seconds at Tempelhof and Gatow airports. Delivering over 2.3 million tons of food, medicine, and coal, the airlift defeated Stalin\'s siege without firing a shot.',
        },
        {
          act: 5,
          title: 'The Permanent Division: FRG, GDR, NATO (1949) and Warsaw Pact (1955)',
          text: '<span class="para-ref">[3.5]</span> On 12 May 1949, humiliated by the success of the airlift and hurt by Western trade counter-blockades, Stalin backed down and reopened the transit corridors. However, the crisis had permanently militarized the Cold War. In May 1949, the western zones formally unified to create the democratic <strong>Federal Republic of Germany (FRG / West Germany)</strong>, with its capital at Bonn; in October, the Soviets established the communist <strong>German Democratic Republic (GDR / East Germany)</strong>. In April 1949, twelve Western nations signed the North Atlantic Treaty, creating <strong>NATO</strong>: a military alliance based on collective security (Article 5: an attack on one was an attack on all). When West Germany was allowed to rearm and join NATO in May 1955, the Soviet Union responded by establishing the <strong>Warsaw Pact</strong> with its seven Eastern European satellite states. The division of Europe was now cast in iron and stone.',
        },
      ],
    },
    {
      id: 'lesson_4',
      title: 'Nuclear Brinkmanship: The Cuban Missile Crisis (1962).',
      enquiryQuestion:
        'How close did the world come to nuclear armageddon during the thirteen days of October 1962, and why did the crisis compel de-escalation?',
      card_image: '/images/cuban_missile_crisis_u2_1962.jpg',
      card_position: 'center center',
      prologue:
        'In October 1962, American spy planes photographed Soviet nuclear missile sites under construction in Cuba, just ninety miles from Florida. For thirteen terrifying days, President Kennedy and Premier Khrushchev stood on the brink of global nuclear war. How close did humanity come to thermonuclear destruction during the Cuban Missile Crisis?',
      do_now: {
        title: 'Do Now: Retrieval from Lesson 3 (The Iron Curtain & Berlin Blockade)',
        type: 'mixed',
        items: [
          {
            question:
              'What metaphor did Winston Churchill use in 1946 to describe the physical and ideological division of Europe?',
            answer: 'The Iron Curtain',
          },
          {
            question:
              'What was the primary objective of the Marshall Plan announced by the US in 1947?',
            answer:
              'To provide economic aid to rebuild Western European economies and prevent the spread of communism.',
          },
          {
            question:
              "How did the Western Allies supply 2.5 million West Berliners during Stalin's 1948–49 land blockade?",
            answer:
              'Through the Berlin Airlift (Operation Vittles), flying in over 2.3 million tons of food and fuel.',
          },
          {
            question:
              'Which military alliance was founded in April 1949 by Western nations based on collective defense against Soviet aggression?',
            answer: 'NATO (North Atlantic Treaty Organization)',
          },
        ],
      },
      narrative_blocks: [
        {
          act: 1,
          title: 'The Cuban Revolution: Castro, Nationalization, and Soviet Alliance (1959)',
          text: '<span class="para-ref">[4.1]</span> In January 1959, young revolutionary guerrilla leader <strong>Fidel Castro</strong> overthrew the corrupt, US-backed military dictatorship of Fulgencio Batista in Cuba, just ninety miles south of Key West, Florida. When Castro nationalized American-owned sugar plantations, oil refineries, and telephone monopolies, the Eisenhower administration responded with economic sanctions, refusing to buy Cuban sugar. Facing economic collapse, Castro turned to the Soviet Union for commercial and military protection. Premier <strong>Nikita Khrushchev</strong> eagerly welcomed an ideological ally directly in the Western hemisphere, purchasing Cuban sugar and supplying Havana with crude oil and military equipment. In April 1961, newly inaugurated President <strong>John F. Kennedy</strong> authorized the catastrophic <strong>Bay of Pigs invasion</strong>: a CIA-orchestrated paramilitary assault by 1,400 Cuban exiles that was decisively crushed by Castro\'s forces within 72 hours, humiliating Kennedy and pushing Cuba entirely into Moscow\'s orbit.',
        },
        {
          act: 2,
          title: 'The Discovery: U-2 Spy Planes & Operation Anadyr (October 1962)',
          text: '<span class="para-ref">[4.2]</span> In the summer of 1962, Khrushchev initiated a clandestine gamble codenamed <strong>Operation Anadyr</strong>: the secret shipment of over 40,000 Soviet troops and dozens of medium- and intermediate-range nuclear ballistic missiles (MRBMs and IRBMs) to Cuba. Khrushchev had two strategic motivations: first, to deter another American invasion of Cuba; and second, to rectify the acute strategic nuclear imbalance. The United States possessed a massive 17-to-1 superiority in deliverable nuclear warheads, including nuclear-armed Jupiter missiles stationed directly on the Soviet border in Turkey. Stationing missiles in Cuba would double Soviet first-strike capability and place Washington, D.C., and major US cities within a terrifying three-minute warning window. On 14 October 1962, a high-altitude US Air Force <strong>U-2 reconnaissance plane</strong> piloted by Major Richard Heyser photographed Soviet nuclear missile launch pads under construction in San Cristóbal.',
        },
        {
          act: 3,
          title: 'Thirteen Days on the Brink: ExComm, Quarantine & DEFCON 2',
          text: '<span class="para-ref">[4.3]</span> On the morning of 16 October, President Kennedy was shown the reconnaissance photographs, initiating thirteen of the most terrifying days in human history. Kennedy convened an emergency council of twelve top national security advisors known as <strong>ExComm</strong> (Executive Committee of the National Security Council). Military hardliners, led by Air Force Chief of Staff General Curtis LeMay, aggressively demanded immediate "surgical" airstrikes to obliterate the missile sites, followed by a full-scale US military invasion. Kennedy resisted, recognizing that airstrikes risked killing Soviet military personnel and triggering a Soviet counter-attack against West Berlin, escalating into all-out thermonuclear war. Instead, Kennedy chose a middle course: a naval blockade, diplomatically termed a <strong>"quarantine"</strong> to avoid an official declaration of war. On 22 October, Kennedy addressed the nation on live television, revealing the missile sites and placing the US military on DEFCON 2—the highest alert level short of war.',
        },
        {
          act: 4,
          title: "Secret Diplomacy: Turkey, Quarantine & Khrushchev's Telegrams",
          text: '<span class="para-ref">[4.4]</span> For five tense days, Soviet cargo ships carrying nuclear warheads steamed directly toward the American quarantine line while US warships waited with loaded guns. On 24 October, Soviet ships suddenly halted and turned back, leading Secretary of State Dean Rusk to famously whisper: <em>"We\'re eyeball to eyeball, and I think the other fellow just blinked."</em> Yet the danger remained acute. On 27 October ("Black Saturday"), an American U-2 plane was shot down over Cuba by a Soviet anti-aircraft missile crew acting without Moscow\'s orders, killing the pilot, Major Rudolf Anderson. Simultaneously, a Soviet submarine (B-59) depth-charged by US destroyers nearly launched a nuclear torpedo, prevented only by the courageous refusal of officer <strong>Vasili Arkhipov</strong>. Desperate to avoid catastrophe, Attorney General Robert F. Kennedy met secretly with Soviet Ambassador Anatoly Dobrynin, hammering out a compromise.',
        },
        {
          act: 5,
          title: 'De-escalation and Deterrence: The Hotline & Partial Test Ban Treaty',
          text: '<span class="para-ref">[4.5]</span> On 28 October 1962, Khrushchev announced over Radio Moscow that the Soviet Union would dismantle and return all nuclear missiles in Cuba under United Nations inspection. In exchange, Kennedy publicly pledged that the United States would respect Cuban sovereignty and never invade the island. Privately, Kennedy agreed to withdraw American Jupiter nuclear missiles from Turkey within six months. Having peered directly into the abyss of mutual annihilation, both superpowers recognized the urgent necessity of institutional de-escalation. In 1963, a direct <strong>"hotline" teletype link</strong> was established between the White House and the Kremlin to enable rapid communication during future crises. In August 1963, the US, USSR, and Britain signed the <strong>Partial Nuclear Test Ban Treaty</strong>, prohibiting nuclear tests in the atmosphere, outer space, and underwater. The era of unchecked brinkmanship gave way to fragile deterrence.',
        },
      ],
    },
    {
      id: 'lesson_5',
      title: 'Proxy Wars: Why did the superpowers fight in Asia (Korea & Vietnam)?',
      enquiryQuestion:
        'Why did superpower nuclear stalemate in Europe displace catastrophic ideological warfare into Asia, and why did conventional military might fail?',
      card_image: '/images/huey_combat_landing_vietnam.jpg',
      card_position: 'center center',
      prologue:
        'Because direct war between nuclear-armed superpowers meant mutually assured destruction, the Cold War was fought through bloody proxy wars in Asia. From the frozen trenches of Korea to the dense jungles of Vietnam, millions of soldiers and civilians died in ideological conflicts. Why did the superpowers fight through Asian battlegrounds?',
      do_now: {
        title: 'Do Now: Retrieval from Lesson 4 (Cuban Missile Crisis)',
        type: 'mixed',
        items: [
          {
            question:
              'Which Cuban revolutionary leader overthrew the Batista dictatorship in 1959 and allied Cuba with the USSR?',
            answer: 'Fidel Castro',
          },
          {
            question:
              'What military measure did President Kennedy order in October 1962 to halt Soviet missile shipments to Cuba?',
            answer: 'A naval quarantine (blockade)',
          },
          {
            question:
              'What secret concession did the US make regarding missiles in Turkey to resolve the Cuban Missile Crisis?',
            answer:
              'The US secretly agreed to remove American Jupiter nuclear missiles from Turkey.',
          },
          {
            question:
              'What communications system was established between Washington and Moscow in 1963 to prevent accidental nuclear war?',
            answer: 'The direct Moscow-Washington "hotline" teletype link',
          },
        ],
      },
      narrative_blocks: [
        {
          act: 1,
          title: 'Cold War Globalisation: The Asian Domino Theory & NSC-68',
          text: '<span class="para-ref">[5.1]</span> Between 1945 and 1949, the Cold War was primarily an ideological and political conflict concentrated in Europe. However, two seismic shocks in late 1949 permanently globalized the struggle: in August, the Soviet Union successfully tested its first atomic bomb (RDS-1); and in October, <strong>Mao Zedong</strong>’s Chinese Communist Party defeated Chiang Kai-shek’s nationalists, establishing the People’s Republic of China. The "fall of China" sent shockwaves through Washington, sparking fears that communism was on an aggressive global march. The US National Security Council issued <strong>NSC-68</strong>, a top-secret policy paper advocating a massive quadrupling of American defense spending to combat Soviet expansionism anywhere in the world. US foreign policy became defined by the <strong>Domino Theory</strong>: the belief that if one Asian nation succumbed to communism, its neighbours would inevitably topple like a row of dominoes.',
        },
        {
          act: 2,
          title: 'The Korean War (1950–53): 38th Parallel, Inchon, and Chinese Intervention',
          text: '<span class="para-ref">[5.2]</span> The first blood-soaked test of this globalized containment policy occurred on the Korean peninsula, which had been partitioned along the <strong>38th Parallel</strong> in 1945. On 25 June 1950, with Stalin’s diplomatic endorsement and Soviet military equipment, communist North Korea under <strong>Kim Il-sung</strong> launched a massive surprise invasion of capitalist South Korea, capturing Seoul within three days. Viewing the invasion as a coordinated Kremlin test of Western resolve, Truman secured a United Nations Security Council resolution to deploy military forces, commanded by General <strong>Douglas MacArthur</strong>. Following MacArthur’s brilliant amphibious landing at Inchon in September 1950, UN and US forces pushed North Korean armies to the Chinese border at the Yalu River. However, Mao Zedong intervened, unleashing 300,000 Chinese "volunteers" who drove Allied forces south in brutal winter combat. By July 1953, the war ground to an armistice stalemate along the 38th Parallel, leaving over three million soldiers and civilians dead.',
        },
        {
          act: 3,
          title: 'The Indochina Crucible: From Dien Bien Phu to the Gulf of Tonkin',
          text: '<span class="para-ref">[5.3]</span> Even as combat subsided in Korea, a second Asian crisis erupted in French Indochina (Vietnam). Led by communist nationalist <strong>Ho Chi Minh</strong>, the Viet Minh waged an anti-colonial war against French colonial forces, culminating in the catastrophic French surrender at <strong>Dien Bien Phu</strong> in May 1954. The subsequent 1954 Geneva Accords partitioned Vietnam temporarily at the 17th parallel into a communist North and a Western-backed South under Ngo Dinh Diem, promising nationwide elections in 1956. Fearing Ho Chi Minh would win over 80% of the vote, the United States backed Diem’s cancellation of elections. By the early 1960s, communist guerrillas known as the <strong>Vietcong (National Liberation Front)</strong> launched an insurgency to reunify Vietnam. Following the disputed 1964 Gulf of Tonkin incident, President Lyndon B. Johnson escalated the conflict, deploying over 536,000 American ground combat troops by 1968.',
        },
        {
          act: 4,
          title: 'Asymmetric Warfare: Cu Chi Tunnels vs Air Mobility & Chemical Weapons',
          text: '<span class="para-ref">[5.4]</span> In the dense tropical jungles of Vietnam, the world’s foremost industrial superpower collided with the realities of <strong>asymmetric guerrilla warfare</strong>. The Vietcong avoided conventional pitched battles where overwhelming American artillery and air power could annihilate them. Instead, they moved in small squads under cover of darkness, deployed lethal booby traps (such as excrement-smeared punji stake pits), and lived in sprawling subterranean tunnel networks, such as the 250km complex at <strong>Cu Chi</strong>. Weapons and regular North Vietnamese troops flowed uninterrupted down the 16,000km <strong>Ho Chi Minh Trail</strong> through neutral Laos and Cambodia. In response, General William Westmoreland waged a war of attrition using helicopter-borne "Search and Destroy" sweeps, dropping 400,000 tons of napalm and spraying 20 million gallons of toxic defoliants like <strong>Agent Orange</strong>, alienating the rural peasantry they sought to protect.',
        },
        {
          act: 5,
          title: 'The Lessons of Asia: The Limits of Superpower Hegemony',
          text: '<span class="para-ref">[5.5]</span> The proxy wars in Korea and Vietnam exposed the stark limitations of superpower military might. Despite dropping more bombs on Southeast Asia than fell during the entirety of World War II, the United States could not conquer a dedicated population fighting an anti-colonial war of national liberation on their home soil. The psychological shock of the 1968 communist <strong>Tet Offensive</strong>, combined with rising American casualties (eventually totaling 58,220 dead) and massive domestic anti-war protests, shattered Washington’s political will. Following the 1973 Paris Peace Accords and complete American withdrawal, North Vietnamese tanks rolled into Saigon on 30 April 1975, reunifying the nation under communist rule. Asia proved that in proxy conflicts, local nationalism, geography, and ideological dedication frequently triumphed over advanced technological firepower.',
        },
      ],
    },
    {
      id: 'lesson_6',
      title: 'Fall of the Berlin Wall (1989) and the collapse of the Soviet Union (1991).',
      enquiryQuestion:
        'Why did the internal economic decay of the Soviet bloc and Gorbachev’s radical reforms culminate in the sudden collapse of European communism?',
      card_image: '/images/berlin_wall_fall_1989.jpg',
      card_position: 'center 25%',
      prologue:
        'By the 1980s, Soviet economic stagnation and citizen unrest undermined the Eastern Bloc. Soviet leader Mikhail Gorbachev introduced reforms of openness and restructuring, but in November 1989, ecstatic crowds dismantled the Berlin Wall. Within two years, the Soviet Union collapsed. Why did the mighty Soviet empire fall so rapidly?',
      do_now: {
        title: 'Do Now: Retrieval from Lesson 5 (Proxy Wars in Asia)',
        type: 'mixed',
        items: [
          {
            question:
              'Along which geographic boundary was the Korean peninsula partitioned in 1945 and preserved by the 1953 armistice?',
            answer: 'The 38th Parallel',
          },
          {
            question:
              'What was the Domino Theory that guided American military intervention across Southeast Asia?',
            answer:
              'The belief that if one Asian nation fell to communism, surrounding nations would rapidly topple like dominoes.',
          },
          {
            question:
              'What intricate logistical jungle network enabled North Vietnam to transport weapons and troops through Laos and Cambodia into South Vietnam?',
            answer: 'The Ho Chi Minh Trail',
          },
          {
            question:
              'Which 1968 surprise military offensive across 100 South Vietnamese cities shattered American domestic political confidence in the war?',
            answer: 'The Tet Offensive',
          },
        ],
      },
      narrative_blocks: [
        {
          act: 1,
          title: 'The Construction of the Berlin Wall (August 1961) & Checkpoint Charlie',
          text: '<span class="para-ref">[6.1]</span> Throughout the 1950s, divided Berlin remained a bleeding wound in the heart of the communist bloc. While living standards and democratic liberties flourished in West Berlin, East Germany suffered chronic shortages and political repression. Between 1949 and 1961, over <strong>2.7 million East Germans</strong>—disproportionately young, skilled professionals, doctors, and engineers—fled to the West through the open border in Berlin. Desperate to halt this catastrophic economic and demographic hemorrhage, East German leader Walter Ulbricht secured Soviet permission to seal the frontier. In the early hours of Sunday, 13 August 1961, East German troops tore up paving stones and unrolled coils of barbed wire, beginning the construction of the concrete <strong>Berlin Wall</strong>. Stretching for 96 miles with watchtowers, tripwire machine guns, and a mined "death strip", the Wall turned West Berlin into an enclosed island and became the ultimate visual symbol of communist tyranny.',
        },
        {
          act: 2,
          title: 'Soviet Stagnation, Afghan Quagmire & The Cost of the Arms Race',
          text: '<span class="para-ref">[6.2]</span> By the late 1970s, the Soviet economic model was decaying from within. Under the eighteen-year rule of <strong>Leonid Brezhnev</strong>, the USSR suffered from chronic agricultural failure, pervasive bureaucratic corruption, and industrial stagnation. While Soviet citizens queued for hours to buy basic foodstuffs like bread, meat, and shoes, the Kremlin channeled over 25% of the nation’s entire gross national product into the military establishment to maintain nuclear parity with the United States. This economic exhaustion was compounded exponentially in December 1979 when the Soviet Union invaded <strong>Afghanistan</strong> to prop up a failing communist regime, becoming trapped in a ten-year guerrilla war against US-backed Afghan mujahideen that cost 15,000 Soviet lives and earned the moniker "the Soviet Union\'s Vietnam". In the 1980s, President <strong>Ronald Reagan</strong> dramatically escalated defense spending, proposing the Strategic Defense Initiative ("Star Wars"), a space-based missile shield that the bankrupt Soviet economy could not match.',
        },
        {
          act: 3,
          title: "Gorbachev's Revolution: Glasnost, Perestroika & Abandoning the Brezhnev Doctrine",
          text: '<span class="para-ref">[6.3]</span> In March 1985, 54-year-old <strong>Mikhail Gorbachev</strong> became General Secretary of the Soviet Communist Party, recognizing that the USSR was facing systemic collapse unless it modernized. Gorbachev introduced two revolutionary reform policies: <strong>Glasnost</strong> (openness), which permitted free public debate, freedom of the press, and open historical examination of Stalinist crimes; and <strong>Perestroika</strong> (restructuring), which decentralized state planning and allowed limited private enterprise. Crucially, Gorbachev abandoned the aggressive <strong>Brezhnev Doctrine</strong>, which had mandated Soviet military intervention to preserve communist satellite regimes (as in Hungary in 1956 and Czechoslovakia in 1968). In what diplomats called the "Sinatra Doctrine" (allowing nations to do it "their way"), Gorbachev announced that the Red Army would no longer intervene to prop up unpopular dictators in Eastern Europe.',
        },
        {
          act: 4,
          title: '9 November 1989: The Breaching of the Berlin Wall & Velvet Revolutions',
          text: '<span class="para-ref">[6.4]</span> Gorbachev’s renunciation of military force unleashed an unstoppable tsunami of democratic revolution across Eastern Europe in 1989. In Poland, the independent trade union <strong>Solidarity</strong> led by Lech Wałęsa swept free elections; in Hungary, reformers dismantled the barbed-wire border with Austria, allowing thousands of East Germans to escape to the West. The climax arrived in Berlin. On the evening of 9 November 1989, East German government spokesman <strong>Günter Schabowski</strong> mistakenly announced at a live press conference that new travel regulations allowing citizens to cross into West Berlin took effect "immediately, without delay." Hundreds of thousands of euphoric East and West Berliners rushed the border checkpoints, overwhelming bewildered guards. Armed with sledgehammers, citizens clambered onto the Wall and began demolishing it in an ecstasy of freedom. Within months, communist rule vanished across the Eastern Bloc.',
        },
        {
          act: 5,
          title: 'The August Coup & The Dissolution of the Soviet Union (25 Dec 1991)',
          text: '<span class="para-ref">[6.5]</span> The collapse of the satellite empire triggered existential tremors within the Soviet Union itself. Loosening totalitarian controls allowed long-suppressed nationalist independence movements to erupt across the fifteen Soviet republics, beginning in the Baltic states of Lithuania, Latvia, and Estonia. In August 1991, hardline communist and KGB officials staged a desperate military coup in Moscow, placing Gorbachev under house arrest. However, the coup was defeated by mass civilian resistance led by Russian President <strong>Boris Yeltsin</strong>, who climbed atop a tank outside the Russian parliament to rally the people. On 25 December 1991, recognizing that the union had dissolved into fifteen independent sovereign republics, Mikhail Gorbachev resigned. At 7:32 PM, the red hammer-and-sickle Soviet flag was lowered over the Kremlin for the final time, replaced by the tricolor of the Russian Federation. The Soviet Union was extinct; the Cold War was over.',
        },
      ],
    },
    {
      id: 'lesson_7',
      title: "Assessment: Was the Cold War ever truly 'cold'?",
      enquiryQuestion:
        "To what extent is the label 'Cold War' an inaccurate Eurocentric concept that obscures the devastating human toll of global proxy conflict?",
      card_image: '/images/checkpoint_charlie_tanks_1961.jpg',
      card_position: 'center 40%',
      prologue:
        "Between 1945 and 1991, the Cold War shaped global politics, espionage, nuclear weapons, and space exploration. While the superpowers never launched atomic missiles directly at each other, millions died in proxy conflicts and lived under authoritarian terror. Was the Cold War ever truly 'cold', or a global conflict in disguise?",
      do_now: {
        title: 'Do Now: Retrieval from Lesson 6 (Fall of the Wall & Collapse of USSR)',
        type: 'mixed',
        items: [
          {
            question: 'Why did the East German government erect the Berlin Wall in August 1961?',
            answer:
              'To halt the massive economic and brain drain of 2.7 million skilled citizens fleeing to West Berlin.',
          },
          {
            question:
              "What were Mikhail Gorbachev's two signature reform policies introduced in 1985?",
            answer: 'Glasnost (openness/free speech) and Perestroika (economic restructuring).',
          },
          {
            question:
              'On what historic date was the Berlin Wall breached by jubilant citizens after border restrictions collapsed?',
            answer: '9 November 1989',
          },
          {
            question:
              'In what month and year did the Soviet Union officially dissolve, bringing the Cold War to an end?',
            answer: 'December 1991',
          },
        ],
      },
      narrative_blocks: [
        {
          act: 1,
          title: 'The Eurocentric Myth: The "Long Peace" in Europe vs Global Slaughter',
          text: '<span class="para-ref">[7.1]</span> For decades, Western diplomatic historians described the era between 1945 and 1991 as the "Cold War" or the "Long Peace"—a period of international stability where the balance of power and nuclear deterrence successfully prevented a catastrophic World War III between the superpowers. However, contemporary global historians, such as Odd Arne Westad in <em>The Global Cold War</em>, have fundamentally challenged this Eurocentric narrative. While European capitals were spared military devastation, the conflict was neither peaceful nor "cold". In reality, the Cold War was a lethal, ideologically total conflict that was systematically outsourced to the Global South—Asia, Africa, the Middle East, and Latin America—where it was fought with ferocious conventional violence, leaving societies devastated and millions dead.',
        },
        {
          act: 2,
          title: 'The Human Cost of Proxy War: 20 Million Dead Across Four Continents',
          text: '<span class="para-ref">[7.2]</span> When evaluated from a global perspective, the human cost of the Cold War was apocalyptic. Historians estimate that over <strong>twenty million human beings lost their lives</strong> in Cold War-related conflicts between 1945 and 1991. In Korea, three million people died in three years of industrial warfare; in Southeast Asia, over three million Vietnamese, Cambodians, and Laotians perished under carpet bombing, chemical defoliation, and ground sweeps. Across sub-Saharan Africa, in Angola, Mozambique, and Ethiopia, superpower funding and weapons turned local decolonization struggles into decades-long civil wars that claimed hundreds of thousands of lives. In Latin America, CIA-backed military juntas in Chile, Argentina, Guatemala, and Nicaragua unleashed ruthless "Dirty Wars", disappearing, torturing, and murdering tens of thousands of suspected leftists.',
        },
        {
          act: 3,
          title: 'The Invisible War: Espionage, Covert Action & Psychological Warfare',
          text: '<span class="para-ref">[7.3]</span> Beyond battlefields, the Cold War was waged through an all-pervasive shadow war of espionage, covert subversion, and psychological manipulation. Intelligence agencies like the American <strong>Central Intelligence Agency (CIA)</strong> and the Soviet <strong>KGB</strong> operated worldwide networks of spies, double agents, and codebreakers. In 1953, the CIA orchestrated Operation Ajax, overthrowing the democratically elected Prime Minister of Iran, Mohammad Mossaddegh, after he nationalized British oil assets; in 1954, the CIA orchestrated a military coup in Guatemala to depose President Jacobo Árbenz. Across the Eastern Bloc, secret police networks like the East German <strong>Stasi</strong> maintained massive files on millions of citizens, deploying informants within families and workplaces to crush independent thought and enforce totalitarian conformity.',
        },
        {
          act: 4,
          title: 'Technological Competition: The Space Race & The Arms Escalation',
          text: '<span class="para-ref">[7.4]</span> The ideological rivalry between the superpowers was fought with equal ferocity in the realms of science, culture, and prestige. When the Soviet Union launched <strong>Sputnik 1</strong>, the first artificial satellite, in October 1957, and sent <strong>Yuri Gagarin</strong> into orbit as the first human in space in April 1961, American pride was profoundly shaken. President Kennedy responded by committing the nation to land an American on the moon before the decade was out, achieving the milestone with Apollo 11 in July 1969. Simultaneously, both nations spent trillions of dollars building nuclear arsenals capable of destroying the planet dozens of times over. By the 1980s, the superpowers possessed over 60,000 nuclear warheads, creating the psychological condition of Mutually Assured Destruction (MAD), where global survival rested on a terrifying balance of nuclear fear.',
        },
        {
          act: 5,
          title: 'The Synoptic Verdict: An Era of Total War Without Direct Armageddon',
          text: '<span class="para-ref">[7.5]</span> In answering whether the Cold War was truly "cold", historians conclude that the term is an incomplete and misleading description of a global tragedy. Direct military conflict between the US and the USSR was averted solely because nuclear weapons transformed conventional superpower war into collective suicide. Yet this avoidance of direct armageddon came at an appalling price: the superpowers projected their ideological battle into vulnerable post-colonial nations, treating developing peoples as disposable pawns in a global chess match. The Cold War was an era of total ideological confrontation—a war fought through proxy armies, proxy victims, covert terrorism, economic strangulation, and nuclear terror. While humanity survived the ultimate nuclear nightmare, the scars of this four-decade conflict continue to shape the political boundaries, conflicts, and fault lines of our modern world.',
        },
      ],
    },
  ],
};

export { unitData };
export default unitData;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = unitData;
}
