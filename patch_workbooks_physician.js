const fs = require('fs');

const renderPhysicianGame = `
              if (task.type === 'physician_game') {
                 html += \`<div class="task-box">\`;
                 html += \`<h4 style="margin-top: 0;">Q\${task.qNum || ''} \${task.text}\${task.page ? \` [p. \${task.page}]\` : ''}</h4>\`;
                 html += \`<p style="font-style: italic;">Read the patient symptoms below. Write down your recommended medieval cure in the empty box. Your teacher will reveal the outcome!</p>\`;
                 html += \`<table style="width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">\`;
                 html += \`<thead><tr><th style="border:1px solid #333; padding:8px; width:20%; background:#f1f5f9;">Patient</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Symptoms</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Your Recommended Cure</th></tr></thead>\`;
                 html += \`<tbody>\`;
                 const patients = [
                   { name: "William", symptoms: "High fever, shivering, and large, painful black swellings (buboes) in his armpits." },
                   { name: "Agnes", symptoms: "Coughing up blood, severe chest pain, and struggling to breathe." },
                   { name: "John", symptoms: "Fingers and toes have turned completely black. High fever and vomiting." },
                   { name: "Thomas", symptoms: "A runny nose, a mild cough, and feeling a bit tired." }
                 ];
                 patients.forEach(p => {
                    html += \`<tr>
                      <td style="border:1px solid #333; padding:8px; font-weight:bold;">\${p.name}</td>
                      <td style="border:1px solid #333; padding:8px;">\${p.symptoms}</td>
                      <td style="border:1px solid #333; padding:8px; height: 60px;"></td>
                    </tr>\`;
                 });
                 html += \`</tbody></table></div>\`;
                 return;
              }
`;

function patchFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  // There are two loops in each file (one for narrative_blocks, one for do_nows, though do_nows won't have physician_game, let's just insert it after 'matching' inside the narrative_blocks loop).
  // Find "if (task.type === 'matching') {" and insert it before.
  // We'll replace globally just in case.
  content = content.replace(/if \(task\.type === 'matching'\) \{/g, renderPhysicianGame + "if (task.type === 'matching') {");
  
  fs.writeFileSync(filepath, content);
  console.log('Patched', filepath);
}

patchFile('c:/Projects/meoncross-history.netlify.app/generate_pupil_workbooks.js');
patchFile('c:/Projects/meoncross-history.netlify.app/generate_workbooks.js');
