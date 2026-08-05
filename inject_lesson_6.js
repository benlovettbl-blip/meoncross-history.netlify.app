const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

const unitData = JSON.parse(jsonStr);

const lesson6 = {
  id: "lesson_6",
  title: "Lesson 6: How did the \"Lost Generation\" impact the village of Stubbington?",
  enquiry: "How did the \"Lost Generation\" impact the village of Stubbington?",
  teacher_notes: {
    primer: "This lesson concludes the unit by scaling down the macro-statistics of the Great War into a localized micro-history, focusing on the Stubbington War Memorial and the tragic loss of the Lowry brothers. This fosters historical empathy and helps students grasp the profound demographic and emotional toll of the conflict.",
    objectives: [
      {
        objective: "Understand the scale of the \"Lost Generation\" and how it affected local communities.",
        primer: "Explain how the death of over 700,000 British soldiers created a demographic catastrophe, using the 67 local names on the Stubbington memorial as a tangible anchor.",
        question: "How did the sheer number of casualties affect the local economy and community spirit in a village like Stubbington?"
      },
      {
        objective: "Apply the concept of micro-history to understand the human cost of the war.",
        primer: "Use the tragedy of the Lowry brothers to demonstrate how \"Pals Battalions\" and local enlistment meant that single battles could wipe out entire local families.",
        question: "Why does focusing on a single family like the Lowrys give us a different understanding of the war compared to reading general casualty statistics?"
      }
    ]
  },
  do_now: {
    title: "Do Now: Retrieval Grid",
    type: "grid",
    items: [
      {
        question: "What nickname was given to women working with toxic TNT in munitions factories?",
        answer: "\"Canary Girls\" (or Munitionettes).",
        points: 1,
        category: "Lesson 4 Recall"
      },
      {
        question: "Under the Treaty of Versailles, what was the maximum number of men allowed in the German army?",
        answer: "100,000 men.",
        points: 1,
        category: "Lesson 5 Recall"
      },
      {
        question: "What did Article 231 of the Treaty of Versailles force Germany to accept?",
        answer: "Full responsibility for causing the war (the War Guilt Clause).",
        points: 2,
        category: "Thematic Recall"
      },
      {
        question: "What was the name of the revolutionary battleship launched by Britain in 1906?",
        answer: "HMS Dreadnought.",
        points: 2,
        category: "Thematic Recall"
      },
      {
        question: "Explain the difference between a 'traditional' and 'revisionist' historical interpretation using General Douglas Haig as an example.",
        answer: "The traditional view sees Haig as a foolish 'donkey' sending men to their deaths, while the revisionist view argues he faced unprecedented technological challenges and eventually learned to adapt.",
        points: 3,
        category: "Historical Skills"
      },
      {
        question: "What does the term 'Diktat' mean and why did Germans use it to describe the Treaty of Versailles?",
        answer: "It means 'dictated peace'. They used it because Germany was banned from negotiating and forced to sign the treaty under threat of invasion.",
        points: 3,
        category: "Historical Skills"
      }
    ]
  },
  vocab: [
    {
      term: "Commemoration",
      definition: "The formal act of honoring and remembering the people who sacrificed their lives in a conflict."
    },
    {
      term: "The Lost Generation",
      definition: "The term used to describe the young men who came of age during WWI, a massive percentage of whom were killed or severely wounded."
    },
    {
      term: "Micro-History",
      definition: "The study of history on a very small scale—such as looking at one specific village, family, or memorial—to help understand larger global events."
    },
    {
      term: "Historical Empathy",
      definition: "The ability to understand and share the feelings, perspectives, and experiences of people in the past."
    }
  ],
  narrative_blocks: [
    {
      title: "The Core Narrative",
      text: `When the guns fell silent in November 1918, the national celebrations were heavily muted by profound local grief. The British Empire had won the war, but it had come at the cost of over 700,000 British military deaths. In small, tight-knit communities across Hampshire, the true cost of the First World War was measured not in treaties or captured territory, but in the empty chairs at family dinner tables. This demographic catastrophe created what became known as the <strong>"Lost Generation."</strong><br><br><div class="local-history-spotlight"><strong>Local History: The Stubbington War Memorial</strong><br>To ensure these men and women were never forgotten, communities across Britain began raising money to build War Memorials. The Stubbington War Memorial, erected in 1922 on the Village Green, is highly unique in its history and design. Instead of a traditional stone cross, obelisk, or soldier statue, it was designed as a wooden shelter shedding over the local village pump.<br><br>Crucially, the memorial was proposed and designed by the mother of the only woman to be commemorated among the fallen. Carved into the wood of the inner roof were the names of 67 local people from Stubbington and Hill Head who lost their lives in the conflict. For a village of its size in 1914, the sudden loss of 67 young people was a devastating blow to the local economy, workforce, and community spirit.</div><br><br><div class="local-history-spotlight"><strong>Local History: The Tragedy of the Lowry Brothers</strong><br>Behind each of those 67 names is a story of individual family tragedy, exemplified by the loss of the three Lowry brothers. In many local families, driven by the intense social pressure and patriotism of 1914, multiple brothers volunteered together. Because of the nature of the industrialized slaughter on the Western Front, this often meant that a single battle could wipe out the male lineage of an entire household.<br><br>When historians study the grand military strategies of generals like Douglas Haig, it is easy to get lost in the sheer scale of the statistics. Zooming in on local micro-histories—like the devastating sacrifice of the Lowry family—allows us to practice <strong>historical empathy</strong>. It forces us to understand the catastrophic emotional toll the war took on ordinary working-class parents in Stubbington, who received multiple dreaded telegrams from the War Office informing them that their sons would not be coming home.</div>`,
      tasks: [
        {
          type: "text",
          text: "<strong>Part A: Core Factual Recall</strong><br>1. Where was the Stubbington War Memorial erected in 1922?<br>2. What makes the origin and design of the Stubbington memorial unique?<br>3. How many local names from Stubbington and Hill Head are carved into the memorial?",
          model: "1. It was built on the Village Green, covering the local village pump.<br><br>2. It is a wooden shelter rather than a stone cross, and it was proposed and designed by the mother of the only woman commemorated on the memorial.<br><br>3. There are 67 names carved into the memorial."
        },
        {
          type: "text",
          text: "<strong>Part B: Conceptual Analysis (Micro-History)</strong><br>4. Why is the story of the three Lowry brothers historically significant when studying the impact of the First World War?",
          model: "The loss of the Lowry brothers is significant because it highlights the concentrated grief experienced by individual families. It shows how the war didn't just cause random casualties, but often wiped out multiple siblings from the same household, devastating local family structures."
        },
        {
          type: "text",
          text: "<strong>Part C: The \"Judgement & Nuance\" Paragraph Scaffold</strong><br>5. Write a structured paragraph answering the following: <em>\"To what extent do local war memorials provide a more accurate picture of the First World War than military statistics?\"</em><br><ul><li><strong>Thesis Statement:</strong> Establish your main argument (e.g., <em>While military statistics show the global scale of the war, local war memorials are essential for revealing the true human cost...</em>)</li><li><strong>Factual Evidence:</strong> Provide specific local knowledge (e.g., <em>The 67 names on the Stubbington pump shelter, the loss of the three Lowry brothers...</em>)</li><li><strong>Counter-Perspective:</strong> Acknowledge why statistics still matter (<em>However, looking only at one village's memorial does not explain why the war was won or lost on a tactical level...</em>)</li><li><strong>Evaluation:</strong> Conclude by explaining why combining macro-statistics with micro-history (like the Lowry family) gives historians the most complete picture.</li></ul>",
          starter: "While military statistics show the global scale of the war, local war memorials are essential for revealing the true human cost...",
          model: "While military statistics show the global scale of the war, local war memorials are essential for revealing the true human cost. Factual evidence, such as the 67 names carved into the Stubbington pump shelter and the tragic loss of the three Lowry brothers, highlights the devastating emotional and economic blow to a single tight-knit community. However, looking only at one village's memorial does not explain why the war was won or lost on a tactical level, nor does it encompass the millions of casualties suffered globally. Ultimately, while statistics are necessary to understand the vast scope of the conflict, combining them with micro-histories gives historians the most complete picture by fostering historical empathy for the real families destroyed by the war."
        }
      ]
    }
  ],
  quiz: [
    {
      q: "In what year was the Stubbington War Memorial erected?",
      a: 0,
      options: ["1922", "1918", "1939", "1914"]
    },
    {
      q: "What physical structure does the Stubbington War Memorial cover?",
      a: 0,
      options: ["The local village pump.", "The entrance to the local church.", "An old artillery gun brought back from France.", "The village post office."]
    },
    {
      q: "Who proposed and designed the memorial in Stubbington?",
      a: 0,
      options: ["The mother of the only woman commemorated among the fallen.", "The Mayor of Fareham.", "Lord Kitchener.", "A famous London architect."]
    },
    {
      q: "How many names of the fallen are recorded on the Stubbington memorial?",
      a: 0,
      options: ["67", "12", "300", "45"]
    },
    {
      q: "What historical term describes the study of a specific family, like the Lowry brothers, to understand a larger global event?",
      a: 0,
      options: ["Micro-history", "Historiography", "Macro-economics", "Demographics"]
    }
  ]
};

const existingIndex = unitData.lessons.findIndex(l => l.id === 'lesson_6');
if (existingIndex !== -1) {
  unitData.lessons[existingIndex] = lesson6;
} else {
  unitData.lessons.push(lesson6);
}

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Successfully injected Lesson 6 into great_war_part2/data.js');
