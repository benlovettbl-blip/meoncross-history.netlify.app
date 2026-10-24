const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('❄️ INJECTING THE COLD WAR (1945–1991) VIDEOS');
console.log('======================================================');

const coldWarVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TMYcLVDAeD4',
      title: "The Cold War: Ideological Differences | I'm Stuck GCSE History",
      duration: '5 mins 37 secs',
      teacher_guidance:
        'Direct contrast of the opposing ideological, political, and economic pillars of the USA and USSR: liberal democracy, free-market capitalism, and individual liberty versus Marxist-Leninist one-party dictatorship, state command economy, and collectivization.',
      viewing_task:
        'What were the fundamental economic and political differences between American Capitalism and Soviet Communism that made long-term cooperation impossible?',
      model_answer:
        'Economically, the United States operated a capitalist free-market economy based on private property, business competition, and individual profit, whereas the Soviet Union operated a state-controlled command economy where all industry, banks, and land were owned by the state. Politically, the US was a liberal democracy featuring multi-party elections, free speech, and constitutional civil liberties, whereas the USSR was a totalitarian one-party communist state led by the CPSU, where political dissent was suppressed by the secret police (NKVD/KGB) and media was strictly state-censored.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=y9HjvHZfCUI',
      title: 'USA vs USSR Fight! The Cold War | Crash Course World History #39',
      duration: '12 mins 16 secs',
      teacher_guidance:
        'John Green explains why the Cold War was defined by mutual ideological suspicion rather than direct superpower military engagement, introducing containment, nuclear deterrence, and superpower sphere-of-influence competition.',
      viewing_task:
        "Why did the ideological rivalry between the US and the USSR develop into a global 'Cold War' rather than a direct hot war between superpower armies?",
      model_answer:
        'Direct hot military conflict was prevented by the development of atomic and thermonuclear weapons, which created the condition of Mutually Assured Destruction (MAD)—the guarantee that any direct war between the US and USSR would result in the total nuclear annihilation of both nations. Instead, the superpowers competed through ideological propaganda, an escalating arms and space race, economic assistance programs (like the Marshall Plan and Comecon), and proxy wars in developing nations without US and Soviet troops firing directly on each other.',
    },
  ],
  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=GipaXw-QIa4',
      title: 'The Three Conferences: Superpower Relations | The History Teacher',
      duration: '6 mins 55 secs',
      teacher_guidance:
        "Tracks the dramatic shift in superpower relations between the February 1945 Yalta Conference and the July–August 1945 Potsdam Conference: the death of Roosevelt, the replacement of Churchill by Attlee, Truman's aggressive 'iron fist' diplomacy, and the revelation of the atomic bomb.",
      viewing_task:
        'How did leadership changes and the successful testing of the atomic bomb between February and July 1945 increase distrust between the US and the USSR at Potsdam?',
      model_answer:
        "At Yalta (February 1945), Roosevelt, Churchill, and Stalin maintained a pragmatic working relationship, agreeing to divide Germany into four zones and promising free elections in Eastern Europe. By Potsdam (July 1945), Roosevelt had died and was replaced by the fiercely anti-communist Harry S. Truman, while Clement Attlee replaced Churchill. Truman adopted a confrontational stance towards Stalin, demanding immediate Polish elections. Crucially, on the eve of the conference, the US successfully tested the first atomic bomb (the Trinity test); Truman informed Stalin of a 'new weapon of unusual destructive force', which Stalin interpreted as atomic blackmail, convincing the Soviets to accelerate their own nuclear program.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=v4NPeiB2Sl8',
      title: 'The Yalta Conference | History on Maps',
      duration: '5 mins 07 secs',
      teacher_guidance:
        'Visual breakdown of the geographical agreements reached by the Big Three at Yalta, focusing on the division of Germany and Berlin into four occupation zones and the conflicting interpretations of the Declaration on Liberated Europe.',
      viewing_task:
        'What specific agreements were reached at Yalta regarding the division and administration of post-war Germany and Berlin?',
      model_answer:
        "The Big Three agreed that defeated Germany would be disarmed, demilitarized, and partitioned into four temporary occupation zones administered by Britain, the United States, the Soviet Union, and France. Berlin, although located 100 miles deep inside the Soviet zone, was also divided into four sectors governed by an Allied Control Council. In addition, Germany was required to pay $20 billion in reparations (half going to the USSR), and Stalin agreed to enter the war against Japan within three months of Germany's surrender.",
    },
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=J1hxAhd-9hc',
      title: 'The Berlin Blockade and Airlift | The History Teacher',
      duration: '6 mins 45 secs',
      teacher_guidance:
        "Deconstructs the first major crisis of the Cold War: Western unification of zones (Bizonia/Trizonia) and introduction of the Deutsche Mark, provoking Stalin's land blockade of West Berlin, and the logistical triumph of the Anglo-American airlift (Operation Vittles).",
      viewing_task:
        'What triggered Stalin to impose the Berlin Blockade in June 1948, and how did the Western Allies defeat the blockade without triggering a military conflict?',
      model_answer:
        'Stalin imposed the blockade after the Western Allies merged their occupation zones (forming Trizonia) and introduced a stable new currency, the Deutsche Mark, into West Berlin without Soviet approval, threatening the East German economy. Stalin severed all road, rail, and canal routes into West Berlin to starve its 2.5 million citizens and force the Allies out. Instead of forcing a land corridor (which risked war), the US and Britain launched the Berlin Airlift (Operation Plainfare / Vittles), flying over 278,000 supply flights carrying 2.3 million tons of food, coal, and medicine over 11 months until Stalin lifted the blockade in May 1949.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=P8m0YZV-Vgk',
      title: 'History Brief: What was the Iron Curtain? | Reading Through History',
      duration: '2 mins 44 secs',
      teacher_guidance:
        "Examines Winston Churchill’s March 1946 'Sinews of Peace' speech in Fulton, Missouri, and how the metaphor of the 'Iron Curtain' crystallized the division of Europe into rival democratic and communist blocs.",
      viewing_task:
        "What did Winston Churchill mean when he declared in 1946 that 'an iron curtain has descended across the Continent'?",
      model_answer:
        "Churchill used the metaphor of an 'iron curtain' to describe the impenetrable political, military, and ideological barrier erected by the Soviet Union across Central and Eastern Europe, running from Stettin in the Baltic to Trieste in the Adriatic. Behind this curtain, ancient capitals (Warsaw, Berlin, Prague, Budapest, Bucharest, Sofia) were subjected to Soviet control, where communist satellite states were installed through rigged elections and secret police repression, permanently dividing post-war Europe into two hostile camps.",
    },
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=bwWW3sbk4EU',
      title: 'The history of the Cuban Missile Crisis | TED-Ed',
      duration: '4 mins 52 secs',
      teacher_guidance:
        'Matthew A. Jordan’s TED-Ed explainer investigates the October 1962 crisis, following U-2 spy plane reconnaissance photographs discovering Soviet medium-range ballistic missile (MRBM) launch pads in Cuba, 90 miles off the Florida coast.',
      viewing_task:
        'Why did Soviet Premier Nikita Khrushchev deploy nuclear missiles to Cuba in 1962, and what options did President Kennedy consider in response?',
      model_answer:
        "Khrushchev placed nuclear missiles in Cuba to protect Fidel Castro's communist regime from another US invasion after the failed 1961 Bay of Pigs attempt, and to close the strategic nuclear gap with the US, which had stationed nuclear Jupiter missiles on the Soviet border in Turkey. Kennedy's executive committee (ExComm) debated three options: launching surgical airstrikes against the missile sites, conducting a full-scale military invasion of Cuba, or imposing a naval blockade. Kennedy chose a naval blockade (termed a 'quarantine' to avoid an act of war under international law) to halt Soviet weapons ships while demanding the missiles' removal.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=XbKCyQn5oTc',
      title: 'The Cuban Missile Crisis (1962) | Simple History',
      duration: '4 mins 11 secs',
      teacher_guidance:
        'Chronicles the climax of the 13 Days: the shooting down of Major Rudolf Anderson’s U-2 plane, the DEFCON 2 alert, and the secret diplomatic settlement reached between Kennedy and Khrushchev through Robert Kennedy and Ambassador Dobrynin.',
      viewing_task:
        'What secret agreement finally resolved the Cuban Missile Crisis, and what long-term measures were introduced to prevent future nuclear brinkmanship?',
      model_answer:
        "The crisis was resolved through a public and private deal: Khrushchev agreed to dismantle and return all Soviet nuclear missiles in Cuba under UN inspection, in exchange for Kennedy's public pledge that the United States would never invade Cuba. Privately, Kennedy agreed to withdraw American Jupiter missiles from Turkey within six months. To prevent future misunderstandings, the superpowers established a direct 'hotline' teletype link between the White House and the Kremlin, and signed the 1963 Partial Nuclear Test Ban Treaty prohibiting nuclear tests in the atmosphere and underwater.",
    },
  ],
  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=yxaegqvl4aE',
      title: 'The Korean War (1950–53) | Simple History',
      duration: '4 mins 31 secs',
      teacher_guidance:
        'Explains the first hot proxy conflict of the Cold War: the June 1950 North Korean invasion across the 38th Parallel, UN/US intervention led by General Douglas MacArthur, the Inchon landing, Chinese intervention, and the 1953 armistice.',
      viewing_task:
        'Why did the United States intervene in the Korean War in 1950, and why did the conflict end in an armistice along the 38th Parallel?',
      model_answer:
        "The US intervened under the policy of 'containment' and the 'Domino Theory'—the belief that if South Korea fell to Kim Il-sung's Soviet-backed communist invasion, neighboring Asian nations (including Japan) would rapidly collapse to communism. Acting under a UN Security Council resolution, US and coalition forces pushed North Korean forces back to the Chinese border. However, Mao Zedong intervened with hundreds of thousands of Chinese 'People's Volunteers', driving UN forces back south. After two years of bloody trench warfare stalemate, an armistice was signed in July 1953 establishing a heavily fortified Demilitarized Zone (DMZ) along the 38th Parallel, leaving Korea divided as it remains today.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=CSq0NsklJTU',
      title: 'Vietnam War in 5 minutes | Secrets of the Past',
      duration: '5 mins 46 secs',
      teacher_guidance:
        'Examines the escalating US commitment in Vietnam from the 1964 Gulf of Tonkin incident through massive aerial bombing (Operation Rolling Thunder) and search-and-destroy missions, to Vietcong guerrilla tactics and the 1968 Tet Offensive.',
      viewing_task:
        'How did Vietcong guerrilla tactics neutralize superior American firepower and technology during the Vietnam War?',
      model_answer:
        "The Vietcong and North Vietnamese Army avoided open pitched battles where American artillery and air power were decisive, adopting guerrilla strategies: fighting close to US troops ('hanging onto the belts') to prevent airstrikes, relying on ambushes, booby traps (punji stakes, tripwire grenades), and an extensive subterranean tunnel network (such as at Cu Chi) for shelter and supply. Supported by local peasants and supplied via the Ho Chi Minh Trail through Laos and Cambodia, the Vietcong fought a war of attrition that exhausted American troops and eroded public support on the US home front.",
    },
  ],
  lesson_6: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=A9fQPzZ1-hg',
      title: 'The rise and fall of the Berlin Wall | TED-Ed',
      duration: '6 mins 26 secs',
      teacher_guidance:
        'Konrad H. Jarausch explores the construction of the Berlin Wall in August 1961 to stem the brain drain of 2.7 million East Germans, and its dramatic opening on 9 November 1989 following Günter Schabowski’s botched press conference.',
      viewing_task:
        'Why was the Berlin Wall originally erected in 1961, and what chain of events led to its sudden opening on 9 November 1989?',
      model_answer:
        "East Germany built the Berlin Wall in August 1961 to halt the crippling economic exodus of over 2.7 million skilled workers, teachers, and professionals fleeing to democratic West Berlin. By late 1989, Mikhail Gorbachev's reforms and the opening of Hungary's border sparked mass pro-democracy protests across East Germany. On the evening of 9 November 1989, East German spokesman Günter Schabowski mistakenly announced in a live press conference that new travel regulations allowing border crossings were effective 'immediately, without delay'. Tens of thousands of East Berliners rushed the checkpoints, overwhelmed bewildered border guards, and breached the Wall, triggering the collapse of communist rule across Eastern Europe.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=femvIHkVQG8',
      title: 'Perestroika & Glasnost (The End of the Soviet Union) | Simple History',
      duration: '8 mins 58 secs',
      teacher_guidance:
        'Analyzes Mikhail Gorbachev’s twin policies of Glasnost (political openness) and Perestroika (economic restructuring), and how loosening totalitarian controls combined with economic shortages to dissolve the USSR in December 1991.',
      viewing_task:
        "How did Mikhail Gorbachev's policies of Glasnost and Perestroika inadvertently lead to the dissolution of the Soviet Union?",
      model_answer:
        "Gorbachev introduced 'Perestroika' (economic restructuring to allow limited private trade) and 'Glasnost' (openness, allowing free speech and criticism of state corruption) to revitalize a stagnant Soviet economy exhausted by military spending. However, Perestroika caused severe food shortages and inflation, while Glasnost allowed long-suppressed nationalist movements in the 15 Soviet Republics (such as the Baltic states, Ukraine, and Georgia) to demand full independence. By renouncing the Brezhnev Doctrine (refusing to send Soviet tanks to crush anti-communist movements in Eastern Europe), Gorbachev removed the threat of military force that held the empire together, leading to the resignation of Gorbachev and the official dissolution of the USSR on 25 December 1991.",
    },
  ],
  lesson_7: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=eLIF8w6QIdw',
      title:
        'Cold War Files Ep.3 — Proxy Wars: The Conflicts That Turned the Cold War Hot | Dark Archives',
      duration: '4 mins 09 secs',
      teacher_guidance:
        "Use this video to anchor the synoptic assessment debate: while Europe experienced an 'armed peace' without direct superpower combat, millions of civilians and soldiers died in brutal proxy conflicts across Korea, Vietnam, Angola, Nicaragua, and Afghanistan.",
      viewing_task:
        "Why do many global historians reject the term 'Cold War', pointing to conflicts across Asia, Africa, and Latin America?",
      model_answer:
        "Historians argue that describing the era as 'cold' reflects a privileged Eurocentric perspective: while the superpowers never clashed directly in Europe, they fought lethal proxy wars across the Global South that caused over 20 million deaths. In conflicts such as the Korean War (over 3 million dead), the Vietnam War (over 2 million dead), the Angolan Civil War, and the Soviet invasion of Afghanistan, the US and USSR supplied advanced weaponry, military advisors, and funding to rival factions, turning local political struggles into catastrophic ideological battlegrounds.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=49s1EHBzmFQ',
      title: 'When did the Cold War actually start? | History Matters',
      duration: '9 mins 33 secs',
      teacher_guidance:
        'An insightful historiographical review examining whether the Cold War began in 1917 (the Bolshevik Revolution), 1945 (Yalta/Potsdam/Hiroshima), or 1947 (Truman Doctrine). Frame this as the core analytical skill for pupils answering the capstone synoptic assessment question.',
      viewing_task:
        'What different historical dates do historians propose for the beginning of the Cold War, and what arguments support each viewpoint?',
      model_answer:
        "Some historians trace the origins back to the 1917 Bolshevik Revolution and the subsequent Russian Civil War, when Western powers sent troops to crush Lenin's communist regime, establishing ideological hostility. Others argue the Cold War began in 1945 with the collapse of Nazi Germany and the nuclear bombings of Hiroshima and Nagasaki, which destroyed the common enemy that bound the Grand Alliance. A third school of thought dates the start to 1947 with the announcement of the Truman Doctrine and the Marshall Plan, which formally committed the US to active global containment against Soviet expansionism.",
    },
  ],
};

async function run() {
  const dataPath = path.join(ROOT_DIR, 'units', 'cold_war', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  unitData.lessons.forEach((l, idx) => {
    const lId = l.id || `lesson_${idx + 1}`;
    l.id = lId; // Ensure explicit lesson ID
    if (coldWarVideos[lId]) {
      l.video = coldWarVideos[lId];
      console.log(`✅ Injected ${l.video.length} videos into ${lId} (${l.title})`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/cold_war/data.js');

  // Sync to public/data and data
  const payload = { id: 'cold_war', data: unitData };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'public', 'data', 'cold_war.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(ROOT_DIR, 'data', 'cold_war.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  console.log('✅ Synced public/data/cold_war.json and data/cold_war.json');

  // Rebuild global database
  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('✅ public/database.json successfully recompiled.');

  console.log('\n🎉 ALL 7 LESSONS IN THE COLD WAR INJECTED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('❌ Error injecting videos:', err);
  process.exit(1);
});
