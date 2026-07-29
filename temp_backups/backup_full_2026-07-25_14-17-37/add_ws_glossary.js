const fs = require('fs');

const wsTerms = [
  { term: "Cholera", definition: "A deadly waterborne disease that causes severe diarrhea and dehydration, often fatal in the 19th century." },
  { term: "Miasma Theory", definition: "The incorrect belief that diseases like cholera were spread by 'bad air' or foul smells." },
  { term: "Laissez-Faire", definition: "A government policy of non-interference, believing that public health was not the state's responsibility." },
  { term: "Cesspit", definition: "A pit for the disposal of liquid waste and sewage, common before modern sewer systems." },
  { term: "Back-to-back housing", definition: "Overcrowded, poor-quality housing built closely together with no proper ventilation or sanitation." },
  { term: "Public Health Act 1848", definition: "A law creating a Central Board of Health, though largely voluntary and ineffective in many areas." },
  { term: "Public Health Act 1875", definition: "A compulsory law forcing local councils to provide clean water and proper drainage." },
  { term: "Broad Street Pump", definition: "The water source in Soho, London, that John Snow identified as the cause of a local cholera outbreak in 1854." },
  { term: "The Great Stink", definition: "An event in 1858 when the hot weather exacerbated the smell of untreated sewage in the River Thames." },
  { term: "Sewage System", definition: "An infrastructure of underground pipes designed by Joseph Bazalgette to carry waste away from London." },
  { term: "Edwin Chadwick", definition: "A social reformer who wrote the 1842 report on the sanitary conditions of the labouring population." },
  { term: "John Snow", definition: "A physician who proved that cholera was a waterborne disease by removing the handle of the Broad Street pump." },
  { term: "Joseph Bazalgette", definition: "The civil engineer responsible for designing and building London's modern sewer network." },
  { term: "Industrial Revolution", definition: "A period of rapid urbanization and industrial growth that led to overcrowded and unsanitary living conditions." }
];

const terminologyData = [];
let glossaryIdx = 0;
// Assuming 5 lessons in water_and_sanitation
for (let idx = 0; idx < 5; idx++) {
  let terms = [];
  for (let i = 0; i < 2; i++) {
    terms.push(wsTerms[glossaryIdx % wsTerms.length]);
    glossaryIdx++;
  }
  terminologyData.push({
    id: 'lesson' + (idx + 1),
    terms: terms
  });
}

const output = `export const terminologyData = ${JSON.stringify(terminologyData, null, 2)};`;
fs.writeFileSync('./water_and_sanitation/terminology_data.js', output, 'utf8');
console.log('Generated terminology_data.js for water_and_sanitation');

// Also update water_and_sanitation.json with the glossary
const wsJsonPath = './public/data/water_and_sanitation.json';
const wsData = JSON.parse(fs.readFileSync(wsJsonPath, 'utf8'));
wsData.data.glossary = wsTerms.map(t => ({ word: t.term, definition: t.definition }));
fs.writeFileSync(wsJsonPath, JSON.stringify(wsData, null, 2), 'utf8');
