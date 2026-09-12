import zipfile
import xml.etree.ElementTree as ET
import os
import shutil

DOCX_PATH = r"G:\My Drive\AAMX\Dep File\00_Department_Admin_and_Policies\20260908 - New  OFG Risk assessment History room.docx"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
XML_NS = "http://www.w3.org/XML/1998/namespace"
ET.register_namespace('w', W_NS)

def make_run(text, bold=False, italic=False, size="18", highlight=None, font="Calibri"):
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
    if highlight:
        hl = ET.SubElement(rPr, f"{{{W_NS}}}highlight")
        hl.set(f"{{{W_NS}}}val", highlight)
        
    sz = ET.SubElement(rPr, f"{{{W_NS}}}sz")
    sz.set(f"{{{W_NS}}}val", size)
    szCs = ET.SubElement(rPr, f"{{{W_NS}}}szCs")
    szCs.set(f"{{{W_NS}}}val", size)
    
    t = ET.SubElement(r, f"{{{W_NS}}}t")
    if text.startswith(" ") or text.endswith(" "):
        t.set(f"{{{XML_NS}}}space", "preserve")
    t.text = text
    return r

def make_p(runs_data, space_after="40", line="240", jc=None):
    p = ET.Element(f"{{{W_NS}}}p")
    pPr = ET.SubElement(p, f"{{{W_NS}}}pPr")
    sp = ET.SubElement(pPr, f"{{{W_NS}}}spacing")
    sp.set(f"{{{W_NS}}}after", space_after)
    sp.set(f"{{{W_NS}}}line", line)
    sp.set(f"{{{W_NS}}}lineRule", "auto")
    if jc:
        j = ET.SubElement(pPr, f"{{{W_NS}}}jc")
        j.set(f"{{{W_NS}}}val", jc)
    
    for item in runs_data:
        # item: (text, bold, italic, size, highlight)
        text = item[0]
        bold = item[1] if len(item) > 1 else False
        italic = item[2] if len(item) > 2 else False
        size = item[3] if len(item) > 3 else "18"
        highlight = item[4] if len(item) > 4 else None
        p.append(make_run(text, bold=bold, italic=italic, size=size, highlight=highlight))
    return p

def create_tc(width_dxa, grid_span, paragraphs_data):
    tc = ET.Element(f"{{{W_NS}}}tc")
    tcPr = ET.SubElement(tc, f"{{{W_NS}}}tcPr")
    tcW = ET.SubElement(tcPr, f"{{{W_NS}}}tcW")
    tcW.set(f"{{{W_NS}}}w", str(width_dxa))
    tcW.set(f"{{{W_NS}}}type", "dxa")
    if grid_span > 1:
        gs = ET.SubElement(tcPr, f"{{{W_NS}}}gridSpan")
        gs.set(f"{{{W_NS}}}val", str(grid_span))
        
    tcBorders = ET.SubElement(tcPr, f"{{{W_NS}}}tcBorders")
    for b_name in ['top', 'left', 'bottom', 'right']:
        b = ET.SubElement(tcBorders, f"{{{W_NS}}}{b_name}")
        b.set(f"{{{W_NS}}}val", "single")
        b.set(f"{{{W_NS}}}sz", "4")
        b.set(f"{{{W_NS}}}space", "0")
        b.set(f"{{{W_NS}}}color", "auto")
        
    for p_runs in paragraphs_data:
        tc.append(make_p(p_runs))
    return tc

def build_hazard_row(h_name, h_who, h_existing, h_further, h_whom, h_when, h_done):
    tr = ET.Element(f"{{{W_NS}}}tr")
    
    # 7 cells
    # Cell 0: w=1620, span=1
    tr.append(create_tc(1620, 1, h_name))
    # Cell 1: w=2340, span=2
    tr.append(create_tc(2340, 2, h_who))
    # Cell 2: w=3960, span=2
    tr.append(create_tc(3960, 2, h_existing))
    # Cell 3: w=2880, span=2
    tr.append(create_tc(2880, 2, h_further))
    # Cell 4: w=1152, span=1
    tr.append(create_tc(1152, 1, h_whom))
    # Cell 5: w=1153, span=1
    tr.append(create_tc(1153, 1, h_when))
    # Cell 6: w=1115, span=1
    tr.append(create_tc(1115, 1, h_done))
    
    return tr

def populate_risk_assessment():
    print(f"Opening docx at: {DOCX_PATH}")
    
    with zipfile.ZipFile(DOCX_PATH, 'r') as zin:
        xml_content = zin.read('word/document.xml')
        files_dict = {item.filename: zin.read(item.filename) for item in zin.infolist() if item.filename != 'word/document.xml'}
        
    root = ET.fromstring(xml_content)
    
    # 1. Update Premises / Site Name & Room ID
    for p in root.iter(f"{{{W_NS}}}p"):
        p_text = "".join([t.text for t in p.iter(f"{{{W_NS}}}t") if t.text])
    # 1. Update Premises / Site Name & Room ID
    for p in root.iter(f"{{{W_NS}}}p"):
        p_text = "".join([t.text for t in p.iter(f"{{{W_NS}}}t") if t.text])
        if "Premises/Site Name" in p_text and "Meoncross" in p_text:
            print("Found premises header paragraph. Updating...")
            for child in list(p):
                p.remove(child)
            pPr = ET.SubElement(p, f"{{{W_NS}}}pPr")
            sp = ET.SubElement(pPr, f"{{{W_NS}}}spacing")
            sp.set(f"{{{W_NS}}}after", "120")
            p.append(make_run("Premises/Site Name: ", bold=True, size="20"))
            p.append(make_run("Meoncross School", bold=False, size="20"))
            p.append(make_run("               Risk Assessment ID: ", bold=True, size="20"))
            p.append(make_run("History Room", bold=True, size="20"))
            break
            
    # 2. Table 0: Populate Hazard Rows
    tbl0 = root.findall(f".//{{{W_NS}}}tbl")[0]
    
    # Define the 4 concise, teacher-authentic hazard entries
    # Hazard 1: Classroom Windows
    h1_name = [
        [("Windows / ventilation", True, False, "18")]
    ]
    h1_who = [
        [("Pupils & staff", False, False, "17")]
    ]
    h1_existing = [
        [("Safety restrictors fitted to all opening windows.", False, False, "17")]
    ]
    h1_further = [
        [("Termly catch check.", False, False, "17")]
    ]
    h1_whom = [
        [("BL", False, False, "16")]
    ]
    h1_when = [
        [("Termly", False, False, "16")]
    ]
    h1_done = [
        [("Ongoing", False, False, "16")]
    ]

    # Hazard 2: Classroom Fire Door (Andy's staff INSET offer)
    h2_name = [
        [("Classroom fire door", True, False, "18")]
    ]
    h2_who = [
        [("Pupils & staff (finger trap / door closing in crowd)", False, False, "17")]
    ]
    h2_existing = [
        [("Overhead closer fitted. No wedges used. Door held open by teacher during changeovers.", False, False, "17")]
    ]
    h2_further = [
        [("Request acoustic door stop (as offered by Andy at staff INSET).", False, False, "17")]
    ]
    h2_whom = [
        [("Andy / BL", False, False, "16")]
    ]
    h2_when = [
        [("Sept 2026", False, False, "16")]
    ]
    h2_done = [
        [("Requested", False, False, "16")]
    ]

    # Hazard 3: Slips & Trips (Bags & Coats)
    h3_name = [
        [("Bags & coats (trips)", True, False, "18")]
    ]
    h3_who = [
        [("Pupils & staff", False, False, "17")]
    ]
    h3_existing = [
        [("Bags kept under desks. Main gangways kept clear.", False, False, "17")]
    ]
    h3_further = [
        [("Routine reminder at start of lesson.", False, False, "17")]
    ]
    h3_whom = [
        [("BL", False, False, "16")]
    ]
    h3_when = [
        [("Daily", False, False, "16")]
    ]
    h3_done = [
        [("Ongoing", False, False, "16")]
    ]

    # Hazard 4: Electrical Equipment
    h4_name = [
        [("PC, projector & screen", True, False, "18")]
    ]
    h4_who = [
        [("Pupils & staff", False, False, "17")]
    ]
    h4_existing = [
        [("Annual PAT tested. Cables in trunking. Switched off at wall.", False, False, "17")]
    ]
    h4_further = [
        [("Report any damage to Site Team.", False, False, "17")]
    ]
    h4_whom = [
        [("BL / Andy", False, False, "16")]
    ]
    h4_when = [
        [("Ongoing", False, False, "16")]
    ]
    h4_done = [
        [("Current", False, False, "16")]
    ]

    # Find the index of the header row ('What is the hazard?')
    header_idx = None
    for idx, child in enumerate(list(tbl0)):
        if child.tag == f"{{{W_NS}}}tr":
            txt = "".join([t.text for t in child.findall(f".//{{{W_NS}}}t") if t.text])
            if "What is the hazard?" in txt:
                header_idx = idx
                break
                
    if header_idx is None:
        raise ValueError("Could not find header row in Table 0")
        
    print(f"Found header row at tbl0 child index {header_idx}")
    
    # The empty template row is the tr immediately following header_idx
    template_row = list(tbl0)[header_idx + 1]
    tbl0.remove(template_row)

    # Build the 4 rows
    row_h1 = build_hazard_row(h1_name, h1_who, h1_existing, h1_further, h1_whom, h1_when, h1_done)
    row_h2 = build_hazard_row(h2_name, h2_who, h2_existing, h2_further, h2_whom, h2_when, h2_done)
    row_h3 = build_hazard_row(h3_name, h3_who, h3_existing, h3_further, h3_whom, h3_when, h3_done)
    row_h4 = build_hazard_row(h4_name, h4_who, h4_existing, h4_further, h4_whom, h4_when, h4_done)

    # Insert the 4 hazard rows immediately following header_idx
    tbl0.insert(header_idx + 1, row_h1)
    tbl0.insert(header_idx + 2, row_h2)
    tbl0.insert(header_idx + 3, row_h3)
    tbl0.insert(header_idx + 4, row_h4)
    print("Inserted 4 hazard rows into Table 0 successfully in correct position.")
    
    # Refresh rows list
    rows = tbl0.findall(f"{{{W_NS}}}tr")
    
    # Row 5 (Assessment Date & Completed By)
    row_dates = rows[5]
    cells_dates = row_dates.findall(f"{{{W_NS}}}tc")
    
    # Cell 0: Assessment Date
    c0 = cells_dates[0]
    for p in list(c0.findall(f"{{{W_NS}}}p")):
        c0.remove(p)
    c0.append(make_p([("ASSESSMENT DATE: ", True, False, "18"), ("08/09/2026", False, False, "18")]))
    c0.append(make_p([("COMPLETED BY: ", True, False, "18"), ("B. Lovett (Head of History)", False, False, "18")]))
    
    # Cell 1: Review Date
    c1 = cells_dates[1]
    for p in list(c1.findall(f"{{{W_NS}}}p")):
        c1.remove(p)
    c1.append(make_p([("REVIEW DATE: ", True, False, "18"), ("08/09/2027", False, False, "18")]))
    c1.append(make_p([("COMPLETED BY: ", True, False, "18"), ("B. Lovett / Site Team", False, False, "18")]))

    # Row 6 (Ratings)
    row_ratings = rows[6]
    cells_ratings = row_ratings.findall(f"{{{W_NS}}}tc")
    
    # Cell 0: HSR
    c_hsr = cells_ratings[0]
    for p in list(c_hsr.findall(f"{{{W_NS}}}p")):
        c_hsr.remove(p)
    c_hsr.append(make_p([("HAZARD SEVERITY RATING (HSR)", True, False, "18")]))
    c_hsr.append(make_p([
        ("1   ", False, False, "18"),
        ("[2]", True, False, "18"),
        ("   3   4   5  (Marginal)", False, False, "16")
    ]))
    
    # Cell 1: HPR
    c_hpr = cells_ratings[1]
    for p in list(c_hpr.findall(f"{{{W_NS}}}p")):
        c_hpr.remove(p)
    c_hpr.append(make_p([("HAZARD PROBABILITY RATING (HPR)", True, False, "18")]))
    c_hpr.append(make_p([
        ("1   ", False, False, "18"),
        ("[2]", True, False, "18"),
        ("   3   4   5  (Remote)", False, False, "16")
    ]))
    
    # Cell 2: Calculated Risk
    c_calc = cells_ratings[2]
    for p in list(c_calc.findall(f"{{{W_NS}}}p")):
        c_calc.remove(p)
    c_calc.append(make_p([("CALCULATED RISK RATING", True, False, "18")]))
    c_calc.append(make_p([
        ("(HSR 2) X (HPR 2) = ", False, False, "18"),
        ("4  (Insignificant)", True, False, "18")
    ]))
    
    # Row 8 (Scale of Risk)
    row_scale = rows[8]
    cells_scale = row_scale.findall(f"{{{W_NS}}}tc")
    c_insig = cells_scale[0]
    for p in list(c_insig.findall(f"{{{W_NS}}}p")):
        c_insig.remove(p)
    p_insig = ET.SubElement(c_insig, f"{{{W_NS}}}p")
    pPr = ET.SubElement(p_insig, f"{{{W_NS}}}pPr")
    jc = ET.SubElement(pPr, f"{{{W_NS}}}jc")
    jc.set(f"{{{W_NS}}}val", "center")
    p_insig.append(make_run("[X] INSIGNIFICANT ( 1-4 )", bold=True, size="20"))
    
    # 3. Manager Signature Paragraph
    for p in root.iter(f"{{{W_NS}}}p"):
        p_text = "".join([t.text for t in p.iter(f"{{{W_NS}}}t") if t.text])
        if "Signed: (Manager)" in p_text:
            print("Found manager signature paragraph. Updating...")
            for child in list(p):
                p.remove(child)
            pPr = ET.SubElement(p, f"{{{W_NS}}}pPr")
            sp = ET.SubElement(pPr, f"{{{W_NS}}}spacing")
            sp.set(f"{{{W_NS}}}after", "80")
            sp.set(f"{{{W_NS}}}line", "260")
            p.append(make_run("Signed: (Manager) Name: ", bold=True, size="20"))
            p.append(make_run("B. Lovett   ", bold=False, size="20"))
            p.append(make_run("Signature: ", bold=True, size="20"))
            p.append(make_run("B. Lovett   ", bold=True, italic=True, size="20"))
            p.append(make_run("Date: ", bold=True, size="20"))
            p.append(make_run("08/09/2026", bold=False, size="20"))
            break
            
    # Write updated document.xml back to docx
    updated_xml = ET.tostring(root, encoding='utf-8', xml_declaration=True)
    
    temp_docx = DOCX_PATH + ".temp"
    with zipfile.ZipFile(temp_docx, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
        zout.writestr('word/document.xml', updated_xml)
        for fname, data in files_dict.items():
            zout.writestr(fname, data)
            
    # Replace original with temp
    shutil.move(temp_docx, DOCX_PATH)
    print(f"SUCCESS: Successfully updated and saved Risk Assessment DOCX at: {DOCX_PATH}")

if __name__ == "__main__":
    populate_risk_assessment()
