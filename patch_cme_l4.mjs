import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(filePath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonStr = content.substring(jsonStart, content.lastIndexOf('}') + 1);

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error("Parse error:", e);
  process.exit(1);
}

const newLesson = {
  "id": "lesson_4",
  "title": "Lesson 4: The Six Day War, 1967",
  "do_now": {
    "type": "retrieval",
    "tasks": [
      { "question": "Who became the President of Egypt in 1954 and positioned himself as the leading champion of Pan-Arabism?", "answer": "Colonel Gamal Abdel Nasser." },
      { "question": "What was the name of the highly secret agreement signed in October 1956 where Britain, France, and Israel planned the tripartite invasion of Egypt?", "answer": "The Protocol of Sèvres." },
      { "question": "Explain the immediate cause behind Nasser’s decision to nationalise the Suez Canal Company on 26 July 1956.", "answer": "Nasser nationalised the canal to use its £35 million annual toll revenues to directly fund his pride project, the Aswan High Dam, after the USA and Great Britain abruptly withdrew their joint offer of financial loans." },
      { "question": "What was the 1955 Gaza Raid, and why was it a turning point for Egyptian defense policy?", "answer": "The Gaza Raid was a massive Israeli reprisal attack in February 1955 that killed 38 Egyptian soldiers. It humiliated Nasser and proved to him that his military was too weakly equipped, prompting him to look to the Soviet bloc for advanced weaponry." },
      { "question": "How did Nasser successfully bypass Western weapons restrictions in September 1955 to rearm Egypt?", "answer": "Nasser signed the Czech Arms Deal. Under this agreement, Czechoslovakia supplied Egypt with a massive modern arsenal, including 200 MiG-15 jet fighters, 300 tanks, and heavy artillery." }
    ]
  },
  "vocab": [
    {
      "term": "PLO (Palestine Liberation Organisation)",
      "definition": "An umbrella political organisation created in 1964 by the Arab League, designed to unite Palestinian resistance groups and reclaim the lost homeland."
    },
    {
      "term": "Fatah",
      "definition": "A radical guerrilla movement founded by Yasser Arafat that believed in using irregular armed resistance to liberate Palestine."
    },
    {
      "term": "Pre-emptive Strike",
      "definition": "A surprise military attack launched to destroy the enemy's forces before they have the chance to launch their own impending invasion."
    },
    {
      "term": "Casus Belli",
      "definition": "A Latin phrase meaning an act or event that directly provokes or is used to justify a formal declaration of war."
    }
  ],
  "vocab_cloze_text": "In 1964, the Arab League established the [PLO (Palestine Liberation Organisation)] to unite the fragmented Palestinian resistance. However, a more radical group known as [Fatah] began dominating military activity by launching cross-border sabotage raids. As tensions escalated in May 1967, Egypt closed the Straits of Tiran—an act Israel considered a formal [Casus Belli]. Facing imminent invasion, Israel launched a devastating [Pre-emptive Strike] on 5 June, destroying the Arab air forces on the ground.",
  "narrative": [
    `<pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; overflow-x: auto; font-size: 14px; line-height: 1.2; margin-bottom: 20px;">
======================================================================================
                  SPECIFICATION STUDY MAP: KEY TOPIC 2.1
======================================================================================
1. Palestinian Nationalism ➔ Cairo Conference (1964), creation of the PLO and Fatah.
2. Border Wars & Skirmishes ➔ Disputes over Jordan water, Samu Raid (1966), 7 April 1967.
3. The Slide to War (May '67) ➔ Soviet misinformation, UNEF withdrawal, closure of Tiran.
4. The Six Day War ➔ June 5 pre-emptive strike, lightning land war, redrawn boundaries.
======================================================================================
</pre>`,
    "The decade of relative border peace secured by the UN Emergency Force (UNEF) buffer began to disintegrate in the mid-1960s as a new wave of radical Palestinian nationalism swept the region. In January 1964, President Nasser hosted the historic Cairo Conference of the Arab League.",
    "At this summit, Arab leaders took the monumental step of establishing the Palestine Liberation Organisation (PLO). The primary objective of the PLO was to unite various Palestinian resistance groups under a single political umbrella to destroy the State of Israel and reclaim the lost homeland for the Palestinian refugees.",
    `<pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; overflow-x: auto; font-size: 14px; line-height: 1.2;">
                  [THE 1964 CAIRO CONFERENCE]
                               │
         ┌─────────────────────┴─────────────────────┐
         ▼                                           ▼
[Establishment of the PLO]                  [Dispute Over River Jordan]
- Goal: Unite resistance groups             - Israel builds National Water Carrier
- Officially backed by Arab League          - Arab states build diversion canals
- Emergence of Fatah as military force      - Led to intense border tank/artillery battles
</pre>`,
    "Alongside this diplomatic development, a radical guerrilla movement called Fatah (founded in 1959 by Yasser Arafat) began to dominate Palestinian military activity. Unlike older Arab politicians who relied on conventional state-to-state warfare, Fatah believed that only a grassroots, irregular guerrilla war could liberate Palestine.",
    "At the Cairo Conference, tensions also flared over a vital shared resource: water. Israel had completed its massive National Water Carrier engineering project to divert fresh water from the Sea of Galilee south to irrigate the Negev Desert. Viewing this as an act of aggression, Arab leaders at the conference agreed to divert the headwaters of the River Jordan (specifically the Dan and Banias rivers) inside Syria and Lebanon to starve Israel of water.",
    "By 1965, this dispute erupted into an active border war. Whenever Syrian workers began building diversion canals, Israeli tanks and artillery fired across the border to destroy their heavy machinery, driving Syria and Israel into a cycle of violent border clashes.",
    "By 1966, the border between Israel and its Arab neighbours had become a volatile combat zone. This escalation was fueled primarily by a radical, left-wing military coup in Syria in February 1966.",
    "The new Syrian government adopted a fiercely aggressive posture toward Israel. They began actively sponsoring Fatah, providing Palestinian guerrilla fighters with funds, modern explosives, and training bases inside Syrian territory.",
    "From these bases, Fatah launched a relentless campaign of cross-border sabotage raids into Israel. Rather than attacking the Syrian military directly, Israel's retaliatory strikes focused on the countries from which Fatah fighters infiltrated, pushing relations to the breaking point:",
    `<pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; overflow-x: auto; font-size: 14px; line-height: 1.2;">
[Syria funds/arms Fatah guerrillas] ➔ [Fatah launches sabotage raids into Israel]
                                                   │
[IDF launches massive reprisal on Jordanian Samu] ➔ [King Hussein is deeply alienated]
</pre>`,
    "The Samu Raid (November 1966): After a Fatah landmine killed three Israeli border policemen, Prime Minister Levi Eshkol ordered a massive reprisal raid into Jordan, which controlled the West Bank. On 13 November 1966, 600 IDF troops backed by tanks swept into the Jordanian village of Samu, dynamiting dozens of homes and clashing with the Jordanian military, leaving 15 Jordanian soldiers dead. The raid deeply embarrassed King Hussein of Jordan, who publicly accused President Nasser of hiding behind UN peacekeepers instead of helping defend his Arab allies.",
    "The Air Clash of 7 April 1967: Skirmishes on the Syrian border erupted into full-scale combat when Syrian artillery on the Golan Heights began bombarding Israeli tractors farming in the demilitarised zone. The Israeli air force responded aggressively. In a dramatic aerial dogfight over Damascus, Israeli fighter jets shot down six Syrian Soviet-built MiG-21 jets in a single afternoon. This humiliating defeat left the Syrian leadership desperate to find a way to restore their military honor.",
    `<pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; overflow-x: auto; font-size: 14px; line-height: 1.2;">
======================================================================================
                     THE MAY 1967 CASCADE: CHRONOLOGY OF CRISIS
======================================================================================
13 May ➔ Soviet Misinformation: USSR falsely tells Nasser Israel is massing troops on Syria.
15 May ➔ Egyptian Mobilization: Nasser puts army on alert, moves troops into Sinai.
16 May ➔ UN Out: Nasser orders UN peacekeepers (UNEF) to evacuate the border buffer.
23 May ➔ Maritime Blockade: Egypt closes the Straits of Tiran, choking Israel's port of Eilat.
30 May ➔ Encirclement: King Hussein of Jordan signs a joint defence pact with Egypt.
======================================================================================
</pre>`,
    "The humilation of the April air clash set off a rapid chain reaction in May 1967 that made a major regional war virtually inevitable.",
    "The Catalyst: Soviet Misinformation (13 May). The Soviet Union intervened by issuing a formal, highly urgent warning to President Nasser, claiming that Israel was massing ten brigades on the Syrian border for a full-scale invasion. This report was completely false—UN observers on the ground confirmed there was no Israeli troop build-up—but it placed Nasser under immense pressure to act.",
    "Nasser’s Gamble: Accused of cowardice by Jordan and Syria, Nasser decided he had to demonstrate his leadership of the Arab world. On 15 May, he placed the Egyptian army on high alert and marched his troops across the Suez Canal into the Sinai Desert. On 16 May, he ordered the UNEF commander to immediately withdraw all UN peacekeepers from the Sinai border, leaving the Egyptian and Israeli armies standing face-to-face.",
    "Closing the Straits of Tiran (23 May): In his most dangerous move, Nasser ordered Egyptian troops to reoccupy Sharm el-Sheikh and closed the Straits of Tiran to all Israeli shipping. Israel had repeatedly declared that closing the Straits would be considered a formal casus belli (an act of war), as it choked off its oil imports and trade through Eilat.",
    "The Jordan-Egypt Defence Pact (30 May): To Israel’s horror, King Hussein of Jordan flew to Cairo and signed a mutual defence treaty with Nasser, placing the Jordanian army under the command of an Egyptian general. Israel now faced a fully coordinated military encirclement on three fronts by armies openly calling for its destruction.",
    "Believing an Arab invasion was imminent, the newly formed Israeli National Unity Government—including war hero Moshe Dayan as Defense Minister—decided to launch a pre-emptive strike to secure its survival.",
    "The Air War: Operation Focus (5 June 1967). On the morning of 5 June 1967, Israel launched Operation Focus, the most successful pre-emptive air strike in modern military history. At 7:45 AM, nearly the entire Israeli air force flew low over the Mediterranean Sea to evade Egyptian radar, catching the Egyptian air force completely by surprise as they ate breakfast.",
    "Within three hours, Israeli jets bombed the runways and destroyed 309 of Egypt's 340 combat aircraft while they were still parked on the tarmac.",
    "Later that day, when Syria, Jordan, and Iraq entered the war, Israel turned its jets on their airfields, destroying their air forces as well. By the end of day one, Israel had secured absolute air superiority, guaranteeing its ground forces total protection and leaving Arab infantry completely exposed to aerial attack.",
    `<pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; overflow-x: auto; font-size: 14px; line-height: 1.2;">
                 [OPERATION FOCUS: 5 JUNE 1967]
                               │
[Low-altitude surprise air strike] ➔ [Egyptian radar successfully bypassed]
                               │
[Bomb runways & destroy 309 Egyptian jets] ➔ [Total Israeli air superiority secured]
</pre>`,
    "The Land War: The Lightning Conquests. With the skies secured, the IDF launched a highly coordinated, three-front blitzkrieg that redrew the map of the Middle East in just six days.",
    "The Southern Front (Egypt): Israeli tank divisions led by General Ariel Sharon raced across the Sinai Desert, routing the Egyptian forces and advancing all the way to the east bank of the Suez Canal, capturing the entire Sinai Peninsula and the Gaza Strip.",
    "The Eastern Front (Jordan): After Jordan began shelling West Jerusalem, Israeli forces launched a fierce counter-offensive. They captured the entire West Bank and, in a deeply emotional victory, took control of the Old City of East Jerusalem, reuniting the city under Jewish control for the first time in 2,000 years.",
    "The Northern Front (Syria): On 9 June, Israeli forces turned north and scaled the steep cliffs of the Golan Heights under heavy Syrian fire, capturing the strategic plateau and putting the Syrian capital of Damascus within range of Israeli artillery.",
    "By the time a United Nations ceasefire took effect on 10 June 1967, the war was over. Israel had achieved a miraculous victory, defeating three major Arab armies and expanding its territory to three times its pre-war size.",
    `<table style="width:100%; border-collapse: collapse; margin: 15px 0;">
      <thead>
        <tr>
          <th style="border: 1px solid #cbd5e1; padding: 10px; background: #e2e8f0;">Captured Territory</th>
          <th style="border: 1px solid #cbd5e1; padding: 10px; background: #e2e8f0;">Captured From</th>
          <th style="border: 1px solid #cbd5e1; padding: 10px; background: #e2e8f0;">Strategic Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Sinai Peninsula</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Egypt</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Vast desert buffer zone</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Gaza Strip</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Egypt</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Eliminated Fedayeen bases</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">West Bank</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Jordan</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Defensible borders (Jordan)</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">East Jerusalem</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Jordan</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Holy Sites (Western Wall)</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Golan Heights</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Syria</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px;">Protected Galilee farming</td>
        </tr>
      </tbody>
    </table>`
  ],
  "tasks": [
    {
      "question": "Write a narrative account analysing the key events of the May 1967 crisis that led to the outbreak of the Six Day War. (8 marks)",
      "type": "narrative_account",
      "model": "The May 1967 crisis began with false intelligence provided by the Soviet Union on 13 May, which warned Egyptian President Nasser that Israel was massing ten military brigades on the Syrian border for an imminent invasion. This false report put Nasser under intense pressure to prove his leadership of the Arab world and fulfill his mutual defense pact with Syria.\n\nConsequently, Nasser reacted by taking immediate military action, mobilizing the Egyptian army on 15 May and marching his troops into the demilitarised Sinai Peninsula. This aggressive move was quickly followed by Nasser’s order on 16 May forcing the United Nations Emergency Force (UNEF) peacekeepers to withdraw from the border, removing the buffer zone that had kept the peace since 1957 and leaving the Egyptian and Israeli militaries standing face-to-face.\n\nWith tensions already at a fever pitch, Nasser escalated the crisis further on 23 May by reoccupying Sharm el-Sheikh and ordering the closure of the Straits of Tiran to all Israeli shipping. This maritime blockade directly threatened Israel's economic survival by cutting off oil imports through Eilat, a move Israel had long declared to be a formal casus belli.\n\nThis economic threat was compounded on 30 May when King Hussein of Jordan flew to Cairo to sign a joint defense pact, placing his army under an Egyptian general. This final step convinced the Israeli Cabinet that a coordinated, three-front Arab invasion was imminent. This sequence of events culminated on the morning of 5 June 1967, when Israel launched its pre-emptive air strike, Operation Focus, destroying the Egyptian air force on the ground and initiating the Six Day War."
    }
  ],
  "learning_objective": "To understand the causes and immediate consequences of the Six Day War.",
  "learning_objectives": {
    "overarching": "To evaluate how border tensions and political brinkmanship led to the Six Day War.",
    "scaffolded": [
      "Explain how disputes over water and guerrilla raids increased tensions.",
      "Identify the key turning points of the May 1967 Crisis.",
      "Analyse the strategic impact of Israel's territorial conquests."
    ]
  },
  "teacher_notes": {
    "primer": "This lesson details the critical escalation from border skirmishes to full-scale regional conflict. The focus should be on how the 'May 1967 Cascade' created an unstoppable momentum toward war. Students must understand that while Nasser initiated the blockade and mobilisation, it was Israel that launched the pre-emptive strike, radically altering the geopolitical map.",
    "objectives": [
      {
        "objective": "Explain how disputes over water and guerrilla raids increased tensions.",
        "primer": "Direct students to the Cairo Conference flowchart and the Samu Raid narrative. Emphasise that state-sponsored guerrilla warfare (Fatah) created an environment where conventional retaliation was inevitable.",
        "question": "Why did the creation of Fatah and the dispute over the River Jordan make border clashes inevitable?"
      },
      {
        "objective": "Identify the key turning points of the May 1967 Crisis.",
        "primer": "Use the 'Chronology of Crisis' study map. Walk students through each step from May 13 to May 30, showing how each action (Soviet misinfo -> UNEF withdrawal -> Blockade) boxed both sides into a corner.",
        "question": "Which event in May 1967 do you think made war truly unavoidable, and why?"
      },
      {
        "objective": "Analyse the strategic impact of Israel's territorial conquests.",
        "primer": "Use the final 'Redrawn Map' table. Help students visualize how expanding from the vulnerable 'Green Line' to the Jordan River and Suez Canal provided massive strategic depth but also sowed the seeds for future conflicts.",
        "question": "How did capturing the West Bank, Golan Heights, and Sinai Peninsula change Israel's strategic position overnight?"
      }
    ]
  }
};

const lessonIndex = data.lessons.findIndex(l => l.id === "lesson_4");
if (lessonIndex > -1) {
    data.lessons[lessonIndex] = newLesson;
} else {
    data.lessons.push(newLesson);
}

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully injected Lesson 4 into cme_new/data.js");
