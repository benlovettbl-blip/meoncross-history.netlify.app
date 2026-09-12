import zipfile
import xml.etree.ElementTree as ET
import os

DOCX_PATH = r"G:\My Drive\AAMX\Dep File\Development Plan Template History Dep.docx"
BACKUP_PATH = r"temp_backups\Development_Plan_Template_History_Dep_BACKUP.docx"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
ET.register_namespace('w', W_NS)

def make_p(text, bold=False, italic=False, font_size="20", space_after="100"):
    """Create a w:p element with text and formatting."""
    p = ET.Element(f"{{{W_NS}}}p")
    pPr = ET.SubElement(p, f"{{{W_NS}}}pPr")
    sp = ET.SubElement(pPr, f"{{{W_NS}}}spacing")
    sp.set(f"{{{W_NS}}}after", space_after)
    sp.set(f"{{{W_NS}}}line", "260")
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
    # Remove all existing elements except tcPr
    for child in list(cell):
        if child != tcPr:
            cell.remove(child)
            
    for item in paragraphs_data:
        if isinstance(item, str):
            cell.append(make_p(item))
        elif isinstance(item, tuple):
            # (text, bold, italic, font_size)
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
    
    # Row 2: Academic Achievement
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[0], [
        ("Academic Achievement & GCSE Excellence", True, False, "20"),
        ("(Subject Specific Aim)", False, True, "18"),
        ("Secure outstanding progress and high-tariff attainment across Edexcel GCSE History (Papers 1, 2, and 3) while reducing teacher workload through standardized formula stamps and scaffolded models.", False, False, "18")
    ])
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Embed the revised Edexcel exam specifications across Key Stage 4: deploy 4-mark Consequence stamps (PEE), 8-mark Narrative 3-phase flowcharts, and 8-mark Importance analytical frameworks in Conflict in the Middle East (cme_new) and Early Elizabethan England (eee).", False, False, "18"),
        ("2. Implement regular low-stakes recall testing at the start of every lesson using the digital Flashcard Vault and randomized Do Now quizzes, isolating prior knowledge to build retention.", False, False, "18"),
        ("3. Deploy walking-talking mock exams and teacher specimen mark schemes embedded directly in the digital portal, enabling live classroom modeling without requiring ad-hoc worksheet preparation.", False, False, "18")
    ])
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[2], [
        ("• 85%+ of GCSE cohort achieving Grade 6–9; positive Value Added across all subgroups.", False, False, "18"),
        ("• Zero generic placeholder model answers; 100% of exam practice tasks feature historically accurate, 3-tier models (Bronze/Silver/Gold).", False, False, "18"),
        ("• Rapid, actionable feedback facilitated by the printed workbook formula stamps and digital self-marking diagnostic quizzes.", False, False, "18")
    ])
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[3], [
        ("Milestone 1: Nov 2026 (Paper 2 CME timed assessment)", False, False, "18"),
        ("Milestone 2: Feb 2027 (Paper 1 & 3 Mock Series)", False, False, "18"),
        ("Completion: June 2027 (GCSE Exam Series)", False, False, "18")
    ])
    set_cell_content(t2_rows[1].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Row 3: Aspirational Curriculum
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[0], [
        ("Aspirational Curriculum & Coastal Heritage", True, False, "20"),
        ("(Linked to SIP Strategic Aim 2: Coastal Education, Sustainability & Progression)", True, True, "18"),
        ("Embed a rigorous, de-centered, chronologically robust 5-year curriculum that champions coastal and local Hampshire heritage alongside global history, ensuring seamless progression from KS3 to GCSE with zero teacher re-planning.", False, False, "18")
    ])
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Fully roll out the 4-Act dramatic enquiry structure across KS3 (e.g. Early Modern World, Medieval England, Great War), utilizing pure paragraph indexing [Act.Paragraph] to provide seamless cognitive signposting.", False, False, "18"),
        ("2. Weave distinctive local maritime and coastal history into core units: study Henry Cort's puddling process at Funtley (Industrialisation L1), Portsmouth Royal Dockyard's ironclad steam revolution and Two-Power naval standard (L3), and the Stubbington village 'Lost Generation' war memorials (Great War L8).", False, False, "18"),
        ("3. Embed progressive thematic links: use Year 7 Water and Sanitation Through Time as a deliberate, low-stakes conceptual primer for Year 11 Medicine Through Time, pre-teaching change, continuity, and public health attitudes.", False, False, "18")
    ])
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[2], [
        ("• Complete, unified Schemes of Work published with clear enquiry questions, learning objectives, and hinge questions across all 5 year groups.", False, False, "18"),
        ("• Pupil voice audits demonstrate high engagement and vivid understanding of local Hampshire connections to national/global events.", False, False, "18"),
        ("• Curriculum Map and Tabular Overview published and accessible for departmental line management and whole-school QA.", False, False, "18")
    ])
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[3], [
        ("Review 1: Oct 2026 (KS3 Autumn units review)", False, False, "18"),
        ("Review 2: Jan 2027 (Spring coastal study check)", False, False, "18"),
        ("Completion: July 2027 (Full curriculum cycle)", False, False, "18")
    ])
    set_cell_content(t2_rows[2].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Row 4: Co-Curriculum & Clubs
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[0], [
        ("Co-Curriculum, Clubs & Experiential Learning", True, False, "20"),
        ("(Linked to SIP Strategic Aim 2 & 4: Opportunities Beyond Classroom & Chess Club)", True, True, "18"),
        ("Broaden pupil horizons and foster historical adventure, leadership, and intellectual curiosity through high-profile co-curricular clubs, academic competitions, and experiential field trips.", False, False, "18")
    ])
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Coordinate and deliver the biannual GCSE Ypres Battlefield Tour (Years 10–11), investigating historic Western Front casualty clearing stations, dressing stations, and Menin Gate commemoration, directly supporting Paper 1 Section A British sector depth study.", False, False, "18"),
        ("2. Organize participation in the annual Hampshire Record Office Archives Local History Competition, guiding pupils to conduct primary archival detective work on local community lineage and combat records.", False, False, "18"),
        ("3. Lead and expand the weekly Meoncross Chess Club, integrating the digital Chess League ladder, house points, and tactician badges into the History Portal.", False, False, "18")
    ])
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[2], [
        ("• Successful execution of the 2026 Ypres Battlefield Tour with comprehensive digital field companion, parent information packs, and risk assessments.", False, False, "18"),
        ("• Active pupil submissions to the Hampshire Archives Competition with high-quality archival source presentation.", False, False, "18"),
        ("• 30+ regular participants across Years 7–11 in Meoncross Chess Club; sustained engagement recorded in house point tracking.", False, False, "18")
    ])
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[3], [
        ("Milestone 1: Oct 2026 (Ypres parent briefing & packs)", False, False, "18"),
        ("Milestone 2: March 2027 (Hampshire Archives submission)", False, False, "18"),
        ("Milestone 3: May 2027 (Ypres Battlefield Tour)", False, False, "18"),
        ("Ongoing: Weekly Meoncross Chess Club", False, False, "18")
    ])
    set_cell_content(t2_rows[3].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Row 5: Adaptive Teaching & SEND
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[0], [
        ("Adaptive Teaching & Low-Workload SEND Provision", True, False, "20"),
        ("(Linked to SIP Strategic Aim 1 & 2: Inclusive Practice & High Expectations with Low Workload)", True, True, "18"),
        ("Ensure all SEND, EAL, and lower-attaining pupils make outstanding progress through fully embedded adaptive teaching tools and dual-coded resources, achieving maximum inclusion with minimal ongoing teacher workload.", False, False, "18")
    ])
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Deploy the History Hub digital web app alongside physical printed A4 workbooks, combining dual coding and structured tasks to offload working memory and prevent cognitive overload.", False, False, "18"),
        ("2. Embed 3-tier differentiated scaffolding into every pupil task: Bronze (sentence stems/recall), Silver (analytical connectives: Consequently, Furthermore), and Gold (historiographical evaluation and academic debate).", False, False, "18"),
        ("3. Activate digital accessibility features: built-in SEN mode (soft cream background with high-legibility dyslexia font), adjustable speech-rate read-aloud engine (0.85x–1.15x), and pure paragraph indices [Act.Paragraph] that eliminate cognitive clutter.", False, False, "18"),
        ("4. Track individual SEND progress using targeted diagnostic checks and provide instant visual booster sheets (e.g. Overdue Boosters) without demanding ad-hoc teacher resource creation.", False, False, "18")
    ])
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[2], [
        ("• Adaptive teaching clearly visible in all classroom observations and departmental QA drops without requiring differentiated paper planning.", False, False, "18"),
        ("• SEND pupils demonstrate parity of progress with non-SEND peers on departmental tracking data; 100% completion of workbook scaffolding.", False, False, "18"),
        ("• Teacher planning time reduced significantly through standardized, pre-formatted digital and physical scaffolding.", False, False, "18")
    ])
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[3], [
        ("Review 1: Nov 2026 (SEND diagnostic review)", False, False, "18"),
        ("Review 2: Feb 2027 (Adaptive teaching QA check)", False, False, "18"),
        ("Completion: June 2027 (Annual SEND progress evaluation)", False, False, "18")
    ])
    set_cell_content(t2_rows[4].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Row 6: SMSC, British Values & Gridmaker
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[0], [
        ("SMSC, British Values & Gridmaker Integration", True, False, "20"),
        ("(Linked to SIP Strategic Aim 3: Community, Belonging & Personal Development)", True, True, "18"),
        ("Systematically track, evidence, and deepen pupils' Spiritual, Moral, Social, and Cultural (SMSC) development and understanding of Fundamental British Values across all key stages, fully aligning with the whole-school Gridmaker recording system.", False, False, "18")
    ])
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Map explicit SMSC and British Values questions into every unit in curriculum_meta.json, addressing democracy (Chartism, parliamentary power), the rule of law (Magna Carta, Nuremberg trials), individual liberty (civil rights, Transatlantic Slave Trade resistance), and mutual tolerance.", False, False, "18"),
        ("2. Systematically log history curriculum touchpoints onto the school's Gridmaker platform on an ongoing termly basis to provide transparent, inspection-ready evidence of SMSC coverage.", False, False, "18"),
        ("3. Incorporate ethical reflection tasks and hinge questions into lessons (e.g., 'Is rebellion ever justified?' in 1381; 'Should public health ever override personal liberty?' in Jenner/vaccination debates).", False, False, "18")
    ])
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[2], [
        ("• 100% of units audited and logged on Gridmaker with rich descriptive evidence of SMSC and British Values delivery.", False, False, "18"),
        ("• Pupils demonstrate sophisticated moral and social reasoning during class debate and written reflections.", False, False, "18"),
        ("• Department rated outstanding for SMSC and personal development in internal and external inspection reviews.", False, False, "18")
    ])
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[3], [
        ("Termly logging: Oct 2026, Dec 2026, Feb 2027, April 2027, June 2027", False, False, "18"),
        ("Audit completion: July 2027", False, False, "18")
    ])
    set_cell_content(t2_rows[5].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Row 7: Pupil Leadership & Achievement Hub
    set_cell_content(t2_rows[6].findall(f".//{{{W_NS}}}tc")[0], [
        ("Pupil Leadership, Family Archives & Achievement Hub", True, False, "20"),
        ("(Linked to SIP Strategic Aim 4: Social & Economic Wellbeing, Careers & Leadership)", True, True, "18"),
        ("Elevate pupil leadership, real-world historical research, and careers awareness through pupil-led family archive investigations and integration with the Meoncross Achievement Hub.", False, False, "18")
    ])
    set_cell_content(t2_rows[6].findall(f".//{{{W_NS}}}tc")[1], [
        ("1. Embed pupil family history and archival research into the live curriculum (e.g., Aby's Year 10 research on 2nd Lt Ernest Crummack DCM, Marcus Goodall, and Siegfried Sassoon's holograph manuscript), establishing pupil pride and leadership in departmental scholarship.", False, False, "18"),
        ("2. Partner with the school's new Achievement Hub to deliver history careers workshops (e.g. archivist, international diplomat, heritage consultant, legal researcher), inviting parent/alumni speakers to demonstrate the real-world value of history degrees.", False, False, "18"),
        ("3. Appoint History Subject Ambassadors / Prefects to mentor Year 7–8 pupils in the Chess Club and support peer study clinics during GCSE walking-talking mock sessions.", False, False, "18")
    ])
    set_cell_content(t2_rows[6].findall(f".//{{{W_NS}}}tc")[2], [
        ("• Archival detective features embedded in unit companion guides showcasing pupil research.", False, False, "18"),
        ("• Scheduled careers touchpoints completed with the Achievement Hub, with high pupil feedback ratings.", False, False, "18"),
        ("• Active History Ambassador network supporting lower school engagement and library study sessions.", False, False, "18")
    ])
    set_cell_content(t2_rows[6].findall(f".//{{{W_NS}}}tc")[3], [
        ("Milestone 1: Nov 2026 (Ambassador appointments)", False, False, "18"),
        ("Milestone 2: Feb 2027 (Achievement Hub careers event)", False, False, "18"),
        ("Completion: July 2027 (Annual leadership review)", False, False, "18")
    ])
    set_cell_content(t2_rows[6].findall(f".//{{{W_NS}}}tc")[4], [("BL", True, False, "20")])

    # Re-serialize XML
    new_xml = ET.tostring(tree, encoding='utf-8', xml_declaration=True)
    all_files['word/document.xml'] = new_xml
    
    # Save to completed file
    completed_path = r"G:\My Drive\AAMX\Dep File\Development Plan History Dep 2026-27 (Completed).docx"
    with zipfile.ZipFile(completed_path, 'w', zipfile.ZIP_DEFLATED) as zout:
        for name, data in all_files.items():
            zout.writestr(name, data)
    print(f"[SUCCESS] Completed development plan saved to: {completed_path}")

    # Try saving to original path if not locked
    try:
        with zipfile.ZipFile(DOCX_PATH, 'w', zipfile.ZIP_DEFLATED) as zout:
            for name, data in all_files.items():
                zout.writestr(name, data)
        print(f"[SUCCESS] Also successfully updated original: {DOCX_PATH}")
    except PermissionError:
        print(f"[INFO] Note: Original file is currently open in Microsoft Word. Created '{completed_path}' ready for use.")

if __name__ == '__main__':
    update_docx()
