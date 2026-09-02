const fs = require('fs');

function updateMedieval() {
  const file = 'public/units/medieval_england/data.js';
  let content = fs.readFileSync(file, 'utf8');

  // Strip the export const unitData =
  const exportStr = "export const unitData = ";
  if (content.startsWith(exportStr)) {
    let jsonStr = content.substring(exportStr.length);
    // remove the trailing semicolon
    if (jsonStr.endsWith(';\n')) jsonStr = jsonStr.substring(0, jsonStr.length - 2);
    else if (jsonStr.endsWith(';')) jsonStr = jsonStr.substring(0, jsonStr.length - 1);

    try {
      // It's a JS object with no unquoted keys hopefully, but it might not be strict JSON. 
      // Actually, since I can eval it, let's just eval.
      // But we lose the exact string formatting if we JSON.stringify it back.
      // Wait, there might be functions or regex? In data.js it's all JSON-like.
      // If we JSON.stringify it back, it will be standard double-quoted JSON, which is fine!
      // But we will lose line breaks in strings if any were written with backticks? No, we don't have backticks.
      // Let's check if there's any JS-specific syntax.
    } catch(e) {}
  }

  // Instead of parsing the whole file, let's just remove the 3 blocks using string operations.
  // We want to remove objects from `narrative_blocks` that have title "Block 1: Historical Interpretations", "Interpretation A...", "Interpretation B...".
  
  const blocksToRemove = [
    `"title": "Block 1: Historical Interpretations",`,
    `"title": "Interpretation A: Absolute Norman Power",`,
    `"title": "Interpretation B: A Fragile Crown",`
  ];

  blocksToRemove.forEach(title => {
    const idx = content.indexOf(title);
    if (idx !== -1) {
      let startIdx = idx;
      while (content[startIdx] !== '{') startIdx--;
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
        let beforeStart = startIdx - 1;
        while (content[beforeStart] === ' ' || content[beforeStart] === '\n' || content[beforeStart] === '\r') beforeStart--;
        if (content[beforeStart] === ',') {
          startIdx = beforeStart;
        } else {
           // Maybe it's the first element, so check if there's a trailing comma
           let afterEnd = endIdx + 1;
           while (content[afterEnd] === ' ' || content[afterEnd] === '\n' || content[afterEnd] === '\r') afterEnd++;
           if (content[afterEnd] === ',') endIdx = afterEnd;
        }
        content = content.substring(0, startIdx) + content.substring(endIdx + 1);
      }
    }
  });

  // Rename Block 2 to Block 1, Block 3 to Block 2
  content = content.replace(`"title": "Block 2: Planning Your Essay",`, `"title": "Block 1: Planning Your Essay",`);
  content = content.replace(`"title": "Block 3: Final Assessment",`, `"title": "Block 2: Final Assessment",`);

  // Remove the teacher objective 2
  const obj2Search = `"objective": "To evaluate differing historical interpretations of medieval royal power.",`;
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
     } else {
        let afterObj = objEnd + 1;
        while(content[afterObj] === ' ' || content[afterObj] === '\n' || content[afterObj] === '\r') afterObj++;
        if (content[afterObj] === ',') objEnd = afterObj;
     }
     content = content.substring(0, objStart) + content.substring(objEnd + 1);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated medieval_england');
}

updateMedieval();
