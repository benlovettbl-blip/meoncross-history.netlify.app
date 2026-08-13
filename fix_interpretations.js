const fs = require('fs');

let file = 'great_war_part2/data.js';
let content = fs.readFileSync(file, 'utf8');
let dbText = content.replace('export const unitData = ', '').trim();
if (dbText.endsWith(';')) dbText = dbText.slice(0, -1);
let db = eval('(' + dbText + ')');

// 1. Fix Lesson 2 (Index 2)
let lesson2 = db.lessons[2];
lesson2.narrative_blocks.forEach(nb => {
    if (nb.title === "The Historians' Debate: How is the war remembered?") {
        // Fix the wording of the interpretation numbers in the text
        // (It was previously A and B, I replaced it globally, but let's just make sure it's correct)
    }
    if (nb.title === "Source Spotlight: A 'White Man's War'?") {
        nb.tasks.forEach(t => {
            if (t.text && t.text.includes("Study Interpretation 1 (David Olusoga's text")) {
                t.text = t.text.replace(/Interpretation 1/g, "Interpretation 2");
                t.model = t.model.replace(/Interpretation 1/g, "Interpretation 2");
            }
        });
    }
});

// 2. Fix Lesson 3 (Index 3)
let lesson3 = db.lessons[3];
let debateBlock3 = lesson3.narrative_blocks.find(nb => nb.title === "The Historians' Debate: Did the war liberate women?");
let censorBlock3 = lesson3.narrative_blocks.find(nb => nb.title === "Source Spotlight: Censorship and Control");

// Move the 16-mark questions from censorBlock to debateBlock
let interpretationTasks3 = censorBlock3.tasks.filter(t => t.text.includes("Marwick"));
censorBlock3.tasks = censorBlock3.tasks.filter(t => !t.text.includes("Marwick"));
// Also move the structured paragraph task which mentions Marwick
let paragraphTask3 = censorBlock3.tasks.filter(t => t.text.includes("To what extent did the First World War lead to a permanent change"));
censorBlock3.tasks = censorBlock3.tasks.filter(t => !t.text.includes("To what extent did the First World War lead to a permanent change"));

debateBlock3.tasks.push(...interpretationTasks3, ...paragraphTask3);

// Inject the Interpretations into the Debate block text
debateBlock3.text += `<br><br>Read the two contrasting interpretations below to understand how modern historians debate the impact of the war on women.<br><br><blockquote><strong>Interpretation 1: The Optimistic View</strong><br><em>"The First World War was a massive engine of social change. By proving that women could successfully perform heavy industrial labor in the munitions factories, it shattered Victorian myths of female frailty. This undeniable contribution permanently altered the social status of women and was the direct cause of them finally winning the right to vote in 1918."</em><br>— <em>Adapted from Arthur Marwick, The Deluge (1965)</em></blockquote><br><br><blockquote><strong>Interpretation 2: The Revisionist View</strong><br><em>"The idea that the war 'liberated' women is largely a myth. The changes were a temporary illusion driven by national emergency. Women were still paid significantly less than men, and the moment the war ended in 1918, they were unceremoniously fired to make way for returning soldiers. Furthermore, the 1918 voting act completely ignored the young, working-class 'Canary Girls' who had actually risked their lives."</em><br>— <em>Adapted from Gail Braybon, Women Workers in the First World War (1981)</em></blockquote>`;


// 3. Fix Lesson 4 (Index 4)
let lesson4 = db.lessons[4];
let debateBlock4 = lesson4.narrative_blocks.find(nb => nb.title === "The Historians' Debate: A Doomed Peace?");
let reactionBlock4 = lesson4.narrative_blocks.find(nb => nb.title === "Source Spotlight: German Reaction");

// Move the 16-mark questions from reactionBlock to debateBlock
let interpretationTasks4 = reactionBlock4.tasks.filter(t => t.text.includes("Keynes"));
reactionBlock4.tasks = reactionBlock4.tasks.filter(t => !t.text.includes("Keynes"));
let paragraphTask4 = reactionBlock4.tasks.filter(t => t.text.includes("unfair settlement that guaranteed a future war"));
reactionBlock4.tasks = reactionBlock4.tasks.filter(t => !t.text.includes("unfair settlement that guaranteed a future war"));

debateBlock4.tasks.push(...interpretationTasks4, ...paragraphTask4);

// Inject the Interpretations into the Debate block text
debateBlock4.text += `<br><br>Read the two contrasting interpretations below to understand how historians debate the legacy of the Treaty of Versailles.<br><br><blockquote><strong>Interpretation 1: The Traditional View</strong><br><em>"The Treaty of Versailles was a disastrous, vindictive peace. The economic reparations imposed on Germany are completely impossible to pay and will inevitably lead to the total financial collapse of central Europe. By stripping Germany of its wealth and humiliating its people, the Allies have virtually guaranteed a war of vengeance in the near future."</em><br>— <em>Adapted from John Maynard Keynes, The Economic Consequences of the Peace (1919)</em></blockquote><br><br><blockquote><strong>Interpretation 2: The Revisionist View</strong><br><em>"The Treaty of Versailles was actually quite lenient compared to the brutal treaty Germany had forced upon Russia in 1918. Germany remained largely intact and structurally wealthy. The true failure was not that the treaty was too harsh, but that the Allies lacked the political will and unity to actually enforce it in the 1930s, allowing Hitler to easily tear it up."</em><br>— <em>Adapted from Margaret MacMillan, Peacemakers (2001)</em></blockquote>`;

let newContent = 'export const unitData = ' + JSON.stringify(db, null, 4) + ';\n';
fs.writeFileSync(file, newContent);
console.log("Successfully fixed interpretation mismatch bugs in great_war_part2/data.js");
