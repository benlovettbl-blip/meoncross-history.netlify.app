import fs from 'fs';

let data = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
const match = data.match(/const unitData = (\{[\s\S]+\});\s*export default unitData;/);
if (match) {
  let unitData = eval('(' + match[1] + ')');
  
  // KT1.2
  let kt12 = unitData.lessons.find(l => l.title.includes('KT1.2'));
  if (kt12) {
    // Block 0: Supernatural
    kt12.narrative_blocks[0].tasks.push({
      type: "written",
      text: "Describe one feature of religious treatments in the Middle Ages.",
      model: "One feature is that they focused on spiritual healing rather than the physical body, such as praying or going on a pilgrimage to ask God for forgiveness."
    });
    // Block 4: Hospitals
    if (!kt12.narrative_blocks[4].tasks) kt12.narrative_blocks[4].tasks = [];
    kt12.narrative_blocks[4].tasks.push({
      type: "written",
      text: "Describe one feature of a medieval hospital.",
      model: "One feature of a medieval hospital is that they were run by the Church and staffed by monks and nuns who focused on 'care, not cure'."
    });
    kt12.narrative_blocks[4].tasks.push({
      type: "written",
      text: "Describe one feature of domestic care in the Middle Ages.",
      model: "Most sick people were cared for at home by female family members who used herbal remedies to treat them."
    });
  }

  // KT3.3 Block 4 (John Snow)
  let kt33 = unitData.lessons.find(l => l.title.includes('KT3.3'));
  if (kt33 && kt33.narrative_blocks[4]) {
    if (!kt33.narrative_blocks[4].tasks) kt33.narrative_blocks[4].tasks = [];
    kt33.narrative_blocks[4].tasks.push({
      type: "written",
      text: "Explain the action John Snow took to stop the cholera outbreak in Soho.",
      model: "John Snow proved cholera was waterborne and famously removed the handle from the Broad Street pump so people could no longer drink the contaminated water."
    });
  }

  // KT5.4 Block 4 (Underground Hospital)
  let kt54 = unitData.lessons.find(l => l.title.includes('KT5.4'));
  if (kt54 && kt54.narrative_blocks[4]) {
    if (!kt54.narrative_blocks[4].tasks) kt54.narrative_blocks[4].tasks = [];
    kt54.narrative_blocks[4].tasks.push({
      type: "written",
      text: "Describe one feature of the Underground Hospital at Arras.",
      model: "It was a massive subterranean hospital built into chalk quarries, capable of holding up to 700 beds and equipped with operating theatres and electricity."
    });
  }

  // Write back to file
  const newJson = JSON.stringify(unitData, null, 2);
  const newData = data.replace(match[1], newJson);
  fs.writeFileSync('edexcel_medicine/data.js', newData, 'utf8');
  console.log("Tasks successfully injected into data.js");
} else {
  console.log("Could not parse data.js");
}
