const fs = require('fs');

const lesson4Data = {
  "id": "lesson_4",
  "title": "How was the British Empire built and sustained?",
  "teacher_notes": {
    "primer": "This lesson investigates the core mechanisms of British imperial power in the 19th century, focusing on the interplay between trade, military execution, and industrial support. It introduces cognitive categorisation, significance mapping, and provenance analysis, anchoring global naval supremacy directly to the domestic workforce at Portsmouth Dockyard.",
    "objectives": [
      {
        "objective": "Understand the transition of imperial rule from private mercantilism to direct state control.",
        "primer": "Guide pupils to analyze how the East India Company's search for market dominance systematically paved the way for the formal governance of the British Raj after 1857.",
        "question": "Which factor was more vital to the expansion of British power in India: corporate wealth or state military intervention?"
      },
      {
        "objective": "Evaluate how domestic industrial complexes sustained global naval supremacy.",
        "primer": "Connect Portsmouth Dockyard's industrial output directly to the enforcement of the 'Two-Power Standard' globally, linking back to the heavy iron metallurgy mastered in Lesson 1.",
        "question": "Could the British Empire have maintained global authority without the industrial capacity of its home dockyards?"
      },
      {
        "objective": "Deconstruct primary source provenance to determine historical utility.",
        "primer": "Train pupils to identify the hidden motives, institutional biases, and reliable insights within official military declarations and corporate petitions.",
        "question": "Why does an author's target audience completely alter the usefulness of their written testimony?"
      }
    ]
  },
  "do_now": {
    "title": "Do Now: Recall",
    "type": "questions",
    "items": [
      {
        "question": "Why did Victorian builders heavily rely on 'Fareham Red' bricks during the rapid urbanisation of the 19th century?",
        "answer": "Fareham Reds were highly durable under intense structural pressure, making them ideal for the massive infrastructure projects of expanding cities like London and Portsmouth."
      },
      {
        "question": "How did the 1842 Chadwick Report challenge the traditional government policy of 'laissez-faire'?",
        "answer": "It provided statistical proof that working-class deaths from filth and overcrowding were higher than casualties caused by modern wars, forcing the state to acknowledge that public health required regulation."
      },
      {
        "question": "What scientific breakthrough did Dr. John Snow achieve during the 1854 cholera outbreak in Soho?",
        "answer": "He mapped local fatalities to prove cholera was a waterborne disease spread via contaminated water pumps, completely disproving the popular Miasma Theory that blamed bad smells."
      }
    ]
  },
  "visual_hook": {
    "title": "HMS Warrior at Portsmouth",
    "caption": "Launched in 1860, HMS Warrior was the world's first iron-hulled, steam-powered ironclad warship, representing the absolute peak of British industrial and naval supremacy.",
    "query": "HMS Warrior 1860 ironclad Portsmouth"
  },
  "vocab": [
    {
      "term": "Mercantilism",
      "definition": "An economic system focused on maximizing a nation's wealth through strictly controlled colonial trade, raw material extraction, and dominant merchant monopolies."
    },
    {
      "term": "British Raj",
      "definition": "The system of direct, formal British government rule over the Indian subcontinent established in the wake of the 1857 Rebellion."
    },
    {
      "term": "Two-Power Standard",
      "definition": "The strict British naval policy declaring that the Royal Navy must always remain larger and stronger than the combined fleets of the next two most powerful nations."
    },
    {
      "term": "Ironclad",
      "definition": "A 19th-century warship protected by thick iron armor plating, representing the transition from wooden sail ships to steam-powered industrial navies."
    },
    {
      "term": "Captive Market",
      "definition": "A colony forced by law or military threat to trade exclusively with its ruling country, preventing local industries from competing."
    }
  ],
  "narrative_blocks": [
    {
      "title": "The Corporate Conquest: Merchandising and Monopoly",
      "text": "The British Empire of the 19th century was the largest empire in human history, yet its grandest conquest did not begin with state military planning. Instead, it was executed by a private, profit-driven corporation: the East India Company (EIC). Founded in 1600 to control trade in precious spices, silks, indigo, and tea, the EIC transformed into an aggressive imperial powerhouse. To secure its commercial monopolies, the Company recruited its own private mercenary army, exploiting political divisions between local rulers. By systematically weaponizing its financial might, the EIC turned the Indian subcontinent into a captive market. This drove a ruthless economic cycle: India's rich fields produced raw cotton, which was shipped back to feed the brutal factories studied in Lesson 2. The finished textiles were then shipped back to Asia, flooding local markets and deliberately bankrupting India's domestic handloom weavers.",
      "level_4": "The British Empire was not started by the government, but by a private business called the East India Company. This company wanted to make huge profits from spices, tea, and cotton. They built a massive private army to control trade routes. India became a 'captive market'. This meant Britain took cheap raw cotton from India, spun it in the dark British factories we studied in Lesson 2, and forced India to buy the expensive cloth back, destroying local Indian businesses.",
      "tasks": [
        {
          "type": "categorisation",
          "qNum": 1,
          "question": "Categorise the drivers of the East India Company's expansion in India into Economic, Military, or Political factors using structured bullet points.",
          "model_answer": "* **Economic Factors:** The drive to secure complete monopolies over highly profitable commodities like tea, indigo, and spices; turning India into a captive market to feed British textile mills.\n* **Military Factors:** The recruitment of a massive private mercenary army consisting of European officers and local Sepoys to aggressively eliminate European rivals and enforce company rule.\n* **Political Factors:** Actively exploiting shifting rivalries between local rulers to destabilize regional power structures and install puppet rulers who answered to corporate directors."
        }
      ]
    },
    {
      "title": "The Great Rebellion of 1857",
      "text": "Corporate greed eventually triggered total collapse. The East India Company's rule was defined by aggressive economic extraction, cultural insensitivity, and racial discrimination. In May 1857, this systemic oppression triggered the Indian Rebellion (historically known as the Sepoy Mutiny). Indian soldiers within the Company's army turned on their British officers, sparking a bloody, year-long conflict across northern India. The British state intervened to brutally crush the uprising with horrific violence, but the catastrophe permanently shattered the EIC's credibility. Parliament realized that a private trading company could no longer be trusted to govern a subcontinent safely. In 1858, the Government of India Act formally abolished the East India Company and transferred total administrative control to the British Crown, establishing the British Raj.",
      "level_4": "The people of India hated being ruled by a greedy company. In 1857, Indian soldiers revolted in a violent rebellion. The British state sent troops to brutally crush the uprising. However, Parliament realized a private business could no longer safely rule millions of people. In 1858, the government shut down the Company and took direct control of India, starting a period known as the British Raj.",
      "source": {
        "type": "written",
        "title": "Source A: The Corporate Directive",
        "content": "\"We must remind our officers that the primary purpose of our presence in India is the secure maintenance of trade. Any action by our military commanders that causes unnecessary alarm or religious outrage among the native troops risks disrupting our merchant traffic and damaging the financial returns of our shareholders in London.\"\n— Directors of the East India Company, April 1857",
        "provenance_clue": "An official, confidential internal instruction sent from Company headquarters to military outposts right before the outbreak of the rebellion."
      },
      "tasks": [
        {
          "type": "provenance",
          "qNum": 2,
          "question": "Analyze the motive behind the EIC directive provided in the source. How does this corporate motive impact its usefulness for a historian investigating the causes of the 1857 Rebellion?",
          "model_answer": "The motive of the EIC directors was to protect their financial profits and prevent shareholders from losing money due to civil unrest. This corporate motive makes the source highly useful for a historian because it proves that even on the brink of war, the company viewed India strictly as a financial asset rather than a nation requiring stable governance. It reveals that corporate anxiety over profit margins directly influenced their military management, which contributed to the systemic mismanagement that caused the rebellion."
        }
      ]
    },
    {
      "title": "Sustaining Supremacy: The Portsmouth Industrial Complex",
      "text": "Direct rule over distant millions required absolute control of the world's shipping lanes, a strategy known as naval supremacy. Following the Napoleonic Wars, the Royal Navy enforced the strict 'Two-Power Standard' to protect merchant networks and project imperial power. This global supremacy was physically manufactured and sustained right here in Hampshire, at the Portsmouth Dockyard. Throughout the 19th century, Portsmouth was transformed into the largest steam-powered industrial complex on earth. It was here that Britain abandoned wooden sailing ships and turned to steam-driven 'Ironclads'. These floating fortresses required massive technological synthesis: they utilized the advanced metallurgy pioneered by Henry Cort at Funtley (Lesson 1) for their armor plating, and were built using the very 'Fareham Red' bricks studied in Lesson 3 for the expanding dockyard basins. Thousands of local Hampshire tradesmen—shipwrights, smiths, and boiler-makers—worked grueling shifts to build the fleets that patrolled the world.",
      "level_4": "To protect its global trade, Britain needed the largest navy in the world, a policy called naval supremacy. This global power was physically built and repaired at the Portsmouth Dockyard in Hampshire. Portsmouth became the largest factory complex on earth, moving away from wooden sailing ships to build massive, steam-powered 'Ironclads'. These modern ships used the tough iron developed by Henry Cort at Funtley and the strong Fareham bricks to expand the harbor basins.",
      "tasks": [
        {
          "type": "significance",
          "qNum": 3,
          "question": "Explain the significance of Portsmouth Dockyard in maintaining Britain's global imperial supremacy during the 19th century.",
          "model_answer": "Portsmouth Dockyard was of paramount significance because it functioned as the primary industrial engine for British naval power. Global empires cannot be sustained without a means to project force; Portsmouth provided the high-tech manufacturing capacity required to transition the navy into the industrial age. By producing cutting-edge ironclad warships, the dockyard physically enabled the enforcement of the Two-Power Standard, making Portsmouth the vital link between domestic industrialisation and global imperial domination."
        }
      ]
    },
    {
      "title": "Voices from the Imperial Core: The Dockyard Reality",
      "text": "While politicians in London championed the Navy as a glorious symbol of national pride, the reality for the industrial workforce in Hampshire was defined by exhausting toil and hazardous working conditions. The transition to iron-hulled engineering required a completely different class of hard manual labor, stripping away the traditional skills of wood craftsmen and replacing them with the raw, deafening power of the industrial forge. Historians must analyze working-class records to balance the grand strategic narratives of naval historians.",
      "level_4": "The politicians in London celebrated the navy as a glorious symbol of British pride. However, for the normal working-class men in Hampshire, building these ships was an incredibly dangerous and exhausting job. Workers had to adapt to working with heavy iron plates and hot rivets, enduring long hours and dangerous conditions in the dockyards to build the warships.",
      "source": {
        "type": "written",
        "title": "Source B: The Riveter's Letter",
        "content": "\"The noise inside these iron hulls is enough to break a man's spirit. We swing heavy sledgehammers for twelve hours straight in the blistering heat of the slips, breathing the black smoke of the forges. Our skin is scarred by flying scales of red-hot iron. The masters talk of the glory of the fleet, but we know every plate on this Ironclad is paid for with the sweat and broken health of Hampshire men.\"\n— Arthur Vance, Portsmouth Dockyard Riveter, November 1861",
        "provenance_clue": "A private letter written by a worker to his family, away from the watchful eyes of the dockyard overseers."
      },
      "tasks": [
        {
          "type": "provenance",
          "qNum": 4,
          "question": "Compare the perspective of the dockyard worker in the source with the official government policy of the 'Two-Power Standard'. How does the provenance of this letter affect its reliability for a historian studying the human cost of empire?",
          "model_answer": "The worker's letter offers a stark contrast to official policy; while the government viewed the navy as a grand strategic tool for global commerce, the worker experienced it as an engine of physical destruction and intense labor. The provenance of this letter makes it highly reliable for investigating the human cost because it is a private, uncensored letter to family. Unlike official dockyard logs, the author has no motive to hide the grueling hours, extreme heat, or long-term health risks, providing an authentic account of the working-class exploitation required to build the imperial navy."
        }
      ]
    },
    {
      "title": "The Decolonised Perspective: The Cost of Cotton",
      "text": "To truly evaluate how the empire was sustained, historians must look beyond the dockyards of Hampshire and examine the devastating economic impact on the colonized populations. The British industrial economy required a continuous supply of cheap raw materials and an uncompetitive market to buy its factory outputs. This system altered the traditional lifestyles of millions. In India, local artisans who had spent generations producing world-class hand-woven textiles found themselves completely crushed by the aggressive influx of cheap, machine-made cotton goods produced in the industrial mills of northern England.",
      "level_4": "To understand how the empire worked, we must look at the terrible impact it had on colonized people. British factories needed cheap materials and places to sell their goods. In India, local workers who made beautiful cloth by hand were completely ruined. British business laws flooded India with cheap machine-made clothes from England, making it impossible for local weavers to survive.",
      "source": {
        "type": "written",
        "title": "Source C: The Weavers' Petition",
        "content": "\"Our trade is entirely ruined. The cloth of England has flooded our markets, sold at a price we cannot compete with. For generations, our families have lived in comfort by our looms, but now our looms sit silent, and our children are reduced to starvation. We beg the government to place a duty on the clothing of England, or we shall perish utterly.\"\n— Weavers of the Dacca District, India, 1830",
        "provenance_clue": "A formal petition written by native Indian textile workers to the British colonial authorities in Bengal."
      },
      "tasks": [
        {
          "type": "extended_writing",
          "qNum": 5,
          "question": "Synthesis Assessment (8 Marks): 'The British Empire was built and sustained by technological progress rather than violence and exploitation.' To what extent do you agree with this interpretation? Use the IDEA framework and evidence from across the unit (including Henry Cort, factory work, and Portsmouth Dockyard) to support your argument.",
          "model_answer": "It can be argued to a limited extent that technological progress built and sustained the British Empire, but a comprehensive historical view reveals that this progress was fundamentally dependent on violence and economic exploitation. \n\nOptimist historians often focus on the exceptional engineering progress that characterized the era. For example, the metallurgy pioneered by Henry Cort at Funtley (Lesson 1) and the industrial production of steam-powered ironclads at Portsmouth Dockyard represent undeniable technological advancements. These innovations allowed the Royal Navy to enforce global trade routes and construct a massive, interconnected network of shipping lanes and infrastructure. \n\nHowever, this progress did not exist in a vacuum; it was explicitly weaponized to exploit colonized populations. As the Dacca weavers' petition of 1830 demonstrates, Britain utilized its industrial dominance to systematically dismantle local economies. India was transformed into a captive market, forced to provide raw materials for British factories and buy back manufactured goods, causing widespread poverty and destitution. Furthermore, when these economic pressures led to resistance—such as the massive 1857 Indian Rebellion—the British state abandoned all rhetoric of peaceful modernization and deployed extreme military violence to re-establish control. \n\nUltimately, technology was merely the tool; the empire was entirely sustained by an exploitative economic machine. The wealth showcased in grand monuments like the Royal Albert Hall was bought at the direct expense of working-class families enduring hazardous conditions in Hampshire dockyards and colonized peoples suffering starvation abroad."
        }
      ]
    }
  ],
  "sources": []
};

let dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// Find existing index or append
const existingIndex = data.lessons.findIndex(l => l.id === 'lesson_4');
if (existingIndex >= 0) {
  data.lessons[existingIndex] = lesson4Data;
} else {
  // It should be inserted after lesson 3
  const lesson3Index = data.lessons.findIndex(l => l.id === 'lesson_3');
  data.lessons.splice(lesson3Index + 1, 0, lesson4Data);
}

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected Lesson 4!');
