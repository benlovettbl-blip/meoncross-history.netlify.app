import fs from 'fs';

let content = fs.readFileSync('water_and_sanitation/data.js', 'utf8');

// The JSON in data.js is a JS object export. 
// We will do precise string replacements to avoid parsing issues.

// Remove think_pair_share from the tasks in Lesson 1.
// Looking at earlier output, they are exact strings:
content = content.replace(/"type":\s*"think_pair_share",\s*/g, '');

// Wait, if we remove 'type: think_pair_share', they become standard tasks. Standard tasks require a model_answer in KS3 format.
// The tasks in water_and_sanitation Lesson 1 currently look like this:
// { "question": "Enquiry: How does this source demonstrate both the advancements and limitations of Roman public health?", "text": "..." }
// Let's just add a basic model answer to any task that has a 'question' but no 'model_answer' (or we can just append it).
// Actually, it's safer to use regex to find the specific think pair share questions and add the model answer.

content = content.replace(/"question":\s*"Enquiry: How does this source demonstrate both the advancements and limitations of Roman public health?",/g, '"question": "Enquiry: How does this source demonstrate both the advancements and limitations of Roman public health?",\n              "model_answer": "The source demonstrates advancements through the complex engineering required to build and maintain the public baths, showing Roman dedication to hygiene. However, it also demonstrates limitations, as the baths were crowded, water wasn\'t always changed frequently, and communal bathing spread diseases.",');

content = content.replace(/"question":\s*"How does the archaeological evidence at Fishbourne support the idea that elite Romans valued hygiene and comfort\?",/g, '"question": "How does the archaeological evidence at Fishbourne support the idea that elite Romans valued hygiene and comfort?",\n              "model_answer": "Fishbourne Roman Palace contains extensive remains of private bathhouses and underfloor heating (hypocausts), proving that wealthy elite Romans spent vast sums of money to ensure their personal hygiene and comfort.",');

content = content.replace(/"question":\s*"Enquiry: According to Seneca, what does this source reveal about the social and commercial atmosphere inside a Roman bathhouse\?",/g, '"question": "Enquiry: According to Seneca, what does this source reveal about the social and commercial atmosphere inside a Roman bathhouse?",\n              "model_answer": "Seneca reveals that Roman bathhouses were incredibly noisy and chaotic. They were not just for washing, but served as busy social hubs where people exercised, argued, bought food from vendors, and conducted business.",');

// Remove Historian's Corner key individual bracket
content = content.replace(/\(Key individual\)\s*/g, '');
content = content.replace(/\[Key individual\]\s*/g, '');

fs.writeFileSync('water_and_sanitation/data.js', content);
console.log('Successfully patched water_and_sanitation/data.js');
