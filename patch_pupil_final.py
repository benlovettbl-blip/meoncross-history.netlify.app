import re

with open('generate_pupil_workbooks.js', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    '      if (lesson.startPage) {',
    '      let flatQuestions = [];\n      if (lesson.startPage) {'
)

# Insert sort at the end of the lesson loop. We find the end by looking for `html += \`    </div>\`;` right before `});\n\n  const filename =`
end_loop = c.find('  const filename =')
if end_loop != -1:
    before_end = c.rfind('html += `    </div>`;', 0, end_loop)
    c = c[:before_end] + 'flatQuestions.sort((a,b) => a.qNum - b.qNum);\n      flatQuestions.forEach(q => html += q.html);\n      ' + c[before_end:]

# Primary Source
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

# Sources
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

# Narrative Blocks & Tasks
start_nb = c.find('      // Narrative Blocks & Tasks')
end_nb = c.find('      if (lesson.tasks && lesson.tasks.length > 0) {', start_nb)
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
    '            _nbHtml += `</div>`; // Close narrative-block div\n          }',
    '            _nbHtml += `</div>`; // Close narrative-block div\n            if (_firstQNum !== 9999) {\n                flatQuestions.push({ qNum: _firstQNum, html: _nbHtml });\n            } else {\n                html += _nbHtml;\n            }\n          }'
)

c = c[:start_nb] + nb_section + c[end_nb:]


# Pair Share
start_ps = c.find('      // Pair Share')
end_ps = c.find('      // GCSE Task', start_ps)
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

# GCSE Task
start_gc = c.find('      // GCSE Task')
end_gc = c.find('      html += `    </div>`;\n    });\n\n  const filename =', start_gc)
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
