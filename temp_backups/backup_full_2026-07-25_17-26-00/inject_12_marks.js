const fs = require('fs');

const replacements = [
  {
    oldQuestionPart: "discovery of DNA",
    newQuestion: "Explain why the discovery of the structure of DNA was a significant breakthrough in understanding the causes of illness. (12 marks)",
    newModel: "The discovery of the double-helix structure of DNA in 1953 by James **Watson and Crick** (utilizing the vital X-ray diffraction images produced by Rosalind Franklin) was highly significant because it **unlocked a completely new genetic paradigm of medicine**. Sickness was traditionally explained by external pathogens (Germ Theory) or physical trauma. By decoding the human genetic blueprint, this molecular breakthrough allowed scientists to look inside the human cell and understand how chemical instructions are passed from parents to offspring. **Consequently**, scientists could prove that many non-communicable, chronic diseases are caused by internal, inherited genetic mutations rather than external germs. **This meant that** doctors could finally explain why patients developed congenital disorders, permanently transforming our scientific understanding of disease causation.<br><br>This genetic understanding was scaled up globally through the **Human Genome Project** (launched in 1990 and completed in 2003), which successfully mapped all three billion chemical base pairs in human DNA. **This led directly to** modern medical researchers identifying the specific mutated or faulty genes responsible for hereditary conditions—such as cystic fibrosis, Down's syndrome, and haemophilia. Today, this allows for highly advanced predictive genetic testing. For example, individuals can be screened for mutated BRCA1 or BRCA2 genes, identifying a high hereditary risk of developing breast cancer long before any physical symptoms manifest. **As a result**, the discovery of DNA transitioned medicine from a system of reactive symptom-watching to proactive, genetic risk-management.<br><br>Furthermore, the discovery of DNA was a significant breakthrough because it **enabled the development of highly targeted therapies and gene technologies**. Rather than using \"one-size-fits-all\" chemical drugs that caused severe side effects, DNA research paved the way for **pharmacogenomics**—the ability to tailor drug treatments to an individual’s specific genetic profile. It also enabled the development of **genetic engineering**, allowing scientists to synthesize vital hormones like insulin using genetically modified bacteria. In the long term, this breakthrough has laid the groundwork for **gene therapy**—the cutting-edge practice of inserting healthy genes to actively correct genetic mutations in the womb. **In conclusion**, DNA represents the ultimate medical breakthrough because it shifted medical causation from external pathogens to internal genetics, allowing doctors to predict, map, and eventually edit the human biological code."
  }
];

const file = 'edexcel_medicine/data.js';
let content = fs.readFileSync(file, 'utf8');

replacements.forEach(r => {
  const regex = new RegExp(`"(?:text|question)"\\s*:\\s*"(?:[^"\\\\]|\\\\.)*?${r.oldQuestionPart}(?:[^"\\\\]|\\\\.)*?\\(12 marks\\)(?:[^"\\\\]|\\\\.)*?"\\s*,[\\s\\S]*?"model"\\s*:\\s*"(?:[^"\\\\]|\\\\.)*"`, 'g');
  
  const matches = content.match(regex);
  if (matches && matches.length > 0) {
    const replacementStr = `"text": "${r.newQuestion.replace(/"/g, '\\"')}",\n              "model": "${r.newModel.replace(/"/g, '\\"')}"`;
    content = content.replace(regex, replacementStr);
    console.log(`Replaced: ${r.oldQuestionPart}`);
  } else {
    console.log(`WARNING: Could not find match for: ${r.oldQuestionPart}`);
  }
});

fs.writeFileSync(file, content, 'utf8');
