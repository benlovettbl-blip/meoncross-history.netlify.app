import json

with open('public/data/cold_war.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

updated_count = 0
for li, lesson in enumerate(data.get('lessons', [])):
    sources_by_letter = {s.get('letter'): s for s in lesson.get('sources', []) if s.get('letter')}
    for bi, block in enumerate(lesson.get('blocks', [])):
        bsrc = block.get('source')
        if bsrc and bsrc.get('letter') in sources_by_letter:
            master = sources_by_letter[bsrc.get('letter')]
            bsrc['question'] = master.get('question')
            bsrc['utility_enquiry'] = master.get('utility_enquiry')
            bsrc['hinge_question'] = master.get('hinge_question')
            updated_count += 1

print('Synchronized', updated_count, 'block sources')

q = chr(34)
json_str = json.dumps(data, indent=2, ensure_ascii=False)
out_js = 'const cold_war_data = ' + json_str + ';\n\nexport default cold_war_data;\nexport { cold_war_data };\nif (typeof window !== ' + q + 'undefined' + q + ') {\n  window.cold_war_data = cold_war_data;\n}\nif (typeof module !== '+ q + 'undefined' + q + ' && module.exports) {\n  module.exports = cold_war_data;\n}\n'

with open('public/data/cold_war.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open('units/cold_war/data.js', 'w', encoding='utf-8') as f:
    f.write(out_js)

with open('public/units/cold_war/data.js', 'w', encoding='utf-8') as f:
    f.write(out_js)

print('SUCCESSFULLY_SYNCAD_ALL')
