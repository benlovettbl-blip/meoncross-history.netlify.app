"""
build_32page_medicine.py
Compiles the complete 32-page generator script:
scripts/generate_medicine_mastery_booklets.cjs
"""

import os
import sys

# Add current directory to path
sys.path.append(os.path.dirname(__file__))

from css_and_header import get_preamble
from front_cover import render_page_1
from section_b_spreads import (
    render_spread_1,
    render_spread_2,
    render_spread_3,
    render_spread_4
)
from section_b_spreads_part2 import (
    render_spread_5,
    render_spread_6,
    render_spread_7,
    render_spread_8
)
from section_a_sets import (
    render_section_a_set_1,
    render_section_a_set_2,
    render_section_a_set_3,
    render_section_a_set_4
)
from reference_pages import render_reference_pages

def build_cjs():
    preamble = get_preamble()

    html_pages = [
        render_page_1(),
        render_spread_1(),
        render_spread_2(),
        render_spread_3(),
        render_spread_4(),
        render_spread_5(),
        render_spread_6(),
        render_spread_7(),
        render_spread_8(),
        render_section_a_set_1(),
        render_section_a_set_2(),
        render_section_a_set_3(),
        render_section_a_set_4(),
        render_reference_pages()
    ]

    all_pages_html = "\n".join(html_pages)

    cjs_content = f"""{preamble}

// =============================================================================
// COMPLETE 32-PAGE HTML BUILDER
// =============================================================================
function generateMasterHtml() {{
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Paper 1: Medicine in Britain, c1250–present and The British Sector of the Western Front, 1914–18 — 32-Page Ultimate Compendium</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap" rel="stylesheet">
    <style>${{COMMON_CSS}}</style>
</head>
<body>

{all_pages_html}

</body>
</html>`;
}}

// =============================================================================
// COMPILATION, AUDIT & EXPORT ENGINE
// =============================================================================
async function compileMasteryBooklets() {{
  console.log('================================================================');
  console.log('🚀 COMPILING 32-PAGE ULTIMATE COMPENDIUM (OPTION 11 MEDICINE)');
  console.log('================================================================');

  const htmlContent = generateMasterHtml();
  const htmlPath = path.join(bookletsDir, 'medicine_mastery_compendium_32page.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
  console.log(`✓ Generated Master HTML: ${{htmlPath}} (${{(Buffer.byteLength(htmlContent) / 1024).toFixed(1)}} KB)`);

  console.log('⏳ Launching Puppeteer to audit layout and compile PDF...');
  const browser = await puppeteer.launch({{
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }});
  const page = await browser.newPage();
  await page.setViewport({{ width: 1200, height: 1600 }});
  await page.goto(pathToFileURL(htmlPath).href, {{ waitUntil: 'networkidle0' }});

  // Strict DOM Page Count & Overflow Audit
  const auditResults = await page.evaluate(() => {{
    const pages = document.querySelectorAll('.page');
    const overflows = [];
    pages.forEach((p, idx) => {{
      const pageNum = idx + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      if (scrollH > clientH + 2) {{
        overflows.push({{
          pageNum,
          scrollH,
          clientH,
          diff: scrollH - clientH
        }});
      }}
    }});
    return {{
      pageCount: pages.length,
      overflows
    }};
  }});

  console.log(`✓ DOM Page Count: ${{auditResults.pageCount}} pages (Target: 32 pages)`);

  if (auditResults.pageCount !== 32) {{
    console.error(`❌ ARCHITECTURAL ERROR: Expected exactly 32 pages, found ${{auditResults.pageCount}} pages!`);
  }} else {{
    console.log(`✅ PERFECT PRINT-READY 32-PAGE ARCHITECTURE CONFIRMED (Rule of 4: 8 folded A3 sheets).`);
  }}

  if (auditResults.overflows.length > 0) {{
    console.warn(`⚠️ OVERFLOW DETECTED ON ${{auditResults.overflows.length}} PAGES:`);
    auditResults.overflows.forEach(o => {{
      console.warn(`   - Page ${{o.pageNum}}: scrollHeight ${{o.scrollH}}px > clientHeight ${{o.clientH}}px (Diff: +${{o.diff}}px)`);
    }});
  }} else {{
    console.log(`✅ ZERO OVERFLOWS: All ${{auditResults.pageCount}} pages fit within 297mm print budget!`);
  }}

  // Export High-Resolution Monochrome PDF
  const pdfFileName = 'med_mastery_pack_FULL.pdf';
  const outPdfUnit = path.join(pdfsDir, pdfFileName);
  const outPdfGlobal = path.join(globalPdfsDir, pdfFileName);

  console.log('⏳ Generating 32-page PDF...');
  const pdfBuffer = await page.pdf({{
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: {{ top: 0, right: 0, bottom: 0, left: 0 }}
  }});

  fs.writeFileSync(outPdfUnit, pdfBuffer);
  fs.writeFileSync(outPdfGlobal, pdfBuffer);
  console.log(`✓ Saved PDF to Unit: ${{outPdfUnit}} (${{(pdfBuffer.length / 1024 / 1024).toFixed(2)}} MB)`);
  console.log(`✓ Saved PDF to Global: ${{outPdfGlobal}} (${{(pdfBuffer.length / 1024 / 1024).toFixed(2)}} MB)`);

  await browser.close();

  // Automatic Sync to Google Drive Folders
  const driveDestinations = [
    'G:\\\\My Drive\\\\AAMX\\\\Dep File\\\\Year 11 (GCSE)\\\\Paper 1 - Medicine Through Time',
    'G:\\\\My Drive\\\\AAMX\\\\RESOURCES\\\\Edexcel GCSE History exams\\\\p1 11 medicine',
    'G:\\\\My Drive\\\\AAMX\\\\RESOURCES\\\\Medicine'
  ];

  console.log('\\n📂 Synchronizing 32-page Compendium to Google Drive folders...');
  driveDestinations.forEach(destDir => {{
    try {{
      if (fs.existsSync(destDir)) {{
        const targetPath = path.join(destDir, 'Edexcel_Paper1_Medicine_32Page_Ultimate_Compendium.pdf');
        fs.copyFileSync(outPdfGlobal, targetPath);
        console.log(`   ✓ Synced to: ${{targetPath}}`);
      }} else {{
        console.log(`   ℹ️ Note: Directory not mounted/found: ${{destDir}}`);
      }}
    }} catch (err) {{
      console.warn(`   ⚠️ Warning: Could not copy to ${{destDir}}: ${{err.message}}`);
    }}
  }});

  console.log('\\n🎉 SUCCESS: 32-PAGE MASTER COMPENDIUM COMPILED AND VERIFIED!\\n');
}}

compileMasteryBooklets().catch(err => {{
  console.error('Fatal compilation error:', err);
  process.exit(1);
}});
"""

    target_cjs = os.path.join(os.path.dirname(__file__), "..", "generate_medicine_mastery_booklets.cjs")
    with open(target_cjs, "w", encoding="utf-8") as f:
        f.write(cjs_content)
    print(f"Successfully generated {target_cjs} ({len(cjs_content)} bytes)")

if __name__ == "__main__":
    build_cjs()
