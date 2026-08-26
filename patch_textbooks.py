import os

def patch_file(filename):
    if not os.path.exists(filename):
        return
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    target = """const badgeSource = (title) => {
    if (!title) return '';
    return title.replace(/(Source [A-Z])/i, '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">$1</span>');
  };"""

    replacement = """const badgeSource = (title, overrideLetter = null) => {
    if (!title) return '';
    if (overrideLetter) {
      if (/(Source )\\s*[A-Z]/i.test(title)) {
          title = title.replace(/(Source )\\s*[A-Z]/i, '$1' + overrideLetter);
      } else if (/(Source)(?!s)/i.test(title)) {
          title = title.replace(/(Source)/i, '$1 ' + overrideLetter + ':');
      } else {
          title = 'Source ' + overrideLetter + ': ' + title;
      }
    }
    return title.replace(/(Source [A-Z])/i, '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">$1</span>');
  };"""

    content = content.replace(target, replacement)
    
    content = content.replace('badgeSource(lesson.primary_source.title)', 'badgeSource(lesson.primary_source.title, String.fromCharCode(sourceCharCode++))')
    content = content.replace('badgeSource(source.title)', 'badgeSource(source.title, String.fromCharCode(sourceCharCode++))')
    content = content.replace('badgeSource(block.source.title)', 'badgeSource(block.source.title, String.fromCharCode(sourceCharCode++))')
    content = content.replace('badgeSource ? badgeSource(block.source.title) : block.source.title', 'badgeSource ? badgeSource(block.source.title, String.fromCharCode(sourceCharCode++)) : block.source.title')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched " + filename)

patch_file('generate_textbooks.js')
