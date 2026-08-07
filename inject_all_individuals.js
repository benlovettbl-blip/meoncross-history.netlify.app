const fs = require('fs');

async function injectAllIndividuals() {
  const file = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  // First, assign "historical" to all existing individuals
  data.key_individuals.forEach(p => {
    p.type = "historical";
  });

  const newHistorical = [
    {
      name: "Admiral Zheng He",
      role: "Ming Dynasty Explorer",
      type: "historical",
      actions: "<ul><li>Commanded massive fleets of Chinese 'treasure ships' between 1405-1433.</li></ul>",
      achievements: "Projected Chinese maritime power across the Indian Ocean and East Africa decades before European explorers."
    },
    {
      name: "John Hawkins",
      role: "English Privateer & Slave Trader",
      type: "historical",
      actions: "<ul><li>Architect of early English involvement in the Transatlantic Slave Trade, alongside Drake.</li></ul>",
      achievements: "Helped build the Elizabethan navy that defeated the Spanish Armada."
    },
    {
      name: "King Philip II",
      role: "King of Spain",
      type: "historical",
      actions: "<ul><li>Ruled a vast global Catholic empire; launched the Spanish Armada against England in 1588.</li></ul>",
      limitations: "His rigid tactics and overextension drained the massive wealth extracted from the Americas."
    },
    {
      name: "Henry VIII",
      role: "King of England",
      type: "historical",
      actions: "<ul><li>Broke England away from the Catholic Church in 1534 to secure an annulment, fundamentally altering English religion and politics.</li></ul>"
    },
    {
      name: "Pope Alexander VI",
      role: "Head of the Catholic Church",
      type: "historical",
      actions: "<ul><li>Issued the 1494 Treaty of Tordesillas, arrogantly dividing the entire undiscovered world between Spain and Portugal.</li></ul>"
    },
    {
      name: "Sir Walter Raleigh",
      role: "English Explorer & Courtier",
      type: "historical",
      actions: "<ul><li>Sponsored the doomed Roanoke colony attempt in the 1580s; popularised tobacco in England.</li></ul>"
    },
    {
      name: "Mary, Queen of Scots",
      role: "Queen of Scotland",
      type: "historical",
      actions: "<ul><li>A Catholic claimant to the English throne whose execution by Elizabeth I provoked the Spanish Armada.</li></ul>"
    },
    {
      name: "Don Francisco de Zárate",
      role: "Spanish Captain",
      type: "historical",
      actions: "<ul><li>Captured by Francis Drake in 1579, leaving behind a famous primary source account of Drake's character and piracy.</li></ul>"
    },
    {
      name: "King James I",
      role: "King of England and Scotland",
      type: "historical",
      actions: "<ul><li>Received Pocahontas at court; granted charters to early colonial companies like the Virginia Company.</li></ul>"
    },
    {
      name: "John Rolfe",
      role: "English Planter",
      type: "historical",
      actions: "<ul><li>Married Pocahontas (Matoaka) in 1614; introduced a sweet strain of Caribbean tobacco that made Jamestown profitable.</li></ul>"
    },
    {
      name: "Chief Powhatan",
      role: "Indigenous Leader",
      type: "historical",
      actions: "<ul><li>Leader of the Powhatan Confederacy who initially kept the starving Jamestown colonists alive through trade before relations violently collapsed.</li></ul>"
    },
    {
      name: "Emperor Jahangir",
      role: "Mughal Emperor",
      type: "historical",
      actions: "<ul><li>Ruled 25% of global GDP; permitted the English East India Company to build small trading posts, viewing them as insignificant merchants.</li></ul>"
    },
    {
      name: "Sir Thomas Roe",
      role: "English Diplomat",
      type: "historical",
      actions: "<ul><li>Spent three years at the Mughal Court (1615-1618) begging for trading rights for the East India Company.</li></ul>"
    },
    {
      name: "John Bradshaw",
      role: "Judge",
      type: "historical",
      actions: "<ul><li>Served as President of the High Court of Justice that shockingly tried and condemned King Charles I to death in 1649.</li></ul>"
    },
    {
      name: "Martin Noell",
      role: "London Merchant",
      type: "historical",
      actions: "<ul><li>Grew immensely wealthy from Caribbean sugar and slavery; helped financially back Oliver Cromwell's New Model Army.</li></ul>"
    },
    {
      name: "Charles II",
      role: "King of England",
      type: "historical",
      actions: "<ul><li>Restored to the throne in 1660 after the collapse of the English Republic, marking the 'Restoration'.</li></ul>"
    },
    {
      name: "Gerrard Winstanley",
      role: "Radical Leader (The Diggers)",
      type: "historical",
      actions: "<ul><li>Led a radical movement during the Civil War attempting to abolish private property and establish a fully equal, agrarian society.</li></ul>"
    },
    {
      name: "William Wilberforce",
      role: "English Abolitionist",
      type: "historical",
      actions: "<ul><li>Led the parliamentary campaign against the slave trade, culminating in the 1807 Abolition Act.</li></ul>"
    },
    {
      name: "Thomas Clarkson",
      role: "Abolitionist Campaigner",
      type: "historical",
      actions: "<ul><li>Travelled thousands of miles gathering horrific physical evidence (shackles, ship diagrams) to expose the realities of the slave trade to the British public.</li></ul>"
    }
  ];

  const newHistorians = [
    {
      name: "Kritovoulos of Imbros",
      role: "Greek Scholar & Historian",
      type: "historian",
      bio: "A Greek scholar who lived through the fall of the Byzantine Empire. Instead of resisting, he entered the service of Sultan Mehmed II.",
      actions: "<ul><li>Wrote a vital, though highly flattering, primary source history of Sultan Mehmed II's conquests.</li></ul>",
      achievements: "Focus: 15th-Century Ottoman Conquest"
    },
    {
      name: "Prof. Peter Frankopan",
      role: "Professor of Global History, Oxford",
      type: "historian",
      bio: "He is famous for challenging Eurocentric history, arguing that for thousands of years the true centre of global wealth and power lay in Asia.",
      actions: "<ul><li>Wrote the bestselling book 'The Silk Roads' (2015).</li></ul>",
      achievements: "Focus: Global & Silk Road History"
    },
    {
      name: "Dr. Geoffrey Parker",
      role: "Leading Expert on the Spanish Empire",
      type: "historian",
      bio: "His revisionist work on the Spanish Armada argues that the English victory was due to Spanish logistical failures and superior English ship design.",
      actions: "<ul><li>Revolutionised the understanding of Early Modern Warfare.</li></ul>",
      achievements: "Focus: Early Modern Warfare & Spain"
    },
    {
      name: "Sir John Seeley",
      role: "Victorian Historian",
      type: "historian",
      bio: "A 19th-century historian writing at the height of the British Empire. He famously argued that the British Empire was acquired 'in a fit of absence of mind'.",
      actions: "<ul><li>Wrote 'The Expansion of England' (1883).</li></ul>",
      achievements: "Focus: 19th-Century British Imperialism"
    },
    {
      name: "Prof. Shashi Tharoor",
      role: "Indian Politician & Historian",
      type: "historian",
      bio: "A former UN Under-Secretary-General. He aggressively dismantles the myth of a 'benevolent' British Empire.",
      actions: "<ul><li>Wrote 'Inglorious Empire' (2017), focusing on how corporate entities like the East India Company violently extracted wealth from India.</li></ul>",
      achievements: "Focus: British Colonial History in India"
    },
    {
      name: "Prof. Christopher Hill",
      role: "Marxist Historian",
      type: "historian",
      bio: "One of the most famous Marxist historians of the 20th century, based at Oxford. He argued the English Civil War was a revolutionary class struggle.",
      actions: "<ul><li>Wrote 'The World Turned Upside Down' (1972).</li></ul>",
      achievements: "Focus: 17th-Century English Radicalism"
    },
    {
      name: "Prof. Eric Williams",
      role: "Historian & Prime Minister",
      type: "historian",
      bio: "A brilliant historian who later became the first Prime Minister of Trinidad and Tobago.",
      actions: "<ul><li>Wrote 'Capitalism and Slavery' (1944), proving that Britain abolished slavery because slave rebellions made it economically unviable.</li></ul>",
      achievements: "Focus: Atlantic Slavery & Economics"
    },
    {
      name: "Reginald Coupland",
      role: "Imperial Historian",
      type: "historian",
      bio: "An Oxford historian writing in the 1930s. He promoted the 'Traditional Imperial View' of abolition.",
      actions: "<ul><li>Argued that Britain ended the slave trade purely out of noble, Christian humanitarianism, focusing heavily on white heroes like Wilberforce.</li></ul>",
      achievements: "Focus: Imperial History & Abolition"
    },
    {
      name: "Prof. Roy Porter",
      role: "Medical & Social Historian",
      type: "historian",
      bio: "A highly prolific historian at the Wellcome Institute. He argued that by the 18th century, Britain was a deeply modern, secular, consumer-driven society.",
      actions: "<ul><li>Pioneered the study of social history and the Enlightenment in Britain.</li></ul>",
      achievements: "Focus: The Enlightenment & Social History"
    },
    {
      name: "Prof. J.C.D. Clark",
      role: "Revisionist Historian",
      type: "historian",
      bio: "A prominent revisionist historian who fiercely challenged Porter's view.",
      actions: "<ul><li>Wrote 'English Society 1688-1832' (1985), arguing 18th-century Britain was a traditional, aristocratic 'Ancien Régime' dominated by religion.</li></ul>",
      achievements: "Focus: Revisionist 18th-Century Britain"
    }
  ];

  const allToAdd = [...newHistorical, ...newHistorians];
  
  // Add them if they don't already exist
  for (const person of allToAdd) {
    if (!data.key_individuals.some(p => p.name === person.name)) {
      data.key_individuals.push(person);
    }
  }

  const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(file, output);
  console.log("Successfully injected all new individuals and historians!");
}

injectAllIndividuals().catch(console.error);
