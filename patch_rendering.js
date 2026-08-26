const fs = require('fs');

const files = ['generate_textbooks.js', 'generate_workbooks.js', 'generate_pupil_workbooks.js'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix do_now prediction_question in textbook and workbook
    if (file === 'generate_textbooks.js' || file === 'generate_workbooks.js') {
        let replaceTarget = `          html \\+= \\\`</div></div>\\\`;\\s*}\\s*else if \\(lesson\\.do_now\\.type === "text"\\)`;
        let regexTarget = new RegExp(replaceTarget);
        let replaceWith = `          html += \`</div></div>\`;
        if (lesson.do_now.prediction_question) {
            html += \`<div class="do-now-q" style="margin-top: 5px; font-size: 9.5pt;"><strong>\${lesson.do_now.qNum ? "Q" + lesson.do_now.qNum + ". " : "1. "}\${lesson.do_now.prediction_question}</strong></div>\`;
        }
      } else if (lesson.do_now.type === "text")`;
        content = content.replace(regexTarget, replaceWith);
    }
    
    // Fix Flowchart CSS in all files
    content = content.replace(
        /width:\s*45%;\s*padding:\s*5px;\s*box-sizing:\s*border-box;\s*\$\{m\}\s*box-shadow:\s*2px\s*2px\s*0px\s*#aaa;/g,
        'width: 45%; border: 1px solid #334155; border-radius: 4px; padding: 5px; box-sizing: border-box; ${m} box-shadow: 2px 2px 0px #aaa;'
    );
    if (file === 'generate_pupil_workbooks.js') {
        content = content.replace(
            /\\\$\\{lesson\\.do_now\\.qNum \\? "Q" \\+ lesson\\.do_now\\.qNum \\+ "\\\\. " : "1\\\\. "\\}/g,
            'Q${lesson.do_now.qNum || globalQNum++}. '
        );
    }
    
    let extractBlock = (str, startStr) => {
        let startIdx = str.indexOf(startStr);
        if (startIdx === -1) return null;
        
        let braceCount = 0;
        let started = false;
        let i = startIdx;
        while (i < str.length) {
            if (str[i] === '{') {
                braceCount++;
                started = true;
            } else if (str[i] === '}') {
                braceCount--;
                if (started && braceCount === 0) {
                    return { start: startIdx, end: i + 1, text: str.substring(startIdx, i + 1) };
                }
            }
            i++;
        }
        return null;
    };

    let startSearch = content.indexOf('// Narrative');
    if (startSearch === -1) startSearch = content.indexOf('// Narrative Blocks');
    
    let narrative = extractBlock(content, 'if (lesson.narrative)');
    let startOfBlocks;
    if (narrative) {
        startOfBlocks = narrative.end;
    } else {
        startOfBlocks = startSearch;
    }

    let endOfBlocks = content.indexOf('allVideos = [', startOfBlocks);
    if (endOfBlocks === -1) endOfBlocks = content.indexOf('let allVideos', startOfBlocks);
    if (endOfBlocks === -1) endOfBlocks = content.indexOf('// Generate PDF', startOfBlocks);
    if (endOfBlocks === -1) endOfBlocks = content.length;
    
    let blockArea = content.substring(startOfBlocks, endOfBlocks);
    
    // Extract blocks safely
    let bPS = extractBlock(blockArea, 'if (lesson.pair_share)');
    let bTasks = extractBlock(blockArea, 'if (lesson.tasks)');
    let bExt = extractBlock(blockArea, 'if (lesson.extended && lesson.extended.paragraphs)');
    let bSrcs = extractBlock(blockArea, 'if (lesson.sources)');
    let bHC = extractBlock(blockArea, 'if (lesson.historians_corner)');
    
    let gcseStart = blockArea.indexOf('let hasExamTask =');
    if (gcseStart === -1) gcseStart = blockArea.indexOf('if (lesson.gcse_task)');
    
    let bGCSE = null;
    if (gcseStart !== -1) {
        let blockStr = blockArea.substring(gcseStart);
        let ifStmtStart = blockStr.indexOf('if (hasExamTask');
        if (ifStmtStart === -1) ifStmtStart = blockStr.indexOf('if (lesson.gcse_task)');
        
        let blockObj = extractBlock(blockStr, ifStmtStart !== -1 ? blockStr.substring(ifStmtStart, ifStmtStart + 20) : '');
        if (blockObj) {
            bGCSE = { text: blockArea.substring(gcseStart, gcseStart + blockObj.end) };
        }
    }
    
    let bMap = extractBlock(blockArea, 'if (lesson.full_page_map)');
    
    let orderedBlocks = [];
    if (bPS) orderedBlocks.push(`\n    // Pair Share\n    ${bPS.text}\n`);
    if (bTasks) orderedBlocks.push(`\n    // Active Tasks\n    ${bTasks.text}\n`);
    if (bExt) orderedBlocks.push(`\n    // Extended Scholarship\n    ${bExt.text}\n`);
    if (bSrcs) orderedBlocks.push(`\n    // Source Collection\n    ${bSrcs.text}\n`);
    if (bHC) orderedBlocks.push(`\n    // Historian's Corner\n    ${bHC.text}\n`);
    if (bGCSE) orderedBlocks.push(`\n    // GCSE Task\n    ${bGCSE.text}\n`);
    if (bMap) orderedBlocks.push(`\n    // Full Page Map\n    ${bMap.text}\n`);
    
    let remainingArea = blockArea;
    if (bPS) remainingArea = remainingArea.replace(bPS.text, '');
    if (bTasks) remainingArea = remainingArea.replace(bTasks.text, '');
    if (bExt) remainingArea = remainingArea.replace(bExt.text, '');
    if (bSrcs) remainingArea = remainingArea.replace(bSrcs.text, '');
    if (bHC) remainingArea = remainingArea.replace(bHC.text, '');
    if (bGCSE) remainingArea = remainingArea.replace(bGCSE.text, '');
    if (bMap) remainingArea = remainingArea.replace(bMap.text, '');
    
    remainingArea = remainingArea.replace(/\/\/\s*Pair Share/g, '');
    remainingArea = remainingArea.replace(/\/\/\s*Active Tasks/g, '');
    remainingArea = remainingArea.replace(/\/\/\s*Extended Scholarship/g, '');
    remainingArea = remainingArea.replace(/\/\/\s*Source Collection/g, '');
    remainingArea = remainingArea.replace(/\/\/\s*Historian's Corner/g, '');
    remainingArea = remainingArea.replace(/\/\/\s*GCSE Task/g, '');
    remainingArea = remainingArea.replace(/\/\/\s*Full Page Map/g, '');
    remainingArea = remainingArea.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    let newBlockArea = remainingArea + orderedBlocks.join('');
    
    content = content.substring(0, startOfBlocks) + newBlockArea + content.substring(endOfBlocks);
    
    fs.writeFileSync(file, content);
    console.log("Patched rendering in", file);
});
