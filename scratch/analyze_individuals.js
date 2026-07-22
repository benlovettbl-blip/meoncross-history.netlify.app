const fs = require('fs');

async function analyze() {
  const dataJsStr = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
  
  // Extract key individuals
  const match = dataJsStr.match(/"key_individuals":\s*(\[[\s\S]*?\])\s*};/);
  if (!match) {
    console.log("Could not find key_individuals");
    return;
  }
  
  // We can't just JSON.parse because it's not valid JSON (might have trailing commas, etc.)
  // Let's use a simpler regex to extract names
  const names = [];
  const nameRegex = /"name":\s*"([^"]+)"/g;
  let nameMatch;
  while ((nameMatch = nameRegex.exec(match[1])) !== null) {
    names.push(nameMatch[1]);
  }
  
  console.log("Key Individuals found:", names.length);
  
  // We need to parse the unitData object properly.
  // We can import it.
  const { default: unitData } = await import('file:///' + __dirname.replace(/\\/g, '/') + '/../edexcel_medicine/data.js');
  
  if (!unitData || !unitData.lessons) {
    console.log("Could not load unitData");
    return;
  }
  
  const individualsToPlace = [...unitData.key_individuals.map(k => k.name)];
  const alreadyPlaced = new Set();
  
  console.log("---- ANALYSIS ----");
  unitData.lessons.forEach(lesson => {
    console.log(`\nLesson: ${lesson.title}`);
    let lessonText = '';
    
    // Gather all text to check for mentions
    lesson.narrative_blocks.forEach(block => {
      if (block.text) lessonText += typeof block.text === 'string' ? block.text + '\n' : '';
    });
    
    // Check existing tags
    const existingTags = [];
    lesson.narrative_blocks.forEach(block => {
      if (typeof block.text === 'string' && block.text.match(/^\[Key Individual:\s*(.+)\]$/i)) {
        const kiMatch = block.text.match(/^\[Key Individual:\s*(.+)\]$/i);
        existingTags.push(kiMatch[1].trim());
        alreadyPlaced.add(kiMatch[1].trim().toLowerCase());
      }
    });
    
    if (existingTags.length > 0) {
      console.log(`  Existing tags: ${existingTags.join(', ')}`);
    }
    
    // Check for new first mentions
    const mentions = [];
    individualsToPlace.forEach(name => {
      const nameLower = name.toLowerCase();
      // Skip if already placed ANYWHERE previously, or if it's already in this lesson
      if (!alreadyPlaced.has(nameLower)) {
        // Simple string match in narrative
        if (lessonText.toLowerCase().includes(nameLower)) {
          mentions.push(name);
          alreadyPlaced.add(nameLower); // Mark as placed so we don't place it in future lessons
        }
      }
    });
    
    if (mentions.length > 0) {
      console.log(`  MISSING (First Mention): ${mentions.join(', ')}`);
    }
  });
  
  const neverMentioned = individualsToPlace.filter(name => !alreadyPlaced.has(name.toLowerCase()));
  if (neverMentioned.length > 0) {
    console.log(`\nNEVER MENTIONED IN NARRATIVE: ${neverMentioned.join(', ')}`);
  }
}

analyze();
