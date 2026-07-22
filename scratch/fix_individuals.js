const fs = require('fs');

async function fixData() {
  const dataPath = 'edexcel_medicine/data.js';
  const { default: unitData } = await import('file:///' + __dirname.replace(/\\/g, '/') + '/../' + dataPath);
  
  if (!unitData || !unitData.lessons) {
    console.log("Could not load unitData");
    return;
  }
  
  const individualsToPlace = [...unitData.key_individuals];
  const alreadyPlaced = new Set();
  
  // Custom name matchers for people like "Florey and Chain"
  const nameMatchers = {
    "Howard Florey & Ernst Chain": ["Florey", "Chain"],
    "James Watson & Francis Crick": ["Watson", "Crick"],
    "Alexander Fleming": ["Fleming"],
    "Louis Pasteur": ["Pasteur"],
    "Robert Koch": ["Koch"],
    "William Harvey": ["Harvey"],
    "Andreas Vesalius": ["Vesalius"],
    "Thomas Sydenham": ["Sydenham"],
    "Edward Jenner": ["Jenner"],
    "Florence Nightingale": ["Nightingale"],
    "James Simpson": ["Simpson"],
    "Joseph Lister": ["Lister"],
    "John Snow": ["Snow"],
    "Edwin Chadwick": ["Chadwick"],
    "Marie Curie": ["Curie"],
    "Paul Ehrlich": ["Ehrlich"],
    "Gerhard Domagk": ["Domagk"],
    "Sahachiro Hata": ["Hata"],
    "Rosalind Franklin": ["Franklin"],
    "Wilhelm Roentgen": ["Roentgen"],
    "Karl Landsteiner": ["Landsteiner"],
    "Hugh Owen Thomas": ["Hugh Owen Thomas"], // Be specific
    "Oswald Hope Robertson": ["Oswald Robertson"],
    "Harold Gillies": ["Gillies"]
  };
  
  // First, find existing tags and mark them as placed
  unitData.lessons.forEach(lesson => {
    lesson.narrative_blocks.forEach(block => {
      if (typeof block.text === 'string' && block.text.match(/^\[Key Individual:\s*(.+)\]$/i)) {
        const kiMatch = block.text.match(/^\[Key Individual:\s*(.+)\]$/i);
        alreadyPlaced.add(kiMatch[1].trim().toLowerCase());
      }
    });
  });

  console.log("Already placed manually:", [...alreadyPlaced]);

  let modifications = [];
  
  unitData.lessons.forEach(lesson => {
    let newBlocks = [];
    
    lesson.narrative_blocks.forEach((block, blockIndex) => {
      newBlocks.push(block);
      
      if (typeof block.text === 'string') {
        const textLower = block.text.toLowerCase();
        
        individualsToPlace.forEach(person => {
          const personNameLower = person.name.toLowerCase();
          
          if (alreadyPlaced.has(personNameLower)) return;
          
          let mentioned = false;
          // Check full name
          if (textLower.includes(personNameLower)) {
            mentioned = true;
          } else if (nameMatchers[person.name]) {
            // Check any of the aliases
            mentioned = nameMatchers[person.name].some(alias => textLower.includes(alias.toLowerCase()));
          }
          
          if (mentioned) {
            newBlocks.push({ text: `[Key Individual: ${person.name}]` });
            alreadyPlaced.add(personNameLower);
            modifications.push(`Added ${person.name} to lesson ${lesson.title}`);
          }
        });
      }
    });
    
    lesson.narrative_blocks = newBlocks;
  });
  
  // Export the updated object to a string
  const outputStr = `export default ${JSON.stringify(unitData, null, 2)};`;
  fs.writeFileSync('scratch/data_proposed.js', outputStr, 'utf8');
  
  console.log("Proposed modifications:");
  modifications.forEach(m => console.log(" - " + m));
}

fixData();
