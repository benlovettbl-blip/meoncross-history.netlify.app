import os, sys
sys.stdout.reconfigure(encoding='utf-8')
ws_dir = 'public/units/ks2_ww2/worksheets'
for num in ['01', '02', '03', '04', '05']:
    matches = [f for f in os.listdir(ws_dir) if f.startswith(f'lesson_{num}') and f.endswith('.html')]
    if not matches:
        continue
    fn = matches[0]
    with open(os.path.join(ws_dir, fn), 'r', encoding='utf-8') as f:
        lines = f.readlines()
    print('=== ' + fn + ' ===')
    for idx, l in enumerate(lines):
        if 'Source B' in l or 'SOURCE B' in l:
            for j in range(max(0, idx - 2), min(len(lines), idx + 8)):
                line = lines[j].strip()
                if 'data:image' in line:
                    line = '<img src="data:image...[DATA URL]">'
                print(f'  [{j+1}] {line}')
