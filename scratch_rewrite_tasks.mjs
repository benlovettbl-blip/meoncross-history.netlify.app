import fs from 'fs';

async function rewriteData() {
  const m = await import('./medieval_england/data.js');
  const unitData = m.unitData;

  // L1: 1066
  const l1 = unitData.lessons[0];
  // Replace the last block's extended writing task with a sorting task
  const l1FinalBlock = l1.narrative_blocks[l1.narrative_blocks.length - 1];
  l1FinalBlock.tasks = [
    {
      "type": "sorting",
      "text": "Task 3: Put these key events of 1066 in the correct chronological order to map out the dramatic sequence of events.",
      "events": [
        "Edward the Confessor dies without a direct heir.",
        "Harold Godwinson is crowned King of England.",
        "Harald Hardrada and the Vikings invade the north of England.",
        "Harold Godwinson marches north and defeats the Vikings at Stamford Bridge.",
        "The wind changes, allowing William's Norman fleet to cross the English Channel.",
        "The English army rushes south but is defeated by the Normans at the Battle of Hastings."
      ],
      "model_answer": "Edward dies -> Harold crowned -> Hardrada invades -> Stamford Bridge -> Wind changes -> Hastings"
    }
  ];

  // L2: Castles & Terror
  const l2 = unitData.lessons[1];
  // Find Motte & Bailey block
  const motteBlock = l2.narrative_blocks.find(b => b.title.includes('Castles'));
  if (motteBlock) {
    motteBlock.tasks = [
      {
        "type": "short_answer",
        "question": "Task 1: Look at the diagram of the Motte and Bailey castle (Source A). Evaluate the defensive strengths of this design. How did the Motte, Keep, and Bailey work together to protect the Normans?",
        "model_answer": "The Motte provided a high vantage point for observation and a secure final retreat in the Keep. The Bailey below offered a protected compound to house soldiers, horses, and supplies, surrounded by a palisade and ditch, making it extremely difficult for English rebels to attack without specialized siege equipment."
      }
    ];
  }
  const domesdayBlock = l2.narrative_blocks.find(b => b.title.includes('Domesday'));
  if (domesdayBlock) {
    domesdayBlock.tasks.push({
      "type": "short_answer",
      "question": "Task 3: Look at the visual image of the Domesday Book in the Key Individuals section. Why was having all of this information written down in a permanent book so terrifying for the English population?",
      "model_answer": "Writing it down permanently meant there was no escape. The King knew exactly who owned what, meaning the English could never avoid his taxes or hide their wealth from the new Norman lords."
    });
  }

  // L3: Becket
  const l3 = unitData.lessons[2];
  const becketBlock = l3.narrative_blocks.find(b => b.title.includes('Murder'));
  if (becketBlock) {
    becketBlock.tasks = [
      {
        "type": "creative_writing",
        "instruction": "Task 2: Eyewitness Report. Look closely at the manuscript illumination of Becket's murder. Imagine you are a terrified monk hiding behind the pillars of Canterbury Cathedral on 29 December 1170. Write a short eyewitness report describing the horrifying scene as the four knights attack the Archbishop.",
        "model_answer": "I was hiding in the shadows of the cathedral when the four knights burst in, their swords drawn. The Archbishop stood bravely before the altar. I watched in horror as Reginald FitzUrse struck the first blow. The knights hacked at Becket until his skull was split open, his blood spilling onto the sacred floor. It was a nightmare of screaming and clashing steel."
      }
    ];
  }

  // L4: Magna Carta
  const l4 = unitData.lessons[3];
  const magnaBlock = l4.narrative_blocks.find(b => b.title.includes('Magna Carta'));
  if (magnaBlock) {
    magnaBlock.tasks = [
      {
        "type": "short_answer",
        "question": "Task 2: The Baron's Lawyer. Magna Carta contained 63 clauses. Below are three of the most famous. Categorize them into 'Financial', 'Legal', or 'Royal Power' limitations:\n1. 'No freeman shall be arrested or imprisoned without a fair trial.'\n2. 'No scutage (tax) shall be imposed without the general consent of the realm.'\n3. 'The English Church shall be free from royal interference.'",
        "model_answer": "1. Legal (Guarantees a fair trial). 2. Financial (Stops the King inventing taxes). 3. Royal Power (Limits the King's control over the Church)."
      }
    ];
  }

  // L5: Doom Paintings
  const l5 = unitData.lessons[4];
  const doomBlock = l5.narrative_blocks.find(b => b.title.includes('Doom'));
  if (doomBlock) {
    doomBlock.tasks = [
      {
        "type": "creative_writing",
        "instruction": "Task 3: Design your own modern Doom Painting. Medieval Doom Paintings used demons and hellfire to scare peasants into behaving. If you were painting a 'Doom Painting' for a 21st-century audience, what modern fears (e.g., pollution, technology, war) would you include to warn people about their behavior? Describe your painting.",
        "model_answer": "In my modern Doom Painting, instead of demons, the sinners would be dragged down by tangled wires and glowing screens representing our obsession with technology. The landscape of 'Hell' would be a wasteland of plastic pollution and smog, warning people that destroying the planet is a terrible sin."
      }
    ];
  }

  // L6: Black Death
  const l6 = unitData.lessons[5];
  const deathBlock = l6.narrative_blocks.find(b => b.title.includes('Symptoms') || b.title.includes('Arrives'));
  if (deathBlock) {
    deathBlock.tasks = [
      {
        "type": "creative_writing",
        "instruction": "Task 1: Medical Diagnosis. You are a medieval doctor in 1348. A patient has arrived with fever and dark buboes on their neck. Using medieval beliefs (miasma, the four humours, or religion), write down your diagnosis of what caused this, and what bizarre treatment you will prescribe.",
        "model_answer": "Diagnosis: The patient has breathed in corrupt, foul air (miasma) blown over from swamps, which has unbalanced their four humours. Treatment: I prescribe that the patient must strap a live toad to the buboes to draw out the poison, and they must burn sweet-smelling herbs like rosemary in their home to purify the air."
      }
    ];
  }
  const macabreBlock = l6.narrative_blocks.find(b => b.title.includes('Shattering') || b.title.includes('Social'));
  if (macabreBlock) {
    macabreBlock.tasks = [
      {
        "type": "short_answer",
        "question": "Task 3: Look at the 'Danse Macabre' (Dance of Death) image in the Key Individuals section. Notice how the skeleton is dancing with a wealthy merchant or noble. What does this image tell us about how the Black Death changed medieval attitudes towards death and social equality?",
        "model_answer": "The Danse Macabre shows that death is the great equalizer. No matter how much money you had or how high you were in society, you could not escape the plague. The skeletons dancing with rich nobles proved that God and disease treated the wealthy and the poor exactly the same."
      }
    ];
  }

  // L7: Peasants' Revolt
  const l7 = unitData.lessons[6];
  const revoltBlock = l7.narrative_blocks.find(b => b.title.includes('March') || b.title.includes('Revolt'));
  if (revoltBlock) {
    revoltBlock.tasks = [
      {
        "type": "creative_writing",
        "instruction": "Task 2: Speechwriting. You are the radical priest John Ball. Write a short, rousing speech to deliver to the peasant army before they march on London. Make sure you mention your anger about the Poll Tax, the unfairness of serfdom, and the greed of the Archbishop of Canterbury.",
        "model_answer": "Brothers and sisters! When Adam delved and Eve span, who was then the gentleman? God created us all equal, yet we are treated like beasts of burden! They crush us with this wicked Poll Tax while the fat Archbishop of Canterbury hoards gold in his palaces. We march on London not as rebels, but as free men, to demand our rights from the King! Tear up the tax rolls!"
      }
    ];
  }

  // L8: Wars of the Roses
  const l8 = unitData.lessons[7];
  const princesBlock = l8.narrative_blocks.find(b => b.title.includes('Richard'));
  if (princesBlock) {
    princesBlock.tasks = [
      {
        "type": "think_pair_share",
        "instruction": "Task 2: CLASSROOM ROLE-PLAY: The Trial of Richard III. \nYour teacher will divide the class. You will either be the Prosecution (arguing Richard murdered the Princes in the Tower to secure his throne) or the Defense (arguing it is Tudor propaganda and there is no bodies or proof). Prepare your opening arguments. Use the evidence from the narrative to build your case.",
        "model_answer": "Prosecution: Richard had the motive. The Princes were the only thing stopping him from being King. Once they went into the Tower, they were never seen again! \nDefense: This is Tudor fake news! There were no bodies found during his lifetime. Henry Tudor had just as much motive to kill them because they had a stronger claim to the throne than he did!"
      }
    ];
  }

  // L9: Assessment
  const l9 = unitData.lessons[8];
  if (l9.tasks) {
    const essayTask = l9.tasks.find(t => t.type === 'extended_writing');
    if (essayTask) {
      essayTask.instruction = "Task 2: Assessment Essay. Answer the question: 'How powerful was a medieval monarch?'\n\nTo structure your essay, use PEEL paragraphs (Point, Evidence, Explain, Link). Write three paragraphs:\n1. A paragraph showing a monarch being powerful (e.g., William the Conqueror's castles).\n2. A paragraph showing a monarch being weak or challenged (e.g., King John and Magna Carta).\n3. A conclusion summarizing your overall view.";
      essayTask.model_answer = "Point: Medieval monarchs could be extremely powerful and crush resistance. \nEvidence: For example, William the Conqueror built motte and bailey castles and launched the Harrying of the North. \nExplain: This made him powerful because he starved 100,000 rebels, proving that anyone who challenged the crown would be destroyed. \nLink: Therefore, when monarchs used military terror, their power was absolute.\n\nPoint: However, monarchs could also be very weak if they angered the Church or barons. \nEvidence: King John was forced to sign the Magna Carta in 1215. \nExplain: This limited his power because he could no longer tax the barons without their permission, and he had to obey the law like everyone else. \nLink: Therefore, a monarch's power was not absolute if he lost the support of his most important subjects.";
    }
  }

  const output = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
  fs.writeFileSync('./medieval_england/data.js', output);
  console.log('Successfully updated medieval_england/data.js');
}

rewriteData().catch(console.error);
