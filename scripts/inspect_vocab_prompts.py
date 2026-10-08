import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/render_eee_twopage_workbook.cjs', 'r', encoding='utf-8') as f:
    code = f.read()

matches = re.findall(r"vocabTermA:\s*['\"]([^'\"]+)['\"].*?vocabTermB:\s*['\"]([^'\"]+)['\"].*?vocabPrompt:\s*['\"]([^'\"]+)['\"]", code, re.DOTALL)
for i, (a, b, p) in enumerate(matches):
    print(f"Enquiry {i+1}: {a} vs {b}")
    print(f"   Prompt: {p}\n")
