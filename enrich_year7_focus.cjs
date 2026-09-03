const fs = require('fs');
const path = require('path');

const medievalFocus = [
    "Causation – Analyzing the short-term and long-term reasons why William won the Battle of Hastings.",
    "Change & Continuity – Evaluating how the Norman Conquest transformed the landscape and society of England.",
    "Historical Significance – Assessing the importance of the clash between secular and religious power.",
    "Interpretations – Exploring different views on whether King John was a tyrant or a victim of baronial ambition.",
    "Similarity & Difference – Comparing the daily lives, beliefs, and constraints of medieval peasantry versus nobility.",
    "Change & Continuity – Understanding how a demographic catastrophe permanently altered the feudal economic structure.",
    "Causation – Analyzing the long and short-term triggers that led the peasantry to rebel in 1381.",
    "Causation – Examining the dynastic triggers of the Wars of the Roses and how it ended the medieval era.",
    "Historical Enquiry & Exam Skills – Synthesizing knowledge to evaluate the overarching power of medieval monarchs."
];

const waterFocus = [
    "Source Utility – Evaluating the usefulness of contemporary evidence to understand Roman public health.",
    "Change & Continuity – Explaining why the collapse of the Roman Empire led to a regression in public health infrastructure.",
    "Similarity & Difference – Comparing the public health challenges of early modern towns with medieval settlements.",
    "Causation – Analyzing how rapid urbanization and laissez-faire attitudes caused a public health crisis.",
    "Historical Significance – Assessing the importance of the 1858 'Great Stink' and John Snow's discoveries in forcing government action.",
    "Source Utility & Exam Skills – Applying disciplinary skills to assess sources for a formal GCSE-style assessment."
];

function updateDataFile(unitId, focusArray) {
    const filePath = path.join(__dirname, 'public', 'units', unitId, 'data.js');
    let content = fs.readFileSync(filePath, 'utf8');

    // Resetting and using learning_objective
    let currentIdx = 0;
    content = content.replace(/disciplinary_focus:\s*["'][^"']+["'],?\s*\n?/g, '');
    
    content = content.replace(/learning_objective:\s*["']([^"']+)["']/g, (match, objText) => {
        if (currentIdx < focusArray.length) {
            const focusText = focusArray[currentIdx];
            currentIdx++;
            return `disciplinary_focus: "${focusText}",\n        ` + match;
        }
        return match;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${unitId}`);
}

updateDataFile('medieval_england', medievalFocus);
updateDataFile('water_and_sanitation', waterFocus);
