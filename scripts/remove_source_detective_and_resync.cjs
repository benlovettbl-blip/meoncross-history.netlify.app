const fs = require('fs');
const path = require('path');

async function removeSourceDetectiveAndSync() {
  console.log('🔄 Starting CME Source Detective removal and multi-file synchronization...');

  const dataJsPath = path.resolve(__dirname, '../units/cme_new/data.js');
  const publicDataJsPath = path.resolve(__dirname, '../public/units/cme_new/data.js');
  const dataJsonPath = path.resolve(__dirname, '../data/cme_new.json');
  const publicDataJsonPath = path.resolve(__dirname, '../public/data/cme_new.json');

  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.unitData || module.default;

  let totalQuestionsCleaned = 0;

  // Specific enhanced wording dictionary for sources that need tighter enquiry alignment
  const specificEnhancements = {
    // Lesson 1
    L1_A: 'Study Source A. Using the partition map, explain why the secret Anglo-French division of the Middle East in the Sykes-Picot Agreement laid the groundwork for decades of border conflicts and Arab betrayal.',
    L1_B: 'Study Source B. How did Arthur Balfour\'s pledge to establish a "national home for the Jewish people" create a fundamental and unresolvable contradiction with the rights of the existing Arab majority?',

    // Lesson 2
    L2_A: 'Study Source A. Why did the Irgun target the British administrative and military headquarters at the King David Hotel, and how did this attack convince the British government that maintaining the Mandate was untenable?',
    L2_B: 'Study Source B. Why did the execution and public display of the two British sergeants create such overwhelming political pressure on Clement Attlee’s government to surrender the Mandate?',
    L2_C: "Study Source C. How does this photograph of the intercepted SS Exodus—and the global public relations crisis it provoked—explain why Britain's forced deportation of Holocaust survivors destroyed its diplomatic standing in the United States?",
    L2_D: 'Study Source D. Why did David Ben-Gurion choose to declare independence beneath the portrait of Theodor Herzl on the exact afternoon British forces withdrew?',

    // Lesson 3
    L3_A: 'Study Source A. What does this photograph reveal about the fighting conditions facing the newly formed IDF, and how was Israel able to defeat the five invading Arab armies in 1948–49?',
    L3_B: 'Study Source B. What does this photograph reveal about the suddenness of the Palestinian flight and the immense humanitarian crisis created across the region?',
    L3_C: 'Study Source C. Compare the 1949 Green Line on the map with the 1947 UN Partition Plan: which areas did Israel capture beyond its original UN allocation?',
    L3_D: 'Study Source D. Locate the Straits of Tiran at the southern tip of the Sinai Peninsula on the map. Why was Egypt’s naval blockade here considered an act of war (casus belli) by Israel?',

    // Lesson 4
    L4_A: "Study Source A. Why did Nasser's charismatic leadership and anti-colonial stance inspire such widespread devotion across the Arab world?",
    L4_B: 'Study Source B. How did Nasser use the nationalisation of the canal, as celebrated in this newspaper headline, to assert Egyptian sovereignty and fund the construction of the Aswan High Dam?',
    L4_C: 'Study Source C. Study the troop movements on the map. How did the rapid Israeli capture of the Mitla Pass and Sinai allow Britain and France to claim they were merely intervening as "peacekeepers" to protect the Suez Canal?',
    L4_D: 'Study Source D. Why did Britain and France claim they were entering Egypt as neutral peacekeepers to separate Israeli and Egyptian armies when the Sèvres Protocol proved they had pre-planned the war together?',
    L4_E: 'Study Source E. How did Prime Minister Eden attempt to justify military intervention to the British Parliament, and why did this justification collapse under international pressure?',

    // Lesson 5
    L5_A: 'Study Source A. How does the map illustrate the strategic dilemma of fighting a war on three fronts simultaneously, and how did Israel overcome this geography?',
    L5_B: 'Study Source B. What does this iconic photograph reveal about the emotional and religious significance of capturing the Old City of Jerusalem for Israeli soldiers?',
    L5_C: 'Study Source C. Why was Israel’s preemptive strike against Egyptian airfields in Operation Focus decisive in securing total air superiority and victory in just six days?',

    // Lesson 6
    L6_A: 'Study Source A. Why did the phrase "withdrawal from territories occupied in the recent conflict" in UN Resolution 242 create such intense and lasting disagreement between Israel and Arab states?',
    L6_B: 'Study Source B. How did Yasser Arafat use the 1968 Battle of Karameh to establish the PLO as an independent fighting force separate from Arab state control?',
    L6_C: "Study Source C. Using the map, explain why the armed Fedayeen presence in Jordanian cities directly threatened the sovereignty of King Hussein's monarchy, leading to the Black September civil war.",
    L6_D: 'Study Source D. Why did radical Palestinian militant groups shift toward dramatic international terrorism like the Munich hostage crisis after the defeat of conventional Arab armies in 1967?',

    // Lesson 7
    L7_A: 'Study Source A. How did the Egyptian surprise assault across the Suez Canal in Operation Badr overcome the Bar-Lev Line and completely shatter Israeli assumptions of military invulnerability?',
    L7_B: "Study Source B. How did Soviet-supplied anti-tank and surface-to-air missiles (SAMs) neutralize Israel's armored and air superiority during the early days of the Yom Kippur War?",
    L7_C: 'Study Source C. Study the Egyptian crossing points along the Suez Canal on the map. How did Egyptian forces use the water barrier and geographical depth of the Sinai passes to catch the Israeli Bar Lev line by surprise?',
    L7_D: 'Study Source D. How did Golda Meir explain the devastating initial losses on Yom Kippur, and why did the intelligence failure (the "Mehdal") lead to her eventual resignation?',

    // Lesson 8
    L8_A: "Study Source A. Why was President Sadat's historic speech to the Israeli parliament in Jerusalem considered an astonishing psychological and diplomatic breakthrough for Middle East peace?",
    L8_B: "Study Source B. Why was US President Jimmy Carter's personal mediation at Camp David indispensable in brokering a compromise between Menachem Begin and Anwar Sadat?",
    L8_C: 'Study Source C. Using the map, explain why Israeli withdrawal from the Sinai Peninsula and guaranteed free passage through the Strait of Tiran were the twin territorial cornerstones of the Egypt-Israel Peace Treaty.',
    L8_D: "Study Source D. How did the signing of the peace treaty transform regional alliances, and why did it lead directly to Egypt's suspension from the Arab League and the assassination of Sadat?",

    // Lesson 9
    L9_A: 'Study Source A. Why did Defence Minister Ariel Sharon push the Israeli military invasion all the way to Beirut, and why did the siege provoke intense domestic and international opposition?',
    L9_B: 'Study Source B. Study the arrows marking the Israeli advance northward on the map. How does the map demonstrate that Sharon pushed the invasion far beyond the initial 40-kilometre security zone to encircle Beirut?',
    L9_C: 'Study Source C. Why was the forced evacuation of Yasser Arafat and thousands of PLO fighters from Lebanon to Tunis both a military defeat and a catalyst for the First Intifada?',
    L9_D: 'Study Source D. How does the asymmetric confrontation between stone-throwing Palestinian youths and Israeli armored forces explain why the First Intifada created a public relations crisis for Israel?',

    // Lesson 10
    L10_A:
      'Study Source A. Why did the visual handshake between Rabin and Arafat symbolize an astonishing diplomatic breakthrough, and what major obstacles remained unresolved?',
    L10_B:
      'Study Source B. Why was King Hussein of Jordan willing to sign a formal peace treaty with Israel in 1994 following the momentum of the Oslo Accords?',
    L10_C:
      'Study Source C. Study the distribution of Areas A, B, and C on the map. Why did this fragmented "archipelago" of isolated Palestinian enclaves lead many Palestinians to view Oslo II as an unworkable compromise?',
    L10_D:
      'Study Source D. What does this massive peace rally reveal about the deep polarization within Israeli society between supporters of the peace process and right-wing extremists?',
  };

  unitData.lessons.forEach((lesson, lIdx) => {
    const lNum = lIdx + 1;
    let letterCharCode = 65; // 'A'

    // Process primary source
    if (lesson.primary_source) {
      const letter = String.fromCharCode(letterCharCode++);
      const key = `L${lNum}_${letter}`;
      if (specificEnhancements[key]) {
        lesson.primary_source.question = specificEnhancements[key];
      } else {
        lesson.primary_source.question = cleanQuestion(lesson.primary_source.question, letter);
      }
      totalQuestionsCleaned++;
    }

    // Process narrative block sources
    (lesson.narrative_blocks || []).forEach((block) => {
      if (block.source) {
        const letter = String.fromCharCode(letterCharCode++);
        const key = `L${lNum}_${letter}`;
        if (specificEnhancements[key]) {
          block.source.question = specificEnhancements[key];
        } else {
          block.source.question = cleanQuestion(block.source.question, letter);
        }
        totalQuestionsCleaned++;
      }
    });
  });

  function cleanQuestion(raw, letter) {
    if (!raw) return `Study Source ${letter}.`;
    let cleaned = raw
      .replace(/^Source\s*Detective[:.]?\s*/i, '')
      .replace(/^Q\d+[\.\:]\s*/i, '')
      .trim();

    if (!cleaned.startsWith(`Study Source ${letter}.`)) {
      cleaned = cleaned.replace(/^(?:Study\s+)?Source\s+[A-Z][\.\:]?\s*/i, '');
      cleaned = `Study Source ${letter}. ${cleaned}`;
    }
    return cleaned;
  }

  // 1. Write units/cme_new/data.js
  const code =
    'export const unitData = ' +
    JSON.stringify(unitData, null, 2) +
    ';\nexport default unitData;\n';
  fs.writeFileSync(dataJsPath, code, 'utf8');
  fs.writeFileSync(publicDataJsPath, code, 'utf8');
  console.log('✅ Synchronized units/cme_new/data.js and public/units/cme_new/data.js');

  // 2. Write data/cme_new.json and public/data/cme_new.json
  const jsonCode = JSON.stringify(unitData, null, 2);
  fs.writeFileSync(dataJsonPath, jsonCode, 'utf8');
  fs.writeFileSync(publicDataJsonPath, jsonCode, 'utf8');
  console.log('✅ Synchronized data/cme_new.json and public/data/cme_new.json');

  console.log(
    `🎉 Successfully cleaned ${totalQuestionsCleaned} source questions across all 10 lessons.`,
  );
}

removeSourceDetectiveAndSync().catch((err) => {
  console.error('Fatal error in removeSourceDetectiveAndSync:', err);
  process.exit(1);
});
