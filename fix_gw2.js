const fs = require('fs');
let data = fs.readFileSync('great_war_part2/data.js', 'utf8');

data = data.replace(/How did the long-term MAIN causes.*?1914\?/g, "Think-Pair-Share: Why were young men so eager to enlist in 1914?");
data = data.replace(/Why did the Schlieffen Plan fail.*?Western Front\?/g, "Think-Pair-Share: Did British generals deserve the title 'Lions led by Donkeys'?");
data = data.replace(/To what extent was General Haig responsible.*?Somme\?/g, "Think-Pair-Share: Why has the contribution of Empire troops often been forgotten?");
data = data.replace(/What were the most significant impacts of the naval blockade.*?war\?/g, "Think-Pair-Share: How did the Defence of the Realm Act (DORA) change the relationship between the citizen and the state?");
data = data.replace(/How did the experiences of soldiers.*?conscription\?/g, "Think-Pair-Share: Should the men shot for cowardice be pardoned?");

fs.writeFileSync('great_war_part2/data.js', data, 'utf8');
console.log('Successfully applied regex replacements to great_war_part2/data.js');
