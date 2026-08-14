const fs = require('fs');

async function upgradeUnit() {
  const filePath = './early_modern_world/data.js';
  const m = await import('file:///' + process.cwd().replace(/\\/g, '/') + '/early_modern_world/data.js');
  let data = m.unitData;

  let genericModelCount = 0;
  let ideaCount = 0;
  let typeFixCount = 0;

  if (data.lessons) {
    data.lessons.forEach(l => {
      // Upgrade do_now timelines to domino instructions if necessary
      if (l.do_now && l.do_now.type === 'timeline') {
        if (!l.do_now.instructions) {
          l.do_now.instructions = "Domino Flowchart: Draw arrows connecting the events in the correct chronological and causal order.";
        }
      }

      if (l.narrative_blocks) {
        l.narrative_blocks.forEach(nb => {
          if (nb.tasks) {
            nb.tasks.forEach(t => {
              // 1. Standardise Keys
              if (t.text && !t.question) {
                t.question = t.text;
                delete t.text;
              }
              if (t.model && !t.model_answer) {
                t.model_answer = t.model;
                delete t.model;
              }

              // 2. Standardise Task Typology
              if (t.type === 'extended' || t.type === 'writing') {
                t.type = 'extended_writing';
                typeFixCount++;
              }
              if (t.type === 'analysis' && t.question && t.question.toLowerCase().includes('source')) {
                t.type = 'source_analysis';
                typeFixCount++;
              }
              if (t.type === 'table_planner' || t.type === 'spectrum_mapper') {
                // keep these as they are custom UI elements
              } else if (t.type === 'think_pair_share') {
                // keep think_pair_share
              }

              // 3. Inject I.D.E.A Framework
              if (t.type === 'extended_writing' && t.question && !t.question.includes('IDEA framework')) {
                t.question += " Use the <abbr title=\"I - Identify (make your point)\\nD - Describe (give historical evidence/detail)\\nE - Explain (how the evidence supports the point)\\nA - Analyse (link back to the question and evaluate significance)\" style=\"text-decoration: underline dotted; cursor: help;\">IDEA framework</abbr> to structure your response.";
                ideaCount++;
              }

              // 4. Upgrade Generic Models for Extended Writing
              if (t.type === 'extended_writing' && t.model_answer && t.model_answer.includes('strong answer should')) {
                // We'll replace this specific known generic answer with a proper model
                if (t.model_answer.includes('Divine Right of Kings was destroyed')) {
                  t.model_answer = "The English Civil War was not a true revolution for the ordinary people, but rather a transfer of power to the wealthy elites. While it is true that the execution of King Charles I destroyed the 'Divine Right of Kings', the new system did not empower the working classes. Radical democratic groups like the Diggers and Levellers were violently crushed by Oliver Cromwell's New Model Army. Ultimately, true political power merely shifted from the absolute monarchy to wealthy merchants and Parliamentarian landowners, leaving the agrarian and industrial working classes just as disenfranchised as before.";
                  genericModelCount++;
                }
              }
              
              if (t.type === 'extended_writing' && t.model_answer && t.model_answer.includes('student should write')) {
                 t.model_answer = "Historically, Britain's transformation was deeply uneven. For the wealthy elite, it was an era of unprecedented progress, with the Royal Navy enforcing global trade routes and the Industrial Revolution generating massive profits. However, for the working classes and colonized people, this wealth was built entirely on their exploitation. In industrial towns, life expectancy plummeted due to overcrowding and disease, while globally, millions suffered under the brutal reality of the transatlantic slave trade and imperial extraction.";
                 genericModelCount++;
              }
            });
          }
          
          // 5. Add Hinge Questions to visual sources if missing
          if (nb.source && nb.source.type === 'visual' && !nb.source.hinge_question) {
            nb.source.hinge_question = "What does this visual source suggest about the power dynamics of the period?";
          }
        });
      }
    });
  }

  // Write back to file
  const output = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(filePath, output);

  console.log(`Upgrades applied successfully!`);
  console.log(`- Task Types Fixed: ${typeFixCount}`);
  console.log(`- IDEA Frameworks Injected: ${ideaCount}`);
  console.log(`- Generic Models Upgraded: ${genericModelCount}`);
}

upgradeUnit().catch(console.error);
