import os
import sys
import zipfile
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime

EMAILS_DIR = r"G:\My Drive\AAMX\Dep File\Emails"
LOCAL_EMAILS_DIR = r"c:\Projects\meoncross-history.netlify.app\admin_internal\department_files\Emails"
TEMPLATE_DOCX = r"G:\My Drive\AAMX\Dep File\00_Department_Admin_and_Policies\Working Documents & Templates\Development Plan Template History Dep.docx"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
XML_NS = "http://www.w3.org/XML/1998/namespace"
ET.register_namespace('w', W_NS)

def make_run(text, bold=False, italic=False, size="22", color="1e293b", font="Calibri"):
    r = ET.Element(f"{{{W_NS}}}r")
    rPr = ET.SubElement(r, f"{{{W_NS}}}rPr")
    rFonts = ET.SubElement(rPr, f"{{{W_NS}}}rFonts")
    rFonts.set(f"{{{W_NS}}}ascii", font)
    rFonts.set(f"{{{W_NS}}}hAnsi", font)
    rFonts.set(f"{{{W_NS}}}cs", "Arial")
    
    if bold:
        ET.SubElement(rPr, f"{{{W_NS}}}b")
    if italic:
        ET.SubElement(rPr, f"{{{W_NS}}}i")
    if color:
        c = ET.SubElement(rPr, f"{{{W_NS}}}color")
        c.set(f"{{{W_NS}}}val", color)
        
    sz = ET.SubElement(rPr, f"{{{W_NS}}}sz")
    sz.set(f"{{{W_NS}}}val", size)
    szCs = ET.SubElement(rPr, f"{{{W_NS}}}szCs")
    szCs.set(f"{{{W_NS}}}val", size)
    
    t = ET.SubElement(r, f"{{{W_NS}}}t")
    if text.startswith(" ") or text.endswith(" "):
        t.set(f"{{{XML_NS}}}space", "preserve")
    t.text = text
    return r

def make_p(runs_data, space_after="140", line="280"):
    p = ET.Element(f"{{{W_NS}}}p")
    pPr = ET.SubElement(p, f"{{{W_NS}}}pPr")
    sp = ET.SubElement(pPr, f"{{{W_NS}}}spacing")
    sp.set(f"{{{W_NS}}}after", space_after)
    sp.set(f"{{{W_NS}}}line", line)
    sp.set(f"{{{W_NS}}}lineRule", "auto")
    
    for item in runs_data:
        text = item[0]
        bold = item[1] if len(item) > 1 else False
        italic = item[2] if len(item) > 2 else False
        size = item[3] if len(item) > 3 else "22"
        color = item[4] if len(item) > 4 else "1e293b"
        p.append(make_run(text, bold=bold, italic=italic, size=size, color=color))
    return p

def create_docx_memo(dest_path, recipient, subject, date_str, body_paragraphs):
    with zipfile.ZipFile(TEMPLATE_DOCX, 'r') as zin:
        files_dict = {item.filename: zin.read(item.filename) for item in zin.infolist() if item.filename != 'word/document.xml'}
        
    root = ET.Element(f"{{{W_NS}}}document")
    body = ET.SubElement(root, f"{{{W_NS}}}body")
    
    # Title
    body.append(make_p([("MEONCROSS SCHOOL | HISTORY DEPARTMENT", True, False, "20", "64748b")], space_after="60"))
    body.append(make_p([("Parental Communication Draft (via School Office)", True, False, "30", "0f172a")], space_after="180"))
    
    # Metadata Box
    body.append(make_p([
        ("TO: ", True, False, "22", "0f172a"),
        (f"{recipient}    ", False, False, "22", "334155"),
        ("DATE: ", True, False, "22", "0f172a"),
        (f"{date_str}", False, False, "22", "334155")
    ], space_after="100"))
    
    body.append(make_p([
        ("FROM: ", True, False, "22", "0f172a"),
        ("Ben Lovett (Head of History)    ", False, False, "22", "334155"),
        ("PURPOSE: ", True, False, "22", "0f172a"),
        ("Circulation to Ypres Trip Parents & Guardians", True, False, "22", "059669")
    ], space_after="100"))
    
    body.append(make_p([
        ("SUBJECT: ", True, False, "22", "0f172a"),
        (f"{subject}", True, False, "22", "1e40af")
    ], space_after="240"))
    
    body.append(make_p([("_______________________________________________________________________________", False, False, "16", "cbd5e1")], space_after="240"))
    
    for para in body_paragraphs:
        if para.strip():
            if para.startswith("### "):
                body.append(make_p([(para.replace("### ", ""), True, False, "24", "1e3a8a")], space_after="120"))
            elif para.startswith("## "):
                body.append(make_p([(para.replace("## ", ""), True, False, "26", "0f172a")], space_after="160"))
            elif para.startswith("- ") or para.startswith("• "):
                body.append(make_p([("  •  ", True, False, "22", "1e40af"), (para[2:], False, False, "22", "1e293b")], space_after="100"))
            else:
                body.append(make_p([(para.strip(), False, False, "22", "1e293b")], space_after="140"))
            
    sectPr = ET.SubElement(body, f"{{{W_NS}}}sectPr")
    pgSz = ET.SubElement(sectPr, f"{{{W_NS}}}pgSz")
    pgSz.set(f"{{{W_NS}}}w", "11906")
    pgSz.set(f"{{{W_NS}}}h", "16838")
    pgMar = ET.SubElement(sectPr, f"{{{W_NS}}}pgMar")
    pgMar.set(f"{{{W_NS}}}top", "1440")
    pgMar.set(f"{{{W_NS}}}right", "1440")
    pgMar.set(f"{{{W_NS}}}bottom", "1440")
    pgMar.set(f"{{{W_NS}}}left", "1440")
    
    updated_xml = ET.tostring(root, encoding='utf-8', xml_declaration=True)
    with zipfile.ZipFile(dest_path, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
        zout.writestr('word/document.xml', updated_xml)
        for fname, data in files_dict.items():
            zout.writestr(fname, data)

def create_eml_file(dest_path, recipient, subject, body_text, date_obj):
    eml_content = f"""From: Ben Lovett <ben.lovett@meoncross.co.uk>
To: {recipient}
Subject: {subject}
Date: {date_obj.strftime("%a, %d %b %Y 08:00:00 +0100")}
MIME-Version: 1.0
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: 8bit

{body_text}
"""
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(eml_content)

def create_txt_file(dest_path, recipient, subject, body_text, date_str):
    txt_content = f"""TO: {recipient}
SUBJECT: {subject}
DATE: {date_str}
STATUS: Ready to Send Monday Morning
----------------------------------------------------------------------

{body_text}
"""
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(txt_content)

def create_html_launcher(dest_path, recipient, subject, body_text, date_str):
    encoded_subj = urllib.parse.quote(subject)
    encoded_body = urllib.parse.quote(body_text)
    
    mailto_link = f"mailto:?subject={encoded_subj}&body={encoded_body}"
    o365_link = f"https://outlook.office.com/mail/deeplink/compose?subject={encoded_subj}&body={encoded_body}"
    
    escaped_body_js = body_text.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')
    
    # Process text for clean HTML reading
    html_lines = []
    for line in body_text.split('\n'):
        if line.startswith('### '):
            html_lines.append(f"<h4 style='color: #1e3a8a; margin: 18px 0 8px 0; font-size: 1.08rem;'>{line[4:]}</h4>")
        elif line.startswith('## '):
            html_lines.append(f"<h3 style='color: #0f172a; margin: 22px 0 10px 0; font-size: 1.25rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;'>{line[3:]}</h3>")
        elif line.startswith('----------------------------------------------------------------------'):
            html_lines.append("<hr style='border: none; border-top: 2px dashed #cbd5e1; margin: 24px 0;'/>")
        elif line.startswith('- ') or line.startswith('• '):
            html_lines.append(f"<li style='margin-bottom: 6px;'>{line[2:]}</li>")
        elif line.strip() == '':
            html_lines.append("<br/>")
        else:
            html_lines.append(f"<p style='margin-bottom: 10px; line-height: 1.6;'>{line}</p>")
            
    formatted_body_html = "".join(html_lines)
    
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Draft Email: {subject}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {{
      --primary: #1e3a8a;
      --primary-light: #eff6ff;
      --accent: #059669;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #1e293b;
      --muted: #64748b;
      --border: #e2e8f0;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }}
    .container {{
      max-width: 760px;
      width: 100%;
      background: var(--card-bg);
      border-radius: 12px;
      border: 1px solid var(--border);
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.04);
      overflow: hidden;
    }}
    .header {{
      background: linear-gradient(135deg, #1e3a8a 0%, #172554 100%);
      color: white;
      padding: 24px 28px;
    }}
    .header .subtitle {{
      font-size: 0.82rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #93c5fd;
      font-weight: 600;
      margin-bottom: 6px;
    }}
    .header h1 {{
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.35;
    }}
    .actions-bar {{
      background: #f1f5f9;
      padding: 14px 28px;
      border-bottom: 1px solid var(--border);
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }}
    .btn {{
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 16px;
      border-radius: 6px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
      border: 1px solid transparent;
    }}
    .btn-o365 {{
      background: #0078d4;
      color: white;
    }}
    .btn-o365:hover {{
      background: #106ebe;
    }}
    .btn-desktop {{
      background: #0f172a;
      color: white;
    }}
    .btn-desktop:hover {{
      background: #334155;
    }}
    .btn-copy {{
      background: white;
      color: #0f172a;
      border-color: #cbd5e1;
    }}
    .btn-copy:hover {{
      background: #f8fafc;
      border-color: #94a3b8;
    }}
    .content {{
      padding: 28px;
    }}
    .meta-grid {{
      display: grid;
      grid-template-columns: 90px 1fr;
      row-gap: 10px;
      margin-bottom: 22px;
      font-size: 0.92rem;
      background: #f8fafc;
      padding: 14px 18px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }}
    .meta-label {{
      font-weight: 700;
      color: var(--muted);
      text-transform: uppercase;
      font-size: 0.78rem;
      padding-top: 2px;
    }}
    .meta-value {{
      color: #0f172a;
      font-weight: 500;
    }}
    .email-body {{
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px 26px;
      font-size: 0.96rem;
      line-height: 1.65;
      color: #1e293b;
    }}
    .toast {{
      display: none;
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: #059669;
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);
      z-index: 100;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="subtitle">History Department &bull; Outgoing Email Draft</div>
      <h1>{subject}</h1>
    </div>
    
    <div class="actions-bar">
      <a href="{o365_link}" target="_blank" class="btn btn-o365" title="Open directly in Outlook 365 Web App">
        <i class="fa-brands fa-microsoft"></i> Open in Outlook 365 Web
      </a>
      <a href="{mailto_link}" class="btn btn-desktop" title="Open in default Desktop Mail app">
        <i class="fa-solid fa-paper-plane"></i> Open in Mail App
      </a>
      <button class="btn btn-copy" onclick="copyEmailText()" title="Copy entire draft to clipboard">
        <i class="fa-regular fa-copy"></i> Copy Full Text
      </button>
      <button class="btn btn-copy" onclick="copyParentBodyOnly()" title="Copy just the parent body portion">
        <i class="fa-solid fa-users"></i> Copy Parent Text Only
      </button>
    </div>

    <div class="content">
      <div class="meta-grid">
        <div class="meta-label">To:</div>
        <div class="meta-value">{recipient}</div>
        <div class="meta-label">Subject:</div>
        <div class="meta-value" style="font-weight: 700; color: #1e40af;">{subject}</div>
        <div class="meta-label">Date:</div>
        <div class="meta-value">Monday 14 September 2026</div>
      </div>

      <div class="email-body" id="body-text">
        {formatted_body_html}
      </div>
    </div>
  </div>

  <div class="toast" id="toast">Copied to clipboard!</div>

  <script>
    const rawBody = `{escaped_body_js}`;
    function copyEmailText() {{
      navigator.clipboard.writeText(rawBody).then(() => {{
        showToast('Full message copied to clipboard!');
      }}).catch(err => alert('Please select and copy manually.'));
    }}

    function copyParentBodyOnly() {{
      const marker = '----------------------------------------------------------------------';
      const parts = rawBody.split(marker);
      const parentText = parts.length > 1 ? parts[1].trim() : rawBody;
      navigator.clipboard.writeText(parentText).then(() => {{
        showToast('Parent email text copied to clipboard!');
      }}).catch(err => alert('Please select and copy manually.'));
    }}

    function showToast(msg) {{
      const toast = document.getElementById('toast');
      toast.innerText = msg;
      toast.style.display = 'block';
      setTimeout(() => {{
        toast.style.display = 'none';
      }}, 2000);
    }}
  </script>
</body>
</html>
"""
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

def main():
    os.makedirs(EMAILS_DIR, exist_ok=True)
    os.makedirs(LOCAL_EMAILS_DIR, exist_ok=True)
    
    recipient = "Cathy (School Office)"
    subject = "History Battlefield Tour (Ypres 2026) – Final Itinerary, Kit List & Next Steps for Parents"
    date_str = "14/09/2026"
    date_obj = datetime(2026, 9, 14, 8, 0, 0)
    
    cover_note = [
        "Hi Cathy,",
        "Could you please circulate the message below to all parents and guardians of pupils attending the upcoming Ypres Battlefield Tour (Thursday 1st October – Saturday 3rd October)?",
        "Could you also please attach the following two PDF documents from the Google Drive (or attached here):",
        "1. Ypres 2026 Parent Information Pack (v2).pdf",
        "2. Ypres Trip 2026 Code of Conduct.pdf",
        "Thank you so much for your help getting this out on Monday morning!",
        "Warm regards,",
        "Ben Lovett\nHead of History\nMeoncross School"
    ]
    
    parent_email = [
        "----------------------------------------------------------------------",
        "SUBJECT: Meoncross History Battlefield Tour (Ypres 2026) – Final Itinerary, Kit List & Next Steps",
        "",
        "Dear Parents and Guardians,",
        "",
        "With just over two weeks to go until our Year 8 and 9 expedition to the Ypres Salient in Flanders (Thursday 1st October to Saturday 3rd October), we are writing to provide you with the final briefing details, kit reminders, and important upcoming paperwork deadlines.",
        "",
        "Please find attached our complete two-page Parent Information Pack (Version 2) and the Pupil & Parent Code of Conduct form. Please keep these for your reference throughout the tour.",
        "",
        "## Key Tour Details & Departure Timings",
        "- Departure: Thursday 1st October. Pupils must arrive at Meoncross School promptly at 06:15 for registration, medical handovers, and final bag checks. The coach will depart strictly at 06:30 for our Eurotunnel Le Shuttle crossing at Folkestone.",
        "- Return: Saturday 3rd October. We expect to arrive back at Meoncross School at approximately 20:00. Live journey updates and accurate ETAs will be broadcast via our trip WhatsApp group as we cross the Channel.",
        "- Expedition Base: Peace Village Hostel, Mesen, Belgium (+32 57 226 040 · peacevillage.be). A secure rural educational base with ensuite rooms, secure keycard access, and staff accommodated on the same corridors.",
        "",
        "## Essential Kit & Luggage Reminders",
        "- TOWEL (Mandatory): Pupils MUST pack their own bath/shower towel. The hostel does not supply towels for student groups.",
        "- Sanctuary Wood Muddy Trenches: The authentic preserved frontline trenches at Hill 62 are genuinely muddy. Every pupil MUST bring a pair of wellington boots or sturdy walking boots, plus a strong plastic bag (or bin liner) in their daypack to seal away muddy boots before boarding the coach. Clean trainers/shoes must be packed for hostel wear.",
        "- Outerwear & Layers: A hooded waterproof coat is essential. Standing still at the 8:00 PM Menin Gate Last Post ceremony can get very cold in October, so pupils must pack a warm fleece, hat, and gloves.",
        "- Luggage Limits: One main holdall or suitcase (under 15kg) for the coach luggage hold, plus one small daypack to keep inside the coach. Roll-on deodorant only (strictly NO aerosols, as they trigger hostel fire alarms).",
        "- European 2-Pin Plug Adapter: Required for charging devices in bedrooms.",
        "",
        "## Food & Spending Money (Euros)",
        "- Thursday Journey (Day 1): Please provide a substantial packed lunch and snacks from home in your child's daypack for the coach journey (we do not stop for motorway fast food). A refillable water bottle is essential.",
        "- Spending Money (€30–€40 cash in Euros): Pupils will need cash for two supervised lunch stops in Ypres and Poperinge (buying fresh rolls/fruit at local supermarkets) and for gifts at De Groote’s artisan chocolatier on the Grote Markt.",
        "",
        "## Mobile Phone & Communication Policy",
        "- Daytime Use: Pupils may use mobile phones during the day for taking photographs and accessing our interactive digital tour guide.",
        "- Evening Curfew: To ensure pupils are well-rested for full days in the field, all mobile phones will be collected in the staff lockbag each evening at bedtime and safely returned the following morning.",
        "- Trip WhatsApp Broadcast Group: We have set up a staff-to-parent broadcast group to share live journey updates, crossing progress, and daily visit photos. If you have not yet joined, please follow the link in your briefing pack.",
        "",
        "## Important Action Deadlines",
        "- Passports & GHIC/EHIC: Please ensure your child’s valid UK passport (with at least 3 months validity beyond 3rd October) and GHIC/EHIC card are handed to Mr Lovett by Friday 25th September.",
        "- Code of Conduct Agreement: Please sign and return the attached Code of Conduct form by Friday 25th September (noting our strict Nut & Sesame Safety Policy).",
        "- Medications & Medical Forms: Any prescription medicines or travel sickness tablets must be handed to staff on Thursday morning in their original pharmacy packaging, clearly displaying your child's name, dosage, and instructions.",
        "",
        "## Interactive Digital Field Companion",
        "Pupils and parents can explore the full interactive itinerary, cemetery coordinates, historical soldier profiles, and poetry anthology on our dedicated web platform:",
        "🌐 https://meoncross-history.netlify.app (Select 'History Battlefield Tour')",
        "",
        "If you have any questions regarding kit, medical requirements, or travel arrangements, please do not hesitate to contact Mr Lovett directly via the school office.",
        "",
        "Thank you for your continued support in making this landmark educational journey a memorable and safe experience for our pupils.",
        "",
        "Warm regards,",
        "",
        "Ben Lovett\nHead of History\nMeoncross School"
    ]
    
    full_body_paragraphs = cover_note + [""] + parent_email
    full_body_text = "\n".join(full_body_paragraphs)
    
    base_name = "2026-09-14 - Cathy - Ypres Trip Parent Update"
    
    for folder in [EMAILS_DIR, LOCAL_EMAILS_DIR]:
        docx_path = os.path.join(folder, f"{base_name}.docx")
        eml_path = os.path.join(folder, f"{base_name}.eml")
        html_path = os.path.join(folder, f"{base_name}.html")
        txt_path = os.path.join(folder, f"{base_name}.txt")
        
        print(f"Generating email draft assets in: {folder}")
        create_docx_memo(docx_path, recipient, subject, date_str, full_body_paragraphs)
        print(f"  Created DOCX: {docx_path}")
        
        create_eml_file(eml_path, recipient, subject, full_body_text, date_obj)
        print(f"  Created EML: {eml_path}")
        
        create_html_launcher(html_path, recipient, subject, full_body_text, date_str)
        print(f"  Created HTML: {html_path}")
        
        create_txt_file(txt_path, recipient, subject, full_body_text, date_str)
        print(f"  Created TXT: {txt_path}")
        
    print("\nALL ASSETS CREATED SUCCESSFULLY.")

if __name__ == "__main__":
    main()
