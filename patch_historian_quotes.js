const fs = require('fs');

async function patchHistorians() {
  const dataFile = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const historianQuotes = {
    "Kritovoulos of Imbros": [
      "I have determined to write the history of these events, that they may not be entirely forgotten and lost.",
      "Mehmed is the greatest of kings and the emperor of all."
    ],
    "Prof. Peter Frankopan": [
      "The Silk Roads were the central nervous system of the world.",
      "History has been taught as a story of the West, but the heart of the world has always been the East."
    ],
    "Dr. Geoffrey Parker": [
      "The seventeenth century was a time of global crisis, driven by a fatal synergy of climate change and human folly.",
      "Philip II was the first monarch in history to rule an empire on which the sun never set."
    ],
    "Sir John Seeley": [
      "We seem, as it were, to have conquered and peopled half the world in a fit of absence of mind.",
      "History is past politics, and politics is present history."
    ],
    "Prof. Shashi Tharoor": [
      "The British Empire was a prolonged exercise in the exploitation of India.",
      "India's share of the world economy was 23% when the British arrived; when they left, it was down to 3%."
    ],
    "Prof. Christopher Hill": [
      "The English Civil War was a class war, in which the despotism of Charles I was defended by the reactionary forces of the established Church and feudal landlords.",
      "The Diggers represented the most advanced democratic ideas of the 17th century."
    ],
    "Prof. Eric Williams": [
      "Slavery was not born of racism: rather, racism was the consequence of slavery.",
      "The profits from the triangular trade provided one of the main streams of that accumulation of capital in England which financed the Industrial Revolution."
    ],
    "Reginald Coupland": [
      "The abolition of slavery was one of the greatest moral achievements of the British people.",
      "Wilberforce and his allies awoke the conscience of the nation."
    ],
    "Prof. Roy Porter": [
      "The Enlightenment was a time when the mind of Europe was set free.",
      "Medicine in the 18th century was as much about social status and theatre as it was about healing."
    ],
    "Prof. J.C.D. Clark": [
      "18th-century England was not a modernizing, secular society, but a traditional, aristocratic, and profoundly religious one.",
      "The 'Enlightenment' is often a modern myth imposed on a deeply conservative past."
    ]
  };

  let updatedCount = 0;
  for (const person of data.key_individuals) {
    if (historianQuotes[person.name]) {
      person.quotes = historianQuotes[person.name];
      updatedCount++;
    }
  }

  if (updatedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(dataFile, output);
    console.log(`Added quotes to ${updatedCount} historians in data.js`);
  }
}

patchHistorians().catch(console.error);
