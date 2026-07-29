const fs = require('fs');

try {
  let html = fs.readFileSync('index.html', 'utf8');

  // Replace tab buttons (normalizing newlines for comparison)
  const normalizedHtml = html.replace(/\r\n/g, '\n');
  
  const oldTabButton = `            <button class="tab-btn" id="btn-tab-game-parser">
              <i class="fa-solid fa-terminal"></i> Chronology Command: Jaffa to Gaza (1947–1953)
            </button>`;
            
  const newTabButtons = `            <button class="tab-btn" id="btn-tab-game-parser">
              <i class="fa-solid fa-terminal"></i> Haifa to Sinai: Text Adventure
            </button>
            <button class="tab-btn" id="btn-tab-game-parser-jaffa">
              <i class="fa-solid fa-terminal"></i> Chronology Command: Jaffa to Gaza (1947–1953)
            </button>`;

  if (normalizedHtml.includes(oldTabButton)) {
    const updatedHtml = normalizedHtml.replace(oldTabButton, newTabButtons);
    // Put back original Windows newlines
    html = updatedHtml.replace(/\n/g, '\r\n');
    console.log('Successfully replaced tab buttons.');
  } else {
    console.log('WARNING: Could not find oldTabButton in normalized HTML.');
  }

  fs.writeFileSync('index.html', html);
  console.log('Successfully wrote changes to index.html');

} catch (err) {
  console.error(err);
}
