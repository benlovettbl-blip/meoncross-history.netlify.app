const fs = require('fs');

const quizQuestions = [
  {
    "question": "In what year did the massive Indian Rebellion against the British Empire begin?",
    "options": ["1857", "1832", "1807", "1886"],
    "answer": "1857"
  },
  {
    "question": "What military innovation served as the immediate catalyst for the 1857 rebellion?",
    "options": ["The Enfield rifle", "The Maxim gun", "The Gatling gun", "The ironclad ship"],
    "answer": "The Enfield rifle"
  },
  {
    "question": "Why did the new Enfield rifle cartridges cause such outrage among the sepoys?",
    "options": ["They were rumored to be greased with beef and pork fat", "They were too heavy to carry", "They misfired frequently", "They were made in Britain instead of India"],
    "answer": "They were rumored to be greased with beef and pork fat"
  },
  {
    "question": "What percentage of the East India Company's military forces were native Indian soldiers (sepoys)?",
    "options": ["Over 80%", "Around 50%", "Less than 20%", "Almost 100%"],
    "answer": "Over 80%"
  },
  {
    "question": "What was the East India Company's 'Doctrine of Lapse'?",
    "options": ["A policy to annex independent Indian kingdoms if a ruler died without a direct male heir", "A law banning Indian textiles from being sold", "A rule forcing sepoys to serve overseas", "A trade agreement with the Mughal Emperor"],
    "answer": "A policy to annex independent Indian kingdoms if a ruler died without a direct male heir"
  },
  {
    "question": "Besides the cartridges, what deeper issues caused systemic resentment among the Indian population?",
    "options": ["Heavy taxation, land grabs, and destruction of the textile industry", "Lack of British funding for Indian schools", "The building of too many railways", "The British refusal to trade with India"],
    "answer": "Heavy taxation, land grabs, and destruction of the textile industry"
  },
  {
    "question": "Where did the outbreak of violence begin in earnest on May 10, 1857?",
    "options": ["Meerut", "Delhi", "Lucknow", "Calcutta"],
    "answer": "Meerut"
  },
  {
    "question": "Who did the mutinying sepoys declare as the true leader of India?",
    "options": ["The elderly Mughal Emperor, Bahadur Shah Zafar", "The Queen of Jhansi", "Queen Victoria", "The Governor-General of the EIC"],
    "answer": "The elderly Mughal Emperor, Bahadur Shah Zafar"
  },
  {
    "question": "Who was Rani Lakshmibai?",
    "options": ["The Queen of Jhansi who famously fought on horseback against the British", "The first Empress of India", "A leader of the East India Company", "A British missionary"],
    "answer": "The Queen of Jhansi who famously fought on horseback against the British"
  },
  {
    "question": "How did the British forces respond to the rebellion?",
    "options": ["With uncompromising, industrialized brutality and a campaign of mass terror", "With peaceful negotiations and political reform", "By immediately abandoning India", "By paying the sepoys higher wages"],
    "answer": "With uncompromising, industrialized brutality and a campaign of mass terror"
  },
  {
    "question": "What horrific method of execution did the British use as a form of psychological warfare against rebel leaders?",
    "options": ["Binding them to the mouths of cannons and blowing them apart", "Exiling them to Australia", "Public hanging in London", "Imprisonment in the Tower of London"],
    "answer": "Binding them to the mouths of cannons and blowing them apart"
  },
  {
    "question": "Why were rebels blown from cannons instead of hanged?",
    "options": ["To deliberately deny the victims traditional religious funerals", "Because the British ran out of rope", "To save time", "Because it was considered more humane"],
    "answer": "To deliberately deny the victims traditional religious funerals"
  },
  {
    "question": "What was the most significant political consequence of the 1857 Rebellion?",
    "options": ["The East India Company was abolished and the British Crown took direct control of India", "India was immediately granted full independence", "The EIC was given more power to rule India", "The British banned all Indian soldiers from serving in the military"],
    "answer": "The East India Company was abolished and the British Crown took direct control of India"
  },
  {
    "question": "Which 1858 law formalized the British government's direct rule over India?",
    "options": ["The Government of India Act", "The Great Reform Act", "The Secret Ballot Act", "The Doctrine of Lapse"],
    "answer": "The Government of India Act"
  },
  {
    "question": "The era of direct British Crown rule in India is known as what?",
    "options": ["The British Raj", "The EIC Era", "The Imperial Federation", "The Mughal Empire"],
    "answer": "The British Raj"
  },
  {
    "question": "Who was declared Empress of India after the rebellion was crushed?",
    "options": ["Queen Victoria", "Queen Elizabeth I", "Rani Lakshmibai", "Mary Queen of Scots"],
    "answer": "Queen Victoria"
  },
  {
    "question": "How did the 1857 Indian Rebellion contrast with domestic resistance like the Swing Riots?",
    "options": ["It was a full-scale war for liberation utilizing military training, rather than localized machine-breaking", "It was completely peaceful", "It was supported by the aristocratic elite", "It aimed to lower the price of bread"],
    "answer": "It was a full-scale war for liberation utilizing military training, rather than localized machine-breaking"
  },
  {
    "question": "Why did Christian missionary activity in India contribute to the rebellion?",
    "options": ["It convinced many Indians that the British were determined to systematically dismantle their ancient religions", "The missionaries were heavily armed", "The missionaries forced Indians to work in factories", "The missionaries stole all the agricultural land"],
    "answer": "It convinced many Indians that the British were determined to systematically dismantle their ancient religions"
  },
  {
    "question": "What did the rebellion shatter regarding the British public's view of their empire?",
    "options": ["The Victorian myth that the Empire was a 'civilizing' force welcomed by its subjects", "The belief that the Navy was invincible", "The idea that trade was profitable", "The concept of parliamentary democracy"],
    "answer": "The Victorian myth that the Empire was a 'civilizing' force welcomed by its subjects"
  },
  {
    "question": "Which animal's fat was forbidden to Muslim soldiers, making the rumor about the cartridges so explosive?",
    "options": ["Pig", "Cow", "Horse", "Sheep"],
    "answer": "Pig"
  }
];

const vocabItems = [
  {
    "term": "Sepoy",
    "definition": "A native Indian soldier serving in the army of the British East India Company."
  },
  {
    "term": "Doctrine of Lapse",
    "definition": "A highly controversial British policy to annex independent Indian kingdoms if a native ruler died without a direct male heir."
  },
  {
    "term": "British Raj",
    "definition": "The period of direct British Crown rule over the Indian subcontinent from 1858 to 1947."
  },
  {
    "term": "Mutiny",
    "definition": "An open rebellion against the proper authorities, especially by soldiers or sailors against their officers."
  },
  {
    "term": "East India Company (EIC)",
    "definition": "A massive, powerful British trading corporation that effectively ruled large parts of India until it was abolished in 1858."
  },
  {
    "term": "Rani Lakshmibai",
    "definition": "The Queen of Jhansi and a leading iconic figure of the 1857 Indian Rebellion who fought against British corporate annexation."
  }
];

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

const lesson5 = data.lessons.find(l => l.id === 'lesson_5');
if (lesson5) {
  // Deduplicate and merge do_now recall questions
  const existingDoNow = lesson5.do_now?.items || [];
  const mergedQuiz = [...quizQuestions];
  
  existingDoNow.forEach(dn => {
    if (!mergedQuiz.find(q => q.question === dn.question)) {
      mergedQuiz.push({
        question: dn.question,
        options: [dn.answer, "Incorrect Option A", "Incorrect Option B", "Incorrect Option C"],
        answer: dn.answer
      });
    }
  });

  lesson5.quiz = mergedQuiz;
  lesson5.vocab = vocabItems;
}

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected Lesson 5 quiz and vocab!');
