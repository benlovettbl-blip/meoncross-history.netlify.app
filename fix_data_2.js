const fs = require('fs'); 
let data = fs.readFileSync('public/units/australia/data.js', 'utf8'); 

data = data.replace(
  `"tasks": [
            {
              "question": "Sentence Starters",
              "model": "Use these sentence starters to build your narrative in chronological order:\\n\\n1. The development of Australia began in 1788 when...\\n2. This was a very difficult period because...\\n3. However, the situation changed dramatically when John Macarthur...\\n4. This led to New South Wales becoming a profitable colony because...\\n5. Finally, the development of Australia accelerated in the 1850s due to..."
            }
          ]`,
  `"tasks": [
            {
              "type": "extended_writing",
              "question": "Write your narrative account here:",
              "instructions": "Use these sentence starters to build your narrative in chronological order:\\n\\n1. The development of Australia began in 1788 when...\\n2. This was a very difficult period because...\\n3. However, the situation changed dramatically when John Macarthur...\\n4. This led to New South Wales becoming a profitable colony because...\\n5. Finally, the development of Australia accelerated in the 1850s due to..."
            }
          ]`
); 

data = data.replace(
  `How useful are Sources A and B for an enquiry into the impact of British colonization on Aboriginal Australians?</strong></p>\\n\\n<div style='display:flex; gap: 20px; flex-wrap: wrap;'>`,
  `How useful are Sources A and B for an enquiry into the impact of British colonization on Aboriginal Australians?</strong></p>\\n\\n<div style='display:flex; gap: 20px; flex-wrap: wrap;'>`
); // Let's try replacing by searching for the end of the text string.

fs.writeFileSync('public/units/australia/data.js', data); 
