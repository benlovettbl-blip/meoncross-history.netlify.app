import os
import sys
import copy
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime

DRIVE_MINUTES_DIR = r"G:\My Drive\AAMX\Dep File\Department Meeting Minutes"
LOCAL_MINUTES_DIR = r"c:\Projects\the-history-revision-hub.netlify.app\admin_internal\department_files\Department Meeting Minutes"
TEMPLATE_PATH = r"G:\My Drive\AAMX\Dep File\Department Meeting Minutes\Departmental Mtg Minutes template Sep 2026.docx"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
XML_NS = "http://www.w3.org/XML/1998/namespace"
ET.register_namespace('w', W_NS)

COL_WIDTHS = ["1918", "4532", "2617", "1134"]

def make_run(text, bold=False, italic=False, size="22", color="000000", font="Calibri"):
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
    if color != "000000":
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

def make_para(text, bold=False, italic=False, size="22", color="000000", space_after="80", bullet=False):
    p = ET.Element(f"{{{W_NS}}}p")
    pPr = ET.SubElement(p, f"{{{W_NS}}}pPr")
    sp = ET.SubElement(pPr, f"{{{W_NS}}}spacing")
    sp.set(f"{{{W_NS}}}after", space_after)
    sp.set(f"{{{W_NS}}}line", "260")
    sp.set(f"{{{W_NS}}}lineRule", "auto")
    
    if bullet:
        p.append(make_run("•  ", bold=True, size=size, color="475569"))
        
    p.append(make_run(text, bold=bold, italic=italic, size=size, color=color))
    return p

def make_cell(width, paras):
    tc = ET.Element(f"{{{W_NS}}}tc")
    tcPr = ET.SubElement(tc, f"{{{W_NS}}}tcPr")
    tcW = ET.SubElement(tcPr, f"{{{W_NS}}}tcW")
    tcW.set(f"{{{W_NS}}}w", width)
    tcW.set(f"{{{W_NS}}}type", "dxa")
    
    # Subtle cell margins & vertical alignment
    vAlign = ET.SubElement(tcPr, f"{{{W_NS}}}vAlign")
    vAlign.set(f"{{{W_NS}}}val", "top")
    
    for p in paras:
        tc.append(p)
        
    if not paras:
        empty_p = ET.Element(f"{{{W_NS}}}p")
        tc.append(empty_p)
        
    return tc

def make_table_row(col0_text, col1_items, col2_text, col3_text):
    tr = ET.Element(f"{{{W_NS}}}tr")
    
    # Col 0: Points
    paras0 = [make_para(col0_text, bold=True, size="22", space_after="60")]
    tr.append(make_cell(COL_WIDTHS[0], paras0))
    
    # Col 1: Commentary (bullets or lines)
    paras1 = []
    for item in col1_items:
        if item.startswith("• ") or item.startswith("- "):
            paras1.append(make_para(item[2:], bold=False, size="22", space_after="60", bullet=True))
        else:
            paras1.append(make_para(item, bold=False, size="22", space_after="60", bullet=False))
    tr.append(make_cell(COL_WIDTHS[1], paras1))
    
    # Col 2: Action Responsibility
    paras2 = [make_para(col2_text, bold=True, size="22", space_after="40")]
    tr.append(make_cell(COL_WIDTHS[2], paras2))
    
    # Col 3: Date Due
    paras3 = [make_para(col3_text, bold=False, size="22", space_after="40")]
    tr.append(make_cell(COL_WIDTHS[3], paras3))
    
    return tr

def populate_minutes(date_str, items, aob_text="None.", filename_title="Autumn 1 (Week 1)"):
    if not os.path.exists(TEMPLATE_PATH):
        raise FileNotFoundError(f"Template not found at: {TEMPLATE_PATH}")
        
    with zipfile.ZipFile(TEMPLATE_PATH, 'r') as zin:
        files_dict = {item.filename: zin.read(item.filename) for item in zin.infolist()}
        
    tree = ET.fromstring(files_dict['word/document.xml'])
    tables = tree.findall(f'.//{{{W_NS}}}tbl')
    
    if len(tables) < 2:
        raise ValueError("Expected at least 2 tables in template.")
        
    # Table 0: Metadata
    tbl0 = tables[0]
    r0 = tbl0.findall(f'{{{W_NS}}}tr')
    
    # Row 0: Department
    c_dept = r0[0].findall(f'{{{W_NS}}}tc')[1]
    for p in list(c_dept.findall(f'{{{W_NS}}}p')): c_dept.remove(p)
    c_dept.append(make_para("History", bold=True, size="22"))
    
    # Row 1: Attendees
    c_att = r0[1].findall(f'{{{W_NS}}}tc')[1]
    for p in list(c_att.findall(f'{{{W_NS}}}p')): c_att.remove(p)
    c_att.append(make_para("Department Lead (Head of History / Solo Department)", bold=False, size="22"))
    
    # Row 2: Date
    c_date = r0[2].findall(f'{{{W_NS}}}tc')[1]
    for p in list(c_date.findall(f'{{{W_NS}}}p')): c_date.remove(p)
    c_date.append(make_para(date_str, bold=True, size="22"))
    
    # Table 1: Minutes
    tbl1 = tables[1]
    tr_list = tbl1.findall(f'{{{W_NS}}}tr')
    
    header_tr = tr_list[0]
    standing_tr = tr_list[1]
    
    # Fill standing item action & date
    c_stand_act = standing_tr.findall(f'{{{W_NS}}}tc')[2]
    for p in list(c_stand_act.findall(f'{{{W_NS}}}p')): c_stand_act.remove(p)
    c_stand_act.append(make_para("BL", bold=True, size="22"))
    
    c_stand_date = standing_tr.findall(f'{{{W_NS}}}tc')[3]
    for p in list(c_stand_date.findall(f'{{{W_NS}}}p')): c_stand_date.remove(p)
    c_stand_date.append(make_para("Ongoing", size="22"))
    
    # Clear old rows after standing item
    for tr in tr_list[2:]:
        tbl1.remove(tr)
        
    # Append agenda item rows
    for it in items:
        row = make_table_row(it['point'], it['commentary'], it['resp'], it['due'])
        tbl1.append(row)
        
    # Append AOB row
    aob_row = make_table_row("AOB", [aob_text] if isinstance(aob_text, str) else aob_text, "BL", "Ongoing")
    tbl1.append(aob_row)
    
    # Output file
    updated_xml = ET.tostring(tree, encoding='utf-8', xml_declaration=True)
    files_dict['word/document.xml'] = updated_xml
    
    # Standardized File Name: YYYY-MM-DD - History Department Meeting Minutes - [Title].docx
    # Parse date_str (DD/MM/YYYY)
    dt = datetime.strptime(date_str, "%d/%m/%Y")
    std_filename = f"{dt.strftime('%Y-%m-%d')} - History Department Meeting Minutes - {filename_title}.docx"
    
    for folder in [DRIVE_MINUTES_DIR, LOCAL_MINUTES_DIR]:
        os.makedirs(folder, exist_ok=True)
        dest_path = os.path.join(folder, std_filename)
        with zipfile.ZipFile(dest_path, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
            for fname, data in files_dict.items():
                zout.writestr(fname, data)
        print(f"[OK] Generated Minutes: {dest_path}")

def generate_preset_meetings():
    print("Generating official solo department meeting minutes...\n")
    
    # ----------------------------------------------------
    # Meeting 1: Tuesday 8 September 2026 (Start of Term)
    # ----------------------------------------------------
    items_week1 = [
        {
            "point": "1. KS3 Curriculum Architecture & 4-Act Rollout",
            "commentary": [
                "• Rolled out standardized 4-Act lesson model across KS3 (Act 1 Context & Catalyst, Act 2 Conflict, Act 3 Forensic Sources, Act 4 Historical Verdict).",
                "• Replaced passive reading with active non-prose tasks (technical blueprint drawings and forensic ledgers).",
                "• Standardized extended writing onto PEE/PEEL Structure Strips and Causal Connective Banks; eliminated tiered labelling."
            ],
            "resp": "BL",
            "due": "Ongoing"
        },
        {
            "point": "2. Ypres 2026 Battlefield Tour Planning",
            "commentary": [
                "• Finalized 3-day itinerary (1st–3rd October 2026) in partnership with The History Boys.",
                "• Peace Village Hostel (Mesen) booking confirmed; coach schedule via Folkestone Le Shuttle locked in.",
                "• Drafted Parent Information Pack v2 and Pupil & Parent Code of Conduct."
            ],
            "resp": "BL",
            "due": "18/09/2026"
        },
        {
            "point": "3. GCSE Specification Alignment (Paper 2 Middle East & Paper 1 Medicine)",
            "commentary": [
                "• Recalibrated Middle East exam practice to updated Edexcel 4-mark consequence format and 2-paragraph PEEL significance structure.",
                "• Prepared 5 master cartographic reference spreads for Middle East key topics.",
                "• Aligned Paper 1 Medicine Section A feature questions strictly with British Sector Western Front specification."
            ],
            "resp": "BL",
            "due": "25/09/2026"
        },
        {
            "point": "4. Classroom Environment & Health & Safety",
            "commentary": [
                "• Completed annual History room risk assessment in accordance with Educational Trust format.",
                "• Requested floor-mounted acoustic release door retainer from Andy (Site Team) to reduce corridor congestion at lesson changeover."
            ],
            "resp": "BL",
            "due": "18/09/2026"
        }
    ]
    aob_week1 = "Baseline assessments scheduled for Years 7–9 during Week 2."
    populate_minutes("08/09/2026", items_week1, aob_week1, "Autumn 1 (Week 1 - Start of Term)")
    
    # ----------------------------------------------------
    # Meeting 2: Tuesday 15 September 2026 (Week 2)
    # ----------------------------------------------------
    items_week2 = [
        {
            "point": "1. Ypres Tour Logistics & Paperwork Collection",
            "commentary": [
                "• Parent Information Pack v2 and Code of Conduct issued via school office.",
                "• Passport, GHIC/EHIC card, and signed conduct agreement deadline set for Friday 25th September.",
                "• Medical forms and dietary trackers created; rooming allocations progressing in class."
            ],
            "resp": "BL",
            "due": "25/09/2026"
        },
        {
            "point": "2. KS3 Workbook Architecture (Industrialisation & Empire)",
            "commentary": [
                "• Transitioned Industrialisation workbook to 2-page double-page spread architecture (20 pages total, saddle-stitched).",
                "• Streamlined Do Now to quick recall response lines to preserve vertical space.",
                "• Expanded Henry Cort technical blueprint canvas to full-width drawing area.",
                "• Standardized extended writing strictly on PEE/PEEL structure strips."
            ],
            "resp": "BL",
            "due": "25/09/2026"
        },
        {
            "point": "3. GCSE Year 11 Trial Exam Diagnostics & Interventions",
            "commentary": [
                "• Analyzed summer trial results across Papers 1, 2, and 3.",
                "• Identified target cohort for Grade 4/5 borderline and Grade 7/8 mastery.",
                "• Intervention focus: weekly 10-minute PEE/PEEL paragraph drills and 16-mark essay time management."
            ],
            "resp": "BL",
            "due": "October Half Term"
        },
        {
            "point": "4. Departmental Documentation & Policy Alignment",
            "commentary": [
                "• Updated Department Development Plan 2026–2027 and Marking & Feedback Policy in Department File.",
                "• Created Department Master Plan & Curriculum Tracker.",
                "• Automated departmental meeting minutes archive."
            ],
            "resp": "BL",
            "due": "Complete"
        }
    ]
    aob_week2 = "Chess Club restarts Thursday lunchtime in History Room."
    populate_minutes("15/09/2026", items_week2, aob_week2, "Autumn 1 (Week 2 - Curriculum & Ypres)")

if __name__ == "__main__":
    generate_preset_meetings()
