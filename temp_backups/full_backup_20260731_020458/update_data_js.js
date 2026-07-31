const fs = require('fs');

const questionsMap = {
  // Lesson 1 (KT1.1)
  0: [
    { question: "Explain the importance of conflicting interests and demands of Arabs and Jews for the British Mandate. 1945-48.", marks: 8 },
    { question: "Explain the importance of the bombing of the King David Hotel (1946) for the ending of the British Mandate in 1947.", marks: 8 },
    { question: "Write a narrative account analysing the conflicting interests and demands of Arabs and Jews in the British Mandate 1945-47.", marks: 8 },
    { question: "Explain one consequence of growing Jewish insurgency during the British Mandate 1946-1947.", marks: 4 },
    { question: "Write a narrative account analysing the key events of 1946-48 that led to the creation of Israel.", marks: 8 },
    { question: "Write a narrative account analysing the key events of the Arab-Israeli war from 1948 to 1949.", marks: 8 }
  ],
  // Lesson 2 (KT1.2)
  1: [
    { question: "Explain one consequence of the 1948-49 Arab-Israeli War.", marks: 4 },
    { question: "Explain the importance of the Arab-Israeli conflict of 1948 for relations between Palestinians and Israelis.", marks: 8 },
    { question: "Write a narrative account analysing the growth of Israel 1949-1954.", marks: 8 },
    { question: "Explain the importance of US aid to Israel for the consolidation of the new state in the years 1949–54.", marks: 8 },
    { question: "Explain the importance of Israel's early relations with Egypt for the stability of the region in the years 1949–54.", marks: 8 }
  ],
  // Lesson 3 (KT1.3)
  2: [
    { question: "Explain the importance of Israeli attacks on Gaza, 1955, for relations between Egypt and Israel.", marks: 8 },
    { question: "Explain one consequence of Israeli attacks on Gaza in 1955.", marks: 4 },
    { question: "Explain one consequence of the Suez Canal Crisis (1956).", marks: 4 },
    { question: "Write a narrative account analysing the key events of the Suez Canal Crisis (1956).", marks: 8 },
    { question: "Explain one consequence of the formation of the United Arab Republic, UAR, in 1958.", marks: 4 },
    { question: "Explain the importance of the formation of the United Arab Republic, UAR, in 1958 for regional tension in the Middle East.", marks: 8 }
  ],
  // Lesson 4 (KT2.1)
  3: [
    { question: "Explain the importance of the Cairo Conference (1964) for the Arab states in the years 1964-73.", marks: 8 },
    { question: "Explain one consequence of Syria's support for Fatah 1964-67.", marks: 4 },
    { question: "Explain one consequence of the Israeli raid on Samu, 1966, for developments in the Middle East.", marks: 4 },
    { question: "Write a narrative account analysing the rising tension in the Middle East in the years 1964-67 which led to the Six Day War.", marks: 8 },
    { question: "Explain one consequence of disputes over the River Jordan waters.", marks: 4 },
    { question: "Explain the importance of disputes over the River Jordan waters for border tension between Israel and Syria.", marks: 8 },
    { question: "Write a narrative account analysing the key events of the Six Day War 1967.", marks: 8 }
  ],
  // Lesson 5 (KT2.2)
  4: [
    { question: "Explain one consequence of the 1967 Six Day War.", marks: 4 },
    { question: "Explain the importance of the occupied territories for Israelis and Palestinians after 1967.", marks: 8 },
    { question: "Explain the importance of Israel's consolidation of control of the occupied territories for relations between Israel and the Palestinians in the years 1967–73.", marks: 8 },
    { question: "Explain the importance of the occupied territories for relations between Israel and the Arab world after the Six Day War, 1967.", marks: 8 },
    { question: "Explain the importance of the use of Terrorism by Palestinians in the 1970's for the Palestinian issue.", marks: 8 },
    { question: "Explain one consequence of the expulsion of the PLO from Jordan in 1970.", marks: 4 },
    { question: "Explain one consequence of the PFLP airplane hijacks of 1970.", marks: 4 },
    { question: "Explain the importance of the expulsion of the PLO from Jordan, 1970, for PLO activities in Lebanon.", marks: 8 }
  ],
  // Lesson 6 (KT2.3)
  5: [
    { question: "Explain the importance of superpower (USA/USSR) involvement in the conflict in the Middle East 1967-73.", marks: 8 },
    { question: "Write a narrative account analysing the key events of Egypt's relationship with Israel 1968-73.", marks: 8 },
    { question: "Explain one consequence of the ongoing dispute over the Suez Canal 1967-73.", marks: 4 },
    { question: "Write a narrative account analysing relations between Egypt and other states in the years 1967–73.", marks: 8 },
    { question: "Write a narrative account analysing the key events of the 1973 Yom Kippur War.", marks: 8 },
    { question: "Explain one consequence of the 1973 Yom Kippur War.", marks: 4 }
  ],
  // Lesson 7 (KT3.1)
  6: [
    { question: "Explain the importance of Kissinger's 'shuttle diplomacy' for relations between Israel and Egypt.", marks: 8 },
    { question: "Write a narrative account analysing the key events of 1974-1979 that led to peace between Egypt and Israel.", marks: 8 },
    { question: "Write a narrative account analysing key developments in diplomatic negotiations in the years 1973–79.", marks: 8 },
    { question: "Explain one consequence of the reopening of the Suez Canal, 1975.", marks: 4 },
    { question: "Explain the importance of Sadat's visit to Israel, 1977, for diplomatic negotiations.", marks: 8 },
    { question: "Explain one consequence of the Camp David Agreements (1978-79).", marks: 4 },
    { question: "Explain the importance of US President Carter and Camp David, 1978, for the peace process in the Middle East.", marks: 8 },
    { question: "Explain the importance of the Treaty of Washington (1978-79) for peace in the Middle East.", marks: 8 }
  ],
  // Lesson 8 (KT3.2)
  7: [
    { question: "Explain the importance of Yasser Arafat's speech to the UN, 1974, for the international recognition of the Palestinian cause.", marks: 8 },
    { question: "Explain the importance of PLO activity in Lebanon for Israel.", marks: 8 },
    { question: "Write a narrative account analysing the key events of Israel's escalating conflict with the PLO in Lebanon 1978-1982.", marks: 8 },
    { question: "Explain one consequence of the 1982 Israeli invasion of Lebanon.", marks: 4 },
    { question: "Explain the importance of the First Intifada (1987-93) for the Palestinians and Israel.", marks: 8 },
    { question: "Explain one consequence of the Palestinian Intifada (1987–93).", marks: 4 }
  ],
  // Lesson 9 (KT3.3)
  8: [
    { question: "Explain the importance of Yasser Arafat's renunciation of terrorism in 1988 for the peace process.", marks: 8 },
    { question: "Explain the importance of the first Gulf War and end of the Cold War (1991) for the conflict in the Middle east.", marks: 8 },
    { question: "Explain one consequence of the Gulf War (1991) for the Arab-Israeli conflict.", marks: 4 },
    { question: "Explain one consequence of US involvement in the Gulf War, 1991, for the PLO.", marks: 4 },
    { question: "Explain the importance of US involvement in the Gulf War, 1991, for the diplomatic strategy of the PLO.", marks: 8 },
    { question: "Write a narrative account analysing the key events of the peace process between Israel and the Palestinians, 1991-1995.", marks: 8 },
    { question: "Explain one consequence of the 1993 Oslo Peace Accords.", marks: 4 },
    { question: "Explain the importance of the Oslo Accords for the conflict in the Middle East.", marks: 8 },
    { question: "Explain the importance of Oslo II, 1995, for the Middle East peace process.", marks: 8 },
    { question: "Explain one consequence of the setting up of the Palestinian National Authority.", marks: 4 },
    { question: "Write a narrative account analysing attempts at a solution in the years 1988–95.", marks: 8 },
    { question: "Explain one consequence of Oslo II, 1995.", marks: 4 }
  ]
};

const dataContent = fs.readFileSync('public/units/cme_new/data.js', 'utf8');

const startIndex = dataContent.indexOf('export const unitData = {') !== -1 ? dataContent.indexOf('export const unitData = {') + 24 : dataContent.indexOf('{', dataContent.indexOf('import') !== -1 ? dataContent.indexOf('\\n') : 0);
const endIndex = dataContent.lastIndexOf('}');
const jsonStr = dataContent.substring(startIndex, endIndex + 1);

let unitData;
try {
  unitData = eval('(function(){ const mock_exams="PLACEHOLDER"; return ' + jsonStr + ';})()');
  
  unitData.lessons.forEach((l, i) => {
    if (questionsMap[i]) {
      l.exam_practice = questionsMap[i];
    }
  });

  const stringified = JSON.stringify(unitData, null, 4);
  const finalFileContent = 'import { mock_exams } from "./mock_exams.js";\\nexport const unitData = ' + stringified.replace(/"PLACEHOLDER"/g, 'mock_exams') + ';';
  
  fs.writeFileSync('public/units/cme_new/data.js', finalFileContent);
  console.log('Successfully injected exam_practice into data.js');
} catch (e) {
  console.error('Error modifying data.js', e);
}
