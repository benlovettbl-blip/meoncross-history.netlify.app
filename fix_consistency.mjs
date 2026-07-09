import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;\s*$/, '');
let unitData;
try {
  unitData = JSON.parse(jsonContent);
} catch (e) {
  const script = dataContent.replace('export const unitData = ', 'module.exports = ');
  fs.writeFileSync('temp_data.cjs', script);
  unitData = require('./temp_data.cjs');
}

// Fix Lesson 2 GCSE Task to match the image of Bismarck
unitData.lessons[1].gcse_task.sources[0].title = "Source A: 'The Greedy Boy', a British political cartoon published in Punch Magazine, 1885.";
unitData.lessons[1].gcse_task.model = "Source A is useful for showing the British perception of the Scramble for Africa; the cartoon's purpose is to mock Chancellor Bismarck as greedy, demonstrating the growing tension between Britain and Germany over colonies. Source B is useful for understanding the later German intent behind Weltpolitik; as a public speech by von Bülow, its purpose is to rally domestic support for empire-building. Together they show a continuous German ambition that directly caused British anxiety.";

// Clean up empty image sources in Lesson 5
unitData.lessons[4].sources = unitData.lessons[4].sources.filter(s => s.src !== undefined && s.src.trim() !== "");

const newJsContent = "export const unitData = " + JSON.stringify(unitData, null, 2) + ";\n";
fs.writeFileSync(dataPath, newJsContent);
console.log("Fixed Lesson 2 GCSE Task consistency and cleaned up Lesson 5 sources.");
