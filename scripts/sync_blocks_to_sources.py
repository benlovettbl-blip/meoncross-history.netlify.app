import json

with open('public/data/cold_war.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

updated_blocks = 0
for li, lesson in enumerate(data.get('lessons', [])):
    srcs = lesson.get('sources', [])
    blocks = lesson.get('blocks', [])
    for bi, block in enumerate(blocks):
        if bi < len(srcs):
            block['source'] = srcs[bi]
            updated_blocks += 1

print('Updated', updated_blocks, 'block sources from lesson.sources')

q = chr(34)
json_str = json.dumps(data, indent=2, ensure_ascii=False)
out_js = 'const cold_war_data = ' + json_str + ';\n\nexport default cold_war_data;\nexport { cold_war_data };\nif (typeof window !== '+ q + 'undefined' + q + ') {\n  window.cold_war_data = cold_war_data;\n}\nif (typeof module !== ' + q + 'undefined' + q + ' && module.exports) {\n  module.exports = cold_war_data;\n}\n'

with open('public/data/cold_war.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open('units/cold_war/data.js', 'w', encoding='utf-8') as f:
    f.write(out_js)

with open('public/units/cold_war/data.js', 'w', encoding='utf-8') as f:
    f.write(out_js)

print('SUCCESSFULLY_SYNCED_ALL_BLOCK_SOURCES')
