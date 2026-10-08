import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/render_eee_twopage_workbook.cjs', 'r', encoding='utf-8') as f:
    code = f.read()

features = re.findall(r"provenance:\s*['\"]([^'\"]+)['\"].*?stem:\s*['\"]([^'\"]+)['\"]", code, re.DOTALL)
print(f"Total exam questions found: {len(features)}")
for prov, stem in features:
    print(f"• [{prov}] {stem}")
