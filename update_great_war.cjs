const fs = require('fs');
const path = require('path');

function updateGreatWar() {
  const file = 'public/units/great_war/data.js';
  let content = fs.readFileSync(file, 'utf8');

  // Find "assessments": [ ... ] and remove it
  const startIdx = content.indexOf('"assessments": [');
  if (startIdx !== -1) {
    let brackets = 0;
    let endIdx = -1;
    for (let i = startIdx + 15; i < content.length; i++) {
      if (content[i] === '[') brackets++;
      if (content[i] === ']') {
        brackets--;
        if (brackets === 0) {
          endIdx = i;
          break;
        }
      }
    }
    if (endIdx !== -1) {
      let afterEnd = endIdx + 1;
      while (content[afterEnd] === ' ' || content[afterEnd] === '\n' || content[afterEnd] === '\r') afterEnd++;
      if (content[afterEnd] === ',') afterEnd++;
      content = content.substring(0, startIdx) + content.substring(afterEnd);
    }
  }

  // Add the new assessment lesson to the end of the lessons array.
  const lessonsStart = content.indexOf('"lessons": [');
  if (lessonsStart !== -1) {
    let brackets = 0;
    let lessonsEnd = -1;
    for (let i = lessonsStart + 11; i < content.length; i++) {
      if (content[i] === '[') brackets++;
      if (content[i] === ']') {
        brackets--;
        if (brackets === 0) {
          lessonsEnd = i;
          break;
        }
      }
    }
    if (lessonsEnd !== -1) {
      const newLesson = `,{
      "title": "Assessment: The Causes of the Great War",
      "substantive_concepts": "Examine underlying themes of diplomatic relations.",
      "historical_scholarship": "Reviews Marxist frameworks on the event.",
      "adaptive_teaching": "Review simplified texts for SEND.",
      "sequencing_retrieval": "Synthesizes previous learning of global empires.",
      "local_coastal_links": "N/A",
      "learning_objective": "To synthesize knowledge and construct an assessment on the causes of the Great War.",
      "disciplinary_concept": "Historical Enquiry",
      "formative_assessment": { "type": "End of Unit Summative Assessment" },
      "teacher_notes": {
        "primer": "This is a capstone assessment lesson testing chronological understanding and historical causation.",
        "objectives": [
          {
            "objective": "To accurately sequence the key events of the July Crisis.",
            "primer": "Instruct students to complete the Domino Flowchart timeline.",
            "question": "Which event directly caused Britain to declare war on Germany?"
          },
          {
            "objective": "To write a structured essay evaluating the significance of the M.A.I.N causes of the war.",
            "primer": "Use the M.A.I.N. significance diamond to scaffold their essay.",
            "question": "What is the most significant long-term cause of the Great War?"
          }
        ]
      },
      "do_now": {
        "type": "timeline",
        "title": "Retrieval Practice: The July Crisis",
        "description": "The rapid escalation of the 'July Crisis' in 1914 is mixed up below. Draw arrows connecting the boxes in the correct chronological and causal order.",
        "events": [
          { "year": "June 1914", "title": "Assassination", "detail": "Archduke Franz Ferdinand is assassinated in Sarajevo by Gavrilo Princip." },
          { "year": "July 1914", "title": "The Blank Cheque", "detail": "Germany promises unconditional support to Austria-Hungary." },
          { "year": "July 1914", "title": "The Ultimatum", "detail": "Austria-Hungary issues a harsh ultimatum to Serbia." },
          { "year": "August 1914", "title": "Russian Mobilization", "detail": "Russia mobilizes its army to protect Serbia." },
          { "year": "August 1914", "title": "Schlieffen Plan", "detail": "Germany invades Belgium to knock France out of the war quickly." },
          { "year": "August 1914", "title": "Britain Declares War", "detail": "Britain declares war on Germany to protect Belgian neutrality." }
        ]
      },
      "narrative_blocks": [
        {
          "title": "Assessment: M.A.I.N. Significance Essay",
          "text": "Using your M.A.I.N. significance diamond, write a 16-mark essay explaining the most significant causes of the Great War.",
          "tasks": [
            {
              "type": "extended_writing",
              "question": "Explain why the Great War broke out in 1914. You must refer to: Militarism, Alliances, Imperialism, and Nationalism. (16 marks)"
            }
          ]
        }
      ]
    }`;
      content = content.substring(0, lessonsEnd) + newLesson + '\n  ' + content.substring(lessonsEnd);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated great_war');
}

updateGreatWar();
