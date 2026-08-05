const fs = require('fs');

const dataStr = fs.readFileSync('great_war_part2/data.js', 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);
const data = JSON.parse(dataStr.substring(jsonStartIndex));

// Lesson 1 updates
const l1 = data.lessons.find(l => l.id === 'lesson_1');
if (l1) {
  // Expand Pompey Pals text
  l1.narrative_blocks[1].text = `To encourage recruitment, the government promised that friends, sports teammates, and work colleagues could enlist and fight side-by-side in "Pals Battalions." <div class="local-history-spotlight"><strong>Local History: The Pompey Pals</strong><br>For men living in Stubbington, Fareham, and Portsmouth, the call to arms was answered locally with overwhelming enthusiasm. In August 1914, the Portsmouth Citizens Patriotic Recruiting Committee formed the 14th and 15th Battalions of the Hampshire Regiment, famously known as the "Pompey Pals". Men who had grown up on the same streets, worked in the same dockyards, and supported the same football teams now trained together, sharing tents and rations before crossing the Channel to France.<br><br>Tragically, the fatal flaw of the Pals Battalions was that industrialized slaughter could wipe out the male population of entire streets in a single afternoon. At the Battle of the Somme on September 3, 1916, 587 men from the 1st Pompey Pals went "over the top" near the River Ancre. Facing heavily fortified German machine guns, 457 of them became casualties (killed, wounded, or missing) in a single day. The devastating news arrived in Portsmouth via telegraph, shattering local families and leaving a deep, enduring scar on the community.</div>`;
  
  // Add Source Pit Stop for Lesson 1
  l1.narrative_blocks.splice(2, 0, {
    "title": "Source Pit Stop: Propaganda & Peer Pressure",
    "text": "The British government needed millions of men, and they used every psychological trick available to get them. <br><br><strong>Source A: Lord Kitchener Poster (1914)</strong><br>The most famous propaganda poster of the war featured Lord Kitchener, the Secretary of State for War, pointing directly at the viewer with the caption: <em>'Your Country Needs YOU'</em>. The eyes were designed to follow the viewer across the room, creating an inescapable sense of personal duty and guilt.<br><br><strong>Source B: The White Feather Campaign</strong><br>If official propaganda didn't work, social peer pressure often did. Admiral Charles Fitzgerald founded the 'Order of the White Feather' in 1914. He encouraged women to hand out white feathers—a traditional symbol of cowardice—to any young man seen out of uniform in public. This weaponized social shame. Many teenage boys, terrified of being humiliated in front of their friends or girlfriends, lied about their age to escape the shame, joining the army at just 15 or 16 years old.",
    "tasks": [
      {
        "type": "text",
        "text": "<strong>Source Analysis:</strong><br>Study Source A and Source B. Which method of recruitment do you think was more effective in convincing a 16-year-old boy to lie about his age and enlist: the official government poster, or the threat of a white feather? Explain your reasoning.",
        "model": "The white feather was likely more effective because it weaponized direct, personal social shame. While the poster appealed to a sense of national duty, a 16-year-old boy would be terrified of being humiliated in public by women in his own community, making the peer pressure impossible to ignore."
      }
    ],
    "image": "/images/gw_kitchener.jpg",
    "image_alt": "Lord Kitchener 'Your Country Needs You' Poster"
  });
}

// Lesson 2 updates
const l2 = data.lessons.find(l => l.id === 'lesson_2');
if (l2) {
  // Expand Trench conditions block
  l2.narrative_blocks[1].text = `Soldiers on the Western Front lived in a subterranean world of mud, fear, and disease. <br><br><strong>Physical Hardships</strong><br>The trenches were frequently flooded with freezing, foul-smelling water. Men often stood waist-deep in mud for days, leading to a horrifying fungal infection called <em>Trench Foot</em>. If left untreated, the foot would turn black and gangrenous, requiring amputation. Giant, disease-carrying black rats—some the size of cats—fed on unburied corpses and swarmed the dugouts. Lice infested the soldiers' clothing, causing 'Trench Fever', a disease characterized by high fever and severe joint pain.<br><br><strong>New Weapons of Terror</strong><br>Beyond the disease, the trenches offered no safety from the industrialized weapons of 1914. Artillery bombardments could last for weeks, firing millions of explosive shells that caused devastating shrapnel wounds and buried men alive. The psychological toll of this constant, deafening bombardment led to a new psychiatric condition called 'Shell Shock' (now known as PTSD). Furthermore, 1915 saw the introduction of poison gas (chlorine, phosgene, and mustard gas). Mustard gas was particularly feared; it was heavier than air, sinking into the bottom of trenches, and caused agonizing internal and external blisters, blinding its victims and destroying their lungs.`;
  
  // Add Source Pit Stop for Lesson 2
  l2.narrative_blocks.splice(2, 0, {
    "title": "Source Pit Stop: Eyewitness in the Mud",
    "text": "To truly understand the conditions, we must read the words of the men who survived them.<br><br><strong>Source C: Extract from the diary of Private Arthur Savage (1915)</strong><br><em>\"The mud was so deep and thick that if you slipped off the duckboards, you would sink up to your waist. I saw men drown in that mud. The rats were as big as cats, and they were completely fearless. They would run across your face while you tried to sleep. But the worst was the smell—a mixture of cordite, chloride of lime, and the sweet, sickly stench of death that never left your nostrils.\"</em>",
    "tasks": [
      {
        "type": "text",
        "text": "<strong>Source Analysis (Utility):</strong><br>How useful is Source C for a historian studying the physical conditions of trench warfare? Use the source's content and its provenance (who wrote it and when) in your answer.",
        "provenance_clue": "Hint: Think about who Private Savage is, when he is writing this, and what specific sensory details he includes.",
        "model": "Source C is highly useful because it is a primary eyewitness account written by a soldier who actually lived in the trenches in 1915. The content provides specific, visceral details about the physical conditions, such as the fatal depth of the mud and the 'fearless' rats. Because it is a personal diary, it is likely an honest reflection of his daily survival rather than government propaganda, making it a reliable and highly valuable source for historians."
      }
    ],
    "image": "/images/gw_trench_foot.jpg",
    "image_alt": "Soldiers standing in flooded trenches"
  });
}

// Lesson 3 updates
const l3 = data.lessons.find(l => l.id === 'lesson_3');
if (l3) {
  // Expand The Scale of the Contribution
  l3.narrative_blocks[0].text = `When Britain declared war on Germany in 1914, it did not just commit the men of the British Isles; it committed a vast global empire. By the end of the conflict, nearly 3 million men from across the British Empire and its dominions had served.<br><br><strong>The Scale of the Contribution</strong><br>The sheer scale of the imperial effort was staggering. The British Indian Army sent over 1.5 million men to fight across multiple theaters, including the freezing trenches of Ypres and the scorching deserts of Mesopotamia. Without the arrival of two Indian divisions in late 1914, the British line on the Western Front might have collapsed entirely. <br><br>The bravery of these men was extraordinary. On 31 October 1914 at the First Battle of Ypres, Sepoy <strong>Khudadad Khan</strong> of the 129th Baluchis operated his machine gun under heavy fire until all the other men in his team were killed and he himself was severely wounded. He was the first Indian soldier to be awarded the Victoria Cross, Britain's highest military honor.<br><br>Meanwhile, the British West Indies Regiment (BWIR) raised over 15,000 men from the Caribbean, and hundreds of thousands of African men were recruited—often forcibly—to serve as soldiers and carriers in the brutal East African campaign, where disease and exhaustion claimed countless lives.`;

  // Expand Racial Hierarchy
  l3.narrative_blocks[1].text = `<strong>Racial Hierarchy and Discrimination</strong><br>Despite their immense sacrifices, soldiers of color faced systemic racism and a strict imperial racial hierarchy. The British War Office was deeply uncomfortable with the idea of non-white troops fighting and killing European armies. Consequently, many black soldiers, particularly in the BWIR, were stripped of their combat roles and reassigned to dangerous, degrading manual labor—digging trenches, carrying ammunition, and burying the dead under heavy artillery fire.<br><br>Black soldiers were paid less than their white counterparts, were barred from being promoted to commissioned officers, and were often denied access to the same canteens and hospitals. The tension reached breaking point in December 1918. BWIR soldiers in Taranto, Italy, mutinied over these exact degrading conditions. They were forced to clean the latrines of white Italian soldiers and were denied the pay rise that had been granted to white British troops. The mutiny was suppressed, the ringleaders were imprisoned, and the BWIR was rapidly disbanded, their contributions swept under the rug.`;

  // Add Source Pit Stop for Lesson 3
  l3.narrative_blocks.splice(2, 0, {
    "title": "Source Pit Stop: A 'White Man's War'?",
    "text": "For decades, the popular memory of the First World War was heavily Eurocentric—dominated by images of white British soldiers in the mud of the Western Front. Read the two contrasting interpretations below to understand how modern historians are challenging this narrative.<br><br><blockquote><strong>Interpretation A: The Traditional (Eurocentric) Focus</strong><br><em>\"The Great War was a European tragedy, fought on the muddy fields of Flanders and the plains of France. It was here, in the brutal stalemate of the trenches, that the British soldier endured the ultimate test of endurance and secured the victory of the civilized world.\"</em><br>— <em>Adapted from the typical narrative focus of mid-20th-century British school textbooks</em></blockquote><br><br><blockquote><strong>Interpretation B: The Modern Global View</strong><br><em>\"The First World War was a truly global conflict... Yet in the decades that followed, the presence of hundreds of thousands of black and Asian soldiers was subtly marginalized. This historical amnesia was no accident. The narrative of a 'white man’s war' was constructed to preserve the racial hierarchy of the Empire.\"</em><br>— <em>Adapted from David Olusoga, The World's War (2014)</em></blockquote>",
    "tasks": [
      {
        "type": "text",
        "text": "<strong>Source Analysis:</strong><br>1. Why might mid-20th-century textbooks (Interpretation A) have ignored the story of Khudadad Khan and the Taranto Mutiny?<br>2. According to Interpretation B, why did the British Empire deliberately construct the narrative of a 'white man's war'?",
        "model": "1. Textbooks likely ignored these stories because they focused on a Eurocentric narrative of white British suffering and victory, reflecting the societal racism and imperial attitudes of the mid-20th century.<br><br>2. Interpretation B argues this was deliberate 'historical amnesia' designed to preserve the racial hierarchy of the Empire. Acknowledging that non-white troops were essential to saving the British Empire would have undermined the myth of white supremacy that justified colonial rule."
      }
    ],
    "image": "/images/gw_indian_troops.jpg",
    "image_alt": "Indian troops in the trenches"
  });
}

// Lesson 4 updates
const l4 = data.lessons.find(l => l.id === 'lesson_4');
if (l4) {
  // Expand DORA block
  l4.narrative_blocks[0].text = `To win a total war of industrial survival, the British government realized it needed complete control over the civilian population. In August 1914, Parliament passed the <strong>Defence of the Realm Act (DORA)</strong>, granting the government sweeping, unprecedented powers over the daily lives of British citizens.<br><br><strong>Controlling the Home Front</strong><br>DORA allowed the government to bypass Parliament and issue direct orders. The rules ranged from the deadly serious to the bizarrely specific. Under DORA, it became illegal to fly a kite, light a bonfire, or feed wild animals, as these could potentially signal enemy zeppelins or waste valuable food. British Summer Time (Daylight Savings) was introduced to maximize factory working hours. Crucially, pub opening hours were strictly limited and alcohol was watered down, as the government feared that drunk munitions workers would slow down shell production.<br><br>DORA also introduced extreme censorship. The government controlled the newspapers, heavily censoring reports of British defeats and casualty numbers to maintain civilian morale. Letters written by soldiers at the front were read by officers, who used black markers to cross out any details about military locations, horrific trench conditions, or low morale before they could be sent home to families.`;

  // Expand Canaries block
  l4.narrative_blocks[1].text = `<strong>The 'Canaries' and Total War</strong><br>With millions of men fighting overseas, the British economy faced collapse. The solution was the mass mobilization of women into the workforce. Over a million women took up jobs previously reserved exclusively for men—driving buses, working on farms (the Women's Land Army), and crucially, manufacturing weapons.<br><br>These female munitions workers were affectionately known as the \"Canaries.\" They worked long, exhausting shifts packing highly explosive TNT into artillery shells. The toxic chemicals turned their skin and hair a bright yellowish-orange (hence the nickname). The work was exceptionally dangerous; toxic jaundice caused liver failure, and accidental explosions were a constant threat. In 1917, the Silvertown munitions factory in London exploded, killing 73 people and destroying hundreds of homes. Despite the extreme danger and the toxic health effects, the Canaries produced over 80% of the weapons and shells used by the British Army, proving that women were entirely capable of performing heavy industrial labor.`;

  // Add Source Pit Stop for Lesson 4
  l4.narrative_blocks.splice(2, 0, {
    "title": "Source Pit Stop: Censorship and Control",
    "text": "The government realized that controlling information was just as important as producing weapons.<br><br><strong>Source D: A censored letter home from the Somme (1916)</strong><br><em>\"Dear Mother, We are currently stationed at [CENSORED]. The weather is terrible, and the [CENSORED] is up to our knees. We lost [CENSORED] men yesterday during the push toward [CENSORED]. Don't worry about me, I am keeping my head down.\"</em>",
    "tasks": [
      {
        "type": "text",
        "text": "<strong>Source Analysis:</strong><br>Looking at Source D, why did the British government use DORA to mandate the strict censorship of soldiers' letters home? (Give two specific reasons).",
        "model": "Firstly, the government censored locations and troop movements so that if the mail was intercepted by German spies, they would not gain any tactical military advantage. Secondly, they censored casualty numbers and descriptions of the horrific conditions to protect civilian morale on the Home Front, preventing families from realizing the true scale of the slaughter and turning against the war effort."
      }
    ],
    "image": "/images/gw_munitions_women.jpg",
    "image_alt": "Female munitions workers in a factory"
  });
}

// Lesson 5 updates
const l5 = data.lessons.find(l => l.id === 'lesson_5');
if (l5) {
  // Expand The Big Three block
  l5.narrative_blocks[0].text = `When the guns finally fell silent on November 11, 1918, the world was left in ruins. Millions were dead, empires had collapsed, and the map of Europe had to be redrawn. In January 1919, the victorious Allied leaders gathered at the Palace of Versailles in Paris to decide the fate of a defeated Germany. The conference was dominated by the \"Big Three\":<br><br><ul><li><strong>Georges Clemenceau (France):</strong> Known as 'The Tiger', Clemenceau wanted revenge. Most of the fighting on the Western Front had taken place on French soil, destroying their industry and land. He wanted Germany crippled militarily and financially so they could never attack France again.</li><li><strong>Woodrow Wilson (USA):</strong> An idealist who had only joined the war in 1917. Wilson wanted a fair peace based on his 'Fourteen Points'. He believed punishing Germany too harshly would only lead to a future war for revenge. He also proposed a 'League of Nations' to solve future disputes peacefully.</li><li><strong>David Lloyd George (Britain):</strong> A pragmatist caught in the middle. He had just won a British election promising to \"Make Germany Pay!\", but privately, he worried that a destroyed Germany would lead to a communist revolution and would ruin British trade in Europe.</li></ul>`;

  // Expand The Terms of the Treaty block
  l5.narrative_blocks[1].text = `<strong>The Terms of the Treaty: A Diktat</strong><br>Germany was not invited to negotiate; they were simply handed the treaty and forced to sign it under the threat of invasion. For this reason, Germans bitterly referred to the treaty as a <strong>Diktat</strong> (a dictated peace). The terms were deliberately devastating:<br><br><ul><li><strong>Territory (Land):</strong> Germany lost 13% of its European land and 12% of its population. The wealthy coal fields of the Saar were given to France for 15 years, and the industrial region of Alsace-Lorraine was returned to France. Crucially, the 'Polish Corridor' was carved out of Germany, splitting the country in two.</li><li><strong>Military:</strong> The proud German army was slashed to just 100,000 men. They were banned from having an air force (Luftwaffe), tanks, or submarines. The Rhineland (the border area with France) was demilitarized.</li><li><strong>Reparations (Money):</strong> Germany was ordered to pay a staggering £6.6 billion in reparations to the Allies for the damage caused by the war—an impossible sum that would shatter the German economy.</li><li><strong>Blame:</strong> The most hated term was Article 231 (The War Guilt Clause), which forced Germany to accept 100% of the blame for starting the war.</li></ul>`;

  // Add Source Pit Stop for Lesson 5
  l5.narrative_blocks.splice(2, 0, {
    "title": "Source Pit Stop: German Reaction",
    "text": "The German public was shocked and outraged by the severity of the Treaty. They had believed Wilson's fair 'Fourteen Points' would be the basis for peace.<br><br><strong>Source E: A German political cartoon published in 1919</strong><br><em>The cartoon shows a German man stripped to his underwear. Standing around him are Clemenceau, Wilson, and Lloyd George. Clemenceau holds a giant guillotine blade labeled 'Versailles'. The caption reads: 'When we have taken everything else, we will take your life.'</em>",
    "tasks": [
      {
        "type": "text",
        "text": "<strong>Source Analysis:</strong><br>How does the German political cartoon (Source E) reflect the German public's attitude toward the Treaty of Versailles? Refer specifically to the concept of the 'Diktat' and the Big Three.",
        "model": "The cartoon reflects the intense anger and feeling of victimization in Germany. By showing the German man stripped of his clothes, it symbolizes how the Treaty stripped Germany of its territory, military, and wealth (the £6.6 billion reparations). The guillotine blade held by Clemenceau shows that Germans viewed the Treaty not as a peace settlement, but as a deliberate execution of their nation. It highlights their view of the Treaty as an unfair 'Diktat' forced upon them by the vengeful Big Three."
      }
    ],
    "image": "/images/gw_versailles_cartoon.jpg",
    "image_alt": "German political cartoon reacting to the Treaty of Versailles"
  });
}

fs.writeFileSync('great_war_part2/data.js', preText + JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully expanded Lessons 1-5!');
