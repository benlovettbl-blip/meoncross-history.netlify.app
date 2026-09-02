const fs = require('fs');
const file = 'public/units/post_war_britain/data.js';

async function updatePWB() {
  const module = await import('file://' + require('path').resolve(file));
  const data = module.default || module.unitData;
  
  const lastLessonIndex = data.lessons.length - 1;
  
  const newLastLesson = {
    "id": "lesson_6",
    "title": "How much did Britain change between 1945 and 2000? (Synthesis & Assessment)",
    "substantive_concepts": "Synthesize complex themes of social and political change.",
    "historical_scholarship": "Evaluates synthesis of post-war historiography.",
    "adaptive_teaching": "Provide structured timelines and essay planners for SEND.",
    "sequencing_retrieval": "Recalls the entire chronological sweep of the unit.",
    "local_coastal_links": "N/A",
    "learning_objective": "To synthesize historical evidence to evaluate the extent of social, economic, and political change in Britain from 1945 to 2000.",
    "disciplinary_concept": "Change and Continuity",
    "formative_assessment": {
      "type": "End of Unit Summative Assessment"
    },
    "teacher_notes": {
      "primer": "This is the capstone assessment lesson for the Post-War Britain unit. It focuses heavily on 'Change and Continuity', asking students to weigh the creation of the Welfare State and multiculturalism against the decline of Empire and deindustrialisation.",
      "objectives": [
        {
          "objective": "Review the major chronological milestones of post-war Britain.",
          "primer": "Use the Domino Flowchart timeline Do Now to ensure students have the chronological framework secure.",
          "question": "Which post-war event do you think triggered the most profound change in British daily life?"
        },
        {
          "objective": "Categorize evidence into themes of progress and decline.",
          "primer": "Guide students through the synthesis planner, helping them distinguish between social progress (e.g., NHS, civil rights) and economic/imperial decline.",
          "question": "How can a nation experience both dramatic social progress and severe economic decline at the same time?"
        },
        {
          "objective": "Construct a 16-mark synthesis essay evaluating the extent of change.",
          "primer": "Ensure students use the essay planner to structure a balanced argument with a clear, sustained judgment.",
          "question": "What is the key difference between describing changes and evaluating the *extent* of change?"
        }
      ]
    },
    "do_now": {
      "title": "Do Now: The Post-War Timeline",
      "substantive_concepts": "Chronological mapping of political reform.",
      "historical_scholarship": "N/A",
      "adaptive_teaching": "Use visual domino flowchart structure.",
      "sequencing_retrieval": "Retrieves exact chronological sequence of the unit.",
      "local_coastal_links": "N/A",
      "type": "timeline",
      "items": [
        {
          "question": "1945",
          "answer": "Clement Attlee's Labour Party wins a landslide election."
        },
        {
          "question": "1948",
          "answer": "The National Health Service (NHS) is founded and the Empire Windrush arrives."
        },
        {
          "question": "1956",
          "answer": "The Suez Crisis signals the definitive end of Britain's global imperial supremacy."
        },
        {
          "question": "1967",
          "answer": "The Sexual Offences Act decriminalizes homosexuality in England and Wales."
        },
        {
          "question": "1978-79",
          "answer": "The 'Winter of Discontent' sees massive strikes over pay and inflation."
        },
        {
          "question": "1984-85",
          "answer": "The Miners' Strike results in the defeat of the unions and accelerated deindustrialisation."
        }
      ]
    },
    "vocab": [
      {
        "term": "Synthesis",
        "definition": "Combining different historical facts and themes to form a new, comprehensive judgment."
      },
      {
        "term": "Welfare State",
        "definition": "A system where the government protects the health and well-being of its citizens, especially those in financial or social need, established after 1945."
      },
      {
        "term": "Deindustrialisation",
        "definition": "The decline of traditional heavy industries (like coal and steel) in a country's economy, a major feature of the 1980s."
      },
      {
        "term": "Consensus",
        "definition": "A general agreement; the Post-War Consensus refers to the period (1945-1979) when both major parties agreed on the welfare state and mixed economy."
      }
    ],
    "vocab_cloze_text": "To write a successful [Synthesis] essay, you must evaluate the massive shifts in British society. The creation of the [Welfare State] represented a huge leap in social progress. For decades, a political [Consensus] maintained this system. However, this period also witnessed painful economic changes, particularly the brutal process of [Deindustrialisation] which destroyed traditional working-class communities.",
    "narrative_blocks": [
      {
        "title": "Synthesis Essay Planning Task",
        "substantive_concepts": "Synthesize economic and social shifts.",
        "historical_scholarship": "Evaluates broad historiographical debates.",
        "adaptive_teaching": "Use the table planner to scaffold the essay.",
        "sequencing_retrieval": "Retrieves evidence from across all prior lessons.",
        "local_coastal_links": "N/A",
        "text": "To conclude this unit, you will write a 16-mark synthesis essay answering the core enquiry: <strong>'How much did Britain change between 1945 and 2000?'</strong> You must evaluate both the massive social progress (Welfare State, multiculturalism, civil rights) and the significant declines (loss of Empire, deindustrialisation).",
        "tasks": [
          {
            "type": "table_planner",
            "columns": [
              "Paragraph Theme",
              "Evidence (Historical Facts)",
              "Explanation (Extent of Change)"
            ],
            "rows": 3,
            "question": "Assessment Planner: Structure your argument before you write your final essay. Plan one paragraph for Social Progress, one for Imperial Decline, and one for Economic Restructuring."
          }
        ]
      }
    ],
    "extended": {
      "title": "Final Assessment",
      "substantive_concepts": "Synthesize complex themes of social and political change.",
      "historical_scholarship": "Evaluates synthesis of post-war historiography.",
      "adaptive_teaching": "Provide structured hints for SEND.",
      "sequencing_retrieval": "Recalls the entire chronological sweep of the unit.",
      "local_coastal_links": "N/A",
      "question": "How much did Britain change between 1945 and 2000? Evaluate the extent of social, economic, and political transformation.",
      "hints": [
        "Intro: Define your overall argument. Was the change revolutionary or gradual? Was it mostly positive or negative?",
        "Para 1 (Social Progress): Discuss the 1945 Labour government, the creation of the NHS, and the 1960s liberal reforms.",
        "Para 2 (Imperial Decline & Identity): Discuss the Windrush generation, multiculturalism, and the loss of global power (e.g. Suez).",
        "Para 3 (Economic Turmoil): Discuss the breakdown of the post-war consensus, the Winter of Discontent, and Thatcher's deindustrialisation.",
        "Conclusion: Summarize your final judgment on the 'extent' of change."
      ],
      "lines": 35
    }
  };

  data.lessons[lastLessonIndex] = newLastLesson;

  // We need to write it back as an export const unitData = ...
  // To avoid breaking the file formatting or imports at the top, we can use regex to replace the unitData object.
  // Actually, since it's a JS file, a robust way is to read the file, locate `export const unitData = {`, and stringify the modified object.
  // Wait, if it has other imports or functions, it's safer to just stringify the `data` object and write it back.
  let oldContent = fs.readFileSync(file, 'utf8');
  let newObjectStr = JSON.stringify(data, null, 2);
  
  // The file usually looks like:
  // export const unitData = { ... }
  // Let's just write exactly that.
  let finalContent = "export const unitData = " + newObjectStr + ";\\n";
  
  fs.writeFileSync(file, finalContent, 'utf8');
  console.log('Updated post_war_britain');
}

updatePWB().catch(console.error);
