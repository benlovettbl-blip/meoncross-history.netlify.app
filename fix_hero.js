const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

const regex = /<div style="position: relative; width: calc\(100% \+ 8rem\); margin-left: -4rem; margin-top: -2rem; padding: 4rem 4rem 3rem 4rem; min-height: 550px; display: flex; flex-direction: column; justify-content: flex-start; text-align: center; background: linear-gradient\(to bottom, rgba\(15,23,42,0\.9\) 0%, rgba\(15,23,42,0\.1\) 100%\), url\('\$\{imgUrl\}'\) center\/cover no-repeat; margin-bottom: 2rem; border-bottom: 1px solid var\(--border-glass\); box-shadow: 0 10px 30px rgba\(0,0,0,0\.15\); border-radius: 0 0 12px 12px;">\s*<h1 style="position: relative; z-index: 2; font-family: 'Playfair Display', serif; font-size: 3rem; color: #f8fafc; margin-bottom: 15px; line-height: 1\.2; text-shadow: 0 4px 10px rgba\(0,0,0,0\.8\);">\s*(\$\{unitData\.enquiry_question \|\| unitData\.enquiry \|\| 'Unit Enquiry'\})\s*<\/h1>\s*<h2 style="position: relative; z-index: 2; font-size: 1\.4rem; color: #cbd5e1; font-weight: 500; margin-top: 0; margin-bottom: 20px; text-shadow: 0 2px 5px rgba\(0,0,0,0\.8\);">\s*(\$\{unitData\.title\})\s*<\/h2>\s*(\$\{unitData\.cover_caption \? `<p style="position: absolute; bottom: 10px; right: 20px; margin: 0; font-style: italic; color: rgba\\\(255,255,255,0\.7\\\); font-size: 0\.85rem; text-shadow: 0 1px 3px rgba\\\(0,0,0,0\.8\\\); z-index: 2;">\$\{unitData\.cover_caption\}<\/p>` : ''})\s*<\/div>/;

if (regex.test(code)) {
  code = code.replace(regex, `<div class="hero-container" style="background: linear-gradient(to bottom, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.1) 100%), url('\${imgUrl}') center/cover no-repeat;">
            <h1 class="hero-title">$1</h1>
            <h2 class="hero-subtitle">
                $2
              </h2>
            \${unitData.cover_caption ? \`<p class="hero-caption">\${unitData.cover_caption}</p>\` : ''}
            </div>`);
  fs.writeFileSync('src/core_app.js', code);
  console.log('Replaced successfully');
} else {
  console.log('Regex did not match anything in core_app.js');
}
