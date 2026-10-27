import json
import os
import sys

with open('data/edexcel_medicine.json', 'r', encoding='utf-8') as f:
    med = json.load(f)

with open('scripts/master_rights_database.json', 'r', encoding='utf-8') as f:
    rights_db = json.load(f)

rights_sources = rights_db.get('units', {}).get('edexcel_medicine', {}).get('sources', [])
rights_by_img = {s.get('image'): s for s in rights_sources if s.get('image')}

html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Visual Forensic Audit: KT2, KT3, KT4</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f1f5f9; padding: 20px; }
  h1 { text-align: center; color: #38bdf8; margin-bottom: 5px; }
  h2 { color: #f59e0b; border-bottom: 2px solid #334155; padding-bottom: 8px; margin-top: 40px; }
  h3 { color: #e2e8f0; margin-top: 20px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; margin-top: 15px; }
  .card { background: #1e293b; border-radius: 8px; border: 1px solid #334155; padding: 15px; display: flex; flex-direction: column; }
  .card img { max-width: 100%; max-height: 260px; object-fit: contain; background: #000; border-radius: 4px; border: 1px solid #475569; margin: 0 auto; }
  .badge { display: inline-block; padding: 3px 8px; font-size: 11px; font-weight: 700; border-radius: 4px; text-transform: uppercase; margin-bottom: 8px; }
  .badge-plate { background: #0284c7; color: #fff; }
  .badge-source { background: #8b5cf6; color: #fff; }
  .title { font-weight: 600; font-size: 14px; margin-top: 8px; color: #f8fafc; }
  .meta { font-size: 12px; color: #94a3b8; margin-top: 4px; line-height: 1.4; }
  .path { font-family: monospace; font-size: 11px; color: #38bdf8; word-break: break-all; margin-top: 6px; }
</style>
</head>
<body>
<h1>Forensic Visual Audit Gallery: Key Topics 2, 3, and 4</h1>
<p style="text-align: center; color: #94a3b8; font-size: 14px;">Verification of all 60 visual assets across GCSE Medicine in Britain (c.1250–present)</p>
"""

for kt_title, prefix in [
    ('Key Topic 2: c.1500–c.1700 (Renaissance Medicine)', 'lesson_2_'),
    ('Key Topic 3: c.1700–c.1900 (Industrial Medicine & The Germ Revolution)', 'lesson_3_'),
    ('Key Topic 4: c.1900–present (Modern Medicine)', 'lesson_4_')
]:
    html += f"<h2>{kt_title}</h2>\n"
    for l in med.get('lessons', []):
        lid = str(l.get('id', ''))
        if not lid.startswith(prefix):
            continue
        html += f"<h3>[{lid}] {l.get('title')}</h3>\n<div class='grid'>\n"
        
        # Plates
        for i, b in enumerate(l.get('narrative_blocks', [])):
            if b.get('image'):
                img = b.get('image')
                html += f"""
                <div class='card'>
                  <div><span class='badge badge-plate'>Layer 2 Narrative Plate (Block {i+1})</span></div>
                  <img src='{img}' alt='Block {i+1} plate' />
                  <div class='title'>Narrative Plate</div>
                  <div class='meta'>{b.get('caption', '')}</div>
                  <div class='path'>{img}</div>
                </div>
                """
        # Visual sources
        for s in l.get('sources', []):
            if s.get('image'):
                img = s.get('image')
                html += f"""
                <div class='card'>
                  <div><span class='badge badge-source'>Layer 3 Source {s.get('id')} ({s.get('type')})</span></div>
                  <img src='{img}' alt='Source {s.get('id')}' />
                  <div class='title'>{s.get('title')}</div>
                  <div class='meta'><b>Context:</b> {s.get('context', '')}</div>
                  <div class='meta'><b>Teacher Context:</b> {s.get('teacher_notes', {}).get('source_context', '')}</div>
                  <div class='path'>{img}</div>
                </div>
                """
        html += "</div>\n"

html += "</body>\n</html>"

with open('public/visual_audit_gallery.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Created public/visual_audit_gallery.html successfully!")
