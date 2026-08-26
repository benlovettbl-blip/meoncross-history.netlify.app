import os

def patch_file(filename):
    if not os.path.exists(filename):
        return
    
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    start_idx = -1
    end_idx = -1
    for i, line in enumerate(lines):
        if 'const badgeSource = (title, overrideLetter = null) => {' in line:
            start_idx = i
        if start_idx != -1 and '};' in line and i > start_idx:
            end_idx = i
            break
            
    if start_idx != -1 and end_idx != -1:
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
};
"""
        new_lines = lines[:start_idx] + [replacement] + lines[end_idx + 1:]
        with open(filename, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("Patched badgeSource in " + filename)

patch_file('generate_textbooks.js')
patch_file('generate_workbooks.js')
patch_file('generate_pupil_workbooks.js')
