const fs = require('fs');

const dataPath = 'edexcel_medicine/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');

let jsonStr = rawData.replace(/^export default /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

if (!data.key_individuals) {
  data.key_individuals = [];
}

const newIndividuals = [
  {
    name: "Sir Robert Jones",
    role: "Orthopaedic Surgeon",
    bio: "A pioneering British orthopaedic surgeon and nephew of Hugh Owen Thomas. During WWI, he recognised the life-saving potential of his uncle's invention and drove the mass deployment of the Thomas Splint to the Western Front in late 1915. His insistence that frontline stretcher-bearers be trained to apply the splint before moving patients successfully reduced the mortality rate of compound femur fractures from 80% to 20%.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Sir_Robert_Jones._Photograph_by_H._S._Mendelssohn._Wellcome_V0026618.jpg/500px-Sir_Robert_Jones._Photograph_by_H._S._Mendelssohn._Wellcome_V0026618.jpg"
  },
  {
    name: "Dr. Harvey Cushing",
    role: "American Neurosurgeon",
    bio: "An innovative American neurosurgeon who served with the British Expeditionary Force and later the American forces on the Western Front. He pioneered new techniques for brain surgery under battlefield conditions, notably experimenting with using large magnets to extract deep-seated steel shrapnel fragments from the brains of wounded soldiers, and meticulous documentation of head wounds.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Harvey_Williams_Cushing.jpg/500px-Harvey_Williams_Cushing.jpg"
  },
  {
    name: "Pat Beauchamp",
    role: "FANY Ambulance Driver",
    bio: "A prominent volunteer in the First Aid Nursing Yeomanry (FANY). She served as an ambulance driver on the Western Front, proving the crucial value of motorized transport in rapid casualty evacuation. Despite losing her leg in a severe accident in France, she continued to serve and later wrote the memoir 'Fanny Goes to War', highlighting the physical dangers and vital contributions of female volunteers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pat_Beauchamp_Washington.png/500px-Pat_Beauchamp_Washington.png"
  }
];

newIndividuals.forEach(ind => {
  if (!data.key_individuals.find(k => k.name === ind.name)) {
    data.key_individuals.push(ind);
  }
});

const newFileContent = `export default ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(dataPath, newFileContent, 'utf8');

console.log('Successfully injected Key Individuals into data.js');
