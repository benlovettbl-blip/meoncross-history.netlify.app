const fs = require('fs');
const path = require('path');

const dataFile = path.resolve('units/edexcel_medicine/data.js');
let content = fs.readFileSync(dataFile, 'utf8');

// Replacements mapped by question text prefix
const updates = [
  {
    qPrefix:
      'Explain one way in which ideas about the cause of disease in the Medieval period (c1250–c1500) were similar',
    newModel:
      'One way ideas about the causes of disease were similar in both periods was the continuing belief in **miasma** (bad air). In the Medieval period, during the 1348 Black Death, people believed that poisonous fumes from rotting filth and swamps entered the body and caused disease. Similarly, during the Renaissance, people still blamed bad air for epidemics like the 1665 Great Plague, carrying sweet-smelling posies and pomanders to keep bad smells away. Therefore, both periods believed that breathing in foul air directly caused illness because they still had no understanding of germs.',
  },
  {
    qPrefix: 'Explain one way in which diagnosis of disease in the Medieval period was similar',
    newModel:
      "One way diagnosis of disease was similar was the continuing reliance on **checking urine and the Four Humours**. In the Medieval period, doctors examined a patient's urine against a colour chart to identify which humour was unbalanced, alongside checking astrology charts. Similarly, during the Renaissance, most ordinary doctors continued to examine urine samples and check humoural balance at the bedside to diagnose illness. Therefore, both periods relied on Galen's ancient humoural ideas to diagnose patients rather than scientific tests.",
  },
  {
    qPrefix:
      'Explain one way in which treatments for disease in the Medieval period were different from treatments in the Modern period',
    newModel:
      "One way treatments were different was that medieval treatments focused on **balancing humours**, whereas modern medicine uses **specific drugs to destroy germs**. In the Medieval period, doctors used bloodletting with leeches and purging with laxatives to remove excess humours from the body. In contrast, modern doctors prescribe targeted treatments like antibiotics (such as penicillin) to destroy bacteria without harming the body. Therefore, medieval treatments tried to balance the body's humours, while modern treatments scientifically attack the actual cause of the disease.",
  },
  {
    qPrefix:
      'Explain one way in which approaches to preventing epidemic disease in the Medieval period (1348 Black Death) were similar',
    newModel:
      'One way approaches to preventing epidemics were similar was the use of **quarantine and fleeing from infected areas**. In 1348, during the Black Death, towns like Gloucester tried to shut their gates to outsiders, while the wealthy fled to the countryside. Similarly, during the 1665 Great Plague, the Mayor of London quarantined infected families in their homes for 28 days behind locked doors, while the King and wealthy citizens also fled London. Therefore, both periods attempted to stop the spread by keeping healthy people away from infected areas.',
  },
  {
    qPrefix:
      'Explain one way in which ideas about the cause of disease in the Renaissance period (c1500–c1700) were similar',
    newModel:
      'One way ideas about the causes of disease were similar in both periods was the continuing belief in **miasma** (bad air). In the Renaissance, people still blamed bad air for epidemics like the 1665 Great Plague, carrying sweet-smelling posies and pomanders to ward off disease. Similarly, during the Medieval period, people in 1348 believed foul vapors from rotting waste caused the Black Death. Therefore, both periods believed that breathing in foul air directly caused illness because neither period had any understanding of microscopic germs.',
  },
  {
    qPrefix:
      "Explain one way in which Thomas Sydenham's approach to diagnosis was different from medieval physicians",
    newModel:
      "One way Sydenham’s approach to diagnosis was different was that he focused on **carefully observing the patient's symptoms at their bedside**, rather than relying on ancient books or urine charts. In the Medieval period, doctors rarely examined patients closely, instead checking urine flasks and astrology charts to diagnose a humoural imbalance. In contrast, Thomas Sydenham sat by the patient’s bed, recorded their symptoms over time, and showed that different diseases had specific symptom patterns (such as recognizing scarlet fever was different from measles). Therefore, Sydenham diagnosed diseases through direct bedside observation rather than ancient medical theories.",
  },
  {
    qPrefix:
      'Explain one way in which methods of investigating the human body in the Renaissance were different from methods in the Medieval period',
    newModel:
      "One way methods of investigating the human body were different was that Renaissance anatomists **carried out dissections themselves** rather than just reading from old books. In the Medieval period, university professors sat on a raised chair reading aloud from Galen, while an assistant or barber-surgeon cut open the body without questioning Galen's errors. In contrast, during the Renaissance, Andreas Vesalius did the dissections with his own hands, inspecting human bones and organs directly to see how the body really worked. Therefore, Renaissance doctors learned anatomy through direct personal dissection rather than uncritically accepting ancient texts.",
  },
  {
    qPrefix:
      "Explain one way in which William Harvey's understanding of the circulatory system was different from Galen's theories",
    newModel:
      'One way Harvey’s understanding was different was that he proved **blood circulates in a continuous one-way loop around the body**, rather than being burned up as fuel. Galen had taught that the liver constantly made new blood from food, which the body then absorbed and burned like wood in a fire. In contrast, William Harvey proved that the heart acts like a pump, circulating the same blood continuously around the body through arteries and back through veins. Therefore, Harvey proved blood flows in a repeated cycle, disproving Galen’s idea that blood was constantly used up.',
  },
  {
    qPrefix:
      'Explain one way in which approaches to preventing the Great Plague in 1665 were different from approaches to the Black Death in 1348',
    newModel:
      'One way approaches to prevention were different was that local government took much more organized, official action in 1665 than in 1348. In 1348, during the Black Death, the King and local councils took almost no coordinated action to prevent the spread, so ordinary people were left to rely on individual actions like praying, carrying sweet-smelling herbs, or running away. In contrast, in 1665 during the Great Plague, the Mayor of London enforced strict public health rules: infected houses were shut up for 28 days with a red cross painted on the door, watchmen guarded them day and night, and large public gatherings were banned. Therefore, prevention in 1665 was officially enforced by local authorities, whereas in 1348 it was largely unorganized and left to individuals.',
  },
];

let replaced = 0;
for (const update of updates) {
  // Regex to find: text: '...qPrefix...'[\s\S]*?model:\s*(['"`])([\s\S]*?)\1
  // We want to replace the model content with update.newModel
  const escapedPrefix = update.qPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const reg = new RegExp(
    `(text:\\s*['"][^'"]*${escapedPrefix}[^'"]*['"],\\s*model:\\s*)(['"\`])([\\s\\S]*?)\\2`,
    'g',
  );

  if (reg.test(content)) {
    content = content.replace(reg, (match, p1, p2, p3) => {
      // Escape single quotes in newModel
      const safeModel = update.newModel.replace(/'/g, "\\'");
      return `${p1}'${safeModel}'`;
    });
    console.log(`✅ Updated: "${update.qPrefix.substring(0, 45)}..."`);
    replaced++;
  } else {
    console.warn(`⚠️ Could not match question: "${update.qPrefix}"`);
  }
}

console.log(`\nSuccessfully updated ${replaced} / ${updates.length} model answers.`);

// Write back to units/edexcel_medicine/data.js
fs.writeFileSync(dataFile, content, 'utf8');

// Copy to public/units/edexcel_medicine/data.js
const publicDataFile = path.resolve('public/units/edexcel_medicine/data.js');
fs.writeFileSync(publicDataFile, content, 'utf8');
console.log(`✅ Synchronized units/ and public/units/ data.js files.`);
