import fs from 'fs';
import { keyIndividualsData } from './src/key_individuals.js';

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Individuals Flashcards</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 0;
      background: white;
      color: #333;
    }
    .page-title {
      text-align: center;
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      margin-bottom: 20px;
    }
    .instructions {
      text-align: center;
      margin-bottom: 30px;
      color: #666;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15mm 10mm;
    }
    .card {
      border: 2px dashed #94a3b8;
      border-radius: 12px;
      height: 70mm;
      display: flex;
      padding: 15px;
      page-break-inside: avoid;
      box-sizing: border-box;
    }
    .card-left {
      width: 45%;
      border-right: 2px dashed #cbd5e1;
      padding-right: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .card-right {
      width: 55%;
      padding-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .card img {
      max-width: 100%;
      max-height: 50mm;
      object-fit: contain;
    }
    .card h3 {
      font-family: 'Playfair Display', serif;
      margin: 0 0 5px 0;
      font-size: 1.4rem;
      color: #1e3a8a;
    }
    .card .role {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.8rem;
      color: #64748b;
      margin: 0 0 10px 0;
    }
    .card .bio {
      font-size: 0.9rem;
      margin: 0;
      line-height: 1.4;
    }
    /* Cut line hints */
    .cut-icon {
      position: absolute;
      font-size: 14px;
      color: #cbd5e1;
    }
  </style>
</head>
<body>
  <h1 class="page-title">Conflict in the Middle East: Key Individuals</h1>
  <p class="instructions">Cut along the dotted lines. You can fold these in half to create double-sided revision flashcards!</p>
  <div class="grid">
`;

keyIndividualsData.forEach(person => {
  html += `
    <div class="card">
      <div class="card-left">
        <img src="${person.image}" alt="${person.name}">
      </div>
      <div class="card-right">
        <h3>${person.name}</h3>
        <p class="role">${person.role}</p>
        <p class="bio">${person.bio}</p>
      </div>
    </div>
  `;
});

html += `
  </div>
</body>
</html>`;

fs.writeFileSync('flashcards.html', html);
console.log('Successfully generated flashcards.html');
