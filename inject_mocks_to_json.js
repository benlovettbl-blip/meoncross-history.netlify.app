const fs = require('fs');
const path = require('path');

async function run() {
    try {
        const mockModule = await import('file:///' + path.join(__dirname, 'public/units/cme_new/mock_exams.js').replace(/\\/g, '/'));
        const mock_exams = mockModule.mock_exams;
        
        const jsonPath = path.join(__dirname, 'public/data/cme_new.json');
        if (fs.existsSync(jsonPath)) {
            const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            if (!data.data) data.data = {};
            data.data.mock_exams = mock_exams;
            fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
            console.log("Successfully injected mock_exams into cme_new.json. Length:", mock_exams.length);
        } else {
            console.error("public/data/cme_new.json not found!");
        }
    } catch (e) {
        console.error(e);
    }
}
run();
