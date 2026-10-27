import json
import os
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

with open('database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

med = db['edexcel_medicine']['data']

all_images = []

for kt, lids in [('KT2', [f'lesson_2_{i}' for i in range(1, 6)]),
                 ('KT3', [f'lesson_3_{i}' for i in range(1, 6)]),
                 ('KT4', [f'lesson_4_{i}' for i in range(1, 6)])]:
    for lid in lids:
        l = next(x for x in med['lessons'] if x['id'] == lid)
        for b_idx, b in enumerate(l.get('narrative_blocks', [])):
            if b.get('image'):
                all_images.append((kt, lid, f'Plate B{b_idx+1}', b.get('image'), b.get('caption', '')[:70]))
        for s in l.get('sources', []):
            img = s.get('image') or s.get('image_url') or s.get('src')
            if img:
                all_images.append((kt, lid, f"Source {s.get('letter')}", img, s.get('title', '')[:70]))

print(f"Total visual assets across KT2, KT3, KT4: {len(all_images)}")

missing_count = 0
for kt, lid, role, img, desc in all_images:
    p = os.path.join('public', img.lstrip('/'))
    if os.path.exists(p):
        sz = os.path.getsize(p)
        try:
            im = Image.open(p)
            print(f"{kt} | {lid} | {role:12} | {img:40} | {im.size[0]:>4}x{im.size[1]:<4} ({im.format:4}) | {sz:>8}b | {desc[:40]}")
        except Exception as e:
            print(f"CORRUPT: {kt} | {lid} | {role} | {img} -> {e}")
            missing_count += 1
    else:
        print(f"MISSING: {kt} | {lid} | {role:12} | {img:40} | {desc[:40]}")
        missing_count += 1

print(f"\nMissing or Corrupt Assets Count: {missing_count}")
