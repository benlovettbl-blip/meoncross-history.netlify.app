/**
 * scripts/master_companion_data/cold_war_companion_data.cjs
 * Universal 16-Page Master Knowledge Retrieval Companion Data
 * Unit: Superpower Relations and the Cold War, 1941–1991 (Paper 2, Option P4)
 */

const enquiries = [
  {
    num: 1,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.1',
    title: 'The Grand Alliance & Wartime Conferences (1943–1945)',
    focus: 'Tehran (1943), Yalta (Feb 1945), Potsdam (Jul 1945), ideological rivalry & attitudes of Big Three',
    warning: 'Fatal Examiner Trap: Conflating decisions made at Yalta with Potsdam. At Yalta (Feb 1945) the Big Three agreed to divide Germany into four zones; at Potsdam (Jul 1945) Truman and Attlee clashed bitterly with Stalin over Polish borders and German reparations.',
    quote: '"Yalta promised free elections; Potsdam revealed bitter division: wartime convenience could not survive victory."',
    questions: [
      {
        q: 'Which three nations and leaders formed the "Grand Alliance" during the Second World War?',
        a: 'USA (Roosevelt/Truman), USSR (Stalin), and Britain (Churchill/Attlee)',
        exp: 'Formed as a marriage of convenience to defeat Nazi Germany despite profound ideological hostility.'
      },
      {
        q: 'At the Tehran Conference (November 1943), what military commitment did Britain and the USA make to Stalin?',
        a: 'To open a "Second Front" in Western Europe (Operation Overlord)',
        exp: 'Relieved German military pressure on the Soviet Red Army fighting on the Eastern Front.'
      },
      {
        q: 'At the Yalta Conference (February 1945), into how many military zones was defeated Germany to be divided?',
        a: 'Four occupational zones (US, British, French, and Soviet)',
        exp: 'Berlin, located deep inside the Soviet zone, was also subdivided into four corresponding sectors.'
      },
      {
        q: 'What international peacekeeping organisation did the Big Three agree to establish at Yalta in 1945?',
        a: 'The United Nations (UN)',
        exp: 'The USA, USSR, Britain, France, and China received permanent veto power on the Security Council.'
      },
      {
        q: 'What political pledge did Stalin make at Yalta regarding the liberated nations of Eastern Europe?',
        a: 'To allow free, democratic elections across Eastern Europe (Declaration on Liberated Europe)',
        exp: 'Stalin subsequently broke this pledge, installing puppet communist regimes across Eastern Europe.'
      },
      {
        q: 'Which new US President represented America at the Potsdam Conference in July 1945?',
        a: 'Harry S. Truman',
        exp: 'Adopted a far more aggressive, suspicious, and confrontational stance towards Stalin than Roosevelt.'
      },
      {
        q: 'What secret military breakthrough did President Truman deliberately reveal to Stalin during Potsdam in 1945?',
        a: 'The successful testing of the atomic bomb (Trinity test in New Mexico)',
        exp: 'Intended to intimidate Stalin, but instead accelerated the Soviet crash programme to build their own bomb.'
      },
      {
        q: 'How did the Big Three resolve disagreements over German reparations at the 1945 Potsdam Conference?',
        a: 'Each power took reparations primarily from its own occupation zone (USSR got 10% industrial equipment from West)',
        exp: 'Prevented a unified German economic policy and deepened the divide between East and West.'
      },
      {
        q: 'Over which nation’s post-war borders and government did the superpowers clash most bitterly at Potsdam?',
        a: 'Poland (the Curzon Line and Lublin Poles)',
        exp: 'Stalin refused to allow the democratic London government-in-exile to share power with pro-Soviet communists.'
      },
      {
        q: 'What fundamental ideological divide separated American capitalism from Soviet communism?',
        a: 'Capitalism favoured private enterprise and multi-party democracy; communism enforced state ownership and one-party rule',
        exp: 'Created incompatible worldviews where each superpower viewed the other’s system as an existential threat.'
      }
    ]
  },
  {
    num: 2,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.2',
    title: 'Atomic Monopoly, Telegrams & Satellite States (1945–1947)',
    focus: 'Hiroshima & Nagasaki, Kennan’s Long Telegram, Novikov Telegram, Churchill’s Iron Curtain & Soviet satellites',
    warning: 'Fatal Examiner Trap: Forgetting the reciprocal impact of the 1946 telegrams. Kennan’s Long Telegram convinced the US that Stalin sought world conquest; Novikov’s Telegram convinced Moscow that the US was preparing for global war.',
    quote: '"From Stettin in the Baltic to Trieste in the Adriatic: the Iron Curtain hardened into armed satellite states."',
    questions: [
      {
        q: 'On which two Japanese cities did the United States drop atomic bombs in August 1945?',
        a: 'Hiroshima (6 August) and Nagasaki (9 August 1945)',
        exp: 'Killed over 120,000 civilians immediately, forced Japan’s surrender, and initiated the nuclear arms race.'
      },
      {
        q: 'In February 1946, what secret 8,000-word cable did US diplomat George Kennan send from Moscow?',
        a: 'The Long Telegram',
        exp: 'Warned that the USSR was fanatically hostile to the West and recommended a long-term policy of containment.'
      },
      {
        q: 'In September 1946, what Soviet diplomatic telegram reported that the USA was pursuing world domination?',
        a: 'The Novikov Telegram (Nikolai Novikov)',
        exp: 'Convinced Stalin that America was building up its military to launch an aggressive war against the USSR.'
      },
      {
        q: 'In March 1946, what famous phrase did Winston Churchill use at Fulton, Missouri to describe the division of Europe?',
        a: 'An "Iron Curtain" has descended across the continent',
        exp: 'Stalin condemned the speech as warmongering and compared Churchill’s rhetoric to Adolf Hitler.'
      },
      {
        q: 'What term describes Eastern European nations officially independent but strictly controlled by Moscow?',
        a: 'Satellite states (buffer zone)',
        exp: 'Created by Stalin across Poland, Hungary, Romania, Bulgaria, and Czechoslovakia to protect Russia from Western invasion.'
      },
      {
        q: 'What political technique did communist parties use to eliminate political opponents in Eastern Europe?',
        a: '"Salami tactics" (cutting away opposition slice by slice)',
        exp: 'Coined by Hungarian leader Rakosi to describe gradually arresting, discrediting, and executing rival politicians.'
      },
      {
        q: 'In which Eastern European country did communists stage a violent coup d’état in February 1948?',
        a: 'Czechoslovakia',
        exp: 'Foreign Minister Jan Masaryk was defenestrated (thrown from a window), shocking the US Congress into passing Marshall Aid.'
      },
      {
        q: 'Why did Stalin consider control over Poland essential to Soviet national security after 1945?',
        a: 'Poland had served as the historical military corridor for German invasions of Russia in 1914 and 1941',
        exp: 'Cost the Soviet Union 27 million lives during WWII, convincing Stalin that a friendly Polish buffer was non-negotiable.'
      },
      {
        q: 'Which communist leader in Yugoslavia successfully broke away from Stalin’s direct control in 1948?',
        a: 'Josip Broz Tito (Marshal Tito)',
        exp: 'Maintained an independent socialist state outside the Soviet sphere, accepting Western economic aid.'
      },
      {
        q: 'How did the US atomic monopoly from 1945 to 1949 alter relations between Truman and Stalin?',
        a: 'It gave the USA temporary military supremacy but created extreme paranoia and hostility in Moscow',
        exp: 'Drove Stalin to pour immense national resources into testing the first Soviet atomic bomb in August 1949.'
      }
    ]
  },
  {
    num: 3,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.3',
    title: 'Containment: Truman Doctrine & Marshall Plan (1947–1949)',
    focus: 'Truman Doctrine ($400m), Greece & Turkey, Marshall Plan ($13.7bn), Cominform (1947) & Comecon (1949)',
    warning: 'Fatal Examiner Trap: Describing the Marshall Plan as simple charity. It was a strategic economic weapon designed to rebuild European capitalism and eliminate the poverty where communism flourished, while Cominform coordinated anti-Western propaganda.',
    quote: '"Two ways of life: Truman pledged cash and arms for containment; Stalin formed Cominform to enforce orthodoxy."',
    questions: [
      {
        q: 'In March 1947, which speech marked the official departure of the USA from traditional peacetime isolationism?',
        a: 'The Truman Doctrine',
        exp: 'Pledged American economic and military assistance to any nation resisting armed subjugation by communist minorities.'
      },
      {
        q: 'Which two Mediterranean nations received $400 million in urgent US military aid under the Truman Doctrine in 1947?',
        a: 'Greece and Turkey',
        exp: 'Britain could no longer afford to support the Greek monarchy against communist guerrillas, prompting US intervention.'
      },
      {
        q: 'What foreign policy strategy became the central foundation of American Cold War strategy following 1947?',
        a: 'Containment',
        exp: 'Aimed to halt the outward geographic expansion of Soviet communism rather than rolling back existing territory.'
      },
      {
        q: 'In June 1947, what massive economic recovery package for war-torn Europe was proposed by George Marshall?',
        a: 'The Marshall Plan (European Recovery Program)',
        exp: 'Provided $13.7 billion in grants and goods over four years to reconstruct Western European economies and trade.'
      },
      {
        q: 'What economic motive underpinned the Marshall Plan alongside the political goal of stopping communism?',
        a: 'Creating prosperous export markets for American industrial and agricultural goods',
        exp: 'Prevented the US economy from sliding into a post-war depression by financing European purchases of US products.'
      },
      {
        q: 'How did Stalin dismiss and condemn the Marshall Plan in Soviet propaganda?',
        a: '"Dollar Imperialism" (economic enslavement of Europe)',
        exp: 'Stalin claimed the US was using financial aid to establish an economic empire and undermine European sovereignty.'
      },
      {
        q: 'What organisation did Stalin establish in September 1947 to coordinate European communist parties?',
        a: 'Cominform (Communist Information Bureau)',
        exp: 'Enforced ideological conformity to Moscow across Eastern Europe and ensured member states rejected Marshall Aid.'
      },
      {
        q: 'In January 1949, what economic alliance did the USSR establish for its Eastern European satellite states?',
        a: 'Comecon (Council for Mutual Economic Assistance)',
        exp: 'Organised bilateral trade agreements and national specialisation within the Soviet bloc, excluding Western trade.'
      },
      {
        q: 'Which Eastern European nation accepted Marshall Aid before being forced by Stalin to withdraw its application?',
        a: 'Czechoslovakia',
        exp: 'Proved to the West that Eastern European nations were sovereign in name only and subject to Moscow’s veto.'
      },
      {
        q: 'How did the combination of the Truman Doctrine and Marshall Plan divide Europe into two hostile economic blocs?',
        a: 'Western Europe integrated under US capitalist aid, while Eastern Europe was tied into the Soviet communist economy',
        exp: 'Cemented the permanent division of Europe and eliminated any hope of postwar superpower reconciliation.'
      }
    ]
  },
  {
    num: 4,
    kt: 'Key Topic 1',
    topicCode: 'KT 1.4',
    title: 'The Berlin Crisis, Division of Germany & Military Pacts (1948–1955)',
    focus: 'Bizonia, Deutschmark, Berlin Blockade (Jun 1948–May 1949), Berlin Airlift, FRG, GDR, NATO & Warsaw Pact',
    warning: 'Fatal Examiner Trap: Confusing the 1948–49 Berlin Blockade with the 1961 Berlin Wall. In 1948, Stalin cut road, rail, and canal routes to starve West Berlin, prompting the 11-month Allied Airlift; no wall existed in 1948.',
    quote: '"Operation Vittles delivered 2.3m tonnes of flour and coal; the blockade created two Germanies and NATO."',
    questions: [
      {
        q: 'In January 1947, which two Western occupation zones merged economically to form "Bizonia"?',
        a: 'The British and American zones (later Trizonia with France)',
        exp: 'Created a unified economic territory in Western Germany, provoking fierce Soviet protests at four-power talks.'
      },
      {
        q: 'In June 1948, what economic reform in Western Germany triggered Stalin’s decision to blockade West Berlin?',
        a: 'The introduction of a new Western currency, the Deutschmark',
        exp: 'Stalin feared the Deutschmark would undermine the worthless Soviet East German currency and unify the West.'
      },
      {
        q: 'On 24 June 1948, what action did Stalin take to force Western powers out of West Berlin?',
        a: 'Imposed a total ground blockade on all road, rail, and canal routes into West Berlin',
        exp: 'Cut electricity, food, and fuel to 2 million West Berliners deep inside the Soviet occupation zone.'
      },
      {
        q: 'What military operation did Western allies launch to keep West Berlin supplied without starting a shooting war?',
        a: 'The Berlin Airlift (Operation Vittles)',
        exp: 'US and British transport planes flew supplies into Tempelhof and Gatow airports every three minutes around the clock.'
      },
      {
        q: 'For how many months did the Berlin Airlift operate before Stalin admitted defeat and lifted the blockade?',
        a: 'Eleven months (June 1948 to May 1949)',
        exp: 'Delivered 2.3 million tonnes of supplies, proving Western determination to defend freedom in Berlin.'
      },
      {
        q: 'In May 1949, what official state was established in the Western zones of Germany?',
        a: 'The Federal Republic of Germany (FRG / West Germany)',
        exp: 'Led by democratic Chancellor Konrad Adenauer with its capital at Bonn.'
      },
      {
        q: 'In October 1949, what state was established by the Soviet Union in its eastern occupation zone?',
        a: 'The German Democratic Republic (GDR / East Germany)',
        exp: 'A communist one-party state governed by the SED under Walter Ulbricht.'
      },
      {
        q: 'In April 1949, what collective defense military alliance was founded by the USA and 11 Western nations?',
        a: 'NATO (North Atlantic Treaty Organisation)',
        exp: 'Article 5 declared that an armed attack against one member in Europe or North America would be considered an attack on all.'
      },
      {
        q: 'What event in May 1955 directly prompted the Soviet Union to establish the Warsaw Pact military alliance?',
        a: 'The admission of West Germany (FRG) into NATO and its rearmament',
        exp: 'Revived Soviet fears of German military aggression, leading Moscow to bind its satellite armies into a unified command.'
      },
      {
        q: 'Which eight communist nations signed the Warsaw Pact treaty in May 1955?',
        a: 'USSR, Poland, East Germany, Czechoslovakia, Hungary, Romania, Bulgaria, and Albania',
        exp: 'Formalised the military division of Europe into two opposing nuclear-armed alliances.'
      }
    ]
  },
  {
    num: 5,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.1',
    title: 'The Nuclear Arms Race & The Hungarian Uprising (1949–1956)',
    focus: 'Soviet A-bomb (1949), H-bomb (1952/53), ICBMs, Khrushchev’s Secret Speech, Imre Nagy & Soviet tanks in Budapest',
    warning: 'Fatal Examiner Trap: Believing the USA intervened to help Hungary. Despite radio broadcasts encouraging rebellion (Radio Free Europe), the West sent zero troops to Budapest because Hungary lay inside the acknowledged Soviet sphere of influence.',
    quote: '"Khrushchev denounced Stalin in secret; Nagy withdrew from Warsaw Pact: 1,000 Soviet tanks crushed Budapest."',
    questions: [
      {
        q: 'In August 1949, what event ended the United States’ four-year monopoly on nuclear weapons?',
        a: 'The Soviet Union successfully tested its first atomic bomb (RDS-1)',
        exp: 'Shocked Washington years ahead of CIA predictions and dramatically escalated the Cold War arms race.'
      },
      {
        q: 'In November 1952, what catastrophic new weapon, 1,000 times more powerful than the Hiroshima bomb, did the US test?',
        a: 'The Hydrogen Bomb (thermonuclear bomb / Ivy Mike)',
        exp: 'The Soviet Union matched the US by testing its own deployable hydrogen bomb in August 1953.'
      },
      {
        q: 'What new delivery vehicle developed in 1957 allowed nuclear warheads to strike enemy territory within 30 minutes?',
        a: 'ICBMs (Intercontinental Ballistic Missiles)',
        exp: 'Eliminated reliance on slow bombers; the USSR demonstrated leadership with the Sputnik launch in October 1957.'
      },
      {
        q: 'In February 1956, what speech by new Soviet leader Nikita Khrushchev signaled the policy of "De-Stalinisation"?',
        a: 'The "Secret Speech" to the 20th Party Congress',
        exp: 'Denounced Stalin’s crimes, purges, and personality cult, raising false hopes of political reform in satellite states.'
      },
      {
        q: 'Which despised, hardline Stalinist leader of Hungary was forced to resign in July 1956?',
        a: 'Matyas Rakosi ("the bald butcher")',
        exp: 'His secret police (AVH) terrorised Hungary, creating simmering public fury that exploded into street protests in October.'
      },
      {
        q: 'Who was appointed Prime Minister of Hungary in October 1956 to restore calm following student riots?',
        a: 'Imre Nagy',
        exp: 'A moderate communist reformer who introduced free elections, abolished the secret police, and freed political prisoners.'
      },
      {
        q: 'What fatal announcement by Imre Nagy on 1 November 1956 triggered the massive Soviet military invasion?',
        a: 'Hungary’s withdrawal from the Warsaw Pact and declaration of national neutrality',
        exp: 'Stalin and Khrushchev could not tolerate a gaping hole in their military buffer zone bordering Austria.'
      },
      {
        q: 'On 4 November 1956, what military force did Khrushchev dispatch into Budapest to crush the Hungarian revolution?',
        a: '1,000 Soviet tanks and 200,000 troops',
        exp: 'Crushed armed Hungarian street resistance, killing over 20,000 Hungarians and forcing 200,000 to flee into exile.'
      },
      {
        q: 'What happened to Hungarian Prime Minister Imre Nagy following his capture by Soviet authorities?',
        a: 'He was promised safe passage, arrested, tried in secret, and executed in June 1958',
        exp: 'Replaced by ruthless pro-Soviet puppet Janos Kadar, who reimposed strict communist orthodoxy.'
      },
      {
        q: 'Why did the USA and NATO fail to provide military assistance to Hungarian freedom fighters in November 1956?',
        a: 'Military intervention inside the Soviet sphere risked triggering a catastrophic nuclear war, and Britain/France were embroiled in Suez',
        exp: 'Demonstrated to Eastern Europe that Western rhetoric of "rolling back communism" was an empty promise.'
      }
    ]
  },
  {
    num: 6,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.2',
    title: 'The Berlin Refugee Crisis & The Berlin Wall (1958–1961)',
    focus: 'Brain Drain, Khrushchev’s 1958 Ultimatum, Geneva/Camp David/Paris/Vienna summits, U-2 Crisis & 13 August 1961',
    warning: 'Fatal Examiner Trap: Assuming the Berlin Wall was built by the Western Allies. It was built by communist East Germany (with Khrushchev\'s blessing) to imprison its own citizens and stop skilled workers escaping into democratic West Berlin.',
    quote: '"Khrushchev demanded the West leave Berlin; by August 1961 barbed wire and cinder blocks sealed the border."',
    questions: [
      {
        q: 'Between 1949 and 1961, approximately how many citizens fled communist East Germany through West Berlin?',
        a: 'Around 2.7 million to 3 million people (one-sixth of the GDR population)',
        exp: 'Created an existential economic crisis for East Germany because the majority were young, skilled professionals ("brain drain").'
      },
      {
        q: 'In November 1958, what ultimatum did Nikita Khrushchev issue to the Western powers concerning Berlin?',
        a: 'The Berlin Ultimatum (demanding Western troops leave Berlin within 6 months to make it a free city)',
        exp: 'Khrushchev threatened to hand control of access routes to East Germany if the West refused to withdraw.'
      },
      {
        q: 'Which September 1959 summit between Eisenhower and Khrushchev established a temporary thaw in Cold War tensions?',
        a: 'The Camp David Summit',
        exp: 'Khrushchev withdrew his six-month ultimatum, and the leaders agreed to hold a full superpower summit in Paris in 1960.'
      },
      {
        q: 'In May 1960, what espionage incident shattered the Paris Peace Summit before formal negotiations began?',
        a: 'The shooting down of an American U-2 spy plane over Soviet airspace',
        exp: 'Pilot Gary Powers was captured alive; Eisenhower refused to apologise, causing Khrushchev to storm out of Paris.'
      },
      {
        q: 'At the Vienna Summit in June 1961, how did Khrushchev attempt to exploit newly elected US President John F. Kennedy?',
        a: 'He bullied Kennedy by reissuing the Berlin Ultimatum, believing JFK was young and inexperienced',
        exp: 'Kennedy refused to back down, increasing US defense spending by $3.2 billion and expanding military draft calls.'
      },
      {
        q: 'On what date did East German troops begin unrolling barbed wire along the border to seal off West Berlin?',
        a: 'Sunday, 13 August 1961 (Operation Rose)',
        exp: 'Closed all crossing points overnight, separating families and beginning construction of the concrete Berlin Wall.'
      },
      {
        q: 'What iconic military standoff occurred in October 1961 when US and Soviet tanks faced each other at 100 yards?',
        a: 'The Standoff at Checkpoint Charlie',
        exp: 'US diplomat E. Allan Lightner was stopped from entering East Berlin; after 16 hours Kennedy and Khrushchev agreed to pull tanks back.'
      },
      {
        q: 'In June 1963, what historic German phrase did President Kennedy speak to a crowd of 450,000 West Berliners?',
        a: '"Ich bin ein Berliner" ("I am a Berliner")',
        exp: 'Affirmed unwavering American commitment to West Berlin and condemned the Wall as the ultimate symbol of communist failure.'
      },
      {
        q: 'How did the construction of the Berlin Wall paradoxically stabilise European relations between 1961 and 1989?',
        a: 'It solved East Germany’s refugee crisis and eliminated Berlin as an immediate flashpoint for a third world war',
        exp: 'Neither superpower had to go to war: Khrushchev stopped the brain drain, and Kennedy preserved West Berlin’s freedom.'
      },
      {
        q: 'What physical security features made the fully developed Berlin Wall nearly impossible to cross after 1961?',
        a: 'Concrete walls, watchtowers, guard dogs, anti-vehicle trenches, floodlights, and a raked sand "death strip"',
        exp: 'Over 140 people were killed attempting to escape across the wall between 1961 and 1989.'
      }
    ]
  },
  {
    num: 7,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.3',
    title: 'The Cuban Revolution & The Cuban Missile Crisis (1959–1962)',
    focus: 'Fidel Castro, nationalisation, Bay of Pigs (Apr 1961), U-2 discovery (Oct 1962), naval blockade & 13 Days',
    warning: 'Fatal Examiner Trap: Forgetting the secret concession in the Cuba resolution. Publicly, Khrushchev withdrew missiles in exchange for a US pledge not to invade Cuba; secretly, Kennedy also agreed to remove US Jupiter missiles from Turkey.',
    quote: '"Thirteen days on the nuclear brink: Kennedy chose blockade over bombing; Khrushchev blinked first."',
    questions: [
      {
        q: 'In January 1959, which revolutionary leader overthrew the US-backed Cuban dictator Fulgencio Batista?',
        a: 'Fidel Castro',
        exp: 'Nationalised American-owned sugar plantations, banks, and oil refineries, prompting the US to impose a trade embargo.'
      },
      {
        q: 'Which superpower stepped in to buy Cuban sugar and provide economic and military aid to Castro in 1960?',
        a: 'The Soviet Union (Nikita Khrushchev)',
        exp: 'Turned Cuba into a communist ally barely 90 miles off the coast of Florida.'
      },
      {
        q: 'In April 1961, what disastrous CIA-backed invasion by 1,400 Cuban exiles attempted to overthrow Castro?',
        a: 'The Bay of Pigs Invasion (La Playa Giron)',
        exp: 'Failed within 72 hours when Kennedy canceled US air cover; humiliated America and pushed Castro directly into Soviet arms.'
      },
      {
        q: 'Why did Nikita Khrushchev secretly decide to place nuclear ballistic missiles in Cuba in summer 1962?',
        a: 'To protect Cuba from another US invasion and balance US Jupiter missiles stationed in neighbouring Turkey',
        exp: 'Also aimed to close the "missile gap" and gain immense leverage over Berlin negotiations.'
      },
      {
        q: 'On 14 October 1962, what photographic evidence discovered by a US U-2 spy plane triggered the Cuban Missile Crisis?',
        a: 'Photographs of Soviet medium-range ballistic missile (MRBM) launch pads under construction in Cuba',
        exp: 'Initiated the "Thirteen Days" (16–28 October 1962) where the world came closest to full thermonuclear war.'
      },
      {
        q: 'What special advisory body of 12 politicians and military commanders did Kennedy create to manage the crisis?',
        a: 'ExComm (Executive Committee of the National Security Council)',
        exp: 'Debated military airstrikes and invasion against a naval quarantine, with Kennedy choosing the middle option.'
      },
      {
        q: 'Why did President Kennedy deliberately describe his naval blockade of Cuba on 22 October 1962 as a "quarantine"?',
        a: 'Under international law, a "blockade" is a formal act of war; a "quarantine" was framed as a defensive measure',
        exp: 'Gave Khrushchev time to turn his ships around without immediately triggering combat.'
      },
      {
        q: 'On 27 October 1962 ("Black Saturday"), what dangerous incident brought the superpowers to the verge of war?',
        a: 'A US U-2 spy plane piloted by Major Rudolf Anderson was shot down over Cuba by a Soviet SAM missile',
        exp: 'US military chiefs demanded immediate retaliatory airstrikes, but Kennedy refused to authorize them.'
      },
      {
        q: 'What public agreement on 28 October 1962 ended the Cuban Missile Crisis?',
        a: 'Khrushchev agreed to dismantle and remove all missiles from Cuba; the USA pledged never to invade Cuba',
        exp: 'Averted nuclear holocaust and was hailed as a brilliant diplomatic triumph for Kennedy.'
      },
      {
        q: 'What secret agreement was negotiated between Robert Kennedy and Anatoly Dobrynin to finalize the resolution?',
        a: 'The USA agreed to secretly withdraw American Jupiter missiles from Turkey and Italy within a few months',
        exp: 'Kept secret to protect Kennedy’s domestic political prestige and prevent NATO allies feeling abandoned.'
      }
    ]
  },
  {
    num: 8,
    kt: 'Key Topic 2',
    topicCode: 'KT 2.4',
    title: 'Crisis Aftermath & The Prague Spring (1963–1968)',
    focus: 'Moscow-Washington Hotline, Test Ban Treaty (1963), Non-Proliferation (1968), Alexander Dubcek & Brezhnev Doctrine',
    warning: 'Fatal Examiner Trap: Confusing the Brezhnev Doctrine with the Truman Doctrine. The Truman Doctrine (1947) was US containment of communism; the Brezhnev Doctrine (1968) asserted Soviet right to invade any communist state deviating from Moscow’s control.',
    quote: '"Socialism with a human face met 500,000 Warsaw Pact troops; the Brezhnev Doctrine silenced Czechoslovakia."',
    questions: [
      {
        q: 'In June 1963, what direct communication link was established between the White House and the Kremlin?',
        a: 'The Moscow-Washington Hotline (Teletype / wire link)',
        exp: 'Allowed superpower leaders to communicate instantly during crises to prevent accidental nuclear escalation.'
      },
      {
        q: 'In August 1963, what international treaty banned nuclear weapons testing in the atmosphere, underwater, and outer space?',
        a: 'The Limited Test Ban Treaty (LTBT)',
        exp: 'Permitted only underground testing; marked the first formal multilateral treaty limiting nuclear weaponry.'
      },
      {
        q: 'In 1968, which landmark treaty prevented non-nuclear nations from acquiring nuclear weapons technology?',
        a: 'The Nuclear Non-Proliferation Treaty (NPT)',
        exp: 'Nuclear states pledged not to transfer weapons, while non-nuclear signatories agreed to peaceful civilian nuclear power only.'
      },
      {
        q: 'In January 1968, who replaced hardline Antonin Novotny as First Secretary of the Czechoslovak Communist Party?',
        a: 'Alexander Dubcek',
        exp: 'Committed to reforming the communist system from within while remaining a loyal member of the Warsaw Pact.'
      },
      {
        q: 'What famous slogan did Alexander Dubcek use to describe his liberal reform program in spring 1968?',
        a: '"Socialism with a human face"',
        exp: 'Aimed to combine communist planned economy with democratic freedoms, ending censorship and allowing rival parties.'
      },
      {
        q: 'What democratic reforms were introduced during the "Prague Spring" in Czechoslovakia between April and August 1968?',
        a: 'Abolition of press censorship, freedom of speech, legalization of trade unions, and permission to travel to the West',
        exp: 'Terrified Soviet leader Leonid Brezhnev and neighbouring communist rulers like Ulbricht in East Germany.'
      },
      {
        q: 'On 20 August 1968, what military invasion crushed the Prague Spring?',
        a: '500,000 Warsaw Pact troops and 2,000 tanks invaded Czechoslovakia',
        exp: 'Seized radio stations, arrested Dubcek, and took him in handcuffs to Moscow to sign away his reforms.'
      },
      {
        q: 'How did Czechoslovak citizens resist the 1968 Warsaw Pact invasion without engaging in armed violence?',
        a: 'Non-violent civil disobedience (standing in front of tanks, painting over street signs, and student Jan Palach self-immolation)',
        exp: 'Prevented the heavy bloodshed of Hungary 1956, but left the country demoralised under Soviet military occupation.'
      },
      {
        q: 'What foreign policy doctrine was declared by Soviet leader Leonid Brezhnev in November 1968?',
        a: 'The Brezhnev Doctrine',
        exp: 'Asserted that any threat to socialist rule in one Warsaw Pact country was a threat to all, justifying collective military intervention.'
      },
      {
        q: 'How did communist parties in Western Europe (e.g. France and Italy) react to the 1968 invasion of Czechoslovakia?',
        a: 'They condemned the Soviet invasion and severed ties with Moscow, adopting "Eurocommunism"',
        exp: 'Permanently fractured the international communist movement and damaged Soviet moral authority worldwide.'
      }
    ]
  },
  {
    num: 9,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.1',
    title: 'The Era of Détente: SALT 1 & Helsinki Accords (1969–1975)',
    focus: 'Détente, Richard Nixon, Leonid Brezhnev, SALT 1 (1972), Apollo-Soyuz (1975) & Helsinki Three Baskets',
    warning: 'Fatal Examiner Trap: Overlooking the three distinct "Baskets" of the 1975 Helsinki Accords. Basket 1 recognized post-1945 European borders; Basket 2 expanded trade; Basket 3 bound the USSR to respect human rights, which dissidents used to challenge Soviet tyranny.',
    quote: '"SALT 1 froze missile launchers; Helsinki Basket 3 weaponized human rights against the Soviet state."',
    questions: [
      {
        q: 'What French diplomatic term described the period of easing geopolitical tensions between superpowers in the 1970s?',
        a: 'Détente (relaxation of tension)',
        exp: 'Pursued by President Richard Nixon, Henry Kissinger, and Soviet Premier Leonid Brezhnev to reduce the cost of the arms race.'
      },
      {
        q: 'What economic pressure motivated the Soviet Union to pursue détente with the USA in the late 1960s?',
        a: 'Crippling military expenditure and declining living standards (the Soviet economy was stagnant)',
        exp: 'The USSR was spending up to 20% of its GDP on weapons, causing chronic food shortages and desperate need for US grain.'
      },
      {
        q: 'What geopolitical development in 1972 convinced Brezhnev that he must build better relations with Washington?',
        a: 'President Nixon’s historic visit to communist China (triangular diplomacy)',
        exp: 'The USSR feared a hostile US-Chinese alliance against Moscow, compelling Brezhnev to invite Nixon to Moscow.'
      },
      {
        q: 'In May 1972, what historic arms limitation treaty was signed in Moscow by Nixon and Brezhnev?',
        a: 'SALT 1 (Strategic Arms Limitation Talks)',
        exp: 'Consisted of the Anti-Ballistic Missile (ABM) Treaty and an Interim Agreement freezing missile launcher numbers.'
      },
      {
        q: 'Under the 1972 ABM Treaty, how many Anti-Ballistic Missile sites was each superpower permitted to construct?',
        a: 'Two ABM sites (each with a maximum of 100 interceptor missiles; reduced to one in 1974)',
        exp: 'Preserved "Mutual Assured Destruction" (MAD) by guaranteeing that neither side could build a shield to survive a counter-strike.'
      },
      {
        q: 'In July 1975, which joint space mission symbolized the high point of superpower cooperation during détente?',
        a: 'The Apollo-Soyuz Test Project (handshake in space)',
        exp: 'US astronaut Thomas Stafford and Soviet cosmonaut Alexei Leonov docked spacecraft in orbit and shook hands.'
      },
      {
        q: 'In August 1975, which international conference was signed by 35 nations, establishing post-war security and cooperation?',
        a: 'The Helsinki Accords (Helsinki Declaration)',
        exp: 'Represented the high-water mark of détente, dividing agreements into three thematic "Baskets".'
      },
      {
        q: 'What was the major Soviet victory contained in "Basket 1" of the 1975 Helsinki Accords?',
        a: 'Recognition of existing European borders (including the division of Germany and Soviet annexation of the Baltic states)',
        exp: 'Formally legitimized post-WWII European borders and accepted the Soviet sphere of influence.'
      },
      {
        q: 'What vital commitment to basic freedoms did the Soviet Union sign in "Basket 3" of the Helsinki Accords?',
        a: 'Respect for human rights, including freedom of thought, conscience, religion, and freedom of movement',
        exp: 'Western nations used Basket 3 to hold Moscow accountable, inspiring Soviet dissident groups like the Moscow Helsinki Group.'
      },
      {
        q: 'In June 1979, which arms control agreement was signed in Vienna by Jimmy Carter and Brezhnev but never ratified?',
        a: 'SALT 2',
        exp: 'Set limits on missile warheads and bombers, but the US Senate refused to ratify it after the Soviet invasion of Afghanistan.'
      }
    ]
  },
  {
    num: 10,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.2',
    title: 'The Breakdown of Détente & Invasion of Afghanistan (1979–1980)',
    focus: 'Soviet invasion (Dec 1979), Hafizullah Amin, Babrak Karmal, Carter Doctrine, Moscow (1980) & LA (1984) boycotts',
    warning: 'Fatal Examiner Trap: Believing détente ended with Ronald Reagan. Détente was already destroyed in December 1979 under President Jimmy Carter when the Soviet Red Army invaded Afghanistan, prompting the Carter Doctrine and Olympic boycotts.',
    quote: '"Soviet paratroopers in Kabul buried détente; Carter declared the Gulf vital to US security."',
    questions: [
      {
        q: 'On 24 December 1979, which non-aligned nation did the Soviet Union invade, bringing a decisive end to détente?',
        a: 'Afghanistan',
        exp: 'Stalin and Brezhnev feared an Islamic revolution on their southern border following the 1979 Iranian Revolution.'
      },
      {
        q: 'Which Afghan leader was assassinated during the initial Soviet paratrooper assault on the presidential palace in Kabul?',
        a: 'Hafizullah Amin',
        exp: 'Soviet intelligence believed Amin was secretly negotiating with the CIA; he was replaced by pro-Soviet puppet Babrak Karmal.'
      },
      {
        q: 'What guerrilla resistance fighters launched a holy war (jihad) against the Soviet occupying army in Afghanistan?',
        a: 'The Mujahideen (holy warriors)',
        exp: 'Fought a fierce ten-year insurgency using mountain terrain, receiving covert weapons and cash from the CIA, Pakistan, and Saudi Arabia.'
      },
      {
        q: 'What foreign policy doctrine was declared by President Jimmy Carter in his State of the Union address in January 1980?',
        a: 'The Carter Doctrine',
        exp: 'Declared that any attempt by an outside power to gain control of the Persian Gulf region would be repelled by US military force.'
      },
      {
        q: 'What economic sanctions did the United States impose on the Soviet Union following the invasion of Afghanistan?',
        a: 'Suspension of grain sales to the USSR and restrictions on high-technology exports',
        exp: 'Inflicted severe economic pain on the Soviet Union and ended US-Soviet trade cooperation.'
      },
      {
        q: 'Which major international sporting event in summer 1980 was boycotted by the USA and 65 other nations?',
        a: 'The 1980 Moscow Summer Olympic Games',
        exp: 'Organised by President Carter to protest Soviet aggression, leaving the games heavily depleted.'
      },
      {
        q: 'How did the Soviet Union and 14 Eastern bloc nations retaliate four years later at the 1984 Summer Olympics?',
        a: 'They boycotted the 1984 Los Angeles Olympic Games',
        exp: 'Claimed their athletes would not be safe from anti-communist protesters in California.'
      },
      {
        q: 'Which shoulder-fired anti-aircraft missile supplied by the CIA from 1986 turned the tide of the Afghan war for the Mujahideen?',
        a: 'The FIM-92 Stinger missile',
        exp: 'Neutralised Soviet helicopter gunships (Mi-24 Hinds), robbing the Red Army of its decisive battlefield air superiority.'
      },
      {
        q: 'Why did Western historians frequently refer to the Soviet war in Afghanistan as the "USSR’s Vietnam"?',
        a: 'It was an unwinnable, draining guerrilla conflict that killed 15,000 Soviet soldiers and destroyed military morale',
        exp: 'Cost the bankrupt Soviet treasury billions of dollars and generated massive domestic disillusionment.'
      },
      {
        q: 'How did the Soviet invasion of Afghanistan reshape the 1980 US Presidential Election?',
        a: 'It made Jimmy Carter look weak and ineffective, helping hardline anti-communist Ronald Reagan win a landslide victory',
        exp: 'Reagan entered office pledging to abandon appeasement, confront the USSR, and win the Cold War.'
      }
    ]
  },
  {
    num: 11,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.3',
    title: 'The "Second Cold War" & Ronald Reagan (1981–1985)',
    focus: 'Ronald Reagan, "Evil Empire" speech (1983), defense spending surge, SDI ("Star Wars") & Soviet economic strain',
    warning: 'Fatal Examiner Trap: Believing SDI was actually built. The Strategic Defence Initiative was a theoretical, research-stage laser shield; however, the mere prospect of America building it terrified Soviet leaders because their bankrupt economy could never compete.',
    quote: '"Reagan branded Moscow an Evil Empire and launched Star Wars: Soviet planners realized they could not compete."',
    questions: [
      {
        q: 'In March 1983, what famous theological phrase did President Ronald Reagan use to describe the Soviet Union?',
        a: 'An "Evil Empire" (and the focus of evil in the modern world)',
        exp: 'Framed the Cold War not as a conventional balance of power dispute, but as a moral crusade between freedom and totalitarianism.'
      },
      {
        q: 'How much did Ronald Reagan increase American defense spending by between 1981 and 1985?',
        a: 'US defense spending increased by over 40% (to over $300 billion annually)',
        exp: 'Financed massive rearmament, including B-1 bombers, MX Peacekeeper missiles, and a 600-ship US Navy.'
      },
      {
        q: 'In March 1983, what ambitious space-based anti-ballistic missile defense system did Reagan propose?',
        a: 'The Strategic Defence Initiative (SDI / nicknamed "Star Wars")',
        exp: 'Proposed using laser and satellite technology to intercept and destroy Soviet nuclear missiles in flight before they reached America.'
      },
      {
        q: 'Why did the Strategic Defence Initiative directly violate the 1972 SALT 1 ABM Treaty?',
        a: 'The 1972 ABM Treaty strictly banned nationwide anti-ballistic missile defenses and space-based weapons',
        exp: 'Reagan argued SDI was a purely defensive shield that would render nuclear weapons obsolete.'
      },
      {
        q: 'Why was Soviet leader Yuri Andropov terrified by the announcement of SDI?',
        a: 'If America could block Soviet retaliation, the US could launch a first nuclear strike with absolute impunity',
        exp: 'Worse, Soviet scientists calculated that matching US computer and laser technology would bankrupt the USSR.'
      },
      {
        q: 'In September 1983, which civilian airliner was shot down by a Soviet fighter jet after straying into Soviet airspace?',
        a: 'Korean Air Lines Flight 007 (KAL 007)',
        exp: 'Killed all 269 passengers and crew, including a US Congressman; Reagan condemned it as a "massacre" and barbaric atrocity.'
      },
      {
        q: 'In November 1983, what NATO military exercise convinced paranoid Soviet leaders that a real nuclear attack was imminent?',
        a: 'Exercise Able Archer 83',
        exp: 'The USSR placed nuclear-capable air squadrons in East Germany on high alert, bringing superpowers terrifyingly close to war.'
      },
      {
        q: 'What fundamental structural weakness plagued the Soviet planned economy by the early 1980s?',
        a: 'Economic stagnation, chronic shortages of food and basic goods, widespread corruption, and obsolete technology',
        exp: 'Spending up to 25% of national wealth on the military left living standards lagging far behind the capitalist West.'
      },
      {
        q: 'Which three elderly Soviet leaders died in rapid succession between November 1982 and March 1985?',
        a: 'Leonid Brezhnev (1982), Yuri Andropov (1984), and Konstantin Chernenko (1985)',
        exp: 'Led Reagan to remark: "How am I supposed to get anyplace with the Russians if they keep dying on me?"'
      },
      {
        q: 'What fundamental realization did Soviet military planners reach regarding the nuclear arms race by 1985?',
        a: 'The USSR could no longer afford to maintain nuclear parity with the United States',
        exp: 'Paved the way for the appointment of dynamic reformer Mikhail Gorbachev in March 1985.'
      }
    ]
  },
  {
    num: 12,
    kt: 'Key Topic 3',
    topicCode: 'KT 3.4',
    title: 'Gorbachev, Fall of the Wall & Collapse of the USSR (1985–1991)',
    focus: 'Glasnost, Perestroika, INF Treaty (1987), Sinatra Doctrine, 9 Nov 1989, Malta Summit & Dissolution of USSR',
    warning: 'Fatal Examiner Trap: Believing Gorbachev set out to destroy communism. His goal was to rescue and revitalize Soviet socialism through openness and restructuring; however, abandoning the Brezhnev Doctrine unleashed unstoppable democratic revolutions.',
    quote: '"Sinatra Doctrine allowed Eastern Europe to do it their way; on 9 November the Wall fell, and the USSR collapsed."',
    questions: [
      {
        q: 'In March 1985, who became the General Secretary of the Communist Party of the Soviet Union at age 54?',
        a: 'Mikhail Gorbachev',
        exp: 'The youngest member of the Politburo, dedicated to reforming Soviet communism through revolutionary "New Thinking".'
      },
      {
        q: 'What Russian word did Gorbachev use for his policy of political openness and relaxation of press censorship?',
        a: 'Glasnost (openness)',
        exp: 'Allowed public debate, free reporting of state corruption and disasters (like Chernobyl 1986), and freedom of speech.'
      },
      {
        q: 'What Russian word described Gorbachev’s policy of economic restructuring and introducing private enterprise?',
        a: 'Perestroika (restructuring)',
        exp: 'Allowed small private businesses, foreign investment, and decentralized factory management to stimulate production.'
      },
      {
        q: 'In December 1987, what historic arms reduction treaty was signed in Washington by Reagan and Gorbachev?',
        a: 'The INF Treaty (Intermediate-Range Nuclear Forces Treaty)',
        exp: 'Eliminated an entire category of nuclear weapons (all ground-launched cruise and ballistic missiles with ranges 500–5,500km).'
      },
      {
        q: 'What did Gorbachev officially declare regarding the Brezhnev Doctrine in December 1988 at the United Nations?',
        a: 'The USSR would no longer use military force to intervene in Eastern European internal affairs',
        exp: 'Foreign ministry spokesman Gennadi Gerasimov nicknamed this the "Sinatra Doctrine" (they can do it "My Way").'
      },
      {
        q: 'In June 1989, which non-communist trade union won a landslide victory in semi-free elections in Poland?',
        a: 'Solidarity (Solidarnosc), led by Lech Walesa',
        exp: 'Gorbachev refused to intervene, and Tadeusz Mazowiecki became Eastern Europe’s first non-communist prime minister since 1948.'
      },
      {
        q: 'On what historic night did East German authorities mistakenly open crossing points, leading citizens to tear down the Berlin Wall?',
        a: 'Thursday, 9 November 1989',
        exp: 'Spokesman Gunter Schabowski accidentally announced immediate travel freedom; millions celebrated as the Wall was dismantled.'
      },
      {
        q: 'In December 1989, at which summit did George H.W. Bush and Mikhail Gorbachev officially declare the Cold War was over?',
        a: 'The Malta Summit',
        exp: 'Held on cruise ships off Malta; Gorbachev declared the world was leaving an epoch of Cold War and entering peace.'
      },
      {
        q: 'In October 1990, what historic geopolitical event occurred in Germany less than a year after the Wall fell?',
        a: 'The formal reunification of Germany (incorporating the GDR into the Federal Republic)',
        exp: 'Unified Germany remained a member of NATO, representing a total victory for Western democratic diplomacy.'
      },
      {
        q: 'On what date did Mikhail Gorbachev formally resign, resulting in the dissolution of the Soviet Union?',
        a: '25 December 1991 (Christmas Day)',
        exp: 'The Soviet red flag was lowered from the Kremlin and replaced by the Russian tricolour; the Cold War was officially finished.'
      }
    ]
  }
];

const COLD_WAR_ENQUIRY_QUESTIONS = [
  "Why did the wartime Grand Alliance collapse into mutual suspicion at Yalta and Potsdam (1943–1945)?",
  "How did Soviet expansion and the creation of satellite states divide Europe behind an Iron Curtain (1945–1948)?",
  "How did the Truman Doctrine and Marshall Plan establish the American policy of containment (1947–1949)?",
  "Why did the Berlin Crisis of 1948–1949 lead to the permanent division of Germany and the creation of NATO?",
  "How did the nuclear arms race and the Warsaw Pact intensify Cold War rivalry (1949–1958)?",
  "Why did the Soviet Union violently suppress the Hungarian Uprising in 1956?",
  "Why did Khrushchev order the construction of the Berlin Wall in August 1961?",
  "How close did the Cuban Missile Crisis of October 1962 bring the superpowers to the brink of nuclear war?",
  "Why did the Soviet Union invade Czechoslovakia in 1968 and what was the Brezhnev Doctrine?",
  "To what extent did Détente and the SALT agreements reduce Cold War tensions between 1969 and 1979?",
  "Why did the Soviet invasion of Afghanistan in 1979 trigger the 'Second Cold War'?",
  "How did Reagan's SDI, Gorbachev's reforms, and the 1989 revolutions bring about the collapse of the Soviet Union?"
];

const COLD_WAR_MILESTONES = [
  // 1: Grand Alliance & Conferences
  [
    { date: 'Nov 1943', title: 'Tehran Conference (Second Front)' },
    { date: 'Feb 1945', title: 'Yalta Conference (4 Zones & UN)' },
    { date: '12 Apr 1945', title: 'Roosevelt Dies; Truman President' },
    { date: '16 Jul 1945', title: 'US Trinity Atomic Test' },
    { date: 'Jul 1945', title: 'Potsdam Conference (Clashes)' }
  ],
  // 2: Soviet Expansion
  [
    { date: '1945', title: 'Red Army Occupies Eastern Europe' },
    { date: 'Feb 1946', title: 'Kennan\'s Long Telegram' },
    { date: 'Mar 1946', title: 'Churchill\'s Iron Curtain Speech' },
    { date: 'Sep 1947', title: 'Cominform Established' },
    { date: 'Feb 1948', title: 'Czech Communist Coup' }
  ],
  // 3: Containment, Truman Doctrine & Marshall Plan
  [
    { date: 'Mar 1947', title: 'Truman Doctrine Announced' },
    { date: 'Jun 1947', title: 'Marshall Plan Announced' },
    { date: 'Jan 1948', title: 'Bizonia Formed' },
    { date: 'Jan 1949', title: 'Comecon Founded' },
    { date: 'Apr 1949', title: 'NATO Alliance Formed' }
  ],
  // 4: Berlin Blockade & Division
  [
    { date: 'Jun 1948', title: 'Deutschmark Introduced' },
    { date: '24 Jun 1948', title: 'Stalin Begins Berlin Blockade' },
    { date: '26 Jun 1948', title: 'Berlin Airlift Commences' },
    { date: '12 May 1949', title: 'Berlin Blockade Lifted' },
    { date: 'May–Oct 49', title: 'FRG & GDR Established' }
  ],
  // 5: Arms Race & Hungarian Uprising
  [
    { date: 'Aug 1949', title: 'Soviet Atomic Bomb Test' },
    { date: 'Nov 1952', title: 'US Detonates Hydrogen Bomb' },
    { date: 'May 1955', title: 'Warsaw Pact Created' },
    { date: 'Feb 1956', title: 'Khrushchev Secret Speech' },
    { date: 'Nov 1956', title: 'Hungarian Uprising Crushed' }
  ],
  // 6: Berlin Ultimatum & The Wall
  [
    { date: 'Nov 1958', title: 'Berlin Ultimatum (6 Months)' },
    { date: 'May 1960', title: 'U-2 Spy Plane Shot Down' },
    { date: 'Jun 1961', title: 'Vienna Summit Clashes' },
    { date: '13 Aug 1961', title: 'Berlin Wall Erected' },
    { date: 'Jun 1963', title: 'Kennedy "Ich bin ein Berliner"' }
  ],
  // 7: Cuban Missile Crisis
  [
    { date: 'Jan 1959', title: 'Castro\'s Cuban Revolution' },
    { date: 'Apr 1961', title: 'Bay of Pigs Invasion Fails' },
    { date: '14 Oct 1962', title: 'U-2 Spots Soviet Missiles' },
    { date: '22 Oct 1962', title: 'Kennedy Declares Quarantine' },
    { date: '28 Oct 1962', title: 'Missiles Withdrawn from Cuba' }
  ],
  // 8: Prague Spring & Brezhnev Doctrine
  [
    { date: 'Jan 1968', title: 'Dubcek Becomes Leader' },
    { date: 'Apr 1968', title: 'Prague Spring Action Programme' },
    { date: '20 Aug 1968', title: 'Warsaw Pact Invades Czech' },
    { date: 'Sep 1968', title: 'Brezhnev Doctrine Proclaimed' },
    { date: 'Apr 1969', title: 'Husak Begins Normalisation' }
  ],
  // 9: Détente & Treaties
  [
    { date: 'May 1972', title: 'SALT 1 Treaty Signed' },
    { date: 'Jul 1975', title: 'Apollo-Soyuz Space Handshake' },
    { date: 'Aug 1975', title: 'Helsinki Accords Signed' },
    { date: 'Jun 1979', title: 'SALT 2 Signed in Vienna' },
    { date: 'Dec 1979', title: 'NATO Pershing II Decision' }
  ],
  // 10: Afghanistan & Second Cold War
  [
    { date: '25 Dec 1979', title: 'Soviet Invasion of Afghanistan' },
    { date: 'Jan 1980', title: 'Carter Doctrine Announced' },
    { date: 'Jul 1980', title: 'US Boycotts Moscow Olympics' },
    { date: 'Jan 1981', title: 'Reagan Takes Presidential Oath' },
    { date: 'Mar 1983', title: 'Reagan Launches SDI (Star Wars)' }
  ],
  // 11: Gorbachev\'s New Thinking
  [
    { date: 'Mar 1985', title: 'Gorbachev General Secretary' },
    { date: 'Nov 1985', title: 'Geneva Summit' },
    { date: 'Oct 1986', title: 'Reykjavik Summit' },
    { date: 'Dec 1987', title: 'INF Treaty Scraps Missiles' },
    { date: 'Dec 1988', title: 'Gorbachev Cuts Troops at UN' }
  ],
  // 12: Collapse of Soviet Control
  [
    { date: 'Jun 1989', title: 'Solidarity Wins in Poland' },
    { date: '9 Nov 1989', title: 'Berlin Wall Falls' },
    { date: 'Dec 1989', title: 'Malta Summit Ends Cold War' },
    { date: 'Oct 1990', title: 'German Reunification' },
    { date: '25 Dec 1991', title: 'Gorbachev Resigns; USSR Dies' }
  ]
];

const mappedEnquiries = enquiries.map((enq, idx) => ({
  number: enq.num,
  keyTopic: enq.kt,
  topicCode: enq.topicCode,
  title: enq.title,
  focus: enq.focus,
  enquiryQuestion: COLD_WAR_ENQUIRY_QUESTIONS[idx] || enq.title,
  examinerWarning: enq.warning,
  footerQuote: enq.quote,
  milestones: COLD_WAR_MILESTONES[idx] || [],
  questions: enq.questions.slice(0, 8).map((q, qIdx) => ({
    num: qIdx + 1,
    q: q.q,
    a: q.a,
    exp: q.exp
  }))
}));

module.exports = {
  unitId: 'cold_war',
  unitTitle: 'Superpower Relations and the Cold War, 1941–1991',
  paperCode: 'Pearson Edexcel GCSE (9–1) History • Paper 2: Period Study (Option P4)',
  heroImage: 'images/berlin_wall_fall_1989.jpg',
  heroCaption: 'Source A: Jubilant citizens atop the Berlin Wall in front of the Brandenburg Gate following the opening of border crossings (10 November 1989). German Federal Archives (Bundesarchiv Bild 183-1989-1110-018).',
  enquiries: mappedEnquiries,
  bankPages: [
    { title: 'Enquiries 1–4: Key Topic 1 Origins of the Cold War (1941–1958)', startQ: 1, endQ: 32, pageNum: 14 },
    { title: 'Enquiries 5–8: Key Topic 2 Cold War Crises (1958–1970)', startQ: 33, endQ: 64, pageNum: 15 },
    { title: 'Enquiries 9–12: Key Topic 3 Détente to the Fall of the USSR (1970–1991)', startQ: 65, endQ: 96, pageNum: 16 }
  ]
};
