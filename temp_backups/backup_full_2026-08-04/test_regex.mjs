const text = `They had to take national action.\n\n* **The 1572 Vagabonds Act:** This law was heavily punitive.\n* **The 1576 Poor Relief Act:** This act was a revolutionary turning point.`;

function formatBold(text) {
    if (!text) return '';
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    parsed = parsed.replace(/\\n/g, '\n');
    
    // Handle lists
    if (parsed.match(/(^|\n)[\*\-]\s/)) {
      parsed = parsed.replace(/(^|\n)[\*\-]\s+(.*)/g, '$1<li>$2</li>');
      parsed = parsed.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g, '<ul style="margin-top: 5px; margin-bottom: 5px; padding-left: 20px;">\n$1\n</ul>');
    }
    
    parsed = parsed.replace(/\n/g, '<br>');
    // Clean up <br> around lists
    parsed = parsed.replace(/<br><ul/g, '<ul').replace(/<\/ul><br>/g, '</ul>').replace(/<br><li>/g, '<li>');
    
    return parsed;
}

console.log(formatBold(text));
