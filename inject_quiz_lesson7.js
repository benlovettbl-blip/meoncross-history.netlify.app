const fs = require('fs');

const quizQuestions = [
  {
    "question": "Which historical perspective argues that 19th-century Britain experienced unmatched national progress?",
    "options": ["The Optimist View", "The Pessimist View", "The Marxist View", "The Traditional View"],
    "answer": "The Optimist View"
  },
  {
    "question": "What local Hampshire industrialist revolutionized iron production with the puddling process?",
    "options": ["Henry Cort", "Isambard Kingdom Brunel", "George Stephenson", "Edwin Chadwick"],
    "answer": "Henry Cort"
  },
  {
    "question": "How much did Henry Cort's puddling process increase iron production?",
    "options": ["400%", "100%", "50%", "1000%"],
    "answer": "400%"
  },
  {
    "question": "What famous London monument was built using 'Fareham Red' bricks?",
    "options": ["The Royal Albert Hall", "The Tower of London", "Buckingham Palace", "St. Paul's Cathedral"],
    "answer": "The Royal Albert Hall"
  },
  {
    "question": "What ship, built with advanced iron processes, helped enforce the global 'Two-Power Standard'?",
    "options": ["HMS Warrior", "HMS Victory", "HMS Dreadnought", "HMS Beagle"],
    "answer": "HMS Warrior"
  },
  {
    "question": "Which historical perspective argues that Britain's wealth masked horrific human misery and exploitation?",
    "options": ["The Pessimist View", "The Optimist View", "The Capitalist View", "The Whig View"],
    "answer": "The Pessimist View"
  },
  {
    "question": "According to the 1881 Census, what job did 10-year-old boys perform barefoot in the Funtley clay pits?",
    "options": ["Pug boys", "Chimney sweeps", "Piecers", "Trappers"],
    "answer": "Pug boys"
  },
  {
    "question": "How long were the typical working shifts for child laborers in the Funtley brickfields?",
    "options": ["14 hours", "8 hours", "10 hours", "18 hours"],
    "answer": "14 hours"
  },
  {
    "question": "What deadly waterborne disease repeatedly broke out in unventilated 'back-to-back' slums?",
    "options": ["Cholera", "Smallpox", "Tuberculosis", "Typhoid"],
    "answer": "Cholera"
  },
  {
    "question": "Who published an 1842 report proving that slums were deadlier than modern wars?",
    "options": ["Edwin Chadwick", "Lord Shaftesbury", "Charles Dickens", "Henry Cort"],
    "answer": "Edwin Chadwick"
  },
  {
    "question": "How did the East India Company violently destroy the local Indian textile economy?",
    "options": ["By establishing a 'captive market' that flooded India with cheap British goods", "By burning down all Indian textile mills", "By blocking all global trade routes to India", "By paying Indian weavers double their standard wages"],
    "answer": "By establishing a 'captive market' that flooded India with cheap British goods"
  },
  {
    "question": "What Hampshire-based event in 1830 saw agricultural workers violently break threshing machines?",
    "options": ["The Swing Riots", "The Luddite Rebellions", "The Chartism Rallies", "The Funtley Strike"],
    "answer": "The Swing Riots"
  },
  {
    "question": "Why do critical historians argue the 1832 Great Reform Act was passed?",
    "options": ["Out of elite fear of violent revolution", "Because the elite believed in equality", "To give the working class political power", "To abolish the monarchy"],
    "answer": "Out of elite fear of violent revolution"
  },
  {
    "question": "Who was deliberately excluded from voting by the £10 property qualification in the 1832 Great Reform Act?",
    "options": ["The working class", "The middle class", "The aristocracy", "Industrial factory owners"],
    "answer": "The working class"
  },
  {
    "question": "What was the name of the first mass working-class political movement that rose in response to the 1832 betrayal?",
    "options": ["Chartism", "Suffragettes", "Trade Unionism", "The Swing Rioters"],
    "answer": "Chartism"
  },
  {
    "question": "Which 1872 Act collapsed the elite's mechanism of landlord bribery and voter intimidation?",
    "options": ["The Secret Ballot Act", "The Great Reform Act", "The Factory Act", "The Representation of the People Act"],
    "answer": "The Secret Ballot Act"
  },
  {
    "question": "In historical writing, what does 'synthesis' mean?",
    "options": ["Combining different data points and interpretations into a balanced argument", "Listing historical facts in chronological order", "Writing from a purely biased perspective", "Ignoring evidence that contradicts your main point"],
    "answer": "Combining different data points and interpretations into a balanced argument"
  },
  {
    "question": "What was a 'Rotten Borough' in the pre-reform British electoral system?",
    "options": ["A voting district with virtually no population that still sent two MPs to Parliament", "A corrupt town council that stole tax money", "An industrial city with massive populations but zero MPs", "A district that only allowed the working class to vote"],
    "answer": "A voting district with virtually no population that still sent two MPs to Parliament"
  },
  {
    "question": "Which local Hampshire town is a famous example of a 'Rotten Borough' with only 14 houses?",
    "options": ["Newtown on the Isle of Wight", "Fareham", "Portsmouth", "Winchester"],
    "answer": "Newtown on the Isle of Wight"
  },
  {
    "question": "What best summarizes the overarching conclusion of the 'Industrialisation and Empire' unit?",
    "options": ["19th-century progress was built almost entirely on the physical exploitation and political exclusion of the working class and colonized subjects", "19th-century progress benefited every social class equally and peacefully", "19th-century wealth was generated entirely without the use of child labor or colonialism", "19th-century political reform was a gift willingly handed down by a progressive aristocracy"],
    "answer": "19th-century progress was built almost entirely on the physical exploitation and political exclusion of the working class and colonized subjects"
  }
];

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

const existingIndex = data.lessons.findIndex(l => l.id === 'lesson_7');
if (existingIndex >= 0) {
  // Deduplicate and merge do_now recall questions
  const existingDoNow = data.lessons[existingIndex].do_now?.items || [];
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

  data.lessons[existingIndex].quiz = mergedQuiz;
}

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected Lesson 7 quiz!');
