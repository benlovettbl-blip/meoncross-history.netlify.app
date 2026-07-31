import fs from 'fs';

let data = fs.readFileSync('eee/data.js', 'utf8');

const mocks = `,
    "mock_exams": [
        {
            "id": "eee_mock_2026",
            "title": "Predicted Mock Paper A (2026)",
            "url": "eee_mock_2026.html"
        },
        {
            "id": "eee_mock_b",
            "title": "Predicted Mock Paper B",
            "url": "eee_mock_b.html"
        },
        {
            "id": "eee_mock_c",
            "title": "Predicted Mock Paper C",
            "url": "eee_mock_c.html"
        },
        {
            "id": "eee_mock_d",
            "title": "Predicted Mock Paper D",
            "url": "eee_mock_d.html"
        }
    ]`;

if (!data.includes('mock_exams')) {
  data = data.replace(/("key_topics": \[\],)/, '$1' + mocks);
  fs.writeFileSync('eee/data.js', data);
  console.log('Injected mocks into eee/data.js');
} else {
  console.log('mocks already present in eee/data.js');
}
