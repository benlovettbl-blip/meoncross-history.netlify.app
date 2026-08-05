const fs = require('fs');

const dataStr = fs.readFileSync('great_war_part2/data.js', 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);
const data = JSON.parse(dataStr.substring(jsonStartIndex));

// Fix Lesson 1 Image and Text
const l1 = data.lessons.find(l => l.id === 'lesson_1');
if (l1) {
  const block = l1.narrative_blocks[2]; // The Source Pit Stop
  block.text = "The British government needed millions of men, and they used every psychological trick available to get them. <br><br><strong>Source A: 'Women of Britain Say GO!' Poster (1915)</strong><br>This famous propaganda poster featured women and children looking out of a window as soldiers marched away. It was designed to weaponize guilt and masculinity, implying that real men protected women and children, and that women wanted their men to fight.<br><br><strong>Source B: The White Feather Campaign</strong><br>If official propaganda didn't work, social peer pressure often did. Admiral Charles Fitzgerald founded the 'Order of the White Feather' in 1914. He encouraged women to hand out white feathers—a traditional symbol of cowardice—to any young man seen out of uniform in public. This weaponized social shame. Many teenage boys, terrified of being humiliated in front of their friends or girlfriends, lied about their age to escape the shame, joining the army at just 15 or 16 years old.";
  block.image = "/images/gw_women_say_go.jpg";
  block.image_alt = "'Women of Britain Say GO!' Recruitment Poster";
}

// Fix Lesson 2 Image
const l2 = data.lessons.find(l => l.id === 'lesson_2');
if (l2) {
  const block = l2.narrative_blocks[2];
  block.image = "/images/gw_flooded_trench.jpg";
  block.image_alt = "Soldiers standing waist-deep in a flooded trench";
}

// Fix Lesson 3 Image
const l3 = data.lessons.find(l => l.id === 'lesson_3');
if (l3) {
  const block = l3.narrative_blocks[2];
  block.image = "/images/gw_indian_army.jpg";
  block.image_alt = "Soldiers of the British Indian Army on the Western Front";
}

// Fix Lesson 4 Image
const l4 = data.lessons.find(l => l.id === 'lesson_4');
if (l4) {
  const block = l4.narrative_blocks[2];
  block.image = "/images/gw_munitionettes.jpg";
  block.image_alt = "Female munitions workers producing artillery shells";
}

// Expand Lesson 6
const l6 = data.lessons.find(l => l.id === 'lesson_6');
if (l6) {
  l6.narrative_blocks = [
    {
      "title": "Stubbington's Lost Generation",
      "text": "To look at the wooden shelter in the centre of Stubbington's village green today, you might think it is just a quiet place to sit. But if you look up at the timber beams under its roof, you will find 67 names carved into the wood. These are the names of the young people from Stubbington and Hill Head who went off to fight in the First World War and never returned.<br><br>For a small, rural village, the war was not a distant political event—it was a devastating local tragedy that tore through families, streets, and schoolrooms. Behind every name on that memorial is a shattered family.",
      "tasks": [
        {
          "type": "text",
          "text": "<strong>Part A: Core Factual Recall</strong><br>1. Where was the Stubbington War Memorial erected in 1922?<br>2. How many local names from Stubbington and Hill Head are carved into the memorial?",
          "model": "1. It was built on the Village Green, covering the local village pump.<br><br>2. There are 67 names carved into the memorial."
        }
      ],
      "image": "/images/stubbington_memorial_1.jpg",
      "image_alt": "The wooden Stubbington War Memorial on the village green"
    },
    {
      "title": "The Tragedy of the Lowry Brothers",
      "text": "Of all the families in the parish, none paid a heavier price than the Lowrys. William and Annie Lowry lived in a grand house called Manor Way Grange. They had three sons, all of whom went off to fight. Not one of them came home.<br><br><strong>William \"Harper\" Lowry (25)</strong>, a brilliant Cambridge student, joined the Indian Army. On 4th June 1915, he was killed leading a desperate charge up a narrow ravine at Gallipoli under intense Turkish machine-gun fire. His body was never found.<br><br><strong>Cyril \"Patrick\" Lowry (20)</strong> joined the West Yorkshire Regiment. In a heartbreaking twist of fate, he served in the exact same battalion commanded by his older brother, Eric. On 25th March 1918, Patrick was killed in action during a massive German offensive near the Somme—in full view of his own brother. His body was never recovered.<br><br><strong>Auriol \"Eric\" Lowry (25)</strong>, the highly decorated middle brother, had survived the heartbreak of seeing his younger brother die. An exceptionally brave leader who won the DSO and Military Cross, his time ran out just weeks before the war ended. On 23rd September 1918, he was hit by a machine-gun bullet and died in his runner's arms.<br><br>Devastated by the loss of all three sons, their father built the Lowry Memorial Hall in Lee-on-the-Solent to ensure his boys would never be forgotten.",
      "tasks": [
        {
          "type": "text",
          "text": "<strong>Part B: Conceptual Analysis (Micro-History)</strong><br>Why is the story of the three Lowry brothers historically significant when studying the impact of the First World War?",
          "model": "The loss of the Lowry brothers is significant because it highlights the concentrated grief experienced by individual families. It shows how the war didn't just cause random casualties, but often wiped out multiple siblings from the same household, devastating local family structures."
        }
      ],
      "image": "/images/gw_death_plaque.jpg",
      "image_alt": "A bronze 'Dead Man's Penny' memorial plaque given to families of the fallen"
    },
    {
      "title": "Nita Madeline King & A Father's Grief",
      "text": "Among the list of fallen soldiers on the village green, one name stands out as different: <strong>Nita Madeline King</strong>. She is the <em>only woman</em> commemorated on the Stubbington War Memorial.<br><br>Nita (29) wanted to do her part and volunteered for the Queen Mary's Army Auxiliary Corps (QMAAC). She was sent to Wimereux in France, a massive, high-pressure hospital centre for thousands of wounded soldiers. But the enemy in Wimereux was not just bullets—it was disease. In the crowded military hospitals, Nita contracted cerebrospinal meningitis and died on 25th May 1917. Following her death, her grieving mother, Lydia, became the primary force behind building the Stubbington War Memorial, donating a fortune (£200) to ensure the village had a beautiful wooden shelter.<br><br><strong>The Father Who Carved His Son's Name</strong><br>Arthur Tribbeck, a local carpenter, was chosen by the village to build the wooden shelter with his own hands. Tragically, as he constructed it, he had to prepare the timber to hold the name of his own son, <strong>Harold Tribbeck</strong>. Harold had bravely refused to have his leg amputated after a terrible wound in 1918, and died of gangrene aged just 21.",
      "tasks": [
        {
          "type": "text",
          "text": "<strong>Part C: The \"Judgement & Nuance\" Paragraph Scaffold</strong><br>Write a structured paragraph answering the following: <em>\"To what extent do local war memorials provide a more accurate picture of the First World War than military statistics?\"</em>",
          "model": "While military statistics show the global scale of the war, local war memorials are essential for revealing the true human cost. Factual evidence, such as the tragic loss of the three Lowry brothers or a carpenter having to carve his own son's name into the memorial, highlights the devastating emotional blow to a tight-knit community. However, looking only at one village's memorial does not explain why the war was won or lost on a tactical level. Ultimately, while statistics are necessary to understand the vast scope of the conflict, combining them with micro-histories gives historians the most complete picture by fostering historical empathy."
        }
      ]
    }
  ];
}

fs.writeFileSync('great_war_part2/data.js', preText + JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated images and expanded Lesson 6!');
