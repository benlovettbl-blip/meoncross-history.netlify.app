const fs = require('fs');
const path = require('path');

const dataFile = path.resolve(__dirname, '../units/cme_new/data.js');
const publicDataFile = path.resolve(__dirname, '../public/units/cme_new/data.js');

const cme12MultiLensVideos = [
  // Lesson 1: KT 1.0 Broken Promises & Imperial Borders (1914–1939)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fGH94HoSJ2s',
      title: 'Imperial War Museums: Britain\'s WWI Gamble & The Origins of the Conflict',
      duration: '15 mins 44 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Examines how Britain made contradictory wartime promises to Arab leaders (McMahon-Hussein Correspondence) and Zionists (Balfour Declaration) to secure imperial dominance in the Middle East. Recommended Starter Watch Window: 00:00–04:30.',
      viewing_task: 'Why did British wartime diplomacy in 1915–1917 result in contradictory promises to Arab nationalists and Zionist leaders?',
      model_answer: 'During WWI, Britain prioritized securing its imperial routes to India and defeating the Ottoman Empire. In 1915–16, Sir Henry McMahon offered Sharif Hussein of Mecca British recognition of independent Arab lands in exchange for an Arab revolt against Turkish forces. Simultaneously, Britain concluded the secret 1916 Sykes-Picot Agreement with France to carve up Ottoman provinces, and in November 1917 issued the Balfour Declaration supporting a \'Jewish national home\' to rally international support. These mutually exclusive commitments created structural mistrust and laid the groundwork for decades of communal conflict.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=kbdvn8QHyX8',
      title: 'The Economist: The Balfour Declaration\'s Impact, 100 Years On',
      duration: '8 mins 03 secs',
      pathway: 'Strategic Overview',
      teacher_guidance: 'Rigorous journalistic analysis of the 67-word Balfour Declaration, contrasting Jewish national aspirations with Palestinian Arab dispossession.',
      viewing_task: 'How did the deliberate ambiguity of the 67-word Balfour Declaration fuel conflicting expectations between Jewish pioneers and Palestinian Arabs?',
      model_answer: 'The Balfour Declaration intentionally used vague wording: it promised British support for the \'establishment in Palestine of a national home for the Jewish people\' without defining whether this meant a sovereign state. Crucially, it added a safeguarding clause stating \'nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities\', conspicuously omitting political and national rights for the 90% Arab majority. Zionists viewed the document as a binding imperial mandate for statehood, whereas Arabs viewed it as colonial betrayal of their right to self-determination.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=pjtQ4Jmxh_8',
      title: 'Imperial War Museums: Mandatory Palestine, The 1936 Arab Revolt & The 1939 White Paper',
      duration: '14 mins 32 secs',
      pathway: 'Palestinian Perspective',
      teacher_guidance: 'Investigates the breakdown of British Mandate governance during the 1930s, escalating Jewish immigration fleeing European Nazism, the general strike of 1936, and the 1939 White Paper immigration caps.',
      viewing_task: 'How did the 1936–1939 Arab Revolt force the British government to reverse its policy through the 1939 White Paper?',
      model_answer: 'Widespread Palestinian Arab unrest against British colonial rule and surging Jewish immigration culminated in the 1936 General Strike and armed guerrilla rebellion. Britain suppressed the revolt through harsh military measures, but with World War II looming, London realized it could not afford an Arab rebellion that would jeopardize the Suez Canal and Middle Eastern oil supplies. Consequently, Britain issued the 1939 White Paper, capping Jewish immigration at 75,000 over five years and restricting land sales, alienating Zionists just as Nazi persecution escalated across Europe.'
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/14-israel-and-the-arab-states-twentieth-century-history/',
      title: 'BBC / ERA: Israel and the Arab States – The Collapse of the Mandate',
      duration: '20 mins 07 secs',
      pathway: 'Documentary',
      teacher_guidance: 'Authoritative BBC archive documentary covering the League of Nations Mandate, escalating communal violence, and Britain\'s postwar decision to abandon Palestine.',
      viewing_task: 'Why did Mandatory Palestine become ungovernable for the British Empire following the Second World War?',
      model_answer: 'Following WWII, Britain faced simultaneous violent opposition: Jewish underground militias (Haganah, Irgun, Lehi) launched an armed insurgency to force open immigration for Holocaust survivors, while Arab leaders adamantly opposed partition. Strained by domestic post-war bankruptcy, severe economic austerity, and international diplomatic condemnation, Britain could no longer sustain the human and financial cost of military policing, prompting Prime Minister Attlee to refer the problem to the United Nations in February 1947.'
    }
  ],

  // Lesson 2: KT 1.1 End of the British Mandate & Creation of Israel (1945–1949)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=5M6d45bHffE',
      title: 'British Pathé: King David Hotel Bombing Newsreel (July 1946)',
      duration: '3 mins 16 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Contemporary British newsreel recording the devastation of the British military headquarters in Jerusalem, reflecting 1946 British public outrage.',
      viewing_task: 'What does this contemporary British newsreel reveal about the impact of the King David Hotel bombing on British public opinion and mandate policy?',
      model_answer: 'The British Pathé newsreel captures the intense shock and outrage in post-war Britain following the Irgun\'s bombing of the King David Hotel, which killed 91 British, Arab, and Jewish civil servants and soldiers. By depicting the wreckage in terms reminiscent of the London Blitz and emphasizing the loss of British lives, the footage shows how Mandate policing had become politically toxic at home, convincing the British public and government that maintaining control in Palestine was untenable.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=EDSxwh3uu9c',
      title: 'Unpacked (Avi Posen): Resolution 181 – The Zionist Dream & Acceptance of Partition',
      duration: '8 mins 40 secs',
      pathway: 'Israeli Perspective',
      teacher_guidance: 'Avi Posen examines the 29 November 1947 UN vote partitioning Palestine, Jewish post-Holocaust relief, Ben-Gurion\'s pragmatism, and why Zionists accepted the plan despite painful territorial concessions.',
      viewing_task: 'How does the presenter explain the Jewish leadership\'s decision to accept UN Resolution 181 despite territorial compromises?',
      model_answer: 'Avi Posen explains that the Jewish Agency under David Ben-Gurion prioritized sovereign statehood above all else after the extermination of six million European Jews in the Holocaust. Even though the UN map granted no contiguous border, designated Jerusalem as an international zone under UN control, and included large areas of desert in the Negev, international legal recognition of a sovereign Jewish homeland was viewed as an existential necessity that outweighed territorial grievances.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=2yBolHdMejM',
      title: 'Janux: Palestine Population & Jewish Immigration (1880–1948)',
      duration: '7 mins 57 secs',
      pathway: 'Palestinian Perspective',
      teacher_guidance: 'Academic demographic analysis illustrating why Palestinian Arabs viewed UN partition as a catastrophic demographic injustice: allocating 55% of the land to a community that constituted one-third of the population.',
      viewing_task: 'Why did Palestinian Arabs and neighboring Arab states view the 1947 UN Partition Plan as inherently unjust and undemocratic?',
      model_answer: 'The analysis shows that Arab opposition was rooted in fundamental democratic and territorial principles. In 1947, Palestinian Arabs constituted roughly two-thirds of the population and legally owned the vast majority of private cultivated land. Allocating 55% of Palestine to the Jewish minority—and placing hundreds of thousands of Arab villagers within the borders of the proposed Jewish state without their consent—was seen as a direct violation of their right to self-determination, leading to total rejection of the partition resolution.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=xrajtE16JEo',
      title: 'Otto Preminger\'s "Exodus" (1960) Theatrical Trailer starring Paul Newman',
      duration: '2 mins 48 secs',
      pathway: 'Cinematic',
      teacher_guidance: 'Hollywood epic dramatization of Leon Uris\'s bestselling novel depicting Holocaust survivors defying the British Mandate naval blockade aboard the SS Exodus. Illustrates how 1960s Western cinema romanticized the Zionist founding narrative.',
      viewing_task: 'How does cinematic dramatisation in the 1960 trailer of "Exodus" construct a heroic narrative of state-building, and what perspectives are omitted?',
      model_answer: 'The trailer frames the creation of Israel as an epic, heroic saga of freedom fighters overcoming British imperial resistance and hostile desert terrain, personified by charismatic Hollywood star Paul Newman. By framing the conflict as a righteous moral struggle of vulnerable refugees against insurmountable odds, the cinematic dramatization captured Western popular imagination, but completely erased the presence, history, and dispossession of the indigenous Palestinian Arab population.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=IhfysdHgGh8',
      title: 'BBC / PBS: The 50 Years War – Land Divided (1947–1956)',
      duration: '49 mins 26 secs',
      pathway: 'Documentary',
      teacher_guidance: 'Definitive oral history documentary featuring frank on-camera interviews with Israeli veterans, Arab commanders, British diplomats, and eyewitnesses to the 1947–48 transition. Recommended Watch Window: 00:00–12:00.',
      viewing_task: 'How did the British withdrawal on 14 May 1948 trigger the immediate escalation from civil conflict to interstate war?',
      model_answer: 'As British forces withdrew without supervising an orderly transfer of power, David Ben-Gurion proclaimed the establishment of the State of Israel in Tel Aviv on 14 May 1948. Within hours, regular armies from five neighboring Arab states (Egypt, Transjordan, Syria, Lebanon, and Iraq) intervened, transforming a localized civil war between Jewish militias and Palestinian irregulars into the first full-scale Arab-Israeli interstate war.'
    }
  ],

  // Lesson 3: KT 1.2 Aftermath of the 1948–49 War & The Palestinian Refugee Crisis
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=OhQ7yfI0Nbo',
      title: 'ForCriticalThinkers: 1948 – War of Independence or Al-Nakba?',
      duration: '6 mins 00 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Essential conceptual starter comparing the diametrically opposed historical memories of 1948: miraculous national rebirth vs catastrophic displacement.',
      viewing_task: 'Explain why the events of 1948 are remembered simultaneously as a \'War of Independence\' by Israelis and \'Al-Nakba\' by Palestinians.',
      model_answer: 'For Israelis, 1948 represents the miraculous realization of national self-determination, existential survival against superior enemy forces, and a sanctuary for survivors of the Shoah. For Palestinians, 1948 is known as Al-Nakba (\'The Catastrophe\'), representing the physical destruction of over 400 villages, the loss of homeland, and the permanent displacement of approximately 700,000–750,000 Palestinian Arabs who became stateless refugees without a recognized right of return.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=wjysy7ONisA',
      title: 'Unpacked (Avi Posen): 1948 Israeli War of Independence & Defence of Statehood',
      duration: '10 mins 42 secs',
      pathway: 'Israeli Perspective',
      teacher_guidance: 'Avi Posen examines the military balance in 1948, the initial Arab advances, Haganah reorganization into the IDF, and the acquisition of Czechoslovak weapons during the first UN truce. Recommended Watch Window: 00:00–06:00.',
      viewing_task: 'What tactical factors enabled the newly formed IDF to overcome the initial invasion by five Arab armies during the 1948 war?',
      model_answer: 'Although initially outgunned in heavy artillery and aircraft, Israeli forces possessed unified command under David Ben-Gurion, superior military motivation, and high combat readiness forged in WWII. During the first UN truce in June 1948, Israel broke the international arms embargo by securing critical shipments of rifles, machine guns, and Messerschmitt aircraft from Czechoslovakia. Furthermore, the Arab armies suffered from deep political rivalries, lack of coordination, and conflicting territorial ambitions (especially between Transjordan\'s King Abdullah and Egypt), allowing the IDF to defeat them piecemeal.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=megzzpTWajg',
      title: 'Al Jazeera English: How Did the Nakba Happen? The 1948 Refugee Crisis',
      duration: '6 mins 13 secs',
      pathway: 'Palestinian Perspective',
      teacher_guidance: 'Examines the expulsion and flight of 700,000+ Palestinian Arabs, the controversy surrounding Plan Dalet, the Deir Yassin massacre, and the creation of UNRWA refugee camps.',
      viewing_task: 'What multiple causes led to the mass displacement of over 700,000 Palestinian Arabs during the 1948–49 War?',
      model_answer: 'Historians identify a combination of factors: fear of military violence amplified by atrocities such as the April 1948 Deir Yassin massacre; direct expulsions by Jewish forces under Plan Dalet in strategic corridors (such as Lydda and Ramle); the flight of Palestinian community elites leaving society leaderless; and panic caused by collapsing civil infrastructure. Following the 1949 armistices, Israel refused to permit the refugees to return, citing security and demographic survival, while Arab host states (except Jordan) largely kept refugees in disenfranchised camps, establishing a chronic grievance.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=eTMRMX7Pw5U',
      title: 'TRT World: The 1949 Armistice Agreements & The Reshaped Borders',
      duration: '5 mins 29 secs',
      pathway: 'Strategic Overview',
      teacher_guidance: 'Examines the Green Line armistice borders agreed in Rhodes in 1949, Israel\'s territorial expansion to 78% of the mandate, and the division of Jerusalem.',
      viewing_task: 'How did the 1949 Armistice Agreements alter the political map of Mandatory Palestine?',
      model_answer: 'The 1949 armistices established the Green Line: Israel expanded its control to 78% of Mandatory Palestine (far exceeding the 55% allocated by UN Resolution 181). The proposed Palestinian Arab state was erased: Transjordan annexed the West Bank and East Jerusalem, while Egypt occupied the Gaza Strip. Jerusalem was divided by barbed wire and minefields between Israeli West Jerusalem and Jordanian East Jerusalem.'
    }
  ],

  // Lesson 4: KT 1.3 Increased Tension, Nasser, and the Suez Crisis (1955–1963)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=0e7LZu_ceZQ',
      title: 'The History Channel: Why the 1956 Suez Crisis Brought the World to the Brink',
      duration: '3 mins 45 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Fast-paced overview of Gamal Abdel Nasser, the Egyptian nationalisation of the Suez Canal Company on 26 July 1956, and the Anglo-French crisis.',
      viewing_task: 'Why did President Nasser\'s nationalisation of the Suez Canal provoke such fury from Britain and France?',
      model_answer: 'Britain and France regarded the Suez Canal as their paramount strategic lifeline, connecting Europe to Persian Gulf oil and imperial trade. Furthermore, British Prime Minister Anthony Eden viewed Nasser\'s Pan-Arab nationalist defiance as an existential threat to British prestige in the Middle East, misjudging Nasser as an \'Egyptian Hitler\' who had to be deposed before he unified the Arab world against Western interests.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fwRFhmcfHgg',
      title: 'Epic History TV: The Brink of War – The Suez Crisis (Part 1)',
      duration: '14 mins 04 secs',
      pathway: 'Strategic Overview',
      teacher_guidance: 'Detailed cartographic breakdown of the secret Protocol of Sèvres collusion between Britain, France, and Israel to stage an Israeli attack on Sinai to justify Anglo-French intervention. Recommended Watch Window: 00:00–07:30.',
      viewing_task: 'What was the secret Protocol of Sèvres, and what were the strategic motives of Britain, France, and Israel in concluding it?',
      model_answer: 'Signed in October 1956 at Sèvres, the secret agreement arranged that Israel would invade the Sinai Peninsula; Britain and France would then issue an ultimatum to both combatants to withdraw from the Canal, and when Egypt predictably refused, Anglo-French paratroopers would land to \'separate the armies\' and seize the canal. Israel sought to eliminate Egyptian fedayeen bases and reopen the blockaded Straits of Tiran; France wished to punish Nasser for funding Algerian FLN rebels; and Britain sought to topple Nasser and regain control of the canal.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=WwkKiv4AYVY',
      title: 'Epic History TV: A Global Flashpoint – The Suez Crisis (Part 2)',
      duration: '14 mins 56 secs',
      pathway: 'Strategic Overview',
      teacher_guidance: 'Examines President Eisenhower\'s financial ultimatum threatening to crash the British pound, Soviet nuclear threats, and the permanent decline of European imperial power. Recommended Watch Window: 00:00–06:30.',
      viewing_task: 'Why was the Suez Crisis considered a total diplomatic disaster for Britain and France, but a political triumph for Nasser?',
      model_answer: 'US President Dwight Eisenhower, furious at not being consulted and anxious not to push the Arab world into Soviet arms, refused IMF loans and threatened to dump US holdings of sterling unless British forces withdrew immediately. Humiliated, Britain and France were forced into an ignominious retreat, proving they were no longer global superpowers. Nasser emerged as a hero of anti-colonial Pan-Arabism across the developing world, retaining control of the Suez Canal despite military defeat in Sinai.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=43DqkyuItH8',
      title: 'France Télévisions / Best Documentary: Nasser: From Dream to Disaster',
      duration: '53 mins 04 secs',
      pathway: 'Arab Perspective',
      teacher_guidance: 'In-depth documentary exploring Nasser\'s domestic reforms, radio diplomacy (Voice of the Arabs), and the anti-imperialist mobilization of the Arab world.',
      viewing_task: 'How did President Nasser leverage Pan-Arab anti-colonial sentiment to unify public opinion across the Middle East?',
      model_answer: 'Nasser utilized the powerful state radio station \'Voice of the Arabs\' to broadcast fiery anti-imperialist speeches directly into the homes and cafes of ordinary citizens from Morocco to Iraq. By nationalizing the Suez Canal and standing up to former colonial masters Britain and France, he transformed himself into the undisputed champion of Arab dignity and self-determination, demonstrating that developing nations could successfully resist imperial control.'
    }
  ],

  // Lesson 5: KT 2.1 Road to the Six-Day War (1964–1967)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=jitbYp16w5w',
      title: 'Historical Archive: Who Will Fire First? The May 1967 Brinkmanship',
      duration: '7 mins 23 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Dramatic breakdown of the rapid diplomatic unraveling in May 1967: Soviet false intelligence, Nasser massing 100,000 troops in Sinai, expelling UNEF, and blockading the Straits of Tiran.',
      viewing_task: 'Why did Israel consider Nasser\'s closure of the Straits of Tiran on 22 May 1967 an explicit act of war (casus belli)?',
      model_answer: 'The Straits of Tiran formed Israel\'s sole maritime access to the Red Sea, Indian Ocean trade, and vital Persian crude oil imports through the southern port of Eilat. Following the 1956 Suez Crisis, international guarantees had affirmed that closing the straits to Israeli navigation would constitute an act of war. By expelling UNEF peacekeepers and reimposing the maritime blockade, Nasser severed Israel\'s commercial artery and forced the Israeli government to mobilize its civilian reserve army, paralyzing its economy.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=WqfvoxFnBo4',
      title: 'Historical Documentary: The War Over Water & Syrian Border Clashes (1964–1966)',
      duration: '7 mins 43 secs',
      pathway: 'Strategic Overview',
      teacher_guidance: 'Explores the Jordan River diversion disputes, Israeli air and artillery strikes on Syrian earthmoving machinery, and the escalation of cross-border skirmishes on the Golan Heights.',
      viewing_task: 'How did the dispute over freshwater resources and cross-border shelling between Syria and Israel escalate tensions prior to 1967?',
      model_answer: 'In 1964, Israel completed its National Water Carrier to irrigate the Negev desert. The Arab League responded with the Headwater Diversion Scheme to divert the tributaries of the Jordan River in Syria and Lebanon. Israel launched tank and artillery strikes to destroy Syrian construction machinery. Syrian forces entrenched on the commanding Golan Heights responded by relentlessly shelling Israeli kibbutzim in the Hula Valley below, prompting dogfights between Israeli Mirages and Syrian MiGs, bringing the region to the verge of open war.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=44u2JfQg9z8',
      title: 'Gulf News / Archival: May 1967: Nasser, Arab Alliances & Soviet Warnings',
      duration: '3 mins 22 secs',
      pathway: 'Arab Perspective',
      teacher_guidance: 'Examines the impact of Moscow\'s fabricated reports alleging Israeli troop concentrations against Syria, Nasser\'s public bravado, and King Hussein of Jordan signing a mutual defence pact with Egypt.',
      viewing_task: 'What role did Soviet disinformation and Arab regional public pressure play in pushing President Nasser toward war in May 1967?',
      model_answer: 'On 13 May 1967, the Soviet Union provided false intelligence reports to Egypt claiming Israel was massing twelve brigades on the Syrian border to invade. Taunted by Jordan and Saudi Arabia for hiding behind UN peacekeepers, Nasser felt compelled to demonstrate Arab leadership. He deployed heavy armor into the Sinai, expelled the UN Emergency Force (UNEF), and delivered fiery speeches promising the destruction of Israel. When King Hussein flew to Cairo to sign a joint military pact, Israel found itself encircled by coordinated Arab armies.'
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/s3e6-battle-for-the-holy-city-the-six-day-war-days-that-shook-the-world/',
      title: 'BBC / ERA: Days That Shook the World – The Six-Day War (Part 1)',
      duration: '59 mins 02 secs',
      pathway: 'Documentary',
      teacher_guidance: 'Superb BBC reconstruction tracking the 3-week waiting period (Hamtana), Israeli domestic panic, and the decision to launch Operation Focus. Recommended Watch Window: 00:00–10:30.',
      viewing_task: 'Why did the Israeli cabinet conclude that a pre-emptive strike was essential for national survival by early June 1967?',
      model_answer: 'Israel\'s military doctrine relied on rapid offensive action because the country lacked geographical depth and its economy could not sustain a prolonged mobilization of its civilian reservists. As Arab armies massed along all three borders and diplomatic mediation by the US and European powers failed to reopen the Straits of Tiran, the Israeli coalition government under Levi Eshkol and Defence Minister Moshe Dayan decided that striking first to eliminate the Egyptian Air Force was the only way to avoid catastrophic destruction.'
    }
  ],

  // Lesson 6: KT 2.2 The Six-Day War (June 1967)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=B60O6Kcijso',
      title: 'The History Channel: How the Six-Day War Changed the Map of the Middle East',
      duration: '6 mins 45 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Visual tactical recap of the morning of 5 June 1967: 200 Israeli aircraft flying under Egyptian radar to destroy airbases in 3 hours.',
      viewing_task: 'How was the Six-Day War virtually decided in the first three hours of combat on the morning of 5 June 1967?',
      model_answer: 'In Operation Focus, nearly the entire Israeli Air Force flew low over the Mediterranean beneath Egyptian radar coverage, striking Egyptian airfields while pilots were eating breakfast. Using specialized cratering bombs, the IAF destroyed runways and obliterated over 300 Egyptian warplanes on the ground within three hours. Having achieved total command of the skies, Israeli ground forces could advance in Sinai without fear of enemy airstrikes while providing devastating close air support against retreating Arab armor.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=h7wiiKSYrv8',
      title: 'Real Time History: The Six-Day War Combat Timeline Across Three Fronts',
      duration: '22 mins 55 secs',
      pathway: 'Strategic Overview',
      teacher_guidance: 'Objective, non-partisan military analysis explaining the collapse of Egyptian forces in the Sinai passes, Jordanian artillery shelling of Tel Aviv and Israeli counter-attack, and the storming of the Golan Heights. Recommended Watch Window: 00:00–08:30.',
      viewing_task: 'Explain the key military reasons for the swift collapse of Egyptian, Jordanian, and Syrian defenses during the Six-Day War.',
      model_answer: 'The primary reason was absolute Israeli air supremacy from hour one. Furthermore, Egyptian Field Marshal Amer panicked and ordered a chaotic general retreat through the narrow Sinai passes, turning his forces into easy targets. On the Jordanian front, despite fierce resistance at Ammunition Hill, Jordanian forces were outflanked and lacked air cover. On the Syrian front, Israeli armored bulldozers and infantry scaled the fortified basalt cliffs of the Golan Heights, exploiting the fact that Syrian forces were demoralized by false Egyptian radio reports claiming victory.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=F4GGpOxJW7I',
      title: 'Unpacked (Avi Posen): The Battle for the Old City & Reunification of Jerusalem',
      duration: '9 mins 30 secs',
      pathway: 'Israeli Perspective',
      teacher_guidance: 'Avi Posen recounts the intense urban fighting in East Jerusalem, Paratroopers reaching the Western Wall, and the profound religious and national euphoria across Israel.',
      viewing_task: 'How does the presenter articulate the religious and historical significance of capturing the Western Wall for the Jewish people in 1967?',
      model_answer: 'Avi Posen highlights that for nearly two millennia since the Roman destruction of the Second Temple—and specifically during the 19 years of Jordanian rule from 1948 to 1967 when Jews were barred from visiting—access to the Western Wall was denied. Paratroopers reaching the Wall and hearing Shlomo Goren blow the shofar represented the emotional culmination of 2,000 years of exile and prayers, fundamentally transforming Jerusalem from a divided border city into what Israelis declared their unified, eternal capital.'
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/s3e6-battle-for-the-holy-city-the-six-day-war-days-that-shook-the-world/',
      title: 'BBC / ERA: Battle for the Holy City (Days That Shook the World)',
      duration: '59 mins 02 secs',
      pathway: 'Documentary',
      teacher_guidance: 'Dramatic BBC reconstruction of urban combat in Jerusalem, King Hussein\'s dilemmas, and the UN ceasefire negotiations. Recommended Watch Window: 10:00–22:00.',
      viewing_task: 'How did King Hussein of Jordan\'s fateful decision to enter the war lead directly to the loss of the West Bank and East Jerusalem?',
      model_answer: 'Despite Israeli Prime Minister Eshkol sending urgent diplomatic messages urging Jordan to stay out of the war, King Hussein was misled by Nasser\'s fabricated claims that Egypt had destroyed 75% of the Israeli air force. Fearing domestic overthrow if he stayed idle, Jordan began shelling West Jerusalem and Tel Aviv. The IDF immediately counter-attacked, encircling East Jerusalem and pushing Jordanian forces across the Jordan River within 48 hours, stripping Jordan of its most economically and religiously valuable territory.'
    }
  ],

  // Lesson 7: KT 2.3 Conquered Territories & UN Resolution 242
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=s7zFGaUPGUA',
      title: 'Janux: UN Resolution 242 & The "Land for Peace" Formula',
      duration: '5 mins 10 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Clear academic explanation of the diplomatic compromise engineered by Lord Caradon in November 1967 and the linguistic dispute over \'territories\'.',
      viewing_task: 'Explain the fundamental compromise embodied in UN Resolution 242\'s \'Land for Peace\' formula, and why its wording caused permanent controversy.',
      model_answer: 'UN Resolution 242 established the principle that Israel should withdraw from territories occupied during the Six-Day War in exchange for Arab recognition, peace, and \'secure and recognized boundaries\'. Controversy erupted because the English version called for withdrawal from \'territories occupied\' (suggesting partial withdrawal to defensible borders), while the French version read \'des territoires occupés\' (implying all territories). Arab states insisted on complete withdrawal, whereas Israel argued borders were subject to negotiation.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=LYhJOjv0Yc8',
      title: 'Middle East Eye / Archival: The Khartoum Summit & The "Three Noes" (1967)',
      duration: '4 mins 15 secs',
      pathway: 'Arab Perspective',
      teacher_guidance: 'Investigates the Arab League summit in Sudan in August 1967, the adoption of the \'Three Noes\' doctrine, and the refusal to recognize Israel.',
      viewing_task: 'Why did the Arab League adopt the \'Three Noes\' at the Khartoum Summit, and how did this entrench the diplomatic stalemate?',
      model_answer: 'Meeting in Khartoum in August 1967, Arab leaders sought to rebuild shattered collective prestige and prevent individual states from signing separate surrenders with Israel. They issued the \'Three Noes\': \'No peace with Israel, no recognition of Israel, no negotiations with it\'. By ruling out direct diplomacy, the resolution blocked Israeli hopes of trading the captured Sinai and West Bank for immediate treaties, hardening Israeli domestic attitudes toward retaining the conquered lands for strategic depth.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=E0uLbeQlwjw',
      title: 'Vox: Israeli Settlements Explained – The West Bank & Gaza After 1967',
      duration: '8 mins 05 secs',
      pathway: 'Strategic Overview',
      teacher_guidance: 'Balanced journalistic breakdown tracing the Allon Plan, early agricultural buffer settlements, and the rise of Gush Emunim religious nationalism.',
      viewing_task: 'How did the creation of Israeli settlements in the West Bank and Gaza alter the demographic and legal reality of the conquered territories?',
      model_answer: 'Initially, Israeli settlement policy followed the 1967 Allon Plan, establishing security outposts in the Jordan Valley to serve as a defense buffer while avoiding densely populated Arab areas. However, following the 1977 election of Menachem Begin\'s Likud party, religious-nationalist groups like Gush Emunim were actively backed to build deep within the biblical heartlands of Judea and Samaria. Over subsequent decades, settlements, bypass roads, and military zones carved up the West Bank, making territorial separation and a viable two-state solution extraordinarily complex.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=IhfysdHgGh8',
      title: 'BBC / PBS: The 50 Years War – Six Days in June and the Occupation',
      duration: '49 mins 26 secs',
      pathway: 'Documentary',
      teacher_guidance: 'Eye-opening interviews with Israeli ministers debating whether to hold or return the West Bank, and Palestinian residents describing living under military administration. Recommended Watch Window: 35:00–49:00.',
      viewing_task: 'What domestic dilemmas did Israel face regarding the 1 million Palestinian residents in the newly conquered territories?',
      model_answer: 'Israel faced a profound demographic and democratic dilemma: annexing the West Bank and Gaza would incorporate over one million Palestinians, threatening Israel\'s Jewish majority or requiring denying them voting rights, destroying democratic legitimacy. Conversely, unilaterally withdrawing without a peace treaty was seen as inviting hostile forces to within miles of Tel Aviv. Consequently, Israel instituted a military occupation regime, postponing any definitive political status.'
    }
  ],

  // Lesson 8: KT 2.4 Palestinian Resistance: The PLO, Black September & Munich (1968–1972)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=SOLg_p4ScAU',
      title: 'BBC Archive: The Munich Olympics 1972 Black September Hostage Crisis',
      duration: '8 mins 20 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Archival footage and news reports of the 5 September 1972 terror attack on Israeli athletes in the Olympic Village, highlighting the shock of global live television.',
      viewing_task: 'Why did the Black September attack on the 1972 Munich Olympic Games cause such profound international shock and alter global security policy?',
      model_answer: 'The Munich attack occurred during the \'Peace Olympics\' in Germany, intended to show a new democratic Germany 36 years after Hitler\'s 1936 Berlin Games. Broadcast live to 900 million viewers worldwide, terrorists breached the village, murdered two athletes, and took nine hostage, before a botched German rescue at Fürstenfeldbruck airfield ended with all nine hostages, a German policeman, and five terrorists dead. The tragedy forced Western nations to establish specialized counter-terror units (such as GSG-9 and the SAS) and dramatically tightened airport and sporting security.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=try3LAQxSAE',
      title: 'Balance of Power: Black September – The Jordanian Civil War & PLO Expulsion',
      duration: '13 mins 51 secs',
      pathway: 'Palestinian Perspective',
      teacher_guidance: 'Examines how the PFLP\'s Dawson\'s Field hijackings precipitated King Hussein\'s military crackdown against the PLO, Syrian intervention, and the PLO\'s relocation to Lebanon. Recommended Watch Window: 00:00–07:30.',
      viewing_task: 'Why did King Hussein of Jordan decide to wage war against Palestinian guerrilla organizations in September 1970?',
      model_answer: 'Following the 1968 Battle of Karameh, the PLO operated as a virtual \'state-within-a-state\' in Jordan, openly carrying weapons, establishing checkpoints, and flouting royal law. The crisis peaked in September 1970 when the Marxist PFLP hijacked three Western airliners, blew them up on Dawson\'s Field in the Jordanian desert, and humiliated the King before global cameras. Fearing his throne was at stake, King Hussein mobilized the Jordanian Arab Army, brutally crushing Palestinian militias in heavy urban fighting and expelling the PLO to Lebanon.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=D3K9VJ6dhNQ',
      title: 'Unpacked (Avi Posen): The Munich Massacre & Operation Wrath of God',
      duration: '11 mins 08 secs',
      pathway: 'Israeli Perspective',
      teacher_guidance: 'Avi Posen examines Prime Minister Golda Meir\'s authorized Mossad retaliation campaign targeting Black September planners across Europe, and the moral fallout from the Lillehammer affair. Recommended Watch Window: 00:00–06:00.',
      viewing_task: 'How does Avi Posen frame the moral and strategic dilemma facing Golda Meir when ordering Operation Wrath of God?',
      model_answer: 'Avi Posen explains that Golda Meir faced intense pressure to protect Jews worldwide from international terrorism and establish deterrence, concluding that if sovereign European states could not protect Israeli citizens, Israel had to act as their defender. However, he also addresses the severe moral complications: operating outside legal due process, conducting targeted killings on neutral European soil, and the catastrophic intelligence failure in Lillehammer where Mossad killed an innocent Moroccan waiter, prompting profound soul-searching within Israel\'s security establishment.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=OuT_uh0CAf8',
      title: 'Steven Spielberg\'s "MUNICH" (2005) Theatrical Trailer | Amblin',
      duration: '2 mins 22 secs',
      pathway: 'Cinematic',
      teacher_guidance: 'Steven Spielberg\'s acclaimed film depicting the moral torment of the Mossad assassination squad sent to eliminate Black September operatives. Starring Eric Bana and Daniel Craig.',
      viewing_task: 'How does Spielberg\'s film depict the psychological toll and cyclical nature of retaliatory counter-terrorism?',
      model_answer: 'Spielberg\'s trailer focuses on the psychological disintegration and moral disillusionment of the Mossad agents, led by Avner (Eric Bana). Rather than presenting a triumph of vengeance, the cinematic narrative emphasizes paranoia, moral ambiguity, and the realization that assassinating one terrorist operative merely invites a more ruthless successor, highlighting the tragic cycle of violence where retaliation fails to bring peace or security.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Azud40CQ3IE',
      title: 'Paramount Pictures: "SEPTEMBER 5" (2024) Official Theatrical Trailer',
      duration: '2 mins 23 secs',
      pathway: 'Cinematic',
      teacher_guidance: 'Dramatization of the ABC Sports broadcasting crew thrust into covering the live Munich Olympic terror hostage crisis, exploring how terrorism became a global television event.',
      viewing_task: 'How did the Munich Olympic attack transform television broadcasting and international terrorism into a live media spectacle?',
      model_answer: 'The trailer illustrates the harrowing ethical challenge faced by ABC Sports journalists when sports broadcasting abruptly collided with live hostage-taking. By broadcasting gunmen on balconies directly into global living rooms, the film demonstrates how Black September recognized that media saturation could amplify their political message, setting a precedent where terrorist organizations deliberately weaponized global mass media for psychological warfare.'
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/s1e8-black-september-hijackings-days-that-shook-the-world/',
      title: 'BBC / ERA: Days That Shook the World – Black September & Dawson\'s Field',
      duration: '29 mins 30 secs',
      pathway: 'Documentary',
      teacher_guidance: 'Superb BBC dramatized documentary examining the hijackings of Pan Am, TWA, and Swissair flights, hostage negotiations, and the regional fallout.',
      viewing_task: 'How did Palestinian militant factions use international airline hijackings to force the Palestinian national cause onto the global political agenda?',
      model_answer: 'Following the catastrophic defeat of Arab armies in the 1967 Six-Day War, Palestinian factions like George Habash\'s PFLP concluded that conventional interstate warfare would never liberate their homeland. By hijacking international commercial airliners and threatening Western civilian passengers, they leveraged sensationalist global mass media to force the world to recognize Palestinians as a distinct national people with a political cause, rather than merely displaced refugees.'
    }
  ],

  // Lesson 9: KT 2.5 The War of Attrition & The Yom Kippur War (1969–1973)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=sFyFynucf7k',
      title: 'i24NEWS: The Yom Kippur War Explained – The Strategic Surprise',
      duration: '3 mins 08 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Fast-paced overview of Sadat and Assad launching Operation Badr on Yom Kippur / Ramadan, shattering the myth of Israeli invincibility.',
      viewing_task: 'Why was Israel caught completely off-guard by the coordinated Egyptian and Syrian surprise offensive on 6 October 1973?',
      model_answer: 'Israel suffered from military overconfidence (the concept known as \'the Conceptzya\') following the easy victory of 1967, assuming Arab armies were incapable of coordinated assault. Israeli military intelligence dismissed massive Egyptian troop movements along the Suez Canal as routine autumn training exercises. Furthermore, launching the strike on Yom Kippur—the holiest day in Judaism, when soldiers were fasting and communications were shuttered—delayed mobilization by vital hours.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=IHypjF9z8Ko',
      title: 'Unpacked (Avi Posen): The Yom Kippur War – Valley of Tears & The Bar Lev Line',
      duration: '10 mins 49 secs',
      pathway: 'Israeli Perspective',
      teacher_guidance: 'Avi Posen breaks down Egyptian water cannons blasting through sand barriers, Soviet-supplied SAM anti-aircraft umbrellas, and desperate Israeli Centurion tank stands on the Golan. Recommended Watch Window: 00:00–06:00.',
      viewing_task: 'How did innovative Egyptian and Syrian military tactics initially neutralize Israel\'s air and armor advantages in October 1973?',
      model_answer: 'Egypt utilized high-pressure water cannons to blast through the Bar Lev Line\'s steep sand ramparts within hours. Crucially, Egypt deployed mobile Soviet surface-to-air missile umbrellas (SAM-6 and Shilka guns) along the canal bank, shooting down dozens of Israeli Phantoms and Skyhawks when they tried to support frontline bunkers. Simultaneously, Egyptian infantry equipped with Soviet Sagger anti-tank wire-guided missiles devastated initial Israeli counter-attacks, shattering IDF tactical assumptions.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fwWdCNAgB9w',
      title: 'Unpacked (Avi Posen): Turning the Tide – Sharon\'s Suez Crossing & The OPEC Embargo',
      duration: '9 mins 58 secs',
      pathway: 'Israeli Perspective',
      teacher_guidance: 'Avi Posen examines Sharon\'s counter-crossing into mainland Egypt, the encirclement of Egypt\'s Third Army, US Operation Nickel Grass, and the global OPEC oil shock. Recommended Watch Window: 00:00–06:00.',
      viewing_task: 'How did the 1973 Yom Kippur War trigger both a superpower nuclear crisis and a global economic energy shock?',
      model_answer: 'As the IDF encircled Egypt\'s Third Army, the Soviet Union threatened unilateral troop deployment to rescue Cairo. US President Nixon and Kissinger raised US nuclear alert status to DEFCON 3 to deter Moscow. Concurrently, Arab oil producers in OPEC slashed oil production and placed an embargo on nations supporting Israel, causing global crude prices to quadruple overnight. This demonstrated that Arab states could weaponize oil to coerce Western foreign policy.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=uwvAiDUAmhY',
      title: 'Helen Mirren in "GOLDA" (2023) Official Theatrical Trailer | Bleecker Street',
      duration: '2 mins 22 secs',
      pathway: 'Cinematic',
      teacher_guidance: 'Feature film preview starring Helen Mirren portraying Prime Minister Golda Meir\'s isolated crisis leadership during the dark opening days of the 1973 war.',
      viewing_task: 'How does Helen Mirren\'s cinematic portrayal depict the emotional burden of leadership and intelligence failure during a surprise national crisis?',
      model_answer: 'The trailer portrays Golda Meir as an aging, chain-smoking leader carrying the terrifying weight of tens of thousands of young soldiers\' lives on her conscience. By dramatizing her private confrontations with Defence Minister Moshe Dayan and General Ariel Sharon as sirens wail across Tel Aviv, the film illustrates the human vulnerability and psychological shock of a leader who trusted intelligence experts who assured her that war was impossible.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=bFiqwj0qFps',
      title: 'Archival History: The Yom Kippur War of 1973 – Strategic Overview',
      duration: '36 mins 23 secs',
      pathway: 'Documentary',
      teacher_guidance: 'Comprehensive military documentary detailing the combat phases, the Agranat Commission findings in Israel, and Sadat\'s political calculation.',
      viewing_task: 'Why did Anwar Sadat consider the Yom Kippur War a political and psychological victory despite suffering tactical military reversal?',
      model_answer: 'Sadat\'s objective was never total military conquest; it was to shatter the psychological myth of Israeli invincibility, regain Egyptian national pride lost in 1967, and force the United States to actively mediate peace. By proving Arab armies could strike successfully across the Suez Canal and imposing heavy casualties, Sadat broke the diplomatic logjam, making Israeli leaders realize that holding Sinai was a recipe for perpetual, catastrophic war.'
    }
  ],

  // Lesson 10: KT 3.1 Diplomatic Negotiations: Shuttle Diplomacy to Camp David (1974–1979)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=jENMO7-bFjs',
      title: 'AP Archive: Anwar Sadat Arrives in Jerusalem & Addresses the Knesset (Nov 1977)',
      duration: '1 min 02 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Iconic primary footage of an Arab head of state setting foot on Israeli soil for the first time, warmly greeted by Begin and Golda Meir.',
      viewing_task: 'Why was Anwar Sadat\'s November 1977 visit to Jerusalem regarded as an extraordinary psychological breakthrough in Middle Eastern history?',
      model_answer: 'For three decades, no Arab leader had ever recognized the State of Israel or spoken directly to its people. By boldly flying to Ben Gurion airport and addressing the Israeli parliament (Knesset), President Sadat dismantled the immense psychological barrier of fear and mistrust that had separated the nations, convincing a skeptical Israeli public that Egypt was genuinely willing to embrace a peaceful future.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=mbc9ElB5vfQ',
      title: 'The History Channel: Here\'s How the Camp David Accords Impacted the Middle East',
      duration: '4 mins 09 secs',
      pathway: 'Strategic Overview',
      teacher_guidance: 'Examines Jimmy Carter\'s 13-day mediation at Camp David in September 1978, the personal clashes between Begin and Sadat, and the resulting peace treaty.',
      viewing_task: 'What core concessions did Menachem Begin and Anwar Sadat make to achieve the 1978 Camp David Accords and 1979 Peace Treaty?',
      model_answer: 'Israel agreed to completely dismantle its settlements and military airbases in the Sinai Peninsula and return all 23,000 square miles of territory to Egyptian sovereignty. In exchange, Egypt became the first Arab state to officially sign a peace treaty, recognize Israel\'s right to exist, establish full diplomatic relations, and guarantee Israeli ships unhindered passage through the Suez Canal and Straits of Tiran.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=LYhJOjv0Yc8',
      title: 'Middle East Eye / Archival: The Arab World Reaction & The Price of Peace',
      duration: '6 mins 30 secs',
      pathway: 'Arab Perspective',
      teacher_guidance: 'Explores the fury of the Arab League, Egypt\'s expulsion, the failure of the Palestinian autonomy framework, and Sadat\'s assassination on 6 October 1981.',
      viewing_task: 'Why did the Camp David Accords lead to Egypt\'s expulsion from the Arab League and the eventual assassination of Anwar Sadat?',
      model_answer: 'The rest of the Arab world, led by the PLO, Syria, and Iraq, viewed Camp David as a treacherous separate peace that abandoned the Palestinian cause in exchange for bilateral territorial return of the Sinai. The Arab League severed ties and relocated its headquarters from Cairo. On 6 October 1981, during a military victory parade, radical Islamist soldiers belonging to Egyptian Islamic Jihad assassinated Sadat, illustrating the deadly domestic risks facing leaders who pursued compromise.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=z0q2WbXQWbw',
      title: 'Netflix: "THE ANGEL" (2018) Official Theatrical Trailer',
      duration: '2 mins 03 secs',
      pathway: 'Cinematic',
      teacher_guidance: 'Dramatization of Ashraf Marwan (Nasser\'s son-in-law) who spied for Mossad while remaining an Egyptian insider, showing the shadowy espionage backchannels that preceded the peace treaty.',
      viewing_task: 'How does espionage thriller cinema portray the conflicting loyalties of historical figures who operated between mortal enemies?',
      model_answer: 'The trailer frames Ashraf Marwan not simply as a mercenary traitor, but as a complex double-agent motivated by preventing another catastrophic all-out war that would destroy Egypt and Israel alike. By depicting him operating under intense personal danger inside Nasser and Sadat\'s inner circles while secretly meeting Mossad handlers in London hotels, the film dramatizes how high-level espionage played a covert role in de-escalating Cold War tensions and driving leaders toward diplomacy.'
    },
    {
      type: 'era',
      url: 'https://www.bbc.co.uk/programmes/w3cswsnv',
      title: 'BBC Witness History: Sadat in Jerusalem – Eyewitness Oral History',
      duration: '9 mins 50 secs',
      pathway: 'Documentary',
      teacher_guidance: 'BBC oral history archive capturing firsthand memories from Israeli and Egyptian diplomats, journalists, and citizens who witnessed Sadat\'s historic journey.',
      viewing_task: 'How did ordinary Israeli and Egyptian citizens experience the sudden transition from mortal enemies to diplomatic partners in 1977?',
      model_answer: 'Oral testimonies reflect intense emotional disbelief. Israeli citizens describe weeping with joy in the streets, seeing the man who had ordered the surprise assault four years earlier smiling and shaking hands with Israeli leaders. Egyptian diplomats explain the immense personal bravery required by Sadat, who knew he was risking assassination to relieve Egypt from the crushing economic burden of endless warfare.'
    }
  ],

  // Lesson 11: KT 3.2 The Palestinian Issue: Lebanon, Sabra & Shatila, and the First Intifada (1974–1993)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=NssFRFwJyP0',
      title: 'NowThis World: What Were the Palestinian Intifadas?',
      duration: '5 mins 12 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'Fast-paced visual explainer on the origins of the December 1987 First Intifada in Gaza\'s Jabalia refugee camp, spreading across the West Bank.',
      viewing_task: 'What spark triggered the outbreak of the First Intifada in December 1987, and what underlying grievances fueled it?',
      model_answer: 'The immediate trigger was an incident in the Jabalia refugee camp in Gaza on 8 December 1987, where an Israeli military vehicle collided with civilian cars, killing four Palestinian workers. Rumors that the crash was deliberate retaliation for an earlier stabbing sparked mass protests. The underlying causes were twenty years of accumulated humiliation under military occupation, economic exploitation, land seizures for Jewish settlements, and despair that external Arab states had abandoned Palestine.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=cZ16zTbDx2Q',
      title: 'Just Vision: Naila and the Uprising – The First Intifada (1987–1993)',
      duration: '2 mins 24 secs',
      pathway: 'Palestinian Perspective',
      teacher_guidance: 'Extraordinary archival footage of female Palestinian leaders, trade unions, tax boycotts, underground schools, and unarmed civilian civil disobedience.',
      viewing_task: 'How did the First Intifada represent a fundamental shift in Palestinian resistance from external guerrilla warfare to grassroots popular resistance?',
      model_answer: 'Unlike earlier PLO operations staged from Jordan or Lebanon, the First Intifada was an indigenous popular uprising led from within the Occupied Territories by students, women\'s committees, and local merchants (the Unified National Leadership of the Uprising). It relied heavily on mass civil disobedience: general strikes, boycotting Israeli goods, refusing to pay taxes, and establishing secret underground classrooms, while youths used stones and slingshots against Israeli tanks.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=SQrbPhrPJ7I',
      title: 'United Nations Archive: Yasser Arafat\'s 1974 "Olive Branch & Gun" Address',
      duration: '10 mins 03 secs',
      pathway: 'Palestinian Perspective',
      teacher_guidance: 'Historic primary source footage of PLO Chairman Yasser Arafat addressing the UN General Assembly in New York, establishing the PLO\'s international diplomatic legitimacy.',
      viewing_task: 'What was the central message of Yasser Arafat\'s famous 1974 warning to the United Nations General Assembly: "Do not let the olive branch fall from my hand"?',
      model_answer: 'Arafat sought to present the PLO as a legitimate national liberation movement capable of diplomacy rather than purely terrorism. By declaring, \'I have come bearing an olive branch and a freedom fighter\'s gun. Do not let the olive branch fall from my hand,\' he offered the international community a choice: grant the Palestinian people self-determination through diplomatic recognition and statehood, or face continued armed struggle and regional instability.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=5SIAW4cX62I',
      title: 'Unpacked (Avi Posen): The First Intifada – Media Shock & The IDF Dilemma',
      duration: '7 mins 10 secs',
      pathway: 'Israeli Perspective',
      teacher_guidance: 'Avi Posen examines the IDF\'s struggle to police unarmed civilian crowds, Defence Minister Yitzhak Rabin\'s controversial \'iron fist\' policy, and the damage to Israel\'s international image.',
      viewing_task: 'Why did the First Intifada cause an acute political and moral crisis within Israel, leading leaders like Yitzhak Rabin to reassess military solutions?',
      model_answer: 'The IDF was trained for high-tech tank battles against foreign armies, not riot control against teenage stone-throwers. Global television footage showing Israeli soldiers beating youths damaged Israel\'s international reputation, particularly in the US. The uprising convinced Defence Minister Yitzhak Rabin and pragmatic Israeli generals that the occupation was militarily unmanageable and morally corrupting, concluding that \'you cannot solve the Palestinian issue with guns\' and setting the stage for negotiations.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=CoM-L62peIo',
      title: 'Sony Pictures Classics: "WALTZ WITH BASHIR" (2008) Official Theatrical Trailer',
      duration: '2 mins 04 secs',
      pathway: 'Cinematic',
      teacher_guidance: 'Oscar-nominated animated documentary feature following an Israeli veteran reconstructing his repressed memories of the 1982 Lebanon War and the Sabra and Shatila massacre.',
      viewing_task: 'How does animated documentary cinema capture psychological trauma and moral complicity in wartime atrocities?',
      model_answer: 'The trailer illustrates director Ari Folman\'s groundbreaking use of hallucinatory, graphic animation to convey the psychological suppression of war trauma. By visualizing how young 19-year-old Israeli conscripts were swept into the chaos of Beirut and stood on rooftops firing flares while Christian Phalangist militias slaughtered civilians in Sabra and Shatila below, the film confronts the devastating moral reality of indirect complicity and guilt that shattered Israeli public consensus over the war.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=_pGg50bzLN0',
      title: 'Al Jazeera English: Palestine\'s First Intifada – 30 Years On',
      duration: '24 mins 10 secs',
      pathway: 'Documentary',
      teacher_guidance: 'In-depth retrospective detailing the 1982 Lebanon War, the Sabra and Shatila massacre, the siege of Beirut, and the transition to the Intifada.',
      viewing_task: 'How did the trauma of the 1982 Lebanon War and the Sabra and Shatila massacre influence the rise of the First Intifada?',
      model_answer: 'In 1982, Israel invaded Lebanon to expel the PLO. While successful in forcing Arafat\'s leadership into exile in Tunis, the invasion culminated in the horrific slaughter of between 800 and 3,500 Palestinian civilians in the Sabra and Shatila refugee camps by Christian Phalangist militias while Israeli forces controlled the perimeter. In Israel, 400,000 citizens protested in Tel Aviv, forcing the Kahan Commission to find Sharon indirectly responsible. For Palestinians inside the West Bank and Gaza, the distance of the exiled PLO leadership showed they had to take resistance into their own hands.'
    }
  ],

  // Lesson 12: KT 3.3 Attempts at a Solution: Oslo Accords to Oslo II (1988–1995)
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=nERZr_d343w',
      title: 'The History Channel: How the Oslo Accords Almost Ended the Conflict',
      duration: '4 mins 42 secs',
      pathway: 'Starter Hook',
      teacher_guidance: 'The electric moment on 13 September 1993: Bill Clinton coaxing Yitzhak Rabin and Yasser Arafat to shake hands on the White House lawn.',
      viewing_task: 'What historic political breakthrough was achieved on the White House lawn on 13 September 1993?',
      model_answer: 'On 13 September 1993, Israeli Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat signed the Declaration of Principles (Oslo I). For the first time, Israel officially recognized the PLO as the sole legitimate representative of the Palestinian people, while the PLO formally renounced terrorism, accepted UN Resolution 242, and recognized the right of the State of Israel to exist in peace and security, establishing interim Palestinian self-governance in Gaza and Jericho.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Jk7JQxTDhdM',
      title: 'Council on Foreign Relations: The Oslo Accords – Division of Areas A, B, C & Core Hurdles',
      duration: '6 mins 37 secs',
      pathway: 'Strategic Overview',
      teacher_guidance: 'Analytical overview of the 1995 Oslo II agreement dividing the West Bank into Areas A (Palestinian civil/security), B (Palestinian civil/joint security), and C (full Israeli control), and why final status issues were postponed.',
      viewing_task: 'Why did the decision to postpone \'final status\' issues (Jerusalem, refugees, settlements, and borders) ultimately undermine the Oslo peace process?',
      model_answer: 'The Oslo Accords adopted an incremental approach: building mutual confidence through five years of transitional self-rule before negotiating the most contentious issues: the status of Jerusalem, the Palestinian right of return, Israeli settlements, and final sovereign borders. However, this postponement gave extremists on both sides a five-year window to derail the process: Israeli settlements continued to expand and confiscate land, while Palestinian rejectionist factions grew disillusioned that statehood was not explicitly guaranteed.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Ncg713gHwos',
      title: 'TRT World: How and Why the Oslo Accords Broke Down (1993–1995)',
      duration: '4 mins 42 secs',
      pathway: 'Palestinian Perspective',
      teacher_guidance: 'Examines the deadly actions of extremists on both sides: Baruch Goldstein\'s Hebron massacre, Hamas bus bombings against civilians, right-wing rallies in Israel, and the assassination of Yitzhak Rabin on 4 November 1995.',
      viewing_task: 'How did violent extremism on both the Israeli far-right and Palestinian Islamist sides derail the peace momentum created by the Oslo Accords?',
      model_answer: 'Peace momentum was sabotaged by violent opposition. In February 1994, Jewish extremist Baruch Goldstein murdered 29 Muslim worshippers in Hebron. Hamas and Islamic Jihad launched a wave of suicide bus bombings in Tel Aviv and Jerusalem, killing dozens of Israeli civilians and turning Israeli public opinion against concessions. Concurrently, right-wing Israeli opponents branded Rabin a traitor; on 4 November 1995, following a massive peace rally in Tel Aviv, a Jewish law student named Yigal Amir assassinated Yitzhak Rabin, striking a fatal blow to the peace process.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=QsRlXQcHd8c',
      title: 'HBO Films: "OSLO" (2021) Official Theatrical Trailer starring Andrew Scott & Ruth Wilson',
      duration: '2 mins 29 secs',
      pathway: 'Cinematic',
      teacher_guidance: 'Dramatization of the secret backchannel Norwegian diplomacy between Israeli academics and the PLO that led to the 1993 White House handshake.',
      viewing_task: 'How does cinematic drama portray the personal human connections forged across bitter political divides during the secret Oslo talks?',
      model_answer: 'The HBO trailer shows Norwegian diplomats Mona Juul and Terje Rød-Larsen breaking formal diplomatic etiquette by bringing sworn enemies together in a warm, informal Norwegian lodge, encouraging them to share meals, Scotch, and personal family stories. The film dramatizes the profound emotional breakthrough when individuals who previously viewed each other purely as monsters or oppressors begin to recognize their shared humanity and mutual exhaustion from decades of bloodshed.'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TgFWEVQTeHM',
      title: 'Al Jazeera World: The Price of Oslo – Inside the Secret Norwegian Backchannel',
      duration: '47 mins 30 secs',
      pathway: 'Documentary',
      teacher_guidance: 'Remarkable documentary recounting how Norwegian sociologists Terje Rød-Larsen and Mona Juul secretly brought Israeli academics and PLO representatives together in a secluded mansion in Sarpsborg. Recommended Watch Window: 00:00–12:00.',
      viewing_task: 'How did secret, unofficial diplomacy in Norway bypass official diplomatic barriers to negotiate the Oslo Accords?',
      model_answer: 'Under Israeli law, direct contact with PLO members was a criminal offense. Norwegian mediators circumvented this by staging secret, informal meetings between two Israeli university professors (Yair Hirschfeld and Ron Pundak) and PLO finance minister Ahmed Qurei in a quiet country estate near Oslo. Free from media scrutiny, press leaks, and political posturing, the negotiators built personal trust and drafted the mutual recognition framework that was subsequently adopted by official governments.'
    }
  ]
];

function formatVideoBlock(videoList) {
  let out = '      video: [\n';
  videoList.forEach((v) => {
    out += '        {\n';
    out += `          type: '${v.type}',\n`;
    out += `          url: '${v.url}',\n`;
    out += `          title:\n            '${v.title.replace(/'/g, "\\'")}',\n`;
    out += `          duration: '${v.duration}',\n`;
    out += `          pathway: '${v.pathway}',\n`;
    out += `          teacher_guidance:\n            '${v.teacher_guidance.replace(/'/g, "\\'")}',\n`;
    out += `          viewing_task:\n            '${v.viewing_task.replace(/'/g, "\\'")}',\n`;
    out += `          model_answer:\n            '${v.model_answer.replace(/'/g, "\\'")}',\n`;
    out += '        },\n';
  });
  out += '      ],';
  return out;
}

function processContent(content) {
  content = content.replace(/extra_videos:\s*\[[\s\S]*?\],\n/g, 'extra_videos: [],\n');

  const matches = [...content.matchAll(/video:\s*\[([\s\S]*?)\]\s*,/g)];
  if (matches.length !== 12) {
    throw new Error(`Expected 12 video blocks in file, but found ${matches.length}`);
  }

  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const replacement = formatVideoBlock(cme12MultiLensVideos[i]);
    content =
      content.slice(0, match.index) + replacement + content.slice(match.index + match[0].length);
  }

  return content;
}

console.log('🔄 Loading units/cme_new/data.js...');
let rawContent = fs.readFileSync(dataFile, 'utf8');
let updatedContent = processContent(rawContent);

fs.writeFileSync(dataFile, updatedContent, 'utf8');
console.log('✅ Updated units/cme_new/data.js');

fs.writeFileSync(publicDataFile, updatedContent, 'utf8');
console.log('✅ Updated public/units/cme_new/data.js');

console.log('🎉 Successfully synchronized all 12 Conflict in the Middle East lessons with the 56 multi-lens videos!');
