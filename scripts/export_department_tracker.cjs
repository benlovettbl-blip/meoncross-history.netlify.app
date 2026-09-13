const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const mdPath = path.join(ROOT_DIR, 'DEPARTMENT_MASTER_PLAN_AND_TRACKER.md');
const mdContent = fs.readFileSync(mdPath, 'utf8');

// Target directories
const targetDirs = [
  'G:\\My Drive\\AAMX\\Dep File\\00_Department_Admin_and_Policies',
  'G:\\My Drive\\AAMX\\Dep File',
  path.join(ROOT_DIR, 'admin_internal', 'department_files'),
  path.join(ROOT_DIR, 'public', 'pdfs'),
];

// Ensure directories exist
targetDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (e) {}
  }
});

// Copy Markdown files
targetDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    const destMd = path.join(dir, 'History Department Master Plan & Curriculum Tracker (2026).md');
    fs.writeFileSync(destMd, mdContent, 'utf8');
    console.log(`✅ Saved Markdown to: ${destMd}`);
  }
});

// Simple Markdown to HTML converter for executive styling
function convertMdToHtml(md) {
  let html = md;
  // Headers
  html = html.replace(
    /^### (.*$)/gim,
    '<h3 style="color: #1e3a8a; font-family: \'Playfair Display\', serif; font-size: 13pt; margin-top: 20px; margin-bottom: 6px; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px;">$1</h3>',
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h2 style="color: #0f172a; font-family: \'Playfair Display\', serif; font-size: 16pt; margin-top: 25px; margin-bottom: 8px; border-bottom: 2px solid #0f172a; padding-bottom: 4px;">$1</h2>',
  );
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 style="color: #0f172a; font-family: \'Playfair Display\', serif; font-size: 22pt; margin-top: 10px; margin-bottom: 8px; text-transform: uppercase;">$1</h1>',
  );

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Tables
  const lines = html.split('\n');
  let inTable = false;
  let tableHtml = '';
  let outLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHtml =
          '<table style="width: 100%; border-collapse: collapse; font-family: \'Inter\', sans-serif; font-size: 8pt; margin: 12px 0; border: 1px solid #cbd5e1;">\n';
      }
      if (line.includes('---')) {
        continue; // delimiter row
      }
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      const isHeader = !tableHtml.includes('<tbody>');
      if (isHeader && !tableHtml.includes('<thead>')) {
        tableHtml += '<thead><tr style="background: #0f172a; color: #ffffff;">\n';
        cells.forEach((c) => {
          tableHtml += `<th style="padding: 5px 8px; text-align: left; border: 1px solid #334155;">${c}</th>\n`;
        });
        tableHtml += '</tr></thead>\n<tbody>\n';
      } else {
        tableHtml += '<tr style="border-bottom: 1px solid #e2e8f0;">\n';
        cells.forEach((c) => {
          tableHtml += `<td style="padding: 5px 8px; border: 1px solid #e2e8f0;">${c}</td>\n`;
        });
        tableHtml += '</tr>\n';
      }
    } else {
      if (inTable) {
        tableHtml += '</tbody></table>\n';
        outLines.push(tableHtml);
        tableHtml = '';
        inTable = false;
      }
      outLines.push(lines[i]);
    }
  }
  if (inTable) {
    tableHtml += '</tbody></table>\n';
    outLines.push(tableHtml);
  }

  html = outLines.join('\n');

  // Blockquotes / code blocks / lists
  html = html.replace(/^\* (.*$)/gim, '<li style="margin-bottom: 3px;">$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li style="margin-bottom: 3px;">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul style="margin: 6px 0; padding-left: 18px;">$1</ul>');

  return html;
}

const styledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Meoncross History Department Master Plan & Tracker</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 20mm 18mm 20mm;
    }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 8.5pt;
      line-height: 1.45;
      color: #1e293b;
      margin: 0;
      padding: 0;
    }
    .header-banner {
      border-bottom: 3px solid #0f172a;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
    .badge {
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 1px;
      background: #0f172a;
      color: #ffffff;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="header-banner">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
      <span style="font-size: 8pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 700;">
        Meoncross School &bull; History Department
      </span>
      <span class="badge">Official Department Policy</span>
    </div>
  </div>

  ${convertMdToHtml(mdContent)}

  <div style="margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 8px; font-size: 7.5pt; color: #64748b; text-align: center;">
    Meoncross School Department of History &bull; Master Plan & Curriculum Tracker &bull; 2026 Edition
  </div>
</body>
</html>`;

async function exportPdf() {
  console.log('Compiling Department Master Plan PDF with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(styledHtml, { waitUntil: 'networkidle0' });

  for (const dir of targetDirs) {
    if (fs.existsSync(dir)) {
      const destPdf = path.join(
        dir,
        'History Department Master Plan & Curriculum Tracker (2026).pdf',
      );
      await page.pdf({
        path: destPdf,
        format: 'A4',
        printBackground: true,
        margin: { top: '15mm', bottom: '15mm', left: '20mm', right: '20mm' },
      });
      console.log(`✅ Saved PDF to: ${destPdf}`);
    }
  }

  await browser.close();
  console.log('🎉 Department Master Plan & Tracker export complete across all folders!');
}

exportPdf().catch((err) => console.error('Error exporting tracker PDF:', err));
