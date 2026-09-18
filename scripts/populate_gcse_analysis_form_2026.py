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
    # -------------------------------------------------------------
    r4_cells = [c for c in rows[4] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r4_cells[1], [
        ("Charlotte Grant achieved Grade 9 (FFT50 6.08 | VA +2.92) and Denys Boiko achieved Grade 9 (FFT50 6.17 | VA +2.83). Both secured top grades through mastery of 16-mark evaluative essays and disciplined retrieval practice.", False, False, "19")
    ])
    set_cell_simple(r4_cells[2], [
        ("Embed timed 16-mark essay practice in lessons to secure consistent conversion of Grade 8 pupils to Grade 9.", False, False, "19")
    ])
    
    # -------------------------------------------------------------
    # ROW 5: YEAR 11 PUPILS OF CONCERN PERFORMANCE
    # -------------------------------------------------------------
    r5_cells = [c for c in rows[5] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r5_cells[1], [
        ("Dylan Parker achieved Grade 6 (FFT50 4.24 | VA +1.76) and Christopher Davis achieved Grade 6 (FFT50 5.03 | VA +0.97). Targeted scaffolding for 8-mark questions and weekly recall booklets secured strong positive progress.", False, False, "19")
    ])
    set_cell_simple(r5_cells[2], [
        ("Deploy targeted 4-mark and 8-mark question scaffolding early in Year 11 ahead of mock examinations.", False, False, "19")
    ])
    
    # -------------------------------------------------------------
    # ROW 6: HEADLINE FIGURES & NESTED TABLE (PAGE 2)
    # -------------------------------------------------------------
    r6_cells = [c for c in rows[6] if c.tag == f"{{{W_NS}}}tc"]
    r6_nt = [n for n in r6_cells[1] if n.tag == f"{{{W_NS}}}tbl"][0]
    r6_table_data = [
        ["Grade awarded", "Nr of pupils", "% of cohort", "National Average"],
        ["8+", "4", "23.5%", "-"],
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
    p_head = make_p("Headline Figures", bold=True, font_size="20", space_after="40")
    r6_cells[1].insert(list(r6_cells[1]).index(r6_nt), p_head)
    
    # Add summary and notable pupils after table
    r6_cells[1].append(make_p(
        "Whole cohort (17 pupils) achieved 100% 4+ (vs FFT50 85.0%), 94.1% 5+ (vs FFT50 73.5%), and 41.2% 7+ (vs FFT50 28.5%). Overall Subject VA: +1.04.",
        bold=False, font_size="18", space_before="60", space_after="40"
    ))
    r6_cells[1].append(make_p("Pupils with notable VA success:", bold=True, font_size="18", space_after="20"))
    r6_cells[1].append(make_p(
        "Denys Boiko (Gr 9 | VA +2.83), Charlotte Grant (Gr 9 | VA +2.92), Matthew Whittaker (Gr 7 | VA +2.60), Connor Brew (Gr 7 | VA +2.01), Dylan Parker (Gr 6 | VA +1.76).",
        bold=False, font_size="18", space_after="40"
    ))
    
    # Cell 2: strictly ONE point!
    set_cell_simple(r6_cells[2], [
        ("Embed 4-mark Consequence and 8-mark Narrative writing frames in workbooks to sustain positive cohort VA.", False, False, "19")
    ])
    
    # -------------------------------------------------------------
    # ROW 8: COMPARING NOTABLE GROUPS & NESTED TABLE (PAGE 3)
    # -------------------------------------------------------------
    r8_cells = [c for c in rows[8] if c.tag == f"{{{W_NS}}}tc"]
    r8_nt = [n for n in r8_cells[1] if n.tag == f"{{{W_NS}}}tbl"][0]
    r8_table_data = [
        ["2026", "Overall", "Male", "Female", "Pupils with SEND", "Pupils without SEND", "Mid-phase joiners", "Non-mid-phase joiners"],
        ["Average Grade", "6.41", "6.30", "6.57", "6.14", "6.60", "6.13", "6.67"],
        ["VA", "+1.04", "+0.98", "+1.14", "+1.03", "+1.05", "+0.69", "+1.35"]
    ]
    populate_nested_table(r8_nt, r8_table_data, font_size="17")
    
    # Clean surrounding paragraphs in Cell 1
    tcPr = r8_cells[1].find(f"{{{W_NS}}}tcPr")
    for child in list(r8_cells[1]):
        if child != tcPr and child != r8_nt:
            r8_cells[1].remove(child)
            
    # Add concise commentary after table
    r8_cells[1].append(make_p(
        "Positive value-added across all subgroups. Girls achieved +1.14 VA and Boys achieved +0.98 VA. SEND pupils (7) secured +1.03 VA and a 100% 4+ pass rate. Mid-phase joiners (8) achieved +0.69 VA versus +1.35 for non-mid-phase joiners.",
        bold=False, font_size="18", space_before="60", space_after="40"
    ))
    
    # Cell 2: strictly ONE point!
    set_cell_simple(r8_cells[2], [
        ("Target mid-phase joiners with baseline diagnostic assessments upon entry to close the 0.66 VA progress gap.", False, False, "19")
    ])
    
    # -------------------------------------------------------------
    # ROW 9: MORE ABLE PUPILS (G&T)
    # -------------------------------------------------------------
    r9_cells = [c for c in rows[9] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r9_cells[1], [
        ("High-prior attainers achieved strong outcomes: Charlotte Grant (Grade 9 | VA +2.92) and Toby Jones (Grade 8 | VA +0.78). Advanced source evaluation scaffolds and historiographical prompts enabled top grades.", False, False, "19")
    ])
    set_cell_simple(r9_cells[2], [
        ("Introduce stretch historiography extracts and academic vocabulary banks to push Grade 7 students to Grade 8/9.", False, False, "19")
    ])
    
    # -------------------------------------------------------------
    # ROW 10: EAL PUPILS (DENYS BOIKO)
    # -------------------------------------------------------------
    r10_cells = [c for c in rows[10] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r10_cells[1], [
        ("Denys Boiko achieved Grade 9 (FFT50 6.17 | VA +2.83). Dual-language glossaries, structured sentence stems, and visual dual-coding in workbooks supported exceptional language acquisition and exam performance.", False, False, "19")
    ])
    set_cell_simple(r10_cells[2], [
        ("Maintain dual-language glossaries and structured writing stems for future EAL admissions.", False, False, "19")
    ])
    
    # -------------------------------------------------------------
    # ROW 12: GRADE 3 AND BELOW
    # -------------------------------------------------------------
    r12_cells = [c for c in rows[12] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r12_cells[1], [
        ("Zero pupils achieved Grade 3 or below (100% 4-9 pass rate). The lowest grade awarded was Grade 4 (Philip Waller | FFT50 5.43), successfully securing a standard pass.", False, False, "19")
    ])
    set_cell_simple(r12_cells[2], [
        ("Maintain zero Grade 1-3 outcomes by triggering immediate department intervention if pupil attendance falls below 90%.", False, False, "19")
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
            
    # Add concise commentary after table
    r15_cells[1].append(make_p(
        "Rising Year 11 cohort (14 pupils) benchmarked against FFT 20 estimates. Projected OTF 7+ is 42.9% (6 pupils: Baker, Corlette, Cripps, Frey, Hyde, Young), exceeding the FFT 20 target of 28.6% (4 pupils). Overall cohort OTF VA is +0.62.",
        bold=False, font_size="18", space_before="60", space_after="40"
    ))
    
    # Cell 2: strictly ONE point!
    set_cell_simple(r15_cells[2], [
        ("Provide structured Paper 3 USA retrieval packs for pupils on the Grade 4/5 boundary to secure 5+ attainment.", False, False, "19")
    ])
    
    # -------------------------------------------------------------
    # ROW 17: PUPILS OF CONCERN (YEAR 10 RISING YEAR 11)
    # -------------------------------------------------------------
    r17_cells = [c for c in rows[17] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r17_cells[1], [
        ("1. Sylvie Drew: FFT 20 Target 4 | OTF 1 | CWA 1 | ATL D | Assessment 8%. Significant underachievement and engagement concern.", False, False, "18", "left", "30"),
        ("2. Elise Longman: FFT 20 Target 5 | OTF 4 | CWA 3 | ATL D | Assessment 25%. Underperforming against target with low assessment retention.", False, False, "18", "left", "30"),
        ("3. Tobias Bishop: FFT 20 Target 6 | OTF UC | CWA UC | Assessment 0%. Unclassified due to missing assessments and attendance concerns.", False, False, "18", "left", "30")
    ])
    # Cell 2: Interventions planned - strictly ONE point!
    set_cell_simple(r17_cells[2], [
        ("Implement bi-weekly supervised catch-up sessions and targeted 4-mark writing scaffolds for Drew and Longman, alongside attendance monitoring and parental liaison for Bishop.", False, False, "19")
    ])
    
    # -------------------------------------------------------------
    # ROW 19: MEETING DATE & ATTENDANCE
    # -------------------------------------------------------------
    r19_cells = [c for c in rows[19] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r19_cells[0], [("Date: September 2026", True, False, "20")])
    set_cell_simple(r19_cells[1], [("In attendance: Department Lead (Head of History), SLT Line Manager", True, False, "20")])
    
    # -------------------------------------------------------------
    # ROW 21: MEETING NOTES & ACTIONS
    # -------------------------------------------------------------
    r21_cells = [c for c in rows[21] if c.tag == f"{{{W_NS}}}tc"]
    set_cell_simple(r21_cells[0], [
        ("1. 2026 outcomes validated: 100% 4+, 94.1% 5+, 41.2% 7+, VA +1.04. Strong positive progress across both genders and SEND.", False, False, "18", "left", "30"),
        ("2. Year 10 transition into Year 11 reviewed against FFT 20: 85.7% OTF 4+ and +0.62 OTF VA.", False, False, "18", "left", "30"),
        ("3. Three pupils of concern identified for targeted intervention (Drew, Longman, Bishop).", False, False, "18", "left", "30")
    ])
    # Cell 1: Actions - strictly ONE point!
    set_cell_simple(r21_cells[1], [
        ("Launch Year 11 targeted intervention sessions and track attendance and mock performance for the 3 identified pupils of concern.", False, False, "19")
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
