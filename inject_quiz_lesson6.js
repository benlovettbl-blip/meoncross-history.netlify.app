const fs = require('fs');

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

let lesson = data.lessons.find(l => l.id === 'lesson_6');

// Expand vocab
const additionalVocab = [
  {
    "term": "Great Reform Act 1832",
    "definition": "A landmark law that abolished 56 rotten boroughs and gave new industrial cities MPs, though it still excluded the working classes from voting."
  },
  {
    "term": "Hustings",
    "definition": "A public platform where candidates stood and where voters had to publicly shout out their vote before the Secret Ballot Act."
  },
  {
    "term": "Benjamin Disraeli",
    "definition": "The Conservative politician who strategically expanded the vote to working-class men in 1867, hoping they would gratefully vote for his party."
  }
];

lesson.vocab = [...(lesson.vocab || []), ...additionalVocab];

// Generate exactly 20 quiz questions based on Lesson 6 and its Do Nows
const quizQuestions = [
  // From Do Now (3) - Testing Lesson 5
  {
    "question": "What was the 1819 Peterloo Massacre?",
    "options": [
      "A peaceful protest where agricultural workers burned threshing machines.",
      "An event where armed cavalry charged into 60,000 peaceful protesters demanding reform, killing 18.",
      "A violent riot in London where Chartists attacked Parliament.",
      "A battle between the British and the French near Manchester."
    ],
    "answer": "An event where armed cavalry charged into 60,000 peaceful protesters demanding reform, killing 18."
  },
  {
    "question": "Which of the following was one of the core demands made by the Chartists in the 'People's Charter'?",
    "options": [
      "The right for women to vote.",
      "Universal male suffrage and secret ballots.",
      "The abolition of the monarchy.",
      "A guarantee of minimum wage for all factory workers."
    ],
    "answer": "Universal male suffrage and secret ballots."
  },
  {
    "question": "Why did agricultural laborers in Hampshire launch the violent 'Swing Riots' in 1830?",
    "options": [
      "They wanted the right to vote in the next election.",
      "They were facing starvation wages and winter unemployment caused by threshing machines.",
      "They were angry about the high cost of bread imported from France.",
      "They were protesting against the harsh conditions of the new workhouses."
    ],
    "answer": "They were facing starvation wages and winter unemployment caused by threshing machines."
  },
  
  // From Lesson 6 Content (17)
  {
    "question": "Before 1832, who was allowed to vote in British elections?",
    "options": [
      "All adult men.",
      "Both men and women over the age of 21.",
      "Only a tiny minority of wealthy male property owners.",
      "Anyone who could prove they could read and write."
    ],
    "answer": "Only a tiny minority of wealthy male property owners."
  },
  {
    "question": "What was a 'Rotten Borough' before 1832?",
    "options": [
      "A massive industrial city like Manchester with no MPs.",
      "An abandoned medieval village that had almost no people but still sent two MPs to Parliament.",
      "A district where all the voters were secretly corrupt and took bribes from the King.",
      "A poor slum area in a major city that was not allowed to vote."
    ],
    "answer": "An abandoned medieval village that had almost no people but still sent two MPs to Parliament."
  },
  {
    "question": "What was Newtown on the Isle of Wight a famous example of before 1832?",
    "options": [
      "A massive industrial city.",
      "A Rotten Borough with only 14 houses that still sent two MPs to London.",
      "The first town in Britain to give working-class men the vote.",
      "The site of a violent Chartist uprising."
    ],
    "answer": "A Rotten Borough with only 14 houses that still sent two MPs to London."
  },
  {
    "question": "What was a 'Pocket Borough'?",
    "options": [
      "A voting district where people could vote secretly in a small box or 'pocket'.",
      "A seat in Parliament completely controlled by a wealthy local landowner.",
      "A borough small enough to fit inside a single town hall.",
      "A constituency set up especially for poor working men."
    ],
    "answer": "A seat in Parliament completely controlled by a wealthy local landowner."
  },
  {
    "question": "Why did the government finally pass the Great Reform Act in 1832?",
    "options": [
      "Because they believed that democracy was the only fair system of government.",
      "Because they feared a violent revolution similar to the Swing Riots and the French Revolution.",
      "Because Queen Victoria ordered them to change the law.",
      "Because the working classes had peacefully asked for it in the People's Charter."
    ],
    "answer": "Because they feared a violent revolution similar to the Swing Riots and the French Revolution."
  },
  {
    "question": "Which of the following was a key change made by the 1832 Great Reform Act?",
    "options": [
      "It gave the vote to all working-class men.",
      "It introduced the secret ballot.",
      "It abolished 56 Rotten Boroughs and created new constituencies for industrial cities.",
      "It gave women the right to vote for the first time."
    ],
    "answer": "It abolished 56 Rotten Boroughs and created new constituencies for industrial cities."
  },
  {
    "question": "Who was granted the right to vote by the 1832 Great Reform Act?",
    "options": [
      "All men over the age of 21.",
      "Middle-class men who owned property worth £10 a year.",
      "Only the nobility and the wealthiest landowners.",
      "Everyone who worked in an industrial factory."
    ],
    "answer": "Middle-class men who owned property worth £10 a year."
  },
  {
    "question": "How did the working classes react to the 1832 Great Reform Act?",
    "options": [
      "They celebrated because they finally had a voice in Parliament.",
      "They ignored it because they did not care about politics.",
      "They felt bitterly betrayed because they were deliberately excluded from voting.",
      "They started a war with France to unite the country."
    ],
    "answer": "They felt bitterly betrayed because they were deliberately excluded from voting."
  },
  {
    "question": "Before 1872, how did a man cast his vote in an election?",
    "options": [
      "By placing a piece of paper in a locked ballot box.",
      "By sending a letter through the Royal Mail.",
      "By standing on a public platform (the 'hustings') and shouting out the name of the candidate.",
      "By raising his hand in a silent, private room."
    ],
    "answer": "By standing on a public platform (the 'hustings') and shouting out the name of the candidate."
  },
  {
    "question": "Why was the system of public voting before 1872 so unfair to working-class men?",
    "options": [
      "Because they were often too shy to speak in public.",
      "Because landlords and factory owners could intimidate them into voting a certain way under threat of being fired or evicted.",
      "Because they had to pay a large fee every time they shouted their vote.",
      "Because only the rich were allowed to stand on the 'hustings'."
    ],
    "answer": "Because landlords and factory owners could intimidate them into voting a certain way under threat of being fired or evicted."
  },
  {
    "question": "What did the 1872 Secret Ballot Act require voters to do?",
    "options": [
      "Swear a secret oath to the King before voting.",
      "Vote in a private wooden booth using a printed paper dropped into a locked box.",
      "Hide their faces with masks while standing on the public platform.",
      "Vote for only one candidate in complete silence."
    ],
    "answer": "Vote in a private wooden booth using a printed paper dropped into a locked box."
  },
  {
    "question": "What was the immediate consequence of the 1872 Secret Ballot Act?",
    "options": [
      "The power of elite bribery and intimidation collapsed almost overnight.",
      "Voter turnout dropped dramatically because people found the paper confusing.",
      "The working classes rioted because they wanted to vote in public.",
      "The King cancelled all future elections."
    ],
    "answer": "The power of elite bribery and intimidation collapsed almost overnight."
  },
  {
    "question": "Which group of people was given the vote by the 1867 Second Reform Act?",
    "options": [
      "All women over the age of 30.",
      "Agricultural laborers and miners in the countryside.",
      "Skilled working-class men in urban towns and cities.",
      "Only the wealthiest merchants in London."
    ],
    "answer": "Skilled working-class men in urban towns and cities."
  },
  {
    "question": "What did the 1884 Third Reform Act achieve?",
    "options": [
      "It gave the vote to women for the first time.",
      "It extended the vote to agricultural laborers and miners in the countryside.",
      "It took the vote away from the working classes.",
      "It introduced the secret ballot across the entire British Empire."
    ],
    "answer": "It extended the vote to agricultural laborers and miners in the countryside."
  },
  {
    "question": "Why did Conservative politicians like Benjamin Disraeli eventually expand the vote to the working classes in 1867?",
    "options": [
      "Because they genuinely believed every man deserved an equal voice.",
      "Because they were forced to by the French government.",
      "Because they hoped the newly enfranchised workers would be grateful and vote for the Conservative party.",
      "Because they had run out of wealthy landowners to vote for them."
    ],
    "answer": "Because they hoped the newly enfranchised workers would be grateful and vote for the Conservative party."
  },
  {
    "question": "Based on MP Robert Lowe's 1866 speech, what was the underlying fear that wealthy elites had about expanding democracy?",
    "options": [
      "They feared that elections would become too expensive to run.",
      "They feared the 'ignorant and violent' working classes would vote to tax the wealthy and destroy their privileged institutions.",
      "They feared that foreign spies would infiltrate the voting booths.",
      "They feared that giving men the vote would lead to women demanding the vote too."
    ],
    "answer": "They feared the 'ignorant and violent' working classes would vote to tax the wealthy and destroy their privileged institutions."
  },
  {
    "question": "By 1884, approximately what percentage of adult men in Britain had a secure, private vote?",
    "options": [
      "10%",
      "30%",
      "60%",
      "100%"
    ],
    "answer": "60%"
  }
];

lesson.quiz = quizQuestions;

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected Vocab and Quiz for Lesson 6!');
