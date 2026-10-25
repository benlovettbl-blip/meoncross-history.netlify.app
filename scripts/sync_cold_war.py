import json

with open('public/data/cold_war.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

json_str = json.dumps(data, indent=2, ensure_ascii=False)
js_content = 'const cold_war_data = ' + json_str + ';\n\nif (typeof window !== "undefined") {\n  window.cold_war_data = cold_war_data;\n}\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = cold_war_data;\n}\n'

with open('units/cold_war/data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

with open('public/units/cold_war/data.js', 'w', encoding='utf-8') as f:
    fwrite(js_content)

print('FIXED_COLD_WAR_DATA_JS')
