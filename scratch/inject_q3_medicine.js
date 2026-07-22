const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
let dataString = fs.readFileSync(dataPath, 'utf8');

// Convert to commonjs temporarily
let tempFile = dataString.replace('export const unitData = ', 'module.exports = ');
fs.writeFileSync(path.resolve(__dirname, 'temp_data21.js'), tempFile);
delete require.cache[require.resolve('./temp_data21.js')];
const unitData = require('./temp_data21.js');

const q3Tasks = {
  3: {
    q: "Explain one way in which anatomical knowledge in the Renaissance was different from the Middle Ages. (4 marks)",
    a: "One major difference was the reliance on human dissection. In the Middle Ages, physicians strictly followed Galen's ancient texts without questioning them, whereas in the Renaissance, pioneers like Vesalius performed their own dissections, proving Galen had made over 200 anatomical errors."
  },
  4: {
    q: "Explain one way in which medical treatments in the Renaissance were similar to the Middle Ages. (4 marks)",
    a: "One similarity was the continued use of humoral treatments. Despite new anatomical discoveries, Renaissance doctors still did not understand the true cause of disease, so they continued to use medieval treatments like bloodletting and purging to balance the Four Humours."
  },
  5: {
    q: "Explain one way in which the response to the Great Plague (1665) was different from the Black Death (1348). (4 marks)",
    a: "One difference was the increased level of government organization. During the Black Death, local responses were chaotic and relied on religious processions, whereas during the Great Plague, mayors enforced strict 28-day quarantines on infected houses and hired watchmen to prevent escape."
  },
  6: {
    q: "Explain one way in which understanding of the causes of disease in the 19th century was different from the Renaissance. (4 marks)",
    a: "One difference was the rejection of miasma in favour of biological pathogens. In the Renaissance, people still believed bad air caused illness, but in 1861, Louis Pasteur published the Germ Theory, proving scientifically that microscopic bacteria were the true cause of decay and disease."
  },
  7: {
    q: "Explain one way in which surgery in the late 19th century was different from the Middle Ages. (4 marks)",
    a: "One major difference was the ability to prevent infection. Medieval surgeons had no concept of germs and often used dirty instruments, leading to fatal sepsis, whereas in the late 19th century, Joseph Lister introduced carbolic acid to sterilize the operating theatre, drastically reducing post-operative mortality."
  },
  8: {
    q: "Explain one way in which government action on public health in the 19th century was different from the Renaissance. (4 marks)",
    a: "One difference was the shift away from a 'laissez-faire' attitude. In the Renaissance, the government took little responsibility for public health outside of plague epidemics, whereas in the 19th century, the government passed the 1875 Public Health Act, forcing local councils to provide clean water and sewers."
  },
  9: {
    q: "Explain one way in which the understanding of genetics in the Modern era was different from the 19th century. (4 marks)",
    a: "One difference was the ability to identify hereditary causes of disease. In the 19th century, scientists like Koch could only identify external bacterial pathogens, whereas in the Modern era, the discovery of DNA in 1953 allowed scientists to look inside the human cell and identify faulty genes."
  },
  10: {
    q: "Explain one way in which the development of new treatments in the 20th century was different from the 19th century. (4 marks)",
    a: "One difference was the scale of government funding. In the 19th century, individuals like Lister worked mostly independently, whereas in the 20th century, the US government provided massive financial backing to chemical companies to mass-produce penicillin for the war effort."
  },
  11: {
    q: "Explain one way in which the prevention of disease in the Modern era was different from the Middle Ages. (4 marks)",
    a: "One difference was the use of scientific vaccination campaigns. In the Middle Ages, prevention relied on supernatural methods like prayer or carrying sweet herbs, whereas in the Modern era, the government launched massive national vaccination campaigns, such as the 1942 diphtheria campaign, to eradicate disease."
  },
  12: {
    q: "Explain one way in which hospital care in the Modern era was different from the 19th century. (4 marks)",
    a: "One major difference was universal free access. In the 19th century, hospital care was mostly provided by charities and poor people often could not afford complex treatments, whereas in 1948, the government launched the NHS, providing comprehensive medical care free at the point of use for everyone."
  }
};

function main() {
  for (let i = 3; i <= 12; i++) {
    if (unitData.lessons[i].gcse_task && unitData.lessons[i].gcse_task.tasks) {
      // Append the 4-mark Q3 task
      unitData.lessons[i].gcse_task.tasks.push({
        type: "written",
        text: q3Tasks[i].q,
        model: q3Tasks[i].a
      });
      // Update the title to reflect both tasks
      unitData.lessons[i].gcse_task.title = "Edexcel Exam Practice: Section B (Q3 & Q4)";
    }
  }

  const newString = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
  fs.writeFileSync(dataPath, newString);
  console.log('Successfully injected 4-mark Q3 comparisons into Core Medicine!');
}

main();
