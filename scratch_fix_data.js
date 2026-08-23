const fs = require('fs');
let file = 'early_modern_world/data.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('Between 1405 and 1433, ]]', 'Between 1405 and 1433, Zheng He');
content = content.replace("larger than 's <em>Santa Maria</em>", "larger than Christopher Columbus's <em>Santa Maria</em>");
content = content.replace('privateers like Francis Drake, ]], and  were', 'privateers like Francis Drake, John Hawkins, and Walter Raleigh were');
content = content.replace('Revisionist View (]], 2013)', 'Revisionist View (Geoffrey Parker, 2013)');
content = content.replace('Leader of the ]] Confederacy', 'Leader of the Powhatan Confederacy');
content = content.replace("How did ]]'s behavior", "How did Sir Thomas Roe's behavior");
content = content.replace('popularly known as —arrived', 'popularly known as Pocahontas—arrived');
content = content.replace('court of ]] in London', 'court of King James I in London');
content = content.replace('tobacco planter , she', 'tobacco planter John Rolfe, she');
content = content.replace('In 1612,  introduced', 'In 1612, John Rolfe introduced');
content = content.replace('ruled by ]].', 'ruled by Emperor Jahangir.');
content = content.replace('Historian Perspective A: ]] (The Expansion', 'Historian Perspective A: John Robert Seeley (The Expansion');
content = content.replace('Historian Perspective B: ]] (Inglorious', 'Historian Perspective B: Shashi Tharoor (Inglorious');
content = content.replace('Analyze why ]] and Parliament', 'Analyze why King Charles I and Parliament');
content = content.replace('Analyze why ]] and Parliament', 'Analyze why King Charles I and Parliament');
content = content.replace('Charles I’s son, <strong></strong>,', 'Charles I’s son, <strong>Charles II</strong>,');
content = content.replace('Though  returned in 1660', 'Though Charles II returned in 1660');
content = content.replace('Political View (]], 1961)', 'Political View (Christopher Hill, 1961)');
content = content.replace('Imperial/Economic View (]], 1944)', 'Imperial/Economic View (Eric Williams, 1944)');
content = content.replace("How does ]]'s account", "How does Olaudah Equiano's account");

fs.writeFileSync(file, content);
console.log('Fixed early_modern_world/data.js');
