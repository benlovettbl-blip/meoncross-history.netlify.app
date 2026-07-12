import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// Define the diagrams
const diagrams = [
  {
    id: 'un242',
    matchStr: '[UN RESOLUTION 242 (NOV 1967)]',
    mmd: `flowchart TD
  A[UN RESOLUTION 242] --> B(English Wording: Loophole)
  A --> C(French Wording: Strict)
  B --> D["Withdrawal from territories<br>Israel argued it did NOT mean ALL<br>territories; allowed border expansion"]
  C --> E["'des territoires occupés'<br>Interpreted as requiring a<br>complete withdrawal to 1967 lines"]`
  },
  {
    id: 'buffer_zones',
    matchStr: '[THE STRATEGIC OCCUPIED Buffer ZONES]',
    mmd: `flowchart TD
  A[THE STRATEGIC OCCUPIED BUFFER ZONES]
  A --> B(The Golan Heights)
  A --> C(The Sinai Peninsula)
  A --> D(The West Bank & Gaza)
  B --> E["Prevented Syrian shelling<br>of Galilee farming"]
  C --> F["Kept Egyptian artillery<br>far from Israeli cities"]
  D --> G["Created defensible borders<br>Blocked cross-border raids"]`
  },
  {
    id: 'arab_armies',
    matchStr: 'Conventional Arab Armies Defeated (1967)',
    mmd: `flowchart TD
  A[Conventional Arab Armies Defeated 1967] --> B[Grassroots Nationalist Awakening]
  B --> C[Radical Splinter Groups Form e.g. PFLP]
  C --> D[Strategy of Internationalized Terror]
  D --> E[Dawson's Field Hijackings 1970]
  E --> F[World Spotlight Forced onto Palestinian Issue]`
  },
  {
    id: 'cold_war_escalation',
    matchStr: '[THE COLD WAR ESCALATION ON THE SUEZ]',
    mmd: `flowchart TD
  A[THE COLD WAR ESCALATION ON THE SUEZ]
  A --> B[Nasser launches artillery bombardments]
  B --> C[Israel retaliates with deep air strikes]
  C --> D[Egypt receives 15,000 Soviet advisors]
  D --> E[Soviet SAM-3 missile sites built 1970]
  E --> F[US mediates August 1970 Ceasefire]
  F --> G[Uneasy stalemate remains unaddressed]`
  },
  {
    id: 'sadat_diplomatic',
    matchStr: "[SADAT'S DIPLOMATIC ATTEMPTS (1971-72)]",
    mmd: `flowchart TD
  A[SADAT'S DIPLOMATIC ATTEMPTS 1971-72]
  A --> B(The Golda Meir Proposal)
  A --> C(Expelling the Soviets)
  B --> D["Sadat offers peace in return<br>for the complete return of Sinai<br><br>Rejected by Golda Meir"]
  C --> E["Sadat expels 15,000 Soviet advisors<br>Aim: Please USA and force them<br>Result: Met with complete US indifference"]`
  },
  {
    id: 'settlement_policy',
    matchStr: '[ISRAELI SETTLEMENT POLICY]',
    mmd: `flowchart TD
  A[ISRAELI SETTLEMENT POLICY]
  A --> B(Labor Government: Security)
  A --> C(Likud/Gush Emunim: Biblical)
  B --> D["Guided by the 'Allon Plan'<br>Built settlements as defensive<br>barriers along borders"]
  C --> E["Claimed divine right to Eretz Israel<br>Aimed to block any future<br>Palestinian statehood"]`
  },
  {
    id: 'surprise_attack',
    matchStr: 'Surprise Attack launched on Yom Kippur',
    mmd: `flowchart TD
  A[Surprise Attack launched on Yom Kippur] --> B[IDF caught off-guard; mobilization slowed]
  B --> C[Egyptians breach the Bar Lev Line]
  C --> D[Syrian tanks overrun the Golan Heights]
  D --> E[IDF suffers heavy initial losses]
  E --> F[Superpower arms airlifts begin 15 Oct]`
  },
  {
    id: 'superpower_faceoff',
    matchStr: '[THE SUPERPOWER GEOPOLITICAL FACE-OFF]',
    mmd: `flowchart TD
  A[THE SUPERPOWER GEOPOLITICAL FACE-OFF]
  A --> B(The US Weapons Airlift)
  A --> C(Soviet Intervention Threat)
  A --> D(The Arab OPEC Oil Embargo)
  B --> E["Nixon sends tanks/jets<br>Stabilizes IDF defenses"]
  C --> F["Brezhnev threatens troops<br>US goes to DEFCON 3 alert"]
  D --> G["OPEC quadruples oil prices<br>Chokes Western economies"]`
  },
  {
    id: 'cognitive_impact',
    matchStr: "[THE COGNITIVE IMPACT OF OPEC'S EMBARGO]",
    mmd: `flowchart TD
  A[THE COGNITIVE IMPACT OF OPEC'S EMBARGO]
  A --> B(United States Peace Incentive)
  B --> C["Economy severely damaged by inflation and fuel shortages<br>Realized they must stabilize the Middle East to prevent future oil crises<br>and limit expanding Soviet influence in Egypt and Syria"]`
  },
  {
    id: 'shuttle_diplomacy',
    matchStr: "[KISSINGER'S SHUTTLE DIPLOMACY PIPELINE (1974-75)]",
    mmd: `flowchart TD
  A[KISSINGER'S SHUTTLE DIPLOMACY PIPELINE 1974-75]
  A --> B[Sinai I Jan 1974]
  B --> C[Golan Accord May 1974]
  C --> D[Sinai II Sept 1975]
  B -.-> E[Egypt-Israel pull-back<br>Reopened Suez Canal]
  C -.-> F[Syria-Israel cease-fire<br>UN buffer zone created]
  D -.-> G[Israel abandons passes<br>US early-warning hubs built]`
  },
  {
    id: 'sadat_faces',
    matchStr: '[Sadat faces economic collapse & riots]',
    mmd: `flowchart TD
  A[Sadat faces economic collapse & riots] --> B[Realises conventional war is too costly]
  B --> C[Declares to Egyptian Parliament]
  C --> D[Will go to 'the ends of the earth' for peace]
  D --> E[Begin extends formal invitation]
  E --> F[Sadat lands at Ben Gurion Airport 19 Nov 1977]`
  },
  {
    id: 'camp_david',
    matchStr: '[THE CAMP DAVID SUMMIT (SEPT 1978)]',
    mmd: `flowchart TD
  A[THE CAMP DAVID SUMMIT SEPT 1978]
  A --> B[13 Days of Seclusion]
  B --> C[Jimmy Carter's Mediation]
  C --> D[Two Framework Agreements]`
  },
  {
    id: 'sinai_returned',
    matchStr: '[Sinai returned to Egypt (phased)]',
    mmd: `flowchart TD
  A[Sinai returned to Egypt phased] --> B[Egypt grants diplomatic recognition to Israel]
  B --> C[Sinai demilitarised & monitored]
  C --> D[Suez Canal & Straits of Tiran fully open to IDF]`
  },
  {
    id: 'arafat_1974',
    matchStr: "[ARAFAT'S 1974 DIPLOMATIC COGNITION]",
    mmd: `flowchart TD
  A[ARAFAT'S 1974 DIPLOMATIC COGNITION]
  A --> B(Arafat's Metaphorical Warning)
  A --> C(UN Resolution 3236 Nov 1974)
  B --> D["Bearer of 'olive branch' (diplomacy)<br>Bearer of 'freedom fighter's gun' (violence)<br>Demanded sovereign homeland"]
  C --> E["Recognized right to self-determination<br>Conferred permanent UN Observer Status<br>Legitimized PLO as sole representative"]`
  },
  {
    id: 'fatahland',
    matchStr: '[THE RISE OF "FATAHLAND" IN LEBANON]',
    mmd: `flowchart TD
  A[THE RISE OF 'FATAHLAND' IN LEBANON]
  A --> B[PLO Expelled from Jordan 1970]
  B --> C[PLO Establishes HQ in Southern Lebanon]
  C --> D[Cross-Border Katyusha Rocket Attacks]
  D --> E[Galilee Settlements Targeted]
  E --> F[1975 Lebanese Civil War Erupts]
  F --> G[PLO Allies with Leftist Muslim Coalition]`
  },
  {
    id: 'coastal_road',
    matchStr: '[Fatah Coastal Road Massacre (37 Dead)]',
    mmd: `flowchart TD
  A[Fatah Coastal Road Massacre 37 Dead] --> B[Operation Litani Launched March 1978]
  B --> C[IDF Occupies Southern Lebanon Buffer Zone]
  C --> D[UN Security Council Resolution 425]
  D --> E[UNIFIL Deployed to Border]
  E --> F[Israel Builds South Lebanon Army SLA Militia]`
  },
  {
    id: 'lebanese_invasion',
    matchStr: '[THE 1982 LEBANESE INVASION]',
    mmd: `flowchart TD
  A[THE 1982 LEBANESE INVASION]
  A --> B[Ambassador Shlomo Argov Shot 3 June]
  B --> C[Operation Peace for Galilee 6 June]
  C --> D[IDF Bypasses UNIFIL and Races North]
  D --> E[Heavy Syrian Air Clashes 100 MiGs Shot Down]
  E --> F[Siege of West Beirut Encirclement]
  F --> G[14,000 PLO Fighters Evacuated to Tunis]`
  },
  {
    id: 'sabra_shatila',
    matchStr: '[Bashir Gemayel Assassinated (14 Sept)]',
    mmd: `flowchart TD
  A[Bashir Gemayel Assassinated 14 Sept] --> B[IDF Encirclement of Sabra & Shatila Camps]
  B --> C[Phalangist Militias Allowed Into Camps]
  C --> D[Three-Day Brutal Massacre of Civilians]
  D --> E[Global Outrage & Kahan Commission]
  E --> F[Ariel Sharon Forced to Resign]`
  },
  {
    id: 'longterm_lebanon',
    matchStr: '[LONG-TERM RESULTS OF LEBANESE INVASION]',
    mmd: `flowchart TD
  A[LONG-TERM RESULTS OF LEBANESE INVASION]
  A --> B(PLO Expelled to Tunis)
  A --> C(The Rise of Hezbollah)
  A --> D(Israeli Security Zone)
  B --> E["Leadership moved 2,400km<br>away from Israel's borders<br>Weakened military threat"]
  C --> F["Formed by Shia militants<br>to resist IDF occupation<br>Backed directly by Iran"]
  D --> G["Narrow corridor 5-15km<br>SLA and IDF manned corridor<br>High IDF casualties"]`
  },
  {
    id: 'intifada_escalation',
    matchStr: '[THE INTIFADA ESCALATION CYCLE]',
    mmd: `flowchart TD
  A[THE INTIFADA ESCALATION CYCLE]
  A --> B[Israeli Military Truck Collision kills 4 Palestinians]
  B --> C[Spontaneous Mass Uprising]
  C --> D[Grassroots Civil Disobedience & Stone Throwing]
  D --> E[Yitzhak Rabin's 'Iron Fist' Reprisal]
  E --> F[Global Sympathy Shifts to Palestinian Cause]
  F --> G[Emergence of Militant Hamas]`
  },
  {
    id: 'arafat_1988',
    matchStr: "[Arafat's 1988 Tactical Recalculation]",
    mmd: `flowchart TD
  A[Arafat's 1988 Tactical Recalculation]
  A --> B(Reclaim the Spotlight)
  A --> C(Acknowledge Israeli Power)
  A --> D(Jordan's Land Renunciation)
  B --> E["Sidelined in Tunis by<br>local UNLU and Hamas<br>guerrillas on the ground"]
  C --> F["Proved armed struggle<br>could not destroy Israel;<br>ordinary people need peace"]
  D --> G["King Hussein surrendered<br>claims to West Bank; opened<br>door for Palestinian state"]`
  },
  {
    id: 'soviet_collapse',
    matchStr: '[THE SOVIET COLLAPSE GEOPOLITICAL DOMINO EFFECT]',
    mmd: `flowchart TD
  A[THE SOVIET COLLAPSE GEOPOLITICAL DOMINO EFFECT]
  A --> B[USSR Dissolves Dec 1991]
  B --> C[PLO loses main finance & arms supplier]
  C --> D[200000 Soviet Jews migrate to Israel]
  D --> E[Settlement expansion in West Bank]
  E --> F[Unemployed Palestinians displaced]
  F --> G[Arafat pressured to seek urgent peace]`
  },
  {
    id: 'arafat_saddam',
    matchStr: '[Arafat backs Saddam Hussein in Gulf War]',
    mmd: `flowchart TD
  A[Arafat backs Saddam Hussein in Gulf War] --> B[Gulf States cut off vital PLO funding]
  B --> C[PLO is diplomatically & financially isolated]
  C --> D[US/USSR co-sponsor Madrid Conference 1991]
  D --> E[Direct Arab-Israeli talks deadlocked]
  E --> F[Paves way for secret Norwegian channel]`
  },
  {
    id: 'labour_govt',
    matchStr: '[Labour Government elected under Yitzhak Rabin]',
    mmd: `flowchart TD
  A[Labour Government elected under Yitzhak Rabin] --> B[Secret talks opened in Norway Dec 1992]
  B --> C[Hamas launches first suicide bombings 1993]
  C --> D[Rabin views PLO as a moderate alternative]
  D --> E[Arafat and Rabin sign Oslo I Accords]
  E --> F[Establishment of Palestinian Authority PNA]`
  },
  {
    id: 'israel_jordan',
    matchStr: '[THE ISRAEL-JORDAN PEACE TREATY (1994)]',
    mmd: `flowchart TD
  A[THE ISRAEL-JORDAN PEACE TREATY 1994]
  A --> B(King Hussein's Economic Crisis)
  A --> C(US Financial Inducements)
  B --> D["Jordan badly hit by Gulf War and<br>loss of trade; needed peace to rebuild"]
  C --> E["Clinton promises to cancel<br>Jordan's multi-million-dollar debts"]
  D --> F[Jordan becomes 2nd Arab nation to recognize Israel]
  E --> F`
  },
  {
    id: 'oslo2',
    matchStr: '[THE OSLO II DIVISION OF LAND]',
    mmd: `flowchart TD
  A[THE OSLO II DIVISION OF LAND]
  A --> B(Area A: 3% of West Bank)
  A --> C(Area B: 27% of West Bank)
  A --> D(Area C: 70% of West Bank)
  B --> E["Full Palestinian PNA civil<br>and internal security<br>Encompassed major cities<br>(Ramallah, Nablus, Jenin)"]
  C --> F["Palestinian civil control,<br>but joint Israeli-Palestinian security<br>Covered 450 small towns"]
  D --> G["Full Israeli military & civil control<br>Encompassed settlements, bases, and bypass roads"]`
  },
  {
    id: 'deadlock',
    matchStr: '[THE UNRESOLVED DEADLOCK]',
    mmd: `flowchart TD
  A[THE UNRESOLVED DEADLOCK]
  A --> B[Oslo Accords Signed 1993-95]
  B --> C[Rabin Assassinated & Hamas Bombings]
  C --> D[Extreme distrust permanently restored]
  D --> E[Five 'Permanent Status' Issues Unresolved]
  E --> F(Status of Jerusalem)
  E --> G(Palestinian Refugee Return)
  E --> H(Dismantling Settlements)`
  }
];

const tables = [
  {
    id: 'yom_kippur_significance',
    matchStr: 'THE SIGNIFICANCE OF THE YOM KIPPUR WAR',
    html: `
<table class="table-auto w-full mt-4 text-left border-collapse" style="background-color: white; border: 1px solid #ddd;">
  <caption style="font-weight: bold; padding: 10px; background-color: #f8f9fa; border: 1px solid #ddd; border-bottom: none;">THE SIGNIFICANCE OF THE YOM KIPPUR WAR</caption>
  <thead>
    <tr style="background-color: #e9ecef;">
      <th style="padding: 10px; border: 1px solid #ddd;">For Egypt</th>
      <th style="padding: 10px; border: 1px solid #ddd;">For Israel</th>
      <th style="padding: 10px; border: 1px solid #ddd;">For the Peace Road</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; vertical-align: top;">Sadat restored Egyptian honor and proved the Bar Lev Line was not invincible.</td>
      <td style="padding: 10px; border: 1px solid #ddd; vertical-align: top;">Golda Meir and Moshe Dayan resigned due to immense public anger over initial war failures.</td>
      <td style="padding: 10px; border: 1px solid #ddd; vertical-align: top;">Proved military force had limits; forced US into exhaustive "shuttle diplomacy".</td>
    </tr>
  </tbody>
</table>`
  },
  {
    id: 'intifada_consequences',
    matchStr: 'CONSEQUENCES OF THE FIRST INTIFADA',
    html: `
<table class="table-auto w-full mt-4 text-left border-collapse" style="background-color: white; border: 1px solid #ddd;">
  <caption style="font-weight: bold; padding: 10px; background-color: #f8f9fa; border: 1px solid #ddd; border-bottom: none;">CONSEQUENCES OF THE FIRST INTIFADA</caption>
  <thead>
    <tr style="background-color: #e9ecef;">
      <th style="padding: 10px; border: 1px solid #ddd;">For the PLO</th>
      <th style="padding: 10px; border: 1px solid #ddd;">For Israel</th>
      <th style="padding: 10px; border: 1px solid #ddd;">The Rise of Hamas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; vertical-align: top;">Forced Yasser Arafat to renounce terrorism and officially accept the two-state solution (1988) to retain leadership.</td>
      <td style="padding: 10px; border: 1px solid #ddd; vertical-align: top;">Convinced Yitzhak Rabin and military planners that there was no purely military solution to the Palestinian issue.</td>
      <td style="padding: 10px; border: 1px solid #ddd; vertical-align: top;">Formed in 1987 as a rival to the PLO, Hamas rejected compromises and conducted violent armed attacks against Israelis.</td>
    </tr>
  </tbody>
</table>`
  }
];

const blackSeptemberMatch = '[Black September Infiltrates Olympic Village]';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&');
}

// 1. Generate MMD files and execute MMDC (already done)
fs.mkdirSync('scratch/mmd', { recursive: true });

for (const diag of diagrams) {
  const mmdPath = path.join('scratch', 'mmd', `${diag.id}.mmd`);
  const outPath = path.join('cme_new', 'assets', `${diag.id}.svg`);
  
  // Custom theme variables to match the elegant UI
  const themeVariables = `%%{init: {'theme': 'base', 'themeVariables': { 'fontFamily': 'arial', 'primaryColor': '#ECECFF', 'primaryBorderColor': '#9370DB', 'primaryTextColor': '#333', 'lineColor': '#333333'}}}%%`;
  fs.writeFileSync(mmdPath, `${themeVariables}\n${diag.mmd}`);
  
  // console.log(`Generating SVG for ${diag.id}...`);
  // try {
  //   execSync(`mmdc -i "${mmdPath}" -o "${outPath}" -b transparent`);
  // } catch (err) {
  //   console.error(`Failed to generate ${diag.id}: ${err.message}`);
  // }
}

// 2. Patch data.js
let dataJs = fs.readFileSync('cme_new/data.js', 'utf8');

// Replace standard flowchart diagrams
for (const diag of diagrams) {
  const replacement = `<img src="assets/${diag.id}.svg" class="svg-diagram" style="max-width: 100%; border-radius: 8px;" alt="${diag.id}">`;
  dataJs = dataJs.replace(/<pre class="ascii-diagram">([\s\S]*?)<\/pre>/g, (match, content) => {
    if (content.includes(diag.matchStr)) return replacement;
    return match;
  });
}

// Replace the Black September diagram since we already have the SVG
const bsReplacement = `<img src="assets/black_september.svg" class="svg-diagram" style="max-width: 100%; border-radius: 8px;" alt="black_september">`;
dataJs = dataJs.replace(/<pre class="ascii-diagram">([\s\S]*?)<\/pre>/g, (match, content) => {
  if (content.includes(blackSeptemberMatch)) return bsReplacement;
  return match;
});

// Replace Tables
for (const table of tables) {
  dataJs = dataJs.replace(/<pre class="ascii-diagram">([\s\S]*?)<\/pre>/g, (match, content) => {
    if (content.includes(table.matchStr)) return table.html;
    return match;
  });
}

fs.writeFileSync('cme_new/data.js', dataJs);
console.log('Successfully patched data.js!');
