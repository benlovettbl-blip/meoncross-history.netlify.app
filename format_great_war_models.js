const fs = require('fs');

const path = 'great_war/data.js';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  {
    original: "Source A is highly useful because it shows the deep, emotional humiliation felt by the French people over the loss of Alsace-Lorraine and the 5 billion franc ransom. As a school textbook, its purpose is to indoctrinate the next generation for a war of revenge, proving that the hatred was deeply embedded in French culture. Source B is also extremely useful as it shows the German perspective. Bismarck openly acknowledges that taking Alsace-Lorraine has guaranteed a future 'war of revenge'. Together, they prove that the hatred was mutual and structural, shaping the future alliance system.",
    new: "<strong>Source A is highly useful because it shows the deep, emotional humiliation felt by the French people over the loss of Alsace-Lorraine and the 5 billion franc ransom.</strong> <strong style=\\\"color: #9333ea;\\\">As a school textbook, its purpose is to indoctrinate the next generation for a war of revenge, proving that the hatred was deeply embedded in French culture.</strong><br><br><strong>Source B is also extremely useful as it shows the German perspective.</strong> <strong style=\\\"color: #0284c7\\\">Bismarck openly acknowledges that taking Alsace-Lorraine has guaranteed a future 'war of revenge'.</strong> <strong style=\\\"color: #16a34a;\\\">Together, they prove that the hatred was mutual and structural, shaping the future alliance system.</strong>"
  },
  {
    original: "Source A is useful for showing the British perception of Weltpolitik; the cartoon's purpose is to mock Wilhelm II as greedy, demonstrating the growing tension between Britain and Germany. Source B is useful for understanding the German intent behind Weltpolitik; as a public speech to the Reichstag, its purpose is to rally domestic support for empire-building. Together they show how German ambition directly caused British anxiety.",
    new: "<strong>Source A is useful for showing the British perception of Weltpolitik;</strong> <strong style=\\\"color: #9333ea;\\\">the cartoon's purpose is to mock Wilhelm II as greedy, demonstrating the growing tension between Britain and Germany.</strong><br><br><strong>Source B is useful for understanding the German intent behind Weltpolitik;</strong> <strong style=\\\"color: #9333ea;\\\">as a public speech to the Reichstag, its purpose is to rally domestic support for empire-building.</strong> <strong style=\\\"color: #16a34a;\\\">Together they show how German ambition directly caused British anxiety.</strong>"
  },
  {
    original: "Source A is useful for showing the technological leap that triggered the arms race; its origin as an official blueprint makes it highly reliable evidence of the ship's massive guns. Source B is highly useful for showing the psychological impact of the arms race on the British public; its purpose was to pressure the government to build more ships. Together, they show how technological advances fueled public panic.",
    new: "<strong>Source A is useful for showing the technological leap that triggered the arms race;</strong> <strong style=\\\"color: #9333ea;\\\">its origin as an official blueprint makes it highly reliable evidence of the ship's massive guns.</strong><br><br><strong>Source B is highly useful for showing the psychological impact of the arms race on the British public;</strong> <strong style=\\\"color: #9333ea;\\\">its purpose was to pressure the government to build more ships.</strong> <strong style=\\\"color: #16a34a;\\\">Together, they show how technological advances fueled public panic.</strong>"
  },
  {
    original: "Source A is useful because it visually demonstrates how Serbia nearly doubled in size after the Balkan Wars, making it a much larger physical threat. Source B is extremely useful because, as a private diary entry, it reveals the genuine panic and aggressive intentions of the Austro-Hungarian military command without political censorship. Together, they prove that Austria-Hungary felt an existential need to destroy Serbia.",
    new: "<strong>Source A is useful because it visually demonstrates how Serbia nearly doubled in size after the Balkan Wars, making it a much larger physical threat.</strong><br><br><strong>Source B is extremely useful because,</strong> <strong style=\\\"color: #9333ea;\\\">as a private diary entry, it reveals the genuine panic and aggressive intentions of the Austro-Hungarian military command without political censorship.</strong> <strong style=\\\"color: #16a34a;\\\">Together, they prove that Austria-Hungary felt an existential need to destroy Serbia.</strong>"
  },
  {
    original: "Source A is useful for showing the long-term tension in the Balkans; its purpose is to warn the British public that the 'Great Powers' were struggling to keep the peace. Source B is crucial for understanding the short-term trigger; as an official diplomatic telegram, it proves that Germany gave Austria-Hungary unconditional support, which gave Austria the confidence to attack Serbia. Together, they explain why a regional crisis exploded into a world war.",
    new: "<strong>Source A is useful for showing the long-term tension in the Balkans;</strong> <strong style=\\\"color: #9333ea;\\\">its purpose is to warn the British public that the 'Great Powers' were struggling to keep the peace.</strong><br><br><strong>Source B is crucial for understanding the short-term trigger;</strong> <strong style=\\\"color: #9333ea;\\\">as an official diplomatic telegram, it proves that Germany gave Austria-Hungary unconditional support, which gave Austria the confidence to attack Serbia.</strong> <strong style=\\\"color: #16a34a;\\\">Together, they explain why a regional crisis exploded into a world war.</strong>"
  }
];

let replacedCount = 0;
replacements.forEach(rep => {
  if (content.includes(rep.original)) {
    content = content.replace(rep.original, rep.new);
    replacedCount++;
  }
});

fs.writeFileSync(path, content, 'utf8');
console.log('Replaced ' + replacedCount + ' models in great_war/data.js');
