import re

with open('generate_pupil_workbooks.js', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Inject flatQuestions
c = c.replace(
    '      if (lesson.startPage) {',
    '      let flatQuestions = [];\n      if (lesson.startPage) {'
)

# 2. End of lesson loop (render sorted questions)
c = c.replace(
    '      // Add to Tracker',
    '      flatQuestions.sort((a,b) => a.qNum - b.qNum);\n      flatQuestions.forEach(q => html += q.html);\n\n      // Add to Tracker'
)

# 3. Primary Source
c = c.replace(
    '      // Primary Source\n      if (lesson.primary_source) {',
    '      // Primary Source\n      if (lesson.primary_source) {\n        let _psHtml = "";'
)
c = c.replace(
    '        html += `\n        <div class="source-container"',
    '        _psHtml += `\n        <div class="source-container"'
)
c = c.replace(
    '        </div>\n      `;\n      }',
    '        </div>\n      `;\n        if (lesson.primary_source.question) {\n            flatQuestions.push({ qNum: lesson.primary_source.qNum, html: _psHtml });\n        } else {\n            html += _psHtml;\n        }\n      }'
)

# 4. Sources
c = c.replace(
    '              html += `\n              <div class="source-container"',
    '              flatQuestions.push({ qNum: source.qNum, html: `\n              <div class="source-container"'
)
c = c.replace(
    '              </div>\n            `;\n            }\n          });\n          html += `</div>`;\n        }',
    '              </div>\n            ` });\n            }\n          });\n        }'
)
c = c.replace(
    '          html += `<div style="page-break-inside: auto; margin-bottom: 15px;">`;\n          lesson.sources.forEach',
    '          lesson.sources.forEach'
)


# 5. Narrative Blocks
start_nb = c.find('// Narrative Blocks & Tasks')
end_nb = c.find('// Inject General Notes Box')
nb_section = c[start_nb:end_nb]

nb_section = nb_section.replace('html +=', '_nbHtml +=')
nb_section = nb_section.replace(
    '          if (hasContent) {',
    '          if (hasContent) {\n            let _nbHtml = "";\n            let _firstQNum = 9999;'
)
nb_section = nb_section.replace(
    '            if (block.extended && block.extended.question) {',
    '            if (block.extended && block.extended.question) {\n              if (block.extended.qNum && block.extended.qNum < _firstQNum) _firstQNum = block.extended.qNum;'
)
nb_section = nb_section.replace(
    '            if (block.hinge_question) {',
    '            if (block.hinge_question) {\n              if (block.hinge_question.qNum && block.hinge_question.qNum < _firstQNum) _firstQNum = block.hinge_question.qNum;'
)
nb_section = nb_section.replace(
    '                let qNumStr = task.qNum ? `<strong>Q${task.qNum}.</strong> ` : "";',
    '                if (task.qNum && task.qNum < _firstQNum) _firstQNum = task.qNum;\n                let qNumStr = task.qNum ? `<strong>Q${task.qNum}.</strong> ` : "";'
)
nb_section = nb_section.replace(
    '            _nbHtml += `</div>`;\n          }',
    '            _nbHtml += `</div>`;\n            if (_firstQNum !== 9999) {\n                flatQuestions.push({ qNum: _firstQNum, html: _nbHtml });\n            } else {\n                html += _nbHtml;\n            }\n          }'
)

c = c[:start_nb] + nb_section + c[end_nb:]


# 6. Pair Share
start_ps = c.find('// Pair Share')
end_ps = c.find('// Tasks', start_ps)
if end_ps == -1: end_ps = c.find('// Extended', start_ps)
ps_section = c[start_ps:end_ps]
ps_section = ps_section.replace('html +=', '_pshHtml +=')
ps_section = ps_section.replace(
    '      if (lesson.pair_share) {',
    '      if (lesson.pair_share) {\n        let _pshHtml = "";'
)
ps_section = ps_section.replace(
    '        _pshHtml += `</div>`;\n      }',
    '        _pshHtml += `</div>`;\n        flatQuestions.push({ qNum: lesson.pair_share.qNum || 999, html: _pshHtml });\n      }'
)
c = c[:start_ps] + ps_section + c[end_ps:]

# 7. Extended
start_ex = c.find('// Extended')
end_ex = c.find('// Historian', start_ex)
ex_section = c[start_ex:end_ex]
ex_section = ex_section.replace('html +=', '_exHtml +=')
ex_section = ex_section.replace(
    '      if (lesson.extended && lesson.extended.question) {',
    '      if (lesson.extended && lesson.extended.question) {\n        let _exHtml = "";'
)
ex_section = ex_section.replace(
    '        _exHtml += `</div>`;\n      }',
    '        _exHtml += `</div>`;\n        flatQuestions.push({ qNum: lesson.extended.qNum || 999, html: _exHtml });\n      }'
)
c = c[:start_ex] + ex_section + c[end_ex:]

# 8. Historian's Corner
start_hc = c.find('// Historian')
end_hc = c.find('// GCSE Task', start_hc)
hc_section = c[start_hc:end_hc]
hc_section = hc_section.replace('html +=', '_hcHtml +=')
hc_section = hc_section.replace(
    '      if (lesson.historians_corner) {',
    '      if (lesson.historians_corner) {\n        let _hcHtml = "";'
)
hc_section = hc_section.replace(
    '        _hcHtml += `</div>`;\n      }',
    '        _hcHtml += `</div>`;\n        if (lesson.historians_corner.stretch_question) flatQuestions.push({ qNum: lesson.historians_corner.qNum || 999, html: _hcHtml }); else html += _hcHtml;\n      }'
)
c = c[:start_hc] + hc_section + c[end_hc:]

# 9. GCSE Task
start_gc = c.find('// GCSE Task')
end_gc = c.find('      // Add to Tracker', start_gc)
gc_section = c[start_gc:end_gc]
gc_section = gc_section.replace('html +=', '_gcHtml +=')
gc_section = gc_section.replace(
    '      if (lesson.gcse_task) {',
    '      if (lesson.gcse_task) {\n        let _gcHtml = "";'
)
gc_section = gc_section.replace(
    '        _gcHtml += `</div>`;\n      }',
    '        _gcHtml += `</div>`;\n        let _gq = lesson.gcse_task.qNum || (lesson.gcse_task.tasks && lesson.gcse_task.tasks[0].qNum) || 999;\n        flatQuestions.push({ qNum: _gq, html: _gcHtml });\n      }'
)
c = c[:start_gc] + gc_section + c[end_gc:]


with open('generate_pupil_workbooks.js', 'w', encoding='utf-8') as f:
    f.write(c)

print("Patched pupil workbooks logic successfully.")
