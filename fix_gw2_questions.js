const fs = require('fs');
const filePath = 'public/units/great_war_part2/data.js';
let data = fs.readFileSync(filePath, 'utf8');

data = data.replace(/How did the long-term MAIN causes.*?1914\?/g, "Why were young men so eager to enlist in 1914?");
data = data.replace(/Why did the Schlieffen Plan fail.*?Western Front\?/g, "Did British generals deserve the title 'Lions led by Donkeys'?");
data = data.replace(/To what extent was General Haig responsible.*?Somme\?/g, "Why has the contribution of Empire troops often been forgotten?");
data = data.replace(/What were the most significant impacts of the naval blockade.*?war\?/g, "How did the Defence of the Realm Act (DORA) change the relationship between the citizen and the state?");
data = data.replace(/How did the experience of the First World War change the role.*?society\?/g, "How did the loss of a generation impact small communities like Stubbington?");

fs.writeFileSync(filePath, data, 'utf8');
console.log('Regex replacement complete!');
