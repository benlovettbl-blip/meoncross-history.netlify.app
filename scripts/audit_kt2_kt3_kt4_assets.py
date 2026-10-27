import json
import os
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

with open('database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

med = db['edexcel_medicine']['data']

lessons_to_check = [
    ('KT2', ['lesson_2_1', 'lesson_2_2', 'lesson_2_3', 'lesson_2_4', 'lesson_2_5']),
    ('KT3', ['lesson_3_1', 'lesson_3_2', 'lesson_3_3', 'lesson_3_4', 'lesson_3_5']),
    ('KT4', ['lesson_4_1', 'lesson_4_2', 'lesson_4_3', 'lesson_4_4', 'lesson_4_5'])
]

overall_issues = []

for kt_name, lesson_ids in lessons_to_check:
    print(f"\n######################################################################")
    print(f"  AUDIT: {kt_name} (Lessons {lesson_ids[0]} to {lesson_ids[-1]})")
    print(f"######################################################################")
    
    for lid in lesson_ids:
        l = next((x for x in med['lessons'] if x['id'] == lid), None)
        if not l:
            overall_issues.append(f"{lid}: NOT FOUND in database")
            print(f"ERROR: {lid} NOT FOUND")
            continue
        
        print(f"\n--- {lid}: {l.get('title')} ---")
        
        # 1. Check Layer 2 Narrative Plates
        blocks = l.get('narrative_blocks', [])
        plates = []
        for b_idx, b in enumerate(blocks):
            img = b.get('image')
            if img:
                local_path = os.path.join('public', img.lstrip('/'))
                exists = os.path.exists(local_path)
                dim_str = "MISSING"
                size_str = ""
                if exists:
                    size_str = f"{os.path.getsize(local_path)} bytes"
                    try:
                        im = Image.open(local_path)
                        dim_str = f"{im.size[0]}x{im.size[1]} ({im.format})"
                    except Exception as e:
                        dim_str = f"CORRUPT: {e}"
                        overall_issues.append(f"{lid} Plate B{b_idx+1}: {img} is corrupt: {e}")
                else:
                    overall_issues.append(f"{lid} Plate B{b_idx+1}: {img} (resolved: {local_path}) DOES NOT EXIST on disk!")
                
                print(f"  [Plate Block {b_idx+1}] {img} | Exists: {exists} | {dim_str} | {size_str}")
                plates.append(img)
                
        if len(plates) != 2:
            overall_issues.append(f"{lid}: Expected 2 narrative plates, found {len(plates)}")
            print(f"  [!] PLATE COUNT: Found {len(plates)} plates (Expected 2)")
            
        # 2. Check Layer 3 Disciplinary Sources
        sources = l.get('sources', [])
        source_imgs = []
        visual_count = 0
        written_count = 0
        
        for s in sources:
            s_letter = s.get('letter')
            s_title = s.get('title')
            s_badge = s.get('question_badge')
            img = s.get('image') or s.get('image_url') or s.get('src')
            
            if img:
                visual_count += 1
                local_path = os.path.join('public', img.lstrip('/'))
                exists = os.path.exists(local_path)
                dim_str = "MISSING"
                size_str = ""
                if exists:
                    size_str = f"{os.path.getsize(local_path)} bytes"
                    try:
                        im = Image.open(local_path)
                        dim_str = f"{im.size[0]}x{im.size[1]} ({im.format})"
                    except Exception as e:
                        dim_str = f"CORRUPT: {e}"
                        overall_issues.append(f"{lid} Source {s_letter}: {img} is corrupt: {e}")
                else:
                    overall_issues.append(f"{lid} Source {s_letter}: {img} (resolved: {local_path}) DOES NOT EXIST on disk!")
                
                print(f"  [Source {s_letter} - VISUAL] {img} | Exists: {exists} | {dim_str} | {size_str}")
                print(f"    Title: {s_title}")
                source_imgs.append(img)
            else:
                written_count += 1
                txt = s.get('content') or s.get('text') or ''
                if len(txt) == 0:
                    overall_issues.append(f"{lid} Source {s_letter}: Written body is EMPTY!")
                print(f"  [Source {s_letter} - WRITTEN] {len(txt)} chars | Badge: [{s_badge}]")
                print(f"    Title: {s_title}")
                
            # Check teacher notes & hinge question
            t_notes = s.get('teacher_notes', {})
            s_ctx = t_notes.get('source_context', '')
            has_hinge = 'hinge' in s_ctx.lower()
            if not has_hinge:
                overall_issues.append(f"{lid} Source {s_letter}: Missing Hinge Question in source_context!")
                print(f"    [!] Missing Hinge Question in source_context! (Context: {s_ctx[:50]}...)")
                
            # Check 3-part provenance violation
            if 'provenance_clues' in s or 'provenance_breakdown' in s:
                overall_issues.append(f"{lid} Source {s_letter}: Found 3-part provenance structure!")
                print(f"    [!] 3-Part Provenance structure detected!")
                
        # 3. Check Rhythm
        if visual_count != 2 or written_count != 3:
            overall_issues.append(f"{lid}: Incorrect rhythm: {visual_count} Visual + {written_count} Written (Expected 2 Visual + 3 Written)")
            print(f"  [!] RHYTHM MISMATCH: {visual_count} Visual + {written_count} Written (Target: 2 + 3)")
        else:
            print(f"  [OK] Rhythm correct: 2 Visual + 3 Written")
            
        # 4. Check Intra-lesson image de-duplication
        all_imgs = plates + source_imgs
        duplicates = [x for x in all_imgs if all_imgs.count(x) > 1]
        if duplicates:
            overall_issues.append(f"{lid}: Duplicate images found inside lesson: {set(duplicates)}")
            print(f"  [FAIL] DUPLICATE IMAGES DETECTED: {set(duplicates)}")
        else:
            print(f"  [OK] Zero duplicates: All {len(all_imgs)} image paths unique")

print(f"\n======================================================================")
print(f"  OVERALL ASSET & SOURCE AUDIT SUMMARY")
print(f"======================================================================")
if overall_issues:
    print(f"Total issues found: {len(overall_issues)}")
    for issue in overall_issues:
        print(f"  - {issue}")
else:
    print("Zero issues found! Everything is 100% compliant.")
