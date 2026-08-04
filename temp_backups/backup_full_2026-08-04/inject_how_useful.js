const fs = require('fs');

const dataPath = 'edexcel_medicine/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');

// The file format is: export default { ... };
let jsonStr = rawData.replace(/^export default /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// The sources provided by the user
const sources = [
  {
    keyword: "impact of the terrain",
    source_a: "During the third offensive at Ypres, we navigated paths choked with thick, hip-deep mire. In the devastated sector of Hooge, we struggled to relocate casualties. The physical exertion of a single carry left us utterly spent; delivering just two or three wounded men to safety daily was our absolute limit. We worked in teams of four, using shoulder straps to stabilize the stretcher and prevent agonising falls.",
    source_b: "<div style=\"padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;\"><p style=\"font-style: italic; color: #555; margin-bottom: 0;\">[Archival Photograph: A black-and-white archival photograph showing a heavy, wood-and-canvas horse-drawn ambulance wagon struggling to navigate a deeply rutted, waterlogged dirt road on the Western Front. The wagon, marked with a prominent Red Cross on its side canvas, is being pulled through thick, churned mud by a team of horses. British soldiers in flat trench caps and heavy service dress stand in the muddy sludge nearby, holding the reins or bracing the wagon. The background is a stark, flat, and devastated landscape of flooded shell craters, muddy mounds, and a gray, overcast sky.]</p></div>",
    provenance_clue: "Think about who wrote or produced this source. For Source A, it's an East Anglian Field Ambulance worker at Ypres. Does this personal, on-the-ground experience make it more reliable for understanding the physical toll? For Source B, it's an official photograph from the Somme. Was it meant to document reality, or perhaps carefully framed for morale?"
  },
  {
    keyword: "effects of poison gas attacks",
    source_a: "A chlorine discharge floods the victim's respiratory tract, effectively suffocating them while standing on dry ground. The resulting symptoms are excruciating: a blinding headache, an overwhelming craving for water—though drinking it brings immediate fatality—and a severe, stabbing sensation in the lungs. Patients continuously expectorate a distinctive greenish fluid. It represents a truly horrific way to perish.",
    source_b: "<div style=\"padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;\"><p style=\"font-style: italic; color: #555; margin-bottom: 0;\">[Archival Photograph: A poignant, high-contrast historical black-and-white photograph capturing a line of ten to twelve British soldiers in khaki uniforms sitting or standing on a wooden bench outside a dressing station. Their eyes are covered with thick, white protective bandages. Each blinded soldier places his hand on the shoulder of the man directly in front of him, forming a human chain to guide one another. They are being assisted by a sighted medical orderly or officer. In the background, the large canvas tents of an Advanced Dressing Station are pitched on a muddy, desolate battlefield.]</p></div>",
    provenance_clue: "For Source A, consider that it is from a wartime notebook of Lance Sergeant Elmer Cotton in 1915. This is a private, unedited firsthand account. How does this affect its usefulness? For Source B, an official photograph showing blinded soldiers forming a chain. Photographs capture reality but can also be staged. Does the clear visual evidence of the gas's impact make it highly useful regardless?"
  },
  {
    keyword: "problems of transporting",
    source_a: "With the Somme offensive raging, dozens of transport cars would form a convoy to meet incoming hospital trains at the railway siding. Once positioned, stretcher bearers loaded our vehicles with four severely injured, non-walking cases. Traversing the ruined, potholed cobblestone roads was an agonizing ordeal. The violent jolts caused immense suffering, yet we were forced to drive slowly to protect those inside.",
    source_b: "<div style=\"padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;\"><p style=\"font-style: italic; color: #555; margin-bottom: 0;\">[Archival Photograph: A detailed black-and-white historical photograph showing a motor ambulance or wooden transport wagon navigating a severely deteriorated, flooded road in the Somme region during the winter of 1916. The road is a wide, chaotic expanse of thick mud and deep waterlogged ruts. In the background, the skeletal, shattered brick walls of a destroyed village and splintered, leafless tree trunks stand in a desolate, shell-torn landscape. Soldiers in heavy trench coats and steel Brodie helmets are visible on the periphery, navigating the ruins.]</p></div>",
    provenance_clue: "Source A is from the 1919 published autobiography of a FANY ambulance driver. It's a memoir published right after the war. How might writing for a public audience affect her description of the difficulties? Source B is a 1916 photograph from the Somme. Official photographs were subject to censorship. Does its depiction of flooded roads match your own knowledge of the Somme battlefield?"
  }
];

let updateCount = 0;

function walk(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(walk);
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.extended && obj.extended.question && obj.extended.question.includes("How useful")) {
      const q = obj.extended.question;
      const match = sources.find(s => q.includes(s.keyword));
      if (match) {
        obj.extended.source_a = match.source_a;
        obj.extended.source_b = match.source_b;
        obj.extended.provenance_clue = match.provenance_clue;
        updateCount++;
      }
    }
    Object.values(obj).forEach(walk);
  }
}

walk(data);

const newFileContent = `export default ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newFileContent, 'utf8');

console.log(`Updated ${updateCount} 'How useful' questions with sources and provenance clues.`);
