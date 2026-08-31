const fs = require('fs');
let code = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// 1. Remove Effort Scale
const effortScaleTarget = `          <tr>
            <td style="border: 1px solid #333; padding: 4px 6px; font-weight: bold; background-color: #f1f5f9; width: 15%;">Effort</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">1 = Excellent</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">2 = Good</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">3 = Inconsistent</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">4 = Poor</td>
          </tr>`;
code = code.replace(effortScaleTarget, '');

// 2. Inject interactive cover page
const heroTarget1 = `let heroImgSrc = unitData.cover_image ? (typeof resolveAssetPath === "function" ? resolveAssetPath(unitData.cover_image, 2) : \`../..\${unitData.cover_image.startsWith("/") ? unitData.cover_image : "/" + unitData.cover_image}\`) : '';`;
const heroTarget2 = `let heroHtml = heroImgSrc ? \`<img src="\${heroImgSrc}" style="max-height: 45vh; max-width: 100%; object-fit: contain; margin: 0 auto; display: block;">\` : '';`;

const heroReplacement = `let heroImgSrc = '';
    let heroHtml = \`<div style="border: 2px dashed #cbd5e1; min-height: 400px; display: flex; justify-content: center; align-items: center; margin: 20px auto; width: 80%; border-radius: 8px;">
        <p style="font-style: italic; font-family: 'Outfit', sans-serif; color: #64748b; text-align: center; max-width: 80%; line-height: 1.5; font-size: 13pt;">As you progress through this unit, use this space to draw images and pictures of the historical events, people, and technology you learn about.</p>
    </div>\`;`;

code = code.replace(heroTarget1 + '\n    ' + heroTarget2, heroReplacement);

fs.writeFileSync('generate_pupil_workbooks.js', code);
console.log('Script patched successfully');
