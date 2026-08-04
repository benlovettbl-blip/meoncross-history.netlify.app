const fs = require('fs');
let code = fs.readFileSync('generate_workbooks.js', 'utf8');

const newCSS = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
    @page { size: A4 portrait; margin: 15mm; }
    body { font-family: 'Inter', sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; background: #ffffff; }
    h1 { font-family: 'Playfair Display', serif; font-size: 36pt; text-align: center; margin-top: 120px; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; }
    h2 { font-family: 'Playfair Display', serif; font-size: 20pt; color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 45px; page-break-after: avoid; }
    h3 { font-size: 14pt; color: #334155; margin-top: 20px; font-weight: 600; page-break-after: avoid; }
    .narrative-block { margin-bottom: 15pt; text-align: justify; orphans: 3; widows: 3; color: #334155; }
    .task-box { border: 2px solid #cbd5e1; padding: 18px; margin-top: 20px; margin-bottom: 20px; background: #f8fafc; page-break-inside: avoid; width: 95%; margin-left: auto; margin-right: auto; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .task-lines { border-bottom: 1px solid #94a3b8; height: 28px; margin-top: 10px; }
    .task-lines-large { border-bottom: 1px solid #94a3b8; height: 40px; margin-top: 15px; }
    .do-now-box { border: 2px solid #94a3b8; padding: 15px; margin-bottom: 25px; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
    .do-now-q { font-weight: 600; margin-bottom: 8px; color: #0f172a; }
    .source-container { background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; margin-bottom: 20px; text-align: center; }
    .source-caption { font-size: 9.5pt; color: #64748b; font-style: italic; margin-top: 10px; text-align: center; }
    .cover-image { width: 100%; max-width: 600px; height: auto; margin: 40px auto; display: block; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
    .watermark { position: fixed; bottom: 10px; right: 10px; font-size: 8pt; color: #94a3b8; opacity: 0.6; font-family: 'Inter', sans-serif; }
    table { width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; }
    th { background: #1e3a8a; color: white; padding: 12px; font-weight: 600; text-align: left; border-right: 1px solid #3b82f6; }
    td { border-bottom: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; padding: 10px; }
    tr:last-child td { border-bottom: none; }
    td:last-child, th:last-child { border-right: none; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    .grading-footer { margin-top: 30px; padding-top: 15px; font-size: 9.5pt; color: #555; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #ccc; page-break-inside: avoid; }
    .grading-boxes { display: flex; justify-content: space-between; }
    .grade-box { display: flex; align-items: center; gap: 5px; }
    .grade-box input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; border: 1px solid #777; border-radius: 2px; background: #fff; }
    .teacher-comment { border-bottom: 1px solid #777; width: 100%; height: 20px; display: inline-block; margin-top: 5px; }
    @media print {
      img { max-width: 100% !important; object-fit: contain !important; page-break-inside: avoid !important; }
      .source-container, .task-box { page-break-inside: avoid !important; }
      .do-now-box { page-break-inside: avoid !important; }
    }
</style>
`;

code = code.replace(/<style>[\s\S]*?<\/style>/, newCSS.trim());
fs.writeFileSync('generate_workbooks.js', code);
console.log('Fixed CSS in generate_workbooks.js');
