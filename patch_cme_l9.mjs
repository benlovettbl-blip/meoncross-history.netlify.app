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

const doNowItems = [
  {
    "question": "What was the famous metaphor Yasser Arafat used in his historic 1974 address to the United Nations General Assembly?",
    "answer": "Arafat famously stated that he came bearing both an \"olive branch\" (diplomacy) and a \"freedom fighter's gun\" (armed struggle)."
  },
  {
    "question": "What major diplomatic status did the UN General Assembly award the PLO under Resolution 3236 following Arafat's speech?",
    "answer": "The PLO was granted permanent Observer Status at the United Nations, officially recognizing it as the representative of the Palestinian people."
  },
  {
    "question": "Why did the PLO choose to relocate its central headquarters and fighters to Lebanon after being expelled from Jordan in 1970–71?",
    "answer": "Lebanon was an ideal sanctuary because its central government was exceptionally weak and politically fractured, and it already hosted over 400,000 Palestinian refugees."
  },
  {
    "question": "What was 'Fatahland,' and how did its existence affect northern Israeli security?",
    "answer": "'Fatahland' was the name given to southern Lebanon, where the PLO established a 'state-within-a-state.' From here, guerrillas launched Katyusha rockets into northern Israel."
  },
  {
    "question": "Explain the short-term trigger that Ariel Sharon used as a pretext to launch the June 1982 invasion of Lebanon.",
    "answer": "The immediate trigger was the attempted assassination of Shlomo Argov, the Israeli ambassador to Great Britain, by the extremist Abu Nidal Organization."
  },
  {
    "question": "Following the Siege of Beirut in August 1982, where were Yasser Arafat and the PLO leadership evacuated to under international supervision?",
    "answer": "They were evacuated by ship to Tunis, Tunisia, relocating their headquarters 2,400 kilometers away from Israel's borders."
  },
  {
    "question": "Why did the Israeli Kahan Commission (1983) find Defense Minister Ariel Sharon 'indirectly responsible' for the Sabra and Shatila massacre?",
    "answer": "The commission concluded Sharon was indirectly responsible because he authorized Christian Phalangist militias to enter the camps despite clear warnings of revenge."
  },
  {
    "question": "What spontaneous event in December 1987 served as the immediate catalyst for the outbreak of the First Palestinian Intifada?",
    "answer": "An Israeli military transport vehicle collided with a civilian car in Gaza, killing four Palestinian workers, sparking spontaneous demonstrations."
  },
  {
    "question": "Describe the civilian tactics of the First Intifada and explain why Yitzhak Rabin's military response backfired internationally.",
    "answer": "It relied on civil disobedience and street violence (throwing stones). Rabin's 'Iron Fist' policy backfired because TV news broadcasted soldiers using heavy force against children, shifting global sympathy."
  },
  {
    "question": "Write an analytical sentence linking the First Palestinian Intifada to the emergence of Hamas.",
    "answer": "Because the spontaneous grassroots uprising of the First Intifada challenged the Tunis-based PLO leadership, it directly enabled the establishment of Hamas in 1987 as a radical Islamist rival."
  }
];

const lesson9 = {
  "id": "lesson_9",
  "title": "Lesson 9: Attempts at a solution, 1988–1995",
  "teacher_notes": {
    "primer": "This final lesson explores the culmination of the peace process, analyzing the geopolitical shifts that forced the PLO and Israel to the negotiating table, the breakthrough of the Oslo Accords, and the tragic collapse of the process following Rabin's assassination.",
    "objectives": [
      {
        "objective": "Evaluate Arafat's 1988 renunciation of terrorism and the two-state policy.",
        "primer": "Discuss the PLO's strategic shift in response to the First Intifada and King Hussein's land renunciation.",
        "question": "Why did Arafat explicitly renounce terrorism at the UN in Geneva?"
      },
      {
        "objective": "Analyze how superpower shifts accelerated the peace process.",
        "primer": "Track the collapse of the USSR, the influx of Soviet Jewish immigrants, and the resulting US financial leverage over Israel.",
        "question": "How did the collapse of the Soviet Union force both the PLO and Israel into negotiations?"
      },
      {
        "objective": "Understand the terms and collapse of the Oslo Accords.",
        "primer": "Detail the division of the West Bank into Areas A, B, and C, and the intense domestic backlash leading to Rabin's assassination.",
        "question": "What were the three main territorial divisions established by the Oslo II Accords?"
      }
    ]
  },
  "do_now": {
    "type": "retrieval",
    "items": doNowItems
  },
  "vocab": [
    {
      "term": "UNLU",
      "definition": "Unified National Leadership of the Uprising; grassroots local committees that coordinated the First Intifada on the ground."
    },
    {
      "term": "Two-state solution",
      "definition": "A diplomatic framework proposing an independent State of Palestine alongside the State of Israel."
    },
    {
      "term": "Madrid Conference",
      "definition": "A historic 1991 peace conference co-sponsored by the US and USSR that brought Arab and Israeli delegates together for face-to-face talks."
    },
    {
      "term": "Oslo I Accords",
      "definition": "The 1993 agreement establishing the Palestinian National Authority to temporarily govern Gaza and Jericho."
    },
    {
      "term": "Oslo II Accords",
      "definition": "The 1995 agreement dividing the West Bank into Areas A, B, and C to expand Palestinian self-rule."
    },
    {
      "term": "Yigal Amir",
      "definition": "A radical right-wing Jewish extremist who assassinated Prime Minister Yitzhak Rabin in 1995 to halt the peace process."
    }
  ],
  "narrative": [
    "By late 1988, PLO Chairman Yasser Arafat realized that the political landscape was shifting beneath his feet. The First Palestinian Intifada had been launched and coordinated by grassroots local committees on the ground, bypassing the traditional PLO leadership isolated in Tunis. Arafat faced a major dilemma: his leadership was being rapidly overshadowed by new, highly popular underground leaders in the Unified National Leadership of the Uprising (UNLU) and radical Islamist groups like Hamas and Islamic Jihad.",
    "<pre class=\"ascii-diagram\">\n               [Arafat's 1988 Tactical Recalculation]\n                                  |\n       +--------------------------+--------------------------+\n       v                          v                          v\n[Reclaim the Spotlight]   [Acknowledge Israeli Power]  [Jordan's Land Renunciation]\n- Sidelined in Tunis by   - Proved armed struggle      - King Hussein surrendered\n  local UNLU and Hamas      could not destroy Israel;    claims to West Bank; opened\n  guerrillas on the ground   ordinary people need peace   door for Palestinian state\n</pre>",
    "To regain political control, Arafat enacted a historic shift in PLO strategy. In November 1988, the Palestinian National Council officially accepted the principles of partition and a two-state solution—officially recognizing Israel’s right to exist alongside a sovereign, independent Palestinian state in the occupied territories.",
    "In December 1988, on the strict insistence of the United States, Arafat delivered a historic speech to a special session of the UN General Assembly in Geneva. In this speech, Arafat explicitly renounced and condemned all forms of terrorism. This met the long-standing US conditions for official diplomatic contact, forcing the Reagan administration to open formal diplomatic talks with the PLO.",
    "The international geopolitical order was completely transformed between 1989 and 1991. The dissolution of the Soviet Union (USSR) in December 1991 brought an end to the Cold War and fundamentally altered the balance of power in the Middle East.",
    "<pre class=\"ascii-diagram\">\n       [THE SOVIET COLLAPSE GEOPOLITICAL DOMINO EFFECT]\n                              |\n[USSR Dissolves (Dec 1991)] -> [PLO loses main finance & arms supplier]\n                              |\n[200000 Soviet Jews migrate to Israel] -> [Settlement expansion in West Bank]\n                              |\n[Unemployed Palestinians displaced] -> [Arafat pressured to seek urgent peace]\n</pre>",
    "The collapse of the USSR was a devastating blow to the PLO, which lost its primary funding and diplomatic backing. Over 200,000 Soviet Jews migrated to Israel, leading to the expansion of Jewish settlements in the West Bank and displacing Palestinian workers. Arafat realized he had to secure a deal immediately. The end of the Cold War also meant the US emerged as the sole global superpower and used its leverage, threatening to withhold a $10 billion loan guarantee, to force Israel's Prime Minister Yitzhak Shamir to negotiate.",
    "In August 1990, Iraqi dictator Saddam Hussein invaded Kuwait, triggering the 1991 Gulf War. Arafat made the disastrous decision to publicly support Saddam Hussein.",
    "<pre class=\"ascii-diagram\">\n[Arafat backs Saddam Hussein in Gulf War] -> [Gulf States cut off vital PLO funding]\n                                                        |\n[PLO is diplomatically & financially isolated] -> [US/USSR co-sponsor Madrid Conference (1991)]\n                                                        |\n[Direct Arab-Israeli talks deadlocked] -> [Paves way for secret Norwegian channel]\n</pre>",
    "Outraged by Arafat's betrayal, wealthy Gulf Arab states cut off all financial donations. Kuwait expelled over 300,000 Palestinian workers. The PLO was left bankrupt. To stabilize the region, the US and USSR co-sponsored the Madrid Peace Conference in November 1991. While the public talks stalemated, they broke the taboo of direct negotiations.",
    "In June 1992, the moderate Labor Party came to power in Israel under Yitzhak Rabin. Rabin authorized secret, back-channel negotiations in Oslo, Norway.",
    "<pre class=\"ascii-diagram\">\n[Labour Government elected under Yitzhak Rabin] -> [Secret talks opened in Norway (Dec 1992)]\n                                                                |\n[Hamas launches first suicide bombings (1993)] -> [Rabin views PLO as a moderate alternative]\n                                                                |\n[Arafat and Rabin sign Oslo I Accords] -> [Establishment of Palestinian Authority (PNA)]\n</pre>",
    "The urgency intensified in April 1993 when Hamas launched its first suicide car bombing. This convinced Rabin that Arafat’s PLO was a moderate alternative. The secret negotiations produced the historic Oslo I Accords, signed on the White House lawn on 13 September 1993. Arafat renounced terrorism and recognized Israel, while Rabin recognized the PLO. An interim Palestinian National Authority (PNA) was established to govern Gaza and Jericho.",
    "In October 1994, Israel and Jordan signed a formal Treaty of Peace. King Hussein approached Rabin because Jordan was suffering economically after the Gulf War. US President Bill Clinton promised to cancel Jordan's massive debts if it normalized relations.",
    "<pre class=\"ascii-diagram\">\n                  [THE ISRAEL-JORDAN PEACE TREATY (1994)]\n                                     |\n         +---------------------------+---------------------------+\n         v                                                       v\n[King Hussein's Economic Crisis]                    [US Financial Inducements]\n- Jordan badly hit by Gulf War and                 - Clinton promises to cancel\n  loss of trade; needed peace to rebuild              Jordan's multi-million-dollar debts\n                     \\                                   /\n                      \\                                 /\n              [Jordan becomes 2nd Arab nation to recognize Israel]\n</pre>",
    "On 28 September 1995, Rabin and Arafat signed the Oslo II Accords, which detailed the expansion of Palestinian self-rule across the West Bank by dividing it into three zones.",
    "<pre class=\"ascii-diagram\">\n                      [THE OSLO II DIVISION OF LAND]\n                                    |\n       +----------------------------+----------------------------+\n       v                            v                            v\n[Area A: 3% of West Bank]    [Area B: 27% of West Bank]   [Area C: 70% of West Bank]\n- Full Palestinian PNA civil  - Palestinian civil control,  - Full Israeli military &\n  and internal security        but joint Israeli-           civil control\n- Encompassed major cities     Palestinian security         - Encompassed settlements,\n  (Ramallah, Nablus, Jenin)    - Covered 450 small towns      bases, and bypass roads\n</pre>",
    "While Oslo II was celebrated, the division triggered a massive political backlash. Palestinians were frustrated that the PNA only controlled a fragmented archipelago (Area A), while Israel still controlled 70% of their land (Area C). Hamas launched suicide bus bombings. Right-wing Israelis were outraged by Rabin's concessions.",
    "<pre class=\"ascii-diagram\">\n                       [THE UNRESOLVED DEADLOCK]\n                                  |\n[Oslo Accords Signed (1993-95)] -> [Rabin Assassinated & Hamas Bombings]\n                                  |\n[Extreme distrust permanently restored] -> [Five \"Permanent Status\" Issues Unresolved]\n                                  |\n        +-------------------------+-------------------------+\n        v                         v                         v\n[Status of Jerusalem]     [Palestinian Refugee Return]   [Dismantling Settlements]\n</pre>",
    "On 4 November 1995, Yitzhak Rabin was assassinated at a peace rally in Tel Aviv by Yigal Amir, a radical right-wing Jewish law student. The assassination dealt a fatal blow to the peace process, leaving the \"permanent status\" issues completely unresolved."
  ],
  "tasks": [
    {
      "text": "Write a narrative account analysing the key developments in the peace process between Israel and the Palestinians in the years 1988–95. (8 marks)",
      "type": "narrative_account",
      "model": "<p>The peace process began in December 1988 when PLO Chairman <strong>Yasser Arafat</strong>, <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">who sought to regain political initiative from the grassroots leaders of the First Intifada</mark>, delivered a historic speech to the United Nations General Assembly in Geneva. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">By explicitly renouncing terrorism and officially recognizing Israel’s right to exist</mark>, Arafat fulfilled the strict conditions required for diplomatic dialogue with the United States. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">Consequently, this diplomatic breakthrough, combined with</mark> the collapse of the <strong>Soviet Union</strong> in 1991, severely weakened the PLO's bargaining power and forced both Israel and the Arab states to participate in the <strong>Madrid Peace Conference</strong> in November 1991.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">Although the formal public negotiations in Madrid and Washington ended in stalemate</mark>, the election of <strong>Yitzhak Rabin’s</strong> moderate Labor government in 1992 enabled the opening of a secret, back-channel negotiation in Norway. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">These secret meetings were accelerated in April 1993</mark> when <strong>Hamas</strong> launched its first suicide car bombing in a West Bank settlement, <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">shocking Israeli society and convincing Rabin</mark> that he needed to strengthen the secular PLO before radical Islamists captured Palestinian public opinion. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">As a result of this mutual urgency</mark>, the two sides signed the historic <strong>Oslo I Accords</strong> on the White House lawn on 13 September 1993, <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">which established</mark> the <strong>Palestinian National Authority (PNA)</strong> to govern Gaza and Jericho.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This breakthrough finally culminated in the signing of the Oslo II Accords</mark> on 28 September 1995, <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">which expanded Palestinian self-rule</mark> across the West Bank by dividing the territory into <strong>Areas A, B, and C</strong>. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">However, this complex division triggered intense domestic opposition on both sides</mark>, leading to Hamas launching a campaign of suicide bus bombings and right-wing Israelis condemning Rabin's concessions. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This sequence of events reached a tragic climax</mark> on 4 November 1995, when Rabin was assassinated by a right-wing Jewish extremist, <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">abruptly halting the peace process</mark> and leaving the status of Jerusalem, refugees, and settlements completely unresolved.</p>"
    }
  ],
  "flashcards": [
    {
      "term": "Two-State Solution",
      "definition": "A diplomatic framework proposing an independent Palestinian state alongside the State of Israel, accepted by the PLO in 1988."
    },
    {
      "term": "Madrid Conference",
      "definition": "A historic 1991 peace conference co-sponsored by the US and USSR that broke the taboo of direct negotiations."
    },
    {
      "term": "Oslo I Accords",
      "definition": "The 1993 agreement establishing the Palestinian National Authority to govern Gaza and Jericho for a transitional period."
    },
    {
      "term": "Oslo II Accords",
      "definition": "The 1995 agreement dividing the West Bank into Areas A, B, and C to expand Palestinian self-rule."
    },
    {
      "term": "Area A, B, C",
      "definition": "The fragmented territorial division of the West Bank under Oslo II, dictating civil and security control."
    },
    {
      "term": "Yigal Amir",
      "definition": "The radical right-wing Jewish extremist who assassinated Prime Minister Yitzhak Rabin in November 1995 to halt the peace process."
    }
  ]
};

const existingIndex = data.lessons.findIndex(l => l.id === "lesson_9");
if (existingIndex >= 0) {
  data.lessons[existingIndex] = lesson9;
} else {
  data.lessons.push(lesson9);
}

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully injected Lesson 9 in cme_new/data.js");
