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

const l3 = data.lessons.find(l => l.id === "lesson_3");
if (l3) {
  // Let's rebuild the narrative for Lesson 3 to ensure we don't duplicate and everything is in order
  l3.narrative = [
    "The fragile status quo established by the 1949 armistice was permanently shattered by political upheavals inside Egypt. In July 1952, a group of nationalist army officers known as the \"Free Officers Movement\" overthrew Egypt's corrupt, pro-Western monarch, King Farouk. By 1954, the charismatic and fiercely anti-imperialist Colonel Gamal Abdel Nasser emerged as the undisputed President of Egypt.",
    "Nasser quickly positioned himself as the champion of Pan-Arabism—a powerful political ideology aimed at uniting Arab nations to throw off Western colonial influence, secure Arab dignity, and avenge the humiliating 1948 defeat by Israel.",
    `<pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; overflow-x: auto; font-size: 14px; line-height: 1.2;">
                 [Nasser's Domestic & Geopolitical Aims]
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
[Throw Off British Imperialism]   [Socialist Internal Reforms]   [The Aswan High Dam]
- Expelled 80,000 British         - Redistributed fertile land   - Ultimate pride project
  troops from Suez Canal zone       to the poor peasants          - Required massive foreign
- Stood as champion of Arab pride  - Built schools & hospitals     loans to build on Nile
</pre>`,
    "Nasser’s immediate political objectives were both local and geopolitical. Although Egypt was technically independent, 80,000 British troops still occupied the strategically vital Suez Canal Zone. Nasser immediately placed heavy diplomatic pressure on Britain, successfully forcing them to sign an agreement to withdraw their forces by June 1956.",
    "Nasser initiated sweeping domestic reforms to help the poor Egyptian peasants (fellahin), including the redistribution of agricultural land and the construction of thousands of state schools and clinics.",
    "The cornerstone of Nasser’s developmental vision was the construction of a massive hydroelectric dam on the River Nile at Aswan. This monumental engineering project was designed to control the annual flooding of the Nile, provide clean electricity for industrialization, and irrigate millions of acres of desert land to feed Egypt's growing population. To fund this expensive project, Egypt required massive financial loans from Western powers, primarily the United States and Great Britain.",
    "Tensions between Egypt and Israel escalated dramatically on 28 February 1955 during the Gaza Raid. In retaliation for the ambush and murder of an Israeli civilian, Prime Minister David Ben-Gurion ordered the IDF to launch a massive reprisal raid against an Egyptian military headquarters in the Gaza Strip. The attack was devastating: IDF paratroopers blew up the garrison, killing 38 Egyptian soldiers and leaving Nasser's army thoroughly humiliated.",
    `<pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; overflow-x: auto; font-size: 14px; line-height: 1.2;">
[1955 Gaza Raid Humiliates Egypt] ➔ [Nasser Realises Military Weakness]
                                                │
[1955 Czech Arms Deal (Soviet Bloc)] ➔ [Egypt Receives Advanced Jets/Tanks]
                                                │
[Western Alarm: US/UK Cancel Dam Loan] ➔ [Nasser Nationalises Suez Canal]
</pre>`,
    "The Gaza Raid served as a turning point for Nasser, proving that his forces were too weakly equipped to deter Israeli military power. When the United States refused to sell him weapons without political strings attached, Nasser turned to the Soviet bloc. In September 1955, Nasser stunned the West by signing the Czech Arms Deal.",
    "Under this agreement, Czechoslovakia (acting as a front for the Soviet Union) supplied Egypt with a massive arsenal of modern military hardware, including 200 advanced MiG-15 jet fighters, 300 modern tanks, and heavy artillery. This deal brought the Cold War directly into the heart of the Middle East, deeply alarming both Israel and the Western powers.",
    "In response to Nasser's Soviet alignment and his continued support for Gaza-based Fedayeen raids (which killed 58 Israeli civilians in April 1956 alone), the United States and Great Britain took retaliatory economic action. In July 1956, they abruptly withdrew their joint offer to finance the Aswan High Dam.",
    "Nasser refused to let his pride project die. On 26 July 1956, he delivered a fiery speech in Alexandria and announced the nationalisation of the Suez Canal Company. He declared that Egypt would seize the canal from its British and French shareholders and use the £35 million annual toll revenues to directly fund the construction of the Aswan High Dam.",
    "The nationalisation of the Suez Canal outraged Great Britain and France. British Prime Minister Anthony Eden viewed Nasser as a dangerous dictator who threatened Europe’s vital oil supply line. Behind the scenes, Britain and France colluded with Israel to plan a military intervention to overthrow Nasser and retake the canal. This conspiracy was codified in the highly secret Protocol of Sèvres in October 1956.",
    `<pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; overflow-x: auto; font-size: 14px; line-height: 1.2;">
                     [THE SECRET PROTOCOL OF SÈVRES]
                                   │
[Step 1: IDF Invades Sinai] ➔ [Step 2: UK/France Demand Ceasefire & Pullback]
                                   │
[Step 3: Egypt Refuses] ➔ [Step 4: Anglo-French Troops Occupy Canal to "Protect" It]
</pre>`,
    "Under this secret tripartite plan, Israel would launch a pre-emptive strike across the Sinai Desert toward the Suez Canal. Once hostilities began, Britain and France would issue an ultimatum to both sides to stop fighting and pull back ten miles from the canal.",
    "Knowing Egypt would refuse to abandon its own territory, Britain and France would then launch an air and sea invasion to occupy the Suez Canal Zone under the guise of \"protecting\" international shipping.",
    "On 29 October 1956, the plan was put into action. The IDF launched a highly successful blitzkrieg across Sinai, routing the Egyptian army and advancing rapidly toward the canal. Britain and France immediately issued their pre-planned ultimatum and, as expected, launched heavy bombing raids and landed paratroopers at Port Said to seize control of the canal.",
    "The conspiracy backfired due to furious resistance from the global superpowers. Soviet leader Nikita Khrushchev threatened to launch nuclear missile strikes against London and Paris. More decisively, US President Dwight D. Eisenhower was outraged that his allies had launched a war without consulting him, fearing it would drive the entire Arab world into the arms of the USSR. Eisenhower applied massive economic pressure on Great Britain, threatening to refuse loans and block Britain's access to oil.",
    "Buckling under American financial pressure, Britain and France were forced into a humiliating retreat, withdrawing their forces by December 1956. Israel, under intense US pressure, was forced to return the entire Sinai Peninsula to Egypt in early 1957.",
    "While the Suez Crisis was a political humiliation for Britain and France, it fundamentally transformed the security situation in the Middle East.",
    `<table style="width:100%; border-collapse: collapse; margin: 15px 0;">
      <thead>
        <tr>
          <th style="border: 1px solid #cbd5e1; padding: 10px; background: #e2e8f0;">For Egypt and Nasser</th>
          <th style="border: 1px solid #cbd5e1; padding: 10px; background: #e2e8f0;">For Israel’s Security</th>
          <th style="border: 1px solid #cbd5e1; padding: 10px; background: #e2e8f0;">For the Cold War</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 10px; vertical-align: top;">Nasser emerged from the crisis as an <strong>undisputed Arab folk hero</strong>. Although his army had been defeated on the battlefield, he had successfully stood up to British, French, and Israeli "imperialism" and kept control of the Suez Canal, cementing Egypt’s leadership of the Arab world.</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px; vertical-align: top;">Israel scored massive military and strategic benefits. The IDF had proven its <strong>unquestioned military superiority</strong>, routing the Egyptian army in just a few days, which acted as a powerful deterrent against future Arab invasions.</td>
          <td style="border: 1px solid #cbd5e1; padding: 10px; vertical-align: top;">The Middle East became a central theater of the Cold War. British and French colonial influence in the region was permanently broken, replaced by direct <strong>US support for Israel</strong> and <strong>Soviet backing for Egypt and Syria</strong>.</td>
        </tr>
      </tbody>
    </table>`,
    `<pre style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-family: monospace; overflow-x: auto; font-size: 14px; line-height: 1.2;">
              [CONSEQUENCES OF SUEZ FOR ISRAEL]
                              │
     ┌────────────────────────┼────────────────────────┐
     ▼                        ▼                        ▼
[UNEF Deployment in Sinai]  [Straits of Tiran Open]  [IDF Military Deterrence]
- Stationed as a buffer     - Port of Eilat reopened - Egyptian army routed
- Gaza Fedayeen raids       - Secured vital trade    - Deterred Arab states
  stopped for 10 years        with Asia/Africa        from war until 1967
</pre>`,
    "Crucially, Israel's forced withdrawal from the Sinai Peninsula was conditioned on three vital security guarantees. First, the United Nations deployed its first-ever peacekeeping force, the United Nations Emergency Force (UNEF), along the Gaza border and the Sinai Desert. This UNEF buffer successfully halted the Gaza Fedayeen raids, guaranteeing Israel ten years of relative border security.",
    "Second, the UNEF took control of Sharm el-Sheikh, forcing Egypt to lift its naval blockade. The Straits of Tiran were reopened to Israeli vessels, allowing Eilat to flourish as a vital trade port for oil, materials, and commerce with Asia and East Africa.",
    "Finally, the political momentum of Nasser's victory led directly to the formation of the United Arab Republic (UAR) in February 1958—a total political and military union between Egypt and Syria. While this union increased Israeli fears of encirclement, it also locked the region into an uneasy, highly armed decade-long stalemate that lasted until 1967."
  ];
}

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully restored diagrams into Lesson 3");
