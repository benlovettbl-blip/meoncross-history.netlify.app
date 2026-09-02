const fs = require('fs');
let data = fs.readFileSync('units/great_war_part2/data.js', 'utf8');

const replacement = `        objectives: [
          {
            objective: "Describe how propaganda, imperial loyalty, and alliance obligations drove mass enlistment across the British Empire",
            primer: "Focus on the role of Lord Kitchener's campaign and how peer pressure and patriotism forced many young men to sign up.",
            question: "What were the main social and political pressures that led young men to enlist in 1914?"
          },
          {
            objective: "Explain why trench warfare on the Western Front created a devastating stalemate",
            primer: "Highlight the failure of the Schlieffen Plan and how the introduction of machine guns and artillery made defensive positions impenetrable.",
            question: "How did modern industrial weaponry create the stalemate of the trench system?"
          },
          {
            objective: "Evaluate the extent to which soldiers' expectations of war matched the reality of industrial-scale conflict",
            primer: "Contrast the romantic ideas of a short 'over by Christmas' adventure with the miserable realities of trench foot, shell shock, and mass casualties.",
            question: "In what ways did the reality of fighting on the Western Front differ from what volunteers expected in 1914?"
          }
        ],`;

data = data.replace(/objectives:\s*\[[\s\S]*?\]\s*,/m, replacement);

fs.writeFileSync('units/great_war_part2/data.js', data);
console.log('Fixed objectives for great_war_part2 L1');
