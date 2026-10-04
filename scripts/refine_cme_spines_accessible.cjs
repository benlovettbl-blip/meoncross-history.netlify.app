const fs = require('fs');
const path = require('path');

// Refined, student-accessible, 100% Edexcel GCSE specification-aligned 5-stage causal domino spines
const REFINED_SPINES = {
  lesson_1: {
    title: 'Imperial Pledges & Conflicting Promises: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '1915–1916',
        title: 'The McMahon-Hussein Correspondence',
        actor: 'Britain & Arab Leaders',
        tag: 'The Wartime Promise',
        trigger:
          'British High Commissioner McMahon exchanges letters with Arab leader Sherif Hussein, promising British support for an independent post-war Arab state in exchange for an Arab revolt against the Ottoman Empire.',
        because:
          'Britain urgently needed Arab guerrilla forces to tie down Ottoman troops during the First World War and protect the Suez Canal.',
        therefore:
          'Arab forces launched the revolt believing they were fighting for national independence, but Britain deliberately left the future borders of Palestine vague.',
        connective:
          'While promising independence to Arab leaders, Britain secretly made a conflicting partition deal with its European ally...',
        exam_link:
          'Q1 Consequence: Created lasting Arab distrust of British imperial motives when contradictory promises were later revealed.',
      },
      {
        step: 2,
        date: 'May 1916',
        title: 'The Secret Sykes-Picot Agreement',
        actor: 'Britain & France',
        tag: 'Imperial Partition',
        trigger:
          'British and French diplomats secretly agree to divide the Ottoman Arab lands into British and French zones of colonial control.',
        because:
          'Britain and France wanted to secure Middle Eastern oil supplies, trading ports, and strategic transit routes to British India.',
        therefore:
          'Directly broke Britain’s promise of Arab independence; when leaked in 1917, it convinced Arab leaders that European powers could not be trusted.',
        connective:
          'Britain then issued a third, fateful pledge to win international wartime support...',
        exam_link:
          'Q2 Narrative Account: Formed the second conflicting imperial pledge that made competing territorial claims in Palestine inevitable.',
      },
      {
        step: 3,
        date: 'November 1917',
        title: 'The Balfour Declaration',
        actor: 'The British Government',
        tag: 'The Conflicting Pledge',
        trigger:
          'British Foreign Secretary Arthur Balfour writes an official letter stating Britain’s support for "a national home for the Jewish people" in Palestine.',
        because:
          'Britain sought to win wartime diplomatic sympathy and financial backing from Jewish communities in the USA and Russia.',
        therefore:
          'Created a deep contradiction: promising to help build a Jewish homeland while also pledging not to harm the rights of the existing Arab majority.',
        connective:
          'Following Allied victory, Britain was given international authority to govern Palestine and manage these rival promises...',
        exam_link:
          'Q1 Consequence: Provided the international legal backing for the Zionist movement to establish a national Jewish homeland in Palestine.',
      },
      {
        step: 4,
        date: '1920–1936',
        title: 'The British Mandate & Rising Immigration',
        actor: 'British Authorities & Jewish Immigrants',
        tag: 'Population Shift',
        trigger:
          'Britain rules Palestine under a League of Nations mandate; Jewish immigration rises steadily, increasing the Jewish share of the population from 11% to nearly 30% by 1936.',
        because:
          'Jewish immigrants fled rising anti-Semitism and Nazi persecution in Europe, purchasing land through the Jewish National Fund to build farms and towns.',
        therefore:
          'Palestinian Arab tenant farmers lost access to farmland, creating severe economic hardship and growing hostility between both communities.',
        connective:
          'Simmering Arab anger boiled over into a full-scale armed rebellion against British rule...',
        exam_link:
          'Q2 Narrative Account: Demographic transformation and land purchases created the grassroots friction that triggered the 1936 Arab Revolt.',
      },
      {
        step: 5,
        date: '1936–1939',
        title: 'The Arab Revolt & The 1939 White Paper',
        actor: 'Palestinian Arabs & British Government',
        tag: 'The Immigration Cap',
        trigger:
          'Palestinian Arabs launch a three-year armed rebellion; Britain crushes the uprising with troops, but then issues the 1939 White Paper strictly capping Jewish immigration.',
        because:
          'With the Second World War approaching, Britain needed to appease Arab opinion to keep Middle Eastern oil supplies and trade routes secure.',
        therefore:
          'Limited Jewish immigration to 75,000 over five years just as the Holocaust began, leaving both Jews and Arabs feeling betrayed and turning both sides against Britain.',
        connective:
          'The 1939 White Paper convinced Jewish groups that Britain had broken its promises, leading to post-war armed insurgency...',
        exam_link:
          'Q1 Consequence: Convinced Zionist leaders that only armed resistance against Britain could secure an independent Jewish state.',
      },
    ],
  },

  lesson_2: {
    title: 'The End of the Mandate & Creation of Israel: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '1945–1946',
        title: 'Holocaust Survivors & The Jewish Insurgency',
        actor: 'Jewish Militias vs. British Army',
        tag: 'The Post-War Conflict',
        trigger:
          'Armed Jewish paramilitary groups (the Haganah and Irgun) launch guerrilla attacks and sabotage raids against British military bases and railways in Palestine.',
        because:
          'Britain maintained its strict immigration cap of 1,500 people per month, turning away ships carrying European Holocaust survivors who had nowhere else to go.',
        therefore:
          'Made Palestine dangerous and financially crippling for Britain to govern, tying down 100,000 British soldiers in constant anti-guerrilla operations.',
        connective:
          'The guerrilla campaign escalated into a devastating attack on the heart of British military administration...',
        exam_link:
          'Q2 Narrative Account: Shows how British immigration restrictions drove Jewish groups to launch the armed campaign that forced Britain to withdraw.',
      },
      {
        step: 2,
        date: '22 July 1946',
        title: 'The King David Hotel Bombing',
        actor: 'The Irgun (Militant Jewish Group)',
        tag: 'The Decisive Attack',
        trigger:
          'The Irgun blows up the British administrative and military headquarters at the King David Hotel in Jerusalem, killing 91 British, Arab, and Jewish staff.',
        because:
          'The Irgun, led by Menachem Begin, wanted to destroy British military intelligence files and force Britain to abandon control of Palestine.',
        therefore:
          'Deeply shocked the British public and government, destroying British domestic political will to keep soldiers stationed in Palestine.',
        connective:
          'Exhausted by casualties, financial debt, and public outrage, the British government decided to walk away from Palestine...',
        exam_link:
          'Q1 Consequence: Convinced the British government that governing Palestine was no longer sustainable, leading directly to the decision to hand it to the UN.',
      },
      {
        step: 3,
        date: 'February 1947',
        title: 'Britain Hands Palestine to the United Nations',
        actor: 'The British Government & The UN',
        tag: 'The UN Referral',
        trigger:
          'British Foreign Secretary Ernest Bevin announces that Britain will surrender its mandate and hand full responsibility for Palestine to the United Nations.',
        because:
          'Britain was near bankruptcy after the Second World War, facing severe fuel rationing at home, and could not find an agreement acceptable to both Arabs and Jews.',
        therefore:
          'The UN established a special fact-finding committee (UNSCOP) to tour Palestine and produce an international partition plan.',
        connective:
          'The United Nations investigated on the ground and produced a formal plan to divide the country into two separate states...',
        exam_link:
          'Q2 Narrative Account: Transferred responsibility from the British Empire to the international community, setting the stage for UN Resolution 181.',
      },
      {
        step: 4,
        date: '29 November 1947',
        title: 'UN Resolution 181 (The Partition Plan)',
        actor: 'United Nations General Assembly',
        tag: 'The Division of Palestine',
        trigger:
          'The UN votes to partition Palestine into two separate states: a Jewish state (55% of the land) and an Arab state (44%), with Jerusalem placed under international control.',
        because:
          'The UN concluded that the two communities had completely incompatible national goals and could not live peacefully under one government.',
        therefore:
          'Jewish leaders accepted the plan as international recognition of their statehood, while Arab leaders rejected it as unfair, sparking immediate civil war across Palestine.',
        connective:
          'As the final British soldiers packed up and departed, the civil conflict erupted into a regional war...',
        exam_link:
          'Q1 Consequence: Sparked intense communal fighting that escalated directly into the 1948–49 Arab-Israeli War.',
      },
      {
        step: 5,
        date: '14–15 May 1948',
        title: 'Declaration of Israel & The 1948 War',
        actor: 'David Ben-Gurion & Five Arab States',
        tag: 'Independence & Invasion',
        trigger:
          'David Ben-Gurion proclaims the independent State of Israel; at midnight the British Mandate officially ends, and armies from Egypt, Jordan, Syria, Iraq, and Lebanon invade.',
        because:
          'Arab states were determined to prevent the partition of Palestine, stop the creation of a Jewish state, and protect the Palestinian Arab population.',
        therefore:
          'Started the first Arab-Israeli interstate war (1948–49), resulting in an Israeli victory, border expansion, and the displacement of over 700,000 Palestinians.',
        connective:
          'The 1948–49 war completely redrew the map of the Middle East and created a permanent refugee crisis...',
        exam_link:
          'Q1 Consequence: Established the sovereign State of Israel while creating the lasting Palestinian refugee issue.',
      },
    ],
  },

  lesson_3: {
    title: 'Aftermath of the 1948–49 War & The Refugee Crisis: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: 'June–July 1948',
        title: 'The UN Ceasefire & The Czech Arms Supply',
        actor: 'Israel & The Czech Arms Supply',
        tag: 'The Military Turning Point',
        trigger:
          'During a four-week UN truce, Israel reorganises its forces into the Israeli Defence Forces (IDF) and imports large shipments of rifles, machine guns, and fighter planes from Czechoslovakia.',
        because:
          'Israel was initially short of heavy equipment and needed modern arms to resist five invading Arab armies.',
        therefore:
          'Decisively shifted the military balance in Israel’s favor, allowing the newly organized IDF to launch successful counter-offensives and win the war.',
        connective:
          'As the fighting swept through towns and villages, hundreds of thousands of civilians were forced from their homes...',
        exam_link:
          'Q2 Narrative Account: Explains how Israel used the UN truce to rearm and overcome Arab numerical superiority.',
      },
      {
        step: 2,
        date: '1948–1949',
        title: 'The Palestinian Refugee Crisis (The Nakba)',
        actor: 'Palestinian Refugees & The UN (UNRWA)',
        tag: 'Mass Dispossession',
        trigger:
          'Around 700,000 Palestinian Arabs flee or are expelled from their homes, ending up in emergency refugee camps in Gaza, the West Bank, Jordan, Syria, and Lebanon.',
        because:
          'Palestinians fled due to intense battlefield shelling, panic caused by atrocities such as the Deir Yassin massacre, and direct expulsions by Israeli forces.',
        therefore:
          'Created a permanent refugee population reliant on UN food and shelter; Palestinians refer to this disaster as the Nakba ("The Catastrophe").',
        connective:
          'The active fighting was halted by temporary ceasefire agreements that completely redrew the borders...',
        exam_link:
          'Q1 Consequence: Created the lasting Palestinian refugee crisis that became one of the main obstacles to Middle East peace.',
      },
      {
        step: 3,
        date: '1949',
        title: 'The 1949 Armistice Agreements (The Green Line)',
        actor: 'Israel, Egypt, Jordan, Syria, Lebanon',
        tag: 'The Redrawn Borders',
        trigger:
          'The UN brokers separate ceasefire agreements establishing temporary armistice borders known as the "Green Line".',
        because:
          'Arab armies had suffered heavy battlefield defeats and needed to halt the advancing Israeli military.',
        therefore:
          'Israel expanded its territory to 78% of Palestine; Jordan took control of the West Bank and East Jerusalem, while Egypt occupied the Gaza Strip, leaving no independent Palestinian state.',
        connective:
          'With its new borders secured, the Israeli government passed laws to rapidly build up its population...',
        exam_link:
          'Q1 Consequence: Wiped the proposed Arab state off the map and established borders that left Israel with narrow, vulnerable frontiers.',
      },
      {
        step: 4,
        date: 'July 1950',
        title: 'The Israeli Law of Return',
        actor: 'The Israeli Parliament (Knesset)',
        tag: 'Building the Population',
        trigger:
          'Israel passes the Law of Return, granting every Jewish person in the world the automatic right to move to Israel and become an Israeli citizen.',
        because:
          'Israel wanted to provide a permanent refuge for world Jewry and rapidly build up its workforce and armed forces.',
        therefore:
          'Doubled Israel’s population within four years as European survivors and Jews expelled from Arab countries arrived, while Palestinian refugees were barred from returning to their homes.',
        connective:
          'Border friction grew intense as displaced Palestinians began staging raids back across the armistice lines...',
        exam_link:
          'Q1 Consequence: Transformed Israeli society and cemented the policy of barring displaced Palestinians from reclaiming their land.',
      },
      {
        step: 5,
        date: '1950–1955',
        title: 'Fedayeen Border Raids & Israeli Reprisals',
        actor: 'Palestinian Fedayeen & Israeli Forces',
        tag: 'The Cycle of Violence',
        trigger:
          'Armed Palestinian guerrillas (Fedayeen) carry out cross-border raids into Israel; Israel responds with large-scale, destructive military reprisal attacks.',
        because:
          'Displaced Palestinians sought to strike back at Israel, while Israeli leaders adopted a policy of disproportionate retaliation to deter future attacks.',
        therefore:
          'Created a vicious cycle of violence and border tension that led directly to the 1955 Gaza Raid and the 1956 Suez Crisis.',
        connective:
          'Rising border violence and Egyptian support for the Fedayeen convinced Israeli leaders to seek a military showdown with Egypt...',
        exam_link:
          'Q2 Narrative Account: Demonstrates how post-1949 border raids created the military escalation that sparked the 1956 Suez Crisis.',
      },
    ],
  },

  lesson_4: {
    title: 'Nasser, Increased Tension & The Suez Crisis: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: 'February 1955',
        title: 'The Gaza Raid',
        actor: 'Israel vs. Egypt',
        tag: 'The Spark',
        trigger:
          'Israeli paratroopers launch a surprise raid into Egyptian-controlled Gaza, destroying an army headquarters and killing 37 Egyptian soldiers.',
        because:
          'Israel wanted to punish Egypt for sponsoring Palestinian Fedayeen guerrilla attacks across the border.',
        therefore:
          'Humiliated Egyptian President Nasser, convincing him that the Egyptian army was too weak and urgently needed modern tanks and combat jets.',
        connective:
          'Blocked from buying weapons by Western powers, Nasser turned directly to the Communist Eastern Bloc...',
        exam_link:
          'Q1 Consequence: Convinced Nasser to buy Soviet weapons, which brought Cold War rivalries directly into the Middle East conflict.',
      },
      {
        step: 2,
        date: 'September 1955',
        title: 'The Czech Arms Deal',
        actor: 'Egypt & The Soviet Bloc',
        tag: 'Cold War Shift',
        trigger:
          'Nasser signs an agreement to buy 200 Soviet jet fighters and 300 tanks via Czechoslovakia.',
        because:
          'Western powers refused to sell arms to Egypt unless Nasser agreed to join anti-Soviet military alliances.',
        therefore:
          'Broke the Western monopoly on Middle Eastern arms sales, alarming Britain and the USA and establishing Soviet influence in the Arab world.',
        connective:
          'Alarmed by Egypt’s friendship with the Soviet Union, the United States retaliated economically...',
        exam_link:
          'Q2 Narrative Account: Led the USA to cancel financial funding for the Aswan High Dam, triggering the Suez nationalisation.',
      },
      {
        step: 3,
        date: 'July 1956',
        title: 'Dam Loans Cancelled & Suez Canal Nationalised',
        actor: 'USA, Britain & Egypt',
        tag: 'The Economic Trigger',
        trigger:
          'The USA abruptly cancels funding for the Aswan High Dam; Nasser retaliates by nationalising the British-and-French-owned Suez Canal.',
        because:
          'The US wanted to punish Nasser for his Soviet ties, while Nasser needed the canal’s shipping tolls to pay for building the dam himself.',
        therefore:
          'Furious British Prime Minister Anthony Eden viewed the canal as an imperial oil lifeline and resolved to overthrow Nasser by force.',
        connective:
          'Britain and France secretly allied with Israel to launch an unprovoked military invasion...',
        exam_link:
          'Q1 Consequence: Sparked the military crisis by giving Britain and France an excuse to plan an invasion to reclaim the canal.',
      },
      {
        step: 4,
        date: 'October–November 1956',
        title: 'The Secret Sèvres Plot & Invasion',
        actor: 'Britain, France & Israel',
        tag: 'The Secret Conspiracy',
        trigger:
          'Britain, France, and Israel secretly plan an attack; Israel invades the Sinai Desert, and Anglo-French forces bomb Egyptian airfields and land troops at Port Said.',
        because:
          'Britain and France wanted to regain the canal under the fake excuse of "separating the combatants", while Israel wanted to crush Fedayeen bases and open the Straits of Tiran.',
        therefore:
          'Egypt was beaten militarily in Sinai, but Nasser ordered ships sunk in the canal, completely blocking it to world shipping.',
        connective:
          'The invasion provoked intense fury from the superpowers, bringing immediate international pressure...',
        exam_link:
          'Q2 Narrative Account: Showed how the imperial conspiracy collapsed under diplomatic and financial pressure from the superpowers.',
      },
      {
        step: 5,
        date: 'November 1956',
        title: 'US Ultimatum & British Retreat',
        actor: 'USA, The UN & Britain',
        tag: 'The Imperial Humiliation',
        trigger:
          'US President Eisenhower threatens to cut off emergency loans and crash the British economy unless British, French, and Israeli troops withdraw immediately.',
        because:
          'Eisenhower was furious at allies launching an imperial war without US approval during an American election and while Soviet tanks crushed Hungary.',
        therefore:
          'Forced a humiliating British and French retreat, signaling the end of Britain as a world superpower; Nasser became a hero across the Arab world, and UN peacekeepers (UNEF) guarded the border.',
        connective:
          'UN peacekeepers kept the border peaceful for a decade, until rising Arab nationalism triggered the 1967 crisis...',
        exam_link:
          'Q1 Consequence: Ended British imperial dominance in the Middle East and made Nasser the undisputed hero of Arab nationalism.',
      },
    ],
  },

  lesson_6: {
    title: 'Causes of the Six-Day War (1964–1967): 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: 'January 1964',
        title: 'The 1964 Cairo Conference & PLO Founded',
        actor: 'President Nasser & The Arab League',
        tag: 'Arab Resistance',
        trigger:
          'President Nasser hosts Arab heads of state in Cairo to coordinate opposition to Israel and establish the Palestine Liberation Organisation (PLO).',
        because:
          'Arab leaders wanted to show leadership on the Palestinian issue and control growing Palestinian guerrilla activity.',
        therefore:
          'Put the Palestinian cause back on the world stage; Yasser Arafat’s guerrilla group, Fatah, began launching independent sabotage raids into Israel.',
        connective:
          'Disputes over vital water supplies soon escalated border clashes between Israel and Syria...',
        exam_link:
          'Q2 Narrative Account: Marked the formal revival of Palestinian national resistance, leading to cross-border guerrilla raids.',
      },
      {
        step: 2,
        date: '1964–1965',
        title: 'The Dispute Over the River Jordan Waterways',
        actor: 'Israel & Syria',
        tag: 'The Battle for Water',
        trigger:
          'Syria attempts to divert the headwaters feeding the River Jordan; Israeli artillery and tanks shell Syrian engineering machinery to stop construction.',
        because:
          'Israel relied on the River Jordan to irrigate its farms and towns, while Arab states sought to cut Israel’s fresh water supply.',
        therefore:
          'Showed that Israel was prepared to use pre-emptive military force to protect essential resources, making border shootouts a regular occurrence.',
        connective:
          'A radical new government in Syria began actively funding guerrilla attacks against Israel...',
        exam_link:
          'Q1 Consequence: Escalated border tensions between Israel and Syria, making military clashes frequent on the northern frontier.',
      },
      {
        step: 3,
        date: '1966',
        title: 'Syrian Support for Fatah Border Raids',
        actor: 'Syrian Government & Palestinian Guerrillas',
        tag: 'Border Guerrilla Attacks',
        trigger:
          'The Syrian government begins openly supplying money, weapons, and bases to Fatah fighters launching landmine raids into northern Israel.',
        because:
          'Syrian leaders wanted to prove they were the most radical opponents of Israel and pressure other Arab states to take action.',
        therefore:
          'Cross-border guerrilla attacks into northern Israel multiplied, turning the Israeli-Syrian border into the most dangerous hotspot in the region.',
        connective:
          'Israel launched a large retaliatory raid across the Jordanian border to deter infiltrators...',
        exam_link:
          'Q2 Narrative Account: Syrian state backing for Fatah provoked heavy Israeli retaliation, bringing the region closer to war.',
      },
      {
        step: 4,
        date: '13 November 1966',
        title: 'The Israeli Raid on Samu',
        actor: 'Israeli Defence Forces (IDF) & Jordan',
        tag: 'The Reprisal Strike',
        trigger:
          'Israeli tanks and troops raid the village of Samu in the Jordanian-controlled West Bank, destroying houses and clashing with Jordanian soldiers.',
        because:
          'Israel retaliated after a Fatah landmine killed three Israeli border police near the frontier.',
        therefore:
          'Damaged relations between Arab states: Jordan’s King Hussein blamed Nasser for failing to support him, raising public pressure on Nasser to act tough.',
        connective:
          'Tensions reached boiling point in a major aerial clash over the Syrian border...',
        exam_link:
          'Q1 Consequence: Deepened divisions between Arab leaders and pressured Nasser into taking aggressive action to restore his leadership.',
      },
      {
        step: 5,
        date: '7 April 1967',
        title: 'The Aerial Battle of 7 April 1967',
        actor: 'Israeli & Syrian Air Forces',
        tag: 'The Final Spark',
        trigger:
          'After Syrian guns shell Israeli tractors in the border zone, Israeli fighter jets shoot down six Syrian MiG fighter planes and fly low over Damascus.',
        because:
          'Israel wanted to silence Syrian gun positions and demonstrate total command of the skies.',
        therefore:
          'Humiliated the Syrian government, leaving Syrian leaders demanding military help from Egypt and setting the stage for war in May 1967.',
        connective:
          'Desperate to deter another Israeli attack on Syria, the Soviet Union issued a fateful false warning to Nasser...',
        exam_link:
          'Q2 Narrative Account: The destruction of Syrian jets pushed Syria and the USSR to provoke the crisis that started the Six-Day War.',
      },
    ],
  },

  lesson_7: {
    title: 'The Six-Day War (May–June 1967): 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '13–15 May 1967',
        title: 'Soviet False Reports & Egyptian Mobilisation',
        actor: 'The Soviet Union & President Nasser',
        tag: 'The False Warning',
        trigger:
          'The Soviet Union falsely tells Nasser that Israel is massing troops on the Syrian border; Nasser moves 100,000 Egyptian soldiers into the Sinai Desert.',
        because:
          'The Soviets wanted to deter an Israeli strike against Syria, while Nasser wanted to reassert his position as the leader of the Arab world.',
        therefore:
          'Started a rapid military buildup in Sinai that quickly spiraled out of control as both sides prepared for war.',
        connective:
          'To prove he was serious, Nasser took two dramatic steps that directly provoked Israel...',
        exam_link:
          'Q2 Narrative Account: Triggered the rapid chain of events in May 1967 that made a pre-emptive strike by Israel inevitable.',
      },
      {
        step: 2,
        date: '16–23 May 1967',
        title: 'UN Peacekeepers Expelled & Straits of Tiran Closed',
        actor: 'Egypt & The United Nations',
        tag: 'The Cause for War',
        trigger:
          'Nasser orders UN peacekeepers (UNEF) to leave the Sinai border and closes the Straits of Tiran to all Israeli shipping.',
        because:
          'Nasser believed this aggressive show of force would force Israel into a diplomatic climbdown without full-scale war.',
        therefore:
          'Cut off Israel’s oil supply route through the port of Eilat; Israel had warned since 1957 that closing the Straits would be treated as an act of war.',
        connective:
          'Jordan then signed a joint military alliance with Egypt, completely surrounding Israel on three sides...',
        exam_link:
          'Q1 Consequence: Closing the Straits of Tiran cut off vital oil supplies and provided Israel with the immediate justification for war.',
      },
      {
        step: 3,
        date: '30 May 1967',
        title: 'The Arab Defence Pact (Israel Encircled)',
        actor: 'Egypt, Jordan & Syria',
        tag: 'Three-Front Encirclement',
        trigger:
          'King Hussein of Jordan flies to Cairo and places the Jordanian army under Egyptian command, completing an encirclement of Israel on three sides.',
        because:
          'Hussein feared an uprising at home if he did not join the growing Arab coalition against Israel.',
        therefore:
          'Created panic among Israeli civilians, leading to the appointment of popular war hero Moshe Dayan as Defence Minister.',
        connective:
          'Fearing an imminent attack from three sides, Israel decided to launch a surprise pre-emptive strike...',
        exam_link:
          'Q2 Narrative Account: Convinced Israeli leaders that waiting would lead to national destruction, prompting the pre-emptive air strike.',
      },
      {
        step: 4,
        date: '5 June 1967',
        title: 'The Pre-Emptive Air Strike',
        actor: 'The Israeli Air Force',
        tag: 'Three Hours to Victory',
        trigger:
          'Nearly 200 Israeli fighter jets fly low beneath Egyptian radar, destroying over 300 Egyptian combat aircraft on the ground in less than three hours.',
        because:
          'Israel was heavily outnumbered on the ground and needed complete control of the skies to protect its soldiers and cities.',
        therefore:
          'Decided the war on the first morning; subsequent strikes wiped out the Syrian and Jordanian air forces, leaving Arab ground armies defenseless.',
        connective:
          'With total air superiority, Israeli ground forces advanced rapidly on all three fronts...',
        exam_link:
          'Q1 Consequence: Destroyed Arab air power in three hours, guaranteeing Israel’s total battlefield victory in the Six-Day War.',
      },
      {
        step: 5,
        date: '5–10 June 1967',
        title: 'The Six-Day Victory & The Conquered Territories',
        actor: 'Israeli Defence Forces (IDF)',
        tag: 'The Redrawn Map',
        trigger:
          'In just six days, Israel captures the Sinai Peninsula and Gaza Strip from Egypt, the West Bank and East Jerusalem from Jordan, and the Golan Heights from Syria.',
        because:
          'Arab ground armies were thrown into chaotic retreat by relentless Israeli air attacks and coordinated tank columns.',
        therefore:
          'Tripled the size of Israeli-controlled territory and brought over 1 million Palestinian Arabs under direct Israeli military occupation.',
        connective:
          'The stunning conquest of vast Arab lands created the central dilemma of modern Middle Eastern history...',
        exam_link:
          'Q1 Consequence: Transformed the geography of the conflict by giving Israel the occupied territories of Sinai, Gaza, the West Bank, and Golan Heights.',
      },
    ],
  },

  lesson_8: {
    title: 'The Conquered Territories & Resolution 242: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '7 June 1967',
        title: 'The Capture of East Jerusalem',
        actor: 'Israeli Forces (IDF)',
        tag: 'The Holy City Captured',
        trigger:
          'Israeli paratroopers capture the Old City of Jerusalem and the Western Wall; the Israeli parliament quickly annexes East Jerusalem under Israeli law.',
        because:
          'Jordan had opened artillery fire on West Jerusalem on the first day of the war, giving Israel the opportunity to capture the sacred holy sites.',
        therefore:
          'Reunited Jerusalem under Israeli control, but was condemned by the UN and became the most emotional, contested issue in the entire conflict.',
        connective:
          'Stunned by their catastrophic battlefield defeat, Arab leaders gathered to coordinate a response...',
        exam_link:
          'Q1 Consequence: Made Jerusalem the most sacred and intractable dispute between Israelis and Palestinians.',
      },
      {
        step: 2,
        date: 'September 1967',
        title: 'The Khartoum Summit & The "Three No’s"',
        actor: 'Arab Leaders (Led by Egypt’s Nasser)',
        tag: 'The Rejectionist Stance',
        trigger:
          'Arab heads of state meet in Khartoum and declare the famous "Three No’s": no peace with Israel, no recognition of Israel, no negotiations with Israel.',
        because:
          'Defeated Arab leaders could not recognize Israel or accept the permanent loss of Arab land without being overthrown by their own people.',
        therefore:
          'Destroyed Israeli hopes of quickly trading captured land for permanent peace treaties, locking both sides into a bitter stalemate.',
        connective:
          'To break the diplomatic deadlock, the United Nations drafted a historic peace formula...',
        exam_link:
          'Q1 Consequence: Blocked early peace negotiations and entrenched the diplomatic stalemate after the 1967 war.',
      },
      {
        step: 3,
        date: '22 November 1967',
        title: 'UN Resolution 242: "Land for Peace"',
        actor: 'The United Nations Security Council',
        tag: 'The Diplomatic Formula',
        trigger:
          'The UN passes Resolution 242, establishing the principle of "Land for Peace": Israel should withdraw from occupied lands in return for Arab recognition of its right to live in peace.',
        because:
          'The superpowers (USA and USSR) wanted to prevent another regional war while resolving the refugee and territorial crisis.',
        therefore:
          'Became the basis for all future peace negotiations, but vague English phrasing ("withdrawal from territories" rather than "all territories") led to years of disagreement.',
        connective:
          'Expecting no quick peace deal, Israel built heavy military fortifications along the new borders...',
        exam_link:
          'Q1 Consequence: Established the international framework of "Land for Peace" that underpinned all subsequent peace talks (Camp David and Oslo).',
      },
      {
        step: 4,
        date: '1968–1969',
        title: 'The Bar-Lev Line on the Suez Canal',
        actor: 'Israeli Military (IDF)',
        tag: 'Fortress Defense',
        trigger:
          'Israel builds a massive defensive barrier of giant sand walls and concrete fortresses along the entire eastern bank of the Suez Canal.',
        because:
          'The Sinai Desert provided Israel with strategic depth to absorb any future Egyptian attack and protect mainland Israeli cities.',
        therefore:
          'Created a false sense of security among Israeli commanders, who believed Egyptian forces could never cross the canal, setting the stage for surprise in 1973.',
        connective:
          'Alongside military forts, Israeli civilians began settling inside the captured Arab territories...',
        exam_link:
          'Q2 Narrative Account: Bred the military overconfidence that left Israeli forces unprepared for the surprise Egyptian canal crossing in 1973.',
      },
      {
        step: 5,
        date: '1968–1973',
        title: 'The Beginning of Israeli Settlements',
        actor: 'Israeli Government & Jewish Settlers',
        tag: 'Settlements in Occupied Land',
        trigger:
          'Israel begins building permanent civilian settlements in the newly captured territories: the West Bank, Golan Heights, and Gaza Strip.',
        because:
          'The Israeli government sought security buffer zones, while religious settlers believed the land belonged to the historic Jewish homeland.',
        therefore:
          'Created permanent Jewish communities inside Palestinian areas, establishing "facts on the ground" that made future territorial compromise far harder.',
        connective:
          'Faced with permanent occupation and defeated Arab armies, Palestinians turned to armed guerrilla warfare...',
        exam_link:
          'Q1 Consequence: Created permanent Jewish settlements in Palestinian territory, which became a major barrier to a two-state solution.',
      },
    ],
  },

  lesson_9: {
    title: 'The Rise of Palestinian Resistance: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '21 March 1968',
        title: 'The Battle of Karameh',
        actor: 'Palestinian Fighters (Fatah) & Jordanian Army vs. Israel',
        tag: 'The Rise of the Fedayeen',
        trigger:
          'Israeli tanks cross the Jordan River to attack a Palestinian guerrilla base at Karameh; Palestinian fighters stand their ground and inflict heavy Israeli casualties.',
        because:
          'Israel launched the punitive raid to crush guerrilla camps carrying out sabotage attacks inside Israel.',
        therefore:
          'Celebrated as an inspiring moral victory across the Arab world; thousands rushed to join the guerrilla resistance, and Yasser Arafat became Chairman of the PLO in 1969.',
        connective:
          'Radical Palestinian factions turned to international terrorism to gain worldwide television attention...',
        exam_link:
          'Q2 Narrative Account: Established Yasser Arafat and Fatah as the dominant leaders of the Palestinian national struggle.',
      },
      {
        step: 2,
        date: 'September 1970',
        title: 'The Dawson’s Field Airline Hijackings',
        actor: 'PFLP (Militant Palestinian Group)',
        tag: 'Hijackings on TV',
        trigger:
          'Palestinian militants hijack four Western passenger airliners, force three to land in the Jordanian desert, and blow up the empty planes on live television.',
        because:
          'Militants wanted to force the release of Palestinian prisoners in Europe and Israel, and draw global attention to the Palestinian cause.',
        therefore:
          'Directly challenged the authority of Jordan’s King Hussein, creating an armed "state within a state" that openly threatened to overthrow the Jordanian monarchy.',
        connective:
          'Furious at being humiliated in his own country, King Hussein ordered his army to crush the PLO...',
        exam_link:
          'Q1 Consequence: Brought the Palestinian issue to global attention, but provoked King Hussein into launching military action against the PLO.',
      },
      {
        step: 3,
        date: 'September 1970',
        title: 'Black September (Civil War in Jordan)',
        actor: 'The Jordanian Army vs. The PLO',
        tag: 'The Expulsion from Jordan',
        trigger:
          'King Hussein sends Jordanian tanks and troops into Amman to crush PLO bases and refugee camps, killing thousands of fighters and civilians.',
        because:
          'The PLO had set up its own armed checkpoints in Jordan, disregarded police authority, and attempted to assassinate King Hussein.',
        therefore:
          'The PLO was completely defeated and expelled from Jordan; Arafat moved his fighters and headquarters to Beirut and southern Lebanon.',
        connective:
          'A vengeful new faction named after the Jordanian defeat carried out a shocking attack on the world stage...',
        exam_link:
          'Q1 Consequence: Led to the expulsion of the PLO from Jordan and the relocation of their bases to Lebanon.',
      },
      {
        step: 4,
        date: '5–6 September 1972',
        title: 'The Munich Olympics Massacre',
        actor: 'Black September Militants',
        tag: 'Terror at the Games',
        trigger:
          'Eight Palestinian terrorists break into the Munich Olympic Village, killing two Israeli athletes and taking nine hostage; all nine hostages die during a botched German rescue attempt.',
        because:
          'The group demanded the release of over 200 Palestinian prisoners held in Israel and worldwide television publicity for the Palestinian cause.',
        therefore:
          'Horrified the global public, heavily damaged the international reputation of the Palestinian movement, and led Israel to launch undercover retaliation.',
        connective:
          'In response to Munich, Israeli Prime Minister Golda Meir ordered a covert campaign against those responsible...',
        exam_link:
          'Q1 Consequence: Branded the Palestinian cause with international terrorism and prompted Israel to launch covert retaliatory strikes.',
      },
      {
        step: 5,
        date: '1972–1979',
        title: 'Israeli Retaliation (Operation Wrath of God)',
        actor: 'Israeli Intelligence (Mossad)',
        tag: 'The Covert War',
        trigger:
          'Israeli secret agents track down and assassinate Palestinian militants linked to the Munich attack across Europe and the Middle East.',
        because:
          'Prime Minister Golda Meir was determined to re-establish deterrence and prove that terrorist attacks on Israelis would never go unpunished.',
        therefore:
          'Eliminated many militant leaders, but sparked cycles of counter-attacks and drew international criticism when an innocent man was killed by mistake.',
        connective:
          'While the covert war raged, Egypt and Syria prepared a massive conventional surprise attack on Israel...',
        exam_link:
          'Q2 Narrative Account: Shows how Israel used targeted assassinations in Europe to restore deterrence after the Munich attack.',
      },
    ],
  },

  lesson_10: {
    title: 'The War of Attrition & The Yom Kippur War: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '1969–1970',
        title: 'The War of Attrition',
        actor: 'Egypt vs. Israel',
        tag: 'Canal Artillery Duels',
        trigger:
          'Nasser launches an 18-month campaign of heavy artillery shelling and commando raids across the Suez Canal; Israel responds with massive air strikes.',
        because:
          'Egypt refused to accept the Israeli occupation of the Sinai Peninsula and wanted to wear down the Israeli military and economy.',
        therefore:
          'Cost thousands of lives, damaged towns along the canal, and brought Soviet surface-to-air missiles to the Egyptian side of the canal.',
        connective:
          'Egypt’s new president tried diplomacy to regain Sinai, but his overtures were ignored...',
        exam_link:
          'Q2 Narrative Account: Showed Egypt’s refusal to accept the loss of Sinai, setting the stage for the Yom Kippur War.',
      },
      {
        step: 2,
        date: '1971–1972',
        title: 'Sadat Expels Soviet Advisers',
        actor: 'President Anwar Sadat of Egypt',
        tag: 'The Diplomatic Turn',
        trigger:
          'Anwar Sadat expels 15,000 Soviet military advisers from Egypt after his peace proposals to return Sinai are ignored by Israel and the USA.',
        because:
          'Israel felt completely secure behind the Bar-Lev Line, while the Soviets refused to provide offensive weapons to attack Israel.',
        therefore:
          'Convinced Sadat that only a surprise military strike could break the stalemate and force the USA and Israel to take peace talks seriously.',
        connective:
          'Sadat coordinated with Syria to launch a shock attack on the holiest day of the Jewish year...',
        exam_link:
          'Q1 Consequence: Convinced Sadat that war was the only way to shatter Israeli complacency and force diplomatic negotiations.',
      },
      {
        step: 3,
        date: '6 October 1973',
        title: 'The Surprise Attack on Yom Kippur',
        actor: 'Egypt & Syria vs. Israel',
        tag: 'The Two-Front Surprise',
        trigger:
          'Egyptian troops cross the Suez Canal and blast through the Bar-Lev Line, while hundreds of Syrian tanks storm the Golan Heights.',
        because:
          'Launched on Yom Kippur (the Jewish Day of Atonement), catching Israeli forces completely off-guard with reserve troops not yet mobilised.',
        therefore:
          'Overran Israeli defenses, destroyed hundreds of Israeli tanks, and shattered the myth of Israeli military invincibility.',
        connective:
          'Facing catastrophic losses, Israel turned to the United States for an emergency resupply...',
        exam_link:
          'Q1 Consequence: Shattered Israeli military overconfidence and proved that Arab armies could mount sophisticated, coordinated offensives.',
      },
      {
        step: 4,
        date: '12–16 October 1973',
        title: 'The US Emergency Airlift & Israeli Counter-Attack',
        actor: 'The USA & Israeli Army (IDF)',
        tag: 'The Battlefield Turn',
        trigger:
          'The US flies thousands of tons of emergency military supplies to Israel; Israeli forces counter-attack, crossing the Suez Canal and cutting off Egypt’s Third Army.',
        because:
          'The USA feared Israel was running out of tanks and ammunition and might face total military collapse.',
        therefore:
          'Turned the tide of battle in Israel’s favor, but brought the USA and USSR dangerously close to a direct Cold War confrontation.',
        connective:
          'To stop the Israeli advance and punish Western allies, Arab oil producers deployed an economic weapon...',
        exam_link:
          'Q2 Narrative Account: Massive US military aid saved Israel from defeat, while Israeli counter-attacks forced the superpowers to broker a ceasefire.',
      },
      {
        step: 5,
        date: 'October 1973',
        title: 'The Arab Oil Embargo & Ceasefire',
        actor: 'Arab Oil Producers (OPEC) & The UN',
        tag: 'The Oil Weapon',
        trigger:
          'Arab oil-producing nations cut oil production and embargo crude oil exports to the USA and the Netherlands; the UN enforces a ceasefire.',
        because:
          'Arab nations wanted to punish Western supporters of Israel and force the West to pressure Israel into returning captured Arab territories.',
        therefore:
          'Quadrupled world oil prices, triggered global fuel shortages, and convinced the USA that resolving the Middle East conflict was an urgent priority.',
        connective:
          'The oil shock forced the US government to lead intense diplomatic negotiations to prevent future wars...',
        exam_link:
          'Q1 Consequence: The oil crisis made Middle Eastern peace an urgent priority for US foreign policy, leading directly to Kissinger’s shuttle diplomacy.',
      },
    ],
  },

  lesson_11: {
    title:
      'Diplomatic Negotiations: From Shuttle Diplomacy to Camp David: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: '1974–1975',
        title: 'Kissinger’s Shuttle Diplomacy',
        actor: 'US Secretary of State Henry Kissinger',
        tag: 'Step-by-Step Diplomacy',
        trigger:
          'Henry Kissinger flies repeatedly between Cairo, Jerusalem, and Damascus to negotiate troop pullbacks and disengagement agreements.',
        because:
          'The USA wanted to end the oil crisis, prevent another war, and pull Egypt away from its alliance with the Soviet Union.',
        therefore:
          'Israel pulled back from the Suez Canal, allowing Egypt to clear and reopen the canal to world shipping in 1975.',
        connective:
          'President Sadat decided to take a dramatic personal gamble to break thirty years of deadlock...',
        exam_link:
          'Q2 Narrative Account: Restored civilian shipping through the Suez Canal and established the US as the primary mediator in Middle East diplomacy.',
      },
      {
        step: 2,
        date: 'November 1977',
        title: 'Sadat’s Historic Visit to Jerusalem',
        actor: 'President Anwar Sadat of Egypt',
        tag: 'The Bold Peace Move',
        trigger:
          'Sadat travels to Israel and addresses the Israeli parliament (the Knesset) in Jerusalem, directly offering peace in return for occupied Arab land.',
        because:
          'Egypt’s economy was struggling from decades of military spending, and Sadat knew only a dramatic gesture could convince Israelis he was serious about peace.',
        therefore:
          'Broke the 30-year Arab taboo against direct recognition of Israel, opening direct peace negotiations with Israeli Prime Minister Menachem Begin.',
        connective:
          'When negotiations stalled over the details, the US President stepped in to force a breakthrough...',
        exam_link:
          'Q1 Consequence: Shattered psychological barriers between Egypt and Israel, paving the way for the Camp David summit.',
      },
      {
        step: 3,
        date: 'September 1978',
        title: 'The Camp David Summit',
        actor: 'Jimmy Carter, Anwar Sadat, Menachem Begin',
        tag: '13 Days of Talks',
        trigger:
          'US President Jimmy Carter hosts Sadat and Begin at the Camp David presidential retreat in Maryland for 13 days of intense, closed-door negotiations.',
        because:
          'Talks were on the verge of collapsing over Israeli settlements in Sinai and Palestinian self-government in the West Bank.',
        therefore:
          'Produced the Camp David Accords, setting out a framework for peace between Egypt and Israel and future Palestinian self-rule.',
        connective:
          'The Camp David breakthrough culminated in a formal peace treaty signed on the White House lawn...',
        exam_link:
          'Q1 Consequence: Established the framework that produced the first peace treaty between Israel and an Arab nation.',
      },
      {
        step: 4,
        date: '26 March 1979',
        title: 'The Egypt-Israel Peace Treaty',
        actor: 'Egypt & Israel (Hosted by USA)',
        tag: 'The Treaty of Washington',
        trigger:
          'Sadat and Begin sign the first formal peace treaty between Israel and an Arab nation, ending 30 years of war.',
        because:
          'Israel agreed to return all of Sinai to Egypt, while Egypt agreed to recognize Israel and allow Israeli ships through the Suez Canal.',
        therefore:
          'Removed the Arab world’s largest army from the military conflict; the USA rewarded both countries with billions of dollars in annual financial and military aid.',
        connective:
          'However, signing a separate peace treaty provoked fury across the rest of the Arab world...',
        exam_link:
          'Q1 Consequence: Ended the military threat from Egypt, securing Israel’s southern border for the first time since 1948.',
      },
      {
        step: 5,
        date: '1979–1981',
        title: 'Arab Boycott & The Assassination of Sadat',
        actor: 'The Arab League & Extremist Gunmen',
        tag: 'The Deadly Backlash',
        trigger:
          'The Arab League expels Egypt and cuts off diplomatic ties; in October 1981, Muslim extremists assassinate President Sadat at a military parade.',
        because:
          'Arab leaders and extremists viewed Sadat’s separate peace deal as a betrayal of the Palestinian cause.',
        therefore:
          'Egypt remained committed to the peace treaty, but was isolated by the Arab world, leaving Israel with no other peace partners for 15 years.',
        connective:
          'With Egypt at peace, the focus of the Arab-Israeli conflict shifted north to Lebanon and the Palestinian issue...',
        exam_link:
          'Q1 Consequence: Left Egypt diplomatically isolated in the Arab world and showed the extreme danger facing leaders who compromised with Israel.',
      },
    ],
  },

  lesson_12: {
    title:
      'The Palestinian Issue: Lebanon, Sabra & Shatila, and the First Intifada: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: 'June 1982',
        title: 'The Israeli Invasion of Lebanon',
        actor: 'Israeli Defence Forces (IDF)',
        tag: 'Operation Peace for Galilee',
        trigger:
          'Israel launches a major invasion of Lebanon with 76,000 troops, advancing all the way to the capital city, Beirut.',
        because:
          'Israel wanted to destroy PLO bases in southern Lebanon that had been firing rockets and staging attacks across the Israeli border.',
        therefore:
          'Caused heavy destruction in Beirut and forced Yasser Arafat and 14,000 PLO fighters to evacuate Lebanon to exile in Tunisia.',
        connective:
          'In the chaotic aftermath of the PLO’s departure, a horrific atrocity was carried out against civilians...',
        exam_link:
          'Q1 Consequence: Expelled the PLO military leadership from Lebanon, scattering them across the Arab world to distant Tunisia.',
      },
      {
        step: 2,
        date: 'September 1982',
        title: 'The Sabra and Shatila Massacres',
        actor: 'Lebanese Christian Militias & The IDF',
        tag: 'The Humanitarian Outrage',
        trigger:
          'Lebanese Christian Phalangist militia enter the Sabra and Shatila refugee camps in Beirut, killing hundreds of Palestinian civilians while Israeli troops surround the camps.',
        because:
          'The Christian militia sought revenge for the assassination of their leader, while Israeli commanders failed to intervene to stop the killings.',
        therefore:
          'Caused massive international outrage and a huge anti-war protest in Tel Aviv; an Israeli official inquiry forced Defence Minister Ariel Sharon to resign.',
        connective:
          'With the PLO exiled far away in Tunisia, frustration among Palestinians in the occupied territories reached breaking point...',
        exam_link:
          'Q1 Consequence: Triggered international condemnation and led to the resignation of Israeli Defence Minister Ariel Sharon.',
      },
      {
        step: 3,
        date: 'December 1987',
        title: 'Outbreak of the First Intifada',
        actor: 'Palestinian Civilians in West Bank & Gaza',
        tag: 'The Mass Uprising',
        trigger:
          'An Israeli military vehicle collides with civilian cars in Gaza, killing four Palestinians; spontaneous riots and strikes erupt across the West Bank and Gaza.',
        because:
          'Twenty years of military occupation: land confiscations, growing Jewish settlements, lack of civil rights, and daily curfews.',
        therefore:
          'Turned into a mass civilian uprising (the Intifada, or "shaking off") featuring street strikes, boycotts, and stone-throwing led by local youths.',
        connective:
          'As the Israeli military struggled to control civilian protests, a radical new movement emerged...',
        exam_link:
          'Q1 Consequence: Transformed the conflict from cross-border military attacks into a mass grassroots civilian uprising inside the occupied territories.',
      },
      {
        step: 4,
        date: '1987–1988',
        title: 'The Israeli Response & The Rise of Hamas',
        actor: 'The Israeli Military & Hamas',
        tag: 'The Radical Division',
        trigger:
          'Israel uses tough riot-control measures against stone-throwers; a new Islamic militant group, Hamas, is formed in Gaza.',
        because:
          'The Israeli army was trained for conventional tank battles, not civilian street riots; Hamas rejected compromise, calling for an Islamic state over all of Palestine.',
        therefore:
          'TV images of soldiers clashing with teenage stone-throwers damaged Israel’s international image; Hamas emerged as a powerful, violent rival to the secular PLO.',
        connective:
          'Pressured by the uprising and the rise of Hamas, Yasser Arafat made a historic diplomatic pivot...',
        exam_link:
          'Q2 Narrative Account: The rise of Hamas divided Palestinian leadership, introducing suicide bombings and challenging Arafat’s authority.',
      },
      {
        step: 5,
        date: 'December 1988',
        title: 'Arafat Renounces Terrorism & Accepts Resolution 242',
        actor: 'Yasser Arafat (PLO Chairman) & The UN',
        tag: 'The Historic Concession',
        trigger:
          'Yasser Arafat addresses the United Nations, explicitly renouncing all terrorism and recognizing Israel’s right to exist under UN Resolution 242.',
        because:
          'The Intifada showed that Palestinians wanted an independent state in the West Bank and Gaza, and Arafat needed US diplomatic support.',
        therefore:
          'Satisfied US conditions, opening the first direct official talks between the USA and the PLO, laying the groundwork for Madrid and Oslo.',
        connective:
          'This diplomatic breakthrough, combined with the end of the Cold War, opened the door to peace talks in the 1990s...',
        exam_link:
          'Q1 Consequence: Opened direct diplomatic relations between the US and the PLO, paving the way for the Madrid and Oslo peace talks.',
      },
    ],
  },

  lesson_13: {
    title: 'Attempts at a Solution: From Madrid to Oslo II: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 2 Exam Strategy for Q1 Consequence [4m] & Q2 Narrative Account [8m]',
    exam_strategy:
      'Paper 2 tests chronological progression and causal consequence: Event A provoked Decision B, which triggered Action C.',
    stages: [
      {
        step: 1,
        date: 'October 1991',
        title: 'The Madrid Peace Conference',
        actor: 'USA, USSR, Israel & Arab States',
        tag: 'Face-to-Face Talks',
        trigger:
          'The USA and Soviet Union co-sponsor the first direct peace conference in Madrid, bringing Israeli and Arab delegates into the same room.',
        because:
          'Following victory in the 1991 Gulf War, the US was the dominant superpower in the region and pressured all parties to sit down together.',
        therefore:
          'Broke the long-standing taboo against face-to-face negotiations, although formal public speeches soon became bogged down in arguments.',
        connective:
          'Frustrated by stalled public talks, Israeli and Palestinian negotiators opened a secret backchannel in Europe...',
        exam_link:
          'Q2 Narrative Account: Brought Israeli and Arab leaders together for the first time, paving the way for secret bilateral negotiations.',
      },
      {
        step: 2,
        date: '1993',
        title: 'The Secret Oslo Negotiations',
        actor: 'Israeli & Palestinian Negotiators',
        tag: 'The Secret Talks',
        trigger:
          'Israeli and Palestinian representatives hold 14 rounds of secret face-to-face talks in Norway, bypassing the media and politicians.',
        because:
          'Newly elected Israeli Prime Minister Yitzhak Rabin realized official talks were deadlocked and feared the rising popularity of extremist groups like Hamas.',
        therefore:
          'Allowed negotiators to build trust and draft a historic breakthrough: mutual recognition and a timetable for Palestinian self-government.',
        connective:
          'The secret Norwegian breakthrough led to an unforgettable ceremony on the world stage...',
        exam_link:
          'Q1 Consequence: Bypassed public political posturing and produced the historic Declaration of Principles.',
      },
      {
        step: 3,
        date: '13 September 1993',
        title: 'The Oslo I Accord & The White House Handshake',
        actor: 'Yitzhak Rabin, Yasser Arafat & Bill Clinton',
        tag: 'The Historic Handshake',
        trigger:
          'Rabin and Arafat sign the Declaration of Principles on the White House lawn, sealed with a historic handshake hosted by US President Bill Clinton.',
        because:
          'The PLO formally recognized Israel’s right to exist in peace; Israel recognized the PLO as the official representative of the Palestinian people.',
        therefore:
          'Set up the Palestinian Authority (PA) to govern Gaza and the West Bank town of Jericho, leaving the hardest issues (Jerusalem, refugees, borders) for later talks.',
        connective:
          'The momentum of Oslo immediately unlocked a second peace treaty on Israel’s eastern border...',
        exam_link:
          'Q1 Consequence: Created the Palestinian Authority and established the framework for Palestinian self-rule in Gaza and the West Bank.',
      },
      {
        step: 4,
        date: '1994–1995',
        title: 'Israel-Jordan Peace Treaty & Oslo II',
        actor: 'King Hussein, Yitzhak Rabin & Yasser Arafat',
        tag: 'Dividing the West Bank',
        trigger:
          'King Hussein of Jordan signs a formal peace treaty with Israel (1994); in 1995, Oslo II divides the West Bank into Areas A, B, and C.',
        because:
          'Jordan felt safe to make peace after the Palestinian agreement, while negotiators sought to gradually transfer civil control in the West Bank.',
        therefore:
          'Secured Israel’s border with Jordan, but dividing the West Bank into disconnected zones angered both Israeli settlers and Palestinian nationalists.',
        connective:
          'Territorial compromises provoked violent anger from extremists on both fringes...',
        exam_link:
          'Q1 Consequence: Secured Israel’s eastern frontier with Jordan and established the three administrative zones in the West Bank.',
      },
      {
        step: 5,
        date: '4 November 1995',
        title: 'Extremist Violence & The Assassination of Rabin',
        actor: 'Extremists vs. Prime Minister Yitzhak Rabin',
        tag: 'The Peace Process Shattered',
        trigger:
          'Following deadly suicide bombings by Hamas and violent protests by right-wing Israelis, Prime Minister Yitzhak Rabin is assassinated by a Jewish extremist in Tel Aviv.',
        because:
          'Extremists on both sides rejected any compromise, viewing the peace process as a betrayal of their national and religious land.',
        therefore:
          'Dealt a devastating psychological blow to the peace process, shattering Israeli confidence and slowing down the implementation of future peace agreements.',
        connective:
          'Rabin’s murder and continued terror attacks led to the election of right-wing leader Benjamin Netanyahu in 1996, stalling the Oslo process.',
        exam_link:
          'Q1 Consequence: Shattered the momentum of the Oslo peace process and deepened division within Israeli society.',
      },
    ],
  },
};

console.log('Writing updated data.js files...');

// Process units/cme_new/data.js and public/units/cme_new/data.js
const targets = [
  path.join(__dirname, '../units/cme_new/data.js'),
  path.join(__dirname, '../public/units/cme_new/data.js'),
];

for (const filePath of targets) {
  console.log(`Processing ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [lessonKey, spineData] of Object.entries(REFINED_SPINES)) {
    // Find the lesson in content
    const lessonPattern = new RegExp(`id:\\s*['"]${lessonKey}['"]`);
    const match = lessonPattern.exec(content);
    if (!match) {
      console.warn(`Could not find lesson ${lessonKey} in ${filePath}`);
      continue;
    }

    const lessonStart = match.index;
    // Find causal_domino_spine: { in this lesson
    const spineStart = content.indexOf('causal_domino_spine:', lessonStart);
    if (spineStart === -1) {
      console.warn(`Could not find causal_domino_spine for ${lessonKey}`);
      continue;
    }

    // Find the opening brace of causal_domino_spine
    const openBrace = content.indexOf('{', spineStart);
    if (openBrace === -1) continue;

    // Balance braces to find the end of causal_domino_spine object
    let depth = 1;
    let pos = openBrace + 1;
    while (pos < content.length && depth > 0) {
      if (content[pos] === '{') depth++;
      else if (content[pos] === '}') depth--;
      pos++;
    }
    const spineEnd = pos;

    const formattedSpine = JSON.stringify(spineData, null, 2)
      .split('\n')
      .map((line, idx) => (idx === 0 ? line : '      ' + line))
      .join('\n');

    content =
      content.slice(0, spineStart) +
      'causal_domino_spine: ' +
      formattedSpine +
      content.slice(spineEnd);
    console.log(`  Updated ${lessonKey} causal_domino_spine successfully.`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved ${filePath}.`);
}

console.log('Validating syntax of units/cme_new/data.js...');
