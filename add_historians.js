const fs = require('fs');
const path = require('path');

const biosPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
let biographies = JSON.parse(fs.readFileSync(biosPath, 'utf8'));

const historians = [
  {
    "name": "Kritovoulos of Imbros",
    "group": "Lesson 1: Who held global power in 1450?",
    "role": "15th-Century Scholar",
    "bio": "A 15th-century Greek scholar and historian. Though Greek, he became a subject of the Ottoman Empire and served as an eyewitness and chronicler of the Ottoman siege and capture of Constantinople in 1453.",
    "image": ""
  },
  {
    "name": "Professor Peter Frankopan",
    "group": "Lesson 1: Who held global power in 1450?",
    "role": "Modern Historian",
    "bio": "A modern historian and author of 'The Silk Roads'. He challenges the Eurocentric myth of 1450, arguing that true global wealth and power were concentrated in the East and along the Silk Road networks, not in Western Europe.",
    "image": ""
  },
  {
    "name": "Dr. Geoffrey Parker",
    "group": "Lesson 3: Why was the Spanish Armada defeated?",
    "role": "Modern Revisionist Historian",
    "bio": "A modern revisionist historian who offers a structural view of the Spanish Armada's defeat. He argues that Spain's failure was due to fundamental logistical flaws, poor communication, and bad weather, rather than just English naval superiority.",
    "image": ""
  },
  {
    "name": "Shashi Tharoor",
    "group": "Lesson 4: How did a company conquer a subcontinent?",
    "role": "Modern Historian / Author",
    "bio": "A modern historian and author of 'Inglorious Empire'. He argues that the British East India Company and similar joint-stock companies were specifically designed to ruthlessly extract wealth and subjugate local populations.",
    "image": ""
  },
  {
    "name": "Professor Christopher Hill",
    "group": "Lesson 5: Why did the English kill their King?",
    "role": "Modern Historian",
    "bio": "A prominent Marxist historian who championed the 'Political View' of the English Civil War. He argued that the conflict permanently smashed absolute monarchy and laid the groundwork for modern parliamentary democracy.",
    "image": ""
  },
  {
    "name": "Professor Eric Williams",
    "group": "Lesson 5: Why did the English kill their King?",
    "role": "Modern Historian",
    "bio": "A pioneering historian and author of 'Capitalism and Slavery'. He argued the 'Imperial/Economic View' that the true victors of the Civil War were the Atlantic mercantile class, whose rise to power accelerated the transatlantic slave trade.",
    "image": ""
  },
  {
    "name": "Professor Roy Porter",
    "group": "Lesson 6: Synthesis & Assessment",
    "role": "Modern Historian",
    "bio": "A modern historian of medicine and society who viewed 1750 Britain as a vibrant, modern, and secular consumer society poised for the Industrial Revolution.",
    "image": ""
  },
  {
    "name": "Professor J.C.D. Clark",
    "group": "Lesson 6: Synthesis & Assessment",
    "role": "Modern Historian",
    "bio": "A modern historian who challenges the idea of a rapidly modernizing Britain in 1750. He viewed it as an un-modern, traditional 'Ancien Régime' deeply rooted in aristocratic and religious authority.",
    "image": ""
  }
];

biographies.push(...historians);

fs.writeFileSync(biosPath, JSON.stringify(biographies, null, 2));
console.log("Added 8 historians to biographies.json");
