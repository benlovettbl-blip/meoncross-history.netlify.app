const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

const unitData = JSON.parse(jsonStr);

// 1. Format Model Answers (replace \n with <br><br>)
unitData.lessons.forEach(l => {
  if (l.narrative_blocks) {
    l.narrative_blocks.forEach(b => {
      if (b.tasks) {
        b.tasks.forEach(t => {
          if (t.model) t.model = t.model.replace(/\n/g, '<br><br>');
        });
      }
    });
  }
  if (l.tasks) {
    l.tasks.forEach(t => {
      if (t.model) t.model = t.model.replace(/\n/g, '<br><br>');
    });
  }
});

// 2. Add GCSE Features Question to Lesson 2
const l2 = unitData.lessons.find(l => l.id === 'lesson_2');
if (l2 && l2.narrative_blocks && l2.narrative_blocks.length > 0) {
  const featureQuestion = {
    type: 'text',
    text: '<strong>Part B: Edexcel GCSE Paper 1 Features Practice</strong><br>1a. Describe one feature of early military aircraft. (2 marks)<br>1b. Describe one feature of early military aircraft. (2 marks)',
    model: '1a. One feature of early military aircraft was how fragile they were. For example, they were constructed merely of wood and thick cloth held together by piano wire.<br><br>1b. Another feature of early military aircraft was the complete lack of safety equipment for pilots. For example, they flew in completely open cockpits without parachutes, relying entirely on thick clothes to stop themselves from freezing to death.'
  };
  l2.narrative_blocks[0].tasks.push(featureQuestion);
}

// 3. Add Quizzes
const quiz1 = [
  { q: "What was the name of the revolutionary British battleship launched in 1906 that sparked a naval arms race?", a: 0, options: ["HMS Dreadnought", "SMS Panther", "RMS Lusitania", "HMS Victory"] },
  { q: "Which Serbian nationalist group assassinated Archduke Franz Ferdinand in Sarajevo?", a: 0, options: ["The Black Hand", "The White Rose", "The Red Baron", "The Balkan Brotherhood"] },
  { q: "Which European empire declared war on Serbia first during the July Days?", a: 0, options: ["Austria-Hungary", "Germany", "Russia", "Great Britain"] },
  { q: "Who was the British Secretary of State for War who launched a massive recruitment campaign in 1914?", a: 0, options: ["Lord Horatio Kitchener", "Winston Churchill", "Douglas Haig", "David Lloyd George"] },
  { q: "What was the nickname given to battalions made up of friends, colleagues, and neighbors who enlisted together?", a: 0, options: ["Pals Battalions", "Buddy Brigades", "Mates Regiments", "Comrade Companies"] }
];
const l1 = unitData.lessons.find(l => l.id === 'lesson_1');
if (l1) l1.quiz = quiz1;

const quiz3 = [
  { q: "Approximately how many men from the British Empire and its dominions served in the First World War?", a: 0, options: ["3 million", "500,000", "10 million", "100,000"] },
  { q: "Which imperial army sent over 1.5 million men to fight in the war?", a: 0, options: ["The British Indian Army", "The Canadian Army", "The Australian Imperial Force", "The South African Defence Force"] },
  { q: "Which battle featured troops from Australia and New Zealand (ANZACs) fighting a devastating campaign against the Ottoman Empire?", a: 0, options: ["Gallipoli", "The Somme", "Passchendaele", "Verdun"] },
  { q: "In December 1918, where did members of the British West Indies Regiment mutiny due to severe racial discrimination?", a: 0, options: ["Taranto, Italy", "Ypres, Belgium", "Cairo, Egypt", "London, England"] },
  { q: "Despite their massive sacrifices, how were imperial troops often treated in the official post-war victory celebrations?", a: 0, options: ["They were largely forgotten and excluded from events like the London Victory Parade.", "They were given the highest honors and led the parades.", "They were granted immediate independence for their home countries.", "They were all given British citizenship and land."] }
];
const l3 = unitData.lessons.find(l => l.id === 'lesson_3');
if (l3) l3.quiz = quiz3;

const quiz4 = [
  { q: "What term describes a conflict where the boundary between soldiers and civilians vanishes?", a: 0, options: ["Total War", "Absolute War", "Unlimited War", "Civilian Warfare"] },
  { q: "What law gave the British government sweeping emergency powers in August 1914?", a: 0, options: ["The Defense of the Realm Act (DORA)", "The Emergency Powers Act", "The Conscription Act", "The Civilian Control Order"] },
  { q: "What nickname was given to women who worked in munitions factories and suffered from yellow skin due to toxic TNT?", a: 0, options: ["Canary Girls", "Yellow Women", "TNT Ladies", "Explosive Girls"] },
  { q: "What term describes men who refused to fight in the war on moral, political, or religious grounds?", a: 0, options: ["Conscientious Objectors", "Pacifist Resisters", "Cowardly Dodgers", "Anti-War Rebels"] },
  { q: "How did the British government respond to the severe food shortages caused by German U-boat attacks in 1918?", a: 0, options: ["They introduced rationing to ensure fair distribution of food.", "They surrendered to Germany.", "They imported all their food from America.", "They forced citizens to grow their own food or face prison."] }
];
const l4 = unitData.lessons.find(l => l.id === 'lesson_4');
if (l4) l4.quiz = quiz4;

// 4. Wrap Local History Spotlights
// Lesson 1 Spotlight
if (l1) {
  let text = l1.narrative_blocks[1].text;
  let target = 'For men living in Stubbington, Fareham, and Portsmouth, the call to arms was answered locally. In August 1914, the Portsmouth Citizens Patriotic Recruiting Committee formed the 14th and 15th Battalions of the Hampshire Regiment, famously known as the "Pompey Pals". Local boys trained together and went to France together. Tragically, the industrialized slaughter of the Western Front tore these communities apart. At the Battle of the Somme on September 3, 1916, 587 men from the 1st Pompey Pals went "over the top" near the River Ancre; 457 of them became casualties in a single day, devastating local families.';
  if (text.includes(target)) {
    l1.narrative_blocks[1].text = text.replace(target, '<div class="local-history-spotlight"><strong>Local History: The Pompey Pals</strong><br>' + target + '</div>');
  }
}

// Lesson 4 Spotlight
if (l4) {
  let text = l4.narrative_blocks[0].text;
  let target = 'Locally, women from Fareham, Stubbington, and Gosport flocked to work at the <strong>Priddy\'s Hard armaments depot</strong> and the Royal Clarence Yard. Known as "Munitionettes" or "Canary Girls," these women worked twelve-hour shifts handling highly explosive TNT. The toxic chemicals stained their skin bright yellow and turned their hair ginger-green. Despite the horrific danger of explosions and toxic lung damage, working in munitions gave women unprecedented financial independence.';
  if (text.includes(target)) {
    l4.narrative_blocks[0].text = text.replace(target, '<div class="local-history-spotlight"><strong>Local History: Priddy\'s Hard</strong><br>' + target + '</div>');
  }
}

// Lesson 5 Spotlight
const l5 = unitData.lessons.find(l => l.id === 'lesson_5');
if (l5) {
  let text = l5.narrative_blocks[0].text;
  let target = '<strong>Local History: The Surrender in the Solent</strong><br>\nFor the people of Hampshire, the end of the war was deeply visible. Under the terms of the Armistice, Germany had to surrender its deadly submarine fleet. Dozens of German U-boats were escorted by the Royal Navy into the Solent and docked at Portsmouth. For the locals in Fareham and Gosport, seeing these terrifying enemy vessels sitting silently in their own harbor was a stark, physical symbol that the total war was finally over.';
  if (text.includes(target)) {
    l5.narrative_blocks[0].text = text.replace(target, '<div class="local-history-spotlight">' + target.replace('\n', '<br>') + '</div>');
  }
}

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Fixes applied successfully!');
