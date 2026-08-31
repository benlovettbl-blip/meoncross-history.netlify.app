const fs = require('fs');

const dataStr = fs.readFileSync('early_modern_world/data.js', 'utf8');
// Extract the object
const objStr = dataStr.replace('export default early_modern_world;', '').trim();
let data;
// Evaluate it safely
eval('data = ' + objStr.replace(/^const early_modern_world = /g, ''));

const injections = [
  {
    image: "/images/zheng_he.gif",
    caption: "An authentic Ming Dynasty sailing chart mapping the treacherous ocean routes taken by Admiral Zheng He’s massive 'Treasure Fleets' across the Indian Ocean. It is a woodblock print from the Wubei Zhi (Treatise on Armament Technology, c. 1621), currently held in the Library of Congress."
  },
  {
    image: "/images/armada_portrait.jpg",
    caption: "The Armada Portrait of Queen Elizabeth I, painted to celebrate the Protestant victory over Catholic Spain, with her hand resting on a globe to symbolize England's growing global ambition. This version is held at Woburn Abbey."
  },
  {
    image: "/images/secoton.jpg",
    caption: "A watercolor painted by English explorer John White in 1585, showing the peaceful Algonquin village of Secoton shortly before European diseases decimated the population. The original is held in the British Museum."
  },
  {
    image: "/images/gunpowder.jpg",
    caption: "A 1605 engraving by Crispijn van de Passe of the Catholic conspirators (including Guy Fawkes) who plotted to blow up Parliament and assassinate the Protestant King James I. It is held by the National Portrait Gallery, London."
  },
  {
    image: "/images/james_i.jpg",
    caption: "King James I painted in all his royal finery by Paul van Somer (c. 1616), holding the orb and sceptre—physical symbols of his belief in the 'Divine Right of Kings' and his answerability only to God. It is in the Royal Collection Trust."
  },
  {
    image: "/images/royal_exchange.jpg",
    caption: "An engraving by Wenceslaus Hollar showing the courtyard of the Royal Exchange in 17th-century London (1644), where wealthy merchants and businessmen gathered to strike global trade deals. Held by the Metropolitan Museum of Art."
  },
  {
    image: "/images/brookes.jpg",
    caption: "The infamous 1788 diagram of the slave ship Brookes, published by abolitionists to expose the horrific, suffocating conditions enslaved Africans endured during the Middle Passage. This copy is held by the British Library."
  },
  {
    image: "/images/cape_coast.jpg",
    caption: "An engraving of Cape Coast Castle, a European slave fort on the Gold Coast (modern-day Ghana), heavily fortified with cannons to protect slave ships from rival empires and constant uprisings by enslaved people."
  },
  {
    image: "/images/industry_idleness.png",
    caption: "An 18th-century engraving by William Hogarth ('Industry and Idleness', Plate 1, 1747) showing young apprentices working hard at their weaving looms as Britain's cloth industry began to explode."
  }
];

if (data.guided_reading) {
  for (let i = 0; i < data.guided_reading.length; i++) {
    if (injections[i]) {
      data.guided_reading[i].cover_image = injections[i].image;
      data.guided_reading[i].cover_caption = injections[i].caption;
    }
  }
}

const outStr = 'const early_modern_world = ' + JSON.stringify(data, null, 2) + ';\nexport default early_modern_world;\n';
fs.writeFileSync('early_modern_world/data.js', outStr);
console.log('Successfully injected images into early_modern_world/data.js');
