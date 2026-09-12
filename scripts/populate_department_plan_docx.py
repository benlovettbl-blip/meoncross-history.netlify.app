import zipfile
import xml.etree.ElementTree as ET
import os

DOCX_PATH = r"G:\My Drive\AAMX\Dep File\Development Plan Template History Dep.docx"
COMPLETED_PATH = r"G:\My Drive\AAMX\Dep File\Development Plan History Dep 2026-27 (Completed).docx"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
ET.register_namespace('w', W_NS)

def make_p(text, bold=False, italic=False, font_size="20", space_after="80"):
    """Create a w:p element with text and formatting."""
    p = ET.Element(f"{{{W_NS}}}p")
    pPr = ET.SubElement(p, f"{{{W_NS}}}pPr")
    sp = ET.SubElement(pPr, f"{{{W_NS}}}spacing")
    sp.set(f"{{{W_NS}}}after", space_after)
    sp.set(f"{{{W_NS}}}line", "240")
    sp.set(f"{{{W_NS}}}lineRule", "auto")
    
    r = ET.SubElement(p, f"{{{W_NS}}}r")
    rPr = ET.SubElement(r, f"{{{W_NS}}}rPr")
    rFonts = ET.SubElement(rPr, f"{{{W_NS}}}rFonts")
    rFonts.set(f"{{{W_NS}}}ascii", "Outfit")
    rFonts.set(f"{{{W_NS}}}hAnsi", "Outfit")
    
    if bold:
        ET.SubElement(rPr, f"{{{W_NS}}}b")
    if italic:
        ET.SubElement(rPr, f"{{{W_NS}}}i")
        
    sz = ET.SubElement(rPr, f"{{{W_NS}}}sz")
    sz.set(f"{{{W_NS}}}val", font_size)
    szCs = ET.SubElement(rPr, f"{{{W_NS}}}szCs")
    szCs.set(f"{{{W_NS}}}val", font_size)
    
    t = ET.SubElement(r, f"{{{W_NS}}}t")
    t.text = text
    return p

def set_cell_content(cell, paragraphs_data):
    """Clear existing paragraphs in a cell (keeping tcPr) and append new formatted paragraphs."""
    tcPr = cell.find(f"{{{W_NS}}}tcPr")
    for child in list(cell):
        if child != tcPr:
            cell.remove(child)
            
    for item in paragraphs_data:
        if isinstance(item, str):
            cell.append(make_p(item))
        elif isinstance(item, tuple):
            txt = item[0]
            bold = item[1] if len(item) > 1 else False
            italic = item[2] if len(item) > 2 else False
            fs = item[3] if len(item) > 3 else "20"
            cell.append(make_p(txt, bold=bold, italic=italic, font_size=fs))

def update_docx():
    print(f"Reading docx from: {DOCX_PATH}")
    with zipfile.ZipFile(DOCX_PATH, 'r') as zin:
        xml_content = zin.read('word/document.xml')
        all_files = {name: zin.read(name) for name in zin.namelist()}

    tree = ET.fromstring(xml_content)
    tables = tree.findall(f".//{{{W_NS}}}tbl")
    
    # Table 1: Metadata
    t1 = tables[0]
    t1_rows = t1.findall(f".//{{{W_NS}}}tr")
    
    # Row 1: Subject -> History
    set_cell_content(t1_rows[0].findall(f".//{{{W_NS}}}tc")[1], [("History", True, False, "22")])
    # Row 2: Owner -> Benjamin Lovett (Head of History)
    set_cell_content(t1_rows[1].findall(f".//{{{W_NS}}}tc")[1], [("Benjamin Lovett (Head of History)", True, False, "22")])
    # Row 3: Date: -> September 2026
    set_cell_content(t1_rows[2].findall(f".//{{{W_NS}}}tc")[1], [("September 2026", False, False, "22")])
    
    # Table 2: Objectives & Actions
    t2 = tables[1]
    t2_rows = t2.findall(f".//{{{W_NS}}}tr")
    
    # Row 2: Academic Achievement (GCSE)
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[0], [
        ("Academic Achievement (GCSE)", True, False, "20"),
        ("(Subject Specific Priority)", False, True, "18")
    ])
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Embed revised Edexcel Paper 1, 2, and 3 exam question structures into classroom teaching (4-mark Consequence PEE stamps, 8-mark Narrative flowcharts, and 8-mark Importance frameworks).", False, False, "18"),
        ("2. Use low-stakes recall quizzes (Do Nows and Flashcard Vault) at the start of lessons to reinforce retention.", False, False, "18")
    ])
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[2], [
        ("• Consistent student completion of structured exam practice in workbooks.", False, False, "18"),
        ("• Positive GCSE outcomes in line with school targets.", False, False, "18")
    ])
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[3], [
        ("Ongoing 2026-27", False, False, "18")
    ])
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Row 3: Aspirational Curriculum
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[0], [
        ("Aspirational Curriculum", True, False, "20"),
        ("(Linked to SIP Strategic Aim 2: Coastal Learning & Progression)", False, True, "18")
    ])
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Teach a sequenced 5-year curriculum linking national and global history with local Hampshire context (Henry Cort at Funtley, Portsmouth Royal Dockyard, and Stubbington's Great War memorials).", False, False, "18"),
        ("2. Use pure paragraph indexing [Act.Paragraph] in lesson materials to give pupils clear chronological and cognitive structure.", False, False, "18")
    ])
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[2], [
        ("• Department Schemes of Work published and followed.", False, False, "18"),
        ("• Pupils demonstrate secure chronological understanding and engagement with local history.", False, False, "18")
    ])
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[3], [
        ("Ongoing 2026-27", False, False, "18")
    ])
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Row 4: Co-Curriculum, Clubs & Trips
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[0], [
        ("Co-Curriculum & Clubs", True, False, "20"),
        ("(Linked to SIP Strategic Aim 2 & 4: Opportunities Beyond Classroom)", False, True, "18")
    ])
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Run the weekly Meoncross Chess Club, encouraging house participation and tactical play.", False, False, "18"),
        ("2. Plan and deliver the biannual GCSE Ypres Battlefield Tour to support Paper 1 Western Front depth study.", False, False, "18"),
        ("3. Support pupil entries into the annual Hampshire Archives Local History Competition.", False, False, "18")
    ])
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[2], [
        ("• Regular pupil attendance at Chess Club.", False, False, "18"),
        ("• Successful delivery of the Ypres Battlefield Tour.", False, False, "18")
    ])
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[3], [
        ("Ongoing 2026-27", False, False, "18")
    ])
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Row 5: Adaptive Teaching & SEND
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[0], [
        ("Adaptive Teaching & SEND", True, False, "20"),
        ("(Linked to SIP Strategic Aim 1 & 2: Inclusive Practice & High Expectations)", False, True, "18")
    ])
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Use printed workbooks paired with digital resources to support SEND pupils with 3-tier scaffolding (Bronze sentence starters, Silver connectives, Gold evaluation).", False, False, "18"),
        ("2. Utilize digital accessibility tools (SEN dyslexia mode, adjustable read-aloud speed, visual dual coding) to offload working memory.", False, False, "18")
    ])
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[2], [
        ("• SEND pupils access curriculum tasks with appropriate scaffolding.", False, False, "18"),
        ("• Reduced teacher planning workload through pre-formatted, standardized resources.", False, False, "18")
    ])
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[3], [
        ("Embedded in practice", False, False, "18")
    ])
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Row 6: SMSC & British Values
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[0], [
        ("SMSC & British Values", True, False, "20"),
        ("(Linked to SIP Strategic Aim 3: Community & Personal Development)", False, True, "18")
    ])
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Cover British Values, democracy, and ethical issues naturally through curriculum topics (e.g. Peasants' Revolt 1381, civil rights, ethical debates on public health).", False, False, "18"),
        ("2. Record departmental curriculum touchpoints on Gridmaker termly as required by school policy.", False, False, "18")
    ])
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[2], [
        ("• Key topics logged on Gridmaker as required.", False, False, "18"),
        ("• Pupils engage thoughtfully with ethical and moral questions in class discussions.", False, False, "18")
    ])
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[3], [
        ("Termly as needed", False, False, "18")
    ])
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Re-serialize XML
    new_xml = ET.tostring(tree, encoding='utf-8', xml_declaration=True)
    all_files['word/document.xml'] = new_xml
    
    # Save to completed file
    with zipfile.ZipFile(COMPLETED_PATH, 'w', zipfile.ZIP_DEFLATED) as zout:
        for name, data in all_files.items():
            zout.writestr(name, data)
    print(f"[SUCCESS] Streamlined, low-workload development plan saved to: {COMPLETED_PATH}")

    # Try saving to original path if not locked
    try:
        with zipfile.ZipFile(DOCX_PATH, 'w', zipfile.ZIP_DEFLATED) as zout:
            for name, data in all_files.items():
                zout.writestr(name, data)
        print(f"[SUCCESS] Also successfully updated original: {DOCX_PATH}")
    except PermissionError:
        print(f"[INFO] Note: Original template is open in Word. Updated version is in: {COMPLETED_PATH}")

if __name__ == '__main__':
    update_docx()
