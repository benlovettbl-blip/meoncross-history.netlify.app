const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
let dataString = fs.readFileSync(dataPath, 'utf8');

// Convert to commonjs temporarily
let tempFile = dataString.replace('export const unitData = ', 'module.exports = ');
fs.writeFileSync(path.resolve(__dirname, 'temp_data20.js'), tempFile);
delete require.cache[require.resolve('./temp_data20.js')];
const unitData = require('./temp_data20.js');

const newGcseTasks = [
  { // 0
    q: "Explain why there was so little progress in understanding the causes of disease during the Middle Ages.",
    a: "One reason there was little progress was the dominance of the Catholic Church. The Church controlled all medical education and taught that illness was a punishment from God. Because questioning this was considered a sin, no one challenged Galen's ancient ideas."
  },
  { // 1
    q: "Explain why bleeding and purging were such common treatments in the Middle Ages.",
    a: "Bleeding and purging were common because physicians followed the Theory of the Four Humours. They believed that illness was caused by an imbalance of the humours (blood, phlegm, yellow bile, black bile). Therefore, removing excess blood or inducing vomiting was a logical attempt to restore balance."
  },
  { // 2
    q: "Explain why the Black Death spread so rapidly in 1348.",
    a: "The Black Death spread rapidly because people did not understand what caused it. They believed in miasma (bad air) or that it was a punishment from God, so they took ineffective measures like carrying sweet herbs or joining flagellant processions, rather than isolating themselves from the fleas and rats that actually carried the disease."
  },
  { // 3
    q: "Explain why the Renaissance was a period of rapid progress in anatomical knowledge.",
    a: "The Renaissance saw rapid progress because of the work of Andreas Vesalius. He performed his own dissections and published 'De Humani Corporis Fabrica' in 1543, which corrected over 200 of Galen's errors. The invention of the printing press allowed his accurate anatomical drawings to be mass-produced, transforming medical education."
  },
  { // 4
    q: "Explain why there was little change in medical treatments during the Renaissance, despite new anatomical discoveries.",
    a: "Although anatomy improved, medical treatments hardly changed because there was still no understanding of what actually caused disease. Without the Germ Theory, doctors continued to rely on traditional humoral treatments like bleeding and purging, and people continued to believe in miasma and astrology."
  },
  { // 5
    q: "Explain why the government's response to the Great Plague of 1665 was more effective than in 1348.",
    a: "The response was more effective because local governments took a more organized, administrative role. Mayors enforced a strict 28-day quarantine on infected households, painted red crosses on doors, and hired watchmen to stop people escaping, which helped limit person-to-person transmission."
  },
  { // 6
    q: "Explain why Louis Pasteur's Germ Theory was a major turning point in medicine.",
    a: "Pasteur's 1861 Germ Theory was a turning point because it permanently disproved spontaneous generation. By proving that microscopic germs in the air caused decay, he provided the scientific foundation for understanding that bacteria cause human disease, which eventually allowed scientists like Robert Koch to identify specific disease-causing microbes."
  },
  { // 7
    q: "Explain why Joseph Lister's development of carbolic acid was so significant.",
    a: "Lister's development of carbolic acid in 1865 was highly significant because it systematically solved the devastating problem of post-operative infection. By spraying the acid in operating theatres to kill bacteria, he dramatically reduced death rates from sepsis and gangrene, making complex surgeries much safer."
  },
  { // 8
    q: "Explain why there was rapid progress in public health during the second half of the 19th century.",
    a: "Public health improved rapidly because of John Snow's work during the 1854 cholera outbreak. By mapping deaths around the Broad Street pump, he proved cholera was a water-borne disease. This evidence, later supported by Germ Theory, forced the government to pass the 1875 Public Health Act, compelling councils to provide clean water."
  },
  { // 9
    q: "Explain why the discovery of DNA was a significant breakthrough in understanding the causes of illness.",
    a: "The discovery of the double-helix structure of DNA in 1953 by Watson and Crick was significant because it unlocked a completely new genetic understanding of medicine. It allowed scientists to look inside the human cell and identify the specific faulty genes responsible for hereditary diseases like cystic fibrosis."
  },
  { // 10
    q: "Explain why there was rapid progress in the development of penicillin.",
    a: "Progress was rapid primarily due to government intervention during the Second World War. After Florey and Chain proved penicillin worked, the US government provided massive funding to chemical companies to build deep-fermentation tanks, ensuring the antibiotic could be mass-produced in time for the D-Day landings."
  },
  { // 11
    q: "Explain why the government took a more active role in preventing disease after 1900.",
    a: "The government took a more active role following the Boer War, when they realized a large percentage of working-class recruits were unfit for military service. Fearing national weakness, the government abandoned its laissez-faire approach and launched massive national vaccination campaigns, such as the successful 1942 diphtheria campaign."
  },
  { // 12
    q: "Explain why the creation of the NHS in 1948 improved public health.",
    a: "The NHS improved public health because it removed the financial barrier to accessing medical treatment. For the first time, comprehensive medical care—from hospital surgeries to GP visits and vaccinations—was provided free at the point of use to all citizens, dramatically improving the health of the working class."
  }
];

function main() {
  for (let i = 0; i <= 12; i++) {
    // 1. Delete sources array
    if (unitData.lessons[i].sources) {
      delete unitData.lessons[i].sources;
    }
    
    // 2. Delete teacher_notes.source_context
    if (unitData.lessons[i].teacher_notes && unitData.lessons[i].teacher_notes.source_context) {
      delete unitData.lessons[i].teacher_notes.source_context;
    }
    
    // 3. Update gcse_task to "Explain why..." paragraph
    unitData.lessons[i].gcse_task = {
      title: "Edexcel 12-Mark Essay Practice (Section B)",
      tasks: [
        { 
          type: "written", 
          text: newGcseTasks[i].q, 
          model: newGcseTasks[i].a 
        }
      ]
    };
  }

  const newString = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
  fs.writeFileSync(dataPath, newString);
  console.log('Successfully realigned Core Medicine to Edexcel Section B format!');
}

main();
