const fs = require('fs');
let code = fs.readFileSync('src/unit_router.js', 'utf8');

const injection = `

      // 5. Printable Workbook Tab
      {
        const wbLink = document.createElement('a');
        wbLink.className = 'lesson-link';
        wbLink.innerHTML = '<i class="fa-solid fa-file-pdf" style="margin-right: 8px;"></i> Printable Workbook';
        wbLink.href = '#';
        wbLink.onclick = (e) => {
          e.preventDefault();
          if (e.isTrusted !== false) {
            const url = new URL(window.location);
            url.searchParams.set('tab', 'workbook');
            history.pushState({ customTab: 'workbook' }, "", url);
          }

          document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
          wbLink.classList.add('active');
          const contentArea = document.getElementById('content-area');
          contentArea.innerHTML = \`
            <div style="height: 100%; display: flex; flex-direction: column;">
              <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <h2 style="margin: 0; color: #1e3a8a;"><i class="fa-solid fa-file-pdf"></i> PDF Workbook Preview</h2>
                <a href="/units/\${unitId}/workbook.pdf" download class="btn btn-primary"><i class="fa-solid fa-download"></i> Download PDF</a>
              </div>
              <iframe src="/units/\${unitId}/workbook.pdf" style="width: 100%; height: 80vh; border: none; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" title="Workbook PDF"></iframe>
            </div>
          \`;
          if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        };
        sidebarNav.appendChild(wbLink);
      }`;

const anchorMatch = code.match(/sidebarNav\.appendChild\(geoLink\);\s*\}/);
if (anchorMatch) {
    code = code.replace(anchorMatch[0], anchorMatch[0] + injection);
    fs.writeFileSync('src/unit_router.js', code, 'utf8');
    console.log('Successfully injected Printable Workbook tab');
} else {
    console.log('Anchor not found');
}
