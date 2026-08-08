const fs = require('fs');

const txt = fs.readFileSync('early_modern_world/data.js', 'utf8');
const startIdx = txt.indexOf('{');
const endIdx = txt.lastIndexOf('}') + 1;
const jsonStr = txt.substring(startIdx, endIdx);
const data = eval('(' + jsonStr + ')');

// L2 Fixes
const l2 = data.lessons[2];
const justEmp = l2.narrative_blocks.find(b => b.title === 'Justifying Empire: Religion vs. Profit');
justEmp.text = justEmp.text.replace('Source A: From the Journal', 'Source C: From the Journal');
justEmp.tasks[1].question = "Using Source C, explain why the East India Company was forced to act politely toward Mughal rulers in 1616, whereas English settlers in Virginia acted aggressively toward Native Americans.";
justEmp.tasks[1].model_answer = "Source C shows that the Mughal Empire was incredibly wealthy...";
justEmp.tasks[2].question = "Which source is more useful to a historian studying the economic motivations behind early British overseas expansion?";
justEmp.tasks[2].model_answer = "Source C is more useful for studying economic motivations because it directly addresses trade, taxes, and goods. Roe's journal reveals the practical realities and desperation of English merchants trying to secure a foothold in lucrative Asian markets. Source B is less useful for economics, as it primarily serves as religious propaganda to justify the Virginia Company's colonial charter.";

const invPigs = l2.narrative_blocks.find(b => b.title === 'Side Quest: The Invasion of the Pigs');
invPigs.text = invPigs.text.replace('Source D:', 'Source E:');

// L5 Fixes
const l5 = data.lessons[5];
const equiano = l5.narrative_blocks.find(b => b.title === "Voices of Resistance: Equiano's Testimony");
equiano.tasks[0].question = "Inferring Motive (Source B): Why did jumping overboard represent a powerful act of resistance for enslaved Africans, even though it resulted in death?";
equiano.tasks[2].question = "Evaluating Significance (Equiano's Portrait & Source A): Why was Equiano’s autobiography so historically revolutionary when published in London in 1789?";

// L6 Fixes
const l6 = data.lessons[6];
const darkSide = l6.narrative_blocks.find(b => b.title === "Primary Source Analysis: The Dark Side");
darkSide.tasks[0].question = "Analyzing Audience & Purpose: Why would Henry Fielding (Source D), a London magistrate, exaggerate the chaos and crime in London in 1751?";
darkSide.tasks[0].model_answer = darkSide.tasks[0].model_answer.replace(/Source F/g, 'Source D');
darkSide.tasks[1].question = "Synthesis Challenge: Combine the insights from Sources C and D with your knowledge of the Atlantic Slave Trade to write a nuanced 3-sentence summary of British society in 1750.";

const newJsonStr = JSON.stringify(data, null, 2);
const newTxt = txt.substring(0, startIdx) + newJsonStr + txt.substring(endIdx);
fs.writeFileSync('early_modern_world/data.js', newTxt);
console.log('Successfully applied final meticulous fixes to early_modern_world/data.js!');
