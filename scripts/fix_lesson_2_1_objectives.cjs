const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

const startIndex = fileContent.indexOf('{');
const endIndex = fileContent.lastIndexOf('}');
const unitData = eval('(' + fileContent.substring(startIndex, endIndex + 1) + ')');

const l = unitData.lessons.find((les) => les.id === 'lesson_2_1');
if (l) {
  l.teacher_notes.objectives = [
    {
      objective:
        'Explain how Gutenberg’s movable-type printing press dismantled the Church’s scribal monopoly over medical literature.',
      primer:
        'Direct students to paragraphs [1.1]–[1.2]. Emphasize that hand-copying in monastic scriptoria was slow, expensive, and subject to Church censorship, whereas movable metal type made anatomical texts mass-producible, cheaper, and identically accurate across Europe.',
      question:
        'Why did the Catholic Church find Gutenberg’s printing press such a profound threat to traditional Galenic medical authority?',
    },
    {
      objective:
        'Analyse how Renaissance humanism inspired scholars to bypass medieval mistranslations and re-examine original Greek medical texts.',
      primer:
        'Direct students to paragraphs [2.1]–[2.2]. Guide students to explain how humanist scholars sought original Greek manuscripts of Galen and Hippocrates, discovering that medieval Arab-Latin translations had introduced centuries of copyist errors and Church dogmatism.',
      question:
        'How did Renaissance humanist scholars use the rediscovery of original Greek manuscripts to challenge medieval Church dogma?',
    },
    {
      objective:
        'Evaluate how Charles II’s 1662 Royal Charter and the motto "Nullius in Verba" established empirical experimentation over classical authority.',
      primer:
        'Direct students to paragraphs [3.1]–[3.2]. Focus on the Royal Society meeting at Gresham College, royal patronage under Charles II, and the defining motto "Nullius in Verba" (Take nobody’s word for it).',
      question:
        'How did the motto "Nullius in Verba" directly challenge the 1,400-year dominance of Galen’s anatomical writings?',
    },
    {
      objective:
        'Assess how Henry Oldenburg’s Philosophical Transactions established the world’s first international peer-reviewed scientific network.',
      primer:
        'Direct students to paragraphs [4.1]–[4.2] and Source B. Detail the 1665 launch of Philosophical Transactions, where experiments had to be witnessed, replicated, and peer-reviewed before publication, replacing secret alchemical formulas with open scientific debate.',
      question:
        'Why was international peer review essential for establishing the credibility of new empirical discoveries over ancient classical authority?',
    },
    {
      objective:
        'Analyze the Renaissance Paradox: why revolutionary microscopes and animalcules failed to transform ordinary medical treatments.',
      primer:
        'Direct students to paragraphs [5.1]–[5.2] and Source C. Contrast Robert Hooke’s Micrographia and Leeuwenhoek’s discovery of "animalcules" with the persistent reliance on bloodletting, purging, and miasma, proving that scientific observation outpaced clinical therapy.',
      question:
        'Why did Antonie van Leeuwenhoek’s discovery of microscopic bacteria fail to save a single human life in the seventeenth century?',
    },
  ];

  const newFileContent = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
  fs.writeFileSync(dataFilePath, newFileContent, 'utf8');
  console.log('Successfully updated lesson_2_1 teacher_notes.objectives to 5 items.');
}
