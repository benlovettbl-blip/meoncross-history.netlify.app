const fs = require('fs');
let code = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

const heroTarget = `let heroImgSrc = '';
    let heroHtml = \`<div style="border: 2px dashed #cbd5e1; min-height: 400px; display: flex; justify-content: center; align-items: center; margin: 20px auto; width: 80%; border-radius: 8px;">
        <p style="font-style: italic; font-family: 'Outfit', sans-serif; color: #64748b; text-align: center; max-width: 80%; line-height: 1.5; font-size: 13pt;">As you progress through this unit, use this space to draw images and pictures of the historical events, people, and technology you learn about.</p>
    </div>\`;`;

const heroReplacement = `let heroImgSrc = unitData.cover_image ? (typeof resolveAssetPath === "function" ? resolveAssetPath(unitData.cover_image, 2) : \`../..\${unitData.cover_image.startsWith("/") ? unitData.cover_image : "/" + unitData.cover_image}\`) : '';
    let heroHtml = heroImgSrc ? \`<img src="\${heroImgSrc}" style="max-height: 45vh; max-width: 100%; object-fit: contain; margin: 0 auto; display: block;">\` : '';`;

code = code.replace(heroTarget, heroReplacement);

fs.writeFileSync('generate_pupil_workbooks.js', code);
console.log('Script patched successfully to restore cover images');
