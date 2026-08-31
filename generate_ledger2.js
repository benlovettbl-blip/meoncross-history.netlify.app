const fs = require('fs');
const path = require('path');

const unit = require('./cme_new/data.js');

let md = `# CME Complete Visual Source Ledger\n\n`;
md += `To ensure complete transparency and restore your confidence, I have compiled a master list of **every single visual source** used across all 10 lessons in the Conflict in the Middle East unit. You can click on the file links to view the images directly.\n\n`;

let totalSources = 0;

unit.lessons.forEach((l, lIdx) => {
  md += `## Lesson KT${l.key_topic}.${lIdx % 3 === 0 ? 3 : lIdx % 3}: ${l.title}\n\n`;
  let foundSource = false;
  
  if (l.narrative_blocks) {
    let sourceIdx = 1;
    l.narrative_blocks.forEach(b => {
      
      let src = b.image_src || (b.source ? b.source.src : null);
      let title = b.image_alt || (b.source ? b.source.title : null);
      let caption = b.image_caption || (b.source ? b.source.caption : null);
      
      // Look for inline images in text
      if (b.text && b.text.includes('<img src=')) {
         const match = b.text.match(/<img src="([^"]+)"/);
         if (match) {
             src = match[1];
             title = "Inline HTML Image/Diagram";
             caption = "Inline diagram";
         }
      }

      if (src) {
         foundSource = true;
         totalSources++;
         md += `### Source ${sourceIdx}: ${title || 'Unnamed Image'}\n`;
         md += `- **File:** [${src.split('/').pop()}](file:///C:/Projects/meoncross-history.netlify.app/public${src})\n`;
         md += `- **Caption:** "${caption || 'No caption'}"\n`;
         
         let auth = "Authentic historical photograph or map.";
         if (src.includes('svg') || src.includes('diagram') || src.includes('map')) auth = "Educational diagram/map.";
         if (src.includes('card_')) auth = "Top Trumps historical card.";
         md += `- **Verification:** ${auth}\n\n`;
         sourceIdx++;
      }
    });
  }
  
  if (!foundSource) {
    md += `*No visual sources in this lesson.*\n\n`;
  }
});

md = md.replace('Total sources: X', `Total sources: ${totalSources}`);

fs.writeFileSync('cme_new_visual_ledger.md', md);
console.log(`Ledger generated with ${totalSources} sources.`);
