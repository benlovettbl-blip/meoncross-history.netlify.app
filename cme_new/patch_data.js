const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(targetPath, 'utf8');

// Use new Function to safely evaluate and extract the object
let data;
try {
  data = new Function(content.replace('export const unitData = ', 'return ').replace(/;$/, '') + ';')();
} catch (e) {
  console.error("Failed to parse data.js", e);
  process.exit(1);
}

const lesson1 = data.lessons.find(l => l.id === 'lesson_1');
const blocks = lesson1.narrative_blocks;

// Re-assign tasks for each block
blocks[0].tasks = [
  {
    "type": "written",
    "text": "What was the 'dual obligation' that Britain faced under the League of Nations Mandate of Palestine? (P1)",
    "model": "Britain was bound by a 'dual obligation': to establish a 'national home' for the Jewish people, and on the other hand, to safeguard the civil and religious rights of the existing Arab majority."
  }
];

blocks[1].tasks = [
  {
    "type": "written",
    "text": "Identify two reasons why Foreign Secretary Ernest Bevin set a strict immigration quota of 1,500 Jewish immigrants per month. (P2)",
    "model": "First, Bevin calculated that allowing a massive influx of Jewish refugees would trigger an uncontrollable civil war. Second, Britain was economically dependent on maintaining close relations with oil-rich Arab states that opposed unrestricted Jewish immigration."
  }
];

blocks[2].tasks = [
  {
    "type": "written",
    "text": "What was the 'Jewish Insurgency' and which three Zionist groups united to launch it? (P3)",
    "model": "The Jewish Insurgency was a coordinated, violent campaign against British rule in Palestine. It was led by the moderate Haganah, working alongside the extreme paramilitary splinter groups: the Irgun and the Lehi."
  }
];

blocks[3].tasks = [
  {
    "type": "written",
    "text": "Describe the deadliest act of the insurgency on 22 July 1946 and explain its intended target. (P4)",
    "model": "The deadliest act was the bombing of the King David Hotel in Jerusalem by the Irgun. The hotel's southern wing was targeted because it housed the central administrative headquarters of the British Mandate and the military command of the British Army."
  }
];

blocks[4].tasks = [
  {
    "type": "written",
    "text": "How did the British public react to the 'Sergeants Affair', and what was the political result? (P5)",
    "model": "The public reaction was explosive, with anti-Semitic riots erupting in British cities and a war-weary public demanding withdrawal. This forced the British government to admit Palestine was ungovernable and hand the problem to the United Nations."
  }
];

blocks[5].tasks = [
  {
    "type": "written",
    "text": "How did the United Nations Partition Plan (Resolution 181) divide the land of Palestine, and what was the reaction of the two communities? (P6)",
    "model": "Resolution 181 allocated 55% of Palestine to the Jewish population and 45% to the Arab majority, with Jerusalem as an international zone. The Zionist leadership accepted the plan with joy, while Arab leaders vehemently rejected it and vowed to fight to prevent the partition of their homeland."
  }
];

blocks[6].tasks = [];

// Block 7 is the map

blocks[8].tasks = [
  {
    "type": "written",
    "text": "What was the impact of the Deir Yassin massacre on the Palestinian Arab population in April 1948? (P7)",
    "model": "The brutal massacre of over 100 Arab villagers triggered widespread, uncontrollable panic. Believing they would face the same fate, over 250,000 Palestinian Arabs abandoned their homes and fled in terror."
  }
];

blocks[9].tasks = [];

blocks[10].tasks = [
  {
    "type": "written",
    "text": "Describe the tactical advantage Israel gained during the first UN truce in June 1948. (P8)",
    "model": "Israel used the one-month truce to unify its forces into a single national army (the IDF) and illegally import modern military hardware from Czechoslovakia, completely neutralizing the Arabs' initial material superiority."
  }
];

blocks[11].tasks = [
  {
    "type": "written",
    "text": "Explain the long-term consequence of the 1948-49 war for the Palestinian Arab population. (P9)",
    "model": "The war resulted in the Nakba ('The Catastrophe'), where over 700,000 Palestinian Arabs were permanently displaced from their homes, becoming refugees in neighboring states and losing a sovereign homeland."
  }
];

// Write back to file
const newContent = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully updated data.js with new questions!');
