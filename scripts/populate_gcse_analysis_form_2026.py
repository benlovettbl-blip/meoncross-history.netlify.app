import os
import zipfile
import shutil
import xml.etree.ElementTree as ET

DIR_PATH = r"G:\My Drive\AAMX\Dep File\GCSE Edexcel History June 2026 Exam analysis"
TEMPLATE_PATH = os.path.join(DIR_PATH, "GCSE Analysis form 2026.docx.bak")
TARGET_PATH = os.path.join(DIR_PATH, "GCSE Analysis form 2026.docx")
BACKUP_PATH = os.path.join(DIR_PATH, "GCSE Analysis form 2026_previous_ai.docx.bak")

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
ET.register_namespace('w', W_NS)

def make_p(text, bold=False, italic=False, font_size="20", space_before="0", space_after="60", align="left"):
    """Create a w:p element with text and formatting."""
    p = ET.Element(f"{{{W_NS}}}p")
    pPr = ET.SubElement(p, f"{{{W_NS}}}pPr")
    
    if align != "left":
        jc = ET.SubElement(pPr, f"{{{W_NS}}}jc")
        jc.set(f"{{{W_NS}}}val", align)
        
    sp = ET.SubElement(pPr, f"{{{W_NS}}}spacing")
    sp.set(f"{{{W_NS}}}before", space_before)
    sp.set(f"{{{W_NS}}}after", space_after)
    sp.set(f"{{{W_NS}}}line", "240")
    sp.set(f"{{{W_NS}}}lineRule", "auto")
    
    rPr_p = ET.SubElement(pPr, f"{{{W_NS}}}rPr")
    rFonts_p = ET.SubElement(rPr_p, f"{{{W_NS}}}rFonts")
    rFonts_p.set(f"{{{W_NS}}}ascii", "Calibri")
    rFonts_p.set(f"{{{W_NS}}}hAnsi", "Calibri")
    sz_p = ET.SubElement(rPr_p, f"{{{W_NS}}}sz")
    sz_p.set(f"{{{W_NS}}}val", font_size)
    szCs_p = ET.SubElement(rPr_p, f"{{{W_NS}}}szCs")
    szCs_p.set(f"{{{W_NS}}}val", font_size)
    
    if text:
        r = ET.SubElement(p, f"{{{W_NS}}}r")
        rPr = ET.SubElement(r, f"{{{W_NS}}}rPr")
        rFonts = ET.SubElement(rPr, f"{{{W_NS}}}rFonts")
        rFonts.set(f"{{{W_NS}}}ascii", "Calibri")
        rFonts.set(f"{{{W_NS}}}hAnsi", "Calibri")
        
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
        if text.startswith(" ") or text.endswith(" "):
            t.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
            
    return p

def set_cell_simple(cell, items, default_fs="20"):
    """Set paragraphs for a simple cell without a nested table."""
    tcPr = cell.find(f"{{{W_NS}}}tcPr")
    for child in list(cell):
        if child != tcPr:
            cell.remove(child)
            
    if not items:
        cell.append(make_p("", font_size=default_fs))
        return
        
    for item in items:
        if isinstance(item, str):
            cell.append(make_p(item, font_size=default_fs))
        elif isinstance(item, tuple):
            txt = item[0]
            bold = item[1] if len(item) > 1 else False
            italic = item[2] if len(item) > 2 else False
            fs = item[3] if len(item) > 3 else default_fs
            align = item[4] if len(item) > 4 else "left"
            sa = item[5] if len(item) > 5 else "60"
            cell.append(make_p(txt, bold=bold, italic=italic, font_size=fs, space_after=sa, align=align))

def populate_nested_table(tbl, table_data, font_size="18"):
    """Populate cells of an existing nested table."""
    rows = [r for r in tbl if r.tag == f"{{{W_NS}}}tr"]
    for r_idx, row_vals in enumerate(table_data):
        if r_idx < len(rows):
            r = rows[r_idx]
            cells = [c for c in r if c.tag == f"{{{W_NS}}}tc"]
            for c_idx, val in enumerate(row_vals):
                if c_idx < len(cells) and val is not None:
                    c = cells[c_idx]
                    is_header = (r_idx == 0)
                    is_label = (c_idx == 0)
                    is_bold = is_header or is_label
                    align = "left" if is_label and not is_header else "center"
                    set_cell_simple(c, [(val, is_bold, False, font_size, align, "20")], default_fs=font_size)

def populate_form():
    # Save a backup of the current file if not already saved
    if os.path.exists(TARGET_PATH) and not os.path.exists(BACKUP_PATH):
        shutil.copy2(TARGET_PATH, BACKUP_PATH)
        print(f"Backed up current file to {BACKUP_PATH}")
        
    print(f"Reading template from {TEMPLATE_PATH}")
    with zipfile.ZipFile(TEMPLATE_PATH, 'r') as zin:
        xml_content = zin.read('word/document.xml')
        all_files = {name: zin.read(name) for name in zin.namelist()}
        
    tree = ET.fromstring(xml_content)
    body = tree.find(f"{{{W_NS}}}body")
    main_tbl = [c for c in body if c.tag == f"{{{W_NS}}}tbl"][0]
    rows = [r for r in main_tbl if r.tag == f"{{{W_NS}}}tr"]
    print(f"Found {len(rows)} rows in main table.")
    
    # -------------------------------------------------------------
    # ROW 0-2: METADATA
    # -------------------------------------------------------------
    # R0 C0: Subject area: History
    r0_c0 = [c for c in rows[0] if c.tag == f"{{{W_NS}}}tc"][0]
    set_cell_simple(r0_c0, [("Subject area: History", True, False, "20")])
    
    # R0 C1: Subject teachers: Department Lead
    r0_c1 = [c for c in rows[0] if c.tag == f"{{{W_NS}}}tc"][1]
    set_cell_simple(r0_c1, [("Subject teachers: Department Lead", True, False, "20")])
    
    # R1 C0: Qualification(s) and course codes: Edexcel GCSE History (1HI0 HW)
    r1_c0 = [c for c in rows[1] if c.tag == f"{{{W_NS}}}tc"][0]
    set_cell_simple(r1_c0, [("Qualification(s) and course codes: Edexcel GCSE History (1HI0 HW)", False, False, "20")])
    
    # R1 C1: Form completed by: Department Lead
    r1_c1 = [c for c in rows[1] if c.tag == f"{{{W_NS}}}tc"][1]
    set_cell_simple(r1_c1, [("Form completed by: Department Lead", False, False, "20")])
    
    # R2 C0: Date of completion: September 2026
    r2_c0 = [c for c in rows[2] if c.tag == f"{{{W_NS}}}tc"][0]
    set_cell_simple(r2_c0, [("Date of completion: September 2026", False, False, "20")])
    
    # R2 C1: Date of results analysis meeting: September 2026
    r2_c1 = [c for c in rows[2] if c.tag == f"{{{W_NS}}}tc"][1]
    set_cell_simple(r2_c1, [("Date of results analysis meeting: September 2026", False, False, "20")])
    
    # -------------------------------------------------------------
    # ROW 4: NOTEWORTHY PUPIL SUCCESS
    r4_cells = [c for c in rows[4] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r4_cells[1], [
        ("Charlotte Grant (Grade 9, FFT 6.1, VA +2.9) and Denys Boiko (Grade 9, FFT 6.2, VA +2.8). Both excelled through strong 16-mark essay technique and regular retrieval.", False, False, "20")
    ])
    set_cell_simple(r4_cells[2], [
        ("Continue timed 16-mark essay practice in class to push Grade 8s to 9.", False, False, "20")
    ])
    
    # -------------------------------------------------------------
    # ROW 5: YEAR 11 PUPILS OF CONCERN PERFORMANCE
    # -------------------------------------------------------------
    r5_cells = [c for c in rows[5] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r5_cells[1], [
        ("Dylan Parker (Grade 6, FFT 4.2, VA +1.8) and Christopher Davis (Grade 6, FFT 5.0, VA +1.0). Both made strong progress via targeted question scaffolding.", False, False, "20")
    ])
    set_cell_simple(r5_cells[2], [
        ("Use targeted 4-mark and 8-mark scaffolds early in Year 11 before mocks.", False, False, "20")
    ])
    
    # -------------------------------------------------------------
    # ROW 6: HEADLINE FIGURES & NESTED TABLE (PAGE 2)
    # -------------------------------------------------------------
    r6_cells = [c for c in rows[6] if c.tag == f"{{{W_NS}}}tc"]
    r6_nt = [n for n in r6_cells[1] if n.tag == f"{{{W_NS}}}tbl"][0]
    r6_table_data = [
        ["Grade awarded", "Nr of pupils", "% of cohort", "National Average"],
        ["8+", "5", "29.4%", "-"],
        ["7+", "7", "41.2%", "-"],
        ["5+", "16", "94.1%", "-"],
        ["4+", "17", "100.0%", "-"],
        ["Total", "17", "100.0%", "100.0%"]
    ]
    populate_nested_table(r6_nt, r6_table_data, font_size="18")
    
    # Clean surrounding paragraphs in Cell 1 (keeping tcPr and r6_nt)
    tcPr = r6_cells[1].find(f"{{{W_NS}}}tcPr")
    for child in list(r6_cells[1]):
        if child != tcPr and child != r6_nt:
            r6_cells[1].remove(child)
            
    # Add heading before table
    p_head = make_p("Headline Figures", bold=True, font_size="20", space_after="30")
    r6_cells[1].insert(list(r6_cells[1]).index(r6_nt), p_head)
    
    # Add summary and notable pupils after table
    r6_cells[1].append(make_p(
        "Whole cohort (17 pupils): 100% 4+ (vs FFT50 85%), 94.1% 5+ (vs FFT50 73.5%), and 41.2% 7+ (vs FFT50 28.5%). Subject VA: +1.10 (average grade 6.47).",
        bold=False, font_size="18", space_before="40", space_after="20"
    ))
    r6_cells[1].append(make_p("Notable VA progress:", bold=True, font_size="18", space_after="10"))
    r6_cells[1].append(make_p(
        "Denys Boiko (Gr 9, VA +2.8), Charlotte Grant (Gr 9, VA +2.9), Connor Brew (Gr 8, VA +3.0 after remark from Gr 7), Matthew Whittaker (Gr 7, VA +2.6), Dylan Parker (Gr 6, VA +1.8).",
        bold=False, font_size="18", space_after="30"
    ))
    
    set_cell_simple(r6_cells[2], [
        ("Embed 4-mark and 8-mark writing frames in booklets to maintain positive VA.", False, False, "20")
    ])
    
    # -------------------------------------------------------------
    # ROW 8: COMPARING NOTABLE GROUPS & NESTED TABLE (PAGE 3)
    # -------------------------------------------------------------
    r8_cells = [c for c in rows[8] if c.tag == f"{{{W_NS}}}tc"]
    r8_nt = [n for n in r8_cells[1] if n.tag == f"{{{W_NS}}}tbl"][0]
    r8_table_data = [
        ["2026", "Overall", "Male", "Female", "Pupils with SEND", "Pupils without SEND", "Mid-phase joiners", "Non-mid-phase joiners"],
        ["Average Grade", "6.47", "6.40", "6.57", "6.14", "6.70", "6.25", "6.67"],
        ["VA", "+1.10", "+1.08", "+1.14", "+1.03", "+1.15", "+0.81", "+1.35"]
    ]
    populate_nested_table(r8_nt, r8_table_data, font_size="18")
    
    # Clean surrounding paragraphs in Cell 1
    tcPr = r8_cells[1].find(f"{{{W_NS}}}tcPr")
    for child in list(r8_cells[1]):
        if child != tcPr and child != r8_nt:
            r8_cells[1].remove(child)
            
    r8_cells[1].append(make_p(
        "Positive VA across all groups: Girls +1.14, Boys +1.08. SEND pupils (7) achieved +1.03 VA and 100% 4+. Mid-phase joiners (8) achieved +0.81 VA (lifted by Connor Brew's remark to Gr 8) vs +1.35 for non-MPJ.",
        bold=False, font_size="18", space_before="40", space_after="20"
    ))
    
    set_cell_simple(r8_cells[2], [
        ("Use early baseline assessments for mid-phase joiners to close the progress gap.", False, False, "20")
    ])
    
    # -------------------------------------------------------------
    # ROW 9: MORE ABLE PUPILS (G&T)
    # -------------------------------------------------------------
    r9_cells = [c for c in rows[9] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r9_cells[1], [
        ("High-prior attainers performed strongly: Charlotte Grant (Grade 9, VA +2.9) and Toby Jones (Grade 8, VA +0.8).", False, False, "20")
    ])
    set_cell_simple(r9_cells[2], [
        ("Use stretch vocabulary banks to help convert Grade 7s to 8/9.", False, False, "20")
    ])
    
    # -------------------------------------------------------------
    # ROW 10: EAL PUPILS (DENYS BOIKO)
    # -------------------------------------------------------------
    r10_cells = [c for c in rows[10] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r10_cells[1], [
        ("Denys Boiko achieved Grade 9 (FFT 6.2, VA +2.8). Supported with bilingual glossaries and structured writing frames.", False, False, "20")
    ])
    set_cell_simple(r10_cells[2], [
        ("Continue providing bilingual glossaries and writing stems for EAL pupils.", False, False, "20")
    ])
    
    # -------------------------------------------------------------
    # ROW 12: GRADE 3 AND BELOW
    # -------------------------------------------------------------
    r12_cells = [c for c in rows[12] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r12_cells[1], [
        ("Zero pupils achieved Grade 3 or below (100% 4-9). Lowest grade was Grade 4 (Philip Waller, FFT 5.4), securing a standard pass.", False, False, "20")
    ])
    set_cell_simple(r12_cells[2], [
        ("Maintain 100% pass rate by monitoring any pupil attendance dropping below 90%.", False, False, "20")
    ])
    
    # -------------------------------------------------------------
    # ROW 15: YEAR 10 (RISING YEAR 11) CWA & OTF ANALYSIS & NESTED TABLE
    # -------------------------------------------------------------
    r15_cells = [c for c in rows[15] if c.tag == f"{{{W_NS}}}tc"]
    r15_nt = [n for n in r15_cells[1] if n.tag == f"{{{W_NS}}}tbl"][0]
    r15_table_data = [
        ["CWA", "%", "OTF", "%"],
        ["4+", "78.6%", "4+", "85.7%"],
        ["5+", "78.6%", "5+", "78.6%"],
        ["7+", "35.7%", "7+", "42.9%"],
        ["", "", "VA for OTF for cohort", "+0.62"]
    ]
    populate_nested_table(r15_nt, r15_table_data, font_size="18")
    
    # Clean surrounding paragraphs in Cell 1
    tcPr = r15_cells[1].find(f"{{{W_NS}}}tcPr")
    for child in list(r15_cells[1]):
        if child != tcPr and child != r15_nt:
            r15_cells[1].remove(child)
            
    r15_cells[1].append(make_p(
        "Rising Year 11 cohort benchmarked against FFT 20. Projected OTF 7+ is 42.9% (6 pupils: Baker [8], Corlette [8], Cripps [7], Frey [8], Hyde [9], Young [7]), well above FFT 20 target of 28.6%. OTF 5+ is 78.6% (Henderson, Lubbe, Smith, Vest, Wright all on 6). Target intervention focused on Elise Longman (CWA 3, OTF 4).",
        bold=False, font_size="18", space_before="40", space_after="20"
    ))
    
    set_cell_simple(r15_cells[2], [
        ("Use targeted revision and retrieval packs for pupils on the Grade 4/5 boundary to secure 5+.", False, False, "20")
    ])
    
    # -------------------------------------------------------------
    # ROW 17: PUPILS OF CONCERN (YEAR 10 RISING YEAR 11)
    # -------------------------------------------------------------
    r17_cells = [c for c in rows[17] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r17_cells[1], [
        ("1. Elise Longman: FFT Target 5, OTF 4, CWA 3, ATL D, Assessment 25%. Underperforming against target with low assessment retention.", False, False, "18")
    ])
    set_cell_simple(r17_cells[2], [
        ("Encourage attendance but also engagement in lessons, move to front positive reinforcement needed; already done she is working better. I recommend she is highlighted to ALL teachers as a ‘ghost’ pupil as she has hidden ability I think.", False, False, "18")
    ])
    
    # -------------------------------------------------------------
    # ROW 19: MEETING DATE & ATTENDANCE
    # -------------------------------------------------------------
    r19_cells = [c for c in rows[19] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r19_cells[0], [("Date: September 2026", True, False, "20")])
    set_cell_simple(r19_cells[1], [("In attendance: Benjamin Lovett (Head of History), SLT Line Manager and Headteacher", True, False, "20")])
    
    # -------------------------------------------------------------
    # ROW 21: MEETING NOTES & ACTIONS
    # -------------------------------------------------------------
    r21_cells = [c for c in rows[21] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r21_cells[0], [
        ("1. 2026 outcomes validated: 100% 4+, 94.1% 5+, 41.2% 7+ (29.4% at Grade 8+ post-remark), VA +1.10. Strong progress across boys, girls and SEND.", False, False, "18", "left", "20"),
        ("2. Year 10 into 11 reviewed against FFT 20: 85.7% OTF 4+ and +0.62 OTF VA.", False, False, "18", "left", "20"),
        ("3. Pupil of concern for targeted intervention: Elise Longman (Drew and Bishop have discontinued History).", False, False, "18", "left", "20")
    ])
    set_cell_simple(r21_cells[1], [
        ("Launch targeted Year 11 intervention sessions and track attendance and mock performance for Elise Longman.", False, False, "20")
    ])
    
    # -------------------------------------------------------------
    # WRITE OUT TARGET DOCX
    # -------------------------------------------------------------
    new_xml = ET.tostring(tree, encoding='utf-8', xml_declaration=True)
    all_files['word/document.xml'] = new_xml
    
    temp_target = TARGET_PATH + ".tmp"
    with zipfile.ZipFile(temp_target, 'w', zipfile.ZIP_DEFLATED) as zout:
        for name, data in all_files.items():
            zout.writestr(name, data)
            
    if os.path.exists(TARGET_PATH):
        os.remove(TARGET_PATH)
    os.rename(temp_target, TARGET_PATH)
    print(f"Successfully generated {TARGET_PATH}")

if __name__ == "__main__":
    populate_form()
