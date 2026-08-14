const fs = require('fs');

const lesson7Data = {
  "id": "lesson_7",
  "title": "Who truly benefited from 19th-century transformation?",
  "teacher_notes": {
    "primer": "This capstone lesson serves as the synthesis module for the entire 'Industrialisation and Empire' unit. Its pedagogical purpose is to guide high-ability pupils through the process of constructing a complex, balanced historical argument that weighs the structural advancements of technology and empire against the human cost of exploitation and political suppression.",
    "objectives": [
      {
        "objective": "Synthesize unit-wide knowledge to evaluate historical progress versus exploitation.",
        "primer": "Train pupils to categorize and cross-reference evidence from prior lessons, linking technological milestones directly to their socio-economic consequences.",
        "question": "Can an historical era be categorized as an era of progress if the advancements were built on systemic exploitation?"
      },
      {
        "objective": "Deconstruct the Optimist and Pessimist historiographical debate.",
        "primer": "Equip students with the analytical vocabulary required to structure a multi-perspective synthesis essay, moving past one-sided descriptions into high-level evaluative judgments.",
        "question": "How do historians use the exact same factual database to arrive at completely opposing historical interpretations?"
      },
      {
        "objective": "Structure a rigorous 16-mark historical essay using balanced thematic analysis.",
        "primer": "Scaffold the construction of an analytical essay, ensuring pupils lead with a clear thesis statement, deploy precise evidence, and maintain a sustained line of judgment through to the conclusion.",
        "question": "What distinguishes an informative essay that merely describes facts from an analytical essay that sustains an historical argument?"
      }
    ]
  },
  "do_now": {
    "title": "Do Now: Recall",
    "type": "questions",
    "items": [
      {
        "question": "What was a 'Rotten Borough' in the pre-reform British electoral system, and what local Hampshire example illustrates this corruption?",
        "answer": "A rotten borough was a voting district that had lost virtually its entire population over centuries but still sent two MPs to Parliament. A local example was Newtown on the Isle of Wight (historic Hampshire), which had only 14 houses but retained two MPs."
      },
      {
        "question": "How did the 1832 Great Reform Act deliberately attempt to stabilize elite power while expanding the franchise?",
        "answer": "The 1832 Act expanded the vote only to middle-class property owners (£10 qualification), deliberately excluding the working class. The elite hoped this compromise would pacify the country, ally the middle class with the establishment, and block further democratic expansion."
      },
      {
        "question": "Why was the introduction of the 1872 Secret Ballot Act considered a devastating blow to upper-class political intimidation?",
        "answer": "Prior to 1872, voting was public, allowing landlords and factory bosses to watch how men voted and punish them with eviction or unemployment. The Secret Ballot made voting entirely private, collapsing the elite's mechanism of bribery and intimidation."
      }
    ]
  },
  "sources": [
    {
      "title": "Capital and Labour: The Two Faces of Victorian Britain",
      "caption": "A classic 1843 satirical illustration from Punch magazine juxtaposing the extreme opulence, luxury, and technological triumph of the upper classes directly above the dark, exhausting, and impoverished reality of the working-class laborers who built that wealth.",
      "src": "/images/capital_labour.jpg"
    }
  ],
  "vocab": [
    {
      "term": "Synthesis",
      "definition": "The act of combining different ideas, data points, and historical interpretations into a single, cohesive, and balanced argument."
    },
    {
      "term": "Historiographical Debate",
      "definition": "The ongoing disagreement between different schools of historians regarding how a specific past event or era should be interpreted."
    },
    {
      "term": "Façade",
      "definition": "An outward appearance or deceptive exterior that hides a very different, often unpleasant, reality beneath it."
    },
    {
      "term": "Oligarchy",
      "definition": "A small group of wealthy, privileged people who hold absolute control over a country or organization."
    },
    {
      "term": "Concession",
      "definition": "Something granted or yielded by a group in power, often reluctantly, in response to intense political pressure or demands."
    }
  ],
  "narrative_blocks": [
    {
      "title": "The Optimist View: Industrial Triumph and Imperial Grandeur",
      "text": "When assessing the 19th century, 'Optimist' or traditional historians argue that this era was a period of unmatched national progress and global triumph. From this perspective, the Industrial Revolution was an economic engine that transformed Britain into the 'workshop of the world'. This progress was driven by immense local breakthroughs. Henry Cort's revolutionary puddling and rolling processes at the Funtley Ironworks (Lesson 1) allowed Britain to mass-produce cheap, high-quality wrought iron. This iron physically built the railways, factories, and the cutting-edge ironclad warships of the Royal Navy, such as HMS Warrior (Lesson 4). Simultaneously, the deep clay deposits of Hampshire fueled a massive construction boom. Firms like Joseph Bull & Sons used millions of durable 'Fareham Red' bricks (Lesson 3) to build the expanding dockyards of Portsmouth and the grand monuments of the capital, like London's Royal Albert Hall. To the Optimists, the generation of this immense industrial wealth and global naval supremacy represents a golden age that eventually lifted the standard of living for the entire nation.",
      "level_4": "Optimist historians argue that the 1800s were a time of great progress and wealth. They point to amazing inventions like Henry Cort's iron process at Funtley, which made the high-quality iron used to build trains and massive warships like HMS Warrior. They also point to Fareham's brick industry, which produced millions of famous 'Fareham Reds' to build the Portsmouth dockyards and London's Royal Albert Hall. To these historians, this industrial boom made Britain the richest and most advanced nation on earth.",
      "tasks": [
        {
          "type": "categorisation",
          "qNum": 1,
          "question": "Categorise the following list of historical facts into either 'Evidence of National Progress & Wealth' (The Optimist View) or 'Evidence of Working-Class / Colonial Exploitation' (The Pessimist View) by writing them under the correct headings:\n1. Henry Cort's puddling process increases iron production by 400%.\n2. The 1881 Fareham Census records 10-year-old boys working as 'pug boys' in clay pits.\n3. Indian handloom weavers are forced into starvation by English 'captive market' trade laws.\n4. Fareham Red bricks are selected to construct the Royal Albert Hall in London.\n5. Edwin Chadwick records that deaths from filth and overcrowding in industrial towns outnumber casualties in modern wars.\n6. HMS Warrior enforces the 'Two-Power Standard' globally, protecting merchant shipping lanes.",
          "model_answer": "### Evidence of National Progress & Wealth (Optimist View)\n* **Fact 1:** Henry Cort's puddling process increases iron production by 400%.\n* **Fact 4:** Fareham Red bricks are selected to construct the Royal Albert Hall in London.\n* **Fact 6:** HMS Warrior enforces the 'Two-Power Standard' globally, protecting merchant shipping lanes.\n\n### Evidence of Working-Class / Colonial Exploitation (Pessimist View)\n* **Fact 2:** The 1881 Fareham Census records 10-year-old boys working as 'pug boys' in clay pits.\n* **Fact 3:** Indian handloom weavers are forced into starvation by English 'captive market' trade laws.\n* **Fact 5:** Edwin Chadwick records that deaths from filth and overcrowding in industrial towns outnumber casualties in modern wars."
        }
      ]
    },
    {
      "title": "The Pessimist View: Squalor, Sabotage, and Slavery",
      "text": "Conversely, 'Pessimist' or revisionist historians argue that Britain's grand imperial wealth was merely a glittering façade that masked horrific human misery. They emphasize that the working classes and colonized populations paid a devastating price for this progress. Nationally, child labor was systematically exploited in textile mills and coal mines (Lesson 2). Locally, the 1881 Census proves that young children were working 14-hour days barefoot in the freezing mud of the Funtley clay pits to manufacture those famous Fareham bricks. In towns like Portsmouth and London, workers were packed into cheap, unventilated 'back-to-back' houses where overflowing cesspits contaminated the drinking water, causing catastrophic cholera outbreaks (Lesson 3). Edwin Chadwick's 1842 report explicitly proved that the slums were deadlier than war. This misery was replicated abroad: the East India Company violently conquered India and established a 'captive market' that intentionally bankrupted local Indian weavers to enrich British mill owners (Lesson 4). To the Pessimists, this misery explains why working people were driven to desperate resistance—from the violent machine-breaking of the Hampshire Swing Riots (1830) to the massive political campaigns of the Chartists (Lesson 5).",
      "level_4": "Pessimist historians argue that Britain's wealth was built on cruelty and suffering. They highlight how poor children were exploited, working 14-hour days in dangerous factories, or working barefoot in the cold mud of the Funtley clay pits. In cities like Portsmouth and London, workers lived in crowded, filthy 'back-to-back' slums with no clean water, causing deadly outbreaks of cholera. Abroad, the British Empire used military force to exploit colonies like India, ruining local businesses. This extreme misery is why workers fought back through the violent Swing Riots and the Chartist protests.",
      "tasks": [
        {
          "type": "paragraph_drafting",
          "qNum": 2,
          "question": "Using the Point, Evidence, Explanation (P.E.E.) framework, write a high-quality paragraph arguing that the working classes paid the physical price for Britain's industrial and imperial progress.",
          "model_answer": "**Point:** The working classes paid a devastating physical and human price to fuel Britain's industrial and imperial wealth. \n\n**Evidence:** For example, while famous 'Fareham Red' bricks were used to build grand imperial monuments like the Royal Albert Hall, official local evidence like the 1881 Census reveals that children as young as ten were forced to work barefoot as 'pug boys' and brick turners for 14 hours a day in the freezing mud of the Funtley clay pits. Furthermore, Edwin Chadwick's 1842 report proved that workers in industrial towns were packed into unventilated back-to-back slums where filth and contaminated water caused deadly cholera outbreaks, making the slums deadlier than modern warfare. \n\n**Explanation:** This proves that the progress celebrated by the wealthy elite was entirely dependent on the exploitation of the poor. The stunning infrastructure of the British Empire was not a reflection of national well-being, but was physically bought through the shortened lives, broken health, and hazardous labor of working-class families."
        }
      ]
    },
    {
      "title": "The Strategic Retreat: Elite Fear and Concession",
      "text": "The final element of the 19th-century transformation is the battle for political democracy (Lesson 6). Traditional narratives often suggest that Britain naturally and peacefully evolved into a fair democracy because its leaders valued liberty. However, critical historians argue that the expansion of the vote was a series of calculated, strategic retreats by a panicked ruling class. The wealthy elite who controlled Parliament had zero desire to share power with the working masses, whom they openly viewed as violent and ignorant. Political rights were only conceded when the elite feared that a total violent revolution was imminent. The Great Reform Act of 1832 was passed to ally the wealthy middle classes with the establishment, splitting the reform movement and leaving the working class betrayed. The Secret Ballot Act of 1872 and the expansion of the franchise in 1867 and 1884 were passed because movements like Chartism proved that the working class had developed the numbers and organizational sophistication to overthrow the state if their constitutional demands were ignored completely.",
      "level_4": "Some people think Britain became a democracy because rich leaders wanted to be fair. However, history shows that the ruling class only gave people the right to vote because they were terrified of a violent revolution. Laws like the 1832 Great Reform Act and the 1872 Secret Ballot Act were passed to calm down angry workers after events like the Swing Riots and Chartist rallies. Political power was never gifted out of kindness; it was won by ordinary people making the elite too afraid to say no.",
      "tasks": [
        {
          "type": "text",
          "qNum": 3,
          "question": "Historical Reasoning: Explain why it is historically inaccurate to argue that the British ruling class expanded the right to vote out of a belief in fairness and equality.",
          "model_answer": "It is inaccurate because primary evidence proves the ruling elite deeply feared and despised the working classes, viewing them as violent and incapable of governance, as seen in MP Robert Lowe's 1866 speech. Legislation like the 1832 Great Reform Act and the 1872 Secret Ballot Act were strategic concessions passed out of fear of revolution, not fairness. The elite only expanded the franchise to pacify mass movements like Chartism and protect their own property from being overthrown by a working-class revolt."
        }
      ]
    },
    {
      "title": "Structuring the Synthesis Essay",
      "text": "To successfully answer the core question of this unit, you must organize your evidence into a rigorous, balanced essay structure. Your essay must move away from simply listing facts and instead sustain a clear historical argument from start to finish. Use the following four-part structural framework to plan your response:\n\n1. **Introduction:** Define the key terms of the question, outline the 'Optimist vs. Pessimist' debate, and state your clear thesis (your main argument showing who benefited most).\n2. **Thematic Paragraph 1 (The Scale of Progress):** Explore the massive wealth and technological advancement generated by industrialisation and naval supremacy (e.g., Cort's iron, Fareham bricks, HMS Warrior).\n3. **Thematic Paragraph 2 (The Human Cost):** Contrast that wealth with the systemic exploitation and unlivable squalor suffered by the domestic working classes and colonized populations (e.g., child labor at Funtley, cholera, Indian weavers).\n4. **Thematic Paragraph 3 (The Battle for Power):** Analyze how political power changed, demonstrating that democracy was fought for through movements like Chartism rather than freely given.\n5. **Conclusion:** Summarize your main points and deliver your definitive judgment, answering *who truly benefited*.",
      "level_4": "To write a great history essay, you cannot just list facts. You must build a balanced argument using a clear structure. Start with an Introduction that states your main answer. Write a paragraph on the immense wealth and progress of the era (The Optimists). Write a paragraph on the horrific suffering of the workers and colonies (The Pessimists). Write a paragraph on how ordinary people fought to win the vote. End with a Conclusion that summarizes your final historical judgment.",
      "tasks": [
        {
          "type": "extended_writing",
          "qNum": 4,
          "question": "Capstone Essay (16 Marks): 'The transformation of 19th-century Britain was a triumph of progress that benefited the entire nation.' To what extent do you agree with this interpretation? Write a comprehensive, balanced synthesis essay utilizing evidence from across the entire unit.",
          "model_answer": "The transformation of nineteenth-century Britain was a complex process that fundamentally reshaped the nation's economy, global standing, and political landscape. Traditional or 'Optimist' historians have long interpreted this era as a triumph of progress that ultimately advanced the standard of living for the entire population. However, a rigorous examination of the evidence reveals that this interpretation is deeply flawed. While industrialisation and imperialism generated unprecedented wealth and global dominance, this progress was entirely dependent upon the severe exploitation of the domestic working class and colonized populations. Therefore, the transformation of the nineteenth century was not a collective national triumph, but an unequal victory where the wealthy elite benefited exponentially at the direct physical and economic expense of the poor.\n\nOn one hand, it is undeniable that the nineteenth century represented an era of spectacular technological and industrial progress, generating vast wealth. As 'Optimist' historians highlight, Britain truly became the 'workshop of the world'. This structural progress was driven by remarkable local innovation, such as the metallurgy pioneered by Henry Cort at the Funtley Ironworks. Cort’s puddling and rolling processes allowed Britain to mass-produce high-quality wrought iron on an unprecedented scale, providing the material necessary to build the national railway network, heavy machinery, and the global fleets of the Royal Navy. This naval supremacy was physically manufactured at massive industrial hubs like Portsmouth Dockyard, where advanced warships like HMS Warrior were constructed to enforce the 'Two-Power Standard' and protect global merchant trade. Simultaneously, local resources like the Funtley clay pits boomed, producing millions of highly durable 'Fareham Red' bricks that constructed the infrastructure of Portsmouth and grand imperial monuments like London's Royal Albert Hall. To the ruling elite and the growing middle classes, this immense economic expansion and global power represented absolute national progress.\n\nHowever, this glittering façade of imperial grandeur completely masked a dark and destructive reality for the ordinary people whose labor sustained it. 'Pessimist' historians correctly argue that the working class paid for this wealth with their health, safety, and lives. Nationally, the factory system subjected families to exhausting 14-hour shifts in toxic, unprotected environments. Locally, the 1881 Fareham Census provides quantitative proof that child labor was a vital element of the local economy, recording children as young as ten working as 'pug boys' and brick turners barefoot in the freezing mud of the Funtley brickfields. Furthermore, rapid, unregulated urbanisation turned growing industrial towns into death traps. Workers in Portsmouth and London were crammed into unventilated back-to-back slums where overflowing cesspits routinely contaminated the shared water supply, resulting in devastating waterborne cholera outbreaks. This squalor was so severe that Edwin Chadwick's 1842 government report calculated that deaths from filth and overcrowding outnumbered military casualties in modern wars. This pattern of aggressive extraction was replicated globally; the East India Company used its private military force to subjugate India, establishing a captive market that intentionally flooded the continent with cheap British textiles, systematically bankrupting millions of native Indian weavers. Thus, for the vast majority of people under British rule, the transformation felt like an intense punishment rather than progress.\n\nThis severe socio-economic imbalance explains why ordinary people were forced to launch organized political campaigns to fight for a democratic voice. The political transformation of the nineteenth century proves that democracy was not a benevolent gift from a progressive ruling class, but a series of forced concessions. Terrified by outbreaks of working-class desperation—such as the violent machine-breaking of the 1830 Hampshire Swing Riots—the aristocratic oligarchy passed the 1832 Great Reform Act. However, this act deliberately excluded the working class, granting the franchise only to middle-class property owners to divide the reform movement. This betrayal sparked the rise of Chartism, the first mass working-class political movement. Through the People's Charter, ordinary people demanded structural reforms like universal male suffrage and the secret ballot to protect voters from landlord intimidation. Although Parliament repeatedly rejected their massive petitions, the constant threat of working-class revolution eventually forced the elite to retreat, passing the 1872 Secret Ballot Act and expanding the vote in 1867 and 1884. This political struggle proves that the working class had to fight fiercely to secure even a fraction of the benefits of the modern state.\n\nIn conclusion, the interpretation that the transformation of nineteenth-century Britain was a triumph that benefited the entire nation is largely unsustainable. While the era achieved staggering progress in metallurgy, construction, and global naval power, the benefits of these achievements were concentrated almost exclusively in the hands of wealthy industrialists, elite landowners, and the growing middle class. In stark contrast, the ordinary working men, women, and children of places like Funtley and Portsmouth, alongside millions of colonized subjects in India, were systematically exploited to fuel this economic engine. The unlivable squalor of the slums, the physical destruction of child labor, and the necessity of mass movements like Chartism prove that the majority of the population experienced the era as a period of profound hardship. Ultimately, the 19th century transformed Britain into a global superpower, but it was a triumph built entirely on the broken health and political exclusion of the working class."
        }
      ]
    }
  ]
};

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// Find existing lesson_7 and replace it
const existingIndex = data.lessons.findIndex(l => l.id === 'lesson_7');
if (existingIndex >= 0) {
  data.lessons[existingIndex] = lesson7Data;
} else {
  data.lessons.push(lesson7Data);
}

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected Lesson 7!');
