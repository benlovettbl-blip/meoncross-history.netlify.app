const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

let unitData = JSON.parse(jsonStr);

// ==========================================
// 1. ADD IMAGES TO LESSONS 1-6
// ==========================================

const images = {
  lesson_1: [
    { src: "/images/gw_alliance_map.jpg", alt: "Map of European Alliances in 1914" },
    { src: "/images/gw_gavrilo_princip.jpg", alt: "Arrest of Gavrilo Princip in Sarajevo" }
  ],
  lesson_2: [
    { src: "/images/gw_flooded_trench.jpg", alt: "Soldiers in a flooded trench during the Battle of Passchendaele" },
    { src: "/images/gw_trench_diagram.jpg", alt: "Diagram of a typical First World War trench system" }
  ],
  lesson_3: [
    { src: "/images/gw_indian_army.jpg", alt: "British Indian Army soldiers on the Western Front" },
    { src: "/images/gw_bwir.jpg", alt: "Soldiers of the British West Indies Regiment" }
  ],
  lesson_4: [
    { src: "/images/gw_women_say_go.jpg", alt: "Women of Britain Say Go! propaganda poster" },
    { src: "/images/gw_munitionettes.jpg", alt: "Female Munitionettes working in a factory" }
  ],
  lesson_5: [
    { src: "/images/gw_big_three_versailles.jpg", alt: "The Big Four leaders at the Versailles Peace Conference" },
    { src: "/images/gw_versailles_cartoon.jpg", alt: "Political cartoon about the Treaty of Versailles" }
  ],
  lesson_6: [
    { src: "/images/gw_thiepval.jpg", alt: "The Thiepval Memorial to the Missing of the Somme" },
    { src: "/images/gw_death_plaque.jpg", alt: "A World War I Memorial Plaque (Dead Man's Penny)" }
  ]
};

unitData.lessons.forEach(l => {
  if (images[l.id]) {
    // Add first image to first block
    if (l.narrative_blocks[0]) {
      l.narrative_blocks[0].image = images[l.id][0].src;
      l.narrative_blocks[0].image_alt = images[l.id][0].alt;
    }
    // Add second image to second block (or first if no second block)
    const blockIndex = l.narrative_blocks.length > 1 ? 1 : 0;
    // But we don't want to overwrite the first if we only have one block.
    if (l.narrative_blocks.length > 1) {
      l.narrative_blocks[1].image = images[l.id][1].src;
      l.narrative_blocks[1].image_alt = images[l.id][1].alt;
    }
  }
});

// ==========================================
// 2. UPDATE PRACTICE TASKS (Features & Utility)
// ==========================================

// Lesson 1: Add Features Practice
const l1 = unitData.lessons.find(l => l.id === 'lesson_1');
if (l1 && l1.narrative_blocks[1] && l1.narrative_blocks[1].tasks) {
  l1.narrative_blocks[1].tasks.push({
    text: "<strong>Part B2: Edexcel Features Practice</strong><br>Describe one feature of the European Alliance System in 1914. (2 marks)",
    model: "One feature of the European Alliance System was that it split Europe into two rival armed camps. For example, the Triple Entente allied Britain, France, and Russia against the Triple Alliance of Germany, Austria-Hungary, and Italy, meaning any small conflict could pull all major powers into war."
  });
}

// Lesson 2: Add Utility Practice (Source vs Interpretation)
const l2 = unitData.lessons.find(l => l.id === 'lesson_2');
if (l2 && l2.narrative_blocks[2] && l2.narrative_blocks[2].tasks) {
  l2.narrative_blocks[2].tasks.push({
    text: "<strong>Part D: Edexcel Source Utility</strong><br>Study Source A (the photograph of the flooded trench above) and Interpretation 1 (a historian writing in 2014 stating: 'The British high command callously ignored the horrific conditions of the mud').<br><br>How useful are Source A and Interpretation 1 for an inquiry into the conditions on the Western Front? (8 marks)",
    model: "Source A is highly useful because it is a contemporary photograph that provides visual evidence of the horrific, water-logged conditions soldiers endured, directly causing trench foot. However, its utility is limited as a photograph only captures one specific moment and location, and may not represent the entire front line. Interpretation 1 is also useful because it provides a historian's overview, arguing that the commanders ignored these conditions. However, this interpretation can be challenged because we know generals did attempt to solve the mud problem by building duckboards and deeper dugouts."
  });
}

// Lesson 3: Add Features Practice + Utility Practice
const l3 = unitData.lessons.find(l => l.id === 'lesson_3');
if (l3) {
  if (l3.narrative_blocks[0] && l3.narrative_blocks[0].tasks) {
    l3.narrative_blocks[0].tasks.push({
      text: "<strong>Part A2: Edexcel Features Practice</strong><br>Describe one feature of the British Empire's contribution to the First World War. (2 marks)",
      model: "One feature of the Empire's contribution was the immense manpower provided. For example, over 1.5 million men from the British Indian Army fought across multiple theaters, including the Western Front and Mesopotamia."
    });
  }
  if (l3.narrative_blocks[1] && l3.narrative_blocks[1].tasks) {
    // Modify Interpretation task to be a Source vs Interpretation Utility task
    const oldTask = l3.narrative_blocks[1].tasks.find(t => t.text.includes('Part B: Analyzing'));
    if (oldTask) {
      oldTask.text = "<strong>Part B: Edexcel Source Utility</strong><br>Study Source A (the photograph of the British Indian Army above) and Interpretation B (David Olusoga's text).<br><br>How useful are Source A and Interpretation B for an inquiry into the global nature of the First World War? (8 marks)";
      oldTask.model = "Source A is useful as it provides contemporary visual proof of non-European troops fighting on the Western Front, proving it was a global war. Interpretation B is useful because it provides a modern historian's view (Olusoga) that the contribution of these imperial troops was deliberately marginalized in post-war memory to preserve racial hierarchies. Together, they are highly useful for understanding both the reality of the global conflict and how it has been remembered.";
    }
  }
}

// Lesson 4: Convert to Source vs Interpretation Utility
const l4 = unitData.lessons.find(l => l.id === 'lesson_4');
if (l4 && l4.narrative_blocks[1] && l4.narrative_blocks[1].tasks) {
  const oldTask = l4.narrative_blocks[1].tasks.find(t => t.text.includes('Part B: Analyzing'));
  if (oldTask) {
    oldTask.text = "<strong>Part B: Edexcel Source Utility</strong><br>Study Source A (the photograph of the Munitionettes above) and Interpretation A (Arthur Marwick's text).<br><br>How useful are Source A and Interpretation A for an inquiry into the impact of the war on women? (8 marks)";
    oldTask.model = "Source A is highly useful as contemporary evidence showing women taking on heavy industrial roles in munitions factories, proving a significant shift in female employment. However, it might be a staged propaganda photograph. Interpretation A is useful because Marwick provides a historian's overview, arguing the war permanently liberated women. However, this interpretation is limited, as we know many women were forced to give up these jobs when men returned in 1919.";
  }
}

// Lesson 5: Add Features + Source vs Interpretation Utility
const l5 = unitData.lessons.find(l => l.id === 'lesson_5');
if (l5) {
  if (l5.narrative_blocks[0] && l5.narrative_blocks[0].tasks) {
    l5.narrative_blocks[0].tasks.push({
      text: "<strong>Part A2: Edexcel Features Practice</strong><br>Describe one feature of the military restrictions placed on Germany by the Treaty of Versailles. (2 marks)",
      model: "One feature of the military restrictions was that they left Germany virtually defenseless. For example, the German army was limited to just 100,000 men and they were banned from having submarines or an air force."
    });
  }
  if (l5.narrative_blocks[1] && l5.narrative_blocks[1].tasks) {
    const oldTask = l5.narrative_blocks[1].tasks.find(t => t.text.includes('Part B: Analyzing'));
    if (oldTask) {
      oldTask.text = "<strong>Part B: Edexcel Source Utility</strong><br>Study Source A (the political cartoon above) and Interpretation A (John Maynard Keynes).<br><br>How useful are Source A and Interpretation A for an inquiry into the fairness of the Treaty of Versailles? (8 marks)";
      oldTask.model = "Source A is useful as it shows contemporary British attitudes, often depicting the Treaty as a necessary punishment for Germany. However, as a British cartoon, it is biased and ignores German suffering. Interpretation A is useful because Keynes, who was present at the conference, argues the economic reparations were too harsh and would ruin Europe. Together, they show the tension between public desire for revenge and the economic reality of a ruined continent.";
    }
  }
}

// ==========================================
// 3. BUILD LESSON 7: FINAL ASSESSMENT
// ==========================================

const lesson7 = {
  id: "lesson_7",
  title: "Assessment: The Great War",
  primer: "This formal assessment bridges Key Stage 3 historical skills with early GCSE demands, testing chronological recall, source utility evaluation, and historical judgement.",
  vocab: [],
  do_now: {
    type: "grid",
    tasks: [
      { question: "What triggered the start of WWI in 1914?", answer: "The assassination of Archduke Franz Ferdinand.", points: 1 },
      { question: "What was the name of the British law that allowed the government to take control of industries?", answer: "DORA (Defence of the Realm Act).", points: 2 },
      { question: "Why did the Schlieffen Plan fail?", answer: "Belgium resisted, Russia mobilized faster than expected, and Britain intervened.", points: 3 }
    ]
  },
  narrative_blocks: [
    {
      text: "<strong>Part A: Core Knowledge & Chronology (10 Marks)</strong><br>Complete the automated multiple-choice quiz for this unit to test your foundational knowledge.",
      tasks: [
        {
          text: "<strong>Part B: Edexcel 'Features' Question (4 Marks)</strong><br>1a. Describe one feature of the Home Front during the First World War. (2 marks)<br>1b. Describe one feature of the Treaty of Versailles. (2 marks)",
          model: "1a. One feature of the Home Front was the mobilization of women. For example, thousands of women known as 'Munitionettes' worked in dangerous factories to produce shells.<br><br>1b. One feature of the Treaty of Versailles was its harsh military restrictions. For example, the German army was limited to 100,000 men and was not allowed submarines or an air force."
        }
      ]
    },
    {
      text: "<strong>Part C: Evaluating Source Utility & Interpretations (8 Marks)</strong><br>Study Source A (the photograph of the 'Canary Girls' in the munitions factory) and Interpretation 1 (Arthur Marwick's view that the war liberated women).",
      image: "/images/gw_munitionettes.jpg",
      image_alt: "Women working in a munitions factory",
      tasks: [
        {
          text: "How useful are Source A and Interpretation 1 for an inquiry into the impact of the First World War on women? (8 marks)",
          model: "Source A is highly useful for showing the reality of the Home Front, as it is a photograph from the time demonstrating women taking on heavy industrial roles previously reserved for men. However, its utility is limited because a photograph captures a single moment and may have been staged for propaganda to encourage recruitment. Interpretation 1 is also very useful because it provides a historian's overview of the long-term impact, arguing the war permanently liberated women. However, it can be challenged by the fact that many women were forced out of these jobs when the men returned in 1919."
        }
      ]
    },
    {
      text: "<strong>Part D: The Judgement Essay (16 Marks)</strong><br><em>\"The First World War was primarily won on the mud of the Western Front.\"</em>",
      tasks: [
        {
          text: "How far do you agree with this statement? Explain your answer using your own knowledge. (12 marks + 4 SPaG)",
          model: "<strong>Paragraph 1 (Agree):</strong> You could agree with the statement by discussing the sheer scale of the battles of attrition on the Western Front, such as the Somme and Passchendaele, where the German army was slowly ground down.<br><br><strong>Paragraph 2 (Disagree - Global Empire):</strong> You could disagree by arguing the war was a global conflict. The contribution of over 1.5 million men from the British Indian Army and resources from across the Empire were crucial to preventing an early defeat.<br><br><strong>Paragraph 3 (Disagree - Home Front):</strong> You could also disagree by arguing the war was won on the Home Front. The mobilization of the entire civilian population, such as women in munitions factories, ensured the military had the supplies needed to win.<br><br><strong>Conclusion:</strong> Summarize your overall judgement, balancing the military reality of the Western Front against the broader global and civilian contributions."
        }
      ]
    }
  ],
  quiz: [
    { q: "In what year did the First World War begin?", a: "1914", options: ["1914", "1918", "1939", "1911"] },
    { q: "Which country was NOT part of the Triple Entente?", a: "Germany", options: ["Germany", "Britain", "France", "Russia"] },
    { q: "What condition was caused by standing in cold, flooded trenches?", a: "Trench Foot", options: ["Trench Foot", "Shell Shock", "Spanish Flu", "Cholera"] },
    { q: "How many men from the British Empire and Dominions served in the war?", a: "Nearly 3 million", options: ["Nearly 3 million", "100,000", "500,000", "5 million"] },
    { q: "What was the nickname given to women working with TNT in factories?", a: "Canary Girls", options: ["Canary Girls", "Tommies", "Doughboys", "Land Girls"] }
  ]
};

if (!unitData.lessons.find(l => l.id === 'lesson_7')) {
  unitData.lessons.push(lesson7);
} else {
  const idx = unitData.lessons.findIndex(l => l.id === 'lesson_7');
  unitData.lessons[idx] = lesson7;
}

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Successfully injected images, updated tasks, and added Lesson 7!');
