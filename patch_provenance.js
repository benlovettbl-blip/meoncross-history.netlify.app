const fs = require('fs');

let dataStr = fs.readFileSync('early_modern_world/data.js', 'utf8');
const jsonStr = dataStr.replace('export const unitData = ', '').trim().replace(/;$/, '');
const unit = eval('(' + jsonStr + ')');

unit.cover_sources[0].description = "A ceiling painting by Spiridione Roma (1778), originally commissioned for the Revenue Committee Room at East India House in London (now held by the British Library). It is an allegorical painting showing Britannia receiving jewels, spices, and silk from Asia, Africa, and India. It highlights the ideology and wealth of the empire.";

unit.cover_sources[1].description = "A reverse glass painting by an unknown Chinese artist (c. 1805) currently held by the Peabody Essex Museum. It depicts the highly regulated district in Qing China where European companies operated, proving that Asian empires held immense global economic power.";

unit.cover_sources[2].description = "An engraving of the Second Royal Exchange in London by Wenceslaus Hollar (1644), now held by the Metropolitan Museum of Art. By 1750, London was crowded with merchant ships and transformed into the financial center of global maritime trade.";

unit.cover_sources[3].description = "A world map created by Flemish cartographer Gerardus Mercator in 1569. Early modern maps revolutionized travel by introducing new projections for navigation, showing the massive ocean trade routes and the terrifying scale of global exploration.";

const output = 'export const unitData = ' + JSON.stringify(unit, null, 2) + ';\n';
fs.writeFileSync('early_modern_world/data.js', output, 'utf8');
console.log('Successfully updated cover sources provenance.');
