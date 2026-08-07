const fs = require('fs');

const file = 'early_modern_world/data.js';
let data = fs.readFileSync(file, 'utf8');

const oldHtml = `<div style="display: flex; flex-direction: column; align-items: center; gap: 15px; background: #e0f2fe; padding: 25px; border-radius: 8px; border: 1px solid #7dd3fc; margin: 20px 0; font-family: sans-serif;">    <div style="background: #0284c7; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 60%; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">        EUROPE (e.g. Bristol, Liverpool, London)<br><span style="font-size: 0.85em; font-weight: normal;">Exports Manufactured Goods (Guns, Alcohol, Textiles)</span>    </div>    <div style="font-size: 1.5rem; color: #0284c7;">↓</div>    <div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">        <div style="background: #d97706; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 42%; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">            WEST AFRICA<br><span style="font-size: 0.85em; font-weight: normal;">Forced capture, shattered communities</span>        </div>        <div style="text-align: center; color: #475569; font-weight: bold; font-size: 0.9em;">THE MIDDLE PASSAGE<br>→<br>Enslaved Africans</div>        <div style="background: #16a34a; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 42%; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">            THE AMERICAS<br><span style="font-size: 0.85em; font-weight: normal;">Plantation labor (Sugar, Tobacco, Cotton)</span>        </div>    </div>    <div style="font-size: 1.5rem; color: #16a34a;">↑</div>    <div style="background: #475569; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 60%; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">        RAW MATERIALS TO EUROPE<br><span style="font-size: 0.85em; font-weight: normal;">European Capital Accumulation</span>    </div></div>`;

const newHtml = `<div style="display: flex; flex-direction: column; align-items: center; background: #e0f2fe; padding: 30px; border-radius: 8px; border: 1px solid #7dd3fc; margin: 20px 0; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">    <h3 style="margin-top: 0; color: #0f172a; text-align: center; width: 100%;">The Triangular Trade Cycle</h3>    <div style="width: 90%; background: #0284c7; color: white; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 10px;">        1. OUTWARD PASSAGE (Europe to West Africa)<br>        <span style="font-size: 0.9em; font-weight: normal;">Manufactured goods (Guns, Alcohol, Textiles) traded for captured humans.</span>    </div>    <div style="font-size: 2rem; color: #0284c7; margin: 5px 0;">↓</div>    <div style="width: 90%; background: #d97706; color: white; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">        2. THE MIDDLE PASSAGE (West Africa to The Americas)<br>        <span style="font-size: 0.9em; font-weight: normal;">Enslaved Africans transported in horrific conditions to provide forced plantation labor.</span>    </div>    <div style="font-size: 2rem; color: #d97706; margin: 5px 0;">↓</div>    <div style="width: 90%; background: #16a34a; color: white; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">        3. RETURN PASSAGE (The Americas to Europe)<br>        <span style="font-size: 0.9em; font-weight: normal;">Raw materials (Sugar, Tobacco, Cotton) shipped back to fuel European wealth.</span>    </div>    <div style="margin-top: 15px; width: 90%; text-align: center; color: #16a34a; font-weight: bold; font-size: 1.1rem; border-top: 2px dashed #16a34a; padding-top: 10px;">        ⟲ The cycle repeats, endlessly accumulating European capital.    </div></div>`;

// Use strict replacement
if (data.includes(oldHtml)) {
    data = data.replace(oldHtml, newHtml);
    fs.writeFileSync(file, data);
    console.log("Successfully replaced confusing diagram.");
} else {
    // If exact match fails due to escaping, use regex fallback
    console.log("Exact match failed, trying regex...");
    const regexOld = /<div style=\\"display: flex; flex-direction: column; align-items: center; gap: 15px; background: #e0f2fe;[^]+?RAW MATERIALS TO EUROPE<br><span style=\\"font-size: 0\.85em; font-weight: normal;\\">European Capital Accumulation<\/span>\s*<\/div><\/div>/g;
    
    // Have to escape quotes for JSON
    const escapedNewHtml = newHtml.replace(/"/g, '\\"');
    
    data = data.replace(regexOld, escapedNewHtml);
    fs.writeFileSync(file, data);
    console.log("Replaced via regex.");
}
