const fs = require('fs');
const file = 'early_modern_world/data.js';
let data = fs.readFileSync(file, 'utf8');

const oldHtml = `<div style="display: flex; flex-direction: column; align-items: center; background: #e0f2fe; padding: 30px; border-radius: 8px; border: 1px solid #7dd3fc; margin: 20px 0; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">    <h3 style="margin-top: 0; color: #0f172a; text-align: center; width: 100%;">The Triangular Trade Cycle</h3>    <div style="width: 90%; background: #0284c7; color: white; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 10px;">        1. OUTWARD PASSAGE (Europe to West Africa)<br>        <span style="font-size: 0.9em; font-weight: normal;">Manufactured goods (Guns, Alcohol, Textiles) traded for captured humans.</span>    </div>    <div style="font-size: 2rem; color: #0284c7; margin: 5px 0;">↓</div>    <div style="width: 90%; background: #d97706; color: white; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">        2. THE MIDDLE PASSAGE (West Africa to The Americas)<br>        <span style="font-size: 0.9em; font-weight: normal;">Enslaved Africans transported in horrific conditions to provide forced plantation labor.</span>    </div>    <div style="font-size: 2rem; color: #d97706; margin: 5px 0;">↓</div>    <div style="width: 90%; background: #16a34a; color: white; padding: 15px; border-radius: 8px; text-align: center; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">        3. RETURN PASSAGE (The Americas to Europe)<br>        <span style="font-size: 0.9em; font-weight: normal;">Raw materials (Sugar, Tobacco, Cotton) shipped back to fuel European wealth.</span>    </div>    <div style="margin-top: 15px; width: 90%; text-align: center; color: #16a34a; font-weight: bold; font-size: 1.1rem; border-top: 2px dashed #16a34a; padding-top: 10px;">        ⟲ The cycle repeats, endlessly accumulating European capital.    </div></div>`;

const newHtml = `<div style="background: #0f172a; padding: 25px; border-radius: 8px; border: 1px solid #334155; margin: 20px 0; font-family: sans-serif; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
    <h3 style="margin-top: 0; color: #38bdf8; text-align: center; width: 100%; margin-bottom: 20px;">Interactive Trade Map</h3>
    
    <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px;">
        <button onclick="document.getElementById('map-eur').style.display='block'; document.getElementById('map-afr').style.display='none'; document.getElementById('map-ame').style.display='none'; this.style.opacity='1'; this.nextElementSibling.style.opacity='0.6'; this.nextElementSibling.nextElementSibling.style.opacity='0.6';" style="flex: 1 1 150px; padding: 12px; background: #0284c7; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 1rem; opacity: 1; transition: 0.3s;">Europe</button>
        
        <button onclick="document.getElementById('map-eur').style.display='none'; document.getElementById('map-afr').style.display='block'; document.getElementById('map-ame').style.display='none'; this.previousElementSibling.style.opacity='0.6'; this.style.opacity='1'; this.nextElementSibling.style.opacity='0.6';" style="flex: 1 1 150px; padding: 12px; background: #d97706; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 1rem; opacity: 0.6; transition: 0.3s;">West Africa</button>
        
        <button onclick="document.getElementById('map-eur').style.display='none'; document.getElementById('map-afr').style.display='none'; document.getElementById('map-ame').style.display='block'; this.previousElementSibling.style.opacity='0.6'; this.previousElementSibling.previousElementSibling.style.opacity='0.6'; this.style.opacity='1';" style="flex: 1 1 150px; padding: 12px; background: #16a34a; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 1rem; opacity: 0.6; transition: 0.3s;">The Americas</button>
    </div>

    <div id="map-eur" style="background: #1e293b; color: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #0284c7;">
        <h4 style="margin-top: 0; color: #38bdf8;">Exports from Europe (Bristol, Liverpool, London)</h4>
        <ul style="line-height: 1.6; margin-bottom: 0;">
            <li><strong>Manufactured Firearms:</strong> Cheap muskets and gunpowder used to fuel regional African wars.</li>
            <li><strong>Textiles and Cloth:</strong> Mass-produced British cotton and wool items.</li>
            <li><strong>Alcohol:</strong> Spirits such as rum and brandy used as trade currency.</li>
            <li><strong>Metal Goods:</strong> Iron bars, brass pans, and manillas (copper bracelets).</li>
        </ul>
    </div>

    <div id="map-afr" style="display: none; background: #1e293b; color: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #d97706;">
        <h4 style="margin-top: 0; color: #fbbf24;">Exports from West Africa</h4>
        <ul style="line-height: 1.6; margin-bottom: 0;">
            <li><strong>Enslaved Human Beings:</strong> Men, women, and children captured in warfare or raids.</li>
            <li><strong>Gold Dust:</strong> Extracted from the Gold Coast and heavily sought after by European merchants.</li>
            <li><strong>Ivory:</strong> Elephant tusks traded as a luxury good.</li>
            <li><strong>Spices:</strong> Exotic items like malagueta pepper (Guinea pepper).</li>
        </ul>
    </div>

    <div id="map-ame" style="display: none; background: #1e293b; color: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #16a34a;">
        <h4 style="margin-top: 0; color: #4ade80;">Exports from The Americas</h4>
        <ul style="line-height: 1.6; margin-bottom: 0;">
            <li><strong>Raw Sugar & Molasses:</strong> The most lucrative cash crop, grown in the brutal Caribbean plantations.</li>
            <li><strong>Tobacco:</strong> Grown extensively in the colonies of Virginia and Maryland.</li>
            <li><strong>Raw Cotton:</strong> Crucial raw material shipped to British textile mills during the Industrial Revolution.</li>
            <li><strong>Coffee and Cocoa:</strong> Luxury consumables destined for European coffeehouses.</li>
        </ul>
    </div>
</div>`.replace(/\n/g, "\\n").replace(/"/g, '\\"');

// 1. Replace the old HTML block
const regexOld = /<div style=\\"display: flex; flex-direction: column; align-items: center; background: #e0f2fe;[^]+?The cycle repeats, endlessly accumulating European capital.\s*<\/div><\/div>/g;
data = data.replace(regexOld, newHtml);

// 2. Add the vocab
const oldVocabStr = `"term": "Overt Resistance",
            "definition": "Open, visible acts of defiance against slavery, such as armed rebellions and running away."
          }
        ]`;

const newVocabStr = `"term": "Overt Resistance",
            "definition": "Open, visible acts of defiance against slavery, such as armed rebellions and running away."
          },
          {
            "term": "Capital Accumulation",
            "definition": "The continuous growth of wealth, often achieved in this period by European countries exploiting enslaved labor and raw materials from the Americas."
          }
        ]`;

data = data.replace(oldVocabStr, newVocabStr);

fs.writeFileSync(file, data);
console.log("Successfully implemented Interactive Trade Map and Vocabulary update.");
