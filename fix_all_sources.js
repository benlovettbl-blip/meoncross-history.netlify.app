const fs = require('fs');

const units = ['great_war', 'great_war_part2'];

units.forEach(unitId => {
  const targetFile = `public/units/${unitId}/data.js`;

  if (fs.existsSync(targetFile)) {
    let unitDataStr = fs.readFileSync(targetFile, 'utf8');
    let jsonStr = unitDataStr.replace(/export const unitData = /, '');
    const json = eval('(function(){ const mock_exams=[]; return ' + jsonStr + '})()');

    json.lessons.forEach(l => {
      // 1. Process primary_source
      if (l.primary_source) {
        if (l.primary_source.title && !l.primary_source.title.startsWith('Source A:')) {
          l.primary_source.title = l.primary_source.title.replace(/^Source:/i, '').trim();
          l.primary_source.title = 'Source A: ' + l.primary_source.title;
        }
        
        if (l.primary_source.question) {
          let qText = l.primary_source.question.replace(/^Enquiry:\s*/, '');
          l.primary_source.question = '';
          
          if (!l.narrative_blocks) l.narrative_blocks = [];
          if (l.narrative_blocks.length === 0) l.narrative_blocks.push({ content: "", tasks: [] });
          if (!l.narrative_blocks[0].tasks) l.narrative_blocks[0].tasks = [];
          
          l.narrative_blocks[0].tasks.unshift({
            type: 'think_pair_share',
            text: qText
          });
        }
      } 
      // 2. Process visual_sources
      else if (l.visual_sources && l.visual_sources.length > 0) {
        let vs = l.visual_sources[0];
        if (!vs.title) vs.title = '';
        if (!vs.title.startsWith('Source A:')) {
          vs.title = vs.title.replace(/^Source:/i, '').trim();
          vs.title = 'Source A: ' + vs.title;
        }
        
        if (vs.question) {
          let qText = vs.question.replace(/^Enquiry:\s*/, '');
          vs.question = '';
          
          if (!l.narrative_blocks) l.narrative_blocks = [];
          if (l.narrative_blocks.length === 0) l.narrative_blocks.push({ content: "", tasks: [] });
          if (!l.narrative_blocks[0].tasks) l.narrative_blocks[0].tasks = [];
          
          l.narrative_blocks[0].tasks.unshift({
            type: 'think_pair_share',
            text: qText
          });
        }
      }
    });

    fs.writeFileSync(targetFile, 'export const unitData = ' + JSON.stringify(json, null, 2) + ';\n');
    console.log(`Updated ${unitId} data.js with Source A and Think-Pair-Share logic`);
  }
});
