const fs = require('fs');
const file = 'c:/Projects/meoncross-history.netlify.app/great_war_part2/data.js';
let content = fs.readFileSync(file, 'utf8');

const target1 = `          "tasks": [
            {
              "type": "text",
              "text": "Why did the Western Front become a stagnant deadlock by the winter of 1914? 2. Describe two physical challenges soldiers faced inside the Western Front trenches. 3. Why did General Douglas Haig believe the infantry could easily walk across No Man's Land on July 1, 1916? 4. What were the British casualty figures for the first day of the Battle of the Somme?",
              "model": "Both the Allied and German armies dug massive, defensive trench networks that neither side could easily penetrate.<br><br>Q2. Soldiers faced freezing mud that caused trench foot and massive infestations of disease-carrying black rats and lice.<br><br>Q3. Haig believed his troops could walk across safely because a week-long artillery bombardment was assumed to have destroyed the German defenses.<br><br>Q4. 57,470 casualties on the first day, including 19,240 deaths."
            }
          ]`;

const replacement1 = `          "tasks": [
            {
              "type": "short_answer",
              "question": "Why did the Western Front become a stagnant deadlock by the winter of 1914?",
              "model_answer": "Both the Allied and German armies dug massive, defensive trench networks that neither side could easily penetrate."
            },
            {
              "type": "short_answer",
              "question": "Describe two physical challenges soldiers faced inside the Western Front trenches.",
              "model_answer": "Soldiers faced freezing mud that caused trench foot and massive infestations of disease-carrying black rats and lice."
            },
            {
              "type": "short_answer",
              "question": "Why did General Douglas Haig believe the infantry could easily walk across No Man's Land on July 1, 1916?",
              "model_answer": "Haig believed his troops could walk across safely because a week-long artillery bombardment was assumed to have destroyed the German defenses."
            },
            {
              "type": "short_answer",
              "question": "What were the British casualty figures for the first day of the Battle of the Somme?",
              "model_answer": "57,470 casualties on the first day, including 19,240 deaths."
            }
          ]`;

const target2 = `          "tasks": [
            {
              "type": "text",
              "text": "**Causation:** Why did the deep, concrete-reinforced bunkers built by the German army cause the British offensive on the Somme to fail? 6. **Historical Interpretations:** Explain why popular history books might refer to British soldiers as \\"Lions led by Donkeys\\" during the First World War. 7. **The <abbr title=\\"I - Identify (make your point)\\nD - Describe (give historical evidence/detail)\\nE - Explain (how the evidence supports the point)\\nA - Analyse (link back to the question and evaluate significance)\\" style=\\"text-decoration: underline dotted; cursor: help;\\">IDEA</abbr> Paragraph Scaffold:** Write a structured paragraph explaining whether General Haig deserves to be remembered as the \\"Butcher of the Somme.\\" Use Identify, Describe, Explain, Analyse.",
              "model": "The deep bunkers protected German soldiers from the heavy artillery. Once the bombardment stopped, they emerged unharmed with machine guns.<br><br>Q6. Ordinary soldiers were incredibly brave (\\"lions\\"), but commanded by outdated, uncaring generals (\\"donkeys\\") who repeated failed tactics.<br><br>Q7. I: Labeling him simply as a 'butcher' oversimplifies the unprecedented nature of the conflict. D: On the first day of the Somme, his outdated plan resulted in 19,240 British deaths. E: This disaster occurred because he was forced to learn industrialized warfare with no historical template. A: Therefore, while his early decisions were disastrously flawed, he eventually adapted his tactics to integrate tanks and creeping barrages to win the war in 1918."
            }
          ]`;

const replacement2 = `          "tasks": [
            {
              "type": "short_answer",
              "question": "**Causation:** Why did the deep, concrete-reinforced bunkers built by the German army cause the British offensive on the Somme to fail?",
              "model_answer": "The deep bunkers protected German soldiers from the heavy artillery. Once the bombardment stopped, they emerged unharmed with machine guns."
            },
            {
              "type": "short_answer",
              "question": "**Historical Interpretations:** Explain why popular history books might refer to British soldiers as \\"Lions led by Donkeys\\" during the First World War.",
              "model_answer": "Ordinary soldiers were incredibly brave (\\"lions\\"), but commanded by outdated, uncaring generals (\\"donkeys\\") who repeated failed tactics."
            },
            {
              "type": "extended_writing",
              "question": "**The <abbr title=\\"I - Identify (make your point)\\nD - Describe (give historical evidence/detail)\\nE - Explain (how the evidence supports the point)\\nA - Analyse (link back to the question and evaluate significance)\\" style=\\"text-decoration: underline dotted; cursor: help;\\">IDEA</abbr> Paragraph Scaffold:** Write a structured paragraph explaining whether General Haig deserves to be remembered as the \\"Butcher of the Somme.\\" Use Identify, Describe, Explain, Analyse.",
              "model_answer": "I: Labeling him simply as a 'butcher' oversimplifies the unprecedented nature of the conflict. D: On the first day of the Somme, his outdated plan resulted in 19,240 British deaths. E: This disaster occurred because he was forced to learn industrialized warfare with no historical template. A: Therefore, while his early decisions were disastrously flawed, he eventually adapted his tactics to integrate tanks and creeping barrages to win the war in 1918."
            }
          ]`;

if (content.includes(target1)) {
    content = content.replace(target1, replacement1);
    console.log("Replaced block 1 in root");
}
if (content.includes(target2)) {
    content = content.replace(target2, replacement2);
    console.log("Replaced block 2 in root");
}
fs.writeFileSync(file, content);
