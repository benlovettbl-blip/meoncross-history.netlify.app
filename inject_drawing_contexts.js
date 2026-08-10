const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

// Lesson 1, Block 2 context
const l1SourceB = `<div class='scaffold-box'><strong>Source B: A Contrast in Living (1450)</strong><br><em>"In 1450, a typical European peasant lived in a tiny, one-room hut made of wattle and daub (woven sticks covered in mud) with a thatched straw roof, sharing the dirt floor with their livestock to stay warm. In contrast, the Oba (King) of Benin lived in a sprawling palace complex covering miles, featuring immense courtyards, wooden pillars coated in bronze, and roofs topped with cast-copper birds. Meanwhile, the Ming Emperor in China commanded the vast 'Forbidden City', a staggering complex of 980 buildings with sweeping golden-yellow glazed roof tiles and red pillars."</em></div><br><br>`;
const l1Regex = /(<div class='scaffold-box'><strong>Source A: An Eyewitness Account of \[Key Individual: Sultan Mehmed II\] entering Constantinople \(1453\)<\/strong><br>.*?<\/div><br><br>)/;
content = content.replace(l1Regex, `$1${l1SourceB}`);

// Lesson 2, Block 2 context
const l2TextAddition = `<br><br><strong>The Invincible Armada (1588)</strong><br>In 1588, Philip II sent the 'Invincible Armada' to invade England. The Spanish ships sailed in a massive, tightly packed <strong>crescent (half-moon) formation</strong>, making them almost impossible to attack. However, when the Armada anchored off Calais, the English launched a devastating night attack. They set eight of their own ships on fire (<strong>fireships</strong>) and let the wind blow these floating infernos directly into the crowded Spanish fleet, causing mass panic and breaking their defensive crescent.`;
const l2Regex = /(... shrinking the world and connecting isolated continents for the first time\.)/;
content = content.replace(l2Regex, `$1${l2TextAddition}`);

// Lesson 3, Block 2 context
const l3TextAddition = ` To defend themselves from Spanish ships and Powhatan attacks, the settlers built James Fort in a unique <strong>triangular shape</strong>. The fort had high wooden palisade walls made of vertically buried logs. At each of the three corners stood a raised watchtower called a bulwark, mounted with heavy cannons facing both the James River and the dense inland woods. Inside the triangle, they built a church, a storehouse, and rows of simple wooden barracks.`;
const l3Regex = /(The early years were disastrous:<br><ul>.*?<\/ul><br>To grow tobacco at scale, the colonists needed vast land and cheap labor\. The English abandoned peaceful trade with the Powhatan and launched aggressive land seizures, sparking decades of brutal warfare\.)/;
content = content.replace(l3Regex, `$1${l3TextAddition}`);

// Lesson 6, Block 1 context
const l6TextAddition = `<br><br>This global business operated in three distinct steps, known as the <strong>Triangular Trade</strong>:<br>1. <strong>Outward Passage (Europe to Africa):</strong> Ships left Europe carrying manufactured goods (textiles, rum, and firearms).<br>2. <strong>The Middle Passage (Africa to the Americas):</strong> The manufactured goods were traded for enslaved Africans, who were transported across the Atlantic in brutal conditions.<br>3. <strong>The Return Passage (Americas to Europe):</strong> Enslaved labor produced raw cash crops (sugar, cotton, tobacco), which were shipped back to Europe to be sold at massive profits.`;
const l6Regex = /(The trade enriched both European merchants and coastal African elites, while completely devastating the interior of the African continent\.)/;
content = content.replace(l6Regex, `$1${l6TextAddition}`);

fs.writeFileSync('early_modern_world/data.js', content, 'utf8');
console.log('Successfully injected drawing contexts into early_modern_world/data.js');
