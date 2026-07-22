const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
let dataString = fs.readFileSync(dataPath, 'utf8');

// Convert to commonjs temporarily
let tempFile = dataString.replace('export const unitData = ', 'module.exports = ');
fs.writeFileSync(path.resolve(__dirname, 'temp_data22.js'), tempFile);
delete require.cache[require.resolve('./temp_data22.js')];
const unitData = require('./temp_data22.js');

const q3NotebookLM = {
  3: {
    q: "Explain one way in which knowledge of human anatomy in the Renaissance period (c1500–c1700) was different from knowledge of human anatomy in the medieval period (c1250–c1500). (4 marks)",
    a: "One key difference was that anatomical knowledge in the Renaissance was based on direct human dissection and empirical observation, whereas medieval anatomical knowledge was based on uncritically accepting classical texts. In the medieval period, human dissection was rare and heavily discouraged by the Church; instead, professors sat far away from the body reading aloud from Galen's ancient books to prove his writings were correct, which left Galen's error that the human lower jaw is made of two bones unchallenged. In contrast, during the Renaissance, Andreas Vesalius conducted his own human dissections and published De Humani Corporis Fabrica (1543). By directly examining the skeletal structure, Vesalius proved Galen wrong on over 200 points, demonstrating that the human lower jaw is actually a single bone."
  },
  4: {
    q: "Explain one way in which medical treatments in the Renaissance period (c1500–c1700) were similar to medical treatments in the medieval period (c1250–c1500). (4 marks)",
    a: "One key similarity was that medical treatments in both eras remained heavily reliant on humoural therapies designed to physically rebalance the body's fluids. In the medieval period, physicians believed that illness occurred when the Four Humours (blood, phlegm, yellow bile, and black bile) fell out of balance. They treated patients by prescribing bloodletting (phlebotomy via cutting a vein) and purging (using laxatives or emetics) to drain the excess humour. Similarly, in the Renaissance, despite major anatomical discoveries, physicians still lacked an alternative explanation for disease and continued to use the same classical treatments. This was clearly demonstrated in 1685, when royal doctors famously tried to save the life of King Charles II by performing extensive bleeding and purging."
  },
  5: {
    q: "Explain one way in which the response to the Great Plague in London (1665) was different from the response to the Black Death (1348). (4 marks)",
    a: "One key difference was that the response to the Great Plague in 1665 featured highly organized, state-enforced local government intervention, whereas the response to the Black Death in 1348 was highly localized and lacked centralized authority. During the Black Death, the local government had very little administrative power and could not fully enforce quarantine laws, meaning rich and poor people moved around quite freely, carrying the disease from town to town. In contrast, in 1665, local officials strictly enforced King Charles II’s royal decree. The Mayor of London hired watchmen to board up and guard infected households for a compulsory 28-day quarantine, employed searchers to identify plague corpses, and systematically slaughtered over 40,000 dogs and 200,000 cats to stop the spread of infection."
  },
  6: {
    q: "Explain one way in which ideas about the cause of illness in the period c1700–c1900 were different from ideas about the cause of illness in the period c1500–c1700. (4 marks)",
    a: "One key difference was that by the late nineteenth century, ideas about causation were based on bacteriology and scientific proof that germs caused disease, whereas Renaissance ideas still relied on the unproven theory of miasma. During the Renaissance, people believed that bad, foul-smelling air—known as miasma—directly disrupted the body's humours and made people sick, leading to treatments like burning tar on street corners. In contrast, the nineteenth century experienced a scientific revolution when Louis Pasteur published his Germ Theory in 1861, using swan-neck flask experiments to prove that microscopic organisms in the air caused decay. This allowed Robert Koch to isolate specific bacteria, such as the tuberculosis microbe in 1882, proving that specific germs cause specific human diseases."
  },
  7: {
    q: "Explain one way in which surgical treatments in the period c1700–c1900 were different from surgical treatments in the medieval period (c1250–c1500). (4 marks)",
    a: "One key difference was that late nineteenth-century surgery utilized effective chemical anesthetics and antiseptics to eliminate pain and infection, whereas medieval surgery was conducted on conscious patients with no concept of germ control. In the medieval period, surgeons could not perform internal operations; they relied on dangerous herbal mixtures like hemlock or opium that could easily kill patients, and used boiling oil or vinegar to clean wounds, which failed to stop the spread of sepsis. In contrast, late nineteenth-century surgery was highly clinical: surgeons put patients to sleep using James Simpson’s chloroform (1847) and used Joseph Lister's carbolic acid spray (1865) to sterilize wounds, hands, and surgical instruments, dropping the post-operative infection rate from 46% to 15%."
  },
  8: {
    q: "Explain one way in which the role of the government in preventing disease in the period c1700–c1900 was different from the period c1500–c1700. (4 marks)",
    a: "One key difference was that the nineteenth-century government passed compulsory national laws to enforce sanitation, whereas the Renaissance government relied on temporary, optional local municipal orders. In the Renaissance, the central government maintained a strict \"laissez-faire\" policy, collecting no national taxes for public health and leaving local mayors to issue temporary orders, such as closing theaters, only during active plague epidemics. In contrast, by the late nineteenth century, the government abandoned its laissez-faire attitude. Spurred by cholera epidemics and Germ Theory, Parliament passed the compulsory 1875 Public Health Act, which legally forced all local councils nationwide to provide clean water, build sewers, dispose of sewage, and employ sanitary inspectors."
  },
  9: {
    q: "Explain one way in which ideas about the cause of illness in the modern period (c1900–present) were different from ideas in the period c1700–c1900. (4 marks)",
    a: "One key difference was that modern ideas recognized that many non-communicable diseases are caused by internal, hereditary genetic mutations in DNA, whereas nineteenth-century ideas focused almost exclusively on external bacterial pathogens. In the nineteenth century, Germ Theory led doctors to believe that virtually all infectious diseases were caused by catching a microorganism from contaminated water or dirty air. In contrast, the modern period unlocked a genetic paradigm of medicine. Following the 1953 discovery of the double-helix structure of DNA by James Watson and Francis Crick and the completion of the Human Genome Project, modern doctors understood that humans inherit specific faulty genes, allowing them to pinpoint the genetic causes of hereditary illnesses like cystic fibrosis."
  },
  10: {
    q: "Explain one way in which the treatment of illness in the modern period (c1900–present) was different from the treatment of illness in the period c1700–c1900. (4 marks)",
    a: "One key difference was that modern treatments relied on targeted chemical \"magic bullets\" and antibiotics to destroy bacteria inside the body, whereas nineteenth-century treatments could not cure internal infections. In the nineteenth century, despite knowing germs caused disease, doctors had no way to kill bacteria inside patients, meaning they had to rely on traditional herbal remedies or unhelpful patent medicines. In contrast, the modern period experienced a chemical and pharmaceutical revolution. Scientists developed targeted chemical cures like Salvarsan 606 (1909) to kill specific microbes inside the body, and successfully developed penicillin in the 1940s (via Fleming, Florey, and Chain), creating the world's first mass-produced antibiotic to treat internal bacterial infections."
  },
  11: {
    q: "Explain one way in which ideas about the prevention of illness in the modern period (c1900–present) were different from the medieval period (c1250–c1500). (4 marks)",
    a: "One key difference was that modern disease prevention relied on compulsory, state-funded vaccination campaigns and digital lifestyle initiatives, whereas medieval prevention was based on individual dietary regimens and religious penance. In the medieval period, people prevented illness by trying to lead a life free of sin through prayer and pilgrimage, or by individually following the Regimen Sanitatis (a set of guidelines recommending moderate eating, drinking, and regular washing to keep humours balanced). In contrast, the modern state takes full responsibility for prevention on a national scale. The government funds and launches compulsory vaccination programs (such as the 1942 national immunisation campaign against diphtheria) and aggressive public health campaigns like Change4Life to encourage healthy eating and prevent chronic lifestyle illnesses."
  },
  12: {
    q: "Explain one way in which hospital care in the modern period (c1900–present) was different from hospital care in the period c1700–c1900. (4 marks)",
    a: "One key difference was that modern hospital care was run by the state under the NHS and focused on providing high-tech, clinical cures, whereas nineteenth-century hospitals were voluntary, charitable institutions that provided basic sanitary recovery. In the nineteenth century, hospitals were funded by subscriptions or local charity; although Florence Nightingale’s reforms made them cleaner, they lacked advanced diagnostic equipment, meaning the wealthy still preferred to be treated at home. In contrast, the creation of the National Health Service (NHS) in 1948 nationalized hospitals, making medical care entirely free at the point of delivery. Modern hospitals became advanced scientific centers, providing patients with access to free, high-tech treatments—such as organ transplants, chemotherapy, keyhole surgery, and robotic precision tools."
  }
};

function main() {
  for (let i = 3; i <= 12; i++) {
    if (unitData.lessons[i].gcse_task && unitData.lessons[i].gcse_task.tasks) {
      // Index 1 is the 4-mark Q3 task
      if (unitData.lessons[i].gcse_task.tasks.length > 1) {
        unitData.lessons[i].gcse_task.tasks[1].text = q3NotebookLM[i].q;
        unitData.lessons[i].gcse_task.tasks[1].model = q3NotebookLM[i].a;
      }
    }
  }

  const newString = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
  fs.writeFileSync(dataPath, newString);
  console.log('Successfully injected NotebookLM Q3 answers into Core Medicine!');
}

main();
