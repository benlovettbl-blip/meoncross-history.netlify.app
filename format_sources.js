const fs = require('fs');

let dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

let lesson = data.lessons.find(l => l.id === 'lesson_3');

// 1. Rebuild the Sources Array
lesson.sources = [
  {
    title: 'Visual Hook: Over London by Rail (1872)',
    src: '/images/victorian_slum.jpg',
    caption: 'An engraving by Gustave Doré depicting the overcrowded and polluted back-to-back housing of Victorian London, published in 1872.'
  },
  {
    type: 'written',
    title: 'Source A: The Official, Top-Down Government Data',
    content: '"The charcoal-burners, the brick-makers, and the miners are all exposed to severe atmospheric changes and filth... In the town districts, the crowded back-to-back dwellings are built with no ventilation, and the refuse of the houses is thrown into open streets. The annual loss of life from filth and bad ventilation is greater than the loss from death or wounds in any wars in which the country has been engaged in modern times."\n— Edwin Chadwick, Report on the Sanitary Conditions of the Labouring Population of Great Britain, 1842',
    provenance_clue: 'Chadwick was a government official writing a formal report. Think about why he uses statistics and comparisons to "modern wars" to make his point.'
  },
  {
    type: 'written',
    title: 'Source B: The Unregulated Capitalism / Corporate Perspective',
    content: '"The demand for the Fareham bricks remains unprecedentedly high, owing to their great durability under heavy pressure. Contracts have been secured for the building of the vast railway arches, the expanding dockyards at Portsmouth, and prestigious public buildings in the capital. To keep pace with the building of these modern towns, the clay pits must work without interruption, and cottages for the labourers must be raised instantly adjacent to the works to secure the utmost efficiency of labour."\n— Adapted from 19th-Century Southern Industrial and Brick-making Directory Records',
    provenance_clue: `This is a corporate record focused on business and profit. Notice how it describes the workers' "cottages" purely in terms of "efficiency of labour".`
  },
  {
    type: 'written',
    title: 'Source C: The Bottom-Up, Raw Human Perspective',
    content: '"We live in muck and filth. We aint got no privies, no dust bins, no drains, no water-splies, and no sewers in the whole place... We are living like pigs, and it aint fair. We hope you will print this to let the great people know how we are left to die of the cholera. We are your regular readers, and we pray you to help us."\n— Letter to the Editor of The Times, signed by 54 residents of London slums, 1849',
    provenance_clue: 'This is a desperate plea from the people actually living in the slums. Contrast their highly emotional, raw language with the cold, official language of Source A.'
  }
];

// 2. Update Narrative Blocks to remove embedded source quotes and update task references
lesson.narrative_blocks[0].title = 'The Façade of Empire';
lesson.narrative_blocks[0].text = `During the 19th century, Britain's population boomed and millions flooded into cities. Construction exploded. To understand the scale of this, historians look at sources like Source B, adapted from an industrial directory for Victorian contractors (like Joseph Bull & Sons). This shows the 'façade' of the Empire: wealthy exteriors built by local Hampshire mud. But behind these glorious public buildings lay a very different reality for the working classes.`;
lesson.narrative_blocks[0].level_4 = `In the 1800s, millions of people moved to cities. Construction companies used millions of 'Fareham Red' bricks to build amazing places like the Royal Albert Hall. Source B is a record from one of these companies. This made Britain look rich and powerful, but the poor workers who made the bricks were forced to live in terrible, crowded slums.`;
lesson.narrative_blocks[0].tasks[0].question = "Conceptual Analysis: Based on Source B, what was the primary concern of the Victorian contractors when building 'cottages' for their workers?";
lesson.narrative_blocks[0].tasks[0].model_answer = "Source B reveals that the contractors' primary concern was 'efficiency of labour'. They built cottages 'instantly adjacent' to the worksites not for the comfort of the workers, but to ensure they could extract the maximum amount of work from them to keep pace with the massive demand for Fareham bricks.";

lesson.narrative_blocks[1].title = 'The Official Investigation';
lesson.narrative_blocks[1].text = `To house the exploding population, landlords packed workers into tiny 'back-to-back' houses sharing three walls, offering zero ventilation. Entire families lived in a single room with no plumbing, sharing a single outdoor toilet over a deep cesspit. We know about this squalor from official investigations, such as Source A, an 1842 government report by reformer Edwin Chadwick.`;
lesson.narrative_blocks[1].level_4 = `Landlords built 'back-to-back' houses. These houses shared three walls, so there was no fresh air. Whole families squeezed into one room sharing an outdoor toilet. Human waste often leaked into the drinking water. We know this from Source A, an 1842 government report by Edwin Chadwick.`;
lesson.narrative_blocks[1].tasks[0].question = "Language Analysis: Look at Source A. Why do you think Edwin Chadwick chose to compare the deaths in the slums to the deaths in a 'modern war'?";
lesson.narrative_blocks[1].tasks[0].model_answer = "Chadwick used the comparison to war to shock a 'laissez-faire' government into action. By comparing the deaths from 'filth and bad ventilation' to military casualties, he translated a public health issue into a national security crisis, using formal, striking language to prove that doing nothing was killing more British citizens than foreign enemies.";

lesson.narrative_blocks[2].title = 'The Raw Human Perspective';
lesson.narrative_blocks[2].text = `While Chadwick's report provided official statistics, historians also need the raw, human perspective to fully understand the crisis. Source C is an authentic letter sent to The Times newspaper in 1849 by 54 desperate residents of a London slum during a deadly disease outbreak.`;
lesson.narrative_blocks[2].level_4 = `Historians also need to hear from the poor people themselves. Source C is a letter sent to a newspaper in 1849 by 54 poor slum workers who were terrified of getting sick and dying.`;
lesson.narrative_blocks[2].tasks[0].question = "Source Comparison: How does Source C provide a different historical perspective to Source B?";
lesson.narrative_blocks[2].tasks[0].model_answer = "Source B provides a top-down, corporate perspective, focusing coldly on 'efficiency' and 'contracts' for building the empire. In stark contrast, Source C provides a bottom-up, working-class perspective. It is highly emotional and desperate ('living like pigs', 'left to die'), revealing the horrific human cost and lack of basic amenities that the 'efficient' contractors in Source B completely ignored.";

// Update the final task to reference the correct sources
lesson.narrative_blocks[4].tasks[0].model_answer = lesson.narrative_blocks[4].tasks[0].model_answer.replace("Chadwick's reports (Source B)", "Chadwick's reports (Source A)");

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully formatted sources as standalone objects in lesson 3!');
