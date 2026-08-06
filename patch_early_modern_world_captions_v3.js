const fs = require('fs');
let data = fs.readFileSync('early_modern_world/data.js', 'utf8');

const replacements = [
  {
    target: `"image_caption": "A map of the ancient Silk Road overland and maritime trade routes connecting Asia to Europe."`,
    replacement: `"image_caption": "A map of the ancient Silk Road overland and maritime trade routes connecting Asia to Europe. These routes spanned over 4,000 miles and were traversed primarily by relay systems using camels and horses."`
  },
  {
    target: `"image_caption": "Martin Luther, whose 1517 protests sparked the Protestant Reformation and divided Europe."`,
    replacement: `"image_caption": "Martin Luther, whose 1517 protests sparked the Protestant Reformation and divided Europe. A German monk and professor, Luther translated the Bible into German, using the newly invented printing press to spread his ideas rapidly."`
  },
  {
    target: `"image_caption": "The Armada Portrait, heavy with symbolism, showing Elizabeth resting her hand on a globe covering North America."`,
    replacement: `"image_caption": "The Armada Portrait, heavy with symbolism, showing Elizabeth resting her hand on a globe covering North America. Painted in 1588 after the defeat of the Spanish Armada, it portrays the Queen wearing pearls to symbolize her purity and imperial ambitions."`
  },
  {
    target: `"image_caption": "An engraving of Matoaka (Pocahontas) dressed in English court fashion in 1616, used as propaganda by the Virginia Company."`,
    replacement: `"image_caption": "An engraving of Matoaka (Pocahontas) dressed in English court fashion in 1616, used as propaganda by the Virginia Company. She was presented to London society as 'Lady Rebecca' to secure further financial investment for the struggling Jamestown colony."`
  },
  {
    target: `"image_caption": "Sir Thomas Roe presenting his credentials to the wealthy and powerful Mughal Emperor Jahangir in 1615."`,
    replacement: `"image_caption": "Sir Thomas Roe presenting his credentials to the wealthy and powerful Mughal Emperor Jahangir in 1615. Roe spent four years at the court trying to negotiate exclusive trading rights for the East India Company, though the Emperor remained largely unimpressed by the English."`
  },
  {
    target: `"image_caption": "The execution of King Charles I outside the Banqueting House in Whitehall, 1649."`,
    replacement: `"image_caption": "The execution of King Charles I outside the Banqueting House in Whitehall, 1649. The King was executed for high treason, marking the first time in history a reigning English monarch was legally tried and killed by his own subjects."`
  },
  {
    target: `"image_caption": "Portrait of Oliver Cromwell, who ruled as Lord Protector after the execution of King Charles I."`,
    replacement: `"image_caption": "Portrait of Oliver Cromwell, who ruled as Lord Protector after the execution of King Charles I. A fiercely Puritan military leader, Cromwell refused the title of King but ruled with absolute power over the short-lived English republic."`
  },
  {
    target: `"image_caption": "The docks of the British East India Company in London, bustling with global trade and imperial wealth."`,
    replacement: `"image_caption": "The docks of the British East India Company in London, bustling with global trade and imperial wealth. By the late 1700s, the Company controlled its own private army of over 200,000 soldiers, larger than the official British army."`
  },
  {
    target: `"image_caption": "An 18th-century map of Jamaica. The rugged interior provided sanctuary for Maroon communities fighting British colonial forces."`,
    replacement: `"image_caption": "An 18th-century map of Jamaica. The rugged interior provided sanctuary for Maroon communities fighting British colonial forces. The Maroons, descended from escaped African slaves, waged a highly successful guerrilla war in the Cockpit Country for over eighty years."`
  },
  {
    target: `"image_caption": "The Triangular Trade linked Europe, Africa, and the Americas in a continuous loop of capitalist exploitation."`,
    replacement: `"image_caption": "The Triangular Trade linked Europe, Africa, and the Americas in a continuous loop of capitalist exploitation. This massive network forcefully transported over 12 million enslaved Africans across the Atlantic, fundamentally reshaping the demographics and economies of three continents."`
  },
  {
    target: `"image_caption": "Olaudah Equiano, an abolitionist who purchased his freedom and exposed the horrors of slavery through his bestselling 1789 autobiography."`,
    replacement: `"image_caption": "Olaudah Equiano, an abolitionist who purchased his freedom and exposed the horrors of slavery through his bestselling 1789 autobiography. His book went through nine editions in his lifetime, and he toured across Britain to drum up immense public support for the abolitionist movement."`
  },
  {
    target: `"image_caption": "William Hogarth's 1751 engraving 'Gin Lane' depicts the horrifying social decay, poverty, and alcohol addiction rampant in 18th-century London slums."`,
    replacement: `"image_caption": "William Hogarth's 1751 engraving 'Gin Lane' depicts the horrifying social decay, poverty, and alcohol addiction rampant in 18th-century London slums. Hogarth created this print as a direct piece of propaganda to support the Gin Act of 1751, seeking to reduce the mass consumption of cheap spirits."`
  },
  {
    target: `"image_caption": "An 18th-century map showing the expansion of turnpike roads across London and surrounding regions, rapidly increasing the speed of internal trade."`,
    replacement: `"image_caption": "An 18th-century map showing the expansion of turnpike roads across London and surrounding regions, rapidly increasing the speed of internal trade. Turnpike trusts were private companies allowed to charge tolls to road users, sparking widespread riots among the rural poor who could not afford to travel."`
  }
];

let allGood = true;
for (const {target, replacement} of replacements) {
  if (!data.includes(target)) {
    console.error('Could not find target:', target.substring(0, 50) + '...');
    allGood = false;
  } else {
    data = data.replace(target, replacement);
  }
}

if (allGood) {
  fs.writeFileSync('early_modern_world/data.js', data, 'utf8');
  console.log('Successfully patched remaining captions in early_modern_world/data.js');
} else {
  console.log('Failed to patch some items. No changes made.');
}
