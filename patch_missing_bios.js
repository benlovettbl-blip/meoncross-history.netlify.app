const fs = require('fs');

async function patchBios() {
  const file = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const bios = {
    "Pope Alexander VI": {
      role: "Head of the Catholic Church",
      bio: "The Pope who issued the 1494 Treaty of Tordesillas, splitting the newly discovered world between Spain and Portugal."
    },
    "Don Francisco de Zárate": {
      role: "Spanish Nobleman",
      bio: "A Spanish nobleman who was captured by Sir Francis Drake. His accounts provided valuable insight into Drake's privateering."
    },
    "King James I": {
      role: "King of England (1603-1625)",
      bio: "The first Stuart King of England who famously despised smoking but oversaw the early expansion of English colonies in America."
    },
    "Chief Powhatan": {
      role: "Leader of the Powhatan Confederacy",
      bio: "The powerful leader of the Algonquian tribes in Virginia who interacted with the early English settlers at Jamestown."
    },
    "John Bradshaw": {
      role: "President of the High Court of Justice",
      bio: "The judge who presided over the trial of King Charles I, leading to the King's execution and the birth of the English Republic."
    },
    "Martin Noell": {
      role: "London Merchant & Financier",
      bio: "A powerful merchant who financed Cromwell's Western Design and heavily profited from the early transatlantic slave trade."
    },
    "Charles II": {
      role: "King of England (1660-1685)",
      bio: "The King who was restored to the throne in 1660 and subsequently founded the Royal African Company to monopolize the slave trade."
    },
    "Gerrard Winstanley": {
      role: "Leader of the Diggers",
      bio: "A radical English Protestant who founded the True Levellers (Diggers), arguing that the earth was a 'common treasury' for all."
    }
  };

  let updatedCount = 0;
  for (const person of data.key_individuals) {
    if (bios[person.name]) {
      person.role = bios[person.name].role;
      person.bio = bios[person.name].bio;
      updatedCount++;
    }
  }

  if (updatedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(file, output);
    console.log(`Updated ${updatedCount} missing bios in data.js`);
  }
}

patchBios().catch(console.error);
