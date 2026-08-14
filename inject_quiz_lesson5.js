const fs = require('fs');

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

let lesson = data.lessons.find(l => l.id === 'lesson_5');

// Expand vocab from 5 to 8
const additionalVocab = [
  {
    "term": "Peterloo Massacre",
    "definition": "The violent suppression of a peaceful pro-democracy rally in Manchester in 1819, where cavalry charged into the crowd, killing 18 working-class protestors."
  },
  {
    "term": "Tolpuddle Martyrs",
    "definition": "Six agricultural laborers from Dorset who were cruelly sentenced to transportation to Australia in 1834 for forming an early Trade Union."
  },
  {
    "term": "People's Charter",
    "definition": "A political manifesto published in 1838 that demanded six democratic reforms, including universal male suffrage and the secret ballot."
  }
];

lesson.vocab = [...(lesson.vocab || []), ...additionalVocab];

// Generate exactly 20 quiz questions based on Lesson 5 and its Do Nows
const quizQuestions = [
  // From Do Now (3) - Testing Lesson 4
  {
    "question": "What private corporate entity controlled British commercial and military interests in India until 1858?",
    "options": [
      "The Royal Navy",
      "The Bank of England",
      "The East India Company (EIC)",
      "The British Parliament"
    ],
    "answer": "The East India Company (EIC)"
  },
  {
    "question": "What was the 'Two-Power Standard' followed by the British government in the 19th century?",
    "options": [
      "A rule that Britain must always have exactly two allies in Europe.",
      "A naval policy declaring the Royal Navy must be stronger than the next two largest fleets combined.",
      "A law stating that Parliament must have two equal political parties.",
      "An economic rule that Britain must export twice as much as it imports."
    ],
    "answer": "A naval policy declaring the Royal Navy must be stronger than the next two largest fleets combined."
  },
  {
    "question": "How did the industrial workforce at Portsmouth Dockyard directly support British naval supremacy?",
    "options": [
      "By protesting against the harsh factory conditions.",
      "By manufacturing advanced, iron-hulled 'Ironclad' warships.",
      "By recruiting sailors from the local agricultural farms.",
      "By building wooden sailing ships exclusively for merchants."
    ],
    "answer": "By manufacturing advanced, iron-hulled 'Ironclad' warships."
  },
  
  // From Lesson 5 Content (17)
  {
    "question": "In the early 19th century, who completely controlled the British Parliament?",
    "options": [
      "The working class",
      "Wealthy landowners",
      "Trade Union leaders",
      "The middle-class factory workers"
    ],
    "answer": "Wealthy landowners"
  },
  {
    "question": "What did the 60,000 peaceful protestors at St Peter's Field in Manchester demand in August 1819?",
    "options": [
      "Higher wages and shorter working hours.",
      "Parliamentary reform and affordable food.",
      "The destruction of all mechanical threshing machines.",
      "The abolition of the East India Company."
    ],
    "answer": "Parliamentary reform and affordable food."
  },
  {
    "question": "How did the state respond to the peaceful gathering at St Peter's Field in 1819?",
    "options": [
      "They agreed to pass a new Reform Act immediately.",
      "They ignored the protestors until they went home.",
      "Local magistrates panicked and ordered cavalry to charge into the crowd with sabers.",
      "They arrested the leaders but allowed the crowd to continue protesting."
    ],
    "answer": "Local magistrates panicked and ordered cavalry to charge into the crowd with sabers."
  },
  {
    "question": "Why did radicals ironically name the tragic 1819 event the 'Peterloo Massacre'?",
    "options": [
      "Because it took place near a famous waterloo station in Manchester.",
      "To compare the violent slaughter of citizens to the famous military victory at Waterloo.",
      "Because the leader of the protest was named Peter.",
      "Because it occurred on St Peter's Day during a heavy rainstorm."
    ],
    "answer": "To compare the violent slaughter of citizens to the famous military victory at Waterloo."
  },
  {
    "question": "What technological change caused winter unemployment and starvation for agricultural laborers in 1830?",
    "options": [
      "The invention of the steam train.",
      "The introduction of mechanical threshing machines.",
      "The widespread use of chemical fertilizers.",
      "The shift from farming to factory work in the cities."
    ],
    "answer": "The introduction of mechanical threshing machines."
  },
  {
    "question": "What was the name of the violent agrarian uprising in southern England in 1830?",
    "options": [
      "The Luddite Rebellion",
      "The Peterloo Riots",
      "The Swing Riots",
      "The Tolpuddle Uprising"
    ],
    "answer": "The Swing Riots"
  },
  {
    "question": "Who was 'Captain Swing'?",
    "options": [
      "A real military officer who led the agricultural rebellion.",
      "A mythical, pseudonymous leader used by rioters to send anonymous threats.",
      "The wealthy landowner who invented the threshing machine.",
      "The judge who sentenced the rioters at Winchester Castle."
    ],
    "answer": "A mythical, pseudonymous leader used by rioters to send anonymous threats."
  },
  {
    "question": "How did the government punish the Hampshire workers involved in the 1830 riots?",
    "options": [
      "They were all given a small fine and warned not to do it again.",
      "They were forced to rebuild the threshing machines.",
      "Over 100 were tried at Winchester, 6 were executed, and hundreds were transported to Australia.",
      "They were sent to work in the factories of northern England."
    ],
    "answer": "Over 100 were tried at Winchester, 6 were executed, and hundreds were transported to Australia."
  },
  {
    "question": "What strategy did working-class men explore after realizing violent property destruction resulted in execution or exile?",
    "options": [
      "They decided to stop protesting entirely and accept low wages.",
      "They began exploring collective bargaining through Trade Unions.",
      "They started breaking machines exclusively during the daytime.",
      "They all moved to America to find better farming jobs."
    ],
    "answer": "They began exploring collective bargaining through Trade Unions."
  },
  {
    "question": "Why did the six agricultural laborers in Tolpuddle form a friendly society in 1834?",
    "options": [
      "To overthrow the King.",
      "To protest a wage cut and force employers to pay fair wages.",
      "To build their own threshing machines.",
      "To raise money to travel to London."
    ],
    "answer": "To protest a wage cut and force employers to pay fair wages."
  },
  {
    "question": "What obscure 1797 law did the government use to arrest the Tolpuddle Martyrs?",
    "options": [
      "A law banning the destruction of farm equipment.",
      "A law banning all forms of public gatherings.",
      "A law banning unlawful secret oaths.",
      "A law banning workers from leaving their village without permission."
    ],
    "answer": "A law banning unlawful secret oaths."
  },
  {
    "question": "What was the initial sentence given to the Tolpuddle Martyrs?",
    "options": [
      "Execution by hanging.",
      "Life in a British prison.",
      "Seven years' transportation to Australia.",
      "A large financial fine."
    ],
    "answer": "Seven years' transportation to Australia."
  },
  {
    "question": "By 1838, what did working-class leaders realize was the only way to permanently change factory conditions and low wages?",
    "options": [
      "Continuing to burn down hayricks and break machines.",
      "Achieving structural constitutional reform so working-class men could sit in Parliament.",
      "Asking the King to personally intervene on their behalf.",
      "Moving out of the cities and back to the countryside."
    ],
    "answer": "Achieving structural constitutional reform so working-class men could sit in Parliament."
  },
  {
    "question": "What was the name of the first mass working-class democratic movement in British history launched in 1838?",
    "options": [
      "The Suffragettes",
      "The Luddites",
      "Chartism",
      "The Trade Union Congress"
    ],
    "answer": "Chartism"
  },
  {
    "question": "Which of the following was NOT one of the six core demands of the People's Charter?",
    "options": [
      "Universal male suffrage (the right to vote).",
      "Secret ballots to stop voter intimidation.",
      "Equal pay for men and women.",
      "Salaries for MPs so poor men could run for office."
    ],
    "answer": "Equal pay for men and women."
  },
  {
    "question": "What action did the Chartists take to pressure Parliament into accepting their demands?",
    "options": [
      "They gathered millions of signatures on three mammoth petitions in 1839, 1842, and 1848.",
      "They kidnapped several wealthy Members of Parliament.",
      "They set fire to the Houses of Parliament.",
      "They bought all the threshing machines in England and destroyed them."
    ],
    "answer": "They gathered millions of signatures on three mammoth petitions in 1839, 1842, and 1848."
  },
  {
    "question": "Although Parliament rejected all the Chartist petitions at the time, what was the movement's long-term legacy?",
    "options": [
      "It proved that working-class people could never organize effectively.",
      "It caused the government to ban all political parties permanently.",
      "By 1928, five of its six democratic demands had slowly become the law of the land.",
      "It forced the British establishment to immediately hand over power in 1848."
    ],
    "answer": "By 1928, five of its six democratic demands had slowly become the law of the land."
  }
];

// Combine existing quiz questions if any with the new ones
lesson.quiz = quizQuestions;

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected Vocab and Quiz for Lesson 5!');
