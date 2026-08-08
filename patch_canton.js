const fs = require('fs');

const path = 'public/units/early_modern_world/data.js';
let raw = fs.readFileSync(path, 'utf8');
const match = raw.match(/export const unitData = ([\s\S]+);/);
let data = eval('(' + match[1] + ')');

// Fix Lesson 3 (index 2) banner text and source A
data.lessons[2].banner = "/images/early_mod_l3_banner.jpg";

const imageObj = data.lessons[2].narrative_blocks[0].images[0];
if (imageObj.src === '/images/early_mod_l3_banner.jpg') {
    imageObj.image = "The Thirteen Factories at Canton (Guangzhou), China.";
    imageObj.image_alt = "The Thirteen Factories at Canton";
    imageObj.image_caption = "An early 19th-century painting showing the Thirteen Factories in Canton (Guangzhou). This was a designated trading enclave where foreign merchants were permitted to do business, strictly controlled by Chinese authorities without any European military fortifications.";
    imageObj.image_context = "Observe the national flags flying outside the trading posts (including Denmark, Spain, USA, Sweden, Britain, and the Netherlands) along the Pearl River. Unlike the militarised forts in India, Qing dynasty authorities strictly prohibited foreign merchants from building military fortifications or stationing troops here. These were purely commercial leased warehouses. **Hinge Question:** What does the presence of multiple international flags, rather than a single European military fort, suggest about who held the real power in Canton?";
}

const newDataStr = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path, newDataStr, 'utf8');
fs.writeFileSync('early_modern_world/data.js', newDataStr, 'utf8');

console.log("Successfully patched Lesson 3 Source A to reflect Canton!");
