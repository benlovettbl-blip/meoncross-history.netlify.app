import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('data/edexcel_medicine.json', 'r', encoding='utf-8') as f:
    unit_data = json.load(f)

kt5_lessons = [l for l in unit_data.get('lessons', []) if '5_' in l.get('id', '')]

html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Key Topic 5 (Western Front 1914–1918) Visual Asset Audit Gallery</title>
<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #0f172a;
    color: #f8fafc;
    margin: 0;
    padding: 24px;
  }
  .header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #334155;
  }
  .header h1 {
    margin: 0 0 8px 0;
    color: #38bdf8;
    font-size: 1.8rem;
  }
  .header p {
    margin: 0;
    color: #94a3b8;
    font-size: 0.95rem;
  }
  .lesson-section {
    background: #1e293b;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 28px;
    border: 1px solid #334155;
  }
  .lesson-title {
    color: #f1f5f9;
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lesson-badge {
    background: #2563eb;
    color: #fff;
    font-size: 0.75rem;
    padding: 3px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: 800;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 16px;
  }
  .card {
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .card-header {
    padding: 8px 12px;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    background: #1e3a8a;
    color: #93c5fd;
    display: flex;
    justify-content: space-between;
  }
  .card-header.source-header {
    background: #065f46;
    color: #a7f3d0;
  }
  .img-box {
    width: 100%;
    height: 220px;
    background: #020617;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    box-sizing: border-box;
  }
  .img-box img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }
  .card-body {
    padding: 12px;
    font-size: 0.82rem;
    color: #cbd5e1;
    line-height: 1.4;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card-caption {
    margin-bottom: 8px;
  }
  .card-meta {
    font-size: 0.72rem;
    color: #94a3b8;
    border-top: 1px solid #334155;
    padding-top: 6px;
    margin-top: 6px;
  }
</style>
</head>
<body>

<div class="header">
  <h1>Key Topic 5: British Sector of the Western Front (1914–1918)</h1>
  <p>Visual Verification Gallery &bull; 24 Verified Archival Plates &amp; Primary Sources &bull; The History Revision Hub</p>
</div>
"""

for l in kt5_lessons:
    lid = l.get('id', '')
    title = l.get('title', '')
    blocks = l.get('narrative_blocks', [])
    b2 = blocks[1] if len(blocks) > 1 else {}
    b4 = blocks[3] if len(blocks) > 3 else {}
    sources = l.get('sources', [])
    src_a = next((s for s in sources if s.get('letter') == 'A'), {})
    src_c = next((s for s in sources if s.get('letter') == 'C'), {})

    html += f"""
    <div class="lesson-section" id="{lid}">
      <div class="lesson-title">
        <span class="lesson-badge">{lid.replace('_', ' ').upper()}</span>
        <span>{title}</span>
      </div>
      <div class="grid">
        <!-- Plate 1 -->
        <div class="card">
          <div class="card-header">
            <span>Layer 2: Plate 1 (Act 2)</span>
            <span>Narrative Visual</span>
          </div>
          <div class="img-box">
            <img src="{b2.get('image', '')}" alt="Plate 1">
          </div>
          <div class="card-body">
            <div class="card-caption"><strong>Caption:</strong> {b2.get('caption', '')}</div>
            <div class="card-meta">File: <code>{b2.get('image', '')}</code></div>
          </div>
        </div>

        <!-- Plate 2 -->
        <div class="card">
          <div class="card-header">
            <span>Layer 2: Plate 2 (Act 4)</span>
            <span>Narrative Visual</span>
          </div>
          <div class="img-box">
            <img src="{b4.get('image', '')}" alt="Plate 2">
          </div>
          <div class="card-body">
            <div class="card-caption"><strong>Caption:</strong> {b4.get('caption', '')}</div>
            <div class="card-meta">File: <code>{b4.get('image', '')}</code></div>
          </div>
        </div>

        <!-- Source A -->
        <div class="card">
          <div class="card-header source-header">
            <span>Layer 3: Source A</span>
            <span>Primary Visual</span>
          </div>
          <div class="img-box">
            <img src="{src_a.get('image', '')}" alt="Source A">
          </div>
          <div class="card-body">
            <div class="card-caption">
              <strong>{src_a.get('title', '')}</strong><br>
              <span style="color: #6ee7b7; font-size: 0.75rem;">Badge: {src_a.get('question_badge', '')}</span><br>
              {src_a.get('caption', '')}
            </div>
            <div class="card-meta">
              <strong>Citation:</strong> {src_a.get('citation', '')}<br>
              File: <code>{src_a.get('image', '')}</code>
            </div>
          </div>
        </div>

        <!-- Source C -->
        <div class="card">
          <div class="card-header source-header">
            <span>Layer 3: Source C</span>
            <span>Primary Visual</span>
          </div>
          <div class="img-box">
            <img src="{src_c.get('image', '')}" alt="Source C">
          </div>
          <div class="card-body">
            <div class="card-caption">
              <strong>{src_c.get('title', '')}</strong><br>
              <span style="color: #6ee7b7; font-size: 0.75rem;">Badge: {src_c.get('question_badge', '')}</span><br>
              {src_c.get('caption', '')}
            </div>
            <div class="card-meta">
              <strong>Citation:</strong> {src_c.get('citation', '')}<br>
              File: <code>{src_c.get('image', '')}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
    """

html += """
</body>
</html>
"""

with open('public/kt5_visual_audit_gallery.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("✅ Saved public/kt5_visual_audit_gallery.html")
