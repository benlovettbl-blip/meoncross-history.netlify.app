const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

let unitData = JSON.parse(jsonStr);

// Helper function to split tasks
function splitUtilityTask(tasksArray, oldTaskIndex, sourceQuestion, sourceModel, interpretationText, interpretationQuestion, interpretationModel) {
  if (oldTaskIndex > -1) {
    tasksArray.splice(oldTaskIndex, 1, 
      {
        text: sourceQuestion,
        model: sourceModel
      },
      {
        text: interpretationText + "<br><br>" + interpretationQuestion,
        model: interpretationModel
      }
    );
  }
}

// L1
let l1 = unitData.lessons.find(l => l.id === 'lesson_1');
if (l1) {
  if (l1.narrative_blocks[0]) l1.narrative_blocks[0].image_alt = "Map of European Alliances in 1914";
  if (l1.narrative_blocks[1]) l1.narrative_blocks[1].image_alt = "Portrait of Gavrilo Princip";
}

// L2
let l2 = unitData.lessons.find(l => l.id === 'lesson_2');
if (l2 && l2.narrative_blocks[1]) l2.narrative_blocks[1].image_alt = "Aerial reconnaissance photograph of a zig-zag trench system";
if (l2 && l2.narrative_blocks[2] && l2.narrative_blocks[2].tasks) {
  let tasks = l2.narrative_blocks[2].tasks;
  let idx = tasks.findIndex(t => t.text && t.text.includes('Part D: Edexcel Source Utility'));
  if (idx > -1) {
    splitUtilityTask(tasks, idx,
      "<strong>Part C: Edexcel Source Utility</strong><br>Study Source A (the photograph of the flooded trench).<br><br>How useful is Source A for an inquiry into the conditions on the Western Front? (8 marks)",
      "Source A is highly useful because it is a contemporary photograph providing visual evidence of the horrific, water-logged conditions soldiers endured, which directly caused trench foot. However, its utility is limited as a photograph only captures one specific moment and location, and may not represent the entire front line.",
      "<strong>Part D: Evaluating Interpretations</strong><br>Study Interpretation 1 (a historian writing in 2014 stating: 'The British high command callously ignored the horrific conditions of the mud').",
      "How far do you agree with Interpretation 1 about the attitude of the high command? Explain your answer. (16 marks + 4 SPaG)",
      "<strong>Paragraph 1 (Agree):</strong> You could agree with Interpretation 1 by pointing to the massive casualties and the persistence of frontal assaults in the mud at Passchendaele, suggesting generals like Haig were disconnected from the reality of the trenches.<br><br><strong>Paragraph 2 (Disagree):</strong> You could disagree by arguing that the high command did not simply ignore the conditions, but tried to manage them by building duckboards, deeper dugouts, and rotating troops out of the front line.<br><br><strong>Conclusion:</strong> Summarize your judgement on whether the commanders were callous or simply overwhelmed by an unprecedented scale of war."
    );
  }
}

// L3
let l3 = unitData.lessons.find(l => l.id === 'lesson_3');
if (l3 && l3.narrative_blocks[1] && l3.narrative_blocks[1].tasks) {
  let tasks = l3.narrative_blocks[1].tasks;
  let idx = tasks.findIndex(t => t.text && t.text.includes('Part B: Edexcel Source Utility'));
  if (idx > -1) {
    splitUtilityTask(tasks, idx,
      "<strong>Part C: Edexcel Source Utility</strong><br>Study Source A (the photograph of the British Indian Army).<br><br>How useful is Source A for an inquiry into the global nature of the First World War? (8 marks)",
      "Source A is useful as it provides contemporary visual proof of non-European troops fighting on the Western Front, proving it was a global war. However, it is limited because it only shows one specific regiment at one moment in time.",
      "<strong>Part D: Evaluating Interpretations</strong><br>Study Interpretation 1 (David Olusoga's text arguing that the contribution of imperial troops was deliberately marginalized in post-war memory to preserve racial hierarchies).",
      "How far do you agree with Interpretation 1 about the memory of the Empire's contribution? Explain your answer. (16 marks + 4 SPaG)",
      "<strong>Paragraph 1 (Agree):</strong> You could agree by noting how post-war memorials and dominant narratives heavily focused on white British soldiers (e.g., the 'Tommies'), often leaving colonial troops out of the popular national memory.<br><br><strong>Paragraph 2 (Disagree):</strong> You could disagree by arguing that there are large monuments, such as the India Gate, dedicated to colonial troops, so they were not entirely erased.<br><br><strong>Conclusion:</strong> Summarize your overall judgement on Olusoga's view."
    );
  }
}

// L4
let l4 = unitData.lessons.find(l => l.id === 'lesson_4');
if (l4) {
  if (l4.narrative_blocks[1]) l4.narrative_blocks[1].image_alt = "Painting of female Munitionettes working in a factory";
  if (l4.narrative_blocks[1] && l4.narrative_blocks[1].tasks) {
    let tasks = l4.narrative_blocks[1].tasks;
    let idx = tasks.findIndex(t => t.text && t.text.includes('Part B: Edexcel Source Utility'));
    if (idx > -1) {
      splitUtilityTask(tasks, idx,
        "<strong>Part C: Edexcel Source Utility</strong><br>Study Source A (the painting of the Munitionettes).<br><br>How useful is Source A for an inquiry into the impact of the war on women? (8 marks)",
        "Source A is highly useful as it is a contemporary painting showing women taking on heavy industrial roles in munitions factories, proving a significant shift in female employment. However, as a painting, it is an artist's subjective interpretation and may romanticize or sanitize the dangerous conditions.",
        "<strong>Part D: Evaluating Interpretations</strong><br>Study Interpretation 1 (Arthur Marwick's text arguing that the war permanently liberated women).",
        "How far do you agree with Interpretation 1 about the impact of the war on women? Explain your answer. (16 marks + 4 SPaG)",
        "<strong>Paragraph 1 (Agree):</strong> You could agree with Marwick by arguing that women gained financial independence, left domestic service, and proved they could do 'men's work', leading to the 1918 Representation of the People Act.<br><br><strong>Paragraph 2 (Disagree):</strong> You could disagree by pointing out that this 'liberation' was temporary; many women were forced out of these factories when the men returned in 1919, and the 1918 Act only gave the vote to women over 30 who met property qualifications.<br><br><strong>Conclusion:</strong> Summarize your overall judgement on whether the war was a genuine turning point for women."
      );
    }
  }
}

// L5
let l5 = unitData.lessons.find(l => l.id === 'lesson_5');
if (l5 && l5.narrative_blocks[1] && l5.narrative_blocks[1].tasks) {
  let tasks = l5.narrative_blocks[1].tasks;
  let idx = tasks.findIndex(t => t.text && t.text.includes('Part B: Edexcel Source Utility'));
  if (idx > -1) {
    splitUtilityTask(tasks, idx,
      "<strong>Part C: Edexcel Source Utility</strong><br>Study Source A (the political cartoon).<br><br>How useful is Source A for an inquiry into the fairness of the Treaty of Versailles? (8 marks)",
      "Source A is useful as it shows contemporary British attitudes, often depicting the Treaty as a necessary punishment for Germany. However, as a British cartoon, it is biased, one-sided, and ignores German suffering and perspectives.",
      "<strong>Part D: Evaluating Interpretations</strong><br>Study Interpretation 1 (John Maynard Keynes arguing the economic reparations were too harsh and would ruin Europe).",
      "How far do you agree with Interpretation 1 about the Treaty of Versailles? Explain your answer. (16 marks + 4 SPaG)",
      "<strong>Paragraph 1 (Agree):</strong> You could agree with Keynes by discussing the massive £6.6 billion reparations figure, which crippled the German economy and arguably paved the way for future instability.<br><br><strong>Paragraph 2 (Disagree):</strong> You could disagree by arguing the Treaty was actually quite lenient compared to what Germany did to Russia at the Treaty of Brest-Litovsk, and that France needed the reparations to rebuild its destroyed country.<br><br><strong>Conclusion:</strong> Summarize your overall judgement on the fairness of the treaty."
    );
  }
}

// L7
let l7 = unitData.lessons.find(l => l.id === 'lesson_7');
if (l7) {
  let block2 = l7.narrative_blocks[1];
  let block3 = l7.narrative_blocks[2];
  
  if (block2) {
    block2.image_alt = "Painting of women working in a munitions factory";
    block2.text = "<strong>Part C: Evaluating Source Utility (8 Marks)</strong><br>Study Source A (the painting of the 'Canary Girls' in the munitions factory).";
    if (block2.tasks && block2.tasks[0]) {
      block2.tasks[0].text = "How useful is Source A for an inquiry into the impact of the First World War on women? (8 marks)";
      block2.tasks[0].model = "Source A is highly useful for showing the reality of the Home Front, as it is a painting from the time demonstrating women taking on heavy industrial roles previously reserved for men. However, its utility is limited because a painting is subjective and may have been created for propaganda to encourage recruitment, rather than showing the true dangers like TNT poisoning.";
    }
  }
  
  if (block3) {
    block3.text = "<strong>Part D: Evaluating Interpretations (20 Marks)</strong><br>Study Interpretation 1. <em>\"The First World War was primarily won on the mud of the Western Front.\"</em>";
    if (block3.tasks && block3.tasks[0]) {
      block3.tasks[0].text = "How far do you agree with Interpretation 1? Explain your answer using your own knowledge. (16 marks + 4 SPaG)";
      // Keep the same model answer since it fits perfectly
    }
  }
}

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Successfully applied all assessment and source tweaks!');
