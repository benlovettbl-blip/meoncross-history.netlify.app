import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('public/map_comparison.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="view-evacuation"')
if idx != -1:
    print(text[idx:idx+1500])
