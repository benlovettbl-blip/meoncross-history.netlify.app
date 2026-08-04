const fs = require('fs');

const oldObjs = JSON.parse(fs.readFileSync('old_objs.json', 'utf8'));
const newObjs = [
    "Understand the conflicting interests and demands of Jews and Arabs within the British Mandate.",
    "Analyze the key events leading to the end of the British Mandate, partition and the creation of Israel, including the significance of the bombing of the King David Hotel and UN Resolution 181.",
    "Describe the key events of the Arab-Israeli war (1948–49).",
    
    "Explain the territorial changes and their impact, including the refugee status of Palestinian Arabs.",
    "Understand the creation of the Israeli Defence Forces (IDF) and the Law of Return (1950), and the importance of US aid to Israel.",
    "Analyze Israel’s relations with Egypt in the aftermath of the war.",
    
    "Understand Nasser and Egypt’s leadership of the Arab world.",
    "Analyze the events and significance of Israeli attacks on Gaza in 1955 and Sinai in 1956.",
    "Evaluate the events and significance of the Suez Crisis (1956), including the formation of the United Arab Republic (UAR) in 1958.",
    
    "Understand the significance of the Cairo Conference (1964) and the growth of Fatah and the PLO.",
    "Analyze the escalating tension between Israel, Syria and Jordan: Syria’s support for Fatah, Israel’s raid on Samu and the events of 7 April 1967.",
    "Evaluate the actions of the USSR, Nasser and the USA in the period leading to war, and the key events of the war.",
    
    "Understand UN Resolution 242 and the continued dispute over the Suez Canal.",
    "Analyze the situation of Palestinian refugees and the significance of the occupied territories: Golan Heights, Gaza Strip, West Bank, Sinai and East Jerusalem.",
    "Evaluate the use of terrorism, Israel’s response and international attitudes towards the Palestine issue: the PFLP airplane hijacks of 1970; Black September and the Munich Olympics; and the expulsion of the PLO from Jordan (1970).",
    
    "Analyze Egyptian relations with Israel, the USA, the USSR and other Arab states.",
    "Understand Israel’s consolidation of control of the occupied territories.",
    "Describe the key events of the Yom Kippur War (1973) and its aftermath.",
    
    "Understand the significance of the oil crisis and the involvement of the USA and the USSR.",
    "Analyze Kissinger, ‘shuttle diplomacy’ and the reopening of the Suez Canal.",
    "Evaluate Sadat’s visit to Israel (1977), Begin’s visit to Egypt (1977), US President Carter and Camp David (1978) and the Treaty of Washington (1979).",
    
    "Understand Arafat’s speech to the UN (1974) and the significance of PLO activities in Lebanon.",
    "Analyze Israeli reprisals, the invasion of Lebanon (1982) and the results.",
    "Evaluate the situation in the Israeli occupied territories and the First Palestinian Intifada (1987–93).",
    
    "Understand the significance of Arafat’s renunciation of terrorism in a speech at the UN (1988).",
    "Analyze changing superpower policies in the Middle East: US involvement in the Gulf War (1991), and the end of the Cold War.",
    "Evaluate Arafat, Rabin and the Oslo Accords (1993); the setting up of the Palestinian National Authority; the Israel-Jordan peace treaty (1994); and Oslo II (1995)."
];

let content = fs.readFileSync('public/units/cme_new/data.js', 'utf8');

for (let i = 0; i < oldObjs.length; i++) {
  const oldText = oldObjs[i];
  const newText = newObjs[i];
  
  if (!oldText || !newText) continue;
  if (oldText === newText) continue;
  
  // Escape regex specials just in case
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapeRegExp(oldText), 'g');
  
  content = content.replace(regex, newText);
}

fs.writeFileSync('public/units/cme_new/data.js', content, 'utf8');
console.log('Successfully applied global string replacement to data.js');
