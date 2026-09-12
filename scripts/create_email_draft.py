import os
import sys
import zipfile
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime

EMAILS_DIR = r"G:\My Drive\AAMX\Dep File\Emails"
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
        
    # Build a clean body
    root = ET.Element(f"{{{W_NS}}}document")
    body = ET.SubElement(root, f"{{{W_NS}}}body")
    
    # Title
    body.append(make_p([("MEONCROSS SCHOOL | HISTORY DEPARTMENT", True, False, "20", "64748b")], space_after="60"))
    body.append(make_p([("Department Email / Memorandum Draft", True, False, "32", "0f172a")], space_after="200"))
    
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
        ("STATUS: ", True, False, "22", "0f172a"),
        ("Ready to Send", True, False, "22", "059669")
    ], space_after="100"))
    
    body.append(make_p([
        ("SUBJECT: ", True, False, "22", "0f172a"),
        (f"{subject}", True, False, "22", "1e40af")
    ], space_after="260"))
    
    # Divider
    body.append(make_p([("_______________________________________________________________________________", False, False, "16", "cbd5e1")], space_after="260"))
    
    # Body text
    for para in body_paragraphs:
        if para.strip():
            body.append(make_p([(para.strip(), False, False, "22", "1e293b")], space_after="160"))
            
    # Section Pr (A4 Portrait)
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

def create_eml_file(dest_path, recipient, subject, body_text):
    eml_content = f"""From: Ben Lovett <ben.lovett@meoncross.co.uk>
To: {recipient}
Subject: {subject}
Date: {datetime.now().strftime("%a, %d %b %Y %H:%M:%S +0100")}
MIME-Version: 1.0
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: 8bit

{body_text}
"""
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(eml_content)

def create_txt_file(dest_path, recipient, subject, body_text):
    txt_content = f"""TO: {recipient}
SUBJECT: {subject}
DATE: {datetime.now().strftime("%d/%m/%Y")}
------------------------------------------------------------

{body_text}
"""
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(txt_content)

def create_html_launcher(dest_path, recipient, subject, body_text):
    encoded_subj = urllib.parse.quote(subject)
    encoded_body = urllib.parse.quote(body_text)
    
    # Deeplinks
    mailto_link = f"mailto:?subject={encoded_subj}&body={encoded_body}"
    o365_link = f"https://outlook.office.com/mail/deeplink/compose?subject={encoded_subj}&body={encoded_body}"
    gmail_link = f"https://mail.google.com/mail/?view=cm&fs=1&su={encoded_subj}&body={encoded_body}"
    
    escaped_body_js = body_text.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')
    formatted_body_html = body_text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('\n', '<br>')
    
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
      max-width: 680px;
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
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #93c5fd;
      font-weight: 600;
      margin-bottom: 6px;
    }}
    .header h1 {{
      font-size: 1.3rem;
      font-weight: 700;
      line-height: 1.3;
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
      grid-template-columns: 80px 1fr;
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
      padding: 20px 22px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 0.98rem;
      line-height: 1.65;
      color: #1e293b;
      position: relative;
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
      <button class="btn btn-copy" onclick="copyEmailText()" title="Copy text to clipboard">
        <i class="fa-regular fa-copy"></i> Copy Body
      </button>
    </div>

    <div class="content">
      <div class="meta-grid">
        <div class="meta-label">To:</div>
        <div class="meta-value">{recipient}</div>
        <div class="meta-label">Subject:</div>
        <div class="meta-value" style="font-weight: 700; color: #1e40af;">{subject}</div>
        <div class="meta-label">Date:</div>
        <div class="meta-value">{datetime.now().strftime("%d %B %Y")}</div>
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
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(() => {{
          toast.style.display = 'none';
        }}, 2000);
      }}).catch(err => {{
        alert('Could not auto-copy. Please select and copy manually.');
      }});
    }}
  </script>
</body>
</html>
"""
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

def main():
    os.makedirs(EMAILS_DIR, exist_ok=True)
    
    recipient = "Andy (Site Team)"
    subject = "History Room - Door stop / retainer request"
    date_str = datetime.now().strftime("%d/%m/%Y")
    
    body_paragraphs = [
        "Hi Andy,",
        "Following up on your mention at the whole-staff INSET day about requesting door stops for classrooms:",
        "Could we please request one of the floor-mounted acoustic release door retainers for the History room?",
        "At lesson changeover we get quite a bottleneck with pupils entering and leaving, and with the heavy door closer on, having an automatic retainer that releases if the fire alarm goes off would be really helpful and save holding it manually.",
        "Whenever you have a moment to take a look, that would be great.",
        "Thanks,\nBen\nHead of History"
    ]
    
    full_body_text = "\n\n".join(body_paragraphs)
    
    base_name = "2026-09-12 - Andy - History Room Door Retainer"
    
    docx_path = os.path.join(EMAILS_DIR, f"{base_name}.docx")
    eml_path = os.path.join(EMAILS_DIR, f"{base_name}.eml")
    html_path = os.path.join(EMAILS_DIR, f"{base_name}.html")
    txt_path = os.path.join(EMAILS_DIR, f"{base_name}.txt")
    
    print(f"Generating email draft assets in: {EMAILS_DIR}")
    create_docx_memo(docx_path, recipient, subject, date_str, body_paragraphs)
    print(f"Created DOCX: {docx_path}")
    
    create_eml_file(eml_path, recipient, subject, full_body_text)
    print(f"Created EML: {eml_path}")
    
    create_html_launcher(html_path, recipient, subject, full_body_text)
    print(f"Created HTML: {html_path}")
    
    create_txt_file(txt_path, recipient, subject, full_body_text)
    print(f"Created TXT: {txt_path}")
    
    print("\nALL ASSETS CREATED SUCCESSFULLY IN EMAILS FOLDER.")

if __name__ == "__main__":
    main()
