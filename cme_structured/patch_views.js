const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'views.js');
let content = fs.readFileSync(file, 'utf8');

// Use regex to ignore line ending issues
const targetRegex = /let topicIcon = 'fa-book-open';\s*if \(topic\.id === 'topic_1'\) topicIcon = 'fa-monument';\s*else if \(topic\.id === 'topic_2'\) topicIcon = 'fa-jet-fighter';\s*else if \(topic\.id === 'topic_3'\) topicIcon = 'fa-dove';\s*card\.innerHTML = `\s*<div class="topic-list-info" style="border-bottom: 1px solid var\(--border-glass\); padding-bottom: 12px; margin-bottom: 6px; display: flex; flex-direction: column; width: 100%; gap: 6px; min-height: 105px;">/g;

const replacement = `    let topicIcon = 'fa-book-open';
    if (topic.id === 'topic_1') topicIcon = 'fa-monument';
    else if (topic.id === 'topic_2') topicIcon = 'fa-jet-fighter';
    else if (topic.id === 'topic_3') topicIcon = 'fa-dove';
    
    let workbookTabHTML = '';
    let ktNumber = topic.id === 'topic_1' ? 'KT1' : topic.id === 'topic_2' ? 'KT2' : topic.id === 'topic_3' ? 'KT3' : '';
    if (ktNumber) {
      workbookTabHTML = \`
      <div style="display: flex; justify-content: flex-end; margin-bottom: 0px; z-index: 10; position: relative;">
        <a href="workbook_stash/workbook_\${ktNumber}.html" target="_blank" title="Open \${ktNumber} Workbook" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-glass); border-bottom: 1px solid rgba(255,255,255,0.1); border-radius: 8px 8px 0 0; padding: 4px 14px; font-size: 0.75rem; font-weight: 600; color: var(--accent); text-decoration: none; display: flex; align-items: center; gap: 6px; transition: all 0.2s; margin-top: -8px; margin-right: 8px;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'" onclick="event.stopPropagation();">
          <i class="fa-solid fa-file-pdf"></i> \${ktNumber} Workbook
        </a>
      </div>\`;
    }

    card.innerHTML = \`
      \${workbookTabHTML}
      <div class="topic-list-info" style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px; margin-bottom: 6px; display: flex; flex-direction: column; width: 100%; gap: 6px; min-height: 105px;">`;

if (content.includes("workbookTabHTML")) {
    console.log("Already patched.");
} else if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(file, content);
    console.log("Patched successfully.");
} else {
    console.log("Target not found with regex.");
}
