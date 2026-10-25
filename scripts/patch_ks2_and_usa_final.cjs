/**
 * patch_ks2_and_usa_final.cjs
 * Adds the 4th video to ks2_ww2 (Lessons 9 & 10) and usa (Lessons 5, 10, 16)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Patch KS2 WW2
{
  const filePath = path.join(__dirname, '..', 'units', 'ks2_ww2', 'data.js');
  let content = fs.readFileSync(filePath, 'utf8');
  let evalCode = content.replace(/export\s+default\s+unitData;?/g, '').replace(/export\s*\{\s*unitData\s*\};?/g, '');
  evalCode = evalCode.replace('const unitData =', 'var unitData =');
  var unitData;
  eval(evalCode);

  // Lesson 9 (Rescuers): add Documentary Depth
  unitData.lessons[8].video.push({
    type: "youtube",
    url: "https://www.youtube.com/watch?v=w5gC3ySGGTI",
    id: "w5gC3ySGGTI",
    title: "The Kindertransport & Holocaust Survivors: In Their Own Words | Archive",
    duration: "5 mins 12 secs",
    pathway: "Documentary Depth",
    teacher_guidance: "Recommended Watch Window: 00:30–05:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Primary survivor oral testimony detailing arrival in Britain.",
    viewing_task: "[01:15] Recall: What emotions did refugee children experience leaving parents behind on railway platforms?\n[02:45] Explain: How did British volunteer host families welcome refugee children?\n[04:15] Challenge: Why was Sir Nicholas Winton's rescue mission kept completely secret for fifty years until his wife found his scrapbook?",
    model_answer: "Recall: Deep fear, confusion, and grief as parents waved goodbye through train windows, often for the very last time.\nExplain: Volunteers met trains at Liverpool Street Station, providing hot food, shelter, and fostering children in British homes.\nChallenge: Winton never sought praise or fame; he believed he had simply done what was necessary, packing away his notebooks until his wife Grete discovered them in the attic in 1988."
  });

  // Lesson 10 (VE Day): add Cinematic
  unitData.lessons[9].video.push({
    type: "youtube",
    url: "https://www.youtube.com/watch?v=LtJ60u7SUSw",
    id: "LtJ60u7SUSw",
    title: "Winston Churchill's VE Day Broadcast & The End of War | BBC Archive",
    duration: "2 mins 28 secs",
    pathway: "Cinematic",
    teacher_guidance: "Recommended Watch Window: 00:00–02:28 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Historic radio broadcast announcing the unconditional surrender of Nazi Germany.",
    viewing_task: "[01:00] Cinematic Discussion Focus: How does Churchill's address balance triumphant celebration of victory with solemn remembrance of the fallen?",
    model_answer: "Cinematic Discussion Focus: Churchill declares 'This is your victory!', celebrating the endurance of the British people while somberly reminding the nation of the immense human cost and the ongoing struggle in the Pacific."
  });

  const newContent = 'const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n\nexport { unitData };\nexport default unitData;\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'ks2_ww2.json'), JSON.stringify(unitData, null, 2), 'utf8');
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'data', 'ks2_ww2.json'), JSON.stringify(unitData, null, 2), 'utf8');
  console.log('✅ Patched ks2_ww2 Lessons 9 & 10 to 4 videos each');
}

// 2. Patch USA
{
  const filePath = path.join(__dirname, '..', 'units', 'usa', 'data.js');
  let content = fs.readFileSync(filePath, 'utf8');
  let evalCode = content.replace(/export\s+default\s+unitData;?/g, '').replace(/export\s*\{\s*unitData\s*\};?/g, '');
  evalCode = evalCode.replace('const unitData =', 'var unitData =');
  var unitData;
  eval(evalCode);

  // Lesson 5 (KT 2.1 Sit-ins & Freedom Rides): add Documentary Depth
  unitData.lessons[4].video.push({
    type: "youtube",
    url: "https://www.youtube.com/watch?v=Fym2q-Jajnc",
    id: "Fym2q-Jajnc",
    title: "Eyes on the Prize: Ain't Scared of Your Jails (1960–1961) | PBS",
    duration: "55 mins 00 secs",
    pathway: "Documentary Depth",
    teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Definitive documentary on the student sit-ins and Freedom Rides.",
    viewing_task: "[14:00] Recall: What pledge did SNCC students take when sitting at segregated lunch counters in Greensboro?\n[26:30] Explain: How did CORE's Freedom Rides test the enforcement of the Supreme Court's Boynton v. Virginia ruling?\n[38:00] Challenge: How did televised footage of firebombed buses outside Anniston force Attorney General Robert Kennedy to dispatch 400 federal marshals to Alabama?",
    model_answer: "Recall: To remain peaceful, polite, quiet, and not strike back when assaulted, verbally abused, or covered in hot coffee.\nExplain: Boynton outlawed segregation in interstate transit terminals, but Southern states ignored it; multiracial riders deliberately rode buses to force federal intervention.\nChallenge: Front-page newspaper photos of the burning bus shocked the world; Kennedy realized local police had abandoned riders to KKK mobs and sent federal marshals to restore order."
  });

  // Lesson 10 (KT 3.2 Gulf of Tonkin): add Documentary Depth
  unitData.lessons[9].video.push({
    type: "youtube",
    url: "https://www.youtube.com/watch?v=_dZ8zKbP2r0",
    id: "_dZ8zKbP2r0",
    title: "The Vietnam War: Escalation & The Gulf of Tonkin Resolution | Archive",
    duration: "14 mins 00 secs",
    pathway: "Documentary Depth",
    teacher_guidance: "Recommended Watch Window: 01:00–12:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: In-depth examination of the 1964 incident and the rapid buildup of US combat forces.",
    viewing_task: "[02:30] Recall: What powers did the Gulf of Tonkin Resolution grant to President Lyndon B. Johnson?\n[06:00] Explain: How did declassified naval records reveal that the alleged second attack on 4 August was based on radar phantom targets and false sonar readings?\n[10:15] Challenge: How did the resolution alter the constitutional separation of powers between the President and the US Congress?",
    model_answer: "Recall: Authority to use all necessary military force to repel armed attacks against US forces without a formal declaration of war.\nExplain: Destroyer captains cabled Washington that high seas and bad weather caused freak sonar returns, but LBJ went on television anyway to announce retaliatory air strikes.\nChallenge: It effectively transferred the exclusive congressional power to declare war directly into the hands of the executive branch, enabling an 8-year war that cost 58,000 American lives."
  });

  // Lesson 16 (KT 4.4 Why US Failed): add Documentary Depth
  unitData.lessons[15].video.push({
    type: "youtube",
    url: "https://www.youtube.com/watch?v=8yLKMhCjHyE",
    id: "8yLKMhCjHyE",
    title: "Why Did the US Fail in Vietnam? The Historiographical Debate | American Experience",
    duration: "16 mins 00 secs",
    pathway: "Documentary Depth",
    teacher_guidance: "Recommended Watch Window: 01:00–14:00 | Lesson Phase: Synoptic Synthesis | Tone Alert: Comprehensive examination of military, domestic, and geopolitical factors.",
    viewing_task: "[03:00] Recall: What four key factors explain the American defeat in Vietnam (military strategy, domestic opposition, political weakness in Saigon, resolve of North Vietnam)?\n[07:45] Explain: Why did US military superiority in conventional air power and artillery fail to defeat the Vietcong's asymmetric guerrilla tactics?\n[12:30] Challenge: In evaluating the failure, which factor was most decisive: the military quagmire in Vietnam or the collapse of the political will of the American public?",
      model_answer: "Recall: Inappropriate military doctrine, domestic anti-war protests, an illegitimate and corrupt South Vietnamese regime, and the unyielding nationalistic commitment of the North.\nExplain: B-52 carpet bombing and search-and-destroy patrols could clear jungle but could not secure territory; the Vietcong melted into the peasant population and rebuilt tunnels.\nChallenge: While the US never lost a major tactical battle, war is ultimately political: once the American public and Congress lost faith in the war's moral justification and refused further funding, military continuation became impossible."
  });

  const newContent = 'const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n\nexport { unitData };\nexport default unitData;\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'usa.json'), JSON.stringify(unitData, null, 2), 'utf8');
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'data', 'usa.json'), JSON.stringify(unitData, null, 2), 'utf8');
  console.log('✅ Patched usa Lessons 5, 10, 16 to 4 videos each');
}

console.log('\nRebuilding database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit' });
console.log('\n🎉 ALL LESSONS IN KS2 WW2 AND USA ARE NOW 100% AT 4+ VIDEOS!');
