const fs = require('fs');

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

let lesson = data.lessons.find(l => l.id === 'lesson_4');

// Expand vocab from 5 to 8
const additionalVocab = [
  {
    "term": "East India Company (EIC)",
    "definition": "A private, profit-driven British corporation founded in 1600 that originally traded in spices and tea, eventually building a massive private army to control the Indian subcontinent."
  },
  {
    "term": "Sepoy Mutiny",
    "definition": "The historical name given by the British to the widespread 1857 Indian Rebellion, when Indian soldiers in the Company's army revolted against their British officers."
  },
  {
    "term": "Naval Supremacy",
    "definition": "The strategic military doctrine of maintaining the absolute strongest navy in the world to protect global trade routes and project imperial power."
  }
];

lesson.vocab = [...(lesson.vocab || []), ...additionalVocab];

// Generate exactly 20 quiz questions based on Lesson 4 and its Do Nows
const quizQuestions = [
  // From Do Now (3)
  {
    "question": "Why did Victorian builders heavily rely on 'Fareham Red' bricks during 19th-century urbanisation?",
    "options": [
      "They were the cheapest bricks available in northern England.",
      "They were highly durable under intense structural pressure for massive infrastructure.",
      "They were the only bricks the government legally allowed to be used in London.",
      "They were primarily used for decorative facades rather than structural strength."
    ],
    "answer": "They were highly durable under intense structural pressure for massive infrastructure."
  },
  {
    "question": "How did the 1842 Chadwick Report challenge the traditional government policy of 'laissez-faire'?",
    "options": [
      "It proved that building more back-to-back housing would increase profits.",
      "It argued that poor people should be responsible for their own healthcare.",
      "It showed deaths from filth and overcrowding were higher than modern war casualties.",
      "It recommended that the government stop funding public hospitals."
    ],
    "answer": "It showed deaths from filth and overcrowding were higher than modern war casualties."
  },
  {
    "question": "What scientific breakthrough did Dr. John Snow achieve during the 1854 cholera outbreak?",
    "options": [
      "He invented the first vaccine for cholera.",
      "He proved the Miasma Theory by measuring bad smells in Soho.",
      "He built the first underground sewer system in London.",
      "He proved cholera was a waterborne disease by mapping local fatalities."
    ],
    "answer": "He proved cholera was a waterborne disease by mapping local fatalities."
  },
  
  // From Lesson 4 Content (17)
  {
    "question": "What was the original purpose of the East India Company when it was founded in 1600?",
    "options": [
      "To establish direct British government rule in India.",
      "To control trade in precious spices, silks, indigo, and tea.",
      "To build ironclad warships for the Royal Navy.",
      "To fight the French army in North America."
    ],
    "answer": "To control trade in precious spices, silks, indigo, and tea."
  },
  {
    "question": "How did the East India Company secure its commercial monopolies in India?",
    "options": [
      "By signing peaceful trade agreements with all local merchants.",
      "By relying solely on the Royal Navy for protection.",
      "By recruiting its own private mercenary army and exploiting local political divisions.",
      "By paying higher taxes to the local Indian rulers."
    ],
    "answer": "By recruiting its own private mercenary army and exploiting local political divisions."
  },
  {
    "question": "What does it mean that the East India Company turned India into a 'captive market'?",
    "options": [
      "India was forced to trade exclusively with Britain, preventing local industries from competing.",
      "The EIC built large prisons in India to hold their commercial rivals.",
      "Indian merchants were given exclusive rights to sell their goods in London.",
      "Britain sent captive prisoners from London to work in Indian factories."
    ],
    "answer": "India was forced to trade exclusively with Britain, preventing local industries from competing."
  },
  {
    "question": "How did British textile mills affect India's domestic handloom weavers?",
    "options": [
      "They provided Indian weavers with better, cheaper yarn to make cloth.",
      "They bought all of the Indian weavers' cloth, making them wealthy.",
      "They taught Indian weavers how to build their own steam-powered factories.",
      "They flooded Indian markets with cheap, machine-made cloth, deliberately bankrupting local weavers."
    ],
    "answer": "They flooded Indian markets with cheap, machine-made cloth, deliberately bankrupting local weavers."
  },
  {
    "question": "What event was triggered in May 1857 by the East India Company's systemic oppression?",
    "options": [
      "The Great Stink",
      "The Indian Rebellion (Sepoy Mutiny)",
      "The Battle of Trafalgar",
      "The signing of the Government of India Act"
    ],
    "answer": "The Indian Rebellion (Sepoy Mutiny)"
  },
  {
    "question": "According to the April 1857 EIC corporate directive, what was the primary purpose of the British presence in India?",
    "options": [
      "To bring modern technology and railways to the Indian people.",
      "To secure the maintenance of trade and protect shareholder profits.",
      "To spread British culture and religion.",
      "To establish a democratic government in Asia."
    ],
    "answer": "To secure the maintenance of trade and protect shareholder profits."
  },
  {
    "question": "What was the consequence of the 1857 Rebellion for the East India Company?",
    "options": [
      "It was given even more power by the British Parliament.",
      "It was formally abolished, and control transferred directly to the British Crown.",
      "It agreed to share power with the local Indian rulers.",
      "It moved all of its operations to China."
    ],
    "answer": "It was formally abolished, and control transferred directly to the British Crown."
  },
  {
    "question": "What was the 'Two-Power Standard'?",
    "options": [
      "A rule that the Royal Navy must be stronger than the next two most powerful navies combined.",
      "A trade agreement between Britain and two other European nations.",
      "A law requiring two steam engines on every British warship.",
      "A policy ensuring India was ruled by both a British Governor and an Indian Prince."
    ],
    "answer": "A rule that the Royal Navy must be stronger than the next two most powerful navies combined."
  },
  {
    "question": "Which Hampshire town became the largest steam-powered industrial complex on earth to support the navy?",
    "options": [
      "Southampton",
      "Fareham",
      "Portsmouth",
      "Winchester"
    ],
    "answer": "Portsmouth"
  },
  {
    "question": "What major technological transition did the Royal Navy undergo at Portsmouth Dockyard during the 19th century?",
    "options": [
      "Moving from coal-powered ships to oil-powered ships.",
      "Moving from wooden sailing ships to steam-driven 'Ironclads'.",
      "Moving from iron hulls back to lighter, faster wooden ships.",
      "Moving from merchant vessels to passenger liners."
    ],
    "answer": "Moving from wooden sailing ships to steam-driven 'Ironclads'."
  },
  {
    "question": "Launched in 1860, which ship was the world's first iron-hulled, steam-powered ironclad warship?",
    "options": [
      "HMS Victory",
      "HMS Dreadnought",
      "HMS Warrior",
      "HMS Beagle"
    ],
    "answer": "HMS Warrior"
  },
  {
    "question": "Whose advanced metallurgy pioneered at Funtley (from Lesson 1) was vital for creating the armor plating of the Ironclads?",
    "options": [
      "Edwin Chadwick",
      "Henry Cort",
      "Joseph Bazalgette",
      "John Snow"
    ],
    "answer": "Henry Cort"
  },
  {
    "question": "According to the letter from Arthur Vance (November 1861), what was the reality for the dockyard riveters?",
    "options": [
      "They worked comfortable shifts and were proud of the glory they brought the fleet.",
      "They were replaced by machines and struggled to find work in Hampshire.",
      "They endured exhausting 12-hour shifts in blistering heat, breathing black smoke.",
      "They mainly did highly skilled wood-carving for the officers' cabins."
    ],
    "answer": "They endured exhausting 12-hour shifts in blistering heat, breathing black smoke."
  },
  {
    "question": "Why is Arthur Vance's private letter considered highly reliable by historians studying the human cost of empire?",
    "options": [
      "Because it was published in The Times newspaper.",
      "Because it was an official dockyard log checked by the government.",
      "Because it was written for a political campaign to improve wages.",
      "Because it was a private letter to family with no motive to hide the grueling reality."
    ],
    "answer": "Because it was a private letter to family with no motive to hide the grueling reality."
  },
  {
    "question": "What does 'Mercantilism' mean in the context of the British Empire?",
    "options": [
      "A system maximizing national wealth through strictly controlled colonial trade and monopolies.",
      "A policy of free trade where all nations compete equally without tariffs.",
      "The belief that all men should have the right to vote regardless of wealth.",
      "The transition from rural farming communities to large industrial cities."
    ],
    "answer": "A system maximizing national wealth through strictly controlled colonial trade and monopolies."
  },
  {
    "question": "What did the Dacca weavers' petition in 1830 beg the British government to do?",
    "options": [
      "To send them modern British steam engines for their looms.",
      "To place a duty (tax) on the cheap clothing coming from England to save their trade.",
      "To allow them to move to London to work in the factories.",
      "To force the East India Company to buy their hand-woven cloth at a higher price."
    ],
    "answer": "To place a duty (tax) on the cheap clothing coming from England to save their trade."
  },
  {
    "question": "What do 'Optimist' historians typically argue about the British Empire's use of technology?",
    "options": [
      "That technology was only used to hurt people and had no positive benefits.",
      "That innovations like ironclads and railways created a massive, interconnected network of global trade and progress.",
      "That the British completely failed to modernize and relied too much on old wooden ships.",
      "That technological progress was less important than the skill of the handloom weavers."
    ],
    "answer": "That innovations like ironclads and railways created a massive, interconnected network of global trade and progress."
  }
];

// Combine existing quiz questions if any with the new ones
lesson.quiz = quizQuestions;

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected Vocab and Quiz for Lesson 4!');
