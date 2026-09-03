const fs = require('fs');
const path = require('path');

const eeeTasks = {
  "lesson_1_1": [
    [{ "type": "comprehension", "question": "Vocabulary in Context: Based on the text, what does 'patronage' mean and why was it vital for Elizabeth?", "model_answer": "Patronage means giving titles, land, or monopolies to nobles in exchange for their absolute loyalty. It was vital because Elizabeth had no standing army and relied on these nobles to enforce her laws." }],
    [{ "type": "comprehension", "question": "Causal Linkage: How did Elizabeth's gender directly cause a 'crisis of legitimacy' upon her accession?", "model_answer": "Because she was a woman, society believed she was too weak to rule alone, and because her father Henry VIII had divorced Catherine of Aragon to marry her mother Anne Boleyn, many Catholics viewed the marriage as illegal, meaning they believed Elizabeth was illegitimate and had no right to rule." }],
    [{ "type": "comprehension", "question": "The 'But/Because/So' Strategy: Complete the sentence. Elizabeth inherited a massive debt, BUT...", "model_answer": "Elizabeth inherited a massive debt, BUT she could not easily raise taxes BECAUSE this would make her deeply unpopular and risk a rebellion, SO she was forced to rely on selling off royal lands and cutting household expenses." }],
    [{ "type": "comprehension", "question": "Constrained Summary: Summarise the threat from France and Scotland in exactly three bullet points.", "model_answer": "- England was broke and had just lost the key port of Calais to France.\n- France and Scotland were Catholic allies threatening England from two sides.\n- Mary, Queen of Scots had a strong claim to the English throne and was married to the French heir." }],
    [{ "type": "comprehension", "question": "Diamond Ranking Challenge: Which of Elizabeth's 1558 problems (Gender, Debt, France/Scotland) was the most dangerous? Justify your choice.", "model_answer": "The threat from France and Scotland was the most dangerous because it was an immediate military threat. While debt and gender caused political instability, a combined French-Scottish invasion would have forcefully removed Elizabeth from the throne entirely." }]
  ],
  "lesson_1_2": [
    [{ "type": "comprehension", "question": "What was the 'Middle Way' (Via Media) intended to achieve?", "model_answer": "It was intended to achieve a compromise that would satisfy most moderate Protestants and Catholics, preventing a religious civil war by blending Protestant beliefs with Catholic appearances." }],
    [{ "type": "comprehension", "question": "Why was the Church so politically important for the government?", "model_answer": "The Church acted as the government's communication network. Priests preached the Queen's message every Sunday, ensuring social control and loyalty in an era before mass media or a police force." }],
    [{ "type": "comprehension", "question": "Who were the Puritans, and why did they hate the 'Middle Way'?", "model_answer": "Puritans were extreme Protestants who wanted to 'purify' the Church of all Catholic elements. They hated the Middle Way because it kept Catholic features like crucifixes and ornate vestments, which they viewed as sinful." }],
    [{ "type": "comprehension", "question": "Why did Elizabeth initially treat Catholics with leniency?", "model_answer": "She wanted to avoid turning them into martyrs or provoking a rebellion. She believed that if she didn't force them too harshly, Catholicism would naturally die out over time as older generations passed away." }],
    [{ "type": "comprehension", "question": "The 'But/Because/So' Strategy: The Settlement was a brilliant compromise, BUT...", "model_answer": "The Settlement was a brilliant compromise, BUT it failed to satisfy the extremists on both sides BECAUSE Puritans thought it was too Catholic and Catholics thought it was too Protestant, SO it eventually led to rebellions and plots against Elizabeth." }]
  ],
  "lesson_1_3": [
    [{ "type": "comprehension", "question": "Causal Linkage: How did the controversy over 'Vestments' highlight the Puritan challenge?", "model_answer": "Puritans believed priests should wear plain black gowns, but Elizabeth ordered them to wear Catholic-style ornate vestments. When 37 Puritan priests refused, they were fired, showing Elizabeth would crush even Protestant opposition to maintain her authority." }],
    [{ "type": "comprehension", "question": "Why did the Catholic challenge at home grow more dangerous by the late 1560s?", "model_answer": "The Catholic challenge grew because Mary, Queen of Scots arrived in England as a figurehead, and the Pope became more hostile, encouraging English Catholics to rebel rather than conform." }],
    [{ "type": "comprehension", "question": "What was the significance of the Council of Trent?", "model_answer": "The Council of Trent launched the Counter-Reformation, a united European Catholic movement dedicated to actively destroying Protestantism, putting immense international pressure on Elizabeth." }],
    [{ "type": "comprehension", "question": "Constrained Summary: In two sentences, explain why the 1559 settlement failed to bring permanent peace.", "model_answer": "The settlement was designed for moderates, ignoring the deep-rooted fanaticism of Puritans and the growing international Catholic Counter-Reformation. Consequently, as religious tensions polarized across Europe, extremists in England increasingly sought to overthrow the compromise." }]
  ],
  "lesson_1_4": [
    [{ "type": "comprehension", "question": "Why did Mary, Queen of Scots have such a strong claim to the English throne?", "model_answer": "She was Elizabeth's second cousin and the great-granddaughter of King Henry VII. Unlike Elizabeth, her Catholic legitimacy was unquestioned by Europe, making her the perfect replacement for English Catholics." }],
    [{ "type": "comprehension", "question": "What catastrophic events forced Mary to flee Scotland?", "model_answer": "Mary was implicated in the murder of her husband, Lord Darnley, and quickly married the prime suspect, the Earl of Bothwell. This sparked a Scottish rebellion, forcing her to abdicate and flee to England." }],
    [{ "type": "comprehension", "question": "The 'But/Because/So' Strategy: Mary fled to England seeking Elizabeth's help, BUT...", "model_answer": "Mary fled to England seeking help, BUT Elizabeth refused to support her BECAUSE restoring Mary would anger the Scottish Protestants, and executing her would anger Catholic Europe, SO Elizabeth trapped her in permanent captivity." }],
    [{ "type": "comprehension", "question": "Diamond Ranking Challenge: What was the primary reason Mary was a 'nightmare' for Elizabeth? (A) Her royal bloodline (B) Her Catholic faith (C) Her presence in England. Justify your answer.", "model_answer": "Her presence in England was the primary reason. While her bloodline and faith made her a threat, it was her physical presence in England that transformed her from a distant rival into a localized magnet for every Catholic plotter and rebel." }]
  ],
  "lesson_2_1": [
    [{ "type": "comprehension", "question": "What were the main causes of the Revolt of the Northern Earls?", "model_answer": "The Earls were motivated by a desire to restore Catholicism, anger over losing political power to Elizabeth's new Protestant advisors (like Cecil), and the plan to marry Mary, Queen of Scots to the Duke of Norfolk." }],
    [{ "type": "comprehension", "question": "How did the 1570 Papal Bull change the nature of the Catholic threat?", "model_answer": "The Papal Bull excommunicated Elizabeth, ordering all Catholics to actively overthrow her. This meant that simply being a Catholic was now seen as being a traitor to the English Crown." }],
    [{ "type": "comprehension", "question": "Vocabulary in Context: What was the role of a 'Spymaster', and why was Walsingham successful?", "model_answer": "A Spymaster gathered intelligence to protect the state. Walsingham was successful because he built a massive network of informants, used code-breakers, and intercepted letters, allowing him to expose plots before they happened." }],
    [{ "type": "comprehension", "question": "Causal Linkage: How did the Babington Plot directly lead to Mary's execution?", "model_answer": "Walsingham intercepted letters proving Mary had explicitly agreed to the assassination of Elizabeth. Because of the new Act for the Preservation of the Queen's Safety, this direct evidence left Elizabeth no choice but to try and execute her." }],
    [{ "type": "comprehension", "question": "Constrained Summary: Summarise the evolution of Catholic plots between 1569 and 1586 in one sentence.", "model_answer": "What began as aristocratic rebellions over lost political power evolved into highly organized, internationally backed assassination attempts that were ultimately crushed by Walsingham's ruthless spy network." }]
  ],
  "lesson_2_2": [
    [{ "type": "comprehension", "question": "Identify the three main causes of rivalry between England and Spain.", "model_answer": "The rivalry was caused by religious differences (Protestant vs Catholic), political interference (England supporting Dutch rebels), and commercial rivalry (English pirates stealing Spanish gold)." }],
    [{ "type": "comprehension", "question": "Why was the Netherlands so crucial to both Philip II and Elizabeth?", "model_answer": "For Philip, the Netherlands was a wealthy Spanish territory that needed crushing for rebellion. For Elizabeth, a strong Spanish army in the Netherlands across the Channel was a direct military threat to England." }],
    [{ "type": "comprehension", "question": "The 'But/Because/So' Strategy: Philip II launched the Armada in 1588, BUT...", "model_answer": "Philip launched the Armada, BUT it was a catastrophic failure BECAUSE the English ships were faster, the Spanish lacked a deep-water port to pick up their army, and the wind scattered their fleet, SO Spain was humiliated and England survived." }],
    [{ "type": "comprehension", "question": "What was the significance of the 'Singeing of the King of Spain's beard' at Cadiz?", "model_answer": "Francis Drake's raid on Cadiz destroyed Spanish ships and delayed the Armada's launch by over a year, giving England crucial time to prepare its defenses." }],
    [{ "type": "comprehension", "question": "Causal Linkage: Why did the Armada's plan to meet the Duke of Parma fail?", "model_answer": "The Armada failed to meet Parma because they did not have a deep-water port to safely load the troops, and the English used fireships to break the Spanish formation, driving them into the North Sea." }]
  ],
  "lesson_2_3": [
    [{ "type": "comprehension", "question": "How did the 'Genoese Loan' incident escalate tensions in 1568?", "model_answer": "Elizabeth seized Spanish gold from ships that sought shelter in English ports. This infuriated Philip II and marked the beginning of open economic hostility between the two nations." }],
    [{ "type": "comprehension", "question": "Why did the Treaty of Nonsuch (1585) act as the 'point of no return'?", "model_answer": "By signing the Treaty of Nonsuch, Elizabeth officially agreed to send money and troops to support the Dutch rebels. This was a direct declaration of proxy war against the Spanish Empire." }],
    [{ "type": "comprehension", "question": "Why was Robert Dudley's expedition to the Netherlands a failure?", "model_answer": "Dudley was a poor military commander, Elizabeth refused to give him enough money for troops, and he angered Elizabeth by accepting the title 'Governor-General', which implied England was trying to conquer the Netherlands." }],
    [{ "type": "comprehension", "question": "Evaluate: Was the Spanish Armada mostly defeated by English skill or by Spanish mistakes?", "model_answer": "While English skill (like using fireships and faster galleons) was crucial, Spanish mistakes (a flawed plan relying on a non-existent port) and terrible weather (the Protestant Wind) were ultimately the decisive factors that destroyed the fleet." }],
    [{ "type": "comprehension", "question": "Constrained Summary: Summarise the path to war between 1585 and 1588 in three steps.", "model_answer": "First, England openly allied with the Dutch rebels via the Treaty of Nonsuch; second, Drake destroyed Spanish ships at Cadiz; third, an enraged Philip II finally launched the Armada." }]
  ],
  "lesson_3_1": [
    [{ "type": "comprehension", "question": "What was the primary purpose of education in Elizabethan England?", "model_answer": "Education was designed to reinforce the rigid social hierarchy, ensuring everyone knew their place and learned skills specific to their social class, rather than promoting equality or social mobility." }],
    [{ "type": "comprehension", "question": "The 'But/Because/So' Strategy: Petty Schools taught basic literacy, BUT...", "model_answer": "Petty Schools taught basic literacy, BUT most children did not attend BECAUSE their parents needed them to work on farms or in trades, SO education remained a privilege mostly for the wealthy middle and upper classes." }],
    [{ "type": "comprehension", "question": "How did leisure activities highlight the divide in Elizabethan society?", "model_answer": "Leisure activities were strictly divided by class: the nobility engaged in expensive sports like hunting and fencing, while the lower classes participated in brutal blood sports like bear-baiting or watched cheap plays." }],
    [{ "type": "comprehension", "question": "Why did the theatre become so incredibly popular during this era?", "model_answer": "Theatre became popular because it was affordable (costing just 1 penny for groundlings) and appealed to all social classes, offering a shared cultural experience of entertainment, comedy, and tragedy." }],
    [{ "type": "comprehension", "question": "Vocabulary in Context: What was the 'Great Chain of Being'?", "model_answer": "The Great Chain of Being was the belief that God had designed a strict, unchangeable hierarchy for the universe, meaning challenging your social class was seen as a sin against God." }]
  ],
  "lesson_3_2": [
    [{ "type": "comprehension", "question": "Identify two major causes of the poverty crisis in Elizabethan England.", "model_answer": "The poverty crisis was driven by a massive population increase (demographic explosion) causing food shortages, and 'enclosure' (fencing off common land for sheep farming), which left many peasants unemployed." }],
    [{ "type": "comprehension", "question": "Why did the Elizabethan government fear 'vagabonds'?", "model_answer": "Vagabonds were wandering, homeless beggars. The government feared them because they believed vagabonds spread disease, committed crimes, and could easily start rebellions outside the control of the social hierarchy." }],
    [{ "type": "comprehension", "question": "Causal Linkage: How did the government's approach to poverty change over time?", "model_answer": "Initially, the government used brutal punishments like whipping for beggars. But because the crisis worsened and they realized some people were genuinely unable to work, they eventually passed Poor Laws to collect taxes and provide local relief." }],
    [{ "type": "comprehension", "question": "Diamond Ranking Challenge: What was the most significant cause of poverty? (A) Population growth (B) Enclosure (C) Bad harvests. Justify your choice.", "model_answer": "Population growth was the root cause, because it drove up the demand for food (causing inflation) and increased competition for jobs, amplifying the devastating effects of both bad harvests and enclosure." }]
  ],
  "lesson_3_3": [
    [{ "type": "comprehension", "question": "Why did England suddenly become interested in global exploration during Elizabeth's reign?", "model_answer": "England needed new trading markets because their traditional wool trade with Europe had collapsed, and they wanted to challenge the massive wealth and power of the Spanish Empire." }],
    [{ "type": "comprehension", "question": "What were the main goals of Francis Drake's circumnavigation?", "model_answer": "Drake's primary goals were to raid Spanish ships for treasure in the Americas, establish new trade routes, and secretly undermine Spanish dominance on the seas." }],
    [{ "type": "comprehension", "question": "Vocabulary in Context: Why was Drake considered a 'privateer' rather than a pirate by the English?", "model_answer": "A privateer had secret, official permission from the Queen to raid enemy ships, whereas a pirate acted illegally for themselves. To Spain, however, he was just a pirate." }],
    [{ "type": "comprehension", "question": "Constrained Summary: Summarise the impact of Drake's voyage in one sentence.", "model_answer": "Drake's voyage brought immense wealth to England, proved English naval superiority, and infuriated Spain, directly accelerating the path to war." }]
  ],
  "lesson_3_4": [
    [{ "type": "comprehension", "question": "What was Sir Walter Raleigh's grand ambition for North America?", "model_answer": "Raleigh wanted to establish a permanent English colony (Virginia) to act as a base for attacking Spanish treasure ships and to extract valuable resources for England." }],
    [{ "type": "comprehension", "question": "Causal Linkage: Why did the first 1585 expedition to Roanoke fail?", "model_answer": "The expedition failed because they arrived too late to plant crops, their supplies were ruined, and their arrogant behavior alienated the local Native Americans, leading to starvation and conflict." }],
    [{ "type": "comprehension", "question": "What happened to the 1587 'Lost Colony'?", "model_answer": "The colonists were left waiting for supplies. When John White finally returned in 1590 (delayed by the Armada), the colony had entirely vanished, leaving only the word 'Croatoan' carved into a post." }],
    [{ "type": "comprehension", "question": "The 'But/Because/So' Strategy: Raleigh's colony was a complete disaster, BUT...", "model_answer": "Raleigh's colony was a disaster, BUT it laid the groundwork for future success BECAUSE it provided crucial knowledge about navigation, logistics, and the realities of the New World, SO later colonies like Jamestown were able to survive." }]
  ]
};

const dataPath = path.join(__dirname, '../public/units/eee/data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// We need to parse the file, apply the tasks, and stringify
// The easiest way is to use eval to get the object, update it, and then rewrite it.
const startIdx = content.indexOf('{');
const endIdx = content.lastIndexOf('}') + 1;
const jsStr = content.substring(startIdx, endIdx);

let eeeData;
try {
  eeeData = eval('(' + jsStr + ')');
} catch(e) {
  console.error("Error parsing data.js", e);
  process.exit(1);
}

// Apply the tasks to the narrative blocks
for (const lesson of eeeData.lessons) {
  const lessonTasks = eeeTasks[lesson.id];
  if (lessonTasks && lesson.narrative_blocks) {
    // Distribute tasks across narrative blocks. 
    // We have arrays of tasks for each block index.
    lessonTasks.forEach((blockTasks, index) => {
      if (lesson.narrative_blocks[index]) {
        lesson.narrative_blocks[index].tasks = blockTasks;
      } else {
        // If there are more tasks than blocks, attach to the last block
        const lastBlock = lesson.narrative_blocks[lesson.narrative_blocks.length - 1];
        if (lastBlock) {
          lastBlock.tasks = lastBlock.tasks ? lastBlock.tasks.concat(blockTasks) : blockTasks;
        }
      }
    });
    console.log(`Applied ${lessonTasks.length} task sets to ${lesson.id}`);
  }
}

const newContent = `export default ${JSON.stringify(eeeData, null, 2)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully patched public/units/eee/data.js with pedagogical mixed-ability tasks.");
