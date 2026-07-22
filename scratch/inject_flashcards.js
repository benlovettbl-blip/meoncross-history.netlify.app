const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// I will parse the module.exports, modify it, and write it back.
// Since data.js has complex structures, I'll use regex to inject the flashcards array right before "guided_reading": [] or "do_now": {
const flashcards = {
  "lesson_5_1": [
    { term: "Salient", definition: "A piece of land that juts out into enemy territory, making it vulnerable to attack from three sides (e.g., the Ypres Salient)." },
    { term: "Trench System", definition: "A network of defensive dugouts consisting of the front line, support trench, reserve trench, and communication trenches linking them." },
    { term: "Battle of the Somme (1916)", definition: "A disastrous British offensive resulting in 57,000 casualties on the first day. It introduced the first use of tanks and the creeping barrage." },
    { term: "Battle of Arras (1917)", definition: "An Allied offensive famous for the extensive chalk tunnel network built underneath the city, which included an underground hospital." },
    { term: "Battle of Cambrai (1917)", definition: "A battle famous for the first large-scale use of tanks and the site of the first ever blood bank, established by Oswald Robertson." }
  ],
  "lesson_5_2": [
    { term: "Trench Foot", definition: "A painful condition caused by standing in cold, waterlogged mud. If untreated, it caused gangrene and required amputation." },
    { term: "Whale Oil", definition: "Soldiers rubbed this on their feet to prevent Trench Foot. They were also ordered to change their socks twice a day." },
    { term: "Trench Fever", definition: "A flu-like illness characterized by high fever, severe headaches, and shivering, caused by lice living in the seams of uniforms." },
    { term: "Shell Shock", definition: "A psychological condition caused by the trauma of war, resulting in tiredness, headaches, nightmares, and uncontrollable shaking (PTSD)." },
    { term: "Dysentery", definition: "A stomach infection causing severe diarrhea and dehydration, spread by drinking contaminated water from shell holes." }
  ],
  "lesson_5_3": [
    { term: "Shrapnel", definition: "Metal fragments from exploded artillery shells. It caused the majority of wounds and carried infected mud deep into the body." },
    { term: "Gas Gangrene", definition: "A deadly infection caused by bacteria in the heavily fertilized Flanders soil entering wounds, causing tissue to rot and produce gas." },
    { term: "Chlorine Gas", definition: "First used at Ypres in 1915. It destroyed the respiratory system, causing victims to suffocate." },
    { term: "Phosgene Gas", definition: "Similar to chlorine but faster acting. It was invisible and had a sweet smell, making it incredibly deadly." },
    { term: "Mustard Gas", definition: "An odorless gas introduced in 1917 that worked slowly, causing severe internal and external blisters and blindness." },
    { term: "Brodie Helmet", definition: "A steel helmet with a strap, introduced in 1915, which significantly reduced fatal head injuries from shrapnel." }
  ],
  "lesson_5_4": [
    { term: "Chain of Evacuation", definition: "The system of moving wounded soldiers away from the frontline: RAP -> Dressing Stations -> CCS -> Base Hospital." },
    { term: "RAMC", definition: "Royal Army Medical Corps. The official military medical branch responsible for treating and transporting the wounded." },
    { term: "FANY", definition: "First Aid Nursing Yeomanry. A volunteer corps of women who drove motorized ambulances and provided first aid." },
    { term: "RAP (Regimental Aid Post)", definition: "Located within 200m of the frontline. Provided immediate first aid to get men back to fighting or ready for transport." },
    { term: "CCS (Casualty Clearing Station)", definition: "Large surgical hubs located miles from the front. They performed life-saving surgery (like amputations) to stop gangrene before transport." },
    { term: "Base Hospitals", definition: "Located near the French coast. Initially intended for surgery, but became specialized convalescence centers for long-term recovery." }
  ],
  "lesson_5_5": [
    { term: "Thomas Splint", definition: "A metal frame designed to keep a fractured leg completely still. Its introduction in 1916 reduced the death rate from femur fractures from 80% to 20%." },
    { term: "Mobile X-Ray Units", definition: "Horse-drawn or motorized vans equipped with X-ray machines, allowing surgeons near the frontline to locate shrapnel before infection set in." },
    { term: "Carrel-Dakin Method", definition: "A system of continuously flushing infected wounds with a sterilized salt solution to fight gangrene, as traditional aseptic surgery was impossible." },
    { term: "Sodium Citrate", definition: "A chemical added to blood during transfusions to stop it from clotting, removing the need for direct donor-to-patient transfer." },
    { term: "Citrate Glucose", definition: "A solution discovered in 1917 that allowed blood to be stored on ice for up to 4 weeks, enabling the creation of blood banks." }
  ]
};

Object.keys(flashcards).forEach(lessonId => {
  const lessonRegex = new RegExp(`("id":\\s*"${lessonId}"[\\s\\S]*?)("guided_reading"|"do_now"|"narrative_blocks")`);
  
  const flashcardJson = `"flashcards": ${JSON.stringify(flashcards[lessonId], null, 8)},\n      `;
  
  dataContent = dataContent.replace(lessonRegex, `$1${flashcardJson}$2`);
});

fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log("Successfully injected Western Front flashcards into edexcel_medicine/data.js");
