const fs = require('fs');

function updateIndustrial() {
  const file = 'public/units/industrialisation_and_empire/data.js';
  let content = fs.readFileSync(file, 'utf8');

  // Remove the tasks array from "The Optimist View"
  const optimstTasksStr = `"tasks": [
        {
          "type": "categorisation",
          "qNum": 1,
          "question": "Categorise the following list of historical facts into either 'Evidence of National Progress & Wealth' (The Optimist View) or 'Evidence of Working-Class / Colonial Exploitation' (The Pessimist View) by writing them under the correct headings:\\n1. Henry Cort's puddling process increases iron production by 400%.\\n2. The 1881 Fareham Census records 10-year-old boys working as 'pug boys' in clay pits.\\n3. Indian handloom weavers are forced into starvation by English 'captive market' trade laws.\\n4. Fareham Red bricks are selected to construct the Royal Albert Hall in London.\\n5. Edwin Chadwick records that deaths from filth and overcrowding in industrial towns outnumber casualties in modern wars.\\n6. HMS Warrior enforces the 'Two-Power Standard' globally, protecting merchant shipping lanes.",
          "model_answer": "### Evidence of National Progress & Wealth (Optimist View)\\n* **Fact 1:** Henry Cort's puddling process increases iron production by 400%.\\n* **Fact 4:** Fareham Red bricks are selected to construct the Royal Albert Hall in London.\\n* **Fact 6:** HMS Warrior enforces the 'Two-Power Standard' globally, protecting merchant shipping lanes.\\n\\n### Evidence of Working-Class / Colonial Exploitation (Pessimist View)\\n* **Fact 2:** The 1881 Fareham Census records 10-year-old boys working as 'pug boys' in clay pits.\\n* **Fact 3:** Indian handloom weavers are forced into starvation by English 'captive market' trade laws.\\n* **Fact 5:** Edwin Chadwick records that deaths from filth and overcrowding in industrial towns outnumber casualties in modern wars."
        }
      ]`;
  const optimstIdx = content.indexOf(optimstTasksStr);
  if (optimstIdx !== -1) {
       let beforeTask = optimstIdx - 1;
       while (content[beforeTask] === ' ' || content[beforeTask] === '\n' || content[beforeTask] === '\r') beforeTask--;
       let startIdx = optimstIdx;
       if (content[beforeTask] === ',') {
          startIdx = beforeTask;
       }
       content = content.substring(0, startIdx) + content.substring(optimstIdx + optimstTasksStr.length);
  }

  // Remove the tasks array from "The Pessimist View"
  const pessimistTasksStr = `"tasks": [
        {
          "type": "paragraph_drafting",
          "qNum": 2,
          "question": "Using the Point, Evidence, Explanation (P.E.E.) framework, write a high-quality paragraph arguing that the working classes paid the physical price for Britain's industrial and imperial progress.",
          "model_answer": "**Point:** The working classes paid a devastating physical and human price to fuel Britain's industrial and imperial wealth. \\n\\n**Evidence:** For example, while famous 'Fareham Red' bricks were used to build grand imperial monuments like the Royal Albert Hall, official local evidence like the 1881 Census reveals that children as young as ten were forced to work barefoot as 'pug boys' and brick turners for 14 hours a day in the freezing mud of the Funtley clay pits. Furthermore, Edwin Chadwick's 1842 report proved that workers in industrial towns were packed into unventilated back-to-back slums where filth and contaminated water caused deadly cholera outbreaks, making the slums deadlier than modern warfare. \\n\\n**Explanation:** This proves that the progress celebrated by the wealthy elite was entirely dependent on the exploitation of the poor. The stunning infrastructure of the British Empire was not a reflection of national well-being, but was physically bought through the shortened lives, broken health, and hazardous labor of working-class families."
        }
      ]`;
  const pessimistIdx = content.indexOf(pessimistTasksStr);
  if (pessimistIdx !== -1) {
       let beforeTask = pessimistIdx - 1;
       while (content[beforeTask] === ' ' || content[beforeTask] === '\n' || content[beforeTask] === '\r') beforeTask--;
       let startIdx = pessimistIdx;
       if (content[beforeTask] === ',') {
          startIdx = beforeTask;
       }
       content = content.substring(0, startIdx) + content.substring(pessimistIdx + pessimistTasksStr.length);
  }

  // Remove the tasks array from "The Strategic Retreat"
  const retreatTasksStr = `"tasks": [
        {
          "type": "short_answer",
          "qNum": 3,
          "question": "Historical Reasoning: Explain why it is historically inaccurate to argue that the British ruling class expanded the right to vote out of a belief in fairness and equality.",
          "model_answer": "It is inaccurate because primary evidence proves the ruling elite deeply feared and despised the working classes, viewing them as violent and incapable of governance, as seen in MP Robert Lowe's 1866 speech. Legislation like the 1832 Great Reform Act and the 1872 Secret Ballot Act were strategic concessions passed out of fear of revolution, not fairness. The elite only expanded the franchise to pacify mass movements like Chartism and protect their own property from being overthrown by a working-class revolt."
        }
      ]`;
  const retreatIdx = content.indexOf(retreatTasksStr);
  if (retreatIdx !== -1) {
       let beforeTask = retreatIdx - 1;
       while (content[beforeTask] === ' ' || content[beforeTask] === '\n' || content[beforeTask] === '\r') beforeTask--;
       let startIdx = retreatIdx;
       if (content[beforeTask] === ',') {
          startIdx = beforeTask;
       }
       content = content.substring(0, startIdx) + content.substring(retreatIdx + retreatTasksStr.length);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated industrialisation_and_empire');
}

updateIndustrial();
