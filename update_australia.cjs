const fs = require('fs');

function updateAustralia() {
  const file = 'public/units/australia/data.js';
  let content = fs.readFileSync(file, 'utf8');

  // Find the block
  const searchStr = `"theme_heading": "Assessment 2: 'How Useful' Source Analysis",`;
  const headingIdx = content.indexOf(searchStr);
  
  if (headingIdx !== -1) {
    // find the start {
    let startIdx = headingIdx;
    while (content[startIdx] !== '{') startIdx--;
    
    // find the matching }
    let brackets = 0;
    let endIdx = -1;
    for (let i = startIdx; i < content.length; i++) {
      if (content[i] === '{') brackets++;
      if (content[i] === '}') {
        brackets--;
        if (brackets === 0) {
          endIdx = i;
          break;
        }
      }
    }
    
    if (endIdx !== -1) {
      // Look backwards from startIdx to find the comma before it
      let beforeStart = startIdx - 1;
      while (content[beforeStart] === ' ' || content[beforeStart] === '\n' || content[beforeStart] === '\r') beforeStart--;
      if (content[beforeStart] === ',') {
         startIdx = beforeStart; // remove the comma too
      }
      content = content.substring(0, startIdx) + content.substring(endIdx + 1);
      
      // We also need to update the teacher notes to remove Objective 2.
      const obj2Search = `"objective": "Evaluate the usefulness of primary sources for historical enquiries.",`;
      const obj2Idx = content.indexOf(obj2Search);
      if (obj2Idx !== -1) {
         let objStart = obj2Idx;
         while (content[objStart] !== '{') objStart--;
         let objEnd = -1;
         let obBrackets = 0;
         for(let i=objStart; i<content.length; i++) {
            if(content[i]==='{') obBrackets++;
            if(content[i]==='}') {
               obBrackets--;
               if(obBrackets===0) { objEnd = i; break; }
            }
         }
         let beforeObj = objStart - 1;
         while (content[beforeObj] === ' ' || content[beforeObj] === '\n' || content[beforeObj] === '\r') beforeObj--;
         if (content[beforeObj] === ',') {
            objStart = beforeObj;
         }
         content = content.substring(0, objStart) + content.substring(objEnd + 1);
      }
      
      // Update theme_heading for Assessment 1
      content = content.replace(`"theme_heading": "Assessment 1: Write a Narrative Account",`, `"theme_heading": "Assessment: Write a Narrative Account",`);
      
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated australia');
    }
  }
}

updateAustralia();
