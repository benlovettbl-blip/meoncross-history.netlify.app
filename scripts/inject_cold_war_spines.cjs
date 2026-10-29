const fs = require('fs');

const COLD_WAR_SPINES = [
  // Lesson 1: Ideological Clash
  {
    title: 'The Ideological Divide: Capitalism vs Communism',
    subtitle: '5-Stage Causal Inquiry Framework',
    stages: [
      {
        step: 1,
        date: '1917–1924',
        para_ref: '[1.1–1.2]',
        title: 'Incompatible Economic Visions',
        actor: 'Karl Marx, Vladimir Lenin & Adam Smith',
        tag: '💰 ECONOMIC DIVERGENCE',
        trigger:
          'Bolsheviks nationalised all private enterprise and land, abolishing market capitalism in favor of state-controlled command socialism.',
        desc: 'Bolsheviks nationalised all private enterprise and land, abolishing market capitalism in favor of state-controlled command socialism.',
        connective:
          'Created fundamentally irreconcilable economic models where Western private property directly conflicted with Marxist world revolution.',
        question:
          'Why were Western market capitalism and Soviet command socialism fundamentally incompatible?',
      },
      {
        step: 2,
        date: '1920s–1930s',
        para_ref: '[2.1–2.2]',
        title: 'Democracy vs Bolshevik Autocracy',
        actor: 'Soviet Politburo & Western Democracies',
        tag: '🗳️ POLITICAL CONFLICT',
        trigger:
          'Lenin and Stalin suppressed all multi-party political opposition, establishing a one-party totalitarian police state with secret police terror.',
        desc: 'Lenin and Stalin suppressed all multi-party political opposition, establishing a one-party totalitarian police state with secret police terror.',
        connective:
          'Convinced Western leaders that the Soviet Union was an expansionist autocracy inherently hostile to individual democratic freedoms.',
        question:
          'How did the Soviet one-party state convince Western nations that peaceful political coexistence was impossible?',
      },
      {
        step: 3,
        date: '1918–1939',
        para_ref: '[3.1–3.2]',
        title: 'Historical Grievances & Pre-War Mistrust',
        actor: 'Allied Interveners & Nazi-Soviet Negotiators',
        tag: '⚔️ INTERVENTION & BETRAYAL',
        trigger:
          'Western military intervention in the Russian Civil War (1918) and the Nazi-Soviet Pact (1939) created deep mutual suspicion between Moscow and the West.',
        desc: 'Western military intervention in the Russian Civil War (1918) and the Nazi-Soviet Pact (1939) created deep mutual suspicion between Moscow and the West.',
        connective:
          'Entrenched long-term paranoia in Moscow about Western encirclement and Western fears of Soviet duplicity.',
        question:
          'Why did pre-Second World War events entrench deep psychological mistrust between Britain, the US, and the USSR?',
      },
      {
        step: 4,
        date: 'July–Aug 1945',
        para_ref: '[4.1–4.2]',
        title: 'The US Nuclear Monopoly',
        actor: 'President Harry S. Truman & Manhattan Project',
        tag: '☢️ ATOMIC HEGEMONY',
        trigger:
          'The United States successfully detonated the atomic bomb at Alamogordo and Hiroshima, establishing an immediate monopoly on nuclear destruction.',
        desc: 'The United States successfully detonated the atomic bomb at Alamogordo and Hiroshima, establishing an immediate monopoly on nuclear destruction.',
        connective:
          "Forced the USSR to accelerate its crash atomic program and deepened Stalin's determination to maintain a physical buffer zone in Eastern Europe.",
        question:
          'How did the American atomic monopoly alter the strategic power balance at the end of the Second World War?',
      },
      {
        step: 5,
        date: '1945–1946',
        para_ref: '[5.1–5.2]',
        title: 'The European Power Vacuum',
        actor: 'Red Army & Western Allies',
        tag: '🗺️ POST-WAR POWER VACUUM',
        trigger:
          'The total destruction of Nazi Germany left a political vacuum in Central Europe, with Soviet and Western armies facing each other across the continent.',
        desc: 'The total destruction of Nazi Germany left a political vacuum in Central Europe, with Soviet and Western armies facing each other across the continent.',
        connective:
          'Transformed two former wartime allies into immediate global rivals competing for dominance over ruined European nations.',
        question:
          'Why did the defeat of Nazi Germany inevitably bring the US and USSR into direct geopolitical rivalry?',
      },
    ],
  },

  // Lesson 2: Yalta to Potsdam (1945)
  {
    title: 'From Alliance to Rivalry: Yalta and Potsdam (1945)',
    subtitle: '5-Stage Causal Inquiry Framework',
    stages: [
      {
        step: 1,
        date: 'Feb 1945',
        para_ref: '[1.1–1.2]',
        title: 'The Yalta Summit & Fragile Consensus',
        actor: 'Roosevelt, Churchill & Stalin',
        tag: '🤝 YALTA DIPLOMATIC COMPROMISE',
        trigger:
          'The Big Three agreed to divide Germany and Berlin into four occupation zones and establish the United Nations Organisation.',
        desc: 'The Big Three agreed to divide Germany and Berlin into four occupation zones and establish the United Nations Organisation.',
        connective:
          'Masked fundamental disagreements over the post-war governance of Eastern Europe behind ambiguous diplomatic language.',
        question:
          'How did ambiguous agreements at Yalta conceal fundamental disagreements between the Big Three?',
      },
      {
        step: 2,
        date: 'Feb–Mar 1945',
        para_ref: '[2.1–2.2]',
        title: 'The Polish Question & Liberated Europe',
        actor: 'London Poles vs Lublin Poles & Stalin',
        tag: '🇵🇱 POLISH SOVEREIGNTY CRISIS',
        trigger:
          "Stalin insisted on shifting Poland's borders westward and backing the pro-Soviet Lublin government rather than democratic elections.",
        desc: "Stalin insisted on shifting Poland's borders westward and backing the pro-Soviet Lublin government rather than democratic elections.",
        connective:
          "Directly violated the Declaration on Liberated Europe and alerted Churchill and Roosevelt to Stalin's intention to establish a satellite sphere.",
        question:
          'Why did the fate of post-war Poland become the primary catalyst for Allied breakdown?',
      },
      {
        step: 3,
        date: 'July 1945',
        para_ref: '[3.1–3.2]',
        title: 'Potsdam Leadership Transition',
        actor: 'Harry S. Truman, Clement Attlee & Joseph Stalin',
        tag: '🔄 LEADERSHIP REPLACEMENT',
        trigger:
          'Roosevelt died and Churchill was replaced mid-conference by Clement Attlee, leaving an inexperienced and aggressive President Truman confronting Stalin.',
        desc: 'Roosevelt died and Churchill was replaced mid-conference by Clement Attlee, leaving an inexperienced and aggressive President Truman confronting Stalin.',
        connective:
          "Replaced Roosevelt's personal relationship with Stalin with Truman's blunt, confrontational diplomatic approach.",
        question:
          'How did changes in leadership between Yalta and Potsdam accelerate Cold War tensions?',
      },
      {
        step: 4,
        date: 'July 1945',
        para_ref: '[4.1–4.2]',
        title: 'The Trinity Test & Atomic Leverage',
        actor: 'President Truman & Premier Stalin',
        tag: '💣 ATOMIC DIPLOMATIC LEVERAGE',
        trigger:
          'Truman received confirmation of the Trinity atomic detonation and casually informed Stalin at Potsdam to intimidate Soviet negotiators.',
        desc: 'Truman received confirmation of the Trinity atomic detonation and casually informed Stalin at Potsdam to intimidate Soviet negotiators.',
        connective:
          'Convinced Stalin that the Americans intended to use atomic blackmail to dictate terms in Europe, hardening Soviet intransigence.',
        question:
          "Why did Truman's disclosure of the atomic bomb at Potsdam increase Soviet suspicion rather than compliance?",
      },
      {
        step: 5,
        date: 'Aug 1945',
        para_ref: '[5.1–5.2]',
        title: 'German Reparations & Division',
        actor: 'Allied Control Council & Four Powers',
        tag: '🇩🇪 GERMAN ECONOMIC PARTITION',
        trigger:
          'The Allies agreed each power would extract reparations primarily from its own zone, with the USSR receiving industrial equipment from the West.',
        desc: 'The Allies agreed each power would extract reparations primarily from its own zone, with the USSR receiving industrial equipment from the West.',
        connective:
          'Effectively sealed the economic partition of Germany into Western capitalist and Eastern Soviet communist spheres.',
        question:
          'How did reparations agreements at Potsdam lay the foundation for the permanent division of Germany?',
      },
    ],
  },

  // Lesson 3: The Iron Curtain & The Berlin Blockade (1948–1949)
  {
    title: 'The Iron Curtain and the Berlin Crisis (1946–1949)',
    subtitle: '5-Stage Causal Inquiry Framework',
    stages: [
      {
        step: 1,
        date: 'March 1946',
        para_ref: '[1.1–1.2]',
        title: "Churchill's Fulton 'Iron Curtain' Address",
        actor: 'Winston Churchill & Harry Truman',
        tag: '🎙️ IRON CURTAIN DECLARATION',
        trigger:
          "Churchill delivered his 'Sinews of Peace' speech at Westminster College, declaring that an iron curtain had descended across the European continent.",
        desc: "Churchill delivered his 'Sinews of Peace' speech at Westminster College, declaring that an iron curtain had descended across the European continent.",
        connective:
          'Galvanised Western public opinion and publicly defined the Cold War confrontation between democratic freedoms and Soviet tyranny.',
        question:
          "Why did Churchill's 'Iron Curtain' speech mark a decisive turning point in Western public perceptions of the USSR?",
      },
      {
        step: 2,
        date: '1947',
        para_ref: '[2.1–2.2]',
        title: 'Truman Doctrine & Marshall Aid',
        actor: 'President Truman & George C. Marshall',
        tag: '🛡️ CONTAINMENT DOCTRINE',
        trigger:
          'Truman pledged military assistance to Greece and Turkey, and Marshall announced $13 billion in European Recovery Programme economic aid.',
        desc: 'Truman pledged military assistance to Greece and Turkey, and Marshall announced $13 billion in European Recovery Programme economic aid.',
        connective:
          'Committed the United States to active global containment of communism, binding Western European economies to American capitalism.',
        question:
          'How did the Truman Doctrine and Marshall Plan operationalize the strategy of containment?',
      },
      {
        step: 3,
        date: '1947–1948',
        para_ref: '[3.1–3.2]',
        title: 'Soviet Salami Tactics & Cominform',
        actor: 'Joseph Stalin & Andrei Zhdanov',
        tag: '🥩 SATELLITE CONSOLIDATION',
        trigger:
          'The USSR established Cominform, engineered the communist coup in Czechoslovakia, and eliminated non-communist parties across Eastern Europe.',
        desc: 'The USSR established Cominform, engineered the communist coup in Czechoslovakia, and eliminated non-communist parties across Eastern Europe.',
        connective:
          'Consolidated a monolithic Soviet satellite empire, eliminating democratic opposition and deepening Western fears of westward expansion.',
        question:
          "Why did Soviet 'salami tactics' in Eastern Europe convince Western powers that diplomatic negotiation had failed?",
      },
      {
        step: 4,
        date: '1948–1949',
        para_ref: '[4.1–4.2]',
        title: 'The Berlin Blockade & Allied Airlift',
        actor: 'General Lucius Clay & Ernest Bevin',
        tag: '✈️ OPERATION VITTLES AIRLIFT',
        trigger:
          'Following the introduction of the Deutschmark in western zones, Stalin cut all rail, road, and canal access to West Berlin; the Allies launched Operation Vittles.',
        desc: 'Following the introduction of the Deutschmark in western zones, Stalin cut all rail, road, and canal access to West Berlin; the Allies launched Operation Vittles.',
        connective:
          'Defeated the blockade without firing a shot through 278,000 flights delivering 2.3 million tons of supplies, humiliating Soviet prestige.',
        question:
          'How did the Berlin Airlift transform former German enemies into frontline Western allies?',
      },
      {
        step: 5,
        date: '1949–1955',
        para_ref: '[5.1–5.2]',
        title: 'Permanent Partition: NATO vs Warsaw Pact',
        actor: 'Western Alliance & Soviet Bloc',
        tag: '🛡️ MILITARY BLOC FORMATION',
        trigger:
          'The Federal Republic of Germany (FRG) and German Democratic Republic (GDR) were founded in 1949; NATO formed in 1949 and the Warsaw Pact in 1955.',
        desc: 'The Federal Republic of Germany (FRG) and German Democratic Republic (GDR) were founded in 1949; NATO formed in 1949 and the Warsaw Pact in 1955.',
        connective:
          'Institutionalised the military and geopolitical partition of Europe into two armed camps bound by collective defence treaties.',
        question:
          'Why did the Berlin Crisis result in the formal military and political partition of Europe?',
      },
    ],
  },

  // Lesson 4: Nuclear Brinkmanship: The Cuban Missile Crisis (1962)
  {
    title: 'Nuclear Brinkmanship: The Cuban Missile Crisis (1962)',
    subtitle: '5-Stage Causal Inquiry Framework',
    stages: [
      {
        step: 1,
        date: '1959–1961',
        para_ref: '[1.1–1.2]',
        title: 'Cuban Revolution & Bay of Pigs Disaster',
        actor: 'Fidel Castro, CIA & John F. Kennedy',
        tag: '🇨🇺 REVOLUTION & INVASION FAILURE',
        trigger:
          'Castro overthrew Batista, nationalised American assets, and defeated the CIA-backed Bay of Pigs invasion, driving Cuba into military alliance with Moscow.',
        desc: 'Castro overthrew Batista, nationalised American assets, and defeated the CIA-backed Bay of Pigs invasion, driving Cuba into military alliance with Moscow.',
        connective:
          'Provided Khrushchev with a strategic Caribbean ally and a pretext to station offensive nuclear missiles 90 miles from the Florida coast.',
        question:
          'How did the failed Bay of Pigs invasion push revolutionary Cuba into Soviet military dependence?',
      },
      {
        step: 2,
        date: '14–16 Oct 1962',
        para_ref: '[2.1–2.2]',
        title: 'U-2 Discovery of Operation Anadyr',
        actor: 'Major Richard Heyser & ExComm',
        tag: '📸 U-2 RECONNAISSANCE DISCOVERY',
        trigger:
          'A USAF U-2 spy plane photographed Soviet medium-range R-12 ballistic missile launch sites under construction at San Cristóbal in western Cuba.',
        desc: 'A USAF U-2 spy plane photographed Soviet medium-range R-12 ballistic missile launch sites under construction at San Cristóbal in western Cuba.',
        connective:
          'Shattered American strategic security, presenting Kennedy with proof of Soviet nuclear deployment within range of most US cities.',
        question:
          'Why did the photographic discovery of Soviet missile sites in Cuba trigger an immediate national security emergency?',
      },
      {
        step: 3,
        date: '22–24 Oct 1962',
        para_ref: '[3.1–3.2]',
        title: 'The Naval Quarantine & DEFCON 2',
        actor: 'President Kennedy & US Navy',
        tag: '⚓ NAVAL QUARANTINE ESCALATION',
        trigger:
          "Rejecting air strikes, Kennedy announced a naval 'quarantine' of Cuba and raised US strategic bomber forces to DEFCON 2 for the only time in history.",
        desc: "Rejecting air strikes, Kennedy announced a naval 'quarantine' of Cuba and raised US strategic bomber forces to DEFCON 2 for the only time in history.",
        connective:
          'Brought superpower navies into direct standoff on the high seas, pushing the world to the precipice of thermonuclear war.',
        question:
          "How did Kennedy's choice of a naval quarantine balance military firmness with diplomatic room for de-escalation?",
      },
      {
        step: 4,
        date: '26–27 Oct 1962',
        para_ref: '[4.1–4.2]',
        title: 'Black Saturday & Secret Diplomacy',
        actor: 'Robert Kennedy & Ambassador Anatoly Dobrynin',
        tag: '⚡ BLACK SATURDAY CRISIS PEAK',
        trigger:
          "A U-2 was shot down over Cuba, and Kennedy secretly accepted Khrushchev's terms: USSR removes missiles; US pledges not to invade Cuba and removes missiles from Turkey.",
        desc: "A U-2 was shot down over Cuba, and Kennedy secretly accepted Khrushchev's terms: USSR removes missiles; US pledges not to invade Cuba and removes missiles from Turkey.",
        connective:
          'Averted catastrophic nuclear exchange through back-channel diplomacy that saved face for both superpower leaders.',
        question:
          'Why was back-channel compromise over missiles in Turkey essential to resolving the crisis?',
      },
      {
        step: 5,
        date: '1963',
        para_ref: '[5.1–5.2]',
        title: 'Détente Precedents: Hotline & Test Ban',
        actor: 'Superpower Leadership & UN',
        tag: '🕊️ CRISIS AFTERMATH & ACCORDS',
        trigger:
          'Recognising how close they had come to mutual destruction, Washington and Moscow established the Moscow-Washington hotline and signed the 1963 Partial Test Ban Treaty.',
        desc: 'Recognising how close they had come to mutual destruction, Washington and Moscow established the Moscow-Washington hotline and signed the 1963 Partial Test Ban Treaty.',
        connective:
          'Initiated the first institutional mechanisms of nuclear arms control and established the foundations for superpower détente.',
        question:
          'How did the Cuban Missile Crisis convince both superpowers to establish institutional arms control mechanisms?',
      },
    ],
  },

  // Lesson 5: Proxy Wars: Korea & Vietnam
  {
    title: 'The Cold War in Asia: Proxy Conflicts in Korea and Vietnam',
    subtitle: '5-Stage Causal Inquiry Framework',
    stages: [
      {
        step: 1,
        date: '1949–1950',
        para_ref: '[1.1–1.2]',
        title: 'Asian Cold War & NSC-68',
        actor: 'Mao Zedong & Paul Nitze',
        tag: '🇨🇳 COMMUNIST EXPANSION IN ASIA',
        trigger:
          "The Chinese Communist Revolution (1949) and NSC-68 committed the US to militarised containment and the 'Domino Theory' across the Asian continent.",
        desc: "The Chinese Communist Revolution (1949) and NSC-68 committed the US to militarised containment and the 'Domino Theory' across the Asian continent.",
        connective:
          'Shifted the Cold War focus from European diplomatic stalemate to armed military intervention in post-colonial Asian proxy conflicts.',
        question: 'Why did the 1949 Chinese Revolution expand the Cold War from Europe into Asia?',
      },
      {
        step: 2,
        date: '1950–1953',
        para_ref: '[2.1–2.2]',
        title: 'The Korean War Seesaw',
        actor: 'Kim Il-sung, General MacArthur & Chinese Volunteers',
        tag: '🇰🇷 KOREAN WAR INTERVENTION',
        trigger:
          'North Korea invaded the South; US-led UN forces counter-attacked at Inchon, triggering massive Chinese intervention and a bloody stalemate at the 38th Parallel.',
        desc: 'North Korea invaded the South; US-led UN forces counter-attacked at Inchon, triggering massive Chinese intervention and a bloody stalemate at the 38th Parallel.',
        connective:
          'Demonstrated that limited proxy war could result in immense devastation (3 million dead) without altering pre-war territorial borders.',
        question:
          'How did the Korean War demonstrate the limits and dangers of superpower proxy conflict?',
      },
      {
        step: 3,
        date: '1954–1964',
        para_ref: '[3.1–3.2]',
        title: 'Indochina Escalation: Geneva to Tonkin',
        actor: 'Ho Chi Minh, Ngo Dinh Diem & Lyndon B. Johnson',
        tag: '🇻🇳 VIETNAM ESCALATION CHAIN',
        trigger:
          'French defeat at Dien Bien Phu (1954) divided Vietnam; the 1964 Gulf of Tonkin Resolution authorised massive US direct combat escalation.',
        desc: 'French defeat at Dien Bien Phu (1954) divided Vietnam; the 1964 Gulf of Tonkin Resolution authorised massive US direct combat escalation.',
        connective:
          'Transformed an anti-colonial civil war into the most protracted, destructive American military deployment of the Cold War.',
        question:
          'Why did the Gulf of Tonkin Resolution transform American involvement in Vietnam into a full-scale ground war?',
      },
      {
        step: 4,
        date: '1965–1968',
        para_ref: '[4.1–4.2]',
        title: 'Asymmetric Warfare & The Tet Turning Point',
        actor: 'Vietcong / NVA & US Military Command',
        tag: '💥 GUERRILLA WARFARE & TET OFFENSIVE',
        trigger:
          'Vietcong utilised Cu Chi tunnels, booby traps, and the Ho Chi Minh Trail, culminating in the nationwide January 1968 Tet Offensive.',
        desc: 'Vietcong utilised Cu Chi tunnels, booby traps, and the Ho Chi Minh Trail, culminating in the nationwide January 1968 Tet Offensive.',
        connective:
          'Exposed the failure of massive American firepower to defeat guerrilla resistance, shattering US domestic political support for the war.',
        question:
          'How did Vietcong guerrilla tactics neutralize superior American technological and aerial firepower?',
      },
      {
        step: 5,
        date: '1973–1975',
        para_ref: '[5.1–5.2]',
        title: 'US Withdrawal & Fall of Saigon',
        actor: 'Richard Nixon, Henry Kissinger & North Vietnamese Army',
        tag: '🏳️ SAIGON COLLAPSE & VIETNAM SYNDROME',
        trigger:
          'The 1973 Paris Peace Accords completed US combat troop withdrawal; in April 1975, communist forces captured Saigon, reunifying Vietnam.',
        desc: 'The 1973 Paris Peace Accords completed US combat troop withdrawal; in April 1975, communist forces captured Saigon, reunifying Vietnam.',
        connective:
          "Inflicted the first strategic defeat on the United States, creating the 'Vietnam Syndrome' and restricting direct US military overseas interventions.",
        question:
          'Why did the fall of Saigon establish profound domestic limits on American Cold War foreign interventions?',
      },
    ],
  },

  // Lesson 6: Fall of Berlin Wall & Soviet Collapse
  {
    title: 'The Collapse of Soviet Hegemony and the End of the Cold War (1985–1991)',
    subtitle: '5-Stage Causal Inquiry Framework',
    stages: [
      {
        step: 1,
        date: '1961–1979',
        para_ref: '[1.1–1.2]',
        title: 'The Berlin Wall & Cold War Stagnation',
        actor: 'Walter Ulbricht, Nikita Khrushchev & Leonid Brezhnev',
        tag: '🧱 WALL ERECTION & SOVIET DECLINE',
        trigger:
          "East Germany erected the Berlin Wall in August 1961 to halt refugee flight; subsequent Soviet economic stagnation and the Afghan war drained Moscow's resources.",
        desc: "East Germany erected the Berlin Wall in August 1961 to halt refugee flight; subsequent Soviet economic stagnation and the Afghan war drained Moscow's resources.",
        connective:
          'Physically symbolised communist imprisonment while bankrupting the Soviet economy through an unsustainable 25% GDP military burden.',
        question:
          'How did the erection of the Berlin Wall and economic stagnation weaken long-term Soviet power?',
      },
      {
        step: 2,
        date: '1985–1988',
        para_ref: '[2.1–2.2]',
        title: "Gorbachev's Dual Reforms: Glasnost & Perestroika",
        actor: 'Mikhail Gorbachev & Soviet Reformers',
        tag: '📜 GLASNOST & PERESTROIKA REFORMS',
        trigger:
          'Gorbachev introduced political openness (Glasnost) and economic restructuring (Perestroika) to modernise socialism without abandoning it.',
        desc: 'Gorbachev introduced political openness (Glasnost) and economic restructuring (Perestroika) to modernise socialism without abandoning it.',
        connective:
          'Unleashed suppressed public criticism of corruption, historical atrocities, and economic mismanagement, undermining Communist Party legitimacy.',
        question:
          "Why did Gorbachev's reform policies unintentionally destabilize the Soviet system they were meant to save?",
      },
      {
        step: 3,
        date: '1988–1989',
        para_ref: '[3.1–3.2]',
        title: 'Repudiation of the Brezhnev Doctrine',
        actor: 'Mikhail Gorbachev & Eastern European Dissidents',
        tag: '🕊️ BREZHNEV DOCTRINE RENUNCIATION',
        trigger:
          "Gorbachev declared the USSR would no longer use military force to intervene in Warsaw Pact allies (the 'Sinatra Doctrine').",
        desc: "Gorbachev declared the USSR would no longer use military force to intervene in Warsaw Pact allies (the 'Sinatra Doctrine').",
        connective:
          'Emboldened democratic reform movements like Solidarity in Poland and opened Hungarian borders, rendering satellite regimes defenseless.',
        question:
          "How did Gorbachev's refusal to use military force spark the collapse of Eastern European communist regimes?",
      },
      {
        step: 4,
        date: '9 Nov 1989',
        para_ref: '[4.1–4.2]',
        title: 'The Breaching of the Berlin Wall',
        actor: 'Günter Schabowski & East German Citizens',
        tag: '🎉 BERLIN WALL OPENING',
        trigger:
          'Spokesman Schabowski mistakenly announced immediate travel deregulation, prompting tens of thousands to overwhelm border checkpoints and tear down the Wall.',
        desc: 'Spokesman Schabowski mistakenly announced immediate travel deregulation, prompting tens of thousands to overwhelm border checkpoints and tear down the Wall.',
        connective:
          "Shattered the primary physical symbol of European partition and triggered peaceful 'Velvet Revolutions' across Czechoslovakia and Romania.",
        question:
          'Why did the sudden opening of the Berlin Wall immediately unravel Soviet control in Central Europe?',
      },
      {
        step: 5,
        date: '1991',
        para_ref: '[5.1–5.2]',
        title: 'The August Coup & Soviet Dissolution',
        actor: 'Boris Yeltsin, Hardline Plotters & Mikhail Gorbachev',
        tag: '🚩 DISSOLUTION OF THE SOVIET UNION',
        trigger:
          'Hardline communist coup plotters failed to seize power as Boris Yeltsin rallied popular resistance; on 25 December 1991, Gorbachev resigned as the USSR dissolved.',
        desc: 'Hardline communist coup plotters failed to seize power as Boris Yeltsin rallied popular resistance; on 25 December 1991, Gorbachev resigned as the USSR dissolved.',
        connective:
          "Formally concluded nearly half a century of Cold War rivalry, leaving the United States as the world's sole unchallenged superpower.",
        question:
          'How did the failed hardline coup of August 1991 accelerate the final dissolution of the Soviet Union?',
      },
    ],
  },

  // Lesson 7: Assessment: Was the Cold War Ever Truly 'Cold'?
  {
    title: "Assessment: Was the Cold War Ever Truly 'Cold'?",
    subtitle: '5-Stage Causal Inquiry Framework',
    stages: [
      {
        step: 1,
        date: '1945–1990',
        para_ref: '[1.1–1.2]',
        title: "The Eurocentric Myth of the 'Long Peace'",
        actor: 'Superpower Diplomacy & NATO/Warsaw Pact',
        tag: '🗺️ EUROCENTRIC PEACE MYTH',
        trigger:
          "Historians celebrated the absence of direct military conflict between nuclear superpowers in Europe as a 'Long Peace'.",
        desc: "Historians celebrated the absence of direct military conflict between nuclear superpowers in Europe as a 'Long Peace'.",
        connective:
          'Concealed the violent reality that the Cold War was displaced into ferocious armed struggles across Asia, Africa, and Latin America.',
        question:
          "Why is characterizing the Cold War as a 'peaceful' era an inaccurate Eurocentric perspective?",
      },
      {
        step: 2,
        date: '1945–1990',
        para_ref: '[2.1–2.2]',
        title: 'The Third World Bloodbath (20 Million Dead)',
        actor: 'Post-Colonial Nations & Proxy Armies',
        tag: '🩸 HUMAN TOLL OF PROXY WARS',
        trigger:
          'Proxy conflicts in Korea, Vietnam, Angola, Mozambique, and Afghanistan claimed an estimated 20 million lives, overwhelmingly civilian.',
        desc: 'Proxy conflicts in Korea, Vietnam, Angola, Mozambique, and Afghanistan claimed an estimated 20 million lives, overwhelmingly civilian.',
        connective:
          'Proved that for developing nations in the Global South, the Cold War was as devastating and lethal as traditional total warfare.',
        question:
          "How does the death toll in proxy conflicts challenge the conventional view that the Cold War was 'cold'?",
      },
      {
        step: 3,
        date: '1947–1989',
        para_ref: '[3.1–3.2]',
        title: 'The Invisible War: Espionage & Covert Action',
        actor: 'CIA, KGB & MI6 Operatives',
        tag: '🕵️ COVERT INTERVENTION & COUPS',
        trigger:
          'Intelligence agencies staged clandestine coups (Iran 1953, Guatemala 1954, Chile 1973), conducted global surveillance, and waged psychological warfare.',
        desc: 'Intelligence agencies staged clandestine coups (Iran 1953, Guatemala 1954, Chile 1973), conducted global surveillance, and waged psychological warfare.',
        connective:
          'Subverted democratic sovereignty worldwide while keeping superpower confrontation beneath the threshold of open, declared warfare.',
        question:
          'Why were intelligence agencies and covert operations central to waging the Cold War?',
      },
      {
        step: 4,
        date: '1950s–1980s',
        para_ref: '[4.1–4.2]',
        title: 'Technological Brinkmanship & The Space Race',
        actor: 'NASA, Soviet Space Programme & Military Scientists',
        tag: '🚀 SPACE & NUCLEAR ARMS RACE',
        trigger:
          "From Sputnik (1957) and Apollo 11 (1969) to the SDI 'Star Wars' initiative, the superpowers competed furiously for technological supremacy.",
        desc: "From Sputnik (1957) and Apollo 11 (1969) to the SDI 'Star Wars' initiative, the superpowers competed furiously for technological supremacy.",
        connective:
          'Served as a non-lethal ideological battleground to prove systemic superiority while driving rapid advancements in missile delivery systems.',
        question:
          'How did the Space Race serve as a substitute for direct military conflict between the superpowers?',
      },
      {
        step: 5,
        date: '1945–1991',
        para_ref: '[5.1–5.2]',
        title: 'The Synoptic Verdict: Total War in Disguise',
        actor: 'Cold War Historians & Global Society',
        tag: '⚖️ SYNOPTIC HISTORICAL VERDICT',
        trigger:
          'Nuclear deterrence prevented direct superpower annihilation, but structural proxy violence transformed global politics and economies for half a century.',
        desc: 'Nuclear deterrence prevented direct superpower annihilation, but structural proxy violence transformed global politics and economies for half a century.',
        connective:
          "Yields the definitive historical verdict: the Cold War was only 'cold' in the sense that nuclear weapons deterred mutual suicide at the core.",
        question:
          'To what extent was the Cold War an era of total ideological warfare conducted without direct superpower confrontation?',
      },
    ],
  },
];

function updateColdWarData(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip export default temporarily to evaluate cleanly in node
  const cleanCode = content.replace(/export\s+default\s+cold_war_data;?/, '');
  const vm = require('vm');
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.createContext(sandbox);
  vm.runInContext(cleanCode, sandbox);
  const data = sandbox.module.exports || sandbox.exports || sandbox.cold_war_data;

  if (!data || !data.lessons) {
    console.error('Failed to parse cold war data from:', filePath);
    process.exit(1);
  }

  data.lessons.forEach((lesson, lIdx) => {
    const spine = COLD_WAR_SPINES[lIdx];
    if (!spine) return;

    lesson.causal_domino_spine = spine;

    // Harmonize narrative blocks: ensure act: 1..5, act_title, date_badge, and link to stage question
    if (Array.isArray(lesson.narrative_blocks)) {
      lesson.narrative_blocks.forEach((block, bIdx) => {
        const stage = spine.stages[bIdx];
        if (!stage) return;

        block.act = bIdx + 1;
        block.act_title = `Stage ${bIdx + 1}: ${stage.title} — ${stage.question}`;
        block.date_badge = stage.date;
      });
    }
  });

  // Re-serialize cleanly
  const outCode = `// Superpower Relations and the Cold War (1941–1991)\n// Complete 5-Stage Chronological Inquiry Spine & 5-Block Narrative Architecture\n\nconst cold_war_data = ${JSON.stringify(data, null, 2)};\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = cold_war_data;\n}\nexport default cold_war_data;\n`;

  fs.writeFileSync(filePath, outCode, 'utf8');
  console.log(`Successfully injected 5-stage causal spines into: ${filePath}`);
}

updateColdWarData('units/cold_war/data.js');
updateColdWarData('public/units/cold_war/data.js');
