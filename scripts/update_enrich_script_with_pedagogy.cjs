const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'ks2_ww2', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'ks2_ww2.json');
const dbPath = path.join(rootDir, 'public', 'database.json');
const rightsDbPath = path.join(__dirname, 'master_rights_database.json');
const enrichScriptPath = path.join(__dirname, 'enrich_ks2_ww2_sources.cjs');

// Complete pedagogy dictionary for all 34 authentic KS2 WW2 sources
const KS2_PEDAGOGY = {
  // LESSON 1
  lesson_1_A: {
    hinge_question:
      'Why did the government make carrying a gas mask compulsory for every child, even though poison gas was never actually used against British cities?',
    discussion_ideas: [
      'Immediate Preparedness & Muscle Memory: The government remembered the horrific gas attacks of the First World War and feared enemy bombers could drop poison gas without warning; daily drills ensured that fitting the respirator was an automatic reflex so every child could survive within seconds.',
    ],
  },
  lesson_1_B: {
    hinge_question:
      'How would carrying this cardboard box with you wherever you went change how safe you felt in your everyday life?',
    discussion_ideas: [
      'Constant Reminder of Danger: Carrying the box everywhere—to school, the cinema, and bed—was a constant, chilling reminder that war could reach your doorstep at any moment.',
      "Reassurance & Personal Protection: Having your own respirator within arm's reach gave children and parents a reassuring sense of control and safety against invisible gas attacks.",
    ],
  },
  lesson_1_C: {
    hinge_question:
      'Why was total darkness across every street in Britain considered just as important a defence as fighter aircraft and anti-aircraft guns?',
    discussion_ideas: [
      'Denying Visual Navigation to Bombers: German bomber crews navigated at night by spotting the reflective glint of rivers and city streetlights; a total blackout left pilots flying over a featureless black void, preventing them from targeting docks, factories, and railway junctions.',
    ],
  },

  // LESSON 2
  lesson_2_A: {
    hinge_question:
      'What emotions do you think the children and their parents felt as they stood on the railway platforms saying goodbye?',
    discussion_ideas: [
      "Children's Mixed Bewilderment & Adventure: Many young children felt terrified and bewildered by being separated from their mothers, while some older boys initially imagined the journey as an exciting country adventure.",
      "Parents' Heartbreaking Sacrifice: Mothers had to bravely hide their tears on crowded platforms, sacrificing their own happiness to ensure their sons and daughters would be safe from falling bombs.",
    ],
  },
  lesson_2_B: {
    hinge_question:
      'Why did many evacuees describe arriving at the village billeting hall as the most difficult moment of their journey?',
    discussion_ideas: [
      "The Humiliation of Being Inspected & Picked: Arriving at the village hall felt like a humiliating 'cattle market', where local villagers lined children up to pick the cleanest, biggest, or best-dressed evacuees, leaving sickly, crying, or impoverished children standing until last feeling unwanted.",
    ],
  },
  lesson_2_C: {
    hinge_question:
      'In what ways did evacuation bring two completely different British worlds — inner-city streets and wealthy rural villages — face to face for the very first time?',
    discussion_ideas: [
      'Inner-City Culture Shock: Working-class city children had never seen farm animals, open meadows, or orchards, and were shocked to discover that milk came from cows rather than bottles.',
      "Rural Host Realities: Middle-class host families were often shocked by the deep poverty of city slums, seeing children arrive with head lice, ragged clothes, and no shoes, exposing Britain's deep social inequalities.",
    ],
  },

  // LESSON 3
  lesson_3_A: {
    hinge_question:
      'Why was it such an agonizing decision for Jewish parents to send their children away on the Kindertransport?',
    discussion_ideas: [
      'The Agony of Absolute Uncertainty: Parents knew that sending their children alone to a foreign country was the only way to save them from Nazi violence, but they faced the heartbreaking realization that they might never see each other again.',
    ],
  },
  lesson_3_B: {
    hinge_question:
      'Why do small personal objects, like a toy doll or family photographs, become so deeply precious to a refugee child?',
    discussion_ideas: [
      "Anchor to Home & Family: In a strange foreign world where children could not speak the language and had lost everything familiar, a toy or photo was a comforting emotional link to their parents' love and their former happy childhood.",
    ],
  },
  lesson_3_C: {
    hinge_question:
      'What does this official document show about how much paperwork and international cooperation was needed to save each child?',
    discussion_ideas: [
      'Overcoming Strict Bureaucratic Barriers: Saving a refugee child required official travel permits, £50 financial guarantees from British sponsors, medical certificates, and transit visas across multiple European borders before a single child could board a train.',
    ],
  },

  // LESSON 4
  lesson_4_A: {
    hinge_question:
      "Why did the government classify this bomb map as 'MOST SECRET' during the war?",
    discussion_ideas: [
      'Preventing Enemy Artillery & Bomb Correction: If the German Luftwaffe discovered exactly where their bombs fell, they could correct their navigation instruments and bomb sights to target docks, power stations, and railways with deadly precision.',
    ],
  },
  lesson_4_B: {
    hinge_question:
      'What challenges would a family face spending every night sleeping inside a small, damp garden hole during a freezing winter?',
    discussion_ideas: [
      'Freezing Damp & Flooding: Anderson shelters were buried in garden soil and regularly flooded with muddy water, leaving families shivering on damp bunks with condensation dripping from the corrugated iron roof.',
      'Sensory Terror & Confinement: Families endured cramped confinement for up to 12 hours in total darkness, feeling the earth shudder with deafening bomb blasts and antiaircraft shell bursts above.',
    ],
  },
  lesson_4_C: {
    hinge_question:
      'Why were Londoners so determined to shelter deep underground, even when it meant sleeping on hard platforms with train noise and bad air?',
    discussion_ideas: [
      'Guaranteed Physical Safety: Even though platforms were noisy, stuffy, and smelled of sulphur, sixty feet of solid London clay above guaranteed complete protection from direct hits, giving families the peace of mind needed to sleep.',
    ],
  },

  // LESSON 5
  lesson_5_A: {
    hinge_question:
      "How did events thousands of miles out at sea directly affect the food on a British child's dinner plate?",
    discussion_ideas: [
      "Britain's Dependence on Sea Lifelines: Britain imported 70% of its food by cargo ship; when German U-boats sank merchant convoys in the Atlantic, staples like sugar, butter, meat, and bananas vanished from British kitchen tables overnight.",
    ],
  },
  lesson_5_B: {
    hinge_question:
      'Why did the British government believe that strict rationing helped keep public morale high during wartime?',
    discussion_ideas: [
      'Fair Shares for All: Ration books guaranteed that wealthy families could not hoard scarce food while poorer families starved, creating a strong sense of national fairness and unity that kept civilian morale high.',
    ],
  },
  lesson_5_C: {
    hinge_question:
      'Why was gardening considered an essential part of the war effort alongside factory work and soldiering?',
    discussion_ideas: [
      'Freeing Vital Merchant Ships: Every potato or cabbage grown in back gardens and school playing fields meant less food had to be imported across the dangerous Atlantic, freeing merchant ships to carry weapons, fuel, and soldiers.',
    ],
  },

  // LESSON 6
  lesson_6_A: {
    hinge_question:
      "Why was the work of the Women's Land Army vital to Britain's survival during the war?",
    discussion_ideas: [
      'Preventing National Starvation: With hundreds of thousands of male farmhands conscripted into the military, over 80,000 Land Army girls ploughed fields, milked cows, and harvested crops to prevent Britain from being starved into surrender.',
    ],
  },
  lesson_6_B: {
    hinge_question:
      'How did recruitment posters present farm work compared to the reality of cold, hard physical labour in the fields?',
    discussion_ideas: [
      'Idyllic Propaganda Appeal: Posters depicted cheerful young women in bright sunshine surrounded by golden wheat fields, making farm work look romantic, healthy, and patriotic.',
      'Exhausting Physical Reality: In reality, Land Girls faced grueling 12-hour shifts in freezing winter mud, blistered hands, heavy machinery, and lonely isolation in remote rural areas.',
    ],
  },
  lesson_6_C: {
    hinge_question:
      'Why did the achievements of women pilots and factory workers permanently change how British society viewed what women could achieve?',
    discussion_ideas: [
      'Shattering Gender Stereotypes: By skillfully flying high-speed Spitfire fighters and four-engine bombers without radios or weapons, female pilots proved beyond doubt that women were equally capable of mastering complex, dangerous technical roles.',
    ],
  },

  // LESSON 7
  lesson_7_A: {
    hinge_question:
      "Why is it important to learn about what children's lives were like *before* persecution began?",
    discussion_ideas: [
      'Restoring Identity & Humanity: It reminds us that Jewish children were regular, happy schoolchildren with hobbies, sports teams, and friends, rather than just anonymous statistics or helpless victims.',
    ],
  },
  lesson_7_B: {
    hinge_question: 'Why did persecution happen gradually in small steps rather than all at once?',
    discussion_ideas: [
      'The Creeping Trap of Normalisation: Nazi laws stripped rights away incrementally—first barring swimming pools, then radios, then schools—so each small injustice seemed bearable, making it difficult for families to foresee the catastrophic danger ahead.',
    ],
  },
  lesson_7_C: {
    hinge_question:
      'How would you feel if you were told one morning that a law forbade you from ever returning to your school and friends?',
    discussion_ideas: [
      'Confusion & Injustice: Children felt bewildered and hurt because they had done nothing wrong, yet were cast out from their classrooms and playgrounds simply because of their heritage.',
      'Sudden Loss of Normal Life: Being banned from school severed children from beloved teachers and friends, shattering their daily routine and creating intense fear and isolation.',
    ],
  },

  // LESSON 8
  lesson_8_A: {
    hinge_question:
      'Why did the German armed forces feel so confident that no human mind could ever crack their secret codes?',
    discussion_ideas: [
      'Astronomical Combinations: With four rotating rotors and plugboard cables, Enigma generated over 158 quintillion settings that changed every single day at midnight, making hand-calculation impossible for human cryptanalysts.',
    ],
  },
  lesson_8_B: {
    hinge_question:
      "How did Alan Turing's invention prove that machines could solve complex mathematical puzzles faster than any human?",
    discussion_ideas: [
      'High-Speed Electrical Elimination: The Bombe tested thousands of rotor positions every second, automatically ruling out contradictory settings in minutes and laying the foundation for modern electronic computers.',
    ],
  },
  lesson_8_C: {
    hinge_question:
      'Why was keeping the work at Bletchley Park completely secret essential to winning the war?',
    discussion_ideas: [
      'Protecting the Intelligence Advantage: If the German military ever suspected their messages were being read, they would have redesigned their cipher machines overnight, blinding Allied commanders to enemy battle plans.',
    ],
  },

  // LESSON 9
  lesson_9_A: {
    hinge_question:
      'What makes an ordinary individual decide to take action when they witness injustice happening to others?',
    discussion_ideas: [
      'Moral Courage Over Inconvenience: Rescuers act on conscience, refusing to look away or wait for governments to act; Winton canceled a skiing holiday to organize rescue trains because he saw innocent children in grave danger.',
    ],
  },
  lesson_9_B: {
    hinge_question:
      'Why was teamwork across different countries essential to the success of rescue operations like the Czech Kindertransport?',
    discussion_ideas: [
      'Essential Partnership on the Ground: While Winton secured British visas and foster families in London, Chadwick took immense personal risks on the ground in Nazi-occupied Prague escorting children past Gestapo guards onto trains.',
    ],
  },
  lesson_9_C: {
    hinge_question:
      'Why do you think Nicholas Winton never told anyone about saving 669 children for nearly fifty years after the war?',
    discussion_ideas: [
      'Quiet Humility & Human Decency: Winton never sought fame or praise, believing he had simply done what any decent human being should do, and he carried quiet grief for the 250 children on the final train stopped by the outbreak of war.',
    ],
  },

  // LESSON 10
  lesson_10_A: {
    hinge_question:
      'Why were street parties such a meaningful way for ordinary neighbourhoods to celebrate the end of five and a half years of war?',
    discussion_ideas: [
      'Reclaiming Community Freedom: After nearly six years of terrifying night raids, blackouts, and rationing, carrying dining tables into bomb-damaged streets allowed entire neighbourhoods to sing, dance, and share food together in the open daylight.',
    ],
  },
  lesson_10_B: {
    hinge_question:
      'How does this photograph capture both the relief of peace and the heavy cost of the war?',
    discussion_ideas: [
      'Triumph & Survival: The smiling children waving Union Jacks celebrate victory, safety, and the joy that no more bombs will ever fall on their homes.',
      "The Bleak Cost of Destruction: Standing atop jagged heaps of shattered brickwork silently shows the devastating destruction of Britain's cities and the countless lives lost in the blitz.",
    ],
  },
  lesson_10_C: {
    hinge_question:
      'Why is the red poppy used as an enduring symbol of remembrance for people who lost their lives in war?',
    discussion_ideas: [
      'Hope Blooming from Devastation: Bright red poppies were the only flowers that bloomed amidst the shell-torn battlefields of the First World War, symbolizing both the blood shed by service personnel and the enduring hope of peacetime renewal.',
    ],
  },

  // LESSON 11
  lesson_11_A: {
    hinge_question:
      'What do you think the children felt as they boarded giant military planes to fly to a country where they did not speak the language?',
    discussion_ideas: [
      'Lingering Terror & Mistrust: Having survived horrific concentration camps where uniforms and transports meant death, boarding giant military aircraft filled many children with dread and suspicion.',
      'Glimmers of Hope & Wonder: Flying through the open sky towards peace offered children their first breathtaking glimpse of freedom, safety, and a world without barbed wire.',
    ],
  },
  lesson_11_B: {
    hinge_question:
      'Why did the carers at Calgarth focus on kindness, sports, and nature rather than formal rules to help the children recover?',
    discussion_ideas: [
      'Restoring Trust and Childhood: The children had been robbed of love, food, and safety for years; gentle guidance, swimming in Lake Windermere, and warm meals helped their traumatized minds feel secure enough to learn and play again.',
    ],
  },
  lesson_11_C: {
    hinge_question:
      'How does reading a story based on real people help us understand history differently from reading a list of facts?',
    discussion_ideas: [
      'Connecting Emotionally with Real Lives: A well-researched story lets us walk in the shoes of young people like Yossi and Leo, helping us feel their fears, friendships, and triumphs rather than just memorising dates and numbers.',
    ],
  },
  lesson_11_D: {
    hinge_question:
      'Why did the children of Windermere describe their bond with each other as being like brothers and sisters for the rest of their lives?',
    discussion_ideas: [
      'An Unbreakable Chosen Family: Having all lost their parents and brothers and sisters in the camps, the Windermere children supported one another through recovery, creating an enduring family bond that lasted throughout their lives.',
    ],
  },
};

async function run() {
  console.log('🚀 Loading units/ks2_ww2/data.js...');
  const mod = await import(pathToFileURL(dataJsPath).href);
  const unitData = mod.default || mod.unitData;

  let totalEnriched = 0;

  unitData.lessons.forEach((l) => {
    if (!l.sources) l.sources = [];
    (l.narrative_blocks || []).forEach((b, bIdx) => {
      if (b.source) {
        const letter = b.source.letter || String.fromCharCode(65 + bIdx);
        const pedKey = `${l.id}_${letter}`;
        const ped = KS2_PEDAGOGY[pedKey];
        if (ped) {
          b.source.hinge_question = ped.hinge_question;
          b.source.discussion_ideas = ped.discussion_ideas;
          totalEnriched++;
          console.log(
            `✅ [${l.id}] ${letter}: Injected explicit hinge_question & ${ped.discussion_ideas.length} discussion idea(s)`,
          );
        } else {
          console.warn(`⚠️ [${l.id}] No pedagogy found for key ${pedKey}`);
        }
        // Also keep lesson.sources in sync
        const existingIdx = l.sources.findIndex((s) => s.letter === letter);
        if (existingIdx >= 0) {
          l.sources[existingIdx] = b.source;
        } else {
          l.sources.push(b.source);
        }
      }
    });
  });

  console.log(`\n🎉 Total sources enriched with bespoke pedagogy: ${totalEnriched} / 34`);

  // 1. Write back to units/ks2_ww2/data.js
  const jsContent = 'export default ' + JSON.stringify(unitData, null, 2) + ';\n';
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/ks2_ww2/data.js');

  // 2. Write to public/data/ks2_ww2.json
  if (fs.existsSync(pubJsonPath)) {
    const pubData = JSON.parse(fs.readFileSync(pubJsonPath, 'utf8'));
    pubData.data = unitData;
    fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
    console.log('✅ Successfully updated public/data/ks2_ww2.json');
  }

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.ks2_ww2) {
      db.ks2_ww2.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated ks2_ww2 in public/database.json');
    }
  }

  console.log('\n🏁 Finished updating all 3 data stores!');
}

module.exports = { KS2_PEDAGOGY };

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error executing update script:', err);
    process.exit(1);
  });
}
