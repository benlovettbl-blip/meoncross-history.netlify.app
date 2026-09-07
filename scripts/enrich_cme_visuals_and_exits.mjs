import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cme_new from '../units/cme_new/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataJsPath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');

console.log('Loaded unit cme_new. Total lessons:', cme_new.lessons.length);

const unit = cme_new;

// =========================================================================
// 1. LESSON 2 (KT 1.1: End of British Mandate & Creation of Israel, 1945–48)
// =========================================================================
const l2 = unit.lessons[1];

// Bold Signposts on Narrative Blocks
const l2Signposts = [
  '**The British Dilemma & The League of Nations Mandate:**',
  '**Arab Opposition & Demographic Realities:**',
  '**Zionist Militancy & Post-Holocaust Immigration:**',
  '**The Escalating Insurgency & Martial Law:**',
  '**The King David Hotel Bombing (July 1946):**',
  '**The SS Exodus & British Abdication:**',
  '**UN Resolution 181 & The Partition Plan (November 1947):**',
  '', // Map Block
  '**Civil Conflict & Plan Dalet (Spring 1948):**',
  '**The Declaration of the State of Israel (14 May 1948):**',
  '**The 1948–49 Arab-Israeli War & The First Truce:**',
  '**The 1949 Armistice & The Green Line:**',
];

l2.narrative_blocks.forEach((block, idx) => {
  if (block.text && l2Signposts[idx]) {
    let cleanText = block.text.replace(/^(\*\*.*?\*\*|<strong>.*?<\/strong>)\s*/i, '');
    block.text = `${l2Signposts[idx]} ${cleanText}`;
  }
});

// Authentic Primary Sources with Source Detective questions
l2.primary_source = {
  title: 'Source A: The Ruins of the King David Hotel, Jerusalem (July 1946)',
  src: '/assets/cme_new_king_david_ruins.png',
  caption:
    'Primary Photograph: The south-west wing of the King David Hotel collapsed after the Irgun bomb detonation on 22 July 1946, killing 91 British, Arab, and Jewish staff.',
  question:
    'Source Detective: Why did the Irgun target the British administrative and military headquarters at the King David Hotel, and how did this attack convince the British government that maintaining the Mandate was untenable?',
};

if (l2.narrative_blocks[4]) {
  l2.narrative_blocks[4].source = {
    title: 'Source B: The King David Hotel Bombing (July 1946)',
    src: '/assets/cme_new_king_david_ruins.png',
    caption:
      'The collapsed wing of the King David Hotel, housing the British Secretariat and Military Command.',
    question:
      'Source Detective: Why was this attack a decisive turning point in Britain’s willingness to remain in Palestine?',
  };
}

if (l2.narrative_blocks[5]) {
  l2.narrative_blocks[5].source = {
    title: 'Source C: The SS Exodus Arriving in Haifa (July 1947)',
    src: '/units/cme_new/assets/cme_exodus.jpeg',
    caption:
      'The President Warfield (renamed SS Exodus 1947) carrying 4,500 Holocaust survivors intercepted by the Royal Navy.',
    question:
      'Source Detective: How did Britain’s decision to forcibly deport Holocaust survivors back to displaced persons camps in Europe destroy British diplomatic standing in the United States?',
  };
}

if (l2.narrative_blocks[9]) {
  l2.narrative_blocks[9].source = {
    title: 'Source D: David Ben-Gurion Declaring the State of Israel (14 May 1948)',
    src: '/images/cme_bengurion_declaration_1948.jpg',
    caption:
      'David Ben-Gurion reads the Declaration of Independence at the Tel Aviv Museum beneath Theodor Herzl’s portrait.',
    question:
      'Source Detective: Why did Ben-Gurion choose to declare independence beneath the portrait of Theodor Herzl on the exact afternoon British forces withdrew?',
  };
}

// Exit Ticket 1: The Three-Tiered Golden Sentence
l2.exit_ticket = {
  type: 'golden_sentence',
  type_label: 'Exit Ticket · The Golden Sentence',
  title: 'Exit Ticket: The Three-Tiered Golden Sentence',
  prompt:
    'Write **ONE single, grammatically sophisticated historical sentence** explaining why Great Britain decided to abandon its Mandate of Palestine in 1947. Your sentence MUST strictly contain all three required ingredients:',
  options: [
    'Ingredient 1 (Date / Stat): Include one precise date or statistic [e.g., July 1946, 91 deaths, £100 million mandate cost, or Resolution 181].',
    'Ingredient 2 (Individual / Group): Name one key historical individual or group [e.g., Ernest Bevin, the Irgun, Menachem Begin, or UNSCOP].',
    'Ingredient 3 (Causal Conjunction): Connect your cause and effect using an analytical conjunction [e.g., consequently, provoked by, culminating in, or whereas].',
  ],
  guidance: 'Ensure your sentence clearly shows cause and effect, not just a list of facts.',
};
l2.consolidation =
  'Exit Ticket — The Golden Sentence: Write ONE single, grammatically sophisticated historical sentence explaining why Britain abandoned Palestine. Must include: (1) One date/stat, (2) One key figure/group [Irgun, Bevin, UNSCOP], and (3) One causal conjunction [consequently, provoked by, culminating in].';

// =========================================================================
// 2. LESSON 3 (KT 1.2: Aftermath of 1948 War & Palestinian Refugee Crisis)
// =========================================================================
const l3 = unit.lessons[2];

const l3Signposts = [
  '**The 1949 Armistice Agreements & The Green Line:**',
  '**The Disintegration of the Proposed Arab State:**',
  '**The Palestinian Refugee Crisis (The Nakba):**',
  '**The Deadlock Over UN Resolution 194 & The Right of Return:**',
  '**Israeli Security & Mass Jewish Immigration (Aliyah):**',
  '**The Law of Return (1950) & Demographic Transformation:**',
  '**The Austerity Regime (Tzena) & Economic Survival:**',
  '**German Reparations (1952) & National Development:**',
  '**Fedayeen Border Infiltration & Retaliation Raids:**',
  '**Unit 101 & Ariel Sharon: The Deterrence Doctrine:**',
];

l3.narrative_blocks.forEach((block, idx) => {
  if (block.text && l3Signposts[idx]) {
    let cleanText = block.text.replace(/^(\*\*.*?\*\*|<strong>.*?<\/strong>)\s*/i, '');
    block.text = `${l3Signposts[idx]} ${cleanText}`;
  }
});

// Replace broken and watermarked images with authentic public domain images
if (l3.narrative_blocks[0]) {
  l3.narrative_blocks[0].source = {
    title: 'Source A: Israeli Troops in Heavy Fighting During the 1948 War',
    src: '/units/cme_new/assets/cme_tel_aviv_yafo__997008136796005171_.jpg',
    caption: 'Israeli soldiers fighting along the central front during the 1948 Arab-Israeli War.',
    question:
      'Source Detective: How did the newly formed IDF successfully counter five invading Arab armies despite being heavily outnumbered in early 1948?',
  };
}

if (l3.narrative_blocks[2]) {
  l3.narrative_blocks[2].source = {
    title: 'Source B: Palestinian Refugees Leaving Their Villages (1948 Nakba)',
    src: '/images/cme_palestinian_refugees_1948.jpg',
    caption:
      'Authentic UN Archival Photograph: Palestinian families carrying bundles of clothing and food as they flee their homes in 1948.',
    question:
      'Source Detective: How did the displacement of over 700,000 Palestinians create an unresolved humanitarian and territorial crisis that shaped every subsequent conflict?',
  };
}

if (l3.narrative_blocks[4]) {
  l3.narrative_blocks[4].source = {
    title: 'Source C: The 1949 Armistice Green Line',
    src: '/units/cme_new/assets/palestine_1949_map.png',
    caption:
      'Map showing the 1949 armistice lines: Israel gained 78% of the territory, while Jordan annexed the West Bank and Egypt administered Gaza.',
    question:
      'Source Detective: Compare the 1949 Green Line with the 1947 UN Partition Plan: which areas did Israel capture beyond its original UN allocation?',
  };
}

// Exit Ticket 2: Spot the Historical Imposter
l3.exit_ticket = {
  type: 'spot_imposter',
  type_label: 'Exit Ticket · Two Truths & One Fallacy',
  title: 'Exit Ticket: Spot the Historical Imposter',
  prompt:
    'Below are three statements regarding the 1948–49 War and the refugee crisis. **Two are historically accurate facts; one is an IMPOSTER containing a classic GCSE examiner misconception.**',
  options: [
    'Statement A: The 1949 Armistice Agreements (Green Line) left Israel in control of 78% of mandatory Palestine, significantly expanding beyond the 56% proposed in the 1947 UN Partition Plan.',
    'Statement B: The United Nations deployed an international military peacekeeping army in May 1948 that successfully enforced the borders of an independent Palestinian Arab state in the West Bank.',
    'Statement C: Under the 1950 Law of Return, every Jewish person worldwide was granted the automatic right to settle in Israel and gain citizenship, doubling Israel’s population within four years.',
  ],
  guidance:
    'Task: State which statement is the imposter (A, B, or C) and write the 1-sentence historical correction explaining what actually happened.',
};
l3.consolidation =
  'Exit Ticket — Spot the Historical Imposter: Identify the false statement among the three options (Statement B: UN army in 1948) and write a 1-sentence historical correction explaining why no independent Palestinian state was established.';

// =========================================================================
// 3. LESSON 4 (KT 1.3: Increased Tension, Nasser, and the Suez Crisis, 1955–56)
// =========================================================================
const l4 = unit.lessons[3];

const l4Signposts = [
  '**The Rise of Gamal Abdel Nasser & Pan-Arab Nationalism:**',
  '**Nasser’s Political Vision: Non-Alignment and Arab Dignity:**',
  '**The Aswan High Dam: The Linchpin of Modern Egypt:**',
  '**The Czech Arms Deal (September 1955): A Superpower Shock:**',
  '**The Israeli Gaza Raid (February 1955): The Fatal Turning Point:**',
  '**Western Retaliation: Dulles Cancels Dam Financing (July 1956):**',
  '**The Nationalisation of the Suez Canal (26 July 1956):**',
  '**Imperial Outrage: Eden and Mollet Plot Military Intervention:**',
  '**The Sèvres Protocol (October 1956): The Secret Tripartite Collusion:**',
  '**Operation Kadesh: The Israeli Armored Sweep Across Sinai:**',
  '**Operation Musketeer: Anglo-French Airborne Assault on Port Said:**',
  '**The Superpower Hammer: Eisenhower’s Financial Ultimatum:**',
  '**The Humiliation of Empires & The Resignation of Anthony Eden:**',
  '**Geopolitical Consequences: Superpowers Replace Colonial Powers:**',
  '**UN Peacekeepers (UNEF) in Sinai & Freedom of Navigation:**',
  '**Nasser’s Apotheosis: The Peak of Pan-Arab Heroism:**',
];

l4.narrative_blocks.forEach((block, idx) => {
  if (block.text && l4Signposts[idx]) {
    let cleanText = block.text.replace(/^(\*\*.*?\*\*|<strong>.*?<\/strong>)\s*/i, '');
    block.text = `${l4Signposts[idx]} ${cleanText}`;
  }
});

// Authentic Suez Crisis Visual Sources
if (l4.narrative_blocks[0]) {
  l4.narrative_blocks[0].source = {
    title: 'Source A: President Gamal Abdel Nasser (1956)',
    src: '/images/cme_alahram_suez_1956.jpg',
    caption:
      'Front page of Egyptian newspaper Al-Ahram (27 July 1956) reporting President Nasser’s speech in Alexandria nationalising the Suez Canal Company.',
    question:
      'Source Detective: Look at the celebratory front page: why was the nationalisation of the canal seen across the Arab world as a historic victory over Western imperialism?',
  };
}

if (l4.narrative_blocks[6]) {
  l4.narrative_blocks[6].source = {
    title: 'Source B: Al-Ahram Front Page — Suez Canal Nationalised',
    src: '/images/cme_alahram_suez_1956.jpg',
    caption:
      'Al-Ahram banner headline declaring: "Nationalisation of the Suez Canal Company... our rights are restored."',
    question:
      'Source Detective: How did Nasser use the revenue of the canal to fund the construction of the Aswan High Dam after Western loans were cancelled?',
  };
}

if (l4.narrative_blocks[10]) {
  l4.narrative_blocks[10].source = {
    title: 'Source C: British Forces Landing at Port Said (Operation Musketeer, Nov 1956)',
    src: '/images/cme_port_said_british_troops_1956.jpg',
    caption:
      'Imperial War Museum Photograph MH23500: Royal Navy landing craft landing British commandos at Port Said as oil storage tanks burn.',
    question:
      'Source Detective: Why did Britain and France claim they were entering Egypt as neutral peacekeepers to separate Israeli and Egyptian armies when the Sèvres Protocol proved they had pre-planned the war together?',
  };
}

// Exit Ticket 3: The Causal Balance Scale
l4.exit_ticket = {
  type: 'balance_scale',
  type_label: 'Exit Ticket · The Causal Balance Scale',
  title: 'Exit Ticket: The Causal Balance Scale',
  prompt:
    'Weigh the historical outcome of the 1956 Suez Crisis on a scale of 0 to 10 for Egypt and Gamal Abdel Nasser:',
  options: [
    '[0] A Catastrophic Military Defeat: Israel crushed the Egyptian army in Sinai; Britain and France occupied Port Said.',
    '[5] A Stalemate: Egypt lost military assets, but forced an imperial withdrawal.',
    '[10] An Historic Political Triumph: Nasser humiliated Britain and France, kept the canal, and became the undisputed leader of the Arab world.',
  ],
  guidance:
    'Task: Where on the scale (0 to 10) do you place the outcome for Nasser, and what is your SINGLE decisive piece of historical evidence from today’s lesson justifying your score?',
};
l4.consolidation =
  'Exit Ticket — The Causal Balance Scale: Was the 1956 Suez Crisis a military defeat (0) or a political victory (10) for Egypt? State your score and write your single decisive piece of historical evidence justifying your answer.';

// =========================================================================
// 4. LESSONS 5–10: Systematically Inject Bold Signposts & Rotated Exit Tickets
// =========================================================================

// LESSON 5 (KT 2.1: The Six-Day War, 1967)
const l5 = unit.lessons[4];
const l5Signposts = [
  '**The Escalation of Tensions (Spring 1967): False Soviet Intelligence:**',
  '**Nasser’s Gamble: Expelling the UNEF from Sinai (May 1967):**',
  '**The Casus Belli: Egypt Closes the Straits of Tiran:**',
  '**The Arab Military Coalition: Mutual Defense Pacts:**',
  '**Operation Focus (5 June 1967): The Pre-Emptive Airstrike:**',
  '**The Sinai Campaign: The Route of the Egyptian Army:**',
  '**The Battle for Jerusalem & The West Bank:**',
  '**Storming the Golan Heights: Securing the Northern Border:**',
  '**The Six-Day Triumph: Israel’s Tripled Territory:**',
  '**The Plight of the Newly Occupied Populations:**',
];
l5.narrative_blocks.forEach((block, idx) => {
  if (block.text && l5Signposts[idx]) {
    let cleanText = block.text.replace(/^(\*\*.*?\*\*|<strong>.*?<\/strong>)\s*/i, '');
    block.text = `${l5Signposts[idx]} ${cleanText}`;
  }
});
l5.exit_ticket = {
  type: 'split_perspective',
  type_label: 'Exit Ticket · Split-Perspective Headlines',
  title: 'Exit Ticket: Split-Perspective Front Page',
  prompt:
    'Write two punchy, **6-word newspaper headlines** capturing the historic shock of the Six-Day War (10 June 1967):',
  options: [
    'Headline A (Israeli Perspective - The Jerusalem Post): Summarize the capture of the Old City and new defensive depth.',
    'Headline B (Arab Perspective - Al-Ahram, Cairo): Summarize the shock of the "Naksa" (Setback) and loss of Sinai and Jerusalem.',
  ],
  guidance:
    'Strict constraint: Exactly 6 words per headline! Ensure each captures the emotional and geopolitical reality of each side.',
};
l5.consolidation =
  'Exit Ticket — Split-Perspective Headlines: Write one 6-word headline from the Israeli perspective (celebrating the capture of Jerusalem/defensive depth) and one 6-word headline from the Arab perspective (the trauma of the Naksa).';

// LESSON 6 (KT 2.2: Aftermath of 1967 & Rise of Palestinian Resistance)
const l6 = unit.lessons[5];
const l6Signposts = [
  '**The Arab Response: The Khartoum Resolution & The Three Noes (1967):**',
  '**UN Resolution 242 (November 1967): Land for Peace:**',
  '**The Rise of the PLO & Yasser Arafat’s Fatah:**',
  '**The Battle of Karameh (1968): The Birth of Palestinian Heroism:**',
  '**The Shift to International Terrorism & Plane Hijackings:**',
  '**Black September (1970): Civil War in Jordan & Expulsion to Lebanon:**',
  '**The Munich Olympics Massacre (September 1972):**',
  '**Operation Wrath of God: Israel’s Targeted Counter-Terrorism:**',
  '**Arafat at the United Nations (1974): The Gun and the Olive Branch:**',
];
l6.narrative_blocks.forEach((block, idx) => {
  if (block.text && l6Signposts[idx]) {
    let cleanText = block.text.replace(/^(\*\*.*?\*\*|<strong>.*?<\/strong>)\s*/i, '');
    block.text = `${l6Signposts[idx]} ${cleanText}`;
  }
});
l6.exit_ticket = {
  type: 'speed_run',
  type_label: 'Exit Ticket · Paper 2 Micro-Drill',
  title: 'Exit Ticket: The 3-Minute Paper 2 Speed-Run',
  prompt:
    'In Edexcel Paper 2, Question 1 is **always** a 4-mark question: *"Explain one consequence of..."* Spend 3 minutes writing a single PEEL paragraph for today’s topic:',
  options: [
    'Question: Explain one consequence of the Battle of Karameh (1968) for the Palestinian resistance movement.',
    'Structure Requirement: State your Point (1 mark), provide specific historical Evidence [e.g. Fatah recruitment, Arafat prestige] (1 mark), and Explain the consequence (2 marks).',
  ],
  guidance: 'Write with precision. Avoid generic fluff.',
};
l6.consolidation =
  'Exit Ticket — Paper 2 Speed-Run: Spend 3 minutes writing a 4-mark PEEL paragraph explaining one consequence of the Battle of Karameh (1968) or the Munich Olympics attack (1972).';

// LESSON 7 (KT 2.3: Yom Kippur War & Camp David Accords, 1973–1979)
const l7 = unit.lessons[6];
const l7Signposts = [
  '**Anwar Sadat’s Strategy: Restoring Egyptian Honor:**',
  '**Operation Badr: The Yom Kippur Surprise Attack (6 October 1973):**',
  '**The Syrian Assault on the Golan Heights:**',
  '**Superpower Airlifts: American Arms vs Soviet Resupply:**',
  '**The Israeli Counter-Offensive: Sharon Crosses the Suez Canal:**',
  '**The OPEC Oil Embargo: Energy Crisis Across the Western World:**',
  '**Henry Kissinger & Shuttle Diplomacy (1974–1975):**',
  '**Sadat’s Historic Journey to Jerusalem & Speech to the Knesset (1977):**',
  '**The Camp David Summit (1978): Jimmy Carter’s 13 Days:**',
  '**The Egypt-Israel Peace Treaty (1979): Mutual Recognition at Last:**',
  '**Arab Condemnation & The Assassination of Anwar Sadat (1981):**',
];
l7.narrative_blocks.forEach((block, idx) => {
  if (block.text && l7Signposts[idx]) {
    let cleanText = block.text.replace(/^(\*\*.*?\*\*|<strong>.*?<\/strong>)\s*/i, '');
    block.text = `${l7Signposts[idx]} ${cleanText}`;
  }
});
l7.exit_ticket = {
  type: 'golden_sentence',
  type_label: 'Exit Ticket · The Golden Sentence',
  title: 'Exit Ticket: The Three-Tiered Golden Sentence',
  prompt:
    'Write **ONE single, grammatically sophisticated historical sentence** explaining why Anwar Sadat signed the 1979 Egypt-Israel Peace Treaty. Must contain all 3 required ingredients:',
  options: [
    'Ingredient 1 (Date / Stat): Include one date or statistic [e.g., October 1973, 1978, 13 days at Camp David, or the return of the entire Sinai Peninsula].',
    'Ingredient 2 (Individual / Leader): Name one leader [e.g., Anwar Sadat, Menachem Begin, or Jimmy Carter].',
    'Ingredient 3 (Causal Conjunction): Connect your reasoning with an analytical conjunction [e.g., in order to, resulting in, despite, or whereby].',
  ],
  guidance:
    'Focus on the trade-off: recovering Egyptian land in exchange for peace and diplomatic isolation from the Arab League.',
};
l7.consolidation =
  'Exit Ticket — The Golden Sentence: Write ONE historical sentence explaining why Sadat signed the 1979 peace treaty with Israel. Must include: (1) One date/stat [Sinai, 1978/79], (2) One leader [Sadat, Begin, Carter], and (3) One causal conjunction.';

// LESSON 8 (KT 3.1: Palestinian Issue: Lebanon & Sabra/Shatila, 1982)
const l8 = unit.lessons[7];
const l8Signposts = [
  '**Operation Peace for Galilee (June 1982): Ariel Sharon’s Invasion:**',
  '**The Siege of Beirut & The Expulsion of the PLO to Tunisia:**',
  '**The Sabra and Shatila Massacre (September 1982):**',
  '**The Kahan Commission: Domestic Israeli Backlash & Sharon’s Resignation:**',
  '**The Rise of Hezbollah: Shia Resistance in Southern Lebanon:**',
  '**The Roots of Domestic Palestinian Frustration in Gaza and the West Bank:**',
];
l8.narrative_blocks.forEach((block, idx) => {
  if (block.text && l8Signposts[idx]) {
    let cleanText = block.text.replace(/^(\*\*.*?\*\*|<strong>.*?<\/strong>)\s*/i, '');
    block.text = `${l8Signposts[idx]} ${cleanText}`;
  }
});
l8.exit_ticket = {
  type: 'spot_imposter',
  type_label: 'Exit Ticket · Two Truths & One Fallacy',
  title: 'Exit Ticket: Spot the Historical Imposter',
  prompt: 'Identify the IMPOSTER among these three statements regarding the 1982 Lebanon War:',
  options: [
    'Statement A: Israeli Defense Minister Ariel Sharon sent troops far beyond the declared 40-kilometer buffer zone to lay siege to Beirut and expel Yasser Arafat’s PLO leadership to Tunisia.',
    'Statement B: The Sabra and Shatila massacres were carried out directly by Israeli soldiers following an explicit order from Prime Minister Menachem Begin.',
    'Statement C: The official Israeli Kahan Commission found Ariel Sharon bore "personal responsibility" for failing to prevent the massacre, forcing his resignation as Defense Minister.',
  ],
  guidance:
    'Task: Identify the false statement (Statement B: the massacre was committed by Christian Phalangist militiamen, though Israeli forces encircled the camps) and write the correction.',
};
l8.consolidation =
  'Exit Ticket — Spot the Imposter: Identify the false statement regarding the Sabra and Shatila massacres (Statement B) and write the 1-sentence historical correction.';

// LESSON 9 (KT 3.2: The First Intifada, 1987–1993)
const l9 = unit.lessons[8];
const l9Signposts = [
  '**The Spark in Jabalya (8 December 1987): The Uprising Erupts:**',
  '**The Dynamics of the Intifada: Stones Against Tanks:**',
  '**The UNLU (Unified National Leadership of the Uprising): Grassroots Power:**',
  '**The Rise of Hamas (1987): Islamic Resistance Challenges the Secular PLO:**',
  '**Yitzhak Rabin’s "Iron Fist" & The Global Media War:**',
  '**Arafat’s Diplomatic Shift: Geneva (1988) & Recognition of Israel:**',
  '**The Gulf War (1991): Arafat Backs Saddam Hussein & Loses Arab Aid:**',
  '**The Madrid Conference (1991): Setting the Stage for Direct Talks:**',
];
l9.narrative_blocks.forEach((block, idx) => {
  if (block.text && l9Signposts[idx]) {
    let cleanText = block.text.replace(/^(\*\*.*?\*\*|<strong>.*?<\/strong>)\s*/i, '');
    block.text = `${l9Signposts[idx]} ${cleanText}`;
  }
});
l9.exit_ticket = {
  type: 'balance_scale',
  type_label: 'Exit Ticket · The Causal Balance Scale',
  title: 'Exit Ticket: The Causal Balance Scale',
  prompt: 'Weigh the driving leadership of the First Intifada on a scale of 0 to 10:',
  options: [
    '[0] 100% Spontaneous Grassroots Rebellion: Driven entirely by frustrated youth in Gaza and the West Bank throwing stones.',
    '[5] A Blend: Began spontaneously, but was quickly steered by local clandestine committees (UNLU).',
    '[10] 100% Orchestrated by Arafat: Controlled and ordered by the PLO leadership in exile from Tunisia.',
  ],
  guidance:
    'Task: Where on the scale do you place the uprising, and what is your single piece of historical evidence justifying why the PLO in Tunis was caught off guard?',
};
l9.consolidation =
  'Exit Ticket — The Causal Balance Scale: Was the First Intifada purely a grassroots uprising (0) or directed by the PLO in exile (10)? State your score and provide one piece of historical evidence.';

// LESSON 10 (KT 3.3: The Oslo Peace Accords, 1993–1995)
const l10 = unit.lessons[9];
const l10Signposts = [
  '**The Secret Negotiations in Norway: Circumventing the Hardliners:**',
  '**Letters of Mutual Recognition: Breaking the Fifty-Year Taboo:**',
  '**The Declaration of Principles (Oslo I, 1993): The White House Handshake:**',
  '**The Establishment of the Palestinian National Authority (PNA) in Gaza & Jericho:**',
  '**The 1994 Israel-Jordan Peace Treaty: King Hussein Signs:**',
  '**Oslo II (1995): Partitioning the West Bank into Areas A, B, and C:**',
  '**The Fatal Postponement: The Unresolved Final-Status Issues:**',
  '**The Extremist Backlash: Hamas Suicide Bombings Sabotage the Process:**',
  '**The Assassination of Yitzhak Rabin (4 November 1995): The Death of Peace:**',
];
l10.narrative_blocks.forEach((block, idx) => {
  if (block.text && l10Signposts[idx]) {
    let cleanText = block.text.replace(/^(\*\*.*?\*\*|<strong>.*?<\/strong>)\s*/i, '');
    block.text = `${l10Signposts[idx]} ${cleanText}`;
  }
});
l10.exit_ticket = {
  type: 'split_perspective',
  type_label: 'Exit Ticket · Split-Perspective Headlines',
  title: 'Exit Ticket: Split-Perspective Front Page',
  prompt:
    'Write two **6-word newspaper headlines** capturing the historic handshake between Yitzhak Rabin and Yasser Arafat on the White House lawn (13 September 1993):',
  options: [
    'Headline A (Optimistic Global View - The New York Times): Celebrating historic mutual recognition and hope for peace.',
    'Headline B (Skeptical / Militant View - Hamas or Right-Wing Israeli Settler): Condemning the accords as a fatal betrayal.',
  ],
  guidance: 'Strict constraint: Exactly 6 words per headline!',
};
l10.consolidation =
  'Exit Ticket — Split-Perspective Headlines: Write one 6-word headline reflecting the historic hope of the Oslo handshake, and one 6-word headline reflecting the furious opposition of extremists who saw it as betrayal.';

console.log(
  '✅ Injected bold signposts, updated authentic sources, and added rotated exit tickets across all 10 lessons.',
);

// =========================================================================
// 5. WRITE UPDATED DATA.JS
// =========================================================================
const outputJs = `// Auto-generated Paper 2 Conflict in the Middle East Unit Data
const cme_new = ${JSON.stringify(unit, null, 2)};

export const unitData = cme_new;
export default cme_new;
`;

fs.writeFileSync(dataJsPath, outputJs, 'utf8');
console.log('🎉 Successfully saved units/cme_new/data.js!');
