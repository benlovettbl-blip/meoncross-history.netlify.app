const fs = require('fs');

const interactiveSnippet = `<script>
  document.addEventListener("DOMContentLoaded", function() {
    if (navigator.userAgent.includes("HeadlessChrome") || navigator.userAgent.includes("Puppeteer")) return;
    function replaceLines(className) {
      const lines = document.querySelectorAll('.' + className);
      if (lines.length === 0) return;
      let group = [];
      lines.forEach((line, i) => {
        group.push(line);
        const next = lines[i + 1];
        if (!next || line.nextElementSibling !== next) {
          const wrapper = document.createElement('textarea');
          wrapper.className = 'interactive-textarea';
          wrapper.style.width = '100%';
          wrapper.style.height = (group.length * line.offsetHeight) + 'px';
          wrapper.style.border = '2px dashed #94a3b8';
          wrapper.style.borderRadius = '6px';
          wrapper.style.padding = '12px';
          wrapper.style.boxSizing = 'border-box';
          wrapper.style.fontFamily = 'Outfit, sans-serif';
          wrapper.style.fontSize = '1.1rem';
          wrapper.style.resize = 'vertical';
          wrapper.style.marginTop = group[0].style.marginTop || '10px';
          wrapper.style.marginBottom = '10px';
          wrapper.style.background = '#f8fafc';
          wrapper.placeholder = 'Type your answer here...';
          group[0].parentNode.insertBefore(wrapper, group[0]);
          group.forEach(l => l.remove());
          group = [];
        }
      });
    }
    replaceLines('task-lines');
    replaceLines('task-lines-large');
    document.querySelectorAll('.dirt-box, .hint-box').forEach(b => b.contentEditable = true);
  });
</script>`;

function injectIntoGlobal(file) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('interactive-textarea')) return;
  
  if (content.includes('html += `</body></html>`;')) {
    content = content.replace("html += `</body></html>`;", "html += `" + interactiveSnippet + "</body></html>`;");
    fs.writeFileSync(file, content);
    console.log('Injected into ' + file);
  }
}

function injectIntoMastery(file) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('interactive-textarea')) return;
  
  const search = "</body>\\n</html>";
  if (content.includes(search)) {
    content = content.replace(search, interactiveSnippet + "\\n</body>\\n</html>");
    fs.writeFileSync(file, content);
    console.log('Injected into ' + file);
  }
}

injectIntoGlobal('generate_pupil_workbooks.js');
injectIntoGlobal('generate_workbooks.js');
injectIntoMastery('scripts/generate_mastery_packs.js');
