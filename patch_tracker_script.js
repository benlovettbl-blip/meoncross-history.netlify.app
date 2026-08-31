const fs = require('fs');
let code = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

const target1 = `    <div class="tracker-page" style="page-break-after: always; padding: 20px;">
      <h3 style="margin-top: 0; color: #1e3a8a; text-align: center; margin-bottom: 25px; font-size: 16pt; text-transform: uppercase; letter-spacing: 1px;">Progress & Assessment Tracker</h3>
      <div style="width: 100%; display: flex; justify-content: center;">
        <table style="page-break-inside: avoid; width: 100%; border-collapse: collapse; text-align: left; font-size: 11pt; background-color: #ffffff; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
          <thead>
            <tr style="background-color: #1a237e; color: white;">
              <th style="border: 1px solid #333; padding: 10px; width: 35%;">Lesson / Assessment Title</th>
              <th style="border: 1px solid #333; padding: 10px; width: 10%; text-align: center;">Effort</th>
              <th style="border: 1px solid #333; padding: 10px; width: 10%; text-align: center;">Level</th>
              <th style="border: 1px solid #333; padding: 10px; width: 45%;">Teacher Comments</th>
            </tr>
          </thead>
          <tbody>
            \${progressTrackerRows}
            <tr style=" font-weight: bold; height: 45px;">
              <td style="border: 1px solid #333; padding: 10px; text-align: right;">Final Unit Grade:</td>
              <td style="border: 1px solid #333; padding: 10px; background:#eee;"></td>
              <td style="border: 1px solid #333; padding: 10px; background:#eee;"></td>
              <td style="border: 1px solid #333; padding: 10px;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;

const replacement1 = `    <div style="page-break-after: always; page-break-inside: avoid; display: flex; flex-direction: column; max-height: 95vh; overflow: hidden;">
      <h2 style="margin: 0; color: #1e3a8a; font-size: 16pt; text-transform: uppercase; letter-spacing: 1px;">PROGRESS & ASSESSMENT TRACKER <span style="float: right; font-size: 0.8em; font-weight: normal; color: #333;">Target Grade: _________</span></h2>
      
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85em; line-height: 1.2; margin-bottom: 8px;">
        <tbody>
          <tr>
            <td style="border: 1px solid #333; padding: 4px 6px; font-weight: bold; background-color: #f1f5f9; width: 15%;">Effort</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">1 = Excellent</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">2 = Good</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">3 = Inconsistent</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">4 = Poor</td>
          </tr>
          \${(!["weimar_nazi_germany", "cme_new", "edexcel_medicine", "eee"].includes(unitId)) ? \`
          <tr>
            <td style="border: 1px solid #333; padding: 4px 6px; font-weight: bold; background-color: #f1f5f9;">Level</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">Emerging (1-2)</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">Emerging+ (3)</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">Expected (4-5)</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">Expected+ (6-7) / Greater Depth (8-9)</td>
          </tr>
          \` : \`
          <tr>
            <td style="border: 1px solid #333; padding: 4px 6px; font-weight: bold; background-color: #f1f5f9;">Grade</td>
            <td style="border: 1px solid #333; padding: 4px 6px;" colspan="4">9-1 GCSE Grading Scale</td>
          </tr>
          \`}
        </tbody>
      </table>

      <div style="width: 100%; display: flex; justify-content: center;">
        <table style="page-break-inside: avoid; width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85em; line-height: 1.2; background-color: #ffffff; box-shadow: 0 5px 15px rgba(0,0,0,0.05); margin-bottom: 8px;">
          <thead>
            <tr style="background-color: #1a237e; color: white;">
              <th style="border: 1px solid #333; padding: 4px 6px; width: 35%;">Lesson / Assessment Title</th>
              <th style="border: 1px solid #333; padding: 4px 6px; width: 10%; text-align: center;">Effort</th>
              <th style="border: 1px solid #333; padding: 4px 6px; width: 10%; text-align: center;">Level</th>
              <th style="border: 1px solid #333; padding: 4px 6px; width: 45%;">Teacher Comments</th>
            </tr>
          </thead>
          <tbody>
            \${progressTrackerRows}
            <tr style=" font-weight: bold;">
              <td style="border: 1px solid #333; padding: 4px 6px; text-align: right;">Final Unit Grade:</td>
              <td style="border: 1px solid #333; padding: 4px 6px; background:#eee;"></td>
              <td style="border: 1px solid #333; padding: 4px 6px; background:#eee;"></td>
              <td style="border: 1px solid #333; padding: 4px 6px;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;

code = code.replace(target1, replacement1);

// Now surgically replace the progressTrackerRows padding and height 
const target2 = `progressTrackerRows += \`<tr style="background-color: #f1f5f9; height: 35px;"><td style="border: 1px solid #333; padding: 5px 6px; font-weight:bold;">L\${i + 1}: \${l.title}</td><td style="border: 1px solid #333; padding: 5px 6px;"></td><td style="border: 1px solid #333; padding: 5px 6px;"></td><td style="border: 1px solid #333; padding: 5px 6px;"></td></tr>\\n\`;`;
const replacement2 = `progressTrackerRows += \`<tr style="background-color: #f1f5f9;"><td style="border: 1px solid #333; padding: 4px 6px; font-weight:bold;">L\${i + 1}: \${l.title}</td><td style="border: 1px solid #333; padding: 4px 6px;"></td><td style="border: 1px solid #333; padding: 4px 6px;"></td><td style="border: 1px solid #333; padding: 4px 6px;"></td></tr>\\n\`;`;

const target3 = `progressTrackerRows += \`<tr style="height: 35px;"><td style="border: 1px solid #333; padding: 5px 6px; font-weight:bold;">Assessment: \${a.title}</td><td style="border: 1px solid #333; padding: 5px 6px;"></td><td style="border: 1px solid #333; padding: 5px 6px;"></td><td style="border: 1px solid #333; padding: 5px 6px;"></td></tr>\\n\`;`;
const replacement3 = `progressTrackerRows += \`<tr style=""><td style="border: 1px solid #333; padding: 4px 6px; font-weight:bold;">Assessment: \${a.title}</td><td style="border: 1px solid #333; padding: 4px 6px;"></td><td style="border: 1px solid #333; padding: 4px 6px;"></td><td style="border: 1px solid #333; padding: 4px 6px;"></td></tr>\\n\`;`;

code = code.replace(target2, replacement2);
code = code.replace(target3, replacement3);

fs.writeFileSync('generate_pupil_workbooks.js', code);
console.log('Script patched successfully');
