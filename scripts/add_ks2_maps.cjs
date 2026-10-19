const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'public', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const lessons = db['ks2_ww2'].data.lessons;

// 1. LESSON 2: Operation Pied Piper & Regional Evacuation Commands
const lesson2 = lessons.find((l) => l.id === 'lesson_2');
if (lesson2) {
  lesson2.narrative_blocks[1].source = {
    letter: 'B',
    title:
      'Source B (Educational Map): Operation Pied Piper — British Evacuation Zones & Railway Routes (1939)',
    image: '/units/ks2_ww2/assets/evacuation_map_1939.jpg',
    is_artwork: false,
    caption:
      'Primary educational map based on official Ministry of Health 1939 records. Illustrates major evacuation danger cities (red circles), safe rural reception havens (green zones across Wales, Devon, and the Yorkshire Dales), and the main railway routes that relocated 1.5 million British children in September 1939.',
    citation:
      'The National Archives (UK) / Ministry of Health Scheme Records (MH 102) & Imperial War Museums Archive.',
    context:
      'In September 1939, the British government initiated Operation Pied Piper to relocate 1.5 million schoolchildren and mothers away from urban centers vulnerable to air attack. **Hinge Question:** Looking at the red danger cities and green reception areas, why did the British government evacuate London children westward into Wales and Devon rather than billeting them along the eastern coastline?',
    hinge_question:
      'Looking at the red danger cities and green reception areas, why did the British government evacuate London children westward into Wales and Devon rather than billeting them along the eastern coastline?',
    discussion_ideas: [
      'Geographical Safety & Flight Distance: German bombers flying from continental Europe had to cross southern England; counties like Devon, Cornwall, and rural Wales were far beyond early bomber ranges and contained no strategic munitions factories.',
      'Contrast Between City & Country: Evacuating children from crowded industrial cities (with coal smoke and tenements) to agricultural valleys meant adapting to fresh air, livestock, and completely different regional dialects.',
      'Transportation Logistics: Mainline railways radiated from London and Birmingham directly westward, allowing tens of thousands of children to be relocated efficiently within just 72 hours.',
    ],
    example_answers: [
      'Geographical Safety & Flight Distance: German bombers flying from continental Europe had to cross southern England; counties like Devon, Cornwall, and rural Wales were far beyond early bomber ranges and contained no strategic munitions factories.',
      'Contrast Between City & Country: Evacuating children from crowded industrial cities (with coal smoke and tenements) to agricultural valleys meant adapting to fresh air, livestock, and completely different regional dialects.',
      'Transportation Logistics: Mainline railways radiated from London and Birmingham directly westward, allowing tens of thousands of children to be relocated efficiently within just 72 hours.',
    ],
  };

  lesson2.teacher_notes.source_context =
    "Source A is an authentic photograph (1939) showing a London police officer checking an evacuee toddler's luggage label. Source B is an educational cartographic map based on official Ministry of Health records illustrating Britain's evacuation danger cities (red circles), safe rural reception havens (green zones across Wales, Devon, and Yorkshire), and the primary railway routes that carried 1.5 million children. **Hinge Question:** Looking at the red danger cities and green reception areas, why did the British government evacuate London children westward into Wales and Devon rather than billeting them along the eastern coastline?";
  console.log('[✓] Updated Lesson 2 with Pupil-Friendly Evacuation Zones & Routes Map (Source B)');
}

// 2. LESSON 3: The Kindertransport
const lesson3 = lessons.find((l) => l.id === 'lesson_3');
if (lesson3) {
  lesson3.narrative_blocks[1].source = {
    letter: 'B',
    title:
      'Source B (Archival Map): The Kindertransport — European Escape Routes to Great Britain (1938–1939)',
    image: '/units/ks2_ww2/assets/kindertransport_route_map.jpg',
    is_artwork: false,
    caption:
      'Authentic historical route map documenting the 800-mile escape routes of nearly 10,000 Jewish refugee children travelling from departure hubs in Berlin, Vienna, Prague, Breslau, and Frankfurt across Nazi Germany to the Dutch border, ferry from Hook of Holland to Harwich, and train to London Liverpool Street Station.',
    citation:
      'United States Holocaust Memorial Museum (USHMM) / Warner Bros. Educational Archive (Into the Arms of Strangers Study Guide, p. 13).',
    context:
      'Following the violent Kristallnacht pogroms in November 1938, volunteers and parliamentarians coordinated special rescue trains to evacuate unaccompanied refugee children before war erupted. **Hinge Question:** Why was it essential for the refugee trains to pass through the Dutch border before German authorities could intercept them, and what does the scale of this international route reveal about the bravery of the organizers and parents?',
    hinge_question:
      'Why was it essential for the refugee trains to pass through the Dutch border before German authorities could intercept them, and what does the scale of this international route reveal about the bravery of the organizers and parents?',
    discussion_ideas: [
      'Escaping Hostile Territory: The trains had to travel across hundreds of miles of Nazi Germany; until reaching the Dutch border at Bentheim, the children remained in extreme danger of being detained.',
      'International Scale & Multimodal Journey: The rescue required coordinated trains, border transit permits, a North Sea overnight ferry crossing, and reception at London Liverpool Street Station.',
      'Agonizing Parental Sacrifice: Parents kissed their children goodbye at Prague or Vienna railway stations knowing they might never see them again, trusting foreign volunteers across the sea.',
    ],
    example_answers: [
      'Escaping Hostile Territory: The trains had to travel across hundreds of miles of Nazi Germany; until reaching the Dutch border at Bentheim, the children remained in extreme danger of being detained.',
      'International Scale & Multimodal Journey: The rescue required coordinated trains, border transit permits, a North Sea overnight ferry crossing, and reception at London Liverpool Street Station.',
      'Agonizing Parental Sacrifice: Parents kissed their children goodbye at Prague or Vienna railway stations knowing they might never see them again, trusting foreign volunteers across the sea.',
    ],
  };

  lesson3.teacher_notes.source_context =
    'Source A is a historical photograph (1939) showing refugee girls arriving on the Kindertransport wearing numbered identity tags. Source B is an authentic archival route map from the United States Holocaust Memorial Museum (USHMM) and Warner Bros. study guide showing the 800-mile journey from Prague, Vienna, and Berlin across Germany to Hook of Holland, Harwich, and London. **Hinge Question:** Why was it essential for the refugee trains to pass through the Dutch border before German authorities could intercept them, and what does the scale of this international route reveal about the bravery of the organizers and parents?';
  console.log('[✓] Updated Lesson 3 with USHMM Archival Kindertransport Route Map (Source B)');
}

// 3. LESSON 4: The Blitz
const lesson4 = lessons.find((l) => l.id === 'lesson_4');
if (lesson4) {
  lesson4.narrative_blocks[1].source = {
    letter: 'B',
    title:
      'Source B (Archival Record): London Blitz Bomb Density Map — Ministry of Home Security (HO 193/45)',
    image: '/units/ks2_ww2/assets/blitz_targets_map.jpg',
    is_artwork: false,
    caption:
      "Primary archival map (Home Office Record HO 193/45, stamped 'MOST SECRET') recording the exact density and concentration of high-explosive bombs dropped by the Luftwaffe across Greater London from the outbreak of hostilities through October 1941, highlighting devastating clusters along the River Thames docks and East End industrial sectors.",
    citation:
      'The National Archives (UK), Ministry of Home Security / Home Office Air Raid Records, HO 193/45 (1941).',
    context:
      'Between September 1940 and May 1941, German bombers attacked London for 57 consecutive nights, targeting the docks, factories, and residential streets. **Hinge Question:** Looking at the dark concentration of bomb density along the River Thames and East End, why were families in these working-class riverside boroughs at far greater risk than those living on the rural fringes of London?',
    hinge_question:
      'Looking at the dark concentration of bomb density along the River Thames and East End, why were families in these working-class riverside boroughs at far greater risk than those living on the rural fringes of London?',
    discussion_ideas: [
      'Economic & Maritime Warfare: Destroying deep-water docks in London and port cities stopped food, weapons, and fuel from reaching British troops, factories, and civilians.',
      'Industrial & Population Centers: Heavily populated areas near factories and docks suffered immense civilian loss, forcing thousands of families to crowd into underground stations and back garden shelters.',
      'Luftwaffe Night Bombing Patterns: Navigators used the reflecting silver curve of the River Thames as an unmistakable visual landmark in the dark to locate central London and the docklands.',
    ],
    example_answers: [
      'Economic & Maritime Warfare: Destroying deep-water docks in London and port cities stopped food, weapons, and fuel from reaching British troops, factories, and civilians.',
      'Industrial & Population Centers: Heavily populated areas near factories and docks suffered immense civilian loss, forcing thousands of families to crowd into underground stations and back garden shelters.',
      'Luftwaffe Night Bombing Patterns: Navigators used the reflecting silver curve of the River Thames as an unmistakable visual landmark in the dark to locate central London and the docklands.',
    ],
  };

  lesson4.teacher_notes.source_context =
    "Source A is a primary photograph (1940) showing a London family nestled inside their curved corrugated Anderson shelter with bunks and blankets. Source B is an authentic primary bomb census map from The National Archives (HO 193/45, marked 'MOST SECRET') showing the heavy density of high-explosive bombs dropped along the Thames and London boroughs during the 1940–1941 Blitz. **Hinge Question:** Looking at the dark concentration of bomb density along the River Thames and East End, why were families in these working-class riverside boroughs at far greater risk than those living on the rural fringes of London?";
  console.log('[✓] Updated Lesson 4 with The National Archives Blitz Bomb Census Map (Source B)');
}

// 4. LESSON 5: Dig for Victory & Wartime Rationing
const lesson5 = lessons.find((l) => l.id === 'lesson_5');
if (lesson5) {
  lesson5.narrative_blocks[1].source = {
    letter: 'B',
    title:
      'Source B (Archival Map): Battle of the Atlantic — Allied Convoy Lifelines & U-Boat Wolf Packs (1941–1943)',
    image: '/units/ks2_ww2/assets/atlantic_lifeline_map.jpg',
    is_artwork: false,
    caption:
      "Historical military chart showing Allied transatlantic merchant convoy routes (HX, SC, ON) transporting essential food, fuel, and munitions from North America to Great Britain, delineating the perilous Mid-Atlantic Air Gap ('Black Pit') beyond Allied air cover where German U-boat wolf packs concentrated.",
    citation:
      'United States Military Academy (USMA) West Point Department of History, The West Point Atlas of American Wars.',
    context:
      'Great Britain imported over 70% of its food before 1939. When German U-boats torpedoed merchant shipping convoys in the Atlantic, the nation faced starvation, making rationing and domestic vegetable farming an urgent matter of national survival. **Hinge Question:** Looking at the vast ocean expanse and the Mid-Atlantic Air Gap where Allied planes could not fly, why did every single sunken merchant ship directly endanger British family food rations at home?',
    hinge_question:
      'Looking at the vast ocean expanse and the Mid-Atlantic Air Gap where Allied planes could not fly, why did every single sunken merchant ship directly endanger British family food rations at home?',
    discussion_ideas: [
      'Island Vulnerability & Food Imports: With 70% of food arriving by sea, sinking merchant ships carrying Canadian wheat, bacon, or sugar directly reduced the weekly rations of British families.',
      "The Mid-Atlantic Air Gap: Outside the range of land-based Allied aircraft, German U-boats operated freely in 'wolf packs', forcing merchant convoys to sail through deadly waters.",
      "The Home Front as a Battleground: Because every cargo ship lost brought Britain closer to starvation, converting lawns and school fields into potato plots directly preserved the nation's wartime lifeline.",
    ],
    example_answers: [
      'Island Vulnerability & Food Imports: With 70% of food arriving by sea, sinking merchant ships carrying Canadian wheat, bacon, or sugar directly reduced the weekly rations of British families.',
      "The Mid-Atlantic Air Gap: Outside the range of land-based Allied aircraft, German U-boats operated freely in 'wolf packs', forcing merchant convoys to sail through deadly waters.",
      "The Home Front as a Battleground: Because every cargo ship lost brought Britain closer to starvation, converting lawns and school fields into potato plots directly preserved the nation's wartime lifeline.",
    ],
  };

  lesson5.teacher_notes.source_context =
    "Source A is an authentic Ministry of Agriculture 'Dig for Victory' poster showing a young child with a garden hoe helping on an allotment. Source B is an authentic historical convoy chart from the West Point Department of History showing the North Atlantic shipping lifelines and the dangerous Mid-Atlantic Air Gap where German U-boats preyed on supply ships. **Hinge Question:** Looking at the vast ocean expanse and the Mid-Atlantic Air Gap where Allied planes could not fly, why did every single sunken merchant ship directly endanger British family food rations at home?";
  console.log('[✓] Updated Lesson 5 with West Point Atlantic Lifeline Convoy Map (Source B)');
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

// Also update dist/database.json if it exists
const distDbPath = path.join(__dirname, '..', 'dist', 'database.json');
if (fs.existsSync(distDbPath)) {
  fs.writeFileSync(distDbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('[✓] Synced updates to dist/database.json');
}

console.log('🎉 Successfully saved database.json with clean authentic archival maps!');
