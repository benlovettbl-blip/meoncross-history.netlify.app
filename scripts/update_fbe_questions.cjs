const fs = require('fs');

const idMap = {
  // L1
  source_a_robert_clive: {
    question: 'What can you infer from Source A about how Robert Clive and the East India Company wished to project British military authority in India?',
    question_badge: 'Source Inference',
    question_type: 'Source Inference'
  },
  source_b_shah_alam_clive: {
    question: 'Why did Benjamin West portray the Treaty of Allahabad as a peaceful, dignified legal ceremony rather than a forced military concession?',
    question_badge: 'Author’s Purpose',
    question_type: 'Author’s Purpose'
  },
  // L2
  source_a_brookes_slave_ship: {
    question: 'How useful is Source A for an enquiry into the brutal, dehumanising conditions endured by enslaved Africans during the Middle Passage?',
    question_badge: 'Source Utility',
    question_type: 'Source Utility'
  },
  source_b_olaudah_equiano: {
    question: 'How does Equiano’s dignified, literate presentation in Source B directly challenge contemporary pro-slavery arguments about African inferiority?',
    question_badge: 'Corroboration & Counter-Narrative',
    question_type: 'Corroboration & Counter-Narrative'
  },
  // L3
  source_a_sugar_cane_plantation: {
    question: 'How far does the artist’s position as a visiting British observer affect how convincing Source A is as evidence of daily plantation labour?',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance'
  },
  source_a_william_clark_sugar_plantation: {
    question: 'How far does the artist’s position as a visiting British observer affect how convincing Source A is as evidence of daily plantation labour?',
    question_badge: 'Reliability & Provenance',
    question_type: 'Reliability & Provenance'
  },
  source_b_queen_nanny: {
    question: 'What does the national commemoration of Queen Nanny in Source B reveal about the historical significance of Maroon resistance in Jamaican identity?',
    question_badge: 'Historical Significance',
    question_type: 'Historical Significance'
  },
  source_b_queen_nanny_memorial: {
    question: 'What does the national commemoration of Queen Nanny in Source B reveal about the historical significance of Maroon resistance in Jamaican identity?',
    question_badge: 'Historical Significance',
    question_type: 'Historical Significance'
  },
  // L4
  source_a_boston_massacre: {
    question: 'Why was Paul Revere’s engraving published within weeks of the incident, and how does it use propaganda to turn a chaotic street brawl into cold-blooded British murder?',
    question_badge: 'Propaganda & Motive',
    question_type: 'Propaganda & Motive'
  },
  source_a_paul_revere_boston_massacre: {
    question: 'Why was Paul Revere’s engraving published within weeks of the incident, and how does it use propaganda to turn a chaotic street brawl into cold-blooded British murder?',
    question_badge: 'Propaganda & Motive',
    question_type: 'Propaganda & Motive'
  },
  source_b_boston_tea_party: {
    question: 'What can you infer from this 19th-century lithograph about how Americans later commemorated the Boston Tea Party as an orderly, righteous act of patriotic defiance?',
    question_badge: 'Inference & Mythmaking',
    question_type: 'Inference & Mythmaking'
  },
  source_b_boston_tea_party_currier_ives: {
    question: 'What can you infer from this 19th-century lithograph about how Americans later commemorated the Boston Tea Party as an orderly, righteous act of patriotic defiance?',
    question_badge: 'Inference & Mythmaking',
    question_type: 'Inference & Mythmaking'
  },
  // L5
  source_a_trumbull_declaration: {
    question: 'Why did John Trumbull choose to portray the presentation of the Declaration as a harmonious assembly, and what does this omit about deep revolutionary divisions?',
    question_badge: 'Limitations & Purpose',
    question_type: 'Limitations & Purpose'
  },
  source_a_john_trumbull_declaration: {
    question: 'Why did John Trumbull choose to portray the presentation of the Declaration as a harmonious assembly, and what does this omit about deep revolutionary divisions?',
    question_badge: 'Limitations & Purpose',
    question_type: 'Limitations & Purpose'
  },
  source_b_dunmore_proclamation: {
    question: 'To what extent was Lord Dunmore’s proclamation driven by imperial military desperation rather than a humanitarian commitment to abolish slavery?',
    question_badge: 'Motive & Causation',
    question_type: 'Motive & Causation'
  },
  source_b_lord_dunmore_proclamation: {
    question: 'To what extent was Lord Dunmore’s proclamation driven by imperial military desperation rather than a humanitarian commitment to abolish slavery?',
    question_badge: 'Motive & Causation',
    question_type: 'Motive & Causation'
  }
};

const jsonFiles = ['data/first_british_empire.json', 'public/data/first_british_empire.json'];
jsonFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let updatedCount = 0;
  
  const updateObj = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    if (obj.id && idMap[obj.id]) {
      const r = idMap[obj.id];
      obj.question = r.question;
      obj.question_badge = r.question_badge;
      obj.question_type = r.question_type;
      delete obj.how_useful_question;
      updatedCount++;
    }
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'object') updateObj(obj[key]);
    }
  };
  
  updateObj(d);
  fs.writeFileSync(filePath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Updated ${filePath}: ${updatedCount} source instances updated.`);
});

// Update data.js files
const jsFiles = ['units/first_british_empire/data.js', 'public/units/first_british_empire/data.js'];
jsFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;

  for (const [id, r] of Object.entries(idMap)) {
    // Pattern where how_useful_question comes before id
    const beforePattern = new RegExp('("how_useful_question":\\s*"[^"]+")([\\s\\S]*?"id":\\s*"' + id + '")', 'g');
    content = content.replace(beforePattern, (match, p1, p2) => {
      count++;
      return `"question": ${JSON.stringify(r.question)},\n            "question_badge": ${JSON.stringify(r.question_badge)},\n            "question_type": ${JSON.stringify(r.question_type)}${p2}`;
    });

    // Pattern where how_useful_question comes after id
    const afterPattern = new RegExp('("id":\\s*"' + id + '"[\\s\\S]*?)("how_useful_question":\\s*"[^"]+")', 'g');
    content = content.replace(afterPattern, (match, p1, p2) => {
      count++;
      return `${p1}"question": ${JSON.stringify(r.question)},\n            "question_badge": ${JSON.stringify(r.question_badge)},\n            "question_type": ${JSON.stringify(r.question_type)}`;
    });
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}: ${count} replacements performed.`);
});
