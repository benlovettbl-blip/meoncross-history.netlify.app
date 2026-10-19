const fs = require('fs');
const path = require('path');

const dataJsonPath = path.join(__dirname, '..', 'data', 'ks2_ww2.json');
const dataJsPath = path.join(__dirname, '..', 'units', 'ks2_ww2', 'data.js');

const unit = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));

// Exact mapping by [lessonIndex, blockIndex]
const exactSourceIdeas = {
  // L1 B1 (Gas mask drill)
  '0,0': [
    'Muscle Memory & Preparedness: Routine drills trained children to put on their respirators within seconds without panic in the event of a deadly poison gas attack.',
    'Sensory & Physical Discomfort: The rubber felt hot, sticky, and smelled strongly of disinfectant and charcoal; eyepieces misted up and voices sounded muffled and distant.',
    'Normalising Wartime Disruption: Practising while sitting at neat wooden desks showed how wartime dangers quickly became part of ordinary daily childhood routines.',
  ],
  // L2 B1 (Evacuee label)
  '1,0': [
    "Instant Visual Identification: In chaotic railway stations and village halls, billeting officers needed to read a child's name, home town, and destination at a single glance without opening bags.",
    'Young Children & Lost Luggage: Many evacuees were toddlers aged 3 to 5 who could not spell their names or remember addresses, and suitcases frequently went missing on trains.',
    'Systematic Billeting: Labels allowed officials in host towns to tick children off arrival manifests and match them systematically with local foster families.',
  ],
  // L3 B1 (Kindertransport arrival)
  '2,0': [
    'Administrative Tracking & Welfare: Numbered cardboard tags matched children to British sponsor guarantees, foster records, and medical files to ensure no refugee went missing.',
    'Heartbreaking Separation: Children felt terrified, confused, and heartbroken after saying farewell to parents at continental railway stations, often never knowing if they would see them again.',
    'Language & Culture Shock: Arriving in a foreign port surrounded by adults speaking only English caused intense loneliness, mixed with relief at reaching physical safety.',
  ],
  // L4 B1 (Anderson shelter)
  '3,0': [
    'Essential Warmth & Survival: Families needed heavy woollen blankets, overcoats, gas masks, a torch or candles with matches, and flasks of hot tea or water.',
    'Emotional Distraction: Favourite teddy bears, comics, reading books, playing cards, or a portable wireless radio helped children cope with the terrifying screech and blast of bombs.',
    'Harsh Shelter Realities: Half-buried in cold, wet garden soil, Anderson shelters frequently flooded with puddle water, making thick rugs and hot water bottles crucial.',
  ],
  // L5 B1 (Dig for Victory)
  '4,0': [
    'Empowering Young Citizens: It demonstrated to children that even though they were too young to fight, digging, weeding, and watering vegetables was a vital way they could help Britain win.',
    'Encouraging Family Co-operation: Cheerful images of children made food production feel like a shared, rewarding family adventure rather than an exhausting chore.',
    "Protecting Atlantic Merchant Sailors: Growing food at home saved valuable cargo ship space and directly reduced Britain's reliance on merchant convoys targeted by German U-boats.",
  ],
  // L6 B1 (Land Girls lunch)
  '5,0': [
    'Practical Uniforms for Hard Manual Work: Heavy corduroy breeches, knitted green jerseys, and sturdy boots show the physical demands of farming through winter mud and summer heat.',
    'Comradeship & Shared Meals: Sitting together under a shady tree sharing sandwiches highlights the close friendships, team spirit, and high morale of Land Army volunteers.',
    'Vital Domestic Food Production: The expansive harvest fields and farm tools in the background emphasize the immense physical effort required to prevent Britain from being starved into surrender.',
  ],
  // L7 B1 (Football team)
  '6,0': [
    'Universal Childhood Passions: They look like any proud, happy school sports team—wearing striped shirts, smiling, and celebrating together with arms around each other.',
    "Invisible Faith & Heritage: You cannot tell a person's religion, culture, or background simply by looking at them; they were regular German schoolchildren who loved football.",
    'Humanising Historical Reality: This photograph proves that before discriminatory Nazi laws took away their rights, Jewish families lived completely normal, integrated lives in their communities.',
  ],
  // L7 B3 (School Ban Law)
  '6,2': [
    'Confusion & Injustice: Children felt deeply bewildered and hurt because they had broken no rules, yet were punished and excluded simply because of their identity.',
    'Isolation from Friends: Being banned from state schools cut children off from classmates, teachers, and playgrounds, creating acute feelings of loneliness and rejection.',
    "Loss of Safety & Routine: School provided a stable, predictable daily routine; losing it shattered children's sense of security and made the future feel threatening.",
  ],
  // L8 B1 (Enigma)
  '7,0': [
    'Astronomical Mathematical Possibilities: With three rotating wheels, 26 positions each, and front plugboard cables, Enigma generated over 158 quintillion (158 million million million) possible settings.',
    'Daily Midnight Setting Changes: German code clerks reset the wheel combinations, ring settings, and plug connections every 24 hours, completely resetting the code puzzle every midnight.',
    'Stepped Mechanical Scrambling: Each keypress caused the rotors to step forward, so typing the same letter twice produced two completely different scrambled output letters.',
  ],
  // L8 B2 (Bombe machine)
  '7,1': [
    'Human Physical Limitations: Human mathematicians would have taken weeks or months to test potential wheel settings by hand; by then, military orders were already carried out.',
    "High-Speed Electrical Elimination: Turing and Welchman's electromechanical Bombe tested thousands of letter combinations every second, rapidly discarding impossible contradictions.",
    'Pioneering Modern Computing: Alan Turing understood that only a machine operating with pure mathematical logic could defeat another machine, laying the foundation for modern computers.',
  ],
  // L9 B1 (Nicholas Winton with child)
  '8,0': [
    'Moral Courage & Conscience: A rescuer acts on personal conscience, believing that saving innocent lives in danger takes priority over personal convenience, comfort, or official red tape.',
    'Practical Determination: Rather than just feeling sympathy, Winton and Chadwick took concrete action—setting up desks in Prague, raising £50 guarantees, and securing visas.',
    'Humility & Selflessness: True heroes rarely boast; Winton regarded saving 669 children as ordinary human decency and returned quietly to normal life without seeking fame or medals.',
  ],
  // L9 B2 (Scrapbook)
  '8,1': [
    'Official Proof for Border Authorities: Detailed index cards with names, birth dates, and photos were vital to satisfy British immigration officials and obtain entry permits.',
    "Preserving True Roots & Identities: Scrapbook entries protected children's real identities and heritage, ensuring they would not forget who their families were.",
    'Lifesaving Historical Evidence: Fifty years later, this single scrapbook was the only surviving proof that allowed hundreds of rescued adults to discover who had saved their lives.',
  ],
  // L10 B1 (VE Day party)
  '9,0': [
    'Overwhelming Joy & Relief: Communities celebrated the end of nearly six years of terrifying night raids, wailing sirens, blackouts, and the daily fear of sudden death.',
    'Heartbreaking Personal Grief: Amid the street dancing, union jacks, and music, many families quietly wept for fathers, brothers, and sons who had died and would never return.',
    'The Daunting Reality of Rebuilding: Cities lay in ruins, food rationing would continue for years, and families faced the exhausting challenge of rebuilding shattered lives.',
  ],
};

let applied = 0;
for (const [key, ideas] of Object.entries(exactSourceIdeas)) {
  const [lIdx, bIdx] = key.split(',').map(Number);
  const lesson = unit.lessons[lIdx];
  if (
    lesson &&
    lesson.narrative_blocks &&
    lesson.narrative_blocks[bIdx] &&
    lesson.narrative_blocks[bIdx].source
  ) {
    lesson.narrative_blocks[bIdx].source.discussion_ideas = ideas;
    lesson.narrative_blocks[bIdx].source.example_answers = ideas;
    applied++;
    console.log(
      `Applied to L${lIdx + 1} B${bIdx + 1}: ${lesson.narrative_blocks[bIdx].source.title}`,
    );
  }
}

console.log(`Successfully mapped ${applied} sources with exemplar ideas.`);

// Write back to data/ks2_ww2.json
fs.writeFileSync(dataJsonPath, JSON.stringify(unit, null, 2), 'utf8');

// Generate clean units/ks2_ww2/data.js
const jsContent = `const unitData = ${JSON.stringify(unit, null, 2)};\n\nexport default unitData;\nexport { unitData };\n`;
fs.writeFileSync(dataJsPath, jsContent, 'utf8');
console.log('Successfully wrote units/ks2_ww2/data.js');
