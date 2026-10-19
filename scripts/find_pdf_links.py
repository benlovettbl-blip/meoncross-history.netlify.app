with open(r'C:\Users\fives\.gemini\antigravity-ide\brain\8bb45b3b-bf55-43ff-bef8-a0c9644ffce6\.system_generated\steps\1403\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

import re
links = re.findall(r'https?://[^\s\)]+', text)
pdf_links = [l for l in links if 'pdf' in l.lower()]
print('PDF links:')
for p in set(pdf_links):
    print(p)
