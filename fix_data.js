const fs = require('fs'); 
let data = fs.readFileSync('public/units/australia/data.js', 'utf8'); 

data = data.replace(
  /"question": "Sentence Starters",\s*"model":/g, 
  '"type": "extended_writing", "question": "Write your narrative account here:", "instructions":'
); 

data = data.replace(
  /"How useful are Sources A and B for an enquiry into the impact of British colonization on Aboriginal Australians\?<\/strong><\/p>"/g, 
  '"How useful are Sources A and B for an enquiry into the impact of British colonization on Aboriginal Australians?</strong></p>",\n          "tasks": [{ "type": "extended_writing", "question": "How useful are Sources A and B for an enquiry into the impact of British colonization on Aboriginal Australians? (8 marks)" }]'
); 

fs.writeFileSync('public/units/australia/data.js', data); 
console.log('Done');
