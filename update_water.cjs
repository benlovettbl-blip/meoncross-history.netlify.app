const fs = require('fs');
const path = require('path');

function updateWater() {
  const file = 'public/units/water_and_sanitation/data.js';
  let content = fs.readFileSync(file, 'utf8');

  // Find "assessments": [ ... ] and remove it
  // We know it starts right after some array (like vocab or glossary)
  // Let's use regex to find "assessments": [ ... ],
  // Since it's large, a regex might fail. But we can find the indices.
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
      // remove the trailing comma if it exists
      let afterEnd = endIdx + 1;
      while (content[afterEnd] === ' ' || content[afterEnd] === '\n' || content[afterEnd] === '\r') afterEnd++;
      if (content[afterEnd] === ',') afterEnd++;
      content = content.substring(0, startIdx) + content.substring(afterEnd);
    }
  }

  // Now, add the new assessment lesson to the end of the lessons array.
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
      "title": "Assessment: Roman Public Health",
      "substantive_concepts": "Review core themes of religious conflict.",
      "historical_scholarship": "Evaluates traditional perspectives on the event.",
      "adaptive_teaching": "Assign knowledge organizers to aid focus.",
      "sequencing_retrieval": "Synthesizes previous learning of global empires.",
      "local_coastal_links": "N/A",
      "learning_objective": "To synthesize knowledge and construct an assessment on Roman public health.",
      "disciplinary_concept": "Historical Enquiry",
      "formative_assessment": { "type": "End of Unit Summative Assessment" },
      "teacher_notes": {
        "primer": "This is a capstone assessment lesson testing chronological understanding and source utility analysis.",
        "objectives": [
          {
            "objective": "To accurately sequence the key events of public health history.",
            "primer": "Instruct students to complete the Domino Flowchart timeline.",
            "question": "Which event directly led to the construction of London's modern sewer network?"
          },
          {
            "objective": "To evaluate the usefulness of primary sources for historical enquiries.",
            "primer": "Direct students to the source analysis task. Remind them to use NOP (Nature, Origin, Purpose).",
            "question": "Why does the provenance of a source affect its usefulness to a historian?"
          }
        ]
      },
      "do_now": {
        "type": "timeline",
        "title": "Retrieval Practice: Public Health History",
        "description": "The development of public health is mixed up below. Draw arrows to connect them in chronological order.",
        "events": [
          { "year": "312 BC", "title": "Roman Aqueducts", "detail": "The Romans begin building vast aqueducts and bathhouses." },
          { "year": "1348", "title": "The Black Death", "detail": "The plague kills a third of England, blamed on miasma." },
          { "year": "1842", "title": "Chadwick's Report", "detail": "Edwin Chadwick publishes his report on sanitary conditions." },
          { "year": "1854", "title": "Broad Street Pump", "detail": "John Snow proves cholera is waterborne." },
          { "year": "1858", "title": "The Great Stink", "detail": "The Thames smells so bad that Parliament shuts down, leading to Bazalgette's sewers." }
        ]
      },
      "narrative_blocks": [
        {
          "title": "Assessment: Source Utility Analysis",
          "text": "Study Sources B and C below. How useful are Sources B and C for an enquiry into Roman public health and bathhouses? (8 marks)",
          "sources": [
            {
              "id": "Source B",
              "text": "I am surrounded by all kinds of noise... picture to yourself the assortment of sounds, which are strong enough to make me hate my very powers of hearing! When the gentlemen are exercising with their lead weights... I hear their groans... and next, hear the screech of a hair-plucker... and the various cries of the sausage-seller, the baker, and the sweet-seller, who hawk their goods about the baths.",
              "provenance": "Extract from a letter by the Roman philosopher Seneca the Younger (c. AD 62), complaining about the intense noise and activity of a Roman bathhouse he lived above.",
              "provenance_clue": "Seneca was a private individual writing a personal letter. He lived right above the bathhouse, meaning he personally experienced the daily noise and chaos. Does this make his account of the 'social' atmosphere more reliable or just a personal grievance?"
            },
            {
              "id": "Source C",
              "text": "With such an array of indispensable structures carrying so many waters, compare, if you will, the idle pyramids or the useless, though famous, works of the Greeks! The abundance of water is sufficient not only for public and private uses and applications but truly even for pleasure. The water flows through the city like a queen.",
              "provenance": "Extract from 'De aquaeductu' (The Aqueducts of Rome) by Sextus Julius Frontinus (c. AD 97), the official water commissioner for the city of Rome.",
              "provenance_clue": "Frontinus was an official state commissioner appointed by the Emperor. His job was to maintain the water supply. How does his official role affect his view of the aqueducts? Is he likely to write about the flaws, or just praise the greatness of Roman engineering?"
            }
          ],
          "tasks": [
            {
              "type": "source_analysis",
              "question": "How useful are Sources B and C for an enquiry into Roman public health and bathhouses? (8 marks)",
              "model_answer": "<strong>Source B is highly useful for revealing the social reality and everyday atmosphere of Roman bathhouses;</strong> <strong style=\\\"color: #0284c7;\\\">it describes the intense noise of 'hair-pluckers' and 'sausage-sellers', proving that bathhouses were busy social hubs rather than just places for hygiene.</strong> <strong style=\\\"color: #9333ea;\\\">As a private letter written by someone living directly above the baths, Seneca provides a highly reliable, unfiltered eyewitness account of the daily chaos.</strong> <strong style=\\\"color: #16a34a;\\\">This is supported by our knowledge that Roman bathhouses (thermae) contained exercise yards, food stalls, and meeting rooms, making them the centre of community life.</strong><br><br><strong>Source C is also extremely useful for showing the scale and engineering brilliance of Roman public health;</strong> <strong style=\\\"color: #0284c7;\\\">it highlights the 'abundance of water' that flowed through the city 'like a queen' for both private use and public pleasure.</strong> <strong style=\\\"color: #9333ea;\\\">As an official report written by the state water commissioner, Frontinus's purpose is to glorify Roman achievements and praise the Emperor, so he may exaggerate its perfection and ignore the poorer areas that lacked piped water.</strong> <strong style=\\\"color: #16a34a;\\\">However, we know that Roman aqueducts were indeed revolutionary engineering feats that used gravity to supply millions of gallons of fresh water to urban centres, drastically improving public health.</strong>"
            }
          ]
        }
      ]
    }`;
      content = content.substring(0, lessonsEnd) + newLesson + '\n  ' + content.substring(lessonsEnd);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated water_and_sanitation');
}

updateWater();
