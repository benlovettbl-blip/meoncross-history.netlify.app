const fs = require('fs');
const dataPath = 'great_war_part2/data.js';

let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

const unitData = JSON.parse(jsonStr);

// 1. Update lesson_1 (Addition 1)
const l1 = unitData.lessons.find(l => l.id === 'lesson_1');
if (l1) {
  const oldText = l1.narrative_blocks[0].text;
  
  // Create the new block replacing the first paragraph
  const newText = `In the summer of 1914, Europe resembled a giant tinderbox waiting for a spark.

<strong>The Arms Race and Imperial Rivalry</strong><br>
To understand why Europe was so tense by 1914, we must look at the intense military and imperial competition between the Great Powers. A massive naval arms race was triggered in 1906 when Britain launched the <em>HMS Dreadnought</em>. This revolutionary battleship was heavily armoured with steel 28 cm thick, carried a crew of 800 sailors, and possessed huge guns that could blow up enemy ships from 32 km away. This made all older ships instantly obsolete. A frantic race began: between 1906 and 1914, Britain built 29 Dreadnoughts while Germany built 17.<br><br>Tensions were further pushed to breaking point by imperial clashes in North Africa. During the Second Moroccan Crisis in 1911, Germany sent the gunboat <em>SMS Panther</em> to the port of Agadir to aggressively challenge French control of the region, deeply alarming the British navy.

<br><br><strong>The July Days: The Countdown to War</strong><br>
The assassination of Archduke Franz Ferdinand on 28 June 1914 triggered a rapid chain reaction known as the 'July Days'. On 23 July, Austria-Hungary sent a strict list of demands to Serbia, including a demand to let Austrian officials run the assassination inquiry. When Serbia refused this demand to protect its independence, Austria-Hungary declared war on 28 July. The alliance system then activated like clockwork: Germany warned Russia not to intervene, and when Russia mobilised its army, Germany declared war on Russia on 1 August. On 3 August, Germany declared war on France, and on 4 August, Britain declared war on Germany after German troops invaded neutral Belgium.` + 
  oldText.substring(oldText.indexOf('<br><br>When Great Britain'));
  
  l1.narrative_blocks[0].text = newText;
}

// 2. Update lesson_2 (Addition 2)
const l2 = unitData.lessons.find(l => l.id === 'lesson_2');
if (l2) {
  const oldText = l2.narrative_blocks[0].text;
  
  const insertText = `<br><br><strong>Attrition and New Technologies</strong><br>
When the rapid movement of 1914 broke down into the deadlock of the trenches, military leaders were forced to rely on a strategy of <strong>attrition</strong>—the brutal process of gradually destroying or weakening the enemy by attacking them continuously until they ran out of men and supplies.<br><br>To break the stalemate, new and highly dangerous technologies were deployed. In 1914, aircraft were incredibly fragile, constructed merely of wood and thick cloth held together by piano wire. Pilots flew in completely open cockpits without parachutes, relying entirely on thick gloves, layers of warm clothes, and leather helmets to stop themselves from freezing to death in the air.`;

  // Insert before "<br><br>This horrific reality"
  const splitStr = '<br><br>This horrific reality';
  if (oldText.includes(splitStr)) {
    const parts = oldText.split(splitStr);
    l2.narrative_blocks[0].text = parts[0] + insertText + splitStr + parts[1];
  }
}

// 3. Create lesson_5 (User's Final Lesson) + Addition 3
const lesson5 = {
  id: "lesson_5",
  title: "Lesson 5: Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?",
  enquiry: "Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?",
  teacher_notes: {
    primer: "This lesson evaluates the conclusion of the First World War and introduces students to high-level historiographical debate regarding the Treaty of Versailles, shifting from basic source utility to complex interpretation analysis.",
    objectives: [
      {
        objective: "Understand the harsh terms imposed on Germany by the Treaty of Versailles, including Article 231.",
        primer: "Highlight the 'Diktat' and the crippling economic/military sanctions placed on Germany by the 'Big Three'.",
        question: "Why was the Treaty of Versailles considered a 'Diktat' by the German people?"
      },
      {
        objective: "Analyze conflicting historiographical interpretations of the Treaty.",
        primer: "Contrast the traditional view (Keynes) of a 'Carthaginian peace' with the modern revisionist view (MacMillan) that the failure lay in enforcement.",
        question: "How does the modern revisionist view challenge the idea that the Treaty was excessively harsh?"
      }
    ]
  },
  do_now: {
    title: "Do Now: Retrieval Grid",
    type: "grid",
    items: [
      {
        question: "What was the name of the 1914 British law that gave the government sweeping emergency powers to censor newspapers and ration food?",
        answer: "The Defense of the Realm Act (DORA).",
        points: 1,
        category: "Lesson 4 Recall"
      },
      {
        question: "What nickname was given to the female British munitions workers whose skin turned yellow due to toxic chemical exposure?",
        answer: "\"Canary Girls\" (or Munitionettes).",
        points: 1,
        category: "Lesson 4 Recall"
      },
      {
        question: "Why did over 130,000 members of the British West Indies Regiment suffer a major mutiny in Taranto, Italy, in December 1918?",
        answer: "Because they were subjected to severe racial discrimination, poor conditions, and forced into humiliating manual labor instead of combat roles.",
        points: 2,
        category: "Thematic Recall"
      },
      {
        question: "Why did General Douglas Haig's week-long artillery bombardment fail to destroy the German defenders before the Battle of the Somme?",
        answer: "Because German soldiers survived safely in deep, concrete-reinforced underground bunkers.",
        points: 2,
        category: "Thematic Recall"
      },
      {
        question: "Place these three WWI milestones in chronological order: The Battle of the Somme, The assassination of Archduke Franz Ferdinand, The Treaty of Versailles.",
        answer: "1. Assassination of Franz Ferdinand (June 1914), 2. Battle of the Somme (July 1916), 3. Treaty of Versailles (June 1919).",
        points: 3,
        category: "Historical Skills"
      },
      {
        question: "Explain the difference between \"change\" and \"continuity\" when studying the roles of women on the British Home Front.",
        answer: "Change refers to the new temporary opportunities in factories, while continuity refers to how most women were pushed back into traditional domestic roles once the war ended.",
        points: 3,
        category: "Historical Skills"
      }
    ]
  },
  vocab: [
    {
      term: "Armistice",
      definition: "An agreement made by opposing sides in a war to stop fighting; a truce."
    },
    {
      term: "War Guilt Clause (Article 231)",
      definition: "The section of the Treaty of Versailles forcing Germany to accept sole blame for starting the war."
    },
    {
      term: "Reparations",
      definition: "Massive financial payments forced upon a defeated nation to pay for war damage."
    },
    {
      term: "Diktat",
      definition: "A German term meaning a 'dictated peace,' used because they were banned from negotiating the terms."
    }
  ],
  narrative_blocks: [
    {
      title: "The Core Narrative",
      text: "By the autumn of 1918, the German military machine had completely collapsed. Starved by a relentless British naval blockade and overwhelmed by millions of fresh American troops, Germany signed an armistice (ceasefire) on November 11, 1918.\n\n<strong>Local History: The Surrender in the Solent</strong><br>\nFor the people of Hampshire, the end of the war was deeply visible. Under the terms of the Armistice, Germany had to surrender its deadly submarine fleet. Dozens of German U-boats were escorted by the Royal Navy into the Solent and docked at Portsmouth. For the locals in Fareham and Gosport, seeing these terrifying enemy vessels sitting silently in their own harbor was a stark, physical symbol that the total war was finally over.\n\n<strong>The Big Three and the Diktat</strong><br>\nIn January 1919, victorious Allied leaders gathered at the Paris Peace Conference. The negotiations were dominated by the \"Big Three\":\n<ul><li><strong>Georges Clemenceau (France):</strong> His nation had been devastated by two German invasions; he wanted to crush Germany economically and militarily.</li><li><strong>Woodrow Wilson (USA):</strong> An idealist who wanted a peaceful future based on his \"Fourteen Points\" and a League of Nations.</li><li><strong>David Lloyd George (Britain):</strong> Caught in the middle. He wanted to punish Germany to satisfy the bitter British public, but feared a ruined Germany would seek desperate revenge.</li></ul>\n\nThe resulting Treaty of Versailles (June 28, 1919) was a harsh compromise. Under <strong>Article 231 (the \"War Guilt Clause\")</strong>, Germany was forced to accept full responsibility for causing the war, allowing the Allies to demand <strong>£6.6 billion in reparations</strong>. Germany's military was gutted: the army was restricted to 100,000 men, the air force was abolished, and submarines were banned. Germany also lost 13% of its territory.\n\nBecause they had no say in the negotiations, Germans branded it a <strong>Diktat</strong> (a dictated peace). The humiliation deeply damaged Germany’s fragile new democracy, sowing seeds of bitter resentment that extremist leaders like Adolf Hitler would later exploit.\n\n<strong>The Immediate Fallout: Revolution and Ruin</strong><br>\nThe trauma of the military defeat and the brutal peace terms plunged Germany into immediate domestic chaos. The Armistice of 1918 was accompanied by a full-scale German Revolution, forcing the Kaiser to abdicate and flee into exile in Holland. The new, fragile democratic government (the Weimar Republic) faced catastrophic challenges from the start.<br><br>The astronomical £6.6 billion reparations bill set by the Treaty of Versailles crippled the German economy. This financial devastation directly triggered the hyperinflation crisis of 1923, which destroyed the value of German money, and led to the humiliating invasion and occupation of the industrial Ruhr valley by French forces. It was out of this post-war political and economic chaos that extremist groups, including Adolf Hitler's Nazi Party, began to build their support.",
      tasks: [
        {
          type: "text",
          text: "<strong>Part A: Core Factual Recall</strong><br>1. What was the \"Armistice\" of November 11, 1918?<br>2. Identify three military restrictions placed on Germany by the Treaty of Versailles.<br>3. Why did the German people refer to the Treaty of Versailles as a \"Diktat\"?",
          model: "1. It was an agreement between Germany and the Allies to stop fighting, bringing an end to active combat.\n2. The army was cut to 100,000 men, the navy was banned from having submarines, and the air force was completely abolished.\n3. Because Germany was excluded from the peace negotiations and was forced to sign the final document under threat of invasion."
        }
      ]
    },
    {
      title: "The Historians' Debate: A Doomed Peace?",
      text: "Did the Treaty of Versailles directly cause World War II because it was too harsh, or because the Allies failed to enforce it?\n\n<blockquote><strong>Interpretation A: The Traditional View (The Harsh Peace)</strong><br>\n<em>\"If we aim deliberately at the impoverishment of Central Europe, vengeance, I dare predict, will not limp... we shall destroy the economic system of Europe, and a war which will dwarf the one we have just survived will not be far off. This is a Carthaginian peace [a brutal, destructive peace].\"</em><br>\n— <em>Adapted from John Maynard Keynes, The Economic Consequences of the Peace (1919). Keynes was a British economist at the conference who quit in disgust.</em></blockquote>\n\n<blockquote><strong>Interpretation B: The Modern Revisionist View (The Enforcement Failure)</strong><br>\n<em>\"The Treaty of Versailles was not excessively harsh. Germany lost territory, but it remained the largest and wealthiest nation in central Europe. When compared to the brutal treaty Germany had forced upon Russia in 1918, Versailles was quite moderate. The true tragedy was not the treaty itself, but that the Allies later lacked the unity and will to enforce it.\"</em><br>\n— <em>Adapted from Margaret MacMillan, Peacemakers (2001)</em></blockquote>",
      tasks: [
        {
          type: "text",
          text: "<strong>Part B: Analyzing Historical Interpretations</strong><br>1. Read Interpretation A. Why did John Maynard Keynes believe the Treaty of Versailles was a disaster?<br>2. Read Interpretation B. What evidence does historian Margaret MacMillan use to argue the treaty was NOT excessively harsh?",
          model: "1. Keynes believed the treaty was a \"Carthaginian peace\" that was so brutal it would destroy the European economy and lead directly to a war of \"vengeance.\"\n2. MacMillan points out that Germany remained the largest, wealthiest nation in central Europe, and that the treaty was moderate compared to the harsh terms Germany had forced upon Russia in 1918."
        },
        {
          type: "text",
          text: "<strong>Part C: The \"Judgement & Nuance\" Paragraph Scaffold</strong><br>Write a structured paragraph answering the following: <em>\"To what extent was the Treaty of Versailles an unfair settlement that guaranteed a future war?\"</em><br><ul><li><strong>Thesis Statement:</strong> Establish your main argument (e.g., <em>While the Treaty of Versailles deeply humiliated the German public, modern historians argue it was not as unfairly harsh as traditionally believed...</em>)</li><li><strong>Factual Evidence:</strong> Provide specific knowledge (e.g., <em>Article 231, £6.6 billion in reparations, 100,000 men...</em>)</li><li><strong>Counter-Perspective:</strong> Acknowledge the traditional view (<em>Looking at Interpretation A, contemporaries like Keynes argued that destroying the German economy would lead to disaster...</em>)</li><li><strong>Evaluation:</strong> Conclude by using MacMillan's revisionist perspective to explain why the treaty's failure might have been more about enforcement than the actual terms.</li></ul>",
          starter: "While the Treaty of Versailles deeply humiliated the German public, modern historians argue it was not as unfairly harsh as traditionally believed...",
          model: "While the Treaty of Versailles deeply humiliated the German public, modern historians argue it was not as unfairly harsh as traditionally believed. The treaty did impose severe penalties, such as Article 231 (the War Guilt Clause), £6.6 billion in reparations, and an army limited to 100,000 men. Looking at Interpretation A, contemporaries like Keynes argued that destroying the German economy with these measures would inevitably lead to a war of vengeance. However, using MacMillan's revisionist perspective in Interpretation B, the treaty's failure might have been more about enforcement than the actual terms. Germany remained largely intact and wealthy compared to Russia under the Treaty of Brest-Litovsk, showing that a lack of Allied unity to enforce the treaty, rather than unfair harshness, ultimately allowed future conflict."
        }
      ]
    }
  ],
  quiz: [
    {
      q: "What date was the Treaty of Versailles officially signed by Allied and German leaders?",
      a: 0,
      options: [
        "June 28, 1919",
        "November 11, 1918",
        "January 1, 1914",
        "September 1, 1939"
      ]
    },
    {
      q: "Which US President proposed the 'Fourteen Points' and wanted to create a League of Nations?",
      a: 0,
      options: [
        "Woodrow Wilson",
        "Georges Clemenceau",
        "David Lloyd George",
        "Franklin D. Roosevelt"
      ]
    },
    {
      q: "What was the name of Article 231 of the Treaty of Versailles?",
      a: 0,
      options: [
        "The War Guilt Clause",
        "The Demilitarization Act",
        "The Reparation Standard",
        "The Armistice Agreement"
      ]
    },
    {
      q: "Why do modern revisionist historians like Margaret MacMillan argue Versailles was NOT excessively harsh?",
      a: 0,
      options: [
        "Because Germany remained intact as a wealthy state, and the terms were lighter than what Germany had forced on Russia.",
        "Because the Allies forgave Germany's debt in 1920.",
        "Because Britain and France gave Germany new colonies in Africa to help them recover.",
        "Because Germany was allowed to keep a massive 1 million man army."
      ]
    },
    {
      q: "Why did the German people call the Treaty of Versailles a 'Diktat'?",
      a: 0,
      options: [
        "They were completely excluded from the peace talks and forced to sign it.",
        "The entire treaty was written in a secret code they couldn't read.",
        "It was signed in a railway carriage in the middle of a German forest.",
        "It was dictated directly by Adolf Hitler."
      ]
    }
  ]
};

const existingIndex = unitData.lessons.findIndex(l => l.id === 'lesson_5');
if (existingIndex !== -1) {
  unitData.lessons[existingIndex] = lesson5;
} else {
  unitData.lessons.push(lesson5);
}

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";

fs.writeFileSync(dataPath, newContent);
console.log('Successfully injected Additions 1, 2, and 3 into great_war_part2/data.js');
