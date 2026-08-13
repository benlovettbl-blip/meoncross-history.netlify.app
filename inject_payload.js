const fs = require('fs');

const payload = {
  "id": "lesson_3",
  "title": "Did industrialisation make British towns unlivable?",
  "teacher_notes": {
    "primer": "This lesson explores the public health crisis triggered by rapid urbanisation. It challenges high-ability pupils by juxtaposing the grand architecture of the British Empire (built with local Fareham bricks) against the squalid reality of the slums. It introduces complex source evaluation using three contrasting, authentic written sources, and frames the topic within the 'Optimist vs. Pessimist' historiographical debate.",
    "objectives": [
      {
        "objective": "Analyse the contrast between imperial wealth and working-class squalor.",
        "primer": "Use Source A (the corporate perspective of Fareham brick builders) to show students how the same local industry that built grand monuments also fueled rapid, unregulated slum expansion.",
        "question": "Did the economic boom of the brickfields benefit everyone in society equally?"
      },
      {
        "objective": "Evaluate the usefulness of contrasting primary sources.",
        "primer": "Guide students to evaluate Source B (top-down, official/statistical) against Source C (bottom-up, personal/emotional) to understand why historians need a variety of evidence to uncover the truth.",
        "question": "Why might a government report use different language to a letter written by a slum resident?"
      },
      {
        "objective": "Understand the catalysts for public health reform.",
        "primer": "Ensure students grasp how 'Miasma Theory' delayed progress, and how the physical reality of the 'Great Stink' finally forced the government to abandon 'laissez-faire' policies.",
        "question": "Was it scientific discovery or political discomfort that finally triggered the building of London's sewers?"
      }
    ]
  },
  "do_now": {
    "title": "Do Now: Recall",
    "type": "questions",
    "items": [
      {
        "question": "What are 'Fareham Reds'?",
        "answer": "Famous, high-quality red bricks manufactured from clay in Fareham, Hampshire, highly sought after by Victorian architects."
      },
      {
        "question": "Name one highly dangerous or physically demanding job a child might perform in a 19th-century textile mill or brickfield.",
        "answer": "Scavenging for loose cotton under moving machinery, sitting in the dark as a 'trapper' in a mine, or acting as a 'pug boy' or brick turner in the freezing mud of a brickyard."
      },
      {
        "question": "Why did factory owners actively prefer to hire children rather than adults?",
        "answer": "Children could be paid a fraction of an adult's wage, were easier to discipline, and their small size allowed them to fit under machines or into narrow mine shafts."
      },
      {
        "question": "Explain how Henry Cort's inventions at the Funtley Ironworks helped power the Industrial Revolution globally.",
        "answer": "Cort's 'puddling' and 'rolling' processes allowed Britain to mass-produce cheap, high-quality wrought iron. This iron built the steam engines, railways, and naval ships that powered Britain's global dominance."
      },
      {
        "question": "Why do 'Optimist' and 'Pessimist' historians disagree about the impact of the Industrial Revolution on working-class families?",
        "answer": "Pessimists focus on the catastrophic initial cost, arguing the working class was punished with unlivable slums and horrific child exploitation. Optimists argue that despite initial hardships, the wealth and technology generated eventually led to massive progress, higher wages, and improved life expectancy."
      }
    ]
  },
  "vocab": [
    {
      "term": "Urbanisation",
      "definition": "The massive movement of people from the countryside into towns and cities, causing them to expand rapidly."
    },
    {
      "term": "Laissez-faire",
      "definition": "A government policy of 'leaving things alone' and not interfering in people's lives or business affairs."
    },
    {
      "term": "Miasma Theory",
      "definition": "The incorrect Victorian medical belief that diseases were caused and spread by breathing in bad, foul-smelling air."
    },
    {
      "term": "Provenance",
      "definition": "The origin of a historical source (who wrote it, when, why, and what type of source it is), used to judge its usefulness."
    },
    {
      "term": "Public Health",
      "definition": "The health of the population as a whole, managed by the government through regulations on sanitation, clean water, and disease prevention."
    }
  ],
  "narrative_blocks": [
    {
      "title": "The Façade of Empire (Source A)",
      "text": "During the 19th century, Britain's population boomed and millions flooded into cities. Construction exploded. To understand the scale of this, historians look at sources like Source A, adapted from an industrial directory for Victorian contractors (like Joseph Bull & Sons): 'The demand for the Fareham bricks remains unprecedentedly high... Contracts have been secured for the expanding dockyards at Portsmouth, and prestigious public buildings. To keep pace... cottages for the labourers must be raised instantly adjacent to the works to secure the utmost efficiency of labour.' This shows the 'façade' of the Empire: wealthy exteriors built by local Hampshire mud. But behind these glorious public buildings lay a very different reality for the working classes.",
      "level_4": "In the 1800s, millions of people moved to cities. Construction companies used millions of 'Fareham Red' bricks to build amazing places like the Royal Albert Hall. Source A is a record from one of these companies. It says: 'Demand for Fareham bricks is high... to keep up, cottages for workers must be built instantly to secure efficiency.' This made Britain look rich and powerful, but the poor workers who made the bricks were forced to live in terrible, crowded slums.",
      "tasks": [
        {
          "type": "text",
          "qNum": 1,
          "question": "Conceptual Analysis: Based on Source A, what was the primary concern of the Victorian contractors when building 'cottages' for their workers?",
          "model_answer": "Source A reveals that the contractors' primary concern was 'efficiency of labour'. They built cottages 'instantly adjacent' to the worksites not for the comfort of the workers, but to ensure they could extract the maximum amount of work from them to keep pace with the massive demand for Fareham bricks."
        }
      ]
    },
    {
      "title": "The Official Investigation (Source B)",
      "text": "To house the exploding population, landlords packed workers into tiny 'back-to-back' houses sharing three walls, offering zero ventilation. Entire families lived in a single room with no plumbing, sharing a single outdoor toilet over a deep cesspit. We know about this squalor from Source B, an 1842 government report by reformer Edwin Chadwick: 'The crowded back-to-back dwellings are built with no ventilation, and the refuse of the houses is thrown into open streets. The annual loss of life from filth and bad ventilation is greater than the loss from death or wounds in any wars in which the country has been engaged in modern times.'",
      "level_4": "Landlords built 'back-to-back' houses. These houses shared three walls, so there was no fresh air. Whole families squeezed into one room sharing an outdoor toilet. Human waste often leaked into the drinking water. We know this from Source B, an 1842 government report by Edwin Chadwick. He wrote: 'The loss of life from filth and bad ventilation is greater than the loss from death or wounds in any wars.'",
      "tasks": [
        {
          "type": "text",
          "qNum": 2,
          "question": "Language Analysis: Look at Source B. Why do you think Edwin Chadwick chose to compare the deaths in the slums to the deaths in a 'modern war'?",
          "model_answer": "Chadwick used the comparison to war to shock a 'laissez-faire' government into action. By comparing the deaths from 'filth and bad ventilation' to military casualties, he translated a public health issue into a national security crisis, using formal, striking language to prove that doing nothing was killing more British citizens than foreign enemies."
        }
      ]
    },
    {
      "title": "The Raw Human Perspective (Source C)",
      "text": "While Chadwick's report provided official statistics, historians also need the raw, human perspective. Source C is an authentic letter sent to The Times newspaper in 1849 by 54 desperate residents of a London slum during a disease outbreak. They wrote: 'We live in muck and filth. We aint got no privies, no dust bins, no drains, no water-splies, and no sewers in the whole place... We are living like pigs, and it aint fair. We hope you will print this to let the great people know how we are left to die of the cholera.'",
      "level_4": "Historians also need to hear from the poor people themselves. Source C is a letter sent to a newspaper in 1849 by 54 poor slum workers. They wrote: 'We live in muck and filth. We aint got no privies, no drains, no water... We are living like pigs, and it aint fair. We hope you will print this to let the great people know how we are left to die of the cholera.'",
      "tasks": [
        {
          "type": "text",
          "qNum": 3,
          "question": "Source Comparison: How does Source C provide a different historical perspective to Source A?",
          "model_answer": "Source A provides a top-down, corporate perspective, focusing coldly on 'efficiency' and 'contracts' for building the empire. In stark contrast, Source C provides a bottom-up, working-class perspective. It is highly emotional and desperate ('living like pigs', 'left to die'), revealing the horrific human cost and lack of basic amenities that the 'efficient' contractors in Source A completely ignored."
        }
      ]
    },
    {
      "title": "King Cholera and The Great Stink",
      "text": "The ultimate consequence of this squalor was Cholera, a deadly waterborne disease. Initially, Victorian doctors believed in the 'Miasma Theory' (that bad smells caused disease), so they burned barrels of tar. In 1854, Dr. John Snow proved cholera was in the water. Despite this, the government maintained a 'laissez-faire' (do nothing) policy because improving sanitation was expensive. This changed during the blazing hot summer of 1858. The 'Great Stink' of raw sewage drying in the River Thames became so unbearable that politicians in Parliament had to soak their curtains in chemicals to mask the stench. The physical reality of the smell finally forced the government to abandon laissez-faire, funding engineer Joseph Bazalgette millions to build a massive underground brick sewer system.",
      "level_4": "The dirty water caused a terrible disease called Cholera. Doctors believed in the 'Miasma Theory' (that bad smells caused disease). In 1854, Dr. John Snow proved cholera was actually in the dirty drinking water. But the government kept a 'laissez-faire' (do nothing) policy because sewers cost too much. In 1858, a hot summer caused the River Thames to dry up, creating 'The Great Stink' of raw sewage. The smell was so bad it reached Parliament. Politicians finally acted and paid Joseph Bazalgette to build huge underground brick sewers.",
      "tasks": [
        {
          "type": "text",
          "qNum": 4,
          "question": "Turning Point: Why did it take the 'Great Stink' for the government to finally abandon its 'laissez-faire' policy?",
          "model_answer": "The government maintained a laissez-faire policy because public health interventions were highly expensive, and they previously ignored scientific evidence like John Snow's discoveries. It took the 'Great Stink' to force change because the unbearable smell directly impacted the politicians inside the Houses of Parliament, making the crisis a personal discomfort they could no longer ignore."
        }
      ]
    },
    {
      "title": "The Public Health Act and the Historians' Debate",
      "text": "Following the construction of the sewers, Parliament passed the 1875 Public Health Act, finally forcing local councils to provide clean water and drainage. Today, historians debate the legacy of this era. 'Pessimist' historians argue that industrialisation was a catastrophe that subjected a whole generation to unlivable, deadly slums, pointing to the staggering cholera death tolls of the 1830s and 40s. Conversely, 'Optimist' historians argue that this crisis was a necessary growing pain. The rapid urbanisation forced the government to modernize and abandon laissez-faire; the immense wealth generated by the factories eventually paid for engineering marvels like Bazalgette's sewers and the laws that created the safe, sanitary cities we live in today.",
      "level_4": "In 1875, a new law forced all councils to provide clean water and drains. Today, historians debate if the cities were good or bad. 'Pessimist' historians say the industrial towns were a deadly disaster that killed thousands with diseases like cholera. But 'Optimist' historians argue that without this harsh period, the government would never have been forced to build the amazing sewers and pass the laws that make our modern cities clean and safe today.",
      "tasks": [
        {
          "type": "text",
          "qNum": 5,
          "question": "Extended Writing: Write a structured paragraph answering: 'To what extent did industrialisation make British towns unlivable?'",
          "model_answer": "To a significant extent, the early phase of industrialisation made British towns unlivable due to rapid, unregulated expansion. 'Pessimist' historians correctly argue that the initial explosion of back-to-back housing and lack of sanitation turned towns into death traps, evidenced by Chadwick's reports (Source B) and the desperate letters from slum dwellers (Source C). However, 'Optimist' historians provide a vital counter-perspective: this unlivable crisis eventually forced the government to abandon 'laissez-faire' policies. The Great Stink compelled the construction of Bazalgette's sewers and the 1875 Public Health Act, meaning that while industrialisation initially poisoned the towns, it eventually provided the wealth and engineering to make them modern and sanitary."
        }
      ]
    }
  ]
};

let dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// Retain visual source from original lesson
let originalLesson = data.lessons.find(l => l.id === 'lesson_3');
payload.sources = originalLesson.sources;

// Convert teacher notes objectives to learning_objectives UI format
if (payload.teacher_notes && payload.teacher_notes.objectives) {
  let cleanTitle = payload.title.replace(/^Lesson\s*\d+:\s*/i, '').replace(/KT\d+\.\d+:\s*/i, '').trim();
  let overarching = `To explore: ${cleanTitle.replace(/\?$/, '')}`;
  let scaffolded = payload.teacher_notes.objectives.map(obj => obj.objective);
  
  payload.learning_objectives = {
    overarching: overarching,
    scaffolded: scaffolded
  };
}

// Replace the lesson in the array
let index = data.lessons.findIndex(l => l.id === 'lesson_3');
data.lessons[index] = payload;

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected user payload for lesson 3');
