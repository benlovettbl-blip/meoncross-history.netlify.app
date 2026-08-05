const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

const unitData = JSON.parse(jsonStr);

const l6 = unitData.lessons.find(l => l.id === 'lesson_6');
if (l6 && l6.narrative_blocks && l6.narrative_blocks.length > 0) {
  const masterclassTask = {
    type: "text",
    text: "<strong>Part D: Historical Investigator (Masterclass Extension Tasks)</strong><br><em>Instructions: Choose one of the five historical investigation tasks below. Use the provided web links and your source packs to uncover the hidden realities of the Stubbington fallen.</em><br><br><strong>Path 1: The 1911 Census (Bringing the Names to Life)</strong><br>War memorials only give us names and initials. To understand what the village actually lost, we need to see who these men were before the war.<br><ul><li><strong>Your Task:</strong> Using the provided 1911 Census records for the Lowry family, find out the following: How old were the brothers? What were their jobs? Who else lived in the house? Write a short paragraph explaining how reading the census changes the way you look at the names on the memorial.</li><li><strong>Scaffolding Tip:</strong> Look closely at the \"Occupation\" column. Were they farm laborers, shop workers, or tradesmen? Think about how their sudden absence would impact the village's daily life and economy.</li><li><strong>Helpful Link:</strong> <a href=\"https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/census-records/\" target=\"_blank\">The National Archives: 1911 Census Guide</a></li></ul><br><strong>Path 2: Mapping the Tragedy</strong><br>During the war, entire streets could be plunged into mourning in a single day.<br><ul><li><strong>Your Task:</strong> Select ten names from the Stubbington memorial. Using the Commonwealth War Graves Commission website to find their home addresses, plot them on a historical map of Fareham/Stubbington from the 1910s.</li><li><strong>Scaffolding Tip:</strong> Do you notice any clusters? Are there multiple casualties on the same street? Write a sentence explaining what it would have felt like to be a postman delivering telegrams on that street in 1916.</li><li><strong>Helpful Link:</strong> <a href=\"https://maps.nls.uk/geo/explore/side-by-side/\" target=\"_blank\">National Library of Scotland: Side-by-Side Historic Maps</a></li></ul><br><strong>Path 3: Decoding the Commonwealth War Graves (CWGC)</strong><br>Historians use death records like detective clues to figure out where and how men fought.<br><ul><li><strong>Your Task:</strong> Search for the Lowry brothers on the CWGC database. Look at their date of death and the name of the cemetery or memorial where they are listed (e.g., the Thiepval Memorial or the Menin Gate).</li><li><strong>Scaffolding Tip:</strong> If a soldier died in July 1916 and is listed on the Thiepval Memorial, they almost certainly died at the Battle of the Somme. If they died in late 1917 near Ypres, it was likely Passchendaele. Write down which major battles the Stubbington men were caught in based on your findings.</li><li><strong>Helpful Link:</strong> <a href=\"https://www.cwgc.org/\" target=\"_blank\">Commonwealth War Graves Commission Database</a></li></ul><br><strong>Path 4: Evaluating the Memorial Design</strong><br>Most towns built statues of soldiers with rifles or giant stone crosses. Stubbington built a wooden shelter over a water pump.<br><ul><li><strong>Your Task:</strong> Write a visual analysis of the Stubbington War Memorial. Why do you think the designer (a grieving mother) chose a water pump shelter rather than a glorifying statue of a soldier?</li><li><strong>Scaffolding Tip:</strong> Think about what a water pump represents (community, life, civilian utility) versus a soldier statue (combat, glory, military). What does this tell us about how the local community wanted to remember their dead?</li></ul><br><strong>Path 5: The Missing Voices (Historiography)</strong><br>War memorials only record the dead, meaning the \"visible\" history often masks the invisible trauma of the survivors.<br><ul><li><strong>Your Task:</strong> Challenge yourself to consider who is <em>not</em> on the memorial. Are there men from Stubbington who survived but returned with severe shell shock or missing limbs?</li><li><strong>Scaffolding Tip:</strong> Write a short paragraph explaining why relying solely on a war memorial might give a historian an incomplete picture of how the war actually impacted a village like Stubbington.</li></ul>",
    model: "<em>Teacher Note: These are open-ended masterclass extension tasks. Ensure pupils are utilizing the provided links and primary sources to develop their independent historical research skills.</em>"
  };

  // Check if Part D already exists to avoid duplication
  const existingTaskIndex = l6.narrative_blocks[0].tasks.findIndex(t => t.text.includes('Part D: Historical Investigator'));
  if (existingTaskIndex !== -1) {
    l6.narrative_blocks[0].tasks[existingTaskIndex] = masterclassTask;
  } else {
    l6.narrative_blocks[0].tasks.push(masterclassTask);
  }
}

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Successfully injected Part D into Lesson 6');
