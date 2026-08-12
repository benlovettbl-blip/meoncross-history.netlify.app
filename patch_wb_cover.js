const fs = require('fs');
let code = fs.readFileSync('generate_workbooks.js', 'utf8');

const targetStr = `    let bannerImageSrc = period.image || unitData.cover_image || '';
    if (bannerImageSrc) {
      bannerImageSrc = typeof resolveAssetPath === 'function' ? resolveAssetPath(bannerImageSrc, 2) : \`../..\${bannerImageSrc.startsWith('/') ? bannerImageSrc : '/' + bannerImageSrc}\`;
    }

    html += \`
    
    <div style="width: 100%; height: 160px; margin-top: 0px; border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 4px 10px rgba(0,0,0,0.15); ">
      <!-- Banner image removed per user request -->
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white;">
        <div style="background: rgba(15, 23, 42, 0.85); padding: 20px 40px; border-radius: 12px; text-align: center; border: 1px solid rgba(255,255,255,0.2);">
          <h1 style="margin: 0 !important; font-size: 24pt; color: white; padding: 0;">\${periodTitle}</h1>
          <p style="font-size:14pt; margin: 10px 0 0 0; font-family: 'Outfit', sans-serif; color: #cbd5e1;"><strong>Assessment Question:</strong> \${unitData.enquiry || 'Student Workbook'}</p>
        </div>
      </div>
    </div>
    
    <div style="display: flex; flex-direction: row; justify-content: center; margin: 25px auto 0 auto; width: 80%; gap: 40px;">
      <div style="flex: 2; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt;">Name: </div>
      <div style="flex: 1; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt;">Class: </div>
    </div>
    \`;

    if (unitData.cover_sources) {
      html += \`
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 85%; margin: 25px auto 15px auto;">
        \${unitData.cover_sources.map(src => {
          let imgSrc = typeof resolveAssetPath === 'function' ? resolveAssetPath(src.image, 2) : \`../..\${src.image.startsWith('/') ? src.image : '/' + src.image}\`;
          return \`
          <div style="display: flex; gap: 10px; align-items: center;  padding-top: 10px; padding-bottom: 10px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <img src="\${imgSrc}" style="width: 100px; height: 100px; object-fit: cover; border: 2px solid white; border-radius: 4px; box-shadow: 1px 1px 3px rgba(0,0,0,0.2);" alt="\${src.title}">
            <div style="text-align: left; flex: 1;">
              <strong style="display: block; font-size: 9pt; color: #1a237e; margin-bottom: 3px;">\${src.title}</strong>
              <span style="font-size: 8pt; color: #475569; line-height: 1.2; display: block;">\${src.description}</span>
            </div>
          </div>
          \`;
        }).join('')}
      </div>
      \`;
    } else if (unitData.hero_image) {
      let heroImageSrc = typeof resolveAssetPath === 'function' ? resolveAssetPath(unitData.hero_image, 2) : \`../..\${unitData.hero_image.startsWith('/') ? unitData.hero_image : '/' + unitData.hero_image}\`;
      html += \`
      <div style="margin: 25px auto 10px auto; text-align: center; max-width: 85%;">
        <img src="\${heroImageSrc}" style="width: 100%; max-height: 250px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); ">
        \${unitData.hero_caption ? \`<p style="font-size: 11pt; color: #475569; margin-top: 15px; font-style: italic;">\${unitData.hero_caption}</p>\` : ''}
      </div>
      \`;
    }

    html += \`
    <!-- Tracker Table now on page 1 -->
    <div style="margin-top: 20px;"></div>
    <div style="margin: 30px 5% 0 5%; width: 90%;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #1a237e; color: white;">
            <th style="border: 1px solid #333; padding: 6px; width: 25%;">Progress & Assessment Tracker</th>
            <th style="border: 1px solid #333; padding: 6px; width: 10%; text-align: center;">Do Now</th>
            <th style="border: 1px solid #333; padding: 6px; width: 6%; text-align: center;">RAG</th>
            <th style="border: 1px solid #333; padding: 6px; width: 8%; text-align: center;">Effort</th>
            <th style="border: 1px solid #333; padding: 6px; width: 8%; text-align: center;">Level</th>
            <th style="border: 1px solid #333; padding: 6px; width: 20%;">WWW (What Went Well)</th>
            <th style="border: 1px solid #333; padding: 6px; width: 23%;">EBI (Even Better If)</th>
          </tr>
        </thead>
        <tbody>
          \${trackerRows}
          <tr style=" font-weight: bold;">
            <td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px; text-align: right;">Final Unit Grade:</td>
            <td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px; background:#eee;"></td>
            <td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px; background:#eee;"></td>
            <td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px; background:#eee;"></td>
            <td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px;"></td>
            <td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px;"></td>
            <td style="border: 1px solid #333; padding-top: 8px; padding-bottom: 8px;"></td>
          </tr>
        </tbody>
      </table>
    </div>

    \`;`;

const replacementStr = `    html += \`
    <div class="cover-page" style="page-break-after: always; text-align: center;">
      <h1 style="font-size: 32pt; margin-bottom: 20px; color: #1e3a8a;">\${periodTitle}</h1>
      <h2 style="font-size: 16pt; margin-bottom: 20px; color: #64748b; border: none;">\${unitData.title}</h2>
      
      <div style="margin-top: 30px; text-align: left; padding: 20px; border: 2px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
        <h3 style="margin-top: 0; color: #1e3a8a; text-align: center; margin-bottom: 15px;"><i class="fa-solid fa-list-check"></i> Unit Checklist Tracker</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 11pt;">
          <thead>
            <tr style="background-color: #1e3a8a; color: white;">
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 60%; text-align: left;">Lesson Title</th>
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Do Now</th>
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Tasks</th>
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Review</th>
              <th style="padding: 10px; border: 1px solid #cbd5e1; width: 10%; text-align: center;">Score</th>
            </tr>
          </thead>
          <tbody>
            \${trackerRows}
          </tbody>
        </table>
      </div>
    </div>
    \`;`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('generate_workbooks.js', code);
  console.log('Successfully patched generate_workbooks.js cover logic.');
} else {
  console.log('Failed to find exact block in generate_workbooks.js');
}
