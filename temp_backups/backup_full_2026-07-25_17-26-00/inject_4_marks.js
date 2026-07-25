const fs = require('fs');

const replacements = [
  {
    oldQuestionPart: "knowledge of human anatomy in the Renaissance period",
    newQuestion: "Explain one way in which knowledge of human anatomy in the Renaissance period (c1500–c1700) was different from knowledge of human anatomy in the medieval period (c1250–c1500). (4 marks)",
    newModel: "One key difference was that anatomical knowledge in the Renaissance was based on first-hand human dissection and empirical proof, whereas medieval anatomical knowledge relied on the uncritical copying of classical textbooks.<br><br>In the medieval period, the Catholic Church controlled medical training and prohibited dissection, forcing students to memorize Latin translations of Galen's texts—meaning his major errors, such as the claim that the human lower jaw is made of two separate bones, went completely unchallenged.<br><br>In contrast, during the Renaissance, the decline of Church authority allowed physicians to dissect human bodies themselves to test classical claims.<br><br>This enabled Andreas Vesalius to perform direct human dissections and publish De Humani Corporis Fabrica (1543), proving Galen wrong on over 200 anatomical points and illustrating that the human lower jaw is actually a single, solid bone."
  },
  {
    oldQuestionPart: "medical treatments in the Renaissance period",
    newQuestion: "Explain one way in which the treatment of disease in the Renaissance period (c1500–c1700) was similar to the treatment of disease in the medieval period (c1250–c1500). (4 marks)",
    newModel: "One key similarity was that medical treatments in both periods were heavily reliant on physical humoural therapies designed to rebalance the body's internal fluids.<br><br>In the medieval period, physicians believed that illness was caused by an excess or deficiency of the Four Humours (blood, phlegm, yellow bile, and black bile).<br><br>They treated patients using bloodletting (venesection or applying leeches) and purging (emetics) to drain away the supposed excess humour.<br><br>Similarly, in the Renaissance, despite major anatomical discoveries, physicians still lacked an alternative explanation for the cause of disease and continued to use the same classical treatments.<br><br>This was clearly demonstrated in 1685 when royal doctors attempted to save the life of the critically ill King Charles II by performing extensive bleeding and purging."
  },
  {
    oldQuestionPart: "response to the Great Plague in London",
    newQuestion: "Explain one way in which reactions to the Great Plague in London (1665) were different from reactions to the Black Death in Britain (1348). (4 marks)",
    newModel: "One key difference was that reactions to the Great Plague of 1665 featured highly organized, state-enforced administrative preventative actions, whereas reactions to the Black Death of 1348 were highly localized and lacked centralized coordination.<br><br>During the Black Death, the local authorities had very little power to restrict movement or enforce sanitation, leaving citizens to respond individually by fleeing or organizing crowded religious processions to pray for God’s forgiveness, which actually accelerated the spread of the disease.<br><br>In contrast, during the Great Plague of 1665, municipal officials strictly enforced King Charles II’s royal decree.<br><br>The Mayor of London hired watchmen to board up and guard infected homes for a compulsory 28-day quarantine, employed searchers to examine plague corpses, and ordered the systematic slaughter of cats and dogs to halt the spread of infection."
  },
  {
    oldQuestionPart: "cause of illness in the period c1700",
    newQuestion: "Explain one way in which ideas about the cause of illness in the period c1700–c1900 were different from ideas about the cause of illness in the Renaissance period (c1500–c1700). (4 marks)",
    newModel: "One key difference was that by the late nineteenth century, ideas about the cause of illness were based on scientific proof that microscopic pathogens caused disease, whereas Renaissance ideas still relied on unscientific theories of miasma.<br><br>In the Renaissance, people believed that bad, foul-smelling air rising from rotting organic waste—known as miasma—directly corrupted the body's humours and made people sick, leading people to burn tar in the streets to purify the air.<br><br>In contrast, the nineteenth century experienced a microbiological revolution.<br><br>In 1861, Louis Pasteur published his Germ Theory, using swan-neck flask experiments to prove that living microorganisms in the air caused decay and human disease, disproving the old theory of \"spontaneous generation\"."
  },
  {
    oldQuestionPart: "surgical treatments in the period c1700",
    newQuestion: "Explain one way in which the methods used by surgeons in the period c1700–c1900 were different from the methods used by surgeons in the medieval period (c1250–c1500). (4 marks)",
    newModel: "One key difference was that late nineteenth-century surgeons utilized chemical anesthetics and antiseptic techniques to eliminate pain and infection, whereas medieval surgeons operated on conscious patients with no concept of germ control.<br><br>In the medieval period, surgeons could not perform internal operations; they had no effective pain relief, relying on dangerous herbal mixtures like opium, and used boiling oil or wine to clean wounds, which failed to prevent fatal sepsis.<br><br>In contrast, late nineteenth-century surgery was highly precise and sterile.<br><br>Surgeons put patients completely to sleep using James Simpson's chloroform (1847) and used Joseph Lister's carbolic acid spray (1865) to sterilize the operating theater and wounds, dropping post-operative infection mortality rates from 46% to 15%."
  },
  {
    oldQuestionPart: "role of the government in preventing disease in the period c1700",
    newQuestion: "Explain one way in which the role of the government in preventing disease in the period c1700–c1900 was different from the role of the government in preventing disease in the Renaissance period (c1500–c1700). (4 marks)",
    newModel: "One key difference was that the nineteenth-century government passed compulsory national legislation to enforce sanitation, whereas the Renaissance government relied on temporary, optional local municipal orders.<br><br>In the Renaissance, public health was strictly local; town mayors issued temporary orders to shut up homes or close theatres only during active plague epidemics, but the central government maintained a strict \"laissez-faire\" attitude and collected no national taxes to fund permanent sanitation systems.<br><br>In contrast, during the late nineteenth century, the government completely abandoned its laissez-faire policy.<br><br>Spurred by cholera outbreaks and Germ Theory, Parliament passed the compulsory 1875 Public Health Act, which legally forced all local authorities nationwide to provide clean water, build sewers, dispose of sewage, and appoint medical officers."
  },
  {
    oldQuestionPart: "ideas about the cause of illness in the modern period",
    newQuestion: "Explain one way in which ideas about the cause of illness in the modern period (c1900–present) were different from ideas about the cause of illness in the period c1700–c1900. (4 marks)",
    newModel: "One key difference was that in the modern period, scientists understood that many non-communicable diseases are caused by internal, hereditary genetic mutations in DNA, whereas nineteenth-century scientists believed all diseases were caused by external bacterial pathogens.<br><br>In the nineteenth century, the scientific understanding of disease was dominated by Germ Theory, leading doctors to believe that virtually all illnesses were caused by catching an external microbe from contaminated water or dirty air.<br><br>In contrast, the modern period unlocked a genetic paradigm of medicine.<br><br>Following the 1953 discovery of the double-helix structure of DNA by James Watson and Francis Crick (utilizing Rosalind Franklin's X-ray images) and the Human Genome Project, modern doctors understood that children inherit specific faulty genes, allowing them to identify the genetic causes of hereditary illnesses like cystic fibrosis."
  },
  {
    oldQuestionPart: "treatment of illness in the modern period",
    newQuestion: "Explain one way in which the treatment of illness in the modern period (c1900–present) was different from the treatment of illness in the period c1700–c1900. (4 marks)",
    newModel: "One key difference was that modern treatments relied on targeted chemical cures and mass-produced antibiotics to destroy bacteria inside the body, whereas nineteenth-century treatments could not cure internal infections.<br><br>In the nineteenth century, despite Pasteur proving that germs cause disease, scientists could not cure internal infections, meaning patients still relied on traditional herbal remedies or unhelpful patent medicines.<br><br>In contrast, the modern period experienced a chemical and pharmaceutical revolution.<br><br>Scientists developed targeted chemical cures like Salvarsan 606 (1909) to kill specific microbes inside the body, and successfully developed penicillin in the 1940s (by Fleming, Florey, and Chain), creating the world's first mass-produced antibiotic that could actively destroy bacterial infections inside a patient's bloodstream."
  },
  {
    oldQuestionPart: "prevention of illness in the modern period",
    newQuestion: "Explain one way in which approaches to preventing the spread of illness in the modern period (c1900–present) were different from approaches to preventing the spread of illness in the medieval period (c1250–c1500). (4 marks)",
    newModel: "One key difference was that modern disease prevention relied on state-funded compulsory vaccinations and nationwide lifestyle campaigns, whereas medieval prevention was based on religious penance and individual dietary regimes.<br><br>In the Middle Ages, the primary method of preventing disease was spiritual, such as praying or fasting to ask God for forgiveness, or personally following the Regimen Sanitatis (a set of individual guidelines recommending moderate diet and exercise to keep humours balanced).<br><br>In contrast, the modern government takes full, proactive responsibility for prevention.<br><br>The state actively prevents disease on a national scale by funding and launching compulsory free vaccination campaigns (such as the 1942 national immunisation against diphtheria) and aggressive, digital public education initiatives like the Change4Life campaign to encourage healthy eating and prevent chronic lifestyle illnesses."
  },
  {
    oldQuestionPart: "hospital care in the modern period",
    newQuestion: "Explain one way in which care in hospitals in the modern period (c1900–present) was different from care in hospitals in the period c1700–c1900. (4 marks)",
    newModel: "One key difference was that modern hospital care was run by the state under the NHS and focused on providing high-tech, clinical cures, whereas nineteenth-century hospitals were voluntary, charitable institutions that provided basic sanitary recovery.<br><br>In the nineteenth century, hospitals were funded primarily by local charity or subscription; while Florence Nightingale’s reforms made them much cleaner and improved nursing training, their care was simple and they did not have advanced diagnostic technology or specialized surgical equipment, meaning the wealthy still preferred to be treated at home.<br><br>In contrast, the creation of the National Health Service (NHS) in 1948 nationalized British hospitals, providing free medical care funded entirely through national taxation.<br><br>Modern hospitals became advanced scientific centers, providing patients with access to free, high-tech clinical treatments—such as organ transplants, chemotherapy, keyhole surgery, and robotic precision tools."
  }
];

const file = 'edexcel_medicine/data.js';
let content = fs.readFileSync(file, 'utf8');

// We will use a regex to match the object that has "text": "Explain one way... (4 marks)"
replacements.forEach(r => {
  // Build a regex that finds the specific object in the gcse_task array
  // Example match:
  // "text": "Explain one way in which knowledge of human anatomy in the Renaissance period (c1500–c1700) was different from knowledge of human anatomy in the medieval period (c1250–c1500). (4 marks)",
  // "model": "Old model text..."

  // We find "text": "..." followed by "model": "..."
  const regex = new RegExp(`"text"\\s*:\\s*"[^"]*?${r.oldQuestionPart}[^"]*?\\(4 marks\\)"\\s*,\\s*"model"\\s*:\\s*"[^"]*"`, 'g');
  
  const matches = content.match(regex);
  if (matches && matches.length > 0) {
    const replacementStr = `"text": "${r.newQuestion}",\n              "model": "${r.newModel.replace(/"/g, '\\"')}"`;
    content = content.replace(regex, replacementStr);
    console.log(`Replaced: ${r.oldQuestionPart}`);
  } else {
    console.log(`WARNING: Could not find match for: ${r.oldQuestionPart}`);
  }
});

fs.writeFileSync(file, content, 'utf8');
