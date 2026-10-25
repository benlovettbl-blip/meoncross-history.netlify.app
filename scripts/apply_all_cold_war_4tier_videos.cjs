const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('❄️ APPLYING 4-TIER IDEAL CLASSROOM VIDEO SHELF: COLD WAR');
console.log('======================================================');

const coldWar4TierVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TMYcLVDAeD4',
      title: "The Cold War: Ideological Differences | I'm Stuck GCSE History",
      duration: '5 mins 37 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Direct contrast of the opposing ideological, political, and economic pillars of the USA and USSR: liberal democracy and free markets versus Marxist-Leninist command economy. Recommended Watch Window: 00:00–04:15 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated educational summary comparing democratic capitalism and totalitarian communism.',
      viewing_task:
        '<ol><li><strong>[01:10] Quick Check:</strong> What were the fundamental political differences between the democratic multi-party system of the USA and the one-party communist state of the USSR?</li><li><strong>[03:20] Hinge Question:</strong> Why did the economic philosophy of free-market capitalism (private profit and competition) make long-term peaceful coexistence with Soviet state-directed communism fundamentally impossible?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> The USA operated as a liberal democracy with free, multi-party elections, freedom of speech, and constitutional civil rights. In contrast, the USSR was a totalitarian one-party state governed exclusively by the Communist Party (CPSU), where political dissent was outlawed, media was strictly censored, and the secret police (NKVD/KGB) eliminated opposition.</li><li><strong>Hinge Question:</strong> Capitalist ideology required free trade, private property, and open international markets to thrive, while Marxist-Leninist ideology taught that capitalism was an inherently exploitative system destined to collapse and that communism must actively spread worldwide. Each superpower saw the other\'s existence as an existential, irreconcilable threat to its own survival.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=y9HjvHZfCUI',
      title: 'Crash Course: USA vs USSR Fight! The Cold War | Crash Course World History #39',
      duration: '12 mins 16 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'John Green explains why the Cold War was defined by mutual ideological suspicion rather than direct superpower military engagement, introducing containment, nuclear deterrence, and proxy wars. Recommended Watch Window: 01:30–07:45 • Lesson Phase: Guided Instruction & Archival Investigation. Tone Alert: Energetic, academically rigorous lecture evaluating the structural mechanics of superpower deterrence.',
      viewing_task:
        '<ol><li><strong>[02:40] Recall:</strong> What diplomatic strategy did US diplomat George F. Kennan formulate in his 1946 "Long Telegram" to halt the expansion of Soviet communism?</li><li><strong>[04:50] Explain:</strong> Explain how the concept of Mutually Assured Destruction (MAD) prevented the Cold War from erupting into a direct "hot war" between the US military and the Red Army.</li><li><strong>[07:15] Challenge:</strong> Evaluate the paradoxical nature of the Cold War: why did the prevention of direct superpower conflict in Europe lead directly to devastating proxy wars across Asia, Africa, and Latin America?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The policy of "Containment"—resisting Soviet expansionist pressure through economic aid, military alliances, and diplomatic pressure without direct military invasion of the USSR.</li><li><strong>Explain:</strong> The development of atomic and thermonuclear weapons (hydrogen bombs) and intercontinental ballistic missiles (ICBMs) meant that any direct military conflict between the US and USSR would inevitably escalate into a full nuclear exchange, resulting in the total annihilation of both superpowers and global civilization. Therefore, direct war was unwinnable and suicidal.</li><li><strong>Challenge:</strong> Because MAD made direct armed confrontation in Europe unthinkable, the superpowers channeled their ideological and geopolitical competition into the developing world. By funding, arming, and training opposing factions in Korea, Vietnam, Angola, and Afghanistan, the US and USSR fought fiercely for global hegemony through third-party proxies, shifting the human cost of the Cold War onto millions of Global South civilians.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=r9yyDEDGlr0',
      title: 'The Third Man (1949, Carol Reed / Orson Welles) | Official Trailer',
      duration: '1 min 35 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Atmospheric film noir set in Allied-partitioned Vienna, exploring the black market, espionage, and cynical division between Western and Soviet military sectors. Recommended Watch Window: 00:00–01:35 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Four-Power Partition. Tone Alert: Tense, shadowy post-war European noir.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the rubble of bombed European cities, the four-power military police patrols (American, British, French, and Soviet soldiers riding in the same jeep), and the cynical black-market penicillin racket depicted in Carol Reed\'s masterpiece. How does this film capture the atmosphere of moral exhaustion, mutual paranoia, and division in post-WWII Europe as the Grand Alliance fractured?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer captures the ruins of post-war Europe divided into military occupation sectors, reflecting the real-world tensions established at Yalta and Potsdam. The cynical tone, shadowy lighting, and four-power patrols highlight how wartime Allies quickly became suspicious rivals, while ordinary European civilians struggled to survive amidst acute shortages and black-market exploitation.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=6ltp3rxcLeY',
      title: 'CNN Cold War Episode 1: Comrades (1917–1945) | Jeremy Isaacs Production',
      duration: '46 mins 26 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Authoritative Emmy Award-winning documentary examining the deep historical roots of US-Soviet hostility from the 1917 Bolshevik Revolution and Western intervention, through WWII collaboration, to the 1945 Yalta and Potsdam conferences. Recommended Watch Window: 18:00–26:30 • Lesson Phase: In-Depth Documentary Investigation & Flipped Learning. Tone Alert: Rigorous documentary featuring rare Soviet and Western newsreels, and interviews with diplomats Averell Harriman and George Kennan.',
      viewing_task:
        '<ol><li><strong>[08:20] Recall:</strong> How did Western military intervention in the Russian Civil War (1918–1920) establish long-term Soviet paranoia regarding capitalist encirclement?</li><li><strong>[21:40] Explain:</strong> Explain why Joseph Stalin was furious with Churchill and Roosevelt over the repeated delays in opening a "Second Front" in Western Europe between 1941 and 1944.</li><li><strong>[35:10] Challenge:</strong> Evaluate how the atomic bombings of Hiroshima and Nagasaki in August 1945 transformed US-Soviet diplomacy from wartime partnership to nuclear brinkmanship.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Britain, the US, France, and Japan sent expeditionary troops to Russia to support anti-communist "White" forces, convincing Lenin and Stalin that capitalist powers would always seek to militarily strangle the Soviet Union.</li><li><strong>Explain:</strong> The USSR bore the overwhelming brunt of the Nazi war machine, suffering over 20 million deaths while fighting 80% of the German army alone on the Eastern Front. Stalin believed Britain and the US deliberately delayed D-Day (until June 1944) so that Nazi Germany and the Soviet Union would bleed each other to exhaustion.</li><li><strong>Challenge:</strong> Truman\'s atomic announcement at Potsdam and the destruction of Hiroshima and Nagasaki signaled to Moscow that the US possessed monopoly control over an apocalyptic superweapon. Rather than intimidating Stalin into geopolitical concessions in Poland, it accelerated Soviet paranoia, convincing Stalin that the USSR was in mortal danger and driving Soviet espionage to detonate its own atomic bomb by August 1949.</li></ol>',
    },
  ],

  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=v4NPeiB2Sl8',
      title: 'The Yalta Conference | History on Maps',
      duration: '5 mins 07 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Visual cartographic breakdown of the territorial and political agreements reached by Churchill, Roosevelt, and Stalin at Yalta in February 1945. Recommended Watch Window: 00:00–04:00 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Clear, map-based historical breakdown of European postwar territorial partition.',
      viewing_task:
        '<ol><li><strong>[01:15] Quick Check:</strong> Into how many military occupation zones did the Big Three agree to divide defeated Germany and the city of Berlin at the February 1945 Yalta Conference?</li><li><strong>[02:45] Hinge Question:</strong> How did conflicting interpretations of the "Declaration on Liberated Europe" regarding democratic elections in Poland create immediate distrust between Britain/USA and the Soviet Union?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Four occupation zones (administered by Britain, the United States, the Soviet Union, and France).</li><li><strong>Hinge Question:</strong> Roosevelt and Churchill interpreted the declaration as guaranteeing immediate, free, multi-party secret elections with international observers. In contrast, Stalin—having lost 27 million Soviet lives during the German invasion—insisted that Poland must have a "friendly" pro-Soviet government to serve as an impenetrable buffer zone, promptly installing the pro-communist Lublin Committee and suppressing the London-based democratic government-in-exile.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=GipaXw-QIa4',
      title: 'The Three Conferences: Superpower Relations | The History Teacher',
      duration: '6 mins 55 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Detailed comparison between the Yalta and Potsdam conferences: Roosevelt\'s death, Churchill\'s electoral defeat, Truman\'s "atomic diplomacy", and the breakdown of allied cooperation. Recommended Watch Window: 01:00–06:15 • Lesson Phase: Guided Instruction & Archival Investigation. Tone Alert: Structured GCSE syllabus breakdown with archival photographs and conference documents.',
      viewing_task:
        '<ol><li><strong>[01:45] Recall:</strong> Name the two major Western leadership changes that occurred between the Yalta Conference (February 1945) and the Potsdam Conference (July–August 1945).</li><li><strong>[03:30] Explain:</strong> How did President Harry S. Truman\'s notification to Stalin at Potsdam that the US had successfully detonated an atomic bomb (the Trinity test) heighten Soviet suspicion and accelerate the nuclear arms race?</li><li><strong>[05:40] Challenge:</strong> Evaluate why Potsdam marked the formal end of the Grand Alliance: why were the Allies unable to agree on reparations and the permanent political future of Germany?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Franklin D. Roosevelt died and was succeeded by Harry S. Truman; Winston Churchill lost the British general election midway through the conference and was replaced by Clement Attlee.</li><li><strong>Explain:</strong> Truman deliberately hinted to Stalin about a "new weapon of extraordinary destructive power" to intimidate him into political concessions in Poland and Eastern Europe. Stalin, whose spy network (including Klaus Fuchs) had already informed him of the Manhattan Project, viewed Truman\'s atomic diplomacy as nuclear blackmail, immediately ordering Soviet physicists to accelerate their own atomic bomb program at all costs.</li><li><strong>Challenge:</strong> Stalin demanded devastating reparations ($20 billion, half to the USSR) and wanted Germany stripped of all industrial capacity to permanently prevent German resurgence. Truman and Attlee, mindful of how the harsh Treaty of Versailles had fostered Nazism and determined not to subsidize starving German civilians, insisted that each power take reparations primarily from its own occupation zone, permanently splitting Germany into capitalist and communist halves.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=G84ukGdNsDs',
      title: 'The Big Lift (1950, George Seaton / Montgomery Clift) | Official Trailer',
      duration: '2 mins 08 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Shot on location in the ruins of West Berlin and at Tempelhof Airport during the actual Berlin Airlift, starring Montgomery Clift and real USAF and RAF pilots. Recommended Watch Window: 00:00–02:08 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Tactical Airlift Logistics. Tone Alert: Authentic historical drama filmed amidst the real rubble of 1949 Berlin.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the actual footage of C-54 Skymaster transport planes landing round-the-clock at Tempelhof Airport amidst bombed-out Berlin tenements, and the interactions between American flight crews and German civilians who were their mortal enemies barely four years earlier. How does this film dramatize the profound psychological shift of West Berliners from defeated enemies to protected democratic allies?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> Filmed on location immediately after the blockade, the movie dramatizes the extraordinary human and logistical reconciliation between former enemies. West Berliners, facing starvation under Soviet blockade, came to view American and British pilots as heroic liberators (\'Candy Bombers\'), cementing West Germany\'s emotional and political integration into the Western democratic bloc.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=JUSxqukzaVQ',
      title: 'CNN Cold War Episode 4: Berlin (1948–1949) | Jeremy Isaacs Production',
      duration: '46 mins 32 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Comprehensive documentary examining the introduction of the Deutsche Mark, Stalin\'s total land blockade, Operation Vittles / Plainfare, Gail Halvorsen\'s "Candy Bombers", and the May 1949 Soviet capitulation. Recommended Watch Window: 14:00–24:15 • Lesson Phase: Guided Instruction & Logistical Investigation. Tone Alert: Superb archival documentary with interviews with airlift pilots, Ernst Reuter\'s family, and Soviet military officials.',
      viewing_task:
        '<ol><li><strong>[09:15] Recall:</strong> What new Western currency reform in June 1948 directly prompted Stalin to sever all rail, road, and canal traffic into West Berlin?</li><li><strong>[18:40] Explain:</strong> Explain how Allied airmen like Lieutenant Gail Halvorsen (\'The Chocolate Flyer\') used small parachutes of candy to win the hearts and minds of Berlin children and transform Western public opinion.</li><li><strong>[31:20] Challenge:</strong> Evaluate how Stalin\'s Berlin Blockade backfired catastrophically against Soviet strategic interests, accelerating the creation of NATO and the Federal Republic of Germany (FRG).</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The introduction of the <em>Deutsche Mark</em> in the Western zones and West Berlin.</li><li><strong>Explain:</strong> Halvorsen began dropping chocolate bars and bubblegum attached to tiny handkerchief parachutes to children gathered near Tempelhof runway. The initiative went viral across American media, prompting millions of donations of candy from US schoolchildren. It transformed a military-logistical operation into a powerful humanitarian symbol, destroying Soviet propaganda that framed the West as capitalist imperialists.</li><li><strong>Challenge:</strong> Stalin hoped to force the Western Allies to abandon West Berlin or abandon plans for an independent West German state. Instead, his aggressive tactics convinced Western leaders that the USSR was an immediate military threat. The crisis spurred the immediate unification of the three Western zones into the Federal Republic of Germany (May 1949) and led directly to the signing of the North Atlantic Treaty (NATO) in April 1949, committing US nuclear power to defend Western Europe under Article 5.</li></ol>',
    },
  ],

  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=P8m0YZV-Vgk',
      title: 'History Brief: What was the Iron Curtain? | Reading Through History',
      duration: '2 mins 44 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Examines Winston Churchill’s March 1946 "Sinews of Peace" speech in Fulton, Missouri, and how the metaphor of the "Iron Curtain" crystallized the division of Europe. Recommended Watch Window: 00:00–02:30 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible primary audio and photographic historical overview.',
      viewing_task:
        '<ol><li><strong>[00:45] Quick Check:</strong> In which American town did Winston Churchill deliver his famous March 1946 address warning that "an iron curtain has descended across the Continent"?</li><li><strong>[01:45] Hinge Question:</strong> Why did Joseph Stalin publicly denounce Churchill\'s speech as a "call to war" and compare Churchill\'s racial and imperial rhetoric to Adolf Hitler?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Fulton, Missouri (at Westminster College).</li><li><strong>Hinge Question:</strong> Churchill called for a permanent military "fraternal association" between the English-speaking peoples (Britain and the USA) to halt Soviet expansion. Stalin argued that Churchill was promoting Anglo-American racial supremacy to dominate the world, asserting that Soviet security required loyal neighboring states after suffering catastrophic invasion through Poland twice in thirty years.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=J1hxAhd-9hc',
      title: 'The Berlin Blockade and Airlift | The History Teacher',
      duration: '6 mins 45 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Deconstructs the first major military standoff of the Cold War: Bizonia, the introduction of the Deutsche Mark, Stalin\'s land blockade of West Berlin, Operation Plainfare/Vittles, and the founding of NATO (1949). Recommended Watch Window: 00:45–05:50 • Lesson Phase: Guided Instruction & Archival Investigation. Tone Alert: Structured GCSE syllabus breakdown with newsreel footage of C-47 and C-54 transport planes.',
      viewing_task:
        '<ol><li><strong>[01:15] Recall:</strong> What Western economic reform in June 1948 directly prompted Stalin to sever all road, rail, and barge access routes between West Germany and West Berlin?</li><li><strong>[03:20] Explain:</strong> Explain the logistical scale and tactical brilliance of the Anglo-American Berlin Airlift (Operation Plainfare / Vittles): how did the Allies supply 2.5 million citizens for eleven months without firing a shot?</li><li><strong>[05:10] Challenge:</strong> Evaluate the long-term geopolitical consequences of the Berlin Blockade: how did Stalin\'s failed gamble lead directly to the permanent partition of Germany and the creation of NATO?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Western Allies merged their zones (creating Bizonia/Trizonia) and introduced a stable new currency, the <em>Deutsche Mark</em>, into West Germany and West Berlin without Soviet approval.</li><li><strong>Explain:</strong> The US Air Force and British RAF flew round-the-clock air corridors guaranteed by 1945 treaties. At the peak of the airlift, a cargo plane landed at Tempelhof or Gatow airport every 90 seconds, delivering over 2.3 million tons of food, flour, coal, and medical supplies in 278,000 flights. By relying purely on air transport, the Allies put the moral burden of firing the first shot on Stalin, who backed down and lifted the blockade in May 1949.</li><li><strong>Challenge:</strong> Stalin\'s aggressive intimidation backfired completely. It accelerated the formal creation of the Federal Republic of Germany (West Germany, FRG) in May 1949, followed by the Soviet creation of the German Democratic Republic (East Germany, GDR) in October 1949. Crucially, fear of Soviet military aggression convinced twelve Western nations to form the North Atlantic Treaty Organization (NATO) in April 1949, committing the US to military defense of Western Europe under Article 5.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1gXY3kuDvSU',
      title: 'Dr. Strangelove (1964, Stanley Kubrick) | Official Trailer',
      duration: '2 mins 42 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Stanley Kubrick’s iconic black comedy satirizing nuclear paranoia, the doctrine of Mutually Assured Destruction (MAD), fail-safe protocols, and the apocalyptic "Doomsday Machine". Recommended Watch Window: 00:00–02:42 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Deterrence Paranoia. Tone Alert: Brilliant satirical black comedy deconstructing nuclear brinkmanship.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the stark black-and-white cinematography, the iconic War Room ("Gentlemen, you can\'t fight in here! This is the War Room!"), B-52 bombers on continuous nuclear alert, and Peter Sellers\' portrayal of the unhinged ex-Nazi strategist Dr. Strangelove. How does Kubrick use dark satire to expose the terrifying irrationality at the core of the superpower nuclear arms race?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> Kubrick exposes the paradox of nuclear deterrence: military strategies designed to prevent war (such as hair-trigger alert systems and automated retaliation) actually created systemic vulnerabilities where human error, military zealotry, or technological glitches could trigger the annihilation of mankind. The film highlights the pervasive psychological anxiety of the 1950s and 1960s nuclear age.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ZJAZh8ISE54',
      title: 'CNN Cold War Episode 7: After Stalin (1953–1956) | Jeremy Isaacs Production',
      duration: '46 mins 26 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Deep documentary chronicling the death of Stalin in March 1953, Nikita Khrushchev\'s "Secret Speech" denouncing Stalinism, the Warsaw Pact (1955), and the brutal Soviet tank suppression of Imre Nagy\'s Hungarian Revolution in November 1956. Recommended Watch Window: 22:00–33:45 • Lesson Phase: Guided Instruction & Satellite Crisis Analysis. Tone Alert: Gripping, emotionally charged archival documentary with Hungarian freedom fighters and Soviet officers.',
      viewing_task:
        '<ol><li><strong>[08:15] Recall:</strong> What historic denunciation did Nikita Khrushchev deliver behind closed doors at the 20th Soviet Communist Party Congress in February 1956?</li><li><strong>[24:30] Explain:</strong> What three radical political demands were made by Imre Nagy and Hungarian protesters in October 1956 that provoked Soviet military intervention?</li><li><strong>[32:10] Challenge:</strong> Evaluate why President Eisenhower and the United Nations refused to provide military assistance to Hungarian freedom fighters despite Radio Free Europe broadcasts encouraging resistance.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The "Secret Speech" (<em>On the Cult of Personality and Its Consequences</em>), which denounced Joseph Stalin\'s brutal purges, terror, and personality cult, inaugurating "De-Stalinisation".</li><li><strong>Explain:</strong> Nagy announced that Hungary was withdrawing from the Warsaw Pact to declare permanent neutrality, demanded the immediate withdrawal of all Soviet Red Army troops, and abolished the one-party state to hold free multi-party democratic elections.</li><li><strong>Challenge:</strong> The US was constrained by the reality of Mutually Assured Destruction: sending US troops into Hungary would mean a direct land war with the Soviet Union inside its recognized sphere of influence, inevitably escalating to nuclear war. Furthermore, the crisis erupted simultaneously with the Suez Crisis (Britain, France, and Israel invading Egypt), which politically divided the Western allies and completely distracted world attention. Nagy was arrested and executed, demonstrating that the USSR would use ruthless military force to preserve its Eastern European satellite empire.</li></ol>',
    },
  ],

  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=bwWW3sbk4EU',
      title: 'The History of the Cuban Missile Crisis | TED-Ed',
      duration: '4 mins 52 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Matthew A. Jordan explores the October 1962 crisis: U-2 spy plane photographs discovering Soviet medium-range ballistic missile (MRBM) launch pads in Cuba, 90 miles from Florida. Recommended Watch Window: 00:00–04:15 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated educational summary of nuclear brinkmanship.',
      viewing_task:
        '<ol><li><strong>[01:05] Quick Check:</strong> How far is the island of Cuba from the coast of Florida, and what type of Soviet nuclear missiles were detected by American U-2 reconnaissance flights on 14 October 1962?</li><li><strong>[02:40] Hinge Question:</strong> Why did President John F. Kennedy reject the advice of military generals demanding immediate surgical airstrikes on Cuba, choosing instead to implement a naval "quarantine"?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> 90 miles; Medium- and Intermediate-Range Ballistic Missiles (MRBMs/IRBMs, SS-4 and SS-5).</li><li><strong>Hinge Question:</strong> Kennedy recognized that airstrikes could not guarantee 100% destruction of all missile sites; surviving missiles could be launched against US East Coast cities within minutes, killing 80 million Americans. Furthermore, killing Soviet missile technicians in Cuba would compel Khrushchev to invade West Berlin, triggering global thermonuclear war. A naval "quarantine" stopped incoming Soviet weapons ships while providing time for diplomatic negotiation.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=XbKCyQn5oTc',
      title: 'The Cuban Missile Crisis (1962) | Simple History',
      duration: '4 mins 11 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Chronicles the climax of the 13 Days: DEFCON 2, the shooting down of Major Rudolf Anderson\'s U-2 plane, Vasili Arkhipov preventing a nuclear torpedo launch, and the secret Bobby Kennedy-Dobrynin pact. Recommended Watch Window: 00:30–04:00 • Lesson Phase: Guided Instruction & Archival Investigation. Tone Alert: Dramatic animated military history detailing the closest the world ever came to nuclear war.',
      viewing_task:
        '<ol><li><strong>[01:15] Recall:</strong> What military alert status did the US Strategic Air Command reach during the crisis—the highest readiness state in American Cold War history?</li><li><strong>[02:30] Explain:</strong> Explain the public and private terms of the secret compromise negotiated between Robert Kennedy and Soviet Ambassador Anatoly Dobrynin that resolved the crisis on 28 October 1962.</li><li><strong>[03:40] Challenge:</strong> Evaluate the long-term consequences of the Cuban Missile Crisis for superpower diplomacy: how did the brush with armageddon lead to the "Hotline" and the 1963 Test Ban Treaty?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> DEFCON 2 (Defense Readiness Condition 2, one step away from nuclear war).</li><li><strong>Explain:</strong> Publicly, Khrushchev agreed to dismantle and ship back all Soviet nuclear missiles from Cuba under UN inspection in exchange for Kennedy\'s public pledge that the United States would never invade Cuba. Privately, Kennedy agreed to withdraw American nuclear Jupiter missiles stationed on the Soviet border in Turkey within six months, demanding this remain strictly secret to protect his domestic political image.</li><li><strong>Challenge:</strong> Both leaders were deeply shaken by how close rogue actions (such as the shooting down of Anderson\'s U-2 or submarine B-59) brought the world to total annihilation. To ensure rapid direct communication during crises, they established the Washington-Moscow "Hotline" teletype link in 1963, and signed the 1963 Partial Nuclear Test Ban Treaty prohibiting atmospheric and underwater nuclear testing, inaugurating the first thaw toward détente.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=PqM102xIbIs',
      title: 'Thirteen Days (2000, Roger Donaldson / Kevin Costner) | Official Trailer',
      duration: '2 mins 28 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Gripping historical dramatisation of the ExComm meetings inside the White House during October 1962, illustrating the intense clashes between JFK, Robert McNamara, and hawkish Joint Chiefs of Staff demanding airstrikes and invasion. Recommended Watch Window: 00:00–02:28 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Executive Crisis Management. Tone Alert: Tense, high-stakes political thriller.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the claustrophobic White House Cabinet Room meetings, the military chiefs (General Curtis LeMay) pushing for immediate preventive bombing of Cuba, and John and Robert Kennedy\'s desperate struggle to avoid military escalation that could trigger an unstoppable chain reaction of nuclear war. How does the trailer dramatize the extreme pressure on political leaders during the most dangerous 13 days in human history?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer powerfully dramatizes the constitutional conflict between civilian political leadership and military commanders during an existential crisis. Kennedy recognized that military escalation has its own uncontrollable momentum (\'fog of war\'); one misstep or unauthorized shot would compel retaliation, resulting in global annihilation. Costner and Greenwood\'s portrayals highlight the agonizing moral weight of crisis leadership.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=XdSbRvGm3pM',
      title: 'CNN Cold War Episode 10: Cuba (1959–1962) | Jeremy Isaacs Production',
      duration: '46 mins 26 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Masterful documentary examining the Cuban Revolution (Fidel Castro), the disastrous CIA-backed 1961 Bay of Pigs invasion, Operation Anadyr (Khrushchev secretly deploying nuclear missiles), the 13-day naval blockade, and how Soviet submarine B-59 came within seconds of launching a nuclear torpedo. Recommended Watch Window: 24:00–36:00 • Lesson Phase: Guided Instruction & Nuclear Brinkmanship Investigation. Tone Alert: Acclaimed historical documentary featuring interviews with Fidel Castro, Robert McNamara, KGB agents, and Soviet missile commanders in Cuba.',
      viewing_task:
        '<ol><li><strong>[08:45] Recall:</strong> What failed CIA-backed invasion of Cuba in April 1961 convinced Fidel Castro and Nikita Khrushchev that the US was actively plotting to overthrow the Cuban government?</li><li><strong>[26:30] Explain:</strong> Explain the incident on Soviet submarine B-59 on 27 October 1962 ("Black Saturday"): how did officer Vasili Arkhipov single-handedly prevent a nuclear catastrophe?</li><li><strong>[38:15] Challenge:</strong> Evaluate why Nikita Khrushchev was ousted from power by the Soviet Politburo in 1964: did the resolution of the Cuban Missile Crisis brand him as reckless or weak?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Bay of Pigs Invasion (<em>Playa Girón</em>).</li><li><strong>Explain:</strong> US Navy destroyers dropped depth charges to force submerged Soviet submarine B-59 to surface. Isolated without radio contact for days and suffering from extreme heat and carbon dioxide poisoning, Commander Savitsky believed World War III had already started and ordered the launch of a 10-kiloton nuclear torpedo. Launching required unanimous consent of three officers; brigade Chief of Staff Vasili Arkhipov refused to consent, insisting they surface, thereby averting a global nuclear exchange.</li><li><strong>Challenge:</strong> Because the withdrawal of American Jupiter missiles from Turkey remained strictly secret, the Soviet public and military saw only that Khrushchev had backed down, dismantled his missiles, and allowed US naval ships to inspect Soviet freighters. Soviet hardliners branded Khrushchev\'s deployment reckless adventurism, and his withdrawal humiliating capitulation to American imperialism, directly contributing to his removal as Soviet Premier in October 1964 by Leonid Brezhnev.</li></ol>',
    },
  ],

  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=yxaegqvl4aE',
      title: 'The Korean War (1950–53) | Simple History',
      duration: '4 mins 31 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Explains the first hot proxy conflict of the Cold War: the June 1950 North Korean invasion across the 38th Parallel, Douglas MacArthur\'s Inchon landing, Chinese entry, and the 1953 armistice. Recommended Watch Window: 00:00–04:00 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated breakdown of Cold War proxy combat.',
      viewing_task:
        '<ol><li><strong>[00:50] Quick Check:</strong> Along which geographical line of latitude was Korea partitioned following the defeat of Imperial Japan in 1945?</li><li><strong>[02:30] Hinge Question:</strong> Why did Chairman Mao Zedong commit over 300,000 Chinese "People\'s Volunteer" soldiers to cross the Yalu River in October 1950, driving UN and American forces into retreat?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> The 38th Parallel.</li><li><strong>Hinge Question:</strong> General Douglas MacArthur ignored Chinese warnings and advanced UN forces directly up to the Chinese border at the Yalu River, publicly threatening to bomb China. Beijing viewed the presence of American troops on its industrial Manchurian border as an intolerable imperialist threat to the survival of the newly established People\'s Republic of China, launching a massive counter-offensive to preserve a communist buffer state in North Korea.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=CSq0NsklJTU',
      title: 'Vietnam War in 5 minutes | Secrets of the Past',
      duration: '5 mins 46 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Examines the escalating US commitment in Vietnam from the 1964 Gulf of Tonkin incident through Operation Rolling Thunder and search-and-destroy missions, to the 1968 Tet Offensive and US withdrawal. Recommended Watch Window: 00:30–04:45 • Lesson Phase: Guided Instruction & Archival Investigation. Tone Alert: Fast-paced military documentary with primary battlefield combat footage.',
      viewing_task:
        '<ol><li><strong>[01:10] Recall:</strong> What 1964 congressional measure granted President Lyndon B. Johnson sweeping executive authority to deploy US combat troops to Vietnam without a formal declaration of war?</li><li><strong>[02:45] Explain:</strong> Explain how Vietcong guerrilla tactics—including subterranean tunnel systems, booby traps, and ambushes—neutralized superior American aerial firepower and chemical defoliants.</li><li><strong>[04:20] Challenge:</strong> Evaluate why the January 1968 Tet Offensive was simultaneously a crushing tactical defeat for communist forces, yet a decisive strategic and political victory that ended the US war effort.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Gulf of Tonkin Resolution.</li><li><strong>Explain:</strong> The Vietcong avoided conventional pitched battles, adopting "belt-grabbing" tactics (fighting within yards of American soldiers to prevent artillery strikes). By operating out of extensive hidden underground tunnel complexes (such as at Cu Chi) and melting into civilian farming villages, they made US heavy bombers, napalm, and Agent Orange counterproductive, destroying civilian support for Saigon.</li><li><strong>Challenge:</strong> Militarily, communist forces suffered catastrophic losses (over 40,000 casualties) and failed to spark a civilian uprising, effectively wiping out the southern Vietcong. Politically, however, television footage of guerrillas storming the US Embassy in Saigon shattered President Johnson\'s claims that victory was imminent. Walter Cronkite\'s declaration that the war was in a stalemate destroyed public faith in the administration, forcing LBJ to halt bombing and announce he would not seek re-election.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1ncOPBCbufw',
      title: 'The Unbearable Lightness of Being (1988, Philip Kaufman) | Original Trailer',
      duration: '2 mins 26 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Acclaimed feature film adaptation of Milan Kundera’s novel starring Daniel Day-Lewis and Juliette Binoche, depicting the intoxicating artistic and intellectual freedom of the 1968 Prague Spring, shattered by the thunder of Soviet tanks rolling into Prague in August 1968. Recommended Watch Window: 00:00–02:26 (Full Trailer). Lesson Phase: Cinematic Starter Hook & The Crushing of the Prague Spring. Tone Alert: Passionate, evocative historical drama blending romance and political invasion.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the joyful intellectual, cultural, and sexual awakening of Prague in early 1968 ("Socialism with a Human Face"), followed by the violent arrival of Soviet Warsaw Pact tanks, camera lenses documenting the protests, and the crushing of civilian freedom. How does the film illustrate the profound emotional shock experienced by Czech citizens when their reformist dream was brutally extinguished by Soviet forces?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer contrasts the vibrant creative blossoming of Prague under Alexander Dubček with the bleak grey brutality of Soviet military intervention. It captures the psychological trauma of an entire generation: young Czechs fighting tanks with cameras, slogans, and flowers, only to face blacklisting, exile, and decades of stifling censorship under Soviet \'normalisation\'.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ps0cS6U3mUw',
      title: 'CNN Cold War Episode 14: Red Spring (1968) | Jeremy Isaacs Production',
      duration: '46 mins 26 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Landmark documentary chronicling Alexander Dubček’s Action Programme ("Socialism with a Human Face"), the abolition of censorship, Soviet anxieties over the "domino effect" in Poland and East Germany, Operation Danube (500,000 Warsaw Pact troops invading Czechoslovakia), and the formulation of the Brezhnev Doctrine. Recommended Watch Window: 18:30–31:00 • Lesson Phase: Guided Instruction & Ideological Heterodoxy. Tone Alert: Exceptional documentary featuring interviews with Alexander Dubček, Czech student protesters, and Soviet military commanders.',
      viewing_task:
        '<ol><li><strong>[07:40] Recall:</strong> What famous phrase did Alexander Dubček use to describe his vision of reformed, democratic communism in Czechoslovakia during the 1968 Prague Spring?</li><li><strong>[22:15] Explain:</strong> Explain why Leonid Brezhnev and other Warsaw Pact leaders (like East Germany\'s Walter Ulbricht) feared that Czech freedom of speech and press would destroy the entire Soviet bloc.</li><li><strong>[35:40] Challenge:</strong> Evaluate the ideological significance of the <em>Brezhnev Doctrine</em> issued in November 1968: how did it redefine the sovereignty of Eastern European nations and justify military aggression within the socialist camp?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> "Socialism with a Human Face" (<em>Socialismus s lidskou tváří</em>).</li><li><strong>Explain:</strong> Dubček abolished state press censorship, allowing newspapers and television to expose Communist Party corruption, criticise the police, and debate democratic ideas. Brezhnev and Ulbricht feared that if Czechoslovakia opened its border to the West and allowed multi-party democracy, it would inevitably leave the Warsaw Pact, triggering a domino effect of anti-communist revolutions across Poland, Hungary, and East Germany.</li><li><strong>Challenge:</strong> The Brezhnev Doctrine proclaimed that the sovereignty of individual socialist states was limited by their collective duty to protect the communist system. It declared that when forces hostile to socialism attempt to turn any socialist country toward capitalism, it becomes not only a problem for that country, but the common concern of all socialist countries, legally justifying Soviet military invasion to crush domestic reform. This permanently alienated Western communist parties and proved that Soviet control over Eastern Europe rested entirely on raw military coercion.</li></ol>',
    },
  ],

  lesson_6: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=A9fQPzZ1-hg',
      title: 'The Rise and Fall of the Berlin Wall | TED-Ed',
      duration: '6 mins 26 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Konrad H. Jarausch explores the construction of the Berlin Wall in August 1961 to stem the brain drain of 2.7 million East Germans, and its dramatic opening on 9 November 1989. Recommended Watch Window: 00:30–04:45 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated educational summary of Cold War division and popular uprising.',
      viewing_task:
        '<ol><li><strong>[01:10] Quick Check:</strong> Why did East German leader Walter Ulbricht and Nikita Khrushchev order the construction of the Berlin Wall in August 1961?</li><li><strong>[03:40] Hinge Question:</strong> How did Günter Schabowski\'s botched live press conference on the evening of 9 November 1989 accidentally trigger the immediate, euphoric fall of the Berlin Wall?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> To halt the catastrophic "brain drain" of over 2.7 million skilled young East German workers, doctors, engineers, and intellectuals who were fleeing into democratic, prosperous West Berlin each year.</li><li><strong>Hinge Question:</strong> Schabowski was handed an unvetted bureaucratic note about relaxing travel visas. When an Italian journalist asked when the new rules took effect, an unprepared Schabowski fumbled his notes and replied: "As far as I know, it takes effect immediately, without delay." Millions watched live on television; tens of thousands of East Berliners instantly converged on the checkpoints. Outnumbered border guards received no orders and stood down, opening the gates to history.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=femvIHkVQG8',
      title: 'Perestroika & Glasnost (The End of the Soviet Union) | Simple History',
      duration: '8 mins 58 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Analyzes Mikhail Gorbachev’s twin policies of Glasnost (political openness) and Perestroika (economic restructuring), the renunciation of the Brezhnev Doctrine, and the dissolution of the USSR on 25 December 1991. Recommended Watch Window: 01:00–06:45 • Lesson Phase: Guided Instruction & Archival Investigation. Tone Alert: Clear, structured animated overview of Soviet political and economic collapse.',
      viewing_task:
        '<ol><li><strong>[02:10] Recall:</strong> Define the Russian terms <em>Glasnost</em> and <em>Perestroika</em> introduced by General Secretary Mikhail Gorbachev after coming to power in 1985.</li><li><strong>[04:30] Explain:</strong> Explain how Gorbachev\'s decision to abandon the Brezhnev Doctrine (the "Sinatra Doctrine") led directly to the peaceful overthrow of communist dictatorships across Eastern Europe in 1989.</li><li><strong>[06:15] Challenge:</strong> Evaluate why Gorbachev\'s attempts to save the Soviet Union ended in its total dissolution: did economic failure or ethnic nationalism destroy the USSR?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> <em>Glasnost</em> meant "openness" (freedom of speech, press, and intellectual critique of state corruption); <em>Perestroika</em> meant "restructuring" (introducing limited private enterprise and decentralizing the command economy).</li><li><strong>Explain:</strong> The Brezhnev Doctrine stated that Soviet tanks would invade any socialist country whose regime was threatened (as in Hungary 1956 and Czechoslovakia 1968). Gorbachev informed Warsaw Pact leaders that the Red Army would never intervene to keep them in power (allowing them to do it "their way"). Without the threat of Soviet military terror, populations in Poland (Solidarity), East Germany, Czechoslovakia (Velvet Revolution), and Hungary deposed their communist rulers in months.</li><li><strong>Challenge:</strong> Both factors were intrinsically linked. Perestroika dismantled central planning without establishing functional free markets, triggering rationing, inflation, and acute food shortages that exhausted popular patience. Simultaneously, Glasnost allowed the fifteen constituent Soviet Republics (led by the Baltic states and Ukraine) to air historical grievances against Soviet imperial domination. When a hardline KGB coup against Gorbachev failed in August 1991, Russian President Boris Yeltsin outlawed the Communist Party, formally dissolving the USSR on 25 December 1991.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=G1mnSjjeC2o',
      title: "Charlie Wilson's War (2007, Mike Nichols / Tom Hanks) | Official Trailer",
      duration: '2 mins 31 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Sharp, witty Hollywood dramatisation of Texas Congressman Charlie Wilson, CIA operative Gust Avrakotos, and socialite Joanne Herring orchestrating Operation Cyclone: covertly funneling billions of dollars in Stinger surface-to-air missiles to Afghan Mujahideen fighting the Soviet Red Army. Recommended Watch Window: 00:00–02:31 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Covert Proxy Warfare. Tone Alert: Engaging geopolitical drama with an incisive look at covert Cold War operations.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the backroom Washington political deals, the sophisticated CIA weapons supply routes through Pakistan and Israel, and how shoulder-fired Stinger anti-aircraft missiles revolutionized the war in Afghanistan by destroying Soviet Mi-24 Hind attack helicopters. How does the film capture the unintended long-term consequences of superpower proxy warfare?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer showcases how Cold War covert operations were driven by high-stakes political maneuvering to inflict maximum damage on the USSR (\'give the Soviets their own Vietnam\'). By flooding Afghanistan with billions of dollars of high-tech weaponry and radicalizing Islamic fighters to defeat the Red Army, the US achieved its short-term goal of humiliating Moscow, but inadvertently sowed the seeds for modern international terrorism and decades of ongoing regional conflict.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fPirDX00xLk',
      title: 'CNN Cold War Episode 20: Soldiers of God (1977–1988) | Jeremy Isaacs Production',
      duration: '46 mins 32 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Comprehensive documentary detailing the December 1979 Soviet invasion of Afghanistan, the rise of the Mujahideen insurgency, the US boycott of the 1980 Moscow Olympics, President Carter\'s cancellation of grain sales, and the ten-year quagmire that bled the Soviet military of morale and treasure. Recommended Watch Window: 12:30–25:00 • Lesson Phase: Guided Instruction & The Afghan Trap. Tone Alert: Sobering military and diplomatic documentary featuring interviews with Zbigniew Brzezinski, Soviet veterans, and Mujahideen commanders.',
      viewing_task:
        '<ol><li><strong>[06:30] Recall:</strong> In what month and year did the Soviet Red Army invade Afghanistan to prop up the embattled Marxist government in Kabul?</li><li><strong>[18:15] Explain:</strong> How did President Jimmy Carter respond diplomatically and economically to the Soviet invasion of Afghanistan, effectively bringing the era of Détente to an abrupt end?</li><li><strong>[31:40] Challenge:</strong> Evaluate why Soviet leader Mikhail Gorbachev later described the Soviet-Afghan War as a "bleeding wound": how did the conflict contribute to the internal collapse of the USSR?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> December 1979.</li><li><strong>Explain:</strong> Carter condemned the invasion as the greatest threat to world peace since WWII. He withdrew the SALT II treaty from Senate ratification, placed an embargo on US grain and high-technology sales to the USSR, boycotted the 1980 Moscow Summer Olympic Games, and announced the "Carter Doctrine", stating the US would use military force to defend Persian Gulf oil fields.</li><li><strong>Challenge:</strong> Over 15,000 Soviet soldiers were killed and 50,000 wounded in a ten-year guerrilla war against an unseen mountain enemy. The war cost billions of rubles the stagnant Soviet economy could not afford, disproved the myth of Red Army invincibility, alienated the Muslim population of Soviet Central Asia, and produced thousands of traumatized, addicted veterans (\'Afghantsy\'). The failure discredited the Soviet military leadership and destroyed public confidence in the Communist regime.</li></ol>',
    },
  ],

  lesson_7: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=eLIF8w6QIdw',
      title: 'Cold War Files: The Conflicts That Turned the Cold War Hot | Dark Archives',
      duration: '4 mins 09 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Anchors the synoptic assessment debate: while Europe remained an "armed peace" without direct superpower combat, over 20 million people died in proxy wars across the Global South. Recommended Watch Window: 00:00–03:45 • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, analytical documentary examining the global human cost of superpower rivalry.',
      viewing_task:
        '<ol><li><strong>[00:50] Quick Check:</strong> Why do many global historians argue that calling the conflict the "Cold War" is inaccurate and Eurocentric?</li><li><strong>[02:30] Hinge Question:</strong> How did superpower rivalry in nations like Angola, Mozambique, Nicaragua, and Afghanistan transform local civil conflicts into devastating proxy battlefields?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> While direct war between the US and USSR in Europe was avoided, the superpowers armed and funded proxy wars across Asia, Africa, and Latin America that resulted in over 20 million deaths, making the war extraordinarily "hot" for the Global South.</li><li><strong>Hinge Question:</strong> Local political and tribal struggles were weaponized by the superpowers: the CIA and KGB flooded regional conflicts with sophisticated weapons (such as Stinger anti-aircraft missiles or Kalashnikov rifles), landmines, and cash to install puppet regimes, destroying civilian infrastructure, destabilizing entire regions, and causing decades of ongoing bloodshed long after the Cold War ended.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=49s1EHBzmFQ',
      title: 'When Did the Cold War Actually Start? | History Matters',
      duration: '9 mins 33 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Historiographical capstone analyzing the three major schools of thought on Cold War origins: 1917 (Bolshevik Revolution), 1945 (Yalta/Potsdam/Hiroshima), or 1947 (Truman Doctrine/Marshall Plan). Recommended Watch Window: 01:00–07:15 • Lesson Phase: Capstone Synoptic Synthesis & Historiographical Evaluation. Tone Alert: Insightful, academically rigorous historiographical review of Cold War scholarship.',
      viewing_task:
        '<ol><li><strong>[02:15] Recall:</strong> Identify the three major competing dates proposed by historians for the outbreak of the Cold War (1917, 1945, 1947).</li><li><strong>[04:30] Explain:</strong> Explain the Orthodox (traditionalist) vs. Revisionist historical debate regarding who bears primary responsibility for starting the Cold War.</li><li><strong>[06:45] Challenge:</strong> Post-Revisionist Historiography: Assess John Lewis Gaddis\' conclusion that the Cold War was caused by mutual misperception, geopolitical insecurity, and the inevitable clash of two empires rather than one-sided aggression.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> 1) 1917: The Bolshevik Revolution and Western intervention in the Russian Civil War; 2) 1945: The breakdown of the Grand Alliance at Potsdam and the atomic bombings of Japan; 3) 1947: The Truman Doctrine and Marshall Plan cementing containment.</li><li><strong>Explain:</strong> The Orthodox view (prominent in the 1950s) argued that Soviet expansionism and Stalin\'s aggressive violation of Yalta agreements in Eastern Europe forced the US to defend the free world. The Revisionist view (emerging in the 1960s during Vietnam) argued that American aggressive economic imperialism ("dollar diplomacy") and atomic intimidation forced the defensive, war-ravaged Soviet Union to build a protective buffer zone.</li><li><strong>Challenge:</strong> Post-revisionist historians like Gaddis, benefiting from opened Soviet archives after 1991, argue that neither side solely caused the conflict. Rather, the complete power vacuum left by the total destruction of Nazi Germany and Imperial Japan in 1945 made superpower rivalry structural and inevitable. Compounded by ideological dogma, conflicting postwar security needs, and mutual paranoia, both powers took defensive actions that were inevitably interpreted by the other as offensive aggression.</li></ol>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=n3_iLOp6IhM',
      title: 'The Lives of Others (2006, Florian Henckel von Donnersmarck) | Official Trailer',
      duration: '2 mins 18 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Academy Award-winning masterpiece portraying Stasi Captain Gerd Wiesler conducting round-the-clock audio surveillance on an East Berlin playwright in 1984, capturing the suffocating paranoia, informers, and police state control before the fall of the Wall. Recommended Watch Window: 00:00–02:18 (Full Trailer). Lesson Phase: Cinematic Starter Hook & The Reality of the Stasi Surveillance State. Tone Alert: Tense, emotionally profound German psychological thriller.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the tape recorders, wiretapped apartments, secret index cards, and pervasive fear of betrayal depicted in this Oscar-winning film about East Germany\'s Stasi. How does the trailer demonstrate the human cost of totalitarian surveillance, and why did millions of citizens rejoice when the Berlin Wall and the communist police state collapsed in November 1989?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer exposes how the East German regime relied on systematic paranoia, maintaining 100,000 Stasi officers and over 170,000 civilian informants to spy on neighbors, friends, and family. It contrasts this suffocating lack of personal privacy and creative expression with the human longing for truth and artistic integrity, explaining the explosion of civic joy when the border was finally breached.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7_IBXiiT82M',
      title: 'CNN Cold War Episode 23: The Wall Comes Down (1989) | Jeremy Isaacs Production',
      duration: '46 mins 32 secs',
      pathway: 'Documentary',
      teacher_guidance:
        'Dramatic documentary covering the miraculous events of 1989: the Polish Round Table talks, the opening of Hungary\'s Austrian border, the peaceful mass demonstrations in Leipzig, the collapse of the Berlin Wall on 9 November, and the Velvet Revolution in Prague. Recommended Watch Window: 26:00–38:00 • Lesson Phase: Guided Instruction & The Miracle of 1989. Tone Alert: Euphoric, historically monumental documentary featuring Mikhail Gorbachev, George H.W. Bush, Helmut Kohl, and ordinary Berliners at Checkpoint Charlie.',
      viewing_task:
        '<ol><li><strong>[11:20] Recall:</strong> In which Eastern European country did the trade union movement <em>Solidarity</em> (Solidarność), led by Lech Wałęsa, force free elections in June 1989, forming the first non-communist government in the Eastern bloc?</li><li><strong>[24:10] Explain:</strong> How did Hungary’s decision to dismantle its electrified barbed-wire border with neutral Austria in May 1989 create a massive breach in the Iron Curtain for East German refugees?</li><li><strong>[36:45] Challenge:</strong> Evaluate the personal leadership and chemistry between Ronald Reagan and Mikhail Gorbachev (from Geneva 1985 to Reykjavik 1986 and the 1987 INF Treaty): was the peaceful end of the Cold War driven by Western military pressure or Soviet internal reform?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Poland.</li><li><strong>Explain:</strong> When Hungary dismantled its border fence, tens of thousands of East German families vacationing in Hungary or Czechoslovakia simply drove across the open Hungarian border into Austria and on to West Germany. This triggered an uncontrollable migration wave, proving that East Germany\'s borders were obsolete and forcing the mass protests in Leipzig that culminated in the fall of the Wall.</li><li><strong>Challenge:</strong> Historians debate whether Reagan\'s military buildup (including SDI "Star Wars") forced a bankrupt USSR to surrender, or whether Gorbachev\'s moral conviction, rejection of violence, and desire to modernize socialism peacefully unlocked the impasse. In reality, both were vital: Gorbachev was willing to dismantle the Soviet empire rather than murder his own people, while Reagan and George H.W. Bush proved flexible enough to negotiate in good faith, signing the 1987 INF Treaty that eliminated an entire category of nuclear weapons without bloodshed.</li></ol>',
    },
  ],
};

async function applyColdWar4Tier() {
  const dataPath = path.join(ROOT_DIR, 'units', 'cold_war', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  unitData.lessons.forEach((l) => {
    if (coldWar4TierVideos[l.id]) {
      l.video = coldWar4TierVideos[l.id];
      delete l.extra_videos;
      console.log(`✅ Injected 4-Tier shelf (${l.video.length} videos) into ${l.id} (${l.title})`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/cold_war/data.js');

  // Copy to public/units/cold_war/data.js
  const publicUnitDir = path.join(ROOT_DIR, 'public', 'units', 'cold_war');
  if (!fs.existsSync(publicUnitDir)) fs.mkdirSync(publicUnitDir, { recursive: true });
  fs.writeFileSync(path.join(publicUnitDir, 'data.js'), fileContent, 'utf8');
  console.log('✅ Updated public/units/cold_war/data.js');

  // Sync to data/cold_war.json and public/data/cold_war.json
  const payload = { id: 'cold_war', data: unitData };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'data', 'cold_war.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(ROOT_DIR, 'public', 'data', 'cold_war.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  console.log('✅ Synced data/cold_war.json and public/data/cold_war.json');

  console.log('\nRebuilding database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('🎉 COLD WAR 4-TIER SHELF COMPLETED (28/28 VIDEOS ACTIVE)!');
}

applyColdWar4Tier().catch((err) => {
  console.error('❌ Error applying Cold War 4-tier videos:', err);
  process.exit(1);
});
