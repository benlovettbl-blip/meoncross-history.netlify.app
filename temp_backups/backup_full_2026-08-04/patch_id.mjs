import fs from 'fs';

function patchFile(filePath, encoding) {
    let content = fs.readFileSync(filePath, encoding);
    
    // Replace Weimar checks
    content = content.replace(/window\.currentUnitId === 'weimar_nazi_germany'/g, "(window.currentUnitId === 'weimar_nazi_germany' || (window.currentUnitData && window.currentUnitData.title && window.currentUnitData.title.includes('Weimar')))");
    
    // Replace edexcel_medicine checks
    content = content.replace(/window\.currentUnitId === 'edexcel_medicine'/g, "(window.currentUnitId === 'edexcel_medicine' || (window.currentUnitData && window.currentUnitData.title && window.currentUnitData.title.includes('Medicine')))");

    fs.writeFileSync(filePath, content, encoding);
    console.log(`Patched ${filePath}`);
}

patchFile('./weimar_nazi_germany/app.js', 'utf16le');
patchFile('./temp_core2.js', 'utf16le');
