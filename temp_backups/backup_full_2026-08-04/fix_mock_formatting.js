const fs = require('fs');

// 1. Update generate_cme_mocks.js
let genMocks = fs.readFileSync('generate_cme_mocks.js', 'utf8');
genMocks = genMocks.replace(/<div class="margin-watermark">.*?<\/div>/g, '');
genMocks = genMocks.replace(/<div class="barcode">.*?<\/div>/g, '');
fs.writeFileSync('generate_cme_mocks.js', genMocks);

// 2. Update mock_exams.js
let mockExams = fs.readFileSync('public/units/cme_new/mock_exams.js', 'utf8');
// Update lines for narrative account (which had 24 lines) to 35
mockExams = mockExams.replace(/"lines": 24/g, '"lines": 35');
fs.writeFileSync('public/units/cme_new/mock_exams.js', mockExams);

console.log('Fixed mock formatting!');
