const fs = require('fs');
const dataPath = 'public/units/cme_new/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

const updates = {
  "KT1.1: The End of the British Mandate and the Creation of Israel, 1945–1949": [
    "Understand the conflicting interests and demands of Jews and Arabs within the British Mandate.",
    "Analyze the key events leading to the end of the British Mandate, partition and the creation of Israel, including the significance of the bombing of the King David Hotel and UN Resolution 181.",
    "Describe the key events of the Arab-Israeli war (1948–49)."
  ],
  "KT1.2: The Aftermath of the 1948–49 War": [
    "Explain the territorial changes and their impact, including the refugee status of Palestinian Arabs.",
    "Understand the creation of the Israeli Defence Forces (IDF) and the Law of Return (1950), and the importance of US aid to Israel.",
    "Analyze Israel’s relations with Egypt in the aftermath of the war."
  ],
  "KT1.3: Increased Tension, 1955–1963": [
    "Understand Nasser and Egypt’s leadership of the Arab world.",
    "Analyze the events and significance of Israeli attacks on Gaza in 1955 and Sinai in 1956.",
    "Evaluate the events and significance of the Suez Crisis (1956), including the formation of the United Arab Republic (UAR) in 1958."
  ],
  "KT2.1: The Six Day War, 1967": [
    "Understand the significance of the Cairo Conference (1964) and the growth of Fatah and the PLO.",
    "Analyze the escalating tension between Israel, Syria and Jordan: Syria’s support for Fatah, Israel’s raid on Samu and the events of 7 April 1967.",
    "Evaluate the actions of the USSR, Nasser and the USA in the period leading to war, and the key events of the war."
  ],
  "KT2.2: The Aftermath of the 1967 War": [
    "Understand UN Resolution 242 and the continued dispute over the Suez Canal.",
    "Analyze the situation of Palestinian refugees and the significance of the occupied territories: Golan Heights, Gaza Strip, West Bank, Sinai and East Jerusalem.",
    "Evaluate the use of terrorism, Israel’s response and international attitudes towards the Palestine issue: the PFLP airplane hijacks of 1970; Black September and the Munich Olympics; and the expulsion of the PLO from Jordan (1970)."
  ],
  "KT2.3: Israel and Egypt, 1967–1973": [
    "Analyze Egyptian relations with Israel, the USA, the USSR and other Arab states.",
    "Understand Israel’s consolidation of control of the occupied territories.",
    "Describe the key events of the Yom Kippur War (1973) and its aftermath."
  ],
  "KT3.1: Diplomatic negotiations, 1974–1979": [
    "Understand the significance of the oil crisis and the involvement of the USA and the USSR.",
    "Analyze Kissinger, ‘shuttle diplomacy’ and the reopening of the Suez Canal.",
    "Evaluate Sadat’s visit to Israel (1977), Begin’s visit to Egypt (1977), US President Carter and Camp David (1978) and the Treaty of Washington (1979)."
  ],
  "KT3.2: The Palestinian Issue, 1974–1993": [
    "Understand Arafat’s speech to the UN (1974) and the significance of PLO activities in Lebanon.",
    "Analyze Israeli reprisals, the invasion of Lebanon (1982) and the results.",
    "Evaluate the situation in the Israeli occupied territories and the First Palestinian Intifada (1987–93)."
  ],
  "KT3.3: Attempts at a solution, 1988–1995": [
    "Understand the significance of Arafat’s renunciation of terrorism in a speech at the UN (1988).",
    "Analyze changing superpower policies in the Middle East: US involvement in the Gulf War (1991), and the end of the Cold War.",
    "Evaluate Arafat, Rabin and the Oslo Accords (1993); the setting up of the Palestinian National Authority; the Israel-Jordan peace treaty (1994); and Oslo II (1995)."
  ]
};

console.log("Applying regex replacements...");
for (const [title, newObjectives] of Object.entries(updates)) {
  // First, we find the lesson object text by splitting at the title.
  // We can just use split since there are exactly 2 instances of each lesson.
  const parts = content.split(`"title": "${title}"`);
  if (parts.length === 1) {
    console.warn("Not found:", title);
    continue;
  }
  
  // parts[0] is everything before the first title.
  // parts[1] is the body of the first instance.
  // parts[2] is the body of the second instance.
  
  for (let i = 1; i < parts.length; i++) {
    // Replace "objective": "..." up to 3 times
    let matchCount = 0;
    parts[i] = parts[i].replace(/"objective":\s*"(.*?)"/g, (match, p1) => {
      if (matchCount < newObjectives.length) {
        const newStr = `"objective": "${newObjectives[matchCount]}"`;
        matchCount++;
        return newStr;
      }
      return match;
    });
    
    // Replace "scaffolded": [ ... ] elements
    // The format is "string", "string", "string"
    const scaffoldedStart = parts[i].indexOf('"scaffolded": [');
    if (scaffoldedStart !== -1) {
      const scaffoldedEnd = parts[i].indexOf(']', scaffoldedStart);
      const section = parts[i].substring(scaffoldedStart, scaffoldedEnd + 1);
      
      let sMatchCount = 0;
      const newSection = section.replace(/"(.*?)"/g, (match, p1) => {
        if (p1 === "scaffolded") return match; // skip the key itself
        if (sMatchCount < newObjectives.length) {
          const newStr = `"${newObjectives[sMatchCount]}"`;
          sMatchCount++;
          return newStr;
        }
        return match;
      });
      
      parts[i] = parts[i].substring(0, scaffoldedStart) + newSection + parts[i].substring(scaffoldedEnd + 1);
    }
  }
  
  content = parts.join(`"title": "${title}"`);
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Successfully updated objectives in cme_new/data.js');
