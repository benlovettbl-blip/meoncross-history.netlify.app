const fs = require('fs');
let content = fs.readFileSync('early_modern_world/data.js', 'utf8');

content = content.replace('Study Source D (The Armada Portrait', 'Study Source F (The Armada Portrait');
content = content.replace('Based on Source B, how does the reality of the Thirteen', 'Based on Source F, how does the reality of the Thirteen');
content = content.replace('Look at Source B. What did the design of the 1651', 'Look at Source E. What did the design of the 1651');
content = content.replace('Study Source D (The Great Seal', 'Study Source E (The Great Seal');
content = content.replace('Study Source A. Why do you think absentee landlords', 'Study Source C. Why do you think absentee landlords');
content = content.replace('Based on the geography in Source B, why did the Stono', 'Based on the geography in Source D, why did the Stono');
content = content.replace('Compare Source C with the story of Queen Nanny', 'Compare Source F with the story of Queen Nanny');
content = content.replace('Study Source A (Portrait of a British politician', 'Study Source F (Portrait of a British politician');
content = content.replace("Study Source D. Why might enslaved people's deep botanical", "Study Source E. Why might enslaved people's deep botanical");
content = content.replace('How does the density and infrastructure of London shown in Source C (1746)', 'How does the density and infrastructure of London shown in Source E (1746)');

fs.writeFileSync('early_modern_world/data.js', content);
