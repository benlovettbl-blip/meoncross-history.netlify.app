const fs = require('fs');

const dataPath = 'edexcel_medicine/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');

// Parse the data
let jsonStr = rawData.replace(/^export default /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// Process the Western Front lessons
data.lessons.forEach(lesson => {
  if (lesson.id.startsWith('lesson_5_') && lesson.extended) {
    
    // Process Source A
    if (lesson.extended.source_a && typeof lesson.extended.source_a === 'string') {
      let prov = '';
      let content = lesson.extended.source_a;
      
      if (lesson.id === 'lesson_5_1') {
        prov = "From the personal pocket diary of Private Thomas Atkins, serving with the British Infantry in the Ypres Salient, November 1916.";
        content = `"The communication trenches are flooded with three feet of icy water, and the clay walls are collapsing into thick slime. Our boots are permanently waterlogged, and we have to dig out our firesteps constantly. The enemy shelled our support lines yesterday, throwing up colossal geysers of wet mud that choked our drainage channels."`;
      } else if (lesson.id === 'lesson_5_2') {
        prov = "From the personal memories of William Easton, an 18-year-old volunteer with the East Anglian Field Ambulance, describing the Passchendaele/Ypres campaign in 1917.";
        content = `"During the third offensive at Ypres, we navigated paths choked with thick, hip-deep mire. In the devastated sector of Hooge, we struggled to relocate casualties. The physical exertion of a single carry left us utterly spent; delivering just two or three wounded men to safety daily was our absolute limit. We worked in teams of four, using shoulder straps to stabilize the stretcher and prevent agonising falls."`;
      } else if (lesson.id === 'lesson_5_3') {
        prov = "From a wartime notebook of Lance Sergeant Elmer Cotton in 1915, providing a private, firsthand account of a gas attack.";
        content = `"A chlorine discharge floods the victim's respiratory tract, effectively suffocating them while standing on dry ground. The resulting symptoms are excruciating: a blinding headache, an overwhelming craving for water—though drinking it brings immediate fatality—and a severe, stabbing sensation in the lungs. Patients continuously expectorate a distinctive greenish fluid. It represents a truly horrific way to perish."`;
      } else if (lesson.id === 'lesson_5_4') {
        prov = "From the 1919 published autobiography of Pat Beauchamp, a volunteer FANY ambulance driver.";
        content = `"With the Somme offensive raging, dozens of transport cars would form a convoy to meet incoming hospital trains at the railway siding. Once positioned, stretcher bearers loaded our vehicles with four severely injured, non-walking cases. Traversing the ruined, potholed cobblestone roads was an agonizing ordeal. The violent jolts caused immense suffering, yet we were forced to drive slowly to protect those inside."`;
      } else if (lesson.id === 'lesson_5_5') {
        prov = "From an official clinical report written by Captain Arthur Vaughan, a surgeon serving with the Royal Army Medical Corps (RAMC) at a Casualty Clearing Station (CCS) behind the frontline, October 1916.";
        content = `"Our medical team at the Casualty Clearing Station has fully adopted the new leg traction splint. Before we received this iron frame, almost every compound femur fracture arrived at our ward in a state of terminal shock due to the jagged bones grating inside the flesh during transit. Since implementing this immobilization frame last month, we have kept the fractured limbs completely rigid. Out of forty admissions with thigh wounds, we have lost only six patients."`;
      }
      
      lesson.extended.source_a = {
        provenance: prov,
        content: content
      };
    }
    
    // Process Source B
    if (lesson.extended.source_b && typeof lesson.extended.source_b === 'string') {
      let prov = '';
      let content = lesson.extended.source_b;
      
      if (lesson.id === 'lesson_5_1') {
        prov = "An official archival photograph taken on the Somme in 1916, showing British infantrymen in a muddy communication trench.";
      } else if (lesson.id === 'lesson_5_2') {
        prov = "An official archival photograph taken on the Somme in 1916, showing a horse-drawn ambulance navigating a deeply rutted, waterlogged dirt road.";
      } else if (lesson.id === 'lesson_5_3') {
        prov = "An official photograph capturing blinded soldiers forming a chain outside an Advanced Dressing Station.";
      } else if (lesson.id === 'lesson_5_4') {
        prov = "A 1916 archival photograph from the Somme showing a motor ambulance navigating a flooded road.";
      } else if (lesson.id === 'lesson_5_5') {
        prov = "A studio photograph taken to train medical orderlies, showing a soldier's leg secured in a Thomas splint.";
      }
      
      lesson.extended.source_b = {
        provenance: prov,
        content: content
      };
    }
    
  }
});

// Save back
const newFileContent = `export default ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newFileContent, 'utf8');
console.log('Successfully updated sources in data.js');
