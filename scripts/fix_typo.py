with open('src/engine/lesson_renderer.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('${qhasUtilityCard ? renderArchivalSourceDiscussionBox', ''{+hasUtilityCard ? renderArchivalSourceDiscussionBox'.replace("+", "!"))
text = text.replace('${qphasUtilityCard ? primaryDisc.promptHtml : \'\}'', '${!hasUtilityCard ? primaryDisc.promptHtml : \'\}'')
text = text.replace('${qpoints', '${points')
text = text.replace('${qhasUtilityCard ? primaryDisc.panelHtml : \'\'}', '${!hasUtilityCard ? primaryDisc.panelHtml : \'\}'')
text = text.replace('${qphasUtilityCard', '${!hasUtilityCard')
text = text.replace('${qphas', '${!phas')
text = text.replace('${qu', '${uq')

with open('src/engine/lesson_renderer.js', 'w', encoding='utf-8') as f:
    f.write(text)
print('FIX_SUCCESS')
