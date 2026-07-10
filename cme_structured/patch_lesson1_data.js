const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'lessons_data.js');
let content = fs.readFileSync(file, 'utf8');

const replacement = `    "narrative": [
      "After the Second World War and the horrors of the Holocaust, the British Mandate became impossible to govern. Britain was caught in an impossible balancing act between two opposing forces. Zionist leaders urgently demanded the creation of a Jewish state in Palestine to house European refugees. The USA strongly supported this, with President Harry Truman pressuring Britain to immediately allow 100,000 Jewish refugees into Palestine.",
      "However, Palestinian Arabs, who formed the majority of the population, violently opposed this. Led by figures like the Grand Mufti of Jerusalem, Haj Amin al-Husseini, they demanded immediate independence and an end to mass Jewish immigration. Caught in the middle, British Foreign Secretary Ernest Bevin restricted Jewish immigration to a strict quota of just 1,500 people a month, fearing an Arab revolt that might threaten Britain's access to vital Middle Eastern oil. This impossible balancing act alienated both sides, ultimately causing Jewish paramilitary groups to abandon their wartime truce and launch a violent insurgency to force the exhausted British to withdraw.",
      "Furious at the immigration restrictions, extremist Jewish groups like the Irgun and Lehi waged a violent terrorist campaign against British forces. On 22 July 1946, the Irgun blew up the southern wing of the King David Hotel in Jerusalem, which housed the British military and administrative headquarters, killing 91 people. This severely damaged British morale and caused massive public outrage.",
      "The situation further deteriorated with the SS Exodus Crisis in July 1947, when British authorities turned away a refugee ship carrying 4,500 Holocaust survivors, sparking massive international condemnation. Shortly after, during the Sergeants Affair, the Irgun kidnapped and hanged two British sergeants. Exhausted by the violence and the immense financial cost of maintaining 100,000 troops, Britain referred the Mandate to the newly formed United Nations in February 1947.",
      "On 29 November 1947, the UN passed Resolution 181, which recommended dividing Palestine into two separate states (the Partition Plan). The Jewish state was awarded over half (55%) of the territory, despite Jews making up only one third of the population. While Jewish leaders reluctantly accepted the plan, the Arab leadership completely rejected it, feeling the UN had no right to divide their land without the consent of the indigenous majority. The UN's attempt to peacefully partition the land failed, sparking an immediate civil war between Arabs and Jews."
    ],
    "sources": [
      {
        "title": "Source A: Irgun Communiqué (1946)",
        "caption": "\\"We targeted the British administrative headquarters to make it clear that the occupier cannot reside in peace. The King David Hotel was warned, but the authorities refused to evacuate, leading to this tragic, necessary cost of liberation.\\""
      },
      {
        "title": "Source B: The UN Partition Plan",
        "src": "../public/assets/sources/un_partition_plan_1947.png",
        "caption": "Map showing the proposed UN Partition Plan (Resolution 181) dividing the land into Jewish and Arab states."
      }
    ],
    "tasks": [
      {
        "type": "written",
        "text": "Q1: Using the narrative, explain why Ernest Bevin restricted Jewish immigration to 1,500 people a month."
      },
      {
        "type": "written",
        "text": "Q2: Outline three key events that broke British morale between 1946 and 1947."
      },
      {
        "type": "written",
        "text": "Q3: Why did Palestinian Arabs reject UN Resolution 181?"
      },
      {
        "type": "complex",
        "text": "Source Analysis: Study Source A. How does the Irgun justify the bombing of the King David Hotel, and why might this be unreliable?"
      }
    ],
    "scholarlyDepth": {
      "title": "Scholarly Perspective: The Warning Controversy",
      "body": "Historians debate whether the British authorities received adequate warning of the King David Hotel bombing. The Irgun claimed they telephoned three warning calls 25 minutes prior to the blast. British officials denied receiving direct warning or dismissed it as a hoax, which resulted in the high casualty count of 91 deaths."
    },
    "steps": []`;

const lines = content.split('\\n');
// Find where subtopic_1_1 steps begin
const startIdx = lines.findIndex(l => l.includes('"steps": [') && (lines[lines.indexOf(l)+1].includes('Step 1: The Conflicting') || lines[lines.indexOf(l)+2].includes('Step 1: The Conflicting')));

if (startIdx !== -1) {
    let endIdx = startIdx;
    let braceCount = 0;
    let foundBracket = false;
    for (let i = startIdx; i < lines.length; i++) {
        if (lines[i].includes('[')) { foundBracket = true; braceCount++; }
        if (lines[i].includes(']')) { braceCount--; }
        if (foundBracket && braceCount === 0) {
            endIdx = i;
            break;
        }
    }
    lines.splice(startIdx, endIdx - startIdx + 1, replacement);
    fs.writeFileSync(file, lines.join('\\n'), 'utf8');
    console.log("Patched subtopic_1_1 successfully.");
} else {
    console.log("Could not find start index for subtopic_1_1.");
}
