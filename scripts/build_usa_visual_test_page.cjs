const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const pubUsaPath = path.join(ROOT_DIR, 'public', 'data', 'usa.json');
const usa = JSON.parse(fs.readFileSync(pubUsaPath, 'utf8'));
const lessons = usa.data ? usa.data.lessons : usa.lessons;

const htmlOutPath = path.join(ROOT_DIR, 'public', 'test_usa_visuals_grid.html');

let cardsHtml = '';

lessons.forEach((l, lIdx) => {
  const lNum = lIdx + 1;
  const sources = l.sources || [];

  cardsHtml += `
    <section class="lesson-section" id="lesson-${lNum}">
      <div class="lesson-header">
        <span class="lesson-badge">Lesson ${lNum}</span>
        <h2>${l.title}</h2>
      </div>
      <div class="sources-grid">
  `;

  sources.forEach((s) => {
    const webPath = s.src || s.image || s.source;
    const fn = path.basename(webPath);

    cardsHtml += `
      <div class="source-card" data-lesson="${lNum}" data-source="${s.letter}">
        <div class="source-card-header">
          <span class="source-letter-badge">Source ${s.letter}</span>
          <span class="file-name">${fn}</span>
        </div>
        <div class="image-wrapper">
          <img src="${webPath}" alt="${s.title}" loading="eager" onload="document.getElementById('dim-${lNum}-${s.letter}').textContent = this.naturalWidth + ' × ' + this.naturalHeight + ' px'; document.getElementById('status-${lNum}-${s.letter}').className = 'status-tag status-loaded'; document.getElementById('status-${lNum}-${s.letter}').textContent = 'LOADED';" onerror="document.getElementById('status-${lNum}-${s.letter}').className = 'status-tag status-error'; document.getElementById('status-${lNum}-${s.letter}').textContent = 'ERROR';" />
          <div class="image-overlay">
            <span class="status-tag status-pending" id="status-${lNum}-${s.letter}">CHECKING</span>
            <span class="dimensions-badge" id="dim-${lNum}-${s.letter}">---</span>
          </div>
        </div>
        <div class="source-body">
          <h3 class="source-title">${s.title}</h3>
          <p class="source-caption"><strong>Caption:</strong> ${s.caption}</p>
          <p class="source-provenance"><strong>Provenance:</strong> ${s.provenance || s.desc}</p>
          <div class="hinge-box">
            <span class="hinge-label"><i class="fas fa-question-circle"></i> Hinge Question:</span>
            <p class="hinge-text">${s.hinge_question}</p>
          </div>
        </div>
      </div>
    `;
  });

  cardsHtml += `
      </div>
    </section>
  `;
});

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>USA 1954–1975 Visual Source Verification Rig | The History Revision Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    :root {
      --bg: #0b0f19;
      --surface: #111827;
      --card-bg: #1f2937;
      --border: #374151;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-blue: #3b82f6;
      --accent-gold: #f59e0b;
      --accent-green: #10b981;
      --accent-red: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 30px;
    }
    header {
      max-width: 1400px;
      margin: 0 auto 30px auto;
      padding: 24px;
      background: var(--surface);
      border-radius: 12px;
      border: 1px solid var(--border);
    }
    h1 {
      font-family: 'Cinzel', serif;
      font-size: 2rem;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 1rem;
    }
    .lesson-section {
      max-width: 1400px;
      margin: 0 auto 40px auto;
      background: var(--surface);
      border-radius: 12px;
      padding: 24px;
      border: 1px solid var(--border);
    }
    .lesson-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }
    .lesson-badge {
      background: var(--accent-blue);
      color: white;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 4px 10px;
      border-radius: 6px;
    }
    .lesson-header h2 {
      font-size: 1.25rem;
      color: #ffffff;
    }
    .sources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
      gap: 24px;
    }
    .source-card {
      background: var(--card-bg);
      border-radius: 8px;
      border: 1px solid var(--border);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .source-card-header {
      padding: 10px 14px;
      background: rgba(0,0,0,0.3);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
    }
    .source-letter-badge {
      background: var(--accent-gold);
      color: #000;
      font-weight: 800;
      font-size: 0.8rem;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .file-name {
      font-family: monospace;
      font-size: 0.8rem;
      color: #93c5fd;
    }
    .image-wrapper {
      position: relative;
      width: 100%;
      height: 280px;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image-wrapper img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .image-overlay {
      position: absolute;
      bottom: 8px;
      right: 8px;
      display: flex;
      gap: 8px;
    }
    .status-tag {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .status-loaded { background: var(--accent-green); color: #000; }
    .status-pending { background: var(--accent-gold); color: #000; }
    .status-error { background: var(--accent-red); color: #fff; }
    .dimensions-badge {
      background: rgba(0,0,0,0.7);
      color: #fff;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }
    .source-body {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }
    .source-title {
      font-size: 0.95rem;
      color: #ffffff;
      font-weight: 600;
    }
    .source-caption, .source-provenance {
      font-size: 0.82rem;
      color: var(--text-muted);
    }
    .source-caption strong, .source-provenance strong {
      color: var(--text);
    }
    .hinge-box {
      margin-top: auto;
      padding: 10px;
      background: rgba(59, 130, 246, 0.1);
      border-left: 3px solid var(--accent-blue);
      border-radius: 4px;
    }
    .hinge-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: #60a5fa;
      text-transform: uppercase;
      display: block;
      margin-bottom: 4px;
    }
    .hinge-text {
      font-size: 0.82rem;
      color: #e5e7eb;
    }
  </style>
</head>
<body>
  <header>
    <h1>The History Revision Hub — USA 1954–1975</h1>
    <p class="subtitle">Complete Visual Source Verification Test Rig (49 Archival Sources Across 16 Lessons)</p>
  </header>
  <main>
    ${cardsHtml}
  </main>
</body>
</html>`;

fs.writeFileSync(htmlOutPath, fullHtml, 'utf8');
console.log('✅ Generated visual source test page at:', htmlOutPath);
