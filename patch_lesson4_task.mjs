import fs from 'fs';

const dataPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let dataContent = fs.readFileSync(dataPath, 'utf8');

const oldTaskStr = `          "tasks": [
            {
              "type": "narrative_account",
              "model": "<p>The May 1967 crisis began with false intelligence provided by the <strong>Soviet Union</strong> on 13 May, which warned Egyptian President Nasser that Israel was massing ten military brigades on the Syrian border for an imminent invasion. <mark style=\\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\\">Consequently</mark>, Nasser reacted by taking immediate military action, mobilizing the Egyptian army on 15 May and marching his troops into the demilitarised <strong>Sinai Peninsula</strong>.</p><p><mark style=\\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\\">This aggressive move was quickly followed by</mark> Nasser’s order on 16 May forcing the United Nations Emergency Force (<strong>UNEF</strong>) peacekeepers to withdraw from the border. <mark style=\\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\\">With tensions already at a fever pitch, Nasser escalated the crisis further</mark> on 23 May by reoccupying Sharm el-Sheikh and ordering the closure of the <strong>Straits of Tiran</strong> to all Israeli shipping, a move Israel considered a formal <em>casus belli</em>.</p><p><mark style=\\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\\">This economic threat was compounded</mark> on 30 May when <strong>King Hussein of Jordan</strong> flew to Cairo to sign a joint defense pact. <mark style=\\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\\">This final step convinced the Israeli Cabinet that</mark> a coordinated, three-front Arab invasion was imminent. <mark style=\\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\\">This sequence of events culminated</mark> on the morning of 5 June 1967, when Israel launched its pre-emptive air strike, <strong>Operation Focus</strong>, destroying the Egyptian air force on the ground and initiating the Six Day War.</p>",
              "text": "Write a narrative account analysing the key events of the May 1967 crisis that led to the outbreak of the Six Day War. (8 marks)"
            }
          ]`;

if (dataContent.includes(oldTaskStr)) {
  // Empty it out from the first block
  dataContent = dataContent.replace(oldTaskStr, '          "tasks": []');
  
  // Now we need to find the last narrative block in Lesson 4 and append it.
  const nextLessonIndex = dataContent.indexOf('"title": "Lesson 5: The Aftermath of the 1967 War"');
  if (nextLessonIndex !== -1) {
    const lesson4Content = dataContent.substring(0, nextLessonIndex);
    const lastTaskIndex = lesson4Content.lastIndexOf('"tasks": []');
    
    if (lastTaskIndex !== -1) {
      dataContent = dataContent.substring(0, lastTaskIndex) + oldTaskStr + dataContent.substring(lastTaskIndex + '"tasks": []'.length);
      fs.writeFileSync(dataPath, dataContent, 'utf8');
      console.log("Successfully moved the 8-mark question to the end of Lesson 4!");
    } else {
      console.log("Could not find tasks array at the end of Lesson 4");
    }
  } else {
    console.log("Could not find Lesson 5");
  }
} else {
  console.log("Could not find the old task string. Perhaps exact formatting mismatch.");
}
