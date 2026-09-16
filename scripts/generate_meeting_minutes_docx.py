# -*- coding: utf-8 -*-
"""
Generates the Department Meeting Minutes for 16/09/2026
in G:\My Drive\AAMX\Dep File\Department Meeting Minutes\
using the existing DOCX as a template to preserve exact typography, borders, and styles.
"""

import zipfile
import xml.etree.ElementTree as ET
import os

source_docx = r"G:\My Drive\AAMX\Dep File\Department Meeting Minutes\2026-09-15 - History Department Meeting Minutes - Autumn 1 (Week 2 - Curriculum & Ypres).docx"
target_docx = r"G:\My Drive\AAMX\Dep File\Department Meeting Minutes\2026-09-16 - History Department Meeting Minutes - Autumn 1 (Week 2 - Digital Learning, Ypres & Chess).docx"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
ET.register_namespace("w", W_NS)

with zipfile.ZipFile(source_docx, 'r') as zin:
    file_dict = {item.filename: zin.read(item.filename) for item in zin.infolist()}

xml_content = file_dict['word/document.xml']
tree = ET.fromstring(xml_content)

# 1. Update Date of meeting in Table 1
tables = tree.findall(f'.//{{{W_NS}}}tbl')
t1 = tables[0]
for p in t1.iter(f'{{{W_NS}}}p'):
    t_nodes = p.findall(f'{{{W_NS}}}r/{{{W_NS}}}t')
    for t in t_nodes:
        if t.text and '15/09/2026' in t.text:
            t.text = t.text.replace('15/09/2026', '16/09/2026')
            print("Updated date in Table 1 to 16/09/2026")

# 2. Table 2: Minutes items
t2 = tables[1]
rows = t2.findall(f'{{{W_NS}}}tr')

# Function to create a clean text run
def make_run(text, bold=False, color=None):
    r = ET.Element(f'{{{W_NS}}}r')
    rPr = ET.SubElement(r, f'{{{W_NS}}}rPr')
    rFonts = ET.SubElement(rPr, f'{{{W_NS}}}rFonts')
    rFonts.set(f'{{{W_NS}}}ascii', 'Calibri')
    rFonts.set(f'{{{W_NS}}}hAnsi', 'Calibri')
    rFonts.set(f'{{{W_NS}}}cs', 'Arial')
    if bold:
        ET.SubElement(rPr, f'{{{W_NS}}}b')
    if color:
        c = ET.SubElement(rPr, f'{{{W_NS}}}color')
        c.set(f'{{{W_NS}}}val', color)
    sz = ET.SubElement(rPr, f'{{{W_NS}}}sz')
    sz.set(f'{{{W_NS}}}val', '22')
    szCs = ET.SubElement(rPr, f'{{{W_NS}}}szCs')
    szCs.set(f'{{{W_NS}}}val', '22')
    
    t = ET.SubElement(r, f'{{{W_NS}}}t')
    t.text = text
    if text.startswith(' ') or text.endswith(' '):
        t.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve')
    return r

def make_para(text=None, bullet=False, bold=False, color=None):
    p = ET.Element(f'{{{W_NS}}}p')
    pPr = ET.SubElement(p, f'{{{W_NS}}}pPr')
    spacing = ET.SubElement(pPr, f'{{{W_NS}}}spacing')
    spacing.set(f'{{{W_NS}}}after', '60')
    spacing.set(f'{{{W_NS}}}line', '260')
    spacing.set(f'{{{W_NS}}}lineRule', 'auto')
    
    if bullet:
        # bullet symbol
        p.append(make_run('•  ', bold=True, color='475569'))
        p.append(make_run(text, bold=False, color=None))
    elif text:
        p.append(make_run(text, bold=bold, color=color))
    return p

def set_cell_content(tc, paragraphs):
    # Keep tcPr
    tcPr = tc.find(f'{{{W_NS}}}tcPr')
    for child in list(tc):
        if child != tcPr:
            tc.remove(child)
    if not paragraphs:
        # At least one empty paragraph is required in docx tc
        tc.append(make_para())
    else:
        for p in paragraphs:
            tc.append(p)

# Data for rows
new_rows_data = [
    # Row 1: Standing Agenda Item (keep unchanged)
    None,
    # Row 2: History Hub App Updates
    {
        "point": "1. History Hub Web App & Curriculum Digital Resources",
        "bullets": [
            "Rolled out 4-act dramatic narrative structure for Early Modern World KS3 unit.",
            "Implemented paragraph-level indexing [Act.Para] to signpost student reading and eliminate cognitive clutter.",
            "Standardized primary source presentation using museum archival citation styling across lessons.",
            "Built 20-page Edexcel GCSE Medicine Mastery Revision Pack with 136-mark homework tracker, exam scaffolding, and complete syllabus audit."
        ],
        "resp": "BL",
        "due": "Ongoing"
    },
    # Row 3: Ypres Battlefield Tour
    {
        "point": "2. Ypres Battlefield Tour Logistics",
        "bullets": [
            "Continuing to collect student passports and GHIC cards ahead of 25th September deadline.",
            "Chasing outstanding signed parent consent forms and medical/dietary information.",
            "Reviewing tour operator schedule and daily itinerary timings."
        ],
        "resp": "BL",
        "due": "25/09/2026"
    },
    # Row 4: Chess Club
    {
        "point": "3. Chess Club",
        "bullets": [
            "Club restarts tomorrow (Thursday lunchtime) in History Room.",
            "Checked boards, sets, and clocks ready for play.",
            "Will monitor attendance to see if extra boards are needed from the store cupboard."
        ],
        "resp": "BL",
        "due": "Ongoing"
    },
    # Row 5: AOB - Blank as instructed if nothing to add
    {
        "point": "AOB",
        "bullets": [],
        "resp": "",
        "due": ""
    }
]

# We need rows: Header(0), Standing(1), Item1(2), Item2(3), Item3(4), AOB(5).
# Existing table has 7 rows (0 to 6). Let's remove row 6 or repurpose rows.
# Let's adjust rows in t2:
while len(rows) > 6:
    t2.remove(rows[-1])
    rows = t2.findall(f'{{{W_NS}}}tr')

# Now rows has length 6: [0: header, 1: standing, 2: item 1, 3: item 2, 4: item 3, 5: AOB]
for idx, data in enumerate(new_rows_data[1:], start=2):
    row = rows[idx]
    cells = row.findall(f'{{{W_NS}}}tc')
    
    # Cell 0: Point
    p0 = [make_para(data["point"], bold=True)] if data["point"] else []
    set_cell_content(cells[0], p0)
    
    # Cell 1: Commentary / Bullets
    p1 = [make_para(b, bullet=True) for b in data["bullets"]]
    set_cell_content(cells[1], p1)
    
    # Cell 2: Responsibility
    p2 = [make_para(data["resp"], bold=True)] if data["resp"] else []
    set_cell_content(cells[2], p2)
    
    # Cell 3: Date Due
    p3 = [make_para(data["due"])] if data["due"] else []
    set_cell_content(cells[3], p3)

# Save updated docx
file_dict['word/document.xml'] = ET.tostring(tree, encoding='utf-8', xml_declaration=True)

with zipfile.ZipFile(target_docx, 'w', zipfile.ZIP_DEFLATED) as zout:
    for filename, content in file_dict.items():
        zout.writestr(filename, content)

print(f"Successfully created: {target_docx}")
